/**
 * MOET · Module 7 · Section 1 · Subsection 5 — Exam Techniques and Strategies
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option. This section of Module 7 covers technique for the
 * End-Point Assessment knowledge test rather than a specific piece of
 * engineering knowledge, so no ST1426 knowledge/skill/behaviour statement is
 * quoted here — none of the verified KSB statements checked for this
 * conversion describe exam or assessment-preparation technique.
 *
 * The original page's "next" button pointed back to the section hub because
 * Module 7 Section 2 had not been written yet. Section 2 (2.1 Safe Isolation
 * and Testing Routines) now exists in the same module, so the next button
 * below points there instead, matching how every other section-to-section
 * boundary in this course is handled (a "next subsection", not a dead end).
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
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Exam Techniques and Strategies - MOET Module 7 Section 1.5';
const DESCRIPTION =
  'Comprehensive exam techniques covering reading all options, first instinct, process of elimination, managing anxiety, physical preparation and on-the-day routine for the EPA knowledge test.';

const quickCheckQuestions = [
  {
    id: 'read-all-options',
    question: 'Why is it important to read ALL options before selecting your answer?',
    options: [
      'The first option might seem correct but a later option may be more complete or accurate',
      'Reading every option guarantees you can never run short of time in the exam',
      'The exam marks you down automatically if you do not read all four options',
      'The last option listed is statistically the most likely to be correct',
    ],
    correctIndex: 0,
    explanation:
      "Reading all options is essential because 'best answer' questions may have a partially correct early option alongside a more complete or accurate later option. Selecting the first plausible answer without reading all options is one of the most common causes of lost marks.",
  },
  {
    id: 'physical-preparation',
    question: 'Which of the following is the MOST important physical preparation for exam day?',
    options: [
      'Getting adequate sleep the night before and eating a proper breakfast',
      'Drinking several strong coffees to stay alert',
      'Staying up late for a final cramming session',
      'Skipping breakfast to avoid feeling sluggish',
    ],
    correctIndex: 0,
    explanation:
      "Cognitive performance is significantly affected by sleep quality and nutrition. A full night's sleep and a proper breakfast ensure your brain has the energy and rest needed for sustained concentration. Caffeine in excess can increase anxiety and reduce focus.",
  },
  {
    id: 'first-instinct',
    question: "Research on the 'first instinct fallacy' shows that:",
    options: [
      'Carefully considered changes are more often correct than the original answer',
      'Your first answer is always correct and should never be changed',
      'Changing answers always reduces your final score',
      'The first option listed is statistically the most likely answer',
    ],
    correctIndex: 0,
    explanation:
      'The belief that your first instinct is always right is a well-documented cognitive bias. Research shows that when candidates change answers based on careful reconsideration (not anxiety), the change is more likely to be from wrong to right than right to wrong.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Before looking at the answer options, you should:',
    options: [
      'Read the options first to see what topics are covered',
      'Try to predict the correct answer based on the stem alone',
      'Skip the stem and scan for familiar words in the options',
      'Close your eyes and guess',
    ],
    correctAnswer: 1,
    explanation:
      "Predicting the answer before looking at options reduces the influence of plausible distractors. If your predicted answer matches an option, you can select it with high confidence. This technique is called 'cover the options' and is used by top-performing candidates.",
  },
  {
    id: 2,
    question: 'The process of elimination is most useful when:',
    options: [
      'You already know the answer with complete certainty before reading the options',
      'A question asks for a single numerical value from a calculation',
      'You are uncertain and need to narrow down the options systematically',
      'You have run out of time and must guess on every remaining question',
    ],
    correctAnswer: 2,
    explanation:
      'Elimination is most powerful when you are uncertain. By removing options you know are wrong, you reduce the field and increase your probability of selecting correctly. Even eliminating one of four options raises your chance from 25% to 33%.',
  },
  {
    id: 3,
    question: 'On the morning of the EPA knowledge test, you should:',
    options: [
      'Skip breakfast so you are not distracted by digestion',
      'Cram as much new material as possible before you leave',
      'Arrive at the last minute to minimise waiting anxiety',
      'Eat well, do light revision of key facts only, and arrive with time to settle',
    ],
    correctAnswer: 3,
    explanation:
      'The morning of the exam is not the time for new learning. Eat a proper meal, glance at key revision notes for confidence, and arrive early enough to settle without rushing. Your preparation over previous weeks is what will carry you through.',
  },
  {
    id: 4,
    question: "If you experience a 'mind blank' during the exam, the recommended approach is to:",
    options: [
      'Move to the next question, and return later — a change of focus often triggers recall',
      'Stare at the question until the answer eventually comes to you',
      'Guess randomly on every remaining question and finish early',
      'Leave the question blank and tell the invigilator you are stuck',
    ],
    correctAnswer: 0,
    explanation:
      'Mind blanks are temporary and common under exam stress. Moving to a different question changes your cognitive focus and often triggers the recall you need for the earlier question. The two-pass strategy naturally accommodates this.',
  },
  {
    id: 5,
    question: "Absolute words like 'always' and 'never' in answer options are often indicators of:",
    options: [
      'The correct answer, because they show the writer is confident',
      'A distractor, because most rules in electrical maintenance have exceptions',
      'A question that should be left blank and skipped',
      'A calculation question requiring a numerical answer',
    ],
    correctAnswer: 1,
    explanation:
      "In electrical maintenance, very few rules are absolute. Statements containing 'always' or 'never' are frequently distractors because exceptions almost always exist. Options with qualifiers like 'usually', 'in most cases', or 'generally' are more often correct.",
  },
  {
    id: 6,
    question: 'How much sleep is recommended the night before the EPA?',
    options: [
      '4-5 hours to allow time for late revision',
      'As much as possible — 12 hours or more',
      '7-9 hours of quality sleep',
      'Sleep does not affect exam performance',
    ],
    correctAnswer: 2,
    explanation:
      'Research consistently shows that 7-9 hours of sleep is optimal for cognitive performance. Sleep consolidates learning and restores working memory capacity. Both too little and excessive sleep can impair performance.',
  },
  {
    id: 7,
    question: 'When two options appear very similar, it usually means:',
    options: [
      'Both options are wrong and the answer lies elsewhere',
      'The question is faulty and should be reported',
      'You should always pick the longer of the two options',
      'The correct answer is likely one of these two — the difference between them is the key detail',
    ],
    correctAnswer: 3,
    explanation:
      'When two options are very similar, the exam writer is testing whether you can distinguish between related concepts. Focus carefully on the specific difference between the two similar options — this difference is usually the key to selecting correctly.',
  },
  {
    id: 8,
    question: 'What items should you bring to the EPA knowledge test?',
    options: [
      'Photo ID, a pen (if paper-based), permitted calculator, and water',
      'Your revision notes and textbook to consult during the test',
      'Your mobile phone, kept on silent, in case you need to check a fact',
      'A printed copy of last year past paper to refer to if you get stuck',
    ],
    correctAnswer: 0,
    explanation:
      'Check with your EPAO for specific requirements, but typically you need: photo ID (driving licence or passport), a pen if the test is paper-based, a permitted calculator if allowed, and water. Phones and notes are not permitted in the test room.',
  },
  {
    id: 9,
    question: 'The recommended breathing technique for managing exam anxiety is:',
    options: [
      'Rapid shallow breathing to increase alertness',
      'Slow, controlled breathing — inhale for 4 seconds, hold for 4, exhale for 6',
      'Holding your breath for as long as possible to refocus',
      'Breathing only through the mouth to take in more air',
    ],
    correctAnswer: 1,
    explanation:
      'Slow, controlled breathing activates the parasympathetic nervous system, which counteracts the fight-or-flight response. The 4-4-6 pattern (inhale 4, hold 4, exhale 6) is particularly effective because the extended exhale promotes calm.',
  },
  {
    id: 10,
    question: 'If you finish the exam with 10 minutes remaining, you should:',
    options: [
      'Submit immediately to avoid second-guessing yourself',
      'Change several answers at random to feel productive',
      'Use the time to review all answers, checking for misread questions and unanswered items',
      'Leave the room early since the test is complete',
    ],
    correctAnswer: 2,
    explanation:
      'Extra time is valuable. Review all answers checking for: unanswered questions, misread stems (especially negative questions), and flagged items. Only change answers where you have a clear reason. This review time often catches 1-3 errors.',
  },
  {
    id: 11,
    question: 'On-the-day routine should include arriving at the test centre:',
    options: [
      'Exactly on time so you do not have to wait around',
      'A few minutes late to avoid pre-exam nerves',
      'Over an hour early to do final cramming in the car park',
      '15-20 minutes early to allow time to settle and reduce rushing anxiety',
    ],
    correctAnswer: 3,
    explanation:
      'Arriving 15-20 minutes early gives you time to find the room, complete any registration, use the facilities, and settle without rushing. Arriving too early can increase anxiety from waiting; arriving late creates panic. 15-20 minutes is the ideal balance.',
  },
  {
    id: 12,
    question: 'After completing the EPA knowledge test, you should:',
    options: [
      'Take a break, avoid analysing individual questions, and focus on preparing for the next EPA component',
      'Immediately compare every answer with other candidates',
      'Try to recall and re-mark each question to estimate your score',
      'Worry about questions you found difficult until results arrive',
    ],
    correctAnswer: 0,
    explanation:
      'Post-exam analysis with other candidates typically increases anxiety rather than helping. You cannot change your answers, and different memories of questions cause confusion. Instead, take a break and redirect your energy toward the remaining EPA components.',
  },
];

const faqs = [
  {
    question: 'What if I have a diagnosed learning difficulty such as dyslexia?',
    answer:
      'If you have a diagnosed learning difficulty, you may be entitled to reasonable adjustments such as extra time (typically 25%), a reader, or a separate room. Discuss this with your training provider well before the EPA date — adjustments must be agreed with the EPAO in advance and usually require supporting evidence from an educational psychologist or specialist assessor.',
  },
  {
    question: 'Can I take breaks during the knowledge test?',
    answer:
      'Typically, no breaks are permitted during the 60-minute knowledge test. If you have a medical condition that requires breaks, this must be arranged as a reasonable adjustment with the EPAO before the test date. Otherwise, use the facilities before the test begins.',
  },
  {
    question: 'Is it true that longer answer options are more likely to be correct?',
    answer:
      'This is a common exam myth. While some poorly written questions may have longer correct answers (because the correct answer needs more qualifying detail), well-written EPA questions do not follow this pattern. Do not use answer length as a strategy — base your selection on content and reasoning.',
  },
  {
    question: 'What happens if I feel unwell on the day of the EPA?',
    answer:
      'If you are genuinely unwell on the day, contact your training provider and the EPAO as soon as possible. You may be able to defer to a later date without penalty, provided you have supporting evidence (e.g., a medical note). Do not attempt the test while significantly unwell, as your performance will be impaired and a resit may be harder to arrange than a deferral.',
  },
  {
    question: 'How long after the test do I receive my results?',
    answer:
      'Results timelines vary by EPAO. Some provide results on the day (for computer-based tests with automatic marking). Others take 2-4 weeks for moderation and quality assurance. Your training provider will advise you on the expected timeline. The knowledge test result is combined with the practical observation and portfolio interview to determine your overall EPA grade.',
  },
];

const MOETModule7Section1_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 7 · Section 7.1 · Subsection 5"
        title="Exam Techniques and Strategies"
        backTo="/study-centre/apprentice/m-o-e-t-module7-section1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Proven techniques for maximising your score on the EPA knowledge test.
          </p>

          <TLDR
            points={[
              'Read all options: never select the first plausible answer.',
              'Eliminate: remove wrong options to improve odds.',
              "Absolutes: 'always/never' options are often distractors.",
              'Prepare: sleep, eat, arrive early, breathe slowly.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the technique of reading all options before selecting an answer',
              'Understand the first instinct fallacy and when to change answers',
              'Use the process of elimination to improve accuracy on uncertain questions',
              'Manage exam anxiety through breathing techniques and positive self-talk',
              'Prepare physically for the exam with proper sleep, nutrition and routine',
              'Execute an effective on-the-day routine from arrival to submission',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock title="Electrical maintenance context">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Safety first:</strong> when unsure, the safety answer is often correct.
              </li>
              <li>
                <strong>Regulations:</strong> know BS 7671, EAWR, GS38 key points.
              </li>
              <li>
                <strong>Practical link:</strong> relate questions to your workplace experience.
              </li>
              <li>
                <strong>ST1426:</strong> knowledge test contributes to overall EPA grade.
              </li>
            </ul>
          </ConceptBlock>

          <ContentEyebrow>Reading all options and the cover technique</ContentEyebrow>

          <ConceptBlock title="Reading all options and the cover technique">
            <p>
              One of the most common mistakes in MCQ tests is selecting the first option that looks
              correct without reading all alternatives. This is particularly dangerous with
              &quot;best answer&quot; questions, where multiple options may be partially correct but
              one is more complete or more accurate.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The cover technique">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Read the stem:</strong> fully understand what is being asked.
              </li>
              <li>
                <strong>Cover the options:</strong> mentally or physically cover the answer choices.
              </li>
              <li>
                <strong>Predict your answer:</strong> think about what the correct answer should be.
              </li>
              <li>
                <strong>Uncover and read all options:</strong> compare each option against your
                prediction.
              </li>
              <li>
                <strong>Select the best match:</strong> choose the option closest to your predicted
                answer.
              </li>
            </ol>
          </ConceptBlock>

          <CommonMistake
            title="Watch out for"
            whatHappens={
              <>
                Option A may be true but incomplete. Option C may include the same information as A
                plus additional correct detail. If you selected A without reading C, you would miss
                the better answer. This is particularly common in questions about safety procedures,
                where one option describes part of the process and another describes the complete
                process.
              </>
            }
            doInstead={
              <>
                Always read every option. The 10 seconds it takes to read all four options can
                prevent the loss of marks that took weeks of study to earn.
              </>
            }
          />

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ContentEyebrow>First instinct and changing answers</ContentEyebrow>

          <ConceptBlock title="First instinct and changing answers">
            <p>
              The &quot;first instinct fallacy&quot; is one of the most persistent myths in exam
              taking. Many candidates believe their first answer is always correct and are reluctant
              to change answers. Research contradicts this — studies show that carefully considered
              changes are more often from wrong to right than the reverse.
            </p>
          </ConceptBlock>

          <ConceptBlock title="When to change an answer">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Change:</strong> you misread the question and now realise what it actually
                asks.
              </li>
              <li>
                <strong>Change:</strong> you recalled a specific fact or principle that makes a
                different option clearly correct.
              </li>
              <li>
                <strong>Change:</strong> another question triggered knowledge relevant to this one.
              </li>
              <li>
                <strong>Do not change:</strong> you are simply anxious about your selection.
              </li>
              <li>
                <strong>Do not change:</strong> you cannot articulate a specific reason for the
                change.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="The rule of reason">
            <p>
              Only change an answer if you can state a specific reason. &quot;I now remember that
              Table 41.1 (Regulation 411.3.2) gives 0.2 seconds for a 230&nbsp;V TT final circuit,
              not 0.4 seconds&quot; is a valid reason. &quot;I just feel like another option might
              be better&quot; is not. This simple rule prevents anxiety-driven changes while
              allowing knowledge-driven corrections.
            </p>
            <p>
              <strong>Key point:</strong> trust your reasoning, not your anxiety. If you have a
              clear reason to change, change with confidence. If you do not, keep your original
              answer.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ContentEyebrow>Managing anxiety and building confidence</ContentEyebrow>

          <ConceptBlock title="Managing anxiety and building confidence">
            <p>
              Exam anxiety is a physiological response — your body&apos;s fight-or-flight system
              activating in response to perceived threat. While you cannot eliminate this response
              entirely, you can manage it effectively using techniques that have been proven to work
              under pressure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The 4-4-6 breathing technique">
            <ol className="list-decimal space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Inhale slowly</strong> through your nose for 4 seconds.
              </li>
              <li>
                <strong>Hold</strong> for 4 seconds.
              </li>
              <li>
                <strong>Exhale slowly</strong> through your mouth for 6 seconds.
              </li>
              <li>
                <strong>Repeat</strong> 3-4 times until you feel calmer.
              </li>
            </ol>
            <p>
              The extended exhale activates the parasympathetic nervous system, counteracting the
              stress response. Practise this technique before mock tests so it becomes automatic
              under pressure.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Cognitive reframing, and physical techniques">
            <p>
              <strong>Cognitive reframing:</strong> replace &quot;I&apos;m going to fail&quot; with
              &quot;I&apos;ve prepared well&quot;. Replace &quot;I don&apos;t know anything&quot;
              with &quot;I know many topics well&quot;. Replace &quot;This is impossible&quot; with
              &quot;I&apos;ll take it one question at a time&quot;. Replace &quot;Everyone else
              knows more&quot; with &quot;I&apos;m ready for this&quot;.
            </p>
            <p>
              <strong>Physical techniques:</strong> progressive muscle relaxation — tense and
              release shoulder muscles. Ground yourself — feel your feet on the floor, hands on the
              desk. Unclench your jaw and relax your face. Sit upright — posture affects confidence
              and breathing.
            </p>
            <p>
              <strong>Remember:</strong> some nervousness is normal and even helpful — it sharpens
              your focus. The goal is not to eliminate all anxiety but to keep it at a manageable
              level where it helps rather than hinders.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ContentEyebrow>Physical preparation and on-the-day routine</ContentEyebrow>

          <ConceptBlock title="Physical preparation and on-the-day routine">
            <p>
              Your brain is a physical organ that requires proper fuel, rest and conditions to
              perform at its best. Physical preparation for the exam is not an afterthought — it is
              as important as your knowledge revision. Candidates who are well-rested and properly
              nourished consistently outperform those who crammed all night on an empty stomach.
            </p>
          </ConceptBlock>

          <ConceptBlock title="The week before">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Establish sleep routine:</strong> go to bed and wake at consistent times.
              </li>
              <li>
                <strong>Light revision only:</strong> review key facts, do not learn new material.
              </li>
              <li>
                <strong>Prepare materials:</strong> check ID, gather permitted items, plan your
                route.
              </li>
              <li>
                <strong>Physical activity:</strong> moderate exercise reduces anxiety and improves
                sleep.
              </li>
              <li>
                <strong>Reduce caffeine:</strong> avoid excessive coffee/energy drinks that disrupt
                sleep.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="On-the-day checklist">
            <ul className="list-disc space-y-1.5 pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Morning:</strong> wake with plenty of time — no rushing.
              </li>
              <li>
                <strong>Breakfast:</strong> protein and complex carbohydrates — eggs, porridge,
                toast.
              </li>
              <li>
                <strong>Hydrate:</strong> drink water — dehydration impairs concentration.
              </li>
              <li>
                <strong>Bring:</strong> photo ID, pen, permitted calculator, water, light snack.
              </li>
              <li>
                <strong>Arrive:</strong> 15-20 minutes early — use facilities, settle, breathe.
              </li>
              <li>
                <strong>Avoid:</strong> do not discuss the exam with other candidates beforehand.
              </li>
              <li>
                <strong>Final check:</strong> phone off, notes away, timer visible (if provided).
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="The night before"
            whatHappens={
              <>
                Cramming until midnight leaves you tired, anxious and less able to recall
                information under pressure. Your brain needs sleep to consolidate the knowledge you
                have already learned.
              </>
            }
            doInstead={
              <>
                A brief glance at your revision summary (30 minutes maximum) followed by relaxation
                and early bed is the optimal approach.
              </>
            }
          />

          <p className="text-[14.5px] leading-relaxed text-white">
            <strong>Key point:</strong> treat the exam like a work task that requires you to be at
            your best. A well-rested, well-fed, prepared candidate will always outperform a tired,
            hungry, flustered one — even if the flustered one spent more hours studying.
          </p>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Always read every option before selecting — a "best answer" question can hide a more complete option later in the list.',
              'Change an answer only when you can state a specific reason. Anxiety alone is not a reason.',
              'The 4-4-6 breathing technique (inhale 4, hold 4, exhale 6) counteracts exam stress in the moment.',
              'Physical preparation — sleep, food, hydration, an unhurried arrival — is as important as knowledge revision.',
              'Do not cram the night before. A brief review followed by proper sleep beats a late session every time.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz title="Test Your Knowledge — Exam Techniques" questions={quizQuestions} />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section1-4')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous subsection
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Identifying Knowledge Gaps
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module7-section2-1')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Safe Isolation and Testing Routines
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule7Section1_5;
