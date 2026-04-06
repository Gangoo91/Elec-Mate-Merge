/**
 * Generates board schedule PDFs using jsPDF:
 * 1. CU door label (compact, fits inside consumer unit door)
 * 2. Full A4 document (for client handover / records)
 */

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface BoardCircuit {
  id: string;
  circuitNumber: string;
  description: string;
  rating: string;
  type: string; // MCB, RCBO, Fuse, etc.
  cableSize?: string;
  zs?: string;
  rcdRating?: string;
}

export interface BoardScheduleData {
  boardRef: string;
  location: string;
  mainSwitchRating: string;
  rcdDetails: string;
  circuits: BoardCircuit[];
  companyName?: string;
  notes?: string;
}

/**
 * Generate CU door label — compact format to print and stick inside consumer unit.
 * Typical CU door: ~170mm × 120mm. We generate landscape A5 which is close.
 */
export function generateCUDoorLabel(data: BoardScheduleData): Blob {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [170, 120] });

  // Header bar
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 170, 14, 'F');
  doc.setFillColor(249, 115, 22); // orange accent
  doc.rect(0, 0, 170, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`BOARD SCHEDULE — ${data.boardRef}`, 6, 10);

  if (data.location) {
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(data.location, 164, 10, { align: 'right' });
  }

  // Main switch info
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  let infoY = 19;
  if (data.mainSwitchRating) {
    doc.text(`Main Switch: ${data.mainSwitchRating}`, 6, infoY);
  }
  if (data.rcdDetails) {
    doc.text(`RCD: ${data.rcdDetails}`, 90, infoY);
  }

  // Circuit table
  const tableData = data.circuits.map((c) => [
    c.circuitNumber,
    c.description,
    c.rating ? `${c.rating}A` : '',
    c.type,
  ]);

  autoTable(doc, {
    startY: 23,
    head: [['Way', 'Circuit Description', 'Rating', 'Type']],
    body: tableData,
    theme: 'grid',
    styles: {
      fontSize: 7,
      cellPadding: 1.5,
      lineColor: [203, 213, 225],
      lineWidth: 0.3,
    },
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontSize: 7,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 14, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 95 },
      2: { cellWidth: 18, halign: 'center' },
      3: { cellWidth: 25, halign: 'center' },
    },
    margin: { left: 6, right: 6 },
  });

  // Footer
  const finalY = (doc as any).lastAutoTable?.finalY || 100;
  doc.setFontSize(6);
  doc.setTextColor(148, 163, 184);
  if (data.companyName) {
    doc.text(data.companyName, 6, Math.min(finalY + 5, 115));
  }
  doc.text(new Date().toLocaleDateString('en-GB'), 164, Math.min(finalY + 5, 115), { align: 'right' });

  return doc.output('blob');
}

/**
 * Generate full A4 board schedule document — for client handover / records.
 */
export function generateFullBoardSchedule(data: BoardScheduleData): Blob {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setFillColor(249, 115, 22);
  doc.rect(0, 0, 210, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('BOARD SCHEDULE', 10, 14);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(data.boardRef, 200, 14, { align: 'right' });

  // Company name
  if (data.companyName) {
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(data.companyName, 200, 9, { align: 'right' });
  }

  // Board details section
  let y = 28;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Board Details', 10, y);
  y += 6;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);

  const details = [
    ['Board Reference', data.boardRef],
    ['Location', data.location],
    ['Main Switch', data.mainSwitchRating],
    ['RCD Details', data.rcdDetails],
  ].filter(([, val]) => val);

  details.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);
    doc.text(`${label}:`, 10, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(value, 55, y);
    y += 5;
  });

  y += 4;

  // Circuit table
  const hasExtendedData = data.circuits.some((c) => c.cableSize || c.zs || c.rcdRating);

  const head = hasExtendedData
    ? [['Way', 'Circuit Description', 'Cable', 'Device', 'Rating', 'Zs (Ω)', 'RCD']]
    : [['Way', 'Circuit Description', 'Rating', 'Type']];

  const body = data.circuits.map((c) =>
    hasExtendedData
      ? [c.circuitNumber, c.description, c.cableSize || '', c.type, c.rating ? `${c.rating}A` : '', c.zs || '', c.rcdRating || '']
      : [c.circuitNumber, c.description, c.rating ? `${c.rating}A` : '', c.type]
  );

  autoTable(doc, {
    startY: y,
    head,
    body,
    theme: 'grid',
    styles: {
      fontSize: 8,
      cellPadding: 2.5,
      lineColor: [226, 232, 240],
      lineWidth: 0.3,
    },
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
    },
    columnStyles: hasExtendedData
      ? {
          0: { cellWidth: 14, halign: 'center', fontStyle: 'bold' },
          1: { cellWidth: 60 },
          2: { cellWidth: 22, halign: 'center' },
          3: { cellWidth: 22, halign: 'center' },
          4: { cellWidth: 18, halign: 'center' },
          5: { cellWidth: 20, halign: 'center' },
          6: { cellWidth: 22, halign: 'center' },
        }
      : {
          0: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
          1: { cellWidth: 110 },
          2: { cellWidth: 25, halign: 'center' },
          3: { cellWidth: 30, halign: 'center' },
        },
    margin: { left: 10, right: 10 },
    alternateRowStyles: { fillColor: [248, 250, 252] },
  });

  // Notes
  const tableEndY = (doc as any).lastAutoTable?.finalY || y + 20;
  if (data.notes) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Notes', 10, tableEndY + 8);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const noteLines = doc.splitTextToSize(data.notes, 190);
    doc.text(noteLines, 10, tableEndY + 14);
  }

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(`Generated ${new Date().toLocaleDateString('en-GB')}`, 10, 290);
  if (data.companyName) {
    doc.text(data.companyName, 200, 290, { align: 'right' });
  }
  doc.text('Powered by Elec-Mate', 105, 294, { align: 'center' });

  return doc.output('blob');
}
