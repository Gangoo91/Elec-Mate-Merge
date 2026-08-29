/**
 * Module 4 · Section 5 — Interpreting and logging readings in real-world systems
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar. Closes Module 4.
 *
 * 🔴 THE FRAMING. Sections 1–4 were about taking a reading correctly. This one
 * is about what happens after: a reading becomes a RECORD that somebody else —
 * possibly you, in two years — will act on without any of the context you had
 * when you took it. What makes a record useful is a different question from
 * what makes a reading correct, and it is the question nobody teaches.
 *
 * 🔴 THE CENTRAL POINT: a single reading answers a question about one moment.
 * A sequence of readings answers a question about a TREND, and trend is where
 * the predictive value lives. Excessive drift is an indicator of impending
 * failure — but only if there is something to compare against, which means
 * both the before and after states have to be recorded, every time.
 *
 * 🔴 A meter has a SCAN TIME, so it is a sampled instrument. A transient
 * shorter than the scan time is invisible to it. That means everything Module 3
 * Section 4 said about sampling rate, dead time and aliasing applies to a
 * logger too — which is the connection this page exists to make.
 *
 * Deliberately NOT duplicating Module 6 Section 4, which owns calibration
 * documentation. The general principle (record both states so drift can be
 * computed) is taught here as the REASON; the paperwork is deferred.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §18.3.2 (as-found/as-left documentation, drift as an indicator of impending
 * failure, and the significance of the sign of an error) and §34.8.1 (min/max
 * capture, the meter's scan time, and logging with timestamps).
 * Extracted to scratchpad/src/m4_calerrors.txt and m4_dmm.txt.
 * Held in ~/Desktop/hav/instrumentation.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Interpreting and logging readings in real-world systems | Instrumentation Module 4.5 | Elec-Mate';
const DESCRIPTION =
  'What turns a reading into a record somebody can act on — why both the as-found and as-left states matter, why the sign of an error is information, and why a logger inherits every sampling problem from Module 3.';

const outcomes = [
  'Say what a record needs beyond the number itself',
  'Explain why both the as-found and as-left states must be recorded',
  'Explain why drift is only computable from a history, not from one visit',
  '🔴 Record an error with its sign, and say what the sign tells the next person',
  'Explain why a meter or logger cannot see a transient shorter than its scan time',
  'Choose a logging interval and state what the choice costs',
  'Judge whether a reading is plausible before recording it',
  'Recognise when a record is evidence and when it is only reassurance',
];

const quizQuestions = [
  {
    id: 1,
    question: 'Why must both the as-found and as-left conditions be recorded?',
    options: [
      'Because drift can only be calculated by comparing what an instrument was found doing against what it was left doing last time',
      'Because regulations require two readings',
      'To show the instrument was within tolerance',
      'To prove the work was carried out',
    ],
    correctIndex: 0,
    explanation:
      'Recording only the finished state loses the information. As-found tells you where the instrument had drifted to since it was last adjusted; as-left tells you where it started from for next time. With only one of them, how well an instrument holds its calibration over years cannot be determined at all.',
  },
  {
    id: 2,
    question: 'Why does excessive drift matter beyond needing an adjustment?',
    options: [
      'It shortens the calibration interval',
      'A sharp increase in drift usually means a component is starting to go, and it shows before the instrument fails — which is what makes predictive maintenance possible',
      'It voids the instrument’s warranty',
      'It means the instrument was installed incorrectly',
    ],
    correctIndex: 1,
    explanation:
      'An instrument that has always drifted a little and suddenly drifts a lot is telling you something is changing inside it. That signal exists only in the history — no single calibration can reveal it — which is the practical reason the records are kept rather than just the certificates.',
  },
  {
    id: 3,
    question:
      '🔴 An instrument displays −79.0 °C where the reference standard reads −78.1 °C. What is the error?',
    options: ['−157.1 °C', '+0.9 °C', '−0.9 °C', '0.9 °C, sign not applicable'],
    correctIndex: 2,
    explanation:
      'The error is the instrument’s response minus the true value: −79.0 − (−78.1) = −0.9 °C. It is negative because the instrument reads below what it should. Recording only the magnitude throws away the direction, which is exactly what the next person needs to see a drift trend.',
  },
  {
    id: 4,
    question:
      'A multimeter with a min/max function is left on a signal overnight and records a minimum of 3.9 mA. What can you conclude?',
    options: [
      'The transmitter failed and did not recover',
      'The average signal was 3.9 mA',
      'The signal was at 3.9 mA for most of the night',
      'The signal reached at least as low as 3.9 mA at some point, but not when or for how long',
    ],
    correctIndex: 3,
    explanation:
      'A basic capture function records the extremes and nothing else — no time, no duration, no count of occurrences. It is genuine evidence that the excursion happened, and it cannot tell you anything about when. That is the difference between capture and logging.',
  },
  {
    id: 5,
    question: 'Why might a meter miss a transient entirely?',
    options: [
      'Because a meter samples at intervals, so an event shorter than its scan time can fall between samples',
      'Because transients are filtered out by the input circuit',
      'Because the display cannot update fast enough',
      'Because the transient is too small',
    ],
    correctIndex: 0,
    explanation:
      'A meter is a sampled instrument, so everything Module 3 Section 4 said applies to it. An event briefer than the interval between samples can occur entirely in the gap and leave no trace — the reading afterwards is perfectly correct and the event is simply absent from the record.',
  },
  {
    id: 6,
    question: 'What is the cost of choosing a long logging interval?',
    options: [
      'The data files become too large',
      'Events shorter than the interval can be missed, and rapid variation is averaged away',
      'The logger becomes less accurate',
      'The timestamps become unreliable',
    ],
    correctIndex: 1,
    explanation:
      'It is the same trade as a gate time in Section 2 and a damping value in Module 3 Section 3. A longer interval gives a tidier, more manageable record and less ability to see what happened between samples. The right interval comes from how fast the thing you care about can change.',
  },
  {
    id: 7,
    question:
      'A control room screen shows 180 °C on a transmitter ranged 0–400 °C. Before recording it as a fault, what is the quickest independent check?',
    options: [
      'Check the calibration certificate',
      'Replace the transmitter and see if the reading changes',
      'Work out the current the reading implies — 11.2 mA — and measure the loop',
      'Compare it against the same reading tomorrow',
    ],
    correctIndex: 2,
    explanation:
      'Per unit is 180 ÷ 400 = 0.45, so the loop should carry (0.45 × 16) + 4 = 11.2 mA. Measuring it splits the system in two: agreement puts the fault upstream of the terminals, disagreement puts it downstream. Module 3 Section 4 set this out as the field diagnostic.',
  },
  {
    id: 8,
    question: 'What most often makes an old record useless to the person who finds it?',
    options: [
      'The units used',
      'It being on paper rather than digital',
      'The handwriting',
      'Missing context — which instrument, which point, under what conditions',
    ],
    correctIndex: 3,
    explanation:
      'A number without its context cannot be compared with anything. Whoever wrote it knew which tapping point, which meter and what the plant was doing; none of that is in the record unless it was written down, and the whole value of a record is that it can be compared later.',
  },
];

const InstrumentationModule4Section5 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 4 · Section 5"
        title="Interpreting and logging"
        backTo="/electrician/upskilling/instrumentation-module-4"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Taking the reading was the easy part. What you write down is what somebody acts on, long
          after you have forgotten the job.
        </p>

        <TLDR
          points={[
            'Sections 1 to 4 were about taking a reading correctly. This one is about what happens to it afterwards.',
            'A single reading answers a question about one moment. A sequence answers a question about a trend, and the trend is where the predictive value is.',
            '🔴 Record what you found as well as what you left. With only one of the two, drift over time cannot be calculated at all.',
            'Drift that suddenly grows is a component beginning to fail, and it says so early — but only to somebody holding the history.',
            '🔴 The sign of an error is information. Reading low and reading high are different faults, and magnitude alone discards the direction a drift is moving.',
            'A number without context cannot be compared with anything. Which point, which instrument, what conditions, when.',
            '🔴 A meter has a scan time, so it is a sampled instrument — everything Module 3 Section 4 said about sampling applies to it.',
            'An event shorter than the scan time can happen entirely between samples and leave no trace. The reading afterwards is perfectly correct.',
            'A basic min/max capture proves an excursion happened and cannot tell you when. Logging with timestamps is a different capability.',
            'Choosing a logging interval is the same trade as a gate time or a damping value: resolution against manageability, for the third time in this course.',
            'Judge plausibility before recording. The per-unit reverse check from Module 3 Section 4 takes thirty seconds and splits the system in two.',
            'A record that cannot be compared with anything is reassurance, not evidence.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>From reading to record</ContentEyebrow>

        <ConceptBlock
          title="The number outlives the context"
          plainEnglish="You know which tapping point, which meter and what the plant was doing. In two years nobody will, unless you wrote it down."
          onSite="Write for the person who finds this with none of what you currently have in your head. That person is often you."
        >
          <p>
            Everything so far in this module has been about getting a reading right. This section is
            about the fact that a reading rarely stays a reading. It becomes an entry in a log, a
            line on a certificate, a figure in a report &mdash; and from that point it is judged
            entirely on its own, by somebody with none of the context you had.
          </p>
          <p>
            That changes what &ldquo;good&rdquo; means.{' '}
            <strong>A correct reading and a useful record are two different achievements.</strong> A
            perfectly taken measurement, written down as a bare number, may be worth nothing in six
            months.
          </p>
          <p>What a record needs beyond the value itself:</p>
          <AppendixTable
            caption="What turns a number into a record"
            headers={['Element', 'Why it is needed']}
            rows={[
              ['The value and its units', 'Obvious, and still omitted often enough to matter'],
              ['Where it was taken', 'Which point, which terminals, which side of what device'],
              ['When', 'Trend is impossible without it, and so is correlating with events'],
              [
                'With what',
                'A reading is only as good as the instrument; Section 4 gave the reasons',
              ],
              [
                'Under what conditions',
                'Plant state, ambient conditions, what was running — Section 3’s error sources',
              ],
              ['By whom', 'So the next person can ask, which is often faster than re-measuring'],
            ]}
            notes="None of this is bureaucracy. Every row is something the next person cannot reconstruct and will need."
          />
        </ConceptBlock>

        <Pullquote>
          A record you cannot compare with anything is reassurance, not evidence. Comparison is the
          entire point.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Why one reading is never enough</ContentEyebrow>

        <ConceptBlock
          title="🔴 As found, and as left"
          plainEnglish="Write down what the instrument was doing when you arrived, and what it was doing when you finished. Both, every time."
          onSite="Recording only the finished state is the commonest documentation failure, and it destroys information that cannot be recovered."
        >
          <p>
            An important principle in measurement practice is to document an instrument&rsquo;s
            condition <strong>as it was found</strong> and <strong>as it was left</strong> after any
            adjustment.
          </p>
          <p>
            The instinct is to record only the final state, because that is the one that is correct
            and it is what the certificate is about. The instinct is wrong, and the reason is worth
            understanding rather than complying with.
          </p>
          <p>
            <strong>Drift is a difference between two points in time.</strong> The as-left state
            from the last visit is where the instrument started; the as-found state on this visit is
            where it has arrived. Subtract one from the other and you have how far it moved, and
            over how long. Record only one of the two and{' '}
            <strong>
              there is nothing to subtract &mdash; how well the instrument is holding its
              calibration simply cannot be determined
            </strong>
            .
          </p>
          <p>
            That matters more than tidy paperwork, because drift carries a warning.{' '}
            <strong>
              Drift that suddenly grows is usually a component starting to go, and it announces
              itself well before the instrument actually fails.
            </strong>{' '}
            One that moved 0.1 per cent a year for five years and has moved 0.8 per cent this year
            has changed internally, and it has given you a season&rsquo;s warning to act on. That
            warning is the entire premise of maintaining equipment on prediction rather than on
            breakdown.
          </p>
          <p>
            None of that signal is available from a single visit. It exists only in the sequence,
            and the sequence only exists if both ends of every visit were written down. Module 6
            Section 4 covers the documentation itself; the reason for it belongs here.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 The sign of an error is half the information"
          plainEnglish="Reading high and reading low are different faults. Writing 0.9 instead of −0.9 throws away which one you had."
          onSite="Always record direction. It costs one character and it is the difference between a trend and a scatter."
        >
          <p>
            Error is the instrument&rsquo;s response minus the true value, and it carries a sign.
          </p>
          <p>
            Take a temperature instrument checked against a reference standard reading &minus;78.1
            &deg;C. The instrument under test displays &minus;79.0 &deg;C:
          </p>
          <ul>
            <li>
              Error = &minus;79.0 &minus; (&minus;78.1) = <strong>&minus;0.9 &deg;C</strong>
            </li>
          </ul>
          <p>
            <strong>Negative</strong>, because the instrument reads below what it should. Note that
            the arithmetic with negative values is where people slip, and the sanity check is
            simple: the instrument reads colder than the truth, so its error is negative regardless
            of what the absolute values happen to be.
          </p>
          <p>
            Recording &ldquo;0.9 &deg;C error&rdquo; is not a smaller version of the truth &mdash;
            it is a different and much less useful statement. Across several calibrations, signed
            errors reveal an instrument drifting steadily in one direction, which is a wearing
            component. Unsigned errors of the same magnitude look like an instrument bouncing about,
            which is a different fault entirely and would be investigated differently.
          </p>
          <p>
            Section 3 made the same point about the shape of an error across the range. This is the
            same idea across time: <strong>direction is data</strong>.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-4-5-sign"
          question="Three annual checks on the same transmitter record errors of −0.2 %, −0.5 % and −0.9 % of span. What does the pattern suggest?"
          options={[
            'A consistent one-way drift that is accelerating, which is worth investigating before it goes out of tolerance',
            'A calibration procedure error',
            'Nothing can be concluded from three readings',
            'Random scatter within tolerance — no action needed',
          ]}
          correctIndex={0}
          explanation="All three are negative and the steps are growing — 0.3 then 0.4. That is a component changing, not noise, and it is visible only because the signs were recorded. Had these been logged as 0.2, 0.5 and 0.9, the direction would have been preserved by luck; had they been mixed signs recorded unsigned, the trend would have been invisible."
        />

        <SectionRule />
        <ContentEyebrow>What a logger cannot see</ContentEyebrow>

        <ConceptBlock
          title="🔴 A meter is a sampled instrument too"
          plainEnglish="It looks, then looks again. Anything that happens between two looks did not happen, as far as the record is concerned."
          onSite="The limit is set by the meter, not by the fault. Check the scan time before treating a quiet record as proof."
        >
          <p>
            Section 4 introduced the min/max capture function as a way of catching intermittent
            faults while you are elsewhere. It is genuinely useful and it has a limit that is easy
            to forget.
          </p>
          <p>
            A meter does not watch continuously. It takes a reading, then another, at intervals set
            by its <strong>scan time</strong>. That makes it a sampled instrument, and{' '}
            <strong>
              everything Module 3 Section 4 said about sampling applies to the instrument in your
              hand
            </strong>
            .
          </p>
          <p>The consequence is specific and important:</p>
          <ul>
            <li>
              <strong>A transient shorter than the scan time can go completely undetected.</strong>{' '}
              It occurs between two samples, leaves no trace, and the readings either side are
              perfectly correct.
            </li>
            <li>
              The absence of a recorded excursion is therefore <em>not</em> proof that nothing
              happened. It is proof that nothing was seen, which is a weaker statement.
            </li>
          </ul>
          <p>
            That distinction matters when a min/max record is used as evidence. &ldquo;I left a
            meter on it overnight and it recorded nothing unusual&rdquo; rules out slow excursions
            and sustained dropouts. It does not rule out a fast glitch, and if the fault you are
            chasing is a fast glitch, the test was never capable of finding it.
          </p>
          <p>
            The other limit is the one Section 4 flagged: a basic capture records{' '}
            <strong>what</strong> and not <strong>when</strong>. More capable instruments log the
            time an event occurred, which is a genuinely different capability &mdash; because a
            timestamped excursion can be correlated with what else was happening on the plant, and
            an untimed one cannot.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Choosing a logging interval — the same trade, a third time"
          plainEnglish="Log often and you see everything and drown in data. Log rarely and the record is manageable and incomplete."
          onSite="Set the interval from how fast the thing you care about can change, not from how long you want the memory to last."
        >
          <p>
            This decision has now appeared three times in this course in three different costumes,
            and it is worth naming the pattern:
          </p>
          <ul>
            <li>
              <strong>Module 3 Section 3</strong> &mdash; damping. More smoothing, slower response.
            </li>
            <li>
              <strong>Module 4 Section 2</strong> &mdash; gate time. More counts, slower update.
            </li>
            <li>
              <strong>Here</strong> &mdash; logging interval. Fewer samples, smaller record, less
              visible detail.
            </li>
          </ul>
          <p>
            All three are the same underlying trade between{' '}
            <strong>how well you see something and how quickly you see it</strong>, and all three go
            wrong the same way: somebody optimises for the tidy-looking outcome and quietly discards
            the information.
          </p>
          <p>
            The principled way to choose is to work from the process rather than from the
            instrument. How fast can the thing you care about actually change? Log comfortably
            faster than that. If you are hunting an intermittent whose duration you do not know,
            that is an argument for the fastest interval the equipment will sustain for the period
            you need, rather than for a comfortable round number.
          </p>
          <p>
            And be aware of what a long interval does to the data you do get. A sample every five
            minutes on a process that swings every thirty seconds does not give you a smoothed
            version of the truth &mdash; it gives you Module 3 Section 4&rsquo;s aliasing, and a
            plausible trend that never happened.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-4-5-interval"
          question="A logger is set to sample every 60 seconds to keep the file manageable. It records a smooth cycle with a period of about 20 minutes on a tank that operators say is steady. What should you suspect first?"
          options={[
            'A genuine 20-minute process cycle nobody has noticed',
            'Aliasing — something varying much faster than the sample interval is being folded into a slow apparent cycle',
            'A fault in the logger',
            'Drift in the level transmitter',
          ]}
          correctIndex={1}
          explanation="The operators and the instrument disagree, and the instrument is sampling slowly. A smooth, plausible slow cycle produced by a slow sampler is the signature of aliasing, exactly as Module 3 Section 4 described. Sample faster, or filter ahead of the logger, before building a theory about the process."
        />

        <ConceptBlock
          title="Units, resolution and false precision in a written record"
          plainEnglish="Write the number to the precision you actually measured it, and no further. Extra digits are a claim you cannot support."
          onSite="A reading copied from a display carries the display's digits, which may be more than the measurement deserves."
        >
          <p>
            Two small habits do a disproportionate amount of damage in records, and both are about
            the digits rather than the value.
          </p>
          <p>
            <strong>Units, always.</strong> A record saying &ldquo;12&rdquo; is worthless if it
            could be 12 mA, 12 bar or 12 per cent. It seems too obvious to state and it is one of
            the commonest omissions, because at the moment of writing the unit is entirely obvious
            to the person writing.
          </p>
          <p>
            <strong>Precision that matches the measurement.</strong> Section 3 separated resolution
            from accuracy, and this is where the distinction reaches the paperwork. A display
            showing four decimal places does not mean the measurement is good to four decimal
            places, and copying all of them into a record makes a claim the measurement cannot
            support.
          </p>
          <p>
            The consequence is not academic. Somebody later comparing your 12.0416 mA against
            another technician&rsquo;s 12.0 mA may see a discrepancy that exists entirely in the
            recording convention. Where it matters, record the value and the instrument &mdash; then
            the precision can be judged rather than assumed.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Judging a reading before you record it</ContentEyebrow>

        <ConceptBlock
          title="Is this number plausible?"
          plainEnglish="Before writing a reading down, ask whether it can be right. A wrong number in a record is harder to remove than to prevent."
          onSite="Thirty seconds of scepticism at the point of measurement saves days of investigation later."
        >
          <p>
            A record propagates. Once a number is written down it gets copied, trended and used to
            make decisions, and the doubt you had at the time does not travel with it. So the useful
            habit is to resolve the doubt before recording, not after.
          </p>
          <p>Three checks, in increasing order of effort:</p>
          <ul>
            <li>
              <strong>Does it agree with expectation?</strong> If the process should be around
              halfway and the reading says 90 per cent, something needs explaining before the number
              is committed.
            </li>
            <li>
              <strong>Does it agree with the rest of the chain?</strong> Module 3 Section 4&rsquo;s
              reverse check: work out what current the displayed value implies, and measure it. A
              screen showing 180 &deg;C on a 0&ndash;400 &deg;C range implies 11.2 mA. Measuring
              splits the system in two.
            </li>
            <li>
              <strong>Does it agree with something independent?</strong> A sight glass, a second
              instrument, a laboratory sample, a weighed quantity. Independent confirmation is the
              only thing that catches an error common to the whole chain.
            </li>
          </ul>
          <p>
            And where a reading is genuinely doubtful and cannot be resolved on the day,{' '}
            <strong>record it with the doubt attached</strong>. A note saying the value was taken
            under conditions that might have affected it is far more useful than either a clean
            number that misleads or a gap that tells the next person nothing.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Reading a history</ContentEyebrow>

        <ConceptBlock
          title="What a sequence of records can tell you that no single one can"
          plainEnglish="Individual readings describe an instrument. A run of them describes what is happening to it."
          onSite="Before a calibration, look at the last three. What you expect to find is itself a useful prediction to test."
        >
          <p>
            The reason for all the discipline above is that a history supports conclusions a single
            visit cannot reach. Four patterns are worth being able to recognise:
          </p>
          <AppendixTable
            caption="Reading a run of as-found records"
            headers={['Pattern across visits', 'What it suggests', 'What to do']}
            rows={[
              [
                'Small errors, no consistent direction',
                'Normal scatter — the instrument is stable',
                'Nothing — this is what a healthy instrument looks like',
              ],
              [
                'Steady drift in one direction',
                'Something is ageing predictably',
                'Predict when it leaves tolerance and plan for it',
              ],
              [
                'Accelerating drift',
                'A component is deteriorating rather than ageing',
                'Investigate now — this is the impending-failure signal',
              ],
              [
                'Large errors, direction changing each time',
                'Not drift — an unstable instrument or an installation problem',
                'Look at the installation and the conditions, not the adjustment',
              ],
            ]}
            notes="The bottom row is the one most often misread as drift. Drift has a direction; instability does not."
          />
          <p>
            Notice that two of these four lead somewhere other than an adjustment, which is the
            practical value of looking.{' '}
            <strong>
              A calibration record is a diagnostic instrument in its own right, and it is the only
              one that can see slowly.
            </strong>
          </p>
          <p>
            These patterns also feed a decision this section deliberately stops short of: how often
            an instrument needs checking at all. A stable instrument may be able to go longer
            between calibrations and a deteriorating one certainly cannot, but setting intervals is
            a subject with its own rules and its own paperwork, and Module 6 takes it up properly.
            What matters here is that the decision is only available to somebody who kept the
            records in a form that can be compared.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Where this module has been"
          plainEnglish="Five sections, one argument: a number is only as good as everything that produced it."
          onSite="Module 5 moves from measuring a process to controlling one, and every measurement problem in this module becomes a control problem there."
        >
          <p>Module 4 has followed a measurement from the probe tips to the filing cabinet:</p>
          <ul>
            <li>
              <strong>Section 1</strong> &mdash; the instrument is part of the circuit, and each
              quantity is disturbed differently.
            </li>
            <li>
              <strong>Section 2</strong> &mdash; counted measurements have their own error, and the
              &plusmn;1 count decides how you should measure.
            </li>
            <li>
              <strong>Section 3</strong> &mdash; accuracy, precision and resolution are separate,
              and the shape of an error names the fault.
            </li>
            <li>
              <strong>Section 4</strong> &mdash; every instrument&rsquo;s strength is also its
              failure mode.
            </li>
            <li>
              <strong>Section 5</strong> &mdash; a reading becomes a record, and a record is only
              worth what it can be compared against.
            </li>
          </ul>
          <p>
            One idea runs through all five and is worth carrying into Module 5:{' '}
            <strong>
              an instrument reports the property it measures, under the conditions it was measured
              in, at the moment it was measured
            </strong>
            . Every error in this module came from assuming it reported something broader than that.
          </p>
          <p>
            Module 5 raises the stakes, because a control system acts on these numbers automatically
            and continuously. A measurement that merely misleads a person becomes a measurement that
            makes a plant do the wrong thing.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Recording only what the instrument was left reading"
          whatHappens={
            <>
              <p>
                A technician finds an instrument out of tolerance, adjusts it, confirms it now reads
                correctly, and records the corrected figures. The record shows an instrument in
                specification. Everything about that feels like a job well done.
              </p>
              <p>
                What has been destroyed is the only evidence of how far it had drifted. Next year
                the same thing happens, and the year after. Each record shows an instrument reading
                perfectly, and the file gives no indication whatever that this instrument has needed
                correcting at every single visit.
              </p>
              <p>
                🔴 A slow deterioration that would have been obvious from three as-found readings is
                invisible, and the instrument fails in service with a folder full of passing
                certificates behind it.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Record the as-found condition before touching anything, and the as-left condition
                afterwards. Both, with signs, at each calibration point. The as-found data is the
                more valuable of the two, because it is the only measurement of what the instrument
                actually does in service.
              </p>
              <p>
                Then read the history rather than filing it. Section 3&rsquo;s scenario &mdash; four
                calibrations in nine months, all passing &mdash; is a fault visible only in the
                sequence. If nobody looks at the sequence, keeping it achieves nothing.
              </p>
            </>
          }
        />

        <Scenario
          title="A logged trend that proves nothing happened, on a plant where something did"
          situation={
            <>
              <p>
                A safety-related pressure alarm annunciated overnight and cleared on its own. There
                is a dispute about whether the pressure genuinely excursed or whether the alarm is
                faulty.
              </p>
              <p>
                The historian is consulted. It logs that point every 30 seconds and shows nothing
                unusual — a flat trend across the whole period. On that basis a proposal is made to
                treat the alarm as spurious and adjust its threshold.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Establish what the record is capable of showing before drawing a conclusion from its
                silence. A 30 second interval cannot see an excursion lasting five seconds, and a
                pressure spike is exactly the kind of event that lives well below 30 seconds.
              </p>
              <p>
                So the trend does not say the pressure was steady. It says{' '}
                <strong>no sample happened to land during an excursion</strong>, which is a much
                weaker statement and is entirely consistent with the alarm being correct.
              </p>
              <p>
                Ask what the alarm itself is watching. If it is fed from a device that responds
                faster than the historian samples, the alarm is the better witness of the two, not
                the worse one. The instrument that saw the event is the one that responds quickly
                enough to see it.
              </p>
              <p>
                Then get evidence that can settle it: log the point at a much faster interval, or
                put a recording instrument on it, and wait for a recurrence. Raising the alarm
                threshold on the strength of a record that could not have captured the event would
                remove the only warning the plant has.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                The proposal was to make a safety-related change on the basis of an absence of
                evidence, treating it as evidence of absence. The record was accurate and complete
                for what it sampled, and silent about everything between samples.
              </p>
              <p>
                This is the argument for knowing your instrument&rsquo;s limits as well as its
                readings. A record is a statement about what was looked at, and reading it as a
                statement about what happened is how a fast fault gets designed out of existence
                instead of fixed.
              </p>
            </>
          }
        />

        <FAQ
          items={[
            {
              question: 'How long should measurement records be kept?',
              answer:
                'Longer than feels necessary, because their value is comparative and grows with age. A single year of calibration data tells you almost nothing about drift; five years tells you how an instrument behaves and when it is likely to need replacing. Specific retention requirements vary by industry and by what the instrument is used for, so that is a question for the site’s own procedures rather than a general rule.',
            },
            {
              question: 'Is an automatic log better than a written one?',
              answer:
                'It is better at volume, timestamps and consistency, and no better at context. An automatic system records what it was configured to record at the interval it was configured to use, and nothing about the plant state or the doubt the technician had. The two are complementary — the log carries the numbers, and the written note carries what the numbers cannot.',
            },
            {
              question: 'What if a reading is obviously wrong — should I record it?',
              answer:
                'Yes, with a note saying why you believe it is wrong and what you did about it. Deleting readings that look wrong is how a genuine intermittent fault becomes invisible, because the readings that reveal it are precisely the ones that look implausible. Record the value, record your reasoning, and record whatever you did to confirm or rule it out.',
            },
            {
              question: 'How do I decide if a change over time is real drift or just noise?',
              answer:
                'Consistency of direction is the strongest signal. Several readings all moving the same way is drift; readings scattering either side of a value are noise, however large the individual departures. This is why the sign matters so much — it is the property that separates the two, and it is the one most often discarded.',
            },
            {
              question: 'Does a logging interval need to satisfy Nyquist?',
              answer:
                'The same reasoning applies, and the consequences of ignoring it are the ones Module 3 Section 4 described. Sampling at less than twice the rate of something that varies does not merely miss detail — it can produce a convincing slow cycle that never occurred. Where the record will be used to draw conclusions about behaviour rather than just to show a value, the sample rate is part of the evidence and should be recorded alongside it.',
            },
            {
              question: 'What is the single most useful thing to add to a record?',
              answer:
                'The time, closely followed by which instrument was used. Time makes comparison and correlation possible, and turns a collection of numbers into a history. The instrument matters because Section 4 showed how much of a reading is a property of the instrument rather than the circuit — a phantom voltage measured on a 10 MΩ meter is a different fact from the same number measured under load.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A correct reading and a useful record are two different achievements. The number outlives the context unless the context is written down.',
            'A record needs the value, the location, the time, the instrument, the conditions and the person. Every one of those is something the next person cannot reconstruct.',
            '🔴 Record as-found and as-left. Drift is a difference between two points in time, and with only one recorded there is nothing to subtract.',
            'Drift that suddenly grows is a component starting to fail, and the warning comes early — but only to somebody with the history to compare against.',
            '🔴 Record the sign of an error. Reading high and reading low are different faults, and the sign is what separates a one-way drift from scatter.',
            'Error is the instrument’s response minus the true value: −79.0 against a true −78.1 °C is an error of −0.9 °C.',
            '🔴 A meter has a scan time, so it samples. Everything Module 3 Section 4 said about sampling applies to your test equipment.',
            'A transient shorter than the scan time leaves no trace, and the readings either side are perfectly correct.',
            'The absence of a recorded excursion is proof that nothing was seen, not proof that nothing happened.',
            'A basic min/max capture records what, not when. Timestamped logging is a different capability, because only a timed event can be correlated with anything else.',
            'Logging interval, gate time and damping are the same trade in three costumes: how well you see something against how quickly.',
            'Set the interval from how fast the process can change, not from how long you want the memory to last.',
            'Too slow an interval does not smooth the truth — it aliases, and produces a plausible cycle that never happened.',
            'Judge plausibility before recording: against expectation, against the rest of the chain, and against something independent.',
            'Where a reading is doubtful, record it with the doubt attached. A gap tells the next person nothing.',
            'A record that cannot be compared with anything is reassurance, not evidence.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 4.5" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-4-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Measurement equipment
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next module <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Control loops and feedback
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule4Section5;
