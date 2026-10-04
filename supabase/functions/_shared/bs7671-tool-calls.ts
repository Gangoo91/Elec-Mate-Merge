/**
 * BS 7671 Calculator Tool-Calls for LLM use.
 *
 * Exposes Anthropic-compatible tool definitions that wrap the deterministic
 * calculators in bs7671-unified-calculations.ts. The LLM decides when to call
 * a tool; we execute it server-side and inject the result back as a
 * tool_result message. This guarantees numerically accurate answers while
 * keeping the LLM free to compose explanatory prose with citations.
 */

import {
  calculateVoltageDrop,
  calculateEarthFaultLoop,
  type CableType,
  type VoltageDropResult,
  type EarthFaultResult,
} from './bs7671-unified-calculations.ts';
import { selectCableSize } from './bs7671-cable-select.ts';

// ─── Anthropic tool schemas ──────────────────────────────────────────────

export const BS7671_TOOL_SCHEMAS = [
  {
    name: 'calculate_voltage_drop',
    description:
      'Calculate cable voltage drop per BS 7671 Appendix 4. Uses Vd = k·I·(R·cosφ + X·sinφ) with temperature-corrected resistance. Returns compliance against 3 % (lighting) or 5 % (power) limit.',
    input_schema: {
      type: 'object',
      properties: {
        cable_type: {
          type: 'string',
          enum: [
            'pvc-single',
            'xlpe-single',
            'pvc-twin-earth',
            'xlpe-twin-earth',
            'swa',
            'micc',
            'aluminium-xlpe',
          ],
          description: 'BS 7671 cable construction type.',
        },
        cable_size_mm2: {
          type: 'number',
          description: 'Conductor cross-sectional area in mm² (e.g. 2.5, 4, 6, 10, 16).',
        },
        length_m: {
          type: 'number',
          description: 'Cable run length in metres.',
        },
        current_a: {
          type: 'number',
          description: 'Design current Ib in amps.',
        },
        voltage_v: {
          type: 'number',
          description: 'Nominal voltage (230 single phase, 400 three phase).',
          default: 230,
        },
        power_factor: {
          type: 'number',
          description: 'Load power factor (0.0–1.0). Default 1.0 for resistive.',
          default: 1.0,
        },
        phase: {
          type: 'string',
          enum: ['single', 'three'],
          description: 'single = 230 V line-neutral, three = 400 V line-line.',
          default: 'single',
        },
        load_type: {
          type: 'string',
          enum: ['lighting', 'power'],
          description: 'lighting → 3 % limit, power → 5 % limit.',
          default: 'power',
        },
        operating_temp_c: {
          type: 'number',
          description: 'Conductor operating temperature, °C. Default 70 (PVC), use 90 for XLPE.',
          default: 70,
        },
      },
      required: ['cable_type', 'cable_size_mm2', 'length_m', 'current_a'],
    },
  },

  {
    name: 'calculate_zs',
    description:
      'Calculate earth-fault loop impedance Zs = Ze + (R1+R2) per BS 7671 Reg 411.3.2. Returns Zs actual, max Zs (Table 41.3), compliance, and prospective fault current.',
    input_schema: {
      type: 'object',
      properties: {
        external_ze_ohm: {
          type: 'number',
          description: 'External earth fault loop impedance Ze (Ω).',
        },
        cable_type: {
          type: 'string',
          enum: [
            'pvc-single',
            'xlpe-single',
            'pvc-twin-earth',
            'xlpe-twin-earth',
            'swa',
            'micc',
            'aluminium-xlpe',
          ],
        },
        line_size_mm2: { type: 'number' },
        cpc_size_mm2: { type: 'number' },
        length_m: { type: 'number' },
        breaker_type: {
          type: 'string',
          enum: ['B', 'C', 'D'],
          description: 'MCB curve type per BS EN 60898.',
        },
        breaker_rating_a: { type: 'number' },
        disconnection_time_s: {
          type: 'number',
          enum: [0.4, 5],
          default: 0.4,
          description:
            '0.4 s for final circuits up to 63 A in TN systems. 5 s only for Type D (motors / fixed equipment).',
        },
        operating_temp_c: { type: 'number', default: 70 },
      },
      required: [
        'external_ze_ohm',
        'cable_type',
        'line_size_mm2',
        'cpc_size_mm2',
        'length_m',
        'breaker_type',
        'breaker_rating_a',
      ],
    },
  },

  {
    name: 'check_disconnection_time',
    description:
      'Given an actual Zs and supply voltage, determine whether disconnection will occur within the BS 7671 required time (0.4 s for final circuits up to 63 A, 5 s for distribution / motors).',
    input_schema: {
      type: 'object',
      properties: {
        zs_actual_ohm: { type: 'number' },
        voltage_v: { type: 'number', default: 230 },
        breaker_type: { type: 'string', enum: ['B', 'C', 'D'] },
        breaker_rating_a: { type: 'number' },
        required_time_s: { type: 'number', enum: [0.4, 5], default: 0.4 },
      },
      required: ['zs_actual_ohm', 'breaker_type', 'breaker_rating_a'],
    },
  },

  /*
   * Replaces calculate_cable_capacity in the schema list (2 Oct 2026). That tool
   * asked the MODEL for the tabulated It, which it recalled wrongly (6 mm² T&E
   * clipped direct quoted as 44, 46 and 57 A; Table 4D5 says 47 A). Its executor
   * case is kept below so an in-flight call cannot error.
   */
  {
    name: 'select_cable_size',
    description:
      'Size a cable from the verified BS 7671 Appendix 4 tables (the same data as the Elec-Mate calculators). Picks the protective device, applies Ca/Cg/Ci, checks Ib ≤ In ≤ Iz (Reg 433.1.1) and voltage drop for every size, and returns the smallest that passes plus the full working. Use for ANY cable sizing or current-carrying capacity question — never quote a tabulated capacity from memory. Many electric showers are rated at 240 V: if the user gives a shower rating, pass voltage_v 240 unless they say otherwise, and say which you used. For single-phase kW loads the result also carries at_other_rating_voltage (230 V vs 240 V) — quote it for the other case, never estimate it.',
    input_schema: {
      type: 'object',
      properties: {
        design_current_a: { type: 'number', description: 'Ib in amps, if known.' },
        load_kw: { type: 'number', description: 'Load in kW, used when Ib is not given.' },
        voltage_v: { type: 'number', description: 'Voltage for Ib from kW. Default 230 single-phase, 400 three-phase.' },
        power_factor: { type: 'number', default: 1 },
        phase: { type: 'string', enum: ['single', 'three'], default: 'single' },
        cable_type: {
          type: 'string',
          enum: [
            'twin-earth', 'pvc-single', 'pvc-multicore', 'xlpe-single', 'xlpe-multicore',
            'lsf-single', 'lsf-multicore', 'swa-pvc', 'swa-xlpe', 'mineral-light', 'mineral-heavy',
          ],
          default: 'twin-earth',
          description: 'twin-earth = 6242Y/6242B flat T&E (Table 4D5). swa-pvc = 70 °C SWA (4D4A), swa-xlpe = 90 °C SWA (4E4A).',
        },
        installation_method: {
          type: 'string',
          enum: [
            'method-a', 'method-b', 'method-c', 'method-d1', 'method-d2', 'method-e', 'method-f',
            'method-g-h', 'method-g-v', 'method-100', 'method-101', 'method-102', 'method-103',
          ],
          default: 'method-c',
          description:
            'A conduit in insulated wall; B conduit/trunking on wall; C clipped direct; D1 duct in ground; D2 buried direct; E free air/perforated tray (multicore); F/G single-core in air. T&E only: 100 above plasterboard ceiling, insulation ≤100 mm; 101 same, >100 mm; 102 insulated stud wall touching inner surface; 103 insulated stud wall not touching.',
        },
        length_m: { type: 'number', description: 'Route length for voltage drop.' },
        ambient_temp_c: { type: 'number', default: 30 },
        grouping_count: { type: 'number', default: 1, description: 'Circuits/cables grouped together (Table 4C1).' },
        grouping_arrangement: {
          type: 'string',
          enum: ['bunched', 'single-layer-wall', 'single-layer-tray', 'single-layer-ladder'],
          default: 'bunched',
        },
        insulation_surrounded_mm: {
          type: 'number',
          description:
            'Length (mm) the cable is TOTALLY surrounded by thermal insulation, for Ci. For T&E in ceilings/stud walls use methods 100–103 instead.',
        },
        device_type: { type: 'string', enum: ['mcb', 'rcbo', 'bs88'], default: 'mcb' },
        device_rating_a: { type: 'number', description: 'In, if the user has chosen it. Otherwise the next standard rating ≥ Ib is used.' },
        vd_limit_percent: { type: 'number', default: 5, description: '3 for lighting, 5 for other uses (Appendix 4 §6.4, Table 4Ab). Reduce it if a submain already uses part of the allowance.' },
      },
      required: [],
    },
  },
] as const;

// ─── Server-side executor ────────────────────────────────────────────────

export type ToolCallName =
  | 'calculate_voltage_drop'
  | 'calculate_zs'
  | 'check_disconnection_time'
  | 'calculate_cable_capacity'
  | 'select_cable_size';

export interface ToolCallResult {
  name: ToolCallName;
  input: Record<string, unknown>;
  output: unknown;
  error?: string;
}

export function executeBS7671ToolCall(
  name: string,
  input: Record<string, any>
): ToolCallResult {
  try {
    switch (name) {
      case 'calculate_voltage_drop':
        return {
          name,
          input,
          output: runVoltageDrop(input),
        };
      case 'calculate_zs':
        return {
          name,
          input,
          output: runZs(input),
        };
      case 'check_disconnection_time':
        return {
          name,
          input,
          output: runDisconnection(input),
        };
      case 'select_cable_size':
        return { name, input, output: selectCableSize(input) };
      case 'calculate_cable_capacity':
        return {
          name,
          input,
          output: runCableCapacity(input),
        };
      default:
        return { name: name as ToolCallName, input, output: null, error: `Unknown tool: ${name}` };
    }
  } catch (err) {
    return {
      name: name as ToolCallName,
      input,
      output: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// ─── Individual wrappers ─────────────────────────────────────────────────

function runVoltageDrop(input: any): VoltageDropResult | { error: string } {
  const result = calculateVoltageDrop({
    cableType: input.cable_type as CableType,
    cableSize: Number(input.cable_size_mm2),
    length: Number(input.length_m),
    current: Number(input.current_a),
    voltage: Number(input.voltage_v ?? 230),
    powerFactor: Number(input.power_factor ?? 1.0),
    phaseConfig: (input.phase ?? 'single') === 'three' ? 'three' : 'single',
    temperature: Number(input.operating_temp_c ?? 70),
    loadType: input.load_type ?? 'power',
  });
  if (!result) {
    return {
      error:
        'Invalid cable type / size combination. Check the cable type matches one of the supported BS 7671 constructions and the size is a standard BS 7671 CSA.',
    };
  }
  return result;
}

function runZs(input: any): EarthFaultResult | { error: string } {
  const disc = Number(input.disconnection_time_s ?? 0.4);
  if (disc !== 0.4 && disc !== 5) {
    return { error: 'disconnection_time_s must be 0.4 or 5.' };
  }
  const result = calculateEarthFaultLoop(
    {
      externalZe: Number(input.external_ze_ohm),
      cableType: input.cable_type as CableType,
      cableSize: Number(input.line_size_mm2),
      cpcSize: Number(input.cpc_size_mm2),
      length: Number(input.length_m),
      temperature: Number(input.operating_temp_c ?? 70),
      protectiveDevice: {
        type: input.breaker_type as 'B' | 'C' | 'D',
        rating: Number(input.breaker_rating_a),
      },
    },
    disc as 0.4 | 5
  );
  if (!result) {
    return {
      error:
        'Calculation failed — check cable/CPC size, breaker type + rating, and disconnection time (5 s only valid for Type D MCBs).',
    };
  }
  return result;
}

/**
 * Lightweight disconnection check: given Zs actual, find fault current
 * If = U0/Zs and compare against the instantaneous-trip current band per
 * BS EN 60898:
 *   Type B:  3–5 × In
 *   Type C:  5–10 × In
 *   Type D:  10–20 × In
 *
 * For 0.4 s / 5 s compliance we use the worst-case upper bound: the breaker
 * must reach instantaneous trip within that time.
 */
function runDisconnection(input: any): Record<string, unknown> {
  const zs = Number(input.zs_actual_ohm);
  const voltage = Number(input.voltage_v ?? 230);
  const breakerType = input.breaker_type as 'B' | 'C' | 'D';
  const rating = Number(input.breaker_rating_a);
  const required = Number(input.required_time_s ?? 0.4);

  if (!zs || zs <= 0) return { error: 'zs_actual_ohm must be > 0.' };

  const faultCurrent = voltage / zs;
  const multipliers: Record<'B' | 'C' | 'D', number> = { B: 5, C: 10, D: 20 };
  const minTripCurrent = rating * multipliers[breakerType];
  const compliant = faultCurrent >= minTripCurrent;

  return {
    fault_current_a: Math.round(faultCurrent * 10) / 10,
    min_instantaneous_trip_current_a: minTripCurrent,
    required_time_s: required,
    compliant,
    reasoning: compliant
      ? `Fault current (${faultCurrent.toFixed(1)} A) ≥ instantaneous trip threshold (${minTripCurrent} A) → disconnection within ${required} s per BS 7671 Reg 411.3.2.`
      : `Fault current (${faultCurrent.toFixed(1)} A) is below the ${multipliers[breakerType]}× In instantaneous trip current (${minTripCurrent} A). Disconnection in ${required} s cannot be guaranteed — reduce Zs, use a smaller device, or provide supplementary RCD protection.`,
  };
}

function runCableCapacity(input: any): Record<string, unknown> {
  const It = Number(input.tabulated_it_a);
  if (!It || It <= 0) return { error: 'tabulated_it_a must be > 0.' };

  const ambient = Number(input.ambient_temp_c ?? 30);
  const grouping = Number(input.grouping_count ?? 1);
  const inInsulation = Boolean(input.in_thermal_insulation ?? false);
  const semiEnclosedFuse = Boolean(input.semi_enclosed_fuse ?? false);

  // Ca — PVC at 30 °C = 1.0. Simplified linear table from BS 7671 Table 4B1.
  const CA_PVC_70C: Record<number, number> = {
    25: 1.03,
    30: 1.0,
    35: 0.94,
    40: 0.87,
    45: 0.79,
    50: 0.71,
    55: 0.61,
    60: 0.5,
  };
  const nearestAmbient = Object.keys(CA_PVC_70C)
    .map(Number)
    .reduce((best, k) => (Math.abs(k - ambient) < Math.abs(best - ambient) ? k : best), 30);
  const Ca = CA_PVC_70C[nearestAmbient] ?? 1.0;

  // Cg — Table 4C1 grouping factors (clipped direct / enclosed, touching).
  const CG_TABLE: Record<number, number> = {
    1: 1.0,
    2: 0.8,
    3: 0.7,
    4: 0.65,
    5: 0.6,
    6: 0.57,
    7: 0.54,
    8: 0.52,
    9: 0.5,
  };
  const Cg = CG_TABLE[Math.min(grouping, 9)] ?? 0.5;

  // Ci — Reg 523.7, enclosed in thermal insulation longer than 0.5 m.
  const Ci = inInsulation ? 0.5 : 1.0;

  // Cc — BS 3036 rewireable fuse correction.
  const Cc = semiEnclosedFuse ? 0.725 : 1.0;

  const Iz = It * Ca * Cg * Ci * Cc;

  return {
    tabulated_it_a: It,
    Ca,
    Cg,
    Ci,
    Cc,
    effective_capacity_iz_a: Math.round(Iz * 10) / 10,
    equation: `Iz = It × Ca × Cg × Ci × Cc = ${It} × ${Ca} × ${Cg} × ${Ci} × ${Cc} = ${Iz.toFixed(1)} A`,
    reference: 'BS 7671:2018+A4:2026 Appendix 4 — correction factors',
  };
}

// ─── OpenAI-compatible schemas (for future vision fallback on gpt-4o) ───

export function toOpenAIToolSchemas() {
  return BS7671_TOOL_SCHEMAS.map((t) => ({
    type: 'function' as const,
    function: {
      name: t.name,
      description: t.description,
      parameters: t.input_schema,
    },
  }));
}
