import { ClipboardCheck, Wrench, Shield, Scale } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Pre-assembly planning',
    icon: ClipboardCheck,
    description:
      'Site survey, ground assessment, overhead hazards, exclusion zones and method statement.',
  },
  {
    id: 2,
    title: '3T method — Through The Trap',
    icon: Wrench,
    description:
      'Step-by-step base-to-top assembly, guardrail installation and trapdoor use.',
  },
  {
    id: 3,
    title: 'AGR method — Advance Guard Rail',
    icon: Shield,
    description:
      'How AGR frames work, step-by-step assembly, 3T vs AGR comparison and when to use each.',
  },
  {
    id: 4,
    title: 'Stability principles',
    icon: Scale,
    description:
      'Centre of gravity, height-to-base ratios, stabilisers, wind loading and worked examples.',
  },
];

export default function PasmaModule3() {
  useSEO({
    title: 'Module 3: Assembly methods | PASMA towers for users | Elec-Mate',
    description:
      'Pre-assembly planning, 3T and AGR assembly methods, stability principles and wind loading for mobile access towers.',
  });

  return (
    <ModuleShell
      backTo="../pasma-course"
      backLabel="PASMA towers for users"
      moduleNumber={3}
      title="Assembly methods"
      description="Site planning, Through The Trap and Advance Guard Rail assembly methods, and the stability principles that keep towers safe."
      tone="blue"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../pasma-module-2"
      prevModuleLabel="Tower types & components"
      nextModuleHref="../pasma-module-4"
      nextModuleLabel="Dismantling, moving & storage"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../pasma-module-3-section-${section.id}`}
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
