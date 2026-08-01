import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { EmergencyLightingFormData } from '@/types/emergency-lighting';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { createInvoiceFromCertificate } from '@/utils/certificateToQuote';
import { formatEmergencyLightingJson } from '@/utils/emergencyLightingJsonFormatter';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import {
  mergeEmergencyLightingBranding,
  resolveEmergencyLightingSchemeLogo,
} from '@/utils/emergencyLightingBranding';
import { WhatsAppShareButton } from '@/components/ui/WhatsAppShareButton';
import type { ShareableDocumentType } from '@/hooks/useWhatsAppShare';
import CertShellFooter, {
  certFooterNeutralButton,
} from '@/components/inspection/shared/CertShellFooter';

interface EmergencyLightingTabNavigationProps {
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
  reportId?: string | null;
  formData?: EmergencyLightingFormData & { pdfUrl?: string };
  onUpdate?: (
    field: string,
    value: EmergencyLightingFormData[keyof EmergencyLightingFormData]
  ) => void;
  whatsApp?: {
    type: string;
    id: string;
    recipientPhone: string;
    recipientName: string;
    documentLabel: string;
  };
}

const NEXT_LABELS = ['Continue to Luminaires', 'Continue to Testing', 'Continue to Sign off'];

const EmergencyLightingTabNavigation: React.FC<EmergencyLightingTabNavigationProps> = ({
  currentTabIndex,
  totalTabs,
  canNavigateNext,
  canNavigatePrevious,
  navigateNext,
  navigatePrevious,
  onGenerateCertificate,
  canGenerateCertificate = true,
  reportId,
  formData,
  onUpdate,
  whatsApp,
}) => {
  const navigate = useNavigate();
  const { loadCompanyBranding, hasSavedCompanyBranding } = useEmergencyLightingSmartForm();
  const isLastTab = currentTabIndex === totalTabs - 1;

  // Email dialog state
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleEmailCertificate = () => {
    if (!reportId) {
      toast.error('Please save the certificate first.');
      return;
    }
    if (formData?.clientEmail) setEmailRecipient(formData.clientEmail);
    setShowEmailDialog(true);
  };

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast.error('Enter a valid email.');
      return;
    }
    setIsSendingEmail(true);
    try {
      // Send the formatted payload so the function can generate + attach the
      // PDF even when the user emails before ever tapping Generate.
      let formattedData: Record<string, unknown> | undefined;
      try {
        if (formData) {
          const certificateNumber = formData.certificateNumber || `EL-${Date.now()}`;
          if (!formData.certificateNumber) {
            // Persist the minted number so the emailed PDF and a later
            // Generate share the same certificate number.
            onUpdate?.('certificateNumber', certificateNumber);
          }
          let dataForEmail: Partial<EmergencyLightingFormData> = {
            ...formData,
            certificateNumber,
          };
          // Same branding merge + scheme-logo resolution as the Generate
          // path, so a pre-Generate email is not an unbranded PDF.
          if (hasSavedCompanyBranding) {
            dataForEmail = mergeEmergencyLightingBranding(dataForEmail, loadCompanyBranding());
          }
          dataForEmail = await resolveEmergencyLightingSchemeLogo(dataForEmail);
          formattedData = formatEmergencyLightingJson(dataForEmail) as unknown as Record<
            string,
            unknown
          >;
        }
      } catch {
        formattedData = undefined; // fall back to server-side pdf_payload
      }
      const { data: result, error: fnError } = await supabase.functions.invoke(
        'send-certificate-resend',
        { body: { reportId, recipientEmail: emailRecipient, formattedData } }
      );
      if (fnError) {
        let errorMessage = fnError.message;
        try {
          const parsed = JSON.parse(fnError.message);
          errorMessage = parsed.error || parsed.message || fnError.message;
        } catch {
          /* keep */
        }
        if (fnError.context?.body) {
          try {
            const bodyError =
              typeof fnError.context.body === 'string'
                ? JSON.parse(fnError.context.body)
                : fnError.context.body;
            if (bodyError.error) errorMessage = bodyError.error;
          } catch {
            /* keep */
          }
        }
        throw new Error(errorMessage);
      }
      if (!result?.success) throw new Error(result?.error || 'Failed to send');
      toast.success(
        result?.pdfAttached
          ? `Certificate emailed to ${emailRecipient} with the PDF attached`
          : `Certificate emailed to ${emailRecipient}`
      );
      setShowEmailDialog(false);
      setEmailRecipient('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleCreateInvoice = () => {
    if (!formData) return;
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientTelephone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.premisesAddress || '',
      certificateType: 'Emergency Lighting',
      certificateReference: formData.certificateNumber || '',
      reportId: reportId || undefined,
      pdfUrl: formData.pdfUrl || undefined,
    });
    navigate(url);
  };

  return (
    <>
      <CertShellFooter
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
        lastStepActions={
          <>
            <button onClick={handleEmailCertificate} className={certFooterNeutralButton}>
              Email
            </button>
            {whatsApp && (
              <WhatsAppShareButton
                type={whatsApp.type as ShareableDocumentType}
                id={whatsApp.id}
                recipientPhone={whatsApp.recipientPhone}
                recipientName={whatsApp.recipientName}
                documentLabel={whatsApp.documentLabel}
                disabled={!reportId}
                className="h-12 flex-1 rounded-xl px-2 text-[14px] font-medium lg:flex-none lg:px-6"
              />
            )}
            <button onClick={handleCreateInvoice} className={certFooterNeutralButton}>
              Invoice
            </button>
          </>
        }
      />

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.1] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-base font-bold">Email certificate</DialogTitle>
            <DialogDescription className="text-white/85 text-sm">
              The certificate will be generated and sent as a PDF attachment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div>
              <label htmlFor="el-email" className="mb-1 block text-[12px] font-medium text-white">
                Recipient email
              </label>
              <Input
                id="el-email"
                type="email"
                placeholder="client@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
                className="input-underline h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none touch-manipulation"
              />
            </div>
            {formData?.clientEmail && emailRecipient !== formData.clientEmail && (
              <button
                onClick={() => setEmailRecipient(formData?.clientEmail || '')}
                className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-[13px] font-medium hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] transition-all"
              >
                Use client email: {formData.clientEmail}
              </button>
            )}
          </div>
          {/* Plain column footer — DialogFooter's sm:space-x-2 skews stacked
              buttons sideways, so the two never sat level. */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
              className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-all hover:bg-elec-yellow/90 active:scale-[0.98] disabled:bg-elec-yellow disabled:text-black disabled:opacity-100 touch-manipulation"
            >
              {isSendingEmail ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
                  Sending…
                </>
              ) : (
                'Send certificate'
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
              className="h-12 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] font-medium text-white transition-all hover:bg-white/[0.08] hover:text-white active:scale-[0.98] disabled:opacity-40 touch-manipulation"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyLightingTabNavigation;
