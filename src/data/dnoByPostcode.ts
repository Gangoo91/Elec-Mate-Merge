/**
 * UK distribution network operator by postcode prefix.
 *
 * Extracted from useSolarPVSmartForm (ELE-1660) so the plug-in solar assessment
 * can use the same table. It was private there, and a second copy is how the
 * printed DNO and the notified DNO drift apart — the same reasoning as the
 * certificate prefix map.
 *
 * ⚠️ Prefix mapping is a good default, not gospel: DNO boundaries do not follow
 * postcode areas exactly and a few districts sit with a neighbouring operator.
 * Always presented as a suggestion the electrician can override, never written
 * silently over something they chose.
 */
export const DNO_BY_POSTCODE: Record<string, { name: string; region: string }> = {
  // UK Power Networks - Eastern
  CB: { name: 'UK Power Networks', region: 'Eastern' },
  CO: { name: 'UK Power Networks', region: 'Eastern' },
  IP: { name: 'UK Power Networks', region: 'Eastern' },
  NR: { name: 'UK Power Networks', region: 'Eastern' },
  PE: { name: 'UK Power Networks', region: 'Eastern' },
  CM: { name: 'UK Power Networks', region: 'Eastern' },
  SG: { name: 'UK Power Networks', region: 'Eastern' },
  SS: { name: 'UK Power Networks', region: 'Eastern' },
  AL: { name: 'UK Power Networks', region: 'Eastern' },
  EN: { name: 'UK Power Networks', region: 'Eastern' },
  HP: { name: 'UK Power Networks', region: 'Eastern' },
  LU: { name: 'UK Power Networks', region: 'Eastern' },
  MK: { name: 'UK Power Networks', region: 'Eastern' },
  NN: { name: 'UK Power Networks', region: 'Eastern' },

  // UK Power Networks - London
  E: { name: 'UK Power Networks', region: 'London' },
  EC: { name: 'UK Power Networks', region: 'London' },
  N: { name: 'UK Power Networks', region: 'London' },
  NW: { name: 'UK Power Networks', region: 'London' },
  SE: { name: 'UK Power Networks', region: 'London' },
  SW: { name: 'UK Power Networks', region: 'London' },
  W: { name: 'UK Power Networks', region: 'London' },
  WC: { name: 'UK Power Networks', region: 'London' },
  BR: { name: 'UK Power Networks', region: 'London' },
  CR: { name: 'UK Power Networks', region: 'London' },
  DA: { name: 'UK Power Networks', region: 'London' },
  HA: { name: 'UK Power Networks', region: 'London' },
  IG: { name: 'UK Power Networks', region: 'London' },
  KT: { name: 'UK Power Networks', region: 'London' },
  RM: { name: 'UK Power Networks', region: 'London' },
  SM: { name: 'UK Power Networks', region: 'London' },
  TW: { name: 'UK Power Networks', region: 'London' },
  UB: { name: 'UK Power Networks', region: 'London' },
  WD: { name: 'UK Power Networks', region: 'London' },

  // UK Power Networks - South Eastern
  BN: { name: 'UK Power Networks', region: 'South Eastern' },
  CT: { name: 'UK Power Networks', region: 'South Eastern' },
  GU: { name: 'UK Power Networks', region: 'South Eastern' },
  ME: { name: 'UK Power Networks', region: 'South Eastern' },
  RH: { name: 'UK Power Networks', region: 'South Eastern' },
  TN: { name: 'UK Power Networks', region: 'South Eastern' },

  // Scottish & Southern - Southern England
  PO: { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  SO: { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  SP: { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  BH: { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  DT: { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  BA: { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  SN: { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  OX: { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  RG: { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  SL: { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },

  // Western Power Distribution - West Midlands
  B: { name: 'Western Power Distribution', region: 'West Midlands' },
  CV: { name: 'Western Power Distribution', region: 'West Midlands' },
  DY: { name: 'Western Power Distribution', region: 'West Midlands' },
  ST: { name: 'Western Power Distribution', region: 'West Midlands' },
  WS: { name: 'Western Power Distribution', region: 'West Midlands' },
  WV: { name: 'Western Power Distribution', region: 'West Midlands' },

  // Western Power Distribution - East Midlands
  DE: { name: 'Western Power Distribution', region: 'East Midlands' },
  LE: { name: 'Western Power Distribution', region: 'East Midlands' },
  NG: { name: 'Western Power Distribution', region: 'East Midlands' },
  LN: { name: 'Western Power Distribution', region: 'East Midlands' },

  // Western Power Distribution - South West
  BS: { name: 'Western Power Distribution', region: 'South West' },
  EX: { name: 'Western Power Distribution', region: 'South West' },
  GL: { name: 'Western Power Distribution', region: 'South West' },
  PL: { name: 'Western Power Distribution', region: 'South West' },
  TA: { name: 'Western Power Distribution', region: 'South West' },
  TQ: { name: 'Western Power Distribution', region: 'South West' },
  TR: { name: 'Western Power Distribution', region: 'South West' },

  // Western Power Distribution - South Wales
  CF: { name: 'Western Power Distribution', region: 'South Wales' },
  NP: { name: 'Western Power Distribution', region: 'South Wales' },
  SA: { name: 'Western Power Distribution', region: 'South Wales' },

  // Scottish Power - North Wales & Merseyside
  CH: { name: 'Scottish Power Energy Networks', region: 'Merseyside' },
  L: { name: 'Scottish Power Energy Networks', region: 'Merseyside' },
  WA: { name: 'Scottish Power Energy Networks', region: 'Merseyside' },
  WN: { name: 'Scottish Power Energy Networks', region: 'Merseyside' },
  LL: { name: 'Scottish Power Energy Networks', region: 'North Wales' },
  SY: { name: 'Scottish Power Energy Networks', region: 'North Wales' },

  // Scottish Power - South Scotland
  DG: { name: 'Scottish Power Energy Networks', region: 'South Scotland' },
  EH: { name: 'Scottish Power Energy Networks', region: 'South Scotland' },
  G: { name: 'Scottish Power Energy Networks', region: 'South Scotland' },
  KA: { name: 'Scottish Power Energy Networks', region: 'South Scotland' },
  ML: { name: 'Scottish Power Energy Networks', region: 'South Scotland' },
  PA: { name: 'Scottish Power Energy Networks', region: 'South Scotland' },
  TD: { name: 'Scottish Power Energy Networks', region: 'South Scotland' },

  // Scottish & Southern - North Scotland
  AB: { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  DD: { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  FK: { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  IV: { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  KW: { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  KY: { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  PH: { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  ZE: { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },

  // Northern Powergrid - North East
  DH: { name: 'Northern Powergrid', region: 'North East' },
  DL: { name: 'Northern Powergrid', region: 'North East' },
  NE: { name: 'Northern Powergrid', region: 'North East' },
  SR: { name: 'Northern Powergrid', region: 'North East' },
  TS: { name: 'Northern Powergrid', region: 'North East' },

  // Northern Powergrid - Yorkshire
  BD: { name: 'Northern Powergrid', region: 'Yorkshire' },
  DN: { name: 'Northern Powergrid', region: 'Yorkshire' },
  HD: { name: 'Northern Powergrid', region: 'Yorkshire' },
  HG: { name: 'Northern Powergrid', region: 'Yorkshire' },
  HU: { name: 'Northern Powergrid', region: 'Yorkshire' },
  HX: { name: 'Northern Powergrid', region: 'Yorkshire' },
  LS: { name: 'Northern Powergrid', region: 'Yorkshire' },
  S: { name: 'Northern Powergrid', region: 'Yorkshire' },
  WF: { name: 'Northern Powergrid', region: 'Yorkshire' },
  YO: { name: 'Northern Powergrid', region: 'Yorkshire' },

  // Electricity North West
  BB: { name: 'Electricity North West', region: 'North West' },
  BL: { name: 'Electricity North West', region: 'North West' },
  CA: { name: 'Electricity North West', region: 'North West' },
  CW: { name: 'Electricity North West', region: 'North West' },
  FY: { name: 'Electricity North West', region: 'North West' },
  LA: { name: 'Electricity North West', region: 'North West' },
  M: { name: 'Electricity North West', region: 'North West' },
  OL: { name: 'Electricity North West', region: 'North West' },
  PR: { name: 'Electricity North West', region: 'North West' },
  SK: { name: 'Electricity North West', region: 'North West' },

  // Northern Ireland
  BT: { name: 'NIE Networks', region: 'Northern Ireland' },
};

/** Best-guess operator for a postcode. Falls back to the single-letter area. */
export const dnoForPostcode = (
  postcode: string,
): { name: string; region: string } | null => {
  if (!postcode) return null;
  const match = postcode.toUpperCase().trim().match(/^([A-Z]+)/);
  if (!match) return null;
  const prefix = match[1];
  return DNO_BY_POSTCODE[prefix] || DNO_BY_POSTCODE[prefix.charAt(0)] || null;
};
