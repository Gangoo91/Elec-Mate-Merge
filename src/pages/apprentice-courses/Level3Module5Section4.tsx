import { Power, Settings, CheckCircle, Users, FileText } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Safe energisation of circuits',
    description: 'Safe procedures for energising electrical circuits during commissioning',
    icon: Power,
    href: '../level3-module5-section4-1',
  },
  {
    number: '4.2',
    title: 'Functional testing of equipment and systems',
    description: 'Testing the operational functionality of electrical equipment and systems',
    icon: Settings,
    href: '../level3-module5-section4-2',
  },
  {
    number: '4.3',
    title: 'Confirming compliance with design specification',
    description: 'Verifying that installations meet the original design specifications',
    icon: CheckCircle,
    href: '../level3-module5-section4-3',
  },
  {
    number: '4.4',
    title: 'Client handover and demonstration of systems',
    description: 'Procedures for client handover and demonstration of installed systems',
    icon: Users,
    href: '../level3-module5-section4-4',
  },
  {
    number: '4.5',
    title: 'Producing commissioning reports',
    description: 'Creating comprehensive commissioning reports and documentation',
    icon: FileText,
    href: '../level3-module5-section4-5',
  },
];

const Level3Module5Section4 = () => {
  useSEO(
    'Section 4: Commissioning of Installations - Level 3 Module 5',
    'Safe energisation, functional testing and commissioning procedures for electrical installations'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={4}
      title="Commissioning of installations"
      description="Safe energisation, functional testing and commissioning procedures for electrical installations."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module5-section3"
      prevSectionLabel="Testing procedures"
      nextSectionHref="../level3-module5-section5"
      nextSectionLabel="Certification and reporting"
    >
      {subsections.map((s, i) => (
        <ModuleCard
          key={i}
          number={s.number}
          title={s.title}
          description={s.description}
          icon={s.icon}
          href={s.href}
        />
      ))}
    </SectionShell>
  );
};

export default Level3Module5Section4;
