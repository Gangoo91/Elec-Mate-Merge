import { TestResult } from '@/types/testResult';
import { RegulationWarning } from './types';
import { isRingCircuit } from './ringCircuitDetector';
import { hasReading, readNumber } from '@/utils/validation/applicability';

// Check circuit type consistency with enhanced ring circuit validation
export const checkCircuitTypeConsistency = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];

  if (!result.circuitDescription || !result.protectiveDeviceRating) {
    return warnings;
  }

  const circuitType = result.circuitDescription.toLowerCase();
  /*
   * `readNumber`, not `parseInt`.
   *
   * "N/A", "LIM" and "—" are first-class values on our schedule, and
   * `parseInt('N/A')` is NaN. Every comparison below is a `!==` or a `<`, both
   * of which are true for NaN, so a circuit whose rating was deliberately marked
   * not-applicable produced a confident finding — printed to the electrician as
   * "Ring final circuits typically use 32A protection, but NaNA is specified".
   *
   * Null now means "cannot judge", and each check abstains rather than guessing.
   */
  const deviceRating = readNumber(result.protectiveDeviceRating);
  const isRing = isRingCircuit(result);

  // Common circuit type expectations
  if (circuitType.includes('lighting') && deviceRating !== null && deviceRating > 16) {
    warnings.push({
      severity: 'warning',
      title: 'Unusual Lighting Circuit Rating',
      fields: ['protectiveDeviceRating'],
      description: `${deviceRating}A protection is unusually high for lighting circuits.`,
      regulation: 'Elec-Mate check — not a BS 7671 requirement',
      suggestion: 'Typical lighting circuits use 6A or 10A protection. Verify load requirements.',
    });
  }

  // Enhanced ring circuit validation
  if (isRing) {
    if (deviceRating !== null && deviceRating !== 32) {
      warnings.push({
        severity: 'warning',
        title: 'Non-Standard Ring Final Rating',
        fields: ['protectiveDeviceRating'],
        description: `Ring final circuits typically use 32A protection, but ${deviceRating}A is specified.`,
        regulation: 'Elec-Mate check — BS 7671 Reg 433.1.204 permits 30A or 32A',
        suggestion: 'Verify if this is intended as a ring final or radial circuit.',
      });
    }

    /*
     * Only judge a size that was actually recorded. `hasReading` excludes both
     * blank and the limitation markers — without it, "N/A" fell through as a
     * value and was reported back as "but N/A is specified", which reads as an
     * accusation about a field the electrician deliberately left alone.
     */
    const normalisedSize = result.liveSize?.replace(/mm²?/g, '').trim() || '';
    if (hasReading(result.liveSize) && !['2.5', '4'].includes(normalisedSize)) {
      warnings.push({
        severity: 'warning',
        title: 'Non-Standard Ring Final Cable Size',
        fields: ['liveSize'],
        description: `Ring final circuits typically use 2.5mm² or 4mm² cable, but ${result.liveSize} is specified.`,
        regulation: 'BS 7671 Appendix 15 (informative) — ring and radial final circuits',
        suggestion: 'Verify cable size is appropriate for the intended ring final application.',
      });
    }
  }

  if (circuitType.includes('shower') && deviceRating !== null && deviceRating < 32) {
    warnings.push({
      severity: 'warning',
      title: 'Low Rating for Shower Circuit',
      fields: ['protectiveDeviceRating'],
      description: `${deviceRating}A may be insufficient for typical shower loads.`,
      regulation: 'Elec-Mate check — not a BS 7671 requirement',
      suggestion:
        'Electric showers typically require 40A or 45A protection. Verify shower power rating.',
    });
  }

  return warnings;
};
