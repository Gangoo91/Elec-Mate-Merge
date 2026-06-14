import { useCallback, useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

/* ==========================================================================
   LessonRegisterSheet — live class register for an in-progress lesson.

   Why: tutors do this every class. Right now `MarkAttendanceSheet` only
   handles ONE learner at a time — useless when 25 students walk in.
   This sheet shows the whole cohort, one row each, four-state segmented
   toggle (Present / Late / Absent / Authorised), saves on every tap so
   nothing is lost if the phone locks mid-register.

   Data model: `college_attendance` keys on (student_id, date) with an
   onConflict upsert — the existing MarkAttendanceSheet already uses the
   same shape, so re-opening a register or re-marking is idempotent.

   ELE-908 / [C2].
   ========================================================================== */

type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Authorised';

const STATUSES: Array<{
  value: AttendanceStatus;
  label: string;
  short: string;
  active: string;
  idle: string;
}> = [
  {
    value: 'Present',
    label: 'Present',
    short: 'P',
    active: 'bg-emerald-500 text-black border-emerald-500',
    idle: 'border-white/[0.10] text-white hover:bg-emerald-500/[0.12] hover:border-emerald-400/30',
  },
  {
    value: 'Late',
    label: 'Late',
    short: 'L',
    active: 'bg-amber-400 text-black border-amber-400',
    idle: 'border-white/[0.10] text-white hover:bg-amber-500/[0.12] hover:border-amber-400/30',
  },
  {
    value: 'Absent',
    label: 'Absent',
    short: 'A',
    active: 'bg-rose-500 text-black border-rose-500',
    idle: 'border-white/[0.10] text-white hover:bg-rose-500/[0.12] hover:border-rose-400/30',
  },
  {
    value: 'Authorised',
    label: 'Auth',
    short: 'X',
    active: 'bg-blue-500 text-black border-blue-500',
    idle: 'border-white/[0.10] text-white hover:bg-blue-500/[0.12] hover:border-blue-400/30',
  },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Cohort to register. Required — there's no "register" without one. */
  cohortId: string;
  cohortName?: string | null;
  /** Optional lesson title for the header. */
  lessonTitle?: string | null;
  /** ISO date — defaults to today. Tutors can pre-mark a future class
      if they want, but the default is correct 99% of the time. */
  date?: string;
}

interface RegisterRow {
  student_id: string;
  student_name: string;
  status: AttendanceStatus | null;
  notes: string;
  /** Existing attendance row id, if we're editing rather than inserting. */
  existing_id: string | null;
  /** Local saving flag so the row dims briefly on tap. */
  saving: boolean;
  /** Last save error (per-row, not global). */
  error: string | null;
}

export function LessonRegisterSheet({
  open,
  onOpenChange,
  cohortId,
  cohortName,
  lessonTitle,
  date,
}: Props) {
  const { toast } = useToast();
  const [registerDate, setRegisterDate] = useState(
    () => date ?? new Date().toISOString().slice(0, 10)
  );
  const [rows, setRows] = useState<RegisterRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [recordedBy, setRecordedBy] = useState<string | null>(null);

  // Pull cohort roster + any existing attendance for this date.
  const fetchRoster = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const uid = userRes?.user?.id ?? null;
      setRecordedBy(uid);

      const [studentsRes, attendanceRes] = await Promise.all([
        supabase
          .from('college_students')
          .select('id, name, status')
          .eq('cohort_id', cohortId)
          .order('name', { ascending: true }),
        supabase
          .from('college_attendance')
          .select('id, student_id, status, notes')
          .eq('cohort_id', cohortId)
          .eq('date', registerDate),
      ]);
      if (studentsRes.error) throw studentsRes.error;
      if (attendanceRes.error) throw attendanceRes.error;

      const students = (studentsRes.data ?? []) as Array<{
        id: string;
        name: string;
        status: string | null;
      }>;
      const attendance = (attendanceRes.data ?? []) as Array<{
        id: string;
        student_id: string | null;
        status: string | null;
        notes: string | null;
      }>;
      const byStudent = new Map(
        attendance.filter((a) => a.student_id).map((a) => [a.student_id as string, a])
      );

      // Skip withdrawn / completed / archived — they shouldn't be in the
      // register. Active + everything else stays. Status is case-mixed in
      // the DB so lower-case before comparing.
      const inactive = new Set(['withdrawn', 'completed', 'archived']);
      const activeStudents = students.filter((s) => !inactive.has((s.status ?? '').toLowerCase()));

      const next: RegisterRow[] = activeStudents.map((s) => {
        const existing = byStudent.get(s.id);
        return {
          student_id: s.id,
          student_name: s.name,
          status: (existing?.status as AttendanceStatus | undefined) ?? null,
          notes: existing?.notes ?? '',
          existing_id: existing?.id ?? null,
          saving: false,
          error: null,
        };
      });
      setRows(next);
    } catch (e) {
      setError((e as Error).message ?? 'Could not load roster');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [cohortId, registerDate]);

  // Fetch on open + on date change
  useEffect(() => {
    if (open) void fetchRoster();
  }, [open, fetchRoster]);

  // Reset search on close
  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  // Persist a single row's change. Optimistic local update so tap feels
  // instant; rollback to previous status if the upsert fails.
  const setRowStatus = async (studentId: string, status: AttendanceStatus) => {
    const prev = rows.find((r) => r.student_id === studentId);
    if (!prev) return;
    if (prev.status === status) return; // tapping the same status is a no-op

    setRows((rs) =>
      rs.map((r) => (r.student_id === studentId ? { ...r, status, saving: true, error: null } : r))
    );

    try {
      const payload = {
        student_id: studentId,
        cohort_id: cohortId,
        date: registerDate,
        status,
        notes: prev.notes.trim() || null,
        recorded_by: recordedBy,
      };
      const { data, error: upErr } = await supabase
        .from('college_attendance')
        .upsert(payload, { onConflict: 'student_id,date' })
        .select('id')
        .single();
      if (upErr) throw upErr;
      setRows((rs) =>
        rs.map((r) =>
          r.student_id === studentId
            ? {
                ...r,
                saving: false,
                error: null,
                existing_id: (data as { id?: string } | null)?.id ?? r.existing_id,
              }
            : r
        )
      );
    } catch (e) {
      // Roll back
      setRows((rs) =>
        rs.map((r) =>
          r.student_id === studentId
            ? {
                ...r,
                status: prev.status,
                saving: false,
                error: (e as Error).message ?? 'Save failed',
              }
            : r
        )
      );
      toast({
        title: 'Could not save',
        description: prev.student_name,
        variant: 'destructive',
      });
    }
  };

  const setRowNotes = (studentId: string, notes: string) => {
    setRows((rs) => rs.map((r) => (r.student_id === studentId ? { ...r, notes } : r)));
  };

  /** Persist notes on blur — no need to round-trip on every keystroke. */
  const persistNotes = async (studentId: string) => {
    const r = rows.find((x) => x.student_id === studentId);
    if (!r || !r.status) return; // can't save notes without a status row
    try {
      await supabase.from('college_attendance').upsert(
        {
          student_id: studentId,
          cohort_id: cohortId,
          date: registerDate,
          status: r.status,
          notes: r.notes.trim() || null,
          recorded_by: recordedBy,
        },
        { onConflict: 'student_id,date' }
      );
    } catch (e) {
      toast({
        title: 'Note not saved',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  // Quick "mark all present" — saves the unmarked rows in one batch.
  const markAllPresent = async () => {
    const unmarked = rows.filter((r) => r.status === null);
    if (unmarked.length === 0) return;
    setRows((rs) =>
      rs.map((r) => (r.status === null ? { ...r, status: 'Present', saving: true } : r))
    );
    try {
      const payloads = unmarked.map((r) => ({
        student_id: r.student_id,
        cohort_id: cohortId,
        date: registerDate,
        status: 'Present' as const,
        notes: r.notes.trim() || null,
        recorded_by: recordedBy,
      }));
      const { error: upErr } = await supabase
        .from('college_attendance')
        .upsert(payloads, { onConflict: 'student_id,date' });
      if (upErr) throw upErr;
      setRows((rs) => rs.map((r) => ({ ...r, saving: false })));
      toast({
        title: `${unmarked.length} marked present`,
      });
    } catch (e) {
      // Roll back the optimistic state
      setRows((rs) =>
        rs.map((r) => {
          if (!unmarked.find((u) => u.student_id === r.student_id)) return r;
          return { ...r, status: null, saving: false, error: (e as Error).message };
        })
      );
      toast({
        title: 'Could not mark all present',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  // Stats for the header strip — quick at-a-glance whether the register
  // is ~complete.
  const stats = useMemo(() => {
    const total = rows.length;
    const present = rows.filter((r) => r.status === 'Present').length;
    const late = rows.filter((r) => r.status === 'Late').length;
    const absent = rows.filter((r) => r.status === 'Absent').length;
    const authorised = rows.filter((r) => r.status === 'Authorised').length;
    const unmarked = rows.filter((r) => r.status === null).length;
    return { total, present, late, absent, authorised, unmarked };
  }, [rows]);

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.trim().toLowerCase();
    return rows.filter((r) => r.student_name.toLowerCase().includes(q));
  }, [rows, search]);

  const dateLabel = new Date(registerDate).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <SheetTitle className="sr-only">Class register</SheetTitle>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-white/[0.06]">
            <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
              Class register
            </div>
            <div className="mt-1 flex items-end justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <h2 className="text-[18px] sm:text-[20px] font-semibold text-white tracking-tight leading-tight truncate">
                  {lessonTitle ?? cohortName ?? 'Live register'}
                </h2>
                <div className="mt-0.5 text-[12px] text-white">
                  {cohortName && lessonTitle ? `${cohortName} · ` : ''}
                  {dateLabel}
                </div>
              </div>
              <input
                type="date"
                value={registerDate}
                onChange={(e) => setRegisterDate(e.target.value)}
                className="h-9 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[13px] text-white focus:outline-none focus:border-white/30 touch-manipulation"
              />
            </div>
          </div>

          {/* Stat strip */}
          <div className="px-4 sm:px-5 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center gap-2 flex-wrap text-[11px]">
              <Counter label="Present" n={stats.present} tone="emerald" />
              <Counter label="Late" n={stats.late} tone="amber" />
              <Counter label="Absent" n={stats.absent} tone="rose" />
              <Counter label="Auth" n={stats.authorised} tone="blue" />
              <Counter label="Unmarked" n={stats.unmarked} tone="white" />
              <span className="ml-auto text-white tabular-nums">
                {stats.total - stats.unmarked}/{stats.total}
              </span>
            </div>
          </div>

          {/* Search + bulk actions */}
          <div className="px-4 sm:px-5 py-2.5 border-b border-white/[0.06] flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search names…"
              className="flex-1 h-9 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[13px] text-white placeholder:text-white/70 focus:outline-none focus:border-white/30 touch-manipulation"
            />
            {stats.unmarked > 0 && (
              <button
                type="button"
                onClick={markAllPresent}
                className="h-9 px-3 rounded-lg bg-emerald-500/[0.12] border border-emerald-400/30 text-[12px] font-semibold text-emerald-200 hover:bg-emerald-500/[0.18] transition-colors touch-manipulation whitespace-nowrap"
                title="Mark all unmarked rows as present"
              >
                All present
              </button>
            )}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            {loading && (
              <div className="px-4 py-10 text-center text-[12.5px] text-white">
                Loading register…
              </div>
            )}

            {error && (
              <div className="m-4 rounded-xl border border-rose-300/30 bg-rose-500/[0.06] px-4 py-3 text-[13px] text-rose-200">
                {error}
              </div>
            )}

            {!loading && rows.length === 0 && !error && (
              <div className="px-4 py-10 text-center max-w-md mx-auto">
                <p className="text-[13px] text-white leading-relaxed">
                  No active learners in this cohort. Add learners to the cohort first, or pick a
                  different cohort.
                </p>
              </div>
            )}

            {!loading && filteredRows.length === 0 && rows.length > 0 && (
              <div className="px-4 py-6 text-center text-[12.5px] text-white">
                No matches for "{search}"
              </div>
            )}

            <ul className="divide-y divide-white/[0.05]">
              {filteredRows.map((row) => (
                <li key={row.student_id}>
                  <RegisterRowItem
                    row={row}
                    onSetStatus={(s) => void setRowStatus(row.student_id, s)}
                    onNotesChange={(v) => setRowNotes(row.student_id, v)}
                    onNotesBlur={() => void persistNotes(row.student_id)}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="px-4 sm:px-5 py-3 border-t border-white/[0.06] bg-[hsl(0_0%_10%)] flex items-center justify-between gap-3">
            <span className="text-[11px] text-white">Saves on every tap · pull-down to close</span>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-11 px-4 rounded-lg text-[13px] font-semibold text-black bg-elec-yellow hover:bg-elec-yellow/90 transition-colors touch-manipulation"
            >
              Done
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ───────────────── row ───────────────── */

function RegisterRowItem({
  row,
  onSetStatus,
  onNotesChange,
  onNotesBlur,
}: {
  row: RegisterRow;
  onSetStatus: (s: AttendanceStatus) => void;
  onNotesChange: (v: string) => void;
  onNotesBlur: () => void;
}) {
  const [showNotes, setShowNotes] = useState(false);

  return (
    <div className={cn('px-3 sm:px-5 py-3', row.saving && 'opacity-70')}>
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold text-white truncate">{row.student_name}</div>
          {row.error && <div className="mt-0.5 text-[11px] text-rose-300">Failed: {row.error}</div>}
          {row.notes && !showNotes && (
            <button
              type="button"
              onClick={() => setShowNotes(true)}
              className="mt-0.5 text-left text-[11.5px] text-white truncate hover:text-white transition-colors touch-manipulation"
            >
              {row.notes}
            </button>
          )}
        </div>
      </div>

      {/* Segmented status toggle — full-width on mobile, more touch-friendly
          than a single dropdown. Each button is min 44px tap target. */}
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {STATUSES.map((s) => {
          const active = row.status === s.value;
          return (
            <button
              key={s.value}
              type="button"
              onClick={() => onSetStatus(s.value)}
              disabled={row.saving}
              aria-pressed={active}
              className={cn(
                'h-11 rounded-lg border text-[12.5px] font-semibold transition-colors touch-manipulation',
                active ? s.active : `bg-transparent ${s.idle}`
              )}
            >
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.short}</span>
            </button>
          );
        })}
      </div>

      {/* Notes — collapsed by default to keep rows compact, tap to expand.
          Saves on blur. Disabled until a status is picked, otherwise the
          note has no attendance row to attach to and gets silently dropped
          by the upsert (status is NOT NULL in college_attendance). */}
      <div className="mt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowNotes((v) => !v)}
          disabled={!row.status}
          className={cn(
            'text-[11.5px] font-medium transition-colors touch-manipulation',
            row.status ? 'text-white hover:text-white' : 'text-white/70 cursor-not-allowed'
          )}
        >
          {!row.status
            ? '+ Add note (mark first)'
            : showNotes
              ? 'Hide note'
              : row.notes
                ? 'Edit note'
                : '+ Add note'}
        </button>
      </div>
      {showNotes && row.status && (
        <input
          type="text"
          value={row.notes}
          onChange={(e) => onNotesChange(e.target.value)}
          onBlur={onNotesBlur}
          placeholder="e.g. arrived 10 min late, signed in at reception"
          className="mt-2 w-full h-10 px-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[13px] text-white placeholder:text-white/70 focus:outline-none focus:border-white/30 touch-manipulation"
        />
      )}
    </div>
  );
}

/* ───────────────── stat counter ───────────────── */

function Counter({
  label,
  n,
  tone,
}: {
  label: string;
  n: number;
  tone: 'emerald' | 'amber' | 'rose' | 'blue' | 'white';
}) {
  const cls =
    tone === 'emerald'
      ? 'text-emerald-300'
      : tone === 'amber'
        ? 'text-amber-300'
        : tone === 'rose'
          ? 'text-rose-300'
          : tone === 'blue'
            ? 'text-blue-300'
            : 'text-white';
  return (
    <span className="inline-flex items-baseline gap-1">
      <span className={cn('font-bold tabular-nums text-[13px]', n > 0 ? cls : 'text-white')}>
        {n}
      </span>
      <span className="text-white">{label}</span>
    </span>
  );
}
