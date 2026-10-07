/**
 * Print-ready "Scan for a quote" artwork for a firm's quote page (ELE-1989).
 *
 *  - 'poster' — A4 portrait for a window, noticeboard or job site.
 *  - 'van'    — A4 landscape panel for a van door / rear window: huge QR,
 *               the firm name, phone and the short link. A sign-writer can
 *               scale it, or use the SVG QR from the Quote page screen.
 *
 * The QR is passed in as a PNG data URL (rendered from the on-screen SVG).
 * Only claims the firm can stand behind: no "fully qualified" or "registered"
 * wording unless it comes from the firm's own profile.
 */
import jsPDF from 'jspdf';
import { getBrandColour, readableTextOn, type RGB } from '@/utils/pdfBrand';

export interface QuoteArtworkInput {
  companyName: string;
  url: string;
  qrDataUrl: string;
  colour?: string | null;
  logo?: string | null;
  phone?: string | null;
  /** e.g. "NAPIT registered" — only pass when the profile says so */
  trustLine?: string | null;
}

async function logoAsDataUrl(logo?: string | null): Promise<string | null> {
  if (!logo) return null;
  if (logo.startsWith('data:image')) return logo;
  try {
    const res = await fetch(logo, { mode: 'cors' });
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string | null>((resolve) => {
      const r = new FileReader();
      r.onload = () => resolve(typeof r.result === 'string' ? r.result : null);
      r.onerror = () => resolve(null);
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function addLogo(doc: jsPDF, logo: string | null, x: number, y: number, w: number, h: number) {
  if (!logo) return false;
  try {
    const fmt = /^data:image\/(jpe?g)/i.test(logo) ? 'JPEG' : 'PNG';
    const props = doc.getImageProperties(logo);
    const ratio = Math.min(w / props.width, h / props.height);
    const dw = props.width * ratio;
    const dh = props.height * ratio;
    doc.addImage(logo, fmt, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, undefined, 'FAST');
    return true;
  } catch {
    return false;
  }
}

const shortUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/^www\./, '');

export async function generateQuotePosterPdf(
  input: QuoteArtworkInput,
  variant: 'poster' | 'van' = 'poster'
): Promise<{ doc: jsPDF; filename: string }> {
  const brand: RGB = getBrandColour(input.colour ?? undefined);
  const onBrand = readableTextOn(brand);
  const name = input.companyName?.trim() || 'Your electrician';
  const logo = await logoAsDataUrl(input.logo);
  const safe = name.replace(/[^a-z0-9]+/gi, '-').toLowerCase();

  if (variant === 'van') {
    const doc = new jsPDF('l', 'mm', 'a4');
    const W = doc.internal.pageSize.getWidth(); // 297
    const H = doc.internal.pageSize.getHeight(); // 210
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, W, H, 'F');
    // Left brand panel with the QR on a white tile
    const panelW = 150;
    doc.setFillColor(brand[0], brand[1], brand[2]);
    doc.rect(0, 0, panelW, H, 'F');
    const qr = 118;
    const qx = (panelW - qr) / 2;
    const qy = (H - qr) / 2 - 6;
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(qx - 8, qy - 8, qr + 16, qr + 16, 6, 6, 'F');
    try {
      doc.addImage(input.qrDataUrl, 'PNG', qx, qy, qr, qr, undefined, 'FAST');
    } catch {
      /* link below still works */
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(onBrand[0], onBrand[1], onBrand[2]);
    doc.text('SCAN FOR A QUOTE', panelW / 2, qy + qr + 22, { align: 'center' });

    // Right: name, phone, link
    const rx = panelW + 16;
    const rw = W - rx - 14;
    let y = 30;
    if (addLogo(doc, logo, rx, 16, rw, 34)) y = 66;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 17, 17);
    doc.setFontSize(28);
    const nameLines = doc.splitTextToSize(name, rw) as string[];
    doc.text(nameLines.slice(0, 2), rx, y + 10);
    y += 10 + nameLines.slice(0, 2).length * 12;
    if (input.trustLine) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(14);
      doc.setTextColor(70, 70, 70);
      doc.text(input.trustLine, rx, y + 4);
      y += 12;
    }
    if (input.phone) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(34);
      doc.setTextColor(brand[0], brand[1], brand[2]);
      // Light brand colours vanish on white: fall back to near-black
      if (onBrand[0] < 128) doc.setTextColor(17, 17, 17);
      doc.text(input.phone, rx, y + 22);
      y += 32;
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(15);
    doc.setTextColor(60, 60, 60);
    doc.text(shortUrl(input.url), rx, Math.max(y + 14, H - 30));
    doc.setFontSize(11);
    doc.text('Free, no-obligation quotes. Point your phone camera at the code.', rx, Math.max(y + 22, H - 22));
    return { doc, filename: `${safe}-van-qr.pdf` };
  }

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth(); // 210
  const pageH = doc.internal.pageSize.getHeight(); // 297
  const cx = pageW / 2;

  const bandH = 44;
  doc.setFillColor(brand[0], brand[1], brand[2]);
  doc.rect(0, 0, pageW, bandH, 'F');
  let y: number;
  if (logo) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(cx - 30, 7, 60, 30, 4, 4, 'F');
  }
  if (addLogo(doc, logo, cx - 27, 9, 54, 26)) {
    y = bandH + 16;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(17, 17, 17);
    doc.text(name, cx, y, { align: 'center' });
    y += 18;
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(onBrand[0], onBrand[1], onBrand[2]);
    doc.text(name, cx, 27, { align: 'center' });
    y = bandH + 22;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(38);
  doc.setTextColor(17, 17, 17);
  doc.text('SCAN TO GET', cx, y, { align: 'center' });
  y += 15;
  doc.text('A QUOTE', cx, y, { align: 'center' });
  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(70, 70, 70);
  doc.text('Point your phone camera at the code. No app needed.', cx, y, { align: 'center' });
  y += 12;

  const qrSize = 96;
  const qrX = cx - qrSize / 2;
  doc.setDrawColor(228, 228, 228);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(qrX - 8, y - 8, qrSize + 16, qrSize + 16, 5, 5, 'FD');
  try {
    doc.addImage(input.qrDataUrl, 'PNG', qrX, y, qrSize, qrSize, undefined, 'FAST');
  } catch {
    /* poster still prints with the link */
  }
  y += qrSize + 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(17, 17, 17);
  doc.text(shortUrl(input.url), cx, y, { align: 'center' });
  y += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12.5);
  doc.setTextColor(70, 70, 70);
  const value = ['Free, no-obligation quotes', input.trustLine, input.phone ? `Call ${input.phone}` : null]
    .filter(Boolean)
    .join('  ·  ');
  doc.text(value, cx, y, { align: 'center' });

  const footH = 16;
  doc.setFillColor(brand[0], brand[1], brand[2]);
  doc.rect(0, pageH - footH, pageW, footH, 'F');

  return { doc, filename: `${safe}-quote-poster.pdf` };
}
