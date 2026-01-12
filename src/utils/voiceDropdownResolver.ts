/**
 * Voice Dropdown Value Resolver
 *
 * Maps spoken values to EXACT dropdown option values.
 * Values MUST match the actual Select option values in the app.
 */

export const DROPDOWN_VALUE_MAPS: Record<string, Record<string, string>> = {
  // ========== Phase Type ==========
  phaseType: {
    '1': '1P',
    '1p': '1P',
    'one': '1P',
    'single': '1P',
    'single phase': '1P',
    '1 phase': '1P',
    '3': '3P',
    '3p': '3P',
    'three': '3P',
    'three phase': '3P',
    '3 phase': '3P',
  },

  // ========== Type of Wiring ==========
  typeOfWiring: {
    'a': 'A',
    'b': 'B',
    'c': 'C',
    'd': 'D',
    'e': 'E',
    'f': 'F',
    'g': 'G',
    'h': 'H',
    'o': 'O',
    // Natural language mappings
    'clipped direct': 'C',
    'clipped': 'C',
    'conduit': 'B',
    'trunking': 'B',
    'conduit on wall': 'B',
    'free air': 'E',
    'cable tray': 'E',
    'perforated tray': 'E',
    'thermally insulated': 'A',
    'insulated wall': 'A',
    'masonry': 'D',
    'embedded': 'F',
    'timber frame': 'G',
    'support wire': 'H',
    'catenary': 'H',
    'other': 'O',
  },

  // ========== Reference Method (actual values: A,B,C,D,E,F,G) ==========
  referenceMethod: {
    'a': 'A',
    'b': 'B',
    'c': 'C',
    'd': 'D',
    'e': 'E',
    'f': 'F',
    'g': 'G',
    'method a': 'A',
    'method b': 'B',
    'method c': 'C',
    'method d': 'D',
    'method e': 'E',
    'method f': 'F',
    'method g': 'G',
    'reference a': 'A',
    'reference b': 'B',
    'reference c': 'C',
    'reference d': 'D',
    'reference e': 'E',
    'reference f': 'F',
    'reference g': 'G',
  },

  // ========== Live Conductor Size (actual values have mm suffix) ==========
  liveSize: {
    // Numeric input
    '1': '1.0mm',
    '1.0': '1.0mm',
    '1.5': '1.5mm',
    '2.5': '2.5mm',
    '4': '4.0mm',
    '4.0': '4.0mm',
    '6': '6.0mm',
    '6.0': '6.0mm',
    '10': '10mm',
    '16': '16mm',
    '25': '25mm',
    '35': '35mm',
    '50': '50mm',
    '70': '70mm',
    '95': '95mm',
    // With mm suffix
    '1mm': '1.0mm',
    '1.0mm': '1.0mm',
    '1.5mm': '1.5mm',
    '2.5mm': '2.5mm',
    '4mm': '4.0mm',
    '4.0mm': '4.0mm',
    '6mm': '6.0mm',
    '6.0mm': '6.0mm',
    '10mm': '10mm',
    '16mm': '16mm',
    '25mm': '25mm',
    '35mm': '35mm',
    '50mm': '50mm',
    '70mm': '70mm',
    '95mm': '95mm',
    // Spoken words
    'one': '1.0mm',
    'one point five': '1.5mm',
    'two point five': '2.5mm',
    'four': '4.0mm',
    'six': '6.0mm',
    'ten': '10mm',
    'sixteen': '16mm',
    'twenty five': '25mm',
    'thirty five': '35mm',
    'fifty': '50mm',
    'seventy': '70mm',
    'ninety five': '95mm',
  },

  // ========== CPC Conductor Size (same as liveSize) ==========
  cpcSize: {
    // Numeric input
    '1': '1.0mm',
    '1.0': '1.0mm',
    '1.5': '1.5mm',
    '2.5': '2.5mm',
    '4': '4.0mm',
    '4.0': '4.0mm',
    '6': '6.0mm',
    '6.0': '6.0mm',
    '10': '10mm',
    '16': '16mm',
    '25': '25mm',
    '35': '35mm',
    '50': '50mm',
    '70': '70mm',
    '95': '95mm',
    // With mm suffix
    '1mm': '1.0mm',
    '1.0mm': '1.0mm',
    '1.5mm': '1.5mm',
    '2.5mm': '2.5mm',
    '4mm': '4.0mm',
    '4.0mm': '4.0mm',
    '6mm': '6.0mm',
    '6.0mm': '6.0mm',
    '10mm': '10mm',
    '16mm': '16mm',
    '25mm': '25mm',
    '35mm': '35mm',
    '50mm': '50mm',
    '70mm': '70mm',
    '95mm': '95mm',
    // Spoken words
    'one': '1.0mm',
    'one point five': '1.5mm',
    'two point five': '2.5mm',
    'four': '4.0mm',
    'six': '6.0mm',
    'ten': '10mm',
    'sixteen': '16mm',
    'twenty five': '25mm',
    'thirty five': '35mm',
    'fifty': '50mm',
    'seventy': '70mm',
    'ninety five': '95mm',
  },

  // ========== BS Standard ==========
  bsStandard: {
    'mcb': 'MCB (BS EN 60898)',
    'mcb 60898': 'MCB (BS EN 60898)',
    'bs en 60898': 'MCB (BS EN 60898)',
    '60898': 'MCB (BS EN 60898)',
    'rcbo': 'RCBO (BS EN 61009)',
    'rcbo 61009': 'RCBO (BS EN 61009)',
    'bs en 61009': 'RCBO (BS EN 61009)',
    '61009': 'RCBO (BS EN 61009)',
    'rcd': 'RCD (BS EN 61008)',
    'rcd 61008': 'RCD (BS EN 61008)',
    'bs en 61008': 'RCD (BS EN 61008)',
    '61008': 'RCD (BS EN 61008)',
    'fuse 88': 'Fuse (BS 88)',
    'bs 88': 'Fuse (BS 88)',
    'hrc': 'Fuse (BS 88)',
    'hrc fuse': 'Fuse (BS 88)',
    'fuse 1361': 'Fuse (BS 1361)',
    'bs 1361': 'Fuse (BS 1361)',
    '1361': 'Fuse (BS 1361)',
    'cartridge fuse': 'Fuse (BS 1361)',
    'cartridge': 'Fuse (BS 1361)',
    'fuse 3036': 'Fuse (BS 3036)',
    'bs 3036': 'Fuse (BS 3036)',
    '3036': 'Fuse (BS 3036)',
    'rewireable': 'Fuse (BS 3036)',
    'rewireable fuse': 'Fuse (BS 3036)',
    'semi-enclosed': 'Fuse (BS 3036)',
    'other': 'Other',
  },

  // ========== Protective Device Curve ==========
  protectiveDeviceCurve: {
    'b': 'B',
    'c': 'C',
    'd': 'D',
    'type b': 'B',
    'type c': 'C',
    'type d': 'D',
    'curve b': 'B',
    'curve c': 'C',
    'curve d': 'D',
    'b curve': 'B',
    'c curve': 'C',
    'd curve': 'D',
  },

  // ========== Protective Device Rating ==========
  protectiveDeviceRating: {
    '6': '6',
    '10': '10',
    '16': '16',
    '20': '20',
    '25': '25',
    '32': '32',
    '40': '40',
    '50': '50',
    '63': '63',
    '80': '80',
    '100': '100',
    // With amp suffix
    '6a': '6',
    '10a': '10',
    '16a': '16',
    '20a': '20',
    '25a': '25',
    '32a': '32',
    '40a': '40',
    '50a': '50',
    '63a': '63',
    '80a': '80',
    '100a': '100',
    // Spoken words
    'six': '6',
    'ten': '10',
    'sixteen': '16',
    'twenty': '20',
    'twenty five': '25',
    'thirty two': '32',
    'thirty-two': '32',
    'forty': '40',
    'fifty': '50',
    'sixty three': '63',
    'sixty-three': '63',
    'eighty': '80',
    'hundred': '100',
    'one hundred': '100',
  },

  // ========== RCD BS Standard ==========
  rcdBsStandard: {
    'rcd': 'RCD (BS EN 61008)',
    'rcd 61008': 'RCD (BS EN 61008)',
    'bs en 61008': 'RCD (BS EN 61008)',
    '61008': 'RCD (BS EN 61008)',
    'rcbo': 'RCBO (BS EN 61009)',
    'rcbo 61009': 'RCBO (BS EN 61009)',
    'bs en 61009': 'RCBO (BS EN 61009)',
    '61009': 'RCBO (BS EN 61009)',
    'rcd 7288': 'RCD (BS 7288)',
    'bs 7288': 'RCD (BS 7288)',
    '7288': 'RCD (BS 7288)',
    'other': 'Other',
  },

  // ========== RCD Type (actual values: AC, A, F, B, S, G) ==========
  rcdType: {
    'ac': 'AC',
    'type ac': 'AC',
    'a': 'A',
    'type a': 'A',
    'f': 'F',
    'type f': 'F',
    'b': 'B',
    'type b': 'B',
    's': 'S',
    'type s': 'S',
    'selective': 'S',
    'g': 'G',
    'type g': 'G',
    'general': 'G',
    'general use': 'G',
  },

  // ========== RCD Rating (mA) ==========
  rcdRating: {
    '10': '10',
    '30': '30',
    '100': '100',
    '300': '300',
    '500': '500',
    '10ma': '10',
    '30ma': '30',
    '100ma': '100',
    '300ma': '300',
    '500ma': '500',
    'ten': '10',
    'thirty': '30',
    'hundred': '100',
    'one hundred': '100',
    'three hundred': '300',
    'five hundred': '500',
  },

  // ========== Insulation Test Voltage ==========
  insulationTestVoltage: {
    '250': '250',
    '500': '500',
    '1000': '1000',
    '250v': '250',
    '500v': '500',
    '1000v': '1000',
    'two fifty': '250',
    'two hundred fifty': '250',
    'two hundred and fifty': '250',
    'five hundred': '500',
    'thousand': '1000',
    'one thousand': '1000',
  },

  // ========== Polarity ==========
  polarity: {
    'ok': 'Correct',
    'good': 'Correct',
    'correct': 'Correct',
    'pass': 'Correct',
    'passed': 'Correct',
    'yes': 'Correct',
    'tick': 'Correct',
    'incorrect': 'Incorrect',
    'fail': 'Incorrect',
    'failed': 'Incorrect',
    'wrong': 'Incorrect',
    'no': 'Incorrect',
    'n/a': 'N/A',
    'na': 'N/A',
    'not applicable': 'N/A',
  },

  // ========== RCD Test Button (actual values: ✓, ✗, N/A) ==========
  rcdTestButton: {
    'pass': '✓',
    'passed': '✓',
    'ok': '✓',
    'good': '✓',
    'yes': '✓',
    'tick': '✓',
    'fail': '✗',
    'failed': '✗',
    'no': '✗',
    'cross': '✗',
    'n/a': 'N/A',
    'na': 'N/A',
    'not applicable': 'N/A',
  },

  // ========== Functional Testing (actual values: ✓, ✗, N/A) ==========
  functionalTesting: {
    'pass': '✓',
    'passed': '✓',
    'ok': '✓',
    'good': '✓',
    'satisfactory': '✓',
    'sat': '✓',
    'yes': '✓',
    'tick': '✓',
    'fail': '✗',
    'failed': '✗',
    'unsatisfactory': '✗',
    'unsat': '✗',
    'no': '✗',
    'cross': '✗',
    'n/a': 'N/A',
    'na': 'N/A',
    'not applicable': 'N/A',
  },

  // ========== AFDD Test (actual values: ✓, ✗, N/A) ==========
  afddTest: {
    'pass': '✓',
    'passed': '✓',
    'ok': '✓',
    'good': '✓',
    'yes': '✓',
    'tick': '✓',
    'fail': '✗',
    'failed': '✗',
    'no': '✗',
    'cross': '✗',
    'n/a': 'N/A',
    'na': 'N/A',
    'not applicable': 'N/A',
  },

  // ========== Protective Device Type ==========
  protectiveDeviceType: {
    'mcb': 'MCB',
    'miniature circuit breaker': 'MCB',
    'rcbo': 'RCBO',
    'residual current breaker overload': 'RCBO',
    'rcd': 'RCD',
    'residual current device': 'RCD',
    'fuse': 'Fuse',
    'other': 'Other',
  },

  // ========== Protective Device kA Rating (Breaking Capacity) ==========
  protectiveDeviceKaRating: {
    '6': '6',
    '6ka': '6',
    '6 ka': '6',
    'six': '6',
    'six ka': '6',
    '10': '10',
    '10ka': '10',
    '10 ka': '10',
    'ten': '10',
    'ten ka': '10',
    '16': '16',
    '16ka': '16',
    '16 ka': '16',
    'sixteen': '16',
    'sixteen ka': '16',
  },

  // ========== RCD Amp Rating ==========
  rcdRatingA: {
    '16': '16',
    '25': '25',
    '32': '32',
    '40': '40',
    '63': '63',
    '80': '80',
    '100': '100',
    '16a': '16',
    '25a': '25',
    '32a': '32',
    '40a': '40',
    '63a': '63',
    '80a': '80',
    '100a': '100',
    'sixteen': '16',
    'twenty five': '25',
    'thirty two': '32',
    'forty': '40',
    'sixty three': '63',
    'eighty': '80',
    'hundred': '100',
  },

  // ========== Phase Rotation ==========
  phaseRotation: {
    'ok': 'Correct',
    'good': 'Correct',
    'correct': 'Correct',
    'pass': 'Correct',
    'passed': 'Correct',
    'yes': 'Correct',
    'incorrect': 'Incorrect',
    'fail': 'Incorrect',
    'failed': 'Incorrect',
    'wrong': 'Incorrect',
    'no': 'Incorrect',
    'n/a': 'N/A',
    'na': 'N/A',
    'not applicable': 'N/A',
  },
};

/**
 * Resolves a spoken value to the correct dropdown option value
 * @param field - The field name (e.g., 'polarity', 'rcdTestButton')
 * @param spokenValue - The value as spoken by the user
 * @returns The correct dropdown option value, or the original value if no mapping found
 */
export function resolveDropdownValue(field: string, spokenValue: string): string {
  const map = DROPDOWN_VALUE_MAPS[field];
  if (!map) return spokenValue;

  const normalised = spokenValue.toLowerCase().trim();

  // Check for exact match first
  if (map[normalised]) {
    return map[normalised];
  }

  // Check if the value contains any of the mapped keys
  for (const [key, value] of Object.entries(map)) {
    if (normalised.includes(key) || key.includes(normalised)) {
      return value;
    }
  }

  return spokenValue;
}

/**
 * Check if a field is a dropdown field that needs value resolution
 */
export function isDropdownField(field: string): boolean {
  return field in DROPDOWN_VALUE_MAPS;
}
