/**
 * TimesheetPage
 *
 * Routed page (replaces TimesheetSheet bottom sheet) for workers to manage
 * timesheets:
 * - Glanceable today / this-week / awaiting-approval totals
 * - Prominent clock in/out
 * - This-week day breakdown
 * - Recent history with this-week / all filter
 * - Manual time entry with inline validation
 *
 * Multi-step flow is driven by local `view` state with in-page back controls —
 * no new routes. All data hooks, mutations and handlers are carried over from
 * the source sheet unchanged in behaviour.
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isYesterday } from 'date-fns';
import { Clock, Loader2, Play, Square, PenLine, ArrowLeft } from 'lucide-react';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useWorkerSelfService } from '@/hooks/useWorkerSelfService';
import { useActiveJobs } from '@/hooks/useJobs';
import { useCreateTimesheet } from '@/hooks/useTimesheets';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import {
  Eyebrow,
  Field,
  Pill,
  PrimaryButton,
  SecondaryButton,
  PulseDot,
  EmptyState,
  LoadingState,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Divider,
  SplitLayout,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';

type TimesheetView = 'overview' | 'clock-in' | 'clock-out' | 'manual';
type HistoryFilter = 'week' | 'all';

const BREAK_PRESETS = [0, 15, 30, 45, 60];

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Monday-anchored start of the current week (UK working week). */
function startOfWeekMonday(d: Date): Date {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay(); // 0 = Sun … 6 = Sat
  const diff = day === 0 ? 6 : day - 1; // days since Monday
  date.setDate(date.getDate() - diff);
  return date;
}

function statusTone(status: string): Tone {
  const s = status?.toLowerCase();
  if (s === 'approved') return 'green';
  if (s === 'rejected') return 'red';
  return 'amber';
}

function formatHours(h: number): string {
  return `${h.toFixed(h % 1 === 0 ? 0 : 1)}`;
}

function relativeDay(dateStr: string): string {
  const d = new Date(dateStr);
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return format(d, 'EEE d MMM');
}

export default function TimesheetPage() {
  const {
    employee,
    employeeId,
    employeeName,
    isClockedIn,
    clockState,
    duration,
    clockIn,
    clockOut,
    isClockingOut,
    timesheets,
    isLoadingTimesheets,
    todaysHours,
  } = useWorkerSelfService();

  const { data: jobs, isLoading: jobsLoading } = useActiveJobs();
  const createTimesheet = useCreateTimesheet();

  // Live: an employer decision (approve / reject) on one of this worker's
  // timesheets updates the page instantly — no manual reload. Invalidating the
  // timesheets root also refreshes the clock-state restore that reads the same
  // table on mount.
  useRealtimeInvalidate(
    'worker-timesheets',
    [{ table: 'employer_timesheets', filter: `employee_id=eq.${employeeId}` }],
    [['timesheets', 'employee', employeeId], ['todays-hours', employeeId], ['timesheets']],
    Boolean(employeeId)
  );

  const [view, setView] = useState<TimesheetView>('overview');
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>('week');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [breakMinutes, setBreakMinutes] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manual entry state
  const [manualData, setManualData] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '17:00',
    breakMins: 30,
    notes: '',
  });

  // ── Derived glanceable stats (from already-fetched timesheets) ──────────
  const { weekHours, weekDays, pendingCount, weekStart } = useMemo(() => {
    const wkStart = startOfWeekMonday(new Date());
    const completed = (timesheets || []).filter((t) => t.clock_out);
    let wkHours = 0;
    const wkDates = new Set<string>();
    for (const t of completed) {
      const d = new Date(t.date);
      d.setHours(0, 0, 0, 0);
      if (d >= wkStart) {
        wkHours += t.total_hours || 0;
        wkDates.add(t.date);
      }
    }
    const pending = (timesheets || []).filter(
      (t) => t.clock_out && t.status?.toLowerCase() === 'pending'
    ).length;
    return {
      weekHours: wkHours,
      weekDays: wkDates.size,
      pendingCount: pending,
      weekStart: wkStart,
    };
  }, [timesheets]);

  // ── This-week day breakdown (Mon → Sun, hours per day) ──────────────────
  const weekBreakdown = useMemo(() => {
    const completed = (timesheets || []).filter((t) => t.clock_out);
    const days = WEEKDAY_LABELS.map((label, i) => {
      const dayDate = new Date(weekStart);
      dayDate.setDate(weekStart.getDate() + i);
      const key = dayDate.toISOString().split('T')[0];
      const hours = completed
        .filter((t) => t.date === key)
        .reduce((sum, t) => sum + (t.total_hours || 0), 0);
      return {
        label,
        date: key,
        hours,
        isToday: isToday(dayDate),
        isFuture: dayDate.setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0),
      };
    });
    const maxHours = Math.max(1, ...days.map((d) => d.hours));
    return { days, maxHours };
  }, [timesheets, weekStart]);

  // ── Recent history, filtered (this week / all) ──────────────────────────
  const recent = useMemo(() => {
    const completed = (timesheets || []).filter((t) => t.clock_out);
    if (historyFilter === 'week') {
      return completed.filter((t) => {
        const d = new Date(t.date);
        d.setHours(0, 0, 0, 0);
        return d >= weekStart;
      });
    }
    return completed.slice(0, 30);
  }, [timesheets, historyFilter, weekStart]);

  const jobTitleById = useMemo(() => {
    const map = new Map<string, string>();
    (jobs || []).forEach((j) => map.set(j.id, j.title));
    return map;
  }, [jobs]);

  const resetTransient = () => {
    setSelectedJobId('');
    setBreakMinutes(0);
    setManualData({
      date: new Date().toISOString().split('T')[0],
      startTime: '08:00',
      endTime: '17:00',
      breakMins: 30,
      notes: '',
    });
  };

  const backToOverview = () => {
    setView('overview');
    resetTransient();
  };

  const handleClockIn = async () => {
    if (!selectedJobId || !employeeId || !employeeName) {
      toast.error('Please select a job');
      return;
    }

    const job = jobs?.find((j) => j.id === selectedJobId);
    if (!job) {
      toast.error('Job not found');
      return;
    }

    // The hook persists the open entry and toasts success/failure itself
    const ok = await clockIn(employeeId, employeeName, selectedJobId, job.title);
    if (ok) backToOverview();
  };

  const handleClockOut = async () => {
    setIsSubmitting(true);
    const success = await clockOut(breakMinutes);
    setIsSubmitting(false);

    if (success) {
      backToOverview();
    }
  };

  const handleManualSubmit = async () => {
    if (!selectedJobId || !employeeId) {
      toast.error('Please select a job');
      return;
    }

    const startDateTime = `${manualData.date}T${manualData.startTime}:00`;
    const endDateTime = `${manualData.date}T${manualData.endTime}:00`;

    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    if (endDate <= startDate) {
      toast.error('End time must be after start time');
      return;
    }

    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const totalHours = Math.max(0, diffHours - manualData.breakMins / 60);

    setIsSubmitting(true);

    try {
      await createTimesheet.mutateAsync({
        employee_id: employeeId,
        job_id: selectedJobId,
        date: manualData.date,
        clock_in: startDateTime,
        clock_out: endDateTime,
        break_minutes: manualData.breakMins,
        total_hours: parseFloat(totalHours.toFixed(2)),
        status: 'Pending',
        notes: manualData.notes || null,
        approved_by: null,
        approved_at: null,
      });

      toast.success(`${totalHours.toFixed(1)} hours logged successfully`);
      backToOverview();
    } catch {
      toast.error('Failed to submit timesheet');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Live preview of manual entry total (validation feedback)
  const manualPreview = useMemo(() => {
    const start = new Date(`${manualData.date}T${manualData.startTime}:00`);
    const end = new Date(`${manualData.date}T${manualData.endTime}:00`);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) return null;
    const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return Math.max(0, diffHours - manualData.breakMins / 60);
  }, [manualData]);

  const noJobs = !jobsLoading && (!jobs || jobs.length === 0);

  const heroEyebrow =
    view === 'clock-in'
      ? 'Start tracking'
      : view === 'clock-out'
        ? 'End session'
        : view === 'manual'
          ? 'Log past hours'
          : 'Time';

  const heroTitle =
    view === 'clock-in'
      ? 'Clock in'
      : view === 'clock-out'
        ? 'Clock out'
        : view === 'manual'
          ? 'Manual entry'
          : 'Timesheets';

  const heroDescription =
    view === 'overview'
      ? 'Track your hours on site, log past work and keep an eye on what is awaiting approval.'
      : undefined;

  // Header action: an in-page back control for the sub-views.
  const actions =
    view !== 'overview' ? (
      <SecondaryButton onClick={backToOverview} className="gap-1.5">
        <ArrowLeft className="h-4 w-4" />
        Back
      </SecondaryButton>
    ) : isClockedIn ? (
      <Pill tone="green" className="gap-1.5">
        <PulseDot tone="green" />
        On site
      </Pill>
    ) : undefined;

  if (!employee) {
    return (
      <WorkerToolPage eyebrow="Time" title="Timesheets">
        <LoadingState className="py-16" />
      </WorkerToolPage>
    );
  }

  return (
    <WorkerToolPage
      eyebrow={heroEyebrow}
      title={heroTitle}
      description={heroDescription}
      actions={actions}
    >
      <AnimatePresence mode="wait">
        {/* ── View: Overview ──────────────────────────────────────────── */}
        {view === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-8"
          >
            {/* Live clock state */}
            {isClockedIn && clockState && (
              <div className="rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/25 p-5">
                <div className="flex items-center gap-2">
                  <PulseDot tone="green" />
                  <Eyebrow className="text-emerald-400/80">Currently clocked in</Eyebrow>
                </div>
                <p className="mt-4 text-5xl font-semibold text-white font-mono tabular-nums tracking-tight leading-none">
                  {duration}
                </p>
                <div className="mt-3 flex items-center justify-between text-[12.5px]">
                  <span className="text-white truncate">{clockState.jobTitle}</span>
                  <span className="text-white/50 shrink-0 ml-3">
                    Since {format(new Date(clockState.clockInTime), 'HH:mm')}
                  </span>
                </div>
              </div>
            )}

            {/* Glanceable totals */}
            <StatStrip
              columns={3}
              stats={[
                { label: 'Today', value: `${formatHours(todaysHours)}h`, accent: true },
                {
                  label: 'This week',
                  value: `${formatHours(weekHours)}h`,
                  sub: weekDays ? `${weekDays} ${weekDays === 1 ? 'day' : 'days'}` : undefined,
                },
                {
                  label: 'Awaiting',
                  value: pendingCount,
                  sub: pendingCount ? 'approval' : 'all clear',
                  tone: pendingCount ? 'amber' : undefined,
                },
              ]}
            />

            {/* Primary actions */}
            <div className="space-y-2.5">
              {!isClockedIn ? (
                <button
                  type="button"
                  onClick={() => setView('clock-in')}
                  disabled={noJobs}
                  className="w-full min-h-[64px] p-4 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/25 hover:border-emerald-500/40 transition-all touch-manipulation active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 group flex items-center gap-4 text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/25 transition-colors">
                    <Play className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-white">Clock in</p>
                    <p className="text-[12.5px] text-white/50">Start tracking time on a job</p>
                  </div>
                  <span className="text-emerald-400/70 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0">
                    →
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setView('clock-out')}
                  className="w-full min-h-[64px] p-4 rounded-2xl bg-red-500/[0.08] border border-red-500/25 hover:border-red-500/40 transition-all touch-manipulation active:scale-[0.98] group flex items-center gap-4 text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0 group-hover:bg-red-500/25 transition-colors">
                    <Square className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-white">Clock out</p>
                    <p className="text-[12.5px] text-white/50">End your current session</p>
                  </div>
                  <span className="text-red-400/70 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all shrink-0">
                    →
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setView('manual')}
                disabled={noJobs}
                className="w-full min-h-[64px] p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all touch-manipulation active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 group flex items-center gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0 group-hover:bg-white/[0.1] transition-colors">
                  <PenLine className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-semibold text-white">Manual entry</p>
                  <p className="text-[12.5px] text-white/50">Log hours for a past date</p>
                </div>
                <span className="text-white/30 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all shrink-0">
                  →
                </span>
              </button>
            </div>

            {noJobs && (
              <EmptyState
                title="No active jobs"
                description="Your employer needs to add an active job before you can clock in or log hours."
              />
            )}

            {/* Day breakdown + history compose across the width on desktop,
                stack on mobile. */}
            <SplitLayout
              ratio="1-1"
              primary={
                <>
                  {/* This-week day breakdown */}
                  <div>
                    <Divider label="This week" />
                    <div className="mt-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] p-4">
                      {isLoadingTimesheets ? (
                        <LoadingState className="py-8" />
                      ) : (
                        <div className="flex items-end justify-between gap-2 sm:gap-3">
                          {weekBreakdown.days.map((d) => {
                            const pct = d.hours > 0 ? (d.hours / weekBreakdown.maxHours) * 100 : 0;
                            return (
                              <div
                                key={d.date}
                                className="flex-1 flex flex-col items-center gap-2 min-w-0"
                              >
                                <span className="text-[11px] font-semibold tabular-nums text-white/70 h-4">
                                  {d.hours > 0 ? `${formatHours(d.hours)}` : ''}
                                </span>
                                <div className="w-full h-24 rounded-lg bg-white/[0.04] flex items-end overflow-hidden">
                                  <div
                                    className={cn(
                                      'w-full rounded-lg transition-all',
                                      d.isToday ? 'bg-elec-yellow' : 'bg-emerald-500/60'
                                    )}
                                    style={{ height: `${pct}%` }}
                                  />
                                </div>
                                <span
                                  className={cn(
                                    'text-[11px] font-medium',
                                    d.isToday
                                      ? 'text-elec-yellow'
                                      : d.isFuture
                                        ? 'text-white/25'
                                        : 'text-white/55'
                                  )}
                                >
                                  {d.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              }
              secondary={
                /* Recent history + filter */
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <Divider label="History" className="flex-1" />
                    <div className="flex items-center rounded-lg bg-white/[0.04] border border-white/[0.06] p-0.5 shrink-0">
                      {(['week', 'all'] as const).map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setHistoryFilter(f)}
                          aria-pressed={historyFilter === f}
                          className={cn(
                            'px-3 h-8 rounded-md text-[12px] font-medium transition-all touch-manipulation',
                            historyFilter === f
                              ? 'bg-white/[0.1] text-white'
                              : 'text-white/50 hover:text-white/80'
                          )}
                        >
                          {f === 'week' ? 'This week' : 'All'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    {isLoadingTimesheets ? (
                      <LoadingState className="py-10" />
                    ) : recent.length === 0 ? (
                      <EmptyState
                        title={
                          historyFilter === 'week'
                            ? 'Nothing logged this week'
                            : 'No timesheets yet'
                        }
                        description="Your clocked and logged hours will appear here."
                      />
                    ) : (
                      <ListCard>
                        <ListCardHeader
                          title="Logged hours"
                          meta={
                            <span className="text-[11px] text-white/45 tabular-nums">
                              {recent.length}
                            </span>
                          }
                        />
                        <ListBody>
                          {recent.map((t) => {
                            const jobTitle = t.job_id ? jobTitleById.get(t.job_id) : undefined;
                            return (
                              <ListRow
                                key={t.id}
                                accent={statusTone(t.status)}
                                title={relativeDay(t.date)}
                                subtitle={
                                  jobTitle ||
                                  (t.clock_in && t.clock_out
                                    ? `${format(new Date(t.clock_in), 'HH:mm')} – ${format(
                                        new Date(t.clock_out),
                                        'HH:mm'
                                      )}`
                                    : 'Logged hours')
                                }
                                trailing={
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-[15px] font-semibold text-white tabular-nums">
                                      {formatHours(t.total_hours || 0)}h
                                    </span>
                                    <Pill tone={statusTone(t.status)}>{t.status}</Pill>
                                  </div>
                                }
                              />
                            );
                          })}
                        </ListBody>
                      </ListCard>
                    )}
                  </div>
                </div>
              }
            />
          </motion.div>
        )}

        {/* ── View: Clock In ──────────────────────────────────────────── */}
        {view === 'clock-in' && (
          <motion.div
            key="clock-in"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-5 w-full max-w-xl mx-auto"
          >
            <div className="text-center pt-1 pb-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/[0.1] border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                <Play className="h-7 w-7 text-emerald-400" />
              </div>
              <h3 className="text-[17px] font-semibold text-white">Start working</h3>
              <p className="text-[12.5px] text-white/50 mt-1">
                Select the job you&apos;re working on
              </p>
            </div>

            <Field label="Select job" required>
              <Select
                value={selectedJobId}
                onValueChange={setSelectedJobId}
                disabled={jobsLoading || noJobs}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder={jobsLoading ? 'Loading jobs…' : 'Choose a job…'} />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {jobs?.map((job) => (
                    <SelectItem
                      key={job.id}
                      value={job.id}
                      className="text-white focus:bg-white/10 focus:text-white"
                    >
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 flex items-center gap-3">
              <Clock className="h-4 w-4 text-elec-yellow shrink-0" />
              <p className="text-[13px] text-white">
                Clock starts now —{' '}
                <span className="font-semibold tabular-nums">{format(new Date(), 'HH:mm')}</span>{' '}
                today
              </p>
            </div>

            {noJobs && (
              <EmptyState
                title="No active jobs"
                description="Ask your employer to add an active job, then try again."
              />
            )}

            <div className="flex items-center gap-3 pt-2">
              <SecondaryButton onClick={backToOverview} size="lg" className="px-5">
                Back
              </SecondaryButton>
              <PrimaryButton
                onClick={handleClockIn}
                disabled={!selectedJobId}
                fullWidth
                size="lg"
                className="bg-emerald-500 text-black hover:bg-emerald-500/90"
              >
                <Play className="h-5 w-5 mr-2" />
                Start clock
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {/* ── View: Clock Out ─────────────────────────────────────────── */}
        {view === 'clock-out' && clockState && (
          <motion.div
            key="clock-out"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-5 w-full max-w-xl mx-auto"
          >
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 text-center">
              <Eyebrow className="text-white/40">Time on site</Eyebrow>
              <p className="mt-3 text-5xl font-semibold text-white font-mono tabular-nums tracking-tight leading-none">
                {duration}
              </p>
              <p className="mt-3 text-[12.5px] text-white/60 truncate">{clockState.jobTitle}</p>
              <p className="mt-1 text-[11px] text-white/40">
                Started {format(new Date(clockState.clockInTime), 'HH:mm')}
              </p>
            </div>

            <Field label="Break taken (minutes)">
              <div className="grid grid-cols-5 gap-2">
                {BREAK_PRESETS.map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setBreakMinutes(mins)}
                    aria-pressed={breakMinutes === mins}
                    className={cn(
                      'h-12 rounded-xl border text-[14px] font-medium tabular-nums transition-all touch-manipulation',
                      breakMinutes === mins
                        ? 'bg-elec-yellow/[0.12] border-elec-yellow/50 text-elec-yellow'
                        : 'bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.06]'
                    )}
                  >
                    {mins}
                  </button>
                ))}
              </div>
              <Input
                type="number"
                min="0"
                max="480"
                inputMode="numeric"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(parseInt(e.target.value) || 0)}
                className={cn(inputClass, 'mt-2')}
                placeholder="Or enter custom…"
                aria-label="Custom break minutes"
              />
            </Field>

            <div className="flex items-center gap-3 pt-2">
              <SecondaryButton
                onClick={backToOverview}
                disabled={isSubmitting || isClockingOut}
                size="lg"
                className="px-5"
              >
                Back
              </SecondaryButton>
              <PrimaryButton
                onClick={handleClockOut}
                disabled={isSubmitting || isClockingOut}
                fullWidth
                size="lg"
                className="bg-red-500 text-black hover:bg-red-500/90"
              >
                {isSubmitting || isClockingOut ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    <Square className="h-5 w-5 mr-2" />
                    Clock out
                  </>
                )}
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {/* ── View: Manual Entry ──────────────────────────────────────── */}
        {view === 'manual' && (
          <motion.div
            key="manual"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            className="space-y-4 w-full max-w-xl mx-auto"
          >
            <Field label="Job" required>
              <Select
                value={selectedJobId}
                onValueChange={setSelectedJobId}
                disabled={jobsLoading || noJobs}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder={jobsLoading ? 'Loading jobs…' : 'Choose a job…'} />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {jobs?.map((job) => (
                    <SelectItem
                      key={job.id}
                      value={job.id}
                      className="text-white focus:bg-white/10 focus:text-white"
                    >
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Date">
              <Input
                type="date"
                value={manualData.date}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setManualData((prev) => ({ ...prev, date: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Start time">
                <Input
                  type="time"
                  value={manualData.startTime}
                  onChange={(e) =>
                    setManualData((prev) => ({ ...prev, startTime: e.target.value }))
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="End time">
                <Input
                  type="time"
                  value={manualData.endTime}
                  onChange={(e) => setManualData((prev) => ({ ...prev, endTime: e.target.value }))}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Break (minutes)">
              <Input
                type="number"
                min="0"
                max="480"
                inputMode="numeric"
                value={manualData.breakMins}
                onChange={(e) =>
                  setManualData((prev) => ({
                    ...prev,
                    breakMins: parseInt(e.target.value) || 0,
                  }))
                }
                className={inputClass}
              />
            </Field>

            <Field label="Notes (optional)">
              <Textarea
                value={manualData.notes}
                onChange={(e) => setManualData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="What did you work on?"
                className={cn(textareaClass, 'min-h-[80px]')}
              />
            </Field>

            {/* Live total preview / inline validation */}
            <div
              className={cn(
                'rounded-xl border px-4 py-3 flex items-center justify-between',
                manualPreview
                  ? 'bg-white/[0.03] border-white/[0.06]'
                  : 'bg-red-500/[0.06] border-red-500/25'
              )}
            >
              <span className="text-[12.5px] text-white/60">
                {manualPreview ? 'Total payable hours' : 'End time must be after start time'}
              </span>
              {manualPreview != null && (
                <span className="text-[18px] font-semibold text-elec-yellow tabular-nums">
                  {manualPreview.toFixed(1)}h
                </span>
              )}
            </div>

            {noJobs && (
              <EmptyState
                title="No active jobs"
                description="Ask your employer to add an active job before logging hours."
              />
            )}

            <div className="flex items-center gap-3 pt-2">
              <SecondaryButton
                onClick={backToOverview}
                disabled={isSubmitting}
                size="lg"
                className="px-5"
              >
                Back
              </SecondaryButton>
              <PrimaryButton
                onClick={handleManualSubmit}
                disabled={!selectedJobId || isSubmitting || !manualPreview}
                fullWidth
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Clock className="h-5 w-5 mr-2" />
                    {manualPreview ? `Submit ${manualPreview.toFixed(1)}h` : 'Submit timesheet'}
                  </>
                )}
              </PrimaryButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </WorkerToolPage>
  );
}
