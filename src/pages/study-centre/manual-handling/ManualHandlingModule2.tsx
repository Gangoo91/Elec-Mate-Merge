import { Dumbbell, MoveHorizontal, Users, Boxes } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The kinetic lifting technique',
    icon: Dumbbell,
    description:
      'The eight-step safe lift, base of support, centre of gravity and smooth controlled movements.',
  },
  {
    id: 2,
    title: 'Pushing, pulling & carrying',
    icon: MoveHorizontal,
    description:
      'Force requirements, body positioning, reducing friction and safe carrying techniques.',
  },
  {
    id: 3,
    title: 'Team handling & communication',
    icon: Users,
    description:
      'Coordinated lifts, verbal signals, planning team lifts and maximum team sizes.',
  },
  {
    id: 4,
    title: 'Awkward loads & restricted spaces',
    icon: Boxes,
    description: 'Long loads, uneven loads, hot or sharp items and handling in confined areas.',
  },
];

export default function ManualHandlingModule2() {
  useSEO({
    title: 'Module 2: Principles of Safe Lifting | Manual Handling | Elec-Mate',
    description:
      'The kinetic lifting technique, pushing, pulling, carrying, team handling and managing awkward loads.',
  });

  return (
    <ModuleShell
      backTo="../manual-handling-course"
      backLabel="Manual handling"
      moduleNumber={2}
      title="Principles of safe lifting"
      description="The kinetic lifting technique, pushing, pulling, carrying, team handling and managing awkward loads."
      tone="emerald"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../manual-handling-module-1"
      prevModuleLabel="Understanding manual handling"
      nextModuleHref="../manual-handling-module-3"
      nextModuleLabel="Risk assessment & reduction"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../manual-handling-module-2-section-${section.id}`}
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
