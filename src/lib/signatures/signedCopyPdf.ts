/**
 * ELE-1993 — the signed copy: the document as the client saw it, then a
 * signature page (statement, signature, name, time, IP, device and the
 * document fingerprint). For a certificate whose PDF we host, the
 * certificate's own pages come first and the signature page is appended.
 *
 * Built in the browser from the frozen copy on the request, so the office
 * and the client download the same thing. jsPDF and pdf-lib load on demand.
 *
 * A PAPER signature (recorded by the office from a scan) gets a page that
 * says plainly it was signed on paper, who recorded it and when, and the
 * declaration they made, followed by the scan itself. It never claims an
 * electronic signature.
 */
import { gbp, ukDate, isStablePdfLink, type DocumentSnapshot } from '@/lib/signatures/types';
import { buildTermsList } from '@/utils/quoteTerms';
import { contractPlainText } from '@/lib/signatures/contractText';

export interface SignedCopyInput {
  requestId: string;
  documentTitle: string;
  documentType: string | null;
  document: DocumentSnapshot | null;
  companyName: string;
  signerName: string;
  signedAt: string | null;
  statement: string | null;
  method: 'drawn' | 'typed' | 'paper' | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  documentHash: string | null;
  /** PNG data URL; null prints "signature held on file" instead. */
  signatureDataUrl: string | null;
  /** Set for a paper signature. */
  paper?: PaperInfo | null;
}

export interface PaperInfo {
  /** Date on the paper (yyyy-MM-dd or ISO). */
  signedOn: string | null;
  recordedBy: string | null;
  recordedAt: string | null;
  declaration: string | null;
  scanSha256: string | null;
  /** The scan bytes; null when only the company holds it (the client's copy). */
  scan: { blob: Blob; mime: string } | null;
}

/** Any image the browser can decode, as a JPEG data URL no wider than 2000px. */
async function imageToJpeg(blob: Blob): Promise<{ dataUrl: string; w: number; h: number } | null> {
  try {
    const bmp = await createImageBitmap(blob);
    const scale = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
    const w = Math.round(bmp.width * scale);
    const h = Math.round(bmp.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(bmp, 0, 0, w, h);
    return { dataUrl: canvas.toDataURL('image/jpeg', 0.9), w, h };
  } catch {
    return null;
  }
}

// jsPDF's standard fonts are WinAnsi: swap the characters it cannot draw.
const clean = (s: unknown) =>
  String(s ?? '')
    .replace(/[—–−]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
    .replace(/•/g, '-')
    .split('')
    .filter((ch) => {
      const c = ch.charCodeAt(0);
      return c === 9 || c === 10 || c === 13 || (c >= 32 && c <= 126) || (c >= 160 && c <= 255);
    })
    .join('');

const money = (v: unknown) => clean(gbp(v as number));

function describeDevice(ua?: string | null) {
  if (!ua) return 'Not recorded';
  const os = /iPhone/.test(ua)
    ? 'iPhone'
    : /iPad/.test(ua)
      ? 'iPad'
      : /Android/.test(ua)
        ? 'Android'
        : /Mac OS X/.test(ua)
          ? 'Mac'
          : /Windows/.test(ua)
            ? 'Windows'
            : 'Unknown device';
  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /CriOS|Chrome\//.test(ua)
      ? 'Chrome'
      : /FxiOS|Firefox\//.test(ua)
        ? 'Firefox'
        : /Safari\//.test(ua)
          ? 'Safari'
          : 'browser';
  return `${os}, ${browser}`;
}

export async function buildSignedCopyPdf(input: SignedCopyInput): Promise<Blob> {
  const { default: jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210;
  const M = 18;
  const CW = W - M * 2;
  let y = M;

  const ensure = (h: number) => {
    if (y + h > 297 - M) {
      pdf.addPage();
      y = M;
    }
  };
  const text = (
    s: unknown,
    opts: { size?: number; bold?: boolean; colour?: [number, number, number]; gap?: number } = {}
  ) => {
    const size = opts.size ?? 10.5;
    pdf.setFont('helvetica', opts.bold ? 'bold' : 'normal');
    pdf.setFontSize(size);
    pdf.setTextColor(...(opts.colour ?? [15, 23, 42]));
    const lines = pdf.splitTextToSize(clean(s), CW) as string[];
    const lh = size * 0.42;
    for (const line of lines) {
      ensure(lh);
      pdf.text(line, M, y);
      y += lh;
    }
    y += opts.gap ?? 2;
  };
  const pair = (label: string, value: unknown, bold = false) => {
    ensure(6);
    pdf.setFontSize(10.5);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(71, 85, 105);
    pdf.text(clean(label), M, y);
    pdf.setFont('helvetica', bold ? 'bold' : 'normal');
    pdf.setTextColor(15, 23, 42);
    pdf.text(clean(value), W - M, y, { align: 'right' });
    y += 6;
  };
  const rule = () => {
    ensure(4);
    pdf.setDrawColor(226, 232, 240);
    pdf.line(M, y, W - M, y);
    y += 4;
  };
  const heading = (s: string) => {
    y += 2;
    text(s.toUpperCase(), { size: 8.5, bold: true, colour: [100, 116, 139], gap: 1 });
  };

  // ---------------------------------------------------------------- document
  text(input.companyName, { size: 10, bold: true, colour: [71, 85, 105], gap: 1 });
  text(input.documentTitle, { size: 17, bold: true, gap: 3 });
  rule();

  const d = input.document;
  if (!d) {
    text('This request was made before documents were attached to signature requests.');
  } else if (d.kind === 'quote' || d.kind === 'invoice') {
    if (d.client || d.address)
      text([d.client && `For ${d.client}`, d.address].filter(Boolean).join(', '));
    if (d.title) text(d.title, { bold: true });
    if (d.description) text(d.description);
    const lines = d.line_items ?? [];
    if (lines.length) {
      heading('What is included');
      for (const l of lines) {
        text(
          `${l.description ?? ''}${l.quantity != null ? `  (${Number(l.quantity).toLocaleString('en-GB')}${l.unit ? ` ${l.unit}` : ''})` : ''}`,
          { gap: 1 }
        );
      }
    }
    y += 2;
    rule();
    if (d.subtotal != null) pair('Subtotal', money(d.subtotal));
    if (d.reverse_charge) pair('VAT (reverse charge)', 'Customer to account');
    else if (d.vat_rate != null) pair(`VAT at ${Number(d.vat_rate)}%`, money(d.vat_amount));
    pair('Total', money(d.total), true);
    if (d.deposit) pair('Deposit before work starts', money(d.deposit));
    if (d.kind === 'quote' && d.valid_until) pair('Valid until', ukDate(d.valid_until));
    if (d.kind === 'invoice' && d.due_date) pair('Payment due', ukDate(d.due_date));
    if (d.kind === 'quote' && d.terms) {
      heading('Terms');
      for (const term of buildTermsList(d.terms)) text(`- ${term}`, { gap: 1 });
    }
  } else if (d.kind === 'variation') {
    text([d.job_title, d.client, d.address].filter(Boolean).join(', '));
    heading('What is changing');
    text(d.description);
    if (d.notes) text(d.notes, { colour: [71, 85, 105] });
    rule();
    pair('Agreed price before this change', money(d.agreed_before));
    const ch = Number(d.change || 0);
    pair('This change', `${ch < 0 ? '-' : '+'}${money(Math.abs(ch))}`);
    pair('New agreed price', money(d.new_total), true);
  } else if (d.kind === 'handover') {
    text([d.client, d.address].filter(Boolean).join(', '));
    if (d.description) {
      heading('The work');
      text(d.description);
    }
    if (d.started) pair('Started', ukDate(d.started));
    if (d.completed) pair('Completed', ukDate(d.completed));
    if (d.checklist?.length) {
      heading('Checked before handover');
      for (const c of d.checklist) text(`${c.done ? '[x]' : '[ ]'} ${c.title}`, { gap: 1 });
    }
    heading('Certificates handed over');
    if (!d.certificates?.length) text('None attached.');
    for (const c of d.certificates ?? []) {
      text(`${c.type}${c.number ? ` ${c.number}` : ''}${c.date ? `, ${ukDate(c.date)}` : ''}`, {
        gap: 1,
      });
    }
    if (d.outstanding?.length) {
      heading('Still open on this job');
      for (const o of d.outstanding) text(`- ${o.title}`, { gap: 1 });
    }
  } else if (d.kind === 'certificate') {
    text([d.client, d.address].filter(Boolean).join(', '));
    if (d.date) pair('Date of work', ukDate(d.date));
    if (d.inspector) pair('Carried out by', d.inspector);
    if (d.outcome) pair('Overall result', d.outcome);
    if (d.next_due) pair('Next inspection', ukDate(d.next_due));
    if (isStablePdfLink(d.pdf_url)) {
      text('The full certificate is attached before this page.', { colour: [71, 85, 105] });
    }
  } else if (d.kind === 'contract') {
    if (d.party_name) text(`Between ${input.companyName} and ${d.party_name}`);
    if (d.start_date) pair('Starts', ukDate(d.start_date));
    if (d.end_date) pair('Ends', ukDate(d.end_date));
    rule();
    // Templates are HTML — print readable text, not tags (ELE-1982)
    text(contractPlainText(d.content));
  }

  // ---------------------------------------------------------------- signature page
  pdf.addPage();
  const sigFirstPage = pdf.getNumberOfPages();
  y = M;
  const paper = input.method === 'paper' ? (input.paper ?? null) : null;
  let scanPdf: ArrayBuffer | null = null;

  if (input.method === 'paper') {
    text('Signature record: signed on paper', { size: 17, bold: true, gap: 1 });
    text(input.documentTitle, { size: 11, colour: [71, 85, 105], gap: 4 });
    rule();
    text(
      `This document was signed by hand on a printed copy. It was not signed electronically. ${input.companyName} recorded the signed paper in Elec-Mate${paper?.scan ? ' and a scan of it follows this page' : ' and holds the scan'}.`,
      { size: 11 }
    );
    y += 2;
    pair('Signed by', input.signerName, true);
    pair(
      'Date signed',
      paper?.signedOn
        ? ukDate(paper.signedOn)
        : input.signedAt
          ? ukDate(input.signedAt)
          : 'Not recorded'
    );
    pair('How', 'On paper');
    if (paper?.recordedBy) pair('Recorded by', paper.recordedBy);
    if (paper?.recordedAt) pair('Recorded on', clean(ukDate(paper.recordedAt, true)));
    pair('Request reference', input.requestId.slice(0, 8).toUpperCase());
    if (paper?.declaration) {
      y += 2;
      heading('Declaration by the person who recorded it');
      text(paper.declaration, { size: 11 });
    }
    y += 2;
    heading('Document fingerprint (SHA-256)');
    text(input.documentHash || 'Not recorded', { size: 9, colour: [71, 85, 105] });
    text('Calculated from the document as it stood when the paper signature was recorded.', {
      size: 9,
      colour: [100, 116, 139],
    });
    if (paper?.scanSha256) {
      heading('Scan fingerprint (SHA-256)');
      text(paper.scanSha256, { size: 9, colour: [71, 85, 105] });
      text(
        'Calculated from the scan exactly as it was uploaded. If the file is changed, this changes.',
        {
          size: 9,
          colour: [100, 116, 139],
        }
      );
    }
    y += 2;
    text(`Recorded by ${input.companyName} using Elec-Mate.`, { size: 9, colour: [100, 116, 139] });

    // The scan: an image is drawn on its own page; a PDF is appended below.
    if (paper?.scan) {
      const isPdf = /pdf/i.test(paper.scan.mime);
      if (isPdf) {
        scanPdf = await paper.scan.blob.arrayBuffer();
      } else {
        const img = await imageToJpeg(paper.scan.blob);
        pdf.addPage();
        y = M;
        text('Scan of the signed paper', { size: 13, bold: true, gap: 3 });
        if (img) {
          const maxW = CW;
          const maxH = 297 - M - y - 12;
          const ratio = Math.min(maxW / img.w, maxH / img.h);
          const w = img.w * ratio;
          const h = img.h * ratio;
          pdf.addImage(img.dataUrl, 'JPEG', M + (CW - w) / 2, y, w, h, undefined, 'FAST');
        } else {
          text(
            `This photo format cannot be drawn here. ${input.companyName} holds the original file.`
          );
        }
      }
    }
  } else {
    text('Signature record', { size: 17, bold: true, gap: 1 });
    text(input.documentTitle, { size: 11, colour: [71, 85, 105], gap: 4 });
    rule();
    heading('Statement agreed');
    text(input.statement || 'I have read this document and I agree to it.', { size: 11 });
    y += 2;
    heading('Signature');
    ensure(40);
    pdf.setDrawColor(203, 213, 225);
    pdf.roundedRect(M, y, CW, 38, 2, 2);
    if (input.signatureDataUrl) {
      try {
        pdf.addImage(input.signatureDataUrl, 'PNG', M + 4, y + 3, CW - 8, 32, undefined, 'FAST');
      } catch {
        pdf.setFontSize(10);
        pdf.text('Signature held on file by the company.', M + 4, y + 20);
      }
    } else {
      pdf.setFontSize(10);
      pdf.setTextColor(71, 85, 105);
      pdf.text(
        `Signed electronically by ${clean(input.signerName)}. Image held on file by the company.`,
        M + 4,
        y + 20
      );
    }
    y += 44;
    pair('Signed by', input.signerName, true);
    pair('Date and time', input.signedAt ? clean(ukDate(input.signedAt, true)) : 'Not signed');
    pair(
      'How',
      input.method === 'typed'
        ? 'Typed name'
        : input.method === 'drawn'
          ? 'Drawn on screen'
          : 'Electronic'
    );
    pair('IP address', input.ipAddress || 'Not recorded');
    pair('Device', describeDevice(input.userAgent));
    pair('Request reference', input.requestId.slice(0, 8).toUpperCase());
    y += 2;
    heading('Document fingerprint (SHA-256)');
    text(input.documentHash || 'Not recorded', { size: 9, colour: [71, 85, 105] });
    text(
      'The fingerprint is calculated from the exact document shown to the signer. If the document is changed, the fingerprint changes.',
      { size: 9, colour: [100, 116, 139] }
    );
    y += 2;
    text(`Sent by ${input.companyName} using Elec-Mate.`, { size: 9, colour: [100, 116, 139] });
  }

  // page numbers
  const n = pdf.getNumberOfPages();
  for (let i = 1; i <= n; i++) {
    pdf.setPage(i);
    pdf.setFontSize(8);
    pdf.setTextColor(148, 163, 184);
    pdf.text(`${clean(input.documentTitle)}  |  page ${i} of ${n}`, W / 2, 297 - 8, {
      align: 'center',
    });
  }

  const ours = pdf.output('arraybuffer');
  const isCert = d?.kind === 'certificate' && isStablePdfLink(d.pdf_url);
  if (!isCert && !scanPdf) return new Blob([ours], { type: 'application/pdf' });

  // Certificate: its own PDF first, then the signature pages. A PDF scan of
  // a paper signature goes on the end.
  try {
    const { PDFDocument } = await import('pdf-lib');
    const sigDoc = await PDFDocument.load(ours);
    const out = await PDFDocument.create();
    let certDone = false;
    if (isCert && d?.kind === 'certificate' && d.pdf_url) {
      try {
        const res = await fetch(d.pdf_url);
        if (res.ok) {
          const certDoc = await PDFDocument.load(await res.arrayBuffer());
          for (const p of await out.copyPages(certDoc, certDoc.getPageIndices())) out.addPage(p);
          certDone = true;
        }
      } catch {
        certDone = false;
      }
    }
    const from = certDone ? sigFirstPage - 1 : 0;
    const idx = sigDoc.getPageIndices().filter((i) => i >= from);
    for (const p of await out.copyPages(sigDoc, idx)) out.addPage(p);
    if (scanPdf) {
      try {
        const scanDoc = await PDFDocument.load(scanPdf, { ignoreEncryption: true });
        for (const p of await out.copyPages(scanDoc, scanDoc.getPageIndices())) out.addPage(p);
      } catch {
        // an unreadable PDF: the signature page still says the company holds it
      }
    }
    const bytes = await out.save();
    return new Blob([bytes as BlobPart], { type: 'application/pdf' });
  } catch {
    return new Blob([ours], { type: 'application/pdf' });
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export const signedCopyFilename = (title: string) =>
  `Signed - ${
    clean(title)
      .replace(/[\\/:*?"<>|]+/g, '')
      .slice(0, 80)
      .trim() || 'document'
  }.pdf`;
