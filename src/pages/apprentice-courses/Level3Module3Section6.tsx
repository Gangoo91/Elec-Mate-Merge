import { Cable, Zap, Thermometer, Shield, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '6.1',
    title: 'Conductor materials and properties',
    description: 'Copper, aluminium and other conductor materials — properties and applications',
    icon: Cable,
    href: '../level3-module3-section6-1',
  },
  {
    number: '6.2',
    title: 'Resistance and voltage drop',
    description: 'Calculating conductor resistance and voltage drop in electrical circuits',
    icon: Zap,
    href: '../level3-module3-section6-2',
  },
  {
    number: '6.3',
    title: 'Current-carrying capacity',
    description: 'Factors affecting cable current ratings and derating calculations',
    icon: Settings,
    href: '../level3-module3-section6-3',
  },
  {
    number: '6.4',
    title: 'Thermal effects on cables',
    description: 'Temperature effects on cable performance and thermal protection',
    icon: Thermometer,
    href: '../level3-module3-section6-4',
  },
  {
    number: '6.5',
    title: 'Insulation types and environmental effects',
    description: 'Cable insulation materials, environmental conditions and protection methods',
    icon: Shield,
    href: '../level3-module3-section6-5',
  },
];

const Level3Module3Section6 = () => {
  useSEO(
    'Section 6: Cables and Conductors - Level 3 Module 3',
    'Conductor materials, resistance, current-carrying capacity and thermal effects'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/level3-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={6}
      title="Cables and conductors"
      description="Conductor materials, resistance, current-carrying capacity and thermal effects."
      tone="blue"
      subsectionsCount={subsections.length}
      prevSectionHref="../level3-module3-section5"
      prevSectionLabel="Electrical power and energy"
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

export default Level3Module3Section6;
