import { Shield, FileCheck, Map, Timer, AlertCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Safe isolation procedures (instant fail if wrong)', icon: Shield, description: 'The critical safe-isolation sequence and why it is the most-tested skill.' },
  { id: 2, title: 'Risk assessments and method statements (RAMS)', icon: FileCheck, description: 'Completing RAMS documentation accurately for AM2 tasks.' },
  { id: 3, title: 'Working with drawings and specifications', icon: Map, description: 'Interpreting technical drawings and matching the install to the spec.' },
  { id: 4, title: 'Completing paperwork under pressure', icon: Timer, description: 'Efficient documentation during a timed practical assessment.' },
  { id: 5, title: 'Avoiding critical safety errors', icon: AlertCircle, description: 'The common safety mistakes that lead to instant failure.' },
];

export default function AM2Module2() {
  useSEO({
    title: 'Module 2: Health, Safety and Documentation | AM2 | Elec-Mate',
    description: 'Safe isolation, RAMS, drawings and completing paperwork under exam pressure.',
  });

  return (
    <ModuleShell
      backTo="../am2"
      backLabel="AM2 preparation & guidance"
      moduleNumber={2}
      title="Health, safety and documentation"
      description="Safe isolation, RAMS, drawings and the paperwork side of the AM2 — the things that catch most candidates out."
      tone="yellow"
      sectionsCount={sections.length}
      duration="2h"
      prevModuleHref="../module1"
      prevModuleLabel="Introduction to the AM2"
      nextModuleHref="../module3"
      nextModuleLabel="Installation tasks"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`section${section.id}`}
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
