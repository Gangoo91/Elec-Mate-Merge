/**
 * Renewable Design Suite — engine.
 *
 * Pure composition layer: takes a design state for each technology (solar PV,
 * battery storage, EV charging, heat pump), runs it through the SAME audited
 * logic the calculators use (calcEngine computes + pvStringSizing), and returns
 * a set of design checks plus a certificate pre-fill payload.
 *
 * Nothing here is new maths — every number comes from the registry computes,
 * so the designer and the calculators can never disagree.
 *
 * Grounded in: IET Code of Practice for Grid-Connected Solar PV (2nd Ed),
 * BS 7671:2018+A4:2026 (712/722/826), MCS MIS 3002/3005, EREC G98/G99/G100,
 * Approved Document S, BS EN 12831.
 */

import { sizeStrings, type StringSizingResult } from './pvStringSizing';
import { getCalc, type CalcResult } from './calcEngine';
import type { SolarPanel } from '@/data/solarPanelDatabase';
import type { SolarInverter } from '@/data/solarInverterDatabase';
import type { EVCharger } from '@/data/evChargerDatabase';
import { getDefaultSolarPVFormData, getDefaultPVArray, getDefaultInverter } from '@/types/solar-pv';
import { getDefaultBESSFormData } from '@/types/bess';
import { getDefaultEVChargingFormData } from '@/types/ev-charging';

// ── shared shapes ───────────────────────────────────────────────────────────

export interface DesignCheck {
  id: string;
  title: string;
  standard: string;
  result: CalcResult;
}

const run = (calcId: string, vals: Record<string, number>): CalcResult => {
  const def = getCalc(calcId);
  if (!def) throw new Error(`Unknown calc: ${calcId}`);
  return def.compute(vals);
};

const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;

// ════════════════════════════════════════════════════════════════════════════
// SOLAR PV
// ════════════════════════════════════════════════════════════════════════════

export interface SolarDesignState {
  panel: SolarPanel | null;
  inverter: SolarInverter | null;
  targetKwp: number; // what the customer asked for
  tMin: number; // coldest cell temp (°C)
  tCellMax: number; // hottest cell temp (°C)
  panelsPerStringOverride: number | null; // null = use recommended
  dcRunM: number; // one-way DC run (m)
  dcCsa: number; // mm²
  acRunM: number; // inverter → CU (m)
  acCsa: number; // mm²
  specificYield: number; // kWh/kWp/yr (PVGIS, UK typical 850–1000)
  batteryKw: number; // co-located BESS inverter power, 0 = none
  dnoExportKw: number; // DNO-agreed export allowance
  systemCost: number; // £, 0 = skip payback
  selfUsePct: number;
  importRate: number; // £/kWh
  segRate: number; // £/kWh
}

export const defaultSolarDesign = (): SolarDesignState => ({
  panel: null,
  inverter: null,
  targetKwp: 4,
  tMin: -10,
  tCellMax: 70,
  panelsPerStringOverride: null,
  dcRunM: 15,
  dcCsa: 6,
  acRunM: 8,
  acCsa: 6,
  specificYield: 950,
  batteryKw: 0,
  dnoExportKw: 3.68,
  systemCost: 0,
  selfUsePct: 45,
  importRate: 0.27,
  segRate: 0.15,
});

export interface StringPlan {
  sizing: StringSizingResult;
  panelsPerString: number;
  strings: number; // total parallel strings
  stringsPerMpptUsed: number;
  mpptsUsed: number;
  panelCount: number; // actual (panelsPerString × strings)
  kwp: number; // actual array size
  stringVoc: number; // at STC
  stringVocCold: number;
  stringVmp: number;
  stringImp: number;
}

export interface SolarDesignOutput {
  plan: StringPlan | null;
  checks: DesignCheck[];
  valid: boolean;
  warnings: string[];
}

/** Build the string plan: recommended panels/string, enough strings to hit target. */
export function planStrings(s: SolarDesignState): StringPlan | null {
  const { panel, inverter } = s;
  if (!panel || !inverter) return null;

  const sizing = sizeStrings({
    panel: {
      voc: panel.voc,
      vmp: panel.vmp,
      isc: panel.isc,
      betaVoc: panel.tempCoeffVoc,
      betaVmp: panel.tempCoeffPmax, // Vmp tracks Pmax coefficient closely
    },
    inverter: {
      vDcMax: inverter.maxInputVoltage,
      vMpptMin: inverter.mpptVoltageMin,
      vMpptMax: inverter.mpptVoltageMax,
      iMpptMax: inverter.maxInputCurrent,
    },
    tMin: s.tMin,
    tCellMax: s.tCellMax,
  });

  // Override is only honoured inside the hard safety window (nMin–nMax). A
  // stale override surviving a kit swap must never produce an over-voltage
  // string — fall back to the recommendation instead.
  let perString = s.panelsPerStringOverride ?? sizing.recommended;
  if (
    s.panelsPerStringOverride != null &&
    (s.panelsPerStringOverride < sizing.nMin || s.panelsPerStringOverride > sizing.nMax)
  ) {
    perString = sizing.recommended;
  }
  // stringsPerMppt < 1 means the panel's Isc exceeds the MPPT input limit —
  // there is no compliant way to wire this pairing, so the plan is invalid.
  if (!perString || perString < 1 || sizing.stringsPerMppt < 1) {
    return {
      sizing,
      panelsPerString: 0,
      strings: 0,
      stringsPerMpptUsed: 0,
      mpptsUsed: 0,
      panelCount: 0,
      kwp: 0,
      stringVoc: 0,
      stringVocCold: 0,
      stringVmp: 0,
      stringImp: 0,
    };
  }

  const targetPanels = Math.max(1, Math.round((s.targetKwp * 1000) / panel.wattage));
  const maxStrings = Math.max(1, sizing.stringsPerMppt) * Math.max(1, inverter.mpptCount);
  const strings = Math.min(maxStrings, Math.max(1, Math.ceil(targetPanels / perString)));
  const panelCount = perString * strings;

  return {
    sizing,
    panelsPerString: perString,
    strings,
    stringsPerMpptUsed: Math.min(strings, Math.max(1, sizing.stringsPerMppt)),
    mpptsUsed: Math.min(
      inverter.mpptCount,
      Math.ceil(strings / Math.max(1, sizing.stringsPerMppt))
    ),
    panelCount,
    kwp: r2((panelCount * panel.wattage) / 1000),
    stringVoc: r1(perString * panel.voc),
    stringVocCold: r1(perString * sizing.vocCold),
    stringVmp: r1(perString * panel.vmp),
    stringImp: r2(panel.imp),
  };
}

export function runSolarDesign(s: SolarDesignState): SolarDesignOutput {
  const plan = planStrings(s);
  const checks: DesignCheck[] = [];
  const warnings: string[] = [];
  if (!plan || !s.panel || !s.inverter || plan.panelCount === 0) {
    return { plan, checks, valid: false, warnings: plan?.sizing.warnings ?? [] };
  }

  warnings.push(...plan.sizing.warnings);

  // The inverter's MPPT capacity caps the array — say so rather than silently
  // delivering less than the customer asked for.
  if (plan.kwp < s.targetKwp * 0.9) {
    warnings.push(
      `This inverter's string capacity limits the design to ${plan.kwp} kWp of the requested ${s.targetKwp} kWp — consider a larger or multi-MPPT inverter.`
    );
  }

  // DC:AC ratio
  checks.push({
    id: 'inverter-ratio',
    title: 'Inverter sizing',
    standard: 'DC:AC',
    result: run('inverter-ratio', { arrayKwp: plan.kwp, inverterKw: s.inverter.ratedPowerAc }),
  });

  // DC voltage drop — worst case is the shared home-run carrying every
  // parallel string on that MPPT, not a single string's Imp.
  checks.push({
    id: 'dc-vd',
    title: 'DC voltage drop',
    standard: 'BS 7671 · 712',
    result: run('dc-vd', {
      current: s.panel.imp * Math.max(1, plan.stringsPerMpptUsed),
      stringVoltage: plan.stringVmp,
      length: s.dcRunM,
      csa: s.dcCsa,
    }),
  });

  // AC voltage drop (inverter output current). The calc takes L-N voltage
  // (230 V) and derives the three-phase reference itself.
  const phases = s.inverter.phases === 'three' ? 3 : 1;
  checks.push({
    id: 'ac-vd',
    title: 'AC voltage drop',
    standard: 'MIS 3002 · 3.6.8',
    result: run('ac-vd', {
      current: s.inverter.maxOutputCurrent,
      voltage: 230,
      phases,
      length: s.acRunM,
      csa: s.acCsa,
    }),
  });

  // G98 / G99 route — set by TOTAL site generation per phase (PV + any
  // battery inverter), against L-N 230 V (the calc handles 3-phase itself).
  checks.push({
    id: 'g98-g99',
    title: 'Grid connection route',
    standard: 'EREC G98/G99',
    result: run('g98-g99', {
      inverterKw: s.inverter.ratedPowerAc + s.batteryKw,
      voltage: 230,
      phases,
    }),
  });

  // Export limit (only when there's a battery or a tight DNO allowance)
  checks.push({
    id: 'export-limit',
    title: 'Export limit',
    standard: 'EREC G100',
    result: run('export-limit', {
      inverterKw: s.inverter.ratedPowerAc,
      batteryKw: s.batteryKw,
      dnoExportKw: s.dnoExportKw,
    }),
  });

  // Yield + CO₂
  checks.push({
    id: 'yield-co2',
    title: 'Annual yield',
    standard: 'PVGIS',
    result: run('yield-co2', { kwp: plan.kwp, specificYield: s.specificYield }),
  });

  // Payback (optional — needs a cost)
  if (s.systemCost > 0) {
    checks.push({
      id: 'payback',
      title: 'Savings & payback',
      standard: 'ROI',
      // State holds £/kWh; the calc's fields are p/kWh.
      result: run('payback', {
        systemCost: s.systemCost,
        annualGen: Math.round(plan.kwp * s.specificYield),
        selfUsePct: s.selfUsePct,
        importRate: s.importRate * 100,
        segRate: s.segRate * 100,
      }),
    });
  }

  const valid = plan.sizing.valid && checks.every((c) => c.result.ok);
  return { plan, checks, valid, warnings };
}

/** Pre-fill a Solar PV certificate draft from the design. */
export function buildSolarPVDraft(s: SolarDesignState, out: SolarDesignOutput) {
  const d = getDefaultSolarPVFormData();
  if (!s.panel || !s.inverter || !out.plan) return d;
  const p = s.panel;
  const inv = s.inverter;
  const plan = out.plan;

  const array = {
    ...getDefaultPVArray(1),
    panelMake: p.make,
    panelModel: p.model,
    panelWattage: p.wattage,
    panelCount: plan.panelCount,
    mcsCertified: p.mcsCertified,
    vocRated: p.voc,
    iscRated: p.isc,
    vmpRated: p.vmp,
    impRated: p.imp,
    stringsInParallel: plan.strings,
    panelsPerString: plan.panelsPerString,
    stringVoltageVoc: plan.stringVoc,
    stringVoltageVmp: plan.stringVmp,
    stringCurrentIsc: r2(p.isc),
    stringCurrentImp: plan.stringImp,
    arrayCapacity: plan.kwp,
    dcCableSize: s.dcCsa,
    dcCableLength: s.dcRunM,
  };

  const inverter = {
    ...getDefaultInverter(),
    make: inv.make,
    model: inv.model,
    ratedPowerAc: inv.ratedPowerAc,
    ratedPowerDc: inv.ratedPowerDc,
    mcsCertified: inv.mcsCertified,
    type: inv.type,
    mpptCount: inv.mpptCount,
    mpptVoltageRange: `${inv.mpptVoltageMin}-${inv.mpptVoltageMax}V`,
    maxInputVoltage: inv.maxInputVoltage,
    maxInputCurrent: inv.maxInputCurrent,
    efficiency: inv.efficiency,
    phases: inv.phases,
    g98g99Compliant: inv.g98g99Compliant,
  };

  return {
    ...d,
    arrays: [array],
    inverters: [inverter],
    additionalNotes: designSummaryText('Solar PV', solarSummaryLines(s, out)),
  };
}

export function solarSummaryLines(s: SolarDesignState, out: SolarDesignOutput): string[] {
  if (!s.panel || !s.inverter || !out.plan) return [];
  const plan = out.plan;
  const lines = [
    `${plan.panelCount} × ${s.panel.make} ${s.panel.model} (${s.panel.wattage} Wp) = ${plan.kwp} kWp`,
    `${plan.strings} string${plan.strings > 1 ? 's' : ''} of ${plan.panelsPerString} panels — string Voc(cold) ${plan.stringVocCold} V, Vmp ${plan.stringVmp} V`,
    `Inverter: ${s.inverter.make} ${s.inverter.model} (${s.inverter.ratedPowerAc} kW AC, ${s.inverter.mpptCount} MPPT)`,
  ];
  for (const c of out.checks) lines.push(`${c.title}: ${c.result.headline}`);
  return lines;
}

// ════════════════════════════════════════════════════════════════════════════
// BATTERY STORAGE (BESS)
// ════════════════════════════════════════════════════════════════════════════

export interface BatteryDesignState {
  batteryMake: string;
  batteryModel: string;
  usableKwh: number;
  maxChargeKw: number;
  coupling: 'ac' | 'dc-hybrid';
  inverterKw: number; // battery/hybrid inverter rated AC power
  dailyUsageKwh: number;
  pvInverterKw: number; // co-located PV, 0 = none
  dnoExportKw: number;
  phases: 1 | 3;
}

export const defaultBatteryDesign = (): BatteryDesignState => ({
  batteryMake: '',
  batteryModel: '',
  usableKwh: 10,
  maxChargeKw: 5,
  coupling: 'ac',
  inverterKw: 5,
  dailyUsageKwh: 10,
  pvInverterKw: 0,
  dnoExportKw: 3.68,
  phases: 1,
});

export interface SimpleDesignOutput {
  checks: DesignCheck[];
  valid: boolean;
  warnings: string[];
}

export function runBatteryDesign(s: BatteryDesignState): SimpleDesignOutput {
  const checks: DesignCheck[] = [
    {
      id: 'battery-autonomy',
      title: 'Sizing & autonomy',
      standard: 'IET CoP',
      result: run('battery-autonomy', { usableKwh: s.usableKwh, dailyUsageKwh: s.dailyUsageKwh }),
    },
    {
      id: 'g98-g99',
      title: 'Grid connection route',
      standard: 'EREC G98/G99',
      // Total site generation capacity determines the route — battery inverter
      // plus any SEPARATE AC-coupled PV inverter (DC-coupled PV on a hybrid is
      // already inside inverterKw). L-N 230 V; the calc handles 3-phase.
      result: run('g98-g99', {
        inverterKw: s.inverterKw + s.pvInverterKw,
        voltage: 230,
        phases: s.phases,
      }),
    },
    {
      id: 'export-limit',
      title: 'Export limit',
      standard: 'EREC G100',
      result: run('export-limit', {
        inverterKw: s.pvInverterKw,
        batteryKw: s.inverterKw,
        dnoExportKw: s.dnoExportKw,
      }),
    },
  ];
  return {
    checks,
    valid: checks.every((c) => c.result.ok),
    warnings: [],
  };
}

export function buildBESSDraft(s: BatteryDesignState, out: SimpleDesignOutput) {
  const d = getDefaultBESSFormData();
  return {
    ...d,
    batteryManufacturer: s.batteryMake,
    batteryModel: s.batteryModel,
    usableCapacity: String(s.usableKwh),
    maxChargeRate: String(s.maxChargeKw),
    inverterRatedPower: String(s.inverterKw),
    inverterPhases: s.phases === 3 ? 'three' : 'single',
    couplingType: s.coupling === 'ac' ? 'AC' : 'hybrid',
    totalSiteGeneration: String(r2(s.inverterKw + s.pvInverterKw)),
    additionalNotes: designSummaryText('Battery storage', batterySummaryLines(s, out)),
  };
}

export function batterySummaryLines(s: BatteryDesignState, out: SimpleDesignOutput): string[] {
  const name = [s.batteryMake, s.batteryModel].filter(Boolean).join(' ') || 'Battery';
  const lines = [
    `${name} — ${s.usableKwh} kWh usable, ${s.inverterKw} kW ${s.coupling === 'ac' ? 'AC-coupled' : 'DC-coupled hybrid'} inverter`,
  ];
  for (const c of out.checks) lines.push(`${c.title}: ${c.result.headline}`);
  return lines;
}

// ════════════════════════════════════════════════════════════════════════════
// EV CHARGING
// ════════════════════════════════════════════════════════════════════════════

export interface EVDesignState {
  charger: EVCharger | null;
  chargerKw: number; // selected power option
  numChargers: number;
  diversityPct: number;
  spareKw: number; // spare supply capacity
  earthing: 'pme-od' | 'tt' | 'matt-e' | '';
}

export const defaultEVDesign = (): EVDesignState => ({
  charger: null,
  chargerKw: 7.4,
  numChargers: 1,
  diversityPct: 100,
  spareKw: 10,
  earthing: '',
});

export function runEVDesign(s: EVDesignState): SimpleDesignOutput {
  const checks: DesignCheck[] = [
    {
      id: 'ev-load',
      title: 'Load & diversity',
      standard: 'Doc S · BS 7671 722',
      result: run('ev-load', {
        chargerKw: s.chargerKw,
        numChargers: s.numChargers,
        diversityPct: s.diversityPct,
        spareKw: s.spareKw,
      }),
    },
  ];
  const warnings: string[] = [];
  if (s.earthing === '') {
    warnings.push(
      'Choose the earthing approach — a PME supply needs open-PEN protection (722.411.4.1) before the charge point goes outdoors.'
    );
  }
  return { checks, valid: checks.every((c) => c.result.ok) && s.earthing !== '', warnings };
}

export function buildEVDraft(s: EVDesignState, out: SimpleDesignOutput) {
  const d = getDefaultEVChargingFormData();
  // 'pme-od' and 'matt-e' both mean a PME (TN-C-S) supply protected by an
  // open-PEN device; 'tt' means a separated TT earth for the charge point.
  return {
    ...d,
    chargerMake: s.charger?.make ?? '',
    chargerModel: s.charger?.model ?? '',
    earthingArrangement: s.earthing === 'tt' ? 'TT' : s.earthing === '' ? '' : 'TN-C-S',
    openPENDeviceFitted: s.earthing === 'pme-od' || s.earthing === 'matt-e',
    additionalNotes: designSummaryText('EV charging', evSummaryLines(s, out)),
  };
}

export function evSummaryLines(s: EVDesignState, out: SimpleDesignOutput): string[] {
  const name = s.charger ? `${s.charger.make} ${s.charger.model}` : 'Charge point';
  const lines = [`${s.numChargers} × ${name} @ ${s.chargerKw} kW (diversity ${s.diversityPct}%)`];
  for (const c of out.checks) lines.push(`${c.title}: ${c.result.headline}`);
  return lines;
}

// ════════════════════════════════════════════════════════════════════════════
// HEAT PUMP
// ════════════════════════════════════════════════════════════════════════════

export interface HeatPumpDesignState {
  floorArea: number; // m²
  heatLossFactor: number; // W/m²
  dhwKw: number;
  scop: number; // seasonal COP → electrical kW = thermal / SCOP
  phases: 1 | 3;
}

export const defaultHeatPumpDesign = (): HeatPumpDesignState => ({
  floorArea: 120,
  heatLossFactor: 50,
  dhwKw: 3,
  scop: 3.2,
  phases: 1,
});

export interface HeatPumpDesignOutput extends SimpleDesignOutput {
  thermalKw: number;
  electricalKw: number;
}

export function runHeatPumpDesign(s: HeatPumpDesignState): HeatPumpDesignOutput {
  const sizing = run('heat-pump-sizing', {
    floorArea: s.floorArea,
    heatLossFactor: s.heatLossFactor,
    dhwKw: s.dhwKw,
  });

  // Recommended thermal output is the sizing calc's job — derive electrical
  // demand through the SCOP, then size the supply.
  const thermalKw = r2((s.floorArea * s.heatLossFactor) / 1000 + s.dhwKw);
  const electricalKw = r2(thermalKw / Math.max(1, s.scop));

  const supply = run('heat-pump-supply', {
    electricalKw,
    voltage: 230, // L-N — the calc derives the three-phase denominator itself
    phases: s.phases,
  });

  const checks: DesignCheck[] = [
    { id: 'heat-pump-sizing', title: 'Heat load', standard: 'BS EN 12831', result: sizing },
    {
      id: 'heat-pump-supply',
      title: 'Electrical supply',
      standard: 'MIS 3005 · BS 7671',
      result: supply,
    },
  ];

  return {
    checks,
    valid: checks.every((c) => c.result.ok),
    warnings: [],
    thermalKw,
    electricalKw,
  };
}

export function heatPumpSummaryLines(s: HeatPumpDesignState, out: HeatPumpDesignOutput): string[] {
  const lines = [
    `Design heat load ${out.thermalKw} kWth (${s.floorArea} m² @ ${s.heatLossFactor} W/m² + ${s.dhwKw} kW DHW)`,
    `Electrical demand ≈ ${out.electricalKw} kW at SCOP ${s.scop}`,
  ];
  for (const c of out.checks) lines.push(`${c.title}: ${c.result.headline}`);
  return lines;
}

// ── shared ──────────────────────────────────────────────────────────────────

function designSummaryText(tech: string, lines: string[]): string {
  return [`${tech} design summary (Elec-Mate Design Suite):`, ...lines.map((l) => `• ${l}`)].join(
    '\n'
  );
}
