import { CheckCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Zone design principles', icon: CheckCircle, description: 'Zone layouts, floor areas and search distances.' },
  { id: 2, title: 'Addressable vs conventional', icon: CheckCircle, description: 'System architectures and loop design.' },
  { id: 3, title: 'Cause and effect programming', icon: CheckCircle, description: 'Input/output relationships and staged alarms.' },
  { id: 4, title: 'Interface design', icon: CheckCircle, description: 'Integration with BMS, access control and lifts.' },
  { id: 5, title: 'Network and multi-panel systems', icon: CheckCircle, description: 'Networked panels and redundancy.' },
  { id: 6, title: 'Design documentation', icon: CheckCircle, description: 'Specifications, drawings and schedules.' },
];

export default function FireAlarmModule3() {
  useSEO({
    title: 'Module 3: System Design and Zone Planning | Fire Alarm | Elec-Mate',
    description: 'Zone design, addressable systems, cause and effect programming, interfaces, networking and design documentation.',
  });

  return (
    <ModuleShell
      backTo="../../fire-alarm-course"
      backLabel="Fire alarm systems"
      moduleNumber={3}
      title="System design and zone planning"
      description="Effective zone layouts, system architectures and the documentation that ties the design together."
      tone="red"
      sectionsCount={sections.length}
      duration="3-4 hours"
      prevModuleHref="../module-2"
      prevModuleLabel="Detectors, call points and devices"
      nextModuleHref="../module-4"
      nextModuleLabel="Power supply, backup and cabling"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`section-${section.id}`}
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
