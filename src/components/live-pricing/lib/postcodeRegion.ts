/**
 * Postcode area → UK region, matching public.live_pricing_region_from_postcode
 * in supabase/migrations/20260801130000_live_pricing_real_benchmarks.sql.
 * Border areas are approximations at postcode-area level.
 */
const AREA_TO_REGION: Record<string, string> = {
  // London (incl. Greater London postcode areas)
  E: 'London', EC: 'London', N: 'London', NW: 'London', SE: 'London', SW: 'London',
  W: 'London', WC: 'London', BR: 'London', CR: 'London', DA: 'London', EN: 'London',
  HA: 'London', IG: 'London', KT: 'London', RM: 'London', SM: 'London', TW: 'London',
  UB: 'London',
  // South East
  BN: 'South East', CT: 'South East', GU: 'South East', HP: 'South East', ME: 'South East',
  MK: 'South East', OX: 'South East', PO: 'South East', RG: 'South East', RH: 'South East',
  SL: 'South East', SO: 'South East', TN: 'South East',
  // South West
  BA: 'South West', BH: 'South West', BS: 'South West', DT: 'South West', EX: 'South West',
  GL: 'South West', PL: 'South West', SN: 'South West', SP: 'South West', TA: 'South West',
  TQ: 'South West', TR: 'South West',
  // East of England
  AL: 'East of England', CB: 'East of England', CM: 'East of England', CO: 'East of England',
  IP: 'East of England', LU: 'East of England', NR: 'East of England', PE: 'East of England',
  SG: 'East of England', SS: 'East of England', WD: 'East of England',
  // East Midlands
  DE: 'East Midlands', LE: 'East Midlands', LN: 'East Midlands', NG: 'East Midlands',
  NN: 'East Midlands',
  // West Midlands
  B: 'West Midlands', CV: 'West Midlands', DY: 'West Midlands', HR: 'West Midlands',
  ST: 'West Midlands', SY: 'West Midlands', TF: 'West Midlands', WR: 'West Midlands',
  WS: 'West Midlands', WV: 'West Midlands',
  // North West
  BB: 'North West', BL: 'North West', CA: 'North West', CH: 'North West', CW: 'North West',
  FY: 'North West', L: 'North West', LA: 'North West', M: 'North West', OL: 'North West',
  PR: 'North West', SK: 'North West', WA: 'North West', WN: 'North West',
  // Yorkshire & Humber
  BD: 'Yorkshire & Humber', DN: 'Yorkshire & Humber', HD: 'Yorkshire & Humber',
  HG: 'Yorkshire & Humber', HU: 'Yorkshire & Humber', HX: 'Yorkshire & Humber',
  LS: 'Yorkshire & Humber', S: 'Yorkshire & Humber', WF: 'Yorkshire & Humber',
  YO: 'Yorkshire & Humber',
  // North East
  DH: 'North East', DL: 'North East', NE: 'North East', SR: 'North East', TS: 'North East',
  // Scotland
  AB: 'Scotland', DD: 'Scotland', DG: 'Scotland', EH: 'Scotland', FK: 'Scotland',
  G: 'Scotland', HS: 'Scotland', IV: 'Scotland', KA: 'Scotland', KW: 'Scotland',
  KY: 'Scotland', ML: 'Scotland', PA: 'Scotland', PH: 'Scotland', TD: 'Scotland',
  ZE: 'Scotland',
  // Wales
  CF: 'Wales', LD: 'Wales', LL: 'Wales', NP: 'Wales', SA: 'Wales',
  // Northern Ireland
  BT: 'Northern Ireland',
};

export const UK_REGIONS = [
  'London',
  'South East',
  'South West',
  'East of England',
  'East Midlands',
  'West Midlands',
  'North West',
  'Yorkshire & Humber',
  'North East',
  'Scotland',
  'Wales',
  'Northern Ireland',
] as const;

export function regionFromPostcode(postcode: string): string | null {
  const match = (postcode || '').trim().toUpperCase().match(/^([A-Z]{1,2})[0-9]/);
  if (!match) return null;
  return AREA_TO_REGION[match[1]] ?? null;
}
