/**
 * Level 3 Module 4 Section 5.4 - Re-testing and Certification
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Re-testing and Certification - Level 3 Module 4 Section 5.4";
const DESCRIPTION = "Master post-repair testing procedures, understand certification requirements for remedial work, and learn the correct sequence for verifying repairs meet BS 7671 standards.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the primary purpose of re-testing after a repair?",
    options: [
      "To justify the bill to the customer",
      "To verify the repair is safe and complies with BS 7671",
      "To demonstrate skill to the customer",
      "It's optional if the repair looks correct"
    ],
    correctIndex: 1,
    explanation: "Re-testing confirms that the repair work is safe and meets BS 7671 requirements. Visual inspection alone cannot confirm electrical safety - testing provides objective evidence that continuity, insulation, and protection are all functioning correctly."
  },
  {
    id: "check-2",
    question: "Which tests must be performed with the circuit isolated (dead tests)?",
    options: [
      "RCD operation and earth fault loop impedance",
      "Continuity of protective conductors and insulation resistance",
      "Voltage and current measurements",
      "Functional tests of equipment"
    ],
    correctIndex: 1,
    explanation: "Continuity and insulation resistance are dead tests - they must be performed with the circuit isolated and proved dead. These tests are done first because they can identify faults that would be dangerous if the circuit were energised."
  },
  {
    id: "check-3",
    question: "After replacing an RCD, what testing is required?",
    options: [
      "Only press the test button",
      "Test at rated residual current and verify trip time is within limits",
      "No testing - RCDs are factory tested",
      "Only check it doesn't trip during normal use"
    ],
    correctIndex: 1,
    explanation: "RCDs must be tested using a calibrated RCD tester at the rated residual current to verify trip times are within BS 7671 limits. The integral test button only confirms the mechanism works - it doesn't verify the device meets its rated performance."
  },
  {
    id: "check-4",
    question: "When must a new Electrical Installation Certificate be issued rather than Minor Works?",
    options: [
      "Whenever the customer requests it",
      "When the work involves new circuit design or significant alterations",
      "For all repairs regardless of scope",
      "Only for commercial installations"
    ],
    correctIndex: 1,
    explanation: "An EIC is required when work involves design decisions - new circuits, consumer unit replacements, or significant alterations requiring design calculation. Minor Works is for repairs and additions to existing circuits that don't involve new design."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the correct sequence for testing after a cable replacement?",
    options: [
      "Live tests first, then dead tests",
      "Dead tests (continuity, IR, polarity), then live tests (Zs, RCD)",
      "Only insulation resistance is needed",
      "Start with RCD testing"
    ],
    correctAnswer: 1,
    explanation: "Dead tests must always come first: continuity of protective conductors, insulation resistance, and polarity. Only after these confirm no dangerous conditions exist should the circuit be energised for live tests (Zs, RCD operation, functional tests)."
  },
  {
    id: 2,
    question: "What is the minimum insulation resistance required for a repaired circuit at 230V?",
    options: [
      "0.5 megohms",
      "1.0 megohm",
      "2.0 megohms",
      "Any value greater than zero"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 61 requires minimum 1.0 megohm insulation resistance for circuits up to 500V when tested at 500V DC. Values below this indicate insulation problems requiring investigation before the circuit can be energised."
  },
  {
    id: 3,
    question: "After repairing a ring final circuit, which specific test confirms the ring is complete?",
    options: [
      "Insulation resistance between L and N",
      "Earth fault loop impedance at any socket",
      "Ring continuity using the r1, rn, r2 method",
      "RCD trip time at 30mA"
    ],
    correctAnswer: 2,
    explanation: "The ring continuity test using r1, rn, r2 method specifically verifies the ring is complete. Each conductor (line, neutral, CPC) is cross-connected and measured; readings at the midpoint should equal approximately half the total conductor resistance."
  },
  {
    id: 4,
    question: "What must be recorded when documenting RCD test results?",
    options: [
      "Just 'passed' or 'failed'",
      "Trip time in milliseconds at the test current used",
      "The manufacturer's name only",
      "The colour of the RCD"
    ],
    correctAnswer: 1,
    explanation: "Record the actual trip time in milliseconds and the test current used. For example: '30mA RCD, trip time 18ms at 30mA'. This proves the device meets BS 7671 requirements (max 300ms at rated current, max 40ms at 5x rated current)."
  },
  {
    id: 5,
    question: "When testing earth fault loop impedance after a repair, what does the result confirm?",
    options: [
      "The cable is the correct colour",
      "The protective device will disconnect within the required time during an earth fault",
      "The installation looks professional",
      "The customer will be satisfied"
    ],
    correctAnswer: 1,
    explanation: "Earth fault loop impedance (Zs) determines fault current during an earth fault. This confirms whether the protective device will disconnect within the required time (0.4s for socket circuits, 5s for fixed equipment) to prevent electric shock."
  },
  {
    id: 6,
    question: "If insulation resistance tests fail after a repair, what should you do?",
    options: [
      "Energise anyway and monitor",
      "Investigate the cause, rectify, and re-test before energising",
      "Issue the certificate with a note about the failure",
      "Tell the customer it's probably fine"
    ],
    correctAnswer: 1,
    explanation: "Failed insulation resistance indicates a potential shock or fire hazard. The circuit must not be energised until the cause is found and fixed. Investigate systematically, repair the issue, and re-test to confirm acceptable values before energisation."
  },
  {
    id: 7,
    question: "What is the maximum earth fault loop impedance for a 32A Type B MCB on a socket circuit?",
    options: [
      "Any value is acceptable",
      "The value from BS 7671 Table 41.3 (typically 1.37 ohms for 32A Type B)",
      "10 ohms",
      "It depends on cable length only"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 Table 41.3 gives maximum Zs values. For a 32A Type B MCB, the maximum Zs is 1.37 ohms at 0.4s disconnection time. Your measured value must not exceed this (consider using 80% rule for temperature: 1.10 ohms max measured)."
  },
  {
    id: 8,
    question: "What is the purpose of polarity testing after a repair?",
    options: [
      "To check the cable colour",
      "To confirm line, neutral, and earth are connected correctly throughout",
      "To test the MCB",
      "It's only needed for three-phase circuits"
    ],
    correctAnswer: 1,
    explanation: "Polarity testing confirms correct connection of line, neutral, and earth conductors. Reversed polarity can leave equipment live when switched off, or cause RCDs to malfunction. It's essential after any work involving disconnection and reconnection."
  },
  {
    id: 9,
    question: "When should functional testing be performed after a repair?",
    options: [
      "Before any other tests",
      "After dead tests and initial live tests confirm the circuit is safe",
      "Functional testing is not required",
      "Only if the customer asks"
    ],
    correctAnswer: 1,
    explanation: "Functional testing (verifying equipment operates correctly) comes last. Dead tests and live tests must first confirm the circuit is safe. Then verify that equipment works as intended - lights illuminate, sockets accept plugs, switches operate correctly."
  },
  {
    id: 10,
    question: "If you repair work done by someone else, what testing is required?",
    options: [
      "No testing - you're only repairing their work",
      "Full testing of the circuit you've worked on to confirm safe operation",
      "Just visual inspection",
      "Only test what the other person tested"
    ],
    correctAnswer: 1,
    explanation: "You're responsible for confirming the circuit is safe after your work, regardless of who did the original installation. Perform appropriate tests for the work you've done. You cannot certify someone else's work, but you must verify your repair is safe."
  },
  {
    id: 11,
    question: "What certification is required for replacing a consumer unit?",
    options: [
      "Minor Electrical Installation Works Certificate",
      "Electrical Installation Certificate (EIC)",
      "No certification is required",
      "Only an invoice"
    ],
    correctAnswer: 1,
    explanation: "Consumer unit replacement requires an EIC because it involves design decisions - selecting protective device ratings, ensuring breaking capacity, determining correct RCD protection. It's also notifiable work under Part P requiring building control notification or competent person registration."
  },
  {
    id: 12,
    question: "How should you verify a test instrument is functioning correctly?",
    options: [
      "Trust the calibration sticker",
      "Prove it before and after use with known test circuits or proving units",
      "It's not necessary if the instrument looks new",
      "Only check at the start of each day"
    ],
    correctAnswer: 1,
    explanation: "Test instruments must be proven before and after use - GS38 recommends using a known live source or proving unit. This confirms the instrument is working correctly and hasn't failed during use. Calibration only confirms accuracy at the calibration date."
  }
];

const faqs = [
  {
    question: "Do I need to test the entire installation after a repair?",
    answer: "No - test the circuit(s) you've worked on and anything that could have been affected by your work. For example, if you've repaired one socket on a ring, test continuity to confirm the ring is complete, insulation resistance, polarity at the repaired socket, and Zs. You don't need to test unrelated circuits."
  },
  {
    question: "Can I use test results from before the repair?",
    answer: "Only as reference for comparison. You must perform fresh tests after the repair to confirm your work hasn't introduced any faults. Pre-repair values help identify changes, but post-repair testing is essential to verify the circuit is now safe."
  },
  {
    question: "What if my RCD tester shows a different trip time to the RCD's test button?",
    answer: "Trust your calibrated RCD tester. The integral test button only confirms the mechanism operates - it doesn't test at precise current levels or measure trip times. Your tester provides accurate data for certification. However, if results seem unusual, re-test and check your tester is working correctly."
  },
  {
    question: "How do I test if the supply is from a TT system with no Ze reference?",
    answer: "For TT systems, measure earth electrode resistance (Ra) separately and calculate Zs as Ra plus R2. Use an earth electrode tester for Ra measurement. The total Zs must allow the RCD to trip within required times - typically less important than for TN systems since RCDs provide the primary protection."
  },
  {
    question: "What if test results are borderline - just within limits?",
    answer: "Consider the 80% rule for Zs (your measured value should be less than 80% of the BS 7671 maximum to allow for temperature increase). For IR, values significantly above minimum but lower than expected warrant investigation. Document your findings and consider recommending monitoring or further investigation."
  },
  {
    question: "Can I issue a certificate if some tests couldn't be completed?",
    answer: "You can issue a certificate noting the limitation and reason. For example, if you couldn't access to test Ze, note this. However, you must complete enough testing to reasonably confirm the safety of your work. Don't use limitations as an excuse to skip essential tests."
  }
];

const Level3Module4Section5_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Dead tests first:</strong> Continuity, IR, polarity before energising</li>
              <li><strong>Live tests:</strong> Zs, RCD, functional - after safe energisation</li>
              <li><strong>Document:</strong> Record actual values on appropriate certificate</li>
              <li><strong>Verify:</strong> Confirm repair meets BS 7671 before returning to service</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Test Sequence</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>1. Visual inspection</strong></li>
              <li><strong>2. Continuity</strong> (protective conductors)</li>
              <li><strong>3. Insulation resistance</strong> (minimum 1 megohm)</li>
              <li><strong>4. Polarity</strong> (correct connections)</li>
              <li><strong>5. Zs and RCD</strong> (after energisation)</li>
            </ul>
          </div>
        </div>

        

        

        {/* Section 01: The Testing Sequence */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Testing Sequence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Post-repair testing follows a specific sequence designed to identify faults safely before the circuit is energised. This sequence is not arbitrary - each test builds on the results of previous tests, and performing them out of order could be dangerous.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The prescribed testing sequence:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>1. Visual inspection:</strong> Check work is complete, connections secure, no visible damage</li>
                <li><strong>2. Continuity of protective conductors:</strong> Verify earth path is complete</li>
                <li><strong>3. Continuity of ring final circuits:</strong> If applicable, verify ring is complete</li>
                <li><strong>4. Insulation resistance:</strong> Confirm no shorts or earth faults exist</li>
                <li><strong>5. Polarity:</strong> Verify correct connection of L, N, and E</li>
                <li><strong>6. Safe to energise:</strong> Only proceed if all dead tests pass</li>
                <li><strong>7. Earth fault loop impedance:</strong> Verify disconnection times</li>
                <li><strong>8. RCD operation:</strong> Test trip times at rated current</li>
                <li><strong>9. Functional tests:</strong> Verify equipment operates correctly</li>
              </ul>
            </div>

            <p>
              The reason for this sequence is safety. Continuity testing confirms the earth path exists. Insulation resistance confirms there are no faults between conductors. Only when these confirm the circuit is safe should it be energised for live tests. Energising a circuit with an earth fault could cause shock or fire.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> Never skip dead tests. A circuit that appears correct visually may have internal damage or incorrect connections that only testing will reveal. Dead tests protect you and the customer from energising a dangerous circuit.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Dead Tests Explained */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Dead Tests Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Dead tests are performed with the circuit isolated and proved dead. They detect conditions that would be dangerous if the circuit were energised, making them essential safety checks before any live testing.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Continuity Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Verifies protective conductor is continuous</li>
                  <li>Use low-resistance ohmmeter (typically 200mA test current)</li>
                  <li>Values should be consistent with cable length and size</li>
                  <li>High readings indicate poor connections or damage</li>
                  <li>For rings, use r1, rn, r2 method to verify completeness</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Resistance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Detects faults between live conductors and earth</li>
                  <li>Test at 500V DC for LV circuits</li>
                  <li>Minimum 1.0 megohm for circuits up to 500V</li>
                  <li>Disconnect sensitive equipment before testing</li>
                  <li>Test L-N, L-E, and N-E combinations</li>
                </ul>
              </div>
            </div>

            <p>
              For continuity, you're confirming the protective conductor provides a low-resistance path back to the main earthing terminal. Calculate expected resistance based on cable size and length - for example, 2.5mm² copper has approximately 7.41 milliohms per metre.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> A 15-metre circuit using 2.5mm² cable with 1.5mm² CPC. Expected R1+R2 = 15m x (7.41 + 12.10) milli-ohms/m = 0.29 ohms. If you measure significantly higher, investigate connections.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Live Tests and RCD Verification */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Live Tests and RCD Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Live tests are performed after dead tests confirm the circuit is safe to energise. These tests verify that protection will operate correctly under fault conditions and that the installation functions as intended.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Earth fault loop impedance (Zs):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Measures total impedance of the earth fault loop</li>
                <li>Determines fault current that will flow during an earth fault</li>
                <li>Must not exceed maximum values in BS 7671 Table 41.3</li>
                <li>Apply 80% rule: measured value should be less than 80% of maximum</li>
                <li>Higher impedance = lower fault current = slower disconnection</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">32A Type B MCB</p>
                <p className="text-white/90 text-xs">Max Zs: 1.37 ohms (80% = 1.10 ohms measured)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">20A Type B MCB</p>
                <p className="text-white/90 text-xs">Max Zs: 2.19 ohms (80% = 1.75 ohms measured)</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">6A Type B MCB</p>
                <p className="text-white/90 text-xs">Max Zs: 7.28 ohms (80% = 5.82 ohms measured)</p>
              </div>
            </div>

            <p>
              RCD testing verifies the device will trip within required times. Test at rated residual current (typically 30mA) and confirm trip time is within 300ms. For additional discrimination testing, test at 0.5x and 5x rated current as well.
            </p>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The integral RCD test button only confirms the mechanism works - it doesn't verify trip times or current sensitivity. Always use a calibrated RCD tester for verification testing.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Certification Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Certification Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every repair requires appropriate certification to document what was done and confirm compliance with BS 7671. The type of certificate depends on the scope of work - selecting the wrong certificate fails to properly document the work.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Minor Works Certificate Required</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Repair to existing circuit</li>
                  <li>Like-for-like replacement (socket, switch)</li>
                  <li>Adding socket or light to existing circuit</li>
                  <li>Re-termination of existing cables</li>
                  <li>Replacement of single protective device</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EIC Required (Full Certificate)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>New circuit installation</li>
                  <li>Consumer unit replacement</li>
                  <li>Significant alteration to existing circuit</li>
                  <li>Work requiring design calculations</li>
                  <li>New installation or rewire</li>
                </ul>
              </div>
            </div>

            <p>
              Certification must include all relevant test results with actual measured values. The person signing the certificate is declaring the work complies with BS 7671 - this is a significant legal declaration. Never sign a certificate for work you haven't personally verified or supervised.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Example:</strong> Replacing a faulty MCB in a consumer unit requires Minor Works certification. However, replacing the entire consumer unit requires an EIC because it involves design decisions about protective device selection, breaking capacity, and RCD arrangement.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Section 05: Handling Failed Tests */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Handling Failed Tests
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              When tests fail or produce unexpected results, you must investigate and resolve the issue before certifying the work. Failed tests indicate potential safety hazards that must be addressed - never ignore or work around failed test results.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Insulation Resistance Failure</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Do not energise the circuit</li>
                  <li>Isolate sections to locate the fault</li>
                  <li>Check for moisture, damage, or equipment faults</li>
                  <li>Disconnect equipment and re-test cable alone</li>
                  <li>Repair cause and re-test before energisation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Zs Exceeds Maximum</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Check all connections in the circuit</li>
                  <li>Verify correct CPC is connected throughout</li>
                  <li>Consider cable length and cross-section</li>
                  <li>Check main earthing and bonding connections</li>
                  <li>If Zs cannot be reduced, RCD protection may be solution</li>
                </ul>
              </div>
            </div>

            <p>
              Systematic fault-finding is essential. Start at the point of failure and work back towards the origin. Check connections, look for damage, verify correct cables are connected. Most test failures are caused by poor connections or incorrect wiring.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Prove your test instruments using a known source or proving unit</li>
                <li>Ensure circuit is properly isolated for dead tests</li>
                <li>Warn others that testing is in progress</li>
                <li>Have documentation ready to record results</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Follow the correct sequence - dead tests before live tests</li>
                <li>Record actual values, not just pass/fail</li>
                <li>If results are unexpected, investigate before proceeding</li>
                <li>Re-prove instruments after testing is complete</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Testing Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping tests:</strong> All relevant tests must be completed</li>
                <li><strong>Wrong sequence:</strong> Dead tests must come before live tests</li>
                <li><strong>Ignoring failures:</strong> Investigate and fix, don't work around</li>
                <li><strong>Not proving instruments:</strong> Instruments must be proven before and after</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* Quick Reference */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Minimum Values</p>
                <ul className="space-y-0.5">
                  <li>Insulation resistance: 1.0 megohm minimum</li>
                  <li>RCD trip: 300ms max at rated current</li>
                  <li>RCD trip: 40ms max at 5x rated current</li>
                  <li>Zs: Per BS 7671 Table 41.3 (use 80%)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Certificate Selection</p>
                <ul className="space-y-0.5">
                  <li>Repair to existing circuit = Minor Works</li>
                  <li>New circuit = EIC</li>
                  <li>CU replacement = EIC</li>
                  <li>Like-for-like replacement = Minor Works</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section5-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Recording Remedial Works
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module4-section5-5">
              Next: Preventative Maintenance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module4Section5_4;
