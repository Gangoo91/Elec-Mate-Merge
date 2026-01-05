
// Protective device types
export const protectiveDeviceTypeOptions = [
  { value: 'MCB', label: 'MCB' },
  { value: 'RCBO', label: 'RCBO' },
  { value: 'RCD', label: 'RCD' },
  { value: 'Fuse', label: 'Fuse' },
  { value: 'Other', label: 'Other' }
];

// Protective device ratings
export const protectiveDeviceRatingOptions = [
  { value: '6', label: '6A' },
  { value: '10', label: '10A' },
  { value: '16', label: '16A' },
  { value: '20', label: '20A' },
  { value: '25', label: '25A' },
  { value: '32', label: '32A' },
  { value: '40', label: '40A' },
  { value: '50', label: '50A' },
  { value: '63', label: '63A' },
  { value: '80', label: '80A' },
  { value: '100', label: '100A' }
];

// BS Standards for protective devices
export const bsStandardOptions = [
  { value: 'MCB (BS EN 60898)', label: 'MCB (BS EN 60898)' },
  { value: 'RCBO (BS EN 61009)', label: 'RCBO (BS EN 61009)' },
  { value: 'RCD (BS EN 61008)', label: 'RCD (BS EN 61008)' },
  { value: 'Fuse (BS 88)', label: 'Fuse (BS 88)' },
  { value: 'Fuse (BS 1361)', label: 'Fuse (BS 1361)' },
  { value: 'Fuse (BS 3036)', label: 'Fuse (BS 3036)' },
  { value: 'Other', label: 'Other' }
];

// RCD-specific BS Standards (for RCD Details section)
export const rcdBsStandardOptions = [
  { value: 'RCD (BS EN 61008)', label: 'RCD (BS EN 61008)' },
  { value: 'RCBO (BS EN 61009)', label: 'RCBO (BS EN 61009)' },
  { value: 'RCD (BS 7288)', label: 'RCD (BS 7288)' },
  { value: 'Other', label: 'Other' }
];

// MCB Curve Type Options (Tripping Characteristics)
// BS 7671 compliant - only B, C, D curves for BS EN 60898/61009
export const protectiveDeviceCurveOptions = [
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
];

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
export const bsStandardRequiresCurve = (bsStandard: string): boolean => {
  return bsStandard === 'MCB (BS EN 60898)' || bsStandard === 'RCBO (BS EN 61009)';
};


// Protective device options with Zs limits for validation
// BS 7671 Table 41.3 - MCBs to BS EN 60898 and RCBOs to BS EN 61009 (0.4s disconnection)
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
  { value: 'D125', label: 'MCB D125', zsLimit: 0.09 }
];
