import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  MessageCircle,
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
import { useHaptics } from '@/hooks/useHaptics';
import { cn } from '@/lib/utils';
import { openExternalUrl } from '@/utils/open-external-url';

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
  const haptics = useHaptics();
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
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);

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

      // Download the PDF for the user - add cache-busting to prevent stale downloads
      const cacheBustUrl = `${permanentUrl}?t=${Date.now()}`;
      const response = await fetch(cacheBustUrl, { cache: 'no-store' });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up blob URL
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

      setExportProgress(100);
      setExportStatus('complete');

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
    onSaveDraft();
    toast({
      title: 'Draft Saved',
      description: 'Your EIC progress has been saved successfully.',
    });
  };

  const handleEmailCertificate = () => {
    if (!canGenerateCertificate) {
      toast({
        title: 'Cannot Email Certificate',
        description: 'Please complete all required sections first.',
        variant: 'destructive',
      });
      return;
    }

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
                  {!hasRequiredInstallationDetails && (
                    <li className="text-sm text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      Complete client name, installation address, and installation date
                    </li>
                  )}
                  {!hasRequiredDeclarations && (
                    <li className="text-sm text-white flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      Complete all three declarations with names and signatures
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
          {isExporting ? 'Generating...' : 'Generate EIC PDF'}
        </Button>

        {/* Secondary Actions */}
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
            onClick={async () => {
              if (!canGenerateCertificate) return;
              setIsSendingWhatsApp(true);
              try {
                // Fetch the PDF URL from the reports table
                const { data: report } = await supabase
                  .from('reports')
                  .select('pdf_url, pdf_generated_at')
                  .eq('report_id', reportId)
                  .single();

                if (!report?.pdf_url) {
                  toast({
                    title: 'No PDF Generated',
                    description: 'Please generate the EIC PDF first before sharing via WhatsApp.',
                    variant: 'destructive',
                  });
                  return;
                }

                const certRef = formData.certificateNumber || 'EIC';
                const clientName = formData.clientName || '';
                const address = formData.installationAddress || 'your property';

                const text = `Hi ${clientName},\n\nPlease find your Electrical Installation Certificate (${certRef}) for ${address}.\n\nDownload your certificate:\n${report.pdf_url}\n\nKind regards`;

                // Build WhatsApp URL — use client phone if available
                let whatsappUrl: string;
                const clientPhone = formData.clientPhone || '';
                if (
                  clientPhone &&
                  (clientPhone.startsWith('+44') || clientPhone.startsWith('44'))
                ) {
                  const cleanPhone = clientPhone.replace(/\s/g, '').replace(/^44/, '+44');
                  whatsappUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(text)}`;
                } else {
                  whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
                }

                await openExternalUrl(whatsappUrl);
              } catch (err) {
                console.error('[EIC WhatsApp] Error:', err);
                toast({
                  title: 'WhatsApp Error',
                  description: 'Failed to prepare WhatsApp message. Please try again.',
                  variant: 'destructive',
                });
              } finally {
                setIsSendingWhatsApp(false);
              }
            }}
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
            onClick={() => {
              const url = createInvoiceFromCertificate({
                clientName: formData.clientName || '',
                clientEmail: formData.clientEmail || '',
                clientPhone: formData.clientPhone || '',
                clientAddress: formData.clientAddress || formData.clientAddress || '',
                installationAddress: formData.installationAddress || '',
                certificateType: 'EIC',
                certificateReference: formData.certificateNumber || '',
                reportId: reportId,
              });
              navigate(url);
            }}
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
        certificateType="EIC"
      />

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-md overflow-hidden">
          <DialogHeader className="text-left">
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-elec-yellow shrink-0" />
              Email EIC Certificate
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
    </>
  );
};

export default EICCertificateActions;
