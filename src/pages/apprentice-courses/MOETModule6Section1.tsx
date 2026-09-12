import { PenTool, Zap, Wrench, Ruler, GitBranch } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1.1',
    title: 'Engineering drawing conventions',
    description: 'Standard conventions, line types, projection methods and drawing layouts',
    icon: PenTool,
    href: '/study-centre/apprentice/m-o-e-t-module6-section1-1',
  },
  {
    number: '6.1.2',
    title: 'Legal and safety reasons (EAWR, BS 7671 principles)',
    description:
      'Legal requirements under EAWR 1989, BS 7671 compliance, personal responsibility and consequences of non-compliance',
    icon: Zap,
    href: '/study-centre/apprentice/m-o-e-t-module6-section1-2',
  },
  {
    number: '6.1.3',
    title: 'Orthographic projection',
    description: 'First and third angle projection, and how to read an engineering drawing',
    icon: Wrench,
    href: '/study-centre/apprentice/m-o-e-t-module6-section1-3',
  },
  {
    number: '6.1.4',
    title: 'Drawing layouts and title blocks',
    description: 'Sheet layout, title block fields and what each one tells you',
    icon: Ruler,
    href: '/study-centre/apprentice/m-o-e-t-module6-section1-4',
  },
  {
    number: '6.1.5',
    title: 'Introduction to CAD',
    description: 'What CAD is used for and how to work with CAD-produced drawings',
    icon: GitBranch,
    href: '/study-centre/apprentice/m-o-e-t-module6-section1-5',
  },
];

const MOETModule6Section1 = () => {
  useSEO(
    'Section 6.1: Reading and Producing Technical Drawings - MOET Module 6',
    'Engineering conventions, electrical schematics, mechanical drawings and revision control'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={1}
      title="Reading and producing technical drawings"
      description="Engineering conventions, electrical schematics, mechanical drawings and revision control."
      tone="orange"
      subsectionsCount={subsections.length}
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
};

export default MOETModule6Section1;
