'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const languages = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'es', label: 'ES', name: 'Español' },
] as const;

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass-effect border border-white/10 hover:border-brand-glow/30 transition-colors cursor-pointer">
        <Globe className="w-4 h-4 text-zinc-400" />
        <span className="text-sm font-medium text-white">{language.toUpperCase()}</span>
      </div>
      
      {/* Dropdown Menu */}
      <div className="absolute top-full right-0 mt-2 w-40 rounded-xl glass-effect border border-white/20 shadow-xl backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                language === lang.code
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{lang.label}</span>
                <span className="text-xs text-zinc-500">{lang.name}</span>
              </div>
              {language === lang.code && (
                <div className="w-2 h-2 rounded-full bg-brand-glow" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}