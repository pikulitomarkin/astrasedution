'use client';

import { motion } from 'framer-motion';
import { Image, Sparkles, Zap, Eye } from 'lucide-react';

interface PreviewPanelProps {
  sliderValues: Record<string, number>;
}

export default function PreviewPanel({ sliderValues }: PreviewPanelProps) {
  const stats = [
    { label: 'Qualidade', value: '8K', icon: Eye, color: 'from-blue-500 to-cyan-500' },
    { label: 'Detalhes', value: 'Ultra', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
    { label: 'Render', value: 'Instantâneo', icon: Zap, color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="h-full w-full">
      <div className="glass-effect h-full rounded-2xl p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Preview</h2>
            <p className="text-zinc-400">Visualização em tempo real</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400">
              IA Generativa
            </div>
          </div>
        </div>

        {/* Área de Preview da Imagem */}
        <div className="relative mb-8 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-black/50 to-gray-900/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold-primary/20 to-gold-secondary/20">
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image className="h-10 w-10 text-gold-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                Imagem Gerada
              </h3>
              <p className="max-w-sm text-zinc-400">
                Sua criação aparecerá aqui em tempo real conforme ajusta os controles
              </p>
            </div>
          </div>

          {/* Overlay de grade sutil */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]" />
        </div>

        {/* Estatísticas */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect-light rounded-xl p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm text-zinc-400">{stat.label}</span>
              </div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Resumo das Configurações */}
        <div className="glass-effect-light rounded-2xl p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Configurações Ativas
          </h3>
          <div className="space-y-3">
            {Object.entries(sliderValues).slice(0, 6).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-white">{value}</span>
                  <div className="h-2 w-16 overflow-hidden rounded-full bg-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-gold-primary to-gold-secondary"
                      style={{ width: `${(value / 100) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {Object.keys(sliderValues).length > 6 && (
            <div className="mt-4 text-center text-sm text-zinc-500">
              +{Object.keys(sliderValues).length - 6} configurações adicionais
            </div>
          )}
        </div>

        {/* Créditos Restantes */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-gold-primary/10 to-gold-secondary/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-zinc-400">Créditos disponíveis</div>
              <div className="text-2xl font-bold text-white">847</div>
            </div>
            <button className="rounded-full bg-gradient-to-r from-gold-primary to-gold-secondary px-6 py-2 font-semibold text-black transition-all hover:shadow-lg hover:shadow-gold-primary/30">
              Gerar Agora
            </button>
          </div>
          <div className="mt-3 text-xs text-zinc-500">
            Cada geração consome aproximadamente 5 créditos
          </div>
        </div>
      </div>
    </div>
  );
}