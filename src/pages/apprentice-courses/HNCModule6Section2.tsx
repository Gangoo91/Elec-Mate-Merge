import { Sun, Flame, Wind, Zap, Battery, Network } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '2.1',
    title: 'Solar photovoltaic systems',
    description:
      'PV technology, system sizing, installation requirements, G98/G99 connection and performance monitoring',
    icon: Sun,
    href: '../h-n-c-module6-section2-1',
  },
  {
    number: '2.2',
    title: 'Heat pump technology',
    description:
      'ASHP and GSHP systems, COP and SCOP, system design, integration with heating systems and MCS requirements',
    icon: Flame,
    href: '../h-n-c-module6-section2-2',
  },
  {
    number: '2.3',
    title: 'Biomass systems',
    description:
      'Biomass boilers, fuel storage, handling systems, emissions control and integration with building services',
    icon: Wind,
    href: '../h-n-c-module6-section2-3',
  },
  {
    number: '2.4',
    title: 'Small-scale wind',
    description:
      'Building-mounted and standalone turbines, site assessment, planning considerations and grid connection',
    icon: Zap,
    href: '../h-n-c-module6-section2-4',
  },
  {
    number: '2.5',
    title: 'Battery storage systems',
    description:
      'Battery technologies, system sizing, charge controllers, safety requirements and grid services',
    icon: Battery,
    href: '../h-n-c-module6-section2-5',
  },
  {
    number: '2.6',
    title: 'CHP and district energy',
    description:
      'Combined heat and power, district heating networks, energy centres and system optimisation',
    icon: Network,
    href: '../h-n-c-module6-section2-6',
  },
];

const HNCModule6Section2 = () => {
  useSEO(
    'Renewable energy systems - HNC Module 6 Section 2 | Sustainability',
    'Master renewable technologies: solar PV, heat pumps, biomass, wind power, CHP systems and grid integration for building services applications.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module6"
      backLabel="Module 6"
      moduleNumber={6}
      sectionNumber={2}
      title="Renewable energy systems"
      description="Design and integrate renewable energy technologies into building services installations."
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

export default HNCModule6Section2;
