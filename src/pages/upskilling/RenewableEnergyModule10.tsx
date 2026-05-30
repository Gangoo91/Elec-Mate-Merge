import {
  Layers,
  Gauge,
  PoundSterling,
  TrendingDown,
  CarFront,
  Radio,
  Network,
  ClipboardCheck,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Hybrid systems landscape + Chapter 82 PEI framework',
    icon: Layers,
    description:
      'Where PV + BESS + EV + heat pump + wind / CHP coexist on one site. BS 7671 Chapter 82 Prosumer’s Electrical Installation (PEI) framework. Reg 826 family. Operating modes — direct feeding, island, connected. The architectural shift from single-source to multi-source.',
  },
  {
    id: 2,
    title: 'Energy Management Systems (EMS) — multi-source coordination',
    icon: Gauge,
    description:
      'EEMS (Electrical Energy Management System): the Chapter 82 contents (826.7) recognise an EEMS may be incorporated into a PEI, with EEMS requirements given in Section 825 (Reg 825.1). Priority logic across sources + loads. OCPP / Modbus / proprietary protocols. Vendor EMS (SolarEdge, Tesla, GivEnergy) vs third-party (Sense, Home Assistant). The integration challenge.',
  },
  {
    id: 3,
    title: 'Smart Export Guarantee (SEG)',
    icon: PoundSterling,
    description:
      'UK SEG framework (Ofgem) for paid export. Licensed-supplier offers (Octopus, EDF, E.ON), MPAN / MPRN, MCS certification trigger. Export metering requirements. UK 2025-26 tariff landscape + economic case for export-optimised systems.',
  },
  {
    id: 4,
    title: 'EREC G100 export limit',
    icon: TrendingDown,
    description:
      'DNO-imposed export limit for sites where a full G99 connection would otherwise be needed. Soft limiting (curtailment via EMS / inverter) vs hard limiting (physical cut-off). G100 device approval list, commissioning evidence, why G100 matters in dense urban networks.',
  },
  {
    id: 5,
    title: 'V2G — Vehicle-to-Grid bidirectional charging',
    icon: CarFront,
    description:
      'V2G + V2H + V2L. BS 7671 Section 722 + Chapter 82 integration for bidirectional EV charging. UK 2025-26 reality: limited V2G hardware (Wallbox Quasar, Nissan LEAF), CHAdeMO vs CCS, OEM warranty constraints, Octopus Power Pack trial economics.',
  },
  {
    id: 6,
    title: 'Grid-forming vs grid-following inverters',
    icon: Radio,
    description:
      'Inverter modes: grid-following (the default UK 2025-26 standard) vs grid-forming (microgrid + island-capable). Where grid-forming is needed (off-grid, resilience, microgrid). Section 826.1.1.2.2 neutral handling in island mode.',
  },
  {
    id: 7,
    title: 'Multi-source coordination at scale (Chapter 82 deep)',
    icon: Network,
    description:
      'Reg 826.1.1.4 isolation across multiple sources, Reg 826.1.2 overcurrent at every PEI point + every configuration. Multi-source RCD architecture per Reg 551.4.2. Why a 4-source site (PV + BESS + EV V2G + heat pump) is not 4 × 1-source.',
  },
  {
    id: 8,
    title: 'Commissioning + handover for hybrid systems',
    icon: ClipboardCheck,
    description:
      'The integrated commissioning workflow: Reg 643 Part 6 testing + Reg 551.7.5 anti-islanding per source + Reg 551.4.2 multi-source RCD verification + EREC G99 / G100 completion + the cert evidence bundle that ties PV, BESS, EV, heat pump, EMS into one handover.',
  },
];

export default function RenewableEnergyModule10() {
  useSEO({
    title:
      'Module 10: Hybrid systems, EMS & smart export | Renewable Energy Systems | BS 7671:2018+A4:2026',
    description:
      'Hybrid renewable systems — PV + BESS + EV + heat pump multi-source integration. BS 7671 Chapter 82 PEI framework. Energy Management Systems (EMS). UK Smart Export Guarantee (SEG). EREC G100 export limit. V2G bidirectional charging. Grid-forming vs grid-following inverters. Integrated commissioning + handover.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={10}
      title="Hybrid systems, EMS & smart export"
      description="The integration module. Where PV + BESS + EV + heat pump + (sometimes) wind / CHP all coexist on one site — and the BS 7671 framework for managing the resulting complexity. Chapter 82 PEI. Energy Management Systems. UK Smart Export Guarantee. EREC G100 export limit. V2G bidirectional charging. Grid-forming vs grid-following inverters. The closing integration step before commissioning (M12)."
      tone="yellow"
      sectionsCount={sections.length}
      duration="120 mins"
      prevModuleHref="../renewable-energy-module-9"
      prevModuleLabel="Wind, solar thermal, biomass, CHP & other LCT"
      nextModuleHref="../renewable-energy-module-11"
      nextModuleLabel="Chapter 81, lightning protection & fault levels"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-10-section-${section.id}`}
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
