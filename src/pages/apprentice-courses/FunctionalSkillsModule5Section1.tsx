import { ArrowLeft, ArrowRight, ClipboardCheck, Clock, Calculator, BookOpen, AlertTriangle, CheckCircle2, Target, Lightbulb } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule5Section1 = () => {
  useSEO(
    "Section 1: Level 1 Functional Skills Practice - Assessment Preparation",
    "Practise Level 1 Functional Skills in Maths, English, and ICT with real exam formats, sample questions, time management strategies, and common mistakes to avoid for UK electrical apprentices."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "How long is the Level 1 Functional Skills Maths exam typically?",
      options: ["30 minutes", "1 hour", "1 hour 30 minutes", "2 hours"],
      correctAnswer: 2,
      explanation: "The Level 1 Functional Skills Maths exam is typically 1 hour 30 minutes, split between a non-calculator section (approximately 30 minutes) and a calculator section (approximately 60 minutes)."
    },
    {
      id: 2,
      question: "In a Level 1 English writing task, which of the following is most important?",
      options: [
        "Using as many long words as possible",
        "Writing clearly with correct spelling, grammar, and punctuation",
        "Writing as much as you can regardless of quality",
        "Using complex sentence structures throughout"
      ],
      correctAnswer: 1,
      explanation: "At Level 1, clarity and accuracy are paramount. Assessors look for correct spelling, grammar, and punctuation alongside clear communication of ideas appropriate to the audience and purpose."
    },
    {
      id: 3,
      question: "A cable costs £2.45 per metre. How much would 12 metres cost?",
      options: ["£24.50", "£29.40", "£28.40", "£30.00"],
      correctAnswer: 1,
      explanation: "£2.45 multiplied by 12 = £29.40. Break it down: £2 x 12 = £24, then £0.45 x 12 = £5.40, giving a total of £24 + £5.40 = £29.40."
    },
    {
      id: 4,
      question: "Which reading skill is assessed in the Level 1 English reading exam?",
      options: [
        "Speed reading only",
        "Identifying main points, details, and understanding purpose",
        "Memorising entire passages word for word",
        "Only understanding technical vocabulary"
      ],
      correctAnswer: 1,
      explanation: "Level 1 reading assesses your ability to identify main points, extract relevant details, and understand the purpose and audience of different texts. You must refer back to the text for your answers."
    },
    {
      id: 5,
      question: "What fraction of an hour is 45 minutes?",
      options: ["1/2", "2/3", "3/4", "4/5"],
      correctAnswer: 2,
      explanation: "45 minutes out of 60 minutes = 45/60 = 3/4 of an hour. This is a common conversion used in timesheets and job costing for electrical work."
    },
    {
      id: 6,
      question: "In the Level 1 ICT assessment, what does 'fitness for purpose' mean?",
      options: [
        "The document looks attractive",
        "The document is suitable for its intended audience and use",
        "The document is as long as possible",
        "The document uses every formatting tool available"
      ],
      correctAnswer: 1,
      explanation: "Fitness for purpose means your document is appropriate for its intended audience and use. A safety notice should be clear and direct, whilst a formal letter should use professional language and layout."
    },
    {
      id: 7,
      question: "If a room is 4.5 m by 3.2 m, what is its area?",
      options: ["7.7 m²", "14.4 m²", "15.4 m²", "14.04 m²"],
      correctAnswer: 1,
      explanation: "Area = length x width = 4.5 x 3.2 = 14.4 m². Area calculations are essential for electrical work such as determining lighting layouts and cable run requirements."
    },
    {
      id: 8,
      question: "Which time management strategy is most effective during an exam?",
      options: [
        "Spend all your time on the first question to get it perfect",
        "Skip the instructions and start answering immediately",
        "Allocate time per question based on marks available",
        "Answer questions in random order"
      ],
      correctAnswer: 2,
      explanation: "Allocating time based on marks available ensures you give appropriate attention to higher-value questions whilst still attempting every question on the paper."
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
              Module 5 • Section 1
            </p>
            <h1 className="text-base font-bold text-white">
              Level 1 Functional Skills Practice
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
                <ClipboardCheck className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Level 1 Functional Skills Practice
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Understand exam formats, practise with sample questions at Level 1 standard, and develop strategies to confidently pass your Functional Skills assessments.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* 01 - Understanding Level 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Understanding Level 1</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Level 1 Functional Skills qualifications sit between GCSE grades 3 and 1 (old grades D-G). They demonstrate that you can apply fundamental maths, English, and ICT skills to real-world situations — exactly the kind of tasks you encounter on site as an electrical apprentice.
            </p>
            <p>
              As part of your apprenticeship framework, you must achieve at least Level 1 in both Maths and English before your End-Point Assessment (EPA). Many employers and training providers require Level 2, but Level 1 is the minimum gateway qualification. If you already hold a GCSE grade 4 or above, you may be exempt — check with your training provider.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Functional Skills are not about abstract theory — every question is set in a practical, real-world context. For electricians, this means questions about measurements, costs, safety documents, and workplace communications. You are already using these skills daily.
              </p>
            </div>

            <p>
              The main awarding bodies for Functional Skills are City & Guilds, Pearson (Edexcel), NCFE, and Open Awards. Whilst the format may vary slightly between boards, the content standards are set by Ofqual and remain consistent across all providers. Your training centre will confirm which board you are sitting.
            </p>

            <h4 className="text-white font-semibold pt-2">What Level 1 Covers</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Maths:</strong> Whole numbers, fractions, decimals, percentages, ratio, measurement, shape, space, and basic data handling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">English:</strong> Reading comprehension, writing for purpose, spelling, punctuation, and grammar (SPaG)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">ICT / Digital Skills:</strong> Using software to create documents, spreadsheets, and presentations fit for purpose</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Who Needs Level 1</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Apprentices who do not yet hold a GCSE grade 4 (C) or above in Maths or English</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Anyone wanting to progress to Level 2 Functional Skills as a stepping stone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Mature learners returning to formal education after time away</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Career changers entering the electrical trade from other industries</span>
              </li>
            </ul>

            <p>
              Each subject is assessed independently. You can pass them in any order and at different times. If you fail one, you only need to resit that particular subject — your passes in the other subjects are retained indefinitely.
            </p>
          </div>
        </motion.div>

        {/* 02 - Level 1 Maths Format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Level 1 Maths Format</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The Level 1 Maths exam is an externally set and marked paper. It is typically divided into two sections and lasts approximately 1 hour 30 minutes in total, though exact timings can vary by awarding body.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Exam Structure</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Section A — Non-Calculator</p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Approximately 30 minutes duration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Tests mental arithmetic and number sense</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Questions on addition, subtraction, multiplication, division, fractions, and simple percentages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>No calculator permitted — you must show all working out</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Section B — Calculator Allowed</p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Approximately 1 hour duration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>More complex, multi-step problems set in real-world contexts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Covers measurement, ratio, proportion, area, perimeter, and data interpretation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">•</span>
                      <span>Scientific calculator allowed (not a phone calculator)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p>
              The pass mark is typically around 60-65%, though this can vary between sittings as awarding bodies adjust for difficulty. You are expected to show your working — even if your final answer is wrong, you can pick up method marks for demonstrating the correct approach.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Always show your working, even in the calculator section. If you make a keying error on your calculator but your method is correct, you can still earn method marks. A blank answer always scores zero, but a partially correct method can score partial marks.
              </p>
            </div>

            <h4 className="text-white font-semibold pt-2">Topics Covered at Level 1</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Number:</strong> Whole numbers up to 1,000,000; decimals to 2 decimal places; fractions (halves, quarters, thirds, fifths, tenths); percentages (10%, 25%, 50%, 75%)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Measures:</strong> Length (mm, cm, m, km), weight (g, kg), capacity (ml, l), time (12-hour and 24-hour), temperature, and currency</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Shape and Space:</strong> Perimeter, area of rectangles and triangles, properties of 2D shapes, and simple scale drawings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Data Handling:</strong> Reading tables, charts, and simple graphs; calculating mean averages; understanding probability in simple terms</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Question Types You Will See</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">Multiple Choice</p>
                <p className="text-xs text-white/70">Select the correct answer from four options</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">Short Answer</p>
                <p className="text-xs text-white/70">Write a numerical answer with working shown</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">Multi-Step</p>
                <p className="text-xs text-white/70">Problems requiring two or more calculations</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after 02 */}
        <InlineCheck
          question="In the Level 1 Maths exam, can you use a calculator in Section A?"
          answer="No. Section A is a non-calculator section that tests your mental arithmetic and number sense. Calculators are only permitted in Section B, which covers more complex multi-step problems."
        />

        {/* 03 - Level 1 Maths Practice Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Level 1 Maths Practice Questions</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Below are practice questions at Level 1 standard, set in contexts relevant to electrical work. Try each one before checking the worked solution. These cover the key topic areas you will see in the exam.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 1 — Non-Calculator (Whole Numbers)</p>
              </div>
              <p className="text-sm text-white/80">
                An electrician buys 8 rolls of cable at £15 each and 4 packs of cable clips at £3 each. What is the total cost?
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Cable: 8 x £15 = £120<br />
                  Clips: 4 x £3 = £12<br />
                  Total: £120 + £12 = <strong className="text-white">£132</strong>
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 2 — Non-Calculator (Fractions)</p>
              </div>
              <p className="text-sm text-white/80">
                A job requires 3/4 of a 100-metre drum of cable. How many metres of cable are needed?
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  3/4 of 100 = 100 divided by 4 x 3<br />
                  100 divided by 4 = 25<br />
                  25 x 3 = <strong className="text-white">75 metres</strong>
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 3 — Non-Calculator (Percentages)</p>
              </div>
              <p className="text-sm text-white/80">
                An electrician buys cable costing £85.00. There is a 20% discount for trade customers. How much does the electrician pay?
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Find 20% of £85: 20/100 x 85 = £17.00<br />
                  Subtract the discount: £85.00 - £17.00 = <strong className="text-white">£68.00</strong>
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 4 — Calculator (Area)</p>
              </div>
              <p className="text-sm text-white/80">
                A rectangular kitchen measures 4.8 metres by 3.5 metres. The electrician needs to install downlighters with one light per 2 m². How many downlighters are needed?
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Area = 4.8 x 3.5 = 16.8 m²<br />
                  Lights needed = 16.8 divided by 2 = 8.4<br />
                  Round up (you cannot install 0.4 of a light) = <strong className="text-white">9 downlighters</strong>
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 5 — Calculator (Overtime Pay)</p>
              </div>
              <p className="text-sm text-white/80">
                An electrician works 37.5 hours per week and earns £12.80 per hour. Overtime is paid at 1.5 times the normal rate. If they work 4 hours overtime one week, what is their total pay?
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Normal pay: 37.5 x £12.80 = £480.00<br />
                  Overtime rate: £12.80 x 1.5 = £19.20<br />
                  Overtime pay: 4 x £19.20 = £76.80<br />
                  Total: £480.00 + £76.80 = <strong className="text-white">£556.80</strong>
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 6 — Calculator (Data Handling)</p>
              </div>
              <p className="text-sm text-white/80">
                A team of 5 electricians completed the following numbers of installations last month: 12, 15, 9, 18, and 11. What was the mean average number of installations per electrician?
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Total installations: 12 + 15 + 9 + 18 + 11 = 65<br />
                  Mean = total divided by number of values = 65 divided by 5 = <strong className="text-white">13 installations</strong>
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 7 — Calculator (Unit Conversion)</p>
              </div>
              <p className="text-sm text-white/80">
                A cable run measures 2,750 millimetres. Express this in metres.
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Recall that 1 metre = 1,000 millimetres<br />
                  Divide by 1,000: 2,750 divided by 1,000 = <strong className="text-white">2.75 metres</strong>
                </p>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                In real exam questions, always check whether you need to round up or round down. For physical items (lights, cables, circuit breakers), always round up — you cannot install a fraction of an item. For costs, round to 2 decimal places. For measurements, follow the instruction in the question.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 04 - Level 1 English Format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Level 1 English Format</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Level 1 Functional Skills English is divided into three components: Reading, Writing, and Speaking, Listening and Communicating (SLC). The reading and writing components are externally assessed exams, while SLC is assessed internally by your training provider.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Reading Exam</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Duration:</strong> Approximately 45 minutes to 1 hour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Format:</strong> You are given one or more texts (letters, articles, notices, instructions, leaflets) and answer questions about them</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Skills tested:</strong> Identifying main points, extracting details, understanding purpose, comparing information, understanding vocabulary in context</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Question types:</strong> Multiple choice, short answer, and extended response (a few sentences)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Writing Exam</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Duration:</strong> Approximately 45 minutes to 1 hour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Format:</strong> You complete one or two writing tasks such as writing a letter, email, report, or article</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Skills tested:</strong> Writing clearly and coherently, correct spelling, grammar and punctuation, using appropriate tone and format</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Length:</strong> Typically 150-250 words per task, though there is no strict word limit</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Speaking, Listening and Communicating (SLC)</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Format:</strong> Assessed by your tutor, often through a group discussion or short presentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Skills tested:</strong> Taking part in discussions, making relevant contributions, listening to others, presenting information clearly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Tip:</strong> This is often the easiest component — you are assessed on everyday communication skills you already use on site with colleagues</span>
                </li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">How Marks Are Allocated</h4>
            <p>
              Most reading questions are worth 1-2 marks. For 1-mark questions, a brief, accurate answer is sufficient. For 2-mark questions, you need to provide evidence from the text or give two distinct points. Always refer back to the text provided — do not rely solely on your own background knowledge.
            </p>

            <h4 className="text-white font-semibold pt-2">Time Planning for Writing</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-lg text-green-400 font-bold">5 min</div>
                <div className="text-xs text-white/60">Planning</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-lg text-green-400 font-bold">30 min</div>
                <div className="text-xs text-white/60">Writing</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-lg text-green-400 font-bold">5 min</div>
                <div className="text-xs text-white/60">Checking</div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                In the writing exam, always plan before you write. Spend 5 minutes noting key points, deciding on paragraph structure, and identifying the correct tone (formal for letters, semi-formal for emails). A well-organised response with a few minor errors will score higher than a disorganised one that is technically perfect.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after 04 */}
        <InlineCheck
          question="Name the three components of the Level 1 English Functional Skills assessment."
          answer="Reading, Writing, and Speaking, Listening and Communicating (SLC). Reading and Writing are externally examined, whilst SLC is assessed internally by your training provider through discussions or presentations."
        />

        {/* 05 - Level 1 English Practice Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Level 1 English Practice Questions</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Below are practice exercises in the style of Level 1 English reading and writing tasks. These use contexts relevant to electrical apprentices to help you connect the skills to your daily work.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-green-400 mb-1">Reading Practice — Safety Notice</p>
              <div className="bg-white/5 rounded-lg p-3 text-xs text-white/70 italic">
                <p className="mb-2">
                  "IMPORTANT NOTICE — All electrical work in communal areas must be completed by 17:00 each day. Tools and materials must be stored securely overnight. Any work requiring isolation of the main supply must be agreed with the building manager at least 24 hours in advance. Failure to comply may result in removal from site."
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-white/80"><strong className="text-white">Q1:</strong> By what time must electrical work in communal areas be completed?</p>
                <p className="text-xs text-white/60 ml-4">Answer: By 17:00 (5 pm)</p>

                <p className="text-sm text-white/80"><strong className="text-white">Q2:</strong> What must happen before isolating the main supply?</p>
                <p className="text-xs text-white/60 ml-4">Answer: Agreement with the building manager at least 24 hours in advance</p>

                <p className="text-sm text-white/80"><strong className="text-white">Q3:</strong> What is the purpose of this notice?</p>
                <p className="text-xs text-white/60 ml-4">Answer: To inform contractors of site rules and the consequences of not following them</p>

                <p className="text-sm text-white/80"><strong className="text-white">Q4:</strong> Who is the intended audience for this notice?</p>
                <p className="text-xs text-white/60 ml-4">Answer: Electricians and other contractors working on site</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-green-400 mb-1">Reading Practice — Workplace Email</p>
              <div className="bg-white/5 rounded-lg p-3 text-xs text-white/70 italic">
                <p className="mb-1">Subject: Updated PPE Requirements</p>
                <p className="mb-2">
                  "Following the recent health and safety review, all operatives working on the Riverside Development must now wear high-visibility vests at all times, including inside the building. Hard hats remain compulsory in all areas where overhead work is taking place. Safety boots must be worn throughout the site. Any operative found without the correct PPE will be asked to leave site immediately. New PPE can be collected from the site office between 07:00 and 08:00."
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-white/80"><strong className="text-white">Q1:</strong> What new requirement has been introduced?</p>
                <p className="text-xs text-white/60 ml-4">Answer: High-visibility vests must be worn at all times, including inside the building</p>

                <p className="text-sm text-white/80"><strong className="text-white">Q2:</strong> When are hard hats compulsory?</p>
                <p className="text-xs text-white/60 ml-4">Answer: In all areas where overhead work is taking place</p>

                <p className="text-sm text-white/80"><strong className="text-white">Q3:</strong> Where and when can new PPE be collected?</p>
                <p className="text-xs text-white/60 ml-4">Answer: From the site office between 07:00 and 08:00</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-green-400 mb-1">Writing Practice — Formal Email</p>
              <p className="text-sm text-white/80">
                Write a formal email to your supervisor explaining that you have discovered a fault with the consumer unit in a property you are working on. Include what the fault is, what action you have taken so far, and what you recommend as the next step.
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Model Answer Structure</p>
                <ul className="space-y-1 text-xs text-white/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span><strong className="text-white">Opening:</strong> Dear [Name], I am writing to inform you of a fault I have identified at [address]...</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span><strong className="text-white">Description:</strong> During my inspection of the consumer unit, I noticed that the main switch shows signs of overheating and discolouration...</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span><strong className="text-white">Action taken:</strong> I have isolated the affected circuit and made the area safe. I have also informed the homeowner...</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span><strong className="text-white">Recommendation:</strong> I recommend that we arrange for a full inspection and replacement of the consumer unit...</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>
                    <span><strong className="text-white">Closing:</strong> Please let me know how you would like to proceed. Kind regards, [Your name]</span>
                  </li>
                </ul>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Common SPaG Errors to Watch For</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">There / Their / They're:</strong> "There" = a place; "Their" = belonging to them; "They're" = they are</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Your / You're:</strong> "Your" = belonging to you; "You're" = you are</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Its / It's:</strong> "Its" = belonging to it; "It's" = it is or it has</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Affect / Effect:</strong> "Affect" = verb (to influence); "Effect" = noun (the result)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">To / Too / Two:</strong> "To" = direction or infinitive; "Too" = also or excessively; "Two" = the number 2</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* 06 - Level 1 ICT Format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Level 1 ICT Format</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The Level 1 ICT Functional Skills assessment (now often called Digital Functional Skills under the 2019 reformed standards) tests your ability to use digital tools effectively in realistic workplace scenarios. This is typically assessed through practical, computer-based tasks.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-white font-semibold text-sm mb-3">Assessment Format</h4>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Duration:</strong> Approximately 2 hours for the practical tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Format:</strong> You are given a scenario and must complete tasks using word processing, spreadsheet, and/or presentation software</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Skills tested:</strong> Creating documents, formatting text, using formulae in spreadsheets, inserting images, saving files correctly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Software:</strong> Usually Microsoft Office (Word, Excel, PowerPoint) or equivalent applications</span>
                </li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Key Skills at Level 1</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Word Processing:</strong> Create a professional document with headings, bullet points, tables, and appropriate formatting. Change fonts, sizes, and colours. Use spell check effectively.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Spreadsheets:</strong> Enter data accurately, use basic formulae (SUM, simple multiplication), format cells for currency or percentages, create a simple chart or graph from data.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Email and Internet:</strong> Compose an email with an appropriate subject line and tone, attach a file, use a search engine to find specific information.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">File Management:</strong> Save files with sensible names, organise into folders, understand common file types (.docx, .pdf, .xlsx, .jpg).</span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                The ICT assessment focuses on whether your documents are fit for purpose — not on using every feature available. A clean, well-formatted job sheet is worth more than a cluttered document with unnecessary formatting. Think about what a real reader needs to see and present information accordingly.
              </p>
            </div>

            <h4 className="text-white font-semibold pt-2">Electrical Context Practice Tasks</h4>
            <p>
              In your assessment, tasks might include creating a material order form in a spreadsheet, writing a professional letter to a customer about upcoming work, or producing a short safety briefing document. Practise creating these kinds of workplace documents regularly so they feel natural.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <p className="text-xs font-semibold text-green-400 mb-1">Practice Task</p>
              <p className="text-xs text-white/70">
                Create a spreadsheet listing 10 common electrical materials (e.g., 2.5 mm² twin and earth cable, consumer unit, RCDs, MCBs). Include columns for item name, quantity needed, unit price, and total cost. Use a SUM formula to calculate the grand total at the bottom. Format the header row in bold with a coloured background. Save the file as "Material_Order_[date].xlsx".
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <p className="text-xs font-semibold text-green-400 mb-1">Practice Task 2</p>
              <p className="text-xs text-white/70">
                Write a formal letter using a word processor to a customer confirming the date and time of an electrical inspection. Include the company letterhead details, a clear subject line, the date and address, and a professional sign-off. Use appropriate formatting including bold for the subject line and correct paragraph spacing.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after 06 */}
        <InlineCheck
          question="What does 'fitness for purpose' mean in the context of the ICT assessment?"
          answer="It means your document is suitable and appropriate for its intended audience and use. A safety notice should be clear and direct, a formal letter should be professional, and a spreadsheet should present data logically. It is about meeting the reader's needs, not demonstrating every available feature."
        />

        {/* 07 - Time Management Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Time Management Strategies</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Poor time management is one of the biggest reasons candidates lose marks in Functional Skills exams. It is not about rushing — it is about working strategically so you can attempt every question and maximise your overall score.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">The Mark-Per-Minute Rule</h4>
              </div>
              <p className="text-xs text-white/70 mb-2">
                Calculate how many minutes you have per mark. For example, in a 90-minute exam worth 60 marks:
              </p>
              <p className="text-xs text-white/70">
                90 divided by 60 = 1.5 minutes per mark
              </p>
              <p className="text-xs text-white/70 mt-2">
                This means a 4-mark question should take approximately 6 minutes. A 2-mark question should take about 3 minutes. Use this as a rough guide for pacing yourself through the paper.
              </p>
            </div>

            <h4 className="text-white font-semibold pt-2">Before the Exam Begins</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Read all instructions:</strong> Spend the first 2-3 minutes reading through the entire paper. Note how many questions there are and their mark values.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Identify quick wins:</strong> Spot questions you find easy and ensure you attempt them first or set aside time for them.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Note time checkpoints:</strong> Write down when you should be starting each section (e.g., "Section B by 10:30").</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold pt-2">During the Exam</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Do not get stuck:</strong> If a question is taking too long (more than 3 minutes on a 2-mark question), write what you can and move on. Come back to it later.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Answer the question asked:</strong> Read the question twice. Underline the command word (calculate, explain, describe, identify, compare).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Show your working:</strong> Even a wrong answer with the correct method can earn marks in maths.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span><strong className="text-white">Check the clock:</strong> Glance at the time every 15 minutes to ensure you are on track with your time plan.</span>
              </li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Time Allocation by Exam Type</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">Maths Exam (90 min)</p>
                <ul className="text-xs text-white/70 space-y-1">
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Non-calculator: ~1.5 min per question</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Calculator: ~2-3 min per question</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Final checking: 5-10 minutes</span></li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">English Exam (60 min)</p>
                <ul className="text-xs text-white/70 space-y-1">
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Reading questions: ~1 min per mark</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Writing task: 30-35 minutes total</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Final checking: 5 minutes</span></li>
                </ul>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Last 10 Minutes</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Go back to any questions you skipped and attempt them now</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Check your answers for obvious errors (wrong units, decimal point in wrong place)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Ensure you have written your name and candidate number on every page</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Re-read writing tasks for spelling and grammar errors you can quickly correct</span>
              </li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Never leave a question blank. Even an educated guess can earn you marks, particularly in multiple-choice questions. A blank answer always scores zero, but a guess has at least a 25% chance of being correct on a four-option question.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 08 - Common Mistakes to Avoid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Common Mistakes to Avoid</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Learning from the most common mistakes that candidates make can significantly improve your exam performance. These errors are avoidable with awareness and practice.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-white font-semibold text-sm">Maths Mistakes</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Not showing working:</strong> Even if the answer is correct, you lose method marks without working shown. This is the single most common reason for lost marks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Forgetting units:</strong> Always include units in your answer (m, m², kg, £). An answer of "14.4" without "m²" may lose you a mark.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Misreading the question:</strong> "Calculate the perimeter" is not the same as "calculate the area." Underline the command word before you start.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Decimal errors:</strong> Double-check decimal point placement. £12.80 is very different from £128.00 or £1.28.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Not checking reasonableness:</strong> Does your answer make sense? If a cable costs £2.45 per metre, 12 metres should not cost £2,940.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Rounding too early:</strong> Keep full decimal values throughout your calculation and only round at the final step.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-white font-semibold text-sm">English Mistakes</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Not planning writing tasks:</strong> Jumping straight into writing often leads to rambling, disorganised responses. Spend 3-5 minutes planning your structure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Wrong tone or format:</strong> A formal letter requires "Dear Sir/Madam" and "Yours faithfully," not "Hi mate." Always match your tone to the audience specified.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Not using paragraphs:</strong> A solid block of text is hard to read and shows poor organisation. Use a new paragraph for each new point or idea.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Copying from the source text:</strong> In reading exams, use your own words where possible. Direct copying shows you have found the information but may not fully understand it.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Ignoring proofreading:</strong> Always re-read your writing in the final minutes. Common errors like "their" instead of "there" can be caught easily with a quick check.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h4 className="text-white font-semibold text-sm">ICT Mistakes</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Not saving regularly:</strong> Save your work every few minutes using Ctrl+S. Losing your work to a crash is devastating and entirely preventable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Wrong file format:</strong> If the task says "save as PDF," do not submit a .docx file. Read the file format instructions carefully.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Over-formatting:</strong> Using five different fonts and rainbow colours makes your document look unprofessional. Keep formatting clean and consistent.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong className="text-white">Formula errors:</strong> In spreadsheets, check your cell references. =A2*B2 is correct only if A2 and B2 contain the values you intend to multiply.</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                The number one mistake across all subjects is not reading the question properly. Before answering, read the question at least twice. Identify exactly what is being asked, what information is given, and how many marks are available. The marks tell you how much detail is expected in your answer.
              </p>
            </div>

            <h4 className="text-white font-semibold pt-2">Pre-Exam Checklist</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Scientific calculator with fresh batteries (not a phone)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Two black pens and a pencil (for diagrams and rough work)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Ruler (clear, 30 cm preferred for scale drawings)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Eraser and pencil sharpener</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Photo ID (driving licence or passport — required at most centres)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Water bottle (clear, label removed as per exam rules)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Know the exam venue, room number, and start time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Arrive at least 15 minutes early to settle in calmly</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Level 1 Functional Skills Knowledge Check" />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link
            to="/study-centre/apprentice/functional-skills/module5"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Module
          </Link>
          <Link
            to="/study-centre/apprentice/functional-skills/module5/section2"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25"
          >
            Level 2 Practice
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule5Section1;