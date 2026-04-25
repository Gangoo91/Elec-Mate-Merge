import { Gauge, TrendingDown, Thermometer, Zap, Cable, Wrench } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Current-carrying capacity',
    description:
      'BS 7671 tables, installation methods, correction factors and tabulated current ratings',
    icon: Gauge,
    href: '../h-n-c-module4-section2-1',
  },
  {
    number: '2.2',
    title: 'Voltage drop calculations',
    description:
      'Permissible limits, mV/A/m method, three-phase calculations and long cable runs',
    icon: TrendingDown,
    href: '../h-n-c-module4-section2-2',
  },
  {
    number: '2.3',
    title: 'Thermal constraints',
    description:
      'Ambient temperature derating, grouping factors, insulation types and thermal resistivity',
    icon: Thermometer,
    href: '../h-n-c-module4-section2-3',
  },
  {
    number: '2.4',
    title: 'Short-circuit withstand',
    description:
      'Adiabatic equation, let-through energy (I²t), fault duration and conductor thermal limits',
    icon: Zap,
    href: '../h-n-c-module4-section2-4',
  },
  {
    number: '2.5',
    title: 'Cable types and selection',
    description:
      'XLPE, LSF, SWA, FP cables, armoured cables and specification for different applications',
    icon: Cable,
    href: '../h-n-c-module4-section2-5',
  },
  {
    number: '2.6',
    title: 'Cable installation methods',
    description:
      'Containment systems, cable supports, bending radii, segregation and routing considerations',
    icon: Wrench,
    href: '../h-n-c-module4-section2-6',
  },
];

const HNCModule4Section2 = () => {
  useSEO(
    'Cable selection and sizing - HNC Module 4 Section 2 | Building Services Design',
    'Master cable selection and sizing: current-carrying capacity, voltage drop calculations, thermal constraints, short-circuit withstand and installation methods.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={2}
      title="Cable selection and sizing"
      description="Select and size cables correctly to ensure safe operation, compliance with BS 7671 and optimal system performance."
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

export default HNCModule4Section2;
