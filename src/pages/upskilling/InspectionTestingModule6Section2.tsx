import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "RCD Trip Time Testing - Module 6 Section 2";
const DESCRIPTION = "Learn how to test RCD trip times at rated and 5x rated current, and interpret results for BS 7671 compliance.";

const quickCheckQuestions = [
  {
    id: "trip-time-1x",
    question: "A 30mA RCD must trip within what time at rated current?",
    options: ["40ms", "150ms", "300ms", "1000ms"],
    correctIndex: 2,
    explanation: "At rated residual current (IΔn), RCDs must trip within 300ms maximum."
  },
  {
    id: "trip-time-5x",
    question: "At 5x rated current, a standard RCD must trip within:",
    options: ["40ms", "150ms", "300ms", "500ms"],
    correctIndex: 0,
    explanation: "At 5xIΔn (e.g., 150mA for a 30mA RCD), trip time must not exceed 40ms."
  },
  {
    id: "record-times",
    question: "When recording trip times, note the:",
    options: [
      "Fastest time",
      "Average of times",
      "Longer of the two times",
      "Shortest time only"
    ],
    correctIndex: 2,
    explanation: "Record the longer (worst case) trip time as this determines compliance with maximum limits."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A 30mA RCD must trip within what time at rated current?",
    options: ["40ms", "150ms", "300ms", "1000ms"],
    correctAnswer: 2,
    explanation: "At rated residual current (IΔn), RCDs must trip within 300ms maximum."
  },
  {
    id: 2,
    question: "At 5x rated current, a standard RCD must trip within:",
    options: ["40ms", "150ms", "300ms", "500ms"],
    correctAnswer: 0,
    explanation: "At 5xIΔn (150mA for a 30mA RCD), trip time must not exceed 40ms."
  },
  {
    id: 3,
    question: "Testing at x1/2 (half rated current) should result in:",
    options: [
      "Instant tripping",
      "Trip within 300ms",
      "No trip",
      "Trip within 40ms"
    ],
    correctAnswer: 2,
    explanation: "The x1/2 test confirms the RCD doesn't trip at currents below threshold, avoiding nuisance tripping."
  },
  {
    id: 4,
    question: "For a 30mA RCD, the x5 test current is:",
    options: ["15mA", "30mA", "150mA", "300mA"],
    correctAnswer: 2,
    explanation: "5 x 30mA = 150mA. This is the current used for the 5x trip time test."
  },
  {
    id: 5,
    question: "Why test at both 0 degrees and 180 degrees phase angles?",
    options: [
      "To check polarity",
      "To verify operation at any point in AC waveform",
      "To test the MCB",
      "To measure insulation"
    ],
    correctAnswer: 1,
    explanation: "Testing both angles confirms the RCD operates correctly regardless of where in the AC cycle the fault occurs."
  },
  {
    id: 6,
    question: "When recording trip times, note the:",
    options: [
      "Fastest time",
      "Average of times",
      "Longer of the two times",
      "Shortest time only"
    ],
    correctAnswer: 2,
    explanation: "Record the longer trip time (worst case) as this determines compliance with maximum limits."
  },
  {
    id: 7,
    question: "S-type (time-delayed) RCDs have trip times that are:",
    options: [
      "Same as standard RCDs",
      "Faster than standard RCDs",
      "Longer than standard RCDs",
      "Not measurable"
    ],
    correctAnswer: 2,
    explanation: "S-type RCDs are deliberately time-delayed for discrimination. They have different (longer) maximum trip times."
  },
  {
    id: 8,
    question: "If a 30mA RCD trips in 350ms at rated current:",
    options: [
      "This is acceptable",
      "This is a failure",
      "Retest at 180 degrees",
      "Check the fuse"
    ],
    correctAnswer: 1,
    explanation: "350ms exceeds the 300ms maximum. The RCD fails and should be replaced."
  },
  {
    id: 9,
    question: "The RCD test should be performed:",
    options: [
      "With circuit dead",
      "With supply live to the RCD",
      "Without an earth connection",
      "Only on TT systems"
    ],
    correctAnswer: 1,
    explanation: "RCD testing requires live supply. The test injects current to simulate a fault and measures trip response."
  },
  {
    id: 10,
    question: "At 15mA (x1/2 of 30mA RCD), the expected result is:",
    options: [
      "Trip within 40ms",
      "Trip within 300ms",
      "No trip",
      "Trip within 1 second"
    ],
    correctAnswer: 2,
    explanation: "At half rated current, the RCD should NOT trip. This confirms it won't nuisance trip at normal leakage levels."
  }
];

const faqs = [
  {
    question: "What are the maximum trip times?",
    answer: "At IΔn (rated current): 300ms maximum. At 5xIΔn: 40ms maximum. Time-delayed (S-type) RCDs have different, longer limits as they're designed for discrimination."
  },
  {
    question: "Why test at both x1 and x5?",
    answer: "The x1 test confirms the RCD operates at its threshold. The x5 test verifies fast operation for higher fault currents - important for shock protection where the dangerous current is greater."
  },
  {
    question: "What does the x1/2 test confirm?",
    answer: "Testing at half rated current (15mA for a 30mA RCD) confirms the RCD does NOT trip. This verifies it won't nuisance trip at normal leakage levels. No trip should occur within the test period."
  },
  {
    question: "Why test at both 0 degrees and 180 degrees phase angles?",
    answer: "Fault currents can occur at any point in the AC waveform. Testing at both 0 degrees and 180 degrees checks the RCD operates correctly regardless of when the fault occurs. Record the longer of the two times."
  },
  {
    question: "What if trip time is just at the limit?",
    answer: "If trip time is at or near the maximum, the RCD passes but may be deteriorating. Note this and recommend monitoring or replacement. Significantly over the limit is a failure."
  },
  {
    question: "How do I test a 30mA RCD?",
    answer: "Set tester to 30mA (x1) for standard trip test. For x5, set to 150mA. Record actual trip time displayed. Compare to maximum allowed (300ms at 30mA, 40ms at 150mA)."
  }
];

const InspectionTestingModule6Section2 = () => {
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
            <span>Module 6 Section 2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            RCD Trip Time Testing
          </h1>
          <p className="text-white/80">
            How to test and verify RCD trip times for compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>x1 Test:</strong> Must trip within 300ms</li>
              <li><strong>x5 Test:</strong> Must trip within 40ms</li>
              <li><strong>x1/2 Test:</strong> Must NOT trip</li>
              <li><strong>Record:</strong> Longer of two phase angles</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Values</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>30mA x5:</strong> 150mA test current</li>
              <li><strong>30mA x1/2:</strong> 15mA test current</li>
              <li><strong>S-type x1:</strong> 130-500ms</li>
              <li><strong>S-type x5:</strong> 50-150ms</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Trip time requirements: 300ms at x1, 40ms at x5",
              "How to perform RCD trip time tests",
              "Test currents: x1/2, x1, x5 explained",
              "Recording and documenting results",
              "Interpreting pass/fail criteria",
              "S-type RCD timing differences"
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

        {/* Section 1: Trip Time Requirements */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Trip Time Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              RCDs must disconnect within specific time limits to provide effective protection.
              BS EN 61008/61009 specify maximum trip times:
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2 text-white/60">Test Current</th>
                    <th className="text-center py-2 text-white/60">Standard RCD</th>
                    <th className="text-center py-2 text-white/60">S-Type</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/10">
                    <td className="py-2">x1/2 IΔn</td>
                    <td className="text-center text-emerald-400">No trip</td>
                    <td className="text-center text-emerald-400">No trip</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-2">x1 IΔn</td>
                    <td className="text-center font-mono">≤300ms</td>
                    <td className="text-center font-mono">130-500ms</td>
                  </tr>
                  <tr>
                    <td className="py-2">x5 IΔn</td>
                    <td className="text-center font-mono text-elec-yellow">≤40ms</td>
                    <td className="text-center font-mono">50-150ms</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: Test Procedure */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Test Procedure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Follow this sequence for comprehensive RCD testing:
            </p>

            <div className="my-6 space-y-3">
              {[
                { step: 1, text: "Connect RCD tester to circuit (L-N-E or socket)" },
                { step: 2, text: "Ensure supply is on and RCD is in 'ON' position" },
                { step: 3, text: "Select test current (x1/2, x1, or x5)" },
                { step: 4, text: "Select phase angle (0 degrees or 180 degrees)" },
                { step: 5, text: "Press test button" },
                { step: 6, text: "Record displayed trip time" },
                { step: 7, text: "Reset RCD and repeat at other phase angle" }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </span>
                  <span className="text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Test Currents Explained */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Test Currents Explained
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Each test current serves a specific purpose:
            </p>

            <div className="my-6 space-y-4">
              <div className="border-l-4 border-emerald-500 pl-4">
                <p className="text-emerald-400 font-semibold">x1/2 Test (15mA for 30mA RCD)</p>
                <p className="text-white/70 text-sm">Confirms RCD does NOT trip at normal leakage levels. No trip should occur.</p>
              </div>
              <div className="border-l-4 border-elec-yellow pl-4">
                <p className="text-elec-yellow font-semibold">x1 Test (30mA for 30mA RCD)</p>
                <p className="text-white/70 text-sm">Standard trip test at rated current. Must trip within 300ms.</p>
              </div>
              <div className="border-l-4 border-cyan-500 pl-4">
                <p className="text-cyan-400 font-semibold">x5 Test (150mA for 30mA RCD)</p>
                <p className="text-white/70 text-sm">Fast trip test for higher faults. Must trip within 40ms.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Phase Angle Testing */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Phase Angle Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Faults can occur at any point in the AC cycle. Testing at both 0 degrees and 180 degrees
              confirms reliable operation:
            </p>

            <div className="grid grid-cols-2 gap-4 my-6 text-center">
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-elec-yellow font-bold text-2xl">0 deg</p>
                <p className="text-white/60 text-sm">Positive half-cycle</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <p className="text-cyan-400 font-bold text-2xl">180 deg</p>
                <p className="text-white/60 text-sm">Negative half-cycle</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Record:</strong> The longer of the two trip times - this is the worst-case performance.
            </p>
          </div>
        </section>

        {/* Section 5: Recording Results */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Recording Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Document for each RCD:
            </p>

            <div className="my-6">
              <ul className="text-sm text-white space-y-2 ml-4">
                <li>RCD rating (30mA, 100mA, etc.)</li>
                <li>RCD type (AC, A, F, B, S-type)</li>
                <li>Trip time at x1 IΔn (both angles)</li>
                <li>Trip time at x5 IΔn (both angles)</li>
                <li>x1/2 result (no trip confirmed)</li>
                <li>Operating current if ramp tested</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Warn Occupants</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>RCD testing will cut power</li>
                <li>Notify building users and check sensitive equipment</li>
                <li>Allow time for equipment to restart after testing</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Test All Applicable</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Test every RCD in the installation</li>
                <li>Test at both x1 and x5</li>
                <li>Test at both phase angles (0 deg and 180 deg)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Near-Limit Times</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>If times are close to maximum, note concern</li>
                <li>The RCD may be deteriorating</li>
                <li>Recommend monitoring or replacement</li>
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
            <h3 className="text-sm font-medium text-white mb-4">RCD Trip Time Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Standard RCD</p>
                <ul className="space-y-0.5">
                  <li>x1 IΔn = ≤300ms</li>
                  <li>x5 IΔn = ≤40ms</li>
                  <li>x1/2 IΔn = No trip</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">30mA Test Currents</p>
                <ul className="space-y-0.5">
                  <li>x1/2 = 15mA</li>
                  <li>x1 = 30mA</li>
                  <li>x5 = 150mA</li>
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
            <Link to="/study-centre/upskilling/inspection-testing/module-6/section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-6/section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule6Section2;
