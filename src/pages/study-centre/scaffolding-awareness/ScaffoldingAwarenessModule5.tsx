import { ShieldCheck, AlertTriangle, Wind, HardHat } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Safe working on scaffolds',
    icon: ShieldCheck,
    description:
      'Access and egress, three points of contact, keeping platforms clear, load limits and not overreaching.',
  },
  {
    id: 2,
    title: 'Common scaffold hazards',
    icon: AlertTriangle,
    description:
      'Falls from height, falling objects, scaffold collapse, electrocution from overhead lines, slips/trips and crushing.',
  },
  {
    id: 3,
    title: 'Weather & environmental conditions',
    icon: Wind,
    description:
      'Wind speed limits, ice and frost, rain, lightning and when to stop work on scaffolds.',
  },
  {
    id: 4,
    title: 'Loading, storage & prohibited actions',
    icon: HardHat,
    description:
      'Maximum bay loads, material storage rules, never modify scaffolds, prohibited activities and scaffold user responsibilities.',
  },
];

export default function ScaffoldingAwarenessModule5() {
  useSEO({
    title: 'Module 5: Safe Use & Hazard Awareness | Scaffolding Awareness | Elec-Mate',
    description:
      'Working safely on scaffolds, common hazards, weather limits and loading and storage rules.',
  });

  return (
    <ModuleShell
      backTo="../scaffolding-awareness-course"
      backLabel="Scaffolding awareness"
      moduleNumber={5}
      title="Safe use & hazard awareness"
      description="How to work safely on scaffolds, identify common hazards, understand the impact of weather and follow the rules for loading, storage and prohibited actions."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../scaffolding-awareness-module-4"
      prevModuleLabel="Scaffold inspection & tagging"
      nextModuleHref="../scaffolding-awareness-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../scaffolding-awareness-module-5-section-${section.id}`}
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
