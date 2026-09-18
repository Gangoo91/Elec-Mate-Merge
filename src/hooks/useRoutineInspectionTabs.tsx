import { useState, useEffect, useMemo } from 'react';
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

  /*
   * 🔴 THE THERMAL STEP IS NOT PART OF A LANDLORD VISIT.
   *
   * Thermography needs a camera almost nobody doing a rented two-bed owns, and
   * a survey of a domestic consumer unit under household load tells you close
   * to nothing. Left in, it costs a fifth of a phone's step rail and a tap past
   * an empty screen on every visit — and, worse, a step that is always complete
   * because it was never applicable quietly inflates the progress bar.
   *
   * So it is removed from the rail rather than hidden: four steps, a progress
   * percentage over four, and `navigateNext` that cannot land on it.
   */
  const steps = useMemo(
    () =>
      formData.visitType === 'landlord'
        ? tabConfigs.filter((t) => t.id !== 'thermal')
        : tabConfigs,
    [formData.visitType]
  );

  /*
   * ⚠️ Falls back to 0, never -1.
   *
   * Changing the visit type to landlord while standing ON the thermal step
   * leaves `currentTab` naming a step that is no longer in the rail.
   * `findIndex` then returns -1, `canNavigatePrevious` goes false and
   * `navigateNext` reads `steps[0]`, so the footer strands the user on a screen
   * with no way forward or back. Treating it as the first step keeps the form
   * navigable; the effect below then moves them somewhere real.
   */
  const rawIndex = steps.findIndex((t) => t.id === currentTab);
  const currentTabIndex = rawIndex === -1 ? 0 : rawIndex;
  const totalTabs = steps.length;

  useEffect(() => {
    if (rawIndex === -1) setCurrentTab(steps[0].id);
  }, [rawIndex, steps]);

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
    if (canNavigateNext) setCurrentTab(steps[currentTabIndex + 1].id);
  };
  const navigatePrevious = () => {
    if (canNavigatePrevious) setCurrentTab(steps[currentTabIndex - 1].id);
  };

  /* Over the steps ACTUALLY shown — otherwise a landlord visit tops out at 80%
     with a thermal step it never had. */
  const getProgressPercentage = (): number =>
    Math.round((steps.filter((t) => isTabComplete(t.id)).length / totalTabs) * 100);

  const getCurrentTabLabel = (): string =>
    steps.find((t) => t.id === currentTab)?.label ?? '';

  return {
    currentTab,
    setCurrentTab,
    tabs: steps,
    tabConfigs: steps,
    /** The steps actually on the rail, for the shell header and footer. */
    steps,
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
