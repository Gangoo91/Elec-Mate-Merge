import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Download,
  Save,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Loader2,
  Receipt,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { supabase } from '@/integrations/supabase/client';
import { saveCertificatePdf } from '@/utils/certificate-pdf-storage';
import { formatEicJson } from '@/utils/eicJsonFormatter';
import { createInvoiceFromCertificate } from '@/utils/certificateToQuote';
import PDFExportProgress from '@/components/PDFExportProgress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';

const SectionTitle = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

interface EICCertificateActionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  reportId: string;
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate?: (field: string, value: any) => void;
}

const EICCertificateActions: React.FC<EICCertificateActionsProps> = ({
  formData,
  reportId,
  onGenerateCertificate,
  onSaveDraft,
  onUpdate,
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const { toast } = useToast();
  const { companyProfile } = useCompanyProfile();
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState<
    'preparing' | 'generating' | 'complete' | 'error'
  >('preparing');
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Validation checks
  const hasRequiredInstallationDetails =
    formData.clientName && formData.installationAddress && formData.installationDate;
  const hasRequiredDeclarations =
    formData.designerName &&
    formData.designerSignature &&
    formData.constructorName &&
    formData.constructorSignature &&
    formData.inspectorName &&
    formData.inspectorSignature;
  // Check for completed inspections - either via inspections object (legacy) or inspectionItems array (current)
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

  const canGenerateCertificate = hasRequiredInstallationDetails && hasRequiredDeclarations;
  const isFullyComplete = canGenerateCertificate && hasCompletedInspections && hasTestResults;

  // Build a human-readable list of what's blocking generation
  const missingFields: string[] = [];
  if (!formData.clientName) missingFields.push('Client name');
  if (!formData.installationAddress) missingFields.push('Installation address');
  if (!formData.installationDate) missingFields.push('Installation date');
  if (!formData.designerName) missingFields.push('Designer name');
  if (!formData.designerSignature) missingFields.push('Designer signature');
  if (!formData.constructorName) missingFields.push('Constructor name');
  if (!formData.constructorSignature) missingFields.push('Constructor signature');
  if (!formData.inspectorName) missingFields.push('Inspector name');
  if (!formData.inspectorSignature) missingFields.push('Inspector signature');

  const handleGeneratePDF = async () => {
    if (!canGenerateCertificate) {
      haptic.warning();
      toast({
        title: 'Cannot Generate Certificate',
        description:
          missingFields.length > 0
            ? `Missing: ${missingFields.join(', ')}. Complete the Declarations section — all three signatures are required.`
            : 'Please complete all required sections before generating the EIC.',
        variant: 'destructive',
      });
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

      // Download the PDF — uses native share sheet on iOS, blob download on web
      const { openOrDownloadPdf } = await import('@/utils/pdf-download');
      await openOrDownloadPdf(permanentUrl, filename);

      setExportProgress(100);
      setExportStatus('complete');

      haptic.success();
      toast({
        title: 'EIC Generated Successfully',
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

  const handleSaveDraft = () => {
    haptic.success();
    onSaveDraft();
    toast({
      title: 'Draft Saved',
      description: 'Your EIC progress has been saved successfully.',
    });
  };

  const handleEmailCertificate = () => {
    if (!canGenerateCertificate) {
      haptic.warning();
      toast({
        title: 'Cannot Email Certificate',
        description: 'Please complete all required sections first.',
        variant: 'destructive',
      });
      return;
    }

    haptic.light();
    // Pre-fill with client email if available
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
      // Call the Resend-based edge function to generate PDF and send email
      const { data: result, error: fnError } = await supabase.functions.invoke(
        'send-certificate-resend',
        {
          body: {
            reportId: reportId,
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

      haptic.success();
      toast({
        title: 'Certificate Sent',
        description: `EIC certificate sent successfully to ${emailRecipient}`,
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

  const completionSections = [
    { label: 'Installation Details', done: hasRequiredInstallationDetails },
    { label: 'Schedule of Inspections', done: hasCompletedInspections },
    { label: 'Schedule of Testing', done: hasTestResults },
    { label: 'Declarations & Signatures', done: hasRequiredDeclarations },
  ];

  return (
    <>
      <div className="space-y-4">
        {/* Section Completion — compact row */}
        <div className="grid grid-cols-4 gap-1">
          {completionSections.map((section) => (
            <div
              key={section.label}
              className={cn(
                'h-9 rounded-lg flex items-center justify-center text-[9px] font-semibold',
                section.done
                  ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                  : 'bg-white/[0.05] border border-white/[0.08] text-white'
              )}
            >
              {section.done ? '✓' : '○'} {section.label.split(' ')[0]}
            </div>
          ))}
        </div>

        {/* Validation — inline */}
        {!canGenerateCertificate && (
          <p className="text-[10px] text-elec-yellow">
            {!hasRequiredInstallationDetails && 'Complete client details. '}
            {!hasRequiredDeclarations && 'Complete all declarations with signatures.'}
          </p>
        )}

        {/* Generate button */}
        <button
          type="button"
          onClick={handleGeneratePDF}
          disabled={!canGenerateCertificate || isExporting}
          className="h-12 w-full touch-manipulation bg-elec-yellow text-black font-semibold text-sm rounded-lg active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isExporting ? 'Generating...' : 'Generate EIC PDF'}
        </button>

        {/* Secondary Actions */}
        <div className="grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="h-10 touch-manipulation bg-white/[0.05] border border-white/[0.08] text-white rounded-lg active:scale-[0.98] flex items-center justify-center text-[10px] font-semibold"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleEmailCertificate}
            disabled={!canGenerateCertificate}
            className="h-10 touch-manipulation bg-white/[0.05] border border-white/[0.08] text-white rounded-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center text-[10px] font-semibold"
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => {
              const url = createInvoiceFromCertificate({
                clientName: formData.clientName || '',
                clientEmail: formData.clientEmail || '',
                clientPhone: formData.clientPhone || '',
                clientAddress: formData.clientAddress || '',
                installationAddress: formData.installationAddress || '',
                certificateType: 'EIC',
                certificateReference: formData.certificateNumber || '',
                reportId: reportId,
              });
              navigate(url);
            }}
            disabled={!canGenerateCertificate}
            className="h-10 touch-manipulation bg-white/[0.05] border border-elec-yellow/30 text-elec-yellow rounded-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center text-[10px] font-semibold"
          >
            Invoice
          </button>
        </div>
      </div>

      <PDFExportProgress
        isOpen={isExporting}
        onClose={() => setIsExporting(false)}
        exportType="complete"
        progress={exportProgress}
        status={exportStatus}
        certificateType="EIC"
      />

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md overflow-hidden bg-white/[0.03] border border-white/[0.06]">
          <DialogHeader className="text-left">
            <DialogTitle className="flex items-center gap-2 text-white">
              <Mail className="h-5 w-5 text-elec-yellow shrink-0" />
              Email EIC Certificate
            </DialogTitle>
            <DialogDescription className="text-left text-white">
              The certificate will be generated and sent as a PDF attachment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 min-w-0">
            <div className="space-y-2">
              <label htmlFor="email" className="text-white text-xs font-medium">
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
                className="h-12 text-base text-left touch-manipulation w-full bg-white/[0.06] border-white/[0.08] text-white"
              />
            </div>
            {formData.clientEmail && emailRecipient !== formData.clientEmail && (
              <button
                type="button"
                onClick={() => setEmailRecipient(formData.clientEmail)}
                className="w-full h-11 flex items-center gap-2 px-3 text-sm touch-manipulation border border-white/[0.08] rounded-lg text-white hover:bg-white/[0.05] active:scale-[0.98] transition-transform overflow-hidden"
              >
                <Mail className="h-4 w-4 text-elec-yellow shrink-0" />
                <span className="truncate">Use Client Email: {formData.clientEmail}</span>
              </button>
            )}
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
              className="h-12 w-full touch-manipulation bg-elec-yellow text-black font-semibold rounded-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              {isSendingEmail ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4" />
                  Send Certificate
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
              className="h-11 w-full touch-manipulation text-white hover:bg-white/[0.05] rounded-xl"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EICCertificateActions;
