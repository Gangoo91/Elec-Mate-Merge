import { useState } from 'react';

export type EmergencyLightingTabValue = 'installation' | 'luminaires' | 'testing' | 'declarations';

interface TabConfig {
  id: EmergencyLightingTabValue;
  label: string;
  shortLabel: string;
  requiredFields: string[];
}

const tabConfigs: TabConfig[] = [
  {
    id: 'installation',
    label: 'Installation Details',
    shortLabel: 'Details',
    requiredFields: ['clientName', 'premisesAddress', 'systemType']
  },
  {
    id: 'luminaires',
    label: 'Luminaire Schedule',
    shortLabel: 'Luminaires',
    requiredFields: []
  },
  {
    id: 'testing',
    label: 'Test Results',
    shortLabel: 'Testing',
    requiredFields: []
  },
  {
    id: 'declarations',
    label: 'Declarations',
    shortLabel: 'Declarations',
    requiredFields: ['testerName']
  }
];

export const useEmergencyLightingTabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<EmergencyLightingTabValue>('installation');

  const currentTabIndex = tabConfigs.findIndex(tab => tab.id === currentTab);
  const totalTabs = tabConfigs.length;

  const hasRequiredFields = (tabId: EmergencyLightingTabValue): boolean => {
    const tab = tabConfigs.find(t => t.id === tabId);
    if (!tab) return false;

    return tab.requiredFields.every(field => {
      const value = formData[field];
      return value && value.toString().trim() !== '';
    });
  };

  const canAccessTab = (tabId: EmergencyLightingTabValue): boolean => {
    return true;
  };

  const isTabComplete = (tabId: EmergencyLightingTabValue): boolean => {
    const completedSections = formData.completedSections || {};

    switch (tabId) {
      case 'installation':
        return completedSections[tabId] ||
          (formData.clientName && formData.premisesAddress && formData.systemType);
      case 'luminaires':
        return completedSections[tabId] || (formData.luminaires?.length > 0);
      case 'testing':
        return completedSections[tabId] ||
          (formData.monthlyFunctionalTest?.date || formData.annualDurationTest?.date);
      case 'declarations':
        return completedSections[tabId] ||
          (formData.testerName && formData.testerSignature);
      default:
        return completedSections[tabId] === true;
    }
  };

  const toggleTabComplete = (tabId: EmergencyLightingTabValue, onUpdate: (field: string, value: any) => void): void => {
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
