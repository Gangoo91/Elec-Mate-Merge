import { CheckCircle, Shield, Target, Award, BookOpen, AlertTriangle, Eye, FileCheck, XCircle, Wrench, Timer } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import useSEO from "@/hooks/useSEO";

const AM2Module1Section4 = () => {
  useSEO(
    "Section 4: Common Reasons for Failure - AM2 Preparation",
    "Understanding the main reasons candidates fail the AM2 assessment and how to avoid these critical mistakes"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What's the most common single reason for AM2 failure?",
      options: [
        "Poor workmanship",
        "Safe isolation errors",
        "Time management issues",
        "Wrong cable selection"
      ],
      correctAnswer: 1,
      explanation: "Safe isolation errors are highlighted by NET as the single biggest cause of AM2 failure."
    },
    {
      id: 2,
      question: "What's the final step in safe isolation?",
      options: [
        "Lock off the circuit",
        "Attach warning notices",
        "Re-prove your tester",
        "Test the isolated circuit"
      ],
      correctAnswer: 2,
      explanation: "Re-proving your tester after isolation confirms it still works and completes the safe isolation procedure."
    },
    {
      id: 3,
      question: "True or false: If your installation works but doesn't match the drawing, you still pass.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Deviations from specifications lose marks even if the circuit functions correctly."
    },
    {
      id: 4,
      question: "Which IET document defines the testing sequence used in AM2?",
      options: [
        "BS 7671 Wiring Regulations",
        "GN3 Guidance Note 3",
        "GN1 Guidance Note 1",
        "IET Code of Practice"
      ],
      correctAnswer: 1,
      explanation: "IET Guidance Note 3 (GN3) sets out the correct testing sequence used in the AM2 assessment."
    },
    {
      id: 5,
      question: "In fault diagnosis, what three things must you identify for each fault?",
      options: [
        "Location, type, and rectification method",
        "Circuit, voltage, and current",
        "Cause, effect, and prevention",
        "Test, measure, and record"
      ],
      correctAnswer: 0,
      explanation: "You must identify the precise location, type of fault, and how to rectify it for full marks."
    }
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module1"
      breadcrumbs={["AM2", "Module 1", "Section 4"]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={XCircle}
        title="Common Reasons for Failure"
        description="Learn from others' mistakes - understanding why candidates fail helps you avoid the same traps."
        badge="Module 1 - Section 4"
      />

      {/* Key Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <AM2ContentCard className="text-center">
          <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">#1</div>
          <div className="text-ios-footnote text-white/70">Safe isolation errors</div>
        </AM2ContentCard>
        <AM2ContentCard className="text-center">
          <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">7</div>
          <div className="text-ios-footnote text-white/70">Main failure categories</div>
        </AM2ContentCard>
        <AM2ContentCard className="text-center">
          <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">100%</div>
          <div className="text-ios-footnote text-white/70">Avoidable failures</div>
        </AM2ContentCard>
        <AM2ContentCard className="text-center">
          <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">NET</div>
          <div className="text-ios-footnote text-white/70">Publishes error data</div>
        </AM2ContentCard>
      </div>

      {/* Learning Outcomes */}
      <AM2ContentCard accent>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Target className="h-5 w-5" />
          Learning Outcomes
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          By the end of this section, you should be able to:
        </p>
        <ul className="space-y-2 text-ios-body text-white/80">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>Identify the main reasons candidates fail the AM2</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>Recognise which errors are safety-critical and lead to automatic fails</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>Apply strategies to avoid falling into common traps</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>Self-check your readiness using NET's published common error guidance</span>
          </li>
        </ul>
      </AM2ContentCard>

      {/* Introduction */}
      <AM2ContentCard>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
          <p className="text-ios-footnote text-amber-400 font-semibold mb-1">Important Reality:</p>
          <p className="text-ios-callout text-white/80">
            Every year, candidates fail the AM2 for the same reasons. NET publishes "Common Errors" in its Pre-Assessment Manual,
            and training centres confirm the same patterns. These aren't just minor mistakes - they are avoidable errors that can
            cost you marks, time, and even result in an automatic fail.
          </p>
        </div>
        <p className="text-ios-body text-white/90">
          This section gives you a clear view of the top reasons candidates fail, why they happen, and how to avoid them.
          Learning from others' mistakes is one of the most effective ways to ensure your own success.
        </p>
      </AM2ContentCard>

      {/* 1. Safe Isolation Mistakes */}
      <AM2CriticalWarning title="1. Safe Isolation Mistakes (The #1 Fail Point)">
        <p className="text-ios-body text-white/80 mb-4">
          NET highlights safe isolation errors as the single biggest cause of failure. These are critical safety issues that result in automatic fails.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Common Isolation Errors:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Not proving test equipment before and after use</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Missing the full 10-point test sequence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Isolating the wrong circuit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Not fitting warning notices or securing keys</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Why These Happen:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Nervousness causing procedural lapses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Over-confidence skipping steps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Poor practice habits from training</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Misunderstanding GS38 requirements</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2CriticalWarning>

      <InlineCheck
        id="isolation-final-step"
        question="What's the final step in safe isolation before starting work?"
        options={[
          "Lock off the circuit breaker",
          "Attach warning notice",
          "Re-prove your tester to confirm it still works",
          "Test the circuit is dead"
        ]}
        correctIndex={2}
        explanation="Re-proving your tester confirms it still works after proving dead, completing the safe isolation procedure."
      />

      {/* 2. Specification Failures */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <FileCheck className="h-5 w-5" />
          2. Not Following the Specification
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Even small deviations from the specification can cost significant marks. Assessors check installations against drawings precisely:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-amber-400 font-semibold mb-2">Common Spec Errors:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Using wrong cable size or type</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Installing accessories at wrong heights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Poor identification of conductors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Incorrect cable routing methods</span>
              </li>
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 font-semibold mb-2">Prevention Strategies:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Read drawings carefully before starting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Double-check cable schedules</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Measure and mark positions accurately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Follow routing exactly as shown</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id="specification-deviation"
        question="If the drawing shows sockets at 300mm height and you install them at 400mm, will you lose marks?"
        options={[
          "No, if they still work properly",
          "Yes, deviations from spec lose marks even if the circuit works",
          "Only if the assessor notices",
          "No, close enough is acceptable"
        ]}
        correctIndex={1}
        explanation="Yes - deviations from specifications lose marks even if the circuit works. Precision is essential in following drawings."
      />

      {/* 3. Testing & Certification Errors */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          3. Inspection, Testing & Certification Errors
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          NET emphasises mistakes in this area as a major failure cause. Testing must follow exact procedures:
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
          <h4 className="text-ios-headline text-elec-yellow font-semibold mb-3">Major Testing Failures:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-ios-callout text-white font-medium mb-2">Procedural Errors:</p>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Incorrect instrument setup or range selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Skipping stages in the GN3 sequence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Wrong test lead connections</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-ios-callout text-white font-medium mb-2">Recording Errors:</p>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Recording results inaccurately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Writing "book answers" instead of measured values</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span>Completing certificates incorrectly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-green-400 font-semibold mb-2">How to Avoid Testing Failures:</h4>
          <ul className="text-ios-callout text-white/70 space-y-1">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Memorise the GN3 testing sequence completely</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Practice with the exact instruments you'll use</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Always record actual measured values</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow">•</span>
              <span>Double-check certificate entries for accuracy</span>
            </li>
          </ul>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id="testing-sequence"
        question="Which document sets out the correct test sequence for AM2?"
        options={[
          "BS 7671 Wiring Regulations",
          "IET Guidance Note 3 (GN3)",
          "NET Assessment Manual",
          "City & Guilds Guidelines"
        ]}
        correctIndex={1}
        explanation="IET Guidance Note 3 (GN3) provides the step-by-step testing sequence that must be followed in the AM2."
      />

      {/* 4. Fault Diagnosis Mistakes */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          4. Fault Diagnosis Mistakes
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Fault finding requires precision in identification and clear explanation of rectification methods:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Common Fault-Finding Errors:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Vague fault location (e.g., "lighting circuit" instead of precise terminal)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Misstating the fault type</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Not stating rectification steps clearly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Skipping safe isolation before working on faulted circuit</span>
              </li>
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 font-semibold mb-2">Successful Fault Diagnosis:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Precise location identification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Accurate fault type classification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Clear rectification methodology</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Verification of repair effectiveness</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id="fault-diagnosis-requirements"
        question="If you identify a fault but don't explain how to rectify it, do you get full marks?"
        options={[
          "Yes, finding the fault is enough",
          "No, rectification method is part of the mark",
          "Only if you find all other faults",
          "Yes, if the location is precise"
        ]}
        correctIndex={1}
        explanation="No - you must identify the location, type, and rectification method for each fault to achieve full marks."
      />

      {/* 5. Health & Safety Breaches */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          5. Health & Safety Breaches
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Safety violations can result in automatic failure regardless of technical competence:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Critical Safety Errors:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Poor or incomplete risk assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Unsafe use of tools and equipment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Not wearing required PPE</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Leaving work area untidy or unsafe</span>
              </li>
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 font-semibold mb-2">Safety Best Practices:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Complete thorough risk assessments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Maintain PPE discipline throughout</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Keep work areas clean and organised</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Be aware of hazards to others</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* 6. Time Management Failures */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Timer className="h-5 w-5" />
          6. Time Management Failures
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Poor time management leads to rushed work, incomplete sections, or unsafe practices:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Time Traps:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Rushing the composite installation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Spending too long on one fault</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Leaving work incomplete</span>
              </li>
            </ul>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-amber-400 font-semibold mb-2">Warning Signs:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Skipping safety checks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Making careless mistakes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Incomplete testing</span>
              </li>
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 font-semibold mb-2">Solutions:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Plan time allocation carefully</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Practice under pressure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Never sacrifice safety for speed</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id="time-pressure-choice"
        question="If you're short of time, is it better to leave a section incomplete but safe, or rush it and risk unsafe work?"
        options={[
          "Rush it to complete everything",
          "Leave safe - unsafe work can cause failure",
          "Ask for extra time",
          "Skip to the next section"
        ]}
        correctIndex={1}
        explanation="Always prioritise safety. Leaving work incomplete but safe is better than rushing and creating unsafe conditions that could result in automatic failure."
      />

      {/* 7. Workmanship Issues */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Award className="h-5 w-5" />
          7. Neatness and Workmanship Issues
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Professional workmanship is assessed throughout the AM2. Poor standards can significantly impact your score:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Poor Workmanship Examples:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Over-stripped conductors with damaged insulation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Untidy trunking or conduit runs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Loose or poorly made terminations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Inconsistent quality across the installation</span>
              </li>
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 font-semibold mb-2">Professional Standards:</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Consistent cable runs and spacing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Proper conductor preparation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Secure, properly torqued terminations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Attention to detail throughout</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Real-world Failure Examples */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">Real-world Failure Examples</h2>
        <div className="space-y-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-1">Candidate A: Safe Isolation Fail</h4>
            <p className="text-ios-callout text-white/70">
              Installed circuits correctly and completed all sections well, but failed to re-prove the tester during safe isolation.
              Result: Automatic fail despite otherwise competent performance.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-1">Candidate B: Specification Deviation</h4>
            <p className="text-ios-callout text-white/70">
              Completed installation neatly and safely but used 2.5mm cable where 4mm was specified on the drawing.
              Lost significant marks for not following specifications exactly.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-1">Candidate C: Testing Procedure Error</h4>
            <p className="text-ios-callout text-white/70">
              Rushed through testing section and wrote down "perfect" textbook values instead of actual measurements.
              Assessor identified inconsistencies - marked as procedural fail.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">Summary</h2>
        <p className="text-ios-body text-white/90 mb-4">
          Candidates fail AM2 mainly due to seven key areas: unsafe isolation, not following specifications, incorrect testing
          and certification, poor fault diagnosis, health & safety breaches, time management issues, and workmanship below
          professional standards.
        </p>
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4">
          <p className="text-ios-footnote text-elec-yellow font-semibold mb-1">Key Takeaway:</p>
          <p className="text-ios-callout text-white/80">
            Avoiding these errors isn't about luck - it's about strict practice, sticking to procedures, and working to
            professional standards every time. Learn from others' mistakes to ensure your own success.
          </p>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz
        questions={quizQuestions}
        title="AM2 Common Failures Quiz"
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        prevHref="../section3"
        prevLabel="Marking Criteria"
        nextHref="../../module2"
        nextLabel="Module 2: Health & Safety"
        currentSection={4}
        totalSections={4}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module1Section4;
