"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BackgroundWrapperProps {
  children: ReactNode;
}

/**
 * BackgroundWrapper - Componente de fundo para a Astra Seduction
 * 
 * Aplica um gradiente radial sutil de preto profundo para azul escuro,
 * criando a atmosfera "deep space" característica da marca.
 * 
 * Características:
 * - Gradiente radial do centro para as bordas
 * - Cores: #020617 (deep-space-start) → #050b18 (deep-space-end)
 * - Efeito sutil de brilho ciano no centro usando brand-glow
 * - Preparado para animações futuras com Framer Motion
 */
export default function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Gradiente de fundo principal */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(
              ellipse at center top,
              rgba(6, 182, 212, 0.08) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at 80% 50%,
              rgba(6, 182, 212, 0.04) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at 20% 80%,
              rgba(34, 211, 238, 0.05) 0%,
              transparent 50%
            ),
            linear-gradient(135deg, #020617 0%, #050b18 100%)
          `,
        }}
      />

      {/* Overlay de textura sutil */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Pontos de brilho animados */}
      <motion.div
        className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl -z-10"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="fixed bottom-1/4 right-1/3 w-80 h-80 rounded-full opacity-10 blur-3xl -z-10"
        style={{
          background: "radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Conteúdo da página */}
      {children}
    </div>
  );
}
