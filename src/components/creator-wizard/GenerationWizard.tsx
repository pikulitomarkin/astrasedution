"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useWizardState } from '@/hooks/useWizardState';
import { Stepper, SliderComponent } from '@/components/creator-wizard';
import type { SliderConfig } from '@/types/creator-wizard';

// Configuração dos passos do wizard
const STEPS_CONFIG = [
  {
    id: 0,
    title: 'Base',
    description: 'Defina a etnia e idade',
    sliders: [
      {
        id: 'age',
        label: 'Idade',
        min: 18,
        max: 50,
        step: 1,
        defaultValue: 25,
        unit: ' anos',
        description: 'Idade aparente da modelo',
      },
      {
        id: 'ethnicity',
        label: 'Tonalidade da Pele',
        min: 0,
        max: 100,
        step: 5,
        defaultValue: 50,
        unit: '%',
        description: 'Varia de tons mais claros a mais escuros',
      },
      {
        id: 'height',
        label: 'Altura',
        min: 150,
        max: 190,
        step: 1,
        defaultValue: 170,
        unit: ' cm',
        description: 'Altura da modelo',
      },
    ],
  },
  {
    id: 1,
    title: 'Detalhes',
    description: 'Personalize pele e cabelo',
    sliders: [
      {
        id: 'skin-smoothness',
        label: 'Suavidade da Pele',
        min: 0,
        max: 100,
        step: 5,
        defaultValue: 80,
        unit: '%',
        description: 'Nível de perfeição e suavidade da pele',
      },
      {
        id: 'hair-length',
        label: 'Comprimento do Cabelo',
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 60,
        unit: '%',
        description: 'De curto a muito longo',
      },
      {
        id: 'hair-volume',
        label: 'Volume do Cabelo',
        min: 0,
        max: 100,
        step: 5,
        defaultValue: 50,
        unit: '%',
        description: 'Densidade e volume capilar',
      },
      {
        id: 'makeup-intensity',
        label: 'Intensidade da Maquiagem',
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 50,
        unit: '%',
        description: 'De natural a glamourosa',
      },
    ],
  },
  {
    id: 2,
    title: 'Extremidades',
    description: 'Detalhes de unhas e pés',
    sliders: [
      {
        id: 'nail-length',
        label: 'Comprimento das Unhas',
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 40,
        unit: '%',
        description: 'De curtas a alongadas',
      },
      {
        id: 'nail-art',
        label: 'Nail Art',
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 30,
        unit: '%',
        description: 'Nível de decoração das unhas',
      },
      {
        id: 'feet-care',
        label: 'Cuidado dos Pés',
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 70,
        unit: '%',
        description: 'Perfeição dos pés',
      },
    ],
  },
  {
    id: 3,
    title: 'Acessórios',
    description: 'Relógios, joias e eletrônicos',
    sliders: [
      {
        id: 'jewelry-level',
        label: 'Nível de Joias',
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 50,
        unit: '%',
        description: 'Quantidade e luxo das joias',
      },
      {
        id: 'watch-luxury',
        label: 'Luxo do Relógio',
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 60,
        unit: '%',
        description: 'Sofisticação do relógio',
      },
      {
        id: 'tech-accessories',
        label: 'Acessórios Tech',
        min: 0,
        max: 100,
        step: 10,
        defaultValue: 40,
        unit: '%',
        description: 'Presença de gadgets e tecnologia',
      },
    ],
  },
];

interface GenerationWizardProps {
  onComplete?: (values: Record<string, number>) => void;
}

export default function GenerationWizard({ onComplete }: GenerationWizardProps) {
  const {
    state,
    nextStep,
    prevStep,
    goToStep,
    updateSliderValue,
    getProgress,
  } = useWizardState(STEPS_CONFIG.length);

  const currentStepConfig = STEPS_CONFIG[state.activeStep];
  const progress = getProgress();

  const handleNext = () => {
    if (state.activeStep === STEPS_CONFIG.length - 1) {
      // Último passo - completar wizard
      onComplete?.(state.sliderValues);
    } else {
      nextStep();
    }
  };

  // Inicializar valores padrão dos sliders
  const getSliderValue = (sliderId: string, defaultValue: number) => {
    return state.sliderValues[sliderId] ?? defaultValue;
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Progress Bar no topo */}
        <div className="mb-8">
          <div className="glass-effect rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-brand-glow" />
                <h2 className="text-xl font-bold text-white">
                  Criador de Identidade
                </h2>
              </div>
              <div className="text-right">
                <div className="text-sm text-zinc-400">Progresso</div>
                <div className="text-2xl font-bold text-brand-glow">
                  {Math.round(progress)}%
                </div>
                <div className="text-xs text-zinc-500">
                  Passo {state.activeStep + 1} de {STEPS_CONFIG.length}
                </div>
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="relative h-2 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #06b6d4 0%, #22d3ee 50%, #0891b2 100%)',
                  boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-8">
          {/* Sidebar com Stepper */}
          <div className="order-2 lg:order-1">
            <Stepper
              activeStep={state.activeStep}
              completedSteps={state.completedSteps}
              onStepClick={goToStep}
            />
          </div>

          {/* Área de Conteúdo com Transições */}
          <div className="order-1 lg:order-2">
            <div className="glass-effect rounded-2xl p-8 min-h-[600px]">
              {/* Header do Passo Atual */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`header-${state.activeStep}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {currentStepConfig.title}
                  </h3>
                  <p className="text-zinc-400">
                    {currentStepConfig.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Campos com Transições Suaves */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`content-${state.activeStep}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 mb-8"
                >
                  {currentStepConfig.sliders.map((slider: SliderConfig) => (
                    <motion.div
                      key={slider.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="focus-within:ring-2 focus-within:ring-brand-glow/50 rounded-xl transition-all"
                    >
                      <SliderComponent
                        config={slider}
                        value={getSliderValue(slider.id, slider.defaultValue)}
                        onChange={updateSliderValue}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Botões de Navegação */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <motion.button
                  onClick={prevStep}
                  disabled={state.activeStep === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-full glass-effect border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:border-brand-glow/30 focus:outline-none focus:ring-2 focus:ring-brand-glow/50"
                  whileHover={{ scale: state.activeStep === 0 ? 1 : 1.02 }}
                  whileTap={{ scale: state.activeStep === 0 ? 1 : 0.98 }}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="font-medium">Anterior</span>
                </motion.button>

                <div className="text-center">
                  <div className="text-sm text-zinc-400">
                    {state.completedSteps.length} de {STEPS_CONFIG.length} passos completos
                  </div>
                </div>

                <motion.button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-glow/50"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>
                    {state.activeStep === STEPS_CONFIG.length - 1 
                      ? 'Finalizar' 
                      : 'Próximo'}
                  </span>
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
