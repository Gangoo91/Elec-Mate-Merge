import React from 'react';
import CertShellFooter, {
  certFooterNeutralButton,
} from '@/components/inspection/shared/CertShellFooter';
import { useWhatsAppShare, type ShareableDocumentType } from '@/hooks/useWhatsAppShare';

interface PATTestingTabNavigationProps {
  /** ELE-1477 — live form data, for the footer's Preview sheet. */
  previewData?: Record<string, unknown>;
  /** Saved report id, for the footer's View PDF. */
  previewReportId?: string | null;
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
  whatsApp?: {
    type: string;
    id: string;
    recipientPhone: string;
    recipientName: string;
    documentLabel: string;
  };
}

const NEXT_LABELS = ['Continue to Items', 'Continue to Sign off'];

const PATTestingTabNavigation: React.FC<PATTestingTabNavigationProps> = ({
  previewData,
  previewReportId,
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
  whatsApp,
}) => {
  const isLastTab = currentTabIndex === totalTabs - 1;
  const { shareViaWhatsApp, isGeneratingLink } = useWhatsAppShare();

  const canShareWhatsApp = !!whatsApp && whatsApp.id !== 'new';

  const handleWhatsAppShare = () => {
    if (!whatsApp) return;
    shareViaWhatsApp({
      type: whatsApp.type as ShareableDocumentType,
      id: whatsApp.id,
      recipientPhone: whatsApp.recipientPhone || undefined,
      recipientName: whatsApp.recipientName || undefined,
      documentLabel: whatsApp.documentLabel,
    });
  };

  const hasLastStepActions = !!(onOpenEmailDialog || onCreateInvoice || whatsApp);

  return (
    <CertShellFooter
      previewReportType="pat-testing"
      previewData={previewData}
      previewReportId={previewReportId}
      currentIndex={currentTabIndex}
      totalSteps={totalTabs}
      canPrevious={canNavigatePrevious}
      canNext={canNavigateNext}
      onPrevious={navigatePrevious}
      onNext={navigateNext}
      nextLabels={NEXT_LABELS}
      isLastStep={isLastTab}
      onGenerate={onGenerateCertificate}
      canGenerate={canGenerateCertificate}
      generateLabel="Generate certificate"
      lastStepActions={
        hasLastStepActions ? (
          <>
            {onOpenEmailDialog && (
              <button onClick={onOpenEmailDialog} className={certFooterNeutralButton}>
                Email
              </button>
            )}
            {whatsApp && (
              <button
                onClick={handleWhatsAppShare}
                disabled={!canShareWhatsApp || isGeneratingLink}
                className={certFooterNeutralButton}
              >
                WhatsApp
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
  );
};

export default PATTestingTabNavigation;
