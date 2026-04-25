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
      title: 'Mechanical drawings (for context)',
      description: 'Understanding mechanical drawings and their relationship to electrical systems',
      icon: Wrench,
      href: '/study-centre/apprentice/m-o-e-t-module6-section1-3',
    },
    {
      number: '6.1.4',
      title: 'Tolerances and dimensions',
      description: 'Dimensional tolerancing, geometric tolerances and measurement standards',
      icon: Ruler,
      href: '/study-centre/apprentice/m-o-e-t-module6-section1-4',
    },
    {
      number: '6.1.5',
      title: 'Revision control of drawings',
      description: 'Version control, change management and drawing approval processes',
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
