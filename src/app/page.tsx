'use client';

import { Header, HeroSection } from '@/components';
import { Cpu, Lock, Globe, Zap, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useTranslation } from '@/hooks/useTranslation';
import { AstraMarkIcon } from '@/components/icons';

const PricingSection = dynamic(() => import('@/components').then(mod => mod.PricingSection), { ssr: false });
const Footer = dynamic(() => import('@/components').then(mod => mod.Footer), { ssr: false });
const FloatingCTA = dynamic(() => import('@/components').then(mod => mod.FloatingCTA), { ssr: false });
const WaitlistSection = dynamic(() => import('@/components').then(mod => mod.WaitlistSection), { ssr: false });

export default function Home() {
  const router = useRouter();
  const t = useTranslation();
  const features = [
    {
      icon: <Cpu className="h-8 w-8" strokeWidth={1.75} />,
      title: t.features.advancedAI,
      description: t.features.advancedAIDesc,
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: <Lock className="h-8 w-8" strokeWidth={1.75} />,
      title: t.features.maximumSecurity,
      description: t.features.maximumSecurityDesc,
      color: 'from-emerald-500/20 to-green-500/20',
    },
    {
      icon: <AstraMarkIcon className="h-8 w-8" size={32} />,
      title: t.features.premiumDesign,
      description: t.features.premiumDesignDesc,
      color: 'from-amber-500/20 to-yellow-500/20',
    },
    {
      icon: <Globe className="h-8 w-8" strokeWidth={1.75} />,
      title: t.features.globalScale,
      description: t.features.globalScaleDesc,
      color: 'from-cyan-500/20 to-brand-glow/20',
    },
    {
      icon: <Zap className="h-8 w-8" strokeWidth={1.75} />,
      title: t.features.performance,
      description: t.features.performanceDesc,
      color: 'from-red-500/20 to-rose-500/20',
    },
    {
      icon: <Shield className="h-8 w-8" strokeWidth={1.75} />,
      title: t.features.compliance,
      description: t.features.complianceDesc,
      color: 'from-indigo-500/20 to-violet-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-24" id="features">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t.features.exclusiveTechnology}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              {t.features.discoverFeatures}
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-effect group relative overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:scale-105 hover:gold-shadow"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-2xl border border-gold-primary/20 bg-gold-primary/10 p-3 text-gold-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-4 text-zinc-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Waitlist / Contact */}
      <WaitlistSection />

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="glass-effect rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t.cta.readyForDigitalRevolution}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
                {t.cta.joinThousands}
              </p>
            
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => router.push('/login')}
                className="group gold-border rounded-full px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-gold-primary/10 hover:gold-shadow"
              >
                {t.common.startNow}
              </button>
            </div>

            <div className="mt-10">
              <p className="text-lg text-gray-300">
                {t.cta.getFreeCredits}
              </p>
            </div>
            <p className="mt-8 text-sm text-zinc-500">
              {t.cta.creditsGeneration}
            </p>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Floating CTA */}
      <FloatingCTA />
    </div>
  );
}
