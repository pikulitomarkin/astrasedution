'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { forgotPassword } from '@/lib/api';

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const result = await forgotPassword(email);
      setMessage(result.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao solicitar redefinição');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-semibold text-white mb-2">Esqueci minha senha</h1>
        <p className="text-sm text-zinc-400 mb-6">
          Informe seu email para receber o link de redefinição.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-zinc-300">Email</span>
            <div className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2">
              <Mail className="w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white outline-none"
                placeholder="seu@email.com"
              />
            </div>
          </label>

          {error && (
            <p className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="w-4 h-4" /> {error}
            </p>
          )}
          {message && (
            <p className="flex items-center gap-2 text-sm text-emerald-400">
              <CheckCircle className="w-4 h-4" /> {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#c9a227] px-4 py-3 font-medium text-black disabled:opacity-60"
          >
            {loading ? 'Enviando...' : 'Enviar link'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          <Link href="/login" className="text-[#c9a227] hover:underline">
            Voltar ao login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
