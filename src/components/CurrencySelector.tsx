'use client';

import { useCurrency } from '@/contexts/CurrencyContext';
import { DollarSign, Euro } from 'lucide-react';
import { motion } from 'framer-motion';

const currencies = [
  {
    code: 'BRL' as const,
    label: 'BRL',
    name: 'Real',
    icon: <span className="text-[10px] font-bold leading-none tracking-tight">R$</span>,
  },
  { code: 'USD' as const, label: 'USD', name: 'Dólar', icon: <DollarSign className="w-4 h-4" /> },
  { code: 'EUR' as const, label: 'EUR', name: 'Euro', icon: <Euro className="w-4 h-4" /> },
] as const;

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass-effect border border-white/10 hover:border-brand-glow/30 transition-colors cursor-pointer">
        <div className="w-4 h-4 flex items-center justify-center">
          {currencies.find(c => c.code === currency)?.icon}
        </div>
        <span className="text-sm font-medium text-white">{currency}</span>
      </div>
      
      {/* Dropdown Menu */}
      <div className="absolute top-full right-0 mt-2 w-40 rounded-xl glass-effect border border-white/20 shadow-xl backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          {currencies.map((curr) => (
            <motion.button
              key={curr.code}
              onClick={() => setCurrency(curr.code)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                currency === curr.code
                  ? 'bg-white/10 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  {curr.icon}
                </div>
                <span className="font-medium">{curr.label}</span>
                <span className="text-xs text-zinc-500">{curr.name}</span>
              </div>
              {currency === curr.code && (
                <div className="w-2 h-2 rounded-full bg-brand-glow" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}