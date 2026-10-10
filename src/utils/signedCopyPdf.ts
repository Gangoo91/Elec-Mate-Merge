/**
 * A worker's own signed copy of something they signed in Worker Tools
 * (ELE-2010): a toolbox talk, a RAMS, a company policy or a job pack.
 *
 * One plain A4 document: what it was, who it was from, the content they read,
 * then the signature block with the time, the place (when the phone gave one)
 * and the device. Built on the phone from what the app already holds, so it
 * works for anything they can see in Sign-offs.
 */
import jsPDF from 'jspdf';
import { format } from 'date-fns';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { describeLocation } from '@/lib/signingLocation';

export interface SignedCopySection {
  heading: string;
  /** Paragraphs, or list items when `list` is set. */
  lines: string[];
  list?: boolean;
}

export interface SignedCopyInput {
  /** "Toolbox talk", "RAMS", "Company policy", "Job pack". */
  kind: string;
  title: string;
  /** Firm name, shown under the title. */
  from?: string | null;
  /** Short facts: Date, Site, Job, Version. */
  facts?: Array<{ label: string; value: string | null | undefined }>;
  sections: SignedCopySection[];
  signerName?: string | null;
  signedAt: string;
  /** data: URL of the drawn signature (PNG or JPEG). */
  signature?: string | null;
  location?: unknown;
  device?: string | null;
}

const INK: [number, number, number] = [20, 20, 20];
const SOFT: [number, number, number] = [90, 90, 90];
const RULE: [number, number, number] = [205, 205, 205];

/** HTML (policies) to plain paragraphs and list items. */
export function htmlToSections(html: string): SignedCopySection[] {
  if (typeof DOMParser === 'undefined') return [{ heading: '', lines: [html] }];
  const doc = new DOMParser().parseFromString(html || '', 'text/html');
  const out: SignedCopySection[] = [];
  let cur: SignedCopySection = { heading: '', lines: [] };
  const push = () => {
    if (cur.heading || cur.lines.length) out.push(cur);
  };
  doc.body.querySelectorAll('h1, h2, h3, p, li').forEach((el) => {
    const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    if (!text) return;
    const tag = el.tagName.toLowerCase();
    if (tag === 'h1' || tag === 'h2' || tag === 'h3') {
      push();
      cur = { heading: text, lines: [] };
    } else if (tag === 'li') {
      cur.lines.push(`• ${text}`);
    } else if (!el.closest('li')) {
      cur.lines.push(text);
    }
  });
  push();
  return out;
}

function imageFormat(dataUrl: string): 'PNG' | 'JPEG' | null {
  if (/^data:image\/png/i.test(dataUrl)) return 'PNG';
  if (/^data:image\/jpe?g/i.test(dataUrl)) return 'JPEG';
  return null;
}

export function buildSignedCopyPdf(input: SignedCopyInput): jsPDF {
  const doc = new jsPDF('portrait', 'mm', 'a4');
  const pageW = doc.internal.pageSize.width;
  const pageH = doc.internal.pageSize.height;
  const margin = 18;
  const width = pageW - margin * 2;
  let y = margin;

  const ensure = (h: number) => {
    if (y + h > pageH - 20) {
      doc.addPage();
      y = margin;
    }
  };
  const text = (
    value: string,
    size: number,
    opts: { bold?: boolean; color?: [number, number, number]; gap?: number } = {}
  ) => {
    doc.setFont('helvetica', opts.bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(...(opts.color ?? INK));
    const lines = doc.splitTextToSize(value, width) as string[];
    const lh = size * 0.42;
    for (const line of lines) {
      ensure(lh);
      doc.text(line, margin, y);
      y += lh;
    }
    y += opts.gap ?? 1.5;
  };
  const rule = () => {
    ensure(4);
    doc.setDrawColor(...RULE);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 5;
  };

  text(input.kind.toUpperCase(), 9, { bold: true, color: SOFT, gap: 1 });
  text(input.title, 18, { bold: true, gap: 1 });
  if (input.from) text(input.from, 11, { color: SOFT, gap: 3 });
  const facts = (input.facts ?? []).filter((f) => f.value);
  if (facts.length) {
    for (const f of facts) text(`${f.label}: ${f.value}`, 10, { gap: 0.5 });
    y += 2;
  }
  rule();

  for (const s of input.sections) {
    const lines = s.lines.filter((l) => l && l.trim());
    if (lines.length === 0) continue;
    if (s.heading) text(s.heading, 12, { bold: true, gap: 1.5 });
    for (const l of lines) text(s.list && !l.startsWith('•') ? `• ${l}` : l, 10, { gap: 1.2 });
    y += 2;
  }

  ensure(70);
  rule();
  text('Signed', 12, { bold: true, gap: 2 });
  text('I confirm I have read and understood this document and will work to it.', 10, { gap: 3 });
  if (input.signature) {
    const fmt = imageFormat(input.signature);
    if (fmt) {
      try {
        ensure(30);
        doc.setDrawColor(...RULE);
        doc.rect(margin, y, 80, 28);
        doc.addImage(input.signature, fmt, margin + 2, y + 2, 76, 24, undefined, 'FAST');
        y += 32;
      } catch {
        /* an unreadable signature image: the record below still stands */
      }
    }
  }
  let when = input.signedAt;
  try {
    when = format(new Date(input.signedAt), "d MMMM yyyy 'at' HH:mm");
  } catch {
    /* keep the raw value */
  }
  if (input.signerName) text(`Name: ${input.signerName}`, 10, { gap: 0.8 });
  text(`Signed: ${when}`, 10, { gap: 0.8 });
  const place = describeLocation(input.location);
  text(`Where: ${place ?? 'Not recorded'}`, 10, { gap: 0.8 });
  if (input.device) text(`Device: ${input.device.slice(0, 160)}`, 8, { color: SOFT, gap: 0.8 });

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...SOFT);
    doc.text(
      `Signed copy made with Elec-Mate on ${format(new Date(), 'd MMM yyyy')}`,
      margin,
      pageH - 10
    );
    doc.text(`Page ${i} of ${pages}`, pageW - margin, pageH - 10, { align: 'right' });
  }
  return doc;
}

export async function downloadSignedCopy(input: SignedCopyInput): Promise<void> {
  const doc = buildSignedCopyPdf(input);
  const safe = `${input.kind} ${input.title}`
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 60);
  await saveOrSharePdf(doc, `${safe || 'Signed_copy'}_signed.pdf`);
}
