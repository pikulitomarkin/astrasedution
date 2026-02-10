'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Watch, Gem, Cpu } from 'lucide-react';
import SliderComponent from './SliderComponent';
import { AccordionCategory } from '@/types/creator-wizard';

interface AccordionSectionProps {
  category: AccordionCategory;
  sliderValues: Record<string, number>;
  onSliderChange: (id: string, value: number) => void;
}

const categoryIcons: Record<string, React.ElementType> = {
  'relogios': Watch,
  'joias': Gem,
  'eletronicos': Cpu,
};

export default function AccordionSection({ 
  category, 
  sliderValues, 
  onSliderChange 
}: AccordionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = categoryIcons[category.id] || ChevronDown;

  return (
    <div className="glass-effect overflow-hidden rounded-2xl">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-6 text-left transition-all hover:bg-white/5"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-primary/20 to-gold-secondary/20">
            <Icon className="h-6 w-6 text-gold-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{category.title}</h3>
            <p className="text-sm text-zinc-400">{category.description}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-zinc-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 p-6">
              <div className="space-y-4">
                {category.sliders.map((slider) => (
                  <SliderComponent
                    key={slider.id}
                    config={slider}
                    value={sliderValues[slider.id] || slider.defaultValue}
                    onChange={onSliderChange}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}