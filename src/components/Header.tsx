'use client';

import { Menu, X, User, LogOut, Zap, LogIn } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
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
  const userMenuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: t.navigation.home, href: '/' },
    { label: t.navigation.features, href: '#features' },
    { label: t.navigation.technology, href: '#technology' },
    { label: t.navigation.pricing, href: '#pricing' },
    { label: t.navigation.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isUserMenuOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [isUserMenuOpen]);

  const goTo = (path: string) => {
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    router.push(path);
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    logout();
    router.push('/');
  };

  const profileMenu = (
    <div className="w-56 rounded-xl glass-effect border border-gold-light/20 p-2 shadow-xl backdrop-blur-xl">
      <div className="p-3 border-b border-white/10">
        <p className="text-sm font-medium text-white truncate">{user?.name || user?.email}</p>
        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
        <p className="text-xs text-brand-glow mt-1">Créditos: {user?.credits ?? 0}</p>
      </div>
      <button
        onClick={() => goTo('/dashboard')}
        className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/5 rounded-lg transition-colors"
      >
        Dashboard
      </button>
      <button
        onClick={() => goTo('/create')}
        className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/5 rounded-lg transition-colors"
      >
        {t.common.myCreator}
      </button>
      <button
        onClick={handleLogout}
        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        {t.common.logout}
      </button>
    </div>
  );

  // Logado: sem navbar — só o manequim flutuante no canto
  if (isAuthenticated) {
    return (
      <div className="fixed top-4 right-4 z-50 sm:top-6 sm:right-6" ref={userMenuRef}>
        <button
          type="button"
          onClick={() => setIsUserMenuOpen((open) => !open)}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-gold-primary/40 bg-gradient-to-br from-zinc-900 to-black shadow-[0_0_24px_rgba(201,162,39,0.2)] transition-all hover:border-gold-primary hover:shadow-[0_0_28px_rgba(201,162,39,0.35)]"
          aria-label="Menu do perfil"
          aria-expanded={isUserMenuOpen}
        >
          <span className="absolute inset-[2px] rounded-full bg-gradient-to-b from-zinc-800 to-zinc-950" />
          <User className="relative z-10 h-5 w-5 text-gold-primary transition-transform group-hover:scale-105" />
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-black bg-emerald-400" />
        </button>

        {isUserMenuOpen && (
          <div className="absolute right-0 top-full mt-2 z-50">
            {profileMenu}
          </div>
        )}
      </div>
    );
  }

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
          <button
            type="button"
            onClick={() => goTo('/')}
            className="flex items-center space-x-2 text-left"
            aria-label="Astra Seduction"
          >
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
          </button>

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
            <Zap className="w-4 h-4 text-brand-glow" fill="currentColor" />
            <span className="text-sm font-semibold text-white">
              {t.common.freeGenerations}:
            </span>
            <span className="text-lg font-bold text-brand-glow min-w-[24px] text-center">
              {freeGenerations}
            </span>
          </motion.div>

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
          </div>

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

        {/* Mobile Menu — apenas para visitantes */}
        {!isAuthenticated && isMenuOpen && (
          <div className="glass-effect-light mt-2 rounded-2xl p-6 md:hidden">
            <motion.div
              className="mb-4 flex items-center gap-3 px-4 py-3 rounded-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)',
                border: '1px solid transparent',
                backgroundClip: 'padding-box',
              }}
            >
              <Zap className="w-4 h-4 text-brand-glow" fill="currentColor" />
              <span className="text-sm font-semibold text-white flex-1">
                {t.common.freeGenerations}:
              </span>
              <span className="text-lg font-bold text-brand-glow">
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
