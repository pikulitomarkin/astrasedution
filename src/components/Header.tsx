'use client';

import { Menu, X, User, LogOut, Zap, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import CurrencySelector from './CurrencySelector';
import { useTranslation } from '@/hooks/useTranslation';
import { AstraMarkIcon } from '@/components/icons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, status } = useAuth();
  const freeGenerations = user?.credits ?? 3;
  const router = useRouter();
  const t = useTranslation();
  const isAuthenticated = status === 'authenticated' && !!user;

  const menuItems = [
    { label: t.navigation.home, href: '/' },
    { label: t.navigation.features, href: '#features' },
    { label: t.navigation.technology, href: '#technology' },
    { label: t.navigation.pricing, href: '#pricing' },
    { label: t.navigation.contact, href: '#contact' },
  ];

  // Detectar scroll para efeito de backdrop-blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <nav 
          className={`
            flex items-center justify-between rounded-2xl px-6 py-4 transition-all duration-300
            ${isScrolled 
              ? 'glass-effect-light backdrop-blur-xl bg-black/30' 
              : 'glass-effect'
            }
          `}
        >
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary p-2">
              <AstraMarkIcon className="h-6 w-6 text-black" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">
                AstraFuture
              </span>
              <span className="text-xs font-medium text-gold-gradient tracking-widest">
                SEDUCTION
              </span>
            </div>
          </div>

          {/* Free Generations Hook - Widget de Status */}
          <motion.div 
            className="hidden lg:flex items-center gap-3 px-5 py-2.5 rounded-full relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)',
              border: '1px solid transparent',
              backgroundClip: 'padding-box',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Borda em degradê */}
            <div 
              className="absolute inset-0 rounded-full opacity-50"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #0891b2 100%)',
                padding: '1px',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
              }}
            />

            {/* Ponto pulsante (glow indicator) */}
            <motion.div
              className="relative flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-2 h-2 rounded-full bg-brand-glow brand-glow-shadow" />
              <motion.div 
                className="absolute w-2 h-2 rounded-full bg-brand-glow"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Ícone de raio */}
            <Zap className="w-4 h-4 text-brand-glow" fill="currentColor" />

            {/* Texto do contador */}
            <span className="text-sm font-semibold text-white">
              {t.common.freeGenerations}:
            </span>
            
            {/* Número com destaque */}
            <motion.span 
              className="text-lg font-bold text-brand-glow text-brand-glow min-w-[24px] text-center"
              key={freeGenerations}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {freeGenerations}
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-zinc-300 transition-colors hover:text-gold-primary hover:text-glow"
              >
                {item.label}
              </a>
            ))}
            
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <CurrencySelector />
            </div>
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full border border-gold-primary/30 bg-black/50 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-gold-primary/10"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">{user.email}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl glass-effect border border-gold-light/20 p-2 shadow-xl backdrop-blur-xl">
                    <div className="p-3 border-b border-white/10">
                      <p className="text-sm font-medium text-white truncate">{user.name || user.email}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                      <p className="text-xs text-brand-glow mt-1">Créditos: {user.credits}</p>
                    </div>
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => router.push('/create')}
                      className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {t.common.myCreator}
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        router.push('/');
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      {t.common.logout}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push('/login')}
                  className="inline-flex items-center gap-2 rounded-full border border-gold-primary/40 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-gold-primary/10"
                >
                  <LogIn className="h-4 w-4 text-gold-primary" />
                  {t.common.login}
                </button>
                <button
                  onClick={() => router.push('/cadastro')}
                  className="btn-gold rounded-full px-6 py-2 text-sm font-semibold transition-all hover:opacity-90 hover:gold-shadow"
                >
                  {t.common.vipAccess}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="glass-effect-light mt-2 rounded-2xl p-6 md:hidden">
            {/* Free Generations Hook - Versão Mobile */}
            <motion.div 
              className="mb-4 flex items-center gap-3 px-4 py-3 rounded-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)',
                border: '1px solid transparent',
                backgroundClip: 'padding-box',
              }}
            >
              {/* Borda em degradê */}
              <div 
                className="absolute inset-0 rounded-full opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 50%, #0891b2 100%)',
                  padding: '1px',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                }}
              />

              {/* Ponto pulsante */}
              <motion.div
                className="relative flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-2 h-2 rounded-full bg-brand-glow brand-glow-shadow" />
                <motion.div 
                  className="absolute w-2 h-2 rounded-full bg-brand-glow"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <Zap className="w-4 h-4 text-brand-glow" fill="currentColor" />
              <span className="text-sm font-semibold text-white flex-1">
                {t.common.freeGenerations}:
              </span>
              <span className="text-lg font-bold text-brand-glow text-brand-glow">
                {freeGenerations}
              </span>
            </motion.div>

            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-base font-medium text-white transition-colors hover:text-gold-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              <div className="py-2 space-y-2">
                <LanguageSelector />
                <CurrencySelector />
              </div>
              
              {isAuthenticated ? (
                <div className="mt-4 space-y-2">
                  <div className="p-3 rounded-lg bg-white/5 border border-gold-light/20">
                    <p className="text-sm font-medium text-white truncate">{user.name || user.email}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    <p className="text-xs text-brand-glow mt-1">Créditos: {user.credits}</p>
                  </div>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="w-full text-left px-4 py-3 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-colors border border-white/20"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => router.push('/create')}
                    className="w-full text-left px-4 py-3 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-colors border border-white/20"
                  >
                    {t.common.myCreator}
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      router.push('/');
                    }}
                    className="w-full text-left px-4 py-3 text-base font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20 flex items-center gap-2"
                  >
                    <LogOut className="h-5 w-5" />
                    {t.common.logout}
                  </button>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => {
                      router.push('/login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-gold-primary/40 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-gold-primary/10"
                  >
                    <LogIn className="h-5 w-5 text-gold-primary" />
                    {t.common.login}
                  </button>
                  <button
                    onClick={() => {
                      router.push('/cadastro');
                      setIsMenuOpen(false);
                    }}
                    className="btn-gold w-full rounded-full px-6 py-3 text-base font-semibold transition-all hover:opacity-90"
                  >
                    {t.common.vipAccess}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}