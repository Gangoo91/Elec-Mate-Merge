import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Quote } from '@/types/quote';

export const generateQuotePDF = (quote: Partial<Quote>) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(255, 215, 0); // Electric yellow
  doc.text('ELECTRICAL QUOTE', 20, 30);
  
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Quote Number: ${quote.quoteNumber}`, 20, 45);
  doc.text(`Date: ${quote.createdAt?.toLocaleDateString() || new Date().toLocaleDateString()}`, 20, 55);
  
  // Client Information
  doc.setFontSize(14);
  doc.text('CLIENT DETAILS', 20, 75);
  doc.setFontSize(10);
  doc.text(`${quote.client?.name}`, 20, 85);
  doc.text(`${quote.client?.email}`, 20, 95);
  doc.text(`${quote.client?.phone}`, 20, 105);
  doc.text(`${quote.client?.address}`, 20, 115);
  doc.text(`${quote.client?.postcode}`, 20, 125);
  
  // Quote Items Table
  const tableData = quote.items?.map(item => [
    item.description,
    item.quantity.toString(),
    `£${item.unitPrice.toFixed(2)}`,
    `£${item.totalPrice.toFixed(2)}`
  ]) || [];
  
  autoTable(doc, {
    startY: 140,
    head: [['Description', 'Qty', 'Unit Price', 'Total']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [255, 215, 0], textColor: [0, 0, 0] },
    styles: { fontSize: 10 },
  });
  
  // Calculate final Y position after table
  const finalY = (doc as any).lastAutoTable.finalY + 12;

  // Totals
  doc.setFontSize(12);
  const totalsX = 120;
  let currentY = finalY;

  doc.text('Subtotal:', totalsX, currentY);
  doc.text(`£${(quote.subtotal || 0).toFixed(2)}`, 170, currentY);
  currentY += 8;

  doc.text(`Overhead (${quote.settings?.overheadPercentage}%):`, totalsX, currentY);
  doc.text(`£${(quote.overhead || 0).toFixed(2)}`, 170, currentY);
  currentY += 8;

  doc.text(`Profit (${quote.settings?.profitMargin}%):`, totalsX, currentY);
  doc.text(`£${(quote.profit || 0).toFixed(2)}`, 170, currentY);
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