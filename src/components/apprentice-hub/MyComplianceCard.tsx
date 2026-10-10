import { useEffect } from 'react';
import { useLoggingReminders } from '@/hooks/useLoggingReminders';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useAuth } from '@/contexts/AuthContext';
import { useOtjSummary, type OtjRisk } from '@/hooks/useOtjSummary';
import { LC_CARD, lcChip, type ChipTone } from '@/components/apprentice-hub/college-hub/learnerUi';

/* ==========================================================================
   MyComplianceCard — where the learner stands on off-the-job hours against
   their plan, in words.

   8 Oct 2026: reads get_otj_summary (useOtjSummary), THE hours figure the
   tutor and the employer read. It used to work out its own "expected by now"
   from raw dates and count verified minutes only, so on the same screen it
   said 4.0h expected where the tutor saw 3.3h planned, and ignored measured
   app learning that the tutor counts. Now the three figures are the shared
   ones: required for the programme, planned by today, counted so far.
   ========================================================================== */

const RISK: Record<OtjRisk, { label: string; tone: ChipTone }> = {
  on_track: { label: 'On track', tone: 'done' },
  slightly_behind: { label: 'Slightly behind', tone: 'action' },
  behind: { label: 'Behind', tone: 'action' },
  unknown: { label: 'No plan yet', tone: 'neutral' },
};

function fmtHours(h: number): string {
  if (!Number.isFinite(h) || h <= 0) return '0h';
  if (h >= 100) return `${Math.round(h).toLocaleString('en-GB')}h`;
  if (h >= 10) return `${h.toFixed(0)}h`;
  return `${h.toFixed(1)}h`;
}

export function MyComplianceCard() {
  // Settings → Reminders: keep the facts, drop the nudging (ELE-1804).
  const { hidden: hideReminders } = useLoggingReminders();
  const { user } = useAuth();
  const { data, loading, error, refresh } = useOtjSummary();

  // A tutor verifying hours updates the figures without a reload.
  useEffect(() => {
    const uid = user?.id;
    if (!uid) return;
    const chan = supabase
      .channel(realtimeChannelName(`my_compliance:${uid}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'college_otj_entries',
          filter: `student_id=eq.${uid}`,
        },
        () => void refresh()
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(chan);
    };
  }, [user?.id, refresh]);

  if (loading) {
    return <div className={cn(LC_CARD, 'h-40 animate-pulse')} aria-hidden />;
  }

  if (error || !data) {
    return (
      <section className={LC_CARD}>
        <h3 className="text-[15px] font-semibold tracking-tight text-white">
          Off-the-job hours against your plan
        </h3>
        <p className="mt-2 text-[13px] leading-snug text-white">
          Could not load your hours just now.{' '}
          <button
            type="button"
            onClick={() => void refresh()}
            className="inline-flex h-11 items-center font-semibold text-elec-yellow touch-manipulation"
          >
            Try again
          </button>
        </p>
      </section>
    );
  }

  const required = data.required_hours;
  const planned = data.planned_to_date_hours;
  const counted = data.counted_hours;
  const risk = RISK[data.risk] ?? RISK.unknown;
  const pct = required ? Math.min(100, (counted / required) * 100) : 0;
  const plannedPct = required && planned != null ? Math.min(100, (planned / required) * 100) : null;

  let verdict: string;
  if (!required) {
    verdict =
      'Your college has not set how many off-the-job hours your programme needs yet. Ask your tutor to add it so you can see whether you are on track.';
  } else if (planned == null) {
    verdict =
      'Your programme start and end dates are not set yet, so there is no plan to measure against. Ask your tutor to confirm them.';
  } else if (data.risk === 'on_track') {
    verdict = `You have ${fmtHours(counted)} counted, at or ahead of the ${fmtHours(planned)} your plan expects by today.`;
  } else {
    const gap = Math.max(0, planned - counted);
    verdict = `Your plan expects ${fmtHours(planned)} by today and you have ${fmtHours(counted)} counted, ${fmtHours(gap)} short.`;
    if (!hideReminders && data.weekly_needed_hours != null) {
      verdict += ` About ${fmtHours(data.weekly_needed_hours)} a week from now on gets you to the total.`;
    }
  }

  return (
    <section className={LC_CARD}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Off-the-job hours against your plan
          </h3>
          <p className="mt-0.5 text-[12.5px] text-white">
            The same figures your tutor and employer see
          </p>
        </div>
        <span className={lcChip(risk.tone)}>{risk.label}</span>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-3 sm:gap-5">
        <Fig value={fmtHours(counted)} label="Counted so far" />
        <Fig value={planned != null ? fmtHours(planned) : 'Not set'} label="Planned by today" />
        <Fig value={required ? fmtHours(required) : 'Not set'} label="Needed in total" />
      </dl>

      {required ? (
        <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden>
          <div
            className={cn(
              'h-full rounded-full',
              data.risk === 'on_track' ? 'bg-emerald-400' : 'bg-orange-400'
            )}
            style={{ width: `${Math.max(pct, counted > 0 ? 1 : 0)}%` }}
          />
          {plannedPct != null && (
            <div
              className="absolute top-0 h-full w-0.5 bg-white"
              style={{ left: `${plannedPct}%` }}
            />
          )}
        </div>
      ) : null}

      <p className="mt-3 text-[13px] leading-snug text-white">{verdict}</p>
      {(data.pending_hours > 0 || data.app_learning_hours > 0) && (
        <p className="mt-1.5 text-[12.5px] leading-snug text-white">
          {[
            data.app_learning_hours > 0 &&
              `${fmtHours(data.app_learning_hours)} of the counted hours is learning the app measured.`,
            data.pending_hours > 0 &&
              `${fmtHours(data.pending_hours)} more is waiting on your tutor and counts once they sign it off.`,
          ]
            .filter(Boolean)
            .join(' ')}
        </p>
      )}
    </section>
  );
}

function Fig({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-col">
      <dt className="order-2 mt-1.5 text-[12px] leading-tight text-white">{label}</dt>
      <dd className="order-1 text-[20px] font-semibold leading-none tabular-nums text-white sm:text-[24px]">
        {value}
      </dd>
    </div>
  );
}
