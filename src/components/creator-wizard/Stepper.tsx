'use client';

import { Check, Circle, User, Palette, Hand, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const stepIcons = [User, Palette, Hand, Sparkles];
const stepTitles = ['Base', 'Detalhes', 'Extremidades', 'Acessórios'];
const stepDescriptions = [
  'Etnia e Idade',
  'Pele e Cabelo',
  'Unhas e Pés',
  'Relógios, Joias e Eletrônicos'
];

interface StepperProps {
  activeStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

export default function Stepper({ activeStep, completedSteps, onStepClick }: StepperProps) {
  return (
    <div className="w-full max-w-xs">
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="mb-6 text-lg font-semibold text-white">
          Criador de Modelo
        </h3>
        
        <div className="space-y-4">
          {stepTitles.map((title, index) => {
            const StepIcon = stepIcons[index];
            const isActive = activeStep === index;
            const isCompleted = completedSteps.includes(index);
            
            return (
              <motion.button
                key={index}
                onClick={() => onStepClick(index)}
                className={`glass-effect-light flex w-full items-center gap-3 rounded-xl p-4 text-left transition-all ${
                  isActive 
                    ? 'gold-border border-gold-primary/50 bg-gradient-to-r from-gold-primary/5 to-transparent' 
                    : 'border-transparent hover:border-gold-primary/30 hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  isActive 
                    ? 'bg-gradient-to-br from-gold-primary to-gold-secondary' 
                    : isCompleted 
                    ? 'bg-emerald-500/20' 
                    : 'bg-white/5'
                }`}>
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-emerald-400" />
                  ) : isActive ? (
                    <Circle className="h-5 w-5 text-black" />
                  ) : (
                    <StepIcon className="h-5 w-5 text-zinc-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      isActive ? 'text-white' : 'text-zinc-400'
                    }`}>
                      Passo {index + 1}
                    </span>
                    {isCompleted && (
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-400">
                        Concluído
                      </span>
                    )}
                  </div>
                  <h4 className={`font-semibold ${
                    isActive ? 'text-white' : 'text-zinc-300'
                  }`}>
                    {title}
                  </h4>
                  <p className="text-xs text-zinc-500">
                    {stepDescriptions[index]}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-zinc-400">Progresso</span>
            <span className="text-sm font-semibold text-white">
              {completedSteps.length} de 4
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-primary to-gold-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${(completedSteps.length / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}