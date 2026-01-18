/**
 * Level 3 Module 8 Section 4.3 - Improvement Strategies
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
const TITLE = "Improvement Strategies - Level 3 Module 8 Section 4.3";
const DESCRIPTION = "Develop effective strategies to improve your exam performance. Learn targeted revision techniques, memory aids, calculation shortcuts, and approaches to overcome weak areas.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "Which revision technique is most effective for understanding complex concepts?",
    options: [
      "Reading the same material multiple times",
      "Active recall - testing yourself without looking at notes",
      "Highlighting key passages in textbooks",
      "Watching videos at 2x speed"
    ],
    correctIndex: 1,
    explanation: "Active recall forces your brain to retrieve information, strengthening memory pathways. It's significantly more effective than passive re-reading or highlighting."
  },
  {
    id: "check-2",
    question: "You struggle with voltage drop calculations. The best improvement strategy is:",
    options: [
      "Avoid voltage drop questions in exams",
      "Read more theory about voltage drop",
      "Practice 20+ varied voltage drop problems until the method becomes automatic",
      "Memorise all possible voltage drop answers"
    ],
    correctIndex: 2,
    explanation: "Calculation skills improve through deliberate practice. Working through many varied problems builds fluency and helps you recognise different question formats."
  },
  {
    id: "check-3",
    question: "Spaced repetition means:",
    options: [
      "Studying the same topic in one long session",
      "Taking regular breaks during study",
      "Reviewing material at increasing intervals over time",
      "Spacing out exam attempts"
    ],
    correctIndex: 2,
    explanation: "Spaced repetition involves reviewing material just before you're about to forget it, at gradually increasing intervals. This is highly effective for long-term retention."
  },
  {
    id: "check-4",
    question: "When creating mnemonics for exam revision, they should be:",
    options: [
      "As long as possible for more detail",
      "Personal, memorable, and linked to what you're learning",
      "Copied from standard textbooks",
      "Avoided as they don't work for technical subjects"
    ],
    correctIndex: 1,
    explanation: "Effective mnemonics are personal and memorable to you. Creating your own links the information to your existing knowledge, making it easier to recall."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "The most effective way to improve weak calculation skills is:",
    options: [
      "Watch someone else solve problems",
      "Memorise formulas without practice",
      "Work through many practice problems, checking method",
      "Focus only on theory to understand concepts"
    ],
    correctAnswer: 2,
    explanation: "Calculation skills require practice. Working through problems yourself, then checking your method against correct solutions, builds fluency and identifies specific errors."
  },
  {
    id: 2,
    question: "Active recall in revision involves:",
    options: [
      "Reading notes while highlighting key points",
      "Testing yourself without looking at materials",
      "Listening to recordings of lectures",
      "Discussing topics with study partners only"
    ],
    correctAnswer: 1,
    explanation: "Active recall means retrieving information from memory without cues. This could be flashcards, practice questions, or explaining concepts from memory."
  },
  {
    id: 3,
    question: "When is the optimal time to review new material using spaced repetition?",
    options: [
      "Only once, thoroughly",
      "Every day for the first week",
      "Just before you're about to forget it",
      "Only when preparing for exams"
    ],
    correctAnswer: 2,
    explanation: "Spaced repetition is most effective when you review just before forgetting. Typical intervals might be 1 day, 3 days, 1 week, 2 weeks, 1 month."
  },
  {
    id: 4,
    question: "For improving exam time management, you should:",
    options: [
      "Always work as fast as possible",
      "Practice under timed conditions regularly",
      "Skip difficult questions without reading them",
      "Spend equal time on all questions"
    ],
    correctAnswer: 1,
    explanation: "Regular timed practice builds awareness of pacing and helps identify which question types need faster technique. This makes time management automatic in the real exam."
  },
  {
    id: 5,
    question: "The Pomodoro Technique involves:",
    options: [
      "Studying only in the morning",
      "Working in focused 25-minute intervals with short breaks",
      "Completing one topic per day",
      "Studying with background music"
    ],
    correctAnswer: 1,
    explanation: "The Pomodoro Technique uses 25-minute focused work periods followed by 5-minute breaks. This maintains concentration and prevents mental fatigue."
  },
  {
    id: 6,
    question: "Interleaving in study means:",
    options: [
      "Studying one topic exhaustively before moving on",
      "Mixing different topics or problem types in one session",
      "Taking notes between paragraphs",
      "Alternating between reading and watching videos"
    ],
    correctAnswer: 1,
    explanation: "Interleaving involves mixing different topics rather than blocking them. This improves discrimination between similar concepts and reflects how exam questions mix topics."
  },
  {
    id: 7,
    question: "When you encounter a concept you don't understand, the best approach is:",
    options: [
      "Skip it and hope it's not in the exam",
      "Mark it for later and continue with easier material",
      "Spend unlimited time until you understand it",
      "Note it, try different resources, then seek help if needed"
    ],
    correctAnswer: 3,
    explanation: "Note the difficulty, try alternative explanations (different books, videos), and if still stuck, seek help from tutors or peers. Don't let one concept block all progress."
  },
  {
    id: 8,
    question: "Creating your own summary notes is effective because:",
    options: [
      "It saves time compared to reading textbooks",
      "The act of processing and writing reinforces learning",
      "Summary notes are always complete",
      "It's easier than practice questions"
    ],
    correctAnswer: 1,
    explanation: "Creating summaries requires processing information, making decisions about what's important, and expressing it in your own words - all of which reinforce learning."
  },
  {
    id: 9,
    question: "Teaching a concept to someone else helps you because:",
    options: [
      "It transfers your knowledge to them",
      "It forces you to organise and explain, revealing gaps",
      "It counts as extra study time",
      "Other people always know more than you"
    ],
    correctAnswer: 1,
    explanation: "Explaining concepts forces you to organise your understanding and express it clearly. Gaps in your knowledge become obvious when you can't explain something coherently."
  },
  {
    id: 10,
    question: "For technical subjects like electrical installation, the best ratio of theory to practice is:",
    options: [
      "90% theory, 10% practice",
      "50% theory, 50% practice",
      "20-30% theory, 70-80% practice",
      "Theory only, practice isn't needed for exams"
    ],
    correctAnswer: 2,
    explanation: "Technical subjects require applying knowledge. After understanding theory, spend most time practicing application through problems, questions, and calculations."
  },
  {
    id: 11,
    question: "When exam anxiety affects your performance, an effective strategy is:",
    options: [
      "Avoid thinking about the exam until the day",
      "Practice under realistic exam conditions to build familiarity",
      "Study harder in the final week to feel more prepared",
      "Accept that anxiety is unavoidable"
    ],
    correctAnswer: 1,
    explanation: "Familiarity reduces anxiety. Practice under realistic conditions - timed, silent, no notes - so the exam environment feels familiar rather than threatening."
  },
  {
    id: 12,
    question: "The best way to remember BS 7671 regulation references is:",
    options: [
      "Read through all regulations repeatedly",
      "Memorise every regulation number",
      "Understand the structure and use it with practice",
      "Don't bother - you can look them up in the exam"
    ],
    correctAnswer: 2,
    explanation: "Understanding BS 7671's structure (Parts, Chapters, Sections) and regularly using it during practice builds familiarity. You'll naturally remember key references through use."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How much should I study each day for exam preparation?",
    answer: "Quality matters more than quantity. 2-3 hours of focused, active study (with breaks) is more effective than 6 hours of passive reading. Consistency is key - daily shorter sessions beat occasional long sessions."
  },
  {
    question: "Should I focus on weak areas or strengthen my strong areas?",
    answer: "Prioritise weak areas that are likely to appear in exams, but don't neglect strong areas entirely. A good split is 70% on weak areas, 30% maintaining strengths. In final week, focus more on consolidating."
  },
  {
    question: "How do I stay motivated during long revision periods?",
    answer: "Set specific, achievable goals for each session. Track your progress visibly. Reward yourself for hitting targets. Study in focused blocks with breaks. Remember your end goal and visualise success."
  },
  {
    question: "Are study groups effective for exam preparation?",
    answer: "Study groups can be effective for explaining concepts to each other, discussing difficult topics, and staying accountable. However, ensure the group stays focused - social chat reduces effectiveness."
  },
  {
    question: "What should I do the day before the exam?",
    answer: "Light review only - no new material. Brief look at summary notes and key formulas. Get equipment ready (calculator, pens, ID). Plan your journey. Early night for good sleep. Avoid cramming."
  },
  {
    question: "How do I improve my reading speed for exam questions?",
    answer: "Practice reading questions carefully but efficiently. Train yourself to identify key information quickly - values, conditions, what's being asked. Regular timed practice improves reading speed naturally."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module8Section4_3 = () => {
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
            <span>Module 8.4.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Improvement Strategies
          </h1>
          <p className="text-white/80">
            Evidence-based techniques to maximise your exam preparation effectiveness
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Active recall:</strong> Test yourself, don't just read</li>
              <li><strong>Spaced repetition:</strong> Review at increasing intervals</li>
              <li><strong>Practice:</strong> 70-80% of study time on application</li>
              <li><strong>Targeted:</strong> Focus on identified weak areas</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Topics causing consistent errors</li>
              <li><strong>Use:</strong> Deliberate practice on weak areas</li>
              <li><strong>Apply:</strong> Time yourself to build exam readiness</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Apply evidence-based revision techniques",
              "Develop effective memory strategies and mnemonics",
              "Improve calculation speed and accuracy",
              "Build effective time management skills",
              "Overcome exam anxiety through preparation",
              "Create and follow a structured improvement plan"
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
            Evidence-Based Revision Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Research into learning and memory has identified specific techniques that significantly improve retention and recall. These methods are more effective than passive reading or highlighting.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Active Recall</p>
                <p className="text-xs text-white/80 mb-2">Test yourself without looking at materials. Use flashcards, practice questions, or explain concepts from memory.</p>
                <p className="text-xs text-white/60"><strong>Why it works:</strong> Retrieval strengthens memory pathways more than recognition.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Spaced Repetition</p>
                <p className="text-xs text-white/80 mb-2">Review material at increasing intervals. Start with daily, extend to weekly, then longer.</p>
                <p className="text-xs text-white/60"><strong>Why it works:</strong> Fighting forgetting at optimal moments strengthens long-term memory.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Interleaving</p>
                <p className="text-xs text-white/80 mb-2">Mix different topics in a single study session rather than focusing on one until mastered.</p>
                <p className="text-xs text-white/60"><strong>Why it works:</strong> Improves ability to distinguish between similar concepts and apply correct method.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Elaboration</p>
                <p className="text-xs text-white/80 mb-2">Explain how concepts work, connect new information to what you already know.</p>
                <p className="text-xs text-white/60"><strong>Why it works:</strong> Creates multiple memory connections, making retrieval easier.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Sample Effective Study Session (2 hours):</p>
              <div className="text-xs text-white/80 space-y-2">
                <p><strong>0-25 mins:</strong> Active recall - flashcard review of previous topics (spaced repetition)</p>
                <p><strong>5 min break</strong></p>
                <p><strong>30-55 mins:</strong> New material study - read, make notes, self-explain</p>
                <p><strong>5 min break</strong></p>
                <p><strong>60-85 mins:</strong> Practice problems - mixed topics (interleaving)</p>
                <p><strong>5 min break</strong></p>
                <p><strong>90-115 mins:</strong> Review session - check practice answers, note errors, update revision priorities</p>
                <p><strong>5 mins:</strong> Plan tomorrow's session</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Point:</strong> These techniques feel harder than passive reading - that difficulty is actually the learning happening. If revision feels too easy, you're probably not learning effectively.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Calculation Skills Development
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Calculation questions often determine the difference between passing and failing. Improving calculation skills requires deliberate practice with immediate feedback.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Calculation Improvement Strategy:</p>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 1: Learn the Method</p>
                  <p className="text-white/80 mt-1">Understand the formula and when to apply it. Write out the steps clearly.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 2: Worked Examples</p>
                  <p className="text-white/80 mt-1">Work through 5-10 examples with solutions, comparing your working to correct method.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 3: Independent Practice</p>
                  <p className="text-white/80 mt-1">Complete 10-20 problems without looking at method. Only check after attempting.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Step 4: Timed Practice</p>
                  <p className="text-white/80 mt-1">Once accurate, practice for speed. Target 2-3 minutes per calculation.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Key Calculations to Master:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-elec-yellow/80">Calculation Type</th>
                      <th className="text-left py-2 text-elec-yellow/80">Key Formula</th>
                      <th className="text-left py-2 text-elec-yellow/80">Target Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/80 text-xs">
                    <tr className="border-b border-white/5">
                      <td className="py-2">Voltage drop</td>
                      <td className="py-2 font-mono">Vd = (mV/A/m x I x L) / 1000</td>
                      <td className="py-2">2 mins</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Cable sizing</td>
                      <td className="py-2 font-mono">It = In / (Ca x Cg x Ci)</td>
                      <td className="py-2">3 mins</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Earth fault loop</td>
                      <td className="py-2 font-mono">Zs = Ze + (R1+R2)</td>
                      <td className="py-2">2 mins</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">Prospective fault current</td>
                      <td className="py-2 font-mono">Ipf = U0 / Zs</td>
                      <td className="py-2">1 min</td>
                    </tr>
                    <tr>
                      <td className="py-2">Power calculations</td>
                      <td className="py-2 font-mono">P = V x I, P = I squared x R</td>
                      <td className="py-2">1 min</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Pro Tip:</strong> Create calculation practice sets mixing different types. This builds the skill of recognising which method to use - critical for exams.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Memory Techniques and Aids
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Strategic use of memory techniques helps recall specific facts, values, and sequences that frequently appear in exams. The best memory aids are ones you create yourself.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Acronyms and Mnemonics</p>
                <p className="text-xs text-white/80">Create memorable phrases for sequences or lists. The more personal or unusual, the more memorable.</p>
                <p className="text-xs text-white/60 mt-2">Example: For safe isolation - "ISIPVSLTS" becomes "I Saw Ivan Put Vinegar, Salt, Lemon, Tea, Sugar" (Isolate, Secure, Identify, Post notice, Verify dead, Secure again, Lock off, Test equipment, Start work)</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Visual Associations</p>
                <p className="text-xs text-white/80">Link abstract concepts to vivid mental images. The stranger the image, the more memorable.</p>
                <p className="text-xs text-white/60 mt-2">Example: Imagine voltage "dropping" like water down a waterfall to remember voltage drop increases with length and current.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Method of Loci</p>
                <p className="text-xs text-white/80">Place items to remember along a familiar route or in rooms of your house. Walk through mentally to recall.</p>
                <p className="text-xs text-white/60 mt-2">Example: Place the sequence of tests in initial verification around your home - continuity at the door, insulation resistance in the kitchen, etc.</p>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Chunking</p>
                <p className="text-xs text-white/80">Group related information into meaningful chunks rather than trying to remember individual items.</p>
                <p className="text-xs text-white/60 mt-2">Example: Remember MCB types as groups - B for domestic (3-5x), C for commercial (5-10x), D for motors (10-20x).</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 my-6">
              <p className="text-sm font-medium text-green-400 mb-2">Creating Effective Memory Aids:</p>
              <ul className="text-xs text-white/80 space-y-2">
                <li><strong>Make it personal:</strong> Use names, places, or events from your own life</li>
                <li><strong>Make it vivid:</strong> Include colour, movement, sound, or emotion</li>
                <li><strong>Make it weird:</strong> Unusual or absurd associations stick better</li>
                <li><strong>Keep it simple:</strong> The aid should be easier to remember than what it represents</li>
                <li><strong>Test it:</strong> Actually use the mnemonic to check it works for you</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 my-6">
              <p className="text-sm font-medium text-red-400 mb-2">Memory Aid Limitations:</p>
              <p className="text-xs text-white/90">
                Memory aids help with recall but don't replace understanding. Use them for specific facts, values, and sequences - but ensure you understand the underlying concepts. In exams, you need both: understanding to recognise what's being asked, memory aids to quickly recall specific details.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Build Progressively:</strong> Create memory aids as you study rather than at the end. The act of creating them is itself effective learning.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Building Exam Confidence
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Exam anxiety can significantly impact performance. Building confidence through preparation and familiarity helps you perform at your best when it matters.
            </p>

            <div className="my-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <p className="text-sm font-medium text-white mb-3">Confidence-Building Strategies:</p>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Realistic Practice</p>
                  <p className="text-white/80 mt-1">Complete mock exams under exam conditions - timed, silent, no notes. This makes the real exam feel familiar.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Progressive Success</p>
                  <p className="text-white/80 mt-1">Track improving scores to see objective evidence of progress. Celebrate milestones.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Visualisation</p>
                  <p className="text-white/80 mt-1">Imagine yourself calmly and confidently working through the exam. Visualise success.</p>
                </div>
                <div className="p-3 rounded bg-white/5">
                  <p className="text-elec-yellow/80 font-medium">Physical Readiness</p>
                  <p className="text-white/80 mt-1">Good sleep, nutrition, and exercise support cognitive performance. Don't neglect basics.</p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Before the Exam</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Prepare equipment the night before</li>
                  <li>Plan journey with extra time</li>
                  <li>Light review only - no new material</li>
                  <li>Good sleep (avoid cramming)</li>
                  <li>Eat a proper breakfast</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">During the Exam</p>
                <ul className="text-xs text-white/80 space-y-1">
                  <li>Read all instructions carefully</li>
                  <li>Scan all questions first</li>
                  <li>Start with questions you're confident on</li>
                  <li>Don't get stuck - flag and move on</li>
                  <li>Leave time for review</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Managing Exam Anxiety:</p>
              <ul className="text-sm text-white/80 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">1.</span>
                  <span><strong>Breathing:</strong> Slow, deep breaths (4 seconds in, 4 seconds out) activates calm response</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">2.</span>
                  <span><strong>Reframe:</strong> View nervousness as readiness - your body preparing to perform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">3.</span>
                  <span><strong>Focus:</strong> Concentrate on the current question, not overall outcome</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow/70">4.</span>
                  <span><strong>Perspective:</strong> One exam doesn't define you - it's part of a longer journey</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Remember:</strong> Some nervousness is normal and even helpful - it keeps you alert. The goal isn't to eliminate anxiety but to manage it so it doesn't interfere with performance.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Quick Wins</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Start every session with 10 minutes of active recall</li>
                <li>Mix topics in practice sessions (interleaving)</li>
                <li>Time yourself on mock exams</li>
                <li>Create one memory aid per study session</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Weekly Schedule Suggestion</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Mon-Thu: Focused topic study (2-3 hours each)</li>
                <li>Friday: Practice problems and calculations</li>
                <li>Saturday: Full mock exam under conditions</li>
                <li>Sunday: Review mock, plan next week's focus</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Passive reading without testing yourself</li>
                <li>Only studying topics you enjoy</li>
                <li>Cramming in final days instead of earlier preparation</li>
                <li>Not practicing under timed conditions</li>
                <li>Ignoring identified weak areas</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Improvement Strategies</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Effective Techniques</p>
                <ul className="space-y-0.5">
                  <li>Active recall (testing yourself)</li>
                  <li>Spaced repetition (intervals)</li>
                  <li>Interleaving (mixing topics)</li>
                  <li>Elaboration (explaining how)</li>
                  <li>Deliberate practice (focused)</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Less Effective (Avoid)</p>
                <ul className="space-y-0.5">
                  <li>Re-reading without testing</li>
                  <li>Highlighting alone</li>
                  <li>Cramming (massed practice)</li>
                  <li>Passive video watching</li>
                  <li>Studying only easy topics</li>
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
            <Link to="/study-centre/apprentice/level3-module8-section4-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Results Analysis
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8-section4-4">
              Next: Exam Preparation
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module8Section4_3;
