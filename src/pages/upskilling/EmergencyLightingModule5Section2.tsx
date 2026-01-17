import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m5s2-check1",
    question: "How long should a functional test last?",
    options: ["30 seconds", "At least 1 minute", "5 minutes", "15 minutes"],
    correctIndex: 1,
    explanation: "A functional test should last at least 1 minute to verify luminaires illuminate and remain lit briefly. This is typically done monthly and doesn't fully discharge the batteries."
  },
  {
    id: "emergencylighting-m5s2-check2",
    question: "When is a 3-hour duration test required?",
    options: ["Monthly", "Every 6 months", "Annually", "At commissioning only"],
    correctIndex: 2,
    explanation: "A full duration test (typically 3 hours) is required annually to verify the system can operate for its rated duration. This fully discharges batteries and verifies capacity."
  },
  {
    id: "emergencylighting-m5s2-check3",
    question: "What must be checked at the end of a duration test?",
    options: ["Cable temperature", "All luminaires still lit", "Circuit breaker position", "Mains voltage"],
    correctIndex: 1,
    explanation: "At the end of the rated duration, all luminaires must still be illuminated at acceptable levels. Any that have failed indicate battery or lamp problems requiring attention."
  }
];

const faqs = [
  {
    question: "Can I perform duration tests during occupied hours?",
    answer: "Not recommended. Duration tests discharge batteries, leaving the system unable to function if a real emergency occurs. Schedule during low-occupancy periods and ensure normal lighting remains available."
  },
  {
    question: "How do I simulate mains failure for testing?",
    answer: "Use the circuit breaker protecting the emergency lighting circuit, or test switches if installed. Some systems have dedicated test facilities. Never use main switches that affect other safety systems."
  },
  {
    question: "What if some luminaires fail before the full duration?",
    answer: "Record which luminaires failed and when. These require battery replacement or repair. The system cannot be signed off as compliant until all luminaires achieve rated duration."
  },
  {
    question: "How long after a duration test before the system is ready again?",
    answer: "Allow 24 hours for full recharge. During this period, the system has reduced capacity. For critical premises, plan duration tests to allow recovery before next occupation."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "An annual duration test is conducted on a 3-hour rated system. After 2.5 hours, 3 luminaires have failed. What action is required?",
  options: [
    "Pass the test - most luminaires still working",
    "Record failures and replace batteries/lamps",
    "Extend the test to 4 hours",
    "Reduce system rating to 2 hours"
  ],
  correctAnswer: 1,
  explanation: "All luminaires must achieve the rated duration. The failed luminaires require investigation and repair (typically battery replacement). The system fails the test until repairs are completed and verified."
  }
];

const EmergencyLightingModule5Section2 = () => {
  useSEO({
    title: "Functional Testing and Duration Tests | Emergency Lighting Module 5.2",
    description: "Essential testing procedures including functional tests and 3-hour duration tests to verify emergency lighting system operation."
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 5.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Functional Testing and Duration Tests
          </h1>
          <p className="text-white/80">
            Verifying emergency lighting operates correctly
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Functional:</strong> 1 minute minimum</li>
              <li><strong>Duration:</strong> Full rated time</li>
              <li><strong>Frequency:</strong> Monthly/Annual</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Test Purpose</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Functional:</strong> Basic operation</li>
              <li><strong>Duration:</strong> Battery capacity</li>
              <li><strong>Record:</strong> All results</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Conduct functional tests",
              "Perform duration tests",
              "Record test results",
              "Identify test failures",
              "Schedule testing appropriately",
              "Manage post-test recovery"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Functional Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Functional tests verify that luminaires illuminate when mains power
              fails. These brief tests are performed regularly without significantly
              discharging batteries.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Procedure</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Simulate mains failure</li>
                  <li>Verify all luminaires illuminate</li>
                  <li>Check exit signs visible</li>
                  <li>Test for minimum 1 minute</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Check Points</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All luminaires lit</li>
                  <li>No flickering or dimming</li>
                  <li>Correct changeover</li>
                  <li>Mains restoration</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">1 minute</p>
                <p className="text-white/90 text-xs">Minimum duration</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Monthly</p>
                <p className="text-white/90 text-xs">Typical frequency</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Record</p>
                <p className="text-white/90 text-xs">Log all tests</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Duration Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Duration tests verify batteries can power luminaires for the full
              rated period (typically 3 hours). This confirms battery capacity
              has not degraded.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Duration Test Requirements:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Frequency:</strong> Annually (or as specified)</li>
                <li><strong>Duration:</strong> Full rated time (1 or 3 hours)</li>
                <li><strong>Timing:</strong> During low occupancy</li>
                <li><strong>Recovery:</strong> 24 hours for recharge</li>
                <li><strong>Outcome:</strong> All luminaires must pass</li>
              </ul>
            </div>

            <p>
              Schedule duration tests when the building can remain unoccupied for
              24+ hours, as the system cannot provide full protection during
              battery recovery.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Recording Test Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All test results must be recorded in the log book. This provides
              compliance evidence and helps identify deteriorating luminaires.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Record Details</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Date and time of test</li>
                  <li>Test type (functional/duration)</li>
                  <li>Luminaires tested</li>
                  <li>Pass/fail status</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Failure Recording</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Luminaire identification</li>
                  <li>Nature of failure</li>
                  <li>Remedial action taken</li>
                  <li>Re-test confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Duration Test Planning</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Schedule during building shutdown</li>
                <li>Inform building management</li>
                <li>Ensure normal lighting available</li>
                <li>Plan systematic inspection route</li>
                <li>Have replacement batteries ready</li>
                <li>Allow 24h recovery before occupation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Testing Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Short tests:</strong> — Not achieving full duration</li>
                <li><strong>No recording:</strong> — Missing log book entries</li>
                <li><strong>Wrong timing:</strong> — Testing during occupation</li>
                <li><strong>Missed luminaires:</strong> — Not checking all units</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
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

        {/* Quick Reference */}
        <div className="mt-6 p-5 rounded-lg bg-transparent">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-white mb-1">Functional Test</p>
              <ul className="space-y-0.5">
                <li>Duration: 1 minute+</li>
                <li>Frequency: Monthly</li>
                <li>Checks: All illuminate</li>
                <li>Record: Log book</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Duration Test</p>
              <ul className="space-y-0.5">
                <li>Duration: Full rated</li>
                <li>Frequency: Annual</li>
                <li>Recovery: 24 hours</li>
                <li>All must pass</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <section className="mb-10 mt-12">
          <SingleQuestionQuiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-5-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/emergency-lighting-module-5-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule5Section2;