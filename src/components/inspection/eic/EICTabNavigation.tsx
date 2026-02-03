import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, CheckCircle, Circle } from 'lucide-react';
import { EICTabValue } from '@/hooks/useEICTabs';

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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateNext = () => {
    navigateNext();
    scrollToTop();
  };

  const handleNavigatePrevious = () => {
    navigatePrevious();
    scrollToTop();
  };

  const getTabDisplayName = (tab: EICTabValue) => {
    const names = {
      installation: 'Installation Details',
      inspections: 'Schedule of Inspections',
      testing: 'Schedule of Testing',
      declarations: 'Declarations'
    };
    return names[tab];
  };

  return (
    <div className="border rounded-lg p-3 md:p-6 space-y-3 md:space-y-4">
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
            onClick={onToggleComplete}
            className={`flex items-center space-x-1 ${isCurrentTabComplete ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}
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
          onClick={handleNavigatePrevious}
          disabled={!canNavigatePrevious}
          className="h-11 w-full md:w-auto flex items-center justify-center space-x-2 touch-manipulation"
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
            onClick={onGenerateCertificate}
            disabled={!canGenerateCertificate}
            className="h-11 w-full md:w-auto flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-foreground touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Generate Certificate</span>
          </Button>
        ) : (
          <Button
            onClick={handleNavigateNext}
            disabled={!canNavigateNext}
            className="h-11 w-full md:w-auto flex items-center justify-center space-x-2 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-gray-darker touch-manipulation"
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
