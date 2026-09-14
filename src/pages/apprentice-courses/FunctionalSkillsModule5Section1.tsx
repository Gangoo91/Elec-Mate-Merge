/**
 * Functional Skills · Module 5 · Section 1 — Level 1 Functional Skills practice
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 * This is the practice page for Level 1: its job is to put questions in front
 * of a learner, not to explain the subject in the abstract. The old page was
 * 1,531 lines of mostly prose describing exam formats; this pass keeps the
 * subject teaching but converts the bulk of the page into worked, trade-set
 * practice — 13 WorkedExample blocks and 12 TryIt blocks against 8
 * ConceptBlocks, one per section. Every ConceptBlock is followed immediately
 * by a WorkedExample that applies exactly what it just taught, and then a
 * TryIt so the learner does the same thing themselves.
 *
 * No awarding body is named anywhere on this page. None has been confirmed
 * for this cohort. The subject content taught below — number, measures, data
 * handling, reading, writing, digital skills — is the Ofqual Functional
 * Skills subject content, which is common to every awarding body. Where the
 * old page stated an assessment FORMAT detail as fact (paper length, the
 * calculator/non-calculator split, pass marks) that content has been
 * generalised to "this varies by awarding body — confirm the format with
 * your training provider", because those details are set by each board
 * separately and none has been confirmed here.
 *
 * 🔴 THE LEVEL 1 / LEVEL 2 CONTRADICTION (flagged by Andrew, resolved here,
 * not decided): the old page asserted "providers require Level 2, but Level
 * 1 is the minimum gateway qualification" as a flat rule. Section 2 of this
 * module asserts the opposite flat rule — that Level 2 is required to
 * complete an electrical apprenticeship. Neither flat rule is written here.
 * Section 01 below states the true position: Level 1 and Level 2 are two
 * levels of the same qualification; which one (or both) an apprentice needs
 * depends on their specific apprenticeship standard, and sometimes on age and
 * prior qualifications too — English and maths requirements for
 * apprenticeships have changed more than once in recent years and are not
 * uniform across standards. The page tells the learner to confirm their own
 * requirement with their training provider rather than assume either
 * direction. This does not resolve the contradiction with Section 2 — that
 * needs a single decision once the awarding body and standard are confirmed —
 * but it stops this page asserting either half of it as fact.
 *
 * Preserved verbatim, as required: the 8-question quiz bank (same questions,
 * options, correctAnswer indices — ids unchanged) and all 3 InlineCheck
 * components (ids added: m5s1-calculator-section, m5s1-english-components,
 * m5s1-ict-fitness). Note that quiz question 1 and the first InlineCheck both
 * state a specific paper length / calculator-section split as fact. That is
 * an assessment-format detail that in fact varies by awarding body — it has
 * been left exactly as it was because the quiz bank and InlineChecks were
 * required to be preserved verbatim, not rewritten. It should be reviewed
 * once an awarding body is confirmed for this cohort. No other format claim
 * of this kind was added elsewhere on the page; the surrounding prose treats
 * timings and splits as varying by board throughout.
 *
 * Deliberately NOT using <RegsCallout> — this page is Functional Skills, not
 * BS 7671, and carries no regulation numbers to render as quoted clause text.
 *
 * No competent person scheme or commercial software product is named.
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

const TITLE = 'Level 1 Functional Skills Practice - Module 5.1';
const DESCRIPTION =
  'Practice questions in Maths, English and digital skills at Level 1 standard, set in electrical trade contexts: whole numbers, fractions, percentages, area, unit conversion, reading tables and charts, reading comprehension and writing for purpose.';

const quizQuestions = [
  {
    id: 1,
    question:
      'Functional Skills Maths papers are normally split into a non-calculator section and a calculator section. What does that mean for how you prepare?',
    options: [
      'Nothing much — a calculator is available for the whole paper',
      'You need to be able to work on paper and in your head, not only key numbers in',
      'Calculators are banned entirely, so only mental arithmetic matters',
      'It affects the English assessment rather than the Maths one',
    ],
    correctAnswer: 1,
    explanation:
      'Part of the paper has to be done without a calculator, so arithmetic you can only do by keying it in is arithmetic you cannot rely on. Practise the non-calculator methods — lining up decimal points, finding a percentage by dividing by 100, estimating before you calculate — until they are quicker than reaching for a calculator would be. The exact split, the timings and the section names vary between awarding bodies, so confirm the format of YOUR assessment with your training provider rather than assuming.',
  },
  {
    id: 2,
    question: 'In a Level 1 English writing task, which of the following is most important?',
    options: [
      'Writing as much as you can regardless of quality',
      'Using as many long words as possible',
      'Writing clearly with correct spelling, grammar, and punctuation',
      'Using complex sentence structures throughout',
    ],
    correctAnswer: 2,
    explanation:
      'At Level 1, clarity and accuracy are paramount. Assessors look for correct spelling, grammar, and punctuation alongside clear communication of ideas appropriate to the audience and purpose.',
  },
  {
    id: 3,
    question: 'A cable costs £2.45 per metre. How much would 12 metres cost?',
    options: ['£28.40', '£24.50', '£30.00', '£29.40'],
    correctAnswer: 3,
    explanation:
      '£2.45 multiplied by 12 = £29.40. Break it down: £2 x 12 = £24, then £0.45 x 12 = £5.40, giving a total of £24 + £5.40 = £29.40.',
  },
  {
    id: 4,
    question: 'Which reading skill is assessed in the Level 1 English reading exam?',
    options: [
      'Identifying main points, details, and understanding purpose',
      'Memorising whole passages of text word for word',
      'Writing a long essay in response to each text',
      'Correcting the spelling and grammar within the text',
    ],
    correctAnswer: 0,
    explanation:
      'Level 1 reading assesses your ability to identify main points, extract relevant details, and understand the purpose and audience of different texts. You must refer back to the text for your answers.',
  },
  {
    id: 5,
    question: 'What fraction of an hour is 45 minutes?',
    options: ['2/3', '3/4', '4/5', '1/2'],
    correctAnswer: 1,
    explanation:
      '45 minutes out of 60 minutes = 45/60 = 3/4 of an hour. This is a common conversion used in timesheets and job costing for electrical work.',
  },
  {
    id: 6,
    question: "In the Level 1 ICT assessment, what does 'fitness for purpose' mean?",
    options: [
      'The document uses every formatting feature the software offers',
      'The document is saved in as many file formats as possible',
      'The document is suitable for its intended audience and use',
      'The document is as long and detailed as it can possibly be',
    ],
    correctAnswer: 2,
    explanation:
      'Fitness for purpose means your document is appropriate for its intended audience and use. A safety notice should be clear and direct, whilst a formal letter should use professional language and layout.',
  },
  {
    id: 7,
    question: 'If a room is 4.5 m by 3.2 m, what is its area?',
    options: ['7.7 m²', '14.04 m²', '15.4 m²', '14.4 m²'],
    correctAnswer: 3,
    explanation:
      'Area = length x width = 4.5 x 3.2 = 14.4 m². Area calculations are essential for electrical work such as determining lighting layouts and cable run requirements.',
  },
  {
    id: 8,
    question: 'Which time management strategy is most effective during an exam?',
    options: [
      'Allocate time per question based on marks available',
      'Answer questions in random order',
      'Spend all your time on the first question to get it perfect',
      'Skip the instructions and start answering immediately',
    ],
    correctAnswer: 0,
    explanation:
      'Allocating time based on marks available ensures you give appropriate attention to higher-value questions whilst still attempting every question on the paper.',
  },
];

const FunctionalSkillsModule5Section1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 1"
        title="Level 1 Functional Skills practice"
        backTo="/study-centre/apprentice/functional-skills/module5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            This page is for doing, not just reading. Level 1 Functional Skills tests whether you
            can use ordinary maths, English and digital skills on ordinary tasks — a cable order, a
            site notice, a spreadsheet, a short email. Every technique below is taught once and then
            practised twice: a worked example shows you the method, and a try-it hands you the same
            job with different numbers so you find out whether it actually stuck.
          </p>

          <LearningOutcomes
            outcomes={[
              'Work out, for your own circumstances, whether Level 1 or Level 2 (or both) is what your apprenticeship actually requires — rather than assume from what someone else needed.',
              'Do whole-number and decimal arithmetic on real quantities — cable, clips, hours, pay — without a calculator, and know where the decimal point actually belongs.',
              'Find a fraction or a percentage of a quantity and apply it to a trade-realistic figure, such as a cable drum or a discounted invoice.',
              'Calculate an area, and convert confidently between millimetres, metres, grams and kilograms.',
              'Read a value correctly off a price table and off a simple chart, and calculate a mean average from a small data set.',
              'Read a short workplace document — a notice or an email — and locate the exact answer to a specific question rather than guess at the gist.',
              'Plan and write a short, clear message for a specific reader and purpose, choosing a tone that fits the reader rather than the habit.',
              'Produce a simple document or spreadsheet that is fit for its purpose, and know what makes a digital document fail that test.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Basic number confidence',
                gist: 'You do not need to already be fluent — you need to not be a total stranger to adding, multiplying and working with money. Everything here starts from that point.',
              },
              {
                term: 'Module 1',
                gist: 'Percentages and ratios reappear constantly in this section. You do not need them mastered, but they should not be unfamiliar.',
              },
            ]}
          />

          <TLDR
            points={[
              'Level 1 and Level 2 are two levels of the same qualification. Which one your apprenticeship requires depends on your specific standard, and sometimes your age and prior qualifications — confirm it with your training provider rather than assume.',
              'Exact paper lengths, the calculator/non-calculator split, and pass marks all vary by awarding body. Treat any specific figure as something to confirm with your provider, not a fixed universal fact.',
              'In whole-number and decimal work, break a calculation into parts you can do in your head, and always ask whether the final answer is a sensible size for the job.',
              'A fraction of a quantity is: divide by the bottom number, multiply by the top. A percentage of a quantity is: divide by 100, multiply by the percentage.',
              'Area is length times width. For physical items — lights, cable, clips — always round up; you cannot install a fraction of one.',
              'Reading a table or chart is a two-step skill: find the exact row or bar that matches your description, then read across or up. Most errors are reading the row next to the right one.',
              'Reading comprehension marks come from the text itself. Scan for the specific word or number the question is asking about rather than reading the whole passage for a feeling.',
              'Good writing at Level 1 is planned before it is written, matched in tone to its reader, and organised around the one thing the reader needs to know or do.',
              'A digital document is fit for purpose when it serves its reader, not when it uses every feature the software has.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · What Level 1 tests, and what it requires of you</ContentEyebrow>

          <ConceptBlock
            title="Two levels of the same qualification — and only your provider knows which you need"
            onSite="If a colleague tells you what they needed, that tells you what THEIR standard required. It does not tell you what yours does."
          >
            <p>
              Functional Skills in Maths and English come in more than one level, and Level 1 and
              Level 2 are not competing qualifications — they are two points on the same ladder,
              testing the same three areas (number, measures and data; reading and writing; and, on
              many programmes, digital skills) at different degrees of complexity. Level 1 sits
              below Level 2, and is often described as sitting roughly between older GCSE grades D
              and G. It is a genuine qualification in its own right, not a consolation prize for not
              reaching Level 2.
            </p>
            <p>
              What is genuinely true across every electrical apprenticeship: you will need at least
              Level 1 in English and Maths at some point in your programme, because it is set as an
              entry gate before an apprentice can move on to their End-Point Assessment. What is
              <strong className="text-white"> not</strong> the same for every apprentice is whether
              Level 2 is also required, and by when. Different apprenticeship standards set their
              own requirements, and English and maths requirements for apprenticeships generally
              have changed more than once in recent years — a rule that applied to an apprentice who
              started two years ago is not guaranteed to be the rule that applies to you now. Some
              apprentices are also exempt from sitting a level again if they already hold a GCSE
              grade 4 (or the equivalent grade C) or above, but that too depends on the standard and
              the provider's own policy.
            </p>
            <p>
              The content standards for Functional Skills — what is actually taught and tested at
              each level — are set by Ofqual, the qualifications regulator, and are common to every
              awarding body. How the assessment is delivered — the number of papers, exact timings,
              the calculator/non-calculator split, pass marks — is set separately by each awarding
              body and does genuinely vary. Your training provider will confirm both which levels
              you personally need and which board is delivering your assessment; neither is
              something to guess at or take on a colleague's word.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Your training provider's induction pack says: 'All apprentices must achieve Level 1 in English and Maths before starting their End-Point Assessment window. Your specific electrical apprenticeship standard also sets its own requirement for Level 2, which your tutor will confirm individually.' Work out, step by step, exactly what that means for you."
            steps={[
              {
                calc: 'Separate the two statements',
                note: 'There are two different requirements named here, not one requirement stated twice: a Level 1 gate before EPA, and a separate, standard-specific Level 2 requirement.',
              },
              {
                calc: 'Note what each one controls',
                note: 'Level 1 controls whether you can start your End-Point Assessment window at all. Level 2 (where it applies) is set by your specific standard, and the pack tells you explicitly that it is confirmed individually — not a fixed rule for every apprentice.',
              },
              {
                calc: 'Identify what is NOT yet known from this text alone',
                note: 'The pack does not tell you whether YOUR standard requires Level 2, or by when. That is a specific fact about your own apprenticeship agreement, not a general one.',
              },
              {
                calc: 'Decide the action, not just the interpretation',
                note: 'Sit Level 1 early regardless, since it gates EPA on every standard. Separately, ask your tutor to confirm in writing whether your standard also requires Level 2, and by what date.',
              },
            ]}
            answer="Level 1 is a universal gate to EPA and should be treated as non-negotiable and early. Level 2 depends on your specific standard and is confirmed individually — get that confirmation in writing rather than assuming either way."
            watchOut="Do not read 'Level 1 is required' as 'Level 1 is all that is required'. The two sentences answer different questions, and conflating them is exactly how apprentices end up discovering a Level 2 requirement late, with less time to meet it."
          />

          <SectionRule />

          <TryIt
            question="A colleague on a different apprenticeship tells you: 'Don't worry about Level 2, only Level 1 matters — that's all I needed.' Using the same method as above, work out how you would actually check whether that applies to you."
            steps={[
              {
                calc: 'Name what the statement assumes',
                note: 'It assumes every apprenticeship standard sets an identical requirement. Nothing in the passage above supports that assumption — if anything, it says the opposite.',
              },
              {
                calc: 'Identify the variable your colleague cannot speak to',
                note: 'Your colleague can tell you what THEIR standard required. They cannot tell you what YOURS requires, because standards, and sometimes age and prior qualifications, differ between apprentices.',
              },
              {
                calc: 'Identify the one source that can actually answer it',
                note: 'Your own training provider or tutor, referring to your own apprenticeship agreement or standard — not a colleague, however well-meaning.',
              },
            ]}
            answer="Ask your own training provider to confirm, in writing, exactly which level(s) your specific apprenticeship standard requires and by when. A colleague's experience is a data point about their apprenticeship, not a rule about yours."
          />

          <CommonMistake
            title="Assuming your requirement from what someone else needed"
            whatHappens="Two apprentices compare notes, one says they only needed Level 1, and the other quietly assumes the same is true for them — without checking that they are on the same standard, of the same age, or holding the same prior qualifications."
            doInstead="Get your own requirement confirmed in writing, early, directly from your training provider. It costs one email and removes a genuine risk of discovering a Level 2 requirement with too little time left to meet it."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Whole numbers, decimals and money</ContentEyebrow>

          <ConceptBlock title="Breaking a calculation into pieces you can actually hold in your head">
            <p>
              Most Level 1 non-calculator arithmetic is not difficult in itself — it becomes
              difficult when you try to do it as one large step instead of several small ones. The
              reliable method is to split a multiplication into a round number and a remainder,
              solve each piece, then add them back together. £15 x 8 is easy on its own; so is £3 x
              4. Doing £15.37 x 8 in one leap is where mistakes creep in, so the same splitting
              technique — £15 x 8, then £0.37 x 8, then add — still applies once decimals are
              involved.
            </p>
            <p>
              Money adds a second habit worth building: always write the pounds and pence with two
              decimal places, and check the answer is a sensible size before you move on. £132.00 is
              a believable cost for two small deliveries of materials; £1,320.00 or £13.20 for the
              same job should make you stop and recheck, because one moved decimal place is the most
              common way a correct method produces a wrong answer.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="An electrician buys 8 rolls of cable at £15 each and 4 packs of cable clips at £3 each. What is the total cost?"
            steps={[
              { calc: 'Cable: 8 x £15', note: 'Round number, straightforward: 8 x 15 = 120.' },
              { calc: 'Clips: 4 x £3', note: '4 x 3 = 12.' },
              { calc: 'Total: £120 + £12', note: 'Add the two parts together.' },
            ]}
            answer="£132"
            watchOut="Check the answer against the job. Two small trade purchases costing £132 is believable; if your working somehow produced £1,320 or £13.20, that is a decimal-point slip, not a different correct answer."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="An electrician buys 6 reels of twin and earth at £22 each and 3 boxes of connector blocks at £4 each. What is the total cost?"
            steps={[
              {
                calc: 'Cable: 6 x £22',
                note: 'Split it: 6 x 20 = 120, 6 x 2 = 12, so 120 + 12 = 132.',
              },
              { calc: 'Connectors: 3 x £4', note: '3 x 4 = 12.' },
              { calc: 'Total: £132 + £12', note: 'Add the two parts together.' },
            ]}
            answer="£144"
          />

          <WorkedExample
            question="An electrician works 37.5 hours per week and earns £12.80 per hour. Overtime is paid at 1.5 times the normal rate. If they work 4 hours overtime one week, what is their total pay?"
            steps={[
              { calc: 'Normal pay: 37.5 x £12.80', note: '37.5 x 12.80 = £480.00.' },
              { calc: 'Overtime rate: £12.80 x 1.5', note: '12.80 x 1.5 = £19.20 per hour.' },
              { calc: 'Overtime pay: 4 x £19.20', note: '4 x 19.20 = £76.80.' },
              {
                calc: 'Total: £480.00 + £76.80',
                note: 'Add normal pay and overtime pay together.',
              },
            ]}
            answer="£556.80"
            watchOut="The overtime RATE (£19.20) is not the overtime PAY (£76.80). Multiplying the hourly rate by the multiplier gives you a new rate; you still have to multiply that rate by the hours worked to get an amount of money."
          />

          <SectionRule />

          <TryIt
            question="An electrician works 35 hours per week at £13.40 per hour. Overtime is paid at 1.5 times the normal rate. If they work 6 hours overtime one week, what is their total pay?"
            steps={[
              { calc: 'Normal pay: 35 x £13.40', note: '35 x 13.40 = £469.00.' },
              { calc: 'Overtime rate: £13.40 x 1.5', note: '13.40 x 1.5 = £20.10 per hour.' },
              { calc: 'Overtime pay: 6 x £20.10', note: '6 x 20.10 = £120.60.' },
              {
                calc: 'Total: £469.00 + £120.60',
                note: 'Add normal pay and overtime pay together.',
              },
            ]}
            answer="£589.60"
          />

          <CommonMistake
            title="Decimal errors and rounding too early"
            whatHappens="A misplaced decimal point turns £12.80 into £128.00 or £1.28 without the working looking obviously wrong at a glance — and rounding a middle step (say, an hourly rate) before using it in the next calculation compounds a small error into a larger one by the final answer."
            doInstead="Write money to two decimal places at every step, and keep full decimal values through the working — round only the final answer, and only if the question calls for it. Then ask whether the final figure is a believable size for the job."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Fractions and percentages</ContentEyebrow>

          <ConceptBlock title="A fraction of a quantity, and a percentage of a quantity, use the same shape of method">
            <p>
              Finding a fraction of a quantity is a two-step method every time: divide the quantity
              by the bottom number (the denominator), then multiply the result by the top number
              (the numerator). Three-quarters of 100 metres is 100 ÷ 4 = 25, then 25 x 3 = 75
              metres. The division tells you what one part is worth; the multiplication tells you
              what the number of parts you actually need is worth.
            </p>
            <p>
              A percentage of a quantity uses the identical shape, because a percentage is just a
              fraction out of 100: divide the quantity by 100, then multiply by the percentage
              figure. 20% of £85 is 85 ÷ 100 = 0.85, then 0.85 x 20 = £17. Once you have the
              discount amount, whether you subtract it or add it depends on the question — a
              discount is subtracted, VAT is added, and misreading which one is being asked for is a
              far more common error than the arithmetic itself.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="A job requires 3/4 of a 100-metre drum of cable. How many metres of cable are needed?"
            steps={[
              {
                calc: '100 ÷ 4',
                note: 'Divide by the denominator to find what one quarter is worth: 100 ÷ 4 = 25.',
              },
              {
                calc: '25 x 3',
                note: 'Multiply by the numerator to find three of those quarters: 25 x 3 = 75.',
              },
            ]}
            answer="75 metres"
            watchOut="Divide by the bottom number first, always — dividing by the top number by mistake gives you a completely different (and wrong) answer."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="A job requires 2/5 of a 60-metre drum of cable. How many metres of cable are needed?"
            steps={[
              { calc: '60 ÷ 5', note: 'Divide by the denominator: 60 ÷ 5 = 12.' },
              { calc: '12 x 2', note: 'Multiply by the numerator: 12 x 2 = 24.' },
            ]}
            answer="24 metres"
          />

          <WorkedExample
            nonCalculator
            question="An electrician buys cable costing £85.00. There is a 20% discount for trade customers. How much does the electrician pay?"
            steps={[
              { calc: '85 ÷ 100', note: 'Find 1% of £85: 85 ÷ 100 = 0.85.' },
              {
                calc: '0.85 x 20',
                note: 'Multiply by the percentage required: 0.85 x 20 = £17.00, the discount amount.',
              },
              {
                calc: '£85.00 − £17.00',
                note: 'Subtract the discount from the original price, since this is a discount, not an addition.',
              },
            ]}
            answer="£68.00"
            watchOut="Finding the discount amount (£17.00) is not the same as finding the final price. A surprising number of learners stop one step early and give the discount as their answer."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="An electrician buys tools costing £64.00. There is a 15% trade discount. How much does the electrician pay?"
            steps={[
              { calc: '64 ÷ 100', note: 'Find 1% of £64: 64 ÷ 100 = 0.64.' },
              {
                calc: '0.64 x 15',
                note: 'Multiply by the percentage: 0.64 x 15 = £9.60, the discount amount.',
              },
              { calc: '£64.00 − £9.60', note: 'Subtract the discount from the original price.' },
            ]}
            answer="£54.40"
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Measurement: area and unit conversion</ContentEyebrow>

          <ConceptBlock title="Area is length times width; converting units is dividing or multiplying by the right power of ten">
            <p>
              Area is one multiplication: length times width, in the same unit, giving an answer in
              that unit squared. 4.8 m x 3.5 m gives an answer in square metres, because both
              measurements were in metres before you multiplied them. The unit squared is not
              decoration on the end of the answer — it is telling you what kind of quantity you have
              worked out, and it is worth a mark on its own in a written exam.
            </p>
            <p>
              Once you have a real-world quantity to derive from an area — how many downlighters,
              how many boxes of tile, how many square metres of insulation — divide the area by
              however much one unit covers, then round to a whole number. For physical items you
              always round <strong className="text-white">up</strong>, never to the nearest whole
              number and never down, because a fitting cannot be partially installed. Converting
              between units of the same kind — millimetres to metres, grams to kilograms — is always
              a division or multiplication by the same fixed number for that pair of units (1,000
              millimetres to the metre, 1,000 grams to the kilogram), and the direction depends on
              whether you are moving from a smaller unit to a larger one (divide) or the reverse
              (multiply).
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A rectangular kitchen measures 4.8 metres by 3.5 metres. The electrician needs to install downlighters with one light per 2 m². How many downlighters are needed?"
            steps={[
              { calc: 'Area = 4.8 x 3.5', note: '4.8 x 3.5 = 16.8 m².' },
              { calc: 'Lights needed = 16.8 ÷ 2', note: '16.8 ÷ 2 = 8.4.' },
              {
                calc: 'Round up',
                note: 'You cannot install 0.4 of a light, so round up to the next whole number.',
              },
            ]}
            answer="9 downlighters"
            watchOut="8.4 rounds to 8 by normal rounding rules, but normal rounding does not apply to physical items. Always round a fitting count up, even when the decimal is below .5."
          />

          <SectionRule />

          <TryIt
            question="A rectangular office measures 6.2 metres by 4.0 metres. The electrician needs to install smoke detector coverage at one detector per 7 m². How many detectors are needed?"
            steps={[
              { calc: 'Area = 6.2 x 4.0', note: '6.2 x 4.0 = 24.8 m².' },
              { calc: 'Detectors needed = 24.8 ÷ 7', note: '24.8 ÷ 7 ≈ 3.54.' },
              { calc: 'Round up', note: 'A fraction of a detector cannot be installed.' },
            ]}
            answer="4 detectors"
          />

          <WorkedExample
            question="A cable run measures 2,750 millimetres. Express this in metres."
            steps={[
              { calc: 'Recall the conversion', note: '1 metre = 1,000 millimetres.' },
              {
                calc: '2,750 ÷ 1,000',
                note: 'Millimetres to metres is a smaller-to-larger conversion, so divide.',
              },
            ]}
            answer="2.75 metres"
          />

          <SectionRule />

          <TryIt
            question="A reel of cable weighs 4,250 grams. Express this in kilograms."
            steps={[
              { calc: 'Recall the conversion', note: '1 kilogram = 1,000 grams.' },
              {
                calc: '4,250 ÷ 1,000',
                note: 'Grams to kilograms is a smaller-to-larger conversion, so divide.',
              },
            ]}
            answer="4.25 kilograms"
          />

          <InlineCheck
            id="m5s1-calculator-section"
            question="In the Level 1 Maths exam, can you use a calculator in Section A?"
            correctAnswer="No. Section A is a non-calculator section that tests your mental arithmetic and number sense. Calculators are only permitted in Section B, which covers more complex multi-step problems."
            explanation="This structure — a non-calculator section followed by a calculator section — is common across Level 1 Maths assessments, but the exact timings and structure are set by each awarding body and can differ. Confirm the precise format for your own assessment with your training provider."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Reading tables, charts and data</ContentEyebrow>

          <ConceptBlock title="Reading a table or chart correctly is finding the exact row or bar first, and calculating second">
            <p>
              A table or a chart answers your question only if you locate the exact row, column or
              bar that matches the description in the question — and that is where nearly every
              error in this topic actually happens. It is very easy to read one row above or below
              the one you meant, especially when several rows describe similar-sounding items. The
              habit worth building is to say out loud (or underline) the exact description you are
              looking for before you let your eye move down the table, then confirm you have landed
              on that row and no other before you read off the figure.
            </p>
            <p>
              A mean average is the standard way of summarising a small set of numbers into one
              representative figure: add every value together, then divide by how many values there
              are. It answers "what would each one be if they were all equal", which is a genuinely
              useful question on site — average installs per fitter, average hours per day, average
              cost per item — even though no individual value need actually equal the mean.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A team of 5 electricians completed the following numbers of installations last month: 12, 15, 9, 18, and 11. What was the mean average number of installations per electrician?"
            steps={[
              { calc: 'Total: 12 + 15 + 9 + 18 + 11', note: '12 + 15 + 9 + 18 + 11 = 65.' },
              { calc: 'Mean = total ÷ number of values', note: '65 ÷ 5 = 13.' },
            ]}
            answer="13 installations"
            watchOut="Divide by the number of VALUES you added, not by some other count on the page (such as the number of weeks in the month). Miscounting how many values you have is the most common way this goes wrong."
          />

          <SectionRule />

          <TryIt
            question="An electrician logged the following hours across a working week: Monday 8, Tuesday 7.5, Wednesday 8, Thursday 6, Friday 4.5. What was the mean average number of hours worked per day?"
            steps={[
              { calc: 'Total: 8 + 7.5 + 8 + 6 + 4.5', note: '8 + 7.5 + 8 + 6 + 4.5 = 34.' },
              { calc: 'Mean = total ÷ number of days', note: '34 ÷ 5 = 6.8.' },
            ]}
            answer="6.8 hours"
          />

          <WorkedExample
            question="A supplier's price list shows: 1.5 mm² T&E — £0.95 per metre; 2.5 mm² T&E — £1.35 per metre; 4 mm² T&E — £2.10 per metre; 6 mm² T&E — £3.20 per metre. You need 45 metres of 2.5 mm² T&E for a ring final circuit. Read the correct price from the list and calculate the total cost."
            steps={[
              {
                calc: 'Find the matching row',
                note: 'The item is 2.5 mm² T&E, not 1.5 mm² or 4 mm² — confirm the exact size before reading the price next to it.',
              },
              { calc: 'Read off the unit price', note: '£1.35 per metre.' },
              { calc: '45 x £1.35', note: '45 x 1.35 = £60.75.' },
            ]}
            answer="£60.75"
            watchOut="Cable sizes in a list look similar at a glance — 1.5, 2.5 and 4 mm² all end the same way when skimmed. Reading the row above or below the one you need gives a plausible but wrong price."
          />

          <SectionRule />

          <TryIt
            question="A chart pinned to the site noticeboard shows hours logged per day for one week: Monday 8, Tuesday 7.5, Wednesday 8, Thursday 6, Friday 4.5. Read the chart and work out the total hours logged for the week, and the difference between the longest and shortest day."
            steps={[
              { calc: 'Read each bar in order', note: '8, 7.5, 8, 6, 4.5.' },
              { calc: 'Total: 8 + 7.5 + 8 + 6 + 4.5', note: '= 34 hours.' },
              {
                calc: 'Longest minus shortest: 8 − 4.5',
                note: 'Monday or Wednesday (both 8) is the longest; Friday (4.5) is the shortest.',
              },
            ]}
            answer="34 hours total for the week; the difference between the longest and shortest day is 3.5 hours."
          />

          <CommonMistake
            title="Not checking whether the answer is a reasonable size"
            whatHappens="A misread row, a decimal slip, or dividing by the wrong count all produce an answer that looks like a number but makes no sense as the thing it is supposed to represent — 12 metres of cable costing £2,940, or a five-person team averaging 130 installations each."
            doInstead="Before moving on, ask whether the answer is a believable size for the real-world thing it describes. It takes a few seconds and catches a large share of arithmetic and table-reading errors before they leave the page."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Reading comprehension: work documents</ContentEyebrow>

          <ConceptBlock title="Read to answer the exact question, using the document's own wording">
            <p>
              Level 1 reading is tested on real document types — notices, letters, emails, leaflets
              — and the questions are almost always answerable directly from the text, not from
              general knowledge or inference. The skill is not close reading of every sentence; it
              is scanning efficiently for the specific piece of information the question names. If a
              question asks "by what time", scan for a time. If it asks "what condition applies
              before X", scan for conditional language such as "must" or "before" attached to X.
              Most questions are worth one or two marks, which tells you the expected answer is
              short and precise, not an essay.
            </p>
            <p>
              For short factual questions, answering in the document's own words is entirely safe —
              the fact is what is being tested, not your vocabulary. That changes for longer
              "explain" or "summarise" questions, where repeating a chunk of the text verbatim does
              not demonstrate that you have understood it; there, restating the same fact in your
              own words is what earns the mark.
            </p>
          </ConceptBlock>

          <WorkedExample
            question={
              'A site notice reads: "IMPORTANT NOTICE — All electrical work in communal areas must be completed by 17:00 each day. Tools and materials must be stored securely overnight. Any work requiring isolation of the main supply must be agreed with the building manager at least 24 hours in advance. Failure to comply may result in removal from site." Read the notice and answer: by what time must work be completed, and what must happen before isolating the main supply? Show how you located each answer.'
            }
            steps={[
              {
                calc: 'Scan for a number or time first',
                note: '"17:00" appears attached to "must be completed by" — that directly answers the first question with no interpretation needed.',
              },
              {
                calc: 'Scan for conditional language',
                note: '"must be agreed... at least 24 hours in advance" is attached to "isolation of the main supply" — the trigger word "must" marks this as the answer to the second question.',
              },
              {
                calc: "Answer using the text's own wording",
                note: 'Both answers already exist word for word in the notice — there is nothing to infer or paraphrase.',
              },
            ]}
            answer="Work must be completed by 17:00 each day. Isolating the main supply requires agreement with the building manager at least 24 hours in advance."
            watchOut="Do not read the whole notice for a general impression and then answer from memory. Scan for the specific word the question is built around, then read only the sentence it sits in."
          />

          <SectionRule />

          <TryIt
            question={
              'An email reads: "Subject: Updated PPE Requirements — Following the recent health and safety review, all operatives working on the Riverside Development must now wear high-visibility vests at all times, including inside the building. Hard hats remain compulsory in all areas where overhead work is taking place. Safety boots must be worn throughout the site. Any operative found without the correct PPE will be asked to leave site immediately. New PPE can be collected from the site office between 07:00 and 08:00." What new requirement has been introduced, and where and when can new PPE be collected? Use the same scanning method as above.'
            }
            steps={[
              {
                calc: 'Scan for "must" attached to a new item',
                note: '"must now wear high-visibility vests at all times, including inside the building" — the word "now" signals this is the new requirement, not an existing one.',
              },
              {
                calc: 'Scan for a place and a time together',
                note: '"site office between 07:00 and 08:00" answers where and when in one phrase.',
              },
            ]}
            answer="The new requirement is that high-visibility vests must be worn at all times, including inside the building. New PPE can be collected from the site office between 07:00 and 08:00."
          />

          <InlineCheck
            id="m5s1-english-components"
            question="Name the three components of the Level 1 English Functional Skills assessment."
            correctAnswer="Reading, Writing, and Speaking, Listening and Communicating (SLC). Reading and Writing are externally examined, whilst SLC is assessed internally by your training provider through discussions or presentations."
            explanation="This three-part structure is common to Level 1 English Functional Skills. Exactly how each part is delivered and timed is set by the awarding body, so confirm the detail of your own assessment with your training provider."
          />

          <CommonMistake
            title="Copying the text word for word when the question asks you to explain or summarise"
            whatHappens="A short factual question ('what time') is safely answered in the document's own words. But when a question asks you to explain or summarise, copying out a chunk of the original text does not show you have understood it — it shows you can find it."
            doInstead="For factual lookups, the text's own wording is fine. For 'explain' or 'summarise' questions, restate the same fact in your own words — same information, different sentence."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Writing for purpose</ContentEyebrow>

          <ConceptBlock title="Plan, match the tone to the reader, then check for one clear point">
            <p>
              A Level 1 writing task is marked on whether the response does its job for its intended
              reader — clarity, correct spelling and grammar, and a tone and format that fit the
              purpose — not on vocabulary or length. The reliable method has three stages. Plan
              first: before writing a word, note the two or three things the task actually requires
              you to include, in the order they need to appear. Match the tone to the reader: a
              formal letter to a client is not written the way a text message to a mate is written,
              and mixing the two registers is one of the most common ways marks are lost. Check
              before you finish: reread for exactly one thing — does this message contain a single
              clear point or request the reader cannot miss, or have you buried it in a wall of
              otherwise accurate detail.
            </p>
            <p>
              A well-organised response with a small SPaG (spelling, punctuation and grammar) slip
              generally scores higher than a technically correct one that rambles without structure,
              because organisation is itself part of what is being assessed — the task is testing
              whether you can communicate, not just whether you can spell.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Write a formal email to your supervisor explaining that you have discovered a fault with the consumer unit in a property you are working on. Include what the fault is, what action you have taken so far, and what you recommend as the next step."
            steps={[
              {
                calc: 'Plan: list the three required contents before writing',
                note: 'The fault itself; the action already taken; the recommendation. The task names all three — leaving one out loses a mark regardless of how well the rest is written.',
              },
              {
                calc: 'Match the tone: formal address, no site shorthand',
                note: 'A supervisor email may be forwarded to the client, so it should read as professional even though the reader is a colleague.',
              },
              {
                calc: 'Structure in the order the task asked for',
                note: 'Fault, then action taken, then recommendation, then a closing line inviting a decision.',
              },
              {
                calc: 'Check for one clear ask',
                note: 'Reread and confirm the supervisor knows exactly what you want from them — a decision on the recommendation — rather than just a list of facts with no next step.',
              },
            ]}
            answer={
              'Dear [Name], I am writing to inform you of a fault I have identified at [address]. During my inspection of the consumer unit, I noticed that the main switch shows signs of overheating and discolouration. I have isolated the affected circuit and made the area safe, and informed the homeowner. I recommend a full inspection and replacement of the consumer unit. Please let me know how you would like to proceed. Kind regards, [Your name]'
            }
            watchOut="Do not list the fault, the action and the recommendation as three disconnected facts. The email should read as one clear account leading to one clear request, not a bullet list dressed as prose."
          />

          <SectionRule />

          <TryIt
            question="You are running 45 minutes late to a job because of a burst pipe on your previous job. Write a short, clear message to the customer explaining why, and what they should expect."
            steps={[
              {
                calc: 'Plan: two things only',
                note: 'The reason for the delay, and the revised arrival time. A message like this does not need a third point.',
              },
              {
                calc: 'Match the tone to the medium',
                note: 'This is a short update, not a formal letter — plain, direct language is correct here, not the register used in the email above.',
              },
              {
                calc: 'Check it answers the one thing the customer needs',
                note: 'When will you arrive. Everything else is secondary.',
              },
            ]}
            answer="Something like: 'Sorry for the delay — a burst pipe on my previous job has put me back. I now expect to arrive at approximately [time]. Apologies for the inconvenience.' Two facts, in plain language, leading straight to the one thing the customer is waiting to know."
          />

          <Scenario
            title="A message that is accurate but says nothing useful"
            situation="You have drafted an update to a customer that correctly lists every fact — the fault, the parts ordered, the date they arrived — but reads as one long paragraph with no clear point at the end."
            whatToDo="Reread it for the one line a busy reader actually needs: what you want from them, or what happens next. Move that line to the start or end where it will not get missed, and cut anything that is not building toward it."
            whyItMatters="Functional Skills writing marks and a real customer's patience reward the same thing — a message organised around its purpose, not just accurate content in the order you happened to think of it."
          />

          <CommonMistake
            title="Wrong tone or format for the reader"
            whatHappens="A formal letter opens 'Hi mate' instead of 'Dear Sir/Madam', or a short customer text is written like a legal letter. Either mismatch reads as unprofessional, regardless of how accurate the content is."
            doInstead="Before writing, name the reader and the medium out loud — a client by letter, a colleague by email, a customer by text — and let that decide the tone, not habit."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Digital skills: fitness for purpose</ContentEyebrow>

          <ConceptBlock title="A document is fit for purpose when it serves its reader, not when it uses every feature available">
            <p>
              Level 1 digital skills tasks put you in front of everyday office software — word
              processing, spreadsheet, and sometimes presentation tools — and ask you to produce
              something a real reader could actually use. The mark scheme is not counting how many
              features you used; it is asking whether the finished document does its job. A clean,
              accurately formatted job sheet with one font and a sensible layout outscores a
              cluttered one with five fonts, rainbow colours and every border style the software
              offers.
            </p>
            <p>
              The recurring skills worth being fluent in: entering data accurately and using a basic
              formula in a spreadsheet (a SUM across a column is the one you will use most);
              formatting a heading row so a table is easy to scan; writing in a tone and layout that
              suits a formal letter; and saving a file with a sensible name in the format the task
              actually asked for. That last point catches people out — if the task says save as one
              format, submitting a different one loses the mark even if the content itself is
              perfect.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Create a spreadsheet listing 10 common electrical materials (for example, 2.5 mm² twin and earth cable, a consumer unit, RCDs, MCBs). Include columns for item name, quantity needed, unit price, and total cost, with a formula that calculates the grand total. Format the header row clearly, and save the file with a sensible name."
            steps={[
              {
                calc: 'Set up the columns',
                note: 'Item name, quantity, unit price, total cost — one row per material, one column per fact about it.',
              },
              {
                calc: "Enter a formula for each row's total",
                note: 'Quantity multiplied by unit price, entered as a formula referencing the two cells — not typed in as a number — so it updates automatically if either figure changes.',
              },
              {
                calc: 'Use a SUM formula for the grand total',
                note: 'Sum the total-cost column across all ten rows in one formula, rather than adding them by hand.',
              },
              {
                calc: 'Format the header row',
                note: 'Bold, with a distinct background, so the columns are identifiable at a glance.',
              },
              {
                calc: 'Save with a sensible name',
                note: 'Something that identifies the content and date — e.g. a materials order for a specific job — in the file format the task actually specified.',
              },
            ]}
            answer="A ten-row spreadsheet with item, quantity, unit price and a per-row total-cost formula, a SUM formula giving the grand total, a formatted header row, and a sensibly named file in the requested format."
            watchOut="A formula that recalculates if you change a quantity or price is worth more than a number typed in by hand that happens to be correct on the day — the mark scheme is checking for a working formula, not just a correct-looking total."
          />

          <SectionRule />

          <TryIt
            question="Write a formal letter using a word processor to a customer confirming the date and time of an electrical inspection. Include the date and address, a clear subject line, and a professional sign-off, with correct paragraph spacing."
            steps={[
              {
                calc: 'Plan the required elements',
                note: 'Date, address, subject line, body confirming the appointment, professional sign-off — the task names each one.',
              },
              {
                calc: 'Use one consistent format',
                note: 'One font, consistent paragraph spacing, and a bold subject line — restraint reads as more professional than heavy formatting.',
              },
              {
                calc: "Check the content matches a formal letter's tone",
                note: 'No shorthand, no site language, addressed and signed off correctly.',
              },
              {
                calc: 'Save in the requested format',
                note: 'Whatever file type the task specifies — submitting the wrong format loses the mark regardless of the content.',
              },
            ]}
            answer="A one-page formal letter with a clear subject line, the date and address, a short body confirming the inspection appointment, consistent formatting throughout, and a professional sign-off, saved in the format the task asked for."
          />

          <InlineCheck
            id="m5s1-ict-fitness"
            question="What does 'fitness for purpose' mean in the context of the ICT assessment?"
            correctAnswer="It means your document is suitable and appropriate for its intended audience and use. A safety notice should be clear and direct, a formal letter should be professional, and a spreadsheet should present data logically. It is about meeting the reader's needs, not demonstrating every available feature."
          />

          <CommonMistake
            title="Over-formatting, and saving in the wrong file format"
            whatHappens="A document uses five fonts and every colour available, which reads as unprofessional rather than thorough. Separately, a task specifies a file format and a different one is submitted — the content can be perfect and still lose the mark."
            doInstead="Keep formatting clean, consistent and purposeful — enough to make the document easy to read, no more. Read the file-format instruction as carefully as the content instruction, and save accordingly."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Level 1 and Level 2 are two levels of one qualification. What YOU need depends on your specific apprenticeship standard, and sometimes your age and prior qualifications — confirm it with your provider rather than assume from a colleague's experience.",
              'Assessment format details — paper length, calculator splits, pass marks — vary by awarding body. Treat any specific figure as one to confirm, not a fixed universal fact.',
              'Split a calculation into round numbers plus a remainder, and check the final answer is a believable size for the real thing it represents.',
              'A fraction of a quantity: divide by the bottom number, multiply by the top. A percentage of a quantity: divide by 100, multiply by the percentage. Both need a second step to reach the final answer, not just the amount you calculated.',
              'Area is length times width in matching units. Round a count of physical items UP always, never to the nearest whole number.',
              'Reading a table or chart correctly starts with finding the exact row or bar that matches your question — most errors are reading the wrong one, not miscalculating from the right one.',
              'Reading comprehension answers usually exist word for word in the text for short factual questions. Scan for the specific word or number the question names.',
              'Good writing is planned before it is written, matched in tone to its reader, and organised around one clear point the reader cannot miss.',
              'A digital document is fit for purpose when it serves its reader — clean and correctly formatted beats cluttered and feature-heavy every time.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'How do I find out whether I need Level 1 or Level 2?',
                answer:
                  "Ask your training provider or tutor to confirm it in writing against your specific apprenticeship standard. It depends on the standard, and sometimes on your age and prior qualifications — it is not the same for every apprentice, so a colleague's answer is not reliable evidence for your own.",
              },
              {
                question: 'Is the exam structure the same for everyone?',
                answer:
                  'The subject content is common to every awarding body. The exact structure — how many papers, timings, the calculator/non-calculator split, pass marks — is set separately by each board and does vary. Confirm the specific format of your own assessment with your training provider.',
              },
              {
                question: 'Do I need a scientific calculator or will a phone do?',
                answer:
                  'A phone is not normally acceptable as a calculator in a controlled assessment. Bring a proper scientific calculator with fresh batteries, and check with your provider what is permitted at your centre.',
              },
              {
                question: 'What happens if I fail one subject?',
                answer:
                  'Each subject is assessed independently, so you generally only need to resit the one you did not pass, and a pass in another subject is not affected. Confirm resit arrangements with your provider, as these can vary.',
              },
              {
                question: 'How much detail does a short answer question actually need?',
                answer:
                  'Look at the marks available. A one-mark question wants a brief, accurate answer; a two-mark question usually wants either one piece of evidence plus an explanation, or two distinct points. More words are not automatically more marks.',
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Level 1 Functional Skills Knowledge Check" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate('/study-centre/apprentice/functional-skills/module5')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Module 5
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module5/section2')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Section 2
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule5Section1;
