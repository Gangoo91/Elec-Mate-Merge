import type { TestingInstrument } from '@/types/company';

/**
 * Insulation-resistance maxima per test voltage — ELE-1438 / ELE-1467.
 *
 * Every multifunction tester has a ceiling it cannot read past. On a Kewtech
 * KT66DL that is >209.9 MΩ at 250V and >1049 MΩ at 500V. A healthy circuit
 * reads at the ceiling, so on a 20-circuit EICR the electrician types the same
 * ">1049" twenty times. Alex's words: "a section to put your max readings in on
 * a button rather than typing it 20 times".
 *
 * The value is stored against the INSTRUMENT (see TestingInstrument) rather
 * than the company, because it is a property of the meter in the van.
 */

/** Test-voltage values as stored on a circuit — see insulationTestVoltageOptions. */
export type IrTestVoltage = '250V' | '500V' | '1000V';

/** Instrument types that actually perform an insulation-resistance test. */
const IR_CAPABLE_TYPES: ReadonlySet<TestingInstrument['instrument_type']> = new Set([
  'multifunction',
  'insulation',
]);

/** True for instruments where the IR-maximum fields are worth showing. */
export const isIrCapable = (type: TestingInstrument['instrument_type'] | undefined): boolean =>
  !!type && IR_CAPABLE_TYPES.has(type);

const FIELD_BY_VOLTAGE: Record<IrTestVoltage, keyof TestingInstrument> = {
  '250V': 'ir_max_250v',
  '500V': 'ir_max_500v',
  '1000V': 'ir_max_1000v',
};

/** Normalise a stored voltage string ('500V', '500', '500v dc') to a known key. */
export const normaliseTestVoltage = (raw: unknown): IrTestVoltage | null => {
  const digits = String(raw ?? '').match(/\d+/)?.[0];
  if (!digits) return null;
  const key = `${digits}V` as IrTestVoltage;
  return key in FIELD_BY_VOLTAGE ? key : null;
};

/**
 * The saved maximum for a test voltage, or '' when the user has not set one.
 *
 * Reads the first IR-capable instrument that has a value for this voltage —
 * most electricians record a single MFT, and picking the first that answers
 * beats forcing them to nominate a "primary" meter they never think about.
 */
export const getIrMaxForVoltage = (
  instruments: TestingInstrument[] | null | undefined,
  voltage: unknown
): string => {
  const key = normaliseTestVoltage(voltage);
  if (!key || !Array.isArray(instruments)) return '';
  const field = FIELD_BY_VOLTAGE[key];
  for (const inst of instruments) {
    if (!isIrCapable(inst?.instrument_type)) continue;
    const value = String(inst?.[field] ?? '').trim();
    if (value) return value;
  }
  return '';
};

/** True when a cell holds nothing meaningful and may be auto-filled. */
export const isBlankReading = (value: unknown): boolean => {
  const s = String(value ?? '').trim();
  return s === '' || s === '—' || s === '-';
};
