import { useState, useMemo, useCallback, useEffect } from 'react';
import { confirmRtw } from '@/components/employer/people/RtwGuard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  readFix,
  describeFix,
  isFarFromSite,
  type ClockFix,
} from '@/components/employer/timesheets/clockLocation';
import { TimesheetRulesSheet } from '@/components/employer/timesheets/TimesheetRulesSheet';
import {
  PageHelpButton,
  HowItWorks,
  type PageHelpContent,
  type HelpBlocker,
} from '@/components/hub/PageHelp';
import { PayPeriodSheet } from '@/components/employer/timesheets/PayPeriodSheet';
import { useFirmPaySettings, useOfficeFirmId } from '@/hooks/useFirmPaySettings';
import { useJobContext } from '@/hooks/useJobContext';
import { JobContextBar } from '@/components/employer/JobContextBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTeamLeaveRequests } from '@/hooks/useTeamLeave';
import {
  splitDailyOvertime,
  labourCost,
  DEFAULT_OVERTIME_TERMS,
  type OvertimeTerms,
} from '@/utils/payCalculations';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FormSheet from '@/components/forms/FormSheet';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import {
  HeroActions,
  Initials,
  KeyValue,
  PlainEmpty,
  Row,
  Tag,
  heroBtn,
  frameClass,
  rowBtnPrimary,
  rowBtnSecondary,
  rowsClass,
  twoColClass,
  colClass,
  filterStack,
  type TagTone,
} from '@/components/employer/pageParts/PageParts';
import { toast } from 'sonner';
import { ManualTimeEntryDialog } from '@/components/employer/dialogs/ManualTimeEntryDialog';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { useYoungWorkers } from '@/hooks/usePayLaw';
import { youngWorkerFlags } from '@/lib/payLaw';
import {
  format,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  isWithinInterval,
  parseISO,
  eachDayOfInterval,
  isToday,
  getDay,
} from 'date-fns';
import {
  Banknote,
  Plus,
  ChevronLeft,
  ChevronRight,
  Play,
  Square,
  RefreshCw,
  Coffee,
  X,
  Check,
  Loader2,
  AlertTriangle,
  LayoutGrid,
  List,
  MapPin,
  Settings2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useTimesheets,
  useApproveTimesheet,
  useRejectTimesheet,
  useBatchApproveTimesheets,
  useBatchRejectTimesheets,
  type Timesheet,
  type TimesheetClockExtras,
} from '@/hooks/useTimesheets';
import { useEmployees } from '@/hooks/useEmployees';
import { useActiveJobs } from '@/hooks/useJobs';
import { useClockState } from '@/hooks/useClockState';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  PulseDot,
  LoadingBlocks,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  selectTriggerClass,
  selectContentClass,
  checkboxClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

interface DisplayTimesheet {
  id: string;
  employeeId: string;
  employeeName: string;
  jobId: string;
  jobTitle: string;
  date: string;
  clockIn: string;
  clockOut: string;
  breakMins: number;
  totalHours: number;
  status: string;
  notes?: string;
  /** Open clock-in (no clock_out yet) — on the clock right now, not approvable. */
  isLive: boolean;
  /** Where the phone was at clock-in / clock-out (ELE-2000). */
  clockInFix: ClockFix;
  clockOutFix: ClockFix;
  /** The job's pin, when it has one — for distance from site. */
  site: { lat: number | null; lng: number | null } | null;
  resubmittedAt: string | null;
  previousRejectionReason: string | null;
}

const formatTimeFromISO = (isoString: string | null): string => {
  if (!isoString) return '--:--';
  try {
    return format(parseISO(isoString), 'HH:mm');
  } catch {
    return '--:--';
  }
};

const tagForStatus = (status: string): TagTone => {
  if (status === 'Approved') return 'done';
  if (status === 'Pending') return 'yellow';
  if (status === 'Rejected') return 'red';
  return 'neutral';
};

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const VALID_TABS = ['week', 'pending', 'approved'];

const TIMESHEETS_HELP: PageHelpContent = {
  id: 'employer-timesheets',
  title: 'Timesheets',
  what: (
    <>
      Every hour your team logs lands here. You approve it or send it back, then take the approved
      hours to the pay run in Accounting.
    </>
  ),
  steps: [
    {
      title: 'The team logs time',
      body: 'Workers clock in and out on their phone, or add a past day. You can add an entry for someone too.',
    },
    {
      title: 'Approve or send back',
      body: 'Check the day, the job and the break. Send it back with a reason and the worker can fix it and resubmit.',
    },
    {
      title: 'Send it to payroll',
      body: 'Pay run opens the one payroll file in Accounting: approved hours, overtime, holiday, sick pay and expenses for the pay period, with the minimum wage checked.',
    },
  ],
  notes: [
    {
      title: 'Timesheet rules',
      body: 'The owner sets the default break and working day under the rules button. They pre-fill clock-outs and manual entries.',
    },
    {
      title: 'Who sees pay',
      body: 'Office managers see hours only and send an hours-only file. Pay rates and the payroll file with pay are for the owner and admins.',
    },
  ],
  tasks: [
    {
      title: 'Approve the clean entries in one go',
      steps: [
        'Open the Week or Pending tab.',
        'In the Payroll check card, tap Approve all … clean.',
        'Anything flagged (a long day, no job, no break on a long shift, a weekend, no pay rate) stays waiting for you to check one by one.',
      ],
      after: 'On the Pending tab this works across every week, not just the one on screen.',
      who: 'Owner, admins and office managers.',
      tour: [
        {
          target: 'timesheets.tabs',
          caption: 'Pick Week or Pending. Pending shows everything waiting, every week.',
        },
        {
          target: 'timesheets.approve-clean',
          caption: 'Tap Approve all clean. Flagged entries stay for you to check.',
        },
      ],
    },
    {
      title: 'Check and approve one entry',
      steps: [
        'Open the Pending tab.',
        'Tap the entry. The sheet shows the day, start and finish, break and job.',
        'Tap Approve.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [
        {
          target: 'timesheets.tabs',
          text: 'Pending',
          caption: 'Open the Pending tab.',
          opens: true,
        },
        { target: 'timesheets.list', caption: 'Tap an entry to open it.', opens: true },
        {
          target: 'timesheets.approve',
          caption: 'Check the times, break and job, then tap Approve.',
        },
      ],
    },
    {
      title: 'Send a day back to be fixed',
      steps: [
        'Tap the entry to open it.',
        'Tap Reject. A box opens for the reason.',
        'Type what needs fixing (at least 3 letters), then tap Send back.',
      ],
      after:
        'The worker sees your reason on their Timesheets page, fixes the day and sends it again. It comes back marked Resubmitted.',
      who: 'Owner, admins and office managers.',
      tour: [
        {
          target: 'timesheets.tabs',
          text: 'Pending',
          caption: 'Open the Pending tab.',
          opens: true,
        },
        { target: 'timesheets.list', caption: 'Tap the entry that needs fixing.', opens: true },
        { target: 'timesheets.reject', caption: 'Tap Reject, type why, then tap Send back.' },
      ],
    },
    {
      title: 'Approve or send back several at once',
      steps: [
        'Tap Select.',
        'Tap each waiting entry, or Select all waiting.',
        'Tap Approve, or Reject then type one reason and tap Send back. Everyone selected sees that reason.',
        'Tap Done to leave select mode.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'timesheets.select', caption: 'Tap Select, then tap the entries you want.' },
      ],
    },
    {
      title: 'Send the hours to payroll',
      steps: [
        'Approve the period first. Only approved hours go.',
        'Tap Pay run. It opens Send to payroll in Accounting.',
        'Pick the pay period and your payroll software, then tap Check and send.',
      ],
      after:
        'There is one payroll file. It checks the minimum wage, adds holiday and sick pay, writes the holiday record and marks every entry as sent, so nothing goes twice. Each person sees sent to payroll on My pay.',
      who: 'Owner and admins get the file with pay. Office managers get hours only.',
      tour: [{ target: 'timesheets.export', caption: 'Tap Pay run.' }],
    },
    {
      title: 'Add hours for someone',
      steps: [
        'Tap Add entry.',
        'Pick the worker, the day and the job, then the times and break.',
        'Save it. It lands as waiting, ready to approve.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [{ target: 'timesheets.add', caption: 'Tap Add entry to log a day for someone.' }],
    },
  ],
};

export const TimesheetsSection = () => {
  const navigate = useNavigate();
  // Office managers approve hours but never see pay (can_see_firm_money).
  // Defaults to hidden until the server answers.
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = roleInfo?.canSeeMoney ?? false;
  const {
    data: rawTimesheets = [],
    isLoading: timesheetsLoading,
    refetch: refetchTimesheets,
  } = useTimesheets();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();
  const { data: jobs = [], isLoading: jobsLoading } = useActiveJobs();
  const isFirmAdmin = roleInfo?.role === 'owner' || roleInfo?.role === 'admin';
  const [rulesOpen, setRulesOpen] = useState(false);
  // ELE-2009: pay period + payday (owner/admin) and the export log workers read.
  const [payPeriodOpen, setPayPeriodOpen] = useState(false);
  const { data: officeFirmId } = useOfficeFirmId();
  const { data: firmPaySettings } = useFirmPaySettings(officeFirmId);

  const {
    isClockedIn,
    clockState,
    duration,
    clockIn,
    clockOut,
    isClockingOut,
    isOnBreak,
    breakMinutes,
    startBreak,
    endBreak,
  } = useClockState();

  const approveTimesheetMutation = useApproveTimesheet();
  const rejectTimesheetMutation = useRejectTimesheet();
  const batchApproveMutation = useBatchApproveTimesheets();
  const batchRejectMutation = useBatchRejectTimesheets();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterEmployee, setFilterEmployee] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  // ?tab=pending | approved lets notifications and Overview rows land on the
  // right tab (ELE-1952), and the tab is written back so a refresh or a shared
  // link keeps it. Leave moved to its own section (ELE-1953): old
  // ?tab=leave links (notifications already sent) are forwarded there.
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(() =>
    tabParam && VALID_TABS.includes(tabParam) ? tabParam : 'week'
  );
  useEffect(() => {
    if (tabParam === 'leave') {
      navigate('/employer?section=leave', { replace: true });
      return;
    }
    if (tabParam && VALID_TABS.includes(tabParam)) setActiveTab(tabParam);
  }, [tabParam, navigate]);
  const changeTab = (value: string) => {
    if (value === 'leave') {
      navigate('/employer?section=leave');
      return;
    }
    setActiveTab(value);
    setSelectedTimesheetIds([]);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === 'week') next.delete('tab');
        else next.set('tab', value);
        return next;
      },
      { replace: true }
    );
  };
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [detailTimesheet, setDetailTimesheet] = useState<DisplayTimesheet | null>(null);

  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const [selectedTimesheetIds, setSelectedTimesheetIds] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  // Payroll people think in week-per-person grids — list is the tap-friendly
  // mobile default, grid is the desktop reconciliation view.
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // ELE-1960 — opened from a job sheet (?job=<id>): that job's hours only.
  const { jobId: contextJobId } = useJobContext();

  // Entries on finished / paused jobs: useActiveJobs only holds Active ones,
  // so look the rest up (title + pin) rather than show "Unknown Job" and no
  // distance from site.
  const missingJobIds = useMemo(() => {
    const active = new Set(jobs.map((j) => j.id));
    return [
      ...new Set(
        rawTimesheets.map((t) => t.job_id).filter((id): id is string => !!id && !active.has(id))
      ),
    ].sort();
  }, [rawTimesheets, jobs]);
  const { data: otherJobs = [] } = useQuery({
    queryKey: ['timesheet-other-jobs', missingJobIds],
    enabled: missingJobIds.length > 0,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_jobs')
        .select('id, title, lat, lng, quoted_hours')
        .in('id', missingJobIds.slice(0, 300));
      if (error) throw error;
      // Cast via unknown: quoted_hours postdates the last types.ts regeneration.
      return (data ?? []) as unknown as {
        id: string;
        title: string;
        lat: number | null;
        lng: number | null;
        quoted_hours: number | null;
      }[];
    },
  });

  const timesheets: DisplayTimesheet[] = useMemo(() => {
    return rawTimesheets
      .filter((ts) => !contextJobId || ts.job_id === contextJobId)
      .map((ts) => {
        const employee = employees.find((e) => e.id === ts.employee_id);
        const job =
          jobs.find((j) => j.id === ts.job_id) ?? otherJobs.find((j) => j.id === ts.job_id);
        const row = ts as unknown as Record<string, unknown>;
        const extras = ts as Timesheet & TimesheetClockExtras;

        return {
          id: ts.id,
          employeeId: ts.employee_id,
          employeeName: employee?.name || 'Unknown',
          jobId: ts.job_id || '',
          jobTitle: job?.title || 'Unknown Job',
          date: ts.date,
          clockIn: formatTimeFromISO(ts.clock_in),
          clockOut: formatTimeFromISO(ts.clock_out),
          breakMins: ts.break_minutes,
          totalHours: ts.total_hours || 0,
          status: ts.status,
          notes: ts.notes || undefined,
          isLive: !!ts.clock_in && !ts.clock_out,
          clockInFix: readFix(row, 'clock_in'),
          clockOutFix: readFix(row, 'clock_out'),
          site:
            job && job.lat != null && job.lng != null
              ? { lat: Number(job.lat), lng: Number(job.lng) }
              : null,
          resubmittedAt: extras.resubmitted_at ?? null,
          previousRejectionReason: extras.previous_rejection_reason?.trim() || null,
        };
      });
  }, [rawTimesheets, employees, jobs, otherJobs, contextJobId]);

  const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
  // ELE-2063: under-18s (8h a day, 40h a week, 30 min break after 4.5h).
  const { data: youngWorkers } = useYoungWorkers();
  const weekLabel = `${format(currentWeekStart, 'd MMM')} – ${format(currentWeekEnd, 'd MMM')}`;

  const goToPreviousWeek = () => setCurrentWeekStart((prev) => subWeeks(prev, 1));
  const goToNextWeek = () => setCurrentWeekStart((prev) => addWeeks(prev, 1));
  const goToThisWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
    setSelectedDay(null);
  };

  const weekTimesheets = useMemo(() => {
    return timesheets.filter((ts) => {
      const tsDate = parseISO(ts.date);
      return isWithinInterval(tsDate, { start: currentWeekStart, end: currentWeekEnd });
    });
  }, [timesheets, currentWeekStart, currentWeekEnd]);

  // Pending is "everything still waiting", not "waiting from this week" — the
  // Overview row counts every pending entry, so the tab it lands on must show
  // every one of them, last week's included.
  const tabSource = activeTab === 'pending' ? timesheets : weekTimesheets;
  const filteredTimesheets = tabSource.filter((ts) => {
    const matchesSearch =
      ts.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ts.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEmployee = filterEmployee === 'all' || ts.employeeId === filterEmployee;
    const matchesStatus = filterStatus === 'all' || ts.status === filterStatus;
    const matchesDay =
      activeTab === 'pending' ||
      !selectedDay ||
      format(parseISO(ts.date), 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd');
    const matchesTab =
      activeTab === 'week' ||
      (activeTab === 'pending' && ts.status === 'Pending' && !ts.isLive) ||
      (activeTab === 'approved' && ts.status === 'Approved');
    return matchesSearch && matchesEmployee && matchesStatus && matchesDay && matchesTab;
  });

  // One card per worker for whatever the tab is showing (the Pending tab
  // spans weeks, so this can't come from the week-only breakdown).
  const listGroups = (() => {
    const byEmp = new Map<string, { employeeId: string; name: string; rows: DisplayTimesheet[] }>();
    filteredTimesheets.forEach((ts) => {
      const g = byEmp.get(ts.employeeId) ?? {
        employeeId: ts.employeeId,
        name: ts.employeeName,
        rows: [],
      };
      g.rows.push(ts);
      byEmp.set(ts.employeeId, g);
    });
    return [...byEmp.values()].sort((a, b) => a.name.localeCompare(b.name));
  })();

  // O(1) employee lookups — these run inside per-row loops on a section that
  // re-renders every second while someone is on the clock.
  const employeesById = useMemo(() => new Map(employees.map((e) => [e.id, e])), [employees]);

  // hourly_rate is canonical for every pay_type — AddEmployeeDialog derives it
  // on write (annual ÷ 2080, day rate ÷ 8). No rate on record = null; £ figures
  // must never invent a number for those workers.
  const getHourlyRate = useCallback(
    (employeeId: string): number | null => {
      const emp = employeesById.get(employeeId);
      return emp && emp.hourly_rate > 0 ? emp.hourly_rate : null;
    },
    [employeesById]
  );

  const calculateLabourCost = useCallback(
    (employeeId: string, hours: number): number => (getHourlyRate(employeeId) ?? 0) * hours,
    [getHourlyRate]
  );

  // Per-worker overtime terms — firms pay 1×, 1.2×, 1.5×… over differing
  // daily thresholds, so both live on the employee record.
  const getOvertimeTerms = useCallback(
    (employeeId: string): OvertimeTerms => {
      const emp = employeesById.get(employeeId);
      return {
        multiplier: emp?.overtime_multiplier ?? DEFAULT_OVERTIME_TERMS.multiplier,
        threshold: emp?.overtime_threshold_hours ?? DEFAULT_OVERTIME_TERMS.threshold,
      };
    },
    [employeesById]
  );

  // Live (open) entries carry no hours yet — keep them out of the numbers.
  const settledTimesheets = useMemo(
    () => weekTimesheets.filter((ts) => !ts.isLive),
    [weekTimesheets]
  );
  // Every settled entry, any week — the pending queue and its flags use this.
  const allSettled = useMemo(() => timesheets.filter((ts) => !ts.isLive), [timesheets]);
  const liveCount = weekTimesheets.length - settledTimesheets.length;

  const { data: teamLeave = [] } = useTeamLeaveRequests();
  const approvedLeave = useMemo(
    () => teamLeave.filter((lr) => lr.status === 'approved'),
    [teamLeave]
  );
  const isOnLeave = useCallback(
    (employeeId: string, dateStr: string) =>
      approvedLeave.some(
        (lr) => lr.employeeId === employeeId && lr.startDate <= dateStr && lr.endDate >= dateStr
      ),
    [approvedLeave]
  );

  const workersWithoutRate = useMemo(() => {
    const ids = new Set(settledTimesheets.map((ts) => ts.employeeId));
    return [...ids].filter((id) => getHourlyRate(id) === null).length;
  }, [settledTimesheets, getHourlyRate]);

  // Overtime-aware cost of a set of entries — the SAME maths the payroll
  // export uses, so the dashboard and the CSV can never disagree.
  const costOfEntries = useCallback(
    (entries: DisplayTimesheet[]): number => {
      const byEmployee = new Map<string, DisplayTimesheet[]>();
      entries.forEach((ts) => {
        const list = byEmployee.get(ts.employeeId) ?? [];
        list.push(ts);
        byEmployee.set(ts.employeeId, list);
      });
      let total = 0;
      byEmployee.forEach((list, employeeId) => {
        total += labourCost(list, getHourlyRate(employeeId) ?? 0, getOvertimeTerms(employeeId));
      });
      return total;
    },
    [getHourlyRate, getOvertimeTerms]
  );

  const {
    totalHours,
    approvedHours,
    pendingCount,
    totalLabourCost,
    approvedLabourCost,
    overtimeHours,
    overtimeCost,
  } = useMemo(() => {
    const approved = settledTimesheets.filter((ts) => ts.status === 'Approved');

    // Per-day, per-worker overtime at each worker's own terms
    const byEmployee = new Map<string, DisplayTimesheet[]>();
    settledTimesheets.forEach((ts) => {
      const list = byEmployee.get(ts.employeeId) ?? [];
      list.push(ts);
      byEmployee.set(ts.employeeId, list);
    });
    let otHours = 0;
    let otCost = 0;
    byEmployee.forEach((list, employeeId) => {
      const terms = getOvertimeTerms(employeeId);
      const { overtimeHours: ot } = splitDailyOvertime(list, terms.threshold);
      otHours += ot;
      otCost += (getHourlyRate(employeeId) ?? 0) * ot * terms.multiplier;
    });

    return {
      totalHours: settledTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0),
      approvedHours: approved.reduce((sum, ts) => sum + ts.totalHours, 0),
      pendingCount: settledTimesheets.filter((ts) => ts.status === 'Pending').length,
      totalLabourCost: costOfEntries(settledTimesheets),
      approvedLabourCost: costOfEntries(approved),
      overtimeHours: otHours,
      overtimeCost: otCost,
    };
  }, [settledTimesheets, costOfEntries, getHourlyRate, getOvertimeTerms]);

  const onLeaveToday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return teamLeave.filter(
      (lr) => lr.status === 'approved' && lr.startDate <= today && lr.endDate >= today
    ).length;
  }, [teamLeave]);

  const weekDays = useMemo(
    () => eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd }),
    [currentWeekStart, currentWeekEnd]
  );

  // ── Exceptions engine ────────────────────────────────────────────────────
  // Payroll runs on exceptions, not rows: surface long days, weekend work,
  // missing rates/jobs and forgotten clock-ins so nobody hunts through 75
  // entries to find the three that matter.
  const LONG_DAY_HOURS = 10;
  const NO_BREAK_HOURS = 6;
  const todayStr = format(new Date(), 'yyyy-MM-dd');

  // Flags run over EVERY settled entry (not just the week on screen) so the
  // Pending queue can hold back last week's oddities too. "No rate" is a pay
  // problem, so it only flags for people who can see pay — an office manager
  // approving hours can't fix it and mustn't learn the rate from it.
  // "Far from site" (ELE-1828 / partly ELE-1952): the phone's clock-in or
  // clock-out fix is > 500 m from the job pin AND good to < 200 m, so a rough
  // indoor fix never flags anyone. "Over quote" (ELE-1952, quoted hours from
  // ELE-1824): the job's logged hours so far (pending + approved, never
  // rejected) have passed the hours it was quoted at. Hours only, no money.
  const entryFlags = useMemo(() => {
    const flags = new Map<string, string[]>();
    const quoted = new Map<string, number>();
    [...jobs, ...otherJobs].forEach((j) => {
      const q = Number((j as { quoted_hours?: number | null }).quoted_hours);
      if (Number.isFinite(q) && q > 0) quoted.set(j.id, q);
    });
    const jobHours = new Map<string, number>();
    allSettled.forEach((ts) => {
      if (!ts.jobId || ts.status === 'Rejected') return;
      jobHours.set(ts.jobId, (jobHours.get(ts.jobId) ?? 0) + ts.totalHours);
    });
    const dayTotals = new Map<string, number>();
    allSettled.forEach((ts) => {
      const key = `${ts.employeeId}|${ts.date}`;
      dayTotals.set(key, (dayTotals.get(key) ?? 0) + ts.totalHours);
    });
    allSettled.forEach((ts) => {
      const list: string[] = [];
      const dayTotal = dayTotals.get(`${ts.employeeId}|${ts.date}`) ?? 0;
      if (dayTotal > LONG_DAY_HOURS) list.push(`${dayTotal.toFixed(1)}h day`);
      // Working Time Regulations: a 20-minute break is due over 6 hours
      if (ts.totalHours > NO_BREAK_HOURS && ts.breakMins === 0) list.push('No break');
      const dow = getDay(parseISO(ts.date));
      if (dow === 0 || dow === 6) list.push('Weekend');
      if (!ts.jobId) list.push('No job');
      if (isFarFromSite([ts.clockInFix, ts.clockOutFix], ts.site)) list.push('Far from site');
      const q = ts.jobId ? quoted.get(ts.jobId) : undefined;
      const used = ts.jobId ? (jobHours.get(ts.jobId) ?? 0) : 0;
      if (q && used > q) list.push(`Over quote ${Math.round(used * 10) / 10}/${q}h`);
      if (canSeeMoney && getHourlyRate(ts.employeeId) === null) list.push('No rate');
      if (list.length > 0) flags.set(ts.id, list);
    });
    // Working Time Regulations reg 5A / 12(4): under-18 limits, no opt-out.
    if (youngWorkers && youngWorkers.size > 0) {
      youngWorkerFlags(
        allSettled
          .filter((ts) => ts.status !== 'Rejected')
          .map((ts) => ({
            id: ts.id,
            employeeId: ts.employeeId,
            date: ts.date,
            hours: ts.totalHours,
            breakMins: ts.breakMins,
          })),
        youngWorkers
      ).forEach((f, id) => flags.set(id, [...f, ...(flags.get(id) ?? [])])); // legal limit first
    }
    return flags;
  }, [allSettled, getHourlyRate, canSeeMoney, jobs, otherJobs, youngWorkers]);

  // Past weekdays this week with no entry and no approved leave — the classic
  // "forgot to clock in" hole that otherwise only shows up as a short pay packet.
  const missingDaysByEmployee = useMemo(() => {
    const map = new Map<string, string[]>();
    const entryDays = new Set(
      weekTimesheets.map((ts) => `${ts.employeeId}|${format(parseISO(ts.date), 'yyyy-MM-dd')}`)
    );
    const workerIds = new Set(weekTimesheets.map((ts) => ts.employeeId));
    workerIds.forEach((empId) => {
      // Days before the worker joined are not "missing" — a Wednesday starter
      // must not open with two phantom holes in their first week.
      const joined = employeesById.get(empId)?.join_date?.slice(0, 10) ?? null;
      const missing: string[] = [];
      weekDays.forEach((day) => {
        const dow = getDay(day);
        if (dow === 0 || dow === 6) return;
        const dStr = format(day, 'yyyy-MM-dd');
        if (dStr >= todayStr) return;
        if (joined && dStr < joined) return;
        if (entryDays.has(`${empId}|${dStr}`)) return;
        if (isOnLeave(empId, dStr)) return;
        missing.push(dStr);
      });
      if (missing.length > 0) map.set(empId, missing);
    });
    return map;
  }, [weekTimesheets, weekDays, isOnLeave, todayStr, employeesById]);

  // Active workers with zero entries in an elapsed part of the week and no
  // leave covering it — silent all week is a bigger hole than a missing day.
  const silentWorkers = useMemo(() => {
    if (format(currentWeekStart, 'yyyy-MM-dd') > todayStr) return [];
    const withEntries = new Set(weekTimesheets.map((ts) => ts.employeeId));
    return employees.filter(
      (e) =>
        (e.status === 'Active' || e.status === 'active') &&
        // Not joined yet = can't clock in; the Team page chases those
        !!e.user_id &&
        !withEntries.has(e.id) &&
        weekDays.some((day) => {
          const dow = getDay(day);
          const dStr = format(day, 'yyyy-MM-dd');
          const joined = e.join_date?.slice(0, 10) ?? null;
          return (
            dow !== 0 &&
            dow !== 6 &&
            dStr < todayStr &&
            (!joined || dStr >= joined) &&
            !isOnLeave(e.id, dStr)
          );
        })
    );
  }, [employees, weekTimesheets, weekDays, currentWeekStart, isOnLeave, todayStr]);

  // The whole queue, every week — what "Approve all clean" works on.
  const pendingSettled = useMemo(
    () => allSettled.filter((ts) => ts.status === 'Pending'),
    [allSettled]
  );
  const pendingOutsideWeek = useMemo(
    () =>
      pendingSettled.filter(
        (ts) =>
          !isWithinInterval(parseISO(ts.date), { start: currentWeekStart, end: currentWeekEnd })
      ).length,
    [pendingSettled, currentWeekStart, currentWeekEnd]
  );
  const cleanPendingIds = useMemo(
    () => pendingSettled.filter((ts) => !entryFlags.has(ts.id)).map((ts) => ts.id),
    [pendingSettled, entryFlags]
  );
  const flaggedPendingCount = pendingSettled.length - cleanPendingIds.length;

  const exceptionSummary = useMemo(() => {
    const counts = { longDays: 0, weekend: 0, noJob: 0, noRate: 0, noBreak: 0, under18: 0 };
    const under18Keys = new Set<string>();
    const longDayKeys = new Set<string>();
    const weekIds = new Set(settledTimesheets.map((t) => t.id));
    entryFlags.forEach((flags, id) => {
      if (!weekIds.has(id)) return;
      const ts = settledTimesheets.find((t) => t.id === id);
      flags.forEach((f) => {
        if (f.startsWith('Under 18') && ts) under18Keys.add(`${ts.employeeId}|${ts.date}`);
        else if (f.endsWith('h day') && ts) longDayKeys.add(`${ts.employeeId}|${ts.date}`);
        else if (f === 'Weekend') counts.weekend += 1;
        else if (f === 'No job') counts.noJob += 1;
        else if (f === 'No rate') counts.noRate += 1;
        else if (f === 'No break') counts.noBreak += 1;
      });
    });
    counts.longDays = longDayKeys.size;
    counts.under18 = under18Keys.size;
    const missingDays = [...missingDaysByEmployee.values()].reduce((s, v) => s + v.length, 0);
    return { ...counts, missingDays, silent: silentWorkers.length };
  }, [entryFlags, settledTimesheets, missingDaysByEmployee, silentWorkers]);

  const hasExceptions =
    exceptionSummary.under18 > 0 ||
    exceptionSummary.longDays > 0 ||
    exceptionSummary.weekend > 0 ||
    exceptionSummary.noJob > 0 ||
    exceptionSummary.noRate > 0 ||
    exceptionSummary.noBreak > 0 ||
    exceptionSummary.missingDays > 0 ||
    exceptionSummary.silent > 0;

  // One write for a batch of clean entries — the whole queue, or one
  // person's week. Flagged entries are never in `ids`; they need a look.
  // ELE-2061: approving hours pays someone; warn or block if they have no
  // right-to-work check (firm setting).
  const rtwOk = (ids: string[]) =>
    confirmRtw(
      rawTimesheets.filter((t) => ids.includes(t.id)).map((t) => t.employee_id),
      'approve'
    );
  const approveIds = async (ids: string[], flaggedLeft: number, who?: string) => {
    if (ids.length === 0) return;
    if (!(await rtwOk(ids))) return;
    batchApproveMutation.mutate(
      { ids },
      {
        onSuccess: (count) => {
          toast.success(
            `${count} ${who ? `of ${who}'s ` : ''}timesheet${count === 1 ? '' : 's'} approved${
              flaggedLeft > 0 ? `. ${flaggedLeft} flagged left for you to check` : ''
            }`
          );
        },
        onError: (err) =>
          toast.error(err instanceof Error ? err.message : 'Failed to approve timesheets'),
      }
    );
  };
  const handleApproveClean = () => approveIds(cleanPendingIds, flaggedPendingCount);

  const dailyBreakdown = weekDays.map((day) => {
    const dayTimesheets = weekTimesheets.filter(
      (ts) => format(parseISO(ts.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
    );
    const hours = dayTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
    const approved = dayTimesheets
      .filter((ts) => ts.status === 'Approved')
      .reduce((sum, ts) => sum + ts.totalHours, 0);
    const pending = dayTimesheets
      .filter((ts) => ts.status === 'Pending')
      .reduce((sum, ts) => sum + ts.totalHours, 0);
    const rejected = dayTimesheets
      .filter((ts) => ts.status === 'Rejected')
      .reduce((sum, ts) => sum + ts.totalHours, 0);
    return { day, hours, approved, pending, rejected, count: dayTimesheets.length };
  });

  const maxDailyHours = Math.max(...dailyBreakdown.map((d) => d.hours), 8);

  const employeeBreakdown = useMemo(
    () =>
      employees
        .map((emp) => {
          // Maths from settled entries only — but a worker whose ONLY entry is a
          // live clock-in must still appear (their "On the clock" row renders
          // under this breakdown), so inclusion counts every week entry.
          const allRows = weekTimesheets.filter((ts) => ts.employeeId === emp.id);
          const empTimesheets = allRows.filter((ts) => !ts.isLive);
          const hours = empTimesheets.reduce((sum, ts) => sum + ts.totalHours, 0);
          const terms = getOvertimeTerms(emp.id);
          const { overtimeHours: overtime } = splitDailyOvertime(empTimesheets, terms.threshold);
          const cost = labourCost(empTimesheets, getHourlyRate(emp.id) ?? 0, terms);
          const days = new Set(empTimesheets.map((ts) => ts.date)).size;
          const pending = empTimesheets.filter((ts) => ts.status === 'Pending').length;
          const approved = empTimesheets.filter((ts) => ts.status === 'Approved').length;
          return {
            ...emp,
            totalHours: hours,
            entries: allRows.length,
            cost,
            overtime,
            days,
            pending,
            approved,
          };
        })
        .filter((e) => e.entries > 0),
    [employees, weekTimesheets, getOvertimeTerms, getHourlyRate]
  );

  const handleClockIn = () => {
    if (!selectedEmployeeId) {
      toast.error('Please select an employee before clocking in.');
      return;
    }
    if (!selectedJobId) {
      toast.error('Please select a job before clocking in.');
      return;
    }

    const job = jobs.find((j) => j.id === selectedJobId);
    const employee = employees.find((e) => e.id === selectedEmployeeId);
    if (job && employee) {
      clockIn(employee.id, employee.name, selectedJobId, job.title);
    }
  };

  const handleClockOut = async () => {
    // Break minutes tracked by the hook (Break button) are applied automatically
    await clockOut();
  };

  const handleApprove = async (id: string) => {
    if (!(await rtwOk([id]))) return;
    approveTimesheetMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success('Timesheet approved');
          setDetailTimesheet(null);
        },
        onError: (err) =>
          toast.error(err instanceof Error ? err.message : 'Failed to approve timesheet'),
      }
    );
  };

  // Reject asks for a reason first — it is written to the row and shown to
  // the worker in Worker Tools, so they know what to fix and resubmit.
  const [rejectReason, setRejectReason] = useState('');
  const [rejectArmed, setRejectArmed] = useState(false);
  const handleReject = (id: string) => {
    if (!rejectArmed) {
      setRejectArmed(true);
      return;
    }
    if (rejectReason.trim().length < 3) {
      toast.error('Add a short reason so they know what to fix');
      return;
    }
    rejectTimesheetMutation.mutate(
      { id, reason: rejectReason },
      {
        onSuccess: () => {
          toast.success('Timesheet rejected', {
            description: rejectReason.trim()
              ? 'The worker can see your reason in their timesheets.'
              : 'The worker has been told.',
          });
          setDetailTimesheet(null);
          setRejectArmed(false);
          setRejectReason('');
        },
        onError: (err) =>
          toast.error(err instanceof Error ? err.message : 'Failed to reject timesheet'),
      }
    );
  };

  const handleBatchApprove = async () => {
    if (!(await rtwOk(selectedTimesheetIds))) return;
    batchApproveMutation.mutate(
      { ids: selectedTimesheetIds },
      {
        onSuccess: (count) => {
          toast.success(`${count} timesheet${count === 1 ? '' : 's'} approved`);
          setSelectedTimesheetIds([]);
          setIsSelectMode(false);
        },
        onError: (err) =>
          toast.error(err instanceof Error ? err.message : 'Failed to approve timesheets'),
      }
    );
  };

  // Sending entries back needs a reason, same as a single reject — the worker
  // sees it in Worker Tools and knows what to fix.
  const [batchRejectOpen, setBatchRejectOpen] = useState(false);
  const [batchRejectReason, setBatchRejectReason] = useState('');
  const handleBatchReject = () => {
    if (!batchRejectOpen) {
      setBatchRejectOpen(true);
      return;
    }
    if (batchRejectReason.trim().length < 3) {
      toast.error('Add a short reason. The team sees it.');
      return;
    }
    batchRejectMutation.mutate(
      { ids: selectedTimesheetIds, reason: batchRejectReason },
      {
        onSuccess: (count) => {
          toast.success(`${count} timesheet${count === 1 ? '' : 's'} sent back`);
          setSelectedTimesheetIds([]);
          setIsSelectMode(false);
          setBatchRejectOpen(false);
          setBatchRejectReason('');
        },
        onError: (err) =>
          toast.error(err instanceof Error ? err.message : 'Failed to reject timesheets'),
      }
    );
  };

  const toggleTimesheetSelection = (id: string) => {
    setSelectedTimesheetIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAllPending = () => {
    // Live (open) entries aren't approvable — someone is still on the clock
    const pendingIds = filteredTimesheets
      .filter((ts) => ts.status === 'Pending' && !ts.isLive)
      .map((ts) => ts.id);
    setSelectedTimesheetIds(pendingIds);
  };

  const refresh = async () => {
    // refetch never throws — check the result so a failed refresh can't
    // toast success over stale data
    const result = await refetchTimesheets();
    if (result.error) {
      toast.error('Could not refresh timesheets. Check your connection');
    } else {
      toast.success('Timesheets refreshed');
    }
  };

  const activeJobs = jobs.filter((j) => j.status === 'Active');
  const isLoading = timesheetsLoading || employeesLoading || jobsLoading;

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] = [];
  if (isFirmAdmin && firmPaySettings !== undefined && !firmPaySettings?.pay_frequency) {
    helpBlockers.push({
      text: 'No pay period set yet, so workers see “no payday set” on My pay.',
      fixLabel: 'Set the pay period',
      onFix: () => setPayPeriodOpen(true),
    });
  }
  if (canSeeMoney && workersWithoutRate > 0) {
    helpBlockers.push({
      text: `${workersWithoutRate} ${workersWithoutRate === 1 ? 'person has' : 'people have'} no pay rate, so overtime and the payroll file show no pay for them.`,
      fixLabel: 'Open the team',
      onFix: () => navigate('/employer?section=team'),
    });
  }

  const tabs = [
    { value: 'week', label: 'Week', count: weekTimesheets.length },
    { value: 'pending', label: 'Pending', count: pendingSettled.length },
    {
      value: 'approved',
      label: 'Approved',
      count: weekTimesheets.filter((t) => t.status === 'Approved').length,
    },
    { value: 'leave', label: 'Leave' },
  ];

  // Where things stand, in one line (the Overview's headline, for hours).
  const isThisWeek =
    format(currentWeekStart, 'yyyy-MM-dd') ===
    format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');
  const heroLine = (() => {
    const parts: string[] = [];
    const n = pendingSettled.length;
    if (n > 0) parts.push(`${n} ${n === 1 ? 'timesheet' : 'timesheets'} to approve`);
    if (exceptionSummary.missingDays > 0)
      parts.push(
        `${exceptionSummary.missingDays} missing ${exceptionSummary.missingDays === 1 ? 'day' : 'days'}`
      );
    if (liveCount > 0) parts.push(`${liveCount} on the clock now`);
    if (parts.length > 0) {
      const s = parts.join(', ');
      return `${s.charAt(0).toUpperCase()}${s.slice(1)}.`;
    }
    if (weekTimesheets.length === 0)
      return isThisWeek
        ? 'Nothing logged this week yet. Hours land here as the team clocks in.'
        : `Nothing logged for ${weekLabel}.`;
    return `Nothing waiting. ${totalHours.toFixed(1)} hours logged ${isThisWeek ? 'this week' : `for ${weekLabel}`}.`;
  })();

  const exceptionTags = (
    <div className="flex flex-wrap gap-2">
      {exceptionSummary.under18 > 0 && (
        <Tag tone="red">
          {exceptionSummary.under18} under-18 day{exceptionSummary.under18 === 1 ? '' : 's'} over
          the limit
        </Tag>
      )}
      {exceptionSummary.missingDays > 0 && (
        <Tag tone="outline">
          {exceptionSummary.missingDays} missing day{exceptionSummary.missingDays === 1 ? '' : 's'}
        </Tag>
      )}
      {exceptionSummary.silent > 0 && (
        <Tag tone="outline">
          {exceptionSummary.silent} worker{exceptionSummary.silent === 1 ? '' : 's'} no hours
        </Tag>
      )}
      {exceptionSummary.longDays > 0 && (
        <Tag tone="outline">
          {exceptionSummary.longDays} long day{exceptionSummary.longDays === 1 ? '' : 's'} (over{' '}
          {LONG_DAY_HOURS}h)
        </Tag>
      )}
      {exceptionSummary.weekend > 0 && (
        <Tag tone="outline">
          {exceptionSummary.weekend} weekend entr{exceptionSummary.weekend === 1 ? 'y' : 'ies'}
        </Tag>
      )}
      {exceptionSummary.noJob > 0 && <Tag tone="red">{exceptionSummary.noJob} no job</Tag>}
      {exceptionSummary.noBreak > 0 && (
        <Tag tone="outline">
          {exceptionSummary.noBreak} no break over {NO_BREAK_HOURS}h
        </Tag>
      )}
      {exceptionSummary.noRate > 0 && <Tag tone="red">{exceptionSummary.noRate} no rate</Tag>}
    </div>
  );

  // Only run the payroll check once the week has any entries — a firm
  // that doesn't use timesheets must not see "133 workers no hours"
  const showPayrollCheck =
    (weekTimesheets.length > 0 || pendingSettled.length > 0) &&
    (activeTab === 'pending'
      ? cleanPendingIds.length > 0
      : hasExceptions || cleanPendingIds.length > 0);

  const payrollCheck = showPayrollCheck ? (
    <section>
      <PanelTitle
        title="Payroll check"
        meta={`${pendingSettled.length} waiting · ${cleanPendingIds.length} clean`}
      />
      <div className={cn(panel, 'px-4 py-4 sm:px-5 space-y-3')}>
        {hasExceptions && activeTab !== 'pending' && exceptionTags}
        {silentWorkers.length > 0 && activeTab !== 'pending' && (
          <p className="text-[13px] text-white">
            No hours logged: {silentWorkers.map((w) => w.name).join(', ')}
          </p>
        )}
        {cleanPendingIds.length > 0 && (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:flex-col lg:items-start">
            <button
              type="button"
              data-help="timesheets.approve-clean"
              onClick={handleApproveClean}
              disabled={batchApproveMutation.isPending}
              className={cn(rowBtnPrimary, 'w-full sm:w-auto')}
            >
              {batchApproveMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              Approve all {cleanPendingIds.length} clean
            </button>
            <span className="text-[13px] text-white">
              {pendingOutsideWeek > 0 ? 'Every week, not just this one. ' : ''}
              {flaggedPendingCount > 0
                ? `${flaggedPendingCount} flagged entr${flaggedPendingCount === 1 ? 'y stays' : 'ies stay'} for you to check.`
                : 'Nothing flagged.'}
            </span>
          </div>
        )}
      </div>
    </section>
  ) : null;

  const clockPanel =
    activeTab === 'week' ? (
      <section>
        <PanelTitle
          title={isClockedIn ? 'On the clock' : 'Clock someone in'}
          meta={isClockedIn ? undefined : 'Pick a worker and a job'}
        />
        <div className={cn(panel, 'px-4 py-4 sm:px-5')}>
          {isClockedIn ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-white truncate">
                    {clockState?.jobTitle || 'Unknown job'}
                  </div>
                  <div className="mt-0.5 text-[13px] text-white">
                    {isOnBreak ? 'On a break' : 'Working now'}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-[26px] font-semibold leading-none text-white tabular-nums">
                    {duration}
                  </div>
                  <div className="mt-1 text-[12px] text-white">Elapsed</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={isOnBreak ? endBreak : startBreak}
                  className={cn(rowBtnSecondary, 'flex-1')}
                >
                  <Coffee className="h-4 w-4" />
                  {isOnBreak
                    ? `End break${breakMinutes > 0 ? ` · ${breakMinutes}m` : ''}`
                    : breakMinutes > 0
                      ? `Break · ${breakMinutes}m taken`
                      : 'Break'}
                </button>
                <button
                  type="button"
                  onClick={handleClockOut}
                  disabled={isClockingOut}
                  className={cn(rowBtnPrimary, 'flex-1')}
                >
                  {isClockingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  Clock out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end lg:flex-col lg:items-stretch">
              <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                <SelectTrigger className={`${selectTriggerClass} flex-1`}>
                  <SelectValue placeholder="Select worker…" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {employees
                    .filter((e) => e.status === 'Active' || e.status === 'active')
                    .map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                <SelectTrigger className={`${selectTriggerClass} flex-1`}>
                  <SelectValue placeholder="Select job…" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {activeJobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                type="button"
                onClick={handleClockIn}
                className={cn(rowBtnSecondary, 'mt-2 sm:mt-0 lg:mt-2 lg:self-end')}
              >
                <Play className="h-4 w-4" />
                Clock in
              </button>
            </div>
          )}
        </div>
      </section>
    ) : null;

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Timesheets"
        description={isLoading ? "Approve the team's hours and send them to payroll." : heroLine}
        actions={
          <HeroActions stretchFirst>
            <ManualTimeEntryDialog
              trigger={
                <PrimaryButton data-help="timesheets.add" className={heroBtn}>
                  <Plus className="h-4 w-4 mr-1.5" />
                  Add entry
                </PrimaryButton>
              }
            />
            <SecondaryButton
              data-help="timesheets.export"
              onClick={() => navigate('/employer?section=accounting&focus=payrun')}
              className={cn(heroBtn, 'shrink-0 px-3.5 sm:px-5 border-white/[0.18] font-semibold')}
            >
              <Banknote className="mr-1.5 h-4 w-4" />
              Pay run
            </SecondaryButton>
            {isFirmAdmin && (
              <IconButton
                onClick={() => setRulesOpen(true)}
                aria-label="Timesheet rules"
                className="shrink-0"
              >
                <Settings2 className="h-4 w-4" />
              </IconButton>
            )}
            <PageHelpButton
              help={TIMESHEETS_HELP}
              blockers={helpBlockers}
              askContext={{ page: 'timesheets', tab: activeTab }}
            />
            <IconButton onClick={refresh} aria-label="Refresh timesheets" className="shrink-0">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </HeroActions>
        }
      />

      <HowItWorks
        help={TIMESHEETS_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'timesheets', tab: activeTab }}
      />

      <JobContextBar what="Hours" />

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          <StatStrip
            columns={4}
            stats={[
              {
                label: 'Hours this week',
                value: totalHours.toFixed(1),
                sub: `${approvedHours.toFixed(1)} approved${liveCount > 0 ? ` · ${liveCount} on the clock` : ''}`,
              },
              {
                label: 'To approve',
                value: pendingSettled.length,
                tone: pendingSettled.length > 0 ? 'yellow' : undefined,
                sub:
                  pendingOutsideWeek > 0
                    ? `${pendingCount} this week · ${pendingOutsideWeek} earlier`
                    : pendingSettled.length === 0
                      ? 'Nothing waiting'
                      : pendingSettled.length === 1
                        ? '1 entry'
                        : `${pendingSettled.length} entries`,
                onClick: pendingSettled.length > 0 ? () => changeTab('pending') : undefined,
              },
              {
                label: 'On leave today',
                value: onLeaveToday,
                sub: onLeaveToday === 0 ? 'Everyone in' : 'Open leave',
                onClick: () => navigate('/employer?section=leave'),
              },
              canSeeMoney
                ? {
                    label: 'Overtime',
                    value: `£${Math.round(overtimeCost).toLocaleString()}`,
                    sub:
                      workersWithoutRate > 0
                        ? `${overtimeHours.toFixed(1)}h OT · ${workersWithoutRate} no rate set`
                        : `${overtimeHours.toFixed(1)}h at each worker's OT rate`,
                  }
                : {
                    label: 'Overtime',
                    value: `${overtimeHours.toFixed(1)}h`,
                    sub: "Over each worker's daily threshold",
                  },
            ]}
          />

          <div className={twoColClass}>
            <div className={colClass}>
              {activeTab !== 'pending' && (
                <section>
                  <PanelTitle
                    title={isThisWeek ? 'This week' : 'Week'}
                    meta={weekLabel}
                    action={isThisWeek ? undefined : 'This week'}
                    onAction={goToThisWeek}
                  />
                  <div className={cn(panel, 'px-3 py-3 sm:px-4')}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <IconButton
                        onClick={goToPreviousWeek}
                        aria-label="Previous week"
                        className="hidden sm:flex shrink-0"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </IconButton>
                      <div className="grid min-w-0 flex-1 grid-cols-7 gap-1 sm:gap-2">
                        {dailyBreakdown.map((data, idx) => {
                          const isSelected =
                            selectedDay &&
                            format(data.day, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd');
                          const isTodayDate = isToday(data.day);
                          const heightPct = Math.min((data.hours / maxDailyHours) * 100, 100);

                          return (
                            <button
                              key={idx}
                              onClick={() => setSelectedDay(isSelected ? null : data.day)}
                              aria-pressed={!!isSelected}
                              className={cn(
                                'flex h-[104px] min-w-0 flex-col items-center rounded-xl border px-1 py-2 transition-colors touch-manipulation',
                                isSelected
                                  ? 'bg-elec-yellow border-elec-yellow text-black'
                                  : isTodayDate
                                    ? 'bg-white/[0.06] border-elec-yellow/60 text-white'
                                    : 'bg-white/[0.03] border-white/[0.08] text-white hover:bg-white/[0.06]'
                              )}
                            >
                              <span
                                className={cn(
                                  'text-[12px] font-semibold',
                                  isSelected ? 'text-black' : 'text-white'
                                )}
                              >
                                {DAYS_OF_WEEK[idx]}
                              </span>
                              <span
                                className={cn(
                                  'text-[15px] font-semibold tabular-nums leading-tight',
                                  isSelected ? 'text-black' : 'text-white'
                                )}
                              >
                                {format(data.day, 'd')}
                              </span>
                              <div
                                className={cn(
                                  'mt-1 flex w-6 flex-1 items-end overflow-hidden rounded',
                                  data.hours === 0
                                    ? 'bg-transparent'
                                    : isSelected
                                      ? 'bg-black/20'
                                      : 'bg-white/[0.08]'
                                )}
                              >
                                {data.hours > 0 && (
                                  <div
                                    className={cn(
                                      'w-full',
                                      isSelected ? 'bg-black' : 'bg-elec-yellow'
                                    )}
                                    style={{ height: `${heightPct}%` }}
                                  />
                                )}
                              </div>
                              <span
                                className={cn(
                                  'mt-1 text-[12px] font-medium tabular-nums',
                                  isSelected ? 'text-black' : 'text-white'
                                )}
                              >
                                {data.hours > 0 ? `${data.hours.toFixed(1)}h` : '–'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <IconButton
                        onClick={goToNextWeek}
                        aria-label="Next week"
                        className="hidden sm:flex shrink-0"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </IconButton>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2 sm:hidden">
                      <IconButton onClick={goToPreviousWeek} aria-label="Previous week">
                        <ChevronLeft className="h-4 w-4" />
                      </IconButton>
                      {selectedDay ? (
                        <button
                          onClick={() => setSelectedDay(null)}
                          className="h-11 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                        >
                          Show the whole week
                        </button>
                      ) : (
                        <span className="text-[13px] text-white">Tap a day to see just it</span>
                      )}
                      <IconButton onClick={goToNextWeek} aria-label="Next week">
                        <ChevronRight className="h-4 w-4" />
                      </IconButton>
                    </div>
                    {selectedDay && (
                      <div className="mt-1 hidden justify-end sm:flex">
                        <button
                          onClick={() => setSelectedDay(null)}
                          className="h-11 px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                        >
                          Show the whole week
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {clockPanel && <div className="lg:hidden">{clockPanel}</div>}
              {payrollCheck && <div className="lg:hidden">{payrollCheck}</div>}

              <div data-help="timesheets.tabs" className={filterStack}>
                <FilterBar
                  tabs={tabs}
                  activeTab={activeTab}
                  onTabChange={changeTab}
                  search={searchQuery}
                  onSearchChange={setSearchQuery}
                  searchPlaceholder="Worker or job…"
                  actions={
                    <>
                      <SecondaryButton
                        className={cn(
                          'hidden sm:inline-flex',
                          activeTab === 'pending' && 'sm:hidden'
                        )}
                        onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                        aria-label={viewMode === 'list' ? 'Switch to week grid' : 'Switch to list'}
                      >
                        {viewMode === 'list' ? (
                          <>
                            <LayoutGrid className="h-4 w-4 mr-1.5" />
                            Grid
                          </>
                        ) : (
                          <>
                            <List className="h-4 w-4 mr-1.5" />
                            List
                          </>
                        )}
                      </SecondaryButton>
                      <SecondaryButton onClick={() => setIsFiltersOpen(true)}>
                        Filters
                      </SecondaryButton>
                      {isSelectMode ? (
                        <PrimaryButton
                          onClick={() => {
                            setIsSelectMode(false);
                            setSelectedTimesheetIds([]);
                            setBatchRejectOpen(false);
                          }}
                        >
                          Done
                        </PrimaryButton>
                      ) : (
                        <SecondaryButton
                          data-help="timesheets.select"
                          onClick={() => setIsSelectMode(true)}
                        >
                          Select
                        </SecondaryButton>
                      )}
                    </>
                  }
                />
              </div>

              {(filterEmployee !== 'all' || filterStatus !== 'all') && (
                <div className="flex flex-wrap gap-2">
                  {filterEmployee !== 'all' && (
                    <button
                      onClick={() => setFilterEmployee('all')}
                      className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.04] px-3.5 text-[13px] font-medium text-white touch-manipulation"
                    >
                      {employees.find((e) => e.id === filterEmployee)?.name}
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {filterStatus !== 'all' && (
                    <button
                      onClick={() => setFilterStatus('all')}
                      className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.04] px-3.5 text-[13px] font-medium text-white touch-manipulation"
                    >
                      {filterStatus}
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              )}

              {isSelectMode && (
                <div className="sticky bottom-3 z-20 space-y-3 rounded-2xl border border-white/[0.12] bg-[hsl(0_0%_14%)] p-3 shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[14px] font-semibold text-white tabular-nums">
                      {selectedTimesheetIds.length} selected
                    </span>
                    <button
                      onClick={selectAllPending}
                      className="h-11 px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                    >
                      Select all waiting
                    </button>
                  </div>
                  {batchRejectOpen && (
                    <textarea
                      value={batchRejectReason}
                      onChange={(e) => setBatchRejectReason(e.target.value.slice(0, 500))}
                      placeholder="Why are these going back? Everyone selected sees this"
                      rows={2}
                      autoFocus
                      className="w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white placeholder:text-white/35 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 resize-none touch-manipulation"
                    />
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleBatchReject}
                      className={cn(rowBtnSecondary, 'flex-1')}
                      disabled={
                        selectedTimesheetIds.length === 0 ||
                        batchRejectMutation.isPending ||
                        batchApproveMutation.isPending
                      }
                    >
                      <X className="h-4 w-4" />
                      {batchRejectOpen ? 'Send back' : 'Reject'}
                    </button>
                    <button
                      type="button"
                      onClick={handleBatchApprove}
                      className={cn(rowBtnPrimary, 'flex-1')}
                      disabled={
                        selectedTimesheetIds.length === 0 ||
                        batchApproveMutation.isPending ||
                        batchRejectMutation.isPending
                      }
                    >
                      {batchApproveMutation.isPending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      Approve
                    </button>
                  </div>
                </div>
              )}

              {viewMode === 'grid' && activeTab !== 'pending' ? (
                employeeBreakdown.length === 0 ? (
                  <div className={panel}>
                    <PlainEmpty
                      bare
                      text="No hours this week yet. Entries show here as the team clocks in, or add one for someone."
                    />
                  </div>
                ) : (
                  <section>
                    <PanelTitle title="Week per worker" meta={weekLabel} />
                    <div className={cn(panel, 'overflow-hidden')}>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px] border-collapse text-[13px]">
                          <thead>
                            <tr className="border-b border-white/[0.07]">
                              <th className="px-4 py-3 text-left text-[12px] font-semibold text-white sm:px-5">
                                Worker
                              </th>
                              {weekDays.map((day, idx) => (
                                <th
                                  key={idx}
                                  className={cn(
                                    'px-0.5 py-3 text-center text-[12px] font-semibold whitespace-nowrap',
                                    isToday(day) ? 'text-elec-yellow' : 'text-white'
                                  )}
                                >
                                  {DAYS_OF_WEEK[idx]} {format(day, 'd')}
                                </th>
                              ))}
                              <th className="px-2 py-3 text-right text-[12px] font-semibold text-white">
                                Total
                              </th>
                              <th className="px-2 py-3 text-right text-[12px] font-semibold text-white">
                                OT
                              </th>
                              {canSeeMoney && (
                                <th className="px-4 py-3 text-right text-[12px] font-semibold text-white sm:px-5">
                                  Pay
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/[0.05]">
                            {employeeBreakdown
                              .filter(
                                (emp) =>
                                  (filterEmployee === 'all' || emp.id === filterEmployee) &&
                                  emp.name.toLowerCase().includes(searchQuery.toLowerCase())
                              )
                              .map((emp) => (
                                <tr key={emp.id}>
                                  <td className="px-4 py-2 sm:px-5">
                                    <span className="flex min-w-[120px] flex-col">
                                      <span className="text-[14px] font-semibold text-white whitespace-nowrap">
                                        {emp.name}
                                      </span>
                                      {emp.pay_type !== 'hourly' && canSeeMoney && (
                                        <span className="text-[12px] text-white">
                                          {emp.pay_type === 'annual' ? 'Salaried' : 'Day rate'}
                                        </span>
                                      )}
                                    </span>
                                  </td>
                                  {weekDays.map((day, idx) => {
                                    const dayStr = format(day, 'yyyy-MM-dd');
                                    const cellEntries = weekTimesheets.filter(
                                      (ts) =>
                                        ts.employeeId === emp.id &&
                                        format(parseISO(ts.date), 'yyyy-MM-dd') === dayStr
                                    );
                                    const settled = cellEntries.filter((e) => !e.isLive);
                                    const hours = settled.reduce((s, e) => s + e.totalHours, 0);
                                    const live = cellEntries.some((e) => e.isLive);
                                    const missing =
                                      missingDaysByEmployee.get(emp.id)?.includes(dayStr) ?? false;
                                    const onLeave = isOnLeave(emp.id, dayStr);
                                    const flagged = settled.some((e) => entryFlags.has(e.id));
                                    const anyPending = settled.some((e) => e.status === 'Pending');
                                    const anyApproved = settled.some(
                                      (e) => e.status === 'Approved'
                                    );

                                    return (
                                      <td key={idx} className="px-0.5 py-2 text-center">
                                        {cellEntries.length > 0 ? (
                                          <button
                                            onClick={() => {
                                              if (settled.length === 1 && !live) {
                                                setDetailTimesheet(settled[0]);
                                              } else {
                                                setSelectedDay(day);
                                                setFilterEmployee(emp.id);
                                                setViewMode('list');
                                              }
                                            }}
                                            className={cn(
                                              'relative inline-flex h-11 min-w-[46px] items-center justify-center gap-1 rounded-lg px-1 font-semibold tabular-nums transition-colors touch-manipulation',
                                              anyPending
                                                ? 'bg-white/[0.08] text-elec-yellow hover:bg-white/[0.12]'
                                                : anyApproved
                                                  ? 'bg-white/[0.06] text-emerald-300 hover:bg-white/[0.1]'
                                                  : live
                                                    ? 'bg-white/[0.06] text-emerald-300'
                                                    : 'bg-white/[0.06] text-red-300 hover:bg-white/[0.1]'
                                            )}
                                          >
                                            {live && <PulseDot tone="emerald" />}
                                            {hours > 0
                                              ? `${hours.toFixed(1)}`
                                              : live
                                                ? 'now'
                                                : '0.0'}
                                            {flagged && (
                                              <AlertTriangle className="h-3 w-3 text-elec-yellow" />
                                            )}
                                          </button>
                                        ) : onLeave ? (
                                          <span className="inline-flex h-11 min-w-[46px] items-center justify-center rounded-lg border border-white/[0.14] px-1 text-[12px] font-medium text-white">
                                            Leave
                                          </span>
                                        ) : missing ? (
                                          <span
                                            className="inline-flex h-11 min-w-[46px] items-center justify-center rounded-lg border border-elec-yellow/60 px-1 font-semibold text-elec-yellow"
                                            title="No entry. Worker may have forgotten to clock in"
                                          >
                                            !
                                          </span>
                                        ) : (
                                          <span className="inline-flex h-11 min-w-[46px] items-center justify-center text-white">
                                            –
                                          </span>
                                        )}
                                      </td>
                                    );
                                  })}
                                  <td className="px-2 py-2 text-right font-semibold text-white tabular-nums">
                                    {emp.totalHours.toFixed(1)}h
                                  </td>
                                  <td className="px-2 py-2 text-right text-white tabular-nums">
                                    {emp.overtime > 0 ? `${emp.overtime.toFixed(1)}h` : '–'}
                                  </td>
                                  {canSeeMoney && (
                                    <td className="px-4 py-2 text-right font-semibold text-white tabular-nums sm:px-5">
                                      £{Math.round(emp.cost).toLocaleString()}
                                    </td>
                                  )}
                                </tr>
                              ))}
                          </tbody>
                          <tfoot>
                            <tr className="border-t border-white/[0.1]">
                              <td className="px-4 py-3 text-[13px] font-semibold text-white sm:px-5">
                                Team
                              </td>
                              {dailyBreakdown.map((d, idx) => (
                                <td
                                  key={idx}
                                  className="px-0.5 py-3 text-center text-white tabular-nums"
                                >
                                  {d.hours > 0 ? d.hours.toFixed(1) : '–'}
                                </td>
                              ))}
                              <td className="px-2 py-3 text-right font-semibold text-white tabular-nums">
                                {totalHours.toFixed(1)}h
                              </td>
                              <td className="px-2 py-3 text-right text-white tabular-nums">
                                {overtimeHours > 0 ? `${overtimeHours.toFixed(1)}h` : '–'}
                              </td>
                              {canSeeMoney && (
                                <td className="px-4 py-3 text-right font-semibold text-white tabular-nums sm:px-5">
                                  £{Math.round(totalLabourCost).toLocaleString()}
                                </td>
                              )}
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </section>
                )
              ) : listGroups.length === 0 ? (
                <div className={panel}>
                  {searchQuery.trim() || filterEmployee !== 'all' || filterStatus !== 'all' ? (
                    <PlainEmpty
                      bare
                      text={
                        searchQuery.trim()
                          ? `Nothing matches “${searchQuery.trim()}”.`
                          : 'Nothing matches these filters.'
                      }
                      action={
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setFilterEmployee('all');
                            setFilterStatus('all');
                          }}
                          className={rowBtnSecondary}
                        >
                          Clear
                        </button>
                      }
                    />
                  ) : activeTab === 'pending' ? (
                    <PlainEmpty
                      bare
                      text="Nothing waiting. Every submitted timesheet has been approved or sent back."
                      action={
                        <button
                          type="button"
                          onClick={() => changeTab('week')}
                          className={rowBtnSecondary}
                        >
                          See this week
                        </button>
                      }
                    />
                  ) : (
                    <PlainEmpty
                      bare
                      text={
                        selectedDay
                          ? `No entries for ${format(selectedDay, 'EEEE d MMMM')}.`
                          : 'No hours this week yet. Entries show here as the team clocks in, or add one for someone.'
                      }
                    />
                  )}
                </div>
              ) : (
                <div className="space-y-4" data-help="timesheets.list">
                  {listGroups.map((group) => {
                    const emp = employeeBreakdown.find((e) => e.id === group.employeeId);
                    const groupSettled = group.rows.filter((r) => !r.isLive);
                    const groupHours = groupSettled.reduce((sum, r) => sum + r.totalHours, 0);
                    const groupPending = groupSettled.filter((r) => r.status === 'Pending');
                    const groupClean = groupPending.filter((r) => !entryFlags.has(r.id));
                    const firstName = group.name.split(' ')[0];
                    const groupDetail =
                      activeTab === 'pending'
                        ? `${groupHours.toFixed(1)}h · ${groupPending.length} waiting${
                            groupPending.length > groupClean.length
                              ? ` · ${groupPending.length - groupClean.length} flagged`
                              : ''
                          }`
                        : [
                            `${groupHours.toFixed(1)}h`,
                            emp ? `${emp.days} ${emp.days === 1 ? 'day' : 'days'}` : null,
                            emp && emp.overtime > 0 ? `${emp.overtime.toFixed(1)}h OT` : null,
                            emp && canSeeMoney ? `£${Math.round(emp.cost).toLocaleString()}` : null,
                            emp && emp.pay_type !== 'hourly' && canSeeMoney
                              ? emp.pay_type === 'annual'
                                ? 'Salaried'
                                : 'Day rate'
                              : null,
                          ]
                            .filter(Boolean)
                            .join(' · ');
                    const missingCount =
                      activeTab !== 'pending'
                        ? (missingDaysByEmployee.get(group.employeeId)?.length ?? 0)
                        : 0;
                    return (
                      <div key={group.employeeId} className={panel}>
                        <Row
                          className="border-b border-white/[0.07]"
                          lead={<Initials name={group.name} />}
                          title={group.name}
                          detail={<span className="tabular-nums">{groupDetail}</span>}
                          trailing={
                            missingCount > 0 ? (
                              <Tag tone="outline">{missingCount} missing</Tag>
                            ) : undefined
                          }
                        />
                        <div className={rowsClass}>
                          {group.rows.map((ts) => {
                            // Base-rate value of this single entry. OT premium is a
                            // per-DAY concept, so it lives on the worker's header £,
                            // not on individual rows — hence "base" in the label.
                            const rowBaseCost = calculateLabourCost(ts.employeeId, ts.totalHours);
                            const isSelected = selectedTimesheetIds.includes(ts.id);
                            const flags = entryFlags.get(ts.id);
                            const selectable =
                              isSelectMode && !ts.isLive && ts.status === 'Pending';
                            return (
                              <Row
                                key={ts.id}
                                lead={
                                  selectable ? (
                                    <span onClick={(e) => e.stopPropagation()}>
                                      <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={() => toggleTimesheetSelection(ts.id)}
                                        className={checkboxClass}
                                      />
                                    </span>
                                  ) : undefined
                                }
                                title={
                                  <span className="tabular-nums">
                                    {ts.isLive ? 'On the clock' : `${ts.totalHours.toFixed(1)}h`}
                                    <span className="font-normal">
                                      {' '}
                                      · {format(parseISO(ts.date), 'EEE d MMM')}
                                    </span>
                                  </span>
                                }
                                detail={
                                  <>
                                    <span className="tabular-nums">
                                      {ts.isLive
                                        ? `${ts.clockIn}–now`
                                        : `${ts.clockIn}–${ts.clockOut}`}
                                    </span>{' '}
                                    · {ts.jobId ? ts.jobTitle : 'No job'}
                                    {ts.previousRejectionReason && ' · Resubmitted'}
                                  </>
                                }
                                trailing={
                                  ts.isLive ? (
                                    <Tag tone="green">Live</Tag>
                                  ) : (
                                    <>
                                      {canSeeMoney && (
                                        <span className="hidden text-[13px] text-white tabular-nums md:inline">
                                          £{Math.round(rowBaseCost).toLocaleString()} base
                                        </span>
                                      )}
                                      {flags ? (
                                        <Tag
                                          tone={flags[0].startsWith('Under 18') ? 'red' : 'outline'}
                                        >
                                          {flags[0]}
                                          {flags.length > 1 ? ` +${flags.length - 1}` : ''}
                                        </Tag>
                                      ) : activeTab !== 'pending' || ts.status !== 'Pending' ? (
                                        <Tag tone={tagForStatus(ts.status)}>{ts.status}</Tag>
                                      ) : null}
                                    </>
                                  )
                                }
                                chevron={!isSelectMode}
                                onClick={
                                  isSelectMode
                                    ? ts.isLive || ts.status !== 'Pending'
                                      ? undefined
                                      : () => toggleTimesheetSelection(ts.id)
                                    : () => setDetailTimesheet(ts)
                                }
                              />
                            );
                          })}
                        </div>
                        {!isSelectMode && groupClean.length > 0 && (
                          <div className="flex justify-end border-t border-white/[0.07] px-4 py-3 sm:px-5">
                            <button
                              type="button"
                              className={cn(rowBtnSecondary, 'w-full sm:w-auto')}
                              onClick={() =>
                                approveIds(
                                  groupClean.map((r) => r.id),
                                  groupPending.length - groupClean.length,
                                  firstName
                                )
                              }
                              disabled={batchApproveMutation.isPending}
                            >
                              <Check className="h-4 w-4" />
                              Approve {firstName}&apos;s {groupClean.length}{' '}
                              {groupClean.length === groupPending.length ? '' : 'clean '}
                              entr{groupClean.length === 1 ? 'y' : 'ies'}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className={colClass}>
              {clockPanel && <div className="hidden lg:block">{clockPanel}</div>}
              {payrollCheck && <div className="hidden lg:block">{payrollCheck}</div>}
              {activeTab !== 'pending' && (
                // The desktop-only panels above are display:none on a phone but
                // still take the column's margin, which doubled the gap.
                <section className="max-lg:!mt-0">
                  <PanelTitle title="Week totals" meta={weekLabel} />
                  <div className={cn(panel, rowsClass)}>
                    <KeyValue label="Entries" value={weekTimesheets.length} />
                    <KeyValue label="Workers" value={employeeBreakdown.length} />
                    {canSeeMoney ? (
                      <>
                        <KeyValue
                          label="Labour spend"
                          value={`£${Math.round(totalLabourCost).toLocaleString()}`}
                        />
                        <KeyValue
                          label="Approved spend"
                          value={`£${Math.round(approvedLabourCost).toLocaleString()}`}
                        />
                      </>
                    ) : (
                      <>
                        <KeyValue label="Hours" value={totalHours.toFixed(1)} />
                        <KeyValue label="Approved hours" value={approvedHours.toFixed(1)} />
                      </>
                    )}
                  </div>
                </section>
              )}
            </div>
          </div>
        </>
      )}

      {/* Filters sheet */}
      <FormSheet
        open={isFiltersOpen}
        onOpenChange={setIsFiltersOpen}
        title="Filter timesheets"
        description="Narrow the list to one worker or one status."
        width="lg"
        bodyClassName="grid gap-5 sm:grid-cols-2"
        footer={
          <PrimaryButton onClick={() => setIsFiltersOpen(false)} fullWidth size="lg">
            Apply
          </PrimaryButton>
        }
      >
        <div>
          <label className={fieldLabelClass}>Worker</label>
          <Select value={filterEmployee} onValueChange={setFilterEmployee}>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="All workers" />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              <SelectItem value="all">All workers</SelectItem>
              {employees.map((emp) => (
                <SelectItem key={emp.id} value={emp.id}>
                  {emp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className={fieldLabelClass}>Status</label>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className={selectTriggerClass}>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent className={selectContentClass}>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FormSheet>

      {/* Approve / reject detail sheet */}
      <FormSheet
        open={!!detailTimesheet}
        onOpenChange={(open) => {
          if (!open) {
            setDetailTimesheet(null);
            setRejectArmed(false);
            setRejectReason('');
          }
        }}
        title={detailTimesheet?.employeeName ?? 'Timesheet'}
        description={
          detailTimesheet ? format(parseISO(detailTimesheet.date), 'EEEE d MMMM yyyy') : undefined
        }
        headerTrailing={
          detailTimesheet ? (
            <Tag tone={detailTimesheet.isLive ? 'green' : tagForStatus(detailTimesheet.status)}>
              {detailTimesheet.isLive ? 'Live' : detailTimesheet.status}
            </Tag>
          ) : undefined
        }
        width="wide"
        bodyClassName="grid gap-5 [&>*]:min-w-0 lg:grid-cols-2 lg:gap-8 lg:items-start"
        footer={
          detailTimesheet && !detailTimesheet.isLive && detailTimesheet.status === 'Pending' ? (
            <div className="flex gap-2">
              <SecondaryButton
                data-help="timesheets.reject"
                onClick={() => handleReject(detailTimesheet.id)}
                fullWidth
                size="lg"
                disabled={
                  rejectTimesheetMutation.isPending ||
                  approveTimesheetMutation.isPending ||
                  (rejectArmed && rejectReason.trim().length < 3)
                }
              >
                <X className="h-4 w-4 mr-2" />
                {rejectArmed ? 'Send back' : 'Reject'}
              </SecondaryButton>
              <PrimaryButton
                data-help="timesheets.approve"
                onClick={() => handleApprove(detailTimesheet.id)}
                fullWidth
                size="lg"
                disabled={approveTimesheetMutation.isPending || rejectTimesheetMutation.isPending}
              >
                {approveTimesheetMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Approve
              </PrimaryButton>
            </div>
          ) : undefined
        }
      >
        {detailTimesheet && (
          <>
            <div className="space-y-4">
              <div>
                <div className="text-[40px] font-semibold leading-none text-white tabular-nums">
                  {detailTimesheet.totalHours.toFixed(1)}
                  <span className="text-[18px] font-medium">h</span>
                </div>
                {canSeeMoney && (
                  <div className="mt-2 text-[13px] text-white tabular-nums">
                    £
                    {Math.round(
                      calculateLabourCost(detailTimesheet.employeeId, detailTimesheet.totalHours)
                    ).toLocaleString()}{' '}
                    at base rate
                  </div>
                )}
              </div>

              {entryFlags.has(detailTimesheet.id) && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" />
                  <span className="text-[13px] text-white">
                    Worth a look: {entryFlags.get(detailTimesheet.id)!.join(' · ')}
                  </span>
                </div>
              )}
              {entryFlags.get(detailTimesheet.id)?.some((f) => f.startsWith('Under 18')) && (
                <p className="rounded-2xl border border-red-500/50 bg-white/[0.04] px-4 py-3 text-[13px] leading-snug text-white">
                  <span className="font-semibold text-red-300">Under-18 working time. </span>
                  The law allows 8 hours a day and 40 a week, with a 30 minute break after 4.5
                  hours, and there is no opt-out. Approving still pays the hours. Talk to them and
                  their supervisor about it.
                </p>
              )}

              {detailTimesheet.previousRejectionReason && (
                <div className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-3">
                  <p className="text-[13px] font-medium text-white">
                    Resubmitted
                    {detailTimesheet.resubmittedAt
                      ? ` ${format(parseISO(detailTimesheet.resubmittedAt), 'EEE d MMM, HH:mm')}`
                      : ''}{' '}
                    after:
                  </p>
                  <p className="mt-1 break-words text-[14px] leading-snug text-white">
                    “{detailTimesheet.previousRejectionReason}”
                  </p>
                </div>
              )}

              {detailTimesheet.isLive && (
                <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-3.5">
                  <PulseDot tone="emerald" />
                  <span className="text-[13px] font-medium text-white">
                    Still on the clock. Approve once they&apos;ve clocked out.
                  </span>
                </div>
              )}

              {rejectArmed && (
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium text-white">
                    Why? {detailTimesheet.employeeName.split(' ')[0]} sees this and can fix it
                  </label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value.slice(0, 500))}
                    placeholder="e.g. Clocked out 2h after leaving site. Please correct and resubmit"
                    autoFocus
                    rows={3}
                    className="w-full resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base text-white placeholder:text-white/35 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                  />
                </div>
              )}
            </div>

            {/* Details on the right so the wide sheet never leaves an empty column. */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04]">
                <div className={rowsClass}>
                  <Row
                    title="Job"
                    trailing={
                      <span className="max-w-[200px] truncate text-[14px] text-white">
                        {detailTimesheet.jobId ? detailTimesheet.jobTitle : 'No job'}
                      </span>
                    }
                    // Cross-link: open the job this time was booked against
                    onClick={
                      detailTimesheet.jobId
                        ? () => {
                            setDetailTimesheet(null);
                            navigate(`/employer?section=jobs&job=${detailTimesheet.jobId}`);
                          }
                        : undefined
                    }
                  />
                  <Row
                    title="Clocked"
                    trailing={
                      <span className="text-[14px] text-white tabular-nums">
                        {detailTimesheet.clockIn} – {detailTimesheet.clockOut}
                      </span>
                    }
                  />
                  <Row
                    title="Break"
                    trailing={
                      <span className="text-[14px] text-white tabular-nums">
                        {detailTimesheet.breakMins} mins
                      </span>
                    }
                  />
                  {canSeeMoney && (
                    <Row
                      title="Hourly rate"
                      trailing={
                        <span className="text-[14px] text-white tabular-nums">
                          {(() => {
                            const rate = getHourlyRate(detailTimesheet.employeeId);
                            if (rate === null) return 'No rate set';
                            const payType = employeesById.get(detailTimesheet.employeeId)?.pay_type;
                            return payType === 'annual'
                              ? `£${rate.toFixed(2)}/hr (salaried equiv.)`
                              : payType === 'day_rate'
                                ? `£${rate.toFixed(2)}/hr (day-rate equiv.)`
                                : `£${rate.toFixed(2)}/hr`;
                          })()}
                        </span>
                      }
                    />
                  )}
                  {detailTimesheet.notes && (
                    <div className="px-4 py-3 sm:px-5">
                      <div className="text-[15px] font-semibold text-white">Notes</div>
                      <p className="mt-0.5 whitespace-pre-wrap text-[13px] text-white">
                        {detailTimesheet.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <ClockLocationCard ts={detailTimesheet} />
            </div>
          </>
        )}
      </FormSheet>
      {isFirmAdmin && <TimesheetRulesSheet open={rulesOpen} onOpenChange={setRulesOpen} />}
      {isFirmAdmin && <PayPeriodSheet open={payPeriodOpen} onOpenChange={setPayPeriodOpen} />}
    </PageFrame>
  );
};

/** Where the phone was at clock-in / clock-out. Renders nothing when the
 *  phone was never asked (manual entries, older app) — nothing is invented. */
function ClockLocationCard({ ts }: { ts: DisplayTimesheet }) {
  const lines = [
    describeFix(ts.clockInFix, 'in', ts.site),
    ts.isLive ? null : describeFix(ts.clockOutFix, 'out', ts.site),
  ].filter((l): l is NonNullable<typeof l> => !!l);
  if (lines.length === 0) return null;
  return (
    <div className="-mx-5 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-5 sm:px-4 py-3 space-y-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
        Where the phone was
      </p>
      {lines.map((l, i) => (
        <div key={i} className="flex items-center gap-3">
          <MapPin
            className={cn(
              'h-4 w-4 shrink-0',
              l.tone === 'warn'
                ? 'text-orange-300'
                : l.tone === 'ok'
                  ? 'text-emerald-400'
                  : 'text-white'
            )}
          />
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                'text-[13.5px] leading-snug',
                l.tone === 'warn' ? 'text-orange-300 font-medium' : 'text-white'
              )}
            >
              {l.text}
            </p>
            {l.detail && <p className="text-[12px] text-white tabular-nums">{l.detail}</p>}
          </div>
          {l.mapUrl && (
            <a
              href={l.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 shrink-0 inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5 text-[12.5px] font-medium text-white touch-manipulation"
            >
              Map
            </a>
          )}
        </div>
      ))}
      {!ts.site && lines.some((l) => l.mapUrl) && (
        <p className="text-[11.5px] text-white leading-snug">
          The job has no map pin, so distance from site can't be worked out.
        </p>
      )}
    </div>
  );
}
