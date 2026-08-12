'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LanguageProvider defaultLanguage="pt">
        <CurrencyProvider defaultCurrency="BRL">
          {children}
        </CurrencyProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
