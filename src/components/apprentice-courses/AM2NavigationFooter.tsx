import React, { memo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AM2NavigationFooterProps {
  prevHref?: string;
  prevLabel?: string;
  /** Alias for prevHref — accepted by 18+ section files */
  previousHref?: string;
  /** Alias for prevLabel — accepted by 18+ section files */
  previousLabel?: string;
  nextHref?: string;
  nextLabel?: string;
  currentSection: number;
  totalSections: number;
  className?: string;
}

/**
 * AM2NavigationFooter - Previous/Next navigation component
 * Features full-width buttons on mobile, inline on desktop,
 * progress dots showing current section, and safe area bottom padding.
 */
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
  // Resolve aliased props — section files use previousHref/previousLabel
  const resolvedPrevHref = prevHref || previousHref;
  const resolvedPrevLabel = prevLabel || previousLabel || 'Previous';
  return (
    <nav
      className={cn(
        'pt-8 mt-8 border-t border-white/10 safe-bottom',
        className
      )}
    >
      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {Array.from({ length: totalSections }, (_, index) => (
          <div
            key={index}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-ios-normal ease-ios-ease',
              index + 1 === currentSection
                ? 'bg-elec-yellow w-6'
                : index + 1 < currentSection
                ? 'bg-elec-yellow/50'
                : 'bg-white/20'
            )}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
        {/* Previous Button */}
        {resolvedPrevHref ? (
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              'w-full sm:w-auto min-h-[52px] px-6',
              'text-white/70 hover:text-white hover:bg-white/5',
              'ios-pressable transition-all duration-ios-normal ease-ios-ease',
              'touch-manipulation'
            )}
            asChild
          >
            <Link to={resolvedPrevHref}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {resolvedPrevLabel}
            </Link>
          </Button>
        ) : (
          <div className="hidden sm:block" /> // Spacer for layout
        )}

        {/* Next Button */}
        {nextHref && (
          <Button
            size="lg"
            className={cn(
              'w-full sm:w-auto min-h-[52px] px-6',
              'bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90',
              'font-semibold',
              'ios-pressable transition-all duration-ios-normal ease-ios-ease',
              'touch-manipulation',
              'shadow-[0_4px_20px_-4px_hsl(47_100%_50%/0.4)]'
            )}
            asChild
          >
            <Link to={nextHref}>
              {nextLabel}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>

      {/* Section Counter (Mobile) */}
      <p className="text-center text-ios-footnote text-white/40 mt-4 sm:hidden">
        Section {currentSection} of {totalSections}
      </p>
    </nav>
  );
});

export default AM2NavigationFooter;
