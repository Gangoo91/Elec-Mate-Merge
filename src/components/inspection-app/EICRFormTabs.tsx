import React from 'react';
import { useEICRTabs } from '@/hooks/useEICRTabs';
import { useIsMobile } from '@/hooks/use-mobile';
import EICRTabContent from './EICRTabContent';
import EICRStepIndicator from './eicr/EICRStepIndicator';
import { cn } from '@/lib/utils';

interface EICRFormTabsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onProgressChange?: (progress: number, tabLabel: string) => void;
}

const EICRFormTabs = ({ formData, onUpdate, onProgressChange }: EICRFormTabsProps) => {
  const isMobile = useIsMobile();
  const {
    currentTab,
    setCurrentTab,
    tabConfigs,
    navigateNext,
    navigatePrevious,
    currentTabIndex,
    totalTabs,
    canNavigateNext,
    canNavigatePrevious,
    getProgressPercentage,
    getCurrentTabProgress,
    isCurrentTabComplete,
    currentTabHasRequiredFields,
    toggleTabComplete,
    isTabComplete
  } = useEICRTabs(formData);

  // Get current tab label
  const currentTabConfig = tabConfigs.find(t => t.id === currentTab);
  const currentTabLabel = currentTabConfig?.label || 'EICR Report';

  // Notify parent of progress changes (use current tab progress for header display)
  React.useEffect(() => {
    if (onProgressChange) {
      onProgressChange(getCurrentTabProgress(), currentTabLabel);
    }
  }, [currentTab, onProgressChange, getCurrentTabProgress, currentTabLabel]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value as any);
  };

  const handleToggleComplete = () => {
    toggleTabComplete(currentTab, onUpdate);
  };

  const tabContentProps = {
    formData,
    onUpdate,
    isMobile,
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
    onToggleComplete: handleToggleComplete
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Step Indicator Navigation */}
      <div className="eicr-step-nav">
        <EICRStepIndicator
          currentTab={currentTab}
          onTabChange={handleTabChange}
          isTabComplete={isTabComplete}
        />
      </div>

      {/* Tab Content with transition */}
      <div
        key={currentTab}
        className={cn(
          "animate-in fade-in-0 slide-in-from-right-2 duration-300",
          "space-y-4 sm:space-y-6"
        )}
      >
        <EICRTabContent tabValue={currentTab} {...tabContentProps} />
      </div>
    </div>
  );
};

export default EICRFormTabs;
