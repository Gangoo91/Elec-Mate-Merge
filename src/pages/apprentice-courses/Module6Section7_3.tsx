import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";

const Module6Section7_3 = () => {
  useSEO(
    "Minor Works Certificates (Awareness Level) - Level 2 Module 6 Section 7.3",
    "Understanding Minor Works Certificates for small electrical alterations and additions"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What does MWC stand for?",
      options: ["Electrical Inspection Certificate", "Minor Works Certificate", "Major Works Certificate", "Monthly Works Certificate"],
      correctAnswer: 1,
      explanation: "MWC stands for Minor Works Certificate, used for small electrical alterations and additions."
    },
    {
      id: 2,
      question: "What is the purpose of a Minor Works Certificate?",
      options: ["To increase costs", "To provide evidence that small electrical work complies with BS 7671", "To delay projects", "To satisfy insurance only"],
      correctAnswer: 1,
      explanation: "A Minor Works Certificate provides evidence that even small electrical work has been inspected, tested, and complies with BS 7671."
    },
    {
      id: 3,
      question: "Give two examples of jobs that require an MWC.",
      options: ["New consumer unit and rewiring", "Adding a socket outlet and adding a lighting point", "Testing only and inspection only", "Design work and planning"],
      correctAnswer: 1,
      explanation: "Adding a socket outlet to an existing circuit and adding a lighting point are typical examples of minor works requiring an MWC."
    },
    {
      id: 4,
      question: "What type of work requires an EIC instead of an MWC?",
      options: ["Adding a single socket", "Installing a new circuit", "Adding a lighting point", "Minor repairs"],
      correctAnswer: 1,
      explanation: "Installing a new circuit or major alterations require a full Electrical Installation Certificate (EIC) rather than a Minor Works Certificate."
    },
    {
      id: 5,
      question: "What test results are typically recorded on an MWC?",
      options: ["None required", "Continuity, insulation resistance, polarity, and Zs values", "Only visual inspection", "Cost information only"],
      correctAnswer: 1,
      explanation: "MWCs must record relevant test results including continuity, insulation resistance, polarity, and earth fault loop impedance (Zs) values."
    },
    {
      id: 6,
      question: "True or False: Small alterations do not require certification.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. All electrical alterations, however small, require appropriate certification - either an MWC for minor works or EIC for major works."
    },
    {
      id: 7,
      question: "Who is responsible for signing a Minor Works Certificate?",
      options: ["Any electrician", "The client", "A competent person who carried out or supervised the work", "Building control"],
      correctAnswer: 2,
      explanation: "Only a competent person who carried out or supervised the work can legally sign a Minor Works Certificate."
    },
    {
      id: 8,
      question: "Why is it important to provide the client with a copy of the MWC?",
      options: ["Legal requirement and proof of compliance", "For payment purposes", "To increase costs", "No real importance"],
      correctAnswer: 0,
      explanation: "Providing the client with a copy is a legal requirement and gives them proof that the work complies with BS 7671."
    },
    {
      id: 9,
      question: "What legal standard does the MWC confirm compliance with?",
      options: ["BS 7909", "BS 7671", "BS 7430", "BS 6701"],
      correctAnswer: 1,
      explanation: "The Minor Works Certificate confirms compliance with BS 7671 (The IET Wiring Regulations)."
    },
    {
      id: 10,
      question: "In the real-world example, what problem occurred because no MWC was issued?",
      options: ["Work was delayed", "The sale was delayed and additional costs occurred", "Nothing happened", "Insurance was cancelled"],
      correctAnswer: 1,
      explanation: "The house sale was delayed and the seller had to pay for an EICR because no MWC was available to prove the work was compliant."
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
              <span className="text-white/60">Section 6.7.3</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Minor Works Certificates (Awareness Level)
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding Minor Works Certificates for small electrical alterations and additions
            </p>
          </header>

          {/* Summary Box */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h2 className="font-semibold text-white mb-3">Spot it in 30 Seconds</h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>MWC required for small alterations and additions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>EIC used for new circuits and major works instead</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Must record test results and competent person signature</span>
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
                Not every electrical job is large enough to require a full Electrical Installation Certificate (EIC). For smaller tasks, such as adding a socket to an existing circuit, a Minor Electrical Installation Works Certificate (MWC) is used instead. The MWC is a shorter document, but it is still a legal requirement and provides evidence that the work complies with BS 7671.
              </p>
            </div>
          </section>

          {/* Section 1: What a Minor Works Certificate Is */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              What a Minor Works Certificate Is
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                A Minor Works Certificate (MWC) is a simplified version of the Electrical Installation Certificate. It is designed for small alterations and additions that do not significantly change the characteristics of the installation. While shorter, it still confirms that inspection, testing, and verification have been carried out, and that the work is safe and compliant with BS 7671.
              </p>

              <div className="p-4 rounded-lg bg-blue-500/10 border-l-2 border-blue-400/50">
                <h4 className="font-medium text-blue-300 mb-2">Key Characteristics of an MWC</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>Document Structure:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Single-page format for efficiency</li>
                      <li>• Pre-printed sections for consistency</li>
                      <li>• Clear fields for all required information</li>
                      <li>• Space for additional observations</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Legal Status:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Legally binding document under BS 7671</li>
                      <li>• Required for Building Control notification</li>
                      <li>• Evidence for insurance purposes</li>
                      <li>• Protection for electrician and client</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                The MWC differs from a full EIC in scope and complexity. While an EIC covers entire installations or major alterations involving multiple circuits, the MWC focuses on specific, limited additions or modifications.
              </p>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-400/50">
                <h4 className="font-medium text-amber-300 mb-2">When MWC is NOT Suitable</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Installing complete new circuits from the consumer unit</li>
                  <li>• Consumer unit replacements or upgrades</li>
                  <li>• Work involving special locations (bathrooms, swimming pools)</li>
                  <li>• Multiple circuit installations or major rewiring</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="mwc-purpose-check"
            question="What is the purpose of a Minor Works Certificate?"
            options={["To increase project costs", "To provide evidence that small electrical work complies with BS 7671", "To delay projects", "To satisfy insurance only"]}
            correctIndex={1}
            explanation="A Minor Works Certificate provides evidence that even small electrical work has been inspected, tested, and complies with BS 7671."
          />

          {/* Section 2: When a MWC Must Be Issued */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              When a MWC Must Be Issued
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>A MWC is required for jobs such as:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Adding a new socket outlet to an existing ring final circuit</li>
                <li>Adding a lighting point to an existing circuit</li>
                <li>Extending a circuit by a short distance</li>
                <li>Small alterations that do not involve creating a new circuit</li>
              </ul>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-400/50">
                <h4 className="font-medium text-green-300 mb-2">Common MWC Scenarios</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>Typical Domestic Work:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Adding sockets in kitchens or bedrooms</li>
                      <li>• Installing additional light switches</li>
                      <li>• Extending circuits for garden lighting</li>
                      <li>• Adding spur connections from ring circuits</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Small Commercial Additions:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Office socket additions</li>
                      <li>• Workshop lighting extensions</li>
                      <li>• Small equipment connections</li>
                      <li>• Emergency lighting point additions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                If a new circuit is installed, or a major alteration is made (e.g., replacing a consumer unit), a full EIC must be issued instead. The key determining factor is whether the work significantly changes the electrical characteristics of the installation.
              </p>

              <div className="p-4 rounded-lg bg-purple-500/10 border-l-2 border-purple-400/50">
                <h4 className="font-medium text-purple-300 mb-2">Decision Guide - MWC vs EIC</h4>
                <p className="font-medium text-white/80 mb-2">Ask yourself:</p>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Is this work limited to one existing circuit?</li>
                  <li>• Does it involve less than one-third of circuit length?</li>
                  <li>• Are you NOT creating new circuits?</li>
                  <li>• Is the consumer unit unchanged?</li>
                </ul>
                <p className="mt-2 text-sm font-medium text-white/80">
                  If all answers are "Yes" → use MWC | If any answer is "No" → use EIC
                </p>
              </div>
            </div>
          </section>

          <InlineCheck
            id="mwc-vs-eic-check"
            question="Would adding a brand-new circuit require a Minor Works Certificate or an EIC?"
            options={["Minor Works Certificate", "Electrical Installation Certificate (EIC)", "No certificate needed", "Either certificate can be used"]}
            correctIndex={1}
            explanation="Adding a brand-new circuit requires a full Electrical Installation Certificate (EIC) as it significantly changes the installation characteristics."
          />

          {/* Section 3: Information Recorded on a MWC */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Information Recorded on a MWC
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>The Minor Works Certificate records:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The client and installation details</li>
                <li>A description of the work carried out</li>
                <li>The relevant test results (e.g., continuity, insulation resistance, polarity, Zs values)</li>
                <li>Confirmation that the work complies with BS 7671</li>
                <li>The name, signature, and details of the competent person who carried out or supervised the work</li>
              </ul>

              <div className="p-4 rounded-lg bg-orange-500/10 border-l-2 border-orange-400/50">
                <h4 className="font-medium text-orange-300 mb-2">Detailed MWC Sections</h4>
                <div className="space-y-3 text-sm text-white/70">
                  <div>
                    <strong>1. Installation Details:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Client name and address</li>
                      <li>• Installation address (if different)</li>
                      <li>• Description of premises</li>
                      <li>• Date of completion</li>
                    </ul>
                  </div>
                  <div>
                    <strong>2. Work Description:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Exact location of work</li>
                      <li>• Circuit identification</li>
                      <li>• Type of alteration/addition</li>
                    </ul>
                  </div>
                  <div>
                    <strong>3. Essential Test Results:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Earth continuity (where applicable)</li>
                      <li>• Insulation resistance</li>
                      <li>• Polarity check</li>
                      <li>• Earth fault loop impedance (Zs)</li>
                      <li>• RCD operation (if applicable)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Although simpler than an EIC, the MWC is still an official legal document. Every section must be completed accurately, and any defects or limitations must be clearly noted.
              </p>

              <div className="p-4 rounded-lg bg-amber-500/10 border-l-2 border-amber-400/50">
                <h4 className="font-medium text-amber-300 mb-2">Common Completion Errors:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Incomplete test result sections</li>
                  <li>• Vague work descriptions</li>
                  <li>• Missing circuit identification</li>
                  <li>• Unsigned or incorrectly signed certificates</li>
                  <li>• No copy provided to client</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="mwc-details-check"
            question="What details must always be included on a Minor Works Certificate?"
            options={["Only the cost of work", "Client details, work description, test results, and competent person signature", "Just the date completed", "Only visual inspection notes"]}
            correctIndex={1}
            explanation="An MWC must include client and installation details, work description, relevant test results, BS 7671 compliance confirmation, and the competent person's signature."
          />

          {/* Section 4: Why MWCs Are Important */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              Why MWCs Are Important
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                It can be tempting to treat small jobs informally, but every piece of electrical work must be documented. An MWC proves that even minor alterations were carried out safely and correctly. Without it, the electrician has no legal protection if something goes wrong, and the client cannot prove that the system is compliant.
              </p>

              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50">
                <h4 className="font-medium text-red-300 mb-2">Consequences of Missing MWCs:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white/70">
                  <div>
                    <strong>For the Electrician:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• No legal protection in disputes</li>
                      <li>• Professional indemnity issues</li>
                      <li>• Scheme provider penalties</li>
                      <li>• Potential prosecution</li>
                    </ul>
                  </div>
                  <div>
                    <strong>For the Client:</strong>
                    <ul className="mt-1 space-y-1 ml-4">
                      <li>• Insurance claims may be rejected</li>
                      <li>• Property sale complications</li>
                      <li>• Building Control non-compliance</li>
                      <li>• Future safety uncertainties</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p>
                Beyond legal requirements, MWCs serve practical purposes. They create an audit trail of electrical modifications, help with fault-finding, and assist in planning future work.
              </p>

              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-400/50">
                <h4 className="font-medium text-green-300 mb-2">Professional Benefits of Proper Certification:</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li><strong>Trust Building:</strong> Demonstrates professionalism and attention to detail</li>
                  <li><strong>Quality Assurance:</strong> Shows work meets industry standards</li>
                  <li><strong>Legal Protection:</strong> Provides defence against liability claims</li>
                  <li><strong>Industry Reputation:</strong> Maintains high standards across the electrical trade</li>
                </ul>
              </div>
            </div>
          </section>

          <InlineCheck
            id="mwc-risks-check"
            question="What are the risks of carrying out minor works without issuing a certificate?"
            options={["No risks involved", "Legal liability, no proof of compliance, and potential insurance issues", "Only cost implications", "Minor paperwork concerns only"]}
            correctIndex={1}
            explanation="Without an MWC, there's no legal protection for the electrician, no proof of compliance for the client, and potential insurance and liability issues if problems occur."
          />

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Practical Guidance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-white/70">Always issue an MWC for any minor works, no matter how small</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-white/70">Fill out every section clearly and accurately</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-white/70">Provide the client with a copy and retain one for your own records</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm text-white/70">Treat the MWC with the same professionalism as a full EIC</p>
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
                An electrician was asked to add an extra socket to a kitchen ring final circuit. The work was completed and tested, but no Minor Works Certificate was issued. Months later, when the house was being sold, the buyer's surveyor asked for certification of all electrical alterations. Because no certificate could be produced, the seller had to pay for an Electrical Installation Condition Report (EICR) before the sale could proceed.
              </p>
              <div className="p-4 rounded-lg bg-red-500/10 border-l-2 border-red-400/50">
                <p className="text-sm text-white/70">
                  <strong className="text-red-300">Issue:</strong> No Minor Works Certificate issued for socket addition, causing sale delays and additional costs for EICR.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-500/10 border-l-2 border-green-400/50">
                <p className="text-sm text-white/70">
                  <strong className="text-green-300">Lesson:</strong> Minor Works Certificates save time, money, and disputes by proving compliance for small jobs.
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
                <h3 className="font-medium text-white mb-2">Q: Is an MWC optional for very small jobs?</h3>
                <p className="text-sm text-white/70">A: No. All alterations, however small, require certification.</p>
              </div>
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-medium text-white mb-2">Q: Who can sign a Minor Works Certificate?</h3>
                <p className="text-sm text-white/70">A: A competent person who carried out or supervised the work.</p>
              </div>
              <div>
                <h3 className="font-medium text-white mb-2">Q: Does a Minor Works Certificate replace an EIC?</h3>
                <p className="text-sm text-white/70">A: No. It only applies to small additions or alterations; new circuits and major works require an EIC.</p>
              </div>
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
              <h2 className="font-semibold text-white mb-3">Recap</h2>
              <p className="text-sm text-white/80">
                A Minor Works Certificate (MWC) is used for small alterations and additions, such as adding a socket or lighting point. It records the work done, test results, and the signature of the competent person. It is legally required under BS 7671 and provides evidence of compliance, even for small jobs. Skipping certification for minor works creates legal, financial, and professional risks.
              </p>
            </div>
          </section>

          {/* Quiz */}
          <Quiz
            title="Minor Works Certificates Quiz"
            questions={quizQuestions}
          />

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10 mt-10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-2">
                <ChevronLeft className="w-4 h-4 mr-2" />
                EICs
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../7-4">
                Who Can Sign Off Work
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
};

export default Module6Section7_3;
