import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Calendar,
  Printer,
  Share,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { MarkdownViewer } from '@/components/ui/MarkdownViewer';
import { useToast } from '@/hooks/use-toast';
import pdf from 'md-to-pdf';

interface GeneratedReportDisplayProps {
  report: string;
  template: string;
  onCopy?: () => void;
}

const GeneratedReportDisplay: React.FC<GeneratedReportDisplayProps> = ({
  report,
  template,
  onCopy
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  const reportTypeMap = {
    'eicr': 'EICR - Electrical Installation Condition Report',
    'minor-works': 'Minor Electrical Installation Works Certificate',
    'periodic-inspection': 'Periodic Inspection Report',
    'ev-charger': 'EV Charger Installation Certificate',
    'consumer-unit': 'Consumer Unit Installation Certificate',
    'rcd-test': 'RCD Test Certificate'
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      onCopy?.();
      toast({
        title: "Copied successfully",
        description: "Report content has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy report to clipboard.",
        variant: "destructive"
      });
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${reportTypeMap[template] || 'Electrical Report'}</title>
            <style>
              body { 
                font-family: system-ui, -apple-system, sans-serif; 
                line-height: 1.6; 
                max-width: 210mm; 
                margin: 0 auto; 
                padding: 20mm; 
                color: #000;
                background: #fff;
              }
              h1, h2, h3 { color: #000; margin-top: 2em; margin-bottom: 1em; }
              h1 { font-size: 24px; border-bottom: 2px solid #000; padding-bottom: 0.5em; }
              h2 { font-size: 20px; }
              h3 { font-size: 16px; }
              table { width: 100%; border-collapse: collapse; margin: 1em 0; }
              th, td { border: 1px solid #000; padding: 8px; text-align: left; }
              th { background-color: #f5f5f5; font-weight: bold; }
              .badge { 
                display: inline-block; 
                padding: 2px 8px; 
                background: #f0f0f0; 
                border: 1px solid #ccc; 
                border-radius: 4px; 
                font-size: 12px; 
                font-weight: bold; 
              }
              .danger { background: #ffebee; color: #c62828; }
              .pass { background: #e8f5e8; color: #2e7d2e; }
              .fail { background: #ffebee; color: #c62828; }
              @media print {
                body { margin: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <h1>${reportTypeMap[template] || 'Electrical Report'}</h1>
            <p><strong>Generated:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
            <hr>
            ${report.replace(/\n/g, '<br>')}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Markdown to PDF conversion
  const handleDownload = async () => {
    try {
      const reportTypeName = reportTypeMap[template] || 'Electrical Report';
      const filename = `${reportTypeName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Convert markdown to PDF
      const pdfResult = await pdf({ content: report }, {
        pdf_options: {
          format: 'A4',
          margin: {
            top: '20mm',
            right: '20mm',
            bottom: '20mm',
            left: '20mm'
          }
        }
      });

      // Create blob and download
      const blob = new Blob([pdfResult.content], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "PDF Generated",
        description: "Your electrical report has been downloaded successfully."
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const adjustZoom = (direction: 'in' | 'out') => {
    if (direction === 'in' && zoomLevel < 150) {
      setZoomLevel(prev => Math.min(prev + 10, 150));
    } else if (direction === 'out' && zoomLevel > 80) {
      setZoomLevel(prev => Math.max(prev - 10, 80));
    }
  };

  return (
    <Card className="bg-elec-dark border-border/30">
      {/* Header */}
      <div className="border-b border-border/20 p-6 sm:p-8 bg-card rounded-t-lg">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-xl transition-all duration-300">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 bg-primary/10 rounded-lg shadow-sm">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl font-bold text-foreground mb-2 text-left">
                    Generated Report
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <Badge 
                      variant="secondary" 
                      className="text-sm font-medium bg-primary/10 text-primary border-primary/20 w-fit"
                    >
                      {reportTypeMap[template] || template.toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date().toLocaleDateString('en-GB')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />
            
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Zoom Controls */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">Zoom:</span>
                <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 border border-border/30">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => adjustZoom('out')}
                    disabled={zoomLevel <= 80}
                    className="h-8 w-8 p-0 hover:bg-muted/80"
                  >
                    <ZoomOut className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium text-foreground min-w-[50px] text-center px-3">
                    {zoomLevel}%
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => adjustZoom('in')}
                    disabled={zoomLevel >= 150}
                    className="h-8 w-8 p-0 hover:bg-muted/80"
                  >
                    <ZoomIn className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 shadow-sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  <span>Download</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 shadow-sm"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  <span>Print</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div 
        className="p-6 bg-card"
        style={{ fontSize: `${zoomLevel}%` }}
      >
        <div className="bg-background rounded-lg border border-border/20 p-6">
          <MarkdownViewer 
            content={report}
            className="[&>*]:text-left [&_h1]:text-center [&_h1]:mx-auto"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border/20 p-4 bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Report generated using AI technology</span>
            <Badge variant="outline" className="text-xs">
              BS 7671:2018 Compliant
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <span>Characters: {report.length.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GeneratedReportDisplay;