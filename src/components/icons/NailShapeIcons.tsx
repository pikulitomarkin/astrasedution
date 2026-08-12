import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

function baseProps({ size = 24, className, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true as const,
    ...rest,
  };
}

/** Unha stiletto — ponta alongada (marca de glamour / lifestyle) */
export function NailStilettoIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 3c1.2 1.4 2.2 4.2 2.4 8.2.2 3.2.6 6.2 1.6 8.8H8c1-2.6 1.4-5.6 1.6-8.8C9.8 7.2 10.8 4.4 12 3Z" />
      <path d="M9.2 14.5h5.6" opacity={0.55} />
    </svg>
  );
}

/** Unha amêndoa */
export function NailAlmondIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 4c2 1.6 3.2 4.8 3.2 9.2 0 3.2-.4 5.6-1.2 6.8H10c-.8-1.2-1.2-3.6-1.2-6.8C8.8 8.8 10 5.6 12 4Z" />
      <path d="M9.5 14h5" opacity={0.55} />
    </svg>
  );
}

/** Unha quadrada */
export function NailSquareIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M9 5.5h6v13.5H9z" />
      <path d="M9.5 14h5" opacity={0.55} />
    </svg>
  );
}

/** Unha caixão / coffin */
export function NailCoffinIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M10 4.5h4l1.8 4.5v10H8.2v-10L10 4.5Z" />
      <path d="M9.5 14h5" opacity={0.55} />
    </svg>
  );
}

/** Unha oval */
export function NailOvalIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 4.2c2.4 0 4 4.2 4 8.3S14.4 20 12 20s-4-3.4-4-7.5 1.6-8.3 4-8.3Z" />
      <path d="M9.5 14h5" opacity={0.55} />
    </svg>
  );
}

/** Unha bailarina */
export function NailBallerinaIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M9.5 5h5l1.5 3.5v11.5h-8V8.5L9.5 5Z" />
      <path d="M9.5 14h5" opacity={0.55} />
    </svg>
  );
}

const nailIconMap = {
  stiletto: NailStilettoIcon,
  almond: NailAlmondIcon,
  square: NailSquareIcon,
  coffin: NailCoffinIcon,
  oval: NailOvalIcon,
  ballerina: NailBallerinaIcon,
} as const;

export type NailShapeId = keyof typeof nailIconMap;

export function NailShapeIcon({
  shape,
  ...props
}: IconProps & { shape: NailShapeId | string }) {
  const Icon = nailIconMap[shape as NailShapeId] ?? NailOvalIcon;
  return <Icon {...props} />;
}
