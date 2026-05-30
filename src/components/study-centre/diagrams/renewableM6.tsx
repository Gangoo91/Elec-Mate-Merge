import type { ReactNode } from 'react';
import { ComparisonGrid, DecisionCascade } from './diagramKit';

/* M6 S1 — EV charging Mode 1–4. */
export function FourModesComparison({ caption }: { caption?: ReactNode }) {
  return (
    <ComparisonGrid
      eyebrow="EV charging modes"
      caption={caption}
      columns={[
        { name: 'Mode 1', rows: [
          { label: 'Connection', value: '13/16 A socket, direct' },
          { label: 'Signalling', value: 'None' },
          { label: 'Protection', value: 'Relies on the installation RCD' },
        ], footer: 'Not permitted for public use' },
        { name: 'Mode 2', rows: [
          { label: 'Connection', value: 'Socket via in-cable box (IC-CPD)' },
          { label: 'Signalling', value: 'Control pilot in the cable' },
          { label: 'Protection', value: 'In-cable RCD + RDC-DD' },
        ], footer: 'Occasional / portable' },
        { name: 'Mode 3', rows: [
          { label: 'Connection', value: 'Dedicated EVSE (wallbox/post)' },
          { label: 'Signalling', value: 'Control pilot (CP)' },
          { label: 'Protection', value: 'Fixed RCD per Section 722' },
        ], footer: 'Standard AC home / workplace' },
        { name: 'Mode 4', rows: [
          { label: 'Connection', value: 'DC direct to the battery' },
          { label: 'Signalling', value: 'Digital communication' },
          { label: 'Protection', value: 'Charger-integrated' },
        ], footer: 'Rapid / public DC hubs' },
      ]}
      note={
        <>
          <span className="font-semibold text-elec-yellow">Modes 1–3 are AC</span> (the vehicle's on-board charger does the AC→DC conversion); <span className="font-semibold text-elec-yellow">Mode 4 is DC</span> (the charger converts and feeds DC straight to the battery). UK fixed installs are almost always Mode 3 or Mode 4.
        </>
      }
    />
  );
}

/* M6 S2 — the earthing decision (PME-on-EV) — flagship. */
export function EarthingDecisionTree({ caption }: { caption?: ReactNode }) {
  return (
    <DecisionCascade
      eyebrow="EV earthing route"
      caption={caption}
      steps={[
        {
          q: "What is the supply earthing system?",
          branches: [{ cond: 'TN-S / TT', to: 'Use the supply protective earth — no PME restriction applies', tone: 'go' }],
        },
        {
          q: 'TN-C-S (PME) supply — could this point charge a vehicle outdoors?',
          branches: [{ cond: 'No (indoor only)', to: 'The PME earth may be used — Reg 722.411.4 does not bite', tone: 'info' }],
        },
        {
          q: 'PME + outdoors: the PME earth must NOT be relied on. Does the unit include an OPDD (CPC-to-Earth voltage detection that disconnects)?',
          branches: [{ cond: 'Yes', to: 'Method (c): the OPDD disconnects on an open-PEN — the common route', tone: 'go' }],
        },
        {
          q: 'No OPDD — can you install a dedicated TT earth electrode with adequate separation from the PME earth?',
          branches: [
            { cond: 'Yes', to: 'Method (b): dedicated TT electrode (mind NOTE 3 — separation from PEN-bonded metalwork)', tone: 'warn' },
            { cond: 'No', to: 'Method (e): separated source / equivalent device — specialist', tone: 'stop' },
          ],
        },
      ]}
    />
  );
}

/* M6 S3 — RCD architecture for EV: Type B vs Type A + RDC-DD. */
export function RcdArchitectures({ caption }: { caption?: ReactNode }) {
  return (
    <ComparisonGrid
      eyebrow="EV RCD architecture"
      caption={caption}
      columns={[
        { name: 'Type B RCD', rows: [
          { label: 'Detects', value: 'AC + pulsating DC + smooth DC' },
          { label: 'Standard', value: 'BS EN 62423' },
          { label: 'Cost', value: '£££ (higher)' },
        ], footer: 'One device covers every fault type' },
        { name: 'Type A + RDC-DD', rows: [
          { label: 'Detects', value: 'Type A (AC + pulsating DC) + 6 mA DC device' },
          { label: 'Standard', value: 'BS EN 62423 + BS IEC 62955' },
          { label: 'Cost', value: '££ (lower)' },
        ], footer: 'The RDC-DD covers the smooth-DC gap' },
      ]}
      note={
        <>
          Section 722 (Reg <strong className="text-white">722.531.3.101</strong>) requires protection against <span className="font-semibold text-elec-yellow">smooth 6 mA DC fault current</span> — either a <strong className="text-white">Type B RCD</strong>, or a <strong className="text-white">Type A RCD plus a residual-DC detecting device (RDC-DD)</strong>. Many wallboxes build the RDC-DD in, so a Type A RCD upstream is enough.
        </>
      }
    />
  );
}
