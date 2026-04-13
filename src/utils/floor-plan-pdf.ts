/**
 * Professional floor plan PDF generator.
 *
 * Produces an architect-grade PDF with title block, symbol legend,
 * and high-resolution canvas image — ready for client submission.
 */

import { saveOrSharePdf } from '@/utils/save-or-share-pdf';

export interface CableScheduleEntry {
  ref: string;         // C1, C2 — cable reference for the schedule
  circuitRef?: string; // L1, S1 — parent circuit
  circuitName?: string; // "Upstairs lighting" etc.
  fromLabel: string;   // symbol name at source ("Consumer Unit", "Socket C1")
  toLabel: string;     // symbol name at target
  cableType: string;   // "2.5mm² T&E" inferred from circuit
  lengthMetres: number;
}

export interface FloorPlanPdfOptions {
  canvasElement: HTMLCanvasElement;
  projectName: string;
  clientName: string;
  propertyAddress: string;
  drawingNumber: string;
  drawnBy: string;
  paperSize: 'a3' | 'a4';
  orientation: 'landscape' | 'portrait';
  includeLegend: boolean;
  includeTitleBlock: boolean;
  usedSymbols: { id: string; name: string; category: string; count: number; svgXml: string }[];
  /** Optional — when present, a Cable Schedule page is appended. */
  cables?: CableScheduleEntry[];
  scale: string;
}

/* ─── helpers ──────────────────────────────────────────── */

/** Convert an SVG XML string to a small PNG data URL via an off-screen canvas. */
function svgToPngDataUrl(svgXml: string, size = 24): Promise<string> {
  return new Promise((resolve) => {
    // Make SVG black on white for print
    let processed = svgXml
      .replace(/currentColor/g, '#000000')
      .replace(/stroke="[^"]*"/g, 'stroke="#000000"')
      .replace(/fill="none"/g, 'fill="none"')
      .replace(/fill="[^"]*"/g, (match) => {
        if (match === 'fill="none"') return match;
        return 'fill="#000000"';
      });

    // Ensure viewBox for scaling
    if (!processed.includes('viewBox')) {
      processed = processed.replace('<svg', `<svg viewBox="0 0 40 40"`);
    }

    const blob = new Blob([processed], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = size * 2; // 2x for sharpness
      c.height = size * 2;
      const ctx = c.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/png'));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve('');
    };
    img.src = url;
  });
}

/** Capitalise first letter of a string. */
function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* ─── main export ──────────────────────────────────────── */

export async function generateFloorPlanPdf(options: FloorPlanPdfOptions): Promise<void> {
  const {
    canvasElement,
    projectName,
    clientName,
    propertyAddress,
    drawingNumber,
    drawnBy,
    paperSize,
    orientation,
    includeLegend,
    includeTitleBlock,
    usedSymbols,
    cables,
    scale,
  } = options;

  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ orientation, unit: 'mm', format: paperSize });

  const pw = pdf.internal.pageSize.getWidth();
  const ph = pdf.internal.pageSize.getHeight();

  // Margins
  const margin = 8;
  const innerW = pw - margin * 2;
  const innerH = ph - margin * 2;

  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  /* ── 1. Drawing border ─────────────────────────────── */
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.6);
  pdf.rect(margin, margin, innerW, innerH);

  // Inner border (professional double border)
  pdf.setLineWidth(0.2);
  pdf.rect(margin + 1.5, margin + 1.5, innerW - 3, innerH - 3);

  /* ── 2. Footer strip ───────────────────────────────── */
  const footerHeight = 6;
  const footerY = margin + innerH - footerHeight;
  pdf.setLineWidth(0.2);
  pdf.line(margin + 1.5, footerY, margin + innerW - 1.5, footerY);
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  pdf.text('Elec-Mate \u00B7 Electrical Installation Floor Plan', margin + 4, footerY + 4);
  pdf.text('BS 7671:2018+A3:2024', margin + innerW - 4, footerY + 4, { align: 'right' });

  /* ── 3. Bottom panel (legend + title block) ────────── */
  const showBottomPanel = includeLegend || includeTitleBlock;
  const bottomPanelHeight = showBottomPanel ? 52 : 0;
  const bottomPanelY = footerY - bottomPanelHeight;

  if (showBottomPanel) {
    pdf.setLineWidth(0.3);
    pdf.line(margin + 1.5, bottomPanelY, margin + innerW - 1.5, bottomPanelY);
  }

  // Title block width + legend width
  const titleBlockW = includeTitleBlock ? Math.min(100, innerW * 0.45) : 0;
  const legendW = includeLegend ? innerW - 3 - titleBlockW - (includeTitleBlock ? 2 : 0) : 0;

  /* ── 3a. Symbol legend ─────────────────────────────── */
  if (includeLegend && usedSymbols.length > 0) {
    const lx = margin + 1.5;
    const ly = bottomPanelY;
    const lw = legendW;
    const lh = bottomPanelHeight;

    // Legend box
    pdf.setLineWidth(0.3);
    pdf.rect(lx, ly, lw, lh);

    // Legend header
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('SYMBOL LEGEND', lx + 3, ly + 5);
    pdf.setLineWidth(0.15);
    pdf.line(lx, ly + 7, lx + lw, ly + 7);

    // Pre-convert SVGs to PNGs
    const symbolImages = await Promise.all(
      usedSymbols.map(async (sym) => ({
        ...sym,
        pngUrl: await svgToPngDataUrl(sym.svgXml, 16),
      }))
    );

    // Lay out symbols in columns
    const colWidth = 50;
    const cols = Math.max(1, Math.floor(lw / colWidth));
    const rowHeight = 6;
    const startY = ly + 10;
    const maxRows = Math.floor((lh - 12) / rowHeight);

    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(30, 30, 30);

    symbolImages.forEach((sym, i) => {
      const col = Math.floor(i / maxRows);
      const row = i % maxRows;
      if (col >= cols) return; // overflow — skip

      const sx = lx + 3 + col * colWidth;
      const sy = startY + row * rowHeight;

      // Draw symbol image
      if (sym.pngUrl) {
        try {
          pdf.addImage(sym.pngUrl, 'PNG', sx, sy - 2.5, 4, 4, undefined, 'FAST');
        } catch {
          // Skip if image fails
        }
      }

      // Symbol name + count
      pdf.text(`${sym.name} \u00D7${sym.count}`, sx + 5.5, sy + 0.5);
    });
  }

  /* ── 3b. Title block ───────────────────────────────── */
  if (includeTitleBlock) {
    const tbx = margin + innerW - 1.5 - titleBlockW;
    const tby = bottomPanelY;
    const tbw = titleBlockW;
    const tbh = bottomPanelHeight;

    // Title block outer box
    pdf.setLineWidth(0.5);
    pdf.rect(tbx, tby, tbw, tbh);

    // Header row
    pdf.setFillColor(245, 245, 245);
    pdf.rect(tbx, tby, tbw, 8, 'F');
    pdf.setLineWidth(0.3);
    pdf.rect(tbx, tby, tbw, 8);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('ELECTRICAL INSTALLATION', tbx + tbw / 2, tby + 5.5, { align: 'center' });

    // Row definitions
    const rows = [
      { label: 'Project', value: projectName || '—' },
      { label: 'Client', value: clientName || '—' },
      { label: 'Address', value: propertyAddress || '—' },
      { label: 'Drawing No.', value: drawingNumber || 'EL-001' },
      { label: 'Scale', value: scale || '1:50' },
      { label: 'Date', value: dateStr },
      { label: 'Drawn By', value: drawnBy || '—' },
      { label: 'Rev.', value: 'A' },
    ];

    const rowStartY = tby + 8;
    const rowH = (tbh - 8) / rows.length;
    const labelColW = 24;

    pdf.setFontSize(7.5);
    rows.forEach((row, i) => {
      const ry = rowStartY + i * rowH;
      pdf.setLineWidth(0.15);
      pdf.line(tbx, ry, tbx + tbw, ry);

      // Vertical divider
      pdf.line(tbx + labelColW, ry, tbx + labelColW, ry + rowH);

      // Label
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(80, 80, 80);
      pdf.text(row.label, tbx + 2, ry + rowH * 0.65);

      // Value — truncate if needed
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(0, 0, 0);
      const maxValW = tbw - labelColW - 4;
      const truncated = pdf.getTextWidth(row.value) > maxValW
        ? row.value.substring(0, Math.floor(row.value.length * (maxValW / pdf.getTextWidth(row.value)))) + '…'
        : row.value;
      pdf.text(truncated, tbx + labelColW + 2, ry + rowH * 0.65);
    });

    // Bottom border of last row
    pdf.setLineWidth(0.15);
    pdf.line(tbx, rowStartY + rows.length * rowH, tbx + tbw, rowStartY + rows.length * rowH);
  }

  /* ── 4. Canvas image ───────────────────────────────── */
  const imgAreaTop = margin + 3;
  const imgAreaBottom = showBottomPanel ? bottomPanelY - 2 : footerY - 2;
  const imgAreaLeft = margin + 3;
  const imgAreaRight = margin + innerW - 3;
  const imgAreaW = imgAreaRight - imgAreaLeft;
  const imgAreaH = imgAreaBottom - imgAreaTop;

  // Render canvas at 3x for print quality
  const printScale = 3;
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvasElement.width * printScale;
  tempCanvas.height = canvasElement.height * printScale;
  const ctx = tempCanvas.getContext('2d');
  if (ctx) {
    ctx.scale(printScale, printScale);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(canvasElement, 0, 0);
  }

  const imgData = tempCanvas.toDataURL('image/png', 1.0);

  // Fit image proportionally in available area
  const canvasAspect = canvasElement.width / canvasElement.height;
  const areaAspect = imgAreaW / imgAreaH;
  let imgW: number, imgH: number, imgX: number, imgY: number;

  if (canvasAspect > areaAspect) {
    // Width-constrained
    imgW = imgAreaW;
    imgH = imgW / canvasAspect;
    imgX = imgAreaLeft;
    imgY = imgAreaTop + (imgAreaH - imgH) / 2;
  } else {
    // Height-constrained
    imgH = imgAreaH;
    imgW = imgH * canvasAspect;
    imgX = imgAreaLeft + (imgAreaW - imgW) / 2;
    imgY = imgAreaTop;
  }

  pdf.addImage(imgData, 'PNG', imgX, imgY, imgW, imgH, undefined, 'FAST');

  // Thin border around image
  pdf.setDrawColor(180, 180, 180);
  pdf.setLineWidth(0.15);
  pdf.rect(imgX, imgY, imgW, imgH);

  /* ── 5. Cable Schedule page (Phase 5) ────────────────── */
  if (cables && cables.length > 0) {
    pdf.addPage(paperSize, orientation);

    // Outer border
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.6);
    pdf.rect(margin, margin, innerW, innerH);
    pdf.setLineWidth(0.2);
    pdf.rect(margin + 1.5, margin + 1.5, innerW - 3, innerH - 3);

    // Header
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(0, 0, 0);
    pdf.text('Cable Schedule', margin + 5, margin + 10);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    pdf.text(
      `${projectName || 'Project'} \u00B7 Drawing ${drawingNumber || 'EL-001'} \u00B7 ${dateStr}`,
      margin + 5,
      margin + 15,
    );

    // Column layout
    const tableTop = margin + 22;
    const tableLeft = margin + 5;
    const tableRight = margin + innerW - 5;
    const tableWidth = tableRight - tableLeft;

    const cols = [
      { label: 'Ref', width: 14 },
      { label: 'Circuit', width: 22 },
      { label: 'From', width: tableWidth * 0.24 - 18 },
      { label: 'To', width: tableWidth * 0.24 - 18 },
      { label: 'Cable', width: 36 },
      { label: 'Length', width: 20 },
    ];
    // Stretch "From" and "To" to fill remaining width
    const fixedW = 14 + 22 + 36 + 20;
    const flexW = (tableWidth - fixedW) / 2;
    cols[2].width = flexW;
    cols[3].width = flexW;

    // Header row
    const rowH = 7;
    pdf.setFillColor(240, 240, 240);
    pdf.rect(tableLeft, tableTop, tableWidth, rowH, 'F');
    pdf.setDrawColor(100, 100, 100);
    pdf.setLineWidth(0.25);
    pdf.rect(tableLeft, tableTop, tableWidth, rowH);

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8.5);
    pdf.setTextColor(30, 30, 30);
    let cx = tableLeft + 2;
    cols.forEach((col) => {
      pdf.text(col.label, cx, tableTop + 4.8);
      cx += col.width;
    });

    // Vertical dividers between columns (header + body)
    let dividerX = tableLeft;
    for (let i = 0; i < cols.length - 1; i++) {
      dividerX += cols[i].width;
      pdf.setLineWidth(0.1);
      pdf.line(dividerX, tableTop, dividerX, tableTop + rowH * (cables.length + 1));
    }

    // Body rows
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(10, 10, 10);

    cables.forEach((cable, idx) => {
      const ry = tableTop + rowH * (idx + 1);

      // Alternating row fill for readability
      if (idx % 2 === 1) {
        pdf.setFillColor(250, 250, 250);
        pdf.rect(tableLeft, ry, tableWidth, rowH, 'F');
      }
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.1);
      pdf.line(tableLeft, ry, tableRight, ry);

      let rx = tableLeft + 2;
      const values = [
        cable.ref,
        cable.circuitRef || '—',
        cable.fromLabel,
        cable.toLabel,
        cable.cableType,
        `${cable.lengthMetres.toFixed(2)}m`,
      ];
      values.forEach((val, colIdx) => {
        const col = cols[colIdx];
        const maxW = col.width - 4;
        let text = val;
        if (pdf.getTextWidth(text) > maxW) {
          // Truncate with ellipsis
          while (text.length > 3 && pdf.getTextWidth(text + '…') > maxW) {
            text = text.slice(0, -1);
          }
          text += '…';
        }
        pdf.text(text, rx, ry + 4.8);
        rx += col.width;
      });
    });

    // Outer table border
    pdf.setDrawColor(100, 100, 100);
    pdf.setLineWidth(0.25);
    pdf.rect(tableLeft, tableTop, tableWidth, rowH * (cables.length + 1));

    // Totals row
    const totalLength = cables.reduce((sum, c) => sum + c.lengthMetres, 0);
    const totalRowY = tableTop + rowH * (cables.length + 1) + 4;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(0, 0, 0);
    pdf.text(
      `Total cable length: ${totalLength.toFixed(2)} m across ${cables.length} run${cables.length === 1 ? '' : 's'}`,
      tableLeft,
      totalRowY + 4,
    );

    // Footer strip on this page too
    pdf.setLineWidth(0.2);
    pdf.line(margin + 1.5, footerY, margin + innerW - 1.5, footerY);
    pdf.setFontSize(7);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    pdf.text('Elec-Mate \u00B7 Cable Schedule', margin + 4, footerY + 4);
    pdf.text('BS 7671:2018+A3:2024', margin + innerW - 4, footerY + 4, {
      align: 'right',
    });
  }

  /* ── 6. Save / share ───────────────────────────────── */
  const safeName = (projectName || 'floor-plan').replace(/\s+/g, '-').toLowerCase();
  await saveOrSharePdf(pdf, `${safeName}-${drawingNumber || 'EL-001'}.pdf`);
}
