import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  grid2Cn,
  inputCn,
  labelCn,
  selectTriggerCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';
import { TempLoginsPanel } from '@/components/college/setup/TempLoginsPanel';
import {
  OUTCOME_LABEL,
  OUTCOME_TONE,
  csvEscape,
  downloadCsv,
  openEmailPreview,
  previewRosterEmail,
  runRoster,
  type RosterItem,
  type RosterResult,
  type RosterRowIn,
} from '@/lib/collegeRoster';

/* ==========================================================================
   BulkAddStudentsSheet — paste/CSV-bulk-enrol learners into college_students.

   Why: Jay's first ask after seeing the platform. Currently new cohorts go
   in one student at a time via AddStudentDialog. A typical Sept intake is
   30-60 learners. This sheet lets a tutor paste a tab/CSV block from their
   existing MIS export and bulk-create everyone in one tap.

   Flow:
     1. Tutor pastes rows OR drops a CSV file
     2. Parser splits on tab / comma / semicolon and maps known headers
     3. Dry run (ELE-1900): the local check (missing name, bad email, repeats)
        and then the college-roster-import function with dry_run, which says
        per row who gets a new login, who already has an Elec-Mate account,
        who is already on the roll and who belongs to another college.
        Nothing is written until Enrol.
     4. Tutor picks course, default cohort, default expected end date and
        whether each learner is emailed their login + join link
     5. Enrol → the same function for real: logins made (or matched by
        email), roll rows written, join link emailed, every row reported
     6. Result lists every row and what happened to it; the rows that did
        not go in download as a CSV with the reason, to fix and re-paste.
        Re-running the same list is safe: matching is by email.

   ELE-907 / [C1]. ELE-1900.
   ========================================================================== */


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional default cohort to apply to all rows that don't specify one. */
  defaultCohortId?: string;
}

interface ParsedRow {
  /** Stable row id for React keys (UUID-style index — these aren't DB ids). */
  id: string;
  raw: string;
  name: string;
  email: string;
  phone: string;
  uln: string;
  cohort: string; // cohort name as typed by the tutor (resolved on insert)
  expected_end_date: string;
  /** Row-level validation issues that block the insert. */
  errors: string[];
  /** Soft warnings — duplicate ULN, missing cohort, etc. — insert proceeds. */
  warnings: string[];
}

type RowState = 'ready' | 'warn' | 'blocked';
type PreviewFilter = 'all' | RowState;

type ColumnKey = keyof Pick<ParsedRow, 'name' | 'email' | 'phone' | 'uln' | 'cohort' | 'expected_end_date'> | 'first' | 'last';

const HEADER_ALIASES: Record<string, ColumnKey> = {
  // Each MIS export uses different headings. Map common ones.
  name: 'name',
  'full name': 'name',
  'student name': 'name',
  'learner name': 'name',
  'first name': 'first',
  firstname: 'first',
  forename: 'first',
  forenames: 'first',
  'given name': 'first',
  'preferred name': 'first',
  surname: 'last',
  'last name': 'last',
  lastname: 'last',
  'family name': 'last',
  email: 'email',
  'e mail': 'email',
  'email address': 'email',
  'learner email': 'email',
  'student email': 'email',
  'personal email': 'email',
  'mobile number': 'phone',
  telephone: 'phone',
  phone: 'phone',
  mobile: 'phone',
  'phone number': 'phone',
  uln: 'uln',
  'unique learner number': 'uln',
  cohort: 'cohort',
  group: 'cohort',
  class: 'cohort',
  'expected end date': 'expected_end_date',
  'expected completion': 'expected_end_date',
  'end date': 'expected_end_date',
};

const ULN_RE = /^\d{10}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function parseDate(s: string): string {
  if (!s) return '';
  if (ISO_DATE_RE.test(s)) return s;
  // Accept dd/mm/yyyy and dd-mm-yyyy (UK) — convert to ISO.
  const m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  if (m) {
    const day = m[1].padStart(2, '0');
    const month = m[2].padStart(2, '0');
    const year = m[3].length === 2 ? `20${m[3]}` : m[3];
    return `${year}-${month}-${day}`;
  }
  return ''; // unparseable — surfaced as a warning
}

/** Split a single line on the first delimiter that's plausibly there. Tab
    wins (Excel/Sheets paste), then comma, then semicolon (some EU locales). */
function splitLine(line: string): string[] {
  if (line.includes('\t')) return line.split('\t').map((s) => s.trim());
  // Naive CSV — handles quoted commas inside fields. Good enough for
  // typical MIS exports; we don't need full RFC-4180 here.
  if (line.includes('"')) {
    const out: string[] = [];
    let cur = '';
    let inQ = false;
    for (const ch of line) {
      if (ch === '"') inQ = !inQ;
      else if (ch === ',' && !inQ) {
        out.push(cur.trim());
        cur = '';
      } else cur += ch;
    }
    out.push(cur.trim());
    return out;
  }
  if (line.includes(',')) return line.split(',').map((s) => s.trim());
  if (line.includes(';')) return line.split(';').map((s) => s.trim());
  return [line.trim()];
}

/** "First Name", "first_name", "E-mail" → "first name", "first name", "e mail". */
function headerKey(cell: string): string {
  return cell
    .toLowerCase()
    .replace(/[_\-./]+/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** MIS exports often shout (SMITH) or whisper (jane smith): tidy those into
    Jane Smith. A name typed with its own capitals (McDonald, O'Neill) is left alone. */
function tidyName(name: string): string {
  const n = name.replace(/\s+/g, ' ').trim();
  if (!n || (n !== n.toLowerCase() && n !== n.toUpperCase())) return n;
  return n.toLowerCase().replace(/(^|[\s'-])([a-z])/g, (_m, p: string, c: string) => p + c.toUpperCase());
}

const PHONE_RE = /^\+?[\d\s()-]{10,16}$/;

/** No header row: work out each cell from what it looks like. Text before the
    email is the name (first and last name columns are joined). */
function guessCells(cells: string[]): Partial<Record<ColumnKey, string>> {
  const out: Partial<Record<ColumnKey, string>> = {};
  const names: string[] = [];
  let seenEmail = false;
  for (const raw of cells) {
    const v = raw.trim();
    if (!v) continue;
    if (!out.email && EMAIL_RE.test(v)) {
      out.email = v;
      seenEmail = true;
    } else if (!out.uln && ULN_RE.test(v)) out.uln = v;
    else if (!out.expected_end_date && parseDate(v)) out.expected_end_date = parseDate(v);
    else if (!out.phone && PHONE_RE.test(v) && /\d{6,}/.test(v.replace(/\D/g, ''))) out.phone = v;
    else if (!seenEmail && !/\d{5,}/.test(v)) names.push(v);
    else if (seenEmail && !out.cohort && !/^\d+$/.test(v)) out.cohort = v;
  }
  if (names.length) out.name = names.join(' ');
  return out;
}

function parseBlock(text: string, defaultCohort: string): ParsedRow[] {
  // Keep leading tabs: an empty first cell (no first name) must not shift
  // every other cell one column left.
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.replace(/[ \r]+$/, '').replace(/^ +/, ''))
    .filter((l) => l.replace(/[\t,;\s]/g, '').length > 0);
  if (lines.length === 0) return [];

  // Detect if first row is a header — looks for any aliased word.
  const firstCells = splitLine(lines[0]).map(headerKey);
  const hasHeader = firstCells.some((c) => HEADER_ALIASES[c]);

  const columns: Array<ColumnKey | null> | null = hasHeader ? firstCells.map((c) => HEADER_ALIASES[c] ?? null) : null;
  const dataLines = hasHeader ? lines.slice(1) : lines;

  return dataLines.map((line, i) => {
    const raw = splitLine(line);
    // Map the cells to fields: by header, or by what each cell looks like.
    const byKey: Partial<Record<ColumnKey, string>> = {};
    if (columns) {
      raw.forEach((v, c) => {
        const col = columns[c];
        if (col && v && !byKey[col]) byKey[col] = v;
      });
    } else Object.assign(byKey, guessCells(raw));
    if (!byKey.name && (byKey.first || byKey.last)) byKey.name = [byKey.first, byKey.last].filter(Boolean).join(' ');
    const cols: Array<keyof ParsedRow> = ['name', 'email', 'phone', 'uln', 'cohort', 'expected_end_date'];
    const cells = cols.map((k) => byKey[k as ColumnKey] ?? '');
    const row: ParsedRow = {
      id: `row-${i}`,
      raw: line,
      name: '',
      email: '',
      phone: '',
      uln: '',
      cohort: defaultCohort,
      expected_end_date: '',
      errors: [],
      warnings: [],
    };
    for (let c = 0; c < cells.length; c++) {
      const col = cols[c];
      if (!col) continue;
      const v = cells[c];
      // Skip empty cells — an empty cohort column shouldn't wipe the
      // default cohort the tutor set above; an empty phone shouldn't be
      // stored as the literal empty string. Only assign when there's
      // actual data.
      if (v === '' || v == null) continue;
      if (col === 'expected_end_date') row[col] = parseDate(v) || '';
      else if (col === 'name') row.name = tidyName(v);
      else if (col === 'email') row.email = v.replace(/\s+/g, '').toLowerCase();
      else if (col in row) (row as unknown as Record<string, string>)[col] = v;
    }
    // Validate
    if (!row.name) row.errors.push('Missing name');
    if (!row.email) row.errors.push('Missing email');
    else if (!EMAIL_RE.test(row.email)) row.errors.push('Invalid email');
    if (row.uln && !ULN_RE.test(row.uln)) row.warnings.push('ULN should be 10 digits');
    if (!row.cohort) row.warnings.push('No cohort: pick a default cohort');
    return row;
  });
}
export function BulkAddStudentsSheet({ open, onOpenChange, defaultCohortId }: Props) {
  const { cohorts, courses } = useCollegeSupabase();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const activeCohorts = cohorts.filter((c) => !['archived', 'completed', 'cancelled'].includes((c.status ?? '').toLowerCase()));
  const activeCourses = courses.filter((c) => c.status === 'Active');

  const [paste, setPaste] = useState('');
  const [defaultCohort, setDefaultCohort] = useState(defaultCohortId ?? '');
  const [defaultCourse, setDefaultCourse] = useState('');
  const [defaultEnd, setDefaultEnd] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<RosterResult | null>(null);
  const [plan, setPlan] = useState<RosterResult | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [filter, setFilter] = useState<PreviewFilter>('all');
  const [dragOver, setDragOver] = useState(false);
  const [resultFilter, setResultFilter] = useState<'all' | 'in' | 'not'>('all');
  const [previewing, setPreviewing] = useState(false);

  // Reset whenever the sheet opens.
  useEffect(() => {
    if (open) {
      setPaste('');
      setDefaultCohort(defaultCohortId ?? '');
      setDefaultCourse('');
      setDefaultEnd('');
      setSendEmail(true);
      setResult(null);
      setPlan(null);
      setPlanError(null);
      setFilter('all');
      setResultFilter('all');
    }
  }, [open, defaultCohortId]);

  const cohortNameById = useMemo(
    () => new Map(activeCohorts.map((c) => [c.id, c.name])),
    [activeCohorts]
  );
  const cohortIdByName = useMemo(
    () => new Map(activeCohorts.map((c) => [c.name.toLowerCase(), c.id])),
    [activeCohorts]
  );

  const defaultCohortName = defaultCohort ? (cohortNameById.get(defaultCohort) ?? '') : '';

  const rows = useMemo(() => parseBlock(paste, defaultCohortName), [paste, defaultCohortName]);

  // Repeats inside the paste are caught here; everything about existing
  // accounts and the roll is decided by the server check below.
  const dupReason = useMemo(() => {
    const map = new Map<string, string>();
    const seenInPaste = new Map<string, number>();
    rows.forEach((r, i) => {
      if (!r.email) return;
      const k = r.email.toLowerCase();
      const prior = seenInPaste.get(k);
      if (prior != null) map.set(r.id, `Same email as row ${prior + 1}`);
      else seenInPaste.set(k, i);
    });
    return map;
  }, [rows]);
  const dupRows = useMemo(() => new Set(dupReason.keys()), [dupReason]);

  // A cohort typed in the paste that matches no active cohort falls back to
  // the default on insert. Say so in the dry run rather than silently.
  const unknownCohort = (r: ParsedRow) =>
    !!r.cohort && r.cohort !== defaultCohortName && !cohortIdByName.has(r.cohort.toLowerCase());

  const validRows = rows.filter((r) => r.errors.length === 0 && !dupRows.has(r.id));

  /** What goes to the server: the rows the local check passed, cohorts resolved. */
  const payloadRows = useMemo<RosterRowIn[]>(
    () =>
      validRows.map((r) => ({
        index: rows.indexOf(r),
        name: r.name,
        email: r.email,
        phone: r.phone || undefined,
        uln: r.uln || undefined,
        cohort_id: cohortIdByName.get(r.cohort.toLowerCase()) || defaultCohort || null,
        expected_end_date: r.expected_end_date || defaultEnd || null,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rows, dupRows, cohortIdByName, defaultCohort, defaultEnd]
  );

  // Server dry run: who gets a new login, who already has an account, who is
  // already on the roll or belongs to another college. Nothing is written.
  const planKey = JSON.stringify([payloadRows, defaultCourse]);
  useEffect(() => {
    if (!open || result) return;
    if (payloadRows.length === 0) {
      setPlan(null);
      setPlanError(null);
      return;
    }
    let cancelled = false;
    setChecking(true);
    const t = window.setTimeout(() => {
      runRoster({ kind: 'learners', rows: payloadRows, course_id: defaultCourse || null, dry_run: true })
        .then((p) => {
          if (!cancelled) {
            setPlan(p);
            setPlanError(null);
          }
        })
        .catch((e: Error) => {
          if (!cancelled) {
            setPlan(null);
            setPlanError(e.message);
          }
        })
        .finally(() => {
          if (!cancelled) setChecking(false);
        });
    }, 600);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planKey, open, result]);

  const planByIndex = useMemo(() => new Map((plan?.items ?? []).map((it) => [it.index, it])), [plan]);

  const rowState = (r: ParsedRow, i: number): RowState => {
    if (r.errors.length > 0 || dupRows.has(r.id)) return 'blocked';
    const p = planByIndex.get(i);
    if (p && (p.outcome === 'skipped' || p.outcome === 'failed')) return 'blocked';
    if (r.warnings.length > 0 || unknownCohort(r) || (p?.notes?.length ?? 0) > 0) return 'warn';
    return 'ready';
  };
  const states = rows.map((r, i) => rowState(r, i));
  const errorCount = states.filter((s) => s === 'blocked').length;
  const warnCount = states.filter((s) => s === 'warn').length;
  const readyCount = states.filter((s) => s === 'ready').length;
  const toGoIn = plan
    ? plan.items.filter((it) => it.outcome === 'created' || it.outcome === 'matched').length
    : validRows.length;
  const alreadyOn = plan ? plan.summary.already : 0;
  const shownRows = rows
    .map((r, i) => ({ r, i }))
    .filter(({ r, i }) => filter === 'all' || rowState(r, i) === filter);

  const handleFile = async (file: File) => {
    if (!file) return;
    const text = await file.text();
    setPaste(text);
  };

  // A self-serve structuring aid: the college fills this and re-uploads it
  // themselves — sensitive learner data never leaves their control / never
  // emails to us. SEND/EHCP are deliberately NOT here; those are enriched
  // per-learner in Student 360 by the support team, not bulk-pasted.
  const downloadTemplate = () => {
    const csv =
      'name,email,phone,uln,cohort,expected end date\n' +
      'Jane Smith,jane.smith@example.com,07700900000,1234567890,Electrical L3 — 2026 intake,2028-07-31\n';
    downloadCsv(csv, 'elec-mate-learner-import-template.csv');
  };

  // The rows that did not go in, with the reason, in the same shape as the
  // template so the college can fix them and paste them straight back.
  const downloadNotEnrolled = () => {
    if (!result) return;
    const byIndex = new Map(rows.map((r, i) => [i, r]));
    const lines = result.items
      .filter((it) => it.outcome === 'skipped' || it.outcome === 'failed')
      .map((it) => {
        const r = byIndex.get(it.index);
        return [r?.name ?? it.name, r?.email ?? it.email, r?.phone ?? '', r?.uln ?? '', r?.cohort ?? '', r?.expected_end_date ?? '', it.detail ?? '']
          .map((v) => csvEscape(v))
          .join(',');
      });
    downloadCsv(
      'name,email,phone,uln,cohort,expected end date,reason\n' + lines.join('\n') + '\n',
      'elec-mate-learners-not-enrolled.csv'
    );
  };

  const handlePreviewEmail = async () => {
    if (previewing) return;
    setPreviewing(true);
    try {
      const p = await previewRosterEmail({
        kind: 'learners',
        rows: payloadRows.length ? payloadRows.slice(0, 1) : [{ index: 0, name: 'Jane Smith', email: 'jane.smith@example.com' }],
        course_id: defaultCourse || null,
      });
      openEmailPreview(p.html);
    } catch (e) {
      toast({ title: 'Could not show the email', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setPreviewing(false);
    }
  };

  const handleSubmit = async () => {
    if (submitting || validRows.length === 0) return;
    setSubmitting(true);
    try {
      const res = await runRoster({
        kind: 'learners',
        rows: payloadRows,
        course_id: defaultCourse || null,
        send_email: sendEmail,
      });
      // Rows the local check ruled out never reached the server: add them, with why.
      const local: RosterItem[] = rows
        .map((r, idx) => ({ r, idx }))
        .filter(({ r }) => r.errors.length > 0 || dupRows.has(r.id))
        .map(({ r, idx }) => ({
          index: idx,
          name: r.name,
          email: r.email,
          outcome: 'skipped' as const,
          detail: [...r.errors, dupReason.get(r.id)].filter(Boolean).join('; '),
        }));
      const items = [...res.items, ...local].sort((a, b) => a.index - b.index);
      const summary = { ...res.summary, total: items.length, skipped: res.summary.skipped + local.length };
      setResult({ ...res, items, summary });
      void queryClient.invalidateQueries({ queryKey: ['college-students'] });
      const inCount = summary.created + summary.matched;
      toast({
        title: inCount > 0 ? `${inCount} learner${inCount === 1 ? '' : 's'} added` : 'No new learners added',
        description: sendEmail
          ? `${summary.emailed} emailed their join link.`
          : 'Nobody was emailed. Hand out the logins shown here.',
        variant: inCount > 0 || summary.already > 0 ? 'default' : 'destructive',
      });
    } catch (e) {
      toast({ title: 'Nothing was saved', description: (e as Error).message, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const courseOptions = [
    { value: '__none', label: 'No course (set later)' },
    ...activeCourses.map((c) => ({ value: c.id, label: c.name })),
  ];
  const cohortOptions = [
    { value: '__none', label: 'No default' },
    ...activeCohorts.map((c) => ({ value: c.id, label: c.name })),
  ];

  /* ── Result: every row and what happened to it ── */
  if (result) {
    const s = result.summary;
    const notIn = result.items.filter((it) => it.outcome === 'skipped' || it.outcome === 'failed');
    const isIn = (it: RosterItem) => it.outcome === 'created' || it.outcome === 'matched' || it.outcome === 'already';
    const shown = result.items.filter((it) =>
      resultFilter === 'all' ? true : resultFilter === 'in' ? isIn(it) : !isIn(it)
    );
    return (
      <FormSheet
        open={open}
        onOpenChange={onOpenChange}
        width="wide"
        bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]"
        eyebrow="Bulk enrol learners"
        title={`${s.created + s.matched} added, ${s.already} already on`}
        description={
          notIn.length === 0
            ? 'Every row is on your roll now.'
            : 'The rows that did not go in are listed with the reason. Download them, fix them and paste them back in. Running the same list again is safe: nobody is added twice.'
        }
        footer={
          <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonPrimaryCn, 'w-full')}>
            Done
          </button>
        }
      >
        <div className="space-y-5">
          <dl className="grid grid-cols-3 gap-2.5">
            <Figure label="New logins" value={s.created} tone="good" />
            <Figure label="Had an account" value={s.matched} tone="good" />
            <Figure label="Already on" value={s.already} />
            <Figure label="Emailed" value={s.emailed} tone="good" />
            <Figure label="Skipped" value={s.skipped} tone={s.skipped ? 'warn' : undefined} />
            <Figure label="Failed" value={s.failed} tone={s.failed ? 'bad' : undefined} />
          </dl>
          {notIn.length > 0 && (
            <button type="button" onClick={downloadNotEnrolled} className={cn(buttonSecondaryCn, 'w-full')}>
              Download the {notIn.length} not added (CSV)
            </button>
          )}
          <p className="text-[12.5px] leading-relaxed text-white">
            New logins are linked to your roll straight away. Learners who already had an Elec-Mate account are on
            your roll and linked as soon as they open their join link.
            {result.sent_email === false
              ? ' Nobody was emailed: hand out the new logins below, and give learners who already had an account their join code.'
              : ''}
          </p>
          <TempLoginsPanel items={result.items} kind="learners" />
        </div>

        <section className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                ['all', `All ${result.items.length}`],
                ['in', `On your roll ${result.items.filter(isIn).length}`],
                ['not', `Not added ${notIn.length}`],
              ] as const
            ).map(([k, label]) => (
              <button key={k} type="button" onClick={() => setResultFilter(k)} className={chipCn(resultFilter === k)}>
                {label}
              </button>
            ))}
          </div>
          <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]">
            {shown.map((it) => (
              <li key={it.index} className="flex items-start gap-3 px-4 py-3">
                <span className="w-7 shrink-0 pt-0.5 text-[12px] tabular-nums text-white">{it.index + 1}.</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-medium text-white">{it.name || 'No name'}</div>
                  <div className="truncate text-[12px] text-white">
                    {it.email || 'No email'}
                    {it.join_code ? ` · join code ${it.join_code}` : ''}
                  </div>
                  {it.detail && (
                    <div className={cn('mt-1 text-[12.5px] leading-snug', isIn(it) ? 'text-white' : 'text-orange-300')}>
                      {it.detail}
                    </div>
                  )}
                  {it.emailed === true && <div className="mt-0.5 text-[12px] text-emerald-300">Emailed</div>}
                  {it.emailed === false && (
                    <div className="mt-0.5 text-[12px] text-orange-300">Email not sent{it.email_error ? `: ${it.email_error}` : ''}</div>
                  )}
                </div>
                <span className={cn('shrink-0 pt-0.5 text-[12.5px] font-semibold', OUTCOME_TONE[it.outcome])}>
                  {OUTCOME_LABEL[it.outcome]}
                </span>
              </li>
            ))}
            {shown.length === 0 && <li className="px-4 py-6 text-center text-[13px] text-white">Nothing here.</li>}
          </ul>
        </section>
      </FormSheet>
    );
  }

  /* ── Paste, check, enrol ── */
  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]"
      eyebrow="Bulk enrol learners"
      title="Paste a list or drop a CSV"
      description="From your MIS export, a Google Sheet or any CSV. Each learner gets an Elec-Mate login (or is matched to the one they have) and an email with their join link."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || validRows.length === 0 || !!planError}
            className={buttonPrimaryCn}
          >
            {submitting
              ? 'Adding…'
              : rows.length === 0
                ? 'Paste some rows'
                : validRows.length === 0
                  ? 'Nothing ready to enrol'
                  : toGoIn === 0 && alreadyOn > 0
                    ? `Update ${alreadyOn} already on`
                    : `Enrol ${toGoIn} learner${toGoIn === 1 ? '' : 's'}${sendEmail ? ' and email' : ''}`}
          </button>
        </div>
      }
    >
      {/* ── Left: the list and the defaults ── */}
      <div className="space-y-7">
        <Section title="1. Your list">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files?.[0];
              if (f) void handleFile(f);
            }}
            className={cn('rounded-xl transition-shadow', dragOver && 'ring-1 ring-elec-yellow')}
          >
            <label htmlFor="bulk-paste" className={labelCn}>
              Paste rows or drop a CSV here
            </label>
            <textarea
              id="bulk-paste"
              value={paste}
              onChange={(e) => setPaste(e.target.value)}
              rows={9}
              spellCheck={false}
              placeholder={`name\temail\tphone\tuln\tcohort\nJane Smith\tjane@example.com\t07700900000\t1234567890\tElectrical L3 — 2026 intake`}
              className={cn(textareaCn, 'min-h-[200px] font-mono text-[13px] md:text-[13px] leading-relaxed')}
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <label className="inline-flex h-11 cursor-pointer items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation">
              <input
                type="file"
                accept=".csv,.txt,.tsv"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void handleFile(f);
                  e.target.value = '';
                }}
                className="hidden"
              />
              Choose a CSV file
            </label>
            <button
              type="button"
              onClick={downloadTemplate}
              className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-white touch-manipulation hover:text-elec-yellow"
            >
              Download template
            </button>
            {paste && (
              <button
                type="button"
                onClick={() => setPaste('')}
                className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:text-red-300"
              >
                Clear
              </button>
            )}
          </div>
        </Section>

        <Section title="2. Where they go">
          {/* Course — all learners enrol onto this; setting it seeds each
              learner's AC coverage so progress tracking works from day one. */}
          <div>
            <span className={labelCn}>Course</span>
            <MobileSelectPicker
              value={defaultCourse || '__none'}
              onValueChange={(v) => setDefaultCourse(v === '__none' ? '' : v)}
              options={courseOptions}
              placeholder="Select a course"
              title="Course"
              triggerClassName={selectTriggerCn}
            />
            <p className={hintCn}>Everyone enrols onto this course. It sets up their AC coverage from day one.</p>
          </div>
          <div className={grid2Cn}>
            <div>
              <span className={labelCn}>Default cohort</span>
              <MobileSelectPicker
                value={defaultCohort || '__none'}
                onValueChange={(v) => setDefaultCohort(v === '__none' ? '' : v)}
                options={cohortOptions}
                placeholder="No default"
                title="Default cohort"
                triggerClassName={selectTriggerCn}
              />
              <p className={hintCn}>For rows that don't name one.</p>
            </div>
            <div>
              <label htmlFor="bulk-end" className={labelCn}>
                Default expected end
              </label>
              <input
                id="bulk-end"
                type="date"
                value={defaultEnd}
                onChange={(e) => setDefaultEnd(e.target.value)}
                className={inputCn}
              />
              <p className={hintCn}>For rows without an end date.</p>
            </div>
          </div>
        </Section>

        <Section title="3. Tell them">
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setSendEmail(true)} className={cn(chipCn(sendEmail), 'h-11')}>
              Email each learner
            </button>
            <button type="button" onClick={() => setSendEmail(false)} className={cn(chipCn(!sendEmail), 'h-11')}>
              Don't email, I'll hand out logins
            </button>
          </div>
          <p className={hintCn}>
            {sendEmail
              ? 'New learners get their login and join link. Learners who already use Elec-Mate get a link to join, and are linked when they open it.'
              : 'Accounts are still made and linked. After you enrol, you see each new login (email and temporary password) to hand out, and the join code for anyone who already had an account.'}
          </p>
          <button
            type="button"
            onClick={() => void handlePreviewEmail()}
            disabled={previewing}
            className="inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            {previewing ? 'Opening…' : 'See the email they get'}
          </button>
        </Section>
      </div>

      {/* ── Right: the dry run ── */}
      <Section
        top
        title="4. Check before you enrol"
        aside={
          rows.length > 0 ? (
            <span className="text-[12px] tabular-nums text-white">
              {checking ? 'Checking…' : `${rows.length} rows`}
            </span>
          ) : undefined
        }
      >
        {rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/[0.14] px-5 py-10 text-center">
            <p className="text-[14px] font-semibold text-white">Nothing pasted yet</p>
            <p className="mx-auto mt-1 max-w-sm text-[13px] leading-relaxed text-white">
              Each row is checked here first: missing or invalid emails, learners already on your roll, people who
              already have an Elec-Mate account and repeats in the list. Nothing is saved until you press Enrol.
            </p>
          </div>
        ) : (
          <>
            <dl className="grid grid-cols-3 gap-2.5">
              <Figure label="Ready" value={readyCount} tone="good" />
              <Figure label="Needs a look" value={warnCount} tone={warnCount ? 'warn' : undefined} />
              <Figure label="Won't go in" value={errorCount} tone={errorCount ? 'bad' : undefined} />
            </dl>
            {planError ? (
              <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[12.5px] leading-relaxed text-orange-300">
                {planError}
              </p>
            ) : (
              <p className="text-[12.5px] leading-relaxed text-white">
                This is a dry run, nothing is saved yet.
                {plan
                  ? ` New logins: ${plan.summary.created}. Already use Elec-Mate: ${plan.summary.matched}. Already on your roll: ${plan.summary.already}.`
                  : ''}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  ['all', `All ${rows.length}`],
                  ['ready', `Ready ${readyCount}`],
                  ['warn', `Needs a look ${warnCount}`],
                  ['blocked', `Won't go in ${errorCount}`],
                ] as const
              ).map(([k, label]) => (
                <button key={k} type="button" onClick={() => setFilter(k)} className={chipCn(filter === k)}>
                  {label}
                </button>
              ))}
            </div>
            <ul className="max-h-[440px] divide-y divide-white/[0.06] overflow-y-auto rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]">
              {shownRows.map(({ r, i }) => (
                <RowPreview
                  key={r.id}
                  index={i + 1}
                  row={r}
                  state={rowState(r, i)}
                  dupReason={dupReason.get(r.id)}
                  unknownCohort={unknownCohort(r) ? defaultCohortName || null : undefined}
                  planned={planByIndex.get(i)}
                />
              ))}
              {shownRows.length === 0 && (
                <li className="px-4 py-6 text-center text-[13px] text-white">No rows in this group.</li>
              )}
            </ul>
          </>
        )}
      </Section>
    </FormSheet>
  );
}

/* ───────────────── helpers ───────────────── */

const hintCn = 'mt-1.5 text-[12px] leading-relaxed text-white';

/** A plain section: white heading over a hairline. */
function Section({
  title,
  aside,
  top,
  children,
}: {
  title: string;
  aside?: ReactNode;
  top?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        'space-y-4 border-t border-white/[0.1] pt-4 first:border-t-0 first:pt-0',
        top && 'lg:border-t-0 lg:pt-0'
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[15px] font-semibold tracking-tight text-white">{title}</h3>
        {aside}
      </div>
      {children}
    </section>
  );
}

function Figure({ label, value, tone }: { label: string; value: number; tone?: 'good' | 'warn' | 'bad' }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-3 py-3 sm:px-4">
      <dt className="text-[12px] leading-tight text-white">{label}</dt>
      <dd
        className={cn(
          'mt-1 text-[22px] font-bold leading-none tabular-nums',
          tone === 'good' && value > 0
            ? 'text-emerald-300'
            : tone === 'warn'
              ? 'text-orange-300'
              : tone === 'bad'
                ? 'text-red-300'
                : 'text-white'
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function RowPreview({
  index,
  row,
  state,
  dupReason,
  unknownCohort,
  planned,
}: {
  index: number;
  row: ParsedRow;
  state: RowState;
  dupReason?: string;
  /** Set when the row's cohort matches no active cohort: the fallback name, or null for none. */
  unknownCohort?: string | null;
  /** The server dry run's verdict on this row, once it has come back. */
  planned?: RosterItem;
}) {
  const serverBlocked = planned && (planned.outcome === 'skipped' || planned.outcome === 'failed');
  const issues = [
    ...row.errors,
    ...(dupReason ? [dupReason] : []),
    ...(serverBlocked && planned?.detail ? [planned.detail] : []),
  ];
  const notes = Array.from(
    new Set([
      ...row.warnings,
      ...(unknownCohort !== undefined
        ? [`No cohort called "${row.cohort}"${unknownCohort ? `, goes into ${unknownCohort}` : ', no cohort set'}`]
        : []),
      ...(planned?.notes ?? []),
    ])
  );
  const verdict =
    planned && !serverBlocked
      ? planned.outcome === 'created'
        ? 'Gets a new login'
        : planned.outcome === 'matched'
          ? 'Already uses Elec-Mate: gets a link to join'
          : (planned.detail ?? 'Already on your roll')
      : null;
  return (
    <li className="flex items-start gap-3 px-4 py-3">
      <span className="w-7 shrink-0 pt-0.5 text-[12px] tabular-nums text-white">{index}.</span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="truncate text-[14px] font-medium text-white">{row.name || 'No name'}</span>
          {row.uln && <span className="font-mono text-[12px] text-white">{row.uln}</span>}
        </div>
        <div className="mt-0.5 truncate text-[12px] text-white">
          {row.email || 'No email'}
          {row.cohort ? ` · ${row.cohort}` : ''}
          {row.expected_end_date ? ` · ends ${row.expected_end_date}` : ''}
        </div>
        {verdict && <div className="mt-1 text-[12.5px] leading-snug text-white">{verdict}</div>}
        {issues.length > 0 && (
          <div className="mt-1 text-[12.5px] leading-snug text-red-300">{issues.join(' · ')}</div>
        )}
        {notes.length > 0 && (
          <div className="mt-1 text-[12.5px] leading-snug text-orange-300">{notes.join(' · ')}</div>
        )}
      </div>
      <span
        className={cn(
          'shrink-0 pt-0.5 text-[12.5px] font-semibold',
          state === 'blocked' ? 'text-red-300' : state === 'warn' ? 'text-orange-300' : 'text-emerald-300'
        )}
      >
        {state === 'blocked'
          ? "Won't go in"
          : planned?.outcome === 'already'
            ? 'On roll'
            : state === 'warn'
              ? 'Check'
              : 'Ready'}
      </span>
    </li>
  );
}
