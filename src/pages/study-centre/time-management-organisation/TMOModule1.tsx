import { Search, Grid3X3, AlertTriangle, ListOrdered } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Where does your time go?',
    icon: Search,
    description:
      "Time audits, the busy-but-not-productive trap, Parkinson's Law, hidden time sinks for tradespeople and the planning fallacy.",
  },
  {
    id: 2,
    title: 'The Eisenhower Matrix',
    icon: Grid3X3,
    description:
      'Urgent vs important, the 4 quadrants, moving from reactive to proactive and practical prioritisation.',
  },
  {
    id: 3,
    title: 'Common time traps in construction',
    icon: AlertTriangle,
    description:
      'Saying yes to everything, perfectionism, context switching, underquoting time and the WhatsApp trap.',
  },
  {
    id: 4,
    title: 'Setting priorities that stick',
    icon: ListOrdered,
    description:
      "Covey's Big Rocks, the 80/20 Rule, Most Important Tasks and building a weekly priority system.",
  },
];

export default function TMOModule1() {
  useSEO({
    title: 'Module 1: Understanding Time Management | Time Management & Organisation | Elec-Mate',
    description:
      'Where your time goes, the Eisenhower Matrix, common time traps and setting priorities that stick.',
  });

  return (
    <ModuleShell
      backTo="../time-management-organisation"
      backLabel="Time management & organisation"
      moduleNumber={1}
      title="Understanding time management"
      description="Where your time actually goes, how to prioritise effectively, the traps that steal hours from your day and frameworks that help you take control."
      tone="indigo"
      sectionsCount={sections.length}
      duration="35 mins"
      nextModuleHref="../tmo-module-2"
      nextModuleLabel="Planning & scheduling"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../tmo-module-1-section-${section.id}`}
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
