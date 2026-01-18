/**
 * Level 3 Module 8 Section 4.2 - Results Analysis
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 */

import { ArrowLeft, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Results Analysis - Level 3 Module 8 Section 4.2";
const DESCRIPTION = "Learn to analyse your mock exam results effectively. Identify patterns in your performance, understand common weak areas, and develop targeted revision strategies.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "You scored 45% on inspection and testing questions across three mock exams. What does this indicate?",
    options: [
      "Random variation in questions",
      "A consistent weak area requiring focused revision",
      "The questions were too difficult",
      "No action needed if overall pass achieved"
    ],
    correctIndex: 1,
    explanation: "Consistent low scores in a specific topic area indicate a genuine knowledge gap. This requires targeted revision on inspection and testing rather than general study."
  },
  {
    id: "check-2",
    question: "When analysing wrong answers, which approach is most effective?",
    options: [
      "Simply note the correct answer and move on",
      "Understand WHY the answer was wrong and what concept you misunderstood",
      "Focus only on questions you got completely wrong",
      "Skip analysis if you scored above 60%"
    ],
    correctIndex: 1,
    explanation: "Understanding the underlying concept you misunderstood is crucial. This prevents similar errors and builds deeper understanding rather than just memorising correct answers."
  },
  {
    id: "check-3",
    question: "Your time analysis shows you spent 3 minutes on calculation questions but only 30 seconds on theory questions. What action should you take?",
    options: [
      "No action - calculations naturally take longer",
      "Rush calculations to match theory time",
      "Practice calculation techniques to improve speed while maintaining accuracy",
      "Skip difficult calculations in the actual exam"
    ],
    correctIndex: 2,
    explanation: "While calculations do take longer, 3 minutes per question may indicate inefficiency. Practice calculation techniques to improve speed without sacrificing accuracy."
  },
  {
    id: "check-4",
    question: "You consistently score well on BS 7671 regulation references but poorly on practical application questions. What does this suggest?",
    options: [
      "You should focus more on memorising regulations",
      "You understand the rules but struggle to apply them in context",
      "Application questions are unfair",
      "No improvement needed"
    ],
    correctIndex: 1,
    explanation: "This pattern suggests you can recall regulations but struggle to apply them to practical scenarios. Focus revision on worked examples and case studies that apply regulations in context."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "The primary purpose of analysing mock exam results is to:",
    options: [
      "Calculate your overall percentage score",
      "Compare your results with other candidates",
      "Identify specific areas needing improvement",
      "Predict your final exam result"
    ],
    correctAnswer: 2,
    explanation: "While overall scores are useful, the main purpose of analysis is to identify specific weak areas so you can target your revision effectively."
  },
  {
    id: 2,
    question: "When categorising questions by topic, you should look for:",
    options: [
      "The easiest topics to revise",
      "Patterns showing consistent strengths and weaknesses",
      "Topics with the most questions",
      "Only topics you enjoy"
    ],
    correctAnswer: 1,
    explanation: "Looking for patterns across multiple mock exams reveals genuine strengths and weaknesses rather than one-off variations."
  },
  {
    id: 3,
    question: "If you consistently run out of time in mock exams, the best response is to:",
    options: [
      "Work faster without checking answers",
      "Analyse which question types take longest and practice those",
      "Skip difficult questions entirely",
      "Request extra time in the real exam"
    ],
    correctAnswer: 1,
    explanation: "Analysing time spent per question type reveals where you need to improve efficiency. Targeted practice on slow areas improves speed while maintaining accuracy."
  },
  {
    id: 4,
    question: "A useful metric for tracking improvement over time is:",
    options: [
      "Only the final overall percentage",
      "Performance by topic area across multiple attempts",
      "Number of questions attempted",
      "Time taken regardless of accuracy"
    ],
    correctAnswer: 1,
    explanation: "Tracking performance by topic across multiple attempts shows whether your targeted revision is working and where further focus is needed."
  },
  {
    id: 5,
    question: "When reviewing wrong answers, you discover you misread the question. This suggests:",
    options: [
      "The question was poorly written",
      "You need to practice reading questions more carefully",
      "This type of error is unavoidable",
      "You knew the correct answer anyway"
    ],
    correctAnswer: 1,
    explanation: "Misreading questions is a common error that can be reduced with practice. Develop a habit of re-reading questions before answering, especially under time pressure."
  },
  {
    id: 6,
    question: "You scored 70% overall but only 40% on cable sizing calculations. Your revision priority should be:",
    options: [
      "General revision across all topics",
      "Focus heavily on cable sizing calculations",
      "Only revise topics you enjoy",
      "No revision needed with 70% overall"
    ],
    correctAnswer: 1,
    explanation: "A significant gap in one topic area should be addressed specifically. Cable sizing is also likely to appear in the real exam, making it a high priority."
  },
  {
    id: 7,
    question: "Tracking your confidence level alongside actual performance helps identify:",
    options: [
      "Questions that are too easy",
      "Topics where you are overconfident or underconfident",
      "Whether you should trust your instincts",
      "The best time of day to study"
    ],
    correctAnswer: 1,
    explanation: "Comparing confidence with actual results reveals where you might be overconfident (high confidence but wrong) or underconfident (low confidence but correct)."
  },
  {
    id: 8,
    question: "When analysing patterns in wrong answers, discovering that you consistently chose option B suggests:",
    options: [
      "Option B is usually wrong",
      "Random chance variation",
      "Possible unconscious bias toward certain answer positions",
      "The mock exams are poorly designed"
    ],
    correctAnswer: 2,
    explanation: "Consistent patterns in answer choice positions may indicate unconscious bias. Being aware of this helps you evaluate each option more objectively."
  },
  {
    id: 9,
    question: "The most valuable type of wrong answer to analyse is:",
    options: [
      "Questions you guessed on",
      "Questions you were confident about but got wrong",
      "Questions on unfamiliar topics",
      "Questions with confusing wording"
    ],
    correctAnswer: 1,
    explanation: "Confidently wrong answers reveal misconceptions or misunderstandings that you're not aware of. These need careful analysis to correct your understanding."
  },
  {
    id: 10,
    question: "Creating a revision log after results analysis should include:",
    options: [
      "Only topics you scored below 50% on",
      "Weak topics, specific misconceptions, and planned revision activities",
      "A list of all topics in the syllabus",
      "Just the questions you got wrong"
    ],
    correctAnswer: 1,
    explanation: "An effective revision log includes weak topics, the specific concepts misunderstood, and concrete revision activities planned to address each gap."
  },
  {
    id: 11,
    question: "If your performance varies significantly between mock exams on the same topics, this might indicate:",
    options: [
      "The mock exams have different difficulty levels",
      "Your knowledge is inconsistent and needs consolidation",
      "You should only trust your best score",
      "The topics are not important"
    ],
    correctAnswer: 1,
    explanation: "Variable performance on the same topics suggests your knowledge is not yet solid. Further study and practice is needed to consolidate your understanding."
  },
  {
    id: 12,
    question: "After completing results analysis, the next step should be:",
    options: [
      "Take another mock exam immediately",
      "Create a targeted revision plan addressing identified weaknesses",
      "Rest and avoid thinking about results",
      "Compare results with classmates"
    ],
    correctAnswer: 1,
    explanation: "Results analysis is only valuable if followed by targeted action. Create a specific revision plan that addresses the weaknesses and misconceptions you identified."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How many mock exams should I analyse before identifying patterns?",
    answer: "Ideally, analyse at least 3-4 mock exams to identify reliable patterns. Single exam results may reflect random variation or one-off errors rather than genuine knowledge gaps."
  },
  {
    question: "Should I analyse every wrong answer in detail?",
    answer: "Focus detailed analysis on questions you were confident about but got wrong, and questions in recurring weak topic areas. Quick guesses on unfamiliar topics simply need more study on that topic."
  },
  {
    question: "How do I track time spent per question in mock exams?",
    answer: "Use timestamps at regular intervals (every 10-15 questions) or time individual question types separately. Some online mock exams track this automatically."
  },
  {
    question: "What if I score well on mocks but poorly in real exams?",
    answer: "This often indicates exam anxiety or unfamiliarity with exam conditions. Practice under realistic conditions - timed, no notes, quiet environment - to reduce the gap between mock and real performance."
  },
  {
    question: "How often should I re-analyse my results?",
    answer: "Review your overall progress weekly, but conduct deep analysis after completing 2-3 new mock exams. This gives enough data to spot new patterns while maintaining focus on improvement."
  },
  {
    question: "Should I analyse mocks from different providers differently?",
    answer: "Yes, different providers may emphasise different topics. Track which provider's mocks you're using and note any patterns - but focus on your own performance patterns across all sources."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module8Section4_2 = () => {
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
            <Link to="/study-centre/apprentice/level3-module8-section4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      {/* MAIN ARTICLE CONTENT */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* HEADER */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Zap className="h-4 w-4" />
            <span>Module 8.4.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Results Analysis
          </h1>
          <p className="text-white/80">
            Transform your mock exam results into actionable improvement strategies
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Categorise:</strong> Group results by topic area</li>
              <li><strong>Pattern:</strong> Look for consistent strengths/weaknesses</li>
              <li><strong>Understand:</strong> Analyse WHY answers were wrong</li>
              <li><strong>Action:</strong> Create targeted revision plan</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Recurring weak topics across multiple exams</li>
              <li><strong>Use:</strong> Topic-by-topic percentage tracking</li>
              <li><strong>Apply:</strong> Focus revision on identified gaps</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Categorise mock exam results by topic area",
              "Identify patterns in performance across multiple attempts",
              "Analyse individual wrong answers to understand misconceptions",
              "Track time management and identify efficiency issues",
              "Compare confidence levels with actual performance",
              "Create actionable revision plans from analysis findings"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* CONTENT SECTION 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            Categorising Results by Topic
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective results analysis begins with categorising your answers by topic area. This reveals where your strengths and weaknesses truly lie, rather than relying on overall percentage scores alone.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Key Topic Categories for Level 3:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-2">Technical Topics:</p>
                  <ul className="text-white/80 space-y-1">
                    <li>Electrical science and principles</li>
                    <li>Circuit design and calculations</li>
                    <li>Cable sizing and selection</li>
                    <li>Protection and earthing systems</li>
                    <li>Testing and inspection</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-2">Regulatory Topics:</p>
                  <ul className="text-white/80 space-y-1">
                    <li>BS 7671 Wiring Regulations</li>
                    <li>Health and safety legislation</li>
                    <li>Building regulations</li>
                    <li>Documentation requirements</li>
                    <li>Special locations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Example Topic Analysis:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-elec-yellow/80">Topic Area</th>
                      <th className="text-left py-2 text-elec-yellow/80">Questions</th>
                      <th className="text-left py-2 text-elec-yellow/80">Correct</th>
                      <th className="text-left py-2 text-elec-yellow/80">%</th>
                      <th className="text-left py-2 text-elec-yellow/80">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80">
                    <tr className="border-b border-white/5">
                      <td className="py-2">Cable calculations</td>
                      <td className="py-2">8</td>
                      <td className="py-2">3</td>
                      <td className="py-2 text-red-400">38%</td>
                      <td className="py-2 text-red-400">High</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Testing procedures</td>
                      <td className="py-2">6</td>
                      <td className="py-2">3</td>
                      <td className="py-2 text-yellow-400">50%</td>
                      <td className="py-2 text-yellow-400">Medium</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">BS 7671 references</td>
                      <td className="py-2">10</td>
                      <td className="py-2">8</td>
                      <td className="py-2 text-green-400">80%</td>
                      <td className="py-2 text-green-400">Low</td>
                    </tr>
                    <tr>
                      <td className="py-2">Protection systems</td>
                      <td className="py-2">6</td>
                      <td className="py-2">4</td>
                      <td className="py-2 text-yellow-400">67%</td>
                      <td className="py-2 text-yellow-400">Medium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Insight:</strong> This analysis reveals that despite an overall score around 60%, cable calculations need urgent attention while BS 7671 references are a strength.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Analysing Wrong Answers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Understanding WHY you got questions wrong is more valuable than simply noting the correct answer. Different types of errors require different remediation strategies.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Knowledge Gaps</p>
                <p className="text-xs text-white/80 mb-2">You didn't know the answer because you haven't learned that topic thoroughly.</p>
                <p className="text-xs text-white/60"><strong>Action:</strong> Study the topic in depth from textbooks or course materials.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Misconceptions</p>
                <p className="text-xs text-white/80 mb-2">You thought you knew the answer but had incorrect understanding.</p>
                <p className="text-xs text-white/60"><strong>Action:</strong> Identify and correct the specific misunderstanding.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Application Errors</p>
                <p className="text-xs text-white/80 mb-2">You know the theory but struggled to apply it to the specific scenario.</p>
                <p className="text-xs text-white/60"><strong>Action:</strong> Practice applying knowledge to varied scenarios.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Careless Errors</p>
                <p className="text-xs text-white/80 mb-2">Misread the question, calculation mistakes, or selected wrong option.</p>
                <p className="text-xs text-white/60"><strong>Action:</strong> Develop checking habits and slow down on key steps.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Error Analysis Template:</p>
              <div className="text-xs text-white/80 space-y-2">
                <p><strong>Question:</strong> What is the maximum Zs for a 32A Type B MCB?</p>
                <p><strong>Your answer:</strong> 1.44 ohms</p>
                <p><strong>Correct answer:</strong> 1.15 ohms</p>
                <p><strong>Error type:</strong> Misconception</p>
                <p><strong>Analysis:</strong> Confused Zs values for Type B and Type C MCBs. Type B operates at 3-5 times In, Type C at 5-10 times In.</p>
                <p><strong>Action:</strong> Create comparison table of Zs values for different MCB types and protective device ratings.</p>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Pro Tip:</strong> Keep a "misconceptions log" of concepts you've misunderstood. Review this regularly to reinforce correct understanding.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Time and Performance Patterns
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Analysing how you spend your time during mock exams reveals efficiency issues that may be costing you marks. Combine time analysis with performance analysis for complete insight.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Time Analysis Considerations:</p>
              <ul className="text-sm text-white/80 space-y-2">
                <li><strong>Average time per question:</strong> Exam time divided by questions gives target (e.g., 2 mins for 60 questions in 2 hours)</li>
                <li><strong>Calculation questions:</strong> These typically take longer - aim for no more than 3 minutes each</li>
                <li><strong>Theory questions:</strong> Should be quicker if you know the answer - under 1 minute</li>
                <li><strong>Review time:</strong> Aim to finish with 10-15 minutes to review flagged questions</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Performance Pattern Indicators:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-elec-yellow/80">Pattern</th>
                      <th className="text-left py-2 text-elec-yellow/80">Possible Cause</th>
                      <th className="text-left py-2 text-elec-yellow/80">Suggested Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80 text-xs">
                    <tr className="border-b border-white/5">
                      <td className="py-2">Strong start, weak finish</td>
                      <td className="py-2">Fatigue or time pressure</td>
                      <td className="py-2">Practice exam stamina, time management</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Weak start, strong finish</td>
                      <td className="py-2">Exam anxiety settling</td>
                      <td className="py-2">Relaxation techniques, practice conditions</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Random variation</td>
                      <td className="py-2">Inconsistent knowledge</td>
                      <td className="py-2">Consolidate understanding across topics</td>
                    </tr>
                    <tr>
                      <td className="py-2">Calculations always slow</td>
                      <td className="py-2">Method uncertainty</td>
                      <td className="py-2">Practice calculation techniques</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Warning Signs to Watch For:</p>
              <ul className="text-xs text-white/90 space-y-1">
                <li>Leaving multiple questions unanswered due to time</li>
                <li>Changing correct answers to wrong ones during review</li>
                <li>Spending over 4 minutes on single questions</li>
                <li>Performance declining significantly in final third of exam</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Target:</strong> Aim to complete all questions with 10-15 minutes remaining for review. If you consistently run out of time, this is a priority issue to address.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Creating Actionable Insights
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Analysis is only valuable if it leads to action. Convert your findings into a structured revision plan that addresses specific identified weaknesses.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">From Analysis to Action:</p>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 1: Prioritise Topics</p>
                  <p className="text-white/80 mt-1">Rank weak topics by both your score AND their importance/frequency in exams</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 2: Identify Root Causes</p>
                  <p className="text-white/80 mt-1">For each weak topic, determine if it's knowledge gaps, misconceptions, or application problems</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 3: Plan Specific Activities</p>
                  <p className="text-white/80 mt-1">Match revision activities to root causes - reading for gaps, corrections for misconceptions, practice for application</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 4: Schedule and Track</p>
                  <p className="text-white/80 mt-1">Allocate time to each activity and track completion and subsequent improvement</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Example Revision Plan Entry:</p>
              <div className="text-xs text-white/80 space-y-2 font-mono">
                <p><strong>Weak Area:</strong> Cable sizing for voltage drop (38% score)</p>
                <p><strong>Root Cause:</strong> Uncertain on formula application, mixing up mV/A/m values</p>
                <p><strong>Activities:</strong></p>
                <ul className="ml-4 space-y-1">
                  <li>1. Review BS 7671 Appendix 4 tables - 30 mins</li>
                  <li>2. Work through 10 voltage drop examples - 1 hour</li>
                  <li>3. Create formula reference card - 20 mins</li>
                  <li>4. Complete topic quiz (minimum 80%) - 30 mins</li>
                </ul>
                <p><strong>Deadline:</strong> Complete within 3 days</p>
                <p><strong>Verification:</strong> Re-attempt related questions from mock exams</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Progress Tracking Metrics:</p>
              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">1.</span>
                  <span>Topic scores before and after targeted revision</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">2.</span>
                  <span>Number of misconceptions identified and corrected</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">3.</span>
                  <span>Time efficiency improvement on calculation questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">4.</span>
                  <span>Overall trend in mock exam scores</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Remember:</strong> Effective analysis leads to focused revision. Spending 1 hour on a genuine weak area is more valuable than 3 hours of unfocused general revision.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Analysis Best Practices</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Analyse results within 24-48 hours while memory is fresh</li>
                <li>Use a spreadsheet to track results across multiple mock exams</li>
                <li>Focus on patterns rather than individual question results</li>
                <li>Be honest about genuine weaknesses - they won't improve by ignoring them</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">When to Seek Additional Help</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Consistent score below 50% despite targeted revision</li>
                <li>Unable to understand why your answer was wrong</li>
                <li>Time management issues not improving with practice</li>
                <li>Anxiety significantly affecting performance</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Analysis Mistakes</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Only looking at overall percentage, ignoring topic breakdown</li>
                <li>Just noting correct answers without understanding why</li>
                <li>Analysing without creating an action plan</li>
                <li>Comparing results with others rather than tracking own progress</li>
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
          <div className="p-5 rounded-lg bg-transparent border border-elec-yellow/20">
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Results Analysis</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Analysis Steps</p>
                <ul className="space-y-0.5">
                  <li>1. Categorise by topic</li>
                  <li>2. Calculate topic percentages</li>
                  <li>3. Identify error types</li>
                  <li>4. Note time patterns</li>
                  <li>5. Create action plan</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Priority Indicators</p>
                <ul className="space-y-0.5">
                  <li>High: Below 50% consistently</li>
                  <li>Medium: 50-70% or variable</li>
                  <li>Low: Above 70% consistently</li>
                  <li>Focus on high-weight topics first</li>
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
            <Link to="/study-centre/apprentice/level3-module8-section4-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Performance Tracking
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8-section4-3">
              Next: Improvement Strategies
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module8Section4_2;
