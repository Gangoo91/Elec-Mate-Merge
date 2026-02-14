import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Zap,
  ShieldCheck,
  AlertTriangle,
  Calculator,
  ClipboardCheck,
  FileCheck2,
  Mic,
  Gauge,
  Activity,
  Cable,
  BookOpen,
  Timer,
  RotateCcw,
  Layers,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'RCD Testing Procedure | How to Test RCDs BS 7671';
const PAGE_DESCRIPTION =
  'Complete RCD testing procedure per BS 7671 for UK electricians. Full test sequence: half-rated current (must NOT trip), 1x rated current (must trip within 300 ms), 5x rated current (must trip within 40 ms for 30 mA), ramp test, half-cycle test, button test. Testing at 0 and 180 degree phase angle. Time-delayed and discrimination testing. Record results with Elec-Mate.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'RCD Testing Procedure', href: '/guides/rcd-testing-procedure' },
];

const tocItems = [
  { id: 'what-is-rcd-testing', label: 'What Is RCD Testing?' },
  { id: 'test-sequence', label: 'The Full RCD Test Sequence' },
  { id: 'half-rated', label: 'Half-Rated Current Test (Must NOT Trip)' },
  { id: 'rated-current', label: '1x Rated Current Test' },
  { id: 'five-times', label: '5x Rated Current Test' },
  { id: 'phase-angle', label: 'Testing at 0 and 180 Degrees' },
  { id: 'ramp-test', label: 'Ramp Test' },
  { id: 'button-test', label: 'Button Test' },
  { id: 'time-delayed', label: 'Time-Delayed RCD Testing' },
  { id: 'discrimination', label: 'RCD Discrimination Testing' },
  { id: 'recording-results', label: 'Recording Results' },
  { id: 'common-issues', label: 'Common Issues' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'RCD testing involves multiple tests at different current levels: half-rated (must NOT trip), 1x rated (must trip within 300 ms), and 5x rated (must trip within 40 ms for general-type 30 mA RCDs).',
  'All tests must be performed on both positive (0 degree) and negative (180 degree) half-cycles of the supply waveform — the worst-case (longest) trip time is the value recorded on the certificate.',
  'Time-delayed (Type S) RCDs have different trip time requirements: 130 to 500 ms at 1x rated current and 50 to 200 ms at 5x rated current — they must NOT trip faster than the lower limit.',
  'The push-button test confirms the mechanical trip mechanism works but does NOT verify the electrical trip function — instrument testing is mandatory for compliance.',
  'Elec-Mate validates all RCD trip times automatically against BS 7671 requirements and supports voice-to-test-results for hands-free data entry on site.',
];

const faqs = [
  {
    question: 'What are the RCD trip time limits for a 30 mA general-type RCD?',
    answer:
      'For a standard 30 mA general-type RCD (not time-delayed), the trip time limits are defined by BS EN 61008 (for RCCBs) and BS EN 61009 (for RCBOs). At half-rated current (0.5x, which is 15 mA), the device must NOT trip — this confirms it is not overly sensitive. At rated current (1x, which is 30 mA), the device must trip within 300 milliseconds. At five times rated current (5x, which is 150 mA), the device must trip within 40 milliseconds. The 5x test is the most critical because it simulates a significant fault condition where rapid disconnection is essential to prevent electric shock. All tests must be performed on both the positive (0 degree) and negative (180 degree) half-cycles of the supply waveform, and the worst-case (longest) trip time from either half-cycle is the value recorded on the certificate.',
  },
  {
    question: 'Why must RCDs be tested on both half-cycles?',
    answer:
      'RCDs contain sensitive electromagnetic components that can behave differently depending on the polarity of the fault current at the instant it occurs. A fault can occur at any point in the AC waveform, and the RCD must operate correctly regardless of whether the fault current is in the positive or negative half-cycle. Testing on both the positive half-cycle (0 degrees) and the negative half-cycle (180 degrees) verifies that the device operates correctly in both conditions. The trip time may differ between the two half-cycles — an RCD that trips in 25 ms on the positive half-cycle might take 35 ms on the negative half-cycle, or vice versa. The worst-case (longest) trip time is the value that must meet the BS 7671 requirement, and this is the value recorded on the certificate. If you only tested on one half-cycle, you might miss a device that fails on the other.',
  },
  {
    question: 'What is the difference between a general-type RCD and a Type S (time-delayed) RCD?',
    answer:
      'A general-type RCD (sometimes called a Type AC or Type A depending on waveform sensitivity) is designed to trip as quickly as possible when it detects a fault current at or above its rated residual operating current. A Type S (selective or time-delayed) RCD has an intentional time delay built in — it will NOT trip within a certain minimum time, even if the fault current exceeds its rated value. This delay is designed to achieve discrimination with a downstream general-type RCD. For example, if a 100 mA Type S RCCB is installed upstream of a 30 mA general-type RCBO, a fault on a circuit protected by the 30 mA RCBO should trip the RCBO first without tripping the upstream 100 mA Type S device. This prevents unnecessary disconnection of other circuits. The trip time limits for a Type S RCD are: at 1x rated current, it must trip between 130 ms and 500 ms (not faster than 130 ms); at 5x rated current, it must trip between 50 ms and 200 ms.',
  },
  {
    question: 'Is the push-button test sufficient for BS 7671 compliance?',
    answer:
      'No. The push-button test (the test button on the front of the RCD) only confirms that the mechanical trip mechanism works correctly — that when the trip coil is activated, the mechanism releases and disconnects the supply. It does NOT verify the electrical trip function at the correct current level or within the required time. An RCD could pass the push-button test but fail the instrument tests because the sensing toroid is damaged, the electronics have drifted, or the contacts are degraded. BS 7671 requires full instrument testing at the specified current levels (0.5x, 1x, and 5x rated current) on both half-cycles. The push-button test is an additional mechanical check that should be performed first, but it is not a substitute for instrument testing. Occupants should be advised to press the test button monthly as a routine check between periodic inspections.',
  },
  {
    question: 'What is a ramp test and when is it used?',
    answer:
      'A ramp test gradually increases the test current from zero up to the rated residual operating current of the RCD, measuring the actual current at which the device trips. This is different from the standard tests which apply a fixed current and measure the trip time. The ramp test determines the actual trip current — for example, a 30 mA RCD might actually trip at 22 mA during a ramp test. BS EN 61008/61009 requires that a general-type RCD must trip between 50% and 100% of its rated residual operating current during a ramp test (that is, between 15 mA and 30 mA for a 30 mA device). A device that trips below 15 mA is overly sensitive and may cause nuisance tripping. A device that does not trip until above 30 mA during the ramp test is faulty and must be replaced. The ramp test is not always recorded on the schedule of test results but is a valuable diagnostic test.',
  },
  {
    question: 'How do I test RCD discrimination between upstream and downstream devices?',
    answer:
      'RCD discrimination testing verifies that when a fault occurs on a circuit protected by a downstream RCD, only the downstream device trips — the upstream device remains closed, maintaining supply to other circuits. To test this, you must verify that the upstream device (typically a Type S time-delayed RCD) does not trip when the downstream device (typically a general-type RCD) is tested at its rated current. The test procedure is: (1) perform the full test sequence on the downstream RCD — the upstream RCD must not trip during any of these tests; (2) if the upstream RCD trips during downstream testing, discrimination has failed. For discrimination to work, there must be a sufficient time margin between the fastest trip time of the upstream device and the slowest trip time of the downstream device. This is why Type S RCDs have a minimum trip time (130 ms at 1x) — to give the downstream general-type device (which must trip within 300 ms at 1x) time to operate first.',
  },
  {
    question: 'What should I do if an RCD fails the 5x trip time test?',
    answer:
      'If an RCD fails the 5x trip time test (trips slower than 40 ms for a general-type device or slower than 200 ms for a Type S device), the device is not providing adequate protection against electric shock and must be replaced. Before condemning the device, verify your test is correct: ensure the MFT is calibrated, confirm you are testing at the correct multiple (5x the rated residual operating current, not 5x the rated current of the device), and check that the supply voltage is stable. If the device consistently fails, it should be classified as C2 (potentially dangerous) on the EICR because the delayed disconnection could result in a lethal electric shock. Replace the RCD with a device of the same type, rating, and sensitivity. After replacement, perform the full test sequence on the new device to confirm it passes all tests. Record both the failure and the remediation on the EICR.',
  },
];

const howToSteps = [
  {
    name: 'Complete all preceding tests',
    text: 'RCD testing is test 7 in the GN3 sequence. Before testing RCDs, ensure continuity, insulation resistance, polarity, earth fault loop impedance, and prospective fault current tests have all been completed satisfactorily. The circuit must be energised and safe for live testing.',
  },
  {
    name: 'Press the RCD test button (mechanical check)',
    text: 'Press the test button on the front of the RCD. The device should trip immediately, disconnecting the supply. Reset the RCD. This confirms the mechanical trip mechanism works. If the test button does not trip the RCD, the device is faulty and must be replaced — do not proceed with instrument testing.',
  },
  {
    name: 'Test at half-rated current (must NOT trip)',
    text: 'Set your MFT to the 0.5x test mode. Apply the half-rated current (15 mA for a 30 mA RCD) on the positive half-cycle (0 degrees). The RCD must NOT trip. Repeat on the negative half-cycle (180 degrees). The RCD must NOT trip on either half-cycle. If the RCD trips at half-rated current, it is overly sensitive.',
  },
  {
    name: 'Test at rated current (must trip within 300 ms)',
    text: 'Set the MFT to 1x test mode. Apply the rated current (30 mA for a 30 mA RCD) on the positive half-cycle. Record the trip time — it must be within 300 ms for a general-type device. Reset the RCD and repeat on the negative half-cycle. Record the worst-case (longest) trip time.',
  },
  {
    name: 'Test at five times rated current (must trip within 40 ms)',
    text: 'Set the MFT to 5x test mode. Apply five times the rated current (150 mA for a 30 mA RCD) on the positive half-cycle. Record the trip time — it must be within 40 ms for a general-type device. Reset and repeat on the negative half-cycle. Record the worst-case trip time. This is the most critical test for shock protection.',
  },
  {
    name: 'Record all results on the schedule of test results',
    text: 'Record the worst-case trip times for each test on the schedule of test results. Note the RCD type, rated residual operating current, and whether the half-rated test was passed (device did NOT trip). Elec-Mate validates all trip times automatically against BS 7671 requirements.',
  },
];

const sections = [
  {
    id: 'what-is-rcd-testing',
    heading: 'What Is RCD Testing?',
    content: (
      <>
        <p>
          RCD (Residual Current Device) testing verifies that every RCD in an electrical
          installation — whether RCCB (Residual Current Circuit Breaker), RCBO (Residual Current
          Breaker with Overcurrent protection), or socket-outlet RCD — operates correctly at the
          specified current levels and within the required trip times. RCDs provide additional
          protection against electric shock by detecting small leakage currents to earth and
          disconnecting the supply before a lethal shock can occur.
        </p>
        <p>
          RCD testing is test number seven in the{' '}
          <SEOInternalLink href="/guides/testing-sequence-guide">
            GN3 testing sequence
          </SEOInternalLink>
          , performed after all dead tests and the other live tests (
          <SEOInternalLink href="/guides/earth-fault-loop-impedance-explained">
            earth fault loop impedance
          </SEOInternalLink>{' '}
          and prospective fault current). It is a live test that requires the circuit to be
          energised and deliberately injects fault current through the earth path.
        </p>
        <p>
          The test procedure involves applying specific multiples of the rated residual operating
          current (IΔn) and verifying that the device trips within the required time — or, in the
          case of the half-rated test, does NOT trip. The tests must be performed on both the
          positive and negative half-cycles of the supply waveform to verify correct operation under
          all conditions.
        </p>
      </>
    ),
  },
  {
    id: 'test-sequence',
    heading: 'The Full RCD Test Sequence',
    content: (
      <>
        <p>
          For each RCD in the installation, the following tests must be performed in order. Each
          test must be carried out on both the positive (0 degree) and negative (180 degree)
          half-cycles.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            RCD Test Sequence — 30 mA General-Type RCD
          </h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Push-button test:</strong> Press the test button
                on the RCD — must trip mechanically. Reset.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">0.5x IΔn (15 mA) at 0 degrees:</strong> Must NOT
                trip.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">0.5x IΔn (15 mA) at 180 degrees:</strong> Must
                NOT trip.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">1x IΔn (30 mA) at 0 degrees:</strong> Must trip
                within 300 ms. Record time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">1x IΔn (30 mA) at 180 degrees:</strong> Must
                trip within 300 ms. Record time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">5x IΔn (150 mA) at 0 degrees:</strong> Must trip
                within 40 ms. Record time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">5x IΔn (150 mA) at 180 degrees:</strong> Must
                trip within 40 ms. Record time.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The worst-case (longest) trip time from the 0 degree and 180 degree tests at each current
          level is the value recorded on the schedule of test results. For example, if the 5x test
          gives 28 ms at 0 degrees and 34 ms at 180 degrees, you record 34 ms.
        </p>
      </>
    ),
  },
  {
    id: 'half-rated',
    heading: 'Half-Rated Current Test — Must NOT Trip',
    content: (
      <>
        <p>
          The half-rated current test (0.5x IΔn) is often overlooked but is an essential part of the
          RCD test sequence. For a 30 mA RCD, this means applying 15 mA of fault current. The RCD
          must NOT trip at this current on either half-cycle.
        </p>
        <p>
          The purpose of this test is to verify that the RCD is not overly sensitive. BS EN
          61008/61009 specifies that an RCD must trip between 50% and 100% of its rated residual
          operating current. A device that trips below 50% (below 15 mA for a 30 mA device) is
          excessively sensitive and presents a nuisance tripping risk. Nuisance tripping is not just
          an inconvenience — it can lead occupants to bypass or remove the RCD entirely, leaving
          circuits unprotected.
        </p>
        <p>
          If the RCD trips at half-rated current, investigate the cause. There may be existing earth
          leakage on the downstream circuits (from electronic equipment, long cable runs, or damp
          conditions) that, combined with the test current, exceeds the trip threshold.
          Alternatively, the RCD itself may be faulty and should be replaced.
        </p>
      </>
    ),
  },
  {
    id: 'rated-current',
    heading: '1x Rated Current Test',
    content: (
      <>
        <p>
          The rated current test (1x IΔn) applies the full rated residual operating current — 30 mA
          for a 30 mA RCD. The device must trip within 300 milliseconds on both the positive and
          negative half-cycles.
        </p>
        <p>
          The 300 ms limit applies to general-type (non-time-delayed) RCDs. This is the maximum
          acceptable trip time at the rated current. In practice, most healthy RCDs trip
          significantly faster — typically between 15 ms and 30 ms at rated current. A trip time
          approaching 300 ms, while technically a pass, may indicate a device that is nearing the
          end of its useful life.
        </p>
        <p>
          The test is performed on both half-cycles because the RCD's sensitivity may differ
          depending on the polarity of the fault current at the instant the test is applied. The
          worst-case (longest) trip time from either half-cycle is recorded on the certificate.
        </p>
      </>
    ),
  },
  {
    id: 'five-times',
    heading: '5x Rated Current Test',
    content: (
      <>
        <p>
          The five times rated current test (5x IΔn) is the most critical test for shock protection.
          For a 30 mA RCD, this applies 150 mA of fault current. The device must trip within 40
          milliseconds for a general-type RCD.
        </p>
        <p>
          The 40 ms limit is specifically designed to ensure protection against ventricular
          fibrillation — the most dangerous consequence of electric shock. Research has shown that
          currents above 30 mA flowing through the body for more than approximately 40 ms can induce
          fibrillation. The 5x test simulates a significant fault condition where a large leakage
          current is flowing to earth, and the rapid 40 ms disconnection prevents the shock duration
          from reaching dangerous levels.
        </p>
        <p>
          If an RCD fails the 5x test (trips in more than 40 ms), it must be replaced. This is a C2
          (potentially dangerous) observation on an EICR because the delayed disconnection could
          result in a lethal electric shock.
        </p>
        <SEOAppBridge
          title="Auto-validated RCD trip times in the schedule of tests"
          description="Enter the trip times from your MFT and Elec-Mate instantly validates them against BS 7671 requirements — 300 ms at 1x, 40 ms at 5x for general-type, or the Type S limits for time-delayed devices. Failures are flagged with the correct observation code."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'phase-angle',
    heading: 'Testing at 0 and 180 Degrees Phase Angle',
    content: (
      <>
        <p>
          The AC supply waveform is a continuous sine wave that oscillates between positive and
          negative peaks. When a fault occurs, it can happen at any point in this waveform. The
          magnitude of the fault current at the instant of the fault depends on where in the
          waveform cycle the fault occurs — at the peak (maximum voltage, maximum current) or at the
          zero crossing (zero voltage, zero current).
        </p>
        <p>
          Testing at 0 degrees applies the test current as the waveform passes through zero going
          positive. Testing at 180 degrees applies it as the waveform passes through zero going
          negative. These represent the two worst-case starting conditions for the RCD — the points
          where the fault current starts from zero and must build up before the RCD can detect it.
        </p>
        <p>
          Your multifunction tester has a setting to select 0 degree or 180 degree phase angle for
          RCD testing. Both tests must be performed at each current level, and the longer trip time
          is the one recorded. Some electricians abbreviate this by only testing on one half-cycle —
          this is not compliant with BS 7671 and could miss a device that fails on the other
          half-cycle.
        </p>
      </>
    ),
  },
  {
    id: 'ramp-test',
    heading: 'The Ramp Test',
    content: (
      <>
        <p>
          The ramp test is a diagnostic test that gradually increases the leakage current from zero
          until the RCD trips. Unlike the standard tests which apply a fixed current and measure
          time, the ramp test measures the actual trip current — the precise current level at which
          the device operates.
        </p>
        <p>
          BS EN 61008/61009 requires that a general-type RCD must trip between 50% and 100% of its
          rated residual operating current. For a 30 mA device, this means it must trip between 15
          mA and 30 mA during a ramp test. A device that trips below 15 mA is overly sensitive and a
          nuisance tripping risk. A device that does not trip until above 30 mA is not providing
          adequate protection and must be replaced.
        </p>
        <p>
          The ramp test is not always required on the schedule of test results, but it is a valuable
          diagnostic tool. If you are investigating nuisance tripping, the ramp test can confirm
          whether the RCD itself is overly sensitive or whether the issue is background leakage
          current on the circuit.
        </p>
      </>
    ),
  },
  {
    id: 'button-test',
    heading: 'The Push-Button Test',
    content: (
      <>
        <p>
          Every RCD has a test button on its front panel marked "T" or "Test." Pressing this button
          creates an artificial imbalance in the sensing toroid by passing a small current through
          an internal resistor, simulating a fault. The RCD should trip immediately.
        </p>
        <p>
          The push-button test confirms three things: (1) the trip mechanism is free and operates
          correctly, (2) the contacts separate cleanly, and (3) the mechanical reset mechanism
          works. It does NOT confirm that the RCD will trip at the correct current level or within
          the required time — for that, you need the full instrument test sequence.
        </p>
        <p>
          The push-button test should be performed first, before any instrument testing. If the
          button test fails (the RCD does not trip when the button is pressed), the device is faulty
          and must be replaced — there is no point proceeding with instrument tests. Occupants
          should be advised to press the test button monthly as a routine maintenance check between
          periodic inspections.
        </p>
      </>
    ),
  },
  {
    id: 'time-delayed',
    heading: 'Time-Delayed (Type S) RCD Testing',
    content: (
      <>
        <p>
          Time-delayed RCDs, designated Type S (selective), have an intentional time delay built
          into their operation. They are designed to achieve discrimination with downstream
          general-type RCDs — when a fault occurs, the downstream device should trip first, without
          the upstream Type S device also tripping.
        </p>
        <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Type S RCD Trip Time Limits</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">At 1x IΔn (rated current):</strong> Must trip
                between 130 ms and 500 ms. The device must NOT trip faster than 130 ms — this is the
                minimum time that provides the delay for discrimination.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">At 5x IΔn (five times rated):</strong> Must trip
                between 50 ms and 200 ms. Again, the device must NOT trip faster than 50 ms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">At 0.5x IΔn (half-rated):</strong> Must NOT trip
                — same as general-type RCDs.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Note the critical difference: for a Type S device, there is both a maximum AND a minimum
          trip time. If the device trips faster than the minimum (for example, tripping at 1x in
          less than 130 ms), it is not providing the intended time delay and discrimination will
          fail. If it trips slower than the maximum (for example, tripping at 5x in more than 200
          ms), it is not providing adequate protection. Both conditions are failures.
        </p>
      </>
    ),
  },
  {
    id: 'discrimination',
    heading: 'RCD Discrimination Testing',
    content: (
      <>
        <p>
          RCD discrimination ensures that when a fault occurs, only the RCD nearest to the fault
          trips — the upstream RCD remains closed, maintaining supply to other circuits. This is
          essential in modern consumer units where a main switch RCCB protects multiple circuits
          that also have individual RCBOs.
        </p>
        <p>
          To achieve discrimination, the upstream device must be a Type S (time-delayed) RCD and the
          downstream device must be a general-type RCD. The time delay in the Type S device gives
          the downstream device time to operate first.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Testing Discrimination</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Layers className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 1:</strong> Perform the full test sequence
                on the downstream (general-type) RCD. During all tests, the upstream (Type S) RCD
                must NOT trip.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 2:</strong> If the upstream RCD trips
                during any downstream test, discrimination has failed. This means a fault on one
                circuit will disconnect all circuits protected by the upstream device.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Layers className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Step 3:</strong> Record whether discrimination
                was achieved on the certificate. Failure of discrimination is typically classified
                as C3 (improvement recommended) unless the loss of supply poses a safety risk.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Discrimination between two general-type (non-time-delayed) RCDs cannot be guaranteed
          because both devices will attempt to trip at the same speed. One will trip first, but
          which one trips is essentially random and depends on the manufacturing tolerances of each
          device.
        </p>
      </>
    ),
  },
  {
    id: 'recording-results',
    heading: 'Recording RCD Test Results',
    content: (
      <>
        <p>
          RCD test results are recorded on the schedule of test results attached to the{' '}
          <SEOInternalLink href="/tools/eicr-certificate">EICR</SEOInternalLink> or{' '}
          <SEOInternalLink href="/tools/eic-certificate">EIC</SEOInternalLink>. For each RCD, you
          must record the type (RCCB, RCBO, socket-outlet), the rated residual operating current
          (typically 30 mA), and the trip times at each test level.
        </p>
        <p>
          The worst-case (longest) trip time from the 0 degree and 180 degree half-cycle tests is
          the value recorded. For example, if the 5x test gives 25 ms at 0 degrees and 32 ms at 180
          degrees, you record 32 ms. For the half-rated test, record "Did not trip" or the
          appropriate pass indication.
        </p>
        <SEOAppBridge
          title="Voice to test results — speak trip times hands-free"
          description="On site with your MFT in one hand? Just speak: 'RCBO 1, 5x trip time 28 milliseconds.' Elec-Mate fills in the schedule of test results and validates the trip time against BS 7671 requirements automatically."
          icon={Mic}
        />
        <p>
          If any test fails, record the failure and classify the observation appropriately. An RCD
          that fails the 5x test (does not trip within 40 ms) is typically C2 (potentially
          dangerous). An RCD that trips at half-rated current may be C3 (improvement recommended) if
          it is causing nuisance tripping, or C2 if the overly sensitive operation is likely to
          cause occupants to bypass the device.
        </p>
      </>
    ),
  },
  {
    id: 'common-issues',
    heading: 'Common RCD Testing Issues',
    content: (
      <>
        <p>Several common issues can affect RCD test results or cause confusion during testing.</p>
        <div className="space-y-4 mt-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Background earth leakage</h3>
                <p className="text-white text-sm leading-relaxed">
                  Connected equipment (LED lighting, electronic controllers, IT equipment) can
                  contribute background earth leakage current. This adds to the test current, which
                  may cause the RCD to trip at the half-rated test or give faster-than-expected trip
                  times. If you suspect background leakage, disconnect downstream equipment and
                  retest.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Testing from the wrong circuit</h3>
                <p className="text-white text-sm leading-relaxed">
                  When testing an RCBO, the test instrument must be connected to a circuit protected
                  by that specific RCBO. Testing from a circuit on a different RCBO or one not
                  protected by the device under test will not apply the test current through the
                  correct sensing toroid and the device will not trip.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Worn RCD contacts</h3>
                <p className="text-white text-sm leading-relaxed">
                  Over time, repeated tripping (including test button use and instrument testing)
                  wears the RCD contacts. Worn contacts can increase the trip time, eventually
                  causing the device to fail. RCDs have a limited mechanical life — typically 10,000
                  operations. Devices in high-use locations or those that experience frequent
                  nuisance tripping may need more frequent replacement.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-1">Not resetting between tests</h3>
                <p className="text-white text-sm leading-relaxed">
                  The RCD must be reset (switched back on) between each test. If you attempt to test
                  an already-tripped RCD, the test current has no effect because the circuit is
                  already disconnected. Ensure the RCD is fully reset and the supply is restored
                  before each subsequent test.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="EICR and EIC forms capture all RCD test data"
          description="Elec-Mate's digital EICR and EIC forms have dedicated fields for every RCD test — trip times at 1x and 5x on both half-cycles, half-rated pass/fail, RCD type, and rated IΔn. Auto-validation flags any trip time outside BS 7671 limits."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/guides/earth-fault-loop-impedance-explained',
    title: 'Earth Fault Loop Impedance',
    description: 'Ze, Zs, and why TT systems rely on RCDs when Zs exceeds MCB limits.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/insulation-resistance-testing',
    title: 'Insulation Resistance Testing',
    description: 'The dead test that must pass before live testing — including RCD testing.',
    icon: Gauge,
    category: 'Guide',
  },
  {
    href: '/guides/testing-sequence-guide',
    title: 'Testing Sequence BS 7671',
    description: 'The correct dead and live testing order per GN3. RCD testing is test number 7.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/maximum-zs-values-bs-7671',
    title: 'Maximum Zs Values BS 7671',
    description:
      'Maximum loop impedance values — when Zs exceeds these, RCD protection becomes critical.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Create professional EICRs with auto-validated RCD trip times, digital signatures, and PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-testing-calculators',
    title: '70+ Electrical Calculators',
    description: 'RCD discrimination calculator, Zs lookup, R1+R2, cable sizing, and dozens more.',
    icon: Calculator,
    category: 'Calculator',
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function RCDTestingProcedurePage() {
  return (
    <GuideTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2024-11-12"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Testing Guide"
      badgeIcon={ShieldCheck}
      heroTitle={
        <>
          RCD Testing Procedure:{' '}
          <span className="text-yellow-400">How to Test RCDs per BS 7671</span>
        </>
      }
      heroSubtitle="The complete RCD testing procedure for UK electricians. Full test sequence at half-rated, 1x, and 5x rated current. Testing at 0 and 180 degree phase angle. Ramp test, button test, Type S time-delayed testing, and discrimination testing. BS 7671 compliant."
      readingTime={22}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Test an RCD — Step by Step"
      howToDescription="Step-by-step RCD testing procedure per BS 7671 and BS EN 61008/61009, from push-button test through to full instrument testing at multiple current levels."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Validate RCD trip times automatically on site"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. Auto-validated RCD trip times, voice test entry, EICR and EIC forms, 70+ calculators. 7-day free trial, cancel anytime."
    />
  );
}
