'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LanguageProvider defaultLanguage="en">
        <CurrencyProvider defaultCurrency="USD">
          {children}
        </CurrencyProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
