'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'BRL' | 'USD' | 'EUR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
  defaultCurrency?: Currency;
}

// Taxas de conversão (exemplo - em produção viria de uma API)
const CONVERSION_RATES: Record<Currency, number> = {
  BRL: 1,
  USD: 0.2, // 1 BRL = 0.2 USD (aproximadamente)
  EUR: 0.18, // 1 BRL = 0.18 EUR (aproximadamente)
};

// Símbolos das moedas
const CURRENCY_SYMBOLS: Record<Currency, string> = {
  BRL: 'R$',
  USD: '$',
  EUR: '€',
};

// Formatação localizada
const LOCALE_FORMATS: Record<Currency, string> = {
  BRL: 'pt-BR',
  USD: 'en-US',
  EUR: 'de-DE', // Alemão para formato europeu
};

export function CurrencyProvider({ 
  children, 
  defaultCurrency = 'BRL' 
}: CurrencyProviderProps) {
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);

  const formatPrice = (amountInBRL: number): string => {
    const convertedAmount = amountInBRL * CONVERSION_RATES[currency];
    const symbol = CURRENCY_SYMBOLS[currency];
    const locale = LOCALE_FORMATS[currency];
    
    // Formata o número de acordo com a localidade
    const formattedNumber = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(convertedAmount);

    return `${symbol} ${formattedNumber}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
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