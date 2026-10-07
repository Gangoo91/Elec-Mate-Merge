import type { Section } from '@/pages/employer/EmployerDashboard';
import { PageHelpButton } from '@/components/hub/PageHelp';
import { JOBS_HUB_HELP } from '@/components/employer/help/jobs';
import { useJobs } from '@/hooks/useJobs';
import { useJobPacks } from '@/hooks/useJobPacks';
import { useJobIssueStats } from '@/hooks/useJobIssues';
import { useFleetStats } from '@/hooks/useFleet';
import { useToolStats } from '@/hooks/useCompanyTools';
import { useQsPendingCount } from '@/hooks/useQsReviewQueue';
import { useEmployerHubCounts } from '@/hooks/useFinanceModel';
import { formatGBPCompact } from '@/lib/financeDefinitions';
import { useRecurringDueSoon, useFirmRecurring } from '@/hooks/useFirmRecurring';
import {
  HubLanding,
  SectionHeader,
  HubGrid,
  HubCard,
  LoadingBlocks,
} from '@/components/employer/editorial';

interface JobsHubProps {
  onNavigate: (section: Section) => void;
}

export function JobsHub({ onNavigate }: JobsHubProps) {
  const { data: jobs = [], isLoading } = useJobs();
  const { data: jobPacks = [] } = useJobPacks();
  const { data: issueStats } = useJobIssueStats();
  const { data: fleetStats } = useFleetStats();
  const toolStats = useToolStats();

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
  const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;
  const activeJobPacks = jobPacks.filter((jp) => jp.status === 'In Progress').length;
  const openIssues = issueStats?.open ?? 0;
  const motDueCount = fleetStats?.motDue ?? 0;
  const qsPendingCount = useQsPendingCount();
  const dueSoon = useRecurringDueSoon(30);
  const { data: recurring = [] } = useFirmRecurring();
  const repeating = recurring.filter((r) => r.status === 'active').length;

  const onOpenJobs = () => onNavigate('jobs');
  const onOpenJobBoard = () => onNavigate('jobboard');
  const onOpenTimeline = () => onNavigate('timeline');
  const onOpenDiary = () => onNavigate('diary');
  const onOpenTracking = () => onNavigate('tracking');
  const onOpenProgressLogs = () => onNavigate('progresslogs');
  const onOpenIssues = () => onNavigate('issues');
  const onOpenTesting = () => onNavigate('testing');
  const onOpenQuality = () => onNavigate('quality');
  const onOpenFleet = () => onNavigate('fleet');
  const onOpenPhotoGallery = () => onNavigate('photogallery');
  const onOpenJobPacks = () => onNavigate('jobpacks');
  const onOpenProcurement = () => onNavigate('procurement');
  const onOpenFinancials = () => onNavigate('financials');

  if (isLoading) {
    return (
      <HubLanding
        eyebrow="Operations"
        title="Jobs"
        description="Live jobs, scheduling, tracking, testing and quality."
        tone="amber"
      >
        <LoadingBlocks />
      </HubLanding>
    );
  }

  return (
    <HubLanding
      eyebrow="Operations"
      title="Jobs"
      description="Live jobs, scheduling, tracking, testing and quality."
      tone="amber"
      actions={<PageHelpButton help={JOBS_HUB_HELP} askContext={{ page: 'jobshub' }} />}
      stats={[
        { label: 'Active jobs', value: activeJobs, tone: 'amber', onClick: onOpenJobs },
        { label: 'Today', value: todayJobs, tone: 'blue', onClick: onOpenDiary },
        { label: 'Issues', value: openIssues, tone: 'red', onClick: onOpenIssues },
        {
          label: 'Completed 7d',
          value: completed7d,
          tone: 'emerald',
          accent: true,
          onClick: onOpenJobs,
        },
      ]}
    >
      <div className="space-y-5">
        <SectionHeader eyebrow="Operations" title="Run every job" />
        <HubGrid columns={2}>
          <HubCard
            number="01"
            eyebrow="Packs"
            title="Job Packs"
            description="Scope, hazards and crew for a job. The brief your AI RAMS, method statements and briefings are built from, sent to the workers."
            tone="yellow"
            meta={activeJobPacks > 0 ? `${activeJobPacks} in progress` : 'No packs in progress'}
            cta="Open"
            onClick={onOpenJobPacks}
          />
          <HubCard
            number="02"
            eyebrow="Active"
            title="Jobs"
            description="Every live project, schedule and assignment."
            tone="amber"
            meta={activeJobs > 0 ? `${activeJobs} active` : 'No active jobs'}
            cta="Open"
            onClick={onOpenJobs}
          />
          <HubCard
            number="03"
            eyebrow="Dispatch"
            title="Diary"
            description="Who is where this week. Drag people onto jobs, or tap to book on a phone; they see it in My week."
            tone="cyan"
            meta={todayJobs > 0 ? `${plural(todayJobs, 'job')} on today` : 'Nothing booked today'}
            cta="Open"
            onClick={onOpenDiary}
          />
          <HubCard
            number="04"
            eyebrow="Pipeline"
            title="Job Board"
            description="Drag jobs through Enquiry, Quoted, Confirmed, Scheduled, In progress, Testing and Complete, or put them on hold."
            tone="blue"
            meta={plural(jobs.length, 'job') + ' on the board'}
            cta="Open"
            onClick={onOpenJobBoard}
          />
          <HubCard
            number="05"
            eyebrow="Schedule"
            title="Timeline"
            description="Every booked job as a bar. Drag a bar to move the job; everyone on it moves too."
            tone="indigo"
            meta={todayJobs > 0 ? `${todayJobs} today` : 'Nothing today'}
            cta="Open"
            onClick={onOpenTimeline}
          />
          <HubCard
            number="06"
            eyebrow="Live"
            title="Worker Tracking"
            description="Where your operatives are right now, in real time."
            tone="cyan"
            meta={h ? (h.on_site_now > 0 ? `${plural(h.on_site_now, 'person', 'people')} on site now` : 'Nobody checked in on site') : undefined}
            cta="Open"
            onClick={onOpenTracking}
          />
          <HubCard
            number="07"
            eyebrow="Updates"
            title="Site diary"
            description="The office's daily logs and the team's notes from site, with photos, one diary per job."
            tone="emerald"
            meta={
              h
                ? h.progress_logs_7d > 0
                  ? `${plural(h.progress_logs_7d, 'entry', 'entries')} this week`
                  : h.last_progress_log
                    ? `Last entry ${new Date(`${h.last_progress_log}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
                    : 'Nothing written yet'
                : undefined
            }
            cta="Open"
            onClick={onOpenProgressLogs}
          />
          <HubCard
            number="08"
            eyebrow="Resolve"
            title="Issues"
            description="Snags, defects, variations and questions, by job, through to the fix."
            tone="red"
            meta={openIssues > 0 ? `${openIssues} open` : 'All clear'}
            cta="Open"
            onClick={onOpenIssues}
          />
          <HubCard
            number="09"
            eyebrow="Compliance"
            title="Testing"
            description="Each job's certificates and test results, checked against BS 7671."
            tone="orange"
            meta={
              h
                ? h.tests_total === 0
                  ? 'No certificates on jobs yet'
                  : h.tests_failed > 0
                    ? `${plural(h.tests_failed, 'certificate')} returned by QS`
                    : h.tests_pending > 0
                      ? `${plural(h.tests_pending, 'certificate')} waiting`
                      : `${plural(h.tests_total, 'certificate')} on jobs`
                : undefined
            }
            cta="Open"
            onClick={onOpenTesting}
          />
          <HubCard
            number="10"
            eyebrow="Quality"
            title="Snags & punch lists"
            description="Every snag by job, ticked off, then signed off by the client at handover."
            tone="amber"
            meta={h ? (h.snags_open > 0 ? `${plural(h.snags_open, 'open snag')}` : 'No open snags') : undefined}
            cta="Open"
            onClick={onOpenQuality}
          />
          <HubCard
            number="11"
            eyebrow="Compliance"
            title="QS Reviews"
            description="Qualifying Supervisor sign-off on EICR, EIC and Minor Works certs."
            tone="yellow"
            meta={qsPendingCount > 0 ? `${qsPendingCount} awaiting sign-off` : 'Nothing waiting'}
            cta="Open"
            onClick={() => onNavigate('qsreviews')}
          />
          <HubCard
            number="12"
            eyebrow="Vehicles"
            title="Fleet"
            description="Vans, MOTs, services and vehicle-to-job assignments."
            tone="blue"
            meta={motDueCount > 0 ? `${motDueCount} MOT due` : 'All up to date'}
            cta="Open"
            onClick={onOpenFleet}
          />
          <HubCard
            number="13"
            eyebrow="Kit"
            title="Kit register"
            description="Company tools and testers, who has them, and when PAT and calibration are due."
            tone="orange"
            meta={
              toolStats.total === 0
                ? 'No kit logged yet'
                : toolStats.toolsOverdue > 0
                  ? `${plural(toolStats.toolsOverdue, 'item')} overdue`
                  : toolStats.toolsDue > 0
                    ? `${toolStats.toolsDue} due in 30 days`
                    : `${plural(toolStats.total, 'item')}, all in date`
            }
            cta="Open"
            onClick={() => onNavigate('kit')}
          />
          <HubCard
            number="14"
            eyebrow="Evidence"
            title="Photo Gallery"
            description="Every photo from every job: uploads, snags, site diary and tasks."
            tone="cyan"
            meta={
              h
                ? h.photos_total > 0
                  ? `${plural(h.photos_total, 'photo')} · ${h.photos_7d} this week`
                  : 'No photos yet'
                : undefined
            }
            cta="Open"
            onClick={onOpenPhotoGallery}
          />
          <HubCard
            number="15"
            eyebrow="Repeat"
            title="Recurring work"
            description="Repeat visits that book themselves, and every certificate's re-test date ready to book as a job."
            tone="blue"
            meta={
              dueSoon.total > 0
                ? [
                    dueSoon.visits ? plural(dueSoon.visits, 'visit') + ' booking soon' : null,
                    dueSoon.certs ? plural(dueSoon.certs, 'renewal') + ' due in 30 days' : null,
                  ]
                    .filter(Boolean)
                    .join(' · ')
                : repeating > 0
                  ? `${plural(repeating, 'repeat visit')}, nothing due this month`
                  : 'No repeat visits yet'
            }
            cta="Open"
            onClick={() => onNavigate('recurring')}
          />
          <HubCard
            number="16"
            eyebrow="Materials"
            title="Purchase orders"
            description="Order materials from the job, book deliveries in and match supplier invoices. Each one costed to its job."
            tone="cyan"
            meta={h ? (h.open_pos > 0 ? `${plural(h.open_pos, 'open order')}` : 'No open orders') : undefined}
            cta="Open"
            onClick={onOpenProcurement}
          />
          <HubCard
            number="17"
            eyebrow="Money"
            title="Job Financials"
            description="Profit per job: invoiced against labour, materials and expenses, with budget alongside."
            tone="emerald"
            meta={
              h
                ? h.jobs_gross_profit === null || h.jobs_loss_making === null
                  ? 'Owner and admins only'
                  : h.jobs_loss_making > 0
                  ? `${plural(h.jobs_loss_making, 'job')} losing money`
                  : h.jobs_invoiced > 0
                    ? `${formatGBPCompact(h.jobs_gross_profit)} gross profit on ${plural(h.jobs_invoiced, 'invoiced job')}`
                    : 'No jobs invoiced yet'
                : undefined
            }
            cta="Open"
            onClick={onOpenFinancials}
          />
        </HubGrid>
      </div>
    </HubLanding>
  );
}
