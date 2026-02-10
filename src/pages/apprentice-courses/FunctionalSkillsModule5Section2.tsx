import { ArrowLeft, ArrowRight, ClipboardList, TrendingUp, BarChart3, BookOpen, Calculator, CheckCircle2, Target, FileText } from "lucide-react";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";

const FunctionalSkillsModule5Section2 = () => {
  useSEO(
    "Section 2: Level 2 Functional Skills Practice - Assessment Preparation",
    "Step up to Level 2 Functional Skills with harder practice questions, multi-step problem solving, advanced English tasks, digital skills format, and exam day preparation for UK electrical apprentices."
  );

  const quizQuestions = [
    {
      id: 1,
      question: "What is a key difference between Level 1 and Level 2 Maths questions?",
      options: [
        "Level 2 allows more time per question",
        "Level 2 questions require multi-step reasoning and real-world application",
        "Level 2 only tests calculator skills",
        "Level 2 has fewer questions overall"
      ],
      correctAnswer: 1,
      explanation: "Level 2 questions are more demanding because they require multi-step reasoning and the ability to apply maths to realistic workplace and everyday scenarios independently."
    },
    {
      id: 2,
      question: "An electrician charges £45 per hour plus VAT at 20%. A job takes 3 hours and requires £120 of materials (no VAT on materials). What is the total cost?",
      options: ["£255.00", "£270.00", "£282.00", "£297.00"],
      correctAnswer: 2,
      explanation: "Labour: 3 x £45 = £135. VAT on labour: £135 x 0.20 = £27. Labour + VAT: £135 + £27 = £162. Total: £162 + £120 materials = £282.00."
    },
    {
      id: 3,
      question: "In Level 2 English, what structure should you use for each paragraph in a persuasive essay?",
      options: [
        "Introduction, middle, end",
        "PEEL: Point, Evidence, Explain, Link",
        "Who, what, when, where, why",
        "Fact, opinion, fact, opinion"
      ],
      correctAnswer: 1,
      explanation: "PEEL (Point, Evidence, Explain, Link) is an effective paragraph structure for persuasive writing. State your point, support it with evidence, explain why it matters, then link back to your main argument."
    },
    {
      id: 4,
      question: "Sand and gravel are mixed in the ratio 2:3. How much gravel is needed for 25 kg of mix?",
      options: ["10 kg", "12.5 kg", "15 kg", "20 kg"],
      correctAnswer: 2,
      explanation: "Total parts = 2 + 3 = 5. Gravel = 25 divided by 5 x 3 = 15 kg. The gravel makes up 3 out of the 5 total parts of the mixture."
    },
    {
      id: 5,
      question: "When writing a formal letter to someone whose name you do not know, how should you sign off?",
      options: ["Yours sincerely", "Yours faithfully", "Kind regards", "Best wishes"],
      correctAnswer: 1,
      explanation: "Use 'Yours faithfully' when you do not know the recipient's name (i.e. you wrote 'Dear Sir/Madam'). Use 'Yours sincerely' when you do know their name (i.e. you wrote 'Dear Mr Smith')."
    },
    {
      id: 6,
      question: "A kitchen is 5.4 m by 3.8 m. Tiles cost £28.50 per m² with 15% wastage allowance. What is the total tile cost?",
      options: ["£584.82", "£653.94", "£684.00", "£710.00"],
      correctAnswer: 2,
      explanation: "Area = 5.4 x 3.8 = 20.52 m². With 15% wastage: 20.52 x 1.15 = 23.598 m². Round up to 24 m² (cannot buy part-tiles). Cost = 24 x £28.50 = £684.00."
    },
    {
      id: 7,
      question: "What does 'inference' mean in the context of a Level 2 reading exam?",
      options: [
        "Copying information directly from the text",
        "Working out meaning from clues in the text that are not directly stated",
        "Guessing the answer without reading the text",
        "Finding the main heading of the passage"
      ],
      correctAnswer: 1,
      explanation: "Inference means reading between the lines — understanding what the writer implies without stating it directly. You use clues and context to work out meaning that is not explicitly written."
    },
    {
      id: 8,
      question: "When practising under exam conditions, what is the most important rule?",
      options: [
        "Play background music to stay relaxed",
        "Have your phone nearby for emergencies",
        "Set a strict timer and do not pause it or look things up",
        "Take a 10-minute break halfway through"
      ],
      correctAnswer: 2,
      explanation: "The whole point of timed practice is to simulate the real exam experience. You must commit to the timer and avoid looking things up, just as you would in the actual exam room."
    }
  ];

  return (
    <div className="pb-24 bg-elec-dark min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-elec-dark/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link to="/study-centre/apprentice/functional-skills/module5" className="p-2 -ml-2 touch-manipulation">
            <ArrowLeft className="w-5 h-5 text-white/60" />
          </Link>
          <div>
            <p className="text-[11px] font-semibold text-green-400 uppercase tracking-wider">Module 5 • Section 2</p>
            <h1 className="text-base font-bold text-white">Level 2 Functional Skills Practice</h1>
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
                <ClipboardList className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Level 2 Functional Skills Practice</h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Step up to Level 2 standard with more challenging practice questions, multi-step problem solving, advanced writing tasks, and comprehensive exam day preparation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 mt-6">

        {/* 01 - Step Up to Level 2 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">01</span>
            <h3 className="text-lg font-bold text-white">Step Up to Level 2</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Level 2 Functional Skills is equivalent to a GCSE grade 4 (formerly grade C) and represents a significant step up from Level 1. Understanding the differences helps you prepare for the higher expectations and complexity of questions.
            </p>
            <p>
              Achieving Level 2 is a requirement for completing your electrical apprenticeship End-Point Assessment (EPA). It is also recognised by employers as equivalent to GCSE grade 4, opening doors to further training, supervisory roles, and career progression within the electrical industry.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                The jump from Level 1 to Level 2 is manageable with consistent practice. Most apprentices who struggle do so because they do not practise enough under timed conditions, not because the content is too difficult. Put in the hours and you will succeed.
              </p>
            </div>

            <h4 className="text-white font-semibold pt-2">Key Differences from Level 1</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Multi-step problems:</strong> Questions require two or more calculations or reasoning steps to reach an answer</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Independent problem-solving:</strong> You must decide which mathematical operations to use without being guided through steps</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Complex contexts:</strong> Problems are set in more realistic and detailed real-world scenarios</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Higher accuracy in English:</strong> More sophisticated vocabulary, varied sentence structures, and stronger argument construction expected</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Multiple sources:</strong> You may need to interpret information from two or more documents and compare them</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">New Topics at Level 2</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Maths:</strong> Ratio and proportion, scale drawings, compound measures, percentage increase/decrease, probability, more complex area and volume calculations</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">English:</strong> Persuasive writing, report writing, comparing texts, evaluating arguments, inference and deduction</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Digital:</strong> More complex spreadsheet formulae, data presentation, combining information from multiple sources</span></li>
            </ul>
          </div>
        </motion.div>

        {/* 02 - Level 2 Maths Format */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">02</span>
            <h3 className="text-lg font-bold text-white">Level 2 Maths Format</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The Level 2 Maths exam follows a similar structure to Level 1 but with more demanding questions. The exam is typically 1 hour 45 minutes to 2 hours, split into non-calculator and calculator sections.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Level 2 Exam Structure</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Section A — Non-Calculator (approx. 30-40 min)</p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Harder mental arithmetic including working with negative numbers</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Fractions, decimals, and percentages without calculator support</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Estimation and approximation skills</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Simple ratio calculations and unit conversions</span></li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-400 mb-1">Section B — Calculator Allowed (approx. 70-80 min)</p>
                  <ul className="space-y-1 text-xs text-white/70">
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Multi-step problems requiring you to choose the method</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Complex area, perimeter, and volume calculations</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Interpreting data from tables, charts, and graphs</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Percentage change, ratio, proportion, and scale</span></li>
                    <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Probability and mean, median, mode, and range</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Additional Level 2 Maths Topics</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Ratio and Proportion:</strong> Dividing quantities in given ratios, scaling recipes and mixtures, understanding direct proportion</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Scale Drawings:</strong> Reading and interpreting scale drawings (e.g., 1:50 means 1 cm = 50 cm real life). Essential for reading architectural plans.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Compound Measures:</strong> Speed = distance/time, density = mass/volume, and rearranging these formulae</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Percentage Change:</strong> Calculating percentage increase and decrease, including VAT calculations at 20%</span></li>
            </ul>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                At Level 2, examiners award marks for method, accuracy, and interpretation. Even if your final numerical answer is wrong, a correct method can earn you significant marks. Always show every step of your working clearly.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after 02 */}
        <InlineCheck
          question="On a 1:100 scale drawing, a wall measures 4.5 cm. What is the actual length of the wall?"
          answer="Actual length = 4.5 x 100 = 450 cm = 4.5 metres. Multiply the drawing measurement by the scale factor to find the real-world dimension."
        />

        {/* 03 - Level 2 Maths Practice Questions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">03</span>
            <h3 className="text-lg font-bold text-white">Level 2 Maths Practice Questions</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              These practice questions are set at Level 2 standard with multi-step problems in electrical work contexts. Work through each one carefully before checking the solution.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 1 — Ratio</p>
              </div>
              <p className="text-sm text-white/80">
                Cement and sand are mixed in the ratio 1:4. If you need 30 kg of mix total, how much cement and how much sand are needed?
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Total parts = 1 + 4 = 5<br />
                  Cement = 30 divided by 5 x 1 = <strong className="text-white">6 kg</strong><br />
                  Sand = 30 divided by 5 x 4 = <strong className="text-white">24 kg</strong><br />
                  Check: 6 + 24 = 30 kg (correct)
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 2 — VAT and Labour</p>
              </div>
              <p className="text-sm text-white/80">
                An electrician charges £45 per hour plus VAT at 20%. A job takes 3 hours and requires £120 of materials (no VAT on materials). What is the total cost to the customer?
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Step 1: Labour cost = 3 x £45 = £135<br />
                  Step 2: VAT on labour = £135 x 0.20 = £27<br />
                  Step 3: Labour + VAT = £135 + £27 = £162<br />
                  Step 4: Total = £162 + £120 materials = <strong className="text-white">£282.00</strong>
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 3 — Percentage Decrease</p>
              </div>
              <p className="text-sm text-white/80">
                Electricity bills over 6 months were: Jan £85, Feb £78, Mar £72, Apr £65, May £58, Jun £52. What is the percentage decrease from January to June? Round to one decimal place.
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Step 1: Find the decrease = £85 - £52 = £33<br />
                  Step 2: Percentage = (33 divided by 85) x 100 = 38.8235...<br />
                  Step 3: Round to 1 d.p. = <strong className="text-white">38.8%</strong>
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 4 — Area with Wastage</p>
              </div>
              <p className="text-sm text-white/80">
                A kitchen is 5.4 m by 3.8 m. Tiles cost £28.50 per square metre and there is a 15% wastage allowance. How much will the tiles cost?
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Step 1: Area = 5.4 x 3.8 = 20.52 m²<br />
                  Step 2: Add 15% wastage = 20.52 x 1.15 = 23.598 m²<br />
                  Step 3: Round up (cannot buy part-tiles) = 24 m²<br />
                  Step 4: Cost = 24 x £28.50 = <strong className="text-white">£684.00</strong>
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 5 — Probability</p>
              </div>
              <p className="text-sm text-white/80">
                A box contains 3 red fuses, 5 blue fuses, and 2 green fuses. What is the probability of picking a blue fuse at random? Express as both a fraction and a decimal.
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Total fuses = 3 + 5 + 2 = 10<br />
                  P(blue) = 5/10 = <strong className="text-white">1/2 or 0.5</strong>
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Practice Question 6 — Compound Measures</p>
              </div>
              <p className="text-sm text-white/80">
                An electrician drives 84 miles to a job site in 1 hour 45 minutes. What was the average speed in miles per hour?
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Step 1: Convert time to hours = 1 hour 45 min = 1.75 hours<br />
                  Step 2: Speed = distance divided by time = 84 divided by 1.75 = <strong className="text-white">48 mph</strong>
                </p>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                At Level 2, questions deliberately give you more information than you need, or require you to decide which calculation method to use. Read the question carefully and identify what is actually being asked before you start calculating. Planning your approach saves time and reduces errors.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 04 - Level 2 English Format */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">04</span>
            <h3 className="text-lg font-bold text-white">Level 2 English Format</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Level 2 English demands greater sophistication in both reading comprehension and writing. You need to demonstrate analytical skills when reading and persuasive, well-structured writing with accurate spelling, punctuation, and grammar.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Level 2 Reading Exam</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Duration:</strong> Approximately 1 hour</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Texts:</strong> Longer passages (500-800 words), may include multiple documents to compare</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Skills tested:</strong> Inference, deduction, comparing viewpoints, evaluating arguments, understanding bias and persuasion</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Question types:</strong> Extended responses requiring explanation and evidence from the text</span></li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">Level 2 Writing Exam</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Duration:</strong> Approximately 1 hour</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Tasks:</strong> Formal letters, reports, articles, persuasive writing, or discursive essays</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Length:</strong> Typically 250-350 words, with well-developed paragraphs</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Marking:</strong> Content and ideas (30-40%), Organisation (20-25%), Language use (20-25%), SPaG (15-20%)</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Inference Skills at Level 2</h4>
            <p>
              Inference means reading between the lines — understanding what the writer implies without stating it directly. This is a critical Level 2 skill that distinguishes it from Level 1.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <p className="text-xs font-semibold text-green-400 mb-1">Inference Example</p>
              <p className="text-xs text-white/70 italic mb-2">
                Text: "The contractor arrived 45 minutes late, offered no apology, and began work without consulting the site plan."
              </p>
              <p className="text-xs text-white/70">
                Inference: The writer is criticising the contractor's unprofessional behaviour — this is implied through the negative details chosen, even though the writer never directly says "the contractor was unprofessional."
              </p>
            </div>

            <h4 className="text-white font-semibold pt-2">The PEEL Paragraph Structure</h4>
            <p>
              For persuasive and discursive writing at Level 2, use the PEEL structure for each body paragraph:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">P — Point</p>
                <p className="text-xs text-white/70">State your main idea or argument clearly in the first sentence</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">E — Evidence</p>
                <p className="text-xs text-white/70">Support your point with facts, statistics, examples, or expert opinions</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">E — Explain</p>
                <p className="text-xs text-white/70">Explain why this evidence supports your point and why it matters</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">L — Link</p>
                <p className="text-xs text-white/70">Link back to your main argument or transition to the next point</p>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                At Level 2, you must use a variety of connectives to link your ideas: however, furthermore, in addition, consequently, nevertheless, moreover, on the other hand. This shows the examiner you can construct a coherent, flowing argument.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after 04 */}
        <InlineCheck
          question="When writing a formal letter to someone whose name you do not know, which sign-off should you use?"
          answer="Use 'Yours faithfully' when you do not know the recipient's name (i.e. you began with 'Dear Sir/Madam'). Use 'Yours sincerely' when you do know their name (i.e. you began with 'Dear Mr Smith')."
        />

        {/* 05 - Level 2 English Practice Questions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">05</span>
            <h3 className="text-lg font-bold text-white">Level 2 English Practice Questions</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              These practice tasks are at Level 2 standard with more complex reading and writing requirements. They reflect the types of questions you will encounter in the exam.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-green-400 mb-1">Reading Practice — Comparing Sources</p>
              <div className="bg-white/5 rounded-lg p-3 text-xs text-white/70 italic mb-2">
                <p className="mb-1 font-semibold not-italic text-green-400">Source A — Trade Magazine Article</p>
                <p className="mb-2">"The electrical industry is facing a skills shortage that could last a decade. With an ageing workforce and insufficient apprenticeship starts, the sector needs to attract more young people. Investment in training and competitive wages are essential to secure the future of the trade."</p>
                <p className="mb-1 font-semibold not-italic text-green-400">Source B — Industry Body Report</p>
                <p>"Recent data shows that apprenticeship completions have risen by 8% this year, suggesting the skills gap may be narrowing. However, critics argue that the quality of training varies significantly between providers, and completion rates alone do not indicate workplace readiness."</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-white/80"><strong className="text-white">Q1:</strong> How do Source A and Source B differ in their view of the skills shortage?</p>
                <p className="text-xs text-white/60 ml-4">Answer: Source A presents a pessimistic outlook, emphasising a long-term crisis and the need for action. Source B is more balanced, acknowledging improvement in apprenticeship numbers whilst noting concerns about training quality.</p>
                <p className="text-sm text-white/80"><strong className="text-white">Q2:</strong> Which source is more persuasive, and why?</p>
                <p className="text-xs text-white/60 ml-4">Answer: Source B is arguably more persuasive because it uses specific data (8% rise) and presents both sides of the argument, giving it greater credibility. Source A relies on general statements without specific evidence.</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-green-400 mb-1">Writing Practice — Formal Report</p>
              <p className="text-sm text-white/80">
                Write a formal report to your site manager about a health and safety concern you have observed on site. Include a title, introduction explaining the purpose of the report, a description of what you observed, the potential risks, and your recommendations for action.
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Model Structure</p>
                <ul className="space-y-1 text-xs text-white/70">
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Title:</strong> Health and Safety Report — [Specific Issue]</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Introduction:</strong> The purpose of this report is to bring to your attention a safety concern I observed on [date] at [location]...</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Findings:</strong> During my work on [area], I noticed that [describe the issue in detail]. This poses a risk because [explain the danger]...</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Recommendations:</strong> I recommend the following actions: (1) Immediately [short-term fix], (2) Arrange for [longer-term solution], (3) Brief all site operatives on [relevant safety measure]...</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Conclusion:</strong> I trust this report will be given prompt attention. I am happy to discuss further if needed.</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <p className="text-xs font-semibold text-green-400 mb-1">Writing Practice — Persuasive Article</p>
              <p className="text-sm text-white/80">
                Write an article for your college newsletter arguing that all school leavers should consider an apprenticeship in the electrical trade. Use persuasive techniques including statistics, expert opinions, and rhetorical questions.
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Persuasive Techniques to Include</p>
                <ul className="space-y-1 text-xs text-white/70">
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Rhetorical question:</strong> "Why would you saddle yourself with university debt when you could earn while you learn?"</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Statistics:</strong> "Qualified electricians earn an average of £35,000-£45,000 per year, with many self-employed electricians earning significantly more."</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Rule of three:</strong> "An electrical apprenticeship offers practical skills, financial independence, and a career for life."</span></li>
                  <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Counter-argument:</strong> "Some may argue that university offers broader opportunities, but with the growing demand for skilled electricians and the shift towards renewable energy, this trade has never been more relevant."</span></li>
                </ul>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Useful Connectives for Level 2 Writing</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="bg-white/5 rounded-lg p-2 text-center text-xs text-white/70">However</div>
              <div className="bg-white/5 rounded-lg p-2 text-center text-xs text-white/70">Furthermore</div>
              <div className="bg-white/5 rounded-lg p-2 text-center text-xs text-white/70">Consequently</div>
              <div className="bg-white/5 rounded-lg p-2 text-center text-xs text-white/70">Nevertheless</div>
              <div className="bg-white/5 rounded-lg p-2 text-center text-xs text-white/70">In addition</div>
              <div className="bg-white/5 rounded-lg p-2 text-center text-xs text-white/70">On the other hand</div>
            </div>
          </div>
        </motion.div>

        {/* 06 - Level 2 Digital Skills Format */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">06</span>
            <h3 className="text-lg font-bold text-white">Level 2 Digital Skills Format</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              The Level 2 Digital Functional Skills assessment builds on Level 1 with more complex tasks. You need to demonstrate greater independence, problem-solving, and the ability to combine information from multiple digital sources.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-white font-semibold text-sm mb-3">Assessment Structure</h4>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Duration:</strong> Approximately 2 hours 30 minutes for practical tasks</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Format:</strong> Scenario-based tasks requiring you to use multiple applications</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Skills tested:</strong> Advanced formatting, complex spreadsheet formulae, data analysis, evaluating information reliability</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">Key Skills at Level 2</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Spreadsheets:</strong> IF functions, VLOOKUP, conditional formatting, creating charts that communicate data effectively, sorting and filtering data</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Word Processing:</strong> Using styles and headings, creating contents pages, mail merge basics, professional document layout</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Presentations:</strong> Slide design principles, effective use of images and data, appropriate transitions, audience awareness</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Online Safety:</strong> Understanding phishing, secure passwords, data protection principles, evaluating website reliability</span></li>
            </ul>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-2">
              <p className="text-xs font-semibold text-green-400 mb-1">Practice Task — Spreadsheet</p>
              <p className="text-xs text-white/70">
                Create a job costing spreadsheet for a domestic rewire. Include columns for: item description, quantity, unit cost, total cost, and a VAT column that calculates 20% automatically. Use SUM for the subtotal, a formula for VAT calculation, and a grand total. Add conditional formatting to highlight any items costing over £100 in red. Create a pie chart showing the cost breakdown by category.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                At Level 2, you are expected to evaluate whether information from online sources is reliable and appropriate. Consider who published it, when it was published, whether it is fact or opinion, and whether the source has any bias. This applies to research tasks in the assessment.
              </p>
            </div>
          </div>
        </motion.div>

        {/* InlineCheck after 06 */}
        <InlineCheck
          question="What is the key difference between Level 1 and Level 2 Digital Skills assessments?"
          answer="Level 2 requires greater independence, more complex tasks (such as IF functions and conditional formatting in spreadsheets), the ability to combine information from multiple sources, and critical evaluation of online information for reliability and bias."
        />

        {/* 07 - Advanced Problem-Solving */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">07</span>
            <h3 className="text-lg font-bold text-white">Advanced Problem-Solving</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              Level 2 problems often require you to combine multiple mathematical skills and complete several calculations to reach a final answer. The key difference from Level 1 is that you must decide which methods to use — the question will not guide you through each step.
            </p>

            <h4 className="text-white font-semibold pt-2">Problem-Solving Strategy</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Step 1 — Read:</strong> Read the entire question twice. Underline key information and the specific question being asked.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Step 2 — Plan:</strong> Before calculating, decide what operations you need and in what order. Write a brief plan.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Step 3 — Calculate:</strong> Work through each step carefully, showing all working.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Step 4 — Check:</strong> Does your answer make sense in context? Is the unit correct? Is the magnitude reasonable?</span></li>
            </ul>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-green-400" />
                <p className="text-xs font-semibold text-green-400">Complex Problem — Full Quotation</p>
              </div>
              <p className="text-sm text-white/80">
                An electrician needs to quote for rewiring a flat. The flat has 4 rooms averaging 12 m² each. Cable costs £1.85 per metre and each room needs approximately 15 metres of cable. Labour is £40 per hour and the job will take 16 hours. A consumer unit costs £185. Add 10% contingency to the material total, then add 20% VAT to the entire quotation. What is the final price?
              </p>
              <div className="bg-white/5 rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold text-green-400 mb-1">Worked Solution</p>
                <p className="text-xs text-white/70">
                  Step 1: Cable needed = 4 rooms x 15 m = 60 m<br />
                  Step 2: Cable cost = 60 x £1.85 = £111.00<br />
                  Step 3: Materials = £111.00 + £185.00 (consumer unit) = £296.00<br />
                  Step 4: Contingency = £296.00 x 1.10 = £325.60<br />
                  Step 5: Labour = 16 x £40 = £640.00<br />
                  Step 6: Subtotal = £325.60 + £640.00 = £965.60<br />
                  Step 7: VAT = £965.60 x 0.20 = £193.12<br />
                  Step 8: Total = £965.60 + £193.12 = <strong className="text-white">£1,158.72</strong>
                </p>
              </div>
            </div>

            <h4 className="text-white font-semibold pt-2">Marking Criteria at Level 2</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-green-400" />
                <h4 className="text-white font-semibold text-sm">How Marks Are Awarded</h4>
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Method marks (M):</strong> Awarded for using the correct approach, even if the final answer is wrong</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Accuracy marks (A):</strong> Awarded for reaching the correct final answer</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Follow-through marks:</strong> If you make an error in step 1 but correctly apply it in step 2, you can still earn marks for step 2</span></li>
                <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Communication marks:</strong> For showing clear, logical working and giving your answer with correct units</span></li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                Method marks are your safety net. In a 5-mark multi-step question, the final answer might only be worth 1 mark — the other 4 marks are for showing correct method at each stage. Never skip steps in your working.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 08 - Exam Day Preparation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2.5 py-1 rounded-full">08</span>
            <h3 className="text-lg font-bold text-white">Exam Day Preparation</h3>
          </div>
          <div className="space-y-3 text-sm text-white/80 leading-relaxed">
            <p>
              What you do in the days and hours before your exam can significantly affect your performance. Good preparation reduces anxiety and helps you arrive calm, focused, and ready to do your best.
            </p>

            <h4 className="text-white font-semibold pt-2">The Week Before</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Final mock exam:</strong> Complete one full timed paper under exam conditions. Mark it and focus your remaining revision on weak areas only.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Confirm logistics:</strong> Check the exam venue address, room number, start time, and what you need to bring. Plan your journey.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Light revision only:</strong> Review flashcards and key formulae. Do not try to learn new topics — this is about consolidation.</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span><strong className="text-white">Rest properly:</strong> Get good sleep in the days leading up to the exam. Your brain consolidates learning during sleep.</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">The Night Before</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Pack everything you need (see checklist below) the evening before</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Set two alarms to ensure you wake up on time</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Avoid heavy revision — read through key notes once, then stop</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Do something relaxing in the evening to help you sleep well</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Exam Morning</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Eat a proper breakfast — your brain needs fuel to concentrate for 90 minutes or more</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Leave early — aim to arrive 15-20 minutes before the start time</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Avoid panic conversations with other candidates — other people's anxiety is contagious</span></li>
              <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">•</span><span>Use waiting time for calm breathing, not last-minute cramming</span></li>
            </ul>

            <h4 className="text-white font-semibold pt-2">Equipment Checklist</h4>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" /><span>Photo ID (driving licence or passport)</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" /><span>Scientific calculator with fresh batteries (check it works the night before)</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" /><span>Two black pens (in case one runs out)</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" /><span>Pencil, eraser, and sharpener (for diagrams and rough work)</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" /><span>Clear ruler (30 cm preferred)</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" /><span>Clear water bottle with label removed</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" /><span>Watch or small clock (phones are not allowed)</span></li>
              </ul>
            </div>

            <h4 className="text-white font-semibold pt-2">During the Exam — Staying Calm</h4>
            <p>
              If you feel anxious during the exam, pause for 30 seconds and take three deep breaths. Then read the next question slowly and carefully. Remember: you are prepared, you have practised, and you can do this. If a question seems too difficult, skip it and come back later — do not let one difficult question derail your entire paper.
            </p>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
              <p className="text-xs font-semibold text-green-400 mb-1">Key Point</p>
              <p className="text-sm text-white/80">
                After the exam, do not dwell on questions you found difficult. You cannot change your answers now. Focus forward — if you have another exam coming up, switch your attention to preparing for that. If it was your last exam, take time to relax and celebrate completing it.
              </p>
            </div>

            <h4 className="text-white font-semibold pt-2">Building from Level 1 to Level 2</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">Weeks 1-2: Foundation Review</p>
                <p className="text-xs text-white/70">Revise Level 1 topics. Aim for 90%+ on Level 1 practice papers before moving on.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">Weeks 3-4: New Topics</p>
                <p className="text-xs text-white/70">Learn Level 2 concepts one at a time. Work through examples before attempting questions alone.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">Weeks 5-6: Integration</p>
                <p className="text-xs text-white/70">Practise mixed problems combining L1 and L2 skills. Complete timed sections.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-400 mb-1">Weeks 7-8: Mock Exams</p>
                <p className="text-xs text-white/70">Full papers under exam conditions. Focus remaining time on identified weak spots.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} title="Level 2 Functional Skills Knowledge Check" />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Link to="/study-centre/apprentice/functional-skills/module5/section1" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors touch-manipulation">
            <ArrowLeft className="w-4 h-4" />
            Level 1 Practice
          </Link>
          <Link to="/study-centre/apprentice/functional-skills/module5/section3" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-green-500 hover:bg-green-600 transition-colors touch-manipulation shadow-lg shadow-green-500/25">
            Study Techniques
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FunctionalSkillsModule5Section2;