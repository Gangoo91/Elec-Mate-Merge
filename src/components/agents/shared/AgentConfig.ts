import { Calculator, Settings, Shield, Wrench, LucideIcon } from "lucide-react";

export type AgentType = 'cost-engineer' | 'maintenance' | 'health-safety' | 'installation';

export interface AgentConfigItem {
  icon: LucideIcon;
  gradient: string;
  gradientFrom: string;
  gradientTo: string;
  color: string;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  inputLabel: string;
  submitLabel: string;
  resultsTitle: string;
  processingTitle: string;
  successTitle: string;
  estimatedTime: number; // in seconds
  confettiColors: string[];
}

export const AGENT_CONFIG: Record<AgentType, AgentConfigItem> = {
  'cost-engineer': {
    icon: Calculator,
    gradient: 'from-amber-400 to-yellow-500',
    gradientFrom: '#fbbf24',
    gradientTo: '#eab308',
    color: 'elec-yellow',
    colorClass: 'text-elec-yellow',
    borderClass: 'border-elec-yellow/20',
    bgClass: 'bg-elec-yellow',
    inputLabel: 'Describe Your Project',
    submitLabel: 'Generate Quote',
    resultsTitle: 'Cost Analysis',
    processingTitle: 'Generating Cost Analysis',
    successTitle: 'Your Cost Analysis is Ready!',
    estimatedTime: 180,
    confettiColors: ['#fbbf24', '#eab308', '#f59e0b'],
  },
  'maintenance': {
    icon: Settings,
    gradient: 'from-emerald-400 to-teal-500',
    gradientFrom: '#34d399',
    gradientTo: '#14b8a6',
    color: 'emerald-400',
    colorClass: 'text-emerald-400',
    borderClass: 'border-emerald-400/20',
    bgClass: 'bg-emerald-400',
    inputLabel: 'Equipment & Requirements',
    submitLabel: 'Generate Method',
    resultsTitle: 'Maintenance Method',
    processingTitle: 'Generating Maintenance Method',
    successTitle: 'Your Maintenance Method is Ready!',
    estimatedTime: 240,
    confettiColors: ['#34d399', '#14b8a6', '#10b981'],
  },
  'health-safety': {
    icon: Shield,
    gradient: 'from-orange-400 to-red-500',
    gradientFrom: '#fb923c',
    gradientTo: '#ef4444',
    color: 'orange-400',
    colorClass: 'text-orange-400',
    borderClass: 'border-orange-400/20',
    bgClass: 'bg-orange-400',
    inputLabel: 'Safety Requirements',
    submitLabel: 'Generate Assessment',
    resultsTitle: 'Safety Assessment',
    processingTitle: 'Generating Safety Assessment',
    successTitle: 'Your Safety Assessment is Ready!',
    estimatedTime: 180,
    confettiColors: ['#fb923c', '#ef4444', '#f97316'],
  },
  'installation': {
    icon: Wrench,
    gradient: 'from-blue-400 to-blue-600',
    gradientFrom: '#60a5fa',
    gradientTo: '#2563eb',
    color: 'blue-400',
    colorClass: 'text-blue-400',
    borderClass: 'border-blue-400/20',
    bgClass: 'bg-blue-400',
    inputLabel: 'Installation Description',
    submitLabel: 'Generate Method',
    resultsTitle: 'Installation Method',
    processingTitle: 'Generating Installation Method',
    successTitle: 'Your Installation Method is Ready!',
    estimatedTime: 240,
    confettiColors: ['#60a5fa', '#2563eb', '#3b82f6'],
  },
};

// Stage configuration for all agents
export interface ProcessingStage {
  id: number;
  label: string;
  icon: string;
  duration: number; // percentage of total time
}

export const PROCESSING_STAGES: ProcessingStage[] = [
  { id: 1, label: 'Searching Knowledge Base', icon: 'Search', duration: 20 },
  { id: 2, label: 'Analyzing Requirements', icon: 'Zap', duration: 30 },
  { id: 3, label: 'Generating Output', icon: 'FileText', duration: 35 },
  { id: 4, label: 'Validating Results', icon: 'ShieldCheck', duration: 15 },
];

// Project type options
export type ProjectType = 'domestic' | 'commercial' | 'industrial';

export const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: 'domestic', label: 'Domestic' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
];
