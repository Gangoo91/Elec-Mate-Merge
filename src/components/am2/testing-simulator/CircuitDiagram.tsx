/**
 * CircuitDiagram v4 — the circuit as it sits on the rig board.
 *
 * Rebuilt 5 Oct 2026 (Andrew: "make it proper feel real"). v3 was a navy
 * schematic with emoji standing in for a cooker unit, motor and fire panel.
 * Now: white accessories and grey T&E on a painted rig board, each item drawn
 * as what it is (cooker control unit, DOL starter, TPN isolator, FCU, fire
 * panel, detectors), the point you are testing ringed in solid volt with the
 * test leads on it, and a tick on every point you've finished.
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

const VOLT = '#FFD02E';
const WHITE = '#f4f5f6';
const EDGE = '#b9bec5';
const DARK = '#2a2c30';

const COMP_W = 64;
const COMP_H = 56;
const LABEL_H = 16;
const GAP_X = 46;
const PAD = 38;

/** Grey flat twin-and-earth: a sheath with a lighter highlight down it. */
function Cable({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1b1c1f" strokeWidth="7" opacity="0.45" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#a9aeb5" strokeWidth="5" />
      <line x1={x1} y1={y1 - 1} x2={x2} y2={y2 - 1} stroke="#d6d9dd" strokeWidth="1.2" />
    </g>
  );
}

/** White moulded plate — the base of most accessories. */
function Plate({ x, y, w, h, r = 4 }: { x: number; y: number; w: number; h: number; r?: number }) {
  return (
    <g>
      <rect
        x={x - w / 2 + 1.5}
        y={y - h / 2 + 2.5}
        width={w}
        height={h}
        rx={r}
        fill="#000"
        opacity="0.35"
      />
      <rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={r}
        fill="url(#plate)"
        stroke={EDGE}
        strokeWidth="0.8"
      />
    </g>
  );
}

function Screw({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="1.6" fill="#d9dce0" stroke="#9aa0a7" strokeWidth="0.4" />
      <line x1={x - 1} y1={y} x2={x + 1} y2={y} stroke="#8a9097" strokeWidth="0.5" />
    </g>
  );
}

/* ── Accessories ─────────────────────────────────────────────────── */

function Board({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect
        x={x - 30}
        y={y - 24}
        width="60"
        height="48"
        rx="3"
        fill="#000"
        opacity="0.35"
        transform="translate(1.5 2.5)"
      />
      <rect
        x={x - 30}
        y={y - 24}
        width="60"
        height="48"
        rx="3"
        fill="url(#plate)"
        stroke={EDGE}
        strokeWidth="0.8"
      />
      <rect
        x={x - 25}
        y={y - 13}
        width="50"
        height="20"
        rx="1.5"
        fill="#dfe2e6"
        stroke="#aab0b7"
        strokeWidth="0.5"
      />
      {/* main switch + MCBs */}
      <rect
        x={x - 23}
        y={y - 11}
        width="8"
        height="16"
        rx="1"
        fill={WHITE}
        stroke="#9aa0a7"
        strokeWidth="0.4"
      />
      <rect x={x - 21} y={y - 9} width="4" height="6" rx="0.8" fill="#c62828" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={x - 13 + i * 9}
            y={y - 11}
            width="7"
            height="16"
            rx="1"
            fill={WHITE}
            stroke="#9aa0a7"
            strokeWidth="0.4"
          />
          <rect x={x - 11.5 + i * 9} y={y - 9} width="4" height="6" rx="0.8" fill={DARK} />
        </g>
      ))}
      <rect
        x={x - 25}
        y={y + 11}
        width="50"
        height="6"
        rx="1"
        fill="#e8eaed"
        stroke="#c3c8ce"
        strokeWidth="0.4"
      />
    </g>
  );
}

function Socket({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Plate x={x} y={y} w={40} h={40} />
      <rect x={x - 2} y={y - 12} width="4" height="8" rx="0.8" fill={DARK} />
      <rect x={x - 11} y={y + 1} width="8" height="4" rx="0.8" fill={DARK} />
      <rect x={x + 3} y={y + 1} width="8" height="4" rx="0.8" fill={DARK} />
      <rect
        x={x + 10}
        y={y - 14}
        width="7"
        height="9"
        rx="1"
        fill="#e6e8eb"
        stroke="#a0a6ad"
        strokeWidth="0.4"
      />
      <rect x={x + 11.5} y={y - 13} width="4" height="2.5" rx="0.5" fill="#c62828" />
      <Screw x={x - 15} y={y - 15} />
      <Screw x={x - 15} y={y + 15} />
    </g>
  );
}

function Switch({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Plate x={x} y={y} w={36} h={36} />
      <rect
        x={x - 6}
        y={y - 10}
        width="12"
        height="20"
        rx="2"
        fill="#e9ebee"
        stroke="#a0a6ad"
        strokeWidth="0.5"
      />
      <line x1={x - 5} y1={y} x2={x + 5} y2={y} stroke="#b0b5bb" strokeWidth="0.6" />
      <Screw x={x} y={y - 14} />
      <Screw x={x} y={y + 14} />
    </g>
  );
}

function CeilingRose({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x + 1.5} cy={y + 2.5} r="17" fill="#000" opacity="0.35" />
      <circle cx={x} cy={y} r="17" fill="url(#plate)" stroke={EDGE} strokeWidth="0.8" />
      <circle cx={x} cy={y} r="9" fill="#e6e8eb" stroke="#a0a6ad" strokeWidth="0.5" />
      <line x1={x} y1={y + 9} x2={x} y2={y + 24} stroke="#e6e8eb" strokeWidth="1.6" />
      <rect
        x={x - 4}
        y={y + 23}
        width="8"
        height="7"
        rx="1.5"
        fill="#e6e8eb"
        stroke="#a0a6ad"
        strokeWidth="0.4"
      />
    </g>
  );
}

function CookerUnit({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Plate x={x} y={y} w={56} h={40} />
      <rect
        x={x - 22}
        y={y - 14}
        width="20"
        height="22"
        rx="2"
        fill="#c62828"
        stroke="#8e1b1b"
        strokeWidth="0.6"
      />
      <text
        x={x - 12}
        y={y + 1}
        textAnchor="middle"
        fontSize="6"
        fontWeight="800"
        fill="#fff"
        fontFamily="system-ui"
      >
        COOKER
      </text>
      <circle cx={x - 12} cy={y + 13} r="1.8" fill="#ff7043" />
      <rect
        x={x + 6}
        y={y - 9}
        width="14"
        height="16"
        rx="1.5"
        fill="#e6e8eb"
        stroke="#a0a6ad"
        strokeWidth="0.4"
      />
      <rect x={x + 12} y={y - 6} width="2" height="4" fill={DARK} />
      <rect x={x + 8} y={y + 1} width="3.5" height="2" fill={DARK} />
      <rect x={x + 14.5} y={y + 1} width="3.5" height="2" fill={DARK} />
    </g>
  );
}

function ShowerUnit({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Plate x={x} y={y} w={40} h={52} r={7} />
      <circle cx={x} cy={y - 6} r="9" fill="#e6e8eb" stroke="#a0a6ad" strokeWidth="0.6" />
      <line
        x1={x}
        y1={y - 6}
        x2={x + 5}
        y2={y - 11}
        stroke={DARK}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <rect x={x - 10} y={y + 8} width="20" height="9" rx="2" fill={DARK} />
      <circle cx={x - 5} cy={y + 12.5} r="1.5" fill="#4caf50" />
    </g>
  );
}

function Isolator({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Plate x={x} y={y} w={44} h={50} />
      <rect
        x={x - 13}
        y={y - 16}
        width="26"
        height="26"
        rx="3"
        fill={VOLT}
        stroke="#b58f00"
        strokeWidth="0.6"
      />
      <rect
        x={x - 3.5}
        y={y - 22}
        width="7"
        height="38"
        rx="2"
        fill="#c62828"
        transform={`rotate(-30 ${x} ${y - 3})`}
      />
      <text
        x={x}
        y={y + 21}
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="800"
        fill={DARK}
        fontFamily="system-ui"
      >
        I · O
      </text>
    </g>
  );
}

function Fcu({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Plate x={x} y={y} w={40} h={40} />
      <rect
        x={x - 14}
        y={y - 8}
        width="13"
        height="16"
        rx="1.5"
        fill="#e6e8eb"
        stroke="#a0a6ad"
        strokeWidth="0.5"
      />
      <text
        x={x - 7.5}
        y={y + 2}
        textAnchor="middle"
        fontSize="5"
        fontWeight="800"
        fill={DARK}
        fontFamily="system-ui"
      >
        FUSE
      </text>
      <rect
        x={x + 3}
        y={y - 9}
        width="11"
        height="18"
        rx="1.5"
        fill="#e9ebee"
        stroke="#a0a6ad"
        strokeWidth="0.5"
      />
      <rect x={x + 6} y={y - 7} width="5" height="3" rx="0.5" fill="#c62828" />
    </g>
  );
}

function DolStarter({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect
        x={x - 22 + 1.5}
        y={y - 26 + 2.5}
        width="44"
        height="52"
        rx="3"
        fill="#000"
        opacity="0.35"
      />
      <rect
        x={x - 22}
        y={y - 26}
        width="44"
        height="52"
        rx="3"
        fill="#8e959d"
        stroke="#5f656c"
        strokeWidth="0.8"
      />
      <rect x={x - 16} y={y - 20} width="32" height="12" rx="1.5" fill="#6c737b" />
      <circle cx={x - 8} cy={y + 6} r="6" fill="#2e7d32" stroke="#1b5e20" strokeWidth="0.8" />
      <circle cx={x + 8} cy={y + 6} r="6" fill="#c62828" stroke="#8e1b1b" strokeWidth="0.8" />
      <text
        x={x - 8}
        y={y + 18}
        textAnchor="middle"
        fontSize="5"
        fontWeight="800"
        fill="#fff"
        fontFamily="system-ui"
      >
        I
      </text>
      <text
        x={x + 8}
        y={y + 18}
        textAnchor="middle"
        fontSize="5"
        fontWeight="800"
        fill="#fff"
        fontFamily="system-ui"
      >
        O
      </text>
    </g>
  );
}

function Motor({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect
        x={x - 28 + 1.5}
        y={y - 17 + 2.5}
        width="50"
        height="34"
        rx="8"
        fill="#000"
        opacity="0.35"
      />
      <rect
        x={x - 28}
        y={y - 17}
        width="50"
        height="34"
        rx="8"
        fill="url(#motor)"
        stroke="#2f3e4e"
        strokeWidth="0.8"
      />
      {[-18, -10, -2, 6, 14].map((dx) => (
        <line
          key={dx}
          x1={x + dx}
          y1={y - 15}
          x2={x + dx}
          y2={y + 15}
          stroke="#2f3e4e"
          strokeWidth="1"
          opacity="0.6"
        />
      ))}
      <rect x={x + 22} y={y - 4} width="8" height="8" rx="1" fill="#9aa4ae" />
      <rect
        x={x - 12}
        y={y - 25}
        width="18"
        height="10"
        rx="1.5"
        fill="#5d7185"
        stroke="#2f3e4e"
        strokeWidth="0.6"
      />
    </g>
  );
}

function FirePanel({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect
        x={x - 26 + 1.5}
        y={y - 22 + 2.5}
        width="52"
        height="44"
        rx="3"
        fill="#000"
        opacity="0.35"
      />
      <rect
        x={x - 26}
        y={y - 22}
        width="52"
        height="44"
        rx="3"
        fill="#b71c1c"
        stroke="#7f1212"
        strokeWidth="0.8"
      />
      <rect x={x - 20} y={y - 16} width="40" height="12" rx="1.5" fill="#1b1c1f" />
      <text
        x={x}
        y={y - 8}
        textAnchor="middle"
        fontSize="5.5"
        fontWeight="700"
        fill="#7CFC9A"
        fontFamily="monospace"
      >
        SYSTEM NORMAL
      </text>
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={x - 15 + i * 10}
          cy={y + 6}
          r="2.2"
          fill={i === 0 ? '#4caf50' : '#5a1010'}
        />
      ))}
      <text
        x={x}
        y={y + 18}
        textAnchor="middle"
        fontSize="5"
        fontWeight="800"
        fill="#fff"
        fontFamily="system-ui"
      >
        FIRE
      </text>
    </g>
  );
}

function Detector({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x + 1.5} cy={y + 2.5} r="17" fill="#000" opacity="0.35" />
      <circle cx={x} cy={y} r="17" fill="url(#plate)" stroke={EDGE} strokeWidth="0.8" />
      <circle
        cx={x}
        cy={y}
        r="11"
        fill="none"
        stroke="#c9cdd2"
        strokeWidth="2.5"
        strokeDasharray="3 2"
      />
      <circle cx={x + 6} cy={y - 6} r="1.8" fill="#e53935" />
    </g>
  );
}

function Generic({ x, y }: { x: number; y: number }) {
  return <Plate x={x} y={y} w={40} h={40} />;
}

function draw(p: CircuitTestPoint, x: number, y: number) {
  switch (p.type) {
    case 'db':
      return <Board x={x} y={y} />;
    case 'socket':
      return <Socket x={x} y={y} />;
    case 'switch':
      return <Switch x={x} y={y} />;
    case 'light':
      return <CeilingRose x={x} y={y} />;
    case 'cooker':
      return <CookerUnit x={x} y={y} />;
    case 'shower':
      return <ShowerUnit x={x} y={y} />;
    case 'isolator':
      return <Isolator x={x} y={y} />;
    case 'fcu':
      return <Fcu x={x} y={y} />;
    case 'dol_starter':
      return <DolStarter x={x} y={y} />;
    case 'motor':
      return <Motor x={x} y={y} />;
    case 'fire_panel':
      return <FirePanel x={x} y={y} />;
    case 'detector':
      return <Detector x={x} y={y} />;
    default:
      return <Generic x={x} y={y} />;
  }
}

/** Test leads coming down onto the point: red line probe, black/green to earth. */
function Leads({ x, y }: { x: number; y: number }) {
  return (
    <g strokeLinecap="round">
      <path
        d={`M ${x - 22} ${y - 58} Q ${x - 16} ${y - 40} ${x - 6} ${y - 22}`}
        fill="none"
        stroke="#c62828"
        strokeWidth="3"
      />
      <path
        d={`M ${x + 22} ${y - 58} Q ${x + 16} ${y - 40} ${x + 6} ${y - 22}`}
        fill="none"
        stroke="#2e7d32"
        strokeWidth="3"
      />
      <rect
        x={x - 9}
        y={y - 26}
        width="5"
        height="9"
        rx="1.5"
        fill="#c62828"
        transform={`rotate(-28 ${x - 6} ${y - 22})`}
      />
      <rect
        x={x + 4}
        y={y - 26}
        width="5"
        height="9"
        rx="1.5"
        fill="#2e7d32"
        transform={`rotate(28 ${x + 6} ${y - 22})`}
      />
    </g>
  );
}

function layoutFor(points: CircuitTestPoint[], layout: 'linear' | 'ring' | 'star') {
  const n = points.length;
  if (layout === 'ring' && n >= 4) {
    const cols = Math.ceil(n / 2);
    const w = cols * (COMP_W + GAP_X) + PAD * 2;
    const ry = (COMP_H + LABEL_H + 18) / (2 * Math.sin(Math.PI / n));
    const h = 2 * ry + COMP_H + LABEL_H + PAD * 2 + 30;
    const cx = w / 2;
    const cy = (h - LABEL_H) / 2 + 12;
    const rx = (w - PAD * 2) / 2 - COMP_W / 2;
    return {
      w,
      h,
      at: points.map((_, i) => {
        const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
        return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
      }),
    };
  }
  const w = n * (COMP_W + GAP_X) - GAP_X + PAD * 2;
  const h = COMP_H + LABEL_H + PAD * 2 + 56; // room for the leads above
  return {
    w,
    h,
    at: points.map((_, i) => ({
      x: PAD + COMP_W / 2 + i * (COMP_W + GAP_X),
      y: PAD + 56 + COMP_H / 2,
    })),
  };
}

export function CircuitDiagram({
  testPoints,
  diagramLayout,
  activeTestPointId,
  guidedTestPointId,
  completedTestPointIds,
  onSelectTestPoint,
}: CircuitDiagramProps) {
  const { w, h, at } = useMemo(
    () => layoutFor(testPoints, diagramLayout),
    [testPoints, diagramLayout]
  );

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="group"
      aria-label="Circuit on the rig"
    >
      <defs>
        <linearGradient id="plate" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dfe2e6" />
        </linearGradient>
        <linearGradient id="motor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7d93a8" />
          <stop offset="100%" stopColor="#4c6175" />
        </linearGradient>
      </defs>

      {/* Cables first, so accessories sit on top of them */}
      {at.slice(0, -1).map((p, i) => (
        <Cable key={i} x1={p.x} y1={p.y} x2={at[i + 1].x} y2={at[i + 1].y} />
      ))}
      {diagramLayout === 'ring' && at.length > 2 && (
        <Cable x1={at[at.length - 1].x} y1={at[at.length - 1].y} x2={at[0].x} y2={at[0].y} />
      )}

      {testPoints.map((p, i) => {
        const { x, y } = at[i];
        const active = activeTestPointId === p.id;
        const guided = guidedTestPointId === p.id;
        const done = completedTestPointIds.includes(p.id);
        const ring = active || guided;
        return (
          <g key={p.id}>
            {ring && (
              <rect
                x={x - COMP_W / 2 - 4}
                y={y - COMP_H / 2 - 4}
                width={COMP_W + 8}
                height={COMP_H + 8}
                rx="10"
                fill="none"
                stroke={VOLT}
                strokeWidth="2.5"
              />
            )}
            {draw(p, x, y)}
            {active && <Leads x={x} y={y} />}
            {done && (
              <g>
                <circle
                  cx={x + COMP_W / 2 - 4}
                  cy={y - COMP_H / 2 + 4}
                  r="7.5"
                  fill="#22c55e"
                  stroke="#0f5132"
                  strokeWidth="1"
                />
                <path
                  d={`M ${x + COMP_W / 2 - 7.5} ${y - COMP_H / 2 + 4} l 2.5 2.5 l 4.5 -5`}
                  fill="none"
                  stroke="#06210f"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )}
            <text
              x={x}
              y={y + COMP_H / 2 + LABEL_H}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10.5"
              fontWeight={ring ? 800 : 600}
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {p.label}
            </text>
            <rect
              x={x - COMP_W / 2 - 4}
              y={y - COMP_H / 2 - 4}
              width={COMP_W + 8}
              height={COMP_H + LABEL_H + 10}
              fill="transparent"
              className="cursor-pointer touch-manipulation"
              onClick={() => onSelectTestPoint(p.id)}
              // Reachable by keyboard too, not only by tapping.
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectTestPoint(p.id);
                }
              }}
              role="button"
              aria-label={`Put the leads on ${p.label}`}
            />
          </g>
        );
      })}
    </svg>
  );
}
