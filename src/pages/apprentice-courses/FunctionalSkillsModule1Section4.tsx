/**
 * Functional Skills · Module 1 · Section 4 — Data and statistics
 *
 * CONVERTED (13 Sep) to the StudyPage reading kit and rewritten around worked
 * examples, completing Module 1.
 *
 * The quiz was kept intact — all eight answers were checked arithmetically and
 * all eight are right, including the trimodal RCD question, which is a better
 * question than it first looks: most people assume a data set has exactly one
 * mode, and this one has three.
 *
 * Charts are the one part of this subject that wants pictures, and the reading
 * kit has no chart component. Rather than describe a bar chart in prose and hope,
 * this page works from tabulated data — which is honest, matches what a test
 * sheet actually looks like, and is how the exam presents most of its data
 * anyway. The chart-reading skills are taught through what the numbers behind a
 * chart mean.
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

const TITLE = 'Data and Statistics - Functional Skills Module 1.4';
const DESCRIPTION =
  'Functional Skills maths for electricians: mean, median and mode, range and spread, reading tables and charts, and interpreting a set of test results — worked through on real readings.';

const quizQuestions = [
  {
    id: 1,
    question:
      'Five insulation resistance readings are: 200, 250, 300, 350 and 400 MΩ. What is the mean?',
    options: ['250 MΩ', '300 MΩ', '350 MΩ', '275 MΩ'],
    correctAnswer: 1,
    explanation:
      'Mean = total ÷ how many = (200 + 250 + 300 + 350 + 400) ÷ 5 = 1,500 ÷ 5 = 300 MΩ.',
  },
  {
    id: 2,
    question:
      'Daily consumption is: Mon 42 kWh, Tue 55, Wed 38, Thu 61, Fri 54. What is the range?',
    options: ['50 kWh', '61 kWh', '23 kWh', '19 kWh'],
    correctAnswer: 2,
    explanation:
      'Range = highest − lowest = 61 − 38 = 23 kWh. The range is a single number describing how spread out the data is, not a pair of values.',
  },
  {
    id: 3,
    question:
      'Seven R1+R2 readings (in Ω) are: 0.28, 0.31, 0.29, 0.35, 0.30, 0.29, 0.32. What is the median?',
    options: ['0.31 Ω', '0.29 Ω', '0.32 Ω', '0.30 Ω'],
    correctAnswer: 3,
    explanation:
      'Put them in order first: 0.28, 0.29, 0.29, 0.30, 0.31, 0.32, 0.35. With seven values the median is the fourth, which is 0.30 Ω. Sorting is the step people skip.',
  },
  {
    id: 4,
    question:
      'A pie chart of 80 recorded incidents shows that 35% were caused by damaged cables. How many incidents is that?',
    options: ['28 incidents', '35 incidents', '23 incidents', '45 incidents'],
    correctAnswer: 0,
    explanation:
      '35% of 80 = 0.35 × 80 = 28 incidents. A pie chart gives you proportions — to get a count you need the total as well.',
  },
  {
    id: 5,
    question:
      'A meter reads 34,560 kWh on 1 March and 35,840 kWh on 1 April. How many kWh were used in March?',
    options: ['1,180 kWh', '1,280 kWh', '1,380 kWh', '70,400 kWh'],
    correctAnswer: 1,
    explanation:
      'Consumption = later reading − earlier reading = 35,840 − 34,560 = 1,280 kWh. Adding them gives 70,400, which is there to catch anyone not reading the question.',
  },
  {
    id: 6,
    question:
      'A line graph of a transformer secondary shows a steady 24 V across the whole test period. What is the output voltage?',
    options: ['230 V', '460 V', '24 V', '12 V'],
    correctAnswer: 2,
    explanation:
      'A flat line means the value is not changing — read it straight off the vertical axis. The skill being tested is reading the axis, not calculating anything.',
  },
  {
    id: 7,
    question:
      'Ten RCD trip times (in ms) are: 18, 22, 19, 21, 25, 20, 18, 23, 19, 20. What is the mode?',
    options: ['20 ms', '18 ms and 19 ms', '21 ms', '18 ms, 19 ms and 20 ms'],
    correctAnswer: 3,
    explanation:
      'Count each: 18 appears twice, 19 twice, 20 twice, and everything else once. Three values tie for the most common, so there are three modes — the data is trimodal. A set can have one mode, several, or none at all.',
  },
  {
    id: 8,
    question:
      'Quarterly energy costs are Q1 £3,250, Q2 £2,980, Q3 £2,760, Q4 £3,410. What is the annual total, and which quarter was lowest?',
    options: ['£12,400 — Q3', '£12,000 — Q3', '£12,400 — Q1', '£12,400 — Q2'],
    correctAnswer: 0,
    explanation:
      '3,250 + 2,980 + 2,760 + 3,410 = £12,400, and the smallest figure is Q3 at £2,760. Two-part questions want both parts — answering only one loses the mark.',
  },
];

const FunctionalSkillsModule1Section4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 1 · Section 4"
        title="Data and statistics"
        backTo="/study-centre/apprentice/functional-skills/module1"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default. These pages are carrying worked
            calculations in a mono face, and a column sized for prose squeezes
            the working onto two lines where it should sit on one. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Every test sheet you fill in is a data set. A column of insulation resistance readings,
            a run of R1+R2 values, a year of meter readings — statistics is simply the tools for
            saying what a column of numbers is telling you, and for spotting the one reading that
            does not belong.
          </p>

          <LearningOutcomes
            outcomes={[
              'Calculate the mean, median and mode of a set of readings.',
              'Say which average is the honest one for a given set, and why.',
              'Calculate the range, and describe what a wide or narrow range implies.',
              'Read a value off a table, a bar chart, a line graph and a pie chart.',
              'Turn a percentage from a pie chart into a count using the total.',
              'Work out a consumption figure from two meter readings.',
              'Spot an outlier in a set of test results and say what it might mean.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Decimals and ordering',
                gist: 'Finding a median means sorting the values first, which means comparing decimals confidently.',
                where: '1.1',
              },
              {
                term: 'Percentages',
                gist: 'A pie chart segment is a percentage. Turning it into a count is percentage-of-a-number.',
                where: '1.1',
              },
            ]}
          />

          <TLDR
            points={[
              'Mean: add them all up, divide by how many. The one people call "the average".',
              'Median: put them in order and take the middle one. Sorting first is not optional.',
              'Mode: the most common value. There can be one, several, or none.',
              'Range: highest minus lowest. A single number describing the spread.',
              'One extreme reading drags the mean but barely moves the median — which is why the median is the honest one when there is an outlier.',
              'A pie chart gives proportions. You need the total before you can turn a slice into a count.',
              'Consumption between two meter readings is always later minus earlier.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · The three averages</ContentEyebrow>

          <ConceptBlock title="Three different questions, three different answers">
            <p>
              &ldquo;Average&rdquo; is a loose word covering three separate measures, and they can
              give very different answers for the same data.
            </p>
            <p>
              The <strong>mean</strong> is the total shared out evenly. The <strong>median</strong>{' '}
              is the middle value once you have sorted them. The <strong>mode</strong> is whichever
              value occurs most often. Each one answers a different question, so the useful skill is
              knowing which to reach for.
            </p>
            <p>
              With an even count there is no single middle value, so you take the two in the middle
              and find the mean of those. Six readings? Sort them, take the third and fourth, add
              them and halve.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="Five insulation resistance readings: 200, 250, 300, 350 and 400 MΩ. Find the mean."
            steps={[
              { calc: '200 + 250 + 300 + 350 + 400 = 1,500', note: 'Add them all.' },
              { calc: '1,500 ÷ 5 = 300', note: 'Divide by how many there are.' },
            ]}
            answer="300 MΩ"
            watchOut="Divide by the count of readings, not by the largest one or by ten. Writing down how many you have before you start makes this automatic."
          />

          <WorkedExample
            question="Seven R1+R2 readings in ohms: 0.28, 0.31, 0.29, 0.35, 0.30, 0.29, 0.32. Find the median."
            steps={[
              {
                calc: 'Sort: 0.28, 0.29, 0.29, 0.30, 0.31, 0.32, 0.35',
                note: 'Always sort first.',
              },
              { calc: '7 values, so the middle is the 4th', note: '(7 + 1) ÷ 2 = 4.' },
              { calc: '4th value = 0.30' },
            ]}
            answer="0.30 Ω"
            watchOut="Taking the middle of the list as written, without sorting, gives 0.35 here — which is actually the highest reading in the set."
          />

          <TryIt
            nonCalculator
            question="Six readings: 12, 15, 11, 18, 14, 16. Find the median."
            steps={[
              { calc: 'Sort: 11, 12, 14, 15, 16, 18' },
              { calc: 'Middle two are the 3rd and 4th: 14 and 15' },
              { calc: '(14 + 15) ÷ 2 = 14.5' },
            ]}
            answer="14.5"
          />

          <WorkedExample
            question="Ten RCD trip times in ms: 18, 22, 19, 21, 25, 20, 18, 23, 19, 20. Find the mode."
            steps={[
              { calc: '18 appears twice', note: 'Tally each value.' },
              { calc: '19 appears twice' },
              { calc: '20 appears twice' },
              { calc: 'Everything else appears once' },
            ]}
            answer="18 ms, 19 ms and 20 ms — three modes"
            watchOut="A set does not have to have exactly one mode. Three values tie here, which makes the data trimodal. If every value appeared once there would be no mode at all."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Which average is honest?</ContentEyebrow>

          <ConceptBlock title="One bad reading can move the mean a long way">
            <p>
              The mean uses every value, so one extreme reading pulls it. The median only cares
              about position, so an outlier barely moves it. That difference is not a technicality —
              it decides which number you should quote.
            </p>
            <p>
              On a set of test results where one reading is wildly out, the median tells you what
              the circuit is typically doing while the mean tells you a number that describes none
              of the readings.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Five readings: 0.29, 0.30, 0.31, 0.30 and 2.80 Ω. Compare the mean and the median."
            steps={[
              { calc: 'Mean: 0.29 + 0.30 + 0.31 + 0.30 + 2.80 = 4.00' },
              { calc: '4.00 ÷ 5 = 0.80 Ω', note: 'Higher than four of the five readings.' },
              { calc: 'Sorted: 0.29, 0.30, 0.30, 0.31, 2.80' },
              { calc: 'Median = 3rd value = 0.30 Ω', note: 'Describes the set far better.' },
            ]}
            answer="Mean 0.80 Ω, median 0.30 Ω"
            watchOut="The 2.80 reading is the interesting one. It is not a statistics problem — it is a loose connection, a different circuit, or a mis-recorded figure, and the right response is to go and re-test rather than to average it away."
          />

          <CommonMistake
            title="Averaging away a reading that should be investigated"
            whatHappens={
              <p>
                A set of continuity readings has one that is ten times the others. Taking the mean
                buries it in a single tidy figure, the sheet gets signed, and nobody looks at the
                connection that produced it.
              </p>
            }
            doInstead={
              <p>
                Treat an outlier as a question, not a number. Re-test it. If it repeats, there is
                something physically different about that circuit; if it does not, the first reading
                was bad. Either way you have learned something no average would have told you.
              </p>
            }
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Range and spread</ContentEyebrow>

          <ConceptBlock title="How tightly grouped are the readings?">
            <p>
              The <strong>range</strong> is the highest value minus the lowest — a single number
              telling you how spread out the set is. A narrow range means consistency; a wide one
              means something is varying.
            </p>
            <p>
              On identical circuits tested the same way, a wide range is worth a second look. On
              energy consumption across a week it might simply mean the building is busier on some
              days than others. Context decides whether spread is a problem.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="Daily consumption: Mon 42, Tue 55, Wed 38, Thu 61, Fri 54 kWh. What is the range?"
            steps={[
              { calc: 'Highest = 61', note: 'Thursday.' },
              { calc: 'Lowest = 38', note: 'Wednesday.' },
              { calc: '61 − 38 = 23' },
            ]}
            answer="23 kWh"
            watchOut="The range is one number, not two. Quoting '38 to 61' describes the same thing but does not answer a question asking for the range."
          />

          <TryIt
            nonCalculator
            question="Six insulation readings in MΩ: 180, 195, 210, 188, 500, 192. What is the range, and which reading would you query?"
            steps={[
              { calc: 'Highest = 500, lowest = 180' },
              {
                calc: '500 − 180 = 320 MΩ',
                note: 'A very wide range for readings on similar circuits.',
              },
              {
                calc: 'The 500 sits far outside the rest',
                note: 'Five readings cluster near 190.',
              },
            ]}
            answer="Range 320 MΩ — query the 500 MΩ reading"
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Reading tables</ContentEyebrow>

          <ConceptBlock title="Find the row, find the column, read the cell">
            <p>
              Most data you meet arrives as a table, and most table questions are really
              instruction-following: identify the right row and the right column, then read the
              value where they meet.
            </p>
            <p>
              Where it gets harder is a question wanting something the table does not state directly
              — a total, a difference, or which entry is largest. Work out what operation the
              question is asking for before you touch the numbers.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Quarterly energy costs: Q1 £3,250, Q2 £2,980, Q3 £2,760, Q4 £3,410. Find the annual total and the lowest quarter."
            steps={[
              { calc: '3,250 + 2,980 = 6,230' },
              { calc: '6,230 + 2,760 = 8,990' },
              { calc: '8,990 + 3,410 = 12,400', note: 'Annual total.' },
              { calc: 'Smallest figure is 2,760', note: 'That is Q3.' },
            ]}
            answer="£12,400, lowest in Q3"
            watchOut="This asks two things. Answering only the total is half a mark on a two-mark question — underline both parts of a question before you start."
          />

          <ConceptBlock
            title="Two-way tables are where marks get lost"
            plainEnglish="A two-way table has categories running across the top AND down the side. The trap is reading along the wrong one."
          >
            <p>
              A price list with cable sizes down the side and suppliers across the top is a two-way
              table. So is a timesheet with days down the side and operatives across the top. The
              value you want sits where one row meets one column, and the single most common error
              is reading off the row above or below the one you wanted &mdash; especially on a
              printed sheet in poor light on a dusty bench.
            </p>
            <p>
              Two habits fix it. Put a finger on the row label and keep it there while your eye
              travels across. And when you have the answer, glance back at the row and column
              headings to confirm they are the two you were asked about. That second check takes a
              moment and catches nearly every misread.
            </p>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="Cable prices per metre: 1.5mm² — supplier A £0.72, supplier B £0.68. 2.5mm² — A £1.14, B £1.21. 6.0mm² — A £2.85, B £2.64. You need 90m of 2.5mm² and 40m of 6.0mm². Which supplier is cheaper overall, and by how much?"
            steps={[
              {
                calc: 'A: 90 × 1.14 = 102.60',
                note: 'Read across the 2.5mm² row to the A column.',
              },
              { calc: 'A: 40 × 2.85 = 114.00' },
              { calc: 'A total = 102.60 + 114.00 = £216.60' },
              { calc: 'B: 90 × 1.21 = 108.90' },
              { calc: 'B: 40 × 2.64 = 105.60' },
              { calc: 'B total = 108.90 + 105.60 = £214.50' },
              { calc: '216.60 − 214.50 = 2.10' },
            ]}
            answer="Supplier B, by £2.10"
            watchOut="Look at what nearly happened: B is dearer on the 2.5mm² and cheaper on the 6.0mm². Comparing a single row would have given you the wrong supplier. When a question asks which is cheaper overall, it almost always contains a row that points the other way — that is the whole point of the question."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="Day rates by operative and day: Mon — A £180, B £165. Tue — A £180, B £210. Wed — A £195, B £165. A worked Monday and Wednesday; B worked all three days. What does each one cost, and who costs more?"
            steps={[
              {
                calc: 'A: Mon 180 + Wed 195 = £375',
                note: 'Read down the A column, but only the rows A actually worked.',
              },
              { calc: 'B: 165 + 210 + 165 = £540' },
              { calc: 'B is dearer by 540 − 375 = £165' },
            ]}
            answer="A £375, B £540 — B costs £165 more. Note that B is on the lower rate on two of the three days; working more days is what makes the difference, not the rate."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Charts and graphs</ContentEyebrow>

          <ConceptBlock title="Read the axes before you read the bars">
            <p>
              A <strong>bar chart</strong> compares quantities across categories — read the height
              of a bar against the vertical axis. A <strong>line graph</strong> shows change over
              time; a flat line means no change, a steep one means fast change. A{' '}
              <strong>pie chart</strong> shows proportions of a whole, usually as percentages.
            </p>
            <p>
              The first thing to look at on any chart is the axes: what is being measured, in what
              units, and where does the scale start.
            </p>
            <p>
              That last one deserves more than a glance, because it is where a chart does its
              arguing. Two charts of identical data tell opposite stories depending on where the
              vertical axis begins. Starting at zero shows the real proportions. Starting at, say,
              90 makes a difference of two units look enormous, because you are seeing the top slice
              of each bar rather than the whole bar. Neither is dishonest in itself &mdash; a
              truncated axis is the right choice when you are tracking small variation in a big
              number, which is exactly what you want with voltage. But it means the number at the
              bottom of the axis, and whether the scale climbs in even steps the whole way, is the
              first thing you check and the bars are the second.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A pie chart of 80 recorded incidents shows 35% caused by damaged cables. How many incidents is that?"
            steps={[{ calc: '35% = 0.35' }, { calc: '0.35 × 80 = 28' }]}
            answer="28 incidents"
            watchOut="A pie chart on its own only gives proportions. Without the total of 80 you could not turn 35% into a count at all — check the total is stated before you try."
          />

          <InlineCheck
            question="A pie chart of 240 callouts shows 15% were no-fault-found. How many is that?"
            options={['36', '24', '15', '160']}
            correctIndex={0}
            explanation="0.15 × 240 = 36 callouts."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="A supplier's chart is headed 'Cable price increases' and shows four bars rising steeply left to right. The vertical axis runs from 2.40 to 2.60 in steps of 0.05. The bars read 2.44, 2.48, 2.53 and 2.57. How big is the increase really?"
            steps={[
              { calc: '2.57 − 2.44 = 0.13', note: 'The actual change across the whole chart.' },
              { calc: '0.13 ÷ 2.44 ≈ 0.053', note: 'As a proportion of where it started.' },
              { calc: '≈ 5%', note: 'Over the whole period shown.' },
            ]}
            answer="About 5%. The bars look dramatic because the axis covers a range of only 0.20 — the last bar is roughly four times the height of the first, but the price has risen by about a twentieth. Redraw it from zero and the four bars would look nearly identical."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Meter readings</ContentEyebrow>

          <ConceptBlock title="Consumption is a difference, not a reading">
            <p>
              A meter is a running total that only ever goes up. The number on it is not what was
              used — it is everything used since the meter was installed. To find consumption over a
              period you take the reading at the end and subtract the reading at the start.
            </p>
            <p>
              From there, multiplying by a unit rate gives a cost, which makes this one of the most
              directly useful calculations on the page.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A meter reads 34,560 kWh on 1 March and 35,840 kWh on 1 April. How much was used, and what did it cost at 24.5p per kWh?"
            steps={[
              { calc: '35,840 − 34,560 = 1,280 kWh', note: 'Later minus earlier.' },
              { calc: '24.5p = £0.245', note: 'Into pounds before multiplying.' },
              { calc: '1,280 × 0.245 = 313.60' },
            ]}
            answer="1,280 kWh, costing £313.60"
            watchOut="Adding the two readings gives 70,400 — a number so large it should be obviously wrong, but it appears as an option because people do it under time pressure."
          />

          <TryIt
            question="A meter goes from 12,890 to 13,145 kWh over a month. At 26p per kWh, what is the bill?"
            steps={[{ calc: '13,145 − 12,890 = 255 kWh' }, { calc: '255 × 0.26 = 66.30' }]}
            answer="£66.30"
          />

          <Scenario
            title="The bill that doubled"
            situation={
              <p>
                A landlord rings. The electricity bill for a two-bed flat has gone from about £62 a
                month to £131 and the tenant insists nothing has changed. He wants to know whether
                something is wrong with the wiring before he starts an argument with the tenant or
                the supplier.
              </p>
            }
            whatToDo={
              <div className="space-y-2">
                <p>
                  Ask for the readings rather than the bills. A bill is a figure somebody else
                  calculated; a meter reading is data. Specifically, ask whether the recent bills
                  say &ldquo;estimated&rdquo; anywhere on them &mdash; that word is the single most
                  common explanation for a bill that doubles for no reason.
                </p>
                <p>
                  Then take a reading yourself, and take another a week later. The difference
                  divided by seven is the flat&rsquo;s actual daily consumption, and that is a
                  number you can compare against the billed period.
                </p>
              </div>
            }
            whyItMatters="Two estimated bills that under-read, followed by one actual reading, produce exactly this pattern — a sudden doubling that is really the supplier catching up on months of undercharging. No fault, no faulty wiring, nothing to fix. Working from readings rather than from bills tells you that in ten minutes, and it is the difference between a five-minute phone call and a day chasing a fault that was never there."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Putting it together</ContentEyebrow>

          <Scenario
            title="Reading a sheet of insulation resistance results"
            situation={
              <p>
                You have tested eight circuits on a board. The readings, in MΩ, are: 195, 210, 188,
                205, 12, 199, 215 and 190. The client wants a figure for the report.
              </p>
            }
            whatToDo={
              <div className="space-y-2">
                <p>
                  Sort them first: 12, 188, 190, 195, 199, 205, 210, 215. Straight away the 12 looks
                  wrong — everything else sits between 188 and 215.
                </p>
                <p>
                  The mean: the eight add to 1,414, and 1,414 ÷ 8 = 176.75 MΩ. The median: eight
                  values, so the middle two are the 4th and 5th — 195 and 199 — giving (195 + 199) ÷
                  2 = 197 MΩ. The range is 215 − 12 = 203 MΩ.
                </p>
                <p>
                  The mean has been dragged down more than 20 MΩ by a single reading. The median of
                  197 describes the board far better. But the real answer is not a statistic at all:
                  go back and re-test the circuit that gave 12 MΩ.
                </p>
              </div>
            }
            whyItMatters={
              <p>
                Mean, median, range and outlier detection in one sheet — and the point of all four
                is to notice the reading that needs a second look. Statistics on a test sheet is a
                tool for finding the problem, not for smoothing it over.
              </p>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Sense-check every figure before you write it down: right size, right unit, sits with the others.',
              'An answer out by a factor of ten or a hundred is a decimal point or a unit, not a calculation.',
              "Check where a chart's vertical axis starts before you read anything off it.",
              'Name the average you are reporting — mean and median can be far apart and mean different things.',
              'Mean is the total divided by the count. Median is the middle after sorting. Mode is the most frequent value.',
              'Sort before finding a median. With an even count, take the mean of the middle two.',
              'A set can have one mode, several, or none at all.',
              'Range is highest minus lowest — one number, not two.',
              'One extreme value drags the mean but barely moves the median.',
              'An outlier is a question, not a number. Re-test it rather than averaging it away.',
              'A pie chart gives proportions; you need the total to get a count.',
              'Consumption between meter readings is always later minus earlier.',
            ]}
          />

          <SectionRule />

          <FAQ
            items={[
              {
                question: 'Which average will the exam want?',
                answer: (
                  <p>
                    If it names one, use that one. If it says &ldquo;average&rdquo; without
                    qualifying it, it almost always means the mean. Where a question asks which
                    average best represents the data, it is usually pointing at an outlier and
                    wanting the median.
                  </p>
                ),
              },
              {
                question: 'Do I have to show the sorted list for a median?',
                answer: (
                  <p>
                    It is worth writing out. It earns method marks, and it is the step that stops
                    you taking the middle of the unsorted list — which is the commonest way this
                    question is dropped.
                  </p>
                ),
              },
              {
                question: 'What counts as an outlier?',
                answer: (
                  <p>
                    There are formal statistical tests, but Functional Skills does not need them. A
                    value sitting a long way from the rest of the set, with a clear gap between it
                    and the nearest neighbour, is what you are being asked to spot.
                  </p>
                ),
              },
              {
                question: 'Why is the median better for test results?',
                answer: (
                  <p>
                    Because test readings on similar circuits should cluster, so a value far from
                    the cluster usually means something is different about that circuit rather than
                    that the typical value has changed. The median ignores how far away an outlier
                    is; the mean does not.
                  </p>
                ),
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>08 · Does this number look right?</ContentEyebrow>

          <ConceptBlock
            title="The habit that catches nearly everything"
            onSite="Every experienced electrician does this without noticing. They glance at a figure and something in the back of their head says no. That feeling is not instinct — it is an estimate they made without realising."
          >
            <p>
              Everything on this page has been about getting a number <em>out</em> of data. This
              last part is about the thing to do immediately afterwards, which is to ask whether the
              number is plausible before you write it down. It takes two seconds and it catches the
              errors that matter, because the errors that matter are rarely small ones. A misplaced
              decimal point, a value entered into the wrong column, a reading taken on the wrong
              range &mdash; these do not produce answers that are slightly off. They produce answers
              that are out by a factor of ten, a hundred, a thousand.
            </p>
            <p>
              That is good news, because an answer out by a factor of a hundred is easy to spot if
              you have any expectation at all of what the answer should be. The skill is forming
              that expectation first.
            </p>
            <ul className="space-y-1.5">
              <li>
                <strong className="text-white">Is it the right size?</strong> Not exactly right
                &mdash; roughly. A domestic lighting circuit drawing 60&nbsp;A is not slightly high,
                it is impossible. An insulation resistance of 0.5&nbsp;M&Omega; on a healthy circuit
                is not a good result with an odd decimal, it is a failure.
              </li>
              <li>
                <strong className="text-white">Does it have the right unit?</strong> Ohms and
                milliohms differ by a thousand. Amps and milliamps differ by a thousand. Most
                wildly-wrong answers are right numbers wearing the wrong unit.
              </li>
              <li>
                <strong className="text-white">Does it sit with the others?</strong> One value far
                from a cluster of similar values is telling you something &mdash; either about that
                circuit, or about how it was measured.
              </li>
            </ul>
          </ConceptBlock>

          <WorkedExample
            nonCalculator
            question="A meter reading for a small workshop comes out at 2,400 kWh for one week. The workshop has a few lights, some benches, a compressor and a kettle. Should you accept the figure?"
            steps={[
              {
                calc: '2,400 kWh ÷ 7 days = ~343 kWh/day',
                note: 'Get it to a daily figure — weekly numbers are hard to picture.',
              },
              {
                calc: '343 kWh ÷ 24 h = ~14 kW, continuously',
                note: 'That is the average draw, day and night, all week.',
              },
              {
                calc: '14 kW is roughly six electric showers running non-stop',
                note: 'Now it is a picture rather than a number.',
              },
            ]}
            answer="No — go back and check. A workshop with lights, benches, a compressor and a kettle does not average 14 kW around the clock. The likeliest explanations are a misread digit, a reading taken across more than a week, or the wrong meter."
            watchOut="Notice that at no point did this need the real answer. You do not have to know what the workshop should use — you only have to know that 14 kW continuously is not it. That is what a sense-check is: comparing against something you can picture, not against a correct figure you do not have."
          />

          <SectionRule />

          <TryIt
            nonCalculator
            question="A schedule of test results shows Zs values for six socket circuits on the same board: 0.42, 0.51, 0.47, 0.44, 51.0 and 0.49 Ω. What do you do with the 51.0?"
            steps={[
              {
                calc: 'Five values cluster between 0.42 and 0.51',
                note: 'That tight a cluster is what you expect from similar circuits on one board.',
              },
              {
                calc: '51.0 is roughly a hundred times the others',
                note: 'A factor of about 100 is the signature of a decimal point in the wrong place.',
              },
              {
                calc: '0.51 already appears in the list',
                note: 'Which makes a transcription slip more likely still.',
              },
            ]}
            answer="Do not average it in, and do not quietly correct it either. Go back and re-test that circuit. It is probably 0.51 Ω written badly — but 51 Ω on a socket circuit would be a serious finding, and the one thing you cannot do is decide which it was from the paperwork. The point of spotting it is to send you back to the board, not to let you fix it at the desk."
          />

          <CommonMistake
            title="Correcting an odd reading instead of re-taking it"
            whatHappens="A value looks obviously wrong, so you write down what it 'should' have been. You are almost certainly right. But you have now recorded a figure you did not measure on a document you signed, and if you were wrong that once, the record hides a real fault."
            doInstead="Re-test. If you genuinely cannot, record what you actually got and note that it needs investigation. A reading flagged as doubtful is useful; a reading silently improved is worthless, because nobody can tell which of your numbers are measurements any more."
          />

          <CommonMistake
            title="Trusting a figure because a calculator produced it"
            whatHappens="You key in the sum, the screen shows 176.75, and you write it down. A calculator will faithfully return the answer to the question you actually asked it, including when that was not the question you meant to ask."
            doInstead="Estimate before you key anything in — round the numbers and get a rough answer in your head first. If the screen disagrees with your estimate by a lot, one of the two is wrong and it is worth ten seconds to find out which."
          />

          <CommonMistake
            title="Reporting an average without saying which one"
            whatHappens='A report says "average insulation resistance 176.75 MΩ". The reader has no idea whether that is a mean dragged down by one bad circuit or a median that ignored it — and those mean very different things about the installation.'
            doInstead='Name it. "Median insulation resistance across eight circuits: 197 MΩ. One circuit (circuit 5) read 12 MΩ and is reported separately." Now the reader knows what the figure is and what it excludes.'
          />

          <SectionRule />

          <ContentEyebrow>Check yourself</ContentEyebrow>
          <p className="text-[13px] leading-relaxed text-white">
            Eight questions on averages, range, charts and meter readings. Question seven has more
            than one right value in its answer — read it carefully.
          </p>
          <Quiz questions={quizQuestions} />

          <SectionRule />

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module1/section3')
              }
              className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 truncate text-[14px] font-semibold text-white">
                Algebra and formulae
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/functional-skills/module2')}
              className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
            >
              <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 truncate text-right text-[14px] font-semibold text-white">
                English for electricians
              </div>
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule1Section4;
