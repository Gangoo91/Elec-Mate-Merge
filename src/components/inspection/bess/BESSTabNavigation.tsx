import { useState } from 'react';
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
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { createInvoiceFromCertificate } from '@/utils/certificateToQuote';
import { formatBESSJson, fetchBESSReportPhotos } from '@/utils/bessJsonFormatter';
import CertShellFooter, {
  certFooterNeutralButton,
} from '@/components/inspection/shared/CertShellFooter';

interface Props {
  currentTabIndex: number;
  totalTabs: number;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isCurrentTabComplete: boolean;
  progress: number;
  isLastTab: boolean;
  onGenerate?: () => void;
  isGenerating?: boolean;
  reportId?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData?: any;
}

const NEXT_LABELS = [
  'Continue to Design',
  'Continue to Electrical',
  'Continue to Testing',
  'Continue to Sign off',
];

export default function BESSTabNavigation({
  currentTabIndex, totalTabs, canNavigateNext, canNavigatePrevious,
  onNext, onPrevious, isLastTab,
  onGenerate, isGenerating,
  reportId, formData,
}: Props) {
  // Email dialog state
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const navigate = useNavigate();

  const handleEmailCertificate = () => {
    if (!reportId) {
      toast.error('Please save the certificate first before emailing.');
      return;
    }
    if (formData?.clientEmail) setEmailRecipient(formData.clientEmail);
    setShowEmailDialog(true);
  };

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setIsSendingEmail(true);
    try {
      // Send the formatted payload so the function can generate + attach the
      // PDF even when the user emails before ever tapping Generate. Photo
      // evidence lives in inspection_photos — inject it so it reaches the PDF.
      let formattedData: Record<string, unknown> | undefined;
      try {
        if (formData) {
          const photos = reportId ? await fetchBESSReportPhotos(reportId) : [];
          formattedData = formatBESSJson({
            ...formData,
            photos,
            certificateNumber:
              formData.certificateNumber || `BESS-${Date.now().toString(36).toUpperCase()}`,
          });
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
      toast.error(error instanceof Error ? error.message : 'Failed to send certificate email.');
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
      installationAddress: formData.installationAddress || '',
      certificateType: 'BESS',
      certificateReference: formData.certificateNumber || '',
      reportId: reportId || undefined,
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
        onPrevious={onPrevious}
        onNext={onNext}
        nextLabels={NEXT_LABELS}
        isLastStep={isLastTab}
        onGenerate={onGenerate}
        canGenerate={!isGenerating}
        generateLabel={isGenerating ? 'Generating…' : 'Generate certificate'}
        lastStepActions={
          <>
            <button
              onClick={handleEmailCertificate}
              disabled={!reportId}
              className={certFooterNeutralButton}
            >
              Email
            </button>
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
              Enter the recipient's email address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div>
              <label htmlFor="bess-email" className="mb-1 block text-[12px] font-medium text-white">
                Recipient email
              </label>
              <Input
                id="bess-email"
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
                onClick={() => setEmailRecipient(formData.clientEmail)}
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
}
