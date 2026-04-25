import { Cable, Zap, Lightbulb, Settings, CheckCircle, Clock } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Cable selection and containment', icon: Cable, description: 'Choosing the right cable, trunking, conduit and tray for the AM2 install.' },
  { id: 2, title: 'Power circuits — ring, radial, cooker, motor', icon: Zap, description: 'Installing each common power circuit type to spec.' },
  { id: 3, title: 'Lighting circuits and control systems', icon: Lightbulb, description: 'Lighting installations and switching arrangements.' },
  { id: 4, title: 'Termination, connections and circuit labelling', icon: Settings, description: 'Workmanship standards, connections and clear circuit labelling.' },
  { id: 5, title: 'Accuracy, neatness and BS 7671 compliance', icon: CheckCircle, description: 'Meeting installation standards and the regulatory requirements.' },
  { id: 6, title: 'Managing time during installation', icon: Clock, description: 'Efficient installation techniques when the clock is against you.' },
];

export default function AM2Module3() {
  useSEO({
    title: 'Module 3: Installation Tasks | AM2 | Elec-Mate',
    description: 'Cable selection, containment, power and lighting circuits, terminations and time management for the AM2 install.',
  });

  return (
    <ModuleShell
      backTo="../am2"
      backLabel="AM2 preparation & guidance"
      moduleNumber={3}
      title="Installation tasks"
      description="The installation portion of the AM2 — cables, containment, circuits, terminations and getting it done in time."
      tone="yellow"
      sectionsCount={sections.length}
      duration="3h"
      prevModuleHref="../module2"
      prevModuleLabel="Health, safety and documentation"
      nextModuleHref="../module4"
      nextModuleLabel="Inspection and testing"
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
