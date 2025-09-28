import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format as formatDate } from "date-fns";
import { safeText } from './rams-pdf-helpers';

// Extend jsPDF with autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface ProfessionalElectricalPDFOptions {
  reportType: string;
  companyName?: string;
  logoUrl?: string;
  includeSignatures?: boolean;
  watermark?: string;
}

// Advanced content processing interfaces
interface ProcessedSection {
  type: 'header' | 'table' | 'list' | 'blockquote' | 'text' | 'technical';
  level?: number;
  content: string;
  data?: any;
}

interface TableRow {
  cells: string[];
  isHeader?: boolean;
}

interface ProcessedTable {
  headers: string[];
  rows: TableRow[];
}

/**
 * Enhanced PDF generation for electrical reports with professional formatting
 * and BS 7671 compliance styling
 */
export const generateEnhancedElectricalPDF = async (
  markdownContent: string,
  reportType: string,
  filename?: string,
  options: ProfessionalElectricalPDFOptions = { reportType }
): Promise<void> => {
  try {
    console.log('Starting enhanced electrical PDF generation...');
    
    // Clean and preprocess content
    const cleanContent = safeText(markdownContent);
    console.log('Content cleaned and entities decoded');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 18;
    let yPosition = margin;

    // Professional header section
    const addHeader = () => {
      // Background for header
      pdf.setFillColor(248, 250, 252);
      pdf.rect(0, 0, pageWidth, 70, 'F');
      
      // Main title with professional styling
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(26);
      pdf.setTextColor(15, 23, 42); // Slate-900
      pdf.text(safeText(reportType), pageWidth / 2, yPosition + 8, { align: 'center' });
      yPosition += 15;

      // Compliance badge with border
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(16, 185, 129); // Emerald-500
      pdf.setDrawColor(16, 185, 129);
      pdf.setLineWidth(1);
      const badgeText = 'BS 7671:2018+A3:2024 COMPLIANT';
      const badgeWidth = pdf.getTextWidth(badgeText) + 10;
      const badgeX = (pageWidth - badgeWidth) / 2;
      pdf.rect(badgeX, yPosition - 3, badgeWidth, 8);
      pdf.text(badgeText, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Company name with enhanced styling
      if (options.companyName) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(16);
        pdf.setTextColor(51, 65, 85); // Slate-700
        pdf.text(safeText(options.companyName), pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 12;
      }

      // Date with improved formatting
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(100, 116, 139); // Slate-500
      const dateText = `Generated: ${formatDate(new Date(), "EEEE, do MMMM yyyy 'at' HH:mm")}`;
      pdf.text(dateText, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 6;

      // Report ID with enhanced format
      const reportId = `EIR-${Date.now().toString(36).toUpperCase()}`;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text(`Report Reference: ${reportId}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Professional separator
      pdf.setDrawColor(245, 158, 11); // Amber-500
      pdf.setLineWidth(3);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      pdf.setDrawColor(226, 232, 240); // Slate-200
      pdf.setLineWidth(1);
      pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
      yPosition += 20;
    };

    // Advanced content processing pipeline
    const parseMarkdownToSections = (content: string): ProcessedSection[] => {
      const lines = content.split('\n');
      const sections: ProcessedSection[] = [];
      let currentTable: string[] = [];
      let inTable = false;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (!line) {
          if (inTable && currentTable.length > 0) {
            sections.push({
              type: 'table',
              content: currentTable.join('\n'),
              data: parseTable(currentTable)
            });
            currentTable = [];
            inTable = false;
          }
          continue;
        }
        
        // Check for table start/continuation
        if (line.startsWith('|')) {
          if (!inTable) {
            inTable = true;
          }
          currentTable.push(line);
          continue;
        } else if (inTable) {
          // End of table
          sections.push({
            type: 'table',
            content: currentTable.join('\n'),
            data: parseTable(currentTable)
          });
          currentTable = [];
          inTable = false;
        }
        
        // Process other content types
        if (line.startsWith('###')) {
          sections.push({
            type: 'header',
            level: 3,
            content: safeText(line.replace(/^###\s*/, ''))
          });
        } else if (line.startsWith('##')) {
          sections.push({
            type: 'header',
            level: 2,
            content: safeText(line.replace(/^##\s*/, ''))
          });
        } else if (line.startsWith('#')) {
          sections.push({
            type: 'header',
            level: 1,
            content: safeText(line.replace(/^#\s*/, ''))
          });
        } else if (line.startsWith('-')) {
          sections.push({
            type: 'list',
            content: safeText(line.replace(/^-\s*/, ''))
          });
        } else if (line.startsWith('>')) {
          sections.push({
            type: 'blockquote',
            content: safeText(line.replace(/^>\s*/, ''))
          });
        } else if (line.startsWith('```') || line.includes('Regulation') || line.includes('BS 7671')) {
          sections.push({
            type: 'technical',
            content: safeText(line)
          });
        } else {
          sections.push({
            type: 'text',
            content: safeText(line)
          });
        }
      }
      
      // Handle any remaining table
      if (inTable && currentTable.length > 0) {
        sections.push({
          type: 'table',
          content: currentTable.join('\n'),
          data: parseTable(currentTable)
        });
      }
      
      return sections;
    };

    const parseTable = (tableLines: string[]): ProcessedTable => {
      if (tableLines.length < 2) {
        return { headers: [], rows: [] };
      }
      
      const headers = tableLines[0]
        .split('|')
        .map(cell => safeText(cell))
        .filter(cell => cell);
      
      const rows: TableRow[] = [];
      
      // Skip header and separator line, process data rows
      for (let i = 2; i < tableLines.length; i++) {
        const cells = tableLines[i]
          .split('|')
          .map(cell => safeText(cell))
          .filter(cell => cell);
        
        if (cells.length > 0) {
          rows.push({ cells });
        }
      }
      
      return { headers, rows };
    };

    const checkPageSpace = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };

    const renderHeader = (section: ProcessedSection) => {
      checkPageSpace(20);
      
      const sizes = { 1: 20, 2: 16, 3: 14 };
      const colors = {
        1: [15, 23, 42], // slate-900
        2: [30, 41, 59], // slate-800
        3: [51, 65, 85]  // slate-700
      };
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(sizes[section.level as keyof typeof sizes] || 12);
      const color = colors[section.level as keyof typeof colors] || [74, 85, 104];
      pdf.setTextColor(color[0], color[1], color[2]);
      
      pdf.text(section.content, margin, yPosition);
      yPosition += sizes[section.level as keyof typeof sizes] === 20 ? 15 : sizes[section.level as keyof typeof sizes] === 16 ? 12 : 10;
      
      // Add decorative line for main headers
      if (section.level === 1) {
        pdf.setDrawColor(245, 158, 11); // amber-500
        pdf.setLineWidth(2);
        pdf.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 8;
      } else if (section.level === 2) {
        pdf.setDrawColor(226, 232, 240); // slate-200
        pdf.setLineWidth(1);
        pdf.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 6;
      }
    };

    const renderTable = (section: ProcessedSection) => {
      const table = section.data as ProcessedTable;
      if (!table || table.headers.length === 0) return;
      
      checkPageSpace(30);
      
      const colWidth = (pageWidth - 2 * margin) / table.headers.length;
      const startY = yPosition;
      
      // Header row
      pdf.setFillColor(248, 250, 252); // slate-50
      pdf.rect(margin, yPosition - 4, pageWidth - 2 * margin, 12, 'F');
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(15, 23, 42); // slate-900
      
      table.headers.forEach((header, i) => {
        const x = margin + i * colWidth + 3;
        pdf.text(header, x, yPosition + 2);
      });
      yPosition += 12;
      
      // Data rows
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      
      table.rows.forEach((row, rowIndex) => {
        checkPageSpace(10);
        
        // Alternate row colors
        if (rowIndex % 2 === 0) {
          pdf.setFillColor(254, 254, 255); // slate-25
          pdf.rect(margin, yPosition - 2, pageWidth - 2 * margin, 8, 'F');
        }
        
        row.cells.forEach((cell, cellIndex) => {
          const x = margin + cellIndex * colWidth + 3;
          
          // Color code safety classifications
          if (cell.match(/^(C1|FAIL|UNSATISFACTORY)$/i)) {
            pdf.setTextColor(220, 38, 38); // red-600
          } else if (cell.match(/^C2$/i)) {
            pdf.setTextColor(245, 158, 11); // amber-500
          } else if (cell.match(/^C3$/i)) {
            pdf.setTextColor(16, 185, 129); // emerald-500
          } else if (cell.match(/^(PASS|SATISFACTORY)$/i)) {
            pdf.setTextColor(34, 197, 94); // green-500
          } else {
            pdf.setTextColor(51, 65, 85); // slate-700
          }
          
          const maxWidth = colWidth - 6;
          const lines = pdf.splitTextToSize(cell, maxWidth);
          
          lines.forEach((line: string, lineIndex: number) => {
            pdf.text(line, x, yPosition + lineIndex * 4);
          });
        });
        
        yPosition += Math.max(8, row.cells.reduce((max, cell) => {
          const lines = pdf.splitTextToSize(cell, colWidth - 6);
          return Math.max(max, lines.length * 4);
        }, 8));
      });
      
      // Table border
      pdf.setDrawColor(226, 232, 240); // slate-200
      pdf.setLineWidth(0.5);
      pdf.rect(margin, startY - 4, pageWidth - 2 * margin, yPosition - startY + 4);
      
      yPosition += 8;
    };

    const renderText = (section: ProcessedSection) => {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(51, 65, 85); // slate-700
      
      // Process markdown formatting
      let text = section.content
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers for now
        .replace(/\*(.*?)\*/g, '$1');    // Remove italic markers
      
      const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
      
      lines.forEach((line: string) => {
        checkPageSpace(6);
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });
      
      yPosition += 3; // Extra spacing after paragraphs
    };

    const renderList = (section: ProcessedSection) => {
      checkPageSpace(8);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(51, 65, 85); // slate-700
      
      const bulletText = `• ${section.content}`;
      const lines = pdf.splitTextToSize(bulletText, pageWidth - margin - 15);
      
      lines.forEach((line: string, index: number) => {
        pdf.text(line, margin + (index === 0 ? 5 : 10), yPosition);
        yPosition += 5;
      });
      
      yPosition += 2;
    };

    const renderBlockquote = (section: ProcessedSection) => {
      checkPageSpace(12);
      
      // Safety notice background
      pdf.setFillColor(254, 242, 242); // red-50
      const textHeight = Math.max(12, section.content.length / 10);
      pdf.rect(margin, yPosition - 3, pageWidth - 2 * margin, textHeight, 'F');
      
      // Left border
      pdf.setFillColor(239, 68, 68); // red-500
      pdf.rect(margin, yPosition - 3, 3, textHeight, 'F');
      
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(10);
      pdf.setTextColor(153, 27, 27); // red-800
      
      const lines = pdf.splitTextToSize(section.content, pageWidth - 2 * margin - 10);
      lines.forEach((line: string) => {
        pdf.text(line, margin + 8, yPosition);
        yPosition += 5;
      });
      
      yPosition += 8;
    };

    const renderTechnical = (section: ProcessedSection) => {
      checkPageSpace(10);
      
      // Technical content background
      pdf.setFillColor(241, 245, 249); // slate-100
      const textHeight = 10;
      pdf.rect(margin, yPosition - 2, pageWidth - 2 * margin, textHeight, 'F');
      
      pdf.setFont('courier', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(30, 41, 59); // slate-800
      
      pdf.text(section.content, margin + 5, yPosition + 2);
      yPosition += 12;
    };

    // Process all sections
    const processAdvancedContent = (content: string) => {
      const sections = parseMarkdownToSections(content);
      
      sections.forEach(section => {
        switch (section.type) {
          case 'header':
            renderHeader(section);
            break;
          case 'table':
            renderTable(section);
            break;
          case 'text':
            renderText(section);
            break;
          case 'list':
            renderList(section);
            break;
          case 'blockquote':
            renderBlockquote(section);
            break;
          case 'technical':
            renderTechnical(section);
            break;
        }
      });
    };

    // Add professional header
    addHeader();

    // Process content with advanced pipeline
    processAdvancedContent(cleanContent);

    // Add professional signature section
    if (options.includeSignatures) {
      checkPageSpace(100);
      yPosition += 20;
      
      // Section background
      pdf.setFillColor(249, 250, 251); // gray-50
      pdf.rect(margin, yPosition - 5, pageWidth - 2 * margin, 85, 'F');
      
      // Signatures header
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(15, 23, 42); // slate-900
      pdf.text('CERTIFICATION AND SIGNATURES', margin + 5, yPosition + 5);
      yPosition += 20;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(51, 65, 85); // slate-700
      
      // Professional styling for signature blocks
      const signatureBlockHeight = 25;
      
      // Inspector signature block
      pdf.setFillColor(255, 255, 255);
      pdf.rect(margin + 5, yPosition, (pageWidth - 2 * margin - 15) / 2, signatureBlockHeight, 'F');
      pdf.setDrawColor(203, 213, 225); // slate-300
      pdf.rect(margin + 5, yPosition, (pageWidth - 2 * margin - 15) / 2, signatureBlockHeight);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text('QUALIFIED ELECTRICIAN', margin + 10, yPosition + 8);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text('Signature:', margin + 10, yPosition + 15);
      pdf.text('Date:', margin + 10, yPosition + 20);
      
      // Client signature block
      const clientX = margin + 10 + (pageWidth - 2 * margin - 15) / 2;
      pdf.setFillColor(255, 255, 255);
      pdf.rect(clientX, yPosition, (pageWidth - 2 * margin - 15) / 2, signatureBlockHeight, 'F');
      pdf.setDrawColor(203, 213, 225); // slate-300
      pdf.rect(clientX, yPosition, (pageWidth - 2 * margin - 15) / 2, signatureBlockHeight);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text('CLIENT/REPRESENTATIVE', clientX + 5, yPosition + 8);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.text('Signature:', clientX + 5, yPosition + 15);
      pdf.text('Date:', clientX + 5, yPosition + 20);
      
      yPosition += signatureBlockHeight + 15;
      
      // Enhanced compliance statement
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(9);
      pdf.setTextColor(100, 116, 139); // slate-500
      const complianceText = "This electrical inspection report has been prepared in accordance with BS 7671:2018+A3:2024 " +
                           "(Requirements for Electrical Installations) and IET Guidance Note 3. The inspection has been " +
                           "carried out by a qualified and competent person.";
      
      const complianceLines = pdf.splitTextToSize(complianceText, pageWidth - 2 * margin - 10);
      complianceLines.forEach((line: string) => {
        pdf.text(line, margin + 5, yPosition);
        yPosition += 4;
      });
      
      yPosition += 10;
    }

    // Add professional footer to all pages
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      
      // Footer background
      pdf.setFillColor(248, 250, 252); // slate-50
      pdf.rect(0, pageHeight - 25, pageWidth, 25, 'F');
      
      // Footer line
      pdf.setDrawColor(226, 232, 240); // slate-200
      pdf.setLineWidth(0.5);
      pdf.line(0, pageHeight - 25, pageWidth, pageHeight - 25);
      
      // Page numbering
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(100, 116, 139); // slate-500
      pdf.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      
      // Footer text
      pdf.text('Generated using Professional Electrical Reporting System', margin, pageHeight - 10);
      
      // Watermark if provided
      if (options.watermark) {
        pdf.setTextColor(203, 213, 225); // slate-300
        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(8);
        pdf.text(safeText(options.watermark), pageWidth / 2, pageHeight - 6, { align: 'center' });
      }
    }

    // Generate filename with enhanced naming
    const safeReportType = safeText(reportType).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const finalFilename = filename || `${safeReportType}-${formatDate(new Date(), 'ddMMyyyy-HHmm')}.pdf`;
    
    // Save the PDF
    pdf.save(finalFilename);
    console.log('Enhanced electrical PDF generated successfully with professional formatting');
    
  } catch (error) {
    console.error('Enhanced PDF generation failed:', error);
    throw new Error(`Enhanced PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};