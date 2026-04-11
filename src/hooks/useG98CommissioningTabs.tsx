import { useState } from 'react';

export type G98TabValue = 'details' | 'equipment' | 'signoff';

const tabConfigs = [
  { id: 'details' as const, label: 'Details', shortLabel: 'Details', requiredFields: ['dnoName', 'installationAddress'] },
  { id: 'equipment' as const, label: 'Equipment', shortLabel: 'Equip', requiredFields: ['equipmentType', 'ratedOutput'] },
  { id: 'signoff' as const, label: 'Sign-off', shortLabel: 'Sign', requiredFields: ['installerSignature'] },
];

export const useG98CommissioningTabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<G98TabValue>('details');
  const currentTabIndex = tabConfigs.findIndex((t) => t.id === currentTab);
  const totalTabs = tabConfigs.length;

  const isTabComplete = (tabId: G98TabValue): boolean => {
    const cs = formData.completedSections || {};
    switch (tabId) {
      case 'details': return cs[tabId] || (formData.dnoName && formData.installationAddress);
      case 'equipment': return cs[tabId] || (formData.equipmentType && formData.ratedOutput);
      case 'signoff': return cs[tabId] || (formData.installerSignature && formData.antiIslandingConfirmed && formData.protectionSettingsVerified);
      default: return false;
    }
  };

  const canNavigateNext = currentTabIndex < totalTabs - 1;
  const canNavigatePrevious = currentTabIndex > 0;
  const navigateNext = () => { if (canNavigateNext) setCurrentTab(tabConfigs[currentTabIndex + 1].id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const navigatePrevious = () => { if (canNavigatePrevious) setCurrentTab(tabConfigs[currentTabIndex - 1].id); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const getProgressPercentage = () => Math.round((tabConfigs.filter((t) => isTabComplete(t.id)).length / totalTabs) * 100);

  return {
    currentTab, setCurrentTab, tabs: tabConfigs, tabConfigs,
    currentTabIndex, totalTabs,
    isTabComplete, isCurrentTabComplete: isTabComplete(currentTab),
    canNavigateNext, canNavigatePrevious, navigateNext, navigatePrevious,
    getProgressPercentage,
  };
};
