import { useState } from 'react';

export type EICTabValue = 'installation' | 'inspections' | 'testing' | 'declarations';

interface TabConfig {
  id: EICTabValue;
  label: string;
  requiredFields: string[];
}

const tabConfigs: TabConfig[] = [
  {
    id: 'installation',
    label: 'Installation Details',
    requiredFields: ['clientName', 'installationAddress', 'installationDate', 'installationType', 'supplyVoltage', 'supplyFrequency', 'earthingArrangement', 'mainProtectiveDevice']
  },
  {
    id: 'inspections',
    label: 'Schedule of Inspections',
    requiredFields: []
  },
  {
    id: 'testing',
    label: 'Schedule of Testing',
    requiredFields: []
  },
  {
    id: 'declarations',
    label: 'Declarations',
    requiredFields: ['designerName', 'constructorName', 'inspectorName']
  }
];

export const useEICTabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<EICTabValue>('installation');

  const currentTabIndex = tabConfigs.findIndex(tab => tab.id === currentTab);
  const totalTabs = tabConfigs.length;

  const hasRequiredFields = (tabId: EICTabValue): boolean => {
    const tab = tabConfigs.find(t => t.id === tabId);
    if (!tab) return false;

    return tab.requiredFields.every(field => {
      const value = formData[field];
      return value && value.toString().trim() !== '';
    });
  };

  const canAccessTab = (tabId: EICTabValue): boolean => {
    return true; // All tabs accessible for EIC
  };

  const isTabComplete = (tabId: EICTabValue): boolean => {
    const completedSections = formData.completedSections || {};
    return completedSections[tabId] === true;
  };

  const toggleTabComplete = (tabId: EICTabValue, onUpdate: (field: string, value: any) => void): void => {
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
    return Math.round(((currentTabIndex + 1) / totalTabs) * 100);
  };

  return {
    currentTab,
    setCurrentTab,
    tabConfigs,
    currentTabIndex,
    totalTabs,
    canAccessTab,
    hasRequiredFields,
    isTabComplete,
    toggleTabComplete,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    getProgressPercentage
  };
};
