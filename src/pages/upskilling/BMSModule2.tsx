import { ToggleLeft, Thermometer, Settings, MapPin, Cable, Cpu, Power } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Points: digital and analogue, inputs and outputs',
    icon: ToggleLeft,
    description:
      'Every wire you land on an outstation is a point. Four kinds of point, which way the signal travels, and what each one should do when something breaks.',
  },
  {
    id: 2,
    title: 'Sensors',
    icon: Thermometer,
    description:
      'What each common BMS sensor measures, what it hands to the controller, and the choices that decide whether its reading can be trusted.',
  },
  {
    id: 3,
    title: 'Actuators, valves and dampers',
    icon: Settings,
    description:
      'The output end of every control loop: the devices that turn a BMS signal into water or air actually moving, and how to wire and prove them.',
  },
  {
    id: 4,
    title: 'Siting sensors and getting true readings',
    icon: MapPin,
    description:
      'A good sensor in a bad place gives the BMS a confident wrong answer. Where it goes, how it is fitted and how you prove what it says.',
  },
  {
    id: 5,
    title: 'Controllers and I/O modules',
    icon: Cpu,
    description:
      'The box the field wiring lands on: what a BMS controller does, how its inputs and outputs are set up, how it grows, and what keeps it alive when the power goes.',
  },
  {
    id: 6,
    title: 'Control wiring',
    icon: Cable,
    description:
      'The cable between a controller and a sensor carries a measurement. How to choose, route, screen and label it so the reading arrives intact.',
  },
  {
    id: 7,
    title: 'Motor control and the plant interface',
    icon: Power,
    description:
      'The few terminals where the BMS stops and the starter panel starts: what crosses that line, what comes back, and what must never depend on it.',
  },
];

export default function BMSModule2() {
  useSEO({
    title: 'Module 2: Field devices and signals | BMS course | Elec-Mate',
    description:
      'Points, sensors, actuators, controllers and control wiring, through to where the BMS meets the motor starter.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={2}
      title="Field devices and signals"
      description="Points, sensors, actuators, controllers and the wiring between them, through to where the BMS meets the motor starter."
      tone="yellow"
      sectionsCount={sections.length}
      duration="3 hrs 20 mins"
      prevModuleHref="../bms-module-1"
      prevModuleLabel="What a BMS is, and the rules around it"
      nextModuleHref="../bms-module-3"
      nextModuleLabel="Controlling heating, ventilation and air conditioning"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bms-module-2-section-${section.id}`}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
