import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ColorVariant = 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'yellow' | 'emerald' | 'rose';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  sublabel?: string;
  color?: ColorVariant;
  className?: string;
}

const colorConfig: Record<ColorVariant, { bg: string; iconBg: string; text: string }> = {
  blue: {
    bg: 'bg-white/[0.05]',
    iconBg: 'bg-white/[0.05]',
    text: 'text-elec-yellow',
  },
  green: {
    bg: 'bg-white/[0.05]',
    iconBg: 'bg-white/[0.05]',
    text: 'text-elec-yellow',
  },
  orange: {
    bg: 'bg-white/[0.05]',
    iconBg: 'bg-white/[0.05]',
    text: 'text-elec-yellow',
  },
  purple: {
    bg: 'bg-white/[0.05]',
    iconBg: 'bg-white/[0.05]',
    text: 'text-elec-yellow',
  },
  pink: {
    bg: 'bg-white/[0.05]',
    iconBg: 'bg-white/[0.05]',
    text: 'text-elec-yellow',
  },
  yellow: {
    bg: 'bg-white/[0.05]',
    iconBg: 'bg-white/[0.05]',
    text: 'text-elec-yellow',
  },
  emerald: {
    bg: 'bg-white/[0.05]',
    iconBg: 'bg-white/[0.05]',
    text: 'text-elec-yellow',
  },
  rose: {
    bg: 'bg-white/[0.05]',
    iconBg: 'bg-white/[0.05]',
    text: 'text-elec-yellow',
  },
};

const StatCard = ({
  icon: Icon,
  value,
  label,
  sublabel,
  color = 'blue',
  className,
}: StatCardProps) => {
  const colors = colorConfig[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative overflow-hidden rounded-xl p-4 sm:p-5',
        'border border-white/10',
        'touch-manipulation active:scale-[0.98] transition-transform',
        colors.bg,
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center',
            colors.iconBg
          )}
        >
          <Icon className={cn('h-5 w-5', colors.text)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={cn('text-xl sm:text-2xl font-black', colors.text)}>{value}</p>
          <p className="text-xs sm:text-sm text-white font-medium truncate">{label}</p>
          {sublabel && <p className="text-[10px] sm:text-xs text-white mt-0.5">{sublabel}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
