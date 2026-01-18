import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m2s6-check1",
    question: "How often must a full 3-hour duration test be performed?",
    options: ["Monthly", "Quarterly", "Six-monthly", "Annually"],
    correctIndex: 3,
    explanation: "BS 5266-1 requires an annual full rated duration test (typically 3 hours). This confirms the batteries can sustain full emergency operation for the specified duration."
  },
  {
    id: "emergencylighting-m2s6-check2",
    question: "What is the minimum duration for monthly functional tests?",
    options: ["10 seconds", "30 seconds", "1 minute", "5 minutes"],
    correctIndex: 2,
    explanation: "Monthly functional tests must last at least 1 minute (some sources specify up to 1/4 of rated duration for self-contained luminaires). This verifies the lamp operates and changeover functions correctly."
  },
  {
    id: "emergencylighting-m2s6-check3",
    question: "Who is responsible for maintaining the emergency lighting log book?",
    options: ["The installer", "The responsible person", "The fire service", "The local authority"],
    correctIndex: 1,
    explanation: "The responsible person (building owner/occupier) is responsible for maintaining the log book and ensuring testing is carried out. They may delegate the testing itself but retain overall responsibility."
  }
];

const faqs = [
  {
    question: "What must be recorded in the emergency lighting log book?",
    answer: "All tests and inspections must be recorded including: date, type of test, results, any defects found, remedial actions taken, name of person performing test. Annual certificates should also be retained."
  },
  {
    question: "Can automatic test systems replace manual testing?",
    answer: "Automatic test systems (DALI, addressable) can perform routine tests automatically, but results must still be reviewed and recorded. Manual inspections remain necessary to check for physical damage, obstruction, and sign legibility."
  },
  {
    question: "How soon must defects be rectified?",
    answer: "Defects affecting safety should be rectified immediately. Other defects should be rectified within a reasonable time - typically 24-48 hours for failed luminaires on escape routes, or before the next working day."
  },
  {
    question: "What happens after a 3-hour test?",
    answer: "Batteries need time to recharge - typically 24 hours to reach 80% capacity. During this period, the system offers reduced emergency duration. Schedule annual tests when premises will not be occupied for 24+ hours afterward."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A building has 50 emergency luminaires. During the monthly test, 3 luminaires fail to illuminate. What action is required?",
  options: [
    "Record in log book, schedule repair within 30 days",
    "Record in log book, repair immediately as safety critical",
    "No action needed, retest next month",
    "Replace all 50 luminaires as a precaution"
  ],
  correctAnswer: 1,
  explanation: "Failed luminaires on escape routes are safety critical defects. They must be recorded and repaired immediately (or as soon as reasonably practicable). The 6% failure rate also suggests a potential systematic issue worth investigating."
  }
];

const EmergencyLightingModule2Section6 = () => {
  useSEO({
    title: "Testing and Record Keeping | Emergency Lighting Module 2.6",
    description: "Emergency lighting testing schedules, maintenance requirements, log book documentation and compliance record keeping to BS 5266-1."
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 2
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 2.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Testing and Record Keeping
          </h1>
          <p className="text-white/80">
            Testing schedules, maintenance requirements and compliance documentation
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Daily:</strong> Visual check signs lit</li>
              <li><strong>Monthly:</strong> 1-minute functional test</li>
              <li><strong>Annually:</strong> Full 3-hour duration test</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Documentation</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Log book:</strong> BS 5266-8 compliant</li>
              <li><strong>Records:</strong> All tests and defects</li>
              <li><strong>Certificates:</strong> Annual inspection</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Implement correct testing schedules",
              "Perform monthly functional tests",
              "Conduct annual duration tests",
              "Maintain BS 5266-8 log books",
              "Record and rectify defects",
              "Demonstrate compliance to inspectors"
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
            Testing Schedule
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266-1 and BS EN 50172 specify mandatory testing schedules to ensure
              emergency lighting remains functional. Testing frequency increases with
              test duration.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Routine Tests</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Daily:</strong> Visual check all signs lit</li>
                  <li><strong>Monthly:</strong> Functional test (1 min)</li>
                  <li><strong>Six-monthly:</strong> Partial duration test</li>
                  <li><strong>Annually:</strong> Full duration test (3h)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Test Purpose</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Daily:</strong> Spot obvious failures</li>
                  <li><strong>Monthly:</strong> Verify changeover works</li>
                  <li><strong>Six-monthly:</strong> Partial battery check</li>
                  <li><strong>Annual:</strong> Full battery capacity</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Daily</p>
                <p className="text-white/90 text-xs">Visual check</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Monthly</p>
                <p className="text-white/90 text-xs">1 minute test</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Annual</p>
                <p className="text-white/90 text-xs">3 hour test</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Test Procedures
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Each test type has specific procedures and pass/fail criteria. Proper
              testing technique ensures valid results and identifies genuine faults.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Monthly Functional Test:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Simulate mains failure:</strong> Use test switch or local isolation</li>
                <li><strong>Verify all luminaires illuminate:</strong> Walk entire premises</li>
                <li><strong>Check exit signs:</strong> All lit and legible</li>
                <li><strong>Duration:</strong> Minimum 1 minute (or 1/4 rated duration)</li>
                <li><strong>Restore mains:</strong> Verify luminaires extinguish (non-maintained)</li>
                <li><strong>Record results:</strong> Note any failures in log book</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Annual Duration Test:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Full rated duration:</strong> Typically 3 hours</li>
                <li><strong>Schedule carefully:</strong> Premises unoccupied for 24h after</li>
                <li><strong>Monitor throughout:</strong> Check illumination maintained</li>
                <li><strong>Check at end:</strong> All luminaires still lit</li>
                <li><strong>Allow recharge:</strong> 24 hours for 80% capacity</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Log Book Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266-8 specifies log book requirements. The log book provides evidence
              of compliance and is typically requested during fire risk assessments
              and inspections.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Log Book Contents</p>
                <ul className="text-sm text-white space-y-1">
                  <li>System description and drawings</li>
                  <li>Completion certificate</li>
                  <li>Test records (all types)</li>
                  <li>Defect reports and actions</li>
                  <li>Annual inspection certificates</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Record Details</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Date and time of test</li>
                  <li>Type of test performed</li>
                  <li>Pass/fail results</li>
                  <li>Defects identified</li>
                  <li>Name of person testing</li>
                </ul>
              </div>
            </div>

            <p>
              The log book should be kept on premises and available for inspection.
              Electronic records are acceptable if printable and regularly backed up.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Defect Management</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Record all defects immediately in log book</li>
                <li>Assess safety criticality of each defect</li>
                <li>Rectify escape route failures immediately</li>
                <li>Track open defects until resolved</li>
                <li>Record completion of remedial works</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Failures</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>No log book:</strong> — Must have BS 5266-8 compliant log</li>
                <li><strong>Missing test records:</strong> — Every test must be recorded</li>
                <li><strong>No annual certificate:</strong> — Competent person inspection required</li>
                <li><strong>Unrecorded defects:</strong> — All faults must be documented</li>
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
              <p className="font-medium text-white mb-1">Test Schedule</p>
              <ul className="space-y-0.5">
                <li>Daily: Visual check</li>
                <li>Monthly: 1 min functional</li>
                <li>Annually: 3 hour duration</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Documentation</p>
              <ul className="space-y-0.5">
                <li>Log book: BS 5266-8</li>
                <li>All tests recorded</li>
                <li>Annual certificate</li>
                <li>Defect tracking</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-2-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-3-section-1">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule2Section6;