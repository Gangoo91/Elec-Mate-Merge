/**
 * Level 3 Module 8 Section 1.4 - Past Paper Analysis
 *
 * Design pattern: Level3ContentTemplate.tsx
 * Dark theme with elec-yellow accent
 * Review and analysis of past exam papers to identify common themes and question styles
 */

import { ArrowLeft, Zap, CheckCircle, FileSearch, TrendingUp, BookOpen, PieChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

// ============================================
// SEO CONFIGURATION
// ============================================
const TITLE = "Past Paper Analysis - Level 3 Module 8 Section 1.4";
const DESCRIPTION = "Analyse past exam papers to identify recurring themes, question patterns, and topic weightings. Use examiner insights to focus your revision effectively.";

// ============================================
// INLINE CHECK QUESTIONS
// ============================================
const quickCheckQuestions = [
  {
    id: "check-1",
    question: "What is the main purpose of analysing past exam papers?",
    options: [
      "To memorise specific questions that will appear",
      "To understand question styles, topic weightings, and examiner expectations",
      "To find easy questions to practice",
      "To reduce the amount of revision needed"
    ],
    correctIndex: 1,
    explanation: "Past paper analysis reveals patterns in question styles, shows which topics are frequently examined, and demonstrates what examiners expect in answers. This guides focused, efficient revision."
  },
  {
    id: "check-2",
    question: "When analysing past papers, which aspect is MOST important to note?",
    options: [
      "The colour of the paper",
      "How questions are phrased and what command words are used",
      "The page numbers of each question",
      "Whether questions are numbered or lettered"
    ],
    correctIndex: 1,
    explanation: "Command words (state, describe, explain, calculate, compare) indicate exactly what examiners expect. Understanding these helps you structure answers correctly and avoid losing marks."
  },
  {
    id: "check-3",
    question: "If a topic appears in 4 out of 5 past papers, what does this suggest?",
    options: [
      "It won't appear in the next exam",
      "Examiners are running out of ideas",
      "It's a core topic that will likely appear again",
      "The topic is too easy and will be removed"
    ],
    correctIndex: 2,
    explanation: "Frequently appearing topics are core to the qualification. High-frequency topics should be prioritised in revision as they're likely to appear in future papers."
  },
  {
    id: "check-4",
    question: "What is a 'command word' in exam questions?",
    options: [
      "The first word of every question",
      "Words that tell you what type of answer is expected",
      "The topic being asked about",
      "Keywords highlighted in bold"
    ],
    correctIndex: 1,
    explanation: "Command words are verbs like 'state', 'describe', 'explain', 'calculate' that specify exactly what type of answer is required. Matching your answer to the command word is essential for full marks."
  }
];

// ============================================
// QUIZ QUESTIONS
// ============================================
const quizQuestions = [
  {
    id: 1,
    question: "How many past papers should you ideally analyse before sitting your Level 3 exam?",
    options: [
      "Just one from last year is sufficient",
      "At least 3-5 papers covering 2-3 years",
      "Every paper ever written for this qualification",
      "Past papers are not useful for preparation"
    ],
    correctAnswer: 1,
    explanation: "Analysing 3-5 recent papers gives a good picture of current trends and topic coverage while remaining manageable. This shows patterns without spending excessive time on older, potentially outdated material."
  },
  {
    id: 2,
    question: "What does the command word 'state' typically require in an answer?",
    options: [
      "A detailed explanation with examples",
      "A calculation with full working",
      "A brief, direct answer without elaboration",
      "A comparison between two items"
    ],
    correctAnswer: 2,
    explanation: "'State' requires a clear, concise answer - usually a single sentence or short phrase. Extended explanation is unnecessary and wastes time that could be used on other questions."
  },
  {
    id: 3,
    question: "What does the command word 'explain' require beyond 'state'?",
    options: [
      "The same thing - they are interchangeable",
      "More detail including reasons, mechanisms, or effects",
      "Only a numerical answer",
      "A shorter, simpler answer"
    ],
    correctAnswer: 1,
    explanation: "'Explain' requires more than just stating a fact - you must show understanding by describing how or why something works, including reasons, mechanisms, or effects."
  },
  {
    id: 4,
    question: "When analysing past papers, what should you note about mark allocations?",
    options: [
      "Ignore marks and focus only on questions",
      "Higher marks indicate more detail/points required in answers",
      "All questions are worth the same regardless of stated marks",
      "Marks only matter for pass/fail calculation"
    ],
    correctAnswer: 1,
    explanation: "Mark allocations guide answer depth. A 1-mark question needs a brief answer; a 4-mark question typically needs 4 distinct points or elements. Match your answer length to the marks available."
  },
  {
    id: 5,
    question: "What is topic 'frequency analysis' in past paper review?",
    options: [
      "Counting how often topics appear across multiple papers",
      "Measuring how fast you can complete each section",
      "Analysing the radio frequencies used in electrical work",
      "Determining how often exams are held"
    ],
    correctAnswer: 0,
    explanation: "Frequency analysis involves counting how often each topic appears across past papers. High-frequency topics are likely core content that should be prioritised in revision."
  },
  {
    id: 6,
    question: "If a new topic was added to the syllabus last year but hasn't appeared in exams yet, what should you do?",
    options: [
      "Ignore it as it hasn't been examined yet",
      "Study it thoroughly as it's likely to appear soon",
      "Wait to see if it appears this year before studying",
      "Assume it will be removed from the syllabus"
    ],
    correctAnswer: 1,
    explanation: "New syllabus topics are likely to be examined soon. These represent areas where examiners want to test current knowledge, making them high-priority revision topics."
  },
  {
    id: 7,
    question: "What does 'calculate' require in an exam answer?",
    options: [
      "Just the final numerical answer",
      "Full working shown leading to a correctly formatted answer",
      "An explanation of why the calculation is needed",
      "Reference to where the formula can be found"
    ],
    correctAnswer: 1,
    explanation: "'Calculate' questions require you to show your working method. Even if the final answer is wrong, correct working can still earn partial marks. Always show each step clearly."
  },
  {
    id: 8,
    question: "How should you use examiner reports in your preparation?",
    options: [
      "They're only useful for teachers, not students",
      "Read them to understand common mistakes and what examiners expect",
      "Ignore them as they contain confidential information",
      "Only read reports if you failed an exam"
    ],
    correctAnswer: 1,
    explanation: "Examiner reports reveal common mistakes candidates make and what constitutes a good answer. This insight helps you avoid the same errors and understand examiner expectations."
  },
  {
    id: 9,
    question: "What is the value of attempting past papers under timed conditions?",
    options: [
      "It proves you could pass if you had unlimited time",
      "It helps develop time management and builds exam stamina",
      "It's only useful the night before the exam",
      "Timing doesn't matter for preparation"
    ],
    correctAnswer: 1,
    explanation: "Timed practice develops essential exam skills - pacing, time allocation, and mental stamina. Knowing the content isn't enough if you can't demonstrate it under exam conditions."
  },
  {
    id: 10,
    question: "What should you do if you notice a topic has appeared differently across papers?",
    options: [
      "Only study the most recent version",
      "Prepare for multiple question formats on that topic",
      "Assume it won't appear in your exam",
      "Focus on other topics instead"
    ],
    correctAnswer: 1,
    explanation: "Different question formats on the same topic show examiners test understanding from multiple angles. Prepare to answer the topic in various ways - calculation, explanation, application."
  },
  {
    id: 11,
    question: "What is a 'distracter' in a multiple choice question?",
    options: [
      "The correct answer hidden among wrong options",
      "An incorrect option designed to seem plausible",
      "Additional information in the question stem",
      "A question designed to confuse candidates"
    ],
    correctAnswer: 1,
    explanation: "Distracters are the incorrect options in multiple choice questions, designed to look plausible. Past paper analysis helps you recognise common distracter patterns and avoid being fooled."
  },
  {
    id: 12,
    question: "How can past paper analysis help with revision prioritisation?",
    options: [
      "It can't - all topics are equally important",
      "By identifying high-frequency topics for focused attention",
      "By showing which topics to skip entirely",
      "By indicating the exact questions that will appear"
    ],
    correctAnswer: 1,
    explanation: "Past paper analysis reveals which topics are examined most frequently and in what depth. This allows you to prioritise revision time on high-yield content rather than treating all topics equally."
  }
];

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  {
    question: "Where can I find past papers for City & Guilds Level 3 exams?",
    answer: "Past papers are available through City & Guilds SmartScreen (if your training provider has access), your college or training centre, and sometimes through City & Guilds website. Your assessor or tutor can often provide sample papers and practice materials."
  },
  {
    question: "Are past papers exactly representative of future exams?",
    answer: "Past papers show question styles and topic coverage, but exact questions rarely repeat. Syllabus updates mean some topics may have changed emphasis. Use past papers to understand format and examiner expectations, not to predict specific questions."
  },
  {
    question: "Should I complete past papers open-book or closed-book?",
    answer: "Start with open-book to learn question styles without the pressure of blanks. Then progress to closed-book, timed conditions to simulate real exam experience. Both have value at different stages of preparation."
  },
  {
    question: "How do I access examiner reports?",
    answer: "Examiner reports are typically available through your training provider or college. Ask your tutor or assessor - these reports contain valuable insights into common mistakes and what constitutes good answers."
  },
  {
    question: "What if I can't find enough past papers to analyse?",
    answer: "Focus on the papers you can access, supplementing with sample papers from the awarding body. Mock exams from reputable sources often follow similar patterns. The quality of analysis matters more than the quantity of papers."
  },
  {
    question: "How long before my exam should I start past paper analysis?",
    answer: "Begin past paper analysis 4-6 weeks before your exam. This gives time to identify weak areas and address them through revision. In the final week, use papers primarily for exam technique rather than learning new content."
  }
];

// ============================================
// TOPIC FREQUENCY DATA
// ============================================
const topicFrequency = [
  { topic: "Health & Safety Legislation", frequency: "Very High", papers: "5/5", notes: "Appears in every paper" },
  { topic: "BS 7671 Requirements", frequency: "Very High", papers: "5/5", notes: "Multiple questions per paper" },
  { topic: "Inspection & Testing", frequency: "High", papers: "4/5", notes: "Practical and theoretical" },
  { topic: "Earthing & Bonding", frequency: "High", papers: "4/5", notes: "Calculations and concepts" },
  { topic: "Circuit Protection", frequency: "High", papers: "4/5", notes: "Device selection and sizing" },
  { topic: "Electrical Science", frequency: "Moderate", papers: "3/5", notes: "Calculations featured" },
  { topic: "Fault Diagnosis", frequency: "Moderate", papers: "3/5", notes: "Scenario-based questions" },
  { topic: "Special Locations", frequency: "Moderate", papers: "2/5", notes: "BS 7671 Part 7" }
];

// ============================================
// MAIN COMPONENT
// ============================================
const Level3Module8Section1_4 = () => {
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
            <Link to="/study-centre/apprentice/level3-module8">
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
            <span>Module 8.1.4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Past Paper Analysis
          </h1>
          <p className="text-white/80">
            Analyse exam patterns to focus your revision and understand examiner expectations
          </p>
        </header>

        {/* QUICK SUMMARY BOXES */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Purpose:</strong> Identify patterns, weightings, and examiner expectations</li>
              <li><strong>Scope:</strong> Analyse 3-5 recent papers for reliable patterns</li>
              <li><strong>Focus:</strong> Command words, mark allocations, topic frequency</li>
              <li><strong>Output:</strong> Prioritised revision plan based on evidence</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2">Spot it / Use it</p>
            <ul className="text-sm text-white space-y-1">
              <li><strong>Spot:</strong> Topics that appear in every paper - these are essential</li>
              <li><strong>Use:</strong> Mark allocations to judge required answer depth</li>
              <li><strong>Apply:</strong> Match answer style to command words</li>
            </ul>
          </div>
        </div>

        {/* LEARNING OUTCOMES */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Systematically analyse past papers to identify patterns and trends",
              "Understand command words and match answers to examiner expectations",
              "Use mark allocations to judge appropriate answer depth",
              "Identify high-frequency topics for revision prioritisation",
              "Apply examiner report insights to improve answer quality",
              "Develop a data-driven revision plan based on past paper analysis"
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
            Understanding Question Structure
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every exam question is constructed deliberately. Understanding how questions are built helps you decode what examiners want and structure your answers to maximise marks.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Question Components:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Stem:</strong> The main body of the question providing context, scenario, or information needed to answer. Read this carefully - it often contains crucial details that affect the correct answer.</li>
                <li><strong>Command Word:</strong> The verb that tells you exactly what to do. Matching your answer to the command word is critical for full marks. 'State' and 'explain' require fundamentally different answers.</li>
                <li><strong>Focus:</strong> The specific topic, regulation, or concept being tested. Identify this clearly before answering to ensure you address what's actually being asked.</li>
                <li><strong>Mark Allocation:</strong> Indicates the depth of answer required. A 4-mark question typically needs 4 distinct points or a well-developed explanation.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Example Analysis:</p>
              <p className="text-sm text-white/90 italic mb-2">"Explain why RCDs rated at 30mA are required for socket-outlets in domestic installations." (3 marks)</p>
              <ul className="text-xs text-white/80 space-y-1 ml-4">
                <li><strong>Command:</strong> 'Explain' - requires reasoning, not just a fact</li>
                <li><strong>Focus:</strong> 30mA RCDs for domestic socket-outlets</li>
                <li><strong>Marks:</strong> 3 - need 3 clear points or a developed explanation</li>
                <li><strong>Good answer includes:</strong> Additional protection against electric shock, fault current level, protection for cord-connected equipment, BS 7671 requirement reference</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key Insight:</strong> Many candidates lose marks not because they don't know the content, but because they don't match their answer to what's being asked. A perfect explanation loses marks if the question only asked you to 'state'.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 01 */}
        <InlineCheck {...quickCheckQuestions[0]} />

        {/* CONTENT SECTION 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Command Words Decoded
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Command words are your instruction manual for each question. Different words require fundamentally different responses. Learning to recognise and respond appropriately is essential for exam success.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Lower-Level Commands</p>
                <ul className="text-xs text-white/90 space-y-2">
                  <li><strong>State:</strong> Give a brief, factual answer. No explanation needed. Example: "State the minimum insulation resistance for a 230V circuit." Answer: "1 megohm"</li>
                  <li><strong>Identify:</strong> Recognise and name something. Example: "Identify the earthing arrangement shown." Answer: "TN-C-S"</li>
                  <li><strong>List:</strong> Provide a series of items. Usually requires specific number of points matching marks available.</li>
                  <li><strong>Define:</strong> Give the precise meaning of a term. Use official definitions where available.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-transparent border border-white/10">
                <p className="text-sm font-medium text-elec-yellow/80 mb-2">Higher-Level Commands</p>
                <ul className="text-xs text-white/90 space-y-2">
                  <li><strong>Describe:</strong> Give a detailed account of features or process. More than just stating - show the what/how.</li>
                  <li><strong>Explain:</strong> Give reasons or show understanding of why something happens. Requires demonstrating understanding.</li>
                  <li><strong>Compare:</strong> Identify similarities and differences. Must address both items being compared.</li>
                  <li><strong>Justify:</strong> Give reasons to support a conclusion or recommendation. Evidence-based reasoning required.</li>
                </ul>
              </div>
            </div>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Calculation Commands:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Calculate:</strong> Work out using given data. MUST show working - partial marks available for correct method even with arithmetic errors.</li>
                <li><strong>Determine:</strong> Usually requires a calculation or process to arrive at an answer. Show your method.</li>
                <li><strong>Derive:</strong> Show how a formula or value is obtained from first principles.</li>
              </ul>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Pro Tip:</strong> In your past paper analysis, highlight every command word. Track which commands appear most frequently and practice answering each type. Some candidates only practice 'explain' style answers and struggle with 'state' or 'calculate'.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 02 */}
        <InlineCheck {...quickCheckQuestions[1]} />

        {/* CONTENT SECTION 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Topic Frequency Analysis
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Not all topics are examined with equal frequency. By analysing which topics appear most often across past papers, you can prioritise revision time on high-yield content.
            </p>

            <div className="my-6 overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left p-3 text-white font-medium">Topic Area</th>
                    <th className="text-center p-3 text-white font-medium">Frequency</th>
                    <th className="text-center p-3 text-white font-medium">Appearance</th>
                    <th className="text-left p-3 text-white font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {topicFrequency.map((item, index) => (
                    <tr key={index} className="border-t border-white/5">
                      <td className="p-3 text-white/90">{item.topic}</td>
                      <td className="p-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          item.frequency === 'Very High' ? 'bg-red-500/20 text-red-400' :
                          item.frequency === 'High' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {item.frequency}
                        </span>
                      </td>
                      <td className="p-3 text-center text-white/70">{item.papers}</td>
                      <td className="p-3 text-white/60 text-xs">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                <PieChart className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-red-400 mb-1">Very High Priority</p>
                <p className="text-xs text-white/70">Topics in every paper - essential revision</p>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-center">
                <TrendingUp className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-orange-400 mb-1">High Priority</p>
                <p className="text-xs text-white/70">Appear in most papers - thorough study needed</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-center">
                <BookOpen className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-yellow-400 mb-1">Moderate Priority</p>
                <p className="text-xs text-white/70">Appear regularly - good coverage required</p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70 mt-4">
              <strong>Revision Strategy:</strong> Allocate study time proportionally to topic frequency. If Health & Safety appears in every paper with multiple questions, it deserves more revision time than topics appearing once every few papers.
            </p>
          </div>
        </section>

        {/* InlineCheck after Section 03 */}
        <InlineCheck {...quickCheckQuestions[2]} />

        {/* CONTENT SECTION 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Creating Your Analysis Framework
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Systematic analysis produces better insights than casual review. Using a structured approach ensures you capture useful data from each past paper you study.
            </p>

            <div className="my-6">
              <p className="text-sm font-medium text-white mb-2">Analysis Framework Template:</p>
              <ul className="text-sm text-white space-y-2 ml-4">
                <li><strong>Step 1 - First Pass:</strong> Read through the entire paper without answering. Note topics covered and overall structure. This gives you the big picture before diving into details.</li>
                <li><strong>Step 2 - Question Mapping:</strong> Create a table listing each question number, topic tested, command word used, and marks available. This produces a clear record for comparison across papers.</li>
                <li><strong>Step 3 - Pattern Identification:</strong> After analysing multiple papers, look for patterns. Which topics always appear? Which command words are most common? Are certain topics always linked together?</li>
                <li><strong>Step 4 - Attempt Under Conditions:</strong> Complete at least one paper under timed conditions to experience real exam pressure and identify personal time management issues.</li>
                <li><strong>Step 5 - Mark and Review:</strong> Use mark schemes to evaluate your answers. Note where you lost marks and why. This reveals gaps between your knowledge and examiner expectations.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-transparent border border-white/10 my-6">
              <p className="text-sm font-medium text-white mb-2">Question Analysis Record (Example Format):</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-white/10 rounded">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="p-2 text-left">Q</th>
                      <th className="p-2 text-left">Topic</th>
                      <th className="p-2 text-left">Command</th>
                      <th className="p-2 text-center">Marks</th>
                      <th className="p-2 text-left">My Score</th>
                      <th className="p-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-white/5">
                      <td className="p-2 text-white/70">1a</td>
                      <td className="p-2 text-white/70">EAWR</td>
                      <td className="p-2 text-white/70">State</td>
                      <td className="p-2 text-center text-white/70">2</td>
                      <td className="p-2 text-green-400">2/2</td>
                      <td className="p-2 text-white/50">Knew this well</td>
                    </tr>
                    <tr className="border-t border-white/5">
                      <td className="p-2 text-white/70">1b</td>
                      <td className="p-2 text-white/70">Zs Calculation</td>
                      <td className="p-2 text-white/70">Calculate</td>
                      <td className="p-2 text-center text-white/70">4</td>
                      <td className="p-2 text-orange-400">2/4</td>
                      <td className="p-2 text-white/50">Formula error</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-sm text-white/90 italic">
              <strong>Time Investment:</strong> Thorough analysis of one paper takes 2-3 hours including attempting questions and reviewing answers. This investment pays off in focused revision and improved exam technique. Quality analysis of 3-4 papers is more valuable than superficial review of many.
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
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Getting Started with Analysis</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Obtain at least 3 recent past papers from your training provider or awarding body</li>
                <li>Create a spreadsheet or notebook to record analysis systematically</li>
                <li>Start with the most recent paper and work backwards</li>
                <li>Request examiner reports if available - they contain gold-standard insights</li>
                <li>Block out 2-3 hours of uninterrupted time for each paper analysis</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Using Your Analysis Effectively</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li>Create a priority list of topics based on frequency across papers</li>
                <li>Practice answering each type of command word you've identified</li>
                <li>Focus revision time on high-frequency topics you scored poorly on</li>
                <li>Review mark schemes to understand exactly what earns marks</li>
                <li>Note any topics that appear differently (calculation vs explanation) and prepare for both</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-red-400/80 mb-2">Common Mistakes to Avoid</h3>
              <ul className="text-sm text-white space-y-1 ml-4">
                <li><strong>Memorising specific answers</strong> - Questions rarely repeat exactly; understanding is essential</li>
                <li><strong>Ignoring low-frequency topics</strong> - They may appear in your exam and carry significant marks</li>
                <li><strong>Not attempting under timed conditions</strong> - Analysis without practice misses exam technique development</li>
                <li><strong>Skipping the mark scheme review</strong> - This is where you learn what examiners actually want</li>
                <li><strong>Only analysing one paper</strong> - Patterns emerge across multiple papers, not from a single example</li>
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
            <h3 className="text-sm font-medium text-white mb-4">Quick Reference - Analysis Essentials</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-white">
              <div>
                <p className="font-medium text-white mb-1">Command Word Guide</p>
                <ul className="space-y-0.5">
                  <li>State/List = Brief, direct answer</li>
                  <li>Describe = Detailed features/process</li>
                  <li>Explain = Reasons and understanding</li>
                  <li>Calculate = Show full working</li>
                  <li>Compare = Similarities AND differences</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-white mb-1">Analysis Process</p>
                <ul className="space-y-0.5">
                  <li>Map questions to topics</li>
                  <li>Track command words used</li>
                  <li>Note mark allocations</li>
                  <li>Identify frequency patterns</li>
                  <li>Review with mark schemes</li>
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
            <Link to="/study-centre/apprentice/level3-module8-section1-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Quick Fire Questions
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="/study-centre/apprentice/level3-module8-section2-1">
              Next: Practical Assessment Guide
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default Level3Module8Section1_4;
