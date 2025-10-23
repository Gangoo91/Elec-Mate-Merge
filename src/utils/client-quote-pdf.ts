import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

interface QuoteData {
  projectName: string;
  clientName: string;
  location: string;
  date: string;
  materials: Array<{ item: string; quantity: number; unitCost: number; totalCost: number }>;
  labourHours: number;
  labourRate: number;
  companyName: string;
  validityDays?: number;
}

// Helper to group materials if needed
const processMaterials = (materials: Array<{ item: string; quantity: number; unitCost: number; totalCost: number }>, showBreakdown: boolean = true) => {
  if (!showBreakdown && materials.length > 1) {
    const totalCost = materials.reduce((sum, m) => sum + m.totalCost, 0);
    return [{
      item: 'Materials & Supplies',
      quantity: 1,
      unitCost: totalCost,
      totalCost: totalCost
    }];
  }
  return materials;
};

export function generateClientQuotePDF(data: QuoteData): jsPDF {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 20;

  // Header
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text(data.companyName, pageWidth / 2, 15, { align: "center" });
  
  doc.setFontSize(14);
  doc.text("QUOTATION", pageWidth / 2, 25, { align: "center" });
  
  doc.setFontSize(9);
  doc.text(`Quote Date: ${format(new Date(data.date), "dd MMMM yyyy")}`, pageWidth / 2, 35, { align: "center" });

  yPos = 55;

  // Client Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("QUOTATION FOR:", 15, yPos);
  yPos += 6;

  doc.setFont("helvetica", "normal");
  doc.text(data.clientName, 15, yPos);
  yPos += 5;
  doc.text(data.location, 15, yPos);
  yPos += 5;
  doc.text(`Project: ${data.projectName}`, 15, yPos);
  yPos += 15;

  // Materials Table
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Materials", 15, yPos);
  yPos += 8;

  const materialsData = data.materials.map(m => [
    m.item,
    m.quantity.toString(),
    `£${m.unitCost.toFixed(2)}`,
    `£${m.totalCost.toFixed(2)}`
  ]);

  const materialSubtotal = data.materials.reduce((sum, m) => sum + m.totalCost, 0);

  autoTable(doc, {
    startY: yPos,
    head: [["Description", "Qty", "Unit Price", "Total"]],
    body: materialsData,
    foot: [["Materials Subtotal", "", "", `£${materialSubtotal.toFixed(2)}`]],
    theme: "striped",
    headStyles: { fillColor: [30, 64, 175], fontSize: 9 },
    footStyles: { fillColor: [248, 250, 252], textColor: [0, 0, 0], fontStyle: 'bold' },
    styles: { fontSize: 9 },
    margin: { left: 15, right: 15 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Labour
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Labour", 15, yPos);
  yPos += 8;

  const labourCost = data.labourHours * data.labourRate;

  autoTable(doc, {
    startY: yPos,
    head: [["Description", "Hours", "Rate/Hour", "Total"]],
    body: [[
      "Installation Labour",
      data.labourHours.toFixed(1),
      `£${data.labourRate.toFixed(2)}`,
      `£${labourCost.toFixed(2)}`
    ]],
    foot: [["Labour Subtotal", "", "", `£${labourCost.toFixed(2)}`]],
    theme: "striped",
    headStyles: { fillColor: [30, 64, 175], fontSize: 9 },
    footStyles: { fillColor: [248, 250, 252], textColor: [0, 0, 0], fontStyle: 'bold' },
    styles: { fontSize: 9 },
    margin: { left: 15, right: 15 },
  });

  yPos = (doc as any).lastAutoTable.finalY + 12;

  // Totals
  const subtotal = materialSubtotal + labourCost;
  const vat = subtotal * 0.20;
  const total = subtotal + vat;

  doc.setFillColor(248, 250, 252);
  doc.rect(pageWidth - 75, yPos, 60, 30, 'F');

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Subtotal:", pageWidth - 70, yPos + 8);
  doc.text(`£${subtotal.toFixed(2)}`, pageWidth - 20, yPos + 8, { align: "right" });
  
  doc.text("VAT (20%):", pageWidth - 70, yPos + 16);
  doc.text(`£${vat.toFixed(2)}`, pageWidth - 20, yPos + 16, { align: "right" });
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("TOTAL:", pageWidth - 70, yPos + 26);
  doc.text(`£${total.toFixed(2)}`, pageWidth - 20, yPos + 26, { align: "right" });

  yPos += 40;

  // Terms
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  const validityDays = data.validityDays || 30;
  doc.text(`This quotation is valid for ${validityDays} days from the date above.`, 15, yPos);
  yPos += 5;
  doc.text("Payment terms: 50% deposit, 50% on completion.", 15, yPos);
  yPos += 5;
  doc.text("All work completed to BS 7671:2018+A3:2024 standards.", 15, yPos);

  // Footer
  const footerY = doc.internal.pageSize.height - 15;
  doc.setFontSize(8);
  doc.text("Thank you for your business", pageWidth / 2, footerY, { align: "center" });

  return doc;
}
