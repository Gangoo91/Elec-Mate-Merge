import { Shield, Battery, Zap, RefreshCw, BarChart3 } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '3.5.1',
      title: 'Uninterruptible power supply (UPS)',
      description: 'UPS types, operation principles and system configurations',
      icon: Shield,
      href: '/study-centre/apprentice/m-o-e-t-module3-section5-1',
    },
    {
      number: '3.5.2',
      title: 'Battery technologies and maintenance',
      description: 'Battery types, characteristics and maintenance procedures',
      icon: Battery,
      href: '/study-centre/apprentice/m-o-e-t-module3-section5-2',
    },
    {
      number: '3.5.3',
      title: 'Emergency generators',
      description: 'Generator types, installation and maintenance requirements',
      icon: Zap,
      href: '/study-centre/apprentice/m-o-e-t-module3-section5-3',
    },
    {
      number: '3.5.4',
      title: 'Transfer switches and changeover systems',
      description: 'Automatic transfer switches and changeover procedures',
      icon: RefreshCw,
      href: '/study-centre/apprentice/m-o-e-t-module3-section5-4',
    },
    {
      number: '3.5.5',
      title: 'Critical load management',
      description: 'Load prioritisation and management during emergency conditions',
      icon: BarChart3,
      href: '/study-centre/apprentice/m-o-e-t-module3-section5-5',
    },
  ];


const MOETModule3Section5 = () => {
  useSEO(
    'Auxiliary Systems (UPS, Batteries, Emergency Supplies) - MOET Module 3',
    'UPS systems, battery technologies, generators and critical load management'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module3"
      backLabel="Module 3"
      moduleNumber={3}
      sectionNumber={5}
      title="Auxiliary systems (UPS, batteries, emergency supplies)"
      description="UPS systems, battery technologies, generators and critical load management."
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

export default MOETModule3Section5;
