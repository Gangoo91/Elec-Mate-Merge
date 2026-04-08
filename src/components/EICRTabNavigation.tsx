/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2, Download, PoundSterling } from 'lucide-react';

interface EICRTabNavigationProps {
  currentTab: string;
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
  lastTabLabel?: string;
}

const EICRTabNavigation = ({
  currentTabIndex,
  totalTabs,
  canNavigateNext,
  canNavigatePrevious,
  navigateNext,
  navigatePrevious,
  getProgressPercentage,
  isCurrentTabComplete,
}: EICRTabNavigationProps) => {
  const progress = getProgressPercentage();
  const isLastTab = currentTabIndex === totalTabs - 1;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-white/[0.08] p-4">
      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-white">
            {currentTabIndex + 1}/{totalTabs}
          </span>
          <span className="text-[10px] font-medium text-white">{progress}%</span>
        </div>
        <div className="h-1 bg-white/[0.12] rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {isLastTab ? (
        <div>
          <Button
            variant="outline"
            onClick={() => { navigatePrevious(); scrollToTop(); }}
            disabled={!canNavigatePrevious}
            className="w-full h-11 text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg border-white/[0.12] text-white"
          >
            Previous Section
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => { navigatePrevious(); scrollToTop(); }}
            disabled={!canNavigatePrevious}
            className="flex-1 h-11 text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg border-white/[0.12] text-white"
          >
            Previous
          </Button>
          <Button
            onClick={() => { navigateNext(); scrollToTop(); }}
            disabled={!canNavigateNext}
            className="flex-1 h-11 text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default EICRTabNavigation;
