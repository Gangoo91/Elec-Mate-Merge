import type { Mapper, Section, Tone } from '../contract.ts';
import { fmtDate, fmtDateTime, humanise, paras, refFrom, rows, str, yesNo, type Row } from '../common.ts';
import { evenFacts, labelOf, mergePhotos } from './_helpers.ts';

const CATEGORY: Record<string, string> = {
  'pat-tester': 'PAT tester',
  'test-equipment': 'Test equipment',
  ladders: 'Ladders',
  'power-tools': 'Power tools',
  ppe: 'PPE',
  other: 'Other',
};
const DUE_SOON_DAYS = 7;

const isoDay = (d: Date) => d.toISOString().slice(0, 10);
const interval = (days: unknown): string => {
  const n = Number(days);
  if (!n) return '';
  return ({ 90: 'Every 3 months', 180: 'Every 6 months', 365: 'Every 12 months', 730: 'Every 24 months' } as Record<number, string>)[n] ?? `Every ${n} days`;
};

/**
 * Equipment register entry. The status is worked out from the dates held
 * (as the app's register does), as at the day the document is made — the
 * stored `status` column only ever distinguishes out-of-service kit.
 */
export const equipmentMapper: Mapper = (r: Row, ctx) => {
  const today = isoDay(new Date());
  const soon = isoDay(new Date(Date.now() + DUE_SOON_DAYS * 86400000));
  const dues = [str(r.next_inspection), r.requires_calibration ? str(r.calibration_due) : ''].filter(Boolean).sort();
  const due = dues[0] ?? '';
  const asAt = fmtDate(new Date().toISOString());
  const status: { label: string; tone: Tone } =
    str(r.status) === 'out_of_service'
      ? { label: 'Out of service', tone: 'neutral' }
      : !due
        ? { label: 'No test date', tone: 'warn' }
        : due < today
          ? { label: 'Overdue', tone: 'bad' }
          : due <= soon
            ? { label: 'Due soon', tone: 'warn' }
            : { label: 'In date', tone: 'ok' };
  const category = labelOf(CATEGORY, r.category);

  const sections: Section[] = [
    {
      heading: 'Item',
      kind: 'kv',
      rows: rows([
        ['Name', r.name],
        ['Category', category],
        ['Serial number', r.serial_number],
        ['Location', r.location],
        ['Assigned to', r.assigned_to],
        ['Purchased', fmtDate(r.purchase_date)],
      ]),
    },
    {
      heading: 'Inspection and calibration',
      intro: `Status worked out from the dates below as at ${asAt}.`,
      kind: 'kv',
      rows: rows([
        ['Last inspection', fmtDate(r.last_inspection) || 'Not recorded'],
        ['Next inspection due', fmtDate(r.next_inspection) || 'Not set'],
        ['Inspection interval', interval(r.inspection_interval_days)],
        ['Needs calibration', yesNo(r.requires_calibration)],
        ['Last calibration', r.requires_calibration ? fmtDate(r.last_calibration) || 'Not recorded' : ''],
        ['Calibration due', r.requires_calibration ? fmtDate(r.calibration_due) || 'Not set' : ''],
        ['Calibration interval', r.requires_calibration ? interval(r.calibration_interval_days) : ''],
      ]),
    },
  ];
  const warranty = rows([
    ['Warranty expires', fmtDate(r.warranty_expiry)],
    ['Warranty provider', r.warranty_provider],
    ['Claims contact', r.warranty_claim_contact],
  ]);
  if (warranty.length) sections.push({ heading: 'Warranty', kind: 'kv', rows: warranty });
  const cond = paras(r.condition_notes);
  if (cond.length) sections.push({ heading: 'Condition notes', kind: 'text', paragraphs: cond });

  return {
    meta: {
      kind: 'Equipment record',
      title: str(r.name) || 'Equipment',
      subtitle: 'An item on the equipment register with its inspection dates.',
      reference: refFrom('EQP', r.id),
      issued: asAt,
    },
    status,
    // Register items are not tied to a job; blank the job block rather than print an unrelated one.
    job: { number: '', title: '', client: '', site: '' },
    prepared_by: ctx.preparedBy,
    cover_facts: evenFacts([
      { label: 'Serial number', value: str(r.serial_number) },
      { label: 'Category', value: category },
      { label: 'Last inspection', value: fmtDate(r.last_inspection) || 'Not recorded' },
      { label: 'Location', value: str(r.location) },
    ]),
    headline: [
      { label: 'Next due', value: fmtDate(due) || 'Not set', verdict: status.tone === 'ok' ? 'ok' : status.tone === 'bad' ? 'bad' : status.tone === 'warn' ? 'warn' : 'neutral', verdict_label: status.label },
    ],
    alert:
      status.label === 'Overdue'
        ? { tone: 'bad', title: 'Overdue.', text: `${dues.length > 1 && due === str(r.calibration_due) ? 'Calibration' : 'Inspection'} was due ${fmtDate(due)}.` }
        : status.label === 'Out of service'
          ? { tone: 'neutral', title: 'Out of service.', text: 'This item is marked out of service in the register.' }
          : undefined,
    sections,
    photos: mergePhotos(ctx.photoUrl, [r.photos]),
    audit: [
      { event: 'Added to the register', at: fmtDateTime(r.created_at) },
      ...(r.updated_at && r.updated_at !== r.created_at ? [{ event: 'Last updated', at: fmtDateTime(r.updated_at) }] : []),
    ],
    disclaimer: 'An equipment register entry as kept in the app. The dates are those entered by the user.',
  };
};
