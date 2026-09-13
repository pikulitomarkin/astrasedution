'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from './LanguageSelector';
import CurrencySelector from './CurrencySelector';
import { AstraIcon, AstraMarkIcon } from '@/components/icons';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, status } = useAuth();
  const router = useRouter();
  const t = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = status === 'authenticated' && !!user;
  const freeGenerations = user?.credits ?? 3;

  const menuItems = [
    { label: t.navigation.home, href: '/' },
    { label: t.navigation.features, href: '#features' },
    { label: t.navigation.technology, href: '#technology' },
    { label: t.navigation.pricing, href: '#pricing' },
    { label: t.navigation.contact, href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isUserMenuOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsUserMenuOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isUserMenuOpen]);

  const closeMenus = () => {
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const go = (path: string) => {
    closeMenus();
    router.push(path);
  };

  const handleLogout = () => {
    closeMenus();
    logout();
    router.push('/');
  };

  const profileMenu = (
    <AnimatePresence>
      {isUserMenuOpen && user ? (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.16 }}
          className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-gold-primary/20 bg-black/90 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.65)] backdrop-blur-xl"
        >
          <div className="border-b border-white/10 px-3 py-3">
            <p className="truncate text-sm font-medium text-white">{user.name || user.email}</p>
            <p className="truncate text-xs text-zinc-400">{user.email}</p>
            <p className="mt-1 text-xs text-brand-glow">Créditos: {user.credits}</p>
          </div>
          <button
            type="button"
            onClick={() => go('/dashboard')}
            className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-white transition hover:bg-white/5"
          >
            <AstraIcon name="layoutDashboard" size={16} tone="gold" />
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => go('/create')}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-white transition hover:bg-white/5"
          >
            <AstraIcon name="wand" size={16} tone="cyan" />
            {t.common.myCreator}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10"
          >
            <AstraIcon name="logout" size={16} />
            {t.common.logout}
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  /* Pós-login: só o ícone de perfil no canto direito */
  if (isAuthenticated) {
    return (
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="flex justify-end px-4 py-4 sm:px-6 lg:px-8">
          <div ref={menuRef} className="pointer-events-auto relative">
            <button
              type="button"
              aria-label="Abrir perfil"
              aria-expanded={isUserMenuOpen}
              onClick={() => setIsUserMenuOpen((open) => !open)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition ${
                isScrolled || isUserMenuOpen
                  ? 'border-gold-primary/40 bg-black/70 text-gold-primary shadow-[0_0_24px_rgba(212,175,55,0.25)] backdrop-blur-xl'
                  : 'border-white/15 bg-black/40 text-white backdrop-blur-md hover:border-gold-primary/40 hover:text-gold-primary'
              }`}
            >
              <AstraIcon name="user" size={20} />
            </button>
            {profileMenu}
          </div>
        </div>
      </header>
    );
  }

  /* Visitante: navbar completa de marketing */
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <nav
          className={`flex items-center justify-between rounded-2xl px-6 py-4 transition-all duration-300 ${
            isScrolled
              ? 'glass-effect-light bg-black/30 backdrop-blur-xl'
              : 'glass-effect'
          }`}
        >
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex items-center space-x-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary p-2">
              <AstraMarkIcon className="h-6 w-6 text-black" size={24} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl font-bold tracking-tight text-white">AstraFuture</span>
              <span className="text-xs font-medium tracking-widest text-gold-gradient">
                SEDUCTION
              </span>
            </div>
          </button>

          <motion.div
            className="relative hidden items-center gap-3 overflow-hidden rounded-full px-5 py-2.5 lg:flex"
            style={{
              background:
                'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(34, 211, 238, 0.05) 100%)',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="h-2 w-2 rounded-full bg-brand-glow brand-glow-shadow" />
            <AstraIcon name="zap" size={16} tone="cyan" />
            <span className="text-sm font-semibold text-white">{t.common.freeGenerations}:</span>
            <span className="min-w-[24px] text-center text-lg font-bold text-brand-glow">
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
                type="button"
                onClick={() => router.push('/login')}
                className="rounded-full border border-gold-primary/40 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-gold-primary/10"
              >
                {t.common.login}
              </button>
              <button
                type="button"
                onClick={() => router.push('/cadastro')}
                className="btn-gold rounded-full px-6 py-2 text-sm font-semibold transition-all hover:opacity-90 hover:gold-shadow"
              >
                {t.common.vipAccess}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <AstraIcon name="x" size={24} className="text-white" />
            ) : (
              <AstraIcon name="menu" size={24} className="text-white" />
            )}
          </button>
        </nav>

        {isMenuOpen ? (
          <div className="glass-effect-light mt-2 rounded-2xl p-6 md:hidden">
            <div className="mb-4 flex items-center gap-3 rounded-full border border-brand-glow/20 bg-brand-glow/10 px-4 py-3">
              <AstraIcon name="zap" size={16} tone="cyan" />
              <span className="flex-1 text-sm font-semibold text-white">
                {t.common.freeGenerations}:
              </span>
              <span className="text-lg font-bold text-brand-glow">{freeGenerations}</span>
            </div>

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

              <div className="space-y-2 py-2">
                <LanguageSelector />
                <CurrencySelector />
              </div>

              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => go('/login')}
                  className="w-full rounded-full border border-gold-primary/40 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-gold-primary/10"
                >
                  {t.common.login}
                </button>
                <button
                  type="button"
                  onClick={() => go('/cadastro')}
                  className="btn-gold w-full rounded-full px-6 py-3 text-base font-semibold transition-all hover:opacity-90"
                >
                  {t.common.vipAccess}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
