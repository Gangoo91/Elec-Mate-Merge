import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format as formatDate } from "date-fns";

// Extend jsPDF with autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface ProfessionalPDFOptions {
  reportType: string;
  companyName?: string;
  logoUrl?: string;
  includeSignatures?: boolean;
  watermark?: string;
}

// Simple and robust PDF generation function
export const generateProfessionalElectricalPDF = async (
  content: string,
  reportType: string,
  filename?: string,
  options: ProfessionalPDFOptions = { reportType }
): Promise<void> => {
  try {
    console.log('Starting PDF generation...');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // Header
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(20);
    pdf.text(reportType, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Company name
    if (options.companyName) {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.text(options.companyName, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;
    }

    // Date
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(`Generated: ${formatDate(new Date(), "dd/MM/yyyy")}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    // Watermark
    if (options.watermark) {
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8);
      pdf.text(options.watermark, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;
    }

    // Process content - simple text processing
    const lines = content.split('\n');
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);

    for (const line of lines) {
      // Check if we need a new page
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }

      if (line.trim()) {
        // Handle headers
        if (line.startsWith('#')) {
          pdf.setFont('helvetica', 'bold');
          pdf.setFontSize(14);
          const headerText = line.replace(/^#+\s*/, '');
          pdf.text(headerText, margin, yPosition);
          yPosition += 10;
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(10);
        } else {
          // Regular text - handle line wrapping
          const cleanLine = line.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove markdown bold
          const textLines = pdf.splitTextToSize(cleanLine, pageWidth - (2 * margin));
          
          for (const textLine of textLines) {
            if (yPosition > pageHeight - margin) {
              pdf.addPage();
              yPosition = margin;
            }
            pdf.text(textLine, margin, yPosition);
            yPosition += 6;
          }
        }
      } else {
        yPosition += 6; // Empty line spacing
      }
    }

    // Signature section if requested
    if (options.includeSignatures) {
      // Check if we need a new page
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = margin;
      }

      yPosition += 20;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.text('Signatures', margin, yPosition);
      yPosition += 15;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      
      // Inspector signature
      pdf.text('Inspector:', margin, yPosition);
      pdf.line(margin + 30, yPosition, margin + 100, yPosition);
      pdf.text('Date:', margin + 110, yPosition);
      pdf.line(margin + 125, yPosition, margin + 170, yPosition);
      yPosition += 20;

      // Client signature
      pdf.text('Client:', margin, yPosition);
      pdf.line(margin + 30, yPosition, margin + 100, yPosition);
      pdf.text('Date:', margin + 110, yPosition);
      pdf.line(margin + 125, yPosition, margin + 170, yPosition);
    }

    // Generate filename
    const finalFilename = filename || `${reportType.toLowerCase().replace(/\s+/g, '-')}-${formatDate(new Date(), 'ddMMyyyy')}.pdf`;
    
    // Save the PDF
    pdf.save(finalFilename);
    console.log('PDF generated successfully');
    
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};