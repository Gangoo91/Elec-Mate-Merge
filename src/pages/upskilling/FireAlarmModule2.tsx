import { CheckCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Detector technologies', icon: CheckCircle, description: 'Smoke, heat, multisensor and beam detectors.' },
  { id: 2, title: 'Detector siting and coverage', icon: CheckCircle, description: 'Spacing, ceiling heights and environments.' },
  { id: 3, title: 'Manual call points', icon: CheckCircle, description: 'Types, positioning and accessibility.' },
  { id: 4, title: 'Sounders and VADs', icon: CheckCircle, description: 'Audible and visual alarm devices.' },
  { id: 5, title: 'False alarm management', icon: CheckCircle, description: 'Causes and mitigation strategies.' },
];

export default function FireAlarmModule2() {
  useSEO({
    title: 'Module 2: Detectors, Call Points and Devices | Fire Alarm | Elec-Mate',
    description: 'Detection technologies, device selection, siting requirements, sounders, VADs and false alarm prevention.',
  });

  return (
    <ModuleShell
      backTo="../../fire-alarm-course"
      backLabel="Fire alarm systems"
      moduleNumber={2}
      title="Detectors, call points and devices"
      description="Choose the right detection device, position it correctly and design out false alarms."
      tone="red"
      sectionsCount={sections.length}
      duration="3-4 hours"
      prevModuleHref="../module-1"
      prevModuleLabel="Categories of fire alarm systems"
      nextModuleHref="../module-3"
      nextModuleLabel="System design and zone planning"
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
