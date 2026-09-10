'use client';

import { motion } from 'framer-motion';
import { AstraIcon } from '@/components/icons';

export type MissionCardProps = {
  title: string;
  description: string;
  badge?: string;
  icon: string;
  tone?: 'gold' | 'cyan';
  gradient: string;
  costLabel?: string;
  locked?: boolean;
  loading?: boolean;
  onClick?: () => void;
};

export function MissionCard({
  title,
  description,
  badge,
  icon,
  tone = 'gold',
  gradient,
  costLabel,
  locked,
  loading,
  onClick,
}: MissionCardProps) {
  const accent = tone === 'cyan' ? 'text-brand-glow border-brand-glow/40' : 'text-gold-primary border-gold-primary/40';

  return (
    <motion.button
      type="button"
      whileHover={locked || loading ? undefined : { scale: 1.04, y: -4 }}
      whileTap={locked || loading ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      disabled={locked || loading}
      onClick={onClick}
      className="group relative h-[280px] w-[210px] shrink-0 overflow-hidden rounded-2xl border border-white/10 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-gold-primary disabled:cursor-not-allowed disabled:opacity-55 sm:h-[320px] sm:w-[240px]"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          boxShadow:
            tone === 'cyan'
              ? 'inset 0 0 0 1px rgba(6,182,212,0.45), 0 0 28px rgba(6,182,212,0.2)'
              : 'inset 0 0 0 1px rgba(212,175,55,0.45), 0 0 28px rgba(212,175,55,0.2)',
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-2">
          <span
            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border bg-black/35 backdrop-blur-md ${accent}`}
          >
            <AstraIcon name={icon} size={22} tone={tone} />
          </span>
          {badge ? (
            <span className="rounded-full border border-white/15 bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-200">
              {badge}
            </span>
          ) : null}
        </div>

        <div>
          <h3 className="font-serif text-xl font-bold text-white">{title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-zinc-300">{description}</p>
          <div className="mt-3 flex items-center justify-between text-xs">
            <span className={tone === 'cyan' ? 'text-brand-glow' : 'text-gold-primary'}>
              {locked ? 'Bloqueado' : loading ? 'Carregando…' : 'Entrar na missão'}
            </span>
            {costLabel ? <span className="text-zinc-400">{costLabel}</span> : null}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
