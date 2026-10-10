import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { differenceInDays, parseISO } from 'date-fns';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { PageFrame, PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  frameClass,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { PEOPLE_HUB_HELP } from '@/components/employer/help/people';
import { cn } from '@/lib/utils';
import { useActiveEmployees } from '@/hooks/useEmployees';
import { useTalentPool } from '@/hooks/useTalentPool';
import { useNewApplicationsCount } from '@/hooks/useVacancyApplications';
import { useVacancies } from '@/hooks/useVacancies';
import { useTimesheets } from '@/hooks/useTimesheets';
import { useCommunicationStats } from '@/hooks/useCommunications';
import { useElecIdProfiles } from '@/hooks/useElecId';
import { useWorkerLocations } from '@/hooks/useWorkerLocations';
import { useApprenticeProgress } from '@/hooks/useApprenticeProgress';
import { useTeamLeaveRequests } from '@/hooks/useTeamLeave';
import { useContractStats } from '@/hooks/useContracts';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { useRtwTeamStatus } from '@/hooks/useRightToWork';
import { useStarters } from '@/hooks/useStarters';
import { useEmployerHome } from '@/hooks/useEmployerHome';
import {
  StatCards,
  SectionHead,
  ListPanel,
  PageTiles,
  areaCard,
  type ListItem,
  type IndexLink,
} from '@/components/employer/hubs/AreaPage';
import { matePad, daysFromToday, relDays, ymd } from '@/components/employer/hubs/HubPanels';

interface PeopleHubProps {
  onNavigate: (section: Section) => void;
}

/* ── Who's where today ─────────────────────────────────────────────── */

/**
 * site = checked in on site; late = booked with a start time that has passed
 * and no check-in; travelling / office from the worker's own status; booked =
 * on a job today, not started yet; leave and off take the quiet edge.
 */
type WhereState = 'site' | 'late' | 'travelling' | 'office' | 'booked' | 'leave' | 'off';

interface WherePerson {
  id: string;
  name: string;
  state: WhereState;
  status: string;
  detail?: string;
}

const whereEdge: Record<WhereState, string> = {
  site: 'border-l-elec-yellow',
  late: 'border-l-red-400',
  travelling: 'border-l-white',
  office: 'border-l-white',
  booked: 'border-l-white',
  leave: 'border-l-white/25',
  off: 'border-l-white/25',
};

const whereOrder: WhereState[] = ['late', 'site', 'travelling', 'office', 'booked', 'leave', 'off'];

const shortDate = (d: string) =>
  new Date(`${d.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

function WhoIsWhere({
  people,
  onOpen,
  more,
  onMore,
}: {
  people: WherePerson[];
  onOpen: () => void;
  more: number;
  onMore: () => void;
}) {
  return (
    <div className={cn(areaCard, 'overflow-hidden')}>
      <div className="grid gap-2 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-3">
        {people.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={onOpen}
            className={cn(
              'flex min-h-[60px] w-full min-w-0 flex-col justify-center rounded-md border-l-[3px] bg-white/[0.07] py-2 pl-3 pr-3 text-left touch-manipulation transition-colors hover:bg-white/[0.11]',
              whereEdge[p.state]
            )}
          >
            <span className="flex items-baseline justify-between gap-3">
              <span className="truncate text-[14.5px] font-semibold leading-snug text-white">
                {p.name}
              </span>
              <span
                className={cn(
                  'shrink-0 text-[12.5px] font-semibold',
                  p.state === 'late'
                    ? 'text-red-400'
                    : p.state === 'site'
                      ? 'text-elec-yellow'
                      : 'text-white'
                )}
              >
                {p.status}
              </span>
            </span>
            {p.detail && (
              <span className="mt-0.5 block truncate text-[12.5px] leading-snug text-white">
                {p.detail}
              </span>
            )}
          </button>
        ))}
      </div>
      {more > 0 && (
        <div className="border-t border-white/[0.08] px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={onMore}
            className="-my-3 h-11 text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
          >
            {plural(more, 'more person', 'more people')} in Worker tracking
          </button>
        </div>
      )}
    </div>
  );
}

function WhereKey() {
  const item = (cls: string, text: string) => (
    <span className="flex items-center gap-2 text-[12.5px] text-white">
      <span className={cn('h-3 w-[3px] rounded-full', cls)} />
      {text}
    </span>
  );
  return (
    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
      {item('bg-elec-yellow', 'On site')}
      {item('bg-white', 'Booked, travelling or office')}
      {item('bg-red-400', 'Not checked in')}
      {item('bg-white/25', 'Off or on leave')}
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────────────── */

export function PeopleHub({ onNavigate }: PeopleHubProps) {
  const navigate = useNavigate();
  // Live: any change to the team's location rows refreshes who's where.
  // Team-wide (no filter); RLS scopes events to this company.
  useRealtimeInvalidate(
    'people-hub-worker-locations',
    [{ table: 'employer_worker_locations' }],
    [['worker-locations']]
  );

  const { data: employees = [], isLoading: employeesLoading } = useActiveEmployees();
  const { totalCount: talentCount, verifiedCount, isLoading: talentLoading } = useTalentPool();
  const { data: newApplicationsCount = 0, isLoading: appsLoading } = useNewApplicationsCount();
  const { data: vacancies = [], isLoading: vacanciesLoading } = useVacancies();
  const { data: timesheets = [], isLoading: timesheetsLoading } = useTimesheets();
  const { data: commStats, isLoading: commsLoading } = useCommunicationStats();
  const { data: profiles = [], isLoading: profilesLoading } = useElecIdProfiles();
  const { data: locations = [] } = useWorkerLocations();
  // ELE-1982: contracts live with People. Money roles only (they carry pay).
  const { data: contractStats } = useContractStats();
  const { data: roleInfo } = useEmployerRole();
  // HR data (right to work) is for the owner and admins.
  const isHr = roleInfo?.role === 'owner' || roleInfo?.role === 'admin';
  // ELE-2061: everyone on the books needs a right-to-work check.
  const { data: rtwAll = [] } = useRtwTeamStatus();
  const rtwRows = isHr ? rtwAll : [];
  const rtwNeed = rtwRows.filter((r) => r.status === 'missing' || r.status === 'overdue').length;
  const rtwDue = rtwRows.filter((r) => r.status === 'due').length;
  const rtwInScope = rtwRows.filter((r) => r.status !== 'not_required').length;
  const rtwDone = rtwRows.filter((r) => r.status === 'checked' || r.status === 'due').length;

  const activeEmployees = employees.length;
  const credentialCount = profiles.length;
  const unreadComms = commStats?.unreadCount || 0;
  const openVacancies = Array.isArray(vacancies)
    ? vacancies.filter((v: { status?: string }) => v?.status === 'Open').length
    : 0;

  /* ── Derived figures ─────────────────────────────────────────── */

  const expiringSoonCount = useMemo(() => {
    const now = new Date();
    return profiles.filter((p) => {
      if (!p.ecs_expiry_date) return false;
      const days = differenceInDays(parseISO(p.ecs_expiry_date), now);
      return days >= 0 && days <= 30;
    }).length;
  }, [profiles]);

  const expiredCount = useMemo(() => {
    const now = new Date();
    return profiles.filter((p) => {
      if (!p.ecs_expiry_date) return false;
      return differenceInDays(parseISO(p.ecs_expiry_date), now) < 0;
    }).length;
  }, [profiles]);

  const pendingTimesheetCount = useMemo(
    // Status is stored Capitalised ('Pending'); compare case-insensitively.
    () =>
      timesheets.filter((t) => ['pending', 'submitted'].includes(t.status?.toLowerCase())).length,
    [timesheets]
  );

  // ELE-1953 / ELE-1951: leave waiting on a decision, and people who were
  // invited but never joined.
  const { data: leaveRequests = [] } = useTeamLeaveRequests();
  const pendingLeaveCount = leaveRequests.filter((l) => l.status === 'pending').length;
  const todayIso = ymd(new Date());
  const onLeaveToday = useMemo(
    () =>
      leaveRequests.filter(
        (l) => l.status === 'approved' && l.startDate <= todayIso && l.endDate >= todayIso
      ),
    [leaveRequests, todayIso]
  );
  const offTodayCount = onLeaveToday.length;
  const notJoinedCount = employees.filter((e) => !e.user_id).length;
  // ELE-1830: subbies are roster rows with team_role 'Subcontractor'.
  const subcontractorCount = employees.filter((e) => e.team_role === 'Subcontractor').length;

  const totalHoursThisWeek = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];
    return timesheets
      .filter((ts) => ts.date >= weekAgoStr)
      .reduce((sum, ts) => sum + (ts.total_hours || 0), 0);
  }, [timesheets]);

  // Same 12h staleness rule as Worker Tracking: a fortnight-old "On Site"
  // row must not count as on site now.
  const freshLocations = useMemo(() => {
    const staleCutoff = Date.now() - 12 * 60 * 60 * 1000;
    return locations.filter(
      (l) => l.last_updated && new Date(l.last_updated).getTime() >= staleCutoff
    );
  }, [locations]);
  const onSiteCount = freshLocations.filter((l) => l.status === 'On Site').length;

  // Cards in date as a true count ("3 of 4"), clamped: leavers can keep a
  // profile, so profiles can outnumber the active team.
  const inDateCards = useMemo(() => {
    const ok = profiles.filter((p) => {
      if (!p.ecs_expiry_date) return false;
      return differenceInDays(parseISO(p.ecs_expiry_date), new Date()) >= 0;
    }).length;
    return Math.min(activeEmployees, ok);
  }, [profiles, activeEmployees]);

  // The Overview's one round trip (cached): who is booked where today.
  const { data: home } = useEmployerHome();
  const { data: starters = [] } = useStarters(null);
  const peopleToday = useMemo(() => home?.people_today ?? [], [home]);
  const onSiteHome = peopleToday.filter((p) => p.state === 'clocked_in').length;
  // One answer to "who is on site": the Overview's, once it has loaded.
  const onSiteNow = home ? onSiteHome : onSiteCount;
  const expensesWaiting = home?.approvals.expenses ?? 0;

  const { data: apprenticeRows } = useApprenticeProgress();
  const apprenticeCount = apprenticeRows?.length ?? 0;
  const apprenticeReviewsOverdue = apprenticeRows?.filter((r) => r.reviewOverdue).length ?? 0;
  const apprenticeAttestations =
    apprenticeRows?.reduce((n, r) => n + (r.otjPendingAttestationCount ?? 0), 0) ?? 0;

  /* ── Navigation ────────────────────────────────────────────── */

  const onOpenEmployees = () => onNavigate('team');
  const onOpenElecID = () => onNavigate('elecid');
  const onOpenTimesheets = () => onNavigate('timesheets');
  const onOpenComms = () => onNavigate('comms');
  const onOpenLeave = () => onNavigate('leave');
  const onOpenTalentPool = () => onNavigate('talentpool');
  const onOpenVacancies = () => onNavigate('vacancies');
  const onOpenApprentices = () => onNavigate('apprentices');
  const onOpenSubcontractors = () => onNavigate('subcontractors');
  const onOpenTracking = () => onNavigate('tracking');

  /* ── Who's where: every active person, today's state in words ── */

  const whereAll: WherePerson[] = useMemo(() => {
    const homeBy = new Map(peopleToday.map((p) => [p.employee_id, p]));
    const locBy = new Map(freshLocations.map((l) => [l.employee_id, l]));
    const leaveBy = new Map(onLeaveToday.map((l) => [l.employeeId, l]));
    const nowHm = new Date().toTimeString().slice(0, 5);
    const out: WherePerson[] = employees.map((e) => {
      const h = homeBy.get(e.id);
      const loc = locBy.get(e.id);
      const leave = leaveBy.get(e.id);
      const job = h?.job_title || loc?.jobs?.title || null;
      const place = h ? h.postcode || h.location : null;
      if (h?.state === 'leave' || leave || loc?.status === 'On Leave') {
        const until = h?.leave_until ?? leave?.endDate ?? null;
        return {
          id: e.id,
          name: e.name,
          state: 'leave',
          status: 'On leave',
          detail: until && until > todayIso ? `Back after ${shortDate(until)}` : 'Today',
        };
      }
      if (h?.state === 'clocked_in' || loc?.status === 'On Site') {
        const since = h?.clocked_in_at ?? loc?.checked_in_at ?? null;
        return {
          id: e.id,
          name: e.name,
          state: 'site',
          status: 'On site',
          detail: [
            since ? `Since ${new Date(since).toTimeString().slice(0, 5)}` : 'Checked in',
            job ? `at ${job}` : null,
          ]
            .filter(Boolean)
            .join(' '),
        };
      }
      if (loc?.status === 'En Route')
        return {
          id: e.id,
          name: e.name,
          state: 'travelling',
          status: 'Travelling',
          detail: job ? `To ${job}` : undefined,
        };
      if (loc?.status === 'Office')
        return { id: e.id, name: e.name, state: 'office', status: 'Office' };
      if (h?.state === 'booked') {
        const start = h.start_time ? h.start_time.slice(0, 5) : null;
        const late = !!start && nowHm > start;
        return {
          id: e.id,
          name: e.name,
          state: late ? 'late' : 'booked',
          status: late ? 'Not checked in' : start ? `From ${start}` : 'Booked',
          detail: [job, place].filter(Boolean).join(', ') || 'Booked on a job today',
        };
      }
      return {
        id: e.id,
        name: e.name,
        state: 'off',
        status: loc?.status === 'Off Duty' ? 'Clocked off' : 'Off',
        detail: loc?.status === 'Off Duty' ? 'Finished for the day' : 'Not booked today',
      };
    });
    return out.sort(
      (a, b) =>
        whereOrder.indexOf(a.state) - whereOrder.indexOf(b.state) || a.name.localeCompare(b.name)
    );
  }, [employees, peopleToday, freshLocations, onLeaveToday, todayIso]);

  const whereShown = whereAll.slice(0, 12);
  // Nobody working today (a weekend, say): one plain sentence, not a grid of "Off".
  const nobodyWorking =
    whereAll.length > 0 && whereAll.every((p) => p.state === 'off' || p.state === 'leave');
  const nameList = (names: string[]) =>
    names.length <= 1
      ? (names[0] ?? '')
      : names.length <= 4
        ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
        : `${names.slice(0, 3).join(', ')} and ${names.length - 3} others`;
  const whereCount = (s: WhereState) => whereAll.filter((p) => p.state === s).length;
  const whereMeta = [
    whereCount('site') ? `${whereCount('site')} on site` : null,
    whereCount('late') ? `${whereCount('late')} not checked in` : null,
    whereCount('booked') ? `${whereCount('booked')} booked` : null,
    whereCount('leave') ? `${whereCount('leave')} on leave` : null,
  ]
    .filter(Boolean)
    .join(', ');

  /* ── Needs you, most urgent first ───────────────────────────── */

  const startersSoon = starters.filter((s) => {
    if (!s.start_date) return false;
    const d = daysFromToday(s.start_date.slice(0, 10));
    return d <= 7 && s.items.some((i) => i.key === 'rtw' && i.state !== 'done');
  });

  const needs: ListItem[] = [];
  if (expiredCount > 0)
    needs.push({
      key: 'expired',
      title: expiredCount === 1 ? 'A card has expired' : `${expiredCount} cards have expired`,
      detail: 'Keep them off site until the card is renewed',
      status: 'Expired',
      tone: 'red',
      onOpen: onOpenElecID,
    });
  if (rtwNeed > 0)
    needs.push({
      key: 'rtw',
      title:
        rtwNeed === 1
          ? '1 person has no right-to-work check'
          : `${rtwNeed} people have no right-to-work check`,
      detail: 'Check before they work. Subcontractors engaged from 1 Oct 2026 too',
      status: 'Check',
      tone: 'red',
      onOpen: () => onNavigate('hrrecords'),
    });
  if (isHr)
    for (const s of startersSoon.slice(0, 2)) {
      const d = daysFromToday(s.start_date!.slice(0, 10));
      needs.push({
        key: `starter-${s.roster_id}`,
        title: s.name,
        detail: `${d >= 0 ? `Starts ${relDays(s.start_date!.slice(0, 10))}` : `Started ${shortDate(s.start_date!)}`}, right to work not checked`,
        status: `${s.done} of ${s.total}`,
        tone: 'red',
        onOpen: () => navigate(`/employer?section=team&member=${s.roster_id}`),
      });
    }
  if (apprenticeReviewsOverdue > 0)
    needs.push({
      key: 'apprentice-review',
      title: 'Apprentice review overdue',
      detail: `${plural(apprenticeReviewsOverdue, 'review')} past the due date`,
      status: 'Overdue',
      tone: 'red',
      onOpen: onOpenApprentices,
    });
  if (pendingTimesheetCount > 0)
    needs.push({
      key: 'ts',
      title: 'Timesheets to approve',
      detail: `${plural(pendingTimesheetCount, 'submission')} waiting`,
      status: 'Approve',
      tone: 'yellow',
      onOpen: onOpenTimesheets,
    });
  if (pendingLeaveCount > 0)
    needs.push({
      key: 'leave',
      title: 'Leave to decide',
      detail: `${plural(pendingLeaveCount, 'request')} waiting`,
      status: 'Decide',
      tone: 'yellow',
      onOpen: onOpenLeave,
    });
  if (expensesWaiting > 0)
    needs.push({
      key: 'expenses',
      title: 'Expenses to approve',
      detail: `${plural(expensesWaiting, 'claim')} waiting`,
      status: 'Approve',
      tone: 'yellow',
      onOpen: () => onNavigate('expenses'),
    });
  if (newApplicationsCount > 0)
    needs.push({
      key: 'apps',
      title: 'New applications',
      detail: `${plural(newApplicationsCount, 'candidate')} to review`,
      status: `${newApplicationsCount} new`,
      tone: 'yellow',
      onOpen: onOpenVacancies,
    });
  if (expiringSoonCount > 0)
    needs.push({
      key: 'expiring',
      title: 'Cards running out',
      detail: `${plural(expiringSoonCount, 'card')} expire in the next 30 days`,
      status: `${expiringSoonCount} due`,
      tone: 'yellow',
      onOpen: onOpenElecID,
    });
  if (apprenticeAttestations > 0)
    needs.push({
      key: 'attest',
      title: 'Apprentice hours to attest',
      detail: `${plural(apprenticeAttestations, 'entry', 'entries')} waiting`,
      status: 'Attest',
      tone: 'yellow',
      onOpen: onOpenApprentices,
    });
  if (notJoinedCount > 0)
    needs.push({
      key: 'invites',
      title:
        notJoinedCount === 1 ? "1 person hasn't joined" : `${notJoinedCount} people haven't joined`,
      detail: 'Invited but never signed in. Send a reminder',
      status: 'Chase',
      tone: 'yellow',
      // Straight to the Invited tab, where the reminders are sent.
      onOpen: () => navigate('/employer?section=team&tab=invited'),
    });
  if (unreadComms > 0)
    needs.push({
      key: 'comms',
      title: 'Unread messages',
      detail: `${unreadComms} in the team feed`,
      status: `${unreadComms} unread`,
      onOpen: onOpenComms,
    });
  if (openVacancies > 0 && newApplicationsCount === 0)
    needs.push({
      key: 'talent',
      title: 'No new applications on your live vacancies',
      detail: 'Invite available electricians from the talent pool',
      status: 'Talent pool',
      onOpen: onOpenTalentPool,
    });

  /* ── Coming up: the next 14 days ────────────────────────────── */

  const in14 = ymd(new Date(Date.now() + 14 * 86_400_000));
  const leaveType = (t: string | null | undefined) =>
    t ? `${t.charAt(0).toUpperCase()}${t.slice(1).replace(/_/g, ' ')}` : 'Leave';

  const comingAll: ListItem[] = [
    ...leaveRequests
      .filter((l) => l.status === 'approved' && l.endDate >= todayIso && l.startDate <= in14)
      .map((l) => ({
        key: `leave-${l.id}`,
        date: l.startDate < todayIso ? todayIso : l.startDate,
        title: l.employeeName,
        detail: `${leaveType(l.type)}${l.halfDay ? ` (half day, ${l.halfDay})` : ''}${l.endDate !== l.startDate ? ` until ${shortDate(l.endDate)}` : ''}`,
        status: l.startDate <= todayIso ? 'Off now' : 'Leave',
        onOpen: onOpenLeave,
      })),
    ...starters
      .filter(
        (st) =>
          st.start_date &&
          st.start_date.slice(0, 10) >= todayIso &&
          st.start_date.slice(0, 10) <= in14
      )
      .map((st) => ({
        key: `start-${st.roster_id}`,
        date: st.start_date!.slice(0, 10),
        title: st.name,
        detail: `New starter${st.job_title ? `, ${st.job_title}` : ''}`,
        status: st.done === st.total ? 'Ready' : `${st.done} of ${st.total} done`,
        tone: st.done === st.total ? undefined : ('yellow' as const),
        onOpen: () => navigate(`/employer?section=team&member=${st.roster_id}`),
      })),
    ...profiles
      .filter((p) => {
        if (!p.ecs_expiry_date) return false;
        const d = p.ecs_expiry_date.slice(0, 10);
        return d >= todayIso && d <= in14;
      })
      .map((p) => {
        const d = p.ecs_expiry_date!.slice(0, 10);
        return {
          key: `ecs-${p.id}`,
          date: d,
          title: p.employee?.name ?? 'Team member',
          detail: `${p.ecs_card_type ? `${p.ecs_card_type} card` : 'ECS card'} expires ${relDays(d)}`,
          status: 'Card expires',
          tone: 'yellow' as const,
          onOpen: () => navigate(`/employer?section=elecid&member=${p.employee_id}`),
        };
      }),
    ...rtwRows
      .filter((r) => {
        if (!r.follow_up_due) return false;
        const d = r.follow_up_due.slice(0, 10);
        return d >= todayIso && d <= in14;
      })
      .map((r) => ({
        key: `rtw-${r.roster_id}`,
        date: r.follow_up_due!.slice(0, 10),
        title: r.name,
        detail: 'Right-to-work follow-up check',
        status: 'Follow-up',
        tone: 'yellow' as const,
        onOpen: () => onNavigate('hrrecords'),
      })),
  ].sort((a, b) => (a.date! < b.date! ? -1 : 1));
  const comingUp = comingAll.slice(0, 6);

  const isLoading =
    employeesLoading ||
    talentLoading ||
    appsLoading ||
    vacanciesLoading ||
    timesheetsLoading ||
    commsLoading ||
    profilesLoading;

  /* ── One live line: what needs doing first, else where things stand ── */

  const todo: string[] = [];
  if (expiredCount > 0) todo.push(`${plural(expiredCount, 'card')} expired`);
  if (pendingTimesheetCount > 0)
    todo.push(`${plural(pendingTimesheetCount, 'timesheet')} to approve`);
  if (pendingLeaveCount > 0) todo.push(`${plural(pendingLeaveCount, 'leave request')} to decide`);
  if (newApplicationsCount > 0)
    todo.push(`${plural(newApplicationsCount, 'new application')} to review`);
  if (notJoinedCount > 0) todo.push(`${notJoinedCount} not joined yet`);
  const standing =
    activeEmployees === 0
      ? 'Nobody on the team yet'
      : `${plural(activeEmployees, 'person', 'people')} on the team, ${
          onSiteNow > 0 ? `${onSiteNow} on site now` : 'nobody on site right now'
        }`;
  const first = todo.join(', ');
  const liveLine =
    todo.length > 0
      ? `${first.charAt(0).toUpperCase()}${first.slice(1)}. ${standing}.`
      : `${standing}. Nothing waiting on you.`;

  /* ── Everything in People ──────────────────────────────────── */

  const contractsDetail =
    roleInfo && !roleInfo.canSeeMoney
      ? 'Owner and admins send contracts'
      : !contractStats || contractStats.total === 0
        ? 'Send a new starter their contract'
        : contractStats.draft > 0
          ? `${contractStats.draft} awaiting signature`
          : 'Signed and on file';

  const n = (v: number, one: string, many = `${one}s`) =>
    v > 0 ? `${v.toLocaleString('en-GB')} ${v === 1 ? one : many}` : undefined;

  const teamLinks: IndexLink[] = [
    {
      title: 'Team',
      detail:
        activeEmployees > 0
          ? notJoinedCount > 0
            ? `${notJoinedCount} not joined yet`
            : 'Everyone has joined'
          : 'Add your first team member',
      value: n(activeEmployees, 'member'),
      onClick: onOpenEmployees,
    },
    {
      title: 'Credentials and Elec-IDs',
      detail:
        expiredCount > 0
          ? `${expiredCount} expired`
          : expiringSoonCount > 0
            ? `${expiringSoonCount} expiring in 30 days`
            : credentialCount > 0
              ? 'All in date'
              : 'No profiles yet',
      problem: expiredCount > 0,
      value: n(credentialCount, 'profile'),
      onClick: onOpenElecID,
    },
    {
      title: 'Timesheets',
      detail:
        pendingTimesheetCount > 0
          ? `${pendingTimesheetCount} to approve`
          : 'Hours in the last 7 days',
      value:
        pendingTimesheetCount === 0 && totalHoursThisWeek > 0
          ? `${Math.round(totalHoursThisWeek)}h`
          : undefined,
      onClick: onOpenTimesheets,
    },
    {
      title: 'Leave',
      detail:
        pendingLeaveCount > 0
          ? `${pendingLeaveCount} to decide`
          : offTodayCount > 0
            ? `${offTodayCount} off today`
            : 'Nobody off today',
      value: offTodayCount > 0 && pendingLeaveCount > 0 ? `${offTodayCount} off` : undefined,
      onClick: onOpenLeave,
    },
    {
      title: 'Worker tracking',
      detail: onSiteNow > 0 ? 'Checked in on site now' : 'Nobody checked in on site',
      value: onSiteNow > 0 ? `${onSiteNow} on site` : undefined,
      onClick: onOpenTracking,
    },
    {
      title: 'Communications',
      detail: unreadComms > 0 ? 'Unread in the team feed' : 'All caught up',
      value: unreadComms > 0 ? `${unreadComms} unread` : undefined,
      onClick: onOpenComms,
    },
    {
      title: 'Subcontractors',
      detail: subcontractorCount > 0 ? 'On your books' : 'Add a subbie with the Subcontractor type',
      value: n(subcontractorCount, 'subbie'),
      onClick: onOpenSubcontractors,
    },
    {
      title: 'Right to work and HR records',
      detail: !isHr
        ? 'Owner and admins only'
        : rtwNeed > 0
          ? `${rtwNeed} without a check${rtwDue > 0 ? `, ${rtwDue} follow-up due` : ''}`
          : rtwDue > 0
            ? `${plural(rtwDue, 'follow-up')} due soon`
            : rtwRows.length > 0
              ? 'Everyone checked'
              : 'Right to work, probation and retention',
      problem: rtwNeed > 0,
      value: isHr && rtwInScope > 0 ? `${rtwDone} of ${rtwInScope}` : undefined,
      onClick: () => onNavigate('hrrecords'),
    },
    {
      title: 'Contracts',
      detail: contractsDetail,
      value:
        contractStats && roleInfo?.canSeeMoney && contractStats.active > 0
          ? `${contractStats.active} active`
          : undefined,
      onClick: () => onNavigate('contracts'),
    },
  ];

  const growLinks: IndexLink[] = [
    {
      title: 'Job vacancies',
      detail:
        newApplicationsCount > 0
          ? `${newApplicationsCount} new to review`
          : openVacancies > 0
            ? 'Open, no new applications'
            : 'Not hiring right now',
      value: n(openVacancies, 'open', 'open'),
      onClick: onOpenVacancies,
    },
    {
      title: 'Talent pool',
      detail: talentCount > 0 ? `${verifiedCount} verified` : 'Nobody available yet',
      value: talentCount > 0 ? `${talentCount.toLocaleString('en-GB')} available` : undefined,
      onClick: onOpenTalentPool,
    },
    {
      title: 'Apprentice progress',
      detail:
        apprenticeCount > 0
          ? apprenticeReviewsOverdue > 0
            ? `${plural(apprenticeReviewsOverdue, 'review')} overdue`
            : apprenticeAttestations > 0
              ? `${apprenticeAttestations} hours entries to attest`
              : 'All up to date'
          : 'No apprentices linked yet',
      problem: apprenticeReviewsOverdue > 0,
      value: n(apprenticeCount, 'apprentice'),
      onClick: onOpenApprentices,
    },
  ];

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="People" description="Loading your team." />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  /* ── Render ────────────────────────────────────────────────── */

  const waiting = pendingTimesheetCount + pendingLeaveCount + expensesWaiting;
  const waitingSub =
    waiting === 0
      ? 'Timesheets, leave and expenses'
      : [
          pendingTimesheetCount ? plural(pendingTimesheetCount, 'timesheet') : null,
          pendingLeaveCount ? `${pendingLeaveCount} leave` : null,
          expensesWaiting ? plural(expensesWaiting, 'expense') : null,
        ]
          .filter(Boolean)
          .join(', ');

  return (
    <PageFrame className={cn(frameClass, matePad)}>
      <PageHero
        title="People"
        description={liveLine}
        actions={
          <HeroActions>
            <HeroPrimary onClick={onOpenEmployees}>Add team member</HeroPrimary>
            <HeroSecondary onClick={onOpenVacancies}>Post vacancy</HeroSecondary>
            <PageHelpButton help={PEOPLE_HUB_HELP} askContext={{ page: 'peoplehub' }} />
          </HeroActions>
        }
      />

      <HowItWorks help={PEOPLE_HUB_HELP} askContext={{ page: 'peoplehub' }} />

      <StatCards
        stats={[
          {
            label: 'Team',
            value: activeEmployees,
            sub:
              activeEmployees === 0
                ? 'Nobody added yet'
                : onSiteNow > 0
                  ? `${onSiteNow} on site now`
                  : 'Nobody on site now',
            onOpen: onOpenEmployees,
          },
          {
            label: 'Cards in date',
            // The true count, never a percentage of a small team.
            value: activeEmployees > 0 ? `${inDateCards} of ${activeEmployees}` : '0',
            sub:
              activeEmployees === 0
                ? 'ECS cards across the team'
                : expiredCount > 0
                  ? `${expiredCount} expired`
                  : expiringSoonCount > 0
                    ? `${expiringSoonCount} due in 30 days`
                    : inDateCards < activeEmployees
                      ? `${activeEmployees - inDateCards} with no card on file`
                      : 'Everyone in date',
            progress: activeEmployees > 0 ? inDateCards / activeEmployees : 0,
            tone: expiredCount > 0 ? 'red' : undefined,
            onOpen: onOpenElecID,
          },
          {
            label: 'Waiting on you',
            value: waiting,
            sub: waitingSub,
            onOpen:
              pendingTimesheetCount > 0
                ? onOpenTimesheets
                : pendingLeaveCount > 0
                  ? onOpenLeave
                  : expensesWaiting > 0
                    ? () => onNavigate('expenses')
                    : onOpenTimesheets,
          },
          isHr
            ? {
                label: 'Right to work',
                value: rtwInScope > 0 ? `${rtwDone} of ${rtwInScope}` : '0',
                sub:
                  rtwInScope === 0
                    ? 'Nobody needs a check'
                    : rtwNeed > 0
                      ? `${rtwNeed} missing`
                      : rtwDue > 0
                        ? `${plural(rtwDue, 'follow-up')} due`
                        : 'Everyone checked',
                progress: rtwInScope > 0 ? rtwDone / rtwInScope : 0,
                tone: rtwNeed > 0 ? 'red' : undefined,
                onOpen: () => onNavigate('hrrecords'),
              }
            : {
                label: 'Open vacancies',
                value: openVacancies,
                sub:
                  newApplicationsCount > 0
                    ? `${plural(newApplicationsCount, 'new application')}`
                    : openVacancies === 0
                      ? 'Not hiring right now'
                      : 'No new applications',
                onOpen: onOpenVacancies,
              },
        ]}
      />

      <section>
        <SectionHead
          title="Who's where today"
          meta={
            // Desktop only: on a phone the heading and action need the row.
            <span className="hidden sm:inline">
              {whereMeta || (nobodyWorking ? 'Everyone off today' : '')}
            </span>
          }
          action="Worker tracking"
          onAction={onOpenTracking}
        />
        {whereAll.length === 0 ? (
          <div className={areaCard}>
            <p className="px-4 py-4 text-[14px] leading-relaxed text-white sm:px-5">
              Nobody on the team yet. Add your first team member and you will see here who is on
              site, travelling, in the office or off.
            </p>
          </div>
        ) : nobodyWorking ? (
          <div className={areaCard}>
            <p className="px-4 py-4 text-[14px] leading-relaxed text-white sm:px-5">
              Nobody is booked on a job or checked in today.
              {whereCount('leave') > 0 &&
                ` ${nameList(whereAll.filter((p) => p.state === 'leave').map((p) => p.name))} ${whereCount('leave') === 1 ? 'is' : 'are'} on leave.`}
            </p>
          </div>
        ) : (
          <>
            <WhoIsWhere
              people={whereShown}
              onOpen={onOpenTracking}
              more={whereAll.length - whereShown.length}
              onMore={onOpenTracking}
            />
            <WhereKey />
          </>
        )}
      </section>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <section className="flex flex-col">
          <SectionHead title="Needs you" meta={needs.length > 0 ? `${needs.length}` : undefined} />
          <ListPanel
            className="flex-1"
            items={needs}
            empty="Nothing needs you. Expired cards, missing right-to-work checks, timesheets, leave and expenses to approve, and people who haven't joined appear here."
          />
        </section>
        <section className="flex flex-col">
          <SectionHead
            title="Coming up"
            meta="Next 14 days"
            action="Leave"
            onAction={onOpenLeave}
          />
          <ListPanel
            className="flex-1"
            items={comingUp}
            empty="Nobody off, starting or with a card running out in the next two weeks."
            footer={
              comingAll.length > comingUp.length ? (
                <span className="text-[13.5px] text-white">
                  {plural(comingAll.length - comingUp.length, 'more item')} in the next 14 days
                </span>
              ) : undefined
            }
          />
        </section>
      </div>

      <section>
        <SectionHead title="Everything in People" />
        <PageTiles
          groups={[
            { title: 'Your team', links: teamLinks },
            { title: 'Grow the team', links: growLinks },
          ]}
        />
      </section>
    </PageFrame>
  );
}
