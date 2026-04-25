import { Search, ClipboardList, FileCheck, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';

const subsections = [
  {
    number: 'Subsection 1',
    title: 'Purpose of Risk Assessments',
    description: 'Understanding why risk assessments are essential for electrical work',
    icon: Search,
    href: '3-1',
  },
  {
    number: 'Subsection 2',
    title: 'The Five Steps of Risk Assessment',
    description: 'Step-by-step process for conducting effective risk assessments',
    icon: ClipboardList,
    href: '3-2',
  },
  {
    number: 'Subsection 3',
    title: 'What is a Method Statement?',
    description: 'Documentation of safe working procedures and processes',
    icon: FileCheck,
    href: '3-3',
  },
  {
    number: 'Subsection 4',
    title: 'Control Measures and the Hierarchy of Control',
    description: 'Implementing effective controls to manage workplace risks',
    icon: Shield,
    href: '3-4',
  },
];

export default function Section3() {
  return (
    <SectionShell
      backTo=".."
      backLabel="Module 1"
      moduleNumber={1}
      sectionNumber={3}
      title="Risk assessment and method statements"
      description="Planning and documenting safe working procedures for electrical installations."
      tone="emerald"
      subsectionsCount={subsections.length}
      prevSectionHref="../section2"
      prevSectionLabel="Common electrical hazards"
      nextSectionHref="../section4"
      nextSectionLabel="PPE and safe working practices"
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
}
