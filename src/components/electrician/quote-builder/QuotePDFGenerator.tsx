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
  
  // Set default font to Helvetica for better PDF compatibility
  doc.setFont('helvetica');
  
  let currentY = 20;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  
  // Extract colors from company profile (convert to RGB)
  const primaryColor = companyProfile?.primary_color ? 
    hexToRgb(companyProfile.primary_color) : [245, 158, 11]; // Electric yellow
  const secondaryColor = companyProfile?.secondary_color ? 
    hexToRgb(companyProfile.secondary_color) : [31, 41, 55]; // Dark grey
  
  // Compact Professional Header
  if (companyProfile && companyProfile.company_name) {
    // Thin header band for branding
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 4, 'F');
    
    currentY = 10;
    
    // Compact two-column header layout
    const leftColumnX = margin;
    const rightColumnX = pageWidth/2 + 5;
    const logoSize = 25;
    
    // Left column - Logo (larger and more prominent)
    if (companyProfile.logo_data_url) {
      try {
        doc.addImage(companyProfile.logo_data_url, 'PNG', leftColumnX, currentY, 35, 35);
      } catch (error) {
        console.warn('Could not add logo to PDF:', error);
        // Add company name as fallback
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(companyProfile.company_name, leftColumnX, currentY + 15);
      }
    } else {
      // Fallback: Display company name prominently
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(companyProfile.company_name, leftColumnX, currentY + 15);
    }
    
    // Right column - Compact Company Information
    let infoY = currentY + 2;
    
    // Company name (larger, more prominent)
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(companyProfile.company_name, rightColumnX, infoY, { align: 'left' });
    infoY += 8;
    
    // Contact details in readable format
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    if (companyProfile.company_address && companyProfile.company_postcode) {
      const fullAddress = `${companyProfile.company_address}, ${companyProfile.company_postcode}`;
      const addressLines = doc.splitTextToSize(fullAddress, pageWidth - rightColumnX - margin);
      doc.text(addressLines, rightColumnX, infoY);
      infoY += addressLines.length * 5;
    } else if (companyProfile.company_address) {
      const addressLines = doc.splitTextToSize(companyProfile.company_address, pageWidth - rightColumnX - margin);
      doc.text(addressLines, rightColumnX, infoY);
      infoY += addressLines.length * 5;
    }
    
    if (companyProfile.company_phone || companyProfile.company_email) {
      const contactLine = [
        companyProfile.company_phone ? `T: ${companyProfile.company_phone}` : '',
        companyProfile.company_email ? `E: ${companyProfile.company_email}` : ''
      ].filter(Boolean).join(' | ');
      
      if (contactLine) {
        doc.text(contactLine, rightColumnX, infoY);
        infoY += 5;
      }
    }
    
    if (companyProfile.company_website) {
      doc.text(`W: ${companyProfile.company_website}`, rightColumnX, infoY);
      infoY += 5;
    }
    
    // Registration details with better font size
    if (companyProfile.vat_number || companyProfile.company_registration) {
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const regDetails = [
        companyProfile.company_registration ? `Reg: ${companyProfile.company_registration}` : '',
        companyProfile.vat_number ? `VAT: ${companyProfile.vat_number}` : ''
      ].filter(Boolean).join(' | ');
      
      if (regDetails) {
        doc.text(regDetails, rightColumnX, infoY);
        infoY += 5;
      }
    }
    
    currentY = Math.max(currentY + 35 + 8, infoY + 5);
  } else {
    // Fallback header if no company profile
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('ELECTRICAL CONTRACTOR', margin, currentY + 10);
    currentY += 20;
  }
  
  currentY += 3;
  
  // Compact Quote Information Header
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(margin, currentY, pageWidth - (2 * margin), 12, 'F');
  
  // Quote title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('ELECTRICAL QUOTE', margin + 3, currentY + 8);
  
  // Quote details on right side
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const quoteDetails = `Quote No: ${quote.quoteNumber} | Date: ${quote.createdAt?.toLocaleDateString('en-GB') || new Date().toLocaleDateString('en-GB')}`;
  doc.text(quoteDetails, pageWidth - margin - 3, currentY + 8, { align: 'right' });
  
  currentY += 18;
  
  // Compact Client and Job Details - Side by Side Layout
  const leftColX = margin;
  const rightColX = pageWidth/2 + 2;
  const colWidth = (pageWidth/2) - margin - 2;
  
  // Client Details - More readable
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('CLIENT DETAILS', leftColX, currentY);
  
  let clientY = currentY + 8;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  
  if (quote.client?.name) {
    doc.text(quote.client.name, leftColX, clientY);
    clientY += 5;
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
  
  // Job Details - More readable (right side)
  if (quote.jobDetails) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('JOB DETAILS', rightColX, currentY);
    
    let jobY = currentY + 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    
    if (quote.jobDetails.title) {
      const titleLines = doc.splitTextToSize(`Job: ${quote.jobDetails.title}`, colWidth);
      doc.text(titleLines, rightColX, jobY);
      jobY += titleLines.length * 5;
    }
    
    if (quote.jobDetails.location) {
      const locationLines = doc.splitTextToSize(`Location: ${quote.jobDetails.location}`, colWidth);
      doc.text(locationLines, rightColX, jobY);
      jobY += locationLines.length * 5;
    }
    
    if (quote.jobDetails.estimatedDuration) {
      const duration = quote.jobDetails.estimatedDuration === "Other" ? 
        quote.jobDetails.customDuration || "Custom duration" : 
        quote.jobDetails.estimatedDuration;
      doc.text(`Duration: ${duration}`, rightColX, jobY);
      jobY += 5;
    }
    
    if (quote.jobDetails.workStartDate) {
      doc.text(`Start: ${new Date(quote.jobDetails.workStartDate).toLocaleDateString('en-GB')}`, rightColX, jobY);
      jobY += 5;
    }
    
    clientY = Math.max(clientY, jobY);
  }
  
  currentY = clientY + 5;
  
  // Project description with better readability
  if (quote.jobDetails?.description) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PROJECT DESCRIPTION', margin, currentY);
    currentY += 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    const descriptionLines = doc.splitTextToSize(quote.jobDetails.description, pageWidth - (2 * margin));
    doc.text(descriptionLines, margin, currentY);
    currentY += (descriptionLines.length * 5) + 5;
  }
  
  // Special Requirements with better readability
  if (quote.jobDetails?.specialRequirements) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('SPECIAL REQUIREMENTS', margin, currentY);
    currentY += 8;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    const requirementsLines = doc.splitTextToSize(quote.jobDetails.specialRequirements, pageWidth - (2 * margin));
    doc.text(requirementsLines, margin, currentY);
    currentY += (requirementsLines.length * 5) + 5;
  }
  
  currentY += 5;
  
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
      fontSize: 12,
      fontStyle: 'bold'
    },
    styles: { 
      fontSize: 11,
      cellPadding: 4,
      font: 'helvetica'
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248]
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { halign: 'center', cellWidth: 15 },
      2: { halign: 'right', cellWidth: 25 },
      3: { halign: 'right', fontStyle: 'bold', cellWidth: 25 }
    },
    margin: { left: margin, right: margin }
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
  doc.setFontSize(13);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(0, 0, 0);

  doc.text('Subtotal:', totalsBoxX + 5, currentY);
  doc.text(`£${(quote.subtotal || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 15, currentY, { align: 'right' });
  currentY += 8;
  
  if (quote.settings?.vatRegistered) {
    doc.text(`VAT (${quote.settings.vatRate}%):`, totalsBoxX + 5, currentY);
    doc.text(`£${(quote.vatAmount || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 15, currentY, { align: 'right' });
    currentY += 8;
  }
  
  // Total with primary color background
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(totalsBoxX, currentY - 3, totalsBoxWidth, 15, 'F');
  
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL:', totalsBoxX + 5, currentY + 7);
  doc.text(`£${(quote.total || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 15, currentY + 7, { align: 'right' });
  
  currentY = totalsBoxY + 45;
  
  // Professional Footer Section
  const footerStartY = Math.max(currentY + 15, doc.internal.pageSize.height - 60);
  
  // Payment Terms Section
  if (companyProfile?.payment_terms) {
    doc.setFillColor(248, 248, 248);
    doc.rect(20, footerStartY, 85, 25, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.rect(20, footerStartY, 85, 25, 'S');
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PAYMENT TERMS', 25, footerStartY + 8);
    
    doc.setFontSize(11);
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
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('PAYMENT DETAILS', 115, footerStartY + 8);
    
    doc.setFontSize(11);
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
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('Quote valid for 30 days | All work complies with BS 7671:2018 | Part P Building Regulations', 20, footerY + 5);
  doc.text(`Generated on ${new Date().toLocaleDateString('en-GB')} | ${companyProfile?.company_name || 'Your Company'}`, 20, footerY + 12);
  
  // Save the PDF
  doc.save(`Quote-${quote.quoteNumber}.pdf`);
};