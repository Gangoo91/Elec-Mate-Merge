import { Magnet, Waves, RotateCcw, Zap, Filter, Radio, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Principles of inductance and capacitance',
    description: 'Fundamental concepts of energy storage in magnetic and electric fields',
    icon: Magnet,
    href: '../h-n-c-module3-section2-1',
  },
  {
    number: '2.2',
    title: 'Reactance and impedance in AC circuits',
    description:
      'Calculating inductive and capacitive reactance, complex impedance in AC systems',
    icon: Waves,
    href: '../h-n-c-module3-section2-2',
  },
  {
    number: '2.3',
    title: 'Phase angle and phasor diagrams',
    description:
      'Vector representation of AC quantities and phase relationships between voltage and current',
    icon: RotateCcw,
    href: '../h-n-c-module3-section2-3',
  },
  {
    number: '2.4',
    title: 'Power factor – causes and effects on systems',
    description:
      'Understanding power factor impact on electrical efficiency and system performance',
    icon: Zap,
    href: '../h-n-c-module3-section2-4',
  },
  {
    number: '2.5',
    title: 'Power factor correction methods (capacitors, active filters)',
    description:
      'Techniques for improving power factor using capacitor banks and electronic correction systems',
    icon: Filter,
    href: '../h-n-c-module3-section2-5',
  },
  {
    number: '2.6',
    title: 'Resonance in RLC circuits and practical issues',
    description:
      'Series and parallel resonance phenomena and their effects in electrical installations',
    icon: Radio,
    href: '../h-n-c-module3-section2-6',
  },
  {
    number: '2.7',
    title: 'Applications in lighting, HVAC and motors',
    description:
      'Practical application of reactive component principles in building services equipment',
    icon: Settings,
    href: '../h-n-c-module3-section2-7',
  },
];

const HNCModule3Section2 = () => {
  useSEO(
    'Inductance, capacitance and power factor - HNC Module 3 Section 2',
    'Understanding reactive components, impedance, power factor correction and resonance in AC electrical systems'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={2}
      title="Inductance, capacitance and power factor"
      description="Master reactive component behaviour and power factor management in AC electrical systems."
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

export default HNCModule3Section2;
