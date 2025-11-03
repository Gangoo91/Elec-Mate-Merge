/**
 * Circuit Validation and Auto-Correction Module
 * Ensures circuits meet BS 7671 requirements
 */

/**
 * Auto-correct missing RCD protection flags
 * Fixes AI omissions before validation runs
 */
export function autoCorrectRCDProtection(circuits: any[], incomingSupply: any, logger: any): void {
  let correctionCount = 0;
  
  circuits.forEach((circuit, index) => {
    const loadType = circuit.loadType?.toLowerCase() || '';
    const location = circuit.specialLocation?.toLowerCase() || '';
    
    // Check if RCD should be enabled but isn't
    const shouldHaveRCD = 
      loadType.includes('socket') ||
      loadType.includes('outdoor') ||
      location.includes('bathroom') ||
      location.includes('outdoor') ||
      incomingSupply.earthingSystem === 'TT';
    
    if (shouldHaveRCD && !circuit.rcdProtected) {
      logger.warn(`🔧 Auto-correcting missing RCD protection for circuit ${index + 1}: ${circuit.name}`);
      
      circuit.rcdProtected = true;
      circuit.rcdProtectedText = circuit.protectionDevice?.type === 'RCBO' ? '30mA RCBO' : '30mA RCD';
      
      // Update justification if missing or incomplete
      if (!circuit.justifications) {
        circuit.justifications = {};
      }
      if (!circuit.justifications.rcd || circuit.justifications.rcd.length < 50) {
        circuit.justifications.rcd = `30mA RCD protection is provided to the ${circuit.name} per Regulation 411.3.3 for socket outlets that may supply portable equipment. This provides additional protection against earth faults.`;
      }
      
      correctionCount++;
    }
  });
  
  if (correctionCount > 0) {
    logger.info(`✅ Auto-corrected ${correctionCount} circuits with missing RCD protection`);
  }
}

/**
 * Auto-correct undersized MCB ratings before validation
 * Ensures Ib ≤ In by rounding up to next standard MCB size
 */
export function autoCorrectMCBSizing(circuits: any[], logger: any): any[] {
  const standardSizes = [6, 10, 16, 20, 32, 40, 50, 63, 80, 100];
  
  return circuits.map(circuit => {
    const Ib = circuit.calculations?.Ib;
    const In = circuit.protectionDevice?.rating;
    
    if (Ib && In && Ib > In) {
      // Find next standard size up
      const correctIn = standardSizes.find(size => size >= Math.ceil(Ib)) || 100;
      
      logger.warn(`⚠️ Auto-correcting MCB: ${circuit.name} - Ib=${Ib.toFixed(2)}A, In=${In}A → ${correctIn}A`, {
        circuit: circuit.name,
        originalIn: In,
        correctedIn: correctIn,
        Ib: Ib.toFixed(2)
      });
      
      circuit.protectionDevice.rating = correctIn;
      circuit.calculations.In = correctIn;
      circuit.nominalCurrentIn = correctIn;
      
      // Recalculate safety margin
      if (circuit.calculations.Iz) {
        circuit.calculations.safetyMargin = ((circuit.calculations.Iz - correctIn) / correctIn) * 100;
      }
      
      // Update justifications to reflect auto-correction
      if (circuit.justifications?.protection) {
        circuit.justifications.protection = circuit.justifications.protection.replace(
          new RegExp(`${In}A`, 'g'),
          `${correctIn}A`
        );
      }
    }
    
    return circuit;
  });
}

/**
 * Ensure all required PDF fields are present
 */
export function ensurePDFFields(circuits: any[]): any[] {
  return circuits.map(circuit => ({
    ...circuit,
    designCurrentIb: circuit.designCurrentIb || circuit.calculations?.Ib?.toFixed(1) || '0.0',
    nominalCurrentIn: circuit.nominalCurrentIn || circuit.protectionDevice?.rating || 0,
    cableCurrentRatingIz: circuit.cableCurrentRatingIz || circuit.calculations?.Iz?.toFixed(1) || '0.0',
    voltageDropVolts: circuit.voltageDropVolts || circuit.calculations?.voltageDrop?.volts?.toFixed(2) || '0.00',
    voltageDropPercent: circuit.voltageDropPercent || circuit.calculations?.voltageDrop?.percent?.toFixed(2) || '0.00',
    earthFaultLoopZs: circuit.earthFaultLoopZs || circuit.calculations?.zs?.toFixed(2) || '0.00',
    maxZs: circuit.maxZs || circuit.calculations?.maxZs?.toFixed(2) || '7.28',
    rcdProtectedText: circuit.rcdProtectedText || (circuit.rcdProtected ? '30mA RCD' : 'Not Required'),
    specialLocation: circuit.specialLocation || 'none'
  }));
}
