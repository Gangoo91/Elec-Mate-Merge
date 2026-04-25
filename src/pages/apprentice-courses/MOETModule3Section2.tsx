import { Cog, Play, RotateCw, Settings, Wrench } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '3.2.1',
      title: 'Motor construction and operation',
      description: 'Motor types, construction principles and operating characteristics',
      icon: Cog,
      href: '/study-centre/apprentice/m-o-e-t-module3-section2-1',
    },
    {
      number: '3.2.2',
      title: 'Direct-on-line (DOL) starters',
      description: 'DOL starter operation, components and applications',
      icon: Play,
      href: '/study-centre/apprentice/m-o-e-t-module3-section2-2',
    },
    {
      number: '3.2.3',
      title: 'Star/delta starters',
      description: 'Star-delta starting principles, wiring and operation',
      icon: RotateCw,
      href: '/study-centre/apprentice/m-o-e-t-module3-section2-3',
    },
    {
      number: '3.2.4',
      title: 'Variable speed drives (VSDs) and soft starters',
      description: 'VSD technology, soft starters and speed control methods',
      icon: Settings,
      href: '/study-centre/apprentice/m-o-e-t-module3-section2-4',
    },
    {
      number: '3.2.5',
      title: 'Motor maintenance and testing',
      description: 'Preventive maintenance, testing procedures and fault diagnosis',
      icon: Wrench,
      href: '/study-centre/apprentice/m-o-e-t-module3-section2-5',
    },
  ];


const MOETModule3Section2 = () => {
  useSEO(
    'Motors, Drives and Starters - MOET Module 3',
    'Motor operation, DOL/star-delta starters, VSDs and motor maintenance'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={2}
      title="Motors, drives and starters"
      description="Motor operation, DOL/star-delta starters, VSDs and motor maintenance."
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

export default MOETModule3Section2;
