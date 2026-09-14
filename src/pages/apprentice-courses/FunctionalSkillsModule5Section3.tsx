/**
 * Functional Skills · Module 5 · Section 3 — Study techniques and exam skills
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 *
 * 🔴 THE TRAP ON THIS PAGE, AND HOW IT WAS HANDLED: study-skills content is
 * the easiest material in the whole course to fill with generic revision-guide
 * commentary — "make a timetable", "find a quiet space", "get enough sleep".
 * The old page was built almost entirely from that material: eight sections of
 * prose about spaced repetition, the Pomodoro technique, breathing exercises
 * and SMART goals, with three worked calculations across the whole page and
 * nothing that touched an actual Functional Skills question. None of that
 * teaches a learner how to sit THIS exam. This pass replaces it with eight
 * sections built the other way round — a technique applied directly to real,
 * multi-step trade-contextualised material (cable takeoffs, timesheets, VAT
 * invoices, a site safety bulletin, a returns policy) — because reading a
 * question correctly, spotting a distractor answer, deciding calculator vs
 * mental, estimating first, showing method, allocating time by marks, scanning
 * a longer text for the answer, and checking a result by a second route are
 * skills a learner can only acquire by doing them, not by being told they
 * matter. 8 ConceptBlocks (the page cap), 11 WorkedExamples, 10 TryIts.
 *
 * 🔴 THE AWARDING BODY IS NOT NAMED, AND NO EXAM FORMAT IS STATED AS FACT.
 * Paper length, timing, and the calculator/non-calculator split all differ
 * between awarding bodies, and none has been confirmed for this cohort.
 * Section 06 (time management) deliberately teaches time allocation BY MARKS
 * AVAILABLE rather than by any stated number of minutes, and says explicitly
 * that format details vary and must be checked with the learner's own
 * provider — the same line closes the TLDR and appears again in the FAQ. No
 * specific exam duration, paper count or pass mark appears anywhere on this
 * page.
 *
 * Quiz bank (all 8 questions, options, correctAnswer indices, explanations)
 * is carried over verbatim — none of the eight questions asserts a specific
 * exam format as fact, and question 7's wrong option about "awarding bodies"
 * is a distractor, not a claim this page makes. All three InlineChecks are
 * also carried over verbatim (spaced repetition, the Pomodoro interval, and
 * the past-paper three-pass strategy) with m5s3- prefixed ids added, since
 * none of them had one — this page did not invent, remove or reword any of
 * their question or answer text.
 *
 * No regulation number, competent person scheme, or commercial product is
 * named anywhere on this page — it is exam technique, not BS 7671 territory.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  Scenario,
  ContentEyebrow,
  SectionRule,
  WorkedExample,
  TryIt,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Study Techniques and Exam Skills - Functional Skills Module 5.3';
const DESCRIPTION =
  'Functional Skills exam technique for electricians: reading a multi-step question correctly, spotting a distractor answer, calculator vs mental, estimating first, showing method, managing time by marks, scanning a longer text, and checking your answer by a second route.';

const quizQuestions = [
  {
    id: 1,
    question: "What is 'spaced repetition' in the context of revision?",
    options: [
      'Studying the same topic for an entire day without breaks',
      'Reviewing material at increasing intervals over time to improve long-term memory',
      'Reading your notes once the night before the exam',
      'Spacing out your desk and chair for comfort while studying',
    ],
    correctAnswer: 1,
    explanation:
      'Spaced repetition involves reviewing material at gradually increasing intervals (e.g. after 1 day, then 3 days, then 1 week, then 2 weeks). This takes advantage of how memory consolidation works and is far more effective than cramming everything into one session.',
  },
  {
    id: 2,
    question: 'Which breathing technique can help reduce exam anxiety quickly?',
    options: [
      'Only breathing through your mouth throughout the exam',
      'Breathing as fast as possible to increase oxygen',
      '4-7-8 breathing: inhale for 4, hold for 7, exhale for 8 counts',
      'Holding your breath for 60 seconds',
    ],
    correctAnswer: 2,
    explanation:
      'The 4-7-8 technique (inhale for 4 counts, hold for 7, exhale for 8) activates your parasympathetic nervous system, which calms your body and reduces anxiety. It can be done quietly at your desk without anyone noticing.',
  },
  {
    id: 3,
    question: 'What is the recommended length of a single Pomodoro study session?',
    options: ['45 minutes', '10 minutes', '60 minutes', '25 minutes'],
    correctAnswer: 3,
    explanation:
      'A standard Pomodoro session is 25 minutes of focused study followed by a 5-minute break. After four Pomodoros, you take a longer 15-30 minute break. This technique prevents mental fatigue and maintains concentration.',
  },
  {
    id: 4,
    question: 'When using past papers for revision, what should you do after marking your answers?',
    options: [
      'Review every wrong answer, understand the mistake, and revise that topic before trying again',
      'File the paper away and move straight on to the next past paper',
      'Only count your score and ignore which questions you got wrong',
      'Repeat the whole paper immediately without revising any topics first',
    ],
    correctAnswer: 0,
    explanation:
      'The real learning happens when you review your mistakes. Understand why you got each answer wrong, revise that specific topic, and then try similar questions again to confirm you have improved. This feedback loop is what transforms past papers from a test into a learning tool.',
  },
  {
    id: 5,
    question: "What does the mnemonic 'Very Icy Roads' help you remember?",
    options: [
      'The order of cable colours',
      "Ohm's Law formula: V = I x R",
      'The hierarchy of PPE requirements',
      'The sequence of testing procedures',
    ],
    correctAnswer: 1,
    explanation:
      "Very Icy Roads = V = I x R (Ohm's Law). The first letter of each word matches the formula components: Voltage = Current x Resistance. Mnemonics like this create memorable associations that make formulae easier to recall under exam pressure.",
  },
  {
    id: 6,
    question: "What is 'active recall' as a study technique?",
    options: [
      'Re-reading your notes several times until they feel familiar',
      'Highlighting the most important points in your textbook',
      'Testing yourself by trying to remember information without looking at your notes',
      'Listening to a recording of the topic while doing other tasks',
    ],
    correctAnswer: 2,
    explanation:
      'Active recall involves deliberately trying to retrieve information from memory without looking at your notes. This strengthens neural pathways and is far more effective than passive re-reading. Flashcards, practice questions, and covering your notes while reciting key points are all forms of active recall.',
  },
  {
    id: 7,
    question: 'Why should you create a study timetable that includes rest days?',
    options: [
      'Because awarding bodies require a fixed number of rest days to be recorded',
      'Because studying every single day guarantees you will pass the exam',
      'Because rest days are when you should catch up on missed coursework',
      'Because your brain consolidates memories during rest, preventing burnout and maintaining motivation',
    ],
    correctAnswer: 3,
    explanation:
      'Rest is essential for memory consolidation — your brain processes and stores information during downtime and sleep. Without rest days, you risk burnout, reduced concentration, and diminishing returns on your study time. A sustainable plan with built-in rest will always outperform unsustainable cramming.',
  },
  {
    id: 8,
    question: 'What is the most effective way to use the last 10 minutes of an exam?',
    options: [
      'Check your answers, correct obvious errors, and ensure you have not left any questions blank',
      'Start an entirely new question that you had not planned to attempt',
      'Put your pen down early to stay calm and rest before the end',
      'Rewrite all your answers neatly to improve your handwriting',
    ],
    correctAnswer: 0,
    explanation:
      'The final minutes should be used for checking. Go back to skipped questions, verify calculations, check units and decimal points, proofread writing for SPaG errors, and ensure every question has been attempted. These quick checks can easily recover 5-10 marks.',
  },
];

const FunctionalSkillsModule5Section3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 3"
        title="Study techniques and exam skills"
        backTo="/study-centre/apprentice/functional-skills/module5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default, to match the rest of the course — this
            page carries multi-step calculations and source-text extracts that
            wrap badly at the narrower measure. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Knowing the maths and knowing the exam are two different skills, and the second one is
            rarely taught directly. A learner who can genuinely do percentages can still lose marks
            to a question they misread, a distractor they picked without checking, or a calculation
            they never wrote down because it was "obvious". This section is not about revision
            timetables or how to feel calm — it is eight techniques for handling the actual
            questions in front of you, each one practised on real trade material rather than
            described in the abstract.
          </p>

          <LearningOutcomes
            outcomes={[
              'Read a multi-step question and identify exactly what is being asked, and with which figures, before starting to calculate.',
              'Recognise a distractor answer option built from an intermediate calculation, and avoid selecting it just because it appears in the working.',
              'Decide quickly whether a calculation needs a calculator or can be done mentally, and apply the right method either way.',
              'Estimate a calculation before doing it precisely, so a place-value or decimal-point error produces an answer that obviously does not fit.',
              'Set out full working on a multi-step calculation so that correct method still earns credit even when an earlier figure was wrong.',
              'Allocate your time and effort across a paper in proportion to the marks a question carries, and have a fixed rule for what to do when stuck.',
              'Skim a longer source text for its structure, then scan for the specific sentence that answers a given question, rather than reading it end to end.',
              'Check a numerical answer using a genuinely different method to the one that produced it, and plan a written response by audience and purpose before writing a word.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Comfortable with the underlying arithmetic',
                gist: 'This page teaches exam technique, not new maths. Percentages, decimals and simple multi-step arithmetic should already be familiar from earlier Functional Skills modules.',
              },
              {
                term: 'Module 5, Sections 1-2',
                gist: 'The revision groundwork and practice-paper habits covered earlier feed directly into the technique on this page — this section assumes you are already sitting down with real questions, not starting from nothing.',
              },
            ]}
          />

          <TLDR
            points={[
              'A question is asking for one specific thing, usually stated in its final sentence — read to the end before you start calculating.',
              'A wrong multiple-choice option is often a real, correctly-calculated intermediate value from the working, not a random number. If an option answers an earlier step rather than the actual question, it is a distractor.',
              'Round numbers, halves, quarters and multiples of 10% are worth doing mentally. Several chained operations on an uneven decimal are worth a calculator — deciding takes two seconds and the wrong call costs you far more.',
              'A rough estimate done first turns a slipped decimal point into an answer that obviously does not fit, rather than one that looks plausible and gets written down.',
              'Marks are available for correct method at each step, even when an earlier figure in a multi-step calculation was wrong — a blank space with only a final answer cannot earn any of them.',
              'Time is best spent in proportion to the marks a question carries, not equally across every question — and a stuck question gets marked and returned to, not fought.',
              'A longer source text is read for structure first, then scanned for the key words in the question — not read start to finish hoping to spot the answer.',
              'Redoing a calculation the same way checks that you can repeat a mistake, not that there was not one. Check by a genuinely different method instead.',
              'Paper length, timing and the calculator/non-calculator split all vary between providers — this page never states one as fact. Check the specific format with your own tutor.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Reading the question before the numbers</ContentEyebrow>

          <ConceptBlock
            title="Extract the question before you extract a number"
            onSite="The step people skip costs about fifteen seconds and saves an entire wrong answer: say what is actually being asked, in one sentence, before you pick up a pen."
          >
            <p>
              A Functional Skills-style maths question dresses up ordinary arithmetic in a paragraph
              of scenario, and the scenario is not decoration — it decides which numbers matter and
              which are just describing the goods. The technique is to read the question twice. The
              first read is for what quantity is actually wanted, and in what unit. The second read
              is for which of the numbers given are needed to get there, and which are scenery. On a
              multi-step problem, the actual instruction — "what is his net spend", "how much
              change", "what is the difference" — very often sits in the last sentence, which means
              starting to calculate from the first number you see answers a different,
              easier-sounding question than the one that was asked.
            </p>
            <p>
              This matters more on a multi-step word problem than anywhere else, because each extra
              step is a fresh place to drift off the actual question without noticing. Restating the
              question in your own words, before touching a single figure, is the check that catches
              it.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="An apprentice buys 4 rolls of 25 m twin-and-earth cable at £34.60 a roll, and a box of 100 cable clips at £5.80. He uses 3 of the 4 rolls on the job and returns the unused roll to the supplier for a full refund. What is his net spend on cable and clips for this job?"
            steps={[
              {
                calc: 'Identify what is actually asked',
                note: '"Net spend for THIS job" — not the amount he originally paid, and not the value of the returned roll on its own.',
              },
              {
                calc: 'Identify the numbers that matter',
                note: '4 rolls at £34.60, 1 roll refunded, and the £5.80 clips. The 25 m roll length and the 100-clip count describe the goods; they do not drive the calculation.',
              },
              {
                calc: 'Cost of cable actually kept: 3 × £34.60 = £103.80',
                note: 'Only the 3 rolls he did not return.',
              },
              { calc: 'Add the clips: £103.80 + £5.80 = £109.60', note: '' },
            ]}
            answer="£109.60"
            watchOut="Calculating 4 × £34.60 = £138.40 and stopping there answers 'what did he originally spend', which is not the question. The refund is not a detail to skip past — it is the entire reason this question was worth asking."
          />

          <SectionRule />

          <TryIt
            question="A test engineer buys 3 packs of 20 crimp connectors at £4.25 a pack, and a replacement multimeter lead at £11.50. She only needs 2 packs of connectors for the job and returns the third pack for a full refund. What is her net spend for this job?"
            steps={[
              {
                calc: 'Identify what is asked',
                note: 'Net spend for the job, after the refund — not the original total.',
              },
              { calc: 'Connectors kept: 2 × £4.25 = £8.50', note: '' },
              { calc: 'Add the lead: £8.50 + £11.50 = £20.00', note: '' },
            ]}
            answer="£20.00"
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Spotting the distractor</ContentEyebrow>

          <ConceptBlock
            title="The wrong answer that almost works"
            plainEnglish="Before you pick an option, ask what QUESTION it would be the right answer to. If it answers an earlier step rather than the one actually asked, that is the trap, not the answer."
          >
            <p>
              In a multiple-choice question, at least one wrong option is usually not a random
              number — it is exactly what you get if you stop one step early, or apply only the
              first instruction and ignore the second. Recognising the shape of a distractor is a
              specific skill: if an option matches an intermediate figure you calculated on the way
              to the real answer, that is the sign you have found the trap, not the sign you have
              found the answer.
            </p>
            <p>
              The fix is mechanical rather than instinctive. Before selecting an option, state to
              yourself what question that option would be the correct answer to. If it answers "what
              is the price before the discount" and the question asked for the price after it, the
              option is a distractor however confidently it sits in the list.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A job costs £640 in materials and labour. The company adds a 15% markup, then a customer negotiates a flat £20 discount off the marked-up price. Which is the correct final price: £736, £716, £644, or £656?"
            steps={[
              {
                calc: 'Apply the markup first: £640 × 1.15 = £736',
                note: 'A real, correct figure — but only the price with markup applied.',
              },
              {
                calc: '£736 is on the list, but check what it answers',
                note: 'It answers "what is the marked-up price", not the question asked, because the £20 discount has not been applied yet.',
              },
              { calc: 'Apply the discount to the marked-up price: £736 − £20 = £716', note: '' },
            ]}
            answer="£716"
            watchOut="£736 is the classic distractor: a real, correctly-calculated intermediate value offered as if it were the final answer. £644 and £656 are the same idea in reverse — numbers from the question recombined the wrong way rather than genuinely random guesses."
          />

          <WorkedExample
            question="A quote is £480 net. VAT at 20% is added, then the customer pays a £40 deposit off the total. How much is still owed? Options: £576, £536, £440, £460."
            steps={[
              {
                calc: 'VAT-inclusive total: £480 × 1.20 = £576',
                note: 'Correct, but this is the total BEFORE the deposit.',
              },
              {
                calc: '£576 is on the list — check what it answers',
                note: 'It answers "what is the total after VAT", not "how much is still owed after the deposit".',
              },
              { calc: 'Subtract the deposit: £576 − £40 = £536', note: '' },
            ]}
            answer="£536"
            watchOut="Every option here is a real number that appears somewhere in a correct or half-correct working — £440 comes from subtracting £40 from the net price instead of the gross one; £460 comes from a VAT slip. Distractors on VAT questions are almost always built by applying the right operation to the wrong figure."
          />

          <CommonMistake
            title="Picking the first number that matches"
            whatHappens="You calculate one step correctly, see that exact figure sitting in the options list, and select it with relief — without checking whether the question actually stopped at that step."
            doInstead="Before selecting an option, reread the last sentence of the question. If it asks for something 'after' a second operation — a discount, a deposit, a refund — the figure from before that operation is never the answer, however confidently it appears in the list."
          />

          <SectionRule />

          <TryIt
            question="A retailer buys stock for £250 and adds a 40% markup. The customer then gets a 10% loyalty discount off the marked-up price. What is the final price? Options: £350, £315, £275, £300."
            steps={[
              {
                calc: 'Markup: £250 × 1.40 = £350',
                note: 'On the list, but this is pre-discount.',
              },
              { calc: 'Discount off the marked-up price: £350 × 0.90 = £315', note: '' },
            ]}
            answer="£315"
          />

          <InlineCheck
            id="m5s3-spaced-repetition"
            question="In spaced repetition, what happens to the review intervals as you successfully recall information?"
            correctAnswer="The intervals between reviews increase over time. After your first review (Day 1 to Day 2, just one day apart), the gaps get progressively longer (Day 2 to Day 5 is three days, Day 5 to Day 14 is nine days). This is because each successful recall strengthens the memory, so it takes longer to fade."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Calculator or mental — deciding fast</ContentEyebrow>

          <ConceptBlock
            title="Not every number needs a calculator, and reaching for one costs time you don't get back"
            onSite="Round numbers, halves, quarters and 10%/50% multiples are worth doing in your head. Several chained operations on an uneven decimal are worth a calculator. Deciding takes two seconds; getting it wrong either way costs a lot more."
          >
            <p>
              Some figures reduce to a friendly mental route the moment you look at them: 10%, 25%
              and 50% of anything, doubling, halving, and round pounds. Working those out on a
              calculator is not wrong, but it costs seconds you will want back later in the paper,
              and it is one more place to mistype a number. Other figures genuinely do not reduce —
              several operations chained together on a number with several decimal places is exactly
              where a mental slip creeps in unnoticed, because there is no way to sense-check the
              arithmetic as you go.
            </p>
            <p>
              The decision is worth making deliberately rather than by habit: glance at the numbers
              before you start, decide which route the question needs, and commit to it. Habitually
              reaching for a calculator on everything is as much a time cost as habitually avoiding
              one.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 40% discount is applied to a £50 item. Decide whether this needs a calculator, and find the answer."
            nonCalculator
            steps={[
              {
                calc: '10% of £50 = £5',
                note: 'The easiest percentage to find mentally — move the decimal point one place.',
              },
              { calc: '40% = 4 × £5 = £20', note: '' },
              { calc: '£50 − £20 = £30', note: '' },
            ]}
            answer="£30, done entirely mentally"
            watchOut="Reaching for a calculator for a sum like this costs you seconds you will want back later in the paper. Round percentages of round numbers are exactly the kind of question worth being able to do without one."
          />

          <WorkedExample
            question="A job's total cost of £1,247.60 is split three ways after a 12.5% deduction for overheads. Decide whether this needs a calculator, and find the answer."
            steps={[
              {
                calc: '12.5% of £1,247.60 = £155.95',
                note: 'Not a round percentage of a round number — this is where a calculator earns its keep.',
              },
              { calc: '£1,247.60 − £155.95 = £1,091.65', note: '' },
              { calc: '£1,091.65 ÷ 3 = £363.88', note: 'To the nearest penny.' },
            ]}
            answer="£363.88 per share (to the nearest penny)"
            watchOut="Three chained operations on a non-round decimal is exactly where mental arithmetic starts producing errors under pressure — this one genuinely needs a calculator, and pretending otherwise to save time is a false economy."
          />

          <SectionRule />

          <TryIt
            question="Decide calculator or mental, then solve: 25% of £360."
            nonCalculator
            steps={[
              { calc: 'A quarter is one of the percentages worth doing instantly', note: '' },
              { calc: '£360 ÷ 4 = £90', note: '' },
            ]}
            answer="£90, mental"
          />

          <TryIt
            question="Decide calculator or mental, then solve: a cable run of 17.35 m split into 4 equal sections."
            steps={[
              {
                calc: '17.35 does not reduce to a friendly mental fraction',
                note: 'Calculator needed.',
              },
              { calc: '17.35 ÷ 4 = 4.3375', note: '' },
              { calc: 'Rounded to 2 decimal places: 4.34 m', note: '' },
            ]}
            answer="4.34 m per section (to 2 d.p.), calculator"
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Estimating first so an error announces itself</ContentEyebrow>

          <ConceptBlock title="Estimate before you calculate, so a slipped decimal point stands out">
            <p>
              Round every figure to one significant figure, do the sum roughly, and only then do the
              precise calculation — comparing the two. A precise answer that is wildly different
              from the rough one is almost always a place-value error — a decimal point in the wrong
              place, or a missed digit — rather than a wrong method. This technique earns its keep
              most on calculator-heavy multi-step questions, where a single mistyped keystroke can
              produce an answer that looks perfectly plausible on its own and only reveals itself
              against an estimate.
            </p>
            <p>
              The estimate does not need to be accurate — it needs to be in the right order of
              magnitude. A rough figure that is "close enough" to the precise one is the whole point
              of doing it; a precise figure ten times too large or too small will miss that target
              by a mile, which is exactly what makes the check work.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A job needs 6 circuit runs of cable: 18.4 m, 22.7 m, 9.3 m, 31.6 m, 14.2 m and 27.8 m, priced at £2.85 per metre. Estimate the total cost, then calculate it precisely, and use the estimate to catch a place-value error."
            steps={[
              {
                calc: 'Round each length to the nearest 10 m: 20 + 20 + 10 + 30 + 10 + 30 = 120 m',
                note: 'The rough total.',
              },
              {
                calc: 'Round the price to £3/m for the estimate: 120 × £3 = £360',
                note: 'A rough figure to compare against.',
              },
              {
                calc: 'Precise total length: 18.4 + 22.7 + 9.3 + 31.6 + 14.2 + 27.8 = 124.0 m',
                note: '',
              },
              { calc: 'Precise cost: 124.0 × £2.85 = £353.40', note: '' },
              {
                calc: 'Compare: £353.40 is close to the £360 estimate',
                note: 'The precise figure passes the sense check.',
              },
            ]}
            answer="£353.40"
            watchOut="If a slipped decimal point had produced £35.34 or £3,534.00 instead, the £360 estimate would have caught it immediately — both are wildly off the rough figure. The estimate only needs to be roughly right; it is not meant to be accurate on its own."
          />

          <SectionRule />

          <TryIt
            question="A job needs 4 circuit runs of cable: 12.6 m, 27.3 m, 8.9 m and 16.4 m, priced at £3.15 per metre. Estimate the total cost, then calculate precisely, and check the two agree."
            steps={[
              { calc: 'Rounded estimate: 10 + 30 + 10 + 20 = 70 m; 70 × £3 = £210', note: '' },
              { calc: 'Precise length: 12.6 + 27.3 + 8.9 + 16.4 = 65.2 m', note: '' },
              { calc: 'Precise cost: 65.2 × £3.15 = £205.38', note: '' },
            ]}
            answer="£205.38, close to the £210 estimate"
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Showing your method</ContentEyebrow>

          <ConceptBlock
            title="Method earns marks even when the final figure is wrong"
            onSite="A blank space with only a final answer earns nothing if that figure is wrong. The same wrong answer WITH the working shown can still recover every mark for the steps that came after the mistake."
          >
            <p>
              On a multi-step calculation, marks are frequently available for correct method at each
              stage, not only for the final number. Writing each operation as its own line, with
              what it represents, means that an early slip does not cost every mark in the question
              — a correct method applied to a wrong figure is still correct method, and mark schemes
              routinely credit it. "Correct method, wrong number" recovers marks that "just an
              answer, wrong number" cannot.
            </p>
            <p>
              This is worth doing even when a question only prints a small box for the final figure.
              Use the margin, the back of the page, or a spare line — anywhere the working actually
              gets written down rather than done in your head and discarded.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A rewire is estimated at 3.5 days at 7.5 hours a day, at £28 per hour. Show full working for the total labour cost — and suppose you mistakenly calculate the daily hours as 8 instead of 7.5. Show that the working after that point can still earn credit."
            steps={[
              {
                calc: 'Total hours (with the slip): 3.5 × 8 = 28 hours',
                note: 'Wrong — 7.5 was the correct daily figure — but written clearly as its own step.',
              },
              {
                calc: 'Total cost from that (wrong) hours figure: 28 × £28 = £784',
                note: 'This step correctly applies the hourly rate to whatever the hours figure was — the METHOD here is right even though the number it used was wrong.',
              },
              { calc: 'Correct working: 3.5 × 7.5 = 26.25 hours', note: '' },
              { calc: 'Correct total: 26.25 × £28 = £735', note: '' },
            ]}
            answer="£735 is the correct final figure; the version worked with 28 hours shows exactly where the error entered, and every step after it is methodologically sound."
            watchOut="A blank space with only '£784' written down earns nothing once that figure turns out wrong. The same wrong answer with the working shown recovers the marks for every correct step after the slip — this is the entire reason to write working down at all."
          />

          <CommonMistake
            title="Writing only the final number"
            whatHappens="You calculate the whole multi-step problem in your head or on scrap paper, then write only the final figure in the answer space. If that figure is wrong — even from a single early slip — there is nothing on the page for a mark scheme to award credit against."
            doInstead="Write every step as its own line, including what it represents, even for a calculation you did mostly in your head. It costs seconds, and it is the only way a single early mistake does not cost you every mark for the rest of the question."
          />

          <SectionRule />

          <TryIt
            question="A quote uses 4 days at 8 hours a day at £30/hr, but the working mistakenly starts from 4.5 days. Write out the (wrong) working in full, then the correct working, and say which lines of the wrong version still show valid method."
            steps={[
              { calc: 'Wrong hours: 4.5 × 8 = 36 hours', note: '' },
              {
                calc: 'Wrong cost: 36 × £30 = £1,080',
                note: 'Correct method applied to the wrong hours figure.',
              },
              { calc: 'Correct hours: 4 × 8 = 32', note: '' },
              { calc: 'Correct cost: 32 × £30 = £960', note: '' },
            ]}
            answer="£960 is correct. In the wrong version, the second line (hours × rate) is valid method even though the first line's day count was wrong."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Managing time across the paper</ContentEyebrow>

          <ConceptBlock
            title="Spend time in proportion to the marks, and have a fixed rule for what to do when stuck"
            plainEnglish="Marks tell you where your time is best spent — a 6-mark question deserves noticeably longer than a 1-mark one. Paper timing and structure vary between providers, so this page teaches the principle, not a number of minutes."
          >
            <p>
              Marks are printed on the paper, and they are the best guide to how much a question is
              "worth" your time and checking effort. A question worth six marks deserves noticeably
              more of your time than one worth a single mark, and re-checking a one-mark answer
              three times while an unattempted six-mark question sits further down the paper is time
              spent in the wrong place.
            </p>
            <p>
              The second half of this technique is a fixed personal rule for being stuck. If you
              have genuinely tried a question and are not making progress, write down whatever
              partial working you do have, mark the question to come back to, and move to one you
              can make headway on. Paper length and timing vary between providers and papers — this
              page will not state a number of minutes as if it were fixed, and neither should you
              assume one from someone else's exam. What does not vary is the principle: marks guide
              where your time goes, and a fixed rule for "stuck" protects the rest of the paper from
              one question.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A paper's mark scheme awards 2 marks for question 4, 6 marks for question 9, and 1 mark for question 12. Without knowing the total time allowed, work out roughly how the time you spend on each should compare, and what your rule should be if you get stuck."
            steps={[
              {
                calc: 'Compare the marks: Q9 (6) is three times Q4 (2) and six times Q12 (1)',
                note: 'Marks are the best guide available in the absence of a stated time limit per question.',
              },
              {
                calc: 'Allocate roughly in proportion',
                note: 'Noticeably longer on Q9 than Q4, and barely any time re-checking Q12 once it is answered.',
              },
              {
                calc: 'Set the stuck rule in advance',
                note: 'If nothing is coming after a genuine attempt, note down whatever partial working exists, mark the question, and move to one you can make progress on.',
              },
            ]}
            answer="Time spent roughly in proportion to the marks available, and a fixed personal rule for abandoning a stuck question and returning to it — never fixed minutes regardless of marks, and never staying on one question at the cost of others you could complete."
            watchOut="Paper structure and timing vary between providers — check the specific format of your own assessment with your tutor rather than assume a figure from anyone else's paper. What holds regardless is that marks tell you where your time is best spent."
          />

          <Scenario
            title="Stuck on question 6 with half the paper still to go"
            situation="You have read question 6 three times and still cannot see how to start. Several minutes have gone and you have nothing written down."
            whatToDo="Write down anything you DO understand about the question — what is being asked, any figures you can identify — even if you cannot complete it. Then move on to a question you can make progress on, and return to question 6 at the end if there is time left."
            whyItMatters="A blank answer earns zero marks whatever the reason. Partial working sometimes earns partial credit, and finishing the rest of the paper protects the marks you CAN get rather than losing them to one question you were always going to struggle with."
          />

          <InlineCheck
            id="m5s3-pomodoro"
            question="In the Pomodoro Technique, how long is a single focused study session before taking a break?"
            correctAnswer="A single Pomodoro is 25 minutes of focused study followed by a 5-minute break. After completing four Pomodoros (about 2 hours total), you take a longer break of 15-30 minutes. This structure prevents mental fatigue and maintains high concentration throughout your study session."
          />

          <SectionRule />

          <TryIt
            question="A paper awards 1 mark for question 2, 4 marks for question 7, and 8 marks for question 15. Rank the three in the order you would most want to be sure you have attempted, and explain why, without assuming a fixed time limit for any of them."
            steps={[
              { calc: 'Compare the marks: 8 > 4 > 1', note: '' },
              {
                calc: 'Priority order: Q15, then Q7, then Q2',
                note: 'An unattempted 8-mark question costs far more than an unattempted 1-mark one if time runs short near the end.',
              },
            ]}
            answer="Q15 first priority to secure an attempt, then Q7, then Q2 — mark value drives the priority, not the order the questions appear on the page."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Reading a longer text</ContentEyebrow>

          <ConceptBlock
            title="Skim for structure first, then scan for the exact sentence that answers the question"
            onSite="A longer source text is a reference document for the ten seconds it takes to answer one question — treat it that way rather than reading it like an article."
          >
            <p>
              For an English reading question built on a longer source text — a workplace policy
              extract, a supplier's terms, a safety bulletin — the technique runs in two passes.
              Skim the whole text first, before reading the question, just for its shape: how many
              points does it make, who is it addressed to, what kind of document is it. This builds
              a rough map of where things are without committing to reading every word.
            </p>
            <p>
              Then read the question and pull out its key words. Scan the text — do not re-read it —
              for those key words or close synonyms. The sentence that answers the question is
              usually near a matching word or phrase, not spread evenly across the whole text. Quote
              or closely paraphrase that specific sentence; a summary of the whole document is not
              what the question is asking for, and it is also slower to produce.
            </p>
          </ConceptBlock>

          <WorkedExample
            question={
              <>
                Source text (extract from a site safety bulletin): "All operatives must sign in at
                the site office before 8:00 am. Visitors must be accompanied at all times and must
                wear a hi-vis vest supplied by the site office. Any operative found not wearing the
                correct PPE will be removed from site for the remainder of the day." Question: what
                happens to an operative who is not wearing the correct PPE?
              </>
            }
            steps={[
              {
                calc: 'Skim first',
                note: 'Three sentences, each about a different topic — signing in, visitors, then PPE.',
              },
              {
                calc: "Pull the question's key words",
                note: "'operative', 'not wearing', 'correct PPE'.",
              },
              {
                calc: 'Scan for those words rather than re-reading',
                note: "The third sentence contains 'operative' and 'PPE' together — that is the match, not the first or second sentence.",
              },
              {
                calc: 'Read that sentence closely',
                note: '"will be removed from site for the remainder of the day."',
              },
            ]}
            answer="They will be removed from site for the remainder of that day."
            watchOut="The first sentence also contains the word 'operative', but it answers a different question, about signing in. Matching a shared word is not enough on its own — check that the sentence you have found actually answers the question asked, not just that it contains a matching word."
          />

          <SectionRule />

          <TryIt
            question={
              <>
                Source text (extract from a supplier's returns policy): "Goods may be returned
                within 30 days of purchase in original packaging. Items marked as special order are
                non-returnable. A restocking fee of 15% applies to bulk orders over 50 units."
                Question: what fee applies if you return a bulk order of 80 units?
              </>
            }
            steps={[
              {
                calc: 'Skim',
                note: 'A three-sentence returns policy, each sentence covering a different condition.',
              },
              { calc: "Key words in the question: 'bulk order', 'fee'", note: '' },
              {
                calc: 'Scan for a match',
                note: "The third sentence names a 'restocking fee' for 'bulk orders over 50 units' — 80 exceeds 50, so this sentence applies.",
              },
            ]}
            answer="A 15% restocking fee applies, because 80 units exceeds the 'over 50 units' bulk threshold named in the third sentence."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Checking your work before you commit to it</ContentEyebrow>

          <ConceptBlock title="Verify before you submit — a second route for a number, a plan for prose">
            <p>
              Two related habits close out a paper. First, for a calculation: check the answer using
              a genuinely different method rather than simply redoing the same steps. Repeating an
              identical method reproduces an identical mistake if there was one in the first place —
              it checks that you can repeat an error consistently, not that the answer is right. A
              different operation, run in the opposite direction, is the only check that actually
              tests the result: multiply back after a division, add in a different grouping, find a
              percentage by a different route to the one that produced it.
            </p>
            <p>
              Second, for a written response — a letter, an email, a short report extract — the plan
              comes before a single sentence is written. Identify who you are writing to (the
              audience), what you want them to understand or do as a result (the purpose), and the
              specific points that need to be there, in the order a reader who does not already know
              the answer would need them. Only then start writing.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 72 m cable run divided into 5 equal sections gives 14.4 m per section, according to your division. Check this a different way rather than by simply repeating the division."
            steps={[
              { calc: 'Original method: 72 ÷ 5 = 14.4 m', note: '' },
              {
                calc: 'Check by the reverse operation: 14.4 × 5 = 72',
                note: 'A genuinely different operation, not the same division redone.',
              },
              { calc: '72 = 72 — the check confirms the answer', note: '' },
            ]}
            answer="14.4 m per section, confirmed by multiplying back rather than re-dividing"
            watchOut="Redoing the same division a second time will reproduce an identical arithmetic slip if you made one — it checks that you can repeat a mistake consistently, not that the mistake is not there. A different operation is the only check that actually tests the answer."
          />

          <WorkedExample
            question="A client emails asking why their consumer unit upgrade is taking two extra days. Plan the reply before writing a word: who is it for, what is the purpose, and what points need to be in it, in what order?"
            steps={[
              {
                calc: 'Audience: the client',
                note: 'Not a colleague — no trade jargon without a plain-English gloss.',
              },
              {
                calc: 'Purpose: reassure and explain',
                note: 'The job is under control, and the specific cause of the delay is stated, so the client does not feel ignored or overcharged.',
              },
              {
                calc: 'Points, in the order a reader needs them',
                note: '(1) acknowledge the delay directly, (2) state the specific cause in plain terms, (3) give the revised completion date, (4) confirm there is no extra cost, if that is true.',
              },
              {
                calc: 'Draft the opening line from that plan',
                note: "\"I'm sorry for the delay on your consumer unit upgrade — here's exactly what's happened and when we'll finish.\"",
              },
            ]}
            answer="A four-point plan — acknowledge, explain, revise date, confirm cost — drafted before any sentence is written, so the reply answers the client's real question first rather than opening with technical detail."
            watchOut="Leading with the technical explanation ('the new board needed a part on back-order') before acknowledging the delay reads as excuse-making, even when the explanation is entirely true. The ORDER in the plan is doing real work here, not just the content."
          />

          <InlineCheck
            id="m5s3-past-papers"
            question="In the three-pass strategy for past papers, what is the purpose of the second pass?"
            correctAnswer="The second pass is a practice run under exam conditions. You complete the paper timed, without looking at the mark scheme, then mark it honestly afterwards. This simulates the real exam experience and gives you an accurate picture of your current ability level, including your time management."
          />

          <SectionRule />

          <TryIt
            question="A quote of £1,748 is split evenly across 4 stage payments, giving £437 per stage according to your division. Check this a different way."
            steps={[
              { calc: 'Multiply back: £437 × 4 = £1,748', note: '' },
              { calc: 'Matches the original figure', note: 'The check confirms the answer.' },
            ]}
            answer="£437 per stage, confirmed by multiplying back"
          />

          <TryIt
            question="A tutor asks you to write a short paragraph explaining a delay in submitting a piece of coursework. Plan it before drafting: audience, purpose, and the points in order."
            steps={[
              {
                calc: 'Audience: the tutor',
                note: 'Professional and brief, not the tone you would use with a friend.',
              },
              { calc: 'Purpose: explain, reassure, and give a way forward', note: '' },
              {
                calc: 'Points, in order',
                note: '(1) state the delay, (2) give the reason briefly, (3) give the new date.',
              },
            ]}
            answer="A three-point plan — state, explain, reschedule — drafted before writing a single sentence"
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Restate the question in one sentence before calculating — the actual instruction is usually in its last sentence, and starting from the first number often answers a different, easier question.',
              'A wrong multiple-choice option is frequently a correctly-calculated intermediate value. Ask what question an option answers before selecting it.',
              'Round numbers, halves and quarters are worth doing mentally. Several chained operations on an uneven decimal are worth a calculator — decide deliberately, not by habit.',
              'Estimate roughly before calculating precisely. A precise answer wildly off the rough one usually means a place-value or decimal-point error, not a wrong method.',
              'Write every step of a calculation, including what it represents. Correct method applied to a wrong figure can still earn marks; a blank space with only a final answer cannot.',
              'Spend time in proportion to the marks a question carries, not equally across every question, and have a fixed rule for a stuck question: note partial working, mark it, move on, return later.',
              'Skim a longer source text for its shape first, then scan for the key words in the question — the answer is usually near a matching word, not spread across the whole text.',
              'Check a calculation by a genuinely different method, not by repeating the same one — repetition confirms you can repeat a mistake, not that there was not one.',
              'Plan a written response by audience and purpose before writing a word, and put the points in the order a reader who does not already know the answer needs them.',
              'Paper length, timing and the calculator/non-calculator split vary between providers. This page never states one as fact — check the specific format with your own tutor.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Will I be told which questions are worth more marks?',
                answer:
                  'Yes — mark allocations are shown on the paper. Use them to guide how much time and checking effort a question deserves, rather than treating every question as equally important.',
              },
              {
                question: 'Is a calculator allowed for the whole maths paper?',
                answer:
                  "This varies by provider and paper — some split calculator and non-calculator sections, others do not. Check the specific format with your own tutor rather than assume from someone else's exam.",
              },
              {
                question:
                  "I've spotted a distractor answer but I'm still not sure which option is right — what now?",
                answer:
                  "Redo the working for the operation you're least confident in, and if you still can't decide, check which option matches the LAST instruction in the question rather than an earlier one — that is usually where a distractor comes from.",
              },
              {
                question:
                  'Do I need to write full working if the question only prints a box for the final answer?',
                answer:
                  'Write it anyway, in the margin or on spare space if there is nowhere else. Method marks exist on many mark schemes even when only the final figure is printed for, and working is the only way to recover marks if that figure turns out wrong.',
              },
              {
                question: 'How long should I spend planning before writing a longer answer?',
                answer:
                  'Long enough to list the points in the right order — a plan of three or four lines takes under a minute and saves far more than that in redrafting once you have started writing in the wrong order.',
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Study Techniques & Exam Skills Knowledge Check" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module5/section2')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Section 2
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module5/section4')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Section 4
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule5Section3;
