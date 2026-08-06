/**
 * Overload protection — BS 7671 Regulations 433.1.1, 433.1.202 and 433.1.204.
 *
 * Three rules that have to be applied to the right circuit, or the verdict is
 * wrong in one direction or the other.
 *
 * **Radial — 433.1.1.** In ≤ Iz. Condition (c) additionally requires the
 * operating current not to exceed 1.45 × Iz; for a BS EN 60898 breaker that
 * follows automatically, but for a semi-enclosed fuse it does not, and
 * **433.1.202** makes it concrete: If ≤ 0.725 × Iz. The existing check omits
 * this, so a 20 A rewireable fuse on 2.5 mm² (Iz 27 A) passes today. BS 7671
 * permits 19.6 A.
 *
 * **Ring final — 433.1.204.** A ring supplying BS 1363 accessories is *deemed*
 * to satisfy 433.1.1 if **Iz ≥ 20 A**. The device rating is not compared to Iz
 * at all, and the regulation explicitly permits 30 A or 32 A devices to BS 88,
 * **BS 3036**, BS EN 60898, BS EN 60947-2 or BS EN 61009-1.
 *
 * Two consequences that a naive implementation gets wrong:
 *
 *   1. Doubling Iz for a ring and comparing to In is not the test. The
 *      existing code does `iz * 2` for a ring, which passes any 32 A ring whose
 *      single-cable Iz is 16 A or more — well under the 20 A that 433.1.204
 *      actually asks for.
 *   2. Applying the 0.725 factor to a ring would fail every rewireable-fuse
 *      ring final — installations the regulation expressly allows.
 */
import { TestResult } from '@/types/testResult';
import { CircuitRule, Outcome } from '../types';
import { hasReading, isRealCircuit, readNumber, skipReason } from '../applicability';
import { detectTopology } from '../ringDetection';
import { getVerifiedCableCapacity } from '@/utils/regulationChecker/cableCapacity';

/**
 * True when the overcurrent device is a semi-enclosed (rewireable) fuse to
 * BS 3036. Read from the recorded BS (EN) number and device type — never from
 * the circuit description, which describes the load, not the device.
 */
const isSemiEnclosedFuse = (circuit: TestResult): boolean => {
  const haystack = `${circuit.bsStandard ?? ''} ${circuit.protectiveDeviceType ?? ''}`.toLowerCase();
  return (
    haystack.includes('3036') ||
    haystack.includes('semi-enclosed') ||
    haystack.includes('semi enclosed') ||
    haystack.includes('rewireable') ||
    haystack.includes('rewirable')
  );
};

/** 433.1.202 factor. Normative — "shall be used as written", not rounded. */
const BS3036_FACTOR = 0.725;

/** 433.1.204 deeming provision: minimum Iz for a ring final, in amperes. */
const RING_MIN_IZ = 20;

/** Device ratings the 433.1.204 deeming provision covers. */
const RING_DEEMED_RATINGS = [30, 32];

/** 433.1.204: minimum line and neutral CSA for a ring, in mm². */
const RING_MIN_CSA = 2.5;

/**
 * Exception in 433.1.204 — two-core mineral insulated cable to BS EN 60702-1
 * may be 1.5 mm² for line and neutral instead of 2.5 mm².
 */
const RING_MIN_CSA_MINERAL = 1.5;

/** Type-of-wiring code D is MICC; the text may also name it outright. */
const isMineralInsulated = (circuit: TestResult): boolean =>
  String(circuit.typeOfWiring ?? '').toUpperCase() === 'D' ||
  /mineral|micc|\bmi\b|60702/i.test(String(circuit.typeOfWiring ?? ''));

const csaOf = (live: string): number | null => {
  const n = parseFloat(String(live).replace(/[^\d.]/g, ''));
  return Number.isFinite(n) && n > 0 ? n : null;
};

interface Assessment {
  failed: boolean;
  /** Scannable headline for this specific failure. */
  title?: string;
  message: string;
  detail: string;
  suggestion: string;
}

/** 433.1.1 (with 433.1.202 for BS 3036) — everything that is not a ring. */
const assessRadial = (
  rating: number,
  iz: number,
  live: string,
  method: string,
  semiEnclosed: boolean
): Assessment => {
  const limit = semiEnclosed ? iz * BS3036_FACTOR : iz;
  if (rating <= limit) return { failed: false, message: '', detail: '', suggestion: '' };

  return {
    failed: true,
    title: semiEnclosed ? 'Rewireable Fuse Too Large for Cable' : 'Cable Undersized for Device',
    message: semiEnclosed
      ? `A ${rating}A rewireable fuse exceeds the ${limit.toFixed(1)}A permitted on this cable.`
      : `A ${rating}A device exceeds the ${limit.toFixed(1)}A capacity of this cable.`,
    detail: semiEnclosed
      ? `Cable capacity (Iz) is ${iz}A. A semi-enclosed fuse to BS 3036 must not exceed ` +
        `0.725 × Iz = ${limit.toFixed(1)}A, because it takes longer to operate than a ` +
        `cartridge fuse or breaker of the same rating.`
      : `Cable capacity (Iz) is ${iz}A for ${live}mm², reference method ${method}.`,
    suggestion: semiEnclosed
      ? `Increase the cable size, reduce the fuse to ${Math.floor(limit)}A or below, or ` +
        `replace the rewireable fuse with a cartridge fuse or circuit breaker.`
      : 'Increase the cable size or reduce the device rating.',
  };
};

/**
 * 433.1.204 — the ring final deeming provision. Iz is the single cable's.
 *
 * The provision covers 30 A and 32 A devices. Outside that it simply does not
 * apply, which is not the same as the circuit being wrong — the circuit falls
 * back to being assessed under 433.1.1. Treating "the provision does not apply"
 * as a failure asks a 6 A lighting circuit to justify itself as a ring.
 */
const assessRing = (
  rating: number,
  iz: number,
  live: string,
  method: string,
  semiEnclosed: boolean,
  mineralInsulated: boolean
): Assessment => {
  if (!RING_DEEMED_RATINGS.includes(rating)) {
    return assessRadial(rating, iz, live, method, semiEnclosed);
  }

  // Minimum conductor size. Checked before Iz because a 1.5 mm² ring can reach
  // 20 A clipped direct and would otherwise pass on capacity alone.
  const csa = csaOf(live);
  const minCsa = mineralInsulated ? RING_MIN_CSA_MINERAL : RING_MIN_CSA;
  if (csa !== null && csa < minCsa) {
    return {
      failed: true,
      title: 'Ring Conductors Undersized',
      message: `A ring final needs at least ${minCsa}mm² conductors — this is ${csa}mm².`,
      detail: mineralInsulated
        ? `Two-core mineral insulated cable to BS EN 60702-1 may be 1.5mm² on a ring; ` +
          `${csa}mm² is below even that.`
        : `A ring final circuit supplying BS 1363 accessories must be wired in copper with ` +
          `line and neutral of at least 2.5mm². Only two-core mineral insulated cable to ` +
          `BS EN 60702-1 may be smaller, at 1.5mm².`,
      suggestion:
        'Confirm the conductor size. If it really is undersized for a ring, this is a ' +
        'departure that needs recording as an observation.',
    };
  }

  if (iz < RING_MIN_IZ) {
    return {
      failed: true,
      title: 'Ring Cable Below 20A Minimum',
      message: `Ring final cable capacity of ${iz}A is below the 20A minimum for a ring.`,
      detail:
        `A ring final circuit supplying BS 1363 accessories is deemed to satisfy overload ` +
        `protection only where the cable's current-carrying capacity is at least 20A. ` +
        `This ${live}mm² cable is rated ${iz}A as installed (reference method ${method}).`,
      suggestion:
        'Check the reference method is recorded correctly — a cable in insulation carries ' +
        'less than the same cable clipped direct. Otherwise the cable is too small for a ring.',
    };
  }
  return { failed: false, message: '', detail: '', suggestion: '' };
};

export const overloadProtectionRule: CircuitRule = {
  id: 'overload.device-vs-cable',
  title: 'Overload protection',
  severity: 'blocking',
  field: 'protectiveDeviceRating',
  source: {
    kind: 'standard',
    ref: 'BS 7671 Reg 433.1.1, 433.1.202 (BS 3036), 433.1.204 (ring finals)',
    verifiedOn: '2026-08-06',
  },

  evaluate: (circuit: TestResult): Outcome => {
    if (!isRealCircuit(circuit)) {
      return { status: 'skip', reason: skipReason(circuit) };
    }

    const rating = readNumber(circuit.protectiveDeviceRating);
    const missing: string[] = [];
    if (rating === null) missing.push('Protective device rating');
    if (!hasReading(circuit.liveSize)) missing.push('Live conductor size');
    if (!hasReading(circuit.typeOfWiring)) missing.push('Type of wiring');
    if (!hasReading(circuit.referenceMethod)) missing.push('Reference method');

    if (missing.length > 0) {
      return {
        status: 'abstain',
        missing,
        message: `Cannot check the device against the cable without: ${missing.join(', ').toLowerCase()}.`,
      };
    }

    // The single cable's capacity. A ring is judged on this figure, not on two
    // legs in parallel — 433.1.204 asks whether the cable is rated 20 A, and
    // doubling it would pass a 2.5 mm² ring buried in insulation.
    const iz = getVerifiedCableCapacity(circuit, false);
    if (iz === null || iz <= 0) {
      return {
        status: 'abstain',
        missing: ['Verified cable capacity'],
        message:
          `No verified Appendix 4 capacity for ${circuit.liveSize}mm² ` +
          `wiring type ${circuit.typeOfWiring}, reference method ${circuit.referenceMethod}.`,
      };
    }

    const amps = rating as number;
    const live = String(circuit.liveSize);
    const method = String(circuit.referenceMethod);
    const semiEnclosed = isSemiEnclosedFuse(circuit);
    const mineral = isMineralInsulated(circuit);
    const { topology, basis } = detectTopology(circuit);

    if (topology === 'ring') {
      const verdict = assessRing(amps, iz, live, method, semiEnclosed, mineral);
      return verdict.failed
        ? { status: 'fail', title: verdict.title, message: verdict.message, detail: verdict.detail, suggestion: verdict.suggestion }
        : { status: 'pass' };
    }

    if (topology === 'radial') {
      const verdict = assessRadial(amps, iz, live, method, semiEnclosed);
      return verdict.failed
        ? { status: 'fail', title: verdict.title, message: verdict.message, detail: verdict.detail, suggestion: verdict.suggestion }
        : { status: 'pass' };
    }

    // Topology unknown.
    //
    // First, rule out the cases where "it might be a ring" is not a credible
    // reading. 433.1.204 requires a ring final to be at least 2.5 mm², and in
    // practice rings are wired in 2.5 or 4 mm² — a 6 mm² or 10 mm² circuit is a
    // radial, a sub-main or a fixed-appliance supply, never a ring final
    // supplying BS 1363 accessories. Without this, a 32 A sub-main on 6 mm²
    // (Iz 27 A on reference method 101) escapes as "cannot tell", when it is an
    // unambiguous overload. Asking is right when the answer is genuinely open;
    // here it is not.
    const csa = csaOf(live);
    if (csa !== null && csa > 4) {
      const verdict = assessRadial(amps, iz, live, method, semiEnclosed);
      return verdict.failed
        ? { status: 'fail', title: verdict.title, message: verdict.message, detail: verdict.detail, suggestion: verdict.suggestion }
        : { status: 'pass' };
    }

    // Evaluate it both ways: where the two agree the answer does not depend on
    // the missing fact and can be reported. Where they disagree, the
    // classification *is* the verdict, so ask instead of guessing.
    const asRing = assessRing(amps, iz, live, method, semiEnclosed, mineral);
    const asRadial = assessRadial(amps, iz, live, method, semiEnclosed);

    if (asRing.failed === asRadial.failed) {
      if (!asRing.failed) return { status: 'pass' };
      return {
        status: 'fail',
        title: asRadial.title,
        message: asRadial.message,
        detail: `${asRadial.detail} This holds whether the circuit is a ring or a radial.`,
        suggestion: asRadial.suggestion,
      };
    }

    return {
      status: 'abstain',
      missing: ['Circuit type (ring final or radial)'],
      message:
        `Record whether this is a ring final or a radial — the two are judged differently ` +
        `and give opposite answers here. ${basis}.`,
    };
  },
};
