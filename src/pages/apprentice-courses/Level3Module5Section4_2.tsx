/**
 * Level 3 Module 5 Section 4.2 - Functional Testing of Equipment and Systems
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Functional Testing of Equipment and Systems - Level 3 Module 5 Section 4.2";
const DESCRIPTION = "Master functional testing procedures for electrical equipment including switchgear, controls, interlocks, RCDs and AFDDs according to BS 7671 Regulation 643.10.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "According to BS 7671, what is the primary purpose of functional testing?",
    options: [
      "To check the paint finish on equipment",
      "To verify that assemblies, equipment and accessories are properly mounted, adjusted and function correctly",
      "To measure insulation resistance",
      "To test the electricity meter"
    ],
    correctIndex: 1,
    explanation: "Regulation 643.10 requires functional testing to confirm that switchgear, controls and accessories are properly installed, mounted, adjusted, and work correctly. This ensures equipment will perform as intended in service."
  },
  {
    id: "check-2",
    question: "How should RCD functional testing be performed?",
    options: [
      "Only with a test instrument",
      "First by pressing the test button, then with a calibrated RCD tester",
      "By deliberately creating an earth fault",
      "RCDs don't need functional testing"
    ],
    correctIndex: 1,
    explanation: "GN3 recommends pressing the RCD test button first as a basic functional check to see that it trips. Then use a calibrated RCD tester to measure trip times at rated current. Both checks are important."
  },
  {
    id: "check-3",
    question: "When testing motor rotation during functional testing, what indicates correct installation?",
    options: [
      "The motor runs at any speed",
      "The motor rotates in the correct direction for the driven equipment",
      "The motor makes no noise",
      "The motor runs slowly"
    ],
    correctIndex: 1,
    explanation: "Correct phase sequence results in motors rotating in the intended direction. Incorrect rotation (e.g., pump running backwards) means the driven equipment won't function properly and could be damaged. Check rotation before connecting mechanical loads where possible."
  },
  {
    id: "check-4",
    question: "According to BS 7671, circuit breakers should NOT be used regularly as switches unless what condition is met?",
    options: [
      "They are fitted with shunt trips",
      "The manufacturer confirms they are suitable for this duty",
      "They are MCBs only",
      "They can always be used as switches"
    ],
    correctIndex: 1,
    explanation: "Note (5) to Table 537.4 in BS 7671 states that circuit breakers and RCDs are not suitable for frequent switching duty unless approved by the manufacturer. Regular switching can cause premature wear and failure."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "Which regulation in BS 7671 covers functional testing requirements?",
    options: [
      "Regulation 612.1",
      "Regulation 643.10",
      "Regulation 411.3.3",
      "Regulation 534.2"
    ],
    correctAnswer: 1,
    explanation: "Regulation 643.10 specifically covers functional testing, requiring verification that assemblies such as switchgear, controls, interlocks and similar accessories are properly mounted, adjusted, and function correctly."
  },
  {
    id: 2,
    question: "What should be checked when functionally testing an emergency stop button?",
    options: [
      "Only that it is red",
      "That it stops the relevant equipment and cannot be reset until deliberately released",
      "Only that it makes a click sound",
      "That it is located at the entrance"
    ],
    correctAnswer: 1,
    explanation: "Emergency stops must actually stop the equipment they control and must be 'latching' type - they cannot be reset until deliberately released (twist or pull to release). This prevents accidental restart after an emergency stop."
  },
  {
    id: 3,
    question: "When functionally testing interlocks, what must be verified?",
    options: [
      "Only that the door opens",
      "That the interlock prevents access or operation in unsafe conditions",
      "Only the interlock switch resistance",
      "That the interlock is visible"
    ],
    correctAnswer: 1,
    explanation: "Interlocks are safety devices designed to prevent access to hazardous areas or prevent unsafe operation. Functional testing must prove they actually achieve this - for example, that equipment cannot be started while a guard is open."
  },
  {
    id: 4,
    question: "According to Regulation 514.12.2, how often should the RCD test button be operated?",
    options: [
      "Never",
      "Monthly",
      "Quarterly (recommended)",
      "Only during periodic inspection"
    ],
    correctAnswer: 2,
    explanation: "Regulation 514.12.2 recommends the RCD test button should be pressed quarterly, with notices provided advising users. This functional test confirms the RCD mechanism is working but does not verify trip times - that requires instrument testing."
  },
  {
    id: 5,
    question: "When testing adjustable overcurrent devices, what should be verified?",
    options: [
      "Only that they are adjustable",
      "That settings match the designer's specification",
      "Only the maximum setting",
      "That they are set to minimum"
    ],
    correctAnswer: 1,
    explanation: "GN3 requires checking that settings on adjustable relays and controls align with the designer's requirements. Incorrect settings could result in nuisance tripping or inadequate protection."
  },
  {
    id: 6,
    question: "How should AFDDs (Arc Fault Detection Devices) be functionally tested?",
    options: [
      "They cannot be tested",
      "By pressing the test button if fitted, or automatic test if manufacturer provides this",
      "By creating an arc fault",
      "Only by the manufacturer"
    ],
    correctAnswer: 1,
    explanation: "GN3 notes that AFDDs come in two types: those with a test button (like RCDs) which should be pressed during functional testing, and those with automatic test facilities. AFDDs without test buttons cannot be functionally tested on site."
  },
  {
    id: 7,
    question: "What functional test should be performed on a time delay relay?",
    options: [
      "Only check it is connected",
      "Verify it operates within its specified time parameters",
      "Check it is the correct colour",
      "Time delays don't need testing"
    ],
    correctAnswer: 1,
    explanation: "Time delay relays should be tested to confirm they operate within their specified timing. This is important for applications like motor sequencing, heating controls, and safety interlocking systems."
  },
  {
    id: 8,
    question: "When testing two-way and intermediate switching circuits, what must be verified?",
    options: [
      "Only that one switch works",
      "That all switch positions correctly control the lighting",
      "Only the switch colour",
      "That switches are level"
    ],
    correctAnswer: 1,
    explanation: "Functional testing of multi-way switching must verify all switch combinations work correctly. Test with each switch in each position to confirm proper operation from all locations."
  },
  {
    id: 9,
    question: "What should be checked when functionally testing a thermostat?",
    options: [
      "Only that it is connected",
      "That it switches at the intended temperature and has appropriate hysteresis",
      "Only the wire connections",
      "Thermostats don't need functional testing"
    ],
    correctAnswer: 1,
    explanation: "Thermostats should be tested to verify they switch at the correct temperature. The hysteresis (on-off differential) should also be appropriate for the application to prevent rapid cycling."
  },
  {
    id: 10,
    question: "What functional test is required for a voltage-operated earth leakage relay?",
    options: [
      "No testing required",
      "Verify it trips when voltage exceeds the preset threshold",
      "Only check the LED indicator",
      "Only test the reset button"
    ],
    correctAnswer: 1,
    explanation: "Voltage-operated earth leakage relays should be tested to verify they operate at the correct voltage threshold. Most have test facilities to inject a test signal without creating an actual fault."
  },
  {
    id: 11,
    question: "When should functional testing of controls be performed?",
    options: [
      "Only at periodic inspection",
      "After energisation but before handover to the client",
      "Only when faults are reported",
      "Before any electrical testing"
    ],
    correctAnswer: 1,
    explanation: "Functional testing should be performed after energisation and completion of electrical tests, but before handover. This confirms everything works correctly before the client takes responsibility for the installation."
  },
  {
    id: 12,
    question: "What documentation should record functional testing outcomes?",
    options: [
      "No documentation required",
      "Schedule of test results and any commissioning records required",
      "Only verbal report to client",
      "Only warranty card"
    ],
    correctAnswer: 1,
    explanation: "Functional testing outcomes should be recorded on appropriate documentation including the schedule of test results (for items like RCDs) and commissioning records for complex systems. This provides evidence that testing was completed."
  }
];

const faqs = [
  {
    question: "What's the difference between functional testing and electrical testing?",
    answer: "Electrical testing (dead and live tests) verifies the electrical integrity - continuity, insulation, earth fault loop impedance, etc. Functional testing verifies that equipment actually works as intended - switches switch, controls control, interlocks interlock. Both are required for complete verification."
  },
  {
    question: "Do I need to functionally test every socket outlet?",
    answer: "Socket outlets should be verified as part of electrical testing (polarity, earth loop impedance). Functional testing of socket shutters or USB charging ports may be appropriate. Focus functional testing on controls, protective devices, and equipment with adjustable or automated functions."
  },
  {
    question: "How do I test an interlock I cannot access?",
    answer: "Interlocks should be tested from normal access positions. If testing requires special access or tools, this may indicate a design issue. For safety-critical interlocks, consult the designer or manufacturer for test procedures. Document any limitations."
  },
  {
    question: "What if a control function doesn't work as specified?",
    answer: "Do not hand over until resolved. Investigate whether it's a wiring issue, programming error, or equipment fault. For complex control systems, involve the control system designer. Record the issue and its resolution in commissioning documentation."
  },
  {
    question: "Should functional testing include testing under fault conditions?",
    answer: "For safety systems like interlocks and emergency stops, yes - verify they prevent operation in fault conditions. However, do not create dangerous conditions for testing. Use safe simulation methods or manufacturer test facilities where provided."
  },
  {
    question: "How do I document functional testing for complex systems?",
    answer: "For complex systems (BMS, fire alarm, access control), use manufacturer commissioning sheets or create a systematic checklist covering each function. Include test date, tester name, result, and any adjustments made. Provide records to the client."
  }
];

const Level3Module5Section4_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Article Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Functional Testing of Equipment and Systems
          </h1>
          <p className="text-white/80">
            Verifying that controls, interlocks and equipment operate correctly
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Verify equipment works as intended</li>
              <li><strong>Scope:</strong> Switchgear, controls, interlocks, RCDs</li>
              <li><strong>RCDs:</strong> Test button first, then instrument test</li>
              <li><strong>Settings:</strong> Must match designer's specification</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Controls, switches, interlocks, protective devices</li>
              <li><strong>Use:</strong> Operate each control and verify correct response</li>
              <li><strong>Apply:</strong> Document all tests before handover</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand functional testing requirements under BS 7671",
              "Perform functional tests on protective devices and controls",
              "Test interlocks and safety systems correctly",
              "Verify control settings match specifications",
              "Document functional testing appropriately",
              "Identify common functional testing issues"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Principles of Functional Testing */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Principles of Functional Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Functional testing verifies that equipment actually works as intended - not just that it is electrically sound. While electrical tests confirm safety (insulation, earthing, etc.), functional tests confirm that controls control, switches switch, and protective devices protect. Both are essential for a complete verification.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Items requiring functional testing (Reg 643.10):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Switchgear:</strong> Main switches, isolators, changeover switches</li>
                <li><strong>Controls:</strong> Thermostats, timers, sensors, relays</li>
                <li><strong>Interlocks:</strong> Door switches, safety guards, key interlocks</li>
                <li><strong>Protective devices:</strong> RCDs (test button), AFDDs (if test button fitted)</li>
                <li><strong>Accessories:</strong> Dimmers, PIR sensors, photocells</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Properly Mounted</p>
                <p className="text-white/90 text-xs">Secure, level, accessible</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Correctly Adjusted</p>
                <p className="text-white/90 text-xs">Settings match specification</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Functions Correctly</p>
                <p className="text-white/90 text-xs">Performs intended operation</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> An installation can pass all electrical tests but still be non-functional. Functional testing catches issues like reversed controls, incorrect settings, or failed mechanisms.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02: Testing Protective Devices */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Testing Protective Devices
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Protective devices including RCDs, AFDDs, and other automatic disconnection devices require functional testing to verify they will operate when called upon. This is separate from (but complementary to) the electrical tests that measure trip times and currents.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Functional Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>1. Press integral test button</li>
                  <li>2. RCD should trip immediately</li>
                  <li>3. Reset and verify re-closes</li>
                  <li>4. Then perform instrument test</li>
                  <li>5. Record trip times on schedule</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">AFDD Functional Testing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>If test button fitted - press and verify trip</li>
                  <li>If automatic test - check indicator shows pass</li>
                  <li>If no test facility - cannot functionally test</li>
                  <li>Note type in commissioning records</li>
                  <li>Follow manufacturer instructions</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why both button test AND instrument test?</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Button test:</strong> Confirms mechanism works (mechanical function)</li>
                <li><strong>Instrument test:</strong> Confirms sensitivity and timing (electrical function)</li>
                <li><strong>Both needed:</strong> Button could work but sensitivity be wrong, or vice versa</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>User advice:</strong> Regulation 514.12.2 requires a notice advising users to test RCDs periodically (typically quarterly). This ongoing functional test by the user helps ensure continued safe operation between inspections.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03: Testing Controls and Interlocks */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Testing Controls and Interlocks
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Controls and interlocks are critical for both operational functionality and safety. Functional testing must verify that each control achieves its intended purpose - whether that's maintaining temperature, sequencing operations, or preventing access to hazardous areas.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Control testing requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Thermostats:</strong> Verify switching at correct temperature, check differential</li>
                <li><strong>Time switches:</strong> Program and verify correct on/off times</li>
                <li><strong>PIR sensors:</strong> Check detection range, sensitivity, timing</li>
                <li><strong>Photocells:</strong> Verify switching at appropriate light levels</li>
                <li><strong>Pressure/flow switches:</strong> Verify operation at setpoint</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Safety Interlock Tests</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Door interlocks - equipment stops when opened</li>
                  <li>Guard interlocks - machine cannot start</li>
                  <li>Key interlocks - correct sequence enforced</li>
                  <li>Emergency stops - immediate shutdown</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Common Failures</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Interlock bypassed or defeated</li>
                  <li>Emergency stop doesn't latch</li>
                  <li>Control adjusted beyond safe range</li>
                  <li>Time delay incorrectly set</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Safety critical:</strong> Never leave safety interlocks untested. A guard interlock that doesn't work could result in serious injury. Test thoroughly and document the results.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04: Motor and Drive Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Motor and Drive Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Motors and variable speed drives require specific functional testing to verify correct operation. Rotation direction, speed control, and protective functions must all be verified before putting equipment into service.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Motor functional tests:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rotation direction:</strong> Check phase rotation before connecting load where possible</li>
                <li><strong>Starting current:</strong> Verify within acceptable limits</li>
                <li><strong>Running current:</strong> Should match nameplate or be lower</li>
                <li><strong>Vibration/noise:</strong> Abnormal indicates bearing or alignment issues</li>
                <li><strong>Overload protection:</strong> Verify settings match motor FLC</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">DOL Starters</p>
                <p className="text-white/90 text-xs">Check overload trip setting matches motor</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Star-Delta</p>
                <p className="text-white/90 text-xs">Verify changeover timing correct</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">VSDs</p>
                <p className="text-white/90 text-xs">Check ramp times, limits, protections</p>
              </div>
            </div>

            <p>
              For three-phase motors, incorrect phase sequence results in reverse rotation. This can damage pumps (running dry due to wrong flow direction), fans (wrong air movement), and other rotating equipment. Always check rotation before coupling to mechanical loads.
            </p>

            <p className="text-sm text-white/90 italic">
              <strong>Tip:</strong> Phase rotation testers provide a quick way to confirm correct ABC sequence before starting motors. Much safer than briefly energising to check rotation direction.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Systematic Approach</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Work through each control and device methodically</li>
                <li>Use a checklist to ensure nothing is missed</li>
                <li>Test all modes of operation (auto, manual, override)</li>
                <li>Verify settings match design documentation</li>
                <li>Record results as you go</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Complex Systems</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Obtain manufacturer's commissioning procedures</li>
                <li>Work with controls specialist if required</li>
                <li>Test sequences and interactions between devices</li>
                <li>Verify fail-safe behaviour where applicable</li>
                <li>Complete and retain commissioning records</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Skipping interlocks:</strong> Safety systems must always be tested</li>
                <li><strong>Assuming settings are correct:</strong> Always verify against specification</li>
                <li><strong>Testing in isolation:</strong> Check system interactions</li>
                <li><strong>No documentation:</strong> Functional test evidence required</li>
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
                <p className="font-medium text-white mb-1">Key Regulation References</p>
                <ul className="space-y-0.5">
                  <li>643.10 - Functional testing requirement</li>
                  <li>514.12.2 - RCD test notice requirement</li>
                  <li>Table 537.4 Note (5) - Switching duty</li>
                  <li>GN3 Section 2.6.19 - Other functional testing</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Essential Checks</p>
                <ul className="space-y-0.5">
                  <li>RCDs - button test + instrument test</li>
                  <li>AFDDs - button test if fitted</li>
                  <li>Interlocks - prevent unsafe operation</li>
                  <li>Emergency stops - latch and stop</li>
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
            <Link to="../level3-module5-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 4
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module5-section4-4-3">
              Next: Confirming Compliance
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module5Section4_2;
