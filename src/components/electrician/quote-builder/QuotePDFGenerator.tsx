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
  
  // Extract colors from company profile (convert to RGB)
  const primaryColor = companyProfile?.primary_color ? 
    hexToRgb(companyProfile.primary_color) : [255, 215, 0]; // Default electric yellow
  const secondaryColor = companyProfile?.secondary_color ? 
    hexToRgb(companyProfile.secondary_color) : [51, 51, 51]; // Default dark grey
  
  // Company Logo (if available)
  if (companyProfile?.logo_data_url) {
    try {
      doc.addImage(companyProfile.logo_data_url, 'JPEG', 20, currentY, 40, 30);
      currentY += 35;
    } catch (error) {
      console.warn('Could not add logo to PDF:', error);
    }
  }
  
  // Company Details
  if (companyProfile) {
    doc.setFontSize(16);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(companyProfile.company_name, 20, currentY);
    currentY += 8;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    if (companyProfile.company_address) {
      doc.text(companyProfile.company_address, 20, currentY);
      currentY += 6;
    }
    if (companyProfile.company_postcode) {
      doc.text(companyProfile.company_postcode, 20, currentY);
      currentY += 6;
    }
    if (companyProfile.company_phone) {
      doc.text(`Tel: ${companyProfile.company_phone}`, 20, currentY);
      currentY += 6;
    }
    if (companyProfile.company_email) {
      doc.text(`Email: ${companyProfile.company_email}`, 20, currentY);
      currentY += 6;
    }
    if (companyProfile.company_website) {
      doc.text(`Website: ${companyProfile.company_website}`, 20, currentY);
      currentY += 6;
    }
    if (companyProfile.vat_number) {
      doc.text(`VAT No: ${companyProfile.vat_number}`, 20, currentY);
      currentY += 6;
    }
    if (companyProfile.company_registration) {
      doc.text(`Company Reg: ${companyProfile.company_registration}`, 20, currentY);
      currentY += 6;
    }
    currentY += 10;
  }
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('ELECTRICAL QUOTE', 20, currentY);
  currentY += 15;
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Quote Number: ${quote.quoteNumber}`, 20, currentY);
  currentY += 10;
  doc.text(`Date: ${quote.createdAt?.toLocaleDateString() || new Date().toLocaleDateString()}`, 20, currentY);
  currentY += 15;
  
  // Client Information
  doc.setFontSize(14);
  doc.text('CLIENT DETAILS', 20, currentY);
  currentY += 10;
  doc.setFontSize(10);
  doc.text(`${quote.client?.name}`, 20, currentY);
  currentY += 8;
  doc.text(`${quote.client?.email}`, 20, currentY);
  currentY += 8;
  doc.text(`${quote.client?.phone}`, 20, currentY);
  currentY += 8;
  doc.text(`${quote.client?.address}`, 20, currentY);
  currentY += 8;
  doc.text(`${quote.client?.postcode}`, 20, currentY);
  currentY += 15;
  
  // Job Details
  if (quote.jobDetails) {
    doc.setFontSize(14);
    doc.text('JOB DETAILS', 20, currentY);
    currentY += 10;
    doc.setFontSize(10);
    
    if (quote.jobDetails.title) {
      doc.text(`Job Title: ${quote.jobDetails.title}`, 20, currentY);
      currentY += 8;
    }
    
    if (quote.jobDetails.description) {
      const descriptionLines = doc.splitTextToSize(quote.jobDetails.description, 170);
      doc.text('Description:', 20, currentY);
      currentY += 8;
      doc.text(descriptionLines, 20, currentY);
      currentY += (descriptionLines.length * 6) + 4;
    }
    
    if (quote.jobDetails.location) {
      doc.text(`Work Location: ${quote.jobDetails.location}`, 20, currentY);
      currentY += 8;
    }
    
    if (quote.jobDetails.estimatedDuration) {
      const duration = quote.jobDetails.estimatedDuration === "Other" ? 
        quote.jobDetails.customDuration || "Custom duration" : 
        quote.jobDetails.estimatedDuration;
      doc.text(`Estimated Duration: ${duration}`, 20, currentY);
      currentY += 8;
    }
    
    if (quote.jobDetails.workStartDate) {
      doc.text(`Proposed Start Date: ${new Date(quote.jobDetails.workStartDate).toLocaleDateString()}`, 20, currentY);
      currentY += 8;
    }
    
    if (quote.jobDetails.specialRequirements) {
      const requirementsLines = doc.splitTextToSize(quote.jobDetails.specialRequirements, 170);
      doc.text('Special Requirements:', 20, currentY);
      currentY += 8;
      doc.text(requirementsLines, 20, currentY);
      currentY += (requirementsLines.length * 6) + 4;
    }
    
    currentY += 10;
  }
  
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
    headStyles: { fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
  });
  
  // Calculate final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY + 12;

  // Totals (simplified - profit and overhead now built into hourly rates)
  doc.setFontSize(12);
  const totalsX = 120;
  currentY = finalY;

  doc.text('Subtotal:', totalsX, currentY);
  doc.text(`£${(quote.subtotal || 0).toFixed(2)}`, 170, currentY);
  currentY += 8;
  
  if (quote.settings?.vatRegistered) {
    doc.text(`VAT (${quote.settings.vatRate}%):`, totalsX, currentY);
    doc.text(`£${(quote.vatAmount || 0).toFixed(2)}`, 170, currentY);
    currentY += 8;
  }
  
  // Total
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('TOTAL:', totalsX, currentY);
  doc.text(`£${(quote.total || 0).toFixed(2)}`, 170, currentY);
  
  currentY += 20;
  
  // Payment Terms
  if (companyProfile?.payment_terms) {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PAYMENT TERMS', 20, currentY);
    currentY += 8;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    const paymentTermsLines = doc.splitTextToSize(companyProfile.payment_terms, 170);
    doc.text(paymentTermsLines, 20, currentY);
    currentY += (paymentTermsLines.length * 6) + 10;
  }
  
  // Bank Details
  if (companyProfile?.bank_details && Object.keys(companyProfile.bank_details).length > 0) {
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PAYMENT INFORMATION', 20, currentY);
    currentY += 8;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    
    if (companyProfile.bank_details.account_name) {
      doc.text(`Account Name: ${companyProfile.bank_details.account_name}`, 20, currentY);
      currentY += 6;
    }
    if (companyProfile.bank_details.account_number) {
      doc.text(`Account Number: ${companyProfile.bank_details.account_number}`, 20, currentY);
      currentY += 6;
    }
    if (companyProfile.bank_details.sort_code) {
      doc.text(`Sort Code: ${companyProfile.bank_details.sort_code}`, 20, currentY);
      currentY += 6;
    }
    if (companyProfile.bank_details.bank_name) {
      doc.text(`Bank: ${companyProfile.bank_details.bank_name}`, 20, currentY);
      currentY += 6;
    }
    currentY += 10;
  }
  
  // Footer
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text('This quote is valid for 30 days from the date of issue.', 20, doc.internal.pageSize.height - 30);
  doc.text('All work will be carried out in accordance with BS 7671:2018 regulations.', 20, doc.internal.pageSize.height - 20);
  
  // Save the PDF
  doc.save(`Quote-${quote.quoteNumber}.pdf`);
};