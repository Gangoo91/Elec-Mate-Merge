/**
 * Earth fault loop impedance — BS 7671 Reg 411.3.2.2/.3/.4, 411.4.202, 411.5.3.
 *
 * The live check has three verified logic errors, all confirmed against the
 * standard (page 71–72 and Table 41.1 for the times, 411.4.202 for the scope):
 *
 * 1. **Table 41.3 is used outside its scope.** 411.4.202 permits those values
 *    only where Uo is 230 V and the disconnection time is 0.4 s or 5 s under a
 *    TN system; otherwise the formula in 411.4.4 must be used. The live check
 *    applies the table at any voltage and on TT.
 *
 * 2. **The disconnection time is read off the circuit description.** It searches
 *    for "distribution", "sub-main", "db" and defaults everything else to 0.4 s.
 *    411.3.2.2 makes it a question of the circuit's rating and whether it has
 *    socket-outlets:
 *      (a) ≤ 63 A with one or more socket-outlets  → Table 41.1
 *      (b) ≤ 32 A supplying only fixed equipment   → Table 41.1
 *    anything else → 5 s on TN (411.3.2.3), 1 s on TT (411.3.2.4).
 *
 *    Consequence: a 40 A cooker circuit — fixed equipment, over 32 A, no
 *    socket-outlets — belongs at 5 s and is given 0.4 s, a limit roughly 2.4×
 *    stricter on a fuse. Compliant installations are failed.
 *
 * 3. **TT circuits fall through to the TN tables.** The TT branch only
 *    recognises 30/100/300/500 mA; anything else — a 10 mA RCD, EV 6 mA DC
 *    detection — drops into the MCB/fuse lookup and reports a critical failure
 *    citing a TN regulation.
 *
 * Note that the ambiguity in (2) is narrower than it first appears. For a
 * circuit rated ≤ 32 A both routes lead to Table 41.1, so the socket question
 * does not arise. It only bites between 32 A and 63 A — and only on fuses,
 * since Table 41.3's MCB values are identical at 0.4 s and 5 s.
 */
import { TestResult } from '@/types/testResult';
import { CertificateContext, CircuitRule, Outcome } from '../types';
import { hasReading, isRealCircuit, readNumber, skipReason } from '../applicability';
import {
  getZsLimitFromDeviceString,
  getRcdZsLimit,
  type RcdRating,
  type DisconnectionTime,
} from '@/data/zsLimits';

/** Table 41.3 is only an alternative to calculation at this voltage (411.4.202). */
const TABLE_41_3_VOLTAGE = 230;

/** 411.5.3 — RA × IΔn ≤ 50 V. The tabulated ratings live in zsLimits. */
const TT_TOUCH_VOLTAGE = 50;
const TABULATED_RCD_RATINGS: RcdRating[] = [30, 100, 300, 500];

const isTT = (ctx: CertificateContext): boolean =>
  String(ctx.earthingArrangement ?? '').toUpperCase().includes('TT');

const isTN = (ctx: CertificateContext): boolean =>
  String(ctx.earthingArrangement ?? '').toUpperCase().startsWith('TN');

/** The RCD's rated residual operating current, in milliamperes. */
const rcdMilliamps = (circuit: TestResult): number | null => {
  const raw = String(circuit.rcdRating ?? '').replace(/ma/i, '');
  return readNumber(raw);
};

/**
 * Which disconnection times could apply, per 411.3.2.2.
 *
 * Returns one time where the rating settles it, or both where the answer turns
 * on whether the circuit has socket-outlets — a fact the schedule does not
 * record.
 */
const candidateTimes = (rating: number): DisconnectionTime[] => {
  // ≤ 32 A: route (a) covers it if it has sockets, route (b) if it does not.
  // Either way Table 41.1 applies, so there is nothing to ask.
  if (rating <= 32) return ['0.4s'];
  // 32–63 A: Table 41.1 only via route (a), which needs socket-outlets.
  if (rating <= 63) return ['0.4s', '5s'];
  // Above 63 A no route into Table 41.1 remains.
  return ['5s'];
};

export const earthFaultLoopImpedanceRule: CircuitRule = {
  id: 'zs.exceeds-maximum',
  title: 'Earth fault loop impedance',
  severity: 'blocking',
  field: 'zs',
  source: {
    kind: 'standard',
    ref: 'BS 7671 Reg 411.3.2.2–.4, 411.4.202, Table 41.3; TT via 411.5.3 and Table 41.5',
    verifiedOn: '2026-08-06',
  },

  evaluate: (circuit: TestResult, ctx: CertificateContext): Outcome => {
    if (!isRealCircuit(circuit)) return { status: 'skip', reason: skipReason(circuit) };

    const zs = readNumber(circuit.zs);
    if (zs === null) {
      return hasReading(circuit.zs)
        ? { status: 'skip', reason: 'Zs recorded as a limitation' }
        : { status: 'abstain', missing: ['Measured Zs'], message: 'No Zs measurement recorded.' };
    }

    if (!isTT(ctx) && !isTN(ctx)) {
      return {
        status: 'abstain',
        missing: ['Earthing arrangement'],
        message:
          'Record the earthing arrangement — TN and TT are judged against completely ' +
          'different limits, so the verdict cannot be reached without it.',
      };
    }

    // ── TT ───────────────────────────────────────────────────────────────────
    // Fault protection comes from the RCD, and the limit is RA × IΔn ≤ 50 V.
    // The overcurrent-device tables do not apply, so there is no falling back
    // to them — that is defect 3 above.
    if (isTT(ctx)) {
      const ma = rcdMilliamps(circuit);
      if (ma === null || ma <= 0) {
        return {
          status: 'fail',
          message: 'TT installation with no RCD recorded on this circuit.',
          detail:
            'On a TT system fault protection relies on residual current protection. ' +
            'Without an RCD there is no basis on which this circuit disconnects in time.',
          suggestion: 'Confirm the RCD protecting this circuit and record its rating (IΔn).',
        };
      }

      const tabulated = TABULATED_RCD_RATINGS.includes(ma as RcdRating)
        ? getRcdZsLimit(ma as RcdRating)
        : null;
      // 411.5.3 states the limit as a formula, so a non-tabulated rating (10 mA,
      // 6 mA DC detection on an EV point) is computed from it rather than being
      // dropped into the TN tables.
      const limit = tabulated?.maxZs ?? TT_TOUCH_VOLTAGE / (ma / 1000);
      const basis = tabulated ? 'Table 41.5' : `50 V ÷ ${ma}mA (Reg 411.5.3)`;

      if (zs > limit) {
        return {
          status: 'fail',
          message: `Zs of ${zs}Ω exceeds the ${limit}Ω permitted for a ${ma}mA RCD on TT.`,
          detail:
            `On a TT system the earth electrode resistance and the RCD together must keep ` +
            `the touch voltage below 50 V: RA × IΔn ≤ 50 V. For ${ma}mA that gives ${limit}Ω ` +
            `(${basis}).`,
          suggestion:
            'Improve the earth electrode, or use an RCD with a lower rated residual ' +
            'operating current.',
        };
      }
      return { status: 'pass' };
    }

    // ── TN ───────────────────────────────────────────────────────────────────
    // 411.4.202 — Table 41.3 is an alternative to calculation only at 230 V.
    if (ctx.nominalVoltage != null && ctx.nominalVoltage !== TABLE_41_3_VOLTAGE) {
      return {
        status: 'abstain',
        missing: ['Maximum Zs by calculation'],
        message:
          `Table 41.3 may only be used where Uo is 230 V (Reg 411.4.202). At ` +
          `${ctx.nominalVoltage} V the maximum Zs has to be calculated using the formula in ` +
          `Reg 411.4.4.`,
      };
    }

    const rating = readNumber(circuit.protectiveDeviceRating);
    if (rating === null) {
      return {
        status: 'abstain',
        missing: ['Protective device rating'],
        message: 'Cannot look up a maximum Zs without the device rating.',
      };
    }

    // A breaker with no curve recorded resolves to the Type B column, which is
    // the most permissive of the three — a Type C at 32 A is roughly half the
    // Type B limit. Assuming the generous answer is how a non-compliant circuit
    // passes quietly, so ask for the curve instead.
    const looksLikeBreaker = /mcb|rcbo|circuit.?breaker|60898|61009/i.test(
      `${circuit.protectiveDeviceType ?? ''} ${circuit.bsStandard ?? ''}`
    );
    if (looksLikeBreaker && !hasReading(circuit.protectiveDeviceCurve)) {
      return {
        status: 'abstain',
        missing: ['Device curve (B, C or D)'],
        message:
          'Record the breaker curve. Type B, C and D have different maximum Zs values — ' +
          'a Type C limit is around half the Type B limit for the same rating.',
      };
    }

    // Combine the three fields rather than picking one. Production data splits
    // the device across them — `protectiveDeviceType: "Fuse"` with
    // `bsStandard: "Fuse (BS 3036)"` — so taking the first non-empty one throws
    // away the standard number that identifies which table applies, and the
    // curve that picks the column.
    const deviceType = [
      circuit.protectiveDeviceType,
      circuit.bsStandard,
      circuit.protectiveDeviceCurve ? `Type ${circuit.protectiveDeviceCurve}` : '',
    ]
      .filter(Boolean)
      .join(' ');
    const times = candidateTimes(rating);
    const results = times
      .map((t) => ({ time: t, lookup: getZsLimitFromDeviceString(deviceType, rating, '', t) }))
      .filter((r) => r.lookup !== null);

    if (results.length === 0) {
      return {
        status: 'abstain',
        missing: ['Maximum Zs for this device'],
        message: `No published maximum Zs for "${deviceType}" at ${rating}A.`,
      };
    }

    const failures = results.filter((r) => zs > (r.lookup as { maxZs: number }).maxZs);

    // Every candidate time agrees — the socket-outlet question does not change
    // the answer, so it does not need asking.
    if (failures.length === results.length) {
      const worst = results[results.length - 1].lookup as { maxZs: number; source: string };
      return {
        status: 'fail',
        message: `Zs of ${zs}Ω exceeds the maximum ${worst.maxZs}Ω for this device.`,
        detail:
          `${worst.source}. Measured ${zs}Ω against a permitted ${worst.maxZs}Ω` +
          (results.length > 1
            ? ' — this holds at both 0.4 s and 5 s, so it fails whether or not the circuit has socket-outlets.'
            : ` at ${results[0].time}.`),
        suggestion:
          'Check the connections for high resistance, then the conductor sizes and the ' +
          'earthing arrangement. A high Zs may also indicate a poor supply earth.',
      };
    }

    if (failures.length === 0) return { status: 'pass' };

    // Fails at 0.4 s, passes at 5 s. Which applies turns on 411.3.2.2(a).
    return {
      status: 'abstain',
      missing: ['Whether this circuit has socket-outlets'],
      message:
        `Between 32 A and 63 A the disconnection time depends on whether the circuit has ` +
        `socket-outlets (Reg 411.3.2.2). Zs of ${zs}Ω passes at 5 s but not at 0.4 s, so the ` +
        `answer decides it.`,
    };
  },
};
