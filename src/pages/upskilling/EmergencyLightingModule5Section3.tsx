import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m5s3-check1",
    question: "How often should monthly functional tests be performed?",
    options: ["Every week", "Every month", "Every quarter", "Every 6 months"],
    correctIndex: 1,
    explanation: "BS 5266-1 requires monthly functional tests to verify luminaires illuminate on mains failure. This ensures ongoing system reliability and identifies problems early."
  },
  {
    id: "emergencylighting-m5s3-check2",
    question: "What is the purpose of recording all test results?",
    options: ["Insurance purposes only", "Compliance evidence and trend analysis", "Building valuation", "Warranty claims"],
    correctIndex: 1,
    explanation: "Test records provide compliance evidence for inspections and enable trend analysis to identify deteriorating luminaires before they fail completely."
  },
  {
    id: "emergencylighting-m5s3-check3",
    question: "Who is responsible for ensuring tests are completed?",
    options: ["The electrician only", "The responsible person", "Building occupants", "Fire service"],
    correctIndex: 1,
    explanation: "The responsible person (building owner, manager, or employer) has legal responsibility under RRO to ensure emergency lighting is tested and maintained. They may delegate tasks but retain responsibility."
  }
];

const faqs = [
  {
    question: "Can automatic testing replace manual tests?",
    answer: "Yes, BS 5266-8 compliant automatic testing systems can replace manual monthly tests. However, the system must be properly configured and records reviewed regularly. Annual visual inspections are still recommended."
  },
  {
    question: "What happens if a test is missed?",
    answer: "Missed tests should be completed as soon as possible and the delay documented with reasons. Regular missed tests indicate inadequate maintenance arrangements and potential non-compliance with RRO."
  },
  {
    question: "Do daily checks count as tests?",
    answer: "Daily visual checks (confirming indicator lights show charging) are good practice but don't replace monthly functional tests. Daily checks identify obvious failures between formal tests."
  },
  {
    question: "What training is needed for test personnel?",
    answer: "Test personnel should understand the system, testing procedures, and recording requirements. For functional tests, this can be trained facility staff. Duration tests may need competent electrical personnel."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "The responsible person wants to reduce testing costs. Which approach is compliant with BS 5266-1?",
  options: [
    "Skip monthly tests and only do annual",
    "Install BS 5266-8 automatic testing system",
    "Have occupants report failures instead of testing",
    "Test only high-risk areas"
  ],
  correctAnswer: 1,
  explanation: "A BS 5266-8 compliant automatic testing system performs scheduled tests without manual intervention, reducing labour costs while maintaining compliance. Manual or automatic - all luminaires must be tested."
  }
];

const EmergencyLightingModule5Section3 = () => {
  useSEO({
    title: "Monthly and Annual Testing Requirements | Emergency Lighting Module 5.3",
    description: "Understand BS 5266-1 testing schedules, monthly functional tests, annual duration tests, and compliance documentation requirements."
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
            <Link to="/electrician/upskilling/emergency-lighting-module-5">
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
            <span>Module 5.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Monthly and Annual Testing Requirements
          </h1>
          <p className="text-white/80">
            Maintaining compliance through regular testing schedules
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Monthly:</strong> Functional test (1 min)</li>
              <li><strong>Annual:</strong> Duration test (3 hours)</li>
              <li><strong>Daily:</strong> Visual check (optional)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Responsibility</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Legal:</strong> Responsible person</li>
              <li><strong>Records:</strong> Log book required</li>
              <li><strong>Compliance:</strong> RRO requirement</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand testing schedules",
              "Apply BS 5266-1 requirements",
              "Manage testing programmes",
              "Maintain compliance records",
              "Identify responsible parties",
              "Use automatic testing systems"
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
            Testing Schedule Overview
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 5266-1 specifies minimum testing frequencies to ensure emergency
              lighting systems remain reliable throughout their service life.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Monthly Tests</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type:</strong> Functional test</li>
                  <li><strong>Duration:</strong> Minimum 1 minute</li>
                  <li><strong>Purpose:</strong> Verify operation</li>
                  <li><strong>Record:</strong> Log book entry</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Annual Tests</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Type:</strong> Duration test</li>
                  <li><strong>Duration:</strong> Full rated (3h)</li>
                  <li><strong>Purpose:</strong> Verify capacity</li>
                  <li><strong>Record:</strong> Full certification</li>
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
                <p className="text-white/90 text-xs">Functional</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Annual</p>
                <p className="text-white/90 text-xs">Duration</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Record Keeping Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              All test results must be recorded and retained. The log book provides
              evidence of compliance and enables identification of trends.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Log Book Contents:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>System details:</strong> Design, installation date, responsible person</li>
                <li><strong>Test records:</strong> Date, type, results, defects</li>
                <li><strong>Maintenance:</strong> Repairs, replacements, modifications</li>
                <li><strong>Certificates:</strong> Commissioning, periodic inspection</li>
                <li><strong>Drawings:</strong> Current as-built layout</li>
              </ul>
            </div>

            <p>
              BS 5266-8 specifies log book format and contents. The log book must
              be available for inspection by fire authorities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Responsible Person Duties
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Under the Regulatory Reform (Fire Safety) Order, the responsible
              person must ensure emergency lighting is properly maintained and tested.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Duties</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Ensure tests are performed</li>
                  <li>Maintain log book</li>
                  <li>Arrange repairs promptly</li>
                  <li>Keep system compliant</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Can Delegate To</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Competent staff</li>
                  <li>Maintenance contractors</li>
                  <li>FM companies</li>
                  <li>Specialist providers</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Setting Up a Testing Programme</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Identify all luminaires and circuits</li>
                <li>Schedule monthly tests (same date each month)</li>
                <li>Plan annual test during shutdown period</li>
                <li>Assign competent personnel</li>
                <li>Establish recording procedures</li>
                <li>Set up defect reporting system</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Compliance Failures</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Missed tests:</strong> — No scheduled programme</li>
                <li><strong>Poor records:</strong> — Missing or incomplete log book</li>
                <li><strong>Unrepaired defects:</strong> — Known failures not addressed</li>
                <li><strong>No responsibility:</strong> — Nobody accountable</li>
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
                <li>Annual: Full duration</li>
                <li>All: Record in log book</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Responsibility</p>
              <ul className="space-y-0.5">
                <li>RRO: Responsible person</li>
                <li>Can delegate tasks</li>
                <li>Retains accountability</li>
                <li>Log book available</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-5-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-5-section-4">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule5Section3;