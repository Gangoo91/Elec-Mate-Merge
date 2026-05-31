import type { ReactNode } from 'react';
import { DiagramFigure } from './renewablePv';

/* ──────────────────────────────────────────────────────────────────────
   Module 3 — bespoke SVG figures (siting, sizing, install, verification).
   Same conventions as renewablePv.tsx: inline SVG, viewBox + w-full,
   explicit fill attributes, dark course palette.
   ────────────────────────────────────────────────────────────────────── */

const W85 = '#FFFFFF';
const W50 = 'rgba(255,255,255,0.82)';
const YEL = '#FFC400';
const BLU = '#60A5FA';
const GRN = '#34D399';
const RED = '#F87171';
const AMB = '#F59E0B';
const SLT = '#94A3B8';

/* ── M3 S2 — inverter MPPT string-sizing envelope ─────────────────────── */
export function MpptEnvelope({ caption }: { caption?: ReactNode }) {
  // x: cell temp −15..70 °C → 60..330 ; y: string V 150..620 → 210..40
  const xT = (t: number) => 60 + ((t + 15) / 85) * 270;
  const yV = (v: number) => 210 - ((v - 150) / 470) * 170;
  return (
    <DiagramFigure eyebrow="String-sizing envelope" caption={caption}>
      <svg viewBox="0 0 360 244" className="w-full h-auto" role="img" aria-label="String voltage versus cell temperature inside the inverter MPPT window">
        {/* axes */}
        <line x1="60" y1="210" x2="340" y2="210" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        <line x1="60" y1="210" x2="60" y2="34" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        <text x="200" y="236" fontSize="11" fill={W85} textAnchor="middle">Cell temperature (°C)</text>
        <text x="16" y="122" fontSize="11" fill={W85} textAnchor="middle" transform="rotate(-90 16 122)">String voltage (V)</text>
        {[-15, 25, 70].map((t) => (<text key={t} x={xT(t)} y="222" fontSize="9" fill={W50} textAnchor="middle">{t}</text>))}

        {/* MPPT window band 200–550 V */}
        <rect x="60" y={yV(550)} width="280" height={yV(200) - yV(550)} fill={GRN} opacity="0.10" />
        <line x1="60" y1={yV(550)} x2="340" y2={yV(550)} stroke={GRN} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
        <line x1="60" y1={yV(200)} x2="340" y2={yV(200)} stroke={GRN} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
        <text x="336" y={yV(550) - 4} fontSize="8.5" fill={GRN} textAnchor="end">MPPT max 550 V</text>
        <text x="336" y={yV(200) - 4} fontSize="8.5" fill={GRN} textAnchor="end">MPPT min 200 V</text>

        {/* inverter absolute max 600 V */}
        <line x1="60" y1={yV(600)} x2="340" y2={yV(600)} stroke={RED} strokeWidth="1.4" strokeDasharray="5 3" />
        <text x="336" y={yV(600) - 5} fontSize="8.5" fill={RED} textAnchor="end">Inverter absolute max 600 V</text>

        {/* V_oc line (top) and V_mp line (operating) */}
        <path d={`M${xT(-15)},${yV(599.3)} L${xT(70)},${yV(490)}`} fill="none" stroke={RED} strokeWidth="2" />
        <path d={`M${xT(-15)},${yV(500)} L${xT(25)},${yV(442)} L${xT(70)},${yV(362)}`} fill="none" stroke={YEL} strokeWidth="2.4" />

        {/* points */}
        <circle cx={xT(-15)} cy={yV(599.3)} r="4" fill={RED} />
        <text x={xT(-15) + 9} y={yV(599.3) + 13} fontSize="9" fill={RED}>599 V @ −15 °C</text>
        <circle cx={xT(25)} cy={yV(442)} r="4" fill={YEL} />
        <text x={xT(25) + 9} y={yV(442) - 6} fontSize="9" fill={YEL}>442 V @ STC</text>
        <circle cx={xT(70)} cy={yV(362)} r="4" fill={YEL} />
        <text x={xT(70) - 7} y={yV(362) + 16} fontSize="9" fill={YEL} textAnchor="end">362 V @ 70 °C</text>

        {/* legend (band interior) + the two sizing rules */}
        <g fontSize="8.5">
          <rect x="70" y="150" width="10" height="3" fill={RED} /><text x="84" y="153.5" fill={W85}>V_oc (open-circuit)</text>
          <rect x="70" y="163" width="10" height="3" fill={YEL} /><text x="84" y="166.5" fill={W85}>V_mp (operating)</text>
        </g>
        <text x="60" y="24" fontSize="8.5" fill={W50}>Rule 1: coldest V_oc &lt; inverter max · Rule 2: hottest V_mp &gt; MPPT min</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M3 S7 — I-V curve commissioning signatures (4 panels) ────────────── */
function MiniIV({ d, title, tone, fault }: { d: string; title: string; tone: string; fault?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
      <div className="text-[11px] font-semibold text-white mb-1 leading-tight">{title}</div>
      <svg viewBox="0 0 150 104" className="w-full h-auto" role="img" aria-label={title}>
        <line x1="22" y1="86" x2="142" y2="86" stroke="#ffffff" strokeWidth="0.8" opacity="0.4" />
        <line x1="22" y1="86" x2="22" y2="12" stroke="#ffffff" strokeWidth="0.8" opacity="0.4" />
        <text x="14" y="20" fontSize="7" fill={W50}>I</text>
        <text x="138" y="98" fontSize="7" fill={W50}>V</text>
        <path d={d} fill="none" stroke={tone} strokeWidth="2" />
        {fault ? <text x="82" y="78" fontSize="7.5" fill={tone} textAnchor="middle">{fault}</text> : null}
      </svg>
    </div>
  );
}

export function IvCommissioningCurves({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="I-V commissioning signatures" caption={caption}>
      <div className="grid grid-cols-2 gap-2.5">
        <MiniIV title="1 · Good install" tone={GRN} d="M22,22 L92,24 C112,26 120,34 122,46 C124,64 130,78 134,86" />
        <MiniIV title="2 · Partial shading" tone={YEL} fault="bypass-diode step" d="M22,22 L70,23 L70,44 L96,46 C112,48 118,58 120,66 C122,76 128,82 132,86" />
        <MiniIV title="3 · Low MPP" tone={BLU} fault="lower P_max" d="M22,40 L92,42 C110,44 117,50 119,60 C121,72 127,80 132,86" />
        <MiniIV title="4 · Loose connection" tone={RED} fault="low fill factor" d="M22,24 C70,26 96,30 110,42 C120,52 124,68 128,86" />
      </div>
      <div className="mt-3 rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.06] p-3 text-[11.5px] text-white/85 leading-relaxed">
        The <span className="font-semibold text-elec-yellow">shape</span> of the curve is the diagnosis: a step means a bypass diode has activated (shading / a dead cell-group); a low smooth peak means under-performance; a rounded knee near V_oc means resistance — a loose or corroded connection.
      </div>
    </DiagramFigure>
  );
}

/* ── M3 S4 — PV DC cable cross-section (end-on) ───────────────────────── */
export function PvDcCableCrossSection({ caption }: { caption?: ReactNode }) {
  const cx = 118;
  const cy = 120;
  return (
    <DiagramFigure eyebrow="PV DC cable construction" caption={caption}>
      <svg viewBox="0 0 360 244" className="w-full h-auto" role="img" aria-label="End-on cross-section of a single-core PV DC cable">
        <defs>
          <radialGradient id="cu" cx="0.4" cy="0.4" r="0.7"><stop offset="0" stopColor="#FCD9A8" /><stop offset="1" stopColor="#B8742A" /></radialGradient>
        </defs>
        {/* layers */}
        <circle cx={cx} cy={cy} r="86" fill="#1f2937" stroke="#ffffff" strokeOpacity="0.2" />
        <circle cx={cx} cy={cy} r="86" fill="none" stroke={SLT} strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="62" fill="#334155" />
        <circle cx={cx} cy={cy} r="38" fill="url(#cu)" />
        {/* stranding */}
        {[[0,0],[0,-22],[0,22],[-22,0],[22,0],[15,15],[-15,15],[15,-15],[-15,-15]].map(([dx,dy],i)=>(
          <circle key={i} cx={cx+dx} cy={cy+dy} r="7" fill="none" stroke="#7c4a16" strokeWidth="1" opacity="0.6" />
        ))}

        {/* labels with leaders */}
        {[
          ['Tinned-copper conductor', cy - 2, 38, '#FCD9A8'],
          ['XLPO inner insulation', cy - 50, 50, SLT],
          ['UV-stable outer sheath', cy - 76, 74, SLT],
        ].map(([label, ly, r, col]) => (
          <g key={label as string}>
            <line x1={cx} y1={cy - (r as number)} x2="232" y2={ly as number} stroke="#ffffff" strokeWidth="0.7" opacity="0.35" />
            <circle cx={cx} cy={cy - (r as number)} r="2" fill={col as string} />
            <text x="236" y={(ly as number) + 3} fontSize="9.5" fill={W85}>{label as string}</text>
          </g>
        ))}

        {/* spec block */}
        <text x="236" y="156" fontSize="9" fill={YEL}>BS EN 50618 / 62930</text>
        {['1.5 kV DC rated', '90 °C continuous', 'UV + halogen-free', '4 / 6 / 10 mm² typical'].map((s, i) => (
          <text key={s} x="236" y={172 + i * 14} fontSize="8.5" fill={W50}>• {s}</text>
        ))}
      </svg>
    </DiagramFigure>
  );
}

/* ── M3 S3 — roof standoff cross-section ──────────────────────────────── */
export function StandoffCrossSection({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Roof standoff — side view" caption={caption}>
      <svg viewBox="0 0 360 224" className="w-full h-auto" role="img" aria-label="Side view of a PV module standing off the roof tiles on a rail bracket">
        {/* tile / slate surface */}
        <rect x="20" y="168" width="320" height="40" fill="#3f3f46" />
        {[40, 96, 152, 208, 264].map((x) => (<rect key={x} x={x} y="160" width="52" height="12" rx="2" fill="#52525b" stroke="#27272a" strokeWidth="1" />))}
        <text x="28" y="198" fontSize="9" fill={W50}>Tile / slate</text>

        {/* bracket + rail */}
        <rect x="120" y="120" width="8" height="44" fill={SLT} />
        <rect x="244" y="120" width="8" height="44" fill={SLT} />
        <rect x="96" y="108" width="180" height="12" rx="2" fill="#64748b" />
        <text x="282" y="118" fontSize="8.5" fill={W50}>rail + bracket</text>

        {/* module */}
        <rect x="64" y="86" width="248" height="20" rx="3" fill="#1e3a8a" stroke={BLU} strokeOpacity="0.5" />
        <text x="188" y="100" fontSize="9.5" fill={W85} textAnchor="middle">PV module</text>

        {/* standoff dimension */}
        <line x1="188" y1="106" x2="188" y2="160" stroke={YEL} strokeWidth="1" />
        <line x1="183" y1="106" x2="193" y2="106" stroke={YEL} strokeWidth="1" />
        <line x1="183" y1="160" x2="193" y2="160" stroke={YEL} strokeWidth="1" />
        <text x="196" y="138" fontSize="9" fill={YEL}>70–100 mm</text>

        {/* airflow arrows */}
        <defs><marker id="afl" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={GRN} /></marker></defs>
        {[126, 150, 174].map((y) => (<line key={y} x1="128" y1={y} x2="306" y2={y} stroke={GRN} strokeWidth="1.4" opacity="0.55" markerEnd="url(#afl)" />))}
        <text x="24" y="140" fontSize="8.5" fill={GRN}>convective</text>
        <text x="24" y="152" fontSize="8.5" fill={GRN}>airflow →</text>

        <text x="20" y="20" fontSize="9" fill={W50}>With standoff: cell temp ≈ 10–15 °C above ambient</text>
        <text x="20" y="34" fontSize="9" fill={RED} opacity="0.85">Flush / no gap: 25–35 °C above ambient → more loss</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M3 S1 — UK PV yield by nation (stylised heat map) ────────────────── */
export function UkYieldHeatmap({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="UK PV yield — kWh/kWp/year" caption={caption}>
      <svg viewBox="0 0 360 252" className="w-full h-auto" role="img" aria-label="Stylised heat map of UK PV yield by nation">
        <defs>
          <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#34D399" stopOpacity="0.18" />
            <stop offset="1" stopColor="#F59E0B" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="scale" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#60A5FA" /><stop offset="0.5" stopColor="#FFC400" /><stop offset="1" stopColor="#F97316" />
          </linearGradient>
        </defs>

        {/* nation blocks, positioned to evoke UK geography */}
        <rect x="112" y="26" width="74" height="64" rx="10" fill={BLU} fillOpacity="0.3" stroke={BLU} strokeOpacity="0.5" />
        <text x="149" y="54" fontSize="9.5" fill={W85} textAnchor="middle">Scotland</text>
        <text x="149" y="68" fontSize="8.5" fill={W50} textAnchor="middle">850–950</text>

        <rect x="40" y="92" width="56" height="44" rx="9" fill={BLU} fillOpacity="0.24" stroke={BLU} strokeOpacity="0.45" />
        <text x="68" y="112" fontSize="9" fill={W85} textAnchor="middle">N. Ireland</text>
        <text x="68" y="125" fontSize="8.5" fill={W50} textAnchor="middle">~900</text>

        <rect x="70" y="142" width="40" height="56" rx="9" fill={YEL} fillOpacity="0.26" stroke={YEL} strokeOpacity="0.45" />
        <text x="90" y="166" fontSize="8.5" fill={W85} textAnchor="middle">Wales</text>
        <text x="90" y="179" fontSize="8" fill={W50} textAnchor="middle">~980</text>

        <rect x="116" y="96" width="84" height="120" rx="12" fill="url(#engGrad)" stroke={AMB} strokeOpacity="0.45" />
        <text x="158" y="120" fontSize="9.5" fill={W85} textAnchor="middle">England</text>
        <text x="158" y="206" fontSize="8.5" fill={W85} textAnchor="middle">SE 1050–1100</text>
        <text x="158" y="146" fontSize="8" fill={W50} textAnchor="middle">north ~950</text>

        {/* colour scale legend */}
        <text x="232" y="40" fontSize="9" fill={W85}>Annual yield</text>
        <rect x="232" y="48" width="104" height="12" rx="3" fill="url(#scale)" />
        <text x="232" y="74" fontSize="8" fill={W50}>850</text>
        <text x="284" y="74" fontSize="8" fill={W50} textAnchor="middle">1000</text>
        <text x="336" y="74" fontSize="8" fill={W50} textAnchor="end">1100</text>
        <text x="232" y="98" fontSize="8.5" fill={W50}>Source: PVGIS,</text>
        <text x="232" y="110" fontSize="8.5" fill={W50}>PR ≈ 0.80 assumed</text>
        <text x="232" y="132" fontSize="8.5" fill={YEL}>Yield falls ~20%</text>
        <text x="232" y="144" fontSize="8.5" fill={YEL}>south → north</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M3 S1 — azimuth / tilt yield polar diagram ───────────────────────── */
export function AzimuthTiltPolar({ caption }: { caption?: ReactNode }) {
  // 8 wedges, centre (130,130) r=85, S at top. Pre-computed boundary points.
  const W = [
    { d: 'M130,130 L97.5,51.5 A85,85 0 0,1 162.5,51.5 Z', fill: GRN, op: 0.5, t: ['S', '100%', 130, 70] },
    { d: 'M130,130 L162.5,51.5 A85,85 0 0,1 208.5,97.5 Z', fill: GRN, op: 0.34, t: ['SW', '92%', 176, 86] },
    { d: 'M130,130 L208.5,97.5 A85,85 0 0,1 208.5,162.5 Z', fill: YEL, op: 0.36, t: ['W', '83%', 190, 130] },
    { d: 'M130,130 L208.5,162.5 A85,85 0 0,1 162.5,208.5 Z', fill: AMB, op: 0.4, t: ['NW', '65%', 176, 174] },
    { d: 'M130,130 L162.5,208.5 A85,85 0 0,1 97.5,208.5 Z', fill: RED, op: 0.42, t: ['N', '50%', 130, 190] },
    { d: 'M130,130 L97.5,208.5 A85,85 0 0,1 51.5,162.5 Z', fill: AMB, op: 0.4, t: ['NE', '65%', 84, 174] },
    { d: 'M130,130 L51.5,162.5 A85,85 0 0,1 51.5,97.5 Z', fill: YEL, op: 0.36, t: ['E', '83%', 70, 130] },
    { d: 'M130,130 L51.5,97.5 A85,85 0 0,1 97.5,51.5 Z', fill: GRN, op: 0.34, t: ['SE', '92%', 84, 86] },
  ];
  return (
    <DiagramFigure eyebrow="Azimuth + tilt — % of optimum" caption={caption}>
      <svg viewBox="0 0 360 256" className="w-full h-auto" role="img" aria-label="Polar plot of PV yield versus azimuth and tilt">
        {W.map((w, i) => (<path key={i} d={w.d} fill={w.fill} fillOpacity={w.op} stroke="#000" strokeOpacity="0.25" />))}
        <circle cx="130" cy="130" r="85" fill="none" stroke="#ffffff" strokeOpacity="0.25" />
        <circle cx="130" cy="130" r="42" fill="none" stroke="#ffffff" strokeOpacity="0.2" strokeDasharray="3 3" />
        {W.map((w, i) => (
          <text key={i} x={w.t[2] as number} y={w.t[3] as number} fontSize="8.5" fill={W85} textAnchor="middle">{w.t[0]} {w.t[1]}</text>
        ))}
        <circle cx="130" cy="130" r="4" fill={GRN} />
        <text x="130" y="146" fontSize="8" fill={W85} textAnchor="middle">optimum</text>

        {/* legend / note */}
        <text x="236" y="44" fontSize="9" fill={W85}>S-facing, 30–40°</text>
        <text x="236" y="56" fontSize="8.5" fill={GRN}>= 100% (sweet spot)</text>
        <text x="236" y="80" fontSize="8.5" fill={YEL}>E / W ≈ 80–85%</text>
        <text x="236" y="96" fontSize="8.5" fill={RED}>N-facing ≈ 45–55%</text>
        <text x="236" y="124" fontSize="8.5" fill={W50}>Dashed ring = the</text>
        <text x="236" y="136" fontSize="8.5" fill={W50}>30–45° pitch most</text>
        <text x="236" y="148" fontSize="8.5" fill={W50}>UK roofs sit at.</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M3 S1 — shading topology (fish-eye sky + sun path) ───────────────── */
export function ShadingTopology({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Shading topology — sky view" caption={caption}>
      <svg viewBox="0 0 360 252" className="w-full h-auto" role="img" aria-label="Fish-eye sky view with sun path and horizon obstructions">
        <circle cx="140" cy="124" r="98" fill="#0f2235" stroke="#ffffff" strokeOpacity="0.2" />
        <text x="140" y="36" fontSize="8.5" fill={W50} textAnchor="middle">S (overhead band)</text>
        <text x="46" y="128" fontSize="8.5" fill={W50} textAnchor="middle">E</text>
        <text x="234" y="128" fontSize="8.5" fill={W50} textAnchor="middle">W</text>

        {/* summer (high) and winter (low) sun paths */}
        <path d="M48,118 Q140,40 232,118" fill="none" stroke={YEL} strokeWidth="2.2" />
        <path d="M52,150 Q140,104 228,150" fill="none" stroke={AMB} strokeWidth="2" strokeDasharray="5 3" />
        <text x="140" y="60" fontSize="8" fill={YEL} textAnchor="middle">summer (high)</text>
        <text x="140" y="120" fontSize="8" fill={AMB} textAnchor="middle">winter (low)</text>

        {/* horizon obstructions rising from the lower rim */}
        <path d="M70,196 l8,-30 l9,18 l8,-26 l9,22 l7,-14 l0,30 Z" fill="#1f3a2a" stroke={GRN} strokeOpacity="0.5" />
        <rect x="150" y="150" width="34" height="48" fill="#3a2a1f" stroke={AMB} strokeOpacity="0.5" />
        <path d="M196,198 l6,-22 l5,12 l6,-16 l5,26 Z" fill="#1f3a2a" stroke={GRN} strokeOpacity="0.5" />
        {/* shaded portion of the winter path */}
        <path d="M150,150 a98,98 0 0,1 34,2" fill="none" stroke={RED} strokeWidth="3" opacity="0.8" />
        <text x="167" y="142" fontSize="7.5" fill={RED} textAnchor="middle">shaded</text>

        <text x="252" y="64" fontSize="8.5" fill={GRN}>trees</text>
        <text x="252" y="80" fontSize="8.5" fill={AMB}>building</text>
        <text x="252" y="96" fontSize="8.5" fill={RED}>chimney casts</text>
        <text x="252" y="108" fontSize="8.5" fill={RED}>onto winter sun</text>
        <text x="252" y="136" fontSize="8" fill={W50}>Shading factor</text>
        <text x="252" y="148" fontSize="8" fill={W50}>= 1 − shaded</text>
        <text x="252" y="160" fontSize="8" fill={W50}>fraction of path</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M3 S1 — performance-ratio waterfall (div bars) ───────────────────── */
export function PrWaterfall({ caption }: { caption?: ReactNode }) {
  const steps = [
    { label: 'STC nameplate', remain: 100, loss: 0, tone: 'white' },
    { label: 'Temperature', remain: 94, loss: 6, tone: 'loss' },
    { label: 'Soiling', remain: 92, loss: 2, tone: 'loss' },
    { label: 'Mismatch', remain: 89.5, loss: 2.5, tone: 'loss' },
    { label: 'Inverter', remain: 86, loss: 3.5, tone: 'loss' },
    { label: 'DC cable', remain: 84, loss: 2, tone: 'loss' },
    { label: 'AC cable', remain: 82.5, loss: 1.5, tone: 'loss' },
    { label: 'Downtime', remain: 80, loss: 2.5, tone: 'loss' },
  ];
  return (
    <DiagramFigure eyebrow="Performance ratio — loss waterfall" caption={caption}>
      <div className="space-y-1.5">
        {steps.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-[11px] mb-0.5">
              <span className="text-white/80">{s.label}</span>
              <span className={s.loss ? 'text-[#F87171] font-medium' : 'text-white font-medium'}>
                {s.loss ? `−${s.loss}%` : '100%'}
              </span>
            </div>
            <div className="relative h-3 w-full rounded-md bg-white/[0.06] overflow-hidden flex">
              <div
                className={s.label === 'Downtime' ? 'h-full bg-emerald-400/80' : s.tone === 'white' ? 'h-full bg-white/30' : 'h-full bg-elec-yellow/75'}
                style={{ width: `${s.remain}%` }}
              />
              {s.loss ? <div className="h-full bg-[#F87171]/25" style={{ width: `${s.loss}%` }} /> : null}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.06] p-3 text-[11.5px] text-white/85 leading-relaxed">
        Each loss compounds off the STC nameplate down to a realistic <span className="font-semibold text-elec-yellow">PR ≈ 0.80</span> for a well-designed UK install — the figure to model against, not the 100% on the datasheet.
      </div>
    </DiagramFigure>
  );
}

/* ── M3 S3 — fixing methods by roof type (4 panels) ───────────────────── */
function FixPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
      <div className="text-[11px] font-semibold text-white mb-1 leading-tight">{title}</div>
      <svg viewBox="0 0 150 96" className="w-full h-auto" role="img" aria-label={title}>{children}</svg>
    </div>
  );
}

export function FixingByRoofType({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Fixing methods by roof type" caption={caption}>
      <div className="grid grid-cols-2 gap-2.5">
        <FixPanel title="Tile — flashing">
          <rect x="10" y="60" width="130" height="28" fill="#3f3f46" />
          {[10, 50, 90].map((x) => (<rect key={x} x={x} y="54" width="40" height="10" rx="2" fill="#52525b" stroke="#27272a" />))}
          <path d="M64,54 l16,0 l-4,-14 l-8,0 Z" fill={SLT} />
          <rect x="70" y="26" width="4" height="34" fill={SLT} />
          <text x="86" y="34" fontSize="7.5" fill={W50}>bolt → rafter</text>
          <text x="40" y="20" fontSize="7.5" fill={GRN}>flashing collar + EPDM</text>
        </FixPanel>
        <FixPanel title="Slate — hook">
          <rect x="10" y="62" width="130" height="26" fill="#3f3f46" />
          {[10, 52, 94].map((x) => (<rect key={x} x={x} y="56" width="42" height="10" fill="#475569" stroke="#1e293b" />))}
          <path d="M60,56 q-6,-10 6,-12 l10,0 q10,2 4,12" fill="none" stroke={YEL} strokeWidth="2.4" />
          <text x="76" y="30" fontSize="7.5" fill={YEL}>hook over batten</text>
          <text x="36" y="86" fontSize="7" fill={GRN} textAnchor="middle">no slate penetration</text>
        </FixPanel>
        <FixPanel title="Metal — clamp">
          <rect x="10" y="66" width="130" height="20" fill="#475569" />
          {[40, 80, 110].map((x) => (<rect key={x} x={x} y="40" width="8" height="26" rx="2" fill="#64748b" />))}
          <rect x="36" y="34" width="16" height="10" rx="2" fill={GRN} fillOpacity="0.6" stroke={GRN} />
          <text x="70" y="30" fontSize="7.5" fill={GRN}>clamp on standing rib</text>
          <text x="44" y="58" fontSize="7" fill={W50}>no rivet needed</text>
        </FixPanel>
        <FixPanel title="Flat — ballast">
          <rect x="10" y="70" width="130" height="16" fill="#3f3f46" />
          <rect x="10" y="66" width="130" height="5" fill="#1e293b" />
          <path d="M30,66 l60,-28 l16,0 l0,28 Z" fill={BLU} fillOpacity="0.3" stroke={BLU} strokeOpacity="0.6" />
          {[40, 70, 100].map((x) => (<rect key={x} x={x} y="60" width="14" height="6" rx="1" fill="#9ca3af" />))}
          <text x="92" y="34" fontSize="7.5" fill={BLU}>tilted frame</text>
          <text x="70" y="58" fontSize="7" fill={W50}>ballast, slip pads</text>
        </FixPanel>
      </div>
    </DiagramFigure>
  );
}

/* ── M3 S3 — flashing orientation correct vs incorrect ────────────────── */
export function FlashingOrientation({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Flashing orientation" caption={caption}>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/[0.06] p-2.5">
          <div className="text-[11px] font-semibold text-emerald-300 mb-1">Correct — collar downslope</div>
          <svg viewBox="0 0 150 104" className="w-full h-auto" role="img" aria-label="Correct flashing orientation">
            <defs><marker id="wfg" markerWidth="6" markerHeight="6" refX="4.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={GRN} /></marker></defs>
            <path d="M10,34 L140,82 L140,98 L10,98 Z" fill="#3f3f46" />
            {/* collar lip on the downslope side + bolt */}
            <path d="M60,64 L92,75 L92,69 L66,60 Z" fill={SLT} />
            <rect x="70" y="52" width="3.5" height="11" fill="#94a3b8" transform="rotate(22 71.7 57)" />
            <path d="M34,44 q22,11 30,17 q7,5 22,11" fill="none" stroke={GRN} strokeWidth="1.4" markerEnd="url(#wfg)" />
            <path d="M40,38 q22,11 32,15" fill="none" stroke={GRN} strokeWidth="1.4" markerEnd="url(#wfg)" />
            <text x="20" y="94" fontSize="7.5" fill={GRN}>water flows over + around</text>
          </svg>
        </div>
        <div className="rounded-xl border border-red-400/30 bg-red-500/[0.06] p-2.5">
          <div className="text-[11px] font-semibold text-red-300 mb-1">Incorrect — collar upslope</div>
          <svg viewBox="0 0 150 104" className="w-full h-auto" role="img" aria-label="Incorrect flashing orientation">
            <defs><marker id="wfr" markerWidth="6" markerHeight="6" refX="4.5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={RED} /></marker></defs>
            <path d="M10,34 L140,82 L140,98 L10,98 Z" fill="#3f3f46" />
            {/* collar lip on the upslope side + bolt — water trapped above it */}
            <path d="M60,60 L86,69 L86,75 L60,66 Z" fill={SLT} />
            <rect x="74" y="53" width="3.5" height="11" fill="#94a3b8" transform="rotate(22 75.7 58)" />
            <ellipse cx="56" cy="59" rx="15" ry="5" fill={RED} fillOpacity="0.4" />
            <path d="M34,40 q14,8 20,15" fill="none" stroke={RED} strokeWidth="1.4" markerEnd="url(#wfr)" />
            <text x="44" y="40" fontSize="7.5" fill={RED}>water pools → ingress</text>
          </svg>
        </div>
      </div>
    </DiagramFigure>
  );
}

/* ── M3 S5 — PV equipotential bonding (top-down) ──────────────────────── */
export function EquipotentialBonding({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Equipotential bonding — array plan" caption={caption}>
      <svg viewBox="0 0 360 220" className="w-full h-auto" role="img" aria-label="Top-down view of PV array equipotential bonding">
        {/* rails */}
        {[64, 150].map((y) => (<rect key={y} x="40" y={y} width="220" height="6" rx="2" fill={SLT} />))}
        {/* modules */}
        {[0, 1, 2, 3].map((c) => [44, 130].map((y) => (
          <rect key={`${c}-${y}`} x={48 + c * 54} y={y} width="46" height="40" rx="3" fill="#1e3a8a" stroke={BLU} strokeOpacity="0.5" />
        )))}
        {/* clamp dots at rail/module joints */}
        {[0, 1, 2, 3].map((c) => [67, 153].map((y) => (
          <circle key={`d${c}-${y}`} cx={71 + c * 54} cy={y} r="3" fill={GRN} />
        )))}
        {/* bonding conductor: along rails → down to inverter → MET */}
        <path d="M40,67 L260,67 M40,153 L260,153 M260,67 L260,153" fill="none" stroke={GRN} strokeWidth="2.4" />
        <path d="M260,153 L290,153 L290,186" fill="none" stroke={GRN} strokeWidth="2.4" />
        <rect x="270" y="60" width="44" height="30" rx="3" fill="#11261c" stroke={GRN} strokeOpacity="0.6" />
        <text x="292" y="78" fontSize="8" fill={GRN} textAnchor="middle">inverter</text>
        <path d="M290,90 L290,140" fill="none" stroke={GRN} strokeWidth="2.4" strokeDasharray="4 3" />
        <rect x="274" y="186" width="36" height="18" rx="3" fill="#11261c" stroke={GRN} strokeOpacity="0.6" />
        <text x="292" y="198" fontSize="8" fill={GRN} textAnchor="middle">MET</text>

        <text x="40" y="24" fontSize="9" fill={W85}>Frame clamps → rail → single bonding conductor → MET</text>
        <text x="40" y="210" fontSize="8.5" fill={W50}>Routed alongside the DC cables · Reg 712.521.102 · sized per Table 54.8</text>
        <circle cx="48" cy="36" r="3" fill={GRN} /><text x="56" y="39" fontSize="8.5" fill={W50}>= bonded joint (anti-corrosion gel)</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── M3 S5 — lightning-loop minimisation (2 panels) ───────────────────── */
export function LightningLoop({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Lightning-loop minimisation" caption={caption}>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-red-400/30 bg-red-500/[0.06] p-2.5">
          <div className="text-[11px] font-semibold text-red-300 mb-1">Incorrect — large loop</div>
          <svg viewBox="0 0 150 120" className="w-full h-auto" role="img" aria-label="Large induction loop">
            <rect x="20" y="14" width="110" height="22" rx="3" fill="#1e3a8a" stroke={BLU} strokeOpacity="0.5" />
            <text x="75" y="29" fontSize="8" fill={W85} textAnchor="middle">array</text>
            <rect x="32" y="40" width="86" height="60" fill={RED} fillOpacity="0.16" />
            <path d="M34,36 L34,104" fill="none" stroke={AMB} strokeWidth="2" />
            <path d="M116,36 L116,104" fill="none" stroke={GRN} strokeWidth="2" />
            <text x="75" y="74" fontSize="7.5" fill={RED} textAnchor="middle">large loop</text>
            <text x="75" y="86" fontSize="7.5" fill={RED} textAnchor="middle">→ captures EMP</text>
            <text x="34" y="114" fontSize="7" fill={AMB}>DC</text>
            <text x="110" y="114" fontSize="7" fill={GRN}>bond</text>
          </svg>
        </div>
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/[0.06] p-2.5">
          <div className="text-[11px] font-semibold text-emerald-300 mb-1">Correct — tight loop</div>
          <svg viewBox="0 0 150 120" className="w-full h-auto" role="img" aria-label="Minimised induction loop">
            <rect x="20" y="14" width="110" height="22" rx="3" fill="#1e3a8a" stroke={BLU} strokeOpacity="0.5" />
            <text x="75" y="29" fontSize="8" fill={W85} textAnchor="middle">array</text>
            <path d="M72,36 L72,104" fill="none" stroke={AMB} strokeWidth="2" />
            <path d="M77,36 L77,104" fill="none" stroke={GRN} strokeWidth="2" />
            <text x="75" y="80" fontSize="7.5" fill={GRN} textAnchor="middle">DC + bond together</text>
            <text x="75" y="92" fontSize="7.5" fill={GRN} textAnchor="middle">loop ≈ 0</text>
            <text x="20" y="114" fontSize="7" fill={W50}>same conduit · Reg 712.521.102</text>
          </svg>
        </div>
      </div>
    </DiagramFigure>
  );
}
