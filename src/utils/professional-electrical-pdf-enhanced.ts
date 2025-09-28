import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format as formatDate } from "date-fns";
import { EnhancedMarkdownProcessor } from './enhanced-markdown-processor';

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
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Professional header section
    const addHeader = () => {
      // Main title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(24);
      pdf.setTextColor(26, 54, 93); // Dark blue
      pdf.text(reportType, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 12;

      // Compliance badge
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(49, 151, 149); // Teal
      pdf.text('BS 7671:2018+A3:2024 COMPLIANT', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Company name if provided
      if (options.companyName) {
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(14);
        pdf.setTextColor(74, 85, 104); // Gray
        pdf.text(options.companyName, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 10;
      }

      // Date and report info
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(113, 128, 150); // Light gray
      const dateText = `Generated: ${formatDate(new Date(), "EEEE, do MMMM yyyy")}`;
      pdf.text(dateText, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;

      // Report ID
      const reportId = Date.now().toString(36).toUpperCase();
      pdf.text(`Report ID: ${reportId}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Header line
      pdf.setDrawColor(245, 158, 11); // Yellow
      pdf.setLineWidth(2);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 15;
    };

    // Process markdown content
    const processContentForPDF = (content: string) => {
      const lines = content.split('\n');
      pdf.setTextColor(45, 55, 72); // Dark gray for body text
      
      for (const line of lines) {
        // Check if we need a new page
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = margin;
        }

        const trimmedLine = line.trim();
        
        if (!trimmedLine) {
          yPosition += 4;
          continue;
        }

        // Process headers
        if (trimmedLine.startsWith('###')) {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(12);
          pdf.setTextColor(74, 85, 104);
          const headerText = trimmedLine.replace(/^###\s*/, '');
          pdf.text(headerText, margin, yPosition);
          yPosition += 8;
        } else if (trimmedLine.startsWith('##')) {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(14);
          pdf.setTextColor(45, 55, 72);
          const headerText = trimmedLine.replace(/^##\s*/, '');
          pdf.text(headerText, margin, yPosition);
          yPosition += 10;
          
          // Add underline for H2
          pdf.setDrawColor(226, 232, 240);
          pdf.setLineWidth(0.5);
          pdf.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += 5;
        } else if (trimmedLine.startsWith('#')) {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(18);
          pdf.setTextColor(26, 54, 93);
          const headerText = trimmedLine.replace(/^#\s*/, '');
          pdf.text(headerText, margin, yPosition);
          yPosition += 12;
          
          // Add underline for H1
          pdf.setDrawColor(245, 158, 11);
          pdf.setLineWidth(1);
          pdf.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += 8;
        } else if (trimmedLine.startsWith('|')) {
          // Process table (simplified for PDF)
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(9);
          const cells = trimmedLine.split('|').map(cell => cell.trim()).filter(cell => cell);
          
          if (cells.length > 0) {
            let xPos = margin;
            const cellWidth = (pageWidth - 2 * margin) / cells.length;
            
            cells.forEach((cell, index) => {
              // Highlight important values
              if (cell.match(/C1|C2|C3|FAIL|PASS|SATISFACTORY|UNSATISFACTORY/i)) {
                if (cell.match(/C1|FAIL|UNSATISFACTORY/i)) {
                  pdf.setTextColor(197, 48, 48); // Red
                } else if (cell.match(/C2/i)) {
                  pdf.setTextColor(214, 158, 46); // Orange
                } else if (cell.match(/C3/i)) {
                  pdf.setTextColor(49, 151, 149); // Teal
                } else if (cell.match(/PASS|SATISFACTORY/i)) {
                  pdf.setTextColor(56, 161, 105); // Green
                }
              } else {
                pdf.setTextColor(74, 85, 104);
              }
              
              const cellText = cell.replace(/\*\*(.*?)\*\*/g, '$1');
              pdf.text(cellText, xPos, yPosition, { maxWidth: cellWidth - 2 });
              xPos += cellWidth;
            });
            
            yPosition += 6;
            pdf.setTextColor(74, 85, 104); // Reset color
          }
        } else if (trimmedLine.startsWith('-')) {
          // Process list items
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          pdf.setTextColor(74, 85, 104);
          
          const listText = trimmedLine.replace(/^-\s*/, '• ');
          const processedText = listText.replace(/\*\*(.*?)\*\*/g, '$1');
          
          const textLines = pdf.splitTextToSize(processedText, pageWidth - margin - 15);
          for (const textLine of textLines) {
            pdf.text(textLine, margin + 5, yPosition);
            yPosition += 5;
          }
        } else if (trimmedLine.startsWith('>')) {
          // Process blockquotes (safety notices)
          pdf.setFont('helvetica', 'italic');
          pdf.setFontSize(10);
          pdf.setTextColor(197, 48, 48); // Red for safety notices
          
          const quoteText = trimmedLine.replace(/^>\s*/, '');
          const processedText = quoteText.replace(/\*\*(.*?)\*\*/g, '$1');
          
          // Add background rectangle
          pdf.setFillColor(255, 245, 245);
          pdf.rect(margin, yPosition - 3, pageWidth - 2 * margin, 8, 'F');
          
          pdf.text(processedText, margin + 5, yPosition, { maxWidth: pageWidth - 2 * margin - 10 });
          yPosition += 10;
          pdf.setTextColor(74, 85, 104); // Reset color
        } else {
          // Regular text
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
          pdf.setTextColor(74, 85, 104);
          
          const processedText = trimmedLine.replace(/\*\*(.*?)\*\*/g, '$1');
          const textLines = pdf.splitTextToSize(processedText, pageWidth - 2 * margin);
          
          for (const textLine of textLines) {
            if (yPosition > pageHeight - 30) {
              pdf.addPage();
              yPosition = margin;
            }
            pdf.text(textLine, margin, yPosition);
            yPosition += 5;
          }
        }
      }
    };

    // Add header
    addHeader();

    // Process content
    processContentForPDF(markdownContent);

    // Add signature section if requested
    if (options.includeSignatures) {
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = margin;
      }

      yPosition += 20;
      
      // Signatures header
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(26, 54, 93);
      pdf.text('Certification and Signatures', margin, yPosition);
      yPosition += 15;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(74, 85, 104);
      
      // Inspector signature
      pdf.text('Qualified Electrician:', margin, yPosition);
      pdf.line(margin + 50, yPosition - 1, margin + 120, yPosition - 1);
      pdf.text('Date:', margin + 130, yPosition);
      pdf.line(margin + 145, yPosition - 1, margin + 180, yPosition - 1);
      yPosition += 20;

      // Client signature
      pdf.text('Client/Representative:', margin, yPosition);
      pdf.line(margin + 50, yPosition - 1, margin + 120, yPosition - 1);
      pdf.text('Date:', margin + 130, yPosition);
      pdf.line(margin + 145, yPosition - 1, margin + 180, yPosition - 1);
      yPosition += 15;
      
      // Compliance statement
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8);
      pdf.setTextColor(113, 128, 150);
      const complianceText = "This report has been prepared in accordance with BS 7671:2018+A3:2024 and IET Guidance Note 3.";
      pdf.text(complianceText, margin, yPosition, { maxWidth: pageWidth - 2 * margin });
    }

    // Generate filename
    const finalFilename = filename || `${reportType.toLowerCase().replace(/\s+/g, '-')}-${formatDate(new Date(), 'ddMMyyyy')}.pdf`;
    
    // Save the PDF
    pdf.save(finalFilename);
    console.log('Enhanced electrical PDF generated successfully');
    
  } catch (error) {
    console.error('Enhanced PDF generation failed:', error);
    throw new Error(`Enhanced PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};