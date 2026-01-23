import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Download, AlertTriangle, FileCheck, Bell, Mail, Loader2, Send, FileText, Receipt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { saveCertificatePdf } from '@/utils/certificate-pdf-storage';
import { validateMinorWorksFormData, formatFieldForPdf } from '@/utils/minorWorksValidation';
import { createNotificationFromCertificate } from '@/utils/notificationHelper';
import { useNavigate } from 'react-router-dom';
import { createQuoteFromCertificate, createInvoiceFromCertificate } from '@/utils/certificateToQuote';

interface MinorWorksPdfGeneratorProps {
  formData: any;
  isFormValid: boolean;
  onSuccess?: () => void;
  reportId?: string;
  userId?: string;
}

const MinorWorksPdfGenerator: React.FC<MinorWorksPdfGeneratorProps> = ({
  formData,
  isFormValid,
  onSuccess,
  reportId,
  userId
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentMethod, setCurrentMethod] = useState<'cloud' | 'local' | null>(null);
  const [canRetryCloud, setCanRetryCloud] = useState(false);

  // Email state
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Handle automatic Part P notification creation
  const handleNotificationCreation = async () => {
    // Only create notification if Part P checkbox is ticked
    if (!formData.partPNotification) {
      return;
    }

    try {
      // Get user ID if not provided
      let currentUserId = userId;
      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        currentUserId = user.id;
      }

      // Get report ID (use certificate number as fallback)
      const currentReportId = reportId || formData.certificateNumber;
      if (!currentReportId) {
        console.warn('No report ID available for notification');
        return;
      }

      // Note: Signature is NOT required for Part P notification tracking
      // The notification tracks the 30-day submission deadline regardless of signature status

      console.log('Creating Part P notification for Minor Works certificate...');

      // Create notification - user explicitly requested it via checkbox
      const result = await createNotificationFromCertificate(
        currentReportId,
        'minor-works',
        formData,
        currentUserId
      );

      if (result.success) {
        console.log('✅ Part P notification created:', result.notificationId);
        
        // Invalidate notifications query to update dashboard
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
        
        toast({
          title: "Part P Notification Created",
          description: "Notification created successfully. Submission required within 30 days.",
          action: (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => navigate('/?section=notifications')}
            >
              <Bell className="h-3 w-3 mr-1" />
              View Notifications
            </Button>
          ),
        });
      } else {
        console.error('Failed to create notification:', result.error);
        
        toast({
          title: "Notification Creation Failed",
          description: result.error || "Unable to create Part P notification.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Notification creation failed:', error);
      toast({
        title: "Notification Error",
        description: "An error occurred while creating the notification.",
        variant: "destructive",
      });
    }
  };

  // Check if PDF Monkey is configured
  const isPdfMonkeyConfigured = async () => {
    const { offlineStorage } = await import('@/utils/offlineStorage');
    const credentials = await offlineStorage.getApiCredentials('pdfMonkey');
    return credentials.apiKey && credentials.templateId;
  };

  const generateFallbackPdf = async () => {
    // Fallback to browser-based PDF generation using existing utils
    const { generateMinorWorksPdf } = await import('@/utils/minorWorksPdfExport');
    
    setProgress(50);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing
    
    generateMinorWorksPdf(formData);
    setProgress(100);
    
    return true;
  };

  const handleGeneratePdf = async (forceLocal = false) => {
    // Validate form data before generation
    const validation = validateMinorWorksFormData(formData);
    
    if (!validation.isValid) {
      toast({
        title: "Form Validation Failed",
        description: `Please fix ${validation.errors.length} error(s): ${validation.errors[0]?.message}`,
        variant: "destructive",
      });
      return;
    }
    
    if (!isFormValid) {
      toast({
        title: "Form Incomplete",
        description: "Please complete all required fields before generating the certificate.",
        variant: "destructive",
      });
      return;
    }
    
      if (validation.warnings.length > 0) {
      toast({
        title: `${validation.warnings.length} Warning(s)`,
        description: validation.warnings[0]?.message,
        variant: "default",
      });
    }

    setIsGenerating(true);
    setProgress(0);
    setError(null);
    setCanRetryCloud(false);
    setShowDialog(true);

    try {
      if (forceLocal) {
        setCurrentMethod('local');
        setProgress(10);
        await new Promise(resolve => setTimeout(resolve, 500));
        await generateFallbackPdf();
        
        toast({
          title: "Certificate Generated",
          description: "Certificate generated using local template.",
        });
        
        onSuccess?.();
        await handleNotificationCreation();
        
        // Invalidate dashboard queries
        queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
        queryClient.invalidateQueries({ queryKey: ['my-reports'] });
        return;
      }

      setCurrentMethod('cloud');
      setProgress(10);
      
      // Step 1: Ensure report is saved to database first
      console.log('[MinorWorks PDF] Step 1: Ensuring report is saved to database...');
      console.log('[MinorWorks PDF] reportId:', reportId);
      
      // Save report to database if not already saved
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const { reportCloud } = await import('@/utils/reportCloud');
      
      // Check if report exists in database
      const existingReport = reportId ? await reportCloud.getReportByReportId(reportId, user.id) : null;
      let savedReportId = reportId;
      
      if (!existingReport) {
        console.log('[MinorWorks PDF] Report not found in database, creating...');
        const createResult = await reportCloud.createReport(user.id, 'minor-works', formData);
        if (!createResult.success || !createResult.reportId) {
          throw new Error('Failed to save report before generating PDF');
        }
        savedReportId = createResult.reportId;
        console.log('[MinorWorks PDF] Report created with ID:', savedReportId);
      } else {
        console.log('[MinorWorks PDF] Report exists, updating...');
        if (savedReportId) {
          await reportCloud.updateReport(savedReportId, user.id, formData);
        }
      }
      
      setProgress(20);
      
      // Get saved template ID from settings
      const { offlineStorage: offlineStorageModule } = await import('@/utils/offlineStorage');
      const credentials = await offlineStorageModule.getApiCredentials('pdfMonkey');
      const savedTemplateId = credentials.templateId;
      
      // Try PDF Monkey via edge function
      console.log('[MinorWorks PDF] Step 2: Calling edge function...');
      console.log('[MinorWorks PDF] Using template ID:', savedTemplateId || 'default');
      setProgress(30);
      
      // Format form data for better PDF presentation
      const formattedFormData = { ...formData };
      Object.keys(formattedFormData).forEach(key => {
        if (formattedFormData[key]) {
          formattedFormData[key] = formatFieldForPdf(key, formattedFormData[key]);
        }
      });
      
      const { data: functionData, error: functionError } = await supabase.functions.invoke('generate-minor-works-pdf', {
        body: { 
          formData: formattedFormData,
          templateId: savedTemplateId
        }
      });
      
      console.log('[MinorWorks PDF] Edge function raw response:', JSON.stringify(functionData).substring(0, 300));
      console.log('[MinorWorks PDF] Edge function error:', functionError);
      console.log('[MinorWorks PDF] Response keys:', functionData ? Object.keys(functionData) : 'null');
      
      if (functionError) {
        console.warn('[MinorWorks PDF] Edge function error, falling back to local generation:', functionError);
        setCurrentMethod('local');
        setCanRetryCloud(true);
        setError(`Cloud generation failed. Using local generation instead.`);
        setProgress(50);
        await generateFallbackPdf();
        
        toast({
          title: "Certificate Generated",
          description: "Certificate generated using local template. Cloud service encountered an issue.",
        });
        
        onSuccess?.();
        await handleNotificationCreation();
        
        // Invalidate dashboard queries
        queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
        queryClient.invalidateQueries({ queryKey: ['my-reports'] });
      } else {
        // Try multiple response formats
        const pdfUrlFromResponse = functionData?.pdfUrl || functionData?.pdf_url || functionData?.url || functionData?.data?.pdfUrl;

        if (pdfUrlFromResponse) {
          console.log('[MinorWorks PDF] Step 3: PDF URL extracted:', pdfUrlFromResponse);

          // Save PDF to permanent Supabase Storage (PDFMonkey URLs expire after 7 days)
          let permanentUrl = pdfUrlFromResponse; // Fallback to temp URL
          let storagePath: string | null = null;

          if (savedReportId) {
            try {
              const storageResult = await saveCertificatePdf(
                pdfUrlFromResponse,
                user.id,
                savedReportId,
                formData.certificateNumber
              );
              permanentUrl = storageResult.permanentUrl;
              storagePath = storageResult.storagePath;
              console.log('[MinorWorks PDF] PDF saved to permanent storage:', storagePath);
            } catch (storageError) {
              console.error('[MinorWorks PDF] Failed to save PDF permanently, using temp URL:', storageError);
              // Continue with temp URL - user can still download, just won't persist long-term
            }
          }

          console.log('[MinorWorks PDF] Step 4: Saving PDF URL to database for report_id:', savedReportId);

          // Save PDF URL to database
          if (savedReportId) {
            const updateData: Record<string, any> = {
              pdf_url: permanentUrl,
              pdf_generated_at: new Date().toISOString(),
            };

            if (storagePath) {
              updateData.storage_path = storagePath;
            }

            const { error: updateError, data: dbUpdateData } = await supabase
              .from('reports')
              .update(updateData)
              .eq('report_id', savedReportId)
              .select('id, report_id, pdf_url');

            if (updateError) {
              console.error('[MinorWorks PDF] CRITICAL: Failed to save PDF URL:', updateError);
              console.error('[MinorWorks PDF] Update attempted for report_id:', savedReportId);
              console.error('[MinorWorks PDF] PDF URL that failed to save:', permanentUrl);

              toast({
                title: "Warning",
                description: "PDF generated but not saved to your account.",
                variant: "destructive"
              });
            } else {
              console.log('[MinorWorks PDF] PDF URL saved successfully:', dbUpdateData);
            }
          }

          setPdfUrl(permanentUrl);
          setProgress(100);

          toast({
            title: "Certificate Generated",
            description: storagePath
              ? "Certificate generated and saved permanently."
              : "Certificate generated successfully using your custom template.",
          });
          
          onSuccess?.();
          await handleNotificationCreation();
          
          // Invalidate dashboard queries
          queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
          queryClient.invalidateQueries({ queryKey: ['my-reports'] });
        } else {
          // Fallback to local generation
          const errorMsg = functionData?.error || 'Edge function returned no PDF URL';
          const isTimeout = functionData?.timeout;
        
          console.warn('PDF Monkey failed, using fallback:', errorMsg);
          setCurrentMethod('local');
          setCanRetryCloud(isTimeout);
          setError(isTimeout ? 
            'Cloud generation timed out (may be busy). Using local generation.' : 
            `Cloud generation failed: ${errorMsg}. Using local generation.`
          );
          setProgress(50);
          await generateFallbackPdf();
          
          toast({
            title: "Certificate Generated",
            description: "Certificate generated using local template. Cloud service encountered an issue.",
          });
          
          onSuccess?.();
          await handleNotificationCreation();
          
          // Invalidate dashboard queries
          queryClient.invalidateQueries({ queryKey: ['recent-certificates'] });
          queryClient.invalidateQueries({ queryKey: ['my-reports'] });
        }
      }
    } catch (error: any) {
      setError(error.message || 'PDF generation failed');
      setCurrentMethod(null);
      console.error('PDF generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const retryCloudGeneration = () => {
    handleGeneratePdf(false);
  };

  const handleDownload = async () => {
    if (pdfUrl) {
      try {
        const { generatePdfFilename } = require('@/utils/pdfFilenameGenerator');
        const filename = generatePdfFilename(
          'MinorWorks',
          formData.certificateNumber || 'MW',
          formData.clientName || formData.propertyAddress || 'Client',
          formData.workDate || new Date()
        );
        
        // Fetch PDF as blob to ensure correct filename
        const response = await fetch(pdfUrl);
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
        
        toast({
          title: "Download Started",
          description: "Your certificate is downloading.",
        });
      } catch (error) {
        console.error('Download error:', error);
        toast({
          title: "Download Failed",
          description: "Opening PDF in new tab instead.",
          variant: "default",
        });
        // Fallback: Open in new window
        window.open(pdfUrl, '_blank');
      }
    }
  };

  const handleClose = () => {
    setShowDialog(false);
    setProgress(0);
    setPdfUrl(null);
    setError(null);
    setCurrentMethod(null);
    setCanRetryCloud(false);
  };

  // Email certificate handler
  const handleEmailCertificate = () => {
    // Pre-fill with client email if available
    if (formData.clientEmail) {
      setEmailRecipient(formData.clientEmail);
    }
    setShowEmailDialog(true);
  };

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Check if report has been saved first
    const currentReportId = reportId || formData.certificateNumber;
    if (!reportId) {
      toast({
        title: "Save Required",
        description: "Please save the certificate first before emailing. Click 'Save Draft' then try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmail(true);

    try {
      // Call the Resend-based edge function to generate PDF and send email

      const { data: result, error: fnError } = await supabase.functions.invoke('send-certificate-resend', {
        body: {
          reportId: currentReportId,
          recipientEmail: emailRecipient,
        }
      });

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
        title: "Certificate Sent",
        description: `Minor Works certificate sent successfully to ${emailRecipient}`,
      });

      setShowEmailDialog(false);
      setEmailRecipient('');

    } catch (error) {
      toast({
        title: "Email Failed",
        description: error instanceof Error ? error.message : "Failed to send certificate email.",
        variant: "destructive",
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
      clientPhone: formData.electricianPhone || '',
      clientAddress: formData.propertyAddress || '',
      installationAddress: formData.propertyAddress || '',
      certificateType: 'Minor Works',
      certificateReference: formData.certificateNumber || '',
      reportId: reportId || undefined,
      pdfUrl: pdfUrl || formData.pdfUrl || undefined,
    });
    navigate(url);
  };

  // Navigate to invoice builder with client data pre-filled
  const handleCreateInvoice = () => {
    const url = createInvoiceFromCertificate({
      clientName: formData.clientName || '',
      clientEmail: formData.clientEmail || '',
      clientPhone: formData.electricianPhone || '',
      clientAddress: formData.propertyAddress || '',
      installationAddress: formData.propertyAddress || '',
      certificateType: 'Minor Works',
      certificateReference: formData.certificateNumber || '',
      reportId: reportId || undefined,
      pdfUrl: pdfUrl || formData.pdfUrl || undefined,
    });
    navigate(url);
  };


  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => handleGeneratePdf()}
            className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium touch-manipulation"
            disabled={!isFormValid || isGenerating}
          >
            <FileCheck className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate PDF'}
          </Button>

          <Button
            onClick={handleEmailCertificate}
            variant="outline"
            className="w-full h-12 touch-manipulation"
            disabled={!isFormValid || isGenerating}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Certificate
          </Button>
        </div>

        {/* Quote & Invoice Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={handleCreateQuote}
            variant="outline"
            className="w-full h-12 touch-manipulation bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400"
          >
            <FileText className="h-4 w-4 mr-2" />
            Quote
          </Button>

          <Button
            onClick={handleCreateInvoice}
            variant="outline"
            className="w-full h-12 touch-manipulation bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-blue-400"
          >
            <Receipt className="h-4 w-4 mr-2" />
            Invoice
          </Button>
        </div>

        {isPdfMonkeyConfigured() && (
          <p className="text-xs text-center text-muted-foreground">
            Using custom PDF template
          </p>
        )}

        {!isPdfMonkeyConfigured() && (
          <p className="text-xs text-center text-muted-foreground">
            Using local template • Configure custom templates in Settings
          </p>
        )}
      </div>

      <Dialog open={showDialog} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Generate Certificate
            </DialogTitle>
            <DialogDescription>
              {currentMethod === 'cloud' && 'Generating certificate using your custom template...'}
              {currentMethod === 'local' && 'Generating certificate using local template...'}
              {!currentMethod && 'Preparing to generate your Minor Works Certificate...'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {isGenerating && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    {currentMethod === 'cloud' && progress < 50 && 'Processing with cloud service...'}
                    {currentMethod === 'cloud' && progress >= 50 && 'Finalizing PDF...'}
                    {currentMethod === 'local' && 'Generating PDF locally...'}
                    {!currentMethod && 'Preparing...'}
                  </span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!isGenerating && !error && progress === 100 && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Certificate generated successfully!
                </AlertDescription>
              </Alert>
            )}

            {pdfUrl && (
              <Button onClick={handleDownload} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose} className="flex-1">
                Close
              </Button>
              {canRetryCloud && !isGenerating && (
                <Button variant="default" onClick={retryCloudGeneration} className="flex-1">
                  Retry Cloud
                </Button>
              )}
            </div>
            
            {!isGenerating && !error && !pdfUrl && (
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" onClick={() => handleGeneratePdf(true)} className="flex-1">
                  Use Local Generation
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-elec-yellow" />
              Email Minor Works Certificate
            </DialogTitle>
            <DialogDescription>
              Enter the recipient's email address. The certificate will be generated and sent as a PDF attachment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Recipient Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="client@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
                className="h-11 text-base touch-manipulation"
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
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
              className="w-full sm:w-auto bg-elec-yellow hover:bg-elec-yellow/90 text-black"
            >
              {isSendingEmail ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
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

export default MinorWorksPdfGenerator;