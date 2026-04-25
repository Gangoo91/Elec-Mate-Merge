import { HardHat, DoorOpen, MapPin, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The fire marshal role',
    icon: HardHat,
    description:
      'Appointment, responsibilities, authority, relationship with the responsible person, and the difference between fire marshals and fire wardens.',
  },
  {
    id: 2,
    title: 'Evacuation procedures',
    icon: DoorOpen,
    description:
      'Simultaneous, phased, progressive horizontal and defend-in-place strategies, alarm response and sweep procedures.',
  },
  {
    id: 3,
    title: 'Assembly points & roll call',
    icon: MapPin,
    description:
      'Selecting assembly points, conducting roll calls, accounting for visitors and contractors, and reporting to emergency services.',
  },
  {
    id: 4,
    title: 'Personal emergency evacuation plans',
    icon: Users,
    description:
      'PEEPs for persons with disabilities, buddy systems, refuges, evacuation chairs and communication during evacuation.',
  },
];

export default function FireSafetyModule4() {
  useSEO({
    title: 'Module 4: Fire Marshal Duties & Evacuation | Fire Safety & Fire Marshal | Elec-Mate',
    description:
      'Fire marshal roles and responsibilities, evacuation procedures, assembly points and personal emergency evacuation plans.',
  });

  return (
    <ModuleShell
      backTo="../fire-safety-course"
      backLabel="Fire safety & fire marshal"
      moduleNumber={4}
      title="Fire marshal duties & evacuation"
      description="The fire marshal role and its responsibilities, evacuation strategies, assembly point and roll call procedures, and personal emergency evacuation plans."
      tone="amber"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../fire-safety-module-3"
      prevModuleLabel="Fire prevention & detection"
      nextModuleHref="../fire-safety-module-5"
      nextModuleLabel="Firefighting equipment & incident response"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../fire-safety-module-4-section-${section.id}`}
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
