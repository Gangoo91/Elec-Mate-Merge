import {
  ClipboardCheck,
  Activity,
  BatteryCharging,
  ShieldAlert,
  CalendarClock,
  FolderArchive,
  Users,
  Award,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Part 6 Initial Verification framework applied to LCT',
    icon: ClipboardCheck,
    description:
      'Chapter 64 Initial Verification + Reg 641-644 framework applied to PV / BESS / EV / heat pumps / wind / hydro / CHP. BS EN 61557 instrument family. Reg 642.3 inspection checklist + Reg 643 testing sequence. Multi-source verification beyond single-source AC.',
  },
  {
    id: 2,
    title: 'Insulation Resistance + Initial Verification on DC circuits',
    icon: Activity,
    description:
      'DC IR is different from AC IR. PV strings (Reg 712.421.101 IMD + 1000 V test), BESS DC bus (Chapter 57 isolation), EV DC fast (CCS / CHAdeMO), micro-hydro DC interim. Test voltage selection, polarity, why DC IR drifts with irradiance / SoC.',
  },
  {
    id: 3,
    title: 'BESS health monitoring + ongoing condition reporting',
    icon: BatteryCharging,
    description:
      'State of Health (SoH) + State of Charge (SoC) reporting via BMS. Capacity-fade monitoring. EICR-equivalent for storage — what the periodic test looks like. Integrating BMS data into the cert evidence bundle. Owner education.',
  },
  {
    id: 4,
    title: 'PEN faults + open-PEN protection for outdoor LCT',
    icon: ShieldAlert,
    description:
      'Reg 722.411.4 PME-on-EV restrictions. Section 712 outdoor PV PME considerations. OPDD (open-PEN detection device) + RDC-DD architectures. The shared open-PEN risk profile across outdoor LCT — EV, outdoor PV inverter, ASHP outdoor unit, outdoor BESS.',
  },
  {
    id: 5,
    title: 'EICR cycle + per-technology specifics',
    icon: CalendarClock,
    description:
      'Chapter 65 Periodic Inspection. Frequency per Reg 652.1. What an EICR-equivalent looks like for PV / BESS / EV / heat pump / wind / CHP / hydro. Per-technology inspection items + sampling strategy + reporting codes.',
  },
  {
    id: 6,
    title: 'MCS handover packs — common structure across LCT',
    icon: FolderArchive,
    description:
      'The MCS handover pack as the integrating customer-facing document. Sizing report + commissioning record + DoC + EIC + grant submission + customer guide. Shared structure across MIS 3001-3008. What the electrician contributes vs the MCS company.',
  },
  {
    id: 7,
    title: 'Customer education + handover delivery',
    icon: Users,
    description:
      'The handover meeting — operating guide, fault response, service contacts, monitoring expectations. UK 2025-26 consumer guidance per technology. Avoiding silent failures (PV with dead inverter, BESS at 0 % SoC for months). Annual touchpoint.',
  },
  {
    id: 8,
    title: 'The Renewable Electrician — synthesis + mock exam preview',
    icon: Award,
    description:
      'Bringing M1-M11 together. The Renewable Electrician identity. Where each technology fits in the UK 2025-26 retrofit + new-build pipeline. Mock exam framing + what good looks like + what continued professional development looks like beyond the course.',
  },
];

export default function RenewableEnergyModule12() {
  useSEO({
    title:
      'Module 12: Testing, commissioning, periodic inspection & handover | Renewable Energy Systems | BS 7671:2018+A4:2026',
    description:
      'The course-closing module — Part 6 Initial Verification framework applied to LCT, DC insulation resistance, BESS health monitoring, PEN faults for outdoor LCT, EICR cycle per technology, MCS handover packs, customer education, the Renewable Electrician synthesis + mock exam preview.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={12}
      title="Testing, commissioning, periodic inspection & handover"
      description="The course-closing module synthesising the testing + handover discipline across the renewable-energy course. Part 6 Initial Verification framework applied to PV / BESS / EV / heat pumps / wind / hydro / CHP. DC insulation resistance specifics. BESS health monitoring + condition reporting. PEN faults + open-PEN protection for outdoor LCT. EICR cycle + per-technology specifics. MCS handover packs + customer education. Closes with the Renewable Electrician synthesis + mock exam preview."
      tone="yellow"
      sectionsCount={sections.length}
      duration="130 mins"
      prevModuleHref="../renewable-energy-module-11"
      prevModuleLabel="Chapter 81, lightning & fault levels"
      nextModuleHref="../renewable-energy-mock-exam"
      nextModuleLabel="Renewable energy mock exam"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-12-section-${section.id}`}
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
