import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  HubLanding,
  SectionHeader,
  HubGrid,
  HubCard,
  Pill,
} from '@/components/employer/editorial';

interface SmartDocsHubProps {
  onNavigate: (section: Section) => void;
}

export function SmartDocsHub({ onNavigate }: SmartDocsHubProps) {
  const onOpenDesignSpec = () => onNavigate('aidesignspec');
  const onOpenMethodStatement = () => onNavigate('aimethodstatement');
  const onOpenRAMS = () => onNavigate('airams');
  const onOpenBriefingPack = () => onNavigate('aibriefingpack');
  const onOpenQuote = () => onNavigate('aiquote');

  return (
    <HubLanding
      eyebrow="AI Powered"
      title="Smart Docs"
      description="Generate RAMS, method statements, design specs, briefing packs and quotes in minutes."
      tone="purple"
      stats={[
        { label: 'Generated 30d', value: '0', tone: 'purple' },
        { label: 'Saved hours', value: '0', tone: 'emerald', accent: true },
        { label: 'Templates', value: '5', tone: 'blue' },
        { label: 'Export formats', value: 'PDF', tone: 'indigo' },
      ]}
    >
      <section className="space-y-5">
        <SectionHeader
          eyebrow="AI drafts, you approve"
          title="Documents in minutes"
        />
        <HubGrid columns={2}>
          <HubCard
            number="01"
            eyebrow="Design"
            title="AI Design Spec"
            description="Circuit design documents drafted from your job brief."
            tone="indigo"
            badge={<Pill tone="purple">AI</Pill>}
            onClick={onOpenDesignSpec}
            cta="Generate"
          />
          <HubCard
            number="02"
            eyebrow="Procedure"
            title="AI Method Statement"
            description="Step-by-step work procedures aligned to BS 7671 practice."
            tone="emerald"
            badge={<Pill tone="purple">AI</Pill>}
            onClick={onOpenMethodStatement}
            cta="Generate"
          />
          <HubCard
            number="03"
            eyebrow="Safety"
            title="AI RAMS"
            description="Risk assessments and method statements ready for site."
            tone="orange"
            badge={<Pill tone="purple">AI</Pill>}
            onClick={onOpenRAMS}
            cta="Generate"
          />
          <HubCard
            number="04"
            eyebrow="Briefing"
            title="AI Briefing Pack"
            description="Pre-job briefing packs to share with the crew before mobilisation."
            tone="amber"
            badge={<Pill tone="purple">AI</Pill>}
            onClick={onOpenBriefingPack}
            cta="Generate"
          />
          <HubCard
            number="05"
            eyebrow="Commercial"
            title="AI Quote Generator"
            description="Auto-build customer quotes from job scope and pricing data."
            tone="yellow"
            badge={<Pill tone="purple">AI</Pill>}
            onClick={onOpenQuote}
            cta="Generate"
          />
        </HubGrid>
      </section>
    </HubLanding>
  );
}
