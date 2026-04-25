import { Cable, Battery, Clock, Flame, Monitor } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Cable types and installation requirements',
    icon: Cable,
    description: 'Cable specifications and installation methods for emergency circuits.',
  },
  {
    id: 2,
    title: 'Self-contained vs central battery systems',
    icon: Battery,
    description: 'System architectures and the trade-offs of each backup approach.',
  },
  {
    id: 3,
    title: 'Battery sizing and autonomy duration',
    icon: Clock,
    description: 'Battery capacity calculations and runtime requirements.',
  },
  {
    id: 4,
    title: 'Circuit segregation and fire integrity',
    icon: Flame,
    description: 'Fire-resistant cabling and circuit protection during a fire event.',
  },
  {
    id: 5,
    title: 'Remote testing and monitoring systems',
    icon: Monitor,
    description: 'Automated testing and remote monitoring solutions.',
  },
];

export default function EmergencyLightingModule4() {
  useSEO({
    title: 'Module 4: Cabling, Battery Backup & Circuiting | Emergency Lighting | Elec-Mate',
    description:
      'Cable selection, self-contained vs central battery, autonomy duration, fire integrity and remote monitoring.',
  });

  return (
    <ModuleShell
      backTo="../emergency-lighting-course"
      backLabel="Emergency lighting systems"
      moduleNumber={4}
      title="Cabling, battery backup and circuiting"
      description="Power supply systems, cable selection and circuit design considerations."
      tone="yellow"
      sectionsCount={sections.length}
      duration="55 mins"
      prevModuleHref="../emergency-lighting-module-3"
      prevModuleLabel="Design requirements and placement"
      nextModuleHref="../emergency-lighting-module-5"
      nextModuleLabel="Installation, testing and maintenance"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../emergency-lighting-module-4-section-${section.id}`}
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
