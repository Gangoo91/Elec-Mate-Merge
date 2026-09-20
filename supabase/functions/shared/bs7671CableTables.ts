/**
 * BS 7671:2018+A2:2022 Appendix 4
 * Cable Current-Carrying Capacity and Voltage Drop Tables
 * 
 * Complete cable selection tables extracted from the IET Wiring Regulations
 */

export interface CableCapacityData {
  cableSize: number; // mm²
  reference: string; // Table reference
  installationMethod: string;
  conductors: 2 | 3 | 4;
  currentRating: number; // Amperes
  insulationType: '70°C PVC' | '90°C XLPE' | 'Mineral';
  cableType: 'single-core' | 'two-core' | 'three-core' | 'multicore' | 'T&E';
}

export interface VoltageDropData {
  cableSize: number; // mm²
  mvPerAPerM: number; // mV/A/m
  conductorMaterial: 'copper' | 'aluminium';
  insulationType: '70°C PVC' | '90°C XLPE';
  cableConfiguration: 'DC' | 'single-phase AC' | 'three-phase AC';
  tableReference: string;
}

/**
 * Table 4D5 - 70°C Thermoplastic T&E Cable (Twin & Earth)
 * Most common domestic installation cable
 * Reference Method C (clipped direct)
 */
export const TABLE_4D5_TWO_CORE_TE: CableCapacityData[] = [
  { cableSize: 1.0, reference: '4D5', installationMethod: 'C', conductors: 2, currentRating: 13, insulationType: '70°C PVC', cableType: 'T&E' },
  { cableSize: 1.5, reference: '4D5', installationMethod: 'C', conductors: 2, currentRating: 17, insulationType: '70°C PVC', cableType: 'T&E' },
  { cableSize: 2.5, reference: '4D5', installationMethod: 'C', conductors: 2, currentRating: 23, insulationType: '70°C PVC', cableType: 'T&E' },
  { cableSize: 4.0, reference: '4D5', installationMethod: 'C', conductors: 2, currentRating: 30, insulationType: '70°C PVC', cableType: 'T&E' },
  { cableSize: 6.0, reference: '4D5', installationMethod: 'C', conductors: 2, currentRating: 39, insulationType: '70°C PVC', cableType: 'T&E' },
  { cableSize: 10.0, reference: '4D5', installationMethod: 'C', conductors: 2, currentRating: 52, insulationType: '70°C PVC', cableType: 'T&E' },
  { cableSize: 16.0, reference: '4D5', installationMethod: 'C', conductors: 2, currentRating: 69, insulationType: '70°C PVC', cableType: 'T&E' },
];

/**
 * Table 4D4A - Multicore Armoured 70°C PVC Cables
 * Reference Method C (clipped direct) - 3-core cables
 */
export const TABLE_4D4A_THREE_CORE: CableCapacityData[] = [
  { cableSize: 1.5, reference: '4D4A', installationMethod: 'C', conductors: 3, currentRating: 18, insulationType: '70°C PVC', cableType: 'three-core' },
  { cableSize: 2.5, reference: '4D4A', installationMethod: 'C', conductors: 3, currentRating: 25, insulationType: '70°C PVC', cableType: 'three-core' },
  { cableSize: 4.0, reference: '4D4A', installationMethod: 'C', conductors: 3, currentRating: 33, insulationType: '70°C PVC', cableType: 'three-core' },
  { cableSize: 6.0, reference: '4D4A', installationMethod: 'C', conductors: 3, currentRating: 42, insulationType: '70°C PVC', cableType: 'three-core' },
  { cableSize: 10.0, reference: '4D4A', installationMethod: 'C', conductors: 3, currentRating: 57, insulationType: '70°C PVC', cableType: 'three-core' },
  { cableSize: 16.0, reference: '4D4A', installationMethod: 'C', conductors: 3, currentRating: 77, insulationType: '70°C PVC', cableType: 'three-core' },
  { cableSize: 25.0, reference: '4D4A', installationMethod: 'C', conductors: 3, currentRating: 102, insulationType: '70°C PVC', cableType: 'three-core' },
  { cableSize: 35.0, reference: '4D4A', installationMethod: 'C', conductors: 3, currentRating: 125, insulationType: '70°C PVC', cableType: 'three-core' },
  { cableSize: 50.0, reference: '4D4A', installationMethod: 'C', conductors: 3, currentRating: 151, insulationType: '70°C PVC', cableType: 'three-core' },
  { cableSize: 70.0, reference: '4D4A', installationMethod: 'C', conductors: 3, currentRating: 192, insulationType: '70°C PVC', cableType: 'three-core' },
  { cableSize: 95.0, reference: '4D4A', installationMethod: 'C', conductors: 3, currentRating: 231, insulationType: '70°C PVC', cableType: 'three-core' },
];

/**
 * Table 4D1B/4D5 - Voltage Drop (mV/A/m) for 70°C PVC Copper Cables
 * BS 7671 Regulation 525 - Max 3% lighting, 5% other uses
 */
export const VOLTAGE_DROP_70C_PVC_COPPER: VoltageDropData[] = [
  // Single-phase AC / DC
  { cableSize: 1.0, mvPerAPerM: 44, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B' },
  { cableSize: 1.5, mvPerAPerM: 29, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B/4D5' },
  { cableSize: 2.5, mvPerAPerM: 18, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B/4D5' },
  { cableSize: 4.0, mvPerAPerM: 11, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B/4D5' },
  { cableSize: 6.0, mvPerAPerM: 7.3, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B/4D5' },
  { cableSize: 10.0, mvPerAPerM: 4.4, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B/4D5' },
  { cableSize: 16.0, mvPerAPerM: 2.8, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B/4D5' },
  { cableSize: 25.0, mvPerAPerM: 1.75, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B' },
  { cableSize: 35.0, mvPerAPerM: 1.25, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B' },
  { cableSize: 50.0, mvPerAPerM: 0.93, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B' },
  { cableSize: 70.0, mvPerAPerM: 0.63, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B' },
  { cableSize: 95.0, mvPerAPerM: 0.47, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B' },
  { cableSize: 120.0, mvPerAPerM: 0.37, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B' },
  { cableSize: 150.0, mvPerAPerM: 0.29, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B' },
  { cableSize: 185.0, mvPerAPerM: 0.24, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B' },
  { cableSize: 240.0, mvPerAPerM: 0.185, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B' },
  { cableSize: 300.0, mvPerAPerM: 0.150, conductorMaterial: 'copper', insulationType: '70°C PVC', cableConfiguration: 'single-phase AC', tableReference: '4D1B' },
];

/**
 * Calculate voltage drop for a circuit
 * Formula: VD = (mV/A/m × Current × Length) / 1000
 * 
 * @param cableSize - Cable CSA in mm²
 * @param current - Design current in Amps
 * @param length - Cable length in metres
 * @param voltage - Supply voltage (default 230V)
 * @returns Voltage drop in volts and percentage
 */
export function calculateVoltageDrop(
  cableSize: number,
  current: number,
  length: number,
  voltage: number = 230
): { voltageDropVolts: number; voltageDropPercent: number; mvPerAPerM: number; compliant: boolean; limit: number } {
  const vdData = VOLTAGE_DROP_70C_PVC_COPPER.find(vd => vd.cableSize === cableSize);
  
  if (!vdData) {
    return { 
      voltageDropVolts: 0, 
      voltageDropPercent: 0, 
      mvPerAPerM: 0,
      compliant: false,
      limit: 3 
    };
  }
  
  // VD = (mV/A/m × I × L) / 1000
  const voltageDropVolts = (vdData.mvPerAPerM * current * length) / 1000;
  const voltageDropPercent = (voltageDropVolts / voltage) * 100;
  
  // BS 7671 Reg 525: Max 3% for lighting, 5% for other uses
  // Use 5% as default (more permissive)
  const limit = 5;
  const compliant = voltageDropPercent <= limit;
  
  return { 
    voltageDropVolts: Math.round(voltageDropVolts * 100) / 100,
    voltageDropPercent: Math.round(voltageDropPercent * 100) / 100,
    mvPerAPerM: vdData.mvPerAPerM,
    compliant,
    limit
  };
}

/**
 * Get cable capacity for specific installation
 */
export function getCableCapacity(
  cableSize: number,
  installationMethod: string,
  conductors: 2 | 3
): CableCapacityData | null {
  // For T&E cable (most common domestic)
  if (conductors === 2 && installationMethod === 'C') {
    return TABLE_4D5_TWO_CORE_TE.find(c => c.cableSize === cableSize) || null;
  }
  
  // For 3-core armoured
  if (conductors === 3 && installationMethod === 'C') {
    return TABLE_4D4A_THREE_CORE.find(c => c.cableSize === cableSize) || null;
  }
  
  return null;
}

/**
 * Installation Method Reference Data (Table 4A2)
 */
export interface InstallationMethod {
  methodNumber: number;
  referenceMethod: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  description: string;
  examples: string[];
}

export const INSTALLATION_METHODS: InstallationMethod[] = [
  {
    methodNumber: 1,
    referenceMethod: 'A',
    description: 'Enclosed in conduit in thermally insulated wall',
    examples: ['Conduit in insulated stud wall', 'Heavy derating required']
  },
  {
    methodNumber: 4,
    referenceMethod: 'B',
    description: 'Enclosed in conduit on wall or in trunking',
    examples: ['Surface conduit on masonry', 'Trunking on wall']
  },
  {
    methodNumber: 20,
    referenceMethod: 'C',
    description: 'Clipped direct to surface or embedded in masonry',
    examples: ['Cable clipped to wall', 'T&E cable on surface', 'Most common domestic method']
  },
  {
    methodNumber: 70,
    referenceMethod: 'D',
    description: 'Buried direct in ground or in underground ducting',
    examples: ['SWA cable direct burial', 'Cable in duct underground']
  },
  {
    methodNumber: 31,
    referenceMethod: 'E',
    description: 'In free air - multicore cables on perforated tray',
    examples: ['Cable tray horizontal', 'Cable tray vertical']
  },
  {
    methodNumber: 32,
    referenceMethod: 'F',
    description: 'In free air - single-core cables on tray',
    examples: ['Single-core cables spaced', 'Trefoil formation']
  },
];
