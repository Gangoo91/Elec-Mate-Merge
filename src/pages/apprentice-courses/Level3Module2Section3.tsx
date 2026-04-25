import { Sun, Wind, Waves, Battery, Plug } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Solar PV principles, components and installation considerations',
    description:
      'Photovoltaic technology fundamentals, system components and installation requirements',
    icon: Sun,
    href: '../level3-module2-section3-1',
  },
  {
    number: '3.2',
    title: 'Wind generation (small-scale systems)',
    description: 'Small-scale wind turbine systems for residential and commercial applications',
    icon: Wind,
    href: '../level3-module2-section3-2',
  },
  {
    number: '3.3',
    title: 'Hydro and microgeneration awareness',
    description: 'Small-scale hydroelectric systems and microgeneration technologies',
    icon: Waves,
    href: '../level3-module2-section3-3',
  },
  {
    number: '3.4',
    title: 'Battery storage technologies',
    description:
      'Energy storage systems, battery technologies and integration with renewable sources',
    icon: Battery,
    href: '../level3-module2-section3-4',
  },
  {
    number: '3.5',
    title: 'Inverters and grid connection requirements',
    description: 'Power inverter technology and grid connection standards for renewable systems',
    icon: Plug,
    href: '../level3-module2-section3-5',
  },
];

const Level3Module2Section3 = () => {
  useSEO(
    'Section 3: Renewable Energy Systems - Level 3 Module 2',
    'Solar, wind and other renewable energy technologies and their applications'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={3}
      title="Renewable energy systems"
      description="Solar, wind and other renewable energy technologies and their applications."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module2-section2"
      prevSectionLabel="Energy efficiency in electrical installations"
      nextSectionHref="../level3-module2-section4"
      nextSectionLabel="Low carbon technologies"
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

export default Level3Module2Section3;
