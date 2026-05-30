import {
  Compass,
  Wind,
  Sun,
  Trees,
  Activity,
  Building2,
  Droplets,
  ClipboardCheck,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'The other-LCT landscape + Section 551 framework',
    icon: Compass,
    description:
      'The technologies beyond solar PV / BESS / EV / heat pumps — wind, solar thermal, biomass, CHP, micro-hydro, hydrogen. Reg 551.1.1 power-source taxonomy. Where Section 551 is the unifying BS 7671 framework for generating sets.',
  },
  {
    id: 2,
    title: 'Wind microgeneration (HAWT / VAWT)',
    icon: Wind,
    description:
      'Horizontal-axis (HAWT) and vertical-axis (VAWT) wind turbines. Domestic + commercial micro-wind. Section 551 + EREC G98 / G99 for export, MCS MIS 3003, mast install, controls, planning permission considerations.',
  },
  {
    id: 3,
    title: 'Solar thermal (collectors + electrical scope)',
    icon: Sun,
    description:
      'Flat plate + evacuated tube collectors. NOT generation — but the electrical install scope is real: differential-temperature controllers, circulation pumps, drainback / pressurised systems, MCS MIS 3001. Hydraulic interface to DHW cylinder.',
  },
  {
    id: 4,
    title: 'Biomass interfaces',
    icon: Trees,
    description:
      'Wood pellet + log biomass boilers. Electrical scope: auger motors, fans, ignition, controls, flue extract. MCS MIS 3004 installer standard. Reg 422.4 combustible material proximity. Hydraulic interface to DHW + heating.',
  },
  {
    id: 5,
    title: 'Micro-CHP (domestic) + Section 551',
    icon: Activity,
    description:
      'Domestic micro-CHP — Stirling engine + fuel-cell + internal combustion variants. Section 551 generating set framework. Reg 551.7.5 anti-islanding. Reg 551.7.2.1 supply-side connection. Electrical generation paired with heat output.',
  },
  {
    id: 6,
    title: 'Commercial CHP + biofuel / biogas / hydrogen variants',
    icon: Building2,
    description:
      'Larger CHP for commercial / industrial sites. Natural gas, biogas (anaerobic digestion), biofuel, blended-hydrogen variants. EREC G99 formal application. Multi-source coordination + grid-services revenue. Heat-network integration.',
  },
  {
    id: 7,
    title: 'Micro-hydro + emerging LCT (hydrogen, fuel cells)',
    icon: Droplets,
    description:
      'Pelton / Francis / Crossflow / Archimedes screw turbines for rural micro-hydro — Section 551 + EREC G99. Plus emerging LCT: UK 2025-26 hydrogen trials (HyDeploy), hydrogen-ready boilers + heat pumps, fuel cells, regulatory direction.',
  },
  {
    id: 8,
    title: 'Commissioning, Part 6 + handover across other LCT',
    icon: ClipboardCheck,
    description:
      'Common framework across the technologies: Section 551 + Reg 551.7 anti-islanding test + EREC G98 / G99 + MCS variants per technology + Part 6 verification + cert evidence bundle structure.',
  },
];

export default function RenewableEnergyModule9() {
  useSEO({
    title:
      'Module 9: Wind, solar thermal, biomass, CHP & other LCT | Renewable Energy Systems | BS 7671:2018+A4:2026',
    description:
      'The other low-carbon technologies — wind, solar thermal, biomass, micro + commercial CHP, micro-hydro, hydrogen + emerging LCT. BS 7671 Section 551 as the unifying framework for generating sets. MCS MIS 3001 / 3003 / 3004 + EREC G98 / G99 + Reg 551.7 anti-islanding.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={9}
      title="Wind, solar thermal, biomass, CHP & other LCT"
      description="The technologies beyond solar PV / BESS / EV / heat pumps — wind (HAWT / VAWT), solar thermal, biomass interfaces, CHP per Section 551 (split into micro-CHP + commercial-scale), micro-hydro, and the hydrogen / emerging-LCT direction. BS 7671 Section 551 is the unifying framework for generating sets; each technology has its MCS standard + EREC G98 / G99 path; anti-islanding is the shared safety anchor."
      tone="yellow"
      sectionsCount={sections.length}
      duration="120 mins"
      prevModuleHref="../renewable-energy-module-8"
      prevModuleLabel="Heat pumps & electrified heat"
      nextModuleHref="../renewable-energy-module-10"
      nextModuleLabel="Hybrid systems, EMS & smart export"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-9-section-${section.id}`}
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
