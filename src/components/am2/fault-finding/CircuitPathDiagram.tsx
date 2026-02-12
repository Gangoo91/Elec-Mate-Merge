/**
 * CircuitPathDiagram v4 — Workshop Panel
 *
 * Realistic interactive circuit topology rendered as physical
 * components mounted on a dark workshop panel. Detailed SVG
 * illustrations with material gradients, CSS 3D depth, and
 * professional lighting effects.
 *
 * Zero extra dependencies — pure SVG + CSS.
 *
 * Layouts:
 *   ring_main → oval ring
 *   bonding / splan → star (centre + branches)
 *   everything else → horizontal flow
 */

import { cn } from '@/lib/utils';
import type { TestPoint } from '@/data/am2-fault-scenarios';

interface CircuitPathDiagramProps {
  circuitType: string;
  testPoints: TestPoint[];
  testsPerformed: string[];
  activePointId: string | null;
  onTapPoint: (pointId: string) => void;
}

// ── Helpers ──────────────────────────────────────────────────

type NodeStatus = 'untested' | 'normal' | 'abnormal';

function getPointStatus(point: TestPoint, testsPerformed: string[]): NodeStatus {
  const performed = point.tests.filter((t) => testsPerformed.includes(t.id));
  if (performed.length === 0) return 'untested';
  return performed.some((t) => t.isAbnormal) ? 'abnormal' : 'normal';
}

function shortName(location: string): string {
  let name = location.replace(/\s*\(.*?\)\s*/g, '').trim();
  if (name.length > 10) {
    name = name
      .replace('Distribution Board', 'DB')
      .replace('Consumer Unit', 'CU')
      .replace('Fused Connection Unit', 'FCU')
      .replace('Wiring Centre', 'Wiring Ctr')
      .replace('Room Thermostat', 'Thermo')
      .replace('Heating Zone Valve', 'Zone Vlv')
      .replace('Main Earthing Terminal', 'MET')
      .replace('Water Pipe Bonding Clamp', 'Water Bond')
      .replace('Gas Pipe Bonding Clamp', 'Gas Bond')
      .replace('Bonding Conductor Route', 'Bond Route')
      .replace('3-Phase Socket', '3Ph Socket')
      .replace('TPN Isolator', 'TPN Iso')
      .replace('DOL Starter', 'DOL Start')
      .replace('Motor Terminal Box', 'Motor TB')
      .replace('Ceiling Rose', 'Light')
      .replace('Junction Box', 'JB')
      .replace('Intermediate Switch', 'Inter Sw')
      .replace('2-Way Switch', '2W Switch')
      .replace('Patch Panel', 'Patch')
      .replace('Data Outlet', 'Data Out')
      .replace('SWA Cable Gland', 'SWA Gland')
      .replace('Spur Socket Outlet', 'Spur')
      .replace('Ring Tap-Off Point', 'Tap-Off')
      .replace('FP200 Cable Run', 'FP200')
      .replace('Bathroom Socket', 'Bath Skt')
      .replace('Socket Outlet', 'Socket');
  }
  return name;
}

// ── Shared SVG Definitions ───────────────────────────────────
// A hidden SVG containing all reusable gradients and filters.
// Prefixed "cpd-" to avoid global ID collisions.

function SharedDefs() {
  return (
    <svg
      className="absolute w-0 h-0 overflow-hidden"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Drop shadow for raised components */}
        <filter id="cpd-sh" x="-10%" y="-10%" width="130%" height="140%">
          <feDropShadow dx="0.5" dy="1.5" stdDeviation="1" floodColor="#000" floodOpacity="0.45" />
        </filter>
        {/* Soft inner glow */}
        <filter id="cpd-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Cable glow */}
        <filter id="cpd-cable-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Dark metal (CU enclosures, motor housings) */}
        <linearGradient id="cpd-metal-dk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#525f6e" />
          <stop offset="40%" stopColor="#3d4856" />
          <stop offset="100%" stopColor="#252e3a" />
        </linearGradient>
        {/* Medium metal (door fronts, panels) */}
        <linearGradient id="cpd-metal-md" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6b7a8a" />
          <stop offset="100%" stopColor="#4a5565" />
        </linearGradient>
        {/* White/cream (socket & switch faceplates) */}
        <linearGradient id="cpd-white" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5f5f0" />
          <stop offset="100%" stopColor="#ddddd4" />
        </linearGradient>
        {/* Copper/brass (busbars, earth terminals) */}
        <linearGradient id="cpd-copper" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="35%" stopColor="#d97706" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        {/* Green/yellow earth */}
        <linearGradient id="cpd-earth" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="25%" stopColor="#eab308" />
          <stop offset="50%" stopColor="#22c55e" />
          <stop offset="75%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        {/* Red industrial (3-phase, isolators) */}
        <linearGradient id="cpd-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        {/* Green MCB / on state */}
        <linearGradient id="cpd-green" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        {/* Blue (N conductor, water, boiler) */}
        <linearGradient id="cpd-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        {/* Plastic black (cable, glands) */}
        <linearGradient id="cpd-plastic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="100%" stopColor="#1f2937" />
        </linearGradient>
        {/* Warm glow for lights */}
        <radialGradient id="cpd-warm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// ── Detailed Component Icons ─────────────────────────────────
// Each renders a filled, shaded illustration of the real component.
// viewBox 32×32, rendered at 32px (w-8 h-8).

function ComponentIcon({ location, status }: { location: string; status: NodeStatus }) {
  const loc = location.toLowerCase();
  const led = status === 'abnormal' ? '#ef4444' : status === 'normal' ? '#22c55e' : '#475569';
  const cls = 'w-8 h-8 shrink-0';

  // ─── Consumer Unit / Distribution Board ───
  if (loc.includes('distribution board') || loc.includes('consumer unit')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Enclosure body */}
        <rect
          x="2"
          y="3"
          width="28"
          height="26"
          rx="2"
          fill="url(#cpd-metal-dk)"
          filter="url(#cpd-sh)"
        />
        {/* Door panel */}
        <rect
          x="3.5"
          y="4.5"
          width="25"
          height="23"
          rx="1.5"
          fill="url(#cpd-metal-md)"
          stroke="#2d3748"
          strokeWidth="0.4"
        />
        {/* Top highlight */}
        <rect x="4" y="4.5" width="24" height="1" rx="0.5" fill="white" opacity="0.06" />
        {/* Busbar (copper) */}
        <rect x="5" y="15.5" width="22" height="2" rx="0.5" fill="url(#cpd-copper)" />
        {/* MCB 1 — green ON */}
        <rect
          x="6"
          y="7"
          width="5"
          height="7"
          rx="1"
          fill="url(#cpd-green)"
          stroke="#15803d"
          strokeWidth="0.4"
        />
        <rect x="7" y="7.5" width="3" height="2" rx="0.5" fill="white" opacity="0.25" />
        {/* MCB 2 — green ON */}
        <rect
          x="13"
          y="7"
          width="5"
          height="7"
          rx="1"
          fill="url(#cpd-green)"
          stroke="#15803d"
          strokeWidth="0.4"
        />
        <rect x="14" y="7.5" width="3" height="2" rx="0.5" fill="white" opacity="0.25" />
        {/* MCB 3 — red TRIPPED */}
        <rect
          x="21"
          y="7"
          width="5"
          height="7"
          rx="1"
          fill="url(#cpd-red)"
          stroke="#991b1b"
          strokeWidth="0.4"
        />
        <rect x="22" y="11" width="3" height="2" rx="0.5" fill="white" opacity="0.2" />
        {/* DIN rail */}
        <line x1="5" y1="19" x2="27" y2="19" stroke="#6b7280" strokeWidth="0.8" />
        {/* Neutral bar */}
        <rect x="5" y="21" width="22" height="1.5" rx="0.5" fill="url(#cpd-blue)" opacity="0.5" />
        {/* Earth bar */}
        <rect x="5" y="24" width="22" height="1.5" rx="0.5" fill="url(#cpd-earth)" opacity="0.6" />
        {/* Mounting screws */}
        <circle cx="5" cy="5.5" r="0.7" fill="#9ca3af" />
        <circle cx="27" cy="5.5" r="0.7" fill="#9ca3af" />
        <circle cx="5" cy="26.5" r="0.7" fill="#9ca3af" />
        <circle cx="27" cy="26.5" r="0.7" fill="#9ca3af" />
        {/* Status LED */}
        <circle cx="16" cy="27" r="1" fill={led} opacity="0.9" />
      </svg>
    );
  }

  // ─── Socket Outlet (BS 1363) ───
  if (loc.includes('socket') || loc.includes('spur') || loc.includes('tap-off')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Wall plate shadow */}
        <rect
          x="3"
          y="3"
          width="26"
          height="26"
          rx="3"
          fill="#94a3b8"
          opacity="0.15"
          filter="url(#cpd-sh)"
        />
        {/* White faceplate */}
        <rect
          x="3"
          y="2.5"
          width="26"
          height="26"
          rx="3"
          fill="url(#cpd-white)"
          stroke="#c2c2b8"
          strokeWidth="0.5"
        />
        {/* Top edge highlight */}
        <rect x="5" y="3" width="22" height="1" rx="0.5" fill="white" opacity="0.4" />
        {/* Earth aperture (top, vertical) */}
        <rect
          x="14.5"
          y="7"
          width="3"
          height="5"
          rx="1"
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="0.4"
        />
        {/* Live aperture (bottom-left, horizontal) */}
        <rect
          x="7"
          y="16"
          width="5.5"
          height="3"
          rx="1"
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="0.4"
        />
        {/* Neutral aperture (bottom-right, horizontal) */}
        <rect
          x="19.5"
          y="16"
          width="5.5"
          height="3"
          rx="1"
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="0.4"
        />
        {/* Mounting screws */}
        <circle cx="7" cy="6" r="1.2" fill="#d4d4c8" stroke="#a8a89d" strokeWidth="0.3" />
        <line x1="6.2" y1="6" x2="7.8" y2="6" stroke="#a8a89d" strokeWidth="0.4" />
        <circle cx="25" cy="25" r="1.2" fill="#d4d4c8" stroke="#a8a89d" strokeWidth="0.3" />
        <line x1="24.2" y1="25" x2="25.8" y2="25" stroke="#a8a89d" strokeWidth="0.4" />
        {/* Switch toggle */}
        <rect
          x="7"
          y="22"
          width="8"
          height="3.5"
          rx="1"
          fill="#e5e5dc"
          stroke="#b8b8ae"
          strokeWidth="0.3"
        />
        <text x="11" y="24.8" textAnchor="middle" fill="#64748b" fontSize="2.5" fontWeight="bold">
          ON
        </text>
        {/* Neon indicator */}
        <circle cx="20" cy="24" r="1" fill={led} opacity="0.8" />
      </svg>
    );
  }

  // ─── Light / Ceiling Rose ───
  if (loc.includes('ceiling rose') || loc.includes('light')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Warm glow (behind) */}
        {status !== 'untested' && <circle cx="16" cy="16" r="14" fill="url(#cpd-warm-glow)" />}
        {/* Rose base plate */}
        <circle
          cx="16"
          cy="16"
          r="11"
          fill="url(#cpd-white)"
          filter="url(#cpd-sh)"
          stroke="#c2c2b8"
          strokeWidth="0.4"
        />
        {/* Inner ring */}
        <circle cx="16" cy="16" r="7" fill="none" stroke="#d4d4c8" strokeWidth="0.6" />
        {/* Terminal block */}
        <rect
          x="12"
          y="13"
          width="8"
          height="6"
          rx="1"
          fill="#e5e5dc"
          stroke="#b8b8ae"
          strokeWidth="0.4"
        />
        {/* Terminals */}
        <circle cx="14" cy="15" r="0.8" fill="url(#cpd-copper)" />
        <circle cx="16" cy="15" r="0.8" fill="url(#cpd-copper)" />
        <circle cx="18" cy="15" r="0.8" fill="url(#cpd-copper)" />
        {/* Cable entry */}
        <circle cx="16" cy="5.5" r="1.5" fill="#4b5563" stroke="#374151" strokeWidth="0.3" />
        {/* Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const r1 = 12;
          const r2 = 14.5;
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={16 + r1 * Math.cos(rad)}
              y1={16 + r1 * Math.sin(rad)}
              x2={16 + r2 * Math.cos(rad)}
              y2={16 + r2 * Math.sin(rad)}
              stroke={status !== 'untested' ? '#fbbf24' : '#475569'}
              strokeWidth="0.8"
              opacity={status !== 'untested' ? 0.6 : 0.25}
              strokeLinecap="round"
            />
          );
        })}
        {/* Status LED */}
        <circle cx="16" cy="27.5" r="1" fill={led} opacity="0.9" />
      </svg>
    );
  }

  // ─── Switch (light switch, 2-way, intermediate) ───
  if (loc.includes('switch')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* White faceplate */}
        <rect
          x="5"
          y="2"
          width="22"
          height="28"
          rx="2.5"
          fill="url(#cpd-white)"
          filter="url(#cpd-sh)"
          stroke="#c2c2b8"
          strokeWidth="0.5"
        />
        {/* Top highlight */}
        <rect x="7" y="2.5" width="18" height="1" rx="0.5" fill="white" opacity="0.4" />
        {/* Rocker surround */}
        <rect
          x="9"
          y="6"
          width="14"
          height="18"
          rx="2"
          fill="#e0e0d6"
          stroke="#b8b8ae"
          strokeWidth="0.4"
        />
        {/* Rocker top half (raised) */}
        <rect x="10" y="7" width="12" height="8" rx="1.5" fill="#eeeeea" />
        <rect x="11" y="7.5" width="10" height="1" rx="0.5" fill="white" opacity="0.3" />
        {/* Rocker bottom half (depressed) */}
        <rect x="10" y="16" width="12" height="7" rx="1.5" fill="#d5d5cb" />
        {/* Rocker divider line */}
        <line x1="10" y1="15.5" x2="22" y2="15.5" stroke="#a8a89d" strokeWidth="0.5" />
        {/* Mounting screws */}
        <circle cx="16" cy="4" r="1" fill="#d4d4c8" stroke="#a8a89d" strokeWidth="0.3" />
        <circle cx="16" cy="28" r="1" fill="#d4d4c8" stroke="#a8a89d" strokeWidth="0.3" />
        {/* Status LED */}
        <circle cx="16" cy="28" r="0.8" fill={led} opacity="0.7" />
      </svg>
    );
  }

  // ─── Junction Box ───
  if (loc.includes('junction box') || loc.includes('loop-in')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Box body */}
        <rect
          x="4"
          y="5"
          width="24"
          height="22"
          rx="3"
          fill="url(#cpd-plastic)"
          filter="url(#cpd-sh)"
          stroke="#4b5563"
          strokeWidth="0.5"
        />
        {/* Lid */}
        <rect
          x="5"
          y="6"
          width="22"
          height="20"
          rx="2.5"
          fill="url(#cpd-metal-md)"
          stroke="#5a6575"
          strokeWidth="0.3"
        />
        {/* Terminals (4 brass screws) */}
        <circle cx="10" cy="12" r="1.8" fill="url(#cpd-copper)" />
        <circle cx="22" cy="12" r="1.8" fill="url(#cpd-copper)" />
        <circle cx="10" cy="20" r="1.8" fill="url(#cpd-copper)" />
        <circle cx="22" cy="20" r="1.8" fill="url(#cpd-copper)" />
        {/* Centre terminal */}
        <circle cx="16" cy="16" r="2" fill="url(#cpd-copper)" />
        {/* Screw slots */}
        <line x1="9" y1="12" x2="11" y2="12" stroke="#92400e" strokeWidth="0.4" />
        <line x1="21" y1="12" x2="23" y2="12" stroke="#92400e" strokeWidth="0.4" />
        <line x1="9" y1="20" x2="11" y2="20" stroke="#92400e" strokeWidth="0.4" />
        <line x1="21" y1="20" x2="23" y2="20" stroke="#92400e" strokeWidth="0.4" />
        <line x1="15" y1="16" x2="17" y2="16" stroke="#92400e" strokeWidth="0.4" />
        {/* Cable entries (knockouts) */}
        <circle
          cx="4"
          cy="16"
          r="2"
          fill="none"
          stroke="#374151"
          strokeWidth="0.5"
          strokeDasharray="1 1"
        />
        <circle
          cx="28"
          cy="16"
          r="2"
          fill="none"
          stroke="#374151"
          strokeWidth="0.5"
          strokeDasharray="1 1"
        />
        {/* Status LED */}
        <circle cx="16" cy="26" r="1" fill={led} opacity="0.9" />
      </svg>
    );
  }

  // ─── Motor ───
  if (loc.includes('motor')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Motor housing */}
        <rect
          x="4"
          y="8"
          width="20"
          height="16"
          rx="2"
          fill="url(#cpd-metal-dk)"
          filter="url(#cpd-sh)"
          stroke="#374151"
          strokeWidth="0.5"
        />
        {/* Cooling fins */}
        {[10, 12.5, 15, 17.5, 20, 22.5].map((y) => (
          <line key={y} x1="5" y1={y} x2="23" y2={y} stroke="#5a6575" strokeWidth="0.5" />
        ))}
        {/* End bell */}
        <rect
          x="22"
          y="9"
          width="3"
          height="14"
          rx="1"
          fill="url(#cpd-metal-md)"
          stroke="#4b5563"
          strokeWidth="0.3"
        />
        {/* Shaft */}
        <rect x="25" y="14" width="5" height="4" rx="1" fill="#9ca3af" />
        <rect x="28" y="14.5" width="2" height="3" rx="0.5" fill="#6b7280" />
        {/* Terminal box */}
        <rect
          x="9"
          y="4"
          width="10"
          height="5"
          rx="1"
          fill="url(#cpd-metal-md)"
          stroke="#4b5563"
          strokeWidth="0.3"
        />
        {/* Terminal screws */}
        <circle cx="12" cy="6.5" r="0.8" fill="url(#cpd-copper)" />
        <circle cx="14" cy="6.5" r="0.8" fill="url(#cpd-copper)" />
        <circle cx="16" cy="6.5" r="0.8" fill="url(#cpd-copper)" />
        {/* M label */}
        <text
          x="13.5"
          y="18"
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="7"
          fontWeight="bold"
          fontFamily="monospace"
        >
          M
        </text>
        {/* Base / feet */}
        <rect x="6" y="24" width="5" height="2" rx="0.5" fill="#4b5563" />
        <rect x="17" y="24" width="5" height="2" rx="0.5" fill="#4b5563" />
        {/* Status LED */}
        <circle cx="14" cy="27" r="1" fill={led} opacity="0.9" />
      </svg>
    );
  }

  // ─── DOL Starter ───
  if (loc.includes('dol')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Enclosure */}
        <rect
          x="4"
          y="3"
          width="24"
          height="26"
          rx="2"
          fill="url(#cpd-metal-dk)"
          filter="url(#cpd-sh)"
          stroke="#374151"
          strokeWidth="0.5"
        />
        {/* Door panel */}
        <rect
          x="5.5"
          y="4.5"
          width="21"
          height="23"
          rx="1.5"
          fill="url(#cpd-metal-md)"
          stroke="#4b5563"
          strokeWidth="0.3"
        />
        {/* START button (green) */}
        <circle cx="12" cy="12" r="3.5" fill="#166534" stroke="#14532d" strokeWidth="0.5" />
        <circle cx="12" cy="12" r="2.5" fill="url(#cpd-green)" />
        <circle cx="11.5" cy="11" r="0.8" fill="white" opacity="0.3" />
        {/* STOP button (red) */}
        <circle cx="20" cy="12" r="3.5" fill="#7f1d1d" stroke="#450a0a" strokeWidth="0.5" />
        <circle cx="20" cy="12" r="2.5" fill="url(#cpd-red)" />
        <circle cx="19.5" cy="11" r="0.8" fill="white" opacity="0.3" />
        {/* Labels */}
        <text x="12" y="19" textAnchor="middle" fill="#94a3b8" fontSize="2.5" fontWeight="bold">
          START
        </text>
        <text x="20" y="19" textAnchor="middle" fill="#94a3b8" fontSize="2.5" fontWeight="bold">
          STOP
        </text>
        {/* Overload indicator */}
        <rect
          x="10"
          y="21"
          width="12"
          height="3"
          rx="1"
          fill="#1e293b"
          stroke="#374151"
          strokeWidth="0.3"
        />
        <circle cx="16" cy="22.5" r="1" fill={led} opacity="0.9" />
        {/* Mounting screws */}
        <circle cx="6.5" cy="5.5" r="0.6" fill="#9ca3af" />
        <circle cx="25.5" cy="5.5" r="0.6" fill="#9ca3af" />
      </svg>
    );
  }

  // ─── TPN Isolator ───
  if (loc.includes('isolator') || loc.includes('tpn')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Body */}
        <rect
          x="5"
          y="3"
          width="22"
          height="26"
          rx="2"
          fill="url(#cpd-metal-dk)"
          filter="url(#cpd-sh)"
        />
        {/* Face panel */}
        <rect
          x="6.5"
          y="4.5"
          width="19"
          height="23"
          rx="1.5"
          fill="url(#cpd-metal-md)"
          stroke="#4b5563"
          strokeWidth="0.3"
        />
        {/* Rotary handle surround */}
        <circle cx="16" cy="14" r="7" fill="#374151" stroke="#4b5563" strokeWidth="0.5" />
        {/* Handle */}
        <rect
          x="13"
          y="9"
          width="6"
          height="10"
          rx="2"
          fill="url(#cpd-red)"
          stroke="#991b1b"
          strokeWidth="0.5"
        />
        <rect x="14" y="10" width="4" height="1.5" rx="0.5" fill="white" opacity="0.2" />
        {/* ON/OFF markings */}
        <text x="16" y="8" textAnchor="middle" fill="#94a3b8" fontSize="2.5" fontWeight="bold">
          OFF
        </text>
        <text x="16" y="24" textAnchor="middle" fill="#94a3b8" fontSize="2.5" fontWeight="bold">
          ON
        </text>
        {/* Status LED */}
        <circle cx="16" cy="26" r="1" fill={led} opacity="0.9" />
      </svg>
    );
  }

  // ─── Thermostat ───
  if (loc.includes('thermostat')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Backplate */}
        <rect
          x="4"
          y="4"
          width="24"
          height="24"
          rx="3"
          fill="url(#cpd-white)"
          filter="url(#cpd-sh)"
          stroke="#c2c2b8"
          strokeWidth="0.5"
        />
        {/* Dial surround */}
        <circle cx="16" cy="15" r="9" fill="#e5e5dc" stroke="#c2c2b8" strokeWidth="0.5" />
        {/* Scale markings */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240].map((angle) => {
          const rad = ((angle - 90) * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={16 + 7 * Math.cos(rad)}
              y1={15 + 7 * Math.sin(rad)}
              x2={16 + 8.5 * Math.cos(rad)}
              y2={15 + 8.5 * Math.sin(rad)}
              stroke="#94a3b8"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
          );
        })}
        {/* Dial face */}
        <circle cx="16" cy="15" r="5.5" fill="#f5f5f0" stroke="#d4d4c8" strokeWidth="0.4" />
        {/* Pointer */}
        <line
          x1="16"
          y1="15"
          x2="20"
          y2="11"
          stroke="#ef4444"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Centre pivot */}
        <circle cx="16" cy="15" r="1.5" fill="#4b5563" stroke="#374151" strokeWidth="0.3" />
        {/* Temperature reading */}
        <text x="16" y="27" textAnchor="middle" fill="#64748b" fontSize="3" fontWeight="bold">
          21°C
        </text>
        {/* Status LED */}
        <circle cx="25" cy="7" r="1" fill={led} opacity="0.9" />
      </svg>
    );
  }

  // ─── Boiler ───
  if (loc.includes('boiler')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Body */}
        <rect
          x="4"
          y="2"
          width="24"
          height="28"
          rx="2"
          fill="url(#cpd-white)"
          filter="url(#cpd-sh)"
          stroke="#c2c2b8"
          strokeWidth="0.5"
        />
        {/* Control panel (top) */}
        <rect x="5" y="3" width="22" height="7" rx="1" fill="#1e293b" />
        {/* Display */}
        <rect
          x="8"
          y="4.5"
          width="10"
          height="4"
          rx="0.8"
          fill="#0f172a"
          stroke="#334155"
          strokeWidth="0.3"
        />
        <text x="13" y="7.5" textAnchor="middle" fill="#60a5fa" fontSize="3" fontFamily="monospace">
          60°
        </text>
        {/* Control buttons */}
        <circle cx="22" cy="5.5" r="1" fill="#22c55e" />
        <circle cx="22" cy="8.5" r="1" fill="#ef4444" />
        {/* Flame viewing window */}
        <rect
          x="8"
          y="14"
          width="16"
          height="10"
          rx="1.5"
          fill="#0f172a"
          stroke="#334155"
          strokeWidth="0.3"
        />
        {/* Flame */}
        <path
          d="M 16 22 C 13 19 12.5 17 13.5 15.5 C 14 14.5 15 14 16 13 C 17 14 18 14.5 18.5 15.5 C 19.5 17 19 19 16 22Z"
          fill="url(#cpd-blue)"
          opacity="0.7"
        />
        <path
          d="M 16 22 C 14.5 20 14 18.5 15 17 C 15.5 16 16 16 16 15 C 16 16 16.5 16 17 17 C 18 18.5 17.5 20 16 22Z"
          fill="#60a5fa"
          opacity="0.5"
        />
        {/* Pipe connections (bottom) */}
        <rect x="8" y="26" width="3" height="4" rx="0.5" fill="url(#cpd-copper)" />
        <rect x="14.5" y="26" width="3" height="4" rx="0.5" fill="url(#cpd-copper)" />
        <rect x="21" y="26" width="3" height="4" rx="0.5" fill="url(#cpd-copper)" />
        {/* Status LED */}
        <circle cx="26" cy="4" r="1" fill={led} opacity="0.9" />
      </svg>
    );
  }

  // ─── Zone Valve ───
  if (loc.includes('zone valve') || loc.includes('valve')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Pipe sections */}
        <rect x="1" y="18" width="10" height="4" rx="1" fill="url(#cpd-copper)" />
        <rect x="21" y="18" width="10" height="4" rx="1" fill="url(#cpd-copper)" />
        {/* Valve body (brass) */}
        <path
          d="M 11 15 L 16 12 L 21 15 L 21 25 L 16 28 L 11 25 Z"
          fill="url(#cpd-copper)"
          filter="url(#cpd-sh)"
          stroke="#92400e"
          strokeWidth="0.5"
        />
        {/* Motorised actuator (top) */}
        <rect
          x="11"
          y="4"
          width="10"
          height="9"
          rx="1.5"
          fill="url(#cpd-metal-md)"
          stroke="#4b5563"
          strokeWidth="0.4"
        />
        {/* Actuator label */}
        <rect x="12" y="5" width="8" height="3" rx="0.5" fill="#1e293b" />
        <text x="16" y="7.5" textAnchor="middle" fill="#94a3b8" fontSize="2.5">
          ZONE
        </text>
        {/* Spindle (connecting actuator to valve) */}
        <rect x="15" y="12" width="2" height="3" fill="#9ca3af" />
        {/* Indicator */}
        <circle cx="16" cy="10.5" r="1" fill={led} opacity="0.9" />
      </svg>
    );
  }

  // ─── Wiring Centre / Programmer ───
  if (loc.includes('wiring centre') || loc.includes('programmer')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Backbox */}
        <rect
          x="2"
          y="5"
          width="28"
          height="22"
          rx="2"
          fill="url(#cpd-plastic)"
          filter="url(#cpd-sh)"
        />
        {/* Front plate */}
        <rect
          x="3"
          y="6"
          width="26"
          height="20"
          rx="1.5"
          fill="url(#cpd-metal-md)"
          stroke="#5a6575"
          strokeWidth="0.3"
        />
        {/* Terminal strip */}
        <rect
          x="5"
          y="9"
          width="22"
          height="5"
          rx="0.8"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="0.3"
        />
        {/* Terminals (brass screws) */}
        {[7, 10, 13, 16, 19, 22, 25].map((x) => (
          <circle key={x} cx={x} cy="11.5" r="1.2" fill="url(#cpd-copper)" />
        ))}
        {/* Wire routing area */}
        <rect x="5" y="16" width="22" height="7" rx="0.8" fill="#0f172a" opacity="0.3" />
        {/* Cable entries */}
        {[8, 13, 19, 24].map((x) => (
          <circle
            key={x}
            cx={x}
            cy="20"
            r="1.5"
            fill="#374151"
            stroke="#4b5563"
            strokeWidth="0.3"
          />
        ))}
        {/* Labels */}
        <text x="7" y="8.5" fill="#94a3b8" fontSize="2">
          L N E HW CH
        </text>
        {/* Status LED */}
        <circle cx="16" cy="25" r="1" fill={led} opacity="0.9" />
      </svg>
    );
  }

  // ─── Smoke / CO Detector ───
  if (loc.includes('detector') || loc.includes('smoke') || loc.includes('co')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Body */}
        <circle
          cx="16"
          cy="16"
          r="12"
          fill="url(#cpd-white)"
          filter="url(#cpd-sh)"
          stroke="#c2c2b8"
          strokeWidth="0.5"
        />
        {/* Grille rings */}
        <circle cx="16" cy="16" r="9" fill="none" stroke="#d4d4c8" strokeWidth="0.6" />
        <circle cx="16" cy="16" r="6.5" fill="none" stroke="#d4d4c8" strokeWidth="0.5" />
        <circle cx="16" cy="16" r="4" fill="none" stroke="#d4d4c8" strokeWidth="0.4" />
        {/* Grille slots */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={16 + 4.5 * Math.cos(rad)}
              y1={16 + 4.5 * Math.sin(rad)}
              x2={16 + 9 * Math.cos(rad)}
              y2={16 + 9 * Math.sin(rad)}
              stroke="#c2c2b8"
              strokeWidth="0.5"
            />
          );
        })}
        {/* Centre button */}
        <circle cx="16" cy="16" r="2.5" fill="#e5e5dc" stroke="#b8b8ae" strokeWidth="0.4" />
        {/* LED indicator */}
        <circle cx="16" cy="10" r="1.2" fill={led} />
        {status === 'abnormal' && <circle cx="16" cy="10" r="3" fill={led} opacity="0.2" />}
      </svg>
    );
  }

  // ─── Earth / Bonding ───
  if (loc.includes('bonding') || loc.includes('earth') || loc.includes('bath')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Earth conductor (green/yellow) */}
        <line
          x1="16"
          y1="2"
          x2="16"
          y2="12"
          stroke="url(#cpd-earth)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Clamp (brass) */}
        <rect
          x="6"
          y="11"
          width="20"
          height="5"
          rx="1.5"
          fill="url(#cpd-copper)"
          filter="url(#cpd-sh)"
          stroke="#92400e"
          strokeWidth="0.4"
        />
        {/* Clamp bolt */}
        <circle cx="10" cy="13.5" r="1.5" fill="#b45309" stroke="#92400e" strokeWidth="0.3" />
        <line x1="9" y1="13.5" x2="11" y2="13.5" stroke="#7c2d12" strokeWidth="0.4" />
        <circle cx="22" cy="13.5" r="1.5" fill="#b45309" stroke="#92400e" strokeWidth="0.3" />
        <line x1="21" y1="13.5" x2="23" y2="13.5" stroke="#7c2d12" strokeWidth="0.4" />
        {/* Earth symbol */}
        <line x1="16" y1="18" x2="16" y2="21" stroke={led} strokeWidth="2" strokeLinecap="round" />
        <line x1="9" y1="22" x2="23" y2="22" stroke={led} strokeWidth="1.5" strokeLinecap="round" />
        <line
          x1="11"
          y1="25"
          x2="21"
          y2="25"
          stroke={led}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="13"
          y1="28"
          x2="19"
          y2="28"
          stroke={led}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // ─── Pipe (with bonding clamp) ───
  if (loc.includes('pipe')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Pipe body */}
        <rect x="1" y="12" width="30" height="8" rx="3" fill="#9ca3af" />
        <rect x="1" y="12" width="30" height="3" rx="1.5" fill="#b0bec5" opacity="0.5" />
        {/* Bonding clamp */}
        <rect
          x="10"
          y="10"
          width="12"
          height="12"
          rx="1.5"
          fill="url(#cpd-copper)"
          filter="url(#cpd-sh)"
          stroke="#92400e"
          strokeWidth="0.4"
        />
        {/* Clamp bolts */}
        <circle cx="13" cy="13" r="1" fill="#b45309" />
        <circle cx="19" cy="13" r="1" fill="#b45309" />
        <circle cx="13" cy="19" r="1" fill="#b45309" />
        <circle cx="19" cy="19" r="1" fill="#b45309" />
        {/* Earth conductor going up */}
        <line
          x1="16"
          y1="4"
          x2="16"
          y2="10"
          stroke="url(#cpd-earth)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Label */}
        <text x="16" y="17" textAnchor="middle" fill="#7c2d12" fontSize="3" fontWeight="bold">
          E
        </text>
        {/* Status LED */}
        <circle cx="16" cy="28" r="1" fill={led} opacity="0.9" />
      </svg>
    );
  }

  // ─── Data / Patch Panel ───
  if (loc.includes('patch panel') || loc.includes('data')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Rack panel */}
        <rect
          x="2"
          y="6"
          width="28"
          height="20"
          rx="1.5"
          fill="#1e293b"
          filter="url(#cpd-sh)"
          stroke="#334155"
          strokeWidth="0.5"
        />
        {/* Mounting ears */}
        <rect x="1" y="7" width="2" height="18" rx="0.5" fill="#4b5563" />
        <rect x="29" y="7" width="2" height="18" rx="0.5" fill="#4b5563" />
        {/* RJ45 ports (2 rows of 4) */}
        {[6, 11, 16, 21].map((x) => (
          <g key={x}>
            <rect
              x={x}
              y="9"
              width="4"
              height="4"
              rx="0.5"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="0.3"
            />
            <rect x={x + 0.5} y="9.5" width="3" height="1" rx="0.3" fill="#374151" />
          </g>
        ))}
        {[6, 11, 16, 21].map((x) => (
          <g key={`b-${x}`}>
            <rect
              x={x}
              y="16"
              width="4"
              height="4"
              rx="0.5"
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="0.3"
            />
            <rect x={x + 0.5} y="16.5" width="3" height="1" rx="0.3" fill="#374151" />
          </g>
        ))}
        {/* Link LEDs */}
        <circle cx="8" cy="14" r="0.6" fill="#22c55e" opacity="0.7" />
        <circle cx="13" cy="14" r="0.6" fill="#22c55e" opacity="0.7" />
        <circle cx="18" cy="14" r="0.6" fill={led} opacity="0.7" />
        <circle cx="23" cy="14" r="0.6" fill="#22c55e" opacity="0.7" />
        {/* Label strip */}
        <rect x="4" y="22" width="24" height="2" rx="0.5" fill="#f5f5f0" opacity="0.15" />
      </svg>
    );
  }

  // ─── Cable / SWA / Gland ───
  if (
    loc.includes('cable') ||
    loc.includes('gland') ||
    loc.includes('swa') ||
    loc.includes('fp200')
  ) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Cable */}
        <rect x="8" y="13" width="16" height="6" rx="3" fill="#1f2937" filter="url(#cpd-sh)" />
        {/* SWA armour stripes */}
        {[10, 13, 16, 19, 22].map((x) => (
          <line key={x} x1={x} y1="13.5" x2={x} y2="18.5" stroke="#4b5563" strokeWidth="0.6" />
        ))}
        {/* Gland (left) */}
        <rect
          x="3"
          y="11.5"
          width="6"
          height="9"
          rx="2"
          fill="url(#cpd-metal-md)"
          stroke="#4b5563"
          strokeWidth="0.4"
        />
        <rect x="4" y="12.5" width="4" height="7" rx="1.5" fill="url(#cpd-copper)" opacity="0.6" />
        {/* Gland (right) */}
        <rect
          x="23"
          y="11.5"
          width="6"
          height="9"
          rx="2"
          fill="url(#cpd-metal-md)"
          stroke="#4b5563"
          strokeWidth="0.4"
        />
        <rect x="24" y="12.5" width="4" height="7" rx="1.5" fill="url(#cpd-copper)" opacity="0.6" />
        {/* Inner conductors visible at cuts */}
        <circle cx="5.5" cy="14.5" r="0.8" fill="#a16207" />
        <circle cx="5.5" cy="16" r="0.8" fill="#2563eb" />
        <circle cx="5.5" cy="17.5" r="0.8" fill="#15803d" />
        {/* Status LED */}
        <circle cx="16" cy="24" r="1" fill={led} opacity="0.9" />
      </svg>
    );
  }

  // ─── FCU (Fused Connection Unit) ───
  if (loc.includes('fused connection') || loc.includes('fcu')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Faceplate */}
        <rect
          x="3"
          y="3"
          width="26"
          height="26"
          rx="3"
          fill="url(#cpd-white)"
          filter="url(#cpd-sh)"
          stroke="#c2c2b8"
          strokeWidth="0.5"
        />
        {/* Switch rocker (top) */}
        <rect
          x="8"
          y="6"
          width="16"
          height="8"
          rx="1.5"
          fill="#e5e5dc"
          stroke="#b8b8ae"
          strokeWidth="0.4"
        />
        <rect x="9" y="7" width="14" height="3" rx="1" fill="#eeeeea" />
        <rect x="10" y="7.5" width="12" height="1" rx="0.5" fill="white" opacity="0.3" />
        {/* Fuse carrier (bottom) */}
        <rect
          x="8"
          y="17"
          width="16"
          height="7"
          rx="1.5"
          fill="#e0e0d6"
          stroke="#b8b8ae"
          strokeWidth="0.4"
        />
        <rect x="10" y="18.5" width="12" height="4" rx="1" fill="#d4d4c8" />
        {/* Fuse label */}
        <text x="16" y="21.5" textAnchor="middle" fill="#64748b" fontSize="3" fontWeight="bold">
          13A
        </text>
        {/* Mounting screws */}
        <circle cx="7" cy="6" r="1" fill="#d4d4c8" stroke="#a8a89d" strokeWidth="0.3" />
        <circle cx="25" cy="26" r="1" fill="#d4d4c8" stroke="#a8a89d" strokeWidth="0.3" />
        {/* Neon indicator */}
        <circle cx="22" cy="8" r="1" fill={led} opacity="0.8" />
      </svg>
    );
  }

  // ─── 3-Phase Socket (industrial) ───
  if (loc.includes('3-phase') || loc.includes('three')) {
    return (
      <svg viewBox="0 0 32 32" className={cls}>
        {/* Mounting flange */}
        <rect
          x="4"
          y="3"
          width="24"
          height="26"
          rx="3"
          fill="url(#cpd-metal-dk)"
          filter="url(#cpd-sh)"
        />
        {/* Socket body (red = 3-phase) */}
        <circle cx="16" cy="15" r="10" fill="url(#cpd-red)" stroke="#991b1b" strokeWidth="0.5" />
        {/* Inner ring */}
        <circle cx="16" cy="15" r="7.5" fill="#7f1d1d" />
        {/* Pin holes (5-pin: L1 L2 L3 N E) */}
        {[
          { cx: 12, cy: 11 },
          { cx: 20, cy: 11 },
          { cx: 10, cy: 17 },
          { cx: 22, cy: 17 },
        ].map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="1.8"
            fill="#450a0a"
            stroke="#991b1b"
            strokeWidth="0.3"
          />
        ))}
        {/* Earth pin (larger, top) */}
        <circle cx="16" cy="8.5" r="2" fill="#450a0a" stroke="#991b1b" strokeWidth="0.3" />
        <text x="16" y="9.5" textAnchor="middle" fill="#92400e" fontSize="2.5" fontWeight="bold">
          E
        </text>
        {/* Keyway notch */}
        <rect x="14.5" y="22" width="3" height="3" rx="0.5" fill="#991b1b" />
        {/* Mounting screws */}
        <circle cx="7" cy="5" r="0.7" fill="#9ca3af" />
        <circle cx="25" cy="5" r="0.7" fill="#9ca3af" />
        <circle cx="7" cy="27" r="0.7" fill="#9ca3af" />
        <circle cx="25" cy="27" r="0.7" fill="#9ca3af" />
        {/* Status LED */}
        <circle cx="16" cy="28" r="1" fill={led} opacity="0.9" />
      </svg>
    );
  }

  // ─── Default (generic terminal) ───
  return (
    <svg viewBox="0 0 32 32" className={cls}>
      <rect
        x="5"
        y="5"
        width="22"
        height="22"
        rx="3"
        fill="url(#cpd-metal-md)"
        filter="url(#cpd-sh)"
        stroke="#4b5563"
        strokeWidth="0.5"
      />
      <circle cx="11" cy="12" r="2" fill="url(#cpd-copper)" />
      <circle cx="21" cy="12" r="2" fill="url(#cpd-copper)" />
      <circle cx="16" cy="20" r="2" fill="url(#cpd-copper)" />
      <line x1="10" y1="12" x2="12" y2="12" stroke="#7c2d12" strokeWidth="0.4" />
      <line x1="20" y1="12" x2="22" y2="12" stroke="#7c2d12" strokeWidth="0.4" />
      <line x1="15" y1="20" x2="17" y2="20" stroke="#7c2d12" strokeWidth="0.4" />
      <circle cx="16" cy="26" r="1" fill={led} opacity="0.9" />
    </svg>
  );
}

// ── Layout ──────────────────────────────────────────────────

interface NodePos {
  xPct: number;
  yPct: number;
}

function getPositions(circuitType: string, count: number): NodePos[] {
  if (circuitType === 'ring_main') {
    return Array.from({ length: count }, (_, i) => {
      const angle = -Math.PI / 2 + (2 * Math.PI * i) / count;
      return {
        xPct: 50 + 30 * Math.cos(angle),
        yPct: 50 + 32 * Math.sin(angle),
      };
    });
  }

  if (circuitType === 'bonding' || circuitType === 'splan') {
    if (count <= 1) return [{ xPct: 50, yPct: 50 }];
    const positions: NodePos[] = [{ xPct: 50, yPct: 16 }];
    const bottomCount = count - 1;
    for (let i = 0; i < bottomCount; i++) {
      const spread = bottomCount === 1 ? 50 : 16 + (68 * i) / (bottomCount - 1);
      positions.push({ xPct: spread, yPct: 82 });
    }
    return positions;
  }

  // Linear — spread evenly
  return Array.from({ length: count }, (_, i) => ({
    xPct: count === 1 ? 50 : 14 + (72 * i) / (count - 1),
    yPct: 50,
  }));
}

function getEdges(circuitType: string, count: number): [number, number][] {
  if (count <= 1) return [];
  if (circuitType === 'ring_main') {
    return Array.from({ length: count }, (_, i) => [i, (i + 1) % count]) as [number, number][];
  }
  if (circuitType === 'bonding' || circuitType === 'splan') {
    return Array.from({ length: count - 1 }, (_, i) => [0, i + 1] as [number, number]);
  }
  return Array.from({ length: count - 1 }, (_, i) => [i, i + 1] as [number, number]);
}

// ── Main Component ──────────────────────────────────────────

export function CircuitPathDiagram({
  circuitType,
  testPoints,
  testsPerformed,
  activePointId,
  onTapPoint,
}: CircuitPathDiagramProps) {
  const positions = getPositions(circuitType, testPoints.length);
  const edges = getEdges(circuitType, testPoints.length);
  const isStar = circuitType === 'bonding' || circuitType === 'splan';
  const isRing = circuitType === 'ring_main';

  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden select-none',
        isStar || isRing ? 'h-56' : 'h-40'
      )}
      style={{
        // Dark workshop panel
        background: 'linear-gradient(160deg, #141a24 0%, #0a0f17 50%, #0d1320 100%)',
      }}
    >
      {/* Shared SVG definitions */}
      <SharedDefs />

      {/* Brushed metal texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)',
          backgroundSize: '3px 100%',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(100,150,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(100,150,255,0.1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Panel edge rivets */}
      {[
        { x: 8, y: 8 },
        { x: 'calc(100% - 8px)', y: 8 },
        { x: 8, y: 'calc(100% - 8px)' },
        { x: 'calc(100% - 8px)', y: 'calc(100% - 8px)' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            left: typeof pos.x === 'number' ? pos.x : undefined,
            right: typeof pos.x === 'string' && pos.x.includes('100%') ? '8px' : undefined,
            top: typeof pos.y === 'number' ? pos.y : undefined,
            bottom: typeof pos.y === 'string' && pos.y.includes('100%') ? '8px' : undefined,
            ...(typeof pos.x === 'number' ? { left: pos.x } : {}),
            background: 'radial-gradient(ellipse at 35% 35%, #6b7280 0%, #374151 100%)',
            boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.4)',
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 40px 12px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.02)',
        }}
      />

      {/* ── Cables ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="cpd-cable-sh" x="-5%" y="-5%" width="115%" height="120%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {edges.map(([from, to], i) => {
          const p1 = positions[from];
          const p2 = positions[to];
          if (!p1 || !p2) return null;

          const s1 = getPointStatus(testPoints[from], testsPerformed);
          const s2 = getPointStatus(testPoints[to], testsPerformed);
          const bothUntested = s1 === 'untested' && s2 === 'untested';
          const anyAbnormal = s1 === 'abnormal' || s2 === 'abnormal';
          const bothTested = s1 !== 'untested' && s2 !== 'untested';

          const coreCol = anyAbnormal
            ? '#ef4444'
            : bothTested
              ? '#22c55e'
              : bothUntested
                ? '#334155'
                : '#64748b';

          return (
            <g key={`edge-${i}`}>
              {/* Cable shadow (on panel) */}
              <line
                x1={`${p1.xPct}%`}
                y1={`${p1.yPct + 0.8}%`}
                x2={`${p2.xPct}%`}
                y2={`${p2.yPct + 0.8}%`}
                stroke="#000"
                strokeWidth={7}
                strokeLinecap="round"
                opacity={0.3}
              />
              {/* Cable outer jacket (grey PVC) */}
              <line
                x1={`${p1.xPct}%`}
                y1={`${p1.yPct}%`}
                x2={`${p2.xPct}%`}
                y2={`${p2.yPct}%`}
                stroke={bothUntested ? '#1e293b' : '#2d3a4a'}
                strokeWidth={5}
                strokeLinecap="round"
              />
              {/* Cable highlight (top edge) */}
              <line
                x1={`${p1.xPct}%`}
                y1={`${p1.yPct}%`}
                x2={`${p2.xPct}%`}
                y2={`${p2.yPct}%`}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth={5}
                strokeLinecap="round"
                style={{ transform: 'translateY(-1px)' }}
              />
              {/* Core conductor (coloured) */}
              <line
                x1={`${p1.xPct}%`}
                y1={`${p1.yPct}%`}
                x2={`${p2.xPct}%`}
                y2={`${p2.yPct}%`}
                stroke={coreCol}
                strokeWidth={bothUntested ? 1 : 1.5}
                strokeDasharray={bothUntested ? '3 5' : undefined}
                strokeLinecap="round"
                opacity={bothUntested ? 0.3 : 0.85}
              />
              {/* Glow on tested cables */}
              {(anyAbnormal || bothTested) && (
                <line
                  x1={`${p1.xPct}%`}
                  y1={`${p1.yPct}%`}
                  x2={`${p2.xPct}%`}
                  y2={`${p2.yPct}%`}
                  stroke={coreCol}
                  strokeWidth={12}
                  strokeLinecap="round"
                  opacity={anyAbnormal ? 0.1 : 0.04}
                  filter="url(#cpd-cable-sh)"
                />
              )}
              {/* Cable clips (small mounting dots at midpoint) */}
              <circle
                cx={`${(p1.xPct + p2.xPct) / 2}%`}
                cy={`${(p1.yPct + p2.yPct) / 2}%`}
                r="2"
                fill="#374151"
                stroke="#4b5563"
                strokeWidth="0.5"
                opacity={bothUntested ? 0.3 : 0.6}
              />
            </g>
          );
        })}
      </svg>

      {/* ── Component Nodes ── */}
      {testPoints.map((point, i) => {
        const pos = positions[i];
        if (!pos) return null;

        const status = getPointStatus(point, testsPerformed);
        const isActive = activePointId === point.id;
        const name = shortName(point.location);

        const accent = isActive
          ? '#22d3ee'
          : status === 'abnormal'
            ? '#ef4444'
            : status === 'normal'
              ? '#22c55e'
              : '#475569';

        const borderCol = isActive
          ? 'rgba(34,211,238,0.5)'
          : status === 'abnormal'
            ? 'rgba(239,68,68,0.4)'
            : status === 'normal'
              ? 'rgba(34,197,94,0.3)'
              : 'rgba(71,85,105,0.15)';

        const labelCol = isActive
          ? '#a5f3fc'
          : status === 'abnormal'
            ? '#fca5a5'
            : status === 'normal'
              ? '#a7f3d0'
              : 'rgba(255,255,255,0.4)';

        return (
          <button
            key={point.id}
            onClick={() => onTapPoint(point.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 touch-manipulation focus:outline-none"
            style={{
              left: `${pos.xPct}%`,
              top: `${pos.yPct}%`,
              zIndex: isActive ? 20 : 2,
            }}
          >
            {/* Active glow (behind card) */}
            {isActive && (
              <div
                className="absolute -inset-4 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at center, ${accent}20 0%, transparent 70%)`,
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
            )}
            {/* Abnormal pulse ring */}
            {status === 'abnormal' && !isActive && (
              <div
                className="absolute -inset-2 rounded-2xl animate-pulse"
                style={{
                  border: '1px solid rgba(239,68,68,0.2)',
                }}
              />
            )}

            {/* Node card with 3D depth */}
            <div
              className="relative rounded-xl overflow-hidden transition-all duration-200"
              style={{
                minWidth: '4.8rem',
                maxWidth: '5.8rem',
                background: `linear-gradient(175deg, rgba(20,28,40,0.85) 0%, rgba(10,15,23,0.95) 100%)`,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: `1.5px solid ${borderCol}`,
                boxShadow: isActive
                  ? `0 0 24px 4px ${accent}20, 0 8px 24px -4px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)`
                  : `0 6px 16px -4px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
                transform: isActive
                  ? 'perspective(600px) rotateX(2deg) scale(1.06)'
                  : 'perspective(600px) rotateX(0deg) scale(1)',
              }}
            >
              {/* Top metallic edge highlight */}
              <div
                className="absolute top-0 left-2 right-2 h-[1px] rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)'}, transparent)`,
                }}
              />

              {/* Component icon (centred, prominent) */}
              <div className="flex justify-center pt-1">
                <ComponentIcon location={point.location} status={status} />
              </div>

              {/* Label */}
              <p
                className="text-[8px] font-semibold text-center leading-tight px-1.5 pb-0.5 truncate"
                style={{ color: labelCol }}
              >
                {name}
              </p>

              {/* Status LED bar at bottom */}
              <div
                className="h-[2px] transition-all duration-500"
                style={{
                  background:
                    status === 'untested'
                      ? 'rgba(71,85,105,0.2)'
                      : `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                  boxShadow: status !== 'untested' ? `0 0 6px 1px ${accent}30` : 'none',
                }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
