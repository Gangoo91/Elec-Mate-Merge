/**
 * Functional Skills · Module 1 · Section 1 — Number and arithmetic
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit, and
 * rewritten around worked examples.
 *
 * Why the rewrite and not just a conversion: the old page *described* arithmetic
 * in prose — "Multiplication: calculating total cost — 12 lengths of conduit at
 * £4.60 each" — which is a sentence about multiplication rather than a
 * calculation anyone can follow. Functional Skills carries method marks, so a
 * learner has to see the working set out line by line and then produce it
 * themselves. That is what <WorkedExample> and <TryIt> are for; both were added
 * to the kit for this course, which had been built for regulations and had
 * nothing for maths.
 *
 * The old page's quiz was kept almost intact — its questions were already
 * properly trade-contextualised, which is the hard part. One explanation was
 * corrected: it called 5% the "maximum permitted" voltage drop for most
 * circuits. BS 7671 Appendix 4 Table 4Ab gives 3% for lighting and 5% for other
 * uses, and they are *recommended* maxima, not permitted limits — rendering
 * guidance as law is the error this course can least afford, because an
 * apprentice carries it onto site.
 *
 * Accuracy note: the maths here is the Ofqual Functional Skills subject content,
 * which is common to every awarding body. Assessment-format claims are kept to
 * what is common across all of them — no awarding body is named, because none
 * has been confirmed for this cohort.
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

const TITLE = 'Number and Arithmetic - Functional Skills Module 1.1';
const DESCRIPTION =
  'Functional Skills maths for electricians: whole numbers, decimals, fractions, percentages, BIDMAS, negative numbers and estimation — every technique worked through on real site calculations.';

const quizQuestions = [
  {
    id: 1,
    question:
      'An electrician needs three cable runs of 14.5m, 22.3m and 8.75m. What is the total length of cable required?',
    options: ['44.55m', '45.55m', '45.05m', '44.05m'],
    correctAnswer: 1,
    explanation:
      'Add the three lengths: 14.5 + 22.3 + 8.75 = 45.55m. Line the decimal points up under each other and work right to left — that is what stops 8.75 being added as 8.075.',
  },
  {
    id: 2,
    question: 'A 230V supply experiences a 10% voltage drop. What is the voltage at the load?',
    options: ['203V', '220V', '207V', '210V'],
    correctAnswer: 2,
    explanation:
      '10% of 230V = 23V, so the voltage at the load = 230 − 23 = 207V. For context: BS 7671 Appendix 4 Table 4Ab recommends a maximum drop of 3% for lighting and 5% for other uses on a public low-voltage supply, so 10% is well outside what the guidance recommends.',
  },
  {
    id: 3,
    question: 'What is 3/8 of a 100m drum of cable?',
    options: ['62.5m', '37.5m', '60m', '65m'],
    correctAnswer: 1,
    explanation: '3 ÷ 8 = 0.375, then 0.375 × 100 = 37.5m.',
  },
  {
    id: 4,
    question: 'You use 3/8 of a 100m drum on a rewire. How much cable is left on the drum?',
    options: ['62.5m', '37.5m', '60m', '65m'],
    correctAnswer: 0,
    explanation:
      '3/8 of 100m = 37.5m used, so 100 − 37.5 = 62.5m remains. Read the question twice: 37.5 is the number you work out on the way, not the answer.',
  },
  {
    id: 5,
    question:
      'A circuit has a design current of 28.4A. Which standard BS 88 fuse rating should you select?',
    options: ['28A', '32A', '25A', '30A'],
    correctAnswer: 1,
    explanation:
      'The protective device rating must be at least the design current. 25A is below 28.4A, and 30A is not a standard BS 88 rating, so the next standard rating up is 32A. Never round down — the fuse would be undersized.',
  },
  {
    id: 6,
    question:
      'A motor has a power input of 2,400W and a useful output of 1,920W. What is its efficiency?',
    options: ['75%', '85%', '80%', '90%'],
    correctAnswer: 2,
    explanation:
      'Efficiency = (output ÷ input) × 100 = (1,920 ÷ 2,400) × 100 = 80%. The other 20% leaves as heat, sound and vibration.',
  },
  {
    id: 7,
    question:
      'The temperature in a cold workshop reads −5°C. A heater raises it by 23°C. What is the new temperature?',
    options: ['28°C', '23°C', '−28°C', '18°C'],
    correctAnswer: 3,
    explanation:
      '−5 + 23 = 18°C. Adding a positive to a negative moves you up the number line — start at −5 and count 23 places up.',
  },
  {
    id: 8,
    question: 'Work out 12 + 4 × 3 − 6 ÷ 2.',
    options: ['21', '24', '18', '15'],
    correctAnswer: 0,
    explanation:
      'BIDMAS: multiplication and division first, left to right — 4 × 3 = 12 and 6 ÷ 2 = 3. Then 12 + 12 − 3 = 21. Working strictly left to right gives 21 here too by luck, but it will not next time.',
  },
];

const FunctionalSkillsModule1Section1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 1"
        title="Number and arithmetic"
        backTo="/study-centre/apprentice/functional-skills/module1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default. These pages are carrying worked
            calculations in a mono face, and a column sized for prose squeezes
            the working onto two lines where it should sit on one. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Nobody fails Functional Skills because they cannot add up. They fail because the exam
            asks the question sideways — in metres of cable, in percentages of a supply voltage, in
            money — and because a chunk of the paper has to be done without a calculator. Everything
            below is worked through on the kind of numbers you will actually meet.
          </p>

          <LearningOutcomes
            outcomes={[
              'Add, subtract, multiply and divide whole numbers and decimals, keeping place value correct.',
              'Convert a fraction to a decimal and use it to scale a quantity.',
              'Find a percentage of a quantity, and find what percentage one quantity is of another.',
              'Apply BIDMAS, and bracket a fraction correctly before keying it into a calculator.',
              'Work with negative numbers using a number line rather than memorised sign rules.',
              'Share a quantity in a given ratio, and scale a drawing or a materials list up or down.',
              'Calculate with money and time, including converting between minutes and decimal hours.',
              'Estimate before calculating, and round in the direction the job requires.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Times tables to 12',
                gist: 'Everything here assumes them. If they are shaky that is the first thing to fix — nothing else on this page will stick without them.',
              },
              {
                term: 'Reading a tape measure',
                gist: 'Millimetres, centimetres and metres, and that 1 m = 1,000 mm.',
              },
            ]}
          />

          <TLDR
            points={[
              'Line decimal points up before you add. Most arithmetic slips on site are place-value slips, not sums.',
              'A fraction is a division waiting to happen: 3/8 is 3 ÷ 8. Turn it into a decimal and the rest is easy.',
              'Percentage of a number: divide by 100, multiply by the percentage. Reverse it and you have found a percentage change.',
              'BIDMAS is not a rule about being tidy — a calculator obeys it, so if you key a formula in the order it is written you can get a different answer to the one you wrote down.',
              'Ratio: add the parts first, then find what one part is worth. Everything else follows.',
              'An hour has 60 minutes, not 100 — 1 h 30 min is 1.5 hours. Getting this wrong underpays you on every timesheet.',
              'Estimate first, calculate second. If the answer is nowhere near the estimate, you have made a place-value error.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Whole numbers</ContentEyebrow>

          <ConceptBlock title="Counting is the easy part; keeping track is not">
            <p>
              Whole numbers turn up constantly — accessories on a floor plan, circuits on a board,
              clips in a box. The arithmetic is never the difficulty. What catches people out is a
              multi-step count where one stage is forgotten, so get into the habit of writing each
              stage down rather than holding it in your head on a ladder.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="A floor plan shows 14 double sockets, 6 singles and 3 fused spurs. Each accessory needs one back box. Boxes come in packs of 10. How many packs do you order?"
            steps={[
              { calc: '14 + 6 + 3 = 23', note: 'Total accessories, so 23 back boxes.' },
              { calc: '23 ÷ 10 = 2.3', note: 'Two packs is not enough.' },
              { calc: 'Round UP to 3 packs', note: 'You cannot buy 0.3 of a pack.' },
            ]}
            answer="3 packs"
            watchOut="Rounding 2.3 down to 2 is the classic error. When the question is 'how many do I need to buy', you always round up — the maths says 2.3, the van says 3."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="A board has 12 circuits. Four are lighting, five are sockets, the rest are dedicated supplies. How many dedicated supplies?"
            steps={[
              { calc: '4 + 5 = 9', note: 'Lighting and sockets together.' },
              { calc: '12 − 9 = 3' },
            ]}
            answer="3 circuits"
          />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Decimals</ContentEyebrow>

          <ConceptBlock title="Place value is the whole game">
            <p>
              Every measurement you take is a decimal: 14.5 m of cable, 0.35 Ω of resistance, 232.6
              V at the socket. The digit's position is what gives it its size, so when you add or
              subtract, the decimal points must sit in a column under one another. Write the
              trailing zeros in if it helps — 8.75 and 8.750 are the same number, and the second one
              is harder to misread.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="Three cable runs measure 14.5 m, 22.3 m and 8.75 m. How much cable do you need in total?"
            steps={[
              {
                calc: '14.50\n22.30\n 8.75',
                note: 'Write them with the points lined up and pad to two decimal places.',
              },
              { calc: '14.50 + 22.30 = 36.80' },
              { calc: '36.80 + 8.75 = 45.55' },
            ]}
            answer="45.55 m"
            watchOut="Adding 8.75 as though it were 8.075 gives 44.875, which rounds to a plausible-looking 44.88. A wrong answer that looks reasonable is more dangerous than one that looks silly."
          />

          <TryIt
            nonCalculator
            question="You cut 3.6 m and 4.85 m from a 20 m length. How much is left?"
            steps={[
              { calc: '3.60 + 4.85 = 8.45', note: 'Total used — do this first.' },
              { calc: '20.00 − 8.45 = 11.55' },
            ]}
            answer="11.55 m"
          />

          <SectionRule />

          <CommonMistake
            title="Lining decimals up by the last digit instead of the point"
            whatHappens="You write 14.5, 22.3 and 8.75 in a column, right-aligned the way a list of whole numbers would be. The 5 of 14.5 ends up under the 5 of 8.75, and you have added tenths to hundredths. The answer comes out as 44.55 or 45.05 rather than 45.55, and it looks plausible enough to write down."
            doInstead="Line up the decimal points, not the last digits, and fill the gaps with zeros — 14.50, 22.30, 8.75. Every column now holds the same place value, and the sum does itself."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Fractions</ContentEyebrow>

          <ConceptBlock title="A fraction is just a division you have not done yet">
            <p>
              The line in a fraction means divide. <strong>3/8</strong> is 3 ÷ 8, which is 0.375.
              Once it is a decimal you can scale it, add it, or put it in a calculator without
              thinking about numerators and denominators at all. That single move handles almost
              every fraction question a Functional Skills paper will ask you.
            </p>
            <p>
              Worth memorising the common ones, because they come up without a calculator: 1/2 =
              0.5, 1/4 = 0.25, 3/4 = 0.75, 1/5 = 0.2, 1/8 = 0.125, 1/10 = 0.1.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="A 100 m drum of 2.5 mm² twin and earth. You use 3/8 of it on a rewire. How much is left on the drum?"
            steps={[
              { calc: '3 ÷ 8 = 0.375', note: 'Turn the fraction into a decimal.' },
              { calc: '0.375 × 100 = 37.5 m', note: 'That is what you used.' },
              { calc: '100 − 37.5 = 62.5 m', note: 'Take it off the drum length.' },
            ]}
            answer="62.5 m"
            watchOut="The question asks what is left, not what you used. 37.5 m is the most common wrong answer precisely because it is the number you work out on the way — and the exam knows that, which is why it is always one of the options."
          />

          <InlineCheck
            question="A 50 m drum has 2/5 used. How many metres remain?"
            options={['20 m', '30 m', '25 m', '40 m']}
            correctIndex={1}
            explanation="2 ÷ 5 = 0.4, and 0.4 × 50 = 20 m used — so 50 − 20 = 30 m left. 20 m is the amount used, not the amount remaining."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="A 50m drum has 3/5 of its cable left. A job needs 24m. Is there enough, and what is left afterwards?"
            steps={[
              {
                calc: '3 ÷ 5 = 0.6',
                note: 'Turn the fraction into a decimal first — it is a division waiting to happen.',
              },
              { calc: '0.6 × 50 = 30m', note: 'What is on the drum.' },
              { calc: '30 − 24 = 6m' },
            ]}
            answer="Yes — 30m available, 6m left on the drum afterwards."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Percentages</ContentEyebrow>

          <ConceptBlock title="Per cent means 'out of a hundred' — nothing more">
            <p>
              To find a percentage of something, turn the percentage into a decimal and multiply:
              10% becomes 0.1, 5% becomes 0.05, 17.5% becomes 0.175. To go the other way and find
              what percentage one number is of another, divide and multiply by 100.
            </p>
            <p>
              This is the single most useful bit of maths on this page. Voltage drop, efficiency,
              diversity, VAT and every discount on a wholesaler's invoice are all the same
              calculation.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 230 V supply has a 10% voltage drop by the time it reaches the load. What is the voltage at the load?"
            steps={[
              { calc: '10% = 0.1' },
              { calc: '0.1 × 230 = 23 V', note: 'That is the size of the drop.' },
              { calc: '230 − 23 = 207 V' },
            ]}
            answer="207 V"
            watchOut="For context rather than for the maths: BS 7671 Appendix 4 Table 4Ab recommends a maximum drop of 3% for lighting and 5% for other uses on a public low-voltage supply. They are recommended maxima, not permitted limits — but a 10% drop is well outside them either way."
          />

          <WorkedExample
            question="A motor takes 2,400 W in and delivers 1,920 W of useful output. What is its efficiency?"
            steps={[
              {
                calc: 'Efficiency = (out ÷ in) × 100',
                note: 'Going the other way: divide, then scale up.',
              },
              { calc: '1,920 ÷ 2,400 = 0.8' },
              { calc: '0.8 × 100 = 80' },
            ]}
            answer="80%"
            watchOut="Dividing the wrong way round gives 1.25, or 125% — a machine producing more than it consumes. If a percentage comes out above 100 on an efficiency question, you have inverted the fraction."
          />

          <TryIt
            question="Cable costs £186 before VAT at 20%. What do you pay?"
            steps={[
              { calc: '20% = 0.2' },
              { calc: '0.2 × 186 = 37.20', note: 'The VAT itself.' },
              { calc: '186 + 37.20 = 223.20' },
            ]}
            answer="£223.20"
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Order of operations</ContentEyebrow>

          <ConceptBlock title="BIDMAS, and why it is not pedantry">
            <p>
              <strong>B</strong>rackets, <strong>I</strong>ndices, <strong>D</strong>ivision and{' '}
              <strong>M</strong>ultiplication (left to right), then <strong>A</strong>ddition and{' '}
              <strong>S</strong>ubtraction (left to right).
            </p>
            <p>
              This matters on site because your calculator obeys it and you might not. Key a formula
              in the order it is written on the page and you can get a different answer to the one
              you would get on paper — and you will trust the calculator.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="Work out 12 + 4 × 3 − 6 ÷ 2."
            steps={[
              { calc: '4 × 3 = 12', note: 'Multiplication and division first, left to right.' },
              { calc: '6 ÷ 2 = 3' },
              { calc: '12 + 12 − 3 = 21', note: 'Now the addition and subtraction.' },
            ]}
            answer="21"
          />

          <CommonMistake
            title="Keying a fraction into a calculator without brackets"
            whatHappens={
              <p>
                You need (230 − 207) ÷ 230 and you key <code>230 − 207 ÷ 230</code>. The calculator
                does the division first, so it works out 207 ÷ 230 = 0.9 and gives you 229.1 —
                nothing like the 0.1 you wanted, but a number all the same.
              </p>
            }
            doInstead={
              <p>
                Bracket the whole top of any fraction before you divide:{' '}
                <code>(230 − 207) ÷ 230</code>. If the calculator gives you something wildly
                different from your estimate, this is almost always why.
              </p>
            }
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="Work out (18 − 6) ÷ 4 + 5 × 2."
            steps={[
              { calc: '(18 − 6) = 12', note: 'Brackets first.' },
              { calc: '12 ÷ 4 = 3', note: 'Then division and multiplication, left to right.' },
              { calc: '5 × 2 = 10' },
              { calc: '3 + 10 = 13' },
            ]}
            answer="13"
          />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Negative numbers</ContentEyebrow>

          <ConceptBlock title="A number line, not a rule to memorise">
            <p>
              Negatives come up in temperature, in tolerance bands, and in any figure expressed as a
              difference. Picture a number line: adding moves you right, subtracting moves you left.
              That one image handles every case without memorising sign rules.
            </p>
            <p>
              The only rule worth learning separately: two negatives multiplied or divided give a
              positive. −8 × −3 = 24.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="A workshop reads −5 °C. A heater raises it by 23 °C. What is the new temperature?"
            steps={[
              { calc: 'Start at −5', note: 'Five places left of zero.' },
              { calc: 'Move 23 to the right', note: '5 gets you to zero, 18 to go.' },
              { calc: '−5 + 23 = 18' },
            ]}
            answer="18 °C"
            watchOut="−28 °C is the trap answer: it comes from adding the two numbers and keeping the minus sign. Adding a positive always moves you up."
          />

          <SectionRule />
          <TryIt
            nonCalculator
            question="A reading is −12 °C. It falls a further 7 °C overnight. What does it read in the morning?"
            steps={[
              { calc: 'Start at −12', note: 'Falling means moving left along the line.' },
              { calc: '−12 − 7 = −19' },
            ]}
            answer="−19 °C"
          />

          <CommonMistake
            title="Treating a minus sign as an instruction to subtract"
            whatHappens="You read −5 + 23 and start looking for something to take away, so you work out 23 − 5 and then wonder which way round the answer goes. The minus in −5 is not an operation; it is part of the number, saying where it sits on the line."
            doInstead="Put the first number on a number line and let the operation move you. Start at −5, and + 23 moves you 23 places to the right, landing on 18. No sign rules to memorise and nothing to get backwards."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Ratio and proportion</ContentEyebrow>

          <ConceptBlock title="Ratio is sharing; proportion is scaling">
            <p>
              A ratio tells you how to divide something up. Written 3:2, it means three parts to two
              parts — five parts in total. The trick is always the same: add the parts to get the
              total, divide the quantity by that total to find what one part is worth, then multiply
              back up.
            </p>
            <p>
              Proportion is the same idea pointed the other way. If you know what a quantity costs
              or measures at one size, you can scale it to any other size. Every materials take-off
              from a drawing is a proportion calculation, and so is every scale on that drawing.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="A 40 m run of trunking is to be split between two floors in the ratio 3:2. How much goes to each?"
            steps={[
              { calc: '3 + 2 = 5 parts', note: 'Always start by totalling the parts.' },
              { calc: '40 ÷ 5 = 8 m per part', note: 'What one share is worth.' },
              { calc: '3 × 8 = 24 m', note: 'First floor.' },
              { calc: '2 × 8 = 16 m', note: 'Second floor.' },
            ]}
            answer="24 m and 16 m"
            watchOut="Check your answers add back to the original: 24 + 16 = 40. If they do not, you have divided by the wrong number — usually by one of the parts instead of the total."
          />

          <ConceptBlock title="Scale drawings">
            <p>
              A drawing marked <strong>1:50</strong> means every millimetre on the paper is 50 mm in
              the building. Multiply the measured distance by the scale to get the real one; divide
              to go the other way. Keep the units straight and it is a single multiplication.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="On a 1:50 plan, a cable route measures 86 mm. How long is the run in reality?"
            steps={[
              { calc: '86 × 50 = 4,300 mm', note: 'Measured length × scale.' },
              { calc: '4,300 ÷ 1,000 = 4.3 m', note: 'Convert to metres for the order.' },
            ]}
            answer="4.3 m"
            watchOut="Add a margin before you cut. A scale drawing gives the straight-line route, not the way the cable actually goes round obstructions and into the box."
          />

          <TryIt
            nonCalculator
            question="Three electricians share a £1,800 job in the ratio 4:3:2 by hours worked. What does each get?"
            steps={[
              { calc: '4 + 3 + 2 = 9 parts' },
              { calc: '1,800 ÷ 9 = £200 per part' },
              { calc: '4 × 200 = £800' },
              { calc: '3 × 200 = £600' },
              { calc: '2 × 200 = £400', note: 'Check: 800 + 600 + 400 = 1,800.' },
            ]}
            answer="£800, £600 and £400"
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Money and time</ContentEyebrow>

          <ConceptBlock title="Time is not decimal, and that is where it goes wrong">
            <p>
              Money is straightforward: two decimal places, and the same arithmetic as any other
              decimal. Time is the one that catches people, because an hour has 60 minutes and not
              100. <strong>1 hour 30 minutes is 1.5 hours, not 1.30.</strong> Keying 1.30 into a
              rate calculation quietly underpays you.
            </p>
            <p>
              To convert minutes to a decimal, divide by 60: 15 min = 0.25 h, 20 min = 0.33 h, 45
              min = 0.75 h. To go back, multiply the decimal part by 60.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You are on site 7 h 45 min on Monday and 6 h 20 min on Tuesday, at £22.50/hour. What do you invoice?"
            steps={[
              { calc: '45 ÷ 60 = 0.75 h', note: 'Monday as a decimal: 7.75 h.' },
              {
                calc: '20 ÷ 60 = 0.333 h',
                note: 'Tuesday: 6.333 h. Keep the extra digits for now.',
              },
              { calc: '7.75 + 6.333 = 14.083 h' },
              { calc: '14.083 × 22.50 = 316.875' },
              { calc: 'Round to £316.88', note: 'Round once, at the end, to the nearest penny.' },
            ]}
            answer="£316.88"
            watchOut="Rounding 6.333 to 6.33 at step two costs you about 7p here — trivial. Rounding it to 6.3 costs 75p, and on a month of timesheets that is real money going the wrong way."
          />

          <InlineCheck
            question="A job takes 2 h 15 min. What is that as a decimal number of hours?"
            options={['2.15 h', '2.25 h', '2.75 h', '2.5 h']}
            correctIndex={1}
            explanation="15 ÷ 60 = 0.25, so 2 h 15 min = 2.25 h. Writing it as 2.15 is the classic error — it treats an hour as though it had 100 minutes."
          />

          <SectionRule />

          <CommonMistake
            title="Sharing a job in a ratio by dividing by the wrong number"
            whatHappens="Three electricians split £1,800 in the ratio 3:2:1 and somebody divides £1,800 by 3 because there are three people. Each 'share' comes out at £600, the three add to £1,800, and it looks right — but it has ignored the ratio entirely and paid everyone the same."
            doInstead="Add the parts first: 3 + 2 + 1 = 6. That is how many shares exist, not how many people. £1,800 ÷ 6 = £300 per share, so the split is £900, £600 and £300. Whenever a ratio question goes wrong, it is almost always because the parts were not added first."
          />

          <SectionRule />

          {/* ── 09 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>09 · Rounding and estimation</ContentEyebrow>

          <ConceptBlock title="Estimate first — it is your error check">
            <p>
              Round each number to something you can do in your head, work out the rough answer,
              then do the real calculation. If the two are miles apart, you have made a place-value
              slip. This takes ten seconds and catches the errors that matter, which are the ones
              that are out by a factor of ten.
            </p>
            <p>
              On rounding itself: look at the digit immediately to the right of where you are
              cutting. 5 or more rounds up, 4 or less rounds down. But direction matters more than
              convention when you are ordering materials or sizing a protective device — see below.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A circuit has a design current of 28.4 A. Which standard BS 88 fuse rating do you select?"
            steps={[
              { calc: 'Standard ratings either side: 25 A and 32 A' },
              { calc: '25 A < 28.4 A', note: 'Too small — the fuse would operate in normal use.' },
              {
                calc: 'Next standard rating up = 32 A',
                note: '30 A is not a standard BS 88 rating.',
              },
            ]}
            answer="32 A"
            watchOut="This is the clearest case of rounding direction mattering more than the rounding rule. 28.4 rounds to 28 mathematically, but the protective device has to be at least the design current — so you go up, always."
          />

          <CommonMistake
            title="Rounding part-way through a calculation"
            whatHappens={
              <p>
                You round 0.375 to 0.38 at step one, then multiply by a large number. The error you
                introduced gets multiplied too, and the final answer is out by more than the
                rounding ever was.
              </p>
            }
            doInstead={
              <p>
                Carry the full figure all the way through and round once, at the end, to the
                accuracy the question asks for. Where a question says "to two decimal places", that
                instruction applies to the answer — not to your working.
              </p>
            }
          />

          <SectionRule />

          <TryIt
            question="A 30 m roll costs £46.80. What is the price per metre, to the nearest penny?"
            steps={[
              {
                calc: 'Estimate: 45 ÷ 30 = 1.50',
                note: 'Do this first so you can sanity-check the answer.',
              },
              { calc: '46.80 ÷ 30 = 1.56' },
              {
                calc: 'Exact to the penny already',
                note: 'And close to the estimate, so it holds up.',
              },
            ]}
            answer="£1.56 per metre"
          />

          <ContentEyebrow>10 · Putting it together</ContentEyebrow>

          <Scenario
            title="Pricing a small rewire"
            situation={
              <p>
                A customer wants six double sockets and two lighting circuits. You measure 62 m of
                2.5 mm&sup2; and 38 m of 1.5 mm&sup2; from the drawing. Cable is £1.35/m and
                £0.92/m. Accessories come to £84.60. You estimate 11 h 30 min at £22.50/h. There is
                20% VAT on the lot, and the customer has asked for a figure before you leave.
              </p>
            }
            whatToDo={
              <div className="space-y-2">
                <p>
                  Estimate first so you know roughly where you should land: 60 m at about £1.35 is
                  about £80, 40 m at about £0.90 is about £36, accessories £85, and 11 h at £22.50
                  is about £250. Call it £450 before VAT.
                </p>
                <p>
                  Then the real figures, one line at a time. 62 &times; 1.35 = £83.70. 38 &times;
                  0.92 = £34.96. Add the accessories: 83.70 + 34.96 + 84.60 = £203.26 of materials.
                  Labour: 30 min is 0.5 h, so 11.5 &times; 22.50 = £258.75. Subtotal 203.26 + 258.75
                  = £462.01. VAT at 20%: 0.2 &times; 462.01 = £92.40. Total £554.41.
                </p>
                <p>
                  £462 before VAT against an estimate of £450 — close enough to trust. Had it come
                  out at £4,620 you would know instantly that a decimal had slipped.
                </p>
              </div>
            }
            whyItMatters={
              <p>
                Every technique on this page appears in that one quote: decimals, multiplication,
                time conversion, percentages and estimation. The exam does the same thing — it
                rarely tests one skill on its own, because the job never does either.
              </p>
            }
          />

          <SectionRule />

          <FAQ
            items={[
              {
                question: 'How much of the paper is without a calculator?',
                answer: (
                  <p>
                    Part of every Functional Skills maths assessment has to be completed without a
                    calculator — the split varies by level and by awarding body, so check the spec
                    for the one you are entered with. The techniques marked{' '}
                    <strong>No calculator</strong> on this page are the ones worth being able to do
                    on paper regardless.
                  </p>
                ),
              },
              {
                question: 'Do I lose marks if my answer is right but I showed no working?',
                answer: (
                  <p>
                    On a multi-mark question, yes — method marks are awarded for the working, and a
                    bare answer cannot earn them. It also means a small slip costs you everything
                    rather than one mark. Write the steps down even when you can do it in your head.
                  </p>
                ),
              },
              {
                question: 'What if I round differently to the mark scheme?',
                answer: (
                  <p>
                    Follow whatever the question asks for — "to two decimal places", "to the nearest
                    penny", "to the nearest whole number". Where it does not say, give a sensible
                    degree of accuracy for the context and do not round part-way through. Money goes
                    to two decimal places; a cable length to the nearest 0.1 m is plenty.
                  </p>
                ),
              },
              {
                question: 'Is any of this the same as the maths in the electrical course?',
                answer: (
                  <p>
                    It is the foundation for it. Ohm&rsquo;s law, voltage drop, power and diversity
                    calculations are all built on the percentages, decimals and transposition here.
                    Getting this solid makes the electrical maths considerably easier later.
                  </p>
                ),
              },
            ]}
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Line the decimal points up before adding or subtracting. Pad with zeros so every number has the same number of decimal places.',
              'A fraction is a division: work it out as a decimal and the question gets easier.',
              'Percentage of a number — turn the percentage into a decimal and multiply. Finding a percentage — divide, then multiply by 100.',
              'BIDMAS governs what your calculator does, so bracket the top of any fraction before dividing.',
              'Adding a positive to a negative moves you up the number line. Two negatives multiplied give a positive.',
              'Estimate before you calculate, and round once at the end — except when sizing a device or ordering materials, where you round up regardless.',
              'Ratio: add the parts, divide to find one part, multiply back up. Check the shares add to the original.',
              'Time is not decimal. 1 h 30 min is 1.5 h, and minutes convert by dividing by 60.',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Check yourself</ContentEyebrow>
          <p className="text-[13px] leading-relaxed text-white">
            Eight questions on everything above. Work each one out before you look at the options —
            the wrong answers are the ones people actually give, so a plausible-looking option is
            not much of a clue.
          </p>
          <Quiz questions={quizQuestions} />

          <SectionRule />

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/functional-skills/module1')}
              className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back
              </div>
              <div className="mt-1 truncate text-[14px] font-semibold text-white">
                Module 1 · Mathematics
              </div>
            </button>
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module1/section2')
              }
              className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
            >
              <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 truncate text-right text-[14px] font-semibold text-white">
                Units and measurement
              </div>
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule1Section1;
