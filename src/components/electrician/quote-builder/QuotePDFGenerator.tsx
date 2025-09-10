import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Quote } from '@/types/quote';
import { CompanyProfile } from '@/types/company';

// Helper function to convert hex color to RGB array
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : [0, 0, 0];
};

// Helper function to add a section separator line
const addSectionSeparator = (doc: jsPDF, y: number, color: [number, number, number]) => {
  doc.setDrawColor(color[0], color[1], color[2]);
  doc.setLineWidth(0.5);
  doc.line(20, y, 190, y);
  return y + 8;
};

// Helper function to create a styled table for client/job details
const createInfoTable = (doc: jsPDF, data: Array<[string, string]>, startY: number, primaryColor: [number, number, number]) => {
  autoTable(doc, {
    startY: startY,
    body: data,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 4,
      lineColor: [200, 200, 200],
      lineWidth: 0.5,
    },
    columnStyles: {
      0: { 
        fontStyle: 'bold', 
        fillColor: [248, 250, 252],
        cellWidth: 50 
      },
      1: { 
        cellWidth: 'auto' 
      }
    },
    margin: { left: 20, right: 20 },
    tableWidth: 'wrap'
  });
  return (doc as any).lastAutoTable.finalY + 15;
};

export const generateQuotePDF = (quote: Partial<Quote>, companyProfile?: CompanyProfile) => {
  const doc = new jsPDF();
  
  let currentY = 20;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Extract colors from company profile (convert to RGB)
  const primaryColor: [number, number, number] = companyProfile?.primary_color ? 
    hexToRgb(companyProfile.primary_color) : [0, 102, 204]; // Professional blue
  const secondaryColor: [number, number, number] = companyProfile?.secondary_color ? 
    hexToRgb(companyProfile.secondary_color) : [108, 117, 125]; // Subtle grey
  
  // === PROFESSIONAL HEADER SECTION ===
  // Add subtle header band with primary color
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 12, 'F');
  
  currentY = 25;
  
  // Company Logo (top-left, properly scaled)
  let logoHeight = 35;
  if (companyProfile?.logo_data_url) {
    try {
      doc.addImage(companyProfile.logo_data_url, 'JPEG', 20, currentY, 50, logoHeight);
    } catch (error) {
      console.warn('Could not add logo to PDF:', error);
      logoHeight = 0;
    }
  } else {
    logoHeight = 0;
  }
  
  // Quote header info (top-right)
  const headerRightX = pageWidth - 80;
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(headerRightX - 10, currentY, 70, 45, 3, 3, 'F');
  
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('QUOTE', headerRightX, currentY + 12, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(`No: ${quote.quoteNumber || 'QT-001'}`, headerRightX, currentY + 22, { align: 'center' });
  doc.text(`Date: ${quote.createdAt?.toLocaleDateString() || new Date().toLocaleDateString()}`, headerRightX, currentY + 32, { align: 'center' });
  
  currentY = Math.max(currentY + logoHeight + 15, currentY + 55);
  
  // Company Name and Details (below logo)
  if (companyProfile) {
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(companyProfile.company_name, 20, currentY);
    currentY += 12;
    
    // Company details in structured format
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    
    if (companyProfile.company_address) {
      doc.text(companyProfile.company_address, 20, currentY);
      currentY += 5;
    }
    if (companyProfile.company_postcode) {
      doc.text(companyProfile.company_postcode, 20, currentY);
      currentY += 5;
    }
    
    // Contact info in two columns
    const leftColX = 20;
    const rightColX = 120;
    let contactY = currentY + 3;
    
    if (companyProfile.company_phone) {
      doc.text(`Tel: ${companyProfile.company_phone}`, leftColX, contactY);
      contactY += 5;
    }
    if (companyProfile.company_email) {
      doc.text(`Email: ${companyProfile.company_email}`, leftColX, contactY);
    }
    
    contactY = currentY + 3;
    if (companyProfile.vat_number) {
      doc.text(`VAT: ${companyProfile.vat_number}`, rightColX, contactY);
      contactY += 5;
    }
    if (companyProfile.company_registration) {
      doc.text(`Reg: ${companyProfile.company_registration}`, rightColX, contactY);
    }
    
    currentY += 20;
  }
  
  // Section separator
  currentY = addSectionSeparator(doc, currentY, secondaryColor);
  
  // === CLIENT DETAILS SECTION ===
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('CLIENT DETAILS', 20, currentY);
  currentY += 10;
  
  // Client details table
  const clientData: Array<[string, string]> = [];
  if (quote.client?.name) clientData.push(['Name', quote.client.name]);
  if (quote.client?.email) clientData.push(['Email', quote.client.email]);
  if (quote.client?.phone) clientData.push(['Phone', quote.client.phone]);
  if (quote.client?.address) clientData.push(['Address', quote.client.address]);
  if (quote.client?.postcode) clientData.push(['Postcode', quote.client.postcode]);
  
  if (clientData.length > 0) {
    currentY = createInfoTable(doc, clientData, currentY, primaryColor);
  } else {
    currentY += 15;
  }
  
  // === JOB DETAILS SECTION ===
  if (quote.jobDetails) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('JOB DETAILS', 20, currentY);
    currentY += 10;
    
    const jobData: Array<[string, string]> = [];
    
    if (quote.jobDetails.title) {
      jobData.push(['Job Title', quote.jobDetails.title]);
    }
    
    if (quote.jobDetails.location) {
      jobData.push(['Work Location', quote.jobDetails.location]);
    }
    
    if (quote.jobDetails.estimatedDuration) {
      const duration = quote.jobDetails.estimatedDuration === "Other" ? 
        quote.jobDetails.customDuration || "Custom duration" : 
        quote.jobDetails.estimatedDuration;
      jobData.push(['Duration', duration]);
    }
    
    if (quote.jobDetails.workStartDate) {
      jobData.push(['Start Date', new Date(quote.jobDetails.workStartDate).toLocaleDateString()]);
    }
    
    if (quote.jobDetails.description) {
      jobData.push(['Description', quote.jobDetails.description]);
    }
    
    if (quote.jobDetails.specialRequirements) {
      jobData.push(['Special Requirements', quote.jobDetails.specialRequirements]);
    }
    
    if (jobData.length > 0) {
      currentY = createInfoTable(doc, jobData, currentY, primaryColor);
    } else {
      currentY += 15;
    }
  }
  
  // === QUOTE ITEMS SECTION ===
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('QUOTE ITEMS', 20, currentY);
  currentY += 10;
  
  // Quote Items Table
  const tableData = quote.items?.map(item => [
    item.description,
    item.quantity.toString(),
    `£${item.unitPrice.toFixed(2)}`,
    `£${item.totalPrice.toFixed(2)}`
  ]) || [];
  
  autoTable(doc, {
    startY: currentY,
    head: [['Description', 'Qty', 'Unit Price', 'Total']],
    body: tableData,
    theme: 'grid',
    headStyles: { 
      fillColor: primaryColor, 
      textColor: [255, 255, 255],
      fontSize: 11,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    styles: { 
      fontSize: 10,
      cellPadding: 5,
      lineColor: [200, 200, 200],
      lineWidth: 0.5
    },
    columnStyles: {
      0: { cellWidth: 'auto' }, // Description
      1: { cellWidth: 20, halign: 'center' }, // Qty
      2: { cellWidth: 30, halign: 'right' }, // Unit Price
      3: { cellWidth: 30, halign: 'right' }, // Total
    },
    margin: { left: 20, right: 20 }
  });
  
  // Calculate final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  currentY = finalY;

  // === TOTALS SECTION ===
  // Create a styled totals box
  const totalsBoxX = pageWidth - 110;
  const totalsBoxY = currentY;
  const totalsBoxWidth = 90;
  let totalsBoxHeight = 40;
  
  // Adjust height based on VAT
  if (quote.settings?.vatRegistered) {
    totalsBoxHeight += 10;
  }
  
  // Draw totals box background
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1);
  doc.roundedRect(totalsBoxX, totalsBoxY, totalsBoxWidth, totalsBoxHeight, 3, 3, 'FD');
  
  let totalsY = totalsBoxY + 12;
  
  // Subtotal
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text('Subtotal:', totalsBoxX + 5, totalsY);
  doc.text(`£${(quote.subtotal || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 5, totalsY, { align: 'right' });
  totalsY += 8;
  
  // VAT
  if (quote.settings?.vatRegistered) {
    doc.text(`VAT (${quote.settings.vatRate}%):`, totalsBoxX + 5, totalsY);
    doc.text(`£${(quote.vatAmount || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 5, totalsY, { align: 'right' });
    totalsY += 8;
  }
  
  // Add separator line
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(totalsBoxX + 5, totalsY - 2, totalsBoxX + totalsBoxWidth - 5, totalsY - 2);
  
  // Total (bold and larger)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('TOTAL:', totalsBoxX + 5, totalsY + 5);
  doc.text(`£${(quote.total || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 5, totalsY + 5, { align: 'right' });
  
  currentY = totalsBoxY + totalsBoxHeight + 25;
  
  // === PAYMENT TERMS SECTION ===
  if (companyProfile?.payment_terms) {
    currentY = addSectionSeparator(doc, currentY, secondaryColor);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PAYMENT TERMS', 20, currentY);
    currentY += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    const paymentTermsLines = doc.splitTextToSize(companyProfile.payment_terms, 170);
    doc.text(paymentTermsLines, 20, currentY);
    currentY += (paymentTermsLines.length * 6) + 15;
  }
  
  // === BANK DETAILS SECTION ===
  if (companyProfile?.bank_details && Object.keys(companyProfile.bank_details).length > 0) {
    currentY = addSectionSeparator(doc, currentY, secondaryColor);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PAYMENT INFORMATION', 20, currentY);
    currentY += 10;
    
    const bankData: Array<[string, string]> = [];
    if (companyProfile.bank_details.account_name) {
      bankData.push(['Account Name', companyProfile.bank_details.account_name]);
    }
    if (companyProfile.bank_details.account_number) {
      bankData.push(['Account Number', companyProfile.bank_details.account_number]);
    }
    if (companyProfile.bank_details.sort_code) {
      bankData.push(['Sort Code', companyProfile.bank_details.sort_code]);
    }
    if (companyProfile.bank_details.bank_name) {
      bankData.push(['Bank', companyProfile.bank_details.bank_name]);
    }
    
    if (bankData.length > 0) {
      currentY = createInfoTable(doc, bankData, currentY, primaryColor);
    }
  }
  
  // === PROFESSIONAL FOOTER ===
  const footerY = pageHeight - 25;
  
  // Footer separator
  addSectionSeparator(doc, footerY - 10, secondaryColor);
  
  // Footer text
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('This quote is valid for 30 days from the date of issue.', 20, footerY);
  doc.text('All work will be carried out in accordance with BS 7671:2018 regulations.', 20, footerY + 8);
  
  // Page number
  doc.text(`Page 1 of 1`, pageWidth - 20, footerY, { align: 'right' });
  
  // Save the PDF
  doc.save(`Quote-${quote.quoteNumber || 'QT-001'}.pdf`);
};