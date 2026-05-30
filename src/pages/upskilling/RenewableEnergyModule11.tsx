import {
  Leaf,
  Sliders,
  CloudLightning,
  ShieldAlert,
  Zap,
  Network,
  Radio,
  ClipboardCheck,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'A4:2026 Chapter 81 landscape — energy efficiency framework',
    icon: Leaf,
    description:
      'What A4:2026 Chapter 81 introduced + why. Energy-efficiency objectives in BS 7671 — scope of the new Part 8 sections, applicability to LCT installs, the role of design + verification, what the inspector now records.',
  },
  {
    id: 2,
    title: 'Chapter 81 applied — energy efficiency design + verification',
    icon: Sliders,
    description:
      'Practical install implications of Chapter 81. Cable cross-sectional area + voltage drop choices for efficiency. Tariff-aware load shifting. PEI integration with EEMS. Customer evidence pack: efficiency rationale + design records + post-install monitoring.',
  },
  {
    id: 3,
    title: 'BS EN 62305-1 / -2 lightning protection framework',
    icon: CloudLightning,
    description:
      'BS EN 62305-1 general principles + BS EN 62305-2 risk management. Lightning Protection Zones (LPZ 0A / 0B / 1 / 2 / 3). Risk assessment R1 (life), R2 (services), R3 (heritage), R4 (economic). Separation distance s — the calculation that drives PV layout.',
  },
  {
    id: 4,
    title: 'BS EN 62305-3 lightning protection for PV / wind installs',
    icon: ShieldAlert,
    description:
      'External Lightning Protection System (LPS) — air termination, down conductors, earth termination. Bonding of PV / wind frames + masts. Reg 712.534.101 separation distance s for PV inside the protected volume. Wind turbine LPS at mast top + base.',
  },
  {
    id: 5,
    title: 'BS EN 62305-4 + Section 443 surge protective devices (SPDs)',
    icon: Zap,
    description:
      'Reg 443.4.1 SPD requirement triggers post-A4:2026. Reg 534.4.1.1 Type 1 / Type 2 / Type 3 selection by location. Reg 712.534.102.1 PV SPD selection. SPD coordination (Reg 534.4.4) + voltage protection level Up vs equipment Uw (Reg 534.4.4.1). Cert evidence.',
  },
  {
    id: 6,
    title: 'Fault contribution from multi-source sites',
    icon: Network,
    description:
      'Short-circuit + earth-fault contribution from PV / BESS / wind / CHP. Reg 826.1.2.1 prosumer overcurrent assessment for all configurations. Calculating combined Ipscc. Inverter fault current characteristics (limited Isc, ~1.0-1.2× rated). DNO supply-side fault level (PSCC) interaction.',
  },
  {
    id: 7,
    title: 'Anti-islanding deep — DNO-witnessed test + Loss of Mains',
    icon: Radio,
    description:
      'Reg 551.7.4 + 551.7.5 anti-islanding mechanics. ENA EREC G99 test methodologies. ROCOF (Rate of Change of Frequency) detection — the required method for type-tested generation, since G99 disallows Vector Shift on type-tested inverters (VS legacy / non-type-tested sites only). Active anti-islanding techniques. DNO-witnessed commissioning test + G98 self-declared route.',
  },
  {
    id: 8,
    title: 'Commissioning verification — Chapter 81 + lightning + fault levels',
    icon: ClipboardCheck,
    description:
      'Closing the M11 chain: Reg 643 Part 6 initial verification + Reg 443/534 SPD test + lightning protection inspection cycle (BS EN 62305 maintenance) + EICR follow-up. Cert evidence bundle integrating Chapter 81 efficiency rationale + LPS records + SPD details + anti-islanding sign-off.',
  },
];

export default function RenewableEnergyModule11() {
  useSEO({
    title:
      'Module 11: Chapter 81, lightning & fault levels | Renewable Energy Systems | BS 7671:2018+A4:2026',
    description:
      'A4:2026 Chapter 81 energy efficiency + BS EN 62305 lightning protection for PV / wind + Section 443 / 534 SPDs + multi-source fault contribution + Reg 551.7.5 anti-islanding deep dive. Commissioning verification across the M11 stack.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={11}
      title="Chapter 81, lightning & fault levels"
      description="A4:2026 introduced Chapter 81 energy efficiency. BS EN 62305 sets the lightning-protection framework for PV / wind. Section 443 + Section 534 cover SPDs. Multi-source sites change fault-current contribution. Reg 551.7.5 anti-islanding is the safety anchor. This module ties efficiency + lightning + SPDs + fault + islanding into one commissioning chain — what the electrician designs, installs, tests + records."
      tone="yellow"
      sectionsCount={sections.length}
      duration="135 mins"
      prevModuleHref="../renewable-energy-module-10"
      prevModuleLabel="Hybrid systems, EMS & smart export"
      nextModuleHref="../renewable-energy-module-12"
      nextModuleLabel="Testing, commissioning & handover across LCT"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-11-section-${section.id}`}
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
