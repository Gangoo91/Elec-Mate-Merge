import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import RcdTripTimeChecker from '@/components/seo/RcdTripTimeChecker';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { CalculatorSurface } from '@/components/calculators/shared';
import RCDTripTimeCalculator from '@/components/apprentice/calculators/RCDTripTimeCalculator';
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

const PAGE_TITLE = 'RCD Trip Times: 30mA 300ms Max, Type S 130-500ms';
const PAGE_DESCRIPTION =
  'RCD trip times: a 30 mA general RCD must trip within 300 ms at IΔn, Type S 130–500 ms. BS 7671 A4:2026 tests once with AC at IΔn, both half-cycles.';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'RCD Testing Procedure', href: '/guides/rcd-testing-procedure' },
];

const tocItems = [
  { id: 'what-is-rcd-testing', label: 'What Is RCD Testing?' },
  { id: 'test-sequence', label: 'The Full RCD Test Sequence' },
  { id: 'rated-current', label: 'The Test at IΔn — What BS 7671 Requires' },
  { id: 'calculator', label: 'Check Your RCD Trip Time' },
  { id: 'diagnostics', label: 'Half-Rated, Five-Times and Ramp' },
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
  'Amendment 4 changed the test. Table 3A of Appendix 3 (time/current performance criteria for RCDs) has been deleted, and Regulations 643.7.1 (fault protection) and 643.8 (additional protection) now verify an RCD with a single alternating current test at the rated residual operating current, IΔn — whatever the device type, AC, A, F or B.',
  'A general (non-delay) RCD must operate within 300 ms at IΔn — that is the acceptance figure the A4 NOTE states, and it is what goes on the certificate. For a Type S (time-delayed) device the NOTE to Regulation 643.7.1 gives a band of 130 ms minimum to 500 ms maximum; the NOTE to Regulation 643.8 (additional protection) states only the 300 ms general non-delay figure.',
  'The half-rated and five-times tests are no longer part of the required verification. They remain genuinely useful for fault-finding, and 40 ms at 5x IΔn is still a device characteristic under BS EN 61008/61009 — but that is the product standard describing the device, not BS 7671 telling you what to test.',
  'Test on both positive (0 degree) and negative (180 degree) half-cycles — the worst-case (longest) trip time is the value recorded.',
  'The push-button test confirms the mechanical trip mechanism works but does NOT verify the electrical trip function — instrument testing is mandatory for compliance. Regulation 643.10 separately requires the effectiveness of any test facility incorporated in the device to be verified. BS 7671 Reg 514.12.2 requires a notice instructing occupants to test six-monthly by pressing the relevant test button(s), with an exception for domestic (household) premises where certification or an EICR complete with the Appendix 6 guidance for recipients has been issued.',
  'Elec-Mate validates all RCD trip times automatically against BS 7671 requirements and supports voice-to-test-results for hands-free data entry on site.',
];

const faqs = [
  {
    question: 'What are the RCD trip time limits for a 30 mA general-type RCD?',
    answer:
      'Two different things get muddled here, and Amendment 4 makes the distinction matter. What BS 7671 requires you to verify: Regulations 643.7.1 (fault protection) and 643.8 (additional protection) call for a single alternating current test at the rated residual operating current (IΔn = 30 mA for a 30 mA device), regardless of RCD type. The NOTE to Regulation 643.7.1 gives the acceptance times: a general (non-delay) device must operate within 300 milliseconds; a Type S between 130 milliseconds minimum and 500 milliseconds maximum. That is the test, and that trip time is what goes on the certificate. What the product standards say about the device: BS EN 61008 (RCCBs) and BS EN 61009 (RCBOs) give 40 milliseconds at five times rated current for a general device, and 50 to 200 milliseconds for a Type S. Those describe how the device must be built, not what BS 7671 asks you to measure — Table 3A of Appendix 3 has been deleted, so the half-rated and five-times tests are no longer part of the required sequence. Whichever test you run, do it on both the positive (0 degree) and negative (180 degree) half-cycles and record the worst-case (longest) trip time.',
  },
  {
    question: 'Why must RCDs be tested on both half-cycles?',
    answer:
      'RCDs contain sensitive electromagnetic components that can behave differently depending on the polarity of the fault current at the instant it occurs. A fault can occur at any point in the AC waveform, and the RCD must operate correctly regardless of whether the fault current is in the positive or negative half-cycle. Testing on both the positive half-cycle (0 degrees) and the negative half-cycle (180 degrees) verifies that the device operates correctly in both conditions. The trip time may differ between the two half-cycles — an RCD that trips in 25 ms on the positive half-cycle might take 35 ms on the negative half-cycle, or vice versa. The worst-case (longest) trip time is the value that must meet the BS 7671 requirement, and this is the value recorded on the certificate. If you only tested on one half-cycle, you might miss a device that fails on the other.',
  },
  {
    question: 'What is the difference between a general-type RCD and a Type S (time-delayed) RCD?',
    answer:
      'A general-type RCD is designed to trip as quickly as possible when it detects a fault current at or above its rated residual operating current. Note that Type AC and Type A are distinct device types (Reg 531.3.3): Type AC operates only on alternating sinusoidal residual current; Type A additionally responds to residual pulsating DC current. Critically, also under Reg 531.3.3, Type AC shall only be used to serve fixed equipment where it is known that the load current contains no DC components — circuits supplying inverters, EV chargers, or variable-speed drives must use Type A or higher. A Type S (selective or time-delayed) RCD has an intentional time delay built in — it will NOT trip within a certain minimum time, even if the fault current exceeds its rated value. This delay is designed to achieve discrimination with a downstream general-type RCD. For example, if a 100 mA Type S RCCB is installed upstream of a 30 mA general-type RCBO, a fault on a circuit protected by the 30 mA RCBO should trip the RCBO first without tripping the upstream 100 mA Type S device. This prevents unnecessary disconnection of other circuits. Tested at IΔn, a Type S device should operate between 130 ms minimum and 500 ms maximum — the NOTE to Regulation 643.7.1 states that band in BS 7671 itself. The lower bound matters as much as the upper one, because a Type S that trips too fast has lost its discrimination. Note that the NOTE to Regulation 643.8, covering additional protection, states only the 300 ms maximum for a general non-delay device. (BS EN 61008/61009 additionally gives 50 to 200 ms at five times rated current, but since Amendment 4 deleted Table 3A that is a device characteristic rather than a test BS 7671 requires.)',
  },
  {
    question: 'Is the push-button test sufficient for BS 7671 compliance?',
    answer:
      'No. The push-button test (the test button on the front of the RCD) only confirms that the mechanical trip mechanism works correctly — that when the trip coil is activated, the mechanism releases and disconnects the supply. It does NOT verify the electrical trip function at the correct current level or within the required time. An RCD could pass the push-button test but fail the instrument tests because the sensing toroid is damaged, the electronics have drifted, or the contacts are degraded. BS 7671 requires an instrument test — under Regulations 643.7.1 and 643.8 that is an alternating current test at IΔn, on both half-cycles. Regulation 643.10 does require the effectiveness of any test facility incorporated in the device to be verified, so the button test is not optional either — it just is not the trip-time verification. The push-button test is a mechanical check that should be performed first, but it is not a substitute for instrument testing. Occupants should be advised to press the test button six-monthly as a routine check between periodic inspections — this matches the notice wording required by BS 7671 Reg 514.12.2: "Test six-monthly by pressing the relevant test button(s)." (Reg 514.12.1 is the separate periodic inspection notice, and both regulations carry an exception for domestic premises issued with certification or an EICR complete with the Appendix 6 guidance for recipients.)',
  },
  {
    question: 'What is a ramp test and when is it used?',
    answer:
      'A ramp test gradually increases the test current and measures the actual current at which the device trips. GN3 describes the instrument behaviour: the ramp starts from less than 50% of the RCD rating and rises to 110% of it, and the current at which the device operates is recorded as the tripping-current threshold. This is different from the standard tests which apply a fixed current and measure the trip time. The ramp test determines the actual trip current — for example, a 30 mA RCD might actually trip at 22 mA during a ramp test. BS EN 61008/61009 requires that a general-type RCD must trip between 50% and 100% of its rated residual operating current during a ramp test (that is, between 15 mA and 30 mA for a 30 mA device). A device that trips below 15 mA is overly sensitive and may cause nuisance tripping. A device that does not trip until above 30 mA during the ramp test is faulty and must be replaced. The ramp test is not always recorded on the schedule of test results but is a valuable diagnostic test.',
  },
  {
    question: 'How do I test RCD discrimination between upstream and downstream devices?',
    answer:
      'RCD discrimination testing verifies that when a fault occurs on a circuit protected by a downstream RCD, only the downstream device trips — the upstream device remains closed, maintaining supply to other circuits. To test this, you must verify that the upstream device (typically a Type S time-delayed RCD) does not trip when the downstream device (typically a general-type RCD) is tested at its rated current. The test procedure is: (1) perform the full test sequence on the downstream RCD — the upstream RCD must not trip during any of these tests; (2) if the upstream RCD trips during downstream testing, discrimination has failed. For discrimination to work, there must be a sufficient time margin between the fastest trip time of the upstream device and the slowest trip time of the downstream device. This is why Type S RCDs have a minimum trip time (130 ms at 1x) — to give the downstream general-type device (which must trip within 300 ms at 1x) time to operate first.',
  },
  {
    question: 'What should I do if an RCD fails the trip time test?',
    answer:
      'A failure means the device did not operate within 300 ms at IΔn (general type) or fell outside the 130 to 500 ms band (Type S). Before condemning it, verify the test itself: check the instrument is in calibration, confirm you are testing at the rated residual operating current and not at the device current rating — IΔn for a 30 mA RCBO is 30 mA, not the 32 A of the overcurrent element, which is a genuinely common mix-up — and check the supply voltage is stable. Re-test on both half-cycles, because a device can pass on one and fail on the other. If it consistently fails, it is not providing the protection the design relies on and should be replaced with a device of the same type, rating and sensitivity. On an EICR this is normally a C2 (potentially dangerous), since delayed disconnection on a circuit relying on that RCD for additional protection could result in a lethal shock — but code the observation on what the device actually protects, not by reflex. After replacement, re-test and record both the original failure and the remediation.',
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
    name: 'Test at IΔn on the positive half-cycle',
    text: 'This is the verification Regulations 643.7.1 and 643.8 require. Set the instrument to an alternating current test at the rated residual operating current (30 mA for a 30 mA device) and apply it on the positive half-cycle (0 degrees). Record the trip time. A general (non-delay) device must operate within 300 ms; a Type S between 130 and 500 ms. The same AC test at IΔn applies whatever the device type — AC, A, F or B.',
  },
  {
    name: 'Reset and repeat on the negative half-cycle',
    text: 'Reset the RCD and repeat the same test at IΔn on the negative half-cycle (180 degrees). An RCD can behave differently depending on the polarity of the residual current at the instant the fault occurs, so a device that passes on one half-cycle can fail on the other. The worst-case (longest) of the two readings is the value that must meet the limit.',
  },
  {
    name: 'Optional: diagnostic tests when investigating a problem',
    text: 'The half-rated and five-times tests are no longer part of the required verification — Amendment 4 deleted Table 3A of Appendix 3 — but they remain useful diagnostics. A half-rated test (15 mA for a 30 mA device, must not trip) helps confirm an over-sensitive device when chasing nuisance tripping, and a ramp test identifies the actual trip current. Run them when you are investigating something, not as a matter of routine.',
  },
  {
    name: 'Record the result on the schedule of test results',
    text: 'Record the worst-case trip time at IΔn, together with the RCD type and its rated residual operating current. Do not record a five-times figure as the certified trip time — the certified value is the one measured at IΔn. Elec-Mate validates trip times automatically against the current BS 7671 requirements.',
  },
];

const sections = [
  {
    id: 'what-is-rcd-testing',
    heading: 'What Is RCD Testing?',
    content: (
      <>
        {/* Sits above the prose: the query set for this page is almost entirely
            per-rating trip-time lookups, so the answer has to be reachable
            without reading. */}
        <RcdTripTimeChecker />
        <p className="mt-6">
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
          The test applies the rated residual operating current (IΔn) as an alternating current and
          verifies that the device operates within the required time. It is performed on both the
          positive and negative half-cycles of the supply waveform, because an RCD can behave
          differently depending on the polarity of the residual current when it appears.
        </p>
        <p>
          A4:2026 introduced an important change to Regs 643.7.1 and 643.8: regardless of RCD type
          (AC, A, F, B etc.), an alternating current test at rated residual operating current (IΔn)
          is used
          to verify the effectiveness of the RCD. This means the 1x IΔn effectiveness test is always
          performed as an AC sinusoidal test, even for Type A, F, or B devices. Where your MFT has a
          type selector, select Type AC for the 1x IΔn effectiveness test; instruments without a
          type selector can only perform Type AC tests and this remains compliant for the
          effectiveness verification.
        </p>
        <p>
          <a
            href="#calculator"
            className="inline-flex h-11 items-center rounded-full border border-elec-yellow/40 bg-elec-yellow/10 px-5 text-[13.5px] font-semibold text-elec-yellow transition-colors hover:bg-elec-yellow/20 touch-manipulation"
          >
            Got a reading already? Check it against the limit
          </a>
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
          Amendment 4 made this shorter than most electricians expect. Table 3A of Appendix 3 —
          the time/current performance criteria table that drove the old half-rated, rated and
          five-times routine — has been deleted. Regulations 643.7.1 and 643.8 now verify an RCD
          with a{' '}
          <strong>single alternating current test at the rated residual operating current</strong>,
          IΔn, whatever the device type. Type AC, A, F and B are all verified the same way.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">
            Required verification — 30 mA general-type RCD
          </h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">Push-button test:</strong> Press the test button
                on the RCD — must trip mechanically. Reset. (A mechanical check, not a substitute
                for the instrument test.)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">IΔn (30 mA) at 0 degrees:</strong> Must operate
                within 300 ms. Record time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">IΔn (30 mA) at 180 degrees:</strong> Must
                operate within 300 ms. Record time.
              </span>
            </li>
          </ul>
          <p className="text-white text-sm leading-relaxed mt-4 pt-4 border-t border-white/[0.1]">
            A Type S (time-delayed) device is verified with the same single AC test at IΔn, but
            should operate <strong>between 130 ms minimum and 500 ms maximum</strong> — the band
            stated in the NOTE to Regulation 643.7.1. The lower bound matters too, because a Type S
            that trips too quickly has lost the discrimination it exists to provide.
          </p>
        </div>
        <p>
          The worst-case (longest) trip time from the 0 degree and 180 degree tests is the value
          recorded on the schedule of test results. If the test gives 28 ms at 0 degrees and 34 ms
          at 180 degrees, you record 34 ms.
        </p>
        <p>
          The half-rated and five-times tests have not become wrong — they have stopped being
          required. Both remain useful when you are investigating a specific problem, and the
          familiar 40 ms at five times IΔn is still a real figure from BS EN 61008/61009. It
          describes how the device must be built, though, not what BS 7671 asks you to measure. The
          practical consequence on site: record the trip time at IΔn as the certified value, and do
          not fail a device against a criterion the standard no longer applies.
        </p>
      </>
    ),
  },
  {
    id: 'rated-current',
    heading: 'The Test at IΔn — What BS 7671 Requires',
    content: (
      <>
        <p>
          The test applies the full rated residual operating current — 30 mA for a 30 mA device —
          as an alternating current, on both the positive and negative half-cycles. A general
          (non-delay) RCD must operate within 300 milliseconds. Since Amendment 4 this is the whole
          of the required verification, and it applies identically to Type AC, A, F and B devices.
        </p>
        <p>
          The 300 ms figure is a limit, not a target. Most healthy RCDs operate far faster —
          typically 15 to 30 ms at IΔn. A device passing at 250 ms is compliant but worth a second
          look: trip times drift upward as a device ages, and a reading that high on a modern
          installation usually means something is wrong with the device rather than the circuit.
        </p>
        <p>
          Both half-cycles matter because an RCD's sensitivity can differ with the polarity of the
          residual current at the instant it appears. A device can pass at 0 degrees and fail at
          180. The worst-case (longest) trip time from either half-cycle is the one recorded on the
          certificate.
        </p>
        <SEOAppBridge
          title="Auto-validated RCD trip times in the schedule of tests"
          description="Enter the trip time from your instrument and Elec-Mate validates it against the current BS 7671 requirement — 300 ms at IΔn for a general device, 130 to 500 ms for a Type S."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'calculator',
    heading: 'Check Your RCD Trip Time Against the Limit',
    content: (
      <>
        <p>
          Free to use, no sign-up — enter the RCD rating and the trip time your instrument gave, and
          it tells you whether the device passes.
        </p>
        <p>
          Use the worst-case (longest) of your 0 degree and 180 degree readings, and check it at
          IΔn — that is the value that goes on the certificate. The five-times option is kept for
          reference only, since Amendment 4 deleted Table 3A and that test is now a diagnostic
          rather than part of the required verification.
        </p>
        <CalculatorSurface>
          <RCDTripTimeCalculator />
        </CalculatorSurface>
      </>
    ),
  },
  {
    id: 'diagnostics',
    heading: 'Half-Rated, Five-Times and Ramp — Diagnostics, Not Verification',
    content: (
      <>
        <p>
          These three tests used to be part of the routine. Amendment 4 deleted Table 3A of
          Appendix 3, which is what required them, so they are no longer part of verifying an RCD.
          They have not become useless — they have become diagnostic tools you reach for when
          investigating something specific.
        </p>
        <p>
          <strong>Half-rated (0.5x IΔn — 15 mA on a 30 mA device).</strong> The device should not
          trip. This is the test to run when chasing nuisance tripping, because it distinguishes an
          over-sensitive device from a circuit with genuine earth leakage. BS EN 61008/61009
          requires an RCD to operate between 50% and 100% of IΔn, and BS 7671 makes the same point
          in NOTE 2 to Regulation 531.3.3 — an RCD may operate at any value of residual current in
          excess of 50% of the rated residual current — so a device tripping below 15 mA is out of
          specification. Bear in mind that existing leakage downstream — electronic
          equipment, long runs, damp — adds to the test current, so a trip here is not automatically
          the device's fault.
        </p>
        <p>
          <strong>Five times (5x IΔn — 150 mA on a 30 mA device).</strong> The familiar 40 ms figure
          comes from BS EN 61008/61009 and describes how the device must be built. The reasoning
          behind it is sound and worth knowing: currents of that magnitude flowing through the body
          for more than roughly 40 ms risk inducing ventricular fibrillation, which is why a device
          intended for additional protection is built to clear a heavy residual current that
          quickly. What has changed is that BS 7671 no longer asks you to measure it. Run it when
          you want the extra evidence; record the IΔn result as the certified value.
        </p>
        <p>
          <strong>Ramp test.</strong> Rather than applying a fixed current and timing the trip, a
          ramp test raises the current gradually from zero and reports the current at which the
          device actually operates — a 30 mA RCD might let go at 22 mA. It is the most informative
          of the three when a device is behaving oddly, and it has never been part of the required
          sequence.
        </p>
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
          The ramp test is a diagnostic test that gradually increases the leakage current until the
          RCD trips. Unlike the standard tests which apply a fixed current and measure time, the
          ramp test measures the actual trip current — the precise current level at which the device
          operates. GN3 describes the instrument behaviour: the ramp starts from less than 50% of
          the RCD's rating and rises to 110% of it, and the current at which the device trips is
          recorded as the tripping-current threshold.
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
          should be advised to press the test button six-monthly as a routine maintenance check
          between periodic inspections — this is the interval specified in the RCD instruction
          notice required by BS 7671 Reg 514.12.2. (A4:2026 added an exception to that regulation
          for domestic premises where certification or an EICR complete with the Appendix 6 guidance
          for recipients has been issued.) Note also that Regulation 643.10 requires the
          effectiveness of any test facility incorporated in an RCD to be verified, so the button
          check is itself a required part of initial verification — it is simply not the trip-time
          test.
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
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] p-5 my-4">
          <h3 className="font-bold text-white text-lg mb-4">Type S RCD Trip Time Limits</h3>
          <ul className="space-y-3 text-white leading-relaxed">
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">At IΔn — the required test:</strong> Should
                operate between 130 ms minimum and 500 ms maximum — the band stated in the NOTE to
                Regulation 643.7.1. The device must NOT operate faster than 130 ms — that minimum is
                the delay that makes discrimination possible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-yellow-400">At 5x IΔn — device characteristic:</strong> 50
                ms to 200 ms under BS EN 61008/61009. This is the product standard describing the
                device, not a BS 7671 test — Amendment 4 deleted Table 3A of Appendix 3, so the
                five-times test is not part of the required verification for a Type S any more than
                it is for a general device.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Note the difference that catches people out: a Type S device has both a maximum{' '}
          <em>and</em> a minimum. Operating faster than 130 ms at IΔn is a failure, not a good
          result — the device is not providing the intended delay, and the downstream general-type
          RCD will no longer discriminate against it. Operating slower than 500 ms is also a
          failure. Both are recorded as such.
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
          <SEOInternalLink href="/eic-certificate">EIC</SEOInternalLink>. For each RCD, you must
          record the type (RCCB, RCBO, socket-outlet), the rated residual operating current
          (typically 30 mA), and the operating time measured at IΔn.
        </p>
        <p>
          The worst-case (longest) trip time from the 0 degree and 180 degree half-cycle tests is
          the value recorded. If the test at IΔn gives 25 ms at 0 degrees and 32 ms at 180 degrees,
          you record 32 ms. Since Amendment 4 there is no second figure to enter alongside it — if
          you ran a five-times test as a diagnostic, that result is not the certified value.
        </p>
        <SEOAppBridge
          title="Voice to test results — speak trip times hands-free"
          description="On site with your instrument in one hand? Just speak: 'RCBO 1, trip time 28 milliseconds.' Elec-Mate fills in the schedule of test results and validates it."
          icon={Mic}
        />
        <p>
          If the test fails, record the failure and classify the observation on what the device
          actually protects. An RCD that does not operate within 300 ms at IΔn on a circuit relying
          on it for additional protection is normally C2 (potentially dangerous). A device that
          proves over-sensitive on a diagnostic half-rated test may be C3 (improvement recommended)
          where it is merely causing nuisance tripping, or C2 where the nuisance is likely to lead
          occupants to bypass the device altogether.
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
          description="Elec-Mate's digital EICR and EIC forms have dedicated fields for RCD results — the operating time at IΔn on both half-cycles, device type and rating."
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
    href: '/guides/insulation-resistance-testing-bs7671',
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
    href: '/electrical-testing-calculators',
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
      dateModified="2026-08-06"
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
      heroSubtitle="The complete RCD testing procedure for UK electricians, updated for Amendment 4 — which deleted Table 3A and reduced verification to a single AC test at IΔn. Testing at 0 and 180 degree phase angle. Ramp test, button test, Type S time-delayed testing, and discrimination testing. BS 7671 compliant."
      readingTime={22}
      answerBox={{
        question: 'How do you test an RCD to BS 7671?',
        answer:
          "Under BS 7671:2018+A4:2026, an RCD's effectiveness is verified by an alternating-current test at its rated residual operating current (IΔn), whatever the device type — a general (non-delay) type must disconnect within 300 ms, a Type S between 130 ms and 500 ms (Regs 643.7.1 and 643.8), using test equipment to BS EN 61557-6 — and the integral test button is operated to confirm the test facility works (Reg 643.10). Run the test on both half-cycles (0° and 180°) and record the longer time. Amendment 4 deleted Table 3A of Appendix 3, so the old ½× and 5× tests are no longer part of the required verification — they remain useful diagnostics only.",
      }}
      keyTakeaways={keyTakeaways}
      sections={sections}
      howToSteps={howToSteps}
      howToHeading="How to Test an RCD — Step by Step"
      howToDescription="Step-by-step RCD testing per BS 7671:2018+A4:2026 — push-button check, then the required alternating current test at IΔn on both half-cycles."
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Validate RCD trip times automatically on site"
      ctaSubheading="Join 1,600+ UK electricians using Elec-Mate for on-site testing and certification. Auto-validated RCD trip times, voice test entry, EICR and EIC forms, 70+ calculators. 7-day free trial, cancel anytime."
    />
  );
}
