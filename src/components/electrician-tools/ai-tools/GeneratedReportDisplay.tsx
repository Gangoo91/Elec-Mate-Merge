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

  // Function to process electrical elements for PDF
  const processElectricalElementsForPDF = (text: string): { processedText: string; badges: Array<{text: string, type: string, x: number, width: number}> } => {
    const badges: Array<{text: string, type: string, x: number, width: number}> = [];
    let processedText = text;
    
    // Process BS 7671 compliance badges
    processedText = processedText.replace(/(\[BS 7671[^\]]*\])/g, (match) => {
      badges.push({ text: match, type: 'bs7671', x: 0, width: 0 });
      return ` [BS7671_BADGE] `;
    });
    
    // Process result badges
    processedText = processedText.replace(/\b(PASS|SATISFACTORY)\b/g, (match) => {
      badges.push({ text: match, type: 'success', x: 0, width: 0 });
      return ` [SUCCESS_BADGE] `;
    });
    
    processedText = processedText.replace(/\b(FAIL|UNSATISFACTORY|DANGER)\b/g, (match) => {
      badges.push({ text: match, type: 'error', x: 0, width: 0 });
      return ` [ERROR_BADGE] `;
    });
    
    // Process code classifications
    processedText = processedText.replace(/\b(C1|C2|C3|FI)\b/g, (match) => {
      badges.push({ text: match, type: `code-${match.toLowerCase()}`, x: 0, width: 0 });
      return ` [CODE_BADGE] `;
    });
    
    // Process measurements
    processedText = processedText.replace(/(\d+\.?\d*)\s*(Ω|V|A|kW|Hz|mm²?|m)\b/g, (match) => {
      badges.push({ text: match, type: 'measurement', x: 0, width: 0 });
      return ` [MEASUREMENT] `;
    });
    
    return { processedText, badges };
  };

  const renderTextWithBadges = (doc: jsPDF, text: string, x: number, y: number, maxWidth: number): number => {
    const { processedText, badges } = processElectricalElementsForPDF(text);
    
    // Process bold and italic formatting
    let finalText = processedText;
    const formattingInfo: Array<{start: number, end: number, style: 'bold' | 'italic'}> = [];
    
    // Find bold text **text**
    let boldMatch;
    const boldRegex = /\*\*(.*?)\*\*/g;
    while ((boldMatch = boldRegex.exec(finalText)) !== null) {
      formattingInfo.push({
        start: boldMatch.index,
        end: boldMatch.index + boldMatch[1].length,
        style: 'bold'
      });
    }
    finalText = finalText.replace(/\*\*(.*?)\*\*/g, '$1');
    
    // Find italic text *text*
    let italicMatch;
    const italicRegex = /\*(.*?)\*/g;
    while ((italicMatch = italicRegex.exec(finalText)) !== null) {
      formattingInfo.push({
        start: italicMatch.index,
        end: italicMatch.index + italicMatch[1].length,
        style: 'italic'
      });
    }
    finalText = finalText.replace(/\*(.*?)\*/g, '$1');
    
    // Split by badge placeholders
    const parts = finalText.split(/\s*\[(BS7671_BADGE|SUCCESS_BADGE|ERROR_BADGE|CODE_BADGE|MEASUREMENT)\]\s*/);
    let currentX = x;
    let badgeIndex = 0;
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      
      if (['BS7671_BADGE', 'SUCCESS_BADGE', 'ERROR_BADGE', 'CODE_BADGE', 'MEASUREMENT'].includes(part)) {
        // This is a badge placeholder
        if (badgeIndex < badges.length) {
          const badge = badges[badgeIndex];
          const badgeWidth = doc.getTextWidth(badge.text) + 4;
          
          // Badge colors
          let fillColor: number[], textColor: number[];
          switch (badge.type) {
            case 'bs7671':
              fillColor = [255, 215, 0]; // Yellow
              textColor = [0, 0, 0];
              break;
            case 'success':
              fillColor = [76, 175, 80]; // Green
              textColor = [255, 255, 255];
              break;
            case 'error':
              fillColor = [244, 67, 54]; // Red
              textColor = [255, 255, 255];
              break;
            case 'code-c1':
              fillColor = [244, 67, 54]; // Red
              textColor = [255, 255, 255];
              break;
            case 'code-c2':
              fillColor = [255, 152, 0]; // Orange
              textColor = [255, 255, 255];
              break;
            case 'code-c3':
              fillColor = [255, 193, 7]; // Amber
              textColor = [0, 0, 0];
              break;
            case 'code-fi':
              fillColor = [33, 150, 243]; // Blue
              textColor = [255, 255, 255];
              break;
            case 'measurement':
              fillColor = [255, 235, 59]; // Light yellow
              textColor = [0, 0, 0];
              break;
            default:
              fillColor = [224, 224, 224];
              textColor = [0, 0, 0];
          }
          
          // Draw badge background
          doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
          doc.roundedRect(currentX, y - 4, badgeWidth, 6, 1, 1, 'F');
          
          // Draw badge border
          doc.setDrawColor(fillColor[0] * 0.8, fillColor[1] * 0.8, fillColor[2] * 0.8);
          doc.setLineWidth(0.2);
          doc.roundedRect(currentX, y - 4, badgeWidth, 6, 1, 1, 'S');
          
          // Draw badge text
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          doc.setFont(undefined, 'bold');
          doc.setFontSize(8);
          doc.text(badge.text, currentX + 2, y - 0.5);
          
          currentX += badgeWidth + 3;
          badgeIndex++;
        }
      } else if (part.trim()) {
        // Regular text
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        
        // Check if we need to wrap text
        if (currentX + doc.getTextWidth(part) > x + maxWidth) {
          y += 6;
          currentX = x;
        }
        
        doc.text(part, currentX, y);
        currentX += doc.getTextWidth(part);
      }
    }
    
    return y;
  };

  // Preprocess markdown content to clean up formatting
  const preprocessMarkdown = (content: string): string => {
    return content
      .split('\n')
      .filter(line => {
        const trimmed = line.trim();
        // Filter out table separator lines
        return !(trimmed.match(/^\|\s*[-:]+\s*\|/) || trimmed === '---' || trimmed === '***' || trimmed === '___');
      })
      .join('\n');
  };

  const generateReportPDF = (content: string, reportType: string) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
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

    // Preprocess and split content
    const processedContent = preprocessMarkdown(content);
    const lines = processedContent.split('\n');
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      
      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin;
      }

      if (line.trim() === '') {
        yPosition += 6;
        i++;
        continue;
      }

      // Handle horizontal rules
      const trimmed = line.trim();
      if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 10;
        i++;
        continue;
      }

      // Headers - all levels
      if (line.startsWith('# ')) {
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 215, 0);
        const text = line.substring(2);
        doc.text(text, margin, yPosition);
        yPosition += 20;
        i++;
      } else if (line.startsWith('## ')) {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 215, 0);
        const text = line.substring(3);
        doc.text(text, margin, yPosition);
        yPosition += 15;
        i++;
      } else if (line.startsWith('### ')) {
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 215, 0);
        const text = line.substring(4);
        doc.text(text, margin, yPosition);
        yPosition += 12;
        i++;
      } else if (line.startsWith('#### ')) {
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 215, 0);
        const text = line.substring(5);
        doc.text(text, margin, yPosition);
        yPosition += 10;
        i++;
      } else if (line.startsWith('##### ')) {
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 215, 0);
        const text = line.substring(6);
        doc.text(text, margin, yPosition);
        yPosition += 10;
        i++;
      } else if (line.startsWith('###### ')) {
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 215, 0);
        const text = line.substring(7);
        doc.text(text, margin, yPosition);
        yPosition += 10;
        i++;
      } else if (line.startsWith('| ') && line.includes('|')) {
        // Handle table - collect table rows
        const tableRows = [];
        let currentLineIndex = i;
        
        while (currentLineIndex < lines.length) {
          const currentLine = lines[currentLineIndex].trim();
          if (currentLine.startsWith('| ') && currentLine.includes('|')) {
            const row = currentLine
              .split('|')
              .map(cell => cell.trim())
              .filter(cell => cell !== '');
            if (row.length > 0 && !currentLine.includes('---')) {
              // Process electrical elements in table cells
              const processedRow = row.map(cell => {
                const { processedText } = processElectricalElementsForPDF(cell);
                // Clean up badge placeholders for table display
                return processedText
                  .replace(/\s*\[(BS7671_BADGE|SUCCESS_BADGE|ERROR_BADGE|CODE_BADGE|MEASUREMENT)\]\s*/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim();
              });
              tableRows.push(processedRow);
            }
            currentLineIndex++;
          } else {
            break;
          }
        }

        if (tableRows.length > 0) {
          const headerRow = tableRows[0];
          const dataRows = tableRows.slice(1);

          // Check if table fits on current page
          const estimatedTableHeight = (dataRows.length + 1) * 8 + 20;
          if (yPosition + estimatedTableHeight > pageHeight - 40) {
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
            alternateRowStyles: {
              fillColor: [248, 248, 248]
            },
            margin: { left: margin, right: margin },
            tableWidth: 'auto',
            columnStyles: {
              0: { cellWidth: 'auto' },
            }
          });

          yPosition = (doc as any).lastAutoTable.finalY + 10;
        }
        
        i = currentLineIndex;
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        // List items with electrical elements
        const text = line.substring(2);
        yPosition = renderTextWithBadges(doc, `• ${text}`, margin + 5, yPosition, maxWidth - 5);
        yPosition += 8;
        i++;
      } else {
        // Regular text with electrical elements
        yPosition = renderTextWithBadges(doc, line, margin, yPosition, maxWidth);
        yPosition += 8;
        i++;
      }
    }

    // Footer
    const totalPages = doc.internal.pages.length - 1;
    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      doc.setPage(pageNum);
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Page ${pageNum} of ${totalPages} | Generated by ElecConnect AI Report Writer`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
      doc.text(
        'All work complies with BS 7671:2018+A2:2022 regulations',
        pageWidth / 2,
        pageHeight - 20,
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