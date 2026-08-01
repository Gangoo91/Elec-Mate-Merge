import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Bell, Mail, Loader2, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { saveCertificatePdf } from '@/utils/certificate-pdf-storage';
import { validateMinorWorksFormData, formatFieldForPdf } from '@/utils/minorWorksValidation';
import { createNotificationFromCertificate } from '@/utils/notificationHelper';
import { useNavigate } from 'react-router-dom';
import { createInvoiceFromCertificate } from '@/utils/certificateToQuote';
import { useMinorWorksSmartForm } from '@/hooks/useMinorWorksSmartForm';
import { generatePdfFilename } from '@/utils/pdfFilenameGenerator';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import PDFExportProgress from '@/components/PDFExportProgress';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Capacitor } from '@capacitor/core';
import QsReviewPanel from '@/components/inspection/shared/QsReviewPanel';
import { sharePdfBytesFromUrlToWhatsAppWeb } from '@/utils/share-pdf-to-whatsapp-web';
import { sharePdfFileNative, canShareFilesToWhatsApp } from '@/utils/share-pdf-file-native';

// Feature flag: set to true to use Gotenberg (v2), false to revert to PDF Monkey (v1)
const USE_GOTENBERG_PDF = false;

interface MinorWorksPdfGeneratorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  /** Called after a successful generate with the report_id the PDF was saved under. */
  onSuccess?: (savedReportId?: string) => void;
  onSaveDraft?: () => void | Promise<void>;
  onDuplicateForNextCircuit?: () => void;
  /** Fired when this component creates the report itself (generate/email before first save). */
  onReportIdChange?: (reportId: string) => void;
  /** Mutable ref the shell footer calls into — always holds the current handlers. */
  actionsRef?: React.MutableRefObject<{
    generate: () => void;
    email: () => void;
    invoice: () => void;
  } | null>;
  reportId?: string;
  userId?: string;
}

const MinorWorksPdfGenerator: React.FC<MinorWorksPdfGeneratorProps> = ({
  formData,
  onSuccess,
  onSaveDraft,
  onDuplicateForNextCircuit,
  onReportIdChange,
  actionsRef,
  reportId,
  userId,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState<
    'preparing' | 'generating' | 'complete' | 'error'
  >('preparing');

  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilenameForDialog, setPdfFilenameForDialog] = useState('MinorWorks-Certificate.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Email state
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);

  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get company branding for PDF
  const { loadCompanyBranding, hasSavedCompanyBranding } = useMinorWorksSmartForm();

  // --- Validation checks (matching EIC pattern) ---
  const hasClientAndDetails = !!(
    formData.clientName &&
    formData.propertyAddress &&
    formData.workDate
  );
  const hasDeclaration = !!(formData.electricianName && formData.signature);

  const canGenerateCertificate = hasClientAndDetails && hasDeclaration;

  // Build missing fields list
  const missingFields: string[] = [];
  if (!formData.clientName) missingFields.push('Client name');
  if (!formData.propertyAddress) missingFields.push('Property address');
  if (!formData.workDate) missingFields.push('Work date');
  if (!formData.electricianName) missingFields.push('Electrician name');
  if (!formData.signature) missingFields.push('Signature');

  // ELE-1377 — only offer WhatsApp where the device can attach the PDF file
  // (native app / mobile web). Desktop hides it — no raw-link fallback.
  const canWhatsApp = canShareFilesToWhatsApp();

  // --- Part P notification handler ---
  const handleNotificationCreation = async (savedReportId?: string) => {
    if (!formData.partPNotification) return;

    try {
      let currentUserId = userId;
      if (!currentUserId) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        currentUserId = user.id;
      }

      const currentReportId = savedReportId || reportId;
      if (!currentReportId || currentReportId === formData.certificateNumber) {
        console.warn('[Part P] Skipping notification — no valid report_id available yet');
        return;
      }

      console.log('Creating Part P notification for Minor Works certificate...');

      const result = await createNotificationFromCertificate(
        currentReportId,
        'minor-works',
        formData,
        currentUserId
      );

      if (result.success) {
        console.log('Part P notification created:', result.notificationId);
        queryClient.invalidateQueries({ queryKey: ['notifications'] });

        toast({
          title: 'Part P Notification Created',
          description: 'Notification created successfully. Submission required within 30 days.',
          action: (
            <Button size="sm" variant="outline" onClick={() => navigate('/?section=notifications')}>
              <Bell className="h-3 w-3 mr-1" />
              View Notifications
            </Button>
          ),
        });
      } else {
        console.error('Failed to create notification:', result.error);
        toast({
          title: 'Notification Creation Failed',
          description: result.error || 'Unable to create Part P notification.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Notification creation failed:', error);
      toast({
        title: 'Notification Error',
        description: 'An error occurred while creating the notification.',
        variant: 'destructive',
      });
    }
  };

  // Build the exact payload Generate sends to the edge function — branding
  // merge, PDF-safe logos, per-field formatting and the QS countersignature —
  // shared by Generate and Email so the email path can attach a PDF built
  // from the same data even before the user ever taps Generate.
  const buildFormattedPayload = async (savedReportId?: string) => {
    // Merge company branding into form data
    let dataWithBranding = { ...formData };
    if (hasSavedCompanyBranding) {
      const branding = loadCompanyBranding();
      if (branding) {
        dataWithBranding = {
          ...dataWithBranding,
          companyLogo: branding.companyLogo || dataWithBranding.companyLogo || '',
          companyName:
            branding.companyName ||
            dataWithBranding.companyName ||
            dataWithBranding.contractorName ||
            '',
          companyAddress:
            branding.companyAddress ||
            dataWithBranding.companyAddress ||
            dataWithBranding.contractorAddress ||
            '',
          companyPhone: branding.companyPhone || dataWithBranding.companyPhone || '',
          companyEmail: branding.companyEmail || dataWithBranding.companyEmail || '',
          brandingTagline: branding.companyTagline || dataWithBranding.brandingTagline || '',
          brandingAccentColor:
            branding.companyAccentColor || dataWithBranding.brandingAccentColor || '#d69e2e',
          brandingWebsite: branding.companyWebsite || dataWithBranding.brandingWebsite || '',
          schemeLogo: branding.registrationSchemeLogo || dataWithBranding.schemeLogo || '',
        };
      }
    }

    // ELE-876 — resolve scheme + company logos to PDF-safe data URLs before
    // the edge function receives them. Relative paths like
    // `/logos/schemes/niceic.png` would otherwise render as broken images
    // in PDFMonkey because it can't fetch our static asset paths.
    const { resolveSchemeLogo, resolveCompanyLogo } = await import(
      '@/utils/resolveSchemeLogo'
    );
    const resolvedSchemeLogo = await resolveSchemeLogo(
      dataWithBranding.schemeLogoDataUrl ||
        dataWithBranding.registrationSchemeLogo ||
        dataWithBranding.schemeLogo,
      dataWithBranding.registrationScheme || dataWithBranding.schemeProvider
    );
    const resolvedCompanyLogo = await resolveCompanyLogo(
      dataWithBranding.companyLogo
    );
    dataWithBranding = {
      ...dataWithBranding,
      schemeLogo: resolvedSchemeLogo,
      schemeLogoDataUrl: resolvedSchemeLogo,
      registrationSchemeLogo: resolvedSchemeLogo,
      companyLogo: resolvedCompanyLogo,
    };

    // Format form data for better PDF presentation
    const formattedFormData = { ...dataWithBranding };
    Object.keys(formattedFormData).forEach((key) => {
      if (formattedFormData[key]) {
        formattedFormData[key] = formatFieldForPdf(key, formattedFormData[key]);
      }
    });

    // Qualifying Supervisor countersignature — included in the payload when
    // the latest QS review is approved (rendered once the template has a QS
    // block; unknown keys are ignored by PDFMonkey until then).
    const { getLatestApprovedQsReview, formatQsReviewDate } = await import(
      '@/utils/qsReviewPdf'
    );
    const qsReview = savedReportId ? await getLatestApprovedQsReview(savedReportId) : null;
    if (qsReview) {
      formattedFormData.qsName = qsReview.reviewer_name;
      formattedFormData.qsSignature = qsReview.qs_signature;
      formattedFormData.qsPosition = qsReview.qs_position;
      formattedFormData.qsDate = formatQsReviewDate(qsReview.reviewed_at);
    }

    return formattedFormData;
  };

  // --- PDF generation ---
  const handleGeneratePDF = async () => {
    if (!canGenerateCertificate) {
      toast({
        title: 'Cannot Generate Certificate',
        description:
          missingFields.length > 0
            ? `Missing: ${missingFields.join(', ')}. Complete the required fields first.`
            : 'Please complete all required sections before generating.',
        variant: 'destructive',
      });
      return;
    }

    // Validate form data before generation
    const validation = validateMinorWorksFormData(formData);

    if (!validation.isValid) {
      toast({
        title: 'Form Validation Failed',
        description: `Please fix ${validation.errors.length} error(s): ${validation.errors[0]?.message}`,
        variant: 'destructive',
      });
      return;
    }

    if (validation.warnings.length > 0) {
      toast({
        title: `${validation.warnings.length} Warning(s)`,
        description: validation.warnings[0]?.message,
        variant: 'default',
      });
    }

    // Per-company "QS approval required before issue" gate
    const { checkQsIssueGate, qsGateMessage } = await import('@/utils/qsGate');
    const gate = await checkQsIssueGate(reportId);
    if (gate.blocked) {
      toast({
        title: 'QS approval required',
        description: qsGateMessage(gate.companyName),
        variant: 'destructive',
      });
      return;
    }

    setIsExporting(true);
    setExportStatus('preparing');
    setExportProgress(0);
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerationDialog(true);

    try {
      setExportProgress(10);

      // Step 1: Ensure report is saved to database first
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { reportCloud } = await import('@/utils/reportCloud');

      const existingReport = reportId
        ? await reportCloud.getReportByReportId(reportId, user.id)
        : null;
      let savedReportId = reportId;

      if (!existingReport) {
        const createResult = await reportCloud.createReport(user.id, 'minor-works', formData);
        if (!createResult.success || !createResult.reportId) {
          throw new Error('Failed to save report before generating PDF');
        }
        savedReportId = createResult.reportId;
        onReportIdChange?.(savedReportId);
      } else {
        if (savedReportId) {
          await reportCloud.updateReport(savedReportId, user.id, formData);
        }
      }

      setExportProgress(20);

      // Get saved template ID from settings
      const { offlineStorage: offlineStorageModule } = await import('@/utils/offlineStorage');
      const credentials = await offlineStorageModule.getApiCredentials('pdfMonkey');
      const savedTemplateId = credentials.templateId;

      setExportProgress(30);
      setExportStatus('generating');

      // Branding merge + logo resolution + field formatting + QS block
      const formattedFormData = await buildFormattedPayload(savedReportId);

      // Save formatted payload for email/reports page reuse
      if (savedReportId) {
        await supabase
          .from('reports')
          .update({ pdf_payload: formattedFormData })
          .eq('report_id', savedReportId);
      }

      const functionName = USE_GOTENBERG_PDF
        ? 'generate-minor-works-pdf-v2'
        : 'generate-minor-works-pdf';

      const { data: functionData, error: functionError } = await supabase.functions.invoke(
        functionName,
        {
          body: USE_GOTENBERG_PDF
            ? { formData: formattedFormData }
            : { formData: formattedFormData, templateId: savedTemplateId },
        }
      );

      setExportProgress(70);

      if (functionError) {
        console.error('[MinorWorks PDF] Edge function error:', functionError);
        throw new Error(functionError.message || 'Failed to generate PDF');
      }

      if (!functionData?.success || !functionData?.pdfUrl) {
        throw new Error(functionData?.error || 'No PDF URL returned');
      }

      setExportProgress(80);

      // Save PDF to permanent Supabase Storage
      let permanentUrl = functionData.pdfUrl;
      let storagePath: string | null = null;

      if (USE_GOTENBERG_PDF) {
        // v2 already uploaded to Storage — URL is permanent
        permanentUrl = functionData.pdfUrl;
        storagePath = functionData.storagePath || null;
      } else {
        // Legacy v1: download from PDF Monkey temp URL and re-upload
        try {
          const storageResult = await saveCertificatePdf(
            functionData.pdfUrl,
            user.id,
            savedReportId || '',
            formData.certificateNumber
          );
          permanentUrl = storageResult.permanentUrl;
          storagePath = storageResult.storagePath;
        } catch (storageError) {
          console.error('[MinorWorks PDF] Failed to save PDF permanently:', storageError);
        }
      }

      setExportProgress(85);

      // Save PDF URL to database
      if (savedReportId) {
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
          .eq('report_id', savedReportId);

        if (updateError) {
          console.error('[MinorWorks PDF] Failed to save PDF URL:', updateError);
        }
      }

      setExportProgress(90);

      // Download the PDF
      const filename = generatePdfFilename(
        'MinorWorks',
        formData.certificateNumber || 'MW',
        formData.clientName || formData.propertyAddress || 'Client',
        formData.workDate || new Date()
      );

      setGeneratedPdfUrl(permanentUrl);
      setPdfFilenameForDialog(filename);

      setExportProgress(100);
      setExportStatus('complete');

      toast({
        title: 'Certificate Generated',
        description: storagePath
          ? 'Your certificate has been generated and saved permanently.'
          : 'Your certificate has been generated and downloaded.',
      });

      onSuccess?.(savedReportId ?? undefined);
      await handleNotificationCreation(savedReportId ?? undefined);

      queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
      queryClient.invalidateQueries({ queryKey: ['my-reports'] });
    } catch (error) {
      console.error('PDF generation error:', error);
      const msg = error instanceof Error ? error.message : 'Export failed';
      setGenerationError(msg);
      setExportStatus('error');
      toast({
        title: 'Export Failed',
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

  // --- Save draft handler ---
  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft();
      toast({
        title: 'Draft Saved',
        description: 'Your Minor Works progress has been saved successfully.',
      });
    }
  };

  // --- Email handler ---
  const handleEmailCertificate = () => {
    if (!canGenerateCertificate) {
      toast({
        title: 'Cannot Email Certificate',
        description: 'Please complete all required sections first.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.clientEmail) {
      setEmailRecipient(formData.clientEmail);
    }
    setShowEmailDialog(true);
  };

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSendingEmail(true);

    try {
      // Flush the latest form data to the report BEFORE the edge function
      // compares updated_at vs pdf_generated_at — otherwise edits made after
      // Generate but before the 30s cloud sync would silently attach a stale
      // cached PDF. Creates the report first if it has never been saved
      // (mirrors the Generate path).
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('You must be signed in to email certificates.');
      }

      const { reportCloud } = await import('@/utils/reportCloud');
      let savedReportId = reportId;
      const existingReport = reportId
        ? await reportCloud.getReportByReportId(reportId, user.id)
        : null;
      if (existingReport && savedReportId) {
        await reportCloud.updateReport(savedReportId, user.id, formData);
      } else {
        const createResult = await reportCloud.createReport(user.id, 'minor-works', formData);
        if (!createResult.success || !createResult.reportId) {
          throw new Error('Failed to save the certificate before emailing.');
        }
        savedReportId = createResult.reportId;
        onReportIdChange?.(savedReportId);
      }

      // Send the formatted payload so the function can generate + attach the
      // PDF even when the user emails before ever tapping Generate.
      let formattedData: Record<string, unknown> | undefined;
      try {
        formattedData = await buildFormattedPayload(savedReportId);
        if (!formattedData.certificateNumber) {
          formattedData.certificateNumber = `MW-${Date.now()}`;
        }
      } catch {
        formattedData = undefined; // fall back to server-side pdf_payload
      }

      // Custom PDFMonkey template — same lookup the Generate path uses, so
      // emailing doesn't silently fall back to the default template.
      const { offlineStorage } = await import('@/utils/offlineStorage');
      const credentials = await offlineStorage.getApiCredentials('pdfMonkey');

      const { data: result, error: fnError } = await supabase.functions.invoke(
        'send-certificate-resend',
        {
          body: {
            reportId: savedReportId,
            recipientEmail: emailRecipient,
            formattedData,
            templateId: credentials.templateId || undefined,
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

      toast({
        title: 'Certificate Sent',
        description: result?.pdfAttached
          ? `Minor Works certificate sent to ${emailRecipient} with the PDF attached`
          : `Minor Works certificate sent successfully to ${emailRecipient}`,
      });

      setShowEmailDialog(false);
      setEmailRecipient('');
    } catch (error) {
      toast({
        title: 'Email Failed',
        description: error instanceof Error ? error.message : 'Failed to send certificate email.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  // --- WhatsApp handler ---
  const handleWhatsApp = async () => {
    if (!canGenerateCertificate) return;
    setIsSendingWhatsApp(true);
    try {
      const { data: report } = await supabase
        .from('reports')
        .select('pdf_url, pdf_generated_at')
        .eq('report_id', reportId || '')
        .single();

      if (!report?.pdf_url) {
        toast({
          title: 'No PDF Generated',
          description: 'Please generate the Minor Works PDF first before sharing via WhatsApp.',
          variant: 'destructive',
        });
        return;
      }

      const certRef = formData.certificateNumber || 'MW';
      const clientName = formData.clientName || '';
      const address = formData.propertyAddress || 'your property';
      const clientPhone = formData.clientPhone || '';

      if (Capacitor.isNativePlatform()) {
        // ELE-1377 — attach the actual PDF via the native share sheet. The old
        // path put the signed pdf_url in a wa.me text link, which dumped a raw
        // URL into the chat (the broken behaviour). No link fallback.
        const nativeText = `Hi ${clientName},\n\nPlease find attached your Minor Works Certificate (${certRef}) for ${address}.\n\nKind regards`;
        const shared = await sharePdfFileNative({
          pdfUrl: report.pdf_url,
          filename: `Minor-Works-Certificate-${certRef}.pdf`,
          title: `Minor Works Certificate ${certRef}`,
          text: nativeText,
        });
        if (!shared) {
          toast({
            title: 'Could not open share sheet',
            description: 'Please try again, or use the generated PDF to attach it yourself.',
            variant: 'destructive',
          });
        }
        return;
      }

      // Web: attach the actual PDF, never a link in the body
      const webText = `Hi ${clientName},\n\nPlease find your Minor Works Certificate (${certRef}) for ${address}.\n\nKind regards`;

      const result = await sharePdfBytesFromUrlToWhatsAppWeb({
        pdfUrl: report.pdf_url,
        filename: `Minor-Works-Certificate-${certRef}.pdf`,
        message: webText,
        recipientPhone: clientPhone || undefined,
        title: `Minor Works Certificate ${certRef}`,
      });

      toast({
        title: result.mode === 'web-share' ? 'Opening share sheet' : 'PDF downloaded',
        description:
          result.mode === 'web-share'
            ? 'Pick WhatsApp to send the PDF.'
            : 'PDF saved to your Downloads — attach it from your WhatsApp chat.',
      });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      console.error('[MW WhatsApp] Error:', err);
      toast({
        title: 'WhatsApp Error',
        description: 'Failed to prepare WhatsApp message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSendingWhatsApp(false);
    }
  };

  // --- Invoice handler ---
  const handleCreateInvoice = () => {
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.propertyAddress || '',
      installationAddress: formData.propertyAddress || '',
      certificateType: 'Minor Works',
      certificateReference: formData.certificateNumber || '',
      reportId: reportId || undefined,
      pdfUrl: generatedPdfUrl || formData.pdfUrl || undefined,
    });
    navigate(url);
  };

  // Keep the footer's handle current every render — closures capture live state,
  // and the isExporting guard covers double-taps from the thumb-zone button.
  if (actionsRef) {
    actionsRef.current = {
      generate: () => {
        if (!isExporting) handleGeneratePDF();
      },
      email: handleEmailCertificate,
      invoice: handleCreateInvoice,
    };
  }

  return (
    <>
      <div
        className={cn(
          'space-y-5',
          isMobile ? '' : 'rounded-xl border border-white/10 bg-white/[0.02] p-5'
        )}
      >
        {/* Generate button — completion state lives in the shell header ring/step ticks */}
        <button
          type="button"
          onClick={handleGeneratePDF}
          disabled={!canGenerateCertificate || isExporting}
          className="h-12 w-full touch-manipulation bg-elec-yellow text-black font-semibold text-sm rounded-lg active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isExporting ? 'Generating...' : 'Generate Minor Works PDF'}
        </button>

        {/* Secondary Actions */}
        <div className={`grid ${canWhatsApp ? 'grid-cols-4' : 'grid-cols-3'} gap-1`}>
          <button
            type="button"
            onClick={handleSaveDraft}
            className="h-12 touch-manipulation bg-white/[0.05] border border-white/[0.08] text-white rounded-lg active:scale-[0.98] flex items-center justify-center text-[10px] font-semibold"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleEmailCertificate}
            disabled={!canGenerateCertificate}
            className="h-12 touch-manipulation bg-white/[0.05] border border-white/[0.08] text-white rounded-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center text-[10px] font-semibold"
          >
            Email
          </button>
          {canWhatsApp && (
            <button
              type="button"
              onClick={handleWhatsApp}
              disabled={!canGenerateCertificate || isSendingWhatsApp}
              className="h-12 touch-manipulation bg-white/[0.05] border border-white/[0.08] text-white rounded-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-1 text-[10px] font-semibold"
            >
              {isSendingWhatsApp ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <MessageCircle className="h-3 w-3" />
              )}
              Share
            </button>
          )}
          <button
            type="button"
            onClick={handleCreateInvoice}
            disabled={!canGenerateCertificate}
            className="h-12 touch-manipulation bg-white/[0.05] border border-elec-yellow/30 text-elec-yellow rounded-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center text-[10px] font-semibold"
          >
            Invoice
          </button>
        </div>

        {/* Qualifying Supervisor review (team members only) */}
        <QsReviewPanel reportId={reportId} reportType="minor-works" onBeforeSubmit={onSaveDraft} />

        {/* Duplicate for next circuit */}
        {onDuplicateForNextCircuit && (
          <button
            type="button"
            onClick={onDuplicateForNextCircuit}
            className="w-full h-12 rounded-lg font-semibold text-xs bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98]"
          >
            New Cert for Another Circuit (Same Job)
          </button>
        )}
      </div>

      <PDFExportProgress
        isOpen={isExporting}
        onClose={() => setIsExporting(false)}
        exportType="complete"
        progress={exportProgress}
        status={exportStatus}
        certificateType="Minor Works"
      />

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md overflow-hidden">
          <DialogHeader className="text-left">
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-elec-yellow shrink-0" />
              Email Minor Works Certificate
            </DialogTitle>
            <DialogDescription className="text-left">
              The certificate will be generated and sent as a PDF attachment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 min-w-0">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Recipient Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="off"
                placeholder="client@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
                className="h-12 text-base text-left touch-manipulation w-full"
              />
            </div>
            {formData.clientEmail && emailRecipient !== formData.clientEmail && (
              <button
                type="button"
                onClick={() => setEmailRecipient(formData.clientEmail)}
                className="w-full h-11 flex items-center gap-2 px-3 text-sm touch-manipulation border border-white/20 rounded-lg text-white hover:bg-white/5 active:scale-[0.98] transition-transform overflow-hidden"
              >
                <Mail className="h-4 w-4 text-elec-yellow shrink-0" />
                <span className="truncate">Use Client Email: {formData.clientEmail}</span>
              </button>
            )}
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
              className="h-12 w-full touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-xl active:scale-[0.98] transition-transform"
            >
              {isSendingEmail ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Certificate
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
              className="h-11 w-full touch-manipulation text-white hover:bg-white/5"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={isExporting}
        pdfUrl={generatedPdfUrl}
        pdfFilename={pdfFilenameForDialog}
        errorMessage={generationError}
        documentLabel="Certificate"
      />
    </>
  );
};

export default MinorWorksPdfGenerator;
