import type { ReactNode } from 'react';
import { DiagramFigure } from './renewablePv';

/* ──────────────────────────────────────────────────────────────────────
   Gap-fill bespoke SVG diagrams (audit pass). Same conventions as
   renewablePv.tsx / renewablePvSiting.tsx.
   ────────────────────────────────────────────────────────────────────── */

const W85 = '#FFFFFF';
const W50 = 'rgba(255,255,255,0.82)';
const YEL = '#FFC400';
const BLU = '#60A5FA';
const GRN = '#34D399';
const RED = '#F87171';
const AMB = '#F59E0B';
const SLT = '#94A3B8';

/* ── M5 S2 — BMS architecture ─────────────────────────────────────────── */
export function BmsArchitecture({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Battery management system" caption={caption}>
      <svg viewBox="0 0 360 240" className="w-full h-auto" role="img" aria-label="BMS monitoring cells and controlling the main contactor">
        <defs><marker id="bmsA" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={GRN} /></marker></defs>

        {/* cell stack */}
        <rect x="28" y="50" width="54" height="118" rx="3" fill="none" stroke={SLT} strokeOpacity="0.5" />
        {[56, 79, 102, 125, 148].map((y) => (<rect key={y} x="33" y={y} width="44" height="18" rx="2" fill="#1e3a8a" stroke={BLU} strokeOpacity="0.5" />))}
        <text x="55" y="220" fontSize="9" fill={W85} textAnchor="middle">Li-ion cells</text>

        {/* DC+ bus along top, through contactor, to output */}
        <path d="M55,50 L55,38 L258,38" fill="none" stroke={RED} strokeWidth="2" />
        <rect x="258" y="30" width="26" height="16" rx="2" fill="#2a1414" stroke={RED} strokeOpacity="0.7" />
        <text x="271" y="42" fontSize="8.5" fill={RED} textAnchor="middle">K</text>
        <path d="M284,38 L322,38" fill="none" stroke={RED} strokeWidth="2" />
        <text x="326" y="41" fontSize="9" fill={RED}>DC+</text>
        {/* DC- bus */}
        <path d="M55,168 L55,202 L322,202" fill="none" stroke={W50} strokeWidth="1.6" />
        <text x="326" y="205" fontSize="9" fill={W50}>DC−</text>

        {/* sense wires cells → BMS */}
        {[60, 83, 106, 129, 152].map((y) => (<line key={y} x1="77" y1={y} x2="150" y2={y} stroke={GRN} strokeWidth="1" opacity="0.5" />))}

        {/* BMS box */}
        <rect x="150" y="62" width="104" height="108" rx="6" fill="#11261c" stroke={GRN} strokeOpacity="0.55" />
        <text x="202" y="80" fontSize="11" fill={GRN} textAnchor="middle" fontWeight="700">BMS</text>
        {['per-cell V + T', 'cell balancing', 'SoC / SoH', 'fault detection'].map((t, i) => (
          <text key={t} x="160" y={98 + i * 15} fontSize="8.5" fill={W85}>• {t}</text>
        ))}

        {/* BMS controls the contactor (trip) */}
        <path d="M240,62 L271,46" fill="none" stroke={YEL} strokeWidth="1.4" strokeDasharray="4 3" />
        <text x="250" y="58" fontSize="8" fill={YEL}>trips</text>

        {/* comms out */}
        <line x1="202" y1="170" x2="202" y2="190" stroke={GRN} strokeWidth="1.4" markerEnd="url(#bmsA)" />
        <text x="210" y="187" fontSize="8.5" fill={GRN}>→ inverter / portal</text>

        <text x="20" y="20" fontSize="9" fill={W50}>The BMS monitors every cell and opens the contactor on a fault.</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M10 S2 — EMS energy-flow hub ─────────────────────────────────────── */
export function EmsArchitecture({ caption }: { caption?: ReactNode }) {
  const ems = { x: 180, y: 116 };
  const nodes: [string, number, number, string][] = [
    ['PV', 70, 44, GRN], ['Grid', 290, 44, BLU], ['BESS', 48, 116, GRN],
    ['EV', 312, 116, AMB], ['Heat pump', 84, 196, AMB], ['House loads', 286, 196, SLT],
  ];
  return (
    <DiagramFigure eyebrow="Energy management system" caption={caption}>
      <svg viewBox="0 0 360 244" className="w-full h-auto" role="img" aria-label="EMS coordinating PV, battery, EV, heat pump, grid and loads">
        {nodes.map(([label, x, y, col]) => (
          <line key={`l${label}`} x1={ems.x} y1={ems.y} x2={x} y2={y} stroke={col} strokeWidth="1.4" opacity="0.5" />
        ))}
        <circle cx={ems.x} cy={ems.y} r="34" fill="#1a1207" stroke={YEL} strokeOpacity="0.7" />
        <text x={ems.x} y={ems.y - 2} fontSize="11" fill={YEL} textAnchor="middle" fontWeight="700">EMS</text>
        <text x={ems.x} y={ems.y + 12} fontSize="7.5" fill={W50} textAnchor="middle">priority + optimise</text>
        {nodes.map(([label, x, y, col]) => (
          <g key={label}>
            <rect x={x - 32} y={y - 13} width="64" height="26" rx="5" fill="#0f1115" stroke={col} strokeOpacity="0.55" />
            <text x={x} y={y + 4} fontSize="9.5" fill={W85} textAnchor="middle">{label}</text>
          </g>
        ))}
        <text x="180" y="234" fontSize="8.5" fill={W50} textAnchor="middle">Priority: self-use → battery → EV → export (within limits).</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M10 S4 — EREC G100 export limitation ─────────────────────────────── */
export function G100ExportLimit({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="EREC G100 export limitation" caption={caption}>
      <svg viewBox="0 0 360 232" className="w-full h-auto" role="img" aria-label="G100 export limiting via CT measurement and inverter curtailment">
        <defs><marker id="g100A" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={YEL} /></marker></defs>
        {/* spine: inverter → CU/loads → grid */}
        <rect x="20" y="70" width="74" height="40" rx="5" fill="#11261c" stroke={GRN} strokeOpacity="0.6" />
        <text x="57" y="86" fontSize="9.5" fill={GRN} textAnchor="middle">Generation</text>
        <text x="57" y="99" fontSize="8" fill={W50} textAnchor="middle">PV / BESS inverter</text>

        <rect x="142" y="70" width="64" height="40" rx="5" fill="#0f1115" stroke={SLT} strokeOpacity="0.6" />
        <text x="174" y="86" fontSize="9.5" fill={W85} textAnchor="middle">CU + loads</text>
        <text x="174" y="99" fontSize="8" fill={W50} textAnchor="middle">self-use first</text>

        <rect x="270" y="70" width="70" height="40" rx="5" fill="#0f1622" stroke={BLU} strokeOpacity="0.6" />
        <text x="305" y="86" fontSize="9.5" fill={BLU} textAnchor="middle">Grid</text>
        <text x="305" y="99" fontSize="8" fill={W50} textAnchor="middle">DNO connection</text>

        <line x1="94" y1="90" x2="142" y2="90" stroke={W50} strokeWidth="2" />
        <line x1="206" y1="90" x2="270" y2="90" stroke={W50} strokeWidth="2" />

        {/* CT clamp at the connection point */}
        <circle cx="238" cy="90" r="9" fill="none" stroke={YEL} strokeWidth="2" />
        <text x="238" y="118" fontSize="8" fill={YEL} textAnchor="middle">CT</text>

        {/* controller + control loop back to inverter */}
        <rect x="120" y="150" width="120" height="30" rx="5" fill="#1a1207" stroke={YEL} strokeOpacity="0.7" />
        <text x="180" y="169" fontSize="9" fill={YEL} textAnchor="middle">Export limiter / controller</text>
        <path d="M238,99 L238,150" fill="none" stroke={YEL} strokeWidth="1.4" strokeDasharray="4 3" />
        <text x="244" y="130" fontSize="7.5" fill={YEL}>measures export</text>
        <path d="M120,165 L57,165 L57,110" fill="none" stroke={YEL} strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#g100A)" />
        <text x="62" y="146" fontSize="7.5" fill={YEL}>curtails</text>

        <text x="20" y="34" fontSize="9" fill={W50}>Export is measured at the connection point and generation</text>
        <text x="20" y="48" fontSize="9" fill={W50}>curtailed in real time — fit more generation than the</text>
        <text x="20" y="62" fontSize="9" fill={W50}>DNO would otherwise let you freely export.</text>
        <text x="20" y="212" fontSize="8.5" fill={GRN}>Export held at the agreed limit (e.g. 3.68 kW, or 0 = zero-export).</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M11 S6 — multi-source fault-current contribution ─────────────────── */
export function MultiSourceFaultContribution({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Fault contribution — multi-source" caption={caption}>
      <svg viewBox="0 0 360 234" className="w-full h-auto" role="img" aria-label="Fault current arriving from grid and inverter sources">
        <defs>
          <marker id="fbig" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={RED} /></marker>
          <marker id="fsm" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={AMB} /></marker>
        </defs>

        {/* fault point */}
        <g transform="translate(180,150)">
          <path d="M-4,-20 L6,-4 L-2,-2 L6,16 L-8,-2 L0,-4 Z" fill={RED} />
        </g>
        <text x="180" y="178" fontSize="9" fill={RED} textAnchor="middle">fault</text>

        {/* grid — big stiff contribution */}
        <rect x="20" y="34" width="78" height="30" rx="5" fill="#0f1622" stroke={BLU} strokeOpacity="0.6" />
        <text x="59" y="53" fontSize="9.5" fill={BLU} textAnchor="middle">Grid (stiff)</text>
        <path d="M70,64 C110,100 150,120 174,138" fill="none" stroke={RED} strokeWidth="3.4" markerEnd="url(#fbig)" />
        <text x="38" y="126" fontSize="8" fill={RED}>high PFC</text>

        {/* PV inverter — limited */}
        <rect x="142" y="30" width="76" height="28" rx="5" fill="#11261c" stroke={GRN} strokeOpacity="0.6" />
        <text x="180" y="48" fontSize="9" fill={GRN} textAnchor="middle">PV inverter</text>
        <path d="M180,58 L180,130" fill="none" stroke={AMB} strokeWidth="1.6" markerEnd="url(#fsm)" />
        <text x="186" y="120" fontSize="8" fill={AMB}>≈1–1.5×</text>

        {/* BESS inverter — limited */}
        <rect x="262" y="34" width="78" height="30" rx="5" fill="#11261c" stroke={GRN} strokeOpacity="0.6" />
        <text x="301" y="53" fontSize="9" fill={GRN} textAnchor="middle">BESS inverter</text>
        <path d="M290,64 C250,100 210,120 188,138" fill="none" stroke={AMB} strokeWidth="1.6" markerEnd="url(#fsm)" />
        <text x="258" y="94" fontSize="8" fill={AMB}>limited</text>

        <text x="20" y="198" fontSize="8.5" fill={W50}>Grid + rotating sources = high prospective fault current.</text>
        <text x="20" y="210" fontSize="8.5" fill={W50}>Inverters are current-limited (≈1–1.5× rated) but still add —</text>
        <text x="20" y="222" fontSize="8.5" fill={W50}>protection must allow in-feed from every direction.</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M9 S7 — micro-hydro scheme ───────────────────────────────────────── */
export function MicroHydroScheme({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Micro-hydro scheme" caption={caption}>
      <svg viewBox="0 0 360 232" className="w-full h-auto" role="img" aria-label="Micro-hydro scheme: intake, penstock, turbine and generator">
        <defs><marker id="hyA" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={BLU} /></marker></defs>
        {/* hillside */}
        <path d="M0,74 L120,74 L286,168 L360,168 L360,232 L0,232 Z" fill="#1c2a20" stroke={GRN} strokeOpacity="0.25" />

        {/* intake reservoir (top) */}
        <rect x="22" y="48" width="82" height="26" rx="2" fill={BLU} fillOpacity="0.3" stroke={BLU} strokeOpacity="0.6" />
        <text x="63" y="64" fontSize="8.5" fill={W85} textAnchor="middle">intake + screen</text>

        {/* penstock pipe down the slope */}
        <line x1="82" y1="74" x2="250" y2="162" stroke="#6b7280" strokeWidth="7" />
        <line x1="82" y1="74" x2="250" y2="162" stroke="#9ca3af" strokeWidth="2" />
        <text x="160" y="86" fontSize="8.5" fill={W50}>penstock</text>
        <line x1="106" y1="90" x2="136" y2="106" stroke={BLU} strokeWidth="1.6" markerEnd="url(#hyA)" />
        <text x="92" y="116" fontSize="8" fill={BLU}>flow Q</text>

        {/* powerhouse: turbine + generator */}
        <rect x="238" y="150" width="92" height="40" rx="4" fill="#11261c" stroke={GRN} strokeOpacity="0.6" />
        <text x="284" y="166" fontSize="9" fill={GRN} textAnchor="middle">turbine + generator</text>
        <text x="284" y="180" fontSize="8" fill={W50} textAnchor="middle">grid-parallel ⎓→AC</text>

        {/* head dimension */}
        <line x1="14" y1="61" x2="14" y2="170" stroke={YEL} strokeWidth="1" />
        <line x1="9" y1="61" x2="19" y2="61" stroke={YEL} strokeWidth="1" />
        <line x1="9" y1="170" x2="19" y2="170" stroke={YEL} strokeWidth="1" />
        <text x="22" y="118" fontSize="8.5" fill={YEL}>head H</text>

        {/* electrical output */}
        <text x="284" y="206" fontSize="8.5" fill={GRN} textAnchor="middle">→ grid (G98 / G99)</text>
        <text x="200" y="40" fontSize="9" fill={W85}>Power ∝ head × flow</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M11 S4 — LPS for a PV roof (BS EN 62305-3) ───────────────────────── */
export function LpsForPv({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="LPS for PV — BS EN 62305-3" caption={caption}>
      <svg viewBox="0 0 360 240" className="w-full h-auto" role="img" aria-label="Lightning protection system on a PV-equipped building">
        {/* ground */}
        <line x1="0" y1="206" x2="360" y2="206" stroke="#ffffff" strokeOpacity="0.3" />
        <text x="14" y="200" fontSize="8" fill={W50}>ground</text>

        {/* building + gable roof */}
        <rect x="70" y="126" width="150" height="80" fill="#26262c" stroke="#ffffff" strokeOpacity="0.15" />
        <path d="M60,126 L145,80 L230,126 Z" fill="#34343c" stroke="#ffffff" strokeOpacity="0.15" />

        {/* PV panels on the left roof slope */}
        <polygon points="70,120 138,84 144,94 76,130" fill="#1e3a8a" stroke={BLU} strokeOpacity="0.6" />
        <line x1="92" y1="112" x2="98" y2="122" stroke={BLU} strokeOpacity="0.45" />
        <line x1="114" y1="100" x2="120" y2="110" stroke={BLU} strokeOpacity="0.45" />
        <text x="92" y="152" fontSize="8" fill={BLU}>PV array</text>

        {/* air termination rod at the ridge */}
        <line x1="145" y1="80" x2="145" y2="46" stroke={SLT} strokeWidth="2" />
        <circle cx="145" cy="46" r="2.5" fill={SLT} />
        <text x="150" y="52" fontSize="8" fill={W85}>air termination</text>

        {/* down conductor: ridge → right eave → earth electrode */}
        <path d="M145,46 L145,80 M230,126 L255,126 L255,206" fill="none" stroke="#F59E0B" strokeWidth="2" />
        <path d="M145,80 L230,126" fill="none" stroke="#F59E0B" strokeWidth="2" />
        <text x="262" y="170" fontSize="8" fill={AMB}>down conductor</text>

        {/* earth termination */}
        <rect x="251" y="206" width="8" height="22" fill={AMB} />
        <line x1="245" y1="228" x2="265" y2="228" stroke={AMB} strokeWidth="2" />
        <text x="255" y="240" fontSize="8" fill={AMB} textAnchor="middle">earth termination</text>

        {/* separation distance */}
        <line x1="150" y1="108" x2="226" y2="108" stroke={RED} strokeWidth="1" strokeDasharray="3 2" />
        <text x="188" y="103" fontSize="8" fill={RED} textAnchor="middle">separation s</text>

        <text x="20" y="24" fontSize="9" fill={W50}>The LPS must keep a separation distance from the PV — or bond to it</text>
        <text x="20" y="37" fontSize="9" fill={W50}>if separation can't be met (BS EN 62305-3).</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M11 S5 — SPD coordination cascade (Type 1 / 2 / 3) ───────────────── */
export function SpdCoordination({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="SPD coordination" caption={caption}>
      <svg viewBox="0 0 360 232" className="w-full h-auto" role="img" aria-label="Coordinated Type 1, 2 and 3 SPD cascade">
        {/* descending surge level (steps) */}
        {[
          ['6 kV', 30, 56, RED], ['→ 2.5 kV', 138, 80, AMB], ['→ 1.5 kV', 250, 100, GRN],
        ].map(([t, x, y, col]) => (
          <g key={t as string}>
            <rect x={x as number} y={y as number} width="64" height={150 - (y as number)} fill={col as string} fillOpacity="0.12" stroke={col as string} strokeOpacity="0.4" />
            <text x={(x as number) + 32} y={(y as number) - 4} fontSize="8.5" fill={col as string} textAnchor="middle">{t as string}</text>
          </g>
        ))}

        {/* installation line */}
        <line x1="20" y1="150" x2="340" y2="150" stroke={W50} strokeWidth="2" />
        {[
          ['Origin', 62, 'T1', '10/350 µs'], ['Dist. board', 170, 'T2', '8/20 µs'], ['Equipment', 282, 'T3', 'at the load'],
        ].map(([label, x, t, sub]) => (
          <g key={label as string}>
            <rect x={(x as number) - 30} y="138" width="60" height="24" rx="3" fill="#0f1115" stroke="#ffffff" strokeOpacity="0.2" />
            <text x={x as number} y="153" fontSize="8.5" fill={W85} textAnchor="middle">{label as string}</text>
            {/* SPD shunt to earth */}
            <line x1={x as number} y1="162" x2={x as number} y2="184" stroke={YEL} strokeWidth="1.6" />
            <rect x={(x as number) - 16} y="184" width="32" height="16" rx="2" fill="#1a1207" stroke={YEL} strokeOpacity="0.6" />
            <text x={x as number} y="195" fontSize="8" fill={YEL} textAnchor="middle">{t as string}</text>
            <text x={x as number} y="220" fontSize="7.5" fill={W50} textAnchor="middle">{sub as string}</text>
          </g>
        ))}
        {/* earth bar */}
        <line x1="20" y1="206" x2="340" y2="206" stroke={YEL} strokeOpacity="0.4" strokeWidth="1.5" />

        <text x="20" y="24" fontSize="9" fill={W50}>Each stage clamps the surge lower — a coordinated cascade.</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M2 S3 — series strings vs parallel strings ───────────────────────── */
export function StringArrayConfig({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Strings & arrays" caption={caption}>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
          <div className="text-[11px] font-semibold text-white mb-1 leading-tight">Series — a string</div>
          <svg viewBox="0 0 150 96" className="w-full h-auto" role="img" aria-label="Modules in series">
            {[8, 56, 104].map((x) => (<rect key={x} x={x} y="38" width="34" height="22" rx="2" fill="#1e3a8a" stroke={BLU} strokeOpacity="0.6" />))}
            <line x1="42" y1="49" x2="56" y2="49" stroke={W50} strokeWidth="1.6" />
            <line x1="90" y1="49" x2="104" y2="49" stroke={W50} strokeWidth="1.6" />
            <text x="14" y="34" fontSize="7.5" fill={GRN}>+</text>
            <text x="136" y="34" fontSize="7.5" fill={RED}>−</text>
            <text x="75" y="20" fontSize="8" fill={YEL} textAnchor="middle">V₁+V₂+V₃ adds</text>
            <text x="75" y="78" fontSize="7.5" fill={W50} textAnchor="middle">same current</text>
          </svg>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
          <div className="text-[11px] font-semibold text-white mb-1 leading-tight">Parallel — strings</div>
          <svg viewBox="0 0 150 96" className="w-full h-auto" role="img" aria-label="Strings in parallel">
            {[28, 60].map((y) => (<rect key={y} x="20" y={y} width="70" height="16" rx="2" fill="#1e3a8a" stroke={BLU} strokeOpacity="0.6" />))}
            <path d="M90,36 L112,36 L112,68 L90,68" fill="none" stroke={W50} strokeWidth="1.6" />
            <line x1="112" y1="52" x2="132" y2="52" stroke={W50} strokeWidth="1.6" />
            <circle cx="112" cy="52" r="2" fill={GRN} />
            <text x="55" y="20" fontSize="8" fill={YEL} textAnchor="middle">I₁+I₂ adds</text>
            <text x="55" y="90" fontSize="7.5" fill={W50} textAnchor="middle">same voltage</text>
          </svg>
        </div>
      </div>
      <div className="mt-3 rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.06] p-3 text-[11.5px] text-white/85 leading-relaxed">
        Series adds <span className="font-semibold text-elec-yellow">voltage</span>; parallel adds <span className="font-semibold text-elec-yellow">current</span>. The catch: a cold morning pushes V_oc <strong className="text-white">up</strong> — size the string so the coldest-day open-circuit voltage still stays under the inverter's limit.
      </div>
    </DiagramFigure>
  );
}

/* ── M2 S4 — MPP on the P-V curve + tracking ──────────────────────────── */
export function MpptTrackingCurve({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Maximum power point tracking" caption={caption}>
      <svg viewBox="0 0 360 244" className="w-full h-auto" role="img" aria-label="P-V curve with the maximum power point and MPPT tracking">
        <line x1="50" y1="200" x2="340" y2="200" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="200" x2="50" y2="34" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        <text x="195" y="232" fontSize="11" fill={W85} textAnchor="middle">Voltage (V)</text>
        <text x="18" y="120" fontSize="11" fill={W85} textAnchor="middle" transform="rotate(-90 18 120)">Power (W)</text>

        {/* full sun curve + lower irradiance curve */}
        <path d="M50,200 C150,196 214,52 256,58 C290,64 304,150 322,200" fill="none" stroke={YEL} strokeWidth="2.4" />
        <path d="M50,200 C146,197 206,104 244,110 C276,116 292,160 308,200" fill="none" stroke={BLU} strokeWidth="2" />
        <circle cx="256" cy="58" r="4.5" fill={YEL} />
        <circle cx="244" cy="110" r="4" fill={BLU} />
        <text x="262" y="52" fontSize="9" fill={YEL}>MPP (full sun)</text>
        <text x="250" y="126" fontSize="9" fill={BLU}>MPP (cloud)</text>

        {/* MPP shifts arrow */}
        <path d="M254,66 L246,102" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
        <text x="62" y="64" fontSize="8.5" fill={W50}>MPPT continuously hunts</text>
        <text x="62" y="77" fontSize="8.5" fill={W50}>the voltage giving peak</text>
        <text x="62" y="90" fontSize="8.5" fill={W50}>power as conditions change.</text>

        <line x1="256" y1="58" x2="256" y2="200" stroke={YEL} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
        <text x="256" y="214" fontSize="8.5" fill={YEL} textAnchor="middle">V_mp</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M4 S1 — PV surplus diverter ──────────────────────────────────────── */
export function PvDiverterFlow({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="PV surplus diverter" caption={caption}>
      <svg viewBox="0 0 360 220" className="w-full h-auto" role="img" aria-label="PV surplus diverted to an immersion heater instead of exporting">
        <defs><marker id="dvA" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={GRN} /></marker></defs>
        {/* PV → CU */}
        <rect x="20" y="40" width="70" height="34" rx="5" fill="#11261c" stroke={GRN} strokeOpacity="0.6" />
        <text x="55" y="61" fontSize="9" fill={GRN} textAnchor="middle">PV inverter</text>
        <rect x="140" y="40" width="64" height="34" rx="5" fill="#0f1115" stroke={SLT} strokeOpacity="0.6" />
        <text x="172" y="61" fontSize="9" fill={W85} textAnchor="middle">CU</text>
        <line x1="90" y1="57" x2="140" y2="57" stroke={GRN} strokeWidth="2" markerEnd="url(#dvA)" />

        {/* CU → grid (with CT) and → house */}
        <rect x="270" y="40" width="70" height="34" rx="5" fill="#0f1622" stroke={BLU} strokeOpacity="0.6" />
        <text x="305" y="61" fontSize="9" fill={BLU} textAnchor="middle">Grid</text>
        <line x1="204" y1="57" x2="270" y2="57" stroke={W50} strokeWidth="2" />
        <circle cx="238" cy="57" r="8" fill="none" stroke={YEL} strokeWidth="2" />
        <text x="238" y="36" fontSize="8" fill={YEL} textAnchor="middle">CT</text>

        {/* diverter senses CT, feeds immersion */}
        <rect x="120" y="118" width="104" height="30" rx="5" fill="#1a1207" stroke={YEL} strokeOpacity="0.7" />
        <text x="172" y="137" fontSize="9" fill={YEL} textAnchor="middle">Solar diverter</text>
        <path d="M238,65 L238,133 L224,133" fill="none" stroke={YEL} strokeWidth="1.4" strokeDasharray="4 3" />
        <text x="244" y="100" fontSize="7.5" fill={YEL}>senses surplus</text>

        {/* immersion */}
        <rect x="120" y="170" width="104" height="30" rx="5" fill="#2a1f11" stroke={AMB} strokeOpacity="0.7" />
        <text x="172" y="189" fontSize="9" fill={AMB} textAnchor="middle">Immersion heater</text>
        <line x1="172" y1="148" x2="172" y2="170" stroke={AMB} strokeWidth="2" markerEnd="url(#dvA)" />

        <text x="20" y="24" fontSize="9" fill={W50}>Surplus that would export cheaply is diverted to heat hot water instead.</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M7 S5 — dynamic load management ──────────────────────────────────── */
export function DlmArchitecture({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Dynamic load management" caption={caption}>
      <svg viewBox="0 0 360 224" className="w-full h-auto" role="img" aria-label="DLM controller sharing supply capacity across chargers">
        <defs><marker id="dlmA" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={AMB} /></marker></defs>
        {/* supply + main CT */}
        <rect x="140" y="26" width="80" height="28" rx="5" fill="#0f1622" stroke={BLU} strokeOpacity="0.6" />
        <text x="180" y="44" fontSize="9" fill={BLU} textAnchor="middle">Grid supply</text>
        <circle cx="180" cy="66" r="8" fill="none" stroke={YEL} strokeWidth="2" />
        <text x="196" y="69" fontSize="8" fill={YEL}>main CT</text>
        <line x1="180" y1="54" x2="180" y2="58" stroke={W50} strokeWidth="2" />

        {/* DLM controller */}
        <rect x="120" y="84" width="120" height="28" rx="5" fill="#1a1207" stroke={YEL} strokeOpacity="0.7" />
        <text x="180" y="102" fontSize="9" fill={YEL} textAnchor="middle">DLM controller</text>
        <line x1="180" y1="74" x2="180" y2="84" stroke={YEL} strokeWidth="1.4" />

        {/* building load tap */}
        <rect x="276" y="84" width="74" height="28" rx="5" fill="#0f1115" stroke={SLT} strokeOpacity="0.6" />
        <text x="313" y="102" fontSize="8.5" fill={W85} textAnchor="middle">building load</text>
        <line x1="240" y1="98" x2="276" y2="98" stroke={W50} strokeWidth="1.4" />

        {/* chargers */}
        {[40, 150, 260].map((x, i) => (
          <g key={x}>
            <line x1="180" y1="112" x2={x + 35} y2="150" stroke={AMB} strokeWidth="1.4" markerEnd="url(#dlmA)" />
            <rect x={x} y="150" width="70" height="30" rx="5" fill="#11261c" stroke={GRN} strokeOpacity="0.6" />
            <text x={x + 35} y="166" fontSize="8.5" fill={GRN} textAnchor="middle">Charger {i + 1}</text>
            <text x={x + 35} y="195" fontSize="8" fill={AMB} textAnchor="middle">{['7 kW', '5 kW', '5 kW'][i]}</text>
          </g>
        ))}
        <text x="180" y="216" fontSize="8.5" fill={W50} textAnchor="middle">Allocations flex so the total never exceeds the supply capacity.</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M10 S5 — V2G bidirectional charging ──────────────────────────────── */
export function V2gFlow({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Vehicle-to-Grid (V2G)" caption={caption}>
      <svg viewBox="0 0 360 200" className="w-full h-auto" role="img" aria-label="Bidirectional power flow between EV, charger and grid/home">
        <defs>
          <marker id="v2gC" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={GRN} /></marker>
          <marker id="v2gD" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={AMB} /></marker>
        </defs>
        <rect x="20" y="78" width="84" height="44" rx="6" fill="#0f1622" stroke={BLU} strokeOpacity="0.6" />
        <text x="62" y="98" fontSize="9.5" fill={BLU} textAnchor="middle">EV battery</text>
        <text x="62" y="112" fontSize="8" fill={W50} textAnchor="middle">"battery on wheels"</text>

        <rect x="138" y="78" width="84" height="44" rx="6" fill="#1a1207" stroke={YEL} strokeOpacity="0.7" />
        <text x="180" y="98" fontSize="9" fill={YEL} textAnchor="middle">Bidirectional</text>
        <text x="180" y="111" fontSize="8.5" fill={YEL} textAnchor="middle">charger</text>

        <rect x="256" y="78" width="84" height="44" rx="6" fill="#11261c" stroke={GRN} strokeOpacity="0.6" />
        <text x="298" y="98" fontSize="9.5" fill={GRN} textAnchor="middle">Home / grid</text>

        {/* charge: grid → car */}
        <path d="M256,90 L222,90 M138,90 L104,90" fill="none" stroke={GRN} strokeWidth="2" markerEnd="url(#v2gC)" />
        <text x="180" y="62" fontSize="8.5" fill={GRN} textAnchor="middle">charge — off-peak ←</text>
        {/* discharge: car → grid */}
        <path d="M104,110 L138,110 M222,110 L256,110" fill="none" stroke={AMB} strokeWidth="2" markerEnd="url(#v2gD)" />
        <text x="180" y="142" fontSize="8.5" fill={AMB} textAnchor="middle">discharge — peak / backup →</text>

        <text x="180" y="170" fontSize="8.5" fill={W50} textAnchor="middle">Charge when power's cheap, feed back at peak —</text>
        <text x="180" y="184" fontSize="8.5" fill={W50} textAnchor="middle">needs a bidirectional charger + DNO sign-off.</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M6 S5 — outdoor EV charger mounting zones ────────────────────────── */
export function EvMountingZones({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Outdoor mounting — EV charger" caption={caption}>
      <svg viewBox="0 0 360 220" className="w-full h-auto" role="img" aria-label="EV charge point mounting height and location zones">
        {/* wall + ground */}
        <rect x="40" y="20" width="170" height="176" fill="#1a1a1f" stroke="#ffffff" strokeOpacity="0.1" />
        <line x1="20" y1="196" x2="250" y2="196" stroke="#ffffff" strokeOpacity="0.35" />
        {Array.from({ length: 8 }).map((_, i) => (<line key={i} x1={26 + i * 28} y1="196" x2={18 + i * 28} y2="206" stroke="#ffffff" strokeOpacity="0.25" />))}
        <text x="44" y="190" fontSize="8" fill={W50}>wall</text>

        {/* charger */}
        <rect x="120" y="74" width="64" height="58" rx="5" fill="#11261c" stroke={GRN} strokeOpacity="0.6" />
        <text x="152" y="100" fontSize="9" fill={GRN} textAnchor="middle">EV charge</text>
        <text x="152" y="113" fontSize="9" fill={GRN} textAnchor="middle">point</text>
        <circle cx="152" cy="126" r="3" fill={YEL} />
        <text x="160" y="129" fontSize="7.5" fill={YEL}>socket</text>

        {/* mounting-height dimension */}
        <line x1="100" y1="126" x2="100" y2="196" stroke={YEL} strokeWidth="1" />
        <line x1="95" y1="126" x2="105" y2="126" stroke={YEL} strokeWidth="1" />
        <line x1="95" y1="196" x2="105" y2="196" stroke={YEL} strokeWidth="1" />
        <text x="58" y="165" fontSize="8.5" fill={YEL}>0.75–1.2 m</text>

        {/* notes */}
        {['IP44+ (outdoor rated)', '≥ 0.5 m from corners', 'above splash / flood level', 'clear of vehicle swing'].map((t, i) => (
          <g key={t}><circle cx="232" cy={70 + i * 22} r="2" fill={GRN} /><text x="240" y={73 + i * 22} fontSize="8.5" fill={W85}>{t}</text></g>
        ))}
      </svg>
    </DiagramFigure>
  );
}

/* ── M8 S3 — ASHP outdoor unit siting + clearances ────────────────────── */
export function HeatPumpSiting({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="ASHP siting + clearances" caption={caption}>
      <svg viewBox="0 0 360 214" className="w-full h-auto" role="img" aria-label="Air-source heat pump outdoor unit clearances and cable protection">
        <defs><marker id="hpA" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={GRN} /></marker></defs>
        {/* wall (building) on right + ground */}
        <rect x="286" y="20" width="54" height="168" fill="#1a1a1f" stroke="#ffffff" strokeOpacity="0.1" />
        <text x="313" y="34" fontSize="8" fill={W50} textAnchor="middle">building</text>
        <line x1="20" y1="178" x2="340" y2="178" stroke="#ffffff" strokeOpacity="0.35" />

        {/* ASHP unit on feet */}
        <rect x="120" y="104" width="96" height="54" rx="4" fill="#11261c" stroke={GRN} strokeOpacity="0.6" />
        <text x="168" y="128" fontSize="9" fill={GRN} textAnchor="middle">ASHP unit</text>
        <text x="168" y="142" fontSize="8" fill={W50} textAnchor="middle">fan / discharge ←</text>
        <rect x="128" y="158" width="8" height="14" fill={SLT} /><rect x="200" y="158" width="8" height="14" fill={SLT} />

        {/* front airflow clearance */}
        <line x1="116" y1="131" x2="48" y2="131" stroke={GRN} strokeWidth="1.4" markerEnd="url(#hpA)" />
        <text x="50" y="124" fontSize="8" fill={GRN}>≥ 1 m airflow</text>
        {/* rear clearance to wall */}
        <line x1="216" y1="131" x2="286" y2="131" stroke={GRN} strokeWidth="1" strokeDasharray="3 2" />
        <text x="222" y="124" fontSize="7.5" fill={GRN}>≥ 300 mm</text>

        {/* condensate drain */}
        <line x1="168" y1="172" x2="168" y2="184" stroke={BLU} strokeWidth="1.6" />
        <text x="174" y="190" fontSize="7.5" fill={BLU}>condensate drain</text>

        {/* cable entry (protected) into building */}
        <path d="M210,150 L260,150 L260,120 L286,120" fill="none" stroke={AMB} strokeWidth="2" />
        <text x="228" y="166" fontSize="7.5" fill={AMB}>SWA → isolator</text>

        <text x="20" y="206" fontSize="8.5" fill={W50}>Clearances keep airflow + service access; mount on a stand.</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M8 S6 — DHW cylinder integration ─────────────────────────────────── */
export function DhwCylinderIntegration({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="DHW cylinder integration" caption={caption}>
      <svg viewBox="0 0 360 232" className="w-full h-auto" role="img" aria-label="Hot water cylinder with heat-pump coil and backup immersion">
        {/* cylinder */}
        <rect x="146" y="34" width="72" height="172" rx="20" fill="#15171c" stroke="#ffffff" strokeOpacity="0.2" />

        {/* hot out (top) + cold in (bottom) */}
        <line x1="182" y1="34" x2="182" y2="16" stroke={RED} strokeWidth="2" />
        <text x="188" y="22" fontSize="8" fill={RED}>hot out</text>
        <line x1="182" y1="206" x2="182" y2="222" stroke={BLU} strokeWidth="2" />
        <text x="120" y="214" fontSize="8" fill={BLU} textAnchor="end">cold in</text>

        {/* heat-pump coil (lower) */}
        <path d="M158,168 q24,-10 48,0 M158,156 q24,-10 48,0 M158,144 q24,-10 48,0" fill="none" stroke={GRN} strokeWidth="2" />
        <line x1="146" y1="156" x2="96" y2="156" stroke={GRN} strokeWidth="2" />
        <line x1="146" y1="168" x2="96" y2="168" stroke={GRN} strokeWidth="2" />
        <text x="92" y="150" fontSize="8" fill={GRN} textAnchor="end">flow / return</text>
        <text x="92" y="172" fontSize="8" fill={GRN} textAnchor="end">↔ heat pump</text>

        {/* backup immersion (upper) */}
        <rect x="160" y="84" width="44" height="8" rx="2" fill={AMB} />
        <line x1="218" y1="88" x2="268" y2="88" stroke={AMB} strokeWidth="2" />
        <text x="272" y="84" fontSize="8" fill={AMB}>backup</text>
        <text x="272" y="95" fontSize="8" fill={AMB}>immersion</text>
        <text x="272" y="106" fontSize="7.5" fill={W50}>(own circuit)</text>

        {/* thermostat */}
        <circle cx="182" cy="120" r="4" fill="none" stroke={W50} strokeWidth="1.4" />
        <text x="192" y="123" fontSize="7.5" fill={W50}>cylinder stat</text>

        <text x="180" y="224" fontSize="8.5" fill={W50} textAnchor="middle">Heat-pump coil heats the water; the immersion is electric backup.</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M5 S7 — BESS ventilation + clearances ────────────────────────────── */
export function BessVentilationClearances({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="BESS clearances + ventilation" caption={caption}>
      <svg viewBox="0 0 360 220" className="w-full h-auto" role="img" aria-label="Battery unit mounting clearances and ventilation">
        <defs><marker id="vA" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill={BLU} /></marker></defs>
        {/* wall + floor */}
        <line x1="30" y1="186" x2="330" y2="186" stroke="#ffffff" strokeOpacity="0.35" />
        <text x="36" y="180" fontSize="8" fill={W50}>floor</text>

        {/* BESS unit */}
        <rect x="138" y="74" width="84" height="76" rx="5" fill="#11261c" stroke={GRN} strokeOpacity="0.6" />
        <text x="180" y="108" fontSize="9.5" fill={GRN} textAnchor="middle">BESS unit</text>
        <text x="180" y="122" fontSize="8" fill={W50} textAnchor="middle">Li-ion</text>

        {/* clearance dims */}
        <line x1="180" y1="74" x2="180" y2="62" stroke={YEL} strokeWidth="1" strokeDasharray="3 2" />
        <text x="180" y="58" fontSize="8" fill={YEL} textAnchor="middle">top clearance</text>
        <line x1="138" y1="112" x2="92" y2="112" stroke={YEL} strokeWidth="1" strokeDasharray="3 2" />
        <text x="86" y="108" fontSize="8" fill={YEL} textAnchor="end">side</text>
        <line x1="222" y1="112" x2="268" y2="112" stroke={YEL} strokeWidth="1" strokeDasharray="3 2" />
        <text x="272" y="108" fontSize="8" fill={YEL}>side</text>
        <line x1="180" y1="150" x2="180" y2="186" stroke={YEL} strokeWidth="1" strokeDasharray="3 2" />
        <text x="186" y="172" fontSize="8" fill={YEL}>floor gap</text>

        {/* ventilation airflow */}
        <line x1="132" y1="70" x2="132" y2="48" stroke={BLU} strokeWidth="1.4" markerEnd="url(#vA)" />
        <line x1="228" y1="70" x2="228" y2="48" stroke={BLU} strokeWidth="1.4" markerEnd="url(#vA)" />
        <text x="180" y="40" fontSize="7.5" fill={BLU} textAnchor="middle">heat / off-gas rises</text>

        {/* note */}
        <text x="20" y="206" fontSize="8.5" fill={W50}>Manufacturer + PAS 63100 clearances · away from escape routes · fire separation.</text>
      </svg>
    </DiagramFigure>
  );
}
