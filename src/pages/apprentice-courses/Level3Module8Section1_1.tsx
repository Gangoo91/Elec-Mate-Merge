/**
 * Level 3 Module 8 Section 1.1 - Full Practice Exams
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 * Comprehensive mock exam preparation and practice strategies
 */

import { ArrowLeft, Zap, CheckCircle, Clock, Target, Shield, Wrench, ClipboardList, FileText, Briefcase, Shuffle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Full Practice Exams - Level 3 Module 8 Section 1.1";
const DESCRIPTION = "Master exam technique with comprehensive full-length mock exams simulating City & Guilds 2365/2357 Level 3 conditions. Practice with realistic timing, question formats, and marking approaches.";

// ============================================
// MOCK EXAM CARDS DATA
// ============================================
const mockExams = [
  {
    number: 1,
    title: "Health & Safety",
    description: "HASAWA, EAWR, RIDDOR, COSHH, Risk Assessment, Safe Systems of Work",
    icon: Shield,
    href: "../level3-module8-mock-exam1",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/20",
  },
  {
    number: 2,
    title: "Environmental Technologies",
    description: "Solar PV, Battery Storage, Heat Pumps, EV Charging, Smart Systems",
    icon: Zap,
    href: "../level3-module8-mock-exam2",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
  },
  {
    number: 3,
    title: "Electrical Science",
    description: "AC/DC Theory, Ohm's Law, Power, Magnetism, Capacitance, Inductance",
    icon: Target,
    href: "../level3-module8-mock-exam3",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    number: 4,
    title: "Fault Diagnosis",
    description: "Fault Types, Diagnosis Methods, Safe Isolation, Test Equipment",
    icon: Wrench,
    href: "../level3-module8-mock-exam4",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
  {
    number: 5,
    title: "Inspection & Testing",
    description: "Initial Verification, Periodic Inspection, Test Sequences, EICR",
    icon: ClipboardList,
    href: "../level3-module8-mock-exam5",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
  {
    number: 6,
    title: "Systems Design",
    description: "Design Principles, Load Calculations, Cable Selection, Protection",
    icon: FileText,
    href: "../level3-module8-mock-exam6",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
  },
  {
    number: 7,
    title: "Career Development",
    description: "Industry Roles, JIB Grading, Qualifications, CPD, Professional Bodies",
    icon: Briefcase,
    href: "../level3-module8-mock-exam7",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
  },
  {
    number: 8,
    title: "Full Practice Exam",
    description: "Mixed questions from all 7 modules - comprehensive exam preparation",
    icon: Shuffle,
    href: "../level3-module8-mock-exam8",
    color: "text-elec-yellow",
    bgColor: "bg-elec-yellow/10",
    borderColor: "border-elec-yellow/30",
  },
];

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "In a 2-hour City & Guilds Level 3 exam with 60 questions, how much time should you allocate per question on average?",
    options: [
      "30 seconds per question",
      "2 minutes per question",
      "5 minutes per question",
      "No time limit - work through at your own pace"
    ],
    correctIndex: 1,
    explanation: "With 60 questions in 120 minutes, you should allocate approximately 2 minutes per question. This allows time to read carefully, consider options, and review flagged questions at the end."
  },
  {
    id: "check-2",
    question: "What is the recommended approach when you encounter a difficult question in an exam?",
    options: [
      "Spend extra time until you work out the answer",
      "Skip it entirely and never return to it",
      "Flag it, make an educated guess, and return later if time permits",
      "Ask the invigilator for help"
    ],
    correctIndex: 2,
    explanation: "Flag difficult questions, make your best educated guess (never leave blank), and return to review them if you have time remaining. This prevents losing marks on easier questions while stuck on one difficult one."
  },
  {
    id: "check-3",
    question: "Which exam format is most commonly used for City & Guilds 2365 Level 3 assessments?",
    options: [
      "Written essay questions only",
      "Multiple choice with four options per question",
      "Oral examination with assessor",
      "Practical demonstration only"
    ],
    correctIndex: 1,
    explanation: "City & Guilds 2365 Level 3 theory exams primarily use multiple choice format with four answer options. Some assessments may include short answer or practical elements depending on the unit."
  },
  {
    id: "check-4",
    question: "What is the typical pass mark for City & Guilds Level 3 electrical installation theory exams?",
    options: [
      "50%",
      "60%",
      "65%",
      "70%"
    ],
    correctIndex: 1,
    explanation: "The standard pass mark for City & Guilds Level 3 electrical installation exams is typically 60%. However, always check your specific exam documentation as this can vary between units and awarding bodies."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "Before starting a mock exam session, what is the most important preparation step?",
    options: [
      "Have snacks and drinks readily available",
      "Create exam conditions - quiet space, no distractions, timer set",
      "Have textbooks open for reference",
      "Play background music to stay relaxed"
    ],
    correctAnswer: 1,
    explanation: "Creating realistic exam conditions is essential for effective mock exam practice. This means a quiet space, removing distractions, setting a proper timer, and not having reference materials available."
  },
  {
    id: 2,
    question: "How many mock exams should you complete before sitting your actual Level 3 exam?",
    options: [
      "Just one, the night before the exam",
      "Two or three complete exams maximum",
      "Multiple exams over several weeks with progressive improvement",
      "Mock exams are not necessary if you study the theory"
    ],
    correctAnswer: 2,
    explanation: "Regular mock exam practice over several weeks allows you to build exam stamina, identify weak areas, improve time management, and track your progress toward exam readiness."
  },
  {
    id: 3,
    question: "What should you do immediately after completing a mock exam?",
    options: [
      "Forget about it and relax",
      "Take another exam straight away",
      "Review all answers, especially incorrect ones, and note patterns",
      "Only review questions you got wrong"
    ],
    correctAnswer: 2,
    explanation: "After completing a mock exam, thoroughly review ALL answers. Understanding why correct answers are right is as important as learning from mistakes. Note recurring weak areas for targeted revision."
  },
  {
    id: 4,
    question: "In a multiple choice question, what technique helps eliminate wrong answers?",
    options: [
      "Always choose the longest answer",
      "Eliminate obviously incorrect options first, then analyse remaining choices",
      "Choose the first option that looks correct",
      "Pick the answer you haven't used recently"
    ],
    correctAnswer: 1,
    explanation: "The elimination technique involves crossing out answers that are clearly wrong, then carefully analysing the remaining options. This increases your chances of selecting the correct answer."
  },
  {
    id: 5,
    question: "What is the recommended approach to reading exam questions?",
    options: [
      "Skim quickly to save time",
      "Read once and answer immediately",
      "Read carefully twice, noting key words and qualifiers",
      "Only read the question if you don't know the answer from options"
    ],
    correctAnswer: 2,
    explanation: "Read questions carefully at least twice, paying attention to key words like 'NOT', 'ALWAYS', 'MUST', and 'EXCEPT'. These qualifiers often change the meaning completely."
  },
  {
    id: 6,
    question: "If you score 55% on your first mock exam, what is the appropriate response?",
    options: [
      "Panic and give up",
      "Take the exam again immediately",
      "Analyse weak areas, study those topics, then retake after revision",
      "Assume the exam was too hard and ignore the result"
    ],
    correctAnswer: 2,
    explanation: "A score below the pass mark indicates areas needing improvement. Analyse which topics caused issues, focus your revision on those areas, then retake a mock exam to measure improvement."
  },
  {
    id: 7,
    question: "What percentage of exam time should you reserve for reviewing your answers?",
    options: [
      "No time - complete all questions and submit immediately",
      "5-10% of total exam time for review",
      "10-15% of total exam time for review",
      "50% of exam time for review"
    ],
    correctAnswer: 2,
    explanation: "Reserve 10-15% of your exam time for reviewing answers. In a 2-hour exam, this means 12-18 minutes. Use this time to check flagged questions and verify your reasoning."
  },
  {
    id: 8,
    question: "When is the best time of day to take mock exams for optimal practice?",
    options: [
      "Late at night when the house is quiet",
      "At the same time of day as your actual scheduled exam",
      "Early morning after waking up",
      "During your lunch break at work"
    ],
    correctAnswer: 1,
    explanation: "Taking mock exams at the same time as your scheduled real exam helps condition your body and mind for peak performance during that time period."
  },
  {
    id: 9,
    question: "What is the purpose of using the flag feature during an exam?",
    options: [
      "To mark questions you definitely got right",
      "To skip questions permanently",
      "To mark questions for review without losing momentum",
      "To indicate you need help from the invigilator"
    ],
    correctAnswer: 2,
    explanation: "The flag feature allows you to mark questions you're uncertain about for later review, while still answering them and maintaining your pace through the exam."
  },
  {
    id: 10,
    question: "How should you approach calculation-based questions in the exam?",
    options: [
      "Skip them as they take too long",
      "Work through methodically, show working, and double-check the answer",
      "Use a calculator for everything without checking",
      "Estimate the answer without calculating"
    ],
    correctAnswer: 1,
    explanation: "Calculation questions require methodical working. Show your working (in written exams), use formulae correctly, and always double-check your answer makes practical sense."
  },
  {
    id: 11,
    question: "What is the most common reason candidates fail Level 3 electrical exams?",
    options: [
      "The questions are too difficult",
      "Poor time management and not covering all topics",
      "Exam halls are too uncomfortable",
      "Calculators are not allowed"
    ],
    correctAnswer: 1,
    explanation: "Poor time management and inadequate topic coverage are the most common reasons for exam failure. Regular mock exam practice with proper timing helps address both issues."
  },
  {
    id: 12,
    question: "What should you do if you finish a mock exam with 20 minutes remaining?",
    options: [
      "Submit immediately - you clearly knew the material well",
      "Take a break and submit when time expires",
      "Review all answers systematically, especially flagged questions",
      "Start studying for the next topic"
    ],
    correctAnswer: 2,
    explanation: "Extra time should be used productively. Review all answers, particularly flagged ones. Check for silly mistakes, verify calculations, and ensure you haven't misread any questions."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "How many mock exams should I complete before my real exam?",
    answer: "Aim to complete at least 5-8 full mock exams over 3-4 weeks before your actual exam. Start with untimed attempts to build confidence, then progress to strictly timed conditions. Track your scores to monitor improvement."
  },
  {
    question: "Should I use books and notes during mock exams?",
    answer: "No. To get the most benefit from mock exams, simulate real exam conditions as closely as possible. This means no notes, no books, no internet access, and strictly timed conditions. You can review with resources afterwards."
  },
  {
    question: "What if I keep scoring below 60% on mock exams?",
    answer: "Analyse your results to identify specific weak areas. Focus revision on those topics using course materials and this app. Take topic-specific quizzes to build knowledge before attempting another full mock exam. Consider speaking with your tutor or assessor for additional support."
  },
  {
    question: "How accurate are mock exams compared to the real thing?",
    answer: "Our mock exams are designed to match City & Guilds exam standards in difficulty, format, and topic weighting. However, real exams may include new question styles. Use mock exams to build competence and confidence, but also thoroughly understand the underlying principles."
  },
  {
    question: "Can I retake the same mock exam multiple times?",
    answer: "Yes, but with caution. Retaking the same exam can help reinforce correct answers, but you may start memorising specific questions rather than understanding concepts. Mix your practice between different exams and topic-specific tests."
  },
  {
    question: "What equipment should I have ready for exam day?",
    answer: "For theory exams: approved scientific calculator, pencils/pens, ruler, and your candidate documentation. Arrive early to settle in. For practical assessments: appropriate PPE, required tools, and test instruments as specified in your assessment guidance."
  }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module8Section1_1 = () => {
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
            <span>Module 8.1.1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Full Practice Exams
          </h1>
          <p className="text-white/80">
            Comprehensive mock examinations simulating real City & Guilds Level 3 conditions
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Format:</strong> 30 questions per exam, 45 minutes timed</li>
              <li><strong>Coverage:</strong> 8 mock exams covering all Level 3 modules</li>
              <li><strong>Pass Mark:</strong> 60% required to pass (18/30 correct)</li>
              <li><strong>Strategy:</strong> 2 minutes per question with review time</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Keywords in questions (NOT, ALWAYS, MUST, EXCEPT)</li>
              <li><strong>Use:</strong> Elimination technique to narrow down options</li>
              <li><strong>Apply:</strong> Flag uncertain questions, don't leave any blank</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Understand the structure and format of City & Guilds Level 3 examinations",
              "Develop effective time management strategies for exam conditions",
              "Apply question analysis techniques to multiple choice formats",
              "Practise using the flag and review system effectively",
              "Build exam stamina through repeated full-length practice",
              "Track progress and identify areas requiring additional revision"
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
            Understanding Exam Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              City & Guilds Level 3 electrical installation examinations follow a structured format designed to assess both theoretical knowledge and practical understanding. Whether you're sitting the 2365-03 (Electrotechnical Technology) or 2357 (NVQ) theory components, understanding the exam structure is your first step to success.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Typical Exam Structure:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Duration:</strong> Level 3 theory exams typically run 2 hours for main units (approximately 60 questions) or 45-60 minutes for smaller unit assessments (25-30 questions). Our mock exams use 45 minutes with 30 questions to provide focused practice sessions.</li>
                <li><strong>Question Format:</strong> Multiple choice with four answer options (A, B, C, D). Only one answer is correct. Some units may include short-answer written components, but the majority of marks come from multiple choice.</li>
                <li><strong>Topic Weighting:</strong> Questions are distributed across the unit syllabus according to guided learning hour weightings. Higher-weighted topics have more questions - typically health and safety, electrical science, and inspection/testing feature heavily.</li>
                <li><strong>Marking:</strong> Each correct answer scores one mark with no negative marking for incorrect answers. Never leave a question blank - always make an educated guess.</li>
                <li><strong>Pass Mark:</strong> The standard pass mark is 60%, meaning you need to answer at least 36 questions correctly in a 60-question exam or 18 out of 30 in our mock exams.</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Insight:</strong> Understanding that there's no penalty for wrong answers is crucial. If you're running short of time, answer every remaining question with your best guess - you might pick up extra marks from educated guesses.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Effective Mock Exam Strategy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Simply taking mock exams isn't enough - you need a strategic approach that maximises learning and builds genuine exam readiness. The most successful candidates treat mock exams as a training programme, progressively building skills and confidence.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase 1: Diagnostic (Weeks 4-3 before exam)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Take one untimed mock exam to establish baseline</li>
                  <li>Identify your strongest and weakest topic areas</li>
                  <li>Note question types that cause difficulty</li>
                  <li>Create a prioritised revision plan</li>
                  <li>Review all answers thoroughly with explanations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Phase 2: Development (Weeks 3-1 before exam)</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Focus revision on identified weak areas</li>
                  <li>Take timed topic-specific quizzes</li>
                  <li>Attempt full mock exams with strict timing</li>
                  <li>Track scores and measure improvement</li>
                  <li>Adjust study plan based on results</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10">
              <p className="text-sm font-medium text-white mb-2">Phase 3: Consolidation (Final Week)</p>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Complete 2-3 full mock exams under strict exam conditions</li>
                <li>Target 70%+ consistently before the real exam</li>
                <li>Review only persistent problem areas - avoid cramming new material</li>
                <li>Build confidence through successful completion</li>
                <li>Rest well the night before - a tired mind makes mistakes</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic mt-4">
              <strong>Pro Tip:</strong> Keep a revision log noting which topics you've studied and your mock exam scores over time. This visual record of improvement is motivating and helps identify persistent weak areas needing extra attention.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Question Analysis Techniques
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Multiple choice questions can be deceptive. What appears to be a straightforward question often contains subtle traps. Developing systematic question analysis skills significantly improves your accuracy and speed.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The RACE Technique:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>R - Read:</strong> Read the question twice. First for overall meaning, second to identify key words. Look for qualifiers like 'ALWAYS', 'NEVER', 'MUST', 'SHOULD', 'EXCEPT', 'NOT'. These words often completely change the required answer.</li>
                <li><strong>A - Analyse:</strong> Before looking at the options, try to formulate your own answer. This prevents being led by plausible-sounding but incorrect options. What do you expect the correct answer to look like?</li>
                <li><strong>C - Consider:</strong> Now examine each option systematically. Eliminate obviously wrong answers first. Usually, you can immediately discard 1-2 options as clearly incorrect. Compare remaining options carefully.</li>
                <li><strong>E - Evaluate:</strong> Select the best answer and move on. If uncertain, flag the question for review but don't leave it blank. Your first instinct is often correct - don't second-guess yourself without good reason.</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 my-6">
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Question Traps</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Absolute words (always, never, only, all)</li>
                  <li>Similar-looking numbers in calculations</li>
                  <li>Correct information in wrong context</li>
                  <li>Options that sound right but aren't</li>
                  <li>Distraction with irrelevant detail</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Answer Patterns to Recognise</p>
                <ul className="text-sm text-white space-y-1">
                  <li>Two options that are opposites - one is usually correct</li>
                  <li>Three similar options and one outlier</li>
                  <li>Answers that are partially correct</li>
                  <li>Options using exact wording from regulations</li>
                  <li>Answers requiring multiple conditions to be true</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Critical Warning:</strong> Never change an answer unless you have a specific reason to do so. Research shows that changed answers are more often changed from correct to incorrect. Trust your initial reasoning unless you've genuinely misread the question.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Time Management in Examinations
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Poor time management is the single biggest cause of exam underperformance. Even well-prepared candidates can fail if they run out of time or spend too long on difficult questions. Developing a reliable time management system is essential.
            </p>

            <div className="grid grid-cols-3 gap-3 my-6 text-center text-sm">
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">First Pass</p>
                <p className="text-white/90 text-xs">70% of time - Answer all questions you know</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Second Pass</p>
                <p className="text-white/90 text-xs">20% of time - Return to flagged questions</p>
              </div>
              <div className="p-3 rounded bg-transparent border border-white/10">
                <p className="font-medium text-white mb-1">Final Review</p>
                <p className="text-white/90 text-xs">10% of time - Check and verify answers</p>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">The 45-Minute Mock Exam Time Budget:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Minutes 0-30 (First Pass):</strong> Work through all 30 questions at a steady pace. Answer those you know confidently. Flag uncertain questions but still select an answer. Don't stop to puzzle over difficult questions - keep moving.</li>
                <li><strong>Minutes 30-40 (Second Pass):</strong> Return to flagged questions. With the pressure of initial completion removed, you may find the answers come more easily. Use elimination technique more thoroughly.</li>
                <li><strong>Minutes 40-45 (Final Review):</strong> Quick check of all answers. Verify any calculations. Ensure no questions are left unanswered. Check you haven't misread any questions on first pass.</li>
              </ul>
            </div>

            <p>
              <strong>Checkpoint System:</strong> For a 30-question, 45-minute exam, you should be at approximately question 10 by 15 minutes, question 20 by 30 minutes. If you're behind, pick up pace. If ahead, slow down and read more carefully.
            </p>

            <p className="text-sm text-white/90 italic mt-4">
              <strong>Real-World Wisdom:</strong> Experienced assessors note that many candidates fail not because they don't know the material, but because they run out of time. Practice with strict timing until it becomes second nature. Your mock exam performance under timed conditions is the best predictor of real exam success.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 04 */}
        <InlineCheck {...quickCheckQuestions[3]} />

        <hr className="border-white/5 my-12" />

        {/* MOCK EXAM CARDS SECTION */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Available Mock Exams</h2>

          {/* Exam Stats Banner */}
          <div className="mb-8 p-4 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">1,400+</div>
                <div className="text-xs text-white/70">Total Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">8</div>
                <div className="text-xs text-white/70">Mock Exams</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">30</div>
                <div className="text-xs text-white/70">Questions/Exam</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-elec-yellow">45</div>
                <div className="text-xs text-white/70">Minutes/Exam</div>
              </div>
            </div>
          </div>

          {/* Mock Exam Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockExams.map((exam) => (
              <Link key={exam.number} to={exam.href}>
                <Card className={`h-full bg-transparent border ${exam.borderColor} hover:border-elec-yellow/40 transition-all duration-200 hover:shadow-lg hover:shadow-elec-yellow/5 cursor-pointer touch-manipulation`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className={`p-2.5 rounded-xl ${exam.bgColor}`}>
                        <exam.icon className={`h-5 w-5 ${exam.color}`} />
                      </div>
                      <span className="text-xs font-semibold text-white/70 bg-muted/30 px-2 py-1 rounded-full">
                        Exam {exam.number}
                      </span>
                    </div>
                    <CardTitle className="text-base text-white">{exam.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-white/70 leading-relaxed mb-3">
                      {exam.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <Clock className="h-3 w-3" />
                      <span>45 mins</span>
                      <span className="text-white/50">|</span>
                      <span>30 questions</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* PRACTICAL GUIDANCE */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Practical Guidance</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Before Each Mock Exam</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Find a quiet space free from interruptions for at least 50 minutes</li>
                <li>Put your phone on silent or in another room</li>
                <li>Have only a calculator and scratch paper available</li>
                <li>Set a timer for 45 minutes with a visible countdown</li>
                <li>Use the toilet and have water ready before starting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">During the Mock Exam</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Read each question twice before looking at options</li>
                <li>Flag uncertain questions but always select an answer</li>
                <li>Don't spend more than 2-3 minutes on any single question</li>
                <li>Use the checkpoint system to monitor your pace</li>
                <li>Stay calm if you encounter unfamiliar material - elimination technique still works</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Rushing through familiar questions</strong> - Easy questions have easy traps too</li>
                <li><strong>Getting stuck on difficult questions</strong> - Flag and move on to maintain momentum</li>
                <li><strong>Leaving questions blank</strong> - Always guess if unsure, no penalty for wrong answers</li>
                <li><strong>Changing answers repeatedly</strong> - First instinct is usually correct</li>
                <li><strong>Not reading the full question</strong> - Key qualifiers are often at the end</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Exam Success Formula</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Time Management</p>
                <ul className="space-y-0.5">
                  <li>2 minutes per question average</li>
                  <li>First pass: 70% of time</li>
                  <li>Second pass: 20% of time</li>
                  <li>Final review: 10% of time</li>
                  <li>Checkpoints at questions 10 and 20</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Question Technique</p>
                <ul className="space-y-0.5">
                  <li>RACE: Read, Analyse, Consider, Evaluate</li>
                  <li>Eliminate wrong answers first</li>
                  <li>Watch for qualifier words</li>
                  <li>Flag uncertain, never leave blank</li>
                  <li>Trust first instinct unless misread</li>
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
            <Link to="../level3-module8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../level3-module8-section1-2">
              Next: Timed Module Tests
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module8Section1_1;
