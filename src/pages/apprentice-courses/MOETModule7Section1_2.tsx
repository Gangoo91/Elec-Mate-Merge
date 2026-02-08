import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Timed Mock Tests - MOET Module 7 Section 1.2";
const DESCRIPTION = "Master exam conditions practice, time management strategies, pacing techniques and approaches for dealing with difficult questions during the EPA knowledge test.";

const quickCheckQuestions = [
  {
    id: "time-per-question",
    question: "In a 40-question, 60-minute EPA knowledge test, approximately how long do you have per question?",
    options: [
      "30 seconds",
      "60 seconds",
      "90 seconds",
      "120 seconds"
    ],
    correctIndex: 2,
    explanation: "With 40 questions in 60 minutes, you have approximately 90 seconds (1.5 minutes) per question. However, some questions will take less time and others more, so flexible pacing is important."
  },
  {
    id: "difficult-question",
    question: "What is the best approach when you encounter a question you cannot answer immediately?",
    options: [
      "Spend as long as needed until you work out the answer",
      "Skip it permanently and accept the lost mark",
      "Flag it, make your best guess, move on, and return if time allows",
      "Choose the first option and move on without thinking"
    ],
    correctIndex: 2,
    explanation: "The flag-and-return strategy ensures you do not waste valuable time on one difficult question at the expense of easier ones. Make your best educated guess (never leave it blank), flag it, and return with any remaining time."
  },
  {
    id: "mock-conditions",
    question: "Why is it important to practise mock tests under realistic exam conditions?",
    options: [
      "To make the practice more stressful",
      "To build familiarity with time pressure and reduce anxiety on the actual day",
      "Mock tests are only useful for memorising answers",
      "Exam conditions do not affect performance"
    ],
    correctIndex: 1,
    explanation: "Practising under realistic conditions — timed, without notes, in a quiet environment — builds familiarity with the exam experience. This reduces anxiety on the day because the format and pressure feel familiar rather than novel."
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "What is the recommended time allocation strategy for a 40-question, 60-minute test?",
    options: [
      "Spend equal time on every question regardless of difficulty",
      "Spend 60 seconds on straightforward questions, allowing extra time for complex ones and a review period",
      "Rush through all questions in 30 minutes and spend 30 minutes reviewing",
      "Spend all time on the first 20 questions and guess the rest"
    ],
    correctAnswer: 1,
    explanation: "Efficient time management means moving quickly through questions you find straightforward (under 60 seconds) to bank time for more complex questions (up to 2-3 minutes). Aim to finish with 5-10 minutes for review."
  },
  {
    id: 2,
    question: "During a timed mock test, you realise you have spent 3 minutes on a single question. What should you do?",
    options: [
      "Continue until you are certain of the answer",
      "Flag the question, select your best answer, and move on immediately",
      "Skip the question and leave it blank",
      "Start the test again from the beginning"
    ],
    correctAnswer: 1,
    explanation: "Spending 3 minutes on one question means you are taking time away from other questions. Select your best answer based on elimination, flag it for review, and move on. You can return to it if time permits."
  },
  {
    id: 3,
    question: "What is the purpose of a 'time checkpoint' during the exam?",
    options: [
      "To count how many questions you have answered correctly",
      "To verify you are on pace — e.g., 20 questions done by the 30-minute mark",
      "To decide whether to give up on the test",
      "To signal the invigilator that you need help"
    ],
    correctAnswer: 1,
    explanation: "Time checkpoints help you monitor your pacing. At the halfway point (30 minutes), you should have completed approximately 20 questions. If you are behind, you need to increase your pace; if ahead, you have time for careful review."
  },
  {
    id: 4,
    question: "When reviewing flagged questions at the end of the test, you should:",
    options: [
      "Change every answer you were unsure about",
      "Only change an answer if you have a clear reason to believe a different option is correct",
      "Leave all answers as they are regardless",
      "Choose the opposite of your original selection"
    ],
    correctAnswer: 1,
    explanation: "When reviewing, only change an answer if you have identified a specific reason — such as misreading the question or recalling a relevant fact. Random changes driven by anxiety tend to reduce your score rather than improve it."
  },
  {
    id: 5,
    question: "How many full timed mock tests should you aim to complete before the actual EPA?",
    options: [
      "None — reading the material is sufficient",
      "One test the night before is enough",
      "At least 3-5 full timed tests spread over several weeks",
      "One test per day for the entire month before the EPA"
    ],
    correctAnswer: 2,
    explanation: "Three to five full timed mock tests, spread over your preparation period, provide enough practice to build comfort with the format and timing without causing fatigue. Each test should be followed by a thorough review of all answers."
  },
  {
    id: 6,
    question: "Which of the following is NOT a benefit of practising under timed conditions?",
    options: [
      "Building familiarity with exam time pressure",
      "Identifying topics where you need more study",
      "Guaranteeing you will pass the actual EPA",
      "Developing effective pacing strategies"
    ],
    correctAnswer: 2,
    explanation: "While timed practice significantly improves your preparation and confidence, no amount of practice can guarantee a pass. Mock tests help build skills, identify gaps, and reduce anxiety, but success also depends on thorough knowledge revision."
  },
  {
    id: 7,
    question: "The 'two-pass' strategy for a timed exam involves:",
    options: [
      "Taking the exam twice on the same day",
      "Reading every question twice before answering any",
      "First pass: answer all questions you are confident about; second pass: tackle flagged/difficult questions",
      "Completing half the test, then starting again from question one"
    ],
    correctAnswer: 2,
    explanation: "The two-pass strategy maximises your score by securing marks from questions you know first, then using remaining time on uncertain questions. This prevents time wasted on difficult early questions at the expense of easy later ones."
  },
  {
    id: 8,
    question: "What should you do in the final 5 minutes of the exam?",
    options: [
      "Start answering questions you have not yet attempted",
      "Close the test immediately",
      "Review flagged questions, ensure every question has an answer, and check for obvious errors",
      "Change all answers you are unsure about"
    ],
    correctAnswer: 2,
    explanation: "The final 5 minutes should be used to: (1) ensure every question has been answered (no blanks), (2) revisit flagged questions, and (3) check for obvious errors like misreading. Do not make random changes — only change answers with clear justification."
  },
  {
    id: 9,
    question: "After completing a timed mock test, the most productive next step is to:",
    options: [
      "Celebrate and move on without looking at results",
      "Focus only on your percentage score",
      "Review every question — both correct and incorrect — reading all explanations and noting weak areas",
      "Immediately take another mock test"
    ],
    correctAnswer: 2,
    explanation: "Thorough review is where the real learning happens. Review every question, read explanations, note which topics caused difficulty, and plan targeted revision before your next mock test. The test itself is a diagnostic tool, not just a score."
  },
  {
    id: 10,
    question: "If anxiety causes you to 'freeze' during a timed test, the recommended technique is to:",
    options: [
      "Leave the exam room immediately",
      "Skip to the last question and work backwards",
      "Pause briefly, take slow deep breaths, read the current question slowly, and focus on one question at a time",
      "Answer all remaining questions with option A"
    ],
    correctAnswer: 2,
    explanation: "Brief physiological calming techniques — slow breathing, muscle relaxation — reduce the fight-or-flight response. Then refocusing on just the current question (not the whole test) breaks the overwhelm into a manageable task."
  },
  {
    id: 11,
    question: "Calculation questions in the EPA test typically require:",
    options: [
      "Complex algebra and calculus",
      "Basic arithmetic using Ohm's law, power formulae, or simple unit conversions",
      "No calculations at all — everything is conceptual",
      "Use of specialist engineering software"
    ],
    correctAnswer: 1,
    explanation: "Calculation questions in the ST1426 EPA test involve basic electrical formulae — Ohm's law (V = IR), power (P = IV), and simple conversions. Practise these under timed conditions so you can solve them quickly and accurately."
  },
  {
    id: 12,
    question: "What is the ideal environment for completing a timed mock test?",
    options: [
      "A noisy room with distractions to simulate worst-case conditions",
      "A quiet space with no notes, no phone, and a visible timer — simulating actual exam conditions",
      "In bed with music playing",
      "With friends so you can discuss answers as you go"
    ],
    correctAnswer: 1,
    explanation: "Simulating actual exam conditions builds realistic familiarity. This means a quiet space, no notes or references, no phone, a visible countdown timer, and completing the full test in one sitting without breaks."
  }
];

const faqs = [
  {
    question: "How often should I take timed mock tests?",
    answer: "Aim for one full timed mock test per week during the final 4-6 weeks of preparation. Between mock tests, use the results to guide your revision — focus study sessions on the topics where you scored lowest. Avoid taking more than two mock tests per week, as fatigue can reduce their value."
  },
  {
    question: "What if I consistently run out of time?",
    answer: "If you regularly run out of time, focus on two areas: (1) reading efficiency — practise reading stems quickly and accurately, and (2) decision speed — if elimination narrows it to two options, make a decision and move on rather than deliberating. Also check whether you are spending disproportionate time on calculation questions; if so, practise the formulae until they are second nature."
  },
  {
    question: "Should I use the same question bank for every mock test?",
    answer: "Ideally, use different question sets for each mock test to avoid memorising answers rather than understanding concepts. If your question bank is limited, leave at least 2-3 weeks between repeats. The value is in practising the process, not recognising specific questions."
  },
  {
    question: "Is it normal to score lower on timed tests than untimed practice?",
    answer: "Yes, this is very common and entirely normal. Time pressure introduces cognitive load that affects performance. With practice, the gap between timed and untimed scores narrows as you become more comfortable with pacing. Do not be discouraged by lower initial timed scores — they will improve."
  },
  {
    question: "What score should I aim for in mock tests to feel confident about the EPA?",
    answer: "Aim to consistently score 75% or above in timed mock tests. This gives you a comfortable margin above the typical pass mark (60-70%). If you are consistently scoring 80%+, you are well prepared. If you are scoring below 65%, increase your revision intensity on weak areas before continuing with mock tests."
  }
];

const MOETModule7Section1_2 = () => {
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
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

      {/* Main Content */}
      <article className="px-4 sm:px-6 py-8 sm:py-12">

        {/* Centred Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-elec-yellow text-sm mb-3">
            <Shield className="h-4 w-4" />
            <span>Module 7.1.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Timed Mock Tests
          </h1>
          <p className="text-white/80">
            Practising under exam conditions to build confidence, pacing and time management skills
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow text-sm font-medium mb-2 text-center sm:text-left">In 30 Seconds</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Format:</strong> 40 MCQs, 60 minutes, ~90 seconds each</li>
              <li className="pl-1"><strong>Pacing:</strong> Two-pass strategy — confident first, flagged second</li>
              <li className="pl-1"><strong>Checkpoints:</strong> 20 questions by 30 minutes</li>
              <li className="pl-1"><strong>Review:</strong> Final 5-10 minutes for flagged questions</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-elec-yellow/5 border-l-2 border-elec-yellow/50">
            <p className="text-elec-yellow/90 text-sm font-medium mb-2 text-center sm:text-left">Electrical Maintenance Context</p>
            <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5 text-left">
              <li className="pl-1"><strong>Calculations:</strong> Ohm's law, power — practise for speed</li>
              <li className="pl-1"><strong>Scenarios:</strong> Safe isolation, fault diagnosis questions</li>
              <li className="pl-1"><strong>Regulations:</strong> BS 7671, EAWR references under pressure</li>
              <li className="pl-1"><strong>ST1426:</strong> Knowledge test is one of three EPA components</li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">What You'll Learn</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              "Set up and complete mock tests under realistic EPA exam conditions",
              "Apply time management strategies including the 90-second-per-question rule",
              "Use the two-pass strategy to maximise marks across the full test",
              "Develop techniques for handling difficult questions without losing time",
              "Use time checkpoints to monitor pacing throughout the test",
              "Manage exam anxiety through familiarity and breathing techniques"
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
            Setting Up Exam Conditions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The value of a mock test lies in how closely it simulates the real exam experience. If you practise
              in a relaxed environment with notes available and no time pressure, you are not preparing yourself
              for the conditions you will face on EPA day. Creating realistic conditions builds the neural pathways
              for performing under pressure.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Mock Test Setup Checklist</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Quiet environment:</strong> Find a space free from interruptions — switch off your phone</li>
                <li className="pl-1"><strong>No references:</strong> Close all notes, textbooks, and study materials before starting</li>
                <li className="pl-1"><strong>Visible timer:</strong> Use a countdown timer set to 60 minutes — position it where you can see it</li>
                <li className="pl-1"><strong>Full test:</strong> Complete all 40 questions in one sitting — no pausing or breaks</li>
                <li className="pl-1"><strong>Answer all questions:</strong> Never leave a question blank — there is no penalty for guessing</li>
                <li className="pl-1"><strong>Calculator:</strong> Only if your EPAO permits one — check beforehand</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-medium text-orange-400 mb-2">Common Mistakes in Mock Tests</p>
              <p className="text-sm text-white">
                Many apprentices undermine their mock test practice by pausing the timer to think, looking up answers
                for questions they are unsure about, or completing the test over multiple sessions. While these
                approaches feel comfortable, they do not prepare you for the real experience. The discomfort of working
                under time pressure during practice is exactly what builds your resilience for the real test.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Treat every mock test as if it were the real exam. The habits you build in
              practice are the habits you will use under pressure.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 02 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">02</span>
            Time Management and Pacing
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              With 90 seconds per question on average, time management is critical. Not all questions take the same
              amount of time — a simple recall question may take 30 seconds, while a complex scenario or calculation
              may need 2-3 minutes. The key is to build a time budget that accounts for this variation.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Recommended Time Budget</p>
              <div className="overflow-x-auto">
                <table className="text-sm text-white w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Phase</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Time</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">First pass</td>
                      <td className="border border-white/10 px-3 py-2">40-45 min</td>
                      <td className="border border-white/10 px-3 py-2">Answer all questions; flag difficult ones</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Second pass</td>
                      <td className="border border-white/10 px-3 py-2">10-15 min</td>
                      <td className="border border-white/10 px-3 py-2">Return to flagged questions with fresh eyes</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2">Final review</td>
                      <td className="border border-white/10 px-3 py-2">5 min</td>
                      <td className="border border-white/10 px-3 py-2">Check all questions answered; fix obvious errors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Time Checkpoints</h3>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>15 minutes:</strong> Should have completed approximately 10 questions</li>
                <li className="pl-1"><strong>30 minutes:</strong> Should have completed approximately 20 questions (halfway)</li>
                <li className="pl-1"><strong>45 minutes:</strong> Should have completed approximately 30 questions</li>
                <li className="pl-1"><strong>50-55 minutes:</strong> All 40 questions attempted; begin review</li>
              </ul>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">If You Are Ahead of Pace</h3>
                <p className="text-sm text-white">
                  Being ahead of pace is a good position. Use the extra time to read questions more carefully,
                  double-check calculations, and ensure you are answering the question actually asked. Do not rush
                  through the remaining questions just because you have time — maintain your careful technique.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">If You Are Behind Pace</h3>
                <p className="text-sm text-white">
                  If you are behind at a checkpoint, increase your decision speed. Use elimination more aggressively —
                  if you can narrow to two options, choose the better one and move on. Do not spend more than 90 seconds
                  on any single question during catch-up. You can always return to flagged questions if time allows.
                </p>
              </div>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Pacing is a skill that improves with practice. Your first mock test may feel
              rushed, but by the third or fourth, you will have developed an instinct for when to move on.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 03 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">03</span>
            The Two-Pass Strategy
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              The two-pass strategy is the most effective approach for maximising your score in a timed multiple-choice
              test. Rather than working through each question sequentially and getting stuck on difficult ones, you make
              two deliberate passes through the test with different objectives.
            </p>

            <div className="my-6 space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">First Pass — Secure the Easy Marks</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Work through every question in order</li>
                  <li className="pl-1">Answer questions you are confident about immediately</li>
                  <li className="pl-1">For questions you are unsure about, use elimination to select your best guess and flag the question</li>
                  <li className="pl-1">Do not spend more than 90 seconds on any question during this pass</li>
                  <li className="pl-1">The goal: answer all 40 questions with at least a reasonable attempt</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Second Pass — Improve on Flagged Questions</h3>
                <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                  <li className="pl-1">Return to flagged questions with fresh eyes and reduced pressure</li>
                  <li className="pl-1">Re-read the stem carefully — you may notice key words you missed first time</li>
                  <li className="pl-1">Sometimes answering later questions triggers recall that helps with earlier ones</li>
                  <li className="pl-1">Only change your answer if you have a clear reason — not just anxiety</li>
                  <li className="pl-1">If still unsure, stick with your original elimination-based choice</li>
                </ul>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <h3 className="text-sm font-medium text-elec-yellow/80 mb-3">Why Two Passes Work</h3>
              <p className="text-sm text-white">
                The two-pass approach prevents the common problem of spending too long on an early difficult question
                and running out of time for easier questions later. By ensuring every question gets at least your best
                guess on the first pass, you guarantee no marks are lost to unanswered questions. The second pass then
                allows you to improve answers on difficult questions with the benefit of having seen the entire test.
              </p>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Never leave any question without an answer after the first pass. Even a guess
              has a 25% chance of being correct; a blank has zero chance.
            </p>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 04 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">04</span>
            Dealing with Difficult Questions
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Every candidate encounters questions they find difficult. The difference between high-scoring and low-scoring
              candidates is not that high scorers find the test easy — it is that they manage difficult questions more
              effectively. Having a clear strategy for difficult questions prevents panic and time wastage.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Difficult Question Decision Tree</p>
              <ol className="text-sm text-white space-y-2 list-decimal list-outside ml-5">
                <li className="pl-1"><strong>Read the stem twice:</strong> Many apparently difficult questions become clearer on a second reading</li>
                <li className="pl-1"><strong>Eliminate what you can:</strong> Even if you cannot identify the correct answer, removing one or two options improves your odds</li>
                <li className="pl-1"><strong>Look for clues:</strong> The stem often contains information that points toward the correct answer — technical terms, specific contexts, regulation references</li>
                <li className="pl-1"><strong>Apply general principles:</strong> In electrical maintenance, safety-first principles (isolate before working, prove dead, use PPE) often guide the correct answer</li>
                <li className="pl-1"><strong>Select and flag:</strong> Choose your best option, flag the question, and move on. Return later if time allows</li>
              </ol>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Questions with Unfamiliar Content</h3>
                <p className="text-sm text-white">
                  If a question covers a topic you have not studied, do not panic. Use elimination to remove options
                  you know are wrong from other knowledge. Technical terms can often be broken down into recognisable
                  parts. Apply general electrical principles — they often point toward the correct answer even in
                  unfamiliar contexts.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <h3 className="text-sm font-medium text-elec-yellow/80 mb-2">Calculation Questions Under Pressure</h3>
                <p className="text-sm text-white">
                  If a calculation question is causing difficulty, check whether the options can help you work backwards.
                  Sometimes substituting the given options into the formula is quicker than solving from scratch. Also
                  check for common calculation traps — unit conversions (kW to W, mA to A) and formula transposition errors.
                </p>
              </div>
            </div>

            <div className="my-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-sm font-medium text-red-400 mb-2">What NOT to Do with Difficult Questions</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1">Do not spend more than 2-3 minutes on any single question</li>
                <li className="pl-1">Do not let one difficult question affect your confidence for the rest of the test</li>
                <li className="pl-1">Do not leave difficult questions blank — always select an answer</li>
                <li className="pl-1">Do not assume you have failed because of a few uncertain answers — you do not need 100%</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Key point:</strong> Accept that you will encounter questions you find difficult. This is normal and
              expected. Having a strategy for these moments — rather than hoping they will not happen — is what builds
              genuine exam resilience.
            </p>
          </div>
        </section>

        {/* Section 05 */}
        <section className="mb-10 mt-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-elec-yellow/80 text-sm font-normal">05</span>
            Managing Exam Anxiety
          </h2>
          <div className="text-white space-y-4 leading-relaxed">
            <p>
              Some degree of anxiety before and during an exam is normal and can even be helpful — it sharpens focus
              and increases alertness. However, excessive anxiety impairs performance by reducing working memory capacity,
              slowing processing speed, and causing rushed decisions. Learning to manage anxiety is as important as
              learning the technical content.
            </p>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">Before the Test</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Preparation reduces anxiety:</strong> The single best anxiety reducer is knowing you are well prepared</li>
                <li className="pl-1"><strong>Night before:</strong> Light revision only — do not cram. Get a full night's sleep</li>
                <li className="pl-1"><strong>Morning of:</strong> Eat a proper breakfast. Arrive early. Have your materials ready</li>
                <li className="pl-1"><strong>Avoid negative talk:</strong> Do not discuss what you do not know with other candidates before the test</li>
              </ul>
            </div>

            <div className="my-6 p-4 rounded-lg bg-white/5">
              <p className="text-sm font-medium text-elec-yellow/80 mb-2">During the Test</p>
              <ul className="text-sm text-white space-y-1.5 list-disc list-outside ml-5">
                <li className="pl-1"><strong>Breathing technique:</strong> If you feel anxious, pause and take 3 slow breaths — in for 4 seconds, hold for 4, out for 6</li>
                <li className="pl-1"><strong>One question at a time:</strong> Do not think about the whole test — focus only on the current question</li>
                <li className="pl-1"><strong>Positive self-talk:</strong> Replace "I don't know this" with "I'll use elimination and do my best"</li>
                <li className="pl-1"><strong>Physical awareness:</strong> Relax your shoulders, unclench your jaw, and sit back in your chair if you notice tension</li>
              </ul>
            </div>

            <p className="text-sm text-elec-yellow/70">
              <strong>Remember:</strong> You have been studying for months. You have practical experience. You have taken
              mock tests. Trust your preparation and focus on the process — one question at a time.
            </p>
          </div>
        </section>

        <hr className="border-white/5 my-12" />

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

        {/* Quiz */}
        <section className="mb-10">
          <Quiz title="Test Your Knowledge — Timed Mock Tests" questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Question Banks
            </Link>
          </Button>
          <Button size="lg" className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98]" asChild>
            <Link to="/study-centre/apprentice/m-o-e-t-module7-section1-3">
              Next: Feedback and Explanations
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </nav>

      </article>
    </div>
  );
};

export default MOETModule7Section1_2;
