import { useState } from 'react';

export type EICTabValue = 'details' | 'inspection' | 'testing' | 'declarations' | 'certificate';

interface TabConfig {
  id: EICTabValue;
  label: string;
  shortLabel: string;
  requiredFields: string[];
}

const tabConfigs: TabConfig[] = [
  {
    id: 'details',
    label: 'Installation Details',
    shortLabel: 'Details',
    requiredFields: ['clientName', 'installationAddress', 'installationDate', 'installationType', 'supplyVoltage', 'supplyFrequency', 'earthingArrangement', 'mainProtectiveDevice']
  },
  {
    id: 'inspection',
    label: 'Schedule of Inspections',
    shortLabel: 'Inspection',
    requiredFields: []
  },
  {
    id: 'testing',
    label: 'Schedule of Testing',
    shortLabel: 'Testing',
    requiredFields: []
  },
  {
    id: 'declarations',
    label: 'Declarations',
    shortLabel: 'Declarations',
    requiredFields: ['designerName', 'constructorName', 'inspectorName']
  },
  {
    id: 'certificate',
    label: 'Certificate',
    shortLabel: 'Certificate',
    requiredFields: ['inspectedByName', 'reportAuthorisedByName']
  }
];

export const useEICTabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<EICTabValue>('details');

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

    // Auto-complete based on required fields being filled
    switch (tabId) {
      case 'details':
        return completedSections[tabId] ||
          (formData.clientName && formData.installationAddress && formData.phases && formData.earthingArrangement);
      case 'inspection':
        return completedSections[tabId] || (formData.inspectionItems?.length > 0);
      case 'testing':
        return completedSections[tabId] || (formData.scheduleOfTests?.length > 0);
      case 'declarations':
        return completedSections[tabId] ||
          (formData.designerName && formData.constructorName && formData.inspectorName);
      case 'certificate':
        return completedSections[tabId] ||
          (formData.inspectedByName && formData.reportAuthorisedByName && formData.bs7671Compliance);
      default:
        return completedSections[tabId] === true;
    }
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
    // Calculate based on completed tabs
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
    getProgressPercentage,
    getCurrentTabLabel
  };
};
