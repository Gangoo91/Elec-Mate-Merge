/**
 * useEICTabs.ts
 * Hook to manage EIC form tab navigation and state
 */

import { useState, useCallback, useMemo } from 'react';

export type EICTabValue = 'installation' | 'inspections' | 'testing' | 'declarations';

interface EICTab {
  id: EICTabValue;
  label: string;
  requiredFields: string[];
}

const EIC_TABS: EICTab[] = [
  { id: 'installation', label: 'Installation', requiredFields: ['installationAddress', 'earthingSystem'] },
  { id: 'inspections', label: 'Inspections', requiredFields: [] },
  { id: 'testing', label: 'Testing', requiredFields: ['scheduleOfTests'] },
  { id: 'declarations', label: 'Declarations', requiredFields: [] }
];

export function useEICTabs(formData: any) {
  const [currentTab, setCurrentTab] = useState<EICTabValue>('installation');

  const tabs = EIC_TABS;

  const currentTabIndex = useMemo(() => {
    return tabs.findIndex(t => t.id === currentTab);
  }, [currentTab, tabs]);

  const canAccessTab = useCallback((tabId: EICTabValue): boolean => {
    // For now, allow access to all tabs
    return true;
  }, []);

  const canNavigateNext = useMemo(() => {
    return currentTabIndex < tabs.length - 1;
  }, [currentTabIndex, tabs]);

  const canNavigatePrevious = useMemo(() => {
    return currentTabIndex > 0;
  }, [currentTabIndex]);

  const navigateNext = useCallback(() => {
    if (canNavigateNext) {
      const nextTab = tabs[currentTabIndex + 1];
      setCurrentTab(nextTab.id);
    }
  }, [canNavigateNext, currentTabIndex, tabs]);

  const navigatePrevious = useCallback(() => {
    if (canNavigatePrevious) {
      const prevTab = tabs[currentTabIndex - 1];
      setCurrentTab(prevTab.id);
    }
  }, [canNavigatePrevious, currentTabIndex, tabs]);

  const getProgressPercentage = useCallback((): number => {
    // Simple progress based on tab position
    return ((currentTabIndex + 1) / tabs.length) * 100;
  }, [currentTabIndex, tabs]);

  const isCurrentTabComplete = useMemo(() => {
    const tab = tabs[currentTabIndex];
    if (!tab.requiredFields.length) return true;
    return tab.requiredFields.every(field => {
      const value = formData[field];
      if (Array.isArray(value)) return value.length > 0;
      return !!value;
    });
  }, [currentTabIndex, tabs, formData]);

  return {
    currentTab,
    setCurrentTab,
    tabs,
    currentTabIndex,
    canAccessTab,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    isCurrentTabComplete
  };
}
