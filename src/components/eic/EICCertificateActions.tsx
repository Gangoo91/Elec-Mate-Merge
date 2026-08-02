import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { supabase } from '@/integrations/supabase/client';
import { saveCertificatePdf } from '@/utils/certificate-pdf-storage';
import { formatEicJson } from '@/utils/eicJsonFormatter';
import { createInvoiceFromCertificate } from '@/utils/certificateToQuote';
import PDFExportProgress from '@/components/PDFExportProgress';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { useHaptic } from '@/hooks/useHaptic';
import { useMobileKeyboard } from '@/hooks/use-mobile-keyboard';
import {
  useEICValidation,
  TAB_LABEL,
  type EICTabId,
  type ValidationRule,
} from '@/hooks/useEICValidation';
import { cn } from '@/lib/utils';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const secondaryBtnCn =
  'bg-white/[0.06] border border-white/[0.12] text-white font-medium rounded-xl touch-manipulation active:scale-[0.98] transition-all';

/** Imperative actions the sticky shell footer can trigger on the Issue step —
 * mirrors the MW pattern (MinorWorksForm pdfActionsRef). Shape matches the
 * ref EICForm creates: `useRef<{ generate: () => void } | null>`. */
export type EICPdfActionsRef = React.MutableRefObject<{
  generate: () => void;
  email: () => void;
  invoice: () => void;
} | null>;

interface EICCertificateActionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  reportId: string;
  onGenerateCertificate: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate?: (field: string, value: any) => void;
  /** Kept current with the in-tab generate handler so the shell footer's
   * Generate produces the real PDF (MW pattern). */
  actionsRef?: EICPdfActionsRef;
}

const EICCertificateActions: React.FC<EICCertificateActionsProps> = ({
  formData,
  reportId,
  onGenerateCertificate,
  onUpdate,
  actionsRef,
}) => {
  const navigate = useNavigate();
  const haptic = useHaptic();
  const keyboard = useMobileKeyboard();
  const { toast } = useToast();
  const { companyProfile } = useCompanyProfile();
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState<
    'preparing' | 'generating' | 'complete' | 'error'
  >('preparing');
  const [showEmailSheet, setShowEmailSheet] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [showMissingFieldsSheet, setShowMissingFieldsSheet] = useState(false);
  // Generated PDF URL — feeds linked_certificate_pdf_url on the invoice path
  // (MW parity: previously EIC passed no pdfUrl at all, so the cert never
  // attached to invoices raised from it).
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);

  // Single source of truth for "can this cert generate" — the same
  // useEICValidation the panel above and the shell header ring read, so the
  // counts can never disagree and Generate can't fire while errors remain.
  const validation = useEICValidation(formData);
  const canGenerateCertificate = validation.isValid;
  const missingByTab = validation.errors.reduce((acc, rule) => {
    const tab = rule.tab || 'certificate';
    (acc.get(tab) || acc.set(tab, []).get(tab)!).push(rule);
    return acc;
  }, new Map<EICTabId, ValidationRule[]>());

  // Section completion — inspections/testing aren't hard generation gates
  // (they surface as validation warnings), so derive their ticks directly.
  const hasCompletedInspections =
    (formData.inspections && Object.keys(formData.inspections).length > 0) ||
    (formData.inspectionItems &&
      Array.isArray(formData.inspectionItems) &&
      formData.inspectionItems.some(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) =>
          item.outcome === 'satisfactory' ||
          item.outcome === 'not-applicable' ||
          item.outcome === 'limitation'
      ));
  const hasTestResults = formData.scheduleOfTests && formData.scheduleOfTests.length > 0;

  const handleGeneratePDF = async () => {
    if (!canGenerateCertificate) {
      // Open the missing-fields sheet so the user sees what's left + where it lives,
      // rather than dead-ending on a disabled button + a transient toast.
      haptic.warning();
      setShowMissingFieldsSheet(true);
      return;
    }

    setIsExporting(true);
    setExportStatus('preparing');
    setExportProgress(0);

    try {
      setExportProgress(10);

      // Prepare form data in the format expected by PDF Monkey template
      const pdfData = await formatEicJson(formData, companyProfile, reportId);

      // Save formatted payload for email/reports page reuse
      await supabase.from('reports').update({ pdf_payload: pdfData }).eq('report_id', reportId);

      setExportProgress(30);
      setExportStatus('generating');

      // Call edge function to generate PDF via PDF Monkey
      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        'generate-eic-pdf',
        {
          body: {
            formData: pdfData,
            templateId: 'B39538E9-8FF1-4882-BC13-70B1C0D30947',
          },
        }
      );

      setExportProgress(70);

      if (functionError) {
        console.error('Edge function error:', functionError);
        throw new Error(functionError.message || 'Failed to generate PDF');
      }

      if (!functionData?.success || !functionData?.pdfUrl) {
        throw new Error(functionData?.error || 'No PDF URL returned');
      }

      setExportProgress(80);

      // Get user ID for storage path
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Generate professional filename
      const { generatePdfFilename } = await import('@/utils/pdfFilenameGenerator');
      const filename = generatePdfFilename(
        'EIC',
        formData.certificateNumber || 'EIC',
        formData.clientName || 'Client',
        formData.installationDate || new Date()
      );

      // Save PDF to permanent Supabase Storage (PDFMonkey URLs expire after 7 days)
      let permanentUrl = functionData.pdfUrl; // Fallback to temp URL
      let storagePath: string | null = null;

      try {
        const storageResult = await saveCertificatePdf(
          functionData.pdfUrl,
          user.id,
          reportId,
          formData.certificateNumber
        );
        permanentUrl = storageResult.permanentUrl;
        storagePath = storageResult.storagePath;
        console.log('[EIC PDF] PDF saved to permanent storage:', storagePath);
      } catch (storageError) {
        console.error('[EIC PDF] Failed to save PDF permanently, using temp URL:', storageError);
        // Continue with temp URL - user can still download, just won't persist long-term
      }

      setExportProgress(85);

      // Save PDF URL to database for later preview/retrieval
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: Record<string, any> = {
        pdf_url: permanentUrl, // Use permanent URL if available
        pdf_generated_at: new Date().toISOString(),
      };

      if (storagePath) {
        updateData.storage_path = storagePath;
      }

      // Update by report_id (the string ID)
      const { error: updateError } = await supabase
        .from('reports')
        .update(updateData)
        .eq('report_id', reportId);

      if (updateError) {
        console.error('[EIC PDF] Failed to save PDF URL to database:', updateError);
        // Don't throw - still allow download even if save fails
      } else {
        console.log('[EIC PDF] PDF URL saved to database successfully');
      }

      setExportProgress(90);

      // Keep the URL for the invoice path + persist into formData so raising
      // an invoice in a later session still attaches the certificate.
      setGeneratedPdfUrl(permanentUrl);
      onUpdate?.('pdfUrl', permanentUrl);

      // Download the PDF — uses native share sheet on iOS, blob download on web
      const { openOrDownloadPdf } = await import('@/utils/pdf-download');
      await openOrDownloadPdf(permanentUrl, filename);

      setExportProgress(100);
      setExportStatus('complete');

      haptic.success();
      toast({
        title: 'EIC generated',
        description: storagePath
          ? 'Your certificate has been generated and saved permanently.'
          : 'Your certificate has been generated and downloaded.',
      });

      // Also call the original handler for any additional processing
      onGenerateCertificate();
    } catch (error) {
      console.error('PDF generation error:', error);
      setExportStatus('error');
      toast({
        title: 'Export failed',
        description:
          error instanceof Error
            ? error.message
            : 'There was an error generating the PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };


  const handleEmailCertificate = () => {
    if (!canGenerateCertificate) {
      haptic.warning();
      setShowMissingFieldsSheet(true);
      return;
    }

    haptic.light();
    // Pre-fill with client email only when the field is still empty — never
    // overwrite a recipient the user has already typed.
    if (formData.clientEmail && !emailRecipient) {
      setEmailRecipient(formData.clientEmail);
    }

    setShowEmailSheet(true);
  };

  const handleCreateInvoice = () => {
    if (!canGenerateCertificate) {
      haptic.warning();
      setShowMissingFieldsSheet(true);
      return;
    }
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || '',
      certificateType: 'EIC',
      certificateReference: formData.certificateNumber || '',
      reportId: reportId,
      pdfUrl: generatedPdfUrl || formData.pdfUrl || undefined,
    });
    navigate(url);
  };

  // Keep the shell footer's imperative handle current (MW actionsRef pattern).
  useEffect(() => {
    if (!actionsRef) return;
    actionsRef.current = {
      generate: handleGeneratePDF,
      email: handleEmailCertificate,
      invoice: handleCreateInvoice,
    };
    return () => {
      actionsRef.current = null;
    };
  });

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSendingEmail(true);

    try {
      // Send the formatted payload so the function can generate + attach the
      // PDF even when the user emails before ever tapping Generate.
      let formattedData: Awaited<ReturnType<typeof formatEicJson>> | undefined;
      try {
        formattedData = await formatEicJson(
          {
            ...formData,
            certificateNumber: formData.certificateNumber || `EIC-${Date.now()}`,
          },
          companyProfile,
          reportId
        );
      } catch {
        formattedData = undefined; // fall back to server-side pdf_payload
      }

      // Call the Resend-based edge function to generate PDF and send email
      const { data: result, error: fnError } = await supabase.functions.invoke(
        'send-certificate-resend',
        {
          body: {
            reportId: reportId,
            recipientEmail: emailRecipient,
            formattedData,
          },
        }
      );

      if (fnError) {
        let errorMessage = fnError.message;
        try {
          const parsed = JSON.parse(fnError.message);
          errorMessage = parsed.error || parsed.message || fnError.message;
        } catch {
          // Keep original message
        }
        throw new Error(errorMessage);
      }

      if (!result?.success) {
        throw new Error(result?.error || 'Failed to send certificate email');
      }

      haptic.success();
      toast({
        title: 'Certificate sent',
        description: result?.pdfAttached
          ? `EIC certificate sent to ${emailRecipient} with the PDF attached`
          : `EIC certificate sent successfully to ${emailRecipient}`,
      });

      setShowEmailSheet(false);
      setEmailRecipient('');
    } catch (error) {
      toast({
        title: 'Email failed',
        description: error instanceof Error ? error.message : 'Failed to send certificate email.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Distinct short labels — two chips both reading "Schedule" were
  // indistinguishable. These match the shell's step names.
  const completionSections = [
    { label: 'Details', done: !missingByTab.has('details') },
    { label: 'Inspections', done: hasCompletedInspections },
    { label: 'Testing', done: hasTestResults },
    { label: 'Sign off', done: !missingByTab.has('declarations') },
  ];

  return (
    <>
      <div className={cardCn}>
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
          Certificate actions
        </h2>

        {/* Section Completion — compact row */}
        <div className="grid grid-cols-4 gap-2">
          {completionSections.map((section) => (
            <div
              key={section.label}
              className={cn(
                'h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] flex items-center justify-center px-1 text-center text-[11px] font-semibold',
                section.done ? 'text-green-400' : 'text-white'
              )}
            >
              {section.label}
            </div>
          ))}
        </div>

        {/* Validation hint — inline, tappable to open full sheet. Count comes
            from the same validation the panel above renders, so they agree. */}
        {!canGenerateCertificate && (
          <button
            type="button"
            onClick={() => setShowMissingFieldsSheet(true)}
            className="w-full min-h-11 flex items-center text-left text-[12px] font-medium text-elec-yellow touch-manipulation"
          >
            {validation.errors.length} item{validation.errors.length === 1 ? '' : 's'} to complete before generating — tap to see
          </button>
        )}

        {/* ELE-1460 — no inline Generate/Save/Email/Invoice duplicates: the
            sticky footer carries Generate + Email + Invoice, the shell header
            carries Save. The validation hint above stays — it explains the
            footer gate. */}
      </div>

      <PDFExportProgress
        isOpen={isExporting}
        onClose={() => setIsExporting(false)}
        exportType="complete"
        progress={exportProgress}
        status={exportStatus}
        certificateType="EIC"
      />

      {/* Missing-fields sheet — grouped by the tab each field lives in,
          driven by useEICValidation so it matches the panel + header ring */}
      <Sheet open={showMissingFieldsSheet} onOpenChange={setShowMissingFieldsSheet}>
        {/* h-[85vh] + internal scroll — a fresh EIC can list 16 rules across 4
            groups, which overflowed an uncapped sheet off the top of a phone
            and put "Got it" out of reach. Same shape as EICForm's ring sheet. */}
        <SheetContent
          side="bottom"
          className="h-[85vh] bg-background border-white/[0.14] rounded-t-2xl p-0 overflow-hidden"
        >
          <div className="flex h-full flex-col">
            <SheetHeader className="shrink-0 border-b border-white/[0.08] px-4 pb-3 pt-4">
              <SheetTitle className="text-white text-left">
                {validation.errors.length} item{validation.errors.length === 1 ? '' : 's'} to complete
              </SheetTitle>
            </SheetHeader>
            <div className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4">
              <p className="text-[12px] text-white">
                Finish these fields then tap Generate again.
              </p>
              {Array.from(missingByTab.entries()).map(([tab, rules]) => (
                <div key={tab} className="space-y-2">
                  <p className="text-[12px] font-semibold text-elec-yellow">{TAB_LABEL[tab]}</p>
                  <div className="space-y-1.5">
                    {rules.map((rule) => (
                      <div
                        key={rule.field}
                        className="px-3 py-2 rounded-xl bg-white/[0.06] border border-white/[0.12]"
                      >
                        <span className="text-sm text-white">{rule.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* p-0 above drops the sheet variant's safe-area pb, so the
                non-scrolling footer re-applies it — clears the gesture pill. */}
            <div className="shrink-0 border-t border-white/[0.08] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() => setShowMissingFieldsSheet(false)}
                className={cn(secondaryBtnCn, 'w-full h-12 text-sm font-semibold')}
              >
                Got it
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Email sheet — bottom sheet, matching the missing-fields surface.
          The sheet is position:fixed, so the soft keyboard would sit straight
          over the recipient input and Send button; lifting by the measured
          visualViewport delta keeps both above the keyboard. Scoped to this
          sheet deliberately — the alternative (interactive-widget on the
          viewport meta) changes every sheet in the app and needs a device
          pass first. */}
      <Sheet open={showEmailSheet} onOpenChange={setShowEmailSheet}>
        <SheetContent
          side="bottom"
          className="bg-background border-white/[0.14] rounded-t-2xl max-h-[85vh] overflow-y-auto overscroll-contain"
          style={keyboard.isVisible ? { paddingBottom: keyboard.height } : undefined}
        >
          <SheetHeader>
            <SheetTitle className="text-white text-left">Email EIC certificate</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-4 min-w-0">
            <p className="text-[12px] text-white">
              The certificate will be generated and sent as a PDF attachment.
            </p>
            <div>
              <label htmlFor="email" className={labelCn}>
                Recipient email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="off"
                placeholder="client@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
                className={inputCn}
              />
            </div>
            {formData.clientEmail && emailRecipient !== formData.clientEmail && (
              <button
                type="button"
                onClick={() => setEmailRecipient(formData.clientEmail)}
                className={cn(secondaryBtnCn, 'w-full h-11 flex items-center px-3 text-sm overflow-hidden')}
              >
                <span className="truncate">Use client email: {formData.clientEmail}</span>
              </button>
            )}
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={handleSendEmail}
                disabled={isSendingEmail || !emailRecipient}
                className="h-12 w-full touch-manipulation bg-elec-yellow border border-elec-yellow text-black font-semibold rounded-xl active:scale-[0.98] transition-transform disabled:bg-elec-yellow disabled:text-black disabled:opacity-100 flex items-center justify-center gap-2"
              >
                {isSendingEmail ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-black" />
                    Sending...
                  </>
                ) : (
                  'Send certificate'
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowEmailSheet(false)}
                disabled={isSendingEmail}
                className={cn(secondaryBtnCn, 'h-12 w-full text-sm font-semibold disabled:opacity-50')}
              >
                Cancel
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EICCertificateActions;
