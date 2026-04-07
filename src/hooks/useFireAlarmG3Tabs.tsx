import { useState } from 'react';

export type FAG3TabValue = 'project' | 'tests' | 'sound' | 'handover' | 'declaration';

const tabConfigs = [
  { id: 'project' as FAG3TabValue, label: 'Project', shortLabel: 'Project', requiredFields: ['premisesAddress'] },
  { id: 'tests' as FAG3TabValue, label: 'Tests', shortLabel: 'Tests', requiredFields: [] },
  { id: 'sound' as FAG3TabValue, label: 'Sound & Env', shortLabel: 'Sound', requiredFields: [] },
  { id: 'handover' as FAG3TabValue, label: 'Handover', shortLabel: 'Hand.', requiredFields: [] },
  { id: 'declaration' as FAG3TabValue, label: 'Declaration', shortLabel: 'Sign', requiredFields: ['commissionerSignature'] },
];

export const useFireAlarmG3Tabs = (formData: any) => {
  const [currentTab, setCurrentTab] = useState<FAG3TabValue>('project');
  const currentTabIndex = tabConfigs.findIndex((t) => t.id === currentTab);
  const totalTabs = tabConfigs.length;

  const isTabComplete = (tabId: FAG3TabValue): boolean => {
    const pt = formData.panelTests || {};
    const pw = formData.powerTests || {};
    const ft = formData.faultTests || {};
    switch (tabId) {
      case 'project': return !!(formData.clientName && formData.premisesAddress);
      case 'tests': return !!(pt.powerOnTest && pt.zoneIndicators && pt.faultIndicators && pt.silenceFacility && pt.resetFunction && pt.eventLog && pt.remoteSignalling && pw.mainsSupply && pw.batteryCondition && ft.openCircuit && ft.shortCircuit);
      case 'sound': return !!((formData.soundLevelReadings || []).length > 0);
      case 'handover': return !!(formData.handoverAsBuiltDrawings && formData.handoverLogBook);
      case 'declaration': return !!(formData.commissionerSignature && formData.overallResult);
      default: return false;
    }
  };

  const canNavigateNext = currentTabIndex < totalTabs - 1;
  const canNavigatePrevious = currentTabIndex > 0;
  const navigateNext = () => { if (canNavigateNext) setCurrentTab(tabConfigs[currentTabIndex + 1].id); };
  const navigatePrevious = () => { if (canNavigatePrevious) setCurrentTab(tabConfigs[currentTabIndex - 1].id); };
  const getProgressPercentage = () => Math.round((tabConfigs.filter((t) => isTabComplete(t.id)).length / totalTabs) * 100);

  return {
    currentTab, setCurrentTab, tabs: tabConfigs, currentTabIndex, totalTabs,
    isTabComplete, isCurrentTabComplete: isTabComplete(currentTab),
    canNavigateNext, canNavigatePrevious, navigateNext, navigatePrevious, getProgressPercentage,
  };
};
