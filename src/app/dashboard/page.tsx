'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Zap,
  Mail,
  Crown,
  LayoutDashboard,
  Wand2,
  ImageIcon,
  Loader2,
} from 'lucide-react';
import { Header } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import {
  fetchCredits,
  fetchGenerations,
  fetchGenerationImageBlob,
  generateTeaser,
  type CreditsInfo,
  type GenerationItem,
} from '@/lib/api';

function GenerationCard({
  item,
  accessToken,
}: {
  item: GenerationItem;
  accessToken: string;
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

  return (
    <div className="glass-panel border border-gold-light/20 rounded-2xl overflow-hidden">
      <div className="aspect-[3/4] bg-zinc-900 relative">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={`Geração ${item.style}`} className="w-full h-full object-cover" />
        ) : error ? (
          <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
            Erro ao carregar
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 text-brand-glow animate-spin" />
          </div>
        )}
        {item.watermarked && (
          <span className="absolute bottom-2 right-2 text-[10px] uppercase tracking-wider bg-black/70 text-gold-primary px-2 py-1 rounded">
            Astra Free
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm text-white capitalize">{item.style.replace(/_/g, ' ')}</p>
        <p className="text-xs text-zinc-500 mt-0.5">
          {new Date(item.created_at).toLocaleString('pt-BR')}
        </p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const t = useTranslation();
  const { user, status, accessToken, refreshProfile } = useAuth();
  const router = useRouter();
  const [creditsInfo, setCreditsInfo] = useState<CreditsInfo | null>(null);
  const [generations, setGenerations] = useState<GenerationItem[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('solo_lifestyle');
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [loadingGallery, setLoadingGallery] = useState(true);

  const TEASER_STYLES = [
    { id: 'solo_lifestyle', label: t.dashboard.styleLifestyle },
    { id: 'golden_hour', label: t.dashboard.styleGolden },
    { id: 'studio_glow', label: t.dashboard.styleStudio },
  ] as const;

  const loadCredits = useCallback(async () => {
    if (!accessToken) return;
    try {
      const info = await fetchCredits(accessToken);
      setCreditsInfo(info);
    } catch {
      await refreshProfile();
    }
  }, [accessToken, refreshProfile]);

  const loadGenerations = useCallback(async () => {
    if (!accessToken) return;
    setLoadingGallery(true);
    try {
      const items = await fetchGenerations(accessToken);
      setGenerations(items);
    } catch {
      setGenerations([]);
    } finally {
      setLoadingGallery(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?next=/dashboard');
    }
  }, [status, router]);

  useEffect(() => {
    loadCredits();
    loadGenerations();
  }, [loadCredits, loadGenerations]);

  const handleGenerate = async () => {
    if (!accessToken || generating) return;
    setGenerating(true);
    setGenError(null);
    try {
      const result = await generateTeaser(accessToken, selectedStyle);
      setGenerations((prev) => [result.generation, ...prev]);
      setCreditsInfo((prev) =>
        prev
          ? { ...prev, credits: result.credits_remaining }
          : prev
      );
      await refreshProfile();
      await loadCredits();
    } catch (err) {
      setGenError(err instanceof Error ? err.message : 'Erro ao gerar imagem');
    } finally {
      setGenerating(false);
    }
  };

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
  const canGenerate = user.email_verified && credits > 0;

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 text-brand-glow mb-2">
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-widest uppercase">
                {t.dashboard.vipPanel}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-playfair">
              {t.dashboard.hello}, {user.name || user.email.split('@')[0]}
            </h1>
            <p className="text-zinc-400 mt-2">
              {t.dashboard.tagline.replace('{max}', String(maxFree))}
            </p>
          </motion.div>

          {!user.email_verified && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-panel border border-amber-500/30 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex items-start gap-3 flex-1">
                <Mail className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">{t.dashboard.confirmEmail}</p>
                  <p className="text-sm text-zinc-400 mt-1">
                    {t.dashboard.verifyToUnlock.replace('{email}', user.email)}
                  </p>
                </div>
              </div>
              <Link
                href="/verificar?pending=1"
                className="shrink-0 gold-gradient text-black font-semibold px-6 py-2.5 rounded-lg text-center"
              >
                {t.dashboard.verifyNow}
              </Link>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="glass-panel border border-gold-light/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 text-gold-primary mb-4">
                <Crown className="w-5 h-5" />
                <span className="text-sm font-semibold">{t.dashboard.currentPlan}</span>
              </div>
              <p className="text-2xl font-bold text-white">{planLabel}</p>
              <p className="text-sm text-zinc-400 mt-2">
                {planLabel === 'FREE'
                  ? t.dashboard.freeTeasers.replace('{max}', String(maxFree))
                  : t.dashboard.premiumActive}
              </p>
            </motion.div>

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
                  <span className="text-sm font-semibold">{t.dashboard.creditsLeft}</span>
                </div>
                <p className="text-4xl font-bold text-white">{credits}</p>
                <p className="text-sm text-zinc-400 mt-2">
                  {t.dashboard.ofFreePlan.replace('{max}', String(maxFree))}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-panel border border-gold-light/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 text-emerald-400 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-semibold">{t.dashboard.accountStatus}</span>
              </div>
              <p className="text-lg font-semibold text-white">
                {user.email_verified ? t.dashboard.active : t.dashboard.pendingVerification}
              </p>
              <p className="text-sm text-zinc-400 mt-2">
                {user.email_verified
                  ? t.dashboard.generationsCreated.replace('{count}', String(generations.length))
                  : t.dashboard.awaitingEmail}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel border border-gold-light/20 rounded-3xl p-8 md:p-10 mb-10"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-primary/20 border border-gold-light/30 shrink-0">
                <Wand2 className="w-8 h-8 text-gold-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white font-playfair mb-2">
                  {t.dashboard.generateTeaser}
                </h2>
                <p className="text-zinc-400 mb-6 max-w-xl">
                  {t.dashboard.generateHint}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {TEASER_STYLES.map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      disabled={!canGenerate || generating}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedStyle === style.id
                          ? 'gold-gradient text-black'
                          : 'border border-zinc-700 text-zinc-300 hover:border-gold-light/40'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>

                {genError && (
                  <p className="text-red-400 text-sm mb-4" role="alert">
                    {genError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!canGenerate || generating}
                  className="inline-flex items-center gap-2 gold-gradient text-black font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.dashboard.generating}
                    </>
                  ) : (
                    `${t.dashboard.generateImage} (${credits} ${
                      credits !== 1 ? t.dashboard.credits : t.dashboard.credit
                    })`
                  )}
                </button>

                {!user.email_verified && (
                  <p className="text-amber-400 text-sm mt-4">
                    {t.dashboard.verifyToGenerate}
                  </p>
                )}
                {user.email_verified && credits === 0 && (
                  <p className="text-zinc-500 text-sm mt-4">
                    {t.dashboard.noCredits.replace('{max}', String(maxFree))}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <ImageIcon className="w-5 h-5 text-brand-glow" />
              <h2 className="text-xl font-bold text-white font-playfair">{t.dashboard.yourGenerations}</h2>
            </div>

            {loadingGallery ? (
              <div className="flex justify-center py-16">
                <Loader2 className="w-10 h-10 text-brand-glow animate-spin" />
              </div>
            ) : generations.length === 0 ? (
              <div className="glass-panel border border-dashed border-zinc-700 rounded-2xl p-12 text-center">
                <p className="text-zinc-500">
                  {t.dashboard.noImagesYet}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {generations.map((item) => (
                  <GenerationCard
                    key={item.id}
                    item={item}
                    accessToken={accessToken!}
                  />
                ))}
              </div>
            )}
          </motion.section>
        </div>
      </main>
    </div>
  );
}
