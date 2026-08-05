import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { createInvoiceFromCertificate } from '@/utils/certificateToQuote';
import { formatEVChargingJson } from '@/utils/evChargingJsonFormatter';
import { cn } from '@/lib/utils';
import { scrollToTopForStepChange } from '@/utils/scroll';
import { CertPreviewSheet } from '@/components/inspection/shared/CertPreviewSheet';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';

interface EVChargingTabNavigationProps {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whatsApp?: any;
}

const NEXT_LABELS = ['Continue to Supply', 'Continue to Testing', 'Continue to Sign off'];

/** Slide the footer away while the user is typing so it never covers a field. */
const useTypingFocus = () => {
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const isTextEntry = (el: EventTarget | null): boolean =>
      el instanceof HTMLElement &&
      (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
    const onFocusIn = (e: FocusEvent) => {
      if (isTextEntry(e.target)) setTyping(true);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!isTextEntry(e.relatedTarget)) setTyping(false);
    };
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);
  return typing;
};

const EVChargingTabNavigation: React.FC<EVChargingTabNavigationProps> = ({
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
}) => {
  const navigate = useNavigate();
  const typing = useTypingFocus();
  const isLastTab = currentTabIndex === totalTabs - 1;

  // Email dialog state
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // ELE-1464 — shared utility; instant so it cannot race the step-in
  // animation. See src/utils/scroll.ts.
  const scrollToTop = () => scrollToTopForStepChange();
  // ELE-1477 — EV has its own footer rather than CertShellFooter, so the
  // preview sheet is mounted here instead of inherited.
  const [showPreview, setShowPreview] = useState(false);
  const [showPdf, setShowPdf] = useState(false);

  const handleNavigateNext = () => { navigateNext(); scrollToTop(); };
  const handleNavigatePrevious = () => { navigatePrevious(); scrollToTop(); };

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
      // PDF even when the user emails before ever tapping Generate.
      let formattedData: Record<string, unknown> | undefined;
      try {
        formattedData = formData
          ? formatEVChargingJson({
              ...formData,
              certificateNumber: formData.certificateNumber || `EVC-${Date.now()}`,
            })
          : undefined;
      } catch {
        formattedData = undefined; // fall back to server-side pdf_payload
      }
      const { data: result, error: fnError } = await supabase.functions.invoke(
        'send-certificate-resend',
        { body: { reportId, recipientEmail: emailRecipient, formattedData } }
      );
      if (fnError) {
        let errorMessage = fnError.message;
        try { const parsed = JSON.parse(fnError.message); errorMessage = parsed.error || parsed.message || fnError.message; } catch { /* keep */ }
        if (fnError.context?.body) {
          try {
            const bodyError = typeof fnError.context.body === 'string' ? JSON.parse(fnError.context.body) : fnError.context.body;
            if (bodyError.error) errorMessage = bodyError.error;
          } catch { /* keep */ }
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
      certificateType: 'EV Charging',
      certificateReference: formData.certificateNumber || '',
      reportId: reportId || undefined,
      pdfUrl: formData.pdfUrl || undefined,
    });
    navigate(url);
  };

  return (
    <>
      {reportId && (
        <ReportPdfViewer reportId={reportId} open={showPdf} onOpenChange={setShowPdf} />
      )}
      <CertPreviewSheet
        open={showPreview}
        onOpenChange={setShowPreview}
        reportType="ev-charging"
        data={formData as Record<string, unknown>}
      />
      {/* Fixed footer — slides away while typing so it never covers a field. */}
      <div
        className={cn(
          'fixed bottom-0 right-0 z-40 border-t border-white/[0.08] bg-background/95 backdrop-blur-md transition-transform duration-200',
          typing && 'translate-y-full'
        )}
        style={{ left: 'var(--sidebar-width, 0px)' }}
      >
        <div className="mx-auto flex flex-col gap-2 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:max-w-[1600px] lg:flex-row lg:items-center lg:px-8">
          <span className="hidden text-[12px] tabular-nums text-white/80 lg:block">
            Step {currentTabIndex + 1} of {totalTabs}
          </span>
          {isLastTab ? (
            <>
              <div className="flex gap-2 lg:ml-auto">
                <button
                  onClick={handleNavigatePrevious}
                  disabled={!canNavigatePrevious}
                  className="h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] disabled:opacity-40 touch-manipulation active:scale-[0.98] lg:flex-none lg:px-6"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] lg:flex-none lg:px-6"
                >
                  Preview
                </button>
                {reportId && (
                  <button
                    type="button"
                    onClick={() => setShowPdf(true)}
                    className="h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] lg:flex-none lg:px-6"
                  >
                    View PDF
                  </button>
                )}
                <button
                  onClick={handleEmailCertificate}
                  className="h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] lg:flex-none lg:px-6"
                >
                  Email
                </button>
                <button
                  onClick={handleCreateInvoice}
                  className="h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] lg:flex-none lg:px-6"
                >
                  Invoice
                </button>
              </div>
              <Button
                onClick={onGenerateCertificate}
                disabled={!canGenerateCertificate}
                className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.99] lg:w-auto lg:px-10"
              >
                Generate certificate
              </Button>
            </>
          ) : (
            <div className="flex w-full gap-2 lg:ml-auto lg:w-auto">
              <button
                onClick={handleNavigatePrevious}
                disabled={!canNavigatePrevious}
                className="h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] disabled:opacity-40 touch-manipulation active:scale-[0.98] lg:flex-none lg:px-6"
              >
                Back
              </button>
              <Button
                onClick={handleNavigateNext}
                disabled={!canNavigateNext}
                className="h-12 flex-[2] rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation active:scale-[0.99] lg:flex-none lg:px-10"
              >
                {NEXT_LABELS[currentTabIndex] || 'Continue'}
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Spacer so the last fields clear the fixed footer */}
      <div className="h-24" aria-hidden="true" />

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
              <label htmlFor="ev-email" className="mb-1 block text-[12px] font-medium text-white">
                Recipient email
              </label>
              <Input
                id="ev-email"
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
};

export default EVChargingTabNavigation;
