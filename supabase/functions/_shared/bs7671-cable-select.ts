/**
 * select_cable_size — deterministic cable selection for Elec-AI.
 *
 * Elec-AI used to size cables from memory: on 2 Oct 2026 it quoted 6 mm² T&E
 * clipped direct as 44, 46 and 57 A on three runs of the same question (Table
 * 4D5 says 47 A) and ticked "Iz ≥ 40 A ≥ 41.3 A" as a pass. Every number here
 * comes from the verified Appendix 4 data the in-app calculators use, copied
 * into ./bs7671-appendix4/ by scripts/sync-edge-bs7671-data.mjs.
 *
 * Covers: Ib, In, Ca (Table 4B1), Cg (Table 4C1), Ci (App 4 §2.6), It from
 * Appendix 4, Ib ≤ In ≤ Iz (Reg 433.1.1) and voltage drop (App 4 §6, Reg
 * 525). Does NOT cover Zs / disconnection time or the adiabatic CPC check —
 * those stay with calculate_zs / check_disconnection_time.
 */

import {
  capacityTables,
  CableTypeKey,
  PhaseKey,
  METHOD_LABELS,
  getAvailableSizes,
  lookupCapacity,
} from './bs7671-appendix4/appendix4CurrentCapacity.ts';
import { getTemperatureFactor, getGroupingFactor } from './bs7671-appendix4/temperatureFactors.ts';
import { getThermalInsulationFactor } from './bs7671-appendix4/thermalInsulationFactors.ts';
import { lookupVoltageDropMvAm } from './bs7671-appendix4/voltageDropTables.ts';
import type { CableType } from './bs7671-appendix4/cableCapacities.ts';

/**
 * Product-standard preferred ratings — the same lists as
 * src/lib/calculators/bs7671-data/protectiveDevices.ts `standardDeviceRatings`
 * (not synced: that file pulls in app-only modules). No 45 A in the MCB/RCBO
 * series is deliberate.
 */
export const DEVICE_RATINGS: Record<'mcb' | 'rcbo' | 'bs88', number[]> = {
  mcb: [1, 2, 3, 4, 6, 8, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125],
  rcbo: [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125],
  bs88: [
    2, 4, 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630, 800,
    1000, 1250,
  ],
};

/**
 * Appendix 4 voltage-drop table for each capacity table. null = no verified
 * mV/A/m table held, so the tool reports VD as not checked rather than guess.
 */
const VD_TYPE: Record<CableTypeKey, CableType | null> = {
  'twin-earth': 'pvc-twin-earth', // Table 4D5
  'pvc-single': 'pvc-single', // Table 4D1B
  'xlpe-single': 'xlpe-single', // Table 4E1B
  'lsf-single': 'xlpe-single', // rated from 4E1 per Table 4A3
  // Not a CableType member on purpose: it reaches lookupVoltageDropMvAm's
  // default branch, which is Table 4D2B (70 °C multicore non-armoured).
  'pvc-multicore': 'pvc-multicore' as CableType,
  'swa-pvc': 'swa', // Table 4D4B
  'xlpe-multicore': null, // 4E2B not transcribed
  'lsf-multicore': null,
  'swa-xlpe': null, // 4E4B not transcribed
  'mineral-light': null, // 4G1B not transcribed
  'mineral-heavy': null,
};

export interface CableSelectInput {
  design_current_a?: number;
  load_kw?: number;
  voltage_v?: number;
  power_factor?: number;
  phase?: 'single' | 'three';
  cable_type?: CableTypeKey;
  installation_method?: string;
  length_m?: number;
  ambient_temp_c?: number;
  grouping_count?: number;
  grouping_arrangement?: 'bunched' | 'single-layer-wall' | 'single-layer-tray' | 'single-layer-ladder';
  insulation_surrounded_mm?: number;
  device_type?: 'mcb' | 'rcbo' | 'bs88';
  device_rating_a?: number;
  vd_limit_percent?: number;
}

const round = (n: number, dp = 2) => Math.round(n * 10 ** dp) / 10 ** dp;

/** Reference-method letter for the voltage-drop A/B vs C/F column split. */
function vdMethodLetter(method: string): string {
  if (method === 'method-a') return 'A';
  if (method === 'method-b') return 'B';
  return 'C';
}

/**
 * Single-phase loads given in kW: also run the other common rating voltage.
 * Showers and heaters are often rated at 240 V on a 230 V supply, and the
 * choice moves both the device and the cable (9.5 kW: 39.6 A → 40 A / 6 mm²
 * at 240 V, 41.3 A → 50 A / 10 mm² at 230 V). Without this the model invented
 * the 230 V case — "45 A device" — on 2 Oct 2026.
 */
export function selectCableSize(input: CableSelectInput) {
  const main = selectOnce(input);
  const v = input.voltage_v ?? 230;
  if (input.phase !== 'three' && input.design_current_a === undefined && input.load_kw && (v === 230 || v === 240)) {
    try {
      const alt = selectOnce({ ...input, voltage_v: v === 230 ? 240 : 230 });
      return {
        ...main,
        at_other_rating_voltage: {
          voltage_v: v === 230 ? 240 : 230,
          design_current_ib_a: alt.design_current_ib_a,
          device_rating_in_a: alt.device.rating_in_a,
          selected_size_mm2: alt.selected?.size_mm2 ?? null,
        },
      };
    } catch {
      /* the main result stands on its own */
    }
  }
  return main;
}

function selectOnce(input: CableSelectInput) {
  const phase: PhaseKey = input.phase === 'three' ? 'threePhase' : 'singlePhase';
  const threePhase = phase === 'threePhase';
  const cableType: CableTypeKey = input.cable_type ?? 'twin-earth';
  const table = capacityTables[cableType];
  if (!table) throw new Error(`Unknown cable_type "${cableType}"`);

  const method = input.installation_method ?? 'method-c';
  if (!table.methods[method]?.[phase]) {
    const available = Object.keys(table.methods).filter((m) => table.methods[m][phase]);
    throw new Error(
      `${table.sourceTable} has no ${threePhase ? 'three-phase' : 'single-phase'} column for ${method}. Available: ${available.join(', ')}`
    );
  }

  const notes: string[] = [];

  // Design current
  const voltage = input.voltage_v ?? (threePhase ? 400 : 230);
  const pf = input.power_factor ?? 1;
  let ib: number;
  if (typeof input.design_current_a === 'number' && input.design_current_a > 0) {
    ib = input.design_current_a;
  } else if (typeof input.load_kw === 'number' && input.load_kw > 0) {
    ib = threePhase
      ? (input.load_kw * 1000) / (Math.sqrt(3) * voltage * pf)
      : (input.load_kw * 1000) / (voltage * pf);
  } else {
    throw new Error('Give design_current_a or load_kw');
  }

  // Protective device
  const deviceType = input.device_type ?? 'mcb';
  const ratings = DEVICE_RATINGS[deviceType];
  let inA: number;
  let deviceChosen: 'given' | 'next standard rating';
  if (typeof input.device_rating_a === 'number' && input.device_rating_a > 0) {
    inA = input.device_rating_a;
    deviceChosen = 'given';
  } else {
    const next = ratings.find((r) => r >= ib);
    if (next === undefined) throw new Error(`Ib ${round(ib, 1)} A exceeds the largest ${deviceType} rating`);
    inA = next;
    deviceChosen = 'next standard rating';
  }
  const ibOk = ib <= inA;

  // Rating factors
  const ca = getTemperatureFactor(input.ambient_temp_c ?? 30, table.insulation);
  const cg = getGroupingFactor(input.grouping_count ?? 1, input.grouping_arrangement ?? 'bunched');
  const surrounded = input.insulation_surrounded_mm ?? 0;
  const ci = surrounded > 0 ? getThermalInsulationFactor(surrounded) : 1;
  if (surrounded > 0) {
    notes.push(
      'Ci (App 4 §2.6) is for a cable TOTALLY surrounded by insulation and applies to conductors up to 10 mm². For T&E in an insulated ceiling or stud wall, Installation Methods 100–103 (Table 4D5) are the correct route, not a factor.'
    );
  }
  const factor = ca * cg * ci;

  // Voltage drop
  const vdType = VD_TYPE[cableType];
  const nominal = threePhase ? 400 : 230;
  const vdLimit = input.vd_limit_percent ?? 5;
  const length = input.length_m;
  if (vdType === null) notes.push(`No verified mV/A/m table held for ${table.label}; voltage drop not checked.`);
  if (length === undefined) notes.push('No length given; voltage drop not checked.');

  if (vdType && length !== undefined) {
    notes.push(
      `Voltage drop shown is for this circuit only. Table 4Ab (App 4 §6.4) limits apply from the origin of the installation, so any submain drop counts against the same ${vdLimit}%.`
    );
  }

  const rows = getAvailableSizes(cableType, method, phase).map((size) => {
    const it = lookupCapacity(cableType, size, method, phase)!;
    const iz = it * factor;
    let vdV: number | null = null;
    let vdPct: number | null = null;
    if (vdType && length !== undefined) {
      const mv = lookupVoltageDropMvAm(vdType, parseFloat(size), threePhase, vdMethodLetter(method));
      if (mv !== null) {
        vdV = (mv * ib * length) / 1000;
        vdPct = (vdV / nominal) * 100;
      }
    }
    const capacityOk = iz >= inA;
    const vdOk = vdPct === null ? null : vdPct <= vdLimit;
    return {
      size_mm2: parseFloat(size),
      tabulated_it_a: it,
      iz_a: round(iz, 1),
      in_le_iz: capacityOk,
      vd_v: vdV === null ? null : round(vdV, 2),
      vd_percent: vdPct === null ? null : round(vdPct, 2),
      vd_ok: vdOk,
      passes: ibOk && capacityOk && vdOk !== false,
    };
  });

  const selected = rows.find((r) => r.passes) ?? null;

  if (!ibOk) notes.push(`In ${inA} A is BELOW Ib ${round(ib, 1)} A — fails Reg 433.1.1 whatever the cable.`);
  if (!selected && ibOk) notes.push('No size in this table passes for this method — change method, cable type or reduce the load/length.');
  if (table.insulation === '90C') {
    notes.push(
      '90 °C ratings: where a conductor operates above 70 °C, the equipment connected to it must be suitable for the resulting temperature at the connection (Table 52.2, note). Most accessories and devices are rated for 70 °C.'
    );
  }

  return {
    design_current_ib_a: round(ib, 1),
    ib_basis:
      typeof input.design_current_a === 'number'
        ? 'given'
        : `${input.load_kw} kW at ${voltage} V${threePhase ? ' three-phase' : ''}, pf ${pf}`,
    device: { type: deviceType, rating_in_a: inA, chosen: deviceChosen, ib_le_in: ibOk },
    factors: { ca: round(ca, 3), cg: round(cg, 3), ci: round(ci, 3), combined: round(factor, 3) },
    source_table: table.sourceTable,
    installation_method: METHOD_LABELS[method] ?? method,
    vd_limit_percent: vdLimit,
    selected: selected
      ? {
          size_mm2: selected.size_mm2,
          check: `Ib ${round(ib, 1)} A ≤ In ${inA} A ≤ Iz ${selected.iz_a} A`,
          vd: selected.vd_percent === null ? 'not checked' : `${selected.vd_v} V (${selected.vd_percent}%) against ${vdLimit}%`,
        }
      : null,
    sizes_checked: rows,
    notes,
  };
}
