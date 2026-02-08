import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Feedback and Explanations - MOET Module 7 Section 1.3";
const DESCRIPTION = "Learn how to extract maximum value from wrong answers, understand why correct answers are right, identify patterns in mistakes and use explanations to deepen your EPA knowledge.";

const quickCheckQuestions = [
  {
    id: "wrong-answer-value",
    question: "Why is reviewing wrong answers more valuable than simply noting your score?",
    options: [
      "It is not — the score is all that matters",
      "Wrong answers reveal specific knowledge gaps and misconceptions that can be targeted with revision",
      "Reviewing wrong answers only helps if you got less than 50%",
      "It is only useful for the first mock test"
    ],
    correctIndex: 1,
    explanation: "Each wrong answer is diagnostic information. It tells you exactly which topic, concept or skill needs attention. Simply noting your score tells you how much you know overall, but not what specifically to study. Targeted revision based on wrong answer analysis is far more efficient."
  },
  {
    id: "correct-answer-review",
    question: "Why should you review explanations for questions you answered correctly?",
    options: [
      "There is no benefit — only review wrong answers",
      "You may have chosen the right answer for the wrong reason, which will not help in similar future questions",
      "To memorise the exact wording for the EPA",
      "Only if you scored 100%"
    ],
    correctIndex: 1,
    explanation: "Sometimes candidates select the correct answer by elimination or lucky guessing rather than genuine understanding. Reviewing the explanation confirms whether your reasoning was sound, and may reveal additional depth that strengthens your knowledge for related questions."
  },
  {
    id: "pattern-recognition",
    question: "What does it indicate if you consistently get questions wrong in one particular topic area?",
    options: [
      "The questions in that topic are unfairly difficult",
      "You have a specific knowledge gap that requires focused revision in that area",
      "You should avoid studying that topic and focus elsewhere",
      "The question bank has errors in that section"
    ],
    correctIndex: 1,
    explanation: "Consistent errors in one topic area are a clear signal of a knowledge gap. This is valuable diagnostic information — it tells you exactly where to focus your revision for maximum improvement. Address the gap by returning to the relevant MOET module content."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "After completing a practice test, the most effective review strategy is to:",
    options: [
      "Only look at your overall percentage score",
      "Review explanations for every question — both correct and incorrect answers",
      "Skip the review and take another test immediately",
      "Only review questions where you guessed"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive review of all explanations maximises learning from every practice test. You gain insight into why correct answers are right, why distractors are wrong, and whether your reasoning was sound even when your answer was correct."
  },
  {
    id: 2,
    question: "You notice you have answered three consecutive motor control questions incorrectly. What does this suggest?",
    options: [
      "Motor control questions are trick questions",
      "You should skip motor control questions in the real exam",
      "You have a knowledge gap in motor control that needs targeted revision",
      "The question bank is faulty"
    ],
    correctAnswer: 2,
    explanation: "Patterns of errors in a specific topic clearly indicate a knowledge gap. This is exactly what practice tests are designed to reveal. Return to the relevant MOET module (Module 4 for motor control), study the content, and then re-attempt the questions."
  },
  {
    id: 3,
    question: "When reviewing a wrong answer, you discover you chose a distractor based on a common misconception. What should you do?",
    options: [
      "Memorise the correct answer for that specific question",
      "Understand the misconception, learn why it is wrong, and study the correct principle so you can apply it to any related question",
      "Avoid similar questions in future practice",
      "Assume you will not encounter this misconception again"
    ],
    correctAnswer: 1,
    explanation: "Understanding the underlying misconception is far more valuable than memorising one answer. The same misconception may appear in different questions with different wording. By correcting your understanding of the principle, you protect yourself against all questions that test it."
  },
  {
    id: 4,
    question: "A 'near miss' in practice test review is when you:",
    options: [
      "Almost ran out of time",
      "Selected the correct answer but your reasoning was flawed or based on a guess",
      "Got the question wrong by one mark",
      "Nearly forgot to answer a question"
    ],
    correctAnswer: 1,
    explanation: "'Near misses' are correct answers achieved by guessing or flawed reasoning. They are dangerous because they mask knowledge gaps — you got the mark but do not truly understand the concept. Review the explanation to ensure your understanding is solid."
  },
  {
    id: 5,
    question: "When tracking your practice test scores, the most useful data to record is:",
    options: [
      "Only the overall percentage for each test",
      "Score broken down by topic/module, plus notes on common error types",
      "The date and time of each test only",
      "How long each test took"
    ],
    correctAnswer: 1,
    explanation: "Topic-level scores reveal specific strengths and weaknesses. Combined with notes on error types (misconception, misreading, calculation error), this data allows you to create a highly targeted revision plan rather than generic studying."
  },
  {
    id: 6,
    question: "You got a question right, but the explanation reveals a concept you did not know. What should you do?",
    options: [
      "Nothing — you got it right so it does not matter",
      "Note the concept and include it in your revision, as a related question may test it more directly",
      "Assume it will not be tested in the real EPA",
      "Ignore it and move to the next question"
    ],
    correctAnswer: 1,
    explanation: "Discovering new concepts through explanations — even for correct answers — expands your knowledge base. A related question in the EPA might test that specific concept more directly, and your lucky correct answer will not help you then."
  },
  {
    id: 7,
    question: "The purpose of reading the explanation for why each distractor is wrong is to:",
    options: [
      "Waste time on information you do not need",
      "Understand common misconceptions and traps so you can recognise and avoid them in future",
      "Memorise every wrong answer",
      "It serves no useful purpose"
    ],
    correctAnswer: 1,
    explanation: "Understanding why distractors are wrong reveals the misconceptions and errors they are designed to exploit. This knowledge helps you recognise and avoid similar traps in the real exam, even when the questions are worded differently."
  },
  {
    id: 8,
    question: "After reviewing a practice test, you should update your revision plan to:",
    options: [
      "Study everything again from the beginning",
      "Focus on the topics and concepts where your review identified gaps or weak understanding",
      "Only study topics where you scored 100%",
      "Stop revising entirely and just take more tests"
    ],
    correctAnswer: 1,
    explanation: "The review should directly inform your revision plan. Prioritise topics where you scored lowest and concepts where your understanding was weakest. This targeted approach is far more efficient than re-studying everything."
  },
  {
    id: 9,
    question: "If you consistently misread negative-stem questions (those containing NOT or EXCEPT), the best corrective action is to:",
    options: [
      "Avoid these questions in the real exam",
      "Practise highlighting or underlining key words like NOT and EXCEPT, and develop a habit of checking for them",
      "Read every question three times",
      "Accept that you will always miss these questions"
    ],
    correctAnswer: 1,
    explanation: "If misreading is a pattern, develop a specific countermeasure. Actively highlighting or mentally flagging key words like NOT, EXCEPT, and LEAST trains your brain to notice them. This is a skill that improves rapidly with deliberate practice."
  },
  {
    id: 10,
    question: "How should you use explanations from practice tests when studying the MOET course material?",
    options: [
      "Explanations are not related to course material",
      "Cross-reference explanations with the relevant MOET module sections to deepen understanding of the topic in context",
      "Memorise explanations word for word",
      "Only read explanations if you failed the test"
    ],
    correctAnswer: 1,
    explanation: "Explanations from practice tests often summarise key concepts from the MOET modules. Cross-referencing with the full module content provides deeper context and helps you understand how the concept fits into the broader topic — essential for scenario-based EPA questions."
  }
];

const faqs = [
  {
    question: "Should I review every single explanation or just the ones for wrong answers?",
    answer: "Review every explanation, at least briefly. For wrong answers, study the explanation in depth and cross-reference with your course material. For correct answers, skim the explanation to confirm your reasoning was sound. If the explanation reveals something you did not know, add it to your revision notes."
  },
  {
    question: "How do I track my scores effectively?",
    answer: "Create a simple spreadsheet or table with columns for: date, test number, overall score, and score per topic area (e.g., H&S, Electrical Science, Installations, Motor Control, Maintenance, Documentation). Add a notes column for common error types. Over multiple tests, patterns will emerge clearly."
  },
  {
    question: "What if the explanation does not make sense to me?",
    answer: "If an explanation is unclear, go back to the relevant MOET module section and study the topic from first principles. If it still does not make sense, discuss it with your training provider, workplace mentor, or study group. Understanding the 'why' is essential — do not just memorise the answer."
  },
  {
    question: "Is it better to review immediately after the test or wait until later?",
    answer: "Review immediately after completing the test while the questions are fresh in your mind. You will remember your thought process and reasoning, which helps you understand why you made errors. If you wait too long, you will have forgotten your rationale and the review loses much of its value."
  },
  {
    question: "How many times should I re-attempt questions I got wrong?",
    answer: "After studying the topic, re-attempt the questions at least once. If you get them right, move on. If you get them wrong again, you need deeper study of the underlying concept — not just more practice questions. Alternate between content study and question practice until you consistently answer correctly."
  }
];

const MOETModule7Section1_3 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-white/10 sticky top-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button variant="ghost" size="lg" className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 py-8 sm:py-12">

        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 7.1.3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Feedback and Explanations
          </h1>
          <p className="text-white/80">
            Turning every practice question into a learning opportunity through systematic review
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Review all:</strong> Study explanations for correct and incorrect answers</li>
              <li className="pl-1"><strong>Diagnose:</strong> Each wrong answer reveals a specific knowledge gap</li>
              <li className="pl-1"><strong>Patterns:</strong> Track errors by topic to target weak areas</li>
              <li className="pl-1"><strong>Near misses:</strong> Correct answers with flawed reasoning need attention</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Misconceptions:</strong> Common errors in earthing, protection, isolation</li>
              <li className="pl-1"><strong>Regulations:</strong> Understanding why specific regs apply</li>
              <li className="pl-1"><strong>Application:</strong> Moving from recall to genuine understanding</li>
              <li className="pl-1"><strong>ST1426:</strong> Building depth across all KSB areas</li>
            </ul>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Extract maximum learning value from every wrong answer in practice tests",
              "Understand why correct answers are right — not just which option to select",
              "Identify recurring patterns and common misconceptions in your answers",
              "Use explanations to build deeper understanding rather than surface recall",
              "Cross-reference practice test feedback with MOET module content",
              "Create targeted revision plans based on systematic error analysis"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-elec-yellow/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">01</span>
            The Value of Wrong Answers
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Many candidates view wrong answers purely as failures. In reality, every wrong answer is a gift — it is
              diagnostic information that tells you exactly where your understanding is incomplete. A practice test where
              you score 100% teaches you almost nothing new. A test where you make mistakes and systematically learn from
              them is far more valuable for your development.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">What a Wrong Answer Tells You</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Knowledge gap:</strong> You do not know enough about this specific topic</li>
                <li className="pl-1"><strong>Misconception:</strong> You have an incorrect belief that led you to the wrong answer</li>
                <li className="pl-1"><strong>Reading error:</strong> You misread the question and answered a different question</li>
                <li className="pl-1"><strong>Application failure:</strong> You know the theory but could not apply it in context</li>
                <li className="pl-1"><strong>Calculation error:</strong> You understand the method but made a mathematical mistake</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Wrong Answer Review Process</h3>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Read the question again:</strong> Did you misread it? Did you miss a key word?</li>
                <li className="pl-1"><strong>Identify your reasoning:</strong> Why did you choose the option you selected?</li>
                <li className="pl-1"><strong>Read the explanation:</strong> Understand why the correct answer is right</li>
                <li className="pl-1"><strong>Understand each distractor:</strong> Learn why each wrong option is wrong</li>
                <li className="pl-1"><strong>Categorise the error:</strong> Was it a knowledge gap, misconception, or reading error?</li>
                <li className="pl-1"><strong>Plan your revision:</strong> Note the topic and concept for targeted study</li>
              </ol>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> The goal of practice is not to get a high score — it is to find and fix your
              weaknesses. Embrace wrong answers as learning opportunities.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Understanding Why Correct Answers Are Right
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Reviewing correct answers may seem unnecessary, but it is a crucial part of deepening your understanding.
              There is an important difference between getting the right answer and truly understanding why it is right.
              If you selected the correct option by guessing or using a process of elimination without genuine understanding,
              you may not be able to answer a differently worded question on the same topic.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Types of "Correct but Risky" Answers</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Lucky guess:</strong> You had no idea and happened to select correctly — this is not knowledge</li>
                <li className="pl-1"><strong>Right reason, incomplete understanding:</strong> Your reasoning was correct but shallow — a deeper question would catch you out</li>
                <li className="pl-1"><strong>Correct elimination:</strong> You eliminated distractors correctly but could not have identified the answer independently</li>
                <li className="pl-1"><strong>Familiar phrasing:</strong> You recognised the wording from study material without truly understanding the concept</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">The "Near Miss" Problem</p>
              <p className="text-sm text-white">
                A near miss looks like a success (correct answer) but masks a vulnerability. In the real EPA, the question
                may be worded differently or test the concept from a different angle. Your lucky correct answer in practice
                gives you false confidence. Checking the explanation for every correct answer catches these near misses
                before the real exam does.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> For every correct answer, ask yourself: "Could I explain to someone else why
              this is correct and why the other options are wrong?" If the answer is no, study the explanation.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            Identifying Patterns in Mistakes
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Individual wrong answers are useful, but patterns across multiple tests are even more valuable. If you
              consistently make errors in the same topic, the same question type, or due to the same kind of mistake,
              you have identified a systemic issue that targeted action can resolve.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Common Error Patterns in Electrical Maintenance EPA</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Pattern</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Example</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Fix</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Topic gap</td>
                      <td className="border border-white/10 px-3 py-2">Always wrong on PLC questions</td>
                      <td className="border border-white/10 px-3 py-2">Restudy Module 4 PLC content</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Misreading</td>
                      <td className="border border-white/10 px-3 py-2">Missing NOT/EXCEPT in stems</td>
                      <td className="border border-white/10 px-3 py-2">Practise highlighting key words</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Calculation errors</td>
                      <td className="border border-white/10 px-3 py-2">Unit conversion mistakes (kW/W)</td>
                      <td className="border border-white/10 px-3 py-2">Drill unit conversions daily</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Misconception</td>
                      <td className="border border-white/10 px-3 py-2">Confusing RCD and MCB functions</td>
                      <td className="border border-white/10 px-3 py-2">Study protection devices in depth</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Application failure</td>
                      <td className="border border-white/10 px-3 py-2">Knowing theory but failing scenarios</td>
                      <td className="border border-white/10 px-3 py-2">Practise scenario-based questions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">How to Track Patterns</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Score by topic:</strong> After each test, note your score for each module area</li>
                <li className="pl-1"><strong>Error log:</strong> Keep a running list of topics and question types you get wrong</li>
                <li className="pl-1"><strong>Error categorisation:</strong> Tag each error as knowledge gap, misconception, reading error, or calculation error</li>
                <li className="pl-1"><strong>Trend analysis:</strong> After 3-4 tests, review your log for recurring themes</li>
                <li className="pl-1"><strong>Revision targeting:</strong> Allocate your study time proportionally to your weakest areas</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Three tests with pattern tracking are more valuable than ten tests without review.
              The data from your errors is the roadmap to improvement.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Using Explanations to Deepen Knowledge
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Explanations in practice question banks are not just answers — they are condensed teaching material.
              A good explanation not only tells you what the correct answer is but explains the underlying principle,
              references relevant standards, and connects the concept to practical electrical maintenance work.
              Using explanations strategically turns every practice question into a mini-lesson.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Getting the Most from Explanations</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Read fully:</strong> Do not skim — read the entire explanation, even for correct answers</li>
                <li className="pl-1"><strong>Note new information:</strong> If the explanation contains facts or principles you did not know, add them to your revision notes</li>
                <li className="pl-1"><strong>Cross-reference:</strong> Use regulation or standard references in explanations to look up the source material</li>
                <li className="pl-1"><strong>Connect to practice:</strong> Think about how the concept applies to your workplace experience</li>
                <li className="pl-1"><strong>Teach it:</strong> Try explaining the concept in your own words — if you can teach it, you understand it</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Surface Learning vs Deep Learning</h3>
                <p className="text-sm text-white">
                  Surface learning means recognising the right answer when you see it. Deep learning means understanding
                  why it is right and being able to apply the principle to new situations. The EPA tests deep learning
                  through scenario-based questions — surface learning is not enough. Use explanations to build depth.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Building a Revision Notes Bank</h3>
                <p className="text-sm text-white">
                  As you review explanations, build a condensed set of revision notes organised by topic. Include key
                  principles, regulation references, common misconceptions, and worked examples. These notes become your
                  final revision resource — distilled from your own learning process and focused on your specific needs.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Example: Deep Learning from One Question</h3>
              <p className="text-sm text-white mb-3">
                <strong>Question:</strong> What is the maximum disconnection time for a 32 A final circuit in a TN system?
              </p>
              <p className="text-sm text-white mb-2">
                <strong>Surface learning:</strong> The answer is 0.4 seconds. Memorise it.
              </p>
              <p className="text-sm text-white mb-2">
                <strong>Deep learning:</strong> BS 7671 Table 41.1 specifies 0.4 seconds for circuits not exceeding 32 A in TN systems.
                The purpose is to ensure automatic disconnection of supply (ADS) operates fast enough to prevent electric shock.
                The time relates to the let-through energy that the human body can tolerate. Different earthing systems (TT) have
                different requirements (0.2 seconds). Understanding this principle means you can answer questions about any
                combination of circuit rating and earthing system.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Every explanation is an opportunity to move from "I know the answer" to "I
              understand the principle." The EPA rewards understanding, not just recall.
            </p>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Creating an Effective Feedback Loop
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The most effective learners treat practice tests, review, and revision as a continuous cycle rather than
              separate activities. Each practice test generates feedback; the feedback guides revision; the revision
              improves performance in the next test. This iterative cycle is the foundation of efficient EPA preparation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">The Practice-Review-Revise Cycle</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Practice:</strong> Complete a timed mock test under exam conditions</li>
                <li className="pl-1"><strong>Review:</strong> Analyse every answer — identify errors, near misses and learning points</li>
                <li className="pl-1"><strong>Diagnose:</strong> Categorise errors and identify patterns across tests</li>
                <li className="pl-1"><strong>Revise:</strong> Study the specific topics and concepts identified as weak</li>
                <li className="pl-1"><strong>Re-test:</strong> Attempt questions on the weak topics to verify improvement</li>
                <li className="pl-1"><strong>Repeat:</strong> Take the next mock test and start the cycle again</li>
              </ol>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Measuring Progress</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Overall score trend:</strong> Your scores should show an upward trend over successive tests</li>
                <li className="pl-1"><strong>Topic improvement:</strong> Scores in previously weak areas should improve after targeted revision</li>
                <li className="pl-1"><strong>Error reduction:</strong> The same types of errors should become less frequent</li>
                <li className="pl-1"><strong>Confidence level:</strong> You should feel increasingly confident about your knowledge</li>
                <li className="pl-1"><strong>Flagged questions:</strong> The number of flagged (uncertain) questions should decrease over time</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>ST1426 link:</strong> This systematic approach to learning from feedback demonstrates the professional
              behaviour of continuous improvement — a key behaviour assessed in the EPA professional discussion.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        <section className="mb-10">
          <Quiz title="Test Your Knowledge — Feedback and Explanations" questions={quizQuestions} />
        </section>

        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Timed Mock Tests
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1-4">
              Next: Identifying Knowledge Gaps
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section1_3;
