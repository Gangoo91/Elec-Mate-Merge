import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section7_1 = () => {
  useSEO(
    "Why Certification Is Required (BS 7671 Compliance) - Level 2 Module 6 Section 7.1",
    "Understanding the legal requirement for electrical certification under BS 7671 and EAWR 1989"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is the main purpose of electrical certification?",
      options: ["To charge more money", "To prove safety and compliance with regulations", "To create paperwork", "To satisfy customers"],
      correctAnswer: 1,
      explanation: "Certification provides legal evidence that installations meet safety standards and comply with BS 7671 and EAWR 1989."
    },
    {
      id: 2,
      question: "Which UK regulation requires all electrical systems to be safe?",
      options: ["Health and Safety at Work Act", "Electricity at Work Regulations 1989", "Building Regulations", "Wiring Regulations"],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 (EAWR) make it a legal duty to ensure electrical systems are constructed and maintained safely."
    },
    {
      id: 3,
      question: "Which standard sets out the certification requirements for electrical work?",
      options: ["BS 7671", "BS 5839", "BS 6423", "BS 1363"],
      correctAnswer: 0,
      explanation: "BS 7671 (The Wiring Regulations) sets out the technical requirements for electrical installations, including mandatory testing and certification."
    },
    {
      id: 4,
      question: "Why is certification important for insurers and building control?",
      options: ["It looks professional", "It provides evidence of compliance and due diligence", "It's required by law", "It helps with marketing"],
      correctAnswer: 1,
      explanation: "Certification provides insurers and building control with evidence that proper testing was conducted and safety standards were met."
    },
    {
      id: 5,
      question: "What key details are included on a certificate?",
      options: ["Only test results", "Installation details, test results, and competent person signatures", "Just the electrician's name", "Equipment serial numbers only"],
      correctAnswer: 1,
      explanation: "Certificates include installation details, test results, and signatures of competent persons to ensure accountability and traceability."
    },
    {
      id: 6,
      question: "True or False: Certification is optional for small alterations.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. All electrical work including alterations and additions must be certified, though minor works may use different certificate types."
    },
    {
      id: 7,
      question: "Why must a certificate include the signature of a competent person?",
      options: ["For legal requirement", "To provide accountability and traceability", "To look official", "For insurance purposes"],
      correctAnswer: 1,
      explanation: "Signatures establish accountability and ensure responsibility is clear and traceable for the work carried out."
    },
    {
      id: 8,
      question: "What are the legal consequences of failing to issue a certificate?",
      options: ["Minor paperwork issues", "Prosecution, fines, insurance denial, and personal liability", "Customer complaints", "Nothing serious"],
      correctAnswer: 1,
      explanation: "Failing to certify can result in prosecution, fines, imprisonment, insurance denial, and personal liability for damages."
    },
    {
      id: 9,
      question: "What must be completed before a new installation can be energised?",
      options: ["Payment from client", "Building control approval", "Certification", "Material delivery"],
      correctAnswer: 2,
      explanation: "Certification must be complete before energising any new installation to ensure it meets safety standards."
    },
    {
      id: 10,
      question: "In the real-world example, what mistake left the contractor personally liable for damages?",
      options: ["Using wrong cables", "Failing to issue an Electrical Installation Certificate", "Poor workmanship", "Late completion"],
      correctAnswer: 1,
      explanation: "The contractor failed to issue an EIC, leaving no documentation to prove compliance, resulting in personal liability for fire damages."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/5 -ml-2 min-h-[44px] touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6.7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 6</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.7.1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Why Certification Is Required (BS 7671 Compliance)
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding the legal requirement for electrical certification
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h2 className="font-semibold text-white mb-3">Spot it in 30 Seconds</h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Certification is a legal requirement under EAWR 1989</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>BS 7671 sets certification standards</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Protects electricians, clients, and insurers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Non-compliance has serious consequences</span>
              </li>
            </ul>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">00</span>
              Introduction
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical certification is not optional paperwork — it is a legal requirement. Every new installation, alteration, or addition must be verified, tested, and formally recorded to prove compliance with BS 7671 and the Electricity at Work Regulations 1989 (EAWR). Certification protects users, clients, and electricians by providing evidence that the work was carried out to the required standard.
              </p>
            </div>
          </section>

          {/* Section 1: The Purpose of Certification */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              The Purpose of Certification
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Certification exists to prove that an installation is safe, compliant, and fit for use. It confirms that testing has been carried out and that results meet the requirements of BS 7671. Certificates also provide a record for clients, insurers, and building control authorities. Without certification, there is no proof that the installation has been tested or meets legal requirements.
              </p>

              <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-400/50">
                <h4 className="font-medium text-blue-300 mb-2">Key Functions of Certification:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• <strong>Legal Evidence:</strong> Proves compliance with statutory requirements</li>
                  <li>• <strong>Safety Assurance:</strong> Confirms the installation is safe to energise and use</li>
                  <li>• <strong>Quality Record:</strong> Documents that proper procedures were followed</li>
                  <li>• <strong>Future Reference:</strong> Provides baseline data for maintenance and troubleshooting</li>
                  <li>• <strong>Insurance Validation:</strong> Supports insurance claims and coverage</li>
                  <li>• <strong>Building Control Approval:</strong> Satisfies local authority requirements</li>
                </ul>
              </div>

              <p>
                The certification process creates a formal audit trail that follows the installation throughout its life. This documentation becomes particularly valuable when modifications are needed, faults develop, or when the property changes ownership. It also serves as evidence of due diligence if accidents occur, protecting both the electrician and the client from legal liability.
              </p>
            </div>
          </section>

          <InlineCheck
            id="purpose-check"
            question="What is the main purpose of electrical certification?"
            options={["To create paperwork", "To prove that an installation is safe, compliant, and fit for use", "To charge more money", "To satisfy building control"]}
            correctIndex={1}
            explanation="Certification exists to prove that an installation is safe, compliant, and fit for use, providing evidence that testing has been carried out and meets BS 7671 requirements."
          />

          {/* Section 2: Legal and Regulatory Framework */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Legal and Regulatory Framework
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                BS 7671 sets out the technical requirements for electrical installations, including mandatory testing and certification. The Electricity at Work Regulations 1989 (EAWR) go further, making it a legal duty to ensure electrical systems are constructed and maintained safely. Certification is the formal evidence that these duties have been met. This means that certification is not just good practice — it is a legal obligation.
              </p>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-400/50">
                <h4 className="font-medium text-green-300 mb-2">Key Regulations and Standards:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>BS 7671 (18th Edition):</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Technical requirements for installations</li>
                      <li>• Testing procedures and acceptance criteria</li>
                      <li>• Certification formats and requirements</li>
                    </ul>
                  </div>
                  <div>
                    <strong>EAWR 1989:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Legal duty of care for electrical safety</li>
                      <li>• Requirements for competent persons</li>
                      <li>• Penalties for non-compliance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The relationship between BS 7671 and EAWR is crucial to understand. While BS 7671 is a British Standard (not law), compliance with it is widely accepted as demonstrating compliance with the legal requirements of EAWR. This means that following BS 7671 provides a recognised defence against prosecution under EAWR.
              </p>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-400/50">
                <h4 className="font-medium text-amber-300 mb-2">Legal Consequences of Non-Compliance:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Prosecution under EAWR with unlimited fines</li>
                  <li>• Personal imprisonment for up to 6 months</li>
                  <li>• Civil liability for damages and injuries</li>
                  <li>• Professional disqualification and loss of competent person status</li>
                  <li>• Insurance coverage invalidation</li>
                  <li>• Building control rejection and enforcement action</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="legal-framework-check"
            question="Which UK regulation makes it a legal duty to ensure electrical systems are safe?"
            options={["BS 7671", "Building Regulations", "Electricity at Work Regulations 1989", "Health and Safety at Work Act"]}
            correctIndex={2}
            explanation="The Electricity at Work Regulations 1989 (EAWR) make it a legal duty to ensure electrical systems are constructed and maintained safely."
          />

          {/* Section 3: Proving Compliance and Accountability */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Proving Compliance and Accountability
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Certificates provide accountability by showing who carried out or supervised the work and when it was tested. They include details of the installation, the test results, and the signatures of competent persons. This ensures that responsibility is clear and traceable. In the event of a fault or incident, the certificate is a vital piece of evidence that can protect both the electrician and the client.
              </p>

              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-400/50">
                <h4 className="font-medium text-orange-300 mb-2">Accountability Elements in Certification:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>Designer Accountability:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Circuit design and protection coordination</li>
                      <li>• Load calculations and cable sizing</li>
                      <li>• Earthing and bonding arrangements</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Installer Accountability:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Workmanship quality and materials used</li>
                      <li>• Compliance with design specifications</li>
                      <li>• Safe working practices followed</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The signature of a competent person on a certificate carries significant legal weight. It represents a professional declaration that the work has been carried out to the required standards and that the signer takes responsibility for the quality and safety of the installation.
              </p>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-400/50">
                <h4 className="font-medium text-purple-300 mb-2">Certificate as Legal Evidence:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Admissible in court proceedings as evidence of compliance</li>
                  <li>• Demonstrates due diligence in safety matters</li>
                  <li>• Shows professional competence and proper procedures</li>
                  <li>• Provides defence against negligence claims</li>
                  <li>• Supports insurance coverage and claims</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="accountability-check"
            question="Why is the signature of a competent person an essential part of certification?"
            options={["To make it look official", "To provide accountability and traceability", "For legal requirement only", "To satisfy insurers"]}
            correctIndex={1}
            explanation="Signatures ensure that responsibility is clear and traceable, providing accountability by showing who carried out or supervised the work."
          />

          {/* Section 4: Consequences of Non-Certification */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Consequences of Non-Certification
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Failing to provide certification has serious consequences. Work may be deemed non-compliant and illegal. Clients may refuse payment, insurers may deny cover, and building control may reject the installation. In the event of an accident, the electrician could face prosecution, fines, or even imprisonment if no certification exists to prove compliance.
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50">
                <h4 className="font-medium text-red-300 mb-2">Immediate Consequences:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>Financial Impact:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Client refusal to pay final invoice</li>
                      <li>• Contract termination and damages</li>
                      <li>• Cost of remedial work and re-testing</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Professional Impact:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Damage to professional reputation</li>
                      <li>• Loss of competent person status</li>
                      <li>• Exclusion from certification schemes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The legal consequences can be severe and long-lasting. Under the Electricity at Work Regulations 1989, failure to ensure electrical safety can result in prosecution with unlimited fines and potential imprisonment. These are criminal sanctions that can have lifetime impacts on career prospects and professional standing.
              </p>
            </div>
          </section>

          <InlineCheck
            id="consequences-check"
            question="What could happen to an electrician who energises a new installation without certification?"
            options={["Nothing serious", "Minor paperwork issues", "Prosecution, fines, or imprisonment, plus liability for damages", "Client complaints only"]}
            correctIndex={2}
            explanation="Without certification, electricians face prosecution, fines, or imprisonment, plus personal liability for any damages as there's no proof of compliance."
          />

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Practical Guidance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Use Correct Certificate Type</h4>
                <p className="text-sm text-white/70">Always use the correct certificate type (EIC, MWC, or EICR) for the work carried out.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Complete All Sections</h4>
                <p className="text-sm text-white/70">Make sure all sections of the certificate are completed clearly and accurately.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">No Energising Without Certification</h4>
                <p className="text-sm text-white/70">Never energise a new installation until certification is complete.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Part of the Installation</h4>
                <p className="text-sm text-white/70">Treat certification as part of the installation, not an optional extra.</p>
              </div>
            </div>
          </section>

          {/* Real-World Example */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Real-World Example
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50">
                <h4 className="font-medium text-red-300 mb-2">Certification Failure Leads to Personal Liability</h4>
                <p className="text-sm text-white/70">
                  A small electrical contractor completed a new shop fit-out but failed to issue an Electrical Installation Certificate. Months later, a fire broke out in the premises. During the investigation, the contractor had no documentation to prove that the installation complied with BS 7671. The insurance company refused the claim, and the contractor was held personally liable for damages running into tens of thousands of pounds.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-400/50">
                <p className="text-sm text-white/70">
                  <strong className="text-green-300">Lesson:</strong> Certification protects electricians legally and financially as much as it protects the client.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              FAQs
            </h2>
            <div className="space-y-4">
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-medium text-white mb-2">Q: Is certification required for all electrical work?</h3>
                <p className="text-sm text-white/70">A: Yes. All new installations, alterations, and additions must be certified.</p>
              </div>
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-medium text-white mb-2">Q: Does BS 7671 itself have the force of law?</h3>
                <p className="text-sm text-white/70">A: BS 7671 is not law, but compliance with it is widely recognised as the standard for meeting legal duties under EAWR 1989.</p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">Q: Who can sign a certificate?</h3>
                <p className="text-sm text-white/70">A: Only a competent person who carried out or supervised the work and testing.</p>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="font-semibold text-white mb-3">Recap</h2>
              <p className="text-sm text-white/80">
                Certification is a legal requirement under BS 7671 and EAWR 1989. It proves that installations have been tested, meet safety standards, and are compliant. Certificates provide accountability by recording test results, installation details, and signatures. Without certification, electricians risk prosecution, unpaid work, invalid insurance, and reputational damage.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Certification Requirements Quiz" />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Section 6.7 Overview
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-2">
                EIC Awareness
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section7_1;
