import { ToggleLeft, Thermometer, Settings, MapPin, Cable, Shield } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Digital vs analogue inputs and outputs',
    icon: ToggleLeft,
    description: 'Signal types, processing methods and resolution considerations.',
  },
  {
    id: 2,
    title: 'Sensor types: temperature, humidity, CO2, occupancy',
    icon: Thermometer,
    description: 'Common sensor technologies and their typical applications.',
  },
  {
    id: 3,
    title: 'Actuators, valves and dampers',
    icon: Settings,
    description: 'Control devices and mechanical components driven by the BMS.',
  },
  {
    id: 4,
    title: 'Sensor placement and accuracy considerations',
    icon: MapPin,
    description: 'Installation best practices for reliable measurements.',
  },
  {
    id: 5,
    title: 'I/O modules and expansion devices',
    icon: Cable,
    description: 'Input/output expansion, addressing and connectivity options.',
  },
  {
    id: 6,
    title: 'Cabling, interference and shielding practices',
    icon: Shield,
    description: 'Signal integrity, separation and shielding for BMS field cabling.',
  },
];

export default function BMSModule2() {
  useSEO({
    title: 'Module 2: Control Devices & Field Sensors | BMS Course | Elec-Mate',
    description:
      'Field devices, sensors, actuators, I/O modules and cabling practices for BMS installations.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={2}
      title="Control devices and field sensors"
      description="Field devices, sensors and the control equipment behind every BMS."
      tone="yellow"
      sectionsCount={sections.length}
      duration="60 mins"
      prevModuleHref="../bms-module-1"
      prevModuleLabel="BMS overview and industry applications"
      nextModuleHref="../bms-module-3"
      nextModuleLabel="HVAC integration and scheduling logic"
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
