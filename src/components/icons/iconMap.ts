import type { LucideIcon } from 'lucide-react';
import {
  AlertCircle,
  Anchor,
  ArrowRight,
  Brain,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clapperboard,
  Coins,
  Copyright,
  Cpu,
  Crown,
  DollarSign,
  Euro,
  Eye,
  Gem,
  Gift,
  Globe,
  Hand,
  Heart,
  IdCard,
  Image as ImageIcon,
  Info,
  Link2,
  Loader2,
  LayoutDashboard,
  Lock,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Palette,
  RefreshCw,
  Settings2,
  Cog,
  Sparkles,
  Star,
  Sun,
  Upload,
  User,
  UserPlus,
  Vault,
  Wand2,
  Watch,
  X,
  Zap,
} from 'lucide-react';

/**
 * Mapa canônico: nomes usados no app → ícones Lucide.
 * Inclui aliases legados do sprite PNG para não quebrar call sites.
 */
export const ICON_MAP = {
  // UI / ações
  alert: AlertCircle,
  alertCircle: AlertCircle,
  arrowRight: ArrowRight,
  check: Check,
  checkCircle: CheckCircle2,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  circle: Circle,
  info: Info,
  loader: Loader2,
  loader2: Loader2,
  login: LogIn,
  logIn: LogIn,
  logout: LogOut,
  layoutDashboard: LayoutDashboard,
  logOut: LogOut,
  menu: Menu,
  refreshCw: RefreshCw,
  refresh: RefreshCw,
  upload: Upload,
  x: X,
  zap: Zap,

  // Conta / comunicação
  mail: Mail,
  lock: Lock,
  user: User,
  userPlus: UserPlus,
  gift: Gift,

  // Produto / marca
  sparkles: Sparkles,
  star: Star,
  brain: Brain,
  globe: Globe,
  passport: IdCard,
  vault: Vault,
  wand: Wand2,
  wand2: Wand2,
  shield: Vault,
  crown: Crown,
  heart: Heart,
  building2: Building2,
  clapperboard: Clapperboard,
  image: ImageIcon,
  camera: Camera,
  sun: Sun,
  spotlight: Sun,
  eye: Eye,
  anchor: Anchor,
  cpu: Cpu,
  palette: Palette,
  sliders: Settings2,
  slidersHorizontal: Settings2,
  gears: Cog,
  settings: Cog,
  hand: Hand,
  watch: Watch,
  gem: Gem,
  link2: Link2,
  copyright: Copyright,

  // Moeda
  currency: Coins,
  dollarSign: DollarSign,
  euro: Euro,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICON_MAP;

export function resolveIcon(name: string): LucideIcon {
  if (name in ICON_MAP) {
    return ICON_MAP[name as IconName];
  }
  return Star;
}

export function isIconName(name: string): name is IconName {
  return name in ICON_MAP;
}
