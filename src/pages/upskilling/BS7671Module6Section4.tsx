import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import SingleQuestionQuiz from "@/components/upskilling/quiz/SingleQuestionQuiz";
import useSEO from "@/hooks/useSEO";

const quickCheckQuestions = [
  {
    id: "bs7671-m6s4-check1",
    question: "When must an Electrical Installation Certificate (EIC) be issued?",
    options: [
      "Only for commercial installations",
      "For all new installations or significant alterations involving new circuits",
      "Only when requested by the client",
      "Only for installations over 100A"
    ],
    correctIndex: 1,
    explanation: "An EIC must be issued whenever a new electrical installation is completed or when significant alterations are made that involve creating new circuits. This includes new buildings, consumer unit replacements, and any major modifications that add new final circuits to an existing installation."
  },
  {
    id: "bs7671-m6s4-check2",
    question: "What certificate should be used for extending an existing lighting circuit by one point?",
    options: [
      "Electrical Installation Certificate (EIC)",
      "Electrical Installation Condition Report (EICR)",
      "Minor Electrical Installation Works Certificate (MEIWC)",
      "Building Control notification only"
    ],
    correctIndex: 2,
    explanation: "Adding a single lighting point to an existing circuit is considered minor works as it doesn't create a new circuit, only extends an existing one. The MEIWC is the appropriate certificate, but still requires proper testing and verification that the existing circuit can safely accommodate the additional load."
  },
  {
    id: "bs7671-m6s4-check3",
    question: "What does a C2 code mean on an EICR?",
    options: [
      "Improvement recommended but not urgent",
      "Danger present requiring immediate action",
      "Potentially dangerous requiring urgent remedial action",
      "Further investigation required"
    ],
    correctIndex: 2,
    explanation: "A C2 code indicates a potentially dangerous condition that requires urgent remedial action to remove the potential danger. While not immediately dangerous like C1, C2 defects represent significant safety risks that must be addressed promptly to prevent potential harm."
  },
  {
    id: "bs7671-m6s4-check4",
    question: "Why must clients always receive copies of completed certificates?",
    options: [
      "Only for marketing purposes",
      "It's optional and only recommended",
      "Legal requirement and for future reference and compliance",
      "Only required for rental properties"
    ],
    correctIndex: 2,
    explanation: "Clients must receive certificates as legal evidence of compliance, for insurance purposes, future maintenance planning, property transactions, and regulatory compliance. The certificates also provide essential information for future electrical work and periodic inspections."
  }
];

const faqs = [
  {
    question: "Can the same person sign as designer, installer, and tester on an EIC?",
    answer: "Yes, if that person is competent in all three areas. A single electrician can fulfil multiple roles on an EIC, provided they have the appropriate technical knowledge and experience for each area of responsibility."
  },
  {
    question: "What's the difference between C1 and C2 defects on an EICR?",
    answer: "C1 means danger is present and immediate action is required - the installation or affected circuit should be isolated immediately. C2 means potentially dangerous and requires urgent remedial action, but the immediate risk is lower than C1."
  },
  {
    question: "How long should I keep copies of certificates?",
    answer: "Keep copies for the life of the installation where possible, but a minimum of 6 years is recommended for legal protection. Digital storage systems help ensure long-term retention and easy retrieval."
  }
];

const quizQuestion = {
  question: "A landlord fails to provide a valid EICR for their rental property. What are the potential consequences?",
  options: [
    "No consequences as EICRs are optional",
    "Warning letter only",
    "Fines, prohibition orders, and potential prosecution",
    "Loss of security deposit only"
  ],
  correctAnswer: 2,
  explanation: "Landlords who fail to provide valid EICRs for rental properties face serious consequences including financial penalties (fines up to £30,000), prohibition orders preventing further letting, enforcement notices requiring immediate remedial works, and potential criminal prosecution for serious breaches."
};

const BS7671Module6Section4 = () => {
  useSEO({
    title: "Model Forms and Certification Overview | BS7671 Module 6.4",
    description: "Learn about EIC, MEIWC, and EICR certification requirements under BS 7671, including when to use each form and legal implications."
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
            <Link to="../bs7671-module-6">
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
            <span>Module 6.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Model Forms and Certification Overview
          </h1>
          <p className="text-white/80">
            Understanding EIC, MEIWC, and EICR certification requirements under BS 7671
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>EIC:</strong> New installations or major alterations with new circuits</li>
              <li><strong>MEIWC:</strong> Minor works without creating new circuits</li>
              <li><strong>EICR:</strong> Condition reports for existing installations</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Certificates are legal documents - treat them seriously</li>
              <li><strong>Use:</strong> Always provide copies to clients and keep your own records</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Identify the three main types of certification used under BS 7671",
              "Understand the purpose of EIC, MEIWC, and EICR forms",
              "Recognise what information must be included on each form",
              "Explain why certification is legally and professionally important"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 1: EIC */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Electrical Installation Certificate (EIC)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Required for all new installations or significant alterations involving new circuits. The EIC is
              the primary certificate demonstrating BS 7671 compliance and is the most comprehensive form
              of electrical certification.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">When EIC Must Be Issued</p>
                <ul className="text-sm text-white space-y-1">
                  <li>New electrical installations (domestic, commercial, industrial)</li>
                  <li>Significant alterations including new circuit additions</li>
                  <li>Consumer unit replacements or upgrades</li>
                  <li>Major modifications affecting multiple circuits</li>
                  <li>Any work creating new final circuits</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Required Content</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Design, construction, inspection and test confirmation</li>
                  <li>Schedules of inspection with visual inspection results</li>
                  <li>Complete test results for all circuits</li>
                  <li>Circuit details (cable types, protective device ratings)</li>
                  <li>Signatures from designer, installer, and tester</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Professional Responsibilities:</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Designer:</strong> Must be competent and sign to confirm design compliance</li>
                <li><strong>Installer:</strong> Must be competent and confirm construction compliance</li>
                <li><strong>Tester:</strong> Must be competent and verify inspection/testing compliance</li>
                <li>Single person may fulfil multiple roles if competent in each area</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 2: MEIWC */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Minor Electrical Installation Works Certificate (MEIWC)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Used for small works such as adding a socket to an existing circuit. The MEIWC covers
              modifications where no new circuit is created but still requires inspection and testing.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Scope of MEIWC Works</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Adding socket outlets to existing circuits</li>
                  <li>Extending lighting circuits with additional points</li>
                  <li>Adding fused connection units to existing circuits</li>
                  <li>Replacing accessories without circuit modifications</li>
                  <li>Small extensions not requiring new circuit protection</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Testing Requirements</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Still requires inspection and testing</li>
                  <li>Verify existing circuit can accommodate additional load</li>
                  <li>Confirm protective device ratings remain appropriate</li>
                  <li>Earth fault loop impedance verification at new points</li>
                  <li>RCD operation testing where applicable</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 3: EICR */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Electrical Installation Condition Report (EICR)
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Used to assess the safety of existing installations. The EICR identifies defects, departures
              from BS 7671, and safety risks using a standardised coding system.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-3">EICR Coding System:</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold shrink-0">C1</span>
                  <div>
                    <p className="font-medium text-white">Danger Present - Immediate Action Required</p>
                    <p className="text-sm text-white/80">Installation unsafe, immediate remedial action required</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold shrink-0">C2</span>
                  <div>
                    <p className="font-medium text-white">Potentially Dangerous</p>
                    <p className="text-sm text-white/80">Urgent remedial action required to remove potential danger</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  <span className="bg-elec-yellow text-[#1a1a1a] px-2 py-1 rounded text-xs font-bold shrink-0">C3</span>
                  <div>
                    <p className="font-medium text-white">Improvement Recommended</p>
                    <p className="text-sm text-white/80">Departure from current standards, improvement recommended</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold shrink-0">FI</span>
                  <div>
                    <p className="font-medium text-white">Further Investigation Required</p>
                    <p className="text-sm text-white/80">Investigation required to determine if defect exists</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Domestic</p>
                <p className="text-white/90 text-xs">10 years (5 for rental)</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Commercial</p>
                <p className="text-white/90 text-xs">5 years typical</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Industrial</p>
                <p className="text-white/90 text-xs">3-5 years</p>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 4: Legal Importance */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Legal and Professional Importance
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Certification provides documented evidence of compliance, protects electricians legally,
              and satisfies regulatory requirements across multiple sectors.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Legal Protection</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Documented evidence of BS 7671 compliance</li>
                  <li>Protects electricians in disputes or incidents</li>
                  <li>Demonstrates due diligence and competence</li>
                  <li>Essential for insurance claims and legal proceedings</li>
                  <li>Required for warranty protection</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Regulatory Compliance</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Required for landlords (electrical safety regulations)</li>
                  <li>Building control sign-off for notifiable works</li>
                  <li>Insurance requirements for properties</li>
                  <li>Health and safety compliance in workplaces</li>
                  <li>Competent person scheme notifications</li>
                </ul>
              </div>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Real World Example */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Real World Example</h2>
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm font-medium text-red-400/80 mb-2">Manchester Landlord Prosecution</p>
            <p className="text-sm text-white mb-3">
              A landlord in Manchester was prosecuted for failing to provide a valid EICR on a rental property.
              The property had been let for three years without any electrical safety certification.
            </p>
            <p className="text-sm font-medium text-white mb-2">Defects Found:</p>
            <ul className="text-sm text-white space-y-1 ml-4 mb-3">
              <li>C1: Exposed live parts in damaged consumer unit</li>
              <li>C2: Multiple sockets without RCD protection</li>
              <li>C2: Inadequate earthing and bonding arrangements</li>
            </ul>
            <p className="text-sm font-medium text-white mb-2">Consequences:</p>
            <ul className="text-sm text-white space-y-1 ml-4 mb-3">
              <li>£5,000 fine for failure to ensure electrical safety</li>
              <li>£3,000 additional penalty for lack of documentation</li>
              <li>Prohibition order preventing further letting until compliance achieved</li>
            </ul>
            <p className="text-sm text-elec-yellow/80">
              <strong>Lesson:</strong> Regular EICR certification could have identified defects before they became dangerous.
              Cost of compliance is minimal compared to consequences of non-compliance.
            </p>
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Practical Guidance Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Certificate Completion</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete forms carefully with no missing results or information</li>
                <li>Ensure all signatures, dates, and qualifications are clearly recorded</li>
                <li>Use clear, legible handwriting or preferably digital completion</li>
                <li>Cross-reference all circuit details with actual installation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Signing without inspection:</strong> Never sign certificates unless you personally carried out or supervised the work</li>
                <li><strong>Missing information:</strong> Incomplete certificates may be invalid for compliance purposes</li>
                <li><strong>Wrong certificate type:</strong> Using MEIWC when EIC is required can create legal issues</li>
                <li><strong>Poor record keeping:</strong> Keep copies securely - certificates are legal documents</li>
              </ul>
            </div>
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
          <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Certificate Selection</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs text-white">
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">EIC Required</p>
              <ul className="space-y-0.5">
                <li>New installations</li>
                <li>New circuits added</li>
                <li>Consumer unit replacement</li>
                <li>Major alterations</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">MEIWC Required</p>
              <ul className="space-y-0.5">
                <li>Adding sockets to existing circuit</li>
                <li>Extending lighting circuit</li>
                <li>Accessory replacements</li>
                <li>No new circuit created</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-elec-yellow/80 mb-1">EICR Required</p>
              <ul className="space-y-0.5">
                <li>Periodic inspection</li>
                <li>Rental property compliance</li>
                <li>Pre-purchase survey</li>
                <li>Change of use/occupancy</li>
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
            <Link to="../bs7671-module-6-section-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Section
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../bs7671-module-6-section-5">
              Next Section
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
};

export default BS7671Module6Section4;
