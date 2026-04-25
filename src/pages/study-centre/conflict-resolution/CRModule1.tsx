import { HelpCircle, LayoutGrid, AlertTriangle, UserCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What conflict actually is',
    icon: HelpCircle,
    description:
      'Constructive vs destructive conflict, the cost of unresolved conflict, why tradespeople avoid it, and conflict as information.',
  },
  {
    id: 2,
    title: 'The five conflict styles',
    icon: LayoutGrid,
    description:
      'Thomas-Kilmann Conflict Mode Instrument: competing, collaborating, compromising, avoiding and accommodating.',
  },
  {
    id: 3,
    title: 'Common conflict triggers in construction',
    icon: AlertTriangle,
    description:
      'Money disputes, scope disagreements, programme clashes, quality disputes, territory and power imbalances.',
  },
  {
    id: 4,
    title: 'Understanding your default response',
    icon: UserCheck,
    description:
      'Fight, flight or freeze, the ladder of inference, cognitive distortions and self-assessment.',
  },
];

export default function CRModule1() {
  useSEO({
    title: 'Module 1: Understanding Conflict | Conflict Resolution | Elec-Mate',
    description:
      'What conflict is, the five conflict styles, common triggers in construction, and understanding your default response.',
  });

  return (
    <ModuleShell
      backTo="../conflict-resolution"
      backLabel="Conflict resolution & difficult conversations"
      moduleNumber={1}
      title="Understanding conflict"
      description="What conflict actually is, how different people handle it, the triggers that cause it on construction sites, and how to understand your own default response."
      tone="red"
      sectionsCount={sections.length}
      duration="35 mins"
      nextModuleHref="../cr-module-2"
      nextModuleLabel="Communication for difficult conversations"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cr-module-1-section-${section.id}`}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
