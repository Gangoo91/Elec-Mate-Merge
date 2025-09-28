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
import html2pdf from 'html2pdf.js';
import PDFDownloadButton from './PDFDownloadButton';

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

  const handlePrint = async () => {
    try {
      const { EnhancedMarkdownProcessor } = await import('@/utils/enhanced-markdown-processor');
      const processedHTML = EnhancedMarkdownProcessor.processMarkdownToHTML(report);
      const reportCSS = EnhancedMarkdownProcessor.getReportCSS();
      
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html lang="en-GB">
            <head>
              <meta charset="UTF-8">
              <title>${reportTypeMap[template] || 'Electrical Report'}</title>
              ${reportCSS}
              <style>
                @media print {
                  body { margin: 0; padding: 0; }
                  .electrical-report { margin: 0; padding: 15mm; }
                  .no-print { display: none; }
                  h1, h2, h3 { page-break-after: avoid; }
                  .electrical-table { page-break-inside: avoid; }
                  .safety-notice { page-break-inside: avoid; }
                }
              </style>
            </head>
            <body>
              <div class="electrical-report">
                <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #f59e0b; padding-bottom: 20px;">
                  <h1 style="color: #1a365d; margin-bottom: 10px;">${reportTypeMap[template] || 'Electrical Report'}</h1>
                  <p style="color: #4a5568; margin: 5px 0; font-weight: bold;">
                    Generated: ${new Date().toLocaleDateString('en-GB', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p style="color: #2d3748; margin: 5px 0; font-size: 14px;">
                    <span class="bs-ref">BS 7671:2018+A3:2024 COMPLIANT</span>
                  </p>
                </div>
                ${processedHTML}
                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center;">
                  <p style="color: #718096; font-size: 12px;">
                    Professional Electrical Installation Report - Generated using AI Technology
                  </p>
                </div>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    } catch (error) {
      console.error('Print preparation error:', error);
      toast({
        title: "Print Preparation Failed",
        description: "There was an error preparing the document for printing.",
        variant: "destructive"
      });
    }
  };

  // Enhanced markdown to PDF conversion
  const handleDownload = async () => {
    try {
      const reportTypeName = reportTypeMap[template] || 'Electrical Report';
      const filename = `${reportTypeName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      
      // Use enhanced markdown processor
      const { EnhancedMarkdownProcessor } = await import('@/utils/enhanced-markdown-processor');
      const processedHTML = EnhancedMarkdownProcessor.processMarkdownToHTML(report);
      const reportCSS = EnhancedMarkdownProcessor.getReportCSS();

      // Create comprehensive HTML content with professional styling
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en-GB">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${reportTypeName}</title>
          ${reportCSS}
        </head>
        <body>
          <div class="electrical-report">
            <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #f59e0b; padding-bottom: 25px;">
              <h1 style="color: #1a365d; margin-bottom: 15px; font-size: 32px;">${reportTypeName}</h1>
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="color: #4a5568; margin: 5px 0; font-weight: bold;">Generated: ${new Date().toLocaleDateString('en-GB', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p style="color: #2d3748; margin: 5px 0; font-size: 14px; font-weight: bold;">
                  <span class="bs-ref">BS 7671:2018+A3:2024 COMPLIANT</span>
                </p>
                <p style="color: #718096; margin: 5px 0; font-size: 12px;">
                  Professional Electrical Installation Report
                </p>
              </div>
            </div>
            <div class="report-content">
              ${processedHTML}
            </div>
            <div style="margin-top: 40px; padding-top: 25px; border-top: 2px solid #e2e8f0; text-align: center;">
              <p style="color: #718096; font-size: 12px; margin: 5px 0;">
                This report has been generated using AI technology in compliance with BS 7671:2018+A3:2024
              </p>
              <p style="color: #718096; font-size: 12px; margin: 5px 0;">
                Report ID: ${Date.now().toString(36).toUpperCase()}
              </p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Enhanced PDF generation options
      const opt = {
        margin: [0.8, 0.6, 0.8, 0.6], // top, left, bottom, right in inches
        filename: filename,
        image: { 
          type: 'jpeg', 
          quality: 0.95 
        },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { 
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.report-h1, .report-h2',
          after: '.electrical-table'
        }
      };

      await html2pdf().set(opt).from(htmlContent).save();
      
      toast({
        title: "Professional PDF Generated",
        description: `${reportTypeName} has been downloaded with enhanced formatting and BS 7671 compliance styling.`
      });
    } catch (error) {
      console.error('Enhanced PDF generation error:', error);
      toast({
        title: "PDF Generation Failed",
        description: "There was an error generating the professional PDF. Please try again.",
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
                <PDFDownloadButton
                  report={report}
                  template={template}
                  reportTypeName={reportTypeMap[template] || 'Electrical Report'}
                />
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