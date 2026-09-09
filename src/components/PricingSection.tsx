"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Crown, Zap, Star, Building2, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency, type SsotPrice } from '@/contexts/CurrencyContext';

type ProductLine = 'future' | 'seduction';

interface PlanFeature {
  text: string;
  highlight?: boolean;
}

interface Plan {
  name: string;
  tagline: string;
  price: SsotPrice;
  period: string;
  highlightLine: string;
  features: PlanFeature[];
  recommended?: boolean;
  icon: React.ReactNode;
  gradient: string;
}

export default function PricingSection() {
  const router = useRouter();
  const t = useTranslation();
  const { formatSsotPrice } = useCurrency();
  const [product, setProduct] = useState<ProductLine>('future');

  const futurePlans: Plan[] = [
    {
      name: t.pricing.future.individual,
      tagline: t.pricing.future.individualTagline,
      price: { usd: 10, brl: 49 },
      period: t.pricing.monthly,
      highlightLine: t.pricing.future.individualHighlight,
      icon: <Zap className="h-6 w-6" />,
      gradient: 'from-zinc-700 to-zinc-800',
      features: [
        { text: t.pricing.future.features.oneTwin },
        { text: t.pricing.future.features.hdNoWatermark, highlight: true },
        { text: t.pricing.future.features.identityPassport },
        { text: t.pricing.features.emailSupport },
      ],
    },
    {
      name: t.pricing.future.professional,
      tagline: t.pricing.future.professionalTagline,
      price: { usd: 19, brl: 89 },
      period: t.pricing.monthly,
      highlightLine: t.pricing.future.professionalHighlight,
      recommended: true,
      icon: <Sparkles className="h-6 w-6" />,
      gradient: 'from-brand-glow to-brand-glow-light',
      features: [
        { text: t.pricing.future.features.fiveTwins, highlight: true },
        { text: t.pricing.future.features.batchVideo, highlight: true },
        { text: t.pricing.future.features.voice },
        { text: t.pricing.features.prioritySupport },
        { text: t.pricing.future.features.identityPassport },
      ],
    },
    {
      name: t.pricing.future.agency,
      tagline: t.pricing.future.agencyTagline,
      price: { usd: 39, brl: 199 },
      period: t.pricing.monthly,
      highlightLine: t.pricing.future.agencyHighlight,
      icon: <Building2 className="h-6 w-6" />,
      gradient: 'from-gold-primary to-gold-secondary',
      features: [
        { text: t.pricing.future.features.unlimitedTwins, highlight: true },
        { text: t.pricing.features.apiAccess, highlight: true },
        { text: t.pricing.future.features.multiUser, highlight: true },
        { text: t.pricing.features.vipSupport },
        { text: t.pricing.future.features.identityPassport },
      ],
    },
  ];

  const seductionPlans: Plan[] = [
    {
      name: t.pricing.seduction.basic,
      tagline: t.pricing.seduction.basicTagline,
      price: { usd: 12, brl: 59 },
      period: t.pricing.monthly,
      highlightLine: t.pricing.seduction.basicHighlight,
      icon: <Zap className="h-6 w-6" />,
      gradient: 'from-zinc-700 to-zinc-800',
      features: [
        { text: t.pricing.seduction.features.oneCharacter },
        { text: t.pricing.seduction.features.highRes, highlight: true },
        { text: t.pricing.seduction.features.ageVerified },
        { text: t.pricing.features.emailSupport },
      ],
    },
    {
      name: t.pricing.seduction.premium,
      tagline: t.pricing.seduction.premiumTagline,
      price: { usd: 24, brl: 119 },
      period: t.pricing.monthly,
      highlightLine: t.pricing.seduction.premiumHighlight,
      recommended: true,
      icon: <Heart className="h-6 w-6" />,
      gradient: 'from-brand-glow to-brand-glow-light',
      features: [
        { text: t.pricing.seduction.features.threeCharacters, highlight: true },
        { text: t.pricing.seduction.features.nailsFeet, highlight: true },
        { text: t.pricing.seduction.features.identityPassport },
        { text: t.pricing.features.prioritySupport },
      ],
    },
    {
      name: t.pricing.seduction.creatorStudio,
      tagline: t.pricing.seduction.creatorStudioTagline,
      price: { usd: 39, brl: 199 },
      period: t.pricing.monthly,
      highlightLine: t.pricing.seduction.creatorStudioHighlight,
      icon: <Crown className="h-6 w-6" />,
      gradient: 'from-gold-primary to-gold-secondary',
      features: [
        { text: t.pricing.seduction.features.videos, highlight: true },
        { text: t.pricing.seduction.features.commercialUse, highlight: true },
        { text: t.pricing.seduction.features.nailsFeet },
        { text: t.pricing.features.vipSupport },
        { text: t.pricing.seduction.features.identityPassport },
      ],
    },
  ];

  const plans = product === 'future' ? futurePlans : seductionPlans;

  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-glow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-brand-glow/30 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-4 w-4 text-brand-glow" />
            <span className="text-sm font-semibold text-brand-glow">
              {t.pricing.plansAndPrices}
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.pricing.chooseYourCreativePower}
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-4">
            {t.pricing.flexiblePlans}
          </p>
          <p className="text-sm text-brand-glow/90 max-w-2xl mx-auto">
            {t.pricing.trialNote}
          </p>
        </motion.div>

        {/* Product switcher — Future first */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-full glass-effect border border-white/10 gap-1">
            <button
              type="button"
              onClick={() => setProduct('future')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                product === 'future'
                  ? 'bg-gradient-to-r from-brand-glow to-brand-glow-light text-white shadow-lg'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.pricing.productFuture}
            </button>
            <button
              type="button"
              onClick={() => setProduct('seduction')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                product === 'seduction'
                  ? 'bg-gradient-to-r from-brand-glow to-brand-glow-light text-white shadow-lg'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.pricing.productSeduction}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={`${product}-${plan.name}`}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.recommended && (
                <motion.div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="px-4 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-brand-glow to-brand-glow-light shadow-lg inline-flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" aria-hidden />
                    {t.pricing.recommended}
                  </div>
                </motion.div>
              )}

              <motion.div
                className={`
                  relative h-full glass-effect rounded-3xl p-8 border transition-all duration-300
                  ${plan.recommended
                    ? 'border-brand-glow/50 md:scale-105'
                    : 'border-white/10 hover:border-brand-glow/30'
                  }
                `}
                whileHover={{
                  scale: 1.02,
                  rotateY: 2,
                  rotateX: -2,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 1000,
                }}
                transition={{ duration: 0.3 }}
              >
                {plan.recommended && (
                  <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                )}

                <div className="relative z-10">
                  <div className="mb-6">
                    <div
                      className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${plan.gradient} mb-4`}
                    >
                      <div className="text-white">
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">
                        {formatSsotPrice(plan.price)}
                      </span>
                      <span className="text-zinc-400">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-sm text-brand-glow mt-2 font-medium">
                      {plan.highlightLine}
                    </p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                      >
                        <Check
                          className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                            feature.highlight
                              ? 'text-brand-glow'
                              : 'text-zinc-500'
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            feature.highlight
                              ? 'text-white font-medium'
                              : 'text-zinc-400'
                          }`}
                        >
                          {feature.text}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => router.push('/cadastro')}
                    className={`
                      w-full py-4 rounded-full font-semibold text-white transition-all
                      ${plan.recommended
                        ? 'bg-gradient-to-r from-brand-glow to-brand-glow-light shadow-lg shadow-brand-glow/30'
                        : 'glass-effect-light border border-white/20 hover:border-brand-glow/50'
                      }
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t.common.startNow}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-zinc-500 text-sm">
            {t.pricing.includes}
          </p>
          <p className="text-zinc-600 text-xs mt-2">
            {t.pricing.cancelAnytime}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
