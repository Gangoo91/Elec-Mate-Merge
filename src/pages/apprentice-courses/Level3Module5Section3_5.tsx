/**
 * Level 3 Module 5 Section 3.5 - RCD and RCBO Testing
 * Following Level3ContentTemplate.tsx design pattern
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "RCD and RCBO Testing - Level 3 Module 5 Section 3.5";
const DESCRIPTION = "Learn the procedures for testing residual current devices (RCDs) and RCBOs to verify correct operation and compliance with BS 7671 requirements.";

const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the maximum disconnection time for a 30mA general-purpose RCD when tested at rated residual current?",
    options: ["40ms", "150ms", "200ms", "300ms"],
    correctIndex: 3,
    explanation: "When tested at rated residual current (30mA), a general-purpose Type AC, A, or F RCD must disconnect within 300ms per BS EN 61008/61009."
  },
  {
    id: "check-2",
    question: "At what test current must a 30mA RCD providing additional protection disconnect within 40ms?",
    options: ["15mA (half rated)", "30mA (1x rated)", "150mA (5x rated)", "300mA (10x rated)"],
    correctIndex: 2,
    explanation: "RCDs rated 30mA or less must disconnect within 40ms when tested at 5x rated current (150mA for a 30mA device) for additional protection."
  },
  {
    id: "check-3",
    question: "What does the no-trip test at 50% rated current verify?",
    options: ["That the RCD trips at the correct current", "That the RCD does not trip under normal leakage", "The disconnection time", "The earth fault loop impedance"],
    correctIndex: 1,
    explanation: "The no-trip test at 50% of rated current verifies that the device does not trip under normal standing leakage currents."
  },
  {
    id: "check-4",
    question: "Why should RCD tests be performed on both positive and negative half-cycles?",
    options: ["To check for polarity errors", "To verify operation regardless of fault current direction", "To test the MCB function", "To check insulation resistance"],
    correctIndex: 1,
    explanation: "Testing on both half-cycles ensures the RCD operates correctly regardless of the direction of the fault current. The worst-case result is recorded."
  }
];

const quizQuestions = [
  { id: 1, question: "According to BS 7671, which regulation covers the requirements for RCD testing?", options: ["Regulation 612.6", "Regulation 612.13", "Regulation 612.3", "Regulation 643.1"], correctAnswer: 1, explanation: "Regulation 612.13 covers testing of residual current devices and residual current monitors." },
  { id: 2, question: "What is the primary purpose of testing an RCD at 5x rated current?", options: ["To verify the device does not trip too easily", "To verify rapid disconnection for additional protection", "To test overload protection", "To check breaking capacity"], correctAnswer: 1, explanation: "Testing at 5x rated current verifies rapid disconnection within 40ms for additional protection against electric shock." },
  { id: 3, question: "A Type A RCD is designed to detect:", options: ["Sinusoidal AC fault currents only", "Sinusoidal AC and pulsating DC fault currents", "Smooth DC fault currents only", "All types including smooth DC"], correctAnswer: 1, explanation: "Type A RCDs detect sinusoidal AC and pulsating DC fault currents." },
  { id: 4, question: "When testing an RCD with an instrument, what connection is required?", options: ["Line and neutral only", "Line and earth via the protected circuit", "Neutral and earth only", "All three conductors"], correctAnswer: 1, explanation: "RCD testers inject test current between line and earth via the protected circuit to simulate an earth fault." },
  { id: 5, question: "What should be done if an RCD trips at 50% of its rated current during testing?", options: ["The RCD has passed", "Replace it - too sensitive", "Record the result - indicates high sensitivity", "Increase test current"], correctAnswer: 2, explanation: "Tripping at 50% indicates high sensitivity. Record the result as it may indicate nuisance tripping potential." },
  { id: 6, question: "An RCBO combines which two protective functions?", options: ["RCD and surge protection", "RCD and overcurrent protection (MCB)", "RCD and isolation", "RCD and undervoltage protection"], correctAnswer: 1, explanation: "An RCBO combines RCD earth fault protection with MCB overcurrent protection in a single device." },
  { id: 7, question: "What is the maximum disconnection time for a time-delayed (Type S) RCD at 1x rated current?", options: ["40ms min, 300ms max", "130ms min, 500ms max", "200ms min, 1000ms max", "300ms with no minimum"], correctAnswer: 1, explanation: "Type S RCDs must have minimum 130ms and maximum 500ms disconnection time at 1x rated current." },
  { id: 8, question: "When testing RCDs on a three-phase installation, how should tests be conducted?", options: ["Test one phase only", "Test between each phase and earth separately", "Test between phases only", "Test highest loaded phase only"], correctAnswer: 1, explanation: "Test between each phase (L1, L2, L3) and earth separately, recording all results." },
  { id: 9, question: "The integral test button on an RCD tests:", options: ["The complete earth fault path", "Only the mechanical and electrical operation of the RCD", "The disconnection time", "Sensitivity to different currents"], correctAnswer: 1, explanation: "The test button only verifies the internal mechanism, not the installation earthing or actual fault response." },
  { id: 10, question: "What Type of RCD is required for circuits supplying equipment with frequency inverters?", options: ["Type AC", "Type A", "Type F", "Type B"], correctAnswer: 2, explanation: "Type F RCDs protect circuits with frequency inverters, detecting AC, pulsating DC, and mixed-frequency faults." },
  { id: 11, question: "An RCD has disconnection time of 35ms at 1x rated. What is the assessment?", options: ["Failed - too fast", "Passed - within 300ms maximum", "Requires replacement", "Further testing at 5x required"], correctAnswer: 1, explanation: "35ms is well within the 300ms maximum for general-purpose RCDs - this is a pass." },
  { id: 12, question: "Why might an RCD fail to trip during testing despite being functional?", options: ["Test instrument batteries low", "Parallel earth paths reducing test current through RCD", "Supply voltage too high", "Too many socket outlets"], correctAnswer: 1, explanation: "Parallel earth paths can divert test current away from the RCD, particularly on TN-C-S systems." }
];

const faqs = [
  { question: "Why test RCDs with an instrument when they have a test button?", answer: "The test button only checks the internal mechanism. Instrument testing verifies the complete earth fault loop and measures actual disconnection time." },
  { question: "What is the difference between Type AC, A, F, and B RCDs?", answer: "Type AC: AC faults only. Type A: AC and pulsating DC. Type F: AC, DC, and mixed frequency. Type B: All types including smooth DC." },
  { question: "Should I record the positive or negative half-cycle test result?", answer: "Record the worst-case (longest) disconnection time from both half-cycle tests." },
  { question: "Can nuisance tripping indicate a problem with the RCD?", answer: "Not necessarily. It is often caused by cumulative leakage from equipment, moisture, or long cable runs. Check leakage does not exceed 30% of RCD rating." },
  { question: "How do I test RCDs on a TN-C-S (PME) system?", answer: "Test normally but be aware parallel earth paths may affect results. The RCD may still protect adequately during real faults." },
  { question: "What if an RCD will not reset after testing?", answer: "Check for earth faults by disconnecting loads. If still will not reset, check for moisture or internal faults. Faulty RCDs must be replaced." }
];

const Level3Module5Section3_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/level3-module5-section3"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" /><span>Module 5.3.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">RCD and RCBO Testing</h1>
          <p className="text-white/80">Verifying residual current device operation for electrical safety</p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Verify RCDs disconnect on earth faults</li>
              <li><strong>Tests:</strong> 50% no-trip, 100% trip, 5x rapid trip</li>
              <li><strong>Max time at rated:</strong> 300ms general, 40ms at 5x</li>
              <li><strong>Both half-cycles:</strong> Record worst-case result</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Regulations</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Reg 612.13:</strong> RCD effectiveness testing</li>
              <li><strong>Reg 411.3.3:</strong> Additional protection 30mA</li>
              <li><strong>Reg 531.2:</strong> RCD selection requirements</li>
              <li><strong>BS EN 61008/61009:</strong> RCD standards</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {["Understand RCD operating principles and types", "Set up and use RCD test instruments correctly", "Perform the complete sequence of RCD tests", "Interpret test results against BS 7671 requirements", "Identify common RCD faults and their causes", "Apply testing requirements to RCBOs and Type S devices"].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" /><span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>RCD Operating Principles
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Residual Current Devices (RCDs) provide protection against electric shock by detecting an imbalance between line and neutral currents. Under normal conditions, current flowing out on the line conductor returns on the neutral. If current leaks to earth (through a fault or person), the RCD detects this imbalance and disconnects the supply rapidly.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">How RCDs work:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Core principle:</strong> Current transformer monitors L and N currents</li>
                <li><strong>Balanced state:</strong> Equal currents create cancelling magnetic fields</li>
                <li><strong>Fault condition:</strong> Earth fault creates imbalance (residual current)</li>
                <li><strong>Detection:</strong> Imbalance induces current in sensing coil</li>
                <li><strong>Disconnection:</strong> Trip mechanism opens contacts when rated current reached</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">RCD Types</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type AC:</strong> Sinusoidal AC faults</li>
                  <li><strong>Type A:</strong> AC + pulsating DC</li>
                  <li><strong>Type F:</strong> AC + DC + mixed frequency</li>
                  <li><strong>Type B:</strong> All types including smooth DC</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Ratings</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>30mA:</strong> Additional protection</li>
                  <li><strong>100mA:</strong> Fire protection</li>
                  <li><strong>300mA:</strong> Fire/fault protection</li>
                  <li><strong>500mA+:</strong> Equipment protection</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-elec-yellow/70"><strong>Remember:</strong> RCDs rated 30mA or less provide additional protection against electric shock - they are not a substitute for basic and fault protection but add an extra layer of safety.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>Test Equipment and Setup
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>RCD testing requires a dedicated RCD tester or multifunction tester with RCD testing capability. The instrument injects a controlled test current between line and earth via the installation earthing system, simulating an earth fault and verifying the RCD responds correctly.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">RCD tester requirements (BS EN 61557-6):</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Test currents:</strong> Selectable 50%, 100%, 5x rated residual current</li>
                <li><strong>Half-cycle selection:</strong> Positive (0 degrees) and negative (180 degrees) testing</li>
                <li><strong>Timing accuracy:</strong> Resolution to display disconnection time</li>
                <li><strong>Current waveform:</strong> Sinusoidal for Type AC/A testing</li>
                <li><strong>Ramp test:</strong> Some instruments offer trip current measurement</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pre-test setup procedure:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Step 1:</strong> Identify RCD type and rated residual current</li>
                <li><strong>Step 2:</strong> Set test instrument to match RCD rating</li>
                <li><strong>Step 3:</strong> Ensure the circuit is energised</li>
                <li><strong>Step 4:</strong> Connect tester to protected circuit (socket or L-PE terminals)</li>
                <li><strong>Step 5:</strong> Warn others - RCD will trip during testing</li>
                <li><strong>Step 6:</strong> Verify test button operation first</li>
              </ul>
            </div>
            <p className="text-sm text-white/90 italic"><strong>Practical tip:</strong> Before instrument testing, always check the RCD test button operates correctly. If it does not trip the RCD, the device is faulty and requires replacement.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>Testing Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>The complete RCD test sequence verifies both the sensitivity threshold and disconnection time. Tests are performed at multiple current levels and on both half-cycles of the AC waveform.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Test sequence for general-purpose RCDs:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Test 1 - No-trip (50%):</strong> Apply 50% of rated current. RCD should NOT trip. Verifies stability under normal leakage.</li>
                <li><strong>Test 2 - Trip at 100%:</strong> Apply full rated current. RCD must trip within 300ms. Test on both half-cycles.</li>
                <li><strong>Test 3 - Rapid trip (5x):</strong> Apply 5x rated current. RCD must trip within 40ms. Essential for additional protection.</li>
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-green-400/80 mb-2">Pass Criteria</p>
                <ul className="text-sm text-white space-y-1">
                  <li>No trip at 50% rated current</li>
                  <li>Trips within 300ms at 1x rated</li>
                  <li>Trips within 40ms at 5x rated</li>
                  <li>Test button operates correctly</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-red-400/80 mb-2">Fail Conditions</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Trips at 50% rated (too sensitive)</li>
                  <li>Exceeds 300ms at 1x rated</li>
                  <li>Exceeds 40ms at 5x rated</li>
                  <li>Fails to trip at any test level</li>
                </ul>
              </div>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Time-delayed (Type S) RCD testing:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>At 1x rated:</strong> Minimum 130ms, maximum 500ms</li>
                <li><strong>At 5x rated:</strong> Minimum 50ms, maximum 150ms</li>
                <li><strong>Purpose:</strong> Allows downstream RCDs to trip first (discrimination)</li>
              </ul>
            </div>
            <p className="text-sm text-elec-yellow/70"><strong>Important:</strong> Reset the RCD between each test. Always test on both positive and negative half-cycles and record the worst result.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[3]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>Interpreting Results and Troubleshooting
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>Correct interpretation of RCD test results requires understanding of pass/fail criteria and common issues. Results should be recorded on certification documentation and anomalies investigated.</p>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Recording test results:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Schedule of Test Results:</strong> Record disconnection times for each RCD</li>
                <li><strong>Worst-case value:</strong> Record the longest time from half-cycle tests</li>
                <li><strong>RCD identification:</strong> Note location, type, and rating</li>
                <li><strong>Test button:</strong> Confirm functional (tick box)</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common issues and causes:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>RCD does not trip:</strong> Faulty device, parallel earth paths, incorrect connection</li>
                <li><strong>Slow disconnection:</strong> Worn mechanism, contamination, age degradation</li>
                <li><strong>Trips at 50% test:</strong> Over-sensitive (may cause nuisance tripping)</li>
                <li><strong>Will not reset:</strong> Standing earth fault, internal fault, moisture</li>
              </ul>
            </div>
            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">EICR classification guidance:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>C1:</strong> RCD completely fails to operate</li>
                <li><strong>C2:</strong> Disconnection time exceeds limits</li>
                <li><strong>C3:</strong> Missing RCD where now required</li>
                <li><strong>Satisfactory:</strong> All tests pass within limits</li>
              </ul>
            </div>
            <p className="text-sm text-white/90 italic"><strong>Note:</strong> On TN-C-S (PME) systems, parallel earth paths may cause longer apparent disconnection times. The RCD may still provide adequate protection during a real fault.</p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Testing RCBOs</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test RCD function exactly as for standalone RCDs</li>
                <li>Same test sequence: 50%, 100%, 5x rated current</li>
                <li>MCB function tested separately (if required)</li>
                <li>Identify RCBO type (AC, A, F, B) before testing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Three-Phase RCD Testing</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test between each phase (L1, L2, L3) and earth</li>
                <li>Record all three results - note worst case</li>
                <li>Four-pole RCDs protect all three phases plus neutral</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Safety Considerations</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>RCD testing requires an energised circuit - follow safe working practices</li>
                <li>Warn building occupants that power will be interrupted</li>
                <li>Consider sensitive equipment before testing</li>
                <li>Ensure safe access to consumer unit for resetting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Case Study: Commercial Kitchen EICR</h3>
            <p className="text-sm text-white/90 leading-relaxed mb-3">During periodic inspection of a commercial kitchen, the main 100mA RCD showed a disconnection time of 450ms at rated current - exceeding the 300ms maximum. The RCD was 15 years old and had never been tested.</p>
            <p className="text-sm text-white/90 leading-relaxed"><strong>Resolution:</strong> The main RCD was replaced with a new Type A device. Post-replacement testing confirmed operation within 180ms. The client was advised to implement quarterly test button checks.</p>
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
                <p className="font-medium text-white mb-1">Disconnection Time Limits</p>
                <ul className="space-y-0.5">
                  <li>General RCD at 1x rated: Max 300ms</li>
                  <li>General RCD at 5x rated: Max 40ms</li>
                  <li>Type S at 1x rated: 130-500ms</li>
                  <li>Type S at 5x rated: 50-150ms</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Test Sequence</p>
                <ul className="space-y-0.5">
                  <li>1. Test button operation</li>
                  <li>2. No-trip test at 50% rated</li>
                  <li>3. Trip test at 100% (both half-cycles)</li>
                  <li>4. Rapid trip at 5x rated (for 30mA)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Learning Points */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Key Learning Points</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {["RCDs detect earth fault currents by monitoring L-N current imbalance", "Test at 50%, 100%, and 5x rated residual current", "Maximum disconnection time at rated is 300ms (general) or 40ms at 5x", "Always test on both positive and negative half-cycles", "Test button only checks mechanism - instrument testing verifies complete system", "Type A RCDs required for equipment with electronic controls"].map((point, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" /><span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/level3-module5-section3-3-4"><ArrowLeft className="w-4 h-4 mr-2" />Previous: Earth Fault Loop Impedance</Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/level3-module5-section3-3-6">Next: Prospective Fault Current<ArrowLeft className="w-4 h-4 ml-2 rotate-180" /></Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default Level3Module5Section3_5;
