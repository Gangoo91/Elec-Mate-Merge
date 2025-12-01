/**
 * Breaking Capacity Validation
 * Ensures protective devices can safely interrupt fault currents
 * Critical safety check per BS 7671 Regulation 434.5.2
 */

import type { DesignedCircuit, NormalizedSupply } from './types.ts';

export interface BreakingCapacityIssue {
  circuitName: string;
  deviceKaRating: number;
  pscc: number;
  severity: 'error' | 'warning';
  message: string;
  recommendation: string;
}

/**
 * Validate breaking capacity for all circuits
 * 
 * @param circuits - Designed circuits to validate
 * @param supply - Supply parameters including PSCC
 * @param logger - Logger instance
 * @returns Array of issues found (empty if all valid)
 */
export function validateBreakingCapacity(
  circuits: DesignedCircuit[],
  supply: NormalizedSupply,
  logger: any
): BreakingCapacityIssue[] {
  const issues: BreakingCapacityIssue[] = [];
  
  // Estimate PSCC if not provided (conservative approach)
  const pscc = supply.pscc || estimatePSCC(supply);
  
  logger.info('Validating breaking capacity', {
    circuits: circuits.length,
    pscc: `${pscc}kA`,
    installationType: supply.installationType
  });
  
  for (const circuit of circuits) {
    const deviceKa = circuit.protectionDevice?.kaRating;
    
    if (!deviceKa) {
      logger.warn('Circuit missing kaRating', { circuit: circuit.name });
      continue;
    }
    
    // Check if device breaking capacity exceeds PSCC
    if (deviceKa < pscc) {
      issues.push({
        circuitName: circuit.name,
        deviceKaRating: deviceKa,
        pscc,
        severity: 'error',
        message: `Breaking capacity (${deviceKa}kA) insufficient for fault level (PSCC ${pscc}kA)`,
        recommendation: getBreakingCapacityRecommendation(
          supply.installationType,
          pscc,
          circuit.protectionDevice.type
        )
      });
      
      logger.error('Breaking capacity insufficient', {
        circuit: circuit.name,
        deviceKa,
        pscc,
        deficit: pscc - deviceKa
      });
    } else {
      // Check if margin is adequate (warning if <20% margin)
      const margin = ((deviceKa - pscc) / pscc) * 100;
      
      if (margin < 20) {
        issues.push({
          circuitName: circuit.name,
          deviceKaRating: deviceKa,
          pscc,
          severity: 'warning',
          message: `Breaking capacity margin low (${margin.toFixed(1)}% above PSCC ${pscc}kA)`,
          recommendation: `Consider higher ka rating for safety margin. Current: ${deviceKa}kA, PSCC: ${pscc}kA.`
        });
        
        logger.warn('Breaking capacity margin low', {
          circuit: circuit.name,
          deviceKa,
          pscc,
          margin: `${margin.toFixed(1)}%`
        });
      } else {
        logger.info('Breaking capacity adequate', {
          circuit: circuit.name,
          deviceKa,
          pscc,
          margin: `${margin.toFixed(1)}%`
        });
      }
    }
  }
  
  return issues;
}

/**
 * Estimate PSCC based on supply characteristics
 * Conservative estimates per installation type
 */
function estimatePSCC(supply: NormalizedSupply): number {
  const { installationType, ze, voltage } = supply;
  
  // Estimate based on Ze and typical transformer characteristics
  // Formula: PSCC (kA) ≈ Uo / (Ze + typical source impedance)
  
  if (installationType === 'industrial') {
    // Industrial: Typically fed from large transformers, high fault levels
    // Assume 0.05Ω typical source impedance
    return Math.min((voltage / (ze + 0.05)) / 1000, 25);
  }
  
  if (installationType === 'commercial') {
    // Commercial: Medium transformers, moderate fault levels
    // Assume 0.1Ω typical source impedance
    return Math.min((voltage / (ze + 0.1)) / 1000, 16);
  }
  
  // Domestic: Small service, lower fault levels
  // Assume 0.15Ω typical source impedance
  return Math.min((voltage / (ze + 0.15)) / 1000, 10);
}

/**
 * Get recommendation for insufficient breaking capacity
 */
function getBreakingCapacityRecommendation(
  installationType: string,
  pscc: number,
  currentDeviceType: string
): string {
  if (pscc > 16) {
    return `PSCC ${pscc}kA requires industrial protection: BS88 HRC fuse (80kA) or MCCB (50kA+). Standard MCBs insufficient.`;
  }
  
  if (pscc > 10) {
    if (installationType === 'industrial') {
      return `Industrial installation with PSCC ${pscc}kA: Use BS88 fuse (80kA) or MCB with 25kA rating minimum.`;
    }
    return `PSCC ${pscc}kA requires higher breaking capacity: MCB with 16kA+ rating or BS88 fuse.`;
  }
  
  if (installationType === 'industrial') {
    return `Industrial installation requires minimum 25kA breaking capacity (Reg 434.5.2).`;
  }
  
  if (installationType === 'commercial') {
    return `Commercial installation requires minimum 16kA breaking capacity (Reg 434.5.2).`;
  }
  
  return `Domestic installation requires minimum 10kA breaking capacity (Reg 434.5.2).`;
}

/**
 * Get recommended ka rating for installation type and PSCC
 */
export function getRecommendedKaRating(
  installationType: string,
  pscc?: number
): number {
  if (pscc) {
    // Safety factor: 1.5× PSCC
    const safetyFactorKa = Math.ceil(pscc * 1.5);
    
    // Round up to standard ratings
    if (safetyFactorKa > 50) return 80;
    if (safetyFactorKa > 25) return 50;
    if (safetyFactorKa > 16) return 25;
    if (safetyFactorKa > 10) return 16;
    if (safetyFactorKa > 6) return 10;
    return 6;
  }
  
  // Default by installation type per BS 7671 Reg 434.5.2
  switch (installationType) {
    case 'industrial':
      return 25;
    case 'commercial':
      return 16;
    case 'domestic':
    default:
      return 10;
  }
}
