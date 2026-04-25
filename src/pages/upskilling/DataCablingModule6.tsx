import { BookOpen, Award, Building, FileCheck } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'TIA/EIA 568 and ISO/IEC 11801 overview',
    icon: BookOpen,
    description: 'International cabling standards and their requirements.',
  },
  {
    id: 2,
    title: 'Class D, E, EA and F standards',
    icon: Award,
    description: 'Performance class specifications and their applications.',
  },
  {
    id: 3,
    title: 'Building and campus standards',
    icon: Building,
    description: 'Installation standards for buildings and campus environments.',
  },
  {
    id: 4,
    title: 'Record-keeping and documentation requirements',
    icon: FileCheck,
    description: 'Documentation standards and record maintenance.',
  },
];

export default function DataCablingModule6() {
  useSEO({
    title: 'Module 6: TIA/EIA & ISO Standards | Data Cabling | Elec-Mate',
    description:
      'TIA/EIA 568, ISO/IEC 11801, Class D/E/EA/F standards and documentation requirements.',
  });

  return (
    <ModuleShell
      backTo="../data-cabling-course"
      backLabel="Data and communications cabling"
      moduleNumber={6}
      title="TIA/EIA and ISO cabling standards explained"
      description="International standards and the documentation they require."
      tone="cyan"
      sectionsCount={sections.length}
      duration="40 mins"
      prevModuleHref="../data-cabling-module-5"
      prevModuleLabel="Termination and certification procedures"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../data-cabling-module-6-section-${section.id}`}
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
