import { Gauge, Plug, Smartphone, Cable, Car } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Mode 1–4 and charging speeds',
    icon: Gauge,
    description: 'Understanding the four charging modes and their power levels.',
  },
  {
    id: 2,
    title: 'Socketed vs tethered EVSE',
    icon: Plug,
    description: 'Different EVSE connection types and where each is appropriate.',
  },
  {
    id: 3,
    title: 'Smart chargers, app control and APIs',
    icon: Smartphone,
    description: 'Connected charging systems, remote management and integration APIs.',
  },
  {
    id: 4,
    title: 'IEC 61851 and 62196 connectors',
    icon: Cable,
    description: 'International charging standards and the connector families.',
  },
  {
    id: 5,
    title: 'Compatibility by manufacturer (BMW, Tesla, etc.)',
    icon: Car,
    description: 'Vehicle-specific charging requirements and compatibility considerations.',
  },
];

export default function EVChargingModule2() {
  useSEO({
    title: 'Module 2: EVSE Types, Modes & Standards | EV Charging | Elec-Mate',
    description:
      'Charging modes 1–4, socketed vs tethered EVSE, smart chargers, IEC 61851/62196 and vehicle compatibility.',
  });

  return (
    <ModuleShell
      backTo="../ev-charging-course"
      backLabel="EV charging installation"
      moduleNumber={2}
      title="EVSE types, modes and standards"
      description="Understanding charging equipment types and the international standards that govern them."
      tone="green"
      sectionsCount={sections.length}
      duration="50 mins"
      prevModuleHref="../ev-charging-module-1"
      prevModuleLabel="Introduction to EV charging infrastructure"
      nextModuleHref="../ev-charging-module-3"
      nextModuleLabel="Electrical design and load calculation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ev-charging-module-2-section-${section.id}`}
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
