/**
 * generateJobSafetyPackPdf — branded 1–2 page summary cover for one job's
 * safety pack: the "everything for THIS site" document a contractor hands a
 * principal contractor before the crew starts. Job header, honest verdict,
 * crew-readiness table, RAMS register, briefing register and compliance list.
 *
 * Summary cover only — it deliberately does not merge the underlying RAMS /
 * briefing PDFs. Follows the shared pdfBrand pattern (owner's saved brand
 * colour, accent bar, page-break guard) so it matches our other documents,
 * with the competence-matrix PDF as the house-style reference.
 */
import jsPDF from 'jspdf';
import { supabase } from '@/integrations/supabase/client';
import { getBrandColour, addAccentBar, type RGB } from '@/utils/pdfBrand';

const GREEN: RGB = [209, 250, 229];
const GREEN_TEXT: RGB = [6, 95, 70];
const AMBER: RGB = [254, 243, 199];
const AMBER_TEXT: RGB = [146, 64, 14];
const RED: RGB = [254, 226, 226];
const RED_TEXT: RGB = [153, 27, 27];
const GREY_TEXT: RGB = [140, 140, 140];
const BODY_TEXT: RGB = [40, 40, 40];

export type PackStatusKind = 'good' | 'warn' | 'bad';

export interface PackCrewRow {
  name: string;
  role: string;
  ready: boolean;
  /** One line — "First Aid missing; ECS Card expires 03 Aug 2026, before job start" */
  detail: string;
}

export interface JobSafetyPackPdfData {
  job: {
    title: string;
    client: string;
    location: string;
    startDate: string | null;
  };
  ready: boolean;
  gaps: string[];
  /** Required credential labels the crew was judged against */
  requiredLabels: string[];
  /** e.g. "Expiries judged against the job start date (14 Aug 2026)." */
  referenceNote: string;
  crew: PackCrewRow[];
  rams: { title: string; status: string; statusKind: PackStatusKind; date: string }[];
  briefings: { title: string; date: string; signed: number; total: number }[];
  compliance: { title: string; status: string; statusKind: PackStatusKind; expiry: string | null }[];
}

const fmt = (iso: string | null): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

const statusFill = (kind: PackStatusKind): [RGB, RGB] =>
  kind === 'good' ? [GREEN, GREEN_TEXT] : kind === 'warn' ? [AMBER, AMBER_TEXT] : [RED, RED_TEXT];

interface CompanyBrand {
  company_name: string | null;
  logo_data_url: string | null;
  accent_color?: string | null;
  primary_color?: string | null;
}

export async function generateJobSafetyPackPdf(data: JobSafetyPackPdfData): Promise<jsPDF> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: company } = await supabase
    .from('company_profiles')
    .select('company_name, logo_data_url, accent_color, primary_color')
    .eq('user_id', user?.id ?? '')
    .maybeSingle();
  const brandCo = (company as CompanyBrand | null) ?? null;

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const bottomLimit = pageH - 16;
  const brand = getBrandColour(brandCo);

  const drawFooter = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 150);
    doc.text('Produced with Elec-Mate', pageW - marginX, pageH - 8, { align: 'right' });
    doc.text(
      `Generated ${new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}`,
      marginX,
      pageH - 8
    );
  };

  const drawPageHeader = (continued = false): number => {
    addAccentBar(doc, brand, 4);
    const y = 15;
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
    doc.text('JOB SAFETY PACK', pageW - marginX, y, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    const sub = [brandCo?.company_name || '', data.job.title, continued ? 'Continued' : '']
      .filter(Boolean)
      .join('  ·  ');
    doc.text(sub, pageW - marginX, y + 5.5, { align: 'right' });
    return y + 13;
  };

  /** Page-break guard that repeats the pack header and keeps the footer. */
  const guard = (y: number, needed: number): number => {
    if (y + needed > bottomLimit) {
      drawFooter();
      doc.addPage();
      return drawPageHeader(true);
    }
    return y;
  };

  const sectionTitle = (title: string, y: number): number => {
    y = guard(y, 16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(brand[0], brand[1], brand[2]);
    doc.text(title.toUpperCase(), marginX, y + 4);
    doc.setDrawColor(brand[0], brand[1], brand[2]);
    doc.setLineWidth(0.4);
    doc.line(marginX, y + 6.5, pageW - marginX, y + 6.5);
    doc.setFont('helvetica', 'normal');
    return y + 11;
  };

  const emptyLine = (text: string, y: number): number => {
    y = guard(y, 8);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(GREY_TEXT[0], GREY_TEXT[1], GREY_TEXT[2]);
    doc.text(text, marginX, y + 3.5);
    doc.setFont('helvetica', 'normal');
    return y + 8;
  };

  const chip = (label: string, kind: PackStatusKind, x: number, y: number, w = 30): void => {
    const [fill, text] = statusFill(kind);
    doc.setFillColor(fill[0], fill[1], fill[2]);
    doc.roundedRect(x, y, w, 5.5, 1.2, 1.2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(text[0], text[1], text[2]);
    doc.text(label, x + w / 2, y + 3.8, { align: 'center' });
    doc.setFont('helvetica', 'normal');
  };

  // ── Page 1 — job header + verdict ──
  let y = drawPageHeader();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(BODY_TEXT[0], BODY_TEXT[1], BODY_TEXT[2]);
  const titleLines = doc.splitTextToSize(data.job.title, pageW - marginX * 2) as string[];
  doc.text(titleLines, marginX, y + 6);
  y += 6 + titleLines.length * 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(90, 90, 90);
  const metaLine = [
    data.job.client,
    data.job.location,
    data.job.startDate ? `Starts ${fmt(data.job.startDate)}` : 'No start date set',
  ]
    .filter(Boolean)
    .join('  ·  ');
  const metaLines = doc.splitTextToSize(metaLine, pageW - marginX * 2) as string[];
  doc.text(metaLines, marginX, y);
  y += metaLines.length * 4.5 + 4;

  // Verdict banner
  const [vFill, vText] = data.ready ? [GREEN, GREEN_TEXT] : [RED, RED_TEXT];
  doc.setFillColor(vFill[0], vFill[1], vFill[2]);
  doc.roundedRect(marginX, y, pageW - marginX * 2, 10, 1.6, 1.6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(vText[0], vText[1], vText[2]);
  doc.text(
    data.ready
      ? 'READY FOR SITE — no gaps found in the linked records'
      : `${data.gaps.length} GAP${data.gaps.length === 1 ? '' : 'S'} TO CLOSE BEFORE THE CREW STARTS`,
    marginX + 5,
    y + 6.6
  );
  doc.setFont('helvetica', 'normal');
  y += 14;

  if (!data.ready && data.gaps.length > 0) {
    doc.setFontSize(8.5);
    for (const gap of data.gaps) {
      const lines = doc.splitTextToSize(gap, pageW - marginX * 2 - 6) as string[];
      y = guard(y, lines.length * 4 + 1.5);
      doc.setTextColor(RED_TEXT[0], RED_TEXT[1], RED_TEXT[2]);
      doc.text('•', marginX + 1, y + 3.2);
      doc.setTextColor(70, 70, 70);
      doc.text(lines, marginX + 5, y + 3.2);
      y += lines.length * 4 + 1.5;
    }
    y += 3;
  }

  // ── Crew readiness ──
  y = sectionTitle('Crew competence', y);
  if (data.crew.length === 0) {
    y = emptyLine('No crew assigned to this job.', y);
  } else {
    if (data.requiredLabels.length > 0) {
      doc.setFontSize(8.5);
      doc.setTextColor(90, 90, 90);
      const introLines = doc.splitTextToSize(
        `Required on site: ${data.requiredLabels.join(', ')}. ${data.referenceNote}`,
        pageW - marginX * 2
      ) as string[];
      y = guard(y, introLines.length * 4 + 3);
      doc.text(introLines, marginX, y + 3.2);
      y += introLines.length * 4 + 3;
    }
    for (const w of data.crew) {
      const detailW = pageW - marginX * 2 - 92;
      const detailLines = w.detail
        ? (doc.splitTextToSize(w.detail, detailW) as string[])
        : [];
      const blockH = Math.max(7.5, 3.5 + detailLines.length * 4);
      y = guard(y, blockH + 2);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(BODY_TEXT[0], BODY_TEXT[1], BODY_TEXT[2]);
      doc.text(doc.splitTextToSize(w.name, 44)[0] ?? '', marginX, y + 4);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(120, 120, 120);
      doc.text(doc.splitTextToSize(w.role, 24)[0] ?? '', marginX + 46, y + 4);
      chip(w.ready ? 'READY' : 'NOT READY', w.ready ? 'good' : 'bad', marginX + 66, y + 0.6, 22);
      if (detailLines.length > 0) {
        doc.setFontSize(7.8);
        doc.setTextColor(w.ready ? 110 : 120, w.ready ? 110 : 40, w.ready ? 110 : 40);
        doc.text(detailLines, marginX + 92, y + 4);
      }
      y += blockH;
      doc.setDrawColor(232, 232, 232);
      doc.setLineWidth(0.15);
      doc.line(marginX, y, pageW - marginX, y);
      y += 2;
    }
  }
  y += 3;

  // ── RAMS register ──
  y = sectionTitle('RAMS register', y);
  if (data.rams.length === 0) {
    y = emptyLine('No RAMS linked to this job.', y);
  } else {
    for (const r of data.rams) {
      y = guard(y, 9);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(BODY_TEXT[0], BODY_TEXT[1], BODY_TEXT[2]);
      doc.text(doc.splitTextToSize(r.title, 96)[0] ?? '', marginX, y + 4);
      doc.setFont('helvetica', 'normal');
      chip(r.status.toUpperCase(), r.statusKind, marginX + 100, y + 0.6, 40);
      doc.setFontSize(7.8);
      doc.setTextColor(110, 110, 110);
      doc.text(r.date, pageW - marginX, y + 4, { align: 'right' });
      y += 7;
      doc.setDrawColor(232, 232, 232);
      doc.setLineWidth(0.15);
      doc.line(marginX, y, pageW - marginX, y);
      y += 2;
    }
  }
  y += 3;

  // ── Briefing register ──
  y = sectionTitle('Briefings & toolbox talks', y);
  if (data.briefings.length === 0) {
    y = emptyLine('No briefings linked to this job.', y);
  } else {
    for (const b of data.briefings) {
      y = guard(y, 9);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(BODY_TEXT[0], BODY_TEXT[1], BODY_TEXT[2]);
      doc.text(doc.splitTextToSize(b.title, 96)[0] ?? '', marginX, y + 4);
      doc.setFont('helvetica', 'normal');
      const fullySigned = b.total > 0 && b.signed >= b.total;
      chip(
        b.total === 0 ? 'NO REGISTER' : `${b.signed}/${b.total} SIGNED`,
        fullySigned ? 'good' : 'warn',
        marginX + 100,
        y + 0.6,
        40
      );
      doc.setFontSize(7.8);
      doc.setTextColor(110, 110, 110);
      doc.text(fmt(b.date), pageW - marginX, y + 4, { align: 'right' });
      y += 7;
      doc.setDrawColor(232, 232, 232);
      doc.setLineWidth(0.15);
      doc.line(marginX, y, pageW - marginX, y);
      y += 2;
    }
  }
  y += 3;

  // ── Compliance documents ──
  y = sectionTitle('Compliance documents', y);
  if (data.compliance.length === 0) {
    y = emptyLine('No compliance documents linked to this job.', y);
  } else {
    for (const c of data.compliance) {
      y = guard(y, 9);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(BODY_TEXT[0], BODY_TEXT[1], BODY_TEXT[2]);
      doc.text(doc.splitTextToSize(c.title, 96)[0] ?? '', marginX, y + 4);
      doc.setFont('helvetica', 'normal');
      chip(c.status.toUpperCase(), c.statusKind, marginX + 100, y + 0.6, 40);
      doc.setFontSize(7.8);
      doc.setTextColor(110, 110, 110);
      doc.text(c.expiry ? `Expires ${fmt(c.expiry)}` : 'No expiry', pageW - marginX, y + 4, {
        align: 'right',
      });
      y += 7;
      doc.setDrawColor(232, 232, 232);
      doc.setLineWidth(0.15);
      doc.line(marginX, y, pageW - marginX, y);
      y += 2;
    }
  }

  drawFooter();
  return doc;
}
