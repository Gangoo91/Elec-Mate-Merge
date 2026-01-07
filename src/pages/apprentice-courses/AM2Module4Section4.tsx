import { Zap, CheckCircle, AlertTriangle, Target, BookOpen, Timer, Settings, Play, Wrench, TrendingUp, Eye, Lightbulb } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import useSEO from "@/hooks/useSEO";

const AM2Module4Section4 = () => {
  useSEO(
    "Functional and Operational Testing | AM2 Module 4 Section 4",
    "Master functional and operational testing procedures for AM2 electrical assessment success"
  );

  const learningOutcomes = [
    "Perform functional testing of lighting, power, and motor circuits",
    "Carry out RCD testing and confirm trip times within specified limits",
    "Check polarity and operation of switches, sockets, and protective devices",
    "Demonstrate functional testing confidently to an assessor",
    "Record functional results correctly on certification"
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "functional-vs-insulation",
      question: "What's the difference between insulation resistance and functional testing?",
      options: [
        "They are the same test",
        "Insulation resistance checks safety of wiring; functional testing checks operation of equipment and circuits",
        "Functional testing is optional",
        "Insulation resistance is for motors only"
      ],
      correctIndex: 1,
      explanation: "Insulation resistance tests the safety and integrity of cable insulation, while functional testing confirms that circuits and equipment operate correctly as designed."
    },
    {
      id: "rcd-failure",
      question: "What's the required action if an RCD fails to trip within the permitted time?",
      options: [
        "Continue with other tests",
        "Record non-compliance and fail the RCD test",
        "Try the test again",
        "Adjust the settings"
      ],
      correctIndex: 1,
      explanation: "If an RCD fails to trip within BS 7671 specified times, it must be recorded as non-compliant and the test marked as a failure. The RCD requires investigation or replacement."
    },
    {
      id: "testing-completeness",
      question: "Why is it important to test every lighting switch combination?",
      options: [
        "To save time",
        "It's not necessary if some work",
        "To ensure all switching functions operate correctly as designed",
        "Only for three-way switching"
      ],
      correctIndex: 2,
      explanation: "Every switching combination must be tested to confirm correct wiring and operation. Missing any combination could hide wiring errors that compromise safety or functionality."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the difference between insulation resistance and functional testing?",
      options: [
        "No difference - they're the same",
        "Insulation resistance checks safety of wiring; functional testing checks operation of equipment",
        "Functional testing is electrical, insulation is mechanical",
        "Only insulation resistance is required"
      ],
      correctAnswer: 1,
      explanation: "Insulation resistance tests electrical safety of cable insulation, while functional testing verifies that circuits and equipment operate correctly as designed."
    },
    {
      id: 2,
      question: "What must be tested on every lighting circuit?",
      options: [
        "Only the main switch",
        "Every switching combination and lamp operation",
        "Just the circuit breaker",
        "Only two-way switches"
      ],
      correctAnswer: 1,
      explanation: "All switches (one-way, two-way, intermediate) and their combinations must be tested to confirm correct operation and lamp control."
    },
    {
      id: 3,
      question: "Which device is tested at x1 and x5 IΔn?",
      options: ["MCB", "RCD/RCBO", "Isolator", "Fuse"],
      correctAnswer: 1,
      explanation: "RCDs and RCBOs must be tested at both 1x and 5x their rated tripping current (IΔn) to verify correct operation and timing."
    },
    {
      id: 4,
      question: "What unit are RCD trip times recorded in?",
      options: ["Seconds (s)", "Milliseconds (ms)", "Minutes (min)", "Microseconds (us)"],
      correctAnswer: 1,
      explanation: "RCD trip times are measured and recorded in milliseconds (ms) as per BS 7671 requirements."
    },
    {
      id: 5,
      question: "What happens if an RCD fails to trip within limits?",
      options: [
        "Try again later",
        "Record non-compliance and fail the test",
        "Adjust the test current",
        "Skip the test"
      ],
      correctAnswer: 1,
      explanation: "If an RCD fails to trip within the required time limits, it must be recorded as non-compliant and the test marked as failed."
    },
    {
      id: 6,
      question: "True or false: Functional testing can be skipped if electrical tests pass.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Functional testing is mandatory and cannot be skipped. It proves that circuits operate correctly, which electrical tests alone cannot confirm."
    },
    {
      id: 7,
      question: "Why must you test every lighting switch combination?",
      options: [
        "It's not necessary",
        "To ensure all switching functions operate correctly as designed",
        "Only for show",
        "To waste time"
      ],
      correctAnswer: 1,
      explanation: "Testing every switch combination ensures correct wiring and operation of all lighting control functions as per the design."
    },
    {
      id: 8,
      question: "What test tool can be used to check socket polarity?",
      options: [
        "Multimeter only",
        "Polarity tester or plug-in socket tester",
        "Insulation tester",
        "Continuity tester"
      ],
      correctAnswer: 1,
      explanation: "Polarity testers or plug-in socket testers can quickly verify correct polarity and supply presence at socket outlets."
    },
    {
      id: 9,
      question: "What function must you confirm in motor circuits?",
      options: [
        "Only the motor runs",
        "Start and stop controls, and overload reset operation",
        "Just the electrical supply",
        "Only the speed"
      ],
      correctAnswer: 1,
      explanation: "Motor circuits require testing of start/stop controls, overload protection operation, and correct reset functionality for safety."
    },
    {
      id: 10,
      question: "What's the final step after functional testing?",
      options: [
        "Leave everything on",
        "Leave installation in a safe state",
        "Remove all fuses",
        "Turn off main supply"
      ],
      correctAnswer: 1,
      explanation: "After functional testing, the installation must be left in a safe state with all systems operating normally and safely."
    }
  ];

  return (
    <AM2SectionLayout
      backHref=".."
      breadcrumbs={["AM2", "Module 4", "Section 4"]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Zap}
        title="Functional and Operational Testing"
        description="After insulation resistance, continuity, Zs, and RCD tests, you must carry out functional and operational testing to confirm that the installation performs as intended."
        badge="Module 4 • Section 4"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning title="CRITICAL: Functional Testing is Mandatory">
        <p className="text-ios-callout text-white/80 mb-2">
          Assessors want to see you approach this like you would on-site: check, operate, and confirm every circuit behaves as designed. Skipping or rushing these checks is a common reason candidates lose marks.
        </p>
        <p className="text-ios-callout text-white/90 font-medium">
          Functional testing cannot be skipped even if all electrical tests pass. It proves real-world operation and safety.
        </p>
      </AM2CriticalWarning>

      {/* Learning Outcomes */}
      <AM2ContentCard accent>
        <AM2LearningOutcomes outcomes={learningOutcomes} />
      </AM2ContentCard>

      {/* What is Functional Testing */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          1. What is Functional Testing?
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <h4 className="text-ios-headline text-white font-semibold mb-2">Definition and Purpose:</h4>
          <p className="text-ios-callout text-white/80 mb-3">
            Functional testing confirms the installation operates as intended. It goes beyond electrical tests - checks real-world usability and operational safety.
          </p>
          <p className="text-ios-callout text-elec-yellow">
            <strong>Key Principle:</strong> Proving that circuits and equipment actually work correctly in practice, not just that they pass electrical measurements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">Functional Testing Covers:</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Correct operation of switches and accessories</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>RCD/RCBO operation and trip times</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Protective devices operating correctly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Functional operation of motors or specialist equipment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Polarity verification at outlets</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3">Why It's Essential:</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Confirms installation works as designed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Identifies wiring errors not found in electrical tests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Proves safety systems operate correctly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Demonstrates professional competence to assessor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Required for certification completion</span>
              </li>
            </ul>
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

      {/* Key Functional Tests in AM2 */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Play className="h-5 w-5" />
          2. Key Functional Tests in AM2
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-elec-yellow" />
                Lighting Circuits:
              </h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Operate switches (one-way, two-way, intermediate)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Confirm correct lamps switch on/off</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Test all switching combinations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Verify no cross-switching errors</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-400" />
                Power Circuits:
              </h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Test socket outlets (correct polarity, supply present)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Ring/radial continuity verified, now prove operational</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Cooker circuit: confirm supply at control unit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Switched spurs: test switching function</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2 flex items-center gap-2">
                <Settings className="h-4 w-4 text-orange-400" />
                Motor Circuits:
              </h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Confirm DOL starter operation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Test stop/start controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Verify overload protection resets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Check emergency stop functions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-400" />
                RCD/RCBO Testing:
              </h4>
              <ul className="text-ios-callout text-white/80 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Trip tests at x1 and x5 IΔn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Must trip within limits (ms)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Manual test button operation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Reset function verification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* RCD Testing Requirements */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-3">Detailed RCD Testing Requirements:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-ios-callout text-white font-semibold mb-2">Standard RCD (30mA):</p>
              <ul className="text-ios-callout text-white/80 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>1x test (30mA): Should trip but may take up to 300ms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>5x test (150mA): Must trip within 40ms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Manual test: Must operate and cut supply</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-ios-callout text-white font-semibold mb-2">Recording Requirements:</p>
              <ul className="text-ios-callout text-white/80 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Record actual trip times in milliseconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Note if RCD fails to trip within limits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Include manual test button operation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Common Candidate Errors */}
      <AM2CriticalWarning title="3. Common Candidate Errors (NET Guidance)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div>
            <h4 className="text-ios-headline text-white font-semibold mb-2">Testing Omissions:</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Not testing all lighting switching combinations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Forgetting to function-test sockets after electrical tests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Not carrying out both x1 and x5 IΔn RCD tests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Failing to test motor start/stop controls</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-ios-headline text-white font-semibold mb-2">Recording and Procedure Errors:</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Recording RCD trip times incorrectly or in wrong units</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Rushing through tests without systematic approach</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Not explaining procedures to assessor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Leaving installation in unsafe state after testing</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2CriticalWarning>

      <InlineCheck
        id={quickCheckQuestions[1].id}
        question={quickCheckQuestions[1].question}
        options={quickCheckQuestions[1].options}
        correctIndex={quickCheckQuestions[1].correctIndex}
        explanation={quickCheckQuestions[1].explanation}
      />

      {/* Assessor Expectations */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          4. Assessor Expectations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400" />
              Professional Approach:
            </h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Operate switches and devices methodically, not randomly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Talk through what you are testing and why</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Use correct instruments for RCD/functional testing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Demonstrate understanding of each test purpose</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-elec-yellow" />
              Technical Requirements:
            </h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Record results in correct units (ms for RCDs)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Leave installation in a safe state after functional tests</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Complete all required test combinations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Verify results against BS 7671 requirements</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h4 className="text-ios-headline text-white font-semibold mb-3">What Assessors Specifically Look For:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-ios-callout text-elec-yellow font-semibold mb-2">Systematic Testing:</p>
              <ul className="text-ios-callout text-white/80 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Logical sequence of testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Complete coverage of all circuits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Proper use of test equipment</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-ios-callout text-elec-yellow font-semibold mb-2">Professional Communication:</p>
              <ul className="text-ios-callout text-white/80 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Clear explanation of each test</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Identification of any issues found</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Demonstration of problem-solving skills</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Practical Guidance */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          5. Comprehensive Practical Guidance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Lighting Circuit Testing:</h4>
              <ul className="text-ios-callout text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Always test every switching combination - don't assume</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Check one-way, two-way, and intermediate switches</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Verify correct lamp control from all switch positions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Socket Testing:</h4>
              <ul className="text-ios-callout text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Use polarity tester or plug-in tester</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Confirm supply present and correct polarity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Test all sockets on ring/radial circuits</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">RCD Testing Procedure:</h4>
              <ul className="text-ios-callout text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Test at x1 and x5 IΔn with appropriate RCD tester</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Press manual test button operation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>Record trip times accurately in milliseconds</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white font-semibold mb-2">Motor Circuit Testing:</h4>
              <ul className="text-ios-callout text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Check start and stop controls operate correctly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Confirm overloads reset correctly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Verify emergency stop functions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-3">Time Management and Professional Tips:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-ios-callout text-white font-semibold mb-2">Efficient Testing:</p>
              <ul className="text-ios-callout text-white/80 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Work steadily - rushing causes missed checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Follow a systematic sequence for each circuit type</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Record results immediately - don't rely on memory</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-ios-callout text-white font-semibold mb-2">Professional Approach:</p>
              <ul className="text-ios-callout text-white/80 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Explain each test to the assessor as you proceed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Handle all equipment with confidence and care</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Leave installation safe and operational</span>
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
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Real-World Examples
        </h2>

        <div className="space-y-3">
          <div className="border-l-4 border-l-red-500 bg-red-500/10 rounded-r-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2">Example 1: Incomplete Switch Testing</h4>
            <p className="text-ios-callout text-white/80 mb-2">
              Candidate did full electrical tests but didn't test two-way switching. Assessor flagged incomplete - <strong className="text-red-400">lost marks</strong>
            </p>
            <p className="text-ios-footnote text-elec-yellow">
              Lesson: Every switching combination must be tested. Missing any combination could hide wiring errors.
            </p>
          </div>

          <div className="border-l-4 border-l-red-500 bg-red-500/10 rounded-r-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2">Example 2: Incomplete RCD Testing</h4>
            <p className="text-ios-callout text-white/80 mb-2">
              Candidate only did RCD x1 trip test, forgot x5. Incomplete - <strong className="text-red-400">lost marks</strong>
            </p>
            <p className="text-ios-footnote text-elec-yellow">
              Lesson: Both x1 and x5 IΔn tests are mandatory. Incomplete testing = incomplete certification.
            </p>
          </div>

          <div className="border-l-4 border-l-emerald-500 bg-emerald-500/10 rounded-r-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2">Example 3: Professional Excellence</h4>
            <p className="text-ios-callout text-white/80 mb-2">
              Candidate tested all lighting switching combinations, RCDs, sockets, and motor circuit methodically. <strong className="text-emerald-400">Full marks</strong>
            </p>
            <p className="text-ios-footnote text-emerald-400">
              Lesson: Systematic, complete testing with clear communication demonstrates professional competence.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Advanced Functional Testing Techniques */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Advanced Functional Testing Techniques
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2">Troubleshooting Failed Tests:</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>RCD fails to trip: Check test equipment, verify connections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Switch doesn't control lamp: Verify switching wiring</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Motor won't start: Check control circuit, overloads</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Socket tester shows fault: Investigate wiring errors</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white font-semibold mb-2">Professional Documentation:</h4>
            <ul className="text-ios-callout text-white/80 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Record actual test results, not expected values</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Note any deviations or failures clearly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Include environmental conditions if relevant</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Sign and date all functional test records</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Industry Best Practices:</h4>
          <p className="text-ios-callout text-white/80">
            Professional electricians use functional testing to verify that installations will operate safely and reliably
            in service. This testing phase often reveals issues that purely electrical tests miss, making it essential
            for both AM2 success and real-world competence.
          </p>
        </div>
      </AM2ContentCard>

      {/* Section Summary */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Section Summary
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <h4 className="text-ios-headline text-white font-semibold mb-3">Key Takeaways:</h4>
          <ul className="text-ios-callout text-white/80 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Functional and operational testing proves that circuits and devices actually work</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Test all switching combinations, RCDs at x1 and x5 IΔn, and motor controls</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Record results accurately in correct units (ms for RCD trip times)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Leave installation in safe operational state after testing</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Skipping functional tests is an easy way to lose marks</span>
            </li>
          </ul>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Next Steps:</h4>
          <p className="text-ios-callout text-white/80">
            You have now completed essential testing procedures. The next section will cover identifying and reporting non-compliances.
          </p>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz questions={quizQuestions} title="Functional and Operational Testing" />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        prevHref="../section3"
        prevLabel="Recording Test Results"
        nextHref="../section5"
        nextLabel="Non-Compliances"
        currentSection={4}
        totalSections={6}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module4Section4;
