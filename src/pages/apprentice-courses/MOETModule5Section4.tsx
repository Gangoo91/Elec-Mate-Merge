import { Settings, RotateCcw, Wind, Wrench, Grid3x3, Gauge } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '5.4.1',
      title: 'Principles of process control',
      description: 'Open and closed loop control, feedback systems and control strategies',
      icon: Settings,
      href: '/study-centre/apprentice/m-o-e-t-module5-section4-1',
    },
    {
      number: '5.4.2',
      title: 'PID control loops',
      description: 'Proportional, integral and derivative control principles and tuning',
      icon: RotateCcw,
      href: '/study-centre/apprentice/m-o-e-t-module5-section4-2',
    },
    {
      number: '5.4.3',
      title: 'Pneumatic and hydraulic controls (overview)',
      description: 'Pneumatic and hydraulic control systems and components',
      icon: Wind,
      href: '/study-centre/apprentice/m-o-e-t-module5-section4-3',
    },
    {
      number: '5.4.4',
      title: 'Control valves and actuators',
      description: 'Valve types, actuator selection and control applications',
      icon: Wrench,
      href: '/study-centre/apprentice/m-o-e-t-module5-section4-4',
    },
    {
      number: '5.4.5',
      title: 'Distributed control systems (DCS) (overview)',
      description: 'DCS architecture, components and industrial applications',
      icon: Grid3x3,
      href: '/study-centre/apprentice/m-o-e-t-module5-section4-5',
    },
    {
      number: '5.4.6',
      title: 'Calibration of process instruments',
      description: 'Instrument calibration procedures and standards compliance',
      icon: Gauge,
      href: '/study-centre/apprentice/m-o-e-t-module5-section4-6',
    },
  ];


const MOETModule5Section4 = () => {
  useSEO(
    'Section 5.4: Process Control and Instrumentation - MOET Module 5',
    'PID control, pneumatic/hydraulic controls, DCS systems and instrument calibration'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={4}
      title="Process control and instrumentation"
      description="PID control, pneumatic/hydraulic controls, DCS systems and instrument calibration."
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

export default MOETModule5Section4;
