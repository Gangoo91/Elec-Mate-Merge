import { PANEL_INSET } from '@/components/ui/panel-recipe';
import { cn } from '@/lib/utils';
/**
 * Connection diagrams for the four core BS 7671 dead tests.
 *
 * These replace five `/placeholder.svg` blocks that rendered as white squares
 * on the dark page, each under a caption promising a diagram that did not
 * exist. Drawn as inline SVG rather than sourced as images: nothing to license,
 * nothing to fetch, legible at any width, and the accent follows the theme.
 *
 * Values and methods are taken from BS 7671:2018+A4:2026 and GN3 — Table 64 for
 * the insulation-resistance minima, GN3 continuity test methods 1 and 2, and
 * Zs = Ze + (R₁ + R₂). Conductor colours follow the convention used throughout
 * the app rather than cable-sheath colours: the accent marks the path being
 * measured, faint white marks conductors that are not part of that measurement.
 */

import type { ReactNode } from 'react';

const Figure = ({ caption, children }: { caption: string; children: ReactNode }) => (
  <figure className={cn(PANEL_INSET)}>
    <div className="w-full overflow-x-auto">{children}</div>
    <figcaption className="mt-3 text-center text-[12px] leading-relaxed text-white/70">
      {caption}
    </figcaption>
  </figure>
);

/* Shared primitives so the four diagrams read as one set. */
const ACCENT = 'stroke-elec-yellow';
const FAINT = 'stroke-white/25';
const STRUCT = 'stroke-white/40';

const Meter = ({ x, y, label }: { x: number; y: number; label: string }) => (
  <g>
    <circle cx={x} cy={y} r={21} className={`${ACCENT} fill-black/40`} strokeWidth={2} />
    <text
      x={x}
      y={y + 5}
      textAnchor="middle"
      className="fill-elec-yellow text-[14px] font-semibold"
    >
      {label}
    </text>
  </g>
);

/**
 * Continuity of protective conductors — GN3 test method 1.
 *
 * The line conductor and cpc are linked together at the board, so the
 * instrument at the far point reads both conductors in series: R₁ + R₂.
 * (Test method 2 — the wander lead from the cpc at the board — measures the
 * protective conductor alone, R₂, and is drawn separately below.)
 */
export const R1R2Diagram = () => (
  <Figure caption="Test method 1 — line and cpc linked at the board, so the instrument reads both conductors in series.">
    <svg viewBox="0 0 440 230" className="mx-auto h-auto w-full min-w-[340px] max-w-[520px]">
      {/* Distribution board */}
      <rect x={24} y={46} width={96} height={150} rx={6} className={STRUCT} fill="none" strokeWidth={1.5} />
      <text x={72} y={38} textAnchor="middle" className="fill-white text-[12px] font-medium">
        Distribution board
      </text>

      {/* Temporary link between line and cpc */}
      <path d="M108 80 H88 V160 H108" className={ACCENT} fill="none" strokeWidth={2.5} />
      <text x={44} y={124} textAnchor="middle" className="fill-elec-yellow text-[11px] font-medium">
        temporary
      </text>
      <text x={44} y={137} textAnchor="middle" className="fill-elec-yellow text-[11px] font-medium">
        link
      </text>

      {/* Conductors out to the point under test */}
      <line x1={120} y1={80} x2={330} y2={80} className={ACCENT} strokeWidth={2.5} />
      <line x1={120} y1={120} x2={330} y2={120} className={FAINT} strokeWidth={1.5} strokeDasharray="5 5" />
      <line x1={120} y1={160} x2={330} y2={160} className={ACCENT} strokeWidth={2.5} />

      <text x={210} y={70} className="fill-white text-[12px] font-medium">
        line — R₁
      </text>
      <text x={210} y={112} className="fill-white/70 text-[11px]">
        neutral — not measured
      </text>
      <text x={210} y={180} className="fill-white text-[12px] font-medium">
        cpc — R₂
      </text>

      {/* Point under test */}
      <circle cx={330} cy={80} r={4} className="fill-elec-yellow" />
      <circle cx={330} cy={160} r={4} className="fill-elec-yellow" />
      <line x1={330} y1={80} x2={366} y2={100} className={ACCENT} strokeWidth={2} />
      <line x1={330} y1={160} x2={366} y2={140} className={ACCENT} strokeWidth={2} />
      <Meter x={387} y={120} label="Ω" />
      <text x={387} y={196} textAnchor="middle" className="fill-white text-[12px] font-semibold">
        reads R₁ + R₂
      </text>
      <text x={330} y={210} textAnchor="middle" className="fill-white/70 text-[11px]">
        at each point on the circuit
      </text>
    </svg>
  </Figure>
);

/** Continuity using a wander lead — GN3 test method 2, which reads R₂ only. */
export const WanderLeadDiagram = () => (
  <Figure caption="Test method 2 — a wander lead from the cpc at the board. This reads the protective conductor alone, R₂, not R₁ + R₂.">
    <svg viewBox="0 0 440 180" className="mx-auto h-auto w-full min-w-[340px] max-w-[520px]">
      <rect x={24} y={40} width={96} height={110} rx={6} className={STRUCT} fill="none" strokeWidth={1.5} />
      <text x={72} y={32} textAnchor="middle" className="fill-white text-[12px] font-medium">
        Distribution board
      </text>
      <text x={72} y={100} textAnchor="middle" className="fill-white text-[12px] font-medium">
        cpc
      </text>
      <circle cx={120} cy={95} r={4} className="fill-elec-yellow" />

      {/* Wander lead */}
      <path d="M120 95 C 190 95, 190 60, 250 60" className={ACCENT} fill="none" strokeWidth={2.5} />
      <text x={185} y={44} textAnchor="middle" className="fill-elec-yellow text-[11px] font-medium">
        wander lead
      </text>

      <Meter x={272} y={60} label="Ω" />
      <path d="M294 60 C 340 60, 340 120, 386 120" className={ACCENT} fill="none" strokeWidth={2.5} />
      <circle cx={386} cy={120} r={4} className="fill-elec-yellow" />
      <text x={386} y={142} textAnchor="middle" className="fill-white text-[12px] font-medium">
        earth terminal
      </text>
      <text x={386} y={158} textAnchor="middle" className="fill-white/70 text-[11px]">
        at each point
      </text>
    </svg>
  </Figure>
);

/**
 * Ring final circuit continuity — the cross-connection used in steps 2 and 3.
 *
 * Regulation 643.2.1 requires live conductor continuity to be verified by
 * resistance measurement on ring final circuits specifically. The parallel
 * paths are what make it work: with the two legs cross-connected at the board,
 * every socket sits at the electrical midpoint of a loop, so each reads about a
 * quarter of the end-to-end figure and — more usefully — they all read the
 * same. An odd one out is the socket that is wired as a spur or a break.
 */
export const RingFinalDiagram = () => (
  <Figure caption="Steps 2 and 3 — the two legs cross-connected at the board. Every socket then reads roughly a quarter of the end-to-end value, and they should all agree.">
    <svg viewBox="0 0 440 240" className="mx-auto h-auto w-full min-w-[340px] max-w-[520px]">
      {/* Board */}
      <rect x={22} y={62} width={78} height={120} rx={6} className={STRUCT} fill="none" strokeWidth={1.5} />
      <text x={61} y={54} textAnchor="middle" className="fill-white text-[12px] font-medium">
        Board
      </text>

      {/* The two legs of the ring, cross-connected at their open ends */}
      <line x1={100} y1={96} x2={126} y2={96} className={ACCENT} strokeWidth={2.5} />
      <line x1={100} y1={150} x2={126} y2={150} className={ACCENT} strokeWidth={2.5} />
      <path d="M126 96 L152 150" className={ACCENT} fill="none" strokeWidth={2.5} />
      <path d="M126 150 L152 96" className={ACCENT} fill="none" strokeWidth={2.5} />
      {/* Sits directly under the crossing; any lower and it crowds the meter. */}
      <text x={139} y={174} textAnchor="middle" className="fill-elec-yellow text-[11px] font-medium">
        cross-
      </text>
      <text x={139} y={187} textAnchor="middle" className="fill-elec-yellow text-[11px] font-medium">
        connected
      </text>

      {/* The ring itself */}
      <path
        d="M152 96 H330 Q368 96 368 123 Q368 150 330 150 H152"
        className={ACCENT}
        fill="none"
        strokeWidth={2.5}
      />

      {/* Sockets around the ring */}
      {[
        [200, 96],
        [280, 96],
        [280, 150],
        [200, 150],
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 9}
          y={y - 9}
          width={18}
          height={18}
          rx={3}
          className={`${ACCENT} fill-black/60`}
          strokeWidth={1.5}
        />
      ))}
      <text x={240} y={82} textAnchor="middle" className="fill-white text-[11px] font-medium">
        socket-outlets on the ring
      </text>

      {/* Measure at one of them */}
      <line x1={200} y1={159} x2={200} y2={186} className={ACCENT} strokeWidth={2} />
      <Meter x={200} y={207} label="Ω" />
      <text x={252} y={212} className="fill-white text-[12px] font-medium">
        measure at each socket
      </text>
    </svg>
  </Figure>
);

/**
 * Insulation resistance — the three test pairs, with the conditions that make
 * the readings meaningful (supply off, N–E link removed on TN-C-S, loads out).
 */
export const InsulationResistanceDiagram = () => (
  <Figure caption="The three test pairs. Supply isolated, loads disconnected, and on TN-C-S the neutral–earth link removed — leave it in and L–E and N–E read through it.">
    <svg viewBox="0 0 440 230" className="mx-auto h-auto w-full min-w-[340px] max-w-[520px]">
      {/* Open main switch */}
      <text x={62} y={30} textAnchor="middle" className="fill-white text-[12px] font-medium">
        main switch OFF
      </text>
      <line x1={30} y1={60} x2={58} y2={60} className={STRUCT} strokeWidth={2} />
      <line x1={58} y1={60} x2={86} y2={44} className={STRUCT} strokeWidth={2} />
      <circle cx={58} cy={60} r={3} className="fill-white/40" />
      <circle cx={92} cy={60} r={3} className="fill-white/40" />

      {/* The three conductors */}
      <line x1={92} y1={60} x2={410} y2={60} className={ACCENT} strokeWidth={2.5} />
      <line x1={30} y1={115} x2={410} y2={115} className={ACCENT} strokeWidth={2.5} />
      <line x1={30} y1={170} x2={410} y2={170} className={ACCENT} strokeWidth={2.5} />
      <text x={16} y={64} textAnchor="middle" className="fill-white text-[13px] font-semibold">L</text>
      <text x={16} y={119} textAnchor="middle" className="fill-white text-[13px] font-semibold">N</text>
      <text x={16} y={174} textAnchor="middle" className="fill-white text-[13px] font-semibold">E</text>

      {/* Removed N–E link */}
      <line x1={130} y1={115} x2={130} y2={170} className={FAINT} strokeWidth={2} strokeDasharray="4 4" />
      <line x1={122} y1={134} x2={138} y2={150} className="stroke-red-400" strokeWidth={2} />
      <line x1={138} y1={134} x2={122} y2={150} className="stroke-red-400" strokeWidth={2} />
      <text x={130} y={200} textAnchor="middle" className="fill-white text-[11px] font-medium">
        N–E link
      </text>
      <text x={130} y={214} textAnchor="middle" className="fill-white text-[11px] font-medium">
        removed
      </text>

      {/* Test 1: L–N */}
      <path d="M225 60 V115" className={ACCENT} fill="none" strokeWidth={2} />
      <circle cx={225} cy={87} r={13} className={`${ACCENT} fill-black/60`} strokeWidth={1.5} />
      <text x={225} y={91} textAnchor="middle" className="fill-elec-yellow text-[9px] font-semibold">MΩ</text>
      <text x={225} y={44} textAnchor="middle" className="fill-white text-[11px] font-medium">L–N</text>

      {/* Test 2: L–E. The meter deliberately sits above the N conductor rather
          than on it — centred on the crossing it reads as a tap into neutral. */}
      <path d="M300 60 V170" className={ACCENT} fill="none" strokeWidth={2} />
      <circle cx={300} cy={88} r={13} className={`${ACCENT} fill-black/60`} strokeWidth={1.5} />
      <text x={300} y={92} textAnchor="middle" className="fill-elec-yellow text-[9px] font-semibold">MΩ</text>
      <text x={300} y={44} textAnchor="middle" className="fill-white text-[11px] font-medium">L–E</text>

      {/* Test 3: N–E */}
      <path d="M370 115 V170" className={ACCENT} fill="none" strokeWidth={2} />
      <circle cx={370} cy={142} r={13} className={`${ACCENT} fill-black/60`} strokeWidth={1.5} />
      <text x={370} y={146} textAnchor="middle" className="fill-elec-yellow text-[9px] font-semibold">MΩ</text>
      <text x={370} y={200} textAnchor="middle" className="fill-white text-[11px] font-medium">N–E</text>
    </svg>
  </Figure>
);

/**
 * Earth fault loop. The loop is drawn as a closed circuit so the two halves
 * that make up Zs are visible: everything left of the origin is Ze, everything
 * right of it is the circuit's own R₁ + R₂.
 */
export const ZsLoopDiagram = () => (
  <Figure caption="The fault current loop. Ze is everything outside the installation; R₁ + R₂ is the circuit itself — together they are Zs.">
    <svg viewBox="0 0 440 240" className="mx-auto h-auto w-full min-w-[340px] max-w-[520px]">
      {/* Source transformer winding */}
      <path
        d="M44 78 a10 10 0 0 1 0 20 a10 10 0 0 1 0 20 a10 10 0 0 1 0 20"
        className={STRUCT}
        fill="none"
        strokeWidth={2}
      />
      {/* Labelled below the loop, not beside it — centred on the coil they sat
          on top of the left-hand conductor. */}
      <text x={54} y={206} textAnchor="middle" className="fill-white text-[11px] font-medium">
        supply transformer
      </text>

      {/* The loop */}
      <path d="M44 78 V56 H360 V104" className={ACCENT} fill="none" strokeWidth={2.5} />
      <path d="M360 136 V184 H44 V138" className={ACCENT} fill="none" strokeWidth={2.5} />

      {/* Origin of the installation */}
      <line x1={186} y1={40} x2={186} y2={200} className={FAINT} strokeWidth={1.5} strokeDasharray="5 5" />
      <text x={186} y={32} textAnchor="middle" className="fill-white text-[11px] font-medium">
        origin
      </text>

      <text x={115} y={78} textAnchor="middle" className="fill-white text-[12px] font-semibold">Ze</text>
      <text x={115} y={94} textAnchor="middle" className="fill-white/70 text-[10px]">external</text>
      <text x={275} y={78} textAnchor="middle" className="fill-white text-[12px] font-semibold">R₁</text>
      <text x={275} y={176} textAnchor="middle" className="fill-white text-[12px] font-semibold">R₂</text>

      {/* Fault point */}
      <circle cx={360} cy={120} r={16} className="stroke-red-400 fill-black/50" strokeWidth={2} />
      <text x={360} y={125} textAnchor="middle" className="fill-red-300 text-[12px] font-semibold">F</text>
      <text x={392} y={124} className="fill-white text-[11px] font-medium">fault</text>

      <text x={220} y={224} textAnchor="middle" className="fill-elec-yellow text-[14px] font-semibold">
        Zs = Ze + (R₁ + R₂)
      </text>
    </svg>
  </Figure>
);

/** Polarity — the single-pole device in the line conductor, and ES centre contact. */
export const PolarityDiagram = () => (
  <Figure caption="Single-pole devices switch the line conductor, never the neutral; an ES lampholder takes line on the centre contact so the shell is not live.">
    <svg viewBox="0 0 440 276" className="mx-auto h-auto w-full min-w-[340px] max-w-[520px]">
      {/* Upper: switch in the line conductor */}
      <text x={20} y={26} className="fill-white text-[12px] font-semibold">
        Single-pole switch
      </text>
      <line x1={30} y1={62} x2={150} y2={62} className={ACCENT} strokeWidth={2.5} />
      <line x1={150} y1={62} x2={186} y2={44} className={ACCENT} strokeWidth={2.5} />
      <circle cx={150} cy={62} r={3.5} className="fill-elec-yellow" />
      <circle cx={192} cy={62} r={3.5} className="fill-elec-yellow" />
      <line x1={192} y1={62} x2={300} y2={62} className={ACCENT} strokeWidth={2.5} />
      <text x={16} y={66} textAnchor="middle" className="fill-white text-[13px] font-semibold">L</text>
      <text x={168} y={32} textAnchor="middle" className="fill-elec-yellow text-[11px] font-medium">
        in the line
      </text>

      <line x1={30} y1={104} x2={300} y2={104} className={FAINT} strokeWidth={2} />
      <text x={16} y={108} textAnchor="middle" className="fill-white text-[13px] font-semibold">N</text>
      <text x={165} y={122} textAnchor="middle" className="fill-white/70 text-[11px]">
        neutral runs unbroken
      </text>

      {/* Lamp */}
      <circle cx={330} cy={83} r={20} className={STRUCT} fill="none" strokeWidth={2} />
      <line x1={300} y1={62} x2={330} y2={63} className={ACCENT} strokeWidth={2.5} />
      <line x1={300} y1={104} x2={330} y2={103} className={FAINT} strokeWidth={2} />

      <line x1={20} y1={150} x2={420} y2={150} className="stroke-white/10" strokeWidth={1} />

      {/* Lower: ES lampholder */}
      <text x={20} y={176} className="fill-white text-[12px] font-semibold">
        ES lampholder
      </text>
      {/* Shell */}
      <path d="M150 200 h80 v44 h-80 z" className={STRUCT} fill="none" strokeWidth={2} />
      <path d="M150 208 h80 M150 218 h80 M150 228 h80 M150 238 h80" className={FAINT} strokeWidth={1.5} />
      {/* Centre contact */}
      <rect x={230} y={214} width={16} height={16} className="fill-elec-yellow" />
      <line x1={246} y1={222} x2={330} y2={222} className={ACCENT} strokeWidth={2.5} />
      <text x={340} y={226} className="fill-white text-[12px] font-medium">
        line
      </text>
      <line x1={150} y1={244} x2={120} y2={244} className={FAINT} strokeWidth={2} />
      <text x={62} y={248} className="fill-white text-[12px] font-medium">
        neutral
      </text>
      <text x={190} y={264} textAnchor="middle" className="fill-white/70 text-[11px]">
        screw shell
      </text>
    </svg>
  </Figure>
);
