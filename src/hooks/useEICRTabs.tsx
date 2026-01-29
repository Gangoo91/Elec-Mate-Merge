import { useState, useEffect } from 'react';

export type EICRTabValue = 'details' | 'inspection' | 'testing' | 'inspector' | 'certificate';

interface TabConfig {
  id: EICRTabValue;
  label: string;
  requiredFields: string[];
}

const tabConfigs: TabConfig[] = [
  {
    id: 'details',
    label: 'Details',
    requiredFields: ['clientName', 'installationAddress', 'inspectionDate', 'phases', 'supplyVoltage', 'earthingArrangement', 'mainProtectiveDevice']
  },
  {
    id: 'inspection',
    label: 'Inspection',
    requiredFields: []
  },
  {
    id: 'testing',
    label: 'Testing',
    requiredFields: []
  },
  {
    id: 'inspector',
    label: 'Inspector',
    requiredFields: ['inspectorName', 'inspectorQualifications']
  },
  {
    id: 'certificate',
    label: 'Certificate',
    requiredFields: ['overallAssessment', 'satisfactoryForContinuedUse']
  }
];

interface UseEICRTabsOptions {
  initialTab?: EICRTabValue;
  controlledTab?: EICRTabValue;
  onTabChange?: (tab: string) => void;
}

export const useEICRTabs = (formData: any, initialTabOrOptions?: EICRTabValue | UseEICRTabsOptions) => {
  // Handle both old signature (initialTab) and new signature (options object)
  const options: UseEICRTabsOptions = typeof initialTabOrOptions === 'object'
    ? initialTabOrOptions
    : { initialTab: initialTabOrOptions };

  const { initialTab, controlledTab, onTabChange } = options;

  // Use initialTab if provided, otherwise default to 'details'
  const [internalTab, setInternalTab] = useState<EICRTabValue>(initialTab || 'details');

  // Sync internal state with controlled value when it changes
  useEffect(() => {
    if (controlledTab && controlledTab !== internalTab) {
      setInternalTab(controlledTab);
    }
  }, [controlledTab]);

  // Use controlled value if provided, otherwise use internal state
  const currentTab = controlledTab || internalTab;

  // Custom setter that calls both internal setState and external callback
  const setCurrentTab = (tab: EICRTabValue) => {
    setInternalTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const currentTabIndex = tabConfigs.findIndex(tab => tab.id === currentTab);
  const totalTabs = tabConfigs.length;

  // Check if required fields are filled for a tab
  const hasRequiredFields = (tabId: EICRTabValue): boolean => {
    const tab = tabConfigs.find(t => t.id === tabId);
    if (!tab) return false;

    return tab.requiredFields.every(field => {
      const value = formData[field];
      return value && value.toString().trim() !== '';
    });
  };

  // Allow access to all tabs - remove sequential restriction
  const canAccessTab = (tabId: EICRTabValue): boolean => {
    return true; // All tabs are now accessible
  };

  // Get tab completion status
  const getTabStatus = (tabId: EICRTabValue): 'complete' | 'incomplete' | 'disabled' => {
    return hasRequiredFields(tabId) ? 'complete' : 'incomplete';
  };

  // Check if a tab is manually marked as complete
  const isTabComplete = (tabId: EICRTabValue): boolean => {
    const completedSections = formData.completedSections || {};
    return completedSections[tabId] === true;
  };

  // Mark a tab as complete or incomplete
  const toggleTabComplete = (tabId: EICRTabValue, onUpdate: (field: string, value: any) => void): void => {
    const completedSections = formData.completedSections || {};
    const newCompletedSections = {
      ...completedSections,
      [tabId]: !completedSections[tabId]
    };
    onUpdate('completedSections', newCompletedSections);
  };

  const canNavigateNext = (): boolean => {
    return currentTabIndex < totalTabs - 1;
  };

  const canNavigatePrevious = (): boolean => {
    return currentTabIndex > 0;
  };

  const navigateNext = (): void => {
    if (canNavigateNext()) {
      const nextTabId = tabConfigs[currentTabIndex + 1].id;
      setCurrentTab(nextTabId);
    }
  };

  const navigatePrevious = (): void => {
    if (canNavigatePrevious()) {
      const previousTabId = tabConfigs[currentTabIndex - 1].id;
      setCurrentTab(previousTabId);
    }
  };

  // Calculate overall progress based on completed tabs
  const getProgressPercentage = (): number => {
    const completedCount = tabConfigs.filter(tab => isTabComplete(tab.id)).length;
    return Math.round((completedCount / totalTabs) * 100);
  };

  // Get progress for current tab position (for header display)
  const getCurrentTabProgress = (): number => {
    return Math.round(((currentTabIndex + 1) / totalTabs) * 100);
  };

  const isCurrentTabComplete = (): boolean => {
    return isTabComplete(currentTab);
  };

  const currentTabHasRequiredFields = (): boolean => {
    return hasRequiredFields(currentTab);
  };

  return {
    currentTab,
    setCurrentTab,
    tabConfigs,
    currentTabIndex,
    totalTabs,
    canAccessTab,
    getTabStatus,
    isTabComplete,
    toggleTabComplete,
    hasRequiredFields,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    getCurrentTabProgress,
    isCurrentTabComplete,
    currentTabHasRequiredFields
  };
};
