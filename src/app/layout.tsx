import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Providers from "@/components/Providers";
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
  title: "AstraFutureSeduction - IA de Luxo Cyber-Luxury",
  description: "A Perfeição Digital Sem Limites. Plataforma de IA de Luxo com Creator Wizard VIP, design Cyber-Luxury Dark e tecnologia de ponta.",
  keywords: ["IA de luxo", "Cyber-Luxury", "Creator Wizard", "modelagem 3D", "design premium", "autenticação VIP", "Next.js", "React", "Tailwind CSS"],
  authors: [{ name: "AstraFutureSeduction Team" }],
  creator: "AstraFutureSeduction",
  publisher: "AstraFutureSeduction",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://astrafutureseduction.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://astrafutureseduction.vercel.app",
    title: "AstraFutureSeduction - IA de Luxo Cyber-Luxury",
    description: "A Perfeição Digital Sem Limites. Plataforma de IA de Luxo com Creator Wizard VIP.",
    siteName: "AstraFutureSeduction",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "AstraFutureSeduction - IA de Luxo Cyber-Luxury",
      },
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AstraFutureSeduction Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AstraFutureSeduction - IA de Luxo Cyber-Luxury",
    description: "A Perfeição Digital Sem Limites. Plataforma de IA de Luxo com Creator Wizard VIP.",
    images: ["/twitter-image.png"],
    creator: "@astrafutureseduction",
    site: "@astrafutureseduction",
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#D4AF37",
      },
    ],
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}