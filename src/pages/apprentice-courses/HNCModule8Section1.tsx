import { Flame, ThermometerSun, Waves, Gauge, Radio, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '1.1',
    title: 'Boiler systems',
    description:
      'Boiler types, efficiency ratings, cascade systems, flue requirements and safety controls',
    icon: Flame,
    href: '../h-n-c-module8-section1-1',
  },
  {
    number: '1.2',
    title: 'Heat pump integration',
    description:
      'Heat pump principles, system integration, buffer vessels, flow temperatures and hybrid systems',
    icon: ThermometerSun,
    href: '../h-n-c-module8-section1-2',
  },
  {
    number: '1.3',
    title: 'Underfloor heating',
    description:
      'UFH design, manifold systems, pipe layouts, zone control and screed requirements',
    icon: Waves,
    href: '../h-n-c-module8-section1-3',
  },
  {
    number: '1.4',
    title: 'Radiator systems',
    description: 'Radiator sizing, pipe sizing, balancing, TRVs and system hydraulics',
    icon: Gauge,
    href: '../h-n-c-module8-section1-4',
  },
  {
    number: '1.5',
    title: 'Heating controls',
    description:
      'Compensated control, optimum start, zone control, BMS integration and energy efficiency',
    icon: Radio,
    href: '../h-n-c-module8-section1-5',
  },
  {
    number: '1.6',
    title: 'System commissioning',
    description:
      'Flushing, filling, pressurising, balancing, performance testing and handover documentation',
    icon: Settings,
    href: '../h-n-c-module8-section1-6',
  },
];

const HNCModule8Section1 = () => {
  useSEO(
    'Heating systems - HNC Module 8 Section 1 | HVAC Systems',
    'Master heating systems: boiler systems, heat pump integration, underfloor heating, radiator circuits and heating controls for building services.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module8"
      backLabel="Module 8"
      moduleNumber={8}
      sectionNumber={1}
      title="Heating systems"
      description="Understand heating system design and the electrical services that support modern heating installations."
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

export default HNCModule8Section1;
