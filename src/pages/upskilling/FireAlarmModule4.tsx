import { CheckCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  { id: 1, title: 'Primary power supplies', icon: CheckCircle, description: 'Mains supply requirements and protection.' },
  { id: 2, title: 'Secondary power and battery sizing', icon: CheckCircle, description: 'Standby battery requirements and calculations.' },
  { id: 3, title: 'Cable types and fire resistance', icon: CheckCircle, description: 'Standard, enhanced and fire-resistant cables.' },
  { id: 4, title: 'Wiring methods and protection', icon: CheckCircle, description: 'Installation methods and segregation.' },
  { id: 5, title: 'Earth fault monitoring', icon: CheckCircle, description: 'Class A and Class B circuits.' },
];

export default function FireAlarmModule4() {
  useSEO({
    title: 'Module 4: Power Supply, Backup and Cabling | Fire Alarm | Elec-Mate',
    description: 'Primary and secondary power, battery sizing, fire-resistant cables, wiring methods and earth fault monitoring.',
  });

  return (
    <ModuleShell
      backTo="../../fire-alarm-course"
      backLabel="Fire alarm systems"
      moduleNumber={4}
      title="Power supply, backup and cabling"
      description="Sizing standby batteries, choosing the right cable and meeting wiring requirements for fire alarm circuits."
      tone="red"
      sectionsCount={sections.length}
      duration="2-3 hours"
      prevModuleHref="../module-3"
      prevModuleLabel="System design and zone planning"
      nextModuleHref="../module-5"
      nextModuleLabel="Installation and commissioning"
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
