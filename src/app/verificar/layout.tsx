import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verificar Email',
  description: 'Confirme seu email para acessar o criador Astra Seduction',
  robots: { index: false, follow: true },
};

export default function VerificarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
