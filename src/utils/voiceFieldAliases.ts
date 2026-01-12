/**
 * Voice Field Aliases for Schedule of Tests
 * Maps spoken field names to TestResult property names
 *
 * Used by useInlineVoice to resolve natural language field references
 * ElevenLabs agent handles validation via RAG knowledge
 */

export const TEST_RESULT_FIELD_ALIASES: Record<string, string[]> = {
  // Circuit Details
  circuitNumber: ['circuit', 'circuit number', 'number', 'circuit num'],
  circuitDescription: ['description', 'desc', 'circuit desc', 'circuit description', 'what is it'],
  circuitDesignation: ['designation', 'circuit designation', 'circuit ref'],
  circuitType: ['circuit type', 'type', 'ring final', 'radial', 'ring', 'lighting circuit', 'socket circuit', 'cooker circuit', 'shower circuit', 'immersion'],
  typeOfWiring: ['wiring type', 'wiring method', 'installation method', 'wiring', 'type of wiring', 'cable type'],
  referenceMethod: ['reference method', 'ref method', 'installation ref', 'installation method'],
  pointsServed: ['points', 'outlets', 'points served', 'number of points'],

  // Conductor Details
  liveSize: ['live size', 'cable size', 'conductor size', 'cable', 'live conductor', 'line size'],
  cpcSize: ['cpc size', 'earth size', 'earth conductor', 'cpc', 'earth cable', 'protective conductor size'],

  // Protective Device
  bsStandard: ['bs standard', 'british standard', 'standard'],
  protectiveDeviceType: ['device type', 'breaker type', 'mcb type', 'rcbo type', 'protection', 'protective device type', 'mcb', 'rcbo'],
  protectiveDeviceCurve: ['curve', 'device curve', 'mcb curve', 'type b', 'type c', 'type d', 'breaker curve'],
  protectiveDeviceRating: ['rating', 'breaker rating', 'amps', 'mcb rating', 'device rating', 'protective device rating', 'breaker amps'],
  protectiveDeviceKaRating: ['ka rating', 'breaking capacity', 'fault rating', 'ka', 'fault capacity'],
  maxZs: ['max zs', 'maximum zs', 'max impedance', 'maximum impedance', 'max loop impedance'],

  // RCD Details
  rcdBsStandard: ['rcd standard', 'rcd bs', 'rcd british standard'],
  rcdType: ['rcd type'],
  rcdRating: ['rcd rating', 'rcd ma', 'trip current', '30ma', 'residual current', 'rcd milliamps'],
  rcdRatingA: ['rcd amps', 'rcd ampere', 'rcd ampere rating'],

  // Ring Circuit Tests
  ringR1: ['ring r1', 'r1 ring', 'line continuity ring'],
  ringRn: ['ring rn', 'rn ring', 'neutral continuity ring'],
  ringR2: ['ring r2', 'r2 ring', 'earth continuity ring'],

  // Continuity
  r1r2: ['r1 plus r2', 'r1r2', 'r1 r2', 'continuity', 'r1 and r2', 'r one plus r two', 'r one r two'],
  r2: ['r2', 'earth continuity', 'protective conductor', 'r two'],

  // Insulation
  insulationTestVoltage: ['test voltage', 'insulation voltage', 'ir voltage', 'insulation test voltage', 'ir test voltage'],
  insulationResistance: ['insulation resistance', 'ir', 'insulation', 'megger', 'meg'],
  insulationLiveNeutral: ['live neutral', 'l-n', 'ln insulation', 'insulation ln', 'live to neutral', 'l n', 'line neutral', 'l to n'],
  insulationLiveEarth: ['live earth', 'l-e', 'le insulation', 'insulation le', 'live to earth', 'l e', 'line earth', 'l to e'],

  // Other Tests
  polarity: ['polarity', 'pol'],
  zs: ['zs', 'earth fault loop', 'loop impedance', 'zed s', 'impedance', 'earth loop', 'zed'],
  rcdOneX: ['rcd time', 'trip time', 'disconnect time', '1x time', 'rcd trip', 'rcd one times', 'one times'],
  rcdFiveX: ['rcd 5x', 'five times', '5x time', 'rcd five times'],
  rcdTestButton: ['test button', 'rcd button', 'rcd test button'],
  afddTest: ['afdd test', 'arc fault test', 'afdd', 'arc fault'],
  pfc: ['pfc', 'fault current', 'prospective fault', 'prospective fault current', 'ipf'],
  functionalTesting: ['functional test', 'functional', 'function test'],
  notes: ['notes', 'remarks', 'comments', 'note'],

  // Three-Phase
  phaseType: ['phase type', 'single phase', 'three phase', '1p', '3p', 'phase'],
  phaseRotation: ['phase rotation', 'rotation'],
  phaseBalanceL1: ['l1 balance', 'phase 1', 'l1', 'phase one'],
  phaseBalanceL2: ['l2 balance', 'phase 2', 'l2', 'phase two'],
  phaseBalanceL3: ['l3 balance', 'phase 3', 'l3', 'phase three'],
  lineToLineVoltage: ['line voltage', 'l-l voltage', 'line to line', 'l l voltage'],
};

/**
 * Resolves a spoken field name to its TestResult property name
 * @param spokenField - The field name as spoken by the user
 * @returns The actual TestResult property name, or null if not found
 */
export function resolveFieldName(spokenField: string): string | null {
  const normalised = spokenField.toLowerCase().trim();

  // Direct match on field name
  if (normalised in TEST_RESULT_FIELD_ALIASES) {
    return normalised;
  }

  // Check if it's a camelCase field name already
  const fieldNames = Object.keys(TEST_RESULT_FIELD_ALIASES);
  const directMatch = fieldNames.find(f => f.toLowerCase() === normalised);
  if (directMatch) {
    return directMatch;
  }

  // Search through aliases
  for (const [fieldName, aliases] of Object.entries(TEST_RESULT_FIELD_ALIASES)) {
    // Exact alias match
    if (aliases.some(alias => alias === normalised)) {
      return fieldName;
    }
    // Partial match - alias is contained in spoken field or vice versa
    if (aliases.some(alias => normalised.includes(alias) || alias.includes(normalised))) {
      return fieldName;
    }
  }

  return null;
}

/**
 * Gets all aliases for a given field name (for help/documentation)
 */
export function getFieldAliases(fieldName: string): string[] {
  return TEST_RESULT_FIELD_ALIASES[fieldName] || [];
}

/**
 * Gets all supported field names
 */
export function getAllFieldNames(): string[] {
  return Object.keys(TEST_RESULT_FIELD_ALIASES);
}
