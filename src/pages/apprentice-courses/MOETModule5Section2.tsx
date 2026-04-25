import { Cpu, Cable, Grid, Clock, Monitor, Wrench } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '5.2.1',
      title: 'PLC hardware and architecture',
      description: 'CPU modules, memory types, power supplies and system architecture',
      icon: Cpu,
      href: '/study-centre/apprentice/m-o-e-t-module5-section2-1',
    },
    {
      number: '5.2.2',
      title: 'Input/output devices',
      description: 'Digital and analogue I/O modules, wiring and interfacing',
      icon: Cable,
      href: '/study-centre/apprentice/m-o-e-t-module5-section2-2',
    },
    {
      number: '5.2.3',
      title: 'Ladder logic basics',
      description: 'Relay logic concepts, contacts, coils and basic programming elements',
      icon: Grid,
      href: '/study-centre/apprentice/m-o-e-t-module5-section2-3',
    },
    {
      number: '5.2.4',
      title: 'Timers, counters and sequencing',
      description: 'Programming timers, counters and sequential control operations',
      icon: Clock,
      href: '/study-centre/apprentice/m-o-e-t-module5-section2-4',
    },
    {
      number: '5.2.5',
      title: 'PLC programming software (overview)',
      description: 'Software packages, development environments and programming methods',
      icon: Monitor,
      href: '/study-centre/apprentice/m-o-e-t-module5-section2-5',
    },
    {
      number: '5.2.6',
      title: 'Troubleshooting PLC systems',
      description: 'Diagnostic tools, fault finding and system maintenance',
      icon: Wrench,
      href: '/study-centre/apprentice/m-o-e-t-module5-section2-6',
    },
  ];


const MOETModule5Section2 = () => {
  useSEO(
    'Section 5.2: PLCs and Control Systems - MOET Module 5',
    'PLC hardware, I/O devices, ladder logic, programming software and troubleshooting'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={2}
      title="PLCs and control systems"
      description="PLC hardware, I/O devices, ladder logic, programming software and troubleshooting."
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

export default MOETModule5Section2;
