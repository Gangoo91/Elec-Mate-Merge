/**
 * Module 4 · Section 4 · Subsection 3 — Analysing test results — acceptable vs not
 * Maps to C&G 2365-03 / Unit 303 / LO4 / AC 4.6
 *   AC 4.6 — "analyse and determine if test results are acceptable"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 4.8 — identify whether test
 * results are acceptable and state the actions to take where unsatisfactory
 * results are obtained.
 *
 * Frame: turning raw readings into diagnostic conclusions — BS 7671
 * Appendix 3 / Table 41.3 thresholds, the difference between 'pass' and
 * 'healthy', what unsatisfactory results mean, and the action chain when
 * a reading falls outside expected.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Analysing test results (4.3) | Level 3 Module 4.4.3 | Elec-Mate';
const DESCRIPTION =
  'Turning raw readings into diagnostic conclusions — BS 7671 Appendix 3 / Table 41.3 thresholds, pass vs healthy, what unsatisfactory results mean, the action chain when readings fall outside expected.';

const checks = [
  {
    id: 'mod4-s4-sub3-passhealthy',
    question:
      "What's the difference between a 'pass' result and a 'healthy' result on an MFT test?",
    options: [
      "There is no difference — pass and healthy mean the same thing. If a reading meets the BS 7671 minimum it is healthy by definition, so once a circuit passes there is nothing further to interpret and no value in recording how far above the limit it sits.",
      "PASS means the reading is below the BS 7671 minimum and HEALTHY means it is above. The two words describe opposite outcomes, so a 'pass' is actually a failing circuit and a 'healthy' result is the one that meets the standard.",
      "PASS means the reading meets the BS 7671 minimum limit; HEALTHY means it is significantly better than the limit and matches what a properly-installed system produces. A borderline pass (e.g. 2 MΩ IR against a 1 MΩ minimum) meets the regulation but signals developing degradation worth investigating.",
      "PASS applies to dead tests and HEALTHY applies to live tests. Continuity and insulation results are recorded as pass or fail, while loop and RCD results are recorded as healthy or unhealthy, so the two words simply mark which stage of testing the reading came from.",
    ],
    correctIndex: 2,
    explanation:
      "Pass-vs-healthy thinking turns the MFT from a pass/fail tool into a trend-monitoring tool. The Reg 643.3 IR limit is ≥ 1 MΩ, but modern installations read 100+ MΩ on a healthy circuit, so a 2 MΩ reading is technically pass yet an early indicator of insulation degradation. Pass tells you it meets the regulation; healthy tells you the system is in good shape. The L3 expectation is to flag borderline readings as developing faults rather than dismiss them as 'still pass'.",
  },
  {
    id: 'mod4-s4-sub3-table413',
    question:
      "BS 7671 Table 41.3 sets maximum Zs values for protective devices. What's the practical use in fault diagnosis?",
    options: [
      "Measure Zs and compare it to both the Table 41.3 maximum and the calculated expected value. Above the table maximum is a real safety failure (the device can't disconnect in time); above expected but below the maximum is a developing problem — added impedance from an HRJ or undersized cable — worth investigating.",
      "Table 41.3 gives the minimum Zs each circuit must reach. A reading below the table value means the loop impedance is too low and the fault current will be dangerously high, so you must add resistance to the circuit until the measured Zs rises above the table figure.",
      "Table 41.3 lists the cable sizes for each protective device. You look up the breaker rating, read off the required CSA, and confirm the installed cable matches; it has nothing to do with loop impedance or disconnection time.",
      "Table 41.3 sets the insulation-resistance minimums for each device type. You compare the measured IR at 500 V to the table value for the breaker fitted; a reading below the figure means the circuit fails, and Zs does not come into it.",
    ],
    correctIndex: 0,
    explanation:
      "Table 41.3 has three uses: pass/fail (a Zs above the value means the device can't disconnect within the BS 7671 643 time limit), diagnostic (a Zs much higher than calculated expected shows added loop impedance — HRJ or undersized cable), and design (the table tells you which device suits which cable). Table 41.3 is the safety threshold; calculated expected is the design reference; the diagnostic value comes from comparing measured to both. The L3 apprentice learns to spot 'pass but worse than expected' as a developing fault.",
  },
  {
    id: 'mod4-s4-sub3-action',
    question:
      "What's the action chain when a test result falls outside acceptable limits?",
    options: [
      "Record the reading on the job sheet and re-energise the circuit. A single out-of-limit result is usually instrument error, so the safest assumption is that the circuit is fine; note the value, hand back to the customer, and move on without isolating anything.",
      "Verify the reading (repeat, check leads, second instrument), identify the failure mode, make safe by isolating the affected circuit, document and inform the customer in writing if it's Code 1, then rectify within competence or escalate. A Code 1 is never left unactioned, even outside the call-out scope.",
      "Immediately replace whichever component the test points at, without verifying the reading first. An out-of-limit result is conclusive on its own, so the fastest route is to swap the suspect part and retest; there is no need to make safe or document before rectifying.",
      "Increase the protective device rating so the circuit passes. If Zs is above the Table limit, fitting a higher-rated breaker raises the permissible Zs and the reading becomes acceptable, which clears the failure without any further investigation of the loop.",
    ],
    correctIndex: 1,
    explanation:
      "The five-step chain converts an unsatisfactory reading into a safe, documented, defensible outcome: (1) verify — repeat the test, check leads and instrument, compare with a second instrument; (2) identify the failure mode (insulation breakdown, HRJ, polarity error, RCD slow trip); (3) make safe — isolate, label/sign if leaving site; (4) document the reading, verification and action, with a written customer notification if Code 1; (5) rectify if within competence or escalate. The HSE / Building Regs / customer's contractual position all depend on the firm following this chain — the 'note and walk away' alternative is the path to prosecution.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Compare the BS 7671 minimum IR for LV circuits with the typical reading on a healthy modern installation. What's the practical difference?",
    options: [
      "There is no practical difference — the BS 7671 minimum and the typical healthy reading are the same figure. A modern installation reads right at 1 MΩ when new, so any reading above that is identical in meaning and there is nothing to interpret beyond pass or fail.",
      "The Reg 643.3 minimum is ≥ 1 MΩ at 500 V, but a healthy modern installation reads 100+ MΩ on the same test. A reading of 2–10 MΩ passes yet shows insulation degradation in progress, so the L3 investigator records both the value and the assessment — on an EICR a Code 3 (improvement recommended) rather than a plain pass.",
      "The BS 7671 minimum is 100 MΩ and a healthy installation reads 1 MΩ. Modern wiring is deliberately built to leak slightly so that residual-current devices have something to detect, which is why a healthy reading sits just above 1 MΩ rather than near the 100 MΩ minimum.",
      "The minimum is measured at 250 V and the healthy reading at 500 V, so the two figures cannot be compared. A circuit that reads 1 MΩ at 250 V is healthy, while the same circuit at 500 V would fail, which is why the two test voltages give the apparent difference.",
    ],
    correctAnswer: 1,
    explanation:
      "The 1 MΩ minimum is decades old; modern thermoplastic cables in good condition routinely read 100+ MΩ. Recording the value (not just pass/fail) gives the diagnostic signal — borderline values are early-warning indicators.",
  },
  {
    id: 2,
    question: "What's the maximum Zs for a 32 A B-curve RCBO protecting a domestic ring final on 230 V?",
    options: [
      "0.35 Ω. The maximum Zs for any 32 A circuit equals the typical TN-C-S supply Ze, because the loop impedance cannot exceed the impedance of the supply itself; once you add the circuit conductors the figure only rises, so the supply Ze is the ceiling.",
      "1.15 Ω. The B32 maximum is found by dividing the supply voltage by the breaker's rated current — 230 ÷ 32 × 0.16 — which gives the loop impedance at which the thermal element operates in four seconds.",
      "1.37 Ω, from Table 41.3 for a B-curve device at 0.4 s disconnection — the 5×In magnetic threshold is 160 A, so Zs = (230 × 0.95) ÷ 160 = 1.37 Ω. The RCD function still clears earth faults on residual current, but this Zs governs short-circuit clearance.",
      "7.28 Ω. This is the B32 maximum at 0.4 s — the same figure as a B6 device, because the disconnection time is fixed at 0.4 s for all final circuits and the breaker rating does not change the permitted loop impedance.",
    ],
    correctAnswer: 2,
    explanation:
      "Table 41.3 values are the disconnection-time pass/fail thresholds. For a B-curve device at 0.4 s the required Zs = (U₀ × Cmin) / Ia = (230 × 0.95) / 160 = 1.37 Ω at 32 A; the A4:2026 table also gives B16 = 2.73 Ω. On RCD-protected circuits the RCD provides 30 mA earth-fault clearance independent of Zs (it operates on residual current, not loop impedance), but the Zs value still matters for short-circuit clearance via the magnetic element of the RCBO.",
  },
  {
    id: 3,
    question: "What does a continuity reading of 0.55 Ω on a 50 m run of 2.5 mm² ring final tell you?",
    options: [
      "0.55 Ω is exactly the value the BS 7671 minimum requires for a 2.5 mm² ring, so the reading confirms the circuit is correct. Continuity has a fixed lower limit of 0.55 Ω that every ring must reach, and anything below it would mean the conductors are too short.",
      "0.55 Ω fails the circuit — continuity readings must always be below 0.1 Ω on a ring, so this value indicates a broken conductor. Isolate the ring and replace the cable, because any continuity reading above 0.1 Ω means an open circuit.",
      "0.55 Ω is far too low and indicates a short circuit between line and CPC. A healthy 50 m ring should read several ohms, so a value this small means the insulation has broken down; IR-test to confirm and rewire the affected section.",
      "It's higher than expected — the calculated R1+R2 for this ring is about 0.37 Ω, so 0.55 Ω suggests added resistance somewhere (an HRJ at a socket or a partial connection at the CU). Still within Table 41.3 limits, but the deviation from expected is worth recording and investigating.",
    ],
    correctAnswer: 3,
    explanation:
      "Reading interpretation requires knowing the expected value. For 50 m of 2.5 mm² ring the calculation runs roughly 2 × 50 × 7.41 mΩ/m = 0.74 Ω end-to-end, halved because the ring divides = 0.37 Ω (plus lead null). A measured 0.55 Ω is about 50% above that — a 'pass' reading that is a developing fault. The expected value comes from cable length × resistance per metre × topology factor; the L3 apprentice does this calculation as part of fault investigation.",
  },
  {
    id: 4,
    question: "An RCD trip-time test reads 28 ms at I∆n on a 30 mA general-type RCD. Pass or fail?",
    options: [
      "PASS. The Reg 643.7 maximum at I∆n for a general-type RCD is 300 ms, so 28 ms is well within limits and matches a healthy modern device (typically 10–30 ms). A reading near 250–290 ms would still pass but be worth flagging.",
      "FAIL. The maximum trip-time at I∆n for a general-type 30 mA RCD is 10 ms, so 28 ms is nearly three times over the limit. Replace the RCD, because a device this slow cannot protect against shock.",
      "FAIL. A reading of 28 ms means the RCD is over-sensitive and tripping too fast, which causes nuisance trips. The device should take 200–300 ms to trip; replace it with a time-delayed S-type to slow it down.",
      "Cannot tell — trip-time alone does not determine pass or fail. You also need the ramp test result, and without knowing the exact current at which the device tripped the 28 ms figure is meaningless, so the test must be repeated before any verdict.",
    ],
    correctAnswer: 0,
    explanation:
      "RCD trip-times are usually well within BS 7671 limits when the device is healthy. The 300 ms limit at I∆n is generous — modern RCDs typically trip in 10–30 ms, and the 1×IΔn test is usually under 20 ms. A device approaching the limit (250+ ms) is approaching end of life; a reading of 350 ms would fail.",
  },
  {
    id: 5,
    question: "What does a Zs reading of 7.5 Ω on a domestic ring final protected by 32 A B-curve RCBO indicate?",
    options: [
      "PASS — 7.5 Ω is well within the limit for a 32 A B-curve device, because the maximum Zs for a 32 A circuit is 7.28 Ω scaled up by the temperature factor. The circuit is healthy and no action is needed beyond recording the reading.",
      "FAIL — well above the Table 41.3 maximum of 1.37 Ω for B32 at 0.4 s, so the device can't guarantee disconnection in time. Verify the reading, check whether the cause is a high origin Ze or added circuit impedance, make safe by isolating, then investigate and code it C1 or C2 by the actual risk.",
      "PASS — because the circuit is RCD-protected, Zs is irrelevant. The 30 mA RCD clears every earth fault regardless of loop impedance, so a reading of 7.5 Ω has no safety implication and the circuit is fully compliant.",
      "Cannot tell without the Ze reading. A Zs of 7.5 Ω is only a problem if the supply Ze is also high; if Ze is low the circuit passes, so you must measure Ze before deciding whether 7.5 Ω is acceptable on a 32 A circuit.",
    ],
    correctAnswer: 1,
    explanation:
      "7.5 Ω Zs on a 32 A B-curve circuit fails by a factor of about 5 against the 1.37 Ω limit. The device's magnetic element won't trigger on earth fault and the thermal element won't operate within safe time. The action chain: verify the reading; check supply Ze first to see whether the high Zs is a PEN issue at origin or added impedance on the circuit (HRJ, undersized cable); make safe by isolating; investigate and rectify; document as Code 1 if imminently dangerous, Code 2 if compromised but not immediately dangerous.",
  },
  {
    id: 6,
    question: "What's the relationship between pass / fail thresholds in BS 7671 and EICR codes?",
    options: [
      "They are identical and interchangeable — a BS 7671 test result IS the EICR code. A failed Zs is automatically a C1, a borderline pass is automatically a C2, and a clear pass is automatically a C3, with no judgement involved beyond reading the number off the meter.",
      "There is no relationship — EICR codes describe paperwork status, not safety. C1 means the certificate is complete, C2 means it is awaiting signature, C3 means it has been filed; none of them depends on the BS 7671 test results, which sit separately on the schedule.",
      "Direct correlation but not identical. BS 7671 thresholds tell you whether something meets the standard; the EICR code (C1, C2, C3, FI) is the safety judgment on the data plus context. A Zs fail codes C1 or C2 by actual risk, a borderline pass codes C3 — the measurement is the data, the code is the judgment.",
      "EICR codes apply only to visual defects and BS 7671 thresholds only to test readings, so the two never overlap. A failed Zs cannot be coded because it is a measurement, not a visual observation; only things you can see — cracked accessories, missing covers — receive a C1, C2 or C3.",
    ],
    correctAnswer: 2,
    explanation:
      "EICR coding is the experienced electrician's safety judgment overlaid on the test data: C1 (Danger Present — immediate action), C2 (Potentially Dangerous — urgent action), C3 (Improvement Recommended), FI (Further Investigation). A Zs fail gives C1 or C2 depending on the actual safety implication; a borderline pass gives C3. Two installations with the same reading might get different codes depending on context (single domestic vs HMO bedroom; main earth bonded vs not). The L3 apprentice's role is producing the test data accurately; the coding is improver / Approved Electrician territory.",
  },
  {
    id: 7,
    question: "When you find a Code 1 (Danger Present) fault, what's your immediate action sequence?",
    options: [
      "Finish the job you came for first, then mention the C1 to the customer on your way out. The danger has been present for a while without harm, so there is no urgency; note it on the job sheet and leave the customer to arrange a repair in their own time.",
      "Leave it alone because it is outside your call-out scope. You were booked for a different fault, so a C1 you happen to notice is not your responsibility; record that you saw it and let the next contractor deal with it.",
      "Take a photo for the report and re-energise the circuit so the customer is not left without power. Documenting the danger discharges your duty, and keeping the supply on avoids inconveniencing the customer while they decide whether to act.",
      "Make safe immediately by isolating within your competence, label the fault 'OUT OF SERVICE — DO NOT RE-ENERGISE' with date and name, inform the customer in writing via a Dangerous Condition Notification, escalate to your supervisor by phone, and document it all. Make-safe is non-negotiable and needs no customer permission.",
    ],
    correctAnswer: 3,
    explanation:
      "C1 actions are time-critical because the fault could cause harm at any moment. The five steps: (1) make safe — isolate the affected circuit if within competence; (2) label prominently to prevent re-energisation by the customer or another tradesperson; (3) inform the customer in writing with a DCN form describing the hazard, action taken, recommended remedial work and urgency; (4) escalate to supervisor immediately by phone, not email; (5) document everything on the job sheet. The make-safe action is non-negotiable and the customer's permission is not required for emergency safety action.",
  },
  {
    id: 8,
    question: "A test reading is exactly on the limit — pass by 0.01 Ω. Is the circuit safe?",
    options: [
      "Technically pass, practically marginal — the instrument's ±5% / ±0.05 Ω uncertainty puts an on-the-limit reading inside the failure band. Repeat it, verify with a second instrument, compare to the calculated expected, document the marginal pass and recommend follow-up, and discuss C2/C3 coding with the supervisor.",
      "Completely safe — a pass is a pass. Once the reading is on the right side of the limit the margin is irrelevant; record it as compliant and move on, because the instrument is always accurate enough that 0.01 Ω makes no difference.",
      "Unsafe — treat any reading within 0.01 Ω of the limit as an automatic fail. A pass that close cannot be trusted, so isolate the circuit and rectify regardless of what a repeat test shows, because the margin proves a fault is present.",
      "Impossible to say without the temperature. A reading on the limit is only meaningful once corrected to 70 °C, and since you cannot know the exact conductor temperature on site, the result must be discarded and the circuit re-tested in summer.",
    ],
    correctAnswer: 0,
    explanation:
      "Marginal readings are within the instrument's uncertainty band and should be treated as developing faults. The L3 apprentice records the value, notes the marginal status, and triggers further investigation rather than dismissing as 'just pass'.",
  },
];

const faqs = [
  {
    question: "How do I know what the 'expected' reading should be for a circuit I'm testing?",
    answer:
      "Three approaches. (1) CALCULATE — for R1+R2 / Zs, calculate expected from cable type / length / size + supply Ze. The IET On-Site Guide or BS 7671 Appendix 4 give cable mΩ/m values. (2) COMPARE — to other similar circuits in the same installation (a 32 A ring on the same property should give similar R1+R2 readings; large differences are diagnostic). (3) HISTORICAL — to previous EICR / commissioning records if available. The expected value is the reference against which 'unexpected' becomes diagnostically meaningful.",
  },
  {
    question: "What if the customer's circuit is older and the expected values aren't documented?",
    answer:
      "Calculate from the cable type / length you can determine by inspection. If the cable type is rubber (1980s) or VIR (older), the expected R per metre is similar to PVC; the EFLI / Zs limits in BS 7671 are based on conductor properties, not insulation type. The bigger consideration with older cables is whether the cable itself is still safe to use under load — IR test at 500 V will reveal degradation. Combined readings (R1+R2 OK, IR low) often signal 'cable type and length are fine, but the insulation is failing'.",
  },
  {
    question: "Can the MFT be wrong about a borderline reading?",
    answer:
      "Within its measurement uncertainty, yes. Typical MFT uncertainty: EFLI ±5% or ±0.05 Ω (whichever is greater); IR ±5% of reading or ±5 digits; continuity ±2.5%. A borderline reading at the limit could be slightly above or slightly below the true value. The L3 response is to repeat the test (if same reading, more confidence in the value), verify with a second instrument if available, and treat the borderline as developing fault rather than confident pass.",
  },
  {
    question: "What's the right way to discuss a 'pass but worried' reading with a customer?",
    answer:
      "Plain English. 'Your circuit passes the safety standard but the reading is closer to the limit than I'd expect for a healthy installation. It suggests something is starting to degrade — could be moisture in a junction box, a loose terminal somewhere, ageing insulation. I'd recommend further investigation now to find and fix the issue before it gets worse'. Avoid jargon (don't say 'IR is 2 MΩ but should be 100+ MΩ'); explain what it means and what action you suggest. The customer makes the call on whether to authorise further work.",
  },
  {
    question: "Do I need to record every test reading or just the failed ones?",
    answer:
      "Every reading. The recorded readings from the affected circuit are the diagnostic narrative — they show what was tested, what was found, what was rectified, what was retested. Job sheets / certification software (NICEIC Cert Plus, Megger PowerDB, Easycert) prompt for all readings. The recorded baseline allows future comparison (next year's EICR can compare against this year's). The discipline of recording everything is what makes the diagnosis defensible.",
  },
  {
    question: "What if the test result is so unexpected I think the instrument is broken?",
    answer:
      "Apply the three-step instrument check (Sub 2.2): visual / calibration / function. If all three pass, the instrument is probably fine and the reading is real. Repeat the test with the leads in different positions; switch to a backup instrument if available. If the unexpected reading persists across instruments, it's real — investigate as a fault. If it changes between instruments, one of them is suspect — segregate and tag the suspect unit; use the verified instrument for the official reading.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 3"
            title="Analysing test results — pass vs healthy"
            description="Turning raw readings into diagnostic conclusions — BS 7671 Appendix 3 / Table 41.3 thresholds, the difference between pass (meets minimum) and healthy (matches expected), what unsatisfactory results mean, the action chain when readings fall outside expected."
            tone="emerald"
          />

          <TLDR
            points={[
              "PASS = meets BS 7671 minimum. HEALTHY = significantly better than minimum, matches expected for a properly-installed system. Borderline pass readings are developing faults.",
              "Compare measured to (a) BS 7671 Table 41.3 maximum (safety threshold) AND (b) calculated expected (design reference). Unexpected readings within pass are diagnostic.",
              "C1 (Danger Present) found mid-job triggers immediate action: make safe, label, DCN to customer, escalate to supervisor. Customer permission not required for safety action.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Distinguish pass results (meets BS 7671 minimum) from healthy results (matches expected for the installation).",
              "Compare measured readings to BS 7671 Table 41.3 maximum AND to calculated expected from cable / supply data.",
              "Recognise borderline pass readings as developing faults and document them appropriately.",
              "Apply the five-step action chain when a test result is unsatisfactory: verify, identify failure mode, make safe, document, rectify or escalate.",
              "Map BS 7671 test results to EICR codes (C1 / C2 / C3 / FI) — the safety judgment overlaid on the test data.",
              "Handle marginal readings (within instrument uncertainty of the limit) as diagnostic signals rather than confident pass.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Pass vs healthy</ContentEyebrow>

          <ConceptBlock
            title="The L3 step-up — reading the trend, not just the verdict"
            plainEnglish="The MFT gives you a number. The L2 apprentice asks 'pass or fail?'. The L3 apprentice asks 'pass — but is it healthy?'. The difference is the trend: a value close to the BS 7671 minimum is a developing fault even though it 'passes'."
          >
            <p>Pass-vs-healthy on common tests:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>IR (insulation resistance)</strong> — pass: ≥ 1 MΩ. Healthy: 100+ MΩ. A reading of 2 MΩ passes but flags developing degradation.</li>
              <li><strong>Zs (earth fault loop)</strong> — pass: within Table 41.3 maximum. Healthy: matches calculated expected from supply Ze + cable R1+R2. A reading 50% above expected (still within Table 41.3) suggests added impedance.</li>
              <li><strong>RCD trip-time</strong> — pass: within Reg 643.7.3 maximum (300 ms at I∆n for general). Healthy: 10–30 ms. A reading of 250 ms passes but suggests RCD approaching end of life.</li>
              <li><strong>R1+R2 / continuity</strong> — pass: any low reading. Healthy: matches calculated from cable mΩ/m. A reading 50% above expected suggests HRJ.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Table 41.3 (Maximum Zs values)"
            clause={<>"For protective devices listed in Table 41.3, the maximum measured earth fault loop impedance Zs values shown shall not be exceeded. The values are derived from the requirements of Reg 411.3.2 for disconnection times."</>}
            meaning={<>Table 41.3 values are the safety threshold. A measured Zs above the table value means the protective device cannot disconnect within BS 7671 643 time limits. The L3 fault investigator uses this AND the calculated expected value (from cable design) to assess the actual circuit health.</>}
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Table 41.3."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Calculating expected values</ContentEyebrow>

          <ConceptBlock
            title="The diagnostic baseline"
            onSite="The expected value is the reference against which 'unexpected' becomes meaningful. Calculate from cable type / length / size + supply Ze using IET On-Site Guide or BS 7671 Appendix 4 cable mΩ/m values."
          >
            <p>Calculation example for a 32 A B-curve RCBO ring final, 50 m total ring length, 2.5 mm² T+E:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable resistance per conductor: 7.41 mΩ/m at 70 °C (BS 7671 Appendix 4 Table A4.1).</li>
              <li>R1 (line) end-to-end: 50 × 7.41 = 0.371 Ω.</li>
              <li>R2 (CPC) end-to-end: same as R1 (1.5 mm² CPC in 2.5 T+E): 50 × 12.1 = 0.605 Ω.</li>
              <li>R1+R2 per loop: 0.976 Ω end-to-end ÷ 2 (ring divides) = 0.49 Ω.</li>
              <li>Plus supply Ze (TN-C-S typical 0.5 Ω): Zs ≈ 0.49 + 0.5 = 0.99 Ω.</li>
              <li>Table 41.3 maximum for B32 at 0.4 s: 1.37 Ω.</li>
              <li>Healthy reading: 0.99 ± 0.1 Ω. Borderline: 1.0–1.4 Ω. Fail: &gt;1.37 Ω.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>The unsatisfactory-result action chain</ContentEyebrow>

          <ConceptBlock
            title="Five steps when a reading is bad"
            plainEnglish="An unsatisfactory reading is a triggering event. The five-step chain converts it into a safe, documented, defensible outcome."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. VERIFY</strong> — repeat the test; check leads / instrument; verify with second instrument if available.</li>
              <li><strong>2. IDENTIFY FAILURE MODE</strong> — what does the unsatisfactory reading indicate (insulation breakdown, HRJ, polarity, RCD slow trip)?</li>
              <li><strong>3. MAKE SAFE</strong> — isolate affected circuit; label / signage; prevent re-energisation by others.</li>
              <li><strong>4. DOCUMENT</strong> — record reading + verification + action + customer DCN if Code 1; informer customer in writing.</li>
              <li><strong>5. RECTIFY OR ESCALATE</strong> — fix if within competence; escalate to supervisor / specialist if not.</li>
            </ul>
            <p>
              Code 1 (Danger Present) found mid-job is non-negotiable — make safe immediately even if outside the original call-out scope; customer permission is not required for safety action; customer brief on the action follows.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 641.3"
            clause={
              <>
                "The verification shall include comparison of the results with relevant criteria to confirm that the requirements of BS 7671 have been met."
              </>
            }
            meaning={
              <>
                Pass / fail is a comparison of the result against criteria, not against your gut feel. The Regulation makes that comparison the verification step. A 1.8&nbsp;M&Omega; IR result on a 230&nbsp;V circuit passes the 1.0&nbsp;M&Omega; minimum &mdash; but the comparison only tells you that, not whether the circuit is healthy.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 641.3, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 651.4"
            clause={
              <>
                "Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report."
              </>
            }
            meaning={
              <>
                A borderline reading is, by definition, &ldquo;deterioration&rdquo;. Reg 651.4 says it shall be recorded &mdash; not optional, not at the firm&apos;s discretion. That&apos;s the regulation that backs your &ldquo;passes minimum but flag for investigation&rdquo; entry on the job sheet.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 651.4."
          />

          <VideoCard
            url={videos.multimeter.url}
            title={videos.multimeter.title}
            channel={videos.multimeter.channel}
            duration={videos.multimeter.duration}
            topic={videos.multimeter.topic}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Recording 'pass' on a borderline reading without flagging"
            whatHappens={<>Apprentice tests IR on an older domestic circuit; reads 2 MΩ. Records 'PASS' (it\'s above 1 MΩ). Customer\'s certificate shows the circuit as compliant. Six months later the insulation has degraded further to 0.3 MΩ; the circuit fails an EICR; the customer\'s solicitor argues the previous certificate was inaccurate. The 2 MΩ reading was a developing fault that should have been flagged at the time as a Code 3 (Improvement Recommended) finding.</>}
            doInstead={<>Record the reading value AND the assessment. \'IR 2 MΩ — passes minimum but well below expected for modern installation; recommend investigation' is the right entry. The customer can decide whether to authorise further work; the firm has a defensible record of having flagged the developing fault.</>}
          />

          <CommonMistake
            title="Walking away from a Code 1 finding because it\'s outside the call-out scope"
            whatHappens={<>Apprentice is at a property to investigate a tripped breaker. During the work they notice a junction box in the loft with disconnected CPC — Code 1 (Danger Present). They think 'not my job, here for the breaker' and ignore it. Customer\'s child takes a shock from a metal lamp two months later. HSE investigation finds the apprentice\'s job sheet noted the loft inspection; the customer\'s solicitor argues the apprentice had a duty to act on what they saw.</>}
            doInstead={<>Code 1 found mid-job triggers immediate action regardless of original call-out scope. Make safe, DCN to customer, escalate to supervisor, document. The \'not my job' approach is a regulatory minefield. HSE / Building Regs / professional indemnity insurers all expect operatives to act on what they find.</>}
          />

          <Scenario
            title="Borderline IR reading on an old conservatory circuit"
            situation={<>You\'re investigating a different fault on a 25-year-old domestic property. As part of the visit you do a quick IR test on the conservatory\'s lighting circuit — reads 1.8 MΩ. The minimum is 1 MΩ. The customer is asking whether you\'ve found anything else.</>}
            whatToDo={<>(1) Verify — repeat the test; reading stabilises at 1.8 MΩ. Verify with backup instrument if available. (2) Identify failure mode — borderline IR suggests insulation degradation in progress (moisture, contamination, ageing); typical for a 25-year-old conservatory exposed to humidity. (3) Discuss with customer — \'This circuit passes the safety standard but the reading is close to the limit. It suggests something is starting to degrade. Could be water in a junction box, ageing insulation, or contamination. I\'d recommend further investigation now rather than wait for it to fail completely\'. (4) Customer decides — if they authorise further investigation, isolate and dismantle to find the source; if they decline, document the recommendation and the customer\'s choice. (5) Document on job sheet — IR value, recommendation, customer decision. Issue a written advisory if customer declines further work, recording your recommendation.</>}
            whyItMatters={<>Borderline readings are diagnostic signals. The L3 apprentice flags them as developing faults rather than dismissing as pass. The customer makes the commercial decision; the firm has a defensible record of having identified and reported the developing issue. Without the L3 \'pass vs healthy' thinking, the borderline reading becomes invisible until the circuit fails.</>}
          />

          <SectionRule />

          <ContentEyebrow>Insulation resistance — interpreting the number</ContentEyebrow>

          <ConceptBlock
            title="IR readings — what 1 MΩ, 100 MΩ and 999+ MΩ each mean"
            plainEnglish="BS 7671 Reg 643.3.3 sets the IR pass threshold at 1 MΩ at 500 V test for general circuits. But healthy modern wiring should read 100+ MΩ — anything between 1 MΩ and 100 MΩ is degraded but not failed. The L3 apprentice reads the number, not just pass/fail."
            onSite="Megger MFT1741+ displays IR up to 999 MΩ then shows '>999 MΩ' or 'OL'. New PVC insulation typically reads &gt;999 MΩ; 5-10 year old in dry conditions also &gt;999 MΩ; 20+ year old in damp conditions often 50-200 MΩ; circuits with surface contamination or wet joints 5-50 MΩ; failing circuits 1-5 MΩ; failed &lt;1 MΩ."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>&gt;999 MΩ</strong> — healthy. New or well-maintained installation in dry conditions.</li>
              <li><strong>100-999 MΩ</strong> — healthy. Normal range for installation 5-15 years old in normal conditions.</li>
              <li><strong>10-100 MΩ</strong> — degraded but compliant. Investigate cause (moisture, ageing, contamination); document; recommend monitoring.</li>
              <li><strong>1-10 MΩ</strong> — borderline. Compliant but close to limit. Recommend further investigation; flag in customer report.</li>
              <li><strong>0.5-1 MΩ</strong> — fail. Code C2 on EICR. Investigate and rectify.</li>
              <li><strong>&lt;0.5 MΩ</strong> — significant insulation failure. Often direct earth fault or short. Locate and rectify before re-energising.</li>
              <li><strong>Test voltage</strong> — 500 V for circuits ≤500 V nominal; 250 V for SELV/PELV; 1000 V for circuits 500-1000 V (SWA, motor windings).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Continuity / R1+R2 interpretation</ContentEyebrow>

          <ConceptBlock
            title="R1+R2 — comparing measured to expected"
            plainEnglish="R1+R2 is the line + CPC loop resistance from the supply end to the accessory. The expected value depends on conductor size, length and material. Compare measured to expected — significant discrepancy indicates a HRJ somewhere along the route."
            onSite="Use BS 7671 OSG (On-Site Guide) Appendix or BS 7671 Appendix 8 reference tables. For a typical 32 A ring final at 4 mm²/2.5 mm² T+E across 30 m: R1+R2 ≈ 0.45 Ω. Measured &gt;0.7 Ω = +50% above expected = HRJ candidate. Megger MFT1741+ in continuity mode (200 mA, autoranging) reads R1+R2 in seconds with the circuit isolated."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Expected R1+R2</strong> — depends on cable size, length, material. Tables in OSG Appendix.</li>
              <li><strong>Measured = expected</strong> — circuit is healthy.</li>
              <li><strong>Measured significantly higher</strong> — HRJ somewhere on the loop. Halve and retest to localise.</li>
              <li><strong>Measured OPEN</strong> — broken conductor (CPC or line) somewhere on the loop. Walk the run to find break.</li>
              <li><strong>Measured very low (near zero)</strong> — short circuit between line and CPC. Insulation failure; investigate.</li>
              <li><strong>Wander lead method</strong> — Megger WL10 / WL20 wander lead extends the test to long radial circuits. Test from origin with lead at far end.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Zs and protective device coordination</ContentEyebrow>

          <ConceptBlock
            title="Zs vs Table 41.3 / 41.4 — disconnection time confirmation"
            plainEnglish="Zs (earth fault loop impedance at the accessory) determines whether the protective device will operate within the required time. BS 7671 Table 41.3 (MCBs) and 41.4 (RCBOs) give maximum Zs for each device type and rating to achieve the required disconnection time."
            onSite="Standard process: read Zs at the furthest accessory on the circuit using Megger MFT1741+ in loop mode (Hi-Z if RCD-protected). Compare to Table 41.3 / 41.4 limit for the protective device. Adjust for ambient temperature: BS 7671 specifies measured Zs at conductor working temperature; field measurements at lower ambient need correction (standard 0.8 factor for 20°C ambient)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Zs limits — common devices (BS 7671:2018+A4:2026 Table 41.3)</strong> — 6 A B-curve MCB: 7.28 Ω; 16 A B: 2.73 Ω; 32 A B: 1.37 Ω. C-curve approx half of B values. RCBO: same overcurrent values, plus 30 mA RCD function.</li>
              <li><strong>0.4 s vs 5 s disconnection</strong> — final circuits ≤32 A: 0.4 s. Distribution / fixed equipment: 5 s. Lower disconnection time = lower Zs limit = tighter requirement.</li>
              <li><strong>Temperature correction</strong> — standard 0.8 factor (multiply measured Zs by 1.25) to correct field measurement to working temperature.</li>
              <li><strong>Zs above limit</strong> — protective device won't operate within required time. Code C1 on EICR (immediate danger). Investigate and rectify.</li>
              <li><strong>Zs equal to limit</strong> — no margin. Recommend reducing Zs (improve CPC, replace HRJ) or upgrading to lower-Zs protective device (RCBO with 30 mA RCD function).</li>
              <li><strong>Zs well below limit</strong> — healthy. Document; no action.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RCD trip-time — within spec or out?</ContentEyebrow>

          <ConceptBlock
            title="RCD trip-time test — what the MFT reports and what it means"
            plainEnglish="The MFT injects a defined fault current and measures how long the RCD takes to trip. BS EN 61008 / 61009 sets the limits: 30 mA Type AC RCD trips within 300 ms at 1×IΔn (30 mA), within 40 ms at 1×IΔn (150 mA). Out of spec = faulty RCD."
            onSite="Megger MFT1741+ AutoRCD function runs ×½ / ×1 / ×5 / ramp tests in sequence. Each result printed on screen. Pass criteria: ×½ doesn't trip (otherwise over-sensitive); ×1 trips within 300 ms; ×5 trips within 40 ms; ramp trips between 15 mA and 30 mA. Document all four readings on the test certificate."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>×½ trip</strong> — RCD over-sensitive (worn, contaminated, or faulty). Replace.</li>
              <li><strong>×1 trip &gt;300 ms</strong> — RCD slow. May still pass on disconnection time (if Zs is low enough that overcurrent device clears fault first) but RCD is no longer reliable. Replace.</li>
              <li><strong>×5 trip &gt;40 ms</strong> — RCD slow on high fault current. Replace.</li>
              <li><strong>Ramp test &gt;30 mA</strong> — RCD undertested at rated trip current. Won't protect at intended threshold. Replace.</li>
              <li><strong>No trip on test button</strong> — RCD mechanism failed. Replace immediately; do not try to reset by force.</li>
              <li><strong>Type mismatch</strong> — Type AC RCD on circuit feeding LED drivers / EV charger / VSD = wrong type. Upgrade to Type A or Type B as appropriate.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Cross-checking results — the diagnostic confidence loop</ContentEyebrow>

          <ConceptBlock
            title="When tests disagree — what to do"
            plainEnglish="Sometimes tests give contradictory results — IR passes but Zs fails, or thermal camera shows hot spot but continuity is fine. Disagreement is information; resolve it before drawing conclusions."
            onSite="Standard reconciliation steps: (1) verify the disagreement by repeating each test; (2) check instrument calibration and pre-use functional check; (3) check test conditions (ambient temperature, supply voltage, load state); (4) consider whether each test is measuring what you think it is (e.g. an IR test on a circuit with electronic loads connected gives a low reading from the electronics, not from the wiring); (5) if disagreement persists, escalate to supervisor for review."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>IR pass, Zs fail</strong> — insulation is fine but earth fault loop is high. Suggests broken or high-resistance CPC, not insulation.</li>
              <li><strong>IR fail, Zs pass</strong> — insulation degraded but loop is OK. Suggests parallel current path bridging the broken insulation.</li>
              <li><strong>Continuity OK, thermal hot</strong> — circuit conducts but generates heat under load. HRJ or chronic overload; thermal camera localises.</li>
              <li><strong>Live readings vary</strong> — supply quality issue or intermittent load. PQ analyser deployment.</li>
              <li><strong>Result drift over time</strong> — instrument calibration drift OR system condition deteriorating. Re-prove instrument; if instrument OK, system is changing.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "PASS = meets BS 7671 minimum. HEALTHY = matches expected for a properly-installed system. Borderline pass readings are developing faults.",
              "Compare measured to (a) BS 7671 Table 41.3 maximum AND (b) calculated expected from cable + supply data. Unexpected readings within pass are diagnostic.",
              "Calculated expected uses BS 7671 Appendix 4 cable mΩ/m values + topology + supply Ze. The L3 apprentice does this calculation routinely.",
              "EICR codes (C1 / C2 / C3 / FI) are the safety judgment overlaid on test data. Same Zs reading might code differently depending on context.",
              "Action chain on unsatisfactory result: verify, identify failure mode, make safe, document, rectify or escalate.",
              "C1 (Danger Present) mid-job triggers immediate action regardless of call-out scope. Make safe, DCN to customer, supervisor escalation.",
              "Marginal readings (within instrument uncertainty of limit) are diagnostic signals — record value, note marginal, trigger investigation.",
              "Record EVERY reading on the job sheet — borderline values become future EICR baseline; defensible diagnostic narrative.",
            ]}
          />

          <Quiz title="Analysing test results — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4-2')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">4.2 Identifying supply</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section4-4')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">4.4 5-Whys root cause</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
