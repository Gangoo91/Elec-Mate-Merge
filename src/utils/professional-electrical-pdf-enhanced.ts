import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format as formatDate } from "date-fns";
import { safeText, safeNumber } from './rams-pdf-helpers';

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

    // Professional header section with enhanced styling
    const addHeader = () => {
      // Elegant gradient background
      pdf.setFillColor(248, 250, 252);
      pdf.rect(0, 0, pageWidth, 75, 'F');
      
      // Professional title with clean typography
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(24);
      pdf.setTextColor(15, 23, 42); // Slate-900
      pdf.text(safeText(reportType), pageWidth / 2, yPosition + 10, { align: 'center' });
      yPosition += 18;

      // Enhanced compliance badge with professional styling
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255); // White text
      pdf.setFillColor(16, 185, 129); // Emerald-500
      const badgeText = 'BS 7671:2018+A3:2024 COMPLIANT';
      const badgeWidth = pdf.getTextWidth(badgeText) + 12;
      const badgeX = (pageWidth - badgeWidth) / 2;
      pdf.roundedRect(badgeX, yPosition - 4, badgeWidth, 9, 2, 2, 'F');
      pdf.text(badgeText, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 16;

      // Company branding with professional styling
      if (options.companyName) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(14);
        pdf.setTextColor(51, 65, 85); // Slate-700
        pdf.text(safeText(options.companyName), pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 12;
      }

      // Professional date formatting
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139); // Slate-500
      const dateText = `Report Generated: ${formatDate(new Date(), "dd/MM/yyyy 'at' HH:mm")}`;
      pdf.text(dateText, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;

      // Enhanced report reference with better formatting
      const reportId = `EIR-${Date.now().toString(36).toUpperCase()}`;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(71, 85, 105); // Slate-600
      pdf.text(`Reference: ${reportId}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 16;

      // Professional separator with subtle styling
      pdf.setDrawColor(245, 158, 11); // Amber-500
      pdf.setLineWidth(2);
      pdf.line(margin + 20, yPosition, pageWidth - margin - 20, yPosition);
      pdf.setDrawColor(226, 232, 240); // Slate-200
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
      yPosition += 18;
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
      
      checkPageSpace(35);
      
      const startY = yPosition;
      const tableWidth = pageWidth - 2 * margin;
      const colWidths = table.headers.map(() => tableWidth / table.headers.length);
      
      // Professional table header with enhanced styling
      pdf.setFillColor(241, 245, 249); // slate-100
      pdf.setDrawColor(203, 213, 225); // slate-300
      pdf.setLineWidth(0.5);
      
      const headerHeight = 14;
      pdf.rect(margin, yPosition - 2, tableWidth, headerHeight, 'FD');
      
      // Header text with professional typography
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(15, 23, 42); // slate-900
      
      let xPos = margin;
      table.headers.forEach((header, i) => {
        const headerText = safeText(header).toUpperCase();
        const cellWidth = colWidths[i];
        const textX = xPos + cellWidth / 2;
        pdf.text(headerText, textX, yPosition + 6, { align: 'center' });
        xPos += cellWidth;
      });
      yPosition += headerHeight;
      
      // Data rows with enhanced formatting
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      
      table.rows.forEach((row, rowIndex) => {
        checkPageSpace(12);
        
        const rowHeight = Math.max(10, Math.max(...row.cells.map(cell => {
          const lines = pdf.splitTextToSize(safeText(cell), colWidths[0] - 4);
          return lines.length * 4 + 2;
        })));
        
        // Professional alternating row colours
        if (rowIndex % 2 === 0) {
          pdf.setFillColor(248, 250, 252); // slate-50
        } else {
          pdf.setFillColor(255, 255, 255); // white
        }
        pdf.rect(margin, yPosition, tableWidth, rowHeight, 'F');
        
        // Cell borders for professional appearance
        pdf.setDrawColor(226, 232, 240); // slate-200
        pdf.setLineWidth(0.25);
        
        xPos = margin;
        row.cells.forEach((cell, cellIndex) => {
          const cellWidth = colWidths[cellIndex];
          
          // Enhanced colour coding for electrical test results
          const cellText = safeText(cell);
          if (cellText.match(/^(C1|FAIL|UNSATISFACTORY|DANGEROUS)$/i)) {
            pdf.setTextColor(239, 68, 68); // red-500
            pdf.setFont('helvetica', 'bold');
          } else if (cellText.match(/^(C2|POTENTIALLY DANGEROUS)$/i)) {
            pdf.setTextColor(245, 158, 11); // amber-500
            pdf.setFont('helvetica', 'bold');
          } else if (cellText.match(/^(C3|REQUIRES IMPROVEMENT)$/i)) {
            pdf.setTextColor(59, 130, 246); // blue-500
            pdf.setFont('helvetica', 'bold');
          } else if (cellText.match(/^(PASS|SATISFACTORY|GOOD)$/i)) {
            pdf.setTextColor(34, 197, 94); // green-500
            pdf.setFont('helvetica', 'bold');
          } else if (cellText.match(/[\d.]+\s*[Ω≥MΩkΩΩ]/)) {
            // Electrical values
            pdf.setTextColor(30, 41, 59); // slate-800
            pdf.setFont('helvetica', 'normal');
          } else {
            pdf.setTextColor(51, 65, 85); // slate-700
            pdf.setFont('helvetica', 'normal');
          }
          
          // Text alignment based on content
          const maxWidth = cellWidth - 6;
          const lines = pdf.splitTextToSize(cellText, maxWidth);
          
          const isNumeric = /^[\d.]+/.test(cellText) || cellText.match(/[Ω≥MΩkΩ]/);
          const align = isNumeric ? 'right' : cellIndex === 0 ? 'left' : 'center';
          
          lines.forEach((line: string, lineIndex: number) => {
            let textX = xPos + 3;
            if (align === 'center') textX = xPos + cellWidth / 2;
            if (align === 'right') textX = xPos + cellWidth - 3;
            
            pdf.text(line, textX, yPosition + 6 + lineIndex * 4, { align: align as any });
          });
          
          // Vertical cell borders
          pdf.line(xPos + cellWidth, yPosition, xPos + cellWidth, yPosition + rowHeight);
          xPos += cellWidth;
        });
        
        // Horizontal row border
        pdf.line(margin, yPosition + rowHeight, margin + tableWidth, yPosition + rowHeight);
        yPosition += rowHeight;
      });
      
      // Professional table border
      pdf.setDrawColor(148, 163, 184); // slate-400
      pdf.setLineWidth(1);
      pdf.rect(margin, startY - 2, tableWidth, yPosition - startY + 2);
      
      yPosition += 10;
    };

    const renderText = (section: ProcessedSection) => {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(51, 65, 85); // slate-700
      
      // Enhanced text processing with proper electrical symbol handling
      let text = safeText(section.content);
      
      // Highlight important electrical terms and codes
      if (text.match(/\b(C1|C2|C3)\b/)) {
        if (text.includes('C1')) pdf.setTextColor(220, 38, 38); // red-600
        else if (text.includes('C2')) pdf.setTextColor(245, 158, 11); // amber-500
        else if (text.includes('C3')) pdf.setTextColor(59, 130, 246); // blue-500
        pdf.setFont('helvetica', 'bold');
      } else if (text.match(/BS\s*7671|Regulation\s*\d+|IET\s*Wiring/i)) {
        pdf.setTextColor(30, 41, 59); // slate-800
        pdf.setFont('helvetica', 'bold');
      }
      
      const maxWidth = pageWidth - 2 * margin;
      const lines = pdf.splitTextToSize(text, maxWidth);
      
      lines.forEach((line: string) => {
        checkPageSpace(7);
        pdf.text(line, margin, yPosition);
        yPosition += 6;
      });
      
      yPosition += 4; // Professional spacing after paragraphs
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
      checkPageSpace(15);
      
      const content = safeText(section.content);
      const isWarning = content.match(/warning|caution|danger|important/i);
      const isCritical = content.match(/urgent|immediate|dangerous|c1/i);
      
      // Enhanced notice styling based on content severity
      let bgColor: [number, number, number];
      let borderColor: [number, number, number];
      let textColor: [number, number, number];
      
      if (isCritical) {
        bgColor = [254, 242, 242]; // red-50
        borderColor = [239, 68, 68]; // red-500
        textColor = [153, 27, 27]; // red-800
      } else if (isWarning) {
        bgColor = [255, 251, 235]; // amber-50
        borderColor = [245, 158, 11]; // amber-500
        textColor = [146, 64, 14]; // amber-800
      } else {
        bgColor = [239, 246, 255]; // blue-50
        borderColor = [59, 130, 246]; // blue-500
        textColor = [30, 58, 138]; // blue-800
      }
      
      const lines = pdf.splitTextToSize(content, pageWidth - 2 * margin - 16);
      const textHeight = Math.max(16, lines.length * 6 + 8);
      
      // Professional notice background with rounded corners effect
      pdf.setFillColor(...bgColor);
      pdf.rect(margin, yPosition - 4, pageWidth - 2 * margin, textHeight, 'F');
      
      // Enhanced left border with gradient effect
      pdf.setFillColor(...borderColor);
      pdf.rect(margin, yPosition - 4, 4, textHeight, 'F');
      
      // Notice icon area
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(...borderColor);
      const iconText = isCritical ? '⚠' : isWarning ? '⚠' : 'ℹ';
      pdf.text(iconText, margin + 8, yPosition + 2);
      
      // Enhanced text styling
      pdf.setFont('helvetica', isCritical ? 'bold' : 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(...textColor);
      
      lines.forEach((line: string, index: number) => {
        pdf.text(line, margin + 16, yPosition + index * 6 + 2);
      });
      
      yPosition += textHeight + 6;
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

    // Enhanced footer for professional consistency
    const addProfessionalFooter = (pageNum: number, totalPages: number) => {
      const footerY = pageHeight - 15;
      
      // Footer background
      pdf.setFillColor(248, 250, 252); // slate-50
      pdf.rect(0, footerY - 8, pageWidth, 15, 'F');
      
      // Footer border
      pdf.setDrawColor(226, 232, 240); // slate-200
      pdf.setLineWidth(0.5);
      pdf.line(0, footerY - 8, pageWidth, footerY - 8);
      
      // Left: Professional footer text
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139); // slate-500
      const footerText = 'Generated using Professional Electrical Reporting System — BS 7671:2018+A3:2024 Compliant';
      pdf.text(footerText, margin, footerY - 2);
      
      // Right: Page numbers
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(71, 85, 105); // slate-600
      const pageText = `Page ${pageNum} of ${totalPages}`;
      const pageTextWidth = pdf.getTextWidth(pageText);
      pdf.text(pageText, pageWidth - margin - pageTextWidth, footerY - 2);
      
      // Watermark if specified
      if (options.watermark) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(40);
        pdf.setTextColor(245, 245, 245); // Very light gray
        
        const watermarkWidth = pdf.getTextWidth(options.watermark);
        const watermarkX = (pageWidth - watermarkWidth) / 2;
        const watermarkY = pageHeight / 2;
        
        pdf.text(options.watermark, watermarkX, watermarkY, { 
          align: 'center'
        });
      }
    };

    // Process all sections with enhanced pipeline
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

    // Add enhanced professional footer to all pages
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      addProfessionalFooter(i, pageCount);
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