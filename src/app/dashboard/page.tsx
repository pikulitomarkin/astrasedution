'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Header } from '@/components';
import { AstraIcon } from '@/components/icons';
import { PlayerHud } from '@/components/dashboard/PlayerHud';
import { MediaRail } from '@/components/dashboard/MediaRail';
import { MissionCard } from '@/components/dashboard/MissionCard';
import { useAuth } from '@/contexts/AuthContext';
import {
  fetchCredits,
  fetchGenerations,
  fetchGenerationImageBlob,
  generateTeaser,
  type CreditsInfo,
  type GenerationItem,
} from '@/lib/api';

const TEASER_MISSIONS = [
  {
    id: 'solo_lifestyle',
    title: 'Lifestyle Solo',
    description: 'Cena diária com presença cinematográfica.',
    icon: 'camera',
    gradient: 'from-[#1a1208] via-[#3d2a12] to-[#0a1620]',
  },
  {
    id: 'golden_hour',
    title: 'Golden Hour',
    description: 'Luz quente de fim de tarde, look premium.',
    icon: 'sun',
    gradient: 'from-[#2a1a05] via-[#6b4510] to-[#1a0f08]',
  },
  {
    id: 'studio_glow',
    title: 'Studio Glow',
    description: 'Estúdio clean com glow editorial.',
    icon: 'spotlight',
    gradient: 'from-[#0b1520] via-[#123044] to-[#1a1208]',
  },
] as const;

function GenerationPoster({
  item,
  accessToken,
  onOpen,
  compact,
}: {
  item: GenerationItem;
  accessToken: string;
  onOpen: () => void;
  compact?: boolean;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;
    fetchGenerationImageBlob(accessToken, item.id)
      .then((blob) => {
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setSrc(objectUrl);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [accessToken, item.id]);

  if (compact) {
    return (
      <button type="button" onClick={onOpen} className="h-full w-full overflow-hidden">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={item.style} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-900">
            {error ? (
              <AstraIcon name="image" size={22} className="text-zinc-600" />
            ) : (
              <AstraIcon name="loader2" size={20} className="h-5 w-5 animate-spin text-brand-glow" />
            )}
          </div>
        )}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="group relative h-[280px] w-[180px] shrink-0 overflow-hidden rounded-xl border border-white/10 text-left sm:h-[320px] sm:w-[210px]"
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={item.style}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-zinc-900">
          {error ? (
            <AstraIcon name="image" size={28} className="text-zinc-600" />
          ) : (
            <AstraIcon name="loader2" size={28} className="h-7 w-7 animate-spin text-brand-glow" />
          )}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      {item.watermarked ? (
        <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold-primary">
          Free
        </span>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="truncate text-sm font-semibold capitalize text-white">
          {item.style.replace(/_/g, ' ')}
        </p>
        <p className="text-[11px] text-zinc-400">
          {new Date(item.created_at).toLocaleDateString('pt-BR')}
        </p>
      </div>
    </motion.button>
  );
}

export default function DashboardPage() {
  const { user, status, accessToken, refreshProfile } = useAuth();
  const router = useRouter();
  const [creditsInfo, setCreditsInfo] = useState<CreditsInfo | null>(null);
  const [generations, setGenerations] = useState<GenerationItem[]>([]);
  const [generatingStyle, setGeneratingStyle] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [lightbox, setLightbox] = useState<{ src: string; label: string } | null>(null);

  const loadCredits = useCallback(async () => {
    if (!accessToken) return;
    try {
      setCreditsInfo(await fetchCredits(accessToken));
    } catch {
      await refreshProfile();
    }
  }, [accessToken, refreshProfile]);

  const loadGenerations = useCallback(async () => {
    if (!accessToken) return;
    setLoadingGallery(true);
    try {
      setGenerations(await fetchGenerations(accessToken));
    } catch {
      setGenerations([]);
    } finally {
      setLoadingGallery(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?next=/dashboard');
  }, [status, router]);

  useEffect(() => {
    void loadCredits();
    void loadGenerations();
  }, [loadCredits, loadGenerations]);

  const credits = creditsInfo?.credits ?? user?.credits ?? 0;
  const planLabel = (creditsInfo?.plan ?? user?.plan ?? 'free').toUpperCase();
  const maxFree = creditsInfo?.max_free_credits ?? 3;
  const canGenerate = !!user?.email_verified && credits > 0;
  const displayName = user?.name || user?.email.split('@')[0] || 'Operador';
  const featured = generations[0] ?? null;

  const runTeaserMission = async (styleId: string) => {
    if (!accessToken || generatingStyle) return;
    if (!user?.email_verified) {
      setToast('Verifique seu email para liberar missões de geração.');
      return;
    }
    if (credits <= 0) {
      setToast('Energia esgotada. Recarregue créditos para continuar.');
      return;
    }
    setGeneratingStyle(styleId);
    setToast(null);
    try {
      const result = await generateTeaser(accessToken, styleId);
      setGenerations((prev) => [result.generation, ...prev]);
      setCreditsInfo((prev) => (prev ? { ...prev, credits: result.credits_remaining } : prev));
      await refreshProfile();
      await loadCredits();
      setToast('Missão concluída · teaser adicionado à galeria.');
    } catch (err) {
      setToast(err instanceof Error ? err.message : 'Falha ao completar a missão');
    } finally {
      setGeneratingStyle(null);
    }
  };

  const openGeneration = async (item: GenerationItem) => {
    if (!accessToken) return;
    try {
      const blob = await fetchGenerationImageBlob(accessToken, item.id);
      setLightbox({
        src: URL.createObjectURL(blob),
        label: item.style.replace(/_/g, ' '),
      });
    } catch {
      setToast('Não foi possível abrir este clear.');
    }
  };

  if (status === 'loading' || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-brand-glow" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="relative isolate overflow-hidden pt-24">
        <div className="absolute inset-0 -z-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full min-h-[520px] w-full object-cover opacity-35"
            src="/videos/astra-model-cyberluxury-bg.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        <div className="mx-auto max-w-7xl space-y-8 px-4 pb-10 pt-6 md:px-8">
          <PlayerHud
            displayName={displayName}
            plan={planLabel}
            credits={credits}
            maxCredits={maxFree}
            generationsCount={generations.length}
            emailVerified={user.email_verified}
          />

          {!user.email_verified && (
            <div className="astra-panel flex flex-col gap-4 rounded-2xl border border-amber-500/30 p-5 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-start gap-3">
                <AstraIcon name="mail" size={22} tone="gold" />
                <div>
                  <p className="font-medium text-white">Missão bloqueada · confirme o email</p>
                  <p className="text-sm text-zinc-400">
                    Verifique {user.email} para ativar as gerações.
                  </p>
                </div>
              </div>
              <Link
                href="/verificar?pending=1"
                className="rounded-full bg-gold-gradient px-5 py-2.5 text-center text-sm font-semibold text-black"
              >
                Verificar agora
              </Link>
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-glow">
                Missão em destaque
              </p>
              <h2 className="max-w-xl font-serif text-4xl font-bold leading-tight md:text-5xl">
                Entre no loop de criação
              </h2>
              <p className="mt-3 max-w-lg text-zinc-300">
                Lobby cinematográfico: cards grandes, energia (créditos) e XP por clear. Clique numa
                missão e jogue.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => router.push('/create')}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-sm font-bold text-black shadow-[0_0_30px_rgba(212,175,55,0.25)] transition hover:opacity-90"
                >
                  <AstraIcon name="passport" size={18} />
                  Criar Identity Passport
                </button>
                <button
                  type="button"
                  disabled={!canGenerate || !!generatingStyle}
                  onClick={() => void runTeaserMission('solo_lifestyle')}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-glow/40 bg-brand-glow/10 px-6 py-3 text-sm font-semibold text-brand-glow transition hover:bg-brand-glow/20 disabled:opacity-50"
                >
                  {generatingStyle ? (
                    <AstraIcon name="loader2" size={16} className="h-4 w-4 animate-spin" />
                  ) : (
                    <AstraIcon name="zap" size={18} tone="cyan" />
                  )}
                  Clear rápido · 1 energia
                </button>
              </div>
              {toast ? (
                <p className="mt-4 text-sm text-brand-glow" role="status">
                  {toast}
                </p>
              ) : null}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="astra-panel relative overflow-hidden rounded-3xl p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-primary">
                Último clear
              </p>
              {featured && accessToken ? (
                <div className="mt-3 flex gap-4">
                  <div className="h-36 w-28 overflow-hidden rounded-xl bg-zinc-900">
                    <GenerationPoster
                      item={featured}
                      accessToken={accessToken}
                      compact
                      onOpen={() => void openGeneration(featured)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <p className="font-serif text-xl capitalize text-white">
                        {featured.style.replace(/_/g, ' ')}
                      </p>
                      <p className="mt-1 text-sm text-zinc-400">
                        {new Date(featured.created_at).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void openGeneration(featured)}
                      className="inline-flex items-center gap-2 text-sm text-gold-primary"
                    >
                      Replay visual <AstraIcon name="arrowRight" size={14} tone="gold" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-white/15 p-6 text-sm text-zinc-500">
                  Nenhum clear ainda. Escolha uma missão abaixo para começar o run.
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <main className="relative z-10 -mt-2 space-y-10 bg-gradient-to-b from-transparent via-black to-black px-4 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <MediaRail
            title="Missões principais"
            subtitle="Cada card é uma entrada de jogo · clique para jogar"
          >
            <MissionCard
              title="Identity Passport"
              description="Monte um twin consistente Future-first no criador."
              icon="passport"
              tone="gold"
              gradient="from-[#2a1f0a] via-[#1a1408] to-[#061018]"
              badge="Core"
              costLabel="Lobby"
              onClick={() => router.push('/create')}
            />
            <MissionCard
              title="Cérebro Astra"
              description="Orquestração de teaser com watermark Free."
              icon="gears"
              tone="cyan"
              gradient="from-[#061820] via-[#0a2030] to-[#120e08]"
              badge="Run"
              costLabel="1 energia"
              locked={!canGenerate}
              loading={!!generatingStyle}
              onClick={() => void runTeaserMission('solo_lifestyle')}
            />
            <MissionCard
              title="Studio Editorial"
              description="Missão visual com glow de estúdio."
              icon="spotlight"
              tone="gold"
              gradient="from-[#1a1020] via-[#201810] to-[#0a1218]"
              badge="Teaser"
              costLabel="1 energia"
              locked={!canGenerate}
              loading={generatingStyle === 'studio_glow'}
              onClick={() => void runTeaserMission('studio_glow')}
            />
            <MissionCard
              title="Gate Training"
              description="Treino de consistência — prepare no /create."
              icon="lock"
              tone="cyan"
              gradient="from-[#081018] via-[#102030] to-[#1a1408]"
              badge="Prep"
              costLabel="Passport"
              onClick={() => router.push('/create')}
            />
          </MediaRail>

          <MediaRail title="Modos de teaser" subtitle="Clique para gastar 1 energia e gerar na hora">
            {TEASER_MISSIONS.map((mission) => (
              <MissionCard
                key={mission.id}
                title={mission.title}
                description={mission.description}
                icon={mission.icon}
                tone="gold"
                gradient={mission.gradient}
                badge="Teaser"
                costLabel="1 energia"
                locked={!canGenerate}
                loading={generatingStyle === mission.id}
                onClick={() => void runTeaserMission(mission.id)}
              />
            ))}
          </MediaRail>

          <MediaRail
            title="Continuar assistindo"
            subtitle={
              generations.length
                ? `${generations.length} clear(s) no seu histórico`
                : 'Sua galeria aparece aqui após a primeira missão'
            }
          >
            {loadingGallery ? (
              <div className="flex h-[280px] w-full items-center justify-center">
                <AstraIcon name="loader2" size={32} className="h-8 w-8 animate-spin text-brand-glow" />
              </div>
            ) : generations.length === 0 ? (
              <div className="flex h-[200px] min-w-full items-center justify-center rounded-2xl border border-dashed border-white/15 text-sm text-zinc-500">
                Sem clears — complete uma missão de teaser para popular este trilho.
              </div>
            ) : (
              generations.map((item) => (
                <GenerationPoster
                  key={item.id}
                  item={item}
                  accessToken={accessToken!}
                  onOpen={() => void openGeneration(item)}
                />
              ))
            )}
          </MediaRail>

          {user.email_verified && credits === 0 ? (
            <div className="astra-panel rounded-2xl p-6 text-center">
              <p className="font-serif text-xl text-white">Energia zerada</p>
              <p className="mt-2 text-sm text-zinc-400">
                Você usou as {maxFree} gerações Free. Entre na waitlist para a próxima wave.
              </p>
              <Link href="/#contact" className="mt-4 inline-block text-sm text-gold-primary underline">
                Ir para waitlist
              </Link>
            </div>
          ) : null}
        </div>
      </main>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal
          onClick={() => {
            URL.revokeObjectURL(lightbox.src);
            setLightbox(null);
          }}
        >
          <div
            className="relative max-h-[90vh] max-w-3xl overflow-hidden rounded-2xl border border-gold-primary/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src}
              alt={lightbox.label}
              className="max-h-[85vh] w-full object-contain"
            />
            <button
              type="button"
              className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-sm text-white"
              onClick={() => {
                URL.revokeObjectURL(lightbox.src);
                setLightbox(null);
              }}
            >
              Fechar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
