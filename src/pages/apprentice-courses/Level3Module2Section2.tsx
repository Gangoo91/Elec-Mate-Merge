import { Lightbulb, Zap, Power, Settings, BarChart3 } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Energy-efficient lighting (LED, controls, sensors)',
    description:
      'LED technology, lighting controls and automatic sensor systems for energy savings',
    icon: Lightbulb,
    href: '../level3-module2-section2-1',
  },
  {
    number: '2.2',
    title: 'Power factor correction',
    description: 'Understanding and implementing power factor correction for improved efficiency',
    icon: Zap,
    href: '../level3-module2-section2-2',
  },
  {
    number: '2.3',
    title: 'Reducing standby consumption (smart devices, timers)',
    description: 'Minimising standby power consumption through smart devices and timer controls',
    icon: Power,
    href: '../level3-module2-section2-3',
  },
  {
    number: '2.4',
    title: 'Load management and diversity in design',
    description: 'Optimising electrical load distribution and applying diversity factors in design',
    icon: Settings,
    href: '../level3-module2-section2-4',
  },
  {
    number: '2.5',
    title: 'Smart meters and monitoring systems',
    description: 'Smart metering technology and energy monitoring systems for consumption tracking',
    icon: BarChart3,
    href: '../level3-module2-section2-5',
  },
];

const Level3Module2Section2 = () => {
  useSEO(
    'Section 2: Energy Efficiency in Electrical Installations - Level 3 Module 2',
    'Techniques and technologies for improving energy efficiency in electrical systems'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={2}
      title="Energy efficiency in electrical installations"
      description="Techniques and technologies for improving energy efficiency in electrical systems."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module2-section1"
      prevSectionLabel="Environmental legislation and standards"
      nextSectionHref="../level3-module2-section3"
      nextSectionLabel="Renewable energy systems"
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

export default Level3Module2Section2;
