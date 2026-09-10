'use client';

import { astraIconSrc } from './astraCatalog';

export type AstraIconTone = 'gold' | 'cyan' | 'platinum' | 'inherit';

const TONE_CLASS: Record<AstraIconTone, string> = {
  gold: 'text-gold-primary',
  cyan: 'text-brand-glow',
  platinum: 'text-zinc-200',
  inherit: '',
};

type Props = {
  name: string;
  size?: number | string;
  className?: string;
  /** Cor via currentColor (máscara CSS) */
  tone?: AstraIconTone;
  title?: string;
};

/**
 * Ícone do sprite Astra — silhueta com máscara, tintável em ouro/ciano.
 */
export function AstraIcon({
  name,
  size = 24,
  className = '',
  tone = 'inherit',
  title,
}: Props) {
  const src = astraIconSrc(name);
  const dim = typeof size === 'number' ? `${size}px` : size;
  const toneClass = TONE_CLASS[tone];

  return (
    <span
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      title={title}
      className={`astra-icon inline-block shrink-0 align-middle ${toneClass} ${className}`.trim()}
      style={{
        width: dim,
        height: dim,
        backgroundColor: 'currentColor',
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
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
  name: string;
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
