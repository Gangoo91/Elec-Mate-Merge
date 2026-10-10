import { Wind, Gauge, Clock, Battery, Power, AlertTriangle } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The plant a BMS runs',
    icon: Wind,
    description:
      'Boilers, heat pumps, chillers, pumps, AHUs and room units: what each controls for itself, and what the BMS is there to command and watch.',
  },
  {
    id: 2,
    title: 'Control loops',
    icon: Gauge,
    description:
      'How a BMS holds a temperature or a pressure where it should be, why loops misbehave, and how to tell a tuning problem from a fault you can fix with a spanner.',
  },
  {
    id: 3,
    title: 'Time and occupancy',
    icon: Clock,
    description:
      'Time programmes, holidays, optimisers, presence and the override button: the controls that decide when plant runs at all.',
  },
  {
    id: 4,
    title: 'Demand-based control and load management',
    icon: Battery,
    description:
      'Making plant follow the real load, and keeping the site under its electrical limit when everything wants to run at once.',
  },
  {
    id: 5,
    title: 'Overrides, frost protection and seasonal change',
    icon: Power,
    description:
      'Who is in charge of a piece of plant at any moment, what stops it freezing when nobody is in, and how heating and cooling are kept from fighting.',
  },
  {
    id: 6,
    title: 'Plant safety interlocks and shutdowns',
    icon: AlertTriangle,
    description:
      'What protects people and plant is wired so it works whatever the software does. The BMS watches it, tells someone, and brings the plant back properly afterwards.',
  },
];

export default function BMSModule3() {
  useSEO({
    title:
      'Module 3: Controlling heating, ventilation and air conditioning | BMS course | Elec-Mate',
    description:
      'The plant a BMS runs and how it controls it: loops, schedules, demand-based control, overrides and hardwired safeties.',
  });

  return (
    <ModuleShell
      backTo="../bms-course"
      backLabel="Building management systems"
      moduleNumber={3}
      title="Controlling heating, ventilation and air conditioning"
      description="The plant a BMS runs and how it controls it: loops, schedules, demand-based control, overrides and the safeties that must never depend on software."
      tone="yellow"
      sectionsCount={sections.length}
      duration="3 hrs"
      prevModuleHref="../bms-module-2"
      prevModuleLabel="Field devices and signals"
      nextModuleHref="../bms-module-4"
      nextModuleLabel="Lighting, access, blinds and metering"
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
