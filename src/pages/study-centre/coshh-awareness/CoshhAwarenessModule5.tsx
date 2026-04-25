import { Activity, Stethoscope, Siren, BookOpen } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Workplace monitoring',
    icon: Activity,
    description:
      'Air monitoring techniques, surface sampling, biological monitoring and interpreting results against WELs.',
  },
  {
    id: 2,
    title: 'Health surveillance',
    icon: Stethoscope,
    description:
      'When health surveillance is required, types of surveillance, medical questionnaires and record-keeping obligations.',
  },
  {
    id: 3,
    title: 'Emergency procedures',
    icon: Siren,
    description:
      'Spill and leak response, first aid for chemical exposure, decontamination procedures and emergency planning.',
  },
  {
    id: 4,
    title: 'Training, record keeping & review',
    icon: BookOpen,
    description:
      'COSHH training requirements, assessment review cycles, documentation standards and continuous improvement.',
  },
];

export default function CoshhAwarenessModule5() {
  useSEO({
    title: 'Module 5: Monitoring, Surveillance & Emergencies | COSHH Awareness | Elec-Mate',
    description:
      'Workplace monitoring, health surveillance programmes, emergency procedures for chemical incidents, and COSHH training and record-keeping requirements.',
  });

  return (
    <ModuleShell
      backTo="../coshh-awareness-course"
      backLabel="COSHH awareness"
      moduleNumber={5}
      title="Monitoring, surveillance & emergencies"
      description="How to monitor workplace exposure, when health surveillance is needed, how to respond to chemical emergencies, and the training and record-keeping duties under COSHH."
      tone="purple"
      sectionsCount={sections.length}
      duration="30 mins"
      prevModuleHref="../coshh-awareness-module-4"
      prevModuleLabel="Control measures & PPE"
      nextModuleHref="../coshh-awareness-module-6"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../coshh-awareness-module-5-section-${section.id}`}
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
