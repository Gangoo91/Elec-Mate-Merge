import { useMemo, useState } from 'react';
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  isWeekend,
  parseISO,
  startOfDay,
  startOfMonth,
  subMonths,
} from 'date-fns';
import { AlertTriangle, Check, ChevronLeft, ChevronRight, Loader2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import FormSheet from '@/components/forms/FormSheet';
import { panel, PanelTitle } from '@/components/employer/overview/HomeSections';
import {
  HeroActions,
  Initials,
  PlainEmpty,
  Row,
  Tag,
  colClass,
  heroBtn,
  frameClass,
  rowBtnPrimary,
  rowsClass,
  twoColClass,
} from '@/components/employer/pageParts/PageParts';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useEmployees } from '@/hooks/useEmployees';
import {
  statutoryHolidayDays,
  useAddTeamLeave,
  useDecideLeave,
  useSetTeamAllowance,
  useTeamAllowances,
  useTeamAssignments,
  useTeamLeaveRequests,
  type TeamAllowance,
  type TeamLeaveRequest,
} from '@/hooks/useTeamLeave';
import { cn } from '@/lib/utils';
import {
  PageHelpButton,
  HowItWorks,
  type PageHelpContent,
  type HelpBlocker,
} from '@/components/hub/PageHelp';
import {
  Field,
  IconButton,
  LoadingBlocks,
  PageFrame,
  PageHero,
  PrimaryButton,
  SecondaryButton,
  StatStrip,
  inputClass,
  selectTriggerClass,
  textareaClass,
  type Tone,
} from '@/components/employer/editorial';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { usePayProfiles } from '@/hooks/usePayLaw';
import { SicknessPanel } from '@/components/employer/payLaw/SicknessPanel';
import { PersonHolidayRecord } from '@/components/employer/payLaw/PersonHolidayRecord';
import { HOLIDAY_BASIS_LABEL } from '@/lib/payLaw';

/* ==========================================================================
   Leave — the office's own place for holiday (ELE-1953).

   Was a tab inside Timesheets, unreachable by URL, with a decline that sent
   "Declined" and no allowances. Now: requests waiting, a clash warning BEFORE
   approving (who else is off, and which booked jobs are left with nobody),
   decline-with-reason, allowances per person starting from the statutory
   minimum (pro-rata for part-time), and a month calendar.

   Same table the worker submits to (employer_leave_requests); decisions fire
   trg_notify_leave_decision, so nothing here sends its own notification.
   ========================================================================== */

type LeaveType = 'annual' | 'sick' | 'unpaid' | 'compassionate' | 'training' | 'bank_holiday';

const LEAVE_TYPES: { value: LeaveType; label: string; tone: Tone }[] = [
  { value: 'annual', label: 'Holiday', tone: 'blue' },
  { value: 'sick', label: 'Sick', tone: 'red' },
  { value: 'unpaid', label: 'Unpaid', tone: 'purple' },
  { value: 'compassionate', label: 'Compassionate', tone: 'indigo' },
  { value: 'training', label: 'Training', tone: 'cyan' },
  { value: 'bank_holiday', label: 'Bank holiday', tone: 'emerald' },
];
const typeInfo = (t: string) => LEAVE_TYPES.find((x) => x.value === t) ?? LEAVE_TYPES[0];

const STATUS_LABEL: Record<string, string> = {
  approved: 'Approved',
  pending: 'Waiting',
  rejected: 'Declined',
  cancelled: 'Cancelled',
};

const DAYS_PER_WEEK_CHOICES = [1, 2, 3, 4, 5];

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';
const chipBase =
  'h-11 px-4 rounded-full border text-[13px] transition-colors touch-manipulation whitespace-nowrap';

const dateRange = (lr: { startDate: string; endDate: string; halfDay?: string }) => {
  const s = parseISO(lr.startDate);
  const e = parseISO(lr.endDate);
  if (lr.halfDay) return `${format(s, 'EEE d MMM')} · ${lr.halfDay.toUpperCase()}`;
  if (isSameDay(s, e)) return format(s, 'EEE d MMM');
  return `${format(s, 'EEE d MMM')} – ${format(e, 'EEE d MMM')}`;
};

const daysLabel = (n: number) => `${n % 1 === 0 ? n : n.toFixed(1)} day${n === 1 ? '' : 's'}`;

/** Weekdays a request covers (a half day covers its start date). */
const leaveWeekdays = (lr: { startDate: string; endDate: string; halfDay?: string }) => {
  const s = parseISO(lr.startDate);
  const e = lr.halfDay ? s : parseISO(lr.endDate);
  if (e < s) return [];
  return eachDayOfInterval({ start: s, end: e }).filter((d) => !isWeekend(d));
};

const ACTIVE_ASSIGNMENT = (status: string) =>
  !['declined', 'removed', 'completed', 'cancelled', 'ended'].includes(status);

const LEAVE_HELP: PageHelpContent = {
  id: 'employer-leave',
  title: 'Leave',
  what: (
    <>
      Holiday and time-off requests from your team, who is off this week, and how much allowance
      each person has left.
    </>
  ),
  steps: [
    {
      title: 'Set each allowance',
      body: 'Tap a person under Allowances and give them their days for the year. Until you do, they are told to ask the office.',
    },
    {
      title: 'Decide requests',
      body: 'Requests from the app wait at the top. You see who else is off on those days before you approve or decline.',
    },
    {
      title: 'Book leave for someone',
      body: 'Use Book leave for time off agreed in person, so the diary and timesheets know they are away.',
    },
  ],
  notes: [
    {
      title: 'The legal minimum',
      body: '5.6 weeks a year: 28 days for someone full-time, less pro rata for part-time.',
    },
  ],
  tasks: [
    {
      title: 'Approve a request, checking for clashes',
      steps: [
        'Under Waiting for you, tap the request.',
        'Read Check before you approve: who else is off those days, and any job they are booked on with nobody else on it.',
        'For holiday, check Left after this against their allowance.',
        'Tap Approve. If there is a clash the button says Approve anyway.',
      ],
      after: 'They are told straight away, and the days show in Who’s off and on the calendar.',
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'leave.pending', caption: 'Tap a request to decide it.', opens: true },
        { target: 'leave.clash', caption: 'Check who else is off and which jobs it leaves short.' },
        {
          target: 'leave.approve',
          caption: 'Tap Approve, or Approve anyway if you are happy with the clash.',
        },
      ],
    },
    {
      title: 'Decline a request',
      steps: [
        'Tap the request.',
        'Tap Decline. A box opens.',
        'Say why (at least 3 letters), then tap Send decline.',
      ],
      after: 'They are told, with your reason.',
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'leave.pending', caption: 'Tap the request.', opens: true },
        { target: 'leave.decline', caption: 'Tap Decline, say why, then tap Send decline.' },
      ],
    },
    {
      title: 'Book leave for someone',
      steps: [
        'Tap Book leave.',
        'Pick who, the type (Holiday, Sick, Unpaid and so on), Full days, Morning or Afternoon, and the dates.',
        'Already agreed? Pick Yes, book it, or No, add as a request.',
        'Tap Book it (or Add request).',
      ],
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'leave.book', caption: 'Tap Book leave.', opens: true },
        {
          target: 'leave.agreed',
          caption: 'Fill in who and when, then say if it is already agreed.',
        },
        { target: 'leave.book-save', caption: 'Tap Book it to save.' },
      ],
    },
    {
      title: 'Set someone’s holiday allowance',
      steps: [
        'Under Allowances, tap the person. Not set shows as Set it.',
        'Pick the days they work a week. The legal minimum fills in.',
        'Change Allowance (days) if you give more, and add any Carried over.',
        'Tap Save. They can now see their balance.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [
        {
          target: 'leave.allowances',
          caption: 'Tap a person to set their allowance.',
          opens: true,
        },
        { target: 'leave.allowance-save', caption: 'Check the days, then tap Save.' },
      ],
    },
  ],
};

export function LeaveSection() {
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();
  const { data: leaveRequests = [], isLoading: leaveLoading } = useTeamLeaveRequests();
  const { data: allowances = [] } = useTeamAllowances();
  const { data: allAssignments = [] } = useTeamAssignments();
  const decideLeave = useDecideLeave();
  const addLeave = useAddTeamLeave();
  const setAllowance = useSetTeamAllowance();
  // ELE-2062: holiday basis (fixed days or 12.07% of hours) and sickness are
  // owner/admin only, because they carry pay and health information.
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = roleInfo?.canSeeMoney ?? false;
  const { data: payProfiles } = usePayProfiles(canSeeMoney);
  const basisOf = (id: string) => payProfiles?.get(id)?.holidayBasis ?? 'fixed';

  // ELE-1830: subcontractors have no holiday allowance, so they are left out
  // of allowances and the "no allowance set" counts.
  const activeStaff = useMemo(
    () =>
      employees.filter(
        (e) => (e.status || '').toLowerCase() === 'active' && e.team_role !== 'Subcontractor'
      ),
    [employees]
  );
  const subcontractorCount = useMemo(
    () =>
      employees.filter(
        (e) => (e.status || '').toLowerCase() === 'active' && e.team_role === 'Subcontractor'
      ).length,
    [employees]
  );
  const rosterIds = useMemo(() => new Set(employees.map((e) => e.id)), [employees]);
  const nameOf = (id: string) => employees.find((e) => e.id === id)?.name ?? 'Someone';

  // Diary = job bookings (employer_job_assignments), scoped to this roster.
  const assignments = useMemo(
    () => allAssignments.filter((a) => rosterIds.has(a.employeeId) && ACTIVE_ASSIGNMENT(a.status)),
    [allAssignments, rosterIds]
  );

  const pending = useMemo(
    () =>
      leaveRequests
        .filter((lr) => lr.status === 'pending')
        .sort((a, b) => a.startDate.localeCompare(b.startDate)),
    [leaveRequests]
  );
  const decided = useMemo(
    () => leaveRequests.filter((lr) => lr.status !== 'pending').slice(0, 30),
    [leaveRequests]
  );
  const offOn = (day: Date, statuses: string[] = ['approved']) => {
    const d = format(day, 'yyyy-MM-dd');
    return leaveRequests.filter(
      (lr) =>
        statuses.includes(lr.status) &&
        lr.startDate <= d &&
        (lr.halfDay ? lr.startDate : lr.endDate) >= d
    );
  };

  /* ── Clash check: what the boss needs BEFORE tapping Approve ─────────── */
  const clashesFor = (lr: TeamLeaveRequest) => {
    const days = leaveWeekdays(lr);
    const dayKeys = days.map((d) => format(d, 'yyyy-MM-dd'));

    // Everyone else off (approved or asked for) on any of these days
    const others = new Map<string, { name: string; status: string; days: number }>();
    leaveRequests
      .filter(
        (o) =>
          o.id !== lr.id &&
          o.employeeId !== lr.employeeId &&
          (o.status === 'approved' || o.status === 'pending')
      )
      .forEach((o) => {
        const overlap = dayKeys.filter(
          (k) => o.startDate <= k && (o.halfDay ? o.startDate : o.endDate) >= k
        ).length;
        if (overlap === 0) return;
        const prev = others.get(o.employeeId);
        others.set(o.employeeId, {
          name: o.employeeName || nameOf(o.employeeId),
          status: prev?.status === 'approved' ? 'approved' : o.status,
          days: Math.max(prev?.days ?? 0, overlap),
        });
      });

    // Booked jobs on those days, and whether anyone else is on them
    const approvedOffOn = (empId: string, key: string) =>
      leaveRequests.some(
        (o) =>
          o.employeeId === empId &&
          o.status === 'approved' &&
          o.startDate <= key &&
          (o.halfDay ? o.startDate : o.endDate) >= key
      );
    const jobs = new Map<
      string,
      { jobTitle: string; bookedDays: string[]; uncoveredDays: string[]; cover: Set<string> }
    >();
    assignments
      .filter((a) => a.employeeId === lr.employeeId)
      .forEach((a) => {
        dayKeys.forEach((k) => {
          if (a.startDate > k || (a.endDate !== null && a.endDate < k)) return;
          const entry = jobs.get(a.jobId) ?? {
            jobTitle: a.jobTitle,
            bookedDays: [],
            uncoveredDays: [],
            cover: new Set<string>(),
          };
          if (entry.bookedDays.includes(k)) return;
          entry.bookedDays.push(k);
          const cover = assignments.filter(
            (b) =>
              b.jobId === a.jobId &&
              b.employeeId !== lr.employeeId &&
              b.startDate <= k &&
              (b.endDate === null || b.endDate >= k) &&
              !approvedOffOn(b.employeeId, k)
          );
          if (cover.length === 0) entry.uncoveredDays.push(k);
          cover.forEach((c) => entry.cover.add(nameOf(c.employeeId)));
          jobs.set(a.jobId, entry);
        });
      });

    // Busiest day: how many of the active team would be off at once
    let worstDay: { key: string; off: number } | null = null;
    dayKeys.forEach((k) => {
      const off =
        new Set(
          leaveRequests
            .filter(
              (o) =>
                o.employeeId !== lr.employeeId &&
                o.status === 'approved' &&
                o.startDate <= k &&
                (o.halfDay ? o.startDate : o.endDate) >= k
            )
            .map((o) => o.employeeId)
        ).size + 1;
      if (!worstDay || off > worstDay.off) worstDay = { key: k, off };
    });

    const alsoOff = [...others.values()];
    const jobList = [...jobs.values()];
    const uncovered = jobList.filter((j) => j.uncoveredDays.length > 0);
    return {
      alsoOff,
      jobs: jobList,
      uncovered,
      worstDay: worstDay as { key: string; off: number } | null,
      any: alsoOff.length > 0 || jobList.length > 0,
    };
  };

  const clashLine = (lr: TeamLeaveRequest) => {
    const c = clashesFor(lr);
    const parts: string[] = [];
    if (c.uncovered.length > 0) {
      const j = c.uncovered[0];
      parts.push(
        `${j.jobTitle} has nobody on ${format(parseISO(j.uncoveredDays[0]), 'EEE d MMM')}`
      );
    } else if (c.jobs.length > 0) {
      parts.push(`Booked on ${c.jobs.length} job${c.jobs.length === 1 ? '' : 's'}`);
    }
    if (c.alsoOff.length > 0) {
      const names = c.alsoOff.map((o) => o.name.split(' ')[0]);
      parts.push(
        `${names.slice(0, 2).join(' and ')}${names.length > 2 ? ` +${names.length - 2}` : ''} also off`
      );
    }
    return parts.join(' · ');
  };

  const allowanceFor = (employeeId: string): TeamAllowance | undefined =>
    allowances.find((a) => a.employeeId === employeeId);
  const remainingOf = (a: TeamAllowance) =>
    a.totalDays + a.carriedOver - a.usedDays - a.pendingDays;

  /* ── Decide sheet ───────────────────────────────────────────────────── */
  const [deciding, setDeciding] = useState<TeamLeaveRequest | null>(null);
  const [declineMode, setDeclineMode] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [decideHours, setDecideHours] = useState('');
  const closeDecide = () => {
    setDeciding(null);
    setDeclineMode(false);
    setDeclineReason('');
    setDecideHours('');
  };
  const approve = async (lr: TeamLeaveRequest) => {
    const h = decideHours.trim() === '' ? null : Number(decideHours);
    if (h !== null && (!Number.isFinite(h) || h < 0 || h > 2000)) {
      toast.error('Check the hours of holiday');
      return;
    }
    try {
      await decideLeave.mutateAsync({ id: lr.id, decision: 'approved', hours: h });
      toast.success(`${lr.employeeName.split(' ')[0] || 'Their'} leave approved`, {
        description: 'They have been told.',
      });
      closeDecide();
    } catch (err) {
      toast.error('Not approved', {
        description: err instanceof Error ? err.message : 'Try again.',
      });
    }
  };
  const decline = async (lr: TeamLeaveRequest) => {
    if (!declineMode) {
      setDeclineMode(true);
      return;
    }
    if (declineReason.trim().length < 3) {
      toast.error('Add a short reason', { description: 'They see it with the decision.' });
      return;
    }
    try {
      await decideLeave.mutateAsync({ id: lr.id, decision: 'rejected', reason: declineReason });
      toast.success('Declined', { description: 'They have been told why.' });
      closeDecide();
    } catch (err) {
      toast.error('Not declined', {
        description: err instanceof Error ? err.message : 'Try again.',
      });
    }
  };

  /* ── Log leave sheet ────────────────────────────────────────────────── */
  const [logOpen, setLogOpen] = useState(false);
  const [logPerson, setLogPerson] = useState('');
  const [logType, setLogType] = useState<LeaveType>('annual');
  const [logStart, setLogStart] = useState('');
  const [logEnd, setLogEnd] = useState('');
  const [logHalf, setLogHalf] = useState<'' | 'am' | 'pm'>('');
  const [logNote, setLogNote] = useState('');
  const [logAgreed, setLogAgreed] = useState(true);
  const [logHours, setLogHours] = useState('');
  const openLog = () => {
    setLogHours('');
    setLogPerson('');
    setLogType('annual');
    const today = format(new Date(), 'yyyy-MM-dd');
    setLogStart(today);
    setLogEnd(today);
    setLogHalf('');
    setLogNote('');
    setLogAgreed(true);
    setLogOpen(true);
  };
  const logDays = (() => {
    if (!logStart) return 0;
    if (logHalf) return 0.5;
    if (!logEnd || logEnd < logStart) return 0;
    return leaveWeekdays({ startDate: logStart, endDate: logEnd }).length;
  })();
  const saveLog = async () => {
    const emp = employees.find((e) => e.id === logPerson);
    if (!emp) {
      toast.error('Pick who it is for');
      return;
    }
    if (!logStart || (!logHalf && (!logEnd || logEnd < logStart))) {
      toast.error('Check the dates', { description: 'The last day can’t be before the first.' });
      return;
    }
    if (logDays === 0) {
      toast.error('Those dates are all weekend', { description: 'Nothing to book.' });
      return;
    }
    try {
      await addLeave.mutateAsync({
        employeeId: emp.id,
        employeeName: emp.name,
        type: logType,
        startDate: logStart,
        endDate: logHalf ? logStart : logEnd,
        halfDay: logHalf || undefined,
        totalDays: logDays,
        reason: logNote.trim() || undefined,
        approved: logAgreed,
        hours:
          logType === 'annual' && logHours.trim() !== '' && Number.isFinite(Number(logHours))
            ? Number(logHours)
            : null,
      });
      toast.success(logAgreed ? 'Leave booked' : 'Request added', {
        description: `${emp.name}, ${daysLabel(logDays)}.`,
      });
      setLogOpen(false);
    } catch (err) {
      toast.error('Not saved', { description: err instanceof Error ? err.message : 'Try again.' });
    }
  };

  /* ── Allowance sheet ────────────────────────────────────────────────── */
  const [allowanceFor_, setAllowanceFor_] = useState<string | null>(null);
  const [dpw, setDpw] = useState<number>(5);
  const [dpwCustom, setDpwCustom] = useState('');
  const [totalDraft, setTotalDraft] = useState('');
  const [carriedDraft, setCarriedDraft] = useState('0');
  const openAllowance = (employeeId: string) => {
    const a = allowanceFor(employeeId);
    const days = a?.daysPerWeek ?? 5;
    setDpw(days);
    setDpwCustom(DAYS_PER_WEEK_CHOICES.includes(days) ? '' : String(days));
    setTotalDraft(String(a ? a.totalDays : statutoryHolidayDays(days)));
    setCarriedDraft(String(a?.carriedOver ?? 0));
    setAllowanceFor_(employeeId);
  };
  const effectiveDpw = dpwCustom ? Number(dpwCustom) : dpw;
  const statutory =
    Number.isFinite(effectiveDpw) && effectiveDpw > 0 ? statutoryHolidayDays(effectiveDpw) : 0;
  const pickDpw = (n: number) => {
    setDpw(n);
    setDpwCustom('');
    setTotalDraft(String(statutoryHolidayDays(n)));
  };
  const saveAllowance = async () => {
    if (!allowanceFor_) return;
    const total = Number(totalDraft);
    const carried = Number(carriedDraft || 0);
    if (!Number.isFinite(effectiveDpw) || effectiveDpw < 0.5 || effectiveDpw > 7) {
      toast.error('Days a week must be between 0.5 and 7');
      return;
    }
    if (!Number.isInteger(total) || total < 0 || total > 60) {
      toast.error('Allowance must be whole days, 0 to 60');
      return;
    }
    if (!Number.isInteger(carried) || carried < 0 || carried > 30) {
      toast.error('Carried over must be whole days, 0 to 30');
      return;
    }
    try {
      await setAllowance.mutateAsync({
        employeeId: allowanceFor_,
        totalDays: total,
        carriedOver: carried,
        daysPerWeek: Math.round(effectiveDpw * 2) / 2,
      });
      toast.success('Allowance saved', {
        description: `${nameOf(allowanceFor_).split(' ')[0]} can now see their balance.`,
      });
      setAllowanceFor_(null);
    } catch (err) {
      toast.error('Allowance not saved', {
        description: err instanceof Error ? err.message : 'Try again.',
      });
    }
  };

  /* ── Calendar ───────────────────────────────────────────────────────── */
  const [calMonth, setCalMonth] = useState(new Date());
  const [calDay, setCalDay] = useState<Date | null>(null);
  const monthStart = startOfMonth(calMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: endOfMonth(calMonth) });
  const next7 = Array.from({ length: 7 }, (_, i) => addDays(startOfDay(new Date()), i));

  const offToday = offOn(startOfDay(new Date())).length;
  const offThisWeek = new Set(next7.flatMap((d) => offOn(d).map((lr) => lr.employeeId))).size;
  // ELE-2062: irregular-hours and part-year workers build up holiday in hours
  // (12.07%), so they need no days allowance.
  const inHours = (id: string) => basisOf(id) !== 'fixed';
  const allowancesSet = activeStaff.filter((e) => allowanceFor(e.id) || inHours(e.id)).length;

  if (employeesLoading || leaveLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero
          title="Leave"
          description="Holiday requests, who's off, and everyone's allowance."
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] = [];
  const firstWithoutAllowance = activeStaff.find((e) => !allowanceFor(e.id) && !inHours(e.id));
  if (activeStaff.length === 0) {
    helpBlockers.push({
      text: 'No one on the team yet. Add your team first, then set their holiday.',
    });
  } else if (firstWithoutAllowance) {
    const missing = activeStaff.length - allowancesSet;
    helpBlockers.push({
      text: `${missing} ${missing === 1 ? 'person has' : 'people have'} no holiday allowance, so they are told to ask the office.`,
      fixLabel: missing === 1 ? 'Set allowance' : 'Set allowances',
      onFix: () => openAllowance(firstWithoutAllowance.id),
    });
  }

  const decidingClash = deciding ? clashesFor(deciding) : null;
  const decidingAllowance = deciding ? allowanceFor(deciding.employeeId) : undefined;

  // Where leave stands, in one line.
  const missingAllowances = activeStaff.length - allowancesSet;
  const heroLine = (() => {
    const first =
      pending.length > 0
        ? `${pending.length} ${pending.length === 1 ? 'request' : 'requests'} to decide`
        : 'Nothing to decide';
    const off = offToday > 0 ? `${offToday} off today` : 'nobody off today';
    const rest =
      missingAllowances > 0
        ? `, ${missingAllowances} ${missingAllowances === 1 ? 'allowance' : 'allowances'} still to set`
        : '';
    return `${first}, ${off}${rest}.`;
  })();

  const leaveTag = (status: string) => (
    <Tag
      tone={
        status === 'approved'
          ? 'done'
          : status === 'pending'
            ? 'yellow'
            : status === 'rejected'
              ? 'red'
              : 'outline'
      }
    >
      {STATUS_LABEL[status] ?? status}
    </Tag>
  );

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Leave"
        description={heroLine}
        actions={
          <HeroActions stretchFirst>
            <PrimaryButton data-help="leave.book" onClick={openLog} className={heroBtn}>
              <Plus className="h-4 w-4 mr-1.5" />
              Book leave
            </PrimaryButton>
            <PageHelpButton
              help={LEAVE_HELP}
              blockers={helpBlockers}
              askContext={{ page: 'leave' }}
            />
          </HeroActions>
        }
      />

      <HowItWorks help={LEAVE_HELP} blockers={helpBlockers} askContext={{ page: 'leave' }} />

      <StatStrip
        columns={4}
        stats={[
          {
            label: 'Waiting',
            value: pending.length,
            tone: pending.length > 0 ? 'yellow' : undefined,
            sub: pending.length === 0 ? 'Nothing to decide' : 'Tap one to decide',
          },
          { label: 'Off today', value: offToday, sub: offToday === 0 ? 'Everyone in' : 'On leave' },
          { label: 'Off next 7 days', value: offThisWeek, sub: 'Approved leave' },
          {
            label: 'Allowances set',
            value: `${allowancesSet}/${activeStaff.length}`,
            tone: allowancesSet < activeStaff.length ? 'yellow' : undefined,
            sub: allowancesSet < activeStaff.length ? 'Set the rest below' : 'Everyone has one',
          },
        ]}
      />

      <div className={twoColClass}>
        <div className={colClass}>
          {/* Waiting for a decision */}
          {pending.length > 0 && (
            <section data-help="leave.pending">
              <PanelTitle title="Waiting for you" meta={pending.length} />
              <div className={cn(panel, rowsClass)}>
                {pending.map((lr) => {
                  const t = typeInfo(lr.type);
                  const line = clashLine(lr);
                  const a = allowanceFor(lr.employeeId);
                  return (
                    <Row
                      key={lr.id}
                      onClick={() => setDeciding(lr)}
                      chevron={false}
                      lead={<Initials name={lr.employeeName} />}
                      title={lr.employeeName}
                      detail={
                        <span className="tabular-nums">
                          {t.label} · {dateRange(lr)} · {daysLabel(lr.totalDays)}
                          {/* Gap §4.14: no days counter when holiday is built up in hours. */}
                          {lr.type === 'annual' && a && !inHours(lr.employeeId)
                            ? ` · ${remainingOf(a)} of ${a.totalDays + a.carriedOver} left after`
                            : ''}
                        </span>
                      }
                      meta={
                        line ? (
                          <span className="flex items-start gap-1.5 text-elec-yellow">
                            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            <span>{line}</span>
                          </span>
                        ) : undefined
                      }
                      trailing={<span className={rowBtnPrimary}>Decide</span>}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {/* Next 7 days */}
          <section>
            <PanelTitle title="Who's off" meta="Next 7 days" />
            <div className={panel}>
              {/* Phone: one row per day */}
              <div className={cn(rowsClass, 'sm:hidden')}>
                {next7.map((day) => {
                  const off = offOn(day, ['approved', 'pending']);
                  const weekend = isWeekend(day);
                  const today = isSameDay(day, new Date());
                  return (
                    <div
                      key={day.toISOString()}
                      className="flex min-h-[48px] items-center justify-between gap-3 px-4 py-2.5"
                    >
                      <span
                        className={cn(
                          'text-[14px] font-semibold',
                          today ? 'text-elec-yellow' : 'text-white'
                        )}
                      >
                        {today ? 'Today' : format(day, 'EEE d MMM')}
                      </span>
                      <span className="min-w-0 truncate text-right text-[14px]">
                        {weekend ? (
                          <span className="text-white">Weekend</span>
                        ) : off.length === 0 ? (
                          <span className="text-white">All in</span>
                        ) : (
                          off.map((lr, i) => (
                            <span
                              key={lr.id}
                              className={
                                lr.status === 'pending' ? 'text-elec-yellow' : 'text-white'
                              }
                            >
                              {i > 0 ? ', ' : ''}
                              {lr.employeeName.split(' ')[0]}
                            </span>
                          ))
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Wider: the week across */}
              <div className="hidden grid-cols-7 divide-x divide-white/[0.07] sm:grid">
                {next7.map((day) => {
                  const off = offOn(day, ['approved', 'pending']);
                  const weekend = isWeekend(day);
                  const today = isSameDay(day, new Date());
                  return (
                    <div key={day.toISOString()} className="min-w-0 px-3 py-3">
                      <div
                        className={cn(
                          'text-[13px] font-semibold',
                          today ? 'text-elec-yellow' : 'text-white'
                        )}
                      >
                        {today ? 'Today' : format(day, 'EEE d')}
                      </div>
                      {weekend ? (
                        <div className="mt-1 text-[13px] text-white">Weekend</div>
                      ) : off.length === 0 ? (
                        <div className="mt-1 text-[13px] text-white">All in</div>
                      ) : (
                        <div className="mt-1 space-y-0.5">
                          {off.slice(0, 3).map((lr) => (
                            <div
                              key={lr.id}
                              className={cn(
                                'truncate text-[13px] font-medium',
                                lr.status === 'pending' ? 'text-elec-yellow' : 'text-white'
                              )}
                            >
                              {lr.employeeName.split(' ')[0]}
                            </div>
                          ))}
                          {off.length > 3 && (
                            <div className="text-[12px] text-white">+{off.length - 3} more</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="mt-2 text-[13px] text-white">
              Names in <span className="font-semibold text-elec-yellow">yellow</span> have asked and
              are waiting for you.
            </p>
          </section>

          {/* Allowances */}
          <section>
            <PanelTitle title="Allowances" meta={new Date().getFullYear()} />
            <p className="-mt-1 mb-3 text-[13px] text-white">
              The legal minimum is 5.6 weeks (28 days full-time, less pro rata). Tap someone to set
              theirs.
              {subcontractorCount > 0 &&
                ` Your ${subcontractorCount} subcontractor${subcontractorCount === 1 ? ' is' : 's are'} not listed: subbies have no holiday allowance.`}
            </p>
            {activeStaff.length === 0 ? (
              <div className={panel}>
                <PlainEmpty
                  bare
                  text="No one on the team yet. Add your team first, then set their holiday."
                />
              </div>
            ) : (
              <div data-help="leave.allowances" className={cn(panel, rowsClass)}>
                {activeStaff.map((emp) => {
                  const a = allowanceFor(emp.id);
                  const total = a ? a.totalDays + a.carriedOver : 0;
                  const left = a ? remainingOf(a) : 0;
                  return (
                    <Row
                      key={emp.id}
                      lead={<Initials name={emp.name} />}
                      title={emp.name}
                      detail={
                        a
                          ? `${a.usedDays} taken${a.pendingDays > 0 ? ` · ${a.pendingDays} asked for` : ''}${
                              a.daysPerWeek ? ` · ${a.daysPerWeek} days a week` : ''
                            }${basisOf(emp.id) !== 'fixed' ? ` · ${HOLIDAY_BASIS_LABEL[basisOf(emp.id)].toLowerCase()}` : ''}`
                          : inHours(emp.id)
                            ? 'Builds up 12.07% of hours worked'
                            : 'Not set yet, so they ask the office'
                      }
                      trailing={
                        inHours(emp.id) ? (
                          // Gap §4.14: built up in hours, so no "X of Y days left".
                          <Tag tone="neutral">In hours</Tag>
                        ) : a ? (
                          <span className="text-right">
                            <span
                              className={cn(
                                'block text-[15px] font-semibold tabular-nums',
                                left < 0 ? 'text-red-400' : 'text-white'
                              )}
                            >
                              {left}
                              <span className="text-[13px] font-normal text-white"> / {total}</span>
                            </span>
                            <span className="block text-[12px] text-white">left</span>
                          </span>
                        ) : (
                          <Tag tone="outline">Set it</Tag>
                        )
                      }
                      onClick={() => openAllowance(emp.id)}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <div className={colClass}>
          {/* Month calendar */}
          <section>
            <PanelTitle title={format(calMonth, 'MMMM yyyy')} />
            <div className={cn(panel, 'p-3 sm:p-4')}>
              <div className="mb-2 flex items-center justify-between gap-2">
                <IconButton
                  onClick={() => setCalMonth(subMonths(calMonth, 1))}
                  aria-label="Previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </IconButton>
                <span className="text-[13px] text-white">
                  {calDay ? format(calDay, 'EEEE d MMMM') : 'Tap a day for names'}
                </span>
                <IconButton
                  onClick={() => setCalMonth(addMonths(calMonth, 1))}
                  aria-label="Next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </IconButton>
              </div>
              <div className="mb-1 grid grid-cols-7 gap-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div key={i} className="py-1 text-center text-[12px] font-semibold text-white">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: (monthStart.getDay() + 6) % 7 }).map((_, i) => (
                  <div key={`pad-${i}`} />
                ))}
                {monthDays.map((day) => {
                  const off = offOn(day, ['approved', 'pending']);
                  const today = isSameDay(day, new Date());
                  const selected = calDay && isSameDay(day, calDay);
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setCalDay(selected ? null : day)}
                      className={cn(
                        'flex h-11 flex-col items-center justify-center rounded-lg text-[13px] transition-colors touch-manipulation',
                        selected
                          ? 'bg-elec-yellow font-semibold text-black'
                          : off.length > 0 && !isWeekend(day)
                            ? 'bg-white/[0.08] text-white'
                            : 'text-white hover:bg-white/[0.04]',
                        today && !selected && 'ring-1 ring-elec-yellow'
                      )}
                    >
                      <span className="leading-none tabular-nums">{format(day, 'd')}</span>
                      {off.length > 0 && (
                        <span className="mt-1 flex gap-0.5">
                          {off.slice(0, 3).map((lr) => (
                            <span
                              key={lr.id}
                              className={cn(
                                'h-1.5 w-1.5 rounded-full',
                                selected
                                  ? 'bg-black'
                                  : lr.status === 'approved'
                                    ? 'bg-emerald-400'
                                    : 'bg-elec-yellow'
                              )}
                            />
                          ))}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 border-t border-white/[0.07] pt-3">
                {calDay ? (
                  offOn(calDay, ['approved', 'pending']).length === 0 ? (
                    <div className="text-[13px] text-white">Everyone in.</div>
                  ) : (
                    <div className="space-y-1.5">
                      {offOn(calDay, ['approved', 'pending']).map((lr) => (
                        <div
                          key={lr.id}
                          className="flex items-center justify-between gap-2 text-[14px] text-white"
                        >
                          <span className="truncate">
                            {lr.employeeName}
                            <span className="text-[13px]"> · {typeInfo(lr.type).label}</span>
                          </span>
                          {lr.status === 'pending' && <Tag tone="yellow">Asked</Tag>}
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-4 text-[13px] text-white">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" /> Approved
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-elec-yellow" /> Asked for
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Office managers record absences and fit notes too; pay stays owner/admin (gap 3C #33). */}
          {(canSeeMoney || roleInfo?.role === 'office') && (
            <SicknessPanel leave={leaveRequests} canSeeMoney={canSeeMoney} />
          )}

          {/* History */}
          <section>
            <PanelTitle title="Decided" meta={decided.length > 0 ? 'Last 30' : undefined} />
            <div className={cn(panel, decided.length > 0 && rowsClass)}>
              {decided.length === 0 ? (
                <PlainEmpty bare text="Approved, declined and cancelled leave shows here." />
              ) : (
                decided.map((lr) => (
                  <Row
                    key={lr.id}
                    title={lr.employeeName}
                    detail={
                      lr.status === 'rejected' && lr.rejectedReason
                        ? `${dateRange(lr)} · “${lr.rejectedReason}”`
                        : `${dateRange(lr)} · ${typeInfo(lr.type).label} · ${daysLabel(lr.totalDays)}`
                    }
                    trailing={leaveTag(lr.status)}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ── Decide sheet ─────────────────────────────────────────────── */}
      <FormSheet
        open={!!deciding}
        onOpenChange={(o) => !o && closeDecide()}
        title={deciding?.employeeName ?? 'Leave request'}
        description={
          deciding
            ? `${typeInfo(deciding.type).label} · ${dateRange(deciding)} · ${daysLabel(deciding.totalDays)}`
            : undefined
        }
        width="wide"
        bodyClassName="grid gap-5 [&>*]:min-w-0 lg:grid-cols-2 lg:gap-8 lg:items-start"
        footer={
          deciding && decidingClash ? (
            <div className="flex gap-2">
              <SecondaryButton
                data-help="leave.decline"
                fullWidth
                size="lg"
                onClick={() => decline(deciding)}
                disabled={decideLeave.isPending || (declineMode && declineReason.trim().length < 3)}
              >
                <X className="h-4 w-4 mr-1.5" />
                {declineMode ? 'Send decline' : 'Decline'}
              </SecondaryButton>
              <PrimaryButton
                data-help="leave.approve"
                fullWidth
                size="lg"
                onClick={() => approve(deciding)}
                disabled={decideLeave.isPending}
              >
                {decideLeave.isPending ? (
                  <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                ) : (
                  <Check className="h-4 w-4 mr-1.5" />
                )}
                {decidingClash.uncovered.length > 0 || decidingClash.alsoOff.length > 0
                  ? 'Approve anyway'
                  : 'Approve'}
              </PrimaryButton>
            </div>
          ) : undefined
        }
      >
        {deciding && decidingClash && (
          <>
            <div className="space-y-4">
              {deciding.reason && (
                <div>
                  <div className="text-[13px] font-medium text-white">Their note</div>
                  <p className="mt-1 text-[15px] text-white">“{deciding.reason}”</p>
                </div>
              )}

              {deciding.type === 'annual' && (
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                  {decidingAllowance && deciding && basisOf(deciding.employeeId) !== 'fixed' ? (
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] text-white">Holiday</span>
                      <span className="text-[14px] text-white">Counted in hours, not days</span>
                    </div>
                  ) : decidingAllowance ? (
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14px] text-white">Left after this</span>
                      <span
                        className={cn(
                          'text-[18px] font-semibold tabular-nums',
                          remainingOf(decidingAllowance) < 0 ? 'text-red-400' : 'text-white'
                        )}
                      >
                        {remainingOf(decidingAllowance)}
                        <span className="text-[13px] font-normal text-white">
                          {' '}
                          of {decidingAllowance.totalDays + decidingAllowance.carriedOver} days
                        </span>
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[14px] text-white">No allowance set yet</span>
                      <button
                        onClick={() => {
                          const id = deciding.employeeId;
                          closeDecide();
                          openAllowance(id);
                        }}
                        className="h-11 px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                      >
                        Set it
                      </button>
                    </div>
                  )}
                  {decidingAllowance && remainingOf(decidingAllowance) < 0 && (
                    <p className="mt-2 text-[13px] font-medium text-red-300">
                      This takes them over their allowance.
                    </p>
                  )}
                </div>
              )}

              {canSeeMoney &&
                deciding.type === 'annual' &&
                basisOf(deciding.employeeId) !== 'fixed' && (
                  <Field
                    label="Hours of holiday"
                    hint={`${HOLIDAY_BASIS_LABEL[basisOf(deciding.employeeId)]}: their holiday is counted in hours. Put the hours they would have worked.`}
                  >
                    <input
                      inputMode="decimal"
                      value={decideHours}
                      onChange={(e) => setDecideHours(e.target.value.replace(/[^0-9.]/g, ''))}
                      placeholder={deciding.hours != null ? String(deciding.hours) : 'e.g. 16'}
                      className={inputClass}
                    />
                  </Field>
                )}

              {declineMode && (
                <Field label={`Why not? ${deciding.employeeName.split(' ')[0]} sees this`}>
                  <textarea
                    value={declineReason}
                    onChange={(e) => setDeclineReason(e.target.value.slice(0, 300))}
                    placeholder="e.g. Two others already off that week. Could you do the week after?"
                    rows={3}
                    autoFocus
                    className={textareaClass}
                  />
                </Field>
              )}
            </div>

            {/* Clash warning — before the decision, not after */}
            {decidingClash.any ? (
              <div
                data-help="leave.clash"
                className="space-y-2.5 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-3"
              >
                <div className="flex items-center gap-2 text-[15px] font-semibold text-white">
                  <AlertTriangle className="h-4 w-4 text-elec-yellow" />
                  Check before you approve
                </div>
                {decidingClash.alsoOff.length > 0 && (
                  <p className="text-[14px] text-white">
                    {decidingClash.alsoOff
                      .map((o) => `${o.name}${o.status === 'pending' ? ' (asked)' : ''}`)
                      .join(', ')}{' '}
                    {decidingClash.alsoOff.length === 1 ? 'is' : 'are'} off then too.
                    {decidingClash.worstDay &&
                    decidingClash.worstDay.off > 1 &&
                    activeStaff.length > 0
                      ? ` ${decidingClash.worstDay.off} of ${activeStaff.length} off on ${format(parseISO(decidingClash.worstDay.key), 'EEE d MMM')}.`
                      : ''}
                  </p>
                )}
                {decidingClash.jobs.map((j) => (
                  <p key={j.jobTitle} className="text-[14px] text-white">
                    Booked on <span className="font-semibold">{j.jobTitle}</span> for{' '}
                    {daysLabel(j.bookedDays.length)}.{' '}
                    {j.uncoveredDays.length > 0 ? (
                      <span className="font-medium text-red-300">
                        Nobody else on it{' '}
                        {j.uncoveredDays
                          .slice(0, 3)
                          .map((k) => format(parseISO(k), 'EEE d MMM'))
                          .join(', ')}
                        {j.uncoveredDays.length > 3 ? ` +${j.uncoveredDays.length - 3}` : ''}.
                      </span>
                    ) : (
                      <span>{[...j.cover].slice(0, 2).join(' and ')} still on it.</span>
                    )}
                  </p>
                ))}
              </div>
            ) : (
              <div
                data-help="leave.clash"
                className="flex items-start gap-2.5 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-[14px] text-white"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                No clashes: nobody else is off and they aren&apos;t booked on a job those days.
              </div>
            )}
          </>
        )}
      </FormSheet>

      {/* ── Book leave sheet ─────────────────────────────────────────── */}
      <FormSheet
        open={logOpen}
        onOpenChange={setLogOpen}
        title="Book leave"
        description="For time off you've already agreed, or a request taken by phone."
        width="wide"
        bodyClassName="grid gap-5 [&>*]:min-w-0 lg:grid-cols-2 lg:gap-8 lg:items-start"
        footer={
          <div className="flex gap-2">
            <SecondaryButton fullWidth size="lg" onClick={() => setLogOpen(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              data-help="leave.book-save"
              fullWidth
              size="lg"
              onClick={saveLog}
              disabled={addLeave.isPending}
            >
              {addLeave.isPending ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : null}
              {logAgreed ? 'Book it' : 'Add request'}
            </PrimaryButton>
          </div>
        }
      >
        <div className="space-y-5">
          <Field label="Who" required>
            <MobileSelectPicker
              value={logPerson}
              onValueChange={setLogPerson}
              placeholder="Pick a person"
              title="Who is off?"
              triggerClassName={selectTriggerClass}
              options={activeStaff.map((e) => ({ value: e.id, label: e.name }))}
            />
          </Field>
          <Field label="Type">
            <div className="flex flex-wrap gap-2">
              {LEAVE_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setLogType(t.value)}
                  className={cn(chipBase, logType === t.value ? chipOn : chipOff)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Length">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ['', 'Full days'],
                  ['am', 'Morning'],
                  ['pm', 'Afternoon'],
                ] as const
              ).map(([v, label]) => (
                <button
                  key={v || 'full'}
                  type="button"
                  onClick={() => setLogHalf(v)}
                  className={cn(chipBase, logHalf === v ? chipOn : chipOff)}
                >
                  {label}
                </button>
              ))}
            </div>
          </Field>
        </div>
        <div className="space-y-5">
          <div className={cn('grid gap-4', logHalf ? 'grid-cols-1' : 'grid-cols-2')}>
            <Field label={logHalf ? 'Date' : 'First day'} required>
              <input
                type="date"
                value={logStart}
                onChange={(e) => {
                  setLogStart(e.target.value);
                  if (!logEnd || logEnd < e.target.value) setLogEnd(e.target.value);
                }}
                className={inputClass}
              />
            </Field>
            {!logHalf && (
              <Field label="Last day" required>
                <input
                  type="date"
                  value={logEnd}
                  min={logStart || undefined}
                  onChange={(e) => setLogEnd(e.target.value)}
                  className={inputClass}
                />
              </Field>
            )}
          </div>
          <div className="text-[14px] font-medium text-white tabular-nums">
            {logDays > 0 ? `${daysLabel(logDays)} (weekdays only)` : 'Pick the dates'}
          </div>
          {canSeeMoney && logType === 'annual' && logPerson && basisOf(logPerson) !== 'fixed' && (
            <Field
              label="Hours of holiday"
              hint="Irregular hours: holiday is counted in hours. Put the hours they would have worked."
            >
              <input
                inputMode="decimal"
                value={logHours}
                onChange={(e) => setLogHours(e.target.value.replace(/[^0-9.]/g, ''))}
                placeholder="e.g. 16"
                className={inputClass}
              />
            </Field>
          )}
          <Field label="Note (optional)">
            <textarea
              value={logNote}
              onChange={(e) => setLogNote(e.target.value.slice(0, 300))}
              placeholder="e.g. Family wedding"
              rows={2}
              className={textareaClass}
            />
          </Field>
          <Field label="Already agreed?">
            <div className="flex flex-wrap gap-2" data-help="leave.agreed">
              <button
                type="button"
                onClick={() => setLogAgreed(true)}
                className={cn(chipBase, logAgreed ? chipOn : chipOff)}
              >
                Yes, book it
              </button>
              <button
                type="button"
                onClick={() => setLogAgreed(false)}
                className={cn(chipBase, !logAgreed ? chipOn : chipOff)}
              >
                No, add as a request
              </button>
            </div>
          </Field>
        </div>
      </FormSheet>

      {/* ── Allowance sheet ──────────────────────────────────────────── */}
      <FormSheet
        open={!!allowanceFor_}
        onOpenChange={(o) => !o && setAllowanceFor_(null)}
        title={allowanceFor_ ? nameOf(allowanceFor_) : 'Holiday allowance'}
        description={`Holiday allowance for ${new Date().getFullYear()}. Start from the legal minimum and adjust if you give more.`}
        width="wide"
        bodyClassName="grid gap-5 [&>*]:min-w-0 lg:grid-cols-2 lg:gap-8 lg:items-start"
        footer={
          <div className="flex gap-2">
            <SecondaryButton fullWidth size="lg" onClick={() => setAllowanceFor_(null)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              data-help="leave.allowance-save"
              fullWidth
              size="lg"
              onClick={saveAllowance}
              disabled={setAllowance.isPending || totalDraft === ''}
            >
              {setAllowance.isPending ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : null}
              Save
            </PrimaryButton>
          </div>
        }
      >
        {allowanceFor_ && (
          <>
            <div className="space-y-5">
              <Field label="Days they work a week">
                <div className="flex flex-wrap gap-2">
                  {DAYS_PER_WEEK_CHOICES.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => pickDpw(n)}
                      className={cn(
                        chipBase,
                        'min-w-[52px]',
                        !dpwCustom && dpw === n ? chipOn : chipOff
                      )}
                    >
                      {n}
                    </button>
                  ))}
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    min={0.5}
                    max={7}
                    value={dpwCustom}
                    onChange={(e) => {
                      setDpwCustom(e.target.value);
                      const n = Number(e.target.value);
                      if (Number.isFinite(n) && n > 0)
                        setTotalDraft(String(statutoryHolidayDays(n)));
                    }}
                    placeholder="Other"
                    aria-label="Other number of days a week"
                    className={cn(inputClass, 'w-24')}
                  />
                </div>
              </Field>

              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                <div>
                  <div className="text-[14px] font-semibold text-white">Legal minimum</div>
                  <div className="text-[13px] text-white">
                    5.6 weeks × {Number.isFinite(effectiveDpw) ? effectiveDpw : '?'} days, max 28
                  </div>
                </div>
                <div className="text-[22px] font-semibold text-white tabular-nums">{statutory}</div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Allowance (days)" required>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={60}
                    value={totalDraft}
                    onChange={(e) => setTotalDraft(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Carried over">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={30}
                    value={carriedDraft}
                    onChange={(e) => setCarriedDraft(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
              {Number(totalDraft) < statutory && totalDraft !== '' && (
                <p className="flex items-start gap-2.5 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-[13px] text-white">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" />
                  <span>
                    That is below the legal minimum of {statutory} days for someone working{' '}
                    {effectiveDpw} days a week. Include bank holidays in the figure if you count
                    them.
                  </span>
                </p>
              )}
              <p className="text-[13px] text-white">
                Include bank holidays if they come out of this allowance. Days already taken this
                year are counted automatically.
              </p>
              {canSeeMoney && (
                <PersonHolidayRecord person={{ id: allowanceFor_, name: nameOf(allowanceFor_) }} />
              )}
            </div>
          </>
        )}
      </FormSheet>
    </PageFrame>
  );
}
