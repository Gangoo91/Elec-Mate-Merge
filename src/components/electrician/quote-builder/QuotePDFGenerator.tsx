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

export const generateQuotePDF = (quote: Partial<Quote>, companyProfile?: CompanyProfile) => {
  const doc = new jsPDF();
  
  let currentY = 20;
  const pageWidth = doc.internal.pageSize.width;
  
  // Extract colors from company profile (convert to RGB)
  const primaryColor = companyProfile?.primary_color ? 
    hexToRgb(companyProfile.primary_color) : [255, 215, 0]; // Default electric yellow
  const secondaryColor = companyProfile?.secondary_color ? 
    hexToRgb(companyProfile.secondary_color) : [51, 51, 51]; // Default dark grey
  
  // Professional Header Design with two-column layout
  if (companyProfile) {
    // Header background band
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 8, 'F');
    
    currentY = 18;
    
    // Two-column header layout
    const leftColumnX = 20;
    const rightColumnX = 110;
    const logoSize = 35;
    
    // Left column - Logo
    if (companyProfile.logo_data_url) {
      try {
        doc.addImage(companyProfile.logo_data_url, 'JPEG', leftColumnX, currentY, logoSize, logoSize);
      } catch (error) {
        console.warn('Could not add logo to PDF:', error);
      }
    }
    
    // Right column - Company Information Box
    doc.setFillColor(245, 245, 245); // Light grey background
    doc.rect(rightColumnX, currentY, 80, 50, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.rect(rightColumnX, currentY, 80, 50, 'S');
    
    let infoY = currentY + 8;
    
    // Company name - prominent
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(companyProfile.company_name, rightColumnX + 5, infoY);
    infoY += 8;
    
    // Contact details
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    
    if (companyProfile.company_address) {
      const addressLines = doc.splitTextToSize(companyProfile.company_address, 70);
      doc.text(addressLines, rightColumnX + 5, infoY);
      infoY += addressLines.length * 4;
    }
    if (companyProfile.company_postcode) {
      doc.text(companyProfile.company_postcode, rightColumnX + 5, infoY);
      infoY += 4;
    }
    if (companyProfile.company_phone) {
      doc.text(`T: ${companyProfile.company_phone}`, rightColumnX + 5, infoY);
      infoY += 4;
    }
    if (companyProfile.company_email) {
      doc.text(`E: ${companyProfile.company_email}`, rightColumnX + 5, infoY);
      infoY += 4;
    }
    if (companyProfile.company_website) {
      doc.text(`W: ${companyProfile.company_website}`, rightColumnX + 5, infoY);
      infoY += 4;
    }
    
    currentY = Math.max(currentY + logoSize + 10, infoY + 5);
    
    // Registration details in a separate line
    if (companyProfile.vat_number || companyProfile.company_registration) {
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      let regText = '';
      if (companyProfile.company_registration) regText += `Company Reg: ${companyProfile.company_registration}`;
      if (companyProfile.vat_number) {
        if (regText) regText += ' | ';
        regText += `VAT: ${companyProfile.vat_number}`;
      }
      doc.text(regText, rightColumnX + 5, currentY);
      currentY += 8;
    }
  }
  
  currentY += 5;
  
  // Quote Information Box
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(20, currentY, 170, 25, 'F');
  
  // Quote title
  doc.setFontSize(18);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('ELECTRICAL QUOTE', 25, currentY + 8);
  
  // Quote details on right side
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.text(`Quote No: ${quote.quoteNumber}`, 130, currentY + 8);
  doc.text(`Date: ${quote.createdAt?.toLocaleDateString() || new Date().toLocaleDateString()}`, 130, currentY + 18);
  
  currentY += 35;
  
  // Client and Job Details - Side by Side Layout
  const leftColX = 20;
  const rightColX = 110;
  const colWidth = 80;
  
  // Client Details Box
  doc.setFillColor(250, 250, 250);
  doc.rect(leftColX, currentY, colWidth, 45, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(leftColX, currentY, colWidth, 45, 'S');
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('CLIENT DETAILS', leftColX + 5, currentY + 8);
  
  let clientY = currentY + 16;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0);
  
  if (quote.client?.name) {
    doc.text(quote.client.name, leftColX + 5, clientY);
    clientY += 6;
  }
  if (quote.client?.email) {
    doc.text(quote.client.email, leftColX + 5, clientY);
    clientY += 6;
  }
  if (quote.client?.phone) {
    doc.text(quote.client.phone, leftColX + 5, clientY);
    clientY += 6;
  }
  if (quote.client?.address) {
    doc.text(quote.client.address, leftColX + 5, clientY);
    clientY += 6;
  }
  if (quote.client?.postcode) {
    doc.text(quote.client.postcode, leftColX + 5, clientY);
  }
  
  // Job Details Box (right side)
  if (quote.jobDetails) {
    doc.setFillColor(250, 250, 250);
    doc.rect(rightColX, currentY, colWidth, 45, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.rect(rightColX, currentY, colWidth, 45, 'S');
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('JOB DETAILS', rightColX + 5, currentY + 8);
    
    let jobY = currentY + 16;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    
    if (quote.jobDetails.title) {
      doc.text(`Job: ${quote.jobDetails.title}`, rightColX + 5, jobY);
      jobY += 6;
    }
    
    if (quote.jobDetails.location) {
      doc.text(`Location: ${quote.jobDetails.location}`, rightColX + 5, jobY);
      jobY += 6;
    }
    
    if (quote.jobDetails.estimatedDuration) {
      const duration = quote.jobDetails.estimatedDuration === "Other" ? 
        quote.jobDetails.customDuration || "Custom duration" : 
        quote.jobDetails.estimatedDuration;
      doc.text(`Duration: ${duration}`, rightColX + 5, jobY);
      jobY += 6;
    }
    
    if (quote.jobDetails.workStartDate) {
      doc.text(`Start: ${new Date(quote.jobDetails.workStartDate).toLocaleDateString()}`, rightColX + 5, jobY);
    }
  }
  
  currentY += 55;
  
  // Job Description (full width if present)
  if (quote.jobDetails?.description) {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PROJECT DESCRIPTION', 20, currentY);
    currentY += 8;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const descriptionLines = doc.splitTextToSize(quote.jobDetails.description, 170);
    doc.text(descriptionLines, 20, currentY);
    currentY += (descriptionLines.length * 6) + 4;
  }
  
  // Special Requirements (full width if present)
  if (quote.jobDetails?.specialRequirements) {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('SPECIAL REQUIREMENTS', 20, currentY);
    currentY += 8;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const requirementsLines = doc.splitTextToSize(quote.jobDetails.specialRequirements, 170);
    doc.text(requirementsLines, 20, currentY);
    currentY += (requirementsLines.length * 6) + 4;
  }
  
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
      fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]], 
      textColor: [255, 255, 255],
      fontSize: 11,
      fontStyle: 'bold'
    },
    styles: { 
      fontSize: 10,
      cellPadding: 4
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248]
    },
    columnStyles: {
      1: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right', fontStyle: 'bold' }
    },
    margin: { left: 20, right: 20 }
  });
  
  // Calculate final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY + 12;

  // Professional Totals Section
  const totalsBoxY = finalY + 5;
  const totalsBoxX = 120;
  const totalsBoxWidth = 70;
  
  // Totals background
  doc.setFillColor(250, 250, 250);
  doc.rect(totalsBoxX, totalsBoxY, totalsBoxWidth, 35, 'F');
  doc.setDrawColor(200, 200, 200);
  doc.rect(totalsBoxX, totalsBoxY, totalsBoxWidth, 35, 'S');

  currentY = totalsBoxY + 8;
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0);

  doc.text('Subtotal:', totalsBoxX + 5, currentY);
  doc.text(`£${(quote.subtotal || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 15, currentY, { align: 'right' });
  currentY += 7;
  
  if (quote.settings?.vatRegistered) {
    doc.text(`VAT (${quote.settings.vatRate}%):`, totalsBoxX + 5, currentY);
    doc.text(`£${(quote.vatAmount || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 15, currentY, { align: 'right' });
    currentY += 7;
  }
  
  // Total with primary color background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(totalsBoxX, currentY - 3, totalsBoxWidth, 12, 'F');
  
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL:', totalsBoxX + 5, currentY + 5);
  doc.text(`£${(quote.total || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 15, currentY + 5, { align: 'right' });
  
  currentY = totalsBoxY + 45;
  
  // Professional Footer Section
  const footerStartY = Math.max(currentY + 15, doc.internal.pageSize.height - 60);
  
  // Payment Terms Section
  if (companyProfile?.payment_terms) {
    doc.setFillColor(248, 248, 248);
    doc.rect(20, footerStartY, 85, 25, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.rect(20, footerStartY, 85, 25, 'S');
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PAYMENT TERMS', 25, footerStartY + 8);
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const paymentTermsLines = doc.splitTextToSize(companyProfile.payment_terms, 75);
    doc.text(paymentTermsLines, 25, footerStartY + 15);
  }
  
  // Bank Details Section
  if (companyProfile?.bank_details && Object.keys(companyProfile.bank_details).length > 0) {
    doc.setFillColor(248, 248, 248);
    doc.rect(110, footerStartY, 80, 25, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.rect(110, footerStartY, 80, 25, 'S');
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PAYMENT DETAILS', 115, footerStartY + 8);
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    
    let bankY = footerStartY + 15;
    if (companyProfile.bank_details.account_name) {
      doc.text(`${companyProfile.bank_details.account_name}`, 115, bankY);
      bankY += 4;
    }
    if (companyProfile.bank_details.sort_code && companyProfile.bank_details.account_number) {
      doc.text(`${companyProfile.bank_details.sort_code} ${companyProfile.bank_details.account_number}`, 115, bankY);
    }
  }
  
  // Professional Footer with compliance
  const footerY = doc.internal.pageSize.height - 25;
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, footerY - 5, pageWidth, 30, 'F');
  
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('Quote valid for 30 days | All work complies with BS 7671:2018 | Part P Building Regulations', 20, footerY + 5);
  doc.text(`Generated on ${new Date().toLocaleDateString('en-GB')} | ${companyProfile?.company_name || 'Your Company'}`, 20, footerY + 12);
  
  // Save the PDF
  doc.save(`Quote-${quote.quoteNumber}.pdf`);
};