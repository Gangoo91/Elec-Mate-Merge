import { useState } from 'react';
import type { VisualConditionFormData } from '@/types/visual-condition';

export type VisualConditionTabValue =
  | 'client'
  | 'scope'
  | 'installation'
  | 'inspection'
  | 'declaration';

interface TabConfig {
  id: VisualConditionTabValue;
  label: string;
  shortLabel: string;
  requiredFields: (keyof VisualConditionFormData)[];
}

/**
 * Five steps, in the order the job actually happens: who and where, what you
 * agreed to look at, what you found at the board, the walk round, then sign.
 *
 * Short labels are what show on a phone — the step rail is horizontal and
 * anything longer than about eight characters truncates.
 */
const tabConfigs: TabConfig[] = [
  {
    id: 'client',
    label: 'Client and site',
    shortLabel: 'Client',
    requiredFields: ['clientName', 'installationAddress'],
  },
  {
    id: 'scope',
    label: 'Purpose and extent',
    shortLabel: 'Scope',
    requiredFields: ['purpose', 'extent'],
  },
  {
    id: 'installation',
    label: 'Supply and board',
    shortLabel: 'Supply',
    requiredFields: ['supplyType'],
  },
  {
    id: 'inspection',
    label: 'Visual inspection',
    shortLabel: 'Inspect',
    requiredFields: [],
  },
  {
    id: 'declaration',
    label: 'Declaration',
    shortLabel: 'Sign off',
    requiredFields: ['inspectorName', 'inspectorSignature'],
  },
];

export const useVisualConditionTabs = (formData: VisualConditionFormData) => {
  const [currentTab, setCurrentTab] = useState<VisualConditionTabValue>('client');

  const currentTabIndex = tabConfigs.findIndex((t) => t.id === currentTab);
  const totalTabs = tabConfigs.length;

  const hasRequiredFields = (tabId: VisualConditionTabValue): boolean => {
    const tab = tabConfigs.find((t) => t.id === tabId);
    if (!tab) return false;
    return tab.requiredFields.every((f) => String(formData[f] ?? '').trim() !== '');
  };

  /** Every step is reachable — an electrician on site knows their own order. */
  const canAccessTab = (): boolean => true;

  const isTabComplete = (tabId: VisualConditionTabValue): boolean => {
    const manual = formData.completedSections || {};
    if (manual[tabId]) return true;
    switch (tabId) {
      case 'client':
        return !!(formData.clientName && formData.installationAddress);
      case 'scope':
        return !!(formData.purpose && formData.extent);
      case 'installation':
        return !!formData.supplyType;
      /*
       * The inspection step completes once every item has an answer. Counting
       * "some answered" would let a half-walked property look finished, and on
       * a visual report the schedule IS the work — there is nothing else to
       * show that it was done.
       */
      case 'inspection':
        return (
          formData.inspectionItems.length > 0 &&
          formData.inspectionItems.every((i) => i.outcome !== '')
        );
      case 'declaration':
        return !!(formData.inspectorName && formData.inspectorSignature);
      default:
        return false;
    }
  };

  const toggleTabComplete = (
    tabId: VisualConditionTabValue,
    onUpdate: (field: 'completedSections', value: Record<string, boolean>) => void
  ): void => {
    const manual = formData.completedSections || {};
    onUpdate('completedSections', { ...manual, [tabId]: !manual[tabId] });
  };

  const canNavigateNext = currentTabIndex < totalTabs - 1;
  const canNavigatePrevious = currentTabIndex > 0;

  const navigateNext = () => {
    if (canNavigateNext) setCurrentTab(tabConfigs[currentTabIndex + 1].id);
  };
  const navigatePrevious = () => {
    if (canNavigatePrevious) setCurrentTab(tabConfigs[currentTabIndex - 1].id);
  };

  const getProgressPercentage = (): number =>
    Math.round((tabConfigs.filter((t) => isTabComplete(t.id)).length / totalTabs) * 100);

  const getCurrentTabLabel = (): string =>
    tabConfigs.find((t) => t.id === currentTab)?.label ?? '';

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
    isCurrentTabComplete: isTabComplete(currentTab),
    toggleTabComplete,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    getCurrentTabLabel,
  };
};

export default useVisualConditionTabs;
