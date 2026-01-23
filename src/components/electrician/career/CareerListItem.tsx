/**
 * CareerListItem - iOS-style list row for career sections
 *
 * Full-width tappable row with:
 * - Left: Coloured icon in rounded square
 * - Middle: Title + subtitle
 * - Right: Chevron + optional badge
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CareerListItemProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: 'yellow' | 'blue' | 'green' | 'purple' | 'orange' | 'red';
  badge?: string;
  comingSoon?: boolean;
  onClick: () => void;
}

const colorStyles = {
  yellow: {
    bg: 'bg-elec-yellow/15',
    icon: 'text-elec-yellow',
    badge: 'bg-elec-yellow/20 text-elec-yellow',
  },
  blue: {
    bg: 'bg-blue-500/15',
    icon: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-400',
  },
  green: {
    bg: 'bg-green-500/15',
    icon: 'text-green-400',
    badge: 'bg-green-500/20 text-green-400',
  },
  purple: {
    bg: 'bg-purple-500/15',
    icon: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-400',
  },
  orange: {
    bg: 'bg-orange-500/15',
    icon: 'text-orange-400',
    badge: 'bg-orange-500/20 text-orange-400',
  },
  red: {
    bg: 'bg-red-500/15',
    icon: 'text-red-400',
    badge: 'bg-red-500/20 text-red-400',
  },
};

export const CareerListItem: React.FC<CareerListItemProps> = ({
  title,
  subtitle,
  icon: Icon,
  color,
  badge,
  comingSoon,
  onClick,
}) => {
  const styles = colorStyles[color];

  return (
    <button
      onClick={!comingSoon ? onClick : undefined}
      disabled={comingSoon}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3.5 min-h-[64px]",
        "text-left touch-manipulation transition-colors",
        "active:bg-white/5",
        comingSoon && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Icon */}
      <div className={cn(
        "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
        styles.bg
      )}>
        <Icon className={cn("h-5 w-5", styles.icon)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[15px] text-white truncate">
            {title}
          </span>
          {comingSoon && (
            <span className="text-[10px] font-medium text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
              Soon
            </span>
          )}
        </div>
        <span className="text-[13px] text-white/50 line-clamp-1">
          {subtitle}
        </span>
      </div>

      {/* Badge + Chevron */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {badge && (
          <span className={cn(
            "text-xs font-semibold px-2 py-0.5 rounded-full",
            styles.badge
          )}>
            {badge}
          </span>
        )}
        <ChevronRight className="h-5 w-5 text-white/30" />
      </div>
    </button>
  );
};

export default CareerListItem;
