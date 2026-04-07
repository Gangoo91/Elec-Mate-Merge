/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export type FAG7TabValue = 'project' | 'modification' | 'testing' | 'declaration';

const tabConfigs = [
  { id: 'project' as FAG7TabValue, label: 'Project', shortLabel: 'Project' },
  { id: 'modification' as FAG7TabValue, label: 'Modification', shortLabel: 'Mod.' },
  { id: 'testing' as FAG7TabValue, label: 'Testing', shortLabel: 'Tests' },
  { id: 'declaration' as FAG7TabValue, label: 'Declaration', shortLabel: 'Sign' },
];

export const useFireAlarmG7Tabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<FAG7TabValue>('project');
  const currentTabIndex = tabConfigs.findIndex((t) => t.id === currentTab);
  const totalTabs = tabConfigs.length;

  const isTabComplete = (tabId: FAG7TabValue): boolean => {
    switch (tabId) {
      case 'project':
        return !!(formData.clientName && formData.premisesAddress && formData.originalCertRef);
      case 'modification':
        return !!formData.modificationDescription;
      case 'testing':
        return !!formData.modifiedDevicesTested;
      case 'declaration':
        return !!(formData.modifierSignature && formData.overallResult);
      default:
        return false;
    }
  };

  const canNavigateNext = currentTabIndex < totalTabs - 1;
  const canNavigatePrevious = currentTabIndex > 0;
  const navigateNext = () => {
    if (canNavigateNext) setCurrentTab(tabConfigs[currentTabIndex + 1].id);
  };
  const navigatePrevious = () => {
    if (canNavigatePrevious) setCurrentTab(tabConfigs[currentTabIndex - 1].id);
  };
  const getProgressPercentage = () =>
    Math.round((tabConfigs.filter((t) => isTabComplete(t.id)).length / totalTabs) * 100);

  return {
    currentTab,
    setCurrentTab,
    tabs: tabConfigs,
    currentTabIndex,
    totalTabs,
    isTabComplete,
    isCurrentTabComplete: isTabComplete(currentTab),
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
  };
};
