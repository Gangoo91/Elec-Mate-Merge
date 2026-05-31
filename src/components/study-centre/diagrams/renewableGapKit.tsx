import type { ReactNode } from 'react';
import { DecisionCascade, ComparisonGrid, TagMap, LayeredFramework } from './diagramKit';

/* ──────────────────────────────────────────────────────────────────────
   Gap-fill diagrams (audit pass) — data-driven kit instances across
   Modules 2, 4, 5, 6, 7, 8, 9, 10, 11. Bespoke SVG gap-fills live in
   renewableGapSvg.tsx. Module 1 gap-fills live in renewableM1.tsx.
   ────────────────────────────────────────────────────────────────────── */

/* M2 S6 — PV mounting architectures. */
export function PvArchitectures({ caption }: { caption?: ReactNode }) {
  return (
    <ComparisonGrid
      eyebrow="PV mounting architecture"
      caption={caption}
      columns={[
        { name: 'On-roof', rows: [
          { label: 'Mounting', value: 'Rails above tiles' },
          { label: 'Cooling', value: 'Good — standoff airflow' },
          { label: 'Cost', value: '£ lowest' },
        ], footer: 'Most common UK domestic retrofit' },
        { name: 'In-roof', rows: [
          { label: 'Mounting', value: 'Replaces tiles' },
          { label: 'Cooling', value: 'Poorer — less airflow' },
          { label: 'Cost', value: '££ higher' },
        ], footer: 'New build / re-roof — neat finish' },
        { name: 'Ground-mount', rows: [
          { label: 'Mounting', value: 'Frames / ballast' },
          { label: 'Cooling', value: 'Best — open airflow' },
          { label: 'Cost', value: 'Varies — groundworks' },
        ], footer: 'Land available, no suitable roof' },
      ]}
      note={
        <>
          In-roof looks the tidiest but runs <span className="font-semibold text-elec-yellow">hotter</span> (less airflow → lower yield); ground-mount cools best but needs land and a longer DC run. On-roof is the domestic default for a reason.
        </>
      }
    />
  );
}

/* M4 S8 — hybrid / off-grid commissioning sequence. */
export function HybridCommissioningSequence({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="Hybrid commissioning — staged"
      caption={caption}
      bands={[
        { title: 'Pre-energise checks', tone: 'info', items: ['IR test (DC + AC)', 'Polarity', 'Earthing + bonding', 'Isolation devices'] },
        { title: 'Energise + grid sync', tone: 'warn', items: ['Inverter start-up', 'Grid sync (G98 / G99)', 'Anti-islanding test'] },
        { title: 'Functional', tone: 'go', items: ['Charge / discharge cycle', 'Backup / EPS transfer test', 'Export limit (G100) verify'] },
        { title: 'Handover', tone: 'go', items: ['EIC + SoTR', 'MCS certificate', 'Customer demo + manuals'] },
      ]}
      note={
        <>
          A hybrid system is verified in <span className="font-semibold text-elec-yellow">stages</span> — never energise the DC and AC sides together before the IR and isolation checks pass. The backup-transfer and export-limit tests are the ones most often skipped.
        </>
      }
    />
  );
}

/* M5 S3 — Chapter 57 BESS protection. */
export function Chapter57Protection({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="Chapter 57 — BESS protection"
      caption={caption}
      bands={[
        { title: 'Isolation + switching', tone: 'info', items: ['DC isolator each side', 'AC isolator', 'Lockable + labelled'] },
        { title: 'Overcurrent — both directions', tone: 'warn', items: ['DC-rated devices', 'Rated for battery + grid fault', 'Bidirectional'] },
        { title: 'Earth-fault detection', tone: 'warn', items: ['RCD / RDC as required', 'Insulation monitoring'] },
        { title: 'Functional safety', tone: 'go', items: ['BMS interlock', 'Emergency stop', 'Thermal / fire cut-off'] },
      ]}
      note={
        <>
          BESS protection is <span className="font-semibold text-elec-yellow">bidirectional</span> — current flows both ways, so every device must be DC-rated and rated for fault current arriving from the battery <strong className="text-white">and</strong> the grid side. That's the difference from a normal load circuit.
        </>
      }
    />
  );
}

/* M5 S5 — BESS topologies / architectures. */
export function BessTopologies({ caption }: { caption?: ReactNode }) {
  return (
    <ComparisonGrid
      eyebrow="BESS topologies"
      caption={caption}
      columns={[
        { name: 'Modular LV', rows: [
          { label: 'Voltage', value: '48–51.2 V DC' },
          { label: 'Format', value: 'Stackable modules' },
          { label: 'Best for', value: 'Domestic, expandable' },
        ] },
        { name: 'All-in-one HV', rows: [
          { label: 'Voltage', value: '400–800 V DC' },
          { label: 'Format', value: 'Single cabinet' },
          { label: 'Best for', value: 'Premium domestic' },
        ] },
        { name: 'Rack / commercial', rows: [
          { label: 'Voltage', value: '400–800 V DC' },
          { label: 'Format', value: '19″ racks / container' },
          { label: 'Best for', value: 'Commercial + grid-scale' },
        ] },
      ]}
      note={
        <>
          <span className="font-semibold text-elec-yellow">LV (48 V)</span> modular is the common domestic format — safer DC voltage but higher current for a given power. <span className="font-semibold text-elec-yellow">HV</span> stacks cut the current (and cable size) for bigger systems.
        </>
      }
    />
  );
}

/* M6 S7 — Smart Charge Point Regulations 2021 (private chargers). */
export function ScprRequirements({ caption }: { caption?: ReactNode }) {
  return (
    <TagMap
      eyebrow="SCPR 2021 — private chargepoints"
      caption={caption}
      items={[
        { label: 'Default off-peak charging', sub: 'pre-set schedule', tags: ['User can override'] },
        { label: 'Randomised delay', sub: 'up to 10 min', tags: ['Smooths grid demand'] },
        { label: 'Demand-side response', tags: ['DSR-ready', 'Tariff signals'] },
        { label: 'Data + cyber security', tags: ['Privacy', 'Secure comms'] },
        { label: 'Measuring + monitoring', tags: ['Energy display', 'Records'] },
      ]}
      note={
        <>
          SCPR 2021 applies to <strong className="text-white">private</strong> chargepoints (home + workplace), mandating smart functionality so millions of chargers don't all hit the grid at once. <span className="font-semibold text-elec-yellow">Public</span> chargepoints fall under PCAR 2023 instead.
        </>
      }
    />
  );
}

/* M7 S4 — OCPP networked charging stack. */
export function OcppArchitecture({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="OCPP networked charging"
      caption={caption}
      bands={[
        { title: 'Chargepoint', tone: 'info', items: ['Mode 3 socket', 'Meter', 'OCPP client'] },
        { title: 'OCPP link', tone: 'warn', items: ['Open Charge Point Protocol', '1.6J / 2.0.1', 'WebSocket over IP'] },
        { title: 'CSMS / back-office', tone: 'go', items: ['Authorisation (RFID / app)', 'Smart charging / DLM', 'Billing + tariffs', 'Remote monitoring'] },
      ]}
      note={
        <>
          OCPP is the <span className="font-semibold text-elec-yellow">open standard</span> that lets any compliant chargepoint talk to any central management system — no vendor lock-in. It's the layer that DLM, billing and remote diagnostics all ride on.
        </>
      }
    />
  );
}

/* M7 S7 — Public Charge Point Regulations 2023. */
export function Pcar2023Requirements({ caption }: { caption?: ReactNode }) {
  return (
    <TagMap
      eyebrow="PCAR 2023 — public chargepoints"
      caption={caption}
      items={[
        { label: '99% reliability', sub: 'rapid network', tags: ['Uptime duty'] },
        { label: 'Contactless payment', tags: ['≥ 8 kW must accept card'] },
        { label: 'Price transparency', tags: ['Pence per kWh', 'Upfront'] },
        { label: '24/7 free helpline', tags: ['Consumer support'] },
        { label: 'Open data', tags: ['Location + availability'] },
        { label: 'Roaming', tags: ['Single access method'] },
      ]}
      note={
        <>
          PCAR 2023 governs <strong className="text-white">public</strong> chargepoints — consumer-facing duties on reliability, payment and price. Private and home chargers are <span className="font-semibold text-elec-yellow">SCPR 2021</span> instead; don't confuse the two regimes.
        </>
      }
    />
  );
}

/* M8 S2 — heat-pump supply assessment + DNO route. */
export function HeatPumpSupplyAssessment({ caption }: { caption?: ReactNode }) {
  return (
    <DecisionCascade
      eyebrow="Supply assessment + DNO"
      caption={caption}
      steps={[
        { q: 'Add heat-pump demand to the existing maximum demand — exceed the supply capacity (≈ 60–100 A)?', branches: [
          { cond: 'Within', to: 'No supply uprate needed', tone: 'go' },
          { cond: 'Exceeds', to: 'Apply to DNO for a supply uprate', tone: 'warn' },
        ] },
        { q: 'Heat-pump input current per phase?', branches: [
          { cond: '≤ 16 A / ph', to: 'DNO notification often not required (confirm with DNO)', tone: 'info' },
          { cond: '> 16 A / ph', to: 'DNO connection application', tone: 'warn' },
        ] },
        { q: 'Consumer unit — spare way + adequate rating?', branches: [
          { cond: 'Yes', to: 'Add the dedicated circuit', tone: 'go' },
          { cond: 'No', to: 'CU upgrade / supplementary board', tone: 'warn' },
        ] },
      ]}
    />
  );
}

/* M8 S7 — heat-pump controls + electrical interface. */
export function HeatPumpControls({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="Controls + electrical interface"
      caption={caption}
      bands={[
        { title: 'Power', tone: 'info', items: ['Dedicated circuit', 'Local isolator', 'Outdoor-unit supply'] },
        { title: 'Control wiring', tone: 'warn', items: ['Volt-free contacts', 'Thermostats / sensors', 'S-plan / Y-plan valves'] },
        { title: 'Backup / DHW', tone: 'go', items: ['Immersion (backup heat)', 'Cylinder thermostat', 'Legionella cycle'] },
        { title: 'Smart / comms', tone: 'info', items: ['Weather compensation', 'Smart-tariff link', 'Monitoring'] },
      ]}
      note={
        <>
          The electrician owns the <span className="font-semibold text-elec-yellow">power side</span> and the volt-free control interface; the heat engineer owns the refrigerant and hydronics. The boundary between the two is exactly where commissioning faults hide.
        </>
      }
    />
  );
}

/* M9 S2 — wind microgeneration HAWT vs VAWT. */
export function WindTurbineComparison({ caption }: { caption?: ReactNode }) {
  return (
    <ComparisonGrid
      eyebrow="Wind — HAWT vs VAWT"
      caption={caption}
      columns={[
        { name: 'HAWT — horizontal axis', rows: [
          { label: 'Orientation', value: 'Faces the wind (yaw)' },
          { label: 'Siting', value: 'Tall mast, open site' },
          { label: 'Output', value: 'Higher efficiency' },
        ], footer: 'Open rural sites with clean wind' },
        { name: 'VAWT — vertical axis', rows: [
          { label: 'Orientation', value: 'Omnidirectional' },
          { label: 'Siting', value: 'No yaw, lower' },
          { label: 'Output', value: 'Lower, handles turbulence' },
        ], footer: 'Roof / urban / turbulent wind' },
      ]}
      note={
        <>
          HAWTs win on yield in clean wind; VAWTs cope better with turbulent urban wind and are quieter, but produce less. Both are <span className="font-semibold text-elec-yellow">Section 551 generating sets</span> needing a G98 / G99 route.
        </>
      }
    />
  );
}

/* M10 S3 — Smart Export Guarantee. */
export function SegFramework({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="Smart Export Guarantee"
      caption={caption}
      bands={[
        { title: 'Eligibility', tone: 'info', items: ['MCS-certified install', '≤ 5 MW', 'Half-hourly export meter'] },
        { title: 'How it works', tone: 'go', items: ['Licensed supplier pays for export', 'Tariff set by supplier', 'Choose the best SEG rate'] },
        { title: 'vs the old FiT', tone: 'warn', items: ['FiT closed 2019', 'Export only — no generation payment', 'Rates vary widely'] },
      ]}
      note={
        <>
          SEG replaced the Feed-in Tariff — it pays only for <span className="font-semibold text-elec-yellow">exported</span> units, not generation, and rates are supplier-set. Shopping around (and self-consuming more) is where the customer's money is.
        </>
      }
    />
  );
}

/* M11 S2 — Chapter 81 energy efficiency applied. */
export function Chapter81Verification({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="Chapter 81 — applied"
      caption={caption}
      bands={[
        { title: 'Design measures', tone: 'info', items: ['Cable sizing for low loss', 'Load / transformer placement', 'Power factor'] },
        { title: 'Monitoring', tone: 'warn', items: ['Energy measurement (EEMS)', 'Sub-metering', 'Load profiling'] },
        { title: 'Verification', tone: 'go', items: ['Document the measures', 'Part of the EIC pack', 'Signpost — not pass/fail'] },
      ]}
      note={
        <>
          Chapter 81 (new in A4:2026) is a <span className="font-semibold text-elec-yellow">signpost</span> to BS HD 60364-8-1, not a set of pass/fail tests. You <strong className="text-white">document</strong> the efficiency measures taken — you don't "test" them the way you test ADS.
        </>
      }
    />
  );
}

/* M11 S3 — the BS EN 62305 lightning-protection parts. */
export function Lightning62305Framework({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="BS EN 62305 — the four parts"
      caption={caption}
      bands={[
        { title: '−1 General principles', tone: 'info', items: ['Scope', 'Damage types', 'Protection levels LPL I–IV'] },
        { title: '−2 Risk management', tone: 'warn', items: ['Risk assessment', 'R1 loss of life', 'Decide if an LPS is needed'] },
        { title: '−3 Physical damage (LPS)', tone: 'go', items: ['Air termination', 'Down conductors', 'Earth termination'] },
        { title: '−4 Electrical / electronic (LEMP)', tone: 'info', items: ['SPD coordination', 'Bonding', 'Screening'] },
      ]}
      note={
        <>
          The sequence is <span className="font-semibold text-elec-yellow">risk-first</span>: Part 2 decides whether you need protection at all, then Part 3 (the physical LPS) and Part 4 (surge / SPD) tell you how to build it. Never jump to fitting an LPS before the risk assessment.
        </>
      }
    />
  );
}
