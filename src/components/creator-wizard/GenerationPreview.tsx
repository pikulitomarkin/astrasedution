'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Sparkles, Cpu, Palette, Anchor, Sun, CheckCircle } from 'lucide-react';

interface GenerationPreviewProps {
  isGenerating?: boolean;
  progress?: number;
  onComplete?: () => void;
}

const steps = [
  { text: 'Injetando texturas de pele...', icon: Palette, color: '#A78BFA' },
  { text: 'Ancorando acessórios...', icon: Anchor, color: '#38BDF8' },
  { text: 'Sincronizando luz ambiente...', icon: Sun, color: '#FBBF24' },
  { text: 'Processando reflexos...', icon: Sparkles, color: '#F472B6' },
  { text: 'Otimizando geometria...', icon: Cpu, color: '#34D399' },
  { text: 'Renderizando final...', icon: Zap, color: '#F87171' },
];

export default function GenerationPreview({ 
  isGenerating = false, 
  progress = 0,
  onComplete 
}: GenerationPreviewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isGenerating) {
      // Usar setTimeout para evitar chamada síncrona
      const timer = setTimeout(() => {
        setCurrentStep(0);
        setIsComplete(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            onComplete?.();
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isGenerating, onComplete]);

  const calculatedProgress = isGenerating 
    ? Math.min(100, (currentStep / steps.length) * 100 + (progress / 100) * (100 / steps.length))
    : 0;

  return (
    <div className="relative">
      {/* Frame com borda animada */}
      <div className="relative rounded-2xl overflow-hidden border border-transparent p-[2px]">
        {/* Gradiente animado nas bordas */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '200% 0%' }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37, #FFD700, #D4AF37)',
            backgroundSize: '200% 100%',
            filter: 'blur(8px)',
            opacity: 0.7,
          }}
        />
        
        {/* Conteúdo principal */}
        <div className="relative glass-effect rounded-2xl p-8 backdrop-blur-xl">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary mb-4">
              <Zap className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isComplete ? 'Master Scene Gerada!' : 'Gerando Master Scene'}
            </h2>
            <p className="text-gray-400">
              {isComplete 
                ? 'Sua cena está pronta para visualização e exportação'
                : 'Processando cada detalhe com IA de luxo'
              }
            </p>
          </div>

          {/* Barra de progresso */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-300">Progresso</span>
              <span className="text-sm font-bold gold-gradient">
                {Math.round(calculatedProgress)}%
              </span>
            </div>
            
            <div className="relative h-4 rounded-full bg-black/50 border border-gold-light/30 overflow-hidden">
              {/* Barra de progresso com gradiente */}
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${calculatedProgress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  background: 'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)',
                  backgroundSize: '200% 100%',
                }}
              >
                {/* Efeito de brilho interno */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-16 bg-white/30"
                  animate={{ x: ['0%', '400%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  style={{ filter: 'blur(4px)' }}
                />
              </motion.div>
              
              {/* Efeito de partículas */}
              {isGenerating && !isComplete && (
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-1 w-1 bg-gold-primary rounded-full"
                      initial={{ y: 0, x: `${i * 20}%`, opacity: 0 }}
                      animate={{ 
                        y: [0, -10, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Passos dinâmicos */}
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ backgroundColor: steps[currentStep]?.color + '20' }}
                >
                  {(() => {
                    const IconComponent = steps[currentStep]?.icon;
                    return IconComponent ? (
                      <IconComponent 
                        className="w-6 h-6"
                        style={{ color: steps[currentStep]?.color }}
                      />
                    ) : null;
                  })()}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {steps[currentStep]?.text}
                </h3>
                <p className="text-sm text-gray-400">
                  Passo {currentStep + 1} de {steps.length}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Criação Concluída!
                </h3>
                <p className="text-gray-400 mb-6">
                  Sua Master Scene está pronta para download
                </p>
                <button className="gold-gradient text-black font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-all">
                  Baixar em Alta Resolução
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Estatísticas */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="glass-effect-light rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {steps.length}
              </div>
              <div className="text-xs text-gray-400">Passos</div>
            </div>
            <div className="glass-effect-light rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {Math.round(calculatedProgress * 2)}
              </div>
              <div className="text-xs text-gray-400">Créditos</div>
            </div>
            <div className="glass-effect-light rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {isComplete ? '4K' : 'HD'}
              </div>
              <div className="text-xs text-gray-400">Resolução</div>
            </div>
          </div>

          {/* Nota de créditos */}
          <div className="mt-8 p-4 bg-gold-primary/5 border border-gold-primary/20 rounded-xl">
            <p className="text-sm text-gold-light text-center">
              ⚡ Esta geração consumiu {Math.round(calculatedProgress * 2)} créditos do seu plano VIP
            </p>
          </div>
        </div>
      </div>

      {/* Efeito de brilho externo */}
      {isGenerating && !isComplete && (
        <motion.div
          className="absolute -inset-4 rounded-3xl blur-2xl -z-10"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: 'radial-gradient(circle at center, #D4AF37 0%, transparent 70%)',
          }}
        />
      )}
    </div>
  );
}