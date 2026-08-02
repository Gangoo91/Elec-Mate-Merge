import { useState } from 'react';

export type EICTabValue = 'details' | 'inspection' | 'testing' | 'declarations' | 'certificate';

/** Step order for the v3 EIC shell. This hook is navigation state only —
 * step completeness (tab ticks, ring, gates) lives in useEICValidation,
 * the single source of truth. */
const TAB_ORDER: EICTabValue[] = [
  'details',
  'inspection',
  'testing',
  'declarations',
  'certificate',
];

export const useEICTabs = () => {
  const [currentTab, setCurrentTab] = useState<EICTabValue>('details');

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
