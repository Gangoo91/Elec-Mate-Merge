import React from 'react';
import { EICTabValue } from '@/hooks/useEICTabs';
import EICInstallationDetails from './EICInstallationDetails';
import EICScheduleOfInspections from './EICScheduleOfInspections';
import EICScheduleOfTesting from './EICScheduleOfTesting';
import EICDeclarations from './EICDeclarations';
import EICCertificateTab from './EICCertificateTab';
import EICTabNavigation from './EICTabNavigation';
import EICObservationsSection from './EICObservationsSection';
import EICValidationPanel from './EICValidationPanel';
import { EICObservation } from '@/hooks/useEICObservations';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface EICTabContentProps {
  tabValue: EICTabValue;
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
}

const EICTabContent: React.FC<EICTabContentProps> = ({
  tabValue,
  formData,
  onUpdate,
  tabNavigationProps,
  observationsProps,
  onGenerateCertificate,
  onSaveDraft,
  canGenerateCertificate = true,
}) => {
  const isMobile = useIsMobile();

  switch (tabValue) {
    case 'details':
      return (
        <div className="space-y-6 max-w-6xl mx-auto">
          <EICInstallationDetails formData={formData} onUpdate={onUpdate} />
          <EICTabNavigation {...tabNavigationProps} />
        </div>
      );
    case 'inspection':
      return (
        <div className="space-y-6 w-full">
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
      );
    case 'testing':
      return (
        <div className="w-full max-w-none space-y-6">
          <EICScheduleOfTesting formData={formData} onUpdate={onUpdate} />
          <EICTabNavigation {...tabNavigationProps} />
        </div>
      );
    case 'declarations':
      return (
        <div className="space-y-6 max-w-6xl mx-auto">
          <EICDeclarations formData={formData} onUpdate={onUpdate} />
          <EICTabNavigation {...tabNavigationProps} />
        </div>
      );
    case 'certificate':
      return (
        <div className="space-y-6 max-w-6xl mx-auto">
          <EICCertificateTab
            formData={formData}
            onUpdate={onUpdate}
            reportId={observationsProps.reportId}
            onGenerateCertificate={onGenerateCertificate}
            onSaveDraft={onSaveDraft}
            canGenerateCertificate={canGenerateCertificate}
          />
          <EICValidationPanel formData={formData} />
          <EICTabNavigation {...tabNavigationProps} showGenerate />
        </div>
      );
    default:
      return null;
  }
};

export default EICTabContent;
