
import { TestResult } from '@/types/testResult';
import { RegulationWarning } from './types';
import { isRingCircuit } from './ringCircuitDetector';

// Check circuit type consistency with enhanced ring circuit validation
export const checkCircuitTypeConsistency = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];
  
  if (!result.circuitDescription || !result.protectiveDeviceRating) {
    return warnings;
  }

  const circuitType = result.circuitDescription.toLowerCase();
  const deviceRating = parseInt(result.protectiveDeviceRating);
  const isRing = isRingCircuit(result);

  // Common circuit type expectations
  if (circuitType.includes('lighting') && deviceRating > 16) {
    warnings.push({
      severity: 'warning',
      title: 'Unusual Lighting Circuit Rating',
      description: `${deviceRating}A protection is unusually high for lighting circuits.`,
      regulation: 'BS 7671 Section 311',
      suggestion: 'Typical lighting circuits use 6A or 10A protection. Verify load requirements.'
    });
  }

  // Enhanced ring circuit validation
  if (isRing) {
    if (deviceRating !== 32) {
      warnings.push({
        severity: 'warning',
        title: 'Non-Standard Ring Final Rating',
        description: `Ring final circuits typically use 32A protection, but ${deviceRating}A is specified.`,
        regulation: 'BS 7671 Regulation 433.1',
        suggestion: 'Verify if this is intended as a ring final or radial circuit.'
      });
    }

    if (result.liveSize !== '2.5mm') {
      warnings.push({
        severity: 'warning',
        title: 'Non-Standard Ring Final Cable Size',
        description: `Ring final circuits typically use 2.5mm² cable, but ${result.liveSize} is specified.`,
        regulation: 'BS 7671 Appendix 15',
        suggestion: 'Verify cable size is appropriate for the intended ring final application.'
      });
    }

  }

  if (circuitType.includes('shower') && deviceRating < 32) {
    warnings.push({
      severity: 'warning',
      title: 'Low Rating for Shower Circuit',
      description: `${deviceRating}A may be insufficient for typical shower loads.`,
      regulation: 'BS 7671 Section 701',
      suggestion: 'Electric showers typically require 40A or 45A protection. Verify shower power rating.'
    });
  }

  return warnings;
};
