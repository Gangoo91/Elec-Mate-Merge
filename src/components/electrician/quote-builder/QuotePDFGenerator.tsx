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

// Helper function to add professional typography
const setFont = (doc: jsPDF, size: number, style: 'normal' | 'bold' = 'normal') => {
  // Use Open Sans as primary font with fallback to system fonts
  doc.setFont('helvetica', style);
  doc.setFontSize(size);
};

// Helper function to add a section separator line with enhanced styling
const addSectionSeparator = (doc: jsPDF, y: number, color: [number, number, number]) => {
  doc.setDrawColor(color[0], color[1], color[2]);
  doc.setLineWidth(1);
  doc.line(20, y, 190, y);
  return y + 12;
};

// Helper function to create professional section headers
const addSectionHeader = (doc: jsPDF, title: string, y: number, primaryColor: [number, number, number]) => {
  setFont(doc, 14, 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(title, 20, y);
  return y + 8;
};

// Helper function to create a styled table for client/job details with enhanced design
const createInfoTable = (doc: jsPDF, data: Array<[string, string]>, startY: number, primaryColor: [number, number, number], secondaryColor: [number, number, number]) => {
  autoTable(doc, {
    startY: startY,
    body: data,
    theme: 'grid',
    styles: {
      fontSize: 10,
      cellPadding: 6,
      lineColor: [220, 220, 220],
      lineWidth: 0.5,
      font: 'helvetica',
    },
    columnStyles: {
      0: { 
        fontStyle: 'bold', 
        fillColor: [primaryColor[0] * 0.05, primaryColor[1] * 0.05, primaryColor[2] * 0.05],
        textColor: [60, 60, 60],
        cellWidth: 60 
      },
      1: { 
        cellWidth: 'auto',
        textColor: [40, 40, 40]
      }
    },
    margin: { left: 20, right: 100 },
    tableWidth: 'wrap'
  });
  return (doc as any).lastAutoTable.finalY + 18;
};

// Helper function to create grid-based layout for details sections
const createGridLayout = (doc: jsPDF, leftData: Array<[string, string]>, rightData: Array<[string, string]>, startY: number, primaryColor: [number, number, number], secondaryColor: [number, number, number]) => {
  const leftWidth = 85;
  const rightWidth = 85;
  const spacing = 10;
  
  // Left column
  if (leftData.length > 0) {
    autoTable(doc, {
      startY: startY,
      body: leftData,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 6,
        lineColor: [220, 220, 220],
        lineWidth: 0.5,
        font: 'helvetica',
      },
      columnStyles: {
        0: { 
          fontStyle: 'bold', 
          fillColor: [primaryColor[0] * 0.05, primaryColor[1] * 0.05, primaryColor[2] * 0.05],
          textColor: [60, 60, 60],
          cellWidth: 25 
        },
        1: { 
          cellWidth: 60,
          textColor: [40, 40, 40]
        }
      },
      margin: { left: 20, right: 105 },
      tableWidth: leftWidth
    });
  }
  
  // Right column
  if (rightData.length > 0) {
    autoTable(doc, {
      startY: startY,
      body: rightData,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 6,
        lineColor: [220, 220, 220],
        lineWidth: 0.5,
        font: 'helvetica',
      },
      columnStyles: {
        0: { 
          fontStyle: 'bold', 
          fillColor: [primaryColor[0] * 0.05, primaryColor[1] * 0.05, primaryColor[2] * 0.05],
          textColor: [60, 60, 60],
          cellWidth: 25 
        },
        1: { 
          cellWidth: 60,
          textColor: [40, 40, 40]
        }
      },
      margin: { left: 115, right: 20 },
      tableWidth: rightWidth
    });
  }
  
  const leftFinalY = leftData.length > 0 ? (doc as any).lastAutoTable.finalY : startY;
  const rightFinalY = rightData.length > 0 ? (doc as any).lastAutoTable.finalY : startY;
  
  return Math.max(leftFinalY, rightFinalY) + 18;
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
  // Add elegant header band with gradient effect simulation
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, pageWidth, 15, 'F');
  
  // Add subtle shadow effect
  doc.setFillColor(primaryColor[0] * 0.8, primaryColor[1] * 0.8, primaryColor[2] * 0.8);
  doc.rect(0, 15, pageWidth, 2, 'F');
  
  currentY = 30;
  
  // Company Logo (top-left, optimally positioned and scaled)
  let logoHeight = 40;
  if (companyProfile?.logo_data_url) {
    try {
      // Better logo positioning with proper aspect ratio maintenance
      doc.addImage(companyProfile.logo_data_url, 'JPEG', 20, currentY, 55, logoHeight);
    } catch (error) {
      console.warn('Could not add logo to PDF:', error);
      logoHeight = 0;
    }
  } else {
    logoHeight = 0;
  }
  
  // Enhanced quote header info box (top-right)
  const headerRightX = pageWidth - 85;
  const boxWidth = 75;
  const boxHeight = 50;
  
  // Professional quote info box with shadow effect
  doc.setFillColor(250, 250, 250);
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1.5);
  doc.roundedRect(headerRightX - 10, currentY, boxWidth, boxHeight, 4, 4, 'FD');
  
  // Main QUOTE title
  setFont(doc, 22, 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('QUOTE', headerRightX + (boxWidth/2) - 10, currentY + 15, { align: 'center' });
  
  // Quote details with better typography
  setFont(doc, 10, 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`No: ${quote.quoteNumber || 'QT-001'}`, headerRightX + (boxWidth/2) - 10, currentY + 28, { align: 'center' });
  doc.text(`Date: ${quote.createdAt?.toLocaleDateString() || new Date().toLocaleDateString()}`, headerRightX + (boxWidth/2) - 10, currentY + 38, { align: 'center' });
  
  currentY = Math.max(currentY + logoHeight + 20, currentY + 60);
  
  // Enhanced Company Name and Details section
  if (companyProfile) {
    setFont(doc, 20, 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(companyProfile.company_name, 20, currentY);
    currentY += 15;
    
    // Company details with improved typography
    setFont(doc, 10, 'normal');
    doc.setTextColor(70, 70, 70);
    
    // Enhanced address and contact layout
    if (companyProfile.company_address) {
      doc.text(companyProfile.company_address, 20, currentY);
      currentY += 6;
    }
    if (companyProfile.company_postcode) {
      doc.text(companyProfile.company_postcode, 20, currentY);
      currentY += 8;
    }
    
    // Professional contact info grid layout
    const leftColX = 20;
    const rightColX = 130;
    let contactY = currentY;
    
    if (companyProfile.company_phone) {
      setFont(doc, 9, 'normal');
      doc.setTextColor(90, 90, 90);
      doc.text('Tel:', leftColX, contactY);
      doc.setTextColor(60, 60, 60);
      doc.text(companyProfile.company_phone, leftColX + 15, contactY);
      contactY += 6;
    }
    if (companyProfile.company_email) {
      setFont(doc, 9, 'normal');
      doc.setTextColor(90, 90, 90);
      doc.text('Email:', leftColX, contactY);
      doc.setTextColor(60, 60, 60);
      doc.text(companyProfile.company_email, leftColX + 20, contactY);
    }
    
    contactY = currentY;
    if (companyProfile.vat_number) {
      setFont(doc, 9, 'normal');
      doc.setTextColor(90, 90, 90);
      doc.text('VAT:', rightColX, contactY);
      doc.setTextColor(60, 60, 60);
      doc.text(companyProfile.vat_number, rightColX + 15, contactY);
      contactY += 6;
    }
    if (companyProfile.company_registration) {
      setFont(doc, 9, 'normal');
      doc.setTextColor(90, 90, 90);
      doc.text('Reg:', rightColX, contactY);
      doc.setTextColor(60, 60, 60);
      doc.text(companyProfile.company_registration, rightColX + 15, contactY);
    }
    
    currentY += 25;
  }
  
  // Section separator
  currentY = addSectionSeparator(doc, currentY, secondaryColor);
  
  // === CLIENT & JOB DETAILS GRID SECTION ===
  currentY = addSectionHeader(doc, 'CLIENT & JOB DETAILS', currentY, primaryColor);
  
  // Prepare client data
  const clientData: Array<[string, string]> = [];
  if (quote.client?.name) clientData.push(['Name', quote.client.name]);
  if (quote.client?.email) clientData.push(['Email', quote.client.email]);
  if (quote.client?.phone) clientData.push(['Phone', quote.client.phone]);
  if (quote.client?.address) clientData.push(['Address', quote.client.address]);
  if (quote.client?.postcode) clientData.push(['Postcode', quote.client.postcode]);
  
  // Prepare job data
  const jobData: Array<[string, string]> = [];
  if (quote.jobDetails) {
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
  }
  
  // Create grid-based layout for client and job details
  if (clientData.length > 0 || jobData.length > 0) {
    currentY = createGridLayout(doc, clientData, jobData, currentY, primaryColor, secondaryColor);
  } else {
    currentY += 15;
  }
  
  // === QUOTE ITEMS SECTION ===
  currentY = addSectionHeader(doc, 'QUOTE ITEMS', currentY, primaryColor);
  
  // Enhanced Quote Items Table with better styling
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
      fontStyle: 'bold',
      halign: 'center'
    },
    alternateRowStyles: {
      fillColor: [secondaryColor[0] * 0.1, secondaryColor[1] * 0.1, secondaryColor[2] * 0.1]
    },
    styles: { 
      fontSize: 10,
      cellPadding: 8,
      lineColor: [primaryColor[0] * 0.3, primaryColor[1] * 0.3, primaryColor[2] * 0.3],
      lineWidth: 0.75,
      font: 'helvetica'
    },
    columnStyles: {
      0: { cellWidth: 85, halign: 'left' }, // Description - wider for better readability
      1: { cellWidth: 25, halign: 'center' }, // Qty
      2: { cellWidth: 35, halign: 'right' }, // Unit Price
      3: { cellWidth: 35, halign: 'right', fontStyle: 'bold' }, // Total - bold for emphasis
    },
    margin: { left: 20, right: 20 }
  });
  
  // Calculate final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  currentY = finalY;

  // === ENHANCED TOTALS SECTION ===
  // Create a premium styled totals box
  const totalsBoxX = pageWidth - 120;
  const totalsBoxY = currentY;
  const totalsBoxWidth = 100;
  let totalsBoxHeight = 55;
  
  // Adjust height based on VAT
  if (quote.settings?.vatRegistered) {
    totalsBoxHeight += 12;
  }
  
  // Draw sophisticated totals box with shadow effect
  doc.setFillColor(250, 250, 250);
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1.5);
  doc.roundedRect(totalsBoxX, totalsBoxY, totalsBoxWidth, totalsBoxHeight, 5, 5, 'FD');
  
  // Add subtle inner shadow effect
  doc.setDrawColor(primaryColor[0] * 0.7, primaryColor[1] * 0.7, primaryColor[2] * 0.7);
  doc.setLineWidth(0.5);
  doc.roundedRect(totalsBoxX + 1, totalsBoxY + 1, totalsBoxWidth - 2, totalsBoxHeight - 2, 4, 4, 'S');
  
  let totalsY = totalsBoxY + 15;
  
  // Subtotal with enhanced typography
  setFont(doc, 11, 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text('Subtotal:', totalsBoxX + 8, totalsY);
  doc.text(`£${(quote.subtotal || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 8, totalsY, { align: 'right' });
  totalsY += 10;
  
  // VAT with enhanced styling
  if (quote.settings?.vatRegistered) {
    doc.text(`VAT (${quote.settings.vatRate}%):`, totalsBoxX + 8, totalsY);
    doc.text(`£${(quote.vatAmount || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 8, totalsY, { align: 'right' });
    totalsY += 10;
  }
  
  // Professional separator line
  doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setLineWidth(1);
  doc.line(totalsBoxX + 8, totalsY - 2, totalsBoxX + totalsBoxWidth - 8, totalsY - 2);
  
  // Total with premium styling and secondary color background
  doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.roundedRect(totalsBoxX + 3, totalsY, totalsBoxWidth - 6, 18, 3, 3, 'F');
  
  setFont(doc, 16, 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL:', totalsBoxX + 8, totalsY + 12);
  doc.text(`£${(quote.total || 0).toFixed(2)}`, totalsBoxX + totalsBoxWidth - 8, totalsY + 12, { align: 'right' });
  
  currentY = totalsBoxY + totalsBoxHeight + 30;
  
  // === ENHANCED PAYMENT TERMS SECTION ===
  if (companyProfile?.payment_terms) {
    currentY = addSectionSeparator(doc, currentY, secondaryColor);
    
    currentY = addSectionHeader(doc, 'PAYMENT TERMS', currentY, primaryColor);
    
    setFont(doc, 10, 'normal');
    doc.setTextColor(50, 50, 50);
    const paymentTermsLines = doc.splitTextToSize(companyProfile.payment_terms, 170);
    doc.text(paymentTermsLines, 20, currentY);
    currentY += (paymentTermsLines.length * 6) + 18;
  }
  
  // === ENHANCED BANK DETAILS SECTION ===
  if (companyProfile?.bank_details && Object.keys(companyProfile.bank_details).length > 0) {
    currentY = addSectionSeparator(doc, currentY, secondaryColor);
    
    currentY = addSectionHeader(doc, 'PAYMENT INFORMATION', currentY, primaryColor);
    
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
      currentY = createInfoTable(doc, bankData, currentY, primaryColor, secondaryColor);
    }
  }
  
  // === ENHANCED PROFESSIONAL FOOTER ===
  const footerY = pageHeight - 30;
  
  // Elegant footer separator
  addSectionSeparator(doc, footerY - 15, secondaryColor);
  
  // Enhanced footer text with better formatting
  setFont(doc, 9, 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text('This quote is valid for 30 days from the date of issue.', 20, footerY);
  doc.text('All work will be carried out in accordance with BS 7671:2018 regulations.', 20, footerY + 8);
  
  // Professional page numbering
  setFont(doc, 8, 'normal');
  doc.setTextColor(140, 140, 140);
  doc.text(`Page 1 of 1`, pageWidth - 20, footerY, { align: 'right' });
  
  // Company summary in footer if space permits
  if (companyProfile && footerY > 50) {
    setFont(doc, 8, 'normal');
    doc.setTextColor(160, 160, 160);
    const footerCompanyText = `${companyProfile.company_name}${companyProfile.company_phone ? ' • ' + companyProfile.company_phone : ''}${companyProfile.company_email ? ' • ' + companyProfile.company_email : ''}`;
    doc.text(footerCompanyText, pageWidth / 2, footerY + 16, { align: 'center' });
  }
  
  // Save the PDF
  doc.save(`Quote-${quote.quoteNumber || 'QT-001'}.pdf`);
};