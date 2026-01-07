import { Clock, AlertTriangle, CheckCircle, Target, Timer, Settings, Eye, Zap, Lightbulb, BookOpen, Wrench } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
import { AM2LearningOutcomes } from "@/components/apprentice-courses/AM2LearningOutcomes";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import useSEO from "@/hooks/useSEO";

const AM2Module4Section6 = () => {
  useSEO(
    "Time Management During Testing | AM2 Module 4 Section 6",
    "Master time management strategies for AM2 testing. Learn to work efficiently under pressure while maintaining safety and accuracy in electrical testing procedures."
  );

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: "time-blanks",
      question: "Which is better if time runs out — leaving blanks or writing 'perfect' textbook results?",
      options: [
        "Write perfect textbook results",
        "Leave blanks rather than fake answers",
        "Guess realistic values",
        "Copy from previous tests"
      ],
      correctIndex: 1,
      explanation: "Leave blanks. Fake/book answers = fail. Assessors can spot unrealistic perfect results."
    },
    {
      id: "rcd-failure",
      question: "What do assessors do if you fail to record RCD results because you ran out of time?",
      options: [
        "Give partial marks",
        "Allow extra time",
        "Mark as incomplete → lose marks, likely fail paperwork section",
        "Accept verbal explanation"
      ],
      correctIndex: 2,
      explanation: "Incomplete RCD results mean lost marks and likely failure of the paperwork section."
    },
    {
      id: "continuity-first",
      question: "Which test must be carried out before insulation resistance?",
      options: [
        "Polarity test",
        "RCD test",
        "Continuity test",
        "Earth fault loop test"
      ],
      correctIndex: 2,
      explanation: "Continuity tests must be completed before insulation resistance to ensure circuit integrity."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "Roughly how long is allocated for AM2 testing and certification?",
      options: ["2.5 hours", "3.5 hours", "4.5 hours", "5 hours"],
      correctAnswer: 1,
      explanation: "AM2 testing and certification is allocated approximately 3.5 hours total."
    },
    {
      id: 2,
      question: "Which is worse: incomplete results or fake/book answers?",
      options: ["Incomplete results", "Fake/book answers", "Both are equally bad", "Neither affects the result"],
      correctAnswer: 1,
      explanation: "Fake or book answers will result in failure. Incomplete but honest results are better than fabricated perfect answers."
    },
    {
      id: 3,
      question: "How much time should be set aside for paperwork?",
      options: ["10-20 minutes", "30-40 minutes", "50-60 minutes", "No specific time needed"],
      correctAnswer: 1,
      explanation: "30-40 minutes should be allocated for completing all certification paperwork properly."
    },
    {
      id: 4,
      question: "What's the risk of leaving results until the end?",
      options: ["Better organization", "More accurate results", "Running out of time and rushed/illegible entries", "No risk at all"],
      correctAnswer: 2,
      explanation: "Leaving all recording until the end risks running out of time and producing rushed, illegible paperwork."
    },
    {
      id: 5,
      question: "Which test must be carried out before insulation resistance?",
      options: ["RCD testing", "Continuity testing", "Polarity testing", "Earth fault loop testing"],
      correctAnswer: 1,
      explanation: "Continuity testing must be completed before insulation resistance testing to ensure circuit integrity."
    },
    {
      id: 6,
      question: "What's a common mistake with RCD testing under time pressure?",
      options: ["Testing too slowly", "Only doing ×1 test, forgetting ×5 test", "Using wrong instruments", "Testing at wrong current"],
      correctAnswer: 1,
      explanation: "Candidates often forget to complete both ×1 and ×5 RCD tests when rushing due to time pressure."
    },
    {
      id: 7,
      question: "Why is it better to record results circuit-by-circuit?",
      options: ["Easier to check later", "Prevents rushed recording at the end", "Required by regulations", "Looks more professional"],
      correctAnswer: 1,
      explanation: "Recording results as you go prevents the risk of running out of time and having to rush all paperwork at the end."
    },
    {
      id: 8,
      question: "True or false: You can pass AM2 if you skip functional testing.",
      options: ["True - electrical tests are sufficient", "False - functional tests are mandatory", "True - if time runs out", "False - unless approved by assessor"],
      correctAnswer: 1,
      explanation: "Functional testing is mandatory and cannot be skipped. All required tests must be completed."
    },
    {
      id: 9,
      question: "What's the golden rule if running out of time?",
      options: ["Work faster", "Skip less important tests", "Keep work safe - incomplete but safe is better than rushed and unsafe", "Ask for extension"],
      correctAnswer: 2,
      explanation: "Safety must never be compromised. Incomplete but safe work is always better than rushed, unsafe shortcuts."
    },
    {
      id: 10,
      question: "Give one strategy to manage time during AM2 testing.",
      options: ["Work as fast as possible", "Record results circuit-by-circuit as you go", "Skip detailed checks", "Focus only on major tests"],
      correctAnswer: 1,
      explanation: "Recording results immediately as you test each circuit prevents time-consuming paperwork sessions at the end."
    }
  ];

  const learningOutcomes = [
    "Break down AM2 testing into manageable stages",
    "Prioritise safety and completeness under exam conditions",
    "Recognise common time-management mistakes candidates make",
    "Apply strategies to stay on track without rushing",
    "Understand what assessors expect in terms of pacing and documentation"
  ];

  return (
    <AM2SectionLayout
      backHref="/apprentice-courses/am2/module4"
      breadcrumbs={[
        { label: "AM2", href: "/apprentice-courses/am2" },
        { label: "Module 4", href: "/apprentice-courses/am2/module4" },
        { label: "Section 6" }
      ]}
    >
      {/* Hero Section */}
      <AM2HeroSection
        icon={Clock}
        title="Time Management During Testing"
        description="Inspection and testing in AM2 is heavily time-pressured. You'll have around 3.5 hours to complete the full sequence of tests and fill in all paperwork. Poor pacing means incomplete results, rushed certificates, or unsafe shortcuts."
        badge="Module 4 - Section 6"
      />

      {/* Additional Context */}
      <p className="text-ios-body text-white/80 leading-relaxed -mt-4 mb-6">
        The assessor wants to see you work methodically, safely, and efficiently — not rushing, but not stalling either. In real life, electricians are expected to test thoroughly and still hand over jobs on time.
      </p>

      {/* Critical Warning */}
      <AM2CriticalWarning
        title="CRITICAL: Time Pressure vs Safety"
        message="Never compromise safety for speed. Unsafe shortcuts or rushed work will result in automatic AM2 failure, regardless of time constraints. Incomplete but safe work is always better than rushed, unsafe practices. Assessors prioritise safety over completion."
      />

      {/* Learning Outcomes */}
      <AM2LearningOutcomes outcomes={learningOutcomes} />

      {/* Why Time Management Matters */}
      <AM2ContentCard
        title="1. Why Time Management Matters"
        icon={Target}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Consequences of Poor Time Management:</h4>
            <ul className="space-y-2 text-ios-callout text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Testing is marked on both procedure and paperwork</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Running out of time = incomplete tests, missing results, blank certificates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Rushing = unsafe shortcuts, missed steps, "book answers"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Incomplete paperwork can drag strong candidates below pass threshold</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Benefits of Good Time Management:</h4>
            <ul className="space-y-2 text-ios-callout text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Complete all required tests safely</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Accurate, legible certification paperwork</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Professional, methodical approach demonstrated</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Reduced stress and better decision-making</span>
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

      {/* Typical Time Breakdown */}
      <AM2ContentCard
        title="2. Typical Time Breakdown (approx 3.5 hrs)"
        icon={Timer}
        accent
      >
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <h4 className="text-ios-headline text-white/90 mb-2 flex items-center gap-2">
            <Timer className="w-4 h-4 text-elec-yellow" />
            Recommended Time Allocation
          </h4>
          <p className="text-ios-callout text-white/70">
            These timings are guidelines based on NET experience. Use them as targets to pace yourself, but prioritise safety and completeness over speed.
          </p>
        </div>

        <div className="space-y-3">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-ios-body text-white/90 font-medium border-l-4 border-blue-400 pl-3">Visual inspection & preparation:</span>
              <span className="font-bold text-blue-400 text-ios-headline pl-7 sm:pl-0">20-30 mins</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-ios-body text-white/90 font-medium border-l-4 border-green-400 pl-3">Continuity tests (CPC, ring):</span>
              <span className="font-bold text-green-400 text-ios-headline pl-7 sm:pl-0">40-50 mins</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-ios-body text-white/90 font-medium border-l-4 border-purple-400 pl-3">Insulation resistance:</span>
              <span className="font-bold text-purple-400 text-ios-headline pl-7 sm:pl-0">20 mins</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-ios-body text-white/90 font-medium border-l-4 border-orange-400 pl-3">Polarity checks:</span>
              <span className="font-bold text-orange-400 text-ios-headline pl-7 sm:pl-0">20 mins</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-ios-body text-white/90 font-medium border-l-4 border-red-400 pl-3">Earth fault loop & PSC/PSCC:</span>
              <span className="font-bold text-red-400 text-ios-headline pl-7 sm:pl-0">30-40 mins</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-ios-body text-white/90 font-medium border-l-4 border-elec-yellow pl-3">RCD testing:</span>
              <span className="font-bold text-elec-yellow text-ios-headline pl-7 sm:pl-0">30 mins</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-ios-body text-white/90 font-medium border-l-4 border-pink-400 pl-3">Functional testing:</span>
              <span className="font-bold text-pink-400 text-ios-headline pl-7 sm:pl-0">30 mins</span>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <span className="text-ios-body text-white/90 font-medium border-l-4 border-teal-400 pl-3">Paperwork completion:</span>
              <span className="font-bold text-teal-400 text-ios-headline pl-7 sm:pl-0">30-40 mins</span>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Common Time Mistakes */}
      <AM2ContentCard
        title="3. Common Time Mistakes (NET findings)"
        icon={AlertTriangle}
      >
        <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
          <h4 className="text-ios-headline text-red-400 mb-3">TOP 5 Time Management Failures:</h4>
          <ul className="space-y-3 text-ios-callout text-white/80">
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">1.</span>
              <span>Spending too long setting up first tests - panicking later</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">2.</span>
              <span>Not recording results as they go - trying to write everything at the end</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">3.</span>
              <span>Over-checking one circuit while neglecting others</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">4.</span>
              <span>Rushing at the end - missing RCD x5 test or functional checks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold">5.</span>
              <span>Poor handwriting slowing down paperwork</span>
            </li>
          </ul>
        </div>
      </AM2ContentCard>

      {/* Assessor Expectations */}
      <AM2ContentCard
        title="4. Assessor Expectations"
        icon={Eye}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-ios-headline text-green-400 mb-3">What Assessors Want to See:</h4>
            <ul className="space-y-2 text-ios-callout text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Work steady and systematic - no shortcuts</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Talk through what you are doing (shows confidence and keeps you focused)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Record results circuit-by-circuit, not all at the end</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Leave circuits safe if incomplete. Unsafe = fail</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Professional Qualities Demonstrated:</h4>
            <ul className="space-y-2 text-ios-callout text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Methodical approach under pressure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Clear communication and commentary</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Organised documentation practices</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Safety prioritised over speed</span>
              </li>
            </ul>
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

      {/* Practical Strategies */}
      <AM2ContentCard
        title="5. Practical Strategies for Success"
        icon={Settings}
        accent
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-white/5 border border-purple-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-purple-400 mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Planning Strategies
              </h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li><strong className="text-white/90">Have a plan:</strong> Break tasks into stages with time targets</li>
                <li><strong className="text-white/90">Check off sequence:</strong> Use the GN3 order like a checklist</li>
                <li><strong className="text-white/90">Don't over-engineer:</strong> Professional standard is enough</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-green-400 mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Recording Strategies
              </h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li><strong className="text-white/90">Record immediately:</strong> Enter values as you test, not afterwards</li>
                <li><strong className="text-white/90">Work cleanly:</strong> Avoid wasted time untangling leads</li>
                <li><strong className="text-white/90">Clear handwriting:</strong> Practice legible recording under pressure</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white/90 mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-elec-yellow" />
                Mental Strategies
              </h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li><strong className="text-white/90">Stay calm:</strong> Panic leads to skipped steps and unsafe practice</li>
                <li><strong className="text-white/90">Focus on one circuit:</strong> Complete each fully before moving on</li>
                <li><strong className="text-white/90">Commentary:</strong> Talk through actions to maintain focus</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-orange-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-orange-400 mb-2 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Equipment Strategies
              </h4>
              <ul className="text-ios-callout text-white/70 space-y-1">
                <li><strong className="text-white/90">Organised setup:</strong> Keep tools and leads tidy</li>
                <li><strong className="text-white/90">Pre-check equipment:</strong> Verify operation before starting</li>
                <li><strong className="text-white/90">Backup plans:</strong> Know alternative test methods</li>
              </ul>
            </div>
          </div>
        </div>
      </AM2ContentCard>

      {/* Real-world Examples */}
      <AM2ContentCard
        title="Real-world Examples"
        icon={Zap}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-red-400 mb-2">Example 1: Ring Continuity Obsession</h4>
              <p className="text-ios-callout text-white/70 mb-2">
                Candidate spent 45 mins just on ring continuity, re-checking measurements multiple times.
                Ran out of time, left RCD tests incomplete - <strong className="text-red-400">fail</strong>.
              </p>
              <p className="text-ios-footnote text-white/60 italic">
                Lesson: Don't chase perfection on one test at the expense of completing all requirements.
              </p>
            </div>

            <div className="bg-white/5 border border-red-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-red-400 mb-2">Example 2: Paperwork Left Until End</h4>
              <p className="text-ios-callout text-white/70 mb-2">
                Candidate tested correctly but left all paperwork until the end.
                Results rushed, illegible, several mistakes - <strong className="text-red-400">lost easy marks</strong>.
              </p>
              <p className="text-ios-footnote text-white/60 italic">
                Lesson: Record results immediately while values are fresh in memory.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
              <h4 className="text-ios-headline text-green-400 mb-2">Example 3: Methodical Success</h4>
              <p className="text-ios-callout text-white/70 mb-2">
                Candidate kept to time blocks, recorded as they went, talked through each stage clearly.
                Completed all tests and paperwork on time - <strong className="text-green-400">pass</strong>.
              </p>
              <p className="text-ios-footnote text-green-400/70 italic">
                Success factor: Disciplined time management and immediate recording.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline text-white/90 mb-2">Example 4: Real-world Parallel</h4>
              <p className="text-ios-callout text-white/70 mb-2">
                In real work, a contractor failed a NICEIC audit because test sheets were incomplete.
                Same issue in AM2 = <strong className="text-elec-yellow">marks lost</strong>.
              </p>
              <p className="text-ios-footnote text-white/60 italic">
                Reality: Incomplete documentation fails in both AM2 and professional practice.
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

      {/* Advanced Time Management Techniques */}
      <AM2ContentCard
        title="Advanced Time Management Techniques"
        icon={BookOpen}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Pre-Test Preparation (5-10 mins investment saves 20+ mins later)</h4>
            <ul className="text-ios-callout text-white/70 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Set up test equipment systematically in logical order</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Check all instruments are calibrated and functioning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Organise test leads and accessories within easy reach</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Review circuit schedules and understand the installation layout</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span>Plan your testing sequence based on circuit accessibility</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-ios-headline text-white/90 mb-3">Efficient Recording Methods</h4>
            <ul className="text-ios-callout text-white/70 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Use consistent abbreviations that you practise beforehand</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Record readings immediately after each individual test</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Double-check critical values as you write them down</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Keep certificates organised and easily accessible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">•</span>
                <span>Use pencil for initial readings, pen for final confirmed results</span>
              </li>
            </ul>
          </div>
        </div>
      </AM2ContentCard>

      {/* Troubleshooting Time Issues */}
      <AM2ContentCard
        title="Troubleshooting Time Issues"
        icon={Wrench}
      >
        <h3 className="text-ios-headline text-white/90 mb-4">Common Problems and Solutions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 border-l-4 border-l-red-500">
            <p className="text-ios-headline text-white/90 mb-2">Problem: Test equipment malfunction</p>
            <p className="text-ios-callout text-white/70">Solution: Always have backup instruments and check equipment functionality before starting formal testing</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 border-l-4 border-l-orange-500">
            <p className="text-ios-headline text-white/90 mb-2">Problem: Unexpected circuit complexities</p>
            <p className="text-ios-callout text-white/70">Solution: Spend adequate time on visual inspection to understand the installation layout fully</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 border-l-4 border-l-yellow-500">
            <p className="text-ios-headline text-white/90 mb-2">Problem: Illegible handwriting under pressure</p>
            <p className="text-ios-callout text-white/70">Solution: Practice writing test results clearly and consider using block capitals for critical values</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 border-l-4 border-l-green-500">
            <p className="text-ios-headline text-white/90 mb-2">Problem: Forgetting test sequences</p>
            <p className="text-ios-callout text-white/70">Solution: Create a personal checklist and stick rigidly to GN3 testing order</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* FAQs */}
      <AM2ContentCard
        title="Frequently Asked Questions"
        icon={BookOpen}
      >
        <div className="space-y-4">
          <div className="border-l-4 border-elec-yellow pl-4">
            <h3 className="text-ios-headline text-white/90 mb-2">Q1: Can I ask for extra time if I'm running behind?</h3>
            <p className="text-ios-callout text-white/70">A: No - the schedule is fixed. AM2 assessments run to strict timelines that cannot be extended.</p>
          </div>
          <div className="border-l-4 border-elec-yellow pl-4">
            <h3 className="text-ios-headline text-white/90 mb-2">Q2: Should I speed up if I see I'm running out of time?</h3>
            <p className="text-ios-callout text-white/70">A: No - unsafe shortcuts = fail. Prioritise safety over completion every time.</p>
          </div>
          <div className="border-l-4 border-elec-yellow pl-4">
            <h3 className="text-ios-headline text-white/90 mb-2">Q3: Can I skip functional tests if I've done electrical tests?</h3>
            <p className="text-ios-callout text-white/70">A: No - functional tests are mandatory. All prescribed tests must be completed.</p>
          </div>
          <div className="border-l-4 border-elec-yellow pl-4">
            <h3 className="text-ios-headline text-white/90 mb-2">Q4: Do I lose marks for working slowly but completing everything?</h3>
            <p className="text-ios-callout text-white/70">A: Not directly, but you risk running out of time for later tests or paperwork.</p>
          </div>
          <div className="border-l-4 border-elec-yellow pl-4">
            <h3 className="text-ios-headline text-white/90 mb-2">Q5: What's the golden rule if you're behind schedule?</h3>
            <p className="text-ios-callout text-white/70">A: Keep work safe. Incomplete but safe is always better than rushed and unsafe.</p>
          </div>
        </div>
      </AM2ContentCard>

      {/* Summary */}
      <AM2ContentCard
        title="Summary"
        icon={CheckCircle}
        accent
      >
        <div className="bg-white/5 border border-green-500/30 rounded-xl p-4">
          <p className="text-ios-callout text-white/80 mb-4">
            Time management in AM2 testing is about method, not speed. Assessors want to see:
          </p>
          <ul className="space-y-2 text-ios-callout text-white/80">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
              <span>Tests completed in correct sequence</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
              <span>Results recorded as you go</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
              <span>Safe, steady pace without rushing</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-400" />
              <span>Certificates fully completed and legible</span>
            </li>
          </ul>
          <p className="text-ios-callout text-white/80 mt-4 font-medium">
            Remember: you're not only being tested on knowledge - you're being tested on how you work under pressure.
          </p>
        </div>
      </AM2ContentCard>

      {/* Quiz Component */}
      <Quiz questions={quizQuestions} title="Section 6: Time Management Quiz" />

      {/* Navigation Footer */}
      <AM2NavigationFooter
        previousHref="../section5"
        previousLabel="Section 5: Non-Compliances"
        nextHref=".."
        nextLabel="Module 5: Practical Skills"
        currentSection={6}
        totalSections={6}
      />
    </AM2SectionLayout>
  );
};

export default AM2Module4Section6;
