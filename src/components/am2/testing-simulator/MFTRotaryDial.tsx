/**
 * MFTRotaryDial v5 — Visual Dial Only
 *
 * Just the SVG dial visual indicator. Position selection pills
 * are rendered separately by MFTInstrument.
 */

import { DIAL_POSITIONS, type DialPosition } from '@/types/am2-testing-simulator';

interface MFTRotaryDialProps {
  position: DialPosition;
  disabled?: boolean;
}

const DIAL_RADIUS = 42;
const CENTRE = 55;
const START_ANGLE = -135;
const SWEEP = 270;

function positionToAngle(index: number): number {
  return START_ANGLE + (index * SWEEP) / (DIAL_POSITIONS.length - 1);
}

function polarToXY(angleDeg: number, radius: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTRE + radius * Math.cos(rad),
    y: CENTRE + radius * Math.sin(rad),
  };
}

export function MFTRotaryDial({ position }: MFTRotaryDialProps) {
  const currentIndex = DIAL_POSITIONS.findIndex((p) => p.id === position);
  const pointerAngle = positionToAngle(currentIndex >= 0 ? currentIndex : 0);

  return (
    <svg viewBox="0 0 110 110" className="w-full select-none" aria-label="MFT rotary dial">
      <defs>
        <radialGradient id="mft-dial-bg" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#4b5563" />
          <stop offset="70%" stopColor="#374151" />
          <stop offset="100%" stopColor="#1f2937" />
        </radialGradient>
        <linearGradient id="mft-dial-ring" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="50%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#4b5563" />
        </linearGradient>
        <radialGradient id="mft-knob" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#374151" />
        </radialGradient>
      </defs>

      {/* Outer chrome ring */}
      <circle
        cx={CENTRE}
        cy={CENTRE}
        r={DIAL_RADIUS + 4}
        fill="url(#mft-dial-ring)"
        stroke="#1f2937"
        strokeWidth="0.3"
      />

      {/* Dial face */}
      <circle
        cx={CENTRE}
        cy={CENTRE}
        r={DIAL_RADIUS}
        fill="url(#mft-dial-bg)"
        stroke="#2d3748"
        strokeWidth="0.5"
      />

      {/* Detent marks + tiny labels */}
      {DIAL_POSITIONS.map((pos, i) => {
        const angle = positionToAngle(i);
        const inner = polarToXY(angle, DIAL_RADIUS - 5);
        const outer = polarToXY(angle, DIAL_RADIUS - 1);
        const labelPt = polarToXY(angle, DIAL_RADIUS + 7);
        const isActive = pos.id === position;
        const colour = isActive
          ? '#22d3ee'
          : pos.testCategory === 'dead'
            ? '#fbbf24'
            : pos.testCategory === 'live'
              ? '#f87171'
              : '#6b7280';

        // Short label
        const shortLabel: Record<string, string> = {
          OFF: 'OFF',
          CONTINUITY: 'Ω',
          IR_250V: '250',
          IR_500V: '500',
          LOOP_ZS: 'Zs',
          RCD_30: '30',
          RCD_100: '100',
          RCD_300: '300',
          PFC: 'PFC',
        };

        return (
          <g key={pos.id}>
            <line
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke={colour}
              strokeWidth={isActive ? 2 : 1}
              strokeLinecap="round"
              opacity={isActive ? 1 : 0.5}
            />
            <text
              x={labelPt.x}
              y={labelPt.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={isActive ? '#22d3ee' : '#6b7280'}
              fontSize="5"
              fontWeight={isActive ? 'bold' : '500'}
              fontFamily="system-ui"
            >
              {shortLabel[pos.id] || ''}
            </text>
          </g>
        );
      })}

      {/* Pointer */}
      <g
        style={{
          transform: `rotate(${pointerAngle}deg)`,
          transformOrigin: `${CENTRE}px ${CENTRE}px`,
          transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <line
          x1={CENTRE}
          y1={CENTRE}
          x2={CENTRE + 26}
          y2={CENTRE}
          stroke="#f5f5f0"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle
          cx={CENTRE + 26}
          cy={CENTRE}
          r="2"
          fill="#f5f5f0"
          stroke="#b8b8ae"
          strokeWidth="0.3"
        />
      </g>

      {/* Centre knob */}
      <circle
        cx={CENTRE}
        cy={CENTRE}
        r="8"
        fill="url(#mft-knob)"
        stroke="#4b5563"
        strokeWidth="0.5"
      />
      <circle cx={CENTRE - 2} cy={CENTRE - 2} r="2.5" fill="white" opacity="0.06" />
    </svg>
  );
}
