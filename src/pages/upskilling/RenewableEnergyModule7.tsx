import {
  Building2,
  Activity,
  Zap,
  Network,
  SlidersHorizontal,
  Truck,
  ScrollText,
  ClipboardCheck,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Commercial EV landscape & Section 722 scope',
    icon: Building2,
    description:
      'How Section 722 scales from domestic to commercial / workplace / public / DC fast. Site-classification decisions, customer types (workplace, retail, public hub, fleet), and the regulatory stack that lands on commercial EV install.',
  },
  {
    id: 2,
    title: 'Three-phase 22 kW Mode 3 install',
    icon: Activity,
    description:
      'Three-phase AC charging: 32 A per phase, 4-pole Type B RCD architecture, phase balancing, DNO notification under EREC G98 / G99, three-phase OPDD, three-phase Zs verification per phase.',
  },
  {
    id: 3,
    title: 'Mode 4 DC fast charging',
    icon: Zap,
    description:
      'BS EN 61851-23 DC charging stations. CCS Combo 2, CHAdeMO (declining), Tesla NACS. 50 kW (early), 150 kW (mid), 350 kW (ultra-rapid). DNO supply requirements, three-phase upstream, water-cooled cables on 200 A+ designs.',
  },
  {
    id: 4,
    title: 'OCPP & networked charging',
    icon: Network,
    description:
      'Open Charge Point Protocol — OCPP 1.6 and 2.0.1 — the industry standard for chargepoint ↔ Charge Point Management System (CPMS) communication. Authentication, billing, monitoring, dynamic configuration, firmware updates.',
  },
  {
    id: 5,
    title: 'DLM at scale & charging clusters',
    icon: SlidersHorizontal,
    description:
      'Dynamic load management across multi-charger sites. Static vs dynamic allocation, peak-shaving via BESS integration, charging cluster topology, supply headroom calculation, future-proofing site capacity.',
  },
  {
    id: 6,
    title: 'Fleet charging — depot, scheduling, telematics',
    icon: Truck,
    description:
      'Depot fleet patterns (taxi, delivery, LCV, HGV). Sequential scheduling based on departure times, telematics integration (driver routing + state-of-charge), site capacity sizing, OCPP fleet-specific extensions.',
  },
  {
    id: 7,
    title: 'CPO regulations & PCAR 2023',
    icon: ScrollText,
    description:
      'Public Charge Point Regulations 2023 (PCAR) — payment, reliability, pricing transparency, roaming, 24/7 helpline, open data. PAS 1899 accessibility for disabled users. CPO licensing under Ofgem.',
  },
  {
    id: 8,
    title: 'Commercial commissioning, EICR & handover',
    icon: ClipboardCheck,
    description:
      'Commercial install overlays on M6.8 commissioning sequence: multi-charger OCPP setup, CPMS integration test, three-phase RCD coordinated test, fleet-driver / public-user handover documentation, EICR pattern for high-volume sites.',
  },
];

export default function RenewableEnergyModule7() {
  useSEO({
    title:
      'Module 7: EV charging — commercial, workplace, public, DC fast | Renewable Energy Systems | BS 7671:2018+A4:2026',
    description:
      'Commercial EV charging — three-phase 22 kW AC, Mode 4 DC fast (CCS / 50-350 kW), OCPP networked charging, dynamic load management at scale, fleet depot patterns, Public Charge Point Regulations 2023, PAS 1899 accessibility.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={7}
      title="EV charging: commercial, workplace, public, DC fast"
      description="Scaling EV charging from domestic to commercial — three-phase 22 kW Mode 3, Mode 4 DC fast (CCS Combo 2 at 50–350 kW), OCPP networked operation, DLM across multi-charger sites, fleet depot patterns, PCAR 2023 public charge point regulations, PAS 1899 accessibility."
      tone="yellow"
      sectionsCount={sections.length}
      duration="120 mins"
      prevModuleHref="../renewable-energy-module-6"
      prevModuleLabel="EV charging: domestic & residential"
      nextModuleHref="../renewable-energy-module-8"
      nextModuleLabel="Heat pumps & electrified heat"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-7-section-${section.id}`}
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
