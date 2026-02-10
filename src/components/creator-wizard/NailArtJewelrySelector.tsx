'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, Upload, Palette, Sparkles, X } from 'lucide-react';
import SliderComponent from './SliderComponent';

interface NailType {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

interface JewelryType {
  id: string;
  name: string;
  description: string;
  category: 'ring' | 'necklace' | 'bracelet' | 'watch';
}

const nailTypes: NailType[] = [
  { id: 'stiletto', name: 'Stiletto', description: 'Unhas longas e pontiagudas', color: '#FF6B8B', icon: '💅' },
  { id: 'almond', name: 'Amêndoa', description: 'Forma arredondada e elegante', color: '#A78BFA', icon: '👌' },
  { id: 'square', name: 'Quadrado', description: 'Bordas retas e modernas', color: '#38BDF8', icon: '⬜' },
  { id: 'coffin', name: 'Caixão', description: 'Longas com ponta achatada', color: '#34D399', icon: '⚰️' },
  { id: 'oval', name: 'Oval', description: 'Forma suave e natural', color: '#FBBF24', icon: '🥚' },
  { id: 'ballerina', name: 'Bailarina', description: 'Comprimento médio e ponta reta', color: '#F87171', icon: '🩰' },
];

const jewelryTypes: JewelryType[] = [
  { id: 'diamond-ring', name: 'Anel de Diamante', description: 'Brilho intenso com pedras preciosas', category: 'ring' },
  { id: 'gold-necklace', name: 'Colar de Ouro', description: 'Design elegante e minimalista', category: 'necklace' },
  { id: 'silver-bracelet', name: 'Bracelete de Prata', description: 'Detalhes gravados e texturizados', category: 'bracelet' },
  { id: 'smart-watch', name: 'Relógio Inteligente', description: 'Tela OLED e luzes LED', category: 'watch' },
  { id: 'pearl-earrings', name: 'Brincos de Pérola', description: 'Pérolas naturais com acabamento dourado', category: 'ring' },
  { id: 'tech-bangle', name: 'Pulseira Tecnológica', description: 'Hologramas e displays táteis', category: 'bracelet' },
];

export default function NailArtJewelrySelector() {
  const [selectedNailId, setSelectedNailId] = useState<string | null>(null);
  const [selectedJewelryId, setSelectedJewelryId] = useState<string | null>(null);
  const [customTexture, setCustomTexture] = useState<File | null>(null);
  const [sliderValues, setSliderValues] = useState({
    length: 5,
    shine: 7,
    frenchOpacity: 6,
    colorHex: '#FF6B8B',
  });

  const selectedNail = nailTypes.find(n => n.id === selectedNailId);
  const selectedJewelry = jewelryTypes.find(j => j.id === selectedJewelryId);

  const handleSliderChange = (id: string, value: number) => {
    setSliderValues(prev => ({ ...prev, [id]: value }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValues(prev => ({ ...prev, colorHex: e.target.value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomTexture(file);
    }
  };

  const handleNailClick = (nailId: string) => {
    setSelectedNailId(prev => prev === nailId ? null : nailId);
    if (selectedJewelryId) setSelectedJewelryId(null);
  };

  const handleJewelryClick = (jewelryId: string) => {
    setSelectedJewelryId(prev => prev === jewelryId ? null : jewelryId);
    if (selectedNailId) setSelectedNailId(null);
  };

  return (
    <div className="space-y-8">
      {/* Seção de Unhas */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-8 w-1 bg-gradient-to-b from-gold-primary to-gold-secondary rounded-full"></div>
          <h3 className="text-xl font-bold text-white">Nail Art</h3>
          <span className="text-xs gold-gradient px-2 py-1 rounded-full">Unhas</span>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {nailTypes.map((nail) => (
            <motion.button
              key={nail.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNailClick(nail.id)}
              className={`relative aspect-square rounded-xl border-2 p-3 flex flex-col items-center justify-center transition-all ${
                selectedNailId === nail.id
                  ? 'border-gold-primary bg-gold-primary/10 shadow-lg shadow-gold-primary/20'
                  : 'border-gold-light/30 bg-black/50 hover:border-gold-light/60'
              }`}
            >
              <span className="text-2xl mb-1">{nail.icon}</span>
              <span className="text-xs font-medium text-white truncate w-full text-center">
                {nail.name}
              </span>
              <div 
                className="absolute bottom-2 w-6 h-1 rounded-full"
                style={{ backgroundColor: nail.color }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Seção de Joias */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-8 w-1 bg-gradient-to-b from-gold-primary to-gold-secondary rounded-full"></div>
          <h3 className="text-xl font-bold text-white">Jewelry & Accessories</h3>
          <span className="text-xs gold-gradient px-2 py-1 rounded-full">Joias</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {jewelryTypes.map((jewelry) => (
            <motion.button
              key={jewelry.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleJewelryClick(jewelry.id)}
              className={`relative rounded-lg border-2 p-4 text-left transition-all ${
                selectedJewelryId === jewelry.id
                  ? 'border-gold-primary bg-gold-primary/10 shadow-lg shadow-gold-primary/20'
                  : 'border-gold-light/30 bg-black/50 hover:border-gold-light/60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-white">{jewelry.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{jewelry.description}</p>
                </div>
                <span className="text-2xl">
                  {jewelry.category === 'ring' && '💍'}
                  {jewelry.category === 'necklace' && '📿'}
                  {jewelry.category === 'bracelet' && '🔗'}
                  {jewelry.category === 'watch' && '⌚'}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Sub-menu dinâmico */}
      <AnimatePresence mode="wait">
        {(selectedNail || selectedJewelry) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="glass-effect rounded-2xl p-6 border border-gold-light/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Sliders className="h-6 w-6 text-gold-primary" />
                <h3 className="text-xl font-bold text-white">
                  {selectedNail ? `Customizar ${selectedNail.name}` : `Personalizar ${selectedJewelry?.name}`}
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedNailId(null);
                  setSelectedJewelryId(null);
                }}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sliders */}
              <div className="space-y-6">
                {selectedNail && (
                  <>
                    <SliderComponent
                      config={{
                        id: 'length',
                        label: 'Comprimento',
                        min: 1,
                        max: 10,
                        step: 1,
                        defaultValue: 5,
                        unit: '',
                        description: 'Comprimento das unhas (1=curto, 10=longo)'
                      }}
                      value={sliderValues.length}
                      onChange={handleSliderChange}
                    />
                    <SliderComponent
                      config={{
                        id: 'shine',
                        label: 'Brilho',
                        min: 1,
                        max: 10,
                        step: 1,
                        defaultValue: 7,
                        unit: '',
                        description: 'Intensidade do brilho do esmalte'
                      }}
                      value={sliderValues.shine}
                      onChange={handleSliderChange}
                    />
                    <SliderComponent
                      config={{
                        id: 'frenchOpacity',
                        label: 'Opacidade da Francesinha',
                        min: 1,
                        max: 10,
                        step: 1,
                        defaultValue: 6,
                        unit: '',
                        description: 'Transparência da ponta francesa'
                      }}
                      value={sliderValues.frenchOpacity}
                      onChange={handleSliderChange}
                    />
                  </>
                )}

                {selectedJewelry && (
                  <>
                    <SliderComponent
                      config={{
                        id: 'shine',
                        label: 'Brilho do Metal',
                        min: 1,
                        max: 10,
                        step: 1,
                        defaultValue: 8,
                        unit: '',
                        description: 'Brilho da superfície metálica'
                      }}
                      value={sliderValues.shine}
                      onChange={handleSliderChange}
                    />
                    <SliderComponent
                      config={{
                        id: 'complexity',
                        label: 'Complexidade do Design',
                        min: 1,
                        max: 10,
                        step: 1,
                        defaultValue: 5,
                        unit: '',
                        description: 'Detalhamento e complexidade do design'
                      }}
                      value={sliderValues.length}
                      onChange={handleSliderChange}
                    />
                  </>
                )}

                {/* Seletor de Cor */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-gold-light" />
                      Cor Personalizada
                    </div>
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={sliderValues.colorHex}
                      onChange={handleColorChange}
                      className="w-16 h-16 cursor-pointer rounded-lg border border-gold-light/30 bg-transparent"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={sliderValues.colorHex}
                        onChange={handleColorChange}
                        className="w-full px-4 py-2 bg-black/50 border border-gold-light/30 rounded-lg text-white font-mono"
                        placeholder="#FFFFFF"
                      />
                      <p className="text-xs text-gray-400 mt-2">
                        Clique no quadrado ou digite o código hex
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload de Textura Customizada */}
              <div className="space-y-6">
                <div className="glass-effect-light rounded-xl p-6 border border-gold-light/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Upload className="h-6 w-6 text-gold-primary" />
                    <h4 className="text-lg font-semibold text-white">Upload de Textura Customizada</h4>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-300 mb-3">
                      {selectedNail
                        ? 'Faça upload de uma arte de unha personalizada (PNG, JPG, SVG)'
                        : 'Faça upload de um logo ou textura para o acessório'}
                    </p>
                    
                    <label className="block">
                      <div className="border-2 border-dashed border-gold-light/30 rounded-xl p-8 text-center cursor-pointer hover:border-gold-primary/50 transition-colors">
                        <Upload className="h-12 w-12 text-gold-light/50 mx-auto mb-3" />
                        <p className="text-white font-medium mb-1">
                          Clique para selecionar um arquivo
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, SVG até 5MB
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.svg"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {customTexture && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-gold-primary/5 border border-gold-primary/20 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">{customTexture.name}</p>
                          <p className="text-xs text-gray-400">
                            {(customTexture.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => setCustomTexture(null)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <div className="mt-6">
                    <button className="w-full gold-gradient text-black font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Aplicar Textura ao Modelo
                    </button>
                  </div>
                </div>

                {/* Preview */}
                <div className="glass-effect-light rounded-xl p-6 border border-gold-light/20">
                  <h4 className="text-lg font-semibold text-white mb-4">Preview</h4>
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-black to-gray-900 border border-gold-light/20 flex items-center justify-center">
                    {selectedNail ? (
                      <div className="text-center">
                        <span className="text-6xl">{selectedNail.icon}</span>
                        <p className="text-white mt-2">{selectedNail.name}</p>
                        <p className="text-xs text-gray-400">Cor: <span style={{ color: sliderValues.colorHex }}>{sliderValues.colorHex}</span></p>
                      </div>
                    ) : selectedJewelry ? (
                      <div className="text-center">
                        <span className="text-6xl">
                          {selectedJewelry.category === 'ring' && '💍'}
                          {selectedJewelry.category === 'necklace' && '📿'}
                          {selectedJewelry.category === 'bracelet' && '🔗'}
                          {selectedJewelry.category === 'watch' && '⌚'}
                        </span>
                        <p className="text-white mt-2">{selectedJewelry.name}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}