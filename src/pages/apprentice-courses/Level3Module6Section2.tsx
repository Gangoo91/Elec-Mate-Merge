import { Zap, Cable, Target, Shield, Calculator, Thermometer } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Determining design current (Ib, In, Iz)',
    description: 'Calculating design current, nominal current and current-carrying capacity',
    icon: Zap,
    href: '../level3-module6-section2-1',
  },
  {
    number: '2.2',
    title: 'Cable sizing and voltage drop calculations',
    description: 'Selecting appropriate cable sizes and calculating voltage drop in circuits',
    icon: Cable,
    href: '../level3-module6-section2-2',
  },
  {
    number: '2.3',
    title: 'Earth fault loop impedance and disconnection times',
    description: 'Calculating earth fault loop impedance and verifying disconnection times',
    icon: Target,
    href: '../level3-module6-section2-3',
  },
  {
    number: '2.4',
    title: 'RCD and RCBO requirements in design',
    description: 'Determining RCD and RCBO requirements and incorporating them into designs',
    icon: Shield,
    href: '../level3-module6-section2-4',
  },
  {
    number: '2.5',
    title: 'Diversity and demand calculations',
    description: 'Applying diversity factors and calculating electrical demand for installations',
    icon: Calculator,
    href: '../level3-module6-section2-5',
  },
  {
    number: '2.6',
    title: 'Thermal effects and grouping factors',
    description: 'Understanding thermal effects and applying appropriate grouping factors',
    icon: Thermometer,
    href: '../level3-module6-section2-6',
  },
];

const Level3Module6Section2 = () => {
  useSEO(
    'Section 2: Circuit Design Calculations - Level 3 Module 6',
    'Essential calculations for circuit design including current ratings, cable sizing and protection'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={2}
      title="Circuit design calculations"
      description="Current ratings, cable sizing, voltage drop and protection calculations."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module6-section1"
      prevSectionLabel="Design principles and requirements"
      nextSectionHref="../level3-module6-section3"
      nextSectionLabel="Selection of protective devices and equipment"
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

export default Level3Module6Section2;
