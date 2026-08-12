"use client";

import { motion } from 'framer-motion';
import { Check, Sparkles, Crown, Zap, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/contexts/CurrencyContext';

interface PlanFeature {
  text: string;
  highlight?: boolean;
}

interface Plan {
  name: string;
  tagline: string;
  price: string;
  period: string;
  credits: string;
  features: PlanFeature[];
  recommended?: boolean;
  icon: React.ReactNode;
  gradient: string;
}



export default function PricingSection() {
  const router = useRouter();
  const t = useTranslation();
  const { formatPrice } = useCurrency();

  const plans: Plan[] = [
    {
      name: 'Standard',
      tagline: t.pricing.forBeginners,
      price: formatPrice(49),
      period: t.pricing.monthly,
      credits: `500 ${t.pricing.creditsMonth}`,
      icon: <Zap className="h-6 w-6" />,
      gradient: 'from-zinc-700 to-zinc-800',
      features: [
        { text: `500 ${t.pricing.features.generationsMonthly}` },
        { text: t.pricing.features.hdResolution },
        { text: t.pricing.features.emailSupport },
        { text: t.pricing.features.basicStyleLibrary },
        { text: t.pricing.features.pngExport },
      ],
    },
    {
      name: 'Premium',
      tagline: t.pricing.mostPopular,
      price: formatPrice(149),
      period: t.pricing.monthly,
      credits: `2.000 ${t.pricing.creditsMonth}`,
      recommended: true,
      icon: <Sparkles className="h-6 w-6" />,
      gradient: 'from-brand-glow to-brand-glow-light',
      features: [
        { text: `2.000 ${t.pricing.features.generationsMonthly}`, highlight: true },
        { text: t.pricing.features.ultraHdResolution, highlight: true },
        { text: t.pricing.features.prioritySupport },
        { text: t.pricing.features.completeStyleLibrary },
        { text: t.pricing.features.multipleExportFormats },
        { text: t.pricing.features.apiAccess, highlight: true },
        { text: t.pricing.features.watermarkRemover },
      ],
    },
    {
      name: 'Deluxe',
      tagline: t.pricing.vipExperience,
      price: formatPrice(399),
      period: t.pricing.monthly,
      credits: `10.000 ${t.pricing.creditsMonth}`,
      icon: <Crown className="h-6 w-6" />,
      gradient: 'from-gold-primary to-gold-secondary',
      features: [
        { text: `10.000 ${t.pricing.features.generationsMonthly}`, highlight: true },
        { text: t.pricing.features.resolution8k, highlight: true },
        { text: t.pricing.features.vipSupport },
        { text: t.pricing.features.earlyAccess, highlight: true },
        { text: t.pricing.features.premiumLibrary },
        { text: t.pricing.features.unlimitedApi, highlight: true },
        { text: t.pricing.features.personalizedTraining },
        { text: t.pricing.features.oneOnOneConsulting },
      ],
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-glow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            {t.pricing.flexiblePlans}
          </p>
        </motion.div>

        {/* Cards de Planos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Badge Recomendado */}
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
                    RECOMENDADO
                  </div>
                </motion.div>
              )}

              {/* Card */}
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
                {/* Luz interna para plano recomendado */}
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

                {/* Glow border effect on hover */}
                <motion.div
                  className="absolute -inset-0.5 rounded-3xl opacity-0 blur-xl transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, var(--color-${plan.recommended ? 'brand-glow' : 'gold-primary'}), transparent)`,
                  }}
                  whileHover={{ opacity: 0.4 }}
                />

                {/* Conteúdo do Card */}
                <div className="relative z-10">
                  {/* Header do Plano */}
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

                  {/* Preço */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-zinc-400">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-sm text-brand-glow mt-2 font-medium">
                      {plan.credits}
                    </p>
                  </div>

                  {/* Features */}
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

                  {/* CTA Button */}
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
                    Começar Agora
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer da seção */}
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
