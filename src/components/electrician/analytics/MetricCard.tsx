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
}

const colorClasses = {
  emerald: {
    icon: 'text-emerald-400 bg-emerald-500/10',
    trend: 'text-emerald-400',
  },
  amber: {
    icon: 'text-amber-400 bg-amber-500/10',
    trend: 'text-amber-400',
  },
  blue: {
    icon: 'text-blue-400 bg-blue-500/10',
    trend: 'text-blue-400',
  },
  green: {
    icon: 'text-green-400 bg-green-500/10',
    trend: 'text-green-400',
  },
  red: {
    icon: 'text-red-400 bg-red-500/10',
    trend: 'text-red-400',
  },
  purple: {
    icon: 'text-purple-400 bg-purple-500/10',
    trend: 'text-purple-400',
  },
};

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  trend,
  color,
  onClick,
}) => {
  const colors = colorClasses[color];

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all',
        onClick && 'cursor-pointer hover:shadow-lg active:scale-[0.98]'
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', colors.icon)}>
          {icon}
        </div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-xl font-bold mt-1">{value}</p>
        {trend && (
          <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', trend.isPositive ? 'text-emerald-400' : 'text-red-400')}>
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{trend.value} vs last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
