import { Snowflake, Droplets, Gauge, Network, ThermometerSnowflake, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '3.1',
    title: 'Refrigeration fundamentals',
    description:
      'Refrigeration cycle, refrigerants, compressor types, F-gas regulations and environmental impact',
    icon: Snowflake,
    href: '../h-n-c-module8-section3-1',
  },
  {
    number: '3.2',
    title: 'DX systems',
    description:
      'Split systems, multi-split, VRF/VRV technology, system design and electrical requirements',
    icon: Droplets,
    href: '../h-n-c-module8-section3-2',
  },
  {
    number: '3.3',
    title: 'Chilled water systems',
    description:
      'Chillers, cooling towers, primary/secondary pumping, pipe sizing and system hydraulics',
    icon: Gauge,
    href: '../h-n-c-module8-section3-3',
  },
  {
    number: '3.4',
    title: 'Terminal units',
    description:
      'Fan coil units, chilled beams, cassettes, unit selection and control strategies',
    icon: Network,
    href: '../h-n-c-module8-section3-4',
  },
  {
    number: '3.5',
    title: 'System selection',
    description:
      'Load calculations, system comparison, life cycle costs, sustainability and selection criteria',
    icon: ThermometerSnowflake,
    href: '../h-n-c-module8-section3-5',
  },
  {
    number: '3.6',
    title: 'Commissioning and testing',
    description:
      'Refrigerant charging, system testing, performance verification and handover requirements',
    icon: Settings,
    href: '../h-n-c-module8-section3-6',
  },
];

const HNCModule8Section3 = () => {
  useSEO(
    'Air conditioning systems - HNC Module 8 Section 3 | HVAC Systems',
    'Master air conditioning: DX systems, chilled water, VRF/VRV technology, refrigeration principles and system selection for building services.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module8"
      backLabel="Module 8"
      moduleNumber={8}
      sectionNumber={3}
      title="Air conditioning systems"
      description="Design and specify air conditioning systems with appropriate electrical services support."
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

export default HNCModule8Section3;
