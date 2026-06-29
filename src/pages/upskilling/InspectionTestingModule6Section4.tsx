import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
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
    id: 'mod6-s4-button-purpose',
    question:
      'A homeowner asks why they need to press the test button on their consumer-unit RCD every quarter. The site spark says "It is the only test we can do — proves the RCD works". What is the precise BS 7671 answer?',
    options: [
      'The button proves the RCD will trip on a real residual current at its rated IΔn.',
      'The button verifies the mechanical trip only — not the IΔn calibration or the disconnection time.',
      'The button is provided as a means of cleaning the device contacts periodically.',
      'The button is decorative on modern devices and performs no real function.',
    ],
    correctIndex: 1,
    explanation:
      'The integral test button creates an artificial imbalance through an internal resistor that bypasses the residual-current detection toroid. It exercises the trip mechanism but cannot verify IΔn accuracy, trip time, or sensitivity. Periodic instrument testing per BS EN 61557-6 is the only way to verify the protection itself.',
  },
  {
    id: 'mod6-s4-button-fail',
    question:
      'A homeowner presses the RCD test button and the device does not trip. What is the correct response?',
    options: [
      'Press the button harder, then try it again at the next quarterly check.',
      'Treat it as a fault — the trip mechanism has failed; isolate and replace the device.',
      'Move on and ignore it, since the integral test button is unreliable anyway.',
      'Reset the device by switching it fully off and then back on again.',
    ],
    correctIndex: 1,
    explanation:
      'Test-button failure is an absolute failure indicator: the mechanical actuation path does not work, so the device cannot open its contacts on a real fault. The detection circuitry being intact is irrelevant if the breaker cannot open. Replace the device.',
  },
  {
    id: 'mod6-s4-frequency',
    question:
      'How often does Reg 514.12.2 expect the user to operate the RCD test button, and is this a recommendation or a regulatory requirement?',
    options: [
      'Annually — and it is only a recommendation, not a requirement.',
      'Six-monthly — Reg 514.12.2 mandates an installer notice asking the user to test.',
      'Monthly — and it is a Building Regulations requirement on the user.',
      'Whenever the RCD trips — there is no fixed testing interval at all.',
    ],
    correctIndex: 1,
    explanation:
      "Reg 514.12.2 (A4:2026) requires a permanent notice at the consumer unit reminding the user to operate the RCD test button six-monthly. The notice itself is the installer's responsibility; the test action is the user's. Missing notice on a periodic = code C3 minimum.",
  },
  {
    id: 'mod6-s4-recording',
    question:
      'You complete a periodic inspection and the RCD test button works on every device. The user has been pressing it monthly per the notice. What goes on the certificate?',
    options: [
      'Nothing — button operation is implicit on a passing periodic.',
      'Both the Reg 514.12.2 notice as present and the instrument trip-time results.',
      'Just the trip-time results — the test-button check is only informational.',
      'Just confirmation of the notice — periodic instrument testing is optional.',
    ],
    correctIndex: 1,
    explanation:
      'Both deliverables are needed: the Reg 514.12.2 notice (recorded as inspected / present), and the Reg 643.8 instrument verification (×0.5, ×1, ×5 trip-time results in the schedule of test results). User-side button operation is a maintenance ritual, not a substitute for periodic instrument testing.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Per GN3 Ch 2 Reg 2.36, what does pressing the RCD &ldquo;T&rdquo; / &ldquo;Test&rdquo; button actually verify?',
    options: [
      'The CPC continuity from the device through to the load',
      'The disconnection time of the device at its rated IΔn',
      'The internal mechanical trip operation only — via the integral test resistor',
      'The earth-fault loop impedance measured at the device terminals',
    ],
    correctAnswer: 2,
    explanation:
      'GN3 Reg 2.36 is explicit: the integral test device, operated by the &ldquo;T&rdquo; button, enables the functioning of the mechanical parts of the RCD to be verified. It does NOT verify the continuity of the earthing conductor or the associated CPCs, NOR any earth electrode or other means of earthing. Mechanical-only.',
  },
  {
    id: 2,
    question:
      'Per Reg 643.10, where does the test button fit in the verification of RCD effectiveness for additional protection?',
    options: [
      'Reg 643.10 requires the test facility to be verified; the IΔn instrument test is separate — both needed.',
      'The test button replaces the instrument test at IΔn entirely for additional protection.',
      'The test button is the only RCD test required at a periodic inspection of the installation.',
      'The test button has no mention anywhere in BS 7671 as a verification method.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 643.10 (Functional testing) requires that &ldquo;where fault protection and/or additional protection is provided by an RCD, the effectiveness of any test facility incorporated in the device shall be verified.&rdquo; A separate Note 2 says that test does NOT replace the functional test indicated by the relevant standards. Reg 643.8 / 643.7.3 separately require the AC at IΔn instrument test. The button is one duty; the instrument test is another.',
  },
  {
    id: 3,
    question:
      'Per Reg 514.12.2 (A4:2026), what does the RCD instruction notice tell the user to do, and how often?',
    options: [
      'Press the test button monthly',
      'Press the test button six-monthly; afterwards, manually switch on the device. If it does not operate, seek expert advice',
      'Press the test button every 5 years at the EICR',
      'Have the RCD ramp-tested annually by an electrician',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 514.12.2 prescribes the exact wording: &ldquo;Test six-monthly by pressing the relevant test button(s) which should operate the device. Afterwards, manually switch on the device. If the device does not operate, or indicates a fault, seek expert advice.&rdquo; This is a USER duty fixed near the RCD — it is not a substitute for instrument verification at initial verification or periodic inspection.',
  },
  {
    id: 4,
    question:
      'Why can a circuit with a broken CPC pass an RCD test-button check but fail an instrument test at IΔn?',
    options: [
      'The instrument test simply injects a larger residual current than the button does.',
      'RCBOs do not have an integral test button at all, so the comparison is invalid.',
      'The two tests are equivalent, so this scenario cannot actually happen in practice.',
      'The button bypasses the external circuit; the instrument needs the CPC, which is broken.',
    ],
    correctAnswer: 3,
    explanation:
      'The integral test device per GN3 Reg 2.36 creates an internal imbalance that does not require the external CPC at all. An instrument test injects current line-to-PE through the actual circuit; if the CPC is broken, the current cannot return to the source through the protective conductor — the instrument either reports an error, an abnormally high reading, or a failure to trip. The test button cannot detect this hazardous condition; only instrument testing can.',
  },
  {
    id: 5,
    question:
      'A new exception in Reg 514.12.2 (A4:2026) modifies the RCD notice requirement. What is it?',
    options: [
      'It is no longer required at all',
      'For domestic (household) premises or similar installations, the notice is not required where certification for initial verification, or an Electrical Installation Condition Report, complete with the guidance for recipients in Appendix 6, has been issued to the person ordering the work',
      'It is required only for TT systems',
      'It must now be written in two languages',
    ],
    correctAnswer: 1,
    explanation:
      'A4:2026 modified Reg 514.12.2: in domestic / household premises (or similar) where certification for initial verification or an EICR has been issued to the person ordering the work along with the Appendix 6 guidance for recipients, the obligation to fix the RCD instruction notice does not apply. The user information is delivered through the certificate / report instead.',
  },
  {
    id: 6,
    question:
      'On a periodic inspection you press the RCD test button: the device trips. You then run an instrument test at 1×IΔn — the device does not trip within 300 ms. What is the verdict?',
    options: [
      'Pass — a successful test-button trip is sufficient on its own here.',
      'Pass — provided the test instrument is later found to be faulty.',
      'Fail — disconnection must be within 300 ms at IΔn; the button only proves movement.',
      'Pass — provided the test was carried out on the correct final circuit.',
    ],
    correctAnswer: 2,
    explanation:
      'A4:2026 Reg 643.3 (and 643.7.3 / 643.8) state that effectiveness is deemed verified where the device disconnects within 300 ms maximum at IΔn for general non-delay type. A button trip without that compliant time means the mechanical bits move but the device does not perform within band. That is a fail at periodic — record the actual time, code C2 if the disconnection-time exceeds the limit, and replace the device.',
  },
  {
    id: 7,
    question:
      'Per GN3 Ch 2 Reg 2.36, can pressing the test button verify the earth electrode resistance at a TT installation?',
    options: [
      'No — operating the &ldquo;T&rdquo; button does NOT check any earth electrode or other means of earthing.',
      'Yes — the button injects test current through the earth electrode.',
      'Yes — but only where the installation is TT rather than TN-S.',
      'Yes — but only on RCBOs, not on RCCBs.',
    ],
    correctAnswer: 0,
    explanation:
      'GN3 Reg 2.36 spells this out specifically: operation of the integral test device does not provide a means of checking any earth electrode or other means of earthing. The earth-electrode test (Reg 643.7.2 / GN3 Ch 4) is a separate procedure with separate instruments. On a TT install, the button trip means nothing about RA.',
  },
  {
    id: 8,
    question:
      'During an EICR, you press the test button on a 30 mA RCBO. The device does not operate. What is the next step?',
    options: [
      'Skip the test and certify the rest of the installation.',
      'Replace the device immediately without any further investigation.',
      'Press the button several more times in case it frees up.',
      'Check the supply is on and the device is ON; if it still fails, treat as a serious defect — Code C2, recommend replacement and confirm with an instrument test.',
    ],
    correctAnswer: 3,
    explanation:
      'A failed test button is a defect that demands investigation, not a guess. Verify the device is energised and ON, then attempt the instrument test at IΔn. If both fail, the device is not providing the protection its rating implies — a C2 (potentially dangerous) classification on the EICR, and replacement. If the button fails but the instrument test passes, you have a faulty test-button mechanism — still a defect because Reg 643.10 requires the test facility to be effective.',
  },
  {
    id: 9,
    question:
      'In what specific circumstance does an instrument test pass while the test button fails?',
    options: [
      'This is impossible — both tests act on exactly the same circuit.',
      'It happens only on Type B RCDs, never on Type AC or Type A.',
      'When the test resistor is faulty the button cannot inject, but the toroid path still trips.',
      'It happens only on Type S (time-delayed) RCDs, never on non-delay ones.',
    ],
    correctAnswer: 2,
    explanation:
      'The internal test path (resistor + button + load-side connection) is independent of the main fault-detection path (toroid + sensing electronics + trip coil). Either can fail without the other. A failed test button with a working main mechanism is still a defect — the user can no longer perform the six-monthly check Reg 514.12.2 mandates, so the device must be replaced.',
  },
  {
    id: 10,
    question:
      'Reg 643.8 covers verification of additional protection. Which statement aligns with what the regulation actually says?',
    options: [
      'Effectiveness shall be verified with test equipment to BS EN 61557-6; deemed met at 300 ms at IΔn.',
      'Pressing the integral test button is by itself sufficient verification of effectiveness.',
      'No instrument testing is required for additional protection on any RCD-protected circuit.',
      'Only AFDDs, not RCDs, require this effectiveness verification under the regulation.',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 643.8 is explicit: where RCDs are required for additional protection, the effectiveness of automatic disconnection shall be verified using suitable test equipment according to BS EN 61557-6 (the standard for RCD test instruments). The test-button check sits under Reg 643.10 (functional) — it is mechanical only and does not satisfy the Reg 643.8 verification duty.',
  },
];

const InspectionTestingModule6Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'RCD test button vs instrument testing | I&T Module 6.4 | Elec-Mate',
    description:
      'Reg 643.8 / 643.10 / 514.12.2 + GN3 Ch 2 Reg 2.36: what the integral &ldquo;T&rdquo; button verifies (mechanical operation only), what it does NOT verify (CPC continuity, earth electrode, trip current, trip time), why instrument testing is the only path to certification, and the user-side six-monthly duty.',
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
            eyebrow="Module 6 · Section 4"
            title="RCD test button vs instrument testing"
            description="The integral &ldquo;T&rdquo; button is a mechanical functional check — nothing more. What each test verifies, where the regulations split the duty, and why the button never replaces the instrument."
            tone="yellow"
          />

          <TLDR
            points={[
              'GN3 Ch 2 Reg 2.36: the integral test device on an RCD verifies the mechanical operation of the trip mechanism only. It does NOT verify CPC continuity, earth electrode resistance, trip current threshold, or trip time.',
              'Reg 643.10 (Functional testing) requires that the effectiveness of the test facility shall be verified — i.e. the button must work. Reg 643.10 Note 2 states the functional test does NOT replace the functional test indicated by the relevant standards.',
              'Reg 643.8 (Additional protection) and Reg 643.7.3 (ADS) require RCD effectiveness to be verified using suitable test equipment per BS EN 61557-6 — instrument testing at IΔn, with disconnection in 300 ms (non-delay) or 130–500 ms (Type S).',
              'Reg 514.12.2 (A4:2026) prescribes a USER duty: a notice fixed at or near each RCD instructing six-monthly press-to-test, with manual reset afterwards. Modified by A4 to allow exception for domestic / household premises where the relevant certification (with Appendix 6 guidance for recipients) has been issued.',
              'A broken CPC, a high-resistance earth electrode, an over-sensitive or sluggish device — none of these are detectable by the test button. Only an instrument test at IΔn through the actual circuit can verify them.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State exactly what the integral &ldquo;T&rdquo; button verifies (mechanical operation) and what it does NOT verify (CPC, earth electrode, trip current, trip time) — citing GN3 Ch 2 Reg 2.36',
              'Distinguish the Reg 643.10 functional test (button works) from the Reg 643.8 / 643.7.3 effectiveness verification (instrument at IΔn)',
              'Apply Reg 514.12.2 as a user-side duty (six-monthly press-to-test) and recognise the A4:2026 exception for certain domestic premises',
              'Diagnose the four diagnostic outcomes of a button-vs-instrument cross-check (both pass, both fail, button-only fail, instrument-only fail) and code each appropriately on a report',
              'Advise the client correctly: the button is theirs to press; the instrument test is the electrician&rsquo;s duty at initial verification and at periodic inspection',
              'Record both functional (button) and effectiveness (instrument) results on the schedule of test results in the order Reg 643 expects',
            ]}
          />

          <ContentEyebrow>What the regulation actually says</ContentEyebrow>

          <ConceptBlock
            title="The two duties — Reg 643.10 (functional) vs Reg 643.8 (effectiveness)"
            plainEnglish="BS 7671 splits the verification of an RCD into two separate regulations. Reg 643.10 says the test facility (the button) shall be verified — i.e. press it and check the device trips. Reg 643.8 says the effectiveness of automatic disconnection of supply by the RCD shall be verified using suitable test equipment per BS EN 61557-6. Two duties, two pieces of evidence."
            onSite="Tick both boxes on every periodic inspection. The button proves the mechanism works; the instrument proves the device does the job."
          >
            <p>
              The split exists because the two tests answer two different questions. The button
              answers: &ldquo;does the trip mechanism move when commanded?&rdquo; The instrument
              answers: &ldquo;does the device sense a residual current of IΔn at the toroid and
              disconnect the supply within the time required?&rdquo; A device can pass one and fail
              the other. The regulation insists on both because both have to be true for the device
              to provide the protection its rating implies.
            </p>
            <p>
              Reg 643.10 has a Note 2 that is often missed: &ldquo;This functional test does not
              replace the functional test indicated by the relevant standards.&rdquo; In other
              words: the integral test button is one functional test; the instrument test required
              by BS EN 61557-6 is another functional test; you do both. The note is the reason a
              competent inspector never argues that &ldquo;the button worked, so the device is
              fine.&rdquo;
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 9th Ed:2022 (A4) · Chapter 2 · Reg 2.36"
            clause={
              <>
                An integral test device is incorporated in each RCD. This device enables the
                functioning of the mechanical parts of the RCD to be verified by pressing the button
                marked &lsquo;T&rsquo; or &lsquo;Test&rsquo;. Operation of the integral test device
                does not provide a means of checking the continuity of the earthing conductor or the
                associated CPCs. Operation of the integral test device does not provide a means of
                checking any earth electrode or other means of earthing.
              </>
            }
            meaning="Three crisp boundaries from one regulation. The button (1) DOES verify the mechanical trip mechanism moves; (2) does NOT verify CPC continuity; (3) does NOT verify earth electrode or any earthing arrangement. Each &lsquo;does not&rsquo; is a court-quotable limit."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.10"
            clause={
              <>
                Where fault protection and/or additional protection is provided by an RCD, the
                effectiveness of any test facility incorporated in the device shall be verified.
                NOTE&nbsp;2: This functional test does not replace the functional test indicated by
                the relevant standards.
              </>
            }
            meaning="Reg 643.10 makes the button check a duty in its own right — you must press it and confirm the device trips. The note then carves the duty&rsquo;s scope: this is a functional check, not the effectiveness verification, and it does not absolve the inspector of the BS EN 61557-6 instrument test."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.8"
            clause={
              <>
                The verification of the effectiveness of the measures applied for additional
                protection is fulfilled by visual inspection and testing. Where RCDs are required
                for additional protection, the effectiveness of automatic disconnection of supply by
                RCDs shall be verified using suitable test equipment according to BS EN 61557-6 (see
                Regulation 643.1) to confirm that the relevant requirements of Chapter 41 are met.
                NOTE: Regardless of RCD Type, effectiveness is deemed to have been verified where an
                RCD disconnects within the time stated below with an alternating current test at
                rated residual operating current (IΔn): for general non-delay type, 300 ms maximum.
              </>
            }
            meaning="The verification verb is &ldquo;testing using suitable test equipment per BS EN 61557-6&rdquo; — i.e. an RCD tester or multifunction tester. The acceptance criterion is the AC at IΔn disconnection time (300 ms for non-delay). Pressing the button is not testing per BS EN 61557-6."
          />

          <ConceptBlock
            title="How the integral test device actually works inside the RCD"
            plainEnglish="The button connects an internal test resistor between the line conductor and the load-side of the current transformer (the toroid). When the button is held closed, current flows through the resistor and creates an imbalance at the toroid — which the device&rsquo;s sensing electronics interpret as a residual current. The device trips. No external circuit is involved."
          >
            <p>
              Mechanically: the button is a momentary push-switch in series with a high-value
              resistor. The resistor is sized to inject a current designed to operate the device —
              typically slightly above 50 % of IΔn at nominal voltage, calibrated by the
              manufacturer to be sufficient to trip the device but not so high that it stresses the
              contacts.
            </p>
            <p>
              Because the test path is internal, three external faults are invisible to the button:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Broken or disconnected CPC:</strong> the button does not need the CPC to
                operate. A circuit with no earth path can still pass a button test, but a real earth
                fault would not be cleared because there is nothing to drive the residual current to
                earth.
              </li>
              <li>
                <strong>High-resistance earth electrode (TT system):</strong> the button bypasses RA
                entirely. A TT system with an electrode reading 1 kΩ would still pass a button test,
                but the touch voltage during a fault would be lethal.
              </li>
              <li>
                <strong>Drift of the device&rsquo;s sensitivity:</strong> the test current is
                roughly fixed by the internal resistor. A device that has drifted sluggish (trips
                at, say, 35 mA on a 30 mA rating) will still trip on the button — the internal test
                current is well above 35 mA — and look perfectly fine. The drift only shows up on a
                ramp test or at IΔn instrument test.
              </li>
            </ul>
          </ConceptBlock>

          {/* Diagram — what each test verifies (button vs ramp vs trip-time) */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              What each test actually verifies — button vs ramp vs trip-time, side by side
            </h4>
            <svg
              viewBox="0 0 800 460"
              className="w-full h-auto"
              role="img"
              aria-label="Three-column comparison matrix. Column 1 — Test button: verifies mechanical operation only; does not verify CPC, earth electrode, trip current, or trip time. Column 2 — Ramp test: verifies actual trip current within 50 to 100 percent of IΔn; does not verify trip time. Column 3 — Trip-time test at IΔn: verifies disconnection within 300 ms; this is the mandatory effectiveness test under Reg 643.8 and 643.7.3."
            >
              {/* Column headings bar */}
              <rect
                x="20"
                y="20"
                width="240"
                height="50"
                rx="8"
                fill="rgba(251,191,36,0.10)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="140"
                y="42"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                TEST BUTTON
              </text>
              <text x="140" y="58" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Reg 643.10 · GN3 Reg 2.36
              </text>

              <rect
                x="280"
                y="20"
                width="240"
                height="50"
                rx="8"
                fill="rgba(34,197,94,0.10)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="42"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="13"
                fontWeight="bold"
              >
                RAMP TEST
              </text>
              <text x="400" y="58" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                GN3 Ch 4 Reg 4.6 · supplementary
              </text>

              <rect
                x="540"
                y="20"
                width="240"
                height="50"
                rx="8"
                fill="rgba(59,130,246,0.10)"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="660"
                y="42"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="13"
                fontWeight="bold"
              >
                TRIP-TIME at IΔn
              </text>
              <text x="660" y="58" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Reg 643.8 / 643.7.3 · MANDATORY
              </text>

              {/* "Verifies" row */}
              <text x="20" y="100" fill="rgba(255,255,255,0.45)" fontSize="9" fontWeight="bold">
                WHAT IT VERIFIES
              </text>

              <rect
                x="20"
                y="110"
                width="240"
                height="100"
                rx="6"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text x="35" y="130" fill="#FBBF24" fontSize="11" fontWeight="bold">
                Yes
              </text>
              <text x="55" y="130" fill="rgba(255,255,255,0.85)" fontSize="11">
                Mechanical trip mechanism
              </text>
              <text x="35" y="148" fill="rgba(255,255,255,0.6)" fontSize="10">
                works (contacts move)
              </text>
              <text x="35" y="172" fill="#FBBF24" fontSize="11" fontWeight="bold">
                Yes
              </text>
              <text x="55" y="172" fill="rgba(255,255,255,0.85)" fontSize="11">
                Internal test resistor
              </text>
              <text x="35" y="190" fill="rgba(255,255,255,0.6)" fontSize="10">
                + button switch intact
              </text>

              <rect
                x="280"
                y="110"
                width="240"
                height="100"
                rx="6"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text x="295" y="130" fill="#22C55E" fontSize="11" fontWeight="bold">
                Yes
              </text>
              <text x="315" y="130" fill="rgba(255,255,255,0.85)" fontSize="11">
                Actual trip current (mA)
              </text>
              <text x="295" y="148" fill="rgba(255,255,255,0.6)" fontSize="10">
                within 50–100 % IΔn
              </text>
              <text x="295" y="172" fill="#22C55E" fontSize="11" fontWeight="bold">
                Yes
              </text>
              <text x="315" y="172" fill="rgba(255,255,255,0.85)" fontSize="11">
                Sensitivity drift over time
              </text>
              <text x="295" y="190" fill="rgba(255,255,255,0.6)" fontSize="10">
                (compared to baseline)
              </text>

              <rect
                x="540"
                y="110"
                width="240"
                height="100"
                rx="6"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <text x="555" y="130" fill="#3B82F6" fontSize="11" fontWeight="bold">
                Yes
              </text>
              <text x="575" y="130" fill="rgba(255,255,255,0.85)" fontSize="11">
                Disconnection ≤ 300 ms
              </text>
              <text x="555" y="148" fill="rgba(255,255,255,0.6)" fontSize="10">
                at IΔn (non-delay)
              </text>
              <text x="555" y="172" fill="#3B82F6" fontSize="11" fontWeight="bold">
                Yes
              </text>
              <text x="575" y="172" fill="rgba(255,255,255,0.85)" fontSize="11">
                CPC integrity (current
              </text>
              <text x="555" y="190" fill="rgba(255,255,255,0.6)" fontSize="10">
                must return through CPC)
              </text>

              {/* "Does NOT verify" row */}
              <text x="20" y="240" fill="rgba(239,68,68,0.7)" fontSize="9" fontWeight="bold">
                WHAT IT DOES NOT VERIFY
              </text>

              <rect
                x="20"
                y="250"
                width="240"
                height="180"
                rx="6"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.2)"
                strokeWidth="1"
              />
              <text x="35" y="270" fill="#EF4444" fontSize="11" fontWeight="bold">
                ✗ CPC continuity
              </text>
              <text x="35" y="288" fill="rgba(255,255,255,0.5)" fontSize="9">
                (broken CPC undetected)
              </text>
              <text x="35" y="310" fill="#EF4444" fontSize="11" fontWeight="bold">
                ✗ Earth electrode (TT)
              </text>
              <text x="35" y="328" fill="rgba(255,255,255,0.5)" fontSize="9">
                (high RA undetected)
              </text>
              <text x="35" y="350" fill="#EF4444" fontSize="11" fontWeight="bold">
                ✗ Trip current threshold
              </text>
              <text x="35" y="368" fill="rgba(255,255,255,0.5)" fontSize="9">
                (sensitivity drift hidden)
              </text>
              <text x="35" y="390" fill="#EF4444" fontSize="11" fontWeight="bold">
                ✗ Trip time at IΔn
              </text>
              <text x="35" y="408" fill="rgba(255,255,255,0.5)" fontSize="9">
                (no timing capability)
              </text>

              <rect
                x="280"
                y="250"
                width="240"
                height="180"
                rx="6"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.2)"
                strokeWidth="1"
              />
              <text x="295" y="270" fill="#EF4444" fontSize="11" fontWeight="bold">
                ✗ Trip TIME at IΔn
              </text>
              <text x="295" y="288" fill="rgba(255,255,255,0.5)" fontSize="9">
                (different test, different
              </text>
              <text x="295" y="302" fill="rgba(255,255,255,0.5)" fontSize="9">
                acceptance band)
              </text>
              <text x="295" y="324" fill="#EF4444" fontSize="11" fontWeight="bold">
                ✗ Test-button mechanism
              </text>
              <text x="295" y="342" fill="rgba(255,255,255,0.5)" fontSize="9">
                (button can fail
              </text>
              <text x="295" y="356" fill="rgba(255,255,255,0.5)" fontSize="9">
                independently)
              </text>
              <text x="295" y="378" fill="#EF4444" fontSize="11" fontWeight="bold">
                ✗ Compliance per Reg 643.3
              </text>
              <text x="295" y="396" fill="rgba(255,255,255,0.5)" fontSize="9">
                (supplementary, not
              </text>
              <text x="295" y="410" fill="rgba(255,255,255,0.5)" fontSize="9">
                mandatory effectiveness test)
              </text>

              <rect
                x="540"
                y="250"
                width="240"
                height="180"
                rx="6"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.2)"
                strokeWidth="1"
              />
              <text x="555" y="270" fill="#22C55E" fontSize="11" fontWeight="bold">
                ✓ Mandatory test
              </text>
              <text x="555" y="288" fill="rgba(255,255,255,0.5)" fontSize="9">
                Reg 643.3 / 643.8 / 643.7.3
              </text>
              <text x="555" y="310" fill="#22C55E" fontSize="11" fontWeight="bold">
                ✓ Per BS EN 61557-6
              </text>
              <text x="555" y="328" fill="rgba(255,255,255,0.5)" fontSize="9">
                instrument standard
              </text>
              <text x="555" y="350" fill="#22C55E" fontSize="11" fontWeight="bold">
                ✓ At IΔn (rated)
              </text>
              <text x="555" y="368" fill="rgba(255,255,255,0.5)" fontSize="9">
                regardless of RCD Type
              </text>
              <text x="555" y="390" fill="#22C55E" fontSize="11" fontWeight="bold">
                ✓ Half-cycle 0° / 180°
              </text>
              <text x="555" y="408" fill="rgba(255,255,255,0.5)" fontSize="9">
                worst reading recorded
              </text>

              {/* Bottom caption */}
              <text x="400" y="450" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="10">
                The button is the user&rsquo;s tool. The ramp is the diagnostic tool. The trip-time
                test is the certifying tool. Three different jobs.
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The user side — Reg 514.12.2 in plain English</ContentEyebrow>

          <ConceptBlock
            title="The RCD instruction notice — a user duty fixed near the device"
            plainEnglish="Reg 514.12.2 requires a notice fixed at or near each RCD telling the occupier to press the test button six-monthly. After the device trips, manually switch it back on. If it does not trip when pressed, seek expert advice. This is the USER&rsquo;s duty — not a substitute for the electrician&rsquo;s instrument test."
            onSite="Fix the notice (or confirm it is in place at periodic inspection). On a domestic install where the certificate or EICR is being issued with the Appendix 6 guidance for recipients, the A4:2026 exception applies and the physical notice is not required — but the user instruction itself still reaches the occupier via the certificate."
          >
            <p>The exact wording is fixed by the regulation:</p>
            <blockquote className="border-l-4 border-elec-yellow/40 pl-4 italic text-[13.5px] text-white/85 my-2">
              This installation, or part of it, is protected by a device which automatically
              switches off the supply if a fault develops. Test six-monthly by pressing the relevant
              test button(s) which should operate the device. Afterwards, manually switch on the
              device. If the device does not operate, or indicates a fault, seek expert advice.
            </blockquote>
            <p>
              Three things to note. First, the test interval is six-monthly — not monthly, not
              quarterly. (You may see &ldquo;quarterly&rdquo; in older training materials and client
              leaflets; the BS 7671 wording is six-monthly.) Second, the user&rsquo;s duty is the
              press-and-reset only — they are not asked to interpret the result, only to call for
              help if the device fails. Third, the same notice can be applied to other user-test
              devices (Note 3 of the regulation): RCBOs, AFDDs with a manually-operated test,
              integrated socket-outlet RCDs (BS 7288).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 514.12.2"
            clause={
              <>
                Where an installation incorporates an RCD an instruction notice shall be fixed in a
                prominent position at or near each RCD in the installation. The notice shall be
                clearly and durably marked and shall read as follows: &lsquo;This installation, or
                part of it, is protected by a device which automatically switches off the supply if
                a fault develops. Test six-monthly by pressing the relevant test button(s) which
                should operate the device. Afterwards, manually switch on the device. If the device
                does not operate, or indicates a fault, seek expert advice.&rsquo; The requirements
                of this regulation need not be applied for domestic (household) premises or similar
                installations where certification for initial verification, or an Electrical
                Installation Condition Report, complete with the guidance for recipients as detailed
                in Appendix 6, has been issued to the person ordering the work.
              </>
            }
            meaning="A4:2026 introduced the domestic-exception. The notice obligation is still the default; the exception only applies when the certificate / EICR has gone to the person ordering the work along with the Appendix 6 guidance for recipients. In commercial / industrial / shared / let premises, fix the notice."
          />

          <Scenario
            title="A buy-to-let flat at periodic inspection — RCBO test buttons functional but no instrument compliance"
            situation="During an EICR on a 1990s consumer-unit replacement (the unit was upgraded to RCBOs in 2015), every test button you press operates its RCBO. The landlord points to this and asks why an EICR is needed every five years if the buttons all work. You then run the instrument test at IΔn on each RCBO. Two of the eight devices time out at 380 ms and 410 ms respectively — over the 300 ms ceiling for non-delay. Trip current ramps confirm one is sluggish at 32 mA on a 30 mA rating."
            whatToDo="Code the two failing RCBOs as C2 (potentially dangerous — disconnection time exceeded). Recommend replacement before re-energisation. Record the actual trip times and the ramp trip currents on the schedule. The button check is a Reg 643.10 functional test only — it does not satisfy the Reg 643.7.3 / 643.8 effectiveness duty. Use the conversation with the landlord to explain the split: the button proves the device CAN trip; the instrument test proves the device DOES trip in time."
            whyItMatters="Landlords (and occupiers) routinely conflate the user duty with the inspector&rsquo;s duty. Reg 514.12.2 makes the press-test a USER instruction; it does not exempt anyone from the periodic inspection regime. Documenting the time exceedance with hard numbers — 380 ms when the limit is 300 ms — is what gives the EICR its evidential weight if the property is later sold or the let is challenged."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The four diagnostic outcomes</ContentEyebrow>

          <ConceptBlock
            title="What button-vs-instrument cross-checking actually tells you"
            plainEnglish="On every RCD at initial verification or periodic inspection, you do both checks. The four possible outcomes carry different diagnoses and different actions."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong className="text-emerald-300">
                  Button trips, instrument test passes (within 300 ms at IΔn).
                </strong>{' '}
                The expected outcome on a healthy device. Record both. Move on.
              </li>
              <li>
                <strong className="text-amber-300">
                  Button trips, instrument test fails (over 300 ms or no trip).
                </strong>{' '}
                Mechanical bits move; sensing path or trip path is sluggish. This is the
                button-only-pass scenario the test button cannot detect on its own. Code C2,
                recommend replacement.
              </li>
              <li>
                <strong className="text-amber-300">
                  Button does NOT trip, instrument test passes.
                </strong>{' '}
                Internal test resistor or button switch failed; main fault path still works. Reg
                643.10 requires the test facility to be effective — the device is non-compliant. The
                user can no longer perform the Reg 514.12.2 six-monthly check. Replace.
              </li>
              <li>
                <strong className="text-red-300">
                  Button does NOT trip, instrument test fails.
                </strong>{' '}
                Device is comprehensively defective — both the test path AND the main fault path are
                not working. C1 (immediate danger) classification on an EICR; isolate the circuit
                and replace before re-energisation.
              </li>
            </ol>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The myths and the mistakes</ContentEyebrow>

          <CommonMistake
            title="Telling the client the device is fine after a successful button press"
            whatHappens="A homeowner asks you, mid-job, whether their old RCD is still safe. You press the button, it trips, you say &ldquo;yes&rdquo;. The device is in fact drifting — its actual trip current at IΔn is 38 mA on a 30 mA rating, and its trip time is 420 ms. There is no compliant additional protection on the household sockets. Six months later, a child gets a shock from a broken kettle lead and the RCD takes nearly half a second to operate. The homeowner&rsquo;s solicitor asks you, on record, whether you confirmed the RCD was working. You said yes."
            doInstead="Never give a verbal pass on an RCD off the back of a button press. The button is a mechanical check only — Reg 643.8 / 643.10 / GN3 Reg 2.36 are explicit that effectiveness requires the BS EN 61557-6 instrument test. If the homeowner asks for an opinion, either run the instrument test there and then, or tell them the button proves only that the device CAN trip, not that it trips fast enough or sensitive enough to provide protection."
          />

          <CommonMistake
            title="Skipping the test-button check because the instrument test passed"
            whatHappens="You run a clean instrument test sequence on the RCD — 1×IΔn at 22 ms, 5×IΔn at 18 ms, ramp at 22 mA — all comfortable passes. You move on without pressing the test button. Six months later, the user presses the button as instructed by the Reg 514.12.2 notice; nothing happens. They call out an emergency electrician, who finds the integral test resistor is open-circuit. The device&rsquo;s main protection path is fine, but the button mechanism is dead — Reg 643.10 was not satisfied at your inspection."
            doInstead="Always tick both Reg 643.10 (button works) and Reg 643.8 (instrument compliance) at every initial verification and every periodic inspection. They are separate duties under separate regulations. The button check takes two seconds — there is no excuse for skipping it."
          />

          <CommonMistake
            title="Recording the test-button result as the only RCD verification on the certificate"
            whatHappens="An EICR comes in for review showing &ldquo;RCD test buttons operated correctly — pass&rdquo; in the comments column, with no IΔn trip times, no ramp values, and no half-cycle data. The certificate is challenged; the inspector cannot show evidence of compliance with Reg 643.8. The certificate is voided and the inspector is referred to their scheme."
            doInstead="The schedule of test results (per Reg 653.4 and the Appendix 6 model forms) requires recorded RCD operating times and operating currents — measured by an instrument per BS EN 61557-6. The button check is documented separately as a functional test under Reg 643.10. Both fields are populated on a competent inspection report."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            The instrument test — what BS EN 61557-6 actually requires
          </ContentEyebrow>

          <ConceptBlock
            title="The instrument side — RCD effectiveness verification per Reg 643.7.3 / 643.8"
            plainEnglish="An RCD effectiveness test injects a controlled AC residual current at the rated IΔn through line and the protective conductor, downstream of the device. The instrument times how long the device takes to disconnect. Reg 643.3 (A4:2026) sets the test as AC at IΔn, regardless of RCD Type."
            onSite="Use a BS EN 61557-6 multifunction tester or dedicated RCD tester. Modern instruments handle the half-cycle test (0° / 180°) automatically and report the worst time — that is the value to record."
          >
            <p>
              The acceptance criteria, copied verbatim from Reg 643.7.3 Note (and repeated in Reg
              643.8 Note for additional protection):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>General non-delay type:</strong> 300 ms maximum at IΔn.
              </li>
              <li>
                <strong>Type S (selective / time-delayed):</strong> between 130 ms minimum and 500
                ms maximum at IΔn. The minimum exists because Type S is meant to delay so downstream
                RCDs can clear first; if it trips faster than 130 ms it has no selectivity.
              </li>
              <li>
                <strong>Half-cycle test:</strong> per GN3 Reg 2.31, run the test on both 0° and 180°
                starts and record the longer (worst) operating time.
              </li>
              <li>
                <strong>Effectiveness deemed verified:</strong> the regulation uses the phrase
                &ldquo;effectiveness is deemed to have been verified where an RCD disconnects within
                the time stated&rdquo; — i.e. you do not need to also do a 5×IΔn test or a ramp test
                for compliance. They remain useful diagnostically (Module 6.3) but are not part of
                the mandatory verification under A4:2026.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="A 30 mA AC RCD on a TT system — button trips, instrument test reports an open circuit"
            situation="A pre-2008 TT installation uses a single 30 mA AC RCD as the main switch. You press the button — the device trips correctly. You then run the instrument test at IΔn from a downstream socket. The tester returns &ldquo;test failed: no trip / loop too high&rdquo;. You measure earth-loop impedance: Zs = 220 Ω."
            whatToDo="The button check is irrelevant here. The TT earth electrode resistance is so high that the test current the instrument can drive into the loop is below the device&rsquo;s sensitivity threshold — the trip fails not because the RCD is broken but because the loop will not support the required current. Touch voltage during a real fault would be lethal: at 30 mA × 220 Ω = 6.6 V (RA × IΔn ≤ 50 V is satisfied, but the fault current depends on full mains voltage and the loop, and at this RA the disconnection is unreliable). Investigate the earth electrode (Reg 643.7.2 / GN3 Ch 4 — fall-of-potential), and remediate. The button told you nothing; only the instrument test exposed the actual installation defect."
            whyItMatters="On TT systems, the test button is uniquely misleading. It bypasses the earth electrode entirely. A device that trips on the button can be sitting on a dead electrode, and the only way to find out is the instrument test through the actual earth path."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>How the result feeds the schedule of test results</ContentEyebrow>

          <ConceptBlock
            title="Two columns, two duties, both populated"
            plainEnglish="The Appendix 6 schedule of test results has separate cells for functional test results (the button check) and effectiveness test results (the instrument trip times). Both are filled in at every inspection."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>RCD functional / test-button column:</strong> tick or &ldquo;Y&rdquo; if the
                device tripped on press; cross or &ldquo;N&rdquo; if it did not. Reg 643.10
                evidence.
              </li>
              <li>
                <strong>RCD operating time at 1×IΔn (ms):</strong> the measured trip time at IΔn
                from the BS EN 61557-6 instrument. Half-cycle worst reading. Reg 643.8 / 643.7.3
                evidence. Acceptance ≤ 300 ms (non-delay) or 130–500 ms (Type S).
              </li>
              <li>
                <strong>RCD operating current (mA) — ramp:</strong> optional but strongly
                recommended (covered in Module 6.3). The actual mA at which the device trips on
                ramp.
              </li>
              <li>
                <strong>Comments column:</strong> any anomaly — drift between inspections, button
                fail with instrument pass, instrument fail with button pass, standing leakage noted
                on the circuit. The comments are what the next inspector reads.
              </li>
            </ul>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'GN3 Ch 2 Reg 2.36: the &ldquo;T&rdquo; button verifies mechanical operation only. It does NOT verify CPC continuity, earth electrode, trip current, or trip time.',
              'Reg 643.10: verify the test facility (the button) works. Note 2: this functional test does not replace the functional test indicated by the relevant standards.',
              'Reg 643.8 / 643.7.3: the EFFECTIVENESS test is at IΔn using a BS EN 61557-6 instrument, regardless of RCD Type. Acceptance: 300 ms (non-delay) / 130–500 ms (Type S).',
              'Reg 514.12.2: USER duty — six-monthly press-to-test, manual reset, seek expert advice if it fails. A4:2026 exception applies to domestic premises where the certificate / EICR has been issued with Appendix 6 guidance for recipients.',
              'A broken CPC and a bad TT electrode both pass the button. Only the instrument test exposes them.',
              'Drift toward the trip-time ceiling between inspections is the early warning. Record actual ms (not just pass/fail) so the trend is visible.',
              'Both Reg 643.10 (button) AND Reg 643.8 (instrument) results go on the schedule. Skipping either fails the duty.',
              'Never give a verbal &ldquo;your RCD is fine&rdquo; based on a button press alone.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'If the test button operates the RCD, why is an instrument test still needed?',
                answer:
                  'GN3 Reg 2.36 spells it out: the button verifies the mechanical operation of the trip mechanism only. It does not verify CPC continuity, earth electrode, trip current threshold, or trip time. A device with a broken CPC, or a sluggish device that takes 450 ms to trip on a 30 mA-rated rating with a 300 ms requirement, will still trip on the button — and look fine. Reg 643.8 / 643.7.3 require effectiveness verification with a BS EN 61557-6 instrument. The button is one duty; the instrument is another.',
              },
              {
                question: 'How often does BS 7671 say the user should press the test button?',
                answer:
                  'Reg 514.12.2 — six-monthly. The exact phrase is &ldquo;Test six-monthly by pressing the relevant test button(s) which should operate the device.&rdquo; Older training materials sometimes say monthly or quarterly; BS 7671 says six-monthly.',
              },
              {
                question:
                  'A4:2026 added an exception to Reg 514.12.2 — when does the notice not need to be fixed?',
                answer:
                  'Where the installation is in domestic (household) premises or similar, AND certification for initial verification or an EICR has been issued to the person ordering the work, AND the certificate / report includes the Appendix 6 guidance for recipients, the obligation to fix the physical notice does not apply. The user instruction reaches the occupier through the certificate package instead. In commercial / industrial / shared / let premises, the notice obligation still applies.',
              },
              {
                question:
                  'Can pressing the test button verify the earth electrode on a TT install?',
                answer:
                  'No. GN3 Reg 2.36 is explicit: operation of the integral test device does not provide a means of checking any earth electrode or other means of earthing. The button bypasses the external earth path entirely. On a TT install, the earth electrode resistance is verified by separate procedure (Reg 643.7.2, fall-of-potential or stakeless equivalent in GN3 Ch 4). A failing electrode can co-exist with a passing button check.',
              },
              {
                question:
                  'The test button on an RCBO does not operate the device. The instrument test passes. Pass or fail?',
                answer:
                  'Fail. Reg 643.10 requires the effectiveness of the test facility to be verified. A non-functional button is a defect even if the main protection path still works — the user can no longer perform the Reg 514.12.2 six-monthly check, so the device is non-compliant in service. Replace the device, then re-test.',
              },
              {
                question:
                  'During an EICR, is the test-button check on its own enough for the schedule of test results?',
                answer:
                  'No. The schedule of test results required by Reg 653.4 and the Appendix 6 model forms expects recorded RCD operating times and operating currents — those come from an instrument per BS EN 61557-6. The button check is documented separately as a functional test under Reg 643.10. Both fields are populated; recording the button result alone does not satisfy the duty.',
              },
              {
                question:
                  'Does the test button apply exactly IΔn (e.g. exactly 30 mA on a 30 mA RCD)?',
                answer:
                  'No. The button injects a current designed to trip the mechanism — typically somewhere in the upper portion of the IΔn band, sized by the manufacturer with an internal resistor. The exact value varies device to device, is not user-calibratable, and is not stated on the device. That is why the button cannot verify the actual trip current — it just confirms a current sufficient to trip the device&rsquo;s sensing path was injected and the device responded.',
              },
              {
                question:
                  'What if the test button fails to operate the RCD on first press during an EICR?',
                answer:
                  'Treat it as a serious defect, not a stuck mechanism. First confirm the supply is on and the device is in the &ldquo;ON&rdquo; position. If it still fails, attempt the instrument test at IΔn — if the device trips on the instrument, you have a button-only failure (Reg 643.10 fail). If it fails on the instrument too, you have a comprehensive failure (Reg 643.8 fail). Both outcomes warrant replacement; the second is C1 (immediate danger) territory because there is no working protection at all.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Test button vs instrument testing — Module 6.4" questions={quizQuestions} />

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
                navigate('/electrician/upskilling/inspection-testing/module-6/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                6.5 Discriminating and selective RCDs
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule6Section4;
