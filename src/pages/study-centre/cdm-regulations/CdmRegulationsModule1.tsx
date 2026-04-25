import { BookOpen, Clock, FileText, CheckCircle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'What are the CDM regulations?',
    icon: BookOpen,
    description:
      'An overview of the Construction (Design and Management) Regulations 2015 and their purpose in improving health and safety outcomes across all construction projects.',
  },
  {
    id: 2,
    title: 'History & evolution',
    icon: Clock,
    description:
      'How CDM regulations have evolved from CDM 1994 through CDM 2007 to the current 2015 version, and the key changes at each stage.',
  },
  {
    id: 3,
    title: 'Key definitions & scope',
    icon: FileText,
    description:
      'Essential terminology including construction work, structure, contractor, designer and domestic client, plus what falls within the scope of CDM 2015.',
  },
  {
    id: 4,
    title: 'When CDM applies',
    icon: CheckCircle,
    description:
      'Which projects CDM applies to, the thresholds for notification to the HSE, and the distinction between domestic and commercial projects.',
  },
];

export default function CdmRegulationsModule1() {
  useSEO({
    title: 'Module 1: Introduction to CDM 2015 | CDM regulations awareness | Elec-Mate',
    description:
      'What the CDM Regulations are, their history and evolution, key definitions and scope, and when CDM applies to construction projects.',
  });

  return (
    <ModuleShell
      backTo="../cdm-regulations-course"
      backLabel="CDM regulations awareness"
      moduleNumber={1}
      title="Introduction to CDM 2015"
      description="Understand what the Construction (Design and Management) Regulations 2015 are, how they evolved, the key definitions and scope, and when CDM applies to your projects."
      tone="blue"
      sectionsCount={sections.length}
      duration="30 mins"
      nextModuleHref="../cdm-regulations-module-2"
      nextModuleLabel="Duty holders & their roles"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../cdm-regulations-module-1-section-${section.id}`}
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
