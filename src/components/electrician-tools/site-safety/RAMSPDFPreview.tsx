import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { generateRAMSPDFPreview } from '@/utils/rams-pdf-professional';
import { RAMSData, RAMSReportOptions } from '@/types/rams';
import { Loader2, Download, X } from 'lucide-react';

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

  useEffect(() => {
    if (isOpen) {
      generatePreview();
    } else {
      // Clean up blob URL when dialog closes
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl('');
      }
    }

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [isOpen, ramsData, reportOptions, signOff]);

  const generatePreview = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const dataUri = await generateRAMSPDFPreview(ramsData, { 
        ...reportOptions, 
        signOff 
      });
      
      // Convert data URI to blob URL for preview
      const byteCharacters = atob(dataUri.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      
      setPdfUrl(blobUrl);
    } catch (err) {
      console.error('Error generating PDF preview:', err);
      setError('Failed to generate PDF preview. Please check your data and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `RAMS-${ramsData.projectName || 'Document'}-${ramsData.date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] bg-elec-gray border-elec-yellow/20 p-0 gap-0">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b border-elec-yellow/20">
          <DialogTitle className="text-elec-yellow flex items-center gap-2 text-lg font-bold">
            RAMS Document Preview
          </DialogTitle>
          <div className="flex items-center gap-2">
            {pdfUrl && !isLoading && (
              <Button
                onClick={handleDownload}
                size="sm"
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 hidden sm:flex"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
            <Button
              onClick={onClose}
              size="sm"
              variant="outline"
              className="border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-elec-gray/80 backdrop-blur-sm z-10">
              <div className="text-center space-y-4 p-6 bg-elec-dark/90 rounded-lg border border-elec-yellow/20">
                <Loader2 className="h-12 w-12 animate-spin text-elec-yellow mx-auto" />
                <div>
                  <p className="text-elec-yellow font-medium">Generating PDF Preview</p>
                  <p className="text-muted-foreground text-sm">Creating professional RAMS document...</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-elec-gray/80 backdrop-blur-sm z-10">
              <div className="text-center space-y-4 max-w-md p-6 bg-elec-dark/90 rounded-lg border border-red-500/20">
                <div className="text-red-400 text-2xl">⚠️</div>
                <div>
                  <h3 className="text-red-400 font-bold text-lg mb-2">Preview Error</h3>
                  <p className="text-muted-foreground text-sm mb-4">{error}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button
                    onClick={generatePreview}
                    variant="outline"
                    className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                  >
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
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0 bg-white"
                title="RAMS PDF Preview"
                style={{ minHeight: '500px' }}
                onError={() => {
                  // Fallback: open in new tab if iframe fails
                  window.open(pdfUrl, '_blank');
                }}
              />
              {/* Fallback buttons if PDF doesn't load */}
              <div className="absolute bottom-4 right-4 opacity-75">
                <Button
                  onClick={() => window.open(pdfUrl, '_blank')}
                  size="sm"
                  variant="outline"
                  className="bg-white/90 border-gray-300 text-gray-700 hover:bg-white"
                >
                  Open in New Tab
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-t border-elec-yellow/20 bg-elec-dark/50">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            Professional-grade PDF with comprehensive risk management
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
            {pdfUrl && !isLoading && (
              <Button
                onClick={handleDownload}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 flex-1 sm:flex-none"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
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