import { NextRequest, NextResponse } from 'next/server';
import { encoding_for_model, get_encoding } from 'tiktoken';

export async function POST(request: NextRequest) {
  const { text, model } = await request.json();
  
  try {
    const encoding = get_encoding(model);
    const tokens = encoding.encode(text);
    const tokenStrings = Array.from(tokens).map(token => {
      return new TextDecoder().decode(encoding.decode_single_token_bytes(token));
    });
    
    encoding.free();
    
    return NextResponse.json({ tokens: Array.from(tokens), tokenStrings });
  } catch (error) {
    return NextResponse.json({ error: 'Tokenization failed' }, { status: 500 });
  }
}
