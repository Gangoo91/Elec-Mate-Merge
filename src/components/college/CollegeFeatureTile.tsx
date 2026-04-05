import { LucideIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CollegeFeatureTileProps {
  title: string;
  icon: LucideIcon;
  description?: string;
  onClick?: () => void;
  className?: string;
  badge?: string;
  badgeVariant?: 'default' | 'warning' | 'info' | 'success';
  compact?: boolean;
  disabled?: boolean;
}

const badgeColors = {
  default: 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30',
  warning: 'bg-warning/20 text-warning border-warning/30',
  info: 'bg-info/20 text-info border-info/30',
  success: 'bg-success/20 text-success border-success/30',
};

const accentGradients = {
  default: 'from-elec-yellow via-amber-400 to-orange-400',
  warning: 'from-orange-500 via-amber-400 to-yellow-400',
  info: 'from-blue-500 via-blue-400 to-cyan-400',
  success: 'from-emerald-500 via-teal-400 to-cyan-400',
};

export function CollegeFeatureTile({
  title,
  icon: _Icon,
  description,
  onClick,
  className,
  badge,
  badgeVariant = 'default',
  compact = false,
  disabled = false,
}: CollegeFeatureTileProps) {
  if (compact) {
    return (
      <div
        className={cn(
          'group relative overflow-hidden touch-manipulation',
          'card-surface-interactive',
          'active:scale-[0.98] transition-all duration-200',
          'min-h-[110px]',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={disabled ? undefined : onClick}
      >
        {/* Top accent line */}
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r',
            accentGradients[badgeVariant],
            'opacity-30 group-hover:opacity-80 transition-opacity duration-200'
          )}
        />

        <div className="relative z-10 flex flex-col h-full p-3.5 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[13px] sm:text-sm font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
              {title}
            </h3>
            {badge && (
              <Badge
                className={cn(badgeColors[badgeVariant], 'text-[10px] shrink-0 border')}
              >
                {badge}
              </Badge>
            )}
          </div>
          {description && (
            <p className="mt-0.5 text-[11px] sm:text-[12px] text-white leading-tight line-clamp-1">
              {description}
            </p>
          )}

          <div className="flex-grow" />

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-medium text-elec-yellow">Open</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
              <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden touch-manipulation',
        'card-surface-interactive',
        'active:scale-[0.98] transition-all duration-200',
        'min-h-[130px]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      {/* Top accent line */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r',
          accentGradients[badgeVariant],
          'opacity-30 group-hover:opacity-80 transition-opacity duration-200'
        )}
      />

      <div className="relative z-10 flex flex-col h-full p-3.5 sm:p-4">
        <h3 className="text-[13px] sm:text-sm font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
          {title}
        </h3>
        {description && (
          <p className="mt-0.5 text-[11px] sm:text-[12px] text-white leading-tight line-clamp-2">
            {description}
          </p>
        )}
        {badge && (
          <div className="mt-1.5">
            <Badge className={cn(badgeColors[badgeVariant], 'text-[10px] border')}>
              {badge}
            </Badge>
          </div>
        )}

        <div className="flex-grow" />

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-medium text-elec-yellow">Open</span>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
            <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
}
