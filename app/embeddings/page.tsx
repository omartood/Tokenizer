'use client';

import { useState } from 'react';
import Link from 'next/link';

type EmbeddingType = 'word' | 'sentence' | 'document' | 'contextual';

export default function EmbeddingsPage() {
  const [text, setText] = useState('');
  const [embeddingType, setEmbeddingType] = useState<EmbeddingType>('word');
  const [embeddings, setEmbeddings] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dimensions, setDimensions] = useState(0);

  const generateEmbeddings = async () => {
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate embeddings');
      }

      setEmbeddings(data.embeddings);
      setDimensions(data.dimensions);
    } catch (err: any) {
      setError(err.message || 'Failed to generate embeddings');
    } finally {
      setLoading(false);
    }
  };

  const calculateCosineSimilarity = (vec1: number[], vec2: number[]) => {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (mag1 * mag2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mb-4 tracking-tight">
              Embeddings
            </h1>
            <p className="text-lg text-gray-300 font-light">
              Generate vector embeddings for semantic analysis
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold transition-all"
          >
            ← Back to Tokenizer
          </Link>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl p-8 space-y-6">
          {/* Embedding Type Selector */}
          <div>
            <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
              Embedding Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { type: 'word' as EmbeddingType, label: 'Word', icon: '📝' },
                { type: 'sentence' as EmbeddingType, label: 'Sentence', icon: '📄' },
                { type: 'document' as EmbeddingType, label: 'Document', icon: '📚' },
                { type: 'contextual' as EmbeddingType, label: 'Contextual', icon: '🧠' },
              ].map(({ type, label, icon }) => (
                <button
                  key={type}
                  onClick={() => setEmbeddingType(type)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    embeddingType === type
                      ? 'bg-blue-500/30 border-blue-400'
                      : 'bg-white/5 border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="text-sm font-semibold text-white">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Text Input */}
          <div>
            <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
              Input Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-32 p-5 bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl text-white text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none leading-relaxed"
              placeholder="Enter text to generate embeddings..."
              style={{ fontFamily: 'ui-monospace, monospace' }}
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateEmbeddings}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl text-white font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Generating...' : '✨ Generate Embeddings'}
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200">
              {error}
            </div>
          )}

          {/* Results */}
          {embeddings.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-4">
                  <div className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-1">
                    Dimensions
                  </div>
                  <div className="text-2xl font-bold text-white">{dimensions}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm border border-purple-400/30 rounded-xl p-4">
                  <div className="text-xs text-purple-300 font-semibold uppercase tracking-wider mb-1">
                    Type
                  </div>
                  <div className="text-2xl font-bold text-white capitalize">{embeddingType}</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl p-4">
                  <div className="text-xs text-cyan-300 font-semibold uppercase tracking-wider mb-1">
                    Magnitude
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {Math.sqrt(embeddings.reduce((sum, val) => sum + val * val, 0)).toFixed(2)}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-200 mb-3 uppercase tracking-wider">
                  Embedding Vector (first 10 dimensions)
                </label>
                <div className="p-5 bg-black/30 backdrop-blur-sm rounded-2xl border border-white/20 text-sm text-gray-300 font-mono overflow-x-auto">
                  [{embeddings.slice(0, 10).map(v => v.toFixed(6)).join(', ')}, ...]
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(embeddings));
                  }}
                  className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-semibold text-white transition-all"
                >
                  📋 Copy Vector
                </button>
                <button
                  onClick={() => {
                    const data = {
                      text,
                      type: embeddingType,
                      dimensions,
                      embeddings,
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'embeddings.json';
                    a.click();
                  }}
                  className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-semibold text-white transition-all"
                >
                  💾 Export JSON
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold text-white mb-3">What are Embeddings?</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Embeddings are numerical representations of text that capture semantic meaning. Similar texts have similar embeddings, making them useful for search, recommendations, and clustering.
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
            <h3 className="text-xl font-bold text-white mb-3">Use Cases</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• Semantic search and similarity</li>
              <li>• Document clustering</li>
              <li>• Recommendation systems</li>
              <li>• Anomaly detection</li>
            </ul>
          </div>
        </div>
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
