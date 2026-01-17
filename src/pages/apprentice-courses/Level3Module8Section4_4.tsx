/**
 * Level 3 Module 8 Section 4.4 - Exam Preparation
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
const TITLE = "Exam Preparation - Level 3 Module 8 Section 4.4";
const DESCRIPTION = "Final preparation strategies for Level 3 electrical exams. Learn what to do in the final weeks, days, and hours before your exam to maximise your chances of success.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "In the final week before your exam, you should:",
    options: [
      "Learn new topics to fill any gaps",
      "Consolidate existing knowledge and rest well",
      "Complete as many mock exams as possible",
      "Avoid all study to prevent burnout"
    ],
    correctIndex: 1,
    explanation: "The final week is too late for new learning. Focus on consolidating what you know, light revision of summaries, and ensuring you're well-rested for optimal performance."
  },
  {
    id: "check-2",
    question: "What should you prepare the night before the exam?",
    options: [
      "Nothing - prepare in the morning",
      "Just your calculator",
      "All required items: ID, calculator, pens, directions, permitted materials",
      "A list of formulas to memorise"
    ],
    correctIndex: 2,
    explanation: "Prepare everything the night before to reduce morning stress. This includes identification, approved calculator, spare pens, directions to the venue, and any permitted reference materials."
  },
  {
    id: "check-3",
    question: "When you first receive the exam paper, you should:",
    options: [
      "Start answering question 1 immediately",
      "Read through all questions first to plan your approach",
      "Find the hardest question and start there",
      "Calculate how many marks you need per question"
    ],
    correctIndex: 1,
    explanation: "Quickly scanning all questions helps you plan your time, identify easy wins, and spot any unexpected topics. It also allows your brain to start processing questions subconsciously."
  },
  {
    id: "check-4",
    question: "If you encounter a question you cannot answer during the exam, you should:",
    options: [
      "Spend extra time until you figure it out",
      "Leave it blank and never return to it",
      "Flag it, make your best attempt, and move on to return later if time permits",
      "Ask the invigilator for help"
    ],
    correctIndex: 2,
    explanation: "Don't get stuck on difficult questions. Make your best attempt, flag it for review, and move on. You may gain insight from later questions, and you protect time for questions you can answer."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "The optimal amount of sleep the night before an exam is:",
    options: [
      "4-5 hours - save time for extra revision",
      "6-8 hours - adequate rest for cognitive function",
      "10+ hours - more is better",
      "Sleep doesn't affect exam performance"
    ],
    correctAnswer: 1,
    explanation: "7-8 hours of sleep optimises memory consolidation and cognitive function. Sleep deprivation significantly impairs reasoning and recall - the exact skills needed in exams."
  },
  {
    id: 2,
    question: "On the morning of the exam, breakfast should be:",
    options: [
      "Skipped to avoid feeling sluggish",
      "A large meal to provide maximum energy",
      "A moderate, balanced meal avoiding excess sugar",
      "Whatever is most convenient"
    ],
    correctAnswer: 2,
    explanation: "A moderate breakfast with protein and complex carbohydrates provides sustained energy. Excess sugar causes energy crashes, while skipping breakfast leaves you running on empty."
  },
  {
    id: 3,
    question: "You should arrive at the exam venue:",
    options: [
      "Just before the start time",
      "15-30 minutes early to settle and prepare mentally",
      "An hour early for maximum preparation time",
      "Timing doesn't matter"
    ],
    correctAnswer: 1,
    explanation: "Arriving 15-30 minutes early allows you to find your seat, settle your nerves, and prepare mentally without the stress of rushing or excessive waiting."
  },
  {
    id: 4,
    question: "When allocating time during the exam, you should:",
    options: [
      "Spend equal time on all questions",
      "Allocate time roughly proportional to marks available",
      "Spend most time on your best topics",
      "Not worry about time until the final warning"
    ],
    correctAnswer: 1,
    explanation: "Time allocation should reflect mark weighting. A 10-mark question deserves roughly twice the time of a 5-mark question. Track your time at regular intervals."
  },
  {
    id: 5,
    question: "For multiple choice questions, if unsure of the answer:",
    options: [
      "Leave it blank",
      "Always choose option C",
      "Eliminate obviously wrong answers, then make your best choice",
      "Change your answer multiple times"
    ],
    correctAnswer: 2,
    explanation: "Eliminate obviously wrong answers first, then choose the best remaining option. Never leave multiple choice blank - there's no penalty for guessing."
  },
  {
    id: 6,
    question: "When answering calculation questions, marks are typically awarded for:",
    options: [
      "The final answer only",
      "Method shown as well as final answer",
      "Neatness of presentation",
      "Speed of completion"
    ],
    correctAnswer: 1,
    explanation: "Most calculation questions award marks for method (correct formula, substitution, working) as well as the final answer. Show your working clearly - you can gain marks even with a final calculation error."
  },
  {
    id: 7,
    question: "If you finish the exam early, you should:",
    options: [
      "Leave immediately to reduce stress",
      "Sit quietly without reviewing",
      "Review answers, particularly flagged questions and calculations",
      "Change as many answers as possible"
    ],
    correctAnswer: 2,
    explanation: "Use extra time to review flagged questions, check calculations, and ensure you haven't missed any questions. But be cautious about changing answers - first instincts are often correct."
  },
  {
    id: 8,
    question: "Reading time at the start of an exam should be used to:",
    options: [
      "Start planning your revision for next time",
      "Read and understand questions, plan your approach",
      "Calculate the maximum time per question",
      "Relax and avoid looking at the paper"
    ],
    correctAnswer: 1,
    explanation: "Use reading time actively - understand what each question is asking, note any unexpected topics, and mentally plan which questions to tackle first."
  },
  {
    id: 9,
    question: "If you realise you've made an error in an earlier answer:",
    options: [
      "Leave it - changing answers is always wrong",
      "Cross out and correct clearly if you're certain",
      "Panic and rush through remaining questions",
      "Start the exam again from the beginning"
    ],
    correctAnswer: 1,
    explanation: "If you're confident you made an error, cross it out neatly and write the correction clearly. But don't second-guess yourself on every question - only change when you have good reason."
  },
  {
    id: 10,
    question: "For questions requiring BS 7671 references (if permitted), you should:",
    options: [
      "Look up every question to be thorough",
      "Know the structure well enough to find information quickly",
      "Guess rather than waste time looking things up",
      "Memorise every regulation number"
    ],
    correctAnswer: 1,
    explanation: "If BS 7671 is permitted, knowing its structure allows quick lookups without wasting time. Practice navigating to common sections during revision."
  },
  {
    id: 11,
    question: "The best approach to questions you've never seen before is:",
    options: [
      "Skip them entirely",
      "Apply related knowledge and first principles",
      "Leave them until last and then guess",
      "Panic and assume you'll fail"
    ],
    correctAnswer: 1,
    explanation: "Apply your knowledge of related topics and first principles. Even unfamiliar questions can often be approached using fundamental concepts you do know."
  },
  {
    id: 12,
    question: "After the exam, the most productive activity is:",
    options: [
      "Immediately discuss every answer with others",
      "Begin studying for potential resits",
      "Allow yourself to decompress, then reflect on lessons learned",
      "Try to remember and record all your answers"
    ],
    correctAnswer: 2,
    explanation: "After the exam, give yourself time to decompress. Later, reflect on what went well and what you'd do differently - this helps future exams. Avoid obsessive answer comparisons."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "What if I blank out during the exam?",
    answer: "Pause, take slow deep breaths (4 seconds in, 4 out), and move to another question. Coming back to the difficult question later often helps as your brain continues processing subconsciously. Remember: some nerves are normal."
  },
  {
    question: "Should I study the night before the exam?",
    answer: "Light review only - glance over summary notes and key formulas. Do not attempt to learn new material. Cramming the night before actually impairs performance by disrupting sleep and increasing anxiety."
  },
  {
    question: "What if I'm running out of time?",
    answer: "If time is short, prioritise questions with the most marks remaining. For calculation questions, show your method even if you can't complete - method marks can be awarded. Never leave multiple choice blank."
  },
  {
    question: "Can I bring notes into the exam?",
    answer: "Check your specific exam rules carefully. Some exams are 'open book' allowing BS 7671 or specified materials. Others are 'closed book' with nothing permitted. Know the rules before exam day."
  },
  {
    question: "What should I do if I feel ill during the exam?",
    answer: "Inform the invigilator immediately. They can arrange a comfort break, provide water, or in serious cases, arrange for special consideration. Don't suffer in silence - your wellbeing matters."
  },
  {
    question: "How do I handle exam anxiety on the day?",
    answer: "Use breathing techniques (slow, deep breaths), positive self-talk ('I have prepared well'), and focus on one question at a time. Arrive early to settle. Remember that some anxiety is normal and can help performance."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module8Section4_4 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">

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
            <span>Module 8.4.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Exam Preparation
          </h1>
          <p className="text-white/80">
            Final preparation strategies for exam day success
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Final week:</strong> Consolidate, don't cram</li>
              <li><strong>Night before:</strong> Prepare everything, sleep well</li>
              <li><strong>Exam day:</strong> Arrive early, stay calm</li>
              <li><strong>During exam:</strong> Read all, plan time, show working</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> High-mark questions, familiar topics</li>
              <li><strong>Use:</strong> Time proportional to marks</li>
              <li><strong>Apply:</strong> Show method for calculations</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Plan the final week of exam preparation",
              "Prepare effectively for exam day logistics",
              "Manage your time effectively during the exam",
              "Apply strategies for different question types",
              "Handle unexpected difficulties calmly",
              "Review and learn from your exam experience"
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
            The Final Week
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The final week before your exam is not the time for intensive new learning. Focus on consolidation, confidence building, and ensuring you're physically and mentally ready.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Final Week Schedule:</p>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">7-5 Days Before</p>
                  <p className="text-white/80 mt-1">Light revision of weak areas, review summary notes, complete one final mock exam under conditions.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">4-3 Days Before</p>
                  <p className="text-white/80 mt-1">Review the mock exam results, address any surprising gaps. Review key formulas and procedures.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">2 Days Before</p>
                  <p className="text-white/80 mt-1">Light review of summary notes only. Check exam logistics - venue, time, required items.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">1 Day Before</p>
                  <p className="text-white/80 mt-1">Glance at summaries only. Prepare all equipment. Plan journey. Early night - aim for 7-8 hours sleep.</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-400 mb-2">Do:</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Review existing notes and summaries</li>
                  <li>Practice a few quick calculations</li>
                  <li>Get good sleep every night</li>
                  <li>Exercise and eat well</li>
                  <li>Visualise success</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-2">Don't:</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Learn new topics</li>
                  <li>Cram late into the night</li>
                  <li>Take multiple mock exams daily</li>
                  <li>Discuss difficult topics with anxious peers</li>
                  <li>Change your established routine</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> You can't learn everything in the final week. Trust your preparation and focus on arriving at the exam rested and confident.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Exam Day Preparation
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Exam day logistics should be planned in advance so you can focus entirely on the exam itself. Reduce stress by having everything ready the night before.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Equipment Checklist:</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-white/80">
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-2">Essential:</p>
                  <ul className="space-y-1">
                    <li>Photo ID (passport, driving licence)</li>
                    <li>Exam confirmation/entry details</li>
                    <li>Approved calculator (with fresh batteries)</li>
                    <li>Black pens (at least 2)</li>
                    <li>Pencil and eraser</li>
                  </ul>
                </div>
                <div>
                  <p className="text-elec-yellow/80 font-medium mb-2">If Permitted:</p>
                  <ul className="space-y-1">
                    <li>BS 7671 (check if allowed)</li>
                    <li>On-Site Guide (check if allowed)</li>
                    <li>Any specified reference materials</li>
                    <li>Clear pencil case/bag</li>
                    <li>Watch (non-smart)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Exam Morning Timeline:</p>
              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70 font-mono">T-2hrs:</span>
                  <span>Wake up (avoid rushing). Light exercise or stretching if helpful.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70 font-mono">T-1.5hrs:</span>
                  <span>Moderate breakfast - protein, complex carbs, avoid excess sugar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70 font-mono">T-1hr:</span>
                  <span>Final check of equipment. Brief glance at key formulas if desired.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70 font-mono">T-30min:</span>
                  <span>Leave for venue (allow extra time for delays).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70 font-mono">T-15min:</span>
                  <span>Arrive at venue. Find seat. Visit bathroom. Settle.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Mental Preparation:</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Positive self-talk: "I have prepared well", "I know this material"</li>
                <li>Visualise yourself working calmly through the exam</li>
                <li>Accept some nervousness as normal and helpful</li>
                <li>Focus on what you CAN do, not what you might not know</li>
                <li>Remember: one exam doesn't define you</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Pro Tip:</strong> Avoid discussing exam topics with other candidates immediately before. Their anxiety is contagious, and last-minute doubts aren't helpful.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            During the Exam
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Effective exam technique can make a significant difference to your result. A methodical approach helps you demonstrate your knowledge effectively.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Exam Strategy Sequence:</p>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">1. Read Instructions (2-3 mins)</p>
                  <p className="text-white/80 mt-1">Check total marks, number of questions, any compulsory sections, and allowed materials. Note any surprises.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">2. Scan All Questions (5-10 mins)</p>
                  <p className="text-white/80 mt-1">Read through all questions. Note topics covered, mark allocations, and identify your strongest questions.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">3. Plan Time Allocation</p>
                  <p className="text-white/80 mt-1">Roughly allocate time proportional to marks. Note target times for each section.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">4. Answer Strategically</p>
                  <p className="text-white/80 mt-1">Start with your strongest topics to build confidence. Flag difficult questions for later review.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">5. Review (Final 10-15 mins)</p>
                  <p className="text-white/80 mt-1">Return to flagged questions. Check calculations. Ensure all questions attempted.</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Multiple Choice Tips:</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Read the question fully before looking at options</li>
                  <li>Eliminate obviously wrong answers first</li>
                  <li>Watch for absolute words (always, never) - often wrong</li>
                  <li>Trust your first instinct unless certain it's wrong</li>
                  <li>Never leave blank - guess if unsure</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Tips:</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Write the formula before substituting</li>
                  <li>Show all working clearly</li>
                  <li>Check units throughout</li>
                  <li>Sanity check - is the answer reasonable?</li>
                  <li>State the final answer clearly</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Common Exam Mistakes:</p>
              <ul className="text-xs text-white/90 space-y-1">
                <li><strong>Not reading carefully:</strong> Missing key words like "NOT" or specific conditions</li>
                <li><strong>Time mismanagement:</strong> Spending too long on one question</li>
                <li><strong>Leaving questions blank:</strong> Even a guess is better than nothing</li>
                <li><strong>Not showing working:</strong> Missing method marks on calculations</li>
                <li><strong>Changing correct answers:</strong> Second-guessing your knowledge</li>
                <li><strong>Rushing at the end:</strong> Careless errors when time is short</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Point:</strong> Marks are awarded for what you write. Show your knowledge - never leave a question completely blank if you have any relevant information.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Handling Difficulties and After the Exam
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Even with excellent preparation, you may encounter unexpected difficulties. Having strategies ready helps you stay calm and maximise your performance.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">If You Blank Out:</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Stop, close eyes, breathe slowly (4-4-4)</li>
                  <li>Move to a different question</li>
                  <li>Return later - answer often comes</li>
                  <li>Write anything relevant you can remember</li>
                  <li>Trust your preparation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">If Running Out of Time:</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Prioritise highest-mark questions remaining</li>
                  <li>Write key points in bullet form if needed</li>
                  <li>Show method even without full working</li>
                  <li>Answer all multiple choice (no blank)</li>
                  <li>Stay calm - panic wastes more time</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">After the Exam:</p>
              <div className="space-y-3 text-sm text-white/80">
                <p><strong>Immediately after:</strong> Allow yourself to decompress. Avoid obsessive answer comparisons with others - it often increases anxiety without benefit.</p>
                <p><strong>Same day:</strong> Do something enjoyable and unrelated to the exam. You've earned a break regardless of how it went.</p>
                <p><strong>Within a week:</strong> Brief reflection - what went well? What would you do differently? This helps future exams without dwelling.</p>
                <p><strong>Results:</strong> If you pass, celebrate! If not, analyse objectively and plan next steps. One exam doesn't define your career.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Post-Exam Reflection Questions:</p>
              <ul className="text-xs text-white/80 space-y-1">
                <li>Did I manage my time effectively?</li>
                <li>Were there topics I wish I'd reviewed more?</li>
                <li>Did my exam technique help or hinder me?</li>
                <li>How well did I handle anxiety?</li>
                <li>What will I do differently for future exams?</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Final Thought:</strong> Remember that exams are a means to an end - demonstrating competence in your chosen field. Whatever the result, your value as a person and professional extends far beyond a single exam score.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Final Day Checklist</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Equipment packed (ID, calculator, pens)</li>
                <li>Journey planned with spare time</li>
                <li>Light breakfast eaten</li>
                <li>Positive mindset established</li>
                <li>Phone on silent/switched off</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During-Exam Reminders</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Read questions carefully (twice if needed)</li>
                <li>Allocate time proportional to marks</li>
                <li>Show all working for calculations</li>
                <li>Flag and return to difficult questions</li>
                <li>Never leave questions blank</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Emergency Strategies</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Blank mind: breathe, move on, return later</li>
                <li>Running late: priorities highest marks remaining</li>
                <li>Feeling unwell: inform invigilator immediately</li>
                <li>Calculator fails: know manual backup methods</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Exam Day</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Time Allocation</p>
                <ul className="space-y-0.5">
                  <li>Read instructions: 2-3 mins</li>
                  <li>Scan questions: 5-10 mins</li>
                  <li>Answer (proportional to marks)</li>
                  <li>Review: final 10-15 mins</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Key Reminders</p>
                <ul className="space-y-0.5">
                  <li>Read carefully - watch for NOT</li>
                  <li>Show all calculation working</li>
                  <li>Never leave blank</li>
                  <li>Trust your preparation</li>
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
            <Link to="/study-centre/apprentice/level3-module8-section4-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Improvement Strategies
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8-section4">
              Back to Section 4
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module8Section4_4;
