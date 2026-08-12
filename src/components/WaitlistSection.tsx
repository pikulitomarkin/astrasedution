'use client';

import { useState } from 'react';
import { Mail, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { joinWaitlist } from '@/lib/api';

export default function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    setSuccess(false);

    try {
      const result = await joinWaitlist({ email, name, source: 'landing' });
      setMessage(result.message);
      setSuccess(true);
      if (!result.already_registered) {
        setEmail('');
        setName('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar na waitlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24" id="contact">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="glass-effect rounded-3xl border border-gold-light/20 p-10 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-gradient mb-4">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-3xl font-bold text-white font-playfair mb-3">
              Lista VIP de Acesso Antecipado
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Deixe seu email e seja o primeiro a saber quando novas vagas e recursos premium forem liberados.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          {success && message && (
            <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-emerald-300 text-sm">{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Nome (opcional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-gold-light/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/50 border border-gold-light/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary"
                placeholder="seu@email.com"
              />
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              className="w-full gold-gradient text-black font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Entrar na Waitlist VIP
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
