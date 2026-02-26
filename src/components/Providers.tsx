'use client';

import { SessionProvider } from 'next-auth/react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LanguageProvider defaultLanguage="en">
        <CurrencyProvider defaultCurrency="USD">
          {children}
        </CurrencyProvider>
      </LanguageProvider>
    </SessionProvider>
  );
}