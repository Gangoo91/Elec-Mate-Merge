import { ArrowUpFromLine, Construction, CableCar, Wrench } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Ladders & stepladders',
    icon: ArrowUpFromLine,
    description:
      'When ladders are acceptable, types, the 1:4 ratio, securing, EN 131 and industrial vs domestic class.',
  },
  {
    id: 2,
    title: 'Scaffolding basics',
    icon: Construction,
    description:
      'Independent, putlog, system and tower scaffolds — components, inspection, NASC TG20 and scaffold tags.',
  },
  {
    id: 3,
    title: 'MEWPs',
    icon: CableCar,
    description:
      'Scissor lifts, boom lifts and vertical masts — IPAF categories, pre-use checks and rescue planning.',
  },
  {
    id: 4,
    title: 'Other access equipment',
    icon: Wrench,
    description:
      'Podium steps, hop-ups, trestles, roof ladders, crawling boards and temporary edge protection.',
  },
];

export default function WorkingAtHeightModule2() {
  useSEO({
    title: 'Module 2: Access Equipment & Selection | Working at Height | Elec-Mate',
    description:
      'Ladders, scaffolding, MEWPs and other access equipment — selection criteria, standards and pre-use checks for working at height.',
  });

  return (
    <ModuleShell
      backTo="../working-at-height-course"
      backLabel="Working at height"
      moduleNumber={2}
      title="Access equipment & selection"
      description="Choosing the right access equipment — ladders, scaffolding, MEWPs and specialist platforms for safe working at height."
      tone="amber"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../working-at-height-module-1"
      prevModuleLabel="Understanding working at height"
      nextModuleHref="../working-at-height-module-3"
      nextModuleLabel="Fall protection & prevention"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../working-at-height-module-2-section-${section.id}`}
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
