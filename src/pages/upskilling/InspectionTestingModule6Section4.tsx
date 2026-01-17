import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "RCD Test Button vs Instrument Testing - Module 6 Section 4";
const DESCRIPTION = "Understand the critical differences between RCD test buttons and instrument testing, and why both are necessary for complete verification.";

const quickCheckQuestions = [
  {
    id: "test-button-purpose",
    question: "What does pressing the RCD test button actually test?",
    options: [
      "The complete earth fault path including external circuit",
      "The internal trip mechanism operates correctly",
      "The disconnection time meets BS 7671 requirements",
      "The earth electrode resistance is satisfactory"
    ],
    correctIndex: 1,
    explanation: "The test button creates an internal test circuit that bypasses the external installation, only verifying that the internal sensing and tripping mechanism operates."
  },
  {
    id: "broken-cpc",
    question: "What critical fault could remain undetected if only the test button was used?",
    options: [
      "Faulty internal components",
      "Stuck test button",
      "A broken or disconnected CPC",
      "Worn internal contacts"
    ],
    correctIndex: 2,
    explanation: "The test button bypasses the external circuit. Only instrument testing, which includes the circuit's earth path, can detect issues like a broken CPC or disconnected earth."
  },
  {
    id: "test-frequency",
    question: "How often does BS 7671 recommend testing the RCD using its test button?",
    options: [
      "Weekly",
      "Monthly",
      "Quarterly (every 3 months)",
      "Annually"
    ],
    correctIndex: 2,
    explanation: "BS 7671 recommends that users operate the test button quarterly (every 3 months) to exercise the mechanical components and verify basic functionality."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What does pressing the RCD test button actually test?",
    options: [
      "The complete earth fault path including external circuit",
      "The internal trip mechanism operates correctly",
      "The disconnection time meets BS 7671 requirements",
      "The earth electrode resistance is satisfactory"
    ],
    correctAnswer: 1,
    explanation: "The test button creates an internal test circuit that bypasses the external installation, only verifying that the internal sensing and tripping mechanism operates."
  },
  {
    id: 2,
    question: "Why can't the RCD test button verify disconnection times?",
    options: [
      "It applies a different frequency",
      "It doesn't measure time - only that the RCD trips",
      "It applies current in the wrong direction",
      "The test current is too high"
    ],
    correctAnswer: 1,
    explanation: "The test button is a simple mechanical switch with no timing capability. It can only indicate that the RCD trips, not how quickly it does so."
  },
  {
    id: 3,
    question: "What critical fault condition can only be detected by instrument testing?",
    options: [
      "Faulty internal components",
      "Stuck test button",
      "Loss of the earth return path (broken CPC)",
      "Worn internal contacts"
    ],
    correctAnswer: 2,
    explanation: "The test button bypasses the external circuit. Only instrument testing, which includes the circuit's earth path, can detect issues like a broken CPC or disconnected earth."
  },
  {
    id: 4,
    question: "How often does BS 7671 recommend testing the RCD using its test button?",
    options: [
      "Weekly",
      "Monthly",
      "Quarterly (every 3 months)",
      "Annually"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 recommends that users operate the test button quarterly (every 3 months) to exercise the mechanical components and verify basic functionality."
  },
  {
    id: 5,
    question: "An RCD passes its test button test but fails instrument testing at 1xIdn. What does this indicate?",
    options: [
      "The test instrument is faulty",
      "The test button circuit is providing incorrect results",
      "The internal mechanism works but there's a fault in the circuit or RCD sensitivity",
      "Both tests should always give the same result"
    ],
    correctAnswer: 2,
    explanation: "This indicates the mechanical trip works (test button passes) but there's an issue with the actual sensing capability or the circuit's earth path that instrument testing reveals."
  },
  {
    id: 6,
    question: "What test current does the internal RCD test button typically apply?",
    options: [
      "Exactly 1xIdn (e.g., exactly 30mA for a 30mA RCD)",
      "5xIdn for fast tripping",
      "A current designed to trip the mechanism, usually close to Idn",
      "A varying ramp current"
    ],
    correctAnswer: 2,
    explanation: "The test button applies a current designed to operate the mechanism, typically close to or slightly above Idn, but this is not precisely calibrated and varies by manufacturer."
  },
  {
    id: 7,
    question: "Which statement about RCD test button testing is correct?",
    options: [
      "It verifies the complete protective circuit including CPCs",
      "It can detect a high-resistance earth fault path",
      "It should be performed quarterly by the user",
      "It provides the same verification as instrument testing"
    ],
    correctAnswer: 2,
    explanation: "Quarterly test button operation is recommended for users. The test button only checks internal mechanisms and cannot verify external circuit integrity."
  },
  {
    id: 8,
    question: "During an EICR, which RCD tests are required?",
    options: [
      "Test button only - if it trips, the RCD is fine",
      "Instrument testing only - test buttons are unreliable",
      "Both test button operation AND instrument testing at required test currents",
      "Either method - they're equivalent"
    ],
    correctAnswer: 2,
    explanation: "An EICR requires both: verify the test button operates the RCD AND perform instrument testing at 1xIdn and 5xIdn to confirm trip times meet requirements."
  },
  {
    id: 9,
    question: "What could cause an RCD to pass instrument testing but fail its test button?",
    options: [
      "This is impossible - they test the same thing",
      "A fault in the test button circuit or resistor",
      "Incorrect instrument connections",
      "Testing on the wrong circuit"
    ],
    correctAnswer: 1,
    explanation: "The test button has its own internal circuit with a resistor. If this component fails, the button may not operate even though the RCD's main function is intact."
  },
  {
    id: 10,
    question: "Why must electricians use calibrated test instruments rather than relying on test buttons?",
    options: [
      "Test buttons can stick in cold weather",
      "Only instruments can verify trip times and test the complete protective circuit",
      "Test buttons are not fitted to all RCDs",
      "Instruments are faster to use"
    ],
    correctAnswer: 1,
    explanation: "Calibrated instruments measure disconnection times, apply precise test currents, and test through the actual circuit including the earth path - none of which the test button can do."
  }
];

const faqs = [
  {
    question: "If the test button works, why do I need instrument testing?",
    answer: "The test button only confirms the internal trip mechanism operates - it creates an internal fault that bypasses the external circuit. Instrument testing verifies the RCD trips within required times AND that the external circuit (including CPCs and earth path) is intact. A broken CPC would not be detected by the test button."
  },
  {
    question: "Can I tell the client their RCD is fine after a successful test button press?",
    answer: "No. While the test button confirms basic mechanism function, you cannot confirm the RCD meets BS 7671 requirements without instrument testing. The test button doesn't measure trip times or verify the circuit's protective conductor continuity."
  },
  {
    question: "How often should the test button be pressed?",
    answer: "BS 7671 recommends quarterly (every 3 months) testing by the user. This exercises the mechanical components and provides ongoing verification that basic tripping function is maintained between professional tests."
  },
  {
    question: "What if the test button doesn't trip the RCD?",
    answer: "If pressing the test button doesn't trip the RCD, the unit may be faulty and should not be relied upon for protection. However, first verify the supply is on and the RCD is in the 'on' position. If it still fails, the RCD should be replaced or investigated by a competent person."
  },
  {
    question: "Can I use the test button to verify an RCD after replacement?",
    answer: "The test button is useful for initial verification that the mechanism operates, but full commissioning must include instrument testing to verify trip times at 1xIdn and 5xIdn, plus functional testing at 1/2xIdn to confirm non-tripping below threshold."
  },
  {
    question: "Does the test button apply exactly 30mA on a 30mA RCD?",
    answer: "No. The test button applies a current designed to trip the mechanism, typically somewhere between 50% and 100% of Idn. The exact value varies by manufacturer and is not precisely calibrated like test instruments."
  }
];

const InspectionTestingModule6Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centered Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6 Section 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Test Button vs Instrument Testing
          </h1>
          <p className="text-white/80">
            Why the RCD test button is not a substitute for professional instrument testing
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Test Button:</strong> Only verifies internal mechanism</li>
              <li><strong>Instrument:</strong> Tests complete circuit + times</li>
              <li><strong>Frequency:</strong> Users test quarterly</li>
              <li><strong>EICR:</strong> Both methods required</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Difference</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Test Button:</strong> Bypasses external circuit</li>
              <li><strong>Instrument:</strong> Includes earth path</li>
              <li><strong>Broken CPC:</strong> Only detected by instrument</li>
              <li><strong>Trip times:</strong> Only measured by instrument</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand what the RCD test button actually tests",
              "Recognise limitations of test button verification",
              "Explain why instrument testing is essential",
              "Identify what only instrument testing can verify",
              "Compare the two methods appropriately",
              "Apply correct testing procedures"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 mb-12" />

        {/* Section 1: How the Test Button Works */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            How the Test Button Works
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The RCD test button creates an internal imbalance by connecting a resistor between line and the load side of the current transformer. This simulates an earth fault current flowing through the RCD without involving the external circuit.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When Pressed, the Button:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Connects internal test resistor</li>
                <li>Creates current imbalance through the toroid</li>
                <li>Triggers the trip mechanism if functioning</li>
                <li>Bypasses the external circuit completely</li>
              </ul>
            </div>

            <p>
              The test button confirms the sensing and tripping mechanism works but tells you nothing about trip times, actual sensitivity, or whether the external protective circuit is intact.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Limitations of Test Button Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Limitations of Test Button Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              While the test button is a valuable user tool for regular verification, it has significant limitations that make it unsuitable as the sole means of RCD verification:
            </p>

            <div className="my-6 space-y-4">
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">Cannot Measure Trip Times</p>
                <p className="text-white/70 text-sm">No timing capability - just confirms operation.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">Doesn't Test the Earth Path</p>
                <p className="text-white/70 text-sm">A broken CPC would not be detected.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">Uncalibrated Test Current</p>
                <p className="text-white/70 text-sm">Applied current varies by manufacturer.</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-red-400 font-semibold">No Sensitivity Verification</p>
                <p className="text-white/70 text-sm">Cannot determine actual trip threshold.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3: What Instrument Testing Verifies */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            What Instrument Testing Verifies
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Professional RCD testing instruments apply precise test currents through the actual circuit and measure the disconnection time. This provides comprehensive verification that test button testing cannot achieve:
            </p>

            <div className="my-6 space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-semibold">Precise Trip Time Measurement</p>
                <p className="text-white/70 text-sm">Confirms compliance with 300ms at 1xIdn, 40ms at 5xIdn.</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-semibold">Tests Through Actual Circuit</p>
                <p className="text-white/70 text-sm">Verifies earth path integrity and CPC continuity.</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-semibold">Calibrated Test Currents</p>
                <p className="text-white/70 text-sm">Applies exact 1xIdn, 5xIdn, and 1/2xIdn currents.</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-semibold">Ramp Testing Capability</p>
                <p className="text-white/70 text-sm">Can determine actual RCD sensitivity.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Comparison Table */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Comparison Table
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Feature</th>
                    <th className="text-center py-2 text-white/60">Test Button</th>
                    <th className="text-center py-2 text-white/60">Instrument</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2">Verifies mechanism trips</td>
                    <td className="py-2 text-center text-emerald-400">Yes</td>
                    <td className="py-2 text-center text-emerald-400">Yes</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Measures trip time</td>
                    <td className="py-2 text-center text-red-400">No</td>
                    <td className="py-2 text-center text-emerald-400">Yes</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Tests earth path</td>
                    <td className="py-2 text-center text-red-400">No</td>
                    <td className="py-2 text-center text-emerald-400">Yes</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Calibrated current</td>
                    <td className="py-2 text-center text-red-400">No</td>
                    <td className="py-2 text-center text-emerald-400">Yes</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">Ramp testing</td>
                    <td className="py-2 text-center text-red-400">No</td>
                    <td className="py-2 text-center text-emerald-400">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-2">User can perform</td>
                    <td className="py-2 text-center text-emerald-400">Yes</td>
                    <td className="py-2 text-center text-amber-400">Trained</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: When Each Test is Required */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            When Each Test is Required
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Both testing methods serve important but different purposes and are required at different intervals:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Button (User Testing)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Frequency:</strong> Quarterly (every 3 months)</li>
                  <li><strong>Performed by:</strong> User/occupier</li>
                  <li><strong>Purpose:</strong> Exercise mechanism, basic verification</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Instrument Testing (Professional)</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Frequency:</strong> Initial verification, periodic inspection</li>
                  <li><strong>Performed by:</strong> Competent person (electrician)</li>
                  <li><strong>Purpose:</strong> Full compliance verification</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 6: EICR Requirements */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            EICR Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              During an Electrical Installation Condition Report (EICR), the inspector must perform comprehensive RCD testing that includes both methods:
            </p>

            <div className="my-6 space-y-3">
              {[
                { step: 1, text: "Verify test button operates the RCD" },
                { step: 2, text: "Test at 1xIdn - record trip time (max 300ms)" },
                { step: 3, text: "Test at 5xIdn - record trip time (max 40ms)" },
                { step: 4, text: "Test at 1/2xIdn - confirm no tripping" },
                { step: 5, text: "Record all results on schedule of test results" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-amber-300/80">
              <strong>Note:</strong> Relying solely on test button operation would not meet the requirements of BS 7671 or the model forms for electrical certification.
            </p>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Advise Clients</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Always advise clients to test their RCDs quarterly using the test button</li>
                <li>Explain it exercises mechanical components</li>
                <li>Clarify it doesn't replace professional testing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Document Both Tests</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record both test button function AND instrument test results</li>
                <li>Note trip times at 1xIdn and 5xIdn</li>
                <li>Include phase angle tested (0 deg and 180 deg)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Failed Test Button</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>If test button doesn't trip RCD</strong> - treat as serious defect</li>
                <li><strong>Check supply is on</strong> - verify RCD is in 'on' position first</li>
                <li><strong>Recommendation</strong> - RCD should be replaced or investigated</li>
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

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Reference Card */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Test Methods Quick Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Test Button</p>
                <ul className="space-y-0.5">
                  <li>Mechanism only</li>
                  <li>User quarterly</li>
                  <li>No timing</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Instrument Testing</p>
                <ul className="space-y-0.5">
                  <li>Complete circuit</li>
                  <li>1xIdn max 300ms</li>
                  <li>5xIdn max 40ms</li>
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
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-6/section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-6/section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule6Section4;
