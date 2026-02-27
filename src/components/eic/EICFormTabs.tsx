import React from 'react';
import { EICTabValue } from '@/hooks/useEICTabs';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import EICTabContent from './EICTabContent';
import { EICObservation } from '@/hooks/useEICObservations';

interface EICFormTabsProps {
  currentTab: EICTabValue;
  onTabChange: (value: string) => void;
  canAccessTab: (tabId: EICTabValue) => boolean;
  isTabComplete: (tabId: EICTabValue) => boolean;
  formData: any;
  onUpdate: (field: string, value: any) => void;
  tabNavigationProps: {
    currentTab: EICTabValue;
    currentTabIndex: number;
    totalTabs: number;
    canNavigateNext: boolean;
    canNavigatePrevious: boolean;
    navigateNext: () => void;
    navigatePrevious: () => void;
    getProgressPercentage: () => number;
    isCurrentTabComplete: boolean;
    currentTabHasRequiredFields: boolean;
    onToggleComplete: () => void;
    onGenerateCertificate?: () => void;
    canGenerateCertificate?: boolean;
  };
  observationsProps: {
    observations: EICObservation[];
    reportId: string;
    onAddObservation: () => string;
    onUpdateObservation: (id: string, field: keyof EICObservation, value: any) => void;
    onRemoveObservation: (id: string) => void;
    onAutoCreateObservation: (inspectionItem: {
      id: string;
      item: string;
      clause: string;
    }) => string;
    onNavigateToObservations: () => void;
    onSyncToInspectionItem?: (inspectionItemId: string, newOutcome: string) => void;
  };
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  canGenerateCertificate?: boolean;
  onSyncOnTabChange?: () => void;
}

const EICFormTabs: React.FC<EICFormTabsProps> = ({
  currentTab,
  onTabChange,
  canAccessTab,
  isTabComplete,
  formData,
  onUpdate,
  tabNavigationProps,
  observationsProps,
  onGenerateCertificate,
  onSaveDraft,
  canGenerateCertificate = true,
  onSyncOnTabChange,
}) => {
  const handleTabChange = (value: string) => {
    if (onSyncOnTabChange) {
      onSyncOnTabChange();
    }
    onTabChange(value);
  };

  const contentProps = {
    formData,
    onUpdate,
    tabNavigationProps,
    observationsProps,
    onGenerateCertificate,
    onSaveDraft,
    canGenerateCertificate,
  };

  const smartTabs: SmartTab[] = [
    {
      value: 'details',
      label: 'Installation Details',
      shortLabel: 'Details',
      content: <EICTabContent tabValue="details" {...contentProps} />,
    },
    {
      value: 'inspection',
      label: 'Schedule of Inspections',
      shortLabel: 'Inspection',
      content: <EICTabContent tabValue="inspection" {...contentProps} />,
    },
    {
      value: 'testing',
      label: 'Schedule of Testing',
      shortLabel: 'Testing',
      content: <EICTabContent tabValue="testing" {...contentProps} />,
    },
    {
      value: 'declarations',
      label: 'Declarations',
      shortLabel: 'Declarations',
      content: <EICTabContent tabValue="declarations" {...contentProps} />,
    },
    {
      value: 'certificate',
      label: 'Certificate',
      shortLabel: 'Certificate',
      content: <EICTabContent tabValue="certificate" {...contentProps} />,
    },
  ];

  const completedTabs: Record<string, boolean> = {
    details: isTabComplete('details'),
    inspection: isTabComplete('inspection'),
    testing: isTabComplete('testing'),
    declarations: isTabComplete('declarations'),
    certificate: isTabComplete('certificate'),
  };

  return (
    <SmartTabs
      tabs={smartTabs}
      value={currentTab}
      onValueChange={handleTabChange}
      completedTabs={completedTabs}
      showProgress
    />
  );
};

export default EICFormTabs;
