/**
 * Project Pack — cover sheet (jsPDF).
 *
 * A branded A4 cover for the project handover pack: company logo + scheme
 * badge, project + customer + dates, an at-a-glance summary strip, and a
 * "what's enclosed" contents list. Built with jsPDF + the shared pdfBrand
 * helpers so it inherits the user's brand colour, then merged ahead of the
 * project's document PDFs by the pack assembler (pdf-lib).
 *
 * Returns the jsPDF instance — callers use `doc.output('arraybuffer')` to feed
 * the bytes into pdf-lib for merging.
 */
import jsPDF from 'jspdf';
import { getBrandColour, addAccentBar, fitContain, type RGB } from '@/utils/pdfBrand';

export interface ProjectPackCoverData {
  project: {
    title: string;
    type?: string;
    status?: string;
    customerName?: string;
    location?: string;
    startDate?: string; // ISO
    completedDate?: string; // ISO
  };
  company: {
    company_name?: string;
    logo_url?: string;
    company_phone?: string;
    company_email?: string;
    company_website?: string;
    registration_scheme?: string;
    registration_number?: string;
    accent_color?: string;
  };
  /** Resolved data URLs (caller loads them — logo + scheme badge). */
  logoDataUrl?: string | null;
  schemeLogoDataUrl?: string | null;
  summary: {
    value?: number; // estimated/quoted value
    spend?: number; // total expenses
    timeLabel?: string; // e.g. "12h 30m"
    tasksLabel?: string; // e.g. "8/8 done"
  };
  /** What's enclosed, e.g. [{ label: 'Certificates', count: 2 }] (count 0 rows are dropped). */
  contents: { label: string; count: number }[];
}

const gbp = (n?: number): string =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n || 0);

const fmtDate = (iso?: string): string => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

/** Fetch an image URL → data URL for jsPDF.addImage (best-effort). */
export async function loadImageAsDataUrl(url?: string | null): Promise<string | null> {
  if (!url) return null;
  if (url.startsWith('data:')) return url;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export function generateProjectPackCover(data: ProjectPackCoverData): jsPDF {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentW = pageW - margin * 2;
  const brand: RGB = getBrandColour(data.company.accent_color);
  const ink: RGB = [17, 24, 39];
  const muted: RGB = [107, 114, 128];

  // Top brand accent bar
  addAccentBar(doc, brand, 4);

  // ── Header: logo (left) + scheme badge (right) ──
  const headerY = 14;
  let logoEmbedded = false;
  if (data.logoDataUrl) {
    try {
      const p = doc.getImageProperties(data.logoDataUrl);
      const r = fitContain(p.width, p.height, margin, headerY, 48, 22);
      doc.addImage(data.logoDataUrl, r.x, r.y, r.w, r.h, undefined, 'FAST');
      logoEmbedded = true;
    } catch {
      /* fall through to company name */
    }
  }
  if (!logoEmbedded && data.company.company_name) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(...ink);
    doc.text(data.company.company_name, margin, headerY + 10);
  }
  if (data.schemeLogoDataUrl) {
    try {
      const p = doc.getImageProperties(data.schemeLogoDataUrl);
      const boxW = 30;
      const boxH = 18;
      const r = fitContain(p.width, p.height, pageW - margin - boxW, headerY + 1, boxW, boxH);
      doc.addImage(data.schemeLogoDataUrl, r.x, r.y, r.w, r.h, undefined, 'FAST');
    } catch {
      /* ignore */
    }
  }

  // ── Title block ──
  let y = 52;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...brand);
  doc.text('PROJECT HANDOVER PACK', margin, y, { charSpace: 0.8 });

  y += 9;
  doc.setFontSize(24);
  doc.setTextColor(...ink);
  const titleLines = doc.splitTextToSize(data.project.title || 'Project', contentW);
  doc.text(titleLines.slice(0, 2), margin, y);
  y += titleLines.length > 1 ? 18 : 10;

  const subParts = [data.project.type, data.project.status].filter(Boolean) as string[];
  if (subParts.length) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...muted);
    doc.text(subParts.join('  ·  '), margin, y);
    y += 8;
  }

  // ── Detail rows (Customer / Site / Started / Completed) ──
  y += 4;
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageW - margin, y);
  y += 8;

  const detail = (label: string, value: string, x: number, yy: number) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...muted);
    doc.text(label.toUpperCase(), x, yy, { charSpace: 0.4 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...ink);
    const lines = doc.splitTextToSize(value || '—', contentW / 2 - 6).slice(0, 2);
    doc.text(lines, x, yy + 6);
  };
  const colR = margin + contentW / 2 + 4;
  detail('Customer', data.project.customerName || '—', margin, y);
  detail('Site address', data.project.location || '—', colR, y);
  y += 18;
  detail('Started', fmtDate(data.project.startDate), margin, y);
  detail('Completed', fmtDate(data.project.completedDate), colR, y);
  y += 20;

  // ── Summary strip — 4 stat cards ──
  const stats: { label: string; value: string; accent?: boolean }[] = [
    { label: 'Value', value: gbp(data.summary.value), accent: true },
    { label: 'Spend', value: gbp(data.summary.spend) },
    { label: 'Time', value: data.summary.timeLabel || '—' },
    { label: 'Tasks', value: data.summary.tasksLabel || '—' },
  ];
  const gap = 4;
  const cardW = (contentW - gap * 3) / 4;
  const cardH = 22;
  stats.forEach((s, i) => {
    const x = margin + i * (cardW + gap);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(x, y, cardW, cardH, 2.5, 2.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...muted);
    doc.text(s.label.toUpperCase(), x + 4, y + 7, { charSpace: 0.3 });
    doc.setFontSize(13);
    doc.setTextColor(...(s.accent ? brand : ink));
    doc.text(s.value, x + 4, y + 16);
  });
  y += cardH + 16;

  // ── Contents — what's enclosed ──
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...brand);
  doc.text('ENCLOSED IN THIS PACK', margin, y, { charSpace: 0.6 });
  y += 8;

  const rows = data.contents.filter((c) => c.count > 0);
  if (rows.length === 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(...muted);
    doc.text('Cover sheet only — no documents linked to this project yet.', margin, y);
    y += 8;
  } else {
    rows.forEach((row) => {
      doc.setDrawColor(brand[0], brand[1], brand[2]);
      doc.setFillColor(brand[0], brand[1], brand[2]);
      doc.circle(margin + 1.4, y - 1.4, 1.1, 'F');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(...ink);
      doc.text(row.label, margin + 6, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...muted);
      doc.text(String(row.count), pageW - margin, y, { align: 'right' });
      y += 5;
      doc.setDrawColor(238, 240, 243);
      doc.setLineWidth(0.25);
      doc.line(margin, y, pageW - margin, y);
      y += 6;
    });
  }

  // ── Footer ──
  const footY = pageH - 18;
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.3);
  doc.line(margin, footY, pageW - margin, footY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...muted);
  const contact = [
    data.company.company_name,
    data.company.company_phone,
    data.company.company_email,
    data.company.registration_scheme && data.company.registration_number
      ? `${data.company.registration_scheme} ${data.company.registration_number}`
      : data.company.registration_scheme,
  ]
    .filter(Boolean)
    .join('  ·  ');
  doc.text(contact || 'Elec-Mate', margin, footY + 6);
  doc.setTextColor(...brand);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Powered by Elec-Mate', pageW - margin, footY + 6, { align: 'right' });

  return doc;
}
