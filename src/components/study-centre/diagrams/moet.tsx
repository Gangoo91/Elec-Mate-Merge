/**
 * MOET diagram family — industrial maintenance.
 *
 * Deliberately small. Diagrams are reserved for concepts that are genuinely
 * spatial or relational — a containment hierarchy, a grid of values. Anything
 * that is a sequence or a lookup belongs in a numbered list or an
 * <AppendixTable>: both read better, and a table is more accessible than SVG.
 * Four hand-built diagrams were removed from Module 1 on that basis.
 *
 * 🔴 MOBILE SIZING RULE — the reason every viewBox here is ~360 units wide.
 * An SVG scales uniformly to its container, so a wide viewBox shrinks its own
 * text on a phone. The first cut of these used 420–470 unit viewBoxes with
 * 9.5px labels; on a 390px phone that rendered at 7.5px and was unreadable.
 * Keep viewBox width at or under 360 so a phone renders these near 1:1 and a
 * desktop column scales them UP, and never set a font below 10.5 units.
 */

import { cn } from '@/lib/utils';
import { DiagramFrame } from '@/components/study-centre/diagrams';
import { COLOUR } from '@/components/study-centre/diagrams/tokens';

/** Widest a MOET diagram's viewBox may be. See the mobile sizing rule above. */
const VB = 360;

/* ─────────────────────────────────────────────────────────────────────
   ControlLayers — why a permit, safe isolation and LOTO are three things.
   Earns a diagram because the relationship is containment: the permit wraps
   LOTO, which wraps isolation. Prose states that; nesting shows it.
   ──────────────────────────────────────────────────────────────────── */

export function ControlLayers({ className }: { className?: string }) {
  // 46, not 34. Each band has to clear a 13px label AND an 11px sub-label:
  // the sub sits at +43 from the ring top, so anything under STEP 40 puts it
  // on top of the next ring's border. It did, on both phone and desktop.
  const STEP = 46;
  const layers = [
    { label: 'Permit to work', does: 'Manages the whole state', colour: COLOUR.yellow },
    { label: 'Lock-out / tag-out', does: 'Keeps it dead', colour: COLOUR.emerald },
    { label: 'Safe isolation', does: 'Makes it dead', colour: COLOUR.blue },
  ];
  const H = 10 + STEP * 4 + 62;

  return (
    <DiagramFrame
      eyebrow="Three layers, one system"
      maxWidth="max-w-[360px]"
      minWidth="min-w-0"
      className={cn('mx-auto max-w-[460px]', className)}
      caption={
        <>
          The permit is the outer wrapper, not the safeguard. Strip the inner two layers away and
          the permit protects nobody — it just documents a safety that was never created.
        </>
      }
    >
      <svg
        viewBox={`0 0 ${VB} ${H}`}
        className="w-full"
        role="img"
        aria-label="Three nested layers of control: safe isolation makes the plant dead, lock-out tag-out keeps it dead, and the permit to work manages the whole state."
      >
        <title>Permit, isolation and lock-out as three nested layers</title>
        {layers.map((l, i) => (
          <rect
            key={`ring-${l.label}`}
            x={8 + i * STEP}
            y={8 + i * STEP}
            width={VB - 16 - i * STEP * 2}
            height={H - 16 - i * STEP * 2}
            rx={11}
            fill="none"
            stroke={l.colour}
            strokeWidth={1.5}
            strokeOpacity={0.85}
          />
        ))}
        {layers.map((l, i) => (
          <g key={`label-${l.label}`}>
            <text
              x={20 + i * STEP}
              y={28 + i * STEP}
              fill={l.colour}
              fontSize={13}
              fontWeight={600}
            >
              {l.label}
            </text>
            <text x={20 + i * STEP} y={43 + i * STEP} fill={COLOUR.textDim} fontSize={11}>
              {l.does}
            </text>
          </g>
        ))}
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   RiskMatrix — the 5×5 grid used in 1.3.2. Earns a diagram because a grid of
   25 derived values is exactly what prose cannot carry. Scales and band
   boundaries come from that page's own tables, not a generic template.

   The axes carry NUMBERS only and the word scales live in the caption. That
   is deliberate: long severity words ("Catastrophic") forced a 100px gutter,
   which pushed the viewBox to 470 and shrank every cell on a phone. HTML
   caption text reflows and stays readable; SVG text does neither.
   ──────────────────────────────────────────────────────────────────── */

const BANDS = [
  { max: 2, label: 'Trivial', fill: '#34d399' },
  { max: 5, label: 'Tolerable', fill: '#a3e635' },
  { max: 12, label: 'Moderate', fill: '#facc15' },
  { max: 20, label: 'Substantial', fill: '#fb923c' },
  { max: 25, label: 'Intolerable', fill: '#f87171' },
];

const bandFor = (score: number) => BANDS.find((b) => score <= b.max) ?? BANDS[BANDS.length - 1];

export function RiskMatrix({ className }: { className?: string }) {
  const L = 26; // just wide enough for a single digit
  const T = 22;
  const CW = (VB - L - 8) / 5;
  const CH = 46;
  const H = T + CH * 5 + 34;

  return (
    <DiagramFrame
      eyebrow="5 × 5 risk matrix"
      maxWidth="max-w-[360px]"
      minWidth="min-w-0"
      className={cn('mx-auto max-w-[480px]', className)}
      caption={
        <>
          <span className="block">
            Severity (up) 1 Negligible · 2 Minor · 3 Moderate · 4 Major · 5 Catastrophic. Likelihood
            (across) 1 Rare · 2 Unlikely · 3 Possible · 4 Probable · 5 Almost certain.
          </span>
          <span className="mt-2 block">
            Score = likelihood × severity: 1–2 trivial, 3–5 tolerable, 6–12 moderate, 13–20
            substantial, 21–25 intolerable. Anything substantial or above is not work you may start,
            whatever the programme says.
          </span>
        </>
      }
    >
      <svg
        viewBox={`0 0 ${VB} ${H}`}
        className="w-full"
        role="img"
        aria-label="Five by five risk matrix. Severity one to five up the side, likelihood one to five across the bottom. Each cell shows likelihood multiplied by severity, from 1 in the bottom left to 25 in the top right, banded trivial through to intolerable."
      >
        <title>Risk matrix — likelihood against severity</title>
        <text x={0} y={12} fill={COLOUR.textDim} fontSize={10.5}>
          SEVERITY ↑
        </text>
        {[5, 4, 3, 2, 1].map((sev, r) => {
          const y = T + r * CH;
          return (
            <g key={sev}>
              <text x={L - 9} y={y + CH / 2 + 5} textAnchor="end" fill={COLOUR.text} fontSize={12}>
                {sev}
              </text>
              {[1, 2, 3, 4, 5].map((lik) => {
                const score = sev * lik;
                const b = bandFor(score);
                return (
                  <g key={lik}>
                    <rect
                      x={L + (lik - 1) * CW}
                      y={y}
                      width={CW - 2}
                      height={CH - 2}
                      rx={3}
                      fill={b.fill}
                      fillOpacity={0.9}
                    />
                    <text
                      x={L + (lik - 1) * CW + (CW - 2) / 2}
                      y={y + CH / 2 + 5}
                      textAnchor="middle"
                      fill="#111"
                      fontSize={14}
                      fontWeight={700}
                    >
                      {score}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
        {[1, 2, 3, 4, 5].map((lik) => (
          <text
            key={lik}
            x={L + (lik - 1) * CW + (CW - 2) / 2}
            y={T + CH * 5 + 16}
            textAnchor="middle"
            fill={COLOUR.text}
            fontSize={12}
          >
            {lik}
          </text>
        ))}
        <text x={VB} y={T + CH * 5 + 30} textAnchor="end" fill={COLOUR.textDim} fontSize={10.5}>
          LIKELIHOOD →
        </text>
      </svg>
    </DiagramFrame>
  );
}
