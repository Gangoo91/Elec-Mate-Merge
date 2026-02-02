import { useState } from 'react';

export type EVChargingTabValue = 'installation' | 'supply' | 'testing' | 'declarations';

interface TabConfig {
  id: EVChargingTabValue;
  label: string;
  shortLabel: string;
  requiredFields: string[];
}

const tabConfigs: TabConfig[] = [
  {
    id: 'installation',
    label: 'Installation Details',
    shortLabel: 'Details',
    requiredFields: ['clientName', 'installationAddress', 'chargerMake', 'chargerModel']
  },
  {
    id: 'supply',
    label: 'Electrical Supply',
    shortLabel: 'Supply',
    requiredFields: ['earthingArrangement', 'cableType', 'protectionDeviceType']
  },
  {
    id: 'testing',
    label: 'Testing',
    shortLabel: 'Testing',
    requiredFields: []
  },
  {
    id: 'declarations',
    label: 'Declarations',
    shortLabel: 'Declarations',
    requiredFields: ['installerName', 'installerScheme']
  }
];

export const useEVChargingTabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<EVChargingTabValue>('installation');

  const currentTabIndex = tabConfigs.findIndex(tab => tab.id === currentTab);
  const totalTabs = tabConfigs.length;

  const hasRequiredFields = (tabId: EVChargingTabValue): boolean => {
    const tab = tabConfigs.find(t => t.id === tabId);
    if (!tab) return false;

    return tab.requiredFields.every(field => {
      const value = formData[field];
      return value && value.toString().trim() !== '';
    });
  };

  const canAccessTab = (tabId: EVChargingTabValue): boolean => {
    return true;
  };

  const isTabComplete = (tabId: EVChargingTabValue): boolean => {
    const completedSections = formData.completedSections || {};

    switch (tabId) {
      case 'installation':
        return completedSections[tabId] ||
          (formData.clientName && formData.installationAddress && formData.chargerMake);
      case 'supply':
        return completedSections[tabId] ||
          (formData.earthingArrangement && formData.cableType && formData.protectionDeviceType);
      case 'testing':
        return completedSections[tabId] ||
          (formData.testResults?.zs && formData.testResults?.polarity);
      case 'declarations':
        return completedSections[tabId] ||
          (formData.installerName && formData.installerSignature && formData.installerScheme);
      default:
        return completedSections[tabId] === true;
    }
  };

  const toggleTabComplete = (tabId: EVChargingTabValue, onUpdate: (field: string, value: any) => void): void => {
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
