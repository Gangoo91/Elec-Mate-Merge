/**
 * PV string sizing — the core of the Renewables System Designer.
 *
 * Grounded in the IET Code of Practice for Grid-Connected Solar PV (2nd Ed) and
 * BS 7671 (DC design current = 1.25 × Isc, 712.433). Worst cases:
 *   • coldest cell  → highest Voc → over-voltage limit (panels per string MAX)
 *   • hottest cell  → lowest Vmp  → MPPT drop-out limit (panels per string MIN)
 *
 * Pure functions, no UI. Reused by the calculator + the System Designer.
 */

export interface PanelSpec {
  voc: number; // Voc at STC (V)
  vmp: number; // Vmp at STC (V)
  isc: number; // Isc at STC (A)
  betaVoc: number; // temp coeff of Voc (%/°C, negative, e.g. -0.27)
  betaVmp: number; // temp coeff of Vmp (%/°C, negative, e.g. -0.40)
}

export interface InverterSpec {
  vDcMax: number; // absolute max DC input voltage (V) — hard safety limit
  vMpptMin: number; // MPPT window minimum (V)
  vMpptMax: number; // MPPT window maximum (V)
  iMpptMax: number; // max input current per MPPT (A)
}

export interface StringSizingInputs {
  panel: PanelSpec;
  inverter: InverterSpec;
  tMin?: number; // coldest cell temp (°C), default -10
  tCellMax?: number; // hottest cell temp (°C), default +70
  iscDesignFactor?: number; // BS 7671 712 — default 1.25
}

export interface StringSizingResult {
  vocCold: number; // Voc at tMin
  vmpHot: number; // Vmp at tCellMax
  vmpCold: number; // Vmp at tMin (highest operating point)
  nMax: number; // max panels/string (safety: Voc cold ≤ vDcMax)
  nMin: number; // min panels/string (Vmp hot ≥ MPPT min)
  nMaxMppt: number; // max within MPPT window (Vmp cold ≤ MPPT max)
  recommended: number | null; // best n in the valid window, or null if none
  stringsPerMppt: number; // parallel strings ≤ iMpptMax / (factor × Isc)
  designCurrent: number; // 1.25 × Isc
  valid: boolean;
  warnings: string[];
}

const STC = 25;
const round = (n: number, dp = 1) => {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
};

/** Temperature-correct a voltage: V(T) = V_stc × [1 + (coeff/100)(T − 25)]. */
export function tempCorrect(vStc: number, coeffPctPerC: number, tempC: number): number {
  return vStc * (1 + (coeffPctPerC / 100) * (tempC - STC));
}

export function sizeStrings(input: StringSizingInputs): StringSizingResult {
  const { panel, inverter } = input;
  const tMin = input.tMin ?? -10;
  const tCellMax = input.tCellMax ?? 70;
  const factor = input.iscDesignFactor ?? 1.25;
  const warnings: string[] = [];

  const vocCold = tempCorrect(panel.voc, panel.betaVoc, tMin);
  const vmpHot = tempCorrect(panel.vmp, panel.betaVmp, tCellMax);
  const vmpCold = tempCorrect(panel.vmp, panel.betaVmp, tMin);

  // Safety: series string Voc (cold) must never exceed inverter abs max DC.
  const nMax = vocCold > 0 ? Math.floor(inverter.vDcMax / vocCold) : 0;
  // Performance: must stay above MPPT min when hot.
  const nMin = vmpHot > 0 ? Math.ceil(inverter.vMpptMin / vmpHot) : 0;
  // Performance: stay within MPPT max when cold (else inverter clips, loses yield).
  const nMaxMppt = vmpCold > 0 ? Math.floor(inverter.vMpptMax / vmpCold) : 0;

  const designCurrent = round(factor * panel.isc, 2); // for DC cable/fuse sizing
  // Parallel strings compare string Isc against the inverter MPPT input limit
  // (the 1.25× factor is for cable/fuse design, not the inverter limit).
  const stringsPerMppt = panel.isc > 0 ? Math.floor(inverter.iMpptMax / panel.isc) : 0;

  // Recommended = largest n that is safe AND tracks (within MPPT max), else
  // largest safe n that still meets MPPT min.
  let recommended: number | null = null;
  const upperTracking = Math.min(nMax, nMaxMppt);
  if (upperTracking >= nMin && nMin > 0) recommended = upperTracking;
  else if (nMax >= nMin && nMin > 0) recommended = nMax;

  if (nMin > nMax)
    warnings.push(
      'No valid string length — minimum (MPPT) exceeds maximum (over-voltage). Choose a different panel/inverter pairing.'
    );
  if (recommended != null && recommended > nMaxMppt)
    warnings.push(
      `At ${tMin}°C the string would exceed the MPPT window — the inverter will clip and lose some yield on cold days.`
    );
  if (stringsPerMppt < 1)
    warnings.push(
      'Panel Isc exceeds the inverter MPPT current limit — a single string already overloads the MPPT input.'
    );
  if (panel.betaVoc > 0 || panel.betaVmp > 0)
    warnings.push(
      'Temperature coefficients are usually negative (%/°C) — check the datasheet values.'
    );

  const valid = recommended != null && warnings.every((w) => !w.startsWith('No valid'));

  return {
    vocCold: round(vocCold),
    vmpHot: round(vmpHot),
    vmpCold: round(vmpCold),
    nMax,
    nMin,
    nMaxMppt,
    recommended,
    stringsPerMppt,
    designCurrent,
    valid,
    warnings,
  };
}
