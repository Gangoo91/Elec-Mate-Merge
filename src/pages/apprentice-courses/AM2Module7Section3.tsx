import { Shield, CheckCircle, AlertTriangle, Target, Lightbulb, Brain, BookOpen, Users, Wrench, Eye, TestTube } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module7Section3 = () => {
  useSEO(
    "Safety-first Approach | AM2 Module 7 Section 3",
    "Show the Assessor You're Safe - Critical safety behaviors and instant fail errors in AM2"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "unsafe-practice",
      question: "What does unsafe practice in AM2 usually result in?",
      options: [
        "Minor mark deduction",
        "Warning from assessor",
        "Automatic failure, regardless of performance in other areas",
        "Extra time to correct mistakes"
      ],
      correctIndex: 2,
      explanation: "Unsafe practice in AM2 results in automatic failure, regardless of how well you complete the rest of the exam."
    },
    {
      id: "cpc-fail",
      question: "If you attempt to energise a circuit without CPC connected, what happens?",
      options: [
        "Minor mark deduction",
        "Warning to reconnect it",
        "Automatic fail - dangerous and non-compliant",
        "No consequence if caught quickly"
      ],
      correctIndex: 2,
      explanation: "Energising a circuit without CPC connected is dangerous and non-compliant, resulting in automatic failure."
    },
    {
      id: "isolation-steps",
      question: "What happens if you skip any step in safe isolation?",
      options: [
        "Minor mark deduction",
        "You can continue if you remember later",
        "Instant fail - critical safety error",
        "Warning from assessor"
      ],
      correctIndex: 2,
      explanation: "Skipping any step in safe isolation is a critical safety error that results in instant failure."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Why is safety the top priority in AM2?",
      options: [
        "It's part of the syllabus",
        "NET's primary objective is to prove you are safe to work unsupervised",
        "It's required by regulations",
        "Assessors like safe workers"
      ],
      correctAnswer: 1,
      explanation: "NET's primary objective is to prove you are safe to work unsupervised. Unsafe electricians put lives at risk."
    },
    {
      id: 2,
      question: "Name three safety behaviours assessors look for:",
      options: [
        "Speed, accuracy, neatness",
        "Safe isolation, correct PPE, tool use",
        "Confidence, knowledge, experience",
        "Planning, organisation, efficiency"
      ],
      correctAnswer: 1,
      explanation: "Key safety behaviours include safe isolation following the 10-step process, correct PPE usage, and proper tool use."
    },
    {
      id: 3,
      question: "What happens if you skip a safe isolation step?",
      options: [
        "Minor mark deduction",
        "Warning from assessor",
        "Instant failure",
        "Extra time given"
      ],
      correctAnswer: 2,
      explanation: "Skipping any step in safe isolation results in instant failure as it's a critical safety error."
    },
    {
      id: 4,
      question: "What regulation requires safe working practices?",
      options: [
        "BS 7671 (18th Edition)",
        "GS38",
        "Both BS 7671 and GS38",
        "HSE guidelines only"
      ],
      correctAnswer: 2,
      explanation: "Both BS 7671 (18th Edition) and GS38 require safe working practices and proper test equipment use."
    },
    {
      id: 5,
      question: "Why should CPCs always be sleeved and connected immediately?",
      options: [
        "It looks professional",
        "It's required by BS 7671 for safety",
        "Assessors prefer it",
        "It saves time later"
      ],
      correctAnswer: 1,
      explanation: "CPCs must be sleeved and connected immediately as required by BS 7671 for electrical safety and fault protection."
    },
    {
      id: 6,
      question: "True or false: Assessors don't care if your work area is messy.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False - untidy, unsafe work areas reflect poor safety culture and can lead to accidents and mark deductions."
    },
    {
      id: 7,
      question: "What is GS38 and why is it important?",
      options: [
        "A wiring regulation for installations",
        "Safety standard for electrical test equipment and probes",
        "PPE requirement standard",
        "Tool maintenance guideline"
      ],
      correctAnswer: 1,
      explanation: "GS38 is the safety standard for electrical test equipment, requiring proper probe guards and safe test leads."
    },
    {
      id: 8,
      question: "Give an example of an 'instant fail' safety error:",
      options: [
        "Forgetting to label a circuit",
        "Using non-GS38 test probes",
        "Working too slowly",
        "Making a termination mistake"
      ],
      correctAnswer: 1,
      explanation: "Using non-GS38 compliant test probes is an instant fail safety error as it creates serious safety risks."
    },
    {
      id: 9,
      question: "How can you show the assessor you are working safely?",
      options: [
        "Work quickly and efficiently",
        "Talk through safety steps and make actions visible",
        "Ask lots of questions",
        "Copy other candidates"
      ],
      correctAnswer: 1,
      explanation: "Talk through safety steps (e.g., 'proving my tester on known live source') and make safety actions clearly visible to the assessor."
    },
    {
      id: 10,
      question: "What's the golden rule about safety in AM2?",
      options: [
        "Safety first, speed second",
        "Unsafe = fail. Safe = pass.",
        "Follow all regulations exactly",
        "Never take shortcuts"
      ],
      correctAnswer: 1,
      explanation: "The golden rule is 'Unsafe = fail. Safe = pass.' Safety is the foundation of everything in AM2."
    }
  ];

  const learningOutcomes = [
    "Explain why NET places safety above everything else in AM2",
    "Demonstrate safe working behaviours consistently, not just during isolation and testing",
    "Identify the critical 'instant fail' safety errors to avoid",
    "Build habits that prove to the assessor you prioritise safety",
    "Leave every stage of AM2 in a safe condition"
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module7"
      breadcrumbs={[
        { label: "AM2", href: "/study-centre/apprentice/am2" },
        { label: "Module 7", href: "/study-centre/apprentice/am2/module7" },
        { label: "Section 3" }
      ]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Shield}
        title="Safety-first Approach - Show the Assessor You're Safe"
        description="The AM2 is not just a test of technical skill - it is a test of whether you can be trusted to work safely in the electrical industry. Assessors are trained to watch for safe behaviour at all times, not only during specific tasks like isolation. If you show unsafe practice, it can result in instant failure, regardless of how well you complete the rest of the exam."
        badge="Module 7 - Section 3"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning
        title="CRITICAL: Safety is Everything in AM2"
        message="Unsafe electricians put lives at risk - so unsafe behaviour equals instant failure. Safety behaviours must be demonstrated consistently throughout the entire exam, not just once. NET's primary objective is to prove you are safe to work unsupervised. Every action is being assessed for safety compliance."
      />

      {/* Learning Outcomes */}
      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Why Safety is Everything */}
      <AM2ContentCard
        title="1. Why Safety is Everything in AM2"
        icon={Shield}
        accent
      >
        <p className="text-ios-callout text-white/80 mb-4">
          NET's primary objective is to prove you are safe to work unsupervised:
        </p>

        <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4 mb-4">
          <h4 className="text-ios-headline text-blue-400 mb-3">Key Safety Principles:</h4>
          <ul className="text-ios-callout text-white/70 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>NET's primary objective is to prove you are safe to work unsupervised</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Unsafe electricians put lives at risk - so unsafe behaviour = fail</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Safety behaviours must be demonstrated throughout the exam, not just once</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-ios-headline text-green-400 mb-2">Remember:</h4>
              <p className="text-ios-callout text-white/70">
                Every action is being assessed for safety compliance. The assessor is constantly evaluating whether you can be trusted to work safely without supervision.
              </p>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[0].id}
        question={quickCheckQuestions[0].question}
        options={quickCheckQuestions[0].options}
        correctIndex={quickCheckQuestions[0].correctIndex}
        explanation={quickCheckQuestions[0].explanation}
      />

      {/* Key Safety Behaviours */}
      <AM2ContentCard
        title="2. Key Safety Behaviours Assessors Look For"
        icon={Eye}
      >
        <p className="text-ios-callout text-white/80 mb-6">
          Assessors are trained to watch for these critical safety behaviours throughout your AM2 exam:
        </p>

        <div className="space-y-6">
          {/* Strategy 1 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
            <div className="flex-1">
              <h5 className="text-ios-headline text-white/90 mb-2">Safe Isolation</h5>
              <p className="text-ios-callout text-white/70 mb-3">
                Following the 10-step process, including prove/re-prove. This is the foundation of electrical safety.
              </p>
              <div className="bg-white/5 border border-blue-500/30 rounded-xl p-3">
                <strong className="text-blue-400 text-ios-callout">Critical Steps:</strong>
                <ul className="text-ios-callout text-white/70 mt-2 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Select appropriate point of isolation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Secure isolation - lock off/remove fuses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Prove tester before use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Test circuit dead</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">•</span>
                    <span>Re-prove tester after testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strategy 2 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
            <div className="flex-1">
              <h5 className="text-ios-headline text-white/90 mb-2">PPE and Tool Use</h5>
              <p className="text-ios-callout text-white/70 mb-3">
                Correct PPE usage, proper tools, no makeshift shortcuts, no damaged equipment.
              </p>
              <div className="bg-white/5 border border-green-500/30 rounded-xl p-3">
                <ul className="text-ios-callout text-white/70 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Safety glasses when required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Insulated gloves where appropriate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>GS38-compliant test equipment only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Right tool for the job, no improvisation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strategy 3 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
            <div className="flex-1">
              <h5 className="text-ios-headline text-white/90 mb-2">Work Area Management</h5>
              <p className="text-ios-callout text-white/70 mb-3">
                Tidy workspace, no trailing leads or trip hazards, organised approach.
              </p>
              <div className="bg-white/5 border border-orange-500/30 rounded-xl p-3">
                <ul className="text-ios-callout text-white/70 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Keep walkways clear of tools and cables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Organise tools methodically on work surface</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Coil test leads properly when not in use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Clean up as you go - shows professionalism</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Position ladder safely with correct angle (1:4 ratio)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">•</span>
                    <span>Secure cable drums and heavy equipment</span>
                  </li>
                </ul>
                <div className="mt-3 p-2 bg-orange-500/10 rounded">
                  <strong className="text-orange-400 text-ios-footnote">Remember:</strong>
                  <p className="text-white/70 text-ios-footnote mt-1">Untidy work areas suggest poor safety culture and can lead to accidents.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[1].id}
        question={quickCheckQuestions[1].question}
        options={quickCheckQuestions[1].options}
        correctIndex={quickCheckQuestions[1].correctIndex}
        explanation={quickCheckQuestions[1].explanation}
      />

      {/* Instant Fail Errors */}
      <AM2ContentCard
        title="3. 'Instant Fail' Safety Errors (NET Published)"
        icon={AlertTriangle}
      >
        <p className="text-ios-callout text-white/80 mb-6">
          These safety-critical errors result in immediate failure, regardless of performance elsewhere:
        </p>

        <div className="bg-white/5 border border-red-500/30 rounded-xl p-4 mb-4">
          <h4 className="text-ios-headline text-red-400 mb-3">Critical Safety Errors:</h4>
          <ul className="text-ios-callout text-white/70 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-400">•</span>
              <span>Skipping any step in safe isolation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400">•</span>
              <span>Using unsafe test equipment (non-GS38 probes, taped leads)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400">•</span>
              <span>Energising a circuit with exposed copper or missing CPCs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400">•</span>
              <span>Bypassing protective devices</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400">•</span>
              <span>Failing to label or identify circuits, creating risk for others</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400">•</span>
              <span>Working recklessly - e.g., rushing in testing with live conductors exposed</span>
            </li>
          </ul>
        </div>

        <div className="bg-white/5 border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-ios-headline text-yellow-400 mb-2">Warning:</h4>
              <p className="text-ios-callout text-white/70">
                These errors are not negotiable. Even if you complete everything else perfectly, any of these safety violations will result in instant failure.
              </p>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id={quickCheckQuestions[2].id}
        question={quickCheckQuestions[2].question}
        options={quickCheckQuestions[2].options}
        correctIndex={quickCheckQuestions[2].correctIndex}
        explanation={quickCheckQuestions[2].explanation}
      />

      {/* Showing the Assessor */}
      <AM2ContentCard
        title="4. Showing the Assessor You Are Safe"
        icon={Target}
      >
        <p className="text-ios-callout text-white/80 mb-6">
          It's not just about being safe - it's about making it clear to the assessor that safety is your priority:
        </p>

        <div className="space-y-4">
          <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-blue-400 mb-3">Visible Safety Practices:</h4>
            <ul className="text-ios-callout text-white/70 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><strong className="text-white/90">Talk through steps:</strong> e.g., "I am now proving my tester on a known live source"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><strong className="text-white/90">Double-check visibly:</strong> show that you re-sleeve CPCs, torque terminals, re-fit trunking lids</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><strong className="text-white/90">Label clearly:</strong> DBs, circuits, and accessories must all be identifiable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                <span><strong className="text-white/90">Keep order:</strong> tidy work area shows professionalism and reduces risks</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 mb-3">Professional Approach:</h4>
            <ul className="text-ios-callout text-white/70 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Methodical, step-by-step approach to all tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Clear communication when explaining what you're doing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Immediate correction of any mistakes, done visibly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Consistent safety practices throughout the entire exam</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Practical Guidance */}
      <AM2ContentCard
        title="5. Practical Guidance"
        icon={Lightbulb}
      >
        <p className="text-ios-callout text-white/80 mb-6">
          Think like you're on-site with a client or inspector watching - every action reflects your professionalism:
        </p>

        <div className="space-y-4">
          {/* Scenario 1 */}
          <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-blue-400 mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Scenario: Beginning Any Task
            </h4>
            <div className="text-ios-callout text-white/70 space-y-2">
              <p><strong className="text-white/90">Do:</strong> Check your test equipment is GS38-compliant, prove on known live source</p>
              <p><strong className="text-white/90">Say:</strong> "I'm checking my tester before use on this known live source"</p>
              <p><strong className="text-white/90">Why:</strong> Shows methodical approach and compliance with safety standards</p>
            </div>
          </div>

          {/* Scenario 2 */}
          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 mb-3 flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Scenario: Making Connections
            </h4>
            <div className="text-ios-callout text-white/70 space-y-2">
              <p><strong className="text-white/90">Do:</strong> Connect CPCs first with proper sleeving, torque terminals to spec</p>
              <p><strong className="text-white/90">Say:</strong> "Connecting the CPC first for safety, using green/yellow sleeving"</p>
              <p><strong className="text-white/90">Why:</strong> Demonstrates understanding of safety hierarchy and BS 7671 compliance</p>
            </div>
          </div>

          {/* Scenario 3 */}
          <div className="bg-white/5 border border-purple-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-purple-400 mb-3 flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              Scenario: Before Energising
            </h4>
            <div className="text-ios-callout text-white/70 space-y-2">
              <p><strong className="text-white/90">Do:</strong> Double-check all connections, verify CPC continuity, check polarity</p>
              <p><strong className="text-white/90">Say:</strong> "Checking all connections secure before energising, verifying CPC continuity"</p>
              <p><strong className="text-white/90">Why:</strong> Prevents dangerous situations and shows systematic approach</p>
            </div>
          </div>

          {/* Scenario 4 */}
          <div className="bg-white/5 border border-orange-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-orange-400 mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Scenario: If You Make a Mistake
            </h4>
            <div className="text-ios-callout text-white/70 space-y-2">
              <p><strong className="text-white/90">Do:</strong> Stop immediately, isolate if necessary, correct properly</p>
              <p><strong className="text-white/90">Say:</strong> "I need to isolate and correct this connection properly"</p>
              <p><strong className="text-white/90">Why:</strong> Shows honesty, safety-first mindset, and professional integrity</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-ios-callout text-white/70">
                <strong className="text-white/90">Practise safe isolation</strong> until it is second nature
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-ios-callout text-white/70">
                <strong className="text-white/90">Always sleeve CPCs immediately</strong> - don't leave it until later
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-ios-callout text-white/70">
                <strong className="text-white/90">Never cut corners</strong> on test probe safety - keep fingers behind barriers
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-ios-callout text-white/70">
                <strong className="text-white/90">Ask yourself:</strong> "Is this safe for another electrician to touch right now?"
              </p>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Real-world Examples */}
      <AM2ContentCard
        title="6. Real-world Examples"
        icon={BookOpen}
      >
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 bg-white/5 pl-4 py-3 rounded-r">
            <p className="text-ios-callout text-white/70">
              <strong className="text-red-400">Example 1:</strong> Candidate skipped re-prove of tester in safe isolation procedure - assessor stopped exam - fail.
            </p>
          </div>

          <div className="border-l-4 border-red-500 bg-white/5 pl-4 py-3 rounded-r">
            <p className="text-ios-callout text-white/70">
              <strong className="text-red-400">Example 2:</strong> Candidate completed installation correctly but left bare copper exposed in a socket - unsafe workmanship - marks lost.
            </p>
          </div>

          <div className="border-l-4 border-green-500 bg-white/5 pl-4 py-3 rounded-r">
            <p className="text-ios-callout text-white/70">
              <strong className="text-green-400">Example 3:</strong> Candidate explained each isolation step out loud, used GS38 leads correctly, and kept tidy work area - assessor noted professionalism - passed.
            </p>
          </div>

          <div className="border-l-4 border-yellow-500 bg-white/5 pl-4 py-3 rounded-r">
            <p className="text-ios-callout text-white/70">
              <strong className="text-yellow-400">Example 4:</strong> In industry, an electrician energised a circuit with no CPC - shock incident. Same behaviour in AM2 = instant fail.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* FAQs */}
      <AM2ContentCard
        title="7. Frequently Asked Questions"
        icon={Brain}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-ios-headline text-white/90 mb-2">Q1: Do assessors allow small safety mistakes?</h3>
            <p className="text-ios-callout text-white/70">
              No - safety errors are heavily penalised, and critical errors result in instant failure. There are no "small" safety mistakes in electrical work.
            </p>
          </div>

          <div>
            <h3 className="text-ios-headline text-white/90 mb-2">Q2: What if I realise I've made a safety error during the exam?</h3>
            <p className="text-ios-callout text-white/70">
              Stop immediately, inform the assessor, isolate if necessary, and correct it properly. Honesty and immediate correction show professional integrity.
            </p>
          </div>

          <div>
            <h3 className="text-ios-headline text-white/90 mb-2">Q3: Is it better to be slow and safe, or fast and efficient?</h3>
            <p className="text-ios-callout text-white/70">
              Always slow and safe. Speed is never prioritised over safety in AM2. A methodical, safe approach will always score higher than rushing.
            </p>
          </div>

          <div>
            <h3 className="text-ios-headline text-white/90 mb-2">Q4: Should I verbalise my safety steps?</h3>
            <p className="text-ios-callout text-white/70">
              Yes! Talking through safety steps like "proving my tester on known live source" clearly demonstrates your understanding to the assessor.
            </p>
          </div>

          <div>
            <h3 className="text-ios-headline text-white/90 mb-2">Q5: What happens if my test equipment fails during the exam?</h3>
            <p className="text-ios-callout text-white/70">
              Stop work immediately, inform the assessor, and request replacement equipment. Never continue with faulty or unsafe test equipment.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard
        title="8. Summary"
        icon={CheckCircle}
      >
        <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
          <p className="text-ios-callout text-white/80 mb-4 font-medium">
            In AM2, safety is the foundation of everything. You must:
          </p>
          <ul className="text-ios-callout text-white/70 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Follow safe isolation correctly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Use PPE and tools properly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Terminate and test safely with GS38 compliance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Keep your work area tidy and circuits safe</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span>Show the assessor, clearly and confidently, that safety is always your first priority</span>
            </li>
          </ul>
          <p className="text-ios-callout text-white/80 mt-4 font-bold">
            Unsafe = fail. Safe = pass.
          </p>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz
        questions={quizQuestions}
        title="Test Your Knowledge: Safety-first Approach"
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        previousHref="../section2"
        previousLabel="Coping with Nerves"
        nextHref="../section4"
        nextLabel="Avoiding Common Mistakes"
        currentSection={3}
        totalSections={4}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module7Section3;
