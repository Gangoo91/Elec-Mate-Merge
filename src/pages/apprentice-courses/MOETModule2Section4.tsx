import { Zap, Shield, AlertTriangle, Activity, Link2, Bolt } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '2.4.1',
      title: 'Fuses and circuit breakers',
      description: 'Overcurrent protection devices, selection and operation',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module2-section4-1',
    },
    {
      number: '2.4.2',
      title: 'RCDs and RCBOs',
      description: 'Residual current devices and combined protection units',
      icon: Shield,
      href: '/study-centre/apprentice/m-o-e-t-module2-section4-2',
    },
    {
      number: '2.4.3',
      title: 'Overcurrent and short-circuit protection',
      description: 'Protection coordination and fault current calculations',
      icon: AlertTriangle,
      href: '/study-centre/apprentice/m-o-e-t-module2-section4-3',
    },
    {
      number: '2.4.4',
      title: 'Earthing systems (TN, TT, IT)',
      description: 'Types of earthing arrangements and their applications',
      icon: Activity,
      href: '/study-centre/apprentice/m-o-e-t-module2-section4-4',
    },
    {
      number: '2.4.5',
      title: 'Bonding requirements',
      description: 'Equipotential bonding principles and implementation',
      icon: Link2,
      href: '/study-centre/apprentice/m-o-e-t-module2-section4-5',
    },
    {
      number: '2.4.6',
      title: 'Surge protection devices',
      description: 'Lightning and surge protection systems',
      icon: Bolt,
      href: '/study-centre/apprentice/m-o-e-t-module2-section4-6',
    },
  ];


const MOETModule2Section4 = () => {
  useSEO(
    'Circuit Protection and Earthing - MOET Module 2',
    'Fuses, breakers, RCDs, earthing systems, bonding and surge protection'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module2"
      backLabel="Module 2"
      moduleNumber={2}
      sectionNumber={4}
      title="Circuit protection and earthing"
      description="Fuses, breakers, RCDs, earthing systems, bonding and surge protection."
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

export default MOETModule2Section4;
