import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Providers from "@/components/Providers";
import { BackgroundWrapper } from "@/components";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Astra Seduction - Crie Modelos IA com Realismo Extremo",
    template: "%s | Astra Seduction",
  },
  description: "Plataforma de IA premium para criação de modelos fotorrealísticos em 4K e 8K. Realismo extremo, 10.000 créditos mensais, biblioteca exclusiva de estilos e suporte VIP dedicado.",
  keywords: [
    "IA realismo extremo",
    "criação de modelos IA",
    "geração de imagens 8K",
    "IA fotorrealística",
    "modelos IA premium",
    "inteligência artificial criativa",
    "Astra Seduction",
    "gerador de modelos",
    "IA 4K 8K",
    "plataforma IA brasileira",
  ],
  authors: [{ name: "Astra Seduction Team" }],
  creator: "Astra Seduction",
  publisher: "Astra Seduction",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://astraseduction.com"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://astraseduction.com",
    title: "Astra Seduction - Crie Modelos IA com Realismo Extremo",
    description: "Plataforma premium de IA para criação de modelos fotorrealísticos em 4K e 8K. 10.000 créditos mensais, resolução 8K e suporte VIP.",
    siteName: "Astra Seduction",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Astra Seduction - Realismo Extremo em IA",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Astra Seduction - Crie Modelos IA com Realismo Extremo",
    description: "Plataforma premium de IA: 10.000 créditos/mês, resolução 8K, biblioteca exclusiva. Comece agora!",
    images: ["/twitter-image.png"],
    creator: "@astraseduction",
    site: "@astraseduction",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfairDisplay.variable} bg-black text-white antialiased`}
      >
        <StructuredData />
        <Providers>
          <BackgroundWrapper>
            {children}
          </BackgroundWrapper>
        </Providers>
      </body>
    </html>
  );
}