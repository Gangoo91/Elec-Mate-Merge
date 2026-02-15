import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
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

const iconBgColors = {
  default:
    'bg-gradient-to-br from-elec-yellow/25 to-elec-yellow/8 border border-elec-yellow/25 shadow-lg shadow-elec-yellow/8',
  warning:
    'bg-gradient-to-br from-warning/25 to-warning/8 border border-warning/25 shadow-lg shadow-warning/8',
  info: 'bg-gradient-to-br from-info/25 to-info/8 border border-info/25 shadow-lg shadow-info/8',
  success:
    'bg-gradient-to-br from-success/25 to-success/8 border border-success/25 shadow-lg shadow-success/8',
};

const borderLeftColors = {
  default: 'border-l-elec-yellow',
  warning: 'border-l-orange-500',
  info: 'border-l-blue-500',
  success: 'border-l-emerald-500',
};

const borderTopColors = {
  default: 'border-t-elec-yellow',
  warning: 'border-t-orange-500',
  info: 'border-t-blue-500',
  success: 'border-t-emerald-500',
};

const hoverGlowColors = {
  default: 'hover:shadow-elec-yellow/15',
  warning: 'hover:shadow-orange-500/15',
  info: 'hover:shadow-blue-500/15',
  success: 'hover:shadow-emerald-500/15',
};

const hoverBorderColors = {
  default: 'hover:border-elec-yellow/30',
  warning: 'hover:border-orange-500/30',
  info: 'hover:border-blue-500/30',
  success: 'hover:border-emerald-500/30',
};

export function CollegeFeatureTile({
  title,
  icon: Icon,
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
      <Card
        className={cn(
          'backdrop-blur-xl bg-white/[0.06] border-white/10',
          'border-t-2',
          borderTopColors[badgeVariant],
          hoverBorderColors[badgeVariant],
          'hover:bg-white/[0.1]',
          'cursor-pointer group touch-feedback touch-manipulation',
          'transition-all duration-300 ease-out',
          'hover:shadow-lg',
          hoverGlowColors[badgeVariant],
          'hover:-translate-y-0.5',
          disabled &&
            'opacity-50 cursor-not-allowed hover:bg-white/[0.06] hover:translate-y-0 hover:shadow-none',
          className
        )}
        onClick={disabled ? undefined : onClick}
      >
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={cn(
                'p-1.5 sm:p-2 rounded-xl transition-all duration-300 flex-shrink-0',
                iconBgColors[badgeVariant],
                'group-hover:scale-110'
              )}
            >
              <Icon
                className={cn(
                  'h-4 w-4 sm:h-5 sm:w-5',
                  badgeVariant === 'default' && 'text-elec-yellow',
                  badgeVariant === 'warning' && 'text-warning',
                  badgeVariant === 'info' && 'text-info',
                  badgeVariant === 'success' && 'text-success'
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white text-xs sm:text-sm leading-tight group-hover:text-white transition-colors">
                {title}
              </p>
              {description && (
                <p className="text-[10px] sm:text-xs text-white truncate">{description}</p>
              )}
            </div>
            {badge && (
              <Badge
                className={cn(badgeColors[badgeVariant], 'text-[10px] sm:text-xs shrink-0 border')}
              >
                {badge}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        'backdrop-blur-xl bg-white/[0.06] border-white/10',
        'border-l-2',
        borderLeftColors[badgeVariant],
        hoverBorderColors[badgeVariant],
        'hover:bg-white/[0.1]',
        'cursor-pointer group touch-feedback touch-manipulation',
        'transition-all duration-300 ease-out',
        'hover:shadow-xl',
        hoverGlowColors[badgeVariant],
        'hover:-translate-y-1',
        disabled &&
          'opacity-50 cursor-not-allowed hover:bg-white/[0.06] hover:translate-y-0 hover:shadow-none',
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <div
            className={cn(
              'p-2 sm:p-3 rounded-xl transition-all duration-300',
              iconBgColors[badgeVariant],
              'group-hover:scale-110'
            )}
          >
            <Icon
              className={cn(
                'h-5 w-5 sm:h-6 sm:w-6',
                badgeVariant === 'default' && 'text-elec-yellow',
                badgeVariant === 'warning' && 'text-warning',
                badgeVariant === 'info' && 'text-info',
                badgeVariant === 'success' && 'text-success'
              )}
            />
          </div>
          {badge && (
            <Badge className={cn(badgeColors[badgeVariant], 'text-[10px] sm:text-xs border')}>
              {badge}
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-white mb-1 text-sm sm:text-base group-hover:text-white transition-colors">
          {title}
        </h3>
        {description && <p className="text-xs sm:text-sm text-white line-clamp-2">{description}</p>}
      </CardContent>
    </Card>
  );
}
