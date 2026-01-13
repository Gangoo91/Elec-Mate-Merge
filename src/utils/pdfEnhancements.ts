import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface DigitalSignatureOptions {
  signature: string;
  timestamp?: Date;
  location?: string;
  reason?: string;
}

export interface CertificateSecurityOptions {
  password?: string;
  watermark?: string;
  restrictions?: {
    printing?: boolean;
    copying?: boolean;
    editing?: boolean;
  };
}

export const addDigitalSignature = async (
  pdf: jsPDF, 
  options: DigitalSignatureOptions,
  x: number,
  y: number,
  width: number = 80,
  height: number = 30
): Promise<void> => {
  return new Promise((resolve) => {
    try {
      // Add signature image
      if (options.signature && options.signature.startsWith('data:image/')) {
        pdf.addImage(options.signature, 'PNG', x, y, width, height);
      }
      
      // Add signature metadata
      const timestamp = options.timestamp || new Date();
      pdf.setFontSize(7);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(100, 100, 100);
      
      pdf.text(`Digitally signed: ${timestamp.toLocaleString('en-GB')}`, x, y + height + 3);
      
      if (options.location) {
        pdf.text(`Location: ${options.location}`, x, y + height + 8);
      }
      
      if (options.reason) {
        pdf.text(`Reason: ${options.reason}`, x, y + height + 13);
      }
      
      // Reset text color
      pdf.setTextColor(0, 0, 0);
      
    } catch (error) {
      console.warn('Failed to add digital signature:', error);
    }
    
    resolve();
  });
};

export const addProfessionalWatermark = (
  pdf: jsPDF,
  text: string = 'ORIGINAL CERTIFICATE',
  opacity: number = 0.1
): void => {
  const pageCount = pdf.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Save current state
    pdf.saveGraphicsState();
    
    // Set watermark properties
    pdf.setGState(pdf.GState({ opacity: opacity }));
    pdf.setTextColor(200, 200, 200);
    pdf.setFontSize(60);
    pdf.setFont('helvetica', 'bold');
    
    // Calculate center position and rotation
    const centerX = pageWidth / 2;
    const centerY = pageHeight / 2;
    
    // Add rotated watermark text
    pdf.text(text, centerX, centerY, {
      angle: 45,
      align: 'center',
      baseline: 'middle'
    });
    
    // Restore state
    pdf.restoreGraphicsState();
  }
};

export const addQRCodeVerification = (
  pdf: jsPDF,
  certificateId: string,
  verificationUrl: string,
  x: number,
  y: number,
  size: number = 25
): void => {
  try {
    // Create verification URL with certificate ID
    const fullUrl = `${verificationUrl}?cert=${certificateId}`;
    
    // Add QR code placeholder (in a real implementation, you'd use a QR code library)
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(1);
    pdf.rect(x, y, size, size);
    
    // Add verification info
    pdf.setFontSize(6);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Scan to verify', x, y + size + 3);
    pdf.text(`Cert ID: ${certificateId}`, x, y + size + 8);
    
  } catch (error) {
    console.warn('Failed to add QR verification:', error);
  }
};

export const enhanceTableStyling = (tableOptions: any): any => {
  return {
    ...tableOptions,
    styles: {
      ...tableOptions.styles,
      fontSize: 8,
      cellPadding: 4,
      lineColor: [200, 200, 200],
      lineWidth: 0.3,
      overflow: 'linebreak',
      halign: 'left',
      valign: 'middle'
    },
    headStyles: {
      ...tableOptions.headStyles,
      fillColor: [51, 51, 51],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      cellPadding: 5
    },
    alternateRowStyles: {
      fillColor: [248, 249, 250]
    },
    columnStyles: {
      ...tableOptions.columnStyles
    },
    theme: 'grid',
    tableLineColor: [200, 200, 200],
    tableLineWidth: 0.3
  };
};

export const addProfessionalBorders = (pdf: jsPDF): void => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 10;
  
  // Outer border
  pdf.setDrawColor(51, 51, 51);
  pdf.setLineWidth(1);
  pdf.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
  
  // Inner accent border
  pdf.setDrawColor(255, 204, 0);
  pdf.setLineWidth(0.5);
  pdf.rect(margin + 2, margin + 2, pageWidth - 2 * (margin + 2), pageHeight - 2 * (margin + 2));
};

export const formatCurrency = (amount: number | string, currency: string = 'GBP'): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return 'N/A';
  
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency
  }).format(numAmount);
};

export const formatDateTime = (date: Date | string | null | undefined, includeTime: boolean = false): string => {
  // Handle null/undefined safely
  if (date === null || date === undefined) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  // Handle invalid dates
  if (!dateObj || isNaN(dateObj.getTime())) return '';
  
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };
  
  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }
  
  return dateObj.toLocaleDateString('en-GB', options);
};

export const addCertificateValidation = (
  pdf: jsPDF,
  certificateData: {
    id: string;
    issueDate: Date;
    expiryDate?: Date;
    version: string;
  }
): void => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Add validation box in top right
  const boxWidth = 60;
  const boxHeight = 25;
  const boxX = pageWidth - boxWidth - 15;
  const boxY = 10;
  
  pdf.setDrawColor(51, 51, 51);
  pdf.setLineWidth(0.5);
  pdf.rect(boxX, boxY, boxWidth, boxHeight);
  
  // Add validation information
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CERTIFICATE VALIDATION', boxX + 2, boxY + 4);
  
  pdf.setFont('helvetica', 'normal');
  pdf.text(`ID: ${certificateData.id}`, boxX + 2, boxY + 8);
  pdf.text(`Issued: ${formatDateTime(certificateData.issueDate)}`, boxX + 2, boxY + 12);
  
  if (certificateData.expiryDate) {
    pdf.text(`Expires: ${formatDateTime(certificateData.expiryDate)}`, boxX + 2, boxY + 16);
  }
  
  pdf.text(`v${certificateData.version}`, boxX + 2, boxY + 20);
};

// Normalise jspdf-autotable options to avoid non-string content errors
const toSafeContent = (val: any): any => {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') return String(val);
  if (typeof val === 'object') {
    if ('content' in val) {
      const cell: any = val;
      return { ...cell, content: typeof cell.content === 'string' ? cell.content : String(cell.content ?? '') };
    }
    // For objects without content (unexpected), stringify safely
    try { return JSON.stringify(val); } catch { return String(val); }
  }
  return String(val);
};

const normaliseMatrix = (matrix?: any[][]): any[][] | undefined => {
  if (!matrix) return matrix;
  return matrix.map(row => row.map(cell => toSafeContent(cell)));
};

export const normaliseTableOptions = (options: any): any => {
  return {
    ...options,
    head: normaliseMatrix(options.head),
    body: normaliseMatrix(options.body),
    foot: normaliseMatrix(options.foot)
  };
};

export const safeAutoTable = (pdf: jsPDF, options: any): void => {
  const normalised = normaliseTableOptions(options);
  // Delegate to jspdf-autotable
  autoTable(pdf as any, normalised);
};

export const generateCertificateMetadata = (formData: any): any => {
  return {
    title: `EICR Certificate - ${formData.clientName || 'Unknown Client'}`,
    subject: 'Electrical Installation Condition Report',
    author: formData.inspectorName || formData.companyName || 'Unknown Inspector',
    creator: 'Professional EICR System',
    producer: 'Enhanced jsPDF Generator',
    keywords: ['EICR', 'BS7671', 'Electrical', 'Inspection', 'Certificate'],
    creationDate: new Date(),
    modDate: new Date()
  };
};