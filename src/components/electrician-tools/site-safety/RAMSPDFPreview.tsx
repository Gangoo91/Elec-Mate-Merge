import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { generateRAMSPDFPreview } from '@/utils/rams-pdf-professional';
import { RAMSData, RAMSReportOptions } from '@/types/rams';
import { safeFileName } from '@/utils/rams-pdf-helpers';
import { toast } from '@/hooks/use-toast';
import { Loader2, Download, X, ZoomIn, ZoomOut, Printer, ExternalLink, RefreshCw, FileText } from 'lucide-react';

interface RAMSPDFPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  ramsData: RAMSData;
  reportOptions?: RAMSReportOptions;
  signOff?: any;
}

export const RAMSPDFPreview: React.FC<RAMSPDFPreviewProps> = ({
  isOpen,
  onClose,
  ramsData,
  reportOptions = {},
  signOff = {}
}) => {
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [pdfSupported, setPdfSupported] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const progressInterval = useRef<NodeJS.Timeout>();
  
  // Cache key for PDF caching
  const cacheKey = JSON.stringify({ ramsData, reportOptions, signOff });
  const pdfCache = useRef<Map<string, string>>(new Map());

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check PDF support
  useEffect(() => {
    const checkPdfSupport = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isIOS = /ipad|iphone|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      setPdfSupported(!isIOS && !isAndroid);
    };
    checkPdfSupport();
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Check cache first
      const cachedUrl = pdfCache.current.get(cacheKey);
      if (cachedUrl) {
        setPdfUrl(cachedUrl);
        setError('');
      } else {
        generatePreview();
      }
    } else {
      // Clean up progress interval when closing
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      setProgress(0);
      setZoom(1);
      setRetryCount(0);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isOpen, cacheKey]);

  const generatePreview = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setProgress(0);
    
    // Start progress animation
    progressInterval.current = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 15, 85));
    }, 200);
    
    try {
      const dataUri = await generateRAMSPDFPreview(ramsData, { 
        ...reportOptions, 
        signOff 
      });
      
      setProgress(90);
      
      // Convert data URI to blob URL for preview
      const byteCharacters = atob(dataUri.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      
      // Cache the URL
      pdfCache.current.set(cacheKey, blobUrl);
      
      setPdfUrl(blobUrl);
      setProgress(100);
      setRetryCount(0);
      
      toast({
        title: "PDF Generated",
        description: "Your RAMS document is ready for preview and download.",
      });
    } catch (err) {
      console.error('Error generating PDF preview:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to generate PDF: ${errorMessage}`);
      
      // Exponential backoff for retries
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          generatePreview();
        }, Math.pow(2, retryCount) * 1000);
      } else {
        toast({
          title: "PDF Generation Failed",
          description: "Please check your data and try again.",
          variant: "destructive",
        });
      }
    } finally {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      setIsLoading(false);
    }
  }, [ramsData, reportOptions, signOff, cacheKey, retryCount]);

  const handleDownload = useCallback(() => {
    if (pdfUrl) {
      const fileName = safeFileName(ramsData.projectName) + '_' + 
        new Date().toISOString().split('T')[0].replace(/-/g, '') + '.pdf';
      
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `Downloading ${fileName}`,
      });
    }
  }, [pdfUrl, ramsData.projectName]);

  const handlePrint = useCallback(() => {
    if (pdfUrl) {
      const printWindow = window.open(pdfUrl, '_blank');
      if (printWindow) {
        printWindow.addEventListener('load', () => {
          printWindow.print();
        });
      }
    }
  }, [pdfUrl]);

  const handleZoom = useCallback((direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? Math.min(prev + 0.25, 3) : Math.max(prev - 0.25, 0.5);
      if (iframeRef.current) {
        iframeRef.current.style.transform = `scale(${newZoom})`;
        iframeRef.current.style.transformOrigin = 'top left';
      }
      return newZoom;
    });
  }, []);

  const handleRefresh = useCallback(() => {
    // Clear cache and regenerate
    pdfCache.current.delete(cacheKey);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl('');
    }
    setRetryCount(0);
    generatePreview();
  }, [cacheKey, pdfUrl, generatePreview]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'max-w-[95vw] w-[95vw] h-[95vh]' : 'max-w-6xl w-[95vw] h-[90vh]'} bg-elec-gray border-elec-yellow/20 p-0 gap-0`}>
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4 border-b border-elec-yellow/20">
          <DialogTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg font-bold">
            <FileText className="h-5 w-5" />
            RAMS Document Preview
          </DialogTitle>
          <div className="flex items-center gap-1 sm:gap-2">
            {pdfUrl && !isLoading && !isMobile && (
              <>
                <Button
                  onClick={() => handleZoom('out')}
                  size="sm"
                  variant="outline"
                  className="border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10 h-8 w-8 p-0"
                  disabled={zoom <= 0.5}
                >
                  <ZoomOut className="h-3 w-3" />
                </Button>
                <span className="text-xs text-muted-foreground min-w-[3rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  onClick={() => handleZoom('in')}
                  size="sm"
                  variant="outline"
                  className="border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10 h-8 w-8 p-0"
                  disabled={zoom >= 3}
                >
                  <ZoomIn className="h-3 w-3" />
                </Button>
                <Button
                  onClick={handlePrint}
                  size="sm"
                  variant="outline"
                  className="border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10 h-8 w-8 p-0"
                >
                  <Printer className="h-3 w-3" />
                </Button>
              </>
            )}
            {!isLoading && (
              <Button
                onClick={handleRefresh}
                size="sm"
                variant="outline"
                className="border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10 h-8 w-8 p-0"
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            )}
            <Button
              onClick={onClose}
              size="sm"
              variant="outline"
              className="border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10 h-8 w-8 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-elec-gray/95 backdrop-blur-sm z-10">
              <div className="text-center space-y-4 p-4 sm:p-6 bg-elec-dark/95 rounded-lg border border-elec-yellow/20 max-w-sm mx-4">
                <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-elec-yellow mx-auto" />
                <div className="space-y-2">
                  <p className="text-elec-yellow font-medium text-sm sm:text-base">
                    Generating PDF Preview
                    {retryCount > 0 && ` (Attempt ${retryCount + 1})`}
                  </p>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Creating professional RAMS document...
                  </p>
                  <div className="w-full">
                    <Progress value={progress} className="h-2 bg-elec-gray" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round(progress)}% complete
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-elec-gray/95 backdrop-blur-sm z-10">
              <div className="text-center space-y-4 max-w-md mx-4 p-4 sm:p-6 bg-elec-dark/95 rounded-lg border border-red-500/20">
                <div className="text-red-400 text-xl sm:text-2xl">⚠️</div>
                <div>
                  <h3 className="text-red-400 font-bold text-base sm:text-lg mb-2">Preview Error</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-4 leading-relaxed">{error}</p>
                  {retryCount > 0 && (
                    <p className="text-yellow-400 text-xs mb-2">
                      Attempted {retryCount} time{retryCount > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <Button
                    onClick={handleRefresh}
                    variant="outline"
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    disabled={isLoading}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}

          {pdfUrl && !isLoading && !error && (
            <>
              {pdfSupported ? (
                <iframe
                  ref={iframeRef}
                  src={pdfUrl}
                  className="w-full h-full border-0 bg-white"
                  title="RAMS PDF Preview"
                  style={{ 
                    minHeight: isMobile ? '400px' : '500px',
                    transform: `scale(${zoom})`,
                    transformOrigin: 'top left',
                    width: `${100 / zoom}%`,
                    height: `${100 / zoom}%`
                  }}
                  onError={() => {
                    setPdfSupported(false);
                    toast({
                      title: "PDF Preview Error",
                      description: "Opening PDF in new tab instead.",
                      variant: "destructive",
                    });
                    window.open(pdfUrl, '_blank');
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gradient-to-br from-elec-gray to-elec-dark">
                  <div className="text-center space-y-4 p-6 bg-elec-dark/90 rounded-lg border border-elec-yellow/20 max-w-md mx-4">
                    <FileText className="h-16 w-16 text-elec-yellow mx-auto" />
                    <div>
                      <h3 className="text-elec-yellow font-bold text-lg mb-2">PDF Ready</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Your RAMS document has been generated successfully. 
                        {isMobile ? ' Tap' : ' Click'} below to view or download.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => window.open(pdfUrl, '_blank')}
                        className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open PDF
                      </Button>
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Floating action buttons for mobile */}
              {isMobile && pdfSupported && (
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <Button
                    onClick={() => window.open(pdfUrl, '_blank')}
                    size="sm"
                    className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 shadow-lg"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-3 p-3 sm:p-4 border-t border-elec-yellow/20 bg-elec-dark/50">
          <p className="text-xs text-muted-foreground text-center sm:text-left leading-relaxed">
            Professional BS7671-compliant PDF with comprehensive risk management
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
            {pdfUrl && !isLoading && (
              <>
                <Button
                  onClick={handleDownload}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 flex-1 sm:flex-none"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                {!isMobile && pdfSupported && (
                  <Button
                    onClick={handlePrint}
                    variant="outline"
                    className="border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                )}
              </>
            )}
            <Button
              onClick={onClose}
              variant="outline"
              className="border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10 flex-1 sm:flex-none"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};