import { Cpu, Thermometer, Radio, Network, BarChart3, Settings } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
  {
    number: '5.1',
    title: 'BMS fundamentals',
    description:
      'System architecture, outstations, head-end, network topology and system components',
    icon: Cpu,
    href: '../h-n-c-module8-section5-1',
  },
  {
    number: '5.2',
    title: 'Sensors and measurement',
    description:
      'Temperature, humidity, pressure, flow sensors, accuracy and calibration requirements',
    icon: Thermometer,
    href: '../h-n-c-module8-section5-2',
  },
  {
    number: '5.3',
    title: 'Actuators and output devices',
    description:
      'Valve actuators, damper actuators, modulating vs on/off control and selection criteria',
    icon: Radio,
    href: '../h-n-c-module8-section5-3',
  },
  {
    number: '5.4',
    title: 'Communication protocols',
    description: 'BACnet, Modbus, LonWorks, KNX, protocol gateways and system integration',
    icon: Network,
    href: '../h-n-c-module8-section5-4',
  },
  {
    number: '5.5',
    title: 'Control strategies',
    description:
      'PID control, cascade control, optimised start/stop, demand-based control and setpoint reset',
    icon: BarChart3,
    href: '../h-n-c-module8-section5-5',
  },
  {
    number: '5.6',
    title: 'System optimisation',
    description:
      'Energy monitoring, fault detection, performance analytics and continuous commissioning',
    icon: Settings,
    href: '../h-n-c-module8-section5-6',
  },
];

const HNCModule8Section5 = () => {
  useSEO(
    'BMS integration - HNC Module 8 Section 5 | HVAC Systems',
    'Master BMS integration: building management systems, control strategies, sensors, actuators, protocols and system optimisation for HVAC.'
  );

  return (
    <SectionShell
      backTo="../h-n-c-module8"
      backLabel="Module 8"
      moduleNumber={8}
      sectionNumber={5}
      title="BMS integration"
      description="Integrate HVAC systems with building management systems for optimal control and efficiency."
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

export default HNCModule8Section5;
