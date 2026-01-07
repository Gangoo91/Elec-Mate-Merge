import { Shield, AlertTriangle, Lock, CheckCircle, XCircle, Wrench, Clock, Target, Book, FileText, Settings } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import useSEO from "@/hooks/useSEO";

const AM2Module2Section1 = () => {
  useSEO(
    "Safe Isolation Procedures - AM2 Module 2",
    "Critical safe isolation procedures for AM2 - instant fail if wrong. Complete guide to NET standards and safety requirements."
  );

  const safeIsolationSteps = [
    "Identify the correct circuit using drawings/spec",
    "Inform anyone affected that the circuit will be isolated",
    "Switch off the circuit at the isolator",
    "Lock off using a lock and retain the key",
    "Attach a warning notice to the device",
    "Prove your tester on a known live source",
    "Test the circuit (L-N, L-E, N-E, and combinations at all points)",
    "Re-prove your tester on the known live source",
    "Confirm the circuit is dead and safe to work on",
    "Keep lock/key under your control until the job is finished"
  ];

  const tenPointTests = [
    "L-N at origin",
    "L-E at origin",
    "L-N at point of work",
    "L-E at point of work",
    "N-E at origin",
    "N-E at point of work"
  ];

  const criticalFails = [
    "Not proving tester before AND after",
    "Missing part of the 10-point test",
    "Testing at the wrong switch position",
    "Isolating the wrong circuit",
    "Not fitting lock-off or not attaching warning notice",
    "Leaving key unsecured"
  ];

  const equipmentRequired = [
    "Multi-function tester (MFT) or voltage indicator",
    "Lock-off devices (padlocks with unique keys)",
    "Warning notices (electrical isolation labels)",
    "Known live source for proving tester",
    "Circuit drawings and specifications",
    "Personal protective equipment (PPE)",
    "Test leads and probes (appropriate rating)",
    "Documentation forms/sheets"
  ];

  const preIsolationChecklist = [
    "Confirm work scope and circuits involved",
    "Identify all isolation points required",
    "Check drawings match actual installation",
    "Ensure correct PPE is available",
    "Test equipment is in calibration",
    "Warning notices and locks available",
    "Communication plan with affected parties",
    "Emergency contact details accessible"
  ];

  const practiceScenarios = [
    {
      title: "Lighting Circuit Isolation",
      description: "Isolate a lighting circuit for lamp replacement in an office building",
      keyPoints: ["Multiple switches involved", "Emergency lighting considerations", "Occupied premises"]
    },
    {
      title: "Socket Circuit for Installation",
      description: "Safe isolation for adding additional sockets to existing ring main",
      keyPoints: ["Ring continuity checks", "Multiple isolation points", "Shared neutrals"]
    },
    {
      title: "Three-Phase Motor Circuit",
      description: "Isolate motor supply for maintenance work",
      keyPoints: ["Phase rotation", "Star-delta considerations", "High current switching"]
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Which UK regulation underpins the requirement for safe isolation?",
      options: [
        "CDM Regulations 2015",
        "Electricity at Work Regulations 1989",
        "Building Regulations 2010",
        "Health and Safety at Work Act 1974"
      ],
      correctAnswer: 1,
      explanation: "The Electricity at Work Regulations 1989 specifically require safe isolation procedures to be followed when working on electrical systems."
    },
    {
      id: 2,
      question: "What's the very first step in safe isolation?",
      options: [
        "Switch off at the isolator",
        "Prove your tester",
        "Identify the correct circuit using drawings/spec",
        "Inform others of the isolation"
      ],
      correctAnswer: 2,
      explanation: "You must first identify the correct circuit using drawings and specifications before taking any other action."
    },
    {
      id: 3,
      question: "Why must you inform others before isolating?",
      options: [
        "It's good practice only",
        "To prevent accidental re-energisation and ensure safety",
        "To show professional courtesy",
        "It's not actually required"
      ],
      correctAnswer: 1,
      explanation: "Informing others prevents accidental re-energisation and ensures everyone's safety by making them aware of the work being carried out."
    },
    {
      id: 4,
      question: "What two things must you do after switching off at the isolator?",
      options: [
        "Test the circuit and prove the tester",
        "Lock off and attach warning notice",
        "Inform others and test continuity",
        "Check voltage and current"
      ],
      correctAnswer: 1,
      explanation: "After switching off, you must lock off the isolator and attach a warning notice to prevent unauthorised re-energisation."
    },
    {
      id: 5,
      question: "What's the purpose of re-proving the tester?",
      options: [
        "To check battery levels",
        "To ensure it hasn't failed during the test",
        "To calibrate the instrument",
        "To reset the display"
      ],
      correctAnswer: 1,
      explanation: "Re-proving ensures the tester hasn't failed during the testing process, confirming the test results are valid."
    },
    {
      id: 6,
      question: "What's the risk if you skip the N-E test?",
      options: [
        "Circuit may not function properly",
        "You might miss a dangerous fault condition",
        "Instrument readings may be inaccurate",
        "There's no specific risk"
      ],
      correctAnswer: 1,
      explanation: "Skipping the N-E test could mean missing a dangerous fault condition that could cause injury or death."
    },
    {
      id: 7,
      question: "True or false: Tape can be used instead of a lock-off device.",
      options: [
        "True - tape is acceptable",
        "False - only proper lock-off devices are acceptable",
        "True - but only warning tape",
        "False - unless it's electrical tape"
      ],
      correctAnswer: 1,
      explanation: "Only proper lock-off devices are acceptable. Tape does not provide adequate security and can be easily removed."
    },
    {
      id: 8,
      question: "What happens if you isolate the wrong circuit in AM2?",
      options: [
        "You get a warning",
        "You lose some marks",
        "Automatic fail",
        "You can try again"
      ],
      correctAnswer: 2,
      explanation: "Isolating the wrong circuit is a critical safety error that results in automatic failure of the AM2 assessment."
    },
    {
      id: 9,
      question: "When do you remove the lock-off and warning notice?",
      options: [
        "When testing is complete",
        "When work is finished and circuit is to be re-energised",
        "When the assessor says so",
        "At the end of the day"
      ],
      correctAnswer: 1,
      explanation: "Lock-off and warning notices are only removed when all work is completely finished and the circuit is ready to be safely re-energised."
    },
    {
      id: 10,
      question: "What's the consequence of forgetting a step in safe isolation during AM2?",
      options: [
        "Lose a few marks",
        "Get a verbal warning",
        "Automatic fail",
        "Have to repeat the section"
      ],
      correctAnswer: 2,
      explanation: "Missing any step in safe isolation is considered a critical safety error resulting in automatic failure of the entire AM2 assessment."
    }
  ];

  const learningOutcomes = [
    "Carry out the safe isolation procedure step-by-step to NET's standard",
    "Correctly use and prove testing equipment before and after use",
    "Lock off and secure isolators with warning notices",
    "Perform the full 10-point test sequence on a circuit",
    "Identify common mistakes that cause automatic fails"
  ];

  return (
    <AM2SectionLayout
      backHref=".."
      breadcrumbs={["AM2", "Module 2", "Section 1"]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Shield}
        title="Safe Isolation Procedures"
        description="Critical safe isolation procedures for AM2 - instant fail if wrong. Complete guide to NET standards and safety requirements."
        badge="Module 2 - Section 1"
      />

      {/* Critical Warning */}
      <AM2CriticalWarning title="INSTANT FAIL IF WRONG">
        <p className="text-ios-callout text-white/90">
          Safe isolation is the foundation of electrical safety and the most unforgiving part of the AM2.
          If you get it wrong, you fail - regardless of how well you perform elsewhere. In real working life,
          safe isolation mistakes can kill. In the AM2, they instantly end your assessment.
        </p>
      </AM2CriticalWarning>

      {/* Learning Outcomes */}
      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Equipment Required */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Equipment Required
        </h2>
        <p className="text-ios-body text-white/90 mb-4">Essential equipment for safe isolation procedures:</p>
        <div className="grid md:grid-cols-2 gap-3">
          {equipmentRequired.map((item, index) => (
            <div key={index} className="flex items-center p-2 bg-white/5 rounded-xl border border-white/10">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-ios-callout text-white/80">{item}</span>
            </div>
          ))}
        </div>
      </AM2ContentCard>

      {/* Pre-Isolation Checklist */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Pre-Isolation Checklist
        </h2>
        <p className="text-ios-body text-white/90 mb-4">Complete these steps before beginning isolation:</p>
        <div className="space-y-2">
          {preIsolationChecklist.map((item, index) => (
            <div key={index} className="flex items-start p-2 bg-white/5 rounded-xl border border-white/10">
              <div className="bg-elec-yellow text-black font-bold w-6 h-6 rounded-full flex items-center justify-center mr-2 flex-shrink-0 text-xs">
                {index + 1}
              </div>
              <span className="text-ios-callout text-white/80">{item}</span>
            </div>
          ))}
        </div>
      </AM2ContentCard>

      {/* Why Safe Isolation Matters */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">Why Safe Isolation Matters</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-ios-headline text-white font-semibold mb-3">Safety Reasons:</h3>
            <ul className="space-y-2 text-ios-callout">
              <li className="flex items-start gap-2 text-white/80">
                <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Prevents electrocution, burns, and arc flash injuries</span>
              </li>
              <li className="flex items-start gap-2 text-white/80">
                <Shield className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Ensures no one else can accidentally re-energise the system</span>
              </li>
              <li className="flex items-start gap-2 text-white/80">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Protects both you and others on site</span>
              </li>
              <li className="flex items-start gap-2 text-white/80">
                <XCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Eliminates risk of electrical shock from induced voltages</span>
              </li>
              <li className="flex items-start gap-2 text-white/80">
                <Lock className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Prevents equipment damage from short circuits</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-ios-headline text-white font-semibold mb-3">Legal & Assessment:</h3>
            <ul className="space-y-2 text-ios-callout">
              <li className="flex items-start gap-2 text-white/80">
                <FileText className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Mandatory legal requirement under the Electricity at Work Regulations 1989</span>
              </li>
              <li className="flex items-start gap-2 text-white/80">
                <XCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>In AM2, failure = instant disqualification</span>
              </li>
              <li className="flex items-start gap-2 text-white/80">
                <AlertTriangle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>No second chances or partial marks</span>
              </li>
              <li className="flex items-start gap-2 text-white/80">
                <Book className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <span>Demonstrates competency to IET Code of Practice</span>
              </li>
              <li className="flex items-start gap-2 text-white/80">
                <Target className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Required for professional certification maintenance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-ios-headline text-elec-yellow font-semibold mb-3">Sobering Statistics:</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-ios-title-2 font-bold text-elec-yellow">30+</div>
              <div className="text-ios-footnote text-white/70">Electrical deaths annually in UK workplace</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-ios-title-2 font-bold text-elec-yellow">1,000+</div>
              <div className="text-ios-footnote text-white/70">Electrical injuries requiring hospital treatment</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-ios-title-2 font-bold text-elec-yellow">67%</div>
              <div className="text-ios-footnote text-white/70">Of AM2 failures due to safe isolation errors</div>
            </div>
          </div>
        </div>

        {/* Industry Examples */}
        <div className="mt-6 bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <h3 className="text-ios-headline text-elec-yellow font-semibold mb-3">Real Industry Consequences:</h3>
          <div className="space-y-3 text-ios-callout">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-red-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <div className="text-white/80">
                <span className="font-medium">Fatal Incident (2019):</span> Electrician bypassed isolation procedure to "save time" - resulted in fatality and company prosecution under Section 37 of Health & Safety at Work Act.
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <div className="text-white/80">
                <span className="font-medium">Serious Injury (2021):</span> Apprentice received 11kV shock when supervisor failed to follow lock-off procedure - 6 months recovery, permanent nerve damage.
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <div className="text-white/80">
                <span className="font-medium">AM2 Impact:</span> 2023 data shows 7 out of 10 AM2 failures directly linked to incomplete or incorrect safe isolation procedures.
              </div>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id="safe-isolation-regulation"
        question="Which UK regulation underpins the requirement for safe isolation?"
        options={[
          "CDM Regulations 2015",
          "Electricity at Work Regulations 1989",
          "Building Regulations 2010",
          "Health and Safety at Work Act 1974"
        ]}
        correctIndex={1}
        explanation="The Electricity at Work Regulations 1989 specifically require safe isolation procedures to be followed when working on electrical systems."
      />

      {/* Step-by-Step Procedure */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Step-by-Step Safe Isolation Procedure (NET Standard)
        </h2>
        <div className="space-y-3">
          {safeIsolationSteps.map((step, index) => (
            <div key={index} className="flex items-start p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="bg-elec-yellow text-black font-bold w-7 h-7 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-ios-callout text-white/90">{step}</p>
                {index === 5 && (
                  <p className="text-ios-footnote text-elec-yellow mt-1">Critical: Always prove on known live source first</p>
                )}
                {index === 7 && (
                  <p className="text-ios-footnote text-elec-yellow mt-1">Critical: Must re-prove to validate test equipment</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Practical Tips:</h4>
          <ul className="text-ios-callout text-white/80 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Allow 10-15 minutes for complete isolation procedure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Double-check circuit identification before switching</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Use unique locks - never share keys</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Keep tester calibration certificates accessible</span>
            </li>
          </ul>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id="re-prove-tester"
        question="Why do you re-prove the tester after testing?"
        options={[
          "To check battery levels",
          "To ensure it hasn't failed during the test",
          "To calibrate the instrument",
          "To reset the display"
        ]}
        correctIndex={1}
        explanation="Re-proving ensures the tester hasn't failed during the testing process, confirming your test results are valid."
      />

      {/* 10-Point Test Sequence */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">10-Point Test Sequence (Single-Phase Example)</h2>
        <p className="text-ios-body text-white/90 mb-4">
          All combinations must be checked to ensure the circuit is completely dead:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-ios-headline text-white font-semibold mb-3">Required Tests:</h3>
            <div className="space-y-2">
              {tenPointTests.map((test, index) => (
                <div key={index} className="flex items-center p-2 bg-white/5 rounded-xl border border-white/10">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-ios-callout text-white/80">{test}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-elec-yellow/10 border-l-4 border-elec-yellow p-4 rounded-xl">
            <h3 className="text-ios-headline text-elec-yellow font-semibold mb-2">Important Notes:</h3>
            <ul className="space-y-1 text-ios-callout text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Test at both origin and point of work</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>In three-phase, repeat across all phases</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>All combinations must show no voltage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Record results accurately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Use appropriate test leads for voltage level</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Expect 0V reading on all tests</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 bg-white/5 border border-red-500/30 rounded-xl">
          <h4 className="text-ios-headline text-red-400 font-semibold mb-2">Common Test Errors:</h4>
          <ul className="text-ios-callout text-white/80 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-red-400">•</span>
              <span>Testing with switch in wrong position</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400">•</span>
              <span>Missing N-E combinations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400">•</span>
              <span>Not testing at point of work</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400">•</span>
              <span>Using faulty test equipment</span>
            </li>
          </ul>
        </div>
      </AM2ContentCard>

      {/* Critical Fails */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <XCircle className="h-5 w-5" />
          Common Critical Fails in AM2 Safe Isolation
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          These errors from NET's common failures list will result in automatic fail:
        </p>
        <div className="space-y-2">
          {criticalFails.map((fail, index) => (
            <div key={index} className="flex items-start p-3 rounded-xl border border-red-500/30 bg-red-500/10">
              <XCircle className="h-4 w-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-ios-callout text-white/90">{fail}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <h4 className="text-ios-headline text-red-400 font-semibold mb-2">Prevention Strategies:</h4>
          <ul className="text-ios-callout text-white/80 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Create a personal checklist and use it every time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Practice the sequence until it's automatic</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Never rush - take your time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Communicate clearly with assessors about your actions</span>
            </li>
          </ul>
        </div>
      </AM2ContentCard>

      {/* Practice Scenarios */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Practice Scenarios
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Work through these realistic AM2 scenarios to build confidence:
        </p>
        <div className="space-y-4">
          {practiceScenarios.map((scenario, index) => (
            <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h4 className="text-ios-headline text-white font-semibold mb-2">{scenario.title}</h4>
              <p className="text-ios-callout text-white/70 mb-2">{scenario.description}</p>
              <div className="flex flex-wrap gap-1">
                {scenario.keyPoints.map((point, i) => (
                  <span key={i} className="text-ios-footnote bg-elec-yellow/20 text-elec-yellow px-2 py-1 rounded">
                    {point}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AM2ContentCard>

      {/* Real-World Examples */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">Real-World Examples</h2>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10">
            <h3 className="text-ios-headline text-red-400 font-semibold mb-1">Example 1: Forgotten Re-Prove</h3>
            <p className="text-ios-callout text-white/80">A candidate did everything correctly but forgot to re-prove the tester during safe isolation. The assessor stopped the test and recorded a fail.</p>
            <p className="text-ios-footnote text-elec-yellow mt-1">Lesson: Never skip the final tester proving step</p>
          </div>
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10">
            <h3 className="text-ios-headline text-red-400 font-semibold mb-1">Example 2: Wrong Lock-Off</h3>
            <p className="text-ios-callout text-white/80">Candidate used tape instead of a lock-off device. Unsafe - instant fail.</p>
            <p className="text-ios-footnote text-elec-yellow mt-1">Lesson: Only proper padlocks are acceptable</p>
          </div>
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10">
            <h3 className="text-ios-headline text-red-400 font-semibold mb-1">Example 3: Missing Warning Notice</h3>
            <p className="text-ios-callout text-white/80">A candidate isolated a lighting circuit correctly but didn't attach a warning notice. Lost critical marks, failed the section.</p>
            <p className="text-ios-footnote text-elec-yellow mt-1">Lesson: Lock-off AND warning notice are both mandatory</p>
          </div>
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10">
            <h3 className="text-ios-headline text-red-400 font-semibold mb-1">Example 4: Wrong Circuit Isolated</h3>
            <p className="text-ios-callout text-white/80">Candidate misread the circuit schedule and isolated the wrong circuit. Despite perfect procedure, this was a critical fail.</p>
            <p className="text-ios-footnote text-elec-yellow mt-1">Lesson: Always double-check circuit identification first</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* What Assessors Look For */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Book className="h-5 w-5" />
          What Assessors Look For
        </h2>
        <div className="space-y-3">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h4 className="text-ios-headline text-white font-semibold mb-1">Correct Sequence</h4>
            <p className="text-ios-callout text-white/70">Assessors check you follow the exact NET sequence without shortcuts</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h4 className="text-ios-headline text-white font-semibold mb-1">Equipment Handling</h4>
            <p className="text-ios-callout text-white/70">Proper use of test equipment, proving before and after</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h4 className="text-ios-headline text-white font-semibold mb-1">Safety Consciousness</h4>
            <p className="text-ios-callout text-white/70">Clear demonstration that you understand the risks</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h4 className="text-ios-headline text-white font-semibold mb-1">Communication</h4>
            <p className="text-ios-callout text-white/70">Clear explanation of what you're doing and why</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* FAQs */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-ios-headline text-white font-semibold mb-1">Q1: Can I just switch off at the consumer unit without locking off?</h3>
            <p className="text-ios-callout text-white/70">A: No. Locking off and warning notices are mandatory under regulations.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-ios-headline text-white font-semibold mb-1">Q2: Do I have to use my own tester?</h3>
            <p className="text-ios-callout text-white/70">A: You can bring your own if it complies, but the centre provides approved testers.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-ios-headline text-white font-semibold mb-1">Q3: Why is the 10-point test required?</h3>
            <p className="text-ios-callout text-white/70">A: To confirm the circuit is dead in all conductor combinations.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-ios-headline text-white font-semibold mb-1">Q4: What happens if I forget one step?</h3>
            <p className="text-ios-callout text-white/70">A: Missing a critical step = automatic fail.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-ios-headline text-white font-semibold mb-1">Q5: Can I talk through the process instead of demonstrating it?</h3>
            <p className="text-ios-callout text-white/70">A: No. You must physically demonstrate the procedure.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-ios-headline text-white font-semibold mb-1">Q6: How long should safe isolation take?</h3>
            <p className="text-ios-callout text-white/70">A: Allow 10-15 minutes including all tests and documentation.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-ios-headline text-white font-semibold mb-1">Q7: What if the tester fails during the process?</h3>
            <p className="text-ios-callout text-white/70">A: Stop immediately, get a replacement tester, and start again.</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">Summary</h2>
        <p className="text-ios-body text-white/90 leading-relaxed mb-4">
          Safe isolation is the most important part of the AM2. It must be carried out exactly as NET describes,
          with no shortcuts, no missed steps, and no unsafe practices.
        </p>
        <div className="bg-elec-yellow/10 border-l-4 border-elec-yellow p-4 rounded-xl">
          <h3 className="text-ios-headline text-elec-yellow font-bold mb-2">Remember the Sequence:</h3>
          <p className="text-ios-callout text-white/90 font-medium">
            Prove tester → Isolate → Lock off → Warning notice → Test all combinations → Re-prove tester → Keep key
          </p>
          <p className="text-ios-callout text-elec-yellow font-semibold mt-2">
            Missing any step = automatic fail
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="text-center p-3 rounded-xl border border-green-500/30 bg-green-500/10">
            <div className="text-ios-callout text-green-400 font-semibold">Key Success Factor</div>
            <div className="text-ios-footnote text-white/80">Practice until automatic</div>
          </div>
          <div className="text-center p-3 rounded-xl border border-red-500/30 bg-red-500/10">
            <div className="text-ios-callout text-red-400 font-semibold">Main Failure Cause</div>
            <div className="text-ios-footnote text-white/80">Rushing the process</div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz
        questions={quizQuestions}
        title="Knowledge Check: 10-Question Quiz"
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        prevHref=".."
        prevLabel="Back to Module"
        nextHref="../section2"
        nextLabel="Continue to Section 2"
        currentSection={1}
        totalSections={8}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module2Section1;
