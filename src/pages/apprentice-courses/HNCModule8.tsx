import { Flame, Wind, Snowflake, RotateCcw, Cpu, Layers } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Heating systems',
    icon: Flame,
    description:
      'Boiler systems, heat pump integration, underfloor heating, radiator circuits and heating controls.',
  },
  {
    id: 2,
    title: 'Ventilation systems',
    icon: Wind,
    description:
      'Supply and extract systems, heat recovery, ductwork design, air-handling units and fan selection.',
  },
  {
    id: 3,
    title: 'Air conditioning systems',
    icon: Snowflake,
    description: 'DX systems, chilled water, VRF/VRV, refrigeration principles and system selection.',
  },
  {
    id: 4,
    title: 'Motor control',
    icon: RotateCcw,
    description:
      'DOL and star-delta starters, VSDs, soft starters, motor protection and energy-efficient drives.',
  },
  {
    id: 5,
    title: 'BMS integration',
    icon: Cpu,
    description:
      'Building management systems, control strategies, sensors, actuators, protocols and optimisation.',
  },
  {
    id: 6,
    title: 'Services coordination',
    icon: Layers,
    description:
      'HVAC electrical requirements, plant-room design, interface coordination and commissioning procedures.',
  },
];

export default function HNCModule8() {
  useSEO({
    title: 'Module 8: HVAC Systems | HNC | Elec-Mate',
    description:
      'Heating, ventilation and air conditioning design, motor control, BMS integration and services coordination.',
  });

  return (
    <ModuleShell
      backTo="../hnc"
      backLabel="HNC electrical engineering"
      moduleNumber={8}
      title="HVAC systems"
      description="HVAC design and the electrical services that support heating, ventilation and air conditioning in modern buildings."
      tone="purple"
      sectionsCount={sections.length}
      duration="2h"
      prevModuleHref="../h-n-c-module7"
      prevModuleLabel="Power and lighting systems"
      nextModuleHref="../h-n-c-module9"
      nextModuleLabel="Mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../h-n-c-module8-section${section.id}`}
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
