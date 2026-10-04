/**
 * Copper conductor resistance at 20 °C, mΩ per metre — BS 7671 / On-Site
 * Guide Table I1, keyed by cross-sectional area in mm² written with one
 * decimal place ('2.5', '4.0').
 *
 * Moved here from eic-transformer.ts so the EIC transformer and the AM2
 * generated questions read one copy rather than two that could drift.
 */
export const CONDUCTOR_RESISTANCE: Record<string, number> = {
  '1.0': 18.1,
  '1.5': 12.1,
  '2.5': 7.41,
  '4.0': 4.61,
  '6.0': 3.08,
  '10.0': 1.83,
  '16.0': 1.15,
  '25.0': 0.727,
  '35.0': 0.524,
  '50.0': 0.387,
  '70.0': 0.268,
  '95.0': 0.193,
  '120.0': 0.153,
  '150.0': 0.124,
  '185.0': 0.0991,
  '240.0': 0.0754,
};

/** mΩ/m for a size given as a number (2.5, 4, 10). */
export const conductorResistance = (sizeMm2: number): number => {
  const r = CONDUCTOR_RESISTANCE[sizeMm2.toFixed(1)];
  if (r === undefined) throw new Error(`No Table I1 value for ${sizeMm2} mm²`);
  return r;
};
