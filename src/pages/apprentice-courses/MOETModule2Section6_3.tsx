/**
 * MOET · Module 2 · Section 2.6 · Subsection 3 — Statistics for Maintenance Data
 *
 * NEW PAGE (12 Sep) — part of Section 2.6, written to close the ST1426 KSB gap
 * found in a coverage audit of all 88 in-scope KSBs. K17 requires "Statistical
 * methods to display data (mean, mode, median)". Before this section the course
 * had no coverage of mean, mode or median anywhere in 198 pages.
 *
 * Deliberately built to feed the condition-monitoring and RCA pages in Module 4
 * (4.2.6 trend analysis, 4.6.x root cause) rather than teach statistics in the
 * abstract — the averages are introduced through maintenance data.
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 *
 * KSBs covered, quoted rather than numbered: the IfATE/Skills England API
 * publishes these statements without their K/S/B codes, and the published
 * numbering has not been verified against a primary source — so do not invent
 * codes here.
 *   Knowledge  · "Algebraic methods. Trigonometric methods and standard
 *                 formulae to determine areas and volumes. Statistical methods
 *                 to display data (mean, mode, median). Elementary calculus
 *                 techniques: coefficient, gradient of a curve, rate of change."
 *              · "Continuous improvement (CI) systems and techniques."
 *   Skills     · "Apply problem solving and critical reasoning techniques."
 *              · "Record information."
 *   Behaviours · "Take ownership for the delivery and quality of own work."
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
  Prerequisites,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Statistics for Maintenance Data - MOET Module 2.6.3';
const DESCRIPTION =
  'Mean, median and mode for maintenance technicians: choosing the right average, measuring spread, displaying data with histograms, run charts and Pareto analysis, and reading condition-monitoring trends without being misled.';

const quickCheckQuestions = [
  {
    id: 'stats-which-average',
    question:
      'Downtime for six breakdowns, in hours: 2, 2, 3, 3, 4, 40. Which average best represents a typical breakdown?',
    options: [
      'The mean, 9 hours',
      'The median, 3 hours',
      'The mode, 2 and 3 hours',
      'The range, 38 hours',
    ],
    correctIndex: 1,
    explanation:
      'The single 40-hour outlier drags the mean up to 9 hours, which is longer than five of the six actual breakdowns. The median — the middle value when sorted — is 3 hours, and that genuinely describes a typical event. Whenever one extreme value dominates a small set, the median is the honest average.',
  },
  {
    id: 'stats-mode-use',
    question: 'What does the mode tell you that the mean and median do not?',
    options: [
      'The total of all the values',
      'The most frequently occurring value',
      'How spread out the data is',
      'The difference between largest and smallest',
    ],
    correctIndex: 1,
    explanation:
      'The mode is the value that appears most often. It is the only one of the three averages that works on data with no numerical order at all — you cannot take the mean of a list of fault types, but you can say which fault occurs most. That makes it the natural average for categorical maintenance data.',
  },
  {
    id: 'stats-range-spread',
    question:
      'Two motors both average 4.0 mm/s vibration. Motor A ranges 3.9 to 4.1; motor B ranges 1.0 to 7.0. What does this tell you?',
    options: [
      'They are in identical condition because the averages match',
      'Motor B is more variable, and the average alone conceals that',
      'Motor A is in worse condition',
      'Nothing — range is not a useful measure',
    ],
    correctIndex: 1,
    explanation:
      'Identical averages can hide completely different behaviour. Motor A is stable and predictable; motor B swings across a range of 6 mm/s, which suggests something intermittent — a loose mounting, a varying load, or a developing fault. An average without a measure of spread beside it is only half the story.',
  },
  {
    id: 'stats-pareto',
    question: 'What does a Pareto analysis of breakdown causes help you do?',
    options: [
      'Calculate the mean time between failures',
      'Identify the small number of causes responsible for most of the downtime',
      'Predict exactly when the next failure will occur',
      'Determine the mode of the data set',
    ],
    correctIndex: 1,
    explanation:
      'Pareto analysis sorts causes by their total impact and displays them largest first, which nearly always reveals that a few causes account for most of the loss. It directs effort where it will actually pay — fixing the top two causes usually beats spreading attention evenly across fifteen.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Insulation resistance readings on five circuits, in MΩ: 120, 150, 150, 180, 400. What is the mode?',
    options: ['200 MΩ', '150 MΩ', '180 MΩ', '280 MΩ'],
    correctAnswer: 1,
    explanation:
      'The mode is the most frequently occurring value, and 150 appears twice while everything else appears once. The mean of this set is 200 MΩ and the median is 150 MΩ. Note that the mean sits higher than four of the five readings, pulled up by the single 400 MΩ result — another reminder to check which average you are quoting.',
  },
  {
    id: 2,
    question: 'When is the median a better choice than the mean?',
    options: [
      'When all the values are close together',
      'When the data contains outliers or is strongly skewed',
      'When the data has no numerical order',
      'When you need the total of all values',
    ],
    correctAnswer: 1,
    explanation:
      'The median is the middle value once the data is sorted, so extreme values at either end barely move it. That makes it the honest choice for skewed data — repair times, downtime, costs — where a handful of very large values would otherwise drag the mean somewhere unrepresentative. For data with no numerical order at all, you need the mode instead.',
  },
  {
    id: 3,
    question: 'Six repair times in minutes: 20, 25, 30, 35, 40, 45. What is the median?',
    options: ['30 minutes', '32.5 minutes', '35 minutes', '32 minutes'],
    correctAnswer: 1,
    explanation:
      'With an even number of values there is no single middle one, so the median is the mean of the two middle values: (30 + 35) ÷ 2 = 32.5 minutes. Forgetting this and simply taking the lower of the two middle values is a common slip. With an odd count you just take the middle value directly.',
  },
  {
    id: 4,
    question:
      'What does a run chart of vibration readings over time show you that a single average cannot?',
    options: [
      'The total vibration energy',
      'Whether the readings are trending in a direction, and how quickly',
      'The mode of the data',
      'The cost of the next repair',
    ],
    correctAnswer: 1,
    explanation:
      'An average collapses time out of the data entirely. A machine whose vibration has climbed steadily from 2 to 6 mm/s and one that has sat at 4 mm/s throughout can share the same average, but they are in completely different condition. Plotting against time is what makes the direction and the rate of change visible — and in condition monitoring, the direction matters more than the level.',
  },
  {
    id: 5,
    question:
      'A histogram of test results shows a tall bar at one value and short bars either side. What does this indicate?',
    options: [
      'The data is evenly spread',
      'Most results cluster around one value, with few outliers',
      'The data has no mode',
      'The measurements are unreliable',
    ],
    correctAnswer: 1,
    explanation:
      'A histogram groups values into ranges and shows how many fall into each. A tall central bar means most readings cluster there, which is what you would expect from a process under control. A histogram with two separate peaks would suggest two different populations mixed together — often a sign that two machines, two operators or two conditions have been recorded as one data set.',
  },
  {
    id: 6,
    question: 'Why is the mean a poor summary of repair costs across a year?',
    options: [
      'Because costs are not numbers',
      'Because a few very expensive failures skew it upward, above what most repairs actually cost',
      'Because the mean cannot be calculated for currency',
      'Because costs always have a mode',
    ],
    correctAnswer: 1,
    explanation:
      'Repair cost data is almost always skewed — dozens of small jobs and a handful of major failures. The mean sits somewhere above the bulk of the data, describing a repair that rarely happens. Quote the median for what a typical repair costs, and quote the total or the mean separately when the question is about budget, because the budget really does have to cover the expensive ones.',
  },
  {
    id: 7,
    question: 'What is MTBF and what does it measure?',
    options: [
      'Maximum time before failure — the longest a machine has run',
      'Mean time between failures — total operating time divided by the number of failures',
      'Median time between faults',
      'Minimum tolerance before fault',
    ],
    correctAnswer: 1,
    explanation:
      'Mean time between failures is total operating time divided by the number of failures in that period. A machine running 8000 hours with four failures has an MTBF of 2000 hours. It is a useful comparative figure between machines or between periods, but because it is a mean it says nothing about whether the failures were evenly spaced or all clustered in one bad month.',
  },
  {
    id: 8,
    question:
      'Breakdown causes on a line, by hours lost: bearings 40, seals 12, electrical 8, controls 5, other 5. What does Pareto analysis suggest?',
    options: [
      'Spread improvement effort equally across all five causes',
      'Concentrate on bearings, which account for well over half the downtime',
      'Address "other" first because it is least understood',
      'Nothing can be concluded without knowing the mean',
    ],
    correctAnswer: 1,
    explanation:
      'Bearings account for 40 of 70 hours — 57 per cent — and bearings plus seals account for 74 per cent. Sorting causes by impact makes it obvious where effort pays. Spreading attention evenly across five causes would put as much effort into the two 5-hour categories as into the one costing eight times as much.',
  },
  {
    id: 9,
    question: 'Two variables rise together on a scatter plot. What can you conclude?',
    options: [
      'One definitely causes the other',
      'They are correlated, but correlation alone does not establish cause',
      'The data must be wrong',
      'The mean of both is identical',
    ],
    correctAnswer: 1,
    explanation:
      'Correlation says two things move together; it does not say which causes which, or whether a third factor drives both. Bearing temperature and vibration often rise together because a common underlying fault is driving both, not because one causes the other. Treating correlation as proof of cause is how root cause analysis ends up fixing the wrong thing.',
  },
  {
    id: 10,
    question:
      'You have three vibration readings taken over three months and the trend appears to be rising. What is the main limitation?',
    options: [
      'Three readings is a very small sample — normal variation can look like a trend',
      'Vibration cannot be trended',
      'The mean cannot be calculated from three values',
      'Three months is too long a period',
    ],
    correctAnswer: 0,
    explanation:
      'With very few points, ordinary scatter is easily mistaken for a trend, and a single bad reading can create one that is not there. Trending needs enough history to distinguish signal from noise, and readings taken under consistent conditions — similar load, similar temperature, same measurement position. Three points is a prompt to keep watching, not a basis for a shutdown decision.',
  },
];

const faqs = [
  {
    question: 'Which average should I use by default?',
    answer:
      'There is no safe default, which is exactly why the standard asks you to know all three. Use the mean when the data is reasonably symmetrical and you want a figure that accounts for every value — it is also the right one when you care about totals, because the mean multiplied by the count gives the total back. Use the median when the data is skewed or contains outliers, which covers most repair times, downtime figures and costs. Use the mode when the data is categorical and has no numerical order at all, such as which fault type occurs most often. The habit worth building is to calculate more than one and notice when they disagree, because a large gap between mean and median is itself telling you the data is skewed.',
  },
  {
    question: 'How much data do I need before a trend is real?',
    answer:
      'More than most people assume. Two points always make a line and three often look convincing, but neither tells you whether what you are seeing is a genuine change or ordinary variation. What matters as much as the number of readings is their consistency: condition monitoring only compares meaningfully if the machine was under similar load, at similar temperature, measured at the same point with the same instrument settings. A rising trend built from readings taken at different loads is measuring the load, not the machine. If you have few points, keep monitoring and shorten the interval rather than acting on the apparent trend.',
  },
  {
    question: 'What is the difference between a histogram and a bar chart?',
    answer:
      'A bar chart compares separate categories — downtime by fault type, failures by machine — and the bars have no natural order, so you can rearrange them freely. A histogram displays the distribution of a single continuous measurement by grouping values into ranges, and the order is fixed because the ranges run along a number line. The practical difference is what they tell you: a bar chart answers "which category is biggest", a histogram answers "how is this measurement spread out, and is it clustered or scattered".',
  },
  {
    question: 'Is standard deviation something I need for this role?',
    answer:
      "You need to know what it means rather than how to calculate it by hand. Standard deviation is a measure of spread — roughly, how far a typical reading sits from the mean. A small standard deviation means readings cluster tightly and the process is consistent; a large one means they scatter. It matters in maintenance because it tells you how much variation is normal, which is what lets you judge whether today's reading is genuinely unusual or just ordinary scatter. Any spreadsheet will calculate it, and for most practical purposes the range — largest minus smallest — carries much of the same message with far less effort.",
  },
  {
    question: 'Why does the standard ask for statistics in an electrical maintenance role?',
    answer:
      'Because modern maintenance is increasingly driven by data rather than by the calendar. Condition monitoring produces vibration, temperature and current readings over time, and the whole point of collecting them is to spot a change before it becomes a failure. Reliability-centred maintenance depends on failure data. Continuous improvement work depends on being able to show that a change actually improved something. All of that needs someone who can look at a set of numbers and say what it does and does not support — and, just as importantly, resist a conclusion the data cannot carry.',
  },
  {
    question: 'My readings jump around a lot. Is the instrument faulty?',
    answer:
      'Possibly, but check the conditions first. Variation in condition-monitoring data usually comes from the measurement conditions rather than the instrument: different load, different temperature, a slightly different probe position, a different mounting. Before suspecting the meter, establish whether the readings were taken the same way each time. If they were, and the scatter is still large, then the variation is telling you something real about the machine — an intermittent fault, a varying load, or something loose. Large scatter is data, not noise to be discarded.',
  },
];

const MOETModule2Section6_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2.6 · Subsection 3"
        title="Statistics for Maintenance Data"
        backTo="/study-centre/apprentice/m-o-e-t-module2-section6"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage>
          <p className="text-[13px] leading-relaxed text-white">
            Condition monitoring produces numbers by the thousand. The skill that turns them into
            maintenance decisions is knowing which average to quote, how much spread is normal, and
            when a set of readings genuinely will not support the conclusion someone wants from it.
          </p>

          <TLDR
            points={[
              'Three averages, three jobs. Mean uses every value; median resists outliers; mode is the only one that works on categories.',
              'A large gap between mean and median is itself a finding — it tells you the data is skewed.',
              'An average without a measure of spread beside it is half a story. Identical means can hide completely different machines.',
              'Plot against time. A run chart shows direction and rate of change; an average throws time away.',
              'Pareto sorts causes by impact — a few usually account for most of the downtime.',
              'Correlation is not cause. Two things rising together often share an underlying driver.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Engineering notation',
                gist: 'Maintenance data spans milliamps to megohms. Handling those magnitudes without slipping a factor of a thousand is assumed here.',
                where: '2.6.1',
              },
              {
                term: 'Condition monitoring',
                gist: 'Vibration, temperature and current readings taken over time to detect deterioration. This page is the arithmetic behind that practice.',
                where: '4.2',
              },
              {
                term: 'Planned preventive maintenance',
                gist: 'Why maintenance is scheduled at all, and what failure data is used for. Statistics is how PPM intervals get justified rather than guessed.',
                where: '4.1',
              },
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Calculate the mean, median and mode of a set of maintenance data.',
              'Choose the appropriate average for skewed, symmetrical and categorical data, and justify the choice.',
              'Explain why an average alone can conceal important differences, and use range as a measure of spread.',
              'Select and interpret an appropriate display: table, bar chart, histogram, run chart, scatter plot or Pareto chart.',
              'Read a condition-monitoring trend and distinguish a genuine change from ordinary variation.',
              'Calculate and interpret mean time between failures.',
              'Explain why correlation does not establish cause, and what that means for root cause analysis.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The three averages</ContentEyebrow>

          <ConceptBlock
            title="Mean, median and mode — and why there are three of them"
            plainEnglish="The mean is the total shared out equally. The median is the one in the middle. The mode is the one that happens most."
            onSite="They answer different questions. Quoting the wrong one is how a set of numbers ends up misleading people honestly."
          >
            <p>
              The mean is what most people intend when they say average: add every value and divide
              by how many there are. It uses all the data, which is its strength, and it is dragged
              about by extreme values, which is its weakness.
            </p>
            <p>
              The median is the middle value once the data is sorted into order. With an odd number
              of values it is simply the middle one; with an even number it is the mean of the two
              middle values. Because it only cares about position and not magnitude, a single
              enormous value barely moves it.
            </p>
            <p>
              The mode is the value that occurs most frequently. It is the only one of the three
              that works on data with no numerical order — you cannot take the mean of a list of
              fault types, but you can say which type occurs most often. A data set can have more
              than one mode, or none at all if every value is different.
            </p>
            <p>
              Take six breakdowns with downtimes of 2, 2, 3, 3, 4 and 40 hours. The mean is 54 ÷ 6 =
              9 hours. The median is the mean of the two middle values, (3 + 3) ÷ 2 = 3 hours. The
              modes are 2 and 3, each appearing twice.
            </p>
            <p>
              Now notice what has happened. The mean of 9 hours is longer than five of the six
              actual breakdowns. Reporting &quot;average downtime is 9 hours&quot; would be
              arithmetically correct and practically misleading. The median of 3 hours describes
              what a typical breakdown is really like.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="When the mean and median disagree, that is a finding in itself"
            plainEnglish="If those two numbers are far apart, the data is lopsided — and the gap is telling you something worth knowing."
            onSite="Calculate both. It costs nothing and it tells you whether you are looking at a typical picture or one dominated by a few big events."
          >
            <p>
              In symmetrical data the mean and median land close together. When they separate
              noticeably, the data is skewed, and the direction of the skew tells you where the
              unusual values sit. A mean well above the median means a tail of large values is
              pulling it up — a few very long outages, a few very expensive repairs.
            </p>
            <p>
              That gap is genuinely useful information rather than an inconvenience. If mean
              downtime is 9 hours and median downtime is 3, you have learned that most breakdowns
              are short and a small number are catastrophic. Those two facts point at different
              improvement work: the short ones are about response and spares, the long ones about a
              specific failure mode that needs engineering out.
            </p>
            <p>
              An average quoted on its own hides that entirely. Two numbers, quoted together, make
              the shape of the problem visible.
            </p>
          </ConceptBlock>

          <InlineCheck
            question={quickCheckQuestions[0].question}
            options={quickCheckQuestions[0].options}
            correctIndex={quickCheckQuestions[0].correctIndex}
            explanation={quickCheckQuestions[0].explanation}
          />

          <InlineCheck
            question={quickCheckQuestions[1].question}
            options={quickCheckQuestions[1].options}
            correctIndex={quickCheckQuestions[1].correctIndex}
            explanation={quickCheckQuestions[1].explanation}
          />

          <CommonMistake
            title="Quoting the mean for data that is strongly skewed"
            whatHappens={
              <>
                <p>
                  A report states that average repair cost last year was £2,400. In fact forty of
                  the forty-five jobs cost under £600, and three major failures cost £20,000 between
                  them. No repair actually cost anything like £2,400.
                </p>
                <p>
                  A budget built on that figure over-provides for routine work and under-provides
                  for the rare major failure, which is the one that actually threatens the plan.
                </p>
              </>
            }
            doInstead={
              <>
                <p>
                  Quote the median for what a typical repair costs — here about £450 — and quote the
                  total separately for what the year actually consumed. Two figures, each answering
                  the question it is suited to.
                </p>
                <p>
                  Where the large values are the real story, say so explicitly: &quot;forty-two
                  routine repairs averaging £450, plus three major failures totalling £20,000&quot;.
                  That sentence is more useful than any single average.
                </p>
              </>
            }
          />

          <ContentEyebrow>Spread</ContentEyebrow>

          <ConceptBlock
            title="An average without a measure of spread is half a story"
            plainEnglish="Two machines can share an average and behave completely differently. You need to know how much the readings move about."
            onSite="Range — largest minus smallest — is quick, needs no calculator, and catches most of what matters."
          >
            <p>
              Consider two motors, both averaging 4.0 mm/s of vibration over a year of monthly
              readings. Motor A has ranged between 3.9 and 4.1. Motor B has ranged between 1.0 and
              7.0. Their averages are identical and their conditions are not remotely comparable.
            </p>
            <p>
              Motor A is stable and predictable. Motor B is swinging across 6 mm/s, which points at
              something intermittent — a mounting working loose, a load that varies more than
              expected, or a developing fault that comes and goes. The average conceals the very
              thing you would want to investigate.
            </p>
            <p>
              The simplest measure of spread is the range: the largest value minus the smallest. It
              takes seconds, needs nothing but the data, and in practice catches most of what
              matters. Its weakness is that it depends entirely on the two most extreme readings, so
              a single bad measurement inflates it.
            </p>
            <p>
              Standard deviation is the more robust measure, and it is worth understanding even if
              you never calculate one by hand. It describes roughly how far a typical reading sits
              from the mean, using every value rather than just the extremes. A small standard
              deviation means tight clustering and a consistent process; a large one means scatter.
              Any spreadsheet will produce it from a column of numbers.
            </p>
            <p>
              What it gives you in practice is a sense of how much variation is normal for that
              machine — which is precisely what you need in order to judge whether today&apos;s
              reading is genuinely unusual or simply ordinary scatter.
            </p>
          </ConceptBlock>

          <InlineCheck
            question={quickCheckQuestions[2].question}
            options={quickCheckQuestions[2].options}
            correctIndex={quickCheckQuestions[2].correctIndex}
            explanation={quickCheckQuestions[2].explanation}
          />

          <ContentEyebrow>Displaying data</ContentEyebrow>

          <ConceptBlock
            title="Choosing the right chart for the question"
            plainEnglish="Each chart answers a different question. Pick the one that matches what you are trying to find out."
            onSite="The wrong chart does not just look odd — it hides the thing you were looking for."
          >
            <p>
              A <strong>table</strong> is right when the exact values matter and there are few
              enough to read. Test results on a certificate belong in a table; nobody wants to read
              a measurement off a bar.
            </p>
            <p>
              A <strong>bar chart</strong> compares separate categories — downtime by fault type,
              failures by machine, callouts by shift. The categories have no natural order, so you
              are free to sort them, and sorting them by size is usually the most useful thing you
              can do.
            </p>
            <p>
              A <strong>histogram</strong> looks similar but does something different: it shows how
              a single continuous measurement is distributed by grouping values into ranges. The
              order is fixed because the ranges run along a number line. Use it to answer &quot;how
              is this spread out&quot; — and watch for two separate peaks, which usually means two
              different populations have been recorded as one.
            </p>
            <p>
              A <strong>run chart</strong> plots values against time in sequence. This is the
              workhorse of condition monitoring, because it is the only display that shows direction
              and rate of change. An average throws time away entirely; a run chart is what makes a
              rising trend visible.
            </p>
            <p>
              A <strong>scatter plot</strong> puts two measurements against each other to see
              whether they move together — bearing temperature against vibration, load against
              current. It reveals relationships, with the important caveat covered further down this
              page.
            </p>
            <p>
              A <strong>Pareto chart</strong> is a bar chart sorted largest first, usually with a
              running cumulative total. It answers &quot;where is most of the loss&quot; and it
              almost always shows that a few causes dominate.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Pareto analysis: finding the few causes that matter"
            plainEnglish="Sort your causes by how much they actually cost you. The top two or three usually account for most of it."
            onSite="This is the fastest way to stop improvement effort being spread evenly over problems of wildly different size."
          >
            <p>
              Take a year of breakdown data from a production line, measured in hours lost: bearings
              40, seals 12, electrical 8, controls 5, other 5. Total 70 hours.
            </p>
            <p>
              Sorted and expressed as percentages, bearings alone account for 57 per cent of all
              downtime. Bearings and seals together account for 74 per cent. The remaining three
              categories, between them, account for a quarter.
            </p>
            <p>
              The conclusion is immediate and hard to argue with: effort spent on bearing failures
              will return several times what the same effort spent on controls would. Without the
              analysis, a maintenance plan might reasonably allocate similar attention to all five,
              because all five appear on the fault log with similar frequency.
            </p>
            <p>
              Note that the ranking depends on what you measure. Ranking by number of occurrences
              rather than hours lost can produce a completely different order, because frequent
              trivial faults outnumber rare catastrophic ones. Decide first whether you are trying
              to reduce downtime, cost or callouts, then rank by that.
            </p>
          </ConceptBlock>

          <InlineCheck
            question={quickCheckQuestions[3].question}
            options={quickCheckQuestions[3].options}
            correctIndex={quickCheckQuestions[3].correctIndex}
            explanation={quickCheckQuestions[3].explanation}
          />

          <ContentEyebrow>Reading the data honestly</ContentEyebrow>

          <ConceptBlock
            title="Mean time between failures"
            plainEnglish="Total running hours divided by the number of failures. A comparison figure, not a prediction."
            onSite="Useful for comparing machines or periods. It tells you nothing about whether failures were spread out or clustered."
          >
            <p>
              MTBF is total operating time divided by the number of failures in that period. A
              machine that ran 8000 hours and failed four times has an MTBF of 2000 hours.
            </p>
            <p>
              It is a genuinely useful comparative measure. The same machine before and after a
              modification, or two identical machines on different duties, can be compared on MTBF
              in a way that raw failure counts do not allow, because MTBF accounts for how long each
              was actually running.
            </p>
            <p>
              What it does not do is predict. An MTBF of 2000 hours does not mean the machine will
              run 2000 hours before the next failure. Because it is a mean, it is silent on whether
              those four failures were evenly spaced across the year or all happened in one dreadful
              fortnight — and those two situations call for completely different responses.
            </p>
            <p>
              So use MTBF to compare, then go and look at the actual failure dates before drawing a
              conclusion about what is happening.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Correlation is not cause"
            plainEnglish="Two things moving together does not mean one makes the other happen."
            onSite="This is the trap that makes root cause analysis fix the wrong thing and then wonder why the fault came back."
          >
            <p>
              A scatter plot showing bearing temperature and vibration rising together is a real and
              useful observation. What it does not establish is that the heat is causing the
              vibration, or that the vibration is causing the heat.
            </p>
            <p>
              In practice both are usually symptoms of the same underlying problem — a failing
              bearing generating both friction heat and mechanical movement. Treating the
              temperature by improving cooling would address a symptom and leave the bearing to fail
              anyway.
            </p>
            <p>
              There are three possibilities whenever two measurements correlate, and the data alone
              cannot distinguish between them. The first causes the second; the second causes the
              first; or some third factor drives both. Only knowledge of the physical system can
              tell you which, and that is exactly why root cause analysis is an engineering activity
              rather than a statistical one.
            </p>
            <p>
              The statistics point you at where to look. The engineering tells you what you are
              looking at.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Calling a trend on too few readings"
            whatHappens={
              <>
                <p>
                  Three monthly vibration readings come in at 3.8, 4.1 and 4.4 mm/s. A rising trend
                  is declared, a shutdown is scheduled, and the bearing comes out in good condition.
                </p>
                <p>
                  Normal variation on that machine turns out to be around ±0.4 mm/s. All three
                  readings sit comfortably inside ordinary scatter — there was never a trend to see.
                </p>
              </>
            }
            doInstead={
              <>
                <p>
                  Establish what normal variation looks like for that machine before interpreting
                  movement as a trend. A change only means something once it is larger than the
                  scatter you would expect anyway.
                </p>
                <p>
                  Check the readings were taken under comparable conditions — similar load, similar
                  temperature, same position, same settings. Where the data is thin, shorten the
                  monitoring interval and keep watching rather than acting. Three points is a reason
                  to look more closely, not a basis for a shutdown.
                </p>
              </>
            }
          />

          <Scenario
            title="Did the lubrication change actually work?"
            situation={
              <>
                <p>
                  Six months ago the site changed the lubricant and re-greasing interval on twelve
                  identical conveyor gearboxes after a run of bearing failures. The reliability
                  engineer wants to know whether it worked before rolling the change out across the
                  plant.
                </p>
                <p>
                  In the six months before the change there were nine bearing failures across the
                  twelve units. In the six months since, there have been four.
                </p>
              </>
            }
            whatToDo={
              <>
                <p>
                  Start with the obvious comparison but do not stop there. Nine failures down to
                  four looks like a 56 per cent reduction, and that is worth having — but check what
                  else changed.
                </p>
                <p>
                  Ask for running hours in each period. If the conveyors ran 4200 hours before and
                  2600 hours after because of a production slowdown, the failure rate per thousand
                  hours went from 2.14 to 1.54 — still an improvement, but a much smaller one than
                  the raw count suggested.
                </p>
                <p>
                  Then look at the distribution rather than the total. If the four recent failures
                  were all on the same two gearboxes, the lubricant change may have worked well on
                  ten units and not addressed a different problem on two. That is a materially
                  different conclusion from &quot;it works about half the time&quot;.
                </p>
              </>
            }
            whyItMatters={
              <p>
                The raw comparison supports rolling the change out plant-wide. The rate-adjusted
                figure supports it more cautiously. The distribution suggests rolling it out while
                separately investigating two specific units. All three conclusions come from the
                same nine-and-four, and the difference between them is entirely in how carefully the
                data was read. This is the practical value of statistics in maintenance — not
                calculating anything elaborate, but refusing to let a number carry more weight than
                it can bear.
              </p>
            }
          />

          <ConceptBlock title="Building the evidence for your portfolio">
            <p>
              Data work makes strong portfolio evidence because it demonstrates judgement rather
              than just activity, and judgement is what the professional discussion probes.
            </p>
            <ul className="space-y-1.5">
              <li>
                Keep a condition-monitoring trend you contributed readings to, with the dates and
                the conditions each reading was taken under.
              </li>
              <li>
                Record a case where you calculated more than one average and they disagreed, and
                note which you reported and why.
              </li>
              <li>
                Keep any Pareto or fault-frequency analysis you produced, along with the decision it
                informed.
              </li>
              <li>
                Where you declined to draw a conclusion because the data would not support it, write
                that down. Recognising the limits of your evidence is competence, not a gap.
              </li>
              <li>
                Note the measurement conditions alongside any trend — load, temperature, position.
                An assessor who sees that recorded knows you understand why it matters.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            points={[
              'Mean uses every value and is pulled by outliers. Median resists them. Mode is the only average that works on categories.',
              'With an even number of values, the median is the mean of the two middle ones.',
              'A large gap between mean and median tells you the data is skewed — that is a finding, not a nuisance.',
              'Always pair an average with a measure of spread. Identical means can hide completely different machines.',
              'Range is quick; standard deviation is more robust and tells you how much variation is normal.',
              'Run charts show direction and rate of change — the things an average throws away.',
              'Histograms show distribution; two peaks usually mean two populations recorded as one.',
              'Pareto sorts causes by impact, and the ranking changes depending on whether you measure hours, cost or count.',
              'MTBF is total running time divided by failures. It compares; it does not predict.',
              'Correlation has three possible explanations and the data cannot tell you which. Engineering knowledge can.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Bleed>
            <Quiz
              title="Statistics for maintenance data knowledge check"
              questions={quizQuestions}
            />
          </Bleed>

          <Bleed>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section6-2')}
                className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                  <ChevronLeft className="h-3 w-3" /> Previous
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-white">
                  Trigonometry, Areas and Volumes
                </div>
              </button>
              <button
                onClick={() => navigate('/study-centre/apprentice/m-o-e-t-module2-section6-4')}
                className="touch-manipulation rounded-2xl border border-elec-yellow bg-elec-yellow p-4 text-right transition-colors hover:bg-elec-yellow/90 active:scale-[0.99]"
              >
                <div className="flex items-center justify-end gap-2 text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                  Next subsection <ChevronRight className="h-3 w-3" />
                </div>
                <div className="mt-1 truncate text-[14px] font-semibold text-black">
                  Rates of Change and Elementary Calculus
                </div>
              </button>
            </div>
          </Bleed>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETModule2Section6_3;
