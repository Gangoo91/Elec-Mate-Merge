// Protective device types
export const protectiveDeviceTypeOptions = [
  { value: 'MCB', label: 'MCB' },
  { value: 'RCBO', label: 'RCBO' },
  { value: 'RCD', label: 'RCD' },
  { value: 'Fuse', label: 'Fuse' },
  { value: 'Other', label: 'Other' },
];

// Protective device ratings — BS EN 60898 standard preferred values
export const protectiveDeviceRatingOptions = [
  { value: 'N/A', label: 'N/A' },
  { value: '2', label: '2A' },
  { value: '3', label: '3A' },
  { value: '4', label: '4A' },
  { value: '5', label: '5A' },
  { value: '6', label: '6A' },
  { value: '10', label: '10A' },
  { value: '13', label: '13A' },
  { value: '15', label: '15A' },
  { value: '16', label: '16A' },
  { value: '20', label: '20A' },
  { value: '25', label: '25A' },
  { value: '30', label: '30A' },
  { value: '32', label: '32A' },
  { value: '40', label: '40A' },
  { value: '45', label: '45A' },
  { value: '50', label: '50A' },
  // 60 A is a BS 3871 / BS 3036 preferred rating with no BS EN 60898
  // equivalent, and was missing — so an old 60 A breaker could not be
  // scheduled at all (ELE-1604).
  { value: '60', label: '60A' },
  { value: '63', label: '63A' },
  { value: '80', label: '80A' },
  { value: '100', label: '100A' },
  { value: '125', label: '125A' },
  { value: '160', label: '160A' },
  { value: 'LIM', label: 'LIM' },
];

// BS Standards for protective devices
export const bsStandardOptions = [
  { value: 'N/A', label: 'N/A' },
  { value: 'MCB (BS EN 60898)', label: 'MCB (BS EN 60898)' },
  // Withdrawn, and present in a great many older boards — an EICR records what
  // is installed. Superseded by BS EN 60898-1:2019 (ELE-1604).
  { value: 'MCB (BS 3871)', label: 'MCB (BS 3871)' },
  { value: 'RCBO (BS EN 61009)', label: 'RCBO (BS EN 61009)' },
  { value: 'RCD (BS EN 61008)', label: 'RCD (BS EN 61008)' },
  { value: 'Fuse (BS 88)', label: 'Fuse (BS 88)' },
  { value: 'Fuse (BS 1361)', label: 'Fuse (BS 1361)' },
  { value: 'Fuse (BS 3036)', label: 'Fuse (BS 3036)' },
  { value: 'MCCB (BS EN 60947)', label: 'MCCB (BS EN 60947)' },
  { value: 'Other', label: 'Other' },
];

// RCD-specific BS Standards (for RCD Details section)
export const rcdBsStandardOptions = [
  { value: 'N/A', label: 'N/A' },
  { value: 'RCD (BS EN 61008)', label: 'RCD (BS EN 61008)' },
  { value: 'RCBO (BS EN 61009)', label: 'RCBO (BS EN 61009)' },
  // Socket-outlet / portable RCDs — the header bulk-fill offers this, so the
  // per-cell picker must be able to produce and re-select the same value
  { value: 'RCD (BS 7288)', label: 'RCD (BS 7288)' },
  { value: 'Type F (BS EN 62423)', label: 'Type F (BS EN 62423)' },
  { value: 'RCCB (BS EN 60947-2)', label: 'RCCB (BS EN 60947-2)' },
  { value: 'Other', label: 'Other' },
];

// MCB Curve Type Options (Tripping Characteristics)
// BS 7671 compliant - only B, C, D curves for BS EN 60898/61009
export const protectiveDeviceCurveOptions = [
  { value: 'N/A', label: 'N/A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
];

/**
 * BS 3871-1 breaker types — ELE-1604.
 *
 * A different numbering scheme, not a rename of B/C/D. Labels carry the trip
 * multiple because that is the whole reason the distinction matters: an old
 * Type 1 (4x In) scheduled as a Type B (5x In) gets a Max Zs 20% too low and
 * can be failed for a fault it does not have.
 */
export const bs3871TypeOptions = [
  { value: 'N/A', label: 'N/A' },
  { value: '1', label: 'Type 1 (4×In)' },
  { value: '2', label: 'Type 2 (7×In)' },
  { value: '3', label: 'Type 3 (10×In)' },
  { value: '4', label: 'Type 4 (50×In)' },
];

/** True when the BS standard on the row is the withdrawn BS 3871-1. */
export const isBs3871Standard = (bsStandard: string): boolean =>
  /3871/.test(bsStandard || '');

/**
 * The Type/curve options valid for a given BS standard. The schedule's Type
 * column is one control serving both families, and offering B/C/D against a
 * BS 3871 device (or 1/2/3/4 against a BS EN 60898 one) invites exactly the
 * mis-selection that produces a wrong Max Zs.
 */
export const getCurveOptionsForStandard = (bsStandard: string) =>
  isBs3871Standard(bsStandard) ? bs3871TypeOptions : protectiveDeviceCurveOptions;

/**
 * Does a bulk "fill all Type" value apply to a row carrying this BS standard?
 *
 * B/C/D belong to BS EN 60898 / 61009 / 60947; 1–4 to BS 3871. Filling across
 * that boundary writes a Type the device cannot have — and because the cell
 * only renders options from its own family, the row then shows an empty Type
 * while the stored data says otherwise.
 *
 * Matches on the standard's NUMBER rather than the exact combined label, so
 * the raw forms the EICR→EIC conversion produces ('BS EN 60898-1') are covered
 * too — the old exact-string test silently skipped those rows (cf. ELE-1391).
 */
/**
 * Is a Type/curve value valid for the standard on the row?
 *
 * B/C/D belong to BS EN 60898/61009/60947; 1–4 to BS 3871. Anything else
 * (blank, 'N/A') is left alone — those are legitimate states, not mismatches.
 */
export const curveMatchesStandard = (curve: string, bsStandard: string): boolean => {
  const c = (curve || '').trim();
  if (!c || c === 'N/A') return true;
  return isBs3871Standard(bsStandard) ? /^[1-4]$/.test(c) : !/^[1-4]$/.test(c);
};

/**
 * ELE-1604 — what a BS-standard change must clear on the row.
 *
 * The two families use incompatible Type vocabularies, so carrying a 'B'
 * across to a BS 3871 row leaves the Type cell rendering an empty select while
 * the data still says 'B' — the same "looks unset, isn't" trap the scheme
 * picker fell into (ELE-1570). Worse, the Max Zs derived from the old curve
 * stays on the row and prints on the certificate as a judged value.
 *
 * 🔴 This lives here, not in a component, because the schedule has THREE
 * surfaces that each own a `handleBsStandardChange` — the desktop cells, the
 * mobile scroll row, and the mobile card. Putting the rule in one of them is
 * how it ends up applying on one screen and not the others; that is exactly
 * what happened on the first cut of this fix, caught by testing the mobile
 * row in the running app after the desktop one was already right.
 */
export const clearOnStandardChange = (
  nextStandard: string,
  currentCurve: string
): { protectiveDeviceCurve: string; maxZs: string } | null =>
  curveMatchesStandard(currentCurve, nextStandard)
    ? null
    : { protectiveDeviceCurve: '', maxZs: '' };

export const curveFillApplies = (value: string, bsStandard: string): boolean => {
  const bs = bsStandard || '';
  if (isBs3871Standard(bs)) return /^[1-4]$/.test(value);
  if (/60898|61009|60947/.test(bs)) return /^[BCD]$/.test(value);
  return false;
};

// Auto-selection mapping functions
export const getDefaultBsStandard = (deviceType: string): string => {
  switch (deviceType) {
    case 'MCB':
      return 'MCB (BS EN 60898)';
    case 'RCBO':
      return 'RCBO (BS EN 61009)';
    case 'RCD':
      return 'RCD (BS EN 61008)';
    case 'Fuse':
      return 'Fuse (BS 1361)'; // Default to domestic cartridge fuse
    default:
      return '';
  }
};

export const getDefaultKaRating = (deviceType: string, rating: string): string => {
  const ratingNum = parseInt(rating);

  switch (deviceType) {
    case 'MCB':
      return ratingNum <= 50 ? '6' : '10';
    case 'RCBO':
      return ratingNum <= 40 ? '6' : '10';
    case 'RCD':
      return '6';
    case 'Fuse':
      return '16.5'; // BS 1361 domestic cartridge fuse
    default:
      return '';
  }
};

// Check if a BS standard requires a curve (MCB/RCBO only)
// A curve (B/C/D) is meaningful only for MCB / RCBO / MCCB. Match whatever form
// the BS standard is stored in — combined ("MCB (BS EN 60898)"), raw
// ("BS EN 60898-1", as the EICR→EIC conversion produces), or short ("MCB"). The
// old exact-string check missed the raw form, so the curve/TYPE column went
// blank on converted EICs (ELE-1391).
export const bsStandardRequiresCurve = (bsStandard: string): boolean =>
  /MCB|RCBO|MCCB|60898|61009|60947/i.test(bsStandard || '');

// Protective device options with Zs limits for validation
// BS 7671 Table 41.3 - MCBs to BS EN 60898 and RCBOs to BS EN 61009. The values
// satisfy both the 0.4 s and the 5 s disconnection time (Reg 411.4.202).
export const protectiveDeviceOptions = [
  // Type B MCBs - Table 41.3(a)
  { value: 'B6', label: 'MCB B6', zsLimit: 7.28 },
  { value: 'B10', label: 'MCB B10', zsLimit: 4.37 },
  { value: 'B16', label: 'MCB B16', zsLimit: 2.73 },
  { value: 'B20', label: 'MCB B20', zsLimit: 2.19 },
  { value: 'B25', label: 'MCB B25', zsLimit: 1.75 },
  { value: 'B32', label: 'MCB B32', zsLimit: 1.37 },
  { value: 'B40', label: 'MCB B40', zsLimit: 1.09 },
  { value: 'B50', label: 'MCB B50', zsLimit: 0.87 },
  { value: 'B63', label: 'MCB B63', zsLimit: 0.69 },
  { value: 'B80', label: 'MCB B80', zsLimit: 0.55 },
  { value: 'B100', label: 'MCB B100', zsLimit: 0.44 },
  { value: 'B125', label: 'MCB B125', zsLimit: 0.35 },
  // Type C MCBs - Table 41.3(b)
  { value: 'C6', label: 'MCB C6', zsLimit: 3.64 },
  { value: 'C10', label: 'MCB C10', zsLimit: 2.19 },
  { value: 'C16', label: 'MCB C16', zsLimit: 1.37 },
  { value: 'C20', label: 'MCB C20', zsLimit: 1.09 },
  { value: 'C25', label: 'MCB C25', zsLimit: 0.87 },
  { value: 'C32', label: 'MCB C32', zsLimit: 0.68 },
  { value: 'C40', label: 'MCB C40', zsLimit: 0.55 },
  { value: 'C50', label: 'MCB C50', zsLimit: 0.44 },
  { value: 'C63', label: 'MCB C63', zsLimit: 0.35 },
  { value: 'C80', label: 'MCB C80', zsLimit: 0.27 },
  { value: 'C100', label: 'MCB C100', zsLimit: 0.22 },
  { value: 'C125', label: 'MCB C125', zsLimit: 0.17 },
  // Type D MCBs - Table 41.3(c)
  { value: 'D6', label: 'MCB D6', zsLimit: 1.82 },
  { value: 'D10', label: 'MCB D10', zsLimit: 1.09 },
  { value: 'D16', label: 'MCB D16', zsLimit: 0.68 },
  { value: 'D20', label: 'MCB D20', zsLimit: 0.55 },
  { value: 'D25', label: 'MCB D25', zsLimit: 0.44 },
  { value: 'D32', label: 'MCB D32', zsLimit: 0.34 },
  { value: 'D40', label: 'MCB D40', zsLimit: 0.27 },
  { value: 'D50', label: 'MCB D50', zsLimit: 0.22 },
  { value: 'D63', label: 'MCB D63', zsLimit: 0.17 },
  { value: 'D80', label: 'MCB D80', zsLimit: 0.14 },
  { value: 'D100', label: 'MCB D100', zsLimit: 0.11 },
  { value: 'D125', label: 'MCB D125', zsLimit: 0.09 },
];
