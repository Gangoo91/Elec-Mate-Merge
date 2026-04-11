import { useState } from 'react';

export type G99TabValue = 'application' | 'commissioning' | 'signoff';

const tabConfigs = [
  { id: 'application' as const, label: 'Stage 1: Application', shortLabel: 'Application', requiredFields: ['dnoName', 'installationAddress', 'ratedOutput'] },
  { id: 'commissioning' as const, label: 'Stage 2: Commissioning', shortLabel: 'Commission', requiredFields: [] },
  { id: 'signoff' as const, label: 'Sign-off', shortLabel: 'Sign-off', requiredFields: ['installerName', 'overallResult'] },
];

export const useG99CommissioningTabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<G99TabValue>('application');
  const currentTabIndex = tabConfigs.findIndex((t) => t.id === currentTab);
  const totalTabs = tabConfigs.length;

  const isTabComplete = (tabId: G99TabValue): boolean => {
    const cs = formData.completedSections || {};
    switch (tabId) {
      case 'application': return cs[tabId] || (formData.dnoName && formData.installationAddress && formData.ratedOutput);
      case 'commissioning': return cs[tabId] || (formData.antiIslandingConfirmed && formData.protectionSettingsVerified);
      case 'signoff': return cs[tabId] || (formData.installerName && formData.installerSignature && formData.overallResult);
      default: return false;
    }
  };

  const canNavigateNext = currentTabIndex < totalTabs - 1;
  const canNavigatePrevious = currentTabIndex > 0;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const navigateNext = () => { if (canNavigateNext) { setCurrentTab(tabConfigs[currentTabIndex + 1].id); scrollToTop(); } };
  const navigatePrevious = () => { if (canNavigatePrevious) { setCurrentTab(tabConfigs[currentTabIndex - 1].id); scrollToTop(); } };
  const getProgressPercentage = () => Math.round((tabConfigs.filter((t) => isTabComplete(t.id)).length / totalTabs) * 100);

  return {
    currentTab, setCurrentTab, tabs: tabConfigs, tabConfigs,
    currentTabIndex, totalTabs,
    isTabComplete, isCurrentTabComplete: isTabComplete(currentTab),
    canNavigateNext, canNavigatePrevious, navigateNext, navigatePrevious,
    getProgressPercentage,
  };
};
