export interface SliderConfig {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit?: string;
  description?: string;
}

export interface StepConfig {
  id: number;
  title: string;
  description: string;
  icon: string;
  sliders: SliderConfig[];
}

export interface AccordionCategory {
  id: string;
  title: string;
  description: string;
  sliders: SliderConfig[];
}

export interface WizardState {
  activeStep: number;
  sliderValues: Record<string, number>;
  completedSteps: number[];
}