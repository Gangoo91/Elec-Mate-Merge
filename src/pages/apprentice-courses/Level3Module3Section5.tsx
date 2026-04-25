import { Calculator, TrendingDown, Zap, Leaf } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'Power equations',
    description: 'Understanding P = VI, P = I²R, P = V²/R and their practical applications',
    icon: Calculator,
    href: '../level3-module3-section5-1',
  },
  {
    number: '5.2',
    title: 'Efficiency and losses',
    description:
      'Calculating efficiency in electrical circuits and understanding different types of losses',
    icon: TrendingDown,
    href: '../level3-module3-section5-2',
  },
  {
    number: '5.3',
    title: 'Energy consumption and kWh',
    description: 'Energy calculations, kilowatt-hours and practical energy consumption analysis',
    icon: Zap,
    href: '../level3-module3-section5-3',
  },
  {
    number: '5.4',
    title: 'Energy efficiency in installations',
    description:
      'Improving energy efficiency in electrical installations and sustainable practices',
    icon: Leaf,
    href: '../level3-module3-section5-4',
  },
];

const Level3Module3Section5 = () => {
  useSEO(
    'Section 5: Electrical Power and Energy - Level 3 Module 3',
    'Power equations, efficiency, energy consumption and efficiency in installations'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={5}
      title="Electrical power and energy"
      description="Power equations, efficiency and energy consumption in installations."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module3-section4"
      prevSectionLabel="AC theory and waveforms"
      nextSectionHref="../level3-module3-section6"
      nextSectionLabel="Cables and conductors"
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

export default Level3Module3Section5;
