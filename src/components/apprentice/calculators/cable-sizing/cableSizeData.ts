
export interface CableSizeOption {
  value: string;
  size: string;
  currentRating: {
    pvc: number;
    xlpe: number;
    swa?: number;  // Added SWA rating
    lsf?: number;  // Added Low Smoke and Fume rating
    armored?: number; // Added general armored rating
  };
  voltageDropPerAmpereMeter: number;
  calculatedVoltageDrop?: number;
  meetsVoltageDrop?: boolean;
  cableType: 'single' | 'twin-and-earth' | 'swa' | 'lsf' | 'armored' | 'heat-resistant';
}

// Cable data - expanded with various cable types
export const cableSizes: CableSizeOption[] = [
  // Single core PVC/XLPE cables
  {
    value: "1.5-single",
    size: "1.5 mm²",
    currentRating: { pvc: 17, xlpe: 20 },
    voltageDropPerAmpereMeter: 0.029,
    cableType: 'single'
  },
  {
    value: "2.5-single",
    size: "2.5 mm²",
    currentRating: { pvc: 23, xlpe: 28 },
    voltageDropPerAmpereMeter: 0.018,
    cableType: 'single'
  },
  {
    value: "4-single",
    size: "4 mm²",
    currentRating: { pvc: 31, xlpe: 38 },
    voltageDropPerAmpereMeter: 0.011,
    cableType: 'single'
  },
  {
    value: "6-single",
    size: "6 mm²",
    currentRating: { pvc: 40, xlpe: 49 },
    voltageDropPerAmpereMeter: 0.0074,
    cableType: 'single'
  },
  {
    value: "10-single",
    size: "10 mm²",
    currentRating: { pvc: 54, xlpe: 67 },
    voltageDropPerAmpereMeter: 0.0044,
    cableType: 'single'
  },
  {
    value: "16-single",
    size: "16 mm²",
    currentRating: { pvc: 73, xlpe: 89 },
    voltageDropPerAmpereMeter: 0.0028,
    cableType: 'single'
  },
  {
    value: "25-single",
    size: "25 mm²",
    currentRating: { pvc: 95, xlpe: 118 },
    voltageDropPerAmpereMeter: 0.0018,
    cableType: 'single'
  },
  {
    value: "35-single",
    size: "35 mm²",
    currentRating: { pvc: 117, xlpe: 145 },
    voltageDropPerAmpereMeter: 0.0013,
    cableType: 'single'
  },
  
  // Twin and Earth cables
  {
    value: "1-twin",
    size: "1 mm² T&E",
    currentRating: { pvc: 13, xlpe: 15 },
    voltageDropPerAmpereMeter: 0.044,
    cableType: 'twin-and-earth'
  },
  {
    value: "1.5-twin",
    size: "1.5 mm² T&E",
    currentRating: { pvc: 16, xlpe: 19 },
    voltageDropPerAmpereMeter: 0.029,
    cableType: 'twin-and-earth'
  },
  {
    value: "2.5-twin",
    size: "2.5 mm² T&E",
    currentRating: { pvc: 22, xlpe: 26 },
    voltageDropPerAmpereMeter: 0.018,
    cableType: 'twin-and-earth'
  },
  {
    value: "4-twin",
    size: "4 mm² T&E",
    currentRating: { pvc: 29, xlpe: 35 },
    voltageDropPerAmpereMeter: 0.011,
    cableType: 'twin-and-earth'
  },
  {
    value: "6-twin",
    size: "6 mm² T&E",
    currentRating: { pvc: 38, xlpe: 45 },
    voltageDropPerAmpereMeter: 0.0074,
    cableType: 'twin-and-earth'
  },
  {
    value: "10-twin",
    size: "10 mm² T&E",
    currentRating: { pvc: 51, xlpe: 60 },
    voltageDropPerAmpereMeter: 0.0044,
    cableType: 'twin-and-earth'
  },
  
  // SWA - Steel Wire Armored cables (3-core)
  {
    value: "1.5-swa",
    size: "1.5 mm² SWA",
    currentRating: { pvc: 17, xlpe: 21, swa: 19 },
    voltageDropPerAmpereMeter: 0.029,
    cableType: 'swa'
  },
  {
    value: "2.5-swa",
    size: "2.5 mm² SWA",
    currentRating: { pvc: 23, xlpe: 28, swa: 26 },
    voltageDropPerAmpereMeter: 0.018,
    cableType: 'swa'
  },
  {
    value: "4-swa",
    size: "4 mm² SWA",
    currentRating: { pvc: 31, xlpe: 37, swa: 34 },
    voltageDropPerAmpereMeter: 0.011,
    cableType: 'swa'
  },
  {
    value: "6-swa",
    size: "6 mm² SWA",
    currentRating: { pvc: 39, xlpe: 47, swa: 44 },
    voltageDropPerAmpereMeter: 0.0074,
    cableType: 'swa'
  },
  {
    value: "10-swa",
    size: "10 mm² SWA",
    currentRating: { pvc: 52, xlpe: 63, swa: 58 },
    voltageDropPerAmpereMeter: 0.0044,
    cableType: 'swa'
  },
  {
    value: "16-swa",
    size: "16 mm² SWA",
    currentRating: { pvc: 69, xlpe: 83, swa: 77 },
    voltageDropPerAmpereMeter: 0.0028,
    cableType: 'swa'
  },
  {
    value: "25-swa",
    size: "25 mm² SWA",
    currentRating: { pvc: 90, xlpe: 110, swa: 100 },
    voltageDropPerAmpereMeter: 0.0018,
    cableType: 'swa'
  },
  {
    value: "35-swa",
    size: "35 mm² SWA",
    currentRating: { pvc: 111, xlpe: 135, swa: 125 },
    voltageDropPerAmpereMeter: 0.0013,
    cableType: 'swa'
  },
  
  // LSF (Low Smoke and Fume) cables
  {
    value: "1.5-lsf",
    size: "1.5 mm² LSF",
    currentRating: { pvc: 17, xlpe: 20, lsf: 19 },
    voltageDropPerAmpereMeter: 0.029,
    cableType: 'lsf'
  },
  {
    value: "2.5-lsf",
    size: "2.5 mm² LSF",
    currentRating: { pvc: 23, xlpe: 28, lsf: 26 },
    voltageDropPerAmpereMeter: 0.018,
    cableType: 'lsf'
  },
  {
    value: "4-lsf",
    size: "4 mm² LSF",
    currentRating: { pvc: 31, xlpe: 38, lsf: 35 },
    voltageDropPerAmpereMeter: 0.011,
    cableType: 'lsf'
  },
  {
    value: "6-lsf",
    size: "6 mm² LSF",
    currentRating: { pvc: 40, xlpe: 49, lsf: 45 },
    voltageDropPerAmpereMeter: 0.0074,
    cableType: 'lsf'
  },
  
  // Heat resistant cables
  {
    value: "1.5-heat",
    size: "1.5 mm² Heat Resistant",
    currentRating: { pvc: 17, xlpe: 22 },
    voltageDropPerAmpereMeter: 0.029,
    cableType: 'heat-resistant'
  },
  {
    value: "2.5-heat",
    size: "2.5 mm² Heat Resistant",
    currentRating: { pvc: 24, xlpe: 30 },
    voltageDropPerAmpereMeter: 0.018,
    cableType: 'heat-resistant'
  },
  {
    value: "4-heat",
    size: "4 mm² Heat Resistant",
    currentRating: { pvc: 32, xlpe: 40 },
    voltageDropPerAmpereMeter: 0.011,
    cableType: 'heat-resistant'
  },
];
