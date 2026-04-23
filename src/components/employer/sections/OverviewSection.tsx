import { RefreshCw } from 'lucide-react';
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
} from '@/components/employer/editorial';
import { useEmployerDashboardStats } from '@/hooks/useEmployerDashboardStats';
import { useVacancyStats } from '@/hooks/useVacancies';
import type { Section } from '@/pages/employer/EmployerDashboard';

interface OverviewSectionProps {
  onNavigate: (section: Section) => void;
}

export function OverviewSection({ onNavigate }: OverviewSectionProps) {
  const { stats, isLoading, refetch } = useEmployerDashboardStats();
  const { data: vacancyStats } = useVacancyStats();

  const {
    activeEmployees,
    activeJobs,
    expiringCertifications: expiringCerts,
    pendingExpenses,
    safetyScore,
    upcomingDeadlines,
  } = stats;

  const newApplications = vacancyStats?.newApplications || 0;

  const onOpenPeople = () => onNavigate('peoplehub');
  const onOpenJobs = () => onNavigate('jobshub');
  const onOpenFinance = () => onNavigate('financehub');
  const onOpenSafety = () => onNavigate('safetyhub');
  const onOpenSmartDocs = () => onNavigate('smartdocs');
  const onOpenAlerts = () => onNavigate('elecid');

  const attentionItems = [
    ...(expiringCerts > 0
      ? [
          {
            type: 'cert' as const,
            count: expiringCerts,
            label: 'Expiring certifications',
            sub: 'Renewals due in the next 30 days',
            section: 'elecid' as Section,
            tone: 'orange' as const,
          },
        ]
      : []),
    ...(pendingExpenses > 0
      ? [
          {
            type: 'expense' as const,
            count: pendingExpenses,
            label: 'Pending expense claims',
            sub: 'Awaiting your review',
            section: 'expenses' as Section,
            tone: 'amber' as const,
          },
        ]
      : []),
    ...(newApplications > 0
      ? [
          {
            type: 'app' as const,
            count: newApplications,
            label: 'New job applications',
            sub: 'Candidates waiting on a reply',
            section: 'vacancies' as Section,
            tone: 'blue' as const,
          },
        ]
      : []),
    ...upcomingDeadlines
      .filter((d) => d.urgent)
      .map((d) => ({
        type: 'deadline' as const,
        count: 1,
        label: d.title,
        sub: 'Deadline approaching',
        section: 'elecid' as Section,
        tone: 'red' as const,
      })),
  ];

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
          <IconButton onClick={() => void refetch()} aria-label="Refresh">
            <RefreshCw className="h-4 w-4" />
          </IconButton>
        }
      />

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
            value: expiringCerts,
            tone: expiringCerts > 0 ? 'red' : 'emerald',
            onClick: onOpenAlerts,
          },
          {
            label: 'Safety',
            value: `${safetyScore}%`,
            accent: true,
            onClick: onOpenSafety,
          },
        ]}
      />

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

      {attentionItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Needs Attention</Eyebrow>
              <h2 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Action required
              </h2>
            </div>
            <Pill tone="orange">{attentionItems.length}</Pill>
          </div>
          <div className="space-y-3">
            {attentionItems.slice(0, 4).map((item, index) => (
              <AlertRow
                key={`${item.type}-${index}`}
                tone={item.tone}
                title={item.count > 1 ? `${item.count} ${item.label}` : item.label}
                subtitle={item.sub}
                trailing={<Pill tone={item.tone}>{item.count}</Pill>}
                onClick={() => onNavigate(item.section)}
              />
            ))}
          </div>
        </div>
      )}

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
            eyebrow="HR & Safety"
            title="HR & Safety"
            description="RAMS and compliance"
            tone="orange"
            cta="Open"
            meta={expiringCerts > 0 ? `${expiringCerts} alerts` : `${safetyScore}% score`}
            onClick={onOpenSafety}
          />
          <HubCard
            number="05"
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
    </PageFrame>
  );
}
