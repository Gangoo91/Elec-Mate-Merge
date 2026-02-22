import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

export interface ScopePDFData {
  companyName?: string;
  companyLogoUrl?: string;
  referenceId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  propertyAddress?: string;
  propertyPostcode?: string;
  propertyType?: string;
  rooms: Array<{
    roomName: string;
    items: Array<{ itemDescription: string; quantity: number; unit: string }>;
    notes?: string;
  }>;
  prompts: Array<{
    promptQuestion: string;
    response: string;
    roomName?: string;
  }>;
  assumptions: string;
}

async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateScopePDF(data: ScopePDFData): Promise<jsPDF> {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 15;
  let yPos = 0;

  // --- Header bar ---
  const headerHeight = 40;
  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageWidth, headerHeight, 'F');

  // Company logo (if available)
  if (data.companyLogoUrl) {
    try {
      const logoDataUrl = await loadImageAsDataUrl(data.companyLogoUrl);
      if (logoDataUrl) {
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(margin - 2, 5, 34, 30, 3, 3, 'F');
        doc.addImage(logoDataUrl, 'PNG', margin, 7, 30, 26);
      }
    } catch {
      // Logo failed — continue without it
    }
  }

  const textStartX = data.companyLogoUrl ? margin + 40 : pageWidth / 2;
  const textAlign: 'left' | 'center' = data.companyLogoUrl ? 'left' : 'center';

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(data.companyName || 'Scope of Works', textStartX, 16, { align: textAlign });

  doc.setFontSize(12);
  doc.text('SCOPE OF WORKS', textStartX, 26, { align: textAlign });

  doc.setFontSize(9);
  doc.text(`Ref: ${data.referenceId || 'N/A'}`, textStartX, 34, { align: textAlign });

  yPos = headerHeight + 12;

  // --- Client details ---
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Client Details', margin, yPos);
  yPos += 7;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  if (data.customerName) {
    doc.text(`Name: ${data.customerName}`, margin, yPos);
    yPos += 5;
  }
  if (data.customerEmail) {
    doc.text(`Email: ${data.customerEmail}`, margin, yPos);
    yPos += 5;
  }
  if (data.customerPhone) {
    doc.text(`Phone: ${data.customerPhone}`, margin, yPos);
    yPos += 5;
  }

  yPos += 5;

  // --- Property details ---
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Property Details', margin, yPos);
  yPos += 7;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  if (data.propertyAddress) {
    doc.text(`Address: ${data.propertyAddress}`, margin, yPos);
    yPos += 5;
  }
  if (data.propertyPostcode) {
    doc.text(`Postcode: ${data.propertyPostcode}`, margin, yPos);
    yPos += 5;
  }
  if (data.propertyType) {
    doc.text(
      `Type: ${data.propertyType.charAt(0).toUpperCase() + data.propertyType.slice(1)}`,
      margin,
      yPos
    );
    yPos += 5;
  }

  yPos += 5;

  // --- Property assessment (global prompts) ---
  const globalPrompts = data.prompts.filter((p) => !p.roomName);
  if (globalPrompts.length > 0) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Property Assessment', margin, yPos);
    yPos += 6;

    const promptBody = globalPrompts.map((p) => [p.promptQuestion, p.response]);

    autoTable(doc, {
      startY: yPos,
      head: [['Question', 'Response']],
      body: promptBody,
      theme: 'striped',
      headStyles: { fillColor: [30, 64, 175], fontSize: 9 },
      styles: { fontSize: 9 },
      margin: { left: margin, right: margin },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 'auto' },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yPos = (doc as any).lastAutoTable.finalY + 10;
  }

  // --- Room-by-room breakdown ---
  if (data.rooms.length > 0) {
    // Check page space
    if (yPos + 30 > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Room-by-Room Breakdown', margin, yPos);
    yPos += 6;

    const tableBody: string[][] = [];
    for (const room of data.rooms) {
      for (const item of room.items) {
        tableBody.push([room.roomName, item.itemDescription, `${item.quantity}`, item.unit]);
      }
    }

    if (tableBody.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [['Room', 'Item', 'Qty', 'Unit']],
        body: tableBody,
        theme: 'striped',
        headStyles: { fillColor: [30, 64, 175], fontSize: 9 },
        styles: { fontSize: 9 },
        margin: { left: margin, right: margin },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 'auto' },
          2: { cellWidth: 20, halign: 'center' },
          3: { cellWidth: 25, halign: 'center' },
        },
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      yPos = (doc as any).lastAutoTable.finalY + 10;
    }
  }

  // --- Assumptions ---
  if (data.assumptions?.trim()) {
    if (yPos + 30 > pageHeight - 30) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Assumptions', margin, yPos);
    yPos += 7;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(data.assumptions, pageWidth - margin * 2);
    for (const line of lines) {
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, margin, yPos);
      yPos += 4.5;
    }

    yPos += 8;
  }

  // --- Signature line ---
  if (yPos + 40 > pageHeight - 30) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Client Acceptance', margin, yPos);
  yPos += 10;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'I confirm that I have reviewed and agree with the scope of works detailed above.',
    margin,
    yPos
  );
  yPos += 12;

  doc.setDrawColor(0, 0, 0);
  doc.line(margin, yPos, margin + 60, yPos);
  doc.text('Signature', margin, yPos + 5);

  doc.line(margin + 80, yPos, margin + 140, yPos);
  doc.text('Date', margin + 80, yPos + 5);

  // --- Footer ---
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'All work to be completed to BS 7671:2018+A3:2024 standards.',
    pageWidth / 2,
    pageHeight - 20,
    { align: 'center' }
  );
  doc.text('Powered by Elec-Mate', pageWidth / 2, pageHeight - 14, { align: 'center' });

  return doc;
}

export async function downloadScopePDF(data: ScopePDFData): Promise<void> {
  const doc = await generateScopePDF(data);
  const fileName = `Scope_of_Works_${data.referenceId || 'SCOPE'}_${format(new Date(), 'yyyyMMdd')}.pdf`;
  doc.save(fileName);
}
