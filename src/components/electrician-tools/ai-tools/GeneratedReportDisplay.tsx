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
import { processReportMarkdown, ReportHeader } from '@/utils/reportMarkdownProcessor';
import { useToast } from '@/hooks/use-toast';

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

  const handleDownload = () => {
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template}-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const adjustZoom = (direction: 'in' | 'out') => {
    if (direction === 'in' && zoomLevel < 150) {
      setZoomLevel(prev => Math.min(prev + 10, 150));
    } else if (direction === 'out' && zoomLevel > 80) {
      setZoomLevel(prev => Math.max(prev - 10, 80));
    }
  };

  return (
    <Card className="bg-card border-border/30">
      {/* Header */}
      <div className="border-b border-border/20 p-4 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-foreground">Generated Report</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-1">
                <Badge variant="secondary" className="text-xs w-fit">
                  {reportTypeMap[template] || template.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date().toLocaleDateString('en-GB')}
                </div>
              </div>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustZoom('out')}
                disabled={zoomLevel <= 80}
                className="h-8 w-8 p-0 border-0 bg-transparent hover:bg-muted"
              >
                <ZoomOut className="h-3 w-3" />
              </Button>
              <span className="text-xs text-muted-foreground min-w-[40px] text-center px-2">
                {zoomLevel}%
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => adjustZoom('in')}
                disabled={zoomLevel >= 150}
                className="h-8 w-8 p-0 border-0 bg-transparent hover:bg-muted"
              >
                <ZoomIn className="h-3 w-3" />
              </Button>
            </div>
            
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                <Download className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                <Printer className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Print</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div 
        className="p-6"
        style={{ fontSize: `${zoomLevel}%` }}
      >
        <div className="bg-background/50 rounded-lg border border-border/20 p-6">
          <div className="prose prose-neutral dark:prose-invert max-w-none text-left [&>*]:text-left [&_h1]:text-center [&_h1]:mx-auto">
            {processReportMarkdown(report)}
          </div>
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