import React from 'react';
import { EICTabValue } from '@/hooks/useEICTabs';
import EICInstallationDetails from './EICInstallationDetails';
import EICScheduleOfInspections from './EICScheduleOfInspections';
import EICScheduleOfTesting from './EICScheduleOfTesting';
import EICDeclarations from './EICDeclarations';
import EICCertificateTab from './EICCertificateTab';
import EICObservationsSection from './EICObservationsSection';
import { EICObservation } from '@/hooks/useEICObservations';

interface EICTabContentProps {
  tabValue: EICTabValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
  observationsProps: {
    observations: EICObservation[];
    reportId: string;
    onAddObservation: () => string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdateObservation: (id: string, field: keyof EICObservation, value: any) => void;
    onRemoveObservation: (id: string) => void;
    // Matches the real call sites (EICInspectionChecklistCard) and the
    // useEICObservations signature — the old {id,item,clause} shape was wrong.
    onAutoCreateObservation: (inspectionItem: {
      id: string;
      item: string;
      itemNumber?: string;
      clause?: string;
      notes?: string;
      defectCode?: 'limitation' | 'unsatisfactory' | 'C1' | 'C2' | 'C3';
    }) => string;
    onNavigateToObservations: () => void;
    onSyncToInspectionItem?: (inspectionItemId: string, newOutcome: string) => void;
  };
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  canGenerateCertificate?: boolean;
  /** Shell-footer Generate/Email/Invoice → in-tab PDF flow (MW pattern). The
   * Issue tab's actions register their handlers here. */
  actionsRef?: React.MutableRefObject<{
    generate: () => void;
    email: () => void;
    invoice: () => void;
  } | null>;
}

/** Per-step content for the v3 EIC shell. Step navigation lives in the shared
 * CertShellFooter — no per-tab nav renders here. */
const EICTabContent: React.FC<EICTabContentProps> = ({
  tabValue,
  formData,
  onUpdate,
  observationsProps,
  onGenerateCertificate,
  onSaveDraft,
  canGenerateCertificate = true,
  actionsRef,
}) => {
  switch (tabValue) {
    case 'details':
      return <EICInstallationDetails formData={formData} onUpdate={onUpdate} />;
    case 'inspection':
      return (
        <div className="space-y-4 w-full">
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
        </div>
      );
    case 'testing':
      return (
        <div className="w-full max-w-none">
          <EICScheduleOfTesting formData={formData} onUpdate={onUpdate} />
        </div>
      );
    case 'declarations':
      return <EICDeclarations formData={formData} onUpdate={onUpdate} />;
    case 'certificate': {
      // actionsRef travels via a spread variable so this file stays compatible
      // whether or not EICCertificateTab has grown the receiving prop yet
      // (added in the sign-off fix round; ignored harmlessly until then).
      const forwarded = actionsRef ? { actionsRef } : {};
      return (
        <EICCertificateTab
          formData={formData}
          onUpdate={onUpdate}
          reportId={observationsProps.reportId}
          onGenerateCertificate={onGenerateCertificate}
          onSaveDraft={onSaveDraft}
          canGenerateCertificate={canGenerateCertificate}
          {...forwarded}
        />
      );
    }
    default:
      return null;
  }
};

export default EICTabContent;
