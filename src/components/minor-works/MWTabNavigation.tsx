import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Download, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MWTabValue } from '@/hooks/useMinorWorksTabs';

interface MWTabNavigationProps {
  currentTab: MWTabValue;
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

const MWTabNavigation: React.FC<MWTabNavigationProps> = ({
  currentTab,
  currentTabIndex,
  totalTabs,
  canNavigateNext,
  canNavigatePrevious,
  navigateNext,
  navigatePrevious,
  getProgressPercentage,
  isCurrentTabComplete,
  currentTabHasRequiredFields,
  onToggleComplete,
  onGenerateCertificate,
  canGenerateCertificate = false,
  showGenerate = false
}) => {
  return (
    <div className="rounded-xl border border-white/10 bg-card/50 backdrop-blur-sm py-4 px-4">
      <div className="flex items-center justify-between gap-4 max-w-5xl mx-auto">
        {/* Previous Button */}
        <Button
          variant="outline"
          onClick={navigatePrevious}
          disabled={!canNavigatePrevious}
          className={cn(
            "h-11 gap-2 touch-manipulation border-white/20",
            !canNavigatePrevious && "opacity-50"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Center: Progress Indicator */}
        <div className="flex-1 flex flex-col items-center gap-2 max-w-xs">
          <div className="flex items-center gap-2">
            {Array.from({ length: totalTabs }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  index === currentTabIndex && "w-6 bg-elec-yellow",
                  index < currentTabIndex && "bg-green-500",
                  index > currentTabIndex && "bg-white/20"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-white/50">
            Step {currentTabIndex + 1} of {totalTabs}
          </span>
        </div>

        {/* Next/Generate Button */}
        {showGenerate && currentTabIndex === totalTabs - 1 ? (
          <Button
            onClick={onGenerateCertificate}
            disabled={!canGenerateCertificate}
            className={cn(
              "h-11 gap-2 touch-manipulation",
              canGenerateCertificate
                ? "bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                : "bg-white/10 text-white/50"
            )}
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Generate PDF</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        ) : (
          <Button
            onClick={navigateNext}
            disabled={!canNavigateNext}
            className={cn(
              "h-11 gap-2 touch-manipulation",
              canNavigateNext
                ? "bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                : "bg-white/10 text-white/50"
            )}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Quick completion toggle */}
      {currentTabHasRequiredFields && (
        <div className="flex justify-center mt-3">
          <button
            onClick={onToggleComplete}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all touch-manipulation",
              isCurrentTabComplete
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-white/5 text-white/50 border border-white/10 hover:border-white/20"
            )}
          >
            <CheckCircle className={cn("h-3.5 w-3.5", isCurrentTabComplete && "fill-green-400")} />
            {isCurrentTabComplete ? 'Section Complete' : 'Mark as Complete'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MWTabNavigation;
