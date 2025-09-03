// BS 7671 Appendix 4 - Voltage drop per ampere per metre (mV/A/m)
// Table 4Ab1 - Copper conductors

export interface VoltageDropData {
  cableSize: number;
  cableType: string;
  temperatureRating: '70C' | '90C';
  resistancePerKm: number; // mΩ/m
  reactancePerKm: number; // mΩ/m
  voltageDropSingle: number; // mV/A/m for single phase
  voltageDropThree: number; // mV/A/m for three phase
}

// BS 7671 Table 4Ab1 - Two-core cable, single-phase a.c.
export const copperTwinEarthVoltageDropData: VoltageDropData[] = [
  { cableSize: 1.0, cableType: 'pvc-twin-earth', temperatureRating: '70C', resistancePerKm: 18.1, reactancePerKm: 0, voltageDropSingle: 44, voltageDropThree: 38 },
  { cableSize: 1.5, cableType: 'pvc-twin-earth', temperatureRating: '70C', resistancePerKm: 12.1, reactancePerKm: 0, voltageDropSingle: 29, voltageDropThree: 25 },
  { cableSize: 2.5, cableType: 'pvc-twin-earth', temperatureRating: '70C', resistancePerKm: 7.41, reactancePerKm: 0, voltageDropSingle: 18, voltageDropThree: 15 },
  { cableSize: 4, cableType: 'pvc-twin-earth', temperatureRating: '70C', resistancePerKm: 4.61, reactancePerKm: 0, voltageDropSingle: 11, voltageDropThree: 9.5 },
  { cableSize: 6, cableType: 'pvc-twin-earth', temperatureRating: '70C', resistancePerKm: 3.08, reactancePerKm: 0, voltageDropSingle: 7.3, voltageDropThree: 6.4 },
  { cableSize: 10, cableType: 'pvc-twin-earth', temperatureRating: '70C', resistancePerKm: 1.83, reactancePerKm: 0, voltageDropSingle: 4.4, voltageDropThree: 3.8 },
  { cableSize: 16, cableType: 'pvc-twin-earth', temperatureRating: '70C', resistancePerKm: 1.15, reactancePerKm: 0, voltageDropSingle: 2.8, voltageDropThree: 2.4 },
  { cableSize: 25, cableType: 'pvc-twin-earth', temperatureRating: '70C', resistancePerKm: 0.727, reactancePerKm: 0, voltageDropSingle: 1.75, voltageDropThree: 1.5 },
  { cableSize: 35, cableType: 'pvc-twin-earth', temperatureRating: '70C', resistancePerKm: 0.524, reactancePerKm: 0, voltageDropSingle: 1.25, voltageDropThree: 1.09 },
  { cableSize: 50, cableType: 'pvc-twin-earth', temperatureRating: '70C', resistancePerKm: 0.387, reactancePerKm: 0, voltageDropSingle: 0.93, voltageDropThree: 0.80 },
];

// BS 7671 Table 4Ab2 - Single-core cables in flat formation (clipped direct)
export const copperSingleCoreVoltageDropData: VoltageDropData[] = [
  { cableSize: 1.0, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 18.1, reactancePerKm: 0.145, voltageDropSingle: 44, voltageDropThree: 38 },
  { cableSize: 1.5, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 12.1, reactancePerKm: 0.145, voltageDropSingle: 29, voltageDropThree: 25 },
  { cableSize: 2.5, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 7.41, reactancePerKm: 0.145, voltageDropSingle: 18, voltageDropThree: 15 },
  { cableSize: 4, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 4.61, reactancePerKm: 0.135, voltageDropSingle: 11, voltageDropThree: 9.5 },
  { cableSize: 6, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 3.08, reactancePerKm: 0.135, voltageDropSingle: 7.3, voltageDropThree: 6.4 },
  { cableSize: 10, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 1.83, reactancePerKm: 0.135, voltageDropSingle: 4.4, voltageDropThree: 3.8 },
  { cableSize: 16, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 1.15, reactancePerKm: 0.130, voltageDropSingle: 2.8, voltageDropThree: 2.4 },
  { cableSize: 25, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.727, reactancePerKm: 0.125, voltageDropSingle: 1.75, voltageDropThree: 1.5 },
  { cableSize: 35, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.524, reactancePerKm: 0.120, voltageDropSingle: 1.25, voltageDropThree: 1.09 },
  { cableSize: 50, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.387, reactancePerKm: 0.115, voltageDropSingle: 0.93, voltageDropThree: 0.80 },
  { cableSize: 70, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.268, reactancePerKm: 0.110, voltageDropSingle: 0.63, voltageDropThree: 0.55 },
  { cableSize: 95, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.193, reactancePerKm: 0.105, voltageDropSingle: 0.46, voltageDropThree: 0.40 },
  { cableSize: 120, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.153, reactancePerKm: 0.105, voltageDropSingle: 0.37, voltageDropThree: 0.32 },
  { cableSize: 150, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.124, reactancePerKm: 0.100, voltageDropSingle: 0.30, voltageDropThree: 0.26 },
  { cableSize: 185, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.0991, reactancePerKm: 0.095, voltageDropSingle: 0.24, voltageDropThree: 0.21 },
  { cableSize: 240, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.0754, reactancePerKm: 0.090, voltageDropSingle: 0.185, voltageDropThree: 0.16 },
  { cableSize: 300, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.0601, reactancePerKm: 0.085, voltageDropSingle: 0.148, voltageDropThree: 0.128 },
  { cableSize: 400, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.0470, reactancePerKm: 0.080, voltageDropSingle: 0.116, voltageDropThree: 0.100 },
  { cableSize: 500, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.0366, reactancePerKm: 0.080, voltageDropSingle: 0.093, voltageDropThree: 0.080 },
  { cableSize: 630, cableType: 'pvc-single', temperatureRating: '70C', resistancePerKm: 0.0291, reactancePerKm: 0.075, voltageDropSingle: 0.074, voltageDropThree: 0.064 },
];

// XLPE cable voltage drop data (90°C rating)
export const xlpeSingleCoreVoltageDropData: VoltageDropData[] = [
  { cableSize: 1.0, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 22.5, reactancePerKm: 0.145, voltageDropSingle: 44, voltageDropThree: 38 },
  { cableSize: 1.5, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 15.1, reactancePerKm: 0.145, voltageDropSingle: 29, voltageDropThree: 25 },
  { cableSize: 2.5, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 9.22, reactancePerKm: 0.145, voltageDropSingle: 18, voltageDropThree: 15 },
  { cableSize: 4, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 5.74, reactancePerKm: 0.135, voltageDropSingle: 11, voltageDropThree: 9.5 },
  { cableSize: 6, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 3.83, reactancePerKm: 0.135, voltageDropSingle: 7.3, voltageDropThree: 6.4 },
  { cableSize: 10, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 2.28, reactancePerKm: 0.135, voltageDropSingle: 4.4, voltageDropThree: 3.8 },
  { cableSize: 16, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 1.43, reactancePerKm: 0.130, voltageDropSingle: 2.8, voltageDropThree: 2.4 },
  { cableSize: 25, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.906, reactancePerKm: 0.125, voltageDropSingle: 1.75, voltageDropThree: 1.5 },
  { cableSize: 35, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.652, reactancePerKm: 0.120, voltageDropSingle: 1.25, voltageDropThree: 1.09 },
  { cableSize: 50, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.481, reactancePerKm: 0.115, voltageDropSingle: 0.93, voltageDropThree: 0.80 },
  { cableSize: 70, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.334, reactancePerKm: 0.110, voltageDropSingle: 0.63, voltageDropThree: 0.55 },
  { cableSize: 95, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.240, reactancePerKm: 0.105, voltageDropSingle: 0.46, voltageDropThree: 0.40 },
  { cableSize: 120, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.191, reactancePerKm: 0.105, voltageDropSingle: 0.37, voltageDropThree: 0.32 },
  { cableSize: 150, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.154, reactancePerKm: 0.100, voltageDropSingle: 0.30, voltageDropThree: 0.26 },
  { cableSize: 185, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.123, reactancePerKm: 0.095, voltageDropSingle: 0.24, voltageDropThree: 0.21 },
  { cableSize: 240, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.0938, reactancePerKm: 0.090, voltageDropSingle: 0.185, voltageDropThree: 0.16 },
  { cableSize: 300, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.0749, reactancePerKm: 0.085, voltageDropSingle: 0.148, voltageDropThree: 0.128 },
  { cableSize: 400, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.0585, reactancePerKm: 0.080, voltageDropSingle: 0.116, voltageDropThree: 0.100 },
  { cableSize: 500, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.0456, reactancePerKm: 0.080, voltageDropSingle: 0.093, voltageDropThree: 0.080 },
  { cableSize: 630, cableType: 'xlpe-single', temperatureRating: '90C', resistancePerKm: 0.0362, reactancePerKm: 0.075, voltageDropSingle: 0.074, voltageDropThree: 0.064 },
];

// Multicore cable voltage drop data
export const multicoreVoltageDropData: VoltageDropData[] = [
  { cableSize: 1.0, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 18.1, reactancePerKm: 0.080, voltageDropSingle: 44, voltageDropThree: 38 },
  { cableSize: 1.5, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 12.1, reactancePerKm: 0.080, voltageDropSingle: 29, voltageDropThree: 25 },
  { cableSize: 2.5, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 7.41, reactancePerKm: 0.080, voltageDropSingle: 18, voltageDropThree: 15 },
  { cableSize: 4, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 4.61, reactancePerKm: 0.075, voltageDropSingle: 11, voltageDropThree: 9.5 },
  { cableSize: 6, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 3.08, reactancePerKm: 0.075, voltageDropSingle: 7.3, voltageDropThree: 6.4 },
  { cableSize: 10, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 1.83, reactancePerKm: 0.075, voltageDropSingle: 4.4, voltageDropThree: 3.8 },
  { cableSize: 16, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 1.15, reactancePerKm: 0.070, voltageDropSingle: 2.8, voltageDropThree: 2.4 },
  { cableSize: 25, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 0.727, reactancePerKm: 0.070, voltageDropSingle: 1.75, voltageDropThree: 1.5 },
  { cableSize: 35, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 0.524, reactancePerKm: 0.070, voltageDropSingle: 1.25, voltageDropThree: 1.09 },
  { cableSize: 50, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 0.387, reactancePerKm: 0.065, voltageDropSingle: 0.93, voltageDropThree: 0.80 },
  { cableSize: 70, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 0.268, reactancePerKm: 0.065, voltageDropSingle: 0.63, voltageDropThree: 0.55 },
  { cableSize: 95, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 0.193, reactancePerKm: 0.065, voltageDropSingle: 0.46, voltageDropThree: 0.40 },
  { cableSize: 120, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 0.153, reactancePerKm: 0.060, voltageDropSingle: 0.37, voltageDropThree: 0.32 },
  { cableSize: 150, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 0.124, reactancePerKm: 0.060, voltageDropSingle: 0.30, voltageDropThree: 0.26 },
  { cableSize: 185, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 0.0991, reactancePerKm: 0.060, voltageDropSingle: 0.24, voltageDropThree: 0.21 },
  { cableSize: 240, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 0.0754, reactancePerKm: 0.055, voltageDropSingle: 0.185, voltageDropThree: 0.16 },
  { cableSize: 300, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 0.0601, reactancePerKm: 0.055, voltageDropSingle: 0.148, voltageDropThree: 0.128 },
  { cableSize: 400, cableType: 'pvc-multicore', temperatureRating: '70C', resistancePerKm: 0.0470, reactancePerKm: 0.055, voltageDropSingle: 0.116, voltageDropThree: 0.100 },
];

// Aluminium conductor voltage drop data
export const aluminiumVoltageDropData: VoltageDropData[] = [
  { cableSize: 16, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 1.91, reactancePerKm: 0.130, voltageDropSingle: 3.7, voltageDropThree: 3.2 },
  { cableSize: 25, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 1.20, reactancePerKm: 0.125, voltageDropSingle: 2.3, voltageDropThree: 2.0 },
  { cableSize: 35, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 0.868, reactancePerKm: 0.120, voltageDropSingle: 1.7, voltageDropThree: 1.4 },
  { cableSize: 50, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 0.641, reactancePerKm: 0.115, voltageDropSingle: 1.2, voltageDropThree: 1.1 },
  { cableSize: 70, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 0.443, reactancePerKm: 0.110, voltageDropSingle: 0.85, voltageDropThree: 0.73 },
  { cableSize: 95, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 0.320, reactancePerKm: 0.105, voltageDropSingle: 0.61, voltageDropThree: 0.53 },
  { cableSize: 120, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 0.253, reactancePerKm: 0.105, voltageDropSingle: 0.49, voltageDropThree: 0.42 },
  { cableSize: 150, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 0.206, reactancePerKm: 0.100, voltageDropSingle: 0.40, voltageDropThree: 0.34 },
  { cableSize: 185, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 0.164, reactancePerKm: 0.095, voltageDropSingle: 0.32, voltageDropThree: 0.27 },
  { cableSize: 240, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 0.125, reactancePerKm: 0.090, voltageDropSingle: 0.24, voltageDropThree: 0.21 },
  { cableSize: 300, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 0.100, reactancePerKm: 0.085, voltageDropSingle: 0.195, voltageDropThree: 0.167 },
  { cableSize: 400, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 0.0778, reactancePerKm: 0.080, voltageDropSingle: 0.153, voltageDropThree: 0.131 },
  { cableSize: 500, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 0.0605, reactancePerKm: 0.080, voltageDropSingle: 0.123, voltageDropThree: 0.105 },
  { cableSize: 630, cableType: 'aluminium-xlpe', temperatureRating: '90C', resistancePerKm: 0.0469, reactancePerKm: 0.075, voltageDropSingle: 0.097, voltageDropThree: 0.083 },
];

// Combined voltage drop data
export const allVoltageDropData: VoltageDropData[] = [
  ...copperTwinEarthVoltageDropData,
  ...copperSingleCoreVoltageDropData,
  ...xlpeSingleCoreVoltageDropData,
  ...multicoreVoltageDropData,
  ...aluminiumVoltageDropData,
];

// Helper functions
export const getVoltageDropData = (cableType: string, cableSize: number): VoltageDropData | null => {
  return allVoltageDropData.find(data => 
    data.cableType === cableType && data.cableSize === cableSize
  ) || null;
};

export const getAvailableCableSizesForVD = (cableType: string): number[] => {
  return allVoltageDropData
    .filter(data => data.cableType === cableType)
    .map(data => data.cableSize)
    .sort((a, b) => a - b);
};

export const interpolateVoltageDropData = (
  cableType: string, 
  targetSize: number
): VoltageDropData | null => {
  const typeData = allVoltageDropData
    .filter(data => data.cableType === cableType)
    .sort((a, b) => a.cableSize - b.cableSize);
    
  if (typeData.length === 0) return null;
  
  // Find exact match
  const exactMatch = typeData.find(data => data.cableSize === targetSize);
  if (exactMatch) return exactMatch;
  
  // Find interpolation bounds
  const lowerData = typeData.filter(data => data.cableSize < targetSize).pop();
  const upperData = typeData.find(data => data.cableSize > targetSize);
  
  if (!lowerData && !upperData) return null;
  if (!lowerData) return upperData!;
  if (!upperData) return lowerData;
  
  // Interpolate
  const ratio = (targetSize - lowerData.cableSize) / (upperData.cableSize - lowerData.cableSize);
  
  return {
    cableSize: targetSize,
    cableType,
    temperatureRating: lowerData.temperatureRating,
    resistancePerKm: lowerData.resistancePerKm + ratio * (upperData.resistancePerKm - lowerData.resistancePerKm),
    reactancePerKm: lowerData.reactancePerKm + ratio * (upperData.reactancePerKm - lowerData.reactancePerKm),
    voltageDropSingle: lowerData.voltageDropSingle + ratio * (upperData.voltageDropSingle - lowerData.voltageDropSingle),
    voltageDropThree: lowerData.voltageDropThree + ratio * (upperData.voltageDropThree - lowerData.voltageDropThree),
  };
};