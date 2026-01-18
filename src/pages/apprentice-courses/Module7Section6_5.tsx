import { ArrowLeft, ArrowRight, ClipboardCheck, CheckCircle, TestTube, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const TITLE = "Following Up with Re-Testing or Certification (Awareness) - Level 2 Module 7 Section 6.5";
const DESCRIPTION = "Understanding retesting requirements and certification processes following fault rectification under supervision";

// Quiz Questions
const quizQuestions = [
  {
    id: 1,
    question: "Why must circuits be retested after repairs?",
    options: [
      "To use up testing time",
      "To prove the fault has been eliminated and the installation is safe",
      "Because it's company policy",
      "To impress supervisors"
    ],
    correctAnswer: 1,
    explanation: "Retesting provides objective proof that the repair was successful and the installation once again complies with BS 7671."
  },
  {
    id: 2,
    question: "What type of test should be repeated after fixing a loose CPC?",
    options: [
      "Insulation resistance test",
      "Polarity test",
      "Continuity test",
      "RCD test"
    ],
    correctAnswer: 2,
    explanation: "Continuity testing should be repeated to confirm the CPC connection has been properly restored."
  },
  {
    id: 3,
    question: "What does re-testing prove about the installation?",
    options: [
      "That it looks professional",
      "That the fault has been eliminated and no new defects have been introduced",
      "That the apprentice is competent",
      "That the tools work correctly"
    ],
    correctAnswer: 1,
    explanation: "Re-testing confirms both that the original fault is resolved and that the repair hasn't created any new problems."
  },
  {
    id: 4,
    question: "Which certificates may need updating after repairs?",
    options: [
      "Only Electrical Installation Certificates (EIC)",
      "Only Minor Works Certificates (MWC)",
      "EIC, MWC, or EICR, depending on the type of work",
      "No certificates need updating"
    ],
    correctAnswer: 2,
    explanation: "Different types of electrical work require different certification, and all may need updating when faults are corrected."
  },
  {
    id: 5,
    question: "Who is legally responsible for signing certification?",
    options: [
      "Apprentices who carried out the work",
      "Only competent, qualified persons",
      "Anyone who witnessed the work",
      "The client"
    ],
    correctAnswer: 1,
    explanation: "Only competent, qualified electricians can legally sign and validate electrical certification."
  },
  {
    id: 6,
    question: "What role can apprentices play in re-testing?",
    options: [
      "They can sign certificates",
      "They can carry out physical retests under supervision and record values accurately",
      "They must do everything independently",
      "They can only observe"
    ],
    correctAnswer: 1,
    explanation: "Apprentices can assist with the physical testing and recording but cannot take responsibility for certification."
  },
  {
    id: 7,
    question: "True or False: Repairs can be considered complete without retesting.",
    options: [
      "True - if the fault was obviously fixed",
      "False - retesting is essential to verify safety and compliance",
      "True - for minor faults only",
      "True - if supervised"
    ],
    correctAnswer: 1,
    explanation: "All electrical repairs must be retested to prove they are safe and compliant before being considered complete."
  },
  {
    id: 8,
    question: "Why is accurate recording important during follow-up?",
    options: [
      "To practice handwriting",
      "To provide legal proof of compliance and protect professional reputation",
      "To fill in forms",
      "To keep supervisors busy"
    ],
    correctAnswer: 1,
    explanation: "Accurate records provide legal evidence of compliance and protect both client and contractor."
  },
  {
    id: 9,
    question: "In the real-world rewire example, what was updated on the certificate after retesting?",
    options: [
      "The client's name",
      "The corrected continuity test results for the CPC",
      "The date only",
      "Nothing needed updating"
    ],
    correctAnswer: 1,
    explanation: "The corrected test results showing proper CPC continuity were entered onto the Electrical Installation Certificate."
  },
  {
    id: 10,
    question: "What problem arose in the EICR example when the report was not updated with new results?",
    options: [
      "The client complained",
      "Building control questioned whether the repair had been verified, requiring a return visit",
      "The insurance was invalid",
      "Nothing happened"
    ],
    correctAnswer: 1,
    explanation: "Missing updated test results raised questions about verification, forcing the contractor to revisit and repeat testing."
  }
];

// Inline Check Questions
const quickCheckQuestions = [
  {
    id: "retest-purpose",
    question: "Why must the same test be repeated after repairing a fault?",
    options: [
      "To practice using test equipment",
      "To prove the fault has been eliminated and no new defects introduced",
      "Because regulations require it",
      "To fill in paperwork"
    ],
    correctIndex: 1,
    explanation: "Retesting provides objective proof that the repair was successful and the installation is safe for continued use."
  },
  {
    id: "certification-types",
    question: "Which certificates may require updated test results after faults are corrected?",
    options: [
      "Only EIC certificates",
      "EIC, MWC, or EICR depending on the type of work",
      "Only EICR reports",
      "No certificates need updating"
    ],
    correctIndex: 1,
    explanation: "Different electrical work requires different certification types, and all may need updating when faults are repaired."
  },
  {
    id: "apprentice-role",
    question: "What part of the re-testing process can apprentices carry out, and what must they not do?",
    options: [
      "Apprentices can do everything independently",
      "Apprentices can carry out physical retests and record values under supervision, but cannot sign certification",
      "Apprentices can only observe",
      "Apprentices can sign certificates for minor work only"
    ],
    correctIndex: 1,
    explanation: "Apprentices can assist with testing and recording but lack the authority to validate or certify results."
  },
  {
    id: "professional-duty",
    question: "Why is retesting and certification considered a professional as well as a technical duty?",
    options: [
      "Because it takes skill to operate test equipment",
      "Because it provides legal compliance, protects users, and demonstrates professional integrity",
      "Because clients expect it",
      "Because it's required by insurance"
    ],
    correctIndex: 1,
    explanation: "Proper retesting and certification protect users, ensure legal compliance, and maintain professional reputation and accountability."
  }
];

// FAQs
const faqs = [
  {
    question: "Why must circuits be retested after repairs?",
    answer: "To prove the fault has been eliminated and the installation is safe."
  },
  {
    question: "Which documents may require updated test results?",
    answer: "EIC, MWC, or EICR, depending on the type of work."
  },
  {
    question: "Can apprentices sign certification?",
    answer: "No. Only competent, qualified persons can sign."
  },
  {
    question: "Why is certification important beyond the technical level?",
    answer: "Because it provides legal proof of compliance and protects professional reputation."
  }
];

export default function Module7Section6_5() {
  useSEO(TITLE, DESCRIPTION);

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
              Back to Section 7.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Centered Title Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
              <span className="px-2 py-0.5 bg-elec-yellow/10 rounded">Module 7</span>
              <span className="text-white/40">•</span>
              <span className="text-white/60">Section 6.5</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              Following Up with Re-Testing or Certification (Awareness)
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Understanding retesting requirements and certification processes following fault rectification under supervision
            </p>
          </header>

          {/* In 30 Seconds Summary */}
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50 mb-10">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-elec-yellow" />
              In 30 Seconds
            </h2>
            <ul className="space-y-2 text-white/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Always retest after repairs to prove faults are eliminated</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Update certification documents with corrected test results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Apprentices assist with testing but cannot sign certificates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Proper documentation protects both client and contractor</span>
              </li>
            </ul>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              Finding and rectifying a fault is not the final step in the process. Every repair must be proven safe by retesting, and in some cases, certification updates are required to record the change. This ensures compliance with BS 7671 and provides documented evidence that the installation is safe for continued use. Apprentices at Level 2 are not responsible for certification, but they must understand why follow-up testing matters and how it fits into professional electrical practice.
            </p>
          </section>

          {/* Learning Outcomes */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">01</span>
              Learning Outcomes
            </h2>
            <p className="text-white/80 mb-4">By the end of this subsection, you should be able to:</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Explain why follow-up testing is required after fault rectification</span>
                  <span className="text-white/60 text-sm">Understand the critical role of verification in proving repairs</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Describe the role of certification in electrical work</span>
                  <span className="text-white/60 text-sm">Appreciate legal documentation and compliance requirements</span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                <CheckCircle className="w-5 h-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Recognise the apprentice's part in supporting these processes under supervision</span>
                  <span className="text-white/60 text-sm">Know boundaries and responsibilities in professional practice</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: The Purpose of Retesting */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">02</span>
              The Purpose of Retesting
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                After any fault repair, the circuit must be retested to prove that the fault has been eliminated and that no new defects have been introduced. For example, if a loose connection has been re-terminated, continuity must be checked again; if miswiring has been corrected, polarity must be verified. Retesting provides objective proof that the installation once again complies with BS 7671. Without retesting, repairs cannot be trusted and the installation cannot be energised safely.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Key Reasons for Retesting:</p>
                <ul className="space-y-1.5 text-sm">
                  <li>• Confirms the specific fault has been completely eliminated</li>
                  <li>• Verifies that repair work hasn't introduced new defects</li>
                  <li>• Provides measurable evidence of compliance with BS 7671</li>
                  <li>• Ensures the circuit is safe for re-energisation</li>
                  <li>• Creates documented proof for legal and insurance purposes</li>
                  <li>• Demonstrates professional competence and accountability</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-blue-500/50">
                <p className="font-medium text-white mb-2">Types of Retesting Required:</p>
                <ul className="space-y-1.5 text-sm">
                  <li>• <strong>Continuity tests</strong> - After reconnecting CPCs or circuit conductors</li>
                  <li>• <strong>Polarity tests</strong> - After correcting miswired connections</li>
                  <li>• <strong>Insulation resistance tests</strong> - After replacing damaged cables or accessories</li>
                  <li>• <strong>RCD testing</strong> - After any work affecting protective devices</li>
                  <li>• <strong>Earth fault loop impedance tests</strong> - After changes to earthing arrangements</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck {...quickCheckQuestions[0]} />
            </div>
          </section>

          {/* Section 2: Certification Requirements */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">03</span>
              Certification Requirements
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                In many cases, test results form part of formal certification. If faults are identified and corrected during initial verification, the corrected results are recorded on an Electrical Installation Certificate (EIC) or Minor Works Certificate (MWC). During periodic inspections (EICRs), repaired faults and their updated test results should also be documented. Certification provides a legal record that the installation has been tested and found safe. Apprentices must understand that while they can assist with recording values, only competent persons can sign certification.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-green-500/50">
                <p className="font-medium text-white mb-2">Certificate Types and Their Uses:</p>
                <ul className="space-y-1.5 text-sm">
                  <li>• <strong>Electrical Installation Certificate (EIC)</strong> - New installations and major alterations</li>
                  <li>• <strong>Minor Works Certificate (MWC)</strong> - Small additions and alterations</li>
                  <li>• <strong>Electrical Installation Condition Report (EICR)</strong> - Periodic inspection results</li>
                  <li>• <strong>Schedule of Test Results</strong> - Detailed test data supporting certificates</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-purple-500/50">
                <p className="font-medium text-white mb-2">Legal and Professional Implications:</p>
                <ul className="space-y-1.5 text-sm">
                  <li>• Certificates provide legal proof of compliance with BS 7671</li>
                  <li>• Required for building control approval and insurance purposes</li>
                  <li>• Protect electricians and clients from liability claims</li>
                  <li>• Enable future electricians to understand the installation history</li>
                  <li>• Support property sales and lettings compliance</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck {...quickCheckQuestions[1]} />
            </div>
          </section>

          {/* Section 3: The Apprentice's Role */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">04</span>
              The Apprentice's Role in Follow-Up
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                At Level 2, apprentices support the process rather than taking full responsibility. You may carry out the physical retests under supervision, record the values, and assist in updating test schedules. However, you cannot sign or certify results as valid — this responsibility rests with the qualified supervisor. By assisting carefully and recording accurately, apprentices build both competence and trust.
              </p>

              <div className="grid gap-4">
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="font-semibold text-green-400 mb-2">What Apprentices Can Do:</p>
                  <ul className="space-y-1.5 text-sm text-white/80">
                    <li>• Carry out physical retests under direct supervision</li>
                    <li>• Record test values accurately and legibly</li>
                    <li>• Assist with updating test schedules and documentation</li>
                    <li>• Learn proper testing procedures and techniques</li>
                    <li>• Support supervisors in maintaining quality standards</li>
                    <li>• Ask questions to understand certification processes</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="font-semibold text-red-400 mb-2">What Apprentices Must NOT Do:</p>
                  <ul className="space-y-1.5 text-sm text-white/80">
                    <li>• Sign or certify test results as valid</li>
                    <li>• Take independent responsibility for verification</li>
                    <li>• Issue certificates to clients or building control</li>
                    <li>• Make final judgements on compliance without supervision</li>
                    <li>• Work on certification without qualified oversight</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                <p className="font-medium text-white mb-2">Building Professional Competence:</p>
                <ul className="space-y-1.5 text-sm">
                  <li>• Observe how supervisors interpret and validate test results</li>
                  <li>• Learn the connection between testing and legal compliance</li>
                  <li>• Understand the importance of accurate documentation</li>
                  <li>• Develop skills that will support future qualifications</li>
                  <li>• Build trust through consistent, accurate assistance</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck {...quickCheckQuestions[2]} />
            </div>
          </section>

          {/* Section 4: Professionalism and Accountability */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">05</span>
              Professionalism and Accountability
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Retesting and certification are not just technical exercises; they are matters of legal compliance and professional reputation. If faults are repaired but not properly proven safe, both the electrician and the client are exposed to risk. Proper follow-up protects users, meets the requirements of BS 7671, and demonstrates professionalism. Apprentices should learn early that "finding and fixing" is only complete once the work is retested, recorded, and handed over with evidence.
              </p>

              <div className="grid gap-4">
                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                  <p className="font-medium text-white mb-2">Professional Standards:</p>
                  <ul className="space-y-1.5 text-sm">
                    <li>• Electrical work is only complete when properly verified and documented</li>
                    <li>• Professional reputation depends on thorough, accountable practices</li>
                    <li>• Client safety and legal compliance are non-negotiable priorities</li>
                    <li>• Quality assurance requires proper testing and documentation</li>
                    <li>• Professional integrity means never cutting corners on verification</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border-l-2 border-orange-500/50">
                  <p className="font-medium text-white mb-2">Risk Management:</p>
                  <ul className="space-y-1.5 text-sm">
                    <li>• Unverified repairs expose clients to continued safety risks</li>
                    <li>• Missing documentation can invalidate insurance claims</li>
                    <li>• Poor records make future fault-finding more difficult</li>
                    <li>• Professional liability requires proper verification procedures</li>
                    <li>• Building control may reject work without proper certification</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <InlineCheck {...quickCheckQuestions[3]} />
            </div>
          </section>

          {/* Practical Guidance */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">06</span>
              Practical Guidance
            </h2>

            <div className="space-y-4">
              {/* Essential Testing Actions */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <TestTube className="w-5 h-5 text-elec-yellow" />
                  <h3 className="font-semibold text-white">Essential Testing Actions</h3>
                </div>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong>Repeat Exact Tests:</strong> Always repeat the specific test that revealed the original fault using the same test method</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong>Record Clearly:</strong> Document updated values clearly with circuit references and descriptions of actions taken</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong>Compare Results:</strong> Check new test results against original readings and acceptable limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong>Verify Improvement:</strong> Ensure readings now meet BS 7671 requirements and demonstrate fault elimination</span>
                  </li>
                </ul>
              </div>

              {/* Documentation Support */}
              <div className="p-4 rounded-lg bg-white/5 border border-green-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <ClipboardCheck className="w-5 h-5 text-green-400" />
                  <h3 className="font-semibold text-white">Documentation Support</h3>
                </div>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Accurate Notes:</strong> Provide precise circuit references, fault descriptions, and repair actions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Support Supervisors:</strong> Assist with entering results into certificates and maintaining schedules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Learn Processes:</strong> Ask to review how test results link to compliance and certification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span><strong>Understand Importance:</strong> Appreciate how proper documentation protects both client and contractor</span>
                  </li>
                </ul>
              </div>

              {/* Professional Development */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow" />
                  <h3 className="font-semibold text-white">Professional Development</h3>
                </div>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong>Build Competence:</strong> Gain experience with proper testing procedures and quality standards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong>Establish Trust:</strong> Demonstrate reliability through careful assistance and accurate recording</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong>Understand Boundaries:</strong> Know what you can and cannot do in terms of certification responsibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong>Prepare for Future:</strong> Build skills and knowledge that support progression to higher qualifications</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">07</span>
              Real-World Examples
            </h2>

            <div className="space-y-4">
              {/* Success Example */}
              <div className="p-4 rounded-lg bg-white/5 border border-elec-yellow/30">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-elec-yellow" />
                  <h3 className="font-semibold text-white">Domestic Rewire Success Story</h3>
                </div>
                <div className="space-y-3 text-white/80 text-sm">
                  <p><strong className="text-white">Situation:</strong> During testing on a domestic rewire, a ring final circuit showed an open circuit on the CPC (earth conductor). Initial continuity readings were infinite, indicating a complete break in the protective conductor.</p>
                  <p><strong className="text-white">Action:</strong> The apprentice, working under supervision, located the problem at a socket outlet where the CPC had not been properly terminated. The connection was re-made with correct technique and torque settings.</p>
                  <p><strong className="text-white">Follow-up:</strong> The apprentice retested continuity across the entire ring, recording readings that now showed proper values (typically less than 0.05Ω for domestic rings). The corrected results were entered onto the Electrical Installation Certificate.</p>
                  <p><strong className="text-white">Outcome:</strong> Without retesting and updating the certificate, the fault would have remained undocumented, leaving the certificate incomplete and the installation legally non-compliant. The thorough follow-up ensured safety and compliance.</p>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                  <p className="text-white text-sm font-medium">Key Learning: Proper retesting and documentation turned a potentially dangerous situation into a compliant, safe installation.</p>
                </div>
              </div>

              {/* Failure Example */}
              <div className="p-4 rounded-lg bg-white/5 border border-red-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h3 className="font-semibold text-white">Documentation Failure Consequences</h3>
                </div>
                <div className="space-y-3 text-white/80 text-sm">
                  <p><strong className="text-white">Situation:</strong> A periodic inspection (EICR) identified low insulation resistance on a lighting circuit in a commercial building. The reading was 0.3MΩ, well below the minimum 1MΩ required by BS 7671.</p>
                  <p><strong className="text-white">Action:</strong> The faulty section of cable was identified and replaced. Post-repair testing showed insulation resistance had improved to 150MΩ, well within acceptable limits.</p>
                  <p><strong className="text-white">Problem:</strong> However, the electrician failed to update the EICR with the new test results. The original report was submitted to building control showing the fault as unresolved.</p>
                  <p><strong className="text-white">Consequences:</strong> Months later, when the report was reviewed by building control during a routine audit, the missing updated information raised serious questions about whether the repair had actually been verified. The contractor was forced to:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• Return to site for additional testing and documentation</li>
                    <li>• Issue a supplementary report with corrected information</li>
                    <li>• Face questioning about their quality assurance procedures</li>
                    <li>• Risk damage to their professional reputation</li>
                    <li>• Absorb additional costs for the return visit</li>
                  </ul>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-white text-sm font-medium">Key Learning: Incomplete documentation can have serious professional and financial consequences, even when the technical work is completed correctly.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">08</span>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border-l-2 border-elec-yellow/50">
                  <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-white/80 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recap */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              <span className="text-elec-yellow/80 text-sm font-normal">09</span>
              Recap
            </h2>
            <div className="text-white/80 space-y-4 leading-relaxed">
              <p>
                Following up with re-testing and certification ensures that repaired faults are proven safe, compliant, and fully documented. This critical final step transforms fault rectification from a simple repair into a professional, accountable process.
              </p>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <h3 className="font-semibold text-white mb-3">Key Points to Remember:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong className="text-white">Retesting is Essential:</strong> Every repair must be verified through appropriate testing to prove the fault is eliminated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong className="text-white">Certification Updates:</strong> Test results must be recorded on appropriate certificates (EIC, MWC, or EICR) to provide legal compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong className="text-white">Apprentice Support Role:</strong> Level 2 apprentices can assist with retesting and recording but cannot sign certification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong className="text-white">Professional Standards:</strong> Proper follow-up demonstrates professionalism, ensures safety, and protects reputation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span><strong className="text-white">Legal Protection:</strong> Complete documentation protects both electricians and clients from liability and compliance issues</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/30">
                <h3 className="font-semibold text-white mb-3">If You Only Remember 3 Things:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold mt-1">1.</span>
                    <span className="font-medium text-white">Always retest after repairs - it's the only way to prove the fault is eliminated and the installation is safe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold mt-1">2.</span>
                    <span className="font-medium text-white">Update certificates with corrected results - proper documentation is essential for legal compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-elec-yellow font-bold mt-1">3.</span>
                    <span className="font-medium text-white">Work within your scope - apprentices assist with testing but only qualified persons can certify results</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quiz */}
          <section className="mb-10">
            <Quiz questions={quizQuestions} title="Section 7.6.5 Knowledge Check" />
          </section>

          {/* Navigation Footer */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/5 min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="../6-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous: Rectifying Minor Faults
              </Link>
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium min-h-[48px] touch-manipulation active:scale-[0.98]"
              asChild
            >
              <Link to="..">
                Complete Section 7.6
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </nav>
        </div>
      </article>
    </div>
  );
}
