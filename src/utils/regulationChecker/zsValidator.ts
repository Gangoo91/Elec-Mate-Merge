import { TestResult } from '@/types/testResult';
import { hasReading } from '@/utils/validation/applicability';
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

/**
 * A final circuit supplying luminaires.
 *
 * Emergency lighting is deliberately excluded — it is a safety service, and the
 * regulations treat it separately. Demanding a 30 mA RCD on an emergency
 * lighting circuit would be a wrong finding on a circuit that is often
 * intentionally not RCD-protected.
 */
const isLightingCircuit = (result: TestResult): boolean => {
  const description = result.circuitDescription?.toLowerCase() || '';
  const type = result.type?.toLowerCase() || '';
  if (description.includes('emergency')) return false;
  return /light|luminaire|downlight/.test(description) || /light/.test(type);
};

/**
 * Which maximum a measured Zs is judged against.
 *
 * `100` — the tabulated maximum from Tables 41.2–41.4 as printed.
 *
 * `80` — 0.8 × that maximum. This is not a safety margin someone invented: BS
 * 7671 Reg 411.4.4 states the requirement is met when the measured earth fault
 * loop impedance satisfies Zs(m) < 0.8 × (Up / (I × Cmin)), and GN3 Appendix 3
 * repeats it. The factor corrects for the fact that the tabulated values assume
 * conductors at operating temperature while the reading is taken cold, so a
 * circuit measured at ambient can sit under the printed figure and still fail
 * once warm.
 *
 * The schedule records measured values, so 80 is arguably the truer test.
 * 100 remains the default because changing it silently would re-judge every
 * certificate already written — this is the electrician's call, made on the
 * toolbar, not ours made for them.
 */
export type ZsBasis = 100 | 80;

// Enhanced Zs validation using correct BS 7671 Tables 41.2, 41.3, 41.4
// Optional earthingArrangement param — when 'TT', use RCD-based Zs limits instead of fuse/MCB tables
export const checkZsCompliance = (
  result: TestResult,
  earthingArrangement?: string,
  zsBasis: ZsBasis = 100
): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];

  /*
   * Whether a circuit needs an RCD has nothing to do with its Zs.
   *
   * These checks used to sit below the `if (!result.zs) return` guard, so a
   * circuit with no loop reading recorded produced no RCD finding at all —
   * including the TT case, which is a critical. That is exactly backwards for
   * an EICR: a circuit you have not yet tested is precisely when you are
   * writing down what is installed, and "no RCD on the sockets" is a finding
   * whether or not anyone has put a meter on it yet. Hoisted above the guard.
   */
  const isTTSystem = earthingArrangement === 'TT';
  if (isTTSystem && !hasReading(result.rcdRating)) {
    warnings.push({
      severity: 'critical',
      title: 'TT System Requires RCD Protection',
      fields: ['rcdRating'],
      description:
        'TT earthing arrangements require RCD protection on all circuits (Reg 411.5.2). No RCD detected on this circuit.',
      regulation: 'BS 7671 Regulation 411.5.2',
      suggestion: 'Install RCD protection (typically 30mA) for all circuits on TT systems.',
    });
  }

  if (isLightingCircuit(result) && !hasReading(result.rcdRating)) {
    warnings.push({
      severity: 'warning',
      title: 'Lighting Circuit Without RCD Protection',
      fields: ['rcdRating'],
      description:
        `No RCD is recorded for "${result.circuitDescription}". Since A4:2026, AC final ` +
        `circuits supplying luminaires in domestic premises require additional protection ` +
        `by an RCD not exceeding 30 mA.`,
      regulation: 'BS 7671 Regulation 411.3.4',
      suggestion:
        'If these are domestic premises, record the RCD or consider an observation — ' +
        'typically C3, as the circuit will have complied when installed.',
    });
  }


  // Check RCD requirements
  if (shouldHaveRCD(result) && !result.rcdRating) {
    warnings.push({
      severity: 'warning',
      title: 'RCD Protection Required',
      fields: ['rcdRating'],
      description: `Circuit "${result.circuitDescription}" requires RCD protection but none detected.`,
      regulation: 'BS 7671 Regulation 411.3.3',
      suggestion: 'Install 30mA RCD protection for this circuit type.',
    });
  }


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
      fields: ['zs', 'protectiveDeviceRating'],
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
    // The TT-without-RCD finding is raised above, before the Zs guard, so that
    // it still appears on a circuit with no loop reading. Returning here keeps
    // the original behaviour of not judging Zs against the TN tables on a TT
    // circuit that has no RCD to derive a limit from.
    if (!hasReading(result.rcdRating)) {
      return warnings;
    }
  }

  // A breaker with no curve recorded resolves to the Type B column, which is the
  // most permissive of the three — a Type C limit is roughly half the Type B
  // limit at the same rating. Assuming the generous answer is how a
  // non-compliant circuit passes quietly, so ask rather than assume.
  const looksLikeBreaker = /mcb|rcbo|circuit.?breaker|60898|61009|3871/i.test(deviceType);
  /*
   * ELE-1604 — a withdrawn BS 3871 breaker is typed 1/2/3/4, not B/C/D, and
   * BS 7671 does not tabulate it at all. Asking for "the curve (B, C or D)" on
   * such a row sends the inspector looking for something that is not moulded on
   * the device, and citing Table 41.3 for it would be a false citation.
   */
  const isBs3871 = /3871/i.test(deviceType);
  if (looksLikeBreaker && !result.protectiveDeviceCurve) {
    warnings.push({
      severity: 'warning',
      title: 'Device Type Not Recorded — Zs Not Verified',
      fields: ['protectiveDeviceCurve', 'zs'],
      description: isBs3871
        ? `Zs of ${result.zs}Ω has not been checked: the BS 3871 breaker type is missing. ` +
          `Types 1, 2, 3 and 4 trip at 4, 7, 10 and 50 times rated current, so their maximum ` +
          `Zs values differ by more than a factor of ten at the same rating.`
        : `Zs of ${result.zs}Ω has not been checked: the breaker curve is missing. Type B, C ` +
          `and D have different maximum Zs values — a Type C limit is around half the Type B ` +
          `limit for the same rating.`,
      regulation: isBs3871 ? 'IET On-Site Guide Table B6' : 'BS 7671 Table 41.3',
      suggestion: isBs3871
        ? 'Record the BS 3871 type (1, 2, 3 or 4) so the measured Zs can be verified.'
        : 'Record the device curve (B, C or D) so the measured Zs can be verified.',
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
      fields: ['zs', 'protectiveDeviceRating'],
      description:
        `Zs of ${result.zs}Ω has not been checked against a limit — there is no published ` +
        `maximum Zs for ${deviceType ? `"${deviceType}"` : 'this device'} at ${rating}A.`,
      regulation: 'BS 7671 Tables 41.2–41.4',
      suggestion:
        'Record the protective device standard (BS EN 60898, BS 88-3, BS 3036 etc.) and its ' +
        'rating so the measured Zs can be verified.',
    });
  }

  // The limit actually applied. Named separately from the tabulated value so
  // the message below can quote both — being told you failed against 0.35 Ω
  // when the book says 0.44 Ω is confusing unless the working is shown.
  const appliedMaxZs = zsLookup ? zsLookup.maxZs * (zsBasis / 100) : null;

  if (zsLookup && appliedMaxZs !== null && zsValue > appliedMaxZs) {
    const disconnectionTime = getDisconnectionTimeForCircuit(circuitDescription);
    const regulation =
      disconnectionTime === '0.4s'
        ? 'BS 7671 Regulation 411.3.2.2'
        : 'BS 7671 Regulation 411.3.2.3';

    warnings.push({
      severity: 'critical',
      title: 'Zs Exceeds Maximum Limit',
      fields: ['zs', 'maxZs'],
      description:
        zsBasis === 80
          ? `Zs of ${result.zs}Ω exceeds ${appliedMaxZs.toFixed(2)}Ω for ${deviceType} ${rating}A ` +
            `(${disconnectionTime} disconnection, ${zsLookup.source}). That is 0.8 × the tabulated ` +
            `${zsLookup.maxZs}Ω — the correction Reg 411.4.4 applies to a value measured at ambient ` +
            `temperature.`
          : `Zs of ${result.zs}Ω exceeds maximum ${zsLookup.maxZs}Ω for ${deviceType} ${rating}A (${disconnectionTime} disconnection, ${zsLookup.source}).`,
      // At the 80% basis the circuit may well be inside the printed table, so
      // citing 411.3.2.2 alone would send the reader to a figure it passes.
      regulation: zsBasis === 80 ? `${regulation} (via 411.4.4)` : regulation,
      suggestion: `Consider: • Improving earthing arrangement • Checking connections for high resistance • Upgrading cable size • Adding supplementary bonding • Using alternative protective device`,
    });
  }

  /*
   * Lighting circuits in domestic premises — new at A4:2026.
   *
   * Reg 411.3.4 requires additional protection by a 30 mA RCD for AC final
   * circuits supplying luminaires within domestic (household) premises. Until
   * A4 this applied to sockets and specific locations, so the overwhelming
   * majority of existing domestic lighting circuits do not have it — which is
   * precisely why an EICR assessed against the current standard should raise
   * it, and precisely why the checker staying silent was a real gap.
   *
   * A warning, not a failure: on an EICR this is normally a C3 (improvement
   * recommended) because the circuit complied when it was installed. The code
   * stays the electrician's — the checker's job is to make sure they saw it.
   */
  // Check if Zs is close to limit (within 10%)
  if (zsLookup && appliedMaxZs !== null && zsValue <= appliedMaxZs) {
    const margin = ((appliedMaxZs - zsValue) / appliedMaxZs) * 100;
    if (margin < 10) {
      warnings.push({
        severity: 'warning',
        title: 'Zs Close to Maximum Limit',
        fields: ['zs', 'maxZs'],
        // "Consider temperature correction" is the wrong advice at the 80%
        // basis — that correction is already applied, and repeating it reads as
        // though the reading has not been adjusted when it has.
        description:
          zsBasis === 80
            ? `Zs of ${result.zs}Ω is within 10% of the ${appliedMaxZs.toFixed(2)}Ω limit ` +
              `(0.8 × the tabulated ${zsLookup.maxZs}Ω). Little margin left.`
            : `Zs of ${result.zs}Ω is within 10% of maximum ${zsLookup.maxZs}Ω. Consider temperature correction.`,
        regulation: 'Elec-Mate check — a 10% margin is ours, not a BS 7671 limit',
        suggestion:
          'Verify Zs value with temperature correction applied. Operating temperature may increase impedance.',
      });
    }
  }

  return warnings;
};
