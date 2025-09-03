import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { generateRAMSPDFPreview } from '@/utils/rams-pdf';
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
      const blobUrl = await generateRAMSPDFPreview(ramsData, { 
        ...reportOptions, 
        signOff 
      });
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
      <DialogContent className="max-w-4xl w-[95vw] h-[90vh] bg-elec-gray border-elec-yellow/20">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-elec-yellow flex items-center gap-2">
            RAMS Document Preview
          </DialogTitle>
          <div className="flex items-center gap-2">
            {pdfUrl && !isLoading && (
              <Button
                onClick={handleDownload}
                size="sm"
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
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

        <div className="flex-1 overflow-hidden">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow mx-auto" />
                <p className="text-muted-foreground">Generating PDF preview...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4 max-w-md">
                <div className="text-red-400 text-lg">⚠️ Preview Error</div>
                <p className="text-muted-foreground">{error}</p>
                <Button
                  onClick={generatePreview}
                  variant="outline"
                  className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {pdfUrl && !isLoading && !error && (
            <iframe
              src={pdfUrl}
              className="w-full h-full border border-elec-yellow/20 rounded-lg bg-white"
              title="RAMS PDF Preview"
            />
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-elec-yellow/20">
          <p className="text-sm text-muted-foreground">
            Preview shows exactly how your PDF will look when downloaded
          </p>
          <div className="flex gap-2">
            {pdfUrl && !isLoading && (
              <Button
                onClick={handleDownload}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            )}
            <Button
              onClick={onClose}
              variant="outline"
              className="border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};