import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { DiagramFigure } from './diagramKit';

/* ──────────────────────────────────────────────────────────────────────
   Single-line diagram primitive + instances for the Renewable course.
   A vertical "spine" of equipment boxes (origin → distribution) that can
   fan out into a row of branch boxes. HTML/flex = responsive, no manual
   SVG coordinates. Reused for residential PV, 3-phase EV, heat-pump,
   coupling, EMS, G100, BESS.
   ────────────────────────────────────────────────────────────────────── */

type Tone = 'neutral' | 'go' | 'info' | 'warn';
const boxTone: Record<Tone, string> = {
  neutral: 'border-white/20 bg-white/[0.04]',
  go: 'border-emerald-400/35 bg-emerald-500/10',
  info: 'border-sky-400/35 bg-sky-500/10',
  warn: 'border-elec-yellow/35 bg-elec-yellow/10',
};

interface Node {
  label: string;
  sub?: string;
  tone?: Tone;
}

function NodeBox({ n, wide }: { n: Node; wide?: boolean }) {
  return (
    <div className={cn('rounded-lg border px-3 py-2 text-center', boxTone[n.tone ?? 'neutral'], wide ? 'min-w-[180px]' : 'w-full')}>
      <div className="text-[12px] font-semibold text-white leading-tight">{n.label}</div>
      {n.sub ? <div className="text-[10px] text-white/65 leading-tight mt-0.5">{n.sub}</div> : null}
    </div>
  );
}

function Conn() {
  return <div className="h-4 w-px bg-white/25" aria-hidden />;
}

export function SingleLine({
  spine,
  branchLabel = 'feeds',
  branches,
  note,
  caption,
  eyebrow = 'Single-line diagram',
}: {
  spine: Node[];
  branchLabel?: string;
  branches?: Node[];
  note?: ReactNode;
  caption?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <DiagramFigure eyebrow={eyebrow} caption={caption}>
      <div className="flex flex-col items-center">
        {spine.map((n, i) => (
          <div key={i} className="flex flex-col items-center w-full max-w-[260px]">
            <NodeBox n={n} />
            {(i < spine.length - 1 || branches) && <Conn />}
          </div>
        ))}
        {branches ? (
          <div className="w-full">
            <div className="mb-2 text-center text-[9.5px] font-medium uppercase tracking-[0.14em] text-white/45">{branchLabel}</div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {branches.map((b, i) => (<NodeBox key={i} n={b} />))}
            </div>
          </div>
        ) : null}
      </div>
      {note ? (
        <div className="mt-3 rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.06] p-3 text-[11.5px] text-white/85 leading-relaxed">{note}</div>
      ) : null}
    </DiagramFigure>
  );
}

/* ── M2 S8 — reference residential PV + storage single-line ───────────── */
export function ResidentialPvSld({ caption }: { caption?: ReactNode }) {
  return (
    <SingleLine
      eyebrow="Residential PV — single-line"
      caption={caption}
      spine={[
        { label: 'DNO supply', sub: 'TN-C-S (PME) · 100 A' },
        { label: 'Meter', sub: 'import / export (smart)' },
        { label: 'Consumer unit', sub: 'main switch + RCBOs' },
      ]}
      branches={[
        { label: 'Hybrid inverter', sub: '4.8 kWp PV + battery', tone: 'go' },
        { label: 'EV charger', sub: '7 kW · Section 722', tone: 'info' },
        { label: 'Heat pump', sub: 'dedicated circuit', tone: 'info' },
        { label: 'Final circuits', sub: 'lights · sockets', tone: 'neutral' },
      ]}
      note={
        <>
          The <span className="font-semibold text-elec-yellow">hybrid inverter</span> ties PV and the battery together on the DC side and feeds AC into the consumer unit; surplus is exported through the smart meter. Each source/load is its own RCBO way — this is the drawing you reproduce on the EIC.
        </>
      }
    />
  );
}

/* ── M7 S2 — three-phase 22 kW EV charger single-line ─────────────────── */
export function ThreePhaseEvSld({ caption }: { caption?: ReactNode }) {
  return (
    <SingleLine
      eyebrow="3-phase EV charger — single-line"
      caption={caption}
      spine={[
        { label: 'DNO supply', sub: '3-phase 400 V TN-C-S' },
        { label: 'Meter + main switch' },
        { label: 'Henley blocks / distribution' },
        { label: '4-pole Type A RCBO', sub: '+ RDC-PD (6 mA DC)', tone: 'warn' },
        { label: '5-core SWA', sub: 'L1/L2/L3/N/PE' },
        { label: 'EV charger', sub: '22 kW Mode 3 · OPDD', tone: 'go' },
      ]}
      note={
        <>
          A three-phase 22 kW point draws ~32 A per phase. The protective device is <span className="font-semibold text-elec-yellow">4-pole</span> (switches all three lines + neutral) and provides the Section 722 smooth-DC protection; an integrated <strong className="text-white">OPDD</strong> handles the open-PEN requirement on the PME supply.
        </>
      }
    />
  );
}

/* ── M8 S4 — heat-pump dedicated circuit single-line ──────────────────── */
export function HeatPumpCircuitSld({ caption }: { caption?: ReactNode }) {
  return (
    <SingleLine
      eyebrow="Heat-pump circuit — single-line"
      caption={caption}
      spine={[
        { label: 'Consumer unit' },
        { label: 'Dedicated RCBO', sub: 'Type A or F · 30 mA', tone: 'warn' },
        { label: 'SWA / T+E to outside', sub: 'armour as CPC' },
        { label: 'Outdoor isolator', sub: 'IP65 · local to unit' },
        { label: 'Heat pump (ASHP)', sub: 'VSD inverter compressor', tone: 'go' },
      ]}
      note={
        <>
          A heat pump gets its <span className="font-semibold text-elec-yellow">own dedicated circuit</span> with a local lockable isolator outdoors. The inverter-driven compressor can produce smooth DC fault current, so the RCD is <strong className="text-white">at least Type A</strong> (Type B where the DoC requires it) — never Type AC.
        </>
      }
    />
  );
}

/* ── M4 S6 — Emergency Power Supply (EPS / backup) single-line ────────── */
export function EpsSld({ caption }: { caption?: ReactNode }) {
  return (
    <SingleLine
      eyebrow="Backup (EPS) — single-line"
      caption={caption}
      spine={[
        { label: 'DNO supply' },
        { label: 'Hybrid inverter / gateway', sub: 'grid-following → grid-forming on outage', tone: 'go' },
        { label: 'Backup consumer unit', sub: 'protected loads only' },
      ]}
      branchLabel="protected vs non-protected"
      branches={[
        { label: 'Protected loads', sub: 'kept alive in an outage', tone: 'go' },
        { label: 'Non-protected loads', sub: 'shed during backup', tone: 'neutral' },
      ]}
      note={
        <>
          On a grid outage the inverter switches from <span className="font-semibold text-elec-yellow">grid-following to grid-forming</span> and powers only the <strong className="text-white">backup consumer unit</strong> (essential circuits). High loads are kept off it so the battery isn't overwhelmed.
        </>
      }
    />
  );
}

/* ── M4 S2 — off-grid PV single-line ──────────────────────────────────── */
export function OffGridArchitecture({ caption }: { caption?: ReactNode }) {
  return (
    <SingleLine
      eyebrow="Off-grid PV — single-line"
      caption={caption}
      spine={[
        { label: 'PV array', sub: 'DC' },
        { label: 'Charge controller', sub: 'MPPT' },
        { label: 'Battery bank', sub: 'DC bus — the buffer', tone: 'go' },
        { label: 'Off-grid inverter', sub: 'grid-forming, sets 230 V', tone: 'warn' },
        { label: 'AC loads', sub: 'no grid behind them' },
      ]}
      note={
        <>
          With no grid, the inverter <span className="font-semibold text-elec-yellow">forms its own 230 V reference</span> and the battery is the only buffer. Generation + storage must be sized for the worst-case winter day plus a margin of autonomy days — there's no grid to fall back on.
        </>
      }
    />
  );
}

/* ── M6 S4 — single-phase EV dedicated final circuit ──────────────────── */
export function EvDedicatedCircuitSld({ caption }: { caption?: ReactNode }) {
  return (
    <SingleLine
      eyebrow="EV dedicated circuit — single-line"
      caption={caption}
      spine={[
        { label: 'Consumer unit' },
        { label: 'Type A RCBO 32 A', sub: '+ RDC-DD (6 mA DC)', tone: 'warn' },
        { label: '6 mm² T+E / SWA' },
        { label: 'Local isolator', sub: 'optional' },
        { label: 'EV charge point', sub: '7.4 kW Mode 3 · OPDD', tone: 'go' },
      ]}
      note={
        <>
          A chargepoint gets its <span className="font-semibold text-elec-yellow">own dedicated final circuit</span> (Section 722). Type A RCD plus 6 mA DC detection (RDC-DD), and open-PEN protection on the PME supply via an integrated OPDD or a TT arrangement.
        </>
      }
    />
  );
}

/* ── M7 S3 — Mode 4 DC fast charging single-line ──────────────────────── */
export function Mode4DcArchitecture({ caption }: { caption?: ReactNode }) {
  return (
    <SingleLine
      eyebrow="Mode 4 DC fast charge — single-line"
      caption={caption}
      spine={[
        { label: '3-phase AC supply' },
        { label: 'Off-board rectifier / charger', sub: 'AC→DC inside the unit', tone: 'warn' },
        { label: 'DC output', sub: 'CCS / CHAdeMO', tone: 'go' },
        { label: 'EV battery', sub: 'charged directly as DC' },
      ]}
      note={
        <>
          In Mode 4 the <span className="font-semibold text-elec-yellow">AC→DC conversion happens in the charger</span> (off-board), not the car — so the unit handles the high power, isolation and DC contactors. The electrician's scope is the 3-phase AC supply and protection <strong className="text-white">up to</strong> the unit.
        </>
      }
    />
  );
}

/* ── M9 S5 — micro-CHP generating set ─────────────────────────────────── */
export function MicroChpFlow({ caption }: { caption?: ReactNode }) {
  return (
    <SingleLine
      eyebrow="Micro-CHP — single-line"
      caption={caption}
      spine={[
        { label: 'Fuel in', sub: 'mains gas (typical)' },
        { label: 'Prime mover', sub: 'engine / Stirling / fuel cell' },
        { label: 'Generator', sub: 'grid-parallel', tone: 'go' },
      ]}
      branchLabel="two useful outputs"
      branches={[
        { label: 'Electricity', sub: 'home use + export', tone: 'go' },
        { label: 'Heat', sub: 'DHW + space heating', tone: 'info' },
      ]}
      note={
        <>
          Micro-CHP makes <span className="font-semibold text-elec-yellow">electricity and useful heat</span> from one fuel input. It's a Section 551 generating set running in parallel with the grid (G98 / G99), so anti-islanding protection applies just as it does to PV.
        </>
      }
    />
  );
}
