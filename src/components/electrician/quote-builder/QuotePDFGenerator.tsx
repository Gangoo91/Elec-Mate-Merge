import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Quote } from '@/types/quote';
import { CompanyProfile } from '@/types/company';

export const generateQuotePDF = (quote: Partial<Quote>, companyProfile?: CompanyProfile) => {
  const doc = new jsPDF();
  
  let currentY = 20;
  
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
    doc.setTextColor(0, 0, 0);
    doc.text(companyProfile.company_name, 20, currentY);
    currentY += 8;
    
    doc.setFontSize(10);
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
    if (companyProfile.vat_number) {
      doc.text(`VAT No: ${companyProfile.vat_number}`, 20, currentY);
      currentY += 6;
    }
    currentY += 10;
  }
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(255, 215, 0); // Electric yellow
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
    headStyles: { fillColor: [255, 215, 0], textColor: [0, 0, 0] },
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
  
  // Footer
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('This quote is valid for 30 days from the date of issue.', 20, doc.internal.pageSize.height - 30);
  doc.text('All work will be carried out in accordance with BS 7671:2018 regulations.', 20, doc.internal.pageSize.height - 20);
  
  // Save the PDF
  doc.save(`Quote-${quote.quoteNumber}.pdf`);
};