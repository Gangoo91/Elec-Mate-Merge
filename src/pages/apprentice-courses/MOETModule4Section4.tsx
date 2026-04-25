import { Shield, Wrench, Cable, Package, Power } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '4.4.1',
      title: 'Safe isolation and verification',
      description: 'Proper isolation procedures and verification of safe working conditions',
      icon: Shield,
      href: '/study-centre/apprentice/m-o-e-t-module4-section4-1',
    },
    {
      number: '4.4.2',
      title: 'Component removal and replacement',
      description: 'Techniques for safely removing and replacing electrical components',
      icon: Wrench,
      href: '/study-centre/apprentice/m-o-e-t-module4-section4-2',
    },
    {
      number: '4.4.3',
      title: 'Cable jointing and termination',
      description: 'Proper cable jointing techniques and termination procedures',
      icon: Cable,
      href: '/study-centre/apprentice/m-o-e-t-module4-section4-3',
    },
    {
      number: '4.4.4',
      title: 'Use of approved spare parts',
      description: 'Selection and use of appropriate spare parts and materials',
      icon: Package,
      href: '/study-centre/apprentice/m-o-e-t-module4-section4-4',
    },
    {
      number: '4.4.5',
      title: 'Recommissioning procedures',
      description: 'Testing and commissioning procedures after repair work',
      icon: Power,
      href: '/study-centre/apprentice/m-o-e-t-module4-section4-5',
    },
  ];


const MOETModule4Section4 = () => {
  useSEO(
    'Section 4.4: Repair and Replacement Procedures - MOET Module 4',
    'Safe isolation, component replacement, cable jointing, spare parts and recommissioning'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module4"
      backLabel="Module 4"
      moduleNumber={4}
      sectionNumber={4}
      title="Repair and replacement procedures"
      description="Safe isolation, component replacement, cable jointing, spare parts and recommissioning."
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

export default MOETModule4Section4;
