import { AlertTriangle, FileText, CheckSquare, PenTool, Eye, Timer, BookOpen, TestTube, Scale, Clipboard } from "lucide-react";
import { Link } from "react-router-dom";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";

const AM2Module2Section4 = () => {
  useSEO(
    "Completing Paperwork Under Pressure - AM2 Module 2",
    "Accurate completion of certificates, test sheets, and RAMS forms within AM2 time limits - critical skills for passing AM2"
  );

  const quickCheckQuestions = [
    {
      id: "book-answers-fail",
      question: "Why are 'book answer' test results not acceptable in AM2?",
      options: [
        "They take too long to write",
        "They don't reflect measured values - assessors check consistency with actual installation",
        "They use the wrong units",
        "They're not detailed enough"
      ],
      correctIndex: 1,
      explanation: "Book answers show you've copied values rather than actually measuring them. Assessors cross-check results with your actual installation."
    },
    {
      id: "earth-fault-loop",
      question: "What's wrong with writing '0.00 Ω' for earth fault loop impedance?",
      options: [
        "Wrong units used",
        "Too many decimal places",
        "Unrealistic value - indicates copying, not measuring",
        "Should be written in milliohms"
      ],
      correctIndex: 2,
      explanation: "0.00 Ω is physically impossible for Zs measurements. Real circuits always have some impedance, even if very low."
    },
    {
      id: "blank-vs-false",
      question: "If you can't finish all test results, what's better: leaving blanks or writing book answers?",
      options: [
        "Write book answers to show knowledge",
        "Leave blanks safe - false values = fail",
        "Copy from regulations",
        "Estimate realistic values"
      ],
      correctIndex: 1,
      explanation: "Leaving blanks may lose marks but won't cause automatic failure. False or unrealistic values can result in complete section failure."
    },
    {
      id: "time-allocation",
      question: "How much time is allocated for testing and paperwork together in AM2?",
      options: [
        "2 hours",
        "About 3.5 hours for testing and documentation combined",
        "5 hours",
        "As long as needed"
      ],
      correctIndex: 1,
      explanation: "You have approximately 3.5 hours for the inspection, testing, and documentation phase - time management is crucial."
    },
    {
      id: "legal-consequences",
      question: "In real industry work, what's the consequence of incomplete electrical certificates?",
      options: [
        "Just administrative inconvenience",
        "Liability issues, invalid certificates, and potential disciplinary action",
        "Nothing if the work is good",
        "Only affects insurance"
      ],
      correctIndex: 1,
      explanation: "Incomplete or inaccurate certificates create legal liability, invalidate the work certification, and can lead to serious disciplinary consequences."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Name two types of paperwork you'll complete in AM2:",
      options: [
        "Only test certificates",
        "Risk Assessments and Method Statements (RAMS), Electrical Installation Certificate (EIC)",
        "Only inspection sheets",
        "Building control forms"
      ],
      correctAnswer: 1,
      explanation: "You'll complete RAMS documentation, EIC certificates, inspection & testing sheets, and schedule of test results."
    },
    {
      id: 2,
      question: "Why are 'book answers' a fail in AM2 paperwork?",
      options: [
        "They look unprofessional",
        "They don't reflect actual measured values - assessors check consistency",
        "They take too long to write",
        "They use wrong terminology"
      ],
      correctAnswer: 1,
      explanation: "Assessors compare your documented results with the actual installation. Book answers show you haven't actually measured anything."
    },
    {
      id: 3,
      question: "How much time is allocated for testing and paperwork together?",
      options: [
        "2 hours",
        "About 3.5 hours for testing and documentation combined",
        "5 hours",
        "As long as needed"
      ],
      correctAnswer: 1,
      explanation: "The inspection, testing and documentation phase has approximately 3.5 hours total - requiring careful time management."
    },
    {
      id: 4,
      question: "What's wrong with writing '0.00 Ω' for Zs?",
      options: [
        "Wrong units used",
        "Too many decimal places",
        "Unrealistic value - indicates copying, not measuring",
        "Should be negative"
      ],
      correctAnswer: 2,
      explanation: "0.00 Ω is physically impossible for earth fault loop impedance. Real measurements always show some impedance value."
    },
    {
      id: 5,
      question: "True or false: Leaving blanks is better than writing false values:",
      options: [
        "False - complete everything",
        "True - false values can cause section failure",
        "False - estimates are acceptable",
        "True - blanks show honesty"
      ],
      correctAnswer: 1,
      explanation: "Leaving blanks may lose marks but false/unrealistic values can result in complete section failure."
    },
    {
      id: 6,
      question: "What's the consequence of illegible handwriting in AM2?",
      options: [
        "No consequence if content is correct",
        "Lost marks - assessors can't mark what they can't read",
        "Minor point deduction only",
        "Assessors will ask for clarification"
      ],
      correctAnswer: 1,
      explanation: "If assessors cannot read your entries clearly, they cannot award marks regardless of whether the content might be correct."
    },
    {
      id: 7,
      question: "When should you record test results - at the end or as you go?",
      options: [
        "All at the end to save time",
        "As you go - prevents rushing and mistakes",
        "Doesn't matter when",
        "Only record final values"
      ],
      correctAnswer: 1,
      explanation: "Recording results as you test prevents rushing at the end, reduces errors, and ensures nothing is forgotten."
    },
    {
      id: 8,
      question: "Which unit would you record insulation resistance in?",
      options: [
        "Ω (ohms)",
        "MΩ (megohms)",
        "kΩ (kilohms)",
        "mΩ (milliohms)"
      ],
      correctAnswer: 1,
      explanation: "Insulation resistance values are typically very high and are measured and recorded in megohms (MΩ)."
    },
    {
      id: 9,
      question: "What happens if you omit polarity test results?",
      options: [
        "Minor mark deduction",
        "Section can fail - polarity is a mandatory test",
        "No consequence",
        "Can be estimated later"
      ],
      correctAnswer: 1,
      explanation: "Polarity testing is mandatory under BS 7671. Omitting these results can result in section failure regardless of other work quality."
    },
    {
      id: 10,
      question: "Why is completing paperwork correctly critical in industry as well as AM2?",
      options: [
        "Company policy only",
        "Legal liability, insurance validity, and regulatory compliance",
        "Customer satisfaction",
        "Just good practice"
      ],
      correctAnswer: 1,
      explanation: "Proper documentation is legally required, affects insurance validity, ensures regulatory compliance, and provides legal protection."
    }
  ];

  const learningOutcomes = [
    "Accurately complete electrical installation certificates (EICs), test result sheets, and other documents",
    "Record results clearly, with realistic measured values that reflect actual testing",
    "Manage time effectively to complete paperwork alongside practical tasks",
    "Recognise the paperwork errors that cause marks to be lost in AM2",
    "Apply efficient strategies to document under pressure without mistakes"
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module2"
      breadcrumbs={[
        { label: "Module 2", href: ".." },
        { label: "Section 4" }
      ]}
    >
      <AM2HeroSection
        moduleNumber="2"
        sectionNumber="4"
        title="Completing Paperwork Under Pressure"
        description="Accurate completion of certificates, test sheets, and RAMS forms within AM2 time limits - critical skills for passing AM2 and real-world electrical work."
        readTime="20 min read"
        icon={<FileText className="w-4 h-4" />}
      />

      <AM2CriticalWarning title="CRITICAL: Paperwork Failure = Assessment Failure">
        <p className="text-sm text-red-700 dark:text-elec-yellow mb-3">
          In the AM2, paperwork is not an afterthought — it's part of the assessment. Candidates must complete certificates,
          test sheets, and RAMS forms accurately and efficiently within the strict time limit. Many otherwise competent
          electricians fail because their documentation is rushed, incomplete, or unrealistic.
        </p>
        <p className="text-sm text-red-700 dark:text-elec-yellow font-medium">
          In real life, poor paperwork means liability, invalid certificates, and disciplinary issues. In AM2, it means lost marks and possible failure.
        </p>
      </AM2CriticalWarning>

      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Types of Paperwork */}
      <AM2ContentCard title="1. Types of Paperwork in AM2">
        <div className="space-y-4 text-xs sm:text-sm text-white">
          <div>
            <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
              <PenTool className="w-4 h-4 text-elec-yellow" />
              Risk Assessments and Method Statements (RAMS)
            </h3>
            <p className="mb-2">Pre-work planning documentation showing hazard identification and safe working procedures.</p>
            <p className="text-white">Must be task-specific and realistic for the actual work being undertaken.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-elec-yellow" />
              Inspection & Testing Sheets
            </h3>
            <p className="mb-2">Records of visual inspection and electrical testing results.</p>
            <p className="text-white">Must contain actual measured values, not theoretical or 'book' answers.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-elec-yellow" />
              Electrical Installation Certificate (EIC)
            </h3>
            <p className="mb-2">Formal certification that installation complies with BS 7671.</p>
            <p className="text-white">Legal document requiring complete and accurate information in all sections.</p>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-elec-yellow" />
              Schedule of Test Results
            </h3>
            <p className="mb-2">Detailed test measurements for each circuit.</p>
            <p className="text-white">Values must be consistent with actual installation and realistic for the circuit types.</p>
          </div>
        </div>
        <InlineCheck {...quickCheckQuestions[0]} />
      </AM2ContentCard>

      {/* NET Testing Procedures */}
      <AM2ContentCard title="NET-Aligned Testing Procedures & Documentation" icon={<TestTube className="w-5 h-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-elec-yellow">Initial Verification Tests (EIC)</h3>
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">1. Continuity of Protective Conductors</h4>
                <p className="text-xs text-white mb-2">Test all CPC connections including main and supplementary bonding</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Record actual measured resistance values</li>
                  <li>• Check R1+R2 values for each circuit</li>
                  <li>• Document bonding conductor continuity</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">2. Continuity of Ring Final Circuits</h4>
                <p className="text-xs text-white mb-2">End-to-end and cross-connection tests for socket circuits</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Record live-neutral, live-earth, neutral-earth values</li>
                  <li>• Calculate and verify (R1+R2)/4 values</li>
                  <li>• Document any interconnections found</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">3. Insulation Resistance</h4>
                <p className="text-xs text-white mb-2">Minimum 1MΩ at 500V DC between live conductors and earth</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Test between live and neutral conductors</li>
                  <li>• Test between live conductors and earth</li>
                  <li>• Record values in MΩ, never as &gt;999MΩ</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">4. Polarity Testing</h4>
                <p className="text-xs text-white mb-2">Verify correct connections at switches, sockets and accessories</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Check switch line connections</li>
                  <li>• Verify socket outlet polarity</li>
                  <li>• Confirm protective device arrangements</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-elec-yellow">Live Testing & Documentation</h3>
            <div className="space-y-3">
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">5. Earth Fault Loop Impedance (Zs)</h4>
                <p className="text-xs text-white mb-2">Verify disconnection times meet BS 7671 requirements</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Measure actual Zs at each outlet</li>
                  <li>• Compare with maximum permitted values</li>
                  <li>• Never record 0.00Ω - always shows measurable value</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">6. RCD Operation Testing</h4>
                <p className="text-xs text-white mb-2">Test trip times at x1, x5 rated current and ramp testing</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Record trip times at 1× and 5× IΔn</li>
                  <li>• Document ramp test results</li>
                  <li>• Test mechanical operation button</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">7. Voltage and Phase Sequence</h4>
                <p className="text-xs text-white mb-2">Supply voltage verification and three-phase rotation</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Record actual supply voltages</li>
                  <li>• Verify phase rotation for 3-phase supplies</li>
                  <li>• Check voltage balance between phases</li>
                </ul>
              </div>
              <div className="p-3 bg-[#1a1a1a]/50 rounded-lg">
                <h4 className="font-medium text-sm mb-1">8. Functional Testing</h4>
                <p className="text-xs text-white mb-2">Operation of switches, isolators and control devices</p>
                <ul className="text-xs text-white space-y-1">
                  <li>• Test all switching and control functions</li>
                  <li>• Verify emergency stop operations</li>
                  <li>• Document any operational limitations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Complete Documentation Package */}
      <AM2ContentCard title="Complete Documentation Package (NET Standards)" icon={<Clipboard className="w-5 h-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-elec-yellow">Design Stage Documentation</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Design calculations and load assessments</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Cable sizing and protection coordination</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Circuit schedules and distribution board layouts</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Installation method statements and routing</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Special location considerations (BS 7671 sections)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Earthing and bonding arrangements</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-elec-yellow">Installation Stage Records</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Installation method verification records</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Material compliance certificates (CE marking)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Progressive inspection records and hold points</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Amendment records and design variations</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Risk assessments and method statements</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Non-conformance reports and rectifications</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-elec-yellow">Handover Documentation</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Complete test results and certificates (EIC/EICR)</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Operation and maintenance manuals</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>As-built drawings and updated schedules</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Manufacturer warranties and technical data</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Periodic inspection recommendations and intervals</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Building Regulations compliance notifications</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Legal Framework */}
      <AM2ContentCard title="Legal Framework & NET Compliance" icon={<Scale className="w-5 h-5" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Building Regulations Part P</h3>
            <p className="text-sm text-white mb-3">
              Mandatory for notifiable electrical work in dwellings and certain other premises.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Special locations (bathrooms, kitchens) require notification</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>New circuits and consumer unit changes</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Outdoor electrical installations and garden supplies</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Certificate submission to Building Control within 30 days</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">BS 7671:2018+A2:2022 Requirements</h3>
            <p className="text-sm text-white mb-3">
              IET Wiring Regulations compliance verification and documentation standards.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Design verification and calculation documentation</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Installation method compliance verification</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Protection coordination and discrimination</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>RCD protection requirements (Section 411)</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-[#1a1a1a]/50 rounded-lg">
          <h3 className="font-semibold mb-2 text-elec-yellow">NET Testing Standards & AM2 Requirements</h3>
          <p className="text-sm text-white mb-3">
            National Electrical Testing requirements ensure competency in documentation and testing procedures.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>AM2 practical assessment documentation standards</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Portfolio evidence compilation requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Health and safety documentation standards</span>
              </li>
            </ul>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Time-limited documentation completion skills</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Realistic test result recording techniques</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span>Industry-standard certificate completion</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Pre-Paperwork Checklist */}
      <AM2ContentCard title="Pre-Paperwork Checklist">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="font-semibold text-base mb-3">Before You Start</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Check all paperwork is provided and complete
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Understand the installation you're certifying
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Have testing equipment calibrated and ready
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Plan your testing sequence to match paperwork
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Ensure pen (not pencil) is available
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-3">Time Management Strategy</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Allocate specific time for documentation
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Record results immediately after each test
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Don't leave all paperwork until the end
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Allow buffer time for final checks
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Practice timing on blank forms beforehand
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Common Paperwork Mistakes */}
      <AM2ContentCard title="2. Common Paperwork Mistakes (NET Guidance)">
        <div className="space-y-4 text-xs sm:text-sm text-white">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-semibold text-base mb-3 text-elec-yellow">Critical Errors to Avoid</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Missing or illegible entries
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Recording "perfect" values instead of measured ones
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Mixing up insulation resistance vs continuity values
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Forgetting polarity results
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-3 text-elec-yellow">Format and Technical Errors</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Not completing all sections of certificates
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Using the wrong units or symbols
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Inconsistent measurement formats
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  Missing signatures and dates
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Why Realistic Values Matter</h4>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Assessors are experienced electricians who know what realistic test results look like. They can spot
            copied or "book" values immediately. Values like "999.9 MΩ" for insulation resistance or "0.00 Ω"
            for earth fault loop impedance are red flags that indicate you haven't actually performed the tests.
          </p>
        </div>
        <InlineCheck {...quickCheckQuestions[1]} />
      </AM2ContentCard>

      {/* Time Pressure in AM2 */}
      <AM2ContentCard title="3. Time Pressure in AM2" icon={<Timer className="w-5 h-5" />}>
        <div className="space-y-4 text-xs sm:text-sm text-white">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="font-semibold text-base mb-2">Assessment Structure</h3>
              <p>Paperwork is completed during the inspection & testing stage of the AM2 assessment.</p>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="font-semibold text-base mb-2">Time Allocation</h3>
              <p>About 3.5 hours for testing and documentation combined - no separate paperwork time.</p>
            </div>
            <div className="bg-muted/20 p-4 rounded-lg">
              <h3 className="font-semibold text-base mb-2">Common Problem</h3>
              <p>Candidates who don't pace themselves often run out of time or rush at the end.</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 rounded-lg">
            <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Time Management Reality</h4>
            <p className="text-sm text-orange-700 dark:text-elec-yellow">
              With approximately 3.5 hours to complete inspection, testing AND all documentation,
              you cannot afford to leave paperwork until the end. Successful candidates integrate
              documentation into their testing process, recording results immediately after each test.
            </p>
          </div>
        </div>
        <InlineCheck {...quickCheckQuestions[3]} />
      </AM2ContentCard>

      {/* Strategies for Success */}
      <AM2ContentCard title="4. Strategies for Success" className="bg-gradient-to-r from-card to-card/80">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-base mb-3">Pre-Assessment Preparation</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Practice certificates beforehand — fill in blank EICs and test sheets until it's second nature
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Time yourself completing full certificate sets to build muscle memory
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Familiarize yourself with typical test result ranges for common installations
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-3">During Assessment</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Record results as you go — don't wait until the end of the section
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Be neat and legible — if assessors can't read it, you lose marks
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Use standard units (Ω, MΩ, V, A) consistently throughout
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Check every box before submission — blanks lose marks
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-3">Quality Control</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Cross-check measurements against installation reality
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Ensure values are consistent across different test sheets
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Verify all mandatory tests are recorded (continuity, insulation, polarity, etc.)
              </li>
            </ul>
          </div>
        </div>
        <InlineCheck {...quickCheckQuestions[2]} />
      </AM2ContentCard>

      {/* Real-world Examples */}
      <AM2ContentCard title="Real-world Examples">
        <div className="grid gap-4">
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Example 1: Polarity Omission</h3>
            <p className="text-sm text-red-700 dark:text-elec-yellow">
              Candidate completed all tests but rushed paperwork. Missed filling in the polarity results.
              Despite excellent practical work, the section failed due to incomplete mandatory test records.
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">Example 2: Book Value Detection</h3>
            <p className="text-sm text-red-700 dark:text-elec-yellow">
              Candidate wrote down "ideal textbook" insulation resistance values (999 MΩ). Assessor checked
              actual meter logs — values didn't match the recorded results. Automatic fail for false documentation.
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Example 3: Integrated Approach</h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Candidate filled paperwork as they tested, kept documentation neat and consistent with actual
              measurements. Passed comfortably with high marks across all assessment criteria.
            </p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Example 4: Industry Consequences</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              In industry, an electrician signed off an incomplete EIC without proper test results. Work was
              later audited by building control — disciplinary action taken and professional reputation damaged.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* FAQs */}
      <AM2ContentCard title="Frequently Asked Questions" className="bg-gradient-to-br from-card to-card/60">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-elec-yellow/5 to-background border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              Q1: Can I use pencil in AM2 paperwork?
            </h3>
            <p className="text-sm text-white">A: No — all paperwork must be completed in pen for legal certification requirements.</p>
          </div>
          <div className="bg-gradient-to-r from-elec-yellow/5 to-background border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              Q2: Will assessors allow small mistakes?
            </h3>
            <p className="text-sm text-white">A: Minor slips may not fail you, but repeated or major omissions will. Quality and accuracy are assessed holistically.</p>
          </div>
          <div className="bg-gradient-to-r from-elec-yellow/5 to-background border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              Q3: Do I need to write explanations for test results?
            </h3>
            <p className="text-sm text-white">A: No, just accurate measured values in the correct boxes. Over-explanation can waste valuable time.</p>
          </div>
          <div className="bg-gradient-to-r from-elec-yellow/5 to-background border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              Q4: What happens if I don't complete the paperwork in time?
            </h3>
            <p className="text-sm text-white">A: Marks are lost proportionally. Incomplete documentation may tip you below the pass threshold despite good practical work.</p>
          </div>
          <div className="bg-gradient-to-r from-elec-yellow/5 to-background border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              Q5: Can I bring pre-filled paperwork?
            </h3>
            <p className="text-sm text-white">A: No — all paperwork must be completed during the assessment to demonstrate competency under exam conditions.</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard title="Summary" className="bg-gradient-to-r from-elec-yellow/5 to-card">
        <div className="space-y-4 text-xs sm:text-sm text-white">
          <p className="text-base font-medium">
            Paperwork is as important as the practical work. You must:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              Fill in all sections (RAMS, test sheets, certificates) completely and accurately
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              Record realistic, measured values that reflect actual testing performed
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              Work neatly and legibly — illegible entries cannot be marked
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              Manage your time effectively — don't leave documentation until the end
            </li>
          </ul>
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg mt-4">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              Remember: Failing paperwork = failing the AM2, even if your installation work is flawless.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <AM2ContentCard title="Knowledge Check: 10-Question Quiz">
        <p className="text-sm text-white mb-6">
          Test your understanding of AM2 paperwork requirements and best practices.
        </p>
        <Quiz questions={quizQuestions} />
      </AM2ContentCard>

      <AM2NavigationFooter
        prevSection={{
          href: "../section3",
          label: "Previous: Section 3"
        }}
        nextSection={{
          href: "../section5",
          label: "Next: Section 5"
        }}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module2Section4;
