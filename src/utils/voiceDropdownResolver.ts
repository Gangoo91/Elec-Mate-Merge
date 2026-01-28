/**
 * Voice Dropdown Value Resolver
 *
 * Maps spoken values to EXACT dropdown option values.
 * Values MUST match the actual Select option values in the app.
 *
 * This handles all the different ways electricians might say values:
 * - Numbers: "six", "6", "6a", "six amps"
 * - Decimals: "nought point four five", "0.45", "point four five"
 * - Pass/fail: "ok", "good", "pass", "tick", "correct"
 * - Units: "6mm", "6 millimeter", "6 mil"
 */

// ============================================================================
// HELPER: Common numeric value mappings (reused across multiple fields)
// ============================================================================

// Spoken numbers to digits
const SPOKEN_NUMBERS: Record<string, string> = {
  'zero': '0',
  'nought': '0',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
  'ten': '10',
  'eleven': '11',
  'twelve': '12',
  'thirteen': '13',
  'fourteen': '14',
  'fifteen': '15',
  'sixteen': '16',
  'seventeen': '17',
  'eighteen': '18',
  'nineteen': '19',
  'twenty': '20',
  'twenty one': '21',
  'twenty two': '22',
  'twenty three': '23',
  'twenty four': '24',
  'twenty five': '25',
  'twenty six': '26',
  'twenty seven': '27',
  'twenty eight': '28',
  'twenty nine': '29',
  'thirty': '30',
  'thirty one': '31',
  'thirty two': '32',
  'thirty three': '33',
  'thirty four': '34',
  'thirty five': '35',
  'thirty six': '36',
  'forty': '40',
  'forty five': '45',
  'fifty': '50',
  'sixty': '60',
  'sixty three': '63',
  'seventy': '70',
  'eighty': '80',
  'ninety': '90',
  'ninety five': '95',
  'hundred': '100',
  'one hundred': '100',
};

// Pass/Fail/Tick variations (for checkboxes and pass/fail fields)
const PASS_VARIATIONS: Record<string, string> = {
  'pass': '✓',
  'passed': '✓',
  'ok': '✓',
  'okay': '✓',
  'good': '✓',
  'yes': '✓',
  'tick': '✓',
  'ticked': '✓',
  'check': '✓',
  'checked': '✓',
  'correct': '✓',
  'satisfactory': '✓',
  'sat': '✓',
  'fine': '✓',
  'works': '✓',
  'working': '✓',
  'operational': '✓',
  'functional': '✓',
  'all good': '✓',
  'all ok': '✓',
  'yep': '✓',
  'yeah': '✓',
  'confirmed': '✓',
  'positive': '✓',
};

const FAIL_VARIATIONS: Record<string, string> = {
  'fail': '✗',
  'failed': '✗',
  'no': '✗',
  'cross': '✗',
  'wrong': '✗',
  'incorrect': '✗',
  'unsatisfactory': '✗',
  'unsat': '✗',
  'not working': '✗',
  'faulty': '✗',
  'bad': '✗',
  'nope': '✗',
  'negative': '✗',
  'doesn\'t work': '✗',
  'not ok': '✗',
  'broken': '✗',
};

const NA_VARIATIONS: Record<string, string> = {
  'n/a': 'N/A',
  'na': 'N/A',
  'n a': 'N/A',
  'not applicable': 'N/A',
  'not installed': 'N/A',
  'none': 'N/A',
  'no rcd': 'N/A',
  'no afdd': 'N/A',
  'skip': 'N/A',
  'skipped': 'N/A',
  'blank': 'N/A',
  'leave blank': 'N/A',
  'dash': 'N/A',
  '-': 'N/A',
};

// Correct/Incorrect variations (for polarity, phase rotation)
const CORRECT_VARIATIONS: Record<string, string> = {
  'correct': 'Correct',
  'ok': 'Correct',
  'okay': 'Correct',
  'good': 'Correct',
  'pass': 'Correct',
  'passed': 'Correct',
  'yes': 'Correct',
  'tick': 'Correct',
  'right': 'Correct',
  'fine': 'Correct',
  'proper': 'Correct',
  'satisfactory': 'Correct',
  'sat': 'Correct',
  'confirmed': 'Correct',
  'verified': 'Correct',
  'yep': 'Correct',
  'yeah': 'Correct',
};

const INCORRECT_VARIATIONS: Record<string, string> = {
  'incorrect': 'Incorrect',
  'wrong': 'Incorrect',
  'fail': 'Incorrect',
  'failed': 'Incorrect',
  'no': 'Incorrect',
  'bad': 'Incorrect',
  'reversed': 'Incorrect',
  'swapped': 'Incorrect',
  'cross polarity': 'Incorrect',
  'cross wired': 'Incorrect',
  'faulty': 'Incorrect',
  'nope': 'Incorrect',
};

// ============================================================================
// CABLE SIZE MAPPINGS (shared between liveSize and cpcSize)
// ============================================================================

const CABLE_SIZE_MAPPINGS: Record<string, string> = {
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
  '120': '120mm',
  '150': '150mm',
  '185': '185mm',
  '240': '240mm',
  '300': '300mm',

  // With mm suffix (no space)
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
  '120mm': '120mm',
  '150mm': '150mm',
  '185mm': '185mm',
  '240mm': '240mm',
  '300mm': '300mm',

  // With space before mm
  '1 mm': '1.0mm',
  '1.0 mm': '1.0mm',
  '1.5 mm': '1.5mm',
  '2.5 mm': '2.5mm',
  '4 mm': '4.0mm',
  '4.0 mm': '4.0mm',
  '6 mm': '6.0mm',
  '6.0 mm': '6.0mm',
  '10 mm': '10mm',
  '16 mm': '16mm',
  '25 mm': '25mm',
  '35 mm': '35mm',
  '50 mm': '50mm',
  '70 mm': '70mm',
  '95 mm': '95mm',

  // With "millimeter", "millimetre", "mil"
  '1 millimeter': '1.0mm',
  '1.5 millimeter': '1.5mm',
  '2.5 millimeter': '2.5mm',
  '4 millimeter': '4.0mm',
  '6 millimeter': '6.0mm',
  '10 millimeter': '10mm',
  '16 millimeter': '16mm',
  '25 millimeter': '25mm',
  '1 millimetre': '1.0mm',
  '1.5 millimetre': '1.5mm',
  '2.5 millimetre': '2.5mm',
  '4 millimetre': '4.0mm',
  '6 millimetre': '6.0mm',
  '10 millimetre': '10mm',
  '16 millimetre': '16mm',
  '25 millimetre': '25mm',
  '1 mil': '1.0mm',
  '1.5 mil': '1.5mm',
  '2.5 mil': '2.5mm',
  '4 mil': '4.0mm',
  '6 mil': '6.0mm',
  '10 mil': '10mm',

  // Spoken words
  'one': '1.0mm',
  'one mil': '1.0mm',
  'one mm': '1.0mm',
  'one millimeter': '1.0mm',
  'one millimetre': '1.0mm',
  'one point five': '1.5mm',
  'one and a half': '1.5mm',
  'one point five mil': '1.5mm',
  'one point five mm': '1.5mm',
  'two point five': '2.5mm',
  'two and a half': '2.5mm',
  'two point five mil': '2.5mm',
  'two point five mm': '2.5mm',
  'four': '4.0mm',
  'four mil': '4.0mm',
  'four mm': '4.0mm',
  'four millimeter': '4.0mm',
  'six': '6.0mm',
  'six mil': '6.0mm',
  'six mm': '6.0mm',
  'six millimeter': '6.0mm',
  'ten': '10mm',
  'ten mil': '10mm',
  'ten mm': '10mm',
  'sixteen': '16mm',
  'sixteen mil': '16mm',
  'sixteen mm': '16mm',
  'twenty five': '25mm',
  'twenty five mil': '25mm',
  'thirty five': '35mm',
  'fifty': '50mm',
  'seventy': '70mm',
  'ninety five': '95mm',

  // With "cable" suffix
  '1.5mm cable': '1.5mm',
  '2.5mm cable': '2.5mm',
  '4mm cable': '4.0mm',
  '6mm cable': '6.0mm',
  '10mm cable': '10mm',
  '16mm cable': '16mm',

  // Common phrases
  'a 6': '6.0mm',
  'a six': '6.0mm',
  'a 10': '10mm',
  'a ten': '10mm',
  'the 6': '6.0mm',
  'its 6': '6.0mm',
  'it\'s 6': '6.0mm',

  // Squared variations
  '1.5mm squared': '1.5mm',
  '2.5mm squared': '2.5mm',
  '4mm squared': '4.0mm',
  '6mm squared': '6.0mm',
  '10mm squared': '10mm',
  '1.5 mm squared': '1.5mm',
  '2.5 mm squared': '2.5mm',
  '4 mm squared': '4.0mm',
  '6 mm squared': '6.0mm',
  '10 mm squared': '10mm',
  '1.5 square': '1.5mm',
  '2.5 square': '2.5mm',
  '4 square': '4.0mm',
  '6 square': '6.0mm',
  '10 square': '10mm',
};

// ============================================================================
// MAIN DROPDOWN VALUE MAPS
// ============================================================================

export const DROPDOWN_VALUE_MAPS: Record<string, Record<string, string>> = {
  // ========== Phase Type ==========
  phaseType: {
    '1': '1P',
    '1p': '1P',
    'one': '1P',
    'single': '1P',
    'single phase': '1P',
    '1 phase': '1P',
    'one phase': '1P',
    'sp': '1P',
    's/p': '1P',
    'mono': '1P',
    'monophase': '1P',
    '3': '3P',
    '3p': '3P',
    'three': '3P',
    'triple': '3P',
    'three phase': '3P',
    '3 phase': '3P',
    'tp': '3P',
    't/p': '3P',
    'poly': '3P',
    'polyphase': '3P',
  },

  // ========== Type of Wiring (BS 7671 Column 3 - Cable Type Codes) ==========
  typeOfWiring: {
    // Letter codes
    'a': 'A',
    'b': 'B',
    'c': 'C',
    'd': 'D',
    'e': 'E',
    'f': 'F',
    'g': 'G',
    'h': 'H',
    'o': 'O',
    // A = Thermoplastic insulated/sheathed cables (T&E) - MOST DOMESTIC
    't&e': 'A',
    't and e': 'A',
    'twin and earth': 'A',
    'twin & earth': 'A',
    'pvc twin and earth': 'A',
    'thermoplastic': 'A',
    'thermoplastic sheathed': 'A',
    'pvc': 'A',
    'flat twin': 'A',
    'domestic cable': 'A',
    // B = Thermoplastic in non-metallic conduit
    'non metallic conduit': 'B',
    'plastic conduit': 'B',
    'pvc conduit': 'B',
    'singles in conduit': 'B',
    'singles in plastic conduit': 'B',
    // C = Thermoplastic in non-metallic trunking
    'non metallic trunking': 'C',
    'plastic trunking': 'C',
    'pvc trunking': 'C',
    'mini trunking': 'C',
    // D = Thermoplastic in metallic conduit
    'metallic conduit': 'D',
    'metal conduit': 'D',
    'steel conduit': 'D',
    'galvanised conduit': 'D',
    'galv conduit': 'D',
    'singles in metal conduit': 'D',
    // E = Thermoplastic in metallic trunking
    'metallic trunking': 'E',
    'metal trunking': 'E',
    'steel trunking': 'E',
    'dado trunking': 'E',
    // F = Thermoplastic SWA cables
    'swa': 'F',
    'thermoplastic swa': 'F',
    'pvc swa': 'F',
    'steel wire armoured': 'F',
    'armoured': 'F',
    'armoured cable': 'F',
    // G = Thermosetting SWA cables
    'thermosetting swa': 'G',
    'xlpe swa': 'G',
    'xlpe': 'G',
    'thermosetting': 'G',
    // H = Mineral insulated (MI) cables
    'mi': 'H',
    'mineral insulated': 'H',
    'pyro': 'H',
    'pyrotenax': 'H',
    'micc': 'H',
    'fire rated': 'H',
    // O = Other
    'other': 'O',
    'unknown': 'O',
    'unsure': 'O',
    'flex': 'O',
    'data cable': 'O',
  },

  // ========== Reference Method (BS 7671 Column 4 - Table 4A2) ==========
  // Select component expects: 'A1', 'A2', 'B1', 'B2', 'C', 'D1', 'D2', 'E', 'F', 'G'
  referenceMethod: {
    // Direct matches for numbered variants
    'a1': 'A1',
    'a2': 'A2',
    'b1': 'B1',
    'b2': 'B2',
    'c': 'C',
    'd1': 'D1',
    'd2': 'D2',
    'e': 'E',
    'f': 'F',
    'g': 'G',
    // Single letters default to most common variant
    'a': 'A1',  // Default to A1 (single-core cables touching)
    'b': 'B1',  // Default to B1 (multi-core in conduit)
    'd': 'D1',  // Default to D1
    // Formal naming with numbers
    'method a1': 'A1',
    'method a2': 'A2',
    'method b1': 'B1',
    'method b2': 'B2',
    'method c': 'C',
    'method d1': 'D1',
    'method d2': 'D2',
    'method e': 'E',
    'method f': 'F',
    'method g': 'G',
    // Without numbers (defaults)
    'method a': 'A1',
    'method b': 'B1',
    'method d': 'D1',
    'reference a1': 'A1',
    'reference a2': 'A2',
    'reference b1': 'B1',
    'reference b2': 'B2',
    'reference c': 'C',
    'reference d1': 'D1',
    'reference d2': 'D2',
    'reference e': 'E',
    'reference f': 'F',
    'reference g': 'G',
    'reference a': 'A1',
    'reference b': 'B1',
    'reference d': 'D1',
    'ref a1': 'A1',
    'ref a2': 'A2',
    'ref b1': 'B1',
    'ref b2': 'B2',
    'ref c': 'C',
    'ref d1': 'D1',
    'ref d2': 'D2',
    'ref e': 'E',
    'ref f': 'F',
    'ref g': 'G',
    'ref a': 'A1',
    'ref b': 'B1',
    'ref d': 'D1',
    // A1 = Single-core cables, insulated, touching (in conduit in thermally insulating wall)
    'thermally insulated': 'A1',
    'in insulation': 'A1',
    'insulated wall': 'A1',
    'in thermal insulation': 'A1',
    'loft': 'A1',
    'attic': 'A1',
    'roof space': 'A1',
    'single core touching': 'A1',
    // A2 = Single-core cables, insulated, spaced
    'single core spaced': 'A2',
    'spaced single core': 'A2',
    // B1 = Multi-core cables in conduit/trunking
    'conduit on wall': 'B1',
    'in conduit': 'B1',
    'in trunking': 'B1',
    'conduit': 'B1',
    'trunking': 'B1',
    'multi core conduit': 'B1',
    // B2 = Single-core cables in conduit/trunking
    'single core conduit': 'B2',
    'singles in conduit': 'B2',
    // C = Clipped direct - MOST COMMON FOR T&E
    'clipped direct': 'C',
    'clipped': 'C',
    'clipped to surface': 'C',
    'surface clipped': 'C',
    'direct': 'C',
    'clips': 'C',
    'cable clips': 'C',
    'domestic': 'C',
    't&e': 'C',
    'twin and earth': 'C',
    // D1 = Multi-core in duct/ground
    'dado trunking': 'D1',
    'skirting trunking': 'D1',
    'duct': 'D1',
    'in duct': 'D1',
    'underground': 'D1',
    'buried': 'D1',
    // D2 = Single-core in duct/ground
    'single core duct': 'D2',
    // E = Multi-core free air / cable tray
    'free air': 'E',
    'cable tray': 'E',
    'perforated tray': 'E',
    'ladder': 'E',
    'cable ladder': 'E',
    'tray': 'E',
    'open tray': 'E',
    'suspended': 'E',
    // F = Single-core cables touching (free air)
    'in floor': 'F',
    'underfloor': 'F',
    'floor conduit': 'F',
    'screed': 'F',
    'in screed': 'F',
    'concrete': 'F',
    'embedded': 'F',
    'touching free air': 'F',
    // G = Spaced from surface (single-core spaced free air)
    'spaced': 'G',
    'spaced from surface': 'G',
    'standoff': 'G',
    'spacers': 'G',
    'catenary': 'G',
    'support wire': 'G',
    'spaced free air': 'G',
  },

  // ========== Live Conductor Size ==========
  liveSize: { ...CABLE_SIZE_MAPPINGS },

  // ========== CPC Conductor Size ==========
  cpcSize: { ...CABLE_SIZE_MAPPINGS },

  // ========== BS Standard ==========
  bsStandard: {
    // MCB
    'mcb': 'MCB (BS EN 60898)',
    'mcb 60898': 'MCB (BS EN 60898)',
    'bs en 60898': 'MCB (BS EN 60898)',
    '60898': 'MCB (BS EN 60898)',
    'miniature circuit breaker': 'MCB (BS EN 60898)',
    // RCBO
    'rcbo': 'RCBO (BS EN 61009)',
    'rcbo 61009': 'RCBO (BS EN 61009)',
    'bs en 61009': 'RCBO (BS EN 61009)',
    '61009': 'RCBO (BS EN 61009)',
    'residual current breaker': 'RCBO (BS EN 61009)',
    // RCD
    'rcd': 'RCD (BS EN 61008)',
    'rcd 61008': 'RCD (BS EN 61008)',
    'bs en 61008': 'RCD (BS EN 61008)',
    '61008': 'RCD (BS EN 61008)',
    'residual current device': 'RCD (BS EN 61008)',
    // Fuse BS 88
    'fuse 88': 'Fuse (BS 88)',
    'bs 88': 'Fuse (BS 88)',
    '88': 'Fuse (BS 88)',
    'hrc': 'Fuse (BS 88)',
    'hrc fuse': 'Fuse (BS 88)',
    'high rupturing capacity': 'Fuse (BS 88)',
    // Fuse BS 1361
    'fuse 1361': 'Fuse (BS 1361)',
    'bs 1361': 'Fuse (BS 1361)',
    '1361': 'Fuse (BS 1361)',
    'cartridge fuse': 'Fuse (BS 1361)',
    'cartridge': 'Fuse (BS 1361)',
    'consumer unit fuse': 'Fuse (BS 1361)',
    // Fuse BS 3036
    'fuse 3036': 'Fuse (BS 3036)',
    'bs 3036': 'Fuse (BS 3036)',
    '3036': 'Fuse (BS 3036)',
    'rewireable': 'Fuse (BS 3036)',
    'rewireable fuse': 'Fuse (BS 3036)',
    'semi-enclosed': 'Fuse (BS 3036)',
    'wire fuse': 'Fuse (BS 3036)',
    // Other
    'other': 'Other',
    'unknown': 'Other',
  },

  // ========== Protective Device Type ==========
  protectiveDeviceType: {
    'mcb': 'MCB',
    'miniature circuit breaker': 'MCB',
    'circuit breaker': 'MCB',
    'breaker': 'MCB',
    'rcbo': 'RCBO',
    'residual current breaker overload': 'RCBO',
    'combined': 'RCBO',
    'rcd mcb': 'RCBO',
    'rcd': 'RCD',
    'residual current device': 'RCD',
    'trip': 'RCD',
    'fuse': 'Fuse',
    'fusible': 'Fuse',
    'other': 'Other',
    'mccb': 'MCCB',
    'molded case': 'MCCB',
    'moulded case': 'MCCB',
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
    'b type': 'B',
    'c type': 'C',
    'd type': 'D',
    // Common usage
    'domestic': 'B',
    'general': 'B',
    'lighting': 'B',
    'inductive': 'C',
    'motor': 'C',
    'motors': 'C',
    'high inrush': 'D',
    'transformer': 'D',
    'transformers': 'D',
  },

  // ========== Protective Device Rating (Amps) ==========
  protectiveDeviceRating: {
    // Numbers
    '3': '3',
    '5': '5',
    '6': '6',
    '10': '10',
    '13': '13',
    '15': '15',
    '16': '16',
    '20': '20',
    '25': '25',
    '32': '32',
    '40': '40',
    '45': '45',
    '50': '50',
    '63': '63',
    '80': '80',
    '100': '100',
    '125': '125',
    // With amp suffix
    '3a': '3',
    '5a': '5',
    '6a': '6',
    '10a': '10',
    '13a': '13',
    '15a': '15',
    '16a': '16',
    '20a': '20',
    '25a': '25',
    '32a': '32',
    '40a': '40',
    '45a': '45',
    '50a': '50',
    '63a': '63',
    '80a': '80',
    '100a': '100',
    '125a': '125',
    // With space + amp
    '3 amp': '3',
    '5 amp': '5',
    '6 amp': '6',
    '10 amp': '10',
    '13 amp': '13',
    '15 amp': '15',
    '16 amp': '16',
    '20 amp': '20',
    '25 amp': '25',
    '32 amp': '32',
    '40 amp': '40',
    '45 amp': '45',
    '50 amp': '50',
    '63 amp': '63',
    '80 amp': '80',
    '100 amp': '100',
    // With "amps"
    '6 amps': '6',
    '10 amps': '10',
    '16 amps': '16',
    '20 amps': '20',
    '32 amps': '32',
    '40 amps': '40',
    '50 amps': '50',
    '63 amps': '63',
    // Spoken words
    'three': '3',
    'five': '5',
    'six': '6',
    'six amp': '6',
    'six amps': '6',
    'ten': '10',
    'ten amp': '10',
    'ten amps': '10',
    'thirteen': '13',
    'fifteen': '15',
    'sixteen': '16',
    'sixteen amp': '16',
    'sixteen amps': '16',
    'twenty': '20',
    'twenty amp': '20',
    'twenty five': '25',
    'thirty two': '32',
    'thirty-two': '32',
    'thirty two amp': '32',
    'thirty two amps': '32',
    'forty': '40',
    'forty amp': '40',
    'forty five': '45',
    'fifty': '50',
    'fifty amp': '50',
    'sixty three': '63',
    'sixty-three': '63',
    'sixty three amp': '63',
    'eighty': '80',
    'eighty amp': '80',
    'hundred': '100',
    'one hundred': '100',
    'hundred amp': '100',
  },

  // ========== Protective Device kA Rating ==========
  protectiveDeviceKaRating: {
    '4.5': '4.5',
    '6': '6',
    '10': '10',
    '16': '16',
    '25': '25',
    '36': '36',
    '50': '50',
    // With kA suffix
    '4.5ka': '4.5',
    '6ka': '6',
    '10ka': '10',
    '16ka': '16',
    '25ka': '25',
    '36ka': '36',
    '50ka': '50',
    // With space
    '4.5 ka': '4.5',
    '6 ka': '6',
    '10 ka': '10',
    '16 ka': '16',
    '25 ka': '25',
    '36 ka': '36',
    '50 ka': '50',
    // Spoken
    'four point five': '4.5',
    'four and a half': '4.5',
    'six': '6',
    'six ka': '6',
    'ten': '10',
    'ten ka': '10',
    'sixteen': '16',
    'sixteen ka': '16',
    'twenty five': '25',
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
    'socket outlet rcd': 'RCD (BS 7288)',
    'srcd': 'RCD (BS 7288)',
    'other': 'Other',
  },

  // ========== RCD Type ==========
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
    'time delayed': 'S',
    'delayed': 'S',
    'g': 'G',
    'type g': 'G',
    'general': 'G',
    'general use': 'G',
    // Descriptions
    'standard': 'AC',
    'basic': 'AC',
    'pulsating': 'A',
    'pulsating dc': 'A',
    'ev': 'A',
    'ev charger': 'A',
    'frequency': 'F',
    'vfd': 'F',
    'inverter': 'F',
    'dc': 'B',
    'dc sensitive': 'B',
    'all current': 'B',
  },

  // ========== RCD Rating (mA) ==========
  // Select component expects: '10mA', '30mA', '100mA', '300mA', '500mA'
  rcdRating: {
    // Numeric input - map to values WITH mA suffix
    '10': '10mA',
    '30': '30mA',
    '100': '100mA',
    '300': '300mA',
    '500': '500mA',
    '1000': '1000mA',
    // With mA suffix (passthrough to correct format)
    '10ma': '10mA',
    '30ma': '30mA',
    '100ma': '100mA',
    '300ma': '300mA',
    '500ma': '500mA',
    '1000ma': '1000mA',
    // With space
    '10 ma': '10mA',
    '30 ma': '30mA',
    '100 ma': '100mA',
    '300 ma': '300mA',
    '500 ma': '500mA',
    '1000 ma': '1000mA',
    // Spoken
    'ten': '10mA',
    'ten ma': '10mA',
    'ten milliamp': '10mA',
    'ten milliamps': '10mA',
    'thirty': '30mA',
    'thirty ma': '30mA',
    'thirty milliamp': '30mA',
    'thirty milliamps': '30mA',
    'hundred': '100mA',
    'one hundred': '100mA',
    'hundred ma': '100mA',
    'hundred milliamp': '100mA',
    'three hundred': '300mA',
    'three hundred ma': '300mA',
    'three hundred milliamp': '300mA',
    'five hundred': '500mA',
    'five hundred ma': '500mA',
    'five hundred milliamp': '500mA',
    'thousand': '1000mA',
    'one thousand': '1000mA',
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
    // With amp suffix
    '16a': '16',
    '25a': '25',
    '32a': '32',
    '40a': '40',
    '63a': '63',
    '80a': '80',
    '100a': '100',
    // Spoken
    'sixteen': '16',
    'twenty five': '25',
    'thirty two': '32',
    'forty': '40',
    'sixty three': '63',
    'eighty': '80',
    'hundred': '100',
    'one hundred': '100',
  },

  // ========== Insulation Test Voltage ==========
  // Select expects: 250V, 500V, 1000V
  insulationTestVoltage: {
    '250': '250V',
    '500': '500V',
    '1000': '1000V',
    // With V suffix
    '250v': '250V',
    '500v': '500V',
    '1000v': '1000V',
    // With space
    '250 v': '250V',
    '500 v': '500V',
    '1000 v': '1000V',
    // With "volts"
    '250 volts': '250V',
    '500 volts': '500V',
    '1000 volts': '1000V',
    // Spoken
    'two fifty': '250V',
    'two hundred fifty': '250V',
    'two hundred and fifty': '250V',
    'five hundred': '500V',
    'thousand': '1000V',
    'one thousand': '1000V',
    'a thousand': '1000V',
    '1k': '1000V',
    '1kv': '1000V',
  },

  // ========== Insulation Resistance Values (Live-Neutral, Live-Earth) ==========
  insulationLiveNeutral: {
    // High values (good)
    '>200': '>200',
    '> 200': '>200',
    'greater than 200': '>200',
    'more than 200': '>200',
    'over 200': '>200',
    '200 plus': '>200',
    '200+': '>200',
    'infinity': '>200',
    'infinite': '>200',
    'off scale': '>200',
    'open circuit': '>200',
    'open': '>200',
    'max': '>200',
    'maximum': '>200',
    'full scale': '>200',
    'high': '>200',
    'very high': '>200',
    // Common values
    '200': '200',
    '199': '199',
    '150': '150',
    '100': '100',
    '50': '50',
    '20': '20',
    '10': '10',
    '5': '5',
    '2': '2',
    '1': '1',
    // With MΩ suffix
    '>200 megohm': '>200',
    '>200 megohms': '>200',
    '200 megohm': '200',
    '200 megohms': '200',
    '100 megohm': '100',
    '50 megohm': '50',
    // Spoken
    'two hundred': '200',
    'over two hundred': '>200',
    'more than two hundred': '>200',
    'hundred': '100',
    'one hundred': '100',
    'fifty': '50',
    'twenty': '20',
    'ten': '10',
    'five': '5',
    'two': '2',
    'one': '1',
  },

  insulationLiveEarth: {
    // High values (good)
    '>200': '>200',
    '> 200': '>200',
    'greater than 200': '>200',
    'more than 200': '>200',
    'over 200': '>200',
    '200 plus': '>200',
    '200+': '>200',
    'infinity': '>200',
    'infinite': '>200',
    'off scale': '>200',
    'open circuit': '>200',
    'open': '>200',
    'max': '>200',
    'maximum': '>200',
    'full scale': '>200',
    'high': '>200',
    'very high': '>200',
    // Common values
    '200': '200',
    '199': '199',
    '150': '150',
    '100': '100',
    '50': '50',
    '20': '20',
    '10': '10',
    '5': '5',
    '2': '2',
    '1': '1',
    // With MΩ suffix
    '>200 megohm': '>200',
    '>200 megohms': '>200',
    '200 megohm': '200',
    '200 megohms': '200',
    '100 megohm': '100',
    '50 megohm': '50',
    // Spoken
    'two hundred': '200',
    'over two hundred': '>200',
    'more than two hundred': '>200',
    'hundred': '100',
    'one hundred': '100',
    'fifty': '50',
    'twenty': '20',
    'ten': '10',
    'five': '5',
    'two': '2',
    'one': '1',
  },

  insulationResistance: {
    // High values (good)
    '>200': '>200',
    '> 200': '>200',
    'greater than 200': '>200',
    'more than 200': '>200',
    'over 200': '>200',
    '200 plus': '>200',
    '200+': '>200',
    'infinity': '>200',
    'infinite': '>200',
    'off scale': '>200',
    'open circuit': '>200',
    'open': '>200',
    'max': '>200',
    'maximum': '>200',
    'full scale': '>200',
    'high': '>200',
    'very high': '>200',
    // Common values
    '200': '200',
    '199': '199',
    '150': '150',
    '100': '100',
    '50': '50',
    '20': '20',
    '10': '10',
    '5': '5',
    '2': '2',
    '1': '1',
    // Spoken
    'two hundred': '200',
    'over two hundred': '>200',
    'more than two hundred': '>200',
    'hundred': '100',
    'one hundred': '100',
    'fifty': '50',
    'twenty': '20',
    'ten': '10',
    'five': '5',
    'two': '2',
    'one': '1',
  },

  // ========== Polarity ==========
  polarity: {
    ...CORRECT_VARIATIONS,
    ...INCORRECT_VARIATIONS,
    ...NA_VARIATIONS,
  },

  // ========== Phase Rotation ==========
  phaseRotation: {
    ...CORRECT_VARIATIONS,
    ...INCORRECT_VARIATIONS,
    ...NA_VARIATIONS,
  },

  // ========== RCD Test Button ==========
  rcdTestButton: {
    ...PASS_VARIATIONS,
    ...FAIL_VARIATIONS,
    ...NA_VARIATIONS,
    // Additional RCD-specific
    'trips': '✓',
    'tripped': '✓',
    'operates': '✓',
    'operated': '✓',
    'doesn\'t trip': '✗',
    'no trip': '✗',
    'stuck': '✗',
  },

  // ========== AFDD Test ==========
  afddTest: {
    ...PASS_VARIATIONS,
    ...FAIL_VARIATIONS,
    ...NA_VARIATIONS,
    'not fitted': 'N/A',
    'no afdd': 'N/A',
  },

  // ========== Functional Testing ==========
  functionalTesting: {
    ...PASS_VARIATIONS,
    ...FAIL_VARIATIONS,
    ...NA_VARIATIONS,
    'works correctly': '✓',
    'functions correctly': '✓',
    'operates correctly': '✓',
  },

  // ========== Points Served ==========
  pointsServed: {
    ...SPOKEN_NUMBERS,
    // Common outlet counts
    '1 point': '1',
    '2 points': '2',
    '3 points': '3',
    '4 points': '4',
    '5 points': '5',
    '6 points': '6',
    '7 points': '7',
    '8 points': '8',
    '9 points': '9',
    '10 points': '10',
    '12 points': '12',
    '15 points': '15',
    '20 points': '20',
    'one point': '1',
    'two points': '2',
    'three points': '3',
    'four points': '4',
    'five points': '5',
    'six points': '6',
    'seven points': '7',
    'eight points': '8',
    'nine points': '9',
    'ten points': '10',
    'twelve points': '12',
    'unlimited': 'Unlimited',
  },

  // ========== Circuit Number ==========
  circuitNumber: {
    ...SPOKEN_NUMBERS,
    'c1': '1',
    'c2': '2',
    'c3': '3',
    'c4': '4',
    'c5': '5',
    'c6': '6',
    'c7': '7',
    'c8': '8',
    'c9': '9',
    'c10': '10',
    'c11': '11',
    'c12': '12',
    'circuit 1': '1',
    'circuit 2': '2',
    'circuit 3': '3',
    'circuit 4': '4',
    'circuit 5': '5',
    'circuit 6': '6',
    'circuit 7': '7',
    'circuit 8': '8',
    'circuit 9': '9',
    'circuit 10': '10',
    'circuit one': '1',
    'circuit two': '2',
    'circuit three': '3',
    'circuit four': '4',
    'circuit five': '5',
    'circuit six': '6',
  },
};

// ============================================================================
// NUMERIC VALUE NORMALISATION (for Zs, R1+R2, RCD trip time, etc.)
// ============================================================================

/**
 * Normalises spoken numeric values to standard format
 * Handles: "nought point four five" -> "0.45", "point three eight" -> "0.38"
 */
export function normaliseSpokenNumber(spoken: string): string {
  let normalised = spoken.toLowerCase().trim();

  // Handle "point" as decimal separator
  normalised = normalised.replace(/^point\s*/, '0.');
  normalised = normalised.replace(/\s*point\s*/g, '.');

  // Handle "nought" as zero
  normalised = normalised.replace(/nought/g, '0');
  normalised = normalised.replace(/naught/g, '0');
  normalised = normalised.replace(/zero/g, '0');

  // Handle individual spoken digits
  const digitMap: Record<string, string> = {
    'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
    'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
  };

  for (const [word, digit] of Object.entries(digitMap)) {
    // Replace spoken digit words (but not compound numbers like "twenty five")
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    normalised = normalised.replace(regex, digit);
  }

  // Handle spaces around numbers (e.g., "0 . 4 5" -> "0.45")
  normalised = normalised.replace(/\s+/g, '');

  // If result is numeric, return it
  if (/^[\d.]+$/.test(normalised)) {
    return normalised;
  }

  // Otherwise return original with basic cleanup
  return spoken.trim();
}

/**
 * Resolves a spoken value to the correct dropdown option value
 * @param field - The field name (e.g., 'polarity', 'rcdTestButton')
 * @param spokenValue - The value as spoken by the user
 * @returns The correct dropdown option value, or the original value if no mapping found
 */
export function resolveDropdownValue(field: string, spokenValue: string): string {
  if (!spokenValue) return spokenValue;

  const map = DROPDOWN_VALUE_MAPS[field];
  const normalised = spokenValue.toLowerCase().trim();

  // If we have a mapping for this field
  if (map) {
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
  }

  // For numeric fields (Zs, R1+R2, RCD trip time, etc.), try to normalise spoken numbers
  const numericFields = ['zs', 'r1r2', 'r2', 'rcdOneX', 'rcdFiveX', 'ringR1', 'ringRn', 'ringR2', 'pfc'];
  if (numericFields.includes(field)) {
    const normalised = normaliseSpokenNumber(spokenValue);
    // Validate it's a reasonable number
    const num = parseFloat(normalised);
    if (!isNaN(num)) {
      return normalised;
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
