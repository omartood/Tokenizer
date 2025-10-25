'use client';

import { useState, useEffect } from 'react';
import { Tiktoken, getEncoding } from 'js-tiktoken';

export default function Home() {
  const [text, setText] = useState('hello world');
  const [tokens, setTokens] = useState<number[]>([]);
  const [tokenStrings, setTokenStrings] = useState<string[]>([]);
  const [model, setModel] = useState('cl100k_base');
  const [showIds, setShowIds] = useState(true);
  const [encoder, setEncoder] = useState<Tiktoken | null>(null);
  const [showStats, setShowStats] = useState(true);
  const [estimatedCost, setEstimatedCost] = useState(0);

  useEffect(() => {
    const enc = getEncoding(model as any);
    setEncoder(enc);
  }, [model]);

  useEffect(() => {
    if (!encoder) return;

    try {
      const tokenIds = encoder.encode(text);
      const tokenArray = Array.from(tokenIds);
      setTokens(tokenArray);

      const strings = tokenArray.map(id => {
        const decoded = encoder.decode([id]);
        return decoded;
      });
      setTokenStrings(strings);

      // Calculate estimated cost (GPT-4 pricing as example)
      const inputCost = (tokenArray.length / 1000) * 0.03; // $0.03 per 1K tokens
      setEstimatedCost(inputCost);
    } catch (error) {
      console.error('Tokenization failed:', error);
    }
  }, [text, encoder]);

  const colors = [
    'bg-indigo-200/80 border-indigo-300',
    'bg-sky-200/80 border-sky-300',
    'bg-emerald-200/80 border-emerald-300',
    'bg-amber-200/80 border-amber-300',
    'bg-rose-200/80 border-rose-300',
    'bg-purple-200/80 border-purple-300',
    'bg-teal-200/80 border-teal-300',
    'bg-orange-200/80 border-orange-300'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 mb-4 tracking-tight">
            Tokenizer
          </h1>
          <p className="text-lg text-gray-300 font-light">
            Visualize AI tokenization in real-time
          </p>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 space-y-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Model</span>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
              >
                <option value="cl100k_base" className="bg-gray-900">cl100k_base - GPT-4, GPT-3.5-turbo, GPT-4o</option>
                <option value="o200k_base" className="bg-gray-900">o200k_base - GPT-4o</option>
                <option value="p50k_base" className="bg-gray-900">p50k_base - GPT-3 (Davinci, Curie)</option>
                <option value="p50k_edit" className="bg-gray-900">p50k_edit - GPT-3 Edit models</option>
                <option value="r50k_base" className="bg-gray-900">r50k_base - Codex models</option>
                <option value="gpt2" className="bg-gray-900">gpt2 - GPT-2 models</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-300 font-medium">Tokens</span>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 px-6 py-3 rounded-2xl shadow-lg">
                <span className="text-4xl font-bold text-white">{tokens.length}</span>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div>
            <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
              Input Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-44 p-5 bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl text-white text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none leading-relaxed transition-all"
              placeholder="Start typing..."
              style={{ fontFamily: 'ui-monospace, monospace' }}
            />
          </div>

          {/* Tokens Display */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-bold text-gray-200 uppercase tracking-wider">
                Tokenized Output
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-semibold text-white transition-all"
                >
                  {showStats ? '📊' : '📊'}
                </button>
                <button
                  onClick={() => setShowIds(!showIds)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-semibold text-white transition-all"
                >
                  {showIds ? '✕ Hide IDs' : '⚡ Show IDs'}
                </button>
              </div>
            </div>
            <div className="p-6 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 min-h-[140px] text-base leading-loose">
              {tokenStrings.length === 0 ? (
                <span className="text-gray-500 italic">Your tokens will appear here...</span>
              ) : (
                tokenStrings.map((token, i) => (
                  <span
                    key={i}
                    className={`${colors[i % colors.length]} px-3 py-1.5 rounded-lg border inline-block m-1 font-semibold transition-all hover:scale-110 hover:shadow-lg cursor-default text-gray-900`}
                    title={`Token ID: ${tokens[i]}`}
                    style={{ fontFamily: 'ui-monospace, monospace' }}
                  >
                    {token}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Statistics */}
          {showStats && tokens.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-4">
                <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-1">Characters</div>
                <div className="text-2xl font-bold text-white">{text.length}</div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-4">
                <div className="text-xs text-green-300 font-semibold uppercase tracking-wider mb-1">Words</div>
                <div className="text-2xl font-bold text-white">{text.trim().split(/\s+/).filter(w => w).length}</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4">
                <div className="text-xs text-purple-300 font-semibold uppercase tracking-wider mb-1">Tokens</div>
                <div className="text-2xl font-bold text-white">{tokens.length}</div>
              </div>
              <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-sm border border-pink-400/30 rounded-xl p-4">
                <div className="text-xs text-pink-300 font-semibold uppercase tracking-wider mb-1">Est. Cost</div>
                <div className="text-2xl font-bold text-white">${estimatedCost.toFixed(4)}</div>
              </div>
            </div>
          )}

          {/* Token IDs */}
          {showIds && tokens.length > 0 && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-300">
              <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
                Token IDs
              </label>
              <div className="p-5 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 text-sm text-gray-300 leading-relaxed break-all" style={{ fontFamily: 'ui-monospace, monospace' }}>
                [{tokens.join(', ')}]
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                navigator.clipboard.writeText(text);
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-semibold text-white transition-all flex items-center gap-2"
            >
              📋 Copy Text
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(tokens.join(', '));
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-semibold text-white transition-all flex items-center gap-2"
            >
              🔢 Copy Token IDs
            </button>
            <button
              onClick={() => {
                const data = {
                  text,
                  model,
                  tokens: tokens.length,
                  tokenIds: tokens,
                  characters: text.length,
                  words: text.trim().split(/\s+/).filter(w => w).length
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'tokenization-data.json';
                a.click();
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-semibold text-white transition-all flex items-center gap-2"
            >
              💾 Export JSON
            </button>
            <button
              onClick={() => {
                setText('');
                setTokens([]);
                setTokenStrings([]);
              }}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm border border-red-400/30 rounded-xl text-sm font-semibold text-white transition-all flex items-center gap-2"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            Powered by <span className="text-purple-400 font-semibold">Next.js</span> & <span className="text-pink-400 font-semibold">Tiktoken</span>
          </p>
        </footer>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
