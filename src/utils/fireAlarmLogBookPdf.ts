/**
 * Fire Alarm Log Book — Annex H PDF export (ELE-1396).
 *
 * Lays the digital log out on the BS 5839-1:2025 Annex H model: system
 * particulars up front, then the record tables per entry type in date order.
 * Client-side jsPDF (same stack as the completion certificate PDF) so the
 * export works offline on site with no round trip.
 */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { getBrandColour, readableTextOn, ensureSpace, fitContain } from '@/utils/pdfBrand';
import type {
  FireAlarmLogBook,
  FireAlarmLogEntry,
  LogEntryType,
} from '@/hooks/useFireAlarmLogBook';
import { ENTRY_TYPE_LABELS } from '@/hooks/useFireAlarmLogBook';

interface ExportOptions {
  book: FireAlarmLogBook;
  entries: FireAlarmLogEntry[];
  from?: string; // ISO date, inclusive
  to?: string; // ISO date, inclusive
  companyName?: string;
  brandColour?: string;
  /** 'save' shares/downloads the file (default); 'base64' returns it for emailing. */
  output?: 'save' | 'base64';
}

const fmtDate = (iso: string | null | undefined) =>
  iso ? format(new Date(iso + 'T00:00:00'), 'dd MMM yyyy') : '—';

/** Column layouts per entry type, mirroring the Annex H model tables. */
const TABLE_LAYOUT: Record<LogEntryType, { head: string[]; row: (e: FireAlarmLogEntry) => string[] }> = {
  weekly_test: {
    head: ['Date', 'Call point', 'Zone / location', 'Result', 'Tested by'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.call_point || '—',
      [e.data.zone, e.data.location].filter(Boolean).join(' — ') || '—',
      e.data.result || '—',
      e.tester_name || '—',
    ],
  },
  fault: {
    head: ['Date', 'Fault / device / zone', 'Cause', 'Remedial action', 'Resolved'],
    row: (e) => [
      fmtDate(e.entry_date),
      [e.data.description, e.data.device, e.data.zone].filter(Boolean).join(' — ') || '—',
      e.data.cause || '—',
      e.data.remedial_action || '—',
      e.resolved ? fmtDate(e.resolved_date) : 'OPEN',
    ],
  },
  false_alarm: {
    head: ['Date', 'Zone', 'Category', 'Cause', 'Action / investigation'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.zone || '—',
      e.data.category || '—',
      e.data.cause || '—',
      e.data.action || '—',
    ],
  },
  fire_event: {
    head: ['Date', 'Zone / origin', 'Details', 'Action taken', 'Recorded by'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.zone || '—',
      e.data.description || '—',
      e.data.action || '—',
      e.tester_name || '—',
    ],
  },
  drill: {
    head: ['Date', 'Drill details', 'Outcome', 'Recorded by'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.description || '—',
      e.data.outcome || '—',
      e.tester_name || '—',
    ],
  },
  monthly_check: {
    head: ['Date', 'Checks carried out', 'Defects', 'Recorded by'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.checks || '—',
      e.data.defects || 'None',
      e.tester_name || '—',
    ],
  },
  service: {
    head: ['Date', 'Contractor', 'Scope of work', 'Outcome', 'Next service due'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.contractor || '—',
      e.data.scope || '—',
      e.data.outcome || '—',
      fmtDate(e.data.next_due),
    ],
  },
  battery: {
    head: ['Date', 'Battery type', 'Location', 'Replaced by'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.battery_type || '—',
      e.data.location || '—',
      e.tester_name || '—',
    ],
  },
  panel_event: {
    head: ['Date', 'Event', 'Action taken', 'Recorded by'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.description || '—',
      e.data.action || '—',
      e.tester_name || '—',
    ],
  },
  variation: {
    head: ['Date', 'Variation description', 'Authorised by'],
    row: (e) => [fmtDate(e.entry_date), e.data.description || '—', e.data.authorised_by || '—'],
  },
  // Added only to keep this exhaustive Record type-valid after 'deviation'
  // joined LogEntryType. ⚠️ THIS FILE IS ORPHANED — the log book now renders
  // through PDFMonkey (ELE-1483, `fireAlarmLogBookJsonFormatter.ts`). Nothing
  // imports this. Delete it once a real PDFMonkey render has been eyeballed;
  // leaving a second export that nobody calls is how the two drift apart.
  deviation: {
    head: ['Date', 'Deviation', 'Reason', 'Agreed with'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.description || '—',
      e.data.reason || '—',
      e.data.agreed_with || '—',
    ],
  },
};

const SECTION_ORDER: LogEntryType[] = [
  'weekly_test',
  'monthly_check',
  'fire_event',
  'drill',
  'fault',
  'false_alarm',
  'service',
  'battery',
  'panel_event',
  'variation',
];

export async function exportFireAlarmLogBookPdf({
  book,
  entries,
  from,
  to,
  companyName,
  brandColour,
  output = 'save',
}: ExportOptions): Promise<string | void> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const brand = getBrandColour(brandColour);
  const onBrand = readableTextOn(brand);
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 14;

  const inRange = entries.filter(
    (e) => (!from || e.entry_date >= from) && (!to || e.entry_date <= to)
  );

  // ── Header ──
  doc.setFillColor(...brand);
  doc.rect(0, 0, pageW, 30, 'F');
  doc.setTextColor(...onBrand);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('Fire Detection & Alarm System — Log Book', margin, 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(
    'Kept in accordance with BS 5839-1:2025 Clause 48.2 and the Annex H model log book',
    margin,
    20
  );
  if (companyName) doc.text(companyName, margin, 26);

  // ── System particulars ──
  autoTable(doc, {
    startY: 36,
    theme: 'plain',
    styles: { fontSize: 9, cellPadding: 1.4, textColor: [30, 30, 30] },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 46 } },
    body: [
      ['Building', book.building_name],
      ['Address', book.building_address || '—'],
      ['System category', book.system_category || '—'],
      [
        'Control panel',
        [book.panel_make, book.panel_model].filter(Boolean).join(' ') || '—',
      ],
      ['Panel location', book.panel_location || '—'],
      ['Automatic detectors', book.detector_count != null ? String(book.detector_count) : '—'],
      ...(book.detector_count
        ? (() => {
            const yearAgo = new Date();
            yearAgo.setFullYear(yearAgo.getFullYear() - 1);
            const cutoff = `${yearAgo.getFullYear()}-${String(yearAgo.getMonth() + 1).padStart(2, '0')}-${String(yearAgo.getDate()).padStart(2, '0')}`;
            const fa = entries.filter(
              (e) => e.entry_type === 'false_alarm' && e.entry_date >= cutoff
            ).length;
            const rate = Math.round((100 * fa * 10) / book.detector_count) / 10;
            return [
              [
                'False alarm rate (Annex F)',
                `${rate} per 100 detectors/yr (${fa} in last 12 months)${rate > 4 ? ' — investigation trigger exceeded' : ''}`,
              ],
            ] as [string, string][];
          })()
        : []),
      ['ARC connection', book.arc_connected ? `Yes${book.arc_phone ? ` — ${book.arc_phone}` : ''}` : 'No'],
      ['Servicing organisation',
        [book.servicing_org, book.servicing_org_phone].filter(Boolean).join(' — ') || '—'],
      ['Commissioning cert ref', book.commissioning_cert_ref || '—'],
      ['Responsible person', book.responsible_person || '—'],
      ['Weekly test day', book.weekly_test_day ? book.weekly_test_day[0].toUpperCase() + book.weekly_test_day.slice(1) : '—'],
      [
        'Period covered',
        `${from ? fmtDate(from) : 'Start of record'} to ${to ? fmtDate(to) : format(new Date(), 'dd MMM yyyy')}`,
      ],
      ['Exported', format(new Date(), 'dd MMM yyyy HH:mm')],
    ],
  });

  // ── Entry sections ──
  for (const type of SECTION_ORDER) {
    const rows = inRange
      .filter((e) => e.entry_type === type)
      .sort((a, b) => a.entry_date.localeCompare(b.entry_date));
    if (!rows.length) continue;

    const layout = TABLE_LAYOUT[type];
    const lastY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable
      ?.finalY;
    let y = (lastY ?? 36) + 9;
    y = ensureSpace(doc, y, 24, { bottomMargin: 18, topAfterBreak: 18 });

    doc.setTextColor(...brand);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(ENTRY_TYPE_LABELS[type], margin, y);

    autoTable(doc, {
      startY: y + 3,
      head: [layout.head],
      body: rows.map(layout.row),
      styles: { fontSize: 8.5, cellPadding: 1.6, textColor: [30, 30, 30] },
      headStyles: { fillColor: brand, textColor: onBrand, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: margin, right: margin },
    });
  }

  if (!inRange.length) {
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(10);
    doc.text('No log entries in the selected period.', margin, 50);
  }

  // ── Photograph appendix — evidence attached to entries in the period ──
  const withPhotos = inRange
    .filter((e) => e.data.photo?.startsWith('data:image'))
    .sort((a, b) => a.entry_date.localeCompare(b.entry_date));
  if (withPhotos.length) {
    const lastY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable
      ?.finalY;
    let y = ensureSpace(doc, (lastY ?? 40) + 10, 70, { bottomMargin: 18, topAfterBreak: 18 });
    doc.setTextColor(...brand);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Photographs', margin, y);
    y += 5;
    for (const e of withPhotos) {
      y = ensureSpace(doc, y, 62, { bottomMargin: 18, topAfterBreak: 18 });
      try {
        const props = doc.getImageProperties(e.data.photo);
        const box = fitContain(props.width, props.height, margin, y, 70, 52);
        doc.addImage(e.data.photo, 'JPEG', box.x, box.y, box.w, box.h);
      } catch {
        // Undecodable image — skip rather than break the export
      }
      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(
        `${fmtDate(e.entry_date)} — ${ENTRY_TYPE_LABELS[e.entry_type]}`,
        margin + 74,
        y + 6
      );
      const summaryText = doc.splitTextToSize(
        e.data.description || e.data.cause || e.data.call_point
          ? [e.data.call_point && `CP ${e.data.call_point}`, e.data.description, e.data.cause]
              .filter(Boolean)
              .join(' — ')
          : '',
        pageW - margin * 2 - 78
      );
      if (summaryText.length) doc.text(summaryText, margin + 74, y + 12);
      y += 58;
    }
  }

  // ── Footer on every page ──
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    const h = doc.internal.pageSize.getHeight();
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `${book.building_name} — fire alarm log book · Page ${i} of ${pages}`,
      margin,
      h - 7
    );
  }

  if (output === 'base64') {
    return doc.output('datauristring').split(',')[1];
  }

  const safeName = book.building_name.replace(/[^\w\- ]+/g, '').trim().replace(/ +/g, '-');
  await saveOrSharePdf(doc, `fire-alarm-log-${safeName}-${format(new Date(), 'yyyyMMdd')}.pdf`);
}
