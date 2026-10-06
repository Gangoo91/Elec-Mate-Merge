import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import {
  PageFrame,
  PageHero,
  StatStrip,
  QuickActionTile,
  AlertRow,
  SectionHeader,
  HubGrid,
  HubCard,
  Pill,
  Eyebrow,
  IconButton,
  LoadingBlocks,
  ListCard,
  ListBody,
  ListRow,
  Avatar,
} from '@/components/employer/editorial';
import { useEmployerDashboardStats } from '@/hooks/useEmployerDashboardStats';
import { useEmployerOverview, type RadarItem } from '@/hooks/useEmployerOverview';
import { useLeads } from '@/hooks/useLeads';
import { useMaterialOrders, useQuotes } from '@/hooks/useFinance';
import { useVacancyStats } from '@/hooks/useVacancies';
import { useQsReviewQueue } from '@/hooks/useQsReviewQueue';
import { useJobSignals } from '@/hooks/useJobSignals';
import { useJobs } from '@/hooks/useJobs';
import { useWorkerLocations } from '@/hooks/useWorkerLocations';
import { useEmployerOtjAttestations } from '@/hooks/useEmployerOtjAttestations';
import {
  useIncidents,
  isIncidentClosed,
  isRiddorReportable,
  overdueActions,
  riddorDeadline,
} from '@/hooks/useIncidents';
import { useTeamLeaveRequests } from '@/hooks/useTeamLeave';
import type { Section } from '@/pages/employer/EmployerDashboard';
import type { Tone } from '@/components/employer/editorial';

interface OverviewSectionProps {
  onNavigate: (section: Section) => void;
  onOpenMate?: () => void;
  onOpenCommand?: () => void;
}

import { FirstRunChecklist, useFirstRunChecklist } from '@/components/employer/FirstRunChecklist';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { QuotePagePromoCard } from '@/components/employer/QuotePagePromoCard';
import { MateEntryCard } from '@/components/employer/EmployerMate';
import { CommandTrigger } from '@/components/employer/EmployerCommandPalette';

const gbp = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;

/** Who is booked on which job today — the dispatch view every office keeps on
 *  a whiteboard. Assignment rows for jobs that overlap today, joined to the
 *  roster for names. RLS scopes it to the acting employer. */
interface TodayAssignment {
  jobId: string;
  employeeId: string;
  name: string;
  initials: string | null;
  roleOnJob: string | null;
}
function useTodayAssignments(jobIds: string[]) {
  return useQuery<TodayAssignment[]>({
    queryKey: ['today-assignments', jobIds],
    queryFn: async () => {
      if (jobIds.length === 0) return [];
      const today = new Date().toISOString().slice(0, 10);
      const { data, error } = await supabase
        .from('employer_job_assignments')
        .select('job_id, employee_id, role_on_job, start_date, end_date, status, employee:employer_employees(name, avatar_initials)')
        .in('job_id', jobIds);
      if (error) throw error;
      return (data ?? [])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((a: any) => {
          const st = String(a.status || 'assigned').toLowerCase();
          if (['completed', 'cancelled', 'removed', 'ended'].includes(st)) return false;
          if (a.start_date && a.start_date > today) return false;
          if (a.end_date && a.end_date < today) return false;
          return true;
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((a: any) => ({
          jobId: a.job_id,
          employeeId: a.employee_id,
          name: a.employee?.name ?? 'Team member',
          initials: a.employee?.avatar_initials ?? null,
          roleOnJob: a.role_on_job ?? null,
        }));
    },
    staleTime: 60_000,
  });
}

const RADAR_GROUP_LABEL: Record<RadarItem['kind'], (n: number) => string> = {
  overdue_invoice: (n) => `${n} overdue invoices`,
  draft_invoice: (n) => `${n} draft invoices never sent`,
  cert_expiry: (n) => `${n} certificates expiring soon`,
  job_overdue: (n) => `${n} jobs past their end date`,
  unsigned_pack: (n) => `${n} job packs not signed`,
  vehicle_expiry: (n) => `${n} vehicle documents expiring`,
};
const SEVERITY_ORDER = ['red', 'orange', 'amber', 'yellow', 'blue', 'cyan', 'emerald'];

// Invoice rows open the Quotes & Invoices page on the Invoices tab rather than
// the Finance hub landing (one tap closer to the thing to do).
const radarTarget = (it: RadarItem): { section: Section; params?: Record<string, string> } =>
  it.kind === 'overdue_invoice' || it.kind === 'draft_invoice'
    ? { section: 'quotes' as Section, params: { tab: it.kind === 'overdue_invoice' ? 'overdue' : 'invoices' } }
    : { section: it.section as Section };

function groupRadarItems(items: RadarItem[]) {
  const byKind = new Map<RadarItem['kind'], RadarItem[]>();
  for (const it of items) byKind.set(it.kind, [...(byKind.get(it.kind) ?? []), it]);
  const rows: {
    key: string;
    title: string;
    sub: string;
    section: Section;
    tone: Tone;
    count?: number;
    params?: Record<string, string>;
  }[] = [];
  for (const [kind, group] of byKind) {
    if (group.length < 3) {
      group.forEach((it, i) =>
        rows.push({
          key: `radar-${it.kind}-${it.id}-${i}`,
          title: it.title,
          sub: it.subtitle,
          ...radarTarget(it),
          tone: it.severity as Tone,
        })
      );
      continue;
    }
    const total = group.reduce((sum, it) => sum + (Number(it.amount) || 0), 0);
    const worst =
      group
        .map((it) => it.severity as string)
        .sort((a, b) => SEVERITY_ORDER.indexOf(a) - SEVERITY_ORDER.indexOf(b))[0] ?? 'orange';
    rows.push({
      key: `radar-${kind}`,
      title:
        RADAR_GROUP_LABEL[kind](group.length) +
        (total > 0 ? ` · £${Math.round(total).toLocaleString('en-GB')}` : ''),
      sub: group
        .slice(0, 3)
        .map((it) => it.title)
        .join(' · ') + (group.length > 3 ? ` · +${group.length - 3} more` : ''),
      ...radarTarget(group[0]),
      tone: worst as Tone,
      count: group.length,
    });
  }
  return rows;
}

const ATTENTION_RANK: Record<string, number> = {
  'riddor-due': -2,
  'open-incidents': -1,
  'incident-actions-overdue': 0,
  'unstaffed-today': 1,
  'otj-attestations': 2,
  'qs-reviews': 3,
  timesheets: 4,
  leave: 5,
  expenses: 6,
  'jobs-attention': 7,
  radar: 8,
  'late-pos': 9,
  'deliveries-due': 10,
  'unsent-quotes': 11,
  'new-leads': 12,
  applications: 13,
};
const attentionRank = (key: string) =>
  ATTENTION_RANK[key] ?? (key.startsWith('radar') ? ATTENTION_RANK.radar : 50);

export function OverviewSection({ onNavigate, onOpenMate, onOpenCommand }: OverviewSectionProps) {
  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();
  // Jobs section reads ?job=<id> and opens that job's sheet directly.
  const openJob = (jobId: string) => setSearchParams({ section: 'jobs', job: jobId });
  const { stats, isLoading, error: statsError, refetch } = useEmployerDashboardStats();
  const { data: radar, refetch: refetchRadar } = useEmployerOverview();
  const { data: leads = [] } = useLeads();
  const { data: materialOrders = [] } = useMaterialOrders();
  const { data: quotes = [] } = useQuotes();
  const { data: vacancyStats } = useVacancyStats();
  // QS certificates awaiting this user's sign-off (empty unless they're a QS).
  const { data: qsPending = [] } = useQsReviewQueue('pending');
  // Jobs carrying a cross-section signal (incident / overdue invoice / cert).
  const { data: jobSignals } = useJobSignals();
  const { data: jobs = [] } = useJobs();
  const { data: workerLocations = [] } = useWorkerLocations();
  // Apprentices' off-the-job entries waiting for a workplace attestation.
  const { data: otjPending = [] } = useEmployerOtjAttestations();
  // Safety reports still open (worker near-misses and incidents, ELE-1945) and
  // leave waiting on a decision — both arrive as alerts but had no row here.
  const { data: incidents = [] } = useIncidents();
  const { data: leaveRequests = [] } = useTeamLeaveRequests();

  const {
    activeEmployees,
    activeJobs,
    expiringCertifications: expiringCerts,
    pendingExpenses,
    certComplianceRate,
  } = stats;

  const newApplications = vacancyStats?.newApplications || 0;
  const cash = radar?.cash;
  const radarItems: RadarItem[] = radar?.items ?? [];
  const pendingTimesheets = radar?.counts.pending_timesheets ?? 0;
  const pendingQsReviews = qsPending.length;
  // Three different asks, so three rows (ELE-1945): reports nobody has
  // opened, RIDDOR reports the HSE has not had, and fixes past their date.
  const openIncidents = incidents.filter((i) => !isIncidentClosed(i));
  const unseenIncidents = openIncidents.filter((i) => !i.acknowledged_at);
  const riddorOutstanding = openIncidents
    .filter((i) => isRiddorReportable(i.riddor_category) && !i.riddor_reported_at)
    .map((i) => ({ i, due: riddorDeadline(i) }))
    .sort((a, b) => (a.due?.getTime() ?? Infinity) - (b.due?.getTime() ?? Infinity));
  const incidentsWithOverdue = openIncidents.filter((i) => overdueActions(i).length > 0);
  const overdueActionCount = incidentsWithOverdue.reduce((n, i) => n + overdueActions(i).length, 0);
  const pendingLeave = leaveRequests.filter((l) => l.status === 'pending');
  const jobsNeedingAttention = jobSignals?.size ?? 0;

  // Sales pipeline from the new Leads area, surfaced in the command centre.
  const openLeads = leads.filter((l) => l.stage !== 'Won' && l.stage !== 'Lost');
  const leadPipeline = openLeads.reduce((s, l) => s + (Number(l.estimated_value) || 0), 0);
  const leadsDecided = leads.filter((l) => l.stage === 'Won' || l.stage === 'Lost').length;
  const leadWinRate =
    leadsDecided > 0
      ? Math.round((leads.filter((l) => l.stage === 'Won').length / leadsDecided) * 100)
      : 0;

  // Today: jobs in progress now + workers currently on site.
  const todayIso = new Date().toISOString().slice(0, 10);
  const todaysJobs = jobs.filter(
    (j) =>
      (j.status || '').toLowerCase() === 'active' &&
      (!j.start_date || j.start_date <= todayIso) &&
      (!j.end_date || j.end_date >= todayIso)
  );
  // Only count check-ins from today — a worker who checked in days ago and never
  // checked out must not be presented as on site under a "Today" header.
  const onSiteCount = workerLocations.filter(
    (w) => w.status === 'On Site' && (w.last_updated ?? '').slice(0, 10) === todayIso
  ).length;
  // Jobs that are live today but have nobody booked on them are the thing that
  // holds a job up — flag them, don't just count them.
  const todaysJobIds = useMemo(() => todaysJobs.map((j) => j.id), [todaysJobs]);
  const { data: todayAssignments = [] } = useTodayAssignments(todaysJobIds);
  const assignmentsByJob = useMemo(() => {
    const m = new Map<string, TodayAssignment[]>();
    for (const a of todayAssignments) {
      const list = m.get(a.jobId) ?? [];
      list.push(a);
      m.set(a.jobId, list);
    }
    return m;
  }, [todayAssignments]);
  const unstaffedToday = todaysJobs.filter((j) => !(assignmentsByJob.get(j.id)?.length)).length;
  const peopleOutToday = new Set(todayAssignments.map((a) => a.employeeId)).size;
  // New firm = nothing to run yet. The setup checklist leads the page for them
  // and drops to the bottom once the firm is actually running.
  const { data: firstRun } = useFirstRunChecklist();
  const isNewFirm = !!firstRun && (!firstRun.hasJob || firstRun.rosterCount === 0);

  const onOpenPeople = () => onNavigate('peoplehub');
  const onOpenJobs = () => onNavigate('jobshub');
  const onOpenFinance = () => onNavigate('financehub');
  const onOpenSafety = () => onNavigate('safetyhub');
  const onOpenSmartDocs = () => onNavigate('smartdocs');
  const onOpenClients = () => onNavigate('clientshub');
  // The alert rows themselves live on this page — take the user to them.
  const onOpenAlerts = () => {
    document.getElementById('overview-actions')?.scrollIntoView({ behavior: 'smooth' });
  };

  const refreshAll = () => {
    void refetch();
    void refetchRadar();
    // Refresh every other source feeding this page, not just two of them.
    void queryClient.invalidateQueries({ queryKey: ['employer-leads'] });
    void queryClient.invalidateQueries({ queryKey: ['material_orders'] });
    void queryClient.invalidateQueries({ queryKey: ['quotes'] });
    void queryClient.invalidateQueries({ queryKey: ['vacancies', 'stats'] });
    void queryClient.invalidateQueries({ queryKey: ['qsReviews'] });
    void queryClient.invalidateQueries({ queryKey: ['job-signals'] });
    void queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
    void queryClient.invalidateQueries({ queryKey: ['worker-locations'] });
  };

  // Today's money-flow signals — new leads to chase, quotes to send, and the
  // purchase-order pipeline (late deliveries, arriving today).
  const todayStr = new Date().toISOString().split('T')[0];
  const awaitingPo = (o: { status: string }) =>
    ['Sent', 'Confirmed', 'Part-received'].includes(o.status);
  const newLeads = leads.filter((l) => l.stage === 'New').length;
  const quotePageLeads = leads.filter((l) => l.source === 'Quote page').length;
  // Drafts from the last 30 days only — older drafts are abandoned autosaves
  // and nagging about them hides the quotes that matter this week.
  const thirtyDaysAgo = Date.now() - 30 * 86_400_000;
  const unsentQuotes = quotes.filter(
    (q) => q.status === 'Draft' && new Date(q.created_at).getTime() >= thirtyDaysAgo
  ).length;
  const latePOs = materialOrders.filter(
    (o) => awaitingPo(o) && o.expected_date && o.expected_date < todayStr
  ).length;
  const deliveriesDue = materialOrders.filter(
    (o) => awaitingPo(o) && o.expected_date === todayStr
  ).length;

  // Named, one-tap attention rows from the radar, plus the cross-table
  // aggregates the radar reports as counts (timesheets) and the surfaces it
  // doesn't yet cover (expenses, applications).
  const attentionItems: {
    key: string;
    title: string;
    sub: string;
    section: Section;
    tone: Tone;
    count?: number;
    /** Extra URL params so the row lands on the exact tab or item. */
    params?: Record<string, string>;
  }[] = [
    // Safety first: a legal deadline, then a report nobody has opened, then
    // fixes that have slipped. Each outranks everything else on the page.
    ...(riddorOutstanding.length > 0
      ? [
          {
            key: 'riddor-due',
            title:
              riddorOutstanding.length === 1
                ? 'RIDDOR report not yet made'
                : `${riddorOutstanding.length} RIDDOR reports not yet made`,
            sub: riddorOutstanding[0].due
              ? `${riddorOutstanding[0].i.title} · HSE deadline ${riddorOutstanding[0].due.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
              : `${riddorOutstanding[0].i.title} · report on diagnosis`,
            section: 'incidents' as Section,
            tone: 'red' as Tone,
            count: riddorOutstanding.length,
            params: { incident: riddorOutstanding[0].i.id },
          },
        ]
      : []),
    ...(unseenIncidents.length > 0
      ? [
          {
            key: 'open-incidents',
            title: `${unseenIncidents.length} new safety report${unseenIncidents.length === 1 ? '' : 's'}`,
            sub:
              unseenIncidents.length === 1
                ? `${unseenIncidents[0].title} · the reporter is told once you open it`
                : 'Nobody has opened these yet',
            section: 'incidents' as Section,
            tone: 'red' as Tone,
            count: unseenIncidents.length,
            params: unseenIncidents.length === 1 ? { incident: unseenIncidents[0].id } : undefined,
          },
        ]
      : []),
    ...(overdueActionCount > 0
      ? [
          {
            key: 'incident-actions-overdue',
            title: `${overdueActionCount} safety action${overdueActionCount === 1 ? '' : 's'} overdue`,
            sub:
              incidentsWithOverdue.length === 1
                ? incidentsWithOverdue[0].title
                : `Across ${incidentsWithOverdue.length} reports`,
            section: 'incidents' as Section,
            tone: 'orange' as Tone,
            count: overdueActionCount,
            params:
              incidentsWithOverdue.length === 1 ? { incident: incidentsWithOverdue[0].id } : undefined,
          },
        ]
      : []),
    // A live job with nobody booked on it is the single most common thing
    // that holds a job up.
    ...(unstaffedToday > 0
      ? [
          {
            key: 'unstaffed-today',
            title: `${unstaffedToday} job${unstaffedToday === 1 ? '' : 's'} live today with nobody assigned`,
            sub: 'Assign someone so they see it in Worker Tools',
            section: 'jobs' as Section,
            tone: 'red' as Tone,
            count: unstaffedToday,
          },
        ]
      : []),
    // QS sign-off leads — it gates issuing the certificate.
    ...(pendingQsReviews > 0
      ? [
          {
            key: 'qs-reviews',
            title: `${pendingQsReviews} certificate${pendingQsReviews === 1 ? '' : 's'} awaiting QS sign-off`,
            sub: 'Review, then countersign or return',
            section: 'qsreviews' as Section,
            tone: 'orange' as Tone,
            count: pendingQsReviews,
          },
        ]
      : []),
    // Jobs carrying an open incident / overdue invoice / expiring-cert worker.
    ...(jobsNeedingAttention > 0
      ? [
          {
            key: 'jobs-attention',
            title: `${jobsNeedingAttention} job${jobsNeedingAttention === 1 ? '' : 's'} need attention`,
            sub: 'Open incidents, overdue invoices or expiring certs',
            section: 'jobs' as Section,
            tone: 'orange' as Tone,
            count: jobsNeedingAttention,
          },
        ]
      : []),
    // Money out: purchase orders overdue their delivery date.
    ...(latePOs > 0
      ? [
          {
            key: 'late-pos',
            title: `${latePOs} purchase order${latePOs === 1 ? '' : 's'} overdue delivery`,
            sub: 'Chase the supplier',
            section: 'procurement' as Section,
            tone: 'red' as Tone,
            count: latePOs,
          },
        ]
      : []),
    ...(deliveriesDue > 0
      ? [
          {
            key: 'deliveries-due',
            title: `${deliveriesDue} deliver${deliveriesDue === 1 ? 'y' : 'ies'} due today`,
            sub: 'Receive them in Purchasing when they land',
            section: 'procurement' as Section,
            tone: 'blue' as Tone,
            count: deliveriesDue,
          },
        ]
      : []),
    // Money in: quotes to send and leads to chase.
    ...(unsentQuotes > 0
      ? [
          {
            key: 'unsent-quotes',
            title: `${unsentQuotes} quote${unsentQuotes === 1 ? '' : 's'} not sent yet`,
            sub: 'Drafted in the last 30 days — send them to win the work',
            section: 'quotes' as Section,
            tone: 'amber' as Tone,
            count: unsentQuotes,
          },
        ]
      : []),
    ...(newLeads > 0
      ? [
          {
            key: 'new-leads',
            title: `${newLeads} new lead${newLeads === 1 ? '' : 's'} to chase`,
            sub: 'Reply before they go cold — Mate can draft it',
            section: 'leads' as Section,
            tone: 'cyan' as Tone,
            count: newLeads,
          },
        ]
      : []),
    // Radar items: list them individually when there are one or two of a kind,
    // but fold three or more into one row — six separate overdue-invoice rows
    // pushed safety and people items off the screen.
    ...groupRadarItems(radarItems),
    ...(otjPending.length > 0
      ? [
          {
            key: 'otj-attestations',
            title: `${otjPending.length} apprentice training entr${otjPending.length === 1 ? 'y' : 'ies'} to attest`,
            sub: 'Confirm the off-the-job hours your apprentices logged',
            section: 'apprentices' as Section,
            tone: 'emerald' as Tone,
            count: otjPending.length,
            params: otjPending.length === 1 ? { entry: otjPending[0].entryId } : undefined,
          },
        ]
      : []),
    ...(pendingTimesheets > 0
      ? [
          {
            key: 'timesheets',
            title: `${pendingTimesheets} timesheet${pendingTimesheets === 1 ? '' : 's'} awaiting approval`,
            sub: 'Approve to release the hours',
            section: 'timesheets' as Section,
            tone: 'amber' as Tone,
            count: pendingTimesheets,
            params: { tab: 'pending' },
          },
        ]
      : []),
    ...(pendingLeave.length > 0
      ? [
          {
            key: 'leave',
            title: `${pendingLeave.length} leave request${pendingLeave.length === 1 ? '' : 's'} to decide`,
            sub:
              pendingLeave.length === 1
                ? `${pendingLeave[0].employeeName || 'A team member'} · ${pendingLeave[0].totalDays} day${pendingLeave[0].totalDays === 1 ? '' : 's'}`
                : 'Check the diary, then approve or decline',
            section: 'timesheets' as Section,
            tone: 'amber' as Tone,
            count: pendingLeave.length,
            params: { tab: 'leave' },
          },
        ]
      : []),
    ...(pendingExpenses > 0
      ? [
          {
            key: 'expenses',
            title: `${pendingExpenses} expense claim${pendingExpenses === 1 ? '' : 's'} to review`,
            sub: 'Awaiting your approval',
            section: 'expenses' as Section,
            tone: 'amber' as Tone,
            count: pendingExpenses,
          },
        ]
      : []),
    ...(newApplications > 0
      ? [
          {
            key: 'applications',
            title: `${newApplications} new job application${newApplications === 1 ? '' : 's'}`,
            sub: 'Candidates waiting on a reply',
            section: 'vacancies' as Section,
            tone: 'blue' as Tone,
            count: newApplications,
          },
        ]
      : []),
  ];
  // People waiting on the boss come before paperwork and money.
  attentionItems.sort((a, b) => attentionRank(a.key) - attentionRank(b.key));

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Dashboard"
          title="Overview"
          description="Your firm at a glance — team, jobs, alerts, safety."
          tone="yellow"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="Dashboard"
        title="Overview"
        description="Your firm at a glance — team, jobs, alerts, safety."
        tone="yellow"
        actions={
          <div className="flex items-center gap-2">
            {onOpenCommand && <CommandTrigger onOpen={onOpenCommand} />}
            <IconButton onClick={refreshAll} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </div>
        }
      />

      {statsError && (
        <AlertRow
          tone="red"
          title="Couldn't load your dashboard stats"
          subtitle="The numbers below may be incomplete — tap to retry"
          onClick={refreshAll}
        />
      )}

      {onOpenMate && <MateEntryCard onOpen={onOpenMate} />}

      <QuotePagePromoCard quotePageLeads={quotePageLeads} onNavigate={onNavigate} />

      <StatStrip
        columns={4}
        stats={[
          {
            label: 'Team',
            value: activeEmployees,
            onClick: onOpenPeople,
          },
          {
            label: 'Active Jobs',
            value: activeJobs,
            tone: 'blue',
            onClick: onOpenJobs,
          },
          {
            label: 'Alerts',
            value: attentionItems.length,
            tone: attentionItems.length > 0 ? 'red' : 'emerald',
            onClick: onOpenAlerts,
          },
          {
            label: 'Certificates',
            // ELE-555 — was labelled "Safety" showing a score that only ever
            // measured certificate validity, and read 100% with no certs at all.
            value: certComplianceRate != null ? `${certComplianceRate}%` : '—',
            accent: true,
            onClick: onOpenSafety,
          },
        ]}
      />

      {isNewFirm && <FirstRunChecklist onNavigate={(sec) => onNavigate(sec as never)} />}

      {todaysJobs.length > 0 && (
        <div className="space-y-4">
          <SectionHeader
            eyebrow="Today"
            title="Who's where"
            meta={
              <span className="flex items-center gap-2">
                {peopleOutToday > 0 && (
                  <Pill tone="blue">
                    {peopleOutToday} {peopleOutToday === 1 ? 'person' : 'people'} booked
                  </Pill>
                )}
                {onSiteCount > 0 && <Pill tone="emerald">{onSiteCount} on site</Pill>}
              </span>
            }
          />
          <ListCard>
            <ListBody>
              {todaysJobs.slice(0, 6).map((job) => {
                const crew = assignmentsByJob.get(job.id) ?? [];
                return (
                  <ListRow
                    key={job.id}
                    accent={crew.length === 0 ? 'red' : undefined}
                    title={job.title}
                    subtitle={
                      <span className="block">
                        {[job.client, job.location].filter(Boolean).join(' · ')}
                        <span className="block mt-0.5">
                          {crew.length === 0 ? (
                            <span className="text-red-300">Nobody assigned — tap to assign</span>
                          ) : (
                            <span className="text-white">
                              {crew
                                .slice(0, 4)
                                .map((c) => c.name.split(' ')[0])
                                .join(', ')}
                              {crew.length > 4 ? ` +${crew.length - 4}` : ''}
                            </span>
                          )}
                        </span>
                      </span>
                    }
                    trailing={
                      crew.length > 0 ? (
                        <span className="flex -space-x-1.5">
                          {crew.slice(0, 3).map((c) => (
                            <Avatar
                              key={c.employeeId}
                              initials={c.initials || c.name.slice(0, 2).toUpperCase()}
                              size="sm"
                            />
                          ))}
                        </span>
                      ) : typeof job.progress === 'number' && job.progress > 0 ? (
                        <span className="text-[11px] tabular-nums text-white">{job.progress}%</span>
                      ) : undefined
                    }
                    onClick={() => openJob(job.id)}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        </div>
      )}

      {cash && (
        <div className="space-y-4">
          <SectionHeader eyebrow="This month" title="Cash" />
          <StatStrip
            columns={3}
            stats={[
              {
                label: 'Invoiced',
                value: gbp(cash.invoiced_this_month),
                tone: 'blue',
                onClick: onOpenFinance,
              },
              {
                label: 'Paid',
                value: gbp(cash.paid_this_month),
                tone: 'emerald',
                onClick: onOpenFinance,
              },
              {
                label: cash.overdue_count > 0 ? `Overdue · ${cash.overdue_count}` : 'Overdue',
                value: gbp(cash.overdue_total),
                tone: cash.overdue_total > 0 ? 'red' : 'emerald',
                onClick: onOpenFinance,
              },
            ]}
          />
        </div>
      )}

      {leads.length > 0 && (
        <div className="space-y-4">
          <SectionHeader eyebrow="Pipeline" title="Sales" />
          <StatStrip
            columns={3}
            stats={[
              {
                label: 'Open leads',
                value: openLeads.length,
                tone: 'cyan',
                onClick: () => onNavigate('leads'),
              },
              {
                label: 'Pipeline',
                value: gbp(leadPipeline),
                tone: 'blue',
                onClick: () => onNavigate('leads'),
              },
              {
                label: 'Win rate',
                value: `${leadWinRate}%`,
                tone: leadWinRate >= 50 ? 'emerald' : 'amber',
                onClick: () => onNavigate('clientshub'),
              },
            ]}
          />
        </div>
      )}

      {attentionItems.length > 0 && (
        <div id="overview-actions" className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Actions</Eyebrow>
              <h2 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Action required
              </h2>
            </div>
            <Pill tone="orange">{attentionItems.length}</Pill>
          </div>
          <div className="space-y-3">
            {attentionItems.map((item) => (
              <AlertRow
                key={item.key}
                tone={item.tone}
                title={item.title}
                subtitle={item.sub}
                trailing={item.count ? <Pill tone={item.tone}>{item.count}</Pill> : undefined}
                onClick={() =>
                  item.params
                    ? setSearchParams({ section: item.section, ...item.params })
                    : onNavigate(item.section)
                }
              />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <SectionHeader eyebrow="Quick Actions" title="Do next" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          <QuickActionTile
            label="New Job"
            sub="Create and assign"
            tone="yellow"
            onClick={() => onNavigate('jobs')}
          />
          <QuickActionTile
            label="Quote"
            sub="Draft an estimate"
            tone="blue"
            onClick={() => onNavigate('quotes')}
          />
          <QuickActionTile
            label="Invoice"
            sub="Bill a client"
            tone="emerald"
            onClick={() => onNavigate('financehub')}
          />
          <QuickActionTile
            label="Expense"
            sub="Log a receipt"
            tone="orange"
            onClick={() => onNavigate('expenses')}
          />
        </div>
      </div>

      <div className="space-y-4">
        <SectionHeader eyebrow="Your Hubs" title="Jump into your firm" />
        <HubGrid columns={2}>
          <HubCard
            number="01"
            eyebrow="People"
            title="People"
            description="Team, hiring, talent"
            tone="blue"
            cta="Open"
            meta={newApplications > 0 ? `${newApplications} new applications` : undefined}
            onClick={onOpenPeople}
          />
          <HubCard
            number="02"
            eyebrow="Jobs"
            title="Jobs"
            description="Projects and tracking"
            tone="cyan"
            cta="Open"
            meta={activeJobs > 0 ? `${activeJobs} active` : undefined}
            onClick={onOpenJobs}
          />
          <HubCard
            number="03"
            eyebrow="Finance"
            title="Finance"
            description="Quotes and invoices"
            tone="emerald"
            cta="Open"
            meta={pendingExpenses > 0 ? `${pendingExpenses} pending` : undefined}
            onClick={onOpenFinance}
          />
          <HubCard
            number="04"
            eyebrow="Clients"
            title="Clients"
            description="Customers, pipeline and portal"
            tone="yellow"
            cta="Open"
            onClick={onOpenClients}
          />
          <HubCard
            number="05"
            eyebrow="HR & Safety"
            title="HR & Safety"
            description="RAMS and compliance"
            tone="orange"
            cta="Open"
            meta={
              expiringCerts > 0
                ? `${expiringCerts} alerts`
                : certComplianceRate != null
                  ? `${certComplianceRate}% in date`
                  : 'No certificates yet'
            }
            onClick={onOpenSafety}
          />
          <HubCard
            number="06"
            eyebrow="Smart Docs"
            title="Smart Docs"
            description="Generate RAMS, designs and quotes instantly"
            tone="purple"
            cta="Open"
            badge={<Pill tone="purple">AI</Pill>}
            meta="AI powered"
            onClick={onOpenSmartDocs}
          />
        </HubGrid>
      </div>

      {!isNewFirm && <FirstRunChecklist onNavigate={(sec) => onNavigate(sec as never)} />}
    </PageFrame>
  );
}
