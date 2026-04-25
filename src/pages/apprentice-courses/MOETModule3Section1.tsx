import { Zap, AlertTriangle, CircuitBoard, Cable, Power, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '3.1.1',
      title: 'Low voltage switchgear (MCBs, MCCBs)',
      description: 'LV switchgear types, operation and selection criteria',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module3-section1-1',
    },
    {
      number: '3.1.2',
      title: 'High voltage switchgear (overview for awareness)',
      description: 'HV switchgear principles and safety considerations',
      icon: AlertTriangle,
      href: '/study-centre/apprentice/m-o-e-t-module3-section1-2',
    },
    {
      number: '3.1.3',
      title: 'Distribution boards and consumer units',
      description: 'Design, installation and maintenance of distribution equipment',
      icon: CircuitBoard,
      href: '/study-centre/apprentice/m-o-e-t-module3-section1-3',
    },
    {
      number: '3.1.4',
      title: 'Busbars and cabling systems',
      description: 'Busbar systems, cable routing and installation methods',
      icon: Cable,
      href: '/study-centre/apprentice/m-o-e-t-module3-section1-4',
    },
    {
      number: '3.1.5',
      title: 'Isolation and switching devices',
      description: 'Isolator types, operation and switching procedures',
      icon: Power,
      href: '/study-centre/apprentice/m-o-e-t-module3-section1-5',
    },
    {
      number: '3.1.6',
      title: 'Protection coordination (discrimination, selectivity)',
      description: 'Coordinating protective devices for selective operation',
      icon: Shield,
      href: '/study-centre/apprentice/m-o-e-t-module3-section1-6',
    },
  ];


const MOETModule3Section1 = () => {
  useSEO(
    'Switchgear and Distribution Systems - MOET Module 3',
    'LV/HV switchgear, distribution boards, busbars, isolation and protection coordination'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={1}
      title="Switchgear and distribution systems"
      description="LV/HV switchgear, distribution boards, busbars, isolation and protection coordination."
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

export default MOETModule3Section1;
