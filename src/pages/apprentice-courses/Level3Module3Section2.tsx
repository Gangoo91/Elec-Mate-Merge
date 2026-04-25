import { Zap, Cpu, CircuitBoard, Waves, TrendingUp, Radio } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Pure resistance circuits',
    description:
      'Resistive circuits in AC and DC applications, power dissipation and heating effects',
    icon: Zap,
    href: '../level3-module3-section2-1',
  },
  {
    number: '2.2',
    title: 'Pure inductance circuits',
    description: 'Inductive reactance, energy storage in magnetic fields and phase relationships',
    icon: Cpu,
    href: '../level3-module3-section2-2',
  },
  {
    number: '2.3',
    title: 'Pure capacitance circuits',
    description: 'Capacitive reactance, energy storage in electric fields and charging/discharging',
    icon: CircuitBoard,
    href: '../level3-module3-section2-3',
  },
  {
    number: '2.4',
    title: 'RL, RC and RLC combinations',
    description: 'Series and parallel combinations of resistance, inductance and capacitance',
    icon: Waves,
    href: '../level3-module3-section2-4',
  },
  {
    number: '2.5',
    title: 'Phase angle and power factor',
    description: 'Understanding phase relationships and power factor in reactive circuits',
    icon: TrendingUp,
    href: '../level3-module3-section2-5',
  },
  {
    number: '2.6',
    title: 'Resonance in AC circuits',
    description: 'Series and parallel resonance, frequency response and practical applications',
    icon: Radio,
    href: '../level3-module3-section2-6',
  },
];

const Level3Module3Section2 = () => {
  useSEO(
    'Section 2: Resistive, Inductive and Capacitive Circuits - Level 3 Module 3',
    'Pure circuits, combinations, phase angle, power factor and resonance'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={2}
      title="Resistive, inductive and capacitive circuits"
      description="Pure circuits, combinations, phase angle, power factor and resonance."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module3-section1"
      prevSectionLabel="Electrical units and measurements"
      nextSectionHref="../level3-module3-section3"
      nextSectionLabel="Electromagnetic principles"
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

export default Level3Module3Section2;
