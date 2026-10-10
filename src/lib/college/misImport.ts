/**
 * MIS sync, step 1 (ELE-2058): read an MIS export file, map it once, save the
 * mapping, re-run it with next month's file.
 *
 * Public facts (market research, 10 Oct 2026): ProSolution and UNIT-e have no
 * public API and both export ILR XML and CSV; Tribal ebs and Tribal Maytas
 * have documented APIs (see misConnectors.ts for step 2). No vendor publishes
 * its CSV export columns, so nothing here claims to know them: a CSV is mapped
 * by the person importing, helped by a guess from common header words and the
 * ILR field names every one of these systems works with. The ILR XML file is
 * read by its element names, which the ILR specification fixes:
 *   https://guidance.submit-learner-data.service.gov.uk/26-27/ilr/overview
 */

export type MisSystem = 'ebs' | 'prosolution' | 'unit_e' | 'maytas' | 'other';

export const MIS_SYSTEMS: Array<{ key: MisSystem; label: string }> = [
  { key: 'ebs', label: 'Tribal ebs' },
  { key: 'prosolution', label: 'ProSolution' },
  { key: 'unit_e', label: 'UNIT-e' },
  { key: 'maytas', label: 'Tribal Maytas' },
  { key: 'other', label: 'Another MIS' },
];

export type MisField =
  | 'learner_ref'
  | 'uln'
  | 'email'
  | 'name'
  | 'given_names'
  | 'family_name'
  | 'date_of_birth'
  | 'ni_number'
  | 'start_date'
  | 'planned_end_date'
  | 'actual_end_date'
  | 'cohort_code';

export type DateOrder = 'dmy' | 'ymd' | 'mdy';

export const MIS_FIELDS: Array<{
  key: MisField;
  label: string;
  hint: string;
  /** Header words, lower case, matched as whole header or contained phrase. */
  words: string[];
}> = [
  {
    key: 'learner_ref',
    label: 'Learner reference',
    hint: 'Your MIS learner or student reference (ILR LearnRefNumber)',
    words: [
      'learnrefnumber',
      'learner ref',
      'learner reference',
      'student ref',
      'student reference',
      'student id',
      'learner id',
      'person code',
      'stu ref',
    ],
  },
  {
    key: 'uln',
    label: 'ULN',
    hint: 'Unique Learner Number, 10 digits',
    words: ['uln', 'unique learner'],
  },
  { key: 'email', label: 'Email', hint: 'Needed to add someone new', words: ['email', 'e-mail'] },
  {
    key: 'name',
    label: 'Full name',
    hint: 'Or map given and family names below',
    words: ['full name', 'learner name', 'student name', 'name'],
  },
  {
    key: 'given_names',
    label: 'Given names',
    hint: 'ILR GivenNames',
    words: ['givennames', 'given name', 'forename', 'first name'],
  },
  {
    key: 'family_name',
    label: 'Family name',
    hint: 'ILR FamilyName',
    words: ['familyname', 'family name', 'surname', 'last name'],
  },
  {
    key: 'date_of_birth',
    label: 'Date of birth',
    hint: 'ILR DateOfBirth',
    words: ['dateofbirth', 'date of birth', 'dob', 'birth'],
  },
  {
    key: 'ni_number',
    label: 'NI number',
    hint: 'National Insurance number',
    words: ['ninumber', 'ni number', 'national insurance', 'nino'],
  },
  {
    key: 'start_date',
    label: 'Start date',
    hint: 'ILR LearnStartDate',
    words: ['learnstartdate', 'start date', 'enrolment start', 'enrolment date', 'start'],
  },
  {
    key: 'planned_end_date',
    label: 'Planned end date',
    hint: 'ILR LearnPlanEndDate',
    words: ['learnplanenddate', 'planned end', 'expected end', 'plan end', 'end date'],
  },
  {
    key: 'actual_end_date',
    label: 'Actual end date',
    hint: 'ILR LearnActEndDate, if they have finished or left',
    words: ['learnactenddate', 'actual end', 'leaving date', 'withdrawal date', 'left on'],
  },
  {
    key: 'cohort_code',
    label: 'Group or course code',
    hint: 'Matched to your cohort codes, or mapped below',
    words: ['group code', 'cohort', 'class code', 'course code', 'group', 'register'],
  },
];

export type MisColumnMap = Partial<Record<MisField, string>>;

const norm = (h: string) =>
  h
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, ' ');

/**
 * Exact header match first (so "End Date" is not taken by "start"), then
 * contained phrase, never reusing a header.
 */
export function guessMisColumns(headers: string[]): MisColumnMap {
  const used = new Set<string>();
  const map: MisColumnMap = {};
  for (const pass of ['exact', 'contains'] as const) {
    for (const f of MIS_FIELDS) {
      if (map[f.key]) continue;
      const hit = headers.find((h) => {
        if (used.has(h)) return false;
        const n = norm(h);
        const compact = n.replace(/\s/g, '');
        return f.words.some((w) =>
          pass === 'exact' ? n === w || compact === w.replace(/\s/g, '') : n.includes(w)
        );
      });
      if (hit) {
        map[f.key] = hit;
        used.add(hit);
      }
    }
  }
  return map;
}

/** A date in the file's own order (UK day first by default), or ISO. */
export function parseMisDate(
  raw: string | null | undefined,
  order: DateOrder = 'dmy'
): string | null {
  const s = (raw ?? '').trim();
  if (!s) return null;
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return iso(+m[1], +m[2], +m[3]);
  m = s.match(/^(\d{1,4})[/.-](\d{1,2})[/.-](\d{1,4})/);
  if (!m) return null;
  const [a, b, c] = [m[1], m[2], m[3]];
  const year = (y: string) => (y.length === 2 ? 2000 + Number(y) : Number(y));
  if (order === 'ymd') return iso(year(a), +b, +c);
  if (order === 'mdy') return iso(year(c), +a, +b);
  return iso(year(c), +b, +a);
}

function iso(y: number, mo: number, d: number): string | null {
  if (!(y >= 1900 && y <= 2100 && mo >= 1 && mo <= 12 && d >= 1 && d <= 31)) return null;
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCMonth() !== mo - 1) return null;
  return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export interface MisRow {
  row: number;
  learner_ref?: string;
  uln?: string;
  email?: string;
  name?: string;
  date_of_birth?: string | null;
  ni_number?: string;
  start_date?: string | null;
  planned_end_date?: string | null;
  actual_end_date?: string | null;
  cohort_code?: string;
  /** A date cell that had a value but could not be read in the chosen order. */
  bad_dates?: string[];
}

/** One CSV record to the row college_mis_apply takes. Row numbers count the header as 1. */
export function toMisRow(
  rec: Record<string, unknown>,
  index: number,
  map: MisColumnMap,
  order: DateOrder
): MisRow {
  const get = (k: MisField) => (map[k] ? String(rec[map[k] as string] ?? '').trim() : '');
  const bad: string[] = [];
  const date = (k: MisField) => {
    const raw = get(k);
    const v = parseMisDate(raw, order);
    if (raw && !v) bad.push(k);
    return v;
  };
  const name =
    get('name') || [get('given_names'), get('family_name')].filter(Boolean).join(' ') || '';
  const out: MisRow = {
    row: index + 2,
    learner_ref: get('learner_ref') || undefined,
    uln: get('uln') || undefined,
    email: get('email') || undefined,
    name: name || undefined,
    date_of_birth: date('date_of_birth'),
    ni_number: get('ni_number') || undefined,
    start_date: date('start_date'),
    planned_end_date: date('planned_end_date'),
    actual_end_date: date('actual_end_date'),
    cohort_code: get('cohort_code') || undefined,
  };
  if (bad.length) out.bad_dates = bad;
  return out;
}

/* ── ILR XML ─────────────────────────────────────────────────────────────
   One row per Learner. Dates come from the programme aim (AimType 1) where
   there is one, otherwise the earliest LearningDelivery. ILR dates are
   YYYY-MM-DD. The file's namespace changes every year, so elements are found
   by local name. */

export interface IlrParse {
  rows: MisRow[];
  ukprn: string | null;
  year: string | null;
  learners: number;
}

export function parseIlrXml(text: string): IlrParse {
  const doc = new DOMParser().parseFromString(text, 'application/xml');
  if (doc.getElementsByTagName('parsererror').length)
    throw new Error('That file is not valid XML.');
  const byName = (el: Element | Document, name: string): Element[] =>
    Array.from(el.getElementsByTagNameNS('*', name));
  const val = (el: Element, name: string): string => {
    const hit = Array.from(el.children).find((c) => c.localName === name);
    return (hit?.textContent ?? '').trim();
  };
  const learners = byName(doc, 'Learner');
  if (!learners.length) throw new Error('No Learner records found. Is this an ILR XML file?');
  const header = byName(doc, 'CollectionDetails')[0];
  const ukprnEl = byName(doc, 'LearningProvider')[0];
  const rows = learners.map((l, i) => {
    const deliveries = Array.from(l.children).filter((c) => c.localName === 'LearningDelivery');
    const prog =
      deliveries.find((d) => val(d, 'AimType') === '1') ??
      [...deliveries].sort((a, b) =>
        val(a, 'LearnStartDate').localeCompare(val(b, 'LearnStartDate'))
      )[0];
    const name = [val(l, 'GivenNames'), val(l, 'FamilyName')].filter(Boolean).join(' ');
    return {
      row: i + 1,
      learner_ref: val(l, 'LearnRefNumber') || undefined,
      uln: val(l, 'ULN') || undefined,
      email: val(l, 'Email') || undefined,
      name: name || undefined,
      date_of_birth: parseMisDate(val(l, 'DateOfBirth'), 'ymd'),
      ni_number: val(l, 'NINumber') || undefined,
      start_date: prog ? parseMisDate(val(prog, 'LearnStartDate'), 'ymd') : null,
      planned_end_date: prog ? parseMisDate(val(prog, 'LearnPlanEndDate'), 'ymd') : null,
      actual_end_date: prog ? parseMisDate(val(prog, 'LearnActEndDate'), 'ymd') : null,
    } as MisRow;
  });
  return {
    rows,
    ukprn: ukprnEl ? val(ukprnEl, 'UKPRN') || null : null,
    year: header ? val(header, 'Year') || null : null,
    learners: learners.length,
  };
}

export const CHANGE_LABEL: Record<string, string> = {
  uln: 'ULN',
  date_of_birth: 'date of birth',
  ni_number: 'NI number',
  start_date: 'start',
  planned_end_date: 'planned end',
  actual_end_date: 'actual end',
  learner_ref: 'learner reference',
  cohort: 'cohort',
};
