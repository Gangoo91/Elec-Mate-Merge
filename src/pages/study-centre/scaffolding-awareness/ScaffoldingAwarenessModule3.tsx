import { Wrench, Layers, ArrowUpFromLine, ShieldCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Tubes, couplers & fittings',
    icon: Wrench,
    description:
      'Steel tube specifications, coupler types (right-angle, swivel, putlog, sleeve), fitting methods and torque requirements.',
  },
  {
    id: 2,
    title: 'Base plates, sole boards & foundations',
    icon: Layers,
    description:
      'Load-bearing requirements, sole board sizing, ground conditions, base plate positioning and adjustable bases.',
  },
  {
    id: 3,
    title: 'Platforms, guard rails & toe boards',
    icon: ArrowUpFromLine,
    description:
      'Working platform widths, board types, board clips, guard rail heights (950mm), mid rails, toe boards (150mm) and brick guards.',
  },
  {
    id: 4,
    title: 'Bracing, ties & stability',
    icon: ShieldCheck,
    description:
      'Ledger bracing, plan bracing, facade bracing, tie patterns (box, lip, through), tie spacing and why ties are critical.',
  },
];

export default function ScaffoldingAwarenessModule3() {
  useSEO({
    title: 'Module 3: Scaffold Components & Assembly | Scaffolding Awareness | Elec-Mate',
    description:
      'Scaffold tubes, couplers, base plates, sole boards, platforms, guard rails, toe boards, bracing and ties.',
  });

  return (
    <ModuleShell
      backTo="../scaffolding-awareness-course"
      backLabel="Scaffolding awareness"
      moduleNumber={3}
      title="Scaffold components & assembly"
      description="Key components used in scaffold construction — from tubes and couplers to base plates and sole boards — with platform, guard rail, toe board, bracing and tie requirements."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../scaffolding-awareness-module-2"
      prevModuleLabel="Scaffold regulations & standards"
      nextModuleHref="../scaffolding-awareness-module-4"
      nextModuleLabel="Scaffold inspection & tagging"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../scaffolding-awareness-module-3-section-${section.id}`}
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
