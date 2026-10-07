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
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useIsMobile } from '@/hooks/use-mobile';
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
  Avatar,
  EmptyState,
  Field,
  IconButton,
  ListBody,
  ListCard,
  ListCardHeader,
  ListRow,
  LoadingBlocks,
  PageFrame,
  PageHero,
  Pill,
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  StatStrip,
  inputClass,
  selectTriggerClass,
  textareaClass,
  type Tone,
} from '@/components/employer/editorial';

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

const STATUS_TONE: Record<string, Tone> = {
  approved: 'emerald',
  pending: 'amber',
  rejected: 'red',
  cancelled: 'purple',
};
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

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('') || '?';

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
        { target: 'leave.approve', caption: 'Tap Approve, or Approve anyway if you are happy with the clash.' },
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
        { target: 'leave.agreed', caption: 'Fill in who and when, then say if it is already agreed.' },
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
        { target: 'leave.allowances', caption: 'Tap a person to set their allowance.', opens: true },
        { target: 'leave.allowance-save', caption: 'Check the days, then tap Save.' },
      ],
    },
  ],
};

export function LeaveSection() {
  const isMobile = useIsMobile();
  const { data: employees = [], isLoading: employeesLoading } = useEmployees();
  const { data: leaveRequests = [], isLoading: leaveLoading } = useTeamLeaveRequests();
  const { data: allowances = [] } = useTeamAllowances();
  const { data: allAssignments = [] } = useTeamAssignments();
  const decideLeave = useDecideLeave();
  const addLeave = useAddTeamLeave();
  const setAllowance = useSetTeamAllowance();

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
    () =>
      allAssignments.filter((a) => rosterIds.has(a.employeeId) && ACTIVE_ASSIGNMENT(a.status)),
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
      const off = new Set(
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
      parts.push(`${names.slice(0, 2).join(' and ')}${names.length > 2 ? ` +${names.length - 2}` : ''} also off`);
    }
    return parts.join(' · ');
  };

  const allowanceFor = (employeeId: string): TeamAllowance | undefined =>
    allowances.find((a) => a.employeeId === employeeId);
  const remainingOf = (a: TeamAllowance) => a.totalDays + a.carriedOver - a.usedDays - a.pendingDays;

  /* ── Decide sheet ───────────────────────────────────────────────────── */
  const [deciding, setDeciding] = useState<TeamLeaveRequest | null>(null);
  const [declineMode, setDeclineMode] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const closeDecide = () => {
    setDeciding(null);
    setDeclineMode(false);
    setDeclineReason('');
  };
  const approve = async (lr: TeamLeaveRequest) => {
    try {
      await decideLeave.mutateAsync({ id: lr.id, decision: 'approved' });
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
  const openLog = () => {
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
  const statutory = Number.isFinite(effectiveDpw) && effectiveDpw > 0 ? statutoryHolidayDays(effectiveDpw) : 0;
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
  const allowancesSet = activeStaff.filter((e) => allowanceFor(e.id)).length;

  const sheetClass = isMobile
    ? 'h-[85vh] p-0 rounded-t-2xl overflow-hidden border-t border-white/[0.06]'
    : 'w-full sm:max-w-md p-0 border-l border-white/[0.06]';

  if (employeesLoading || leaveLoading) {
    return (
      <PageFrame>
        <PageHero eyebrow="People" title="Leave" tone="blue" />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] = [];
  const firstWithoutAllowance = activeStaff.find((e) => !allowanceFor(e.id));
  if (activeStaff.length === 0) {
    helpBlockers.push({ text: 'No one on the team yet. Add your team first, then set their holiday.' });
  } else if (firstWithoutAllowance) {
    const missing = activeStaff.length - allowancesSet;
    helpBlockers.push({
      text: `${missing} ${missing === 1 ? 'person has' : 'people have'} no holiday allowance, so they are told to ask the office.`,
      fixLabel: `Set ${firstWithoutAllowance.name.split(' ')[0]}’s`,
      onFix: () => openAllowance(firstWithoutAllowance.id),
    });
  }

  const decidingClash = deciding ? clashesFor(deciding) : null;
  const decidingAllowance = deciding ? allowanceFor(deciding.employeeId) : undefined;

  return (
    <PageFrame>
      <PageHero
        eyebrow="People"
        title="Leave"
        description="Holiday requests, who's off, and everyone's allowance."
        tone="blue"
        actions={
          <div className="flex items-center gap-2">
            <PrimaryButton data-help="leave.book" onClick={openLog}>
              <Plus className="h-4 w-4 mr-1.5" />
              Book leave
            </PrimaryButton>
            <PageHelpButton
              help={LEAVE_HELP}
              blockers={helpBlockers}
              askContext={{ page: 'leave' }}
            />
          </div>
        }
      />

      <HowItWorks help={LEAVE_HELP} blockers={helpBlockers} askContext={{ page: 'leave' }} />

      <StatStrip
        columns={4}
        stats={[
          {
            label: 'Waiting',
            value: pending.length,
            tone: pending.length > 0 ? 'orange' : 'emerald',
            sub: pending.length === 0 ? 'Nothing to decide' : 'Tap one to decide',
          },
          { label: 'Off today', value: offToday, tone: 'blue' },
          { label: 'Off next 7 days', value: offThisWeek, tone: 'blue' },
          {
            label: 'Allowances set',
            value: `${allowancesSet}/${activeStaff.length}`,
            tone: allowancesSet < activeStaff.length ? 'amber' : 'emerald',
            sub: allowancesSet < activeStaff.length ? 'Set the rest below' : 'Everyone has one',
          },
        ]}
      />

      {/* Waiting for a decision */}
      {pending.length > 0 && (
        <section className="space-y-3" data-help="leave.pending">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            Waiting for you · {pending.length}
          </h2>
          <div className="-mx-4 sm:mx-0 bg-white/[0.04] border-y sm:border border-white/[0.06] sm:rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
            {pending.map((lr) => {
              const t = typeInfo(lr.type);
              const line = clashLine(lr);
              const a = allowanceFor(lr.employeeId);
              return (
                <button
                  key={lr.id}
                  onClick={() => setDeciding(lr)}
                  className="w-full text-left px-4 sm:px-5 py-4 flex items-start gap-3 touch-manipulation hover:bg-[hsl(0_0%_15%)] active:bg-[hsl(0_0%_17%)] transition-colors"
                >
                  <Avatar initials={initials(lr.employeeName)} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-white truncate">
                        {lr.employeeName}
                      </span>
                      <Pill tone={t.tone}>{t.label}</Pill>
                    </div>
                    <div className="mt-1 text-[13px] text-white tabular-nums">
                      {dateRange(lr)} · {daysLabel(lr.totalDays)}
                    </div>
                    {lr.type === 'annual' && a && (
                      <div className="mt-0.5 text-[12px] text-white tabular-nums">
                        {remainingOf(a)} of {a.totalDays + a.carriedOver} left after this
                      </div>
                    )}
                    {line && (
                      <div className="mt-2 flex items-start gap-1.5 text-[12.5px] text-orange-300">
                        <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span>{line}</span>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-white mt-1 shrink-0" />
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Next 7 days */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Who&apos;s off · next 7 days</h2>
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto hide-scrollbar">
          {next7.map((day) => {
            const off = offOn(day, ['approved', 'pending']);
            const weekend = isWeekend(day);
            const today = isSameDay(day, new Date());
            return (
              <div
                key={day.toISOString()}
                className={cn(
                  'min-w-[104px] flex-1 rounded-xl border px-3 py-2.5',
                  today ? 'border-elec-yellow' : 'border-white/[0.08]',
                  weekend ? 'bg-transparent' : 'bg-[hsl(0_0%_12%)]'
                )}
              >
                <div
                  className={cn(
                    'text-[11px] font-semibold uppercase tracking-[0.12em]',
                    today ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {today ? 'Today' : format(day, 'EEE d')}
                </div>
                {weekend ? (
                  <div className="mt-1 text-[12px] text-white">Weekend</div>
                ) : off.length === 0 ? (
                  <div className="mt-1 text-[12px] text-emerald-400">All in</div>
                ) : (
                  <div className="mt-1 space-y-0.5">
                    {off.slice(0, 3).map((lr) => (
                      <div
                        key={lr.id}
                        className={cn(
                          'text-[12px] truncate',
                          lr.status === 'pending' ? 'text-amber-300' : 'text-white'
                        )}
                      >
                        {lr.employeeName.split(' ')[0]}
                      </div>
                    ))}
                    {off.length > 3 && <div className="text-[11px] text-white">+{off.length - 3} more</div>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-[12px] text-white">
          <span className="text-amber-300">Amber</span> names have asked and are waiting for you.
        </p>
      </section>

      {/* Allowances */}
      <section className="space-y-3">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            Allowances · {new Date().getFullYear()}
          </h2>
          <p className="mt-1 text-[12px] text-white">
            The legal minimum is 5.6 weeks (28 days full-time, less pro rata). Tap someone to set
            theirs.
            {subcontractorCount > 0 &&
              ` Your ${subcontractorCount} subcontractor${subcontractorCount === 1 ? ' is' : 's are'} not listed: subbies have no holiday allowance.`}
          </p>
        </div>
        {activeStaff.length === 0 ? (
          <EmptyState title="No one on the team yet" description="Add your team first, then set their holiday." />
        ) : (
          <div
            data-help="leave.allowances"
            className="-mx-4 sm:mx-0 bg-white/[0.04] border-y sm:border border-white/[0.06] sm:rounded-2xl overflow-hidden"
          >
            <ListBody>
              {activeStaff.map((emp) => {
                const a = allowanceFor(emp.id);
                const total = a ? a.totalDays + a.carriedOver : 0;
                const left = a ? remainingOf(a) : 0;
                return (
                  <ListRow
                    key={emp.id}
                    lead={<Avatar initials={emp.avatar_initials || initials(emp.name)} size="sm" />}
                    title={emp.name}
                    subtitle={
                      a
                        ? `${a.usedDays} taken${a.pendingDays > 0 ? ` · ${a.pendingDays} asked for` : ''}${
                            a.daysPerWeek ? ` · ${a.daysPerWeek} days a week` : ''
                          }`
                        : 'Not set. They are told to ask the office'
                    }
                    trailing={
                      a ? (
                        <span className="text-right">
                          <span className="block text-[15px] font-semibold text-white tabular-nums">
                            {left}
                            <span className="text-[12px] font-normal"> / {total}</span>
                          </span>
                          <span className="block text-[11px] text-white">left</span>
                        </span>
                      ) : (
                        <Pill tone="amber">Set it</Pill>
                      )
                    }
                    onClick={() => openAllowance(emp.id)}
                  />
                );
              })}
            </ListBody>
          </div>
        )}
      </section>

      {/* Month calendar */}
      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            {format(calMonth, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center gap-2">
            <IconButton onClick={() => setCalMonth(subMonths(calMonth, 1))} aria-label="Previous month">
              <ChevronLeft className="h-4 w-4" />
            </IconButton>
            <IconButton onClick={() => setCalMonth(addMonths(calMonth, 1))} aria-label="Next month">
              <ChevronRight className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
        <div className="-mx-4 sm:mx-0 bg-white/[0.04] border-y sm:border border-white/[0.06] sm:rounded-2xl p-3 sm:p-4">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} className="text-center text-[11px] font-semibold text-white py-1">
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
                    'h-11 rounded-lg flex flex-col items-center justify-center text-[13px] touch-manipulation transition-colors',
                    selected
                      ? 'bg-elec-yellow text-black font-semibold'
                      : off.length > 0 && !isWeekend(day)
                        ? 'bg-white/[0.08] text-white'
                        : 'text-white hover:bg-white/[0.04]',
                    today && !selected && 'ring-1 ring-elec-yellow'
                  )}
                >
                  <span className="tabular-nums leading-none">{format(day, 'd')}</span>
                  {off.length > 0 && (
                    <span className="mt-1 flex gap-0.5">
                      {off.slice(0, 3).map((lr) => (
                        <span
                          key={lr.id}
                          className={cn(
                            'h-1.5 w-1.5 rounded-full',
                            selected ? 'bg-black' : lr.status === 'approved' ? 'bg-emerald-400' : 'bg-amber-400'
                          )}
                        />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-white/[0.06]">
            {calDay ? (
              <>
                <div className="text-[13px] font-semibold text-white">{format(calDay, 'EEEE d MMMM')}</div>
                {offOn(calDay, ['approved', 'pending']).length === 0 ? (
                  <div className="mt-1 text-[12.5px] text-emerald-400">Everyone in</div>
                ) : (
                  <div className="mt-2 space-y-1.5">
                    {offOn(calDay, ['approved', 'pending']).map((lr) => (
                      <div key={lr.id} className="flex items-center gap-2 text-[13px] text-white">
                        <span className="truncate">{lr.employeeName}</span>
                        <Pill tone={typeInfo(lr.type).tone}>{typeInfo(lr.type).label}</Pill>
                        {lr.status === 'pending' && <Pill tone="amber">Asked</Pill>}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-4 text-[12px] text-white">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Approved
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400" /> Asked for
                </span>
                <span className="ml-auto">Tap a day for names</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Decided</h2>
        {decided.length === 0 ? (
          <EmptyState
            title="Nothing decided yet"
            description="Approved, declined and cancelled leave shows here."
          />
        ) : (
          <ListCard className="-mx-4 sm:mx-0 rounded-none sm:rounded-2xl border-x-0 sm:border-x">
            <ListCardHeader title="Last 30" />
            <ListBody>
              {decided.map((lr) => (
                <ListRow
                  key={lr.id}
                  accent={STATUS_TONE[lr.status] ?? 'blue'}
                  title={lr.employeeName}
                  subtitle={
                    lr.status === 'rejected' && lr.rejectedReason
                      ? `${dateRange(lr)} · “${lr.rejectedReason}”`
                      : `${dateRange(lr)} · ${typeInfo(lr.type).label} · ${daysLabel(lr.totalDays)}`
                  }
                  trailing={
                    <Pill tone={STATUS_TONE[lr.status] ?? 'blue'}>
                      {STATUS_LABEL[lr.status] ?? lr.status}
                    </Pill>
                  }
                />
              ))}
            </ListBody>
          </ListCard>
        )}
      </section>

      {/* ── Decide sheet ─────────────────────────────────────────────── */}
      <Sheet open={!!deciding} onOpenChange={(o) => !o && closeDecide()}>
        <SheetContent side={isMobile ? 'bottom' : 'right'} className={sheetClass}>
          {deciding && decidingClash && (
            <SheetShell
              eyebrow={`${typeInfo(deciding.type).label} request`}
              title={deciding.employeeName}
              description={`${dateRange(deciding)} · ${daysLabel(deciding.totalDays)}`}
              footer={
                <>
                  <SecondaryButton
                    data-help="leave.decline"
                    fullWidth
                    onClick={() => decline(deciding)}
                    disabled={decideLeave.isPending || (declineMode && declineReason.trim().length < 3)}
                  >
                    <X className="h-4 w-4 mr-1.5" />
                    {declineMode ? 'Send decline' : 'Decline'}
                  </SecondaryButton>
                  <PrimaryButton
                    data-help="leave.approve"
                    fullWidth
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
                </>
              }
            >
              {deciding.reason && (
                <div>
                  <div className="text-[12px] font-medium text-white">Their note</div>
                  <p className="mt-1 text-[14px] text-white">“{deciding.reason}”</p>
                </div>
              )}

              {deciding.type === 'annual' && (
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3">
                  {decidingAllowance ? (
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[13px] text-white">Left after this</span>
                      <span className="text-[18px] font-semibold text-white tabular-nums">
                        {remainingOf(decidingAllowance)}
                        <span className="text-[13px] font-normal">
                          {' '}
                          of {decidingAllowance.totalDays + decidingAllowance.carriedOver} days
                        </span>
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[13px] text-white">No allowance set yet</span>
                      <button
                        onClick={() => {
                          const id = deciding.employeeId;
                          closeDecide();
                          openAllowance(id);
                        }}
                        className="h-11 px-3 text-[13px] font-medium text-elec-yellow touch-manipulation"
                      >
                        Set it
                      </button>
                    </div>
                  )}
                  {decidingAllowance && remainingOf(decidingAllowance) < 0 && (
                    <p className="mt-2 text-[12.5px] text-orange-300">
                      This takes them over their allowance.
                    </p>
                  )}
                </div>
              )}

              {/* Clash warning — before the decision, not after */}
              {decidingClash.any ? (
                <div
                  data-help="leave.clash"
                  className="rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 space-y-2.5"
                >
                  <div className="flex items-center gap-2 text-[13px] font-semibold text-white">
                    <AlertTriangle className="h-4 w-4 text-orange-300" />
                    Check before you approve
                  </div>
                  {decidingClash.alsoOff.length > 0 && (
                    <p className="text-[13px] text-white">
                      {decidingClash.alsoOff
                        .map((o) => `${o.name}${o.status === 'pending' ? ' (asked)' : ''}`)
                        .join(', ')}{' '}
                      {decidingClash.alsoOff.length === 1 ? 'is' : 'are'} off then too.
                      {decidingClash.worstDay && decidingClash.worstDay.off > 1 && activeStaff.length > 0
                        ? ` ${decidingClash.worstDay.off} of ${activeStaff.length} off on ${format(parseISO(decidingClash.worstDay.key), 'EEE d MMM')}.`
                        : ''}
                    </p>
                  )}
                  {decidingClash.jobs.map((j) => (
                    <p key={j.jobTitle} className="text-[13px] text-white">
                      Booked on <span className="font-semibold">{j.jobTitle}</span> for{' '}
                      {daysLabel(j.bookedDays.length)}.{' '}
                      {j.uncoveredDays.length > 0 ? (
                        <span className="text-orange-300 font-medium">
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
                  className="rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.06] px-4 py-3 text-[13px] text-white"
                >
                  No clashes: nobody else is off and they aren&apos;t booked on a job those days.
                </div>
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
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>

      {/* ── Book leave sheet ─────────────────────────────────────────── */}
      <Sheet open={logOpen} onOpenChange={setLogOpen}>
        <SheetContent side={isMobile ? 'bottom' : 'right'} className={sheetClass}>
          <SheetShell
            eyebrow="Leave"
            title="Book leave"
            description="For time off you've already agreed, or a request taken by phone."
            footer={
              <>
                <SecondaryButton fullWidth onClick={() => setLogOpen(false)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  data-help="leave.book-save"
                  fullWidth
                  onClick={saveLog}
                  disabled={addLeave.isPending}
                >
                  {addLeave.isPending ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : null}
                  {logAgreed ? 'Book it' : 'Add request'}
                </PrimaryButton>
              </>
            }
          >
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
            <div className="text-[13px] text-white tabular-nums">
              {logDays > 0 ? `${daysLabel(logDays)} (weekdays only)` : 'Pick the dates'}
            </div>
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
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* ── Allowance sheet ──────────────────────────────────────────── */}
      <Sheet open={!!allowanceFor_} onOpenChange={(o) => !o && setAllowanceFor_(null)}>
        <SheetContent side={isMobile ? 'bottom' : 'right'} className={sheetClass}>
          {allowanceFor_ && (
            <SheetShell
              eyebrow={`Holiday allowance · ${new Date().getFullYear()}`}
              title={nameOf(allowanceFor_)}
              description="Start from the legal minimum and adjust if you give more."
              footer={
                <>
                  <SecondaryButton fullWidth onClick={() => setAllowanceFor_(null)}>
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    data-help="leave.allowance-save"
                    fullWidth
                    onClick={saveAllowance}
                    disabled={setAllowance.isPending || totalDraft === ''}
                  >
                    {setAllowance.isPending ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : null}
                    Save
                  </PrimaryButton>
                </>
              }
            >
              <Field label="Days they work a week">
                <div className="flex flex-wrap gap-2">
                  {DAYS_PER_WEEK_CHOICES.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => pickDpw(n)}
                      className={cn(chipBase, 'min-w-[52px]', !dpwCustom && dpw === n ? chipOn : chipOff)}
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
                      if (Number.isFinite(n) && n > 0) setTotalDraft(String(statutoryHolidayDays(n)));
                    }}
                    placeholder="Other"
                    aria-label="Other number of days a week"
                    className={cn(inputClass, 'w-24')}
                  />
                </div>
              </Field>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[13px] font-semibold text-white">Legal minimum</div>
                  <div className="text-[12px] text-white">
                    5.6 weeks × {Number.isFinite(effectiveDpw) ? effectiveDpw : '?'} days, max 28
                  </div>
                </div>
                <div className="text-[22px] font-semibold text-white tabular-nums">{statutory}</div>
              </div>

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
                <p className="rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-[12.5px] text-white">
                  That is below the legal minimum of {statutory} days for someone working{' '}
                  {effectiveDpw} days a week. Include bank holidays in the figure if you count them.
                </p>
              )}
              <p className="text-[12px] text-white">
                Include bank holidays if they come out of this allowance. Days already taken this
                year are counted automatically.
              </p>
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>
    </PageFrame>
  );
}
