import { ArrowLeft, CheckCircle, Users, Shield, Target, Award, Clock, TrendingUp, BookOpen, Zap, ArrowRight, AlertTriangle, Scale, Eye, FileCheck, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
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
      options: [
        "70%",
        "75%",
        "80%",
        "85%"
      ],
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
      options: [
        "True",
        "False"
      ],
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
    },
    {
      id: 6,
      question: "What does 'workmanlike standard' mean in AM2 context?",
      options: [
        "Good enough to function",
        "Professional quality installation meeting industry standards",
        "Quick but functional work",
        "Basic apprentice level work"
      ],
      correctAnswer: 1,
      explanation: "Workmanlike standard means professional quality installation that meets IET definitions and industry standards."
    },
    {
      id: 7,
      question: "Which documents should guide your testing and certification procedure?",
      options: [
        "Manufacturer instructions only",
        "GN3 Guidance Note and BS 7671",
        "Local college notes",
        "Online guides"
      ],
      correctAnswer: 1,
      explanation: "GN3 (Guidance Note 3) and BS 7671 provide the step-by-step procedures for testing and certification."
    },
    {
      id: 8,
      question: "If your recorded test results don't match model values exactly, what matters most to the assessor?",
      options: [
        "Exact numerical match",
        "Realistic and consistent values",
        "Rounded numbers",
        "Conservative estimates"
      ],
      correctAnswer: 1,
      explanation: "Assessors look for realistic and consistent values that make sense, not exact matches to model answers."
    },
    {
      id: 9,
      question: "Why is time management important in the composite installation?",
      options: [
        "To finish early and leave",
        "To ensure quality work within timeframes",
        "Speed is more important than quality",
        "To impress the assessor"
      ],
      correctAnswer: 1,
      explanation: "Time management ensures you can complete quality work within the allocated timeframes without rushing and making mistakes."
    },
    {
      id: 10,
      question: "What's the difference between losing marks and a critical fail?",
      options: [
        "They are the same thing",
        "Critical fails are automatic fails regardless of other scores",
        "Losing marks is worse than critical fails",
        "Critical fails only lose extra marks"
      ],
      correctAnswer: 1,
      explanation: "Critical fails result in automatic failure regardless of your performance in other areas, while losing marks reduces your overall score but may still allow you to pass."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="flex items-center gap-2 p-3 md:p-4 text-xs md:text-sm text-muted-foreground">
        <Link 
          to=".." 
          className="hover:text-emerald-400 transition-colors"
        >
          ← Back to Module 1
        </Link>
        <span>/</span>
        <span>AM2</span>
        <span>/</span>
        <span className="hidden sm:inline">Module 1</span>
        <span className="sm:hidden">M1</span>
        <span>/</span>
        <span className="text-emerald-400">Section 3</span>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-12">
        {/* Hero Section */}
        <div className="mb-4 md:mb-6">
          <Card className="bg-card border-emerald-500/30">
            <div className="p-4 md:p-6 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-emerald-500/20 rounded-full mb-3 md:mb-4">
                <Scale className="h-5 w-5 md:h-6 md:w-6 text-emerald-400" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-3">
                Section 3: Marking Criteria and Pass/Fail Thresholds
              </h1>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                Understanding how the AM2 is marked and what constitutes a pass or fail - your key to assessment success.
              </p>
            </div>
          </Card>
        </div>

        {/* Learning Outcomes */}
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">
              <Target className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              Learning Outcomes
            </h2>
            <p className="text-muted-foreground text-sm mb-3 md:mb-4 max-w-3xl">
              By the end of this section, you should be able to:
            </p>
            <ul className="space-y-2 text-muted-foreground text-sm max-w-3xl">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                Explain how the AM2 assessment is marked and what "competence-based" means
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                Identify the pass mark threshold and the importance of meeting standards across all sections
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                Recognise which mistakes are critical fails (automatic fails)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                Apply NET's readiness checklists to your own practice
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                Evaluate your own work against assessor expectations
              </li>
            </ul>
          </div>
        </Card>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          <Card className="bg-card border-emerald-500/30 text-center p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-emerald-400 mb-1">80%</div>
            <div className="text-xs text-muted-foreground">Overall pass threshold</div>
          </Card>
          <Card className="bg-card border-emerald-500/30 text-center p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-emerald-400 mb-1">5</div>
            <div className="text-xs text-muted-foreground">Main assessment sections</div>
          </Card>
          <Card className="bg-card border-emerald-500/30 text-center p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-emerald-400 mb-1">100%</div>
            <div className="text-xs text-muted-foreground">Safe isolation requirement</div>
          </Card>
          <Card className="bg-card border-emerald-500/30 text-center p-3 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-emerald-400 mb-1">Fixed</div>
            <div className="text-xs text-muted-foreground">Standards-based marking</div>
          </Card>
        </div>

        {/* Introduction */}
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-3 md:mb-4">
              <p className="text-emerald-400 text-xs font-semibold mb-1">Important Note:</p>
              <p className="text-muted-foreground text-xs">
                The AM2 is not a "college exam" — it is a competence-based final assessment overseen by NET to prove you can work 
                independently and safely as an electrician. Unlike written exams, the AM2 is judged against strict marking criteria 
                and thresholds, with particular focus on safety, accuracy, and compliance with BS 7671.
              </p>
            </div>
            <p className="text-muted-foreground text-sm max-w-3xl">
              Some mistakes will only lose you marks, but others are considered critical fails that stop you passing regardless 
              of your score elsewhere. Understanding how the AM2 is marked — and what constitutes a pass or fail — is vital to preparing effectively.
            </p>
          </div>
        </Card>

        {/* Competence-based Marking */}
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">
              <Eye className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              1. Competence-based Marking
            </h2>
            <p className="text-muted-foreground text-sm mb-3 md:mb-4 max-w-3xl">
              The AM2 is assessed against fixed standards, not relative scores. Your work must be:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl mb-3 md:mb-4">
              <div className="bg-card/80 border border-emerald-500/30 rounded-lg p-3">
                <Shield className="h-5 w-5 text-emerald-400 mb-2" />
                <h4 className="text-foreground font-semibold text-sm mb-1">Safe</h4>
                <p className="text-muted-foreground text-xs">In line with health and safety and BS 7671</p>
              </div>
              <div className="bg-card/80 border border-emerald-500/30 rounded-lg p-3">
                <Target className="h-5 w-5 text-emerald-400 mb-2" />
                <h4 className="text-foreground font-semibold text-sm mb-1">Accurate</h4>
                <p className="text-muted-foreground text-xs">Matches drawings and specifications exactly</p>
              </div>
              <div className="bg-card/80 border border-emerald-500/30 rounded-lg p-3">
                <Award className="h-5 w-5 text-emerald-400 mb-2" />
                <h4 className="text-foreground font-semibold text-sm mb-1">Workmanlike</h4>
                <p className="text-muted-foreground text-xs">Professional standard as per IET definition</p>
              </div>
            </div>
          </div>
        </Card>

        <InlineCheck
          id="competence-check"
          question="What's more important in AM2 — doing the job fast, or doing it safely and according to the specification?"
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
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">
              <TrendingUp className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              2. Pass Threshold Requirements
            </h2>
            <div className="max-w-3xl space-y-3 md:space-y-4">
              <p className="text-muted-foreground text-sm">
                Candidates usually need <strong className="text-emerald-400">80% overall</strong> across the assessment. However:
              </p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  You must demonstrate competence in each main section
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  You cannot fail Safe Isolation or completely miss an area and expect to pass
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  High scores in one section cannot compensate for critical failures in another
                </li>
              </ul>
            </div>
          </div>
        </Card>

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
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">
              <AlertTriangle className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              3. Critical Fails (Automatic Failures)
            </h2>
            <p className="text-muted-foreground text-sm mb-3 md:mb-4 max-w-3xl">
              NET defines certain errors as automatic fails regardless of performance elsewhere:
            </p>
            <div className="space-y-3 max-w-3xl">
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Unsafe Isolation Procedure</h4>
                <ul className="text-muted-foreground text-xs space-y-1">
                  <li>• Failing to prove dead correctly</li>
                  <li>• Re-proving tester incorrectly</li>
                  <li>• Working live without authorisation</li>
                </ul>
              </div>
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Unsafe Circuit Conditions</h4>
                <ul className="text-muted-foreground text-xs space-y-1">
                  <li>• Leaving circuits in an unsafe condition</li>
                  <li>• Energising a circuit with a known fault</li>
                  <li>• Creating dangerous connections</li>
                </ul>
              </div>
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Serious Health & Safety Breach</h4>
                <ul className="text-muted-foreground text-xs space-y-1">
                  <li>• Major PPE violations</li>
                  <li>• Dangerous working practices</li>
                  <li>• Risk to self or others</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

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
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">
              <FileCheck className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              4. Section-by-Section Expectations
            </h2>
            <div className="space-y-4 max-w-3xl">
              <div className="border-l-4 border-emerald-500/50 pl-3 md:pl-4">
                <h4 className="text-foreground font-semibold text-sm mb-1">Safe Isolation & Risk Assessment</h4>
                <p className="text-muted-foreground text-xs">100% correct procedure required - no margin for error</p>
              </div>
              
              <div className="border-l-4 border-emerald-500/50 pl-3 md:pl-4">
                <h4 className="text-foreground font-semibold text-sm mb-1">Composite Installation</h4>
                <p className="text-muted-foreground text-xs">Must follow drawings exactly; correct cable types, routing, termination, and neatness standards</p>
              </div>
              
              <div className="border-l-4 border-emerald-500/50 pl-3 md:pl-4">
                <h4 className="text-foreground font-semibold text-sm mb-1">Inspection, Testing & Certification</h4>
                <p className="text-muted-foreground text-xs">Step-by-step GN3 procedure; accurate test results; correctly completed EIC</p>
              </div>
              
              <div className="border-l-4 border-emerald-500/50 pl-3 md:pl-4">
                <h4 className="text-foreground font-semibold text-sm mb-1">Fault Diagnosis</h4>
                <p className="text-muted-foreground text-xs">Usually four faults; you must find and diagnose most (typically 3/4 minimum)</p>
              </div>
              
              <div className="border-l-4 border-emerald-500/50 pl-3 md:pl-4">
                <h4 className="text-foreground font-semibold text-sm mb-1">Theory Test</h4>
                <p className="text-muted-foreground text-xs">Around 30 questions; based on BS 7671, building regulations, safe working practices</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Sampling and Neatness */}
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">
              <Eye className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              5. Sampling and Neatness Standards
            </h2>
            <div className="max-w-3xl space-y-3 md:space-y-4">
              <p className="text-muted-foreground text-sm">
                Assessors often sample test points rather than checking every connection. This means:
              </p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  If the sample is poor quality, you lose marks across the board
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Consistency of quality across your work is essential
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  You cannot "cut corners" on parts you think won't be checked
                </li>
              </ul>
            </div>
          </div>
        </Card>

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
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">Real-world Examples</h2>
            <div className="space-y-3 md:space-y-4 max-w-3xl">
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h4 className="text-emerald-400 font-semibold text-sm mb-1">Example 1: Isolation Failure</h4>
                <p className="text-muted-foreground text-xs">
                  Candidate wired an entire installation correctly but missed one key step in safe isolation (didn't re-prove tester). 
                  Result: Automatic fail despite otherwise excellent work.
                </p>
              </div>
              
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h4 className="text-emerald-400 font-semibold text-sm mb-1">Example 2: Insufficient Fault Finding</h4>
                <p className="text-muted-foreground text-xs">
                  Candidate completed installation work but only correctly identified 1/4 faults. Overall high marks in installation 
                  didn't save them - failed due to not meeting section threshold.
                </p>
              </div>
              
              <div className="bg-card border border-amber-500/30 rounded-lg p-3">
                <h4 className="text-amber-400 font-semibold text-sm mb-1">Example 3: Specification Deviation</h4>
                <p className="text-muted-foreground text-xs">
                  Candidate completed installation neatly but didn't follow the drawing (used wrong cable size for cooker). 
                  Marked down heavily - borderline pass due to accuracy requirements.
                </p>
              </div>
              
              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h4 className="text-emerald-400 font-semibold text-sm mb-1">Example 4: Testing Procedure Error</h4>
                <p className="text-muted-foreground text-xs">
                  Candidate rushed testing sequence and wrote down results from memory, not measured values. 
                  Assessor spotted inconsistent readings - marked as fail for procedural errors.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">Frequently Asked Questions</h2>
            <div className="space-y-3 md:space-y-4 max-w-3xl">
              <div>
                <h4 className="text-foreground font-semibold text-sm mb-1">Q: If I fail one section but pass others, do I fail the whole AM2?</h4>
                <p className="text-muted-foreground text-xs">
                  A: Yes, unless the section is minor and doesn't fall under NET's critical pass criteria. Safe isolation, for example, is non-negotiable.
                </p>
              </div>
              
              <div>
                <h4 className="text-foreground font-semibold text-sm mb-1">Q: How strict are assessors on neatness?</h4>
                <p className="text-muted-foreground text-xs">
                  A: Very strict. NET defines "workmanlike" standards clearly. Cables must be straight, terminated properly, with no insulation damage.
                </p>
              </div>
              
              <div>
                <h4 className="text-foreground font-semibold text-sm mb-1">Q: Do I lose marks for asking the assessor a question?</h4>
                <p className="text-muted-foreground text-xs">
                  A: No, but they will not give hints. They can clarify instructions if wording is unclear.
                </p>
              </div>
              
              <div>
                <h4 className="text-foreground font-semibold text-sm mb-1">Q: What if my test results differ slightly from the model answer?</h4>
                <p className="text-muted-foreground text-xs">
                  A: Small variations are acceptable as long as they are realistic and consistent. Impossible values (like 0.00 Ω on earth fault loop impedance) will fail you.
                </p>
              </div>
              
              <div>
                <h4 className="text-foreground font-semibold text-sm mb-1">Q: Can I pass if I miss a fault in fault-finding?</h4>
                <p className="text-muted-foreground text-xs">
                  A: Usually yes if you get the majority correct (e.g. 3/4). Missing more than one is risky.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Marking Breakdown */}
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">Detailed Marking Breakdown by Section</h2>
            <div className="space-y-4 max-w-3xl">
              <div className="bg-card/80 border border-emerald-500/30 rounded-lg p-3">
                <h4 className="text-foreground font-semibold text-sm mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  Safe Isolation & Risk Assessment (100% Required)
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <p className="text-muted-foreground mb-1"><strong>Prove Dead Procedure:</strong></p>
                      <ul className="text-muted-foreground space-y-0.5">
                        <li>• Initial test on known supply</li>
                        <li>• Test on isolated circuit</li>
                        <li>• Re-test on known supply</li>
                        <li>• All steps must be witnessed</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1"><strong>Risk Assessment:</strong></p>
                      <ul className="text-muted-foreground space-y-0.5">
                        <li>• Environmental hazards identified</li>
                        <li>• Control measures documented</li>
                        <li>• PPE requirements noted</li>
                        <li>• Emergency procedures clear</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-card border border-border/30 rounded p-2 mt-2">
                    <p className="text-emerald-400 text-xs font-semibold">Critical: Any deviation from GS38 procedures = automatic fail</p>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 border border-emerald-500/30 rounded-lg p-3">
                <h4 className="text-foreground font-semibold text-sm mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-emerald-400" />
                  Composite Installation (50% of total marks)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1"><strong>Cable Installation (40%):</strong></p>
                    <ul className="text-muted-foreground space-y-0.5">
                      <li>• Correct cable types selected</li>
                      <li>• Proper support spacing</li>
                      <li>• Appropriate protection methods</li>
                      <li>• No mechanical damage</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1"><strong>Terminations (35%):</strong></p>
                    <ul className="text-muted-foreground space-y-0.5">
                      <li>• Correct conductor preparation</li>
                      <li>• Proper tightening torques</li>
                      <li>• No loose connections</li>
                      <li>• Earth continuity maintained</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1"><strong>Workmanship (25%):</strong></p>
                    <ul className="text-muted-foreground space-y-0.5">
                      <li>• Neat cable runs</li>
                      <li>• Professional appearance</li>
                      <li>• Consistent quality</li>
                      <li>• Proper labelling</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card/80 border border-emerald-500/30 rounded-lg p-3">
                <h4 className="text-foreground font-semibold text-sm mb-2 flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-emerald-400" />
                  Inspection, Testing & Certification (25% of total marks)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground mb-1"><strong>Testing Procedure (60%):</strong></p>
                    <ul className="text-muted-foreground space-y-0.5">
                      <li>• Correct test sequence followed</li>
                      <li>• Appropriate test instruments used</li>
                      <li>• Accurate readings recorded</li>
                      <li>• Dead testing completed first</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1"><strong>Certification (40%):</strong></p>
                    <ul className="text-muted-foreground space-y-0.5">
                      <li>• EIC completed accurately</li>
                      <li>• All sections filled correctly</li>
                      <li>• Calculations match results</li>
                      <li>• Professional presentation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Assessor Perspective */}
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">
              <Eye className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              What Assessors Look For
            </h2>
            <div className="space-y-4 max-w-3xl">
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Professional Behaviour & Approach</h4>
                <ul className="text-muted-foreground text-xs space-y-1">
                  <li>• Methodical approach to tasks - not rushing or skipping steps</li>
                  <li>• Confidence in handling tools and equipment</li>
                  <li>• Ability to work independently without constant guidance</li>
                  <li>• Professional communication when clarification needed</li>
                  <li>• Systematic problem-solving approach during fault finding</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-card border border-green-500/30 rounded-lg p-3">
                  <h4 className="text-green-400 font-semibold text-sm mb-2">Positive Indicators</h4>
                  <ul className="text-muted-foreground text-xs space-y-1">
                    <li>• Double-checking connections before energising</li>
                    <li>• Using correct PPE throughout</li>
                    <li>• Keeping work area tidy and organised</li>
                    <li>• Following logical sequence of operations</li>
                    <li>• Showing understanding of regulations</li>
                  </ul>
                </div>
                
                <div className="bg-card border border-border/30 rounded-lg p-3">
                  <h4 className="text-emerald-400 font-semibold text-sm mb-2">Warning Signs</h4>
                  <ul className="text-muted-foreground text-xs space-y-1">
                    <li>• Hesitation during safety procedures</li>
                    <li>• Multiple attempts at basic tasks</li>
                    <li>• Ignoring or forgetting PPE requirements</li>
                    <li>• Disorganised approach to tasks</li>
                    <li>• Inability to explain actions when asked</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Common Marking Scenarios */}
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">Common Marking Scenarios</h2>
            <div className="space-y-3 max-w-3xl">
              <div className="bg-card border border-amber-500/30 rounded-lg p-3">
                <h4 className="text-amber-400 font-semibold text-sm mb-1">Scenario: Borderline Pass (78-82%)</h4>
                <p className="text-muted-foreground text-xs mb-2">
                  Installation mostly correct with minor issues. Testing accurate but one small procedure error. 
                  What determines pass/fail:
                </p>
                <ul className="text-muted-foreground text-xs space-y-0.5">
                  <li>• Overall safety consciousness demonstrated</li>
                  <li>• No critical fails in any section</li>
                  <li>• Evidence of competent working practices</li>
                  <li>• Minor errors don't compromise safety</li>
                </ul>
              </div>

              <div className="bg-card border border-green-500/30 rounded-lg p-3">
                <h4 className="text-green-400 font-semibold text-sm mb-1">Scenario: Strong Pass (85%+)</h4>
                <p className="text-muted-foreground text-xs mb-2">
                  Characteristics of high-scoring candidates:
                </p>
                <ul className="text-muted-foreground text-xs space-y-0.5">
                  <li>• Flawless safety procedures throughout</li>
                  <li>• Installation work exceeds minimum standards</li>
                  <li>• Testing completed efficiently and accurately</li>
                  <li>• Professional approach to all tasks</li>
                  <li>• Fault finding completed systematically</li>
                </ul>
              </div>

              <div className="bg-card border border-border/30 rounded-lg p-3">
                <h4 className="text-emerald-400 font-semibold text-sm mb-1">Scenario: Fail (Below 80% or Critical Fail)</h4>
                <p className="text-muted-foreground text-xs mb-2">
                  Common failure patterns:
                </p>
                <ul className="text-muted-foreground text-xs space-y-0.5">
                  <li>• Safety procedure errors (immediate fail)</li>
                  <li>• Multiple basic installation mistakes</li>
                  <li>• Inability to complete fault finding</li>
                  <li>• Poor time management affecting quality</li>
                  <li>• Fundamental regulation misunderstandings</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Preparation Strategies */}
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">
              <Target className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              Preparation Strategies for Each Marking Area
            </h2>
            <div className="space-y-4 max-w-3xl">
              <div className="border-l-4 border-emerald-500/50 pl-3 md:pl-4">
                <h4 className="text-foreground font-semibold text-sm mb-2">Maximising Safety Marks</h4>
                <ul className="text-muted-foreground text-xs space-y-1">
                  <li>• Practice isolation procedures until they become automatic</li>
                  <li>• Always prove dead in the prescribed sequence</li>
                  <li>• Develop consistent PPE habits - never compromise</li>
                  <li>• Know GS38 requirements inside and out</li>
                  <li>• Practice risk assessments for different scenarios</li>
                </ul>
              </div>

              <div className="border-l-4 border-emerald-500/50 pl-3 md:pl-4">
                <h4 className="text-foreground font-semibold text-sm mb-2">Improving Installation Quality</h4>
                <ul className="text-muted-foreground text-xs space-y-1">
                  <li>• Focus on consistent cable runs and spacing</li>
                  <li>• Practice different termination techniques</li>
                  <li>• Develop standards for "neat and workmanlike"</li>
                  <li>• Time yourself on common installation tasks</li>
                  <li>• Get feedback on workmanship from experienced electricians</li>
                </ul>
              </div>

              <div className="border-l-4 border-emerald-500/50 pl-3 md:pl-4">
                <h4 className="text-foreground font-semibold text-sm mb-2">Testing & Certification Excellence</h4>
                <ul className="text-muted-foreground text-xs space-y-1">
                  <li>• Memorise the correct testing sequence from GN3</li>
                  <li>• Practice with the exact test equipment you'll use</li>
                  <li>• Know acceptable ranges for all test results</li>
                  <li>• Practice completing certificates under time pressure</li>
                  <li>• Understand what each test actually measures</li>
                </ul>
              </div>

              <div className="border-l-4 border-emerald-500/50 pl-3 md:pl-4">
                <h4 className="text-foreground font-semibold text-sm mb-2">Fault Finding Success</h4>
                <ul className="text-muted-foreground text-xs space-y-1">
                  <li>• Develop systematic fault-finding approaches</li>
                  <li>• Practice on different circuit types and fault scenarios</li>
                  <li>• Know your test equipment capabilities thoroughly</li>
                  <li>• Work methodically - don't guess or rush</li>
                  <li>• Practice explaining your diagnosis clearly</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Final Tips */}
        <Card className="bg-card border-emerald-500/30 mb-4 md:mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">Final Assessment Day Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              <div>
                <h4 className="text-foreground font-semibold text-sm mb-2">Before You Start</h4>
                <ul className="text-muted-foreground text-xs space-y-1">
                  <li>• Read all instructions completely before beginning</li>
                  <li>• Check all tools and equipment functionality</li>
                  <li>• Plan your time allocation for each section</li>
                  <li>• Take a moment to visualise your approach</li>
                  <li>• Ask for clarification if anything is unclear</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-foreground font-semibold text-sm mb-2">During the Assessment</h4>
                <ul className="text-muted-foreground text-xs space-y-1">
                  <li>• Work at a steady, methodical pace</li>
                  <li>• Double-check safety procedures constantly</li>
                  <li>• Keep your work area organised throughout</li>
                  <li>• Don't be afraid to check your work</li>
                  <li>• Stay calm if something doesn't go perfectly</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mt-4">
              <p className="text-emerald-400 text-xs font-semibold mb-1">Remember:</p>
              <p className="text-muted-foreground text-xs">
                The assessor wants you to pass. They're looking for evidence of competence, not trying to catch you out. 
                Show them you can work safely and professionally to industry standards, and you'll succeed.
              </p>
            </div>
          </div>
        </Card>

        {/* Quiz Section */}
        <Card className="bg-card border-emerald-500/30 mb-6">
          <div className="p-3 md:p-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-400 mb-2 md:mb-3">
              <BookOpen className="inline-block mr-2 h-4 w-4 md:h-5 md:w-5" />
              Test Your Knowledge
            </h2>
            <p className="text-muted-foreground text-sm mb-3 md:mb-4">
              Test your understanding of AM2 marking criteria and pass/fail thresholds with this 10-question quiz.
            </p>
            <Quiz questions={quizQuestions} title="AM2 Marking Criteria Quiz" />
          </div>
        </Card>

        {/* Navigation Footer */}
        <div className="flex justify-between items-center gap-4">
          <Link 
            to="../section2"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous: Assessment Structure & Timings</span>
            <span className="sm:hidden">Previous</span>
          </Link>
          
          <Link 
            to="../section4"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
          >
            <span className="hidden sm:inline">Next: Common Reasons for Failure</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AM2Module1Section3;