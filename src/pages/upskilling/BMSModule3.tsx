import { Wind, Gauge, Clock, Battery, Power, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'HVAC systems in BMS (AHU, FCU, chillers, boilers)',
    icon: Wind,
    description: 'HVAC equipment integration and the control points each unit exposes.',
  },
  {
    id: 2,
    title: 'Control strategies: temperature, pressure, flow',
    icon: Gauge,
    description: 'Process control methods and tuning fundamentals.',
  },
  {
    id: 3,
    title: 'Time scheduling and occupancy programming',
    icon: Clock,
    description: 'Automated scheduling, occupancy detection and setback strategies.',
  },
  {
    id: 4,
    title: 'Demand-based control and load shedding',
    icon: Battery,
    description: 'Energy optimisation and load management during peak demand.',
  },
  {
    id: 5,
    title: 'Override functions and seasonal settings',
    icon: Power,
    description: 'Manual overrides, holiday modes and seasonal adjustments.',
  },
  {
    id: 6,
    title: 'Alarm responses and safety shutdowns',
    icon: AlertTriangle,
    description: 'Emergency procedures, interlocks and safety system responses.',
  },
];

export default function BMSModule3() {
  useSEO({
    title: 'Module 3: HVAC Integration & Scheduling | BMS Course | Elec-Mate',
    description:
      'HVAC control strategies, scheduling, demand-based control, overrides and safety shutdowns within a BMS.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={3}
      title="HVAC integration and scheduling logic"
      description="HVAC control strategies, scheduling and demand-based optimisation."
      tone="yellow"
      sectionsCount={sections.length}
      duration="65 mins"
      prevModuleHref="../bms-module-2"
      prevModuleLabel="Control devices and field sensors"
      nextModuleHref="../bms-module-4"
      nextModuleLabel="Lighting, access and environmental control"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../bms-module-3-section-${section.id}`}
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
