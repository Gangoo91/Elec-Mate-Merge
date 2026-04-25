import { Target, Leaf, AlertTriangle, FileText } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The purpose and business case for efficiency',
    icon: Target,
    description: 'Understanding the business benefits of energy efficiency programmes.',
  },
  {
    id: 2,
    title: 'UK carbon targets and net zero',
    icon: Leaf,
    description: 'Government targets, environmental legislation and the path to net zero.',
  },
  {
    id: 3,
    title: 'Identifying waste in electrical systems',
    icon: AlertTriangle,
    description: 'Common sources of energy waste and inefficiency in installations.',
  },
  {
    id: 4,
    title: 'BS EN and ISO standards overview',
    icon: FileText,
    description: 'Relevant standards governing energy management and efficiency programmes.',
  },
];

export default function EnergyEfficiencyModule1() {
  useSEO({
    title: 'Module 1: Introduction to Energy Efficiency | Elec-Mate',
    description:
      'The business case for efficiency, UK carbon targets, identifying waste and applicable BS EN/ISO standards.',
  });

  return (
    <ModuleShell
      backTo="../energy-efficiency-course"
      backLabel="Energy efficiency and management"
      moduleNumber={1}
      title="Introduction to energy efficiency"
      description="The fundamentals of energy efficiency and why it matters to every electrical professional."
      tone="yellow"
      sectionsCount={sections.length}
      duration="45 mins"
      nextModuleHref="../energy-efficiency-module-2"
      nextModuleLabel="Power quality and load analysis"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../energy-efficiency-module-1-section-${section.id}`}
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
