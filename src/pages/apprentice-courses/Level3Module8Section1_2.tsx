/**
 * Level 3 Module 8 Section 1.2 - Timed Module Tests
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 * Focused practice tests with realistic time constraints for specific modules
 */

import { ArrowLeft, Zap, CheckCircle, Timer, Target, BookOpen, BarChart3, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Timed Module Tests - Level 3 Module 8 Section 1.2";
const DESCRIPTION = "Focused timed tests on specific Level 3 modules. Build expertise in individual topic areas with realistic time constraints and targeted feedback.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the recommended approach when starting a new timed module test?",
    options: [
      "Jump straight into questions without reading instructions",
      "Read any instructions, note the time available, and mentally prepare",
      "Spend 10 minutes reviewing notes first",
      "Skip to the hardest questions first"
    ],
    correctIndex: 1,
    explanation: "Before starting any timed test, read the instructions carefully, note how much time you have, and take a moment to mentally prepare. This focused start helps maintain calm throughout the test."
  },
  {
    id: "check-2",
    question: "For a 15-question module test with 20 minutes, what is the target time per question?",
    options: [
      "30 seconds per question",
      "1 minute 20 seconds per question",
      "2 minutes per question",
      "3 minutes per question"
    ],
    correctIndex: 1,
    explanation: "With 20 minutes for 15 questions, you have approximately 1 minute 20 seconds (80 seconds) per question. This includes time for reading carefully and reviewing flagged questions."
  },
  {
    id: "check-3",
    question: "What is the main advantage of taking module-specific tests before full practice exams?",
    options: [
      "They are easier and build confidence",
      "They help identify specific topic weaknesses before broader assessment",
      "They take less time to complete",
      "They don't count towards your overall score"
    ],
    correctIndex: 1,
    explanation: "Module-specific tests allow you to pinpoint exactly which topics need more revision. This targeted approach is more efficient than repeatedly taking full exams and hoping to improve."
  },
  {
    id: "check-4",
    question: "After completing a module test, what should you do with questions you got wrong?",
    options: [
      "Ignore them and move on to the next test",
      "Memorise just the correct answer",
      "Study the underlying concept, not just the answer, then revisit the topic",
      "Only review them if you scored below 50%"
    ],
    correctIndex: 2,
    explanation: "Wrong answers indicate gaps in understanding. Study the underlying concept thoroughly, review the relevant course material, and ensure you understand why the correct answer is right before moving on."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "What is the primary purpose of timed module tests in exam preparation?",
    options: [
      "To replace the need for full practice exams",
      "To develop topic-specific expertise under realistic time pressure",
      "To provide easier questions for confidence building",
      "To test speed reading ability"
    ],
    correctAnswer: 1,
    explanation: "Timed module tests develop deep knowledge in specific topic areas while conditioning you to work under time pressure - both essential for exam success."
  },
  {
    id: 2,
    question: "How should module test scores guide your revision strategy?",
    options: [
      "Only revise modules where you scored below 30%",
      "Spend equal time on all modules regardless of scores",
      "Prioritise low-scoring modules while maintaining high-scoring ones",
      "Focus only on your best-performing modules"
    ],
    correctAnswer: 2,
    explanation: "Use test scores to prioritise revision - spend more time on weaker areas while ensuring you don't neglect strong areas that could slip without practice."
  },
  {
    id: 3,
    question: "What timing pattern indicates good progress in module testing?",
    options: [
      "Completing tests faster regardless of accuracy",
      "Improved accuracy while maintaining comfortable time margins",
      "Using all available time on every test",
      "Finishing with more than 50% time remaining"
    ],
    correctAnswer: 1,
    explanation: "Good progress means your accuracy improves while you still complete tests comfortably within time limits. Racing to finish quickly often leads to careless errors."
  },
  {
    id: 4,
    question: "If you consistently score 55% on BS 7671 Wiring Regulations tests, what should you do?",
    options: [
      "Keep taking the same test until you pass",
      "Move on to other modules and hope it improves",
      "Study BS 7671 material systematically, then retest after revision",
      "Accept that regulations are too difficult to learn"
    ],
    correctAnswer: 2,
    explanation: "A consistent 55% indicates a knowledge gap. Systematic study of BS 7671 using the course materials, followed by retesting, will build genuine understanding and improve scores."
  },
  {
    id: 5,
    question: "What is the benefit of repeating the same module test after a period of revision?",
    options: [
      "Memorising the questions makes it easier",
      "Measuring improvement confirms whether revision was effective",
      "It uses less mental energy the second time",
      "There is no benefit - always take different tests"
    ],
    correctAnswer: 1,
    explanation: "Repeating a test after revision provides a clear measure of improvement. If scores increase significantly, your revision was effective. If not, adjust your study approach."
  },
  {
    id: 6,
    question: "How should you interpret a score of 75% on a module test?",
    options: [
      "You have mastered this module completely",
      "You should never study this topic again",
      "You have good foundation knowledge but the 25% wrong shows areas for review",
      "The test was too easy and results don't count"
    ],
    correctAnswer: 2,
    explanation: "75% shows solid foundation knowledge, but the 25% wrong answers highlight specific areas within the module that need attention. Review those topics before moving on."
  },
  {
    id: 7,
    question: "What is the recommended frequency for taking module tests during revision?",
    options: [
      "Once per module, then never again",
      "Every day for each module",
      "Periodically - after study sessions and before full exams to track progress",
      "Only in the final week before the exam"
    ],
    correctAnswer: 2,
    explanation: "Take module tests periodically throughout your revision - after completing topic study to check understanding, and before full exams to verify retention. This spaced approach aids long-term memory."
  },
  {
    id: 8,
    question: "If you run out of time on a module test, what does this indicate?",
    options: [
      "The test was too long",
      "You need to work on that module's time management or content familiarity",
      "You should skip difficult questions entirely next time",
      "The timing requirements are unrealistic"
    ],
    correctAnswer: 1,
    explanation: "Running out of time typically indicates either unfamiliarity with the material (requiring more study) or hesitation during answering (requiring more practice with timing)."
  },
  {
    id: 9,
    question: "What should you do if you notice the same type of question causing problems across multiple module tests?",
    options: [
      "Ignore it as a coincidence",
      "Mark those question types as ones to guess on in the real exam",
      "Identify the underlying concept and address it specifically in your revision",
      "Complain that the questions are unfair"
    ],
    correctAnswer: 2,
    explanation: "Recurring problems with similar questions point to a specific conceptual gap. Identify the underlying principle and study it thoroughly - this often unlocks improvements across multiple question types."
  },
  {
    id: 10,
    question: "How do module test results compare to likely full exam performance?",
    options: [
      "Full exam scores are always lower due to stress",
      "Full exam scores are always higher due to topic mixing",
      "Module expertise typically translates well, but exam technique also matters",
      "There is no relationship between module tests and exam performance"
    ],
    correctAnswer: 2,
    explanation: "Strong module test performance provides the knowledge foundation for exam success. However, full exam technique (stamina, question mixing, time management) also influences final performance."
  },
  {
    id: 11,
    question: "What is the optimal order for completing module tests when starting exam preparation?",
    options: [
      "Always start with your strongest modules",
      "Random order doesn't matter",
      "Start with a baseline across all modules, then focus on weakest areas",
      "Only test the modules you enjoy"
    ],
    correctAnswer: 2,
    explanation: "Begin by establishing a baseline score for each module. This reveals where you currently stand across all topics and allows you to prioritise revision on your weakest areas effectively."
  },
  {
    id: 12,
    question: "What distinguishes a good module test performance from simply memorising answers?",
    options: [
      "There is no difference if you get the right answers",
      "Understanding allows you to answer new questions on the same topic correctly",
      "Memorising is actually more reliable than understanding",
      "Good performance means finishing faster"
    ],
    correctAnswer: 1,
    explanation: "True understanding means you can answer varied questions on the same topic because you grasp the underlying principles. Memorisation fails when questions are phrased differently."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How many module tests should I complete before moving to full practice exams?",
    answer: "Aim to achieve at least 65-70% consistently on each module test before attempting full practice exams. This ensures you have sufficient knowledge across all topics. Typically, this means 2-4 test attempts per module with targeted revision between attempts."
  },
  {
    question: "Should I complete all modules in one sitting or spread them across multiple sessions?",
    answer: "Spread module tests across multiple sessions. Completing 2-3 module tests per study session with breaks between them is more effective than marathoning through all modules. This prevents fatigue and allows time for reflection on weak areas."
  },
  {
    question: "What if I score well on module tests but poorly on full exams?",
    answer: "This pattern suggests exam technique issues rather than knowledge gaps. Practice with full exams focusing on: maintaining concentration across all questions, managing time across mixed topics, and building stamina for longer assessments. The knowledge is there - the technique needs development."
  },
  {
    question: "How do I use module tests effectively the week before my exam?",
    answer: "In the final week, use module tests diagnostically. Take quick tests on each module to identify any remaining weak spots. Focus revision time on those areas specifically. Avoid taking too many tests - balance testing with consolidation and rest."
  },
  {
    question: "Can I use module tests to predict my likely exam grade?",
    answer: "Module test scores provide useful indicators but aren't perfect predictors. If you're consistently achieving 70%+ across all modules, you're well-positioned for the exam. However, exam conditions, question variety, and stress can affect performance, so aim higher in practice than your target grade."
  }
];

// ============================================
// MODULE TEST CATEGORIES
// ============================================
const moduleCategories = [
  {
    name: "Health & Safety Legislation",
    topics: ["HASAWA 1974", "EAWR 1989", "RIDDOR 2013", "CDM 2015", "COSHH", "Manual Handling"],
    questions: 25,
    time: "30 mins",
    difficulty: "Standard"
  },
  {
    name: "Electrical Science Principles",
    topics: ["Ohm's Law", "Power Calculations", "AC Theory", "Magnetism", "Capacitance", "Inductance"],
    questions: 20,
    time: "25 mins",
    difficulty: "Standard"
  },
  {
    name: "BS 7671 Wiring Regulations",
    topics: ["Part 1-7", "Protection", "Earthing", "Cable Selection", "Special Locations", "Appendices"],
    questions: 30,
    time: "40 mins",
    difficulty: "Advanced"
  },
  {
    name: "Inspection & Testing",
    topics: ["Initial Verification", "Periodic Inspection", "Test Sequences", "Instruments", "EICR Coding"],
    questions: 25,
    time: "35 mins",
    difficulty: "Advanced"
  },
  {
    name: "Fault Diagnosis",
    topics: ["Fault Types", "Diagnostic Methods", "Safe Isolation", "Live Testing", "Instrument Use"],
    questions: 20,
    time: "25 mins",
    difficulty: "Standard"
  },
  {
    name: "Environmental Technologies",
    topics: ["Solar PV", "Battery Storage", "EV Charging", "Heat Pumps", "Smart Systems", "Energy Efficiency"],
    questions: 20,
    time: "25 mins",
    difficulty: "Standard"
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module8Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">

      {/* STICKY HEADER */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Build expertise in specific topic areas</li>
              <li><strong>Format:</strong> 15-30 questions per test, 20-40 minutes timed</li>
              <li><strong>Strategy:</strong> Test, identify weaknesses, revise, retest</li>
              <li><strong>Goal:</strong> 65-70%+ on each module before full exams</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Patterns in wrong answers revealing knowledge gaps</li>
              <li><strong>Use:</strong> Score tracking to guide revision priorities</li>
              <li><strong>Apply:</strong> Targeted study on weak modules before retesting</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        

        

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Value of Module-Specific Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Full practice exams test your breadth of knowledge across all topics, but module-specific tests build the depth of understanding that leads to exam success. Think of it this way: you can't pass an exam by being mediocre at everything - you need solid competence in each topic area.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Why Module Tests Are Essential:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Precision Diagnosis:</strong> Module tests pinpoint exactly which topics need work. Scoring 80% overall on a full exam might hide the fact that you're scoring 40% on electrical science and 95% on health and safety.</li>
                <li><strong>Efficient Revision:</strong> Rather than re-reading entire textbooks, module tests identify specific gaps. You can focus revision time where it matters most, making your study sessions more productive.</li>
                <li><strong>Confidence Building:</strong> Mastering modules one-by-one builds genuine confidence. You know exactly what you know - and what still needs work.</li>
                <li><strong>Time Pressure Practice:</strong> Shorter tests let you practice working under time pressure repeatedly without the fatigue of full-length exams.</li>
                <li><strong>Knowledge Reinforcement:</strong> Testing isn't just assessment - it's a learning tool. The act of retrieving information strengthens memory more effectively than passive re-reading.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Research Insight:</strong> Studies consistently show that practice testing (even without feedback) improves long-term retention more than repeated study. Testing forces active recall, which strengthens neural pathways.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Strategic Approach to Module Testing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Random testing wastes time and energy. A strategic approach to module testing accelerates your progress toward exam readiness and ensures no topic falls through the cracks.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Phase 1: Baseline</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Test each module once without prior study</li>
                  <li>Record all scores honestly</li>
                  <li>Identify weakest 2-3 modules</li>
                  <li>Note recurring question types</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Phase 2: Targeted Study</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Focus revision on weakest modules</li>
                  <li>Study concepts, not just answers</li>
                  <li>Use course materials and resources</li>
                  <li>Take notes on key principles</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Phase 3: Retest & Refine</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Retest revised modules</li>
                  <li>Compare with baseline scores</li>
                  <li>Identify remaining gaps</li>
                  <li>Continue until 65%+ achieved</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Recommended Testing Schedule:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>4 Weeks Before Exam:</strong> Complete baseline tests for all modules. Create a priority list of topics needing revision.</li>
                <li><strong>3-2 Weeks Before:</strong> Study and retest weak modules. Aim for at least 60% on every module by end of this phase.</li>
                <li><strong>1 Week Before:</strong> Quick diagnostic tests on all modules. Focus remaining time on any topics still below target.</li>
                <li><strong>Final Days:</strong> Light testing only - review but don't exhaust yourself. Consolidate strong areas rather than cramming weak ones.</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Time Investment:</strong> A complete module test cycle (baseline, study, retest) takes approximately 4-6 hours per module. Budget this time across your revision period rather than trying to cram it all into the final week.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Time Management Within Module Tests
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Module tests are shorter than full exams, but effective time management is still essential. The skills you develop in shorter tests transfer directly to longer exam sessions.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Calculating Your Time Budget:</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">20-Minute Test (15 Questions)</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>First pass: 12 minutes (48 sec/question)</li>
                    <li>Second pass: 5 minutes (flagged review)</li>
                    <li>Final check: 3 minutes</li>
                  </ul>
                </div>
                <div className="p-3 rounded bg-transparent border border-white/10">
                  <p className="text-sm font-medium text-elec-yellow/80 mb-2">30-Minute Test (25 Questions)</p>
                  <ul className="text-xs text-white/90 space-y-1">
                    <li>First pass: 20 minutes (48 sec/question)</li>
                    <li>Second pass: 7 minutes (flagged review)</li>
                    <li>Final check: 3 minutes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Pacing Checkpoints:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Quarter Mark:</strong> At 25% of time, you should have completed approximately 30% of questions (building a buffer).</li>
                <li><strong>Halfway Point:</strong> At 50% of time, aim to have 55-60% of questions answered - this leaves comfortable time for review.</li>
                <li><strong>Three-Quarter Mark:</strong> All questions should be answered (even if some are flagged). Use remaining time for review.</li>
                <li><strong>Final Minutes:</strong> Quick verification of all answers. Don't change answers without specific reason.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Common Pitfall:</strong> Many candidates spend too long on early questions when they're fresh and alert, leaving insufficient time for later questions. Maintain consistent pacing throughout - difficult questions early in the test deserve no more time than difficult questions late in the test.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Interpreting and Acting on Results
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              A test score is only valuable if you use it to improve. Developing a systematic approach to analysing your results transforms testing from assessment into accelerated learning.
            </p>

            <div className="grid grid-cols-4 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                <p className="font-medium text-red-400 mb-1">Below 50%</p>
                <p className="text-white/90 text-xs">Significant study needed</p>
              </div>
              <div className="p-3 rounded bg-orange-500/10 border border-orange-500/20">
                <p className="font-medium text-orange-400 mb-1">50-64%</p>
                <p className="text-white/90 text-xs">Core concepts need work</p>
              </div>
              <div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/20">
                <p className="font-medium text-yellow-400 mb-1">65-79%</p>
                <p className="text-white/90 text-xs">Exam ready with review</p>
              </div>
              <div className="p-3 rounded bg-green-500/10 border border-green-500/20">
                <p className="font-medium text-green-400 mb-1">80%+</p>
                <p className="text-white/90 text-xs">Strong - maintain level</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Post-Test Analysis Process:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>1. Review All Questions:</strong> Not just wrong answers - understanding why correct answers are right reinforces learning.</li>
                <li><strong>2. Categorise Errors:</strong> Were mistakes due to lack of knowledge, careless reading, time pressure, or calculation errors? Each requires different remediation.</li>
                <li><strong>3. Identify Patterns:</strong> Are certain subtopics consistently problematic? This reveals specific areas for focused study.</li>
                <li><strong>4. Note Confident Errors:</strong> Questions you felt sure about but got wrong indicate misconceptions that need correcting.</li>
                <li><strong>5. Create Action Points:</strong> For each weak area identified, note specific topics to study before retesting.</li>
              </ul>
            </div>

            <p>
              <strong>Tracking Progress:</strong> Keep a simple record of your module test scores over time. A spreadsheet or notebook entry with date, module, score, and key weaknesses identified creates a valuable revision log.
            </p>

            <p className="text-sm text-white/90 italic mt-4">
              <strong>Motivational Note:</strong> Improvement curves are rarely linear. You might see rapid gains initially as you fill obvious gaps, then slower progress as you tackle more nuanced material. This is normal - persistence pays off.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* AVAILABLE MODULE TESTS */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Available Module Tests</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {moduleCategories.map((category, index) => (
              <div key={index} className="p-4 rounded-lg bg-transparent border border-white/10 hover:border-elec-yellow/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white">{category.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    category.difficulty === 'Advanced'
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {category.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/70 mb-2">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    {category.questions} questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer className="h-3 w-3" />
                    {category.time}
                  </span>
                </div>
                <p className="text-xs text-white/60">
                  {category.topics.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Setting Up for Module Tests</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Choose a quiet time when you can focus without interruption</li>
                <li>Have scratch paper ready for calculations</li>
                <li>Set your timer before starting - honour the time limit strictly</li>
                <li>Treat each test seriously even though it's not the real exam</li>
                <li>Plan what you'll do after the test (review immediately while fresh)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">After Completing Module Tests</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Review all answers within 15 minutes of completion</li>
                <li>Read every explanation, even for correct answers</li>
                <li>Make notes on topics that need revision</li>
                <li>Schedule time to study weak areas before retesting</li>
                <li>Record your score and key observations in your revision log</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Testing without reviewing</strong> - The review is where the learning happens</li>
                <li><strong>Repeating tests too quickly</strong> - Allow time for study between attempts</li>
                <li><strong>Ignoring timing</strong> - Untimed tests don't build exam skills</li>
                <li><strong>Only focusing on weak modules</strong> - Strong modules need maintenance too</li>
                <li><strong>Memorising answers</strong> - Understanding concepts transfers to new questions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/90 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 my-12" />

        {/* QUICK REFERENCE */}
        <section className="mb-10">
          <div className="p-5 rounded-lg bg-transparent">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Module Testing Strategy</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Score Interpretation</p>
                <ul className="space-y-0.5">
                  <li>Below 50%: Major revision needed</li>
                  <li>50-64%: Core concept gaps remain</li>
                  <li>65-79%: Exam ready with light review</li>
                  <li>80%+: Strong - maintain with practice</li>
                  <li>Target: 65%+ on all modules</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Testing Cycle</p>
                <ul className="space-y-0.5">
                  <li>Baseline test (no preparation)</li>
                  <li>Identify weakest areas</li>
                  <li>Targeted revision and study</li>
                  <li>Retest to measure improvement</li>
                  <li>Repeat until targets achieved</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10">
          <Quiz
            title="Test Your Knowledge"
            questions={quizQuestions}
          />
        </section>

        {/* NAVIGATION */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Full Practice Exams
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8-section1-3">
              Next: Quick Fire Questions
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module8Section1_2;
