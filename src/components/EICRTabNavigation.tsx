
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle, Circle } from 'lucide-react';
import { EICRTabValue } from '@/hooks/useEICRTabs';

interface EICRTabNavigationProps {
  currentTab: EICRTabValue;
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
}

const EICRTabNavigation = ({
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
  onToggleComplete
}: EICRTabNavigationProps) => {
  const isLastTab = currentTabIndex === totalTabs - 1;

  const handleNavigateNext = () => {
    navigateNext();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigatePrevious = () => {
    navigatePrevious();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 border-t-2 border-border bg-background mt-8 rounded-b-xl p-6">
      {/* Progress Indicator */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm font-medium">
          <span className="text-muted-foreground">Step {currentTabIndex + 1} of {totalTabs}</span>
          <span className="text-elec-yellow">{getProgressPercentage()}% Complete</span>
        </div>
        <Progress value={getProgressPercentage()} className="w-full h-3" />
      </div>

      {/* Mark as Complete Section */}
      <div className="flex justify-center py-2">
        <Button
          variant={isCurrentTabComplete ? "default" : "outline"}
          onClick={onToggleComplete}
          className={`h-10 px-6 gap-2 text-base transition-all ${
            isCurrentTabComplete 
              ? "bg-green-600 hover:bg-green-700 text-foreground border-green-600 shadow-lg shadow-green-600/20" 
              : currentTabHasRequiredFields 
                ? "border-green-600 text-green-600 hover:bg-green-600/10" 
                : "opacity-50 cursor-not-allowed"
          }`}
          disabled={!currentTabHasRequiredFields}
        >
          {isCurrentTabComplete ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <Circle className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {isCurrentTabComplete ? "Section Complete - Click to Edit" : "Mark as Complete"}
          </span>
          <span className="sm:hidden font-medium">
            {isCurrentTabComplete ? "Complete" : "Mark Complete"}
          </span>
        </Button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
        <Button
          variant="outline"
          onClick={handleNavigatePrevious}
          disabled={!canNavigatePrevious}
          className="h-11 w-full sm:w-auto px-6 gap-2 text-base border-border text-foreground hover:bg-muted touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="font-medium">Previous</span>
        </Button>

        <Button
          onClick={handleNavigateNext}
          disabled={!canNavigateNext}
          className="h-11 w-full sm:w-auto px-6 gap-2 text-base bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold shadow-lg shadow-elec-yellow/20 touch-manipulation"
        >
          <span className="font-medium">{isLastTab ? 'Complete EICR' : 'Next Section'}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Helpful hints */}
      {!currentTabHasRequiredFields && !isCurrentTabComplete && (
        <div className="text-center px-2">
          <p className="text-sm text-muted-foreground">
            Complete the required fields before marking this section as complete
          </p>
        </div>
      )}
      
      {currentTabHasRequiredFields && !isCurrentTabComplete && (
        <div className="text-center px-2">
          <p className="text-sm text-green-600 font-medium">
            All required fields completed. Click "Mark Complete" when you're ready to move on.
          </p>
        </div>
      )}
    </div>
  );
};

export default EICRTabNavigation;
