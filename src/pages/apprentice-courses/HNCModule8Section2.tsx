import { Wind, Box, Fan, RefreshCcw, Thermometer, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Ventilation principles',
    description:
      'Air change rates, fresh air requirements, contaminant control and ventilation standards',
    icon: Wind,
    href: '../h-n-c-module8-section2-1',
  },
  {
    number: '2.2',
    title: 'Air handling units',
    description:
      'AHU components, configurations, coil selection, filtration and acoustic considerations',
    icon: Box,
    href: '../h-n-c-module8-section2-2',
  },
  {
    number: '2.3',
    title: 'Fan selection',
    description:
      'Fan types, characteristics, system curves, duty point selection and efficiency considerations',
    icon: Fan,
    href: '../h-n-c-module8-section2-3',
  },
  {
    number: '2.4',
    title: 'Heat recovery systems',
    description:
      'Plate heat exchangers, thermal wheels, run-around coils, efficiency and control strategies',
    icon: RefreshCcw,
    href: '../h-n-c-module8-section2-4',
  },
  {
    number: '2.5',
    title: 'Ductwork design',
    description:
      'Sizing methods, pressure drop, materials, acoustic attenuation and fire dampers',
    icon: Thermometer,
    href: '../h-n-c-module8-section2-5',
  },
  {
    number: '2.6',
    title: 'System balancing',
    description:
      'Air balancing procedures, commissioning, performance verification and documentation',
    icon: Settings,
    href: '../h-n-c-module8-section2-6',
  },
];

const HNCModule8Section2 = () => {
  useSEO(
    'Ventilation systems - HNC Module 8 Section 2 | HVAC Systems',
    'Master ventilation systems: supply and extract, heat recovery, ductwork design, air handling units and fan selection for building services.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module8"
      backLabel="Module 8"
      moduleNumber={8}
      sectionNumber={2}
      title="Ventilation systems"
      description="Design and specify ventilation systems with appropriate electrical services support."
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

export default HNCModule8Section2;
