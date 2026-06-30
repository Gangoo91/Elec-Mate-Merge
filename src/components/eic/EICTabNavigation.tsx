import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EICTabValue } from '@/hooks/useEICTabs';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';

interface EICTabNavigationProps {
  currentTab: EICTabValue;
  currentTabIndex: number;
  totalTabs: number;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  navigateNext: () => void;
  navigatePrevious: () => void;
  getProgressPercentage: () => number;
  isCurrentTabComplete: boolean;
  currentTabHasRequiredFields: boolean;
  onToggleComplete: () => void;
  onGenerateCertificate?: () => void;
  canGenerateCertificate?: boolean;
  showGenerate?: boolean;
}

const EICTabNavigation: React.FC<EICTabNavigationProps> = ({
  currentTabIndex,
  totalTabs,
  canNavigateNext,
  canNavigatePrevious,
  navigateNext,
  navigatePrevious,
  getProgressPercentage,
  showGenerate,
}) => {
  const haptic = useHaptic();

  const handlePrevious = () => {
    haptic.light();
    navigatePrevious();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    haptic.light();
    navigateNext();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLastTab = currentTabIndex === totalTabs - 1;
  // On the generate tab the "Generate Certificate" CTA lives in the form content
  // above, so the bottom nav shows Back only (no duplicate generate button).
  const isGenerateTab = isLastTab && showGenerate;
  const progress = Math.round(getProgressPercentage());

  return (
    // Inline footer — flows at the bottom of the tab content (no longer fixed/floating,
    // so it never overlaps the page). safe-area-bottom keeps clearance on mobile.
    <div className="mt-8 pt-5 border-t border-white/[0.08] safe-area-bottom">
      {/* Step indicator + progress */}
      <div className="flex items-center justify-between mb-2 px-0.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
          Step {currentTabIndex + 1} of {totalTabs}
        </span>
        <span className="text-[11px] font-semibold text-elec-yellow tabular-nums">
          {progress}% complete
        </span>
      </div>
      <div className="h-1 w-full rounded-full bg-white/[0.06] overflow-hidden mb-4">
        <div
          className="h-full rounded-full bg-elec-yellow transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Actions — Back only on the generate tab (Generate CTA is in the content above) */}
      <div className="flex gap-3">
        {canNavigatePrevious && (
          <button
            onClick={handlePrevious}
            className={cn(
              'h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center gap-2 text-white font-medium text-sm touch-manipulation active:scale-[0.97] transition-all',
              isGenerateTab ? 'flex-1' : 'px-5 shrink-0'
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        )}

        {!isGenerateTab && (
          <button
            onClick={handleNext}
            disabled={!canNavigateNext}
            className={cn(
              'h-12 flex-1 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all',
              canNavigateNext
                ? 'bg-elec-yellow text-black'
                : 'bg-white/[0.06] border border-white/[0.08] text-white/60'
            )}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EICTabNavigation;
