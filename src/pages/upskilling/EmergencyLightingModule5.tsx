import { Search, TestTube, Calendar, Tag, FileCheck, Users } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Initial inspection and verification',
    icon: Search,
    description: 'Pre-commissioning checks and the verification procedure.',
  },
  {
    id: 2,
    title: 'Functional testing and 3-hour duration tests',
    icon: TestTube,
    description: 'Operational testing and the full duration verification test.',
  },
  {
    id: 3,
    title: 'Monthly and annual testing requirements',
    icon: Calendar,
    description: 'Scheduled testing regimes, frequencies and recordkeeping.',
  },
  {
    id: 4,
    title: 'System labelling and maintenance records',
    icon: Tag,
    description: 'Labelling, log books and the documentation requirements.',
  },
  {
    id: 5,
    title: 'Certification and commissioning checklists',
    icon: FileCheck,
    description: 'Formal certification procedures and the commissioning checklists.',
  },
  {
    id: 6,
    title: 'Client handover procedure',
    icon: Users,
    description: 'Handover documentation, client training and ongoing duties.',
  },
];

export default function EmergencyLightingModule5() {
  useSEO({
    title: 'Module 5: Installation, Testing & Maintenance | Emergency Lighting | Elec-Mate',
    description:
      'Initial inspection, functional and 3-hour duration tests, monthly/annual schedules and client handover.',
  });

  return (
    <ModuleShell
      backTo="../emergency-lighting-course"
      backLabel="Emergency lighting systems"
      moduleNumber={5}
      title="Installation, testing and maintenance"
      description="Complete testing procedures and the maintenance protocols that follow."
      tone="yellow"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../emergency-lighting-module-4"
      prevModuleLabel="Cabling, battery backup and circuiting"
      nextModuleHref="../emergency-lighting-module-6"
      nextModuleLabel="Regulatory compliance and BS 5266"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../emergency-lighting-module-5-section-${section.id}`}
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
