/**
 * Cable Capacity Validator
 * Validates AI-generated cable sizes against BS 7671 tables
 * Prevents dangerous undersizing (e.g., 35mm² for 200A protection)
 */

import type { DesignedCircuit } from './types.ts';

// BS 7671 Table 4D4A - SWA Cable Capacities (3-core, XLPE 90°C, clipped direct)
const SWA_CAPACITIES_TABLE_4D4A: Record<number, number> = {
  1.5: 20,
  2.5: 27,
  4: 37,
  6: 47,
  10: 64,
  16: 85,
  25: 112,
  35: 137,
  50: 164,
  70: 201,
  95: 238,
  120: 274,
  150: 310,
  185: 348,
  240: 399,
  300: 450,
  400: 511,
  500: 569,
  630: 640
};

// BS 7671 Table 4D1A - PVC Twin & Earth (70°C, clipped direct)
const PVC_TWIN_EARTH_CAPACITIES: Record<number, number> = {
  1.0: 13,
  1.5: 16,
  2.5: 24,
  4: 32,
  6: 41,
  10: 57,
  16: 76,
  25: 101,
  35: 125,
  50: 151
};

// BS 7671 Table 4D5A - XLPE Twin & Earth (90°C, clipped direct)
const XLPE_TWIN_EARTH_CAPACITIES: Record<number, number> = {
  1.0: 16,
  1.5: 20,
  2.5: 30,
  4: 40,
  6: 51,
  10: 70,
  16: 94,
  25: 125,
  35: 156,
  50: 188
};

// PVC/XLPE Single cores in conduit/trunking (Method C)
const PVC_SINGLE_CAPACITIES: Record<number, number> = {
  1.0: 15,
  1.5: 20,
  2.5: 27,
  4: 36,
  6: 46,
  10: 63,
  16: 85,
  25: 112,
  35: 138,
  50: 168,
  70: 207,
  95: 245,
  120: 284,
  150: 323,
  185: 362,
  240: 415,
  300: 467
};

const XLPE_SINGLE_CAPACITIES: Record<number, number> = {
  1.0: 18,
  1.5: 24,
  2.5: 33,
  4: 45,
  6: 58,
  10: 79,
  16: 107,
  25: 138,
  35: 171,
  50: 209,
  70: 258,
  95: 308,
  120: 356,
  150: 406,
  185: 456,
  240: 523,
  300: 590
};

interface ValidationResult {
  valid: boolean;
  actualIz?: number;
  error?: string;
  recommendation?: string;
}

/**
 * Validate cable capacity against BS 7671 tables
 */
export function validateCableCapacity(
  circuit: DesignedCircuit,
  logger: any
): ValidationResult {
  const { cableSize, cableType, calculations, protectionDevice } = circuit;
  
  if (!cableSize || !cableType || !calculations) {
    return { valid: true }; // Skip validation if missing data
  }
  
  const claimedIz = calculations.Iz;
  if (!claimedIz) {
    return { valid: true };
  }
  
  // Get capacity table based on cable type
  let capacityTable: Record<number, number> | null = null;
  let tableName = '';
  
  if (cableType.toLowerCase().includes('swa')) {
    capacityTable = SWA_CAPACITIES_TABLE_4D4A;
    tableName = 'Table 4D4A (SWA)';
  } else if (cableType.toLowerCase().includes('twin') && cableType.toLowerCase().includes('pvc')) {
    capacityTable = PVC_TWIN_EARTH_CAPACITIES;
    tableName = 'Table 4D1A (PVC T&E)';
  } else if (cableType.toLowerCase().includes('twin') && cableType.toLowerCase().includes('xlpe')) {
    capacityTable = XLPE_TWIN_EARTH_CAPACITIES;
    tableName = 'Table 4D5A (XLPE T&E)';
  } else if (cableType.toLowerCase().includes('single') && cableType.toLowerCase().includes('pvc')) {
    capacityTable = PVC_SINGLE_CAPACITIES;
    tableName = 'Table 4D1A (PVC singles)';
  } else if (cableType.toLowerCase().includes('single') && cableType.toLowerCase().includes('xlpe')) {
    capacityTable = XLPE_SINGLE_CAPACITIES;
    tableName = 'Table 4D2A (XLPE singles)';
  }
  
  if (!capacityTable) {
    logger.warn('No capacity table for cable type', { cableType });
    return { valid: true }; // Skip validation for unknown types
  }
  
  // Get actual capacity from table
  const actualIz = capacityTable[cableSize];
  
  if (!actualIz) {
    logger.warn('Cable size not in table', { cableSize, cableType, tableName });
    return { valid: true }; // Skip validation for sizes not in table
  }
  
  // Allow 5A tolerance for derating factors
  const tolerance = 5;
  const difference = Math.abs(claimedIz - actualIz);
  
  if (difference > tolerance) {
    // Check if cable is severely undersized for protection device
    const deviceRating = protectionDevice?.rating || 0;
    const isCriticalUndersizing = actualIz < deviceRating * 0.9; // Cable capacity < 90% of device rating
    
    let recommendation = '';
    if (isCriticalUndersizing) {
      // Find correct cable size for this protection device
      const correctSize = Object.entries(capacityTable)
        .find(([_size, iz]) => iz >= deviceRating);
      
      if (correctSize) {
        recommendation = `CRITICAL: ${cableSize}mm² (${actualIz}A) insufficient for ${deviceRating}A protection. Use ${correctSize[0]}mm² (${correctSize[1]}A) minimum.`;
      }
    }
    
    logger.error('🔴 Cable capacity validation FAILED', {
      circuit: circuit.name,
      cableSize,
      cableType,
      claimedIz,
      actualIz,
      difference,
      tableName,
      protectionRating: deviceRating,
      isCritical: isCriticalUndersizing
    });
    
    return {
      valid: false,
      actualIz,
      error: `Cable capacity mismatch: AI claimed ${claimedIz}A but BS 7671 ${tableName} shows ${actualIz}A for ${cableSize}mm²`,
      recommendation: recommendation || `Verify cable sizing: ${cableSize}mm² ${cableType} has ${actualIz}A capacity (${tableName})`
    };
  }
  
  logger.info('✅ Cable capacity validation passed', {
    circuit: circuit.name,
    cableSize,
    claimedIz,
    actualIz,
    tableName
  });
  
  return { valid: true, actualIz };
}

/**
 * Validate protection device selection for industrial circuits
 */
export function validateIndustrialProtection(
  circuit: DesignedCircuit,
  installationType: string,
  logger: any
): { valid: boolean; error?: string; recommendation?: string } {
  
  if (installationType !== 'industrial') {
    return { valid: true }; // Only validate industrial circuits
  }
  
  const { protectionDevice, calculations } = circuit;
  if (!protectionDevice || !calculations) {
    return { valid: true };
  }
  
  const Ib = calculations.Ib || 0;
  const deviceRating = protectionDevice.rating;
  const deviceType = protectionDevice.type;
  
  // CRITICAL RULE: Industrial circuits >63A must use BS88 or MCCB
  if (Ib > 63 && (deviceType === 'MCB' || deviceType === 'RCBO')) {
    logger.error('🔴 Industrial protection device validation FAILED', {
      circuit: circuit.name,
      Ib,
      deviceType,
      deviceRating,
      rule: 'Industrial circuits >63A require BS88 fuses or MCCB'
    });
    
    return {
      valid: false,
      error: `Industrial circuit with ${Ib.toFixed(1)}A design current cannot use ${deviceType}`,
      recommendation: `Use BS88 HRC fuse (${deviceRating}A or next size up) or MCCB for industrial circuits above 63A`
    };
  }
  
  // Check if device type is BS88 or MCCB for high currents
  if (deviceRating > 125 && deviceType !== 'BS88' && deviceType !== 'MCCB') {
    logger.warn('Device rating >125A should use BS88/MCCB', {
      circuit: circuit.name,
      deviceRating,
      deviceType
    });
    
    return {
      valid: false,
      error: `Device rating ${deviceRating}A exceeds MCB limits`,
      recommendation: `Use BS88 fuse or MCCB for ratings above 125A`
    };
  }
  
  logger.info('✅ Industrial protection validation passed', {
    circuit: circuit.name,
    Ib,
    deviceType,
    deviceRating
  });
  
  return { valid: true };
}

// Standard protection device ratings per BS 7671
const STANDARD_MCB_RATINGS = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];
const STANDARD_BS88_RATINGS = [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630];

/**
 * Get next standard protection device rating above design current
 */
function getNextStandardRating(Ib: number, deviceType: string = 'MCB'): number {
  const ratings = deviceType.includes('BS88') || deviceType.includes('MCCB') 
    ? STANDARD_BS88_RATINGS 
    : STANDARD_MCB_RATINGS;
  
  // Protection device must be ≥ design current (with small margin for motor starting)
  return ratings.find(r => r >= Ib * 1.1) || ratings[ratings.length - 1];
}

/**
 * Get largest standard rating that doesn't exceed cable capacity
 */
function getLargestRatingBelow(Iz: number, deviceType: string = 'MCB'): number {
  const ratings = deviceType.includes('BS88') || deviceType.includes('MCCB')
    ? STANDARD_BS88_RATINGS
    : STANDARD_MCB_RATINGS;
  
  // Find largest rating that cable can handle
  const suitableRatings = ratings.filter(r => r <= Iz);
  return suitableRatings[suitableRatings.length - 1] || ratings[0];
}

/**
 * Check if circuit is a motor circuit (requires higher starting current)
 */
function isMotorCircuit(circuit: DesignedCircuit): boolean {
  const loadType = circuit.loadType?.toLowerCase() || '';
  return loadType.includes('motor') || 
         loadType.includes('machine') ||
         loadType.includes('pump') ||
         loadType.includes('compressor') ||
         loadType.includes('fan');
}

interface ProtectionSizingResult {
  valid: boolean;
  correctedRating?: number;
  reason?: string;
}

/**
 * Validate protection device sizing against Ib ≤ In ≤ Iz rule
 * Auto-correct massively oversized protection devices
 */
export function validateProtectionSizing(
  circuit: DesignedCircuit,
  logger: any
): ProtectionSizingResult {
  const { calculations, protectionDevice, cableSize, cableType } = circuit;
  
  if (!calculations || !protectionDevice || !cableSize || !cableType) {
    return { valid: true }; // Skip validation if missing data
  }
  
  const Ib = calculations.Ib || 0;
  const In = protectionDevice.rating;
  const deviceType = protectionDevice.type;
  
  // Get actual cable capacity from tables
  let capacityTable: Record<number, number> | null = null;
  
  if (cableType.toLowerCase().includes('swa')) {
    capacityTable = SWA_CAPACITIES_TABLE_4D4A;
  } else if (cableType.toLowerCase().includes('twin') && cableType.toLowerCase().includes('pvc')) {
    capacityTable = PVC_TWIN_EARTH_CAPACITIES;
  } else if (cableType.toLowerCase().includes('twin') && cableType.toLowerCase().includes('xlpe')) {
    capacityTable = XLPE_TWIN_EARTH_CAPACITIES;
  } else if (cableType.toLowerCase().includes('single') && cableType.toLowerCase().includes('pvc')) {
    capacityTable = PVC_SINGLE_CAPACITIES;
  } else if (cableType.toLowerCase().includes('single') && cableType.toLowerCase().includes('xlpe')) {
    capacityTable = XLPE_SINGLE_CAPACITIES;
  }
  
  const Iz = capacityTable?.[cableSize] || calculations.Iz || 0;
  
  // CRITICAL CHECK 1: Is protection massively oversized for load?
  // For non-motor circuits, In should not be >2.5x the design current
  const isMotor = isMotorCircuit(circuit);
  const maxAllowedMultiplier = isMotor ? 2.5 : 1.6; // Motors get higher multiplier for starting current
  
  if (In > Ib * maxAllowedMultiplier && Ib > 0) {
    const correctIn = getNextStandardRating(Ib, deviceType);
    
    logger.warn('🟡 Protection oversized for load', {
      circuit: circuit.name,
      Ib,
      In,
      ratio: (In / Ib).toFixed(1),
      correctIn,
      isMotor
    });
    
    return {
      valid: false,
      correctedRating: correctIn,
      reason: `Protection ${In}A oversized for ${Ib.toFixed(1)}A load (${(In / Ib).toFixed(1)}x). Corrected to ${correctIn}A.`
    };
  }
  
  // CRITICAL CHECK 2: Is protection exceeding cable capacity (In > Iz)?
  if (In > Iz && Iz > 0) {
    const maxAllowedIn = getLargestRatingBelow(Iz, deviceType);
    
    logger.error('🔴 Protection exceeds cable capacity', {
      circuit: circuit.name,
      In,
      Iz,
      cableSize,
      maxAllowedIn
    });
    
    return {
      valid: false,
      correctedRating: maxAllowedIn,
      reason: `Protection ${In}A exceeds cable capacity ${Iz}A (${cableSize}mm²). Corrected to ${maxAllowedIn}A.`
    };
  }
  
  // CRITICAL CHECK 3: Is protection below design current (dangerous undersizing)?
  if (In < Ib) {
    const correctIn = getNextStandardRating(Ib, deviceType);
    
    logger.error('🔴 Protection undersized for load', {
      circuit: circuit.name,
      Ib,
      In,
      correctIn
    });
    
    return {
      valid: false,
      correctedRating: correctIn,
      reason: `Protection ${In}A insufficient for ${Ib.toFixed(1)}A load. Corrected to ${correctIn}A.`
    };
  }
  
  logger.info('✅ Protection sizing validation passed', {
    circuit: circuit.name,
    Ib: Ib.toFixed(1),
    In,
    Iz,
    ratio: (In / Ib).toFixed(2)
  });
  
  return { valid: true };
}
