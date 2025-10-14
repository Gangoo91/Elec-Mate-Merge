import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { supabase } from '@/integrations/supabase/client';
import { Quote } from '@/types/quote';
import { format } from 'date-fns';

/**
 * Generate invoice PDF and upload to Supabase Storage
 * Returns public URL to PDF
 */
export async function generateAndUploadInvoicePDF(
  invoice: Quote,
  companyProfile: any
): Promise<string | null> {
  try {
    console.log('Starting PDF generation for invoice:', invoice.invoice_number);
    
    // 1. Generate PDF document
    const pdfDoc = generateInvoicePDFDoc(invoice, companyProfile);
    
    // 2. Convert to Blob
    const pdfBlob = pdfDoc.output('blob');
    console.log('PDF blob created, size:', pdfBlob.size, 'bytes');
    
    // 3. Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    
    // 4. Create filename: {user_id}/{invoice_number}.pdf
    const filename = `${user.id}/${invoice.invoice_number}.pdf`;
    console.log('Uploading to storage:', filename);
    
    // 5. Upload to Supabase Storage (upsert: replace if exists)
    const { data, error } = await supabase.storage
      .from('invoice-pdfs')
      .upload(filename, pdfBlob, {
        contentType: 'application/pdf',
        upsert: true, // Replace existing file
        cacheControl: '3600', // Cache for 1 hour
      });
    
    if (error) {
      console.error('Storage upload error:', error);
      throw error;
    }
    
    console.log('PDF uploaded successfully:', data);
    
    // 6. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('invoice-pdfs')
      .getPublicUrl(filename);
    
    console.log('Public URL:', publicUrl);
    return publicUrl;
    
  } catch (error) {
    console.error('Error generating/uploading PDF:', error);
    return null;
  }
}

/**
 * Generate invoice PDF document (in-browser)
 */
function generateInvoicePDFDoc(invoice: Quote, companyProfile: any): jsPDF {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;

  // === HEADER - Company Branding ===
  doc.setFillColor(30, 64, 175); // Professional blue
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text(companyProfile?.company_name || 'Your Company', pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text('INVOICE', pageWidth / 2, 28, { align: 'center' });
  
  doc.setFontSize(9);
  doc.text(`Invoice No: ${invoice.invoice_number}`, pageWidth / 2, 38, { align: 'center' });
  
  yPos = 55;
  
  // === COMPANY DETAILS (Left) ===
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  if (companyProfile?.company_address) {
    doc.text(companyProfile.company_address, 15, yPos);
    yPos += 5;
  }
  if (companyProfile?.company_phone) {
    doc.text(`Tel: ${companyProfile.company_phone}`, 15, yPos);
    yPos += 5;
  }
  if (companyProfile?.company_email) {
    doc.text(`Email: ${companyProfile.company_email}`, 15, yPos);
    yPos += 5;
  }
  
  yPos = 70; // Reset for client details
  
  // === CLIENT DETAILS (Left) ===
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('BILL TO:', 15, yPos);
  yPos += 6;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  
  if (invoice.client?.name) {
    doc.text(invoice.client.name, 15, yPos);
    yPos += 5;
  }
  if (invoice.client?.address) {
    doc.text(invoice.client.address, 15, yPos);
    yPos += 5;
  }
  if (invoice.client?.postcode) {
    doc.text(invoice.client.postcode, 15, yPos);
    yPos += 5;
  }
  
  // === INVOICE METADATA (Right) ===
  const rightX = pageWidth - 15;
  let rightY = 55;
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  const invoiceDate = invoice.invoice_date 
    ? format(new Date(invoice.invoice_date), 'dd/MM/yyyy')
    : format(new Date(), 'dd/MM/yyyy');
    
  const dueDate = invoice.invoice_due_date
    ? format(new Date(invoice.invoice_due_date), 'dd/MM/yyyy')
    : format(new Date(), 'dd/MM/yyyy');
  
  doc.text(`Invoice Date: ${invoiceDate}`, rightX, rightY, { align: 'right' });
  rightY += 5;
  doc.text(`Due Date: ${dueDate}`, rightX, rightY, { align: 'right' });
  rightY += 5;
  
  doc.setFont('helvetica', 'bold');
  const statusText = (invoice.invoice_status || 'draft').toUpperCase();
  doc.text(`Status: ${statusText}`, rightX, rightY, { align: 'right' });
  
  yPos = Math.max(yPos, rightY) + 10;
  
  // === ITEMS TABLE ===
  const items = invoice.items || [];
  const tableData = items.map(item => [
    item.description || 'Item',
    (item.quantity || 1).toString(),
    `£${(item.unitPrice || 0).toFixed(2)}`,
    `£${(item.totalPrice || 0).toFixed(2)}`
  ]);
  
  autoTable(doc, {
    startY: yPos,
    head: [['Description', 'Qty', 'Unit Price', 'Total']],
    body: tableData,
    theme: 'striped',
    headStyles: { 
      fillColor: [30, 64, 175], 
      fontSize: 9,
      fontStyle: 'bold',
    },
    styles: { 
      fontSize: 9,
      cellPadding: 4,
    },
    margin: { left: 15, right: 15 },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 30, halign: 'right' },
      3: { cellWidth: 30, halign: 'right' },
    },
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 12;
  
  // === TOTALS BOX ===
  const subtotal = invoice.subtotal || 0;
  const vatAmount = invoice.vatAmount || 0;
  const total = invoice.total || 0;
  
  const totalsX = pageWidth - 75;
  
  // Background box
  doc.setFillColor(248, 250, 252);
  doc.rect(totalsX, yPos, 60, 25, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  
  doc.text('Subtotal:', totalsX + 5, yPos + 8);
  doc.text(`£${subtotal.toFixed(2)}`, pageWidth - 20, yPos + 8, { align: 'right' });
  
  doc.text('VAT (20%):', totalsX + 5, yPos + 15);
  doc.text(`£${vatAmount.toFixed(2)}`, pageWidth - 20, yPos + 15, { align: 'right' });
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('TOTAL:', totalsX + 5, yPos + 23);
  doc.text(`£${total.toFixed(2)}`, pageWidth - 20, yPos + 23, { align: 'right' });
  
  yPos += 35;
  
  // === PAYMENT DETAILS ===
  if (companyProfile?.bank_details) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175);
    doc.text('PAYMENT DETAILS', 15, yPos);
    yPos += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    
    if (companyProfile.bank_details.accountName) {
      doc.text(`Account Name: ${companyProfile.bank_details.accountName}`, 15, yPos);
      yPos += 5;
    }
    if (companyProfile.bank_details.accountNumber) {
      doc.text(`Account Number: ${companyProfile.bank_details.accountNumber}`, 15, yPos);
      yPos += 5;
    }
    if (companyProfile.bank_details.sortCode) {
      doc.text(`Sort Code: ${companyProfile.bank_details.sortCode}`, 15, yPos);
      yPos += 5;
    }
    doc.text(`Reference: ${invoice.invoice_number}`, 15, yPos);
  }
  
  // === FOOTER ===
  const footerY = doc.internal.pageSize.height - 15;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Thank you for your business', pageWidth / 2, footerY, { align: 'center' });
  
  return doc;
}
