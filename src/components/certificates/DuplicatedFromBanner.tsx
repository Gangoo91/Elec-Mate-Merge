import React from 'react';
import { Copy, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Banner shown at the top of a cert form when it was duplicated from another
 * cert (block-of-apartments workflow — ELE-881). Designed to be:
 *   • Visually distinct (yellow accent + Copy icon) so it's noticed
 *   • Compact (single row on desktop, wraps cleanly on mobile)
 *   • Dismissable — once the user has changed client/address they don't need
 *     to keep seeing it
 *   • Shows the SOURCE certificate number (human-readable, e.g. EICR-2026-2680)
 *     not the Supabase row id
 */
interface DuplicatedFromBannerProps {
  /** Source certificate number, e.g. "EICR-2026-2680" */
  sourceCertNumber: string;
  /** Called when the user dismisses the banner — should clear `duplicatedFrom` on formData */
  onDismiss?: () => void;
  className?: string;
}

const DuplicatedFromBanner: React.FC<DuplicatedFromBannerProps> = ({
  sourceCertNumber,
  onDismiss,
  className,
}) => {
  return (
    <div
      className={cn(
        'mx-3 sm:mx-4 mt-3 sm:mt-4 rounded-xl border border-elec-yellow/30 overflow-hidden',
        'bg-gradient-to-r from-elec-yellow/[0.08] via-elec-yellow/[0.04] to-transparent',
        className
      )}
      role="status"
    >
      <div className="flex items-start sm:items-center gap-3 px-4 py-3">
        {/* Icon disc */}
        <div className="shrink-0 w-9 h-9 rounded-lg bg-elec-yellow/15 border border-elec-yellow/30 flex items-center justify-center">
          <Copy className="h-4 w-4 text-elec-yellow" />
        </div>

        {/* Copy */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-elec-yellow">
              Template copy
            </span>
            <span className="text-[11px] text-white/50 font-mono">from {sourceCertNumber}</span>
          </div>
          <p className="text-xs sm:text-sm text-white/80 leading-snug mt-0.5">
            Update the <strong className="text-white">client name</strong>,{' '}
            <strong className="text-white">address</strong> and{' '}
            <strong className="text-white">inspection date</strong> for this property — everything
            else has been carried over.
          </p>
        </div>

        {/* Dismiss */}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss duplicate banner"
            className="shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.06] touch-manipulation transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DuplicatedFromBanner;
