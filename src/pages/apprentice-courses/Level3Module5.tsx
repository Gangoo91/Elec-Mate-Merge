import { FileCheck, TestTube, Zap, Settings, FileText, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Principles of inspection and testing',
    description: 'Fundamental principles, requirements and procedures for electrical inspection and testing.',
    icon: FileCheck,
  },
  {
    id: 2,
    title: 'Inspection procedures',
    description: 'Detailed visual inspection procedures for electrical installations and systems.',
    icon: TestTube,
  },
  {
    id: 3,
    title: 'Testing procedures',
    description: 'Continuity, insulation resistance, polarity, earth fault loop and RCD testing procedures.',
    icon: Zap,
  },
  {
    id: 4,
    title: 'Commissioning of installations',
    description: 'Safe energisation, functional testing and commissioning procedures for electrical installations.',
    icon: Settings,
  },
  {
    id: 5,
    title: 'Certification and reporting',
    description: 'Certification requirements, documentation and legal responsibilities for electrical work.',
    icon: FileText,
  },
  {
    id: 6,
    title: 'Faults found during testing',
    description: 'Procedures for dealing with faults discovered during testing and inspection.',
    icon: AlertTriangle,
  },
];

export default function Level3Module5() {
  useSEO({
    title: 'Module 5: Inspection, Testing and Commissioning | Level 3 Electrical Installation | Elec-Mate',
    description:
      'Inspection principles, visual inspection, testing procedures, commissioning, certification and dealing with faults to BS 7671 standards.',
  });

  return (
    <ModuleShell
      backTo="../level3"
      backLabel="Level 3 electrical installation"
      moduleNumber={5}
      title="Inspection, testing and commissioning"
      description="Inspection principles, testing procedures, commissioning, certification and the management of faults found during testing."
      tone="blue"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../level3-module4"
      prevModuleLabel="Fault diagnosis and rectification"
      nextModuleHref="../level3-module6"
      nextModuleLabel="Electrical systems design"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../level3-module5-section${section.id}`}
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
