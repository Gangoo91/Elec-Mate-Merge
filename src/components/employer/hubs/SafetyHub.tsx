import type { Section } from '@/pages/employer/EmployerDashboard';
import { useIncidentStats } from '@/hooks/useIncidents';
import { useRAMSDocuments } from '@/hooks/useRAMSDocuments';
import { usePolicyStats } from '@/hooks/usePolicies';
import { useTrainingRecords } from '@/hooks/useTrainingRecords';
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
  // Real stats — these were props that no caller ever passed (permanent zeros)
  const { data: incidentStats, isLoading: incidentsLoading } = useIncidentStats();
  const { data: ramsDocs = [], isLoading: ramsLoading } = useRAMSDocuments();
  const { data: policyStats, isLoading: policiesLoading } = usePolicyStats();
  const { data: trainingRecords = [], isLoading: trainingLoading } = useTrainingRecords();
  const openIncidentsCount = incidentStats?.open ?? 0;
  // 'generated' = AI-produced, not yet approved — still awaiting sign-off
  const pendingRamsCount = ramsDocs.filter((d) =>
    ['draft', 'submitted', 'generated'].includes(d.status)
  ).length;
  const policiesCount = policyStats?.total ?? 0;
  const trainingCount = trainingRecords.length;

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
          label: 'Training records',
          value: trainingCount,
          accent: true,
          onClick: () => onNavigate('training'),
        },
      ]}
    >
      <section className="space-y-5">
        <SectionHeader eyebrow="Stay compliant" title="Keep everyone safe" />
        <HubGrid columns={2}>
          <HubCard
            number="01"
            eyebrow="Overview"
            title="Safety Overview"
            description="Live snapshot of incidents, RAMS, briefings and compliance."
            tone="red"
            onClick={() => onNavigate('safety')}
            meta="Dashboard"
          />
          <HubCard
            number="02"
            eyebrow="Risk"
            title="RAMS"
            description="Risk assessments and method statements for every job."
            tone="orange"
            onClick={() => onNavigate('rams')}
            meta={pendingRamsCount > 0 ? `${pendingRamsCount} pending` : 'All up to date'}
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
            meta="Templates & live"
          />
          <HubCard
            number="06"
            eyebrow="Skills"
            title="Training Records"
            description="Certifications, courses and renewals for the team."
            tone="emerald"
            onClick={() => onNavigate('training')}
            meta="Records & courses"
          />
          <HubCard
            number="07"
            eyebrow="Daily"
            title="Toolbox Briefings"
            description="Pre-job safety briefs and sign-offs."
            tone="amber"
            onClick={() => onNavigate('briefings')}
            meta="Pre-job briefs"
          />
          <HubCard
            number="08"
            eyebrow="Audit"
            title="Compliance"
            description="Checklists, audits and certifications across the organisation."
            tone="cyan"
            onClick={() => onNavigate('compliance')}
            meta="Checklists & audits"
          />
        </HubGrid>
      </section>
    </HubLanding>
  );
}
