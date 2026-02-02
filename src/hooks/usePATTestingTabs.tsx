import { useState } from 'react';

export type PATTestingTabValue = 'client' | 'appliances' | 'results' | 'declarations';

interface TabConfig {
  id: PATTestingTabValue;
  label: string;
  shortLabel: string;
  requiredFields: string[];
}

const tabConfigs: TabConfig[] = [
  {
    id: 'client',
    label: 'Client Details',
    shortLabel: 'Client',
    requiredFields: ['clientName', 'siteAddress']
  },
  {
    id: 'appliances',
    label: 'Appliance List',
    shortLabel: 'Appliances',
    requiredFields: []
  },
  {
    id: 'results',
    label: 'Test Results',
    shortLabel: 'Results',
    requiredFields: []
  },
  {
    id: 'declarations',
    label: 'Declarations',
    shortLabel: 'Declarations',
    requiredFields: ['testerName']
  }
];

export const usePATTestingTabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<PATTestingTabValue>('client');

  const currentTabIndex = tabConfigs.findIndex(tab => tab.id === currentTab);
  const totalTabs = tabConfigs.length;

  const hasRequiredFields = (tabId: PATTestingTabValue): boolean => {
    const tab = tabConfigs.find(t => t.id === tabId);
    if (!tab) return false;

    return tab.requiredFields.every(field => {
      const value = formData[field];
      return value && value.toString().trim() !== '';
    });
  };

  const canAccessTab = (tabId: PATTestingTabValue): boolean => {
    return true;
  };

  const isTabComplete = (tabId: PATTestingTabValue): boolean => {
    const completedSections = formData.completedSections || {};

    switch (tabId) {
      case 'client':
        return completedSections[tabId] ||
          (formData.clientName && formData.siteAddress);
      case 'appliances':
        return completedSections[tabId] || (formData.appliances?.length > 0);
      case 'results':
        return completedSections[tabId] ||
          (formData.appliances?.some((a: any) => a.overallResult !== ''));
      case 'declarations':
        return completedSections[tabId] ||
          (formData.testerName && formData.testerSignature);
      default:
        return completedSections[tabId] === true;
    }
  };

  const toggleTabComplete = (tabId: PATTestingTabValue, onUpdate: (field: string, value: any) => void): void => {
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

  const isCurrentTabComplete = isTabComplete(currentTab);

  return {
    currentTab,
    setCurrentTab,
    tabs: tabConfigs,
    tabConfigs,
    currentTabIndex,
    totalTabs,
    canAccessTab,
    hasRequiredFields,
    isTabComplete,
    isCurrentTabComplete,
    toggleTabComplete,
    canNavigateNext: canNavigateNext(),
    canNavigatePrevious: canNavigatePrevious(),
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    getCurrentTabLabel
  };
};
