import { useState } from "react";
import { ArrowLeft, ArrowRight, Zap, CheckCircle, AlertTriangle, Search, Target, FileQuestion, Eye, HelpCircle, Lightbulb, BookOpen, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";

const Level3Module8Section3_2 = () => {
  useSEO(
    "Question Analysis Techniques - Level 3 Mock Exams & Exam Preparation",
    "How to read, understand and approach different types of exam questions - keyword identification, question types, and elimination strategies"
  );

  const [showQuiz, setShowQuiz] = useState(false);

  // Question types data
  const questionTypes = [
    {
      type: "Direct Knowledge",
      description: "Tests recall of specific facts, values, or regulations",
      example: "What is the minimum insulation resistance for a 230V circuit?",
      strategy: "Either you know it or you don't - quick answer or move on",
      keywords: ["What is", "State the", "Name the", "Define"]
    },
    {
      type: "Application",
      description: "Requires applying knowledge to a scenario",
      example: "A circuit has Zs of 1.2Ω. The protective device is a 32A Type B MCB. Does this comply with BS 7671?",
      strategy: "Identify the relevant regulation/table, apply the values, compare",
      keywords: ["Calculate", "Determine", "Given that", "If...then"]
    },
    {
      type: "Analysis",
      description: "Requires breaking down a problem into components",
      example: "Why would an RCD trip during an insulation resistance test?",
      strategy: "Consider all factors, eliminate impossible causes, identify most likely",
      keywords: ["Why", "Explain", "What caused", "Analyse"]
    },
    {
      type: "Best Answer",
      description: "Multiple options may seem correct - choose the BEST one",
      example: "The MOST important reason for safe isolation is to...",
      strategy: "Read ALL options, compare them, look for the most complete/accurate",
      keywords: ["MOST", "BEST", "PRIMARY", "MAIN"]
    },
    {
      type: "Negative Questions",
      description: "Asks what is NOT correct or should NOT be done",
      example: "Which of the following is NOT a requirement for...",
      strategy: "Read carefully - you're looking for the false/incorrect statement",
      keywords: ["NOT", "EXCEPT", "LEAST", "NEVER"]
    },
    {
      type: "Calculation",
      description: "Requires mathematical computation",
      example: "Calculate the voltage drop for a 30m run of 2.5mm2 cable carrying 20A",
      strategy: "Show working, use correct formula, check units, verify answer is sensible",
      keywords: ["Calculate", "Work out", "Find", "What is the value"]
    }
  ];

  // Command words data
  const commandWords = [
    { word: "State", meaning: "Give the fact or information directly - no explanation needed" },
    { word: "Identify", meaning: "Point out or select the correct item from options" },
    { word: "List", meaning: "Write a series of items - no explanation needed" },
    { word: "Describe", meaning: "Give a detailed account in words - paint a picture" },
    { word: "Explain", meaning: "Make clear with reasons - say WHY or HOW" },
    { word: "Calculate", meaning: "Work out using numbers and show your method" },
    { word: "Compare", meaning: "Show similarities AND differences between things" },
    { word: "Evaluate", meaning: "Make a judgement based on evidence" },
    { word: "Justify", meaning: "Give reasons for your answer or decision" },
    { word: "Determine", meaning: "Work out or establish using given information" }
  ];

  // Distractor patterns data
  const distractorPatterns = [
    {
      pattern: "Close but not quite",
      description: "Option uses similar wording but has subtle error",
      example: "Correct: 1.0 MΩ at 500V DC / Distractor: 1.0 MΩ at 250V DC",
      howToSpot: "Check ALL details - voltage, unit, value"
    },
    {
      pattern: "Reversed logic",
      description: "Option has the relationship backwards",
      example: "Correct: Higher Zs = slower disconnection / Distractor: Higher Zs = faster disconnection",
      howToSpot: "Think through the logic carefully"
    },
    {
      pattern: "Partially correct",
      description: "Option is partly right but incomplete or includes wrong element",
      example: "Option includes correct regulation but wrong part number",
      howToSpot: "Don't stop at the first familiar word - read the whole option"
    },
    {
      pattern: "Common misconception",
      description: "Option reflects a widespread misunderstanding",
      example: "RCDs protect against electric shock (partial truth - they reduce risk)",
      howToSpot: "Be wary of options that sound 'too simple' or absolute"
    },
    {
      pattern: "Technical-sounding nonsense",
      description: "Uses impressive terms but is meaningless or wrong",
      example: "Inverted polarity differential surge coupling",
      howToSpot: "If it sounds complex but you've never heard it - probably wrong"
    },
    {
      pattern: "Extreme absolutes",
      description: "Uses words like 'always', 'never', 'all', 'none'",
      example: "RCDs will ALWAYS prevent electric shock",
      howToSpot: "Absolutes are rarely correct in electrical work - exceptions exist"
    }
  ];

  // Elimination strategy steps
  const eliminationSteps = [
    {
      step: 1,
      action: "Read the question carefully",
      detail: "Identify exactly what is being asked. Underline key words."
    },
    {
      step: 2,
      action: "Predict your answer",
      detail: "Before looking at options, think what the answer should be."
    },
    {
      step: 3,
      action: "Read ALL options",
      detail: "Don't stop at the first option that looks right."
    },
    {
      step: 4,
      action: "Eliminate clearly wrong options",
      detail: "Cross out options you know are definitely incorrect."
    },
    {
      step: 5,
      action: "Compare remaining options",
      detail: "Look for subtle differences between similar options."
    },
    {
      step: 6,
      action: "Select best answer",
      detail: "Choose the most complete, accurate option remaining."
    }
  ];

  // Quiz questions
  const quizQuestions = [
    {
      question: "A question asks 'Which is the MOST important reason for...' What type of question is this?",
      options: [
        "Direct knowledge question",
        "Best answer question",
        "Calculation question",
        "Negative question"
      ],
      correctAnswer: 1,
      explanation: "Keywords like 'MOST', 'BEST', and 'PRIMARY' indicate a best answer question where multiple options may be partially correct but one is the best choice."
    },
    {
      question: "When you see the command word 'Explain' in a question, what is expected?",
      options: [
        "Give a single word answer",
        "List the items without detail",
        "Make clear with reasons - say WHY or HOW",
        "Calculate a numerical value"
      ],
      correctAnswer: 2,
      explanation: "'Explain' requires you to make something clear by giving reasons. Simply stating a fact is not enough - you must say WHY or HOW."
    },
    {
      question: "You encounter a question with the word 'EXCEPT' in it. What should you do?",
      options: [
        "Look for the correct statement",
        "Look for the incorrect or false statement",
        "Choose the first option",
        "Skip the question"
      ],
      correctAnswer: 1,
      explanation: "Questions using 'EXCEPT', 'NOT', or 'LEAST' are negative questions. You need to find the option that is FALSE or does NOT apply."
    },
    {
      question: "What is a 'distractor' in a multiple choice question?",
      options: [
        "The correct answer",
        "An incorrect option designed to mislead",
        "The question stem",
        "The marks allocated"
      ],
      correctAnswer: 1,
      explanation: "Distractors are incorrect options deliberately designed to appear plausible. Understanding distractor patterns helps you identify and eliminate them."
    },
    {
      question: "An option states: 'RCDs will ALWAYS prevent fatal electric shock.' Is this likely correct?",
      options: [
        "Yes - RCDs are specifically designed for this",
        "No - absolute terms like 'ALWAYS' are rarely correct",
        "Yes - this is the primary purpose of RCDs",
        "It depends on the RCD type"
      ],
      correctAnswer: 1,
      explanation: "Options using absolute terms like 'ALWAYS', 'NEVER', 'ALL' are usually incorrect. RCDs reduce risk but cannot guarantee prevention of all shocks."
    },
    {
      question: "Before reading the options in a multiple choice question, what should you do?",
      options: [
        "Guess which letter is most common",
        "Skip to the next question",
        "Predict what the answer should be",
        "Look for the longest option"
      ],
      correctAnswer: 2,
      explanation: "Predicting your answer before reading options prevents being influenced by distractors. If your prediction matches an option, it's likely correct."
    },
    {
      question: "You've eliminated two options but can't decide between the remaining two. What's the best strategy?",
      options: [
        "Always choose the longer option",
        "Compare the subtle differences between them",
        "Pick the first one",
        "Leave it blank"
      ],
      correctAnswer: 1,
      explanation: "When stuck between two options, carefully compare their differences. One often has a subtle error or the other is more complete."
    },
    {
      question: "What does the command word 'State' require you to do?",
      options: [
        "Give a detailed explanation with examples",
        "Calculate a value and show working",
        "Give the fact or information directly without explanation",
        "Compare multiple options"
      ],
      correctAnswer: 2,
      explanation: "'State' requires a direct answer without explanation. Unlike 'explain', you don't need to give reasons - just the fact."
    },
    {
      question: "A distractor pattern shows 'Correct: 1.0 MΩ at 500V DC' vs 'Distractor: 1.0 MΩ at 250V DC'. What type of distractor is this?",
      options: [
        "Reversed logic",
        "Close but not quite",
        "Technical-sounding nonsense",
        "Common misconception"
      ],
      correctAnswer: 1,
      explanation: "This is a 'close but not quite' distractor where the wording is similar but a detail (voltage in this case) is subtly wrong."
    },
    {
      question: "Why should you read ALL options before selecting an answer?",
      options: [
        "To find the longest answer",
        "Because the correct answer is always last",
        "To avoid missing a better answer after selecting the first one that seems right",
        "To calculate the average"
      ],
      correctAnswer: 2,
      explanation: "The first option that looks correct may be a distractor. A better, more complete answer may be among the later options."
    },
    {
      question: "A question asks about voltage drop calculation. What type of question is this?",
      options: [
        "Direct knowledge",
        "Best answer",
        "Negative question",
        "Calculation"
      ],
      correctAnswer: 3,
      explanation: "Questions asking you to calculate, work out, or find a numerical value are calculation questions. They require mathematical computation."
    },
    {
      question: "What should you do if an option uses impressive technical terms you've never encountered?",
      options: [
        "Choose it - it sounds professional",
        "Be suspicious - it may be technical-sounding nonsense",
        "Skip the question",
        "Choose the simplest option instead"
      ],
      correctAnswer: 1,
      explanation: "Technical-sounding nonsense is a common distractor pattern. If complex terminology is unfamiliar despite your revision, it may be made up."
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "What if I can't eliminate any options?",
      answer: "First, re-read the question to ensure you understand what's being asked. If still stuck, look for extreme words (always, never) which are usually wrong. Make an educated guess, mark the question, and return to it later if time permits."
    },
    {
      question: "Should I change my answer if I'm unsure?",
      answer: "Research shows first instincts are usually correct. Only change your answer if you have a specific reason - like realising you misread the question or remembering a fact that contradicts your choice. Vague doubt is not a good reason to change."
    },
    {
      question: "How do I handle 'All of the above' or 'None of the above' options?",
      answer: "Carefully evaluate each option individually. For 'All of the above', if you find even one incorrect option, eliminate it. For 'None of the above', only select if you're confident all other options are wrong."
    },
    {
      question: "What if two options seem identical?",
      answer: "They're not - look more closely for subtle differences in wording, numbers, or qualifiers. One small word can change the entire meaning. If they truly seem identical, one may be a typo - choose the one that matches your knowledge."
    },
    {
      question: "How important is it to show working in calculation questions?",
      answer: "Very important, even in multiple choice. If you make an arithmetic error but show correct method, you may still get marks. It also helps you check your own work and identify where you went wrong if the answer doesn't match an option."
    },
    {
      question: "What if my calculated answer isn't among the options?",
      answer: "First, recheck your calculation. Then verify you used the correct formula and units. Check for common errors like using wrong table values or forgetting decimal places. If still no match, choose the closest option and mark for review."
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
              <FileQuestion className="w-6 h-6 text-elec-yellow" />
            </div>
            <div>
              <p className="text-sm text-elec-yellow font-medium">Section 3.2</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Question Analysis Techniques</h1>
            </div>
          </div>
          <p className="text-lg text-white/70">
            Master the art of analysing exam questions to identify what's being asked, spot distractors, and select the correct answer with confidence.
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
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Read carefully:</span> Identify question type and keywords</p>
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Predict first:</span> Think of answer before reading options</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Eliminate:</span> Remove clearly wrong options systematically</p>
              <p className="text-white/80 text-sm"><span className="text-elec-yellow font-medium">Spot distractors:</span> Watch for common misleading patterns</p>
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
              "Identify different types of exam questions and appropriate strategies",
              "Understand command words and what examiners expect",
              "Recognise common distractor patterns in multiple choice questions",
              "Apply systematic elimination techniques to improve accuracy",
              "Develop confidence in selecting answers under exam pressure"
            ].map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/80">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 1: Question Types */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">1</span>
            <h2 className="text-xl font-bold text-white">Understanding Question Types</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Exam questions fall into distinct categories, each requiring a different approach. Recognising the question type immediately helps you allocate time appropriately and apply the right strategy. Don't treat every question the same way - adapt your approach to what's being asked.
            </p>
          </div>

          {/* Question Types Grid */}
          <div className="space-y-4 mb-6">
            {questionTypes.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-elec-yellow font-medium">{item.type}</h4>
                  <div className="flex flex-wrap gap-1">
                    {item.keywords.map((kw, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white/10 text-white/60 text-xs rounded">{kw}</span>
                    ))}
                  </div>
                </div>
                <p className="text-white/70 text-sm mb-2">{item.description}</p>
                <div className="bg-white/5 rounded-lg p-3 mb-2">
                  <p className="text-white/50 text-xs mb-1">Example:</p>
                  <p className="text-white/80 text-sm italic">"{item.example}"</p>
                </div>
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-green-400/80 text-xs">{item.strategy}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-amber-400 font-medium mb-1">Watch for Negative Questions</h4>
                <p className="text-white/70 text-sm">Questions containing 'NOT', 'EXCEPT', or 'LEAST' are easily misread. Underline these words when you see them. You're looking for the FALSE or INCORRECT statement, not the correct one.</p>
              </div>
            </div>
          </div>

          <InlineCheck
            question="A question asks 'Which of the following is NOT a requirement for...' - what are you looking for?"
            answer="You're looking for the FALSE statement - the one that is NOT a requirement. The other three options will be true/correct statements. This is a negative question that reverses normal logic."
          />
        </section>

        {/* Section 2: Command Words */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">2</span>
            <h2 className="text-xl font-bold text-white">Command Words Decoded</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Command words tell you exactly what the examiner expects. Understanding the difference between 'State' and 'Explain' can mean the difference between full marks and losing marks. Use the right amount of detail for the command word given.
            </p>
          </div>

          {/* Command Words Grid */}
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {commandWords.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-lg p-3">
                <h4 className="text-elec-yellow font-medium mb-1">{item.word}</h4>
                <p className="text-white/70 text-sm">{item.meaning}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <Eye className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-blue-400 font-medium mb-1">Key Distinction: State vs Explain</h4>
                <p className="text-white/70 text-sm">"State the minimum IR value" = "1.0 MΩ" (just the fact). "Explain why IR testing is important" = "IR testing verifies insulation integrity to prevent leakage currents that could cause electric shock or fire" (fact + reason).</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
            <h4 className="text-white font-medium mb-3">Command Word Hierarchy (Depth Required)</h4>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">State / List / Identify</span>
              <span className="text-white/40">→</span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full">Describe / Determine</span>
              <span className="text-white/40">→</span>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm rounded-full">Explain / Compare</span>
              <span className="text-white/40">→</span>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">Evaluate / Justify</span>
            </div>
            <p className="text-white/60 text-xs mt-2">More depth and reasoning required as you move along the scale</p>
          </div>

          <InlineCheck
            question="If a question says 'Describe the safe isolation procedure', what type of answer is expected?"
            answer="A detailed account of the steps involved in safe isolation - more than just listing the steps, but explaining what happens at each stage. However, you don't need to explain WHY each step is done (that would be 'Explain')."
          />
        </section>

        {/* Section 3: Distractor Patterns */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">3</span>
            <h2 className="text-xl font-bold text-white">Recognising Distractor Patterns</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Distractors are wrong answers designed to look right. Exam writers use predictable patterns to create plausible-sounding incorrect options. Learning to recognise these patterns helps you eliminate wrong answers quickly and confidently.
            </p>
          </div>

          {/* Distractor Patterns */}
          <div className="space-y-3 mb-6">
            {distractorPatterns.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{item.pattern}</h4>
                    <p className="text-white/60 text-sm mb-2">{item.description}</p>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/5 rounded-lg p-2">
                        <p className="text-white/50 text-xs mb-0.5">Example:</p>
                        <p className="text-white/70 text-xs">{item.example}</p>
                      </div>
                      <div className="bg-green-500/10 rounded-lg p-2">
                        <p className="text-green-400/80 text-xs mb-0.5">How to spot:</p>
                        <p className="text-white/70 text-xs">{item.howToSpot}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-green-400 font-medium mb-1">The Absolute Rule</h4>
                <p className="text-white/70 text-sm">Options containing absolute words like 'always', 'never', 'all', 'none', 'every', 'only' are usually incorrect. In electrical work, there are almost always exceptions or qualifications to consider.</p>
              </div>
            </div>
          </div>

          <InlineCheck
            question="An option reads: 'Type B MCBs will always trip within 0.4 seconds for a fault.' Is this likely correct?"
            answer="No, this is likely a distractor. The word 'always' is an absolute. Type B MCBs will trip within 0.4s ONLY if the fault current is high enough (at least 5× rating) AND the loop impedance allows sufficient current. Conditions must be met."
          />
        </section>

        {/* Section 4: Elimination Strategy */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm">4</span>
            <h2 className="text-xl font-bold text-white">Systematic Elimination Strategy</h2>
          </div>

          <div className="prose prose-invert max-w-none mb-6">
            <p className="text-white/80">
              Even when you're unsure of the correct answer, systematic elimination can significantly improve your chances. By removing options you know are wrong, you increase the probability of selecting correctly - from 25% (random guess from 4) to 50% or even 100%.
            </p>
          </div>

          {/* Elimination Steps */}
          <div className="space-y-3 mb-6">
            {eliminationSteps.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-elec-yellow text-[#1a1a1a] font-bold text-sm flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4 className="text-white font-medium">{item.action}</h4>
                  <p className="text-white/60 text-sm">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
            <h4 className="text-white font-medium mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-elec-yellow" />
              Worked Example: Elimination in Action
            </h4>
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-white/80 text-sm font-medium mb-2">Question: What is the minimum insulation resistance for a SELV circuit?</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 font-mono text-sm">A)</span>
                    <span className="text-white/60 text-sm line-through">0.25 MΩ at 500V DC</span>
                    <span className="text-red-400 text-xs">(Wrong voltage)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400 font-mono text-sm">B)</span>
                    <span className="text-white text-sm">0.5 MΩ at 250V DC</span>
                    <span className="text-green-400 text-xs">(Correct)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 font-mono text-sm">C)</span>
                    <span className="text-white/60 text-sm line-through">1.0 MΩ at 500V DC</span>
                    <span className="text-red-400 text-xs">(Wrong voltage for SELV)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 font-mono text-sm">D)</span>
                    <span className="text-white/60 text-sm line-through">2.0 MΩ at 1000V DC</span>
                    <span className="text-red-400 text-xs">(1000V for &gt;500V circuits)</span>
                  </div>
                </div>
              </div>
              <p className="text-white/60 text-xs">Knowing that SELV is tested at 250V DC immediately eliminates options A, C, and D, leaving only B.</p>
            </div>
          </div>

          <InlineCheck
            question="You've eliminated two options but are stuck between the remaining two. What should you focus on?"
            answer="Look for subtle differences between the two options - one word, one number, one detail will usually be different. Think about which detail aligns with your knowledge. One option often has a small error like wrong regulation number, incorrect unit, or misplaced qualifier."
          />
        </section>

        {/* Practical Guidance Box */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Question Analysis Checklist
          </h3>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Before Answering</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Read the entire question carefully</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Identify the command word (State, Explain, Calculate)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Check for negative words (NOT, EXCEPT)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Underline key technical terms</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">When Reading Options</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Read ALL options before selecting</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Look for absolute words (always, never)</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Check numbers and units carefully</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Compare similar-looking options for differences</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">When Stuck</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Eliminate obviously wrong options first</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Use your predicted answer as a guide</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Make your best guess and mark for review</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Never leave a question blank</li>
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
          <h3 className="text-lg font-semibold text-white mb-4">Quick Reference - Warning Signs</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-red-400 font-medium mb-2 text-sm">Likely Wrong If...</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>- Contains absolute words (always, never)</li>
                <li>- Uses unfamiliar complex terminology</li>
                <li>- Includes obviously wrong values</li>
                <li>- Makes unrealistic claims</li>
              </ul>
            </div>
            <div>
              <h4 className="text-green-400 font-medium mb-2 text-sm">Likely Correct If...</h4>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>- Uses qualified language (usually, often)</li>
                <li>- Matches your predicted answer</li>
                <li>- Contains familiar regulation references</li>
                <li>- Is specific and detailed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quiz Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Test Your Knowledge</h3>
          {!showQuiz ? (
            <div className="text-center">
              <p className="text-white/70 mb-4">Ready to test your question analysis skills?</p>
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
            <Link to="../section3-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Time Management Strategies
            </Link>
          </Button>
          <Button className="bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90" asChild>
            <Link to="../section3-3">
              Next: Memory Techniques
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Level3Module8Section3_2;
