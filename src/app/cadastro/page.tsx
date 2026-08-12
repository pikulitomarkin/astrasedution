'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Lock, AlertCircle } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import { useTranslation } from '@/hooks/useTranslation';

export default function CadastroPage() {
  const t = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(name, email, password);
      router.push('/verificar?pending=1');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.common.invalidCredentials);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative">
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>

      <div className="w-full max-w-md">
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <motion.div
              className="w-32 h-32 rounded-full overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/logo-astra.png"
                alt="Astra Seduction Logo"
                width={128}
                height={128}
                className="w-full h-full object-contain"
                priority={false}
              />
            </motion.div>
            <motion.div
              className="absolute -inset-3 bg-gradient-to-r from-brand-glow/20 via-gold-primary/20 to-brand-glow/20 rounded-full blur-2xl -z-10"
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        <div className="glass-panel border border-gold-light/20 rounded-2xl p-8 backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-gradient mb-4">
              <UserPlus className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 font-playfair">
              {t.auth.signupTitle}
            </h1>
            <p className="text-gray-400">{t.auth.signupSubtitle}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t.common.name}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-light" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gold-light/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all"
                  placeholder={t.auth.namePlaceholder}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t.common.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-light" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gold-light/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all"
                  placeholder={t.auth.emailPlaceholder}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t.common.password}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-light" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gold-light/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">{t.common.minimumChars}</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t.auth.creatingAccount : t.auth.createAccount}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gold-light/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-gray-400">ou</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400">
                {t.common.alreadyHaveAccount}{' '}
                <Link
                  href="/login"
                  className="text-gold-primary hover:text-gold-light font-semibold transition-colors"
                >
                  {t.common.loginHere}
                </Link>
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <h3 className="text-lg font-semibold text-gold-light text-center">
                {t.common.benefits}
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold-primary rounded-full" />
                  {t.auth.creatorAccess}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold-primary rounded-full" />
                  {t.common.freeCredits}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold-primary rounded-full" />
                  {t.auth.realTimePreview}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold-primary rounded-full" />
                  {t.common.highResExport}
                </li>
              </ul>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-gray-500 hover:text-white text-sm transition-colors">
            {t.common.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
