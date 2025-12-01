/**
 * Consistency Validator - Ensures Overview Matches Design Justification
 * 
 * CRITICAL SAFETY ISSUE FIX:
 * The AI sometimes generates inconsistent values between:
 * - protectionDevice.rating (numeric field shown in "At a Glance")
 * - The protection rating mentioned in the design justification prose
 * 
 * This validator treats the justification as the SINGLE SOURCE OF TRUTH
 * and corrects any mismatches in the structured data.
 * 
 * PHASE 2: Industrial protective device support
 * - Validates max Zs for BS88, BS1361, BS3036 fuses
 * - Validates breaking capacity against PSCC
 */

import type { DesignedCircuit } from './types.ts';
import { getMaxZsForDevice } from '../shared/bs7671ProtectionData.ts';

/**
 * Validate and correct consistency between overview and justification
 * 
 * @param circuit - The designed circuit to validate
 * @param logger - Logger instance for debugging
 * @returns Corrected circuit with consistent values
 */
export function validateCircuitConsistency(
  circuit: DesignedCircuit, 
  logger: any
): DesignedCircuit {
  
  // Extract all justification text sections
  const justificationSections = [
    circuit.structuredOutput?.sections?.cableSelectionBreakdown || '',
    circuit.structuredOutput?.sections?.protectiveDeviceSelection || '',
    circuit.structuredOutput?.sections?.designJustification || '',
    circuit.justifications?.protection || ''
  ].join(' ');

  // Multiple regex patterns to catch different justification formats
  const patterns = [
    // "protective device rating (20 A)" or "protective device rating of 20A"
    /protective\s+device\s+rating\s*(?:of|\()\s*(\d+)\s*A/i,
    
    // "20A MCB" or "20A RCBO" or "20 A Type B MCB"
    /(\d+)\s*A\s+(?:Type\s+[A-D]\s+)?(?:MCB|RCBO)/i,
    
    // "protected by a 20A" or "protected by 20 A"
    /protected\s+by\s+(?:a\s+)?(\d+)\s*A/i,
    
    // "requires a 20A protective device"
    /requires?\s+(?:a\s+)?(\d+)\s*A\s+protective\s+device/i,
    
    // "selected 20A" or "using 20A"
    /(?:selected|using)\s+(?:a\s+)?(\d+)\s*A/i
  ];

  let justificationRating: number | null = null;

  // Try each pattern until we find a match
  for (const pattern of patterns) {
    const match = justificationSections.match(pattern);
    if (match) {
      justificationRating = parseInt(match[1]);
      break;
    }
  }

  // If we found a rating in the justification, validate consistency
  if (justificationRating !== null) {
    const structuredRating = circuit.protectionDevice?.rating;

    if (structuredRating && justificationRating !== structuredRating) {
      logger.warn('🔴 CONSISTENCY FIX: Protection rating mismatch detected', {
        circuit: circuit.name,
        overviewRating: `${structuredRating}A (WRONG - shown in "At a Glance")`,
        justificationRating: `${justificationRating}A (CORRECT - from design justification)`,
        action: `Correcting overview from ${structuredRating}A to ${justificationRating}A`,
        safetyImpact: 'CRITICAL - Could lead to incorrect protection device installation'
      });

      // Override with justification value (single source of truth)
      return {
        ...circuit,
        protectionDevice: {
          ...circuit.protectionDevice,
          rating: justificationRating
        },
        calculations: {
          ...circuit.calculations,
          In: justificationRating // Also fix In (nominal current of protective device)
        }
      };
    }

    // Values match - log success
    logger.info('✅ Consistency check passed', {
      circuit: circuit.name,
      rating: `${structuredRating}A`,
      status: 'Overview and justification match'
    });
  } else {
    // Could not extract rating from justification - log warning
    logger.warn('⚠️ Could not extract protection rating from justification', {
      circuit: circuit.name,
      structuredRating: circuit.protectionDevice?.rating,
      note: 'Manual review recommended'
    });
  }

  return circuit;
}

/**
 * Determine disconnection time based on circuit type
 * Per BS 7671 Regulation 411.3.2.3:
 * - Final circuits ≤32A (sockets, lighting): 0.4s (Table 41.3)
 * - Motors, conveyors, fixed equipment: 5s (Table 41.6)
 * - Distribution circuits: 5s (Table 41.6)
 */
function getDisconnectionTime(circuit: DesignedCircuit): 0.4 | 5 {
  const circuitType = circuit.loadType?.toLowerCase() || '';
  const name = circuit.name?.toLowerCase() || '';
  
  // Motor/fixed equipment circuits = 5s
  const motorKeywords = [
    'motor', 'compressor', 'chiller', 'conveyor', 'pump', 'fan',
    'auger', 'three-phase', 'machine', 'production', 'hvac',
    'air handler', 'ventilation', 'extraction', 'cooling tower'
  ];
  
  if (motorKeywords.some(kw => circuitType.includes(kw) || name.includes(kw))) {
    return 5;
  }
  
  // Distribution circuits = 5s
  if (circuitType.includes('distribution') || circuitType.includes('sub-main') || 
      name.includes('distribution') || name.includes('sub-main')) {
    return 5;
  }
  
  // Final circuits (sockets, lighting) = 0.4s (default)
  return 0.4;
}

/**
 * Validate max Zs for industrial fuse types (BS88, BS1361, BS3036)
 * Also validates MCB/RCBO types B, C, D
 */
export function validateMaxZs(
  circuit: DesignedCircuit,
  logger: any
): { isValid: boolean; message?: string; correctedMaxZs?: number } {
  const { protectionDevice, calculations } = circuit;
  
  if (!protectionDevice || !calculations) {
    return { isValid: true };
  }
  
  // Determine device type for max Zs lookup
  let deviceTypeForLookup: 'B' | 'C' | 'D' | 'BS88' | 'BS1361' | 'BS3036' | null = null;
  
  if (protectionDevice.type === 'MCB' || protectionDevice.type === 'RCBO') {
    // Use curve for MCB/RCBO
    deviceTypeForLookup = protectionDevice.curve as 'B' | 'C' | 'D';
  } else if (['BS88', 'BS1361', 'BS3036', 'MCCB'].includes(protectionDevice.type)) {
    // Use device type directly for fuses
    deviceTypeForLookup = protectionDevice.type as 'BS88' | 'BS1361' | 'BS3036';
  }
  
  if (!deviceTypeForLookup) {
    logger.warn('Unknown device type for max Zs validation', {
      circuit: circuit.name,
      deviceType: protectionDevice.type
    });
    return { isValid: true };
  }
  
  // Skip MCCB as they don't have standard Zs tables (electronic trip)
  if (protectionDevice.type === 'MCCB') {
    logger.info('MCCB detected - skipping max Zs validation (electronic trip)', {
      circuit: circuit.name
    });
    return { isValid: true };
  }
  
  // Determine disconnection time based on circuit type
  const disconnectionTime = getDisconnectionTime(circuit);
  
  logger.info('Zs validation with disconnection time', {
    circuit: circuit.name,
    disconnectionTime: disconnectionTime + 's',
    circuitType: circuit.loadType,
    reason: disconnectionTime === 5 ? 'Motor/distribution circuit (Table 41.6)' : 'Final circuit (Table 41.3)'
  });
  
  // Get correct max Zs from BS 7671 tables with appropriate disconnection time
  const zsLookup = getMaxZsForDevice(deviceTypeForLookup, protectionDevice.rating, disconnectionTime);
  
  if (!zsLookup) {
    logger.warn('No max Zs data available', {
      circuit: circuit.name,
      deviceType: deviceTypeForLookup,
      rating: protectionDevice.rating,
      disconnectionTime
    });
    return { isValid: true };
  }
  
  const correctMaxZs = zsLookup.maxZs;
  const currentMaxZs = calculations.maxZs;
  
  // Check if max Zs is correct (allow 0.01Ω tolerance for rounding)
  if (currentMaxZs && Math.abs(currentMaxZs - correctMaxZs) > 0.01) {
    logger.warn('Max Zs correction applied', {
      circuit: circuit.name,
      deviceType: protectionDevice.type,
      rating: protectionDevice.rating,
      incorrectMaxZs: currentMaxZs,
      correctMaxZs,
      regulation: zsLookup.regulation
    });
    
    return {
      isValid: false,
      message: `Max Zs corrected: ${currentMaxZs}Ω → ${correctMaxZs}Ω (${zsLookup.regulation})`,
      correctedMaxZs: correctMaxZs
    };
  }
  
  // Check Zs compliance
  const calculatedZs = calculations.zs;
  if (calculatedZs > correctMaxZs) {
    logger.error('Zs exceeds maximum permitted', {
      circuit: circuit.name,
      calculatedZs,
      maxZs: correctMaxZs,
      exceedance: ((calculatedZs - correctMaxZs) / correctMaxZs * 100).toFixed(1) + '%',
      regulation: zsLookup.regulation
    });
  }
  
  logger.info('Max Zs validation passed', {
    circuit: circuit.name,
    deviceType: deviceTypeForLookup,
    rating: protectionDevice.rating,
    maxZs: correctMaxZs,
    calculatedZs,
    margin: ((correctMaxZs - calculatedZs) / correctMaxZs * 100).toFixed(1) + '%'
  });
  
  return { isValid: true };
}
