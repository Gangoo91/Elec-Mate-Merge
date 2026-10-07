import { useState, useMemo, useRef, useCallback } from 'react';
import { Users, MapPin } from 'lucide-react';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { TIMELINE_HELP } from '@/components/employer/help/jobs';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useJobs } from '@/hooks/useJobs';
import { useEmployees } from '@/hooks/useEmployees';
import { useWorkerLocations } from '@/hooks/useWorkerLocations';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ViewJobSheet } from '@/components/employer/sheets/ViewJobSheet';
import { Job } from '@/services/jobService';
import { JOB_STAGES, jobStage, stageDef, type JobStage } from '@/lib/jobStages';
import { useDispatchBoard, useRescheduleJob, dispatchErrorMessage } from '@/hooks/useDispatchBoard';
import {
  addDaysYmd,
  diffDays,
  leaveLabel,
  rangeLabel,
  todayYmd,
  ymd,
} from '@/components/employer/diary/dispatchModel';

const inputDateOk = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v);
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  Dot,
  EmptyState,
  LoadingBlocks,
  SecondaryButton,
  PrimaryButton,
  SheetShell,
  inputClass,
  fieldLabelClass,
  type Tone,
} from '@/components/employer/editorial';

type RangeKey = 'week' | 'month' | 'quarter';

const RANGE_DAYS: Record<RangeKey, number> = {
  week: 7,
  month: 28,
  quarter: 84,
};

const WORKER_STATUS_TONE: Record<string, Tone> = {
  'On Site': 'emerald',
  'En Route': 'blue',
  Office: 'amber',
  'On Leave': 'red',
  'Off Duty': 'purple',
};

/** Match Worker Tracking: a position older than this is history, not live. */
const STALE_AFTER_HOURS = 12;

interface TimelineJob extends Job {
  stage: JobStage;
  assignedWorkers: number;
  startDate: string;
  endDate: string;
}

interface DragState {
  jobId: string;
  mode: 'move' | 'resize';
  originX: number;
  dayWidth: number;
  delta: number;
}

export function JobTimelineSection() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  // Below sm the Gantt only fits about three days, so phones get a list.
  const isPhone = !useMediaQuery('(min-width: 640px)');
  const [range, setRange] = useState<RangeKey>('week');
  const [periodOffset, setPeriodOffset] = useState(0);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [datesJob, setDatesJob] = useState<TimelineJob | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);
  const movedRef = useRef(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const { data: jobs = [], isLoading: jobsLoading } = useJobs();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();
  const { data: workerLocations = [] } = useWorkerLocations();
  const reschedule = useRescheduleJob();
  // Office managers dispatch but never see money (ELE-1831).
  const { data: role } = useEmployerRole();
  const showMoney = role?.canSeeMoney ?? false;

  const rangeDays = RANGE_DAYS[range];

  const periodDays = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    // Monday of the current week — ((getDay()+6)%7) is 0 on Monday and 6 on
    // Sunday; the old `getDay()-1` maths made Sunday show NEXT week's window.
    start.setDate(today.getDate() - ((today.getDay() + 6) % 7) + periodOffset * rangeDays);
    start.setHours(0, 0, 0, 0);
    return Array.from({ length: rangeDays }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return ymd(d);
    });
  }, [periodOffset, rangeDays]);

  const periodStart = periodDays[0];
  const periodEnd = periodDays[periodDays.length - 1];

  // Approved leave for the availability list (and the same firm-scoped read
  // the Diary uses). Capped at the RPC's 9-week window.
  const leaveTo = diffDays(periodEnd, periodStart) > 62 ? addDaysYmd(periodStart, 62) : periodEnd;
  const { data: board } = useDispatchBoard(periodStart, leaveTo);

  // Real crew counts from assignments. Same query/key as JobsSection so the
  // cache is shared.
  const { data: allAssignments = [] } = useQuery({
    queryKey: ['all-job-assignments'],
    queryFn: async () => {
      const { data, error } = await supabase.from('employer_job_assignments').select(`
          job_id,
          employee:employer_employees(id, name, avatar_initials, photo_url)
        `);
      if (error) throw error;
      return data || [];
    },
  });

  const crewCountByJob = useMemo(() => {
    const map = new Map<string, number>();
    allAssignments.forEach((a: { job_id: string }) => {
      map.set(a.job_id, (map.get(a.job_id) ?? 0) + 1);
    });
    return map;
  }, [allAssignments]);

  const crewNamesByJob = useMemo(() => {
    const map = new Map<string, string[]>();
    (allAssignments as { job_id: string; employee?: { name?: string | null } | null }[]).forEach(
      (a) => {
        const name = a.employee?.name?.trim();
        if (!name) return;
        const list = map.get(a.job_id) ?? [];
        list.push(name);
        map.set(a.job_id, list);
      }
    );
    return map;
  }, [allAssignments]);

  // One stage model (ELE-1961): every live job with a real start date, On hold
  // included (it used to vanish). Never invent dates.
  const timelineJobs: TimelineJob[] = jobs
    .filter((j) => j.status !== 'Cancelled' && !!j.start_date)
    .map((job) => ({
      ...job,
      stage: jobStage(job),
      assignedWorkers: crewCountByJob.get(job.id) ?? 0,
      startDate: (job.start_date as string).slice(0, 10),
      // Open-ended job (no end date) shows as a single-day marker, not a fake span.
      endDate: (job.end_date || (job.start_date as string)).slice(0, 10),
    }));

  const getJobPosition = (job: TimelineJob, extra?: { move: number; resize: number }) => {
    const s = addDaysYmd(job.startDate, extra?.move ?? 0);
    const e = addDaysYmd(job.endDate, (extra?.move ?? 0) + (extra?.resize ?? 0));
    const end = e < s ? s : e;
    if (end < periodStart || s > periodEnd) return null;
    const cs = s < periodStart ? periodStart : s;
    const ce = end > periodEnd ? periodEnd : end;
    return { startDay: diffDays(cs, periodStart), duration: diffDays(ce, cs) + 1 };
  };

  const jobsThisPeriod = timelineJobs.filter((job) => getJobPosition(job) !== null);
  const liveThisPeriod = jobsThisPeriod.filter((j) => j.stage !== 'Complete');

  // Honest slippage: still live after its end date — not a progress guess.
  const today = todayYmd();
  const slippingCount = liveThisPeriod.filter(
    (j) => j.stage !== 'On Hold' && j.endDate < today
  ).length;
  const onHoldCount = liveThisPeriod.filter((j) => j.stage === 'On Hold').length;

  const stagesShown = JOB_STAGES.filter((s) => jobsThisPeriod.some((j) => j.stage === s.id));

  // Phone list: jobs grouped by the day (week view) or week (month/quarter)
  // they start in this period. A job that began earlier sits in the first group.
  const phoneGroups = (() => {
    const groups = new Map<string, TimelineJob[]>();
    const sorted = [...jobsThisPeriod].sort(
      (a, b) => a.startDate.localeCompare(b.startDate) || a.endDate.localeCompare(b.endDate)
    );
    sorted.forEach((job) => {
      const from = job.startDate < periodStart ? periodStart : job.startDate;
      const key =
        range === 'week'
          ? from
          : addDaysYmd(periodStart, Math.floor(diffDays(from, periodStart) / 7) * 7);
      const list = groups.get(key) ?? [];
      list.push(job);
      groups.set(key, list);
    });
    return [...groups.entries()];
  })();

  const groupLabel = (key: string) => {
    const d = new Date(`${key}T12:00:00`);
    if (range === 'week') {
      const label = d.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      });
      return key === today ? `Today, ${label}` : label;
    }
    return `Week of ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
  };

  const openJob = (jobId: string) => {
    const fullJob = jobs.find((j) => j.id === jobId);
    if (fullJob) {
      setSelectedJob(fullJob);
      setSheetOpen(true);
    }
  };

  const commitDates = useCallback(
    async (job: TimelineJob, start: string, end: string) => {
      if (start === job.startDate && end === job.endDate) return;
      try {
        await reschedule.mutateAsync({ jobId: job.id, start, end });
        toast.success(`${job.title}: ${rangeLabel(start, end)}`, {
          description:
            job.assignedWorkers > 0
              ? 'Everyone on it moved too. They get one push in about a minute.'
              : undefined,
        });
      } catch (e) {
        toast.error(dispatchErrorMessage(e));
      }
    },
    [reschedule]
  );

  // ── Pointer drag (desktop): drag the bar to move, the right edge to resize ──
  const beginDrag = (e: React.PointerEvent, job: TimelineJob, mode: 'move' | 'resize') => {
    if (!isDesktop || e.button !== 0) return;
    const grid = gridRef.current;
    if (!grid) return;
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    movedRef.current = false;
    setDrag({
      jobId: job.id,
      mode,
      originX: e.clientX,
      dayWidth: grid.getBoundingClientRect().width / rangeDays,
      delta: 0,
    });
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (!drag) return;
    const delta = Math.round((e.clientX - drag.originX) / drag.dayWidth);
    if (Math.abs(e.clientX - drag.originX) > 4) movedRef.current = true;
    if (delta !== drag.delta) setDrag({ ...drag, delta });
  };

  const endDrag = (job: TimelineJob) => {
    if (!drag) return;
    const { mode, delta } = drag;
    setDrag(null);
    if (!movedRef.current) {
      setDatesJob(job);
      return;
    }
    if (delta === 0) return;
    if (mode === 'move') {
      void commitDates(job, addDaysYmd(job.startDate, delta), addDaysYmd(job.endDate, delta));
    } else {
      const end = addDaysYmd(job.endDate, delta);
      void commitDates(job, job.startDate, end < job.startDate ? job.startDate : end);
    }
  };

  const formatValue = (value: number | null) => {
    if (!value) return null;
    if (value >= 1000) return `£${Math.round(value / 1000)}k`;
    return `£${value}`;
  };

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  const dayLetter = (d: string) =>
    new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'short' }).charAt(0);
  const dayNum = (d: string) => Number(d.slice(8, 10));

  if (jobsLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Operations"
          title="Timeline"
          description="Every booked job as a bar across the week, month or quarter."
          tone="indigo"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Timeline"
        description={
          isDesktop
            ? 'Drag a bar to move the job, or its right edge to change how long it runs. Everyone on it moves too, and the Diary shows the same dates.'
            : isPhone
              ? 'Tap a job to change its dates. Everyone on it moves too, and the Diary shows the same dates.'
              : 'Tap a bar to change the job’s dates. Everyone on it moves too, and the Diary shows the same dates.'
        }
        tone="indigo"
        actions={<PageHelpButton help={TIMELINE_HELP} askContext={{ page: 'timeline', tab: range }} />}
      />

      <HowItWorks help={TIMELINE_HELP} askContext={{ page: 'timeline', tab: range }} />

      <StatStrip
        columns={3}
        stats={[
          { label: 'Jobs shown', value: jobsThisPeriod.length },
          { label: 'Running late', value: slippingCount, tone: 'orange' },
          { label: 'On hold', value: onHoldCount, tone: 'red' },
        ]}
      />

      <div data-help="timeline.range">
      <FilterBar
        tabs={[
          { value: 'week', label: 'Week' },
          { value: 'month', label: 'Month' },
          { value: 'quarter', label: 'Quarter' },
        ]}
        activeTab={range}
        onTabChange={(v) => {
          setRange(v as RangeKey);
          setPeriodOffset(0);
        }}
        actions={
          <div className="flex items-center gap-2">
            <SecondaryButton onClick={() => setPeriodOffset((p) => p - 1)}>← Prev</SecondaryButton>
            <SecondaryButton onClick={() => setPeriodOffset(0)}>Today</SecondaryButton>
            <SecondaryButton onClick={() => setPeriodOffset((p) => p + 1)}>Next →</SecondaryButton>
          </div>
        }
      />
      </div>

      {isPhone && (
        <ListCard>
          <ListCardHeader
            tone="indigo"
            title="Schedule"
            meta={<Pill tone="indigo">{rangeLabel(periodStart, periodEnd)}</Pill>}
          />
          {jobsThisPeriod.length === 0 ? (
            <div className="p-8">
              <EmptyState
                title="No jobs in this period"
                description="Switch range or step to a different period to see booked work."
              />
            </div>
          ) : (
            <div data-help="timeline.phone-list">
              {phoneGroups.map(([key, groupJobs]) => (
                <section key={key} className="border-t border-white/[0.06] first:border-t-0">
                  <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-2">
                    <h3
                      className={cn(
                        'text-[12px] font-semibold uppercase tracking-[0.14em]',
                        key === today ? 'text-elec-yellow' : 'text-white'
                      )}
                    >
                      {groupLabel(key)}
                    </h3>
                    <span className="text-[12px] text-white tabular-nums">
                      {groupJobs.length} {groupJobs.length === 1 ? 'job' : 'jobs'}
                    </span>
                  </div>
                  <ul className="divide-y divide-white/[0.06]">
                    {groupJobs.map((job) => {
                      const sd = stageDef(job.stage);
                      const crew = crewNamesByJob.get(job.id) ?? [];
                      const late =
                        job.stage !== 'On Hold' && job.stage !== 'Complete' && job.endDate < today;
                      const crewText =
                        crew.length === 0
                          ? job.assignedWorkers > 0
                            ? `${job.assignedWorkers} on it`
                            : 'No one booked'
                          : crew.length <= 2
                            ? crew.join(', ')
                            : `${crew.slice(0, 2).join(', ')} +${crew.length - 2}`;
                      return (
                        <li key={job.id}>
                          <button
                            type="button"
                            onClick={() => setDatesJob(job)}
                            aria-label={`${job.title}, ${sd.label}, ${rangeLabel(job.startDate, job.endDate)}. Change dates`}
                            className="relative w-full text-left flex items-start gap-3 pl-5 pr-4 py-3.5 min-h-[64px] touch-manipulation active:bg-white/[0.04] transition-colors"
                          >
                            <span
                              aria-hidden
                              className={cn(
                                'absolute left-0 top-3 bottom-3 w-1 rounded-r-full',
                                sd.bar,
                                job.stage === 'Complete' && 'opacity-60'
                              )}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-[14.5px] font-semibold text-white leading-snug line-clamp-2">
                                  {job.title}
                                </span>
                                <Pill tone={sd.tone}>{sd.label}</Pill>
                              </div>
                              <div className="mt-1 text-[12.5px] text-white tabular-nums">
                                {rangeLabel(job.startDate, job.endDate)}
                                {late && (
                                  <span className="ml-2 font-semibold text-orange-400">
                                    Running late
                                  </span>
                                )}
                              </div>
                              <div className="mt-1 flex items-center gap-x-3 gap-y-1 flex-wrap text-[12.5px] text-white">
                                <span className="inline-flex items-center gap-1 min-w-0">
                                  <Users className="h-3.5 w-3.5 shrink-0" />
                                  <span className="truncate">{crewText}</span>
                                </span>
                                {job.location && (
                                  <span className="inline-flex items-center gap-1 min-w-0 max-w-full">
                                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate">{job.location}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </ListCard>
      )}

      {!isPhone && (
        <div data-help="timeline.gantt">
        <ListCard>
          <ListCardHeader
            tone="indigo"
            title="Gantt"
            meta={<Pill tone="indigo">{rangeLabel(periodStart, periodEnd)}</Pill>}
          />
          {jobsThisPeriod.length === 0 ? (
            <div className="p-8">
              <EmptyState
                title="No jobs in this period"
                description="Switch range or step to a different period to see booked work."
              />
            </div>
          ) : (
            <div className="p-4 sm:p-6 overflow-x-auto">
              <div
                className="relative min-w-[640px] rounded-xl border border-white/[0.06] overflow-hidden"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
                  backgroundSize: `${100 / rangeDays}% 56px`,
                }}
              >
                <div
                  className="grid border-b border-white/[0.06] bg-[hsl(0_0%_10%)]"
                  style={{ gridTemplateColumns: `repeat(${rangeDays}, minmax(0, 1fr))` }}
                >
                  {periodDays.map((day) => (
                    <div
                      key={day}
                      className={cn(
                        'px-1 py-2 text-center border-l border-white/[0.06] first:border-l-0',
                        day === today && 'bg-white/[0.06]'
                      )}
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                        {dayLetter(day)}
                      </div>
                      <div
                        className={cn(
                          'mx-auto mt-0.5 text-[11px] tabular-nums',
                          day === today
                            ? 'h-5 w-5 rounded-full bg-elec-yellow text-black font-semibold flex items-center justify-center'
                            : 'text-white'
                        )}
                      >
                        {dayNum(day)}
                      </div>
                    </div>
                  ))}
                </div>

                <div ref={gridRef} className="divide-y divide-white/[0.06]">
                  {jobsThisPeriod.map((job) => {
                    const dragging = drag?.jobId === job.id ? drag : null;
                    const position = getJobPosition(
                      job,
                      dragging
                        ? dragging.mode === 'move'
                          ? { move: dragging.delta, resize: 0 }
                          : { move: 0, resize: dragging.delta }
                        : undefined
                    );
                    const sd = stageDef(job.stage);
                    return (
                      <div key={job.id} className="relative h-14">
                        {position && (
                          <div
                            role="button"
                            tabIndex={0}
                            aria-label={`${job.title}, ${sd.label}, ${rangeLabel(job.startDate, job.endDate)}`}
                            onPointerDown={(e) => beginDrag(e, job, 'move')}
                            onPointerMove={onDragMove}
                            onPointerUp={() => endDrag(job)}
                            onPointerCancel={() => setDrag(null)}
                            onClick={() => {
                              if (!isDesktop) setDatesJob(job);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setDatesJob(job);
                              }
                            }}
                            className={cn(
                              'absolute top-2 bottom-2 rounded-md flex items-center pl-3 pr-4 shadow-sm select-none touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70',
                              sd.bar,
                              isDesktop && 'cursor-grab active:cursor-grabbing',
                              job.stage === 'Complete' && 'opacity-60',
                              dragging && 'ring-2 ring-white/80 z-10'
                            )}
                            style={{
                              left: `${(position.startDay / rangeDays) * 100}%`,
                              width: `${(position.duration / rangeDays) * 100}%`,
                              minWidth: '64px',
                            }}
                          >
                            <span
                              className={cn(
                                'text-[11px] font-semibold truncate flex-1',
                                sd.barText
                              )}
                            >
                              {job.title}
                            </span>
                            {job.stage === 'On Hold' ? (
                              <span
                                className={cn(
                                  'text-[10.5px] font-semibold shrink-0 ml-2',
                                  sd.barText
                                )}
                              >
                                On hold
                              </span>
                            ) : (
                              <span
                                className={cn(
                                  'text-[11px] font-semibold tabular-nums shrink-0 ml-2',
                                  sd.barText
                                )}
                              >
                                {job.progress}%
                              </span>
                            )}
                            {isDesktop && (
                              <span
                                aria-hidden
                                onPointerDown={(e) => beginDrag(e, job, 'resize')}
                                onPointerMove={onDragMove}
                                onPointerUp={() => endDrag(job)}
                                className="absolute right-0 top-0 bottom-0 w-2.5 cursor-ew-resize rounded-r-md bg-black/20 hover:bg-black/35"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                {stagesShown.map((s) => (
                  <div key={s.id} className="flex items-center gap-1.5">
                    <span className={cn('h-2 w-2 rounded-full', s.bar)} />
                    <span className="text-[11px] text-white">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ListCard>
        </div>
      )}

      {/* On phones the Schedule list above already lists every job. */}
      {!isPhone && (
        <ListCard>
          <ListCardHeader
            tone="indigo"
            title="Jobs"
            meta={<Pill tone="indigo">{jobsThisPeriod.length}</Pill>}
          />
          {jobsThisPeriod.length === 0 ? (
            <div className="p-8">
              <EmptyState
                title="No booked jobs"
                description="Jobs with a start date in this period appear here."
              />
            </div>
          ) : (
            <ListBody>
              {jobsThisPeriod.map((job) => {
                const sd = stageDef(job.stage);
                return (
                  <ListRow
                    key={job.id}
                    accent={sd.tone}
                    lead={<Avatar initials={getInitials(job.title || 'JB')} />}
                    title={job.title}
                    subtitle={
                      <span className="flex items-center gap-2">
                        <span>{rangeLabel(job.startDate, job.endDate)}</span>
                        <span className="text-white">·</span>
                        <span className="inline-flex items-center gap-1 min-w-0">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span className="truncate">{job.location}</span>
                        </span>
                        <span className="text-white">·</span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span className="tabular-nums">{job.assignedWorkers}</span>
                        </span>
                      </span>
                    }
                    trailing={
                      <>
                        {showMoney && formatValue(job.value) && (
                          <Pill tone="emerald">{formatValue(job.value)}</Pill>
                        )}
                        <Pill tone={sd.tone}>{sd.label}</Pill>
                      </>
                    }
                    onClick={() => openJob(job.id)}
                  />
                );
              })}
            </ListBody>
          )}
        </ListCard>
      )}

      {!employeesLoading && employees.length > 0 && (
        <ListCard>
          <ListCardHeader
            tone="cyan"
            title="Team availability"
            meta={<Pill tone="cyan">{employees.filter((e) => e.status === 'Active').length}</Pill>}
          />
          <ListBody>
            {employees
              .filter((e) => e.status === 'Active')
              .map((employee) => {
                // Approved leave is the truth for "On Leave" (the old branch read
                // a roster status that is never set, so it could not be true).
                const leaveNow = board.leave.find(
                  (l) =>
                    l.employee_id === employee.id && l.start_date <= today && l.end_date >= today
                );
                const leaveInPeriod = board.leave.filter(
                  (l) => l.employee_id === employee.id && l !== leaveNow
                );
                const loc = workerLocations.find((l) => l.employee_id === employee.id);
                const isStale =
                  !!loc &&
                  (!loc.last_updated ||
                    Date.now() - new Date(loc.last_updated).getTime() >
                      STALE_AFTER_HOURS * 60 * 60 * 1000);
                const status = leaveNow
                  ? 'On Leave'
                  : isStale
                    ? 'Off Duty'
                    : loc?.status || 'Office';
                const onSite = status === 'On Site';
                const leaveText = [
                  leaveNow
                    ? `${leaveLabel(leaveNow)} until ${rangeLabel(leaveNow.end_date)}`
                    : null,
                  ...leaveInPeriod.map(
                    (l) => `${leaveLabel(l)} ${rangeLabel(l.start_date, l.end_date)}`
                  ),
                ]
                  .filter(Boolean)
                  .join(' · ');
                return (
                  <ListRow
                    key={employee.id}
                    lead={<Avatar initials={employee.avatar_initials} online={onSite} />}
                    title={employee.name}
                    subtitle={leaveText || employee.team_role}
                    trailing={<Pill tone={WORKER_STATUS_TONE[status] ?? 'cyan'}>{status}</Pill>}
                  />
                );
              })}
          </ListBody>
        </ListCard>
      )}

      <TimelineDatesSheet
        job={datesJob}
        onClose={() => setDatesJob(null)}
        onSave={async (start, end) => {
          if (!datesJob) return;
          await commitDates(datesJob, start, end);
          setDatesJob(null);
        }}
        onOpenJob={(id) => {
          setDatesJob(null);
          openJob(id);
        }}
        saving={reschedule.isPending}
      />
      <ViewJobSheet job={selectedJob} open={sheetOpen} onOpenChange={setSheetOpen} />
    </PageFrame>
  );
}

/** Tap a bar (phone) or press Enter on it: change the job's dates in a sheet. */
function TimelineDatesSheet({
  job,
  onClose,
  onSave,
  onOpenJob,
  saving,
}: {
  job: TimelineJob | null;
  onClose: () => void;
  onSave: (start: string, end: string) => void;
  onOpenJob: (jobId: string) => void;
  saving: boolean;
}) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [forJob, setForJob] = useState<string | null>(null);

  if (job && forJob !== job.id) {
    setForJob(job.id);
    setStart(job.startDate);
    setEnd(job.endDate);
  }
  if (!job && forJob !== null) setForJob(null);

  const length = start && end ? diffDays(end, start) : 0;
  const shift = (n: number) => {
    setStart(addDaysYmd(start, n));
    setEnd(addDaysYmd(end, n));
  };
  const sd = job ? stageDef(job.stage) : null;

  return (
    <Sheet open={!!job} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        {job && (
          <SheetShell
            eyebrow="Move job"
            title={job.title}
            description={
              <span className="flex flex-wrap items-center gap-2">
                {job.client && <span>{job.client}</span>}
                {sd && <Pill tone={sd.tone}>{sd.label}</Pill>}
                <span>
                  {job.assignedWorkers} {job.assignedWorkers === 1 ? 'person' : 'people'} on it
                </span>
              </span>
            }
            footer={
              <>
                <SecondaryButton onClick={() => onOpenJob(job.id)}>Open job</SecondaryButton>
                <PrimaryButton
                  data-help="timeline.save"
                  className="flex-1"
                  disabled={
                    saving ||
                    !inputDateOk(start) ||
                    !inputDateOk(end) ||
                    end < start ||
                    (start === job.startDate && end === job.endDate)
                  }
                  onClick={() => onSave(start, end)}
                >
                  {saving ? 'Saving…' : 'Save dates'}
                </PrimaryButton>
              </>
            }
          >
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-1.5" data-help="timeline.shift">
                {[
                  { n: -7, l: '−1 wk' },
                  { n: -1, l: '−1 day' },
                  { n: 1, l: '+1 day' },
                  { n: 7, l: '+1 wk' },
                ].map((b) => (
                  <button
                    key={b.l}
                    type="button"
                    onClick={() => shift(b.n)}
                    className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] text-[13px] font-medium text-white touch-manipulation active:scale-[0.98]"
                  >
                    {b.l}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className={fieldLabelClass}>Starts</span>
                  <input
                    type="date"
                    value={start}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (!v) return;
                      setEnd(addDaysYmd(v, Math.max(0, length)));
                      setStart(v);
                    }}
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className={fieldLabelClass}>Ends</span>
                  <input
                    type="date"
                    value={end}
                    min={start}
                    onChange={(e) => e.target.value && setEnd(e.target.value)}
                    className={inputClass}
                  />
                </label>
              </div>
              <p className="text-[13px] text-white">
                {inputDateOk(start) && inputDateOk(end) && end >= start
                  ? `${rangeLabel(start, end)} · ${length + 1} ${length === 0 ? 'day' : 'days'}`
                  : 'The end is before the start.'}
              </p>
              <p className="text-[12.5px] text-white leading-relaxed">
                Everyone booked on this job slides with it and stays inside the new dates. They get
                one push about it.
              </p>
              <div className="flex items-center gap-2 text-[12px] text-white">
                <Dot tone={sd?.tone ?? 'blue'} />
                Currently {rangeLabel(job.startDate, job.endDate)}
              </div>
            </div>
          </SheetShell>
        )}
      </SheetContent>
    </Sheet>
  );
}
