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
import { useEmployerOverview, type RadarItem } from '@/hooks/useEmployerOverview';
import { useVacancyStats } from '@/hooks/useVacancies';
import { useQsReviewQueue } from '@/hooks/useQsReviewQueue';
import type { Section } from '@/pages/employer/EmployerDashboard';
import type { Tone } from '@/components/employer/editorial';

interface OverviewSectionProps {
  onNavigate: (section: Section) => void;
  onOpenMate?: () => void;
}

import { FirstRunChecklist } from '@/components/employer/FirstRunChecklist';
import { MateEntryCard } from '@/components/employer/EmployerMate';

const gbp = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;

export function OverviewSection({ onNavigate, onOpenMate }: OverviewSectionProps) {
  const { stats, isLoading, refetch } = useEmployerDashboardStats();
  const { data: radar, refetch: refetchRadar } = useEmployerOverview();
  const { data: vacancyStats } = useVacancyStats();
  // QS certificates awaiting this user's sign-off (empty unless they're a QS).
  const { data: qsPending = [] } = useQsReviewQueue('pending');

  const {
    activeEmployees,
    activeJobs,
    expiringCertifications: expiringCerts,
    pendingExpenses,
    safetyScore,
  } = stats;

  const newApplications = vacancyStats?.newApplications || 0;
  const cash = radar?.cash;
  const radarItems: RadarItem[] = radar?.items ?? [];
  const pendingTimesheets = radar?.counts.pending_timesheets ?? 0;
  const pendingQsReviews = qsPending.length;

  const onOpenPeople = () => onNavigate('peoplehub');
  const onOpenJobs = () => onNavigate('jobshub');
  const onOpenFinance = () => onNavigate('financehub');
  const onOpenSafety = () => onNavigate('safetyhub');
  const onOpenSmartDocs = () => onNavigate('smartdocs');
  const onOpenAlerts = () => onNavigate('elecid');

  const refreshAll = () => {
    void refetch();
    void refetchRadar();
  };

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
  }[] = [
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
    ...radarItems.map((it, i) => ({
      key: `${it.kind}-${it.id}-${i}`,
      title: it.title,
      sub: it.subtitle,
      section: it.section as Section,
      tone: it.severity as Tone,
    })),
    ...(pendingTimesheets > 0
      ? [
          {
            key: 'timesheets',
            title: `${pendingTimesheets} timesheet${pendingTimesheets === 1 ? '' : 's'} awaiting approval`,
            sub: 'Approve to release the hours',
            section: 'timesheets' as Section,
            tone: 'amber' as Tone,
            count: pendingTimesheets,
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
          <IconButton onClick={refreshAll} aria-label="Refresh">
            <RefreshCw className="h-4 w-4" />
          </IconButton>
        }
      />

      {onOpenMate && <MateEntryCard onOpen={onOpenMate} />}

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
            label: 'Safety',
            value: `${safetyScore}%`,
            accent: true,
            onClick: onOpenSafety,
          },
        ]}
      />

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

      <FirstRunChecklist onNavigate={(sec) => onNavigate(sec as never)} />
    </PageFrame>
  );
}
