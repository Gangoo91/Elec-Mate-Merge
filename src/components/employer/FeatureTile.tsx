import { LucideIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface FeatureTileProps {
  title: string;
  icon: LucideIcon;
  description?: string;
  onClick?: () => void;
  className?: string;
  badge?: string;
  badgeVariant?: 'default' | 'warning' | 'info' | 'success' | 'destructive';
  compact?: boolean;
  showArrow?: boolean;
}

const badgeColors = {
  default: 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30',
  warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  success: 'bg-green-500/20 text-green-400 border-green-500/30',
  destructive: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export function FeatureTile({
  title,
  icon: Icon,
  description,
  onClick,
  className,
  badge,
  badgeVariant = 'default',
  compact = false,
  showArrow = false,
}: FeatureTileProps) {
  const base =
    'group cursor-pointer touch-manipulation bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl hover:bg-[hsl(0_0%_15%)] active:scale-[0.98] transition-all';

  if (compact) {
    return (
      <button
        type="button"
        className={cn(base, 'w-full text-left', className)}
        onClick={onClick}
      >
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors flex-shrink-0">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-white text-xs sm:text-sm leading-tight group-hover:text-elec-yellow transition-colors truncate">
                  {title}
                </p>
                {badge && (
                  <Badge
                    className={cn(
                      badgeColors[badgeVariant],
                      'text-[10px] sm:text-xs px-1.5 py-0 h-4 sm:h-5 border shrink-0'
                    )}
                  >
                    {badge}
                  </Badge>
                )}
              </div>
              {description && (
                <p className="text-xs text-white truncate mt-0.5">{description}</p>
              )}
            </div>
            {showArrow && (
              <ChevronRight className="h-4 w-4 text-white group-hover:text-elec-yellow/70 transition-colors shrink-0" />
            )}
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(base, 'w-full text-left', className)}
      onClick={onClick}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="p-2.5 sm:p-3 rounded-xl bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
          </div>
          {badge && (
            <Badge className={cn(badgeColors[badgeVariant], 'text-[10px] sm:text-xs border')}>
              {badge}
            </Badge>
          )}
        </div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white mb-1 text-sm sm:text-base group-hover:text-elec-yellow transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-xs sm:text-sm text-white line-clamp-2">{description}</p>
            )}
          </div>
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-white group-hover:text-elec-yellow/60 transition-colors mt-0.5 shrink-0" />
        </div>
      </div>
    </button>
  );
}
