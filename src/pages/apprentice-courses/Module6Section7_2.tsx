import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section7_2 = () => {
  useSEO(
    "Electrical Installation Certificates (EICs) - Level 2 Module 6 Section 7.2",
    "Understanding Electrical Installation Certificates for new installations and major alterations"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What does EIC stand for?",
      options: ["Electrical Inspection Certificate", "Electrical Installation Certificate", "Electrical Investigation Certificate", "Emergency Installation Certificate"],
      correctAnswer: 1,
      explanation: "EIC stands for Electrical Installation Certificate, required for new installations and major alterations."
    },
    {
      id: 2,
      question: "What type of work requires an EIC?",
      options: ["Adding a single socket", "Minor repairs", "New installations and major alterations", "Testing only"],
      correctAnswer: 2,
      explanation: "EICs are required for new installations, major alterations like consumer unit upgrades, and large additions to existing installations."
    },
    {
      id: 3,
      question: "Which certificate is used instead of an EIC for minor alterations?",
      options: ["EICR", "Minor Works Certificate", "Test Certificate", "Inspection Report"],
      correctAnswer: 1,
      explanation: "Minor Works Certificates (MWC) are used for minor alterations like adding single sockets or lighting points."
    },
    {
      id: 4,
      question: "What key information is recorded on an EIC?",
      options: ["Just test results", "Installation details, test results, and signatures", "Only electrician details", "Cost information"],
      correctAnswer: 1,
      explanation: "EICs record installation details, schedule of inspections and test results, and designer, installer, and tester signatures."
    },
    {
      id: 5,
      question: "Why must the EIC include signatures from the designer, installer, and tester?",
      options: ["Legal requirement", "To ensure accountability at every stage", "For payment purposes", "Building control requirement"],
      correctAnswer: 1,
      explanation: "Signatures ensure accountability at every stage of the installation process - design, installation, and testing."
    },
    {
      id: 6,
      question: "True or False: An EIC is optional if the client does not request it.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. An EIC is mandatory for new installations and major alterations regardless of client requests."
    },
    {
      id: 7,
      question: "Who is legally responsible for signing an EIC?",
      options: ["Any electrician", "The client", "Only competent and qualified persons", "Building control"],
      correctAnswer: 2,
      explanation: "Only competent and qualified persons who carried out or supervised the work can legally sign an EIC."
    },
    {
      id: 8,
      question: "What risk does a client face if no EIC is issued for a new installation?",
      options: ["Higher costs", "Non-compliance, insurance issues, and potential liability", "Delayed completion", "Building control complaints"],
      correctAnswer: 1,
      explanation: "Without an EIC, work is non-compliant, insurers may deny coverage, and both client and electrician face potential liability."
    },
    {
      id: 9,
      question: "How does an EIC help future electricians?",
      options: ["Provides pricing information", "Shows original installation details and test baselines", "Identifies the original contractor", "Lists materials used"],
      correctAnswer: 1,
      explanation: "EICs provide future electricians with original installation details and test baselines for comparison and troubleshooting."
    },
    {
      id: 10,
      question: "In the real-world example, why did the contractor's client face problems with insurance?",
      options: ["Poor workmanship", "No EIC was issued to prove compliance", "Late completion", "Wrong certificate type"],
      correctAnswer: 1,
      explanation: "The contractor failed to issue an EIC, leaving no evidence of compliance for the insurance company to verify."
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
              <span className="text-white/60">Section 6.7.2</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Awareness of Electrical Installation Certificates (EICs)
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding Electrical Installation Certificates for new installations and major alterations
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h2 className="font-semibold text-white mb-3">Spot it in 30 Seconds</h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>EIC required for new installations and major alterations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>MWC used for minor works instead</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Must include designer, installer, and tester signatures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Provides legal proof of BS 7671 compliance</span>
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
                The Electrical Installation Certificate (EIC) is the primary document used to certify that new electrical installations, or significant alterations, comply with BS 7671. It confirms that the design, construction, inspection, and testing of the installation meet the required standards for safety and performance.
              </p>
            </div>
          </section>

          {/* Section 1: What an EIC Is */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              What an EIC Is
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                An Electrical Installation Certificate (EIC) is an official document required by BS 7671 to confirm that new electrical work has been inspected, tested, and complies with the Wiring Regulations. It applies to all new installations, as well as major alterations or additions that significantly change the characteristics of an installation. The EIC demonstrates that the installation is safe to energise and use.
              </p>

              <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-400/50">
                <h4 className="font-medium text-blue-300 mb-2">EIC Definition and Scope:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>What it Covers:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Complete new electrical installations</li>
                      <li>• Major alterations changing installation characteristics</li>
                      <li>• Significant additions with new distribution boards</li>
                      <li>• Consumer unit replacements and upgrades</li>
                    </ul>
                  </div>
                  <div>
                    <strong>What it Confirms:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Design compliance with BS 7671</li>
                      <li>• Construction meets specification</li>
                      <li>• Testing completed successfully</li>
                      <li>• Installation safe for energisation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The EIC is fundamentally different from other certificates because it covers the entire process from design through to completion. It requires input from potentially three different competent persons: the designer who specifies the installation, the installer who constructs it, and the tester who verifies compliance.
              </p>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-400/50">
                <h4 className="font-medium text-amber-300 mb-2">EIC vs Other Certificates:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• <strong>EIC:</strong> New installations and major alterations</li>
                  <li>• <strong>Minor Works Certificate (MWC):</strong> Small additions like single circuits</li>
                  <li>• <strong>Electrical Installation Condition Report (EICR):</strong> Periodic inspections of existing installations</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="eic-purpose-check"
            question="What is the purpose of an Electrical Installation Certificate?"
            options={["To increase project costs", "To confirm that new electrical work has been inspected, tested, and complies with regulations", "To satisfy building control only", "To provide warranty coverage"]}
            correctIndex={1}
            explanation="An EIC is required by BS 7671 to confirm that new electrical work has been inspected, tested, and complies with the Wiring Regulations, demonstrating the installation is safe to energise."
          />

          {/* Section 2: When an EIC Must Be Issued */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              When an EIC Must Be Issued
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>An EIC is mandatory for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>New installations (e.g., a new house wiring system)</li>
                <li>Major alterations (e.g., upgrading a consumer unit)</li>
                <li>Large additions (e.g., adding new circuits to an existing installation)</li>
              </ul>
              <p>
                For minor works, such as adding a single socket or lighting point, an EIC is not required — instead, a Minor Works Certificate is used.
              </p>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-400/50">
                <h4 className="font-medium text-green-300 mb-2">Detailed EIC Requirements:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>Always Require EIC:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Complete new installations</li>
                      <li>• Consumer unit replacements</li>
                      <li>• Main distribution board changes</li>
                      <li>• New sub-main installations</li>
                      <li>• Complete rewiring projects</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Use MWC Instead:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Single socket outlet additions</li>
                      <li>• Individual lighting point additions</li>
                      <li>• Single accessory replacements</li>
                      <li>• Small lighting circuit extensions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Consumer unit replacement is a particular area where EICs are mandatory. Even though it might seem like a simple replacement, changing the consumer unit affects the entire installation's protection arrangements and requires comprehensive testing of all existing circuits.
              </p>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-400/50">
                <h4 className="font-medium text-purple-300 mb-2">Special Considerations:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Bathroom installations usually require EIC due to special location requirements</li>
                  <li>• Outdoor installations often need EIC for comprehensive earthing verification</li>
                  <li>• Commercial installations typically require EIC regardless of size</li>
                  <li>• Any work involving Part P notification usually needs EIC</li>
                  <li>• Installation of electric vehicle charging points often requires EIC</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="eic-when-check"
            question="Which type of certificate is used when replacing a consumer unit?"
            options={["Minor Works Certificate", "Electrical Installation Certificate", "Periodic Inspection Report", "Test Certificate"]}
            correctIndex={1}
            explanation="Replacing a consumer unit is a major alteration that requires an Electrical Installation Certificate (EIC)."
          />

          {/* Section 3: Information Included in an EIC */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Information Included in an EIC
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>An EIC includes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Details of the installation (address, description, supply characteristics)</li>
                <li>Schedule of inspections and test results (continuity, insulation resistance, polarity, Zs values, RCD trip times, etc.)</li>
                <li>Designer, installer, and tester details — including names, signatures, and dates</li>
              </ul>
              <p>
                This ensures accountability at every stage of the installation process. Each section shows that the work has been carried out by competent persons.
              </p>

              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-400/50">
                <h4 className="font-medium text-orange-300 mb-2">Detailed EIC Information Sections:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>Installation Details:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Client name and installation address</li>
                      <li>• Description of work carried out</li>
                      <li>• Supply system (TN-S, TN-C-S, TT)</li>
                      <li>• Maximum demand and diversity calculations</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Test Results Schedule:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Continuity of protective conductors</li>
                      <li>• Continuity of ring final circuit conductors</li>
                      <li>• Insulation resistance values</li>
                      <li>• Earth fault loop impedance (Zs) measurements</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The schedule of test results forms the technical heart of the EIC. Each test result must be recorded accurately and compared against the acceptance criteria specified in BS 7671.
              </p>
            </div>
          </section>

          <InlineCheck
            id="eic-signatures-check"
            question="Why does an EIC require signatures from the designer, installer, and tester?"
            options={["Legal formality", "To ensure accountability at every stage of the installation process", "Building control requirement", "Insurance requirement"]}
            correctIndex={1}
            explanation="The EIC requires signatures from designer, installer, and tester to ensure accountability at every stage of the installation process and show that competent persons carried out each phase."
          />

          {/* Section 4: Legal and Professional Importance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Legal and Professional Importance
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                The EIC provides legal evidence that the work complies with BS 7671 and the Electricity at Work Regulations 1989. Without it, the work may be considered non-compliant, leaving both the electrician and the client exposed to liability. Professionally, issuing an EIC demonstrates quality, transparency, and responsibility.
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50">
                <h4 className="font-medium text-red-300 mb-2">Legal Standing of EICs:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>Legal Protection:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Evidence of EAWR 1989 compliance</li>
                      <li>• Defense against negligence claims</li>
                      <li>• Proof of professional competence</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Professional Benefits:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Demonstrates quality workmanship</li>
                      <li>• Builds client confidence</li>
                      <li>• Supports insurance coverage</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-400/50">
                <h4 className="font-medium text-purple-300 mb-2">Professional Consequences of Missing EICs:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Potential removal from competent person schemes</li>
                  <li>• Difficulty obtaining professional insurance</li>
                  <li>• Loss of client confidence and repeat business</li>
                  <li>• Regulatory scrutiny and potential prosecution</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="eic-importance-check"
            question="What could happen if an electrician completes a new installation but does not issue an EIC?"
            options={["Minor documentation issue", "Work is non-compliant with potential liability and insurance issues", "Client may complain", "Building control may ask questions"]}
            correctIndex={1}
            explanation="Without an EIC, work may be considered non-compliant, leaving both electrician and client exposed to liability and potential insurance issues."
          />

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Practical Guidance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Issue for Major Works</h4>
                <p className="text-sm text-white/70">Always issue an EIC for new installations or major alterations.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Complete All Sections</h4>
                <p className="text-sm text-white/70">Make sure all sections of the form are fully and accurately completed.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Use Approved Forms</h4>
                <p className="text-sm text-white/70">Use BS 7671 Appendix 6 forms or approved digital software.</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h4 className="font-medium text-white mb-2">Retain Copies</h4>
                <p className="text-sm text-white/70">Retain a copy for your records and provide the client with their own copy.</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-500/10 border-l-2 border-amber-400/50 rounded-lg">
              <p className="text-sm font-medium text-amber-300">Remember: no EIC = no formal proof of compliance.</p>
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
                <h4 className="font-medium text-red-300 mb-2">Insurance Problems Due to Missing EIC</h4>
                <p className="text-sm text-white/70">
                  A contractor installed a new three-phase distribution board in a small workshop but failed to issue an Electrical Installation Certificate. Months later, when the client applied for insurance cover, the insurer requested evidence of compliance. Without an EIC, the insurer refused to provide full cover until the installation was retested and certified, costing the client extra time and money. The contractor's reputation was damaged, and they lost repeat business.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-400/50">
                <p className="text-sm text-white/70">
                  <strong className="text-green-300">Lesson:</strong> An EIC is not optional — it is essential for client confidence, legal compliance, and professional credibility.
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
                <h3 className="font-medium text-white mb-2">Q: Can an apprentice issue an EIC?</h3>
                <p className="text-sm text-white/70">A: No. Only a competent and qualified person can sign an EIC.</p>
              </div>
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-medium text-white mb-2">Q: Is an EIC needed for replacing a socket outlet?</h3>
                <p className="text-sm text-white/70">A: No. That would normally require a Minor Works Certificate, not an EIC.</p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">Q: How long should an EIC be kept?</h3>
                <p className="text-sm text-white/70">A: For the life of the installation, or until it is replaced by new certification.</p>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="font-semibold text-white mb-3">Recap</h2>
              <p className="text-sm text-white/80">
                An Electrical Installation Certificate (EIC) is required for all new installations and major alterations. It records key details of the installation, test results, and the signatures of the designer, installer, and tester. It provides legal proof of compliance with BS 7671 and professional accountability. Without it, work is non-compliant, uninsured, and potentially unsafe.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Electrical Installation Certificates Quiz" />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-1">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Why Certification Is Required
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-3">
                Minor Works Certificates
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section7_2;
