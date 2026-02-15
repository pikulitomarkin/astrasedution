import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro - Astra Seduction",
  description: "Crie sua conta grátis e ganhe 3 gerações para testar. Planos a partir de R$ 49/mês com até 10.000 créditos mensais e resolução 8K.",
  openGraph: {
    title: "Cadastro Grátis - Astra Seduction",
    description: "Crie sua conta e ganhe 3 gerações grátis para experimentar IA com realismo extremo.",
    url: "https://astraseduction.com/cadastro",
  },
  twitter: {
    title: "Cadastro Grátis - Astra Seduction",
    description: "Crie sua conta e ganhe 3 gerações grátis para experimentar IA com realismo extremo.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CadastroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
