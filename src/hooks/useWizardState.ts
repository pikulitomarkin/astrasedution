"use client";

import { useState, useCallback } from 'react';

export interface WizardState {
  activeStep: number;
  sliderValues: Record<string, number>;
  completedSteps: number[];
  totalSteps: number;
}

export interface UseWizardStateReturn {
  state: WizardState;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateSliderValue: (id: string, value: number) => void;
  completeStep: (step: number) => void;
  getProgress: () => number;
  isStepCompleted: (step: number) => boolean;
  canProceed: () => boolean;
  resetWizard: () => void;
}

/**
 * Hook customizado para gerenciar o estado do wizard de criação
 * Mantém o progresso, valores dos sliders e passos completados
 */
export function useWizardState(totalSteps: number = 4): UseWizardStateReturn {
  const [state, setState] = useState<WizardState>({
    activeStep: 0,
    sliderValues: {},
    completedSteps: [],
    totalSteps,
  });

  // Navegar para o próximo passo
  const nextStep = useCallback(() => {
    setState(prev => {
      const nextStep = Math.min(prev.activeStep + 1, prev.totalSteps - 1);
      // Marca o passo atual como completado ao avançar
      const newCompleted = prev.completedSteps.includes(prev.activeStep)
        ? prev.completedSteps
        : [...prev.completedSteps, prev.activeStep];
      
      return {
        ...prev,
        activeStep: nextStep,
        completedSteps: newCompleted,
      };
    });
  }, []);

  // Navegar para o passo anterior
  const prevStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeStep: Math.max(prev.activeStep - 1, 0),
    }));
  }, []);

  // Ir para um passo específico
  const goToStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      activeStep: Math.max(0, Math.min(step, prev.totalSteps - 1)),
    }));
  }, []);

  // Atualizar valor de um slider
  const updateSliderValue = useCallback((id: string, value: number) => {
    setState(prev => ({
      ...prev,
      sliderValues: {
        ...prev.sliderValues,
        [id]: value,
      },
    }));
  }, []);

  // Marcar um passo como completado
  const completeStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      completedSteps: prev.completedSteps.includes(step)
        ? prev.completedSteps
        : [...prev.completedSteps, step],
    }));
  }, []);

  // Calcular progresso em percentual
  const getProgress = useCallback(() => {
    return (state.completedSteps.length / state.totalSteps) * 100;
  }, [state.completedSteps.length, state.totalSteps]);

  // Verificar se um passo está completado
  const isStepCompleted = useCallback((step: number) => {
    return state.completedSteps.includes(step);
  }, [state.completedSteps]);

  // Verificar se pode avançar (opcional: adicionar validação customizada)
  const canProceed = useCallback(() => {
    // Por enquanto, sempre permite avançar
    // Pode adicionar lógica de validação aqui
    return state.activeStep < state.totalSteps - 1;
  }, [state.activeStep, state.totalSteps]);

  // Resetar wizard ao estado inicial
  const resetWizard = useCallback(() => {
    setState({
      activeStep: 0,
      sliderValues: {},
      completedSteps: [],
      totalSteps,
    });
  }, [totalSteps]);

  return {
    state,
    nextStep,
    prevStep,
    goToStep,
    updateSliderValue,
    completeStep,
    getProgress,
    isStepCompleted,
    canProceed,
    resetWizard,
  };
}
