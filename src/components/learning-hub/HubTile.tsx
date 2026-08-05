import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * The hub's navigation tile — ELE I&T hub redesign.
 *
 * Deliberately prop-compatible with `BusinessCard` from the business-hub set,
 * which is what these screens used to import. Keeping the same surface means
 * the ~105 call sites across the hub change their import and nothing else;
 * rewriting each one by hand would be a hundred chances to introduce a typo
 * for no gain.
 *
 * What changes is the styling, so the hub matches the certificates it teaches:
 *  - the certificate card surface, not a flat `bg-white/[0.06]` tile
 *  - no yellow hairline accent across the top (decoration, not information)
 *  - all text full white. BusinessCard used `text-muted-foreground` for its
 *    subtitle, which renders grey and is not allowed in this app
 *  - no fixed heights, so a two-line title cannot clip
 *
 * `icon` is accepted and ignored — BusinessCard ignored it too, so nothing is
 * lost, and the type stays compatible with existing call sites.
 */

interface HubTileProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
  gradient?: string;
  comingSoon?: boolean;
  className?: string;
  variant?: 'hero' | 'standard' | 'compact';
  badge?: string;
  badgeVariant?: 'danger' | 'info';
  liveSubtitle?: string;
  accentColor?: string;
  iconColor?: string;
  iconBg?: string;
}

export const HubTile: React.FC<HubTileProps> = ({
  title,
  description,
  href,
  onClick,
  comingSoon = false,
  className,
  variant = 'standard',
  liveSubtitle,
}) => {
  const subtitle = liveSubtitle || description;
  const isOverdue = liveSubtitle?.includes('overdue');

  const body = (
    <div
      className={cn(
        'group flex h-full min-h-[5.5rem] touch-manipulation flex-col justify-between',
        'rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04]',
        'transition-transform active:scale-[0.98]',
        variant === 'hero' ? 'p-4 sm:p-5' : 'p-4',
        comingSoon && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <div className="min-w-0">
        <h3 className="text-[15px] font-semibold leading-tight tracking-tight text-white">
          {title}
        </h3>
        {subtitle && (
          <p
            className={cn(
              'mt-1 text-[12px] leading-snug',
              // Red is the one exception: an overdue item is a state, not decoration.
              isOverdue ? 'font-semibold text-red-400' : 'text-white'
            )}
          >
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[12px] font-medium text-white">
          {comingSoon ? 'Coming soon' : 'Open'}
        </span>
        <ChevronRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  );

  if (comingSoon) return body;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="block w-full touch-manipulation rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50"
      >
        {body}
      </button>
    );
  }

  return (
    <Link
      to={href || '#'}
      className="block w-full touch-manipulation rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50"
    >
      {body}
    </Link>
  );
};

export default HubTile;
