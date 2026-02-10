'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Download } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components';
import { Stepper, SliderComponent, AccordionSection, PreviewPanel } from '@/components/creator-wizard';
import { SliderConfig, AccordionCategory } from '@/types/creator-wizard';

// Configuração dos passos
const stepConfigs = [
  {
    id: 0,
    title: 'Base',
    description: 'Configure a etnia e idade do modelo',
    sliders: [
      { id: 'etnia', label: 'Etnia', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Variedade étnica do modelo (1-10)' },
      { id: 'idade', label: 'Idade', min: 18, max: 60, step: 1, defaultValue: 28, unit: ' anos', description: 'Idade aparente do modelo' },
      { id: 'altura', label: 'Altura', min: 150, max: 190, step: 1, defaultValue: 170, unit: ' cm', description: 'Altura em centímetros' },
      { id: 'peso', label: 'Peso', min: 40, max: 90, step: 1, defaultValue: 65, unit: ' kg', description: 'Peso em quilogramas' },
    ] as SliderConfig[],
  },
  {
    id: 1,
    title: 'Detalhes',
    description: 'Ajuste pele, cabelo e características faciais',
    sliders: [
      { id: 'tomPele', label: 'Tom de Pele', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Claridade da pele (1=claro, 10=escuro)' },
      { id: 'texturaPele', label: 'Textura da Pele', min: 1, max: 10, step: 1, defaultValue: 7, unit: '', description: 'Suavidade da textura da pele' },
      { id: 'corCabelo', label: 'Cor do Cabelo', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Variação de cor do cabelo' },
      { id: 'tipoCabelo', label: 'Tipo de Cabelo', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Estilo e volume do cabelo' },
      { id: 'olhos', label: 'Cor dos Olhos', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Variação de cor dos olhos' },
    ] as SliderConfig[],
  },
  {
    id: 2,
    title: 'Extremidades',
    description: 'Detalhes de unhas, pés e mãos',
    sliders: [
      { id: 'unhasComprimento', label: 'Comprimento das Unhas', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Comprimento das unhas das mãos' },
      { id: 'unhasCor', label: 'Cor das Unhas', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Variação de cor das unhas' },
      { id: 'pesForma', label: 'Forma dos Pés', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Forma e proporção dos pés' },
      { id: 'maosDelicadeza', label: 'Delicadeza das Mãos', min: 1, max: 10, step: 1, defaultValue: 7, unit: '', description: 'Suavidade e delicadeza das mãos' },
    ] as SliderConfig[],
  },
];

// Configuração dos acessórios (passo 4)
const accessoryCategories: AccordionCategory[] = [
  {
    id: 'relogios',
    title: 'Relógios',
    description: 'Relógios inteligentes e de luxo',
    sliders: [
      { id: 'relogioEstilo', label: 'Estilo do Relógio', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Estilo do relógio (1=clássico, 10=futurista)' },
      { id: 'relogioTamanho', label: 'Tamanho do Mostrador', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Tamanho do mostrador do relógio' },
      { id: 'relogioMaterial', label: 'Material', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Material do relógio (1=metal, 10=cerâmica)' },
    ],
  },
  {
    id: 'joias',
    title: 'Joias',
    description: 'Colares, brincos e anéis',
    sliders: [
      { id: 'joiaComplexidade', label: 'Complexidade', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Complexidade do design das joias' },
      { id: 'joiaBrilho', label: 'Brilho', min: 1, max: 10, step: 1, defaultValue: 7, unit: '', description: 'Intensidade do brilho das joias' },
      { id: 'joiaQuantidade', label: 'Quantidade', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Quantidade de joias no conjunto' },
    ],
  },
  {
    id: 'eletronicos',
    title: 'Eletrônicos',
    description: 'Dispositivos tecnológicos futuristas',
    sliders: [
      { id: 'eletronicoLuzes', label: 'Luzes LED', min: 1, max: 10, step: 1, defaultValue: 5, unit: '', description: 'Intensidade das luzes LED' },
      { id: 'eletronicoHolograma', label: 'Efeito Holograma', min: 1, max: 10, step: 1, defaultValue: 3, unit: '', description: 'Presença de efeitos holográficos' },
      { id: 'eletronicoComplexidade', label: 'Complexidade Tecnológica', min: 1, max: 10, step: 1, defaultValue: 6, unit: '', description: 'Complexidade dos dispositivos eletrônicos' },
    ],
  },
];

function getInitialSliderValues(): Record<string, number> {
  const initialValues: Record<string, number> = {};
  
  stepConfigs.forEach(step => {
    step.sliders.forEach(slider => {
      if (!(slider.id in initialValues)) {
        initialValues[slider.id] = slider.defaultValue;
      }
    });
  });
  
  accessoryCategories.forEach(category => {
    category.sliders.forEach(slider => {
      if (!(slider.id in initialValues)) {
        initialValues[slider.id] = slider.defaultValue;
      }
    });
  });

  return initialValues;
}

export default function CreatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(getInitialSliderValues());

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);



  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Verificando acesso VIP...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Redirecionamento ocorrerá no useEffect
  }



  const handleSliderChange = (id: string, value: number) => {
    setSliderValues(prev => ({ ...prev, [id]: value }));
  };

  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  const handleNextStep = () => {
    if (activeStep < 3) {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      if (!completedSteps.includes(nextStep)) {
        setCompletedSteps([...completedSteps, nextStep]);
      }
    }
  };

  const handlePrevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleGenerate = () => {
    alert('Gerando modelo com as configurações selecionadas...');
    // Aqui integraria com a API de geração
  };

  const currentStepConfig = stepConfigs[activeStep];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-zinc-400">
          <span>AstraFutureSeduction</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">Creator Wizard</span>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Stepper Lateral (20%) */}
          <div className="lg:w-1/5">
            <Stepper
              activeStep={activeStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
            />
          </div>

          {/* Conteúdo do Passo (40%) */}
          <div className="lg:w-2/5">
            <div className="glass-effect rounded-2xl p-8">
              <div className="mb-8">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-gradient-to-r from-gold-primary/20 to-gold-secondary/20 px-3 py-1 text-xs font-medium text-gold-primary">
                    Passo {activeStep + 1} de 4
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-white">
                  {activeStep === 3 ? 'Acessórios Avançados' : currentStepConfig?.title}
                </h1>
                <p className="text-zinc-400">
                  {activeStep === 3 
                    ? 'Personalize relógios, joias e dispositivos eletrônicos' 
                    : currentStepConfig?.description}
                </p>
              </div>

              {/* Conteúdo baseado no passo ativo */}
              {activeStep < 3 ? (
                <div className="space-y-6">
                  {currentStepConfig?.sliders.map((slider) => (
                    <SliderComponent
                      key={slider.id}
                      config={slider}
                      value={sliderValues[slider.id] || slider.defaultValue}
                      onChange={handleSliderChange}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {accessoryCategories.map((category) => (
                    <AccordionSection
                      key={category.id}
                      category={category}
                      sliderValues={sliderValues}
                      onSliderChange={handleSliderChange}
                    />
                  ))}
                </div>
              )}

              {/* Navegação */}
              <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
                <button
                  onClick={handlePrevStep}
                  disabled={activeStep === 0}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all ${
                    activeStep === 0
                      ? 'cursor-not-allowed text-zinc-600'
                      : 'text-white hover:bg-white/5'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                  Anterior
                </button>

                <div className="flex items-center gap-4">
                  {activeStep < 3 ? (
                    <button
                      onClick={handleNextStep}
                      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-primary to-gold-secondary px-8 py-3 font-semibold text-black transition-all hover:shadow-lg hover:shadow-gold-primary/30"
                    >
                      Próximo
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handleGenerate}
                      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-primary to-gold-secondary px-8 py-3 font-semibold text-black transition-all hover:shadow-lg hover:shadow-gold-primary/30"
                    >
                      <Sparkles className="h-5 w-5" />
                      Gerar Modelo
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Créditos e Informações */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="glass-effect-light rounded-xl p-4">
                <div className="text-sm text-zinc-400">Créditos usados</div>
                <div className="text-2xl font-bold text-white">
                  {Object.keys(sliderValues).length * 2}
                </div>
              </div>
              <div className="glass-effect-light rounded-xl p-4">
                <div className="text-sm text-zinc-400">Configurações</div>
                <div className="text-2xl font-bold text-white">
                  {Object.keys(sliderValues).length}
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel (40%) */}
          <div className="lg:w-2/5">
            <PreviewPanel sliderValues={sliderValues} />
          </div>
        </div>

        {/* Botão de Download e Exportação */}
        <div className="mt-8 flex justify-end">
          <button className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-all hover:border-gold-primary/50 hover:bg-white/5">
            <Download className="h-5 w-5" />
            Exportar Configurações
          </button>
        </div>
      </main>
    </div>
  );
}