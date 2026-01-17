import { AlertTriangle, CheckCircle, Target, Search, Lightbulb, BookOpen, Wrench, Zap, Eye, Settings, Shield } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module5Section2 = () => {
  useSEO(
    "Logical Fault-Finding Process | AM2 Module 5 Section 2",
    "Master the systematic approach to fault diagnosis in AM2 assessments. Learn safe isolation, test selection, and logical interpretation of results."
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "first-action",
      question: "What's the first action before testing a faulted circuit?",
      options: [
        "Check test equipment calibration",
        "Apply safe isolation to prove the circuit is dead",
        "Read the circuit documentation",
        "Observe the symptoms"
      ],
      correctIndex: 1,
      explanation: "Safe isolation must always be the first step before any fault-finding work to ensure personal safety and demonstrate proper procedure to the assessor."
    },
    {
      id: "mcb-trips",
      question: "If an MCB trips immediately when energised, what's your first test?",
      options: [
        "Continuity test",
        "Polarity test",
        "Insulation resistance to check for a short or earth fault",
        "RCD test"
      ],
      correctIndex: 2,
      explanation: "Immediate MCB tripping indicates excessive current flow, suggesting a short circuit or earth fault. Insulation resistance testing will identify this."
    },
    {
      id: "fault-recording",
      question: "Why is it not enough to just say 'ring final fault'?",
      options: [
        "You need to specify the cable size",
        "You need to include the test results",
        "Because you must give type, location, and rectification - assessor needs detail",
        "You need to measure the exact resistance"
      ],
      correctIndex: 2,
      explanation: "Assessors require complete fault diagnosis including fault type, exact location, and how it would be rectified to demonstrate thorough understanding."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the first step in fault finding?",
      options: ["Visual inspection", "Safe isolation", "Reading symptoms", "Testing continuity"],
      correctAnswer: 1,
      explanation: "Safe isolation must always be the first step to ensure personal safety and demonstrate proper electrical procedure."
    },
    {
      id: 2,
      question: "Why must you observe symptoms before testing?",
      options: ["To save time", "Symptoms guide which test to perform first", "It's required by regulations", "To impress the assessor"],
      correctAnswer: 1,
      explanation: "Symptoms provide vital clues about the fault type, allowing you to select the most appropriate test and work systematically."
    },
    {
      id: 3,
      question: "Which test is best for suspected short circuits?",
      options: ["Continuity test", "Polarity test", "Insulation resistance test", "RCD test"],
      correctAnswer: 2,
      explanation: "Insulation resistance testing at 500V DC will reveal short circuits as very low or zero resistance readings between conductors."
    },
    {
      id: 4,
      question: "If a socket is dead, what test should you carry out first?",
      options: ["Insulation resistance", "Polarity test", "Continuity test", "Earth fault loop impedance"],
      correctAnswer: 2,
      explanation: "A dead socket suggests an open circuit, so continuity testing will reveal if there's a break in the circuit path."
    },
    {
      id: 5,
      question: "Why must you start fault-finding at the CU?",
      options: ["It's the safest place", "To work systematically from origin outward", "Regulations require it", "Test equipment works better there"],
      correctAnswer: 1,
      explanation: "Starting from the consumer unit and working outward ensures systematic testing and avoids random fault-chasing."
    },
    {
      id: 6,
      question: "What does a very high Zs reading usually suggest?",
      options: ["Short circuit", "Earth fault", "High resistance joint", "Polarity error"],
      correctAnswer: 2,
      explanation: "High earth fault loop impedance (Zs) typically indicates a high resistance connection in the earth path or circuit conductors."
    },
    {
      id: 7,
      question: "True or false: Guessing faults is acceptable if you're correct.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. NET assessors mark the process and methodology, not just the final result. Guessing shows poor professional practice."
    },
    {
      id: 8,
      question: "What three things must you record when diagnosing a fault?",
      options: ["Type, test results, time taken", "Location, cost, difficulty", "Type, location, rectification", "Cause, effect, prevention"],
      correctAnswer: 2,
      explanation: "Complete fault diagnosis requires fault type, exact location, and how the fault would be rectified."
    },
    {
      id: 9,
      question: "Why should you explain your process out loud to the assessor?",
      options: ["To fill time", "Assessors mark reasoning and methodology", "It's required by regulations", "To show confidence"],
      correctAnswer: 1,
      explanation: "Assessors award marks for logical reasoning and systematic approach, which must be demonstrated through clear explanation."
    },
    {
      id: 10,
      question: "After diagnosing a fault, what's the final step before handing back?",
      options: ["Clean up tools", "Complete paperwork", "Prove the circuit would be safe after rectification", "Pack test equipment"],
      correctAnswer: 2,
      explanation: "You must demonstrate that you understand how to make the installation safe again after fault rectification."
    }
  ];

  const faqs = [
    {
      question: "Do I have to follow the same test sequence every time?",
      answer: "No, you adapt it to symptoms, but you must stay logical and structured. The key is demonstrating systematic thinking."
    },
    {
      question: "Can I get marks for explaining the fault even if I don't locate it exactly?",
      answer: "Yes - assessors credit method and reasoning. Your logical approach is as important as the final result."
    },
    {
      question: "What happens if I guess and get it right?",
      answer: "You won't score well - NET assesses the process, not luck. Professional electricians work systematically, not by guesswork."
    },
    {
      question: "Do I have to write rectification even though I don't fix it?",
      answer: "Yes - recording rectification is part of the assessment. It proves you understand how to make the installation safe."
    },
    {
      question: "Will assessors give hints?",
      answer: "No - they only observe. It's your job to demonstrate the logical process independently."
    }
  ];

  const learningOutcomes = [
    "Follow a step-by-step diagnostic method for fault-finding in AM2",
    "Use safe isolation before working on faulted circuits",
    "Select and apply the correct test for the type of fault suspected",
    "Interpret test results logically instead of guessing",
    "Explain your reasoning clearly to the assessor"
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module5"
      breadcrumbs={[
        { label: "AM2", href: "/study-centre/apprentice/am2" },
        { label: "Module 5", href: "/study-centre/apprentice/am2/module5" },
        { label: "Section 2" }
      ]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Search}
        title="Logical Fault-Finding Process"
        description="Fault diagnosis is about working systematically. In the AM2, you are being tested not only on your knowledge of electrical faults but also on your ability to think like a competent electrician."
        badge="Module 5 - Section 2"
      />

      {/* Additional Context */}
      <p className="text-ios-body text-white/80 leading-relaxed -mt-4 mb-6">
        NET assessors are looking for method, not magic. They want to see that you can work safely, approach faults in a structured way, use test instruments properly, and state your diagnosis clearly.
      </p>

      {/* Critical Warning */}
      <AM2CriticalWarning
        title="CRITICAL: Safety Always Comes First"
        message="If you forget safe isolation, it's an instant fail. Even in controlled AM2 conditions, you must demonstrate correct safety procedures - this proves to assessors that safety is always your first thought. Every test must begin with proper isolation and proving procedures. No exceptions."
      />

      {/* Learning Outcomes */}
      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* The 7-Step Process */}
      <AM2ContentCard
        title="1. The 7-Step Logical Process"
        icon={Target}
        accent
      >
        <div className="space-y-4">
          <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-red-400 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Step 1: Start with Safety
            </h4>
            <p className="text-ios-callout text-white/70 mb-3">
              Every fault-finding exercise begins with safe isolation. Even though the circuits are prepared by NET and under controlled conditions, you must still demonstrate correct procedure.
            </p>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Identify correct isolation point</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Secure isolation (lock off where possible)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Test voltage indicator on known live source</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Test circuit to prove dead</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Re-test voltage indicator to prove it's working</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4 text-elec-yellow" />
              Step 2: Gather Information (Symptoms)
            </h4>
            <p className="text-ios-callout text-white/70 mb-3">
              Look at what the circuit is doing. These symptoms are clues to the type of fault:
            </p>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Is a socket completely dead? (Open circuit likely)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Does an MCB trip immediately? (Short circuit/earth fault)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Do lights behave oddly? (High resistance connection)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Does RCD trip when energised? (Earth fault)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-elec-yellow" />
              Step 3: Plan the Test Sequence
            </h4>
            <p className="text-ios-callout text-white/70 mb-3">
              Once you know the symptom, decide which test will prove or disprove the suspected fault:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-ios-callout text-white/80">
                  <strong className="text-white/90">Suspected open circuit</strong><br />
                  - Continuity test
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-ios-callout text-white/80">
                  <strong className="text-white/90">Suspected short circuit</strong><br />
                  - Insulation resistance test
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-ios-callout text-white/80">
                  <strong className="text-white/90">Suspected polarity error</strong><br />
                  - Polarity test at accessory
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                <p className="text-ios-callout text-white/80">
                  <strong className="text-white/90">Suspected high resistance</strong><br />
                  - Measure Zs or check terminations
                </p>
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

      {/* Steps 4-7 */}
      <AM2ContentCard
        title="2. Testing and Analysis Steps"
        icon={Zap}
      >
        <div className="space-y-4">
          <div className="bg-white/5 border border-purple-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-purple-400 mb-3">Step 4: Test Logically, Step by Step</h4>
            <p className="text-ios-callout text-white/70 mb-3">
              Start from the origin (CU) and work outwards. This avoids chasing faults randomly.
            </p>
            <div className="text-ios-callout text-white/70">
              <p className="font-medium text-white/90 mb-2">Example: Ring final circuit testing</p>
              <ol className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">1.</span>
                  <span>Prove continuity of each conductor at the CU</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">2.</span>
                  <span>Cross-connect and measure at sockets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">3.</span>
                  <span>Narrow down where the break or reversal occurs</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="bg-white/5 border border-amber-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-amber-400 mb-3">Step 5: Interpret the Result</h4>
            <p className="text-ios-callout text-white/70 mb-3">
              Don't just write down numbers - explain what they mean:
            </p>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span><strong className="text-white/90">0 MOhm on insulation resistance</strong> = Short circuit or earth fault</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span><strong className="text-white/90">Very high Zs reading</strong> = High resistance joint</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span><strong className="text-white/90">Dead socket with no continuity on line</strong> = Open circuit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span><strong className="text-white/90">RCD trips at 15mA instead of 30mA</strong> = Over-sensitive RCD</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Step 6: Record the Fault and Rectification</h4>
            <p className="text-ios-callout text-white/70 mb-3">
              When you find the fault, you must state clearly:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                <p className="text-ios-callout font-medium text-white/90">What the fault is</p>
                <p className="text-ios-footnote text-elec-yellow">(Type)</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                <p className="text-ios-callout font-medium text-white/90">Where it is located</p>
                <p className="text-ios-footnote text-elec-yellow">(Location)</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-center">
                <p className="text-ios-callout font-medium text-white/90">How you would rectify it</p>
                <p className="text-ios-footnote text-elec-yellow">(Rectification)</p>
              </div>
            </div>
            <div className="mt-3 bg-white/5 border border-white/10 rounded-lg p-3">
              <p className="text-ios-callout text-white/80">
                <strong className="text-white/90">Example:</strong> "Open CPC between CU and socket 2. Rectify by reconnecting CPC at CU terminal."
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 mb-3">Step 7: Prove Safe Afterwards</h4>
            <p className="text-ios-callout text-white/70">
              Finally, confirm that after rectification, the circuit would be re-tested using the correct sequence. This shows you understand the importance of leaving an installation safe.
            </p>
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

      {/* Practical Guidance */}
      <AM2ContentCard
        title="3. Practical Guidance for AM2 Success"
        icon={Wrench}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-red-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Critical Success Factors
              </h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong className="text-white/90">Always think safety first</strong> - if you forget isolation, it's an instant fail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong className="text-white/90">Talk through your logic</strong> - say what you're testing and why</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong className="text-white/90">Work methodically</strong> - don't jump between circuits or tests</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span><strong className="text-white/90">Be precise</strong> - fault = type + location + rectification</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-green-400 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Professional Approach
              </h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Demonstrate systematic thinking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Explain your reasoning clearly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Show confidence in your methodology</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">•</span>
                  <span>Avoid guessing - even if unsure, show logical process</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white/90 mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-elec-yellow" />
                Time Management Tips
              </h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Plan your test sequence before starting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Don't waste time on obvious non-faults</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Document findings as you go</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Keep assessor informed of progress</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-amber-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-amber-400 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Common Mistakes to Avoid
              </h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>Rushing the safety isolation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>Testing randomly without logic</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>Not explaining your reasoning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>Incomplete fault descriptions</span>
                </li>
              </ul>
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

      {/* Real-World Examples */}
      <AM2ContentCard
        title="4. Real-World Examples"
        icon={BookOpen}
      >
        <div className="space-y-4">
          <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-red-400 mb-3">Example 1: Poor Method</h4>
            <p className="text-ios-callout text-white/70 mb-2">
              <strong className="text-white/90">Scenario:</strong> Candidate saw an RCD tripping and immediately said "earth fault."
            </p>
            <p className="text-ios-callout text-white/70 mb-2">
              <strong className="text-white/90">Problem:</strong> Assessor asked "where exactly?" - candidate couldn't prove it.
            </p>
            <p className="text-ios-callout text-white/80 font-medium">
              <strong className="text-red-400">Result:</strong> Marks lost for guessing instead of systematic diagnosis.
            </p>
          </div>

          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 mb-3">Example 2: Good Method</h4>
            <p className="text-ios-callout text-white/70 mb-2">
              <strong className="text-white/90">Scenario:</strong> Candidate tested continuity systematically.
            </p>
            <p className="text-ios-callout text-white/70 mb-2">
              <strong className="text-white/90">Process:</strong> Narrowed down to broken CPC between CU and first socket, recorded properly.
            </p>
            <p className="text-ios-callout text-white/80 font-medium">
              <strong className="text-green-400">Result:</strong> Full marks for logical method and complete diagnosis.
            </p>
          </div>

          <div className="bg-white/5 border border-amber-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-amber-400 mb-3">Example 3: Time Management Failure</h4>
            <p className="text-ios-callout text-white/70 mb-2">
              <strong className="text-white/90">Scenario:</strong> Candidate misread symptoms, tested in wrong order.
            </p>
            <p className="text-ios-callout text-white/70 mb-2">
              <strong className="text-white/90">Problem:</strong> Wasted time on incorrect tests, ran out of time.
            </p>
            <p className="text-ios-callout text-white/80 font-medium">
              <strong className="text-amber-400">Result:</strong> Only 1 fault identified correctly - failed section.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Example 4: Real-World Application</h4>
            <p className="text-ios-callout text-white/70 mb-2">
              <strong className="text-white/90">Scenario:</strong> On site, an electrician guessed at a short circuit.
            </p>
            <p className="text-ios-callout text-white/70 mb-2">
              <strong className="text-white/90">Problem:</strong> Replaced multiple accessories and wasted hours.
            </p>
            <p className="text-ios-callout text-white/80 font-medium">
              <strong className="text-elec-yellow">Lesson:</strong> Logical testing would have found the actual loose neutral in minutes.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* FAQ Section */}
      <AM2ContentCard
        title="5. Frequently Asked Questions"
        icon={Lightbulb}
      >
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white/90 mb-2">
                Q{index + 1}: {faq.question}
              </h4>
              <p className="text-ios-callout text-white/70 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard
        title="6. Section Summary"
        icon={BookOpen}
        accent
      >
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <h4 className="text-ios-headline text-white/90 mb-3">The Logical Fault-Finding Process:</h4>
          <ol className="text-ios-callout text-white/70 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">1.</span>
              <span><strong className="text-white/90">Apply safe isolation</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">2.</span>
              <span><strong className="text-white/90">Observe the symptoms</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">3.</span>
              <span><strong className="text-white/90">Plan the right test</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">4.</span>
              <span><strong className="text-white/90">Test step by step from CU outward</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">5.</span>
              <span><strong className="text-white/90">Interpret results correctly</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">6.</span>
              <span><strong className="text-white/90">Record fault type, location, and rectification</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">7.</span>
              <span><strong className="text-white/90">Prove the circuit safe</strong></span>
            </li>
          </ol>
        </div>

        <div className="bg-white/5 border border-elec-yellow/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-elec-yellow mb-3">Remember:</h4>
          <p className="text-ios-callout text-white/80">
            Following this method shows the assessor you are competent and professional, even under exam pressure. NET assessors mark the process and reasoning - not just the final answer.
          </p>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz
        title="Test Your Knowledge: Logical Fault-Finding Process"
        questions={quizQuestions}
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        previousHref="../section1"
        previousLabel="Typical Faults Set"
        nextHref="../section3"
        nextLabel="Test Methods & Procedures"
        currentSection={2}
        totalSections={6}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module5Section2;
