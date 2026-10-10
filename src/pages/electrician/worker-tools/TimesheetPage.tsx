/**
 * TimesheetPage — Worker Tools › Timesheets (ELE-2000).
 *
 * - Clock in against a job with ONE location fix (stored with its accuracy).
 *   We say plainly what's recorded; a denied permission never stops anyone
 *   clocking in — the day just says "no location".
 * - Clock out with a second fix and the firm's break default (the same
 *   default manual entry uses — they were 0 and 30 before).
 * - A day the office sent back sits at the top with their reason and a Fix
 *   button: change it and it goes back as pending (server-checked as the
 *   worker's own row; hours worked out on the server).
 * - A pending day can be changed or deleted.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import {
  Loader2,
  Play,
  Square,
  PenLine,
  ArrowLeft,
  MapPin,
  MapPinOff,
  Coffee,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  PageHelpButton,
  HowItWorks,
  type PageHelpContent,
  type HelpBlocker,
} from '@/components/hub/PageHelp';
import { WT_TIMESHEET_TASKS } from '@/components/worker-tools/help/worker-help';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import { useWorkerSelfService, useMyJobs } from '@/hooks/useWorkerSelfService';
import { type Timesheet } from '@/hooks/useTimesheets';
import { captureClockFix, type ClockFix } from '@/hooks/useClockState';
import {
  useMyTimeSettings,
  useFixMyTimesheet,
  useDeleteMyTimesheet,
} from '@/hooks/useWorkerTimesheetActions';
import { rpcErrorMessage } from '@/hooks/useWorkerJobSite';
import { useMyPayrollExports } from '@/hooks/useFirmPaySettings';
import { formatPeriodRange } from '@/utils/payPeriods';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { submitWorkerAction, OutboxRefusedError } from '@/lib/workerOutbox';
import { OutboxWaitingList } from '@/components/worker-tools/WorkerOutbox';
import {
  PrestartGateNotice,
  usePrestartOutstanding,
} from '@/components/worker-tools/JobChecklistsPanel';
import { queuedToast } from '@/components/worker-tools/outboxToast';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import {
  Field,
  PrimaryButton,
  SecondaryButton,
  PulseDot,
  LoadingState,
  SplitLayout,
  SheetShell,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import {
  WorkerPanel,
  GroupLabel,
  SectionTitle,
  Verdict,
  SolidBadge,
  RowAction,
  JobChoice,
  Segmented,
} from '@/components/worker-tools/WorkerUi';

type TimesheetView = 'overview' | 'clock-in' | 'clock-out' | 'manual';
type HistoryFilter = 'week' | 'all';

/** employer_timesheets with the ELE-2000 columns (select('*') returns them). */
type Day = Timesheet & {
  rejection_reason?: string | null;
  previous_rejection_reason?: string | null;
  resubmitted_at?: string | null;
  clock_in_location_status?: string | null;
  clock_in_accuracy_m?: number | null;
  clock_out_location_status?: string | null;
  /** ELE-1825: the payroll run that took this approved day (null = not sent). */
  payroll_export_id?: string | null;
};

const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function startOfWeekMonday(d: Date): Date {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay();
  date.setDate(date.getDate() - (day === 0 ? 6 : day - 1));
  return date;
}

const localDateKey = (d: Date) => format(d, 'yyyy-MM-dd');

function formatHours(h: number): string {
  return `${h.toFixed(h % 1 === 0 ? 0 : 1)}`;
}

function relativeDay(dateStr: string): string {
  const d = parseISO(dateStr);
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return format(d, 'EEE d MMM');
}

/** Start/finish on one date → instants. A finish at or before the start is the next morning (night work). */
function spanFrom(date: string, start: string, end: string) {
  const s = new Date(`${date}T${start}:00`);
  const e = new Date(`${date}T${end}:00`);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return null;
  const overnight = e <= s;
  if (overnight) e.setDate(e.getDate() + 1);
  const minutes = (e.getTime() - s.getTime()) / 60000;
  if (minutes <= 0 || minutes > 24 * 60) return null;
  return { start: s, end: e, minutes, overnight };
}

function fixLine(status?: string | null, accuracy?: number | null): string | null {
  if (status === 'captured')
    return accuracy != null ? `Location recorded (to within ${Math.round(accuracy)} m)` : 'Location recorded';
  if (status === 'denied') return 'No location. Permission is off';
  if (status === 'unavailable') return 'No location. The phone couldn’t get a fix';
  return null;
}

const TIMESHEET_HELP: PageHelpContent = {
  id: 'worker-timesheets',
  title: 'Your timesheets',
  what: (
    <>
      Your hours for each day, sent to the office to approve. Approved hours are what you are paid
      for.
    </>
  ),
  steps: [
    {
      title: 'Clock in when you start',
      body: 'Pick the job and tap Clock in. If location is on, the office sees where you clocked in.',
    },
    {
      title: 'Clock out when you finish',
      body: 'Check your break minutes and tap Clock out. The day goes to the office to approve.',
    },
    {
      title: 'Missed a day?',
      body: 'Use Add a past day. If the office sends a day back, fix it and send it again.',
    },
  ],
  tasks: WT_TIMESHEET_TASKS,
};

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
    breakMinutes: trackedBreak,
    timesheets,
    isLoadingTimesheets,
    todaysHours,
  } = useWorkerSelfService();

  const { data: jobs = [], isLoading: jobsLoading } = useMyJobs('active');
  const { data: allJobs = [] } = useMyJobs('all');
  const { data: settings } = useMyTimeSettings();
  const defaultBreak = settings?.defaultBreakMinutes ?? 30;

  useRealtimeInvalidate(
    'worker-timesheets',
    [{ table: 'employer_timesheets', filter: `employee_id=eq.${employeeId}` }],
    [['timesheets', 'employee', employeeId], ['todays-hours', employeeId], ['timesheets']],
    Boolean(employeeId)
  );

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [view, setView] = useState<TimesheetView>('overview');
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>('week');
  const [selectedJobId, setSelectedJobId] = useState<string>(searchParams.get('job') ?? '');
  const [breakMinutes, setBreakMinutes] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locating, setLocating] = useState(false);
  const [fixing, setFixing] = useState<Day | null>(null);

  const [manualData, setManualData] = useState({
    date: localDateKey(new Date()),
    startTime: '08:00',
    endTime: '16:30',
    breakMins: defaultBreak,
    notes: '',
  });
  // The firm default arrives after first render — apply it to an untouched form.
  useEffect(() => {
    setManualData((m) => ({ ...m, breakMins: defaultBreak }));
  }, [defaultBreak]);

  // A deep link from My Jobs with ?job= opens the clock-in step directly.
  useEffect(() => {
    if (searchParams.get('job') && !isClockedIn) setView('clock-in');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const days = useMemo(() => (timesheets || []) as Day[], [timesheets]);

  const { weekHours, weekDays, pendingCount, weekStart } = useMemo(() => {
    const wkStart = startOfWeekMonday(new Date());
    // A day the office sent back isn't hours yet.
    const completed = days.filter((t) => t.clock_out && t.status !== 'Rejected');
    let wkHours = 0;
    const wkDates = new Set<string>();
    for (const t of completed) {
      if (parseISO(t.date) >= wkStart) {
        wkHours += t.total_hours || 0;
        wkDates.add(t.date);
      }
    }
    return {
      weekHours: wkHours,
      weekDays: wkDates.size,
      pendingCount: completed.filter((t) => t.status?.toLowerCase() === 'pending').length,
      weekStart: wkStart,
    };
  }, [days]);

  const rejected = useMemo(() => days.filter((t) => t.status === 'Rejected'), [days]);

  // ELE-1825: "Your hours for 1–30 Sep were sent to payroll on Wed 1 Oct", so
  // "did my hours go in?" answers itself.
  const { data: payrollLog = [] } = useMyPayrollExports(employeeId);
  const lastPayroll = payrollLog[0];

  const weekBreakdown = useMemo(() => {
    // A day the office sent back isn't hours yet.
    const completed = days.filter((t) => t.clock_out && t.status !== 'Rejected');
    const list = WEEKDAY_LABELS.map((label, i) => {
      const dayDate = new Date(weekStart);
      dayDate.setDate(weekStart.getDate() + i);
      const key = localDateKey(dayDate);
      const hours = completed.filter((t) => t.date === key).reduce((s, t) => s + (t.total_hours || 0), 0);
      return { label, date: key, hours, isToday: isToday(dayDate), isFuture: dayDate > new Date() };
    });
    return { days: list, maxHours: Math.max(1, ...list.map((d) => d.hours)) };
  }, [days, weekStart]);

  const recent = useMemo(() => {
    const completed = days.filter((t) => t.clock_out && t.status !== 'Rejected');
    if (historyFilter === 'week') return completed.filter((t) => parseISO(t.date) >= weekStart);
    return completed.slice(0, 40);
  }, [days, historyFilter, weekStart]);

  const jobTitleById = useMemo(() => {
    const map = new Map<string, string>();
    allJobs.forEach((j) => map.set(j.id, j.title));
    return map;
  }, [allJobs]);

  const backToOverview = () => {
    setView('overview');
    setLocating(false);
  };

  const openClockOut = () => {
    // Firm default, but never more than the time actually on the clock.
    const elapsed = clockState
      ? Math.floor((Date.now() - new Date(clockState.clockInTime).getTime()) / 60000)
      : 0;
    setBreakMinutes(trackedBreak > 0 ? trackedBreak : Math.min(defaultBreak, Math.max(0, elapsed)));
    setView('clock-out');
  };

  const handleClockIn = async () => {
    const jobId = selectedJobId || (jobs.length === 1 ? jobs[0].id : '');
    const job = jobs.find((j) => j.id === jobId);
    if (!job || !employeeId) {
      toast.error('Pick the job you’re on');
      return;
    }
    setLocating(true);
    const fix = await captureClockFix();
    setLocating(false);
    const ok = await clockIn(employeeId, employeeName, job.id, job.title, fix, { offline: true });
    if (ok) {
      if (fix.status !== 'captured') {
        toast.info('Clocked in without a location. That’s fine, the office will see “no location”.');
      }
      backToOverview();
    }
  };

  const handleClockOut = async () => {
    setIsSubmitting(true);
    setLocating(true);
    const fix = await captureClockFix();
    setLocating(false);
    const success = await clockOut(breakMinutes, fix, { offline: true });
    setIsSubmitting(false);
    if (success) backToOverview();
  };

  const manualSpan = spanFrom(manualData.date, manualData.startTime, manualData.endTime);
  const manualHours =
    manualSpan && manualData.breakMins < manualSpan.minutes
      ? (manualSpan.minutes - manualData.breakMins) / 60
      : null;

  const handleManualSubmit = async () => {
    const jobId = selectedJobId || (jobs.length === 1 ? jobs[0].id : '');
    if (!jobId || !employeeId) return toast.error('Pick the job');
    if (!manualSpan || manualHours == null) return toast.error('Check the times and break');
    setIsSubmitting(true);
    try {
      // ELE-1828: through the outbox, so a past day can be added with no signal.
      const { result } = await submitWorkerAction({
        kind: 'timesheet',
        label: `Past day · ${format(manualSpan.start, 'EEE d MMM')} · ${manualHours.toFixed(1)} h`,
        detail: jobs.find((j) => j.id === jobId)?.title ?? null,
        jobId,
        payload: {
          row: {
            employee_id: employeeId,
            job_id: jobId,
            date: manualData.date,
            clock_in: manualSpan.start.toISOString(),
            clock_out: manualSpan.end.toISOString(),
            break_minutes: manualData.breakMins,
            total_hours: parseFloat(manualHours.toFixed(2)),
            status: 'Pending',
            notes: manualData.notes || null,
          },
        },
      });
      if (result === 'sent') toast.success(`${manualHours.toFixed(1)} hours sent for approval`);
      else queuedToast(`${manualHours.toFixed(1)} hours saved`);
      setManualData({
        date: localDateKey(new Date()),
        startTime: '08:00',
        endTime: '16:30',
        breakMins: defaultBreak,
        notes: '',
      });
      backToOverview();
    } catch (e) {
      toast.error(
        e instanceof OutboxRefusedError ? e.message : 'Couldn’t send that day. Try again'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const noJobs = !jobsLoading && jobs.length === 0;
  const jobIdForPicker = selectedJobId || (jobs.length === 1 ? jobs[0].id : '');
  // ELE-1826: the firm's required pre-start checks for this job, worked out on
  // the phone (cached checklist + answers waiting in the outbox), so the clock
  // stays shut offline too. The database refuses the clock-in as well.
  const prestartOutstanding = usePrestartOutstanding(jobIdForPicker);
  const prestartBlocked = prestartOutstanding.length > 0;

  if (!employee) {
    return (
      <WorkerToolPage eyebrow="Time" title="Timesheets">
        <LoadingState className="py-16" />
      </WorkerToolPage>
    );
  }

  // Live "Before you start" for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] = noJobs
    ? [
        {
          text: 'You’re not on any jobs right now, so there’s nothing to clock in to. The office puts you on jobs.',
          fixLabel: 'Open My jobs',
          onFix: () => navigate('/electrician/worker-tools/jobs'),
        },
      ]
    : [];

  const subTitle =
    view === 'clock-in' ? 'Clock in' : view === 'clock-out' ? 'Clock out' : view === 'manual' ? 'Add a past day' : null;

  return (
    <WorkerToolPage
      eyebrow="Time"
      title={subTitle ?? 'Timesheets'}
      actions={
        // Stays mounted (hidden) off the overview so a "Show me" tour carries on
        // into Clock in / Add a past day.
        <PageHelpButton
          help={TIMESHEET_HELP}
          blockers={helpBlockers}
          askContext={{ page: 'worker-timesheets', tab: view }}
          className={view === 'overview' ? undefined : 'hidden'}
        />
      }
    >
      <div className={view === 'overview' ? undefined : 'hidden'}>
        <HowItWorks help={TIMESHEET_HELP} blockers={helpBlockers} />
      </div>
      {view !== 'overview' && (
        <button
          type="button"
          onClick={backToOverview}
          className="-ml-1 -mt-4 flex h-11 items-center gap-1.5 px-1 text-[14px] font-semibold text-white touch-manipulation"
        >
          <ArrowLeft className="h-5 w-5" />
          Timesheets
        </button>
      )}

      {/* ── Overview ─────────────────────────────────────────────────── */}
      {view === 'overview' && (
        <div className="space-y-7">
          <Verdict
            headline={
              isClockedIn
                ? 'You’re on the clock'
                : rejected.length > 0
                  ? `${rejected.length} ${rejected.length === 1 ? 'day' : 'days'} sent back to fix`
                  : `${formatHours(weekHours)} hours this week`
            }
            detail={
              isClockedIn
                ? 'Clock out when you leave site. Breaks are deducted when you do.'
                : rejected.length > 0
                  ? 'The office has said why. Fix the times and send it back.'
                  : pendingCount > 0
                    ? `${pendingCount} ${pendingCount === 1 ? 'day' : 'days'} waiting for the office to approve.`
                    : weekDays > 0
                      ? 'Everything you’ve logged is approved.'
                      : 'Clock in when you get to site, or add a day you missed.'
            }
          />

          {/* Sent back by the office */}
          {rejected.length > 0 && (
            <div data-help="wt-timesheets.sent-back">
            <WorkerPanel className="overflow-hidden">
              <GroupLabel>Sent back by the office</GroupLabel>
              <ul className="divide-y divide-white/[0.07]">
                {rejected.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-[13px] font-bold text-white">
                      {formatHours(t.total_hours || 0)}h
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-white">
                        {relativeDay(t.date)}
                        {t.job_id && jobTitleById.get(t.job_id) ? ` · ${jobTitleById.get(t.job_id)}` : ''}
                      </p>
                      <p className="mt-0.5 text-[13px] text-red-300 line-clamp-2">
                        {t.rejection_reason ? `“${t.rejection_reason}”` : 'No reason given. Ask the office'}
                      </p>
                    </div>
                    <RowAction onClick={() => setFixing(t)}>Fix</RowAction>
                  </li>
                ))}
              </ul>
            </WorkerPanel>
            </div>
          )}

          {/* Live clock */}
          {isClockedIn && clockState && (
            <WorkerPanel className="p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <PulseDot tone="green" />
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-emerald-400">
                  Clocked in
                </p>
              </div>
              <p className="mt-3 font-mono text-[44px] font-semibold leading-none tracking-tight tabular-nums text-white">
                {duration}
              </p>
              <p className="mt-2 text-[14px] text-white">
                {clockState.jobTitle} · since {format(new Date(clockState.clockInTime), 'HH:mm')}
              </p>
              {fixLine(clockState.clockInFix?.status, clockState.clockInFix?.accuracy) && (
                <p className="mt-1 flex items-center gap-1.5 text-[12.5px] text-white">
                  {clockState.clockInFix?.status === 'captured' ? (
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <MapPinOff className="h-3.5 w-3.5" />
                  )}
                  {fixLine(clockState.clockInFix?.status, clockState.clockInFix?.accuracy)}
                </p>
              )}
              {trackedBreak > 0 && (
                <p className="mt-1 flex items-center gap-1.5 text-[12.5px] text-white">
                  <Coffee className="h-3.5 w-3.5" />
                  {trackedBreak} min break so far
                </p>
              )}
            </WorkerPanel>
          )}

          {/* Primary actions */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {!isClockedIn ? (
              <button
                type="button"
                data-help="wt-timesheets.clock-in"
                onClick={() => setView('clock-in')}
                disabled={noJobs}
                className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-elec-yellow text-[16px] font-bold text-black touch-manipulation active:scale-[0.99] disabled:opacity-40"
              >
                <Play className="h-5 w-5" />
                Clock in
              </button>
            ) : (
              <button
                type="button"
                data-help="wt-timesheets.clock-out"
                onClick={openClockOut}
                className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-red-500 text-[16px] font-bold text-white touch-manipulation active:scale-[0.99]"
              >
                <Square className="h-5 w-5" />
                Clock out
              </button>
            )}
            <button
              type="button"
              data-help="wt-timesheets.add-day"
              onClick={() => setView('manual')}
              disabled={noJobs}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/[0.18] bg-white/[0.06] text-[15px] font-semibold text-white touch-manipulation active:scale-[0.99] disabled:opacity-40"
            >
              <PenLine className="h-5 w-5" />
              Add a past day
            </button>
          </div>

          {/* ELE-1828: clock times and days still on the phone */}
          <OutboxWaitingList kinds={['clock_in', 'clock_out', 'timesheet']} />

          {noJobs && (
            <WorkerPanel className="px-4 py-4 sm:px-5">
              <p className="text-[14px] text-white">
                You’re not on any jobs right now, so there’s nothing to clock in to.
              </p>
            </WorkerPanel>
          )}

          <SplitLayout
            ratio="1-1"
            primary={
              <div>
                <SectionTitle
                  title="This week"
                  right={
                    <span className="text-[13px] font-semibold tabular-nums text-white">
                      Today {formatHours(todaysHours)}h · Week {formatHours(weekHours)}h
                    </span>
                  }
                />
                <WorkerPanel className="p-4 sm:p-5">
                  {isLoadingTimesheets ? (
                    <LoadingState className="py-8" />
                  ) : (
                    <div className="flex items-end justify-between gap-2">
                      {weekBreakdown.days.map((d) => {
                        const pct = d.hours > 0 ? (d.hours / weekBreakdown.maxHours) * 100 : 0;
                        return (
                          <div key={d.date} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                            <span className="h-4 text-[11px] font-semibold tabular-nums text-white">
                              {d.hours > 0 ? formatHours(d.hours) : ''}
                            </span>
                            <div className="flex h-20 w-full max-w-[34px] items-end overflow-hidden rounded-lg bg-white/[0.06]">
                              <div
                                className={cn('w-full rounded-lg', d.isToday ? 'bg-elec-yellow' : 'bg-emerald-500')}
                                style={{ height: `${pct}%` }}
                              />
                            </div>
                            <span
                              className={cn(
                                'text-[11.5px] font-semibold',
                                d.isToday ? 'text-elec-yellow' : 'text-white'
                              )}
                            >
                              {d.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </WorkerPanel>
              </div>
            }
            secondary={
              <div data-help="wt-timesheets.logged">
                <SectionTitle
                  title="Logged days"
                  right={
                    <div className="w-[200px]">
                      <Segmented<HistoryFilter>
                        value={historyFilter}
                        onChange={setHistoryFilter}
                        options={[
                          { value: 'week', label: 'This week' },
                          { value: 'all', label: 'All' },
                        ]}
                      />
                    </div>
                  }
                />
                {lastPayroll && (
                  <p className="mb-3 text-[13.5px] leading-snug text-white">
                    Your hours for{' '}
                    <span className="font-semibold">
                      {formatPeriodRange(parseISO(lastPayroll.period_start), parseISO(lastPayroll.period_end))}
                    </span>{' '}
                    were sent to payroll on{' '}
                    <span className="font-semibold">{format(parseISO(lastPayroll.exported_at), 'EEE d MMM')}</span>.
                  </p>
                )}
                {isLoadingTimesheets ? (
                  <LoadingState className="py-10" />
                ) : recent.length === 0 ? (
                  <WorkerPanel className="px-4 py-4 sm:px-5">
                    <p className="text-[13.5px] text-white">
                      {historyFilter === 'week' ? 'Nothing logged this week yet.' : 'No timesheets yet.'}
                    </p>
                  </WorkerPanel>
                ) : (
                  <WorkerPanel className="divide-y divide-white/[0.07]">
                    {recent.map((t) => {
                      const title = t.job_id ? jobTitleById.get(t.job_id) : undefined;
                      const pending = t.status?.toLowerCase() === 'pending';
                      return (
                        <div key={t.id} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                          <div className="min-w-0 flex-1">
                            <p className="flex flex-wrap items-center gap-2">
                              <span className="text-[15px] font-semibold text-white">{relativeDay(t.date)}</span>
                              <span className="text-[15px] font-semibold tabular-nums text-white">
                                {formatHours(t.total_hours || 0)}h
                              </span>
                              {t.status === 'Approved' && t.payroll_export_id ? (
                                <SolidBadge tone="green">Sent to payroll</SolidBadge>
                              ) : t.status === 'Approved' ? (
                                <SolidBadge tone="green">Approved</SolidBadge>
                              ) : (
                                <SolidBadge tone="neutral">{t.resubmitted_at ? 'Resubmitted' : 'Waiting'}</SolidBadge>
                              )}
                            </p>
                            <p className="mt-0.5 text-[12.5px] text-white line-clamp-1">
                              {[
                                title,
                                t.clock_in && t.clock_out
                                  ? `${format(new Date(t.clock_in), 'HH:mm')}–${format(new Date(t.clock_out), 'HH:mm')}`
                                  : null,
                                t.break_minutes ? `${t.break_minutes}m break` : null,
                              ]
                                .filter(Boolean)
                                .join(' · ')}
                            </p>
                          </div>
                          {pending && (
                            <RowAction quiet onClick={() => setFixing(t)}>
                              Change
                            </RowAction>
                          )}
                        </div>
                      );
                    })}
                  </WorkerPanel>
                )}
              </div>
            }
          />
        </div>
      )}

      {/* ── Clock in ─────────────────────────────────────────────────── */}
      {view === 'clock-in' && (
        <div className="mx-auto w-full max-w-xl space-y-5">
          <Verdict headline={`Starts now · ${format(new Date(), 'HH:mm')}`} />
          <div>
            <SectionTitle title="Which job?" />
            {noJobs ? (
              <WorkerPanel className="px-4 py-4 sm:px-5">
                <p className="text-[14px] text-white">You’re not on any jobs right now.</p>
              </WorkerPanel>
            ) : (
              <div data-help="wt-timesheets.job">
                <JobChoice jobs={jobs} value={jobIdForPicker} onChange={setSelectedJobId} loading={jobsLoading} />
              </div>
            )}
          </div>
          <WorkerPanel className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-elec-yellow" />
            <p className="text-[13.5px] leading-relaxed text-white">
              We record where your phone is <span className="font-semibold">once</span> when you clock in and once
              when you clock out, so your employer can see you were on site. Not while you work. If location is off
              you can still clock in. The day just shows “no location”.
            </p>
          </WorkerPanel>
          {jobIdForPicker && (
            <PrestartGateNotice jobId={jobIdForPicker} outstanding={prestartOutstanding} />
          )}
          <PrimaryButton
            data-help="wt-timesheets.start"
            onClick={handleClockIn}
            disabled={!jobIdForPicker || locating || prestartBlocked}
            fullWidth
            size="lg"
            className="h-14 rounded-2xl text-[16px]"
          >
            {locating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Getting your location…
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                Start the clock
              </>
            )}
          </PrimaryButton>
        </div>
      )}

      {/* ── Clock out ────────────────────────────────────────────────── */}
      {view === 'clock-out' && clockState && (
        <div className="mx-auto w-full max-w-xl space-y-5">
          <WorkerPanel className="p-4 text-center sm:p-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">Time on site</p>
            <p className="mt-2 font-mono text-[44px] font-semibold leading-none tabular-nums text-white">{duration}</p>
            <p className="mt-2 text-[14px] text-white">
              {clockState.jobTitle} · started {format(new Date(clockState.clockInTime), 'HH:mm')}
            </p>
          </WorkerPanel>

          <Field label={`Break in minutes (your firm’s usual is ${defaultBreak})`}>
            <div className="grid grid-cols-5 gap-2" data-help="wt-timesheets.break">
              {Array.from(new Set([0, 15, 30, 45, 60, defaultBreak]))
                .sort((a, b) => a - b)
                .slice(0, 5)
                .map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setBreakMinutes(mins)}
                    aria-pressed={breakMinutes === mins}
                    className={cn(
                      'h-12 rounded-xl border text-[15px] font-semibold tabular-nums touch-manipulation',
                      breakMinutes === mins
                        ? 'border-elec-yellow bg-elec-yellow text-black'
                        : 'border-white/[0.14] bg-white/[0.05] text-white'
                    )}
                  >
                    {mins}
                  </button>
                ))}
            </div>
            <input
              type="number"
              min={0}
              max={480}
              inputMode="numeric"
              value={breakMinutes}
              onChange={(e) => setBreakMinutes(Math.max(0, parseInt(e.target.value) || 0))}
              className={cn(inputClass, 'mt-2')}
              aria-label="Break minutes"
            />
            {trackedBreak > 0 && (
              <p className="text-[12.5px] text-white">You logged {trackedBreak} min of breaks on the clock.</p>
            )}
          </Field>

          <PrimaryButton
            data-help="wt-timesheets.finish"
            onClick={handleClockOut}
            disabled={isSubmitting || isClockingOut}
            fullWidth
            size="lg"
            className="h-14 rounded-2xl bg-red-500 text-[16px] text-white hover:bg-red-500/90"
          >
            {locating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Getting your location…
              </>
            ) : isSubmitting || isClockingOut ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Square className="mr-2 h-5 w-5" />
                Clock out
              </>
            )}
          </PrimaryButton>
        </div>
      )}

      {/* ── Manual entry ─────────────────────────────────────────────── */}
      {view === 'manual' && (
        <div className="mx-auto w-full max-w-xl space-y-5">
          <div>
            <SectionTitle title="Which job?" />
            <JobChoice jobs={jobs} value={jobIdForPicker} onChange={setSelectedJobId} loading={jobsLoading} />
          </div>
          <div data-help="wt-timesheets.day-fields">
          <DayFields
            date={manualData.date}
            start={manualData.startTime}
            end={manualData.endTime}
            breakMins={manualData.breakMins}
            notes={manualData.notes}
            defaultBreak={defaultBreak}
            onChange={(patch) =>
              setManualData((m) => ({
                ...m,
                ...(patch.date !== undefined && { date: patch.date }),
                ...(patch.start !== undefined && { startTime: patch.start }),
                ...(patch.end !== undefined && { endTime: patch.end }),
                ...(patch.breakMins !== undefined && { breakMins: patch.breakMins }),
                ...(patch.notes !== undefined && { notes: patch.notes }),
              }))
            }
            hours={manualHours}
            overnight={!!manualSpan?.overnight}
          />
          </div>
          <PrimaryButton
            data-help="wt-timesheets.send-day"
            onClick={handleManualSubmit}
            disabled={!jobIdForPicker || isSubmitting || manualHours == null}
            fullWidth
            size="lg"
            className="h-14 rounded-2xl text-[16px]"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : manualHours != null ? (
              `Send ${manualHours.toFixed(1)} hours for approval`
            ) : (
              'Check the times'
            )}
          </PrimaryButton>
        </div>
      )}

      <FixDaySheet
        day={fixing}
        onClose={() => setFixing(null)}
        jobs={allJobs.filter((j) => !j.closed || j.id === fixing?.job_id)}
        jobTitle={fixing?.job_id ? jobTitleById.get(fixing.job_id) : undefined}
      />
    </WorkerToolPage>
  );
}

/* ── Shared day fields (manual entry + fix) ───────────────────────────── */

function DayFields({
  date,
  start,
  end,
  breakMins,
  notes,
  defaultBreak,
  onChange,
  hours,
  overnight,
}: {
  date: string;
  start: string;
  end: string;
  breakMins: number;
  notes: string;
  defaultBreak: number;
  onChange: (patch: Partial<{ date: string; start: string; end: string; breakMins: number; notes: string }>) => void;
  hours: number | null;
  overnight: boolean;
}) {
  return (
    <div className="space-y-4">
      <Field label="Date">
        <input
          type="date"
          value={date}
          max={localDateKey(new Date())}
          onChange={(e) => onChange({ date: e.target.value })}
          className={inputClass}
        />
      </Field>
      <div className="grid grid-cols-2 gap-x-3">
        <Field label="Start">
          <input type="time" value={start} onChange={(e) => onChange({ start: e.target.value })} className={inputClass} />
        </Field>
        <Field label="Finish">
          <input type="time" value={end} onChange={(e) => onChange({ end: e.target.value })} className={inputClass} />
        </Field>
      </div>
      <Field label={`Break in minutes (your firm’s usual is ${defaultBreak})`}>
        <input
          type="number"
          min={0}
          max={480}
          inputMode="numeric"
          value={breakMins}
          onChange={(e) => onChange({ breakMins: Math.max(0, parseInt(e.target.value) || 0) })}
          className={inputClass}
        />
      </Field>
      <Field label="Note for the office (optional)">
        <textarea
          value={notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="What you worked on, or what you changed"
          className={cn(textareaClass, 'min-h-[80px]')}
          maxLength={2000}
        />
      </Field>
      <WorkerPanel className="mx-0 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 sm:px-5">
        <span className="text-[13.5px] text-white">
          {hours == null
            ? 'Check the times. The break must be shorter than the day'
            : overnight
              ? 'Paid hours (finishes the next morning)'
              : 'Paid hours'}
        </span>
        {hours != null && (
          <span className="text-[22px] font-semibold tabular-nums text-elec-yellow">{hours.toFixed(1)}h</span>
        )}
      </WorkerPanel>
    </div>
  );
}

/* ── Fix a pending or sent-back day ───────────────────────────────────── */

function FixDaySheet({
  day,
  onClose,
  jobs,
  jobTitle,
}: {
  day: Day | null;
  onClose: () => void;
  jobs: { id: string; title: string; client_name?: string | null; address?: string | null }[];
  jobTitle?: string;
}) {
  return (
    <Sheet open={!!day} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-0">
        <SheetTitle className="sr-only">Fix this day</SheetTitle>
        <SheetDescription className="sr-only">Change the times and send it back</SheetDescription>
        {day && <FixDayBody key={day.id} day={day} onClose={onClose} jobs={jobs} jobTitle={jobTitle} />}
      </SheetContent>
    </Sheet>
  );
}

function FixDayBody({
  day,
  onClose,
  jobs,
  jobTitle,
}: {
  day: Day;
  onClose: () => void;
  jobs: { id: string; title: string; client_name?: string | null; address?: string | null }[];
  jobTitle?: string;
}) {
  const fix = useFixMyTimesheet();
  const del = useDeleteMyTimesheet();
  const { data: settings } = useMyTimeSettings();
  const rejected = day.status === 'Rejected';
  const ci = day.clock_in ? new Date(day.clock_in) : null;
  const co = day.clock_out ? new Date(day.clock_out) : null;
  const [jobId, setJobId] = useState(day.job_id ?? '');
  const [form, setForm] = useState({
    date: ci ? localDateKey(ci) : day.date,
    start: ci ? format(ci, 'HH:mm') : '08:00',
    end: co ? format(co, 'HH:mm') : '16:30',
    breakMins: day.break_minutes ?? 0,
    notes: day.notes ?? '',
  });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const span = spanFrom(form.date, form.start, form.end);
  const hours = span && form.breakMins < span.minutes ? (span.minutes - form.breakMins) / 60 : null;

  const save = () => {
    if (!span || hours == null) return toast.error('Check the times and break');
    fix.mutate(
      {
        id: day.id,
        jobId: jobId || null,
        clockIn: span.start.toISOString(),
        clockOut: span.end.toISOString(),
        breakMinutes: form.breakMins,
        notes: form.notes.trim() || null,
      },
      {
        onSuccess: (r) => {
          toast.success(r?.resubmitted ? 'Sent back to the office' : 'Day updated');
          onClose();
        },
        onError: (e) => toast.error(rpcErrorMessage(e, 'Couldn’t save that. Try again')),
      }
    );
  };

  const remove = () => {
    if (!confirmDelete) return setConfirmDelete(true);
    del.mutate(day.id, {
      onSuccess: () => {
        toast.success('Day deleted');
        onClose();
      },
      onError: (e) => toast.error(rpcErrorMessage(e, 'Couldn’t delete it')),
    });
  };

  const fixInfo = fixLine(day.clock_in_location_status, day.clock_in_accuracy_m);

  return (
    <SheetShell
      eyebrow="Timesheet"
      title={rejected ? 'Fix and resubmit' : 'Change this day'}
      description={[relativeDay(day.date), jobTitle].filter(Boolean).join(' · ')}
      footer={
        <>
          {!rejected && (
            <SecondaryButton
              size="lg"
              onClick={remove}
              disabled={del.isPending}
              className={cn('px-5', confirmDelete && 'border-red-500 bg-red-500 text-white')}
            >
              {del.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : confirmDelete ? 'Tap to delete' : 'Delete'}
            </SecondaryButton>
          )}
          <PrimaryButton
            data-help="wt-timesheets.fix-save"
            size="lg"
            fullWidth
            onClick={save}
            disabled={fix.isPending || hours == null}
          >
            {fix.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : rejected ? (
              `Resubmit ${hours != null ? `${hours.toFixed(1)}h` : ''}`
            ) : (
              'Save'
            )}
          </PrimaryButton>
        </>
      }
    >
      {rejected && (
        <WorkerPanel className="mx-0 rounded-xl border px-4 py-3.5 sm:px-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-red-300">Why it came back</p>
          <p className="mt-1 text-[15px] text-white">
            {day.rejection_reason || 'The office didn’t give a reason. Check with them.'}
          </p>
        </WorkerPanel>
      )}
      {jobs.length > 0 && (
        <div>
          <SectionTitle title="Job" />
          <JobChoice jobs={jobs} value={jobId} onChange={setJobId} />
        </div>
      )}
      <DayFields
        date={form.date}
        start={form.start}
        end={form.end}
        breakMins={form.breakMins}
        notes={form.notes}
        defaultBreak={settings?.defaultBreakMinutes ?? 30}
        onChange={(p) =>
          setForm((f) => ({
            ...f,
            ...(p.date !== undefined && { date: p.date }),
            ...(p.start !== undefined && { start: p.start }),
            ...(p.end !== undefined && { end: p.end }),
            ...(p.breakMins !== undefined && { breakMins: p.breakMins }),
            ...(p.notes !== undefined && { notes: p.notes }),
          }))
        }
        hours={hours}
        overnight={!!span?.overnight}
      />
      {fixInfo && <p className="text-[12.5px] text-white">At clock-in: {fixInfo.toLowerCase()}. That stays with the day.</p>}
    </SheetShell>
  );
}
