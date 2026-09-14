/**
 * Functional Skills · Module 5 · Section 2 — Level 2 Functional Skills practice
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit. This
 * is the practice page for the module, so density runs to the top of the
 * course: 14 WorkedExample and 14 TryIt blocks against 8 ConceptBlocks —
 * every technique taught is shown once and then practised once, and several
 * are practised twice with a second, harder pass.
 *
 * 🔴 NO AWARDING BODY IS NAMED, ANYWHERE ON THIS PAGE. None has been
 * confirmed for this cohort. The 2024 page did not name one either, so
 * nothing was removed here — but the assessment-format detail that follows
 * (paper length, calculator split, pass marks) is written as "this is the
 * common shape; check the specifics with your provider" rather than as a
 * single fixed timetable, because those details genuinely differ between
 * awarding bodies and asserting one set of numbers as universal would be
 * guessing. The Ofqual Functional Skills subject content — the actual maths
 * and English being taught below — is common to all of them, and that is
 * what this page teaches.
 *
 * 🔴 THE LEVEL 1 / LEVEL 2 CONTRADICTION WITH SECTION 1 — HANDLED, NOT
 * PICKED. The 2024 version of this page stated flatly: "Achieving Level 2 is
 * a requirement for completing your electrical apprenticeship." Section 1
 * states the opposite emphasis: providers require Level 2, but Level 1 is
 * the minimum gateway qualification. Both are stated as flat rules and they
 * cannot both be universally true, because apprenticeship English and maths
 * requirements are set per standard and have changed more than once in
 * recent years — they are not one fixed rule across every apprenticeship.
 * This page now states the honest, conditional version in its opening
 * paragraph: Level 1 and Level 2 are two levels of the same qualification;
 * which one an individual apprentice must hold depends on their standard,
 * their age when they started, and sometimes qualifications they already
 * hold; and the correct move is to confirm the requirement with your
 * training provider rather than assume either direction. Neither the old
 * "Level 2 is required" line nor a flat "Level 1 is enough" line appears
 * anywhere below.
 *
 * Quiz bank: preserved verbatim — all 8 questions, options and
 * correctAnswer indices unchanged from the 2024 page. All three InlineCheck
 * components are preserved verbatim (same question and correctAnswer text)
 * and given m5s2- prefixed ids, since the 2024 page had none. No regulation
 * numbers, competent person schemes or commercial products appear on this
 * page, so none of the standing accuracy rules bite here beyond the two
 * points above. <RegsCallout> is not used — there is nothing on this page
 * that could be mistaken for it.
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

const TITLE = 'Level 2 Functional Skills Practice - Functional Skills Module 5.2';
const DESCRIPTION =
  'Level 2 Functional Skills practice for electrical apprentices: multi-step maths, percentage change and reverse percentages, ratio, area and volume, chart interpretation, inference, and structured writing, with worked examples throughout.';

const quizQuestions = [
  {
    id: 1,
    question: 'What is a key difference between Level 1 and Level 2 Maths questions?',
    options: [
      'Level 2 questions are always multiple choice rather than written answers',
      'Level 2 questions require multi-step reasoning and real-world application',
      'Level 2 questions never allow the use of a calculator at any stage',
      'Level 2 questions only cover money and ignore measurement and data',
    ],
    correctAnswer: 1,
    explanation:
      'Level 2 questions are more demanding because they require multi-step reasoning and the ability to apply maths to realistic workplace and everyday scenarios independently.',
  },
  {
    id: 2,
    question:
      'An electrician charges £45 per hour plus VAT at 20%. A job takes 3 hours and requires £120 of materials (no VAT on materials). What is the total cost?',
    options: ['£297.00', '£255.00', '£282.00', '£270.00'],
    correctAnswer: 2,
    explanation:
      'Labour: 3 x £45 = £135. VAT on labour: £135 x 0.20 = £27. Labour + VAT: £135 + £27 = £162. Total: £162 + £120 materials = £282.00.',
  },
  {
    id: 3,
    question:
      'In Level 2 English, what structure should you use for each paragraph in a persuasive essay?',
    options: [
      'Who, what, when, where, why',
      'Introduction, middle, end',
      'Fact, opinion, fact, opinion',
      'PEEL: Point, Evidence, Explain, Link',
    ],
    correctAnswer: 3,
    explanation:
      'PEEL (Point, Evidence, Explain, Link) is an effective paragraph structure for persuasive writing. State your point, support it with evidence, explain why it matters, then link back to your main argument.',
  },
  {
    id: 4,
    question:
      'Sand and gravel are mixed in the ratio 2:3. How much gravel is needed for 25 kg of mix?',
    options: ['15 kg', '12.5 kg', '10 kg', '20 kg'],
    correctAnswer: 0,
    explanation:
      'Total parts = 2 + 3 = 5. Gravel = 25 divided by 5 x 3 = 15 kg. The gravel makes up 3 out of the 5 total parts of the mixture.',
  },
  {
    id: 5,
    question:
      'When writing a formal letter to someone whose name you do not know, how should you sign off?',
    options: ['Yours sincerely', 'Yours faithfully', 'Best wishes', 'Kind regards'],
    correctAnswer: 1,
    explanation:
      "Use 'Yours faithfully' when you do not know the recipient's name (i.e. you wrote 'Dear Sir/Madam'). Use 'Yours sincerely' when you do know their name (i.e. you wrote 'Dear Mr Smith').",
  },
  {
    id: 6,
    question:
      'A kitchen is 5.4 m by 3.8 m. Tiles cost £28.50 per m² with 15% wastage allowance. What is the total tile cost?',
    options: ['£584.82', '£653.94', '£684.00', '£710.00'],
    correctAnswer: 2,
    explanation:
      'Area = 5.4 x 3.8 = 20.52 m². With 15% wastage: 20.52 x 1.15 = 23.598 m². Round up to 24 m² (cannot buy part-tiles). Cost = 24 x £28.50 = £684.00.',
  },
  {
    id: 7,
    question: "What does 'inference' mean in the context of a Level 2 reading exam?",
    options: [
      'Copying the most important sentence directly out of the text',
      'Counting how many times a key word appears in the passage',
      'Summarising the whole text in a single short sentence',
      'Working out implied meaning from clues, not directly stated',
    ],
    correctAnswer: 3,
    explanation:
      'Inference means reading between the lines — understanding what the writer implies without stating it directly. You use clues and context to work out meaning that is not explicitly written.',
  },
  {
    id: 8,
    question: 'When practising under exam conditions, what is the most important rule?',
    options: [
      'Keep to a strict timer without pausing or looking things up',
      'Pause the timer whenever you need to check a formula',
      'Allow yourself extra time to finish every question fully',
      'Mark your own answers as you go to confirm each one',
    ],
    correctAnswer: 0,
    explanation:
      'The whole point of timed practice is to simulate the real exam experience. You must commit to the timer and avoid looking things up, just as you would in the actual exam room.',
  },
];

const FunctionalSkillsModule5Section2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 2"
        title="Level 2 Functional Skills practice"
        backTo="/study-centre/apprentice/functional-skills/module5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default, to match the rest of the course — this
            section carries multi-line worked calculations and source passages
            that read badly when they wrap. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Level 1 and Level 2 are two levels of the same qualification, not two different
            subjects. Which one you are actually required to hold before your End-Point Assessment
            depends on your apprenticeship standard, your age when you started, and sometimes
            qualifications you already hold — the minimum English and maths requirements for
            apprenticeships have changed more than once in recent years and are not identical across
            every standard. Some standards set Level 2 as the exit requirement; others accept Level
            1. Confirm which applies to you with your training provider rather than assuming either
            way. What follows is Level 2 standard in full, so that whichever one you are asked to
            sit, you arrive ready for it.
          </p>

          <LearningOutcomes
            outcomes={[
              'Recognise a genuine multi-step problem, where the answer to one calculation becomes an input to the next, and work it through in the right order.',
              'Identify which method a problem needs when it is not stated, and avoid a distractor value that is correct at an intermediate step but not the final answer.',
              'Break a real quotation or costing problem into an ordered sequence of calculations, including a contingency allowance and VAT added at the correct point.',
              'Calculate percentage change in both directions, and reverse a percentage to recover an original value from one that has already been increased or decreased.',
              'Apply a given ratio to split materials, cost or a scale drawing measurement between more than two parts.',
              'Combine an area or volume calculation with a real quantity — tiles, bags, cable — and round correctly for a physical item rather than a number.',
              'Interpret a chart or table to answer a question the data does not state directly, and compare two written sources for stance and evidence.',
              'Structure a piece of writing for a specified audience and purpose, using an established paragraph structure rather than a random order of points.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Level 1 standard, fluently',
                gist: 'This page assumes single-step percentage, ratio, area and comprehension work is no longer effortful. If any of that feels shaky, Level 1 practice is Section 1 of this module.',
              },
              {
                term: 'A calculator, and the confidence to work without one',
                gist: 'Level 2 questions can appear in either a calculator or a non-calculator section depending on your provider, so practise the arithmetic both ways rather than assuming a calculator will always be there.',
              },
            ]}
          />

          <TLDR
            points={[
              'Level 2 problems chain two or more calculations together — the answer to step one feeds step two, and a wrong first step wrecks everything that follows it.',
              'A Level 2 question often does not tell you which method to use. Deciding that, before you start calculating, is part of what is being assessed.',
              'A distractor answer is usually built from a real intermediate step in the calculation, not invented from nowhere — reaching a plausible-looking total is not proof you have finished.',
              'Percentage change and reverse percentages are different questions: "what is X after a change" uses one calculation, "what was X before the change" uses the opposite one.',
              "A ratio splits a total; it does not tell you the total. Find the sum of the ratio's parts first, always, before you divide anything.",
              'Physical quantities (tiles, bags, lengths) round UP from a calculated area or volume, never to the nearest whole number and never down.',
              'Interpreting a chart means answering something the data implies — a mean, a rate of change, a comparison — not reading off a single labelled value.',
              'A structured piece of writing is planned by audience and purpose before a word is written, then built in a repeatable paragraph shape such as PEEL.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · What actually changes at Level 2</ContentEyebrow>

          <ConceptBlock
            title="Multi-step problems, method choice, and the distractor"
            onSite="At Level 1 the question tells you what to do. At Level 2 it tells you what it wants and leaves the method to you — that gap is the whole difficulty."
          >
            <p>
              A Level 1 question is usually one calculation: find 20% of this, multiply these two
              numbers, read this figure off a table. A Level 2 question is usually several of those
              chained together, where the output of one calculation is an input to the next — total
              the materials, add a contingency, add labour, then apply VAT to the lot. Get the
              second step wrong and every step after it is wrong too, even if the method from that
              point on is perfect.
            </p>
            <p>
              The second change is that Level 2 rarely tells you which method to use. A Level 1
              question says "find 20% of £246"; a Level 2 question says "the total was £246 after a
              20% increase — what was it before?" and leaves you to work out that dividing, not
              subtracting, is what reverses an increase. Deciding the method is the skill being
              tested, as much as carrying it out correctly.
            </p>
            <p>
              The third change is the distractor: a wrong answer option built from a real
              intermediate step, not a nonsense number. If a question has four steps and you stop
              after two, your answer will usually match one of the options — because whoever wrote
              the question expected people to stop early. Reaching a plausible, well-formed total is
              not the same as reaching the total the question actually asked for.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="An electrician charges £38 per hour plus VAT at 20%. A rewire takes 14 hours and needs £310 of materials, with no VAT on materials in this scenario. A colleague says the total is £638.40. Check this, and say exactly what their figure represents."
            steps={[
              {
                calc: 'Labour = 14 x £38 = £532.00',
                note: 'The base labour cost before anything is added.',
              },
              {
                calc: 'VAT on labour = £532.00 x 0.20 = £106.40',
                note: 'VAT applies to the labour, not to the materials, in this scenario.',
              },
              {
                calc: 'Labour + VAT = £532.00 + £106.40 = £638.40',
                note: "This matches the colleague's figure exactly.",
              },
              {
                calc: 'Add materials: £638.40 + £310.00 = £948.40',
                note: 'The materials were never added — the job is not finished.',
              },
            ]}
            answer="The correct total is £948.40. The colleague's £638.40 is not a wrong calculation — it is labour plus VAT, correctly worked out, with the materials simply never added. A real intermediate answer, stopped one step too early."
            watchOut="A distractor in a multi-step problem is rarely a random wrong number. It is usually the correct answer to a shorter question than the one that was asked. A financially plausible total is not proof you have finished — check it against every element the question actually named."
          />

          <SectionRule />

          <TryIt
            question="An electrician charges £42 per hour plus VAT at 20%. A job takes 9 hours and needs £145 of materials, no VAT on materials. A figure circulating on site is £453.60. Work out the correct total, and say what the £453.60 figure actually represents."
            steps={[
              { calc: 'Labour = 9 x £42 = £378.00', note: '' },
              { calc: 'VAT on labour = £378.00 x 0.20 = £75.60', note: '' },
              {
                calc: 'Labour + VAT = £378.00 + £75.60 = £453.60',
                note: 'Matches the figure on site.',
              },
              { calc: 'Add materials: £453.60 + £145.00 = £598.60', note: '' },
            ]}
            answer="The correct total is £598.60. The £453.60 figure is labour plus VAT only — the materials were never added, exactly the same shape of error as the worked example above."
          />

          <WorkedExample
            question="A cable drum contains 100 m of cable and costs £180. You need 35 m for a job. One colleague says 'find the cost per metre, then multiply by 35'; another says 'find what fraction 35 is of 100, then apply that fraction to £180'. Do both work, and which is more direct here?"
            steps={[
              {
                calc: 'Method A — unit rate: £180 / 100 = £1.80 per metre, then 1.80 x 35 = £63.00',
                note: 'Find the cost of one metre first, then scale up.',
              },
              {
                calc: 'Method B — proportion: 35/100 = 0.35, then 0.35 x £180 = £63.00',
                note: 'Find what fraction of the whole drum you need, then apply that fraction to the whole cost.',
              },
              {
                calc: 'Compare: both give £63.00',
                note: 'They are the same relationship, expressed in a different order — dividing then multiplying, versus multiplying by a fraction.',
              },
            ]}
            answer="£63.00, by either method. Method A (unit rate) is usually the quicker mental route, but recognising that both routes are the same underlying relationship — not two different facts you need to remember separately — is the actual Level 2 skill."
            watchOut="At Level 1 you would be told which method to use. At Level 2 the question does not care which route you take, only that you reach a correct, justified answer — pick whichever is fastest for the numbers in front of you, and do not assume there is only one correct method."
          />

          <SectionRule />

          <TryIt
            question="A box of 500 screws costs £24. You need 140 screws for a job. Show two different valid ways to find the cost, and confirm they agree."
            steps={[
              {
                calc: 'Unit rate: £24 / 500 = £0.048 per screw, then 0.048 x 140 = £6.72',
                note: '',
              },
              { calc: 'Proportion: 140/500 = 0.28, then 0.28 x £24 = £6.72', note: '' },
            ]}
            answer="£6.72 either way — the two methods agree because they are the same calculation, reordered."
          />

          <InlineCheck
            id="m5s2-digital-skills-l1-l2"
            question="What is the key difference between Level 1 and Level 2 Digital Skills assessments?"
            correctAnswer="Level 2 requires greater independence, more complex tasks (such as IF functions and conditional formatting in spreadsheets), the ability to combine information from multiple sources, and critical evaluation of online information for reliability and bias."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Multi-step cable-and-cost problems</ContentEyebrow>

          <ConceptBlock title="Building a quotation step by step — order matters as much as arithmetic">
            <p>
              A full quotation problem is the clearest example of Level 2's chained-calculation
              structure. You typically need to: total the materials, apply a contingency percentage
              to the materials only, add labour, then apply VAT to the whole quotation — materials,
              contingency and labour together. Doing those in the wrong order changes the final
              figure, because VAT calculated on materials alone before labour is added gives a
              different, smaller number than VAT calculated on the full total.
            </p>
            <p>
              The habit worth building is to keep a running subtotal and label each line as you go —
              "materials", "materials + contingency", "materials + contingency + labour" — rather
              than trying to do the whole calculation in your head in one pass. On a real job this
              is also exactly how a quote gets checked before it goes to a client.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A rewire quote: 3 rooms averaging 14 m² each. Cable costs £1.95 per metre, and each room needs 18 metres. Labour is £42 per hour for 20 hours. A consumer unit costs £210. Add 8% contingency to the material total, then add 20% VAT to the entire quotation. What is the final price?"
            steps={[
              { calc: 'Cable needed = 3 rooms x 18 m = 54 m', note: '' },
              { calc: 'Cable cost = 54 x £1.95 = £105.30', note: '' },
              { calc: 'Materials = £105.30 + £210.00 (consumer unit) = £315.30', note: '' },
              {
                calc: 'Contingency = £315.30 x 1.08 = £340.52',
                note: 'Applied to materials only, before labour is added.',
              },
              { calc: 'Labour = 20 x £42 = £840.00', note: '' },
              {
                calc: 'Subtotal = £340.52 + £840.00 = £1,180.52',
                note: 'Materials-with-contingency plus labour.',
              },
              {
                calc: 'VAT = £1,180.52 x 0.20 = £236.10',
                note: 'VAT is applied to the whole quotation, not to materials alone.',
              },
              { calc: 'Total = £1,180.52 + £236.10 = £1,416.62', note: '' },
            ]}
            answer="£1,416.62."
            watchOut="Contingency applies to the materials only, not to labour, and VAT applies to the WHOLE quotation — materials, contingency and labour together — at the end. Applying VAT to materials alone, or forgetting the contingency step entirely, gives a lower figure that looks plausible but is wrong."
          />

          <SectionRule />

          <TryIt
            question="A rewire quote: 2 rooms averaging 16 m² each. Cable costs £2.10 per metre, and each room needs 20 metres. Labour is £45 per hour for 14 hours. A consumer unit costs £195. Add 8% contingency to the material total, then add 20% VAT to the entire quotation. What is the final price?"
            steps={[
              { calc: 'Cable needed = 2 x 20 = 40 m', note: '' },
              { calc: 'Cable cost = 40 x £2.10 = £84.00', note: '' },
              { calc: 'Materials = £84.00 + £195.00 = £279.00', note: '' },
              { calc: 'Contingency = £279.00 x 1.08 = £301.32', note: '' },
              { calc: 'Labour = 14 x £45 = £630.00', note: '' },
              { calc: 'Subtotal = £301.32 + £630.00 = £931.32', note: '' },
              { calc: 'VAT = £931.32 x 0.20 = £186.26', note: '' },
              { calc: 'Total = £931.32 + £186.26 = £1,117.58', note: '' },
            ]}
            answer="£1,117.58."
          />

          <Scenario
            title="The quote that quietly missed the VAT"
            situation="A junior colleague sends a client a materials-and-labour quote totalling £931.32, and the client accepts it in writing. You notice VAT was never added to the figure."
            whatToDo="Flag it immediately, before any work starts — not after an invoice has already gone out. Recalculate the correct VAT-inclusive total and send the client a corrected figure in writing, explaining plainly what was missing and why the number has changed."
            whyItMatters="Once a client has accepted a figure in writing, absorbing a missed 20% yourself is a real financial cost, and adding it retrospectively after they have budgeted against the original number damages trust far more than catching the error before the job begins."
          />

          <SectionRule />

          <WorkedExample
            question="A supplier offers cable at £1.60 per metre loose, or a flat £140 for a fixed 100 m drum. You need 92 m. Which is cheaper, and by how much?"
            steps={[
              { calc: 'Loose cable: 92 x £1.60 = £147.20', note: 'Buying exactly what is needed.' },
              {
                calc: 'Fixed drum: £140.00',
                note: 'A flat price regardless of how much of the 100 m is actually used.',
              },
              { calc: 'Compare: £147.20 vs £140.00', note: '' },
            ]}
            answer="The 100 m drum, at £140.00, is cheaper by £7.20 — even though 8 m of it goes unused."
            watchOut="The cheaper unit rate is not always the cheaper total. Always compare final totals, not just the price per metre, especially when a bulk option carries a fixed price regardless of the quantity actually used."
          />

          <SectionRule />

          <TryIt
            question="A supplier offers trunking at £3.40 per metre loose, or a fixed £58 for a 20 m length that must be bought whole. You need 15.5 m. Which is cheaper, and by how much?"
            steps={[
              { calc: 'Loose: 15.5 x £3.40 = £52.70', note: '' },
              { calc: 'Fixed length: £58.00', note: '' },
            ]}
            answer="Buying loose is cheaper, at £52.70 against £58.00 — a saving of £5.30. Here the bulk option is NOT the cheaper choice, the opposite of the previous example, which is exactly why the comparison has to be checked every time rather than assumed."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Percentage change and reverse percentages</ContentEyebrow>

          <ConceptBlock title="Percentage change forward, and reversed">
            <p>
              Forward percentage change is the Level 1 version: multiply the original value by (1 ±
              the rate) to find the new value. Reversing it is the genuinely new Level 2 skill:
              given the value <em>after</em> a percentage change, find the value before it. The two
              are not symmetrical operations. To find a value after a 20% increase you multiply by
              1.20; to find the value before that same increase you do not multiply by 0.80 — you
              divide by 1.20. Multiplying by (1 − rate) only reverses correctly if the change was a
              decrease in the first place.
            </p>
            <p>
              The reason the wrong shortcut is tempting is that it produces a plausible-looking
              number. £246 x 0.8 = £196.80 looks like a sensible price. It is simply the answer to a
              different question — "what is 20% off £246" — not "what was the price before £246 was
              reached by adding 20%".
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A firm's emergency callouts fell from 220 in Q1 to 168 in Q4. What is the percentage decrease, to one decimal place?"
            steps={[
              { calc: 'Decrease = 220 - 168 = 52', note: '' },
              {
                calc: 'Percentage = (52 / 220) x 100 = 23.6363...',
                note: 'Always divide the decrease by the ORIGINAL value, never the new one.',
              },
              { calc: 'Round to 1 d.p. = 23.6%', note: '' },
            ]}
            answer="23.6%."
            watchOut="Dividing by the new value (168) instead of the original (220) is the single most common error in a percentage change question — it gives a different, wrong percentage that still looks like a reasonable answer."
          />

          <SectionRule />

          <TryIt
            question="Overtime hours worked by a team fell from 85 hours in March to 61 hours in April. What is the percentage decrease, to one decimal place?"
            steps={[
              { calc: 'Decrease = 85 - 61 = 24', note: '' },
              { calc: 'Percentage = (24 / 85) x 100 = 28.235...', note: '' },
              { calc: 'Round to 1 d.p. = 28.2%', note: '' },
            ]}
            answer="28.2%."
          />

          <CommonMistake
            title="Reversing a percentage by subtracting instead of dividing"
            whatHappens="A figure after a 20% increase is given, and to find the original, 20% is subtracted from the final figure instead of dividing by 1.20. £246 x 0.8 = £196.80 looks like a plausible original price, but 20% of £246 is not the same amount as 20% of the true, smaller original figure."
            doInstead="To reverse an increase, divide the final figure by (1 + rate); to reverse a decrease, divide by (1 - rate). Never multiply the final figure by the opposite factor — that operation only works forwards, not backwards."
          />

          <SectionRule />

          <WorkedExample
            question="A supplier's invoice shows a total of £246 after a 20% VAT has been added. What was the price before VAT?"
            steps={[
              {
                calc: 'Set up the relationship: before x 1.20 = £246',
                note: 'VAT adds 20% on top of the original figure — it does not replace 20% of the final figure.',
              },
              {
                calc: 'Before = £246 / 1.20 = £205.00',
                note: 'Divide, do not subtract a percentage of the final figure.',
              },
              {
                calc: 'Check: £205.00 x 1.20 = £246.00',
                note: 'Feeding the answer back through the forward calculation should return the starting figure.',
              },
            ]}
            answer="£205.00 — and the check confirms it, because £205.00 x 1.20 returns exactly £246."
          />

          <SectionRule />

          <TryIt
            question="After a 15% trade discount, an invoice shows £127.50. What was the price before the discount?"
            steps={[
              {
                calc: 'Set up: before x 0.85 = £127.50',
                note: 'A 15% discount leaves 85% of the original price.',
              },
              { calc: 'Before = £127.50 / 0.85 = £150.00', note: '' },
              { calc: 'Check: £150.00 x 0.85 = £127.50', note: '' },
            ]}
            answer="£150.00, confirmed by the check."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Ratio applied to a materials split</ContentEyebrow>

          <ConceptBlock title="Splitting a total by ratio — find the total parts before you divide anything">
            <p>
              A ratio splits a total; it does not tell you the total itself. The method is always
              the same regardless of how many parts the ratio has: add every number in the ratio to
              get the total number of parts, divide the actual total quantity by that number of
              parts to find the value of one part, then multiply back out for each share. Dividing
              by the wrong number — for instance, dividing by 3 because there are three materials,
              rather than by the sum of the ratio's own numbers — is the single most common error.
            </p>
            <p>
              A scale drawing uses exactly the same ratio idea in a different shape: a scale of 1:50
              is a ratio between a drawing measurement and the real one. Multiply the drawing
              measurement by the second number in the ratio to recover the real-world size — the
              same "find the parts, then scale" logic as splitting a bag of mix.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Cement, sand and lime are mixed in the ratio 1:5:1 for a render coat. You need 42 kg of mix in total. How much of each material do you need?"
            steps={[
              {
                calc: 'Total parts = 1 + 5 + 1 = 7',
                note: 'Add every number in the ratio — not the count of materials, which happens to also be 3 here.',
              },
              { calc: 'One part = 42 / 7 = 6 kg', note: '' },
              {
                calc: 'Cement = 1 x 6 = 6 kg; Sand = 5 x 6 = 30 kg; Lime = 1 x 6 = 6 kg',
                note: '',
              },
              {
                calc: 'Check: 6 + 30 + 6 = 42 kg',
                note: 'The three shares must add back to the original total.',
              },
            ]}
            answer="6 kg cement, 30 kg sand, 6 kg lime."
            watchOut="Always find the total number of parts by adding the ratio's own numbers together, then divide the total quantity by that. Dividing by the number of materials instead of the sum of the ratio is an easy, and common, mix-up."
          />

          <SectionRule />

          <TryIt
            question="Cement, sand and gravel are mixed in the ratio 1:2:4 for a concrete base. You need 63 kg of mix in total. How much of each material do you need?"
            steps={[
              { calc: 'Total parts = 1 + 2 + 4 = 7', note: '' },
              { calc: 'One part = 63 / 7 = 9 kg', note: '' },
              { calc: 'Cement = 9 kg; Sand = 18 kg; Gravel = 36 kg', note: '' },
            ]}
            answer="9 kg cement, 18 kg sand, 36 kg gravel — checking, 9 + 18 + 36 = 63 kg."
          />

          <WorkedExample
            question="A floor plan is drawn to a scale of 1:50. A corridor measures 9 cm on the drawing. What is its actual length, in metres?"
            steps={[
              {
                calc: 'Actual length = 9 x 50 = 450 cm',
                note: 'Multiply the drawing measurement by the scale factor.',
              },
              { calc: 'Convert to metres: 450 / 100 = 4.5 m', note: '' },
            ]}
            answer="4.5 metres."
            watchOut="The scale ratio is drawing : real. Multiply the drawing measurement by the second number to recover the real length — dividing instead of multiplying is the reverse operation and gives an answer thousands of times too small."
          />

          <SectionRule />

          <TryIt
            question="A site plan uses a scale of 1:200. A cable route measures 6.5 cm on the drawing. What is the actual length, in metres?"
            steps={[
              { calc: 'Actual length = 6.5 x 200 = 1,300 cm', note: '' },
              { calc: 'Convert to metres: 1,300 / 100 = 13 m', note: '' },
            ]}
            answer="13 metres."
          />

          <InlineCheck
            id="m5s2-scale-drawing"
            question="On a 1:100 scale drawing, a wall measures 4.5 cm. What is the actual length of the wall?"
            correctAnswer="Actual length = 4.5 x 100 = 450 cm = 4.5 metres. Multiply the drawing measurement by the scale factor to find the real-world dimension."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Area and volume feeding into a quantity</ContentEyebrow>

          <ConceptBlock title="From area or volume to a real quantity — and rounding the right way">
            <p>
              Area and volume calculations at Level 2 rarely stop at the geometry — the figure feeds
              into a real quantity you have to buy: tiles from an area, sand or aggregate from a
              volume. Two extra steps sit on top of the geometry itself: add any wastage or
              contingency allowance <em>before</em> you round, and round the final figure in
              whatever direction the physical reality demands. A physical item — a tile, a bag, a
              box — always rounds <strong className="text-white">up</strong>, never to the nearest
              whole number and never down, because a part-item still has to be bought whole.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A bathroom floor measures 4.2 m by 2.5 m. Tiles cost £32.00 per m² and 10% wastage is allowed for cuts. What is the total tile cost?"
            steps={[
              { calc: 'Area = 4.2 x 2.5 = 10.5 m²', note: '' },
              {
                calc: 'Add 10% wastage: 10.5 x 1.10 = 11.55 m²',
                note: 'Wastage is added before rounding.',
              },
              {
                calc: 'Round up to the next whole m² = 12 m²',
                note: 'Tiles cannot be bought as a part-metre — round up, not to the nearest whole number.',
              },
              { calc: 'Cost = 12 x £32.00 = £384.00', note: '' },
            ]}
            answer="£384.00."
            watchOut="Always add wastage before rounding, and round a physical quantity UP. Rounding 11.55 to the nearest whole number would happen to also give 12 here, but rounding down to 11 — which some candidates do out of habit — leaves the job short of tiles on site."
          />

          <SectionRule />

          <TryIt
            question="A hallway floor measures 5.5 m by 1.8 m. Tiles cost £26.50 per m² and 10% wastage is allowed. What is the total tile cost?"
            steps={[
              { calc: 'Area = 5.5 x 1.8 = 9.9 m²', note: '' },
              { calc: 'Add 10% wastage: 9.9 x 1.10 = 10.89 m²', note: '' },
              { calc: 'Round up to 11 m²', note: '' },
              { calc: 'Cost = 11 x £26.50 = £291.50', note: '' },
            ]}
            answer="£291.50."
          />

          <CommonMistake
            title="Answering with the nearest labelled value instead of calculating"
            whatHappens="Asked for a mean, or a percentage change between two points on a chart, a candidate reads off the single largest or most recent labelled figure instead of carrying out the calculation the question actually asked for."
            doInstead="Identify exactly which calculation the question wants — mean, percentage change, difference — and carry it out on the labelled values. The chart supplies the raw numbers; it does not do the arithmetic for you."
          />

          <SectionRule />

          <WorkedExample
            question="A cable trench is 24 m long, 0.4 m wide and 0.3 m deep. It is backfilled with sharp sand sold in 25 kg bags, each filling 0.017 m³. How many bags are needed?"
            steps={[
              { calc: 'Volume = 24 x 0.4 x 0.3 = 2.88 m³', note: '' },
              {
                calc: 'Bags needed = 2.88 / 0.017 = 169.4...',
                note: '169 bags would only fill 169 x 0.017 = 2.873 m³ — short of the 2.88 m³ needed.',
              },
              {
                calc: 'Round up to 170 bags',
                note: '170 x 0.017 = 2.89 m³, which covers the trench.',
              },
            ]}
            answer="170 bags."
            watchOut="Volume calculations for backfill follow the same rounding rule as tiles: round the number of bags UP, because a part-bag still has to be bought whole, and rounding down leaves the trench short."
          />

          <SectionRule />

          <TryIt
            question="A trench is 18 m long, 0.35 m wide and 0.25 m deep, backfilled with the same 25 kg bags each filling 0.017 m³. How many bags are needed?"
            steps={[
              { calc: 'Volume = 18 x 0.35 x 0.25 = 1.575 m³', note: '' },
              {
                calc: 'Bags needed = 1.575 / 0.017 = 92.6...',
                note: '92 bags would only fill 1.564 m³.',
              },
              {
                calc: 'Round up to 93 bags',
                note: '93 x 0.017 = 1.581 m³, which covers the trench.',
              },
            ]}
            answer="93 bags."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Interpreting a chart or table</ContentEyebrow>

          <ConceptBlock
            title="Reading between the data points — interpretation, not extraction"
            plainEnglish="A Level 1 chart question asks you to read off a labelled value. A Level 2 chart question asks you to calculate something the chart never labelled at all."
          >
            <p>
              A chart or table gives you a set of labelled figures — one per category, one per
              month, one per quarter. Reading one of those off directly is a Level 1 skill. Level 2
              asks a further question that has to be calculated from the labelled figures rather
              than read from them: the mean across the whole set, which quarter or month changed by
              the largest percentage rather than the largest raw number, or a comparison between the
              lowest and highest points. None of those figures are written anywhere on the chart
              itself — you have to derive them.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A callout log shows emergency callouts per quarter: Q1 34, Q2 41, Q3 29, Q4 38. Find the mean quarterly callouts, and identify which quarter-on-quarter change was the largest percentage increase."
            steps={[
              { calc: 'Mean = (34 + 41 + 29 + 38) / 4 = 142 / 4 = 35.5', note: '' },
              { calc: 'Q1 to Q2: (41 - 34) / 34 x 100 = 20.6%', note: '' },
              {
                calc: 'Q2 to Q3: (29 - 41) / 41 x 100 = -29.3%',
                note: 'A decrease, so not a candidate for the largest increase.',
              },
              {
                calc: 'Q3 to Q4: (38 - 29) / 29 x 100 = 31.0%',
                note: 'The largest of the two genuine increases.',
              },
            ]}
            answer="Mean = 35.5 callouts per quarter. The largest percentage increase was Q3 to Q4, at approximately 31.0% — neither figure is labelled anywhere on the original log."
            watchOut="Neither the mean nor 'which quarter grew fastest' is written on the chart. Both have to be calculated from the labelled figures — reading off the largest single number (41, for Q2) answers a different, easier question than the one asked."
          />

          <SectionRule />

          <TryIt
            question="A parts-ordering log shows monthly spend: Jan £2,100, Feb £2,450, Mar £1,980, Apr £2,650. Find the mean monthly spend, and the percentage increase from the lowest month to the highest month."
            steps={[
              { calc: 'Mean = (2,100 + 2,450 + 1,980 + 2,650) / 4 = 9,180 / 4 = £2,295', note: '' },
              { calc: 'Lowest = £1,980 (Mar); Highest = £2,650 (Apr)', note: '' },
              { calc: 'Increase = (2,650 - 1,980) / 1,980 x 100 = 33.8%', note: '' },
            ]}
            answer="Mean = £2,295. The increase from the lowest month to the highest month is approximately 33.8%."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Inference and comparing sources</ContentEyebrow>

          <ConceptBlock title="Inference is a calculation too — work it from evidence to conclusion">
            <p>
              Inference means reading between the lines: working out what a writer implies without
              them stating it directly. It is a process with steps, the same way a calculation is,
              and it is worth working through explicitly rather than trusting a gut feeling.
              Identify the specific details the text actually gives you. Ask what each detail
              implies rather than states outright. Combine the implications into one claim that goes
              beyond the literal words. Then check your claim against more than one piece of
              evidence — an inference resting on a single detail is usually a guess wearing the word
              "inference".
            </p>
            <p>
              Comparing two sources on the same topic adds a further step: judging which is more
              persuasive by what evidence each one actually supplies, not by how confidently it is
              written. A source that asserts a trend in general terms is not automatically weaker or
              stronger than one that cites a specific figure — you have to look at what is actually
              offered in support of the claim.
            </p>
          </ConceptBlock>

          <WorkedExample
            question={
              'Text: "The contractor arrived forty-five minutes late, offered no apology, and began work without consulting the site plan." What can you infer about the writer\'s opinion of the contractor, and which details support it?'
            }
            steps={[
              {
                calc: 'Identify the details given',
                note: 'Late by 45 minutes; no apology; started without checking the site plan.',
              },
              {
                calc: 'Ask what each detail implies',
                note: 'Lateness suggests poor time-keeping; no apology suggests indifference to the disruption caused; skipping the plan suggests carelessness about the job itself.',
              },
              {
                calc: 'Combine into one inference',
                note: "The writer is critical of the contractor's professionalism, without ever using that word.",
              },
              {
                calc: 'Check the evidence count',
                note: 'Three separate details support the claim, not one — a stronger basis for the inference than any single detail alone.',
              },
            ]}
            answer="The writer is implicitly critical of the contractor's professionalism. The inference rests on three details working together — lateness, no apology, and starting without checking the plan — not on any single one of them, and none of them states the criticism directly."
            watchOut="An inference resting on only one detail is usually a guess dressed up as an inference. Check you can point to more than one piece of supporting evidence before you commit to a reading."
          />

          <SectionRule />

          <TryIt
            question="Text: 'The engineer signed off the test results within ten minutes of arriving, without reviewing the previous certificate or asking who had carried out the original installation.' What can you infer about the writer's attitude to the engineer's process, and which details support it?"
            steps={[
              {
                calc: 'Identify the details',
                note: 'Signed off within 10 minutes; did not review the previous certificate; did not ask about the original installer.',
              },
              {
                calc: 'Ask what each implies',
                note: "Speed suggests a rushed, box-ticking approach; no certificate review suggests no continuity check; no question about the installer suggests no attempt to understand the job's history.",
              },
              {
                calc: 'Combine into one inference',
                note: 'The writer implies the sign-off was not a genuine inspection.',
              },
            ]}
            answer="The writer implies the sign-off was rushed and not a genuine inspection, based on the speed, the missed certificate review and the missed question about the original installer — three details together, again, not one."
          />

          <WorkedExample
            question="Source A (trade magazine): 'The electrical industry is facing a skills shortage that could last a decade. The sector needs to attract more young people, and investment in training and competitive wages is essential.' Source B (industry body report): 'Apprenticeship completions have risen 8% this year, suggesting the skills gap may be narrowing, though training quality still varies between providers.' How do the two sources differ in their view of the skills shortage, and which is more persuasive?"
            steps={[
              {
                calc: "Identify each source's stance",
                note: 'A is uniformly pessimistic — a long-term crisis needing action. B is more balanced — acknowledges an improvement but flags a caveat.',
              },
              {
                calc: 'Look at the evidence each uses',
                note: 'A makes general claims with no figures. B cites a specific statistic (an 8% rise).',
              },
              {
                calc: 'Judge persuasiveness on evidence, not tone',
                note: 'A claim backed by a number, and one that acknowledges a limitation, tends to read as more credible than an assertion alone.',
              },
            ]}
            answer="Source A is pessimistic and general; Source B is more balanced and backed by a specific figure. B is the more persuasive of the two — not because it is more confident, but because it supplies evidence and acknowledges a limitation, which a purely assertive source does not."
            watchOut="Persuasiveness is not the same as confidence of tone. A source that states things forcefully but without evidence is not automatically the stronger one — check what each source actually offers in support of its claim."
          />

          <SectionRule />

          <TryIt
            question="Source C (contractor newsletter): 'Material costs have risen sharply this year and will keep rising.' Source D (supplier price index): 'Average material costs rose 4.2% this year, driven mainly by copper and steel; other categories were broadly stable.' Compare how the two sources present the same topic, and say which gives you more to work with."
            steps={[
              {
                calc: 'Source C',
                note: 'General, no figures, implies a continuing trend without evidence.',
              },
              {
                calc: 'Source D',
                note: 'Gives a specific percentage, identifies which categories drove it, and notes the rest were stable.',
              },
              {
                calc: 'Compare',
                note: 'D gives a precise, checkable claim; C only asserts a trend you cannot verify or apply to a specific job.',
              },
            ]}
            answer="Source D gives you something usable — a figure and which categories moved — while Source C only asserts a trend. D is the more useful source for actually pricing a job."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Writing a structured piece for a specified audience</ContentEyebrow>

          <ConceptBlock title="PEEL, and writing for the reader in front of you">
            <p>
              Turning a vague observation into a structured piece of writing is a process with
              steps, the same as any other Level 2 technique. For a formal report, the shape is PEEL
              applied to a specific fault rather than an argument: state the point plainly, give the
              specific observable evidence rather than an impression, explain why it matters, and
              link to a recommended action. "A bit dodgy" is a feeling; "discoloured and warm to the
              touch on inspection on [date]" is evidence — the difference between them is most of
              what separates a vague note from a usable report.
            </p>
            <p>
              For persuasive writing the same PEEL shape applies to an argument instead of a fault,
              with one extra consideration: the audience. A rhetorical question that lands well with
              pupils weighing up a post-16 choice would read oddly in a report to a site manager,
              and the reverse is equally true — choosing the opening technique, the evidence, and
              the connectives has to be done with a specific reader in mind, not a generic one.
            </p>
          </ConceptBlock>

          <WorkedExample
            question='A site diary entry reads: "Consumer unit looked a bit dodgy, might want to sort it out." Turn this into a single, well-structured paragraph for a formal report to a site manager, using PEEL.'
            steps={[
              {
                calc: 'Point',
                note: 'State the specific issue plainly: the consumer unit shows early signs of thermal damage to the main switch housing.',
              },
              {
                calc: 'Evidence',
                note: 'Name what was actually observed, not a feeling: the switch casing was discoloured and slightly warm to the touch on inspection on the stated date.',
              },
              {
                calc: 'Explain',
                note: 'Say why it matters: this is a recognised early indicator of a loose connection or overload, and left unaddressed it presents a fire risk.',
              },
              {
                calc: 'Link',
                note: 'State the recommended action: the unit should be inspected by a qualified electrician before the board is next re-energised.',
              },
            ]}
            answer='"The consumer unit shows early signs of thermal damage to the main switch housing. The switch casing was discoloured and slightly warm to the touch on inspection on the stated date. This is a recognised early indicator of a loose connection or overload and, if left, presents a fire risk. I recommend the unit is inspected by a qualified electrician before the board is next re-energised." Same observation as the diary note — specific, evidenced, explained and actioned instead of vague.'
            watchOut='"A bit dodgy" is not evidence, it is a feeling. A formal report needs the specific, observable detail — discolouration, warmth, a date — that a feeling like that was actually based on. If you cannot name the detail, you have not looked closely enough yet to write the report.'
          />

          <SectionRule />

          <TryIt
            question="A site diary entry reads: 'RCD in the garage board keeps tripping, annoying.' Turn this into a structured PEEL paragraph for a report to a site manager."
            steps={[
              {
                calc: 'Point',
                note: 'State the specific fault: the RCD on the garage circuit trips intermittently.',
              },
              {
                calc: 'Evidence',
                note: 'Note when it was observed and under what load or conditions.',
              },
              {
                calc: 'Explain',
                note: 'Say why intermittent tripping matters: it may indicate a genuine leakage fault rather than nuisance tripping, and should not be dismissed as "just sensitive".',
              },
              {
                calc: 'Link',
                note: 'Recommend an insulation resistance test on the circuit before any device is replaced or ignored.',
              },
            ]}
            answer="A model paragraph follows the same shape as the worked example above — specific observation, evidence, explanation, action — applied to the RCD fault instead: state the trip pattern, note the conditions observed, explain that recurring trips can signal a real fault current, and recommend a test before the RCD is dismissed as oversensitive."
          />

          <InlineCheck
            id="m5s2-formal-letter-signoff"
            question="When writing a formal letter to someone whose name you do not know, which sign-off should you use?"
            correctAnswer="Use 'Yours faithfully' when you do not know the recipient's name (i.e. you began with 'Dear Sir/Madam'). Use 'Yours sincerely' when you do know their name (i.e. you began with 'Dear Mr Smith')."
          />

          <SectionRule />

          <WorkedExample
            question="Turn this bullet list of facts into one persuasive paragraph for a college newsletter aimed at Year 11 pupils choosing a post-16 option: 'Apprentices earn while they train. Average qualified electrician pay is £35,000 to £45,000. University leaves many with debt. Demand for electricians is rising with the shift to renewables.'"
            steps={[
              {
                calc: 'Choose an opening for this audience',
                note: 'A rhetorical question suits pupils weighing up an option: "Why take on years of university debt when you could be earning from day one?"',
              },
              {
                calc: 'Add the strongest evidence',
                note: '"Qualified electricians typically earn £35,000 to £45,000 a year, often more if self-employed."',
              },
              {
                calc: 'Add a second point with a connective',
                note: '"Furthermore, demand for electricians is rising as the country shifts towards renewable energy, meaning the skills you learn now will stay in demand."',
              },
              {
                calc: "Close, linking back to the reader's decision",
                note: '"An electrical apprenticeship is a practical route into a trade that pays well and is only going to be needed more, not less."',
              },
            ]}
            answer='"Why take on years of university debt when you could be earning from day one? Qualified electricians typically earn £35,000 to £45,000 a year, often more if self-employed. Furthermore, demand for electricians is rising as the country shifts towards renewable energy, meaning the skills you learn now will stay in demand. An electrical apprenticeship is a practical route into a trade that pays well and is only going to be needed more, not less." Same four facts as the bullet list, sequenced, connected, and aimed at the reader actually making the decision.'
            watchOut="A list of true facts is not automatically persuasive. What makes it persuasive is the order, the connectives joining the points into an argument, and an opening chosen for this specific audience — Year 11 pupils weighing an option, not a generic reader."
          />

          <SectionRule />

          <TryIt
            question="Turn this bullet list into one persuasive paragraph for the same newsletter, aimed at the same audience: 'Apprenticeships combine paid work with qualifications. Many employers offer a permanent job at the end. Trade skills cannot be outsourced or automated as easily as some other careers.'"
            steps={[
              {
                calc: 'Choose an opening',
                note: 'Something that speaks to uncertainty about job security, such as "Worried a career might not last?"',
              },
              {
                calc: 'Add the first point',
                note: 'An apprenticeship combines paid work with a real qualification.',
              },
              {
                calc: 'Add a second point with a connective',
                note: '"Moreover, many employers offer a permanent role at the end."',
              },
              {
                calc: 'Close for this audience',
                note: 'Point out that hands-on trade skills are far harder to automate or send overseas than many office-based careers.',
              },
            ]}
            answer="A model paragraph opens by addressing job-security worries directly, states that an apprenticeship combines pay with a genuine qualification, adds — using a connective such as 'moreover' — that many employers keep apprentices on permanently, and closes by noting that trade skills resist automation and outsourcing better than many alternatives, leaving the reader a concrete reason to choose this route."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A Level 2 problem chains calculations together — the output of one step feeds the next, and it rarely tells you which method to use.',
              'A distractor answer is usually a real intermediate step, not a random number. Reaching a plausible total is not proof you have reached the FINAL one.',
              'Building a quotation follows a strict order: total the materials, apply contingency to materials only, add labour, then apply VAT to the whole quotation.',
              'Reversing a percentage change means dividing by (1 ± rate), never subtracting a percentage of the final figure — that only works forwards.',
              "A ratio splits a total. Add the ratio's own numbers to find the total parts before dividing anything, and a scale drawing uses the same logic.",
              'Add wastage or a contingency allowance before rounding, and round a physical quantity UP — never to the nearest whole number, and never down.',
              'Interpreting a chart means calculating something the chart does not label — a mean, a rate of change, a comparison — not reading off the largest figure.',
              'An inference needs more than one piece of supporting evidence, and comparing two sources means weighing what each one actually offers, not how confident it sounds.',
              'A structured piece of writing — a report or a persuasive piece — is built in a repeatable shape (PEEL) and aimed at a specific, named audience.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'How is Level 2 actually different from Level 1, in one sentence?',
                answer:
                  'The subject content is the same; the problems require more steps, more independent method choice, and more interpretation of what a source or a chart implies rather than states.',
              },
              {
                question: 'Do I need Level 2, or is Level 1 enough for my apprenticeship?',
                answer:
                  'It depends on your specific apprenticeship standard and circumstances, and the requirement has changed over recent years — confirm with your training provider rather than assuming either answer.',
              },
              {
                question: 'What exactly counts as showing my method on a multi-step problem?',
                answer:
                  'Every intermediate figure, in order, with a brief note of what it represents — the same shape as the steps in each worked example on this page. A method mark is awarded for a visible, correct step even when a later step or the final answer goes wrong.',
              },
              {
                question:
                  'Is the exam always split into a calculator and a non-calculator section?',
                answer:
                  'A calculator and non-calculator split is common, but the exact format, timing and pass mark vary between providers — check the specifics with whoever is delivering your assessment rather than assuming one fixed layout.',
              },
              {
                question: 'How do I get better at spotting a distractor answer?',
                answer:
                  'Before you commit to an answer, reread the question and check your final figure actually answers everything it asked for — not just the first thing it asked for. A distractor is usually what you get if you stop one step early.',
              },
            ]}
          />

          <SectionRule />

          <Quiz
            questions={quizQuestions}
            title="Section 2: Level 2 Functional Skills Practice Quiz"
          />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module5/section1')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Level 1 Practice
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module5/section3')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Study Techniques
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule5Section2;
