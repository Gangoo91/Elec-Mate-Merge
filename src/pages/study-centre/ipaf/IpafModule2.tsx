import { Building2, Wrench, ShieldCheck, Target } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Types of mobile access towers',
    icon: Building2,
    description:
      'Standard aluminium, GRP/fibreglass, single-width, double-width, stairwell and folding towers.',
  },
  {
    id: 2,
    title: 'Components & terminology',
    icon: Wrench,
    description:
      'Frames, braces, platforms, guardrails, toeboards, stabilisers, outriggers, castors and base plates.',
  },
  {
    id: 3,
    title: 'Stability & safe working loads',
    icon: ShieldCheck,
    description:
      '275kg per platform, wind limits, lateral forces, manufacturer instructions and the 3:1 ratio myth.',
  },
  {
    id: 4,
    title: 'Selecting the right tower',
    icon: Target,
    description:
      'Matching tower type to task — indoor vs outdoor, height, load, width and access requirements.',
  },
];

export default function IpafModule2() {
  useSEO({
    title: 'Module 2: Tower Types & Components | IPAF | Elec-Mate',
    description:
      'Mobile access tower types, components, stability principles, safe working loads and tower selection.',
  });

  return (
    <ModuleShell
      backTo="../ipaf-course"
      backLabel="IPAF mobile scaffold training"
      moduleNumber={2}
      title="Tower types & components"
      description="Different types of mobile access towers, their components, stability principles and how to select the right tower for the job."
      tone="emerald"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../ipaf-module-1"
      prevModuleLabel="Legislation & responsibilities"
      nextModuleHref="../ipaf-module-3"
      nextModuleLabel="Assembly & dismantling"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ipaf-module-2-section-${section.id}`}
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
