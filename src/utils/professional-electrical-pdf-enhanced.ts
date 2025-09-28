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

// Enhanced HTML entity decoder
const decodeHtmlEntities = (text: string): string => {
  const entityMap: { [key: string]: string } = {
    '&#x26;': '&',
    '&#x3C;': '<',
    '&#x3E;': '>',
    '&#x22;': '"',
    '&#x27;': "'",
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&nbsp;': ' ',
    '&#8230;': '...',
    '&#8211;': '–',
    '&#8212;': '—',
    '&#8216;': '\u2018',
    '&#8217;': '\u2019',
    '&#8220;': '"',
    '&#8221;': '"'
  };
  
  let decoded = text;
  Object.entries(entityMap).forEach(([entity, char]) => {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  });
  
  // Handle numeric HTML entities
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec, 10));
  });
  
  // Handle hex HTML entities
  decoded = decoded.replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  return decoded;
};

// Enhanced markdown processing with comprehensive formatting and content deduplication
const processMarkdownText = (text: string, doc: jsPDF): { 
  content: string; 
  isHeader: boolean; 
  level: number; 
  isList: boolean; 
  isCode: boolean; 
  fontSize: number;
  fontWeight: string;
  fontStyle: string;
  skip: boolean;
} => {
  let processedText = decodeHtmlEntities(text.trim());
  let isHeader = false;
  let level = 0;
  let isList = false;
  let isCode = false;
  let fontSize = 11;
  let fontWeight = 'normal';
  let fontStyle = 'normal';
  let skip = false;

  // Skip duplicate headers and template placeholders
  if (processedText.includes('*[INSERT') || 
      processedText.includes('[INSERT') ||
      processedText === 'Minor Electrical Installation Works Certificate' ||
      processedText === 'MINOR ELECTRICAL INSTALLATION WORKS CERTIFICATE') {
    skip = true;
    return { content: '', isHeader: false, level: 0, isList: false, isCode: false, fontSize: 11, fontWeight: 'normal', fontStyle: 'normal', skip };
  }

  // Process template variables first
  processedText = processedText.replace(/\*\[INSERT\s+([^\]]+)\]\*/g, (match, placeholder) => {
    const today = new Date();
    switch (placeholder.toUpperCase()) {
      case 'DATE': return today.toLocaleDateString('en-GB');
      case 'TIME': return today.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      case 'INSPECTOR NAME': return '_________________';
      case 'CLIENT NAME': return '_________________';
      default: return `[${placeholder}]`;
    }
  });

  // Headers with professional font hierarchy
  const headerMatch = processedText.match(/^(#{1,6})\s*(.+)$/);
  if (headerMatch) {
    isHeader = true;
    level = headerMatch[1].length;
    processedText = headerMatch[2];
    
    // Professional font hierarchy
    switch (level) {
      case 1: fontSize = 18; fontWeight = 'bold'; break;
      case 2: fontSize = 14; fontWeight = 'bold'; break;
      case 3: fontSize = 12; fontWeight = 'bold'; break;
      case 4: fontSize = 11; fontWeight = 'bold'; break;
      default: fontSize = 10; fontWeight = 'bold'; break;
    }
  }

  // Enhanced list processing
  if (processedText.match(/^[-*+]\s+/)) {
    isList = true;
    processedText = processedText.replace(/^[-*+]\s+/, '• ');
    fontSize = 10;
  }

  // Numbered lists
  if (processedText.match(/^\d+\.\s+/)) {
    isList = true;
    fontSize = 10;
  }

  // Code blocks and technical content
  if (processedText.includes('```') || processedText.match(/^    /)) {
    isCode = true;
    fontSize = 9;
    fontWeight = 'normal';
    fontStyle = 'normal';
    processedText = processedText.replace(/```/g, '').replace(/^    /gm, '');
  }

  // Enhanced markdown formatting with nested support
  let hasBold = false;
  let hasItalic = false;

  // Process bold first
  if (processedText.includes('**')) {
    hasBold = true;
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '$1');
  }

  // Process italic
  if (processedText.match(/(?<!\*)\*([^*]+)\*(?!\*)/)) {
    hasItalic = true;
    processedText = processedText.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '$1');
  }

  // Apply formatting
  if (hasBold && !isHeader) fontWeight = 'bold';
  if (hasItalic) fontStyle = 'italic';

  // Remove any remaining markdown artifacts
  processedText = processedText
    .replace(/^\s*[-*+]\s*/, '') // Remove list markers if still present
    .replace(/^\s*\d+\.\s*/, '') // Remove numbered list markers if still present
    .replace(/`([^`]+)`/g, '$1') // Remove inline code markers
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Convert links to just text
    .trim();

  return { content: processedText, isHeader, level, isList, isCode, fontSize, fontWeight, fontStyle, skip };
};

// Advanced text measurement and wrapping
const measureText = (text: string, fontSize: number, doc: jsPDF): number => {
  const currentFont = doc.getFont();
  doc.setFontSize(fontSize);
  const width = doc.getTextWidth(text);
  return width;
};

const wrapTextAdvanced = (text: string, maxWidth: number, fontSize: number, doc: jsPDF): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  doc.setFontSize(fontSize);

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = doc.getTextWidth(testLine);

    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        // Word is too long, break it
        const chars = word.split('');
        let partialWord = '';
        for (const char of chars) {
          const testChar = partialWord + char;
          if (doc.getTextWidth(testChar) <= maxWidth) {
            partialWord = testChar;
          } else {
            if (partialWord) lines.push(partialWord);
            partialWord = char;
          }
        }
        if (partialWord) currentLine = partialWord;
      }
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
};

// Enhanced table rendering with professional styling and smart layout
const addEnhancedTable = (
  currentLine: string,
  lines: string[],
  currentIndex: number,
  yPosition: number,
  doc: jsPDF,
  maxWidth: number,
  pageHeight: number,
  bottomMargin: number,
  options: ProfessionalElectricalPDFOptions
): number => {
  // Parse table from markdown
  const tableLines = [currentLine];
  let index = currentIndex + 1;
  
  // Collect all table lines
  while (index < lines.length && lines[index].includes('|')) {
    tableLines.push(lines[index]);
    index++;
  }
  
  // Parse table data
  const tableData: string[][] = [];
  let isHeaderRow = true;
  
  for (const line of tableLines) {
    const cells = line.split('|')
      .map(cell => cell.trim())
      .filter(cell => cell.length > 0);
    
    if (cells.length > 0 && !line.includes('---')) {
      tableData.push(cells);
    }
  }
  
  if (tableData.length === 0) return yPosition;

  // Calculate column widths based on content
  const columnWidths: number[] = [];
  const numColumns = Math.max(...tableData.map(row => row.length));
  
  for (let col = 0; col < numColumns; col++) {
    let maxWidth = 20; // Minimum width
    for (const row of tableData) {
      if (row[col]) {
        const textWidth = doc.getTextWidth(row[col]) + 10; // Add padding
        maxWidth = Math.max(maxWidth, textWidth);
      }
    }
    columnWidths.push(Math.min(maxWidth, 50)); // Maximum width limit
  }
  
  // Adjust widths to fit page
  const totalWidth = columnWidths.reduce((sum, width) => sum + width, 0);
  if (totalWidth > maxWidth) {
    const scale = maxWidth / totalWidth;
    for (let i = 0; i < columnWidths.length; i++) {
      columnWidths[i] *= scale;
    }
  }

  try {
    // Check if table fits on current page
    const estimatedTableHeight = (tableData.length * 8) + 20; // Rough estimate
    if (yPosition + estimatedTableHeight > pageHeight - bottomMargin) {
      doc.addPage();
      yPosition = 20;
      addWatermark(doc, options.watermark);
    }

    (doc as any).autoTable({
      head: tableData.length > 0 ? [tableData[0]] : [],
      body: tableData.slice(1),
      startY: yPosition,
      theme: 'striped',
      headStyles: {
        fillColor: [233, 236, 239],
        textColor: [33, 37, 41],
        fontStyle: 'bold',
        fontSize: 9,
        halign: 'center',
        cellPadding: { top: 4, right: 3, bottom: 4, left: 3 }
      },
      bodyStyles: {
        fontSize: 8,
        cellPadding: { top: 3, right: 3, bottom: 3, left: 3 },
        lineColor: [220, 220, 220],
        lineWidth: 0.1
      },
      alternateRowStyles: {
        fillColor: [248, 249, 250]
      },
      columnStyles: (() => {
        const styles: any = {};
        columnWidths.forEach((width, index) => {
          styles[index] = { 
            cellWidth: width,
            halign: index === 0 ? 'left' : 'center'
          };
        });
        return styles;
      })(),
      margin: { left: 18, right: 18 },
      tableWidth: 'wrap',
      didParseCell: (data: any) => {
        const cellText = data.cell.text[0];
        
        // Highlight PASS/FAIL cells with enhanced styling
        if (cellText === 'PASS') {
          data.cell.styles.textColor = [40, 167, 69];
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [212, 237, 218];
        } else if (cellText === 'FAIL') {
          data.cell.styles.textColor = [220, 53, 69];
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [248, 215, 218];
        }
        
        // Highlight electrical codes
        if (cellText.match(/^C[123]$/)) {
          data.cell.styles.textColor = [255, 193, 7];
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [255, 243, 205];
        }
        
        // Handle multi-line cells
        if (cellText.length > 30) {
          data.cell.styles.overflow = 'linebreak';
        }
      },
      didDrawPage: (data: any) => {
        // Add page numbers if spanning multiple pages
        if (data.pageNumber > 1) {
          doc.setFontSize(8);
          doc.text(`Page ${data.pageNumber}`, pageHeight - 20, pageHeight - 10);
        }
      }
    });
    
    return (doc as any).lastAutoTable.finalY + 10;
  } catch (error) {
    console.error('Enhanced table generation error:', error);
    // Fallback to simple text rendering
    doc.setFontSize(8);
    let fallbackY = yPosition;
    for (const row of tableData) {
      doc.text(row.join(' | '), 18, fallbackY);
      fallbackY += 6;
    }
    return fallbackY + 10;
  }
};

const addWatermark = (doc: jsPDF, watermark?: string) => {
  if (!watermark) return;
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(40);
  doc.setTextColor(245, 245, 245); // Very light gray
  
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const watermarkWidth = doc.getTextWidth(watermark);
  const watermarkX = (pageWidth - watermarkWidth) / 2;
  const watermarkY = pageHeight / 2;
  
  doc.text(watermark, watermarkX, watermarkY, { 
    align: 'center'
  });
};

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
    
    // Enhanced content preprocessing with deduplication
    let cleanContent = safeText(markdownContent);
    
    // Remove duplicate headers and clean up formatting
    const contentLines = cleanContent.split('\n');
    const dedupedLines: string[] = [];
    const seenHeaders = new Set<string>();
    
    for (let i = 0; i < contentLines.length; i++) {
      const line = contentLines[i].trim();
      const isHeaderLine = line.match(/^#{1,6}\s+/);
      
      if (isHeaderLine) {
        const headerText = line.replace(/^#{1,6}\s+/, '').trim().toLowerCase();
        if (!seenHeaders.has(headerText)) {
          seenHeaders.add(headerText);
          dedupedLines.push(line);
        }
      } else if (line) {
        dedupedLines.push(line);
      }
    }
    
    cleanContent = dedupedLines.join('\n');
    console.log('Content cleaned, entities decoded, and duplicates removed');
    
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 18;
    let yPosition = margin;

    // Professional header section with enhanced styling
    const addHeader = () => {
      // Elegant gradient background
      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, pageWidth, 75, 'F');
      
      // Professional title with clean typography
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.setTextColor(15, 23, 42); // Slate-900
      doc.text(safeText(reportType), pageWidth / 2, yPosition + 10, { align: 'center' });
      yPosition += 18;

      // Enhanced compliance badge with professional styling
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255); // White text
      doc.setFillColor(16, 185, 129); // Emerald-500
      const badgeText = 'BS 7671:2018+A3:2024 COMPLIANT';
      const badgeWidth = doc.getTextWidth(badgeText) + 12;
      const badgeX = (pageWidth - badgeWidth) / 2;
      doc.roundedRect(badgeX, yPosition - 4, badgeWidth, 9, 2, 2, 'F');
      doc.text(badgeText, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 16;

      // Company branding with professional styling
      if (options.companyName) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(14);
        doc.setTextColor(51, 65, 85); // Slate-700
        doc.text(safeText(options.companyName), pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 12;
      }

      // Professional date formatting
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139); // Slate-500
      const dateText = `Report Generated: ${formatDate(new Date(), "dd/MM/yyyy 'at' HH:mm")}`;
      doc.text(dateText, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;

      // Enhanced report reference with better formatting
      const reportId = `EIR-${Date.now().toString(36).toUpperCase()}`;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105); // Slate-600
      doc.text(`Reference: ${reportId}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 16;

      // Professional separator with subtle styling
      doc.setDrawColor(245, 158, 11); // Amber-500
      doc.setLineWidth(2);
      doc.line(margin + 20, yPosition, pageWidth - margin - 20, yPosition);
      doc.setDrawColor(226, 232, 240); // Slate-200
      doc.setLineWidth(0.5);
      doc.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
      yPosition += 18;
    };

    // Split content into lines and process with enhanced formatting
    const processedLines = cleanContent.split('\n');
    let currentLine = 0;
    const maxWidth = pageWidth - 36; // 18mm margins on each side
    const bottomMargin = 30; // Space for footer

    // Add professional header
    addHeader();

    // Process each line with enhanced formatting and smart layout
    while (currentLine < processedLines.length) {
      const line = processedLines[currentLine].trim();
      
      if (!line) {
        yPosition += 3;
        currentLine++;
        continue;
      }

      const processed = processMarkdownText(line, doc);
      
      // Skip processed lines or duplicates
      if (processed.skip || !processed.content) {
        currentLine++;
        continue;
      }
      
      // Set font based on content type with proper styling
      doc.setFont('helvetica', processed.fontWeight);
      doc.setFontSize(processed.fontSize);

      // Calculate line height based on font size
      const lineHeight = processed.fontSize * 1.2;
      
      // Check for special content types and apply styling
      if (processed.isHeader) {
        yPosition += processed.level === 1 ? 8 : 4; // Extra space before headers
        
        // Add header background for major headers
        if (processed.level <= 2) {
          doc.setFillColor(245, 245, 245);
          doc.rect(18, yPosition - 3, maxWidth, lineHeight + 2, 'F');
        }
      }
      
      // Handle tables separately
      if (line.includes('|') && line.split('|').length > 2) {
        yPosition = addEnhancedTable(line, processedLines, currentLine, yPosition, doc, maxWidth, pageHeight, bottomMargin, options);
        
        // Skip processed table lines
        while (currentLine < processedLines.length && processedLines[currentLine].includes('|')) {
          currentLine++;
        }
        continue;
      }

      // Handle text wrapping with proper measurement
      const wrappedLines = wrapTextAdvanced(processed.content, maxWidth, processed.fontSize, doc);
      
      for (let j = 0; j < wrappedLines.length; j++) {
        const wrappedLine = wrappedLines[j];
        
        // Smart page break detection
        if (yPosition + lineHeight > pageHeight - bottomMargin) {
          doc.addPage();
          yPosition = 20;
          addWatermark(doc, options.watermark);
        }

        // Apply text color based on content
        if (wrappedLine.includes('PASS')) {
          doc.setTextColor(40, 167, 69); // Green
        } else if (wrappedLine.includes('FAIL')) {
          doc.setTextColor(220, 53, 69); // Red
        } else if (wrappedLine.includes('C1') || wrappedLine.includes('C2') || wrappedLine.includes('C3')) {
          doc.setTextColor(255, 193, 7); // Amber for codes
        } else {
          doc.setTextColor(0, 0, 0); // Black
        }

        // Enhanced electrical symbol processing with proper Unicode
        const symbolProcessedLine = wrappedLine
          .replace(/©/g, 'Ω')  // Common encoding issue
          .replace(/â‰¥/g, '≥')  // UTF-8 encoding fix
          .replace(/Â±/g, '±')   // UTF-8 encoding fix
          .replace(/Â°/g, '°')   // UTF-8 encoding fix
          .replace(/Âµ/g, 'µ')   // UTF-8 encoding fix
          .replace(/&Omega;/g, 'Ω')
          .replace(/&ge;/g, '≥')
          .replace(/&plusmn;/g, '±')
          .replace(/&deg;/g, '°')
          .replace(/&micro;/g, 'µ')
          .replace(/ohm/gi, 'Ω')
          .replace(/ohms/gi, 'Ω');

        doc.text(symbolProcessedLine, 18, yPosition);
        yPosition += lineHeight;
        
        // Reset text color
        doc.setTextColor(0, 0, 0);
      }

      // Add extra spacing after headers and special content
      if (processed.isHeader) {
        yPosition += processed.level === 1 ? 6 : 3;
      } else if (processed.isCode) {
        yPosition += 2;
      }
      
      currentLine++;
    }

    // Enhanced footer for professional consistency
    const addProfessionalFooter = (pageNum: number, totalPages: number) => {
      const footerY = pageHeight - 15;
      
      // Footer background
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(0, footerY - 8, pageWidth, 15, 'F');
      
      // Footer border
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.5);
      doc.line(0, footerY - 8, pageWidth, footerY - 8);
      
      // Left: Professional footer text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139); // slate-500
      const footerText = 'Generated using Professional Electrical Reporting System — BS 7671:2018+A3:2024 Compliant';
      doc.text(footerText, margin, footerY - 2);
      
      // Right: Page numbers
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(71, 85, 105); // slate-600
      const pageText = `Page ${pageNum} of ${totalPages}`;
      const pageTextWidth = doc.getTextWidth(pageText);
      doc.text(pageText, pageWidth - margin - pageTextWidth, footerY - 2);
    };

    // Add professional signature section
    if (options.includeSignatures) {
      // Smart page break detection
      if (yPosition + 100 > pageHeight - bottomMargin) {
        doc.addPage();
        yPosition = 20;
        addWatermark(doc, options.watermark);
      }
      
      yPosition += 20;
      
      // Section background
      doc.setFillColor(249, 250, 251); // gray-50
      doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 85, 'F');
      
      // Signatures header
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text('CERTIFICATION AND SIGNATURES', margin + 5, yPosition + 5);
      yPosition += 20;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(51, 65, 85); // slate-700
      
      // Professional styling for signature blocks
      const signatureBlockHeight = 25;
      
      // Inspector signature block
      doc.setFillColor(255, 255, 255);
      doc.rect(margin + 5, yPosition, (pageWidth - 2 * margin - 15) / 2, signatureBlockHeight, 'F');
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.rect(margin + 5, yPosition, (pageWidth - 2 * margin - 15) / 2, signatureBlockHeight);
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('QUALIFIED ELECTRICIAN', margin + 10, yPosition + 8);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('Signature:', margin + 10, yPosition + 15);
      doc.text('Date:', margin + 10, yPosition + 20);
      
      // Client signature block
      const clientX = margin + 10 + (pageWidth - 2 * margin - 15) / 2;
      doc.setFillColor(255, 255, 255);
      doc.rect(clientX, yPosition, (pageWidth - 2 * margin - 15) / 2, signatureBlockHeight, 'F');
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.rect(clientX, yPosition, (pageWidth - 2 * margin - 15) / 2, signatureBlockHeight);
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('CLIENT/REPRESENTATIVE', clientX + 5, yPosition + 8);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('Signature:', clientX + 5, yPosition + 15);
      doc.text('Date:', clientX + 5, yPosition + 20);
      
      yPosition += signatureBlockHeight + 15;
      
      // Enhanced compliance statement
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139); // slate-500
      const complianceText = "This electrical inspection report has been prepared in accordance with BS 7671:2018+A3:2024 " +
                           "(Requirements for Electrical Installations) and IET Guidance Note 3. The inspection has been " +
                           "carried out by a qualified and competent person.";
      
      const complianceLines = wrapTextAdvanced(complianceText, pageWidth - 2 * margin - 10, 9, doc);
      complianceLines.forEach((line: string) => {
        doc.text(line, margin + 5, yPosition);
        yPosition += 4;
      });
      
      yPosition += 10;
    }

    // Add enhanced professional footer to all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addProfessionalFooter(i, pageCount);
    }

    // Generate filename with enhanced naming
    const safeReportType = safeText(reportType).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const finalFilename = filename || `${safeReportType}-${formatDate(new Date(), 'ddMMyyyy-HHmm')}.pdf`;
    
    // Save the PDF
    doc.save(finalFilename);
    console.log('Enhanced electrical PDF generated successfully with professional formatting');
    
  } catch (error) {
    console.error('Enhanced PDF generation failed:', error);
    throw new Error(`Enhanced PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};