import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, CheckCircle, Circle } from 'lucide-react';
import { EICTabValue } from '@/hooks/useEICTabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';
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
}

const EICTabNavigation: React.FC<EICTabNavigationProps> = ({
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
  canGenerateCertificate = true
}) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();

  const getTabDisplayName = (tab: EICTabValue) => {
    const names = {
      installation: 'Installation Details',
      inspections: 'Schedule of Inspections',
      testing: 'Schedule of Testing',
      declarations: 'Declarations'
    };
    return names[tab];
  };

  const handlePrevious = () => {
    haptics.tap();
    navigatePrevious();
  };

  const handleNext = () => {
    haptics.tap();
    navigateNext();
  };

  const handleToggleComplete = () => {
    haptics.tap();
    onToggleComplete();
  };

  const handleGenerateCertificate = () => {
    haptics.success();
    onGenerateCertificate?.();
  };

  return (
    <div className={cn(
      "border rounded-lg p-3 md:p-6 space-y-3 md:space-y-4",
      isMobile && "border-border/30 bg-card/30"
    )}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2 md:gap-4 flex-wrap">
          <Badge variant="outline" className="text-sm">
            Step {currentTabIndex + 1} of {totalTabs}
          </Badge>
          <h3 className="font-medium text-elec-yellow">
            {getTabDisplayName(currentTab)}
          </h3>
        </div>

        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleComplete}
            className={cn(
              "flex items-center space-x-1 h-11 touch-manipulation",
              isCurrentTabComplete ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
            )}
          >
            {isCurrentTabComplete ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Circle className="h-4 w-4" />
            )}
            <span className="text-xs">
              {isCurrentTabComplete ? 'Complete' : 'Mark Complete'}
            </span>
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{getProgressPercentage()}%</span>
        </div>
        <Progress value={getProgressPercentage()} className="h-2" />
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center pt-2">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!canNavigatePrevious}
          className="h-12 w-full md:w-auto flex items-center justify-center space-x-2 touch-manipulation bg-card/50 border-border/30 hover:bg-card active:bg-card/70"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </Button>

        <div className="flex flex-wrap justify-center gap-2 order-first md:order-none">
          {currentTabHasRequiredFields && (
            <Badge variant="secondary" className="text-xs">
              Required fields completed
            </Badge>
          )}
          {isCurrentTabComplete && (
            <Badge variant="default" className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30">
              Section complete
            </Badge>
          )}
        </div>

        {currentTabIndex === totalTabs - 1 ? (
          <Button
            onClick={handleGenerateCertificate}
            disabled={!canGenerateCertificate}
            className="h-14 w-full md:w-auto flex items-center justify-center space-x-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="h-5 w-5" />
            <span>Generate Certificate</span>
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!canNavigateNext}
            className="h-12 w-full md:w-auto flex items-center justify-center space-x-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default EICTabNavigation;
