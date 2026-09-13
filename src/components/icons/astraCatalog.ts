/**
 * Compat layer: o sistema de ícones agora é Lucide (`iconMap.ts`).
 * Mantemos estes helpers para imports legados.
 */
export {
  ICON_MAP as ASTRA_ICON_ALIASES,
  resolveIcon as resolveAstraIcon,
  type IconName as AstraIconName,
  type IconName as AstraAlias,
} from './iconMap';

/** @deprecated PNGs de máscara removidos — retorna string vazia. */
export function astraIconSrc(_name: string): string {
  return '';
}
