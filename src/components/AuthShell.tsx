'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import LanguageSelector from '@/components/LanguageSelector';

type AuthShellProps = {
  children: React.ReactNode;
  backLabel: string;
  eyebrow?: string;
};

/**
 * Atmosfera cyberluxury para telas de auth — sem logo.
 * Ouro + ciano sobre preto profundo, grade sutil e glows.
 */
export default function AuthShell({ children, backLabel, eyebrow = 'AstraFuture · SEDUCTION' }: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Atmosfera */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(212,175,55,0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 20%, rgba(6,182,212,0.12), transparent 50%), radial-gradient(ellipse 50% 40% at 0% 80%, rgba(6,182,212,0.08), transparent 45%), linear-gradient(180deg, #020617 0%, #000 45%, #050b18 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
          }}
        />
        <motion.div
          className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold-primary/10 blur-3xl"
          animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] h-[320px] w-[320px] rounded-full bg-brand-glow/10 blur-3xl"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-4 py-5 sm:px-8">
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500 transition hover:text-gold-primary"
          >
            {backLabel}
          </Link>
          <LanguageSelector />
        </header>

        <main className="flex flex-1 items-center justify-center px-4 pb-12 pt-2">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-primary/90">
              {eyebrow}
            </p>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
