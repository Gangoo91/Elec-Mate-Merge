import { useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';

/* ==========================================================================
   MyAttendanceCard — the learner's own attendance record.

   The college marks attendance (college_attendance), and the SELECT policy
   already lets the learner read their OWN rows (cs.user_id = auth.uid()), but
   nothing apprentice-facing ever surfaced it. This closes that loop: the
   learner sees the same register their tutor does.

   Attendance is keyed on college_attendance.student_id = college_students.id
   (NOT the auth uid), so we resolve the college_student id first.

   Rate = (Present + Late) / total sessions. Late still counts as attended;
   Authorised is an excused absence (shown but not held against the rate);
   Absent is the unauthorised-absence signal.
   ========================================================================== */

type Verdict = 'green' | 'amber' | 'red';

const VERDICT_LABEL: Record<Verdict, string> = {
  green: 'On track',
  amber: 'Watch this',
  red: 'Below target',
};

interface AttendanceRow {
  date: string;
  status: string;
  notes: string | null;
}

const STATUS_PILL: Record<string, string> = {
  Present: 'text-emerald-300/90 bg-emerald-500/10 border-emerald-500/20',
  Late: 'text-amber-300/90 bg-amber-500/10 border-amber-500/20',
  Authorised: 'text-sky-300/90 bg-sky-500/10 border-sky-500/20',
  Absent: 'text-rose-300/90 bg-rose-500/10 border-rose-500/20',
};

function pillClass(status: string): string {
  return STATUS_PILL[status] ?? 'text-white/80 bg-white/[0.05] border-white/[0.1]';
}

export function MyAttendanceCard() {
  const [rows, setRows] = useState<AttendanceRow[] | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) {
      setLoading(false);
      return;
    }

    const csRes = await supabase
      .from('college_students')
      .select('id')
      .eq('user_id', uid)
      .maybeSingle();

    const csId = (csRes.data as { id: string } | null)?.id ?? null;
    setStudentId(csId);
    if (!csId) {
      setRows(null);
      setLoading(false);
      return;
    }

    const attRes = await supabase
      .from('college_attendance')
      .select('date, status, notes')
      .eq('student_id', csId)
      .order('date', { ascending: false })
      .limit(60);

    setRows(!attRes.error && attRes.data ? (attRes.data as AttendanceRow[]) : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Realtime — a tutor marking the register updates the learner's view live.
  useEffect(() => {
    if (!studentId) return;
    const chan = supabase
      .channel(realtimeChannelName(`my_attendance:${studentId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_attendance',
          filter: `student_id=eq.${studentId}`,
        },
        () => fetchAll()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(chan);
    };
  }, [studentId, fetchAll]);

  const calc = useMemo(() => {
    if (!rows || rows.length === 0) return null;
    let present = 0;
    let late = 0;
    let authorised = 0;
    let absent = 0;
    for (const r of rows) {
      if (r.status === 'Present') present += 1;
      else if (r.status === 'Late') late += 1;
      else if (r.status === 'Authorised') authorised += 1;
      else if (r.status === 'Absent') absent += 1;
    }
    const total = rows.length;
    const attended = present + late;
    const rate = total > 0 ? Math.round((attended / total) * 100) : 0;
    const verdict: Verdict = rate >= 95 ? 'green' : rate >= 85 ? 'amber' : 'red';
    return { present, late, authorised, absent, total, attended, rate, verdict };
  }, [rows]);

  if (loading) return <Skeleton />;

  // Not linked to a college — the page-level JoinCollegeCard handles this.
  if (!studentId) return null;

  // Linked but no register marked yet — quiet panel so the learner knows it's coming.
  if (!calc) {
    return (
      <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
        <div className="px-4 sm:px-5 py-4 sm:py-5">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-white/85">
            Attendance
          </div>
          <p className="mt-3 text-[12.5px] text-white/90 leading-snug">
            No attendance has been recorded yet. Once your tutor marks the register, your record
            shows here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-white/85">
            Attendance · {VERDICT_LABEL[calc.verdict]}
          </div>
          <span className="text-[10.5px] tabular-nums text-white/85">
            {calc.total} session{calc.total === 1 ? '' : 's'} recorded
          </span>
        </div>

        <div className="mt-3 flex items-end gap-4">
          <div
            className={cn(
              'text-[34px] sm:text-[40px] font-semibold tabular-nums leading-none',
              calc.verdict === 'green'
                ? 'text-emerald-300'
                : calc.verdict === 'amber'
                  ? 'text-amber-300'
                  : 'text-rose-300'
            )}
          >
            {calc.rate}%
          </div>
          <div className="pb-1 text-[11px] text-white/70 leading-snug">
            attended
            <br />
            <span className="text-white/50">{calc.attended} of {calc.total}</span>
          </div>
        </div>

        {/* Status breakdown */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {([
            ['Present', calc.present],
            ['Late', calc.late],
            ['Authorised', calc.authorised],
            ['Absent', calc.absent],
          ] as const)
            .filter(([, n]) => n > 0)
            .map(([label, n]) => (
              <span
                key={label}
                className={cn(
                  'inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border tabular-nums',
                  pillClass(label)
                )}
              >
                {label}
                <span className="opacity-70">{n}</span>
              </span>
            ))}
        </div>

        {/* Supportive message */}
        <p
          className={cn(
            'mt-3 text-[12px] leading-snug',
            calc.verdict === 'green'
              ? 'text-emerald-200/85'
              : calc.verdict === 'amber'
                ? 'text-amber-200/85'
                : 'text-rose-200/85'
          )}
        >
          {calc.verdict === 'green' &&
            'Strong attendance — colleges and employers look for this, and it keeps your funding clean.'}
          {calc.verdict === 'amber' &&
            'A few missed sessions are adding up. If anything is getting in the way, tell your tutor early.'}
          {calc.verdict === 'red' &&
            'Your attendance is below the usual target. Talk to your tutor — missed sessions affect your progress and your funding.'}
          {calc.absent > 0 && calc.verdict !== 'red' && (
            <>
              {' '}
              <span className="text-white/70">
                {calc.absent} unauthorised absence{calc.absent === 1 ? '' : 's'} on record.
              </span>
            </>
          )}
        </p>

        {/* Recent register */}
        <div className="mt-4 border-t border-white/[0.06] pt-3 space-y-1.5">
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/45">Recent</div>
          {rows!.slice(0, 6).map((r, i) => (
            <div key={`${r.date}-${i}`} className="flex items-center justify-between gap-3 py-0.5">
              <span className="text-[12px] text-white/80 tabular-nums">
                {new Date(r.date).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })}
              </span>
              <span
                className={cn(
                  'inline-flex items-center text-[10.5px] font-medium px-2 py-0.5 rounded-full border',
                  pillClass(r.status)
                )}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4">
        <div className="h-3 w-32 rounded-full bg-white/[0.05]" />
        <div className="h-9 w-24 rounded-md bg-white/[0.05]" />
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-6 w-20 rounded-full bg-white/[0.04]" />
          ))}
        </div>
      </div>
    </section>
  );
}
