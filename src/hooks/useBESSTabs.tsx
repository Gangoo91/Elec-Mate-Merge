import { useState } from 'react';

export type BESSTabValue = 'installation' | 'system-design' | 'electrical' | 'testing' | 'declarations';

interface TabConfig {
  id: BESSTabValue;
  label: string;
  shortLabel: string;
  requiredFields: string[];
}

const tabConfigs: TabConfig[] = [
  {
    id: 'installation',
    label: 'Installation Details',
    shortLabel: 'Install',
    requiredFields: ['clientName', 'installationAddress'],
  },
  {
    id: 'system-design',
    label: 'System Design',
    shortLabel: 'Design',
    requiredFields: ['batteryManufacturer', 'batteryModel', 'inverterManufacturer'],
  },
  {
    id: 'electrical',
    label: 'Electrical & Safety',
    shortLabel: 'Electrical',
    requiredFields: ['earthingArrangement', 'acCableType'],
  },
  {
    id: 'testing',
    label: 'Test Results',
    shortLabel: 'Testing',
    requiredFields: [],
  },
  {
    id: 'declarations',
    label: 'Declarations',
    shortLabel: 'Sign-off',
    requiredFields: ['installerName', 'installerScheme'],
  },
];

export const useBESSTabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<BESSTabValue>('installation');

  const currentTabIndex = tabConfigs.findIndex((tab) => tab.id === currentTab);
  const totalTabs = tabConfigs.length;

  const hasRequiredFields = (tabId: BESSTabValue): boolean => {
    const tab = tabConfigs.find((t) => t.id === tabId);
    if (!tab) return false;
    return tab.requiredFields.every((field) => {
      const value = formData[field];
      return value && value.toString().trim() !== '';
    });
  };

  const canAccessTab = (_tabId: BESSTabValue): boolean => true;

  const isTabComplete = (tabId: BESSTabValue): boolean => {
    const completedSections = formData.completedSections || {};
    switch (tabId) {
      case 'installation':
        return completedSections[tabId] || (formData.clientName && formData.installationAddress);
      case 'system-design':
        return completedSections[tabId] || (formData.batteryManufacturer && formData.batteryModel && formData.inverterManufacturer);
      case 'electrical':
        return completedSections[tabId] || (formData.earthingArrangement && formData.acCableType);
      case 'testing':
        return completedSections[tabId] || (formData.ze && formData.dcInsulationResistance && formData.chargeTest);
      case 'declarations':
        return completedSections[tabId] || (formData.installerName && formData.installerSignature);
      default:
        return completedSections[tabId] === true;
    }
  };

  const toggleTabComplete = (tabId: BESSTabValue, onUpdate: (field: string, value: any) => void): void => {
    const completedSections = formData.completedSections || {};
    onUpdate('completedSections', { ...completedSections, [tabId]: !completedSections[tabId] });
  };

  const canNavigateNext = (): boolean => currentTabIndex < totalTabs - 1;
  const canNavigatePrevious = (): boolean => currentTabIndex > 0;

  const navigateNext = (): void => {
    if (canNavigateNext()) setCurrentTab(tabConfigs[currentTabIndex + 1].id);
  };

  const navigatePrevious = (): void => {
    if (canNavigatePrevious()) setCurrentTab(tabConfigs[currentTabIndex - 1].id);
  };

  const getProgressPercentage = (): number => {
    const completedCount = tabConfigs.filter((tab) => isTabComplete(tab.id)).length;
    return Math.round((completedCount / totalTabs) * 100);
  };

  const getCurrentTabLabel = (): string => {
    const tab = tabConfigs.find((t) => t.id === currentTab);
    return tab?.label || '';
  };

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
    isCurrentTabComplete: isTabComplete(currentTab),
    toggleTabComplete,
    canNavigateNext: canNavigateNext(),
    canNavigatePrevious: canNavigatePrevious(),
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    getCurrentTabLabel,
  };
};
