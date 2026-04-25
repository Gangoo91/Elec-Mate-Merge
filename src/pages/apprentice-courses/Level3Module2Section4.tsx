import { Car, Thermometer, Zap, Atom, Lightbulb } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '4.1',
    title: 'Electric vehicle (EV) charging infrastructure',
    description: 'EV charging point installation, types and electrical infrastructure requirements',
    icon: Car,
    href: '../level3-module2-section4-1',
  },
  {
    number: '4.2',
    title: 'Heat pumps (air source and ground source)',
    description: 'Heat pump technology, electrical requirements and installation considerations',
    icon: Thermometer,
    href: '../level3-module2-section4-2',
  },
  {
    number: '4.3',
    title: 'Combined heat and power (CHP) awareness',
    description: 'CHP systems overview and electrical integration requirements',
    icon: Zap,
    href: '../level3-module2-section4-3',
  },
  {
    number: '4.4',
    title: 'Hydrogen and fuel cell technologies (overview)',
    description: 'Introduction to hydrogen fuel cells and their electrical applications',
    icon: Atom,
    href: '../level3-module2-section4-4',
  },
  {
    number: '4.5',
    title: 'Future emerging technologies in the sector',
    description: 'Emerging low carbon technologies and their potential electrical applications',
    icon: Lightbulb,
    href: '../level3-module2-section4-5',
  },
];

const Level3Module2Section4 = () => {
  useSEO(
    'Section 4: Low Carbon Technologies - Level 3 Module 2',
    'Carbon reduction technologies and their integration in building services'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={4}
      title="Low carbon technologies"
      description="Carbon reduction technologies and their integration in building services."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module2-section3"
      prevSectionLabel="Renewable energy systems"
      nextSectionHref="../level3-module2-section5"
      nextSectionLabel="Integration with electrical installations"
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

export default Level3Module2Section4;
