/**
 * Health and safety evidence pack (ELE-1985): the pages a firm attaches to an
 * SSIP or principal-contractor questionnaire. Built only from records the firm
 * holds: the safety score parts (get_firm_safety_overview) and the compliance
 * register. A part with no records says so; nothing is estimated.
 */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { supabase } from '@/integrations/supabase/client';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { getBrandColour, addAccentBar, readableTextOn } from '@/utils/pdfBrand';
import type { FirmSafetyOverview } from '@/hooks/useFirmSafetyOverview';
import type { ComplianceDocument } from '@/hooks/useComplianceDocuments';

const ukDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'No date';

const todayIso = () => new Date().toISOString().slice(0, 10);

export function registerStatus(
  expiry?: string | null
): 'In date' | 'Due in 30 days' | 'Overdue' | 'No date' {
  if (!expiry) return 'No date';
  const today = todayIso();
  if (expiry.slice(0, 10) < today) return 'Overdue';
  const in30 = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
  return expiry.slice(0, 10) <= in30 ? 'Due in 30 days' : 'In date';
}

export async function generateSafetyEvidencePdf(input: {
  overview: FirmSafetyOverview | null | undefined;
  documents: ComplianceDocument[];
}): Promise<jsPDF> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const firm = user ? ((await getActingEmployerId(user.id)) ?? user.id) : '';
  const { data: company } = await supabase
    .from('company_profiles')
    .select('company_name, accent_color, primary_color')
    .eq('user_id', firm)
    .maybeSingle();
  const co = company as {
    company_name: string | null;
    accent_color?: string | null;
    primary_color?: string | null;
  } | null;
  const brand = getBrandColour(co ?? undefined);

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const marginX = 14;
  addAccentBar(doc, brand, 4);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(30, 30, 30);
  doc.text('Health and safety evidence', marginX, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);
  doc.text(
    [co?.company_name || 'Our firm', `Produced ${ukDate(todayIso())} from our own records`].join(
      '  ·  '
    ),
    marginX,
    27
  );

  const o = input.overview;
  const pct = (v: number | null | undefined) => (v == null ? 'No records yet' : `${v}%`);
  let y = 36;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text('Safety score', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(
    o?.score == null
      ? 'Not started: there are not yet enough records to score.'
      : `${o.score} out of 100, from the last 30 to 90 days of records.`,
    marginX,
    y + 6
  );

  autoTable(doc, {
    startY: y + 10,
    margin: { left: marginX, right: marginX },
    theme: 'grid',
    headStyles: { fillColor: brand, textColor: readableTextOn(brand), fontStyle: 'bold' },
    styles: { fontSize: 9.5, cellPadding: 2.4 },
    head: [['What we measure', 'Result', 'Records behind it']],
    body: [
      [
        'Toolbox talks signed by those present (30 days)',
        pct(o?.parts?.briefings_signed),
        `${o?.briefings_30d ?? 0} talks, ${o?.briefing_signatures_30d ?? 0} signatures`,
      ],
      [
        'Near misses closed (90 days)',
        pct(o?.parts?.near_misses_closed),
        `${o?.near_misses_30d ?? 0} reported in 30 days`,
      ],
      [
        'Team records countersigned (90 days)',
        pct(o?.parts?.team_records_countersigned),
        `${o?.team_shared_90d ?? 0} shared, ${o?.to_countersign ?? 0} waiting`,
      ],
      [
        'COSHH assessments reviewed in date',
        pct(o?.parts?.coshh_in_date),
        `${o?.coshh_total ?? 0} assessments`,
      ],
      [
        'RAMS issued (90 days)',
        pct(o?.parts?.rams_issued),
        `${o?.rams_issued_90d ?? 0} of ${o?.rams_90d ?? 0} issued`,
      ],
      [
        'Accidents (30 days)',
        String(o?.accidents_30d ?? 0),
        `${o?.riddor_pending ?? 0} RIDDOR still to report`,
      ],
    ],
  });

  const afterScore =
    (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y + 60;
  y = afterScore + 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.text('Compliance register', marginX, y);

  const rows = [...input.documents]
    .sort((a, b) => (a.expiry_date ?? '9999').localeCompare(b.expiry_date ?? '9999'))
    .map((d) => [
      d.title,
      [d.category, d.document_type].filter(Boolean).join(', ') || 'Document',
      ukDate(d.expiry_date),
      registerStatus(d.expiry_date),
    ]);

  autoTable(doc, {
    startY: y + 4,
    margin: { left: marginX, right: marginX },
    theme: 'grid',
    headStyles: { fillColor: brand, textColor: readableTextOn(brand), fontStyle: 'bold' },
    styles: { fontSize: 9.5, cellPadding: 2.4 },
    head: [['Document', 'Type', 'Renews', 'Status']],
    body: rows.length ? rows : [['No documents on the register yet', '', '', '']],
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 3) {
        if (data.cell.raw === 'Overdue') data.cell.styles.textColor = [153, 27, 27];
        if (data.cell.raw === 'Due in 30 days') data.cell.styles.textColor = [146, 64, 14];
      }
    },
  });

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${i} of ${pages}`, pageW - marginX, doc.internal.pageSize.getHeight() - 8, {
      align: 'right',
    });
  }
  return doc;
}
