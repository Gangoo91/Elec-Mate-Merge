import type { ReactNode } from 'react';
import { DiagramFigure, ComparisonGrid } from './diagramKit';

const W = '#FFFFFF';
const W55 = 'rgba(255,255,255,0.7)';
const YEL = '#FFC400';
const GRN = '#34D399';

/* M5 S1 — battery chemistry comparison. */
export function BatteryChemistryComparison({ caption }: { caption?: ReactNode }) {
  return (
    <ComparisonGrid
      eyebrow="Battery chemistries"
      caption={caption}
      columns={[
        { name: 'LFP (LiFePO₄)', rows: [
          { label: 'Energy density', value: 'Moderate (90–120 Wh/kg)' },
          { label: 'Cycle life', value: '4,000–6,000+' },
          { label: 'Safety', value: 'Very stable' },
          { label: 'Cost', value: '££ (mid)' },
        ], footer: 'UK home-storage standard' },
        { name: 'NMC', rows: [
          { label: 'Energy density', value: 'High (150–220 Wh/kg)' },
          { label: 'Cycle life', value: '2,000–4,000' },
          { label: 'Safety', value: 'BMS-critical (thermal)' },
          { label: 'Cost', value: '££ (mid-high)' },
        ], footer: 'EVs, space-tight installs' },
        { name: 'Lead-acid', rows: [
          { label: 'Energy density', value: 'Low (30–50 Wh/kg)' },
          { label: 'Cycle life', value: '500–1,500' },
          { label: 'Safety', value: 'Safe, needs venting' },
          { label: 'Cost', value: '£ (low upfront)' },
        ], footer: 'Legacy off-grid' },
      ]}
      note={
        <>
          <span className="font-semibold text-elec-yellow">LFP</span> (lithium iron phosphate) dominates UK home battery storage — the best balance of safety, cycle life and cost, even though it is less energy-dense than NMC.
        </>
      }
    />
  );
}

/* M5 S6 — self-consumption vs battery size (the diminishing-returns knee). */
export function SelfConsumptionKnee({ caption }: { caption?: ReactNode }) {
  return (
    <DiagramFigure caption={caption}>
      <svg viewBox="0 0 360 238" className="w-full h-auto" role="img" aria-label="Self-consumption versus battery size">
        <line x1="54" y1="198" x2="340" y2="198" stroke="#fff" strokeWidth="1" opacity="0.4" />
        <line x1="54" y1="198" x2="54" y2="34" stroke="#fff" strokeWidth="1" opacity="0.4" />
        <text x="196" y="230" fontSize="11" fill={W} textAnchor="middle">Battery size (kWh)</text>
        <text x="18" y="116" fontSize="11" fill={W} textAnchor="middle" transform="rotate(-90 18 116)">Self-consumption (%)</text>
        {/* x ticks */}
        {[['0', 54], ['5', 143], ['10', 232], ['15', 320]].map(([t, x]) => (<text key={t as string} x={x as number} y="212" fontSize="9" fill={W55} textAnchor="middle">{t}</text>))}
        {/* curve: steep rise then flatten */}
        <path d="M54,162 C92,150 122,96 150,80 C210,60 280,54 320,52" fill="none" stroke={YEL} strokeWidth="2.6" />
        {/* knee marker */}
        <circle cx="150" cy="80" r="4.5" fill={YEL} />
        <line x1="150" y1="80" x2="150" y2="198" stroke={YEL} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
        <text x="158" y="74" fontSize="9.5" fill={YEL}>the knee</text>
        {/* annotations */}
        <text x="92" y="120" fontSize="8.5" fill={W55}>small battery →</text>
        <text x="92" y="131" fontSize="8.5" fill={W55}>most of the gain</text>
        <text x="232" y="44" fontSize="8.5" fill={W55} textAnchor="middle">bigger battery → little extra</text>
      </svg>
    </DiagramFigure>
  );
}

/* M5 S8 — LFP capacity fade over life. */
export function LfpFadeCurve({ caption }: { caption?: ReactNode }) {
  // y: 100% at y=44, 70% at y=196 → 30% over 152px (≈5.07 px/%). 80% → y≈145
  return (
    <DiagramFigure caption={caption}>
      <svg viewBox="0 0 360 238" className="w-full h-auto" role="img" aria-label="LFP capacity fade over years">
        <line x1="54" y1="196" x2="340" y2="196" stroke="#fff" strokeWidth="1" opacity="0.4" />
        <line x1="54" y1="196" x2="54" y2="34" stroke="#fff" strokeWidth="1" opacity="0.4" />
        <text x="196" y="228" fontSize="11" fill={W} textAnchor="middle">Years in service</text>
        <text x="18" y="116" fontSize="11" fill={W} textAnchor="middle" transform="rotate(-90 18 116)">Capacity (%)</text>
        {[['0', 54], ['5', 143], ['10', 232], ['15', 320]].map(([t, x]) => (<text key={t as string} x={x as number} y="210" fontSize="9" fill={W55} textAnchor="middle">{t}</text>))}
        {[['100', 44], ['90', 95], ['80', 145]].map(([t, y]) => (<text key={t as string} x="48" y={(y as number) + 3} fontSize="8.5" fill={W55} textAnchor="end">{t}</text>))}
        {/* 80% replacement line */}
        <line x1="54" y1="145" x2="340" y2="145" stroke="#F87171" strokeWidth="1" strokeDasharray="5 4" opacity="0.7" />
        <text x="338" y="139" fontSize="8.5" fill="#F87171" textAnchor="end">80% — typical end-of-warranty</text>
        {/* fade curve from 100% (yr0) gently to ~80% (yr~13) */}
        <path d="M54,44 C150,60 230,108 300,145 L320,156" fill="none" stroke={GRN} strokeWidth="2.6" />
        {/* periodic-check marker at ~yr10 */}
        <circle cx="232" cy="112" r="4" fill={GRN} />
        <text x="232" y="100" fontSize="8.5" fill={W55} textAnchor="middle">periodic check</text>
      </svg>
    </DiagramFigure>
  );
}
