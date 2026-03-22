import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  CheckCircle,
  Download,
  AlertTriangle,
  Clock,
  Bell,
  Mail,
  Loader2,
  Save,
  FileText,
  Receipt,
  MessageCircle,
} from 'lucide-react';
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
import { useHaptics } from '@/hooks/useHaptics';
import { cn } from '@/lib/utils';
import { openExternalUrl } from '@/utils/open-external-url';

// Feature flag: set to true to use Gotenberg (v2), false to revert to PDF Monkey (v1)
const USE_GOTENBERG_PDF = false;

interface MinorWorksPdfGeneratorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  isFormValid: boolean;
  onSuccess?: () => void;
  onSaveDraft?: () => void;
  reportId?: string;
  userId?: string;
}

const MinorWorksPdfGenerator: React.FC<MinorWorksPdfGeneratorProps> = ({
  formData,
  isFormValid,
  onSuccess,
  onSaveDraft,
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
  const haptics = useHaptics();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get company branding for PDF
  const { loadCompanyBranding, hasSavedCompanyBranding } = useMinorWorksSmartForm();

  // Check if PDF Monkey is configured
  const [hasCustomTemplate, setHasCustomTemplate] = useState(false);

  useEffect(() => {
    (async () => {
      const { offlineStorage } = await import('@/utils/offlineStorage');
      const credentials = await offlineStorage.getApiCredentials('pdfMonkey');
      setHasCustomTemplate(!!(credentials.apiKey && credentials.templateId));
    })();
  }, []);

  // --- Validation checks (matching EIC pattern) ---
  const hasClientAndDetails = !!(
    formData.clientName &&
    formData.propertyAddress &&
    formData.workDate
  );
  const hasCircuitDetails = !!(formData.distributionBoard && formData.circuitDesignation);
  const hasTestResults = !!(
    (formData.continuityR1R2 || formData.r2Continuity) &&
    formData.polarity
  );
  const hasDeclaration = !!(formData.electricianName && formData.signature);

  const canGenerateCertificate = hasClientAndDetails && hasDeclaration;
  const isFullyComplete = canGenerateCertificate && hasCircuitDetails && hasTestResults;

  // Build missing fields list
  const missingFields: string[] = [];
  if (!formData.clientName) missingFields.push('Client name');
  if (!formData.propertyAddress) missingFields.push('Property address');
  if (!formData.workDate) missingFields.push('Work date');
  if (!formData.electricianName) missingFields.push('Electrician name');
  if (!formData.signature) missingFields.push('Signature');

  const completionSections = [
    { label: 'Client & Details', done: hasClientAndDetails },
    { label: 'Circuit Details', done: hasCircuitDetails },
    { label: 'Test Results', done: hasTestResults },
    { label: 'Declaration', done: hasDeclaration },
  ];

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

      // Format form data for better PDF presentation
      const formattedFormData = { ...dataWithBranding };
      Object.keys(formattedFormData).forEach((key) => {
        if (formattedFormData[key]) {
          formattedFormData[key] = formatFieldForPdf(key, formattedFormData[key]);
        }
      });

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

      onSuccess?.();
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

    const currentReportId = reportId || formData.certificateNumber;
    if (!reportId) {
      toast({
        title: 'Save Required',
        description:
          "Please save the certificate first before emailing. Click 'Save Draft' then try again.",
        variant: 'destructive',
      });
      return;
    }

    setIsSendingEmail(true);

    try {
      const { data: result, error: fnError } = await supabase.functions.invoke(
        'send-certificate-resend',
        {
          body: {
            reportId: currentReportId,
            recipientEmail: emailRecipient,
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
        description: `Minor Works certificate sent successfully to ${emailRecipient}`,
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

      const text = `Hi ${clientName},\n\nPlease find your Minor Works Certificate (${certRef}) for ${address}.\n\nDownload your certificate:\n${report.pdf_url}\n\nKind regards`;

      let whatsappUrl: string;
      const clientPhone = formData.clientPhone || '';
      if (clientPhone && (clientPhone.startsWith('+44') || clientPhone.startsWith('44'))) {
        const cleanPhone = clientPhone.replace(/\s/g, '').replace(/^44/, '+44');
        whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(text)}`;
      } else {
        whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      }

      await openExternalUrl(whatsappUrl);
    } catch (err) {
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
    });
    navigate(url);
  };

  return (
    <>
      <div
        className={cn(
          'space-y-5',
          isMobile ? '' : 'rounded-xl border border-white/10 bg-white/[0.02] p-5'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 text-elec-yellow" />
            </div>
            <h3 className="font-semibold text-white">Certificate Actions</h3>
          </div>
          <Badge
            className={cn(
              'gap-1.5 border',
              isFullyComplete
                ? 'bg-green-500/15 text-green-400 border-green-500/30'
                : canGenerateCertificate
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  : 'bg-white/5 text-white border-white/20'
            )}
          >
            {isFullyComplete ? (
              <>
                <CheckCircle className="h-3 w-3" /> Complete
              </>
            ) : canGenerateCertificate ? (
              <>
                <Clock className="h-3 w-3" /> Ready
              </>
            ) : (
              <>
                <AlertTriangle className="h-3 w-3" /> Incomplete
              </>
            )}
          </Badge>
        </div>

        {/* Section Completion */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white">Section Completion</h4>
          <div className="space-y-2">
            {completionSections.map((section) => (
              <div key={section.label} className="flex items-center gap-2.5">
                {section.done ? (
                  <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                ) : (
                  <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                )}
                <span className={cn('text-sm', section.done ? 'text-green-400' : 'text-white')}>
                  {section.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Warning */}
        {!canGenerateCertificate && (
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-400 mb-2">
                  Required sections incomplete:
                </p>
                <ul className="space-y-1.5">
                  {!hasClientAndDetails && (
                    <li className="text-sm text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      Complete client name, property address, and work date
                    </li>
                  )}
                  {!hasDeclaration && (
                    <li className="text-sm text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      Complete electrician name and signature
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Primary Action */}
        <Button
          onClick={handleGeneratePDF}
          disabled={!canGenerateCertificate || isExporting}
          className="h-14 w-full touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-base rounded-xl active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          <Download className="h-5 w-5 mr-2" />
          {isExporting ? 'Generating...' : 'Generate Minor Works PDF'}
        </Button>

        {/* Secondary Actions — 2x2 grid */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleSaveDraft}
            variant="outline"
            className="h-12 touch-manipulation border-white/20 text-white hover:bg-white/5 rounded-xl active:scale-[0.98] transition-transform"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>

          <Button
            onClick={handleEmailCertificate}
            variant="outline"
            disabled={!canGenerateCertificate}
            className="h-12 touch-manipulation border-white/20 text-white hover:bg-white/5 rounded-xl active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Certificate
          </Button>

          <Button
            onClick={handleWhatsApp}
            variant="outline"
            disabled={!canGenerateCertificate || isSendingWhatsApp}
            className="h-12 touch-manipulation border-green-500/30 text-green-400 hover:bg-green-500/10 rounded-xl active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {isSendingWhatsApp ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <MessageCircle className="h-4 w-4 mr-2" />
            )}
            WhatsApp
          </Button>

          <Button
            onClick={handleCreateInvoice}
            variant="outline"
            disabled={!canGenerateCertificate}
            className="h-12 touch-manipulation border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 rounded-xl active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            <Receipt className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>
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
