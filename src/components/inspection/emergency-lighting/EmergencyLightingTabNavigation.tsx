import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface EmergencyLightingTabNavigationProps {
  currentTab: string;
  currentTabIndex: number;
  totalTabs: number;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  navigateNext: () => void;
  navigatePrevious: () => void;
  getProgressPercentage: () => number;
  isCurrentTabComplete: boolean;
  onGenerateCertificate?: () => void;
  canGenerateCertificate?: boolean;
}

const EmergencyLightingTabNavigation: React.FC<EmergencyLightingTabNavigationProps> = ({
  currentTab,
  currentTabIndex,
  totalTabs,
  canNavigateNext,
  canNavigatePrevious,
  navigateNext,
  navigatePrevious,
  getProgressPercentage,
  isCurrentTabComplete,
  onGenerateCertificate,
  canGenerateCertificate = true,
}) => {
  const isMobile = useIsMobile();
  const progress = getProgressPercentage();
  const isLastTab = currentTabIndex === totalTabs - 1;

  return (
    <div className={cn(
      "sticky bottom-0 left-0 right-0 bg-[#242428] border-t border-border",
      isMobile ? "p-3 mt-2" : "p-4 mt-6"
    )}>
      <div className={cn(isMobile ? "" : "max-w-5xl mx-auto")}>
        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">
              Section {currentTabIndex + 1} of {totalTabs}
            </span>
            <span className="text-sm font-medium text-foreground">{progress}% complete</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={navigatePrevious}
            disabled={!canNavigatePrevious}
            className={cn(
              "touch-manipulation border-white/30",
              isMobile ? "h-11 px-4" : "h-12 px-6"
            )}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {isCurrentTabComplete && (
              <div className="flex items-center gap-1 text-green-500 text-sm">
                <CheckCircle2 className="h-4 w-4" />
                <span className="hidden sm:inline">Section complete</span>
              </div>
            )}
          </div>

          {isLastTab ? (
            <Button
              onClick={onGenerateCertificate}
              disabled={!canGenerateCertificate}
              className={cn(
                "touch-manipulation bg-amber-600 hover:bg-amber-700",
                isMobile ? "h-11 px-4" : "h-12 px-6"
              )}
            >
              Generate Certificate
            </Button>
          ) : (
            <Button
              onClick={navigateNext}
              disabled={!canNavigateNext}
              className={cn(
                "touch-manipulation",
                isMobile ? "h-11 px-4" : "h-12 px-6"
              )}
            >
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingTabNavigation;
