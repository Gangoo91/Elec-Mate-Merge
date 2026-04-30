import { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

/* ==========================================================================
   BulkAddStudentsSheet — paste/CSV-bulk-enrol learners into college_students.

   Why: Jay's first ask after seeing the platform. Currently new cohorts go
   in one student at a time via AddStudentDialog. A typical Sept intake is
   30-60 learners. This sheet lets a tutor paste a tab/CSV block from their
   existing MIS export and bulk-create everyone in one tap.

   Flow:
     1. Tutor pastes rows OR drops a CSV file
     2. Parser splits on tab / comma / semicolon and maps known headers
     3. Preview table shows each row with green/amber/red status
     4. Tutor picks default cohort + default expected end date
     5. Confirm → batched inserts run sequentially (RLS-friendly), with
        per-row success/fail tracking
     6. Final toast says "27 enrolled, 3 skipped (duplicate ULN)"

   v1 deliberately uses sequential inserts via existing addStudent helper
   so RLS, audit trails and the ActiveStudent type all stay consistent
   with manual entries. A bulk edge fn can come later as an optimisation.

   ELE-907 / [C1].
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

interface RunResult {
  total: number;
  inserted: number;
  skipped: number;
  failed: number;
  failures: Array<{ name: string; reason: string }>;
}

const HEADER_ALIASES: Record<
  string,
  keyof Pick<ParsedRow, 'name' | 'email' | 'phone' | 'uln' | 'cohort' | 'expected_end_date'>
> = {
  // Each MIS export uses different headings. Map common ones.
  name: 'name',
  'full name': 'name',
  'student name': 'name',
  'learner name': 'name',
  email: 'email',
  'email address': 'email',
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

function parseBlock(text: string, defaultCohort: string): ParsedRow[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return [];

  // Detect if first row is a header — looks for any aliased word.
  const firstCells = splitLine(lines[0]).map((c) => c.toLowerCase());
  const hasHeader = firstCells.some((c) => HEADER_ALIASES[c]);

  let columns: Array<keyof ParsedRow | null>;
  let dataLines: string[];

  if (hasHeader) {
    columns = firstCells.map((c) => HEADER_ALIASES[c] ?? null);
    dataLines = lines.slice(1);
  } else {
    // Positional fallback: name | email | phone | uln | cohort | expected_end_date
    columns = ['name', 'email', 'phone', 'uln', 'cohort', 'expected_end_date'];
    dataLines = lines;
  }

  return dataLines.map((line, i) => {
    const cells = splitLine(line);
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
      const col = columns[c];
      if (!col) continue;
      const v = cells[c];
      // Skip empty cells — an empty cohort column shouldn't wipe the
      // default cohort the tutor set above; an empty phone shouldn't be
      // stored as the literal empty string. Only assign when there's
      // actual data.
      if (v === '' || v == null) continue;
      if (col === 'expected_end_date') row[col] = parseDate(v);
      else if (col in row) (row as unknown as Record<string, string>)[col] = v;
    }
    // Validate
    if (!row.name) row.errors.push('Missing name');
    if (!row.email) row.errors.push('Missing email');
    else if (!EMAIL_RE.test(row.email)) row.errors.push('Invalid email');
    if (row.uln && !ULN_RE.test(row.uln)) row.warnings.push('ULN should be 10 digits');
    if (!row.cohort) row.warnings.push('No cohort — set default below');
    return row;
  });
}

export function BulkAddStudentsSheet({ open, onOpenChange, defaultCohortId }: Props) {
  const { cohorts, addStudent, students } = useCollegeSupabase();
  const { toast } = useToast();
  const activeCohorts = cohorts.filter((c) => c.status === 'Active');

  const [paste, setPaste] = useState('');
  const [defaultCohort, setDefaultCohort] = useState(defaultCohortId ?? '');
  const [defaultEnd, setDefaultEnd] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  // Reset whenever the sheet opens.
  useEffect(() => {
    if (open) {
      setPaste('');
      setDefaultCohort(defaultCohortId ?? '');
      setDefaultEnd('');
      setResult(null);
      setProgress({ done: 0, total: 0 });
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

  // Cross-check duplicates against existing roll (case-insensitive email match).
  const existingEmails = useMemo(
    () => new Set(students.map((s) => s.email.toLowerCase())),
    [students]
  );
  const dupRows = useMemo(() => {
    const set = new Set<string>();
    rows.forEach((r) => {
      if (r.email && existingEmails.has(r.email.toLowerCase())) set.add(r.id);
    });
    // also dedupe within the paste itself
    const seenInPaste = new Map<string, string>();
    rows.forEach((r) => {
      if (!r.email) return;
      const k = r.email.toLowerCase();
      const prior = seenInPaste.get(k);
      if (prior) {
        set.add(r.id);
      } else {
        seenInPaste.set(k, r.id);
      }
    });
    return set;
  }, [rows, existingEmails]);

  const validRows = rows.filter((r) => r.errors.length === 0 && !dupRows.has(r.id));
  const errorCount = rows.length - validRows.length;

  const handleFile = async (file: File) => {
    if (!file) return;
    const text = await file.text();
    setPaste(text);
  };

  const handleSubmit = async () => {
    if (submitting || validRows.length === 0) return;
    setSubmitting(true);
    setProgress({ done: 0, total: validRows.length });

    const failures: RunResult['failures'] = [];
    let inserted = 0;

    const startDate = new Date().toISOString().split('T')[0];

    for (let i = 0; i < validRows.length; i++) {
      const r = validRows[i];
      const cohortId = cohortIdByName.get(r.cohort.toLowerCase()) || defaultCohort || null;
      try {
        await addStudent({
          name: r.name,
          email: r.email,
          phone: r.phone || null,
          uln: r.uln || null,
          cohort_id: cohortId,
          expected_end_date: r.expected_end_date || defaultEnd || null,
          college_id: null,
          user_id: null,
          employer_id: null,
          course_id: null,
          start_date: startDate,
          status: 'Active',
          progress_percent: 0,
          risk_level: 'Low',
          photo_url: null,
        });
        inserted += 1;
      } catch (e) {
        failures.push({
          name: r.name || r.email || `Row ${i + 1}`,
          reason: (e as Error).message ?? 'Unknown error',
        });
      } finally {
        setProgress({ done: i + 1, total: validRows.length });
      }
    }

    const finalResult: RunResult = {
      total: rows.length,
      inserted,
      skipped: rows.length - validRows.length,
      failed: failures.length,
      failures,
    };
    setResult(finalResult);
    setSubmitting(false);

    toast({
      title:
        inserted > 0
          ? `${inserted} learner${inserted === 1 ? '' : 's'} enrolled`
          : 'No learners enrolled',
      description: failures.length
        ? `${failures.length} failed — see report.`
        : finalResult.skipped > 0
          ? `${finalResult.skipped} skipped (duplicate or missing data)`
          : 'All rows inserted cleanly.',
      variant: inserted > 0 ? 'default' : 'destructive',
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <SheetTitle className="sr-only">Bulk enrol students</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-white/[0.06]">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
              Bulk enrol learners
            </div>
            <h2 className="mt-1 text-[18px] font-semibold text-white tracking-tight leading-tight">
              Paste a list, drop a CSV
            </h2>
            <p className="mt-1 text-[12px] text-white leading-snug">
              Paste from your MIS export, a Google Sheet or any CSV. Tab, comma, semicolon all work.
              Header row optional — we'll detect <span className="font-mono">name</span>,{' '}
              <span className="font-mono">email</span>, <span className="font-mono">uln</span>,{' '}
              <span className="font-mono">cohort</span> automatically.
            </p>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-4">
            {result ? (
              <ResultCard result={result} onDismiss={() => onOpenChange(false)} />
            ) : (
              <>
                {/* Paste textarea + file drop */}
                <Field label="Paste rows or drop a CSV">
                  <textarea
                    value={paste}
                    onChange={(e) => setPaste(e.target.value)}
                    rows={8}
                    spellCheck={false}
                    placeholder={`name\temail\tphone\tuln\tcohort\nJane Smith\tjane@example.com\t07700900000\t1234567890\tElectrical L3 — 2026 intake`}
                    className="w-full min-h-[180px] px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[13px] text-white placeholder:text-white/40 leading-relaxed focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-elec-yellow/30 font-mono touch-manipulation resize-y"
                  />
                </Field>

                <div className="flex items-center gap-2 flex-wrap">
                  <label className="inline-flex items-center h-9 px-3 rounded-lg border border-white/[0.10] bg-white/[0.02] hover:bg-white/[0.04] text-[12px] font-medium text-white cursor-pointer touch-manipulation">
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
                    Drop CSV file…
                  </label>
                  {paste && (
                    <button
                      type="button"
                      onClick={() => setPaste('')}
                      className="text-[12px] font-medium text-white hover:text-rose-300 transition-colors touch-manipulation"
                    >
                      Clear paste
                    </button>
                  )}
                </div>

                {/* Defaults */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Default cohort" hint="Applied to rows that don't specify one">
                    <Select
                      value={defaultCohort}
                      onValueChange={(v) => setDefaultCohort(v === '__none' ? '' : v)}
                    >
                      <SelectTrigger className="h-11 bg-white/[0.03] border-white/[0.08] text-white">
                        <SelectValue placeholder="No default" />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(0_0%_10%)] border-white/[0.08] text-white max-h-72">
                        <SelectItem value="__none">No default</SelectItem>
                        {activeCohorts.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Default expected end" hint="ISO yyyy-mm-dd">
                    <input
                      type="date"
                      value={defaultEnd}
                      onChange={(e) => setDefaultEnd(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[14px] text-white focus:outline-none focus:border-white/30 touch-manipulation"
                    />
                  </Field>
                </div>

                {/* Preview */}
                {rows.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Pill tone="green">{validRows.length} ready</Pill>
                        {errorCount > 0 && <Pill tone="red">{errorCount} blocked</Pill>}
                      </div>
                      <span className="text-[11px] text-white">{rows.length} total rows</span>
                    </div>
                    <div className="rounded-lg border border-white/[0.08] overflow-hidden">
                      <ul className="divide-y divide-white/[0.06] max-h-[320px] overflow-y-auto">
                        {rows.map((r, i) => (
                          <RowPreview
                            key={r.id}
                            index={i + 1}
                            row={r}
                            isDuplicate={dupRows.has(r.id)}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {!result && (
            <div className="px-4 sm:px-5 py-3 border-t border-white/[0.06] bg-[hsl(0_0%_10%)] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                disabled={submitting}
                className="h-11 px-4 rounded-lg text-[13px] font-medium text-white hover:text-white hover:bg-white/[0.04] transition-colors touch-manipulation disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || validRows.length === 0}
                className={cn(
                  'inline-flex items-center h-11 px-4 rounded-lg text-[13px] font-semibold text-black transition-colors touch-manipulation',
                  submitting || validRows.length === 0
                    ? 'bg-white/[0.05] text-white/40'
                    : 'bg-elec-yellow hover:bg-elec-yellow/90'
                )}
              >
                {submitting
                  ? `Enrolling ${progress.done}/${progress.total}…`
                  : `Enrol ${validRows.length} learner${validRows.length === 1 ? '' : 's'} →`}
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ───────────────── helpers ───────────────── */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white">
        {label}
      </span>
      {hint && <span className="block mt-0.5 text-[11.5px] text-white">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Pill({ tone, children }: { tone: 'green' | 'red' | 'amber'; children: React.ReactNode }) {
  const cls =
    tone === 'green'
      ? 'border-emerald-300/30 text-emerald-200 bg-emerald-500/[0.06]'
      : tone === 'red'
        ? 'border-rose-300/30 text-rose-200 bg-rose-500/[0.06]'
        : 'border-amber-300/30 text-amber-200 bg-amber-500/[0.06]';
  return (
    <span
      className={cn(
        'inline-flex items-center h-6 px-2 rounded-md border text-[11px] font-semibold',
        cls
      )}
    >
      {children}
    </span>
  );
}

function RowPreview({
  index,
  row,
  isDuplicate,
}: {
  index: number;
  row: ParsedRow;
  isDuplicate: boolean;
}) {
  const blocked = row.errors.length > 0 || isDuplicate;
  return (
    <li className="px-3 py-2.5 flex items-start gap-3">
      <span
        className={cn(
          'shrink-0 w-1 h-10 rounded-full',
          blocked ? 'bg-rose-400' : row.warnings.length ? 'bg-amber-400' : 'bg-emerald-400'
        )}
        aria-hidden="true"
      />
      <span className="shrink-0 text-[10.5px] tabular-nums text-white pt-0.5 w-7">{index}.</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[13px] font-medium text-white truncate">
            {row.name || <em className="text-white">no name</em>}
          </span>
          {row.uln && <span className="text-[10.5px] font-mono text-white">{row.uln}</span>}
          {isDuplicate && <Pill tone="red">duplicate</Pill>}
        </div>
        <div className="mt-0.5 text-[11px] text-white truncate">
          {row.email}
          {row.cohort ? ` · ${row.cohort}` : ''}
          {row.expected_end_date ? ` · ends ${row.expected_end_date}` : ''}
        </div>
        {(row.errors.length > 0 || row.warnings.length > 0) && (
          <div className="mt-1 flex items-center flex-wrap gap-1">
            {row.errors.map((er, i) => (
              <span
                key={`e-${i}`}
                className="inline-flex items-center h-5 px-1.5 rounded-md border border-rose-300/30 bg-rose-500/[0.06] text-[10.5px] font-semibold text-rose-200"
              >
                {er}
              </span>
            ))}
            {row.warnings.map((w, i) => (
              <span
                key={`w-${i}`}
                className="inline-flex items-center h-5 px-1.5 rounded-md border border-amber-300/30 bg-amber-500/[0.06] text-[10.5px] font-medium text-amber-200"
              >
                {w}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

function ResultCard({ result, onDismiss }: { result: RunResult; onDismiss: () => void }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_11%)] px-4 py-4 space-y-3">
      <div>
        <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-emerald-300">
          Done
        </div>
        <h3 className="mt-1 text-[18px] font-semibold text-white tracking-tight">
          {result.inserted} of {result.total} enrolled
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Stat label="Inserted" value={result.inserted} tone="green" />
        <Stat label="Skipped" value={result.skipped} tone="amber" />
        <Stat label="Failed" value={result.failed} tone="red" />
      </div>
      {result.failures.length > 0 && (
        <details className="text-[12px] text-white">
          <summary className="cursor-pointer font-medium">Show failures</summary>
          <ul className="mt-2 space-y-1">
            {result.failures.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-300 shrink-0">•</span>
                <span className="min-w-0">
                  <span className="font-medium">{f.name}</span> — {f.reason}
                </span>
              </li>
            ))}
          </ul>
        </details>
      )}
      <button
        type="button"
        onClick={onDismiss}
        className="w-full h-11 rounded-lg bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
      >
        Done
      </button>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: 'green' | 'amber' | 'red';
}) {
  const cls =
    tone === 'green'
      ? 'border-emerald-300/30 bg-emerald-500/[0.06]'
      : tone === 'amber'
        ? 'border-amber-300/30 bg-amber-500/[0.06]'
        : 'border-rose-300/30 bg-rose-500/[0.06]';
  return (
    <div className={cn('rounded-lg border p-2.5', cls)}>
      <div className="text-[9.5px] font-medium uppercase tracking-[0.22em] text-white">{label}</div>
      <div className="mt-1 text-[20px] font-bold tabular-nums text-white leading-none">{value}</div>
    </div>
  );
}
