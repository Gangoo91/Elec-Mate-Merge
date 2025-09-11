// BS 7671 Appendix 4 Cable Current Capacities
// Extended datasets covering all standard cable types and sizes

export interface CableCapacity {
  size: number;
  capacity: number;
  resistance?: number; // mΩ/m
  reactance?: number; // mΩ/m
}

// BS 7671 Table 4D1A - PVC insulated cables, non-armoured (70°C)
export const pvcSingleCapacities: CableCapacity[] = [
  { size: 1.0, capacity: 15, resistance: 18.1, reactance: 0.14 },
  { size: 1.5, capacity: 20, resistance: 12.1, reactance: 0.13 },
  { size: 2.5, capacity: 26, resistance: 7.41, reactance: 0.12 },
  { size: 4, capacity: 35, resistance: 4.61, reactance: 0.11 },
  { size: 6, capacity: 46, resistance: 3.08, reactance: 0.11 },
  { size: 10, capacity: 63, resistance: 1.83, reactance: 0.10 },
  { size: 16, capacity: 85, resistance: 1.15, reactance: 0.095 },
  { size: 25, capacity: 112, resistance: 0.727, reactance: 0.090 },
  { size: 35, capacity: 138, resistance: 0.524, reactance: 0.085 },
  { size: 50, capacity: 168, resistance: 0.387, reactance: 0.082 },
  { size: 70, capacity: 207, resistance: 0.268, reactance: 0.079 },
  { size: 95, capacity: 245, resistance: 0.193, reactance: 0.077 },
  { size: 120, capacity: 284, resistance: 0.153, reactance: 0.075 },
  { size: 150, capacity: 323, resistance: 0.124, reactance: 0.074 },
  { size: 185, capacity: 362, resistance: 0.0991, reactance: 0.073 },
  { size: 240, capacity: 415, resistance: 0.0754, reactance: 0.072 },
  { size: 300, capacity: 467, resistance: 0.0601, reactance: 0.071 },
  { size: 400, capacity: 530, resistance: 0.0470, reactance: 0.070 },
  { size: 500, capacity: 590, resistance: 0.0366, reactance: 0.069 },
  { size: 630, capacity: 663, resistance: 0.0283, reactance: 0.068 }
];

// BS 7671 Table 4D2A - XLPE insulated cables, non-armoured (90°C)
export const xlpeSingleCapacities: CableCapacity[] = [
  { size: 1.0, capacity: 17, resistance: 18.1, reactance: 0.14 },
  { size: 1.5, capacity: 23, resistance: 12.1, reactance: 0.13 },
  { size: 2.5, capacity: 31, resistance: 7.41, reactance: 0.12 },
  { size: 4, capacity: 42, resistance: 4.61, reactance: 0.11 },
  { size: 6, capacity: 54, resistance: 3.08, reactance: 0.11 },
  { size: 10, capacity: 75, resistance: 1.83, reactance: 0.10 },
  { size: 16, capacity: 100, resistance: 1.15, reactance: 0.095 },
  { size: 25, capacity: 133, resistance: 0.727, reactance: 0.090 },
  { size: 35, capacity: 164, resistance: 0.524, reactance: 0.085 },
  { size: 50, capacity: 200, resistance: 0.387, reactance: 0.082 },
  { size: 70, capacity: 246, resistance: 0.268, reactance: 0.079 },
  { size: 95, capacity: 291, resistance: 0.193, reactance: 0.077 },
  { size: 120, capacity: 337, resistance: 0.153, reactance: 0.075 },
  { size: 150, capacity: 383, resistance: 0.124, reactance: 0.074 },
  { size: 185, capacity: 430, resistance: 0.0991, reactance: 0.073 },
  { size: 240, capacity: 493, resistance: 0.0754, reactance: 0.072 },
  { size: 300, capacity: 555, resistance: 0.0601, reactance: 0.071 },
  { size: 400, capacity: 630, resistance: 0.0470, reactance: 0.070 },
  { size: 500, capacity: 701, resistance: 0.0366, reactance: 0.069 },
  { size: 630, capacity: 787, resistance: 0.0283, reactance: 0.068 }
];

// BS 7671 Table 4D4A - PVC insulated and sheathed cables (T&E) (70°C)
export const pvcTwinEarthCapacities: CableCapacity[] = [
  { size: 1.0, capacity: 13, resistance: 18.1, reactance: 0.14 },
  { size: 1.5, capacity: 16, resistance: 12.1, reactance: 0.13 },
  { size: 2.5, capacity: 23, resistance: 7.41, reactance: 0.12 },
  { size: 4, capacity: 30, resistance: 4.61, reactance: 0.11 },
  { size: 6, capacity: 38, resistance: 3.08, reactance: 0.11 },
  { size: 10, capacity: 52, resistance: 1.83, reactance: 0.10 },
  { size: 16, capacity: 69, resistance: 1.15, reactance: 0.095 },
  { size: 25, capacity: 87, resistance: 0.727, reactance: 0.090 },
  { size: 35, capacity: 105, resistance: 0.524, reactance: 0.085 },
  { size: 50, capacity: 125, resistance: 0.387, reactance: 0.082 }
];

// BS 7671 Table 4D4B - XLPE insulated twin and earth cables (90°C)
export const xlpeTwinEarthCapacities: CableCapacity[] = [
  { size: 1.0, capacity: 15, resistance: 18.1, reactance: 0.14 },
  { size: 1.5, capacity: 20, resistance: 12.1, reactance: 0.13 },
  { size: 2.5, capacity: 27, resistance: 7.41, reactance: 0.12 },
  { size: 4, capacity: 37, resistance: 4.61, reactance: 0.11 },
  { size: 6, capacity: 47, resistance: 3.08, reactance: 0.11 },
  { size: 10, capacity: 65, resistance: 1.83, reactance: 0.10 },
  { size: 16, capacity: 87, resistance: 1.15, reactance: 0.095 },
  { size: 25, capacity: 114, resistance: 0.727, reactance: 0.090 },
  { size: 35, capacity: 141, resistance: 0.524, reactance: 0.085 },
  { size: 50, capacity: 169, resistance: 0.387, reactance: 0.082 }
];

// BS 7671 Table 4D5A - SWA cables, multicore (70°C/90°C)
export const swaCapacities: CableCapacity[] = [
  { size: 1.5, capacity: 19, resistance: 12.1, reactance: 0.13 },
  { size: 2.5, capacity: 26, resistance: 7.41, reactance: 0.12 },
  { size: 4, capacity: 35, resistance: 4.61, reactance: 0.11 },
  { size: 6, capacity: 45, resistance: 3.08, reactance: 0.11 },
  { size: 10, capacity: 61, resistance: 1.83, reactance: 0.10 },
  { size: 16, capacity: 81, resistance: 1.15, reactance: 0.095 },
  { size: 25, capacity: 106, resistance: 0.727, reactance: 0.090 },
  { size: 35, capacity: 129, resistance: 0.524, reactance: 0.085 },
  { size: 50, capacity: 155, resistance: 0.387, reactance: 0.082 },
  { size: 70, capacity: 190, resistance: 0.268, reactance: 0.079 },
  { size: 95, capacity: 225, resistance: 0.193, reactance: 0.077 },
  { size: 120, capacity: 259, resistance: 0.153, reactance: 0.075 },
  { size: 150, capacity: 293, resistance: 0.124, reactance: 0.074 },
  { size: 185, capacity: 329, resistance: 0.0991, reactance: 0.073 },
  { size: 240, capacity: 377, resistance: 0.0754, reactance: 0.072 },
  { size: 300, capacity: 425, resistance: 0.0601, reactance: 0.071 },
  { size: 400, capacity: 483, resistance: 0.0470, reactance: 0.070 },
  { size: 500, capacity: 538, resistance: 0.0366, reactance: 0.069 },
  { size: 630, capacity: 605, resistance: 0.0283, reactance: 0.068 }
];

// MICC (Mineral Insulated) cables - 70°C/250°C depending on termination
export const miccCapacities: CableCapacity[] = [
  { size: 1.0, capacity: 18, resistance: 18.1, reactance: 0.10 },
  { size: 1.5, capacity: 23, resistance: 12.1, reactance: 0.10 },
  { size: 2.5, capacity: 31, resistance: 7.41, reactance: 0.10 },
  { size: 4, capacity: 42, resistance: 4.61, reactance: 0.10 },
  { size: 6, capacity: 54, resistance: 3.08, reactance: 0.10 },
  { size: 10, capacity: 73, resistance: 1.83, reactance: 0.10 },
  { size: 16, capacity: 95, resistance: 1.15, reactance: 0.10 },
  { size: 25, capacity: 119, resistance: 0.727, reactance: 0.10 },
  { size: 35, capacity: 142, resistance: 0.524, reactance: 0.10 },
  { size: 50, capacity: 166, resistance: 0.387, reactance: 0.10 }
];

// Aluminium conductor capacities (90°C XLPE)
export const aluminiumXlpeCapacities: CableCapacity[] = [
  { size: 16, capacity: 76, resistance: 1.91, reactance: 0.095 },
  { size: 25, capacity: 101, resistance: 1.20, reactance: 0.090 },
  { size: 35, capacity: 125, resistance: 0.868, reactance: 0.085 },
  { size: 50, capacity: 152, resistance: 0.641, reactance: 0.082 },
  { size: 70, capacity: 187, resistance: 0.443, reactance: 0.079 },
  { size: 95, capacity: 221, resistance: 0.320, reactance: 0.077 },
  { size: 120, capacity: 255, resistance: 0.253, reactance: 0.075 },
  { size: 150, capacity: 289, resistance: 0.206, reactance: 0.074 },
  { size: 185, capacity: 324, resistance: 0.164, reactance: 0.073 },
  { size: 240, capacity: 371, resistance: 0.125, reactance: 0.072 },
  { size: 300, capacity: 418, resistance: 0.100, reactance: 0.071 },
  { size: 400, capacity: 474, resistance: 0.0778, reactance: 0.070 },
  { size: 500, capacity: 527, resistance: 0.0605, reactance: 0.069 },
  { size: 630, capacity: 592, resistance: 0.0469, reactance: 0.068 }
];

export const cableCapacityData = {
  'pvc-single': pvcSingleCapacities,
  'xlpe-single': xlpeSingleCapacities,
  'pvc-twin-earth': pvcTwinEarthCapacities,
  'xlpe-twin-earth': xlpeTwinEarthCapacities, // Proper XLPE twin & earth capacities
  'swa': swaCapacities,
  'micc': miccCapacities,
  'aluminium-xlpe': aluminiumXlpeCapacities,
};

export type CableType = 
  | 'pvc-single' 
  | 'xlpe-single'
  | 'pvc-twin-earth'
  | 'xlpe-twin-earth'  // Added for XLPE twin and earth cables
  | 'swa'
  | 'micc'
  | 'aluminium-xlpe';

export const getCableCapacity = (
  cableType: CableType,
  size: number
): CableCapacity | null => {
  const data = cableCapacityData[cableType];
  if (!data) return null;
  
  // Find exact match first
  const exactMatch = data.find(cable => cable.size === size);
  if (exactMatch) return exactMatch;
  
  // Find next size up for safety
  const nextSizeUp = data
    .filter(cable => cable.size > size)
    .sort((a, b) => a.size - b.size)[0];
  
  return nextSizeUp || null;
};

export const getNextCableSize = (
  cableType: CableType,
  currentSize: number
): CableCapacity | null => {
  const data = cableCapacityData[cableType];
  if (!data) return null;
  
  const nextSize = data
    .filter(cable => cable.size > currentSize)
    .sort((a, b) => a.size - b.size)[0];
  
  return nextSize || null;
};