import { Search, AlertTriangle, Settings, Cloud } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Risk assessment process & documentation',
    icon: Search,
    description:
      'Five-step risk assessment, site surveys, recording findings, method statements and safe systems of work.',
  },
  {
    id: 2,
    title: 'The six key hazards',
    icon: AlertTriangle,
    description:
      'Falls, electrocution, overturn, entrapment, collision and machine failure — causes, statistics and prevention.',
  },
  {
    id: 3,
    title: 'Machine selection & safe systems of work',
    icon: Settings,
    description:
      'HSE GEIS6 selection criteria, SWL considerations, method statement components and SSOW documentation.',
  },
  {
    id: 4,
    title: 'Ground conditions, slopes & weather limits',
    icon: Cloud,
    description:
      'Bearing capacity, sub-surface hazards, slope limits, 12.5 m/s wind maximum, anemometers and spreader pads.',
  },
];

export default function MewpModule2() {
  useSEO({
    title: 'Module 2: Risk assessment, planning & selection | MEWP operator training | Elec-Mate',
    description:
      'Risk assessment for MEWP work, the six key hazards, machine selection criteria, ground conditions and weather limits.',
  });

  return (
    <ModuleShell
      backTo="../mewp-course"
      backLabel="MEWP operator training"
      moduleNumber={2}
      title="Risk assessment, planning & machine selection"
      description="How to assess risks, identify hazards, select the right MEWP for the job and account for ground conditions and weather."
      tone="emerald"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../mewp-module-1"
      prevModuleLabel="Introduction, legislation & MEWP types"
      nextModuleHref="../mewp-module-3"
      nextModuleLabel="Pre-use inspections, setup & fall protection"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mewp-module-2-section-${section.id}`}
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
