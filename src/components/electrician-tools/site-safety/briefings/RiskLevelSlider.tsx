import { motion } from 'framer-motion';
import { Shield, ShieldAlert, ShieldOff, TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export type RiskLevel = 'low' | 'medium' | 'high';

interface RiskLevelSliderProps {
  value: RiskLevel;
  onChange: (level: RiskLevel) => void;
  error?: string;
}

const riskLevels: {
  id: RiskLevel;
  label: string;
  description: string;
  color: string;
  icon: 'shield' | 'shield-alert' | 'shield-off';
}[] = [
  {
    id: 'low',
    label: 'Low',
    description: 'Standard precautions apply',
    color: 'emerald',
    icon: 'shield',
  },
  {
    id: 'medium',
    label: 'Medium',
    description: 'Additional safety measures required',
    color: 'amber',
    icon: 'shield-alert',
  },
  {
    id: 'high',
    label: 'High',
    description: 'Strict controls and supervision needed',
    color: 'red',
    icon: 'shield-off',
  },
];

const iconComponents = {
  shield: Shield,
  'shield-alert': ShieldAlert,
  'shield-off': ShieldOff,
};

const colorMap = {
  emerald: {
    bg: 'bg-emerald-500/10',
    bgActive: 'bg-emerald-500/20',
    border: 'border-emerald-500/20',
    borderActive: 'border-emerald-500/50',
    text: 'text-emerald-400',
    ring: 'ring-emerald-500/25',
    iconBg: 'bg-emerald-500/15',
    dot: 'bg-emerald-400',
  },
  amber: {
    bg: 'bg-amber-500/10',
    bgActive: 'bg-amber-500/20',
    border: 'border-amber-500/20',
    borderActive: 'border-amber-500/50',
    text: 'text-amber-400',
    ring: 'ring-amber-500/25',
    iconBg: 'bg-amber-500/15',
    dot: 'bg-amber-400',
  },
  red: {
    bg: 'bg-red-500/10',
    bgActive: 'bg-red-500/20',
    border: 'border-red-500/20',
    borderActive: 'border-red-500/50',
    text: 'text-red-400',
    ring: 'ring-red-500/25',
    iconBg: 'bg-red-500/15',
    dot: 'bg-red-400',
  },
};

export function RiskLevelSlider({ value, onChange, error }: RiskLevelSliderProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <TriangleAlert className="h-4.5 w-4.5 text-elec-yellow" />
        <label className="text-sm font-semibold text-white">Risk Level</label>
      </div>

      {/* Risk Level Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {riskLevels.map((level) => {
          const isActive = level.id === value;
          const colors = colorMap[level.color as keyof typeof colorMap];
          const IconComponent = iconComponents[level.icon];

          return (
            <motion.button
              key={level.id}
              type="button"
              whileTap={{ scale: 0.96 }}
              onClick={() => onChange(level.id)}
              className={cn(
                'relative flex flex-col items-center gap-2.5 p-4 rounded-xl',
                'border transition-all duration-200',
                'touch-manipulation min-h-[100px]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
                isActive
                  ? cn(colors.bgActive, colors.borderActive, 'ring-2', colors.ring, 'shadow-lg')
                  : cn('bg-white/[0.04]', colors.border, 'hover:bg-white/[0.08]')
              )}
            >
              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  layoutId="riskActiveIndicator"
                  className={cn('absolute top-2 right-2 w-2 h-2 rounded-full', colors.dot)}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200',
                  isActive ? cn(colors.iconBg, colors.text) : 'bg-white/[0.06] text-white/30'
                )}
              >
                <IconComponent className="h-5 w-5" />
              </motion.div>

              {/* Label */}
              <span
                className={cn(
                  'text-sm font-semibold transition-colors duration-200',
                  isActive ? colors.text : 'text-white/50'
                )}
              >
                {level.label}
              </span>

              {/* Description */}
              <span
                className={cn(
                  'text-[10px] sm:text-xs leading-tight text-center transition-colors duration-200',
                  isActive ? 'text-white/60' : 'text-white/30'
                )}
              >
                {level.description}
              </span>
            </motion.button>
          );
        })}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
