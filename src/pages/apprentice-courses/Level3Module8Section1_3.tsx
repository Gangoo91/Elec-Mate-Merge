/**
 * Level 3 Module 8 Section 1.3 - Quick Fire Questions
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 * Rapid-response questions to test instant recall and knowledge retention
 */

import { ArrowLeft, Zap, CheckCircle, Brain, Timer, Repeat, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Quick Fire Questions - Level 3 Module 8 Section 1.3";
const DESCRIPTION = "Rapid-response questions to test instant recall of key electrical installation concepts. Build the automatic knowledge retrieval essential for exam success.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the main benefit of practising quick fire questions?",
    options: [
      "They are easier than normal exam questions",
      "They build automatic recall which saves time in exams",
      "They cover less material than full exams",
      "They don't require as much concentration"
    ],
    correctIndex: 1,
    explanation: "Quick fire practice develops automatic recall - the ability to instantly retrieve information without conscious effort. This frees mental resources in exams for harder questions and improves time management."
  },
  {
    id: "check-2",
    question: "How long should you aim to spend on each quick fire question?",
    options: [
      "5-10 minutes for thorough analysis",
      "2-3 minutes with detailed review",
      "15-30 seconds maximum",
      "As long as needed to be certain"
    ],
    correctIndex: 2,
    explanation: "Quick fire questions should be answered in 15-30 seconds. The purpose is to test instant recall, not deep analysis. If you can't answer quickly, it indicates material you need to revise."
  },
  {
    id: "check-3",
    question: "What should you do if you repeatedly get the same quick fire question wrong?",
    options: [
      "Skip those questions in future sessions",
      "Spend extra time memorising just that answer",
      "Study the underlying concept, then practice until it becomes automatic",
      "Accept that some topics are too difficult"
    ],
    correctIndex: 2,
    explanation: "Repeated failures on the same question indicate a knowledge gap. Study the underlying concept thoroughly, understand why the answer is correct, then practice until recall becomes automatic."
  },
  {
    id: "check-4",
    question: "What is 'spaced repetition' in the context of quick fire practice?",
    options: [
      "Taking breaks between questions",
      "Reviewing material at increasing intervals over time",
      "Answering questions as fast as possible",
      "Spacing questions evenly across the page"
    ],
    correctIndex: 1,
    explanation: "Spaced repetition means reviewing material at gradually increasing intervals - for example, after 1 day, then 3 days, then 1 week. This leverages how memory works and is highly effective for long-term retention."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Quick fire question practice primarily develops which type of memory?",
    options: [
      "Short-term working memory only",
      "Procedural muscle memory",
      "Long-term declarative memory with automatic retrieval",
      "Sensory memory"
    ],
    correctAnswer: 2,
    explanation: "Quick fire practice develops long-term declarative memory with automatic retrieval - the ability to instantly access factual information without conscious effort, essential for efficient exam performance."
  },
  {
    id: 2,
    question: "What is the optimal session length for quick fire question practice?",
    options: [
      "3-4 hours of continuous practice",
      "10-15 minutes of focused practice",
      "1 minute burst sessions only",
      "Session length doesn't matter"
    ],
    correctAnswer: 1,
    explanation: "10-15 minute focused sessions are optimal for quick fire practice. Short, intense sessions maintain concentration and fit easily into daily schedules for regular practice."
  },
  {
    id: 3,
    question: "Which topics are most suitable for quick fire question practice?",
    options: [
      "Complex calculation problems requiring working",
      "Open-ended design scenarios",
      "Facts, figures, regulations, and standard values",
      "Practical wiring techniques"
    ],
    correctAnswer: 2,
    explanation: "Quick fire practice works best for factual recall - regulations, standard values, safety requirements, and key definitions. Complex calculations and practical skills require different practice approaches."
  },
  {
    id: 4,
    question: "What does a hesitation before answering a quick fire question indicate?",
    options: [
      "The question is too difficult",
      "You need more practice on that topic for automatic recall",
      "The question is poorly written",
      "You should skip to the next question"
    ],
    correctAnswer: 1,
    explanation: "Hesitation indicates the information isn't yet automatically accessible. Flag these topics for additional study and practice until answers come instantly."
  },
  {
    id: 5,
    question: "How often should quick fire question sessions be scheduled for optimal learning?",
    options: [
      "Once a week for 3 hours",
      "Only the week before the exam",
      "Daily or every other day in short sessions",
      "Once at the start and once at the end of revision"
    ],
    correctAnswer: 2,
    explanation: "Regular, short sessions (daily or every other day) are more effective than infrequent long sessions. Consistency builds and maintains automatic recall better than cramming."
  },
  {
    id: 6,
    question: "What is the relationship between quick fire practice and exam time management?",
    options: [
      "They are unrelated skills",
      "Quick fire practice takes time away from real exam preparation",
      "Fast automatic recall frees time for difficult questions in exams",
      "Quick fire practice makes you rush through all exam questions"
    ],
    correctAnswer: 2,
    explanation: "When basic facts come automatically, you spend less mental effort and time on straightforward questions. This frees time and cognitive resources for challenging questions requiring deeper analysis."
  },
  {
    id: 7,
    question: "Which practice method is most effective for building quick recall?",
    options: [
      "Reading notes repeatedly",
      "Active recall testing with immediate feedback",
      "Highlighting important information",
      "Listening to audio recordings passively"
    ],
    correctAnswer: 1,
    explanation: "Active recall testing - being asked a question and retrieving the answer from memory - is far more effective than passive review methods for building strong, automatic recall."
  },
  {
    id: 8,
    question: "What should you do at the end of each quick fire session?",
    options: [
      "Immediately start another session",
      "Note which topics caused hesitation for focused revision",
      "Forget about it and move on",
      "Only record your score, not specific weaknesses"
    ],
    correctAnswer: 1,
    explanation: "After each session, note topics that caused hesitation or errors. These highlights guide your revision - focus study time on converting slow recalls into automatic ones."
  },
  {
    id: 9,
    question: "What is the 'testing effect' in learning psychology?",
    options: [
      "Anxiety caused by taking tests",
      "The finding that testing yourself improves long-term retention",
      "The tendency to perform worse when being observed",
      "The effect of test difficulty on scores"
    ],
    correctAnswer: 1,
    explanation: "The testing effect is the well-researched finding that actively testing yourself (rather than just reviewing) significantly improves long-term retention of information."
  },
  {
    id: 10,
    question: "How should quick fire practice be balanced with other revision methods?",
    options: [
      "Replace all other methods with quick fire only",
      "Use quick fire for memorisation, other methods for understanding",
      "Only use quick fire if other methods aren't working",
      "Alternate between quick fire and long rest periods only"
    ],
    correctAnswer: 1,
    explanation: "Quick fire practice excels at building recall of facts and figures. Combine it with deeper study for understanding concepts, practical exercises for skills, and full exams for exam technique."
  },
  {
    id: 11,
    question: "What makes a good quick fire question?",
    options: [
      "Multiple paragraphs of complex scenario",
      "Clear, concise question with one definite answer",
      "Open-ended question allowing various interpretations",
      "Questions requiring detailed calculations"
    ],
    correctAnswer: 1,
    explanation: "Good quick fire questions are clear, concise, and have definite correct answers. They test specific facts or concepts that can be recalled instantly without lengthy analysis."
  },
  {
    id: 12,
    question: "If you achieve 95% accuracy on quick fire questions, what should you do next?",
    options: [
      "Stop practising those topics entirely",
      "Maintain with occasional review, focus effort on weaker areas",
      "Continue intensive daily practice on those same questions",
      "Ignore other topics and only practice what you're good at"
    ],
    correctAnswer: 1,
    explanation: "High accuracy indicates strong recall, but some maintenance practice prevents forgetting. Shift primary effort to weaker areas while periodically reviewing strong topics."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How is quick fire practice different from normal exam practice?",
    answer: "Quick fire practice focuses on rapid recall of individual facts - you should aim to answer in seconds, not minutes. The goal is to build automatic retrieval of common knowledge so you don't waste exam time on basic questions. Normal exam practice tests your ability to apply knowledge under time pressure across full papers."
  },
  {
    question: "What if I prefer slow, careful study over quick fire practice?",
    answer: "Both approaches have their place. Slow, careful study builds deep understanding of concepts. Quick fire practice converts that understanding into fast, automatic recall. The most effective revision combines both - understand first, then practice rapid retrieval until it becomes second nature."
  },
  {
    question: "Can I do too much quick fire practice?",
    answer: "Yes. Quick fire practice develops recall but not understanding. If you only memorise without understanding, you'll struggle with questions phrased differently or requiring application of knowledge. Balance quick fire sessions with conceptual study."
  },
  {
    question: "What topics should I prioritise for quick fire practice?",
    answer: "Focus on frequently-tested factual content: regulation numbers and requirements, standard values (cable ratings, fuse sizes, test limits), safety legislation sections, and key definitions. These appear repeatedly in exams and benefit most from automatic recall."
  },
  {
    question: "How do I know when my recall is 'fast enough'?",
    answer: "If you can answer confidently within 10-15 seconds for most questions, your recall is adequate for exam conditions. If questions consistently take 30+ seconds or require deliberation, more practice is needed on those topics."
  },
  {
    question: "Should I use quick fire practice on exam day?",
    answer: "Light quick fire practice on exam morning can activate your knowledge and build confidence. Keep sessions short (5-10 minutes) and stick to topics you know well - don't risk encountering gaps that might cause anxiety. Stop at least 30 minutes before the exam starts."
  }
];

// ============================================
// QUICK FIRE TOPIC CATEGORIES
// ============================================
const topicCategories = [
  {
    name: "Regulations & Legislation",
    examples: ["HASAWA Section numbers", "EAWR key requirements", "BS 7671 Part references", "RIDDOR reporting thresholds"],
    questionCount: 150,
    icon: "FileText"
  },
  {
    name: "Standard Values",
    examples: ["Cable ratings", "Fuse ratings", "RCD trip times", "Maximum Zs values"],
    questionCount: 120,
    icon: "Calculator"
  },
  {
    name: "Electrical Science",
    examples: ["Ohm's Law relationships", "Power factor", "Resistance colour codes", "SI units"],
    questionCount: 100,
    icon: "Zap"
  },
  {
    name: "Testing Limits",
    examples: ["Insulation resistance minimums", "Earth fault loop impedance", "Continuity test values", "RCD test currents"],
    questionCount: 80,
    icon: "Gauge"
  },
  {
    name: "Safety Procedures",
    examples: ["Safe isolation steps", "Lock-out/tag-out", "Permit to work", "Risk assessment process"],
    questionCount: 60,
    icon: "Shield"
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module8Section1_3 = () => {
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
            <Link to="../level3-module8">
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
            <span>Module 8.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Quick Fire Questions
          </h1>
          <p className="text-white/80">
            Rapid-response testing to build instant recall and automatic knowledge retrieval
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Build automatic recall of key facts and figures</li>
              <li><strong>Speed:</strong> 15-30 seconds per question maximum</li>
              <li><strong>Sessions:</strong> 10-15 minutes, daily or every other day</li>
              <li><strong>Focus:</strong> Regulations, standard values, test limits, definitions</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Hesitation indicates topics needing more practice</li>
              <li><strong>Use:</strong> Daily sessions to maintain automatic recall</li>
              <li><strong>Apply:</strong> Fast recall frees time for difficult exam questions</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the science behind effective rapid recall practice",
              "Develop techniques for building automatic knowledge retrieval",
              "Identify which topics are most suitable for quick fire practice",
              "Apply spaced repetition principles to maximise retention",
              "Use quick fire sessions to identify revision priorities",
              "Balance quick fire practice with deeper understanding study"
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
            The Science of Rapid Recall
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Quick fire questions aren't just a study gimmick - they leverage well-researched principles of cognitive psychology. Understanding why they work helps you use them more effectively and trust the process even when it feels challenging.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Key Principles at Work:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>The Testing Effect:</strong> Actively retrieving information from memory strengthens that memory far more than passive re-reading. Every time you successfully answer a question, the neural pathway for that information becomes stronger and faster.</li>
                <li><strong>Desirable Difficulty:</strong> Memory formation is enhanced when retrieval requires effort. If questions are too easy, you're not building new strength. The slight struggle of quick fire practice is productive - it's making you better.</li>
                <li><strong>Automaticity:</strong> With sufficient practice, factual recall becomes automatic - like recognising a friend's face. You don't consciously process features; recognition is instant. Quick fire practice develops this automaticity for exam content.</li>
                <li><strong>Cognitive Load Theory:</strong> Your working memory has limited capacity. When basic facts require conscious thought, less mental resource is available for complex reasoning. Automatic recall frees cognitive capacity for difficult questions.</li>
                <li><strong>Interleaving:</strong> Mixing topics during practice (rather than blocking by subject) improves long-term retention and the ability to distinguish between similar concepts.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Research Finding:</strong> Studies show that students who practice retrieval outperform students who spend the same time re-reading material by 50% or more on delayed tests. The effort of retrieval, not the exposure to information, drives learning.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Effective Quick Fire Practice Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all quick fire practice is equally effective. Using proven techniques ensures your limited study time produces maximum results.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Time Pressure Practice</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Set a visible countdown timer (15-30 seconds)</li>
                  <li>Answer immediately - don't deliberate</li>
                  <li>If time expires, mark as wrong regardless</li>
                  <li>Speed builds exam-condition automaticity</li>
                  <li>Slow responses indicate revision needed</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Repeat className="h-4 w-4 text-elec-yellow" />
                  <p className="text-sm font-medium text-white">Spaced Repetition</p>
                </div>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Review new material after 1 day</li>
                  <li>If correct, review again after 3 days</li>
                  <li>Continue increasing intervals for correct recalls</li>
                  <li>If wrong, restart with shorter intervals</li>
                  <li>Graduated spacing builds permanent memory</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Optimal Session Structure:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Warm-Up (2 minutes):</strong> 5-10 questions on topics you know well. This activates relevant knowledge networks and builds confidence.</li>
                <li><strong>Challenge Phase (8-10 minutes):</strong> Mixed questions across topics, including material you find difficult. This is where learning happens.</li>
                <li><strong>Cool-Down (2-3 minutes):</strong> Review any questions that caused hesitation or errors. Note these for focused revision.</li>
                <li><strong>Post-Session:</strong> Immediately write down 2-3 topics that need more attention. This captures insights while fresh.</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Pro Tip:</strong> Practice at different times of day. If you always practice when alert and rested, you're not preparing for exam conditions where you might be nervous or tired. Some sessions when you're not at peak performance build robustness.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            What to Practice - Topic Selection
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Quick fire practice works best for certain types of content. Understanding what's suitable helps you allocate practice time effectively and avoid frustration.
            </p>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm font-medium text-green-400 mb-2">Ideal for Quick Fire</p>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Regulation section numbers and requirements</li>
                  <li>Standard values (cable ratings, Zs limits)</li>
                  <li>Key definitions from BS 7671</li>
                  <li>Safety procedure sequences</li>
                  <li>Colour codes and symbols</li>
                  <li>Test instrument settings</li>
                  <li>Legislation key points</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400 mb-2">Not Suitable for Quick Fire</p>
                <ul className="text-xs text-white/90 space-y-1">
                  <li>Complex multi-step calculations</li>
                  <li>Design scenarios requiring judgement</li>
                  <li>Fault diagnosis reasoning</li>
                  <li>Extended written explanations</li>
                  <li>Practical wiring skills</li>
                  <li>Open-ended problem solving</li>
                  <li>Topics requiring detailed analysis</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Priority Topics for Level 3 Quick Fire:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>BS 7671 Chapter/Part References:</strong> Knowing that earthing is Chapter 54, protection is Part 4, and special locations is Part 7 saves significant time in exams when locating information.</li>
                <li><strong>Maximum Zs Values:</strong> Common values for different protective devices (32A BS 88 with 0.4s: 1.09ohm; 32A BS 1362: 1.37ohm) appear repeatedly in testing questions.</li>
                <li><strong>Test Sequences:</strong> The order of initial verification tests (continuity, insulation resistance, polarity, earth fault loop impedance, RCD operation) must be automatic.</li>
                <li><strong>EICR Observation Codes:</strong> C1 (danger), C2 (potentially dangerous), C3 (improvement recommended), FI (further investigation) - instant recognition is essential.</li>
                <li><strong>RCD Requirements:</strong> Which circuits require 30mA protection, trip times at different currents, and when additional protection is mandatory.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Study Integration:</strong> Quick fire practice complements but doesn't replace understanding. First learn why something is required, then use quick fire practice to make recall automatic. Understanding without recall is slow; recall without understanding is fragile.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Tracking Progress and Maintaining Gains
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Building rapid recall is satisfying, but knowledge can fade without maintenance. A systematic approach to tracking and maintaining progress ensures exam-day readiness.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-elec-yellow" />
                </div>
                <p className="font-medium text-white mb-1">Acquisition Phase</p>
                <p className="text-white/90 text-xs">Daily practice on new topics until 80%+ accuracy</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Brain className="h-4 w-4 text-elec-yellow" />
                </div>
                <p className="font-medium text-white mb-1">Consolidation Phase</p>
                <p className="text-white/90 text-xs">Spaced review to strengthen memory traces</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Repeat className="h-4 w-4 text-elec-yellow" />
                </div>
                <p className="font-medium text-white mb-1">Maintenance Phase</p>
                <p className="text-white/90 text-xs">Weekly review to prevent forgetting</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Progress Tracking Methods:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Session Logging:</strong> Record date, topics covered, accuracy rate, and time per question. Trends over time show genuine improvement.</li>
                <li><strong>Hesitation Notes:</strong> Track which specific questions or topics cause hesitation. These are your priority revision targets.</li>
                <li><strong>Accuracy Thresholds:</strong> Set targets: topics below 70% need daily practice; 70-85% need every-other-day practice; above 85% need weekly maintenance.</li>
                <li><strong>Speed Monitoring:</strong> Track average response time. Improvement should show in both accuracy and speed - faster correct answers indicate stronger automaticity.</li>
              </ul>
            </div>

            <p>
              <strong>The Forgetting Curve:</strong> Without review, you'll forget approximately 70% of new material within 24 hours and 90% within a week. Regular quick fire practice interrupts this curve, converting short-term learning into permanent knowledge. Plan your maintenance sessions before you forget - not after.
            </p>

            <p className="text-sm text-white/90 italic mt-4">
              <strong>Exam Week Strategy:</strong> In the final week, shift from learning new material to maintaining existing knowledge. Quick fire sessions should focus on confident recall of well-known material to keep it fresh and build exam-day confidence.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* TOPIC CATEGORIES SECTION */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Fire Topic Banks</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicCategories.map((category, index) => (
              <div key={index} className="p-4 rounded-lg bg-transparent border border-white/10 hover:border-elec-yellow/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-white">{category.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-elec-yellow/20 text-elec-yellow">
                    {category.questionCount}+ questions
                  </span>
                </div>
                <ul className="text-xs text-white/70 space-y-0.5">
                  {category.examples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Setting Up Quick Fire Sessions</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Find a distraction-free environment - even 10 minutes of focus is valuable</li>
                <li>Use a visible timer to maintain pace pressure</li>
                <li>Have a notepad ready to capture topics needing revision</li>
                <li>Commit to answering within the time limit, even if uncertain</li>
                <li>Plan sessions at consistent times to build habit</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During Practice Sessions</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Answer immediately with your first instinct - don't overthink</li>
                <li>If you hesitate, note the topic and move on</li>
                <li>Accept that some wrong answers are part of the learning process</li>
                <li>Stay focused - check phone and distractions afterwards</li>
                <li>Maintain energy through the full session</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Sessions too long</strong> - 10-15 minutes is optimal; longer sessions reduce effectiveness</li>
                <li><strong>Ignoring hesitation</strong> - Slow answers indicate revision needs, don't dismiss them</li>
                <li><strong>Only practising strengths</strong> - Spend proportionally more time on weak areas</li>
                <li><strong>Cramming before exam</strong> - Consistent daily practice beats intensive last-minute sessions</li>
                <li><strong>Expecting instant perfection</strong> - Building automaticity takes time; trust the process</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Quick Fire Essentials</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Session Structure</p>
                <ul className="space-y-0.5">
                  <li>Duration: 10-15 minutes</li>
                  <li>Frequency: Daily or every other day</li>
                  <li>Time per question: 15-30 seconds</li>
                  <li>Warm-up, challenge, cool-down phases</li>
                  <li>Note hesitations for revision</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Success Indicators</p>
                <ul className="space-y-0.5">
                  <li>Accuracy increasing over time</li>
                  <li>Response speed improving</li>
                  <li>Fewer hesitations per session</li>
                  <li>Confident first-instinct answers</li>
                  <li>Consistent daily practice habit</li>
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
            <Link to="../level3-module8-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Timed Module Tests
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module8-section1-4">
              Next: Past Paper Analysis
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module8Section1_3;
