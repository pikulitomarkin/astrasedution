"use client";

import { Sparkles, Clapperboard } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

export default function HeroSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslation();
  
  // Parallax effect mais suave para não cortar conteúdo
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Background move mais devagar (reduzido de 150px para 100px)
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  // Conteúdo frontal move menos (reduzido de 300px para 150px)
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-32 pb-32"
    >
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, rgba(34, 211, 238, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 60%),
              linear-gradient(135deg, #020617 0%, #050b18 100%)
            `
          }}
        />
      </div>

      {/* Parallax Background - Gradiente com estrelas sutis */}
      <motion.div 
        className="absolute inset-0 z-[5]"
        style={{ y: backgroundY }}
      >
        {/* Gradiente base */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, rgba(34, 211, 238, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 80%, rgba(6, 182, 212, 0.08) 0%, transparent 60%)
            `
          }}
        />

        {/* Estrelas sutis */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20% 30%, rgba(255, 255, 255, 0.8), transparent),
              radial-gradient(2px 2px at 60% 70%, rgba(255, 255, 255, 0.6), transparent),
              radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.4), transparent),
              radial-gradient(1px 1px at 80% 10%, rgba(255, 255, 255, 0.7), transparent),
              radial-gradient(2px 2px at 90% 60%, rgba(255, 255, 255, 0.5), transparent),
              radial-gradient(1px 1px at 33% 80%, rgba(255, 255, 255, 0.6), transparent),
              radial-gradient(1px 1px at 15% 60%, rgba(255, 255, 255, 0.4), transparent)
            `,
            backgroundSize: '200% 200%',
          }}
        />

        {/* Grid overlay sutil */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </motion.div>

      {/* Conteúdo Principal com Parallax */}
      <motion.div 
        className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8"
        style={{ y: contentY }}
      >
        <div className="mx-auto max-w-5xl">
          {/* Badge Superior */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full px-5 py-2 glass-effect border border-brand-glow/30">
              <Sparkles className="h-4 w-4 text-brand-glow" />
              <span className="text-sm font-semibold text-brand-glow">
                {t.hero.extremeRealismTechnology}
              </span>
            </div>
          </motion.div>

          {/* Título Principal com Gradiente */}
          <motion.h1 
            className="text-center text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="block text-white">{t.hero.digitalSeduction}</span>
            <span 
              className="block mt-2 bg-gradient-to-r from-brand-glow via-brand-glow-light to-brand-glow-dark bg-clip-text text-transparent"
              style={{
                textShadow: '0 0 40px rgba(6, 182, 212, 0.3)',
              }}
            >
              {t.hero.extremeRealism}
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            className="text-center text-xl sm:text-2xl text-zinc-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {t.hero.subtitle1}
            <span className="block mt-2 text-brand-glow/80">
              {t.hero.subtitle2}
            </span>
          </motion.p>

          {/* Teaser Visual - Container de Imagem */}
          <motion.div
            className="relative mb-12 mx-auto max-w-4xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Container com blur lateral */}
            <div className="relative rounded-3xl overflow-hidden glass-effect border border-brand-glow/20">
              {/* Blur gradiente lateral */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 backdrop-blur-sm" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/80 via-black/40 to-transparent z-10 backdrop-blur-sm" />
              
              {/* Imagem Placeholder */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                <Image
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2787&auto=format&fit=crop"
                  alt={`${t.hero.example} ${t.hero.extremeRealism}`}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-80"
                  quality={75}
                  priority={false}
                />
                
                {/* Watermark elegante */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <motion.div
                    className="glass-effect-light px-8 py-4 rounded-2xl border border-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    <p className="text-white/90 text-lg sm:text-xl font-light tracking-wide text-center">
                      {t.hero.example}{' '}
                      <span className="font-semibold text-brand-glow text-brand-glow">
                        {t.hero.extremeRealism}
                      </span>
                    </p>
                  </motion.div>
                </div>

                {/* Overlay de brilho sutil */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
                  }}
                />
              </div>
            </div>

            {/* Efeito de glow ao redor da imagem */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-glow/20 via-brand-glow-light/20 to-brand-glow/20 rounded-3xl blur-2xl -z-10 opacity-50" />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <motion.button
              onClick={() => router.push('/create')}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-semibold text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.5), 0 0 60px rgba(34, 211, 238, 0.3)',
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 40px rgba(6, 182, 212, 0.7), 0 0 80px rgba(34, 211, 238, 0.5)',
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {/* Overlay animado no hover */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              
              <span className="relative z-10">{t.common.startNow}</span>
            </motion.button>
          </motion.div>

          {/* Video Demo Section */}
          <motion.div
            className="relative mb-16 mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="relative rounded-3xl overflow-hidden glass-effect border border-brand-glow/20">
              <div className="relative aspect-video bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
                >
                  <source
                    src="/videos/astra-model-cyberluxury-bg.mp4"
                    type="video/mp4"
                  />
                </video>
                
                {/* Overlay decorativo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Badge "Em Demonstração" */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="glass-effect-light px-4 py-2 rounded-full border border-brand-glow/30 inline-flex items-center gap-1.5">
                    <Clapperboard className="w-3.5 h-3.5 text-brand-glow" aria-hidden />
                    <span className="text-xs font-semibold text-brand-glow">
                      {t.hero.demo}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Efeito de glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-glow/20 via-brand-glow-light/20 to-brand-glow/20 rounded-3xl blur-2xl -z-10 opacity-30" />
          </motion.div>

          {/* Stats ou Features */}
          <motion.div
            className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {[
              { number: '8K', label: t.hero.stats.resolution },
              { number: '∞', label: t.hero.stats.customizations },
              { number: '99.9%', label: t.hero.stats.realism },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center glass-effect rounded-2xl p-6 border border-brand-glow/10"
                whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.3)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl font-bold text-brand-glow mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-zinc-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>


    </section>
  );
}