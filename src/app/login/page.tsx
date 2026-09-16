'use client';

import { useState, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import AuthShell from '@/components/AuthShell';

function LoginForm() {
  const t = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const next = searchParams.get('next') || '/dashboard';

    try {
      await login(email, password);
      router.push(next.startsWith('/') ? next : '/dashboard');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.common.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    'w-full rounded-xl border border-white/10 bg-black/40 py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-600 outline-none transition focus:border-gold-primary/60 focus:ring-1 focus:ring-gold-primary/40';

  return (
    <AuthShell backLabel={t.common.backToHome}>
      <div className="relative overflow-hidden rounded-3xl border border-gold-primary/20 bg-black/50 p-7 shadow-[0_0_0_1px_rgba(6,182,212,0.08)_inset,0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-9">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-primary/70 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-glow/10 blur-3xl"
          aria-hidden
        />

        <div className="relative mb-8 text-center">
          <motion.div
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-primary/35 bg-gradient-to-br from-gold-primary/20 to-transparent shadow-[0_0_28px_rgba(212,175,55,0.2)]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <LogIn className="h-6 w-6 text-gold-primary" strokeWidth={1.75} />
          </motion.div>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-[2.75rem]">
            {t.auth.loginTitle}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">{t.auth.loginSubtitle}</p>
        </div>

        {error ? (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
            <span className="text-sm text-red-300">{error}</span>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="relative space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              {t.common.email}
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-primary/80" strokeWidth={1.75} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
                placeholder={t.auth.emailPlaceholder}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              {t.common.password}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold-primary/80" strokeWidth={1.75} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={fieldClass}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={loading ? undefined : { scale: 1.01 }}
            whileTap={loading ? undefined : { scale: 0.99 }}
            className="btn-gold group mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              t.auth.loggingIn
            ) : (
              <>
                {t.common.login}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </>
            )}
          </motion.button>

          <p className="pt-2 text-center text-sm text-zinc-400">
            {t.common.dontHaveAccount}{' '}
            <Link
              href="/cadastro"
              className="font-semibold text-gold-primary transition hover:text-gold-accent"
            >
              {t.common.signupHere}
            </Link>
          </p>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-gold-primary/5 via-transparent to-brand-glow/5 px-4 py-3 text-center">
            <p className="text-xs leading-relaxed text-zinc-400">{t.auth.exclusiveAccess}</p>
          </div>
        </form>
      </div>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <LoginForm />
    </Suspense>
  );
}
