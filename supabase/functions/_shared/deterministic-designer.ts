/**
 * Deterministic Circuit Designer - Rules-First Architecture
 * Uses calculation engines from calculationEngines.ts to provide reliable, hallucination-free designs
 */

import { 
  calculateCableCapacity, 
  calculateVoltageDrop, 
  calculateMaxZs 
} from './calculationEngines.ts';

export interface DesignResult {
  designCurrent: number;
  mcbRating: number;
  cableSize: number;
  cableType: string;
  voltageDrop: {
    volts: number;
    percent: number;
    compliant: boolean;
  };
  earthFault: {
    maxZs: number;
    compliant: boolean;
  };
  calculations: {
    Ib: number;
    In: number;
    Iz: number;
    equation: string;
  };
  regulations: string[]; // Which BS 7671 sections were used
  success: boolean;
  warnings: string[];
}

export function designCircuit(params: {
  power: number;
  distance: number;
  voltage?: number;
  phases?: 'single' | 'three';
  installMethod?: string;
  ambientTemp?: number;
  grouping?: number;
  location?: string;
  loadType?: string;
  earthingSystem?: string;
}): DesignResult {
  const {
    power,
    distance,
    voltage = 230,
    phases = 'single',
    installMethod = 'clipped-direct',
    ambientTemp = 30,
    grouping = 1
  } = params;

  const warnings: string[] = [];
  const regulations: string[] = [];

  // 1. Calculate design current (Ib) - BS 7671 Regulation 433.1.1
  const Ib = power / voltage;
  regulations.push('433.1.1');
  regulations.push('Regulation 433.1.1 - Design current');

  // 2. Select MCB rating (In) - must be ≥ Ib
  const standardMcbs = [6, 10, 16, 20, 25, 32, 40, 45, 50, 63, 80, 100, 125];
  const In = standardMcbs.find(rating => rating >= Ib) || standardMcbs[standardMcbs.length - 1];
  regulations.push('533.1');
  regulations.push('Regulation 533.1 - Overcurrent protective device selection');

  if (In === standardMcbs[standardMcbs.length - 1] && Ib > In) {
    warnings.push('Design current exceeds largest standard MCB rating - specialist consultation required');
  }

  // 3. Select cable size iteratively (must satisfy Ib ≤ In ≤ Iz)
  const standardCableSizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120];
  const cableType = 'pvc-single'; // Default, can be parameterized
  
  let selectedCable: { size: number; result: any } | null = null;
  
  for (const size of standardCableSizes) {
    try {
      const result = calculateCableCapacity({
        cableSize: size,
        designCurrent: Ib,
        deviceRating: In,
        ambientTemp,
        groupingCircuits: grouping,
        installationMethod: installMethod,
        cableType,
        cableLength: distance,
        voltage
      });

      // Check if cable satisfies BS 7671 fundamental rule
      if (result.compliance.overallCompliant && result.voltageDrop.compliant) {
        selectedCable = { size, result };
        break;
      }
    } catch (error) {
      console.warn(`⚠️ Cable calculation failed for size ${size}mm²:`, error.message);
      continue; // Try next size
    }
  }

  if (!selectedCable) {
    warnings.push('No standard cable size satisfies all requirements - consult specialist');
    // Select largest size as fallback
    const fallbackSize = standardCableSizes[standardCableSizes.length - 1];
    selectedCable = { 
      size: fallbackSize,
      result: calculateCableCapacity({
        cableSize: fallbackSize,
        designCurrent: Ib,
        deviceRating: In,
        ambientTemp,
        groupingCircuits: grouping,
        installationMethod: installMethod,
        cableType,
        cableLength: distance,
        voltage
      })
    };
  }

  regulations.push('525');
  regulations.push('Regulation 525 - Voltage drop limits');
  regulations.push('Table 4D5');
  regulations.push('Table 4D5 - Cable current capacities');
  regulations.push('411.3.2');
  regulations.push('Regulation 411.3.2 - Earth fault loop impedance');
  regulations.push('Table 41.3');
  regulations.push('Table 41.3 - Maximum earth fault loop impedance');

  // Add warnings based on results
  if (!selectedCable.result.voltageDrop.compliant) {
    warnings.push(`Voltage drop ${selectedCable.result.voltageDrop.voltageDropPercent.toFixed(2)}% exceeds limit`);
  }
  
  if (!selectedCable.result.earthFault.compliant) {
    warnings.push('Earth fault loop impedance exceeds maximum value');
  }

  // NEW: Edge case validation
  const edgeCaseWarnings = validateEdgeCases(params, selectedCable);
  warnings.push(...edgeCaseWarnings);

  return {
    designCurrent: Math.round(Ib * 10) / 10,
    mcbRating: In,
    cableSize: selectedCable.size,
    cableType,
    voltageDrop: {
      volts: selectedCable.result.voltageDrop.voltageDropVolts,
      percent: selectedCable.result.voltageDrop.voltageDropPercent,
      compliant: selectedCable.result.voltageDrop.compliant
    },
    earthFault: {
      maxZs: selectedCable.result.earthFault.max,
      compliant: selectedCable.result.earthFault.compliant
    },
    calculations: {
      Ib: selectedCable.result.Ib,
      In: selectedCable.result.In,
      Iz: selectedCable.result.Iz,
      equation: selectedCable.result.equation
    },
    regulations,
    success: selectedCable.result.compliance.overallCompliant && selectedCable.result.voltageDrop.compliant,
    warnings
  };
}

/**
 * Edge Case Validation - Real-world installation constraints
 * Catches issues that pure calculations might miss
 */
function validateEdgeCases(params: any, cable: any): string[] {
  const warnings: string[] = [];
  
  // 1. BATHROOM REQUIREMENTS (Section 701)
  if (params.location === 'bathroom') {
    warnings.push('⚠️ BATHROOM: RCD protection mandatory (Section 701.411.3.3)');
    warnings.push('⚠️ BATHROOM: Check IP rating for zones - IPX4 minimum in Zone 2');
    warnings.push('⚠️ BATHROOM: Verify equipment locations comply with zones 0, 1, 2');
  }
  
  // 2. HIGH-POWER APPLIANCES
  if (params.power > 3000 && params.loadType !== 'socket') {
    warnings.push('⚠️ APPLIANCE >3kW: Local isolation required (Regulation 537.2.1.1)');
  }
  
  // 3. OUTDOOR CIRCUITS (Section 522)
  if (params.location === 'outdoor') {
    warnings.push('⚠️ OUTDOOR: Buried cable needs 600mm depth + warning tape (522.8.10)');
    warnings.push('⚠️ OUTDOOR: Use SWA or armoured cable for mechanical protection');
    warnings.push('⚠️ OUTDOOR: RCD protection mandatory for outdoor sockets (411.3.3)');
  }
  
  // 4. TT EARTHING SYSTEMS
  if (params.earthingSystem === 'TT') {
    warnings.push('⚠️ TT SYSTEM: RCD mandatory for all circuits (411.5.2)');
    warnings.push('⚠️ TT SYSTEM: Check earth electrode resistance (Ra × Ia ≤ 50V)');
  }
  
  // 5. VOLTAGE DROP MARGIN
  if (cable.result.voltageDrop.voltageDropPercent > 2.5 && cable.result.voltageDrop.voltageDropPercent <= 3.0) {
    warnings.push('⚠️ Voltage drop near 3% limit - consider next cable size for safety margin');
  }
  
  // 6. HIGH AMBIENT TEMPERATURE
  if (params.ambientTemp > 35) {
    warnings.push('⚠️ High ambient temp - verify derating factors from Table 4B1');
  }
  
  // 7. KITCHEN CIRCUITS
  if (params.location === 'kitchen' && params.loadType === 'socket') {
    warnings.push('💡 KITCHEN: Socket outlets above worktop should be >450mm from sink');
    warnings.push('💡 KITCHEN: Consider dedicated circuits for major appliances');
  }
  
  // 8. LOFT/ATTIC INSTALLATIONS
  if (params.location === 'loft') {
    warnings.push('⚠️ LOFT: Check insulation contact - may need higher derating');
    warnings.push('⚠️ LOFT: Consider mechanical protection for cables in accessible areas');
  }
  
  // 9. SHOWER SPECIFIC (Section 701)
  if (params.loadType === 'shower') {
    warnings.push('💡 SHOWER: 30mA RCD protection required (701.411.3.3)');
    warnings.push('💡 SHOWER: Supplementary bonding may be required - check Section 701.415.2');
  }
  
  // 10. EV CHARGER SPECIFIC (Section 722)
  if (params.loadType === 'ev_charger') {
    warnings.push('⚠️ EV CHARGER: Dedicated circuit required (Section 722)');
    warnings.push('⚠️ EV CHARGER: Type A or Type B RCD required for DC fault protection');
    warnings.push('⚠️ EV CHARGER: O-PEN device recommended for TN-C-S systems');
  }
  
  return warnings;
}
