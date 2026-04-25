import { LifeBuoy, ArrowDownToLine, ListChecks, FileWarning } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Emergency scenarios & rescue plan requirements',
    icon: LifeBuoy,
    description:
      'Legal requirement for rescue plans, emergency scenarios, rescue plan components and communication methods.',
  },
  {
    id: 2,
    title: 'Emergency lowering systems & ground controls',
    icon: ArrowDownToLine,
    description:
      'Four control systems, auxiliary power units, manual lowering valves, hand pumps and engine override procedures.',
  },
  {
    id: 3,
    title: 'Rescue procedures step by step',
    icon: ListChecks,
    description:
      'Option A (ground controls), Option B (emergency lowering), Option C (emergency services) and the nominated ground rescue person.',
  },
  {
    id: 4,
    title: 'Post-incident procedures, RIDDOR & lessons learnt',
    icon: FileWarning,
    description:
      'Post-incident actions, RIDDOR reporting, near-miss reporting, accident investigation and 2024 IPAF statistics.',
  },
];

export default function MewpModule5() {
  useSEO({
    title:
      'Module 5: Emergency procedures, rescue & reporting | MEWP operator training | Elec-Mate',
    description:
      'MEWP emergency procedures, rescue plans, lowering systems, step-by-step rescue, RIDDOR reporting and accident statistics.',
  });

  return (
    <ModuleShell
      backTo="../mewp-course"
      backLabel="MEWP operator training"
      moduleNumber={5}
      title="Emergency procedures, rescue & reporting"
      description="What to do when things go wrong — emergency lowering, rescue procedures, the ground rescue person and post-incident reporting."
      tone="emerald"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../mewp-module-4"
      prevModuleLabel="Safe operating procedures"
      nextModuleHref="../mewp-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mewp-module-5-section-${section.id}`}
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
