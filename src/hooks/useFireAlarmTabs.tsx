/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export type FireAlarmTabValue = 'client' | 'system' | 'zones' | 'equipment' | 'declarations';

interface TabConfig {
  id: FireAlarmTabValue;
  label: string;
  shortLabel: string;
  requiredFields: string[];
}

const tabConfigs: TabConfig[] = [
  {
    id: 'client',
    label: 'Client & Premises',
    shortLabel: 'Client',
    requiredFields: ['clientName', 'premisesAddress'],
  },
  {
    id: 'system',
    label: 'System & Panel',
    shortLabel: 'System',
    requiredFields: ['systemCategory'],
  },
  { id: 'zones', label: 'Zones & Devices', shortLabel: 'Zones', requiredFields: [] },
  { id: 'equipment', label: 'Equipment', shortLabel: 'Equip', requiredFields: [] },
  {
    id: 'declarations',
    label: 'Declarations',
    shortLabel: 'Sign',
    requiredFields: ['installerName'],
  },
];

export const useFireAlarmTabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<FireAlarmTabValue>('client');
  const currentTabIndex = tabConfigs.findIndex((t) => t.id === currentTab);
  const totalTabs = tabConfigs.length;

  const canAccessTab = (_tabId: FireAlarmTabValue): boolean => true;

  const isTabComplete = (tabId: FireAlarmTabValue): boolean => {
    const cs = formData.completedSections || {};
    switch (tabId) {
      case 'client':
        return cs[tabId] || (formData.clientName && formData.premisesAddress);
      case 'system':
        return cs[tabId] || !!formData.systemCategory;
      case 'zones':
        return cs[tabId] || (formData.zones?.length > 0 && formData.zones[0]?.zoneName);
      case 'equipment':
        return cs[tabId] || true;
      case 'declarations':
        return cs[tabId] || (formData.installerName && formData.installerSignature);
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
    tabConfigs,
    currentTabIndex,
    totalTabs,
    canAccessTab,
    isTabComplete,
    isCurrentTabComplete: isTabComplete(currentTab),
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
  };
};
