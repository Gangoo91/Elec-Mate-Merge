/**
 * Solar PV single-line diagram — generated from the design, not drawn.
 *
 * Deliberately schematic (BS EN 60617-style blocks): array strings → DC
 * isolator → inverter → AC isolator → generation meter → consumer unit.
 * Renders real design values (string config, voltages, inverter rating) so the
 * diagram is evidence, not decoration. Pure SVG — scales, prints, exports.
 */

import type { StringPlan } from '@/utils/renewables/designEngine';

interface SolarSLDProps {
  plan: StringPlan;
  panelName: string;
  inverterName: string;
  inverterKw: number;
  phases: 1 | 3;
  className?: string;
}

const STROKE = 'rgba(255,255,255,0.85)';
const DIM = 'rgba(255,255,255,0.55)';
const YELLOW = '#FACC15';

const trunc = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

export default function SolarSLD({
  plan,
  panelName,
  inverterName,
  inverterKw,
  phases,
  className,
}: SolarSLDProps) {
  const strings = Math.max(1, plan.strings);
  const shown = Math.min(strings, 3); // draw up to 3 string rows, then summarise
  const rowGap = 46;
  const topY = 72; // clear of the two-line title block
  const busY = topY + ((shown - 1) * rowGap) / 2; // inverter centre line
  const h = Math.max(220, topY + shown * rowGap + 96);

  const stringRow = (i: number) => {
    const y = topY + i * rowGap;
    return (
      <g key={i}>
        {/* panel block */}
        <rect x={16} y={y - 14} width={84} height={28} rx={4} fill="none" stroke={STROKE} />
        <line x1={16} y1={y} x2={100} y2={y} stroke={DIM} strokeDasharray="3 3" />
        <text x={58} y={y - 19} textAnchor="middle" fontSize={9} fill={DIM}>
          {plan.panelsPerString} in series
        </text>
        {/* string conductor to DC isolator */}
        <line x1={100} y1={y} x2={168} y2={y} stroke={STROKE} />
        {/* gPV fuse / OCPD tick where strings parallel */}
        {strings > 2 && (
          <rect x={118} y={y - 5} width={14} height={10} fill="none" stroke={STROKE} />
        )}
        {/* into DC isolator bus */}
        <line x1={168} y1={y} x2={168} y2={busY} stroke={STROKE} />
      </g>
    );
  };

  return (
    <svg
      viewBox={`0 0 560 ${h}`}
      role="img"
      aria-label="Single-line diagram of the PV system"
      className={className}
    >
      {/* title block */}
      <text x={16} y={20} fontSize={11} fontWeight={700} fill={STROKE}>
        SINGLE-LINE DIAGRAM
      </text>
      <text x={16} y={34} fontSize={9} fill={DIM}>
        {plan.panelCount} × {trunc(panelName, 44)} — {plan.kwp} kWp
      </text>

      {/* strings */}
      {Array.from({ length: shown }, (_, i) => stringRow(i))}
      {strings > shown && (
        <text x={58} y={topY + shown * rowGap - 18} fontSize={9} fill={YELLOW}>
          + {strings - shown} more string{strings - shown > 1 ? 's' : ''}
        </text>
      )}

      {/* DC isolator */}
      <line x1={168} y1={busY} x2={196} y2={busY} stroke={STROKE} />
      <line x1={196} y1={busY} x2={216} y2={busY - 12} stroke={STROKE} strokeWidth={1.5} />
      <circle cx={196} cy={busY} r={2.5} fill={STROKE} />
      <circle cx={218} cy={busY} r={2.5} fill={STROKE} />
      <text x={207} y={busY + 16} textAnchor="middle" fontSize={8.5} fill={DIM}>
        DC isolator
      </text>
      <text x={207} y={busY + 27} textAnchor="middle" fontSize={8} fill={DIM}>
        {plan.stringVocCold} V max
      </text>

      {/* inverter */}
      <line x1={218} y1={busY} x2={252} y2={busY} stroke={STROKE} />
      <rect x={252} y={busY - 26} width={92} height={52} rx={6} fill="none" stroke={YELLOW} />
      <line x1={252} y1={busY + 26} x2={344} y2={busY - 26} stroke={DIM} />
      <text x={272} y={busY - 8} fontSize={11} fill={STROKE}>
        ≂
      </text>
      <text x={326} y={busY + 17} fontSize={11} fill={STROKE}>
        ∿
      </text>
      <text x={298} y={busY + 40} textAnchor="middle" fontSize={8.5} fill={DIM}>
        {trunc(inverterName, 26)}
      </text>
      <text x={298} y={busY + 51} textAnchor="middle" fontSize={8} fill={DIM}>
        {inverterKw} kW · {phases === 3 ? '3φ 400 V' : '1φ 230 V'}
      </text>

      {/* AC isolator */}
      <line x1={344} y1={busY} x2={376} y2={busY} stroke={STROKE} />
      <line x1={376} y1={busY} x2={396} y2={busY - 12} stroke={STROKE} strokeWidth={1.5} />
      <circle cx={376} cy={busY} r={2.5} fill={STROKE} />
      <circle cx={398} cy={busY} r={2.5} fill={STROKE} />
      <text x={387} y={busY + 16} textAnchor="middle" fontSize={8.5} fill={DIM}>
        AC isolator
      </text>

      {/* generation meter */}
      <line x1={398} y1={busY} x2={428} y2={busY} stroke={STROKE} />
      <circle cx={444} cy={busY} r={16} fill="none" stroke={STROKE} />
      <text x={444} y={busY + 4} textAnchor="middle" fontSize={10} fill={STROKE}>
        kWh
      </text>
      <text x={444} y={busY + 32} textAnchor="middle" fontSize={8.5} fill={DIM}>
        Gen meter
      </text>

      {/* consumer unit */}
      <line x1={460} y1={busY} x2={488} y2={busY} stroke={STROKE} />
      <rect x={488} y={busY - 22} width={56} height={44} rx={5} fill="none" stroke={STROKE} />
      <line x1={500} y1={busY - 10} x2={500} y2={busY + 10} stroke={DIM} />
      <line x1={512} y1={busY - 10} x2={512} y2={busY + 10} stroke={DIM} />
      <line x1={524} y1={busY - 10} x2={524} y2={busY + 10} stroke={DIM} />
      <text x={516} y={busY + 36} textAnchor="middle" fontSize={8.5} fill={DIM}>
        Consumer unit
      </text>
    </svg>
  );
}
