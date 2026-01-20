import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Download, AlertTriangle, FileCheck, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { validateMinorWorksFormData, formatFieldForPdf } from '@/utils/minorWorksValidation';
import { createNotificationFromCertificate } from '@/utils/notificationHelper';
import { useNavigate } from 'react-router-dom';

// Default PDF Monkey template ID for Minor Works Certificate
const DEFAULT_MINOR_WORKS_TEMPLATE_ID = 'E6A82A45-09FE-46EC-9E6E-0D20B1E81D0D';

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
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Handle automatic Part P notification creation
  const handleNotificationCreation = async () => {
    console.log('[MinorWorks] handleNotificationCreation called, partPNotification:', formData.partPNotification);

    // Only create notification if Part P checkbox is ticked
    if (!formData.partPNotification) {
      console.log('[MinorWorks] Part P notification not requested, skipping');
      return;
    }

    try {
      // Get user ID if not provided
      let currentUserId = userId;
      if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.error('[MinorWorks] No authenticated user for notification');
          return;
        }
        currentUserId = user.id;
      }
      console.log('[MinorWorks] User ID:', currentUserId);

      // Get report ID (use certificate number as fallback)
      const currentReportId = reportId || formData.certificateNumber;
      if (!currentReportId) {
        console.error('[MinorWorks] No report ID available for notification');
        toast({
          title: "Notification Warning",
          description: "Could not create Part P notification - no certificate ID available.",
          variant: "destructive",
        });
        return;
      }
      console.log('[MinorWorks] Report ID:', currentReportId);

      // Note: Signature is NOT required for Part P notification tracking
      // The notification tracks the 30-day submission deadline regardless of signature status

      console.log('[MinorWorks] Creating notification with data:', {
        reportId: currentReportId,
        workType: formData.workType || formData.workDescription,
        installationAddress: formData.installationAddress || formData.propertyAddress
      });

      // Create notification - user explicitly requested it via checkbox
      const result = await createNotificationFromCertificate(
        currentReportId,
        'minor-works',
        {
          ...formData,
          workType: formData.workType || formData.workDescription || 'Minor electrical works',
          installationAddress: formData.installationAddress || formData.propertyAddress,
          partPNotification: true // Explicitly set for helper function
        },
        currentUserId
      );

      console.log('[MinorWorks] Notification creation result:', result);

      if (result.success) {
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
        console.error('[MinorWorks] Notification creation failed:', result.error);
        toast({
          title: "Notification Creation Failed",
          description: result.error || "Unable to create Part P notification.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('[MinorWorks] Notification error:', error);
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
      
      setProgress(20);
      
      // Get saved template ID from settings
      const { offlineStorage: offlineStorageModule } = await import('@/utils/offlineStorage');
      const credentials = await offlineStorageModule.getApiCredentials('pdfMonkey');
      const savedTemplateId = credentials.templateId || DEFAULT_MINOR_WORKS_TEMPLATE_ID;
      
      // Try PDF Monkey via edge function
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
          
          // Save PDF URL to database
          if (savedReportId) {
            const { error: updateError, data: updateData } = await supabase
              .from('reports')
              .update({ 
                pdf_url: pdfUrlFromResponse,
                pdf_generated_at: new Date().toISOString()
              })
              .eq('report_id', savedReportId)
              .select('id, report_id, pdf_url');
            
            if (updateError) {
              
              toast({
                title: "Warning",
                description: "PDF generated but not saved to your account.",
                variant: "destructive"
              });
            } else {
            }
          }
          
          setPdfUrl(pdfUrlFromResponse);
          setProgress(100);
        
          toast({
            title: "Certificate Generated",
            description: "Certificate generated successfully using your custom template.",
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


  return (
    <>
      <div className="flex flex-col gap-2">
        <Button 
          onClick={() => handleGeneratePdf()}
          className="w-full h-12"
          disabled={!isFormValid || isGenerating}
        >
          <FileCheck className="h-4 w-4 mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Certificate'}
        </Button>
        
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

    </>
  );
};

export default MinorWorksPdfGenerator;