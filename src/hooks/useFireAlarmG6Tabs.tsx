/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export type FAG6TabValue = 'project' | 'scope' | 'tests' | 'defects' | 'declaration';

const tabConfigs = [
  { id: 'project' as FAG6TabValue, label: 'Project', shortLabel: 'Project' },
  { id: 'scope' as FAG6TabValue, label: 'Scope', shortLabel: 'Scope' },
  { id: 'tests' as FAG6TabValue, label: 'Tests', shortLabel: 'Tests' },
  { id: 'defects' as FAG6TabValue, label: 'Defects', shortLabel: 'Defects' },
  { id: 'declaration' as FAG6TabValue, label: 'Declaration', shortLabel: 'Sign' },
];

export const useFireAlarmG6Tabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<FAG6TabValue>('project');
  const currentTabIndex = tabConfigs.findIndex((t) => t.id === currentTab);
  const totalTabs = tabConfigs.length;

  const isTabComplete = (tabId: FAG6TabValue): boolean => {
    const pt = formData.panelTests || {};
    switch (tabId) {
      case 'project':
        return !!(formData.clientName && formData.premisesAddress);
      case 'scope':
        return !!formData.extentOfInspection;
      case 'tests':
        return !!(pt.powerOnTest && pt.zoneIndicators);
      case 'defects':
        return true; // Always "complete" — zero defects is valid
      case 'declaration':
        return !!(formData.inspectorSignature && formData.overallResult);
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
