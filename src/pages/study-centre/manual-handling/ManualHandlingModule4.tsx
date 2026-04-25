import { Cable, HardHat, DoorOpen, RefreshCw } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Electrical materials & cable drums',
    icon: Cable,
    description:
      'Cable drums, cable trays, distribution boards, transformers and heavy electrical equipment.',
  },
  {
    id: 2,
    title: 'Working in construction environments',
    icon: HardHat,
    description: 'Site conditions, PPE constraints, weather effects and uneven ground.',
  },
  {
    id: 3,
    title: 'Handling in confined & restricted spaces',
    icon: DoorOpen,
    description: 'Loft work, ceiling voids, under-floor access, risers and restricted headroom.',
  },
  {
    id: 4,
    title: 'Repetitive handling & cumulative risk',
    icon: RefreshCw,
    description: 'Repetitive strain, fatigue management, job rotation and micro-breaks.',
  },
];

export default function ManualHandlingModule4() {
  useSEO({
    title: 'Module 4: Workplace-Specific Handling | Manual Handling | Elec-Mate',
    description:
      'Handling electrical materials, construction environments, confined spaces and repetitive handling risks.',
  });

  return (
    <ModuleShell
      backTo="../manual-handling-course"
      backLabel="Manual handling"
      moduleNumber={4}
      title="Workplace-specific handling"
      description="Handling electrical materials, construction site conditions, confined spaces and managing repetitive handling risks."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../manual-handling-module-3"
      prevModuleLabel="Risk assessment & reduction"
      nextModuleHref="../manual-handling-module-5"
      nextModuleLabel="Health, welfare & responsibilities"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../manual-handling-module-4-section-${section.id}`}
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
