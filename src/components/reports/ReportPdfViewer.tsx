import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Download, Edit, Loader2, FileText, AlertCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { optimizeForPdfGeneration, formatSizeWarning } from '@/utils/pdfDataOptimizer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [versions, setVersions] = useState<ReportVersion[]>([]);
  const [currentVersion, setCurrentVersion] = useState<ReportVersion | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [sizeWarning, setSizeWarning] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  // Load report and versions
  useEffect(() => {
    if (!open || !reportId) return;

    const loadReport = async () => {
      try {
        // Fetch current report
        const { data: reportData, error } = await supabase
          .from('reports')
          .select('*')
          .eq('id', reportId)
          .single();

        if (error) throw error;

        setReport(reportData);
        setCurrentVersion({
          id: reportData.id,
          version: reportData.version || 1,
          created_at: reportData.created_at,
          certificate_number: reportData.certificate_number,
          is_latest_version: reportData.is_latest_version ?? true,
        });

        // Fetch all versions if this report has a parent or children
        const parentId = reportData.parent_report_id || reportData.id;
        const { data: versionData } = await supabase
          .from('reports')
          .select('id, version, created_at, certificate_number, is_latest_version')
          .or(`id.eq.${parentId},parent_report_id.eq.${parentId}`)
          .order('version', { ascending: true });

        if (versionData) {
          setVersions(versionData);
        }

        // Check if PDF exists and is still valid (not stale)
        const pdfExists = reportData.pdf_url;
        const pdfGeneratedAt = reportData.pdf_generated_at ? new Date(reportData.pdf_generated_at) : null;
        const dataUpdatedAt = new Date(reportData.updated_at);
        const isPdfStale = pdfGeneratedAt && dataUpdatedAt > pdfGeneratedAt;
        
        if (pdfExists && !isPdfStale) {
          console.log('[ReportPdfViewer] Using cached PDF from:', reportData.pdf_generated_at);
          setPdfUrl(reportData.pdf_url);
        } else {
          if (isPdfStale) {
            console.log('[ReportPdfViewer] PDF is stale, regenerating...');
          }
          await generatePdf(reportData);
        }
      } catch (error) {
        console.error('Error loading report:', error);
        toast({
          title: "Error",
          description: "Failed to load report",
          variant: "destructive",
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

      // Optimize data and check size
      console.log('Optimizing data for PDF generation...');
      const optimizationResult = optimizeForPdfGeneration(reportData.data);
      
      console.log(`Data size: ${optimizationResult.originalSizeMB.toFixed(2)}MB (optimised: ${optimizationResult.optimizedSizeMB.toFixed(2)}MB)`);
      
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

      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(edgeFunctionName, {
        body: requestBody
      });

      if (pdfError) {
        console.error('Edge function error:', pdfError);
        throw new Error(`PDF generation failed: ${pdfError.message || 'Unknown error'}`);
      }

      if (!pdfResult?.success || !pdfResult?.pdfUrl) {
        const errorMsg = pdfResult?.error || 'No PDF URL returned';
        console.error('PDF generation unsuccessful:', errorMsg);
        
        // Map template errors to user-friendly messages
        if (errorMsg.includes('Document template must exist') || errorMsg.includes('Invalid or inaccessible PDF template')) {
          throw new Error('The selected PDF Monkey template ID isn\'t available for this account. Please check the Template ID in Settings or contact support.');
        }
        
        throw new Error(errorMsg);
      }

      console.log('PDF generated successfully:', pdfResult.pdfUrl);
      setPdfUrl(pdfResult.pdfUrl);

      // Update report with PDF URL
      await supabase
        .from('reports')
        .update({ 
          pdf_url: pdfResult.pdfUrl,
          pdf_generated_at: new Date().toISOString()
        })
        .eq('id', reportData.id);

      toast({
        title: "PDF Generated",
        description: "Certificate PDF is ready to view",
      });

    } catch (error) {
      console.error('PDF generation error:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to generate PDF";
      setGenerationError(errorMessage);
      
      toast({
        title: "PDF Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
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
    navigate('/', {
      state: {
        reportId: report.id,
        section: reportType,
        reportType: reportType,
      }
    });
    onOpenChange(false);
  };

  const handleCreateNewVersion = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create new version
      const newVersion = report.version + 1;
      const newCertNumber = `${report.certificate_number.split('-V')[0]}-V${newVersion}`;

      const { data: newReport, error } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          customer_id: report.customer_id,
          report_type: report.report_type,
          certificate_number: newCertNumber,
          report_id: report.report_id,
          data: report.data,
          status: 'draft',
          version: newVersion,
          parent_report_id: report.parent_report_id || report.id,
          is_latest_version: true,
          inspection_date: report.inspection_date,
          client_name: report.client_name,
          installation_address: report.installation_address,
          inspector_name: report.inspector_name,
        })
        .select()
        .single();

      if (error) throw error;

      // Mark old version as not latest
      await supabase
        .from('reports')
        .update({ is_latest_version: false })
        .eq('id', report.id);

      toast({
        title: "New Version Created",
        description: `Version ${newVersion} created successfully`,
      });

      // Navigate to edit new version
      navigate('/', {
        state: {
          reportId: newReport.id,
          section: report.report_type.toLowerCase(),
          reportType: report.report_type.toLowerCase(),
        }
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating version:', error);
      toast({
        title: "Error",
        description: "Failed to create new version",
        variant: "destructive",
      });
    }
  };

  const handleVersionChange = async (versionId: string) => {
    const selectedVersion = versions.find(v => v.id === versionId);
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
      
      if (versionReport.pdf_url) {
        setPdfUrl(versionReport.pdf_url);
      } else {
        await generatePdf(versionReport);
      }
    } catch (error) {
      console.error('Error switching version:', error);
      toast({
        title: "Error",
        description: "Failed to load version",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b">
            <DialogDescription className="sr-only">
              View and manage certificate PDF versions
            </DialogDescription>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                <DialogTitle className="text-lg sm:text-xl truncate">
                  {report?.certificate_number || 'Loading...'}
                </DialogTitle>
                {currentVersion && (
                  <>
                    {versions.length > 1 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-shrink-0">
                            V{currentVersion.version} ▼
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {versions.map((version) => (
                            <DropdownMenuItem
                              key={version.id}
                              onClick={() => handleVersionChange(version.id)}
                              className="flex items-center justify-between gap-4"
                            >
                              <span>V{version.version}</span>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(version.created_at), 'dd/MM/yyyy')}
                              </span>
                              {version.is_latest_version && (
                                <Badge variant="default" className="ml-2">Latest</Badge>
                              )}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    {currentVersion.is_latest_version && (
                      <Badge variant="default">Latest</Badge>
                    )}
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {pdfUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => generatePdf(report)}
                    disabled={isGenerating}
                    title="Regenerate PDF"
                  >
                    <Loader2 className={cn("h-4 w-4", isGenerating && "animate-spin")} />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  disabled={isGenerating}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  disabled={!pdfUrl || isGenerating}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-auto bg-muted/50 relative">
            <div className="h-full flex flex-col">
              {/* Size Warning Alert */}
              {sizeWarning && (
                <Alert variant="default" className="m-4 mb-0">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Data Size Warning</AlertTitle>
                  <AlertDescription className="text-xs whitespace-pre-line mt-2">
                    {sizeWarning}
                  </AlertDescription>
                </Alert>
              )}

              {/* Error Alert */}
              {generationError && (
                <Alert variant="destructive" className="m-4 mb-0">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>PDF Generation Failed</AlertTitle>
                  <AlertDescription className="text-xs mt-2">
                    {generationError}
                    <br /><br />
                    <strong>Common causes:</strong>
                    <ul className="list-disc list-inside mt-1">
                      <li>Data size exceeds 1MB limit (check for large embedded images)</li>
                      <li>Network timeout or edge function error</li>
                      <li>Invalid data format</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* PDF Content */}
              <div className="flex-1 flex items-center justify-center">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Generating PDF...</p>
                    <p className="text-xs text-muted-foreground mt-2">This may take a moment</p>
                  </div>
                ) : pdfUrl ? (
                  isMobile ? (
                    <div className="flex flex-col items-center justify-center p-6">
                      <FileText className="h-16 w-16 text-primary mb-4" />
                      <p className="text-center mb-4">PDF preview not available on mobile</p>
                      <Button onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Open PDF
                      </Button>
                    </div>
                  ) : (
                    <iframe
                      src={pdfUrl}
                      className="w-full h-full border-0 absolute inset-0"
                      title="PDF Preview"
                    />
                  )
                ) : !generationError ? (
                  <div className="flex flex-col items-center justify-center">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">PDF not available</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog - Create New Version */}
      <AlertDialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Previous Version?</AlertDialogTitle>
            <AlertDialogDescription>
              You're viewing version {currentVersion?.version}. Would you like to:
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li><strong>Edit Current Version</strong> - Modify V{currentVersion?.version} directly</li>
                <li><strong>Create New Version</strong> - Create V{(currentVersion?.version || 0) + 1} based on this version</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button variant="outline" onClick={navigateToForm}>
              Edit V{currentVersion?.version}
            </Button>
            <AlertDialogAction onClick={handleCreateNewVersion}>
              Create V{(currentVersion?.version || 0) + 1}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
