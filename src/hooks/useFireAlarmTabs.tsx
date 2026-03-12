import { useState } from 'react';

export type FireAlarmTabValue = 'installation' | 'system' | 'testing' | 'declarations';

interface TabConfig {
  id: FireAlarmTabValue;
  label: string;
  shortLabel: string;
  requiredFields: string[];
}

// Per-type required fields for declarations tab
const declarationRequiredFields: Record<string, string[]> = {
  design: ['designerName', 'designerSignature'],
  installation: ['installerName', 'installerSignature'],
  commissioning: ['commissionerName', 'commissionerSignature'],
  acceptance: ['responsiblePersonName', 'responsiblePersonSignature'],
  verification: ['verificationOrganisation', 'verifierName', 'verifierSignature'],
  periodic: ['installerName', 'installerSignature'],
  modification: ['installerName', 'installerSignature'],
};

const getTabConfigs = (certificateType: string): TabConfig[] => [
  {
    id: 'installation',
    label: 'Installation Details',
    shortLabel: 'Details',
    requiredFields: ['clientName', 'premisesAddress', 'systemCategory', 'panelLocation'],
  },
  {
    id: 'system',
    label: 'System Design',
    shortLabel: 'System',
    requiredFields: ['systemMake', 'zonesCount'],
  },
  {
    id: 'testing',
    label: 'Testing Schedule',
    shortLabel: 'Testing',
    requiredFields: [],
  },
  {
    id: 'declarations',
    label: 'Declarations',
    shortLabel: 'Declarations',
    requiredFields: declarationRequiredFields[certificateType] || ['installerName'],
  },
];

export const useFireAlarmTabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<FireAlarmTabValue>('installation');
  const tabConfigs = getTabConfigs(formData.certificateType || 'installation');

  const currentTabIndex = tabConfigs.findIndex((tab) => tab.id === currentTab);
  const totalTabs = tabConfigs.length;

  const hasRequiredFields = (tabId: FireAlarmTabValue): boolean => {
    const tab = tabConfigs.find((t) => t.id === tabId);
    if (!tab) return false;

    return tab.requiredFields.every((field) => {
      const value = formData[field];
      return value && value.toString().trim() !== '';
    });
  };

  const canAccessTab = (tabId: FireAlarmTabValue): boolean => {
    return true; // All tabs accessible for Fire Alarm
  };

  const isTabComplete = (tabId: FireAlarmTabValue): boolean => {
    const completedSections = formData.completedSections || {};

    switch (tabId) {
      case 'installation':
        return (
          completedSections[tabId] ||
          (formData.clientName && formData.premisesAddress && formData.systemCategory)
        );
      case 'system':
        return completedSections[tabId] || (formData.systemMake && formData.zonesCount > 0);
      case 'testing':
        return (
          completedSections[tabId] ||
          (formData.panelTests?.powerOnTest && formData.powerTests?.mainsSupply)
        );
      case 'declarations': {
        if (completedSections[tabId]) return true;
        const certType = formData.certificateType || 'installation';
        const reqFields = declarationRequiredFields[certType] || ['installerName'];
        return reqFields.every(
          (f: string) => formData[f] && String(formData[f]).trim() !== ''
        );
      }
      default:
        return completedSections[tabId] === true;
    }
  };

  const toggleTabComplete = (
    tabId: FireAlarmTabValue,
    onUpdate: (field: string, value: any) => void
  ): void => {
    const completedSections = formData.completedSections || {};
    const newCompletedSections = {
      ...completedSections,
      [tabId]: !completedSections[tabId],
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
    const completedCount = tabConfigs.filter((tab) => isTabComplete(tab.id)).length;
    return Math.round((completedCount / totalTabs) * 100);
  };

  const getCurrentTabLabel = (): string => {
    const tab = tabConfigs.find((t) => t.id === currentTab);
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
    getCurrentTabLabel,
  };
};
