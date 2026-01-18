import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m5s1-check1",
    question: "What must be verified before energising an emergency lighting system?",
    options: ["Colour of luminaires", "Visual inspection complete", "Cost of installation", "Building occupancy"],
    correctIndex: 1,
    explanation: "A thorough visual inspection must be completed before energising any electrical installation. This confirms correct installation, appropriate equipment, and absence of obvious defects."
  },
  {
    id: "emergencylighting-m5s1-check2",
    question: "What document confirms luminaire positions match the design?",
    options: ["Invoice", "As-built drawing", "Manufacturer brochure", "Building plan"],
    correctIndex: 1,
    explanation: "As-built drawings should be compared against the actual installation to confirm all luminaires are positioned correctly and the design intent has been achieved."
  },
  {
    id: "emergencylighting-m5s1-check3",
    question: "What should be checked regarding cable installation?",
    options: ["Cable colour only", "Fire resistance and fixings", "Cable manufacturer", "Cable price"],
    correctIndex: 1,
    explanation: "Cable fire resistance and appropriate fixings must be verified. Fire-resistant cables with metal fixings are essential for emergency lighting circuit integrity during fire conditions."
  }
];

const faqs = [
  {
    question: "Who should carry out initial inspection?",
    answer: "A competent person with appropriate knowledge and experience of emergency lighting systems. This is typically an electrician with emergency lighting training who understands BS 5266-1 and BS 7671 requirements."
  },
  {
    question: "What if the installation doesn't match the design?",
    answer: "Discrepancies must be documented and either corrected or the as-built drawings updated. Significant deviations may require re-approval from the designer or building control to ensure compliance."
  },
  {
    question: "Can inspection be combined with testing?",
    answer: "While often done together, inspection should be substantially complete before energising for testing. Visual inspection without power identifies issues that might be dangerous to test with power applied."
  },
  {
    question: "What inspection records are required?",
    answer: "A checklist or schedule documenting what was inspected, any defects found, and confirmation of compliance. This forms part of the handover documentation and commissioning records."
  }
];

const quizQuestions = [
  {
    id: 1,
  question: "Before energising a new emergency lighting installation, what must be verified first?",
  options: [
    "System cost is within budget",
    "Visual inspection confirms correct installation",
    "Client has signed off the project",
    "Building is fully occupied"
  ],
  correctAnswer: 1,
  explanation: "Visual inspection must confirm correct installation before any energisation. This includes checking luminaire positions, cable types, fixings, and connections match the design specification."
  }
];

const EmergencyLightingModule5Section1 = () => {
  useSEO({
    title: "Initial Inspection and Verification | Emergency Lighting Module 5.1",
    description: "Systematic inspection procedures to verify emergency lighting installations comply with BS 5266-1 and BS 7671 before commissioning."
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
            <span>Module 5.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Initial Inspection and Verification
          </h1>
          <p className="text-white/80">
            Pre-commissioning inspection procedures for compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Visual:</strong> Before energising</li>
              <li><strong>Design check:</strong> Against as-built</li>
              <li><strong>Documentation:</strong> Inspection records</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Key Checks</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Luminaires:</strong> Position and type</li>
              <li><strong>Cables:</strong> Fire resistance</li>
              <li><strong>Fixings:</strong> Metal clips</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Conduct systematic visual inspection",
              "Verify installation against design",
              "Check cable and fixing compliance",
              "Document inspection findings",
              "Identify common installation defects",
              "Prepare for commissioning tests"
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
            Visual Inspection Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Before energising any emergency lighting system, a thorough visual
              inspection confirms the installation is safe and matches the approved design.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Luminaire Checks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Correct type (M/NM)</li>
                  <li>Position matches design</li>
                  <li>Secure mounting</li>
                  <li>Undamaged condition</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Cable Checks</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Fire-resistant type</li>
                  <li>Metal fixings used</li>
                  <li>Correct spacing</li>
                  <li>Fire stopping complete</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Visual</p>
                <p className="text-white/90 text-xs">Before power</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Design</p>
                <p className="text-white/90 text-xs">Match check</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Record</p>
                <p className="text-white/90 text-xs">Document all</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Design Verification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Compare the actual installation against approved design documents to
              ensure the emergency lighting system meets specified requirements.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Verification Points:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Luminaire positions:</strong> Match layout drawing</li>
                <li><strong>Luminaire types:</strong> Correct models specified</li>
                <li><strong>Exit signs:</strong> Locations and viewing distances</li>
                <li><strong>Circuit allocation:</strong> Per design schedule</li>
                <li><strong>Coverage:</strong> Escape routes covered</li>
              </ul>
            </div>

            <p>
              Any discrepancies between design and installation must be documented.
              Significant changes may require designer approval or updated calculations.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Documentation Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Inspection findings must be recorded to demonstrate compliance and
              provide a baseline for future maintenance.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Records</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Checklist completion</li>
                  <li>Defect register</li>
                  <li>Photographic evidence</li>
                  <li>Inspector signature</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supporting Documents</p>
                <ul className="text-sm text-white space-y-1">
                  <li>As-built drawings</li>
                  <li>Product certificates</li>
                  <li>Fire stopping certificates</li>
                  <li>Design specification</li>
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Inspection Sequence</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Obtain and review design documents</li>
                <li>Walk escape routes with drawings</li>
                <li>Check each luminaire position and type</li>
                <li>Verify cable routes and fixings</li>
                <li>Inspect fire stopping at penetrations</li>
                <li>Record findings and sign off</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Inspection Findings</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Wrong luminaire type:</strong> — NM where M required</li>
                <li><strong>Missing luminaires:</strong> — At direction changes</li>
                <li><strong>Plastic fixings:</strong> — Instead of metal</li>
                <li><strong>No fire stopping:</strong> — At penetrations</li>
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
              <p className="font-medium text-white mb-1">Inspection Items</p>
              <ul className="space-y-0.5">
                <li>Luminaire positions</li>
                <li>Cable fire resistance</li>
                <li>Metal fixings</li>
                <li>Fire stopping</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Documentation</p>
              <ul className="space-y-0.5">
                <li>Inspection checklist</li>
                <li>As-built drawings</li>
                <li>Defect register</li>
                <li>Certificates</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-5">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 5
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-5-section-2">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule5Section1;