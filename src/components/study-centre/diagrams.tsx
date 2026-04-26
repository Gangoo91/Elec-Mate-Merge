/**
 * Editorial diagram library — Module 2 (Principles of Electrical Science).
 *
 * Pure SVG, no external deps. Each component drops inline into a Sub page
 * and matches the editorial tone of `learning.tsx` — dark container, top
 * hairline accent, optional eyebrow + caption, elec-yellow active strokes,
 * white wires at low opacity.
 *
 * Conventions:
 *   - Container: bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-2xl
 *   - Top accent: yellow → amber → orange hairline gradient
 *   - SVGs use viewBox + className="w-full" so they scale on mobile
 *   - Wires: stroke="white" stroke-opacity="0.6"
 *   - Active components: stroke="hsl(47 100% 50%)" stroke-width="2"
 *   - Grid lines (where used): stroke="white" stroke-opacity="0.06"
 *   - No interactivity in v1 — these are visual references only
 */

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────────────
   Shared frame — every diagram sits inside one of these.
   Keeps colour, accent, eyebrow + caption identical across the family.
   ──────────────────────────────────────────────────────────────────── */

interface DiagramFrameProps {
  children: ReactNode;
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
  /** Constrain the SVG width so wide circuits don't dominate the column. */
  maxWidth?: string;
}

function DiagramFrame({
  children,
  eyebrow,
  caption,
  className,
  maxWidth = 'max-w-[440px]',
}: DiagramFrameProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-[hsl(0_0%_10%)] border border-white/[0.06] p-4 sm:p-5',
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70" />
      {eyebrow && (
        <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-elec-yellow mb-3">
          {eyebrow}
        </div>
      )}
      <div className={cn('w-full mx-auto', maxWidth)}>{children}</div>
      {caption && (
        <div className="text-[12px] text-white/70 mt-3 leading-relaxed">{caption}</div>
      )}
    </div>
  );
}

/* Shared SVG colour tokens. */
const COLOUR = {
  wire: 'rgba(255,255,255,0.6)',
  wireFaint: 'rgba(255,255,255,0.3)',
  yellow: 'hsl(47 100% 50%)',
  grid: 'rgba(255,255,255,0.06)',
  text: 'white',
  textDim: 'rgba(255,255,255,0.7)',
  blue: '#60a5fa',
  orange: '#fb923c',
  emerald: '#34d399',
  red: '#f87171',
} as const;

/* ─────────────────────────────────────────────────────────────────────
   Reusable schematic primitives — drop into bigger circuits below.
   ──────────────────────────────────────────────────────────────────── */

/** Zig-zag resistor body (IEC rectangle variant), centred at (cx, cy). */
function ResistorRect({
  cx,
  cy,
  width = 56,
  height = 22,
  label,
  value,
}: {
  cx: number;
  cy: number;
  width?: number;
  height?: number;
  label?: string;
  value?: string;
}) {
  const x = cx - width / 2;
  const y = cy - height / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={3}
        fill="hsl(0 0% 10%)"
        stroke={COLOUR.yellow}
        strokeWidth={2}
      />
      {label && (
        <text
          x={cx}
          y={y - 8}
          textAnchor="middle"
          fill={COLOUR.text}
          fontSize={12}
          fontWeight={600}
        >
          {label}
        </text>
      )}
      {value && (
        <text
          x={cx}
          y={y + height + 14}
          textAnchor="middle"
          fill={COLOUR.textDim}
          fontSize={11}
        >
          {value}
        </text>
      )}
    </g>
  );
}

/** Battery / cell pair — long line = +, short thick line = −. */
function Battery({
  cx,
  cy,
  label,
  vertical = false,
}: {
  cx: number;
  cy: number;
  label?: string;
  vertical?: boolean;
}) {
  if (vertical) {
    return (
      <g>
        <line
          x1={cx - 14}
          y1={cy - 3}
          x2={cx + 14}
          y2={cy - 3}
          stroke={COLOUR.yellow}
          strokeWidth={2}
        />
        <line
          x1={cx - 8}
          y1={cy + 3}
          x2={cx + 8}
          y2={cy + 3}
          stroke={COLOUR.yellow}
          strokeWidth={4}
        />
        {label && (
          <text
            x={cx + 22}
            y={cy + 4}
            fill={COLOUR.text}
            fontSize={12}
            fontWeight={600}
          >
            {label}
          </text>
        )}
      </g>
    );
  }
  return (
    <g>
      <line
        x1={cx - 3}
        y1={cy - 14}
        x2={cx - 3}
        y2={cy + 14}
        stroke={COLOUR.yellow}
        strokeWidth={2}
      />
      <line
        x1={cx + 3}
        y1={cy - 8}
        x2={cx + 3}
        y2={cy + 8}
        stroke={COLOUR.yellow}
        strokeWidth={4}
      />
      {label && (
        <text
          x={cx}
          y={cy + 30}
          textAnchor="middle"
          fill={COLOUR.text}
          fontSize={12}
          fontWeight={600}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   1. SeriesCircuit — battery on the left, N resistors along the top.
   ──────────────────────────────────────────────────────────────────── */

interface SeriesCircuitProps {
  resistors?: { label: string; value: string }[];
  voltage?: string;
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function SeriesCircuit({
  resistors = [
    { label: 'R₁', value: '10 Ω' },
    { label: 'R₂', value: '20 Ω' },
    { label: 'R₃', value: '30 Ω' },
  ],
  voltage = '12 V',
  eyebrow = 'Series circuit',
  caption,
  className,
}: SeriesCircuitProps) {
  const W = 440;
  const H = 220;
  const padX = 40;
  const topY = 60;
  const botY = 160;
  const batteryX = padX + 20;

  // Distribute resistors evenly along the top wire after the battery.
  const wireStart = batteryX + 30;
  const wireEnd = W - padX;
  const span = wireEnd - wireStart;
  const step = span / resistors.length;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption}
      className={className}
      maxWidth="max-w-[460px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Top wire */}
        <line
          x1={wireStart}
          y1={topY}
          x2={wireEnd}
          y2={topY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        {/* Bottom wire */}
        <line
          x1={batteryX}
          y1={botY}
          x2={wireEnd}
          y2={botY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        {/* Right wire (down) */}
        <line
          x1={wireEnd}
          y1={topY}
          x2={wireEnd}
          y2={botY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        {/* Battery vertical drop */}
        <line
          x1={batteryX}
          y1={topY}
          x2={batteryX}
          y2={(topY + botY) / 2 - 14}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <line
          x1={batteryX}
          y1={(topY + botY) / 2 + 14}
          x2={batteryX}
          y2={botY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <Battery cx={batteryX} cy={(topY + botY) / 2} label={voltage} />

        {/* Resistors */}
        {resistors.map((r, i) => {
          const cx = wireStart + step * (i + 0.5);
          return (
            <ResistorRect
              key={i}
              cx={cx}
              cy={topY}
              label={r.label}
              value={r.value}
            />
          );
        })}

        {/* Current direction arrow on the bottom wire */}
        <g>
          <text
            x={(batteryX + wireEnd) / 2}
            y={botY + 22}
            textAnchor="middle"
            fill={COLOUR.textDim}
            fontSize={11}
          >
            current →
          </text>
        </g>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   2. ParallelCircuit — two rails, resistors stacked between them.
   ──────────────────────────────────────────────────────────────────── */

interface ParallelCircuitProps {
  resistors?: { label: string; value: string }[];
  voltage?: string;
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function ParallelCircuit({
  resistors = [
    { label: 'R₁', value: '10 Ω' },
    { label: 'R₂', value: '20 Ω' },
    { label: 'R₃', value: '30 Ω' },
  ],
  voltage = '12 V',
  eyebrow = 'Parallel circuit',
  caption,
  className,
}: ParallelCircuitProps) {
  const W = 440;
  const railX1 = 130;
  const railX2 = 350;
  const topY = 50;
  const rowGap = 60;
  const H = topY + rowGap * resistors.length + 50;
  const batteryX = 60;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption}
      className={className}
      maxWidth="max-w-[460px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Left rail */}
        <line
          x1={railX1}
          y1={topY}
          x2={railX1}
          y2={H - 40}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        {/* Right rail */}
        <line
          x1={railX2}
          y1={topY}
          x2={railX2}
          y2={H - 40}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />

        {/* Top connector from battery to left rail */}
        <line
          x1={batteryX}
          y1={topY}
          x2={railX1}
          y2={topY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        {/* Bottom connector from right rail back to battery */}
        <line
          x1={batteryX}
          y1={H - 40}
          x2={railX2}
          y2={H - 40}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />

        {/* Battery vertical */}
        <line
          x1={batteryX}
          y1={topY}
          x2={batteryX}
          y2={(topY + (H - 40)) / 2 - 14}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <line
          x1={batteryX}
          y1={(topY + (H - 40)) / 2 + 14}
          x2={batteryX}
          y2={H - 40}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <Battery cx={batteryX} cy={(topY + (H - 40)) / 2} label={voltage} />

        {/* Parallel branches */}
        {resistors.map((r, i) => {
          const y = topY + rowGap * (i + 0.5) + 15;
          const cx = (railX1 + railX2) / 2;
          return (
            <g key={i}>
              <line
                x1={railX1}
                y1={y}
                x2={cx - 28}
                y2={y}
                stroke={COLOUR.wire}
                strokeWidth={1.5}
              />
              <line
                x1={cx + 28}
                y1={y}
                x2={railX2}
                y2={y}
                stroke={COLOUR.wire}
                strokeWidth={1.5}
              />
              <ResistorRect cx={cx} cy={y} label={r.label} value={r.value} />
            </g>
          );
        })}
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   3. MixedCircuit — R1 in series with [R2 || R3].
   ──────────────────────────────────────────────────────────────────── */

interface MixedCircuitProps {
  voltage?: string;
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function MixedCircuit({
  voltage = '24 V',
  eyebrow = 'Series–parallel circuit',
  caption,
  className,
}: MixedCircuitProps) {
  const W = 460;
  const H = 240;
  const topY = 60;
  const botY = 180;
  const batteryX = 50;
  const r1X = 160;
  const branchLeftX = 260;
  const branchRightX = 380;
  const branchTopY = 95;
  const branchBotY = 145;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption}
      className={className}
      maxWidth="max-w-[480px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Outer top wire to R1, then to branch left */}
        <line
          x1={batteryX}
          y1={topY}
          x2={r1X - 28}
          y2={topY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <line
          x1={r1X + 28}
          y1={topY}
          x2={branchLeftX}
          y2={topY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        {/* Right wire down */}
        <line
          x1={branchRightX}
          y1={topY}
          x2={branchRightX}
          y2={botY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        {/* Bottom wire back to battery */}
        <line
          x1={batteryX}
          y1={botY}
          x2={branchRightX}
          y2={botY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />

        {/* Branch left vertical (joins top wire to top + bottom of parallel pair) */}
        <line
          x1={branchLeftX}
          y1={topY}
          x2={branchLeftX}
          y2={branchBotY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        {/* Top horizontal of parallel pair */}
        <line
          x1={branchLeftX}
          y1={branchTopY}
          x2={branchRightX}
          y2={branchTopY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        {/* Bottom horizontal of parallel pair */}
        <line
          x1={branchLeftX}
          y1={branchBotY}
          x2={branchRightX}
          y2={branchBotY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />

        {/* Battery */}
        <line
          x1={batteryX}
          y1={topY}
          x2={batteryX}
          y2={(topY + botY) / 2 - 14}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <line
          x1={batteryX}
          y1={(topY + botY) / 2 + 14}
          x2={batteryX}
          y2={botY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <Battery cx={batteryX} cy={(topY + botY) / 2} label={voltage} />

        {/* R1 */}
        <ResistorRect cx={r1X} cy={topY} label="R₁" value="10 Ω" />

        {/* R2 in parallel branch (top) */}
        <ResistorRect
          cx={(branchLeftX + branchRightX) / 2}
          cy={branchTopY}
          label="R₂"
          value="20 Ω"
          width={50}
        />
        {/* R3 in parallel branch (bottom) */}
        <ResistorRect
          cx={(branchLeftX + branchRightX) / 2}
          cy={branchBotY}
          label="R₃"
          value="30 Ω"
          width={50}
        />
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   4. OhmsLawTriangle — V on top, I × R underneath.
   variant rearranges which letter sits on top.
   ──────────────────────────────────────────────────────────────────── */

interface OhmsLawTriangleProps {
  variant?: 'V' | 'I' | 'R';
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function OhmsLawTriangle({
  variant = 'V',
  eyebrow = 'Ohm’s law',
  caption,
  className,
}: OhmsLawTriangleProps) {
  // top, bottom-left, bottom-right
  const layout: Record<typeof variant, { top: string; left: string; right: string; formula: string }> = {
    V: { top: 'V', left: 'I', right: 'R', formula: 'V = I × R' },
    I: { top: 'I', left: 'V', right: 'R', formula: 'I = V ÷ R' },
    R: { top: 'R', left: 'V', right: 'I', formula: 'R = V ÷ I' },
  };
  const { top, left, right, formula } = layout[variant];

  const W = 240;
  const H = 220;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? formula}
      className={className}
      maxWidth="max-w-[260px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Triangle outline */}
        <polygon
          points={`${W / 2},20 ${W - 30},${H - 30} 30,${H - 30}`}
          fill="hsl(0 0% 12%)"
          stroke={COLOUR.yellow}
          strokeWidth={2}
        />
        {/* Divider line — under the top letter, between bottom two */}
        <line
          x1={50}
          y1={120}
          x2={W - 50}
          y2={120}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        {/* Divider between bottom two letters */}
        <line
          x1={W / 2}
          y1={120}
          x2={W / 2}
          y2={H - 35}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />

        {/* Top letter (V is yellow, others white) */}
        <text
          x={W / 2}
          y={95}
          textAnchor="middle"
          fill={top === 'V' ? COLOUR.yellow : COLOUR.text}
          fontSize={42}
          fontWeight={700}
        >
          {top}
        </text>

        {/* Bottom-left letter */}
        <text
          x={W / 2 - 40}
          y={H - 50}
          textAnchor="middle"
          fill={left === 'V' ? COLOUR.yellow : COLOUR.text}
          fontSize={28}
          fontWeight={700}
        >
          {left}
        </text>

        {/* Multiplication / division glyph between them — notch out the
            vertical divider line behind it for legibility. */}
        <rect
          x={W / 2 - 9}
          y={H - 70}
          width={18}
          height={20}
          fill="hsl(0 0% 12%)"
        />
        <text
          x={W / 2}
          y={H - 55}
          textAnchor="middle"
          fill={COLOUR.textDim}
          fontSize={18}
          fontWeight={500}
        >
          {variant === 'V' ? '×' : '÷'}
        </text>

        {/* Bottom-right letter */}
        <text
          x={W / 2 + 40}
          y={H - 50}
          textAnchor="middle"
          fill={right === 'V' ? COLOUR.yellow : COLOUR.text}
          fontSize={28}
          fontWeight={700}
        >
          {right}
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   5. PowerTriangle — P on top, I × V underneath.
   AC variants: apparent (S = VA), true (P = W), reactive (Q = var).
   ──────────────────────────────────────────────────────────────────── */

interface PowerTriangleProps {
  variant?: 'dc' | 'apparent' | 'true' | 'reactive';
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function PowerTriangle({
  variant = 'dc',
  eyebrow,
  caption,
  className,
}: PowerTriangleProps) {
  // For DC: classic P = I × V triangle.
  // For AC: a right-angle vector triangle showing relationship between
  // true power (P, horizontal), reactive (Q, vertical) and apparent (S, hypotenuse).
  if (variant === 'dc') {
    const W = 240;
    const H = 220;
    const formula = 'P = I × V';
    return (
      <DiagramFrame
        eyebrow={eyebrow ?? 'Power triangle'}
        caption={caption ?? formula}
        className={className}
        maxWidth="max-w-[260px]"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <polygon
            points={`${W / 2},20 ${W - 30},${H - 30} 30,${H - 30}`}
            fill="hsl(0 0% 12%)"
            stroke={COLOUR.yellow}
            strokeWidth={2}
          />
          <line
            x1={50}
            y1={120}
            x2={W - 50}
            y2={120}
            stroke={COLOUR.wire}
            strokeWidth={1.5}
          />
          <line
            x1={W / 2}
            y1={120}
            x2={W / 2}
            y2={H - 35}
            stroke={COLOUR.wire}
            strokeWidth={1.5}
          />
          <text
            x={W / 2}
            y={95}
            textAnchor="middle"
            fill={COLOUR.yellow}
            fontSize={42}
            fontWeight={700}
          >
            P
          </text>
          <text
            x={W / 2 - 40}
            y={H - 50}
            textAnchor="middle"
            fill={COLOUR.text}
            fontSize={28}
            fontWeight={700}
          >
            I
          </text>
          {/* Notch behind the × so the vertical divider doesn't read through. */}
          <rect
            x={W / 2 - 9}
            y={H - 70}
            width={18}
            height={20}
            fill="hsl(0 0% 12%)"
          />
          <text
            x={W / 2}
            y={H - 55}
            textAnchor="middle"
            fill={COLOUR.textDim}
            fontSize={18}
            fontWeight={500}
          >
            ×
          </text>
          <text
            x={W / 2 + 40}
            y={H - 50}
            textAnchor="middle"
            fill={COLOUR.text}
            fontSize={28}
            fontWeight={700}
          >
            V
          </text>
        </svg>
      </DiagramFrame>
    );
  }

  // AC variants — vector triangle.
  const W = 320;
  const H = 220;
  const ox = 50;
  const oy = H - 40;
  const px = 240; // P (true power) — horizontal length
  const qy = 50; // Q (reactive) — vertical
  const dx = px - ox;
  const dy = oy - qy;

  const highlight = {
    apparent: { label: 'Apparent (S = VA)', formula: 'S = √(P² + Q²)' },
    true: { label: 'True (P = W)', formula: 'P = S × cos φ' },
    reactive: { label: 'Reactive (Q = var)', formula: 'Q = S × sin φ' },
  }[variant];

  const colour = (which: 'P' | 'Q' | 'S') => {
    if (variant === 'apparent' && which === 'S') return COLOUR.yellow;
    if (variant === 'true' && which === 'P') return COLOUR.yellow;
    if (variant === 'reactive' && which === 'Q') return COLOUR.yellow;
    return COLOUR.wire;
  };

  return (
    <DiagramFrame
      eyebrow={eyebrow ?? highlight.label}
      caption={caption ?? highlight.formula}
      className={className}
      maxWidth="max-w-[340px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* P — horizontal */}
        <line
          x1={ox}
          y1={oy}
          x2={px}
          y2={oy}
          stroke={colour('P')}
          strokeWidth={variant === 'true' ? 3 : 2}
        />
        {/* Q — vertical (drawn from end of P upwards) */}
        <line
          x1={px}
          y1={oy}
          x2={px}
          y2={qy}
          stroke={colour('Q')}
          strokeWidth={variant === 'reactive' ? 3 : 2}
        />
        {/* S — hypotenuse */}
        <line
          x1={ox}
          y1={oy}
          x2={px}
          y2={qy}
          stroke={colour('S')}
          strokeWidth={variant === 'apparent' ? 3 : 2}
        />

        {/* Right-angle marker */}
        <polyline
          points={`${px - 12},${oy} ${px - 12},${oy - 12} ${px},${oy - 12}`}
          fill="none"
          stroke={COLOUR.wireFaint}
          strokeWidth={1}
        />

        {/* Phase angle arc φ */}
        <path
          d={`M ${ox + 38} ${oy} A 38 38 0 0 0 ${ox + 38 * Math.cos(Math.atan2(dy, dx))} ${oy - 38 * Math.sin(Math.atan2(dy, dx))}`}
          fill="none"
          stroke={COLOUR.textDim}
          strokeWidth={1}
        />
        <text x={ox + 48} y={oy - 12} fill={COLOUR.textDim} fontSize={12}>
          φ
        </text>

        {/* Labels — S sits over the hypotenuse, so cut a notch with a small
            background rect matching the surface. */}
        <text x={(ox + px) / 2} y={oy + 18} textAnchor="middle" fill={COLOUR.text} fontSize={13} fontWeight={600}>
          P (W)
        </text>
        <text x={px + 10} y={(oy + qy) / 2} fill={COLOUR.text} fontSize={13} fontWeight={600}>
          Q (var)
        </text>
        <rect
          x={(ox + px) / 2 - 36}
          y={(oy + qy) / 2 - 22}
          width={56}
          height={20}
          fill="hsl(0 0% 10%)"
        />
        <text
          x={(ox + px) / 2 - 30}
          y={(oy + qy) / 2 - 6}
          fill={COLOUR.text}
          fontSize={13}
          fontWeight={600}
        >
          S (VA)
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   6. SineWave — single sine wave on a coordinate grid.
   ──────────────────────────────────────────────────────────────────── */

interface SineWaveProps {
  /** Visual amplitude in pixels (defaults to 60). */
  amplitude?: number;
  /** Number of full cycles drawn (default 2). */
  period?: number;
  /** y-axis label (default 'voltage'). */
  label?: string;
  /** Show amplitude + period markers. */
  markers?: boolean;
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function SineWave({
  amplitude = 60,
  period = 2,
  label = 'voltage',
  markers = true,
  eyebrow = 'AC sine wave',
  caption,
  className,
}: SineWaveProps) {
  const W = 440;
  const H = 220;
  const padL = 40;
  const padR = 20;
  const padT = 30;
  const padB = 40;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const midY = padT + plotH / 2;

  // Build the sine path.
  const samples = 200;
  const amp = Math.min(amplitude, plotH / 2 - 10);
  const path = Array.from({ length: samples + 1 }, (_, i) => {
    const t = i / samples;
    const x = padL + t * plotW;
    const y = midY - amp * Math.sin(t * period * Math.PI * 2);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');

  // Faint vertical grid lines at quarter-period intervals.
  const gridCount = period * 4;
  const gridStep = plotW / gridCount;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption}
      className={className}
      maxWidth="max-w-[460px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Faint vertical grid */}
        {Array.from({ length: gridCount + 1 }, (_, i) => (
          <line
            key={`vg-${i}`}
            x1={padL + i * gridStep}
            y1={padT}
            x2={padL + i * gridStep}
            y2={H - padB}
            stroke={COLOUR.grid}
            strokeWidth={1}
          />
        ))}
        {/* Faint horizontal grid */}
        {[-1, -0.5, 0.5, 1].map((m, i) => (
          <line
            key={`hg-${i}`}
            x1={padL}
            y1={midY - m * amp}
            x2={W - padR}
            y2={midY - m * amp}
            stroke={COLOUR.grid}
            strokeWidth={1}
          />
        ))}

        {/* Axes */}
        <line
          x1={padL}
          y1={midY}
          x2={W - padR}
          y2={midY}
          stroke={COLOUR.wire}
          strokeWidth={1}
        />
        <line
          x1={padL}
          y1={padT}
          x2={padL}
          y2={H - padB}
          stroke={COLOUR.wire}
          strokeWidth={1}
        />

        {/* Sine path */}
        <path
          d={path}
          fill="none"
          stroke={COLOUR.yellow}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Markers */}
        {markers && (
          <g>
            {/* Amplitude marker */}
            <line
              x1={padL + plotW / (period * 4)}
              y1={midY}
              x2={padL + plotW / (period * 4)}
              y2={midY - amp}
              stroke={COLOUR.wire}
              strokeWidth={1}
              strokeDasharray="3 3"
            />
            <text
              x={padL + plotW / (period * 4) + 6}
              y={midY - amp / 2}
              fill={COLOUR.textDim}
              fontSize={11}
            >
              amp
            </text>

            {/* Period marker — between two zero crossings of the same direction */}
            <line
              x1={padL}
              y1={midY + amp + 10}
              x2={padL + plotW / period}
              y2={midY + amp + 10}
              stroke={COLOUR.wire}
              strokeWidth={1}
            />
            <text
              x={padL + plotW / (period * 2)}
              y={midY + amp + 24}
              textAnchor="middle"
              fill={COLOUR.textDim}
              fontSize={11}
            >
              period (T)
            </text>
          </g>
        )}

        {/* Axis labels */}
        <text x={W - padR} y={midY - 6} textAnchor="end" fill={COLOUR.textDim} fontSize={11}>
          time →
        </text>
        <text
          x={padL + 6}
          y={padT + 12}
          fill={COLOUR.textDim}
          fontSize={11}
        >
          {label}
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   7. ThreePhaseWave — three sine waves offset 120°.
   ──────────────────────────────────────────────────────────────────── */

interface ThreePhaseWaveProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function ThreePhaseWave({
  eyebrow = 'Three-phase supply',
  caption,
  className,
}: ThreePhaseWaveProps) {
  const W = 460;
  const H = 240;
  const padL = 40;
  const padR = 20;
  const padT = 30;
  const padB = 50;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const midY = padT + plotH / 2;
  const amp = plotH / 2 - 16;
  const period = 2;
  const samples = 240;

  // Phase offsets in radians.
  const phases: { offset: number; colour: string; label: string }[] = [
    { offset: 0, colour: COLOUR.yellow, label: 'L1' },
    { offset: (Math.PI * 2) / 3, colour: COLOUR.blue, label: 'L2' },
    { offset: (Math.PI * 4) / 3, colour: COLOUR.orange, label: 'L3' },
  ];

  const buildPath = (offset: number) =>
    Array.from({ length: samples + 1 }, (_, i) => {
      const t = i / samples;
      const x = padL + t * plotW;
      const y = midY - amp * Math.sin(t * period * Math.PI * 2 + offset);
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(' ');

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption}
      className={className}
      maxWidth="max-w-[480px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Faint grid */}
        {Array.from({ length: period * 4 + 1 }, (_, i) => (
          <line
            key={`vg-${i}`}
            x1={padL + (i * plotW) / (period * 4)}
            y1={padT}
            x2={padL + (i * plotW) / (period * 4)}
            y2={H - padB}
            stroke={COLOUR.grid}
            strokeWidth={1}
          />
        ))}
        {[-1, -0.5, 0.5, 1].map((m, i) => (
          <line
            key={`hg-${i}`}
            x1={padL}
            y1={midY - m * amp}
            x2={W - padR}
            y2={midY - m * amp}
            stroke={COLOUR.grid}
            strokeWidth={1}
          />
        ))}

        {/* Axes */}
        <line x1={padL} y1={midY} x2={W - padR} y2={midY} stroke={COLOUR.wire} strokeWidth={1} />
        <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke={COLOUR.wire} strokeWidth={1} />

        {/* Three sine waves */}
        {phases.map((p, i) => (
          <path
            key={i}
            d={buildPath(p.offset)}
            fill="none"
            stroke={p.colour}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Legend */}
        <g transform={`translate(${padL}, ${H - 22})`}>
          {phases.map((p, i) => (
            <g key={i} transform={`translate(${i * 70}, 0)`}>
              <line x1={0} y1={0} x2={18} y2={0} stroke={p.colour} strokeWidth={3} />
              <text x={24} y={4} fill={COLOUR.text} fontSize={12} fontWeight={600}>
                {p.label}
              </text>
            </g>
          ))}
        </g>

        {/* 120° marker */}
        <text x={W - padR} y={padT + 12} textAnchor="end" fill={COLOUR.textDim} fontSize={11}>
          120° offset
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   8. MagneticField — vertical conductor with circular field lines.
   Dots = current out of page (up), crosses = into page (down).
   ──────────────────────────────────────────────────────────────────── */

interface MagneticFieldProps {
  direction?: 'up' | 'down';
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function MagneticField({
  direction = 'up',
  eyebrow = 'Magnetic field around a conductor',
  caption,
  className,
}: MagneticFieldProps) {
  const W = 320;
  const H = 240;
  const cx = W / 2;
  const cy = H / 2;

  // Right-hand rule: current up → field counter-clockwise (looking from above).
  // We render arrows on each circle showing direction of B.
  const ccw = direction === 'up';

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? (direction === 'up' ? 'Current flowing out of the page (towards you).' : 'Current flowing into the page (away from you).')}
      className={className}
      maxWidth="max-w-[340px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Concentric field circles */}
        {[40, 70, 100].map((r, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={COLOUR.wire}
            strokeOpacity={0.45 - i * 0.08}
            strokeWidth={1.2}
          />
        ))}

        {/* Direction arrowheads on each ring (placed at the right side of the
            circle). At the rightmost point of a circle the tangent runs vertical:
            for an anticlockwise (CCW) field — current out of page — it points UP.
            For a clockwise (CW) field — current into page — it points DOWN. */}
        {[40, 70, 100].map((r, i) => (
          <polygon
            key={`arr-${i}`}
            points={
              ccw
                ? `${cx + r},${cy - 7} ${cx + r - 5},${cy + 1} ${cx + r + 5},${cy + 1}`
                : `${cx + r},${cy + 7} ${cx + r - 5},${cy - 1} ${cx + r + 5},${cy - 1}`
            }
            fill={COLOUR.wire}
          />
        ))}

        {/* Conductor — circle viewed end-on */}
        <circle
          cx={cx}
          cy={cy}
          r={14}
          fill="hsl(0 0% 14%)"
          stroke={COLOUR.yellow}
          strokeWidth={2}
        />

        {/* Current direction symbol — dot or cross */}
        {direction === 'up' ? (
          <circle cx={cx} cy={cy} r={4} fill={COLOUR.yellow} />
        ) : (
          <g stroke={COLOUR.yellow} strokeWidth={2.5} strokeLinecap="round">
            <line x1={cx - 6} y1={cy - 6} x2={cx + 6} y2={cy + 6} />
            <line x1={cx + 6} y1={cy - 6} x2={cx - 6} y2={cy + 6} />
          </g>
        )}

        {/* Legend */}
        <text x={cx} y={H - 18} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
          {direction === 'up' ? '⊙ current out of page' : '⊗ current into page'}
        </text>
        <text x={cx + 110} y={cy - 8} fill={COLOUR.text} fontSize={11}>
          B
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   9. TransformerSchematic — primary and secondary windings + core.
   ──────────────────────────────────────────────────────────────────── */

interface TransformerSchematicProps {
  primary?: number;
  secondary?: number;
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function TransformerSchematic({
  primary = 230,
  secondary = 12,
  eyebrow = 'Transformer',
  caption,
  className,
}: TransformerSchematicProps) {
  const W = 380;
  const H = 220;
  const coreX1 = 160;
  const coreX2 = 220;
  const coreY1 = 30;
  const coreY2 = 190;
  const ratio = `${primary} : ${secondary}`;

  // Primary winding: 6 semi-circles on the left of the core.
  const renderWinding = (xCentre: number, side: 'left' | 'right') => {
    const arcs = 6;
    const spacing = (coreY2 - coreY1 - 20) / arcs;
    return Array.from({ length: arcs }, (_, i) => {
      const y = coreY1 + 10 + spacing * (i + 0.5);
      const sweep = side === 'left' ? 1 : 0;
      return (
        <path
          key={i}
          d={`M ${xCentre} ${y - spacing / 2} A ${spacing / 2} ${spacing / 2} 0 0 ${sweep} ${xCentre} ${y + spacing / 2}`}
          fill="none"
          stroke={COLOUR.yellow}
          strokeWidth={2}
        />
      );
    });
  };

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? `Turns ratio Np : Ns = ${ratio}`}
      className={className}
      maxWidth="max-w-[400px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Laminated core — vertical bars */}
        {[0, 8, 16, 24, 32, 40, 48].map((dx, i) => (
          <line
            key={i}
            x1={coreX1 + dx}
            y1={coreY1}
            x2={coreX1 + dx}
            y2={coreY2}
            stroke={COLOUR.wireFaint}
            strokeWidth={2}
          />
        ))}

        {/* Primary winding (left side) */}
        {renderWinding(coreX1 - 4, 'left')}
        {/* Secondary winding (right side) */}
        {renderWinding(coreX2 + 4, 'right')}

        {/* Primary terminals + lead wires */}
        <line
          x1={40}
          y1={50}
          x2={coreX1 - 10}
          y2={50}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <line
          x1={coreX1 - 10}
          y1={50}
          x2={coreX1 - 10}
          y2={coreY1 + 14}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <line
          x1={40}
          y1={170}
          x2={coreX1 - 10}
          y2={170}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <line
          x1={coreX1 - 10}
          y1={170}
          x2={coreX1 - 10}
          y2={coreY2 - 14}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <circle cx={40} cy={50} r={3} fill={COLOUR.yellow} />
        <circle cx={40} cy={170} r={3} fill={COLOUR.yellow} />

        {/* Secondary terminals + lead wires */}
        <line
          x1={coreX2 + 10}
          y1={coreY1 + 14}
          x2={coreX2 + 10}
          y2={50}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <line
          x1={coreX2 + 10}
          y1={50}
          x2={W - 40}
          y2={50}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <line
          x1={coreX2 + 10}
          y1={coreY2 - 14}
          x2={coreX2 + 10}
          y2={170}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <line
          x1={coreX2 + 10}
          y1={170}
          x2={W - 40}
          y2={170}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <circle cx={W - 40} cy={50} r={3} fill={COLOUR.yellow} />
        <circle cx={W - 40} cy={170} r={3} fill={COLOUR.yellow} />

        {/* Labels */}
        <text x={40} y={30} textAnchor="middle" fill={COLOUR.text} fontSize={12} fontWeight={600}>
          Primary
        </text>
        <text x={40} y={H - 10} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
          Np = {primary}
        </text>
        <text x={W - 40} y={30} textAnchor="middle" fill={COLOUR.text} fontSize={12} fontWeight={600}>
          Secondary
        </text>
        <text x={W - 40} y={H - 10} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
          Ns = {secondary}
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   10. Standalone IEC schematic symbols.
   All scale to a small inline glyph by default. Optional label below.
   ──────────────────────────────────────────────────────────────────── */

interface SymbolProps {
  label?: string;
  className?: string;
  size?: number;
}

function SymbolFrame({
  label,
  size = 80,
  children,
  className,
}: SymbolProps & { children: ReactNode }) {
  return (
    <div
      className={cn(
        'inline-flex flex-col items-center justify-center rounded-xl bg-[hsl(0_0%_10%)] border border-white/[0.06] p-3',
        className
      )}
      style={{ width: size + 24 }}
    >
      <svg
        viewBox="0 0 80 60"
        className="w-full h-auto"
        style={{ width: size, height: size * 0.75 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {children}
      </svg>
      {label && (
        <div className="mt-2 text-[11px] text-white/85 font-medium tracking-tight">
          {label}
        </div>
      )}
    </div>
  );
}

export function ResistorSymbol({ label = 'Resistor', size, className }: SymbolProps) {
  return (
    <SymbolFrame label={label} size={size} className={className}>
      <line x1={2} y1={30} x2={18} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
      <rect x={18} y={22} width={44} height={16} rx={2} fill="none" stroke={COLOUR.yellow} strokeWidth={2} />
      <line x1={62} y1={30} x2={78} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
    </SymbolFrame>
  );
}

export function CapacitorSymbol({ label = 'Capacitor', size, className }: SymbolProps) {
  return (
    <SymbolFrame label={label} size={size} className={className}>
      <line x1={2} y1={30} x2={36} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
      <line x1={36} y1={16} x2={36} y2={44} stroke={COLOUR.yellow} strokeWidth={2.5} />
      <line x1={44} y1={16} x2={44} y2={44} stroke={COLOUR.yellow} strokeWidth={2.5} />
      <line x1={44} y1={30} x2={78} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
    </SymbolFrame>
  );
}

export function InductorSymbol({ label = 'Inductor', size, className }: SymbolProps) {
  return (
    <SymbolFrame label={label} size={size} className={className}>
      <line x1={2} y1={30} x2={14} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M ${14 + i * 13} 30 A 6.5 6.5 0 0 1 ${27 + i * 13} 30`}
          fill="none"
          stroke={COLOUR.yellow}
          strokeWidth={2}
        />
      ))}
      <line x1={66} y1={30} x2={78} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
    </SymbolFrame>
  );
}

export function DiodeSymbol({ label = 'Diode', size, className }: SymbolProps) {
  return (
    <SymbolFrame label={label} size={size} className={className}>
      <line x1={2} y1={30} x2={32} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
      <polygon points="32,18 32,42 52,30" fill={COLOUR.yellow} stroke={COLOUR.yellow} strokeWidth={1.5} />
      <line x1={52} y1={18} x2={52} y2={42} stroke={COLOUR.yellow} strokeWidth={2.5} />
      <line x1={52} y1={30} x2={78} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
    </SymbolFrame>
  );
}

export function TransistorSymbol({ label = 'NPN transistor', size, className }: SymbolProps) {
  return (
    <SymbolFrame label={label} size={size} className={className}>
      {/* Base */}
      <line x1={2} y1={30} x2={28} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
      {/* Vertical bar at base junction */}
      <line x1={28} y1={14} x2={28} y2={46} stroke={COLOUR.yellow} strokeWidth={2.5} />
      {/* Collector (top) */}
      <line x1={28} y1={20} x2={56} y2={8} stroke={COLOUR.yellow} strokeWidth={1.8} />
      <line x1={56} y1={8} x2={56} y2={2} stroke={COLOUR.wire} strokeWidth={1.5} />
      {/* Emitter (bottom) with arrow — NPN: arrow points OUTWARD (away from base) */}
      <line x1={28} y1={40} x2={56} y2={52} stroke={COLOUR.yellow} strokeWidth={1.8} />
      <line x1={56} y1={52} x2={56} y2={58} stroke={COLOUR.wire} strokeWidth={1.5} />
      {/* Arrowhead pointing down-right along the emitter, away from the base */}
      <polygon points="56,52 48,49 51,46" fill={COLOUR.yellow} />
      {/* Circle */}
      <circle cx={42} cy={30} r={26} fill="none" stroke={COLOUR.wireFaint} strokeWidth={1} />
    </SymbolFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   11. VoltageDropDiagram — long cable run, V at each end, drop arrow.
   ──────────────────────────────────────────────────────────────────── */

interface VoltageDropDiagramProps {
  vSupply?: string;
  vLoad?: string;
  current?: string;
  length?: string;
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function VoltageDropDiagram({
  vSupply = '230 V',
  vLoad = '224 V',
  current = '20 A',
  length = '30 m',
  eyebrow = 'Voltage drop along a cable',
  caption,
  className,
}: VoltageDropDiagramProps) {
  const W = 480;
  const H = 220;
  const supplyX = 50;
  const loadX = 430;
  const cableY = 110;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'V_drop = I × R_per_metre × length × 2 (line + neutral)'}
      className={className}
      maxWidth="max-w-[500px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Supply box */}
        <rect
          x={supplyX - 30}
          y={cableY - 30}
          width={60}
          height={60}
          rx={6}
          fill="hsl(0 0% 12%)"
          stroke={COLOUR.yellow}
          strokeWidth={2}
        />
        <text x={supplyX} y={cableY + 5} textAnchor="middle" fill={COLOUR.text} fontSize={12} fontWeight={600}>
          Supply
        </text>

        {/* Load box */}
        <rect
          x={loadX - 30}
          y={cableY - 30}
          width={60}
          height={60}
          rx={6}
          fill="hsl(0 0% 12%)"
          stroke={COLOUR.yellow}
          strokeWidth={2}
        />
        <text x={loadX} y={cableY + 5} textAnchor="middle" fill={COLOUR.text} fontSize={12} fontWeight={600}>
          Load
        </text>

        {/* Cable: two parallel lines (line + neutral) */}
        <line
          x1={supplyX + 30}
          y1={cableY - 8}
          x2={loadX - 30}
          y2={cableY - 8}
          stroke={COLOUR.wire}
          strokeWidth={2}
        />
        <line
          x1={supplyX + 30}
          y1={cableY + 8}
          x2={loadX - 30}
          y2={cableY + 8}
          stroke={COLOUR.wire}
          strokeWidth={2}
        />

        {/* Length marker beneath cable */}
        <line
          x1={supplyX + 30}
          y1={cableY + 38}
          x2={loadX - 30}
          y2={cableY + 38}
          stroke={COLOUR.wireFaint}
          strokeWidth={1}
        />
        <line
          x1={supplyX + 30}
          y1={cableY + 32}
          x2={supplyX + 30}
          y2={cableY + 44}
          stroke={COLOUR.wireFaint}
          strokeWidth={1}
        />
        <line
          x1={loadX - 30}
          y1={cableY + 32}
          x2={loadX - 30}
          y2={cableY + 44}
          stroke={COLOUR.wireFaint}
          strokeWidth={1}
        />
        <text x={(supplyX + loadX) / 2} y={cableY + 58} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
          length = {length}
        </text>

        {/* Voltage labels above cable ends */}
        <text x={supplyX} y={cableY - 50} textAnchor="middle" fill={COLOUR.yellow} fontSize={13} fontWeight={700}>
          {vSupply}
        </text>
        <text x={loadX} y={cableY - 50} textAnchor="middle" fill={COLOUR.orange} fontSize={13} fontWeight={700}>
          {vLoad}
        </text>

        {/* Drop arrow between them */}
        <line
          x1={supplyX + 50}
          y1={cableY - 56}
          x2={loadX - 50}
          y2={cableY - 56}
          stroke={COLOUR.textDim}
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <polygon
          points={`${loadX - 50},${cableY - 60} ${loadX - 42},${cableY - 56} ${loadX - 50},${cableY - 52}`}
          fill={COLOUR.textDim}
        />
        <text x={(supplyX + loadX) / 2} y={cableY - 64} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
          V drops along cable
        </text>

        {/* Current label */}
        <text x={(supplyX + loadX) / 2} y={cableY - 18} textAnchor="middle" fill={COLOUR.text} fontSize={11}>
          I = {current}
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   12. KirchhoffVoltageLoop — loop with rises (battery) + drops (R).
   ΣV around any closed loop = 0.
   ──────────────────────────────────────────────────────────────────── */

interface KirchhoffVoltageLoopProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function KirchhoffVoltageLoop({
  eyebrow = 'Kirchhoff’s Voltage Law',
  caption,
  className,
}: KirchhoffVoltageLoopProps) {
  const W = 420;
  const H = 240;
  const topY = 60;
  const botY = 180;
  const leftX = 60;
  const rightX = 360;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Sum of EMF rises = sum of voltage drops around any closed loop. ΣV = 0.'}
      className={className}
      maxWidth="max-w-[440px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Loop wire */}
        <line x1={leftX} y1={topY} x2={rightX} y2={topY} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={rightX} y1={topY} x2={rightX} y2={botY} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={leftX} y1={botY} x2={rightX} y2={botY} stroke={COLOUR.wire} strokeWidth={1.5} />
        {/* Battery on the left vertical */}
        <line
          x1={leftX}
          y1={topY}
          x2={leftX}
          y2={(topY + botY) / 2 - 14}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <line
          x1={leftX}
          y1={(topY + botY) / 2 + 14}
          x2={leftX}
          y2={botY}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <Battery cx={leftX} cy={(topY + botY) / 2} label="+12 V (rise)" />

        {/* Two resistors along the top */}
        <ResistorRect cx={170} cy={topY} label="R₁" value="−4 V" />
        <ResistorRect cx={290} cy={topY} label="R₂" value="−8 V" />

        {/* Loop direction arrow (clockwise) */}
        <g stroke={COLOUR.emerald} strokeWidth={1.5} fill="none">
          <path
            d={`M ${(leftX + rightX) / 2 - 30} ${(topY + botY) / 2 + 8} A 18 18 0 1 1 ${(leftX + rightX) / 2 + 30} ${(topY + botY) / 2 + 8}`}
          />
          <polygon
            points={`${(leftX + rightX) / 2 + 30},${(topY + botY) / 2 + 4} ${(leftX + rightX) / 2 + 38},${(topY + botY) / 2 + 8} ${(leftX + rightX) / 2 + 30},${(topY + botY) / 2 + 12}`}
            fill={COLOUR.emerald}
            stroke="none"
          />
        </g>
        <text
          x={(leftX + rightX) / 2}
          y={(topY + botY) / 2 + 36}
          textAnchor="middle"
          fill={COLOUR.emerald}
          fontSize={11}
          fontWeight={600}
        >
          loop direction
        </text>

        {/* Sum line */}
        <text x={W / 2} y={H - 14} textAnchor="middle" fill={COLOUR.text} fontSize={12} fontWeight={600}>
          +12 V − 4 V − 8 V = 0
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ════════════ MECHANICS (LO3) ════════════
   ──────────────────────────────────────────────────────────────────── */

/* Shared arrowhead helper for vector diagrams. */
function ArrowMarker({
  x1,
  y1,
  x2,
  y2,
  colour = COLOUR.yellow,
  width = 2,
  label,
  labelOffset = 12,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  colour?: string;
  width?: number;
  label?: string;
  labelOffset?: number;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.max(1, Math.hypot(dx, dy));
  const ux = dx / len;
  const uy = dy / len;
  const headLen = 9;
  const headWide = 5;
  // Base of arrowhead
  const bx = x2 - ux * headLen;
  const by = y2 - uy * headLen;
  // Perpendicular
  const px = -uy;
  const py = ux;
  const lx = bx + px * headWide;
  const ly = by + py * headWide;
  const rx = bx - px * headWide;
  const ry = by - py * headWide;
  return (
    <g>
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={colour} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${lx},${ly} ${rx},${ry}`} fill={colour} />
      {label && (
        <text
          x={x2 + ux * labelOffset}
          y={y2 + uy * labelOffset + 4}
          textAnchor="middle"
          fill={COLOUR.text}
          fontSize={12}
          fontWeight={600}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   17. LeverDiagram — fulcrum + effort + load + distance markers.
   ──────────────────────────────────────────────────────────────────── */

interface LeverDiagramProps {
  leverClass?: 1 | 2 | 3;
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function LeverDiagram({
  leverClass = 1,
  eyebrow,
  caption,
  className,
}: LeverDiagramProps) {
  const W = 440;
  const H = 220;
  const beamY = 130;
  const beamLeft = 40;
  const beamRight = 400;

  // Position fulcrum, effort and load along the beam.
  // Class 1: fulcrum between effort and load (seesaw).
  // Class 2: load between fulcrum and effort (wheelbarrow).
  // Class 3: effort between fulcrum and load (forearm).
  const layout = {
    1: { fulcrumX: 220, effortX: 60, loadX: 380 },
    2: { fulcrumX: 60, effortX: 380, loadX: 220 },
    3: { fulcrumX: 60, effortX: 220, loadX: 380 },
  }[leverClass];

  return (
    <DiagramFrame
      eyebrow={eyebrow ?? `Class ${leverClass} lever`}
      caption={caption ?? 'Mechanical advantage = load ÷ effort = effort distance ÷ load distance.'}
      className={className}
      maxWidth="max-w-[460px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Beam */}
        <rect
          x={beamLeft}
          y={beamY - 6}
          width={beamRight - beamLeft}
          height={12}
          rx={2}
          fill="hsl(0 0% 14%)"
          stroke={COLOUR.yellow}
          strokeWidth={2}
        />

        {/* Fulcrum — triangle below beam */}
        <polygon
          points={`${layout.fulcrumX - 14},${beamY + 24} ${layout.fulcrumX + 14},${beamY + 24} ${layout.fulcrumX},${beamY + 6}`}
          fill="hsl(0 0% 14%)"
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <line
          x1={layout.fulcrumX - 28}
          y1={beamY + 26}
          x2={layout.fulcrumX + 28}
          y2={beamY + 26}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <text
          x={layout.fulcrumX}
          y={beamY + 48}
          textAnchor="middle"
          fill={COLOUR.textDim}
          fontSize={11}
        >
          fulcrum
        </text>

        {/* Effort arrow — pointing DOWN onto beam */}
        <ArrowMarker
          x1={layout.effortX}
          y1={40}
          x2={layout.effortX}
          y2={beamY - 8}
          colour={COLOUR.yellow}
          width={2.5}
        />
        <text
          x={layout.effortX}
          y={32}
          textAnchor="middle"
          fill={COLOUR.yellow}
          fontSize={12}
          fontWeight={700}
        >
          Effort
        </text>

        {/* Load arrow — pointing UP from beam (the load pulls down, beam pushes up) */}
        <ArrowMarker
          x1={layout.loadX}
          y1={40}
          x2={layout.loadX}
          y2={beamY - 8}
          colour={COLOUR.orange}
          width={2.5}
        />
        <text
          x={layout.loadX}
          y={32}
          textAnchor="middle"
          fill={COLOUR.orange}
          fontSize={12}
          fontWeight={700}
        >
          Load
        </text>

        {/* Distance markers below the fulcrum line */}
        <line
          x1={Math.min(layout.fulcrumX, layout.effortX)}
          y1={beamY + 70}
          x2={Math.max(layout.fulcrumX, layout.effortX)}
          y2={beamY + 70}
          stroke={COLOUR.wireFaint}
          strokeWidth={1}
        />
        <text
          x={(layout.fulcrumX + layout.effortX) / 2}
          y={beamY + 84}
          textAnchor="middle"
          fill={COLOUR.textDim}
          fontSize={11}
        >
          effort distance
        </text>

        <line
          x1={Math.min(layout.fulcrumX, layout.loadX)}
          y1={beamY + 56}
          x2={Math.max(layout.fulcrumX, layout.loadX)}
          y2={beamY + 56}
          stroke={COLOUR.wireFaint}
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <text
          x={(layout.fulcrumX + layout.loadX) / 2}
          y={beamY + 56 - 4}
          textAnchor="middle"
          fill={COLOUR.textDim}
          fontSize={11}
        >
          load distance
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   18. PulleySystem — single fixed, single movable, or compound.
   ──────────────────────────────────────────────────────────────────── */

interface PulleySystemProps {
  pulleys?: 1 | 2 | 3;
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function PulleySystem({
  pulleys = 1,
  eyebrow,
  caption,
  className,
}: PulleySystemProps) {
  const W = 360;
  const H = 280;

  // MA roughly = number of supporting rope segments between movable + fixed.
  const ma = pulleys === 1 ? 1 : pulleys === 2 ? 2 : 4;
  const titleByCount = {
    1: 'Single fixed pulley',
    2: 'Single movable pulley',
    3: 'Compound (block & tackle)',
  } as const;

  // Render a pulley wheel.
  const Wheel = ({ cx, cy, r = 18 }: { cx: number; cy: number; r?: number }) => (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="hsl(0 0% 14%)"
        stroke={COLOUR.yellow}
        strokeWidth={2}
      />
      <circle cx={cx} cy={cy} r={r - 5} fill="none" stroke={COLOUR.wire} strokeWidth={1} />
      <circle cx={cx} cy={cy} r={2.5} fill={COLOUR.yellow} />
    </g>
  );

  // Ceiling beam at the top
  const ceilingY = 30;
  const beamY = ceilingY + 8;

  return (
    <DiagramFrame
      eyebrow={eyebrow ?? titleByCount[pulleys]}
      caption={
        caption ??
        `Mechanical advantage ≈ ${ma}. Effort needed ≈ load ÷ ${ma}, but rope pulled is ${ma}× the load lift.`
      }
      className={className}
      maxWidth="max-w-[380px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Ceiling line */}
        <line x1={20} y1={ceilingY} x2={W - 20} y2={ceilingY} stroke={COLOUR.wire} strokeWidth={2} />
        {[30, 70, 110, 150, 190, 230, 270, 310].map((x) => (
          <line
            key={x}
            x1={x}
            y1={ceilingY - 6}
            x2={x - 6}
            y2={ceilingY}
            stroke={COLOUR.wireFaint}
            strokeWidth={1}
          />
        ))}

        {pulleys === 1 && (
          <g>
            {/* Single fixed pulley — wheel hangs from ceiling, rope over top */}
            <line x1={W / 2} y1={ceilingY} x2={W / 2} y2={beamY + 30} stroke={COLOUR.wire} strokeWidth={1.5} />
            <Wheel cx={W / 2} cy={beamY + 50} r={22} />
            {/* Effort rope (left side, hand pulls down) */}
            <line x1={W / 2 - 22} y1={beamY + 50} x2={W / 2 - 22} y2={H - 60} stroke={COLOUR.wire} strokeWidth={2} />
            <ArrowMarker x1={W / 2 - 22} y1={H - 80} x2={W / 2 - 22} y2={H - 30} colour={COLOUR.yellow} width={2.5} />
            <text x={W / 2 - 60} y={H - 50} fill={COLOUR.yellow} fontSize={12} fontWeight={700}>Effort</text>
            {/* Load rope (right side, weight hangs) */}
            <line x1={W / 2 + 22} y1={beamY + 50} x2={W / 2 + 22} y2={H - 70} stroke={COLOUR.wire} strokeWidth={2} />
            <rect
              x={W / 2 + 8}
              y={H - 70}
              width={28}
              height={28}
              fill="hsl(0 0% 14%)"
              stroke={COLOUR.orange}
              strokeWidth={2}
              rx={2}
            />
            <text x={W / 2 + 22} y={H - 52} textAnchor="middle" fill={COLOUR.orange} fontSize={11} fontWeight={700}>L</text>
            <text x={W / 2 + 70} y={H - 50} fill={COLOUR.orange} fontSize={12} fontWeight={700}>Load</text>
          </g>
        )}

        {pulleys === 2 && (
          <g>
            {/* Movable pulley — single wheel, both rope ends support load */}
            {/* Fixed end attached to ceiling on left */}
            <line x1={W / 2 - 60} y1={ceilingY} x2={W / 2 - 60} y2={beamY + 90} stroke={COLOUR.wire} strokeWidth={2} />
            {/* Rope goes around movable pulley */}
            <Wheel cx={W / 2 - 30} cy={beamY + 110} r={22} />
            {/* Right side rope goes UP to a fixed pulley at the ceiling */}
            <line x1={W / 2 - 8} y1={beamY + 110} x2={W / 2 - 8} y2={beamY + 30} stroke={COLOUR.wire} strokeWidth={2} />
            <Wheel cx={W / 2 + 14} cy={beamY + 30} r={18} />
            <line x1={W / 2 + 4} y1={ceilingY} x2={W / 2 + 14} y2={beamY + 12} stroke={COLOUR.wire} strokeWidth={1.5} />
            {/* Effort rope down from fixed pulley */}
            <line x1={W / 2 + 32} y1={beamY + 30} x2={W / 2 + 32} y2={H - 60} stroke={COLOUR.wire} strokeWidth={2} />
            <ArrowMarker x1={W / 2 + 32} y1={H - 80} x2={W / 2 + 32} y2={H - 30} colour={COLOUR.yellow} width={2.5} />
            <text x={W / 2 + 70} y={H - 50} fill={COLOUR.yellow} fontSize={12} fontWeight={700}>Effort</text>
            {/* Load suspended from movable pulley */}
            <line x1={W / 2 - 30} y1={beamY + 132} x2={W / 2 - 30} y2={H - 70} stroke={COLOUR.wire} strokeWidth={2} />
            <rect
              x={W / 2 - 50}
              y={H - 70}
              width={40}
              height={32}
              fill="hsl(0 0% 14%)"
              stroke={COLOUR.orange}
              strokeWidth={2}
              rx={2}
            />
            <text x={W / 2 - 30} y={H - 50} textAnchor="middle" fill={COLOUR.orange} fontSize={12} fontWeight={700}>Load</text>
          </g>
        )}

        {pulleys === 3 && (
          <g>
            {/* Compound: 2 fixed wheels at top, 2 movable wheels below — 4 supporting rope segments */}
            <Wheel cx={W / 2 - 22} cy={beamY + 30} r={18} />
            <Wheel cx={W / 2 + 22} cy={beamY + 30} r={18} />
            <line x1={W / 2 - 22} y1={ceilingY} x2={W / 2 - 22} y2={beamY + 12} stroke={COLOUR.wire} strokeWidth={1.5} />
            <line x1={W / 2 + 22} y1={ceilingY} x2={W / 2 + 22} y2={beamY + 12} stroke={COLOUR.wire} strokeWidth={1.5} />

            <Wheel cx={W / 2 - 22} cy={beamY + 110} r={18} />
            <Wheel cx={W / 2 + 22} cy={beamY + 110} r={18} />

            {/* Rope segments — 4 vertical between fixed and movable */}
            {[-40, -22, -4, 14, 32, 40].map((dx, i) => {
              if (i === 0 || i === 5) return null;
              return (
                <line
                  key={i}
                  x1={W / 2 + dx}
                  y1={beamY + 48}
                  x2={W / 2 + dx}
                  y2={beamY + 92}
                  stroke={COLOUR.wire}
                  strokeWidth={1.5}
                />
              );
            })}

            {/* Effort rope from rightmost top wheel down */}
            <line x1={W / 2 + 40} y1={beamY + 30} x2={W / 2 + 40} y2={H - 60} stroke={COLOUR.wire} strokeWidth={2} />
            <ArrowMarker x1={W / 2 + 40} y1={H - 80} x2={W / 2 + 40} y2={H - 30} colour={COLOUR.yellow} width={2.5} />
            <text x={W / 2 + 78} y={H - 50} fill={COLOUR.yellow} fontSize={12} fontWeight={700}>Effort</text>

            {/* Load suspended from movable block */}
            <line x1={W / 2} y1={beamY + 130} x2={W / 2} y2={H - 70} stroke={COLOUR.wire} strokeWidth={2} />
            <rect
              x={W / 2 - 22}
              y={H - 70}
              width={44}
              height={32}
              fill="hsl(0 0% 14%)"
              stroke={COLOUR.orange}
              strokeWidth={2}
              rx={2}
            />
            <text x={W / 2} y={H - 50} textAnchor="middle" fill={COLOUR.orange} fontSize={12} fontWeight={700}>Load</text>
          </g>
        )}

        <text
          x={W / 2}
          y={H - 8}
          textAnchor="middle"
          fill={COLOUR.text}
          fontSize={12}
          fontWeight={600}
        >
          MA ≈ {ma}
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   19. GearTrain — two interlocking gears with tooth counts + ratio.
   ──────────────────────────────────────────────────────────────────── */

interface GearTrainProps {
  driverTeeth?: number;
  drivenTeeth?: number;
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function GearTrain({
  driverTeeth = 12,
  drivenTeeth = 24,
  eyebrow = 'Gear train',
  caption,
  className,
}: GearTrainProps) {
  const W = 380;
  const H = 240;

  // Visual radii — pitch radius proportional to tooth count.
  const baseR = 32;
  const r1 = baseR * (driverTeeth / 18);
  const r2 = baseR * (drivenTeeth / 18);

  const cx1 = 110;
  const cx2 = cx1 + r1 + r2;
  const cy = H / 2;

  // Render simplified gear: pitch circle + N tooth marks
  const Gear = ({
    cx,
    cy,
    r,
    teeth,
    colour,
  }: {
    cx: number;
    cy: number;
    r: number;
    teeth: number;
    colour: string;
  }) => {
    const toothLen = 5;
    return (
      <g>
        {Array.from({ length: teeth }, (_, i) => {
          const angle = (i / teeth) * Math.PI * 2;
          const x1 = cx + Math.cos(angle) * r;
          const y1 = cy + Math.sin(angle) * r;
          const x2 = cx + Math.cos(angle) * (r + toothLen);
          const y2 = cy + Math.sin(angle) * (r + toothLen);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={colour}
              strokeWidth={2}
              strokeLinecap="round"
            />
          );
        })}
        <circle cx={cx} cy={cy} r={r} fill="hsl(0 0% 14%)" stroke={colour} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={4} fill={colour} />
      </g>
    );
  };

  const ratio = (drivenTeeth / driverTeeth).toFixed(2);

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={
        caption ??
        `Driver ${driverTeeth}T → Driven ${drivenTeeth}T. Ratio ${ratio}:1 — driven turns ${ratio}× slower with ${ratio}× the torque.`
      }
      className={className}
      maxWidth="max-w-[400px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <Gear cx={cx1} cy={cy} r={r1} teeth={driverTeeth} colour={COLOUR.yellow} />
        <Gear cx={cx2} cy={cy} r={r2} teeth={drivenTeeth} colour={COLOUR.orange} />

        {/* Rotation arrows — gears turn in opposite directions */}
        <g fill="none">
          <path
            d={`M ${cx1 - r1 - 14} ${cy} A ${r1 + 14} ${r1 + 14} 0 0 1 ${cx1} ${cy - r1 - 14}`}
            stroke={COLOUR.yellow}
            strokeWidth={1.5}
          />
          <polygon
            points={`${cx1 - 4},${cy - r1 - 14} ${cx1 + 4},${cy - r1 - 14} ${cx1},${cy - r1 - 22}`}
            fill={COLOUR.yellow}
          />
          <path
            d={`M ${cx2 + r2 + 14} ${cy} A ${r2 + 14} ${r2 + 14} 0 0 0 ${cx2} ${cy - r2 - 14}`}
            stroke={COLOUR.orange}
            strokeWidth={1.5}
          />
          <polygon
            points={`${cx2 - 4},${cy - r2 - 14} ${cx2 + 4},${cy - r2 - 14} ${cx2},${cy - r2 - 22}`}
            fill={COLOUR.orange}
          />
        </g>

        <text x={cx1} y={cy + r1 + 28} textAnchor="middle" fill={COLOUR.text} fontSize={12} fontWeight={600}>
          Driver
        </text>
        <text x={cx1} y={cy + r1 + 44} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
          {driverTeeth} teeth
        </text>
        <text x={cx2} y={cy + r2 + 28} textAnchor="middle" fill={COLOUR.text} fontSize={12} fontWeight={600}>
          Driven
        </text>
        <text x={cx2} y={cy + r2 + 44} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
          {drivenTeeth} teeth
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   20. ForceVectorDiagram — object with multiple force arrows.
   ──────────────────────────────────────────────────────────────────── */

interface ForceVectorDiagramProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function ForceVectorDiagram({
  eyebrow = 'Force vectors on a body',
  caption,
  className,
}: ForceVectorDiagramProps) {
  const W = 380;
  const H = 280;
  const cx = W / 2;
  const cy = H / 2;
  const boxSize = 56;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Resultant force = vector sum of all forces. If forces balance → ΣF = 0 (equilibrium).'}
      className={className}
      maxWidth="max-w-[400px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Ground line */}
        <line x1={20} y1={cy + boxSize / 2 + 4} x2={W - 20} y2={cy + boxSize / 2 + 4} stroke={COLOUR.wire} strokeWidth={1.5} />
        {[40, 80, 120, 160, 200, 240, 280, 320].map((x) => (
          <line
            key={x}
            x1={x}
            y1={cy + boxSize / 2 + 4}
            x2={x - 6}
            y2={cy + boxSize / 2 + 12}
            stroke={COLOUR.wireFaint}
            strokeWidth={1}
          />
        ))}

        {/* Object */}
        <rect
          x={cx - boxSize / 2}
          y={cy - boxSize / 2}
          width={boxSize}
          height={boxSize}
          rx={4}
          fill="hsl(0 0% 14%)"
          stroke={COLOUR.yellow}
          strokeWidth={2}
        />

        {/* Normal force — UP from top of box */}
        <ArrowMarker x1={cx} y1={cy - boxSize / 2} x2={cx} y2={cy - boxSize / 2 - 70} colour={COLOUR.emerald} width={2.5} label="N (normal)" labelOffset={14} />

        {/* Gravity — DOWN from centre */}
        <ArrowMarker x1={cx} y1={cy + boxSize / 2} x2={cx} y2={cy + boxSize / 2 + 70} colour={COLOUR.red} width={2.5} label="W = mg" labelOffset={14} />

        {/* Applied force — RIGHT from box */}
        <ArrowMarker x1={cx + boxSize / 2} y1={cy} x2={cx + boxSize / 2 + 80} y2={cy} colour={COLOUR.yellow} width={2.5} label="F (applied)" labelOffset={14} />

        {/* Friction — LEFT, opposing applied */}
        <ArrowMarker x1={cx - boxSize / 2} y1={cy + 12} x2={cx - boxSize / 2 - 60} y2={cy + 12} colour={COLOUR.orange} width={2.5} label="Fr" labelOffset={12} />
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   21. EnergyTransfer — KE ↔ PE on a slope.
   ──────────────────────────────────────────────────────────────────── */

interface EnergyTransferProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function EnergyTransfer({
  eyebrow = 'Energy transfer — PE → KE',
  caption,
  className,
}: EnergyTransferProps) {
  const W = 440;
  const H = 240;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'At the top: maximum PE, zero KE. At the bottom: zero PE, maximum KE. Total energy stays the same (ignoring friction).'}
      className={className}
      maxWidth="max-w-[460px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Slope */}
        <polygon
          points={`60,60 380,200 60,200`}
          fill="hsl(0 0% 14%)"
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        {/* Ground hatching */}
        <line x1={20} y1={200} x2={W - 20} y2={200} stroke={COLOUR.wire} strokeWidth={1.5} />

        {/* Ball at top */}
        <circle cx={70} cy={50} r={10} fill="hsl(0 0% 14%)" stroke={COLOUR.yellow} strokeWidth={2} />
        <text x={70} y={32} textAnchor="middle" fill={COLOUR.yellow} fontSize={11} fontWeight={700}>
          PE max
        </text>
        <text x={70} y={20} textAnchor="middle" fill={COLOUR.textDim} fontSize={10}>
          KE = 0
        </text>

        {/* Ball at bottom */}
        <circle cx={380} cy={190} r={10} fill="hsl(0 0% 14%)" stroke={COLOUR.orange} strokeWidth={2} />
        <text x={380} y={228} textAnchor="middle" fill={COLOUR.orange} fontSize={11} fontWeight={700}>
          KE max
        </text>
        <text x={380} y={216} textAnchor="middle" fill={COLOUR.textDim} fontSize={10}>
          PE = 0
        </text>

        {/* Trajectory arrow along slope */}
        <ArrowMarker x1={90} y1={62} x2={360} y2={186} colour={COLOUR.emerald} width={1.5} />

        {/* Height marker */}
        <line x1={30} y1={50} x2={30} y2={200} stroke={COLOUR.wireFaint} strokeWidth={1} />
        <line x1={26} y1={50} x2={34} y2={50} stroke={COLOUR.wireFaint} strokeWidth={1} />
        <line x1={26} y1={200} x2={34} y2={200} stroke={COLOUR.wireFaint} strokeWidth={1} />
        <text x={20} y={130} textAnchor="middle" fill={COLOUR.textDim} fontSize={11} transform="rotate(-90 20 130)">
          height (h)
        </text>

        <text x={W / 2} y={230} textAnchor="middle" fill={COLOUR.text} fontSize={12} fontWeight={600}>
          PE = mgh   ↔   KE = ½mv²
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ════════════ MAGNETISM (LO5) ════════════
   ──────────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────────────
   22. BarMagnet — N/S labelled bar with curved field lines.
   ──────────────────────────────────────────────────────────────────── */

interface BarMagnetProps {
  withCompass?: boolean;
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function BarMagnet({
  withCompass = false,
  eyebrow = 'Bar magnet field',
  caption,
  className,
}: BarMagnetProps) {
  const W = 440;
  const H = 260;
  const cx = W / 2;
  const cy = H / 2;
  const magW = 200;
  const magH = 60;

  // Field lines: arcs curving from N (right) round to S (left)
  const fieldArcs = [40, 70, 100, 130];

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Field lines run N → S externally and S → N inside the magnet. They never cross.'}
      className={className}
      maxWidth="max-w-[460px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Field lines — top arcs */}
        {fieldArcs.map((r, i) => (
          <path
            key={`top-${i}`}
            d={`M ${cx - magW / 2 + 6} ${cy} A ${r} ${r} 0 0 1 ${cx + magW / 2 - 6} ${cy}`}
            fill="none"
            stroke={COLOUR.wire}
            strokeOpacity={0.45 - i * 0.06}
            strokeWidth={1.2}
          />
        ))}
        {/* Field lines — bottom arcs */}
        {fieldArcs.map((r, i) => (
          <path
            key={`bot-${i}`}
            d={`M ${cx - magW / 2 + 6} ${cy} A ${r} ${r} 0 0 0 ${cx + magW / 2 - 6} ${cy}`}
            fill="none"
            stroke={COLOUR.wire}
            strokeOpacity={0.45 - i * 0.06}
            strokeWidth={1.2}
          />
        ))}

        {/* Field arrows — top of largest arc */}
        <polygon
          points={`${cx - 4},${cy - 130 + 2} ${cx + 4},${cy - 130 + 2} ${cx},${cy - 130 - 6}`}
          fill={COLOUR.wire}
        />
        <polygon
          points={`${cx - 4},${cy + 130 - 2} ${cx + 4},${cy + 130 - 2} ${cx},${cy + 130 + 6}`}
          fill={COLOUR.wire}
        />

        {/* Magnet body — split N (red) / S (blue) */}
        <rect
          x={cx - magW / 2}
          y={cy - magH / 2}
          width={magW / 2}
          height={magH}
          fill="hsl(220 70% 25%)"
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <rect
          x={cx}
          y={cy - magH / 2}
          width={magW / 2}
          height={magH}
          fill="hsl(0 70% 30%)"
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <text x={cx - magW / 4} y={cy + 7} textAnchor="middle" fill={COLOUR.text} fontSize={26} fontWeight={700}>
          S
        </text>
        <text x={cx + magW / 4} y={cy + 7} textAnchor="middle" fill={COLOUR.text} fontSize={26} fontWeight={700}>
          N
        </text>

        {withCompass && (
          <g>
            {/* Compass below the magnet, needle aligns with field */}
            <circle cx={cx + 60} cy={cy + 100} r={18} fill="hsl(0 0% 14%)" stroke={COLOUR.wire} strokeWidth={1.5} />
            <line
              x1={cx + 50}
              y1={cy + 100}
              x2={cx + 70}
              y2={cy + 100}
              stroke={COLOUR.red}
              strokeWidth={2.5}
            />
            <polygon points={`${cx + 70},${cy + 100} ${cx + 64},${cy + 96} ${cx + 64},${cy + 104}`} fill={COLOUR.red} />
            <text x={cx + 60} y={cy + 130} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
              compass
            </text>
          </g>
        )}
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   23. SolenoidField — coil with axial field through centre.
   ──────────────────────────────────────────────────────────────────── */

interface SolenoidFieldProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function SolenoidField({
  eyebrow = 'Solenoid (current-carrying coil)',
  caption,
  className,
}: SolenoidFieldProps) {
  const W = 460;
  const H = 240;
  const coilLeft = 110;
  const coilRight = 350;
  const coilTopY = 90;
  const coilBotY = 150;
  const turns = 6;
  const turnW = (coilRight - coilLeft) / turns;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Current through a coil produces a field like a bar magnet — N at one end, S at the other. Use the right-hand grip rule: fingers follow current, thumb points to N.'}
      className={className}
      maxWidth="max-w-[480px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Field lines — straight through middle, curving back outside */}
        <path
          d={`M ${coilLeft - 30} ${(coilTopY + coilBotY) / 2} L ${coilRight + 30} ${(coilTopY + coilBotY) / 2}`}
          stroke={COLOUR.wire}
          strokeWidth={1.5}
        />
        <polygon
          points={`${coilRight + 30},${(coilTopY + coilBotY) / 2 - 4} ${coilRight + 38},${(coilTopY + coilBotY) / 2} ${coilRight + 30},${(coilTopY + coilBotY) / 2 + 4}`}
          fill={COLOUR.wire}
        />
        {/* Outer field loops — top and bottom */}
        {[40, 70].map((r, i) => (
          <g key={i}>
            <path
              d={`M ${coilLeft - 20} ${(coilTopY + coilBotY) / 2} A ${(coilRight - coilLeft + 40) / 2} ${r} 0 0 1 ${coilRight + 20} ${(coilTopY + coilBotY) / 2}`}
              fill="none"
              stroke={COLOUR.wire}
              strokeOpacity={0.3 - i * 0.08}
              strokeWidth={1}
            />
            <path
              d={`M ${coilLeft - 20} ${(coilTopY + coilBotY) / 2} A ${(coilRight - coilLeft + 40) / 2} ${r} 0 0 0 ${coilRight + 20} ${(coilTopY + coilBotY) / 2}`}
              fill="none"
              stroke={COLOUR.wire}
              strokeOpacity={0.3 - i * 0.08}
              strokeWidth={1}
            />
          </g>
        ))}

        {/* Coil — N loops drawn as ovals/diagonal */}
        {Array.from({ length: turns }, (_, i) => {
          const x = coilLeft + i * turnW;
          return (
            <g key={i}>
              <ellipse
                cx={x + turnW / 2}
                cy={(coilTopY + coilBotY) / 2}
                rx={turnW / 2 - 1}
                ry={(coilBotY - coilTopY) / 2}
                fill="none"
                stroke={COLOUR.yellow}
                strokeWidth={2}
              />
            </g>
          );
        })}

        {/* End labels — N right, S left */}
        <text x={coilLeft - 50} y={(coilTopY + coilBotY) / 2 + 6} textAnchor="middle" fill={COLOUR.blue} fontSize={20} fontWeight={700}>
          S
        </text>
        <text x={coilRight + 56} y={(coilTopY + coilBotY) / 2 + 6} textAnchor="middle" fill={COLOUR.red} fontSize={20} fontWeight={700}>
          N
        </text>

        {/* Battery / current source at bottom */}
        <line x1={coilLeft} y1={coilBotY} x2={coilLeft} y2={H - 30} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={coilRight} y1={coilBotY} x2={coilRight} y2={H - 30} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={coilLeft} y1={H - 30} x2={coilRight} y2={H - 30} stroke={COLOUR.wire} strokeWidth={1.5} />
        <Battery cx={(coilLeft + coilRight) / 2} cy={H - 30} label="" />
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   24. RightHandGripRule — current up, hand symbol, fingers curl.
   ──────────────────────────────────────────────────────────────────── */

interface RightHandGripRuleProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function RightHandGripRule({
  eyebrow = 'Right-hand grip rule',
  caption,
  className,
}: RightHandGripRuleProps) {
  const W = 360;
  const H = 280;
  const cx = W / 2;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Thumb in the direction of current → curled fingers show the direction of the magnetic field around the conductor.'}
      className={className}
      maxWidth="max-w-[380px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Conductor — vertical, current up */}
        <line x1={cx} y1={40} x2={cx} y2={H - 30} stroke={COLOUR.yellow} strokeWidth={3} />
        <ArrowMarker x1={cx} y1={60} x2={cx} y2={30} colour={COLOUR.yellow} width={3} />
        <text x={cx + 14} y={36} fill={COLOUR.yellow} fontSize={12} fontWeight={700}>
          I (current)
        </text>

        {/* Curled fingers — three concentric ellipses around conductor */}
        {[40, 65, 90].map((rx, i) => (
          <g key={i}>
            <ellipse
              cx={cx}
              cy={140}
              rx={rx}
              ry={rx * 0.35}
              fill="none"
              stroke={COLOUR.wire}
              strokeOpacity={0.5 - i * 0.1}
              strokeWidth={1.4}
              strokeDasharray="4 3"
            />
            {/* Arrow on right side — anticlockwise from above means front face goes RIGHT-to-LEFT at the top.
                But viewed in 2D from behind: the field circles in a consistent rotation. We point arrows. */}
            <polygon
              points={`${cx + rx},${140 + 4} ${cx + rx - 6},${140 + 8} ${cx + rx + 6},${140 + 8}`}
              fill={COLOUR.wire}
              opacity={0.6}
            />
          </g>
        ))}

        {/* Field label */}
        <text x={cx + 110} y={148} fill={COLOUR.text} fontSize={12} fontWeight={600}>
          B (field)
        </text>

        {/* Hand pictogram — simple thumb-up icon */}
        <g transform={`translate(${cx - 130}, 180)`}>
          <rect x={0} y={20} width={36} height={48} rx={6} fill="hsl(0 0% 14%)" stroke={COLOUR.wire} strokeWidth={1.5} />
          <rect x={10} y={0} width={12} height={28} rx={4} fill="hsl(0 0% 14%)" stroke={COLOUR.yellow} strokeWidth={2} />
          <text x={18} y={84} textAnchor="middle" fill={COLOUR.textDim} fontSize={10}>
            right hand
          </text>
        </g>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   25. FlemingsLeftHandRule — three orthogonal axes (motor effect).
   ──────────────────────────────────────────────────────────────────── */

interface FlemingsRuleProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

function FlemingsAxes({
  hand,
  thumbLabel,
  firstLabel,
  secondLabel,
  thumbColour,
  firstColour,
  secondColour,
}: {
  hand: 'left' | 'right';
  thumbLabel: string;
  firstLabel: string;
  secondLabel: string;
  thumbColour: string;
  firstColour: string;
  secondColour: string;
}) {
  const W = 360;
  const H = 280;
  const ox = hand === 'left' ? 90 : 270;
  const oy = 200;

  // For LEFT hand: thumb up, first finger forward (into page → drawn going up-right), second finger right
  // For RIGHT hand: mirror — second finger LEFT
  const thumbEnd = { x: ox, y: oy - 130 };
  const firstEnd = { x: ox + (hand === 'left' ? 90 : -90), y: oy - 60 };
  const secondEnd = { x: ox + (hand === 'left' ? 110 : -110), y: oy };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {/* Axes */}
      <ArrowMarker x1={ox} y1={oy} x2={thumbEnd.x} y2={thumbEnd.y} colour={thumbColour} width={2.5} />
      <ArrowMarker x1={ox} y1={oy} x2={firstEnd.x} y2={firstEnd.y} colour={firstColour} width={2.5} />
      <ArrowMarker x1={ox} y1={oy} x2={secondEnd.x} y2={secondEnd.y} colour={secondColour} width={2.5} />

      {/* Labels */}
      <text x={thumbEnd.x + (hand === 'left' ? 8 : -8)} y={thumbEnd.y - 6} textAnchor={hand === 'left' ? 'start' : 'end'} fill={thumbColour} fontSize={12} fontWeight={700}>
        Thumb
      </text>
      <text x={thumbEnd.x + (hand === 'left' ? 8 : -8)} y={thumbEnd.y + 8} textAnchor={hand === 'left' ? 'start' : 'end'} fill={COLOUR.text} fontSize={11}>
        {thumbLabel}
      </text>

      <text x={firstEnd.x + (hand === 'left' ? 6 : -6)} y={firstEnd.y - 8} textAnchor={hand === 'left' ? 'start' : 'end'} fill={firstColour} fontSize={12} fontWeight={700}>
        First finger
      </text>
      <text x={firstEnd.x + (hand === 'left' ? 6 : -6)} y={firstEnd.y + 6} textAnchor={hand === 'left' ? 'start' : 'end'} fill={COLOUR.text} fontSize={11}>
        {firstLabel}
      </text>

      <text x={secondEnd.x + (hand === 'left' ? 6 : -6)} y={secondEnd.y - 6} textAnchor={hand === 'left' ? 'start' : 'end'} fill={secondColour} fontSize={12} fontWeight={700}>
        Second finger
      </text>
      <text x={secondEnd.x + (hand === 'left' ? 6 : -6)} y={secondEnd.y + 10} textAnchor={hand === 'left' ? 'start' : 'end'} fill={COLOUR.text} fontSize={11}>
        {secondLabel}
      </text>

      <text x={W / 2} y={H - 12} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
        {hand === 'left' ? 'LEFT hand — motor (force from current in field)' : 'RIGHT hand — generator (induced current from motion in field)'}
      </text>
    </svg>
  );
}

export function FlemingsLeftHandRule({
  eyebrow = 'Fleming’s left-hand rule (motor)',
  caption,
  className,
}: FlemingsRuleProps) {
  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Use the LEFT hand for motors. Hold thumb, first and second fingers at right angles. First → field, seCond → current, thuMb → motion.'}
      className={className}
      maxWidth="max-w-[380px]"
    >
      <FlemingsAxes
        hand="left"
        thumbLabel="Motion (force)"
        firstLabel="Field (N→S)"
        secondLabel="Current (+→−)"
        thumbColour={COLOUR.emerald}
        firstColour={COLOUR.blue}
        secondColour={COLOUR.yellow}
      />
    </DiagramFrame>
  );
}

/* 26. FlemingsRightHandRule — generator effect. */
export function FlemingsRightHandRule({
  eyebrow = 'Fleming’s right-hand rule (generator)',
  caption,
  className,
}: FlemingsRuleProps) {
  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Use the RIGHT hand for generators. Thumb → motion of conductor, first finger → field, second finger → induced current.'}
      className={className}
      maxWidth="max-w-[380px]"
    >
      <FlemingsAxes
        hand="right"
        thumbLabel="Motion"
        firstLabel="Field (N→S)"
        secondLabel="Induced current"
        thumbColour={COLOUR.emerald}
        firstColour={COLOUR.blue}
        secondColour={COLOUR.yellow}
      />
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   27. MotorEffect — current-carrying conductor between magnetic poles.
   ──────────────────────────────────────────────────────────────────── */

interface MotorEffectProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function MotorEffect({
  eyebrow = 'Motor effect',
  caption,
  className,
}: MotorEffectProps) {
  const W = 420;
  const H = 240;
  const cx = W / 2;
  const cy = H / 2;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Current-carrying conductor in a magnetic field experiences a force F = BIL (perpendicular to both field and current).'}
      className={className}
      maxWidth="max-w-[440px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* North pole — left */}
        <rect x={20} y={cy - 60} width={70} height={120} rx={4} fill="hsl(0 70% 30%)" stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={55} y={cy + 6} textAnchor="middle" fill={COLOUR.text} fontSize={22} fontWeight={700}>
          N
        </text>

        {/* South pole — right */}
        <rect x={W - 90} y={cy - 60} width={70} height={120} rx={4} fill="hsl(220 70% 25%)" stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={W - 55} y={cy + 6} textAnchor="middle" fill={COLOUR.text} fontSize={22} fontWeight={700}>
          S
        </text>

        {/* Field lines — N → S, drawn as horizontal arrows */}
        {[-30, -10, 10, 30].map((dy) => (
          <g key={dy}>
            <line x1={95} y1={cy + dy} x2={W - 100} y2={cy + dy} stroke={COLOUR.blue} strokeOpacity={0.45} strokeWidth={1} />
            <polygon points={`${W - 100},${cy + dy - 3} ${W - 92},${cy + dy} ${W - 100},${cy + dy + 3}`} fill={COLOUR.blue} opacity={0.45} />
          </g>
        ))}

        {/* Conductor — circle viewed end-on, current OUT of page (dot) */}
        <circle cx={cx} cy={cy} r={14} fill="hsl(0 0% 14%)" stroke={COLOUR.yellow} strokeWidth={2} />
        <circle cx={cx} cy={cy} r={4} fill={COLOUR.yellow} />

        {/* Force arrow — UP (perpendicular to both, by F=IL×B with current out + field N→S right) */}
        <ArrowMarker x1={cx} y1={cy - 18} x2={cx} y2={cy - 80} colour={COLOUR.emerald} width={3} />
        <text x={cx + 12} y={cy - 70} fill={COLOUR.emerald} fontSize={13} fontWeight={700}>
          F = BIL
        </text>

        {/* Legend */}
        <text x={cx} y={H - 12} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
          ⊙ current out of page · → field N→S · ↑ force
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   28. DCMotorSchematic — basic 2-pole DC motor.
   ──────────────────────────────────────────────────────────────────── */

interface DCMotorSchematicProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function DCMotorSchematic({
  eyebrow = 'DC motor',
  caption,
  className,
}: DCMotorSchematicProps) {
  const W = 420;
  const H = 280;
  const cx = W / 2;
  const cy = 130;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Commutator reverses current in the rotor coil every half-turn so the force always pushes the same way around → continuous rotation.'}
      className={className}
      maxWidth="max-w-[440px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Magnet poles */}
        <rect x={20} y={cy - 50} width={60} height={100} rx={4} fill="hsl(0 70% 30%)" stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={50} y={cy + 6} textAnchor="middle" fill={COLOUR.text} fontSize={20} fontWeight={700}>
          N
        </text>
        <rect x={W - 80} y={cy - 50} width={60} height={100} rx={4} fill="hsl(220 70% 25%)" stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={W - 50} y={cy + 6} textAnchor="middle" fill={COLOUR.text} fontSize={20} fontWeight={700}>
          S
        </text>

        {/* Rotor coil — rectangle */}
        <rect
          x={cx - 60}
          y={cy - 30}
          width={120}
          height={60}
          fill="none"
          stroke={COLOUR.yellow}
          strokeWidth={2}
          rx={4}
        />
        {/* Rotation arrow */}
        <path
          d={`M ${cx - 8} ${cy - 50} A 30 30 0 0 1 ${cx + 30} ${cy - 30}`}
          fill="none"
          stroke={COLOUR.emerald}
          strokeWidth={1.5}
        />
        <polygon points={`${cx + 30},${cy - 34} ${cx + 38},${cy - 28} ${cx + 26},${cy - 22}`} fill={COLOUR.emerald} />

        {/* Commutator — split ring at bottom of rotor */}
        <line x1={cx} y1={cy + 30} x2={cx} y2={cy + 70} stroke={COLOUR.wire} strokeWidth={1.5} />
        <path d={`M ${cx - 20} ${cy + 80} A 20 20 0 0 1 ${cx + 20} ${cy + 80}`} fill="none" stroke={COLOUR.yellow} strokeWidth={2.5} />
        <line x1={cx} y1={cy + 70} x2={cx} y2={cy + 80} stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={cx + 24} y={cy + 84} fill={COLOUR.textDim} fontSize={10}>
          commutator
        </text>

        {/* Brushes */}
        <line x1={cx - 28} y1={cy + 80} x2={cx - 50} y2={cy + 80} stroke={COLOUR.wire} strokeWidth={2} />
        <line x1={cx + 28} y1={cy + 80} x2={cx + 50} y2={cy + 80} stroke={COLOUR.wire} strokeWidth={2} />
        <text x={cx - 48} y={cy + 100} fill={COLOUR.textDim} fontSize={10} textAnchor="middle">
          brush
        </text>
        <text x={cx + 48} y={cy + 100} fill={COLOUR.textDim} fontSize={10} textAnchor="middle">
          brush
        </text>

        {/* DC supply */}
        <line x1={cx - 50} y1={cy + 80} x2={cx - 50} y2={cy + 130} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={cx + 50} y1={cy + 80} x2={cx + 50} y2={cy + 130} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={cx - 50} y1={cy + 130} x2={cx + 50} y2={cy + 130} stroke={COLOUR.wire} strokeWidth={1.5} />
        <Battery cx={cx} cy={cy + 130} label="DC supply" />
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   29. ACGenerator — single-loop generator + slip rings + sine snippet.
   ──────────────────────────────────────────────────────────────────── */

interface ACGeneratorProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function ACGenerator({
  eyebrow = 'AC generator (alternator)',
  caption,
  className,
}: ACGeneratorProps) {
  const W = 460;
  const H = 280;
  const motorCx = 130;
  const motorCy = 130;

  // Sine snippet on the right
  const sineLeft = 270;
  const sineW = 170;
  const sineMid = motorCy;
  const sineAmp = 40;
  const samples = 80;
  const sinePath = Array.from({ length: samples + 1 }, (_, i) => {
    const t = i / samples;
    const x = sineLeft + t * sineW;
    const y = sineMid - sineAmp * Math.sin(t * 2 * Math.PI);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Slip rings keep the rotating coil connected to a fixed circuit. Output reverses every half-turn → AC sine wave.'}
      className={className}
      maxWidth="max-w-[480px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Magnets */}
        <rect x={20} y={motorCy - 50} width={50} height={100} rx={4} fill="hsl(0 70% 30%)" stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={45} y={motorCy + 6} textAnchor="middle" fill={COLOUR.text} fontSize={18} fontWeight={700}>N</text>
        <rect x={210} y={motorCy - 50} width={50} height={100} rx={4} fill="hsl(220 70% 25%)" stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={235} y={motorCy + 6} textAnchor="middle" fill={COLOUR.text} fontSize={18} fontWeight={700}>S</text>

        {/* Rotor coil tilted — drawn as an angled rectangle */}
        <rect
          x={motorCx - 50}
          y={motorCy - 25}
          width={100}
          height={50}
          fill="none"
          stroke={COLOUR.yellow}
          strokeWidth={2}
          rx={3}
          transform={`rotate(-15 ${motorCx} ${motorCy})`}
        />
        {/* Rotation arrow */}
        <path
          d={`M ${motorCx - 8} ${motorCy - 50} A 30 30 0 0 1 ${motorCx + 30} ${motorCy - 30}`}
          fill="none"
          stroke={COLOUR.emerald}
          strokeWidth={1.5}
        />
        <polygon points={`${motorCx + 30},${motorCy - 34} ${motorCx + 38},${motorCy - 28} ${motorCx + 26},${motorCy - 22}`} fill={COLOUR.emerald} />

        {/* Slip rings — two solid circles below */}
        <circle cx={motorCx - 12} cy={motorCy + 70} r={10} fill="hsl(0 0% 14%)" stroke={COLOUR.yellow} strokeWidth={2} />
        <circle cx={motorCx + 12} cy={motorCy + 70} r={10} fill="hsl(0 0% 14%)" stroke={COLOUR.yellow} strokeWidth={2} />
        <text x={motorCx} y={motorCy + 96} textAnchor="middle" fill={COLOUR.textDim} fontSize={10}>
          slip rings
        </text>

        {/* Brushes + leads to load */}
        <line x1={motorCx - 22} y1={motorCy + 70} x2={motorCx - 60} y2={motorCy + 70} stroke={COLOUR.wire} strokeWidth={2} />
        <line x1={motorCx + 22} y1={motorCy + 70} x2={motorCx + 60} y2={motorCy + 70} stroke={COLOUR.wire} strokeWidth={2} />
        <line x1={motorCx - 60} y1={motorCy + 70} x2={motorCx - 60} y2={H - 30} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={motorCx + 60} y1={motorCy + 70} x2={motorCx + 60} y2={H - 30} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={motorCx - 60} y1={H - 30} x2={motorCx + 60} y2={H - 30} stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={motorCx} y={H - 14} textAnchor="middle" fill={COLOUR.textDim} fontSize={10}>
          load
        </text>

        {/* Sine output */}
        <line x1={sineLeft} y1={sineMid} x2={sineLeft + sineW} y2={sineMid} stroke={COLOUR.wire} strokeWidth={1} />
        <path d={sinePath} fill="none" stroke={COLOUR.yellow} strokeWidth={2} />
        <text x={sineLeft + sineW / 2} y={sineMid - sineAmp - 12} textAnchor="middle" fill={COLOUR.text} fontSize={12} fontWeight={600}>
          AC output
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   30. LenzLaw — magnet moving into coil with induced current opposing.
   ──────────────────────────────────────────────────────────────────── */

interface LenzLawProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function LenzLaw({
  eyebrow = 'Lenz’s law',
  caption,
  className,
}: LenzLawProps) {
  const W = 460;
  const H = 240;
  const cy = H / 2;
  const coilLeft = 220;
  const coilRight = 380;
  const turns = 5;
  const turnW = (coilRight - coilLeft) / turns;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'A moving magnet induces a current in a coil. The induced current creates a magnetic field that OPPOSES the change — pushes back against the magnet.'}
      className={className}
      maxWidth="max-w-[480px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Magnet — moving right */}
        <rect x={60} y={cy - 25} width={50} height={50} fill="hsl(220 70% 25%)" stroke={COLOUR.wire} strokeWidth={1.5} />
        <rect x={110} y={cy - 25} width={50} height={50} fill="hsl(0 70% 30%)" stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={85} y={cy + 6} textAnchor="middle" fill={COLOUR.text} fontSize={16} fontWeight={700}>S</text>
        <text x={135} y={cy + 6} textAnchor="middle" fill={COLOUR.text} fontSize={16} fontWeight={700}>N</text>

        {/* Motion arrow — magnet moving right */}
        <ArrowMarker x1={170} y1={cy} x2={210} y2={cy} colour={COLOUR.yellow} width={2.5} label="motion" labelOffset={14} />

        {/* Coil — drawn as ellipses */}
        {Array.from({ length: turns }, (_, i) => {
          const x = coilLeft + i * turnW;
          return (
            <ellipse
              key={i}
              cx={x + turnW / 2}
              cy={cy}
              rx={turnW / 2 - 1}
              ry={32}
              fill="none"
              stroke={COLOUR.yellow}
              strokeWidth={2}
            />
          );
        })}

        {/* Induced "N" pole on the LEFT end of the coil — opposes incoming N. */}
        <text x={coilLeft - 22} y={cy - 40} textAnchor="middle" fill={COLOUR.red} fontSize={14} fontWeight={700}>
          N
        </text>
        <text x={coilLeft - 22} y={cy - 26} textAnchor="middle" fill={COLOUR.textDim} fontSize={9}>
          (induced)
        </text>

        {/* Galvanometer / direction indicator */}
        <line x1={coilRight} y1={cy + 32} x2={coilRight + 30} y2={cy + 32} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={coilRight + 30} y1={cy + 32} x2={coilRight + 30} y2={cy + 60} stroke={COLOUR.wire} strokeWidth={1.5} />
        <circle cx={coilLeft - 50} cy={cy + 60} r={14} fill="hsl(0 0% 14%)" stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={coilLeft - 50} y={cy + 64} textAnchor="middle" fill={COLOUR.text} fontSize={10} fontWeight={700}>G</text>
        <line x1={coilLeft - 36} y1={cy + 60} x2={coilRight + 30} y2={cy + 60} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={coilLeft - 50} y1={cy + 32} x2={coilLeft - 50} y2={cy + 46} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={coilLeft - 50} y1={cy + 32} x2={coilLeft} y2={cy + 32} stroke={COLOUR.wire} strokeWidth={1.5} />

        {/* Caption arrow showing opposition */}
        <ArrowMarker x1={coilLeft - 4} y1={cy - 50} x2={coilLeft - 28} y2={cy - 50} colour={COLOUR.red} width={2} label="opposes" labelOffset={20} />
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   31. MagneticHysteresis — B-H loop curve.
   ──────────────────────────────────────────────────────────────────── */

interface MagneticHysteresisProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function MagneticHysteresis({
  eyebrow = 'Magnetic hysteresis (B-H loop)',
  caption,
  className,
}: MagneticHysteresisProps) {
  const W = 360;
  const H = 280;
  const cx = W / 2;
  const cy = H / 2;
  const ax = 130;
  const ay = 100;

  // Build the loop using a parametric s-curve traced in two halves.
  const upperPath = `M ${cx - ax} ${cy + 30}
                     C ${cx - ax + 30} ${cy - ay},
                       ${cx} ${cy - ay},
                       ${cx + ax} ${cy - ay + 10}`;
  const lowerPath = `M ${cx + ax} ${cy - 30}
                     C ${cx + ax - 30} ${cy + ay},
                       ${cx} ${cy + ay},
                       ${cx - ax} ${cy + ay - 10}`;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Flux density (B) lags the magnetising force (H). The area inside the loop = energy lost to heat each cycle (iron losses).'}
      className={className}
      maxWidth="max-w-[380px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Axes */}
        <line x1={cx - ax - 10} y1={cy} x2={cx + ax + 10} y2={cy} stroke={COLOUR.wire} strokeWidth={1} />
        <line x1={cx} y1={cy - ay - 10} x2={cx} y2={cy + ay + 10} stroke={COLOUR.wire} strokeWidth={1} />

        {/* Axis labels */}
        <text x={cx + ax + 14} y={cy + 4} fill={COLOUR.textDim} fontSize={11}>
          H
        </text>
        <text x={cx + 6} y={cy - ay - 12} fill={COLOUR.textDim} fontSize={11}>
          B
        </text>

        {/* Loop */}
        <path d={upperPath} fill="none" stroke={COLOUR.yellow} strokeWidth={2} />
        <path d={lowerPath} fill="none" stroke={COLOUR.orange} strokeWidth={2} />

        {/* Remanence (Br) — y-intercept on upper curve */}
        <circle cx={cx} cy={cy - 60} r={3} fill={COLOUR.emerald} />
        <text x={cx + 6} y={cy - 66} fill={COLOUR.emerald} fontSize={11}>
          Br (remanence)
        </text>

        {/* Coercivity (Hc) — x-intercept on lower curve */}
        <circle cx={cx - 50} cy={cy} r={3} fill={COLOUR.blue} />
        <text x={cx - 56} y={cy + 18} textAnchor="end" fill={COLOUR.blue} fontSize={11}>
          Hc (coercivity)
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ════════════ ELECTRONICS (LO6) ════════════
   ──────────────────────────────────────────────────────────────────── */

/* 32. LEDSymbol — diode + two arrows out (light emission). */
export function LEDSymbol({ label = 'LED', size, className }: SymbolProps) {
  return (
    <SymbolFrame label={label} size={size} className={className}>
      <line x1={2} y1={30} x2={28} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
      <polygon points="28,18 28,42 48,30" fill={COLOUR.yellow} stroke={COLOUR.yellow} strokeWidth={1.5} />
      <line x1={48} y1={18} x2={48} y2={42} stroke={COLOUR.yellow} strokeWidth={2.5} />
      <line x1={48} y1={30} x2={78} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
      {/* Two arrows pointing OUT (light emission) */}
      <g stroke={COLOUR.yellow} strokeWidth={1.5} fill="none">
        <line x1={36} y1={14} x2={44} y2={4} />
        <polygon points="44,4 38,6 41,11" fill={COLOUR.yellow} stroke="none" />
        <line x1={44} y1={16} x2={52} y2={6} />
        <polygon points="52,6 46,8 49,13" fill={COLOUR.yellow} stroke="none" />
      </g>
    </SymbolFrame>
  );
}

/* 33. ZenerDiodeSymbol — diode with bent cathode line. */
export function ZenerDiodeSymbol({ label = 'Zener diode', size, className }: SymbolProps) {
  return (
    <SymbolFrame label={label} size={size} className={className}>
      <line x1={2} y1={30} x2={32} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
      <polygon points="32,18 32,42 52,30" fill={COLOUR.yellow} stroke={COLOUR.yellow} strokeWidth={1.5} />
      {/* Bent cathode — Z-shape */}
      <polyline points="46,16 52,18 52,42 58,44" fill="none" stroke={COLOUR.yellow} strokeWidth={2.5} />
      <line x1={52} y1={30} x2={78} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
    </SymbolFrame>
  );
}

/* 34. BridgeRectifier — 4 diodes in bridge config. */
interface BridgeRectifierProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function BridgeRectifier({
  eyebrow = 'Bridge rectifier',
  caption,
  className,
}: BridgeRectifierProps) {
  const W = 360;
  const H = 280;
  const cx = W / 2;
  const cy = H / 2;
  const r = 70;

  // Diode helper at a given position + rotation (angle in degrees).
  const Diode = ({ x, y, rot }: { x: number; y: number; rot: number }) => (
    <g transform={`translate(${x}, ${y}) rotate(${rot})`}>
      <polygon points="-10,-7 -10,7 6,0" fill={COLOUR.yellow} stroke={COLOUR.yellow} strokeWidth={1.2} />
      <line x1={6} y1={-7} x2={6} y2={7} stroke={COLOUR.yellow} strokeWidth={2} />
    </g>
  );

  // Bridge nodes
  const N_top = { x: cx, y: cy - r };
  const N_bot = { x: cx, y: cy + r };
  const N_left = { x: cx - r, y: cy };
  const N_right = { x: cx + r, y: cy };

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Four-diode bridge converts AC to pulsating DC. Both halves of the AC cycle drive current through the load in the same direction.'}
      className={className}
      maxWidth="max-w-[380px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connecting wires — diamond bridge */}
        <line x1={N_top.x} y1={N_top.y} x2={N_left.x} y2={N_left.y} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={N_top.x} y1={N_top.y} x2={N_right.x} y2={N_right.y} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={N_bot.x} y1={N_bot.y} x2={N_left.x} y2={N_left.y} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={N_bot.x} y1={N_bot.y} x2={N_right.x} y2={N_right.y} stroke={COLOUR.wire} strokeWidth={1.5} />

        {/* 4 diodes — all cathodes point TOWARD +DC (top) and all anodes face
            the −DC node (bottom). Each diode's neutral cathode direction is +x;
            the rotation aligns it with the wire it sits on. */}
        {/* D1: left → top  (anode at left, cathode at top: up-right from D1) */}
        <Diode x={(N_left.x + N_top.x) / 2} y={(N_left.y + N_top.y) / 2} rot={-45} />
        {/* D2: right → top (anode at right, cathode at top: up-left from D2) */}
        <Diode x={(N_right.x + N_top.x) / 2} y={(N_right.y + N_top.y) / 2} rot={-135} />
        {/* D3: bottom → left (anode at bottom, cathode at left: down-left from D3) */}
        <Diode x={(N_bot.x + N_left.x) / 2} y={(N_bot.y + N_left.y) / 2} rot={-135} />
        {/* D4: bottom → right (anode at bottom, cathode at right: down-right from D4) */}
        <Diode x={(N_bot.x + N_right.x) / 2} y={(N_bot.y + N_right.y) / 2} rot={-45} />

        {/* AC input on left + right nodes */}
        <line x1={N_left.x} y1={N_left.y} x2={20} y2={cy} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={N_right.x} y1={N_right.y} x2={W - 20} y2={cy} stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={20} y={cy - 8} fill={COLOUR.blue} fontSize={12} fontWeight={700}>
          AC
        </text>
        <text x={W - 28} y={cy - 8} fill={COLOUR.blue} fontSize={12} fontWeight={700}>
          AC
        </text>

        {/* DC output on top (+) and bottom (−) */}
        <line x1={N_top.x} y1={N_top.y} x2={N_top.x} y2={20} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={N_bot.x} y1={N_bot.y} x2={N_bot.x} y2={H - 20} stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={cx + 10} y={24} fill={COLOUR.yellow} fontSize={13} fontWeight={700}>
          + DC
        </text>
        <text x={cx + 10} y={H - 8} fill={COLOUR.yellow} fontSize={13} fontWeight={700}>
          − DC
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* 35. RelaySymbol — coil + NO + NC contacts. */
export function RelaySymbol({ label = 'Relay (SPDT)', size, className }: SymbolProps) {
  return (
    <SymbolFrame label={label} size={(size ?? 80) * 1.4} className={className}>
      <svg viewBox="0 0 120 60" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
        {/* Coil */}
        <rect x={6} y={20} width={36} height={20} fill="none" stroke={COLOUR.yellow} strokeWidth={2} rx={2} />
        <line x1={2} y1={30} x2={6} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={42} y1={30} x2={46} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
        {/* Dashed link from coil to switch arm */}
        <line x1={24} y1={40} x2={70} y2={30} stroke={COLOUR.wire} strokeOpacity={0.5} strokeWidth={1} strokeDasharray="3 2" />
        {/* Pivot dot */}
        <circle cx={60} cy={30} r={2.5} fill={COLOUR.yellow} />
        {/* NC contact (top-right) */}
        <circle cx={106} cy={20} r={2.5} fill={COLOUR.wire} />
        {/* NO contact (bottom-right) */}
        <circle cx={106} cy={40} r={2.5} fill={COLOUR.wire} />
        {/* Switch arm — currently to NC */}
        <line x1={60} y1={30} x2={104} y2={20} stroke={COLOUR.yellow} strokeWidth={2} />
        {/* Common terminal lead */}
        <line x1={50} y1={30} x2={60} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
        {/* Output leads */}
        <line x1={106} y1={20} x2={118} y2={20} stroke={COLOUR.wire} strokeWidth={1.5} />
        <line x1={106} y1={40} x2={118} y2={40} stroke={COLOUR.wire} strokeWidth={1.5} />
        {/* Labels */}
        <text x={114} y={16} fill={COLOUR.textDim} fontSize={7}>NC</text>
        <text x={114} y={52} fill={COLOUR.textDim} fontSize={7}>NO</text>
      </svg>
    </SymbolFrame>
  );
}

/* 36. ContactorSymbol — three-phase contactor. */
export function ContactorSymbol({ label = '3-phase contactor', size, className }: SymbolProps) {
  return (
    <SymbolFrame label={label} size={(size ?? 80) * 1.4} className={className}>
      <svg viewBox="0 0 120 60" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
        {/* 3 contact pairs */}
        {[20, 50, 80].map((x) => (
          <g key={x}>
            <line x1={x} y1={4} x2={x} y2={20} stroke={COLOUR.wire} strokeWidth={1.5} />
            <circle cx={x} cy={22} r={2.2} fill={COLOUR.yellow} />
            <line x1={x} y1={22} x2={x + 12} y2={36} stroke={COLOUR.yellow} strokeWidth={2} />
            <circle cx={x + 12} cy={38} r={2.2} fill={COLOUR.yellow} />
            <line x1={x + 12} y1={38} x2={x + 12} y2={56} stroke={COLOUR.wire} strokeWidth={1.5} />
          </g>
        ))}
        {/* Coil link — dashed bar across all 3 */}
        <line x1={20} y1={30} x2={92} y2={30} stroke={COLOUR.wire} strokeOpacity={0.4} strokeWidth={1} strokeDasharray="3 2" />
        {/* Coil itself top-right */}
        <rect x={104} y={20} width={14} height={20} fill="none" stroke={COLOUR.yellow} strokeWidth={1.5} rx={2} />
        <text x={111} y={14} textAnchor="middle" fill={COLOUR.textDim} fontSize={6}>A1</text>
        <text x={111} y={50} textAnchor="middle" fill={COLOUR.textDim} fontSize={6}>A2</text>
      </svg>
    </SymbolFrame>
  );
}

/* 37. ThermistorSymbol — resistor with diagonal line + T. */
interface ThermistorProps extends SymbolProps {
  type?: 'NTC' | 'PTC';
}
export function ThermistorSymbol({ label, type = 'NTC', size, className }: ThermistorProps) {
  return (
    <SymbolFrame label={label ?? `Thermistor (${type})`} size={size} className={className}>
      <line x1={2} y1={30} x2={18} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
      <rect x={18} y={22} width={44} height={16} rx={2} fill="none" stroke={COLOUR.yellow} strokeWidth={2} />
      {/* Diagonal indicator line through resistor */}
      <line x1={12} y1={48} x2={50} y2={14} stroke={COLOUR.yellow} strokeWidth={1.5} />
      <text x={56} y={18} fill={COLOUR.text} fontSize={9} fontWeight={700}>
        t°{type === 'NTC' ? '↓' : '↑'}
      </text>
      <line x1={62} y1={30} x2={78} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
    </SymbolFrame>
  );
}

/* 38. LDRSymbol — resistor in circle with two arrows in. */
export function LDRSymbol({ label = 'LDR', size, className }: SymbolProps) {
  return (
    <SymbolFrame label={label} size={size} className={className}>
      <line x1={2} y1={30} x2={14} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
      <circle cx={40} cy={30} r={22} fill="none" stroke={COLOUR.wire} strokeWidth={1} />
      <rect x={20} y={22} width={40} height={16} rx={2} fill="none" stroke={COLOUR.yellow} strokeWidth={2} />
      <line x1={66} y1={30} x2={78} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
      {/* Two arrows pointing IN */}
      <g stroke={COLOUR.yellow} strokeWidth={1.5}>
        <line x1={20} y1={4} x2={28} y2={14} />
        <polygon points="28,14 22,12 25,7" fill={COLOUR.yellow} stroke="none" />
        <line x1={28} y1={2} x2={36} y2={12} />
        <polygon points="36,12 30,10 33,5" fill={COLOUR.yellow} stroke="none" />
      </g>
    </SymbolFrame>
  );
}

/* 39. SwitchSymbols — SPST / SPDT / DPDT / 2-way. */
interface SwitchSymbolsProps {
  type?: 'SPST' | 'SPDT' | 'DPDT' | '2-way';
  label?: string;
  size?: number;
  className?: string;
}

export function SwitchSymbols({
  type = 'SPST',
  label,
  size,
  className,
}: SwitchSymbolsProps) {
  const wide = type === 'DPDT' || type === 'SPDT' || type === '2-way';
  return (
    <SymbolFrame label={label ?? type} size={(size ?? 80) * (wide ? 1.4 : 1)} className={className}>
      <svg viewBox={wide ? '0 0 120 60' : '0 0 80 60'} preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
        {type === 'SPST' && (
          <g>
            <line x1={4} y1={30} x2={20} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
            <circle cx={22} cy={30} r={2.5} fill={COLOUR.yellow} />
            {/* open arm angled up */}
            <line x1={22} y1={30} x2={56} y2={14} stroke={COLOUR.yellow} strokeWidth={2} />
            <circle cx={58} cy={30} r={2.5} fill={COLOUR.yellow} />
            <line x1={58} y1={30} x2={76} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
          </g>
        )}
        {type === 'SPDT' && (
          <g>
            <line x1={4} y1={30} x2={28} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
            <circle cx={30} cy={30} r={2.5} fill={COLOUR.yellow} />
            <line x1={30} y1={30} x2={70} y2={18} stroke={COLOUR.yellow} strokeWidth={2} />
            <circle cx={72} cy={18} r={2.5} fill={COLOUR.yellow} />
            <circle cx={72} cy={42} r={2.5} fill={COLOUR.wire} />
            <line x1={72} y1={18} x2={116} y2={18} stroke={COLOUR.wire} strokeWidth={1.5} />
            <line x1={72} y1={42} x2={116} y2={42} stroke={COLOUR.wire} strokeWidth={1.5} />
          </g>
        )}
        {type === '2-way' && (
          <g>
            <line x1={4} y1={30} x2={28} y2={30} stroke={COLOUR.wire} strokeWidth={1.5} />
            <circle cx={30} cy={30} r={2.5} fill={COLOUR.yellow} />
            <line x1={30} y1={30} x2={70} y2={18} stroke={COLOUR.yellow} strokeWidth={2} />
            <circle cx={72} cy={18} r={2.5} fill={COLOUR.yellow} />
            <circle cx={72} cy={42} r={2.5} fill={COLOUR.yellow} />
            <line x1={72} y1={18} x2={116} y2={18} stroke={COLOUR.wire} strokeWidth={1.5} />
            <line x1={72} y1={42} x2={116} y2={42} stroke={COLOUR.wire} strokeWidth={1.5} />
            <text x={108} y={14} fill={COLOUR.textDim} fontSize={7}>L1</text>
            <text x={108} y={56} fill={COLOUR.textDim} fontSize={7}>L2</text>
          </g>
        )}
        {type === 'DPDT' && (
          <g>
            {/* Two ganged SPDTs */}
            {[12, 42].map((y) => (
              <g key={y}>
                <line x1={4} y1={y} x2={28} y2={y} stroke={COLOUR.wire} strokeWidth={1.5} />
                <circle cx={30} cy={y} r={2.5} fill={COLOUR.yellow} />
                <line x1={30} y1={y} x2={70} y2={y - 6} stroke={COLOUR.yellow} strokeWidth={2} />
                <circle cx={72} cy={y - 6} r={2.5} fill={COLOUR.yellow} />
                <circle cx={72} cy={y + 12} r={2.5} fill={COLOUR.wire} />
                <line x1={72} y1={y - 6} x2={116} y2={y - 6} stroke={COLOUR.wire} strokeWidth={1.5} />
                <line x1={72} y1={y + 12} x2={116} y2={y + 12} stroke={COLOUR.wire} strokeWidth={1.5} />
              </g>
            ))}
            {/* Mechanical link (dashed) */}
            <line x1={50} y1={6} x2={50} y2={36} stroke={COLOUR.wire} strokeOpacity={0.5} strokeWidth={1} strokeDasharray="3 2" />
          </g>
        )}
      </svg>
    </SymbolFrame>
  );
}

/* 40. RCChargingCurve — capacitor charge/discharge curve with τ. */
interface RCChargingCurveProps {
  mode?: 'charge' | 'discharge';
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function RCChargingCurve({
  mode = 'charge',
  eyebrow,
  caption,
  className,
}: RCChargingCurveProps) {
  const W = 380;
  const H = 240;
  const padL = 50;
  const padR = 30;
  const padT = 30;
  const padB = 50;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const samples = 100;
  // x ranges 0..5τ across plotW. τ at x = plotW/5.
  const tauPx = plotW / 5;

  const curve = Array.from({ length: samples + 1 }, (_, i) => {
    const t = (i / samples) * 5;
    const v = mode === 'charge' ? 1 - Math.exp(-t) : Math.exp(-t);
    const x = padL + (i / samples) * plotW;
    const y = padT + plotH - v * plotH;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');

  const titleByMode = {
    charge: 'Capacitor charging curve',
    discharge: 'Capacitor discharge curve',
  } as const;

  return (
    <DiagramFrame
      eyebrow={eyebrow ?? titleByMode[mode]}
      caption={
        caption ??
        (mode === 'charge'
          ? 'After 1τ the capacitor reaches 63% of supply. After 5τ it’s essentially fully charged. τ = R × C.'
          : 'After 1τ the capacitor falls to 37% of starting voltage. After 5τ it’s essentially discharged.')
      }
      className={className}
      maxWidth="max-w-[400px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid */}
        {[0.25, 0.5, 0.75].map((m, i) => (
          <line
            key={`hg-${i}`}
            x1={padL}
            y1={padT + plotH * m}
            x2={W - padR}
            y2={padT + plotH * m}
            stroke={COLOUR.grid}
            strokeWidth={1}
          />
        ))}
        {[1, 2, 3, 4].map((tau) => (
          <line
            key={`vg-${tau}`}
            x1={padL + tau * tauPx}
            y1={padT}
            x2={padL + tau * tauPx}
            y2={padT + plotH}
            stroke={COLOUR.grid}
            strokeWidth={1}
          />
        ))}

        {/* Axes */}
        <line x1={padL} y1={padT + plotH} x2={W - padR} y2={padT + plotH} stroke={COLOUR.wire} strokeWidth={1} />
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke={COLOUR.wire} strokeWidth={1} />

        {/* Curve */}
        <path d={curve} fill="none" stroke={COLOUR.yellow} strokeWidth={2.5} strokeLinecap="round" />

        {/* Mark τ */}
        <line
          x1={padL + tauPx}
          y1={padT + plotH * (mode === 'charge' ? 0.37 : 0.37)}
          x2={padL + tauPx}
          y2={padT + plotH}
          stroke={COLOUR.emerald}
          strokeWidth={1.2}
          strokeDasharray="3 2"
        />
        <text x={padL + tauPx} y={padT + plotH + 16} textAnchor="middle" fill={COLOUR.emerald} fontSize={11} fontWeight={700}>
          τ
        </text>
        <text x={padL + tauPx + 4} y={padT + plotH * (mode === 'charge' ? 0.37 - 0.04 : 0.4)} fill={COLOUR.emerald} fontSize={11}>
          {mode === 'charge' ? '63%' : '37%'}
        </text>

        {/* Axis labels */}
        <text x={W - padR} y={padT + plotH + 16} textAnchor="end" fill={COLOUR.textDim} fontSize={11}>
          time (multiples of τ)
        </text>
        <text x={padL - 8} y={padT + 12} textAnchor="end" fill={COLOUR.textDim} fontSize={11}>
          V
        </text>
        <text x={padL - 8} y={padT + plotH} textAnchor="end" fill={COLOUR.textDim} fontSize={11}>
          0
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* 41. HalfWaveRectified — input AC + output rectified DC. */
interface RectifiedWaveProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

function RectifiedWave({
  eyebrow,
  caption,
  className,
  mode,
}: RectifiedWaveProps & { mode: 'half' | 'full' }) {
  const W = 460;
  const H = 240;
  const padL = 40;
  const padR = 20;
  const padT = 30;
  const padB = 40;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const midY = padT + plotH / 2;
  const amp = plotH / 2 - 16;
  const period = 2;
  const samples = 240;

  const inputPath = Array.from({ length: samples + 1 }, (_, i) => {
    const t = i / samples;
    const x = padL + t * plotW;
    const y = midY - amp * Math.sin(t * period * Math.PI * 2);
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');

  const outputPath = Array.from({ length: samples + 1 }, (_, i) => {
    const t = i / samples;
    const raw = Math.sin(t * period * Math.PI * 2);
    const v = mode === 'half' ? Math.max(0, raw) : Math.abs(raw);
    const x = padL + t * plotW;
    const y = midY - amp * v;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');

  return (
    <DiagramFrame
      eyebrow={eyebrow ?? (mode === 'half' ? 'Half-wave rectification' : 'Full-wave rectification')}
      caption={
        caption ??
        (mode === 'half'
          ? 'Single diode — only the positive half of each AC cycle gets through. Output is pulsating DC, half the cycles missing.'
          : 'Bridge rectifier — both halves of each AC cycle drive current through the load in the same direction. Smoother DC.')
      }
      className={className}
      maxWidth="max-w-[480px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {Array.from({ length: period * 4 + 1 }, (_, i) => (
          <line
            key={`vg-${i}`}
            x1={padL + (i * plotW) / (period * 4)}
            y1={padT}
            x2={padL + (i * plotW) / (period * 4)}
            y2={H - padB}
            stroke={COLOUR.grid}
            strokeWidth={1}
          />
        ))}
        <line x1={padL} y1={midY} x2={W - padR} y2={midY} stroke={COLOUR.wire} strokeWidth={1} />
        <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke={COLOUR.wire} strokeWidth={1} />

        {/* Input AC — faint */}
        <path d={inputPath} fill="none" stroke={COLOUR.blue} strokeWidth={1.5} strokeOpacity={0.5} strokeDasharray="3 3" />
        {/* Output DC — yellow */}
        <path d={outputPath} fill="none" stroke={COLOUR.yellow} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* Legend */}
        <g transform={`translate(${padL + 8}, ${H - 16})`}>
          <line x1={0} y1={0} x2={20} y2={0} stroke={COLOUR.blue} strokeOpacity={0.6} strokeWidth={2} strokeDasharray="3 3" />
          <text x={26} y={4} fill={COLOUR.text} fontSize={11}>AC input</text>
          <line x1={110} y1={0} x2={130} y2={0} stroke={COLOUR.yellow} strokeWidth={2.5} />
          <text x={136} y={4} fill={COLOUR.text} fontSize={11}>{mode === 'half' ? 'Half-wave DC' : 'Full-wave DC'}</text>
        </g>
      </svg>
    </DiagramFrame>
  );
}

export function HalfWaveRectified(props: RectifiedWaveProps) {
  return <RectifiedWave {...props} mode="half" />;
}

export function FullWaveRectified(props: RectifiedWaveProps) {
  return <RectifiedWave {...props} mode="full" />;
}

/* ─────────────────────────────────────────────────────────────────────
   ════════════ BONUS — Modules 3, 4, 6 ════════════
   ──────────────────────────────────────────────────────────────────── */

/* 42. EarthingSystemDiagram — TN-S / TN-C-S / TT / IT */
interface EarthingSystemDiagramProps {
  system?: 'TN-S' | 'TN-C-S' | 'TT' | 'IT';
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function EarthingSystemDiagram({
  system = 'TN-C-S',
  eyebrow,
  caption,
  className,
}: EarthingSystemDiagramProps) {
  const W = 460;
  const H = 280;
  // Layout: source (left) → service cable → installation (right)
  const sourceX = 70;
  const cuX = 360;
  const ridgeY = 90;

  const blurbs = {
    'TN-S': 'Separate neutral and protective earth conductor all the way from the source. Earth provided as a metallic sheath of the supply cable.',
    'TN-C-S': 'Combined N + PE in the supply (PEN), separated at the service position into N and PE. Most common UK domestic system (PME).',
    'TT': 'No earth from the supplier. Installation has its own earth electrode in the ground. Requires RCD protection at origin.',
    'IT': 'Source not directly earthed (or via high impedance). Used in industrial / medical environments where supply continuity matters more than fault current.',
  };

  return (
    <DiagramFrame
      eyebrow={eyebrow ?? `Earthing system — ${system}`}
      caption={caption ?? blurbs[system]}
      className={className}
      maxWidth="max-w-[480px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Transformer — left */}
        <rect x={sourceX - 40} y={ridgeY - 30} width={80} height={70} rx={4} fill="hsl(0 0% 14%)" stroke={COLOUR.yellow} strokeWidth={2} />
        <text x={sourceX} y={ridgeY + 6} textAnchor="middle" fill={COLOUR.text} fontSize={11} fontWeight={600}>
          DNO
        </text>
        <text x={sourceX} y={ridgeY + 22} textAnchor="middle" fill={COLOUR.textDim} fontSize={10}>
          source
        </text>

        {/* Source earth (star point) — earth electrode below transformer for TN-S and TN-C-S */}
        {(system === 'TN-S' || system === 'TN-C-S') && (
          <g>
            <line x1={sourceX} y1={ridgeY + 40} x2={sourceX} y2={ridgeY + 80} stroke={COLOUR.emerald} strokeWidth={1.5} />
            {/* Earth symbol */}
            <line x1={sourceX - 14} y1={ridgeY + 80} x2={sourceX + 14} y2={ridgeY + 80} stroke={COLOUR.emerald} strokeWidth={2} />
            <line x1={sourceX - 9} y1={ridgeY + 86} x2={sourceX + 9} y2={ridgeY + 86} stroke={COLOUR.emerald} strokeWidth={2} />
            <line x1={sourceX - 5} y1={ridgeY + 92} x2={sourceX + 5} y2={ridgeY + 92} stroke={COLOUR.emerald} strokeWidth={2} />
          </g>
        )}

        {/* Supply cable — L (yellow) + N + PE depending on system */}
        {/* Line conductor */}
        <line x1={sourceX + 40} y1={ridgeY - 16} x2={cuX} y2={ridgeY - 16} stroke={COLOUR.yellow} strokeWidth={2} />
        <text x={(sourceX + cuX) / 2} y={ridgeY - 22} textAnchor="middle" fill={COLOUR.yellow} fontSize={10} fontWeight={700}>L</text>

        {/* Neutral or combined PEN */}
        {system === 'TN-C-S' ? (
          <g>
            <line x1={sourceX + 40} y1={ridgeY} x2={cuX - 60} y2={ridgeY} stroke={COLOUR.blue} strokeWidth={2} />
            <text x={(sourceX + cuX) / 2 - 50} y={ridgeY + 14} textAnchor="middle" fill={COLOUR.blue} fontSize={10} fontWeight={700}>PEN</text>
            {/* Split point */}
            <circle cx={cuX - 60} cy={ridgeY} r={3} fill={COLOUR.blue} />
            <line x1={cuX - 60} y1={ridgeY} x2={cuX} y2={ridgeY} stroke={COLOUR.blue} strokeWidth={2} />
            <line x1={cuX - 60} y1={ridgeY} x2={cuX - 60} y2={ridgeY + 22} stroke={COLOUR.emerald} strokeWidth={2} />
            <line x1={cuX - 60} y1={ridgeY + 22} x2={cuX} y2={ridgeY + 22} stroke={COLOUR.emerald} strokeWidth={2} />
            <text x={cuX - 30} y={ridgeY - 4} textAnchor="middle" fill={COLOUR.blue} fontSize={9} fontWeight={700}>N</text>
            <text x={cuX - 30} y={ridgeY + 36} textAnchor="middle" fill={COLOUR.emerald} fontSize={9} fontWeight={700}>PE</text>
          </g>
        ) : (
          <g>
            <line x1={sourceX + 40} y1={ridgeY} x2={cuX} y2={ridgeY} stroke={COLOUR.blue} strokeWidth={2} />
            <text x={(sourceX + cuX) / 2} y={ridgeY + 14} textAnchor="middle" fill={COLOUR.blue} fontSize={10} fontWeight={700}>N</text>
          </g>
        )}

        {/* Separate PE for TN-S */}
        {system === 'TN-S' && (
          <g>
            <line x1={sourceX + 40} y1={ridgeY + 22} x2={cuX} y2={ridgeY + 22} stroke={COLOUR.emerald} strokeWidth={2} />
            <text x={(sourceX + cuX) / 2} y={ridgeY + 36} textAnchor="middle" fill={COLOUR.emerald} fontSize={10} fontWeight={700}>PE (sheath)</text>
          </g>
        )}

        {/* Consumer unit */}
        <rect x={cuX} y={ridgeY - 30} width={70} height={70} rx={4} fill="hsl(0 0% 14%)" stroke={COLOUR.yellow} strokeWidth={2} />
        <text x={cuX + 35} y={ridgeY + 6} textAnchor="middle" fill={COLOUR.text} fontSize={11} fontWeight={600}>CU</text>

        {/* Local installation earth electrode for TT and IT */}
        {(system === 'TT' || system === 'IT') && (
          <g>
            <line x1={cuX + 35} y1={ridgeY + 40} x2={cuX + 35} y2={ridgeY + 100} stroke={COLOUR.emerald} strokeWidth={1.5} />
            <line x1={cuX + 21} y1={ridgeY + 100} x2={cuX + 49} y2={ridgeY + 100} stroke={COLOUR.emerald} strokeWidth={2} />
            <line x1={cuX + 26} y1={ridgeY + 106} x2={cuX + 44} y2={ridgeY + 106} stroke={COLOUR.emerald} strokeWidth={2} />
            <line x1={cuX + 30} y1={ridgeY + 112} x2={cuX + 40} y2={ridgeY + 112} stroke={COLOUR.emerald} strokeWidth={2} />
            <text x={cuX + 35} y={ridgeY + 130} textAnchor="middle" fill={COLOUR.emerald} fontSize={10}>local electrode</text>
          </g>
        )}

        {/* Distance separator label */}
        <text x={(sourceX + cuX) / 2} y={H - 12} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
          ← service cable →
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* 43. ConsumerUnit — split-load with main switch + RCDs + MCBs/RCBOs */
interface ConsumerUnitProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function ConsumerUnit({
  eyebrow = 'Split-load consumer unit',
  caption,
  className,
}: ConsumerUnitProps) {
  const W = 480;
  const H = 240;
  const startY = 50;
  const slotH = 32;
  const slotW = 38;

  const slots = [
    { label: 'Main', kind: 'main' as const, colour: COLOUR.red },
    { label: 'RCD A', kind: 'rcd' as const, colour: COLOUR.blue },
    { label: 'MCB', kind: 'mcb' as const, colour: COLOUR.yellow },
    { label: 'MCB', kind: 'mcb' as const, colour: COLOUR.yellow },
    { label: 'MCB', kind: 'mcb' as const, colour: COLOUR.yellow },
    { label: 'RCD B', kind: 'rcd' as const, colour: COLOUR.blue },
    { label: 'MCB', kind: 'mcb' as const, colour: COLOUR.yellow },
    { label: 'MCB', kind: 'mcb' as const, colour: COLOUR.yellow },
    { label: 'RCBO', kind: 'rcbo' as const, colour: COLOUR.emerald },
  ];

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Main switch isolates everything. RCDs detect earth-fault current. MCBs trip on overload / short circuit. RCBOs combine both in a single module.'}
      className={className}
      maxWidth="max-w-[500px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Enclosure */}
        <rect x={20} y={20} width={W - 40} height={H - 40} rx={6} fill="hsl(0 0% 12%)" stroke={COLOUR.wire} strokeWidth={1.5} />
        {/* DIN rail */}
        <line x1={30} y1={startY + slotH / 2} x2={W - 30} y2={startY + slotH / 2} stroke={COLOUR.wireFaint} strokeWidth={2} />

        {slots.map((slot, i) => {
          const x = 36 + i * (slotW + 8);
          return (
            <g key={i}>
              <rect
                x={x}
                y={startY}
                width={slotW}
                height={slotH * 2.5}
                rx={3}
                fill="hsl(0 0% 16%)"
                stroke={slot.colour}
                strokeWidth={1.5}
              />
              {/* Toggle handle */}
              <rect x={x + 8} y={startY + 8} width={slotW - 16} height={18} rx={2} fill={slot.colour} opacity={0.85} />
              {/* Test button (only for RCDs/RCBOs) */}
              {(slot.kind === 'rcd' || slot.kind === 'rcbo') && (
                <circle cx={x + slotW / 2} cy={startY + slotH * 1.6} r={3} fill={COLOUR.text} opacity={0.6} />
              )}
              <text x={x + slotW / 2} y={startY + slotH * 2.5 + 14} textAnchor="middle" fill={COLOUR.text} fontSize={9} fontWeight={600}>
                {slot.label}
              </text>
            </g>
          );
        })}

        {/* Outgoing cables hint */}
        <text x={W / 2} y={H - 26} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
          ▼ outgoing final circuits
        </text>
      </svg>
    </DiagramFrame>
  );
}

/* 44. CableCrossSection — twin-and-earth / SWA / flex / singles */
interface CableCrossSectionProps {
  type?: 'twin-and-earth' | 'SWA' | 'flex' | 'singles';
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function CableCrossSection({
  type = 'twin-and-earth',
  eyebrow,
  caption,
  className,
}: CableCrossSectionProps) {
  const W = 360;
  const H = 240;
  const cx = W / 2;
  const cy = H / 2;

  const titleByType = {
    'twin-and-earth': '6242Y twin & earth (T&E)',
    SWA: 'Steel-wire armoured (SWA)',
    flex: '3-core flexible cable',
    singles: 'Single-core (6491X)',
  };
  const blurb = {
    'twin-and-earth': 'Flat profile. Two insulated cores (L + N) plus a bare CPC, all inside a grey PVC sheath. Sleeve the CPC green/yellow at terminations.',
    SWA: 'Round. Cores inside an inner sheath, surrounded by galvanised steel armour wires (used as the CPC), then an outer sheath. Use compression glands.',
    flex: 'Round, multi-stranded for flexibility. Three insulated cores (L + N + CPC). Used for appliances and pendants.',
    singles: 'Single insulated core. Run in conduit/trunking. CSA chosen per BS 7671 Appendix 4.',
  };

  return (
    <DiagramFrame
      eyebrow={eyebrow ?? titleByType[type]}
      caption={caption ?? blurb[type]}
      className={className}
      maxWidth="max-w-[380px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {type === 'twin-and-earth' && (
          <g>
            {/* Outer flat sheath */}
            <rect x={cx - 90} y={cy - 28} width={180} height={56} rx={28} fill="hsl(0 0% 14%)" stroke={COLOUR.wire} strokeWidth={2} />
            {/* L core */}
            <circle cx={cx - 40} cy={cy} r={20} fill="hsl(0 0% 8%)" stroke={COLOUR.yellow} strokeWidth={2} />
            <circle cx={cx - 40} cy={cy} r={10} fill={COLOUR.yellow} opacity={0.4} />
            <text x={cx - 40} y={cy + 4} textAnchor="middle" fill={COLOUR.text} fontSize={11} fontWeight={700}>L</text>
            {/* N core */}
            <circle cx={cx + 40} cy={cy} r={20} fill="hsl(0 0% 8%)" stroke={COLOUR.blue} strokeWidth={2} />
            <circle cx={cx + 40} cy={cy} r={10} fill={COLOUR.blue} opacity={0.4} />
            <text x={cx + 40} y={cy + 4} textAnchor="middle" fill={COLOUR.text} fontSize={11} fontWeight={700}>N</text>
            {/* CPC bare in centre */}
            <circle cx={cx} cy={cy} r={6} fill="hsl(30 30% 60%)" />
            <text x={cx} y={cy + 38} textAnchor="middle" fill={COLOUR.textDim} fontSize={10}>CPC (bare)</text>
            <text x={cx - 90} y={cy - 36} fill={COLOUR.textDim} fontSize={10}>grey PVC sheath</text>
          </g>
        )}

        {type === 'SWA' && (
          <g>
            {/* Outer sheath */}
            <circle cx={cx} cy={cy} r={80} fill="hsl(0 0% 8%)" stroke="hsl(0 0% 18%)" strokeWidth={2} />
            <text x={cx + 84} y={cy - 60} fill={COLOUR.textDim} fontSize={10}>black PVC outer</text>
            {/* Steel wire armour ring */}
            {Array.from({ length: 24 }, (_, i) => {
              const a = (i / 24) * Math.PI * 2;
              return <circle key={i} cx={cx + Math.cos(a) * 64} cy={cy + Math.sin(a) * 64} r={4} fill="hsl(0 0% 30%)" stroke={COLOUR.wire} strokeWidth={0.6} />;
            })}
            <text x={cx + 80} y={cy - 30} fill={COLOUR.textDim} fontSize={10}>SWA armour (CPC)</text>
            {/* Inner sheath */}
            <circle cx={cx} cy={cy} r={48} fill="hsl(0 0% 14%)" stroke={COLOUR.wire} strokeWidth={1} />
            {/* 3 cores: L1 / L2 / L3 or L / N / CPC */}
            {[
              { dx: 0, dy: -22, c: COLOUR.yellow, label: 'L' },
              { dx: 19, dy: 12, c: COLOUR.blue, label: 'N' },
              { dx: -19, dy: 12, c: COLOUR.emerald, label: 'E' },
            ].map((core, i) => (
              <g key={i}>
                <circle cx={cx + core.dx} cy={cy + core.dy} r={14} fill="hsl(0 0% 8%)" stroke={core.c} strokeWidth={2} />
                <text x={cx + core.dx} y={cy + core.dy + 4} textAnchor="middle" fill={COLOUR.text} fontSize={10} fontWeight={700}>{core.label}</text>
              </g>
            ))}
          </g>
        )}

        {type === 'flex' && (
          <g>
            {/* Outer round sheath */}
            <circle cx={cx} cy={cy} r={70} fill="hsl(0 0% 14%)" stroke={COLOUR.wire} strokeWidth={2} />
            {/* 3 cores */}
            {[
              { dx: 0, dy: -28, c: COLOUR.yellow, label: 'L' },
              { dx: 24, dy: 14, c: COLOUR.blue, label: 'N' },
              { dx: -24, dy: 14, c: COLOUR.emerald, label: 'E' },
            ].map((core, i) => (
              <g key={i}>
                <circle cx={cx + core.dx} cy={cy + core.dy} r={20} fill="hsl(0 0% 8%)" stroke={core.c} strokeWidth={2} />
                {/* Stranded indicator */}
                {Array.from({ length: 7 }, (_, j) => {
                  const angle = (j / 7) * Math.PI * 2;
                  return <circle key={j} cx={cx + core.dx + Math.cos(angle) * 8} cy={cy + core.dy + Math.sin(angle) * 8} r={2.5} fill={core.c} opacity={0.55} />;
                })}
                <text x={cx + core.dx} y={cy + core.dy + 4} textAnchor="middle" fill={COLOUR.text} fontSize={10} fontWeight={700}>{core.label}</text>
              </g>
            ))}
            <text x={cx} y={cy + 90} textAnchor="middle" fill={COLOUR.textDim} fontSize={10}>flexible stranded cores</text>
          </g>
        )}

        {type === 'singles' && (
          <g>
            {/* Single insulated conductor */}
            <circle cx={cx} cy={cy} r={50} fill="hsl(0 0% 8%)" stroke={COLOUR.yellow} strokeWidth={2.5} />
            <circle cx={cx} cy={cy} r={28} fill={COLOUR.yellow} opacity={0.35} />
            <text x={cx} y={cy + 5} textAnchor="middle" fill={COLOUR.text} fontSize={14} fontWeight={700}>L</text>
            <text x={cx + 70} y={cy - 30} fill={COLOUR.textDim} fontSize={10}>PVC insulation</text>
            <text x={cx + 70} y={cy + 10} fill={COLOUR.textDim} fontSize={10}>copper conductor</text>
            <text x={cx} y={cy + 80} textAnchor="middle" fill={COLOUR.textDim} fontSize={10}>(installed in conduit)</text>
          </g>
        )}
      </svg>
    </DiagramFrame>
  );
}

/* 45. EquipotentialBonding — MET to MEB, gas/water bonds */
interface EquipotentialBondingProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function EquipotentialBonding({
  eyebrow = 'Main protective bonding',
  caption,
  className,
}: EquipotentialBondingProps) {
  const W = 480;
  const H = 280;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Main protective bonding connects extraneous-conductive-parts (gas, water, structural metalwork) to the Main Earthing Terminal (MET) — keeps them at the same potential during a fault.'}
      className={className}
      maxWidth="max-w-[500px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* MET — central earth terminal block */}
        <rect x={W / 2 - 30} y={H - 110} width={60} height={36} rx={4} fill="hsl(0 0% 14%)" stroke={COLOUR.emerald} strokeWidth={2} />
        <text x={W / 2} y={H - 88} textAnchor="middle" fill={COLOUR.text} fontSize={11} fontWeight={700}>MET</text>
        {/* Earth electrode below */}
        <line x1={W / 2} y1={H - 74} x2={W / 2} y2={H - 40} stroke={COLOUR.emerald} strokeWidth={1.5} />
        <line x1={W / 2 - 14} y1={H - 40} x2={W / 2 + 14} y2={H - 40} stroke={COLOUR.emerald} strokeWidth={2} />
        <line x1={W / 2 - 9} y1={H - 34} x2={W / 2 + 9} y2={H - 34} stroke={COLOUR.emerald} strokeWidth={2} />
        <line x1={W / 2 - 5} y1={H - 28} x2={W / 2 + 5} y2={H - 28} stroke={COLOUR.emerald} strokeWidth={2} />

        {/* Gas pipe */}
        <rect x={40} y={50} width={80} height={50} rx={4} fill="hsl(0 0% 14%)" stroke={COLOUR.yellow} strokeWidth={1.5} />
        <text x={80} y={80} textAnchor="middle" fill={COLOUR.text} fontSize={11} fontWeight={600}>Gas</text>
        {/* Water */}
        <rect x={200} y={50} width={80} height={50} rx={4} fill="hsl(0 0% 14%)" stroke={COLOUR.blue} strokeWidth={1.5} />
        <text x={240} y={80} textAnchor="middle" fill={COLOUR.text} fontSize={11} fontWeight={600}>Water</text>
        {/* Structural steel */}
        <rect x={360} y={50} width={80} height={50} rx={4} fill="hsl(0 0% 14%)" stroke={COLOUR.wire} strokeWidth={1.5} />
        <text x={400} y={78} textAnchor="middle" fill={COLOUR.text} fontSize={10} fontWeight={600}>Steel</text>
        <text x={400} y={92} textAnchor="middle" fill={COLOUR.textDim} fontSize={9}>(structure)</text>

        {/* Bonding conductors — green/yellow drawn as solid emerald lines */}
        <line x1={80} y1={100} x2={W / 2 - 24} y2={H - 100} stroke={COLOUR.emerald} strokeWidth={2.5} />
        <line x1={240} y1={100} x2={W / 2} y2={H - 110} stroke={COLOUR.emerald} strokeWidth={2.5} />
        <line x1={400} y1={100} x2={W / 2 + 24} y2={H - 100} stroke={COLOUR.emerald} strokeWidth={2.5} />

        {/* Labels along conductors — small notch backgrounds so the diagonal
            bonding strokes don't read through the text. */}
        <rect x={108} y={148} width={70} height={14} fill="hsl(0 0% 10%)" />
        <text x={113} y={158} fill={COLOUR.emerald} fontSize={10}>10 mm² bond</text>
        <rect x={246} y={148} width={48} height={14} fill="hsl(0 0% 10%)" />
        <text x={250} y={158} fill={COLOUR.emerald} fontSize={10}>10 mm²</text>
        <rect x={300} y={148} width={70} height={14} fill="hsl(0 0% 10%)" />
        <text x={305} y={158} fill={COLOUR.emerald} fontSize={10}>10 mm² bond</text>
      </svg>
    </DiagramFrame>
  );
}

/* 46. InsulationResistanceTest — IR tester between L+N+CPC and earth */
interface InsulationResistanceTestProps {
  eyebrow?: string;
  caption?: ReactNode;
  className?: string;
}

export function InsulationResistanceTest({
  eyebrow = 'Insulation resistance test',
  caption,
  className,
}: InsulationResistanceTestProps) {
  const W = 460;
  const H = 280;
  const meterCx = 110;
  const meterCy = H / 2;
  const cuX = 320;

  return (
    <DiagramFrame
      eyebrow={eyebrow}
      caption={caption ?? 'Apply 500 V DC between live conductors (L+N linked) and the protective conductor. Acceptable result ≥ 1 MΩ (BS 7671 Table 64). Initial verification: ≥ 100 MΩ is healthy.'}
      className={className}
      maxWidth="max-w-[480px]"
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Insulation tester body */}
        <rect x={meterCx - 60} y={meterCy - 70} width={120} height={140} rx={8} fill="hsl(0 0% 14%)" stroke={COLOUR.yellow} strokeWidth={2} />
        {/* Display */}
        <rect x={meterCx - 44} y={meterCy - 56} width={88} height={36} rx={3} fill="hsl(0 0% 6%)" stroke={COLOUR.wire} strokeWidth={1} />
        <text x={meterCx} y={meterCy - 36} textAnchor="middle" fill={COLOUR.emerald} fontSize={16} fontWeight={700}>
          &gt;200 MΩ
        </text>
        <text x={meterCx} y={meterCy - 6} textAnchor="middle" fill={COLOUR.textDim} fontSize={10}>500 V DC</text>
        {/* Test button */}
        <circle cx={meterCx} cy={meterCy + 30} r={14} fill={COLOUR.yellow} opacity={0.3} stroke={COLOUR.yellow} strokeWidth={1.5} />
        <text x={meterCx} y={meterCy + 34} textAnchor="middle" fill={COLOUR.text} fontSize={9} fontWeight={700}>TEST</text>
        {/* Terminals */}
        <circle cx={meterCx - 20} cy={meterCy + 60} r={4} fill={COLOUR.red} />
        <circle cx={meterCx + 20} cy={meterCy + 60} r={4} fill={COLOUR.emerald} />

        {/* Test leads */}
        {/* Red lead → L+N (linked) at CU */}
        <path d={`M ${meterCx - 20} ${meterCy + 60} Q ${meterCx + 30} ${H - 30} ${cuX - 30} ${meterCy - 10}`} fill="none" stroke={COLOUR.red} strokeWidth={2} />
        {/* Green lead → CPC bar */}
        <path d={`M ${meterCx + 20} ${meterCy + 60} Q ${meterCx + 80} ${H - 20} ${cuX - 30} ${meterCy + 30}`} fill="none" stroke={COLOUR.emerald} strokeWidth={2} />

        {/* Consumer unit */}
        <rect x={cuX - 30} y={meterCy - 60} width={120} height={120} rx={6} fill="hsl(0 0% 14%)" stroke={COLOUR.wire} strokeWidth={1.5} />
        {/* L bar */}
        <line x1={cuX - 10} y1={meterCy - 40} x2={cuX + 90} y2={meterCy - 40} stroke={COLOUR.yellow} strokeWidth={2} />
        <text x={cuX + 96} y={meterCy - 36} fill={COLOUR.yellow} fontSize={11} fontWeight={700}>L</text>
        {/* N bar */}
        <line x1={cuX - 10} y1={meterCy - 16} x2={cuX + 90} y2={meterCy - 16} stroke={COLOUR.blue} strokeWidth={2} />
        <text x={cuX + 96} y={meterCy - 12} fill={COLOUR.blue} fontSize={11} fontWeight={700}>N</text>
        {/* L+N link wire */}
        <line x1={cuX - 20} y1={meterCy - 40} x2={cuX - 20} y2={meterCy - 16} stroke={COLOUR.red} strokeWidth={2} strokeDasharray="3 2" />
        <text x={cuX - 26} y={meterCy - 26} textAnchor="end" fill={COLOUR.red} fontSize={9} fontWeight={700}>link</text>
        {/* CPC bar */}
        <line x1={cuX - 10} y1={meterCy + 24} x2={cuX + 90} y2={meterCy + 24} stroke={COLOUR.emerald} strokeWidth={2} />
        <text x={cuX + 96} y={meterCy + 28} fill={COLOUR.emerald} fontSize={11} fontWeight={700}>CPC</text>

        {/* Notes */}
        <text x={W / 2} y={H - 12} textAnchor="middle" fill={COLOUR.textDim} fontSize={11}>
          Always isolate, lock off, prove dead before testing. Disconnect electronics that won’t survive 500 V.
        </text>
      </svg>
    </DiagramFrame>
  );
}
