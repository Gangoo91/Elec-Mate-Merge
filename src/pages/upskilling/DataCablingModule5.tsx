import { Wrench, TestTube, BarChart, AlertCircle, Search } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Copper termination tools and techniques',
    icon: Wrench,
    description: 'Tools and methods for accurate copper cable termination.',
  },
  {
    id: 2,
    title: 'Link testing vs channel testing',
    icon: TestTube,
    description: 'Different testing methodologies and when each applies.',
  },
  {
    id: 3,
    title: 'Test equipment and results interpretation',
    icon: BarChart,
    description: 'Operating cable certifiers and reading the result data.',
  },
  {
    id: 4,
    title: 'Cable map and test certificate generation',
    icon: AlertCircle,
    description: 'Documentation, cable maps and the certification deliverable.',
  },
  {
    id: 5,
    title: 'Fault diagnosis and re-termination',
    icon: Search,
    description: 'Troubleshooting and remedial work procedures.',
  },
];

export default function DataCablingModule5() {
  useSEO({
    title: 'Module 5: Termination & Certification | Data Cabling | Elec-Mate',
    description:
      'Copper termination, link vs channel testing, results interpretation and fault diagnosis.',
  });

  return (
    <ModuleShell
      backTo="../data-cabling-course"
      backLabel="Data and communications cabling"
      moduleNumber={5}
      title="Termination and certification procedures"
      description="Cable termination, testing and the certification process."
      tone="cyan"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../data-cabling-module-4"
      prevModuleLabel="Containment, labelling and installation best practice"
      nextModuleHref="../data-cabling-module-6"
      nextModuleLabel="TIA/EIA and ISO cabling standards explained"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../data-cabling-module-5-section-${section.id}`}
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
