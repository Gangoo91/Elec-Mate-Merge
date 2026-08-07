/**
 * The Part 6 verification results nothing was reading.
 *
 * BS 7671 Chapter 64 sets out the tests: 643.2 continuity, 643.3 insulation
 * resistance, 643.6 polarity, 643.7 automatic disconnection, 643.8 additional
 * protection, 643.9 phase sequence, 643.10 functional testing. The schedule
 * records results for all of them, and the checker was reading 19 of the 61
 * fields on a circuit — so an RCD disconnecting in 900 ms, a failed functional
 * test, and a 6 kA breaker on a 10 kA supply all passed in silence.
 *
 * Every rule here quotes the clause it comes from. Where BS 7671 requires the
 * measurement but does not publish the arithmetic — ring final continuity is
 * the case — the check says so rather than dressing a convention as a
 * regulation.
 */
import { TestResult } from '@/types/testResult';
import { RegulationWarning } from './types';
import { hasReading, readNumber } from '@/utils/validation/applicability';
import { isRingCircuit } from './ringCircuitDetector';
import { getZsLimitFromDeviceString } from '@/data/zsLimits';

/**
 * 643.8 — an RCD provided for additional protection must actually trip in time.
 *
 * A4:2026 replaced the old multi-point ritual with one figure. The regulation:
 *
 *   "Regardless of RCD Type, effectiveness is deemed to have been verified
 *    where an RCD disconnects within the time stated below with an alternating
 *    current test at rated residual operating current (IΔn): for general
 *    non-delay type, 300 ms maximum."
 *
 * So: one AC test at IΔn, 300 ms. Time-delay and S-type devices are deliberately
 * NOT judged here — the standard states the limit for the general non-delay type
 * and this rule holds itself to what it can quote.
 */
const checkRcdDisconnectionTime = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];

  const ms = readNumber(result.rcdOneX);
  if (ms === null) return warnings;

  // S-type / selective devices are permitted to delay on purpose.
  const isTimeDelayed = /\bs\b|selective|delay/i.test(
    `${result.rcdType ?? ''} ${result.rcdBsStandard ?? ''}`
  );
  if (isTimeDelayed) return warnings;

  const LIMIT_MS = 300;
  if (ms > LIMIT_MS) {
    warnings.push({
      severity: 'critical',
      title: 'RCD Disconnection Time Too Long',
      fields: ['rcdOneX'],
      description:
        `The RCD took ${ms} ms to disconnect at its rated residual operating current. ` +
        `A general non-delay type must disconnect within ${LIMIT_MS} ms for the additional ` +
        `protection to be effective.`,
      regulation: 'BS 7671 Regulation 643.8',
      suggestion:
        'Re-test to confirm, then investigate the device. An RCD that will not trip in time is not providing the additional protection the circuit is relying on.',
    });
  }
  return warnings;
};

/**
 * 643.10 — functional testing, and the AFDD check that belongs with it.
 *
 * These are recorded as pass/fail and were never inspected for "fail". A
 * certificate carrying a failed functional test with nothing said about it is
 * the clearest possible case of the schedule knowing something the report does
 * not.
 */
const FAIL_MARKERS = /^(✗|x|fail(ed)?|no|unsatisfactory)$/i;

const checkFunctionalResults = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];
  const failed = (v: unknown) => FAIL_MARKERS.test(String(v ?? '').trim());

  if (failed(result.functionalTesting)) {
    warnings.push({
      severity: 'critical',
      title: 'Functional Test Failed',
      fields: ['functionalTesting'],
      description:
        `The functional test on "${result.circuitDescription || 'this circuit'}" is recorded as a failure. ` +
        `Equipment must be shown to operate correctly, not merely to be installed.`,
      regulation: 'BS 7671 Regulation 643.10',
      suggestion:
        'Record what failed as an observation — switchgear, controls, interlocks and emergency switching all fall under this test.',
    });
  }

  if (failed(result.afddTest)) {
    warnings.push({
      severity: 'critical',
      title: 'AFDD Test Failed',
      fields: ['afddTest'],
      description: 'The arc fault detection device test is recorded as a failure.',
      regulation: 'BS 7671 Regulation 643.10',
      suggestion:
        "Follow the manufacturer's test procedure and record the outcome. A device that fails its own test is not providing protection.",
    });
  }

  if (failed(result.rcdTestButton)) {
    warnings.push({
      severity: 'warning',
      title: 'RCD Test Button Failed',
      fields: ['rcdTestButton'],
      description:
        'The RCD integral test button did not operate the device. The button proves the mechanism, which no measured time can substitute for.',
      regulation: 'BS 7671 Regulation 643.10',
      suggestion: 'Investigate the device — a mechanism that will not operate by hand is a defect.',
    });
  }

  return warnings;
};

/**
 * 432.1 — the device must be able to break the fault current it could see.
 *
 *   "Except as permitted by Regulation 434.5.1, a device providing protection
 *    against both overload and fault current shall be capable of breaking, and
 *    for a circuit-breaker making, any overcurrent up to and including the
 *    maximum prospective fault current at the point where the device is
 *    installed."
 *
 * A 6 kA breaker on a 10 kA supply is a serious finding, and both numbers were
 * sitting in the schedule with nothing comparing them. 434.5.1 permits a lower
 * rating where back-up protection does the breaking, so this warns rather than
 * fails: the checker cannot see whether an upstream device is carrying it.
 */
const checkBreakingCapacity = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];

  const ka = readNumber(result.protectiveDeviceKaRating);
  // The schedule records PFC in kA. Take the worst of the two measurements.
  const pfcValues = [result.pfc, result.pfcLiveEarth, result.pfcLiveNeutral]
    .map(readNumber)
    .filter((n): n is number => n !== null);
  if (ka === null || !pfcValues.length) return warnings;

  const pfc = Math.max(...pfcValues);
  if (pfc > ka) {
    warnings.push({
      severity: 'critical',
      title: 'Device Breaking Capacity Below Fault Current',
      fields: ['protectiveDeviceKaRating', 'pfc'],
      description:
        `The prospective fault current is ${pfc} kA but the device is rated to break ${ka} kA. ` +
        `A device asked to interrupt more than it is rated for may not clear the fault.`,
      regulation: 'BS 7671 Regulation 432.1',
      suggestion:
        'Confirm the readings, then either fit a device with adequate breaking capacity or verify that back-up protection provides it (permitted by Reg 434.5.1) and record that.',
    });
  }
  return warnings;
};

/**
 * 643.2.1(b) — ring final circuit continuity.
 *
 * The regulation requires the measurement ("in the case of ring final circuits,
 * live conductors") but publishes no arithmetic for judging it. The
 * relationships below are the standard GN3 method, and are labelled as such —
 * they are how the trade reads the numbers, not a clause anyone can be held to.
 *
 * For a ring in 2.5/1.5 twin and earth, r2 runs about 1.67x r1 because the CPC
 * is the smaller conductor. A ring whose r1 and rn differ markedly usually means
 * a broken leg or an unintended spur — the exact fault this test exists to find.
 */
const checkRingContinuity = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];
  if (!isRingCircuit(result)) return warnings;

  const r1 = readNumber(result.ringR1);
  const rn = readNumber(result.ringRn);
  const r2 = readNumber(result.ringR2);

  // r1 and rn are the same conductor size on a ring, so they should be close.
  if (r1 !== null && rn !== null && r1 > 0 && rn > 0) {
    const spread = Math.abs(r1 - rn) / Math.max(r1, rn);
    if (spread > 0.15) {
      warnings.push({
        severity: 'warning',
        title: 'Ring Line and Neutral Legs Do Not Match',
        fields: ['ringR1', 'ringRn'],
        description:
          `r1 is ${r1}Ω and rn is ${rn}Ω — a difference of ${Math.round(spread * 100)}%. ` +
          `On an intact ring these are the same conductor size and should read within a few percent of each other.`,
        regulation: 'BS 7671 Regulation 643.2.1(b) — the 15% threshold is an Elec-Mate check',
        suggestion:
          'Usually a broken leg, a loose connection at the board, or an unintended spur. Re-measure end to end before accepting the ring.',
      });
    }
  }

  // r2 is the CPC leg: same length, smaller conductor, so higher resistance.
  if (r1 !== null && r2 !== null && r1 > 0 && r2 > 0 && r2 < r1) {
    warnings.push({
      severity: 'warning',
      title: 'Ring CPC Reads Lower Than the Line Conductor',
      fields: ['ringR2', 'ringR1'],
      description:
        `r2 is ${r2}Ω against an r1 of ${r1}Ω. The CPC of a ring is the smaller conductor over the same route, so r2 is normally the higher of the two — around 1.67x r1 for 2.5/1.5 twin and earth.`,
      regulation: 'GN3 method — BS 7671 requires the measurement (643.2.1(b)), not this ratio',
      suggestion:
        'Check the readings have not been entered in the wrong columns, and that the CPC is the size recorded.',
    });
  }

  // The classic cross-connection result: R1+R2 should land near (r1 + r2) / 4.
  const r1r2 = readNumber(result.r1r2);
  if (r1 !== null && r2 !== null && r1r2 !== null && r1 > 0 && r2 > 0 && r1r2 > 0) {
    const expected = (r1 + r2) / 4;
    if (expected > 0 && Math.abs(r1r2 - expected) / expected > 0.3) {
      warnings.push({
        severity: 'warning',
        title: 'R1+R2 Does Not Follow the Ring Readings',
        fields: ['r1r2', 'ringR1', 'ringR2'],
        description:
          `R1+R2 is recorded as ${r1r2}Ω. Cross-connecting an intact ring gives roughly (r1 + r2) / 4, which for these readings is about ${expected.toFixed(2)}Ω.`,
        regulation: 'GN3 method — BS 7671 requires the measurement (643.2.1(b)), not this ratio',
        suggestion:
          'A large departure usually means the ring is not continuous, or that R1+R2 was measured at a spur rather than the furthest point.',
      });
    }
  }

  return warnings;
};


/**
 * 643.9 — phase sequence, on polyphase circuits.
 *
 *   "For polyphase circuits, it shall be verified that the phase sequence is
 *    maintained at all relevant points throughout the installation."
 *
 * Only judged where the schedule says the circuit is three-phase. A reversed
 * sequence runs three-phase motors and rotating machinery backwards, which is
 * a mechanical hazard rather than an electrical one — and invisible on a
 * single-phase test.
 */
const checkPhaseSequence = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];
  if (result.phaseType !== '3P') return warnings;

  const seq = String(result.phaseRotation ?? '').trim();
  if (!hasReading(seq)) return warnings;

  if (/^(✗|x|fail(ed)?|no|incorrect|reversed|anti-?clockwise|l1-?l3-?l2)$/i.test(seq)) {
    warnings.push({
      severity: 'critical',
      title: 'Phase Sequence Not Maintained',
      fields: ['phaseRotation'],
      description:
        `The phase sequence on "${result.circuitDescription || 'this three-phase circuit'}" is recorded as ${seq}. ` +
        `Sequence must be maintained at all relevant points throughout the installation.`,
      regulation: 'BS 7671 Regulation 643.9',
      suggestion:
        'Correct the connections before energising. A reversed sequence turns three-phase motors and rotating machinery the wrong way.',
    });
  }
  return warnings;
};

/**
 * The maximum Zs written on the certificate should be the one the device has.
 *
 * `maxZs` is Column 12 — it PRINTS. Nothing was comparing it to the published
 * figure for the device recorded beside it, so a mistyped or carried-over limit
 * went onto a signed document, and every later reader judged the measured Zs
 * against the wrong number.
 *
 * Both bases are accepted without comment: the tabulated value, and 0.8 x that
 * (the Reg 411.4.4 correction for a reading taken at ambient temperature).
 * Flagging an electrician who correctly applied the 0.8 rule would be worse
 * than saying nothing.
 */
const checkRecordedMaxZs = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];

  const recorded = readNumber(result.maxZs);
  if (recorded === null || recorded <= 0) return warnings;

  const rating = readNumber(result.protectiveDeviceRating);
  if (rating === null) return warnings;

  const deviceType = [
    result.protectiveDeviceType,
    result.bsStandard,
    result.protectiveDeviceCurve ? `Type ${result.protectiveDeviceCurve}` : '',
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  const lookup = getZsLimitFromDeviceString(
    deviceType,
    rating,
    result.circuitDescription || ''
  );
  if (!lookup) return warnings;

  const tabulated = lookup.maxZs;
  const corrected = tabulated * 0.8;
  const near = (a: number, b: number) => Math.abs(a - b) / b <= 0.05;
  if (near(recorded, tabulated) || near(recorded, corrected)) return warnings;

  warnings.push({
    severity: 'warning',
    title: 'Recorded Maximum Zs Does Not Match the Device',
    fields: ['maxZs', 'protectiveDeviceRating'],
    description:
      `${recorded}Ω is recorded as the maximum Zs, but ${lookup.source} gives ${tabulated}Ω for ` +
      `${deviceType || 'this device'} at ${rating}A (or ${corrected.toFixed(2)}Ω with the 0.8 correction ` +
      `of Reg 411.4.4). This figure prints on the certificate.`,
    regulation: 'BS 7671 Tables 41.2–41.4',
    suggestion:
      'Check the device details and the recorded limit agree. A wrong maximum here is judged against by everyone who reads the certificate afterwards.',
  });
  return warnings;
};

/** Every Part 6 verification check, in the order the tests are carried out. */
export const checkVerificationResults = (result: TestResult): RegulationWarning[] => [
  ...checkRingContinuity(result),
  ...checkRcdDisconnectionTime(result),
  ...checkFunctionalResults(result),
  ...checkBreakingCapacity(result),
  ...checkPhaseSequence(result),
  ...checkRecordedMaxZs(result),
];
