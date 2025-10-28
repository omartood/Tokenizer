# 🚀 Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

### 3. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### 4. Add API Key to .env.local

Open `.env.local` and replace the placeholder:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 5. Run the Development Server

```bash
npm run dev
```

### 6. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## Features Available

### Without API Key
- ✅ Tokenization (works offline)
- ✅ Token counting
- ✅ Cost estimation
- ✅ All tokenizer features

### With API Key
- ✅ Everything above, plus:
- ✅ Embeddings generation
- ✅ Vector analysis
- ✅ Semantic similarity

## Troubleshooting

### "OpenAI API key not configured" Error

**Problem**: The embeddings feature shows an error about missing API key.

**Solution**:
1. Make sure `.env.local` exists in your project root
2. Check that `OPENAI_API_KEY` is set correctly
3. Restart the dev server after adding the key
4. Make sure there are no extra spaces in the key

### API Key Not Working

**Problem**: Getting authentication errors from OpenAI.

**Solution**:
1. Verify your API key is valid at [OpenAI Platform](https://platform.openai.com/api-keys)
2. Check if you have credits/billing set up
3. Make sure the key starts with `sk-`
4. Try generating a new key

### Build Errors

**Problem**: Build fails with WASM or module errors.

**Solution**:
```bash
# Clean the build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install

# Try building again
npm run build
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Optional | OpenAI API key for embeddings feature |

## Security Notes

- ⚠️ **Never commit `.env.local`** to git (it's in .gitignore)
- ⚠️ **Never share your API key** publicly
- ⚠️ **Rotate keys** if accidentally exposed
- ✅ API key is only used server-side
- ✅ Not exposed to the browser

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable:
   - Key: `OPENAI_API_KEY`
   - Value: Your API key
4. Deploy

### Other Platforms

Make sure to set the `OPENAI_API_KEY` environment variable in your hosting platform's settings.

## Cost Considerations

### Tokenization
- **Free** - Runs entirely in the browser
- No API calls required

### Embeddings
- **Paid** - Uses OpenAI API
- Cost: ~$0.00002 per 1K tokens
- Model: `text-embedding-3-small`
- Very affordable for most use cases

Example costs:
- 1,000 embeddings: ~$0.02
- 10,000 embeddings: ~$0.20
- 100,000 embeddings: ~$2.00

## Need Help?

- 📖 Check the [README](./README.md)
- 🐛 [Report an issue](https://github.com/yourusername/tokention/issues)
- 💬 [Start a discussion](https://github.com/yourusername/tokention/discussions)

---

Happy tokenizing! 🎉
