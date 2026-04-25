import { BookOpen, Building, TrendingUp, MapPin, FileCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: "What is a BMS and why it's used",
    icon: BookOpen,
    description: 'Introduction to building management systems and core operating principles.',
  },
  {
    id: 2,
    title: 'Common systems integrated with BMS (HVAC, lighting, access)',
    icon: Building,
    description: 'System integration patterns and connectivity across building services.',
  },
  {
    id: 3,
    title: 'Benefits of BMS: efficiency, comfort, control',
    icon: TrendingUp,
    description: 'Energy savings, occupant comfort and centralised control advantages.',
  },
  {
    id: 4,
    title: 'Real-world environments using BMS (commercial, healthcare, retail)',
    icon: MapPin,
    description: 'Application sectors and representative use cases.',
  },
  {
    id: 5,
    title: 'Overview of relevant standards (ISO 16484, EN 15232)',
    icon: FileCheck,
    description: 'Industry standards governing BMS design, performance and classification.',
  },
  {
    id: 6,
    title: "The electrician's role in BMS installations",
    icon: FileCheck,
    description: 'Professional responsibilities, scope of works and best practices.',
  },
];

export default function BMSModule1() {
  useSEO({
    title: 'Module 1: BMS Overview | BMS Course | Elec-Mate',
    description:
      'Introduction to building management systems — purpose, integrations, benefits, sectors, standards and the electrician\'s role.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={1}
      title="BMS overview and industry applications"
      description="Introduction to building management systems and where they're used."
      tone="yellow"
      sectionsCount={sections.length}
      duration="50 mins"
      nextModuleHref="../bms-module-2"
      nextModuleLabel="Control devices and field sensors"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bms-module-1-section-${section.id}`}
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
