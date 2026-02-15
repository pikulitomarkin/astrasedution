import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Wizard - Astra Seduction",
  description: "Crie modelos IA com realismo extremo. Ajuste tom de pele, tamanho de seios, formato de rosto, estilo de cabelo e muito mais. Resolução até 8K.",
  openGraph: {
    title: "Creator Wizard - Crie Sua Modelo IA",
    description: "Wizard completo para criação de modelos fotorrealísticos com IA. Controle total sobre cada detalhe.",
    url: "https://astraseduction.com/create",
  },
  twitter: {
    title: "Creator Wizard - Crie Sua Modelo IA",
    description: "Wizard completo para criação de modelos fotorrealísticos com IA. Controle total sobre cada detalhe.",
  },
  robots: {
    index: false,
    follow: true,
    noarchive: true,
  },
};

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
