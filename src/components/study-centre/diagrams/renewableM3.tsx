import type { ReactNode } from 'react';
import { DecisionCascade, ComparisonGrid, LayeredFramework, TagMap } from './diagramKit';

/* ──────────────────────────────────────────────────────────────────────
   Module 3 — PV siting, sizing, install & verification.
   Data-driven diagrams (decision trees, comparison grids, maps). The
   bespoke SVG figures (yield map, polar plot, MPPT envelope, cross-sections)
   live in renewablePvSiting.tsx.
   ────────────────────────────────────────────────────────────────────── */

/* M3 S2 — kWp sizing: chosen size = minimum of three constraints. */
export function KwpSizingTree({ caption }: { caption?: ReactNode }) {
  return (
    <DecisionCascade
      eyebrow="kWp sizing — the binding constraint"
      caption={caption}
      steps={[
        { q: 'Branch 1 — how much usable roof?', branches: [{ cond: 'm² → modules', to: 'max kWp the roof area allows', tone: 'info' }] },
        { q: 'Branch 2 — what is the budget?', branches: [{ cond: '£ ÷ £/kWp', to: 'max kWp the budget buys', tone: 'info' }] },
        { q: 'Branch 3 — connection limit?', branches: [{ cond: 'EREC G98', to: 'max kWp before a G99 application is needed', tone: 'warn' }] },
        { q: 'Chosen system size', branches: [{ cond: 'Result', to: 'kWp = the minimum of the three branches', tone: 'go' }] },
      ]}
    />
  );
}

/* M3 S2 — inverter MPPT architectures. */
export function InverterArchitectures({ caption }: { caption?: ReactNode }) {
  return (
    <ComparisonGrid
      eyebrow="Inverter / MPPT architecture"
      caption={caption}
      columns={[
        { name: 'Single-MPPT', rows: [
          { label: 'Strings', value: '1 × 14 modules' },
          { label: 'MPPTs', value: '1' },
          { label: 'Best for', value: 'One plane, no shading' },
        ] },
        { name: 'Dual-MPPT', rows: [
          { label: 'Strings', value: '8 (S) + 6 (W)' },
          { label: 'MPPTs', value: '2 independent' },
          { label: 'Best for', value: 'Two planes / part-shade' },
        ] },
        { name: 'Microinverter', rows: [
          { label: 'Strings', value: '1 per module' },
          { label: 'MPPTs', value: 'Per module' },
          { label: 'Best for', value: 'Complex roof / heavy shade' },
        ] },
      ]}
      note={
        <>
          More MPPT inputs = more <span className="font-semibold text-elec-yellow">independence between roof planes</span>, so a shaded or differently-oriented string can't drag down a clean one. Microinverters take that to the module level — and move the DC off the roof entirely.
        </>
      }
    />
  );
}

/* M3 S2 — MCS MIS 3002 design-pack content map. */
export function Mis3002DesignPack({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="MCS MIS 3002 design pack"
      caption={caption}
      bands={[
        { title: 'Design', tone: 'info', items: ['Site survey', 'Yield modelling', 'Schematic', 'Schedule', 'Calculations'] },
        { title: 'Install', tone: 'warn', items: ['Commissioning records', 'BS EN 62446-1 results', 'Photographs', 'Schedule of test results'] },
        { title: 'Customer', tone: 'go', items: ['Information pack', 'MCS certificate', 'Warranty pack', 'EPC update'] },
      ]}
      note={
        <>
          MIS 3002 wants a single <span className="font-semibold text-elec-yellow">audit trail</span> running design → install → customer. The same job evidence that proves the install was done right is what protects you in an MCS audit.
        </>
      }
    />
  );
}

/* M3 S3 — Work at Height hierarchy for PV roof work. */
export function WahHierarchy({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="Work at Height — control hierarchy"
      caption={caption}
      bands={[
        { title: 'AVOID working at height', tone: 'go', items: ['Ground-mount', 'BIPV / factory-fit'] },
        { title: 'PREVENT a fall (collective first)', tone: 'info', items: ['Scaffold', 'MEWP', 'Tower'] },
        { title: 'MINIMISE distance + consequences', tone: 'warn', items: ['Safety nets', 'Harness fall-arrest'] },
      ]}
      note={
        <>
          The <span className="font-semibold text-elec-yellow">Work at Height Regulations 2005</span> set this order — you only drop to the next tier when the one above isn't reasonably practicable. Every roof job needs a RAMS that records which tier you landed on and why.
        </>
      }
    />
  );
}

/* M3 S6 — EREC G98 / G99 / G100 connection decision tree. */
export function ErecDecisionTree({ caption }: { caption?: ReactNode }) {
  return (
    <DecisionCascade
      eyebrow="EREC G98 / G99 / G100 route"
      caption={caption}
      steps={[
        { q: 'Inverter AC output per phase?', branches: [
          { cond: '≤ 16 A 1-ph', to: 'EREC G98 — fit & notify (within 28 days)', tone: 'go' },
          { cond: '> 16 A', to: 'EREC G99 — apply & wait (4–8 wk assessment)', tone: 'warn' },
        ] },
        { q: 'G99 assessment outcome?', branches: [
          { cond: 'Approved', to: 'Connect as designed', tone: 'go' },
          { cond: 'Conditioned', to: 'Approved with a G100 export limit', tone: 'warn' },
          { cond: 'Rejected', to: 'Redesign / reduce size', tone: 'stop' },
        ] },
      ]}
    />
  );
}

/* M3 S7 — Schedule of Test Results (SoTR) document structure. */
export function SoTRStructure({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="Schedule of Test Results"
      caption={caption}
      bands={[
        { title: 'Header', tone: 'info', items: ['Install details', 'Engineer', 'Instruments + serials'] },
        { title: 'System overview', tone: 'info', items: ['Array / string configuration', 'Inverter'] },
        { title: 'Test results', tone: 'warn', items: ['Continuity', 'Polarity', 'V_oc / I_sc per string', 'Insulation resistance', 'Functional'] },
        { title: 'Findings + sign-off', tone: 'go', items: ['Findings & rectifications', 'Sign-off block'] },
      ]}
      note={
        <>
          Built to <span className="font-semibold text-elec-yellow">BS EN 62446-1</span>. The per-string V_oc / I_sc figures recorded here are the <strong className="text-white">baseline</strong> every future PV EICR is measured against — without them, later degradation can't be proven.
        </>
      }
    />
  );
}

/* M3 S8 — Section 712 reg → workflow stage → evidence map. */
export function Reg712WorkflowMap({ caption }: { caption?: ReactNode }) {
  return (
    <TagMap
      eyebrow="Section 712 — reg to workflow"
      caption={caption}
      items={[
        { label: '712.4 — DC system design', sub: 'Design stage', tags: ['§3.2 sizing', 'Design pack'] },
        { label: '712.521.102 — loop minimisation', sub: 'Install stage', tags: ['§3.5 bonding', 'Install photos'] },
        { label: '712.421.101 — DC IR / IMD', sub: 'Commissioning', tags: ['§3.7 testing', 'SoTR'] },
        { label: '551.7.1(d) — NEW in A4:2026', sub: 'Design', tags: ['§3.6 grid', 'G99 paperwork'] },
        { label: '531.3.3 — NEW RCD selection', sub: 'Design', tags: ['§3.5 protection', 'Schedule'] },
        { label: 'Chapter 82 — prosumer', sub: 'Whole job', tags: ['§3.6', 'Cert bundle'] },
      ]}
      note={
        <>
          Every Section 712 regulation lands on a <span className="font-semibold text-elec-yellow">workflow stage</span> and produces a specific piece of evidence. The A4:2026 additions (551.7.1(d), 531.3.3, Chapter 82) slot into the same map — no separate process.
        </>
      }
    />
  );
}

/* M3 S8 — cert evidence bundle structure + lifecycle use cases. */
export function CertBundleStructure({ caption }: { caption?: ReactNode }) {
  return (
    <LayeredFramework
      eyebrow="Cert evidence bundle"
      caption={caption}
      bands={[
        { title: '1 · Design records', tone: 'info', items: ['Survey', 'Yield model', 'Schematic'] },
        { title: '2 · Product evidence', tone: 'info', items: ['Module + inverter DoCs', 'Datasheets'] },
        { title: '3 · Install records', tone: 'warn', items: ['Photographs', 'As-built schedule'] },
        { title: '4 · Commissioning', tone: 'warn', items: ['SoTR (BS EN 62446-1)', 'EIC'] },
        { title: '5 · Grid + grants', tone: 'info', items: ['G98 / G99', 'MCS cert', 'SEG / DNO'] },
        { title: '6 · Customer pack', tone: 'go', items: ['Handover guide', 'Warranty'] },
        { title: '7 · Lifecycle', tone: 'go', items: ['EICR history', 'Modifications'] },
      ]}
      note={
        <>
          One bundle, many uses over the install's life: <span className="font-semibold text-elec-yellow">MCS audit, EICR, customer service, ownership transfer, insurance and end-of-life</span>. Each section is produced by a specific workflow stage, so it's built as you go — not assembled at the end.
        </>
      }
    />
  );
}
