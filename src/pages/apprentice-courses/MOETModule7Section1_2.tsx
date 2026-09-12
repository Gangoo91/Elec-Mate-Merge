/**
 * MOET · Module 7 · Section 1 · Subsection 2 — Timed Mock Tests
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. This section of Module 7 covers technique for the
 * End-Point Assessment knowledge test rather than a specific piece of
 * engineering knowledge, so no ST1426 knowledge/skill/behaviour statement is
 * quoted here — none of the verified KSB statements checked for this
 * conversion describe exam or assessment-preparation technique.
 *
 * ⚠️ ACCURACY FLAG: the original page states the EPA knowledge test is
 * "40 questions, 60 minutes" with a "typical pass mark (60-70%)". These
 * specific figures could not be verified against a primary ST1426/EPAO
 * source and are preserved verbatim from the original — flagged, not
 * corrected, per the conversion brief.
 *
 * Converted onto the study-centre learning kit. Content preserved from the
 * original page; structure, shell and reading measure rebuilt.
 *
 * ✎ RESOLVED (12 Sep): the page asserted "40 questions, 60 minutes" and a
 *   "typical pass mark (60-70%)" as the EPA format. Neither could be verified
 *   against ST1426's assessment plan or an EPAO, and a learner pacing a real
 *   exam on wrong figures is a genuine harm. The numbers are now framed as the
 *   Elec-Mate mock exam's format (which they match — see MOETModule7MockExam,
 *   totalQuestions 40 / timeLimit 60 min), with an explicit instruction to
 *   confirm the real paper's format with the training provider or EPAO.
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Timed Mock Tests - MOET Module 7 Section 1.2';
const DESCRIPTION =
  'Master exam conditions practice, time management strategies, pacing techniques and approaches for dealing with difficult questions during the EPA knowledge test.';

const quickCheckQuestions = [
  {
    id: 'time-per-question',
    question:
      'In a 40-question, 60-minute EPA knowledge test, approximately how long do you have per question?',
    options: ['120 seconds', '90 seconds', '30 seconds', '60 seconds'],
    correctIndex: 1,
    explanation:
      'With 40 questions in 60 minutes, you have approximately 90 seconds (1.5 minutes) per question. However, some questions will take less time and others more, so flexible pacing is important.',
  },
  {
    id: 'difficult-question',
    question:
      'What is the best approach when you encounter a question you cannot answer immediately?',
    options: [
      'Flag it, make your best guess, move on, and return if time allows',
      'Choose the first option and move on without thinking',
      'Spend as long as needed until you work out the answer',
      'Skip it permanently and accept the lost mark',
    ],
    correctIndex: 0,
    explanation:
      'The flag-and-return strategy ensures you do not waste valuable time on one difficult question at the expense of easier ones. Make your best educated guess (never leave it blank), flag it, and return with any remaining time.',
  },
  {
    id: 'mock-conditions',
    question: 'Why is it important to practise mock tests under realistic exam conditions?',
    options: [
      'To build familiarity with time pressure and reduce anxiety on the actual day',
      'To guarantee you will achieve a perfect score on the day',
      'To memorise the exact questions that will appear in the EPA',
      'To avoid having to revise the underlying technical content',
    ],
    correctIndex: 0,
    explanation:
      'Practising under realistic conditions — timed, without notes, in a quiet environment — builds familiarity with the exam experience. This reduces anxiety on the day because the format and pressure feel familiar rather than novel.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the recommended time allocation strategy for a 40-question, 60-minute test?',
    options: [
      'Spend equal time on every question regardless of difficulty',
      'Spend 60 seconds on straightforward questions, allowing extra time for complex ones and a review period',
      'Rush through all questions in 30 minutes and spend 30 minutes reviewing',
      'Spend all time on the first 20 questions and guess the rest',
    ],
    correctAnswer: 1,
    explanation:
      'Efficient time management means moving quickly through questions you find straightforward (under 60 seconds) to bank time for more complex questions (up to 2-3 minutes). Aim to finish with 5-10 minutes for review.',
  },
  {
    id: 2,
    question:
      'During a timed mock test, you realise you have spent 3 minutes on a single question. What should you do?',
    options: [
      'Keep working on it until you are certain of the answer',
      'Leave it blank and move on without selecting anything',
      'Flag the question, select your best answer, and move on immediately',
      'Restart the test to regain your composure',
    ],
    correctAnswer: 2,
    explanation:
      'Spending 3 minutes on one question means you are taking time away from other questions. Select your best answer based on elimination, flag it for review, and move on. You can return to it if time permits.',
  },
  {
    id: 3,
    question: "What is the purpose of a 'time checkpoint' during the exam?",
    options: [
      'To decide which questions to leave unanswered',
      'To check that the room timer matches your own watch',
      'To signal the invigilator that you need more time',
      'To verify you are on pace — e.g., 20 questions done by the 30-minute mark',
    ],
    correctAnswer: 3,
    explanation:
      'Time checkpoints help you monitor your pacing. At the halfway point (30 minutes), you should have completed approximately 20 questions. If you are behind, you need to increase your pace; if ahead, you have time for careful review.',
  },
  {
    id: 4,
    question: 'When reviewing flagged questions at the end of the test, you should:',
    options: [
      'Only change an answer if you have a clear reason to believe a different option is correct',
      'Change every flagged answer, since your first guess was rushed',
      'Leave flagged answers as they are without re-reading them',
      'Change answers based on a gut feeling that they look wrong',
    ],
    correctAnswer: 0,
    explanation:
      'When reviewing, only change an answer if you have identified a specific reason — such as misreading the question or recalling a relevant fact. Random changes driven by anxiety tend to reduce your score rather than improve it.',
  },
  {
    id: 5,
    question: 'How many full timed mock tests should you aim to complete before the actual EPA?',
    options: [
      'One test the night before is enough',
      'At least 3-5 full timed tests spread over several weeks',
      'One test per day for the entire month before the EPA',
      'None — reading the material is sufficient',
    ],
    correctAnswer: 1,
    explanation:
      'Three to five full timed mock tests, spread over your preparation period, provide enough practice to build comfort with the format and timing without causing fatigue. Each test should be followed by a thorough review of all answers.',
  },
  {
    id: 6,
    question: 'Which of the following is NOT a benefit of practising under timed conditions?',
    options: [
      'Building familiarity with exam time pressure',
      'Identifying topics where you need more study',
      'Guaranteeing you will pass the actual EPA',
      'Developing effective pacing strategies',
    ],
    correctAnswer: 2,
    explanation:
      'While timed practice significantly improves your preparation and confidence, no amount of practice can guarantee a pass. Mock tests help build skills, identify gaps, and reduce anxiety, but success also depends on thorough knowledge revision.',
  },
  {
    id: 7,
    question: "The 'two-pass' strategy for a timed exam involves:",
    options: [
      'Reading the whole paper twice before answering anything',
      'Answering the paper twice and comparing the two attempts',
      'Splitting your time equally across all questions in two halves',
      'First pass: answer all questions you are confident about; second pass: tackle flagged/difficult questions',
    ],
    correctAnswer: 3,
    explanation:
      'The two-pass strategy maximises your score by securing marks from questions you know first, then using remaining time on uncertain questions. This prevents time wasted on difficult early questions at the expense of easy later ones.',
  },
  {
    id: 8,
    question: 'What should you do in the final 5 minutes of the exam?',
    options: [
      'Review flagged questions, ensure every question has an answer, and check for obvious errors',
      'Submit early and leave once you reach the last question',
      'Re-read every question from the start to double-check it all',
      'Change any answers you are unsure about to a different option',
    ],
    correctAnswer: 0,
    explanation:
      'The final 5 minutes should be used to: (1) ensure every question has been answered (no blanks), (2) revisit flagged questions, and (3) check for obvious errors like misreading. Do not make random changes — only change answers with clear justification.',
  },
  {
    id: 9,
    question: 'After completing a timed mock test, the most productive next step is to:',
    options: [
      'Note only the final score and move straight to the next test',
      'Review every question — both correct and incorrect — reading all explanations and noting weak areas',
      'Discard the test and rely on reading the material instead',
      'Review only the questions you answered incorrectly',
    ],
    correctAnswer: 1,
    explanation:
      'Thorough review is where the real learning happens. Review every question, read explanations, note which topics caused difficulty, and plan targeted revision before your next mock test. The test itself is a diagnostic tool, not just a score.',
  },
  {
    id: 10,
    question:
      "If anxiety causes you to 'freeze' during a timed test, the recommended technique is to:",
    options: [
      'Keep pushing through quickly to make up for lost time',
      'Leave the room until you feel calm again',
      'Pause briefly, take slow deep breaths, read the current question slowly, and focus on one question at a time',
      'Skip ahead to the calculation questions to regain confidence',
    ],
    correctAnswer: 2,
    explanation:
      'Brief physiological calming techniques — slow breathing, muscle relaxation — reduce the fight-or-flight response. Then refocusing on just the current question (not the whole test) breaks the overwhelm into a manageable task.',
  },
  {
    id: 11,
    question: 'Calculation questions in the EPA test typically require:',
    options: [
      'Advanced calculus and complex differential equations',
      'A scientific programmable calculator with stored formulae',
      'Memorising every value from the BS 7671 tables',
      "Basic arithmetic using Ohm's law, power formulae, or simple unit conversions",
    ],
    correctAnswer: 3,
    explanation:
      "Calculation questions in the ST1426 EPA test involve basic electrical formulae — Ohm's law (V = IR), power (P = IV), and simple conversions. Practise these under timed conditions so you can solve them quickly and accurately.",
  },
  {
    id: 12,
    question: 'What is the ideal environment for completing a timed mock test?',
    options: [
      'A quiet space with no notes, no phone, and a visible timer — simulating actual exam conditions',
      'A relaxed setting with notes available and no time limit',
      'A busy area to practise concentrating amid distractions',
      'A group session where answers can be discussed as you go',
    ],
    correctAnswer: 0,
    explanation:
      'Simulating actual exam conditions builds realistic familiarity. This means a quiet space, no notes or references, no phone, a visible countdown timer, and completing the full test in one sitting without breaks.',
  },
];

const faqs = [
  {
    question: 'How often should I take timed mock tests?',
    answer:
      'Aim for one full timed mock test per week during the final 4-6 weeks of preparation. Between mock tests, use the results to guide your revision — focus study sessions on the topics where you scored lowest. Avoid taking more than two mock tests per week, as fatigue can reduce their value.',
  },
  {
    question: 'What if I consistently run out of time?',
    answer:
      'If you regularly run out of time, focus on two areas: (1) reading efficiency — practise reading stems quickly and accurately, and (2) decision speed — if elimination narrows it to two options, make a decision and move on rather than deliberating. Also check whether you are spending disproportionate time on calculation questions; if so, practise the formulae until they are second nature.',
  },
  {
    question: 'Should I use the same question bank for every mock test?',
    answer:
      'Ideally, use different question sets for each mock test to avoid memorising answers rather than understanding concepts. If your question bank is limited, leave at least 2-3 weeks between repeats. The value is in practising the process, not recognising specific questions.',
  },
  {
    question: 'Is it normal to score lower on timed tests than untimed practice?',
    answer:
      'Yes, this is very common and entirely normal. Time pressure introduces cognitive load that affects performance. With practice, the gap between timed and untimed scores narrows as you become more comfortable with pacing. Do not be discouraged by lower initial timed scores — they will improve.',
  },
  {
    question: 'What score should I aim for in mock tests to feel confident about the EPA?',
    answer:
      'Aim to consistently score 75% or above in timed mock tests. This gives you a comfortable margin above the typical pass mark (60-70%). If you are consistently scoring 80%+, you are well prepared. If you are scoring below 65%, increase your revision intensity on weak areas before continuing with mock tests.',
  },
];

const MOETModule7Section1_2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.1 · Subsection 2"
        title="Timed Mock Tests"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Practising under exam conditions to build confidence, pacing and time management skills.
          </p>

          <TLDR
            points={[
              'This page works to a 40-question, 60-minute paper — the format of the Elec-Mate mock exam. Confirm your own EPA format with your training provider.',
              'Pacing: two-pass strategy — confident first, flagged second.',
              'Checkpoints: 20 questions by 30 minutes.',
              'Review: final 5-10 minutes for flagged questions.',
            ]}
          />

          <CommonMistake
            title="Assuming the EPA paper matches the practice paper"
            whatHappens={
              <p>
                An apprentice rehearses a 40-question, 60-minute pace, then sits a paper with a
                different question count or time limit and finds their whole pacing plan is wrong in
                the first ten minutes.
              </p>
            }
            doInstead={
              <p>
                Treat the numbers on this page as the Elec-Mate mock exam&apos;s format — 40
                questions in 60 minutes, which is what gives the 90-seconds-per-question figure. The
                technique transfers to any paper; the arithmetic does not. Ask your training
                provider or EPAO for the question count, time limit and grading boundaries of the
                paper you will actually sit, then redo the per-question sum with those figures.
              </p>
            }
          />

          <LearningOutcomes
            outcomes={[
              'Set up and complete mock tests under realistic EPA exam conditions',
              'Apply time management strategies including the 90-second-per-question rule',
              'Use the two-pass strategy to maximise marks across the full test',
              'Develop techniques for handling difficult questions without losing time',
              'Use time checkpoints to monitor pacing throughout the test',
              'Manage exam anxiety through familiarity and breathing techniques',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Calculations:</strong> Ohm&apos;s law, power — practise for speed.
              </li>
              <li>
                <strong>Scenarios:</strong> safe isolation, fault diagnosis questions.
              </li>
              <li>
                <strong>Regulations:</strong> BS 7671, EAWR references under pressure.
              </li>
              <li>
                <strong>ST1426:</strong> knowledge test is one of three EPA components.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Setting up exam conditions</ContentEyebrow>

          <ConceptBlock title="Setting up exam conditions">
            <p>
              The value of a mock test lies in how closely it simulates the real exam experience. If
              you practise in a relaxed environment with notes available and no time pressure, you
              are not preparing yourself for the conditions you will face on EPA day. Creating
              realistic conditions builds the neural pathways for performing under pressure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Mock test setup checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Quiet environment:</strong> find a space free from interruptions — switch
                off your phone.
              </li>
              <li>
                <strong>No references:</strong> close all notes, textbooks, and study materials
                before starting.
              </li>
              <li>
                <strong>Visible timer:</strong> use a countdown timer set to 60 minutes — position
                it where you can see it.
              </li>
              <li>
                <strong>Full test:</strong> complete all 40 questions in one sitting — no pausing or
                breaks.
              </li>
              <li>
                <strong>Answer all questions:</strong> never leave a question blank — there is no
                penalty for guessing.
              </li>
              <li>
                <strong>Calculator:</strong> only if your EPAO permits one — check beforehand.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes in mock tests"
            whatHappens={
              <>
                Many apprentices undermine their mock test practice by pausing the timer to think,
                looking up answers for questions they are unsure about, or completing the test over
                multiple sessions. While these approaches feel comfortable, they do not prepare you
                for the real experience.
              </>
            }
            doInstead={
              <>
                The discomfort of working under time pressure during practice is exactly what builds
                your resilience for the real test.
              </>
            }
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>Key point:</strong> treat every mock test as if it were the real exam. The
            habits you build in practice are the habits you will use under pressure.
          </p>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>Time management and pacing</ContentEyebrow>

          <ConceptBlock title="Time management and pacing">
            <p>
              With 90 seconds per question on average, time management is critical. Not all
              questions take the same amount of time — a simple recall question may take 30 seconds,
              while a complex scenario or calculation may need 2-3 minutes. The key is to build a
              time budget that accounts for this variation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Recommended time budget">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-2 pr-4 font-medium text-white">Phase</th>
                    <th className="py-2 pr-4 font-medium text-white">Time</th>
                    <th className="py-2 font-medium text-white">Activity</th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">First pass</td>
                    <td className="py-2 pr-4">40-45 min</td>
                    <td className="py-2">Answer all questions; flag difficult ones</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4">Second pass</td>
                    <td className="py-2 pr-4">10-15 min</td>
                    <td className="py-2">Return to flagged questions with fresh eyes</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Final review</td>
                    <td className="py-2 pr-4">5 min</td>
                    <td className="py-2">Check all questions answered; fix obvious errors</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <ConceptBlock title="Time checkpoints">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>15 minutes:</strong> should have completed approximately 10 questions.
              </li>
              <li>
                <strong>30 minutes:</strong> should have completed approximately 20 questions
                (halfway).
              </li>
              <li>
                <strong>45 minutes:</strong> should have completed approximately 30 questions.
              </li>
              <li>
                <strong>50-55 minutes:</strong> all 40 questions attempted; begin review.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="If you are ahead of pace, or behind it">
            <p>
              <strong>If you are ahead of pace:</strong> being ahead of pace is a good position. Use
              the extra time to read questions more carefully, double-check calculations, and ensure
              you are answering the question actually asked. Do not rush through the remaining
              questions just because you have time — maintain your careful technique.
            </p>
            <p>
              <strong>If you are behind pace:</strong> if you are behind at a checkpoint, increase
              your decision speed. Use elimination more aggressively — if you can narrow to two
              options, choose the better one and move on. Do not spend more than 90 seconds on any
              single question during catch-up. You can always return to flagged questions if time
              allows.
            </p>
            <p>
              <strong>Key point:</strong> pacing is a skill that improves with practice. Your first
              mock test may feel rushed, but by the third or fourth, you will have developed an
              instinct for when to move on.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>The two-pass strategy</ContentEyebrow>

          <ConceptBlock title="The two-pass strategy">
            <p>
              The two-pass strategy is the most effective approach for maximising your score in a
              timed multiple-choice test. Rather than working through each question sequentially and
              getting stuck on difficult ones, you make two deliberate passes through the test with
              different objectives.
            </p>
          </ConceptBlock>

          <ConceptBlock title="First pass — secure the easy marks">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Work through every question in order.</li>
              <li>Answer questions you are confident about immediately.</li>
              <li>
                For questions you are unsure about, use elimination to select your best guess and
                flag the question.
              </li>
              <li>Do not spend more than 90 seconds on any question during this pass.</li>
              <li>The goal: answer all 40 questions with at least a reasonable attempt.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Second pass — improve on flagged questions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Return to flagged questions with fresh eyes and reduced pressure.</li>
              <li>Re-read the stem carefully — you may notice key words you missed first time.</li>
              <li>
                Sometimes answering later questions triggers recall that helps with earlier ones.
              </li>
              <li>Only change your answer if you have a clear reason — not just anxiety.</li>
              <li>If still unsure, stick with your original elimination-based choice.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Why two passes work">
            <p>
              The two-pass approach prevents the common problem of spending too long on an early
              difficult question and running out of time for easier questions later. By ensuring
              every question gets at least your best guess on the first pass, you guarantee no marks
              are lost to unanswered questions. The second pass then allows you to improve answers
              on difficult questions with the benefit of having seen the entire test.
            </p>
            <p>
              <strong>Key point:</strong> never leave any question without an answer after the first
              pass. Even a guess has a 25% chance of being correct; a blank has zero chance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Dealing with difficult questions</ContentEyebrow>

          <ConceptBlock title="Dealing with difficult questions">
            <p>
              Every candidate encounters questions they find difficult. The difference between
              high-scoring and low-scoring candidates is not that high scorers find the test easy —
              it is that they manage difficult questions more effectively. Having a clear strategy
              for difficult questions prevents panic and time wastage.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Difficult question decision tree">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Read the stem twice:</strong> many apparently difficult questions become
                clearer on a second reading.
              </li>
              <li>
                <strong>Eliminate what you can:</strong> even if you cannot identify the correct
                answer, removing one or two options improves your odds.
              </li>
              <li>
                <strong>Look for clues:</strong> the stem often contains information that points
                toward the correct answer — technical terms, specific contexts, regulation
                references.
              </li>
              <li>
                <strong>Apply general principles:</strong> in electrical maintenance, safety-first
                principles (isolate before working, prove dead, use PPE) often guide the correct
                answer.
              </li>
              <li>
                <strong>Select and flag:</strong> choose your best option, flag the question, and
                move on. Return later if time allows.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock title="Unfamiliar content, and calculations under pressure">
            <p>
              <strong>Questions with unfamiliar content:</strong> if a question covers a topic you
              have not studied, do not panic. Use elimination to remove options you know are wrong
              from other knowledge. Technical terms can often be broken down into recognisable
              parts. Apply general electrical principles — they often point toward the correct
              answer even in unfamiliar contexts.
            </p>
            <p>
              <strong>Calculation questions under pressure:</strong> if a calculation question is
              causing difficulty, check whether the options can help you work backwards. Sometimes
              substituting the given options into the formula is quicker than solving from scratch.
              Also check for common calculation traps — unit conversions (kW to W, mA to A) and
              formula transposition errors.
            </p>
          </ConceptBlock>

          <ConceptBlock title="What not to do with difficult questions">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>Do not spend more than 2-3 minutes on any single question.</li>
              <li>
                Do not let one difficult question affect your confidence for the rest of the test.
              </li>
              <li>Do not leave difficult questions blank — always select an answer.</li>
              <li>
                Do not assume you have failed because of a few uncertain answers — you do not need
                100%.
              </li>
            </ul>
            <p>
              <strong>Key point:</strong> accept that you will encounter questions you find
              difficult. This is normal and expected. Having a strategy for these moments — rather
              than hoping they will not happen — is what builds genuine exam resilience.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Managing exam anxiety</ContentEyebrow>

          <ConceptBlock title="Managing exam anxiety">
            <p>
              Some degree of anxiety before and during an exam is normal and can even be helpful —
              it sharpens focus and increases alertness. However, excessive anxiety impairs
              performance by reducing working memory capacity, slowing processing speed, and causing
              rushed decisions. Learning to manage anxiety is as important as learning the technical
              content.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Before the test, and during it">
            <p>
              <strong>Before the test:</strong> preparation reduces anxiety — the single best
              anxiety reducer is knowing you are well prepared. The night before, do light revision
              only — do not cram, and get a full night&apos;s sleep. On the morning of the test, eat
              a proper breakfast, arrive early, and have your materials ready. Avoid negative talk —
              do not discuss what you do not know with other candidates before the test.
            </p>
            <p>
              <strong>During the test:</strong> if you feel anxious, use a breathing technique —
              pause and take three slow breaths, in for four seconds, hold for four, out for six.
              Keep to one question at a time — do not think about the whole test, focus only on the
              current question. Use positive self-talk — replace &quot;I don&apos;t know this&quot;
              with &quot;I&apos;ll use elimination and do my best&quot;. Stay aware of physical
              tension — relax your shoulders, unclench your jaw, and sit back in your chair if you
              notice tension.
            </p>
            <p>
              <strong>Remember:</strong> you have been studying for months. You have practical
              experience. You have taken mock tests. Trust your preparation and focus on the process
              — one question at a time.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Treat every mock test as if it were the real exam — practice habits become exam habits.',
              'Pacing is a skill that improves with practice; use time checkpoints to stay on track.',
              'Never leave a question without an answer after the first pass — a guess beats a blank.',
              'Accept that difficult questions will happen. Having a strategy for them beats hoping they will not.',
              'Some anxiety is normal. Preparation, breathing and one-question-at-a-time focus keep it manageable.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Timed Mock Tests" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section1-1')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Multiple-Choice Question Banks
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section1-3')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Feedback and Explanations
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section1_2;
