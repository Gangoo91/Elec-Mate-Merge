import { Calculator, Ruler, Gauge, Target, Scale } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: "Ohm's law and power equations",
    description:
      'Understanding the relationship between voltage, current, resistance and power calculations',
    icon: Calculator,
    href: '../level3-module3-section1-1',
  },
  {
    number: '1.2',
    title: 'Electrical quantities and units',
    description: 'Voltage, current, resistance, power and energy — their units and relationships',
    icon: Ruler,
    href: '../level3-module3-section1-2',
  },
  {
    number: '1.3',
    title: 'Measurement instruments',
    description: 'Multimeters, clamp meters, insulation testers and their proper applications',
    icon: Gauge,
    href: '../level3-module3-section1-3',
  },
  {
    number: '1.4',
    title: 'Accuracy, tolerances and errors',
    description: 'Understanding measurement accuracy, instrument tolerances and sources of error',
    icon: Target,
    href: '../level3-module3-section1-4',
  },
  {
    number: '1.5',
    title: 'SI units and conversions',
    description: 'International System of Units and converting between different electrical units',
    icon: Scale,
    href: '../level3-module3-section1-5',
  },
];

const Level3Module3Section1 = () => {
  useSEO(
    'Section 1: Electrical Units and Measurements - Level 3 Module 3',
    "Ohm's law, electrical quantities, measurement instruments, accuracy and SI units"
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={1}
      title="Electrical units and measurements"
      description="Ohm's law, electrical quantities, measurement instruments, accuracy and SI units."
      tone="blue"
      subsectionsCount={subsections.length}
      nextSectionHref="../level3-module3-section2"
      nextSectionLabel="Resistive, inductive and capacitive circuits"
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

export default Level3Module3Section1;
