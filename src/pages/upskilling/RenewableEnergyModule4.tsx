import {
  Recycle,
  Sun,
  Power,
  Layers,
  Network,
  Battery,
  FileText,
  ClipboardCheck,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'PV diverters & solar surplus diversion',
    icon: Recycle,
    description:
      'Eddi / Solar iBoost / iSensor; DC-coupled vs AC-coupled diverters; hot water, EV charging and underfloor heating loads; the SEG export vs self-consumption economics that drive the design.',
  },
  {
    id: 2,
    title: 'Off-grid PV design fundamentals',
    icon: Sun,
    description:
      'Autonomy days, daily energy budget, sun-hours sizing, the battery-to-PV ratio. Reg 712.1 NOTE: standalone PV is "under consideration" — design draws from manufacturer specs and the IET CoP. SELV/PELV envelope for small installs.',
  },
  {
    id: 3,
    title: 'Off-grid backup & generator integration',
    icon: Power,
    description:
      'Diesel / petrol / LPG generator integration, auto-start logic, ATS panels, bulk vs absorption vs float charging cycles, and the BS 7671 Section 551 generating-set regs that govern the install.',
  },
  {
    id: 4,
    title: 'Hybrid PV + BESS topologies',
    icon: Layers,
    description:
      'AC-coupled vs DC-coupled architectures, conversion losses, the major UK brands (Tesla Powerwall, GivEnergy, SolarEdge StorEdge, Sigenergy), and the Chapter 57 / Reg 570.5.2 PCE selection rules.',
  },
  {
    id: 5,
    title: "Chapter 82 — Prosumer's Electrical Installations (PEIs)",
    icon: Network,
    description:
      'NEW A4:2026 chapter. Integration of PV + BESS + EV + grid as a unified prosumer install. Reg 826.1.1.1-826.1.4: operating modes (direct feeding / island), multi-source isolation, earthing arrangements, bidirectional protection.',
  },
  {
    id: 6,
    title: 'Hybrid inverter design & EPS (Emergency Power Supply)',
    icon: Battery,
    description:
      'Backup-power circuits, islanding behaviour, EPS-protected vs non-protected loads, the Reg 826.1.1.2.2 neutral-switch arrangement, firmware update discipline, commissioning sequence.',
  },
  {
    id: 7,
    title: 'EREC G98 / G99 / G100 for hybrid',
    icon: FileText,
    description:
      'Export limitation when BESS shifts net export, multi-source registration, EREC G100 verification testing, Reg 551.7.1(c) bidirectional protective device (NEW A4:2026), Reg 551.7.2.1 stationary batteries treated as generating set not load.',
  },
  {
    id: 8,
    title: 'Commissioning hybrid & off-grid',
    icon: ClipboardCheck,
    description:
      'BS EN 62446-1 grid-tied PV; BS EN 62446-2 PV inspection / maintenance; BESS commissioning per PAS 63100 and BS EN IEC 62485 series; fault investigation across PV + BESS interfaces; the integrated prosumer cert evidence bundle.',
  },
];

export default function RenewableEnergyModule4() {
  useSEO({
    title:
      'Module 4: Solar PV — diverters, off-grid & hybrid | Renewable Energy Systems | BS 7671:2018+A4:2026',
    description:
      'Specialised PV installs that extend Module 3 grid-tied design — surplus diversion, off-grid sizing and generator backup, AC- and DC-coupled hybrid topologies, Chapter 82 PEIs (NEW A4:2026), EPS circuits, EREC compliance, and the integrated commissioning workflow.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={4}
      title="Solar PV: diverters, off-grid & hybrid"
      description="Specialised PV installs — surplus diversion, off-grid design, generator backup, AC- and DC-coupled hybrid topologies, Chapter 82 PEIs (NEW A4:2026), EPS circuits, EREC compliance, and the integrated commissioning workflow."
      tone="yellow"
      sectionsCount={sections.length}
      duration="140 mins"
      prevModuleHref="../renewable-energy-module-3"
      prevModuleLabel="Solar PV: design & installation"
      nextModuleHref="../renewable-energy-module-5"
      nextModuleLabel="BESS — battery energy storage systems"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-4-section-${section.id}`}
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
