import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ──────────────────────────────────────────────────────────────────────
   Renewable Energy course — PV cell diagrams (Module 2 Section 1).
   Themed inline SVG, dark course aesthetic, mobile-responsive (viewBox +
   w-full). SVG text uses explicit fill attributes (deterministic colour).
   Palette: white text, elec-yellow #FFC400, n-type blue #60A5FA,
   p-type amber #F59E0B, green #34D399, red #F87171.
   ────────────────────────────────────────────────────────────────────── */

const W85 = '#FFFFFF';
const W50 = 'rgba(255,255,255,0.82)';
const YEL = '#FFC400';
const BLU = '#60A5FA';
const GRN = '#34D399';
const RED = '#F87171';

export function DiagramFigure({
  eyebrow = 'Diagram',
  caption,
  children,
  className,
}: {
  eyebrow?: string;
  caption?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn('rounded-2xl bg-white/[0.02] border border-white/[0.10] p-4 sm:p-5 space-y-3', className)}>
      <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/70">{eyebrow}</div>
      <div className="w-full overflow-hidden rounded-xl bg-[hsl(0_0%_9%)] px-2 py-3 sm:p-4">{children}</div>
      {caption ? <figcaption className="text-[12px] text-white/85 leading-relaxed">{caption}</figcaption> : null}
    </figure>
  );
}

/* ── 1. PV cell cross-section / the photovoltaic effect ───────────────── */
export function PvCellCrossSection({ caption }: { caption?: ReactNode }) {
  // cell stack x: 200..352 ; label leaders land at x=196
  const rows: [string, number][] = [
    ['Front contact (fingers / busbar)', 62],
    ['Anti-reflective coating', 73],
    ['n-type silicon', 95],
    ['Depletion (p–n junction)', 118],
    ['p-type silicon', 156],
    ['Back contact', 197],
  ];
  return (
    <DiagramFigure caption={caption}>
      <svg viewBox="0 0 380 248" className="w-full h-auto" role="img" aria-label="Cross-section of a crystalline silicon PV cell">
        <defs>
          <linearGradient id="pvN" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={BLU} stopOpacity="0.45" /><stop offset="1" stopColor={BLU} stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="pvP" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FBBF24" stopOpacity="0.26" /><stop offset="1" stopColor="#F59E0B" stopOpacity="0.42" />
          </linearGradient>
          <linearGradient id="pvBk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E5E7EB" /><stop offset="1" stopColor="#9CA3AF" />
          </linearGradient>
          <linearGradient id="pvDepl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C4B5FD" stopOpacity="0" /><stop offset="0.5" stopColor="#C4B5FD" stopOpacity="0.5" /><stop offset="1" stopColor="#C4B5FD" stopOpacity="0" />
          </linearGradient>
          <marker id="pvB" markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill={BLU} /></marker>
          <marker id="pvO" markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill="#F59E0B" /></marker>
          <marker id="pvY" markerWidth="9" markerHeight="9" refX="6.5" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 Z" fill={YEL} /></marker>
        </defs>

        {/* stack */}
        <rect x="200" y="188" width="152" height="16" rx="2" fill="url(#pvBk)" />
        <rect x="200" y="124" width="152" height="64" fill="url(#pvP)" />
        <rect x="200" y="112" width="152" height="12" fill="url(#pvDepl)" />
        <line x1="200" y1="118" x2="352" y2="118" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.6" />
        <rect x="200" y="76" width="152" height="36" fill="url(#pvN)" />
        <rect x="200" y="66" width="152" height="10" fill="#1D4ED8" opacity="0.75" />
        <rect x="200" y="62" width="152" height="4" fill="url(#pvBk)" />
        {[212, 240, 268, 296, 324].map((x) => (<rect key={x} x={x} y="56" width="3" height="8" rx="1" fill="#D1D5DB" />))}

        {/* photon generates an electron–hole pair at the junction */}
        <line x1="150" y1="16" x2="244" y2="113" stroke={YEL} strokeWidth="2.4" markerEnd="url(#pvY)" />
        <text x="120" y="16" fontSize="11" fill={YEL}>photon</text>

        <circle cx="252" cy="118" r="6.5" fill={BLU} /><text x="248.7" y="121.6" fontSize="10" fill="#06101c" fontWeight="700">–</text>
        <line x1="252" y1="111" x2="252" y2="92" stroke={BLU} strokeWidth="2" markerEnd="url(#pvB)" />
        <text x="259" y="101" fontSize="10" fill={BLU} fontWeight="600">e⁻</text>
        <circle cx="230" cy="118" r="6.5" fill="#F59E0B" /><text x="226.7" y="121.6" fontSize="10" fill="#1a0f04" fontWeight="700">+</text>
        <line x1="230" y1="125" x2="230" y2="146" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#pvO)" />
        <text x="237" y="144" fontSize="10" fill="#F59E0B" fontWeight="600">h⁺</text>
        <text x="334" y="84" fontSize="8.5" fill={W50} textAnchor="middle">E-field</text>
        <line x1="334" y1="90" x2="334" y2="148" stroke="#ffffff" strokeWidth="1.2" opacity="0.4" markerEnd="url(#pvB)" />

        {/* left labels + full leader lines + connector dots */}
        {rows.map(([label, y]) => (
          <g key={label}>
            <text x="14" y={y + 3} fontSize="9.5" fill={W85}>{label}</text>
            <line x1="150" y1={y} x2="196" y2={y} stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />
            <circle cx="199" cy={y} r="1.7" fill="#ffffff" fillOpacity="0.55" />
          </g>
        ))}
      </svg>
    </DiagramFigure>
  );
}

/* ── 2. I-V curve at STC, three irradiance levels ─────────────────────── */
export function IVCurve({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure caption={caption}>
      <svg viewBox="0 0 360 260" className="w-full h-auto" role="img" aria-label="I-V curve of a PV cell at three irradiance levels">
        <line x1="54" y1="214" x2="340" y2="214" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        <line x1="54" y1="214" x2="54" y2="40" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        <text x="188" y="248" fontSize="11" fill={W85} textAnchor="middle">Voltage (V)</text>
        <text x="18" y="128" fontSize="11" fill={W85} textAnchor="middle" transform="rotate(-90 18 128)">Current (A)</text>

        <rect x="54" y="58" width="250" height="156" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.26" />
        <rect x="54" y="86" width="202" height="128" fill={YEL} opacity="0.09" />
        <rect x="54" y="86" width="202" height="128" fill="none" stroke={YEL} strokeWidth="0.8" opacity="0.45" />

        <path d="M54,58 L198,62 C234,64 252,74 258,86 C264,112 288,182 304,214" fill="none" stroke={YEL} strokeWidth="2.6" />
        <path d="M54,116 L190,119 C226,121 246,128 252,140 C260,166 282,198 296,214" fill="none" stroke={GRN} strokeWidth="2" />
        <path d="M54,156 L182,158 C216,160 236,166 242,176 C250,196 270,208 286,214" fill="none" stroke={BLU} strokeWidth="2" />

        <circle cx="258" cy="86" r="4.5" fill={YEL} />
        <text x="206" y="103" fontSize="9.5" fill={YEL} textAnchor="end">MPP (V_mp, I_mp)</text>
        <line x1="210" y1="100" x2="252" y2="89" stroke={YEL} strokeWidth="0.8" opacity="0.5" />
        <text x="40" y="62" fontSize="9.5" fill={W85} textAnchor="end">I_sc</text>
        <text x="304" y="228" fontSize="9.5" fill={W85} textAnchor="middle">V_oc</text>

        <g fontSize="9.5">
          <rect x="232" y="42" width="11" height="3" fill={YEL} /><text x="247" y="46" fill={W85}>1000 W/m²</text>
          <rect x="232" y="54" width="11" height="3" fill={GRN} /><text x="247" y="58" fill={W85}>500 W/m²</text>
          <rect x="232" y="66" width="11" height="3" fill={BLU} /><text x="247" y="70" fill={W85}>250 W/m²</text>
        </g>
        <text x="60" y="206" fontSize="8.5" fill={W50}>Fill factor = MPP area ÷ (V_oc × I_sc)</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── 3. Cell-type comparison ──────────────────────────────────────────── */
function Swatch({ kind }: { kind: 'mono' | 'poly' | 'thin' }) {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12 shrink-0" aria-hidden>
      <rect x="2" y="2" width="56" height="56" rx="4" fill={kind === 'mono' ? '#111c33' : kind === 'poly' ? '#1e3a8a' : '#334155'} stroke="#ffffff" strokeOpacity="0.15" />
      {kind === 'mono' && [12, 30, 48].map((x) => [12, 30, 48].map((y) => <rect key={`${x}-${y}`} x={x - 7} y={y - 7} width="14" height="14" rx="2" fill="#1b2a47" stroke="#3b4d6b" strokeWidth="0.7" />))}
      {kind === 'poly' && Array.from({ length: 16 }).map((_, i) => (<rect key={i} x={4 + (i % 4) * 13} y={4 + Math.floor(i / 4) * 13} width="12" height="12" fill={i % 3 === 0 ? '#2563eb' : i % 3 === 1 ? '#3b82f6' : '#1d4ed8'} opacity="0.9" />))}
      {kind === 'thin' && (<><rect x="2" y="38" width="56" height="20" rx="2" fill="#64748B" /><rect x="2" y="2" width="56" height="36" rx="2" fill="#475569" opacity="0.4" /></>)}
    </svg>
  );
}

export function CellTypeComparison({ caption }: { caption?: ReactNode }) {
  const cols = [
    { kind: 'mono' as const, name: 'Monocrystalline', eff: '19–22 %', temp: '−0.35 %/°C', cost: '££ (highest)', use: 'Space-constrained UK roofs' },
    { kind: 'poly' as const, name: 'Polycrystalline', eff: '15–17 %', temp: '−0.40 %/°C', cost: '£ (mid)', use: 'Budget / large area' },
    { kind: 'thin' as const, name: 'Thin-film (a-Si)', eff: '10–13 %', temp: '−0.25 %/°C', cost: '£ (lowest)', use: 'Large flat / high-temp' },
  ];
  return (
    <DiagramFigure caption={caption}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {cols.map((c) => (
          <div key={c.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 space-y-2">
            <div className="flex items-center gap-3">
              <Swatch kind={c.kind} />
              <div className="text-[13px] font-semibold text-white/90 leading-tight">{c.name}</div>
            </div>
            <dl className="text-[11.5px] text-white/90 space-y-1">
              <div className="flex justify-between gap-2"><dt className="text-white/65">Efficiency</dt><dd className="font-medium">{c.eff}</dd></div>
              <div className="flex justify-between gap-2"><dt className="text-white/65">Temp coeff</dt><dd className="font-medium">{c.temp}</dd></div>
              <div className="flex justify-between gap-2"><dt className="text-white/65">Cost /W</dt><dd className="font-medium">{c.cost}</dd></div>
              <div className="pt-1 text-white/80">{c.use}</div>
            </dl>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.06] p-3 text-[11.5px] text-white/75 leading-relaxed">
        <span className="font-semibold text-elec-yellow">Emerging — </span>
        Perovskite-silicon tandem: lab efficiencies above 33 %, stacking a perovskite top cell on silicon to capture more of the spectrum. Not yet mainstream for UK domestic, but the trajectory to watch.
      </div>
    </DiagramFigure>
  );
}

/* ── 4. P-V curves vs cell temperature ────────────────────────────────── */
export function PvTemperatureCurve({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure caption={caption}>
      <svg viewBox="0 0 360 252" className="w-full h-auto" role="img" aria-label="P-V curves at three cell temperatures">
        <line x1="54" y1="200" x2="340" y2="200" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        <line x1="54" y1="200" x2="54" y2="34" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        <text x="188" y="234" fontSize="11" fill={W85} textAnchor="middle">Voltage (V)</text>
        <text x="18" y="118" fontSize="11" fill={W85} textAnchor="middle" transform="rotate(-90 18 118)">Power (W)</text>

        <path d="M54,200 C152,196 212,50 254,58 C288,64 302,150 320,200" fill="none" stroke={GRN} strokeWidth="2.2" />
        <path d="M54,200 C150,196 208,80 248,88 C282,94 298,156 314,200" fill="none" stroke={YEL} strokeWidth="2.2" />
        <path d="M54,200 C148,196 204,106 242,114 C274,120 292,162 308,200" fill="none" stroke={RED} strokeWidth="2.2" />
        <circle cx="254" cy="58" r="3.6" fill={GRN} />
        <circle cx="248" cy="88" r="3.6" fill={YEL} />
        <circle cx="242" cy="114" r="3.6" fill={RED} />

        <g fontSize="9.5">
          <rect x="252" y="44" width="11" height="3" fill={GRN} /><text x="267" y="48" fill={W85}>25 °C (STC)</text>
          <rect x="252" y="56" width="11" height="3" fill={YEL} /><text x="267" y="60" fill={W85}>50 °C</text>
          <rect x="252" y="68" width="11" height="3" fill={RED} /><text x="267" y="72" fill={W85}>75 °C</text>
        </g>
        <text x="62" y="58" fontSize="8.5" fill={W50}>Higher cell temperature → lower P_max.</text>
      </svg>
    </DiagramFigure>
  );
}

/* ── 5. Temperature de-rating worked example — two-bar comparison ─────── */
export function TempDerationFigure({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure eyebrow="Worked example" caption={caption}>
      <div className="space-y-3">
        <div className="text-[12px] text-white font-mono leading-relaxed">
          (55 − 25) °C × −0.36 %/°C × 400 W = <span className="text-[#F87171]">−43 W</span>
        </div>

        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-[11px] mb-1"><span className="text-white/80">STC nameplate (25 °C)</span><span className="text-white font-medium">400 W</span></div>
            <div className="h-3.5 w-full rounded-md bg-white/[0.06] overflow-hidden"><div className="h-full w-full rounded-md bg-white/30" /></div>
          </div>
          <div>
            <div className="flex justify-between text-[11px] mb-1"><span className="text-white/80">Real output @ 55 °C cell temp</span><span className="text-elec-yellow font-medium">357 W</span></div>
            <div className="relative h-3.5 w-full rounded-md bg-white/[0.06] overflow-hidden flex">
              <div className="h-full bg-elec-yellow/80" style={{ width: '89.3%' }} />
              <div className="h-full flex-1 bg-[#F87171]/30" />
            </div>
          </div>
        </div>

        <div className="text-[11px] text-white/80">
          <span className="text-[#F87171] font-medium">−43 W (−10.7 %)</span> — the gap between the nameplate and what a UK summer roof actually delivers.
        </div>
      </div>
    </DiagramFigure>
  );
}
