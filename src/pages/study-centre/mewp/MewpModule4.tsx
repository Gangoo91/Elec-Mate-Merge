import { Gauge, MoveVertical, Zap, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Pre-start checks & operating controls',
    icon: Gauge,
    description:
      '11-step pre-start procedure, platform controls, ground controls, auxiliary controls, emergency stops and function checks.',
  },
  {
    id: 2,
    title: 'Travelling, elevating & platform loading',
    icon: MoveVertical,
    description:
      'Stowed vs elevated travel, slope travel rules, smooth control inputs, SWL management and even load distribution.',
  },
  {
    id: 3,
    title: 'Working near structures, power lines & public areas',
    icon: Zap,
    description:
      'Entrapment prevention, power line safe distances (15m/9m/3m), arcing without contact, public areas and night working.',
  },
  {
    id: 4,
    title: 'Exclusion zones, traffic management & banksman duties',
    icon: Users,
    description:
      '10m exclusion zones, barrier requirements, banksman role and signals, traffic management, loading and unloading.',
  },
];

export default function MewpModule4() {
  useSEO({
    title: 'Module 4: Safe operating procedures | MEWP operator training | Elec-Mate',
    description:
      'Safe MEWP operating procedures including controls, travelling, elevating, power line distances, exclusion zones and banksman duties.',
  });

  return (
    <ModuleShell
      backTo="../mewp-course"
      backLabel="MEWP operator training"
      moduleNumber={4}
      title="Safe operating procedures"
      description="How to safely operate a MEWP from pre-start checks through to working at height, including special situations and the role of the banksman."
      tone="emerald"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../mewp-module-3"
      prevModuleLabel="Pre-use inspections, setup & fall protection"
      nextModuleHref="../mewp-module-5"
      nextModuleLabel="Emergency procedures, rescue & reporting"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../mewp-module-4-section-${section.id}`}
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
