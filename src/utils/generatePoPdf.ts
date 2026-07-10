/**
 * generatePoPdf — client-side branded Purchase Order PDF (jsPDF, A4/mm).
 * Reuses the shared pdfBrand helpers so it picks up the owner's saved brand
 * colour and stays consistent with our other documents. Returns raw base64
 * (for emailing as an attachment) plus a blob URL (for preview/download).
 */
import jsPDF from 'jspdf';
import { supabase } from '@/integrations/supabase/client';
import { getBrandColour, addAccentBar, readableTextOn, ensureSpace, type RGB } from '@/utils/pdfBrand';
import type { MaterialOrder, Supplier, POLine } from '@/services/financeService';

const money = (v: number | null | undefined) =>
  `£${Number(v || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const fmtDate = (v?: string | null) => {
  if (!v) return new Date().toLocaleDateString('en-GB');
  try {
    return new Date(v).toLocaleDateString('en-GB');
  } catch {
    return v;
  }
};

interface CompanyBrand {
  company_name: string | null;
  company_phone: string | null;
  company_email: string | null;
  logo_data_url: string | null;
  logo_url: string | null;
  accent_color?: string | null;
  primary_color?: string | null;
}

export async function generatePoPdf(
  order: MaterialOrder,
  supplier: Supplier | undefined
): Promise<{ doc: jsPDF; base64: string; filename: string }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: company } = await supabase
    .from('company_profiles')
    .select('company_name, company_phone, company_email, logo_data_url, logo_url, accent_color, primary_color')
    .eq('user_id', user?.id ?? '')
    .maybeSingle();
  const brandCo = (company as CompanyBrand) ?? null;

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const marginX = 14;
  const brand: RGB = getBrandColour(brandCo);
  addAccentBar(doc, brand, 4);

  let y = 18;

  // Header — logo or company name left, PO meta right
  const logo = brandCo?.logo_data_url || null;
  if (logo && logo.startsWith('data:image')) {
    try {
      const fmt = /^data:image\/(jpe?g)/i.test(logo) ? 'JPEG' : 'PNG';
      doc.addImage(logo, fmt, marginX, y, 34, 16, undefined, 'FAST');
    } catch {
      /* ignore bad logo */
    }
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(brand[0], brand[1], brand[2]);
    doc.text(brandCo?.company_name || 'Your company', marginX, y + 8);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(brand[0], brand[1], brand[2]);
  doc.text('PURCHASE ORDER', pageW - marginX, y + 4, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  doc.text(order.order_number, pageW - marginX, y + 11, { align: 'right' });
  doc.text(`Date: ${fmtDate(order.order_date)}`, pageW - marginX, y + 16, { align: 'right' });
  if (order.expected_date) {
    doc.text(`Required by: ${fmtDate(order.expected_date)}`, pageW - marginX, y + 21, { align: 'right' });
  }

  y += order.expected_date ? 30 : 26;

  // Company contact line
  const contactBits = [brandCo?.company_phone, brandCo?.company_email].filter(Boolean).join('  ·  ');
  if (contactBits) {
    doc.setFontSize(9);
    doc.setTextColor(110, 110, 110);
    doc.text(contactBits, marginX, y);
    y += 8;
  }

  // Supplier + delivery blocks (two columns)
  const colW = (pageW - marginX * 2 - 8) / 2;
  const blockTop = y;
  doc.setFontSize(8);
  doc.setTextColor(140, 140, 140);
  doc.text('SUPPLIER', marginX, blockTop);
  doc.text(order.delivery_mode === 'Collection' ? 'COLLECTION' : 'DELIVER TO', marginX + colW + 8, blockTop);

  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  const supLines = [
    supplier?.name || 'Supplier',
    supplier?.contact_name || '',
    supplier?.account_number ? `A/C: ${supplier.account_number}` : '',
    supplier?.email || '',
    supplier?.phone || '',
  ].filter(Boolean);
  let sy = blockTop + 5;
  supLines.forEach((line) => {
    doc.text(String(line), marginX, sy);
    sy += 5;
  });

  const delLines =
    order.delivery_mode === 'Collection'
      ? ['Collection from branch']
      : (order.delivery_address || 'To be confirmed').split('\n');
  let dy = blockTop + 5;
  delLines.forEach((line) => {
    doc.text(String(line), marginX + colW + 8, dy);
    dy += 5;
  });

  y = Math.max(sy, dy) + 6;

  // Line items table
  const tableX = marginX;
  const tableW = pageW - marginX * 2;
  const cols = {
    desc: tableX + 2,
    qty: tableX + tableW - 62,
    unit: tableX + tableW - 40,
    total: tableX + tableW - 2,
  };

  const drawHeader = () => {
    doc.setFillColor(brand[0], brand[1], brand[2]);
    doc.rect(tableX, y, tableW, 8, 'F');
    const tc = readableTextOn(brand);
    doc.setTextColor(tc[0], tc[1], tc[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Description', cols.desc, y + 5.5);
    doc.text('Qty', cols.qty, y + 5.5, { align: 'right' });
    doc.text('Unit', cols.unit, y + 5.5, { align: 'right' });
    doc.text('Total', cols.total, y + 5.5, { align: 'right' });
    y += 8;
  };
  drawHeader();

  const items = (order.items as POLine[]) ?? [];
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(9);
  items.forEach((it, idx) => {
    y = ensureSpace(doc, y, 8, { bottomMargin: 30, topAfterBreak: 20, onNewPage: (d) => addAccentBar(d, brand, 4) });
    if (y === 20) drawHeader();
    if (idx % 2 === 1) {
      doc.setFillColor(245, 246, 248);
      doc.rect(tableX, y, tableW, 7, 'F');
    }
    const lineTotal = Number(it.qty) * Number(it.unit_cost);
    const desc = it.sku ? `${it.name}  (${it.sku})` : it.name;
    doc.text(doc.splitTextToSize(desc, tableW - 70)[0], cols.desc, y + 5);
    doc.text(String(it.qty), cols.qty, y + 5, { align: 'right' });
    doc.text(money(it.unit_cost), cols.unit, y + 5, { align: 'right' });
    doc.text(money(lineTotal), cols.total, y + 5, { align: 'right' });
    y += 7;
  });

  y += 4;
  const totalsX = tableX + tableW - 70;
  const totalsValX = tableX + tableW - 2;
  const totalRow = (label: string, value: string, bold = false) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(bold ? 11 : 9);
    doc.setTextColor(bold ? brand[0] : 70, bold ? brand[1] : 70, bold ? brand[2] : 70);
    doc.text(label, totalsX, y);
    doc.text(value, totalsValX, y, { align: 'right' });
    y += bold ? 7 : 5.5;
  };
  totalRow('Subtotal', money(order.subtotal));
  totalRow(`VAT (${Number(order.vat_rate)}%)`, money(order.vat_amount));
  totalRow('Total', money(order.total), true);

  // Notes
  if (order.notes) {
    y += 4;
    y = ensureSpace(doc, y, 20, { bottomMargin: 30, topAfterBreak: 20 });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 90);
    doc.text('Notes', marginX, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.splitTextToSize(order.notes, tableW).forEach((line: string) => {
      doc.text(line, marginX, y);
      y += 5;
    });
  }

  // Footer
  const pageH = doc.internal.pageSize.getHeight();
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    `${brandCo?.company_name || ''}  ·  Purchase order ${order.order_number}`,
    marginX,
    pageH - 10
  );

  const base64 = doc.output('datauristring').split(',')[1] ?? '';
  return { doc, base64, filename: `${order.order_number}.pdf` };
}
