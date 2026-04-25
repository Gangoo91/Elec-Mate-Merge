import { Droplets, Waves, Gauge, PipetteIcon, Activity, TrendingUp } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Fluid properties and pressure',
    description: "Density, viscosity, pressure types, Pascal's law",
    icon: Droplets,
    href: '../h-n-c-module2-section2-1',
  },
  {
    number: '2.2',
    title: 'Flow characteristics',
    description: 'Laminar and turbulent flow, Reynolds number, flow patterns',
    icon: Waves,
    href: '../h-n-c-module2-section2-2',
  },
  {
    number: '2.3',
    title: "Bernoulli's equation",
    description: 'Energy conservation, pressure-velocity relationship, applications',
    icon: Gauge,
    href: '../h-n-c-module2-section2-3',
  },
  {
    number: '2.4',
    title: 'Pipe sizing and pressure drop',
    description: 'Darcy-Weisbach equation, friction factors, fitting losses',
    icon: PipetteIcon,
    href: '../h-n-c-module2-section2-4',
  },
  {
    number: '2.5',
    title: 'Pump characteristics',
    description: 'Pump curves, types, efficiency, NPSH requirements',
    icon: Activity,
    href: '../h-n-c-module2-section2-5',
  },
  {
    number: '2.6',
    title: 'System curves and operating points',
    description: 'System resistance, pump selection, parallel/series operation',
    icon: TrendingUp,
    href: '../h-n-c-module2-section2-6',
  },
];

const HNCModule2Section2 = () => {
  useSEO(
    'Fluid mechanics and hydraulics - HNC Module 2 Section 2 | Building Services Engineering',
    "Master fluid mechanics: properties, flow characteristics, Bernoulli's equation, pipe sizing, pump curves and system operating points for building services."
  );

  return (
    <SectionShell
      backTo="../h-n-c-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={2}
      title="Fluid mechanics and hydraulics"
      description="Apply fluid mechanics principles to the design and analysis of pipework systems and pump selection."
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

export default HNCModule2Section2;
