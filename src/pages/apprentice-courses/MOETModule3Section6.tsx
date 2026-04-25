import { Sun, Wind, Battery, Zap, Car } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '3.6.1',
      title: 'Solar PV integration',
      description: 'Solar photovoltaic systems, installation and grid connection',
      icon: Sun,
      href: '/study-centre/apprentice/m-o-e-t-module3-section6-1',
    },
    {
      number: '3.6.2',
      title: 'Wind and other renewables (overview)',
      description: 'Wind power, hydro and other renewable energy technologies',
      icon: Wind,
      href: '/study-centre/apprentice/m-o-e-t-module3-section6-2',
    },
    {
      number: '3.6.3',
      title: 'Energy storage systems',
      description: 'Battery storage, grid-scale storage and integration methods',
      icon: Battery,
      href: '/study-centre/apprentice/m-o-e-t-module3-section6-3',
    },
    {
      number: '3.6.4',
      title: 'Smart grids and smart meters',
      description: 'Smart grid technology, smart metering and demand management',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module3-section6-4',
    },
    {
      number: '3.6.5',
      title: 'Electric vehicle charging infrastructure',
      description: 'EV charging systems, installation and grid integration',
      icon: Car,
      href: '/study-centre/apprentice/m-o-e-t-module3-section6-5',
    },
  ];


const MOETModule3Section6 = () => {
  useSEO(
    'Emerging Technologies (Renewables, Smart Systems) - MOET Module 3',
    'Solar PV, renewables, energy storage, smart grids and EV charging'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={6}
      title="Emerging technologies (renewables, smart systems)"
      description="Solar PV, renewables, energy storage, smart grids and EV charging."
      tone="orange"
      subsectionsCount={subsections.length}
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
};

export default MOETModule3Section6;
