
import React from 'react';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { EICTabValue } from '@/hooks/useEICTabs';
import { useIsMobile } from '@/hooks/use-mobile';
import EICInstallationDetails from './EICInstallationDetails';
import EICScheduleOfInspections from './EICScheduleOfInspections';
import EICScheduleOfTesting from './EICScheduleOfTesting';
import EICDeclarations from './EICDeclarations';
import EICTabNavigation from './EICTabNavigation';
import EICCertificateActions from './EICCertificateActions';
import EICObservationsSection from './EICObservationsSection';
import EICValidationPanel from './EICValidationPanel';
import { EICObservation } from '@/hooks/useEICObservations';
import { Home, Search, TestTube, FileText } from 'lucide-react';

interface EICFormTabsProps {
  currentTab: EICTabValue;
  onTabChange: (value: string) => void;
  canAccessTab: (tabId: EICTabValue) => boolean;
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
    onAutoCreateObservation: (inspectionItem: { id: string; item: string; clause: string }) => string;
    onNavigateToObservations: () => void;
    onSyncToInspectionItem?: (inspectionItemId: string, newOutcome: string) => void;
  };
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  canGenerateCertificate?: boolean;
}

const EICFormTabs: React.FC<EICFormTabsProps> = ({
  currentTab,
  onTabChange,
  canAccessTab,
  formData,
  onUpdate,
  tabNavigationProps,
  observationsProps,
  onGenerateCertificate,
  onSaveDraft,
  canGenerateCertificate = true
}) => {
  const isMobile = useIsMobile();
  
  const smartTabs: SmartTab[] = [
    {
      value: 'installation',
      label: 'Installation',
      icon: <Home className="h-4 w-4" />,
      content: (
        <div className="md:max-w-5xl mx-auto space-y-6">
          <EICInstallationDetails formData={formData} onUpdate={onUpdate} />
          <EICTabNavigation {...tabNavigationProps} />
        </div>
      )
    },
    {
      value: 'inspections',
      label: 'Inspections',
      icon: <Search className="h-4 w-4" />,
      content: (
        <div className="md:max-w-6xl mx-auto space-y-6">
          <EICScheduleOfInspections
            formData={formData}
            onUpdate={onUpdate}
            onAutoCreateObservation={observationsProps.onAutoCreateObservation}
            onNavigateToObservations={observationsProps.onNavigateToObservations}
          />
          <EICObservationsSection
            observations={observationsProps.observations}
            reportId={observationsProps.reportId}
            onAddObservation={observationsProps.onAddObservation}
            onUpdateObservation={observationsProps.onUpdateObservation}
            onRemoveObservation={observationsProps.onRemoveObservation}
            onSyncToInspectionItem={observationsProps.onSyncToInspectionItem}
            className="mt-6"
          />
          <EICTabNavigation {...tabNavigationProps} />
        </div>
      )
    },
    {
      value: 'testing',
      label: 'Testing',
      icon: <TestTube className="h-4 w-4" />,
      content: (
        <div className="w-full max-w-none space-y-6">
          <EICScheduleOfTesting formData={formData} onUpdate={onUpdate} />
          <EICTabNavigation {...tabNavigationProps} />
        </div>
      )
    },
    {
      value: 'declarations',
      label: 'Declarations',
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className="md:max-w-5xl mx-auto space-y-6">
          <EICDeclarations formData={formData} onUpdate={onUpdate} />
          <EICValidationPanel formData={formData} />
          <EICTabNavigation {...tabNavigationProps} />
          <EICCertificateActions
            formData={formData}
            reportId={observationsProps.reportId}
            onGenerateCertificate={onGenerateCertificate}
            onSaveDraft={onSaveDraft}
          />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-2 sm:space-y-4">
      <SmartTabs
        tabs={smartTabs}
        value={currentTab} 
        onValueChange={onTabChange}
        className="space-y-4"
        breakpoint={3} // Use dropdown when more than 3 tabs
      />
    </div>
  );
};

export default EICFormTabs;
