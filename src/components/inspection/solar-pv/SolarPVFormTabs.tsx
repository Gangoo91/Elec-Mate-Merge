import React, { useRef } from 'react';
import { SolarPVTabValue } from '@/hooks/useSolarPVTabs';
import SolarPVInstallationDetails from './SolarPVInstallationDetails';
import SolarPVSystemDesign from './SolarPVSystemDesign';
import SolarPVGridConnection from './SolarPVGridConnection';
import SolarPVTestSchedule from './SolarPVTestSchedule';
import SolarPVDeclarations from './SolarPVDeclarations';
import CertShellFooter, {
  certFooterNeutralButton,
} from '@/components/inspection/shared/CertShellFooter';
import { SolarPVFormData } from '@/types/solar-pv';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface SolarPVFormTabsProps {
  currentTab: SolarPVTabValue;
  onTabChange: (value: string) => void;
  canAccessTab: (tabId: SolarPVTabValue) => boolean;
  formData: SolarPVFormData;
  onUpdate: (field: string, value: any) => void;
  tabNavigationProps: {
    currentTab: SolarPVTabValue;
    currentTabIndex: number;
    totalTabs: number;
    canNavigateNext: boolean;
    canNavigatePrevious: boolean;
    navigateNext: () => void;
    navigatePrevious: () => void;
    getProgressPercentage: () => number;
    isCurrentTabComplete: boolean;
    onGenerateCertificate?: () => void;
    canGenerateCertificate?: boolean;
    whatsApp?: {
      type: string;
      id: string;
      recipientPhone: string;
      recipientName: string;
      documentLabel: string;
    };
  };
  onGenerateCertificate: () => void;
  onCreateInvoice?: () => void;
  onEmailCertificate?: () => void;
  canEmail?: boolean;
  /** Saved report id from the page — kept current after autosave creates the
      report (useParams still says 'new' until a reload). */
  reportId?: string | null;
  onSaveDraft: () => void;
  canGenerateCertificate?: boolean;
  completedTabs?: Record<string, boolean>;
}

const TAB_ORDER: SolarPVTabValue[] = ['installation', 'system', 'grid', 'testing', 'signoff'];

const NEXT_LABELS = [
  'Continue to System',
  'Continue to Grid',
  'Continue to Testing',
  'Continue to Sign off',
];

const SolarPVFormTabs: React.FC<SolarPVFormTabsProps> = ({
  currentTab,
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  onCreateInvoice,
  onEmailCertificate,
  canEmail = false,
  reportId,
  canGenerateCertificate = true,
}) => {
  // Track direction so the step slide matches travel (forward vs back).
  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const currentIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const content: Record<SolarPVTabValue, React.ReactNode> = {
    installation: <SolarPVInstallationDetails formData={formData} onUpdate={onUpdate} />,
    system: <SolarPVSystemDesign formData={formData} onUpdate={onUpdate} />,
    grid: <SolarPVGridConnection formData={formData} onUpdate={onUpdate} />,
    testing: <SolarPVTestSchedule formData={formData} onUpdate={onUpdate} />,
    signoff: <SolarPVDeclarations formData={formData} onUpdate={onUpdate} reportId={reportId} />,
  };

  const isLast = currentTab === 'signoff';

  return (
    <>
      <div
        key={currentTab}
        className={
          isBack ? 'motion-safe:animate-mw-step-back' : 'motion-safe:animate-mw-step-in'
        }
      >
        {content[currentTab]}
      </div>
      <CertShellFooter
        currentIndex={tabNavigationProps.currentTabIndex}
        totalSteps={tabNavigationProps.totalTabs}
        canPrevious={tabNavigationProps.canNavigatePrevious}
        canNext={tabNavigationProps.canNavigateNext}
        onPrevious={tabNavigationProps.navigatePrevious}
        onNext={tabNavigationProps.navigateNext}
        nextLabels={NEXT_LABELS}
        isLastStep={isLast}
        onGenerate={onGenerateCertificate}
        canGenerate={canGenerateCertificate}
        generateLabel="Generate certificate"
        lastStepActions={
          onEmailCertificate || onCreateInvoice ? (
            <>
              {onEmailCertificate && (
                <button
                  onClick={onEmailCertificate}
                  disabled={!canEmail}
                  className={certFooterNeutralButton}
                >
                  Email
                </button>
              )}
              {onCreateInvoice && (
                <button onClick={onCreateInvoice} className={certFooterNeutralButton}>
                  Invoice
                </button>
              )}
            </>
          ) : undefined
        }
      />
    </>
  );
};

export default SolarPVFormTabs;
