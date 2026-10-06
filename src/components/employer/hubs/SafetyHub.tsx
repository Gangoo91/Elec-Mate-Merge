import { useState } from 'react';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { JobSafetyPack } from '@/components/employer/JobSafetyPack';
import { useIncidentStats } from '@/hooks/useIncidents';
import { usePolicyStats } from '@/hooks/usePolicies';
import { useTrainingStats } from '@/hooks/useTrainingRecords';
import { useContractStats } from '@/hooks/useContracts';
import { useBriefingStats } from '@/hooks/useBriefings';
import { useComplianceStats } from '@/hooks/useComplianceDocuments';
import { useEmployerHubCounts } from '@/hooks/useFinanceModel';
import {
  HubLanding,
  SectionHeader,
  HubGrid,
  HubCard,
  LoadingBlocks,
} from '@/components/employer/editorial';

interface SafetyHubProps {
  onNavigate: (section: Section) => void;
}

export function SafetyHub({ onNavigate }: SafetyHubProps) {
  // Job Safety Pack — the per-site "show the principal contractor" view
  const [packOpen, setPackOpen] = useState(false);
  // Real stats — these were props that no caller ever passed (permanent zeros)
  const { data: incidentStats, isLoading: incidentsLoading } = useIncidentStats();
  const { data: hubCounts, isLoading: ramsLoading } = useEmployerHubCounts();
  const { data: policyStats, isLoading: policiesLoading } = usePolicyStats();
  const { data: trainingStats, isLoading: trainingLoading } = useTrainingStats();
  const { data: contractStats } = useContractStats();
  const { data: briefingStats } = useBriefingStats();
  const { data: complianceStats } = useComplianceStats();
  const openIncidentsCount = incidentStats?.open ?? 0;
  // Awaiting sign-off = submitted + AI 'generated' RAMS across the FIRM (owner,
  // managers, and any RAMS linked to a firm job) — not just the signed-in
  // user's own documents. Drafts are work in progress, not pending.
  const pendingRamsCount = hubCounts?.safety.rams_pending ?? 0;
  const policiesCount = policyStats?.total ?? 0;
  const trainingDue = (trainingStats?.expiringsSoon ?? 0) + (trainingStats?.expired ?? 0);
  const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

  const contractsMeta = !contractStats
    ? undefined
    : contractStats.total === 0
      ? 'No contracts yet'
      : contractStats.expiringSoon > 0
        ? `${plural(contractStats.expiringSoon, 'contract')} ending within 30 days`
        : `${contractStats.active} active`;
  const trainingMeta = !trainingStats
    ? undefined
    : trainingStats.total === 0
      ? 'No records yet'
      : trainingDue > 0
        ? `${trainingDue} expired or due in 30 days`
        : `${plural(trainingStats.total, 'record')}, none due`;
  const briefingsMeta = !briefingStats
    ? undefined
    : briefingStats.total === 0
      ? 'No briefings yet'
      : briefingStats.scheduled > 0
        ? `${briefingStats.scheduled} coming up · ${briefingStats.completed} delivered`
        : `${plural(briefingStats.completed, 'briefing')} delivered`;
  const complianceMeta = !complianceStats
    ? undefined
    : complianceStats.total === 0
      ? 'No documents yet'
      : complianceStats.expired + complianceStats.expiring > 0
        ? `${complianceStats.expired} expired · ${complianceStats.expiring} expiring`
        : `${plural(complianceStats.total, 'document')}, all in date`;

  if (packOpen) {
    return <JobSafetyPack onNavigate={onNavigate} onBack={() => setPackOpen(false)} />;
  }

  if (incidentsLoading || ramsLoading || policiesLoading || trainingLoading) {
    return (
      <HubLanding
        eyebrow="HR & Safety"
        title="Safety"
        description="RAMS, incidents, policies, training and compliance."
        tone="red"
      >
        <LoadingBlocks />
      </HubLanding>
    );
  }

  return (
    <HubLanding
      eyebrow="HR & Safety"
      title="Safety"
      description="RAMS, incidents, policies, training and compliance."
      tone="red"
      stats={[
        {
          label: 'Open incidents',
          value: openIncidentsCount,
          tone: 'red',
          onClick: () => onNavigate('incidents'),
        },
        {
          label: 'Pending RAMS',
          value: pendingRamsCount,
          tone: 'orange',
          onClick: () => onNavigate('rams'),
        },
        {
          label: 'Policies',
          value: policiesCount,
          tone: 'blue',
          onClick: () => onNavigate('policies'),
        },
        {
          label: 'Training due',
          value: trainingDue,
          accent: true,
          onClick: () => onNavigate('training'),
        },
      ]}
    >
      <section className="space-y-5">
        <SectionHeader eyebrow="For the principal contractor" title="Prove a site is ready" />
        <HubGrid columns={1}>
          <HubCard
            eyebrow="One screen per site"
            title="Job Safety Pack"
            description="Crew competence, RAMS, briefing sign-offs and compliance for one job — everything a principal contractor asks for before your crew starts, with a branded PDF summary."
            tone="yellow"
            onClick={() => setPackOpen(true)}
            cta="Build pack"
          />
        </HubGrid>
      </section>

      <section className="space-y-5">
        <SectionHeader eyebrow="Stay compliant" title="Keep everyone safe" />
        <HubGrid columns={2}>
          <HubCard
            number="01"
            eyebrow="Alerts"
            title="Safety alerts"
            description="Recent incidents and RAMS waiting for sign-off, newest first."
            tone="red"
            onClick={() => onNavigate('safety')}
            meta={
              openIncidentsCount + pendingRamsCount > 0
                ? `${openIncidentsCount + pendingRamsCount} need attention`
                : 'Nothing needs attention'
            }
          />
          <HubCard
            number="02"
            eyebrow="Risk"
            title="RAMS"
            description="Risk assessments and method statements for every job."
            tone="orange"
            onClick={() => onNavigate('rams')}
            meta={pendingRamsCount > 0 ? `${pendingRamsCount} awaiting sign-off` : 'None awaiting sign-off'}
          />
          <HubCard
            number="03"
            eyebrow="Reporting"
            title="Incidents"
            description="Log accidents, near misses and investigations."
            tone="red"
            onClick={() => onNavigate('incidents')}
            meta={openIncidentsCount > 0 ? `${openIncidentsCount} open` : 'No open incidents'}
          />
          <HubCard
            number="04"
            eyebrow="Library"
            title="Policies"
            description="Company policies, procedures and rules."
            tone="blue"
            onClick={() => onNavigate('policies')}
            meta={policiesCount > 0 ? `${policiesCount} live` : 'Build your library'}
          />
          <HubCard
            number="05"
            eyebrow="Agreements"
            title="Contracts"
            description="Manage and track every contract and agreement."
            tone="indigo"
            onClick={() => onNavigate('contracts')}
            meta={contractsMeta}
          />
          <HubCard
            number="06"
            eyebrow="Skills"
            title="Training Records"
            description="Certifications, courses and renewals for the team."
            tone="emerald"
            onClick={() => onNavigate('training')}
            meta={trainingMeta}
          />
          <HubCard
            number="07"
            eyebrow="Daily"
            title="Toolbox Briefings"
            description="Pre-job safety briefs and sign-offs."
            tone="amber"
            onClick={() => onNavigate('briefings')}
            meta={briefingsMeta}
          />
          <HubCard
            number="08"
            eyebrow="Audit"
            title="Compliance"
            description="Checklists, audits and certifications across the organisation."
            tone="cyan"
            onClick={() => onNavigate('compliance')}
            meta={complianceMeta}
          />
        </HubGrid>
      </section>
    </HubLanding>
  );
}
