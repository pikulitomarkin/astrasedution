'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'BRL' | 'USD' | 'EUR';

/** Preços oficiais do SSOT Retomada (tabelas USD + BRL fixas). */
export interface SsotPrice {
  usd: number;
  brl: number;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  /** @deprecated Prefer formatSsotPrice — conversão aproximada a partir de BRL. */
  formatPrice: (amount: number) => string;
  /** Formata preço com par oficial USD/BRL do SSOT; EUR ≈ USD × 0.92. */
  formatSsotPrice: (price: SsotPrice) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
  defaultCurrency?: Currency;
}

// Fallback legado (não usar para planos SSOT)
const CONVERSION_RATES: Record<Currency, number> = {
  BRL: 1,
  USD: 0.2,
  EUR: 0.18,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  BRL: 'R$',
  USD: '$',
  EUR: '€',
};

const LOCALE_FORMATS: Record<Currency, string> = {
  BRL: 'pt-BR',
  USD: 'en-US',
  EUR: 'de-DE',
};

function formatAmount(amount: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  const locale = LOCALE_FORMATS[currency];
  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return `${symbol} ${formattedNumber}`;
}

export function CurrencyProvider({
  children,
  defaultCurrency = 'BRL',
}: CurrencyProviderProps) {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);

  const formatPrice = (amountInBRL: number): string => {
    return formatAmount(amountInBRL * CONVERSION_RATES[currency], currency);
  };

  const formatSsotPrice = (price: SsotPrice): string => {
    if (currency === 'BRL') return formatAmount(price.brl, 'BRL');
    if (currency === 'USD') return formatAmount(price.usd, 'USD');
    // EUR não está na tabela SSOT — aproximação a partir do USD oficial
    return formatAmount(Math.round(price.usd * 0.92), 'EUR');
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, formatPrice, formatSsotPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
