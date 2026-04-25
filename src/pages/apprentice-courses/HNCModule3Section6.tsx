import { Zap, TrendingDown, BarChart3, Lightbulb, Cpu, FileText, Leaf } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'Electrical losses (I²R, eddy current, hysteresis)',
    description:
      'Understanding different types of electrical losses and their impact on system efficiency',
    icon: Zap,
    href: '../h-n-c-module3-section6-1',
  },
  {
    number: '6.2',
    title: 'Efficiency calculations for equipment and systems',
    description:
      'Methods for calculating and measuring electrical equipment and system efficiency',
    icon: TrendingDown,
    href: '../h-n-c-module3-section6-2',
  },
  {
    number: '6.3',
    title: 'Load management and demand reduction',
    description:
      'Strategies for optimising electrical loads and reducing peak demand in buildings',
    icon: BarChart3,
    href: '../h-n-c-module3-section6-3',
  },
  {
    number: '6.4',
    title: 'Energy-efficient motor and lighting design',
    description:
      'Selection and design of high-efficiency motors and lighting systems for buildings',
    icon: Lightbulb,
    href: '../h-n-c-module3-section6-4',
  },
  {
    number: '6.5',
    title: 'Smart controls and building automation',
    description: 'Intelligent control systems for optimising energy use in building services',
    icon: Cpu,
    href: '../h-n-c-module3-section6-5',
  },
  {
    number: '6.6',
    title: 'BS 7671, CIBSE and Part L requirements for energy efficiency',
    description:
      'Regulatory frameworks and standards governing energy efficiency in electrical installations',
    icon: FileText,
    href: '../h-n-c-module3-section6-6',
  },
  {
    number: '6.7',
    title: 'Integration with renewables and storage systems',
    description:
      'Incorporating renewable energy sources and energy storage into building electrical systems',
    icon: Leaf,
    href: '../h-n-c-module3-section6-7',
  },
];

const HNCModule3Section6 = () => {
  useSEO(
    'Energy efficiency in electrical systems - HNC Module 3 Section 6',
    'Understanding energy efficiency principles, loss reduction, smart controls and renewable integration in building electrical systems'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={6}
      title="Energy efficiency in electrical systems"
      description="Master energy efficiency principles, smart technologies and sustainable practices for modern building electrical systems."
      tone="purple"
      subsectionsCount={subsections.length}
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

export default HNCModule3Section6;
