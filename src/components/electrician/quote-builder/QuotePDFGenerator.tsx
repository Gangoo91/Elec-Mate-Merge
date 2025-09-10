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

// Debug function to log company profile data
const debugCompanyProfile = (companyProfile?: CompanyProfile) => {
  console.log('PDF Generation - Company Profile:', {
    hasProfile: !!companyProfile,
    name: companyProfile?.company_name,
    email: companyProfile?.company_email,
    phone: companyProfile?.company_phone,
    hasLogo: !!companyProfile?.logo_data_url,
    colors: {
      primary: companyProfile?.primary_color,
      secondary: companyProfile?.secondary_color
    }
  });
};

export const generateQuotePDF = (quote: Partial<Quote>, companyProfile?: CompanyProfile) => {
  // Debug company profile data
  debugCompanyProfile(companyProfile);
  
  // Validate company profile is loaded
  if (!companyProfile) {
    console.warn('PDF Generation: No company profile provided - using fallback branding');
  }
  
  const doc = new jsPDF('p', 'mm', 'a4');
  doc.setFont('helvetica');
  
  let currentY = 25;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  
  // Extract colors from company profile
  const primaryColor = companyProfile?.primary_color ? 
    hexToRgb(companyProfile.primary_color) : [245, 158, 11];
  const secondaryColor = companyProfile?.secondary_color ? 
    hexToRgb(companyProfile.secondary_color) : [31, 41, 55];
  
  // Professional Header Section
  if (companyProfile && companyProfile.company_name) {
    // Clean header with company branding
    const headerHeight = 65;
    
    // Subtle background for header
    doc.setFillColor(249, 250, 251);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');
    
    // Company logo (prominent positioning)
    if (companyProfile.logo_data_url) {
      try {
        doc.addImage(companyProfile.logo_data_url, 'PNG', margin, currentY, 40, 40);
      } catch (error) {
        console.warn('Could not add logo to PDF:', error);
      }
    }
    
    // Company information (right side)
    const companyInfoX = margin + 50;
    let companyY = currentY + 5;
    
    // Company name (large, prominent)
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(companyProfile.company_name, companyInfoX, companyY);
    companyY += 10;
    
    // Contact information (clear and readable)
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    
    if (companyProfile.company_address) {
      const addressText = companyProfile.company_postcode ? 
        `${companyProfile.company_address}, ${companyProfile.company_postcode}` : 
        companyProfile.company_address;
      const addressLines = doc.splitTextToSize(addressText, pageWidth - companyInfoX - margin);
      doc.text(addressLines, companyInfoX, companyY);
      companyY += addressLines.length * 6;
    }
    
    if (companyProfile.company_phone) {
      doc.text(`Tel: ${companyProfile.company_phone}`, companyInfoX, companyY);
      companyY += 6;
    }
    
    if (companyProfile.company_email) {
      doc.text(`Email: ${companyProfile.company_email}`, companyInfoX, companyY);
      companyY += 6;
    }
    
    if (companyProfile.company_website) {
      doc.text(`Web: ${companyProfile.company_website}`, companyInfoX, companyY);
      companyY += 6;
    }
    
    // Registration details (smaller, subtle)
    if (companyProfile.vat_number || companyProfile.company_registration) {
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      const regDetails = [
        companyProfile.company_registration ? `Company Reg: ${companyProfile.company_registration}` : '',
        companyProfile.vat_number ? `VAT: ${companyProfile.vat_number}` : ''
      ].filter(Boolean).join(' • ');
      
      if (regDetails) {
        doc.text(regDetails, companyInfoX, companyY);
      }
    }
    
    currentY = headerHeight + 10;
  } else {
    // Fallback header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('ELECTRICAL CONTRACTOR', margin, currentY);
    currentY += 25;
  }
  
  // Professional Quote Header Bar
  const quoteBarHeight = 18;
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(margin, currentY, pageWidth - (2 * margin), quoteBarHeight, 'F');
  
  // Quote title (prominent)
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('ELECTRICAL QUOTATION', margin + 8, currentY + 12);
  
  // Quote details (right aligned)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  const quoteNumber = quote.quoteNumber || 'Q001';
  const quoteDate = quote.createdAt?.toLocaleDateString('en-GB') || new Date().toLocaleDateString('en-GB');
  doc.text(`Quote No: ${quoteNumber}`, pageWidth - margin - 8, currentY + 8, { align: 'right' });
  doc.text(`Date: ${quoteDate}`, pageWidth - margin - 8, currentY + 14, { align: 'right' });
  
  currentY += quoteBarHeight + 20;
  
  // Client and Job Information Section (Clean Layout)
  const leftColX = margin;
  const rightColX = pageWidth/2 + 5;
  const colWidth = (pageWidth/2) - margin - 10;
  
  // Client Details Section
  doc.setFillColor(248, 250, 252);
  doc.rect(leftColX, currentY, colWidth, 55, 'F');
  doc.setDrawColor(230, 230, 230);
  doc.rect(leftColX, currentY, colWidth, 55, 'S');
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('CLIENT DETAILS', leftColX + 5, currentY + 10);
  
  let clientY = currentY + 18;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);
  
  if (quote.client?.name) {
    doc.setFont('helvetica', 'bold');
    doc.text(quote.client.name, leftColX + 5, clientY);
    doc.setFont('helvetica', 'normal');
    clientY += 7;
  }
  if (quote.client?.email) {
    doc.text(`Email: ${quote.client.email}`, leftColX + 5, clientY);
    clientY += 6;
  }
  if (quote.client?.phone) {
    doc.text(`Phone: ${quote.client.phone}`, leftColX + 5, clientY);
    clientY += 6;
  }
  if (quote.client?.address) {
    const addressText = quote.client.postcode ? 
      `${quote.client.address}, ${quote.client.postcode}` : 
      quote.client.address;
    const addressLines = doc.splitTextToSize(addressText, colWidth - 10);
    doc.text(addressLines, leftColX + 5, clientY);
    clientY += addressLines.length * 6;
  } else if (quote.client?.postcode) {
    doc.text(quote.client.postcode, leftColX + 5, clientY);
    clientY += 6;
  }
  
  // Job Details Section (Right side)
  if (quote.jobDetails) {
    doc.setFillColor(248, 250, 252);
    doc.rect(rightColX, currentY, colWidth, 55, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.rect(rightColX, currentY, colWidth, 55, 'S');
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('JOB DETAILS', rightColX + 5, currentY + 10);
    
    let jobY = currentY + 18;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    
    if (quote.jobDetails.title) {
      doc.setFont('helvetica', 'bold');
      const titleLines = doc.splitTextToSize(quote.jobDetails.title, colWidth - 10);
      doc.text(titleLines, rightColX + 5, jobY);
      doc.setFont('helvetica', 'normal');
      jobY += titleLines.length * 7;
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
      doc.text(`Start Date: ${new Date(quote.jobDetails.workStartDate).toLocaleDateString('en-GB')}`, rightColX + 5, jobY);
      jobY += 6;
    }
  }
  
  currentY += 65;
  
  // Project Description Section
  if (quote.jobDetails?.description) {
    currentY += 10;
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PROJECT DESCRIPTION', margin, currentY);
    currentY += 12;
    
    // Description box with background
    const descriptionLines = doc.splitTextToSize(quote.jobDetails.description, pageWidth - (2 * margin) - 10);
    const descriptionHeight = (descriptionLines.length * 7) + 10;
    
    doc.setFillColor(252, 252, 252);
    doc.rect(margin, currentY - 5, pageWidth - (2 * margin), descriptionHeight, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.rect(margin, currentY - 5, pageWidth - (2 * margin), descriptionHeight, 'S');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    doc.text(descriptionLines, margin + 5, currentY + 2);
    currentY += descriptionHeight + 5;
  }
  
  // Special Requirements Section
  if (quote.jobDetails?.specialRequirements) {
    currentY += 5;
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('SPECIAL REQUIREMENTS', margin, currentY);
    currentY += 12;
    
    // Requirements box with background
    const requirementsLines = doc.splitTextToSize(quote.jobDetails.specialRequirements, pageWidth - (2 * margin) - 10);
    const requirementsHeight = (requirementsLines.length * 7) + 10;
    
    doc.setFillColor(252, 252, 252);
    doc.rect(margin, currentY - 5, pageWidth - (2 * margin), requirementsHeight, 'F');
    doc.setDrawColor(230, 230, 230);
    doc.rect(margin, currentY - 5, pageWidth - (2 * margin), requirementsHeight, 'S');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(40, 40, 40);
    doc.text(requirementsLines, margin + 5, currentY + 2);
    currentY += requirementsHeight + 5;
  }
  
  currentY += 10;
  
  // Quote Items Table Section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('QUOTE BREAKDOWN', margin, currentY);
  currentY += 15;
  
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
    theme: 'striped',
    headStyles: { 
      fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]], 
      textColor: [255, 255, 255],
      fontSize: 14,
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: { 
      fontSize: 12,
      cellPadding: 6,
      font: 'helvetica',
      lineColor: [230, 230, 230],
      lineWidth: 0.1
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    },
    columnStyles: {
      0: { cellWidth: 'auto', halign: 'left' },
      1: { halign: 'center', cellWidth: 20 },
      2: { halign: 'right', cellWidth: 30 },
      3: { halign: 'right', fontStyle: 'bold', cellWidth: 30 }
    },
    margin: { left: margin, right: margin },
    tableLineColor: [200, 200, 200],
    tableLineWidth: 0.5
  });
  
  // Calculate final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY + 20;

  // Professional Totals Section (Prominent Display)
  const totalsBoxY = finalY;
  const totalsBoxX = pageWidth - margin - 80;
  const totalsBoxWidth = 80;
  
  // Totals section background
  doc.setFillColor(248, 250, 252);
  doc.rect(totalsBoxX, totalsBoxY, totalsBoxWidth, 50, 'F');
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1);
  doc.rect(totalsBoxX, totalsBoxY, totalsBoxWidth, 50, 'S');

  currentY = totalsBoxY + 12;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);

  doc.text('Subtotal:', totalsBoxX + 8, currentY);
  doc.text(`£${(quote.subtotal || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 8, currentY, { align: 'right' });
  currentY += 10;
  
  if (quote.settings?.vatRegistered) {
    doc.text(`VAT (${quote.settings.vatRate}%):`, totalsBoxX + 8, currentY);
    doc.text(`£${(quote.vatAmount || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 8, currentY, { align: 'right' });
    currentY += 10;
  }
  
  // Total line with emphasis
  doc.setLineWidth(0.5);
  doc.line(totalsBoxX + 8, currentY - 2, totalsBoxX + totalsBoxWidth - 8, currentY - 2);
  
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('TOTAL:', totalsBoxX + 8, currentY + 8);
  doc.text(`£${(quote.total || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 8, currentY + 8, { align: 'right' });
  
  currentY = totalsBoxY + 65;
  
  // Professional Footer Section
  const footerStartY = Math.max(currentY + 20, doc.internal.pageSize.height - 80);
  
  // Payment Information Section (Clean, Professional Layout)
  if (companyProfile?.payment_terms || (companyProfile?.bank_details && Object.keys(companyProfile.bank_details).length > 0)) {
    // Section header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PAYMENT INFORMATION', margin, footerStartY);
    
    const paymentY = footerStartY + 15;
    let leftBoxWidth = 85;
    let rightBoxWidth = 80;
    
    // Payment Terms Box
    if (companyProfile?.payment_terms) {
      doc.setFillColor(252, 252, 252);
      doc.rect(margin, paymentY, leftBoxWidth, 30, 'F');
      doc.setDrawColor(220, 220, 220);
      doc.rect(margin, paymentY, leftBoxWidth, 30, 'S');
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Payment Terms', margin + 5, paymentY + 10);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 40, 40);
      const paymentTermsLines = doc.splitTextToSize(companyProfile.payment_terms, leftBoxWidth - 10);
      doc.text(paymentTermsLines, margin + 5, paymentY + 18);
    }
    
    // Bank Details Box
    if (companyProfile?.bank_details && Object.keys(companyProfile.bank_details).length > 0) {
      const bankBoxX = margin + leftBoxWidth + 10;
      
      doc.setFillColor(252, 252, 252);
      doc.rect(bankBoxX, paymentY, rightBoxWidth, 30, 'F');
      doc.setDrawColor(220, 220, 220);
      doc.rect(bankBoxX, paymentY, rightBoxWidth, 30, 'S');
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text('Bank Details', bankBoxX + 5, paymentY + 10);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 40, 40);
      
      let bankY = paymentY + 18;
      if (companyProfile.bank_details.account_name) {
        doc.text(companyProfile.bank_details.account_name, bankBoxX + 5, bankY);
        bankY += 5;
      }
      if (companyProfile.bank_details.sort_code && companyProfile.bank_details.account_number) {
        doc.text(`${companyProfile.bank_details.sort_code} ${companyProfile.bank_details.account_number}`, bankBoxX + 5, bankY);
      }
    }
  }
  
  // Professional Footer Bar
  const footerBarY = doc.internal.pageSize.height - 35;
  doc.setFillColor(240, 240, 240);
  doc.rect(0, footerBarY, pageWidth, 35, 'F');
  
  // Compliance information
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('This quote is valid for 30 days from the date of issue', margin, footerBarY + 12);
  doc.text('All electrical work will comply with BS 7671:2018 (18th Edition) and Part P Building Regulations', margin, footerBarY + 22);
  
  // Generation info
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  const generatedText = `Generated on ${new Date().toLocaleDateString('en-GB')} by ${companyProfile?.company_name || 'Electrical Contractor'}`;
  doc.text(generatedText, margin, footerBarY + 30);
  
  // Save the PDF
  doc.save(`Quote-${quote.quoteNumber}.pdf`);
};