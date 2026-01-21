
import React, { useMemo } from 'react';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { useEICRTabs } from '@/hooks/useEICRTabs';
import { useIsMobile } from '@/hooks/use-mobile';
import EICRTabContent from './EICRTabContent';

interface EICRFormTabsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  onOpenBoardScan?: () => void;
  initialTab?: 'details' | 'inspection' | 'testing' | 'inspector' | 'certificate';
}

const EICRFormTabs = ({ formData, onUpdate, onOpenBoardScan, initialTab }: EICRFormTabsProps) => {
  const isMobile = useIsMobile();
  const {
    currentTab,
    setCurrentTab,
    canAccessTab,
    navigateNext,
    navigatePrevious,
    currentTabIndex,
    totalTabs,
    canNavigateNext,
    canNavigatePrevious,
    getProgressPercentage,
    isCurrentTabComplete,
    currentTabHasRequiredFields,
    toggleTabComplete,
    hasRequiredFields
  } = useEICRTabs(formData, initialTab);

  // Build completion status map
  const completedTabs = useMemo(() => {
    const completedSections = formData.completedSections || {};
    return {
      details: completedSections.details || hasRequiredFields('details'),
      inspection: completedSections.inspection || false,
      testing: completedSections.testing || (formData.scheduleOfTests?.length > 0),
      inspector: completedSections.inspector || hasRequiredFields('inspector'),
      certificate: completedSections.certificate || hasRequiredFields('certificate')
    };
  }, [formData.completedSections, formData.scheduleOfTests, hasRequiredFields]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value as any);
  };

  const handleToggleComplete = () => {
    toggleTabComplete(currentTab, onUpdate);
  };

  const tabContentProps = {
    formData,
    onUpdate,
    isMobile,
    currentTab,
    currentTabIndex,
    totalTabs,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    isCurrentTabComplete,
    currentTabHasRequiredFields,
    onToggleComplete: handleToggleComplete,
    onOpenBoardScan
  };

  const smartTabs: SmartTab[] = [
    {
      value: "details",
      label: "Details",
      shortLabel: "Details",
      content: <EICRTabContent tabValue="details" {...tabContentProps} />
    },
    {
      value: "inspection",
      label: "Inspection",
      shortLabel: "Inspect",
      content: <EICRTabContent tabValue="inspection" {...tabContentProps} />
    },
    {
      value: "testing",
      label: "Testing",
      shortLabel: "Tests",
      content: <EICRTabContent tabValue="testing" {...tabContentProps} />
    },
    {
      value: "inspector",
      label: "Inspector",
      shortLabel: "Inspector",
      content: <EICRTabContent tabValue="inspector" {...tabContentProps} />
    },
    {
      value: "certificate",
      label: "Certificate",
      shortLabel: "Cert",
      content: <EICRTabContent tabValue="certificate" {...tabContentProps} />
    }
  ];

  return (
    <SmartTabs
      tabs={smartTabs}
      value={currentTab}
      onValueChange={handleTabChange}
      className="w-full"
      completedTabs={completedTabs}
      showProgress={true}
    />
  );
};

export default EICRFormTabs;
