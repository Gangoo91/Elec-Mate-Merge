import type { ReactNode } from 'react';
import { DiagramFigure, ComparisonGrid } from './diagramKit';

const W85 = '#FFFFFF';
const W55 = 'rgba(255,255,255,0.62)';

/* M2 S5 — inverter topologies comparison. */
export function InverterTopologies({ caption }: { caption?: ReactNode }) {
  return (
    <ComparisonGrid
      eyebrow="Inverter topologies"
      caption={caption}
      columns={[
        { name: 'String', rows: [
          { label: 'Conversion', value: 'Central (whole string)' },
          { label: 'Shade', value: 'String drops to weakest panel' },
          { label: 'Monitoring', value: 'String-level' },
          { label: 'Cost', value: '£ (lowest)' },
        ], footer: 'Unshaded, single-orientation roofs' },
        { name: 'Microinverter', rows: [
          { label: 'Conversion', value: 'Per panel (DC→AC at panel)' },
          { label: 'Shade', value: 'Per-panel — best tolerance' },
          { label: 'Monitoring', value: 'Panel-level' },
          { label: 'Cost', value: '£££ (highest)' },
        ], footer: 'Complex / shaded roofs; AC on the roof' },
        { name: 'Power optimiser', rows: [
          { label: 'Conversion', value: 'Per-panel DC → central inverter' },
          { label: 'Shade', value: 'Per-panel (DC)' },
          { label: 'Monitoring', value: 'Panel-level' },
          { label: 'Cost', value: '££ (mid)' },
        ], footer: 'Shade tolerance, one central inverter' },
        { name: 'Hybrid', rows: [
          { label: 'Conversion', value: 'Central + battery (DC-coupled)' },
          { label: 'Shade', value: 'String-level' },
          { label: 'Monitoring', value: 'System-level' },
          { label: 'Cost', value: '££ (mid-high)' },
        ], footer: 'PV + storage in one unit' },
      ]}
      note={
        <>
          <span className="font-semibold text-elec-yellow">MLPE</span> (module-level power electronics = optimisers and microinverters) buys per-panel monitoring and shade tolerance — at higher cost and with electronics on the roof. String and hybrid keep it simple and central.
        </>
      }
    />
  );
}

/* M2 S2 — PV module cross-section (layer build-up). */
export function PvModuleCrossSection({ caption }: { caption?: ReactNode }) {
  const layers: [string, number, number, string][] = [
    // label, y, height, fill
    ['Tempered glass', 60, 16, 'url(#glass)'],
    ['EVA encapsulant', 76, 8, '#a78bfa'],
    ['PV cells', 84, 14, '#1d4ed8'],
    ['EVA encapsulant', 98, 8, '#a78bfa'],
    ['Backsheet', 106, 12, '#e5e7eb'],
  ];
  return (
    <DiagramFigure caption={caption}>
      <svg viewBox="0 0 380 210" className="w-full h-auto" role="img" aria-label="Cross-section of a PV module">
        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bae6fd" stopOpacity="0.55" /><stop offset="1" stopColor="#7dd3fc" stopOpacity="0.3" /></linearGradient>
        </defs>
        {/* frame uprights */}
        <rect x="150" y="52" width="14" height="78" rx="2" fill="#9CA3AF" />
        <rect x="316" y="52" width="14" height="78" rx="2" fill="#9CA3AF" />
        {/* laminate layers between frame */}
        {layers.map(([label, y, h, fill]) => (
          <g key={label + y}>
            <rect x="164" y={y} width="152" height={h} fill={fill} opacity={fill.startsWith('#a7') ? 0.5 : 0.9} />
            <line x1="138" y1={y + (h as number) / 2} x2="164" y2={y + (h as number) / 2} stroke="#fff" strokeWidth="0.7" opacity="0.4" />
            <text x="132" y={(y as number) + (h as number) / 2 + 3} fontSize="9.5" fill={W85} textAnchor="end">{label}</text>
          </g>
        ))}
        {/* cell busbars */}
        {[180, 210, 240, 270, 300].map((x) => <rect key={x} x={x} y="84" width="2" height="14" fill="#cbd5e1" />)}
        {/* frame label (top-right, right-aligned to stay in view) */}
        <text x="352" y="44" fontSize="9.5" fill={W85} textAnchor="end">Aluminium frame</text>
        <line x1="323" y1="52" x2="338" y2="47" stroke="#fff" strokeWidth="0.7" opacity="0.4" />
        {/* sun */}
        <text x="150" y="36" fontSize="10" fill="#FFC400">sunlight</text>
        {[176, 200, 224, 248].map((x) => <line key={x} x1={x} y1="40" x2={x - 8} y2="58" stroke="#FFC400" strokeWidth="1.6" opacity="0.8" />)}
        {/* junction box under backsheet */}
        <rect x="232" y="118" width="40" height="12" rx="2" fill="#374151" stroke="#6b7280" strokeWidth="0.8" />
        <text x="252" y="148" fontSize="9.5" fill={W85} textAnchor="middle">Junction box (+ bypass diodes)</text>
        <line x1="252" y1="130" x2="252" y2="140" stroke="#fff" strokeWidth="0.7" opacity="0.4" />
      </svg>
    </DiagramFigure>
  );
}

/* M2 S2 — bypass diode behaviour under partial shade.
   Three sub-strings in series; the shaded one is blocked, so its bypass
   diode conducts and the string current flows around it. */
export function BypassDiodeTopology({ caption }: { caption?: ReactNode }) {
  const GRN = '#34D399';
  const GREY = '#6b7280';
  // each sub-string: left node x, right node x. Boxes y 34..72, series rail y=53.
  const ss = [
    { lx: 40, rx: 108, shaded: false },
    { lx: 146, rx: 214, shaded: true },
    { lx: 252, rx: 320, shaded: false },
  ];
  // a bypass diode drawn in the branch below a sub-string (anode left → cathode right)
  const diode = (lx: number, rx: number, on: boolean) => {
    const c = on ? GRN : GREY;
    const mid = (lx + rx) / 2;
    return (
      <g key={`d${lx}`}>
        <line x1={lx} y1="53" x2={lx} y2="108" stroke={c} strokeWidth={on ? 2 : 1.3} opacity={on ? 1 : 0.6} />
        <line x1={rx} y1="53" x2={rx} y2="108" stroke={c} strokeWidth={on ? 2 : 1.3} opacity={on ? 1 : 0.6} />
        <line x1={lx} y1="108" x2={mid - 9} y2="108" stroke={c} strokeWidth={on ? 2 : 1.3} opacity={on ? 1 : 0.6} />
        <polygon points={`${mid - 9},100 ${mid - 9},116 ${mid + 6},108`} fill={on ? GRN : 'none'} stroke={c} strokeWidth="1.4" opacity={on ? 1 : 0.6} />
        <line x1={mid + 6} y1="99" x2={mid + 6} y2="117" stroke={c} strokeWidth="1.8" opacity={on ? 1 : 0.6} />
        <line x1={mid + 6} y1="108" x2={rx} y2="108" stroke={c} strokeWidth={on ? 2 : 1.3} opacity={on ? 1 : 0.6} />
      </g>
    );
  };
  return (
    <DiagramFigure caption={caption}>
      <svg viewBox="0 0 360 184" className="w-full h-auto" role="img" aria-label="Bypass diode current path under partial shade">
        <defs>
          <marker id="bcur" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill={GRN} /></marker>
        </defs>

        {/* sub-string boxes + their bypass diodes */}
        {ss.map((s, i) => (
          <g key={i}>
            <rect x={s.lx} y="34" width={s.rx - s.lx} height="38" rx="4" fill={s.shaded ? '#1f2937' : '#1d4ed8'} opacity={s.shaded ? 1 : 0.55} stroke="#ffffff" strokeOpacity="0.18" />
            <text x={(s.lx + s.rx) / 2} y={s.shaded ? 50 : 57} fontSize="9.5" fill={W85} textAnchor="middle">{s.shaded ? 'shaded' : 'sub-string'}</text>
            {s.shaded && <text x={(s.lx + s.rx) / 2} y="63" fontSize="7.5" fill={W55} textAnchor="middle">(blocked)</text>}
            {diode(s.lx, s.rx, s.shaded)}
          </g>
        ))}

        {/* series rail + the active current path (green, with arrows) */}
        <line x1="12" y1="53" x2="40" y2="53" stroke={GRN} strokeWidth="2.4" />
        <line x1="108" y1="53" x2="146" y2="53" stroke={GRN} strokeWidth="2.4" markerEnd="url(#bcur)" />
        {/* blocked top segment across the shaded group (dim/red, no current) */}
        <line x1="146" y1="53" x2="214" y2="53" stroke="#ef4444" strokeWidth="1.4" strokeDasharray="4 3" opacity="0.7" />
        <line x1="214" y1="53" x2="252" y2="53" stroke={GRN} strokeWidth="2.4" markerEnd="url(#bcur)" />
        <line x1="320" y1="53" x2="348" y2="53" stroke={GRN} strokeWidth="2.4" markerEnd="url(#bcur)" />
        {/* the diversion through diode 2 is the green path drawn by diode(on=true) */}
        <line x1="170" y1="108" x2="186" y2="108" stroke={GRN} strokeWidth="2.4" markerEnd="url(#bcur)" />

        <text x="12" y="28" fontSize="9.5" fill={W85}>string current →</text>
        <text x="180" y="138" fontSize="9.5" fill={GRN} textAnchor="middle">bypass diode conducts</text>
        <text x="180" y="151" fontSize="8.5" fill={W55} textAnchor="middle">current flows around the shaded group, not through it</text>
      </svg>
    </DiagramFigure>
  );
}
