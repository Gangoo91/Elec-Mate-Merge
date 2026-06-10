/**
 * Renewables calculator registry — one place for every renewable calc's logic.
 * Each calc is a pure definition: input fields + a compute() that returns the
 * headline, key figures, a plain-English takeaway, the step-by-step working,
 * the standard basis (why it's like this) and any warnings. The shared
 * <RenewableCalc> shell renders any of them, so design stays identical and
 * logic stays auditable.
 *
 * Grounded in: IET Code of Practice for Grid-Connected Solar PV (2nd Ed),
 * BS 7671:2018+A4:2026, MCS MIS 3002:2025 & MIS 3005-I:2025, EREC G98/G99/G100,
 * Approved Document S.
 */

import { sizeStrings } from './pvStringSizing';

export interface CalcField {
  key: string;
  label: string;
  unit?: string;
  default: number;
  step?: number;
  section?: string;
}

export interface CalcOutputItem {
  label: string;
  value: string;
  sub?: string;
}

export interface CalcResult {
  headline: string;
  ok: boolean;
  takeaway: string; // one-line bottom-line recommendation, using the actual numbers
  outputs: CalcOutputItem[];
  working: string[]; // step-by-step, with the actual numbers plugged in
  basis: string; // why it's calculated this way (standard + plain English)
  warnings: string[];
}

export interface CalcDef {
  id: string;
  group: 'Solar' | 'Cabling' | 'Grid' | 'Battery' | 'EV' | 'Heat Pump' | 'Finance';
  standard: string;
  title: string;
  description: string;
  fields: CalcField[];
  compute: (v: Record<string, number>) => CalcResult;
  related?: string[]; // ids of calcs to offer as next steps
  note?: string;
}

// ── helpers ─────────────────────────────────────────────────────────────────
const RHO_CU = 0.0225; // Ω·mm²/m, copper at ~70 °C design temp (BS 7671)
const GRID_CO2 = 0.207; // kgCO₂/kWh, UK grid (configurable)
const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;
const int = (n: number) => Math.round(n).toLocaleString('en-GB');
const gbp = (n: number) => `£${n.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;
const STD_DEVICE = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100];
const nextDevice = (a: number) => STD_DEVICE.find((s) => s >= a) ?? 125;

// ── registry ────────────────────────────────────────────────────────────────
export const RENEWABLE_CALCS: CalcDef[] = [
  {
    id: 'string-sizing',
    group: 'Solar',
    standard: 'IET CoP',
    title: 'PV String Sizing',
    description: 'Panels per string & strings per MPPT — temperature-corrected for UK extremes.',
    related: ['dc-vd', 'inverter-ratio', 'system-size'],
    note: 'UK design temps default to −10 °C / +70 °C. Adjust per site or the inverter string tool.',
    fields: [
      { key: 'voc', label: 'Voc', unit: 'V', default: 49.5, step: 0.1, section: 'Panel (STC)' },
      { key: 'vmp', label: 'Vmp', unit: 'V', default: 41.5, step: 0.1, section: 'Panel (STC)' },
      { key: 'isc', label: 'Isc', unit: 'A', default: 11.4, step: 0.1, section: 'Panel (STC)' },
      {
        key: 'betaVoc',
        label: 'Voc temp coeff',
        unit: '%/°C',
        default: -0.25,
        step: 0.01,
        section: 'Panel (STC)',
      },
      {
        key: 'betaVmp',
        label: 'Vmp temp coeff',
        unit: '%/°C',
        default: -0.4,
        step: 0.01,
        section: 'Panel (STC)',
      },
      { key: 'vDcMax', label: 'Max DC voltage', unit: 'V', default: 600, section: 'Inverter' },
      { key: 'vMpptMin', label: 'MPPT min', unit: 'V', default: 60, section: 'Inverter' },
      { key: 'vMpptMax', label: 'MPPT max', unit: 'V', default: 550, section: 'Inverter' },
      {
        key: 'iMpptMax',
        label: 'Max I / MPPT',
        unit: 'A',
        default: 13.5,
        step: 0.1,
        section: 'Inverter',
      },
      { key: 'tMin', label: 'Coldest cell', unit: '°C', default: -10, section: 'Design temps' },
      { key: 'tCellMax', label: 'Hottest cell', unit: '°C', default: 70, section: 'Design temps' },
    ],
    compute: (v) => {
      const r = sizeStrings({
        panel: { voc: v.voc, vmp: v.vmp, isc: v.isc, betaVoc: v.betaVoc, betaVmp: v.betaVmp },
        inverter: {
          vDcMax: v.vDcMax,
          vMpptMin: v.vMpptMin,
          vMpptMax: v.vMpptMax,
          iMpptMax: v.iMpptMax,
        },
        tMin: v.tMin,
        tCellMax: v.tCellMax,
      });
      return {
        headline:
          r.recommended != null ? `${r.recommended} panels per string` : 'No valid string length',
        ok: r.recommended != null,
        takeaway:
          r.recommended != null
            ? `${r.recommended} panels per string keeps you inside the inverter's window across UK extremes — ${r.vocCold} V at ${v.tMin}°C, ${r.vmpHot} V at ${v.tCellMax}°C — running ${r.stringsPerMppt} string(s) per MPPT.`
            : "No string length fits this panel and inverter across the temperature range — check the inverter's voltage limits or choose a panel with a different voltage profile.",
        outputs: [
          { label: 'Range', value: `${r.nMin}–${r.nMax}` },
          { label: 'Strings / MPPT', value: String(r.stringsPerMppt) },
          { label: 'Voc @ cold', value: `${r.vocCold} V`, sub: `${v.tMin}°C` },
          { label: 'Vmp @ hot', value: `${r.vmpHot} V`, sub: `${v.tCellMax}°C` },
          { label: 'DC design I', value: `${r.designCurrent} A`, sub: '1.25 × Isc' },
        ],
        working: [
          `Cold Voc: ${v.voc} V × (1 + ${v.betaVoc}%/°C × (${v.tMin} − 25)°C) = ${r.vocCold} V`,
          `Max in series: ${v.vDcMax} V ÷ ${r.vocCold} V = ${r1(v.vDcMax / Math.max(r.vocCold, 0.01))} → ${r.nMax} panels (never exceed the inverter's ${v.vDcMax} V limit)`,
          `Hot Vmp: ${v.vmp} V × (1 + ${v.betaVmp}%/°C × (${v.tCellMax} − 25)°C) = ${r.vmpHot} V`,
          `Min in series: ${v.vMpptMin} V ÷ ${r.vmpHot} V = ${r1(v.vMpptMin / Math.max(r.vmpHot, 0.01))} → ${r.nMin} panels (stay above the MPPT minimum when hot)`,
          `Parallel: ${v.iMpptMax} A MPPT limit ÷ ${v.isc} A Isc = ${r.stringsPerMppt} string(s) per MPPT`,
        ],
        basis:
          "Strings are sized for the two worst cases: the coldest day (highest voltage — must never exceed the inverter's maximum) and the hottest day (lowest voltage — must stay above the MPPT minimum to keep tracking). Temperature coefficients come from the panel datasheet. Per the IET Code of Practice & BS 7671.",
        warnings: r.warnings,
      };
    },
  },

  {
    id: 'system-size',
    group: 'Solar',
    standard: 'kWp',
    title: 'System Size & Panel Count',
    description:
      'Panel count and wattage → array kWp, suggested inverter and roof area — or set a target to get the panels needed.',
    related: ['inverter-ratio', 'yield-co2', 'string-sizing'],
    fields: [
      { key: 'panelWp', label: 'Panel wattage', unit: 'W', default: 450 },
      { key: 'panelCount', label: 'Number of panels', unit: '', default: 12 },
      { key: 'panelAreaM2', label: 'Panel area (each)', unit: 'm²', default: 2.1, step: 0.05 },
      { key: 'targetKwp', label: 'Target (optional)', unit: 'kWp', default: 0, step: 0.1 },
    ],
    compute: (v) => {
      const kwp = (v.panelWp * v.panelCount) / 1000;
      const area = v.panelCount * v.panelAreaM2;
      const invKw = r1(kwp / 1.2); // ≈1.2:1 DC:AC sweet spot
      const outputs: CalcOutputItem[] = [
        { label: 'Panels', value: String(Math.round(v.panelCount)) },
        { label: 'Suggested inverter', value: `~${invKw} kW`, sub: '≈1.2 : 1 DC:AC' },
        { label: 'Per panel', value: `${Math.round(v.panelWp)} W` },
        { label: 'Roof area', value: `${r1(area)} m²` },
      ];
      const working = [
        `${Math.round(v.panelCount)} panels × ${Math.round(v.panelWp)} W = ${int(v.panelCount * v.panelWp)} W = ${r2(kwp)} kWp`,
        `Roof area: ${Math.round(v.panelCount)} × ${v.panelAreaM2} m² = ${r1(area)} m²`,
        `Suggested inverter: ${r2(kwp)} kWp ÷ 1.2 = ~${invKw} kW AC`,
      ];
      let targetNote = '';
      if (v.targetKwp > 0 && v.panelWp > 0) {
        const needed = Math.ceil((v.targetKwp * 1000) / v.panelWp);
        outputs.push({ label: `For ${r2(v.targetKwp)} kWp`, value: `${needed} panels` });
        working.push(
          `Target ${r2(v.targetKwp)} kWp = ${v.targetKwp * 1000} W ÷ ${Math.round(v.panelWp)} W = ${r1((v.targetKwp * 1000) / v.panelWp)} → round up to ${needed} panels`
        );
        targetNote = ` To hit ${r2(v.targetKwp)} kWp you'd need ${needed} panels.`;
      }
      return {
        headline: `${r2(kwp)} kWp`,
        ok: kwp > 0,
        takeaway: `${Math.round(v.panelCount)} × ${Math.round(v.panelWp)} W panels make a ${r2(kwp)} kWp array over ~${r1(area)} m² of roof — pair it with roughly a ${invKw} kW inverter.${targetNote}`,
        outputs,
        working,
        basis:
          'Array size (kWp) is the total panel wattage at STC ÷ 1000. We suggest an inverter at about a 1.2 : 1 DC:AC ratio (the UK sweet spot — panels rarely hit their rating here) and show the roof footprint as a sense-check that the panels physically fit, allowing extra for margins and access.',
        warnings: [],
      };
    },
  },

  {
    id: 'yield-co2',
    group: 'Solar',
    standard: 'PVGIS',
    title: 'Annual Yield & CO₂',
    description:
      'Estimated generation, carbon saving and lifetime output from system size and site yield.',
    related: ['battery-autonomy', 'payback', 'system-size'],
    note: 'Specific yield is the regional kWh per kWp. UK south-facing ≈ 950; reduce for E/W or shallow tilt. Replaced by a live PVGIS lookup in the designer.',
    fields: [
      { key: 'kwp', label: 'System size', unit: 'kWp', default: 5.4, step: 0.1 },
      { key: 'specificYield', label: 'Specific yield', unit: 'kWh/kWp', default: 950 },
    ],
    compute: (v) => {
      const annual = v.kwp * v.specificYield;
      const co2 = annual * GRID_CO2;
      return {
        headline: `${int(annual)} kWh/yr`,
        ok: annual > 0,
        takeaway: `A ${r2(v.kwp)} kWp array should generate about ${int(annual)} kWh a year — saving roughly ${r1(co2 / 1000)} t of CO₂ annually. Add a battery to soak up the daytime surplus.`,
        outputs: [
          { label: 'CO₂ saved', value: `${r1(co2 / 1000)} t/yr` },
          { label: 'Daily average', value: `${r1(annual / 365)} kWh` },
          { label: 'Over 25 yr', value: `${int((annual * 25) / 1000)} MWh` },
        ],
        working: [
          `Generation: ${r2(v.kwp)} kWp × ${Math.round(v.specificYield)} kWh/kWp = ${int(annual)} kWh/yr`,
          `CO₂ saved: ${int(annual)} kWh × ${GRID_CO2} kg/kWh = ${int(co2)} kg = ${r1(co2 / 1000)} t/yr`,
          `Lifetime: ${int(annual)} kWh × 25 yr = ${int((annual * 25) / 1000)} MWh (before degradation)`,
        ],
        basis:
          "Annual generation ≈ system size × the site's specific yield (kWh per kWp installed), which already bundles in typical losses and irradiance for the orientation. CO₂ saved values each kWh against the UK grid carbon factor.",
        warnings: [],
      };
    },
  },

  {
    id: 'inverter-ratio',
    group: 'Solar',
    standard: 'DC:AC',
    title: 'Inverter Sizing',
    description: 'DC:AC ratio (array oversizing) — flags undersized arrays and clipping risk.',
    related: ['system-size', 'export-limit', 'string-sizing'],
    fields: [
      { key: 'arrayKwp', label: 'Array size', unit: 'kWp', default: 5.4, step: 0.1 },
      { key: 'inverterKw', label: 'Inverter AC', unit: 'kW', default: 5, step: 0.1 },
    ],
    compute: (v) => {
      const ratio = v.inverterKw > 0 ? v.arrayKwp / v.inverterKw : 0;
      const warnings: string[] = [];
      let verdict = 'in the sweet spot for UK conditions';
      if (ratio > 0 && ratio < 1) {
        verdict = 'leaving inverter capacity unused';
        warnings.push(
          'Array is smaller than the inverter — inverter is oversized, mild efficiency loss.'
        );
      } else if (ratio > 1.35) {
        verdict = 'likely to clip on the brightest days';
        warnings.push('High oversizing (>1.35) — expect noticeable clipping on bright days.');
      }
      return {
        headline: `${r2(ratio)} : 1 DC:AC`,
        ok: ratio > 0,
        takeaway: `At ${r2(ratio)} : 1, a ${r2(v.arrayKwp)} kWp array on a ${r1(v.inverterKw)} kW inverter is ${verdict}. The UK sweet spot is 1.10–1.30 : 1.`,
        outputs: [
          { label: 'Array', value: `${r2(v.arrayKwp)} kWp` },
          { label: 'Inverter', value: `${r1(v.inverterKw)} kW` },
          { label: 'Ideal range', value: '1.10–1.30 : 1' },
        ],
        working: [`DC:AC ratio: ${r2(v.arrayKwp)} kWp ÷ ${r1(v.inverterKw)} kW = ${r2(ratio)} : 1`],
        basis:
          'Arrays are deliberately oversized vs the inverter (≈1.1–1.3:1) because panels rarely hit their STC rating in the UK — the extra DC fills the inverter for more of the day. Too high and the inverter "clips" peak output on bright days; too low (<1) wastes inverter capacity.',
        warnings,
      };
    },
  },

  {
    id: 'dc-vd',
    group: 'Cabling',
    standard: 'BS 7671 · 712',
    title: 'DC Voltage Drop',
    description: 'String / array DC cable drop against the 1% target — sizes your DC cable.',
    related: ['string-sizing', 'ac-vd', 'system-size'],
    fields: [
      { key: 'current', label: 'Current (Imp)', unit: 'A', default: 10.5, step: 0.1 },
      { key: 'stringVoltage', label: 'String voltage (Vmp)', unit: 'V', default: 450 },
      { key: 'length', label: 'Run length (one way)', unit: 'm', default: 20 },
      { key: 'csa', label: 'Cable CSA', unit: 'mm²', default: 4, step: 0.5 },
    ],
    compute: (v) => {
      const vdrop = v.csa > 0 ? (2 * RHO_CU * v.length * v.current) / v.csa : 0;
      const pct = v.stringVoltage > 0 ? (vdrop / v.stringVoltage) * 100 : 0;
      const ok = pct <= 1;
      return {
        headline: `${r2(pct)} %`,
        ok: v.csa > 0 && ok,
        takeaway: `${r2(pct)}% drop over a ${v.length} m run on ${v.csa} mm² is ${ok ? 'within the 1% DC target — this CSA is fine' : 'over the 1% DC target — go up at least one cable size or shorten the run'}.`,
        outputs: [
          { label: 'Voltage drop', value: `${r2(vdrop)} V` },
          { label: 'Target', value: '≤ 1 %' },
        ],
        working: [
          `Vdrop = 2 × ρ × L × I ÷ CSA = 2 × ${RHO_CU} × ${v.length} m × ${v.current} A ÷ ${v.csa} mm² = ${r2(vdrop)} V`,
          `As %: ${r2(vdrop)} V ÷ ${v.stringVoltage} V × 100 = ${r2(pct)} %`,
        ],
        basis:
          "DC drop uses the full loop (×2 — out and back) at the operating current (Imp). Copper resistivity is taken at ~70 °C design temperature. The 1% target keeps DC losses low so the inverter sees close to the panels' real output.",
        warnings: !ok ? ['Above the 1% DC target — increase CSA or shorten the run.'] : [],
      };
    },
  },

  {
    id: 'ac-vd',
    group: 'Cabling',
    standard: 'MIS 3002 · 3.6.8',
    title: 'AC Voltage Drop',
    description: 'Inverter → cut-out AC cable. 1% domestic target, up to 3% on longer runs.',
    related: ['dc-vd', 'g98-g99', 'inverter-ratio'],
    fields: [
      { key: 'current', label: 'AC current', unit: 'A', default: 16, step: 0.1 },
      { key: 'voltage', label: 'Voltage (L-N)', unit: 'V', default: 230 },
      { key: 'phases', label: 'Phases (1 or 3)', unit: '', default: 1 },
      { key: 'length', label: 'Run length (one way)', unit: 'm', default: 15 },
      { key: 'csa', label: 'Cable CSA', unit: 'mm²', default: 6, step: 0.5 },
    ],
    compute: (v) => {
      const three = Math.round(v.phases) === 3;
      const k = three ? Math.sqrt(3) : 2;
      const vdrop = v.csa > 0 ? (k * RHO_CU * v.length * v.current) / v.csa : 0;
      const ref = three ? v.voltage * Math.sqrt(3) : v.voltage;
      const pct = ref > 0 ? (vdrop / ref) * 100 : 0;
      const warnings: string[] = [];
      let verdict = 'comfortably within the 1% domestic target';
      if (pct > 3) {
        verdict = 'over 3% — too high';
        warnings.push('Above 3% — too high; increase CSA or shorten the run.');
      } else if (pct > 1) {
        verdict = 'over the 1% target but acceptable on a longer run';
        warnings.push('Above the 1% domestic target — acceptable up to 3% on longer runs.');
      }
      return {
        headline: `${r2(pct)} %`,
        ok: v.csa > 0 && pct <= 3,
        takeaway: `${r2(pct)}% on this ${three ? '3-phase' : 'single-phase'} run is ${verdict}. Keeping it low also stops the inverter nuisance-tripping on over-voltage.`,
        outputs: [
          { label: 'Voltage drop', value: `${r2(vdrop)} V` },
          { label: 'Supply', value: three ? '3-phase' : 'Single-phase' },
          { label: 'Target', value: '1% (≤3%)' },
        ],
        working: [
          `Vdrop = ${three ? '√3' : '2'} × ρ × L × I ÷ CSA = ${r2(k)} × ${RHO_CU} × ${v.length} m × ${v.current} A ÷ ${v.csa} mm² = ${r2(vdrop)} V`,
          `As %: ${r2(vdrop)} V ÷ ${r1(ref)} V × 100 = ${r2(pct)} %`,
        ],
        basis:
          "MIS 3002 §3.6.8 measures AC drop from the supplier's cut-out to the inverter terminals — minimising it both reduces losses and stops the inverter nuisance-tripping on over-voltage. 1% is the domestic target; up to 3% is accepted on longer runs.",
        warnings,
      };
    },
  },

  {
    id: 'g98-g99',
    group: 'Grid',
    standard: 'EREC G98 / G99',
    title: 'G98 / G99 Route',
    description: 'Which DNO route applies — notification (≤16 A/phase) or full application.',
    related: ['export-limit', 'inverter-ratio', 'ac-vd'],
    fields: [
      { key: 'inverterKw', label: 'Total inverter AC', unit: 'kW', default: 3.68, step: 0.01 },
      { key: 'voltage', label: 'Voltage (L-N)', unit: 'V', default: 230 },
      { key: 'phases', label: 'Phases (1 or 3)', unit: '', default: 1 },
    ],
    compute: (v) => {
      const three = Math.round(v.phases) === 3;
      const denom = three ? 3 * v.voltage : v.voltage;
      const iPerPhase = denom > 0 ? (v.inverterKw * 1000) / denom : 0;
      const g98 = iPerPhase <= 16;
      return {
        headline: g98 ? 'G98 — notify' : 'G99 — apply',
        ok: true,
        takeaway: `At ${r1(iPerPhase)} A per phase this is a ${g98 ? 'G98 — you can connect Fully Type Tested kit then notify the DNO' : 'G99 — you must get DNO approval before energising'}.`,
        outputs: [
          { label: 'Per phase', value: `${r1(iPerPhase)} A` },
          { label: 'Threshold', value: '16 A / phase' },
          { label: 'Action', value: g98 ? 'Notify DNO' : 'DNO approval first' },
        ],
        working: [
          three
            ? `I/phase = ${v.inverterKw} kW × 1000 ÷ (3 × ${v.voltage} V) = ${r1(iPerPhase)} A`
            : `I/phase = ${v.inverterKw} kW × 1000 ÷ ${v.voltage} V = ${r1(iPerPhase)} A`,
          `${r1(iPerPhase)} A ${g98 ? '≤' : '>'} 16 A → ${g98 ? 'G98' : 'G99'}`,
        ],
        basis:
          'The DNO route is set by the generation current per phase. ≤ 16 A/phase of Fully Type Tested equipment can be connected then notified (G98). Above 16 A/phase needs a G99 application and DNO approval before energising.',
        warnings: g98
          ? ['Assumes Fully Type Tested equipment — non-type-tested kit goes via G99 regardless.']
          : ['G99 — connection requires DNO approval before energising.'],
      };
    },
  },

  {
    id: 'export-limit',
    group: 'Grid',
    standard: 'EREC G100',
    title: 'Export Limit',
    description: 'Does export exceed the DNO allowance — is a G100 export-limiting scheme needed?',
    related: ['g98-g99', 'battery-autonomy', 'inverter-ratio'],
    fields: [
      { key: 'inverterKw', label: 'Inverter AC', unit: 'kW', default: 5, step: 0.1 },
      { key: 'batteryKw', label: 'Battery discharge', unit: 'kW', default: 0, step: 0.1 },
      { key: 'dnoExportKw', label: 'DNO export allowance', unit: 'kW', default: 3.68, step: 0.01 },
    ],
    compute: (v) => {
      const exportKw = v.inverterKw + v.batteryKw;
      const over = exportKw > v.dnoExportKw;
      return {
        headline: over ? 'G100 export limiter needed' : 'Within export allowance',
        ok: !over,
        takeaway: over
          ? `Worst-case export of ${r1(exportKw)} kW exceeds the ${r2(v.dnoExportKw)} kW allowance by ${r1(exportKw - v.dnoExportKw)} kW — fit a G100 limiter or curtail.`
          : `Worst-case export of ${r1(exportKw)} kW sits within the ${r2(v.dnoExportKw)} kW allowance — no limiter needed.`,
        outputs: [
          { label: 'Max export', value: `${r1(exportKw)} kW` },
          { label: 'Allowance', value: `${r2(v.dnoExportKw)} kW` },
          { label: 'Over by', value: over ? `${r1(exportKw - v.dnoExportKw)} kW` : '—' },
        ],
        working: [
          `Max export = inverter ${r1(v.inverterKw)} kW + battery ${r1(v.batteryKw)} kW = ${r1(exportKw)} kW`,
          `${r1(exportKw)} kW ${over ? '>' : '≤'} ${r2(v.dnoExportKw)} kW allowance → ${over ? 'limiter required' : 'within limit'}`,
        ],
        basis:
          'The DNO assesses the worst case — maximum possible export with no household load. If your combined inverter + battery output can exceed the agreed export limit, a G100 Customer Export Limiting Scheme (fail-safe) holds export at the limit rather than curtailing generation.',
        warnings: over
          ? [
              'Fit a G100 Customer Export Limiting Scheme (fail-safe) set to the allowance, or curtail.',
            ]
          : [],
      };
    },
  },

  {
    id: 'battery-autonomy',
    group: 'Battery',
    standard: 'IET CoP',
    title: 'Battery Sizing & Autonomy',
    description: 'Usable capacity vs daily usage — autonomy hours and self-sufficiency.',
    related: ['yield-co2', 'export-limit', 'payback'],
    fields: [
      { key: 'usableKwh', label: 'Usable capacity', unit: 'kWh', default: 10, step: 0.1 },
      { key: 'dailyUsageKwh', label: 'Daily usage', unit: 'kWh', default: 12, step: 0.1 },
    ],
    compute: (v) => {
      const autonomyH = v.dailyUsageKwh > 0 ? (v.usableKwh / v.dailyUsageKwh) * 24 : 0;
      const selfSuff =
        v.dailyUsageKwh > 0 ? Math.min(100, (v.usableKwh / v.dailyUsageKwh) * 100) : 0;
      return {
        headline: `${r1(autonomyH)} h autonomy`,
        ok: v.dailyUsageKwh > 0,
        takeaway: `${r1(v.usableKwh)} kWh of usable storage covers about ${Math.round(selfSuff)}% of a ${r1(v.dailyUsageKwh)} kWh day — roughly ${r1(autonomyH)} hours with no generation.`,
        outputs: [
          { label: 'Covers', value: `${Math.round(selfSuff)}% of daily use` },
          { label: 'Usable', value: `${r1(v.usableKwh)} kWh` },
        ],
        working: [
          `Autonomy = ${r1(v.usableKwh)} kWh ÷ ${r1(v.dailyUsageKwh)} kWh/day × 24 h = ${r1(autonomyH)} h`,
          `Daily cover = ${r1(v.usableKwh)} ÷ ${r1(v.dailyUsageKwh)} = ${Math.round(selfSuff)}% of a day's use`,
        ],
        basis:
          'Autonomy is how long the usable capacity would carry the average load with no generation. Use usable (not nameplate) capacity — that already accounts for depth-of-discharge. Beyond one full day, extra capacity only helps across consecutive low-generation days.',
        warnings:
          v.usableKwh > v.dailyUsageKwh
            ? [
                "Capacity exceeds a full day's usage — extra capacity only helps across multiple low-generation days.",
              ]
            : [],
      };
    },
  },

  {
    id: 'heat-pump-supply',
    group: 'Heat Pump',
    standard: 'MIS 3005 · BS 7671',
    title: 'Heat Pump Electrical Supply',
    description: 'Electrical input → design current, protective device and supply check.',
    related: ['heat-pump-sizing', 'ev-load', 'ac-vd'],
    note: "Use the heat pump's max electrical input from the datasheet. Type C device for compressor inrush; size the cable for the device + install method.",
    fields: [
      { key: 'electricalKw', label: 'Max electrical input', unit: 'kW', default: 3, step: 0.1 },
      { key: 'voltage', label: 'Voltage (L-N)', unit: 'V', default: 230 },
      { key: 'phases', label: 'Phases (1 or 3)', unit: '', default: 1 },
    ],
    compute: (v) => {
      const three = Math.round(v.phases) === 3;
      const denom = three ? 3 * v.voltage : v.voltage;
      const current = denom > 0 ? (v.electricalKw * 1000) / denom : 0;
      const device = nextDevice(current);
      const warnings: string[] = [];
      if (!three && current > 32)
        warnings.push('Over 32 A single-phase — consider 3-phase or a supply upgrade.');
      return {
        headline: `${r1(current)} A design current`,
        ok: current > 0,
        takeaway: `A ${r1(v.electricalKw)} kW heat pump draws ${r1(current)} A on a ${three ? '3-phase' : 'single-phase'} supply — protect it with a ${device} A Type C device and size the cable for that.`,
        outputs: [
          { label: 'Device (Type C)', value: `${device} A` },
          { label: 'Input', value: `${r1(v.electricalKw)} kW` },
          { label: 'Supply', value: three ? '3-phase' : '1-phase' },
        ],
        working: [
          three
            ? `Design current = ${v.electricalKw} kW × 1000 ÷ (3 × ${v.voltage} V) = ${r1(current)} A`
            : `Design current = ${v.electricalKw} kW × 1000 ÷ ${v.voltage} V = ${r1(current)} A`,
          `Next standard device ≥ ${r1(current)} A = ${device} A (Type C for compressor inrush)`,
        ],
        basis:
          "Heat pumps draw a steady running current set by their max electrical input. The protective device must be ≥ that current and the cable sized for the device + install method. Type C handles the compressor's start-up inrush without nuisance tripping.",
        warnings,
      };
    },
  },

  {
    id: 'heat-pump-sizing',
    group: 'Heat Pump',
    standard: 'BS EN 12831',
    title: 'Heat Pump Sizing',
    description: 'Quick design heat load from floor area and build type, to choose the unit.',
    related: ['heat-pump-supply', 'payback', 'yield-co2'],
    note: 'Estimate only — MCS requires a full room-by-room BS EN 12831 heat-loss calc. Heat loss factor: ~40 W/m² well-insulated, ~60 typical, ~90+ older/solid-wall.',
    fields: [
      { key: 'floorArea', label: 'Floor area', unit: 'm²', default: 90 },
      { key: 'heatLossFactor', label: 'Heat loss factor', unit: 'W/m²', default: 60 },
      { key: 'dhwKw', label: 'Hot water allowance', unit: 'kW', default: 0, step: 0.1 },
    ],
    compute: (v) => {
      const spaceKw = (v.floorArea * v.heatLossFactor) / 1000;
      const totalKw = spaceKw + v.dhwKw;
      return {
        headline: `${r1(totalKw)} kW design load`,
        ok: totalKw > 0,
        takeaway: `A ${v.floorArea} m² home at ${v.heatLossFactor} W/m² needs roughly a ${r1(totalKw)} kW heat pump${totalKw > 45 ? ' — beyond a single MCS unit, so split the load across multiple units' : '. Size to meet, not far exceed, this for best efficiency'}.`,
        outputs: [
          { label: 'Space heating', value: `${r1(spaceKw)} kW` },
          { label: 'Hot water', value: `${r1(v.dhwKw)} kW` },
          { label: 'Recommend HP', value: `≥ ${r1(totalKw)} kWth` },
        ],
        working: [
          `Space heating = ${v.floorArea} m² × ${v.heatLossFactor} W/m² ÷ 1000 = ${r1(spaceKw)} kW`,
          `+ hot water allowance ${r1(v.dhwKw)} kW = ${r1(totalKw)} kW design load`,
        ],
        basis:
          'A first-pass design load from floor area × a heat-loss factor for the building type. MCS requires a full room-by-room BS EN 12831 calc — this is a sense-check / quote estimate. Size the heat pump to meet (not far exceed) the design load for best efficiency.',
        warnings:
          totalKw > 45
            ? ['Exceeds the 45 kWth single-unit MCS limit — use multiple units (≤70 kWth total).']
            : [],
      };
    },
  },

  {
    id: 'ev-load',
    group: 'EV',
    standard: 'Doc S · BS 7671 722',
    title: 'EV Charger Load & Diversity',
    description: 'Total charging load vs spare supply capacity — flags load management.',
    related: ['heat-pump-supply', 'ac-vd', 'g98-g99'],
    fields: [
      { key: 'chargerKw', label: 'Charger rating', unit: 'kW', default: 7.4, step: 0.1 },
      { key: 'numChargers', label: 'Number of chargers', unit: '', default: 1 },
      { key: 'diversityPct', label: 'Diversity', unit: '%', default: 100 },
      { key: 'spareKw', label: 'Spare supply capacity', unit: 'kW', default: 8, step: 0.1 },
    ],
    compute: (v) => {
      const load = v.chargerKw * v.numChargers * (v.diversityPct / 100);
      const over = load > v.spareKw;
      return {
        headline: `${r1(load)} kW load`,
        ok: true,
        takeaway: over
          ? `${Math.round(v.numChargers)} × ${r1(v.chargerKw)} kW charging needs ${r1(load)} kW but only ${r1(v.spareKw)} kW is spare — fit load management to stay within the supply.`
          : `${Math.round(v.numChargers)} × ${r1(v.chargerKw)} kW charging needs ${r1(load)} kW and fits the ${r1(v.spareKw)} kW spare — no load management needed.`,
        outputs: [
          { label: 'Chargers', value: `${Math.round(v.numChargers)} × ${r1(v.chargerKw)} kW` },
          { label: 'Spare capacity', value: `${r1(v.spareKw)} kW` },
          {
            label: 'Headroom',
            value: over ? `${r1(load - v.spareKw)} kW over` : `${r1(v.spareKw - load)} kW`,
          },
        ],
        working: [
          `Load = ${r1(v.chargerKw)} kW × ${Math.round(v.numChargers)} × ${v.diversityPct}% diversity = ${r1(load)} kW`,
          `Headroom = ${r1(v.spareKw)} kW spare − ${r1(load)} kW = ${r1(v.spareKw - load)} kW`,
        ],
        basis:
          "Approved Document S requires charge points of at least 7 kW. The charging load (with any diversity) must fit within the supply's spare capacity after existing demand — if not, BS 7671 722 load management (CT clamp / dynamic balancing) curtails charging to stay within the supply.",
        warnings: over
          ? [
              'Load exceeds spare capacity — fit load management (CT clamp / dynamic balancing) per BS 7671 722.',
            ]
          : [],
      };
    },
  },

  {
    id: 'payback',
    group: 'Finance',
    standard: 'ROI',
    title: 'Savings & Payback',
    description: 'Annual savings (self-use + export) and simple payback period.',
    related: ['yield-co2', 'battery-autonomy', 'system-size'],
    fields: [
      { key: 'systemCost', label: 'System cost', unit: '£', default: 7000, section: 'Cost' },
      {
        key: 'annualGen',
        label: 'Annual generation',
        unit: 'kWh',
        default: 4500,
        section: 'Generation',
      },
      { key: 'selfUsePct', label: 'Self-use', unit: '%', default: 40, section: 'Generation' },
      {
        key: 'importRate',
        label: 'Import rate',
        unit: 'p/kWh',
        default: 28,
        step: 0.1,
        section: 'Tariffs',
      },
      {
        key: 'segRate',
        label: 'SEG export rate',
        unit: 'p/kWh',
        default: 15,
        step: 0.1,
        section: 'Tariffs',
      },
    ],
    compute: (v) => {
      const selfUse = v.annualGen * (v.selfUsePct / 100);
      const exported = v.annualGen - selfUse;
      const saveSelf = (selfUse * v.importRate) / 100;
      const saveExport = (exported * v.segRate) / 100;
      const savings = saveSelf + saveExport;
      const payback = savings > 0 ? v.systemCost / savings : 0;
      return {
        headline: payback > 0 ? `${r1(payback)} yr payback` : '—',
        ok: payback > 0,
        takeaway:
          payback > 0
            ? `Saving about ${gbp(savings)} a year, a ${gbp(v.systemCost)} system pays back in roughly ${r1(payback)} years and returns around ${gbp(savings * 25)} over 25 years.`
            : 'Enter a generation figure and tariffs to see the payback.',
        outputs: [
          { label: 'Annual saving', value: gbp(savings) },
          { label: 'Self-use', value: gbp(saveSelf) },
          { label: 'Export (SEG)', value: gbp(saveExport) },
          { label: 'Over 25 yr', value: gbp(savings * 25) },
        ],
        working: [
          `Self-use: ${int(v.annualGen)} kWh × ${v.selfUsePct}% × ${v.importRate}p = ${gbp(saveSelf)}`,
          `Export: ${int(exported)} kWh × ${v.segRate}p (SEG) = ${gbp(saveExport)}`,
          `Payback = ${gbp(v.systemCost)} ÷ ${gbp(savings)}/yr = ${r1(payback)} years`,
        ],
        basis:
          'Savings come from two streams: electricity you use directly (valued at your import rate) and the surplus you export (valued at the SEG rate). Simple payback = cost ÷ annual saving — it ignores tariff inflation, panel degradation and battery, so treat it as a conservative headline.',
        warnings: [],
      };
    },
  },
];

export const getCalc = (id: string): CalcDef | undefined =>
  RENEWABLE_CALCS.find((c) => c.id === id);
