import { useState } from 'react';

export type MWTabValue = 'details' | 'circuit' | 'testing' | 'declaration';

interface TabConfig {
  id: MWTabValue;
  label: string;
  shortLabel: string;
  requiredFields: string[];
}

const tabConfigs: TabConfig[] = [
  {
    id: 'details',
    label: 'Client & Details',
    shortLabel: 'Details',
    requiredFields: ['clientName', 'propertyAddress', 'workDescription', 'earthingArrangement']
  },
  {
    id: 'circuit',
    label: 'Circuit Details',
    shortLabel: 'Circuit',
    requiredFields: ['circuitDesignation', 'protectiveDeviceType', 'protectiveDeviceRating', 'liveConductorSize']
  },
  {
    id: 'testing',
    label: 'Test Results',
    shortLabel: 'Testing',
    requiredFields: ['continuityR1R2', 'earthFaultLoopImpedance', 'polarity']
  },
  {
    id: 'declaration',
    label: 'Declaration',
    shortLabel: 'Declare',
    requiredFields: ['electricianName', 'position', 'signature', 'bs7671Compliance']
  }
];

export const useMinorWorksTabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<MWTabValue>('details');

  const currentTabIndex = tabConfigs.findIndex(tab => tab.id === currentTab);
  const totalTabs = tabConfigs.length;

  const hasRequiredFields = (tabId: MWTabValue): boolean => {
    const tab = tabConfigs.find(t => t.id === tabId);
    if (!tab) return false;

    return tab.requiredFields.every(field => {
      const value = formData[field];
      if (typeof value === 'boolean') return value === true;
      return value && value.toString().trim() !== '';
    });
  };

  const canAccessTab = (tabId: MWTabValue): boolean => {
    return true; // All tabs accessible
  };

  const isTabComplete = (tabId: MWTabValue): boolean => {
    const completedSections = formData.completedSections || {};

    switch (tabId) {
      case 'details':
        return completedSections[tabId] ||
          (formData.clientName && formData.propertyAddress && formData.workDescription && formData.earthingArrangement);
      case 'circuit':
        return completedSections[tabId] ||
          (formData.circuitDesignation && formData.protectiveDeviceType && formData.protectiveDeviceRating);
      case 'testing':
        return completedSections[tabId] ||
          (formData.continuityR1R2 && formData.earthFaultLoopImpedance && formData.polarity);
      case 'declaration':
        return completedSections[tabId] ||
          (formData.electricianName && formData.signature && formData.bs7671Compliance);
      default:
        return completedSections[tabId] === true;
    }
  };

  const toggleTabComplete = (tabId: MWTabValue, onUpdate: (field: string, value: any) => void): void => {
    const completedSections = formData.completedSections || {};
    const newCompletedSections = {
      ...completedSections,
      [tabId]: !completedSections[tabId]
    };
    onUpdate('completedSections', newCompletedSections);
  };

  const canNavigateNext = (): boolean => {
    return currentTabIndex < totalTabs - 1;
  };

  const canNavigatePrevious = (): boolean => {
    return currentTabIndex > 0;
  };

  const navigateNext = (): void => {
    if (canNavigateNext()) {
      const nextTabId = tabConfigs[currentTabIndex + 1].id;
      setCurrentTab(nextTabId);
    }
  };

  const navigatePrevious = (): void => {
    if (canNavigatePrevious()) {
      const previousTabId = tabConfigs[currentTabIndex - 1].id;
      setCurrentTab(previousTabId);
    }
  };

  const getProgressPercentage = (): number => {
    const completedCount = tabConfigs.filter(tab => isTabComplete(tab.id)).length;
    return Math.round((completedCount / totalTabs) * 100);
  };

  const getCurrentTabLabel = (): string => {
    const tab = tabConfigs.find(t => t.id === currentTab);
    return tab?.label || '';
  };

  return {
    currentTab,
    setCurrentTab,
    setTab: setCurrentTab, // Alias for compatibility
    tabConfigs,
    currentTabIndex,
    totalTabs,
    canAccessTab,
    hasRequiredFields,
    isTabComplete,
    toggleTabComplete,
    canNavigateNext: canNavigateNext(),
    canNavigatePrevious: canNavigatePrevious(),
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    getCurrentTabLabel
  };
};
