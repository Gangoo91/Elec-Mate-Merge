import { useState } from 'react';
import type { RoutineInspectionFormData } from '@/types/routine-inspection';

export type RoutineInspectionTabValue =
  | 'client'
  | 'visit'
  | 'inspection'
  | 'thermal'
  | 'declaration';

interface TabConfig {
  id: RoutineInspectionTabValue;
  label: string;
  shortLabel: string;
  requiredFields: (keyof RoutineInspectionFormData)[];
}

/**
 * Five steps, in the order the visit actually happens: who and where, what the
 * visit covered, the maintenance walk round, the thermal sweep, then sign.
 *
 * Short labels are what show on a phone — the step rail is horizontal and
 * anything past about eight characters truncates.
 */
const tabConfigs: TabConfig[] = [
  {
    id: 'client',
    label: 'Client and site',
    shortLabel: 'Client',
    requiredFields: ['clientName', 'installationAddress'],
  },
  {
    id: 'visit',
    label: 'The visit',
    shortLabel: 'Visit',
    requiredFields: ['purpose', 'extent'],
  },
  {
    id: 'inspection',
    label: 'Maintenance inspection',
    shortLabel: 'Inspect',
    requiredFields: [],
  },
  {
    id: 'thermal',
    label: 'Thermal survey',
    shortLabel: 'Thermal',
    requiredFields: [],
  },
  {
    id: 'declaration',
    label: 'Summary and declaration',
    shortLabel: 'Sign off',
    requiredFields: ['inspectorName', 'inspectorSignature'],
  },
];

export const useRoutineInspectionTabs = (formData: RoutineInspectionFormData) => {
  const [currentTab, setCurrentTab] = useState<RoutineInspectionTabValue>('client');

  const currentTabIndex = tabConfigs.findIndex((t) => t.id === currentTab);
  const totalTabs = tabConfigs.length;

  const hasRequiredFields = (tabId: RoutineInspectionTabValue): boolean => {
    const tab = tabConfigs.find((t) => t.id === tabId);
    if (!tab) return false;
    return tab.requiredFields.every((f) => String(formData[f] ?? '').trim() !== '');
  };

  /** Every step is reachable — an electrician on site knows their own order. */
  const canAccessTab = (): boolean => true;

  const isTabComplete = (tabId: RoutineInspectionTabValue): boolean => {
    const manual = formData.completedSections || {};
    if (manual[tabId]) return true;
    switch (tabId) {
      case 'client':
        return !!(formData.clientName && formData.installationAddress);
      case 'visit':
        return !!(formData.purpose && formData.extent);
      /*
       * Complete once every item has an answer. "Some answered" would let a
       * half-finished visit look done, and on a maintenance report the schedule
       * IS the work — there is nothing else evidencing that it happened.
       */
      case 'inspection':
        return (
          (formData.inspectionItems ?? []).length > 0 &&
          (formData.inspectionItems ?? []).every((i) => i.outcome !== '')
        );
      /*
       * A survey that was not carried out is a complete answer, not a blank —
       * most visits will not include one, and leaving the step permanently
       * amber would make the progress bar useless for the common case.
       *
       * When one WAS carried out, the bar is the two facts without which the
       * result cannot be interpreted at all: the mode of survey, and the load
       * it was carried out under (§8.1).
       */
      /*
       * ⚠️ `loadAtSurvey` is read defensively. It comes back out of a JSON
       * column, so a stored `null` overwrites the default and `.trim()` on it
       * throws — during render, taking the whole report down with it.
       */
      case 'thermal':
        return formData.thermalSurveyCarriedOut
          ? !!(formData.surveyMode && String(formData.loadAtSurvey ?? '').trim())
          : true;
      case 'declaration':
        return !!(formData.inspectorName && formData.inspectorSignature);
      default:
        return false;
    }
  };

  const toggleTabComplete = (
    tabId: RoutineInspectionTabValue,
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

export default useRoutineInspectionTabs;
