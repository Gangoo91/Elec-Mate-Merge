import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m8s2-check1",
    question: "Which appendix contains the model forms for electrical certificates?",
    options: ["Appendix 4", "Appendix 6", "Appendix 12", "Appendix 15"],
    correctIndex: 1,
    explanation: "Appendix 6 contains all model forms including EIC, MEIWC, EICR, and associated schedules. These forms are the basis for certification requirements."
  },
  {
    id: "bs7671-m8s2-check2",
    question: "What must be provided with an Electrical Installation Certificate?",
    options: [
      "Schedule of Inspections and Schedule of Test Results",
      "Only test results",
      "Only visual inspection checklist",
      "A quote for remedial work"
    ],
    correctIndex: 0,
    explanation: "An EIC must be accompanied by both a Schedule of Inspections (visual inspection checklist) and Schedule of Test Results showing all measured values."
  },
  {
    id: "bs7671-m8s2-check3",
    question: "When completing an EICR, what observation code indicates a danger present?",
    options: ["C1", "C2", "C3", "FI"],
    correctIndex: 0,
    explanation: "C1 indicates danger present requiring immediate remedial action. C2 is potentially dangerous, C3 is recommended improvement, and FI means further investigation required."
  }
];

const faqs = [
  {
    question: "Who can sign an Electrical Installation Certificate?",
    answer: "The designer, constructor (installer), and person responsible for inspection and testing must all sign. This may be one person if they performed all roles, or three different qualified persons."
  },
  {
    question: "When is a Minor Electrical Installation Works Certificate appropriate?",
    answer: "MEIWC is for minor works that don't include new circuits. Examples: adding a socket to an existing circuit, replacing a consumer unit like-for-like. New circuits always require full EIC."
  },
  {
    question: "How often should periodic inspection be carried out?",
    answer: "IET Guidance Note 3 recommends intervals based on installation type: domestic every 10 years (or change of occupancy), commercial 5 years, industrial 3 years, but risk assessment may require more frequent inspection."
  },
  {
    question: "What's the difference between a limitation and an observation?",
    answer: "Limitations explain parts of installation that couldn't be inspected/tested (e.g., access restrictions). Observations are defects or issues found during inspection, coded C1, C2, C3, or FI."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "A socket outlet is being added to an existing ring final circuit. What certification is required?",
  options: [
    "Full Electrical Installation Certificate",
    "Minor Electrical Installation Works Certificate",
    "Electrical Installation Condition Report",
    "No certification required"
  ],
  correctAnswer: 1,
  explanation: "Adding a socket to an existing circuit is minor work not involving a new circuit. A Minor Electrical Installation Works Certificate (MEIWC) is appropriate, covering the addition and confirming the existing circuit remains satisfactory."
  }
];

const BS7671Module8Section2 = () => {
  useSEO({
    title: "Schedules, Checklists & Reference Charts | BS7671 Module 8.2",
    description: "Master BS 7671 model forms, certification requirements, and documentation best practices for electrical installations."
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
            <Link to="/electrician/upskilling/bs7671-module-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 8
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Centered Page Title Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 8.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Schedules, Checklists, and Reference Charts
          </h1>
          <p className="text-white/80">
            Documentation tools and quality control for certification
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Appendix 6:</strong> All model certification forms</li>
              <li><strong>EIC:</strong> New installations + major alterations</li>
              <li><strong>EICR:</strong> Periodic inspection + condition reports</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Every completed electrical job requires certification</li>
              <li><strong>Use:</strong> Select correct form, complete fully, retain records</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Model forms in Appendix 6",
              "When to use EIC vs MEIWC vs EICR",
              "Completing schedules of inspections and tests",
              "Observation coding (C1, C2, C3, FI)",
              "Quality control processes",
              "Record retention requirements"
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
            Certification Types
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              BS 7671 requires specific certification for different types of work. Choosing
              the correct form is essential for compliance and legal protection.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">EIC</p>
                <p className="text-white/90 text-xs">New installations</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">MEIWC</p>
                <p className="text-white/90 text-xs">Minor works</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">EICR</p>
                <p className="text-white/90 text-xs">Periodic inspection</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">EIC Required For</p>
                <ul className="text-sm text-white space-y-1">
                  <li>New electrical installations</li>
                  <li>Additions of new circuits</li>
                  <li>Major alterations</li>
                  <li>Consumer unit replacements (new type)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">MEIWC Suitable For</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Adding socket to existing circuit</li>
                  <li>Like-for-like replacements</li>
                  <li>Minor alterations without new circuits</li>
                  <li>Repairs to existing installation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Schedule of Inspections
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The Schedule of Inspections is a systematic checklist covering all aspects
              of visual inspection. It must accompany both EIC and EICR.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Inspection Areas:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consumer unit and distribution equipment</li>
                <li>Circuits, cable selection, and installation methods</li>
                <li>Accessories and equipment</li>
                <li>Earthing and bonding arrangements</li>
                <li>Labelling and documentation</li>
              </ul>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Marking System:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>✓ (tick):</strong> Inspected and satisfactory</li>
                <li><strong>✗ (cross):</strong> Inspected, not satisfactory</li>
                <li><strong>N/A:</strong> Not applicable to this installation</li>
                <li><strong>LIM:</strong> Limitation - could not inspect</li>
              </ul>
            </div>

            <p>
              Every item must be marked. Blank entries suggest incomplete inspection and
              undermine the validity of the certificate.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            EICR Observation Codes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Electrical Installation Condition Reports use standardised codes to classify
              the severity of defects found during periodic inspection.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Observation Codes</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>C1:</strong> Danger present - immediate action</li>
                  <li><strong>C2:</strong> Potentially dangerous - urgent action</li>
                  <li><strong>C3:</strong> Improvement recommended</li>
                  <li><strong>FI:</strong> Further investigation required</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Overall Condition</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Satisfactory:</strong> No C1, C2, or FI codes</li>
                  <li><strong>Unsatisfactory:</strong> Any C1, C2, or FI present</li>
                  <li>C3 alone = Satisfactory overall</li>
                  <li>Must recommend next inspection date</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Code Examples:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>C1:</strong> Live parts exposed, missing cover on CU</li>
                <li><strong>C2:</strong> Earthing conductor undersized, absent bonding</li>
                <li><strong>C3:</strong> Obsolete wiring accessories, improvement to labelling</li>
                <li><strong>FI:</strong> Hidden junction box location unknown</li>
              </ul>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Quality Control and Records
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Proper documentation protects both the client and the electrician. Quality
              control processes ensure certificates are accurate and complete.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Quality Checks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>All sections completed</li>
                  <li>Test results within limits</li>
                  <li>Signatures present where required</li>
                  <li>Schedules attached</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Record Retention</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Contractor: retain copy for records</li>
                  <li>Client: retain for life of installation</li>
                  <li>Building Control: copy where notifiable</li>
                  <li>Digital records acceptable</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Common Completion Errors:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Missing or incorrect address details</li>
                <li>Incomplete schedule entries</li>
                <li>Test results without circuit identification</li>
                <li>Missing next inspection recommendation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Certificate Completion Process</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete test results schedule during testing</li>
                <li>Complete inspection schedule during visual inspection</li>
                <li>Transfer key values to main certificate</li>
                <li>Review all sections before signing</li>
                <li>Provide copy to client immediately</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong form:</strong> — Using MEIWC for new circuit</li>
                <li><strong>Incomplete schedules:</strong> — Blank entries or missing pages</li>
                <li><strong>Missing signatures:</strong> — Not all responsible parties signed</li>
                <li><strong>No copy retained:</strong> — No record for contractor files</li>
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
              <p className="font-medium text-white mb-1">Certificate Types</p>
              <ul className="space-y-0.5">
                <li>EIC: New work + new circuits</li>
                <li>MEIWC: Minor work only</li>
                <li>EICR: Periodic inspection</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Observation Codes</p>
              <ul className="space-y-0.5">
                <li>C1: Danger present</li>
                <li>C2: Potentially dangerous</li>
                <li>C3: Improvement recommended</li>
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
            <Link to="/study-centre/upskilling/bs7671-module-8-section-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/upskilling/bs7671-module-8-section-3">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module8Section2;