import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m6s6-check1",
    question: "What types of limitations should be recorded on electrical certificates?",
    options: [
      "Only time-related constraints",
      "Access restrictions, operational constraints, time limitations, and areas not inspected",
      "Only client-requested exclusions",
      "Limitations are optional and rarely needed"
    ],
    correctIndex: 1,
    explanation: "Limitations include access restrictions (locked rooms, sealed units), operational constraints (live systems, occupied premises), time constraints, environmental conditions, safety restrictions, and any areas not inspected due to practical constraints. All limitations must be clearly documented."
  },
  {
    id: "bs7671-m6s6-check2",
    question: "How do observations differ from limitations on certificates?",
    options: [
      "They are the same thing",
      "Observations are optional, limitations are mandatory",
      "Observations record defects found; limitations record areas not inspected",
      "Observations are for new installations only"
    ],
    correctIndex: 2,
    explanation: "Observations record actual defects, non-compliance issues, or areas requiring attention found during inspection. Limitations record areas that could not be inspected or tested. Observations require action, while limitations explain scope restrictions."
  },
  {
    id: "bs7671-m6s6-check3",
    question: "What are the safety observation codes C1, C2, C3, and FI?",
    options: [
      "Different certificate types",
      "C1=Danger present, C2=Potentially dangerous, C3=Improvement recommended, FI=Further investigation",
      "Testing equipment categories",
      "Installation method references"
    ],
    correctIndex: 1,
    explanation: "C1 = Danger present (immediate action required), C2 = Potentially dangerous (urgent remedial action required), C3 = Improvement recommended (non-urgent), FI = Further investigation needed. These codes classify the severity and urgency of safety issues found."
  }
];

const faqs = [
  {
    question: "How many limitations can a certificate have before it becomes invalid?",
    answer: "There's no fixed number, but professional judgment is required. If limitations affect more than 25% of the installation or exclude critical safety systems (main distribution, earthing arrangements), the certificate may not provide meaningful safety assurance."
  },
  {
    question: "Should I refuse to issue a certificate if there are extensive limitations?",
    answer: "In some cases, yes. If limitations are so extensive that the inspection cannot meaningfully assess installation safety, it may be appropriate to decline certification and recommend arranging proper access before inspection."
  },
  {
    question: "How should I communicate C1 defects to clients?",
    answer: "C1 defects require immediate verbal communication followed by written notification. Explain the danger clearly, recommend immediate isolation of affected circuits, and document the client's response. Never leave without ensuring the client understands the urgency."
  }
];

const quizQuestion = {
  question: "During an EICR, you cannot access 40% of the installation due to tenant restrictions. What is the correct approach?",
  options: [
    "Issue a satisfactory certificate for the areas you could inspect",
    "Refuse to issue any certificate until full access is available",
    "Document all limitations clearly and assess if meaningful certification is possible",
    "Assume the inaccessible areas are satisfactory based on the areas tested"
  ],
  correctAnswer: 2,
  explanation: "You should document all limitations clearly and use professional judgment to assess whether meaningful certification is possible. With 40% inaccessible, the certificate may have limited value - this should be explained to the client. Recording limitations protects both parties legally while ensuring transparency about inspection scope."
};

const BS7671Module6Section6 = () => {
  useSEO({
    title: "Limitations and Observations in Certificates | BS7671 Module 6.6",
    description: "Learn how to properly record limitations and observations on electrical certificates, including C1, C2, C3, and FI coding."
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
            <Link to="/study-centre/upskilling/bs7671-module-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 6.6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Limitations and Observations in Certificates
          </h1>
          <p className="text-white/80">
            Recording scope restrictions and safety defects for legal protection and client clarity
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Limitations:</strong> What couldn't be inspected and why</li>
              <li><strong>Observations:</strong> Defects found with C1/C2/C3/FI codes</li>
              <li><strong>Purpose:</strong> Legal protection and client transparency</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Inaccessible areas, defects, non-compliance issues</li>
              <li><strong>Use:</strong> Clear documentation protects everyone involved</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify and record appropriate limitations on certificates",
              "Document observations using correct safety codes",
              "Understand legal implications of limitations and observations",
              "Apply professional judgment for certificate validity decisions"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: Understanding Limitations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Understanding Limitations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Limitations record aspects of the installation that could not be inspected or tested due to
              practical constraints. They protect electricians from liability for undiscovered defects in
              inaccessible areas while informing clients of inspection scope restrictions.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Access Limitations</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Physical barriers:</strong> Locked rooms, sealed voids</li>
                  <li><strong>Height restrictions:</strong> Specialist access needed</li>
                  <li><strong>Safety restrictions:</strong> Hazardous areas, asbestos</li>
                  <li><strong>Occupied premises:</strong> Areas in continuous use</li>
                  <li><strong>Third-party:</strong> Tenant areas, separate ownerships</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Operational Limitations</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Live systems:</strong> Circuits that cannot be isolated</li>
                  <li><strong>Critical processes:</strong> IT systems, medical equipment</li>
                  <li><strong>Time constraints:</strong> Limited inspection windows</li>
                  <li><strong>Environmental:</strong> Weather, seasonal access</li>
                  <li><strong>Equipment:</strong> Specialist test equipment unavailable</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20 my-6">
              <p className="text-sm font-medium text-elec-yellow mb-2">Impact on Certificate Validity</p>
              <p className="text-sm text-white mb-3">
                Extensive limitations may affect certificate validity. Professional judgment determines whether
                sufficient inspection was completed to provide meaningful safety certification.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-white mb-1">Acceptable (&lt;10%)</p>
                  <ul className="text-xs text-white/80 space-y-0.5">
                    <li>Minor access restrictions</li>
                    <li>Non-critical circuit elements</li>
                    <li>Temporary operational needs</li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-white mb-1">Problematic (&gt;25%)</p>
                  <ul className="text-xs text-white/80 space-y-0.5">
                    <li>Critical safety systems inaccessible</li>
                    <li>Main distribution restricted</li>
                    <li>Widespread access problems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 2: Safety Observation Codes */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Safety Observation Codes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Observations record defects and non-compliance issues found during inspection. Each observation
              is classified using standardised codes that indicate severity and required response time.
            </p>

            <div className="space-y-3 my-6">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold shrink-0">C1</span>
                <div>
                  <p className="font-medium text-white">Danger Present - Immediate Action</p>
                  <p className="text-sm text-white/80">Installation or circuits should be isolated immediately until remedial action is completed</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold shrink-0">C2</span>
                <div>
                  <p className="font-medium text-white">Potentially Dangerous - Urgent Action</p>
                  <p className="text-sm text-white/80">Could become dangerous under fault conditions or with deterioration - rectify urgently</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <span className="bg-elec-yellow text-[#1a1a1a] px-2 py-1 rounded text-xs font-bold shrink-0">C3</span>
                <div>
                  <p className="font-medium text-white">Improvement Recommended</p>
                  <p className="text-sm text-white/80">Does not comply with current standards but not dangerous - improvement would enhance safety</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold shrink-0">FI</span>
                <div>
                  <p className="font-medium text-white">Further Investigation Required</p>
                  <p className="text-sm text-white/80">Requires additional investigation to determine if defect exists - may need specialist assessment</p>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 3: Client Communication */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Client Communication
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective communication ensures clients understand both limitations and observations, enabling
              informed decisions about remedial action and future inspections.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Pre-Inspection Briefing</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Clearly define inspection scope</li>
                  <li>Discuss necessary access arrangements</li>
                  <li>Explain how limitations affect validity</li>
                  <li>Provide realistic timeframes</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Post-Inspection Explanation</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Provide clear overview of findings</li>
                  <li>Explain C1, C2, C3, FI significance</li>
                  <li>Help understand safety implications</li>
                  <li>Suggest appropriate response timescales</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">Follow-up by Code Priority:</p>
              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                  <p className="font-medium text-red-400/80 mb-1">C1 Actions</p>
                  <p className="text-white/90 text-xs">Immediate isolation</p>
                  <p className="text-white/90 text-xs">Emergency referral</p>
                </div>
                <div className="p-3 rounded bg-orange-500/10 border border-orange-500/20">
                  <p className="font-medium text-orange-400/80 mb-1">C2 Actions</p>
                  <p className="text-white/90 text-xs">Priority scheduling</p>
                  <p className="text-white/90 text-xs">Urgent remediation</p>
                </div>
                <div className="p-3 rounded bg-elec-yellow/10 border border-elec-yellow/20">
                  <p className="font-medium text-elec-yellow/80 mb-1">C3 Actions</p>
                  <p className="text-white/90 text-xs">Planned improvement</p>
                  <p className="text-white/90 text-xs">Future consideration</p>
                </div>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 4: Legal Protection */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Legal Protection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper limitation and observation recording is essential for professional protection. Inadequate
              documentation can create liability exposure and compromise insurance coverage.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400/80 mb-2">Documentation Risks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Incomplete limitation recording</li>
                  <li>Vague or ambiguous descriptions</li>
                  <li>Incorrect safety code assignment</li>
                  <li>Missing regulatory references</li>
                  <li>Delayed remedial action advice</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-400/80 mb-2">Best Practice Protection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Comprehensive limitation recording</li>
                  <li>Clear client communication protocols</li>
                  <li>Photographic evidence retention</li>
                  <li>Client acknowledgment records</li>
                  <li>Follow-up communication trails</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
            <p className="text-sm font-medium text-elec-yellow mb-2">Victorian School Conversion - Complex EICR</p>
            <p className="text-sm text-white mb-3">
              A landlord EICR for a Victorian school building converted to apartments required extensive
              limitation and observation documentation due to multiple constraints.
            </p>
            <p className="text-sm font-medium text-white mb-2">Limitations Documented:</p>
            <ul className="text-sm text-white space-y-1 ml-4 mb-3">
              <li>40% of final circuits inaccessible (tenant occupancy)</li>
              <li>Roof voids restricted (asbestos survey)</li>
              <li>Main incomer couldn't be isolated (essential services)</li>
              <li>Emergency lighting limited testing (evening access only)</li>
            </ul>
            <p className="text-sm text-elec-yellow/80">
              <strong>Outcome:</strong> Clear documentation protected the electrician while enabling the
              client to understand inspection scope and plan future access for complete testing.
            </p>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

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

        {/* Quick Reference Card */}
        <div className="mt-6 p-5 rounded-lg bg-transparent border border-white/10">
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Observation Codes</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Immediate Response Required</p>
              <ul className="space-y-0.5">
                <li><strong>C1:</strong> Isolate immediately, emergency remediation</li>
                <li><strong>C2:</strong> Schedule urgent repairs within days</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">Planned Response</p>
              <ul className="space-y-0.5">
                <li><strong>C3:</strong> Plan improvements, not urgent</li>
                <li><strong>FI:</strong> Arrange further investigation</li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-white/5 my-12" />

        {/* Quiz Section */}
        <section className="mb-10">
          <SingleQuestionQuiz
            question={quizQuestion.question}
            options={quizQuestion.options}
            correctAnswer={quizQuestion.correctAnswer}
            explanation={quizQuestion.explanation}
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
            <Link to="/study-centre/upskilling/bs7671-module-6-section-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-7">
              Next Module
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module6Section6;
