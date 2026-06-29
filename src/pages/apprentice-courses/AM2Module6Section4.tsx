/**
 * Module 6 · Section 4 — Exam techniques and mindset
 * AM2 day-prep — AM2 Phase E (online knowledge tests)
 * Reading questions properly, eliminating wrong answers and keeping a clear head when one looks weird.
 */

import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Lightbulb,
  Search,
  Target,
} from 'lucide-react';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { Link } from 'react-router-dom';
import {
  ConceptBlock,
  CommonMistake,
  LearningOutcomes,
  TLDR,
  Scenario,
  KeyTakeaways,
  FAQ,
} from '@/components/study-centre/learning';
import { PageFrame, PageHero } from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Exam Techniques and Mindset | AM2 Module 6.4 | Elec-Mate';
const DESCRIPTION =
  'Read each AM2 question properly, eliminate the wrong answers and keep a clear head when one looks weird — proven exam technique.';

const AM2Module6Section4 = () => {
  useSEO(TITLE, DESCRIPTION);

  const learningOutcomes = [
    'Apply proven exam techniques to maximise your score',
    'Recognise and avoid the common mistakes candidates make under pressure',
    'Use elimination and educated guessing effectively',
    'Stay calm and focused, even when faced with difficult questions',
    'Approach the test with confidence, not anxiety',
  ];

  const quickCheckQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }> = [
    {
      id: 'reading-questions',
      question: "What's the difference between 'minimum IR value' and 'recommended IR value'?",
      options: [
        'Minimum applies to SELV only; recommended applies to LV circuits',
        'Minimum is measured at 250 V; recommended is measured at 500 V',
        'They are two names for the same 1 MΩ pass figure',
        'Minimum is 1 MΩ (legal pass), recommended is best practice target',
      ],
      correctIndex: 3,
      explanation:
        'Minimum is the legal pass mark (1 MΩ), recommended is the best practice target for good installations.',
    },
    {
      id: 'units-conversion',
      question: 'If an RCD trips in 0.28 s, should this be written as 280 ms or 0.28 ms?',
      options: [
        'Neither - use seconds only',
        '0.28 ms',
        'Both are correct',
        '280 ms',
      ],
      correctIndex: 3,
      explanation:
        '280 ms - candidates often lose marks by miswriting units. 0.28 s = 280 ms (multiply by 1000).',
    },
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What's the biggest cause of lost marks in the knowledge test?",
      options: [
        'Lack of knowledge',
        'Misreading questions',
        'Time pressure',
        'Calculator errors',
      ],
      correctAnswer: 1,
      explanation:
        "Misreading questions is the biggest cause - many fails come from not reading keywords like 'minimum/maximum' properly.",
    },
    {
      id: 2,
      question: 'Why should you underline or note keywords in a question?',
      options: [
        'To make the exam paper look neat for the assessor',
        'To use up spare time between questions',
        "To prevent misreading what's actually asked",
        'To signal to the assessor which answer you chose',
      ],
      correctAnswer: 2,
      explanation:
        "Underlining keywords prevents misreading - many candidates answer what they think is asked rather than what's written.",
    },
    {
      id: 3,
      question: 'What technique narrows your options if unsure?',
      options: [
        'Asking for help',
        'Guessing randomly',
        'Skipping the question',
        'Process of elimination',
      ],
      correctAnswer: 3,
      explanation:
        'Process of elimination - crossing out obviously wrong answers gives you better odds and reduces panic.',
    },
    {
      id: 4,
      question: 'Which is correct: 0.28 s = 280 ms or 0.28 ms?',
      options: [
        '280 ms',
        '0.28 ms',
        'Both are correct',
        'Neither',
      ],
      correctAnswer: 0,
      explanation:
        '280 ms is correct. To convert seconds to milliseconds, multiply by 1000: 0.28 x 1000 = 280 ms.',
    },
    {
      id: 5,
      question: 'True or false: You should always change your first answer.',
      options: ['True', 'False'],
      correctAnswer: 1,
      explanation:
        'False - research shows your first instinct is usually right. Only change if you see clear evidence.',
    },
    {
      id: 6,
      question: "What's the best strategy if faced with a difficult maths problem?",
      options: [
        'Spend 10 minutes working it out',
        'Give up and move on',
        'Flag it and return later',
        'Guess immediately',
      ],
      correctAnswer: 2,
      explanation:
        "Flag it and return later - don't waste time early. Come back fresh with remaining time.",
    },
    {
      id: 7,
      question: 'How many questions out of 40 can you afford to miss and still pass?',
      options: [
        '5-8 questions',
        '10-12 questions',
        '15-20 questions',
        '12-14 questions',
      ],
      correctAnswer: 3,
      explanation:
        'Around 12-14 wrong questions (if 40 total), depending on pass mark - you need roughly 60-65% to pass.',
    },
    {
      id: 8,
      question: 'Give one example of a common unit mix-up.',
      options: [
        'kW and W',
        'Ohms and siemens',
        'Volts and amps',
        'Hz and kHz',
      ],
      correctAnswer: 0,
      explanation:
        'kW and W is a common mix-up - forgetting to convert kilowatts to watts in power calculations costs marks.',
    },
    {
      id: 9,
      question: "What's the benefit of breaking the test into 'chunks' of 10?",
      options: [
        "It's required by the exam rules",
        'It lets you skip the harder sections',
        'It earns extra marks for organisation',
        'It eases time pressure and mental load',
      ],
      correctAnswer: 3,
      explanation:
        "Breaking the test into chunks makes time management easier and reduces the mental pressure of a 'big' 90-minute test.",
    },
    {
      id: 10,
      question: 'What mindset should you have walking into the test?',
      options: [
        'Nervous but hopeful',
        'Worried about time',
        'Calm and confident',
        'Anxious but prepared',
      ],
      correctAnswer: 2,
      explanation:
        "Calm and confident - anxiety costs marks. You're proving you can work accurately under pressure, just like on site.",
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <Link
            to="/study-centre/apprentice/am2/module6"
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>

          {/* Hero Section */}
          <PageHero
            eyebrow="Module 6 • Section 4"
            title="Exam Techniques and Mindset"
            description="The AM2 online knowledge test is as much about exam discipline and mindset as it is about knowledge. Many candidates know the material but lose marks because they misread questions, panic under pressure, or second-guess themselves. This section teaches you how to approach questions with the right techniques, avoid common pitfalls, and maintain a confident, professional mindset."
            tone="yellow"
          />

          <TLDR
            points={[
              'Read TWICE before clicking. Watch for keywords: MINIMUM, MAXIMUM, NOT, EXCEPT, MUST, SHOULD. Misreading one is the most common reason confident candidates fail.',
              'Eliminate to narrow 4 options to 2. That turns a 25% guess into a 50% guess. Then pick the most complete, technically correct option.',
              "Trust your first instinct unless you see clear evidence it's wrong. Research shows 'change to a different answer' is wrong more often than it's right.",
            ]}
          />

          {/* Critical Warning */}
          <CommonMistake
            title="Exam Technique is Everything"
            whatHappens={
              <>
                <p className="text-ios-callout text-white mb-2">
                  Many candidates fail the AM2 knowledge test not due to lack of knowledge, but poor
                  exam technique. Misreading questions, panicking under pressure, and
                  second-guessing yourself are guaranteed routes to failure.
                </p>
                <p className="text-ios-callout text-white font-medium">
                  Master these techniques and your mindset. Knowledge + exam discipline = pass.
                </p>
              </>
            }
            doInstead={<>Treat this as a hard rule on AM2 day — there are no exceptions.</>}
          />

          {/* Learning Outcomes */}
          <section className="space-y-3">
            <LearningOutcomes outcomes={learningOutcomes} />
          </section>

          {/* Reading Questions Properly */}
          <ConceptBlock title="1. Reading the Question Properly">
            <p>Many fails come from misreading. Always:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Look for keywords:</strong> "minimum", "maximum", "must", "should"
              </li>
              <li>
                <strong>Underline or note</strong> what is actually being asked
              </li>
              <li>
                <strong>Don't answer what you think is asked</strong> - answer what is written
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Key Words to Watch For:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>"Minimum"</strong> vs <strong>"Maximum"</strong> (most common trap)
              </li>
              <li>
                <strong>"Must"</strong> vs <strong>"Should"</strong> (legal vs recommended)
              </li>
              <li>
                <strong>"NOT"</strong> or <strong>"EXCEPT"</strong> (reverse logic)
              </li>
              <li>
                <strong>"All"</strong> vs <strong>"Some"</strong> (absolute vs partial)
              </li>
              <li>
                <strong>"Always"</strong> vs <strong>"Usually"</strong> (frequency)
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Active Reading Technique:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Read question twice before looking at options</li>
              <li>Circle or highlight key words</li>
              <li>Rephrase question in your own words</li>
              <li>Check if you need to calculate or just recall</li>
              <li>Look for context clues about what's being tested</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[0].id}
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <Scenario
            title="The keyword trap — read this question carefully"
            situation={
              <>
                "Which of the following is the maximum permissible voltage drop for a lighting
                circuit from the origin of the installation, expressed as a percentage of the
                nominal supply voltage?"
                <br />
                <br />
                Options: A) 1%, B) 3%, C) 5%, D) 8%.
              </>
            }
            whatToDo={
              <>
                Spot the keywords: <strong>MAXIMUM PERMISSIBLE</strong> and{' '}
                <strong>LIGHTING</strong> and <strong>FROM THE ORIGIN</strong>. BS 7671 Appendix 4:
                max voltage drop for lighting from origin is <strong>3%</strong>. (Other circuits =
                5%; 1% is too tight, 8% would be a fail.) Answer: B) 3%. Now imagine if the question
                said "for non-lighting circuits" — answer would be C) 5%. Same reg, different
                keyword, different correct option.
              </>
            }
            whyItMatters={
              <>
                Half the questions you'll get wrong on the day will be ones where you knew the regs
                but misread the question. Slowing down 5 seconds to identify keywords is the
                highest-return habit in exam technique. Read the question. Read the options. Then
                read the question again to make sure you're answering what was actually asked.
              </>
            }
          />

          {/* Using Elimination */}
          <ConceptBlock title="2. Using Elimination to Your Advantage">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cross out the obviously wrong answers first</strong>
              </li>
              <li>
                <strong>Narrowing 4 options to 2</strong> gives you a 50/50 chance even if unsure
              </li>
              <li>
                <strong>Elimination also reduces panic</strong> and clears your head
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Advanced Elimination Strategies:</strong>
            </p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Obvious Wrong:</strong> Cross out answers that are clearly impossible or
                irrelevant to the question context.
              </li>
              <li>
                <strong>Context Check:</strong> Eliminate answers that don't fit the scenario (e.g.,
                domestic vs industrial).
              </li>
              <li>
                <strong>Best Fit:</strong> Choose the most complete and accurate answer from
                remaining options.
              </li>
            </ol>

            <p>
              <strong className="text-elec-yellow">Elimination Example:</strong>
            </p>
            <p>
              <strong>Question:</strong> "What is the maximum Zs value for a 32A Type B MCB?"
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>X 10.5O - Way too high (obviously wrong)</li>
              <li>X 7.28O - This is for 6A, not 32A (context wrong)</li>
              <li>X 2.73O - This is for 16A, close but wrong (context check)</li>
              <li>
                Correct: <strong>1.37O</strong> - Correct for 32A Type B (best fit)
              </li>
            </ul>
          </ConceptBlock>

          {/* Avoiding Common Traps */}
          <ConceptBlock title="3. Avoiding Common Traps">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mixing units:</strong> confusing kW and W, or ms and s
              </li>
              <li>
                <strong>Maths errors:</strong> not rounding properly, forgetting Ohm's law basics
              </li>
              <li>
                <strong>Overcomplicating:</strong> many questions only need a simple calculation
              </li>
              <li>
                <strong>Changing answers unnecessarily:</strong> trust your first instinct unless
                you're sure it's wrong
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={quickCheckQuestions[1].id}
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <CommonMistake
            title="Changing your first answer because you're nervous"
            whatHappens={
              <>
                You answered question 17 with option C, felt OK about it, moved on. At question 25
                you start panicking. You go back to question 17 thinking "maybe I should change it
                to B". You click B, submit, and the result later confirms C was right. You just gave
                away a mark you'd already earned.
              </>
            }
            doInstead={
              <>
                Trust your first instinct unless you can specifically articulate WHY the first
                answer is wrong (e.g. "I just realised I misread the question" or "I now see the
                regulation applies differently"). Vague unease is not a reason to change.
                Multiple-choice research shows changes are wrong more often than right. Stick with
                your first pick unless you've found a real error.
              </>
            }
          />

          {/* Staying Calm Under Pressure */}
          <ConceptBlock title="4. Staying Calm Under Pressure">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>If you hit a hard question,</strong> breathe and move on
              </li>
              <li>
                <strong>Break the test mentally</strong> into smaller chunks (10 questions at a
                time)
              </li>
              <li>
                <strong>Don't let one question shake your confidence</strong> - the pass mark allows
                for errors
              </li>
              <li>
                <strong>Remind yourself:</strong> you only need around 60-65% to pass, not 100%
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">When You Feel Overwhelmed:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Take 3 deep breaths</strong> - reset your nervous system
              </li>
              <li>
                <strong>Remind yourself:</strong> "I know this material"
              </li>
              <li>
                <strong>Focus on the current question only</strong> - not the whole test
              </li>
              <li>
                <strong>Use the 'chunk' method:</strong> think "10 questions done, 3 to go"
              </li>
              <li>
                <strong>Positive self-talk:</strong> "I can work this out"
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Physical Stress Response:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Tight shoulders?</strong> Roll them back 3 times
              </li>
              <li>
                <strong>Racing heart?</strong> Slow, controlled breathing
              </li>
              <li>
                <strong>Sweaty palms?</strong> Wipe them, reset posture
              </li>
              <li>
                <strong>Mind blank?</strong> Skip question, come back fresh
              </li>
              <li>
                <strong>Time anxiety?</strong> Check clock every 15 mins only
              </li>
            </ul>
          </ConceptBlock>

          {/* Strategic Answering */}
          <ConceptBlock title="5. Strategic Answering">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Always answer every question</strong> - no penalties for wrong answers
              </li>
              <li>
                <strong>If unsure,</strong> eliminate, guess, and move on
              </li>
              <li>
                <strong>Use flagging</strong> to return later
              </li>
              <li>
                <strong>Manage energy:</strong> avoid spending too long on maths-heavy questions
                early
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">Strategic Answering - The FAST Method:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>F - Flag:</strong> Mark difficult questions for later review instead of
                getting stuck.
              </li>
              <li>
                <strong>A - Answer:</strong> Give your best guess using elimination - never leave
                blank.
              </li>
              <li>
                <strong>S - Skip:</strong> Move on quickly to maintain momentum and confidence.
              </li>
              <li>
                <strong>T - Time:</strong> Return with remaining time for fresh perspective.
              </li>
            </ul>

            <p>
              <strong className="text-elec-yellow">
                Energy Management — First Pass (60 minutes):
              </strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Answer all easy questions quickly</li>
              <li>Flag complex calculations</li>
              <li>Build confidence and momentum</li>
              <li>Aim for 25-30 questions complete</li>
            </ul>

            <p>
              <strong className="text-elec-yellow">
                Energy Management — Second Pass (20 minutes):
              </strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Focus on flagged questions</li>
              <li>Use elimination techniques</li>
              <li>Apply fresh perspective</li>
              <li>Final check of risky answers</li>
            </ul>
          </ConceptBlock>

          {/* Practical Guidance */}
          <section className="space-y-3">
            <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Practical Guidance
            </h2>

            <ul className="space-y-2 text-sm text-white">
              <li>
                - <strong className="text-white">Practice active reading.</strong> Say the question
                to yourself in your own words
              </li>
              <li>
                - <strong className="text-white">Check units twice</strong> before clicking
              </li>
              <li>
                - <strong className="text-white">Answer with confidence.</strong> Don't waste time
                doubting yourself after every click
              </li>
              <li>
                - <strong className="text-white">Treat the test like a job task</strong> - you're
                proving you can work accurately under pressure
              </li>
              <li>
                - <strong className="text-white">Walk in positive.</strong> Anxiety costs marks -
                calm confidence wins them
              </li>
            </ul>
          </section>

          {/* Real-World Examples */}
          <ConceptBlock title="Real-World Examples">
            <p>
              <strong className="text-elec-yellow">Example 1:</strong> Candidate misread "maximum"
              as "minimum" in a regs question. Gave opposite answer - lost easy marks.
            </p>
            <p>
              <strong className="text-elec-yellow">Example 2:</strong> Candidate flagged 4
              questions, came back fresh, and answered 3 correctly - passed comfortably.
            </p>
            <p>
              <strong className="text-elec-yellow">Example 3:</strong> Candidate panicked, rushed,
              and changed 6 answers - original choices were correct.
            </p>
            <p>
              <strong className="text-elec-yellow">Example 4:</strong> In real work, an electrician
              confused kW with W when calculating load. Same error in AM2 = wrong answer.
            </p>
          </ConceptBlock>

          <FAQ
            items={[
              {
                question: 'Should I always change my first answer if I feel unsure?',
                answer:
                  "No — research consistently shows your first instinct is right more often than not. Only change if you can articulate a SPECIFIC reason: 'I misread the keyword' or 'I now see option C also fits but B is more complete'. Vague unease is not a reason to change.",
              },
              {
                question: 'How do I handle a maths-heavy question under time pressure?',
                answer:
                  "Flag it, move on, come back. If it's eating more than 3 minutes and you've not made progress, you're probably making an arithmetic error you won't spot. Fresh eyes after 20 minutes often see the slip instantly. In the meantime, bank marks on questions you can do quickly.",
              },
              {
                question: "What's the biggest trap in AM2 questions?",
                answer:
                  "Misreading keywords. MINIMUM vs MAXIMUM. NOT or EXCEPT (reverse logic). MUST (legal) vs SHOULD (recommended). Unit mixups (kW vs W, ms vs s, A vs mA). Slow down 5 seconds to identify keywords — it's the highest-return habit in the test.",
              },
              {
                question: 'How many questions can I afford to get wrong and still pass?',
                answer:
                  "On a 30-question test with 70% pass mark: up to 9 wrong. That means knowing 21 questions confidently and guessing well on the other 9 will pass you. You don't need perfection — you need consistency. Knowing this changes the pressure.",
              },
              {
                question: 'How can I calm nerves before starting?',
                answer:
                  "Arrive early, sit calmly, do 4-7-8 breathing (inhale 4 counts, hold 7, exhale 8) for 2 minutes. Remind yourself you don't need to know everything — just 70%. Treat it like a normal work task: methodical, focused, one thing at a time.",
              },
              {
                question: "What's the single best technique I should drill before the day?",
                answer:
                  'Active reading. Practice on past-paper questions: read each question twice, underline keywords mentally, rephrase in your own words, THEN look at the options. This habit catches 80% of the misread-question errors that fail otherwise-prepared candidates.',
              },
            ]}
          />

          {/* Summary */}
          <section className="space-y-3">
            <h2 className="text-ios-title-2 font-bold text-elec-yellow mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Summary
            </h2>

            <div className="text-sm text-white space-y-3">
              <p>Good exam technique and mindset can add 10-15% to your score. To succeed:</p>
              <ul className="space-y-1 ml-4">
                <li>- Read carefully, watch for key words</li>
                <li>- Use elimination and flagging</li>
                <li>- Avoid common traps with units and maths</li>
                <li>- Stay calm - you don't need perfection, just steady accuracy</li>
                <li>- Approach with confidence: knowledge + mindset = pass</li>
              </ul>
            </div>
          </section>

          <KeyTakeaways
            points={[
              'Read each question TWICE before clicking. Underline keywords mentally: MINIMUM, MAXIMUM, NOT, EXCEPT, MUST, SHOULD.',
              'Eliminate first, then guess. 4 options to 2 turns 25% odds into 50%. Any elimination is better than blind guess.',
              "Trust first instincts. Don't change answers because you're nervous — only change with specific articulated reasoning.",
              'Watch units obsessively: kW vs W, ms vs s, A vs mA. Unit mix-ups account for surprisingly many lost marks.',
              "70% to pass = 9 wrong allowed on a 30-question test. You don't need perfection. Stay calm, stay methodical, and one bad question won't sink you.",
              'Calm + methodical wins. Anxiety costs marks. Confidence (built on having actually revised) wins them.',
            ]}
          />

          {/* Quiz */}
          <Quiz questions={quizQuestions} title="Test Your Understanding" />

          {/* Navigation Footer */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              to="/study-centre/apprentice/am2/module6/section3"
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Time Management
              </div>
            </Link>
            <Link
              to="/study-centre/apprentice/am2/module7"
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 7: Exam Strategy and Success Tips
              </div>
            </Link>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default AM2Module6Section4;
