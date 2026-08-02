import React from 'react';
import { EICRTabValue } from '@/hooks/useEICRTabs';
import EICRDetails from './EICRDetails';
import EICRInspectionChecklist from './EICRInspectionChecklist';
import EICRScheduleOfTests from './EICRScheduleOfTests';
import EICRSummary from './EICRSummary';
import EICRInspectorDetails from './EICRInspectorDetails';

interface EICRTabContentProps {
  tabValue: EICRTabValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
  onOpenBoardScan?: () => void;
  /** Shell-footer Generate/Email/Invoice → Issue-tab handlers (MW/EIC
   * pattern). EICRSummary registers them here on mount. */
  actionsRef?: React.MutableRefObject<{
    generate: () => void;
    email: () => void;
    invoice: () => void;
  } | null>;
}

/** Per-step content for the v3 EICR shell. Step navigation lives in the
 * shared CertShellFooter — no per-tab nav renders here. */
const EICRTabContent = ({
  tabValue,
  formData,
  onUpdate,
  onOpenBoardScan,
  actionsRef,
}: EICRTabContentProps) => {
  switch (tabValue) {
    case 'details':
      return <EICRDetails formData={formData} onUpdate={onUpdate} />;
    case 'inspection':
      return <EICRInspectionChecklist formData={formData} onUpdate={onUpdate} />;
    case 'testing':
      return (
        <div className="w-full max-w-none">
          <EICRScheduleOfTests
            formData={formData}
            onUpdate={onUpdate}
            onOpenBoardScan={onOpenBoardScan}
          />
        </div>
      );
    case 'inspector':
      return <EICRInspectorDetails formData={formData} onUpdate={onUpdate} />;
    case 'certificate':
      return <EICRSummary formData={formData} onUpdate={onUpdate} actionsRef={actionsRef} />;
    default:
      return null;
  }
};

export default EICRTabContent;
