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

// Helper function to add a section box
const addSectionBox = (doc: jsPDF, x: number, y: number, width: number, height: number, primaryColor: [number, number, number]) => {
  // Light background
  doc.setFillColor(250, 250, 250);
  doc.rect(x, y, width, height, 'F');
  
  // Border with primary color
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.rect(x, y, width, height);
};

export const generateQuotePDF = (quote: Partial<Quote>, companyProfile?: CompanyProfile) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  // Extract colors from company profile (convert to RGB)
  const primaryColor: [number, number, number] = companyProfile?.primary_color ? 
    hexToRgb(companyProfile.primary_color) : [41, 98, 255]; // Professional blue
  const secondaryColor: [number, number, number] = companyProfile?.secondary_color ? 
    hexToRgb(companyProfile.secondary_color) : [245, 245, 245]; // Light grey
  
  let currentY = 25;
  
  // === PROFESSIONAL HEADER SECTION ===
  // Header band with primary color
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 15, 'F');
  
  // Company Logo (left side)
  if (companyProfile?.logo_data_url) {
    try {
      doc.addImage(companyProfile.logo_data_url, 'JPEG', 20, currentY, 35, 25);
    } catch (error) {
      console.warn('Could not add logo to PDF:', error);
    }
  }
  
  // Company Info Box (right side)
  if (companyProfile) {
    const infoBoxX = pageWidth - 85;
    const infoBoxY = currentY;
    const infoBoxWidth = 65;
    let infoBoxHeight = 10;
    
    // Calculate box height based on content
    const infoLines = [
      companyProfile.company_name,
      companyProfile.company_address,
      companyProfile.company_postcode,
      companyProfile.company_phone ? `Tel: ${companyProfile.company_phone}` : '',
      companyProfile.company_email ? `Email: ${companyProfile.company_email}` : '',
      companyProfile.vat_number ? `VAT: ${companyProfile.vat_number}` : ''
    ].filter(Boolean);
    
    infoBoxHeight = infoLines.length * 5 + 8;
    
    // Draw info box with subtle shadow
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.rect(infoBoxX, infoBoxY, infoBoxWidth, infoBoxHeight, 'FD');
    
    // Company name in primary color
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(companyProfile.company_name, infoBoxX + 3, infoBoxY + 7);
    
    // Company details
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    let detailY = infoBoxY + 12;
    
    infoLines.slice(1).forEach(line => {
      if (line) {
        doc.text(line, infoBoxX + 3, detailY);
        detailY += 4;
      }
    });
  }
  
  currentY += 35;
  
  // === QUOTE TITLE AND INFO SECTION ===
  // Main title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('ELECTRICAL QUOTE', 20, currentY);
  
  // Quote info box (right aligned)
  const quoteInfoX = pageWidth - 65;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text(`Quote #: ${quote.quoteNumber || 'N/A'}`, quoteInfoX, currentY - 5);
  doc.text(`Date: ${quote.createdAt?.toLocaleDateString() || new Date().toLocaleDateString()}`, quoteInfoX, currentY + 3);
  
  currentY += 25;
  
  // === CLIENT AND JOB DETAILS SECTION (SIDE BY SIDE) ===
  const leftColumnX = 20;
  const rightColumnX = pageWidth / 2 + 10;
  const columnWidth = (pageWidth / 2) - 25;
  
  // Client Details Box
  addSectionBox(doc, leftColumnX, currentY, columnWidth, 45, primaryColor);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('CLIENT DETAILS', leftColumnX + 5, currentY + 8);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  let clientY = currentY + 16;
  
  if (quote.client?.name) {
    doc.setFont('helvetica', 'bold');
    doc.text(quote.client.name, leftColumnX + 5, clientY);
    clientY += 6;
  }
  
  doc.setFont('helvetica', 'normal');
  [
    quote.client?.address,
    quote.client?.postcode,
    quote.client?.phone,
    quote.client?.email
  ].filter(Boolean).forEach(detail => {
    doc.text(detail!, leftColumnX + 5, clientY);
    clientY += 5;
  });
  
  // Job Details Box
  if (quote.jobDetails) {
    addSectionBox(doc, rightColumnX, currentY, columnWidth, 45, primaryColor);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('JOB DETAILS', rightColumnX + 5, currentY + 8);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    let jobY = currentY + 16;
    
    if (quote.jobDetails.title) {
      doc.setFont('helvetica', 'bold');
      doc.text(quote.jobDetails.title, rightColumnX + 5, jobY);
      jobY += 6;
      doc.setFont('helvetica', 'normal');
    }
    
    if (quote.jobDetails.location) {
      doc.text(`Location: ${quote.jobDetails.location}`, rightColumnX + 5, jobY);
      jobY += 5;
    }
    
    if (quote.jobDetails.estimatedDuration) {
      const duration = quote.jobDetails.estimatedDuration === "Other" ? 
        quote.jobDetails.customDuration || "Custom" : 
        quote.jobDetails.estimatedDuration;
      doc.text(`Duration: ${duration}`, rightColumnX + 5, jobY);
      jobY += 5;
    }
    
    if (quote.jobDetails.workStartDate) {
      doc.text(`Start: ${new Date(quote.jobDetails.workStartDate).toLocaleDateString()}`, rightColumnX + 5, jobY);
    }
  }
  
  currentY += 55;
  
  // === QUOTE ITEMS TABLE ===
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('QUOTE BREAKDOWN', 20, currentY);
  currentY += 10;
  
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
      fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]], 
      textColor: [255, 255, 255],
      fontSize: 11,
      fontStyle: 'bold'
    },
    styles: { 
      fontSize: 10,
      cellPadding: 4,
      lineColor: [200, 200, 200]
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248]
    },
    columnStyles: {
      0: { cellWidth: 90 }, // Description
      1: { cellWidth: 20, halign: 'center' }, // Qty
      2: { cellWidth: 30, halign: 'right' }, // Unit Price
      3: { cellWidth: 30, halign: 'right' } // Total
    }
  });
  
  // Calculate final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY + 15;
  
  // === PROFESSIONAL TOTALS SECTION ===
  const totalsBoxX = pageWidth - 85;
  const totalsBoxY = finalY;
  const totalsBoxWidth = 65;
  const totalsBoxHeight = quote.settings?.vatRegistered ? 35 : 25;
  
  // Totals box with border
  doc.setFillColor(248, 248, 248);
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.rect(totalsBoxX, totalsBoxY, totalsBoxWidth, totalsBoxHeight, 'FD');
  
  // Totals content
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  let totalsY = totalsBoxY + 8;
  
  // Subtotal
  doc.text('Subtotal:', totalsBoxX + 3, totalsY);
  doc.text(`£${(quote.subtotal || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 3, totalsY, { align: 'right' });
  totalsY += 6;
  
  // VAT (if applicable)
  if (quote.settings?.vatRegistered) {
    doc.text(`VAT (${quote.settings.vatRate}%):`, totalsBoxX + 3, totalsY);
    doc.text(`£${(quote.vatAmount || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 3, totalsY, { align: 'right' });
    totalsY += 8;
  }
  
  // Total with emphasis
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(totalsBoxX, totalsY - 3, totalsBoxWidth, 12, 'F');
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL:', totalsBoxX + 3, totalsY + 5);
  doc.text(`£${(quote.total || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 3, totalsY + 5, { align: 'right' });
  
  currentY = finalY + totalsBoxHeight + 20;
  
  // === PAYMENT TERMS AND BANK DETAILS ===
  if (companyProfile?.payment_terms || (companyProfile?.bank_details && Object.keys(companyProfile.bank_details).length > 0)) {
    // Payment Terms
    if (companyProfile?.payment_terms) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('PAYMENT TERMS', 20, currentY);
      currentY += 8;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      const paymentTermsLines = doc.splitTextToSize(companyProfile.payment_terms, 160);
      doc.text(paymentTermsLines, 20, currentY);
      currentY += (paymentTermsLines.length * 5) + 10;
    }
    
    // Bank Details
    if (companyProfile?.bank_details && Object.keys(companyProfile.bank_details).length > 0) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('PAYMENT INFORMATION', 20, currentY);
      currentY += 8;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      
      const bankDetails = [
        companyProfile.bank_details.account_name ? `Account Name: ${companyProfile.bank_details.account_name}` : '',
        companyProfile.bank_details.sort_code ? `Sort Code: ${companyProfile.bank_details.sort_code}` : '',
        companyProfile.bank_details.account_number ? `Account Number: ${companyProfile.bank_details.account_number}` : '',
        companyProfile.bank_details.bank_name ? `Bank: ${companyProfile.bank_details.bank_name}` : ''
      ].filter(Boolean);
      
      bankDetails.forEach(detail => {
        doc.text(detail, 20, currentY);
        currentY += 5;
      });
      
      currentY += 10;
    }
  }
  
  // === PROFESSIONAL FOOTER ===
  const footerY = pageHeight - 25;
  
  // Footer separator line
  doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setLineWidth(0.3);
  doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);
  
  // Footer content
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  
  // Left side - validity and compliance
  doc.text('This quote is valid for 30 days from the date of issue.', 20, footerY);
  doc.text('All work will be carried out in accordance with BS 7671:2018+A2:2022 regulations.', 20, footerY + 6);
  
  // Right side - contact summary (if space permits)
  if (companyProfile?.company_phone || companyProfile?.company_email) {
    const contactInfo = [
      companyProfile.company_phone ? `Tel: ${companyProfile.company_phone}` : '',
      companyProfile.company_email ? `Email: ${companyProfile.company_email}` : ''
    ].filter(Boolean).join(' | ');
    
    doc.text(contactInfo, pageWidth - 20, footerY, { align: 'right' });
  }
  
  // Page number
  doc.text('Page 1 of 1', pageWidth - 20, footerY + 6, { align: 'right' });
  
  // Save the PDF
  doc.save(`Quote-${quote.quoteNumber || 'Draft'}.pdf`);
};