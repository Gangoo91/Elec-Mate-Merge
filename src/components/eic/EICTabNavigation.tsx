import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
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
  onGenerateCertificate,
  canGenerateCertificate = true,
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

  const handleGenerate = () => {
    haptic.success();
    onGenerateCertificate?.();
  };

  const isLastTab = currentTabIndex === totalTabs - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-md border-t border-white/[0.06] px-4 py-3 safe-area-bottom">
      <div className="flex gap-2 max-w-xl mx-auto">
        {canNavigatePrevious && (
          <button
            onClick={handlePrevious}
            className="h-12 w-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.95] transition-all shrink-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {isLastTab && showGenerate ? (
          <button
            onClick={handleGenerate}
            disabled={!canGenerateCertificate}
            className="h-12 flex-1 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all bg-elec-yellow text-black disabled:opacity-50"
          >
            <CheckCircle className="h-4 w-4" />
            Generate Certificate
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canNavigateNext}
            className={cn(
              'h-12 flex-1 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all',
              canNavigateNext
                ? 'bg-elec-yellow text-black'
                : 'bg-white/[0.06] border border-white/[0.08] text-white'
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
