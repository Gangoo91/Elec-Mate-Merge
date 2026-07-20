/**
 * generateCompetenceMatrixPdf — client-side branded workforce competence
 * matrix PDF (jsPDF, landscape A4/mm). This is the document principal
 * contractors and clients ask every electrical contractor for: workers ×
 * credentials with expiry dates and red/amber/green status.
 *
 * Follows the shared pdfBrand pattern (owner's saved brand colour, accent
 * bar, page-break guard) so it matches our other client-generated documents.
 */
import jsPDF from 'jspdf';
import { supabase } from '@/integrations/supabase/client';
import { getBrandColour, addAccentBar, readableTextOn, type RGB } from '@/utils/pdfBrand';
import {
  buildCertificateRegister,
  gapSentence,
  requirementLabel,
  type CompetenceMatrix,
  type MatrixScope,
  type SiteReadiness,
} from '@/utils/competenceMatrix';

const GREEN: RGB = [209, 250, 229];
const GREEN_TEXT: RGB = [6, 95, 70];
const AMBER: RGB = [254, 243, 199];
const AMBER_TEXT: RGB = [146, 64, 14];
const RED: RGB = [254, 226, 226];
const RED_TEXT: RGB = [153, 27, 27];
const GREY_TEXT: RGB = [148, 148, 148];

const fmt = (iso: string | null): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })
    : '';

interface CompanyBrand {
  company_name: string | null;
  logo_data_url: string | null;
  accent_color?: string | null;
  primary_color?: string | null;
}

export interface CompetencePdfOptions {
  /** Crew scope — set when the matrix is filtered to a job's assigned workers. */
  scope?: MatrixScope | null;
  /** Site-requirements assessment — adds the compliance summary + gaps section. */
  readiness?: SiteReadiness | null;
}

export async function generateCompetenceMatrixPdf(
  matrix: CompetenceMatrix,
  options: CompetencePdfOptions = {}
): Promise<jsPDF> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: company } = await supabase
    .from('company_profiles')
    .select('company_name, logo_data_url, accent_color, primary_color')
    .eq('user_id', user?.id ?? '')
    .maybeSingle();
  const brandCo = (company as CompanyBrand | null) ?? null;

  const doc = new jsPDF('l', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 12;
  const brand = getBrandColour(brandCo);

  const nameColW = 48;
  const gridW = pageW - marginX * 2 - nameColW;
  const maxColsPerPage = 9;
  const rowH = 9;
  const headerRowH = 14;

  // Chunk credential columns so wide matrices stay legible across pages
  const chunks: (typeof matrix.columns)[] = [];
  for (let i = 0; i < matrix.columns.length; i += maxColsPerPage) {
    chunks.push(matrix.columns.slice(i, i + maxColsPerPage));
  }
  if (chunks.length === 0) chunks.push([]);

  const drawPageHeader = (partLabel?: string) => {
    addAccentBar(doc, brand, 4);
    const y = 14;
    const logo = brandCo?.logo_data_url || null;
    if (logo && logo.startsWith('data:image')) {
      try {
        const f = /^data:image\/(jpe?g)/i.test(logo) ? 'JPEG' : 'PNG';
        doc.addImage(logo, f, marginX, y - 4, 26, 12, undefined, 'FAST');
      } catch {
        /* ignore bad logo */
      }
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(brand[0], brand[1], brand[2]);
    doc.text('WORKFORCE COMPETENCE MATRIX', pageW - marginX, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    const scope = options.scope;
    const sub = [
      brandCo?.company_name || '',
      `Generated ${new Date(matrix.generatedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`,
      partLabel || '',
    ]
      .filter(Boolean)
      .join('  ·  ');
    doc.text(sub, pageW - marginX, y + 5.5, { align: 'right' });
    if (scope) {
      // Crew scope line — this PDF covers the crew for one job, not the firm
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(50, 50, 50);
      const scopeLine = [
        `Workforce competence — ${scope.jobTitle}`,
        scope.client,
        scope.startDate ? `Starts ${fmt(scope.startDate)}` : '',
      ]
        .filter(Boolean)
        .join('  —  ');
      doc.text(
        doc.splitTextToSize(scopeLine, pageW - marginX * 2) as string[],
        pageW - marginX,
        y + 10.5,
        { align: 'right' }
      );
      doc.setFont('helvetica', 'normal');
      return y + 16;
    }
    return y + 12;
  };

  const drawLegendAndFooter = () => {
    const y = pageH - 8;
    doc.setFontSize(7.5);
    let x = marginX;
    const legend: [string, RGB, RGB][] = [
      ['Valid', GREEN, GREEN_TEXT],
      [`Expiring ≤${matrix.horizonDays} days`, AMBER, AMBER_TEXT],
      ['Expired', RED, RED_TEXT],
    ];
    for (const [label, fill, text] of legend) {
      doc.setFillColor(fill[0], fill[1], fill[2]);
      doc.roundedRect(x, y - 3, 3.5, 3.5, 0.8, 0.8, 'F');
      doc.setTextColor(text[0], text[1], text[2]);
      doc.text(label, x + 5, y);
      x += doc.getTextWidth(label) + 12;
    }
    doc.setTextColor(150, 150, 150);
    doc.text('Produced with Elec-Mate', pageW - marginX, y, { align: 'right' });
  };

  const drawTableHeader = (cols: typeof matrix.columns, y: number, colW: number) => {
    doc.setFillColor(brand[0], brand[1], brand[2]);
    doc.rect(marginX, y, nameColW + colW * cols.length, headerRowH, 'F');
    const headText = readableTextOn(brand);
    doc.setTextColor(headText[0], headText[1], headText[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('Worker', marginX + 2.5, y + headerRowH / 2 + 1);
    cols.forEach((col, i) => {
      const cx = marginX + nameColW + i * colW + colW / 2;
      const lines = doc.splitTextToSize(col.label, colW - 2) as string[];
      const startY = y + headerRowH / 2 + 1 - ((lines.length - 1) * 2.6) / 2;
      lines.slice(0, 3).forEach((line, li) => {
        doc.text(line, cx, startY + li * 2.6, { align: 'center' });
      });
    });
    return y + headerRowH;
  };

  chunks.forEach((cols, chunkIdx) => {
    const colW = cols.length > 0 ? gridW / cols.length : gridW;
    const partLabel = chunks.length > 1 ? `Part ${chunkIdx + 1} of ${chunks.length}` : undefined;

    if (chunkIdx > 0) doc.addPage();
    let y = drawPageHeader(partLabel);
    y = drawTableHeader(cols, y, colW);

    matrix.workers.forEach((w, rowIdx) => {
      // Manual page-break: repeat the table header after the break
      if (y + rowH > pageH - 14) {
        drawLegendAndFooter();
        doc.addPage();
        y = drawPageHeader(partLabel);
        y = drawTableHeader(cols, y, colW);
      }

      // Zebra row
      if (rowIdx % 2 === 1) {
        doc.setFillColor(246, 246, 246);
        doc.rect(marginX, y, nameColW + colW * cols.length, rowH, 'F');
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(30, 30, 30);
      doc.text(doc.splitTextToSize(w.name, nameColW - 4)[0] ?? '', marginX + 2.5, y + 3.8);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(110, 110, 110);
      doc.text(doc.splitTextToSize(w.role, nameColW - 4)[0] ?? '', marginX + 2.5, y + 7);

      cols.forEach((col, i) => {
        const cell = w.cells[col.key];
        const x = marginX + nameColW + i * colW;
        const cx = x + colW / 2;
        if (!cell || cell.status === 'none') {
          doc.setTextColor(GREY_TEXT[0], GREY_TEXT[1], GREY_TEXT[2]);
          doc.setFontSize(7);
          doc.text('—', cx, y + rowH / 2 + 1, { align: 'center' });
          return;
        }
        const [fill, text] =
          cell.status === 'expired'
            ? [RED, RED_TEXT]
            : cell.status === 'expiring'
              ? [AMBER, AMBER_TEXT]
              : [GREEN, GREEN_TEXT];
        doc.setFillColor(fill[0], fill[1], fill[2]);
        doc.roundedRect(x + 1.2, y + 1.2, colW - 2.4, rowH - 2.4, 1, 1, 'F');
        doc.setTextColor(text[0], text[1], text[2]);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.8);
        doc.text(cell.expiry ? fmt(cell.expiry) : 'Held', cx, y + rowH / 2 + 1, {
          align: 'center',
        });
        doc.setFont('helvetica', 'normal');
      });

      // Row separator
      doc.setDrawColor(228, 228, 228);
      doc.setLineWidth(0.15);
      doc.line(marginX, y + rowH, marginX + nameColW + colW * cols.length, y + rowH);

      y += rowH;
    });

    drawLegendAndFooter();
  });

  /** Section heading for the appendix pages (requirements / register). */
  const drawSectionTitle = (title: string, y: number): number => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11.5);
    doc.setTextColor(brand[0], brand[1], brand[2]);
    doc.text(title.toUpperCase(), marginX, y + 4);
    doc.setDrawColor(brand[0], brand[1], brand[2]);
    doc.setLineWidth(0.4);
    doc.line(marginX, y + 6.5, pageW - marginX, y + 6.5);
    doc.setFont('helvetica', 'normal');
    return y + 11;
  };

  const bottomLimit = pageH - 14;

  // ── Site requirements compliance — the "does everyone have X, Y, Z" page ──
  const readiness = options.readiness;
  if (readiness && readiness.requiredKeys.length > 0) {
    doc.addPage();
    let y = drawPageHeader();
    y = drawSectionTitle('Site requirements compliance', y);

    doc.setFontSize(9);
    doc.setTextColor(60, 60, 60);
    const reqLabels = readiness.requiredKeys.map((k) => requirementLabel(k, matrix.columns));
    const introLines = doc.splitTextToSize(
      `Required on site: ${reqLabels.join(', ')}. Expiry dates judged against ${
        readiness.referenceIsJobStart
          ? `the job start date (${fmt(readiness.referenceDate)})`
          : 'today'
      }.`,
      pageW - marginX * 2
    ) as string[];
    doc.text(introLines, marginX, y + 4);
    y += 4 + introLines.length * 4;

    // Compliance headline
    const allReady = readiness.readyCount === readiness.total;
    const [hlFill, hlText]: [RGB, RGB] = allReady ? [GREEN, GREEN_TEXT] : [AMBER, AMBER_TEXT];
    doc.setFillColor(hlFill[0], hlFill[1], hlFill[2]);
    doc.roundedRect(marginX, y + 2, 78, 9, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(hlText[0], hlText[1], hlText[2]);
    doc.text(
      `${readiness.readyCount} of ${readiness.total} workers site-ready`,
      marginX + 4,
      y + 8
    );
    doc.setFont('helvetica', 'normal');
    y += 16;

    for (const w of readiness.workers) {
      const gapLines = w.ready
        ? []
        : (doc.splitTextToSize(
            w.gaps.map(gapSentence).join('; '),
            pageW - marginX * 2 - 58
          ) as string[]);
      const blockH = Math.max(7, 4 + gapLines.length * 4);
      if (y + blockH > bottomLimit) {
        drawLegendAndFooter();
        doc.addPage();
        y = drawPageHeader();
        y = drawSectionTitle('Site requirements compliance (continued)', y);
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 30, 30);
      doc.text(doc.splitTextToSize(w.name, 48)[0] ?? '', marginX, y + 4);

      const [fill, text]: [RGB, RGB] = w.ready ? [GREEN, GREEN_TEXT] : [RED, RED_TEXT];
      doc.setFillColor(fill[0], fill[1], fill[2]);
      doc.roundedRect(marginX + 50, y + 0.5, 20, 5.5, 1.2, 1.2, 'F');
      doc.setFontSize(7);
      doc.setTextColor(text[0], text[1], text[2]);
      doc.text(w.ready ? 'READY' : 'NOT READY', marginX + 60, y + 4.2, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      if (!w.ready) {
        doc.setFontSize(8);
        doc.setTextColor(120, 40, 40);
        doc.text(gapLines, marginX + 74, y + 4);
      }
      y += blockH;

      doc.setDrawColor(232, 232, 232);
      doc.setLineWidth(0.15);
      doc.line(marginX, y, pageW - marginX, y);
      y += 2;
    }
    drawLegendAndFooter();
  }

  // ── Certificate register — worker → credential → number → expiry ──
  const register = buildCertificateRegister(matrix);
  if (register.length > 0) {
    const colXs = {
      worker: marginX,
      credential: marginX + 52,
      record: marginX + 100,
      number: marginX + 172,
      expiry: pageW - marginX,
    };
    const drawRegisterHeader = (y: number): number => {
      doc.setFillColor(brand[0], brand[1], brand[2]);
      doc.rect(marginX, y, pageW - marginX * 2, 7, 'F');
      const headText = readableTextOn(brand);
      doc.setTextColor(headText[0], headText[1], headText[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.text('Worker', colXs.worker + 2, y + 4.8);
      doc.text('Credential', colXs.credential, y + 4.8);
      doc.text('Recorded as', colXs.record, y + 4.8);
      doc.text('Certificate no.', colXs.number, y + 4.8);
      doc.text('Expiry', colXs.expiry - 2, y + 4.8, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      return y + 7;
    };

    doc.addPage();
    let y = drawPageHeader();
    y = drawSectionTitle('Certificate register', y);
    doc.setFontSize(8);
    doc.setTextColor(90, 90, 90);
    doc.text(
      'Certificate and card numbers as recorded — for spot-checks against the issuing bodies.',
      marginX,
      y + 3.5
    );
    y += 7;
    y = drawRegisterHeader(y);

    const regRowH = 6.5;
    register.forEach((r, idx) => {
      if (y + regRowH > bottomLimit) {
        drawLegendAndFooter();
        doc.addPage();
        y = drawPageHeader();
        y = drawSectionTitle('Certificate register (continued)', y);
        y = drawRegisterHeader(y + 2);
      }
      if (idx % 2 === 1) {
        doc.setFillColor(246, 246, 246);
        doc.rect(marginX, y, pageW - marginX * 2, regRowH, 'F');
      }
      doc.setFontSize(7.5);
      doc.setTextColor(30, 30, 30);
      doc.setFont('helvetica', 'bold');
      doc.text(doc.splitTextToSize(r.worker, 48)[0] ?? '', colXs.worker + 2, y + 4.4);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(60, 60, 60);
      doc.text(doc.splitTextToSize(r.credential, 44)[0] ?? '', colXs.credential, y + 4.4);
      doc.setTextColor(110, 110, 110);
      doc.text(doc.splitTextToSize(r.record, 68)[0] ?? '', colXs.record, y + 4.4);
      if (r.number) {
        doc.setTextColor(30, 30, 30);
        doc.text(doc.splitTextToSize(r.number, 50)[0] ?? '', colXs.number, y + 4.4);
      } else {
        doc.setTextColor(GREY_TEXT[0], GREY_TEXT[1], GREY_TEXT[2]);
        doc.text('—', colXs.number, y + 4.4);
      }
      const expText: RGB =
        r.status === 'expired' ? RED_TEXT : r.status === 'expiring' ? AMBER_TEXT : [60, 60, 60];
      doc.setTextColor(expText[0], expText[1], expText[2]);
      doc.text(r.expiry ? fmt(r.expiry) : 'No expiry', colXs.expiry - 2, y + 4.4, {
        align: 'right',
      });
      doc.setDrawColor(232, 232, 232);
      doc.setLineWidth(0.15);
      doc.line(marginX, y + regRowH, pageW - marginX, y + regRowH);
      y += regRowH;
    });
    drawLegendAndFooter();
  }

  return doc;
}
