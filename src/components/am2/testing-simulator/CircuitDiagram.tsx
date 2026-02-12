/**
 * CircuitDiagram v3 — Auto-Scaling Layout
 *
 * Dynamically calculates viewBox and spacing based on test point count
 * and layout type. Components are large and well-spaced with no overlapping.
 * Uses aspect ratio that fills the container without dead space.
 */

import { useMemo } from 'react';
import type { CircuitTestPoint } from '@/types/am2-testing-simulator';

interface CircuitDiagramProps {
  testPoints: CircuitTestPoint[];
  diagramLayout: 'linear' | 'ring' | 'star';
  activeTestPointId: string | null;
  guidedTestPointId: string | null;
  completedTestPointIds: string[];
  onSelectTestPoint: (id: string) => void;
}

/** Component size constants (in SVG units) */
const COMP_W = 60; // component width
const COMP_H = 50; // component height
const LABEL_H = 14; // label below component
const GAP_X = 30; // horizontal gap between components
const PAD = 35; // padding around the layout

/** Cable path between two points */
function CablePath({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#475569"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#64748b"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
    </g>
  );
}

interface CompProps {
  x: number;
  y: number;
  hl: boolean;
  done: boolean;
}

/** Distribution Board */
function DBComp({ x, y, hl, done }: CompProps) {
  return (
    <g>
      <rect
        x={x - 30}
        y={y - 24}
        width="60"
        height="48"
        rx="4"
        fill="url(#db-body)"
        stroke={hl ? '#22d3ee' : done ? '#22c55e' : '#475569'}
        strokeWidth={hl ? 2 : 0.8}
      />
      {[-14, -2, 10].map((offset, i) => (
        <g key={i}>
          <rect
            x={x + offset - 4}
            y={y - 16}
            width="10"
            height="22"
            rx="1.5"
            fill="#111827"
            stroke="#374151"
            strokeWidth="0.5"
          />
          <rect
            x={x + offset - 1.5}
            y={y - 13}
            width="5"
            height="7"
            rx="1"
            fill={i === 0 ? '#3b82f6' : '#ef4444'}
          />
        </g>
      ))}
      <line
        x1={x - 24}
        y1={y + 16}
        x2={x + 24}
        y2={y + 16}
        stroke="#b45309"
        strokeWidth="3"
        opacity="0.6"
      />
      {hl && <GlowRect x={x - 33} y={y - 27} w={66} h={54} />}
    </g>
  );
}

/** Socket outlet (BS 1363) */
function SocketComp({ x, y, hl, done }: CompProps) {
  return (
    <g>
      <rect
        x={x - 18}
        y={y - 14}
        width="36"
        height="28"
        rx="3"
        fill="url(#socket-face)"
        stroke={hl ? '#22d3ee' : done ? '#22c55e' : '#64748b'}
        strokeWidth={hl ? 2 : 0.8}
      />
      <rect x={x - 2} y={y - 9} width="4" height="7" rx="1" fill="#374151" />
      <rect x={x - 9} y={y + 1} width="4" height="6" rx="1" fill="#374151" />
      <rect x={x + 5} y={y + 1} width="4" height="6" rx="1" fill="#374151" />
      <rect x={x + 12} y={y - 5} width="4" height="8" rx="1" fill="#dc2626" />
      {hl && <GlowRect x={x - 21} y={y - 17} w={42} h={34} />}
    </g>
  );
}

/** Light fitting */
function LightComp({ x, y, hl, done }: CompProps) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="14"
        fill="url(#light-base)"
        stroke={hl ? '#22d3ee' : done ? '#22c55e' : '#64748b'}
        strokeWidth={hl ? 2 : 0.8}
      />
      <circle cx={x} cy={y} r="7" fill="#111827" stroke="#374151" strokeWidth="0.5" />
      <path
        d={`M ${x - 3} ${y - 2} Q ${x} ${y - 5} ${x + 3} ${y - 2}`}
        fill="none"
        stroke={hl ? '#fbbf24' : '#4b5563'}
        strokeWidth="1"
      />
      <path
        d={`M ${x - 3} ${y + 2} Q ${x} ${y + 5} ${x + 3} ${y + 2}`}
        fill="none"
        stroke={hl ? '#fbbf24' : '#4b5563'}
        strokeWidth="1"
      />
      {hl && <GlowCircle cx={x} cy={y} r={18} />}
    </g>
  );
}

/** Switch plate */
function SwitchComp({ x, y, hl, done }: CompProps) {
  return (
    <g>
      <rect
        x={x - 14}
        y={y - 14}
        width="28"
        height="28"
        rx="3"
        fill="url(#socket-face)"
        stroke={hl ? '#22d3ee' : done ? '#22c55e' : '#64748b'}
        strokeWidth={hl ? 2 : 0.8}
      />
      <rect
        x={x - 5}
        y={y - 7}
        width="10"
        height="14"
        rx="1.5"
        fill="#e2e8f0"
        stroke="#94a3b8"
        strokeWidth="0.5"
      />
      <circle cx={x} cy={y - 3} r="1.5" fill="#22c55e" />
      {hl && <GlowRect x={x - 17} y={y - 17} w={34} h={34} />}
    </g>
  );
}

/** Generic component */
function GenericComp({ x, y, hl, done, icon }: CompProps & { icon: string }) {
  return (
    <g>
      <rect
        x={x - 20}
        y={y - 16}
        width="40"
        height="32"
        rx="4"
        fill="url(#enclosure)"
        stroke={hl ? '#22d3ee' : done ? '#22c55e' : '#64748b'}
        strokeWidth={hl ? 2 : 0.8}
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill={hl ? '#22d3ee' : '#94a3b8'}
        fontSize="14"
        fontFamily="system-ui"
      >
        {icon}
      </text>
      {hl && <GlowRect x={x - 23} y={y - 19} w={46} h={38} />}
    </g>
  );
}

function GlowRect({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="6"
      fill="none"
      stroke="#22d3ee"
      strokeWidth="1.5"
      opacity="0.35"
      className="animate-pulse"
    />
  );
}

function GlowCircle({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke="#22d3ee"
      strokeWidth="1.5"
      opacity="0.35"
      className="animate-pulse"
    />
  );
}

function getIcon(type: CircuitTestPoint['type']): string {
  const map: Record<string, string> = {
    cooker: '🍳',
    shower: '🚿',
    motor: '⚙',
    dol_starter: '⚡',
    isolator: '🔒',
    fire_panel: '🔥',
    detector: '🔔',
    data_outlet: '📡',
    patch_panel: '🖧',
  };
  return map[type] || '◇';
}

/** Probe indicator at active test point */
function ProbeIndicator({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <line
        x1={x - 8}
        y1={y - 30}
        x2={x - 3}
        y2={y - 14}
        stroke="#ef4444"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx={x - 3} cy={y - 13} r="2" fill="#ef4444" />
      <line
        x1={x + 8}
        y1={y - 30}
        x2={x + 3}
        y2={y - 14}
        stroke="#1e293b"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx={x + 3} cy={y - 13} r="2" fill="#1e293b" stroke="#4b5563" strokeWidth="0.5" />
    </g>
  );
}

function renderComponent(
  point: CircuitTestPoint,
  x: number,
  y: number,
  hl: boolean,
  done: boolean
) {
  const props = { x, y, hl, done };
  switch (point.type) {
    case 'db':
      return <DBComp {...props} />;
    case 'socket':
      return <SocketComp {...props} />;
    case 'light':
      return <LightComp {...props} />;
    case 'switch':
      return <SwitchComp {...props} />;
    default:
      return <GenericComp {...props} icon={getIcon(point.type)} />;
  }
}

/**
 * Compute evenly-spaced positions for all test points.
 * Ignores the data's xPct/yPct — instead lays out optimally.
 */
function computeLayout(points: CircuitTestPoint[], layout: 'linear' | 'ring' | 'star') {
  const n = points.length;

  if (layout === 'ring' && n >= 4) {
    // Ring: arrange in an oval
    const cols = Math.ceil(n / 2);
    const w = cols * (COMP_W + GAP_X) + PAD * 2;
    const h = 2 * (COMP_H + LABEL_H) + GAP_X + PAD * 2;
    const cx = w / 2;
    const cy = h / 2;
    const rx = (w - PAD * 2) / 2 - COMP_W / 2;
    const ry = (h - PAD * 2) / 2 - COMP_H / 2;

    const positions = points.map((_, i) => {
      const angle = -Math.PI / 2 + (i / n) * Math.PI * 2;
      return {
        x: cx + rx * Math.cos(angle),
        y: cy + ry * Math.sin(angle),
      };
    });

    return { vpW: w, vpH: h, positions };
  }

  // Linear: single row, evenly spaced
  const w = n * (COMP_W + GAP_X) - GAP_X + PAD * 2;
  const h = COMP_H + LABEL_H + PAD * 2 + 20; // extra 20 for probe space above

  const positions = points.map((_, i) => ({
    x: PAD + COMP_W / 2 + i * (COMP_W + GAP_X),
    y: PAD + 20 + COMP_H / 2,
  }));

  return { vpW: w, vpH: h, positions };
}

export function CircuitDiagram({
  testPoints,
  diagramLayout,
  activeTestPointId,
  guidedTestPointId,
  completedTestPointIds,
  onSelectTestPoint,
}: CircuitDiagramProps) {
  const { vpW, vpH, positions } = useMemo(
    () => computeLayout(testPoints, diagramLayout),
    [testPoints, diagramLayout]
  );

  return (
    <svg
      viewBox={`0 0 ${vpW} ${vpH}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="db-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#374151" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="socket-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <radialGradient id="light-base" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </radialGradient>
        <linearGradient id="enclosure" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4b5563" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
        <pattern id="circuit-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <line x1="0" y1="20" x2="20" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
          <line x1="20" y1="0" x2="20" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width={vpW} height={vpH} rx="10" fill="#0c1222" />
      <rect width={vpW} height={vpH} rx="10" fill="url(#circuit-grid)" />

      {/* Cable connections */}
      {testPoints.slice(0, -1).map((_, i) => {
        const p1 = positions[i];
        const p2 = positions[i + 1];
        return <CablePath key={`cable-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} />;
      })}
      {/* Ring return cable */}
      {diagramLayout === 'ring' && testPoints.length > 2 && (
        <CablePath
          x1={positions[positions.length - 1].x}
          y1={positions[positions.length - 1].y}
          x2={positions[0].x}
          y2={positions[0].y}
        />
      )}

      {/* Components */}
      {testPoints.map((point, i) => {
        const { x, y } = positions[i];
        const isActive = activeTestPointId === point.id;
        const isGuided = guidedTestPointId === point.id;
        const isCompleted = completedTestPointIds.includes(point.id);
        const hl = isActive || isGuided;

        return (
          <g key={point.id}>
            {renderComponent(point, x, y, hl, isCompleted)}

            {/* Label below component */}
            <text
              x={x}
              y={y + COMP_H / 2 + LABEL_H}
              textAnchor="middle"
              fill={hl ? '#22d3ee' : isCompleted ? '#86efac' : '#94a3b8'}
              fontSize="9"
              fontWeight="600"
              fontFamily="system-ui"
            >
              {point.label}
            </text>

            {isActive && <ProbeIndicator x={x} y={y} />}

            {/* Completed tick */}
            {isCompleted && !hl && (
              <g>
                <circle cx={x + 18} cy={y - 18} r="6" fill="#22c55e" />
                <text
                  x={x + 18}
                  y={y - 15}
                  textAnchor="middle"
                  fill="white"
                  fontSize="8"
                  fontWeight="bold"
                >
                  ✓
                </text>
              </g>
            )}

            {/* Tap target */}
            <rect
              x={x - 30}
              y={y - 30}
              width="60"
              height="60"
              fill="transparent"
              className="touch-manipulation cursor-pointer"
              onClick={() => onSelectTestPoint(point.id)}
              role="button"
              aria-label={`Select ${point.label}`}
            />
          </g>
        );
      })}
    </svg>
  );
}
