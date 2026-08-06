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
export const checkZsCompliance = (
  result: TestResult,
  earthingArrangement?: string
): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];

  if (!result.zs) return warnings;

  const zsValue = parseFloat(result.zs);
  if (isNaN(zsValue)) return warnings;

  const rating = parseInt(result.protectiveDeviceRating);
  if (isNaN(rating)) {
    // ELE-1505 — a measured Zs with no device rating cannot be compared to
    // anything, and returning silently made it look identical to a reading that
    // passed. This guard sat upstream of the "not verified" message added
    // below, so it was still the quiet path out.
    warnings.push({
      severity: 'warning',
      title: 'Maximum Zs Not Verified',
      description:
        `Zs of ${result.zs}Ω has not been checked against a limit — no protective device ` +
        `rating is recorded for this circuit.`,
      regulation: 'BS 7671 Tables 41.2–41.4',
      suggestion:
        'Record the protective device rating (and its BS EN standard) so the measured Zs ' +
        'can be verified.',
    });
    return warnings;
  }

  // ELE-1505 — resolve the device from every field that describes it, not just
  // the first one. Production data routinely leaves `protectiveDeviceType`
  // blank and puts the standard in `bsStandard` ("MCB (BS EN 60898)") with the
  // curve in its own column. Passing only `protectiveDeviceType` meant the
  // lookup returned null for 1,013 of the 2,354 circuits that carry a measured
  // Zs — 43% — and the check below silently skipped every one of them.
  const deviceType = (() => {
    const parts = [
      result.protectiveDeviceType,
      result.bsStandard,
      result.protectiveDeviceCurve ? `Type ${result.protectiveDeviceCurve}` : '',
    ].filter(Boolean) as string[];
    // Drop a part already contained in another — production rows carry
    // `protectiveDeviceType: "MCB"` alongside `bsStandard: "MCB (BS EN 60898)"`,
    // which read back to the user as "MCB MCB (BS EN 60898)".
    return parts
      .filter((part, i) => !parts.some((other, j) => j !== i && other.includes(part) && other !== part))
      .join(' ')
      .trim();
  })();
  const circuitDescription = result.circuitDescription || '';
  const isTT = earthingArrangement === 'TT';

  // For TT systems the RCD provides fault protection, so the Zs limit comes from
  // Table 41.5 (Reg 411.5.3: Ra × I∆n ≤ 50 V), not the fuse/MCB tables —
  // 50 / I∆n, e.g. 1667Ω for a 30mA RCD.
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
        description:
          'TT earthing arrangements require RCD protection on all circuits (Reg 411.5.2). No RCD detected on this circuit.',
        regulation: 'BS 7671 Regulation 411.5.2',
        suggestion: 'Install RCD protection (typically 30mA) for all circuits on TT systems.',
      });
      return warnings;
    }
  }

  // A breaker with no curve recorded resolves to the Type B column, which is the
  // most permissive of the three — a Type C limit is roughly half the Type B
  // limit at the same rating. Assuming the generous answer is how a
  // non-compliant circuit passes quietly, so ask rather than assume.
  const looksLikeBreaker = /mcb|rcbo|circuit.?breaker|60898|61009/i.test(deviceType);
  if (looksLikeBreaker && !result.protectiveDeviceCurve) {
    warnings.push({
      severity: 'warning',
      title: 'Device Curve Not Recorded — Zs Not Verified',
      description:
        `Zs of ${result.zs}Ω has not been checked: the breaker curve is missing. Type B, C ` +
        `and D have different maximum Zs values — a Type C limit is around half the Type B ` +
        `limit for the same rating.`,
      regulation: 'BS 7671 Table 41.3',
      suggestion: 'Record the device curve (B, C or D) so the measured Zs can be verified.',
    });
  }

  // Get Zs limit from official BS 7671 data (TN systems). Skipped entirely when
  // the curve is missing — the Type B fallback would be a guess, not a verdict.
  const zsLookup =
    looksLikeBreaker && !result.protectiveDeviceCurve
      ? null
      : getZsLimitFromDeviceString(deviceType, rating, circuitDescription);

  // ELE-1505 — when the device cannot be resolved, say so. Falling through
  // silently made a measurement nobody checked look exactly like one that
  // passed, which is the worse of the two failures.
  if (!zsLookup && !(looksLikeBreaker && !result.protectiveDeviceCurve)) {
    warnings.push({
      severity: 'warning',
      title: 'Maximum Zs Not Verified',
      description:
        `Zs of ${result.zs}Ω has not been checked against a limit — there is no published ` +
        `maximum Zs for ${deviceType ? `"${deviceType}"` : 'this device'} at ${rating}A.`,
      regulation: 'BS 7671 Tables 41.2–41.4',
      suggestion:
        'Record the protective device standard (BS EN 60898, BS 88-3, BS 3036 etc.) and its ' +
        'rating so the measured Zs can be verified.',
    });
  }

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
        regulation: 'Elec-Mate check — a 10% margin is ours, not a BS 7671 limit',
        suggestion:
          'Verify Zs value with temperature correction applied. Operating temperature may increase impedance.',
      });
    }
  }

  return warnings;
};
