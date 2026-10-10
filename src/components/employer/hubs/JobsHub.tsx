import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { addDays, format, startOfWeek } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { JOBS_HUB_HELP } from '@/components/employer/help/jobs';
import { useJobs } from '@/hooks/useJobs';
import { useJobPacks } from '@/hooks/useJobPacks';
import { useJobIssueStats } from '@/hooks/useJobIssues';
import { useFleetStats } from '@/hooks/useFleet';
import { useToolStats } from '@/hooks/useCompanyTools';
import { useQsPendingCount } from '@/hooks/useQsReviewQueue';
import { useEmployerHubCounts } from '@/hooks/useFinanceModel';
import { useEmployerHome } from '@/hooks/useEmployerHome';
import { formatGBPCompact } from '@/lib/financeDefinitions';
import { jobStage } from '@/lib/jobStages';
import { useRecurringDueSoon, useFirmRecurring } from '@/hooks/useFirmRecurring';
import { useAutomationsOnCount } from '@/hooks/useEmployerAutomations';
import { useEmployees } from '@/hooks/useEmployees';
import { PageFrame, PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  StatCards,
  SectionHead,
  WeekCalendar,
  CalendarKey,
  ListPanel,
  PipelineBar,
  PageTiles,
} from '@/components/employer/hubs/AreaPage';
import {
  frameClass,
  TwoColumn,
  FigureStrip,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  plural,
} from '@/components/employer/pageParts/PageParts';
import {
  CalendarIcon,
  DocsIcon,
  JobsIcon,
  PeopleIcon,
} from '@/components/employer/overview/HubIcons';
import {
  LivePanel,
  PanelEmpty,
  PanelFoot,
  LinkGroup,
  LinkColumns,
  TimelineList,
  WeekSchedule,
  FlowRow,
  WorkRows,
  liveColClass,
  matePad,
  phoneFirst,
  daysFromToday,
  ymd,
  type HubLink,
  type WorkItem,
  type ScheduleDay,
  HubHero,
  premiumCard,
} from '@/components/employer/hubs/HubPanels';

interface JobsHubProps {
  onNavigate: (section: Section) => void;
}

type Tone = 'volt' | 'red' | 'green' | undefined;

/**
 * Jobs landing. 10 Oct: opens on the week at a glance (jobs and crew per day),
 * the jobs that need you (no crew, past their end date, issues, certificates)
 * and the pipeline by stage, with every page still one tap away on the right.
 */
export function JobsHub({ onNavigate }: JobsHubProps) {
  const navigate = useNavigate();
  const { data: jobs = [], isLoading } = useJobs();
  const { data: jobPacks = [] } = useJobPacks();
  const { data: issueStats } = useJobIssueStats();
  const { data: fleetStats } = useFleetStats();
  const toolStats = useToolStats();
  // The Overview's one round trip (cached): unstaffed jobs this week.
  const { data: home } = useEmployerHome();

  // Same query and key as the Jobs list and Job board, so the cache is shared.
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

  const liveJobs = useMemo(
    () => jobs.filter((j) => !j.archived_at && !j.is_template && j.status !== 'Cancelled'),
    [jobs]
  );

  const activeJobs = jobs.filter((j) => j.status === 'Active').length;
  const todayJobs = jobs.filter((j) => {
    // A job is "on today" when today falls inside its start/end window
    const today = new Date().toISOString().slice(0, 10);
    const start = j.start_date ? String(j.start_date).slice(0, 10) : null;
    const end = j.end_date ? String(j.end_date).slice(0, 10) : null;
    if (!start) return false;
    return start <= today && (!end || end >= today) && j.status === 'Active';
  }).length;
  // Live counts from one firm-scoped call. "Completed 7d" = jobs whose status
  // last changed TO Completed in the past 7 days (from the audit log) — not
  // any completed job that happened to be edited this week.
  const { data: hub } = useEmployerHubCounts();
  const h = hub?.jobs;
  const completed7d = h?.completed_7d ?? 0;
  const activeJobPacks = jobPacks.filter((jp) => jp.status === 'In Progress').length;
  const openIssues = issueStats?.open ?? 0;
  const motDueCount = fleetStats?.motDue ?? 0;
  const qsPendingCount = useQsPendingCount();
  const dueSoon = useRecurringDueSoon(30);
  const { data: recurring = [] } = useFirmRecurring();
  const repeating = recurring.filter((r) => r.status === 'active').length;
  const { data: automationsOn } = useAutomationsOnCount();

  /* ── The week: jobs and crew per day, Monday to Sunday ─────────── */

  const { data: employees = [] } = useEmployees();
  const teamSize = employees.filter((e) => (e.status ?? '').toLowerCase() !== 'archived').length;

  // Crew per job, as ids (for counts) and initials (for the schedule).
  const crewByJob = useMemo(() => {
    const m = new Map<string, Map<string, string>>();
    type A = { job_id: string; employee?: { id?: string; name?: string | null; avatar_initials?: string | null } | null };
    for (const a of allAssignments as A[]) {
      if (!a.employee?.id) continue;
      if (!m.has(a.job_id)) m.set(a.job_id, new Map());
      const name = (a.employee.name ?? '').trim();
      const initials =
        a.employee.avatar_initials ||
        name
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((w) => w[0]!.toUpperCase())
          .join('') ||
        '?';
      m.get(a.job_id)!.set(a.employee.id, initials);
    }
    return m;
  }, [allAssignments]);

  const onDay = (j: (typeof liveJobs)[number], day: string) => {
    if (j.status !== 'Active' && j.status !== 'Pending') return false;
    const start = j.start_date ? String(j.start_date).slice(0, 10) : null;
    if (!start || start > day) return false;
    const end = j.end_date ? String(j.end_date).slice(0, 10) : null;
    // Open-ended live work counts every day, as "On today" does; a pending
    // job with no end date only on its start day.
    return end ? end >= day : j.status === 'Active' || start === day;
  };

  // The week as a schedule: each day's actual jobs with their crew.
  const schedule: ScheduleDay[] = useMemo(() => {
    const mon = startOfWeek(new Date(), { weekStartsOn: 1 });
    const todayKey = ymd(new Date());
    return Array.from({ length: 7 }, (_, i) => {
      const day = ymd(addDays(mon, i));
      return {
        date: day,
        jobs: liveJobs
          .filter((j) => onDay(j, day))
          .map((j) => {
            const start = j.start_date ? String(j.start_date).slice(0, 10) : null;
            const end = j.end_date ? String(j.end_date).slice(0, 10) : null;
            const crew = [...(crewByJob.get(j.id)?.values() ?? [])];
            return {
              id: j.id,
              title: j.title,
              client: j.client || null,
              crew,
              span:
                start === day && end === day
                  ? ('single' as const)
                  : start === day
                    ? ('start' as const)
                    : end === day
                      ? ('end' as const)
                      : ('through' as const),
              problem: (crew.length === 0 && day >= todayKey) || (!!end && end < todayKey),
              onOpen: () => navigate(`/employer?section=jobs&job=${j.id}`),
            };
          }),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveJobs, crewByJob]);

  // Kept for the "no crew this week" line: any day with a job nobody is on.
  const week = schedule.map((d) => ({
    date: d.date,
    count: d.jobs.length,
    flag: d.jobs.some((j) => j.crew.length === 0) && d.date >= ymd(new Date()),
  }));

  // Person-days booked Monday to Friday against the team's capacity.
  const crewDaysBooked = schedule.slice(0, 5).reduce((n, d) => {
    const people = new Set<string>();
    for (const j of d.jobs) {
      crewByJob.get(j.id)?.forEach((_, id) => people.add(id));
    }
    return n + people.size;
  }, 0);
  const crewDaysCap = teamSize * 5;

  // Booked ahead: jobs starting in the next four weeks (after today).
  const bookedAhead = useMemo(() => {
    const t = ymd(new Date());
    const to = ymd(addDays(new Date(), 28));
    return liveJobs.filter((j) => {
      if (j.status !== 'Active' && j.status !== 'Pending') return false;
      const start = j.start_date ? String(j.start_date).slice(0, 10) : null;
      return !!start && start > t && start <= to;
    }).length;
  }, [liveJobs]);

  // Finished in the last 30 days, from the completion stamp.
  const finished30 = useMemo(() => {
    const from = ymd(addDays(new Date(), -30));
    return jobs.filter((j) => j.completed_at && String(j.completed_at).slice(0, 10) >= from).length;
  }, [jobs]);

  // Next week, for the side column.
  const nextWeek = useMemo(() => {
    const mon = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 7);
    const from = ymd(mon);
    const to = ymd(addDays(mon, 6));
    return liveJobs
      .filter((j) => {
        if (j.status !== 'Active' && j.status !== 'Pending') return false;
        const start = j.start_date ? String(j.start_date).slice(0, 10) : null;
        return !!start && start >= from && start <= to;
      })
      .sort((a, b) => (String(a.start_date) < String(b.start_date) ? -1 : 1));
  }, [liveJobs]);

  const weekJobs = useMemo(() => {
    const ids = new Set<string>();
    const mon = startOfWeek(new Date(), { weekStartsOn: 1 });
    const from = ymd(mon);
    const to = ymd(addDays(mon, 6));
    for (const j of liveJobs) {
      if (j.status !== 'Active' && j.status !== 'Pending') continue;
      const start = j.start_date ? String(j.start_date).slice(0, 10) : null;
      if (!start || start > to) continue;
      const end = j.end_date ? String(j.end_date).slice(0, 10) : null;
      if (end ? end >= from : j.status === 'Active' || start >= from) ids.add(j.id);
    }
    return ids.size;
  }, [liveJobs]);

  /* ── Needs you: one row per job or problem, one pill each ──────── */

  const today = ymd(new Date());
  const overdueJobs = liveJobs
    .filter((j) => {
      const end = j.end_date ? String(j.end_date).slice(0, 10) : null;
      const st = jobStage(j);
      return !!end && end < today && j.status === 'Active' && st !== 'Complete' && st !== 'On Hold';
    })
    .sort((a, b) => (String(a.end_date) < String(b.end_date) ? -1 : 1));

  const attention: WorkItem[] = [];
  for (const j of (home?.jobs.unstaffed_week_list ?? []).slice(0, 3)) {
    const d = j.start_date ? daysFromToday(j.start_date) : null;
    attention.push({
      key: `crew-${j.id}`,
      title: j.title,
      detail: [
        j.client,
        d === null ? null : d <= 0 ? 'Starts today' : d === 1 ? 'Starts tomorrow' : `Starts in ${d} days`,
      ]
        .filter(Boolean)
        .join(' · '),
      pill: { tone: d !== null && d <= 1 ? 'red' : 'volt', text: 'No crew' },
      onOpen: () => navigate(`/employer?section=jobs&job=${j.id}`),
    });
  }
  for (const j of overdueJobs.slice(0, 3)) {
    const late = -daysFromToday(String(j.end_date).slice(0, 10));
    attention.push({
      key: `late-${j.id}`,
      title: j.title,
      detail: `${j.client ? `${j.client} · ` : ''}Still open past its end date`,
      pill: { tone: 'red', text: `${plural(late, 'day')} over` },
      onOpen: () => navigate(`/employer?section=jobs&job=${j.id}`),
    });
  }
  if (h && h.tests_failed > 0)
    attention.push({
      key: 'tests',
      title: `${plural(h.tests_failed, 'certificate')} returned by QS`,
      detail: 'Fix and resubmit for sign-off',
      pill: { tone: 'red', text: 'Returned' },
      onOpen: () => onNavigate('testing'),
    });
  if (qsPendingCount > 0)
    attention.push({
      key: 'qs',
      title: `${plural(qsPendingCount, 'certificate')} to sign off`,
      detail: 'Waiting in QS reviews',
      pill: { tone: 'volt', text: 'Review' },
      onOpen: () => onNavigate('qsreviews'),
    });
  if (openIssues > 0)
    attention.push({
      key: 'issues',
      title: `${plural(openIssues, 'open issue')}`,
      detail: 'Problems the crew raised on site',
      pill: { tone: 'volt', text: `${openIssues} open` },
      onOpen: () => onNavigate('issues'),
    });
  if (h && h.snags_open > 0)
    attention.push({
      key: 'snags',
      title: `${plural(h.snags_open, 'open snag')}`,
      detail: 'Punch-list items still to close',
      pill: { tone: 'neutral', text: `${h.snags_open} open` },
      onOpen: () => onNavigate('quality'),
    });
  const unstaffedMore = Math.max(0, (home?.jobs.unstaffed_week ?? 0) - 3);
  const overdueMore = Math.max(0, overdueJobs.length - 3);

  /* ── Pipeline by stage ─────────────────────────────────────────── */

  const stageCount = (ids: string[]) => liveJobs.filter((j) => ids.includes(jobStage(j))).length;
  const stages = [
    { key: 'enq', label: 'Enquiry', count: stageCount(['Enquiry']) },
    { key: 'quoted', label: 'Quoted', count: stageCount(['Quoted']) },
    { key: 'won', label: 'Won, no date', count: stageCount(['Confirmed']) },
    { key: 'booked', label: 'Booked', count: stageCount(['Scheduled']) },
    { key: 'on', label: 'In progress', count: stageCount(['In Progress', 'Testing']), current: true },
    { key: 'done', label: 'Done', count: stageCount(['Complete']) },
  ].map((s) => ({ ...s, onOpen: () => onNavigate('jobboard') }));
  const onHold = stageCount(['On Hold']);

  /* ── Link groups ───────────────────────────────────────────────── */

  const testsStatus: { text?: string; tone?: Tone } = h
    ? h.tests_total === 0
      ? { text: 'No certificates on jobs yet' }
      : h.tests_failed > 0
        ? { text: `${plural(h.tests_failed, 'certificate')} returned by QS`, tone: 'red' }
        : h.tests_pending > 0
          ? { text: `${plural(h.tests_pending, 'certificate')} waiting`, tone: 'volt' }
          : { text: `${plural(h.tests_total, 'certificate')} on jobs` }
    : {};

  const kitStatus: { text: string; tone?: Tone } =
    toolStats.total === 0
      ? { text: 'No kit logged yet' }
      : toolStats.toolsOverdue > 0
        ? { text: `${plural(toolStats.toolsOverdue, 'item')} overdue`, tone: 'red' }
        : toolStats.toolsDue > 0
          ? { text: `${toolStats.toolsDue} due in 30 days`, tone: 'volt' }
          : { text: `${plural(toolStats.total, 'item')}, all in date` };

  const financialsStatus: { text?: string; tone?: Tone } = h
    ? h.jobs_gross_profit === null || h.jobs_loss_making === null
      ? { text: 'Owner and admins only' }
      : h.jobs_loss_making > 0
        ? { text: `${plural(h.jobs_loss_making, 'job')} losing money`, tone: 'red' }
        : h.jobs_invoiced > 0
          ? {
              text: `${formatGBPCompact(h.jobs_gross_profit)} gross profit on ${plural(h.jobs_invoiced, 'invoiced job')}`,
            }
          : { text: 'No jobs invoiced yet' }
    : {};

  const recurringStatus =
    dueSoon.total > 0
      ? [
          dueSoon.visits ? plural(dueSoon.visits, 'visit') + ' booking soon' : null,
          dueSoon.certs ? plural(dueSoon.certs, 'renewal') + ' due in 30 days' : null,
        ]
          .filter(Boolean)
          .join(' · ')
      : repeating > 0
        ? `${plural(repeating, 'repeat visit')}, nothing due this month`
        : 'No repeat visits yet';

  const toneLink = (t: Tone) => (t === 'red' ? { problem: true } : {});
  const count = (n: number | undefined, one: string, many = one) =>
    n && n > 0 ? { value: n.toLocaleString('en-GB'), valueSub: n === 1 ? one : many } : {};

  const planLinks: HubLink[] = [
    {
      title: 'All jobs',
      detail: activeJobs > 0 ? 'Every job, with crew, stage and money' : 'No active jobs',
      ...count(activeJobs, 'active'),
      onClick: () => onNavigate('jobs'),
    },
    {
      title: 'Job board',
      detail: 'Drag jobs from enquiry to done',
      ...count(liveJobs.length, 'on the board'),
      onClick: () => onNavigate('jobboard'),
    },
    {
      title: 'Diary',
      detail: todayJobs > 0 ? `${plural(todayJobs, 'job')} on today` : 'Nothing booked today',
      onClick: () => onNavigate('diary'),
    },
    {
      title: 'Timeline',
      detail: 'Every job across the weeks ahead',
      onClick: () => onNavigate('timeline'),
    },
    {
      title: 'Job packs',
      detail:
        activeJobPacks > 0 ? 'Waiting on crew signatures' : 'No packs waiting on signatures',
      pill: activeJobPacks > 0 ? { tone: 'volt', text: `${activeJobPacks} to sign` } : undefined,
      onClick: () => onNavigate('jobpacks'),
    },
  ];

  const siteLinks: HubLink[] = [
    {
      title: 'Worker tracking',
      detail: h
        ? h.on_site_now > 0
          ? 'Checked in on site now'
          : 'Nobody checked in on site'
        : 'Who is on site, live',
      ...count(h?.on_site_now, 'on site'),
      onClick: () => onNavigate('tracking'),
    },
    {
      title: 'Site diary',
      detail: h
        ? h.progress_logs_7d > 0
          ? 'Entries this week'
          : h.last_progress_log
            ? `Last entry ${format(new Date(`${h.last_progress_log}T12:00:00`), 'd MMM')}`
            : 'Nothing written yet'
        : 'What the crew logged each day',
      ...count(h?.progress_logs_7d, 'this week'),
      onClick: () => onNavigate('progresslogs'),
    },
    {
      title: 'Issues',
      detail: openIssues > 0 ? 'Raised by the crew' : 'All clear',
      pill: openIssues > 0 ? { tone: 'volt', text: `${openIssues} open` } : undefined,
      onClick: () => onNavigate('issues'),
    },
    {
      title: 'Snags and punch lists',
      detail: h ? (h.snags_open > 0 ? 'Still to close' : 'No open snags') : 'Snags by job',
      pill: h && h.snags_open > 0 ? { tone: 'volt', text: `${h.snags_open} open` } : undefined,
      onClick: () => onNavigate('quality'),
    },
    {
      title: 'Photo gallery',
      detail: h
        ? h.photos_total > 0
          ? `${h.photos_7d} this week`
          : 'No photos yet'
        : 'Every photo from site',
      ...count(h?.photos_total, 'photo', 'photos'),
      onClick: () => onNavigate('photogallery'),
    },
  ];

  const certLinks: HubLink[] = [
    {
      title: 'Testing',
      detail: testsStatus.text ?? 'Certificates on jobs',
      ...toneLink(testsStatus.tone),
      pill:
        h && h.tests_pending > 0 && h.tests_failed === 0
          ? { tone: 'volt', text: `${h.tests_pending} waiting` }
          : undefined,
      onClick: () => onNavigate('testing'),
    },
    {
      title: 'QS reviews',
      detail: qsPendingCount > 0 ? 'Awaiting sign-off' : 'Nothing waiting',
      pill: qsPendingCount > 0 ? { tone: 'volt', text: `${qsPendingCount} to sign` } : undefined,
      onClick: () => onNavigate('qsreviews'),
    },
    {
      title: 'Recurring work',
      detail: recurringStatus,
      pill: dueSoon.total > 0 ? { tone: 'volt', text: `${dueSoon.total} due` } : undefined,
      onClick: () => onNavigate('recurring'),
    },
  ];

  const kitLinks: HubLink[] = [
    {
      title: 'Fleet',
      detail:
        motDueCount > 0
          ? 'MOT due'
          : fleetStats && fleetStats.total === 0
            ? 'No vans added yet'
            : 'All up to date',
      pill: motDueCount > 0 ? { tone: 'volt', text: `${motDueCount} MOT due` } : undefined,
      ...(motDueCount > 0 ? {} : count(fleetStats?.total, 'van', 'vans')),
      onClick: () => onNavigate('fleet'),
    },
    {
      title: 'Kit register',
      detail: kitStatus.text,
      ...toneLink(kitStatus.tone),
      pill:
        kitStatus.tone === 'volt' ? { tone: 'volt', text: `${toolStats.toolsDue} due` } : undefined,
      onClick: () => onNavigate('kit'),
    },
    {
      title: 'Purchase orders',
      detail: h ? (h.open_pos > 0 ? 'Open with suppliers' : 'No open orders') : 'Orders by job',
      ...count(h?.open_pos, 'open'),
      onClick: () => onNavigate('procurement'),
    },
    {
      title: 'Job financials',
      detail: financialsStatus.text ?? 'Profit per job',
      ...toneLink(financialsStatus.tone),
      onClick: () => onNavigate('financials'),
    },
    {
      title: 'Automations',
      detail:
        automationsOn === undefined
          ? undefined
          : automationsOn > 0
            ? 'Rules running for you'
            : 'All off until you turn one on',
      ...count(automationsOn, 'on'),
      onClick: () => onNavigate('automations'),
    },
  ];

  // One live line: what needs doing first, else where things stand.
  const todo: string[] = [];
  if (qsPendingCount > 0) todo.push(`${plural(qsPendingCount, 'certificate')} to sign off`);
  if (openIssues > 0) todo.push(`${plural(openIssues, 'open issue')}`);
  if (h && h.tests_failed > 0) todo.push(`${plural(h.tests_failed, 'certificate')} returned`);
  const standing = `${activeJobs} active, ${todayJobs > 0 ? `${todayJobs} on today` : 'nothing on today'}`;
  const liveLine =
    todo.length > 0 ? `${todo.join(', ')}. ${standing}.` : `${standing}. Nothing waiting on you.`;

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Jobs" description="Loading your jobs." />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const weekEmpty = week.every((d) => d.count === 0);
  const startingSoon = (home?.jobs.starting_week ?? []).slice(0, 4);
  // The Overview's count when it has loaded, so the two pages agree.
  const noCrewWeek = home ? home.jobs.unstaffed_week : week.some((d) => d.flag) ? 1 : 0;

  const toIndex = (l: HubLink) => ({
    title: l.title,
    detail: l.pill ? l.pill.text : l.detail,
    problem: !!l.problem || l.pill?.tone === 'red',
    value:
      l.value !== undefined && l.value !== null
        ? `${l.value}${l.valueSub ? ` ${l.valueSub}` : ''}`
        : undefined,
    onClick: l.onClick,
  });

  // Money only for those who may see it (the hub counts return null otherwise).
  const canSeeMoney = !!h && h.jobs_gross_profit !== null;
  const inHand = liveJobs
    .filter((j) => j.status === 'Active')
    .reduce((n, j) => n + (Number(j.value) || 0), 0);

  return (
    <PageFrame className={cn(frameClass, matePad)}>
      <PageHero
        title="Jobs"
        description={liveLine}
        actions={
          <HeroActions>
            <HeroPrimary onClick={() => navigate('/employer?section=jobs&new=1')}>New job</HeroPrimary>
            <HeroSecondary onClick={() => onNavigate('diary')}>Diary</HeroSecondary>
            <PageHelpButton help={JOBS_HUB_HELP} askContext={{ page: 'jobshub' }} />
          </HeroActions>
        }
      />

      <HowItWorks help={JOBS_HUB_HELP} askContext={{ page: 'jobshub' }} />

      <StatCards
        stats={[
          canSeeMoney
            ? {
                label: 'Work in hand',
                value: formatGBPCompact(inHand),
                sub: activeJobs > 0 ? plural(activeJobs, 'active job') : 'No active jobs',
                onOpen: () => onNavigate('jobs'),
              }
            : {
                label: 'Active jobs',
                value: activeJobs,
                sub: 'In progress or booked',
                onOpen: () => onNavigate('jobs'),
              },
          {
            label: 'Crew booked',
            value: crewDaysCap > 0 ? `${Math.round((crewDaysBooked / crewDaysCap) * 100)}%` : '0%',
            sub: crewDaysCap > 0 ? `${crewDaysBooked} of ${crewDaysCap} person-days this week` : 'Add your team',
            progress: crewDaysCap > 0 ? crewDaysBooked / crewDaysCap : 0,
            onOpen: () => onNavigate('diary'),
          },
          {
            label: 'Booked ahead',
            value: bookedAhead,
            sub: 'Starting in the next 4 weeks',
            onOpen: () => onNavigate('timeline'),
          },
          {
            label: 'Finished',
            value: finished30,
            sub: 'In the last 30 days',
            onOpen: () => onNavigate('jobboard'),
          },
        ]}
      />

      <section>
        <SectionHead
          title="This week"
          meta={weekJobs > 0 ? plural(weekJobs, 'job') : 'Nothing booked'}
          action="Open diary"
          onAction={() => onNavigate('diary')}
        />
        <WeekCalendar
          days={schedule.map((d) => ({
            date: d.date,
            jobs: d.jobs.map((j) => {
              const live = liveJobs.find((x) => x.id === j.id);
              const started =
                !!live?.start_date && String(live.start_date).slice(0, 10) <= ymd(new Date());
              return {
                id: j.id,
                title: j.title,
                client: j.client,
                crew: j.crew,
                state: j.problem ? ('late' as const) : started && live?.status === 'Active' ? ('in' as const) : ('booked' as const),
                note: j.span === 'start' ? 'Starts' : j.span === 'end' ? 'Ends' : undefined,
                onOpen: j.onOpen,
              };
            }),
          }))}
        />
        <CalendarKey />
      </section>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <section className="flex flex-col">
          <SectionHead title="Needs you" meta={attention.length > 0 ? `${attention.length}` : undefined} />
          <ListPanel
            className="flex-1"
            items={attention.map((w) => ({
              key: w.key,
              title: w.title,
              detail: w.detail,
              status: w.pill?.text,
              tone: w.pill?.tone === 'red' ? ('red' as const) : ('yellow' as const),
              onOpen: w.onOpen,
            }))}
            empty="Nothing needs you. Jobs with no crew, jobs past their end date, open issues and certificates to sign off appear here."
            footer={
              unstaffedMore > 0 || overdueMore > 0 ? (
                <button type="button" onClick={() => onNavigate('jobs')} className="text-[13.5px] font-semibold text-elec-yellow">
                  {[
                    unstaffedMore > 0 ? `${plural(unstaffedMore, 'more job')} with no crew` : null,
                    overdueMore > 0 ? `${plural(overdueMore, 'more job')} past its end date` : null,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </button>
              ) : undefined
            }
          />
        </section>
        <section className="flex flex-col">
          <SectionHead
            title="Coming up"
            meta="Next week"
            action="Timeline"
            onAction={() => onNavigate('timeline')}
          />
          <ListPanel
            className="flex-1"
            items={nextWeek.slice(0, 5).map((j) => {
              const n = crewByJob.get(j.id)?.size ?? 0;
              return {
                key: j.id,
                date: j.start_date ? String(j.start_date).slice(0, 10) : undefined,
                title: j.title,
                detail: j.client || j.location || undefined,
                status: n > 0 ? `${n} crew` : 'No crew',
                tone: n > 0 ? undefined : ('red' as const),
                onOpen: () => navigate(`/employer?section=jobs&job=${j.id}`),
              };
            })}
            empty="Nothing booked for next week yet."
          />
        </section>
      </div>

      <section>
        <SectionHead
          title="Pipeline"
          meta={onHold > 0 ? `${plural(onHold, 'job')} on hold` : `${plural(liveJobs.length, 'job')} from enquiry to done`}
          action="Job board"
          onAction={() => onNavigate('jobboard')}
        />
        <PipelineBar stages={stages} />
      </section>

      <section>
        <SectionHead title="Everything in Jobs" />
        <PageTiles
          groups={[
            { title: 'Plan and book', links: planLinks.map(toIndex) },
            { title: 'On site', links: siteLinks.map(toIndex) },
            { title: 'Certificates', links: certLinks.map(toIndex) },
            { title: 'Vans, kit and money', links: kitLinks.map(toIndex) },
          ]}
        />
      </section>
    </PageFrame>
  );
}
