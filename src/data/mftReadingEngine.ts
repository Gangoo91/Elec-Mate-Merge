/**
 * MFT Reading Engine
 *
 * Generates realistic test instrument readings with natural variation.
 * Each reading is based on the circuit's nominal values with Gaussian-
 * like randomisation to simulate a real MFT on a real rig.
 */

import type { AM2RigCircuit, DialPosition, TestReading } from '@/types/am2-testing-simulator';
import { getMcbZsLimit, type MCBCurve } from '@/data/zsLimits';

// ── Random Helpers ──────────────────────────────────────────

/** Box-Muller Gaussian approximation centred on `mean` with `stdDev` */
function gaussianRandom(mean: number, stdDev: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(Math.max(u1, 0.0001))) * Math.cos(2 * Math.PI * u2);
  return mean + z * stdDev;
}

/** Clamp value to [min, max] */
function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/** Round to n decimal places */
function roundTo(val: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

// ── Format Helpers ──────────────────────────────────────────

function formatContinuity(val: number): string {
  return roundTo(val, 2).toFixed(2);
}

function formatIR(val: number): string {
  if (val >= 200) return '>200';
  if (val >= 100) return roundTo(val, 0).toFixed(0);
  return roundTo(val, 1).toFixed(1);
}

function formatZs(val: number): string {
  return roundTo(val, 2).toFixed(2);
}

function formatRCD(val: number): string {
  return Math.round(val).toString();
}

function formatPFC(val: number): string {
  return roundTo(val, 2).toFixed(2);
}

// ── EIC Column Mapping ──────────────────────────────────────

function getEICColumns(dialPosition: DialPosition, subTest?: string): number[] {
  switch (dialPosition) {
    case 'CONTINUITY':
      if (subTest === 'r1') return [18];
      if (subTest === 'rn') return [19];
      if (subTest === 'r2') return [20];
      if (subTest === 'r1r2') return [21];
      if (subTest === 'polarity') return [26];
      return [21, 22]; // R₁+R₂ and R₂
    case 'IR_250V':
    case 'IR_500V':
      if (subTest === 'L-L') return [23, 24];
      if (subTest === 'L-E') return [23, 25];
      return [23, 24, 25];
    case 'LOOP_ZS':
      return [27];
    case 'RCD_30':
    case 'RCD_100':
    case 'RCD_300':
      if (subTest === 'test_button') return [29];
      return [28];
    case 'PFC':
      return []; // Header Ipf field
    default:
      return [];
  }
}

// ── Main Reading Generator ──────────────────────────────────

export interface GenerateReadingOptions {
  circuit: AM2RigCircuit;
  testPointId: string;
  dialPosition: DialPosition;
  subTest?: string;
}

export function generateReading(opts: GenerateReadingOptions): TestReading {
  const { circuit, testPointId, dialPosition, subTest } = opts;
  const nom = circuit.nominalValues;

  let value = 0;
  let displayValue = '---';
  let unit = '';
  let compliant = true;

  switch (dialPosition) {
    case 'CONTINUITY': {
      unit = 'Ω';
      if (subTest === 'r1' && nom.ringR1 != null) {
        value = gaussianRandom(nom.ringR1, nom.ringR1 * 0.05);
        value = clamp(value, 0.01, nom.ringR1 * 2);
        value = roundTo(value, 2);
        displayValue = formatContinuity(value);
      } else if (subTest === 'rn' && nom.ringRn != null) {
        // rₙ should be within 5% of r₁
        value = gaussianRandom(nom.ringRn, nom.ringRn * 0.04);
        value = clamp(value, 0.01, nom.ringRn * 2);
        value = roundTo(value, 2);
        displayValue = formatContinuity(value);
      } else if (subTest === 'r2' && nom.ringR2 != null) {
        value = gaussianRandom(nom.ringR2, nom.ringR2 * 0.05);
        value = clamp(value, 0.01, nom.ringR2 * 2);
        value = roundTo(value, 2);
        displayValue = formatContinuity(value);
      } else if (subTest === 'polarity') {
        // Polarity is pass/fail — 0.01-0.05Ω = connected, OL = wrong
        value = gaussianRandom(0.03, 0.01);
        value = clamp(value, 0.01, 0.1);
        value = roundTo(value, 2);
        displayValue = formatContinuity(value);
        compliant = true; // Always pass in simulator
      } else {
        // R₁+R₂
        value = gaussianRandom(nom.r1r2, nom.r1r2 * 0.07);
        value = clamp(value, 0.01, nom.r1r2 * 3);
        value = roundTo(value, 2);
        displayValue = formatContinuity(value);
      }
      // Continuity is always compliant if value > 0 and < reasonable
      compliant = value > 0 && value < 10;
      break;
    }

    case 'IR_250V':
    case 'IR_500V': {
      unit = 'MΩ';
      // IR values are typically very high on a good installation
      const irBase = nom.irBase || 250;
      value = gaussianRandom(irBase, irBase * 0.1);
      value = clamp(value, 0.5, 999);
      value = roundTo(value, 1);
      displayValue = formatIR(value);
      // BS 7671 Table 61: minimum 1.0MΩ for circuits ≤500V
      compliant = value >= 1.0;
      break;
    }

    case 'LOOP_ZS': {
      unit = 'Ω';
      value = gaussianRandom(nom.zs, nom.zs * 0.08);
      value = clamp(value, nom.ze, circuit.maxZs * 1.5);
      value = roundTo(value, 2);
      displayValue = formatZs(value);
      // Check against BS 7671 tables
      const curve = `type${circuit.mcbType}` as MCBCurve;
      const zsLimit = getMcbZsLimit(curve, circuit.mcbRating);
      compliant = zsLimit ? value <= zsLimit.maxZs : value <= circuit.maxZs;
      break;
    }

    case 'RCD_30':
    case 'RCD_100':
    case 'RCD_300': {
      unit = 'ms';
      if (subTest === 'test_button') {
        // Test button operation — always pass
        value = 0;
        displayValue = 'PASS';
        compliant = true;
      } else {
        const baseTripTime = nom.rcdTripTime || 22;
        value = gaussianRandom(baseTripTime, 4);
        value = clamp(value, 8, 295);
        value = Math.round(value);
        displayValue = formatRCD(value);
        // BS 7671: must trip within 300ms at 1×IΔn
        compliant = value <= 300;
      }
      break;
    }

    case 'PFC': {
      unit = 'kA';
      value = gaussianRandom(nom.pfc, nom.pfc * 0.05);
      value = clamp(value, 0.5, 20);
      value = roundTo(value, 2);
      displayValue = formatPFC(value);
      // PFC must not exceed breaking capacity of protective device
      compliant = value <= circuit.breakingCapacity;
      break;
    }

    default:
      break;
  }

  return {
    id: `${circuit.id}-${testPointId}-${dialPosition}-${subTest || 'main'}-${Date.now()}`,
    circuitId: circuit.id,
    testPointId,
    dialPosition,
    subTest,
    value,
    displayValue,
    unit,
    compliant,
    timestamp: Date.now(),
    eicColumns: getEICColumns(dialPosition, subTest),
  };
}

/**
 * Get the expected test voltage string for IR tests
 */
export function getIRTestVoltage(dialPosition: DialPosition): string {
  if (dialPosition === 'IR_250V') return '250';
  if (dialPosition === 'IR_500V') return '500';
  return '';
}
