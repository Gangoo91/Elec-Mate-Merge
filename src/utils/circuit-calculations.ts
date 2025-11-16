/**
 * Frontend Circuit Calculation Utilities
 * Pre-calculate values before sending to AI agent to reduce processing time
 */

import { CircuitInput } from "@/types/installation-design";

/**
 * Calculate design current (Ib) for a circuit
 */
export function calculateDesignCurrent(
  loadPower: number,
  voltage: number,
  phases: 'single' | 'three'
): number {
  if (phases === 'single') {
    // Ib = P / U
    return loadPower / voltage;
  } else {
    // Ib = P / (U × √3 × power factor)
    // Assuming 0.95 power factor for three-phase loads
    return loadPower / (voltage * Math.sqrt(3) * 0.95);
  }
}

/**
 * Suggest MCB rating based on design current
 * Returns next standard BS 88-3 rating ≥ Ib
 */
export function suggestMCBRating(Ib: number): number {
  const standardRatings = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125];
  return standardRatings.find(rating => rating >= Ib) || 125;
}

/**
 * Calculate diversity factor based on load type
 * BS 7671 Appendix A (informative guidance)
 */
export function calculateDiversityFactor(loadType: string): number {
  const diversityMap: Record<string, number> = {
    // Domestic
    'socket': 0.4,              // 40% diversity for socket outlets
    'lighting': 0.66,           // 66% diversity for lighting
    'cooker': 0.7,              // First 10A + 30% remainder + 5A if socket
    'shower': 1.0,              // No diversity for showers
    'ev-charger': 1.0,          // No diversity for EV chargers
    'immersion': 1.0,           // No diversity for immersion heaters
    'heating': 0.8,             // 80% for heating circuits
    'smoke-alarm': 1.0,         // No diversity
    'garage': 0.7,              // 70% for garage circuits
    'outdoor': 0.8,             // 80% for outdoor circuits
    
    // Commercial
    'office-sockets': 0.5,      // 50% for office sockets
    'emergency-lighting': 1.0,  // No diversity
    'hvac': 0.9,                // 90% for HVAC
    'server-room': 1.0,         // No diversity for critical loads
    'kitchen-equipment': 0.7,   // 70% for commercial kitchens
    'signage': 1.0,             // No diversity
    'fire-alarm': 1.0,          // No diversity
    'access-control': 1.0,      // No diversity
    'cctv': 1.0,                // No diversity
    
    // Industrial
    'three-phase-motor': 1.0,   // No diversity for motors
    'machine-tool': 0.8,        // 80% for machine tools
    'welding': 0.7,             // 70% for welding equipment
    'conveyor': 0.9,            // 90% for conveyors
    'extraction': 0.9,          // 90% for extraction
    'control-panel': 1.0,       // No diversity
    'overhead-lighting': 0.8,   // 80% for industrial lighting
    'workshop-sockets': 0.6,    // 60% for workshop sockets
    'compressor': 1.0,          // No diversity
    'production-line': 0.95,    // 95% for production equipment
  };
  
  return diversityMap[loadType] || 1.0; // Default: no diversity
}

/**
 * Estimate rough cable size based on design current
 * This is a quick estimate - AI will do precise calculations
 */
export function estimateCableSize(Ib: number, cableLength: number): number {
  // Very rough guide for copper T&E clipped direct at 70°C
  // This is for indication only - AI does proper derating
  if (Ib <= 13.5) return 1.0;
  if (Ib <= 18.5) return 1.5;
  if (Ib <= 24) return 2.5;
  if (Ib <= 31) return 4.0;
  if (Ib <= 40) return 6.0;
  if (Ib <= 50) return 10.0;
  if (Ib <= 63) return 16.0;
  if (Ib <= 85) return 25.0;
  if (Ib <= 110) return 35.0;
  
  // For long runs (>50m), bump up one size to account for volt drop
  if (cableLength > 50 && Ib > 20) {
    if (Ib <= 24) return 4.0;
    if (Ib <= 31) return 6.0;
    if (Ib <= 40) return 10.0;
    if (Ib <= 50) return 16.0;
  }
  
  return 50.0; // Very high current - AI will calculate properly
}

/**
 * Validate circuit and return warnings/errors
 */
export interface CircuitValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateCircuit(
  circuit: CircuitInput,
  voltage: number,
  earthingSystem: 'TN-S' | 'TN-C-S' | 'TT'
): CircuitValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Required fields
  if (!circuit.name) {
    errors.push('Circuit name is required');
  }
  
  if (!circuit.loadPower || circuit.loadPower <= 0) {
    errors.push('Load power must be greater than 0');
  }
  
  // Calculate Ib for warnings
  const Ib = circuit.loadPower 
    ? calculateDesignCurrent(circuit.loadPower, voltage, circuit.phases)
    : 0;
  
  // High current warning
  if (Ib > 63) {
    warnings.push(`High current (${Ib.toFixed(1)}A) - may require large cable (≥25mm²)`);
  }
  
  // Long run warning
  if (circuit.cableLength && circuit.cableLength > 100) {
    warnings.push('Long cable run (>100m) - voltage drop may be a concern');
  }
  
  // High power + long run combination
  if (Ib > 32 && circuit.cableLength && circuit.cableLength > 50) {
    warnings.push('High current + long run - expect large cable and/or multiple parallel runs');
  }
  
  // Special location checks
  if (circuit.specialLocation === 'bathroom') {
    if (!(circuit as any).rcdProtection) {
      warnings.push('RCD protection mandatory for bathroom circuits (BS 7671 Reg 701.411.3.3)');
    }
  }
  
  if (circuit.specialLocation === 'outdoor') {
    if (!(circuit as any).rcdProtection) {
      warnings.push('RCD protection recommended for outdoor circuits (BS 7671 Reg 411.3.3)');
    }
  }
  
  // TT system requires RCD on all circuits
  if (earthingSystem === 'TT' && !(circuit as any).rcdProtection) {
    errors.push('RCD protection required on all circuits for TT earthing systems (BS 7671 Reg 411.5)');
  }
  
  // EV charger specific
  if (circuit.loadType === 'ev-charger') {
    if (!(circuit as any).protectionType || (circuit as any).protectionType !== 'RCBO-TypeA') {
      warnings.push('EV chargers require Type A or Type B RCD protection (BS 7671 Reg 722.531.2)');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Estimate material cost (rough ballpark)
 */
export interface MaterialEstimate {
  cableSize: number;
  cableLength: number;
  estimatedCableCost: number;
  protectionDevice: string;
  estimatedDeviceCost: number;
  totalEstimate: number;
}

export function estimateMaterialCost(
  Ib: number,
  cableLength: number,
  protectionType?: string
): MaterialEstimate {
  const cableSize = estimateCableSize(Ib, cableLength);
  
  // Rough cable costs per meter (£/m) - T&E copper
  const cableCostPerMeter: Record<number, number> = {
    1.0: 0.50,
    1.5: 0.65,
    2.5: 0.90,
    4.0: 1.40,
    6.0: 2.10,
    10.0: 3.50,
    16.0: 5.50,
    25.0: 8.50,
    35.0: 12.00,
    50.0: 18.00,
  };
  
  const cableCost = (cableCostPerMeter[cableSize] || 20) * cableLength;
  
  // Rough protection device costs (£)
  let deviceCost = 15; // Default MCB cost
  if (protectionType === 'RCBO' || protectionType === 'RCBO-TypeA') {
    deviceCost = 35;
  } else if (protectionType === 'RCBO-TypeB') {
    deviceCost = 65;
  }
  
  return {
    cableSize,
    cableLength,
    estimatedCableCost: Math.round(cableCost * 100) / 100,
    protectionDevice: protectionType || 'MCB',
    estimatedDeviceCost: deviceCost,
    totalEstimate: Math.round((cableCost + deviceCost) * 100) / 100,
  };
}
