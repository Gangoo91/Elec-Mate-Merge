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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

  const generateReportPDF = (content: string, reportType: string) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Header
    doc.setFontSize(18);
    doc.setTextColor(47, 47, 47);
    doc.text(reportType, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-GB')}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // Draw header line
    doc.setDrawColor(255, 215, 0);
    doc.setLineWidth(2);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;

    // Process content
    const lines = content.split('\n');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    for (const line of lines) {
      // Check if we need a new page
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin;
      }

      if (line.trim() === '') {
        yPosition += 6;
        continue;
      }

      // Headers
      if (line.startsWith('# ')) {
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(47, 47, 47);
        const text = line.substring(2);
        doc.text(text, margin, yPosition);
        yPosition += 20;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
      } else if (line.startsWith('## ')) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(47, 47, 47);
        const text = line.substring(3);
        doc.text(text, margin, yPosition);
        yPosition += 15;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
      } else if (line.startsWith('### ')) {
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(47, 47, 47);
        const text = line.substring(4);
        doc.text(text, margin, yPosition);
        yPosition += 12;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
      } else if (line.startsWith('| ')) {
        // Handle table - collect table rows
        const tableRows = [];
        let currentLineIndex = lines.indexOf(line);
        
        while (currentLineIndex < lines.length && lines[currentLineIndex].startsWith('| ')) {
          const row = lines[currentLineIndex]
            .split('|')
            .map(cell => cell.trim())
            .filter(cell => cell !== '');
          if (row.length > 0) {
            tableRows.push(row);
          }
          currentLineIndex++;
        }

        if (tableRows.length > 1) {
          // Skip separator row if it exists
          const headerRow = tableRows[0];
          const dataRows = tableRows.slice(tableRows[1].every(cell => cell.match(/^-+$/)) ? 2 : 1);

          if (yPosition + (dataRows.length * 8) > pageHeight - 30) {
            doc.addPage();
            yPosition = margin;
          }

          autoTable(doc, {
            startY: yPosition,
            head: [headerRow],
            body: dataRows,
            theme: 'grid',
            headStyles: { 
              fillColor: [255, 215, 0], 
              textColor: [0, 0, 0],
              fontSize: 9,
              fontStyle: 'bold'
            },
            bodyStyles: { 
              fontSize: 8,
              textColor: [0, 0, 0]
            },
            margin: { left: margin, right: margin },
            tableWidth: 'auto',
            columnStyles: {
              0: { cellWidth: 'auto' },
            }
          });

          yPosition = (doc as any).lastAutoTable.finalY + 10;
        }
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        // List items
        doc.setTextColor(0, 0, 0);
        const text = line.substring(2);
        const splitText = doc.splitTextToSize(text, pageWidth - margin * 2 - 10);
        doc.text('• ' + splitText[0], margin + 5, yPosition);
        for (let i = 1; i < splitText.length; i++) {
          yPosition += 6;
          doc.text('  ' + splitText[i], margin + 5, yPosition);
        }
        yPosition += 8;
      } else {
        // Regular text
        doc.setTextColor(0, 0, 0);
        const cleanText = line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
        const splitText = doc.splitTextToSize(cleanText, pageWidth - margin * 2);
        for (const textLine of splitText) {
          if (yPosition > pageHeight - 30) {
            doc.addPage();
            yPosition = margin;
          }
          doc.text(textLine, margin, yPosition);
          yPosition += 6;
        }
        yPosition += 4;
      }
    }

    // Footer
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Page ${i} of ${totalPages} | Generated by ElecConnect AI Report Writer`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    return doc;
  };

  const handleDownload = () => {
    try {
      const reportType = reportTypeMap[template] || 'Electrical Report';
      const pdf = generateReportPDF(report, reportType);
      const fileName = `${template}-report-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      toast({
        title: "Download successful",
        description: "Report has been downloaded as PDF.",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to generate PDF report.",
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
        <div className="bg-background/50 rounded-lg border border-border/20 p-6">
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