/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export type FAG1TabValue = 'client' | 'design' | 'devices' | 'declaration';

const tabConfigs = [
  {
    id: 'client' as FAG1TabValue,
    label: 'Client & Premises',
    shortLabel: 'Client',
    requiredFields: ['clientName', 'premisesAddress'],
  },
  {
    id: 'design' as FAG1TabValue,
    label: 'System Design',
    shortLabel: 'Design',
    requiredFields: ['systemCategory'],
  },
  {
    id: 'devices' as FAG1TabValue,
    label: 'Device Design',
    shortLabel: 'Devices',
    requiredFields: [],
  },
  {
    id: 'declaration' as FAG1TabValue,
    label: 'Declaration',
    shortLabel: 'Sign',
    requiredFields: ['designerSignature'],
  },
];

export const useFireAlarmG1Tabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<FAG1TabValue>('client');
  const currentTabIndex = tabConfigs.findIndex((t) => t.id === currentTab);
  const totalTabs = tabConfigs.length;

  const isTabComplete = (tabId: FAG1TabValue): boolean => {
    switch (tabId) {
      case 'client':
        return !!(formData.clientName && formData.premisesAddress && formData.fraReference);
      case 'design':
        return !!(
          formData.systemCategory &&
          formData.designBasis &&
          formData.categoryJustification
        );
      case 'devices':
        return !!(
          formData.zones?.length > 0 &&
          (formData.plannedOpticalSmoke || formData.plannedHeat || formData.plannedMultiSensor)
        );
      case 'declaration':
        return !!(formData.designerSignature && formData.designerName);
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
