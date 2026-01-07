import { AlertTriangle, Shield, CheckSquare, Lock, Zap, HardHat } from "lucide-react";
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

const AM2Module2Section5 = () => {
  useSEO(
    "Avoiding Critical Safety Errors - AM2 Module 2",
    "Critical safety errors that cause instant AM2 failure - safe isolation, energising unsafe circuits, and health & safety breaches"
  );

  const quickCheckQuestions = [
    {
      id: "critical-safety-error",
      question: "Which of these is a critical safety error?",
      options: [
        "Forgetting to label a circuit",
        "Re-energising a faulted circuit",
        "Writing down wrong units on a test sheet",
        "Using the wrong cable size"
      ],
      correctIndex: 1,
      explanation: "Re-energising a faulted circuit is a critical safety error that results in instant failure as it could cause injury or death."
    },
    {
      id: "tester-prove",
      question: "What's wrong with testing a circuit immediately after switching off, without proving your tester?",
      options: [
        "It takes too long",
        "It's not professional",
        "You don't know if your tester works - unsafe isolation",
        "It uses too much battery"
      ],
      correctIndex: 2,
      explanation: "Without proving your tester works, you can't be sure if the circuit is actually dead - this is unsafe isolation."
    },
    {
      id: "isolation-golden-rule",
      question: "What's the golden rule for AM2 safety errors?",
      options: [
        "Always work fast to save time",
        "If it's unsafe in the real world, it's an instant fail in AM2",
        "Paperwork mistakes don't matter",
        "You can fix mistakes as you go"
      ],
      correctIndex: 1,
      explanation: "The golden rule: if it's unsafe in the real world, it's an instant fail in AM2. NET assesses real-world competency."
    },
    {
      id: "lock-off-device",
      question: "True or false: Using tape instead of a lock-off device is acceptable in AM2?",
      options: [
        "True - tape is quicker",
        "False - lock-off devices are mandatory for safe isolation",
        "True - as long as it's clearly marked",
        "False - but only loses minor marks"
      ],
      correctIndex: 1,
      explanation: "False - using tape instead of a proper lock-off device is a critical safety error resulting in instant failure."
    },
    {
      id: "second-chances",
      question: "Do assessors give a second chance if you miss a step in safe isolation?",
      options: [
        "Yes - everyone makes mistakes",
        "No - safety is non-negotiable",
        "Only for minor steps",
        "Yes - but with mark deduction"
      ],
      correctIndex: 1,
      explanation: "No - safety is non-negotiable. Critical safety errors result in immediate section failure with no second chances."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is a critical safety error in AM2?",
      options: [
        "A mistake that loses marks but allows continuation",
        "An unsafe practice that causes instant section failure",
        "A paperwork error that needs correction",
        "A minor procedural mistake"
      ],
      correctAnswer: 1,
      explanation: "Critical safety errors are unsafe practices that cause instant section failure because they could cause injury or death in real work."
    },
    {
      id: 2,
      question: "Give one example of a safe isolation mistake that causes instant fail:",
      options: [
        "Taking too long to isolate",
        "Not labelling the isolation point",
        "Skipping the re-prove step after isolation",
        "Using a different isolation method"
      ],
      correctAnswer: 2,
      explanation: "Skipping the re-prove step means you can't confirm your tester is working, making the isolation potentially unsafe."
    },
    {
      id: 3,
      question: "Why does NET treat energising a faulted circuit as a critical fail?",
      options: [
        "It wastes time in the assessment",
        "It could cause fire, injury or death in real work",
        "It shows poor planning skills",
        "It damages the test equipment"
      ],
      correctAnswer: 1,
      explanation: "Energising a faulted circuit could cause fire, electric shock, or death - exactly the risks NET assessments are designed to prevent."
    },
    {
      id: 4,
      question: "True or false: Using tape instead of a lock-off device is acceptable:",
      options: [
        "True - if clearly marked",
        "False - lock-off devices are mandatory for safe isolation",
        "True - tape is industry standard",
        "False - but only loses minor marks"
      ],
      correctAnswer: 1,
      explanation: "False - proper lock-off devices are mandatory. Using tape is a critical safety error resulting in instant failure."
    },
    {
      id: 5,
      question: "What's the purpose of the re-prove step in safe isolation?",
      options: [
        "To double-check the circuit is isolated",
        "To confirm your voltage tester is working correctly",
        "To document the isolation procedure",
        "To test the circuit resistance"
      ],
      correctAnswer: 1,
      explanation: "Re-proving confirms your voltage tester is still working after isolation - essential for safe working."
    },
    {
      id: 6,
      question: "Can incorrect paperwork alone cause a critical fail?",
      options: [
        "Yes - all paperwork errors are critical",
        "No - paperwork errors only lose marks",
        "Not usually - unless it hides or misrepresents a dangerous condition",
        "Yes - if it's illegible"
      ],
      correctAnswer: 2,
      explanation: "Paperwork errors usually just lose marks unless they hide or misrepresent dangerous conditions that could affect safety."
    },
    {
      id: 7,
      question: "Name one PPE-related mistake that could count as a safety fail:",
      options: [
        "Using wrong color hard hat",
        "Not wearing safety glasses while cutting or drilling",
        "Having dirty high-vis clothing",
        "Using worn but functional gloves"
      ],
      correctAnswer: 1,
      explanation: "Not wearing appropriate PPE like safety glasses during cutting/drilling operations is a serious health & safety breach."
    },
    {
      id: 8,
      question: "What should you always check before energising a circuit?",
      options: [
        "That paperwork is complete",
        "That all testing is complete and results are satisfactory",
        "That tools are put away",
        "That time allocation allows it"
      ],
      correctAnswer: 1,
      explanation: "Never energise a circuit until all testing is complete and results confirm the installation is safe and compliant."
    },
    {
      id: 9,
      question: "What's the golden rule linking AM2 errors to real-world safety?",
      options: [
        "AM2 is just an assessment, not real work",
        "If it's unsafe in the real world, it's an instant fail in AM2",
        "AM2 standards are higher than real-world requirements",
        "Real-world work is more forgiving than AM2"
      ],
      correctAnswer: 1,
      explanation: "The golden rule: if it's unsafe in the real world, it's an instant fail in AM2. The assessment simulates real working conditions."
    },
    {
      id: 10,
      question: "If you make a critical error, can you continue the assessment?",
      options: [
        "Yes - but with heavy mark deduction",
        "No - the section is immediately failed",
        "Yes - after explaining your mistake",
        "No - the entire AM2 is terminated"
      ],
      correctAnswer: 1,
      explanation: "Critical safety errors result in immediate section failure. The assessor will stop that section of the assessment immediately."
    }
  ];

  const learningOutcomes = [
    "Identify which AM2 mistakes are classed as critical safety errors",
    "Understand why these errors lead to instant failure",
    "Apply strategies to avoid making these errors under pressure",
    "Recognise the link between AM2 safety errors and real-world risks on site",
    "Build habits that prevent critical errors in both assessment and practice"
  ];

  return (
    <AM2SectionLayout
      backHref=".."
      breadcrumbs={[
        { label: "Module 2", href: ".." },
        { label: "Section 5" }
      ]}
    >
      <AM2HeroSection
        moduleNumber="2"
        sectionNumber="5"
        title="Avoiding Critical Safety Errors"
        description="Some mistakes in the AM2 cost marks; others cause instant failure. NET defines these as critical safety errors involving unsafe isolation, energising unsafe circuits, or breaching basic health and safety law."
        readTime="15 min read"
        icon={<Shield className="w-4 h-4" />}
      />

      <AM2CriticalWarning title="CRITICAL: Safety Errors = Instant Failure">
        <p className="text-sm text-red-700 dark:text-elec-yellow mb-3">
          Critical safety errors result in immediate section failure with no second chances. These include unsafe isolation,
          energising faulted circuits, and serious health & safety breaches. AM2 simulates real work — unsafe practices
          could kill someone in real life, so NET's role is to confirm you are safe to work unsupervised.
        </p>
        <p className="text-sm text-red-700 dark:text-elec-yellow font-medium">
          Golden Rule: If it's unsafe in the real world, it's an instant fail in AM2. One critical mistake proves you're not ready for unsupervised work.
        </p>
      </AM2CriticalWarning>

      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Critical Safety Errors Definition */}
      <AM2ContentCard title="1. What Counts as a Critical Safety Error?">
        <p className="text-sm text-white mb-6">
          NET highlights the following as automatic fail points that result in immediate section termination:
        </p>
        <div className="space-y-4 text-xs sm:text-sm text-white">
          <div>
            <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-elec-yellow" />
              Failing Safe Isolation
            </h3>
            <ul className="space-y-1 text-white ml-6">
              <li>• Missing prove/re-prove steps with voltage indicator</li>
              <li>• Not using proper lock-off devices (using tape instead)</li>
              <li>• Isolating wrong circuit or incomplete isolation</li>
              <li>• Working on circuits without proper isolation verification</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-elec-yellow" />
              Energising Unsafe Circuits
            </h3>
            <ul className="space-y-1 text-white ml-6">
              <li>• Energising a circuit with a known fault</li>
              <li>• Leaving a circuit unsafe or incomplete but live</li>
              <li>• Switching on before completing all required tests</li>
              <li>• Bypassing or defeating protective devices</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-2 flex items-center gap-2">
              <HardHat className="w-4 h-4 text-elec-yellow" />
              Serious Health & Safety Breaches
            </h3>
            <ul className="space-y-1 text-white ml-6">
              <li>• Ignoring required PPE (safety glasses, gloves, hard hat)</li>
              <li>• Working live without proper justification and precautions</li>
              <li>• Unsafe use of tools or test equipment</li>
              <li>• Creating unsafe conditions for others</li>
            </ul>
          </div>
        </div>
        <InlineCheck {...quickCheckQuestions[0]} />
      </AM2ContentCard>

      {/* Why Instant Fails */}
      <AM2ContentCard title="2. Why These Are Instant Fails" className="bg-gradient-to-br from-elec-yellow/10 via-card to-card/80">
        <div className="space-y-4 text-xs sm:text-sm text-white">
          <div className="p-4 bg-gradient-to-r from-background/80 to-background/60 rounded-lg border border-elec-yellow/30">
            <h3 className="font-semibold mb-2 text-elec-yellow">Real-World Simulation</h3>
            <p className="text-white">
              AM2 simulates real work conditions. Unsafe practices in the assessment represent the same risks
              that could kill someone in real life - electric shock, fire, explosion, or serious injury. Every
              safety procedure you follow (or skip) directly translates to real-world competency.
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-background/80 to-background/60 rounded-lg border border-elec-yellow/30">
            <h3 className="font-semibold mb-2 text-elec-yellow">Competency Verification</h3>
            <p className="text-white">
              NET's role is to confirm you are safe to work unsupervised. One critical mistake proves you're
              not ready for independent work, regardless of your technical abilities. This isn't about being
              harsh - it's about ensuring public safety and protecting the electrical industry's reputation.
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-background/80 to-background/60 rounded-lg border border-elec-yellow/30">
            <h3 className="font-semibold mb-2 text-elec-yellow">Legal and Insurance Implications</h3>
            <p className="text-white">
              Employers and insurance companies rely on NET certification. Critical safety errors indicate
              potential liability risks that could result in prosecution under the Electricity at Work Regulations,
              massive insurance claims, or complete loss of professional indemnity cover.
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-orange-50/50 to-orange-100/30 dark:from-orange-950/30 dark:to-orange-900/20 rounded-lg border border-orange-200/50 dark:border-orange-800/30">
            <h3 className="font-semibold mb-2 text-orange-700 dark:text-elec-yellow">Industry Standards</h3>
            <p className="text-orange-600 dark:text-elec-yellow text-sm">
              The electrical industry has zero tolerance for unsafe practices because the consequences are so severe.
              A single mistake can result in fatalities, major fires, or explosions. NET reflects this reality -
              safety isn't negotiable, and competency must be absolute.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Common Mistakes */}
      <AM2ContentCard title="3. Common Safety-Critical Mistakes Candidates Make">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h3 className="font-semibold text-base mb-3 text-elec-yellow">Critical Isolation Failures</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                Skipping the re-prove step after isolation (most common failure)
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                Using tape instead of proper lock-off devices
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                Testing circuits assumed to be dead without proper verification
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                Isolating the wrong circuit due to poor identification
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                Working on multiple circuits without individual isolation
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                Failing to prove voltage indicator before and after testing
              </li>
            </ul>
            <div className="mt-4 p-3 bg-red-50/50 dark:bg-red-950/20 rounded-lg border border-red-200/50 dark:border-red-800/30">
              <p className="text-xs text-red-700 dark:text-elec-yellow font-medium">
                Remember: Safe isolation isn't just about switching off - it's a complete procedure that must be followed exactly.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-3 text-elec-yellow">Energising Errors & PPE Breaches</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                Energising circuits without completing all required tests
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                Switching on circuits with known or suspected faults
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                Leaving incomplete work energised at any point
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                Not wearing safety glasses during cutting or drilling operations
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                Using damaged or inappropriate tools for the task
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                Ignoring required hard hat or high-visibility clothing
              </li>
            </ul>
            <div className="mt-4 p-3 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg border border-orange-200/50 dark:border-orange-800/30">
              <p className="text-xs text-orange-700 dark:text-elec-yellow font-medium">
                PPE isn't optional in AM2 - assessors watch for health & safety compliance throughout the entire assessment.
              </p>
            </div>
          </div>
        </div>
        <InlineCheck {...quickCheckQuestions[1]} />
      </AM2ContentCard>

      {/* Strategies to Avoid Errors */}
      <AM2ContentCard title="4. Strategies to Avoid Critical Errors" icon={<Shield className="w-5 h-5" />} className="bg-gradient-to-br from-elec-yellow/10 via-card to-card/60">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-base mb-3 text-elec-yellow">Safety-First Mindset</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-elec-yellow/5 to-background/50 rounded-lg border border-elec-yellow/30">
                <h4 className="font-medium text-sm mb-2 text-elec-yellow">Slow Down on Safety</h4>
                <p className="text-xs text-white">Speed is irrelevant if unsafe. Take time with isolation procedures, PPE checks, and verification steps.</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-elec-yellow/5 to-background/50 rounded-lg border border-elec-yellow/30">
                <h4 className="font-medium text-sm mb-2 text-elec-yellow">Real-Site Behavior</h4>
                <p className="text-xs text-white">Treat AM2 like a live site where others' lives depend on your work - because that's exactly what real work is.</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-white mt-4">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Never skip safety procedures to save time - time pressure is no excuse for unsafe work
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Remember that in real work, your actions affect colleagues, customers, and the public
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Build safety habits that become automatic under pressure
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-3 text-elec-yellow">Systematic Safety Procedures</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-50/50 to-background/50 dark:from-blue-950/20 dark:to-background/50 rounded-lg border border-blue-200/50 dark:border-blue-800/30">
                <h4 className="font-medium text-sm mb-2 text-blue-700 dark:text-elec-yellow">Safe Isolation Checklist</h4>
                <ul className="text-xs text-elec-yellow dark:text-elec-yellow space-y-1">
                  <li>1. Identify correct circuit</li>
                  <li>2. Prove voltage indicator</li>
                  <li>3. Isolate at source</li>
                  <li>4. Secure with lock-off</li>
                  <li>5. Test circuit dead</li>
                  <li>6. Re-prove voltage indicator</li>
                </ul>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50/50 to-background/50 dark:from-green-950/20 dark:to-background/50 rounded-lg border border-green-200/50 dark:border-green-800/30">
                <h4 className="font-medium text-sm mb-2 text-green-700 dark:text-green-300">Pre-Energising Checklist</h4>
                <ul className="text-xs text-green-600 dark:text-green-400 space-y-1">
                  <li>1. All installation work complete</li>
                  <li>2. All testing completed satisfactorily</li>
                  <li>3. No known faults or defects</li>
                  <li>4. Area clear and safe</li>
                  <li>5. Paperwork completed</li>
                  <li>6. Remove lock-off and energise</li>
                </ul>
              </div>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-white mt-4">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Use written checklists every time - don't rely on memory under pressure
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Double-check circuit identification against drawings before isolating
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                Never energise unless you've tested and certified the complete installation
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-3 text-elec-yellow">Personal Protective Equipment (PPE) Protocol</h3>
            <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-50/50 to-background/50 dark:from-purple-950/20 dark:to-background/50 rounded-lg border border-purple-200/50 dark:border-purple-800/30">
                <h4 className="font-medium text-xs mb-1 text-purple-700 dark:text-elec-yellow">Basic PPE</h4>
                <ul className="text-xs text-purple-600 dark:text-elec-yellow space-y-1">
                  <li>• Hard hat at all times</li>
                  <li>• High-visibility clothing</li>
                  <li>• Safety footwear</li>
                </ul>
              </div>
              <div className="p-3 bg-gradient-to-r from-amber-50/50 to-background/50 dark:from-amber-950/20 dark:to-background/50 rounded-lg border border-amber-200/50 dark:border-amber-800/30">
                <h4 className="font-medium text-xs mb-1 text-amber-700 dark:text-amber-300">Task-Specific PPE</h4>
                <ul className="text-xs text-amber-600 dark:text-amber-400 space-y-1">
                  <li>• Safety glasses (cutting/drilling)</li>
                  <li>• Gloves (when appropriate)</li>
                  <li>• Hearing protection</li>
                </ul>
              </div>
              <div className="p-3 bg-gradient-to-r from-red-50/50 to-background/50 dark:from-red-950/20 dark:to-background/50 rounded-lg border border-red-200/50 dark:border-red-800/30">
                <h4 className="font-medium text-xs mb-1 text-red-700 dark:text-elec-yellow">Critical Reminders</h4>
                <ul className="text-xs text-red-600 dark:text-elec-yellow space-y-1">
                  <li>• Check condition before use</li>
                  <li>• Replace if damaged</li>
                  <li>• Wear throughout task</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <InlineCheck {...quickCheckQuestions[2]} />
      </AM2ContentCard>

      {/* Real-World Examples */}
      <AM2ContentCard title="Real-World Examples">
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-gradient-to-r from-red-50 to-background dark:from-red-950/20 dark:to-background border border-red-200 dark:border-red-800/30 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
              AM2 Example 1: Isolation Failure
            </h3>
            <p className="text-sm text-red-700 dark:text-elec-yellow">
              Candidate skipped re-proving tester after isolation. The assessor stopped the test
              immediately → instant fail. The candidate had completed 90% of excellent work but
              failed the entire section.
            </p>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-background dark:from-red-950/20 dark:to-background border border-red-200 dark:border-red-800/30 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
              AM2 Example 2: Energising Fault
            </h3>
            <p className="text-sm text-red-700 dark:text-elec-yellow">
              Candidate completed most of installation but energised a circuit with a deliberate
              fault left in by NET. Despite excellent installation work, instant fail for critical
              safety error.
            </p>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-background dark:from-red-950/20 dark:to-background border border-red-200 dark:border-red-800/30 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 dark:text-red-200 mb-2">
              AM2 Example 3: Lock-off Device
            </h3>
            <p className="text-sm text-red-700 dark:text-elec-yellow">
              Candidate used tape instead of a proper lock-off device to secure isolation.
              This is considered unsafe isolation practice → instant fail, despite otherwise
              competent work.
            </p>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-background dark:from-orange-950/20 dark:to-background border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
            <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
              Industry Example: Real Consequences
            </h3>
            <p className="text-sm text-orange-700 dark:text-elec-yellow">
              An apprentice failed to isolate properly; a colleague received a serious shock
              requiring hospital treatment. Company fined £50,000 under Electricity at Work
              Regulations. Individual faced disciplinary action.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* FAQs */}
      <AM2ContentCard title="Frequently Asked Questions" className="bg-gradient-to-br from-elec-yellow/15 via-card to-card/70">
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-elec-yellow/10 to-background border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              Q1: What's the biggest single cause of critical safety fails?
            </h3>
            <p className="text-sm text-white mb-2">A: Incorrect safe isolation procedures, particularly skipping the re-prove step or using inadequate lock-off methods.</p>
            <div className="text-xs text-elec-yellow font-medium">
              Remember: Safe isolation is a complete 6-step procedure, not just switching off
            </div>
          </div>
          <div className="bg-gradient-to-br from-elec-yellow/10 to-background border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              Q2: Can a paperwork mistake ever be a critical fail?
            </h3>
            <p className="text-sm text-white mb-2">A: Not usually — unless it hides or misrepresents a dangerous condition that could affect safety decisions.</p>
            <div className="text-xs text-orange-600 dark:text-elec-yellow font-medium">
              Exception: Documentation that could mislead someone about safety-critical information
            </div>
          </div>
          <div className="bg-gradient-to-br from-elec-yellow/10 to-background border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              Q3: Do assessors give a second chance if you miss a step in safe isolation?
            </h3>
            <p className="text-sm text-white mb-2">A: No — safety is non-negotiable. Critical safety errors result in immediate section failure with no opportunity for correction.</p>
            <div className="text-xs text-red-600 dark:text-elec-yellow font-medium">
              Zero tolerance policy - one mistake = instant section fail
            </div>
          </div>
          <div className="bg-gradient-to-br from-elec-yellow/10 to-background border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              Q4: If I realise I made a critical error halfway through, can I correct it?
            </h3>
            <p className="text-sm text-white mb-2">A: No — once a critical safety error is observed by the assessor, the section is immediately failed. Prevention is the only strategy.</p>
            <div className="text-xs text-red-600 dark:text-elec-yellow font-medium">
              Assessors will stop the section immediately upon observing critical errors
            </div>
          </div>
          <div className="bg-gradient-to-br from-elec-yellow/10 to-background border border-elec-yellow/30 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
              Q5: Are critical fails only about electrical safety?
            </h3>
            <p className="text-sm text-white mb-2">A: No — they also cover unsafe tool use, PPE breaches, and general unsafe site behaviour that could cause injury.</p>
            <div className="text-xs text-elec-yellow dark:text-elec-yellow font-medium">
              Covers all aspects of health & safety, not just electrical work
            </div>
          </div>
        </div>
        <InlineCheck {...quickCheckQuestions[4]} />
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard title="Summary" className="bg-gradient-to-r from-elec-yellow/15 via-card to-card/60">
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-white">
            Critical safety errors are the quickest way to fail AM2. They include unsafe isolation, energising unsafe circuits,
            and breaching fundamental health and safety principles. These errors result in instant section failure because
            they represent practices that could cause serious injury or death in real-world work.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-white">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              Use systematic safety procedures and never skip steps to save time
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              Treat the assessment as a live site where others' lives depend on your work
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              Remember: if it's unsafe in the real world, it's an instant fail in AM2
            </li>
          </ul>
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-lg mt-4">
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              Golden Rule: Safety is non-negotiable. One critical error can end your AM2 assessment regardless of how excellent your other work might be.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <AM2ContentCard title="Knowledge Check: 10-Question Quiz">
        <p className="text-sm text-white mb-6">
          Test your understanding of critical safety errors and how to avoid them in AM2.
        </p>
        <Quiz questions={quizQuestions} />
      </AM2ContentCard>

      <AM2NavigationFooter
        prevSection={{
          href: "../section4",
          label: "Previous: Section 4"
        }}
        nextSection={{
          href: "../section6",
          label: "Next: Section 6"
        }}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module2Section5;
