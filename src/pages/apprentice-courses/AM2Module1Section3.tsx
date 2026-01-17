import { CheckCircle, Shield, Target, Award, TrendingUp, BookOpen, AlertTriangle, Scale, Eye, FileCheck, AlertCircle } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import useSEO from "@/hooks/useSEO";

const AM2Module1Section3 = () => {
  useSEO(
    "Section 3: Marking Criteria and Pass/Fail Thresholds - AM2 Preparation",
    "Understanding AM2 marking criteria, pass thresholds, critical fails, and assessment standards for electrical competence"
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What percentage is generally required to pass the AM2 overall?",
      options: ["70%", "75%", "80%", "85%"],
      correctAnswer: 2,
      explanation: "The AM2 generally requires around 80% overall, but you must also demonstrate competence in each main section."
    },
    {
      id: 2,
      question: "Which of these would result in an automatic fail?",
      options: [
        "Forgetting to label one circuit",
        "Missing one fault in fault-finding",
        "Unsafe isolation procedure",
        "Taking slightly longer than expected"
      ],
      correctAnswer: 2,
      explanation: "Unsafe isolation procedures are a critical fail regardless of performance in other areas."
    },
    {
      id: 3,
      question: "True or false: If you do excellent installation work but fail safe isolation, you can still pass.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Safe isolation is a critical requirement and failure in this area results in automatic fail regardless of other performance."
    },
    {
      id: 4,
      question: "In fault diagnosis, how many faults must you normally identify to pass?",
      options: [
        "All 4 faults",
        "At least 3 out of 4 faults",
        "At least 2 out of 4 faults",
        "Only 1 fault"
      ],
      correctAnswer: 1,
      explanation: "You typically need to identify at least 3 out of 4 faults to pass the fault diagnosis section."
    },
    {
      id: 5,
      question: "Why does the assessor use sampling in marking?",
      options: [
        "To save time during assessment",
        "To check consistency of quality across all work",
        "Because they can't check everything",
        "To make the assessment easier"
      ],
      correctAnswer: 1,
      explanation: "Assessors use sampling to verify that quality is consistent throughout your work, so every part must meet standards."
    }
  ];

  return (
    <AM2SectionLayout
      backHref="/study-centre/apprentice/am2/module1"
      breadcrumbs={["AM2", "Module 1", "Section 3"]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Scale}
        title="Marking Criteria and Pass/Fail Thresholds"
        description="Understanding how the AM2 is marked and what constitutes a pass or fail - your key to assessment success."
        badge="Module 1 - Section 3"
      />

      {/* Key Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <AM2ContentCard className="text-center">
          <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">80%</div>
          <div className="text-ios-footnote text-white/70">Overall pass threshold</div>
        </AM2ContentCard>
        <AM2ContentCard className="text-center">
          <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">5</div>
          <div className="text-ios-footnote text-white/70">Main assessment sections</div>
        </AM2ContentCard>
        <AM2ContentCard className="text-center">
          <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">100%</div>
          <div className="text-ios-footnote text-white/70">Safe isolation requirement</div>
        </AM2ContentCard>
        <AM2ContentCard className="text-center">
          <div className="text-ios-title-2 font-bold text-elec-yellow mb-1">Fixed</div>
          <div className="text-ios-footnote text-white/70">Standards-based marking</div>
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
            <span>Explain how the AM2 assessment is marked and what "competence-based" means</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>Identify the pass mark threshold and the importance of meeting standards across all sections</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>Recognise which mistakes are critical fails (automatic fails)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>Evaluate your own work against assessor expectations</span>
          </li>
        </ul>
      </AM2ContentCard>

      {/* Introduction */}
      <AM2ContentCard>
        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-4 mb-4">
          <p className="text-ios-footnote text-elec-yellow font-semibold mb-1">Important Note:</p>
          <p className="text-ios-callout text-white/80">
            The AM2 is not a "college exam" - it is a competence-based final assessment overseen by NET to prove you can work
            independently and safely as an electrician. Unlike written exams, the AM2 is judged against strict marking criteria
            and thresholds, with particular focus on safety, accuracy, and compliance with BS 7671.
          </p>
        </div>
        <p className="text-ios-body text-white/90">
          Some mistakes will only lose you marks, but others are considered critical fails that stop you passing regardless
          of your score elsewhere. Understanding how the AM2 is marked is vital to preparing effectively.
        </p>
      </AM2ContentCard>

      {/* Competence-based Marking */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          1. Competence-based Marking
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          The AM2 is assessed against fixed standards, not relative scores. Your work must be:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <Shield className="h-6 w-6 text-elec-yellow mb-2" />
            <h4 className="text-ios-headline text-white font-semibold mb-1">Safe</h4>
            <p className="text-ios-callout text-white/70">In line with health and safety and BS 7671</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <Target className="h-6 w-6 text-elec-yellow mb-2" />
            <h4 className="text-ios-headline text-white font-semibold mb-1">Accurate</h4>
            <p className="text-ios-callout text-white/70">Matches drawings and specifications exactly</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <Award className="h-6 w-6 text-elec-yellow mb-2" />
            <h4 className="text-ios-headline text-white font-semibold mb-1">Workmanlike</h4>
            <p className="text-ios-callout text-white/70">Professional standard as per IET definition</p>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id="competence-check"
        question="What's more important in AM2 - doing the job fast, or doing it safely and according to the specification?"
        options={[
          "Speed is most important",
          "Safety and compliance first",
          "They are equally important",
          "It depends on the task"
        ]}
        correctIndex={1}
        explanation="Safety and compliance must come first. Time matters but rushing leads to failure through mistakes or unsafe practices."
      />

      {/* Pass Threshold */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          2. Pass Threshold Requirements
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Candidates usually need <strong className="text-elec-yellow">80% overall</strong> across the assessment. However:
        </p>
        <ul className="space-y-2 text-ios-body text-white/80">
          <li className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>You must demonstrate competence in each main section</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>You cannot fail Safe Isolation or completely miss an area and expect to pass</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>High scores in one section cannot compensate for critical failures in another</span>
          </li>
        </ul>
      </AM2ContentCard>

      <InlineCheck
        id="pass-threshold-check"
        question="If you score 95% overall but fail to carry out Safe Isolation correctly, do you pass?"
        options={[
          "Yes, the overall score is high enough",
          "No, it's a critical fail",
          "Maybe, depending on other sections",
          "Yes, but with conditions"
        ]}
        correctIndex={1}
        explanation="No, unsafe isolation is a critical fail regardless of overall performance. Safety cannot be compromised."
      />

      {/* Critical Fails */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          3. Critical Fails (Automatic Failures)
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          NET defines certain errors as automatic fails regardless of performance elsewhere:
        </p>
        <div className="space-y-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Unsafe Isolation Procedure</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Failing to prove dead correctly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Re-proving tester incorrectly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Working live without authorisation</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Unsafe Circuit Conditions</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Leaving circuits in an unsafe condition</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Energising a circuit with a known fault</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Creating dangerous connections</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-2">Serious Health & Safety Breach</h4>
            <ul className="text-ios-callout text-white/70 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Major PPE violations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Dangerous working practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Risk to self or others</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      <InlineCheck
        id="critical-fail-check"
        question="Which of these is a critical fail?"
        options={[
          "Forgetting to label a circuit",
          "Leaving a test instrument unproved during isolation",
          "Missing one fault in the fault-finding section",
          "Taking slightly longer than expected"
        ]}
        correctIndex={1}
        explanation="Leaving a test instrument unproved during isolation is unsafe isolation practice - a critical fail that compromises safety."
      />

      {/* Section Expectations */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <FileCheck className="h-5 w-5" />
          4. Section-by-Section Expectations
        </h2>
        <div className="space-y-4">
          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <h4 className="text-ios-headline text-white font-semibold mb-1">Safe Isolation & Risk Assessment</h4>
            <p className="text-ios-callout text-white/70">100% correct procedure required - no margin for error</p>
          </div>
          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <h4 className="text-ios-headline text-white font-semibold mb-1">Composite Installation</h4>
            <p className="text-ios-callout text-white/70">Must follow drawings exactly; correct cable types, routing, termination, and neatness standards</p>
          </div>
          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <h4 className="text-ios-headline text-white font-semibold mb-1">Inspection, Testing & Certification</h4>
            <p className="text-ios-callout text-white/70">Step-by-step GN3 procedure; accurate test results; correctly completed EIC</p>
          </div>
          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <h4 className="text-ios-headline text-white font-semibold mb-1">Fault Diagnosis</h4>
            <p className="text-ios-callout text-white/70">Usually four faults; you must find and diagnose most (typically 3/4 minimum)</p>
          </div>
          <div className="border-l-4 border-elec-yellow/50 pl-4">
            <h4 className="text-ios-headline text-white font-semibold mb-1">Theory Test</h4>
            <p className="text-ios-callout text-white/70">Around 30 questions; based on BS 7671, building regulations, safe working practices</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Sampling and Neatness */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          5. Sampling and Neatness Standards
        </h2>
        <p className="text-ios-body text-white/90 mb-4">
          Assessors often sample test points rather than checking every connection. This means:
        </p>
        <ul className="space-y-2 text-ios-body text-white/80">
          <li className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>If the sample is poor quality, you lose marks across the board</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>Consistency of quality across your work is essential</span>
          </li>
          <li className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
            <span>You cannot "cut corners" on parts you think won't be checked</span>
          </li>
        </ul>
      </AM2ContentCard>

      <InlineCheck
        id="sampling-check"
        question="Why is it risky to 'cut corners' on parts you think the assessor won't check?"
        options={[
          "The assessor always checks everything",
          "They can sample any part, and poor samples lose marks",
          "It's against the rules",
          "Other candidates might notice"
        ]}
        correctIndex={1}
        explanation="Assessors can sample any part of your work. If sampled areas are poor quality, you lose marks even if other areas are good."
      />

      {/* Real-world Examples */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">Real-world Examples</h2>
        <div className="space-y-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-1">Example 1: Isolation Failure</h4>
            <p className="text-ios-callout text-white/70">
              Candidate wired an entire installation correctly but missed one key step in safe isolation (didn't re-prove tester).
              Result: Automatic fail despite otherwise excellent work.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-elec-yellow font-semibold mb-1">Example 2: Insufficient Fault Finding</h4>
            <p className="text-ios-callout text-white/70">
              Candidate completed installation work but only correctly identified 1/4 faults. Overall high marks in installation
              didn't save them - failed due to not meeting section threshold.
            </p>
          </div>
          <div className="bg-white/5 border border-amber-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-amber-400 font-semibold mb-1">Example 3: Specification Deviation</h4>
            <p className="text-ios-callout text-white/70">
              Candidate completed installation neatly but didn't follow the drawing (used wrong cable size for cooker).
              Marked down heavily - borderline pass due to accuracy requirements.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* FAQs */}
      <AM2ContentCard>
        <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h4 className="text-ios-headline text-white font-semibold mb-1">Q: If I fail one section but pass others, do I fail the whole AM2?</h4>
            <p className="text-ios-callout text-white/70">
              A: Yes, unless the section is minor and doesn't fall under NET's critical pass criteria. Safe isolation, for example, is non-negotiable.
            </p>
          </div>
          <div>
            <h4 className="text-ios-headline text-white font-semibold mb-1">Q: How strict are assessors on neatness?</h4>
            <p className="text-ios-callout text-white/70">
              A: Very strict. NET defines "workmanlike" standards clearly. Cables must be straight, terminated properly, with no insulation damage.
            </p>
          </div>
          <div>
            <h4 className="text-ios-headline text-white font-semibold mb-1">Q: Do I lose marks for asking the assessor a question?</h4>
            <p className="text-ios-callout text-white/70">
              A: No, but they will not give hints. They can clarify instructions if wording is unclear.
            </p>
          </div>
          <div>
            <h4 className="text-ios-headline text-white font-semibold mb-1">Q: Can I pass if I miss a fault in fault-finding?</h4>
            <p className="text-ios-callout text-white/70">
              A: Usually yes if you get the majority correct (e.g. 3/4). Missing more than one is risky.
            </p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Quiz Section */}
      <Quiz
        questions={quizQuestions}
        title="AM2 Marking Criteria Quiz"
      />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        prevHref="../section2"
        prevLabel="Assessment Structure"
        nextHref="../section4"
        nextLabel="Common Reasons for Failure"
        currentSection={3}
        totalSections={4}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module1Section3;
