/**
 * StatCard
 *
 * Premium stat card with animated counter, trend indicator,
 * gradient icon background, and hover lift effect.
 * Mobile-first responsive design.
 */

import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from './AnimatedCounter';

export type StatVariant = 'yellow' | 'green' | 'orange' | 'purple' | 'blue' | 'red';

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  variant?: StatVariant;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trend?: number; // Percentage change, e.g., 12 for +12%
  progress?: number; // 0-100 for progress bar
  subtitle?: string;
  onClick?: () => void;
  formatAsCurrency?: boolean;
  className?: string;
}

const variantStyles: Record<StatVariant, {
  iconBg: string;
  iconColor: string;
  accentColor: string;
  progressBg: string;
}> = {
  yellow: {
    iconBg: 'bg-elec-yellow/10',
    iconColor: 'text-elec-yellow',
    accentColor: 'text-elec-yellow',
    progressBg: 'bg-elec-yellow',
  },
  green: {
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-500',
    accentColor: 'text-green-500',
    progressBg: 'bg-green-500',
  },
  orange: {
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
    accentColor: 'text-orange-500',
    progressBg: 'bg-orange-500',
  },
  purple: {
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
    accentColor: 'text-purple-500',
    progressBg: 'bg-purple-500',
  },
  blue: {
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    accentColor: 'text-blue-500',
    progressBg: 'bg-blue-500',
  },
  red: {
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-500',
    accentColor: 'text-red-500',
    progressBg: 'bg-red-500',
  },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  variant = 'yellow',
  prefix = '',
  suffix = '',
  decimals = 0,
  trend,
  progress,
  subtitle,
  onClick,
  formatAsCurrency = false,
  className,
}: StatCardProps) {
  const styles = variantStyles[variant];
  const isClickable = !!onClick;

  // Determine trend direction
  const trendDirection = trend === undefined ? null : trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral';

  return (
    <motion.div
      whileHover={isClickable ? { y: -2, scale: 1.02 } : undefined}
      whileTap={isClickable ? { scale: 0.96 } : undefined}
      onClick={onClick}
      className={cn(
        // Base styling
        'relative overflow-hidden h-full',
        // Responsive border radius
        'rounded-xl',
        // Glass morphism
        'glass-premium',
        // Padding
        'p-3 sm:p-4',
        // Fixed height for consistency
        'h-[80px] sm:h-[100px]',
        // Cursor for clickable
        isClickable && 'cursor-pointer',
        // Touch optimization
        'touch-manipulation active:scale-[0.97] transition-transform duration-150',
        className
      )}
    >
      {/* Content - centered vertically */}
      <div className="flex flex-col justify-center h-full">
        {/* Top row: Icon + Value */}
        <div className="flex items-center gap-2">
          {/* Icon - small accent */}
          <div className={cn(
            'flex-shrink-0 p-1.5 rounded-lg',
            styles.iconBg
          )}>
            <Icon className={cn('h-4 w-4', styles.iconColor)} />
          </div>

          {/* Value - prominent */}
          <AnimatedCounter
            value={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            formatAsCurrency={formatAsCurrency}
            className={cn(
              'text-xl sm:text-2xl font-bold tracking-tight',
              styles.accentColor
            )}
          />
        </div>

        {/* Label */}
        <p className="text-[11px] sm:text-xs text-white/70 mt-1.5 truncate">{label}</p>

        {/* Subtitle - shown on all sizes if present */}
        {subtitle && (
          <p className="text-[10px] text-white/50 mt-0.5 truncate">{subtitle}</p>
        )}

        {/* Trend indicator */}
        {trendDirection && (
          <div className={cn(
            'inline-flex items-center gap-0.5 mt-1 text-[10px] font-medium',
            trendDirection === 'up' && 'text-green-400',
            trendDirection === 'down' && 'text-red-400',
            trendDirection === 'neutral' && 'text-white/60'
          )}>
            {trendDirection === 'up' && <TrendingUp className="h-3 w-3" />}
            {trendDirection === 'down' && <TrendingDown className="h-3 w-3" />}
            {trendDirection === 'neutral' && <Minus className="h-3 w-3" />}
            {trend !== undefined && (
              <span>{trend > 0 ? '+' : ''}{trend}%</span>
            )}
          </div>
        )}
      </div>

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mt-2 sm:mt-3">
          <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              className={cn('h-full rounded-full', styles.progressBg)}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

/**
 * Compact stat for inline use
 */
export function CompactStat({
  label,
  value,
  icon: Icon,
  variant = 'yellow',
  className,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: StatVariant;
  className?: string;
}) {
  const styles = variantStyles[variant];

  return (
    <div className={cn(
      'flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/[0.03]',
      'touch-manipulation',
      className
    )}>
      <Icon className={cn('h-3.5 w-3.5 sm:h-4 sm:w-4', styles.iconColor)} />
      <span className="text-xs sm:text-sm text-white/90">{label}:</span>
      <span className={cn('text-xs sm:text-sm font-semibold', styles.accentColor)}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </span>
    </div>
  );
}

export default StatCard;
