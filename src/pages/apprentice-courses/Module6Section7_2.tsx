import { ArrowLeft, Target, CheckCircle, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <div className="min-h-screen bg-[#121212]">
      {/* Top header bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white p-0 text-sm sm:text-base" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7
            </Link>
          </Button>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg ">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 6.7.2
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Awareness of Electrical Installation Certificates (EICs)
          </h1>
          <p className="text-white text-sm sm:text-base">
            Understanding Electrical Installation Certificates for new installations and major alterations
          </p>
        </header>

        {/* Spot it in 30 Seconds Card */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">Spot it in 30 Seconds</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-border/30">
              <p className="font-medium mb-2 sm:mb-3">In 30 seconds</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>EIC required for new installations and major alterations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>MWC used for minor works instead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Must include designer, installer, and tester signatures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Provides legal proof of BS 7671 compliance</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> New installations without EICs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> BS 7671 Appendix 6 forms or approved software</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> All sections completed before handover</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            The Electrical Installation Certificate (EIC) is the primary document used to certify that new electrical installations, or significant alterations, comply with BS 7671. It confirms that the design, construction, inspection, and testing of the installation meet the required standards for safety and performance. This subsection introduces apprentices to what an EIC is, when it is required, and why it is such a critical document in the electrical industry.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-white mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Explain what an Electrical Installation Certificate (EIC) is</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify when an EIC must be issued</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Describe the key information contained within an EIC</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand the legal and professional importance of EICs</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Content / Learning</h2>

          {/* 1. What an EIC Is */}
          <section className="mb-4 sm:mb-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-2 sm:mb-3 text-sm sm:text-base">What an EIC Is</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        An Electrical Installation Certificate (EIC) is an official document required by BS 7671 to confirm that new electrical work has been inspected, tested, and complies with the Wiring Regulations. It applies to all new installations, as well as major alterations or additions that significantly change the characteristics of an installation. The EIC demonstrates that the installation is safe to energise and use.
                      </p>

                      <div className="bg-elec-yellow/5 dark:bg-elec-yellow/10 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <h4 className="font-medium text-blue-800 text-elec-yellow mb-2">EIC Definition and Scope:</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-blue-700 text-elec-yellow">
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

                      <p className="text-xs sm:text-sm text-white">
                        The EIC is fundamentally different from other certificates because it covers the entire process from design through to completion. It requires input from potentially three different competent persons: the designer who specifies the installation, the installer who constructs it, and the tester who verifies compliance. This multi-stage approach ensures accountability at every phase.
                      </p>

                      <p className="text-xs sm:text-sm text-white">
                        Understanding what constitutes a "new installation" or "major alteration" is crucial for determining when an EIC is required. Generally, if the work involves changes to the main distribution board, addition of new circuits that significantly alter the installation's characteristics, or complete rewiring, an EIC will be necessary rather than a Minor Works Certificate.
                      </p>

                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">EIC vs Other Certificates:</h4>
                        <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                          <li>• <strong>EIC:</strong> New installations and major alterations</li>
                          <li>• <strong>Minor Works Certificate (MWC):</strong> Small additions like single circuits</li>
                          <li>• <strong>Electrical Installation Condition Report (EICR):</strong> Periodic inspections of existing installations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
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

          {/* 2. When an EIC Must Be Issued */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">When an EIC Must Be Issued</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        An EIC is mandatory for:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-white ml-4">
                        <li>New installations (e.g., a new house wiring system)</li>
                        <li>Major alterations (e.g., upgrading a consumer unit)</li>
                        <li>Large additions (e.g., adding new circuits to an existing installation)</li>
                      </ul>
                      <p className="text-xs sm:text-sm text-white">
                        For minor works, such as adding a single socket or lighting point, an EIC is not required — instead, a Minor Works Certificate is used.
                      </p>

                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Detailed EIC Requirements:</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-green-700 dark:text-green-400">
                          <div>
                            <strong>Always Require EIC:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Complete new installations (houses, commercial premises)</li>
                              <li>• Consumer unit replacements</li>
                              <li>• Main distribution board changes</li>
                              <li>• New sub-main installations</li>
                              <li>• Complete rewiring projects</li>
                              <li>• Fire alarm system installations</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Use MWC Instead:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Single socket outlet additions</li>
                              <li>• Individual lighting point additions</li>
                              <li>• Single accessory replacements</li>
                              <li>• Small lighting circuit extensions</li>
                              <li>• Replacement of individual protective devices</li>
                              <li>• Single spur additions from existing circuits</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        The distinction between EIC and MWC work often depends on the scope and impact of the changes. If the work significantly alters the installation's characteristics, affects the main distribution arrangements, or involves multiple circuits, an EIC is typically required. When in doubt, it's generally safer to use an EIC rather than risk non-compliance.
                      </p>

                      <p className="text-xs sm:text-sm text-white">
                        Consumer unit replacement is a particular area where EICs are mandatory. Even though it might seem like a simple replacement, changing the consumer unit affects the entire installation's protection arrangements and requires comprehensive testing of all existing circuits to ensure compatibility with new protective devices.
                      </p>

                      <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                        <h4 className="font-medium text-purple-800 text-elec-yellow mb-2">Special Considerations:</h4>
                        <ul className="text-sm text-purple-700 text-elec-yellow space-y-1">
                          <li>• Bathroom installations usually require EIC due to special location requirements</li>
                          <li>• Outdoor installations often need EIC for comprehensive earthing verification</li>
                          <li>• Commercial installations typically require EIC regardless of size</li>
                          <li>• Any work involving Part P notification usually needs EIC</li>
                          <li>• Installation of electric vehicle charging points often requires EIC</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
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

          {/* 3. Information Included in an EIC */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-orange-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-orange-600 text-elec-yellow mb-3 text-base">Information Included in an EIC</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        An EIC includes:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-white ml-4">
                        <li>Details of the installation (address, description, supply characteristics)</li>
                        <li>Schedule of inspections and test results (continuity, insulation resistance, polarity, Zs values, RCD trip times, etc.)</li>
                        <li>Designer, installer, and tester details — including names, signatures, and dates</li>
                      </ul>
                      <p className="text-xs sm:text-sm text-white">
                        This ensures accountability at every stage of the installation process. Each section shows that the work has been carried out by competent persons.
                      </p>

                      <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-3">
                        <h4 className="font-medium text-orange-800 text-elec-yellow mb-2">Detailed EIC Information Sections:</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-orange-700 text-elec-yellow">
                          <div>
                            <strong>Installation Details:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Client name and installation address</li>
                              <li>• Description of work carried out</li>
                              <li>• Supply system (TN-S, TN-C-S, TT)</li>
                              <li>• Maximum demand and diversity calculations</li>
                              <li>• Number and type of circuits</li>
                              <li>• Main earthing conductor size and arrangement</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Test Results Schedule:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Continuity of protective conductors</li>
                              <li>• Continuity of ring final circuit conductors</li>
                              <li>• Insulation resistance values</li>
                              <li>• Polarity verification results</li>
                              <li>• Earth fault loop impedance (Zs) measurements</li>
                              <li>• RCD operation times and trip currents</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        The schedule of test results forms the technical heart of the EIC. Each test result must be recorded accurately and compared against the acceptance criteria specified in BS 7671. Any deviation from acceptable limits must be investigated and corrected before the certificate can be completed.
                      </p>

                      <p className="text-xs sm:text-sm text-white">
                        Designer, installer, and tester sections require full details including names, qualifications, registration numbers (where applicable), signatures, and dates. This multi-signature approach ensures that each phase of the work has been properly overseen by competent persons, creating clear accountability chains.
                      </p>

                      <div className="bg-gray-50 dark:bg-gray-950/20 border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                        <h4 className="font-medium text-gray-800 dark:text-gray-300 mb-2">Additional EIC Requirements:</h4>
                        <ul className="text-sm text-gray-700 dark:text-gray-400 space-y-1">
                          <li>• Schedule of inspections completed with observation codes</li>
                          <li>• Instrument details including make, model, and calibration dates</li>
                          <li>• Schedule of items inspected during visual examination</li>
                          <li>• Details of departures from BS 7671 with justification</li>
                          <li>• Next inspection recommendation (typically within 5-10 years)</li>
                          <li>• Distributor's equipment details and supply characteristics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <InlineCheck
            id="eic-signatures-check"
            question="Why does an EIC require signatures from the designer, installer, and tester?"
            options={["Legal formality", "To ensure accountability at every stage of the installation process", "Building control requirement", "Insurance requirement"]}
            correctIndex={1}
            explanation="The EIC requires signatures from designer, installer, and tester to ensure accountability at every stage of the installation process and show that competent persons carried out each phase."
          />

          {/* 4. Legal and Professional Importance */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3 text-base">Legal and Professional Importance</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        The EIC provides legal evidence that the work complies with BS 7671 and the Electricity at Work Regulations 1989. Without it, the work may be considered non-compliant, leaving both the electrician and the client exposed to liability. Professionally, issuing an EIC demonstrates quality, transparency, and responsibility. Clients, insurers, and building control officers all expect to see the certificate before an installation is accepted.
                      </p>

                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <h4 className="font-medium text-red-800 text-elec-yellow mb-2">Legal Standing of EICs:</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-red-700 text-elec-yellow">
                          <div>
                            <strong>Legal Protection:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Evidence of EAWR 1989 compliance</li>
                              <li>• Defense against negligence claims</li>
                              <li>• Proof of professional competence</li>
                              <li>• Supports due diligence arguments</li>
                            </ul>
                          </div>
                          <div>
                            <strong>Professional Benefits:</strong>
                            <ul className="mt-1 space-y-1 ml-4">
                              <li>• Demonstrates quality workmanship</li>
                              <li>• Builds client confidence</li>
                              <li>• Supports insurance coverage</li>
                              <li>• Meets building control requirements</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        From a legal perspective, the EIC serves as prima facie evidence that proper procedures were followed and safety standards met. In court proceedings or regulatory investigations, a properly completed EIC demonstrates that the electrician acted professionally and followed industry best practice.
                      </p>

                      <p className="text-xs sm:text-sm text-white">
                        Insurance companies specifically require EICs for new installations before providing coverage. The certificate demonstrates that risks have been properly assessed and mitigated through compliance with recognized standards. Without this documentation, coverage may be denied or significantly restricted.
                      </p>

                      <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-3">
                        <h4 className="font-medium text-purple-800 text-elec-yellow mb-2">Professional Consequences of Missing EICs:</h4>
                        <ul className="text-sm text-purple-700 text-elec-yellow space-y-1">
                          <li>• Potential removal from competent person schemes</li>
                          <li>• Difficulty obtaining professional insurance</li>
                          <li>• Loss of client confidence and repeat business</li>
                          <li>• Regulatory scrutiny and potential prosecution</li>
                          <li>• Civil liability for resultant damages</li>
                          <li>• Damage to professional reputation in industry</li>
                        </ul>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        Building control officers and electrical safety inspectors rely on EICs to verify that new installations meet safety standards. These officials have the power to require remedial work or issue prohibition notices if proper certification is not provided. This can lead to significant project delays and additional costs.
                      </p>

                      <p className="text-xs sm:text-sm text-white">
                        For future work on the installation, the EIC provides essential baseline information that subsequent electricians need to ensure safety and compliance. This continuity of documentation is particularly important for maintenance, troubleshooting, and modification work.
                      </p>
                    </div>
                  </div>
                </div>
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
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Practical Guidance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-white mb-1">Issue for Major Works</h3>
                <p className="text-sm text-white">Always issue an EIC for new installations or major alterations.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-white mb-1">Complete All Sections</h3>
                <p className="text-sm text-white">Make sure all sections of the form are fully and accurately completed.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-white mb-1">Use Approved Forms</h3>
                <p className="text-sm text-white">Use BS 7671 Appendix 6 forms or approved digital software.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-white mb-1">Retain Copies</h3>
                <p className="text-sm text-white">Retain a copy for your records and provide the client with their own copy.</p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Remember: no EIC = no formal proof of compliance.</p>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Real-World Example</h2>
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-red-800 text-elec-yellow mb-2">Insurance Problems Due to Missing EIC</h3>
            <p className="text-sm text-red-700 text-elec-yellow mb-3">
              A contractor installed a new three-phase distribution board in a small workshop but failed to issue an Electrical Installation Certificate. Months later, when the client applied for insurance cover, the insurer requested evidence of compliance. Without an EIC, the insurer refused to provide full cover until the installation was retested and certified, costing the client extra time and money. The contractor's reputation was damaged, and they lost repeat business.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">✅ Lesson</h3>
            <p className="text-sm text-green-700 dark:text-green-400">
              An EIC is not optional — it is essential for client confidence, legal compliance, and professional credibility.
            </p>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">FAQs</h2>
          <div className="space-y-4">
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-medium text-white mb-2">Q: Can an apprentice issue an EIC?</h3>
              <p className="text-sm text-white">A: No. Only a competent and qualified person can sign an EIC.</p>
            </div>
            <div className="border-b border-white/10 pb-4">
              <h3 className="font-medium text-white mb-2">Q: Is an EIC needed for replacing a socket outlet?</h3>
              <p className="text-sm text-white">A: No. That would normally require a Minor Works Certificate, not an EIC.</p>
            </div>
            <div>
              <h3 className="font-medium text-white mb-2">Q: How long should an EIC be kept?</h3>
              <p className="text-sm text-white">A: For the life of the installation, or until it is replaced by new certification.</p>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4">Recap</h2>
          <p className="text-sm sm:text-base text-white">
            An Electrical Installation Certificate (EIC) is required for all new installations and major alterations. It records key details of the installation, test results, and the signatures of the designer, installer, and tester. It provides legal proof of compliance with BS 7671 and professional accountability. Without it, work is non-compliant, uninsured, and potentially unsafe.
          </p>
        </Card>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Electrical Installation Certificates Quiz" />

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../7-1" className="flex items-center justify-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous: Why Certification Is Required</span>
              <span className="sm:hidden">Previous: Certification</span>
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../7-3" className="flex items-center justify-center gap-2">
              <span className="hidden sm:inline">Next: Minor Works Certificates</span>
              <span className="sm:hidden">Next: Minor Works</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section7_2;