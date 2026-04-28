import { useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   MyComplianceCard — ESFA off-the-job compliance traffic light. Computes
   verified hours vs the expected hours at this point in the programme:

     expected = (weeks elapsed / total programme weeks) × programme target
     programme target = working hours over duration × 20% (defaults to
                        37.5h × programme_weeks × 0.20 if no override)

   Verdict:
     verified >= expected            → green (on track / ahead)
     verified >= expected × 0.8      → amber (slight slip)
     verified <  expected × 0.8      → red (compliance risk)

   The 6h-per-week baseline (used elsewhere in useApprenticeOtj) is a floor,
   not the ESFA total — we compute the *programme-level* total here so the
   card reflects defensible compliance rather than just weekly cadence.
   ========================================================================== */

type Status = 'green' | 'amber' | 'red' | 'unknown';

const STATUS_LABEL: Record<Status, string> = {
  green: 'On track',
  amber: 'Slipping',
  red: 'Compliance risk',
  unknown: 'No baseline',
};

const STATUS_TONE: Record<Status, string> = {
  green: 'text-emerald-200',
  amber: 'text-amber-200',
  red: 'text-rose-300',
  unknown: 'text-white/85',
};

const STATUS_BG: Record<Status, string> = {
  green: 'bg-emerald-500/[0.05] border-emerald-400/20',
  amber: 'bg-amber-500/[0.05] border-amber-400/25',
  red: 'bg-rose-500/[0.05] border-rose-400/25',
  unknown: 'bg-white/[0.02] border-white/[0.06]',
};

const STATUS_BAR: Record<Status, string> = {
  green: 'bg-emerald-400',
  amber: 'bg-amber-400',
  red: 'bg-rose-400',
  unknown: 'bg-white/[0.10]',
};

const WORKING_HOURS_PER_WEEK = 37.5;
const ESFA_OTJ_RATIO = 0.2; // 20% off-the-job

function fmtHours(h: number): string {
  if (h >= 100) return `${Math.round(h)}h`;
  if (h >= 10) return `${h.toFixed(0)}h`;
  return `${h.toFixed(1)}h`;
}

interface ProgrammeRow {
  start_date: string | null;
  expected_end_date: string | null;
}

export function MyComplianceCard() {
  const [programme, setProgramme] = useState<ProgrammeRow | null>(null);
  const [verifiedMin, setVerifiedMin] = useState(0);
  const [pendingMin, setPendingMin] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasAnyData, setHasAnyData] = useState(false);

  const fetchAll = useCallback(async () => {
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) {
      setLoading(false);
      return;
    }

    const [csRes, otjRes] = await Promise.all([
      supabase
        .from('college_students')
        .select('start_date, expected_end_date')
        .eq('user_id', uid)
        .maybeSingle(),
      supabase
        .from('college_otj_entries')
        .select('duration_minutes, verification_status')
        .eq('student_id', uid)
        .limit(500),
    ]);

    setProgramme((csRes.data as ProgrammeRow | null) ?? null);

    let v = 0;
    let p = 0;
    if (otjRes.data) {
      for (const r of otjRes.data as Array<{
        duration_minutes: number | null;
        verification_status: string;
      }>) {
        const m = r.duration_minutes ?? 0;
        if (
          r.verification_status === 'verified' ||
          r.verification_status === 'verified_by_employer'
        ) {
          v += m;
        } else if (r.verification_status === 'pending') {
          p += m;
        }
      }
    }
    setVerifiedMin(v);
    setPendingMin(p);
    setHasAnyData(Boolean(csRes.data) || (otjRes.data?.length ?? 0) > 0);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Realtime — verification flips immediately update the verdict.
  useEffect(() => {
    let chan: ReturnType<typeof supabase.channel> | null = null;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) return;
      chan = supabase
        .channel(`my_compliance:${uid}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'college_otj_entries',
            filter: `student_id=eq.${uid}`,
          },
          () => fetchAll()
        )
        .subscribe();
    })();
    return () => {
      if (chan) supabase.removeChannel(chan);
    };
  }, [fetchAll]);

  const calc = useMemo(() => {
    if (!programme?.start_date || !programme?.expected_end_date) {
      return null;
    }
    const start = new Date(programme.start_date).getTime();
    const end = new Date(programme.expected_end_date).getTime();
    const now = Date.now();
    if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return null;

    const totalMs = end - start;
    const elapsedMs = Math.min(now - start, totalMs);
    const totalWeeks = totalMs / (7 * 86_400_000);
    const elapsedWeeks = Math.max(0, elapsedMs / (7 * 86_400_000));

    const programmeTargetHours = totalWeeks * WORKING_HOURS_PER_WEEK * ESFA_OTJ_RATIO;
    const expectedHours = elapsedWeeks > 0 ? (elapsedWeeks / totalWeeks) * programmeTargetHours : 0;

    const verifiedHours = verifiedMin / 60;
    const ratio = expectedHours > 0 ? verifiedHours / expectedHours : 1;

    let status: Status;
    if (expectedHours <= 0) status = 'unknown';
    else if (ratio >= 1) status = 'green';
    else if (ratio >= 0.8) status = 'amber';
    else status = 'red';

    return {
      verifiedHours,
      pendingHours: pendingMin / 60,
      expectedHours,
      programmeTargetHours,
      ratio,
      status,
      elapsedWeeks: Math.round(elapsedWeeks),
      totalWeeks: Math.round(totalWeeks),
    };
  }, [programme, verifiedMin, pendingMin]);

  if (loading) return <Skeleton />;

  // No programme dates set — render a quieter "no baseline" panel.
  if (!calc) {
    if (!hasAnyData) return null;
    return (
      <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
        <div className="px-4 sm:px-5 py-4 sm:py-5">
          <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-white/85">
            ESFA compliance
          </div>
          <p className="mt-3 text-[12.5px] text-white/90 leading-snug">
            We can't calculate compliance yet — your programme start and end dates aren't set. Ask
            your tutor to confirm them so we can show you whether you're on track.
          </p>
        </div>
      </section>
    );
  }

  const pct = Math.min(100, Math.round(calc.ratio * 100));
  const status = calc.status;

  return (
    <section className={cn('rounded-2xl border overflow-hidden', STATUS_BG[status])}>
      <div className="px-4 sm:px-5 py-4 sm:py-5">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <div
            className={cn(
              'text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em]',
              STATUS_TONE[status]
            )}
          >
            ESFA compliance · {STATUS_LABEL[status]}
          </div>
          <span className="text-[10.5px] tabular-nums text-white/85">
            week {calc.elapsedWeeks} of {calc.totalWeeks}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-5">
          <Stat value={fmtHours(calc.verifiedHours)} label="Verified" tone="text-white" />
          <Stat value={fmtHours(calc.expectedHours)} label="Expected by now" tone="text-white/95" />
          <Stat
            value={fmtHours(calc.programmeTargetHours)}
            label="Programme target"
            tone="text-white/85"
          />
        </div>

        {/* Progress bar — verified portion + pending overlay */}
        <div className="mt-4 h-2 rounded-full bg-white/[0.05] overflow-hidden relative">
          <div className={cn('h-full', STATUS_BAR[status])} style={{ width: `${pct}%` }} />
          {calc.pendingHours > 0 && (
            <div
              className="absolute top-0 h-full bg-white/[0.18]"
              style={{
                left: `${pct}%`,
                width: `${Math.min(
                  100 - pct,
                  Math.round((calc.pendingHours / calc.expectedHours) * 100)
                )}%`,
              }}
              title="Pending verification"
            />
          )}
        </div>

        <p
          className={cn(
            'mt-3 text-[12px] leading-snug',
            status === 'green'
              ? 'text-emerald-200/85'
              : status === 'amber'
                ? 'text-amber-200/85'
                : status === 'red'
                  ? 'text-rose-200/85'
                  : 'text-white/90'
          )}
        >
          {status === 'green' &&
            `You've covered ${pct}% of what's expected at this point. Keep logging — every verified hour reinforces your ESFA position.`}
          {status === 'amber' &&
            `You're at ${pct}% of the expected pace. Submit any work activities you haven't logged yet — closing the gap now is easier than at gateway.`}
          {status === 'red' &&
            `You're at ${pct}% of the expected pace. This is a real ESFA risk — submit work activities and ask your tutor for a 1-2-1 to plan catch-up hours.`}
          {status === 'unknown' &&
            'Programme just started — your compliance baseline will activate once a few weeks have elapsed.'}
          {calc.pendingHours > 0 && (
            <>
              {' '}
              <span className="text-white/85">
                ({fmtHours(calc.pendingHours)} pending tutor verification.)
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}

function Stat({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <div>
      <div
        className={cn('text-[20px] sm:text-[24px] font-semibold tabular-nums leading-none', tone)}
      >
        {value}
      </div>
      <div className="mt-1 text-[10.5px] uppercase tracking-[0.14em] text-white/95">{label}</div>
    </div>
  );
}

function Skeleton() {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4">
        <div className="h-3 w-32 rounded-full bg-white/[0.05]" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-6 w-12 rounded-md bg-white/[0.05]" />
              <div className="h-3 w-14 rounded-full bg-white/[0.04]" />
            </div>
          ))}
        </div>
        <div className="h-2 rounded-full bg-white/[0.04]" />
      </div>
    </section>
  );
}
