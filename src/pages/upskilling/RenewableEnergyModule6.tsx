import {
  BookOpen,
  Anchor,
  ShieldCheck,
  Cable,
  CloudRain,
  Plug,
  Wifi,
  ClipboardCheck,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Section 722 & the Mode 1–4 landscape',
    icon: BookOpen,
    description:
      'What makes EV charging regulatorily distinct in BS 7671 — Section 722 scope and the four IEC 61851 charging modes (1, 2, 3, 4). Why UK domestic = Mode 3 dominant, with Mode 2 in-cable controls as the legacy edge.',
  },
  {
    id: 2,
    title: 'Earthing tree — PME-on-EV, TN-S, TT, OPDD',
    icon: Anchor,
    description:
      'The highest-stakes section in EV install. PME (TN-C-S) and the "lost PEN" fault hazard on outdoor exposed-conductive-parts; TN-S; the dedicated TT earth electrode option; OPDD (Open PEN Detection Device) per Reg 722.411.4.1.',
  },
  {
    id: 3,
    title: 'RCD architecture & RDC-DD — Reg 722.531.2',
    icon: ShieldCheck,
    description:
      'Type B vs Type A + integrated RDC-DD (6 mA DC residual detection per BS EN IEC 62955). Reg 722.531.2 selection logic, the manufacturer-declaration route, and the fault profile that justifies the upgrade from Type AC.',
  },
  {
    id: 4,
    title: 'Cable, RCBO & dedicated final circuit (7 kW single-phase)',
    icon: Cable,
    description:
      'Cable sizing for 32 A continuous on a 7.4 kW Mode 3 charge point, dedicated final circuit per Reg 722.55, RCBO selection, max demand interaction with the rest of the house load, isolation discipline at the consumer unit.',
  },
  {
    id: 5,
    title: 'Outdoor install — IP, location, mounting',
    icon: CloudRain,
    description:
      'IP rating for outdoor mounting, cable routing through walls and out to charge-point location, weatherproof glands, drainage, mounting height and accessibility, the customer-side vs DNO-side considerations on a driveway install.',
  },
  {
    id: 6,
    title: 'Connector, CP/PP signalling & dynamic load management',
    icon: Plug,
    description:
      'Type 2 connector (IEC 62196), tethered vs untethered choice, Control Pilot (CP) and Proximity Pilot (PP) signalling basics, dynamic load management (DLM) reading the main-supply current and throttling the charge point.',
  },
  {
    id: 7,
    title: 'Smart Charge Points Regulations + EV tariffs',
    icon: Wifi,
    description:
      'UK Electric Vehicles (Smart Charge Points) Regulations 2021 — default off-peak charging, randomised delay, security requirements. Octopus Intelligent Go / Cosy / Flux EV tariffs; the customer-facing scheduling conversation.',
  },
  {
    id: 8,
    title: 'Commissioning, EICR & customer handover',
    icon: ClipboardCheck,
    description:
      'Part 6 commissioning of the EV final circuit, BS EN IEC 61851 conformity verification, OZEV / EVCS grant scheme paperwork, customer handover pack, and the EICR pattern for EV chargers at periodic inspection.',
  },
];

export default function RenewableEnergyModule6() {
  useSEO({
    title:
      'Module 6: EV charging — domestic & residential | Renewable Energy Systems | BS 7671:2018+A4:2026',
    description:
      'UK domestic EV charging — Section 722 + Mode 1–4 landscape, PME-on-EV earthing hazard and OPDD, Type B + RDC-DD architecture, 7 kW single-phase Mode 3 install, outdoor mounting, Type 2 connector and CP/PP signalling, UK Smart Charge Points Regulations 2021, commissioning and EICR.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={6}
      title="EV charging: domestic & residential"
      description="Section 722 + the Mode 1–4 landscape, the earthing tree (PME-on-EV, TN-S, TT, OPDD), Type B + RDC-DD architecture, 7 kW single-phase Mode 3 install, outdoor mounting, Type 2 connector + CP/PP signalling, UK Smart Charge Points Regulations 2021, and the EV-specific commissioning + EICR overlay."
      tone="yellow"
      sectionsCount={sections.length}
      duration="110 mins"
      prevModuleHref="../renewable-energy-module-5"
      prevModuleLabel="Battery storage (BESS)"
      nextModuleHref="../renewable-energy-module-7"
      nextModuleLabel="EV charging: commercial, workplace, public, DC fast"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-6-section-${section.id}`}
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
