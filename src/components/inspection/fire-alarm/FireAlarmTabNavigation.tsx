/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import CertShellFooter, {
  certFooterNeutralButton,
} from '@/components/inspection/shared/CertShellFooter';

interface FireAlarmTabNavigationProps {
  currentTab: string;
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
  onCreateInvoice?: () => void;
  onOpenEmailDialog?: () => void;
  canEmail?: boolean;
  whatsApp?: any;
  /** Optional per-step Continue labels, e.g. ['Continue to System', …]. */
  nextLabels?: string[];
}

/**
 * Fire alarm certificate footer — thin wrapper over the shared CertShellFooter
 * so all five fire alarm certs (install, G1, G3, G6, G7) get the same fixed
 * Back / Continue bar, with Email / Invoice as neutral last-step actions.
 */
const FireAlarmTabNavigation: React.FC<FireAlarmTabNavigationProps> = ({
  currentTabIndex,
  totalTabs,
  canNavigateNext,
  canNavigatePrevious,
  navigateNext,
  navigatePrevious,
  onGenerateCertificate,
  canGenerateCertificate = true,
  onCreateInvoice,
  onOpenEmailDialog,
  canEmail = false,
  nextLabels,
}) => {
  const isLastTab = currentTabIndex === totalTabs - 1;

  const lastStepActions =
    onOpenEmailDialog || onCreateInvoice ? (
      <>
        {onOpenEmailDialog && (
          <button
            type="button"
            onClick={onOpenEmailDialog}
            disabled={!canEmail}
            className={certFooterNeutralButton}
          >
            Email
          </button>
        )}
        {onCreateInvoice && (
          <button type="button" onClick={onCreateInvoice} className={certFooterNeutralButton}>
            Invoice
          </button>
        )}
      </>
    ) : undefined;

  return (
    <CertShellFooter
      currentIndex={currentTabIndex}
      totalSteps={totalTabs}
      canPrevious={canNavigatePrevious}
      canNext={canNavigateNext}
      onPrevious={navigatePrevious}
      onNext={navigateNext}
      nextLabels={nextLabels ?? []}
      isLastStep={isLastTab}
      onGenerate={onGenerateCertificate}
      canGenerate={canGenerateCertificate}
      generateLabel="Generate certificate"
      lastStepActions={lastStepActions}
    />
  );
};

export default FireAlarmTabNavigation;
