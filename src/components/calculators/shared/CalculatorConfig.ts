/**
 * Category chrome for the calculator suite.
 *
 * This was a nine-colour rainbow — amber, emerald, orange, green, purple,
 * blue, cyan, slate and blue again — in a product whose design system has a
 * single accent. The business category rendered its headline figure as a
 * blue-to-indigo gradient and its header tile in blue-400, neither of which
 * exists in the palette.
 *
 * Every category now carries the same volt (#FFC800 = hsl(47 100% 50%), the
 * `--elec-yellow` token). Colour was never carrying meaning here — the
 * components had already stopped consuming most of this chrome, which is why
 * several of them still read `void category`. The icon and label DO carry
 * meaning, so those stay distinct.
 */
import {
  Zap,
  Cable,
  Shield,
  Sun,
  TestTube2,
  Car,
  Lightbulb,
  Wrench,
  Briefcase,
  LucideIcon,
} from 'lucide-react';

export type CalculatorCategory =
  | 'power'
  | 'cable'
  | 'protection'
  | 'renewable'
  | 'testing'
  | 'ev-storage'
  | 'lighting'
  | 'utilities'
  | 'business';

export interface CalculatorCategoryConfig {
  icon: LucideIcon;
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  color: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  label: string;
}

export const CALCULATOR_CONFIG: Record<CalculatorCategory, CalculatorCategoryConfig> = {
  power: {
    icon: Zap,
    gradient: 'from-elec-yellow to-yellow-500',
    gradientFrom: '#FFC800',
    gradientTo: '#C29800',
    color: 'elec-yellow',
    colorClass: 'text-elec-yellow',
    borderClass: 'border-elec-yellow/25',
    bgClass: 'bg-elec-yellow',
    label: 'Power & Basic',
  },
  cable: {
    icon: Cable,
    gradient: 'from-elec-yellow to-yellow-500',
    gradientFrom: '#FFC800',
    gradientTo: '#C29800',
    color: 'elec-yellow',
    colorClass: 'text-elec-yellow',
    borderClass: 'border-elec-yellow/25',
    bgClass: 'bg-elec-yellow',
    label: 'Cable & Wiring',
  },
  protection: {
    icon: Shield,
    gradient: 'from-elec-yellow to-yellow-500',
    gradientFrom: '#FFC800',
    gradientTo: '#C29800',
    color: 'elec-yellow',
    colorClass: 'text-elec-yellow',
    borderClass: 'border-elec-yellow/25',
    bgClass: 'bg-elec-yellow',
    label: 'Protection & Safety',
  },
  renewable: {
    icon: Sun,
    gradient: 'from-elec-yellow to-yellow-500',
    gradientFrom: '#FFC800',
    gradientTo: '#C29800',
    color: 'elec-yellow',
    colorClass: 'text-elec-yellow',
    borderClass: 'border-elec-yellow/25',
    bgClass: 'bg-elec-yellow',
    label: 'Renewable Energy',
  },
  testing: {
    icon: TestTube2,
    gradient: 'from-elec-yellow to-yellow-500',
    gradientFrom: '#FFC800',
    gradientTo: '#C29800',
    color: 'elec-yellow',
    colorClass: 'text-elec-yellow',
    borderClass: 'border-elec-yellow/25',
    bgClass: 'bg-elec-yellow',
    label: 'Testing & Standards',
  },
  'ev-storage': {
    icon: Car,
    gradient: 'from-elec-yellow to-yellow-500',
    gradientFrom: '#FFC800',
    gradientTo: '#C29800',
    color: 'elec-yellow',
    colorClass: 'text-elec-yellow',
    borderClass: 'border-elec-yellow/25',
    bgClass: 'bg-elec-yellow',
    label: 'EV & Storage',
  },
  lighting: {
    icon: Lightbulb,
    gradient: 'from-elec-yellow to-yellow-500',
    gradientFrom: '#FFC800',
    gradientTo: '#C29800',
    color: 'elec-yellow',
    colorClass: 'text-elec-yellow',
    borderClass: 'border-elec-yellow/25',
    bgClass: 'bg-elec-yellow',
    label: 'Lighting',
  },
  utilities: {
    icon: Wrench,
    gradient: 'from-elec-yellow to-yellow-500',
    gradientFrom: '#FFC800',
    gradientTo: '#C29800',
    color: 'elec-yellow',
    colorClass: 'text-elec-yellow',
    borderClass: 'border-elec-yellow/25',
    bgClass: 'bg-elec-yellow',
    label: 'Utilities',
  },
  business: {
    icon: Briefcase,
    gradient: 'from-elec-yellow to-yellow-500',
    gradientFrom: '#FFC800',
    gradientTo: '#C29800',
    color: 'elec-yellow',
    colorClass: 'text-elec-yellow',
    borderClass: 'border-elec-yellow/25',
    bgClass: 'bg-elec-yellow',
    label: 'Business',
  },
};

// Helper function to get config by category
export const getCalculatorConfig = (category: CalculatorCategory): CalculatorCategoryConfig => {
  return CALCULATOR_CONFIG[category];
};
