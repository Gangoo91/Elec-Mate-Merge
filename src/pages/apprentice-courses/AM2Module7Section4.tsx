import { AlertTriangle, CheckCircle, Target, Lightbulb, Brain, BookOpen, Wrench, Eye, TestTube, Zap, FileText, Clock, Shield, Users } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module7Section4 = () => {
  useSEO(
    "Avoiding Common Mistakes | AM2 Module 7 Section 4",
    "Most common AM2 failures and how to avoid them - Critical pitfalls and prevention strategies"
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "isolation-mistake",
      question: "What happens if you forget to re-prove your tester after proving dead?",
      options: [
        "Minor mark deduction",
        "Warning from assessor",
        "Automatic fail - unsafe isolation",
        "No consequence if circuit is actually dead"
      ],
      correctIndex: 2,
      explanation: "Forgetting to re-prove your tester after proving dead is an automatic fail as it represents unsafe isolation procedure."
    },
    {
      id: "testing-order",
      question: "What sequence must testing follow in AM2?",
      options: [
        "Any logical order",
        "GN3 sequence exactly",
        "Start with most important tests",
        "Assessor will tell you the order"
      ],
      correctIndex: 1,
      explanation: "Testing must follow the exact GN3 sequence as specified in the guidance notes - this is mandatory."
    },
    {
      id: "fault-finding-error",
      question: "What's wrong with writing 'fault fixed' in fault-finding?",
      options: [
        "Too informal language",
        "Should be 'fault corrected'",
        "Doesn't explain what rectification was done",
        "Nothing wrong with it"
      ],
      correctIndex: 2,
      explanation: "Writing 'fault fixed' doesn't explain the specific rectification action taken - you must state exactly what was done."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is the number one cause of AM2 failure?",
      options: [
        "Poor installation work",
        "Failing the knowledge test",
        "Safe isolation mistakes",
        "Running out of time"
      ],
      correctAnswer: 2,
      explanation: "Safe isolation mistakes are the number one cause of AM2 failure, often resulting in automatic fail."
    },
    {
      id: 2,
      question: "Give two common installation mistakes:",
      options: [
        "Working too slowly, asking too many questions",
        "Bare copper exposed, CPCs unsleeved",
        "Using wrong tools, working alone",
        "Taking too many breaks, talking too much"
      ],
      correctAnswer: 1,
      explanation: "Common installation mistakes include leaving bare copper exposed and failing to sleeve CPCs properly."
    },
    {
      id: 3,
      question: "Why is writing '0 ohms' as Zs a mistake?",
      options: [
        "It's the wrong unit",
        "It's unrealistic - no circuit has zero impedance",
        "It should be written as '< 0.01 ohms'",
        "Assessors don't like zeros"
      ],
      correctAnswer: 1,
      explanation: "Writing '0 ohms' is unrealistic as no real circuit has zero impedance - give realistic measured values."
    },
    {
      id: 4,
      question: "What must always follow a rectification statement?",
      options: [
        "Assessor approval",
        "A re-test statement",
        "Client notification",
        "Tool inspection"
      ],
      correctAnswer: 1,
      explanation: "Every rectification statement must be followed by stating what re-test will be carried out to verify the repair."
    },
    {
      id: 5,
      question: "True or false: You should leave questions blank in the knowledge test if unsure:",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "False - always attempt every question. You might get it right, and you definitely won't if you leave it blank."
    },
    {
      id: 6,
      question: "What's the most common exam trap in knowledge test wording?",
      options: [
        "Complex technical terms",
        "Confusing 'maximum' vs 'minimum'",
        "Multiple choice format",
        "Time pressure"
      ],
      correctAnswer: 1,
      explanation: "The most common trap is misreading key words like 'maximum' vs 'minimum' - always underline key words."
    },
    {
      id: 7,
      question: "Why is labelling circuits in the DB important?",
      options: [
        "It looks professional",
        "It's required for safety and identification",
        "Assessors like tidy work",
        "It saves time later"
      ],
      correctAnswer: 1,
      explanation: "Circuit labelling is essential for safety and proper identification - failure to label loses marks."
    },
    {
      id: 8,
      question: "What type of tester should you use for safe isolation?",
      options: [
        "Digital multimeter",
        "Two-pole voltage indicator (GS38)",
        "Insulation resistance tester",
        "Continuity tester"
      ],
      correctAnswer: 1,
      explanation: "Safe isolation requires a two-pole voltage indicator compliant with GS38 - not a multimeter."
    },
    {
      id: 9,
      question: "What's the golden rule for avoiding common mistakes in AM2?",
      options: [
        "Work as fast as possible",
        "Preparation, calm discipline, and self-checking",
        "Copy other candidates",
        "Ask assessor for help frequently"
      ],
      correctAnswer: 1,
      explanation: "The golden rule is preparation, calm discipline, and self-checking to avoid avoidable mistakes."
    },
    {
      id: 10,
      question: "What should you do if you make a mistake during the exam?",
      options: [
        "Hide it and continue",
        "Stop immediately, inform assessor, and correct it properly",
        "Ask another candidate for help",
        "Pretend it didn't happen"
      ],
      correctAnswer: 1,
      explanation: "Stop immediately, inform the assessor, and correct the mistake properly - honesty shows professionalism."
    }
  ];

  const learningOutcomes = [
    "Identify the most common reasons candidates fail the AM2",
    "Apply strategies to avoid these mistakes in each section of the assessment",
    "Work more confidently by knowing the assessor's 'red flags'",
    "Maintain accuracy and safety even under time pressure",
    "Finish AM2 with fewer lost marks from avoidable errors"
  ];

  return (
    <AM2SectionLayout
      backHref="/apprentice-courses/am2/module7"
      breadcrumbs={[
        { label: "AM2", href: "/apprentice-courses/am2" },
        { label: "Module 7", href: "/apprentice-courses/am2/module7" },
        { label: "Section 4" }
      ]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={AlertTriangle}
        title="Avoiding Common Mistakes"
        description="The AM2 is designed to test competence, not trick candidates. Yet many apprentices fail because of the same avoidable mistakes: rushing, skipping steps, poor paperwork, or guessing. If you know what the common pitfalls are, you can prepare for them and make sure you don't fall into the same traps."
        badge="Module 7 - Section 4"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning
        title="IMPORTANT: Most Failures Are Avoidable"
        message="NET statistics show that most AM2 failures are due to repeated common mistakes, not lack of technical knowledge. These errors are predictable and preventable. Know the pitfalls, prepare for them, and you'll avoid the traps that catch many candidates."
      />

      {/* Learning Outcomes */}
      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Safe Isolation Mistakes */}
      <AM2ContentCard
        title="1. Safe Isolation Mistakes"
        icon={Shield}
        accent
      >
        <p className="text-ios-callout text-white/80 mb-4">
          This is the number one cause of failure. Candidates either forget a step or rush through the process.
        </p>

        <div className="space-y-4">
          <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-red-400 mb-3">Most Common Isolation Errors:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Skipping the re-prove step</strong> after testing dead</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Using wrong tester</strong> (multimeter instead of two-pole voltage indicator)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Not locking off correctly</strong> or forgetting to secure isolation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Testing at wrong points</strong> or missing test points</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Rushing the process</strong> under time pressure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Failing to identify all sources</strong> of supply to the circuit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Not proving tester initially</strong> on known live source</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Using damaged test leads</strong> or non-GS38 equipment</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-yellow-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-yellow-400 mb-3">Why These Errors Happen:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">-</span>
                <span><strong className="text-white/90">Time pressure</strong> - candidates rush basic safety steps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">-</span>
                <span><strong className="text-white/90">Overconfidence</strong> - assuming circuit is dead without proper verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">-</span>
                <span><strong className="text-white/90">Poor preparation</strong> - not practicing the full 10-step sequence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">-</span>
                <span><strong className="text-white/90">Equipment unfamiliarity</strong> - using unfamiliar test instruments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">-</span>
                <span><strong className="text-white/90">Stress response</strong> - forgetting steps under exam pressure</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-blue-400 mb-3">Detailed Prevention Strategy:</h4>
            <div className="space-y-3">
              <div>
                <h5 className="text-ios-callout text-blue-400 font-medium">Before You Start:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1 ml-4">
                  <li>- Check test equipment is GS38-compliant and in good condition</li>
                  <li>- Verify you have correct PPE for the task</li>
                  <li>- Identify all possible sources of supply to the circuit</li>
                  <li>- Plan your isolation strategy before touching anything</li>
                </ul>
              </div>
              <div>
                <h5 className="text-ios-callout text-blue-400 font-medium">During Isolation:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1 ml-4">
                  <li>- Follow the 10-step process religiously - no shortcuts</li>
                  <li>- Verbalise each step to the assessor clearly</li>
                  <li>- Take your time - safety over speed always</li>
                  <li>- Test at all relevant points, not just one location</li>
                  <li>- Use lockable isolation where possible</li>
                </ul>
              </div>
              <div>
                <h5 className="text-ios-callout text-blue-400 font-medium">After Testing Dead:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1 ml-4">
                  <li>- Always re-prove tester on known live source</li>
                  <li>- Confirm tester is working correctly</li>
                  <li>- Only then proceed with work on dead circuit</li>
                  <li>- Maintain isolation throughout the task</li>
                </ul>
              </div>
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

      {/* Installation Mistakes */}
      <AM2ContentCard
        title="2. Installation Mistakes"
        icon={Wrench}
      >
        <p className="text-ios-callout text-white/80 mb-4">
          Most marks are lost here because of poor workmanship and time management issues.
        </p>

        <div className="space-y-4">
          <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-red-400 mb-3">Common Installation Errors:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Untidy containment:</strong> conduit kinks, trunking lids not flush, poor bending radius</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Bare copper exposed</strong> at terminations - major safety issue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">CPCs unsleeved</strong> or left disconnected - BS 7671 non-compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Accessories crooked</strong> or at wrong height - poor workmanship</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Not labelling circuits</strong> in distribution board - identification failure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Poor cable management</strong> and untidy work area</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 mb-3">Comprehensive Prevention Strategy:</h4>
            <div className="space-y-3">
              <div>
                <h5 className="text-ios-callout text-green-400 font-medium">Planning Phase:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1 ml-4">
                  <li>- Measure and mark out carefully before starting</li>
                  <li>- Plan cable routes for neatness and compliance</li>
                  <li>- Check all materials and tools are available</li>
                  <li>- Understand the installation requirements fully</li>
                </ul>
              </div>
              <div>
                <h5 className="text-ios-callout text-green-400 font-medium">During Installation:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1 ml-4">
                  <li>- Work steadily rather than rushing - quality over speed</li>
                  <li>- Connect and sleeve CPCs first, disconnect last</li>
                  <li>- Use proper torque settings for all connections</li>
                  <li>- Maintain professional cable management throughout</li>
                  <li>- Keep work area tidy and organised</li>
                </ul>
              </div>
              <div>
                <h5 className="text-ios-callout text-green-400 font-medium">Quality Control:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1 ml-4">
                  <li>- Label circuits as you install them - don't leave to end</li>
                  <li>- Self-check work before calling assessor</li>
                  <li>- Ensure no bare copper is visible anywhere</li>
                  <li>- Check all accessories are level and secure</li>
                  <li>- Verify all connections are tight and proper</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Inspection & Testing Mistakes */}
      <AM2ContentCard
        title="3. Inspection & Testing Mistakes"
        icon={TestTube}
      >
        <p className="text-ios-callout text-white/80 mb-4">
          This section often sinks candidates who know the tests but don't follow proper procedure.
        </p>

        <div className="space-y-4">
          <div className="bg-white/5 border border-orange-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-orange-400 mb-3">Common Testing Errors:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">-</span>
                <span><strong className="text-white/90">Wrong order of tests</strong> (not following GN3 sequence exactly)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">-</span>
                <span><strong className="text-white/90">Forgetting insulation resistance</strong> on individual circuits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">-</span>
                <span><strong className="text-white/90">Not recording results</strong> as they go - leaving it to memory</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">-</span>
                <span><strong className="text-white/90">Writing unrealistic values</strong> ("0 ohms" Zs, "infinity" IR, "999 MOhms")</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">-</span>
                <span><strong className="text-white/90">Incorrect test methods</strong> or wrong instrument ranges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">-</span>
                <span><strong className="text-white/90">Missing polarity checks</strong> on relevant circuits</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-blue-400 mb-3">Comprehensive Testing Strategy:</h4>
            <div className="space-y-3">
              <div>
                <h5 className="text-ios-callout text-blue-400 font-medium">Before Testing:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1 ml-4">
                  <li>- Have GN3 sequence clearly available for reference</li>
                  <li>- Prepare all test instruments and check calibration</li>
                  <li>- Set up documentation sheets ready for recording</li>
                  <li>- Ensure circuit is properly isolated before testing</li>
                </ul>
              </div>
              <div>
                <h5 className="text-ios-callout text-blue-400 font-medium">During Testing:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1 ml-4">
                  <li>- Stick to GN3 order exactly - no shortcuts or variations</li>
                  <li>- Record results immediately after each test</li>
                  <li>- Use correct test methods and instrument settings</li>
                  <li>- Give realistic measured values based on circuit characteristics</li>
                  <li>- Double-check you've completed all required tests</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 mb-3">GN3 Test Sequence Reminder:</h4>
            <ol className="text-ios-callout text-white/70 space-y-1 list-decimal list-inside">
              <li>Continuity of protective conductors</li>
              <li>Continuity of ring final circuit conductors</li>
              <li>Insulation resistance</li>
              <li>Polarity</li>
              <li>Earth electrode resistance (where applicable)</li>
              <li>Earth fault loop impedance</li>
              <li>Prospective fault current</li>
              <li>Functional testing</li>
            </ol>
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

      {/* Fault-finding Mistakes */}
      <AM2ContentCard
        title="4. Fault-finding Mistakes"
        icon={Eye}
      >
        <p className="text-ios-callout text-white/80 mb-4">
          Most apprentices fail this section by guessing or not stating rectification properly.
        </p>

        <div className="space-y-4">
          <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-red-400 mb-3">Common Fault-finding Errors:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Guessing instead of testing logically</strong> - jumping to conclusions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Not writing rectification clearly</strong> (e.g., "fix fault" instead of "reconnect CPC at socket and re-test continuity")</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Forgetting to state re-test</strong> after rectification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Poor documentation</strong> of fault-finding process</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">-</span>
                <span><strong className="text-white/90">Not following systematic approach</strong> to fault diagnosis</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 mb-3">Comprehensive Fault-finding Strategy:</h4>
            <div className="space-y-3">
              <div>
                <h5 className="text-ios-callout text-green-400 font-medium">1. Systematic Diagnosis Process:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1 ml-4">
                  <li>- <strong className="text-white/90">Gather information:</strong> What symptoms are reported?</li>
                  <li>- <strong className="text-white/90">Form hypothesis:</strong> What could cause these symptoms?</li>
                  <li>- <strong className="text-white/90">Test hypothesis:</strong> Use appropriate tests to confirm or eliminate</li>
                  <li>- <strong className="text-white/90">Locate precisely:</strong> Find exact location and nature of fault</li>
                  <li>- <strong className="text-white/90">Document findings:</strong> Record test results and conclusions</li>
                </ul>
              </div>
              <div>
                <h5 className="text-ios-callout text-green-400 font-medium">2. Clear Rectification Statements:</h5>
                <div className="bg-green-500/10 rounded p-2 mt-2">
                  <p className="text-ios-callout text-white/70 mb-2"><strong className="text-white/90">Instead of:</strong> "Fix broken wire"</p>
                  <p className="text-ios-callout text-white/70"><strong className="text-white/90">Write:</strong> "Replace damaged section of 2.5mm T&E cable between positions A and B, making connections using 30A junction box with maintenance-free connectors"</p>
                </div>
              </div>
              <div>
                <h5 className="text-ios-callout text-green-400 font-medium">3. Essential Re-test Statements:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1 ml-4">
                  <li>- Always specify which test confirms the repair</li>
                  <li>- State expected result of the re-test</li>
                  <li>- Example: "Re-test continuity of CPC - expect reading less than 0.5 ohms"</li>
                  <li>- Include functional testing where appropriate</li>
                </ul>
              </div>
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

      {/* Knowledge Test Mistakes */}
      <AM2ContentCard
        title="5. Knowledge Test Mistakes"
        icon={Brain}
      >
        <p className="text-ios-callout text-white/80 mb-4">
          Many lose marks here due to exam discipline, not lack of knowledge.
        </p>

        <div className="space-y-4">
          <div className="bg-white/5 border border-yellow-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-yellow-400 mb-3">Common Knowledge Test Errors:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">-</span>
                <span><strong className="text-white/90">Misreading key words</strong> ("maximum" vs "minimum", "must" vs "should")</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">-</span>
                <span><strong className="text-white/90">Confusing units</strong> (seconds vs milliseconds, kW vs W, mA vs A)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">-</span>
                <span><strong className="text-white/90">Spending too long</strong> on difficult questions, running out of time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">-</span>
                <span><strong className="text-white/90">Leaving blanks</strong> instead of educated guessing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400">-</span>
                <span><strong className="text-white/90">Not checking answers</strong> before submitting</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-blue-400 mb-3">Comprehensive Knowledge Test Strategy:</h4>
            <div className="space-y-3">
              <div>
                <h5 className="text-ios-callout text-blue-400 font-medium">For Each Question:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1 ml-4">
                  <li>- Read question twice, underlining key words</li>
                  <li>- Check units required in answer</li>
                  <li>- Read all options before deciding</li>
                  <li>- Eliminate obviously wrong answers first</li>
                  <li>- Use process of elimination systematically</li>
                  <li>- If unsure, make educated guess rather than leave blank</li>
                </ul>
              </div>
              <div>
                <h5 className="text-ios-callout text-blue-400 font-medium">Time Management:</h5>
                <ul className="text-ios-callout text-white/70 space-y-1 ml-4">
                  <li>- Don't spend more than allocated time per question</li>
                  <li>- Mark difficult questions and return to them</li>
                  <li>- Always attempt every question - never leave blanks</li>
                  <li>- Save time for final review if possible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Practical Guidance */}
      <AM2ContentCard
        title="6. Practical Guidance"
        icon={Lightbulb}
      >
        <p className="text-ios-callout text-white/80 mb-4">
          Professional habits that prevent common mistakes:
        </p>

        <div className="space-y-4">
          <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-blue-400" />
              <h4 className="text-ios-headline text-blue-400">Professional Mindset</h4>
            </div>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li>- Always think "What would the assessor mark as unsafe?" and avoid it</li>
              <li>- Build habits of checking work: no bare copper, CPC sleeved, labels applied</li>
              <li>- Slow down slightly on safety-critical steps - rushing isolation or testing = fail</li>
              <li>- Treat paperwork as part of the exam, not an afterthought</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-green-400" />
              <h4 className="text-ios-headline text-green-400">Communication Strategy</h4>
            </div>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li>- If unsure, explain your process out loud - it earns credit even if result isn't perfect</li>
              <li>- Ask for clarification if instructions are unclear</li>
              <li>- Inform assessor of any issues or concerns immediately</li>
              <li>- Demonstrate your thinking process, not just the end result</li>
            </ul>
          </div>

          <div className="bg-white/5 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-purple-400" />
              <h4 className="text-ios-headline text-purple-400">Quality Control Habits</h4>
            </div>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li>- Self-check your work before calling the assessor</li>
              <li>- Use a systematic checklist approach</li>
              <li>- Document everything as you go, not at the end</li>
              <li>- Leave every stage in a safe, professional condition</li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Real-world Examples */}
      <AM2ContentCard
        title="7. Real-world Examples"
        icon={BookOpen}
      >
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 bg-white/5 pl-4 py-3 rounded-r">
            <p className="text-ios-callout text-white/70">
              <strong className="text-red-400">Example 1:</strong> Candidate skipped re-prove in safe isolation procedure - assessor stopped exam immediately - automatic fail.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 bg-white/5 pl-4 py-3 rounded-r">
            <p className="text-ios-callout text-white/70">
              <strong className="text-orange-400">Example 2:</strong> Candidate installed everything neatly but didn't label circuits in DB - lost significant marks unnecessarily for incomplete work.
            </p>
          </div>

          <div className="border-l-4 border-yellow-500 bg-white/5 pl-4 py-3 rounded-r">
            <p className="text-ios-callout text-white/70">
              <strong className="text-yellow-400">Example 3:</strong> Candidate wrote "fault fixed" instead of explaining specific rectification action - lost fault-finding marks for poor documentation.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 bg-white/5 pl-4 py-3 rounded-r">
            <p className="text-ios-callout text-white/70">
              <strong className="text-blue-400">Example 4:</strong> Candidate misread "minimum IR" and answered with recommended value instead of required minimum - lost marks in knowledge test.
            </p>
          </div>

          <div className="border-l-4 border-green-500 bg-white/5 pl-4 py-3 rounded-r">
            <p className="text-ios-callout text-white/70">
              <strong className="text-green-400">Example 5:</strong> Candidate followed systematic approach, documented clearly, and self-checked work - passed comfortably despite minor technical error.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* FAQs */}
      <AM2ContentCard
        title="8. Frequently Asked Questions"
        icon={Brain}
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-ios-headline text-white/90 mb-2">Q1: Are common mistakes published by NET?</h3>
            <p className="text-ios-callout text-white/70">
              Yes - NET highlights common fail areas in pre-assessment manuals and training materials. They want you to succeed.
            </p>
          </div>

          <div>
            <h3 className="text-ios-headline text-white/90 mb-2">Q2: Do assessors allow small errors?</h3>
            <p className="text-ios-callout text-white/70">
              Some workmanship issues lose marks but don't cause failure. However, safety errors cause instant fail regardless of size.
            </p>
          </div>

          <div>
            <h3 className="text-ios-headline text-white/90 mb-2">Q3: Can I pass if I make one or two minor mistakes?</h3>
            <p className="text-ios-callout text-white/70">
              Yes - but repeated small errors will drag your score down. The key is avoiding patterns of careless mistakes.
            </p>
          </div>

          <div>
            <h3 className="text-ios-headline text-white/90 mb-2">Q4: Is paperwork as important as installation work?</h3>
            <p className="text-ios-callout text-white/70">
              Yes - incomplete or inaccurate paperwork loses many marks. Documentation is part of professional electrical work.
            </p>
          </div>

          <div>
            <h3 className="text-ios-headline text-white/90 mb-2">Q5: What's the biggest single avoidable mistake?</h3>
            <p className="text-ios-callout text-white/70">
              Not following the safe isolation procedure fully and correctly. This alone causes more failures than any other single error.
            </p>
          </div>

          <div>
            <h3 className="text-ios-headline text-white/90 mb-2">Q6: Should I tell the assessor if I make a mistake?</h3>
            <p className="text-ios-callout text-white/70">
              Yes - honesty and immediate correction show professionalism and safety awareness. It's better than trying to hide errors.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard
        title="9. Summary"
        icon={CheckCircle}
      >
        <div className="bg-white/5 border border-blue-500/30 rounded-xl p-4">
          <p className="text-ios-callout text-white/80 mb-4 font-medium">
            Most AM2 failures are caused by avoidable mistakes, not lack of skill. Common errors include:
          </p>
          <ul className="text-ios-callout text-white/70 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">-</span>
              <span>Skipping safe isolation steps</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">-</span>
              <span>Poor workmanship in installation (bare copper, unsleeved CPCs, untidy containment)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">-</span>
              <span>Wrong testing order or unrealistic results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">-</span>
              <span>Guessing in fault-finding or incomplete rectification statements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">-</span>
              <span>Misreading questions or leaving blanks in the knowledge test</span>
            </li>
          </ul>
          <p className="text-ios-callout text-white/80 mt-4 font-bold">
            The solution is preparation, calm discipline, and self-checking. Avoid these traps and you put yourself in a strong position to pass.
          </p>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz
        questions={quizQuestions}
        title="Test Your Knowledge: Avoiding Common AM2 Mistakes"
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        previousHref="../section3"
        previousLabel="Safety-first Approach"
        nextHref="/apprentice-courses/am2/module8"
        nextLabel="Module 8"
        currentSection={4}
        totalSections={4}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module7Section4;
