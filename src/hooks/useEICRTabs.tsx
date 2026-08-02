import { useState, useEffect } from 'react';

export type EICRTabValue = 'details' | 'inspection' | 'testing' | 'inspector' | 'certificate';

const TAB_ORDER: EICRTabValue[] = ['details', 'inspection', 'testing', 'inspector', 'certificate'];

interface UseEICRTabsOptions {
  initialTab?: EICRTabValue;
  controlledTab?: EICRTabValue;
  onTabChange?: (tab: string) => void;
}

/** Navigation-only tab state for the v3 EICR shell. Completeness/validation
 * lives in useEICRValidation (single source of truth) — this hook no longer
 * tracks required fields or manual completion flags. */
export const useEICRTabs = (options: UseEICRTabsOptions = {}) => {
  const { initialTab, controlledTab, onTabChange } = options;

  const [internalTab, setInternalTab] = useState<EICRTabValue>(initialTab || 'details');

  // Sync internal state with controlled value when it changes
  useEffect(() => {
    if (controlledTab && controlledTab !== internalTab) {
      setInternalTab(controlledTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledTab]);

  const currentTab = controlledTab || internalTab;

  const setCurrentTab = (tab: EICRTabValue) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  const currentTabIndex = TAB_ORDER.indexOf(currentTab);
  const totalTabs = TAB_ORDER.length;

  const canNavigateNext = (): boolean => currentTabIndex < totalTabs - 1;
  const canNavigatePrevious = (): boolean => currentTabIndex > 0;

  const navigateNext = (): void => {
    if (canNavigateNext()) setCurrentTab(TAB_ORDER[currentTabIndex + 1]);
  };

  const navigatePrevious = (): void => {
    if (canNavigatePrevious()) setCurrentTab(TAB_ORDER[currentTabIndex - 1]);
  };

  return {
    currentTab,
    setCurrentTab,
    currentTabIndex,
    totalTabs,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
  };
};
