'use client';

import { AstraIcon } from '@/components/icons';

type PlayerHudProps = {
  displayName: string;
  plan: string;
  credits: number;
  maxCredits: number;
  generationsCount: number;
  emailVerified: boolean;
};

function levelFromGenerations(count: number) {
  const level = Math.min(20, 1 + Math.floor(count / 2));
  const intoLevel = count % 2;
  const xpPct = Math.min(100, (intoLevel / 2) * 100 + (count === 0 ? 8 : 0));
  return {
    level,
    xpPct,
    title: level < 3 ? 'Recruta' : level < 8 ? 'Operador' : 'Arquiteto',
  };
}

export function PlayerHud({
  displayName,
  plan,
  credits,
  maxCredits,
  generationsCount,
  emailVerified,
}: PlayerHudProps) {
  const { level, xpPct, title } = levelFromGenerations(generationsCount);
  const energyPct = maxCredits > 0 ? Math.min(100, (credits / maxCredits) * 100) : 0;

  return (
    <div className="astra-panel relative overflow-hidden rounded-2xl px-4 py-4 md:px-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at 0% 0%, rgba(6,182,212,0.18), transparent 45%), radial-gradient(ellipse at 100% 100%, rgba(212,175,55,0.12), transparent 40%)',
        }}
      />
      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold-primary/50 bg-black/60 shadow-[0_0_24px_rgba(212,175,55,0.25)]">
            <AstraIcon name="user" size={26} tone="gold" />
            <span className="absolute -bottom-1 -right-1 rounded-full border border-brand-glow/40 bg-black px-1.5 text-[10px] font-bold text-brand-glow">
              Lv{level}
            </span>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-glow">
              Jogador · {title}
            </p>
            <h1 className="font-serif text-2xl font-bold text-white md:text-3xl">{displayName}</h1>
            <p className="mt-0.5 text-xs text-zinc-400">
              Rank {plan.toUpperCase()}
              {!emailVerified ? ' · verificação pendente' : ' · canal seguro ativo'}
            </p>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-xl">
          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-400">
              <span className="inline-flex items-center gap-1">
                <AstraIcon name="zap" size={12} tone="cyan" /> Energia
              </span>
              <span className="text-brand-glow">
                {credits}/{maxCredits}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-glow-dark to-brand-glow-light transition-all duration-500"
                style={{ width: `${energyPct}%` }}
              />
            </div>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-400">
              <span className="inline-flex items-center gap-1">
                <AstraIcon name="star" size={12} tone="gold" /> XP missão
              </span>
              <span className="text-gold-primary">{generationsCount} clears</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-primary to-gold-accent transition-all duration-500"
                style={{ width: `${Math.max(xpPct, 6)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
