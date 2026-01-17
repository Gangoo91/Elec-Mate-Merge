import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import UnitsPocketCard from "@/components/apprentice-courses/UnitsPocketCard";
import useSEO from "@/hooks/useSEO";

const TITLE = "Minor Works & EICR - Module 8 Section 5";
const DESCRIPTION = "Learn when to use Minor Works Certificates and Electrical Installation Condition Reports (EICRs), including observation codes and classification systems.";

const quickCheckQuestions = [
  {
    id: "minor-works-when",
    question: "When should a Minor Works Certificate be used instead of an EIC?",
    options: [
      "For all small jobs",
      "For work that does not include adding a new circuit",
      "Only for repairs",
      "Only for non-notifiable work"
    ],
    correctIndex: 1,
    explanation: "A Minor Works Certificate is used for alterations or additions that do not extend to the provision of a new circuit. Examples include adding a socket to an existing circuit or replacing a consumer unit."
  },
  {
    id: "eicr-c1-meaning",
    question: "What does classification code C1 indicate on an EICR?",
    options: [
      "Satisfactory condition",
      "Improvement recommended",
      "Danger present - immediate remedial action required",
      "Further investigation required"
    ],
    correctIndex: 2,
    explanation: "C1 indicates danger is present and risk of injury exists. Immediate remedial action is required. The person responsible should be informed and the danger made safe immediately."
  },
  {
    id: "eicr-overall-assessment",
    question: "If an EICR has one C2 and several C3 observations, what is the overall assessment?",
    options: [
      "Satisfactory",
      "Unsatisfactory",
      "Depends on the age of installation",
      "Further assessment needed"
    ],
    correctIndex: 1,
    explanation: "Any C1 or C2 observation results in an 'Unsatisfactory' overall assessment. The installation does not meet the required standard and remedial work is needed."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "When should a Minor Works Certificate be used instead of an EIC?",
    options: [
      "For all small jobs",
      "For work that does not include adding a new circuit",
      "Only for repairs",
      "Only for non-notifiable work"
    ],
    correctAnswer: 1,
    explanation: "A Minor Works Certificate is used for alterations or additions that do not extend to the provision of a new circuit. Examples include adding a socket to an existing circuit or replacing a consumer unit."
  },
  {
    id: 2,
    question: "What does an EICR assess?",
    options: [
      "New installation compliance only",
      "The condition of an existing electrical installation",
      "Individual circuit installation",
      "Equipment warranty status"
    ],
    correctAnswer: 1,
    explanation: "An Electrical Installation Condition Report (EICR) assesses the condition of an existing installation, identifying defects and providing an overall assessment of safety."
  },
  {
    id: 3,
    question: "What does classification code C1 indicate on an EICR?",
    options: [
      "Satisfactory condition",
      "Improvement recommended",
      "Danger present - immediate remedial action required",
      "Further investigation required"
    ],
    correctAnswer: 2,
    explanation: "C1 indicates danger is present and risk of injury exists. Immediate remedial action is required. The person responsible should be informed and the danger made safe immediately."
  },
  {
    id: 4,
    question: "What does classification code C2 indicate?",
    options: [
      "Danger present",
      "Potentially dangerous - urgent remedial action required",
      "Minor cosmetic issue",
      "Item not tested"
    ],
    correctAnswer: 1,
    explanation: "C2 indicates a potentially dangerous condition that requires urgent remedial action. While not immediately dangerous like C1, it could become dangerous and needs prompt attention."
  },
  {
    id: 5,
    question: "What does classification code C3 indicate?",
    options: [
      "Dangerous condition",
      "Potentially dangerous",
      "Improvement recommended but not dangerous",
      "Item not inspected"
    ],
    correctAnswer: 2,
    explanation: "C3 indicates improvement is recommended. The issue doesn't create immediate danger but improvement would enhance safety. The client should consider this remedial work."
  },
  {
    id: 6,
    question: "What does 'FI' (Further Investigation) indicate on an EICR?",
    options: [
      "A fault has been found and repaired",
      "A potential issue requiring more detailed investigation",
      "Full inspection was completed",
      "Testing was not done"
    ],
    correctAnswer: 1,
    explanation: "FI indicates further investigation is needed to determine the nature and extent of a potential defect. The inspector couldn't fully assess the condition without additional work."
  },
  {
    id: 7,
    question: "If an EICR has one C2 and several C3 observations, what is the overall assessment?",
    options: [
      "Satisfactory",
      "Unsatisfactory",
      "Depends on the age of installation",
      "Further assessment needed"
    ],
    correctAnswer: 1,
    explanation: "Any C1 or C2 observation results in an 'Unsatisfactory' overall assessment. The installation does not meet the required standard and remedial work is needed."
  },
  {
    id: 8,
    question: "Can a Minor Works Certificate have multiple entries?",
    options: [
      "No - one certificate per item of work",
      "Yes - for up to 5 separate items",
      "Yes - if all work is on the same circuit",
      "Only if requested by the client"
    ],
    correctAnswer: 2,
    explanation: "A single Minor Works Certificate can cover multiple items of work if they are all on the same circuit. Separate circuits or larger scope work requires an EIC."
  },
  {
    id: 9,
    question: "Who is responsible for remedying defects identified on an EICR?",
    options: [
      "The inspector who carried out the report",
      "The person responsible for the installation (duty holder/owner)",
      "The original installer",
      "The DNO"
    ],
    correctAnswer: 1,
    explanation: "The duty holder (usually the property owner or landlord) is responsible for arranging remedial work. The inspector reports findings but isn't responsible for remediation unless commissioned to do so."
  },
  {
    id: 10,
    question: "A Minor Works Certificate requires how many signatures?",
    options: [
      "One - the installer only",
      "Two - installer and supervisor",
      "One - the installer, who takes responsibility for design and construction",
      "Three - like an EIC"
    ],
    correctAnswer: 2,
    explanation: "A Minor Works Certificate has a single signature from the person carrying out the work, who takes responsibility for design, construction, and inspection/testing of the minor work."
  }
];

const faqs = [
  {
    question: "What's the difference between an EIC and EICR?",
    answer: "An EIC (Electrical Installation Certificate) is for new work - new installations or additions. An EICR (Electrical Installation Condition Report) assesses existing installations to determine their condition and safety. They serve different purposes."
  },
  {
    question: "Is replacing a consumer unit Minor Works or EIC?",
    answer: "Typically a Minor Works Certificate, as you're not adding new circuits. However, if circuit protection is upgraded (adding RCBOs/RCDs) or any new circuits are added, an EIC may be more appropriate. Some schemes specify EIC for consumer unit changes."
  },
  {
    question: "Can I convert C2 observations to C3 if the client accepts the risk?",
    answer: "No. Classification codes are based on technical assessment, not client preference. C2 means potentially dangerous and urgent remedial action is required. The overall assessment remains Unsatisfactory regardless of client acceptance."
  },
  {
    question: "What if I can't complete all tests during an EICR?",
    answer: "Record limitations clearly. Items not inspected should be listed. Use 'LIM' for limitations and 'FI' where further investigation is needed. The extent of inspection achieved should be clear."
  },
  {
    question: "How often is an EICR required for rental properties?",
    answer: "In England, landlords must have an EICR every 5 years (or as recommended on previous report if sooner). Scotland has similar requirements. The report must be provided to tenants and the local authority if requested."
  },
  {
    question: "What happens if observations are found during Minor Works?",
    answer: "Record any observations on the Minor Works Certificate. If you discover dangerous conditions in the existing installation (not related to your work), advise the client in writing and recommend a full EICR."
  }
];

const InspectionTestingModule8Section5 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      {/* Minimal Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="../module-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
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
            <span>Module 8 Section 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Minor Works & EICR
          </h1>
          <p className="text-white/80">
            Select the correct certification for each job and apply observation codes correctly
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Minor Works:</strong> No new circuits added</li>
              <li><strong>EICR:</strong> Condition report for existing installations</li>
              <li><strong>C1/C2:</strong> = Unsatisfactory overall</li>
              <li><strong>C3:</strong> = Improvement recommended only</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Code Reference</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>C1:</strong> Danger present - immediate action</li>
              <li><strong>C2:</strong> Potentially dangerous - urgent</li>
              <li><strong>C3:</strong> Improvement recommended</li>
              <li><strong>FI:</strong> Further investigation needed</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand when Minor Works Certificates apply",
              "Complete EICRs correctly with appropriate codes",
              "Apply C1, C2, C3, and FI classification codes",
              "Determine overall installation condition",
              "Choose the correct certificate for each situation",
              "Issue professional, compliant documentation"
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

        {/* Section 1: Minor Works Certificate */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Minor Works Certificate
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A Minor Works Certificate is used for additions or alterations to an existing installation that do not include adding a new circuit:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Examples of Minor Works</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Adding a socket outlet to an existing circuit</li>
                <li>Replacing a consumer unit (same circuits)</li>
                <li>Adding a light point to an existing lighting circuit</li>
                <li>Replacing an accessory like-for-like</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> The certificate has a single signature - the installer takes responsibility for design, construction, and inspection/testing of the minor work.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2: EICR Purpose and Application */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            EICR Purpose and Application
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              An Electrical Installation Condition Report assesses the safety and condition of an existing electrical installation:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">When EICR is Required</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Periodic inspection (5 years domestic, varies by use)</li>
                <li>Change of property use or occupancy</li>
                <li>Before major alterations or additions</li>
                <li>Rental properties (legal requirement)</li>
                <li>Property sale (buyer/seller request)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Classification Codes */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Classification Codes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              EICR observations are classified using standard codes that indicate severity:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-red-500/30">
                <p className="font-medium text-red-400 mb-1">C1 - Danger Present</p>
                <p className="text-white/80 text-xs">Risk of injury. Immediate remedial action required. Person responsible must be informed immediately.</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-amber-500/30">
                <p className="font-medium text-amber-400 mb-1">C2 - Potentially Dangerous</p>
                <p className="text-white/80 text-xs">Urgent remedial action required. May become dangerous under fault conditions or in future.</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-blue-500/30">
                <p className="font-medium text-blue-400 mb-1">C3 - Improvement Recommended</p>
                <p className="text-white/80 text-xs">Not dangerous but improvement would enhance safety. Client should consider the recommendation.</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-purple-500/30">
                <p className="font-medium text-purple-400 mb-1">FI - Further Investigation</p>
                <p className="text-white/80 text-xs">Cannot fully assess without further investigation. May require intrusive inspection or specialist assessment.</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 4: Overall Assessment */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Overall Assessment
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The EICR requires an overall assessment of whether the installation is satisfactory:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-3 rounded bg-transparent border border-green-500/30">
                <p className="font-medium text-green-400 mb-1">SATISFACTORY</p>
                <p className="text-white/80 text-xs">No C1 or C2 observations. Installation meets the required standard. May have C3 recommendations but these don't affect the overall assessment.</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-red-500/30">
                <p className="font-medium text-red-400 mb-1">UNSATISFACTORY</p>
                <p className="text-white/80 text-xs">Any C1 or C2 observations. Installation does not meet the required standard. Remedial work is required to make it satisfactory.</p>
              </div>
            </div>

            <p className="text-sm text-amber-400/80">
              <strong>Note:</strong> FI (Further Investigation) items should be listed but don't directly affect the overall assessment until investigated and classified.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 5: Choosing the Right Certificate */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Choosing the Right Certificate
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Selecting the correct certification document is essential:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Certificate Selection Guide</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 rounded bg-transparent">
                  <p className="text-white/90">New installation</p>
                  <p className="text-elec-yellow font-semibold">EIC</p>
                </div>
                <div className="p-2 rounded bg-transparent">
                  <p className="text-white/90">New circuit added</p>
                  <p className="text-elec-yellow font-semibold">EIC</p>
                </div>
                <div className="p-2 rounded bg-transparent">
                  <p className="text-white/90">Socket added (existing circuit)</p>
                  <p className="text-elec-yellow font-semibold">Minor Works</p>
                </div>
                <div className="p-2 rounded bg-transparent">
                  <p className="text-white/90">Consumer unit replacement</p>
                  <p className="text-elec-yellow font-semibold">Minor Works*</p>
                </div>
                <div className="p-2 rounded bg-transparent">
                  <p className="text-white/90">Periodic inspection</p>
                  <p className="text-elec-yellow font-semibold">EICR</p>
                </div>
                <div className="p-2 rounded bg-transparent">
                  <p className="text-white/90">Pre-purchase check</p>
                  <p className="text-elec-yellow font-semibold">EICR</p>
                </div>
              </div>
              <p className="text-white/50 text-xs mt-2">*Some schemes require EIC for consumer unit changes</p>
            </div>
          </div>
        </section>

        {/* Section 6: Professional Standards */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">06</span>
            Professional Standards
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certification documentation reflects professional standards and carries legal significance:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Professional Obligations</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Certificates are legal documents - accuracy is essential</li>
                <li>Never issue false or misleading certificates</li>
                <li>Keep copies for required retention periods</li>
                <li>Use only model forms or approved equivalents</li>
                <li>Complete all sections - don't leave blanks</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-white/5 my-12" />

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Good Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Be clear and specific - observations should describe the defect and location</li>
                <li>Help clients understand what codes mean and what action is needed</li>
                <li>Document limitations clearly - state what couldn't be inspected and why</li>
                <li>Record all findings accurately - never understate or overstate</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Tips for EICRs</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Use photographs to support observations</li>
                <li>Reference regulation numbers where helpful</li>
                <li>Suggest remedial actions where appropriate</li>
                <li>Explain the overall assessment to the client</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Changing codes on request</strong> - codes are technical assessments, not negotiable</li>
                <li><strong>Vague observations</strong> - be specific about defect and location</li>
                <li><strong>Missing limitations</strong> - always document what couldn't be inspected</li>
                <li><strong>Wrong certificate type</strong> - choose the correct document for the work</li>
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

        {/* Reference Cards */}
        <section className="mb-10">
          <UnitsPocketCard />

          <div className="mt-6 p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">EICR Codes Reference</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Classification Codes</p>
                <ul className="space-y-0.5">
                  <li>C1 = Danger present - immediate</li>
                  <li>C2 = Potentially dangerous - urgent</li>
                  <li>C3 = Improvement recommended</li>
                  <li>FI = Further investigation</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Certificate Selection</p>
                <ul className="space-y-0.5">
                  <li>New circuits = EIC</li>
                  <li>Existing circuit work = Minor Works</li>
                  <li>Condition check = EICR</li>
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

        {/* Course Complete Section */}
        <section className="mb-10 p-6 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-white mb-2">Course Complete!</h3>
          <p className="text-white/70 mb-4">
            Congratulations! You've completed all 8 modules of the Inspection & Testing course covering BS 7671 requirements.
          </p>
          <div className="text-left text-sm text-white/70 bg-white/5 rounded-lg p-4 mb-4">
            <ul className="space-y-1">
              <li>Module 1: Introduction to I&T</li>
              <li>Module 2: Safe Isolation</li>
              <li>Module 3: Continuity Testing</li>
              <li>Module 4: Insulation Resistance</li>
              <li>Module 5: Earth Fault Loop Impedance</li>
              <li>Module 6: RCD Testing</li>
              <li>Module 7: Polarity & Functional Testing</li>
              <li>Module 8: Visual Inspection & Documentation</li>
            </ul>
          </div>
          <p className="text-elec-yellow text-sm">
            Return to the course page to review any modules or explore other courses.
          </p>
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing/module-8/section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/upskilling/inspection-testing">
              Complete Course
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default InspectionTestingModule8Section5;
