'use client';

import { Menu, X, Sparkles, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const menuItems = [
    { label: 'Início', href: '/' },
    { label: 'Recursos', href: '#features' },
    { label: 'Tecnologia', href: '#technology' },
    { label: 'Preços', href: '#pricing' },
    { label: 'Contato', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <nav className="glass-effect flex items-center justify-between rounded-2xl px-6 py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary p-2">
              <Sparkles className="h-6 w-6 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">
                AstraFuture
              </span>
              <span className="text-xs font-medium gold-gradient tracking-widest">
                SEDUCTION
              </span>
            </div>
          </div>

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
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full border border-gold-primary/30 bg-black/50 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-gold-primary/10"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">{session.user?.email}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl glass-effect border border-gold-light/20 p-2 shadow-xl backdrop-blur-xl">
                    <div className="p-3 border-b border-white/10">
                      <p className="text-sm font-medium text-white truncate">{session.user?.name || session.user?.email}</p>
                      <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                    </div>
                    <button
                      onClick={() => router.push('/create')}
                      className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      Meu Criador
                    </button>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="gold-border rounded-full px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-gold-primary/10 hover:gold-shadow"
              >
                Acesso VIP
              </button>
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
              {session ? (
                <div className="mt-4 space-y-2">
                  <div className="p-3 rounded-lg bg-white/5 border border-gold-light/20">
                    <p className="text-sm font-medium text-white truncate">{session.user?.name || session.user?.email}</p>
                    <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                  </div>
                  <button
                    onClick={() => router.push('/create')}
                    className="w-full text-left px-4 py-3 text-base font-medium text-white hover:bg-white/5 rounded-lg transition-colors border border-white/20"
                  >
                    Meu Criador
                  </button>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="w-full text-left px-4 py-3 text-base font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20 flex items-center gap-2"
                  >
                    <LogOut className="h-5 w-5" />
                    Sair
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className="gold-border mt-4 rounded-full px-6 py-3 text-base font-semibold text-white transition-all hover:bg-gold-primary/10"
                >
                  Acesso VIP
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}