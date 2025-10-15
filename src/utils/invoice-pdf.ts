import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { Invoice, InvoiceItem } from "@/types/invoice";

export function generateInvoicePDF(invoice: Invoice, companyProfile?: any): jsPDF {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;

  // Header - Professional Blue
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  const companyName = companyProfile?.company_name || "Your Company";
  doc.text(companyName, pageWidth / 2, 15, { align: "center" });
  
  doc.setFontSize(14);
  doc.text("INVOICE", pageWidth / 2, 25, { align: "center" });
  
  doc.setFontSize(9);
  const invoiceDate = invoice.invoice_date ? format(new Date(invoice.invoice_date), "dd MMMM yyyy") : format(new Date(), "dd MMMM yyyy");
  doc.text(`Invoice Date: ${invoiceDate}`, pageWidth / 2, 35, { align: "center" });

  yPos = 55;

  // Invoice Details - Two Columns
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  
  // Left Column - Client Details
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE TO:", 15, yPos);
  yPos += 6;

  doc.setFont("helvetica", "normal");
  doc.text(invoice.client?.name || "Client Name", 15, yPos);
  yPos += 5;
  if (invoice.client?.email) {
    doc.text(invoice.client.email, 15, yPos);
    yPos += 5;
  }
  if (invoice.client?.phone) {
    doc.text(invoice.client.phone, 15, yPos);
    yPos += 5;
  }
  
  // Right Column - Invoice Details
  const rightX = pageWidth - 70;
  let rightY = 55;
  
  doc.setFont("helvetica", "bold");
  doc.text("Invoice #:", rightX, rightY);
  doc.setFont("helvetica", "normal");
  doc.text(invoice.invoice_number || "INV-DRAFT", rightX + 25, rightY, { align: "left" });
  rightY += 5;
  
  if (invoice.invoice_due_date) {
    doc.setFont("helvetica", "bold");
    doc.text("Due Date:", rightX, rightY);
    doc.setFont("helvetica", "normal");
    doc.text(format(new Date(invoice.invoice_due_date), "dd MMM yyyy"), rightX + 25, rightY, { align: "left" });
    rightY += 5;
  }
  
  if (invoice.purchase_order) {
    doc.setFont("helvetica", "bold");
    doc.text("PO Number:", rightX, rightY);
    doc.setFont("helvetica", "normal");
    doc.text(invoice.purchase_order, rightX + 25, rightY, { align: "left" });
    rightY += 5;
  }

  yPos = Math.max(yPos, rightY) + 10;

  // Project Details
  if (invoice.jobDetails?.title) {
    doc.setFont("helvetica", "bold");
    doc.text("PROJECT:", 15, yPos);
    yPos += 5;
    doc.setFont("helvetica", "normal");
    doc.text(invoice.jobDetails.title, 15, yPos);
    yPos += 5;
  }
  
  if (invoice.jobDetails?.location) {
    doc.text(`Location: ${invoice.jobDetails.location}`, 15, yPos);
    yPos += 5;
  }

  if (invoice.work_completion_date) {
    doc.text(`Work Completed: ${format(new Date(invoice.work_completion_date), "dd MMMM yyyy")}`, 15, yPos);
    yPos += 5;
  }

  yPos += 10;

  // Items Table
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice Items", 15, yPos);
  yPos += 8;

  // Merge all items (original + additional)
  const allItems = [
    ...(invoice.items || []),
    ...(invoice.additional_invoice_items || [])
  ];

  const itemsData = allItems.map((item: InvoiceItem) => {
    const qty = item.actualQuantity !== undefined ? item.actualQuantity : item.quantity;
    const totalPrice = qty * item.unitPrice;
    
    return [
      item.description,
      qty.toString(),
      item.unit || "ea",
      `£${item.unitPrice.toFixed(2)}`,
      `£${totalPrice.toFixed(2)}`
    ];
  });

  const itemsSubtotal = allItems.reduce((sum, item) => {
    const qty = item.actualQuantity !== undefined ? item.actualQuantity : item.quantity;
    return sum + (qty * item.unitPrice);
  }, 0);

  autoTable(doc, {
    startY: yPos,
    head: [["Description", "Qty", "Unit", "Unit Price", "Total"]],
    body: itemsData,
    foot: [["Items Subtotal", "", "", "", `£${itemsSubtotal.toFixed(2)}`]],
    theme: "striped",
    headStyles: { fillColor: [30, 64, 175], fontSize: 9 },
    footStyles: { fillColor: [248, 250, 252], textColor: [0, 0, 0], fontStyle: 'bold' },
    styles: { fontSize: 9 },
    margin: { left: 15, right: 15 },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 20, halign: 'center' },
      3: { cellWidth: 30, halign: 'right' },
      4: { cellWidth: 30, halign: 'right' }
    }
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Totals Box
  const subtotal = invoice.subtotal || itemsSubtotal;
  const vatAmount = invoice.vatAmount || (subtotal * 0.20);
  const total = invoice.total || (subtotal + vatAmount);

  doc.setFillColor(248, 250, 252);
  doc.rect(pageWidth - 75, yPos, 60, 35, 'F');

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Subtotal:", pageWidth - 70, yPos + 8);
  doc.text(`£${subtotal.toFixed(2)}`, pageWidth - 20, yPos + 8, { align: "right" });
  
  doc.text("VAT (20%):", pageWidth - 70, yPos + 16);
  doc.text(`£${vatAmount.toFixed(2)}`, pageWidth - 20, yPos + 16, { align: "right" });
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("TOTAL DUE:", pageWidth - 70, yPos + 26);
  doc.text(`£${total.toFixed(2)}`, pageWidth - 20, yPos + 26, { align: "right" });

  yPos += 45;

  // Payment Terms & Notes
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  
  const paymentTerms = invoice.settings?.paymentTerms || "Payment due within 30 days";
  doc.text(`Payment Terms: ${paymentTerms}`, 15, yPos);
  yPos += 5;

  if (invoice.invoice_notes) {
    doc.setFont("helvetica", "bold");
    doc.text("Notes:", 15, yPos);
    yPos += 5;
    doc.setFont("helvetica", "normal");
    const notesLines = doc.splitTextToSize(invoice.invoice_notes, pageWidth - 30);
    doc.text(notesLines, 15, yPos);
    yPos += notesLines.length * 5;
  }

  yPos += 5;
  doc.text("All work completed to BS 7671:2018+A3:2024 standards.", 15, yPos);

  // Bank Details if provided
  if (invoice.settings?.bankDetails) {
    yPos += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Payment Details:", 15, yPos);
    yPos += 5;
    doc.setFont("helvetica", "normal");
    const bank = invoice.settings.bankDetails;
    doc.text(`Bank: ${bank.bankName}`, 15, yPos);
    yPos += 4;
    doc.text(`Account Name: ${bank.accountName}`, 15, yPos);
    yPos += 4;
    doc.text(`Account Number: ${bank.accountNumber}`, 15, yPos);
    yPos += 4;
    doc.text(`Sort Code: ${bank.sortCode}`, 15, yPos);
  }

  // Footer
  const footerY = doc.internal.pageSize.height - 15;
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("Thank you for your business", pageWidth / 2, footerY, { align: "center" });

  return doc;
}

export async function downloadInvoicePDF(invoice: Invoice, companyProfile?: any): Promise<void> {
  const doc = generateInvoicePDF(invoice, companyProfile);
  const fileName = `Invoice_${invoice.invoice_number || 'DRAFT'}_${format(new Date(), 'yyyyMMdd')}.pdf`;
  doc.save(fileName);
}
