'use client';

import type { CSSProperties } from 'react';
import { resolveIcon, type IconName } from './iconMap';

export type AstraIconTone = 'gold' | 'cyan' | 'platinum' | 'inherit';

const TONE_CLASS: Record<AstraIconTone, string> = {
  gold: 'text-gold-primary',
  cyan: 'text-brand-glow',
  platinum: 'text-zinc-200',
  inherit: '',
};

type Props = {
  /** Nome semântico (mapa Lucide). Desconhecidos caem em `star`. */
  name: IconName | (string & {});
  size?: number | string;
  className?: string;
  tone?: AstraIconTone;
  title?: string;
  strokeWidth?: number;
};

/**
 * Ícone unificado do sistema — Lucide SVG tintável via currentColor.
 */
export function AstraIcon({
  name,
  size = 24,
  className = '',
  tone = 'inherit',
  title,
  strokeWidth = 1.75,
}: Props) {
  const Icon = resolveIcon(name);
  const dim = typeof size === 'number' ? size : undefined;
  const style: CSSProperties | undefined =
    typeof size === 'string' ? { width: size, height: size } : undefined;
  const toneClass = TONE_CLASS[tone];

  return (
    <Icon
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      width={dim}
      height={dim}
      size={dim ?? 24}
      strokeWidth={strokeWidth}
      className={`astra-icon inline-block shrink-0 align-middle ${toneClass} ${className}`.trim()}
      style={style}
    />
  );
}

/** Chip circular glass + ícone (feature cards / pricing) */
export function AstraIconBadge({
  name,
  tone = 'gold',
  size = 28,
  className = '',
}: {
  name: IconName | (string & {});
  tone?: AstraIconTone;
  size?: number;
  className?: string;
}) {
  const ring =
    tone === 'cyan'
      ? 'border-brand-glow/35 bg-brand-glow/10 shadow-[0_0_24px_rgba(6,182,212,0.25)]'
      : tone === 'platinum'
        ? 'border-white/20 bg-white/5'
        : 'border-gold-primary/40 bg-gold-primary/10 shadow-[0_0_24px_rgba(212,175,55,0.22)]';

  return (
    <span
      className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-md ${ring} ${className}`}
    >
      <AstraIcon name={name} size={size} tone={tone} />
    </span>
  );
}
