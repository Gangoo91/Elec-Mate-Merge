import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color: 'emerald' | 'amber' | 'blue' | 'green' | 'red' | 'purple';
  onClick?: () => void;
  isUpdating?: boolean;
  compact?: boolean;
}

const colorClasses = {
  emerald: {
    icon: 'text-emerald-400 bg-emerald-500/10',
    trend: 'text-emerald-400',
    pulse: 'bg-emerald-400',
  },
  amber: {
    icon: 'text-amber-400 bg-amber-500/10',
    trend: 'text-amber-400',
    pulse: 'bg-amber-400',
  },
  blue: {
    icon: 'text-blue-400 bg-blue-500/10',
    trend: 'text-blue-400',
    pulse: 'bg-blue-400',
  },
  green: {
    icon: 'text-green-400 bg-green-500/10',
    trend: 'text-green-400',
    pulse: 'bg-green-400',
  },
  red: {
    icon: 'text-red-400 bg-red-500/10',
    trend: 'text-red-400',
    pulse: 'bg-red-400',
  },
  purple: {
    icon: 'text-purple-400 bg-purple-500/10',
    trend: 'text-purple-400',
    pulse: 'bg-purple-400',
  },
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  trend,
  color,
  onClick,
  isUpdating = false,
  compact = false,
}) => {
  const colors = colorClasses[color];

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all touch-manipulation relative',
        onClick && 'cursor-pointer hover:shadow-lg active:scale-[0.98]',
        isUpdating && 'ring-2 ring-emerald-400/50'
      )}
      onClick={onClick}
    >
      <CardContent className={cn('p-3 sm:p-4', compact && 'p-2.5 sm:p-3')}>
        {/* Live update pulse indicator */}
        {isUpdating && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                colors.pulse
              )} />
              <span className={cn(
                'relative inline-flex rounded-full h-2 w-2',
                colors.pulse
              )} />
            </span>
          </div>
        )}

        <div className={cn(
          'w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-2 sm:mb-3',
          colors.icon,
          compact && 'w-7 h-7 sm:w-8 sm:h-8 mb-1.5 sm:mb-2'
        )}>
          <div className={cn(compact ? 'scale-75 sm:scale-90' : 'scale-90 sm:scale-100')}>
            {icon}
          </div>
        </div>

        <p className={cn(
          'text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide',
          compact && 'text-[9px] sm:text-[10px]'
        )}>
          {label}
        </p>

        <p className={cn(
          'text-lg sm:text-xl font-bold mt-0.5 sm:mt-1 truncate',
          compact && 'text-base sm:text-lg'
        )}>
          {value}
        </p>

        {trend && (
          <div className={cn(
            'flex items-center gap-1 mt-1.5 sm:mt-2 text-[10px] sm:text-xs font-medium',
            trend.isPositive ? 'text-emerald-400' : 'text-red-400'
          )}>
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span className="truncate">{trend.value}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
