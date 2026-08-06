import { format, parseISO } from 'date-fns';
import {
  ENTRY_TYPE_LABELS,
  type FireAlarmLogBook,
  type FireAlarmLogEntry,
  type LogEntryType,
} from '@/hooks/useFireAlarmLogBook';
import type { CertBranding } from '@/utils/certBranding';

/**
 * Fire Alarm Log Book → PDFMonkey payload (ELE-1483).
 *
 * Template `A89B34B4-018F-45AE-A6C0-3AFCA4A595A6`, authoritative HTML at
 * `docs/templates/fire-alarm-log-book-template.html`.
 *
 * This replaces the client-side jsPDF export in `fireAlarmLogBookPdf.ts`. The
 * table layouts below are PORTED from that file rather than reinvented — it was
 * the working specification for what an Annex H record contains, and changing
 * the content while changing the engine would make a rendering regression
 * indistinguishable from a deliberate edit.
 *
 * Keys are snake_case to match the rest of the fire alarm series (G1–G7).
 *
 * ⚠️ The template is the contract. Adding a key here that the Liquid does not
 * read is silent dead weight; removing one it does read prints blank. Once this
 * is registered in `scripts/check-cert-mapping.mjs`, `npm run check:cert-mapping`
 * enforces that — which is the main reason for moving off jsPDF at all.
 */

const FIRE_ACCENT = '#dc2626';

const fmtDate = (d?: string | null): string => {
  if (!d) return '';
  try {
    return format(parseISO(d), 'dd MMM yyyy');
  } catch {
    return String(d);
  }
};

/** Column headings and row shape per entry type — ported from the jsPDF export. */
const TABLE_LAYOUT: Record<
  LogEntryType,
  { head: string[]; row: (e: FireAlarmLogEntry) => string[] }
> = {
  weekly_test: {
    head: ['Date', 'Call point', 'Zone / location', 'Result', 'Tested by'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.call_point || '',
      [e.data.zone, e.data.location].filter(Boolean).join(' — '),
      e.data.result || '',
      e.tester_name || '',
    ],
  },
  monthly_check: {
    head: ['Date', 'Checks carried out', 'Defects', 'Recorded by'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.checks || '',
      e.data.defects || 'None',
      e.tester_name || '',
    ],
  },
  fire_event: {
    head: ['Date', 'Zone / origin', 'Details', 'Action taken', 'Recorded by'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.zone || '',
      e.data.description || '',
      e.data.action || '',
      e.tester_name || '',
    ],
  },
  drill: {
    head: ['Date', 'Drill details', 'Outcome', 'Recorded by'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.description || '',
      e.data.outcome || '',
      e.tester_name || '',
    ],
  },
  fault: {
    head: ['Date', 'Fault / device / zone', 'Cause', 'Remedial action', 'Resolved'],
    row: (e) => [
      fmtDate(e.entry_date),
      [e.data.description, e.data.device, e.data.zone].filter(Boolean).join(' — '),
      e.data.cause || '',
      e.data.remedial_action || '',
      // "OPEN" is deliberately shouted: an unresolved fault is the one row on
      // this document that changes what an inspector does next.
      e.resolved ? fmtDate(e.resolved_date) : 'OPEN',
    ],
  },
  false_alarm: {
    head: ['Date', 'Zone', 'Category', 'Cause', 'Action / investigation'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.zone || '',
      e.data.category || '',
      e.data.cause || '',
      e.data.action || '',
    ],
  },
  service: {
    head: ['Date', 'Contractor', 'Scope of work', 'Outcome', 'Next service due'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.contractor || '',
      e.data.scope || '',
      e.data.outcome || '',
      fmtDate(e.data.next_due),
    ],
  },
  battery: {
    head: ['Date', 'Battery type', 'Location', 'Replaced by'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.battery_type || '',
      e.data.location || '',
      e.tester_name || '',
    ],
  },
  panel_event: {
    head: ['Date', 'Event', 'Action taken', 'Recorded by'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.description || '',
      e.data.action || '',
      e.tester_name || '',
    ],
  },
  variation: {
    head: ['Date', 'Variation description', 'Authorised by'],
    row: (e) => [fmtDate(e.entry_date), e.data.description || '', e.data.authorised_by || ''],
  },
  // Deliberately absent from SECTION_ORDER: deviations get their own block on
  // the document rather than a table among nine others, because 2025 made them
  // something an inspector looks for by name.
  deviation: {
    head: ['Date', 'Deviation', 'Reason', 'Agreed with'],
    row: (e) => [
      fmtDate(e.entry_date),
      e.data.description || '',
      e.data.reason || '',
      e.data.agreed_with || '',
    ],
  },
};

/** Order the record tables appear in — ported from the jsPDF export. */
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

export interface LogBookPayloadInput {
  book: FireAlarmLogBook;
  entries: FireAlarmLogEntry[];
  /** ISO date, inclusive. Omit for "start of record". */
  from?: string | null;
  /** ISO date, inclusive. Omit for "today". */
  to?: string | null;
  branding?: Partial<CertBranding>;
  /** Optional countersignatures captured at export time. */
  signatures?: {
    responsiblePersonPosition?: string;
    responsiblePersonDate?: string;
    responsiblePersonSignature?: string;
    engineerName?: string;
    engineerDate?: string;
    engineerSignature?: string;
  };
}

export const formatFireAlarmLogBookJson = ({
  book,
  entries,
  from,
  to,
  branding = {},
  signatures = {},
}: LogBookPayloadInput): Record<string, unknown> => {
  const now = new Date();

  const inPeriod = entries
    .filter((e) => (!from || e.entry_date >= from) && (!to || e.entry_date <= to))
    .sort((a, b) => b.entry_date.localeCompare(a.entry_date));

  const byType = (t: LogEntryType) => inPeriod.filter((e) => e.entry_type === t);

  // ── Weekly testing status ──────────────────────────────────────────
  // Derived from the entries themselves, never a stored pointer — the same
  // rule the rotation uses, so an edited or deleted entry cannot leave the
  // status claiming a test that is no longer in the record.
  const weeklies = byType('weekly_test');
  const lastWeekly = weeklies[0]?.entry_date ?? null;
  const nextWeeklyDue = lastWeekly
    ? new Date(new Date(lastWeekly).getTime() + 7 * 864e5).toISOString().slice(0, 10)
    : null;
  const weeklyOverdue = nextWeeklyDue ? nextWeeklyDue < now.toISOString().slice(0, 10) : false;

  // ── False alarm rate, BS 5839-1 Annex F ────────────────────────────
  // Per 100 automatic detectors over the trailing 12 months, regardless of the
  // selected export period: a 3-month export must not make the annual rate look
  // like a quarter of what it is. Above 4 per 100/yr Annex F calls for a
  // preliminary investigation.
  const yearAgo = new Date(now);
  yearAgo.setFullYear(yearAgo.getFullYear() - 1);
  const cutoff = yearAgo.toISOString().slice(0, 10);
  const falseAlarms12mo = entries.filter(
    (e) => e.entry_type === 'false_alarm' && e.entry_date >= cutoff
  ).length;
  const detectors = book.detector_count ?? 0;
  const falseAlarmRate =
    detectors > 0 ? Math.round((100 * falseAlarms12mo * 10) / detectors) / 10 : null;

  // ── Outstanding defects ────────────────────────────────────────────
  // Unresolved faults across the WHOLE record, not just the export period. A
  // fault raised before the period started is still open today, and hiding it
  // because of a date filter would be the most misleading thing this document
  // could do.
  const openDefects = entries
    .filter((e) => e.entry_type === 'fault' && !e.resolved)
    .sort((a, b) => a.entry_date.localeCompare(b.entry_date))
    .map((e) => ({
      date: fmtDate(e.entry_date),
      description:
        [e.data.description, e.data.device].filter(Boolean).join(' — ') || 'Fault recorded',
      location: [e.data.zone, e.data.location].filter(Boolean).join(' — '),
      days_open: String(
        Math.max(0, Math.round((now.getTime() - new Date(e.entry_date).getTime()) / 864e5))
      ),
    }));

  // Latest service visit across the whole record, not the export period — the
  // zone chart state is whatever the last engineer actually found, and a short
  // export window must not make it look unverified.
  const latestService = entries
    .filter((e) => e.entry_type === 'service')
    .sort((a, b) => b.entry_date.localeCompare(a.entry_date))[0];

  const sections = SECTION_ORDER.map((type) => {
    const rows = byType(type);
    if (rows.length === 0) return null;
    const layout = TABLE_LAYOUT[type];
    return {
      title: ENTRY_TYPE_LABELS[type],
      columns: layout.head,
      rows: rows.map(layout.row),
    };
  }).filter(Boolean);

  const photos = inPeriod
    .filter((e) => e.data.photo)
    .map((e) => ({
      url: e.data.photo,
      date: fmtDate(e.entry_date),
      caption: [ENTRY_TYPE_LABELS[e.entry_type], e.data.description].filter(Boolean).join(' — '),
    }));

  // Certificate register — the log must let the certification history be
  // traced. Commissioning comes off the book; service visits contribute their
  // own references as they are recorded.
  const certificates = [
    book.commissioning_cert_ref
      ? {
          type: 'Commissioning',
          reference: book.commissioning_cert_ref,
          date: fmtDate(book.acceptance_date),
          issued_by: book.servicing_org || '',
        }
      : null,
    ...byType('service')
      .filter((e) => e.data.certificate_ref)
      .map((e) => ({
        type: 'Maintenance',
        reference: e.data.certificate_ref,
        date: fmtDate(e.entry_date),
        issued_by: e.data.contractor || e.tester_name || '',
      })),
  ].filter(Boolean);

  return {
    // Branding — snake_case, matching G1–G7.
    company_name: branding.companyName || '',
    company_logo: branding.companyLogo || '',
    company_accent_color: branding.companyAccentColor || FIRE_ACCENT,
    registration_scheme_logo: branding.registrationSchemeLogo || '',

    standard_edition: 'BS 5839-1:2025',
    exported_at: format(now, 'dd MMM yyyy HH:mm'),
    period_label: `${from ? fmtDate(from) : 'Start of record'} to ${to ? fmtDate(to) : format(now, 'dd MMM yyyy')}`,

    // Premises and system particulars
    premises_name: book.building_name || '',
    premises_address: book.building_address || '',
    system_category: book.system_category || '',
    panel_make_model: [book.panel_make, book.panel_model].filter(Boolean).join(' '),
    panel_location: book.panel_location || '',
    detector_count: book.detector_count != null ? String(book.detector_count) : '',
    call_point_count: book.call_points?.length ? String(book.call_points.length) : '',
    arc_summary: book.arc_connected
      ? `Yes${book.arc_phone ? ` — ${book.arc_phone}` : ''}`
      : 'No',
    installation_date: fmtDate(book.installation_date),
    acceptance_date: fmtDate(book.acceptance_date),
    commissioning_cert_ref: book.commissioning_cert_ref || '',
    servicing_org: [book.servicing_org, book.servicing_org_phone].filter(Boolean).join(' — '),
    service_interval: book.service_interval_months
      ? `${book.service_interval_months} months`
      : '',
    last_service_date: fmtDate(book.last_service_date),
    weekly_test_day: book.weekly_test_day
      ? book.weekly_test_day[0].toUpperCase() + book.weekly_test_day.slice(1)
      : '',
    responsible_person_name: book.responsible_person || '',

    // Status
    last_weekly_test: fmtDate(lastWeekly),
    next_weekly_due: fmtDate(nextWeeklyDue),
    weekly_overdue: weeklyOverdue,
    entries_total: inPeriod.length,
    weekly_tests_count: weeklies.length,
    open_defect_count: openDefects.length,
    false_alarm_count: byType('false_alarm').length,
    service_visit_count: byType('service').length,
    false_alarm_rate: falseAlarmRate != null ? String(falseAlarmRate) : '',
    false_alarm_count_12mo: String(falseAlarms12mo),
    false_alarm_trigger_exceeded: falseAlarmRate != null && falseAlarmRate > 4,

    open_defects: openDefects,
    sections,
    photos,
    has_photos: photos.length > 0,
    certificates,

    // Zone chart verification is read off the most recent service visit, since
    // 2025 requires it checked at EVERY maintenance visit — the current state
    // is whatever the last engineer found, not a value set once and forgotten.
    zone_plan_ref: latestService?.data.zone_chart_notes || '',
    zone_plan_verified: latestService?.data.zone_chart_verified === 'Verified — correct',
    zone_plan_verified_date: latestService ? fmtDate(latestService.entry_date) : '',

    // Deviations get their own block rather than a table among nine others.
    deviations: entries
      .filter((e) => e.entry_type === 'deviation')
      .sort((a, b) => b.entry_date.localeCompare(a.entry_date))
      .map((e) => ({
        date: fmtDate(e.entry_date),
        description: e.data.description || '',
        agreed_with: e.data.agreed_with || '',
        reason: e.data.reason || '',
      })),

    // Still no data model — the template gates each on presence, so they stay
    // invisible rather than printing an empty section that reads as missing
    // information. FRA needs a column on fire_alarm_log_books (ELE-1483).
    fire_risk_assessment_ref: '',
    fire_risk_assessment_date: '',
    cause_effect_ref: '',
    cause_effect_verified: false,
    cause_effect_verified_date: '',

    // Countersignatures
    responsible_person_position: signatures.responsiblePersonPosition || '',
    responsible_person_date: signatures.responsiblePersonDate || '',
    responsible_person_signature: signatures.responsiblePersonSignature || '',
    engineer_name: signatures.engineerName || '',
    engineer_date: signatures.engineerDate || '',
    engineer_signature: signatures.engineerSignature || '',
  };
};

export default formatFireAlarmLogBookJson;
