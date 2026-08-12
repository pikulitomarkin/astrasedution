import type { SVGProps } from 'react';
import { Gem, Link2, Watch } from 'lucide-react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  className?: string;
};

/** Marca Astra — diamante com brilho (identidade sedução / premium) */
export function AstraMarkIcon({ size = 24, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
      {...rest}
    >
      <path
        d="M12 2.5 19.5 9.2 12 21.5 4.5 9.2 12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 9.2h15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M12 2.5 9.2 9.2 12 21.5M12 2.5l2.8 6.7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M12 1v1.2M20.2 8.2l.9-.5M3.8 8.2l-.9-.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

/** Colar — silhueta leve alinhada à estética lifestyle */
export function NecklaceIcon({ size = 24, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...rest}
    >
      <path d="M7 4c1.5 5 3.5 8 5 10.5C13.5 12 15.5 9 17 4" />
      <circle cx="12" cy="17.5" r="2.2" />
      <path d="M12 15.3v-1" opacity={0.7} />
    </svg>
  );
}

export type JewelryCategory = 'ring' | 'necklace' | 'bracelet' | 'watch';

export function JewelryCategoryIcon({
  category,
  size = 24,
  className,
}: {
  category: JewelryCategory;
  size?: number;
  className?: string;
}) {
  switch (category) {
    case 'ring':
      return <Gem size={size} className={className} aria-hidden />;
    case 'necklace':
      return <NecklaceIcon size={size} className={className} />;
    case 'bracelet':
      return <Link2 size={size} className={className} aria-hidden />;
    case 'watch':
      return <Watch size={size} className={className} aria-hidden />;
    default:
      return <Gem size={size} className={className} aria-hidden />;
  }
}
