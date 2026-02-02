import { useState } from 'react';
import { SolarPVFormData } from '@/types/solar-pv';

export type SolarPVTabValue = 'installation' | 'system' | 'grid' | 'testing' | 'signoff';

interface TabConfig {
  id: SolarPVTabValue;
  label: string;
  shortLabel: string;
  requiredFields: string[];
}

const tabConfigs: TabConfig[] = [
  {
    id: 'installation',
    label: 'Installation Details',
    shortLabel: 'Details',
    requiredFields: ['clientName', 'clientAddress', 'installationDate']
  },
  {
    id: 'system',
    label: 'System Design',
    shortLabel: 'System',
    requiredFields: ['arrays', 'inverters']
  },
  {
    id: 'grid',
    label: 'Grid Connection',
    shortLabel: 'Grid',
    requiredFields: ['gridConnection.dnoName', 'gridConnection.mpan']
  },
  {
    id: 'testing',
    label: 'Testing',
    shortLabel: 'Testing',
    requiredFields: []
  },
  {
    id: 'signoff',
    label: 'Sign-Off',
    shortLabel: 'Sign-Off',
    requiredFields: ['installerDeclaration.installerName', 'installerDeclaration.installerSignature']
  }
];

export const useSolarPVTabs = (formData: SolarPVFormData) => {
  const [currentTab, setCurrentTab] = useState<SolarPVTabValue>('installation');

  const currentTabIndex = tabConfigs.findIndex(tab => tab.id === currentTab);
  const totalTabs = tabConfigs.length;

  const hasRequiredFields = (tabId: SolarPVTabValue): boolean => {
    const tab = tabConfigs.find(t => t.id === tabId);
    if (!tab) return false;

    return tab.requiredFields.every(field => {
      // Handle nested fields like 'gridConnection.dnoName'
      const parts = field.split('.');
      let value: any = formData;
      for (const part of parts) {
        if (value === undefined || value === null) return false;
        value = value[part];
      }

      // Check arrays
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return value && value.toString().trim() !== '';
    });
  };

  const canAccessTab = (tabId: SolarPVTabValue): boolean => {
    return true; // All tabs accessible for Solar PV
  };

  const isTabComplete = (tabId: SolarPVTabValue): boolean => {
    const completedSections = formData.completedSections || {};

    switch (tabId) {
      case 'installation':
        return completedSections[tabId] ||
          (!!formData.clientName &&
           !!formData.clientAddress &&
           !!formData.mcsDetails?.installerNumber);

      case 'system':
        return completedSections[tabId] ||
          (formData.arrays?.length > 0 &&
           formData.arrays.some(a => a.panelMake && a.panelCount > 0) &&
           formData.inverters?.length > 0 &&
           formData.inverters.some(i => i.make && i.ratedPowerAc > 0));

      case 'grid':
        return completedSections[tabId] ||
          (!!formData.gridConnection?.dnoName &&
           !!formData.gridConnection?.mpan &&
           !!formData.gridConnection?.applicationType);

      case 'testing':
        return completedSections[tabId] ||
          (formData.testResults?.arrayTests?.length > 0 &&
           formData.testResults.acTests?.polarityCorrect);

      case 'signoff':
        return completedSections[tabId] ||
          (!!formData.installerDeclaration?.installerName &&
           !!formData.installerDeclaration?.installerSignature);

      default:
        return completedSections[tabId] === true;
    }
  };

  const toggleTabComplete = (tabId: SolarPVTabValue, onUpdate: (field: string, value: any) => void): void => {
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
