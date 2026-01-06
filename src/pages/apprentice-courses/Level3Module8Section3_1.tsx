import { useState } from "react";
import { ArrowLeft, ArrowRight, Zap, CheckCircle, AlertTriangle, Clock, Target, Calendar, Timer, HelpCircle, Lightbulb, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const Level3Module8Section3_1 = () => {
  useSEO(
    "Time Management Strategies - Level 3 Mock Exams & Exam Preparation",
    "Effective strategies for managing your time during exams and revision - exam timing, question allocation, and revision planning techniques"
  );

  const [showQuiz, setShowQuiz] = useState(false);

  // Exam time allocation data for City & Guilds Level 3
  const examTimeAllocation = [
    {
      exam: "2391-52 Initial Verification",
      duration: "2 hours",
      questions: 40,
      timePerQuestion: "3 minutes",
      strategy: "Allow 90 mins for questions, 30 mins review",
      passMark: "60%"
    },
    {
      exam: "2391-52 Periodic Inspection",
      duration: "2 hours",
      questions: 40,
      timePerQuestion: "3 minutes",
      strategy: "Allow 90 mins for questions, 30 mins review",
      passMark: "60%"
    },
    {
      exam: "2365-03 Theory Exam",
      duration: "2.5 hours",
      questions: 60,
      timePerQuestion: "2.5 minutes",
      strategy: "Allow 2 hrs for questions, 30 mins review",
      passMark: "60%"
    },
    {
      exam: "AM2 Practical Assessment",
      duration: "6 hours",
      questions: "N/A",
      timePerQuestion: "N/A",
      strategy: "Split into phases: planning, installation, testing",
      passMark: "Pass all criteria"
    }
  ];

  // Revision schedule template
  const revisionSchedule = [
    {
      weeks: "12-8 weeks before",
      focus: "Foundation Building",
      activities: [
        "Complete initial read-through of all topics",
        "Identify weak areas requiring extra focus",
        "Create topic summary cards",
        "Begin BS 7671 familiarisation"
      ],
      hoursPerWeek: "6-8 hours"
    },
    {
      weeks: "8-4 weeks before",
      focus: "Deep Learning",
      activities: [
        "In-depth study of each module",
        "Practice calculations and formulae",
        "Complete section quizzes",
        "Regular BS 7671 exercises"
      ],
      hoursPerWeek: "8-10 hours"
    },
    {
      weeks: "4-2 weeks before",
      focus: "Active Practice",
      activities: [
        "Full mock exams under timed conditions",
        "Review and analyse mistakes",
        "Focus on weak areas identified",
        "Practice past paper questions"
      ],
      hoursPerWeek: "10-12 hours"
    },
    {
      weeks: "Final 2 weeks",
      focus: "Consolidation",
      activities: [
        "Final mock exams",
        "Quick revision of key facts",
        "Review common exam pitfalls",
        "Rest and mental preparation"
      ],
      hoursPerWeek: "6-8 hours"
    }
  ];

  // Time-wasting traps to avoid
  const timeWastingTraps = [
    {
      trap: "Spending too long on difficult questions",
      impact: "Running out of time for easier marks",
      solution: "Mark and move on - return later if time permits"
    },
    {
      trap: "Re-reading questions multiple times",
      impact: "Wasting valuable seconds on each question",
      solution: "Read once carefully, extract key information"
    },
    {
      trap: "Second-guessing correct answers",
      impact: "Changing right answers to wrong ones",
      solution: "Trust your first instinct unless clearly wrong"
    },
    {
      trap: "Not reading all options before answering",
      impact: "Missing the best answer",
      solution: "Always read all options before selecting"
    },
    {
      trap: "Panic when stuck on a question",
      impact: "Mental block affecting following questions",
      solution: "Take a breath, move on, reset focus"
    },
    {
      trap: "Perfectionism in written answers",
      impact: "Over-explaining simple points",
      solution: "Be concise - marks for key points, not length"
    }
  ];

  // Practical time management techniques
  const practicalTechniques = [
    {
      technique: "The 50/10 Rule",
      description: "Study for 50 minutes, then take a 10-minute break",
      benefit: "Maintains concentration and prevents mental fatigue",
      application: "Use a timer and strictly enforce break times"
    },
    {
      technique: "Topic Chunking",
      description: "Break large topics into 30-minute study segments",
      benefit: "Makes progress visible and maintains motivation",
      application: "Assign specific subtopics to each chunk"
    },
    {
      technique: "Active Recall Sessions",
      description: "Test yourself without notes for 15 minutes",
      benefit: "Strengthens memory pathways more than passive reading",
      application: "Use flashcards or practice questions"
    },
    {
      technique: "Spaced Repetition",
      description: "Review topics at increasing intervals",
      benefit: "Moves information from short to long-term memory",
      application: "Day 1, Day 3, Day 7, Day 14, Day 30"
    },
    {
      technique: "Morning Priority",
      description: "Tackle hardest topics when freshest",
      benefit: "Better retention for challenging material",
      application: "Schedule difficult subjects for morning study"
    },
    {
      technique: "Evening Review",
      description: "Quick 15-minute recap before sleep",
      benefit: "Memory consolidation during sleep",
      application: "Review key points or flashcards before bed"
    }
  ];

  // Quiz questions
  const quizQuestions = [
    {
      question: "For a 2-hour exam with 40 questions, approximately how much time should you allocate per question?",
      options: [
        "1 minute",
        "2 minutes",
        "3 minutes",
        "4 minutes"
      ],
      correctAnswer: 2,
      explanation: "With 40 questions in 2 hours (120 minutes), you have 3 minutes per question. However, it's wise to aim for 2-2.5 minutes per question to allow review time."
    },
    {
      question: "What is the recommended approach when you encounter a difficult question in an exam?",
      options: [
        "Spend as long as needed to work out the answer",
        "Guess immediately and move on",
        "Mark it and return after completing easier questions",
        "Skip it entirely and leave it blank"
      ],
      correctAnswer: 2,
      explanation: "Mark difficult questions and return to them after completing easier ones. This ensures you don't miss straightforward marks while struggling with complex questions."
    },
    {
      question: "According to the 50/10 rule for revision, how long should study sessions be?",
      options: [
        "50 minutes study, 10 minutes break",
        "50 minutes break, 10 minutes study",
        "5 hours study, 1 hour break",
        "10 minutes study, 50 minutes break"
      ],
      correctAnswer: 0,
      explanation: "The 50/10 rule involves 50 minutes of focused study followed by a 10-minute break. This maintains concentration and prevents mental fatigue."
    },
    {
      question: "What is the main benefit of spaced repetition in revision?",
      options: [
        "It reduces total study time needed",
        "It moves information to long-term memory",
        "It makes exams easier",
        "It eliminates the need for notes"
      ],
      correctAnswer: 1,
      explanation: "Spaced repetition strengthens memory by reviewing material at increasing intervals, effectively moving information from short-term to long-term memory."
    },
    {
      question: "Why should you tackle the hardest topics in the morning?",
      options: [
        "Morning exams are more common",
        "Your brain is freshest and retention is better",
        "Difficult topics take longer to study",
        "Teachers prefer morning students"
      ],
      correctAnswer: 1,
      explanation: "Mental energy and concentration are typically highest in the morning. Tackling challenging material when you're freshest leads to better understanding and retention."
    },
    {
      question: "What percentage of your exam time should ideally be reserved for reviewing answers?",
      options: [
        "5%",
        "10-15%",
        "25%",
        "50%"
      ],
      correctAnswer: 2,
      explanation: "Reserving approximately 25% of your exam time (e.g., 30 minutes in a 2-hour exam) allows you to review answers, return to marked questions, and check for errors."
    },
    {
      question: "What is 'topic chunking' in revision?",
      options: [
        "Studying multiple topics simultaneously",
        "Breaking large topics into smaller study segments",
        "Memorising topics in alphabetical order",
        "Skipping difficult topics"
      ],
      correctAnswer: 1,
      explanation: "Topic chunking involves breaking large, complex topics into manageable 30-minute segments. This makes study sessions more achievable and progress more visible."
    },
    {
      question: "How many weeks before the exam should 'deep learning' revision typically begin?",
      options: [
        "12-8 weeks",
        "8-4 weeks",
        "4-2 weeks",
        "Final 2 weeks"
      ],
      correctAnswer: 1,
      explanation: "The deep learning phase, involving in-depth study and regular practice, should typically occur 8-4 weeks before the exam, after foundation building is complete."
    },
    {
      question: "What is a common time-wasting trap during exams?",
      options: [
        "Reading questions carefully",
        "Second-guessing correct answers",
        "Using all available time",
        "Checking calculations"
      ],
      correctAnswer: 1,
      explanation: "Second-guessing often leads to changing correct answers to wrong ones. Research shows first instincts are usually right unless you have clear evidence of an error."
    },
    {
      question: "What is active recall and why is it effective?",
      options: [
        "Reading notes repeatedly - familiarisation helps",
        "Testing yourself without notes - strengthens memory",
        "Highlighting important text - visual memory aid",
        "Listening to revision podcasts - passive learning"
      ],
      correctAnswer: 1,
      explanation: "Active recall involves testing yourself without notes, which forces your brain to retrieve information and significantly strengthens memory pathways compared to passive reading."
    },
    {
      question: "During the final 2 weeks before an exam, what should revision focus on?",
      options: [
        "Learning completely new topics",
        "Starting from the beginning again",
        "Consolidation and mental preparation",
        "Intensive 12-hour study sessions"
      ],
      correctAnswer: 2,
      explanation: "The final 2 weeks should focus on consolidation - reviewing key facts, final mock exams, and ensuring adequate rest. Cramming new material is ineffective this close to the exam."
    },
    {
      question: "Why is a 15-minute evening review before sleep beneficial?",
      options: [
        "It tires you out for better sleep",
        "Memory consolidates during sleep",
        "It replaces morning study",
        "Evening light improves reading"
      ],
      correctAnswer: 1,
      explanation: "Memory consolidation occurs during sleep. Reviewing key points before bed helps transfer information to long-term memory as your brain processes it overnight."
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "How do I know if I'm spending too long on revision?",
      answer: "If you're studying for more than 3-4 hours without breaks, retention drops significantly. Quality matters more than quantity. Stick to focused sessions with regular breaks, and ensure you're getting adequate sleep and rest."
    },
    {
      question: "What if I run out of time in the exam?",
      answer: "If time is running short, prioritise unanswered questions where you know the answer. For multiple choice, never leave blanks - make an educated guess. For written answers, use bullet points to cover key points quickly."
    },
    {
      question: "Should I revise topics in order or randomly?",
      answer: "A combination works best. Start with weaker topics to give them more attention, but also interleave different subjects to strengthen connections. Random practice more closely simulates exam conditions."
    },
    {
      question: "How do I balance work and revision?",
      answer: "Create a realistic schedule that accounts for work hours. Even 30-45 minutes daily is effective if consistent. Use commute time for audio revision or flashcard apps. Weekend sessions can be longer but should still include breaks."
    },
    {
      question: "Is it better to revise alone or with others?",
      answer: "Both have benefits. Solo revision allows focus and personalised pace. Group study helps explain concepts (teaching reinforces learning) and identifies gaps. A mix of 70% solo and 30% group often works well."
    },
    {
      question: "What should I do the night before the exam?",
      answer: "Light revision only - review summary cards or key formulae. Prepare everything needed (ID, equipment, route). Get a good meal and aim for 7-8 hours sleep. Avoid cramming as it increases anxiety and reduces performance."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#1a1a1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a1a]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-white/70 hover:text-white active:text-white p-0 -ml-1" asChild>
            <Link to="../section3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Exam Tips
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 flex items-center justify-center border border-elec-yellow/20">
              <Clock className="w-6 h-6 text-elec-yellow" />
            </div>
            <div>
              <p className="text-sm text-elec-yellow font-medium">Section 3.1</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Time Management Strategies</h1>
            </div>
          </div>
          <p className="text-lg text-white/70">
            Master effective time management techniques for both exam day and your revision schedule to maximise your performance and results.
          </p>
        </div>

        {/* Quick Summary Box */}
        <div className="bg-gradient-to-br from-elec-yellow/10 to-transparent border border-elec-yellow/20 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-elec-yellow" />
            Quick Summary
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Exam timing:</span> 2-3 mins per question, 25% for review</p>
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Study sessions:</span> 50 mins focus, 10 mins break</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Revision start:</span> 12 weeks before for best results</p>
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Key technique:</span> Active recall beats passive reading</p>
            </div>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-elec-yellow" />
            Learning Outcomes
          </h2>
          <ul className="space-y-3">
            {[
              "Calculate appropriate time allocation for exam questions",
              "Create an effective long-term revision schedule",
              "Apply proven study techniques to maximise retention",
              "Identify and avoid common time-wasting traps",
              "Develop strategies for exam-day time management"
            ].map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 1: Exam Time Allocation */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">1</span>
            <h2 className="text-xl font-bold text-white">Exam Time Allocation</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Understanding how to allocate your time during an exam is crucial for success. Different exams have different structures, and you need a strategy that ensures you attempt all questions while leaving time for review. The key principle is: don't let difficult questions steal time from easier marks.
            </p>
          </div>

          {/* Exam Time Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/10">
                  <th className="border border-white/20 px-3 py-2 text-left text-white text-sm">Exam</th>
                  <th className="border border-white/20 px-3 py-2 text-left text-white text-sm">Duration</th>
                  <th className="border border-white/20 px-3 py-2 text-left text-white text-sm">Questions</th>
                  <th className="border border-white/20 px-3 py-2 text-left text-white text-sm">Time/Q</th>
                </tr>
              </thead>
              <tbody>
                {examTimeAllocation.map((exam, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white/5" : ""}>
                    <td className="border border-white/20 px-3 py-2 text-white/80 text-sm font-medium">{exam.exam}</td>
                    <td className="border border-white/20 px-3 py-2 text-elec-yellow text-sm">{exam.duration}</td>
                    <td className="border border-white/20 px-3 py-2 text-white/60 text-sm">{exam.questions}</td>
                    <td className="border border-white/20 px-3 py-2 text-white/60 text-sm">{exam.timePerQuestion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-amber-400 font-medium mb-1">The 75/25 Rule</h4>
                <p className="text-white/70 text-sm">Aim to complete all questions in 75% of the available time, reserving 25% for review. For a 2-hour exam, this means completing questions in 90 minutes and spending 30 minutes reviewing, checking marked questions, and verifying answers.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <Timer className="w-4 h-4 text-elec-yellow" />
              Exam Day Time Checkpoints
            </h4>
            <div className="grid sm:grid-cols-4 gap-3">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-elec-yellow font-medium">30 mins</p>
                <p className="text-white/60 text-xs">Should have completed ~25% of questions</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-elec-yellow font-medium">60 mins</p>
                <p className="text-white/60 text-xs">Should have completed ~50% of questions</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-elec-yellow font-medium">90 mins</p>
                <p className="text-white/60 text-xs">All questions attempted, begin review</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <p className="text-elec-yellow font-medium">120 mins</p>
                <p className="text-white/60 text-xs">Final check, ensure all answered</p>
              </div>
            </div>
          </div>

          <InlineCheck
            question="In a 2-hour exam with 40 questions, you've completed 15 questions in 30 minutes. Are you on track?"
            answer="No, you're slightly behind. At 30 minutes (25% of time), you should have completed about 10 questions (25% of 40). Completing 15 is actually ahead of schedule, giving you extra time for review or difficult questions."
          />
        </section>

        {/* Section 2: Revision Planning */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">2</span>
            <h2 className="text-xl font-bold text-white">Revision Planning</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Effective revision doesn't happen by chance - it requires planning. A structured approach over 12 weeks gives the best results, allowing time for understanding, practice, and consolidation. Starting too late leads to cramming, which produces poor retention and increased anxiety.
            </p>
          </div>

          {/* Revision Schedule */}
          <div className="space-y-4 mb-6">
            {revisionSchedule.map((phase, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium">{phase.weeks}</h4>
                    <p className="text-elec-yellow text-sm">{phase.focus}</p>
                  </div>
                  <span className="px-2 py-1 bg-elec-yellow/20 text-elec-yellow text-xs rounded font-medium">
                    {phase.hoursPerWeek}
                  </span>
                </div>
                <ul className="space-y-1">
                  {phase.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                      <CheckCircle className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-blue-400 font-medium mb-1">Weekly Rhythm</h4>
                <p className="text-white/70 text-sm">Plan your week with specific topics assigned to specific days. Include one "catch-up" day for topics that need extra attention. Regular, consistent study beats irregular marathon sessions.</p>
              </div>
            </div>
          </div>

          <InlineCheck
            question="Why is it important to start revision 12 weeks before the exam rather than 4 weeks?"
            answer="Starting 12 weeks early allows time for all four phases: foundation building, deep learning, active practice, and consolidation. This enables proper understanding rather than surface memorisation, allows identification and focus on weak areas, and reduces exam anxiety through thorough preparation."
          />
        </section>

        {/* Section 3: Study Techniques */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">3</span>
            <h2 className="text-xl font-bold text-white">Effective Study Techniques</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Not all study time is equal. Research shows that active learning techniques are far more effective than passive reading. Understanding and applying these evidence-based methods can dramatically improve your retention and exam performance.
            </p>
          </div>

          {/* Techniques Grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {practicalTechniques.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h4 className="text-elec-yellow font-medium mb-2">{item.technique}</h4>
                <p className="text-white/70 text-sm mb-2">{item.description}</p>
                <div className="space-y-1 text-xs">
                  <p className="text-green-400/80"><span className="font-medium">Benefit:</span> <span className="text-white/60">{item.benefit}</span></p>
                  <p className="text-blue-400/80"><span className="font-medium">How to apply:</span> <span className="text-white/60">{item.application}</span></p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-green-400 font-medium mb-1">The Testing Effect</h4>
                <p className="text-white/70 text-sm">Research consistently shows that testing yourself (even unsuccessfully) produces better long-term retention than re-reading the same material. Every time you take a quiz on this platform, you're strengthening your memory more than simply reading notes.</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-elec-yellow" />
              Spaced Repetition Schedule
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Day 1: Learn", "Day 2: Review", "Day 4: Review", "Day 7: Review", "Day 14: Review", "Day 30: Review"].map((item, index) => (
                <span key={index} className="px-3 py-1 bg-white/5 rounded-full text-white/70 text-sm border border-white/10">
                  {item}
                </span>
              ))}
            </div>
            <p className="text-white/60 text-xs mt-3">Following this schedule means each topic is reviewed 6 times over a month, with increasing gaps that strengthen long-term memory.</p>
          </div>

          <InlineCheck
            question="Why is active recall more effective than re-reading notes?"
            answer="Active recall forces your brain to retrieve information without cues, strengthening neural pathways. Re-reading creates an illusion of familiarity without actual learning. Testing yourself identifies knowledge gaps and triggers deeper processing of information."
          />
        </section>

        {/* Section 4: Time-Wasting Traps */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">4</span>
            <h2 className="text-xl font-bold text-white">Avoiding Time-Wasting Traps</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Even well-prepared candidates can underperform by falling into common time-wasting traps during the exam. Recognising these pitfalls and having strategies to avoid them can significantly improve your exam performance and reduce stress.
            </p>
          </div>

          {/* Time Traps */}
          <div className="space-y-3 mb-6">
            {timeWastingTraps.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{item.trap}</h4>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-red-400/80 text-xs mb-0.5">Impact:</p>
                        <p className="text-white/60">{item.impact}</p>
                      </div>
                      <div>
                        <p className="text-green-400/80 text-xs mb-0.5">Solution:</p>
                        <p className="text-white/70">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-elec-yellow" />
              The "Mark and Move" Strategy
            </h4>
            <ol className="space-y-2 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-medium">1.</span>
                Read the question once, carefully
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-medium">2.</span>
                If you know the answer, answer it and move on
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-medium">3.</span>
                If unsure, make your best guess, MARK the question, and move on
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-medium">4.</span>
                After completing all questions, return to marked questions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-medium">5.</span>
                Never leave a question unanswered - guessing beats blank
              </li>
            </ol>
          </div>

          <InlineCheck
            question="You've answered a multiple choice question but feel unsure. Should you change your answer?"
            answer="Generally, no. Research shows that first instincts are usually correct and changing answers more often leads to wrong answers. Only change if you have clear evidence of an error, such as misreading the question or remembering specific information that contradicts your choice."
          />
        </section>

        {/* Practical Guidance Box */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Exam Day Time Management Checklist
          </h3>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Before the Exam</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>- Arrive 15-20 minutes early to settle in</li>
                <li>- Have a watch visible (phones usually not allowed)</li>
                <li>- Note the start time and calculate finish time</li>
                <li>- Calculate your time checkpoints (25%, 50%, 75%)</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">First 5 Minutes</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>- Read all instructions carefully</li>
                <li>- Quickly scan through all questions</li>
                <li>- Identify any topics you recognise as strengths</li>
                <li>- Take a deep breath before starting</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Final 15 Minutes</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>- Return to any marked questions</li>
                <li>- Check all questions have an answer</li>
                <li>- Review questions you were unsure about</li>
                <li>- Don't change answers without good reason</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-elec-yellow" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <h4 className="text-white font-medium mb-2">{faq.question}</h4>
                <p className="text-white/70 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Reference Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Reference - Key Numbers</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Time per question (typical)</span>
                <span className="text-white font-medium">2-3 minutes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Review time allocation</span>
                <span className="text-white font-medium">25% of total</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Study session length</span>
                <span className="text-white font-medium">50 minutes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Break duration</span>
                <span className="text-white font-medium">10 minutes</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Ideal revision start</span>
                <span className="text-white font-medium">12 weeks before</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Weekly study hours</span>
                <span className="text-white font-medium">6-12 hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Evening review</span>
                <span className="text-white font-medium">15 minutes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Arrive before exam</span>
                <span className="text-white font-medium">15-20 minutes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Test Your Knowledge</h3>
          {!showQuiz ? (
            <div className="text-center">
              <p className="text-white/70 mb-4">Ready to test your understanding of time management strategies?</p>
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90"
              >
                Start Quiz (12 Questions)
              </Button>
            </div>
          ) : (
            <Quiz
              questions={quizQuestions}
              onComplete={() => setShowQuiz(false)}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-white/10">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
            <Link to="../section2-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Testing Procedures Guide
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90" asChild>
            <Link to="../section3-2">
              Next: Question Analysis Techniques
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module8Section3_1;
