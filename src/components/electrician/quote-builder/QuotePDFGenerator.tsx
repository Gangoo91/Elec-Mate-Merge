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
  
  // Clean Minimal Header Section
  if (companyProfile && companyProfile.company_name) {
    const headerHeight = 50;
    
    // Company logo (left aligned, clean)
    if (companyProfile.logo_data_url) {
      try {
        doc.addImage(companyProfile.logo_data_url, 'PNG', margin, currentY, 30, 30);
      } catch (error) {
        console.warn('Could not add logo to PDF:', error);
      }
    }
    
    // Company information (right side, clean layout)
    const companyInfoX = margin + 40;
    let companyY = currentY + 8;
    
    // Company name (prominent but clean)
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text(companyProfile.company_name, companyInfoX, companyY);
    companyY += 8;
    
    // Contact information (minimal formatting)
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    
    const contactInfo = [];
    if (companyProfile.company_phone) contactInfo.push(companyProfile.company_phone);
    if (companyProfile.company_email) contactInfo.push(companyProfile.company_email);
    if (companyProfile.company_website) contactInfo.push(companyProfile.company_website);
    
    if (contactInfo.length > 0) {
      doc.text(contactInfo.join(' • '), companyInfoX, companyY);
      companyY += 6;
    }
    
    if (companyProfile.company_address) {
      const addressText = companyProfile.company_postcode ? 
        `${companyProfile.company_address}, ${companyProfile.company_postcode}` : 
        companyProfile.company_address;
      doc.text(addressText, companyInfoX, companyY);
    }
    
    currentY = headerHeight + 15;
  } else {
    // Fallback header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text('ELECTRICAL CONTRACTOR', margin, currentY);
    currentY += 20;
  }
  
  // Minimal Quote Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('QUOTATION', margin, currentY);
  
  // Quote details (simple, right aligned)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  const quoteNumber = quote.quoteNumber || 'Q001';
  const quoteDate = quote.createdAt?.toLocaleDateString('en-GB') || new Date().toLocaleDateString('en-GB');
  doc.text(`${quoteNumber} • ${quoteDate}`, pageWidth - margin, currentY, { align: 'right' });
  
  // Simple separator line
  currentY += 15;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(margin, currentY, pageWidth - margin, currentY);
  
  currentY += 20;
  
  // Clean Two-Column Layout (No boxes)
  const leftColX = margin;
  const rightColX = pageWidth/2 + 10;
  const colWidth = (pageWidth/2) - margin - 15;
  
  // Client Details Section (Clean)
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('CLIENT DETAILS', leftColX, currentY);
  
  let clientY = currentY + 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  
  if (quote.client?.name) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 40, 40);
    doc.text(quote.client.name, leftColX, clientY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    clientY += 6;
  }
  if (quote.client?.email) {
    doc.text(quote.client.email, leftColX, clientY);
    clientY += 5;
  }
  if (quote.client?.phone) {
    doc.text(quote.client.phone, leftColX, clientY);
    clientY += 5;
  }
  if (quote.client?.address) {
    const addressText = quote.client.postcode ? 
      `${quote.client.address}, ${quote.client.postcode}` : 
      quote.client.address;
    const addressLines = doc.splitTextToSize(addressText, colWidth);
    doc.text(addressLines, leftColX, clientY);
    clientY += addressLines.length * 5;
  } else if (quote.client?.postcode) {
    doc.text(quote.client.postcode, leftColX, clientY);
    clientY += 5;
  }
  
  // Job Details Section (Clean, right side)
  if (quote.jobDetails) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('JOB DETAILS', rightColX, currentY);
    
    let jobY = currentY + 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    
    if (quote.jobDetails.title) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(40, 40, 40);
      const titleLines = doc.splitTextToSize(quote.jobDetails.title, colWidth);
      doc.text(titleLines, rightColX, jobY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      jobY += titleLines.length * 6;
    }
    
    if (quote.jobDetails.location) {
      doc.text(`Location: ${quote.jobDetails.location}`, rightColX, jobY);
      jobY += 5;
    }
    
    if (quote.jobDetails.estimatedDuration) {
      const duration = quote.jobDetails.estimatedDuration === "Other" ? 
        quote.jobDetails.customDuration || "Custom duration" : 
        quote.jobDetails.estimatedDuration;
      doc.text(`Duration: ${duration}`, rightColX, jobY);
      jobY += 5;
    }
    
    if (quote.jobDetails.workStartDate) {
      doc.text(`Start Date: ${new Date(quote.jobDetails.workStartDate).toLocaleDateString('en-GB')}`, rightColX, jobY);
      jobY += 5;
    }
  }
  
  currentY += Math.max(clientY - currentY, 35) + 20;
  
  // Project Description Section (Clean)
  if (quote.jobDetails?.description) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PROJECT DESCRIPTION', margin, currentY);
    currentY += 10;
    
    // Clean description without background
    const descriptionLines = doc.splitTextToSize(quote.jobDetails.description, pageWidth - (2 * margin));
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(descriptionLines, margin, currentY);
    currentY += (descriptionLines.length * 6) + 15;
  }
  
  // Special Requirements Section (Clean)
  if (quote.jobDetails?.specialRequirements) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('SPECIAL REQUIREMENTS', margin, currentY);
    currentY += 10;
    
    // Clean requirements without background
    const requirementsLines = doc.splitTextToSize(quote.jobDetails.specialRequirements, pageWidth - (2 * margin));
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(requirementsLines, margin, currentY);
    currentY += (requirementsLines.length * 6) + 15;
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
    theme: 'plain',
    headStyles: { 
      fillColor: [255, 255, 255], 
      textColor: [40, 40, 40],
      fontSize: 12,
      fontStyle: 'bold',
      halign: 'left'
    },
    styles: { 
      fontSize: 11,
      cellPadding: 8,
      font: 'helvetica',
      lineColor: [220, 220, 220],
      lineWidth: 0.5,
      textColor: [60, 60, 60]
    },
    columnStyles: {
      0: { cellWidth: 'auto', halign: 'left' },
      1: { halign: 'center', cellWidth: 20 },
      2: { halign: 'right', cellWidth: 30 },
      3: { halign: 'right', fontStyle: 'bold', cellWidth: 30, textColor: [40, 40, 40] }
    },
    margin: { left: margin, right: margin },
    tableLineColor: [220, 220, 220],
    tableLineWidth: 0.5
  });
  
  // Calculate final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY + 20;

  // Clean Totals Section (Right aligned, no boxes)
  const totalsBoxY = finalY + 10;
  const totalsBoxX = pageWidth - margin - 70;
  const totalsBoxWidth = 70;

  currentY = totalsBoxY;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);

  doc.text('Subtotal:', totalsBoxX, currentY);
  doc.text(`£${(quote.subtotal || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth, currentY, { align: 'right' });
  currentY += 8;
  
  if (quote.settings?.vatRegistered) {
    doc.text(`VAT (${quote.settings.vatRate}%):`, totalsBoxX, currentY);
    doc.text(`£${(quote.vatAmount || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth, currentY, { align: 'right' });
    currentY += 8;
  }
  
  // Simple separator line
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.5);
  doc.line(totalsBoxX, currentY + 2, totalsBoxX + totalsBoxWidth, currentY + 2);
  currentY += 8;
  
  // Total - clean and prominent
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(40, 40, 40);
  doc.text('TOTAL:', totalsBoxX, currentY);
  doc.text(`£${(quote.total || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth, currentY, { align: 'right' });
  
  currentY = totalsBoxY + 65;
  
  // Clean Footer Section
  const footerStartY = Math.max(currentY + 30, doc.internal.pageSize.height - 60);
  
  // Payment Information Section (Clean layout)
  if (companyProfile?.payment_terms || (companyProfile?.bank_details && Object.keys(companyProfile.bank_details).length > 0)) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PAYMENT INFORMATION', margin, footerStartY);
    
    const paymentY = footerStartY + 8;
    const leftColWidth = 90;
    const rightColWidth = 80;
    
    // Payment Terms (Clean)
    if (companyProfile?.payment_terms) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(60, 60, 60);
      doc.text('Payment Terms', margin, paymentY);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      const paymentTermsLines = doc.splitTextToSize(companyProfile.payment_terms, leftColWidth);
      doc.text(paymentTermsLines, margin, paymentY + 6);
    }
    
    // Bank Details (Clean)
    if (companyProfile?.bank_details && Object.keys(companyProfile.bank_details).length > 0) {
      const bankBoxX = margin + leftColWidth + 15;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(60, 60, 60);
      doc.text('Bank Details', bankBoxX, paymentY);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(80, 80, 80);
      
      let bankY = paymentY + 6;
      if (companyProfile.bank_details.account_name) {
        doc.text(companyProfile.bank_details.account_name, bankBoxX, bankY);
        bankY += 4;
      }
      if (companyProfile.bank_details.sort_code && companyProfile.bank_details.account_number) {
        doc.text(`${companyProfile.bank_details.sort_code} ${companyProfile.bank_details.account_number}`, bankBoxX, bankY);
      }
    }
  }
  
  // Clean Footer
  const footerBarY = doc.internal.pageSize.height - 25;
  
  // Compliance information (simplified)
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('This quote is valid for 30 days. All work complies with BS 7671:2018 (18th Edition) and Part P regulations.', margin, footerBarY);
  
  // Save the PDF
  doc.save(`Quote-${quote.quoteNumber}.pdf`);
};