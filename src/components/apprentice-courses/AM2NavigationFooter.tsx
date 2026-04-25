import React, { memo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AM2NavigationFooterProps {
  prevHref?: string;
  prevLabel?: string;
  previousHref?: string;
  previousLabel?: string;
  nextHref?: string;
  nextLabel?: string;
  currentSection: number;
  totalSections: number;
  className?: string;
}

export const AM2NavigationFooter = memo(function AM2NavigationFooter({
  prevHref,
  prevLabel,
  previousHref,
  previousLabel,
  nextHref,
  nextLabel = 'Next',
  currentSection,
  totalSections,
  className,
}: AM2NavigationFooterProps) {
  const resolvedPrevHref = prevHref || previousHref;
  const resolvedPrevLabel = prevLabel || previousLabel || 'Previous';

  return (
    <nav className={cn('pt-6 mt-6 border-t border-white/[0.06]', className)}>
      {/* Progress dots — minimal hairline */}
      <div className="flex items-center justify-center gap-1.5 mb-5">
        {Array.from({ length: totalSections }, (_, index) => (
          <span
            key={index}
            className={cn(
              'h-1 rounded-full transition-all',
              index + 1 === currentSection
                ? 'w-6 bg-elec-yellow'
                : index + 1 < currentSection
                  ? 'w-1 bg-elec-yellow/50'
                  : 'w-1 bg-white/15'
            )}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {resolvedPrevHref ? (
          <Link
            to={resolvedPrevHref}
            className="flex items-center gap-3 rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] px-5 py-4 text-left touch-manipulation active:scale-[0.99]"
          >
            <ArrowLeft className="h-4 w-4 text-white shrink-0" />
            <div className="min-w-0">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-white">Previous</div>
              <div className="mt-0.5 text-[14px] font-semibold text-white truncate">
                {resolvedPrevLabel}
              </div>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {nextHref ? (
          <Link
            to={nextHref}
            className="flex items-center justify-end gap-3 rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow px-5 py-4 text-right touch-manipulation active:scale-[0.99]"
          >
            <div className="min-w-0">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next</div>
              <div className="mt-0.5 text-[14px] font-semibold text-black truncate">
                {nextLabel}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-black shrink-0" />
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>

      <p className="text-center text-[11px] text-white mt-4">
        Section {currentSection} of {totalSections}
      </p>
    </nav>
  );
});

export default AM2NavigationFooter;
