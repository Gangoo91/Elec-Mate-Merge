import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "emergencylighting-m5s5-check1",
    question: "Why is certification important beyond just testing the system?",
    options: ["For aesthetic documentation", "Provides legal proof of compliance for insurance and fire authorities", "Only required for large installations", "To satisfy building aesthetics"],
    correctIndex: 1,
    explanation: "Testing proves the system works at a specific moment. Certification provides legal documentation that the system was designed, installed, and verified to recognised standards - essential for insurance claims, fire authority inspections, and professional liability protection."
  },
  {
    id: "emergencylighting-m5s5-check2",
    question: "Which certificate must be issued before the Emergency Lighting Completion Certificate?",
    options: ["Commissioning Certificate", "Design Declaration", "Electrical Installation Certificate", "Minor Works Certificate"],
    correctIndex: 2,
    explanation: "The Electrical Installation Certificate must be issued before the Emergency Lighting Completion Certificate, as electrical safety is a prerequisite. The Commissioning Certificate is the final document, confirming all previous work has been verified."
  },
  {
    id: "emergencylighting-m5s5-check3",
    question: "Who must sign the certification documents to establish accountability?",
    options: ["Client only", "Designer, installer, and verifier", "Building manager only", "Fire authority"],
    correctIndex: 1,
    explanation: "Certification and checklists must be signed by the Designer (confirms design meets standards), Installer (confirms installation follows design), and Verifier/Commissioning Engineer (confirms system performance). This ensures clear accountability at every stage."
  }
];

const faqs = [
  {
    question: "Who is responsible for issuing the emergency lighting certificate?",
    answer: "The commissioning engineer or qualified person who carried out the verification and final testing is responsible for issuing the emergency lighting certificate. This individual must be competent to verify compliance with BS 5266-1 and BS EN 50172, and should hold appropriate qualifications."
  },
  {
    question: "Are commissioning certificates legally required?",
    answer: "Yes - under BS 5266 and fire safety legislation (specifically the Regulatory Reform (Fire Safety) Order 2005), certification is essential to demonstrate compliance. Without proper certification, an emergency lighting system is considered non-verified, even if physically operational."
  },
  {
    question: "How long should certificates be retained?",
    answer: "Certificates should be retained for the life of the installation - and not less than six years. This retention period aligns with professional liability timelines and ensures documentation is available for insurance claims, fire authority inspections, building sales, or legal disputes."
  },
  {
    question: "Can I use digital checklists instead of paper?",
    answer: "Many contractors now use digital checklists on tablets with photo evidence and GPS tagging. However, paper checklists remain legally acceptable. Whichever format you use, ensure it is signed, dated, and retained for the life of the installation."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "A fire inspector requests certification for an emergency lighting system. What happens if certificates are missing?",
    options: [
      "System passes if it works correctly",
      "Verbal warning only",
      "System is considered non-verified and non-compliant",
      "Only affects insurance, not legal compliance"
    ],
    correctAnswer: 2,
    explanation: "Under BS 5266 and the Fire Safety Order 2005, a system without proper certification is considered non-verified and non-compliant, regardless of whether it physically works. This can result in enforcement notices, prosecution, and invalid insurance."
  }
];

const EmergencyLightingModule5Section5 = () => {
  useSEO({
    title: "Certification and Commissioning Checklists | Emergency Lighting Module 5.5",
    description: "Emergency lighting certification requirements, commissioning checklists, and sign-off procedures for BS 5266-1 and BS 7671 compliance."
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
            <span>Module 5.5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Certification and Commissioning Checklists
          </h1>
          <p className="text-white/80">
            Formal verification and documentation for emergency lighting compliance
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Certification:</strong> Legal proof of compliance</li>
              <li><strong>Checklists:</strong> Structured verification record</li>
              <li><strong>Retention:</strong> Lifetime of installation (min 6 years)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Required Signatories</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Designer:</strong> Confirms design meets standards</li>
              <li><strong>Installer:</strong> Confirms correct installation</li>
              <li><strong>Verifier:</strong> Confirms system performance</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the purpose of certification",
              "Identify required certificate types",
              "Use commissioning checklists effectively",
              "Establish clear sign-off accountability",
              "Retain documentation correctly",
              "Protect professional liability"
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
            Purpose of Certification
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              After installation, inspection, and testing are complete, the emergency lighting
              system must be formally certified before it is handed over to the client. Certification
              provides written proof that the system meets all design and performance requirements
              under BS 5266-1, BS 7671, and BS EN 50172.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Certification Formally Confirms:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>The system design complies with BS 5266 and BS 7671</li>
                <li>The installation was completed to specification</li>
                <li>Functional and duration tests have been successfully carried out</li>
                <li>All defects identified during inspection have been rectified</li>
                <li>A logbook, drawings, and maintenance plan have been issued to the client</li>
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Design</p>
                <p className="text-white/90 text-xs">Compliance proof</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Installation</p>
                <p className="text-white/90 text-xs">To specification</p>
              </div>
              <div className="p-3 rounded bg-transparent">
                <p className="font-medium text-white mb-1">Testing</p>
                <p className="text-white/90 text-xs">Verified results</p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Types of Certificates
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multiple certificates are required to demonstrate full compliance across design,
              installation, and commissioning phases. The following documentation must be prepared
              and retained:
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Primary Certificates</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>EL Completion:</strong> BS 5266-1, Annex G</li>
                  <li><strong>EIC:</strong> BS 7671 wiring compliance</li>
                  <li><strong>Design Declaration:</strong> BS 5266-1</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Supporting Certificates</p>
                <ul className="text-sm text-white space-y-1">
                  <li><strong>Commissioning:</strong> BS 5266-1 / BS EN 50172</li>
                  <li><strong>Minor Works:</strong> BS 7671 for modifications</li>
                  <li><strong>Test Results:</strong> Duration test records</li>
                </ul>
              </div>
            </div>

            <p>
              The Electrical Installation Certificate must be issued before the Emergency Lighting
              Completion Certificate, as electrical safety is a prerequisite. The Commissioning
              Certificate is the final document, confirming all previous work has been verified.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Commissioning Checklist Requirements
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A commissioning checklist provides a structured record that every aspect of the
              system has been verified. It should include confirmation of:
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Checklist Items:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Luminaire verification:</strong> Correct types, positions, mounting heights</li>
                <li><strong>Battery and autonomy:</strong> 3-hour duration test completed</li>
                <li><strong>Exit sign compliance:</strong> ISO 7010 pictograms, correct orientation</li>
                <li><strong>System labelling:</strong> Circuits segregated and marked</li>
                <li><strong>Documentation:</strong> Drawings, logbook, test results complete</li>
                <li><strong>Professional sign-off:</strong> All signatures obtained</li>
              </ul>
            </div>

            <p>
              Many contractors now use digital checklists on tablets with photo evidence and GPS
              tagging. However, paper checklists remain legally acceptable. Whichever format you
              use, ensure it is signed, dated, and retained for the life of the installation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Sign-Off and Accountability
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certification and checklists must be signed by qualified professionals to establish
              clear accountability at every stage of the project.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Designer</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Confirms design meets BS 5266-1</li>
                  <li>Certifies lux levels and coverage</li>
                  <li>Verifies risk assessment compliance</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Installer</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Confirms BS 7671 compliance</li>
                  <li>Certifies correct installation</li>
                  <li>Verifies cable and terminations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Verifier</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Confirms system performance</li>
                  <li>Certifies test results</li>
                  <li>Verifies handover readiness</li>
                </ul>
              </div>
            </div>

            <p>
              Your signature on certification documents creates a legal record of professional
              responsibility. Never sign certificates for work you have not personally verified.
              Ensure your professional indemnity insurance covers certification activities, and
              retain copies of all signed documents for at least six years.
            </p>
          </div>
        </section>

        {/* Practical Guidance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Certification Best Practice</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Issue EIC before EL Completion Certificate</li>
                <li>Ensure all signatories are present for final sign-off</li>
                <li>Retain copies for minimum 6 years (ideally life of installation)</li>
                <li>Include photo evidence in digital checklists</li>
                <li>Provide client with complete documentation package</li>
                <li>Schedule client handover meeting to explain maintenance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Certification Errors</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Missing signatures:</strong> All three parties must sign</li>
                <li><strong>Wrong certificate order:</strong> EIC before EL Completion</li>
                <li><strong>No retention:</strong> Contractor and client both need copies</li>
                <li><strong>Signing unverified work:</strong> Only sign what you have checked</li>
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
                <li>EL Completion: BS 5266-1</li>
                <li>EIC: BS 7671</li>
                <li>Design Declaration: BS 5266-1</li>
                <li>Commissioning: BS EN 50172</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-white mb-1">Sign-Off Requirements</p>
              <ul className="space-y-0.5">
                <li>Designer: Design compliance</li>
                <li>Installer: Installation compliance</li>
                <li>Verifier: Performance verification</li>
                <li>Retention: 6+ years</li>
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
            <Link to="/electrician/upskilling/emergency-lighting-module-5-section-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/electrician/upskilling/emergency-lighting-module-5-section-6">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default EmergencyLightingModule5Section5;
