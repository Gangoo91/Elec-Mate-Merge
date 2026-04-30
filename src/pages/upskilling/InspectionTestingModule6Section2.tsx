import { ArrowLeft, ChevronLeft, ChevronRight, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'mod6-s2-test-order',
    question:
      'You are about to test a 30 mA Type A RCBO. Which order do you run the three trip-time tests, and why does the order matter?',
    options: [
      '×5 first, then ×1, then ×0.5 — fast-clear the device first.',
      '×0.5 first (must NOT trip within 2 s), then ×1 (must trip within 200 ms), then ×5 (must trip within 40 ms). Running ×0.5 first confirms the device is not over-sensitive before you stress it.',
      'Order is irrelevant — record whichever you do first.',
      '×1 first, then ×0.5, then ×5.',
    ],
    correctIndex: 1,
    explanation:
      'GN3 / BS EN 61557-6 sequence the tests low-to-high. The ×0.5 non-trip test verifies the device is not nuisance-tripping below threshold; ×1 verifies normal disconnection; ×5 verifies the additional-protection 40 ms window. Running them in order also limits the heat / stress on the device under test.',
  },
  {
    id: 'mod6-s2-polarity',
    question:
      'Your meter shows 18 ms at 0° and 47 ms at 180° on a ×5 test of a 30 mA non-delayed RCBO. What do you record on column 28 and what is the implication?',
    options: [
      'Record 18 ms — that is the better reading.',
      'Record the average (32.5 ms) — pass.',
      'Record 47 ms (the longer of the pair) — that is just within the 40 ms limit so the device has failed and must be replaced. The asymmetry itself is also diagnostic of internal magnetic-circuit asymmetry.',
      'Record both readings; the device passes if either is below 40 ms.',
    ],
    correctIndex: 2,
    explanation:
      'Column 28 of the GN3 model form takes the longer of the 0° / 180° pair. 47 ms exceeds the 40 ms ×5 limit for a 30 mA non-delayed device providing additional protection — that is a fail. Polarity asymmetry alone is also a defect indicator even when both readings are within limit.',
  },
  {
    id: 'mod6-s2-type-mismatch',
    question:
      'You test a 30 mA Type B RCBO using your tester set to "Type A". The result is 165 ms at ×1, just within the 200 ms limit. Is the result valid?',
    options: [
      'Yes — Type A test current is a subset of Type B response, so a Type B device must also pass a Type A test.',
      "No. A Type-A test setting injects only AC and pulsating-DC waveforms. The Type B device's smooth-DC and high-frequency detection paths are never exercised. The reading is meaningless for the protection actually claimed on the certificate.",
      'Yes — the result is conservative.',
      'Only if the IΔn matches.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 61557-6 instruments inject test currents matched to the device type. Testing a Type B with the meter set to Type A leaves the smooth-DC and 1 kHz AC paths untested. The cert would claim Type B protection that has not actually been verified.',
  },
  {
    id: 'mod6-s2-half-test',
    question:
      'On a 30 mA Type S time-delayed RCD upstream of 30 mA non-delayed RCBOs, the ×1 test reads 280 ms. Pass or fail, and why?',
    options: [
      'Fail — exceeds the 200 ms limit for a 30 mA device.',
      'Fail — exceeds the 300 ms general limit in Reg 643.8.',
      'Pass — Type S devices have a 130-500 ms acceptance window at ×1 IΔn (BS EN 61008-1 / 61009-1). 280 ms sits inside that window.',
      'Pass — any reading under 500 ms is acceptable for any RCD type.',
    ],
    correctIndex: 2,
    explanation:
      'Type S devices are deliberately time-delayed for selectivity. Their product-standard acceptance window at ×1 IΔn is 130-500 ms — assessing a Type S device against the 200 ms non-delayed limit would mark every compliant Type S as a fail. Always pick the band that matches the device.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 643.8 (BS 7671:2018+A4:2026) gives the deemed-acceptable trip time at IΔn for a general non-delay RCD. What is it?',
    options: ['40 ms maximum', '200 ms maximum', '300 ms maximum', '500 ms maximum'],
    correctAnswer: 2,
    explanation:
      'Reg 643.8 states that effectiveness is deemed verified where the RCD disconnects within 300 ms maximum at IΔn for a general non-delay type. That is the upper bound — the underlying product standards (BS EN 61008-1 / 61009-1) tighten it for ADS and additional protection (200 ms at IΔn for 30 mA non-delayed devices, 40 ms at 5×IΔn).',
  },
  {
    id: 2,
    question:
      'For a 30 mA non-delayed RCD providing additional protection per Reg 415.1.1, what is the maximum permitted trip time at 5×IΔn (i.e. 150 mA)?',
    options: ['300 ms', '200 ms', '40 ms', '500 ms'],
    correctAnswer: 2,
    explanation:
      'BS EN 61008-1 / 61009-1 require a 30 mA non-delayed RCD to operate within 40 ms at 5×IΔn. The 5×IΔn test specifically verifies the device can clear the high-residual-current scenario fast enough to provide additional protection within the 40 ms safety window.',
  },
  {
    id: 3,
    question:
      'The IΔn × 0.5 test is a non-tripping test. What does the device have to do (or not do) for a pass?',
    options: [
      'Trip within 300 ms',
      'NOT trip — it must remain closed for at least 2 seconds at the half-rated residual current',
      'Trip within 40 ms',
      'It does not matter as long as it eventually trips',
    ],
    correctAnswer: 1,
    explanation:
      'The 0.5×IΔn test confirms the device does not nuisance-trip below its rated threshold. The product standards require the RCD shall not operate at 50% of rated tripping current. The test instrument applies the half-rated residual current for the test duration; tripping during this test is a fail — the device is over-sensitive.',
  },
  {
    id: 4,
    question:
      'When testing a Type A RCD on a 1×IΔn AC test, why must the test be performed at both 0° and 180° start positions?',
    options: [
      'Because the test instrument requires it',
      'Because the device may have an asymmetric response — a fault that develops on the positive half-cycle may be cleared faster than one on the negative half-cycle. The longer of the two trip times is the value recorded',
      'Because Reg 643.8 says so explicitly',
      "It's only required for Type B devices",
    ],
    correctAnswer: 1,
    explanation:
      'BS EN 61557-6 test instruments inject the residual-current waveform starting at either the 0° (positive) or 180° (negative) crossing of the supply voltage. An RCD whose pickup coil or magnetic latch responds asymmetrically can have very different trip times on each half-cycle. Recording the longer of the two values is the BS EN 61008-1 / 61009-1 rule and is what column 28 of the Schedule of Test Results captures.',
  },
  {
    id: 5,
    question:
      "An RCD trips at 25 ms when tested at 0° start position, but does not trip within 2 seconds when tested at 180° start position. What's the correct interpretation?",
    options: [
      'Pass — the 0° reading is within limit',
      'Fail — the device has a defective trip mechanism that responds to one half-cycle but not the other. Replace the device',
      'Re-test until both readings are similar',
      'Average the two readings',
    ],
    correctAnswer: 1,
    explanation:
      'An RCD that trips at one polarity but not the other is electrically dangerous — half of all earth faults will see the slow / non-tripping half-cycle, with disconnection times far exceeding the Reg 411.3.2.2 / 411.3.2.4 limits. The device must be replaced. This is exactly what the 0° / 180° pair test exists to catch — a single-polarity test would have falsely passed it.',
  },
  {
    id: 6,
    question:
      'Reg 643.8 says effectiveness is verified where the RCD disconnects within the time stated using suitable test equipment. Which test instrument standard does Reg 643.8 reference?',
    options: [
      'BS EN 61008-1',
      'BS EN 61010',
      'BS EN 61557-6 — the standard for residual current device testers',
      'BS EN 60947-2',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 643.8 specifies that the effectiveness of automatic disconnection of supply by RCDs shall be verified using suitable test equipment according to BS EN 61557-6. That is the product standard for portable RCD testers — the meter you use must comply, otherwise the test result is not BS 7671 evidence.',
  },
  {
    id: 7,
    question: 'Why does an RCD test at 1×IΔn drop the load voltage during the test, even briefly?',
    options: [
      'It does not — the test current goes via a separate path',
      'The instrument injects the test current through the RCD between line and earth (or line and CPC) for the duration needed to trip the device. While that current flows the upstream supply sees a brief earth-fault loop current — Zs / Ze paths are momentarily energised. The device should clear it well within the time limit',
      'Because the test isolates the supply',
      'Only Type B testing affects the load',
    ],
    correctAnswer: 1,
    explanation:
      'The test instrument injects a real residual current between live and earth (or live and the CPC) sized to IΔn (or 0.5× / 5×). For the duration of the test that current flows in the earth-fault loop. The instrument measures the time from current onset to RCD opening. A long Zs path or a degraded RCD will both extend the trip time.',
  },
  {
    id: 8,
    question:
      "A Type B RCD test using a Type A test instrument has been recorded on the Schedule of Test Results. What's the issue?",
    options: [
      "There's no issue — Type B and Type A test the same way",
      'The test instrument standard requirement (BS EN 61557-6) means the meter must support the RCD type under test. A Type A-only instrument cannot generate the smooth-DC and rectified-DC test waveforms needed to verify Type B operation — the recorded result only shows AC response, not the Type B-specific response',
      'Re-test next week',
      'Only the 5×IΔn result is invalid',
    ],
    correctAnswer: 1,
    explanation:
      'A Type A-only instrument can only verify the AC and pulsating-DC response of an RCD. It cannot test the smooth-DC, polarity-independent response that Type B is built for. Recording a Type B test result with a Type A-only instrument means the Type B-specific characteristic was never verified — the certificate is misleading. The test must be repeated with a multi-type instrument.',
  },
  {
    id: 9,
    question:
      'You test a 100 mA Type S (time-delayed) RCD at 1×IΔn (100 mA). The trip time is 200 ms. Pass or fail?',
    options: [
      'Fail — must be under 40 ms',
      'Fail — must be under 300 ms',
      'Pass — Type S devices have a designed time delay; the BS EN 61008-1 / 61009-1 product standard for Type S has a longer permitted operating time at IΔn (typically 130-500 ms band) to give selectivity over downstream non-delayed devices',
      'Cannot be tested at 1×IΔn',
    ],
    correctAnswer: 2,
    explanation:
      'Type S devices are deliberately time-delayed for selectivity. The product standard defines a permitted operating time band rather than a single maximum — typically 130 ms minimum (so a downstream non-delayed device can clear first) and 500 ms maximum at 1×IΔn. 200 ms is squarely in the band — pass. Treating a Type S device against a non-delayed limit is a recurring error.',
  },
  {
    id: 10,
    question:
      'For a domestic 30 mA RCBO providing both fault protection (Reg 411.4) and additional protection (Reg 415.1.1), the trip-time evidence required to record on the schedule is:',
    options: [
      'Only the 1×IΔn AC test',
      "Two readings at 1×IΔn (0° and 180°) and two readings at 5×IΔn (0° and 180°), recording the longer of each pair. The 0.5×IΔn non-tripping check is also performed but not always recorded numerically — the result is 'did not trip in 2 s' which gets a tick or comment",
      'Only the 5×IΔn test for additional protection',
      'Only the 0.5×IΔn non-tripping test',
    ],
    correctAnswer: 1,
    explanation:
      'A 30 mA RCD providing additional protection needs the 5×IΔn (≤40 ms) evidence on top of the 1×IΔn (≤200 ms for 30 mA non-delayed) test. Both tests are repeated at 0° and 180° — column 28 of the Schedule of Test Results captures the longer of each pair. The 0.5×IΔn test confirms non-operation at half-rated and is the third element of the BS EN 61557-6 sequence.',
  },
];

const InspectionTestingModule6Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'RCD trip time testing (×0.5, ×1, ×5) | I&T Module 6.2 | Elec-Mate',
    description:
      'Reg 643.8 verification of RCD effectiveness via BS EN 61557-6: the IΔn × 0.5 non-tripping test, IΔn × 1 with 0° / 180° pair (200 ms / 300 ms), and IΔn × 5 (40 ms for 30 mA non-delayed). What the meter measures, why polarity matters, what fails.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 6
          </button>

          <PageHero
            eyebrow="Module 6 · Section 2"
            title="Trip time testing (×1, ×5, ×0.5)"
            description="The three-step trip-time sequence per BS EN 61557-6, the must-trip and must-not-trip windows from BS EN 61008-1 / 61009-1, and why every test is run twice — once at 0° and once at 180°."
            tone="yellow"
          />

          <TLDR
            points={[
              'Three tests, in this order: IΔn × 0.5 (must NOT trip within 2 s — confirms the device is not over-sensitive); IΔn × 1 (must trip within 200 ms for 30 mA non-delayed, 300 ms general); IΔn × 5 (must trip within 40 ms for 30 mA non-delayed providing additional protection).',
              'Every must-trip test is run twice — at 0° and at 180° start position. Record the longer of each pair on the Schedule of Test Results (column 28 in the GN3 model form). An RCD that trips fast at one polarity and slow / never at the other is defective.',
              'Reg 643.8 anchors the verification: effectiveness is deemed verified at IΔn within 300 ms maximum for a general non-delay device, using a test instrument compliant with BS EN 61557-6.',
              'The numbers come from the product standards (BS EN 61008-1 for RCCBs, BS EN 61009-1 for RCBOs) — Reg 643.8 sets the BS 7671 acceptance window; the product standards set the tighter windows for ADS and additional protection.',
              'The instrument injects real residual current between live and earth (or live and CPC). The duration of test current shall be limited; 5×IΔn current flowing for more than ~40 ms means the device has failed and the supply is at risk.',
              'Type S (time-delayed) devices have a different acceptance band — typically 130-500 ms at 1×IΔn — and must not be assessed against the non-delayed limits.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Sequence the three trip-time tests (0.5×IΔn, 1×IΔn, 5×IΔn) correctly and explain what each one verifies',
              'State the BS EN 61008-1 / 61009-1 must-trip and must-not-trip windows for non-delayed and time-delayed RCDs',
              'Apply Reg 643.8 (300 ms general non-delay maximum) and the product-standard tighter limits (200 ms at 1×IΔn, 40 ms at 5×IΔn for 30 mA additional protection)',
              'Run the 0° / 180° test pair correctly, interpret asymmetric results, and record the longer reading per column 28 of the Schedule of Test Results',
              'Diagnose four common trip-time failure patterns — over-sensitive (trips at 0.5×IΔn), too slow (>limit at 1×IΔn or 5×IΔn), polarity-asymmetric, and Type-mismatch (Type B tested with Type-A-only instrument)',
              'Specify the right instrument for the device — BS EN 61557-6 with the correct RCD-type setting (AC, A, F, B) for the device under test',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="Reg 643.8 — verification of RCD effectiveness"
            plainEnglish="Reg 643.8 covers the verification of additional protection. Where RCDs are required for additional protection, the effectiveness of automatic disconnection of supply by the RCD shall be verified using suitable test equipment according to BS EN 61557-6 — to confirm that the relevant requirements of Chapter 41 are met."
            onSite="The regulation does two things: it names the test-equipment standard (BS EN 61557-6 — RCD testers) and it gives the deemed-acceptable upper bound for general non-delay devices (300 ms at IΔn). The tighter limits for 30 mA RCDs providing additional protection sit in the product standards, not in 643.8 itself."
          >
            <p>
              Reg 643.8 is the BS 7671 verification regulation for RCDs. It applies wherever an RCD
              is providing additional protection — which, after A4:2026 and earlier amendments, is
              effectively every domestic socket-outlet circuit, every lighting circuit serving
              accessible luminaires, every EV charging circuit, and every circuit feeding a special
              location (Sections 700-series).
            </p>
            <p>The three things Reg 643.8 establishes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Visual inspection plus testing — both elements are required. A test result on its
                own is not the verification; the inspector must also have looked at the device, its
                labelling and its installation.
              </li>
              <li>
                The test must be carried out using equipment to BS EN 61557-6. A general-purpose
                multifunction tester that does not include RCD test functions to that standard is
                not acceptable.
              </li>
              <li>
                Effectiveness is "deemed to have been verified" where the RCD disconnects within the
                stated time (300 ms maximum for a general non-delay type, at an alternating current
                test at rated residual operating current). Anything slower fails the regulation.
              </li>
            </ul>
            <p>
              The "deemed verified" wording is important: it is a sufficient condition, not a
              necessary one. A device that disconnects within tighter product-standard limits (e.g.
              40 ms at 5×IΔn for a 30 mA non-delayed RCD) is automatically within the 300 ms upper
              bound. The product-standard limits are what most installers actually test against,
              because that is what the test instruments report.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.8"
            clause={
              <>
                The verification of the effectiveness of the measures applied for additional
                protection is fulfilled by visual inspection and testing. Where RCDs are required
                for additional protection, the effectiveness of automatic disconnection of supply by
                RCDs shall be verified using suitable test equipment according to BS EN 61557-6 to
                confirm that the relevant requirements of Chapter 41 are met. NOTE: Regardless of
                RCD Type, effectiveness is deemed to have been verified where an RCD disconnects
                within the time stated below with an alternating current test at rated residual
                operating current (IΔn): for general non-delay type, 300 ms maximum.
              </>
            }
            meaning="The 300 ms upper bound applies regardless of RCD type — Type AC, A, F or B — provided the test is at IΔn and uses an AC residual current. Tighter limits exist for additional-protection devices: BS EN 61008-1 / 61009-1 specify 200 ms at IΔn and 40 ms at 5×IΔn for 30 mA non-delayed devices providing protection per Chapter 41. The regulation references BS EN 61557-6 — a multifunction tester that does not declare conformity to that standard is not BS 7671 verification kit."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The three trip-time tests in order</ContentEyebrow>

          <ConceptBlock
            title="Test 1 — IΔn × 0.5 (the non-tripping test)"
            plainEnglish="Apply 50% of the rated residual operating current. The RCD must NOT trip within 2 seconds. This test confirms the device is not over-sensitive — it sits closed at half-rated current rather than tripping spuriously on small leakage."
            onSite="The 0.5×IΔn test is the one that catches an RCD with a degraded magnetic core or a contaminated coil that has become over-sensitive. The result on a healthy device is 'did not trip' — sometimes recorded with a tick, sometimes with the duration of the test (e.g. '>2000 ms'). A trip during this test is a fail and the device must be replaced."
          >
            <p>
              The non-operation requirement at 50% IΔn is in BS EN 61008-1 / 61009-1: the RCD shall
              not operate when subjected to a residual current equivalent to 50% of its rated
              tripping current. The test instrument applies that current for a defined duration
              (typically 2 seconds for portable testers) and reports either a non-operation ("pass")
              or the trip time if it did open.
            </p>
            <p>
              Why the test matters in service: an RCD whose mechanism has aged or been contaminated
              can become unintentionally sensitive. The visible symptom is "the RCD keeps tripping
              for no reason". The 0.5×IΔn test is the one that proves it is the device, not the
              circuit. A device that fails the 0.5×IΔn test should be replaced, not blamed on the
              user. Conversely, a device that passes 0.5×IΔn (does not trip) and also trips at the
              correct time at IΔn × 1 has a healthy operating envelope.
            </p>
            <p>
              The 0.5×IΔn test is also performed at 0° and 180° on Type A / F / B devices on most
              modern instruments, although the recorded outcome is binary (tripped / did not trip)
              rather than a numeric time.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Test 2 — IΔn × 1 (the must-trip test, 0° and 180°)"
            plainEnglish="Apply 100% of the rated residual operating current. The RCD must trip within the maximum time stated by the product standard for that device — 200 ms for a 30 mA non-delayed device providing additional protection, 300 ms general for Reg 643.8 deemed-acceptable. Repeat at 0° and 180° start position; record the longer reading."
            onSite="The 1×IΔn test is the workhorse trip-time measurement. The number you record on the Schedule of Test Results column 28 is the longer of the 0° and 180° readings — never the average, never just the first one. A device that trips at 22 ms at 0° and 180 ms at 180° passes (180 ms < 200 ms limit) but is showing real asymmetry and warrants attention. A device that trips at 22 ms at 0° and does not trip at 180° has a defective half-cycle response and must be replaced."
          >
            <p>The 1×IΔn test acceptance limits depend on the device class:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>30 mA non-delayed RCD providing additional protection (Reg 415.1.1)</strong>{' '}
                — 200 ms maximum at 1×IΔn per BS EN 61008-1 / 61009-1.
              </li>
              <li>
                <strong>General non-delay RCD (any rating, AC test at IΔn)</strong> — 300 ms maximum
                per Reg 643.8 deemed-acceptable upper bound.
              </li>
              <li>
                <strong>Type S (time-delayed)</strong> — 130 ms minimum, 500 ms maximum at 1×IΔn per
                BS EN 61008-1 / 61009-1. The minimum is critical: a Type S that trips faster than
                130 ms cannot give selectivity over a downstream non-delayed device.
              </li>
              <li>
                <strong>BS 7288 SRCDs / FCURCDs</strong> — 300 ms maximum at 100% IΔn per BS 7288.
                Confirm by reading the device standard mark before assessing the result.
              </li>
            </ul>
            <p>
              The 0° / 180° pair test is mandated by the test-instrument standard BS EN 61557-6 and
              recorded by the product-standard performance requirements. The instrument generates
              the test residual current starting at either the positive (0°) or negative (180°)
              zero-crossing of the supply voltage. An RCD whose magnetic latching has worn
              asymmetrically may respond slowly — or not at all — on one of the two half-cycles,
              even though the other half-cycle produces a fast trip. The pair test is what catches
              this; recording only one value would let the defective device pass.
            </p>
            <p>
              For Type A, F and B devices, the 1×IΔn test on most modern instruments includes
              waveform-specific test currents — pulsating DC for Type A, composite for Type F,
              smooth DC for Type B — alongside the standard AC test. The Schedule of Test Results
              records the AC 1×IΔn time for the column-28 entry; waveform-specific results are
              captured in the test instrument's downloaded record where applicable.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Test 3 — IΔn × 5 (the additional-protection speed test)"
            plainEnglish="Apply 5× the rated residual operating current. A 30 mA non-delayed RCD providing additional protection must trip within 40 ms. The 5×IΔn test verifies the device can clear a high-current earth fault inside the human-shock safety window."
            onSite="The 40 ms figure is the safety threshold for additional protection — it is the time within which the let-through I² t energy is below the threshold of ventricular fibrillation for a typical adult. A 30 mA device that fails the 5×IΔn test (trips at 50 ms or longer) cannot be relied on for additional protection and must be replaced, even if the 1×IΔn result was within limit."
          >
            <p>The 5×IΔn limits, by device class:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>30 mA non-delayed RCD providing additional protection</strong> — 40 ms
                maximum at 5×IΔn (i.e. 150 mA test current). This is the BS EN 61008-1 / 61009-1
                figure, and the one most domestic and small-commercial RCDs are tested against.
              </li>
              <li>
                <strong>Other rated residual currents (100 mA, 300 mA, 500 mA)</strong> — the 5×IΔn
                test may not apply, or applies with different limits per the product standard. The
                test instrument's manual is the authoritative source for each rating.
              </li>
              <li>
                <strong>Type S (time-delayed)</strong> — the 5×IΔn test for selectivity-class
                devices has a different acceptance window; the device must remain time-delayed in
                its operation. Test instrument settings should reflect the Type S selection.
              </li>
            </ul>
            <p>
              Like the 1×IΔn test, the 5×IΔn test is run at 0° and 180° on Type A / F / B devices.
              The longer of the two readings is the recorded value. A device that trips at 18 ms at
              0° and 24 ms at 180° passes; a device that trips at 22 ms at 0° and 65 ms at 180°
              fails (65 ms &gt; 40 ms limit) and must be replaced regardless of the 0° result.
            </p>
            <p>
              The 5×IΔn test current is briefly substantial — 150 mA on a 30 mA device — and the
              test duration is short. The instrument terminates the test current as soon as the
              device opens; an RCD that fails to open results in the instrument cutting the test
              after a defined safety timeout (typically 200 ms or so) and reporting "trip time
              exceeded".
            </p>
          </ConceptBlock>

          {/* DIAGRAM — trip-time test sequence */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Trip-time test sequence — IΔn × 0.5, IΔn × 1, IΔn × 5 with the must-trip /
              must-not-trip outcomes and the 0° / 180° pair
            </h4>
            <svg
              viewBox="0 0 880 600"
              className="w-full h-auto"
              role="img"
              aria-label="Trip-time test sequence. Step 1 IΔn × 0.5 must NOT trip within 2 seconds (confirms the device is not over-sensitive). Step 2 IΔn × 1 must trip within 200 ms for 30 mA non-delayed (300 ms Reg 643.8 maximum), repeated at 0 and 180 degrees with the longer reading recorded. Step 3 IΔn × 5 must trip within 40 ms for 30 mA non-delayed providing additional protection, repeated at 0 and 180 degrees."
            >
              {/* Title bar */}
              <rect
                x="20"
                y="10"
                width="840"
                height="40"
                rx="8"
                fill="rgba(168,85,247,0.10)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="440"
                y="35"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="12"
                fontWeight="bold"
              >
                BS EN 61557-6 RCD trip-time test sequence — Reg 643.8 verification
              </text>

              {/* STEP 1 — 0.5×IΔn */}
              <rect
                x="20"
                y="70"
                width="270"
                height="200"
                rx="10"
                fill="rgba(34,197,94,0.06)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="155"
                y="92"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                STEP 1 — IΔn × 0.5
              </text>
              <text x="155" y="108" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Test current = 50% of IΔn
              </text>

              <rect
                x="40"
                y="125"
                width="230"
                height="40"
                rx="6"
                fill="rgba(34,197,94,0.10)"
                stroke="rgba(34,197,94,0.35)"
                strokeWidth="1"
              />
              <text
                x="155"
                y="143"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                MUST NOT trip within 2 s
              </text>
              <text x="155" y="158" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                (non-tripping confirmation)
              </text>

              <text
                x="155"
                y="190"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="9.5"
                fontWeight="bold"
              >
                Pass criterion:
              </text>
              <text x="155" y="205" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Device remains closed
              </text>
              <text x="155" y="218" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                — "did not trip" / "&gt;2000 ms"
              </text>

              <text
                x="155"
                y="245"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9.5"
                fontWeight="bold"
              >
                Fail = over-sensitive device
              </text>
              <text x="155" y="258" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Replace, do not blame circuit
              </text>

              {/* STEP 2 — 1×IΔn */}
              <rect
                x="305"
                y="70"
                width="270"
                height="200"
                rx="10"
                fill="rgba(168,85,247,0.06)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="440"
                y="92"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                STEP 2 — IΔn × 1
              </text>
              <text x="440" y="108" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Test current = 100% of IΔn
              </text>

              <rect
                x="325"
                y="125"
                width="230"
                height="40"
                rx="6"
                fill="rgba(168,85,247,0.10)"
                stroke="rgba(168,85,247,0.35)"
                strokeWidth="1"
              />
              <text
                x="440"
                y="143"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                MUST trip — non-delay limits
              </text>
              <text x="440" y="158" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                200 ms (30 mA add'l) / 300 ms (Reg 643.8)
              </text>

              <text
                x="440"
                y="190"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="9.5"
                fontWeight="bold"
              >
                Run twice — 0° and 180°
              </text>
              <text x="440" y="205" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Record the LONGER of the pair
              </text>
              <text x="440" y="218" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                on column 28 of Schedule of Tests
              </text>

              <text
                x="440"
                y="245"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9.5"
                fontWeight="bold"
              >
                Type S band: 130-500 ms
              </text>
              <text x="440" y="258" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                (time-delayed, selectivity)
              </text>

              {/* STEP 3 — 5×IΔn */}
              <rect
                x="590"
                y="70"
                width="270"
                height="200"
                rx="10"
                fill="rgba(239,68,68,0.06)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text
                x="725"
                y="92"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                STEP 3 — IΔn × 5
              </text>
              <text x="725" y="108" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                Test current = 500% of IΔn
              </text>

              <rect
                x="610"
                y="125"
                width="230"
                height="40"
                rx="6"
                fill="rgba(239,68,68,0.10)"
                stroke="rgba(239,68,68,0.35)"
                strokeWidth="1"
              />
              <text
                x="725"
                y="143"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                MUST trip within 40 ms
              </text>
              <text x="725" y="158" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                (30 mA non-delayed, additional protection)
              </text>

              <text
                x="725"
                y="190"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="9.5"
                fontWeight="bold"
              >
                Run twice — 0° and 180°
              </text>
              <text x="725" y="205" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Record the LONGER of the pair
              </text>
              <text x="725" y="218" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                — this is the safety window
              </text>

              <text
                x="725"
                y="245"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9.5"
                fontWeight="bold"
              >
                Fail = additional protection lost
              </text>
              <text x="725" y="258" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Replace device immediately
              </text>

              {/* Arrows step → step */}
              <polygon points="295,170 305,165 305,175" fill="rgba(255,255,255,0.4)" />
              <polygon points="580,170 590,165 590,175" fill="rgba(255,255,255,0.4)" />

              {/* 0/180 explainer band */}
              <rect
                x="20"
                y="295"
                width="840"
                height="115"
                rx="10"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.35)"
                strokeWidth="1.4"
              />
              <text
                x="440"
                y="318"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11.5"
                fontWeight="bold"
              >
                Why every must-trip test is run twice — the 0° / 180° pair
              </text>

              {/* sine wave */}
              <path
                d="M 80,375 C 130,330 180,330 230,375 C 280,420 330,420 380,375"
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.5"
              />
              <line
                x1="80"
                y1="375"
                x2="380"
                y2="375"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.7"
                strokeDasharray="3,3"
              />
              <circle cx="80" cy="375" r="4" fill="#22C55E" />
              <text
                x="80"
                y="395"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                0° start
              </text>
              <text x="80" y="406" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8.5">
                positive half-cycle
              </text>
              <circle cx="230" cy="375" r="4" fill="#FBBF24" />
              <text
                x="230"
                y="395"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontWeight="bold"
              >
                180° start
              </text>
              <text x="230" y="406" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8.5">
                negative half-cycle
              </text>

              <text
                x="610"
                y="340"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="10"
                fontWeight="bold"
              >
                Pass — symmetric:
              </text>
              <text x="610" y="354" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                0°: 22 ms · 180°: 24 ms
              </text>
              <text x="610" y="367" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                → record 24 ms
              </text>

              <text
                x="780"
                y="340"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                Fail — asymmetric:
              </text>
              <text x="780" y="354" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                0°: 22 ms · 180°: no trip
              </text>
              <text x="780" y="367" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                → replace device
              </text>

              <text x="440" y="395" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                A defective half-cycle response is the canonical reason for the pair test —
              </text>
              <text x="440" y="406" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                a single-polarity test would have falsely passed an electrically-dangerous device.
              </text>

              {/* Schedule of Tests recording row */}
              <rect
                x="20"
                y="430"
                width="840"
                height="80"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
              <text
                x="440"
                y="452"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                Schedule of Test Results — what to record
              </text>
              <text x="200" y="475" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                Column 28: longer of 1×IΔn pair (ms)
              </text>
              <text x="440" y="475" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                5×IΔn longer reading (ms) for 30 mA
              </text>
              <text x="680" y="475" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                0.5×IΔn — tick / "did not trip"
              </text>
              <text x="440" y="498" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Test instrument shall comply with BS EN 61557-6 — Reg 643.8 references this
                directly.
              </text>

              {/* Caption */}
              <rect
                x="20"
                y="525"
                width="840"
                height="65"
                rx="10"
                fill="rgba(168,85,247,0.06)"
                stroke="rgba(168,85,247,0.35)"
                strokeWidth="1"
              />
              <text x="440" y="548" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="9.5">
                Reg 643.8 deemed-acceptable: 300 ms maximum at IΔn for general non-delay device.
              </text>
              <text x="440" y="563" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                BS EN 61008-1 / 61009-1 product-standard limits: 200 ms at 1×IΔn and 40 ms at 5×IΔn
                for 30 mA non-delayed providing additional protection.
              </text>
              <text
                x="440"
                y="578"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="9.5"
                fontWeight="bold"
              >
                Sequence: 0.5× (must NOT trip) → 1× ×2 polarity (must trip) → 5× ×2 polarity (must
                trip fast).
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Why the 0° / 180° pair is non-negotiable</ContentEyebrow>

          <ConceptBlock
            title="The polarity-asymmetry trap — and what it looks like on the meter"
            plainEnglish="The test instrument can start the residual-current waveform at either the 0° (positive zero-crossing) or 180° (negative zero-crossing) of the supply voltage. An RCD with a worn or asymmetric magnetic mechanism may trip fast on one polarity and slow — or not at all — on the other. Running both tests catches that fault."
            onSite="On a healthy device, the two readings should agree to within ~10-15 ms at 1×IΔn. A larger gap is a sign of mechanical wear. A device that trips at one polarity and fails to trip at the other is a clear-cut replace-now situation — the schedule entry should record the failure, not the passing reading."
          >
            <p>
              The mechanical reality: an RCD's tripping mechanism uses a small permanent-magnet
              latch. The current transformer detects the residual current and produces a small
              signal that releases the latch when the residual current matches the device rating.
              The latch geometry and the magnet polarity mean the release sensitivity is not
              guaranteed to be identical for currents that start at the positive vs the negative
              voltage zero-crossing.
            </p>
            <p>
              In a perfectly-machined new device, the difference is small — a few ms at most. In a
              device that has been in service for years, that has tripped many times, or that has
              suffered contamination or vibration, the asymmetry can grow large. The 0° / 180° pair
              is what the test-equipment standard BS EN 61557-6 mandates and what the RCD product
              standards (BS EN 61008-1 / 61009-1) require for compliance evaluation.
            </p>
            <p>
              The recording rule is simple: record the longer of the two readings. That is the
              column-28 entry on the GN3 model Schedule of Test Results. A device that trips at 22
              ms at 0° and 180 ms at 180° has a column-28 entry of 180 ms — pass against the 200 ms
              limit, but with very limited margin. A device that trips at 22 ms at 0° and fails to
              trip at 180° within the test timeout has a column-28 entry that records the failure,
              and the device is condemned.
            </p>
          </ConceptBlock>

          <Scenario
            title="A 30 mA RCBO on a domestic socket circuit, two readings — 26 ms at 0°, 215 ms at 180°"
            situation="The 1×IΔn pair test on a 30 mA Type A non-delayed RCBO has returned 26 ms at 0° and 215 ms at 180°. The 200 ms limit (BS EN 61009-1 for 30 mA non-delayed providing additional protection) is exceeded on the 180° half-cycle. The 5×IΔn pair returns 18 ms at 0° and 38 ms at 180° — both within 40 ms."
            whatToDo="The 1×IΔn 180° reading fails the 200 ms limit. Even though the 5×IΔn pair is within tolerance, the 1×IΔn limit is the BS EN 61009-1 product-standard requirement for additional protection — exceed it and the device cannot be relied on. The recording on column 28 is 215 ms (the longer of the pair) with a clear fail flag. The device is replaced and the test repeated; the new device should return symmetric readings under 50 ms at 1×IΔn."
            whyItMatters="The 0° reading on its own (26 ms) would have given a false pass. The pair test caught the asymmetry. A 180° trip time of 215 ms means that approximately half of all earth faults in the home (those that develop on the negative half-cycle of the supply) would not be cleared within the additional-protection safety window. The faster 0° response is a coincidence of when the fault happens, not a property of the protection."
          />

          <CommonMistake
            title="Recording only the 0° (or only the 180°) reading on the schedule of test results"
            whatHappens="The instrument is set to one start position by default. The tester runs the 1×IΔn test once, gets a reading inside the limit, ticks the column and moves on. The pair test is skipped. A device with asymmetric response slips through every periodic until a real fault exposes it — typically through a fatality or an injury claim that traces back to the missing 180° reading."
            doInstead="Run the pair on every must-trip test (1×IΔn and 5×IΔn). Modern multifunction testers default to running both polarities and recording the longer; the older instruments need a manual switch. Record the longer reading and check the difference between the two — a gap greater than ~30 ms at 1×IΔn warrants a comment even if both readings are within limit, because it indicates mechanical degradation that may worsen before the next periodic."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>What the test instrument is actually doing</ContentEyebrow>

          <ConceptBlock
            title="Inside the BS EN 61557-6 RCD tester — current injection and timing"
            plainEnglish="The instrument injects a real residual current between the live conductor (line) and the earth conductor (CPC) for the duration needed to trip the RCD. The instrument times the interval from current onset to RCD opening. For Type A / F / B devices, the instrument generates the waveform appropriate to the type setting — pulsating DC for Type A, composite for Type F, smooth DC for Type B, in addition to the standard AC test."
          >
            <p>
              The instrument needs three live connections — line, neutral and CPC — at the test
              point downstream of the RCD. From those it can:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Detect the supply voltage zero-crossings and synchronise the test current to start
                at either 0° or 180°.
              </li>
              <li>
                Inject the test current via a controlled load (typically a high-power resistor bank)
                sized to draw IΔn × n current at the supply voltage.
              </li>
              <li>
                Detect the moment the RCD opens (loss of supply on the line conductor at the test
                point) and report the elapsed time from current onset.
              </li>
              <li>
                Limit the test duration to a safety timeout (typically 200 ms or a defined value
                from the product standard) so that a non-tripping device does not let large residual
                current flow indefinitely.
              </li>
            </ul>
            <p>
              The test current really does flow in the earth-fault loop. For the duration of the
              test the upstream Zs path is briefly carrying the residual current. A long Zs path
              (high earth-fault loop impedance) can cause the test current to fall short of its
              target value, which the instrument typically reports as a "test current too low"
              warning. That is one of the reasons Reg 643.7.3.1 requires the earth-fault loop
              impedance test to precede the RCD trip-time test in the verification sequence.
            </p>
            <p>
              For Type A / F / B devices, the instrument generates the residual-current waveform
              specified by the device type:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Type AC test: 50 Hz sinusoidal AC residual current — the simplest waveform and the
                only one a Type-AC-capable instrument can produce.
              </li>
              <li>
                Type A test: 50 Hz sinusoidal AC plus pulsating DC residual current (half-wave
                rectified). The instrument switches between the two for the appropriate test mode.
              </li>
              <li>
                Type F test: composite residual currents per BS EN 62423 — the instrument applies a
                pre-defined composite waveform.
              </li>
              <li>
                Type B test: includes smooth DC residual current at variable polarity. Type B
                testing requires an instrument explicitly declared compliant with BS EN 61557-6
                including the Type B test extension.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Testing a Type B RCD with a Type-A-only instrument and recording the result as compliant"
            whatHappens="The instrument can only generate AC and pulsating-DC test currents. The Type B device is verified for AC and pulsating-DC response — but the smooth-DC, multi-phase-rectified-DC and up-to-1 kHz response that defines Type B is never tested. The Schedule of Test Results column says 'Type B, 22 ms at 1×IΔn, pass' but the verification only covers part of the device's specified response."
            doInstead="Confirm the test instrument's BS EN 61557-6 declaration includes Type B test capability before testing a Type B device. The instrument's handbook will list the RCD types it supports — common multifunction testers cover AC and A as standard, F and B as a paid-extension feature. If the instrument cannot generate the Type B waveforms, the verification is incomplete and the certificate should record that fact, not falsely state compliance."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Type S and time-delayed devices — different limits</ContentEyebrow>

          <ConceptBlock
            title="Why Type S has a minimum time AND a maximum time at 1×IΔn"
            plainEnglish="A Type S (time-delayed) device is built for selectivity — it must trip slower than a downstream non-delayed device so the downstream device clears first. The product standard sets a minimum operating time (so the Type S does not race a 30 mA downstream device) and a maximum (so it eventually does open)."
            onSite="Common figures for a 100 mA Type S device per BS EN 61008-1 / 61009-1: 130 ms minimum at 1×IΔn, 500 ms maximum. The instrument's Type S test mode applies the residual current and measures the trip time against this band, not the non-delayed limits."
          >
            <p>
              The acceptance band for Type S is fundamentally different from the non-delayed
              upper-bound rule. Three readings tell you whether a Type S device is healthy:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Below the minimum (e.g. 80 ms on a Type S with 130 ms minimum)</strong> —
                fail. The device is operating as a non-delayed RCD; selectivity is lost. A
                downstream non-delayed RCBO can race the Type S to the trip and both can drop.
              </li>
              <li>
                <strong>Within the band (e.g. 220 ms on a Type S with 130-500 ms band)</strong> —
                pass. The device operates as a time-delayed device; selectivity is achievable.
              </li>
              <li>
                <strong>Above the maximum (e.g. 540 ms on a Type S with 500 ms maximum)</strong> —
                fail. The device is too slow; under a sustained residual-current condition it does
                not clear within product-standard limits.
              </li>
            </ul>
            <p>
              The instrument settings matter. Selecting "non-delay" mode on a Type S device will
              produce the wrong limits comparison and the result printed by the instrument may
              report a "fail" against limits that do not apply to the device. Read the instrument's
              setting carefully and match it to the device under test. The Schedule of Test Results
              comments column carries the device class — "Type S 100 mA 130-500 ms band" — so the
              next inspector knows what limits the recorded value was assessed against.
            </p>
          </ConceptBlock>

          <Scenario
            title="A 100 mA Type S RCD at the origin of a TT installation — 220 ms at 1×IΔn"
            situation="The Type S RCD at the origin returns 220 ms at 1×IΔn (100 mA), 0° / 180° within 5 ms of each other. The downstream 30 mA non-delayed RCBOs return 18-25 ms at 1×IΔn (30 mA) and 14-22 ms at 5×IΔn (150 mA), within all product-standard limits."
            whatToDo="Recorded readings: 220 ms for the Type S, with a comment 'Type S 100 mA, 130-500 ms band, BS EN 61008-1 / 61009-1'. The downstream 30 mA RCBO readings stand on their own against the 200 ms / 40 ms limits. The 220 ms Type S reading sits comfortably above the downstream device's expected ~30 ms trip time at the same residual current — selectivity is achievable. A live test by simulating a fault on a downstream final circuit confirms only the downstream RCBO trips; the Type S holds."
            whyItMatters="A Type S that trips too quickly (e.g. at 80 ms) would race a downstream non-delayed device and the entire installation could lose supply on a single final-circuit fault. A Type S that trips too slowly (e.g. above 500 ms) leaves the upstream protection too lethargic to respond to genuine faults the downstream devices cannot see — typically faults on supply-side conductors. The 130-500 ms band is the safety envelope for selectivity-class devices."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="Column 28 — what goes in the RCD trip-time entry"
            plainEnglish="The GN3 model schedule of test results designates column 28 for RCD trip time at 1×IΔn. The entry is the longer of the 0° and 180° readings, in milliseconds, against the appropriate product-standard limit for the device class."
          >
            <p>The full RCD-related entries on a typical schedule of test results:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Device standard column</strong> — BS EN reference (61008 / 61009 / 62423 /
                7288 / 60947-2). Recording 60898 against an RCBO is wrong; 60898 is the MCB-only
                standard.
              </li>
              <li>
                <strong>Type column</strong> — AC, A, F or B as marked on the device.
              </li>
              <li>
                <strong>IΔn column</strong> — rated residual operating current in mA (typically 30 /
                100 / 300 / 500).
              </li>
              <li>
                <strong>1×IΔn trip time (column 28)</strong> — the longer of the 0° / 180° pair, in
                milliseconds. Typical entries: 22, 35, 180.
              </li>
              <li>
                <strong>5×IΔn trip time (where present)</strong> — the longer of the 0° / 180° pair
                at 5×IΔn, in milliseconds. Typical entries for a healthy 30 mA non-delayed device:
                12, 18, 28.
              </li>
              <li>
                <strong>Test button check</strong> — a tick or "OK" / "trips" entry confirming the
                device's integral test button operates the device when energised.
              </li>
              <li>
                <strong>Comments</strong> — Type S band reference, Type B with RDC-DD note,
                manufacturer-specified limits, anything that does not fit the structured fields.
              </li>
            </ul>
            <p>
              The 0.5×IΔn non-tripping check is performed but typically not recorded as a numeric
              time — the result is binary. Where the form provides a column for it, "tick / did not
              trip" or "&gt;2000 ms" is the entry.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Recording the 5×IΔn reading in the column for 1×IΔn (or vice versa)"
            whatHappens="The 5×IΔn reading is much faster than the 1×IΔn reading on a healthy device — typically 18 ms vs 32 ms for a 30 mA non-delayed RCBO. Logging the 18 ms in column 28 (which is for 1×IΔn) under-reports the 1×IΔn time, which can mask a degrading device that is right at the 200 ms limit at 1×IΔn but still passing 5×IΔn. The next inspector sees the schedule, sees a fast reading, and the asymmetry warning is missed."
            doInstead="Use the column the form provides for each test. Most modern multifunction testers print a result table with separate rows for 0.5×, 1× and 5× — copy each entry into its own column. If the form has only column 28 (1×IΔn), use the comments field to record 5×IΔn explicitly: '5×IΔn pair: 14 ms / 22 ms (longer 22 ms) — within 40 ms'. The data should be on the certificate, not lost in the meter."
          />

          <CommonMistake
            title="Performing the trip-time test before the earth-fault-loop-impedance test"
            whatHappens="Reg 643.7.3.1 sequences the earth-fault loop impedance test before the RCD test for a reason: a long or degraded earth-fault path can mean the test current does not reach IΔn, and the meter either reports a low-test-current warning or — worse — reports a very short trip time because the device is actually responding to a different combination of test current and timing. The result on the schedule is unreliable."
            doInstead="Run the verification tests in the Reg 643.2 → 643.7 → 643.8 order. Continuity, then insulation, then earth-fault loop impedance, then RCD trip time. The earth-fault loop impedance result confirms the path the RCD test current will flow through; a high Zs reading is itself a defect that needs investigation before any RCD test."
          />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Three tests in order: 0.5×IΔn (must NOT trip in 2 s); 1×IΔn (must trip — 200 ms for 30 mA non-delayed, 300 ms general per Reg 643.8); 5×IΔn (must trip in 40 ms for 30 mA non-delayed providing additional protection).',
              'Every must-trip test runs twice — at 0° and 180° start position. Record the longer of the pair on column 28 of the Schedule of Test Results.',
              'Asymmetric polarity response (one fast, one slow / no-trip) is a defective-device finding — replace, do not record the faster reading.',
              'Type S (time-delayed) acceptance is a band — typically 130-500 ms at 1×IΔn — not a maximum. Tripping below the minimum is also a fail; selectivity is lost.',
              'BS EN 61557-6 is the test instrument standard cited by Reg 643.8. A multifunction tester must declare conformity, and must support the RCD type under test (Type A / F / B all need their specific test waveforms).',
              'Reg 643.7.3.1 puts the earth-fault loop impedance test BEFORE the RCD trip-time test. Skipping order can produce unreliable trip-time readings.',
              'A Type B device tested with a Type-A-only instrument is not fully verified. Check the instrument’s BS EN 61557-6 capability list against the device class before recording a result.',
              'The 0.5×IΔn non-tripping test catches the over-sensitive device. The 5×IΔn fast-trip test catches the slow / failing device. The 1×IΔn pair test catches the asymmetric / borderline device. All three are needed for a defensible record.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Why does Reg 643.8 say "300 ms maximum" when most installers test 30 mA RCDs to a 200 ms limit?',
                answer:
                  "300 ms is the BS 7671 deemed-acceptable upper bound for any non-delay RCD at 1×IΔn — it is the regulation's catch-all. The 200 ms figure is the BS EN 61009-1 product-standard limit specifically for 30 mA non-delayed RCBOs providing additional protection. A 30 mA RCBO that trips at 250 ms passes Reg 643.8 (deemed verified) but fails the product-standard ADS limit. In practice the test instrument reports against the tighter limit because that is the standard the device is built to.",
              },
              {
                question:
                  'Is the 0.5×IΔn non-tripping test mandatory, or can I skip it on a periodic?',
                answer:
                  'The 0.5×IΔn test is part of the BS EN 61557-6 instrument procedure and is the test that verifies the device is not over-sensitive. Skipping it leaves the over-sensitive failure mode undetected — and over-sensitive RCDs are the cause of most "this RCD keeps tripping" call-backs. On a periodic, run all three tests. On a new install, all three. The exception is a device that is already known to be replaced — there is no value in testing a device that is going in the bin.',
              },
              {
                question:
                  'My instrument shows "test current too low" on the 5×IΔn test. What does that mean and what do I do?',
                answer:
                  'The instrument tried to draw 5×IΔn (e.g. 150 mA on a 30 mA device) through the earth-fault loop and could not — the loop impedance is too high to allow the full test current at the available supply voltage. Step one: check Zs is within Reg 411.4 / Table 41 limits — a high Zs is itself a defect. Step two: if Zs is within limits, there may be poor termination in the test connection or a degraded earth electrode. Investigate and fix the underlying loop-impedance issue before re-testing the RCD.',
              },
              {
                question:
                  "Can I rely on the RCD's integral test button instead of a 1×IΔn instrument test?",
                answer:
                  "No. The integral test button verifies the device's mechanism is operable when the device is energised — it does not verify trip time at IΔn. The button typically applies an internal test current that is not calibrated to the rated tripping current and gives no time measurement. Reg 643.8 requires verification using suitable test equipment to BS EN 61557-6, which is the multifunction RCD tester. The integral test button is supplementary, not a substitute. Both should be checked.",
              },
              {
                question:
                  'On a Type S device, my instrument is reporting "FAIL" against the non-delayed 200 ms limit. The reading is 220 ms — is this a real fail?',
                answer:
                  'Almost certainly an instrument-setting error. Type S devices have a minimum time at 1×IΔn (typically 130 ms) and a maximum (typically 500 ms). A reading of 220 ms is comfortably inside the Type S band — pass. The instrument is reporting against the wrong device class because Type S has not been selected. Set the instrument to Type S / time-delay mode and re-run; the correct limits will apply. Add a comment on the schedule of test results that records the device class and the band assessed against.',
              },
              {
                question:
                  'When testing a Type A RCD on a circuit feeding switch-mode power supplies, do I run the test as Type AC, Type A, or both?',
                answer:
                  "Run the test in Type A mode (the device class). The Type A test on a modern instrument applies both the AC and the pulsating-DC residual-current test currents in sequence and verifies trip time on each. Recording the AC trip time at 1×IΔn for column 28 of the schedule is standard; the pulsating-DC trip time is captured by the instrument's internal record. A device labelled Type A but tested in Type AC mode only is a partial verification.",
              },
              {
                question:
                  'For an EV charging circuit using a Type A RCD plus an integrated RDC-DD, how do I verify the RDC-DD?',
                answer:
                  "The RDC-DD's effectiveness is typically verified by the EV charge unit's own self-test on energisation, plus the manufacturer's commissioning procedure. The Type A RCD upstream is verified by the standard 0.5× / 1× / 5× sequence. The RDC-DD is not separately tested by a portable RCD tester — it is built into the EV unit. Record on the schedule: \"Type A 30 mA upstream verified per Reg 643.8 — RDC-DD integral to charge unit, manufacturer commissioning per BS IEC 62955\".",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="RCD trip time testing — Module 6.2" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-6/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.3 Ramp testing
              </div>
            </button>
          </div>

          <div className="hidden">
            <Timer />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule6Section2;
