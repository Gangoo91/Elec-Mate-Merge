/**
 * Generates a printable A4 sheet of BS 7671 warning labels using jsPDF.
 * No API call needed — instant, works offline.
 */

import { jsPDF } from 'jspdf';

export interface LabelForPdf {
  text: string;
  colour: string;
  regulation?: string;
  quantity: number;
  customText?: string;
  nextTestDate?: string;
}

const COLOURS: Record<string, { bg: [number, number, number]; text: [number, number, number]; border: [number, number, number] }> = {
  danger: { bg: [220, 38, 38], text: [255, 255, 255], border: [185, 28, 28] },
  warning: { bg: [250, 204, 21], text: [0, 0, 0], border: [202, 138, 4] },
  mandatory: { bg: [59, 130, 246], text: [255, 255, 255], border: [37, 99, 235] },
  safe: { bg: [34, 197, 94], text: [255, 255, 255], border: [22, 163, 74] },
  'cable-brown': { bg: [146, 64, 14], text: [255, 255, 255], border: [120, 53, 15] },
  'cable-black': { bg: [23, 23, 23], text: [255, 255, 255], border: [10, 10, 10] },
  'cable-grey': { bg: [115, 115, 115], text: [255, 255, 255], border: [82, 82, 82] },
  'cable-green': { bg: [101, 163, 13], text: [0, 0, 0], border: [77, 124, 15] },
};

/** Detect if a label is a small cable ID label (1-3 chars) */
function isCableLabel(label: LabelForPdf): boolean {
  const displayText = label.customText || label.text;
  return displayText.length <= 3 && label.colour.startsWith('cable');
}

// A4: 210mm × 297mm
const PAGE_W = 210;
const PAGE_H = 297;

// Standard warning labels: 2 cols × 5 rows = 10 per page
const STD_W = 90;
const STD_H = 50;
const STD_MARGIN_X = 15;
const STD_MARGIN_Y = 15;
const STD_GAP_X = 10;
const STD_GAP_Y = 6;
const STD_COLS = 2;
const STD_ROWS = 5;

// Small cable ID labels: 4 cols × 8 rows = 32 per page
const SM_W = 40;
const SM_H = 28;
const SM_MARGIN_X = 15;
const SM_MARGIN_Y = 15;
const SM_GAP_X = 6;
const SM_GAP_Y = 5;
const SM_COLS = 4;
const SM_ROWS = 8;

function drawLabel(doc: jsPDF, x: number, y: number, w: number, h: number, label: LabelForPdf) {
  const colourKey = label.colour.startsWith('cable') ? label.colour : label.colour;
  const c = COLOURS[colourKey] || COLOURS.mandatory;
  const isSmall = isCableLabel(label);

  // Border
  doc.setFillColor(c.border[0], c.border[1], c.border[2]);
  doc.roundedRect(x, y, w, h, 2, 2, 'F');

  // Inner fill
  doc.setFillColor(c.bg[0], c.bg[1], c.bg[2]);
  doc.roundedRect(x + 1.5, y + 1.5, w - 3, h - 3, 1.5, 1.5, 'F');

  // Earth label: green/yellow stripe
  if (label.colour === 'cable-green') {
    doc.setFillColor(234, 179, 8); // yellow stripe
    doc.rect(x + 1.5, y + h * 0.4, w - 3, h * 0.2, 'F');
  }

  // Main text
  doc.setTextColor(c.text[0], c.text[1], c.text[2]);
  const displayText = label.customText || label.text;

  if (isSmall) {
    // Cable labels: huge centered text
    doc.setFontSize(displayText.length <= 2 ? 18 : 14);
    doc.setFont('helvetica', 'bold');
    doc.text(displayText, x + w / 2, y + h / 2 + (displayText.length <= 2 ? 6 : 5), { align: 'center' });
  } else {
    // Standard labels: multi-line text
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    const lines = doc.splitTextToSize(displayText, w - 12);
    const textStartY = y + (h / 2) - (lines.length * 4.5) + 2;
    lines.forEach((line: string, i: number) => {
      doc.text(line, x + w / 2, textStartY + (i * 9), { align: 'center' });
    });

    // Next test date
    if (label.nextTestDate) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(label.nextTestDate, x + w / 2, y + h - 12, { align: 'center' });
    }

    // Regulation reference
    if (label.regulation) {
      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.text(label.regulation, x + w / 2, y + h - 5, { align: 'center' });
    }
  }
}

function drawPageOfLabels(
  doc: jsPDF,
  labels: LabelForPdf[],
  small: boolean,
  pageNum: number,
  totalPages: number
) {
  const w = small ? SM_W : STD_W;
  const h = small ? SM_H : STD_H;
  const mx = small ? SM_MARGIN_X : STD_MARGIN_X;
  const my = small ? SM_MARGIN_Y : STD_MARGIN_Y;
  const gx = small ? SM_GAP_X : STD_GAP_X;
  const gy = small ? SM_GAP_Y : STD_GAP_Y;
  const cols = small ? SM_COLS : STD_COLS;
  const rows = small ? SM_ROWS : STD_ROWS;

  // Title
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.text(small ? 'Cable & Circuit ID Labels — Elec-Mate' : 'BS 7671 Warning Labels — Elec-Mate', PAGE_W / 2, 8, { align: 'center' });

  labels.forEach((label, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = mx + col * (w + gx);
    const y = my + row * (h + gy);
    drawLabel(doc, x, y, w, h, label);
  });

  // Cut lines
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.setLineDashPattern([2, 2], 0);

  for (let c = 1; c < cols; c++) {
    const cutX = mx + c * (w + gx) - gx / 2;
    doc.line(cutX, my - 3, cutX, my + rows * (h + gy) - gy + 3);
  }
  for (let r = 1; r < rows; r++) {
    const cutY = my + r * (h + gy) - gy / 2;
    doc.line(mx - 3, cutY, mx + cols * (w + gx) - gx + 3, cutY);
  }
  doc.setLineDashPattern([], 0);

  // Page number
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(`Page ${pageNum} of ${totalPages}`, PAGE_W / 2, PAGE_H - 5, { align: 'center' });
}

export function generateWarningLabelsPdf(labels: LabelForPdf[]): Blob {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Expand and separate by size
  const standardLabels: LabelForPdf[] = [];
  const cableLabels: LabelForPdf[] = [];

  for (const label of labels) {
    for (let i = 0; i < label.quantity; i++) {
      if (isCableLabel(label)) {
        cableLabels.push(label);
      } else {
        standardLabels.push(label);
      }
    }
  }

  if (standardLabels.length === 0 && cableLabels.length === 0) {
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text('No labels selected', PAGE_W / 2, PAGE_H / 2, { align: 'center' });
    return doc.output('blob');
  }

  const stdPerPage = STD_COLS * STD_ROWS;
  const smPerPage = SM_COLS * SM_ROWS;
  const stdPages = Math.ceil(standardLabels.length / stdPerPage);
  const smPages = Math.ceil(cableLabels.length / smPerPage);
  const totalPages = stdPages + smPages;
  let currentPage = 0;

  // Standard label pages
  for (let p = 0; p < stdPages; p++) {
    if (currentPage > 0) doc.addPage();
    currentPage++;
    const pageLabels = standardLabels.slice(p * stdPerPage, (p + 1) * stdPerPage);
    drawPageOfLabels(doc, pageLabels, false, currentPage, totalPages);
  }

  // Cable label pages
  for (let p = 0; p < smPages; p++) {
    if (currentPage > 0) doc.addPage();
    currentPage++;
    const pageLabels = cableLabels.slice(p * smPerPage, (p + 1) * smPerPage);
    drawPageOfLabels(doc, pageLabels, true, currentPage, totalPages);
  }

  return doc.output('blob');
}
