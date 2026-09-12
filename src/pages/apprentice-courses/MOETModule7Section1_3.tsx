/**
 * MOET · Module 7 · Section 1 · Subsection 3 — Feedback and Explanations
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. This section of Module 7 covers technique for the
 * End-Point Assessment knowledge test rather than a specific piece of
 * engineering knowledge, so no ST1426 knowledge/skill/behaviour statement is
 * quoted here — none of the verified KSB statements checked for this
 * conversion describe exam or assessment-preparation technique.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  Bleed,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Feedback and Explanations - MOET Module 7 Section 1.3';
const DESCRIPTION =
  'Learn how to extract maximum value from wrong answers, understand why correct answers are right, identify patterns in mistakes and use explanations to deepen your EPA knowledge.';

const quickCheckQuestions = [
  {
    id: 'wrong-answer-value',
    question: 'Why is reviewing wrong answers more valuable than simply noting your score?',
    options: [
      'A score tells you exactly which topics to revise next',
      'Reviewing wrong answers is only useful if you scored below the pass mark',
      'Noting your score is enough to plan an effective revision schedule',
      'Wrong answers reveal specific knowledge gaps and misconceptions that can be targeted with revision',
    ],
    correctIndex: 3,
    explanation:
      'Each wrong answer is diagnostic information. It tells you exactly which topic, concept or skill needs attention. Simply noting your score tells you how much you know overall, but not what specifically to study. Targeted revision based on wrong answer analysis is far more efficient.',
  },
  {
    id: 'correct-answer-review',
    question: 'Why should you review explanations for questions you answered correctly?',
    options: [
      'A correct answer always proves you fully understand the topic',
      'You may have chosen the right answer for the wrong reason, which will not help in similar future questions',
      'Correct answers never need reviewing, only wrong ones do',
      'Reviewing correct answers wastes time that should go on weak topics',
    ],
    correctIndex: 1,
    explanation:
      'Sometimes candidates select the correct answer by elimination or lucky guessing rather than genuine understanding. Reviewing the explanation confirms whether your reasoning was sound, and may reveal additional depth that strengthens your knowledge for related questions.',
  },
  {
    id: 'pattern-recognition',
    question:
      'What does it indicate if you consistently get questions wrong in one particular topic area?',
    options: [
      'The question bank has errors in that section',
      'You should avoid studying that topic and focus elsewhere',
      'The questions in that topic are unfairly difficult',
      'You have a specific knowledge gap that requires focused revision in that area',
    ],
    correctIndex: 3,
    explanation:
      'Consistent errors in one topic area are a clear signal of a knowledge gap. This is valuable diagnostic information — it tells you exactly where to focus your revision for maximum improvement. Address the gap by returning to the relevant MOET module content.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'After completing a practice test, the most effective review strategy is to:',
    options: [
      'Note your overall score and move straight on to the next test',
      'Review explanations for every question — both correct and incorrect answers',
      'Review only the questions you answered incorrectly',
      'Re-read the whole module before looking at any explanations',
    ],
    correctAnswer: 1,
    explanation:
      'Comprehensive review of all explanations maximises learning from every practice test. You gain insight into why correct answers are right, why distractors are wrong, and whether your reasoning was sound even when your answer was correct.',
  },
  {
    id: 2,
    question:
      'You notice you have answered three consecutive motor control questions incorrectly. What does this suggest?',
    options: [
      'The motor control questions are unfairly difficult and can be ignored',
      'You simply had three unlucky guesses in a row',
      'You have a knowledge gap in motor control that needs targeted revision',
      'You should avoid motor control questions in the real EPA',
    ],
    correctAnswer: 2,
    explanation:
      'Patterns of errors in a specific topic clearly indicate a knowledge gap. This is exactly what practice tests are designed to reveal. Return to the relevant MOET module (Module 4 for motor control), study the content, and then re-attempt the questions.',
  },
  {
    id: 3,
    question:
      'When reviewing a wrong answer, you discover you chose a distractor based on a common misconception. What should you do?',
    options: [
      'Memorise the correct answer to that specific question and move on',
      'Ignore it, as the same question is unlikely to come up again',
      'Note the topic but not the reason you got it wrong',
      'Understand the misconception, learn why it is wrong, and study the correct principle so you can apply it to any related question',
    ],
    correctAnswer: 3,
    explanation:
      'Understanding the underlying misconception is far more valuable than memorising one answer. The same misconception may appear in different questions with different wording. By correcting your understanding of the principle, you protect yourself against all questions that test it.',
  },
  {
    id: 4,
    question: "A 'near miss' in practice test review is when you:",
    options: [
      'Selected the correct answer but your reasoning was flawed or based on a guess',
      'Selected a wrong answer that was very close to the correct one',
      'Ran out of time before reaching the final question',
      'Scored just below the pass mark on the overall test',
    ],
    correctAnswer: 0,
    explanation:
      "'Near misses' are correct answers achieved by guessing or flawed reasoning. They are dangerous because they mask knowledge gaps — you got the mark but do not truly understand the concept. Review the explanation to ensure your understanding is solid.",
  },
  {
    id: 5,
    question: 'When tracking your practice test scores, the most useful data to record is:',
    options: [
      'Only your overall percentage score for each test',
      'Score broken down by topic/module, plus notes on common error types',
      'Only the time taken to complete each test',
      'Only whether you passed or failed each attempt',
    ],
    correctAnswer: 1,
    explanation:
      'Topic-level scores reveal specific strengths and weaknesses. Combined with notes on error types (misconception, misreading, calculation error), this data allows you to create a highly targeted revision plan rather than generic studying.',
  },
  {
    id: 6,
    question:
      'You got a question right, but the explanation reveals a concept you did not know. What should you do?',
    options: [
      'Ignore it, since you already got the question right',
      'Assume the concept will not appear in the real EPA',
      'Note the concept and include it in your revision, as a related question may test it more directly',
      'Remove the question from your practice set so it does not recur',
    ],
    correctAnswer: 2,
    explanation:
      'Discovering new concepts through explanations — even for correct answers — expands your knowledge base. A related question in the EPA might test that specific concept more directly, and your lucky correct answer will not help you then.',
  },
  {
    id: 7,
    question: 'The purpose of reading the explanation for why each distractor is wrong is to:',
    options: [
      'Confirm which option the examiner intended as the correct answer',
      'Memorise the wrong options so you can rule them out by sight next time',
      'Check whether the question was worded fairly',
      'Understand common misconceptions and traps so you can recognise and avoid them in future',
    ],
    correctAnswer: 3,
    explanation:
      'Understanding why distractors are wrong reveals the misconceptions and errors they are designed to exploit. This knowledge helps you recognise and avoid similar traps in the real exam, even when the questions are worded differently.',
  },
  {
    id: 8,
    question: 'After reviewing a practice test, you should update your revision plan to:',
    options: [
      'Focus on the topics and concepts where your review identified gaps or weak understanding',
      'Spend more time on the topics you already score highly on',
      'Keep the plan exactly the same regardless of your results',
      'Drop any topic you got wrong, as it is clearly too hard',
    ],
    correctAnswer: 0,
    explanation:
      'The review should directly inform your revision plan. Prioritise topics where you scored lowest and concepts where your understanding was weakest. This targeted approach is far more efficient than re-studying everything.',
  },
  {
    id: 9,
    question:
      'If you consistently misread negative-stem questions (those containing NOT or EXCEPT), the best corrective action is to:',
    options: [
      'Answer negative-stem questions last, after all the others',
      'Practise highlighting or underlining key words like NOT and EXCEPT, and develop a habit of checking for them',
      'Skip any question that contains NOT or EXCEPT',
      'Always pick the option that sounds most like a correct statement',
    ],
    correctAnswer: 1,
    explanation:
      'If misreading is a pattern, develop a specific countermeasure. Actively highlighting or mentally flagging key words like NOT, EXCEPT, and LEAST trains your brain to notice them. This is a skill that improves rapidly with deliberate practice.',
  },
  {
    id: 10,
    question:
      'How should you use explanations from practice tests when studying the MOET course material?',
    options: [
      'Treat the explanation as the complete content and ignore the module',
      'Only read explanations for the questions you got wrong',
      'Cross-reference explanations with the relevant MOET module sections to deepen understanding of the topic in context',
      'Memorise each explanation word for word without reading the module',
    ],
    correctAnswer: 2,
    explanation:
      'Explanations from practice tests often summarise key concepts from the MOET modules. Cross-referencing with the full module content provides deeper context and helps you understand how the concept fits into the broader topic — essential for scenario-based EPA questions.',
  },
];

const faqs = [
  {
    question: 'Should I review every single explanation or just the ones for wrong answers?',
    answer:
      'Review every explanation, at least briefly. For wrong answers, study the explanation in depth and cross-reference with your course material. For correct answers, skim the explanation to confirm your reasoning was sound. If the explanation reveals something you did not know, add it to your revision notes.',
  },
  {
    question: 'How do I track my scores effectively?',
    answer:
      'Create a simple spreadsheet or table with columns for: date, test number, overall score, and score per topic area (e.g., H&S, Electrical Science, Installations, Motor Control, Maintenance, Documentation). Add a notes column for common error types. Over multiple tests, patterns will emerge clearly.',
  },
  {
    question: 'What if the explanation does not make sense to me?',
    answer:
      "If an explanation is unclear, go back to the relevant MOET module section and study the topic from first principles. If it still does not make sense, discuss it with your training provider, workplace mentor, or study group. Understanding the 'why' is essential — do not just memorise the answer.",
  },
  {
    question: 'Is it better to review immediately after the test or wait until later?',
    answer:
      'Review immediately after completing the test while the questions are fresh in your mind. You will remember your thought process and reasoning, which helps you understand why you made errors. If you wait too long, you will have forgotten your rationale and the review loses much of its value.',
  },
  {
    question: 'How many times should I re-attempt questions I got wrong?',
    answer:
      'After studying the topic, re-attempt the questions at least once. If you get them right, move on. If you get them wrong again, you need deeper study of the underlying concept — not just more practice questions. Alternate between content study and question practice until you consistently answer correctly.',
  },
];

const MOETModule7Section1_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.1 · Subsection 3"
        title="Feedback and Explanations"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Turning every practice question into a learning opportunity through systematic review.
          </p>

          <TLDR
            points={[
              'Review all: study explanations for correct and incorrect answers.',
              'Diagnose: each wrong answer reveals a specific knowledge gap.',
              'Patterns: track errors by topic to target weak areas.',
              'Near misses: correct answers with flawed reasoning need attention.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Extract maximum learning value from every wrong answer in practice tests',
              'Understand why correct answers are right — not just which option to select',
              'Identify recurring patterns and common misconceptions in your answers',
              'Use explanations to build deeper understanding rather than surface recall',
              'Cross-reference practice test feedback with MOET module content',
              'Create targeted revision plans based on systematic error analysis',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Misconceptions:</strong> common errors in earthing, protection, isolation.
              </li>
              <li>
                <strong>Regulations:</strong> understanding why specific regs apply.
              </li>
              <li>
                <strong>Application:</strong> moving from recall to genuine understanding.
              </li>
              <li>
                <strong>ST1426:</strong> building depth across all KSB areas.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>The value of wrong answers</ContentEyebrow>

          <ConceptBlock title="The value of wrong answers">
            <p>
              Many candidates view wrong answers purely as failures. In reality, every wrong answer
              is a gift — it is diagnostic information that tells you exactly where your
              understanding is incomplete. A practice test where you score 100% teaches you almost
              nothing new. A test where you make mistakes and systematically learn from them is far
              more valuable for your development.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What a wrong answer tells you">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Knowledge gap:</strong> you do not know enough about this specific topic.
              </li>
              <li>
                <strong>Misconception:</strong> you have an incorrect belief that led you to the
                wrong answer.
              </li>
              <li>
                <strong>Reading error:</strong> you misread the question and answered a different
                question.
              </li>
              <li>
                <strong>Application failure:</strong> you know the theory but could not apply it in
                context.
              </li>
              <li>
                <strong>Calculation error:</strong> you understand the method but made a
                mathematical mistake.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Wrong answer review process">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Read the question again:</strong> did you misread it? Did you miss a key
                word?
              </li>
              <li>
                <strong>Identify your reasoning:</strong> why did you choose the option you
                selected?
              </li>
              <li>
                <strong>Read the explanation:</strong> understand why the correct answer is right.
              </li>
              <li>
                <strong>Understand each distractor:</strong> learn why each wrong option is wrong.
              </li>
              <li>
                <strong>Categorise the error:</strong> was it a knowledge gap, misconception, or
                reading error?
              </li>
              <li>
                <strong>Plan your revision:</strong> note the topic and concept for targeted study.
              </li>
            </ol>
            <p>
              <strong>Key point:</strong> the goal of practice is not to get a high score — it is to
              find and fix your weaknesses. Embrace wrong answers as learning opportunities.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Understanding why correct answers are right</ContentEyebrow>

          <ConceptBlock title="Understanding why correct answers are right">
            <p>
              Reviewing correct answers may seem unnecessary, but it is a crucial part of deepening
              your understanding. There is an important difference between getting the right answer
              and truly understanding why it is right. If you selected the correct option by
              guessing or using a process of elimination without genuine understanding, you may not
              be able to answer a differently worded question on the same topic.
            </p>
          </ConceptBlock>

          <ConceptBlock title='Types of "correct but risky" answers'>
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Lucky guess:</strong> you had no idea and happened to select correctly —
                this is not knowledge.
              </li>
              <li>
                <strong>Right reason, incomplete understanding:</strong> your reasoning was correct
                but shallow — a deeper question would catch you out.
              </li>
              <li>
                <strong>Correct elimination:</strong> you eliminated distractors correctly but could
                not have identified the answer independently.
              </li>
              <li>
                <strong>Familiar phrasing:</strong> you recognised the wording from study material
                without truly understanding the concept.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title='The "near miss" problem'
            whatHappens={
              <>
                A near miss looks like a success (correct answer) but masks a vulnerability. In the
                real EPA, the question may be worded differently or test the concept from a
                different angle. Your lucky correct answer in practice gives you false confidence.
              </>
            }
            doInstead={
              <>
                Checking the explanation for every correct answer catches these near misses before
                the real exam does.
              </>
            }
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>Key point:</strong> for every correct answer, ask yourself: &quot;Could I
            explain to someone else why this is correct and why the other options are wrong?&quot;
            If the answer is no, study the explanation.
          </p>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Identifying patterns in mistakes</ContentEyebrow>

          <ConceptBlock title="Identifying patterns in mistakes">
            <p>
              Individual wrong answers are useful, but patterns across multiple tests are even more
              valuable. If you consistently make errors in the same topic, the same question type,
              or due to the same kind of mistake, you have identified a systemic issue that targeted
              action can resolve.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Common error patterns in electrical maintenance EPA">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Pattern</th>
                    <th className="py-2 pr-4 font-medium text-white">Example</th>
                    <th className="py-2 font-medium text-white">Fix</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Topic gap</td>
                    <td className="py-2 pr-4">Always wrong on PLC questions</td>
                    <td className="py-2">Restudy Module 4 PLC content</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Misreading</td>
                    <td className="py-2 pr-4">Missing NOT/EXCEPT in stems</td>
                    <td className="py-2">Practise highlighting key words</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Calculation errors</td>
                    <td className="py-2 pr-4">Unit conversion mistakes (kW/W)</td>
                    <td className="py-2">Drill unit conversions daily</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Misconception</td>
                    <td className="py-2 pr-4">Confusing RCD and MCB functions</td>
                    <td className="py-2">Study protection devices in depth</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Application failure</td>
                    <td className="py-2 pr-4">Knowing theory but failing scenarios</td>
                    <td className="py-2">Practise scenario-based questions</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="How to track patterns">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Score by topic:</strong> after each test, note your score for each module
                area.
              </li>
              <li>
                <strong>Error log:</strong> keep a running list of topics and question types you get
                wrong.
              </li>
              <li>
                <strong>Error categorisation:</strong> tag each error as knowledge gap,
                misconception, reading error, or calculation error.
              </li>
              <li>
                <strong>Trend analysis:</strong> after 3-4 tests, review your log for recurring
                themes.
              </li>
              <li>
                <strong>Revision targeting:</strong> allocate your study time proportionally to your
                weakest areas.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> three tests with pattern tracking are more valuable than
              ten tests without review. The data from your errors is the roadmap to improvement.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Using explanations to deepen knowledge</ContentEyebrow>

          <ConceptBlock title="Using explanations to deepen knowledge">
            <p>
              Explanations in practice question banks are not just answers — they are condensed
              teaching material. A good explanation not only tells you what the correct answer is
              but explains the underlying principle, references relevant standards, and connects the
              concept to practical electrical maintenance work. Using explanations strategically
              turns every practice question into a mini-lesson.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Getting the most from explanations">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Read fully:</strong> do not skim — read the entire explanation, even for
                correct answers.
              </li>
              <li>
                <strong>Note new information:</strong> if the explanation contains facts or
                principles you did not know, add them to your revision notes.
              </li>
              <li>
                <strong>Cross-reference:</strong> use regulation or standard references in
                explanations to look up the source material.
              </li>
              <li>
                <strong>Connect to practice:</strong> think about how the concept applies to your
                workplace experience.
              </li>
              <li>
                <strong>Teach it:</strong> try explaining the concept in your own words — if you can
                teach it, you understand it.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Surface learning versus deep learning">
            <p>
              <strong>Surface learning</strong> means recognising the right answer when you see it.{' '}
              <strong>Deep learning</strong> means understanding why it is right and being able to
              apply the principle to new situations. The EPA tests deep learning through
              scenario-based questions — surface learning is not enough. Use explanations to build
              depth.
            </p>
            <p>
              As you review explanations, build a condensed set of revision notes organised by
              topic. Include key principles, regulation references, common misconceptions, and
              worked examples. These notes become your final revision resource — distilled from your
              own learning process and focused on your specific needs.
            </p>
          </ConceptBlock>

          <Scenario
            title="Deep learning from one question"
            situation={
              <>
                The question: what is the maximum disconnection time for a 32 A final circuit in a
                TN system? Surface learning stops here: the answer is 0.4 seconds — memorise it.
              </>
            }
            whatToDo={
              <>
                BS 7671 Table 41.1 specifies 0.4 seconds for circuits not exceeding 32 A in TN
                systems. The purpose is to ensure automatic disconnection of supply (ADS) operates
                fast enough to prevent electric shock. The time relates to the let-through energy
                that the human body can tolerate. Different earthing systems (TT) have different
                requirements (0.2 seconds). Understanding this principle means you can answer
                questions about any combination of circuit rating and earthing system.
              </>
            }
            whyItMatters={
              <>
                Every explanation is an opportunity to move from &quot;I know the answer&quot; to
                &quot;I understand the principle.&quot; The EPA rewards understanding, not just
                recall.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Creating an effective feedback loop</ContentEyebrow>

          <ConceptBlock title="Creating an effective feedback loop">
            <p>
              The most effective learners treat practice tests, review, and revision as a continuous
              cycle rather than separate activities. Each practice test generates feedback; the
              feedback guides revision; the revision improves performance in the next test. This
              iterative cycle is the foundation of efficient EPA preparation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The practice-review-revise cycle">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Practice:</strong> complete a timed mock test under exam conditions.
              </li>
              <li>
                <strong>Review:</strong> analyse every answer — identify errors, near misses and
                learning points.
              </li>
              <li>
                <strong>Diagnose:</strong> categorise errors and identify patterns across tests.
              </li>
              <li>
                <strong>Revise:</strong> study the specific topics and concepts identified as weak.
              </li>
              <li>
                <strong>Re-test:</strong> attempt questions on the weak topics to verify
                improvement.
              </li>
              <li>
                <strong>Repeat:</strong> take the next mock test and start the cycle again.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Measuring progress"
            onSite="This systematic approach to learning from feedback demonstrates the professional behaviour of continuous improvement — a key behaviour assessed in the EPA professional discussion."
          >
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Overall score trend:</strong> your scores should show an upward trend over
                successive tests.
              </li>
              <li>
                <strong>Topic improvement:</strong> scores in previously weak areas should improve
                after targeted revision.
              </li>
              <li>
                <strong>Error reduction:</strong> the same types of errors should become less
                frequent.
              </li>
              <li>
                <strong>Confidence level:</strong> you should feel increasingly confident about your
                knowledge.
              </li>
              <li>
                <strong>Flagged questions:</strong> the number of flagged (uncertain) questions
                should decrease over time.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'The goal of practice is not to get a high score — it is to find and fix your weaknesses.',
              'For every correct answer, ask whether you could explain to someone else why it is right and the others are wrong.',
              'Pattern tracking across tests is more valuable than volume — the data from your errors is the roadmap to improvement.',
              'Every explanation is a chance to move from knowing the answer to understanding the principle.',
              'Learning from feedback systematically demonstrates continuous improvement — assessed in the EPA professional discussion.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Test Your Knowledge — Feedback and Explanations"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section1-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Timed Mock Tests
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section1-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Identifying Knowledge Gaps
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section1_3;
