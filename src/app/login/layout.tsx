import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Astra Seduction",
  description: "Acesse sua conta Astra Seduction e comece a criar modelos IA com realismo extremo. Plataforma premium com 10.000 créditos mensais e resolução 8K.",
  openGraph: {
    title: "Login - Astra Seduction",
    description: "Acesse sua conta e crie modelos IA fotorrealísticos com tecnologia de ponta.",
    url: "https://astraseduction.com/login",
  },
  twitter: {
    title: "Login - Astra Seduction",
    description: "Acesse sua conta e crie modelos IA fotorrealísticos com tecnologia de ponta.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
