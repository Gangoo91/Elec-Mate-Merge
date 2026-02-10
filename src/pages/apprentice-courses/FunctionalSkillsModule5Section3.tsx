import { ArrowLeft, ArrowRight, Brain, Clock, Lightbulb, BookOpen, Heart, Target, RefreshCw, Calendar, Zap, BarChart3 } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule5Section3 = () => {
  useSEO(
    "Section 3: Study Techniques & Exam Skills - Assessment Preparation",
    "Proven revision methods, spaced repetition, active recall, time management for study, managing exam stress, past paper practice, memory techniques for formulae, and creating a study plan for UK electrical apprentices."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is 'spaced repetition' in the context of revision?",
      options: [
        "Studying the same topic for an entire day without breaks",
        "Reviewing material at increasing intervals over time to improve long-term memory",
        "Reading your notes once the night before the exam",
        "Spacing out your desk and chair for comfort while studying"
      ],
      correctAnswer: 1,
      explanation: "Spaced repetition involves reviewing material at gradually increasing intervals (e.g. after 1 day, then 3 days, then 1 week, then 2 weeks). This takes advantage of how memory consolidation works and is far more effective than cramming everything into one session."
    },
    {
      id: 2,
      question: "Which breathing technique can help reduce exam anxiety quickly?",
      options: [
        "Breathing as fast as possible to increase oxygen",
        "Holding your breath for 60 seconds",
        "4-7-8 breathing: inhale for 4, hold for 7, exhale for 8 counts",
        "Only breathing through your mouth throughout the exam"
      ],
      correctAnswer: 2,
      explanation: "The 4-7-8 technique (inhale for 4 counts, hold for 7, exhale for 8) activates your parasympathetic nervous system, which calms your body and reduces anxiety. It can be done quietly at your desk without anyone noticing."
    },
    {
      id: 3,
      question: "What is the recommended length of a single Pomodoro study session?",
      options: [
        "10 minutes",
        "25 minutes",
        "45 minutes",
        "60 minutes"
      ],
      correctAnswer: 1,
      explanation: "A standard Pomodoro session is 25 minutes of focused study followed by a 5-minute break. After four Pomodoros, you take a longer 15-30 minute break. This technique prevents mental fatigue and maintains concentration."
    },
    {
      id: 4,
      question: "When using past papers for revision, what should you do after marking your answers?",
      options: [
        "Throw the paper away and start a new one",
        "Review every wrong answer, understand the mistake, and revise that topic before trying again",
        "Only look at the questions you got right to boost confidence",
        "Memorise the exact answers in case the same questions appear"
      ],
      correctAnswer: 1,
      explanation: "The real learning happens when you review your mistakes. Understand why you got each answer wrong, revise that specific topic, and then try similar questions again to confirm you have improved. This feedback loop is what transforms past papers from a test into a learning tool."
    },
    {
      id: 5,
      question: "What does the mnemonic 'Very Icy Roads' help you remember?",
      options: [
        "The order of cable colours",
        "Ohm's Law formula: V = I x R",
        "The sequence of testing procedures",
        "The hierarchy of PPE requirements"
      ],
      correctAnswer: 1,
      explanation: "Very Icy Roads = V = I x R (Ohm's Law). The first letter of each word matches the formula components: Voltage = Current x Resistance. Mnemonics like this create memorable associations that make formulae easier to recall under exam pressure."
    },
    {
      id: 6,
      question: "What is 'active recall' as a study technique?",
      options: [
        "Reading your notes while exercising",
        "Testing yourself by trying to remember information without looking at your notes",
        "Recalling what you did at work that day",
        "Recording yourself reading your notes and playing it back"
      ],
      correctAnswer: 1,
      explanation: "Active recall involves deliberately trying to retrieve information from memory without looking at your notes. This strengthens neural pathways and is far more effective than passive re-reading. Flashcards, practice questions, and covering your notes while reciting key points are all forms of active recall."
    },
    {
      id: 7,
      question: "Why should you create a study timetable that includes rest days?",
      options: [
        "Because your employer requires it",
        "To have time to buy more stationery",
        "Because your brain consolidates memories during rest, preventing burnout and maintaining motivation",
        "Rest days are not important for effective revision"
      ],
      correctAnswer: 2,
      explanation: "Rest is essential for memory consolidation — your brain processes and stores information during downtime and sleep. Without rest days, you risk burnout, reduced concentration, and diminishing returns on your study time. A sustainable plan with built-in rest will always outperform unsustainable cramming."
    },
    {
      id: 8,
      question: "What is the most effective way to use the last 10 minutes of an exam?",
      options: [
        "Start a new question you have not attempted",
        "Sit quietly and wait for the exam to end",
        "Check your answers, correct obvious errors, and ensure you have not left any questions blank",
        "Rewrite your longest answer more neatly"
      ],
      correctAnswer: 2,
      explanation: "The final 10 minutes should be used for checking. Go back to skipped questions, verify calculations, check units and decimal points, proofread writing for SPaG errors, and ensure every question has been attempted. These quick checks can easily recover 5-10 marks."
    }
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link
            to="/study-centre/apprentice/functional-skills/module5"
            className="p-2 -ml-2 touch-manipulation"
          >
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">
              Module 5 • Section 3
            </p>
            <h1 className="text-base font-bold text-white">
              Study Techniques & Exam Skills
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-elec-dark via-neutral-900 to-elec-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-600/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative inline-flex mb-4">
              <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl animate-pulse" />
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 shadow-2xl shadow-green-500/25">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Study Techniques & Exam Skills
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Master proven study techniques and exam strategies that will help you revise efficiently, manage your time, and perform at your best on assessment day.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* 01 - Effective Revision Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Effective Revision Methods</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Not all revision is created equal. Research consistently shows that some study methods are far more effective than others. Understanding the difference between passive and active revision is the first step to studying smarter, not harder.
            </p>
            <p>
              Passive methods — such as re-reading notes, highlighting text, and watching videos without taking notes — feel productive but create only a weak impression in your memory. Active methods force your brain to work harder, which builds stronger, more durable memories that you can rely on under exam pressure.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Passive vs Active Revision</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-white/60 mb-2">Passive (Less Effective)</p>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-white/40 mt-0.5">•</span>
                      <span>Re-reading notes or textbooks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white/40 mt-0.5">•</span>
                      <span>Highlighting or underlining passages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white/40 mt-0.5">•</span>
                      <span>Copying notes out again neatly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white/40 mt-0.5">•</span>
                      <span>Watching revision videos without taking notes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white/40 mt-0.5">•</span>
                      <span>Listening to someone else explain a topic</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-2">Active (Highly Effective)</p>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Doing practice questions and past papers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Testing yourself with flashcards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Teaching a topic to someone else</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Creating mind maps from memory</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Writing summaries without looking at notes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">The Testing Effect</h4>
            <p>
              Psychologists call it the "testing effect" — the act of trying to recall information strengthens your memory far more than simply reviewing it. Every time you test yourself and successfully retrieve information, you make that memory more accessible. This is why practice questions are the single most effective revision tool.
            </p>

            <h4 className="text-white font-semibold pt-2">Interleaving Topics</h4>
            <p>
              Instead of studying one topic for hours (called "blocking"), mix different topics within a single study session. This is called interleaving and it forces your brain to practise selecting the right approach for each problem type. For example, in one 90-minute session you might spend 30 minutes on percentages, 30 minutes on reading comprehension, and 30 minutes on area calculations.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Revision should feel challenging. If it feels easy and comfortable, you are probably using passive methods that are not building strong memories. The slight discomfort of trying to recall something you cannot quite remember is exactly when the most powerful learning happens.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 02 - Spaced Repetition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Spaced Repetition</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Spaced repetition is one of the most scientifically supported study techniques. It works by reviewing material at gradually increasing intervals, which moves information from short-term into long-term memory. Instead of cramming everything the night before, you distribute your learning across days and weeks.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">How Spaced Repetition Works</h4>
              </div>
              <p className="text-xs text-white/70 mb-3">
                When you first learn something, your memory of it fades quickly. By reviewing at precisely the right moment — just as you are about to forget — you reset and strengthen the memory. Each time you review, the memory lasts longer before fading.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg text-green-400 font-bold">Day 1</div>
                  <div className="text-xs text-white/60">Learn the topic</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg text-green-400 font-bold">Day 2</div>
                  <div className="text-xs text-white/60">First review (10 min)</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg text-green-400 font-bold">Day 5</div>
                  <div className="text-xs text-white/60">Second review (10 min)</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg text-green-400 font-bold">Day 14</div>
                  <div className="text-xs text-white/60">Third review (5 min)</div>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Implementing Spaced Repetition</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Flashcards:</strong> Create physical or digital flashcards. Review new cards daily, then move cards you know well to a "review less often" pile. Cards you struggle with stay in the daily pile.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Leitner System:</strong> Use 3-5 boxes. New cards start in Box 1 (review daily). If you get a card right, it moves to the next box (reviewed less frequently). If wrong, it returns to Box 1.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Digital apps:</strong> Apps like Anki or Quizlet use algorithms to schedule reviews at optimal intervals automatically.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Study calendar:</strong> Mark review dates on your calendar when you first learn a topic. Treat review sessions as non-negotiable appointments.</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Why Cramming Fails</h4>
            <p>
              Cramming the night before feels productive because the information is fresh in your short-term memory. However, short-term memory decays rapidly — within 24-48 hours, you may have forgotten 70% of what you crammed. Spaced repetition builds memories that last weeks, months, and even years, because each review session reinforces the neural connections.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Start early. Spaced repetition requires time between reviews to work. If you start revising 6 weeks before your exam, you can review each topic 4-5 times. If you start 2 days before, you can only cram — and most of it will be forgotten by the time you sit the exam.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after 02 */}
        <InlineCheck
          question="In spaced repetition, what happens to the review intervals as you successfully recall information?"
          answer="The intervals between reviews increase over time. After your first review (Day 1 to Day 2, just one day apart), the gaps get progressively longer (Day 2 to Day 5 is three days, Day 5 to Day 14 is nine days). This is because each successful recall strengthens the memory, so it takes longer to fade."
        />

        {/* 03 - Active Recall Techniques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Active Recall Techniques</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Active recall is the practice of deliberately trying to retrieve information from memory without looking at your notes. It is the opposite of passive re-reading and is arguably the most powerful study technique available. Every time you struggle to remember something and then successfully recall it, you strengthen that memory significantly.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Active Recall Methods</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-2">Flashcards</p>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Write a question on one side, the answer on the other</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Test yourself without peeking at the answer first</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Great for formulae, definitions, and key facts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Portable — revise on your break at work or on the commute</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-2">Blank Page Method</p>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>After studying a topic, close your notes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Write everything you can remember on a blank page</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Then compare your page with the original notes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Identify gaps and focus your next session on those areas</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-2">Practice Questions</p>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>The single most effective revision technique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Work through past paper questions by topic area</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Mark your own work honestly and review every mistake</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Redo questions you got wrong after revising the topic</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-2">Teaching Others</p>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Explaining a concept to someone else forces deep understanding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Study with a mate and take turns explaining topics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>If you cannot explain it simply, you do not understand it well enough</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Even explaining aloud to yourself or a rubber duck helps</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">The Cornell Note-Taking Method</h4>
            <p>
              The Cornell method turns your notes into a built-in active recall tool. Divide each page into three sections: a narrow left column for cues and questions, a wide right column for your main notes, and a bottom strip for a summary.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Right column:</strong> Write your main notes during the lesson or reading session</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Left column:</strong> After the session, write questions or keywords that relate to the notes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Bottom strip:</strong> Write a brief summary of the entire page in your own words</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">To revise:</strong> Cover the right column and test yourself using only the left column cues</span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                The most important part of active recall is the struggle. When you cannot quite remember something and have to work hard to retrieve it, that is when the strongest learning happens. Do not give in and look at your notes too quickly — give yourself at least 30 seconds of genuine effort before checking.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 04 - Time Management for Study */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Time Management for Study</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              As an apprentice, you are juggling work on site, college days, personal life, and revision. Effective time management is not about finding more hours — it is about using the hours you have more effectively. Even 20-30 minutes of focused, active study is better than 2 hours of distracted, passive reading.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">The Pomodoro Technique</h4>
              </div>
              <p className="text-xs text-white/70 mb-3">
                The Pomodoro Technique uses timed intervals to maintain focus and prevent mental fatigue. It is particularly effective for people who struggle to concentrate for long periods.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                  <div className="text-lg text-green-400 font-bold">25 min</div>
                  <div className="text-xs text-white/60">Focused study</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg text-green-400 font-bold">5 min</div>
                  <div className="text-xs text-white/60">Short break</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                  <div className="text-lg text-green-400 font-bold">x 4</div>
                  <div className="text-xs text-white/60">Repeat 4 times</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg text-green-400 font-bold">15-30 min</div>
                  <div className="text-xs text-white/60">Long break</div>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Sample Weekly Study Timetable</h4>
            <p>
              Here is a realistic timetable for an apprentice working Monday to Friday with college one day per week. Adjust to suit your own schedule — the key is consistency.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="space-y-2 text-xs text-white/70">
                <div className="grid grid-cols-3 gap-2 pb-2 border-b border-white/10">
                  <span className="font-semibold text-white">Day</span>
                  <span className="font-semibold text-white">Activity</span>
                  <span className="font-semibold text-white">Duration</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span>Monday</span>
                  <span>Maths practice questions</span>
                  <span className="text-green-400">30 min (evening)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span>Tuesday</span>
                  <span>English reading + writing practice</span>
                  <span className="text-green-400">30 min (evening)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span>Wednesday</span>
                  <span>College day — review notes after</span>
                  <span className="text-green-400">20 min (evening)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span>Thursday</span>
                  <span>Flashcard review (spaced repetition)</span>
                  <span className="text-green-400">20 min (evening)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span>Friday</span>
                  <span className="text-white/40">Rest day — no revision</span>
                  <span className="text-white/40">—</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span>Saturday</span>
                  <span>Past paper under timed conditions</span>
                  <span className="text-green-400">90 min (morning)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span>Sunday</span>
                  <span>Review mistakes + weak topics</span>
                  <span className="text-green-400">45 min (afternoon)</span>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Making the Most of Short Windows</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Commute:</strong> Review flashcards on the bus or train (5-15 minutes)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Lunch break:</strong> Do 5 quick practice questions on your phone (10 minutes)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Waiting time:</strong> Revise mental maths while waiting for materials or in a queue (5 minutes)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Before bed:</strong> Review the day's flashcards — your brain consolidates memories during sleep (10 minutes)</span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Tell your employer and family about your upcoming exams. They may offer support such as flexible hours, reduced overtime, or a quiet space to study. Most employers understand that your qualifications benefit them too and will be supportive if you ask.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after 04 */}
        <InlineCheck
          question="In the Pomodoro Technique, how long is a single focused study session before taking a break?"
          answer="A single Pomodoro is 25 minutes of focused study followed by a 5-minute break. After completing four Pomodoros (about 2 hours total), you take a longer break of 15-30 minutes. This structure prevents mental fatigue and maintains high concentration throughout your study session."
        />

        {/* 05 - Managing Exam Stress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Managing Exam Stress</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Some nervousness before an exam is completely normal — and even helpful. A small amount of adrenaline sharpens your focus and helps you perform better. However, excessive anxiety can interfere with your ability to think clearly, recall information, and manage your time. Here is how to keep stress under control.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Breathing Techniques</h4>
              </div>
              <p className="text-xs text-white/70 mb-3">
                Controlled breathing is the fastest way to calm your nervous system. These techniques can be done quietly at your desk during the exam:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">4-7-8 Technique</p>
                  <p className="text-xs text-white/70">Breathe in for 4 counts, hold for 7 counts, breathe out slowly for 8 counts. Repeat 3-4 times. This activates your parasympathetic nervous system and reduces heart rate.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Box Breathing</p>
                  <p className="text-xs text-white/70">Breathe in for 4 counts, hold for 4 counts, breathe out for 4 counts, hold for 4 counts. Repeat until calm. Used by military and emergency services for high-pressure situations.</p>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Positive Mindset Strategies</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Reframe anxiety:</strong> Replace "I'm going to fail" with "I have prepared and I will do my best." Your inner voice affects your performance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Recall past successes:</strong> Remind yourself of challenges you have overcome before — you have already proven you can learn and adapt.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Visualise success:</strong> Spend a few minutes imagining yourself in the exam, feeling calm, reading questions clearly, and writing confident answers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Normalise nerves:</strong> Accept that some anxiety is normal. It shows you care about the result — and that energy can be channelled into focus.</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Physical Wellbeing Before Exams</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Sleep:</strong> Get 7-8 hours the night before. Your brain consolidates memories during sleep — pulling an all-nighter is counterproductive.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Nutrition:</strong> Eat a balanced meal before the exam. Avoid excessive caffeine which can increase jitteriness. Water is essential for concentration.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Exercise:</strong> Even a 20-minute walk before the exam can reduce anxiety and improve focus by releasing endorphins.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Avoid last-minute cramming:</strong> Do not study new material on exam day. Light review of flashcards is fine, but panic-reading new topics will increase anxiety.</span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                The single best way to reduce exam anxiety is thorough preparation over time. When you have practised enough questions under timed conditions, you will feel confident because you know what to expect. There are no surprises when you are well-prepared. Preparation is the ultimate stress-reduction strategy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 06 - Past Paper Practice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Past Paper Practice</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Past papers are the closest thing you have to seeing the actual exam in advance. Used properly, they are the single most valuable revision resource available. They familiarise you with the question style, help you practise time management, and identify your weak areas before the real exam.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Where to Find Past Papers</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Awarding body websites:</strong> City & Guilds, Pearson/Edexcel, NCFE, and Open Awards publish sample papers and past papers online</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Your college or training provider:</strong> They often have printed copies available in the library or learning resource centre</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Ask your tutor:</strong> They may have additional sample papers, specimen papers, or practice booklets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Free revision websites:</strong> Sites like BBC Bitesize and Skills Workshop offer free practice papers and questions</span>
                </li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">The Three-Pass Strategy</h4>
            <p>
              Do not just do past papers once. Use them strategically in three rounds to maximise their value:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">First pass (learning):</strong> Work through the paper untimed. Check the mark scheme as you go. Use it as a learning tool to understand what the examiners expect.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Second pass (practice):</strong> Complete the paper under timed conditions without looking at the mark scheme. Mark it honestly afterwards and note your score.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Third pass (targeted):</strong> Focus only on the question types you got wrong in the second pass. Revise those topics, then reattempt just those questions.</span>
              </li>
            </ul>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Self-Marking Tips</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Be honest:</strong> Do not give yourself the benefit of the doubt. If your answer does not match the mark scheme, it is wrong.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Check for method marks:</strong> In maths, even a wrong final answer can earn marks if the working shows the correct method.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Read mark scheme notes:</strong> They often include acceptable alternative answers you might not have considered.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Track your scores:</strong> Keep a log of your scores with dates. Seeing improvement over time is powerfully motivating.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Error analysis:</strong> For every wrong answer, write down why you got it wrong (misread question, calculation error, did not know the topic) so you can address the root cause.</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Aim to complete at least 3-4 full past papers under timed conditions before your exam. The first paper will feel challenging, but by the third or fourth, you will know the format inside out and can focus entirely on answering the questions accurately. Familiarity with the format reduces anxiety dramatically.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after 06 */}
        <InlineCheck
          question="In the three-pass strategy for past papers, what is the purpose of the second pass?"
          answer="The second pass is a practice run under exam conditions. You complete the paper timed, without looking at the mark scheme, then mark it honestly afterwards. This simulates the real exam experience and gives you an accurate picture of your current ability level, including your time management."
        />

        {/* 07 - Memory Techniques for Formulae */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Memory Techniques for Formulae</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Remembering formulae, key facts, and technical values is essential for both your Functional Skills exams and your electrical apprenticeship. Memory techniques (mnemonics) create strong associations in your brain that make recall much easier under pressure. The more vivid, unusual, or personal the association, the stronger the memory.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Electrical Formulae Mnemonics</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Ohm's Law Triangle</p>
                  <p className="text-xs text-white/70 mb-1">V = I x R</p>
                  <p className="text-xs text-white/70">"<strong className="text-white">V</strong>ery <strong className="text-white">I</strong>cy <strong className="text-white">R</strong>oads" — picture yourself driving on very icy roads while thinking about voltage, current, and resistance.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Power Formula</p>
                  <p className="text-xs text-white/70 mb-1">P = V x I</p>
                  <p className="text-xs text-white/70">"<strong className="text-white">P</strong>ut <strong className="text-white">V</strong>olts <strong className="text-white">I</strong>n" — power equals voltage multiplied by current. Picture plugging something in to get power.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Three-Phase Colour Codes</p>
                  <p className="text-xs text-white/70 mb-1">L1=Brown, L2=Black, L3=Grey</p>
                  <p className="text-xs text-white/70">"<strong className="text-white">B</strong>rown <strong className="text-white">B</strong>lack <strong className="text-white">G</strong>rey" — "BBG" like a barbecue (BBQ) but with a G for grey.</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Area Formula</p>
                  <p className="text-xs text-white/70 mb-1">Area = Length x Width</p>
                  <p className="text-xs text-white/70">Imagine a rectangular room. To find how much flooring you need, you multiply the two sides — just like measuring for carpet on a job.</p>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">The Triangle Method</h4>
            <p>
              For any formula with three variables where one equals the other two multiplied (like V = I x R), you can use a triangle to find any value:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Place the variable that equals the product (V) at the top of the triangle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Place the other two variables (I and R) at the bottom left and right</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Cover the variable you want to find. What remains is the formula you need.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Cover V: you see I x R (side by side = multiply). Cover I: you see V over R (above/below = divide). Cover R: you see V over I (divide).</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Chunking for Numbers</h4>
            <p>
              Break large amounts of numerical information into smaller, grouped chunks. Your working memory can hold about 7 items at once — chunking helps you work within this limit.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Cable sizes by application:</strong> Lighting (1.0, 1.5 mm²), sockets (2.5 mm²), cookers (6.0, 10.0 mm²), showers (10.0, 16.0 mm²)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">MCB ratings by type:</strong> Type B (general, 3-5x), Type C (motors, 5-10x), Type D (transformers, 10-20x)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Metric conversions:</strong> Group the "1,000s" together — 1 km = 1,000 m, 1 m = 1,000 mm, 1 kg = 1,000 g, 1 litre = 1,000 ml</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Visual Association</h4>
            <p>
              Link abstract concepts to vivid mental images. The more unusual or exaggerated the image, the easier it is to remember:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Picture a <strong className="text-white">waterfall</strong> when thinking about current flow — water flowing through a pipe is like current flowing through a conductor</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Imagine a <strong className="text-white">narrow pipe</strong> for high resistance and a <strong className="text-white">wide pipe</strong> for low resistance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Think of <strong className="text-white">percentages as slices of a pie</strong> — 25% is one quarter, 50% is half, 75% is three quarters</span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                The best mnemonics are personal ones. Create your own associations that mean something to you. A mnemonic someone else invented is useful, but one you created yourself — connected to your own experiences — will be far easier to recall because it is encoded with personal meaning.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 08 - Creating a Study Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Creating a Study Plan</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              A structured study plan is the foundation of effective exam preparation. Without a plan, it is easy to waste time revising topics you already know whilst neglecting areas that need work. A good plan gives you direction, accountability, and the confidence that you are covering everything you need to.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Step-by-Step Plan Creation</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Step 1 — Know Your Exam Dates</p>
                  <p className="text-xs text-white/70">Write down every exam date and work backwards to count the available weeks. If your maths exam is in 8 weeks, you have 8 weeks of revision to plan.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Step 2 — List All Topics</p>
                  <p className="text-xs text-white/70">Get the full specification from your awarding body. List every topic area for each exam. For Level 1 Maths, this might be: number, fractions, decimals, percentages, measurement, area, perimeter, data handling.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Step 3 — Traffic Light Assessment</p>
                  <p className="text-xs text-white/70">Rate each topic: <strong className="text-green-400">Green</strong> = confident, <strong className="text-yellow-400">Amber</strong> = need some practice, <strong className="text-red-400">Red</strong> = need significant work. This tells you where to focus your time.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Step 4 — Allocate Topics to Weeks</p>
                  <p className="text-xs text-white/70">Prioritise red and amber topics in the early weeks when you have the most time. Schedule green topics as lighter review sessions nearer the exam.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Step 5 — Build in Past Papers</p>
                  <p className="text-xs text-white/70">Schedule your first timed past paper about halfway through your revision (week 4 of 8). Schedule 2-3 more in the final 2 weeks. These are your reality checks.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Step 6 — Include Rest Days</p>
                  <p className="text-xs text-white/70">At least one full rest day per week. Your brain consolidates memories during rest. A sustainable plan beats an intense one you abandon after 3 days.</p>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Setting SMART Revision Goals</h4>
            <p>
              Vague goals like "revise maths" are unhelpful. Instead, set SMART goals:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Specific:</strong> "Complete 10 percentage questions from the practice book"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Measurable:</strong> "Score at least 7 out of 10 to demonstrate understanding"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Achievable:</strong> Set targets you can realistically meet in the time available</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Relevant:</strong> Focus on topics that will appear in your specific exam</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Time-bound:</strong> "By the end of this study session" or "by Saturday"</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Tracking Progress</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Weekly Review Checklist</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>What topics did I cover this week? Did I complete everything planned?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>What topics did I find easy? (Move these to less frequent review)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>What topics did I struggle with? (Schedule extra time next week)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>What is my practice paper score trend? (Is it improving?)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>Do I need to adjust my plan for next week? (Be flexible)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>Am I maintaining a healthy balance? (Rest, exercise, social time)</span>
                </li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Adjusting Your Approach</h4>
            <p>
              If your scores are not improving, change your approach rather than simply studying more hours:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>If calculation questions are consistently wrong, practise more worked examples before attempting questions alone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>If reading comprehension is weak, read more varied texts in your daily life — articles, instructions, reports</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>If writing scores are low, focus on the marking criteria and practise structuring paragraphs with clear topic sentences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>If time management is the issue, practise shorter timed sections (e.g., 15-minute bursts) before attempting full papers</span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                The most successful learners are not necessarily the most talented — they are the ones who consistently plan, review their performance, identify weaknesses, and adjust their approach. Make this feedback loop a habit and your results will follow. A written plan you actually follow is worth more than a perfect plan you abandon after day one.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Study Techniques & Exam Skills Knowledge Check" />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module5/section2"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Level 2 Practice
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module5/section4"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Portfolio Building
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule5Section3;