import {
  Zap,
  Cable,
  Shield,
  Sun,
  TestTube2,
  Car,
  Lightbulb,
  Wrench,
  LucideIcon
} from "lucide-react";

export type CalculatorCategory =
  | 'power'
  | 'cable'
  | 'protection'
  | 'renewable'
  | 'testing'
  | 'ev-storage'
  | 'lighting'
  | 'utilities';

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
  'power': {
    icon: Zap,
    gradient: 'from-amber-400 to-yellow-500',
    gradientFrom: '#fbbf24',
    gradientTo: '#eab308',
    color: 'amber-400',
    colorClass: 'text-amber-400',
    borderClass: 'border-amber-400/20',
    bgClass: 'bg-amber-400',
    label: 'Power & Basic',
  },
  'cable': {
    icon: Cable,
    gradient: 'from-emerald-400 to-teal-500',
    gradientFrom: '#34d399',
    gradientTo: '#14b8a6',
    color: 'emerald-400',
    colorClass: 'text-emerald-400',
    borderClass: 'border-emerald-400/20',
    bgClass: 'bg-emerald-400',
    label: 'Cable & Wiring',
  },
  'protection': {
    icon: Shield,
    gradient: 'from-orange-400 to-red-500',
    gradientFrom: '#fb923c',
    gradientTo: '#ef4444',
    color: 'orange-400',
    colorClass: 'text-orange-400',
    borderClass: 'border-orange-400/20',
    bgClass: 'bg-orange-400',
    label: 'Protection & Safety',
  },
  'renewable': {
    icon: Sun,
    gradient: 'from-green-400 to-emerald-500',
    gradientFrom: '#22c55e',
    gradientTo: '#10b981',
    color: 'green-400',
    colorClass: 'text-green-400',
    borderClass: 'border-green-400/20',
    bgClass: 'bg-green-400',
    label: 'Renewable Energy',
  },
  'testing': {
    icon: TestTube2,
    gradient: 'from-purple-400 to-indigo-500',
    gradientFrom: '#a78bfa',
    gradientTo: '#6366f1',
    color: 'purple-400',
    colorClass: 'text-purple-400',
    borderClass: 'border-purple-400/20',
    bgClass: 'bg-purple-400',
    label: 'Testing & Standards',
  },
  'ev-storage': {
    icon: Car,
    gradient: 'from-blue-400 to-blue-600',
    gradientFrom: '#60a5fa',
    gradientTo: '#2563eb',
    color: 'blue-400',
    colorClass: 'text-blue-400',
    borderClass: 'border-blue-400/20',
    bgClass: 'bg-blue-400',
    label: 'EV & Storage',
  },
  'lighting': {
    icon: Lightbulb,
    gradient: 'from-cyan-400 to-sky-500',
    gradientFrom: '#22d3ee',
    gradientTo: '#0ea5e9',
    color: 'cyan-400',
    colorClass: 'text-cyan-400',
    borderClass: 'border-cyan-400/20',
    bgClass: 'bg-cyan-400',
    label: 'Lighting',
  },
  'utilities': {
    icon: Wrench,
    gradient: 'from-slate-400 to-slate-500',
    gradientFrom: '#94a3b8',
    gradientTo: '#64748b',
    color: 'slate-400',
    colorClass: 'text-slate-400',
    borderClass: 'border-slate-400/20',
    bgClass: 'bg-slate-400',
    label: 'Utilities',
  },
};

// Helper function to get config by category
export const getCalculatorConfig = (category: CalculatorCategory): CalculatorCategoryConfig => {
  return CALCULATOR_CONFIG[category];
};
