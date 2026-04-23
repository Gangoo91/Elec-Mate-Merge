import type { Section } from '@/pages/employer/EmployerDashboard';
import { useJobs } from '@/hooks/useJobs';
import { useJobPacks } from '@/hooks/useJobPacks';
import { useJobIssueStats } from '@/hooks/useJobIssues';
import { useFleetStats } from '@/hooks/useFleet';
import {
  HubLanding,
  SectionHeader,
  HubGrid,
  HubCard,
  LoadingState,
} from '@/components/employer/editorial';

interface JobsHubProps {
  onNavigate: (section: Section) => void;
}

export function JobsHub({ onNavigate }: JobsHubProps) {
  const { data: jobs = [], isLoading } = useJobs();
  const { data: jobPacks = [] } = useJobPacks();
  const { data: issueStats } = useJobIssueStats();
  const { data: fleetStats } = useFleetStats();

  const activeJobs = jobs.filter((j) => j.status === 'Active').length;
  const todayJobs = jobs.filter((j) => {
    if (!j.scheduled_date) return false;
    const today = new Date().toISOString().slice(0, 10);
    return String(j.scheduled_date).slice(0, 10) === today;
  }).length;
  const completed7d = jobs.filter((j) => {
    if (j.status !== 'Completed' || !j.updated_at) return false;
    const updated = new Date(j.updated_at).getTime();
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return updated >= sevenDaysAgo;
  }).length;
  const activeJobPacks = jobPacks.filter((jp) => jp.status === 'In Progress').length;
  const openIssues = issueStats?.open ?? 0;
  const motDueCount = fleetStats?.motDue ?? 0;

  const onOpenJobs = () => onNavigate('jobs');
  const onOpenJobBoard = () => onNavigate('jobboard');
  const onOpenTimeline = () => onNavigate('timeline');
  const onOpenTracking = () => onNavigate('tracking');
  const onOpenProgressLogs = () => onNavigate('progresslogs');
  const onOpenIssues = () => onNavigate('issues');
  const onOpenTesting = () => onNavigate('testing');
  const onOpenQuality = () => onNavigate('quality');
  const onOpenClientPortal = () => onNavigate('clientportal');
  const onOpenFleet = () => onNavigate('fleet');
  const onOpenPhotoGallery = () => onNavigate('photogallery');
  const onOpenJobPacks = () => onNavigate('jobpacks');

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <HubLanding
      eyebrow="Operations"
      title="Jobs"
      description="Live jobs, scheduling, tracking, testing and quality."
      tone="amber"
      stats={[
        { label: 'Active jobs', value: activeJobs, tone: 'amber', onClick: onOpenJobs },
        { label: 'Today', value: todayJobs, tone: 'blue' },
        { label: 'Issues', value: openIssues, tone: 'red' },
        { label: 'Completed 7d', value: completed7d, tone: 'emerald', accent: true },
      ]}
    >
      <div className="space-y-5">
        <SectionHeader eyebrow="Operations" title="Run every job" />
        <HubGrid columns={2}>
          <HubCard
            number="01"
            eyebrow="Packs"
            title="Job Packs"
            description="Pre-configured packages of materials, labour and certs."
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
            eyebrow="Pipeline"
            title="Job Board"
            description="Kanban view across enquiry, quoted, scheduled and done."
            tone="blue"
            meta={`${jobs.length} total`}
            cta="Open"
            onClick={onOpenJobBoard}
          />
          <HubCard
            number="04"
            eyebrow="Schedule"
            title="Timeline"
            description="Gantt-style timeline of every booked job."
            tone="indigo"
            meta={todayJobs > 0 ? `${todayJobs} today` : 'Nothing today'}
            cta="Open"
            onClick={onOpenTimeline}
          />
          <HubCard
            number="05"
            eyebrow="Live"
            title="Worker Tracking"
            description="Where your operatives are right now, in real time."
            tone="cyan"
            meta="Live map"
            cta="Open"
            onClick={onOpenTracking}
          />
          <HubCard
            number="06"
            eyebrow="Updates"
            title="Progress Logs"
            description="Daily site notes, photos and status updates from the field."
            tone="emerald"
            meta="Latest from site"
            cta="Open"
            onClick={onOpenProgressLogs}
          />
          <HubCard
            number="07"
            eyebrow="Resolve"
            title="Issues"
            description="Track and close out site issues, defects and snags."
            tone="red"
            meta={openIssues > 0 ? `${openIssues} open` : 'All clear'}
            cta="Open"
            onClick={onOpenIssues}
          />
          <HubCard
            number="08"
            eyebrow="Compliance"
            title="Testing Workflow"
            description="Schedule, capture and sign off every test on the job."
            tone="orange"
            meta="Inspect & test"
            cta="Open"
            onClick={onOpenTesting}
          />
          <HubCard
            number="09"
            eyebrow="Quality"
            title="Quality & Snags"
            description="Punch lists, sign-offs and quality reviews per job."
            tone="amber"
            meta="Snag list"
            cta="Open"
            onClick={onOpenQuality}
          />
          <HubCard
            number="10"
            eyebrow="Customer"
            title="Client Portal"
            description="What your clients see — progress, invoices and certs."
            tone="purple"
            meta="Shared view"
            cta="Open"
            onClick={onOpenClientPortal}
          />
          <HubCard
            number="11"
            eyebrow="Vehicles"
            title="Fleet"
            description="Vans, MOTs, services and vehicle-to-job assignments."
            tone="blue"
            meta={motDueCount > 0 ? `${motDueCount} MOT due` : 'All up to date'}
            cta="Open"
            onClick={onOpenFleet}
          />
          <HubCard
            number="12"
            eyebrow="Evidence"
            title="Photo Gallery"
            description="Every photo captured on every job, organised by project."
            tone="cyan"
            meta="Job evidence"
            cta="Open"
            onClick={onOpenPhotoGallery}
          />
        </HubGrid>
      </div>
    </HubLanding>
  );
}
