import { ClipboardList, Layers, ArrowDownToLine, HardHat } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Planning & preparation',
    icon: ClipboardList,
    description:
      'Site survey, ground assessment, overhead hazards, exclusion zones and PPE requirements.',
  },
  {
    id: 2,
    title: '3T method (through the trap)',
    icon: Layers,
    description:
      'Step-by-step 3T assembly sequence, safe climbing positions and guardrail installation from protected positions.',
  },
  {
    id: 3,
    title: 'AGR method (advance guard rail)',
    icon: HardHat,
    description:
      'How AGR frames work, automatic guardrails, advantages over 3T and the AGR assembly sequence.',
  },
  {
    id: 4,
    title: 'Dismantling & safe lowering',
    icon: ArrowDownToLine,
    description:
      'Reverse sequence dismantling, safe lowering of components, minimum crew requirements and site clearance.',
  },
];

export default function IpafModule3() {
  useSEO({
    title: 'Module 3: Assembly & Dismantling | IPAF | Elec-Mate',
    description:
      '3T and AGR assembly methods, planning, preparation and safe dismantling procedures for mobile access towers.',
  });

  return (
    <ModuleShell
      backTo="../ipaf-course"
      backLabel="IPAF mobile scaffold training"
      moduleNumber={3}
      title="Assembly & dismantling"
      description="3T and AGR assembly methods, planning, preparation and safe dismantling procedures for mobile access towers."
      tone="emerald"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../ipaf-module-2"
      prevModuleLabel="Tower types & components"
      nextModuleHref="../ipaf-module-4"
      nextModuleLabel="Inspection & maintenance"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ipaf-module-3-section-${section.id}`}
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
