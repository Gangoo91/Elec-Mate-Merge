import { ArrowLeft, ArrowRight, ClipboardCheck, Target, CheckCircle, TestTube, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    <div className="min-h-screen bg-[#121212]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#1a1a1a] sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 7.6
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-1.5 sm:p-2 rounded-lg ">
              <ClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs sm:text-sm">
              Section 7.6.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
            Following Up with Re-Testing or Certification (Awareness)
          </h1>
          <p className="text-white text-sm sm:text-base leading-relaxed">
            Understanding retesting requirements and certification processes following fault rectification under supervision
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
                  <span>Always retest after repairs to prove faults are eliminated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Update certification documents with corrected test results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Apprentices assist with testing but cannot sign certificates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span>Proper documentation protects both client and contractor</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-transparent border border-elec-yellow/20">
              <p className="font-medium mb-2 sm:mb-3">Spot it / Use it / Check it</p>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Spot:</strong> Need for retesting, certificate requirements, recording responsibilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Use:</strong> Same test methods, accurate recording, proper documentation processes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white">•</span>
                  <span><strong>Check:</strong> Test results improved, certificates updated, supervisor approval obtained</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Introduction</h2>
          <p className="text-sm sm:text-base text-white mb-4">
            Finding and rectifying a fault is not the final step in the process. Every repair must be proven safe by retesting, and in some cases, certification updates are required to record the change. This ensures compliance with BS 7671 and provides documented evidence that the installation is safe for continued use. Apprentices at Level 2 are not responsible for certification, but they must understand why follow-up testing matters and how it fits into professional electrical practice.
          </p>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Learning Outcomes</h2>
          <p className="text-sm sm:text-base text-white mb-4 sm:mb-6">By the end of this subsection, you should be able to:</p>
          
          <div className="bg-card border border-elec-yellow/20 rounded-lg p-4 sm:p-5">
            <div className="grid gap-3 sm:gap-4">
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-elec-yellow/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-white block">Explain why follow-up testing is required after fault rectification</span>
                  <span className="text-xs sm:text-sm text-white">Understand the critical role of verification in proving repairs</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-elec-yellow/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-white block">Describe the role of certification in electrical work</span>
                  <span className="text-xs sm:text-sm text-white">Appreciate legal documentation and compliance requirements</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4 group">
                <div className="bg-elec-yellow/20 rounded-full p-1.5 mt-0.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-elec-yellow" />
                </div>
                <div className="space-y-1">
                  <span className="text-sm sm:text-base font-medium text-white block">Recognise the apprentice's part in supporting these processes under supervision</span>
                  <span className="text-xs sm:text-sm text-white">Know boundaries and responsibilities in professional practice</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Content / Learning */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Content / Learning</h2>
          
          {/* Section 1 */}
          <div className="border-l-4 border-l-elec-yellow pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">1. The Purpose of Retesting</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed mb-4">
                After any fault repair, the circuit must be retested to prove that the fault has been eliminated and that no new defects have been introduced. For example, if a loose connection has been re-terminated, continuity must be checked again; if miswiring has been corrected, polarity must be verified. Retesting provides objective proof that the installation once again complies with BS 7671. Without retesting, repairs cannot be trusted and the installation cannot be energised safely.
              </p>
              
              <p className="text-white leading-relaxed mb-3">
                <strong>Key Reasons for Retesting:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-1">
                <li>• Confirms the specific fault has been completely eliminated</li>
                <li>• Verifies that repair work hasn't introduced new defects</li>
                <li>• Provides measurable evidence of compliance with BS 7671</li>
                <li>• Ensures the circuit is safe for re-energisation</li>
                <li>• Creates documented proof for legal and insurance purposes</li>
                <li>• Demonstrates professional competence and accountability</li>
              </ul>
              
              <p className="text-white leading-relaxed mb-3">
                <strong>Types of Retesting Required:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-1">
                <li>• <strong>Continuity tests</strong> - After reconnecting CPCs or circuit conductors</li>
                <li>• <strong>Polarity tests</strong> - After correcting miswired connections</li>
                <li>• <strong>Insulation resistance tests</strong> - After replacing damaged cables or accessories</li>
                <li>• <strong>RCD testing</strong> - After any work affecting protective devices</li>
                <li>• <strong>Earth fault loop impedance tests</strong> - After changes to earthing arrangements</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[0]} />

          {/* Section 2 */}
          <div className="border-l-4 border-l-green-500 pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">2. Certification Requirements</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed mb-4">
                In many cases, test results form part of formal certification. If faults are identified and corrected during initial verification, the corrected results are recorded on an Electrical Installation Certificate (EIC) or Minor Works Certificate (MWC). During periodic inspections (EICRs), repaired faults and their updated test results should also be documented. Certification provides a legal record that the installation has been tested and found safe. Apprentices must understand that while they can assist with recording values, only competent persons can sign certification.
              </p>
              
              <p className="text-white leading-relaxed mb-3">
                <strong>Certificate Types and Their Uses:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-1">
                <li>• <strong>Electrical Installation Certificate (EIC)</strong> - New installations and major alterations</li>
                <li>• <strong>Minor Works Certificate (MWC)</strong> - Small additions and alterations</li>
                <li>• <strong>Electrical Installation Condition Report (EICR)</strong> - Periodic inspection results</li>
                <li>• <strong>Schedule of Test Results</strong> - Detailed test data supporting certificates</li>
              </ul>
              
              <p className="text-white leading-relaxed mb-3">
                <strong>Legal and Professional Implications:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-1">
                <li>• Certificates provide legal proof of compliance with BS 7671</li>
                <li>• Required for building control approval and insurance purposes</li>
                <li>• Protect electricians and clients from liability claims</li>
                <li>• Enable future electricians to understand the installation history</li>
                <li>• Support property sales and lettings compliance</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[1]} />

          {/* Section 3 */}
          <div className="border-l-4 border-l-orange-500 pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">3. The Apprentice's Role in Follow-Up</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed mb-4">
                At Level 2, apprentices support the process rather than taking full responsibility. You may carry out the physical retests under supervision, record the values, and assist in updating test schedules. However, you cannot sign or certify results as valid — this responsibility rests with the qualified supervisor. By assisting carefully and recording accurately, apprentices build both competence and trust.
              </p>
              
              <p className="text-white leading-relaxed mb-3">
                <strong>What Apprentices Can Do:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-1">
                <li>• Carry out physical retests under direct supervision</li>
                <li>• Record test values accurately and legibly</li>
                <li>• Assist with updating test schedules and documentation</li>
                <li>• Learn proper testing procedures and techniques</li>
                <li>• Support supervisors in maintaining quality standards</li>
                <li>• Ask questions to understand certification processes</li>
              </ul>
              
              <p className="text-white leading-relaxed mb-3">
                <strong>What Apprentices Must NOT Do:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-1">
                <li>• Sign or certify test results as valid</li>
                <li>• Take independent responsibility for verification</li>
                <li>• Issue certificates to clients or building control</li>
                <li>• Make final judgements on compliance without supervision</li>
                <li>• Work on certification without qualified oversight</li>
              </ul>
              
              <p className="text-white leading-relaxed mb-3">
                <strong>Building Professional Competence:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-1">
                <li>• Observe how supervisors interpret and validate test results</li>
                <li>• Learn the connection between testing and legal compliance</li>
                <li>• Understand the importance of accurate documentation</li>
                <li>• Develop skills that will support future qualifications</li>
                <li>• Build trust through consistent, accurate assistance</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[2]} />

          {/* Section 4 */}
          <div className="border-l-4 border-l-purple-500 pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4 mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-white mb-2 sm:mb-3">4. Professionalism and Accountability</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white leading-relaxed mb-4">
                Retesting and certification are not just technical exercises; they are matters of legal compliance and professional reputation. If faults are repaired but not properly proven safe, both the electrician and the client are exposed to risk. Proper follow-up protects users, meets the requirements of BS 7671, and demonstrates professionalism. Apprentices should learn early that "finding and fixing" is only complete once the work is retested, recorded, and handed over with evidence.
              </p>
              
              <p className="text-white leading-relaxed mb-3">
                <strong>Professional Standards:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-1">
                <li>• Electrical work is only complete when properly verified and documented</li>
                <li>• Professional reputation depends on thorough, accountable practices</li>
                <li>• Client safety and legal compliance are non-negotiable priorities</li>
                <li>• Quality assurance requires proper testing and documentation</li>
                <li>• Professional integrity means never cutting corners on verification</li>
              </ul>
              
              <p className="text-white leading-relaxed mb-3">
                <strong>Risk Management:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-1">
                <li>• Unverified repairs expose clients to continued safety risks</li>
                <li>• Missing documentation can invalidate insurance claims</li>
                <li>• Poor records make future fault-finding more difficult</li>
                <li>• Professional liability requires proper verification procedures</li>
                <li>• Building control may reject work without proper certification</li>
              </ul>
              
              <p className="text-white leading-relaxed mb-3">
                <strong>Industry Reputation:</strong>
              </p>
              <ul className="text-white leading-relaxed mb-4 space-y-1">
                <li>• Thorough follow-up distinguishes professional electricians</li>
                <li>• Proper documentation supports industry credibility</li>
                <li>• Quality practices protect the entire electrical trade</li>
                <li>• Apprentices learn professional standards from the beginning</li>
                <li>• Accountability creates trust between electricians and clients</li>
              </ul>
            </div>
          </div>

          <InlineCheck {...quickCheckQuestions[3]} />
        </Card>

        {/* Practical Guidance */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Practical Guidance</h2>
          
          <div className="grid gap-4 sm:gap-6">
            {/* Essential Actions Card */}
            <div className="bg-card border border-border/30 rounded-lg p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <TestTube className="w-5 h-5 sm:w-6 sm:h-6 text-elec-yellow" />
                <h3 className="text-base sm:text-lg font-semibold text-white">Essential Testing Actions</h3>
              </div>
              <div className="grid gap-3 sm:gap-4 text-sm sm:text-base">
                <div className="flex items-start gap-2">
                  <span className="text-white font-medium mt-0.5">•</span>
                  <span className="text-white"><strong>Repeat Exact Tests:</strong> Always repeat the specific test that revealed the original fault using the same test method</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white font-medium mt-0.5">•</span>
                  <span className="text-white"><strong>Record Clearly:</strong> Document updated values clearly with circuit references and descriptions of actions taken</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white font-medium mt-0.5">•</span>
                  <span className="text-white"><strong>Compare Results:</strong> Check new test results against original readings and acceptable limits</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white font-medium mt-0.5">•</span>
                  <span className="text-white"><strong>Verify Improvement:</strong> Ensure readings now meet BS 7671 requirements and demonstrate fault elimination</span>
                </div>
              </div>
            </div>

            {/* Documentation Support Card */}
            <div className="bg-card border border-green-500/30 rounded-lg p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <ClipboardCheck className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
                <h3 className="text-base sm:text-lg font-semibold text-white">Documentation Support</h3>
              </div>
              <div className="grid gap-3 sm:gap-4 text-sm sm:text-base">
                <div className="flex items-start gap-2">
                  <span className="text-white font-medium mt-0.5">•</span>
                  <span className="text-white"><strong>Accurate Notes:</strong> Provide precise circuit references, fault descriptions, and repair actions</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white font-medium mt-0.5">•</span>
                  <span className="text-white"><strong>Support Supervisors:</strong> Assist with entering results into certificates and maintaining schedules</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white font-medium mt-0.5">•</span>
                  <span className="text-white"><strong>Learn Processes:</strong> Ask to review how test results link to compliance and certification</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white font-medium mt-0.5">•</span>
                  <span className="text-white"><strong>Understand Importance:</strong> Appreciate how proper documentation protects both client and contractor</span>
                </div>
              </div>
            </div>

            {/* Professional Development Card */}
            <div className="bg-card border border-border/30 rounded-lg p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-elec-yellow" />
                <h3 className="text-base sm:text-lg font-semibold text-white">Professional Development</h3>
              </div>
              <div className="grid gap-3 sm:gap-4 text-sm sm:text-base">
                <div className="flex items-start gap-2">
                  <span className="text-white font-medium mt-0.5">•</span>
                  <span className="text-white"><strong>Build Competence:</strong> Gain experience with proper testing procedures and quality standards</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white font-medium mt-0.5">•</span>
                  <span className="text-white"><strong>Establish Trust:</strong> Demonstrate reliability through careful assistance and accurate recording</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white font-medium mt-0.5">•</span>
                  <span className="text-white"><strong>Understand Boundaries:</strong> Know what you can and cannot do in terms of certification responsibility</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-white font-medium mt-0.5">•</span>
                  <span className="text-white"><strong>Prepare for Future:</strong> Build skills and knowledge that support progression to higher qualifications</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Real-World Examples */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Real-World Examples</h2>
          
          {/* Example 1 */}
          <div className="bg-card border border-elec-yellow/30 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-elec-yellow" />
              <h3 className="text-base sm:text-lg font-semibold text-white">Example 1: Domestic Rewire Success Story</h3>
            </div>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <p className="text-white">
                <strong>Situation:</strong> During testing on a domestic rewire, a ring final circuit showed an open circuit on the CPC (earth conductor). Initial continuity readings were infinite, indicating a complete break in the protective conductor.
              </p>
              <p className="text-white">
                <strong>Action:</strong> The apprentice, working under supervision, located the problem at a socket outlet where the CPC had not been properly terminated. The connection was re-made with correct technique and torque settings.
              </p>
              <p className="text-white">
                <strong>Follow-up:</strong> The apprentice retested continuity across the entire ring, recording readings that now showed proper values (typically less than 0.05Ω for domestic rings). The corrected results were entered onto the Electrical Installation Certificate.
              </p>
              <p className="text-white">
                <strong>Outcome:</strong> Without retesting and updating the certificate, the fault would have remained undocumented, leaving the certificate incomplete and the installation legally non-compliant. The thorough follow-up ensured safety and compliance.
              </p>
              <div className="bg-elec-yellow/20 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
                <p className="text-white font-medium">Key Learning: Proper retesting and documentation turned a potentially dangerous situation into a compliant, safe installation.</p>
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-card border border-border/30 rounded-lg p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-elec-yellow" />
              <h3 className="text-base sm:text-lg font-semibold text-white">Example 2: Documentation Failure Consequences</h3>
            </div>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <p className="text-white">
                <strong>Situation:</strong> A periodic inspection (EICR) identified low insulation resistance on a lighting circuit in a commercial building. The reading was 0.3MΩ, well below the minimum 1MΩ required by BS 7671.
              </p>
              <p className="text-white">
                <strong>Action:</strong> The faulty section of cable was identified and replaced. Post-repair testing showed insulation resistance had improved to 150MΩ, well within acceptable limits.
              </p>
              <p className="text-white">
                <strong>Problem:</strong> However, the electrician failed to update the EICR with the new test results. The original report was submitted to building control showing the fault as unresolved.
              </p>
              <p className="text-white">
                <strong>Consequences:</strong> Months later, when the report was reviewed by building control during a routine audit, the missing updated information raised serious questions about whether the repair had actually been verified. The contractor was forced to:
              </p>
              <ul className="ml-4 space-y-1 text-white">
                <li>• Return to site for additional testing and documentation</li>
                <li>• Issue a supplementary report with corrected information</li>
                <li>• Face questioning about their quality assurance procedures</li>
                <li>• Risk damage to their professional reputation</li>
                <li>• Absorb additional costs for the return visit</li>
              </ul>
              <div className="bg-red-500/20 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
                <p className="text-white font-medium">Key Learning: Incomplete documentation can have serious professional and financial consequences, even when the technical work is completed correctly.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 sm:space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-4 border-l-elec-yellow bg-elec-yellow/5 pl-4 sm:pl-6 pr-3 sm:pr-4 py-3 sm:py-4">
                <h3 className="text-sm sm:text-base font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-sm sm:text-base text-white">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recap */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <h2 className="text-lg sm:text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Recap</h2>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-white leading-relaxed mb-4">
              Following up with re-testing and certification ensures that repaired faults are proven safe, compliant, and fully documented. This critical final step transforms fault rectification from a simple repair into a professional, accountable process.
            </p>
            
            <div className="bg-card border border-border/30 rounded-lg p-4 sm:p-6 mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Key Points to Remember:</h3>
              <ul className="space-y-2 text-sm sm:text-base text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold mt-1">•</span>
                  <span><strong>Retesting is Essential:</strong> Every repair must be verified through appropriate testing to prove the fault is eliminated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold mt-1">•</span>
                  <span><strong>Certification Updates:</strong> Test results must be recorded on appropriate certificates (EIC, MWC, or EICR) to provide legal compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold mt-1">•</span>
                  <span><strong>Apprentice Support Role:</strong> Level 2 apprentices can assist with retesting and recording but cannot sign certification</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold mt-1">•</span>
                  <span><strong>Professional Standards:</strong> Proper follow-up demonstrates professionalism, ensures safety, and protects reputation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold mt-1">•</span>
                  <span><strong>Legal Protection:</strong> Complete documentation protects both electricians and clients from liability and compliance issues</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card border border-elec-yellow/30 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3">If You Only Remember 3 Things:</h3>
              <ul className="space-y-2 text-sm sm:text-base text-white">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold mt-1">•</span>
                  <span className="font-medium">Always retest after repairs - it's the only way to prove the fault is eliminated and the installation is safe</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold mt-1">•</span>
                  <span className="font-medium">Update certificates with corrected results - proper documentation is essential for legal compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold mt-1">•</span>
                  <span className="font-medium">Work within your scope - apprentices assist with testing but only qualified persons can certify results</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Quiz */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-transparent border-white/20">
          <Quiz questions={quizQuestions} title="Section 7.6.5 Knowledge Check" />
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 pt-6 border-t border-white/10">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link to="../6-4" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous: Rectifying Minor Faults
            </Link>
          </Button>
          
          <div className="flex items-center gap-2 text-sm text-white">
            <span>Section 7.6.5</span>
            <span>•</span>
            <span>Following Up with Re-Testing</span>
          </div>
          
          <Button asChild className="w-full sm:w-auto">
            <Link to=".." className="flex items-center gap-2">
              Complete Section 7.6
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}