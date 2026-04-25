import { Calculator, Zap, GitBranch, Shuffle, Activity, Target, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Voltage, current, resistance and power',
    description:
      'Fundamental electrical quantities, SI units, and power calculations applied to building services loads',
    icon: Zap,
    href: '../h-n-c-module3-section1-1',
  },
  {
    number: '1.2',
    title: "Ohm's law",
    description:
      'V = IR relationships, linear and non-linear resistors, cable sizing and voltage drop calculations',
    icon: Calculator,
    href: '../h-n-c-module3-section1-2',
  },
  {
    number: '1.3',
    title: 'Series circuits',
    description:
      'Series resistance, voltage dividers, and applications in emergency lighting and control circuits',
    icon: GitBranch,
    href: '../h-n-c-module3-section1-3',
  },
  {
    number: '1.4',
    title: 'Parallel circuits',
    description:
      'Parallel resistance, current division, lighting circuits and distribution board analysis',
    icon: Shuffle,
    href: '../h-n-c-module3-section1-4',
  },
  {
    number: '1.5',
    title: "Kirchhoff's laws",
    description:
      'KCL and KVL for complex circuit analysis, distribution boards and fault current paths',
    icon: Target,
    href: '../h-n-c-module3-section1-5',
  },
  {
    number: '1.6',
    title: 'Network theorems',
    description:
      'Superposition, Thevenin and Norton equivalents for multi-source building power systems',
    icon: Activity,
    href: '../h-n-c-module3-section1-6',
  },
  {
    number: '1.7',
    title: 'Building services applications',
    description:
      'Practical DC circuit analysis for emergency systems, BMS controls and standby power',
    icon: Settings,
    href: '../h-n-c-module3-section1-7',
  },
];

const HNCModule3Section1 = () => {
  useSEO(
    'DC circuit theory - HNC Module 3 Section 1 | Electrical Engineering',
    "Master DC circuit analysis: Ohm's Law, Kirchhoff's Laws, series/parallel circuits, network theorems. Applied to building services electrical systems."
  );

  return (
    <SectionShell
      backTo="../h-n-c-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={1}
      title="DC circuit theory"
      description="Apply understanding of fundamental electrical quantities to evaluate circuits with constant voltages and currents."
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

export default HNCModule3Section1;
