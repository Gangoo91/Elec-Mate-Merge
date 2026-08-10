import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { AlertTriangle, CheckCircle, FileDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useToast } from '@/hooks/use-toast';
import { formatEICRJson } from '@/utils/eicrJsonFormatter';
import { supabase } from '@/integrations/supabase/client';
import { saveCertificatePdf } from '@/utils/certificate-pdf-storage';
import SignatureInput from '@/components/signature/SignatureInput';
import { useSignatureProfiles } from '@/hooks/useSignatureProfiles';
import { useEICRForm } from './eicr/EICRFormProvider';
import { useQueryClient } from '@tanstack/react-query';
import { CreateCustomerDialog } from '@/components/CreateCustomerDialog';
import { useCertificateEmail } from '@/hooks/useCertificateEmail';
import { EmailCertificateDialog } from '@/components/certificate-completion/EmailCertificateDialog';
import { useCustomers } from '@/hooks/useCustomers';
import { useHaptic } from '@/hooks/useHaptic';
import { useAppReview } from '@/hooks/useAppReview';
import { useReferralPrompt } from '@/hooks/useReferralPrompt';
import ReferralShareSheet from '@/components/referrals/ReferralShareSheet';
import {
  createQuoteFromCertificate,
  createInvoiceFromCertificate,
} from '@/utils/certificateToQuote';
import { useEstimateRemedialCosts } from '@/hooks/useEstimateRemedialCosts';
import type { EstimateResult } from '@/hooks/useEstimateRemedialCosts';
import type { RemedialQuoteItem } from '@/utils/defectToQuoteItems';
import { mapDefectsToQuoteItems } from '@/utils/defectToQuoteItems';
import QuoteOptionsSheet from '@/components/inspection/eicr/QuoteOptionsSheet';
import AIEstimatorSheet from '@/components/inspection/eicr/AIEstimatorSheet';
import ObservationCodeHelpSheet from '@/components/inspection/ObservationCodeHelpSheet';
import { openOrDownloadPdf } from '@/utils/pdf-download';
import QsReviewPanel from '@/components/inspection/shared/QsReviewPanel';
import { useQsReviewStatus } from '@/hooks/useQsReview';
import { useEICRValidation } from '@/hooks/useEICRValidation';
import RaiseRemedialItemsSheet from '@/components/inspection/RaiseRemedialItemsSheet';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft w-full rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';
const chipGreen = 'bg-green-500 border border-green-500 text-black font-semibold';
const chipRed = 'bg-red-500 border border-red-500 text-white font-semibold';

const secondaryBtnCn =
  'bg-white/[0.06] border border-white/[0.12] text-white font-medium rounded-xl touch-manipulation active:scale-[0.98] transition-all';

// UK postcode from a free-text address — feeds regional pricing in the AI estimator
const extractPostcodeFromAddress = (address: string): string | undefined => {
  const match = address.match(/\b([A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2})\b/i);
  return match ? match[1].toUpperCase().replace(/\s+/, ' ') : undefined;
};

const CollapsibleSection = ({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className={cardCn}>
    <button
      type="button"
      onClick={onToggle}
      className="w-full min-h-11 flex items-center justify-between gap-2 text-left touch-manipulation"
    >
      <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
      <span className="text-[11px] font-medium text-white">{isOpen ? 'Hide' : 'Show'}</span>
    </button>
    {isOpen && <div>{children}</div>}
  </div>
);

interface EICRSummaryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
  /** Kept current with the in-tab handlers so the shell footer's
   * Generate/Email/Invoice drive the real flows (MW/EIC pattern). */
  actionsRef?: React.MutableRefObject<{
    generate: () => void;
    email: () => void;
    invoice: () => void;
  } | null>;
}

const EICRSummary = ({
  formData: propFormData,
  onUpdate: propOnUpdate,
  actionsRef,
}: EICRSummaryProps) => {
  // Use formData and updateFormData from context directly to ensure we always have the latest state
  // (props can be stale due to React's reconciliation timing)
  const {
    effectiveReportId,
    formData: contextFormData,
    updateFormData,
    getLatestFormData,
    syncNow,
    syncNowImmediate,
  } = useEICRForm();
  const formData = contextFormData; // Use context formData for all operations
  const onUpdate = updateFormData; // Use context updateFormData for all operations
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Needed to give a precise error message when the QS gate blocks PDF generation.
  // 'approved' + hash mismatch = edited after approval; 'pending' = not yet reviewed.
  const { data: qsReviewStatus } = useQsReviewStatus(effectiveReportId);
  const haptic = useHaptic();
  const { recordPositiveAction } = useAppReview();
  const {
    recordPositiveAction: recordReferralAction,
    showReferralPrompt,
    handleClose: handleReferralClose,
  } = useReferralPrompt();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [showCustomerDialog, setShowCustomerDialog] = useState(false);
  const [savedReportIdForCustomer, setSavedReportIdForCustomer] = useState<string | null>(null);
  const { saveCustomer, customers } = useCustomers();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showMissingSheet, setShowMissingSheet] = useState(false);

  // AI Estimator state
  const [showQuoteOptions, setShowQuoteOptions] = useState(false);
  const [showEstimatorSheet, setShowEstimatorSheet] = useState(false);
  const [showCodeHelp, setShowCodeHelp] = useState(false);
  const [estimateResult, setEstimateResult] = useState<EstimateResult | null>(null);
  const { estimate, isEstimating, progressStep, elapsedSeconds, cancel } =
    useEstimateRemedialCosts();

  // Saved signature — "sign once, apply to every box on the cert"
  const { getDefaultSignature } = useSignatureProfiles();

  // Collapsible sections for mobile
  const [standardsOpen, setStandardsOpen] = useState(false);
  const [raiseRemedialOpen, setRaiseRemedialOpen] = useState(false);
  const [inspectedByOpen, setInspectedByOpen] = useState(true);
  const [authorisedByOpen, setAuthorisedByOpen] = useState(false);

  // Email hook for sending certificates via Resend.
  // formattedData is built at SEND time (formatEICRJson is async — it fetches
  // photos), so it can't be computed here on every render. handleSendEmail
  // writes the fresh payload into this ref just before sending, and the getter
  // below hands it to the hook when the invoke fires — guaranteeing the emailed
  // PDF is built from CURRENT data, never raw form_data or a stale pdf_payload.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emailFormattedDataRef = useRef<Record<string, any> | undefined>(undefined);
  const { sendCertificateEmail, isLoading: isEmailSending } = useCertificateEmail({
    certificateType: 'EICR',
    reportId: effectiveReportId,
    certificateNumber: formData.certificateNumber,
    clientName: formData.clientName,
    clientEmail: formData.clientEmail,
    installationAddress: formData.installationAddress,
    inspectionDate: formData.inspectionDate,
    overallAssessment: formData.overallAssessment,
    companyName: formData.companyName,
    get formattedData() {
      return emailFormattedDataRef.current;
    },
  });

  // Ref to always access the latest formData in async callbacks
  // This solves React closure issues where callbacks capture stale state
  // useLayoutEffect runs SYNCHRONOUSLY to ensure ref is updated before any user clicks
  const formDataRef = useRef(formData);
  useLayoutEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  // Auto-untick "No remedial action required" if any C1/C2 observations exist.
  // The two states are contradictory — by definition C1/C2 demand action.
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obs: any[] = formData.defectObservations || [];
    const hasBlocking = obs.some((d) => d.defectCode === 'C1' || d.defectCode === 'C2');
    if (hasBlocking && formData.noRemedialAction) {
      onUpdate('noRemedialAction', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.defectObservations, formData.noRemedialAction]);

  const handleGenerateCertificate = async () => {
    // Same protection the old disabled inline button gave — but visible: an
    // incomplete cert opens the missing-items sheet instead of dead-ending.
    // A QS-approved cert is complete by definition — don't gate on an
    // in-editor completeness recompute that can transiently fail and leave
    // an approved cert un-generatable (ELE-1183).
    if (!isFormComplete() && qsReviewStatus?.status !== 'approved') {
      haptic.warning();
      setShowMissingSheet(true);
      return;
    }

    setIsGenerating(true);
    setShowDialog(true);
    setPdfUrl(null);
    setGenerationError(null);

    try {
      // Step 1: Force immediate sync and get the SAVED data back
      // This is critical - we use the data that was actually synced to the database,
      // not potentially stale in-memory data that may not have been saved yet
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      let savedReportId = effectiveReportId;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let dataForPdf: any;

      if (syncNowImmediate) {
        // Use the new immediate sync that returns the saved data
        const syncResult = await syncNowImmediate();

        if (syncResult.success && syncResult.reportId) {
          savedReportId = syncResult.reportId;
          dataForPdf = syncResult.data; // Use the data that was actually saved
        } else {
          console.warn('[PDF Generation] Sync failed, falling back to current form data...');
          dataForPdf = getLatestFormData();
        }
      } else {
        // Fallback to old behavior if syncNowImmediate not available
        console.warn('[PDF Generation] syncNowImmediate not available, using legacy sync...');
        try {
          const syncResult = await syncNow?.();
          if (syncResult?.success && syncResult?.reportId) {
            savedReportId = syncResult.reportId;
          }
        } catch (saveError) {
          console.warn('[PDF Generation] Report save error (non-blocking):', saveError);
        }
        dataForPdf = getLatestFormData();
      }

      // Per-company "QS approval required before issue" gate — checked AFTER
      // the sync so the hash comparison sees what will actually be issued.
      // (Gating before the sync let a post-approval edit slip through: the
      // gate passed on the stale approved data, then the force-sync stamped
      // the edited data and the PDF printed it.)
      const { checkQsIssueGate, qsGateMessage } = await import('@/utils/qsGate');
      const gate = await checkQsIssueGate(savedReportId);
      if (gate.blocked) {
        // Distinguish: already approved but cert was edited after approval
        // (hash mismatch) vs. not yet submitted/approved at all.
        const alreadyApproved = qsReviewStatus?.status === 'approved';
        toast({
          title: alreadyApproved ? 'Certificate edited after QS approval' : 'QS approval required',
          description: alreadyApproved
            ? `${gate.companyName || 'Your company'} requires QS approval and this certificate was modified after it was countersigned. Re-submit for QS review to get a fresh approval.`
            : qsGateMessage(gate.companyName),
          variant: 'destructive',
        });
        setShowDialog(false);
        setIsGenerating(false);
        return;
      }

      // Step 2: Auto-resolve scheme logo if scheme is set but logo is missing or placeholder
      const schemeName = dataForPdf.registrationScheme;
      const currentLogo = dataForPdf.registrationSchemeLogo || '';
      const isPlaceholderLogo =
        !currentLogo || currentLogo.length < 2000 || currentLogo.includes('image/svg+xml');
      if (schemeName && schemeName !== 'none' && schemeName !== 'other' && isPlaceholderLogo) {
        try {
          const { getSchemeInfo } = await import('@/constants/schemeLogos');
          const info = getSchemeInfo(schemeName);
          if (info) {
            const resp = await fetch(info.logoPath);
            const blob = await resp.blob();
            const dataUrl = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
            dataForPdf = { ...dataForPdf, registrationSchemeLogo: dataUrl };
          }
        } catch (err) {
          console.warn('[PDF Generation] Failed to resolve scheme logo:', err);
        }
      }

      // Step 3: Format the EICR data for PDF Monkey (using the SYNCED data)
      const formattedJson = await formatEICRJson(dataForPdf, savedReportId);

      // Save formatted payload for email/reports page reuse
      await supabase
        .from('reports')
        .update({ pdf_payload: formattedJson })
        .eq('report_id', savedReportId);

      // Step 4: Call the edge function
      // reportId lets the edge function's background task write the permanent
      // storage URL onto the report when persistence outlasts the response
      // window (photo-heavy certs) — without it that fix-up is dead code and
      // the report can be left holding a 1-hour PDFMonkey temp URL.
      const { data, error } = await supabase.functions.invoke('generate-eicr-pdf', {
        body: { formData: formattedJson, reportId: savedReportId },
      });

      // Check for errors - either from Supabase or from our edge function response
      if (error) {
        console.error('[PDF Generation] Edge function invocation error:', error);
        // Read the real message from the function's JSON body. error.context is a
        // Response whose body is an unread stream — JSON.stringify on it gives "{}",
        // which is why failures showed an empty error. Parse it instead.
        let errorDetail = error.message || 'Unknown error';
        try {
          const body = await error.context?.json?.();
          if (body?.error) errorDetail = body.error;
        } catch {
          /* body unreadable — keep error.message */
        }
        const friendly = /timed out/i.test(errorDetail)
          ? 'The certificate took too long to generate (large photos). Please try again — it usually works on retry.'
          : errorDetail;
        throw new Error(friendly);
      }

      // Check if the edge function returned an error in the response
      if (data?.success === false || data?.error) {
        console.error('[PDF Generation] Edge function returned error:', data.error);
        throw new Error(`PDF Monkey error: ${data.error || 'Unknown error'}`);
      }

      // Try multiple response formats
      const pdfUrlFromResponse =
        data?.pdfUrl || data?.pdf_url || data?.url || data?.data?.pdfUrl || data?.downloadUrl;

      if (!pdfUrlFromResponse) {
        console.error(
          '[PDF Generation] Edge function succeeded but returned no PDF URL. Full response:',
          data
        );
        throw new Error('Edge function succeeded but returned no PDF URL');
      }

      // Step 5: Save PDF to permanent Supabase Storage (PDFMonkey URLs expire after 7 days)
      let permanentUrl = pdfUrlFromResponse; // Fallback to temp URL
      let storagePath: string | null = null;

      try {
        const storageResult = await saveCertificatePdf(
          pdfUrlFromResponse,
          user.id,
          savedReportId,
          dataForPdf.certificateNumber
        );
        permanentUrl = storageResult.permanentUrl;
        storagePath = storageResult.storagePath;
      } catch (storageError) {
        console.error(
          '[PDF Generation] Failed to save PDF permanently, using temp URL:',
          storageError
        );
        // Continue with temp URL - user can still download, just won't persist long-term
      }

      setPdfUrl(permanentUrl);

      // Persist the PDF URL into formData — the quote/invoice senders read
      // formData.pdfUrl for linked_certificate_pdf_url, and nothing wrote it
      // before (audit P0-2: cert attachment silently skipped on every EICR
      // quote/invoice email).
      onUpdate('pdfUrl', permanentUrl);

      // Step 6: Save PDF URL to database using the SAVED report_id
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: Record<string, any> = {
        pdf_url: permanentUrl,
        pdf_generated_at: new Date().toISOString(),
      };

      if (storagePath) {
        updateData.storage_path = storagePath;
      }

      const { error: updateError } = await supabase
        .from('reports')
        .update(updateData)
        .eq('report_id', savedReportId)
        .select('id, report_id, pdf_url');

      if (updateError) {
        console.error(
          '[PDF Generation] CRITICAL: Failed to save PDF URL to database:',
          updateError
        );

        // Still show the PDF to user, but warn them
        toast({
          title: 'Warning',
          description: 'PDF generated but not saved to your account. Please save manually.',
          variant: 'destructive',
        });
      }

      // Mark certificate as completed
      onUpdate('certificateGenerated', true);
      onUpdate('certificateGeneratedAt', new Date().toISOString());
      onUpdate('status', 'completed');

      // Invalidate dashboard queries to refresh
      queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
      queryClient.invalidateQueries({ queryKey: ['my-reports'] });
      queryClient.invalidateQueries({ queryKey: ['customer-reports'] });

      toast({
        title: 'Certificate generated',
        description: storagePath
          ? 'Your EICR certificate has been saved permanently.'
          : 'Your EICR certificate is ready for download.',
      });

      // Prompt for App Store review after a positive win
      recordPositiveAction();
      // Separately track for referral prompt (different threshold + cooldown)
      recordReferralAction();

      // Check if customer already exists in pool
      const existingCustomer = customers.find(
        (c) => c.name.toLowerCase() === dataForPdf.clientName?.toLowerCase()
      );

      // If customer doesn't exist, show prompt to save
      if (!existingCustomer && dataForPdf.clientName) {
        setSavedReportIdForCustomer(savedReportId);
        setShowCustomerDialog(true);
      }
    } catch (error) {
      console.error('Cloud PDF generation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setGenerationError(errorMessage);

      // Show the error to user - NO FALLBACK so we can debug
      toast({
        title: 'PDF generation failed',
        description: `PDF Monkey error: ${errorMessage}. Check console for details.`,
        variant: 'destructive',
        duration: 10000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Email send handler - ensures report is saved before emailing
  const handleSendEmail = async (email: string, cc?: string[], message?: string) => {
    // First, ensure report is saved to database using sync hook
    let reportIdForEmail = effectiveReportId;
    try {
      const syncResult = await syncNow();
      if (!syncResult.success) {
        throw new Error('Failed to save report before emailing. Please try again.');
      }
      if (syncResult.reportId) reportIdForEmail = syncResult.reportId;
    } catch (saveError) {
      console.error('[Email] Failed to save report before emailing:', saveError);
      toast({
        title: 'Save error',
        description: 'Please save your certificate before emailing. Try generating the PDF first.',
        variant: 'destructive',
      });
      throw saveError;
    }

    // Build a FRESH formatted payload so send-certificate-resend attaches a PDF
    // generated from the current form data — without this it falls back to a
    // stale pdf_payload (post-edit emails) or raw camelCase form_data (never
    // generated), which renders a blank certificate. Mirrors the EV reference.
    try {
      const latestFormData = getLatestFormData();
      const formattedJson = await formatEICRJson(
        {
          ...latestFormData,
          certificateNumber: latestFormData?.certificateNumber || `EICR-${Date.now()}`,
        },
        reportIdForEmail
      );
      emailFormattedDataRef.current = formattedJson;
      // Keep the saved payload fresh too so the reports-page email path
      // doesn't reuse a stale one.
      const { error: payloadError } = await supabase
        .from('reports')
        .update({ pdf_payload: formattedJson })
        .eq('report_id', reportIdForEmail);
      if (payloadError) {
        console.warn('[Email] Failed to refresh pdf_payload (non-blocking):', payloadError);
      }
    } catch (formatError) {
      // Fall back to the server-side pdf_payload rather than blocking the send
      console.warn('[Email] Failed to build formatted payload:', formatError);
      emailFormattedDataRef.current = undefined;
    }

    // Now send the email
    await sendCertificateEmail({
      recipientEmail: email,
      cc,
      customMessage: message,
    });
  };

  const handleSaveCustomer = async (customerData: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    notes?: string;
  }) => {
    await saveCustomer(customerData);

    // Invalidate customer queries to refresh list
    queryClient.invalidateQueries({ queryKey: ['customers'] });
  };

  // Actionable defects for quoting — C1/C2/C3/FI that are NOT already
  // rectified, carrying the inspector's recommendation (audit P1-4: it never
  // left the certificate before).
  const getActionableDefects = () => {
    return (formData.defectObservations || [])
      .filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (d: any) => ['C1', 'C2', 'C3', 'FI'].includes(d.defectCode) && !d.rectified
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((d: any) => ({
        code: d.defectCode,
        description: d.description,
        location: d.item || '',
        circuitRef: '',
        recommendation: d.recommendation || '',
      }));
  };

  // Navigate to quote builder with client data pre-filled
  const handleCreateQuote = (items?: RemedialQuoteItem[]) => {
    haptic.light();
    const url = createQuoteFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || '',
      certificateType: 'EICR',
      certificateReference: formData.certificateNumber || '',
      reportId: effectiveReportId || undefined,
      pdfUrl: pdfUrl || formData.pdfUrl || undefined,
      ...(items && items.length > 0 && { items }),
    });
    navigate(url);
  };

  // Navigate to invoice builder with client data pre-filled
  const handleCreateInvoice = () => {
    haptic.light();
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || '',
      certificateType: 'EICR',
      certificateReference: formData.certificateNumber || '',
      reportId: effectiveReportId || undefined,
      pdfUrl: pdfUrl || formData.pdfUrl || undefined,
    });
    navigate(url);
  };

  // Shell-footer handle (MW/EIC pattern) — re-registered every render so the
  // footer always calls the freshest closures; cleared on unmount so the
  // footer's optional chaining goes quiet instead of firing stale handlers.
  useEffect(() => {
    if (!actionsRef) return;
    actionsRef.current = {
      generate: handleGenerateCertificate,
      email: () => setShowEmailDialog(true),
      invoice: handleCreateInvoice,
    };
    return () => {
      actionsRef.current = null;
    };
  });

  // AI Estimator handlers
  const handleAIEstimate = async () => {
    setShowQuoteOptions(false);
    setShowEstimatorSheet(true);
    setEstimateResult(null);

    const defects = getActionableDefects();

    if (defects.length === 0) {
      toast({
        title: 'No defects found',
        description: 'Add unrectified defect observations before estimating.',
      });
      setShowEstimatorSheet(false);
      return;
    }

    // Property context grounds the estimate (access, cable runs, board size)
    // and the postcode drives regional pricing — previously never sent.
    const result = await estimate(defects, {
      propertyType: formData.propertyType || undefined,
      numberOfBedrooms: formData.numberOfBedrooms || undefined,
      propertyAge: formData.estimatedAge
        ? `${formData.estimatedAge} ${formData.ageUnit || 'years'}`
        : undefined,
      postcode: extractPostcodeFromAddress(formData.installationAddress || ''),
    });
    if (result) {
      setEstimateResult(result);
    } else {
      // Fallback to static mapping
      const staticItems = mapDefectsToQuoteItems(defects);
      if (staticItems.length > 0) {
        const totalMaterials = staticItems
          .filter((i) => i.category === 'materials')
          .reduce((s, i) => s + i.totalPrice, 0);
        const totalLabour = staticItems
          .filter((i) => i.category === 'labour')
          .reduce((s, i) => s + i.totalPrice, 0);
        setEstimateResult({
          items: staticItems,
          summary: {
            totalMaterials,
            totalLabour,
            totalExVat: totalMaterials + totalLabour,
            defectsProcessed: defects.length,
          },
        });
      }
    }
  };

  const handleSendToQuote = () => {
    setShowQuoteOptions(false);
    // The option card promises "observations pre-loaded as line items" — map
    // every unrectified C1/C2/C3/FI through the static remedial table so the
    // quote arrives populated instead of empty (audit P0-1).
    const items = mapDefectsToQuoteItems(getActionableDefects());
    handleCreateQuote(items);
  };

  const handleUpdateEstimateItem = (index: number, updates: Partial<RemedialQuoteItem>) => {
    if (!estimateResult) return;
    const newItems = [...estimateResult.items];
    newItems[index] = { ...newItems[index], ...updates };
    const totalMaterials = newItems
      .filter((i) => i.category === 'materials')
      .reduce((s, i) => s + i.totalPrice, 0);
    const totalLabour = newItems
      .filter((i) => i.category === 'labour')
      .reduce((s, i) => s + i.totalPrice, 0);
    setEstimateResult({
      ...estimateResult,
      items: newItems,
      summary: {
        ...estimateResult.summary,
        totalMaterials,
        totalLabour,
        totalExVat: totalMaterials + totalLabour,
      },
    });
  };

  const handleDeleteEstimateItem = (index: number) => {
    if (!estimateResult) return;
    const newItems = estimateResult.items.filter((_, i) => i !== index);
    const totalMaterials = newItems
      .filter((i) => i.category === 'materials')
      .reduce((s, i) => s + i.totalPrice, 0);
    const totalLabour = newItems
      .filter((i) => i.category === 'labour')
      .reduce((s, i) => s + i.totalPrice, 0);
    setEstimateResult({
      ...estimateResult,
      items: newItems,
      summary: {
        ...estimateResult.summary,
        totalMaterials,
        totalLabour,
        totalExVat: totalMaterials + totalLabour,
      },
    });
  };

  const handleUpdateScopeOfWorks = (text: string) => {
    if (!estimateResult) return;
    setEstimateResult({ ...estimateResult, scopeOfWorks: text });
  };

  const handleEstimateToQuote = () => {
    if (!estimateResult) return;
    haptic.light();

    // Carry the estimator's items through the certificate transport VERBATIM.
    // The old path flattened them into Cost Engineer shape, which re-guessed
    // units/categories, overwrote defect notes with "Supplier: Estimated" and
    // collapsed all labour into one anonymous line (audit P1-3).
    const items = estimateResult.items.map((i) => ({
      id: i.id,
      description: i.description,
      quantity: i.quantity,
      unit: i.unit,
      unitPrice: i.unitPrice,
      totalPrice: i.totalPrice,
      category: i.category,
      subcategory: i.subcategory,
      notes: i.notes,
      defectCode: i.defectCode,
      defectDescription: i.defectDescription,
      source: i.source,
      ...(i.category === 'labour' && {
        hours: i.labourHours ?? i.quantity,
        hourlyRate: i.unitPrice,
        workerType: 'Qualified Electrician',
      }),
    }));

    const url = createQuoteFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || '',
      certificateType: 'EICR',
      certificateReference: formData.certificateNumber || '',
      reportId: effectiveReportId || undefined,
      pdfUrl: pdfUrl || formData.pdfUrl || undefined,
      items,
      jobDescription: estimateResult.scopeOfWorks || undefined,
    });
    navigate(url);
  };

  // Single source of truth — the SAME hook the shell's ring, step ticks and
  // footer gate read, so this tab can never disagree with the header about
  // what's missing (it carries the C1 cross-checks too).
  const eicrValidation = useEICRValidation(formData);
  const isFormComplete = () => eicrValidation.isValid;

  const STEP_LABEL: Record<string, string> = {
    details: 'Details',
    inspection: 'Inspect',
    testing: 'Testing',
    inspector: 'Sign off',
    certificate: 'Issue',
  };
  const missingItems = eicrValidation.errors.map((e) => ({
    label: e.message,
    where: STEP_LABEL[e.tab] || 'Issue',
  }));

  /*
   * Things worth knowing that do not stop you issuing.
   *
   * The gate has always produced these — untested circuits, unrecorded bonding,
   * a C2 with no description, an email address that cannot receive the
   * certificate — and nothing has ever rendered them. Computing a warning and
   * showing it to no one is the same as not checking. They sit below the
   * blocking list, visually quieter, and never gate the button: an EICR can be
   * legitimately issued with any of them outstanding.
   */
  const advisoryItems = eicrValidation.warnings.map((w) => ({
    label: w.message,
    where: STEP_LABEL[w.tab] || 'Issue',
  }));
  const showCompletionHint =
    (missingItems.length > 0 || advisoryItems.length > 0) && qsReviewStatus?.status !== 'approved';

  // Section completion chips — same derivation as the shell's step ticks
  // (no validation errors for that step), so a tab full of auto-seeded blank
  // rows doesn't light up green.
  const completionSections = (
    [
      ['details', 'Details'],
      ['inspection', 'Inspect'],
      ['testing', 'Testing'],
      ['inspector', 'Sign off'],
    ] as const
  ).map(([tab, label]) => ({
    label,
    done: !eicrValidation.errors.some((e) => e.tab === tab),
  }));

  const c1Observations = (formData.defectObservations || []).filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (d: any) => d.defectCode === 'C1'
  );
  const c1Count = c1Observations.length;

  /*
   * ⚠️ Do NOT add `&& !d.rectified` here. BS 7671 Appendix 6, producer notes to
   * the model Condition Report: "The overall assessment of the installation is
   * to be reported as unsatisfactory where any observation is given a code C1
   * or C2 classification." There is no rectification exemption — the very next
   * note contemplates C1 items being "made safe on discovery" and still does
   * not release the assessment.
   *
   * A defect put right on the visit is handled by no longer carrying a live
   * C1/C2, not by exempting a live one from this count (ELE-1537).
   */
  const blockingObsCount = (formData.defectObservations || []).filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (d: any) => d.defectCode === 'C1' || d.defectCode === 'C2'
  ).length;
  const remedialBlocked = blockingObsCount > 0;

  /*
   * Outstanding remedial work on this certificate.
   *
   * The summary tab is where the inspector finishes, so it is where the offer
   * to raise the work belongs — the coded observations are a remedial scope of
   * works and were going no further than the PDF. Anything already ticked as
   * rectified is excluded; it was put right on the visit.
   */
  const outstandingRemedial = (formData.defectObservations || []).filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (d: any) => !d.rectified && d.defectCode && d.defectCode !== 'N/A' && d.defectCode !== 'LIM'
  );

  const threeStateOptions = [
    { value: 'yes', label: 'Yes', activeClass: chipGreen },
    { value: 'no', label: 'No', activeClass: chipRed },
    { value: 'na', label: 'N/A', activeClass: chipOn },
  ];

  return (
    <div className="space-y-4">
      <RaiseRemedialItemsSheet
        open={raiseRemedialOpen}
        onOpenChange={setRaiseRemedialOpen}
        // effectiveReportId, NOT certificateNumber. The observations section
        // raises against effectiveReportId too, and the two must agree or the
        // same observation raised from both places would dedupe against
        // nothing and be created twice.
        reportId={effectiveReportId}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        observations={outstandingRemedial as any}
        customerName={formData.clientName as string | undefined}
        location={formData.installationAddress as string | undefined}
      />

      {/* Remedial work — the scope this certificate has just produced. */}
      {outstandingRemedial.length > 0 && (
        <div className="-mx-4 border-y border-elec-yellow/30 bg-elec-yellow/[0.08] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            {outstandingRemedial.length} item
            {outstandingRemedial.length === 1 ? '' : 's'} need putting right
          </h2>
          <p className="mt-1 text-[13px] leading-snug text-white">
            Raise them as remedial work and they land on your snagging list — and on a job, ready
            to quote.
          </p>
          <button
            type="button"
            onClick={() => {
              haptic.light();
              setRaiseRemedialOpen(true);
            }}
            className="mt-3 h-11 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98] sm:w-auto sm:px-6"
          >
            Raise remedial work
          </button>
        </div>
      )}

      {/* Standards compliance */}
      <CollapsibleSection
        title="Standards compliance"
        isOpen={standardsOpen}
        onToggle={() => {
          haptic.light();
          setStandardsOpen((prev) => !prev);
        }}
      >
        <div className="space-y-4 pt-1">
          <div>
            <Label className={labelCn}>Design standard</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'BS7671', label: 'BS 7671' },
                { value: 'Other', label: 'Other' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate('designStandard', opt.value);
                  }}
                  className={cn(
                    'h-11 rounded-xl text-sm touch-manipulation transition-all active:scale-[0.98]',
                    formData.designStandard === opt.value ? chipOn : chipOff
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* BS 7671 + Building Regs — 3-state (Yes / No / N/A).
              Building Regs is often N/A on a condition report. */}
          <div>
            <Label className={labelCn}>BS 7671 compliance</Label>
            <div className="grid grid-cols-3 gap-2">
              {threeStateOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate(
                      'bs7671Compliance',
                      formData.bs7671Compliance === opt.value ? '' : opt.value
                    );
                  }}
                  className={cn(
                    'h-11 rounded-xl text-sm touch-manipulation transition-all active:scale-[0.98]',
                    formData.bs7671Compliance === opt.value ? opt.activeClass : chipOff
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className={labelCn}>Building regs compliance</Label>
            <div className="grid grid-cols-3 gap-2">
              {threeStateOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate(
                      'buildingRegsCompliance',
                      formData.buildingRegsCompliance === opt.value ? '' : opt.value
                    );
                  }}
                  className={cn(
                    'h-11 rounded-xl text-sm touch-manipulation transition-all active:scale-[0.98]',
                    formData.buildingRegsCompliance === opt.value ? opt.activeClass : chipOff
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Overall assessment */}
      <div className={cardCn}>
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Overall assessment</h2>
          {/* The gate used to assert the outcome and explain nothing, which read
            as a bug to inspectors who had just fixed the fault (ELE-1537). */}
          <button
            type="button"
            onClick={() => {
              haptic.light();
              setShowCodeHelp(true);
            }}
            className="-mr-1 -mt-1 h-11 flex-shrink-0 rounded-lg px-2 text-[13px] font-medium text-elec-yellow touch-manipulation transition-colors hover:bg-white/[0.06]"
          >
            How codes decide this
          </button>
        </div>

        {/* ELE-882 — explicit suggestion + Apply instead of silent auto-set.
            Section E of the model form is strictly SATISFACTORY/UNSATISFACTORY,
            and any C1/C2 makes it unsatisfactory (producer note 12). */}
        {blockingObsCount > 0 &&
          (!formData.overallAssessment || formData.overallAssessment === 'satisfactory') && (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-elec-yellow/30 bg-white/[0.05] px-3.5 py-2.5">
              <span className="text-xs text-white">
                {blockingObsCount} C1/C2 recorded — the report must be{' '}
                <span className="font-semibold text-elec-yellow">Unsatisfactory</span>
                <button
                  type="button"
                  onClick={() => setShowCodeHelp(true)}
                  className="ml-1.5 font-semibold text-elec-yellow underline underline-offset-2 touch-manipulation"
                >
                  Why?
                </button>
              </span>
              <button
                type="button"
                onClick={() => {
                  haptic.warning();
                  onUpdate('overallAssessment', 'unsatisfactory');
                  onUpdate('satisfactoryForContinuedUse', 'no');
                }}
                className="h-11 flex-shrink-0 rounded-lg bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation active:scale-[0.98] transition-all"
              >
                Apply
              </button>
            </div>
          )}

        {/* Two-state toggle (Section E) writes both BS 7671 F1 + F2 fields so the
            PDF formatter is unchanged. Read path is tolerant of the retired
            'yes-with-recommendations' pair — old certs still show Satisfactory. */}
        <div>
          <Label className={labelCn}>Overall assessment *</Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                key: 'satisfactory',
                label: 'Satisfactory',
                assessment: 'satisfactory',
                continuedUse: 'yes',
                activeClass: chipGreen,
                onFeedback: () => haptic.success(),
              },
              {
                key: 'not-satisfactory',
                label: 'Not satisfactory',
                assessment: 'unsatisfactory',
                continuedUse: 'no',
                activeClass: chipRed,
                onFeedback: () => haptic.warning(),
              },
            ].map((option) => {
              const isActive = formData.overallAssessment === option.assessment;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onUpdate('overallAssessment', option.assessment);
                    onUpdate('satisfactoryForContinuedUse', option.continuedUse);
                    option.onFeedback();
                  }}
                  className={cn(
                    'min-h-11 rounded-xl px-2 py-1.5 text-xs touch-manipulation transition-all active:scale-[0.98] flex items-center justify-center text-center',
                    isActive ? option.activeClass : chipOff
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* No remedial action required — disabled when any C1/C2 observations exist,
            because by definition those require remedial action. */}
        <div>
          <button
            type="button"
            disabled={remedialBlocked}
            onClick={() => {
              if (remedialBlocked) return;
              haptic.light();
              onUpdate('noRemedialAction', !formData.noRemedialAction);
            }}
            className={cn(
              'w-full h-11 rounded-xl text-sm touch-manipulation transition-all',
              !remedialBlocked && 'active:scale-[0.98]',
              remedialBlocked
                ? cn(chipOff, 'opacity-50 cursor-not-allowed')
                : formData.noRemedialAction
                  ? chipGreen
                  : chipOff
            )}
          >
            No remedial action required
          </button>
          {remedialBlocked && (
            <span className="mt-1.5 block text-[12px] font-medium text-red-400">
              Blocked: {blockingObsCount} C1/C2 observation{blockingObsCount === 1 ? '' : 's'}{' '}
              require action
            </span>
          )}
        </div>

        {/* General condition (Section E — BS 7671:2018+A4:2026) */}
        <div>
          <Label className={labelCn}>
            General condition of the installation (in terms of electrical safety)
          </Label>
          <textarea
            className={cn(textareaCn, 'min-h-[80px] resize-none')}
            rows={2}
            placeholder="e.g., Installation is in a generally satisfactory condition for its age..."
            value={formData.generalCondition || ''}
            onChange={(e) => onUpdate('generalCondition', e.target.value)}
          />
        </div>

        {/* Additional comments */}
        <div>
          <Label className={labelCn}>Additional comments</Label>
          <textarea
            className={cn(textareaCn, 'min-h-[100px] resize-none')}
            rows={3}
            placeholder="Enter any additional comments or observations..."
            value={formData.additionalComments || ''}
            onChange={(e) => onUpdate('additionalComments', e.target.value)}
          />
        </div>
      </div>

      {/* Signatures — speed tools */}
      <div className={cardCn}>
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Signatures</h2>
        <button
          type="button"
          onClick={() => {
            haptic.light();
            const today = new Date().toISOString().split('T')[0];
            // Inspected By
            onUpdate('inspectedByName', formData.inspectorName);
            onUpdate('inspectedBySignature', formData.inspectorSignature);
            onUpdate('inspectedByForOnBehalfOf', formData.companyName);
            onUpdate('inspectedByPosition', 'Inspector');
            onUpdate('inspectedByAddress', formData.companyAddress);
            onUpdate('inspectedByDate', formData.inspectionDate || today);
            onUpdate('inspectedByCpScheme', formData.registrationScheme);
            // Report Authorised By — same person on solo jobs (most common)
            onUpdate('reportAuthorisedByName', formData.inspectorName);
            onUpdate('reportAuthorisedBySignature', formData.inspectorSignature);
            onUpdate('reportAuthorisedByForOnBehalfOf', formData.companyName);
            onUpdate('reportAuthorisedByPosition', 'Inspector');
            onUpdate('reportAuthorisedByAddress', formData.companyAddress);
            onUpdate('reportAuthorisedByDate', formData.inspectionDate || today);
            onUpdate('reportAuthorisedByMembershipNo', formData.registrationNumber);
            haptic.success();
            toast({
              title: 'Details copied',
              description: 'Inspector details copied to both signatory sections',
            });
          }}
          className="w-full h-11 rounded-xl text-sm bg-elec-yellow border border-elec-yellow text-black font-semibold touch-manipulation active:scale-[0.98] transition-all"
        >
          Copy from inspector details (both signatories)
        </button>

        {/* Use saved signature — applies a stored signature to every box at once */}
        {getDefaultSignature() && (
          <button
            type="button"
            onClick={() => {
              haptic.light();
              const sig = getDefaultSignature()?.signatureData;
              if (!sig) return;
              // Apply to the Inspector Details signature + both signatories + both schedules
              onUpdate('inspectorSignature', sig);
              onUpdate('inspectedBySignature', sig);
              onUpdate('reportAuthorisedBySignature', sig);
              onUpdate('scheduleInspectedBySignature', sig);
              onUpdate('scheduleTestedBySignature', sig);
              haptic.success();
              toast({
                title: 'Saved signature applied',
                description:
                  'Your saved signature has been added to every signature box on this report.',
              });
            }}
            className={cn(secondaryBtnCn, 'w-full h-11 text-sm')}
          >
            Use my saved signature (all boxes)
          </button>
        )}
      </div>

      {/* Inspected by */}
      <CollapsibleSection
        title="Inspected by"
        isOpen={inspectedByOpen}
        onToggle={() => {
          haptic.light();
          setInspectedByOpen((prev) => !prev);
        }}
      >
        <div className="space-y-4 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <Label className={labelCn}>Name *</Label>
              <Input
                value={formData.inspectedByName || ''}
                onChange={(e) => onUpdate('inspectedByName', e.target.value.toUpperCase())}
                placeholder="FULL NAME"
                className={cn(inputCn, 'uppercase')}
              />
            </div>
            <div>
              <Label className={labelCn}>Position</Label>
              <Input
                value={formData.inspectedByPosition || ''}
                onChange={(e) => onUpdate('inspectedByPosition', e.target.value)}
                placeholder="Job title"
                className={inputCn}
              />
            </div>
          </div>

          <div>
            <Label className={labelCn}>Signature *</Label>
            <SignatureInput
              value={formData.inspectedBySignature || ''}
              onChange={(value) => onUpdate('inspectedBySignature', value || '')}
              placeholder="Signature of inspector"
              required={true}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <Label className={labelCn}>For/on behalf of</Label>
              <Input
                value={formData.inspectedByForOnBehalfOf || ''}
                onChange={(e) => onUpdate('inspectedByForOnBehalfOf', e.target.value)}
                placeholder="Company name"
                className={inputCn}
              />
            </div>
            <div>
              <Label className={labelCn}>Address</Label>
              <Input
                value={formData.inspectedByAddress || ''}
                onChange={(e) => onUpdate('inspectedByAddress', e.target.value)}
                placeholder="Full address"
                className={inputCn}
              />
            </div>
          </div>

          <div>
            <Label className={labelCn}>CP scheme</Label>
            <div className="flex items-end gap-3">
              <Input
                value={formData.inspectedByCpScheme || ''}
                onChange={(e) => onUpdate('inspectedByCpScheme', e.target.value)}
                placeholder="Competent person scheme"
                disabled={formData.inspectedByCpSchemeNA}
                className={cn(
                  inputCn,
                  'flex-1',
                  formData.inspectedByCpSchemeNA && 'opacity-50'
                )}
              />
              <button
                type="button"
                onClick={() => {
                  haptic.light();
                  const newValue = !formData.inspectedByCpSchemeNA;
                  onUpdate('inspectedByCpSchemeNA', newValue);
                  if (newValue) onUpdate('inspectedByCpScheme', '');
                }}
                className={cn(
                  'h-11 px-4 rounded-xl text-sm touch-manipulation transition-all active:scale-[0.98]',
                  formData.inspectedByCpSchemeNA ? chipOn : chipOff
                )}
              >
                N/A
              </button>
            </div>
          </div>

          {/* Date (A4:2026 Section G — Inspected and tested by) */}
          <div>
            <Label className={labelCn}>Date</Label>
            <Input
              type="date"
              value={formData.inspectedByDate || ''}
              onChange={(e) => onUpdate('inspectedByDate', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Report authorised by */}
      <CollapsibleSection
        title="Report authorised by"
        isOpen={authorisedByOpen}
        onToggle={() => {
          haptic.light();
          setAuthorisedByOpen((prev) => !prev);
        }}
      >
        <div className="space-y-4 pt-1">
          {/* Same as Inspected By quick action */}
          <button
            type="button"
            onClick={() => {
              haptic.light();
              const newValue = !formData.sameAsInspectedBy;
              onUpdate('sameAsInspectedBy', newValue);
              if (newValue) {
                onUpdate('reportAuthorisedByName', formData.inspectedByName);
                onUpdate('reportAuthorisedBySignature', formData.inspectedBySignature);
                onUpdate('reportAuthorisedByDate', new Date().toISOString().split('T')[0]);
                onUpdate('reportAuthorisedByForOnBehalfOf', formData.inspectedByForOnBehalfOf);
                onUpdate('reportAuthorisedByPosition', formData.inspectedByPosition);
                onUpdate('reportAuthorisedByAddress', formData.inspectedByAddress);
                onUpdate('reportAuthorisedByMembershipNo', formData.inspectedByCpScheme);
                haptic.success();
              }
            }}
            className={cn(
              'w-full h-11 rounded-xl text-sm touch-manipulation transition-all active:scale-[0.98]',
              formData.sameAsInspectedBy ? chipOn : chipOff
            )}
          >
            Same as inspected by
          </button>

          {/* Row 1: Name + Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <Label className={labelCn}>Name *</Label>
              <Input
                value={formData.reportAuthorisedByName || ''}
                onChange={(e) => onUpdate('reportAuthorisedByName', e.target.value.toUpperCase())}
                placeholder="FULL NAME"
                className={cn(inputCn, 'uppercase')}
              />
            </div>
            <div>
              <Label className={labelCn}>Date *</Label>
              <Input
                type="date"
                value={formData.reportAuthorisedByDate || ''}
                onChange={(e) => onUpdate('reportAuthorisedByDate', e.target.value)}
                className={inputCn}
              />
            </div>
          </div>

          {/* Row 2: Signature */}
          <div>
            <Label className={labelCn}>Signature *</Label>
            <SignatureInput
              value={formData.reportAuthorisedBySignature || ''}
              onChange={(value) => onUpdate('reportAuthorisedBySignature', value || '')}
              placeholder="Signature of authorising person"
              required={true}
            />
          </div>

          {/* Row 3: Company + Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <Label className={labelCn}>For/on behalf of</Label>
              <Input
                value={formData.reportAuthorisedByForOnBehalfOf || ''}
                onChange={(e) => onUpdate('reportAuthorisedByForOnBehalfOf', e.target.value)}
                placeholder="Company name"
                className={inputCn}
              />
            </div>
            <div>
              <Label className={labelCn}>Position</Label>
              <Input
                value={formData.reportAuthorisedByPosition || ''}
                onChange={(e) => onUpdate('reportAuthorisedByPosition', e.target.value)}
                placeholder="Job title"
                className={inputCn}
              />
            </div>
          </div>

          {/* Row 4: Address + Membership */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <Label className={labelCn}>Address</Label>
              <Input
                value={formData.reportAuthorisedByAddress || ''}
                onChange={(e) => onUpdate('reportAuthorisedByAddress', e.target.value)}
                placeholder="Full address"
                className={inputCn}
              />
            </div>
            <div>
              <Label className={labelCn}>Membership no</Label>
              <Input
                value={formData.reportAuthorisedByMembershipNo || ''}
                onChange={(e) => onUpdate('reportAuthorisedByMembershipNo', e.target.value)}
                placeholder="Registration number"
                className={inputCn}
              />
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Qualifying Supervisor review (team members only) */}
      <QsReviewPanel
        reportId={effectiveReportId}
        reportType="eicr"
        onBeforeSubmit={async () => {
          await syncNow?.();
        }}
      />

      {/* Certificate actions — completion state + companion tools only.
          ELE-1460: no inline Generate/Email/Invoice duplicates — the sticky
          shell footer is their single home. The tappable hint below explains
          the footer gate. */}
      <div className={cardCn}>
        <h2 className="text-[15px] font-semibold tracking-tight text-white">
          Certificate actions
        </h2>

        {/* Section completion — compact row */}
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

        {/* Validation hint — inline, tappable to open the full list. Same
            checks handleGenerateCertificate gates on, so they always agree. */}
        {showCompletionHint && (
          <button
            type="button"
            onClick={() => {
              haptic.light();
              setShowMissingSheet(true);
            }}
            className="w-full min-h-11 flex items-center text-left text-[12px] font-medium text-elec-yellow touch-manipulation"
          >
            {missingItems.length > 0
              ? `${missingItems.length} item${missingItems.length === 1 ? '' : 's'} to complete before generating — tap to see`
              : `${advisoryItems.length} thing${advisoryItems.length === 1 ? '' : 's'} worth checking before you issue — tap to see`}
          </button>
        )}

        {/* Quote lives here (not in the footer) — remedial works from observations */}
        <button
          type="button"
          onClick={() => {
            haptic.light();
            setShowQuoteOptions(true);
          }}
          className={cn(secondaryBtnCn, 'w-full h-11 text-sm')}
        >
          Quote remedial works
        </button>

        {/* Danger notice — only when C1 observations exist */}
        {c1Count > 0 && (
          <button
            type="button"
            className="w-full h-11 rounded-xl border border-red-500/40 bg-white/[0.06] text-sm font-semibold text-red-400 touch-manipulation active:scale-[0.98] transition-all"
            onClick={() => {
              navigate('/electrician/inspection-testing/danger-notice', {
                state: {
                  fromEicr: true,
                  eicrCertNumber: formData.certificateNumber || '',
                  clientName: formData.clientName || '',
                  installationAddress: formData.installationAddress || '',
                  clientPhone: formData.clientPhone || '',
                  clientEmail: formData.clientEmail || '',
                  inspectorName: formData.inspectorName || '',
                  inspectorCompany: formData.companyName || '',
                  inspectorPhone: formData.companyPhone || '',
                  inspectorEmail: formData.companyEmail || '',
                  inspectorRegistration: formData.registrationNumber || '',
                  inspectorScheme: formData.registrationScheme || '',
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  observations: c1Observations.map((obs: any) => ({
                    description: obs.description,
                    item: obs.item,
                    regulation: obs.regulation || '',
                    recommendation: obs.recommendation,
                    photos: obs.photos || [],
                  })),
                },
              });
            }}
          >
            Danger notice{c1Count > 1 ? ` (${c1Count} C1s)` : ''}
          </button>
        )}
      </div>

      {/* Missing-items sheet — the tappable hint's full list (EIC pattern) */}
      <Sheet open={showMissingSheet} onOpenChange={setShowMissingSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 bg-background border-white/[0.14] rounded-t-2xl overflow-hidden"
        >
          <div className="flex flex-col h-full bg-background">
            <div className="px-4 pt-4 pb-3 border-b border-white/[0.1]">
              <SheetTitle className="text-white text-left">
                {missingItems.length > 0
                  ? `${missingItems.length} item${missingItems.length === 1 ? '' : 's'} to complete`
                  : 'Before you issue'}
              </SheetTitle>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {missingItems.length > 0 && (
                <p className="text-[12px] text-white">Finish these then tap Generate again.</p>
              )}
              <div className="space-y-1.5">
                {missingItems.map((item) => (
                  <div
                    key={item.label}
                    className="px-3 py-2 rounded-xl bg-white/[0.06] border border-white/[0.12]"
                  >
                    <span className="text-sm text-white">{item.label}</span>
                    <span className="ml-2 text-[12px] font-semibold text-elec-yellow">
                      {item.where}
                    </span>
                  </div>
                ))}
              </div>
              {advisoryItems.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <p className="text-[12px] font-semibold text-white">
                    Worth checking — these do not stop you issuing
                  </p>
                  {advisoryItems.map((item) => (
                    <div
                      key={item.label}
                      className="px-3 py-2 rounded-xl border border-amber-400/25 bg-amber-400/[0.07]"
                    >
                      <span className="text-sm text-white">{item.label}</span>
                      <span className="ml-2 text-[12px] font-semibold text-amber-300">
                        {item.where}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowMissingSheet(false)}
                className={cn(secondaryBtnCn, 'w-full h-12 text-sm font-semibold')}
              >
                Got it
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* PDF generation sheet */}
      <Sheet open={showDialog} onOpenChange={setShowDialog}>
        <SheetContent side="bottom" className="bg-background border-white/[0.14] rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="text-white text-left">Generating EICR certificate</SheetTitle>
          </SheetHeader>
          {isGenerating && !pdfUrl && !generationError && (
            <div className="flex items-center gap-3 py-4 text-white">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Generating your professional EICR certificate...</span>
            </div>
          )}
          {pdfUrl && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">Certificate generated successfully</span>
              </div>
              <Button
                className="w-full h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold rounded-xl touch-manipulation"
                onClick={async () => {
                  if (pdfUrl) {
                    try {
                      const filename = `${formData.metadata?.certificate_number || formData.certificateNumber || 'certificate'}.pdf`;
                      await openOrDownloadPdf(pdfUrl, filename);

                      setShowDialog(false);

                      toast({
                        title: 'Certificate completed',
                        description: 'Your EICR certificate has been marked as completed.',
                      });
                    } catch (error) {
                      console.error('Download error:', error);
                      toast({
                        title: 'Download failed',
                        description: 'Please try again or check your internet connection.',
                        variant: 'destructive',
                      });
                    }
                  }
                }}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Download certificate
              </Button>
            </div>
          )}
          {generationError && (
            <div className="space-y-2 py-4">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm">Cloud generation failed</span>
              </div>
              <p className="text-sm text-white">Please check your connection and try again.</p>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Save customer dialog */}
      <CreateCustomerDialog
        open={showCustomerDialog}
        onOpenChange={setShowCustomerDialog}
        onConfirm={handleSaveCustomer}
        prefillData={{
          name: formData.clientName || '',
          email: formData.clientEmail || '',
          phone: formData.clientPhone || '',
          address: formData.installationAddress || '',
        }}
      />

      {/* Email certificate dialog */}
      <EmailCertificateDialog
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
        certificateType="EICR"
        certificateNumber={formData.certificateNumber}
        clientName={formData.clientName}
        clientEmail={formData.clientEmail}
        installationAddress={formData.installationAddress}
        inspectionDate={formData.inspectionDate}
        overallAssessment={formData.overallAssessment}
        companyName={formData.companyName}
        onSend={handleSendEmail}
        isLoading={isEmailSending}
      />

      {/* Quote options sheet */}
      <QuoteOptionsSheet
        open={showQuoteOptions}
        onOpenChange={setShowQuoteOptions}
        onAIEstimate={handleAIEstimate}
        onSendToQuote={handleSendToQuote}
      />

      {/* AI estimator sheet */}
      <AIEstimatorSheet
        open={showEstimatorSheet}
        onOpenChange={(open) => {
          if (!open) cancel();
          setShowEstimatorSheet(open);
        }}
        isEstimating={isEstimating}
        progressStep={progressStep}
        elapsedSeconds={elapsedSeconds}
        estimateResult={estimateResult}
        onUpdateItem={handleUpdateEstimateItem}
        onDeleteItem={handleDeleteEstimateItem}
        onUpdateScopeOfWorks={handleUpdateScopeOfWorks}
        onCreateQuote={handleEstimateToQuote}
        onCancel={() => {
          cancel();
          setShowEstimatorSheet(false);
        }}
      />
      <ReferralShareSheet
        open={showReferralPrompt}
        onOpenChange={(open) => !open && handleReferralClose()}
        context="post_cert_success"
      />
      <ObservationCodeHelpSheet
        open={showCodeHelp}
        onOpenChange={setShowCodeHelp}
        observations={formData.defectObservations || []}
      />
    </div>
  );
};

export default EICRSummary;
