import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { Download, Edit, Loader2, FileText, AlertCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { optimizeForPdfGeneration, formatSizeWarning } from '@/utils/pdfDataOptimizer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { openOrDownloadPdf } from '@/utils/pdf-download';

interface ReportPdfViewerProps {
  reportId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ReportVersion {
  id: string;
  version: number;
  created_at: string;
  certificate_number: string;
  is_latest_version: boolean;
}

export const ReportPdfViewer = ({ reportId, open, onOpenChange }: ReportPdfViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // Original PDF Monkey URL
  const [blobUrl, setBlobUrl] = useState<string | null>(null); // Blob URL for iframe preview
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [versions, setVersions] = useState<ReportVersion[]>([]);
  const [currentVersion, setCurrentVersion] = useState<ReportVersion | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [sizeWarning, setSizeWarning] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Clean up blob URL when component unmounts or dialog closes
  useEffect(() => {
    if (!open && blobUrl) {
      URL.revokeObjectURL(blobUrl);
      setBlobUrl(null);
      setPdfUrl(null);
    }
  }, [open]);

  // Also clean up on unmount
  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, []);

  const [previewError, setPreviewError] = useState<string | null>(null);

  /**
   * Fetch PDF via proxy and create blob URL for iframe preview
   * Uses edge function to bypass CORS restrictions
   */
  const createBlobUrlForPreview = async (url: string): Promise<string | null> => {
    try {
      setIsLoadingPreview(true);
      setPreviewError(null);
      console.log('[ReportPdfViewer] Fetching PDF via proxy:', url.substring(0, 60) + '...');

      // Get auth token for the edge function
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;

      // Use our proxy edge function to fetch the PDF (bypasses CORS)
      const proxyUrl = `${SUPABASE_URL}/functions/v1/proxy-pdf`;

      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          apikey: SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ pdfUrl: url }),
      });

      const contentType = response.headers.get('content-type');
      console.log(
        '[ReportPdfViewer] Response status:',
        response.status,
        'content-type:',
        contentType
      );

      // Check if response is JSON (error) instead of PDF
      if (contentType?.includes('application/json')) {
        const errorData = await response.json();
        console.error('[ReportPdfViewer] Proxy returned error:', errorData);
        throw new Error(errorData.error || 'Proxy returned error response');
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[ReportPdfViewer] Proxy error:', response.status, errorText);
        throw new Error(`Proxy failed: ${response.status}`);
      }

      const blob = await response.blob();
      console.log('[ReportPdfViewer] Blob size:', blob.size, 'type:', blob.type);

      if (blob.size === 0) {
        throw new Error('PDF file is empty');
      }

      // Verify it looks like a PDF (starts with %PDF)
      const firstBytes = await blob.slice(0, 5).text();
      if (!firstBytes.startsWith('%PDF')) {
        console.error('[ReportPdfViewer] Response does not appear to be a PDF:', firstBytes);
        throw new Error('Invalid PDF: Response is not a valid PDF file');
      }

      // Ensure correct MIME type for PDF
      const pdfBlob =
        blob.type === 'application/pdf' ? blob : new Blob([blob], { type: 'application/pdf' });

      const newBlobUrl = URL.createObjectURL(pdfBlob);
      console.log('[ReportPdfViewer] Blob URL created:', newBlobUrl);

      return newBlobUrl;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.error('[ReportPdfViewer] Failed to create blob URL:', errorMsg);

      // Check if this is an expired URL error - if so, indicate we need to regenerate
      if (
        errorMsg.includes('403') ||
        errorMsg.includes('expired') ||
        errorMsg.includes('Forbidden')
      ) {
        setPreviewError('PDF link has expired. Click "Regenerate PDF" to create a new one.');
      } else {
        setPreviewError(errorMsg);
      }
      return null;
    } finally {
      setIsLoadingPreview(false);
    }
  };

  /**
   * Check if a PDF URL is still valid based on expiry date
   * Note: We don't make HEAD requests as they're blocked by CORS on PDF Monkey URLs
   */
  const isPdfUrlValid = async (url: string, expiresAt?: string): Promise<boolean> => {
    // Check expiry date only - HEAD requests are blocked by CORS
    if (expiresAt) {
      const expiryDate = new Date(expiresAt);
      if (new Date() > expiryDate) {
        console.log('[ReportPdfViewer] PDF expired at:', expiresAt);
        return false;
      }
      // Not expired yet, assume valid
      console.log('[ReportPdfViewer] PDF valid until:', expiresAt);
      return true;
    }

    // No expiry date stored - assume valid, proxy will handle errors
    console.log('[ReportPdfViewer] No expiry date, assuming valid');
    return true;
  };

  /**
   * Get a valid PDF URL, regenerating if necessary
   */
  const getValidPdfUrl = async (reportData: any): Promise<string | null> => {
    const pdfUrl = reportData.pdf_url;
    const pdfExpiresAt = reportData.pdf_expires_at;
    const pdfGeneratedAt = reportData.pdf_generated_at
      ? new Date(reportData.pdf_generated_at)
      : null;
    const dataUpdatedAt = new Date(reportData.updated_at);

    // Check if data has been updated since PDF was generated
    const isPdfStale = pdfGeneratedAt && dataUpdatedAt > pdfGeneratedAt;

    if (pdfUrl && !isPdfStale) {
      // Check if URL is still valid
      const isValid = await isPdfUrlValid(pdfUrl, pdfExpiresAt);
      if (isValid) {
        console.log(
          '[ReportPdfViewer] Using cached PDF (valid until:',
          pdfExpiresAt || 'unknown',
          ')'
        );
        return pdfUrl;
      }
      console.log('[ReportPdfViewer] Cached PDF URL is invalid, regenerating...');
    } else if (isPdfStale) {
      console.log(
        '[ReportPdfViewer] PDF is stale (data updated after generation), regenerating...'
      );
    }

    // Need to regenerate
    return null;
  };

  // Load report and versions
  useEffect(() => {
    if (!open || !reportId) return;

    const loadReport = async () => {
      try {
        // Try to fetch by report_id first (the string ID like EICR-1768...)
        // Then fall back to UUID id
        let reportData = null;
        let error = null;

        // First try by report_id (the string ID we use throughout the app)
        const { data: byReportId, error: reportIdError } = await supabase
          .from('reports')
          .select('*')
          .eq('report_id', reportId)
          .single();

        if (byReportId) {
          reportData = byReportId;
        } else {
          // Fall back to UUID id
          const { data: byId, error: idError } = await supabase
            .from('reports')
            .select('*')
            .eq('id', reportId)
            .single();
          reportData = byId;
          error = idError;
        }

        if (!reportData) {
          throw new Error('Report not found');
        }

        setReport(reportData);
        setCurrentVersion({
          id: reportData.id,
          version: reportData.edit_version || 1,
          created_at: reportData.created_at,
          certificate_number: reportData.certificate_number,
          is_latest_version: true,
        });

        // Single version — versioning columns don't exist on reports table
        setVersions([{
          id: reportData.id,
          version: reportData.edit_version || 1,
          created_at: reportData.created_at,
          certificate_number: reportData.certificate_number,
          is_latest_version: true,
        }]);

        // Smart PDF retrieval - check validity before using cached URL
        const validUrl = await getValidPdfUrl(reportData);
        if (validUrl) {
          setPdfUrl(validUrl);
          // Create blob URL for iframe preview (bypasses CORS)
          const previewUrl = await createBlobUrlForPreview(validUrl);
          if (previewUrl) {
            setBlobUrl(previewUrl);
          }
        } else {
          await generatePdf(reportData);
        }
      } catch (error) {
        console.error('Error loading report:', error);
        toast({
          title: 'Error',
          description: 'Failed to load report',
          variant: 'destructive',
        });
      }
    };

    loadReport();
  }, [open, reportId]);

  const generatePdf = async (reportData: any) => {
    setIsGenerating(true);
    setGenerationError(null);
    setSizeWarning(null);

    try {
      const reportType = reportData.report_type.toLowerCase();
      let edgeFunctionName = '';

      if (reportType === 'eic') {
        edgeFunctionName = 'generate-eic-pdf';
      } else if (reportType === 'eicr') {
        edgeFunctionName = 'generate-eicr-pdf';
      } else if (reportType === 'minor works' || reportType === 'minor-works') {
        edgeFunctionName = 'generate-minor-works-pdf';
      } else {
        throw new Error('Unsupported report type');
      }

      // Load template IDs from storage
      const { offlineStorage } = await import('@/utils/offlineStorage');
      const credentials = await offlineStorage.getApiCredentials('pdfMonkey');
      let templateId: string | undefined;

      if (reportType === 'eic') {
        templateId = credentials.eicTemplateId;
      } else if (reportType === 'eicr') {
        templateId = credentials.eicrTemplateId;
      }

      // Use pre-formatted PDF payload if available, otherwise format on-the-fly
      let dataForPdf = reportData.data;
      if (reportData.pdf_payload) {
        console.log('[ReportPdfViewer] Using saved pdf_payload');
        dataForPdf = reportData.pdf_payload;
      } else {
        console.log(`[ReportPdfViewer] No pdf_payload, attempting on-the-fly format for ${reportType}`);
        if (reportType === 'eicr') {
          const { formatEICRJson } = await import('@/utils/eicrJsonFormatter');
          dataForPdf = await formatEICRJson(reportData.data, reportData.report_id);
        } else if (reportType === 'ev-charging' || reportType === 'ev charging') {
          const { formatEVChargingJson } = await import('@/utils/evChargingJsonFormatter');
          dataForPdf = formatEVChargingJson(reportData.data);
        } else if (reportType === 'pat-testing' || reportType === 'pat testing') {
          const { formatPATTestingJson } = await import('@/utils/patTestingJsonFormatter');
          dataForPdf = formatPATTestingJson(reportData.data);
        } else if (reportType === 'fire-alarm' || reportType === 'fire alarm') {
          const { formatFireAlarmJson } = await import('@/utils/fireAlarmJsonFormatter');
          dataForPdf = formatFireAlarmJson(reportData.data);
        } else if (reportType === 'emergency-lighting' || reportType === 'emergency lighting') {
          const { formatEmergencyLightingJson } = await import('@/utils/emergencyLightingJsonFormatter');
          dataForPdf = formatEmergencyLightingJson(reportData.data);
        }
        // EIC and Minor Works: no standalone formatter available, fall through with raw data
      }

      // Optimize data and check size
      console.log('Optimizing data for PDF generation...');
      const optimizationResult = optimizeForPdfGeneration(dataForPdf);

      console.log(
        `Data size: ${optimizationResult.originalSizeMB.toFixed(2)}MB (optimised: ${optimizationResult.optimizedSizeMB.toFixed(2)}MB)`
      );

      if (optimizationResult.warnings.length > 0) {
        const warningText = formatSizeWarning(optimizationResult);
        console.warn('PDF generation warnings:', warningText);
        setSizeWarning(warningText);
      }

      // Try generation with optimized data
      const dataToSend = optimizationResult.optimizedData;
      const requestSize = new TextEncoder().encode(JSON.stringify(dataToSend)).length;
      console.log(`Sending ${(requestSize / 1024).toFixed(2)}KB to ${edgeFunctionName}...`);

      const requestBody: any = { formData: dataToSend };
      if (templateId) {
        requestBody.templateId = templateId;
        console.log(`Using template ID from settings: ${templateId}`);
      }

      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(
        edgeFunctionName,
        {
          body: requestBody,
        }
      );

      if (pdfError) {
        console.error('Edge function error:', pdfError);
        throw new Error(`PDF generation failed: ${pdfError.message || 'Unknown error'}`);
      }

      if (!pdfResult?.success || !pdfResult?.pdfUrl) {
        const errorMsg = pdfResult?.error || 'No PDF URL returned';
        console.error('PDF generation unsuccessful:', errorMsg);

        // Map template errors to user-friendly messages
        if (
          errorMsg.includes('Document template must exist') ||
          errorMsg.includes('Invalid or inaccessible PDF template')
        ) {
          throw new Error(
            "The selected PDF Monkey template ID isn't available for this account. Please check the Template ID in Settings or contact support."
          );
        }

        throw new Error(errorMsg);
      }

      console.log('PDF generated successfully:', pdfResult.pdfUrl);
      setPdfUrl(pdfResult.pdfUrl);

      // Create blob URL for iframe preview (bypasses CORS)
      const previewUrl = await createBlobUrlForPreview(pdfResult.pdfUrl);
      if (previewUrl) {
        setBlobUrl(previewUrl);
      }

      // Update report with PDF URL, document ID, and expiry
      const updateData: Record<string, any> = {
        pdf_url: pdfResult.pdfUrl,
        pdf_generated_at: new Date().toISOString(),
      };

      // Store document ID for potential regeneration
      if (pdfResult.documentId) {
        updateData.pdf_document_id = pdfResult.documentId;
      }

      // Store expiry date
      if (pdfResult.expiresAt) {
        updateData.pdf_expires_at = pdfResult.expiresAt;
      }

      await supabase.from('reports').update(updateData).eq('id', reportData.id);

      toast({
        title: 'PDF Generated',
        description: 'Certificate PDF is ready to view',
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate PDF';
      setGenerationError(errorMessage);

      toast({
        title: 'PDF Generation Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!report) return;

    // Use blob URL if available (already fetched via CORS proxy)
    if (blobUrl) {
      try {
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${report.certificate_number || 'certificate'}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
          title: 'Download Started',
          description: 'Your PDF is downloading...',
        });
        return;
      } catch (error) {
        console.error('Blob download error:', error);
      }
    }

    // Fallback: open PDF URL in new tab (browser handles CORS for navigation)
    if (pdfUrl) {
      await openOrDownloadPdf(pdfUrl, 'Certificate.pdf');
    } else {
      toast({
        title: 'No PDF Available',
        description: 'Please generate the PDF first',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = () => {
    if (!report) return;

    if (report.is_latest_version) {
      // Navigate directly to form
      navigateToForm();
    } else {
      // Show dialog asking if they want to create new version
      setShowEditDialog(true);
    }
  };

  const navigateToForm = () => {
    const reportType = report.report_type.toLowerCase();
    // Dedicated route types navigate to their own routes
    const dedicatedRouteTypes = ['ev-charging', 'fire-alarm', 'emergency-lighting', 'pat-testing', 'solar-pv'];
    if (dedicatedRouteTypes.includes(reportType)) {
      navigate(`/electrician/inspection-testing/${reportType}/${report.report_id || report.id}`);
    } else {
      // Legacy types use section-based routing via query params
      const params = new URLSearchParams();
      params.set('section', reportType);
      params.set('reportId', report.report_id || report.id);
      params.set('reportType', reportType);
      navigate(`/electrician/inspection-testing?${params.toString()}`);
    }
    onOpenChange(false);
  };

  const handleCreateNewVersion = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create new version
      const currentEditVersion = report.edit_version || 1;
      const newEditVersion = currentEditVersion + 1;
      const newCertNumber = `${report.certificate_number.split('-V')[0]}-V${newEditVersion}`;
      // Generate a new report_id with incremented version
      const baseReportId = report.report_id?.replace(/-V\d+$/, '') || report.report_id;
      const newReportId = `${baseReportId}-V${newEditVersion}`;

      const { data: newReport, error } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          customer_id: report.customer_id,
          report_type: report.report_type,
          certificate_number: newCertNumber,
          report_id: newReportId,
          data: report.data,
          status: 'draft',
          edit_version: newEditVersion,
          inspection_date: report.inspection_date,
          client_name: report.client_name,
          installation_address: report.installation_address,
          inspector_name: report.inspector_name,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'New Version Created',
        description: `Version ${newVersion} created successfully`,
      });

      // Navigate to edit new version
      const reportType = report.report_type.toLowerCase();
      const params = new URLSearchParams();
      params.set('section', reportType);
      params.set('reportId', newReport.report_id || newReport.id);
      params.set('reportType', reportType);
      navigate(`/electrician/inspection-testing?${params.toString()}`);
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating version:', error);
      toast({
        title: 'Error',
        description: 'Failed to create new version',
        variant: 'destructive',
      });
    }
  };

  const handleVersionChange = async (versionId: string) => {
    const selectedVersion = versions.find((v) => v.id === versionId);
    if (!selectedVersion) return;

    try {
      const { data: versionReport, error } = await supabase
        .from('reports')
        .select('*')
        .eq('id', versionId)
        .single();

      if (error) throw error;

      setReport(versionReport);
      setCurrentVersion(selectedVersion);

      // Clean up old blob URL
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        setBlobUrl(null);
      }

      if (versionReport.pdf_url) {
        setPdfUrl(versionReport.pdf_url);
        // Create blob URL for preview
        const previewUrl = await createBlobUrlForPreview(versionReport.pdf_url);
        if (previewUrl) {
          setBlobUrl(previewUrl);
        }
      } else {
        await generatePdf(versionReport);
      }
    } catch (error) {
      console.error('Error switching version:', error);
      toast({
        title: 'Error',
        description: 'Failed to load version',
        variant: 'destructive',
      });
    }
  };

  // Shared content for both mobile and desktop
  const renderPdfContent = () => (
    <div className="flex-1 overflow-auto bg-background relative">
      <div className="h-full flex flex-col">
        {/* Size Warning Alert */}
        {sizeWarning && (
          <Alert variant="default" className="m-4 mb-0">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="text-white">Data Size Warning</AlertTitle>
            <AlertDescription className="text-xs text-white whitespace-pre-line mt-2">
              {sizeWarning}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {generationError && (
          <Alert variant="destructive" className="m-4 mb-0">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-white">PDF Generation Failed</AlertTitle>
            <AlertDescription className="text-xs text-white mt-2">
              {generationError}
            </AlertDescription>
          </Alert>
        )}

        {/* PDF Content */}
        <div className="flex-1 relative">
          {isGenerating || isLoadingPreview ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <Loader2 className="h-10 w-10 animate-spin text-elec-yellow mb-4" />
              <p className="text-sm font-medium text-white">
                {isGenerating ? 'Generating PDF...' : 'Loading preview...'}
              </p>
              <p className="text-xs text-white mt-1">This may take a moment</p>
            </div>
          ) : blobUrl ? (
            isMobile ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <div className="p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20 mb-5">
                  <FileText className="h-10 w-10 text-elec-yellow" />
                </div>
                <p className="text-sm font-medium text-white text-center mb-1">
                  PDF Ready
                </p>
                <p className="text-xs text-white text-center mb-5">
                  Tap below to view or share
                </p>
                <Button onClick={handleDownload} className="h-12 px-8 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation active:scale-[0.98]">
                  <Download className="h-5 w-5 mr-2" />
                  Open PDF
                </Button>
              </div>
            ) : (
              <iframe
                src={`${blobUrl}#toolbar=1&navpanes=1&scrollbar=1`}
                className="absolute inset-0 w-full h-full border-0 bg-white"
                title="PDF Preview"
                style={{ minHeight: '400px' }}
              />
            )
          ) : pdfUrl && !blobUrl ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-5">
                <AlertCircle className="h-10 w-10 text-amber-400" />
              </div>
              <p className="text-sm font-medium text-white mb-1">Preview unavailable</p>
              {previewError && (
                <p className="text-xs text-red-400 mb-4 max-w-md text-center">{previewError}</p>
              )}
              <Button onClick={handleDownload} className="h-12 px-6 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation active:scale-[0.98]">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                onClick={() => report && generatePdf(report)}
                disabled={isGenerating}
                className="h-11 rounded-xl touch-manipulation mt-2 text-white border-white/[0.08]"
              >
                <Loader2 className={cn('h-4 w-4 mr-2', isGenerating && 'animate-spin')} />
                Regenerate PDF
              </Button>
            </div>
          ) : !generationError && !pdfUrl ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/[0.08] mb-5">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <p className="text-sm font-medium text-white mb-1">No PDF generated yet</p>
              <p className="text-xs text-white mb-5">
                Generate a PDF from the certificate form first
              </p>
              <Button
                onClick={() => report && generatePdf(report)}
                disabled={!report || isGenerating}
                className="h-12 px-6 rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400 touch-manipulation active:scale-[0.98]"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate PDF
                  </>
                )}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile: Bottom Sheet */}
      {isMobile && (
        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetContent side="bottom" className="h-[80vh] p-0 rounded-t-2xl flex flex-col bg-background">
            <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/[0.06] flex-shrink-0">
              <SheetDescription className="sr-only">
                View and manage certificate PDF
              </SheetDescription>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
                    <FileText className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <SheetTitle className="text-sm font-semibold text-white truncate">
                    {report?.certificate_number || 'Loading...'}
                  </SheetTitle>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {pdfUrl && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => generatePdf(report)}
                      disabled={isGenerating}
                      className="h-10 w-10 touch-manipulation rounded-xl hover:bg-white/10 text-white"
                      title="Regenerate PDF"
                    >
                      <Loader2 className={cn('h-4 w-4', isGenerating && 'animate-spin')} />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEdit}
                    disabled={isGenerating}
                    className="h-10 w-10 touch-manipulation rounded-xl hover:bg-white/10 text-white"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={handleDownload}
                    disabled={!pdfUrl || isGenerating}
                    className="h-10 w-10 touch-manipulation rounded-xl bg-elec-yellow text-black hover:bg-yellow-400"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </SheetHeader>
            {renderPdfContent()}
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop: Dialog */}
      {!isMobile && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 bg-background border-white/[0.08]">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-white/[0.06]">
              <DialogDescription className="sr-only">
                View and manage certificate PDF
              </DialogDescription>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="p-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 flex-shrink-0">
                    <FileText className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <DialogTitle className="text-base font-semibold text-white truncate">
                    {report?.certificate_number || 'Loading...'}
                  </DialogTitle>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {pdfUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => generatePdf(report)}
                      disabled={isGenerating}
                      title="Regenerate PDF"
                      className="text-white hover:bg-white/10 rounded-xl"
                    >
                      <Loader2 className={cn('h-4 w-4', isGenerating && 'animate-spin')} />
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={handleEdit} disabled={isGenerating} className="rounded-xl text-white border-white/[0.08] hover:bg-white/10">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleDownload}
                    disabled={!pdfUrl || isGenerating}
                    className="rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </DialogHeader>
            {renderPdfContent()}
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog - Create New Version */}
      <AlertDialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <AlertDialogContent className="bg-background border-white/[0.08]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Edit Previous Version?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              You're viewing version {currentVersion?.version}. Would you like to:
              <ul className="list-disc list-inside mt-4 space-y-2 text-white">
                <li>
                  <strong>Edit Current Version</strong> — Modify V{currentVersion?.version} directly
                </li>
                <li>
                  <strong>Create New Version</strong> — Create V{(currentVersion?.version || 0) + 1}{' '}
                  based on this version
                </li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="rounded-xl text-white border-white/[0.08] hover:bg-white/10">Cancel</AlertDialogCancel>
            <Button variant="outline" onClick={navigateToForm} className="rounded-xl text-white border-white/[0.08] hover:bg-white/10">
              Edit V{currentVersion?.version}
            </Button>
            <AlertDialogAction onClick={handleCreateNewVersion} className="rounded-xl bg-elec-yellow text-black font-semibold hover:bg-yellow-400">
              Create V{(currentVersion?.version || 0) + 1}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
