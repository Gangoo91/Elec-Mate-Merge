/**
 * MyWeekPage — Worker Tools → My week (ELE-1820).
 *
 * Seven days of what's yours, straight from the office's Diary: job, address,
 * time, the drive from the yard to the first job (and between jobs), and who
 * changed what and when ("Moved by Mark, 10:12"), so nobody argues about what
 * was said on the phone. The office's changes arrive as one push.
 *
 * Reads `get_my_week` (SECURITY DEFINER, only ever the caller's own bookings).
 */
import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueries, useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Navigation, Car } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { navigateToAddress } from '@/utils/navigate-to-address';
import { jobStage, stageDef } from '@/lib/jobStages';
import { EmptyState, LoadingState, SecondaryButton } from '@/components/employer/editorial';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { WT_WEEK_HELP } from '@/components/worker-tools/help/worker-help';
import {
  addDaysYmd,
  coversDay,
  fmtDay,
  leaveLabel,
  mondayOf,
  niceFirstName,
  placeOf,
  rangeLabel,
  stampLabel,
  timeLabel,
  todayYmd,
  weekDays,
} from '@/components/employer/diary/dispatchModel';

interface WeekItem {
  assignment_id: string;
  job_id: string;
  title: string;
  client: string | null;
  location: string | null;
  stage: string | null;
  start_date: string;
  end_date: string;
  start_time: string | null;
  hours_per_day: number | null;
  role_on_job: string | null;
  notes: string | null;
  last_change: {
    kind: 'assigned' | 'moved';
    by: string | null;
    at: string;
    old_start: string | null;
    old_end: string | null;
  } | null;
}

interface WeekLeave {
  type: string | null;
  start_date: string;
  end_date: string;
  half_day: string | null;
}

interface WeekChange {
  kind: 'assigned' | 'moved' | 'removed';
  job_title: string | null;
  job_id: string | null;
  old_start: string | null;
  old_end: string | null;
  new_start: string | null;
  new_end: string | null;
  by: string | null;
  at: string;
}

interface MyWeek {
  from: string;
  to: string;
  yard: string | null;
  items: WeekItem[];
  leave: WeekLeave[];
  changes: WeekChange[];
}

const isPlace = (s?: string | null): s is string => !!s && s.trim().length > 3;

function changeLine(c: WeekChange): string {
  const job = c.job_title ?? 'A job';
  if (c.kind === 'removed') return `Taken off ${job}`;
  if (c.kind === 'assigned') return `Added to ${job}, ${c.new_start ? rangeLabel(c.new_start, c.new_end) : ''}`;
  return `${job} moved${c.old_start ? ` from ${rangeLabel(c.old_start, c.old_end)}` : ''} to ${
    c.new_start ? rangeLabel(c.new_start, c.new_end) : 'a new date'
  }`;
}

/** Drive time, same server function and cache key as the calendar (ELE-1755). */
function useLegs(legs: Array<{ key: string; origin: string; destination: string }>) {
  const results = useQueries({
    queries: legs.map((l) => ({
      queryKey: ['travel-time', l.origin.toLowerCase(), l.destination.toLowerCase()],
      staleTime: 24 * 60 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
      retry: false,
      queryFn: async () => {
        const { data, error } = await supabase.functions.invoke('google-travel-time', {
          body: { origin: l.origin, destination: l.destination },
        });
        const p = data as { minutes?: number; text?: string } | null;
        if (error || !p || typeof p.minutes !== 'number') throw new Error('No estimate');
        return { minutes: p.minutes, text: p.text || `${p.minutes} min` };
      },
    })),
  });
  return useMemo(() => {
    const m = new Map<string, string>();
    legs.forEach((l, i) => {
      const r = results[i];
      if (r?.data) m.set(l.key, r.data.text || `${r.data.minutes} min`);
    });
    return m;
  }, [legs, results]);
}

export default function MyWeekPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const weekParam = params.get('week');
  const weekStart = mondayOf(weekParam && /^\d{4}-\d{2}-\d{2}$/.test(weekParam) ? weekParam : todayYmd());
  const days = useMemo(() => weekDays(weekStart), [weekStart]);
  const today = todayYmd();

  useRealtimeInvalidate(
    'my-week',
    [{ table: 'employer_job_assignments' }, { table: 'employer_jobs' }],
    [['my-week']]
  );

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['my-week', weekStart],
    queryFn: async (): Promise<MyWeek | null> => {
      // Cast: this RPC postdates the last types.ts regeneration.
      const { data: res, error } = await (supabase.rpc as unknown as (
        fn: string,
        args: Record<string, unknown>
      ) => ReturnType<typeof supabase.rpc>)('get_my_week', { p_from: weekStart });
      if (error) throw error;
      return (res as unknown as MyWeek) ?? null;
    },
  });

  const setWeek = (monday: string) => {
    const next = new URLSearchParams(params);
    if (monday === mondayOf(today)) next.delete('week');
    else next.set('week', monday);
    setParams(next, { replace: true });
  };

  const byDay = useMemo(
    () =>
      days.map((d) => ({
        day: d,
        items: (data?.items ?? [])
          .filter((it) => coversDay(it.start_date, it.end_date, d))
          .sort((a, b) => (a.start_time ?? '99').localeCompare(b.start_time ?? '99')),
        leave: (data?.leave ?? []).find((l) => l.start_date <= d && l.end_date >= d) ?? null,
      })),
    [days, data]
  );

  // Legs: yard → first job of each day, then job → next job when the place changes.
  const yard = data?.yard ?? null;
  const legs = useMemo(() => {
    const out: Array<{ key: string; origin: string; destination: string }> = [];
    for (const { day, items } of byDay) {
      if (day < today) continue;
      let prev: string | null = isPlace(yard) ? yard : null;
      items.forEach((it, i) => {
        const dest = isPlace(it.location) ? it.location.trim() : null;
        if (prev && dest && prev.toLowerCase() !== dest.toLowerCase()) {
          out.push({ key: `${day}|${i}`, origin: prev, destination: dest });
        }
        if (dest) prev = dest;
      });
    }
    return out;
  }, [byDay, yard, today]);
  const travel = useLegs(legs);

  const weekLabel = `${fmtDay(days[0], days[0].slice(0, 7) === days[6].slice(0, 7) ? { day: 'numeric' } : { day: 'numeric', month: 'short' })} to ${fmtDay(days[6], { day: 'numeric', month: 'short' })}`;
  const booked = byDay.filter((d) => d.items.length > 0).length;

  return (
    <WorkerToolPage
      eyebrow="Your work"
      title="My week"
      description="What you're booked on, day by day. When the office moves something you'll see who and when."
      maxWidth="3xl"
      help={WT_WEEK_HELP}
    >
      {/* Week navigation */}
      <div className="flex items-center gap-2" data-help="wt-week.nav">
        <button
          type="button"
          onClick={() => setWeek(addDaysYmd(weekStart, -7))}
          aria-label="Previous week"
          className="h-11 w-11 shrink-0 rounded-full border border-white/[0.1] bg-white/[0.06] text-white flex items-center justify-center touch-manipulation active:scale-[0.97]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex-1 text-center min-w-0">
          <div className="text-[16px] font-semibold text-white tabular-nums">{weekLabel}</div>
          <div className="text-[12px] text-white">
            {weekStart === mondayOf(today)
              ? `This week · ${booked} ${booked === 1 ? 'day' : 'days'} booked`
              : `${booked} ${booked === 1 ? 'day' : 'days'} booked`}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setWeek(addDaysYmd(weekStart, 7))}
          aria-label="Next week"
          className="h-11 w-11 shrink-0 rounded-full border border-white/[0.1] bg-white/[0.06] text-white flex items-center justify-center touch-manipulation active:scale-[0.97]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      {weekStart !== mondayOf(today) && (
        <div className="-mt-5 flex justify-center">
          <SecondaryButton size="sm" onClick={() => setWeek(mondayOf(today))}>
            Back to this week
          </SecondaryButton>
        </div>
      )}

      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <EmptyState
          title="Couldn't load your week"
          description="Check your signal and try again."
          action="Try again"
          onAction={() => refetch()}
        />
      ) : !data ? (
        <EmptyState
          title="You're not on a team yet"
          description="When your employer adds you and you accept, your week shows here."
        />
      ) : (
        <>
          {data.changes.length > 0 && (
            <section
              className="-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.10] bg-white/[0.04]"
              data-help="wt-week.changes"
            >
              <h2 className="px-4 pt-3.5 text-[14px] font-semibold text-white">Latest changes</h2>
              <ul className="divide-y divide-white/[0.06]">
                {data.changes.slice(0, 4).map((c, i) => (
                  <li key={i} className="px-4 py-3">
                    <div className="text-[13.5px] text-white leading-snug">{changeLine(c)}</div>
                    <div className="mt-0.5 text-[12px] text-white">
                      {niceFirstName(c.by) || 'The office'}, {stampLabel(c.at)}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="space-y-5" data-help="wt-week.days">
            {byDay.map(({ day, items, leave }) => (
              <section key={day}>
                <div className="flex items-baseline gap-2 mb-2">
                  <h2 className="text-[15px] font-semibold text-white">
                    {fmtDay(day, { weekday: 'long', day: 'numeric', month: 'short' })}
                  </h2>
                  {day === today && (
                    <span className="rounded-full bg-elec-yellow px-2 py-0.5 text-[10.5px] font-semibold text-black">
                      Today
                    </span>
                  )}
                  {day < today && (
                    <span className="rounded-full border border-white/[0.14] px-2 py-0.5 text-[10.5px] font-semibold text-white">
                      Past
                    </span>
                  )}
                </div>

                {leave && (
                  <div
                    className="-mx-4 sm:mx-0 mb-2 border-y sm:border sm:rounded-xl border-white/[0.10] px-4 py-3 text-[13.5px] font-medium text-white"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 8px, transparent 8px 16px)',
                    }}
                  >
                    {leaveLabel(leave)}
                  </div>
                )}

                {items.length === 0 && !leave ? (
                  <p className="text-[13px] text-white">Nothing booked</p>
                ) : (
                  <div className="space-y-2">
                    {items.map((it, i) => {
                      const sd = stageDef(jobStage({ board_stage: it.stage }));
                      const time = timeLabel(it);
                      const drive = travel.get(`${day}|${i}`);
                      const fromYard = i === 0 || !items.slice(0, i).some((p) => isPlace(p.location));
                      const recent =
                        it.last_change &&
                        Date.now() - new Date(it.last_change.at).getTime() < 7 * 86_400_000;
                      return (
                        <div key={it.assignment_id}>
                          {drive && (
                            <div className="mb-1.5 flex items-center gap-1.5 pl-1 text-[12px] text-white">
                              <Car className="h-3.5 w-3.5" />
                              {drive} {fromYard ? 'from the yard' : 'from the last job'}
                            </div>
                          )}
                          <article className="relative -mx-4 sm:mx-0 overflow-hidden border-y sm:border sm:rounded-2xl border-white/[0.10] bg-gradient-to-b from-white/[0.08] to-white/[0.04]">
                            <span aria-hidden className={cn('absolute left-0 inset-y-0 w-[3px]', sd.bar)} />
                            <button
                              type="button"
                              onClick={() => navigate(`/electrician/worker-tools/jobs?job=${it.job_id}`)}
                              className="w-full text-left px-4 pt-3.5 pb-3 touch-manipulation active:bg-white/[0.04]"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="text-[15px] font-semibold text-white leading-snug">
                                    {it.title}
                                  </div>
                                  <div className="mt-0.5 text-[13px] text-white">
                                    {[it.client, placeOf(it.location)].filter(Boolean).join(' · ')}
                                  </div>
                                </div>
                                {time && (
                                  <span className="shrink-0 rounded-full border border-white/[0.14] bg-white/[0.06] px-2.5 py-1 text-[12px] font-medium text-white tabular-nums">
                                    {time}
                                  </span>
                                )}
                              </div>
                              {it.start_date !== it.end_date && (
                                <div className="mt-1.5 text-[12px] text-white">
                                  {rangeLabel(it.start_date, it.end_date)}
                                </div>
                              )}
                              {it.role_on_job && (
                                <div className="mt-1 text-[12px] text-white">Your role: {it.role_on_job}</div>
                              )}
                              {recent && it.last_change && (
                                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.06] px-2.5 py-1 text-[12px] font-medium text-white">
                                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                                  {it.last_change.kind === 'moved' ? 'Moved' : 'Booked'} by{' '}
                                  {niceFirstName(it.last_change.by) || 'the office'},{' '}
                                  {stampLabel(it.last_change.at)}
                                </div>
                              )}
                            </button>
                            {isPlace(it.location) && (
                              <div className="border-t border-white/[0.08] px-4 py-2">
                                <button
                                  type="button"
                                  onClick={() => navigateToAddress({ address: it.location })}
                                  className="h-11 inline-flex items-center gap-2 text-[13px] font-medium text-white touch-manipulation"
                                >
                                  <Navigation className="h-4 w-4" />
                                  Directions to {placeOf(it.location) ?? 'site'}
                                </button>
                              </div>
                            )}
                          </article>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            ))}
          </div>
        </>
      )}
    </WorkerToolPage>
  );
}
