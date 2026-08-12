"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const t = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.8;
      setIsVisible(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 group"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            className="absolute -inset-4 rounded-full opacity-50 blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.button
            onClick={() => router.push('/create')}
            className="relative group px-6 py-4 rounded-full text-white font-semibold overflow-hidden"
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
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%', skewX: -20 }}
              animate={{ x: '200%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
            />
            <span className="relative z-10 hidden sm:inline">{t.common.startNow}</span>
            <span className="relative z-10 sm:hidden">{t.floating.create}</span>
          </motion.button>

          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="glass-effect px-3 py-2 rounded-lg border border-brand-glow/30 whitespace-nowrap">
              <p className="text-xs text-white font-medium">{t.floating.freeAvailable}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
