/**
 * generateQuotePosterPdf — a print-ready A4 "Scan to get a quote" poster for the
 * van / job site, branded to the firm. Framed by top & bottom brand bands with
 * the core block (headline + big QR + link) centred between them. The QR is
 * passed in as a PNG data URL (rendered from the on-screen QRCodeSVG).
 */
import jsPDF from 'jspdf';
import { supabase } from '@/integrations/supabase/client';
import { getBrandColour, readableTextOn, type RGB } from '@/utils/pdfBrand';

export async function generateQuotePosterPdf(
  companyName: string,
  url: string,
  qrDataUrl: string
): Promise<{ doc: jsPDF; filename: string }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: company } = await supabase
    .from('company_profiles')
    .select('logo_data_url, logo_url, accent_color, primary_color')
    .eq('user_id', user?.id ?? '')
    .maybeSingle();
  const brand: RGB = getBrandColour(
    company as { accent_color?: string | null; primary_color?: string | null } | null
  );
  const onBrand = readableTextOn(brand);
  const name = companyName?.trim() || 'Your electrician';

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth(); // 210
  const pageH = doc.internal.pageSize.getHeight(); // 297
  const cx = pageW / 2;

  // ── Top brand band with the firm's logo or name ──────────────────────────
  const bandH = 44;
  doc.setFillColor(brand[0], brand[1], brand[2]);
  doc.rect(0, 0, pageW, bandH, 'F');

  const logo = (company as { logo_data_url?: string | null })?.logo_data_url || null;
  let nameBelowBand = false;
  if (logo && logo.startsWith('data:image')) {
    try {
      const fmt = /^data:image\/(jpe?g)/i.test(logo) ? 'JPEG' : 'PNG';
      doc.addImage(logo, fmt, cx - 24, 10, 48, 24, undefined, 'FAST');
      nameBelowBand = true;
    } catch {
      /* fall back to name in band */
    }
  }
  if (!nameBelowBand) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(onBrand[0], onBrand[1], onBrand[2]);
    doc.text(name, cx, 27, { align: 'center' });
  }

  let y = nameBelowBand ? bandH + 16 : bandH + 22;
  if (nameBelowBand) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(brand[0], brand[1], brand[2]);
    doc.text(name, cx, y, { align: 'center' });
    y += 18;
  }

  // ── Headline ──────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(38);
  doc.setTextColor(17, 17, 17);
  doc.text('SCAN TO GET', cx, y, { align: 'center' });
  y += 15;
  doc.text('A QUOTE', cx, y, { align: 'center' });
  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(90, 90, 90);
  doc.text('Point your phone camera at the code — no app needed.', cx, y, { align: 'center' });
  y += 12;

  // ── QR on a white card ──────────────────────────────────────────────────
  const qrSize = 96;
  const qrX = cx - qrSize / 2;
  doc.setDrawColor(228, 228, 228);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(qrX - 8, y - 8, qrSize + 16, qrSize + 16, 5, 5, 'FD');
  try {
    doc.addImage(qrDataUrl, 'PNG', qrX, y, qrSize, qrSize, undefined, 'FAST');
  } catch {
    /* QR failed — poster still prints with the link + value line */
  }
  y += qrSize + 20;

  // ── Link + value line ─────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(brand[0], brand[1], brand[2]);
  doc.text(url.replace(/^https?:\/\//, ''), cx, y, { align: 'center' });
  y += 11;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12.5);
  doc.setTextColor(110, 110, 110);
  doc.text('Free quotes · Fully qualified · Fast response', cx, y, { align: 'center' });

  // ── Bottom brand band ─────────────────────────────────────────────────────
  const footH = 16;
  doc.setFillColor(brand[0], brand[1], brand[2]);
  doc.rect(0, pageH - footH, pageW, footH, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(onBrand[0], onBrand[1], onBrand[2]);
  doc.text('Powered by Elec-Mate', cx, pageH - footH / 2 + 1.5, { align: 'center' });

  return {
    doc,
    filename: `${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-quote-poster.pdf`,
  };
}
