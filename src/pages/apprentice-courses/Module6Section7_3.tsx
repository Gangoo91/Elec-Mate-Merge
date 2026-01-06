import { ArrowLeft, Target, CheckCircle, ClipboardCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
              <ClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 6.7.3
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Minor Works Certificates (Awareness Level)
          </h1>
          <p className="text-white text-sm sm:text-base">
            Understanding Minor Works Certificates for small electrical alterations and additions
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
                  <span>MWC required for small alterations and additions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>EIC used for new circuits and major works instead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Must record test results and competent person signature</span>
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
                  <span><strong>Spot:</strong> Small jobs without proper certification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> MWC for minor alterations, EIC for new circuits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> All test results and signatures completed</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Not every electrical job is large enough to require a full Electrical Installation Certificate (EIC). For smaller tasks, such as adding a socket to an existing circuit, a Minor Electrical Installation Works Certificate (MWC) is used instead. The MWC is a shorter document, but it is still a legal requirement and provides evidence that the work complies with BS 7671. This subsection introduces learners to Minor Works Certificates, when they must be issued, and why they are important even for small jobs.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-white mb-3 sm:mb-4">By the end of this subsection, learners will be able to:</p>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-white">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Explain what a Minor Works Certificate (MWC) is</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Identify when a MWC is required instead of a full EIC</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Recognise the information recorded on an MWC</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Understand why even small jobs require certification</span>
            </li>
          </ul>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Content / Learning</h2>

          {/* 1. What a Minor Works Certificate Is */}
          <section className="mb-4 sm:mb-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-lg p-3 sm:p-5 border-l-4 border-l-elec-yellow ">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <span className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-elec-yellow text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</span>
                  <div className="flex-1">
                    <p className="font-semibold text-elec-yellow text-elec-yellow mb-2 sm:mb-3 text-sm sm:text-base">What a Minor Works Certificate Is</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        A Minor Works Certificate (MWC) is a simplified version of the Electrical Installation Certificate. It is designed for small alterations and additions that do not significantly change the characteristics of the installation. While shorter, it still confirms that inspection, testing, and verification have been carried out, and that the work is safe and compliant with BS 7671.
                      </p>

                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 shadow-sm">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                          Key Characteristics of an MWC
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong className="text-blue-900 dark:text-blue-200 block mb-2">Document Structure:</strong>
                            <ul className="space-y-1 text-blue-800 text-elec-yellow">
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Single-page format for efficiency</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Pre-printed sections for consistency</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Clear fields for all required information</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Space for additional observations</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-blue-900 dark:text-blue-200 block mb-2">Legal Status:</strong>
                            <ul className="space-y-1 text-blue-800 text-elec-yellow">
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Legally binding document under BS 7671</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Required for Building Control notification</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Evidence for insurance purposes</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Protection for electrician and client</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        The MWC differs from a full EIC in scope and complexity. While an EIC covers entire installations or major alterations involving multiple circuits, the MWC focuses on specific, limited additions or modifications. This targeted approach makes it more practical for everyday electrical work while maintaining the same standards of safety verification and regulatory compliance.
                      </p>

                      <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 shadow-sm">
                        <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          When MWC is NOT Suitable
                        </h4>
                        <ul className="space-y-2 text-amber-800 dark:text-amber-200">
                          <li className="flex items-start gap-3">
                            <span className="text-amber-500 mt-1">⚠️</span>
                            <span>Installing complete new circuits from the consumer unit</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-amber-500 mt-1">⚠️</span>
                            <span>Consumer unit replacements or upgrades</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-amber-500 mt-1">⚠️</span>
                            <span>Work involving special locations (bathrooms, swimming pools)</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-amber-500 mt-1">⚠️</span>
                            <span>Multiple circuit installations or major rewiring</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
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

          {/* 2. When a MWC Must Be Issued */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-green-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div className="flex-1">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-3 text-base">When a MWC Must Be Issued</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        A MWC is required for jobs such as:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-white ml-4">
                        <li>Adding a new socket outlet to an existing ring final circuit</li>
                        <li>Adding a lighting point to an existing circuit</li>
                        <li>Extending a circuit by a short distance</li>
                        <li>Small alterations that do not involve creating a new circuit</li>
                      </ul>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 shadow-sm">
                        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Common MWC Scenarios
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong className="text-green-900 dark:text-green-200 block mb-2">Typical Domestic Work:</strong>
                            <ul className="space-y-1 text-green-800 dark:text-green-300">
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Adding sockets in kitchens or bedrooms</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Installing additional light switches</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Extending circuits for garden lighting</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Adding spur connections from ring circuits</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-green-900 dark:text-green-200 block mb-2">Small Commercial Additions:</strong>
                            <ul className="space-y-1 text-green-800 dark:text-green-300">
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Office socket additions</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Workshop lighting extensions</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Small equipment connections</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                <span>Emergency lighting point additions</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        If a new circuit is installed, or a major alteration is made (e.g., replacing a consumer unit), a full EIC must be issued instead. The key determining factor is whether the work significantly changes the electrical characteristics of the installation.
                      </p>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 shadow-sm">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                          Decision Guide - MWC vs EIC
                        </h4>
                        <p className="font-medium text-blue-900 dark:text-blue-200 mb-3">Ask yourself:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-sm">
                          <div className="flex items-center gap-2 text-blue-800 text-elec-yellow">
                            <span className="text-elec-yellow">🔍</span>
                            <span>Is this work limited to one existing circuit?</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-800 text-elec-yellow">
                            <span className="text-elec-yellow">📏</span>
                            <span>Does it involve less than one-third of circuit length?</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-800 text-elec-yellow">
                            <span className="text-elec-yellow">🔌</span>
                            <span>Are you NOT creating new circuits?</span>
                          </div>
                          <div className="flex items-center gap-2 text-blue-800 text-elec-yellow">
                            <span className="text-elec-yellow">⚡</span>
                            <span>Is the consumer unit unchanged?</span>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg p-3 border border-green-200 dark:border-green-700">
                          <p className="font-semibold text-center text-green-800 dark:text-green-200">
                            If all answers are "Yes" → use MWC | If any answer is "No" → use EIC
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

          {/* 3. Information Recorded on a MWC */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-purple-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-600 text-elec-yellow mb-3 text-base">Information Recorded on a MWC</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        The Minor Works Certificate records:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-white ml-4">
                        <li>The client and installation details</li>
                        <li>A description of the work carried out</li>
                        <li>The relevant test results (e.g., continuity, insulation resistance, polarity, Zs values)</li>
                        <li>Confirmation that the work complies with BS 7671</li>
                        <li>The name, signature, and details of the competent person who carried out or supervised the work</li>
                      </ul>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 shadow-sm">
                        <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          Detailed MWC Sections
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <strong className="text-purple-900 dark:text-purple-200 block mb-2 flex items-center gap-2">
                              <span className="text-elec-yellow">1️⃣</span>
                              Installation Details:
                            </strong>
                            <ul className="space-y-1 text-purple-800 text-elec-yellow ml-6">
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Client name and address</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Installation address (if different)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Description of premises</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Date of completion</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-purple-900 dark:text-purple-200 block mb-2 flex items-center gap-2">
                              <span className="text-elec-yellow">2️⃣</span>
                              Work Description:
                            </strong>
                            <ul className="space-y-1 text-purple-800 text-elec-yellow ml-6">
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Exact location of work</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Circuit identification</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Type of alteration/addition</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Reference to circuit diagram</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <strong className="text-purple-900 dark:text-purple-200 block mb-2 flex items-center gap-2">
                              <span className="text-elec-yellow">3️⃣</span>
                              Essential Test Results:
                            </strong>
                            <ul className="space-y-1 text-purple-800 text-elec-yellow ml-6">
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Earth continuity (where applicable)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Insulation resistance</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Polarity check</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>Earth fault loop impedance (Zs)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-elec-yellow mt-1">•</span>
                                <span>RCD operation (if applicable)</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        Although simpler than an EIC, the MWC is still an official legal document. Every section must be completed accurately, and any defects or limitations must be clearly noted. The certificate serves as a permanent record that can be referenced by future electricians, inspectors, or insurance assessors.
                      </p>

                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                        <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">Common Completion Errors:</h4>
                        <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
                          <li>• Incomplete test result sections</li>
                          <li>• Vague work descriptions</li>
                          <li>• Missing circuit identification</li>
                          <li>• Unsigned or incorrectly signed certificates</li>
                          <li>• No copy provided to client</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
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

          {/* 4. Why MWCs Are Important */}
          <section className="mb-6">
            <div className="space-y-6">
              <div className="rounded-lg p-5 border-l-4 border-l-red-500 ">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div className="flex-1">
                    <p className="font-semibold text-red-600 text-elec-yellow mb-3 text-base">Why MWCs Are Important</p>
                    
                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-white">
                        It can be tempting to treat small jobs informally, but every piece of electrical work must be documented. An MWC proves that even minor alterations were carried out safely and correctly. Without it, the electrician has no legal protection if something goes wrong, and the client cannot prove that the system is compliant. Minor Works Certificates also help future electricians understand what work has been done and when.
                      </p>

                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <h4 className="font-medium text-red-800 text-elec-yellow mb-2">Consequences of Missing MWCs:</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-red-700 text-elec-yellow">
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

                      <p className="text-xs sm:text-sm text-white">
                        Beyond legal requirements, MWCs serve practical purposes. They create an audit trail of electrical modifications, help with fault-finding, and assist in planning future work. When an electrician encounters previous alterations, an MWC provides vital information about the installation date, methods used, and test results achieved.
                      </p>

                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Professional Benefits of Proper Certification:</h4>
                        <div className="space-y-2 text-sm text-green-700 dark:text-green-400">
                          <p><strong>Trust Building:</strong> Demonstrates professionalism and attention to detail</p>
                          <p><strong>Quality Assurance:</strong> Shows work meets industry standards</p>
                          <p><strong>Legal Protection:</strong> Provides defence against liability claims</p>
                          <p><strong>Industry Reputation:</strong> Maintains high standards across the electrical trade</p>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-white">
                        Remember that Building Control notification may be required for some minor works, particularly those in special locations or involving new circuits. The MWC provides the documentation needed for this notification process, ensuring full regulatory compliance.
                      </p>
                    </div>
                  </div>
                </div>
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
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Practical Guidance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base text-white">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Always issue an MWC for any minor works, no matter how small</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Fill out every section clearly and accurately</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Provide the client with a copy and retain one for your own records</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Never assume that because the job is small, paperwork is unnecessary</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Treat the MWC with the same professionalism as a full EIC</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Example */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Real-World Example</h2>
          <div className="space-y-4">
            <p className="text-sm sm:text-base text-white">
              An electrician was asked to add an extra socket to a kitchen ring final circuit. The work was completed and tested, but no Minor Works Certificate was issued. Months later, when the house was being sold, the buyer's surveyor asked for certification of all electrical alterations. Because no certificate could be produced, the seller had to pay for an Electrical Installation Condition Report (EICR) before the sale could proceed. The delay and cost could have been avoided if a MWC had been issued at the time.
            </p>
            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-700 text-elec-yellow">
                <strong>Issue:</strong> No Minor Works Certificate issued for socket addition, causing sale delays and additional costs for EICR.
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <p className="text-sm text-green-700 dark:text-green-400">
                <strong>✅ Lesson:</strong> Minor Works Certificates save time, money, and disputes by proving compliance for small jobs.
              </p>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">FAQs</h2>
          <div className="space-y-4 text-sm sm:text-base">
            <div>
              <p className="font-medium text-white mb-2">Q: Is an MWC optional for very small jobs?</p>
              <p className="text-white">A: No. All alterations, however small, require certification.</p>
            </div>
            <div>
              <p className="font-medium text-white mb-2">Q: Who can sign a Minor Works Certificate?</p>
              <p className="text-white">A: A competent person who carried out or supervised the work.</p>
            </div>
            <div>
              <p className="font-medium text-white mb-2">Q: Does a Minor Works Certificate replace an EIC?</p>
              <p className="text-white">A: No. It only applies to small additions or alterations; new circuits and major works require an EIC.</p>
            </div>
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Recap</h2>
          <p className="text-sm sm:text-base text-white">
            A Minor Works Certificate (MWC) is used for small alterations and additions, such as adding a socket or lighting point. It records the work done, test results, and the signature of the competent person. It is legally required under BS 7671 and provides evidence of compliance, even for small jobs. Skipping certification for minor works creates legal, financial, and professional risks.
          </p>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <Quiz 
            title="Minor Works Certificates Quiz"
            questions={quizQuestions}
          />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
          <Button variant="outline" className="w-full sm:w-auto" asChild>
            <Link to="../7-2">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous: EICs
            </Link>
          </Button>
          <Button className="w-full sm:w-auto" asChild>
            <Link to="../7-4">
              Next: Who Can Sign Off Work
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Module6Section7_3;