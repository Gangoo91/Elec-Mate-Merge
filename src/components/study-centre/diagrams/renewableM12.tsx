import type { ReactNode } from 'react';
import { LayeredFramework, ComparisonGrid } from './diagramKit';

/* ──────────────────────────────────────────────────────────────────────
   Module 12 — Verification, EICR & handover across LCT.
   Eight composite "framework" diagrams. Seven are layered top-to-bottom
   bands (LayeredFramework); S2 is a four-technology comparison.
   ────────────────────────────────────────────────────────────────────── */

/* M12 S1 — Part 6 Initial Verification framework applied to LCT. */
export function IvFrameworkLct({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="Initial Verification — applied to LCT"
      caption={caption}
      bands={[
        { title: 'Mandate', sub: 'Reg 641.1', tone: 'warn', items: ['During erection', 'On completion — before service'] },
        { title: 'Inspection', sub: 'Reg 642 — disconnected', tone: 'info', items: ['Items (a)–(r)', 'Before any testing'] },
        { title: 'Testing sequence', sub: 'Reg 643', tone: 'info', items: ['Continuity', 'IR', 'Polarity', 'ADS', 'RCD', 'PFC', 'Functional', 'Voltage drop'] },
        { title: 'Instrument compliance', sub: 'BS EN 61557', tone: 'info', items: ['Pt 2 IR', 'Pt 3 loop', 'Pt 4 continuity', 'Pt 6 RCD', 'Pt 8 IMD', 'Pt 10 multi'] },
        { title: 'Per-source IV extensions', tone: 'go', items: ['Section 712 PV', 'Chapter 57 BESS', 'Section 722 EV', 'Part 4-7 heat pump'] },
        { title: 'Cross-source checks', tone: 'warn', items: ['Reg 551.4.2 RCD effectiveness', 'Reg 551.7.5 anti-islanding per source'] },
        { title: 'Documentation', tone: 'go', items: ['EIC — Reg 644.5 signed', 'Schedule of Inspections', 'Schedule of Test Results', 'Cert evidence bundle'] },
      ]}
      note={
        <>
          Part 6 is the <span className="font-semibold text-elec-yellow">spine</span> — inspection (642) always precedes testing (643). Each LCT source adds its own initial-verification extension on top, plus the cross-source RCD and anti-islanding checks that a single-source install never needs.
        </>
      }
    />
  );
}

/* M12 S2 — DC IR + IV across the four LCT DC sources. */
export function DcIvAcrossLct({ caption }: { caption?: ReactNode }) {
  return (
    <ComparisonGrid
      eyebrow="DC insulation resistance across LCT"
      caption={caption}
      columns={[
        { name: 'PV string', rows: [
          { label: 'Nominal', value: '600–1000 V' },
          { label: 'Test voltage', value: '1000 V' },
          { label: 'Monitoring', value: 'IMD · 712.421.101' },
          { label: 'Caveat', value: 'Weather-dependent' },
        ] },
        { name: 'BESS DC bus', rows: [
          { label: 'Nominal', value: '48 V / 400–800 V' },
          { label: 'Prerequisite', value: 'BMS + cap discharge' },
          { label: 'Re-test', value: '250 V · Reg 643.3.3' },
          { label: 'Caveat', value: 'Wait for discharge' },
        ] },
        { name: 'EV DC fast', rows: [
          { label: 'Nominal', value: '200–1000 V' },
          { label: 'DC side', value: 'Mfr engineer' },
          { label: 'AC side', value: 'Electrician' },
          { label: 'Caveat', value: 'Section 722 PME' },
        ] },
        { name: 'Micro-hydro DC', rows: [
          { label: 'Nominal', value: '24–300 V' },
          { label: 'Basis', value: 'Bespoke mfr DoC' },
          { label: 'Cable', value: 'Wet-environment' },
          { label: 'Caveat', value: 'Interim DC link' },
        ] },
      ]}
      note={
        <>
          One common framework underneath all four: <strong className="text-white">Reg 642 inspection precedes Reg 643 testing</strong>, Table 64 sets the test voltage for the nominal band, a <span className="font-semibold text-elec-yellow">BS EN 61557-2</span> instrument is used, and Reg 643.3.3 requires a 250 V re-test once equipment is connected — recording weather and system state each time.
        </>
      }
    />
  );
}

/* M12 S3 — BESS lifecycle monitoring + condition reporting. */
export function BessLifecycleMonitoring({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="BESS lifecycle monitoring"
      caption={caption}
      bands={[
        { title: 'BMS continuous scope', tone: 'info', items: ['Per-cell V + temp', 'Pack SoC + SoH', 'DC bus', 'Cycle count', 'Fault states', 'Comms', 'Firmware'] },
        { title: 'Lifecycle stages', tone: 'go', items: ['Commissioning baseline', 'Daily operation', 'Annual touchpoint', 'EICR-equiv 5–10 yr', 'Warranty / end-of-life'] },
        { title: 'EICR-equivalent review', tone: 'warn', items: ['Full data review', 'DC bus IR', 'Thermal imaging', 'Functional', 'Warranty', 'AC EICR'] },
        { title: 'Cert evidence bundle', sub: 'Reg 653.2 NOTE', tone: 'go', items: ['Commissioning baseline', 'Periodic snapshots', 'Alarm events', 'Warranty correspondence', 'Photographic', 'Thermographic'] },
      ]}
      note={
        <>
          A battery has no equivalent of a visual EICR walk-round — its condition lives in <span className="font-semibold text-elec-yellow">BMS data</span>. The commissioning baseline (SoH 100%, cycle 0) is what every later snapshot is judged against, so capturing it is non-negotiable.
        </>
      }
    />
  );
}

/* M12 S4 — Open-PEN risk + outdoor LCT protective architectures. */
export function OpenPenOutdoorLct({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="Open-PEN — outdoor LCT"
      caption={caption}
      bands={[
        { title: 'TN-C-S (PME) — normal', tone: 'info', items: ['PEN combines N + PE', 'Bonded metalwork at MET potential'] },
        { title: 'PEN-open scenario', tone: 'stop', items: ['Earth reference lost', 'Exposed parts rise → line voltage', 'Outdoor LCT shock risk'] },
        { title: 'OPDD architecture', tone: 'go', items: ['Detects voltage anomaly', 'Disconnects all poles', 'Built into modern EV chargers', 'Available as separate device'] },
        { title: 'TT alternative', tone: 'warn', items: ['Local earth electrode', 'PME serves rest of install', 'RCD per Section 722.531', 'Reg 415.1'] },
      ]}
      note={
        <>
          On a PME supply an open PEN lets outdoor metalwork rise toward line voltage — the headline risk for anything outside. <span className="font-semibold text-elec-yellow">Section 722 makes it explicit for EV</span>; the same OPDD-or-TT thinking is good practice for outdoor PV, an ASHP and an outdoor BESS, ideally coordinated across all outdoor LCT circuits.
        </>
      }
    />
  );
}

/* M12 S5 — EICR cycle + per-technology EICR-equivalent across LCT. */
export function EicrPerTechnology({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="EICR — per technology"
      caption={caption}
      bands={[
        { title: 'Chapter 65 framework', tone: 'info', items: ['Reg 651 purpose', 'Reg 652 frequency', 'Reg 653 reporting', 'Reg 651.5 skilled person'] },
        { title: 'Classification codes', tone: 'warn', items: ['C1', 'C2', 'C3', 'FI'] },
        { title: 'Per-technology extension', tone: 'info', items: ['PV', 'BESS', 'EV', 'Heat pump', 'Wind', 'CHP', 'Hydro'] },
        { title: 'Coordinated multi-source EICR', tone: 'go', items: ['Single visit', 'Pre-visit data extract', 'AC baseline + per-source', 'Multi-source extensions', 'One customer touchpoint', 'Cert evidence bundle'] },
      ]}
      note={
        <>
          The Chapter 65 framework is unchanged — what each technology adds is an <span className="font-semibold text-elec-yellow">extension list</span>: PV gets DC IR + IMD + anti-islanding, BESS gets BMS data + DC bus IR (see §12.3), EV gets OPDD + RDC-DD, and so on. A multi-source site is one coordinated visit, not several.
        </>
      }
    />
  );
}

/* M12 S6 — MCS handover pack + cert evidence bundle integration. */
export function McsHandoverPack({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="MCS handover pack"
      caption={caption}
      bands={[
        { title: 'MCS handover pack', tone: 'go', items: ['Sizing', 'Product DoCs', 'Commissioning record', 'BS 7671 EIC', 'Schedule of Inspections', 'Schedule of Test Results', 'DNO submission', 'Grant paperwork', 'Warranty', 'Customer guide'] },
        { title: 'MIS standards mapping', tone: 'info', items: ['MIS 3001 thermal', '3002 PV', '3003 wind', '3004 biomass', '3005 heat pumps', '3007 CHP', '3008 hydro'] },
        { title: 'UK 2025–26 grants', tone: 'warn', items: ['BUS — heat pumps + Wales biomass', 'SEG — export tariff', 'Regional schemes'] },
        { title: 'Cert evidence bundle', sub: 'installer lifecycle record', tone: 'go', items: ['MCS pack = foundation', 'Periodic EICR', 'Alarms', 'Warranty', 'Firmware', 'Customer touchpoints', 'Thermal images', 'Modifications'] },
      ]}
      note={
        <>
          The MCS handover pack is the <strong className="text-white">customer-facing</strong> deliverable; the cert evidence bundle is the installer's <span className="font-semibold text-elec-yellow">lifecycle record</span> that starts as that pack and grows over the install's life. Each MIS standard feeds technology-specific detail into the same common structure.
        </>
      }
    />
  );
}

/* M12 S7 — Customer education + handover delivery framework. */
export function CustomerEducationHandover({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="Customer education + handover"
      caption={caption}
      bands={[
        { title: 'Handover meeting', sub: '60–90 min', tone: 'info', items: ['Walk-through', 'System demo', 'Portal walkthrough', 'Maintenance', 'Warranty', 'Fault response', 'MCS pack', 'Q&A', 'Sign-off'] },
        { title: 'Operating guide content', tone: 'info', items: ['System overview', 'Modes', 'Portal access', 'Maintenance', 'Fault response', 'Emergency stops', 'Do-not-open', 'FAQ', 'Contacts'] },
        { title: 'Layered monitoring', tone: 'go', items: ['Continuous BMS', 'Monthly self-check', 'Annual touchpoint', '5–10 yr EICR-equiv', 'Warranty events'] },
        { title: 'Silent-failure prevention', tone: 'warn', items: ['Portal alerts', 'Customer habit', 'Abnormal visibility', 'Annual review', 'Installer fleet view'] },
        { title: 'Property-sale handover', tone: 'go', items: ['MCS pack travels', 'Warranty transfer', 'BUS grant inheritance', 'SEG re-registration', 'Portal reassignment', 'Audit continuity'] },
      ]}
      note={
        <>
          The biggest failure mode of a renewable install is <span className="font-semibold text-elec-yellow">silent under-performance</span> — it keeps running but earns less. A confident customer who checks the portal, plus your fleet view, catches what a once-a-decade EICR never would.
        </>
      }
    />
  );
}

/* M12 S8 — The Renewable Electrician: M1–M12 synthesis + career. */
export function RenewableElectricianSynthesis({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="The Renewable Electrician"
      caption={caption}
      bands={[
        { title: 'M1–M12 integrated model', tone: 'info', items: ['M1 Foundations', 'M2–4 PV', 'M5 BESS', 'M6–7 EV', 'M8 heat pumps', 'M9 other LCT', 'M10 hybrid + EMS', 'M11 Ch 81 + fault', 'M12 verification'] },
        { title: 'Competency stack', tone: 'go', items: ['BS 7671 + A4:2026', 'LCT-specific', 'Mfr-certified installer', 'Multi-trade coordination', 'Systems thinking', 'Customer-facing', 'Cert evidence discipline'] },
        { title: 'UK 2025–30 trajectory', tone: 'warn', items: ['Growing install demand', 'Installer shortage', 'Integration standard', 'Hydrogen / V2G / grid-forming', '2030 + 2050 net-zero'] },
        { title: 'Lifelong build', tone: 'go', items: ['Mock exam validation', 'Ongoing CPD', 'Mfr training cycles', 'Industry engagement', 'Hands-on practice', 'Peer + mentoring'] },
      ]}
      note={
        <>
          No single LCT skill makes a Renewable Electrician — it's the <span className="font-semibold text-elec-yellow">integration</span>: a competent BS 7671 electrician who can design, install, verify and hand over a coordinated multi-source site, and keep learning as the technology moves.
        </>
      }
    />
  );
}
