
import { TestResult } from '@/types/testResult';
import { RegulationWarning } from './types';
import { isRingCircuit } from './ringCircuitDetector';
import { getCableCapacity, getCableSizeForRating } from './cableCapacityCalculator';

// Helper function to detect lighting circuits
const isLightingCircuit = (result: TestResult): boolean => {
  const circuitType = result.type?.toLowerCase() || '';
  const description = result.circuitDescription?.toLowerCase() || '';
  
  // Check for common lighting circuit indicators
  const lightingKeywords = [
    'light', 'lights', 'lighting',
    'downstairs lights', 'upstairs lights', 'kitchen lights', 'outdoor lights',
    'bedroom lights', 'bathroom lights', 'hall lights', 'landing lights'
  ];
  
  return lightingKeywords.some(keyword => 
    circuitType.includes(keyword) || description.includes(keyword)
  );
};

// Check cable and protective device compatibility
export const checkCableProtectiveDeviceMatch = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];
  
  if (!result.liveSize || !result.protectiveDeviceRating) {
    return warnings;
  }

  const isRing = isRingCircuit(result);
  const isLighting = isLightingCircuit(result);
  const cableCapacity = getCableCapacity(result.liveSize, 'method_c', isRing);
  const deviceRating = parseInt(result.protectiveDeviceRating);

  if (cableCapacity === 0 || isNaN(deviceRating)) {
    return warnings;
  }

  // BS 7671 Regulation 433.1.1 - Cable capacity must exceed protective device rating
  if (deviceRating > cableCapacity) {
    const capacityNote = isRing ? ` (${cableCapacity/2}A × 2 parallel paths = ${cableCapacity}A effective capacity)` : ` (${cableCapacity}A capacity)`;
    warnings.push({
      severity: 'critical',
      title: 'Cable Undersized for Protective Device',
      description: `${result.liveSize} cable${capacityNote} cannot safely carry ${deviceRating}A protective device rating.`,
      regulation: 'BS 7671 Regulation 433.1.1',
      suggestion: `Use minimum ${getCableSizeForRating(deviceRating, 'method_c', isRing)} cable for ${deviceRating}A protection${isRing ? ' in ring configuration' : ''}.`
    });
  }

  // Skip oversized cable warning for auto-filled circuits, ring circuits, and lighting circuits (which are typically standard)
  if (!result.autoFilled && !isRing && !isLighting) {
    // Warning for oversized cable (more than 50% over required)
    const minRequiredCapacity = deviceRating * 1.25; // Allow 25% margin
    if (cableCapacity > minRequiredCapacity * 1.5) {
      warnings.push({
        severity: 'warning',
        title: 'Cable May Be Oversized',
        description: `${result.liveSize} cable appears oversized for ${deviceRating}A protection. Consider cable cost optimisation.`,
        regulation: 'BS 7671 Section 433',
        suggestion: `${getCableSizeForRating(deviceRating, 'method_c', isRing)} may be sufficient for this application.`
      });
    }
  }

  return warnings;
};
