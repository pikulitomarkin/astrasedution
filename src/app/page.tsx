'use client';

import { Header, HeroSection, Footer, PricingSection, FloatingCTA } from '@/components';
import { Cpu, Lock, Sparkles, Globe, Zap, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const features = [
    {
      icon: <Cpu className="h-8 w-8" />,
      title: 'IA Avançada',
      description: 'Algoritmos de machine learning de última geração para resultados precisos e instantâneos.',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: 'Segurança Máxima',
      description: 'Criptografia de ponta a ponta e protocolos de segurança empresariais.',
      color: 'from-emerald-500/20 to-green-500/20',
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Design Premium',
      description: 'Interface ciber-luxo com elementos de glassmorphism e animações fluidas.',
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Global Scale',
      description: 'Infraestrutura distribuída globalmente para latência mínima e alta disponibilidade.',
      color: 'from-amber-500/20 to-orange-500/20',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Performance',
      description: 'Processamento em tempo real com otimização para dispositivos de alta performance.',
      color: 'from-red-500/20 to-rose-500/20',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Conformidade',
      description: 'Totalmente compatível com GDPR, HIPAA e outras regulamentações internacionais.',
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
              Tecnologia <span className="gold-gradient">Exclusiva</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Descubra os recursos que fazem da AstraFutureSeduction a plataforma de IA mais avançada do mercado.
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
                  <div className="mb-6 inline-flex rounded-2xl bg-white/5 p-3">
                    <div className="gold-gradient">{feature.icon}</div>
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

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="glass-effect rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Pronto para a <span className="gold-gradient">Revolução Digital?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              Junte-se a milhares de visionários que já estão transformando seus negócios com IA de luxo.
            </p>
            
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => router.push('/login')}
                className="group gold-border rounded-full px-8 py-3 text-lg font-semibold text-white transition-all hover:bg-gold-primary/10 hover:gold-shadow flex items-center gap-2"
              >
                <Sparkles className="h-5 w-5 text-gold-primary group-hover:scale-110 transition-transform" />
                Comece agora gratuitamente
              </button>
            </div>

            <div className="mt-10">
              <p className="text-lg text-gray-300">
                Obtenha <span className="font-bold text-gold-light">1.000 créditos de geração</span> e acesso ao Criador VIP através do login
              </p>
            </div>
            <p className="mt-8 text-sm text-zinc-500">
              1.000 créditos de geração • Sem compromisso • Suporte 24/7
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
