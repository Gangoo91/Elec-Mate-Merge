// BS 7671 Appendix 4 Cable Current Capacities
// Extended datasets with Reference Methods A1, A2, B, C, D, E, F, G

export interface CableCapacity {
  size: number;
  capacities: {
    [key: string]: number; // Reference Method (A1, A2, B, C, D, E, F, G) -> Current rating
  };
  resistance?: number; // mΩ/m
  reactance?: number; // mΩ/m
}

// BS 7671 Table 4D1A - PVC insulated cables, non-armoured (70°C)
// Reference Methods: A1=enclosed+insulated, A2=enclosed, B=trunking, C=clipped, E=tray, F=ladder, G=free air
export const pvcSingleCapacities: CableCapacity[] = [
  { size: 1.0, capacities: { A1: 11, A2: 13, B: 13.5, C: 15, E: 15, F: 15, G: 17 }, resistance: 18.1, reactance: 0.14 },
  { size: 1.5, capacities: { A1: 14, A2: 17, B: 17.5, C: 20, E: 20, F: 20, G: 22 }, resistance: 12.1, reactance: 0.13 },
  { size: 2.5, capacities: { A1: 19, A2: 23, B: 24, C: 27, E: 27, F: 27, G: 31 }, resistance: 7.41, reactance: 0.12 },
  { size: 4, capacities: { A1: 25, A2: 30, B: 32, C: 36, E: 36, F: 36, G: 41 }, resistance: 4.61, reactance: 0.11 },
  { size: 6, capacities: { A1: 32, A2: 38, B: 41, C: 46, E: 46, F: 46, G: 52 }, resistance: 3.08, reactance: 0.11 },
  { size: 10, capacities: { A1: 44, A2: 52, B: 57, C: 63, E: 63, F: 63, G: 71 }, resistance: 1.83, reactance: 0.10 },
  { size: 16, capacities: { A1: 59, A2: 69, B: 76, C: 85, E: 85, F: 85, G: 96 }, resistance: 1.15, reactance: 0.095 },
  { size: 25, capacities: { A1: 78, A2: 89, B: 96, C: 112, E: 112, F: 112, G: 126 }, resistance: 0.727, reactance: 0.090 },
  { size: 35, capacities: { A1: 95, A2: 110, B: 119, C: 138, E: 138, F: 138, G: 155 }, resistance: 0.524, reactance: 0.085 },
  { size: 50, capacities: { A1: 116, A2: 134, B: 144, C: 168, E: 168, F: 168, G: 189 }, resistance: 0.387, reactance: 0.082 },
  { size: 70, capacities: { A1: 143, A2: 164, B: 179, C: 207, E: 207, F: 207, G: 232 }, resistance: 0.268, reactance: 0.079 },
  { size: 95, capacities: { A1: 169, A2: 196, B: 213, C: 245, E: 245, F: 245, G: 275 }, resistance: 0.193, reactance: 0.077 },
  { size: 120, capacities: { A1: 196, A2: 225, B: 246, C: 284, E: 284, F: 284, G: 319 }, resistance: 0.153, reactance: 0.075 },
  { size: 150, capacities: { A1: 223, A2: 257, B: 280, C: 323, E: 323, F: 323, G: 362 }, resistance: 0.124, reactance: 0.074 },
  { size: 185, capacities: { A1: 250, A2: 289, B: 315, C: 362, E: 362, F: 362, G: 406 }, resistance: 0.0991, reactance: 0.073 },
  { size: 240, capacities: { A1: 287, A2: 330, B: 362, C: 415, E: 415, F: 415, G: 465 }, resistance: 0.0754, reactance: 0.072 },
  { size: 300, capacities: { A1: 322, A2: 371, B: 408, C: 467, E: 467, F: 467, G: 524 }, resistance: 0.0601, reactance: 0.071 },
  { size: 400, capacities: { A1: 366, A2: 421, B: 463, C: 530, E: 530, F: 530, G: 595 }, resistance: 0.0470, reactance: 0.070 },
  { size: 500, capacities: { A1: 408, A2: 469, B: 517, C: 590, E: 590, F: 590, G: 662 }, resistance: 0.0366, reactance: 0.069 },
  { size: 630, capacities: { A1: 458, A2: 527, B: 581, C: 663, E: 663, F: 663, G: 744 }, resistance: 0.0283, reactance: 0.068 }
];

// BS 7671 Table 4D2A - XLPE insulated cables, non-armoured (90°C)
export const xlpeSingleCapacities: CableCapacity[] = [
  { size: 1.0, capacities: { A1: 13, A2: 15, B: 16, C: 18, E: 18, F: 18, G: 20 }, resistance: 18.1, reactance: 0.14 },
  { size: 1.5, capacities: { A1: 17, A2: 20, B: 21, C: 24, E: 24, F: 24, G: 27 }, resistance: 12.1, reactance: 0.13 },
  { size: 2.5, capacities: { A1: 23, A2: 27, B: 29, C: 33, E: 33, F: 33, G: 37 }, resistance: 7.41, reactance: 0.12 },
  { size: 4, capacities: { A1: 30, A2: 36, B: 39, C: 45, E: 45, F: 45, G: 50 }, resistance: 4.61, reactance: 0.11 },
  { size: 6, capacities: { A1: 39, A2: 46, B: 50, C: 58, E: 58, F: 58, G: 64 }, resistance: 3.08, reactance: 0.11 },
  { size: 10, capacities: { A1: 53, A2: 63, B: 69, C: 79, E: 79, F: 79, G: 88 }, resistance: 1.83, reactance: 0.10 },
  { size: 16, capacities: { A1: 71, A2: 85, B: 93, C: 107, E: 107, F: 107, G: 119 }, resistance: 1.15, reactance: 0.095 },
  { size: 25, capacities: { A1: 94, A2: 110, B: 119, C: 138, E: 138, F: 138, G: 154 }, resistance: 0.727, reactance: 0.090 },
  { size: 35, capacities: { A1: 117, A2: 137, B: 148, C: 171, E: 171, F: 171, G: 191 }, resistance: 0.524, reactance: 0.085 },
  { size: 50, capacities: { A1: 144, A2: 167, B: 180, C: 209, E: 209, F: 209, G: 233 }, resistance: 0.387, reactance: 0.082 },
  { size: 70, capacities: { A1: 178, A2: 206, B: 223, C: 258, E: 258, F: 258, G: 288 }, resistance: 0.268, reactance: 0.079 },
  { size: 95, capacities: { A1: 212, A2: 246, B: 266, C: 308, E: 308, F: 308, G: 344 }, resistance: 0.193, reactance: 0.077 },
  { size: 120, capacities: { A1: 246, A2: 285, B: 308, C: 356, E: 356, F: 356, G: 398 }, resistance: 0.153, reactance: 0.075 },
  { size: 150, capacities: { A1: 280, A2: 324, B: 350, C: 406, E: 406, F: 406, G: 453 }, resistance: 0.124, reactance: 0.074 },
  { size: 185, capacities: { A1: 314, A2: 364, B: 394, C: 456, E: 456, F: 456, G: 509 }, resistance: 0.0991, reactance: 0.073 },
  { size: 240, capacities: { A1: 361, A2: 418, B: 452, C: 523, E: 523, F: 523, G: 584 }, resistance: 0.0754, reactance: 0.072 },
  { size: 300, capacities: { A1: 407, A2: 471, B: 509, C: 590, E: 590, F: 590, G: 659 }, resistance: 0.0601, reactance: 0.071 },
  { size: 400, capacities: { A1: 462, A2: 535, B: 578, C: 670, E: 670, F: 670, G: 748 }, resistance: 0.0470, reactance: 0.070 },
  { size: 500, capacities: { A1: 515, A2: 596, B: 644, C: 746, E: 746, F: 746, G: 833 }, resistance: 0.0366, reactance: 0.069 },
  { size: 630, capacities: { A1: 579, A2: 670, B: 724, C: 838, E: 838, F: 838, G: 936 }, resistance: 0.0283, reactance: 0.068 }
];

// BS 7671 Table 4D4A - PVC insulated and sheathed cables (T&E) (70°C)
// Clipped direct (C) or in conduit in insulated wall (A1)
export const pvcTwinEarthCapacities: CableCapacity[] = [
  { size: 1.0, capacities: { A1: 10, A2: 11, B: 11, C: 13, E: 13, F: 13 }, resistance: 18.1, reactance: 0.14 },
  { size: 1.5, capacities: { A1: 13, A2: 14, B: 14, C: 16, E: 16, F: 16 }, resistance: 12.1, reactance: 0.13 },
  { size: 2.5, capacities: { A1: 18, A2: 20, B: 20, C: 24, E: 24, F: 24 }, resistance: 7.41, reactance: 0.12 },
  { size: 4, capacities: { A1: 24, A2: 27, B: 27, C: 32, E: 32, F: 32 }, resistance: 4.61, reactance: 0.11 },
  { size: 6, capacities: { A1: 31, A2: 34, B: 34, C: 41, E: 41, F: 41 }, resistance: 3.08, reactance: 0.11 },
  { size: 10, capacities: { A1: 42, A2: 46, B: 46, C: 57, E: 57, F: 57 }, resistance: 1.83, reactance: 0.10 },
  { size: 16, capacities: { A1: 56, A2: 61, B: 61, C: 76, E: 76, F: 76 }, resistance: 1.15, reactance: 0.095 },
  { size: 25, capacities: { A1: 73, A2: 79, B: 79, C: 101, E: 101, F: 101 }, resistance: 0.727, reactance: 0.090 },
  { size: 35, capacities: { A1: 89, A2: 96, B: 96, C: 125, E: 125, F: 125 }, resistance: 0.524, reactance: 0.085 },
  { size: 50, capacities: { A1: 108, A2: 119, B: 119, C: 151, E: 151, F: 151 }, resistance: 0.387, reactance: 0.082 }
];

// BS 7671 Table 4D5 - Flat twin and earth cables with thermal insulation
// Methods 100e, 101e, 102e, 103e from Regulation 523.9
export interface ThermalInsulationCapacity {
  size: number;
  method100e: number; // Above ceiling, insulation ≤100mm
  method101e: number; // Above ceiling, insulation >100mm
  method102e: number; // Stud wall, not touching inner surface
  method103e: number; // Stud wall, touching inner surface
  methodA: number;    // Reference Method A
  methodB: number;    // Reference Method B
  methodC: number;    // Reference Method C (clipped direct)
}

export const flatTwinEarthThermalCapacities: ThermalInsulationCapacity[] = [
  { size: 1.0, method100e: 15, method101e: 10.5, method102e: 13, method103e: 8, methodA: 11.5, methodB: 13, methodC: 13 },
  { size: 1.5, method100e: 16, method101e: 13, method102e: 16, method103e: 10, methodA: 14.5, methodB: 16.5, methodC: 20 },
  { size: 2.5, method100e: 21, method101e: 17, method102e: 21, method103e: 13.5, methodA: 20, methodB: 23, methodC: 27 },
  { size: 4, method100e: 27, method101e: 22, method102e: 27, method103e: 18.5, methodA: 26, methodB: 30, methodC: 37 },
  { size: 6, method100e: 34, method101e: 27, method102e: 35, method103e: 23.5, methodA: 32, methodB: 38, methodC: 47 },
  { size: 10, method100e: 45, method101e: 36, method102e: 46, method103e: 32, methodA: 44, methodB: 52, methodC: 64 },
  { size: 16, method100e: 57, method101e: 46, method102e: 63, method103e: 42.5, methodA: 57, methodB: 69, methodC: 85 },
];

// BS 7671 Table 4D4B - XLPE insulated twin and earth cables (90°C)
export const xlpeTwinEarthCapacities: CableCapacity[] = [
  { size: 1.0, capacities: { A1: 12, A2: 13, B: 13, C: 16, E: 16, F: 16 }, resistance: 18.1, reactance: 0.14 },
  { size: 1.5, capacities: { A1: 16, A2: 17, B: 17, C: 20, E: 20, F: 20 }, resistance: 12.1, reactance: 0.13 },
  { size: 2.5, capacities: { A1: 22, A2: 24, B: 24, C: 30, E: 30, F: 30 }, resistance: 7.41, reactance: 0.12 },
  { size: 4, capacities: { A1: 30, A2: 33, B: 33, C: 40, E: 40, F: 40 }, resistance: 4.61, reactance: 0.11 },
  { size: 6, capacities: { A1: 38, A2: 42, B: 42, C: 51, E: 51, F: 51 }, resistance: 3.08, reactance: 0.11 },
  { size: 10, capacities: { A1: 52, A2: 57, B: 57, C: 70, E: 70, F: 70 }, resistance: 1.83, reactance: 0.10 },
  { size: 16, capacities: { A1: 69, A2: 76, B: 76, C: 94, E: 94, F: 94 }, resistance: 1.15, reactance: 0.095 },
  { size: 25, capacities: { A1: 91, A2: 99, B: 99, C: 125, E: 125, F: 125 }, resistance: 0.727, reactance: 0.090 },
  { size: 35, capacities: { A1: 112, A2: 122, B: 122, C: 156, E: 156, F: 156 }, resistance: 0.524, reactance: 0.085 },
  { size: 50, capacities: { A1: 135, A2: 148, B: 148, C: 188, E: 188, F: 188 }, resistance: 0.387, reactance: 0.082 }
];

// BS 7671 Table 4D4A - SWA cables, multicore armoured, XLPE 90°C
// Reference Methods: C (clipped direct), D (buried direct), E (on tray/ladder)
// Corrected from BS 7671:2018+A3:2024 Table 4D4A
// 2-core and 3-core ratings where applicable
export const swaCapacities: CableCapacity[] = [
  { size: 1.5, capacities: { C2: 24, C3: 21, D2: 29, D3: 24, E2: 27, E3: 22 }, resistance: 12.1, reactance: 0.13 },
  { size: 2.5, capacities: { C2: 33, C3: 28, D2: 38, D3: 31, E2: 36, E3: 29 }, resistance: 7.41, reactance: 0.12 },
  { size: 4, capacities: { C2: 45, C3: 38, D2: 49, D3: 40, E2: 48, E3: 38 }, resistance: 4.61, reactance: 0.11 },
  { size: 6, capacities: { C2: 57, C3: 48, D2: 60, D3: 49, E2: 61, E3: 49 }, resistance: 3.08, reactance: 0.11 },
  { size: 10, capacities: { C2: 78, C3: 66, D2: 79, D3: 64, E2: 84, E3: 68 }, resistance: 1.83, reactance: 0.10 },
  { size: 16, capacities: { C2: 104, C3: 88, D2: 100, D3: 81, E2: 110, E3: 88 }, resistance: 1.15, reactance: 0.095 },
  { size: 25, capacities: { C2: 137, C3: 114, D2: 126, D3: 101, E2: 146, E3: 117 }, resistance: 0.727, reactance: 0.090 },
  { size: 35, capacities: { C2: 167, C3: 139, D2: 150, D3: 120, E2: 180, E3: 144 }, resistance: 0.524, reactance: 0.085 },
  { size: 50, capacities: { C2: 202, C3: 167, D2: 177, D3: 141, E2: 219, E3: 175 }, resistance: 0.387, reactance: 0.082 },
  { size: 70, capacities: { C2: 251, C3: 207, D2: 213, D3: 169, E2: 275, E3: 219 }, resistance: 0.268, reactance: 0.079 },
  { size: 95, capacities: { C2: 302, C3: 248, D2: 249, D3: 197, E2: 335, E3: 267 }, resistance: 0.193, reactance: 0.077 },
  { size: 120, capacities: { C2: 350, C3: 286, D2: 281, D3: 222, E2: 392, E3: 311 }, resistance: 0.153, reactance: 0.075 },
  { size: 150, capacities: { C2: 398, C3: 324, D2: 312, D3: 246, E2: 449, E3: 356 }, resistance: 0.124, reactance: 0.074 },
  { size: 185, capacities: { C2: 451, C3: 366, D2: 346, D3: 272, E2: 514, E3: 406 }, resistance: 0.0991, reactance: 0.073 },
  { size: 240, capacities: { C2: 524, C3: 423, D2: 392, D3: 308, E2: 607, E3: 478 }, resistance: 0.0754, reactance: 0.072 },
  { size: 300, capacities: { C2: 594, C3: 478, D2: 437, D3: 342, E2: 694, E3: 545 }, resistance: 0.0601, reactance: 0.071 },
  { size: 400, capacities: { C2: 677, C3: 541, D2: 489, D3: 382, E2: 800, E3: 624 }, resistance: 0.0470, reactance: 0.070 },
];

// BS 7671 Table 4D3A - Single-core armoured cables (non-magnetic armour), 70°C PVC
// Reference Methods C and F with 2 cables or 3/4 cables
export const singleCoreArmouredCapacities: CableCapacity[] = [
  { size: 50, capacities: { 'C-2c': 193, 'C-3c': 179, 'F-2c': 205, 'F-3c': 189 }, resistance: 0.387, reactance: 0.082 },
  { size: 70, capacities: { 'C-2c': 245, 'C-3c': 225, 'F-2c': 259, 'F-3c': 238 }, resistance: 0.268, reactance: 0.079 },
  { size: 95, capacities: { 'C-2c': 296, 'C-3c': 269, 'F-2c': 313, 'F-3c': 285 }, resistance: 0.193, reactance: 0.077 },
  { size: 120, capacities: { 'C-2c': 340, 'C-3c': 307, 'F-2c': 359, 'F-3c': 325 }, resistance: 0.153, reactance: 0.075 },
  { size: 150, capacities: { 'C-2c': 387, 'C-3c': 348, 'F-2c': 408, 'F-3c': 368 }, resistance: 0.124, reactance: 0.074 },
  { size: 185, capacities: { 'C-2c': 436, 'C-3c': 390, 'F-2c': 459, 'F-3c': 412 }, resistance: 0.0991, reactance: 0.073 },
  { size: 240, capacities: { 'C-2c': 506, 'C-3c': 450, 'F-2c': 532, 'F-3c': 475 }, resistance: 0.0754, reactance: 0.072 },
  { size: 300, capacities: { 'C-2c': 571, 'C-3c': 506, 'F-2c': 600, 'F-3c': 533 }, resistance: 0.0601, reactance: 0.071 },
  { size: 400, capacities: { 'C-2c': 656, 'C-3c': 578, 'F-2c': 688, 'F-3c': 609 }, resistance: 0.0470, reactance: 0.070 },
  { size: 500, capacities: { 'C-2c': 740, 'C-3c': 649, 'F-2c': 775, 'F-3c': 683 }, resistance: 0.0366, reactance: 0.069 },
  { size: 630, capacities: { 'C-2c': 844, 'C-3c': 737, 'F-2c': 883, 'F-3c': 774 }, resistance: 0.0283, reactance: 0.068 }
];

/**
 * Validate cable capacity against BS 7671 tables
 * Returns null if capacity matches table, error message if mismatch
 */
export function validateCableCapacity(
  cableType: CableType,
  size: number,
  claimedIz: number,
  installMethod: string = 'clipped-direct'
): { valid: boolean; actualIz?: number; error?: string } {
  const cable = getCableCapacity(cableType, size);
  if (!cable) {
    return { valid: false, error: `No cable data for ${cableType} ${size}mm²` };
  }
  
  // Get reference method (default to C for clipped direct)
  const refMethod = installMethod.includes('buried') ? 'D' : 'C';
  const actualIz = cable.capacities[refMethod];
  
  if (!actualIz) {
    return { valid: false, error: `No capacity data for method ${refMethod}` };
  }
  
  // Allow 1A tolerance for rounding
  if (Math.abs(claimedIz - actualIz) > 1) {
    return {
      valid: false,
      actualIz,
      error: `Cable capacity mismatch: claimed ${claimedIz}A but BS 7671 Table shows ${actualIz}A for ${size}mm² ${cableType} (Method ${refMethod})`
    };
  }
  
  return { valid: true, actualIz };
}

// MICC (Mineral Insulated) cables - 70°C/250°C depending on termination
export const miccCapacities: CableCapacity[] = [
  { size: 1.0, capacities: { A1: 14, A2: 16, B: 16, C: 18, E: 18, F: 18, G: 20 }, resistance: 18.1, reactance: 0.10 },
  { size: 1.5, capacities: { A1: 18, A2: 20, B: 20, C: 23, E: 23, F: 23, G: 26 }, resistance: 12.1, reactance: 0.10 },
  { size: 2.5, capacities: { A1: 24, A2: 27, B: 27, C: 31, E: 31, F: 31, G: 35 }, resistance: 7.41, reactance: 0.10 },
  { size: 4, capacities: { A1: 32, A2: 37, B: 37, C: 42, E: 42, F: 42, G: 47 }, resistance: 4.61, reactance: 0.10 },
  { size: 6, capacities: { A1: 42, A2: 47, B: 47, C: 54, E: 54, F: 54, G: 60 }, resistance: 3.08, reactance: 0.10 },
  { size: 10, capacities: { A1: 57, A2: 64, B: 64, C: 73, E: 73, F: 73, G: 82 }, resistance: 1.83, reactance: 0.10 },
  { size: 16, capacities: { A1: 75, A2: 83, B: 83, C: 95, E: 95, F: 95, G: 106 }, resistance: 1.15, reactance: 0.10 },
  { size: 25, capacities: { A1: 94, A2: 104, B: 104, C: 119, E: 119, F: 119, G: 133 }, resistance: 0.727, reactance: 0.10 },
  { size: 35, capacities: { A1: 112, A2: 124, B: 124, C: 142, E: 142, F: 142, G: 158 }, resistance: 0.524, reactance: 0.10 },
  { size: 50, capacities: { A1: 131, A2: 145, B: 145, C: 166, E: 166, F: 166, G: 185 }, resistance: 0.387, reactance: 0.10 }
];

// Aluminium conductor capacities (90°C XLPE)
export const aluminiumXlpeCapacities: CableCapacity[] = [
  { size: 16, capacities: { A1: 54, A2: 65, B: 71, C: 81, E: 81, F: 81, G: 90 }, resistance: 1.91, reactance: 0.095 },
  { size: 25, capacities: { A1: 72, A2: 84, B: 91, C: 106, E: 106, F: 106, G: 118 }, resistance: 1.20, reactance: 0.090 },
  { size: 35, capacities: { A1: 89, A2: 104, B: 113, C: 131, E: 131, F: 131, G: 146 }, resistance: 0.868, reactance: 0.085 },
  { size: 50, capacities: { A1: 109, A2: 127, B: 138, C: 160, E: 160, F: 160, G: 178 }, resistance: 0.641, reactance: 0.082 },
  { size: 70, capacities: { A1: 134, A2: 156, B: 170, C: 197, E: 197, F: 197, G: 220 }, resistance: 0.443, reactance: 0.079 },
  { size: 95, capacities: { A1: 159, A2: 185, B: 201, C: 233, E: 233, F: 233, G: 260 }, resistance: 0.320, reactance: 0.077 },
  { size: 120, capacities: { A1: 184, A2: 214, B: 232, C: 269, E: 269, F: 269, G: 300 }, resistance: 0.253, reactance: 0.075 },
  { size: 150, capacities: { A1: 208, A2: 242, B: 263, C: 305, E: 305, F: 305, G: 340 }, resistance: 0.206, reactance: 0.074 },
  { size: 185, capacities: { A1: 233, A2: 271, B: 295, C: 342, E: 342, F: 342, G: 381 }, resistance: 0.164, reactance: 0.073 },
  { size: 240, capacities: { A1: 267, A2: 311, B: 338, C: 392, E: 392, F: 392, G: 437 }, resistance: 0.125, reactance: 0.072 },
  { size: 300, capacities: { A1: 301, A2: 350, B: 381, C: 442, E: 442, F: 442, G: 493 }, resistance: 0.100, reactance: 0.071 },
  { size: 400, capacities: { A1: 341, A2: 397, B: 432, C: 501, E: 501, F: 501, G: 559 }, resistance: 0.0778, reactance: 0.070 },
  { size: 500, capacities: { A1: 380, A2: 442, B: 481, C: 558, E: 558, F: 558, G: 622 }, resistance: 0.0605, reactance: 0.069 },
  { size: 630, capacities: { A1: 427, A2: 497, B: 541, C: 627, E: 627, F: 627, G: 699 }, resistance: 0.0469, reactance: 0.068 }
];

export const cableCapacityData = {
  'pvc-single': pvcSingleCapacities,
  'xlpe-single': xlpeSingleCapacities,
  'pvc-twin-earth': pvcTwinEarthCapacities,
  'xlpe-twin-earth': xlpeTwinEarthCapacities,
  'swa': swaCapacities,
  'swa-single-core': singleCoreArmouredCapacities,
  'micc': miccCapacities,
  'aluminium-xlpe': aluminiumXlpeCapacities,
};

export type CableType = 
  | 'pvc-single' 
  | 'xlpe-single'
  | 'pvc-twin-earth'
  | 'xlpe-twin-earth'
  | 'swa'
  | 'swa-single-core'
  | 'micc'
  | 'aluminium-xlpe';

// Helper to get thermal insulation capacity for flat T&E cables
export const getThermalInsulationCapacity = (
  size: number,
  method: '100e' | '101e' | '102e' | '103e'
): number | null => {
  const entry = flatTwinEarthThermalCapacities.find(c => c.size === size);
  if (!entry) return null;
  
  const methodKey = `method${method.replace('e', '')}e` as keyof ThermalInsulationCapacity;
  return entry[methodKey] as number;
};

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

/**
 * Get minimum cable size required for a given protection device rating
 * Uses BS 7671 rule: Cable capacity (Iz) must be >= Protection device rating (In)
 */
export function getMinimumCableSizeForProtection(
  cableType: CableType,
  protectionRating: number,
  referenceMethod: string = 'C'
): { size: number; capacity: number } | null {
  const data = cableCapacityData[cableType];
  if (!data) return null;
  
  // Find smallest cable size where capacity >= protection rating
  const suitableCable = data.find(cable => {
    const capacity = cable.capacities[referenceMethod];
    return capacity && capacity >= protectionRating;
  });
  
  if (!suitableCable) return null;
  
  return {
    size: suitableCable.size,
    capacity: suitableCable.capacities[referenceMethod]
  };
}
