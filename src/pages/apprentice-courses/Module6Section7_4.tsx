import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section7_4 = () => {
  useSEO(
    "Who Can Sign Off Work and What Level 2 Can Do Legally - Level 2 Module 6 Section 7.4",
    "Understanding legal responsibilities for signing electrical certificates and Level 2 limitations"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "Who can legally sign electrical certificates?",
      options: ["Any electrician", "Level 2 electricians", "Competent persons with sufficient training and experience", "Building control officers"],
      correctAnswer: 2,
      explanation: "Only competent persons with sufficient training, technical knowledge, and experience can legally sign electrical certificates."
    },
    {
      id: 2,
      question: "What does 'competent person' mean in BS 7671?",
      options: ["Anyone with basic electrical knowledge", "Someone with sufficient training, technical knowledge, and experience", "Any qualified tradesperson", "A person with insurance"],
      correctAnswer: 1,
      explanation: "In BS 7671, a competent person is someone with sufficient training, technical knowledge, and experience to carry out the work safely."
    },
    {
      id: 3,
      question: "What does a signatory confirm when signing a certificate?",
      options: ["Work completion only", "Compliance with design, construction, inspection, and testing standards", "Payment has been received", "Client satisfaction"],
      correctAnswer: 1,
      explanation: "When signing a certificate, the signatory confirms that the design, construction, inspection, and testing comply with BS 7671 and the installation is safe."
    },
    {
      id: 4,
      question: "What happens if an unqualified person signs a certificate?",
      options: ["Nothing serious", "The certificate is invalid and fraud may have occurred", "A small fine is issued", "The work needs minor corrections"],
      correctAnswer: 1,
      explanation: "If an unqualified person signs a certificate, it's invalid and potentially fraudulent, leading to serious legal and professional consequences."
    },
    {
      id: 5,
      question: "Can Level 2 electricians carry out electrical testing?",
      options: ["Yes, independently", "Yes, but only under supervision", "No, never", "Only simple tests"],
      correctAnswer: 1,
      explanation: "Level 2 electricians can carry out electrical testing, but only under the instruction or supervision of a qualified competent person."
    },
    {
      id: 6,
      question: "Can Level 2 electricians legally sign off a Minor Works Certificate?",
      options: ["Yes, for all minor works", "Yes, but only simple ones", "No, they cannot sign any certificates", "Only if supervised"],
      correctAnswer: 2,
      explanation: "Level 2 electricians cannot legally sign any electrical certificates, including Minor Works Certificates, as they are not yet fully qualified competent persons."
    },
    {
      id: 7,
      question: "Why is supervision important during Level 2 training?",
      options: ["To slow down the work", "Legal safeguard and skill development", "Company policy only", "Insurance requirements"],
      correctAnswer: 1,
      explanation: "Supervision provides legal safeguard (qualified person takes responsibility) while allowing Level 2 learners to gain valuable experience and skills."
    },
    {
      id: 8,
      question: "What are the risks of signing a certificate without being competent?",
      options: ["Minor paperwork errors", "Fraud, disciplinary action, loss of employment, or prosecution", "Delayed project completion", "Client complaints"],
      correctAnswer: 1,
      explanation: "Signing a certificate without being competent is fraudulent and can lead to disciplinary action, loss of employment, or even prosecution."
    },
    {
      id: 9,
      question: "What role should a Level 2 learner play in the certification process?",
      options: ["Sign certificates independently", "Assist with testing and recording under supervision", "Avoid all certification activities", "Only observe"],
      correctAnswer: 1,
      explanation: "Level 2 learners should assist with testing and recording results under supervision, gaining experience while the qualified person takes legal responsibility."
    },
    {
      id: 10,
      question: "In the real-world example, why was the Minor Works Certificate invalid?",
      options: ["Wrong form used", "An apprentice signed it instead of a qualified person", "Incomplete test results", "Missing client signature"],
      correctAnswer: 1,
      explanation: "The certificate was invalid because an apprentice signed it while the supervising qualified electrician was off-site, making the apprentice's signature unauthorised."
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
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
              <span className="text-white/60">Section 6.7.4</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Who Can Sign Off Work and What Level 2 Can Do Legally
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding legal responsibilities for signing electrical certificates and Level 2 limitations
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h2 className="font-semibold text-white mb-3">Spot it in 30 Seconds</h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Only competent persons can sign electrical certificates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Level 2 electricians cannot legally sign any certificates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Signing carries legal responsibility for installation safety</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Supervision required until fully qualified</span>
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
                One of the most important aspects of certification is understanding who is legally allowed to sign it. Not every electrician — especially at apprentice or Level 2 stage — can take legal responsibility for test results and certification. Signing off electrical work carries serious accountability under BS 7671 and the Electricity at Work Regulations 1989 (EAWR).
              </p>
            </div>
          </section>

          {/* Section 1: Who Can Sign Off Electrical Work */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Who Can Sign Off Electrical Work
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Electrical certificates — whether EIC, MWC, or EICR — must be signed by a competent person. In BS 7671, a competent person is defined as someone with sufficient training, technical knowledge, and experience to carry out the work safely. This usually means a fully qualified electrician who holds the appropriate qualifications and is confident in verifying that the installation complies with the regulations. The signature is not just formality — it is a legal declaration of responsibility.
              </p>

              <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-400/50">
                <h4 className="font-medium text-blue-300 mb-2">Competent Person Requirements</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>Qualifications Needed:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Recognised electrical qualification (Level 3 minimum)</li>
                      <li>• BS 7671 18th Edition certification</li>
                      <li>• Inspection and Testing qualifications</li>
                      <li>• Appropriate registration with scheme provider</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Experience Requirements:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Practical electrical installation experience</li>
                      <li>• Understanding of testing procedures</li>
                      <li>• Knowledge of regulatory requirements</li>
                      <li>• Ability to identify defects and non-compliance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The concept of competence extends beyond just having qualifications. A competent person must understand the scope of their abilities and only undertake work they are qualified to perform. They must stay current with regulations, maintain their knowledge through continuing professional development, and recognise when specialist expertise is required.
              </p>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-400/50">
                <h4 className="font-medium text-amber-300 mb-2">Professional Standards</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Must be registered with an approved scheme (NICEIC, NAPIT, etc.)</li>
                  <li>• Carry appropriate insurance and professional indemnity cover</li>
                  <li>• Maintain certification through regular assessments</li>
                  <li>• Follow scheme provider codes of practice</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="competent-person-check"
            question="What does the term 'competent person' mean in the context of BS 7671?"
            options={["Anyone with basic electrical knowledge", "Someone with sufficient training, technical knowledge, and experience", "Any qualified tradesperson", "A person with insurance"]}
            correctIndex={1}
            explanation="In BS 7671, a competent person is someone with sufficient training, technical knowledge, and experience to carry out the work safely and verify compliance."
          />

          {/* Section 2: Responsibilities of Signing a Certificate */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              Responsibilities of Signing a Certificate
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>When an electrician signs a certificate, they are confirming that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The design, construction, inspection, and testing of the installation comply with BS 7671</li>
                <li>The recorded results are accurate and complete</li>
                <li>The installation is safe to be energised and used</li>
              </ul>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-400/50">
                <h4 className="font-medium text-green-300 mb-2">Legal Implications of Signing</h4>
                <div className="space-y-3 text-sm text-white/70">
                  <div>
                    <strong>Personal Liability:</strong>
                    <p>The signatory becomes personally liable for the accuracy of the certificate and the safety of the installation.</p>
                  </div>
                  <div>
                    <strong>Professional Standards:</strong>
                    <p>Signing confirms adherence to professional codes of practice and industry standards.</p>
                  </div>
                  <div>
                    <strong>Insurance Coverage:</strong>
                    <p>Professional indemnity insurance relies on proper certification and competent practice.</p>
                  </div>
                  <div>
                    <strong>Regulatory Compliance:</strong>
                    <p>Ensures work meets Building Regulations and Electricity at Work Regulations requirements.</p>
                  </div>
                </div>
              </div>

              <p>
                If an incident occurs later (shock, fire, or injury), the signatory can be held legally accountable. This is why only competent persons can take on this role. The certificate becomes evidence in any investigation, and the signatory may be required to justify their decisions and demonstrate their competence.
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50">
                <h4 className="font-medium text-red-300 mb-2">Potential Consequences of Poor Practice</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Criminal prosecution under Health and Safety legislation</li>
                  <li>• Civil liability for damages and injuries</li>
                  <li>• Professional disciplinary action and loss of registration</li>
                  <li>• Insurance claim rejection and personal financial exposure</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="signing-responsibility-check"
            question="What is an electrician legally confirming when signing an electrical certificate?"
            options={["Work completion only", "Compliance with design, construction, inspection, and testing standards", "Payment has been received", "Client satisfaction"]}
            correctIndex={1}
            explanation="When signing a certificate, the electrician legally confirms that the design, construction, inspection, and testing comply with BS 7671 and the installation is safe."
          />

          {/* Section 3: What Level 2 Electricians Can Do */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              What Level 2 Electricians Can Do
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>At Level 2, learners are developing their knowledge and skills but are not yet fully qualified. This means:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>They can carry out tests under the instruction or supervision of a qualified person</li>
                <li>They can record results and help complete documentation</li>
                <li>They cannot legally sign an EIC, MWC, or EICR — even if they carried out the work or testing</li>
              </ul>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-400/50">
                <h4 className="font-medium text-purple-300 mb-2">Level 2 Permitted Activities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>Testing Activities:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Continuity testing under supervision</li>
                      <li>• Insulation resistance measurements</li>
                      <li>• Polarity verification</li>
                      <li>• RCD testing with guidance</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Documentation Support:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Recording test results accurately</li>
                      <li>• Completing observation schedules</li>
                      <li>• Preparing certificates for supervisor</li>
                      <li>• Maintaining test equipment records</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Level 2 learners must always work under supervision and must not present themselves as competent persons until they are qualified and experienced enough to do so. This supervised approach allows gradual skill development while maintaining safety and compliance standards.
              </p>

              <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-400/50">
                <h4 className="font-medium text-blue-300 mb-2">Progression Path for Level 2 Electricians</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li><strong>1. Current Stage:</strong> Supervised practice and skill development</li>
                  <li><strong>2. Next Steps:</strong> Complete Level 3 qualifications and gain experience</li>
                  <li><strong>3. Future Goal:</strong> Achieve competent person status with scheme registration</li>
                  <li><strong>Timeline:</strong> Typically 2-4 years depending on training route and experience</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="level2-signing-check"
            question="Can a Level 2 electrician legally sign a Minor Works Certificate?"
            options={["Yes, for all minor works", "Yes, but only simple ones", "No, they cannot sign any certificates", "Only if supervised"]}
            correctIndex={2}
            explanation="Level 2 electricians cannot legally sign any electrical certificates, including Minor Works Certificates, as they are not yet fully qualified competent persons."
          />

          {/* Section 4: Importance of Supervision and Integrity */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Importance of Supervision and Integrity
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Working under supervision is not just a training exercise — it is a legal safeguard. Supervising electricians carry the legal responsibility for the work, while apprentices gain experience. Honesty is vital: Level 2 learners should never sign documents they are not authorised to sign. Doing so is fraudulent and could lead to disciplinary action, loss of employment, or even prosecution.
              </p>

              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-400/50">
                <h4 className="font-medium text-orange-300 mb-2">Importance of Supervision:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>Legal Protection:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Qualified person takes legal responsibility</li>
                      <li>• Apprentice protected from liability</li>
                      <li>• Company insurance coverage maintained</li>
                      <li>• Regulatory compliance ensured</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Learning Benefits:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Real-world experience with guidance</li>
                      <li>• Immediate feedback on performance</li>
                      <li>• Safety culture development</li>
                      <li>• Professional standards training</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Integrity in certification is fundamental to the electrical industry's reputation and public safety. Level 2 learners must understand that cutting corners or misrepresenting their status undermines both personal career development and industry standards.
              </p>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-400/50">
                <h4 className="font-medium text-green-300 mb-2">Building Professional Integrity:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li><strong>Honesty:</strong> Always be truthful about qualifications and capabilities</li>
                  <li><strong>Responsibility:</strong> Take ownership of learning and skill development</li>
                  <li><strong>Respect:</strong> Value the supervision and guidance provided</li>
                  <li><strong>Excellence:</strong> Strive for the highest standards in all work</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-400/50">
                <h4 className="font-medium text-amber-300 mb-2">Warning Signs of Poor Practice:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Pressure to sign certificates before qualification</li>
                  <li>• Working without adequate supervision</li>
                  <li>• Employers bypassing competency requirements</li>
                  <li>• Ignoring professional development requirements</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="level2-supervision-check"
            question="Why must Level 2 electricians never sign certificates in their own name?"
            options={["To slow down the work", "It's fraudulent and they lack legal authority", "Company policy only", "Insurance requirements"]}
            correctIndex={1}
            explanation="Level 2 electricians must never sign certificates as they lack the legal authority to do so, and signing would be fraudulent with serious consequences."
          />

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Practical Guidance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-white/70">Always make clear notes of test results and hand them to the supervising electrician</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-white/70">Ask questions about the certification process to build understanding</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-white/70">Never sign paperwork unless fully qualified and authorised</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-white/70">Treat every test you do as if you were signing it yourself — accuracy and honesty are essential</p>
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
              <p className="text-white/80">
                On a small domestic rewiring job, an apprentice filled out and signed a Minor Works Certificate while the supervising electrician was off-site. Months later, a fault caused repeated RCD tripping, and the certificate was checked. Because the apprentice was not legally competent to sign, the certificate was invalid, and the contractor faced penalties for non-compliance. The client demanded retesting and full certification, costing the company time and money.
              </p>
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50">
                <p className="text-sm text-white/70">
                  <strong className="text-red-300">Issue:</strong> Apprentice signed certificate without authority, making it invalid and leading to compliance penalties and additional costs.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-400/50">
                <p className="text-sm text-white/70">
                  <strong className="text-green-300">Lesson:</strong> Only competent, qualified electricians can sign certificates. Apprentices and Level 2 learners can assist but must never sign.
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
                <h3 className="font-medium text-white mb-2">Q: Can Level 2 learners carry out testing?</h3>
                <p className="text-sm text-white/70">A: Yes, but only under the supervision of a qualified person.</p>
              </div>
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-medium text-white mb-2">Q: Why can't Level 2 electricians sign certificates?</h3>
                <p className="text-sm text-white/70">A: Because they are not yet fully qualified and legally recognised as competent persons.</p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">Q: Who is legally responsible for certification?</h3>
                <p className="text-sm text-white/70">A: The qualified electrician who signs the certificate.</p>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="font-semibold text-white mb-3">Recap</h2>
              <p className="text-sm text-white/80">
                Certification must always be signed by a competent person — someone with the training, knowledge, and experience to confirm compliance with BS 7671. Signing carries legal responsibility for the safety of the installation. Level 2 electricians can help with testing and recording results but cannot sign certificates. Supervision, honesty, and integrity are essential at this stage of training.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz
            title="Who Can Sign Off Work Quiz"
            questions={quizQuestions}
          />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-3">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Minor Works Certificates
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Section 6.7 Overview
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section7_4;
