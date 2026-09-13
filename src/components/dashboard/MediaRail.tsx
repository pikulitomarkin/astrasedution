'use client';

import { useRef } from 'react';
import { AstraIcon } from '@/components/icons';

type MediaRailProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function MediaRail({ title, subtitle, children }: MediaRailProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 480), behavior: 'smooth' });
  };

  return (
    <section className="relative">
      <div className="mb-3 flex items-end justify-between gap-4 px-1">
        <div>
          <h2 className="font-serif text-xl font-bold text-white md:text-2xl">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-zinc-400">{subtitle}</p> : null}
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            aria-label="Rolar para esquerda"
            onClick={() => scrollBy(-1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition hover:border-gold-primary/50 hover:text-gold-primary"
          >
            <AstraIcon name="arrowRight" size={16} className="rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Rolar para direita"
            onClick={() => scrollBy(1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition hover:border-gold-primary/50 hover:text-gold-primary"
          >
            <AstraIcon name="arrowRight" size={16} />
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto pb-3 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </section>
  );
}
