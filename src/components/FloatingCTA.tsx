"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar quando passar da primeira dobra (hero section)
      // Assumindo que hero tem ~100vh, mostramos após 80vh
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.8;

      setIsVisible(scrollPosition > threshold);
    };

    // Adicionar listener
    window.addEventListener('scroll', handleScroll);
    
    // Verificar posição inicial
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ 
            duration: 0.4,
            ease: "easeOut"
          }}
        >
          {/* Glow externo pulsante */}
          <motion.div
            className="absolute -inset-4 rounded-full opacity-50 blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Botão */}
          <motion.button
            onClick={() => router.push('/create')}
            className="relative group flex items-center gap-3 px-6 py-4 rounded-full text-white font-semibold overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
              boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4), 0 0 0 1px rgba(6, 182, 212, 0.2)',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 12px 40px rgba(6, 182, 212, 0.6), 0 0 0 1px rgba(6, 182, 212, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%', skewX: -20 }}
              animate={{ x: '200%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />

            {/* Conteúdo */}
            <div className="relative z-10 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span className="hidden sm:inline">Começar Agora</span>
              <span className="sm:hidden">Criar</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>

            {/* Partículas decorativas */}
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
            <motion.div
              className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-white"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </motion.button>

          {/* Tooltip opcional */}
          <motion.div
            className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            <div className="glass-effect px-3 py-2 rounded-lg border border-brand-glow/30 whitespace-nowrap">
              <p className="text-xs text-white font-medium">
                ✨ 3 gerações gratuitas disponíveis
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
