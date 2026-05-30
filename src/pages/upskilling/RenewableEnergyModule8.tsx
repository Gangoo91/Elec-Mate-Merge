import {
  Thermometer,
  Gauge,
  Snowflake,
  Cable,
  Activity,
  Droplets,
  SlidersHorizontal,
  ClipboardCheck,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Heat pumps in the UK electrical context',
    icon: Thermometer,
    description:
      'ASHP / GSHP / exhaust-air heat pumps — what an installer needs to know on the electrical side. The MCS / MIS 3005-I / -D:2025 framework as the external installer competency; BS 7671 scope clearly delineated; load profile + typical UK install patterns 2025-26.',
  },
  {
    id: 2,
    title: 'Supply assessment + DNO notification',
    icon: Gauge,
    description:
      'Max demand calc per Reg 311.1, diversity considerations for compressor + immersion + circulation pumps, EREC G98 (single-phase ≤16 A per phase) vs G99 (above), three-phase requirement for larger units, supply upgrade lead times.',
  },
  {
    id: 3,
    title: 'Outdoor unit siting + thermal/cable protection',
    icon: Snowflake,
    description:
      'Reg 421.11 + Reg 421.1.4 thermal protection of fixed equipment, Reg 422.3.2 enclosure temperature limits, Reg 522.2.1 wiring protection from external heat sources, IP / IK ratings per BS EN 60529 + BS EN 62262, condensate management, defrost-cycle thermal pulses.',
  },
  {
    id: 4,
    title: 'Wiring + dedicated circuit + ADS',
    icon: Cable,
    description:
      'Dedicated circuit per heat pump (industry norm aligned to M6 / M7 pattern), Reg 411.4 ADS coordination, cable sizing for sustained running current + start-up inrush, SWA outdoor installs, Reg 543 protective conductor selection, Zs verification at the outdoor unit.',
  },
  {
    id: 5,
    title: 'RCD architecture for VSD inverter compressors',
    icon: Activity,
    description:
      'Variable-Speed-Drive inverter-driven compressors reintroduce the smooth-DC question. Type A vs Type F vs Type B per BS EN 62423 / BS EN 60947-2; manufacturer DoC on internal DC leakage; protective device coordination; common installer error of fitting Type AC.',
  },
  {
    id: 6,
    title: 'Backup immersion + DHW cylinder integration',
    icon: Droplets,
    description:
      'Hot Water Cylinder backup immersion element — Reg 554.2 / 554.2.1 / 554.3 (heaters for liquids having immersed heating elements), 30 mA RCD per Reg 415.1, control wiring + thermostat circuit, dual-coil cylinder + heat-pump-priority logic.',
  },
  {
    id: 7,
    title: 'Controls + electrical interface',
    icon: SlidersHorizontal,
    description:
      'Outside Air Temperature (OAT) sensor wiring, weather compensation, OpenTherm + EBus interfaces, room thermostats + zone valves, smart-meter integration for time-of-use tariff coordination, control wiring per central-heating norms.',
  },
  {
    id: 8,
    title: 'Commissioning, Part 6 inspection + handover',
    icon: ClipboardCheck,
    description:
      'Reg 643 testing per dedicated circuit, Chapter 64 Initial Verification, Type B-capable test instruments per BS EN 61557, EICR pattern for VSD-driven circuits, MCS handover paperwork (external), customer education on commissioning state + service intervals.',
  },
];

export default function RenewableEnergyModule8() {
  useSEO({
    title:
      'Module 8: Heat pumps & electrified heat | Renewable Energy Systems | BS 7671:2018+A4:2026',
    description:
      'Heat pumps from the installer’s electrical side — supply assessment, dedicated circuit, VSD inverter compressor RCD architecture, backup immersion + DHW cylinder integration, controls, commissioning + Part 6 inspection. MCS / MIS 3005-I / -D:2025 framework acknowledged as external competency.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={8}
      title="Heat pumps & electrified heat"
      description="Heat pumps from the installer’s electrical perspective — ASHP / GSHP / exhaust-air. Supply assessment + DNO notification, outdoor unit siting + thermal protection, dedicated circuit + ADS, RCD architecture for variable-speed-drive inverter compressors, backup immersion + DHW cylinder integration, controls + electrical interface, commissioning + Part 6 inspection. BS 7671:2018+A4:2026 scope; MCS / MIS 3005-I / -D:2025 framework acknowledged as external installer competency."
      tone="yellow"
      sectionsCount={sections.length}
      duration="120 mins"
      prevModuleHref="../renewable-energy-module-7"
      prevModuleLabel="EV charging: commercial, workplace, public, DC fast"
      nextModuleHref="../renewable-energy-module-9"
      nextModuleLabel="Wind, solar thermal, biomass, CHP & other LCT"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-8-section-${section.id}`}
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
