import {
  Battery,
  Activity,
  ShieldCheck,
  BookOpen,
  Network,
  Calculator,
  Wrench,
  ClipboardCheck,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'BESS fundamentals & chemistry',
    icon: Battery,
    description:
      'Chapter 57 NEW A4:2026 scope (Reg 570.1), Reg 570.5.1 ten selection factors, LFP vs NMC vs lead-acid vs flow chemistries, the UK 2025–2026 brand landscape (GivEnergy / Tesla / Sigenergy / Huawei / FoxESS / Enphase), and how cycle vs calendar life shapes the warranty conversation.',
  },
  {
    id: 2,
    title: 'BMS, cell balancing, SoC & SoH',
    icon: Activity,
    description:
      'How the battery management system protects the pack — cell-level monitoring, active vs passive balancing, state-of-charge vs state-of-health, depth-of-discharge windows, and what BMS event logs actually tell you on a fault call-out.',
  },
  {
    id: 3,
    title: 'Chapter 57 protection deep dive',
    icon: ShieldCheck,
    description:
      'The new Chapter 57 protective measures end-to-end — disconnection means under Reg 570.6, isolation, short-circuit and overload protection on the DC side, RCD type selection on the AC side, and the Section 715 ELV interface where it applies.',
  },
  {
    id: 4,
    title: 'BS EN IEC 62485 + PAS 63100',
    icon: BookOpen,
    description:
      'BS EN IEC 62485 series on safety of secondary batteries, PAS 63100:2024 for UK domestic BESS, and how these support standards drop into Chapter 57 — ventilation, siting, signage and the install evidence pack.',
  },
  {
    id: 5,
    title: 'BESS topologies & architectures',
    icon: Network,
    description:
      'DC-coupled vs AC-coupled vs hybrid inverter architectures, single-port vs dual-port systems, single-line diagram patterns for new-build vs PV retrofit, and how the topology you pick drives the Chapter 57 protection picture from §5.3.',
  },
  {
    id: 6,
    title: 'Sizing & energy modelling',
    icon: Calculator,
    description:
      'Usable kWh, depth of discharge, C-rate, round-trip efficiency, sizing against the PV array and a real household load profile, tariff arbitrage (Octopus Flux / Cosy / Agile / Intelligent), SEG export interaction and the oversizing trap.',
  },
  {
    id: 7,
    title: 'Installation, commissioning & ventilation',
    icon: Wrench,
    description:
      'Siting per PAS 63100 (garage / external / loft restrictions), thermal management, ventilation, IP rating, DC vs AC cable routes, isolation discipline, labelling, the commissioning checklist and the customer handover pack.',
  },
  {
    id: 8,
    title: 'Periodic inspection, faults & end-of-life',
    icon: ClipboardCheck,
    description:
      'BESS health at EICR — capacity fade, BMS log review, thermal-runaway response and fire service liaison, decommissioning, WEEE compliance and the UK battery recycling chain — closing the BESS lifecycle from cradle to cradle.',
  },
];

export default function RenewableEnergyModule5() {
  useSEO({
    title:
      'Module 5: Battery storage (BESS) | Renewable Energy Systems | BS 7671:2018+A4:2026',
    description:
      'Battery Energy Storage Systems end-to-end — chemistries, BMS, the new Chapter 57 protective measures (A4:2026), BS EN IEC 62485 and PAS 63100:2024, topologies, sizing, installation, commissioning, periodic inspection and end-of-life.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={5}
      title="Battery storage (BESS)"
      description="Battery Energy Storage Systems from chemistry to commissioning — Chapter 57 NEW A4:2026, BS EN IEC 62485, PAS 63100:2024, topologies, sizing, install and periodic inspection."
      tone="yellow"
      sectionsCount={sections.length}
      duration="110 mins"
      prevModuleHref="../renewable-energy-module-4"
      prevModuleLabel="Solar PV: diverters, off-grid & hybrid"
      nextModuleHref="../renewable-energy-module-6"
      nextModuleLabel="EV charging: domestic & residential"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-5-section-${section.id}`}
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
