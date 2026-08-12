'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Mail,
  Crown,
  ArrowRight,
  LayoutDashboard,
  Wand2,
} from 'lucide-react';
import { Header } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { fetchCredits, type CreditsInfo } from '@/lib/api';
import { useState } from 'react';

export default function DashboardPage() {
  const { user, status, accessToken, refreshProfile } = useAuth();
  const router = useRouter();
  const [creditsInfo, setCreditsInfo] = useState<CreditsInfo | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?next=/dashboard');
    }
  }, [status, router]);

  useEffect(() => {
    if (!accessToken) return;
    fetchCredits(accessToken)
      .then(setCreditsInfo)
      .catch(() => refreshProfile());
  }, [accessToken, refreshProfile]);

  if (status === 'loading' || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-glow" />
      </div>
    );
  }

  const credits = creditsInfo?.credits ?? user.credits;
  const planLabel = (creditsInfo?.plan ?? user.plan).toUpperCase();
  const maxFree = creditsInfo?.max_free_credits ?? 3;
  const canCreate = user.email_verified && credits > 0;

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-5xl">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 text-brand-glow mb-2">
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-widest uppercase">
                Painel VIP
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-playfair">
              Olá, {user.name || user.email.split('@')[0]}
            </h1>
            <p className="text-zinc-400 mt-2">
              Seu espaço exclusivo para criar identidades digitais com realismo extremo.
            </p>
          </motion.div>

          {/* Email não verificado */}
          {!user.email_verified && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel border border-amber-500/30 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex items-start gap-3 flex-1">
                <Mail className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Confirme seu email</p>
                  <p className="text-sm text-zinc-400 mt-1">
                    Verifique {user.email} para liberar o criador e as gerações gratuitas.
                  </p>
                </div>
              </div>
              <Link
                href="/verificar?pending=1"
                className="shrink-0 gold-gradient text-black font-semibold px-6 py-2.5 rounded-lg text-center"
              >
                Verificar agora
              </Link>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Plano */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="glass-panel border border-gold-light/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 text-gold-primary mb-4">
                <Crown className="w-5 h-5" />
                <span className="text-sm font-semibold">Plano atual</span>
              </div>
              <p className="text-2xl font-bold text-white">{planLabel}</p>
              <p className="text-sm text-zinc-400 mt-2">
                {planLabel === 'FREE'
                  ? `${maxFree} gerações teaser inclusas`
                  : 'Benefícios premium ativos'}
              </p>
            </motion.div>

            {/* Créditos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel border border-brand-glow/30 rounded-2xl p-6 relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, transparent 60%)',
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 text-brand-glow mb-4">
                  <Zap className="w-5 h-5" fill="currentColor" />
                  <span className="text-sm font-semibold">Créditos restantes</span>
                </div>
                <p className="text-4xl font-bold text-white">{credits}</p>
                <p className="text-sm text-zinc-400 mt-2">
                  de {maxFree} no plano Free
                </p>
              </div>
            </motion.div>

            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-panel border border-gold-light/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 text-emerald-400 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold">Status da conta</span>
              </div>
              <p className="text-lg font-semibold text-white">
                {user.email_verified ? 'Ativa' : 'Pendente verificação'}
              </p>
              <p className="text-sm text-zinc-400 mt-2">
                {user.email_verified
                  ? 'Pronta para criar'
                  : 'Aguardando confirmação de email'}
              </p>
            </motion.div>
          </div>

          {/* Área principal vazia — Fase 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel border border-gold-light/20 rounded-3xl p-10 md:p-14 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-gradient/20 border border-gold-light/30 mb-6">
              <Wand2 className="w-10 h-10 text-gold-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white font-playfair mb-3">
              Creator Wizard em breve
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-8">
              Seu dashboard está pronto. Na próxima etapa você poderá gerar até{' '}
              {maxFree} imagens watermarked no plano Free diretamente daqui.
            </p>

            {canCreate ? (
              <Link
                href="/create"
                className="inline-flex items-center gap-2 gold-gradient text-black font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Abrir Criador
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-zinc-700 text-zinc-500 cursor-not-allowed"
              >
                {!user.email_verified
                  ? 'Verifique o email para continuar'
                  : 'Sem créditos disponíveis'}
              </button>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
