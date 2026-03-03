import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  FileText,
  Download,
  Save,
  Mail,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Printer,
  Copy,
  Code,
  Loader2,
  Bell,
  Receipt,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { supabase } from '@/integrations/supabase/client';
import { saveCertificatePdf } from '@/utils/certificate-pdf-storage';
import { formatEicJson } from '@/utils/eicJsonFormatter';
import PDFExportProgress from '@/components/PDFExportProgress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createNotificationFromCertificate } from '@/utils/notificationHelper';
import {
  createQuoteFromCertificate,
  createInvoiceFromCertificate,
} from '@/utils/certificateToQuote';

interface EICCertificateActionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  reportId: string;
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
}

const EICCertificateActions: React.FC<EICCertificateActionsProps> = ({
  formData,
  reportId,
  onGenerateCertificate,
  onSaveDraft,
}) => {
  const { toast } = useToast();
  const { companyProfile } = useCompanyProfile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState<
    'preparing' | 'generating' | 'complete' | 'error'
  >('preparing');
  const [jsonPreview, setJsonPreview] = useState<string>('{}');
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Handle Part P notification creation
  const handleNotificationCreation = async () => {
    // Only create notification if Part P checkbox is ticked
    if (!formData.partPNotification) {
      return;
    }

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Note: Signature is NOT required for Part P notification tracking
      // The notification tracks the 30-day submission deadline regardless of signature status

      // Create notification
      const result = await createNotificationFromCertificate(
        reportId,
        'eic',
        {
          ...formData,
          workType: formData.description || formData.installationType || 'Electrical installation',
          installationAddress: formData.installationAddress,
          inspectionDate: formData.inspectorDate || formData.installationDate,
          partPNotification: true, // Explicitly requested
        },
        user.id
      );

      if (result.success) {
        // Invalidate notifications query to update dashboard
        queryClient.invalidateQueries({ queryKey: ['notifications'] });

        toast({
          title: 'Part P Notification Created',
          description: 'Notification created successfully. Submission required within 30 days.',
          action: (
            <Button size="sm" variant="outline" onClick={() => navigate('/?section=notifications')}>
              <Bell className="h-3 w-3 mr-1" />
              View
            </Button>
          ),
        });
      } else {
        toast({
          title: 'Notification Failed',
          description: result.error || 'Unable to create Part P notification.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error creating Part P notification:', error);
      toast({
        title: 'Notification Error',
        description: 'An error occurred while creating the notification.',
        variant: 'destructive',
      });
    }
  };

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

  const handleGeneratePDF = async () => {
    if (!canGenerateCertificate) {
      toast({
        title: 'Cannot Generate Certificate',
        description: 'Please complete all required sections before generating the EIC.',
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

      // Download the PDF for the user
      const response = await fetch(permanentUrl);
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

      // Create Part P notification if requested
      await handleNotificationCreation();

      // Invalidate dashboard queries
      queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
      queryClient.invalidateQueries({ queryKey: ['my-reports'] });

      // Also call the original handler for any additional processing
      onGenerateCertificate();
    } catch (error) {
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

  // Navigate to quote builder with client data pre-filled
  const handleCreateQuote = () => {
    const url = createQuoteFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || '',
      certificateType: 'EIC',
      certificateReference: formData.certificateNumber || '',
      reportId: reportId || undefined,
      pdfUrl: formData.pdfUrl || undefined,
    });
    navigate(url);
  };

  // Navigate to invoice builder with client data pre-filled
  const handleCreateInvoice = () => {
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.clientPhone || '',
      clientAddress: formData.clientAddress || '',
      installationAddress: formData.installationAddress || '',
      certificateType: 'EIC',
      certificateReference: formData.certificateNumber || '',
      reportId: reportId || undefined,
      pdfUrl: formData.pdfUrl || undefined,
    });
    navigate(url);
  };

  const handleCopyJSON = async () => {
    const jsonData = JSON.stringify(
      await formatEicJson(formData, companyProfile, reportId),
      null,
      2
    );
    navigator.clipboard.writeText(jsonData);
    setJsonPreview(jsonData);
    toast({
      title: 'JSON Copied',
      description: 'Test JSON data has been copied to clipboard.',
    });
  };

  const handleLoadJSONPreview = async () => {
    const jsonData = JSON.stringify(
      await formatEicJson(formData, companyProfile, reportId),
      null,
      2
    );
    setJsonPreview(jsonData);
  };

  const getCompletionBadge = () => {
    if (isFullyComplete) {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Complete
        </Badge>
      );
    } else if (canGenerateCertificate) {
      return (
        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
          <Clock className="h-3 w-3 mr-1" />
          Ready to Generate
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Incomplete
        </Badge>
      );
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-elec-gray flex items-center gap-2">
              <FileText className="h-5 w-5 text-elec-yellow" />
              EIC Certificate Actions
            </CardTitle>
            {getCompletionBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Completion Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Section Completion</h4>
              <div className="space-y-1 text-sm">
                <div
                  className={`flex items-center gap-2 ${hasRequiredInstallationDetails ? 'text-green-600' : 'text-gray-500'}`}
                >
                  {hasRequiredInstallationDetails ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                  Installation Details
                </div>
                <div
                  className={`flex items-center gap-2 ${hasCompletedInspections ? 'text-green-600' : 'text-gray-500'}`}
                >
                  {hasCompletedInspections ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                  Schedule of Inspections
                </div>
                <div
                  className={`flex items-center gap-2 ${hasTestResults ? 'text-green-600' : 'text-gray-500'}`}
                >
                  {hasTestResults ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                  Schedule of Testing
                </div>
                <div
                  className={`flex items-center gap-2 ${hasRequiredDeclarations ? 'text-green-600' : 'text-gray-500'}`}
                >
                  {hasRequiredDeclarations ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                  Declarations & Signatures
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Legal Compliance</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-elec-yellow">
                  <Shield className="h-4 w-4" />
                  BS 7671:2018 Compliant
                </div>
                <div className="flex items-center gap-2 text-elec-yellow">
                  <Shield className="h-4 w-4" />
                  Digital Signatures Valid
                </div>
                <div className="flex items-center gap-2 text-elec-yellow">
                  <Shield className="h-4 w-4" />
                  Building Regs Ready
                </div>
              </div>
            </div>
          </div>

          {/* Validation Warnings */}
          {!canGenerateCertificate && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Required sections incomplete:</strong>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  {!hasRequiredInstallationDetails && (
                    <li>Complete client name, installation address, and installation date</li>
                  )}
                  {!hasRequiredDeclarations && (
                    <li>Complete all three declarations with names and signatures</li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleGeneratePDF}
              disabled={!canGenerateCertificate || isExporting}
              className="h-11 w-full sm:w-auto flex-1 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium"
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? 'Generating...' : 'Generate EIC PDF'}
            </Button>

            <Button
              onClick={handleSaveDraft}
              variant="outline"
              className="h-11 w-full sm:w-auto flex-1 touch-manipulation"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleEmailCertificate}
              variant="outline"
              disabled={!canGenerateCertificate}
              className="h-11 w-full sm:w-auto flex-1 touch-manipulation"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Certificate
            </Button>

            <Button
              onClick={() => window.print()}
              variant="outline"
              disabled={!canGenerateCertificate}
              className="h-11 w-full sm:w-auto flex-1 touch-manipulation"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print Preview
            </Button>
          </div>

          {/* Quote & Invoice Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleCreateQuote}
              variant="outline"
              className="h-11 w-full sm:w-auto flex-1 touch-manipulation bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400"
            >
              <FileText className="h-4 w-4 mr-2" />
              Quote
            </Button>

            <Button
              onClick={handleCreateInvoice}
              variant="outline"
              className="h-11 w-full sm:w-auto flex-1 touch-manipulation bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-blue-400"
            >
              <Receipt className="h-4 w-4 mr-2" />
              Invoice
            </Button>
          </div>

          {/* JSON Test Data */}
          <div className="pt-4 border-t space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm flex items-center gap-2">
                <Code className="h-4 w-4 text-elec-yellow" />
                Test JSON Data
              </h4>
              <div className="flex gap-2">
                <Button onClick={handleLoadJSONPreview} variant="outline" size="sm">
                  <Code className="h-3 w-3 mr-2" />
                  Load Preview
                </Button>
                <Button onClick={handleCopyJSON} variant="outline" size="sm">
                  <Copy className="h-3 w-3 mr-2" />
                  Copy JSON
                </Button>
              </div>
            </div>
            <div className="bg-muted rounded-md p-3 max-h-96 overflow-auto">
              <pre className="text-xs">{jsonPreview}</pre>
            </div>
          </div>

          {/* Certificate Information */}
          <div className="pt-4 border-t text-xs text-muted-foreground space-y-1">
            <p>
              <strong>Certificate Type:</strong> Electrical Installation Certificate (EIC)
            </p>
            <p>
              <strong>Standard:</strong> BS 7671:2018 (18th Edition)
            </p>
            <p>
              <strong>Generated:</strong> {new Date().toLocaleString('en-GB')}
            </p>
            {formData.clientName && (
              <p>
                <strong>Client:</strong> {formData.clientName}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <PDFExportProgress
        isOpen={isExporting}
        onClose={() => setIsExporting(false)}
        exportType="complete"
        progress={exportProgress}
        status={exportStatus}
      />

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email EIC Certificate</DialogTitle>
            <DialogDescription>
              Enter the recipient's email address. The certificate will be generated and sent as a
              PDF attachment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Recipient Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="client@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
              />
            </div>
            {formData.clientEmail && emailRecipient !== formData.clientEmail && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEmailRecipient(formData.clientEmail)}
                className="w-full"
              >
                Use Client Email: {formData.clientEmail}
              </Button>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
            >
              Cancel
            </Button>
            <Button onClick={handleSendEmail} disabled={isSendingEmail || !emailRecipient}>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EICCertificateActions;
