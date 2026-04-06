import { useState } from 'react';

export type LPTabValue = 'certificate' | 'installation' | 'visual' | 'testing' | 'observations';

interface TabConfig {
  id: LPTabValue;
  label: string;
  shortLabel: string;
  requiredFields: string[];
}

const tabConfigs: TabConfig[] = [
  { id: 'certificate', label: 'Certificate & Site', shortLabel: 'Site', requiredFields: ['clientName', 'siteAddress', 'inspectionType'] },
  { id: 'installation', label: 'Installation Details', shortLabel: 'Install', requiredFields: ['lpsClass', 'lpsType'] },
  { id: 'visual', label: 'Visual Inspection', shortLabel: 'Visual', requiredFields: [] },
  { id: 'testing', label: 'Test Schedule', shortLabel: 'Testing', requiredFields: [] },
  { id: 'observations', label: 'Observations & Sign-off', shortLabel: 'Sign-off', requiredFields: ['testerName', 'overallResult'] },
];

export const useLightningProtectionTabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<LPTabValue>('certificate');
  const currentTabIndex = tabConfigs.findIndex((t) => t.id === currentTab);
  const totalTabs = tabConfigs.length;

  const hasRequiredFields = (tabId: LPTabValue): boolean => {
    const tab = tabConfigs.find((t) => t.id === tabId);
    if (!tab) return false;
    return tab.requiredFields.every((f) => { const v = formData[f]; return v && v.toString().trim() !== ''; });
  };

  const canAccessTab = (_tabId: LPTabValue): boolean => true;

  const isTabComplete = (tabId: LPTabValue): boolean => {
    const cs = formData.completedSections || {};
    switch (tabId) {
      case 'certificate': return cs[tabId] || (formData.clientName && formData.siteAddress && formData.inspectionType);
      case 'installation': return cs[tabId] || (formData.lpsClass && formData.lpsType);
      case 'visual': return cs[tabId] || formData.visualInspection?.every((i: any) => i.result);
      case 'testing': return cs[tabId] || formData.earthElectrodeTests?.some((t: any) => t.measuredResistance);
      case 'observations': return cs[tabId] || (formData.testerName && formData.inspectorSignature && formData.overallResult);
      default: return cs[tabId] === true;
    }
  };

  const toggleTabComplete = (tabId: LPTabValue, onUpdate: (field: string, value: any) => void): void => {
    const cs = formData.completedSections || {};
    onUpdate('completedSections', { ...cs, [tabId]: !cs[tabId] });
  };

  const canNavigateNext = (): boolean => currentTabIndex < totalTabs - 1;
  const canNavigatePrevious = (): boolean => currentTabIndex > 0;
  const navigateNext = (): void => { if (canNavigateNext()) setCurrentTab(tabConfigs[currentTabIndex + 1].id); };
  const navigatePrevious = (): void => { if (canNavigatePrevious()) setCurrentTab(tabConfigs[currentTabIndex - 1].id); };
  const getProgressPercentage = (): number => { const c = tabConfigs.filter((t) => isTabComplete(t.id)).length; return Math.round((c / totalTabs) * 100); };
  const getCurrentTabLabel = (): string => tabConfigs.find((t) => t.id === currentTab)?.label || '';

  return {
    currentTab, setCurrentTab, tabs: tabConfigs, tabConfigs,
    currentTabIndex, totalTabs, canAccessTab, hasRequiredFields,
    isTabComplete, isCurrentTabComplete: isTabComplete(currentTab),
    toggleTabComplete,
    canNavigateNext: canNavigateNext(), canNavigatePrevious: canNavigatePrevious(),
    navigateNext, navigatePrevious, getProgressPercentage, getCurrentTabLabel,
  };
};
