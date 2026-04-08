import { TestResult } from '@/types/testResult';
import { RegulationWarning } from './types';
import {
  getZsLimitFromDeviceString,
  getDisconnectionTimeForCircuit,
  getRcdZsLimit,
  type ZsLookupResult,
  type RcdRating,
} from '@/data/zsLimits';

// RCD requirement checker
const shouldHaveRCD = (result: TestResult): boolean => {
  const description = result.circuitDescription?.toLowerCase() || '';
  const type = result.type?.toLowerCase() || '';

  // Socket outlets require RCD protection (Reg 411.3.3)
  if (description.includes('socket') || type.includes('socket') || type.includes('ring')) {
    return true;
  }

  // Bathroom circuits require RCD protection (Reg 701.411.3.3)
  if (description.includes('bathroom') || description.includes('shower')) {
    return true;
  }

  // Outdoor circuits require RCD protection (Reg 411.3.3)
  if (
    description.includes('outdoor') ||
    description.includes('garden') ||
    description.includes('external')
  ) {
    return true;
  }

  // Mobile equipment outdoors (Reg 411.3.3)
  if (description.includes('mobile') && description.includes('outdoor')) {
    return true;
  }

  return false;
};

// Enhanced Zs validation using correct BS 7671 Tables 41.2, 41.3, 41.4
// Optional earthingArrangement param — when 'TT', use RCD-based Zs limits instead of fuse/MCB tables
export const checkZsCompliance = (result: TestResult, earthingArrangement?: string): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];

  if (!result.zs) return warnings;

  const zsValue = parseFloat(result.zs);
  if (isNaN(zsValue)) return warnings;

  const rating = parseInt(result.protectiveDeviceRating);
  if (isNaN(rating)) return warnings;

  const deviceType = result.protectiveDeviceType || '';
  const circuitDescription = result.circuitDescription || '';
  const isTT = earthingArrangement === 'TT';

  // For TT systems, Zs limit is based on RCD rating (Reg 411.5.2), not fuse/MCB tables
  // TT systems rely on RCD disconnection — max Zs = 230V / I∆n (e.g. 1667Ω for 30mA RCD)
  if (isTT) {
    const rcdRatingMa = parseInt(result.rcdRating?.replace('mA', '') || '');
    if (!isNaN(rcdRatingMa) && [30, 100, 300, 500].includes(rcdRatingMa)) {
      const rcdZs = getRcdZsLimit(rcdRatingMa as RcdRating);
      if (rcdZs && zsValue <= rcdZs.maxZs) {
        // Zs is within RCD-based limit — no warning needed for TT
        return warnings;
      }
    }
    // TT system without RCD — warn
    if (!result.rcdRating || result.rcdRating === 'N/A') {
      warnings.push({
        severity: 'critical',
        title: 'TT System Requires RCD Protection',
        description: 'TT earthing arrangements require RCD protection on all circuits (Reg 411.5.2). No RCD detected on this circuit.',
        regulation: 'BS 7671 Regulation 411.5.2',
        suggestion: 'Install RCD protection (typically 30mA) for all circuits on TT systems.',
      });
      return warnings;
    }
  }

  // Get Zs limit from official BS 7671 data (TN systems)
  const zsLookup = getZsLimitFromDeviceString(deviceType, rating, circuitDescription);

  if (zsLookup && zsValue > zsLookup.maxZs) {
    const disconnectionTime = getDisconnectionTimeForCircuit(circuitDescription);
    const regulation =
      disconnectionTime === '0.4s'
        ? 'BS 7671 Regulation 411.3.2.2'
        : 'BS 7671 Regulation 411.3.2.3';

    warnings.push({
      severity: 'critical',
      title: 'Zs Exceeds Maximum Limit',
      description: `Zs of ${result.zs}Ω exceeds maximum ${zsLookup.maxZs}Ω for ${deviceType} ${rating}A (${disconnectionTime} disconnection, ${zsLookup.source}).`,
      regulation,
      suggestion: `Consider: • Improving earthing arrangement • Checking connections for high resistance • Upgrading cable size • Adding supplementary bonding • Using alternative protective device`,
    });
  }

  // Check RCD requirements
  if (shouldHaveRCD(result) && !result.rcdRating) {
    warnings.push({
      severity: 'warning',
      title: 'RCD Protection Required',
      description: `Circuit "${result.circuitDescription}" requires RCD protection but none detected.`,
      regulation: 'BS 7671 Regulation 411.3.3',
      suggestion: 'Install 30mA RCD protection for this circuit type.',
    });
  }

  // Check if Zs is close to limit (within 10%)
  if (zsLookup && zsValue <= zsLookup.maxZs) {
    const margin = ((zsLookup.maxZs - zsValue) / zsLookup.maxZs) * 100;
    if (margin < 10) {
      warnings.push({
        severity: 'warning',
        title: 'Zs Close to Maximum Limit',
        description: `Zs of ${result.zs}Ω is within 10% of maximum ${zsLookup.maxZs}Ω. Consider temperature correction.`,
        regulation: 'BS 7671 Appendix 14',
        suggestion:
          'Verify Zs value with temperature correction applied. Operating temperature may increase impedance.',
      });
    }
  }

  return warnings;
};
