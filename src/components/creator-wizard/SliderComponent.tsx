'use client';

import * as Slider from '@radix-ui/react-slider';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useState } from 'react';

interface SliderComponentProps {
  config: {
    id: string;
    label: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    unit?: string;
    description?: string;
  };
  value: number;
  onChange: (id: string, value: number) => void;
}

export default function SliderComponent({ config, value, onChange }: SliderComponentProps) {
  const [showDescription, setShowDescription] = useState(false);

  const handleValueChange = (newValue: number[]) => {
    if (newValue.length > 0) {
      onChange(config.id, newValue[0]);
    }
  };

  return (
    <div className="glass-effect-light group rounded-xl p-4 transition-all hover:gold-border hover:border-gold-primary/30">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-white">{config.label}</h4>
          {config.description && (
            <button
              onClick={() => setShowDescription(!showDescription)}
              className="text-zinc-500 hover:text-gold-primary"
              aria-label="Mostrar descrição"
            >
              <Info className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">
            {value}
            {config.unit && <span className="ml-1 text-sm text-zinc-400">{config.unit}</span>}
          </span>
        </div>
      </div>

      {showDescription && config.description && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-3 overflow-hidden"
        >
          <p className="text-sm text-zinc-400">{config.description}</p>
        </motion.div>
      )}

      <div className="mb-2">
        <Slider.Root
          className="relative flex h-5 w-full touch-none items-center"
          value={[value]}
          onValueChange={handleValueChange}
          min={config.min}
          max={config.max}
          step={config.step}
        >
          <Slider.Track className="relative h-1 flex-grow overflow-hidden rounded-full bg-white/10">
            <Slider.Range className="absolute h-full bg-gradient-to-r from-gold-primary to-gold-secondary" />
          </Slider.Track>
          <Slider.Thumb 
            className="block h-5 w-5 cursor-pointer rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:bg-gold-primary focus:outline-none focus:ring-2 focus:ring-gold-primary/50"
            aria-label={config.label}
          />
        </Slider.Root>
      </div>

      <div className="flex justify-between text-xs text-zinc-500">
        <span>{config.min}{config.unit}</span>
        <div className="flex items-center gap-1">
          <span>Passo: {config.step}</span>
        </div>
        <span>{config.max}{config.unit}</span>
      </div>

      {/* Valor visual em tempo real acima do thumb */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full"
        style={{ left: `${((value - config.min) / (config.max - config.min)) * 100}%` }}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="rounded-full bg-gradient-to-r from-gold-primary to-gold-secondary px-2 py-1 text-xs font-bold text-black">
          {value}{config.unit}
        </div>
      </motion.div>
    </div>
  );
}