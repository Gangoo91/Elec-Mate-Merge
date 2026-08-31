/**
 * Module 6 · Section 5 — Calibration intervals
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar.
 *
 * 🔴 POSITIONING. The outline said "calibration intervals, certificates and
 * UKAS traceability" — and Module 1 Section 4 already owns UKAS (9 mentions),
 * ISO/IEC 17025 (10), accreditation (20), certificates (24) and the
 * traceability chain (43). Two thirds of that title is taken.
 *
 * What is NOT covered anywhere: HOW AN INTERVAL IS ACTUALLY SET. M1.4 mentions
 * "interval" once; M4.5's 24 mentions are LOGGING intervals (sampling), a
 * different subject entirely. So this page owns intervals, and only intervals.
 *
 * 🔴 THE FRAMING. An interval is a RISK DECISION, not a rule handed down. It
 * balances two things:
 *   - how fast this instrument drifts        → from the as-found history (M4.5)
 *   - what it costs to be wrong              → from what the reading is used for
 *
 * 🔴 THE PAYOFF, and it is the thing that makes the whole of Module 4 Section 5
 * pay: the as-found sequence IS the evidence that sets the interval. An
 * instrument that never moves can go longer; one that is drifting faster than
 * it used to cannot. An interval that has never changed in ten years is an
 * interval nobody is using the data for — which means the recording discipline
 * has been performed and never harvested.
 *
 * 🔴 Also: an interval must be RESET by anything that invalidates the history —
 * repair, replacement, a change of duty, a change of location. The drift record
 * belongs to an instrument in a situation, not to a tag number.
 *
 * ⚠️ ACCURACY: do NOT state specific intervals, regulatory requirements or
 * industry-standard periods. "Annual" is a convention, not a rule, and naming
 * regulations would be fabrication. Keep every claim derivable.
 *
 * Sources: this section is applied reasoning from the course's own material —
 * Kuphaldt §18.3.2 (drift as an indicator of impending failure) supplies the
 * principle that the history predicts, and Module 4 Section 5 develops it.
 * Nothing here asserts a figure or a requirement that is not derived.
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

const TITLE = 'Calibration intervals | Instrumentation Module 6.5 | Elec-Mate';
const DESCRIPTION =
  'How a calibration interval is actually decided — why it is a risk judgement rather than a rule, how the as-found history provides the evidence, when an interval should be extended or shortened, and what resets it entirely.';

const outcomes = [
  '🔴 Explain what an interval is balancing, and why it is a judgement rather than a rule',
  'Say what the two inputs to an interval decision are',
  '🔴 Explain how the as-found history provides the evidence for changing one',
  'Say why an interval that never changes suggests the data is not being used',
  'Justify extending an interval, and say what evidence is required',
  'Justify shortening one, and recognise the signal that demands it',
  '🔴 List what resets an interval by invalidating the history',
  'Say what a calibration due date does and does not guarantee',
];

const quizQuestions = [
  {
    id: 1,
    question: '🔴 What is a calibration interval fundamentally balancing?',
    options: [
      'How fast the instrument drifts against what it costs to be wrong',
      'The manufacturer’s recommendation against site convenience',
      'The workload of the calibration team',
      'The cost of calibration against the cost of the instrument',
    ],
    correctIndex: 0,
    explanation:
      'Both halves are needed. A stable instrument on a critical duty may warrant frequent checking anyway; a drifting instrument whose reading barely matters may not. The interval is where those two considerations meet, which makes it a risk judgement rather than a fixed rule.',
  },
  {
    id: 2,
    question: '🔴 Where does the evidence for changing an interval come from?',
    options: [
      'The manufacturer’s data sheet',
      'The as-found history — how far the instrument had moved at each successive calibration',
      'The as-left records',
      'The age of the instrument',
    ],
    correctIndex: 1,
    explanation:
      'As-found is the only measurement of what the instrument was doing in service, so a run of them shows how fast it actually drifts under real conditions. As-left records show only where it was set each time, which reveals nothing about how it behaves in between.',
  },
  {
    id: 3,
    question:
      'An instrument’s as-found error has been within a quarter of its tolerance at each of the last five annual calibrations. What does that support?',
    options: [
      'Replacing the instrument',
      'Nothing — the interval is fixed',
      'A case for extending the interval, since the evidence shows it stays well inside tolerance over a year',
      'Shortening the interval as a precaution',
    ],
    correctIndex: 2,
    explanation:
      'Five years of evidence that it barely moves is exactly the justification for checking it less often. That is a documented decision based on data rather than a relaxation — and it frees effort for instruments that genuinely need it.',
  },
  {
    id: 4,
    question:
      '🔴 As-found errors over four years are 0.1, 0.2, 0.4 and 0.9 per cent, against a 1.5 per cent tolerance. What does this indicate?',
    options: [
      'The calibrations were performed inconsistently',
      'The tolerance is too tight',
      'The instrument is fine — every result passed',
      'The drift is accelerating, so it is likely to be out of tolerance before the next annual check',
    ],
    correctIndex: 3,
    explanation:
      'Every individual result passed, and the sequence is the finding. The steps are growing — 0.1, then 0.2, then 0.5 — which is Module 4 Section 5’s impending-failure signal. Waiting another full year risks the instrument spending months out of tolerance unnoticed.',
  },
  {
    id: 5,
    question: 'What does an interval that has never changed in ten years suggest?',
    options: [
      'That the calibration data is being collected and never used to inform anything',
      'That the interval was set correctly at the start',
      'That the instrument is not critical',
      'The instrument is very stable',
    ],
    correctIndex: 0,
    explanation:
      'It might be right, and nothing in the record demonstrates that anybody checked. The point of building a drift history is that it should change decisions. A history that never alters an interval has been performed as a ritual rather than used as evidence.',
  },
  {
    id: 6,
    question: '🔴 Which of these resets an instrument’s calibration history?',
    options: [
      'A routine calibration that passed',
      'Replacing the instrument, repairing it, or moving it to a different duty or location',
      'A change of technician',
      'A change to the tolerance',
    ],
    correctIndex: 1,
    explanation:
      'The drift history describes a particular instrument in a particular situation. Change the instrument and it is a different device; change the duty or location and the conditions driving the drift are different. Either way the accumulated evidence no longer predicts anything and the interval starts again conservatively.',
  },
  {
    id: 7,
    question: 'What does a calibration due date guarantee about an instrument today?',
    options: [
      'That it has not drifted',
      'That it is reading correctly',
      'Nothing — it states when the next comparison is scheduled, not the instrument’s present condition',
      'That it is within tolerance',
    ],
    correctIndex: 2,
    explanation:
      'An in-date instrument can be substantially out of tolerance, which is precisely what is discovered at the next calibration. The date is a plan for when to look, not a statement about what you would find — and Section 4 covered what happens when the finding is bad.',
  },
  {
    id: 8,
    question:
      'A critical instrument has never once been found out of tolerance in eight years. Should its interval be extended?',
    options: [
      'No — critical instruments can never have their intervals changed',
      'Only if the manufacturer agrees',
      'Yes — the evidence clearly supports it',
      'Possibly, but the consequence of being wrong is the other half of the decision and may justify keeping it',
    ],
    correctIndex: 3,
    explanation:
      'The drift evidence is only one input. Where the cost of an undetected error is severe, frequent checking can be justified even on a demonstrably stable instrument — because the interval is buying confidence, not just catching drift. Stability alone does not settle it.',
  },
];

const InstrumentationModule6Section5 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 6 · Section 5"
        title="Calibration intervals"
        backTo="/electrician/upskilling/instrumentation-module-6"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          How often is often enough? It is a judgement, it should be evidence-based, and the
          evidence is something you have been building all along.
        </p>

        <TLDR
          points={[
            '🔴 An interval balances how fast an instrument drifts against what it costs to be wrong.',
            '🔴 The evidence comes from the as-found history: how far it had moved at each successive calibration.',
            'As-left records reveal nothing about drift, because they only show where it was set each time.',
            '🔴 Growing as-found errors justify shortening one, and accelerating growth demands it.',
            'Every individual result can pass while the sequence is the finding.',
            'An interval unchanged for a decade suggests the data is collected and never used.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>🔴 What an interval actually is</ContentEyebrow>

        <ConceptBlock
          title="A risk decision, not a rule handed down"
          plainEnglish="Nobody can tell you the right number without knowing how much this instrument moves and how much it matters if it is wrong."
          onSite="An annual interval is a convention. It is a sensible default and it is not a law of nature."
        >
          <p>
            Calibration intervals are usually inherited. An instrument arrives with a period
            attached to it, the period is respected, and nobody asks where it came from. That is
            understandable and it wastes the most useful thing the calibration programme produces.
          </p>
          <p>
            An interval is a <strong>judgement balancing two quantities</strong>:
          </p>
          <ul>
            <li>
              <strong>How fast does this instrument actually drift?</strong> Which is a question
              about the instrument in this situation, answerable from evidence.
            </li>
            <li>
              <strong>What does it cost to be wrong?</strong> Which is a question about what the
              reading is used for, and belongs to whoever uses it.
            </li>
          </ul>
          <p>
            The interval is where those two meet.{' '}
            <strong>
              Neither on its own settles it, and treating either as the whole answer produces
              intervals that are wrong in a predictable direction.
            </strong>
          </p>
          <p>
            Judging only on drift means a rock-steady instrument on a critical duty gets checked
            rarely &mdash; and the whole point of checking it is not that it is expected to be
            wrong, but that the consequence if it were would be severe. Judging only on criticality
            means everything important gets checked constantly regardless of whether it ever moves,
            which consumes effort that other instruments need.
          </p>
          <p>
            It follows that the same instrument model, calibrated by the same team, can legitimately
            carry different intervals in different places on the same site. That is not
            inconsistency; it is the decision being made properly.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 Where the evidence comes from</ContentEyebrow>

        <ConceptBlock
          title="The as-found history is the whole basis"
          plainEnglish="Every calibration you have ever recorded before touching the instrument is a measurement of how fast it drifts. A run of them is a prediction."
          onSite="This is what all that recording was for. If the history exists, the interval can be argued from evidence rather than habit."
        >
          <p>
            Module 4 Section 5 argued for recording as-found values on the grounds that drift cannot
            otherwise be calculated. Section 4 of this module gave the sharper reason &mdash; it is
            the only evidence about the period just passed. This is the third use, and it is the one
            that pays forward.
          </p>
          <p>
            <strong>
              A sequence of as-found errors is a measurement of how quickly this instrument goes
              wrong under its real conditions.
            </strong>{' '}
            Not under laboratory conditions, not according to a data sheet &mdash; in this location,
            on this duty, with this process doing what it does to it.
          </p>
          <p>
            That is far better information than any general recommendation, and it is the reason
            as-left records cannot substitute.{' '}
            <strong>
              As-left tells you where the instrument was set. As-found tells you where it got to.
            </strong>{' '}
            Only the second describes behaviour.
          </p>
          <AppendixTable
            caption="Reading a run of as-found errors against a 1.5 per cent tolerance"
            headers={[
              'Pattern over successive checks',
              'What it says',
              'What to do about the interval',
            ]}
            rows={[
              [
                '0.1, 0.1, 0.2, 0.1, 0.2 %',
                'Very stable — barely moves in a year',
                'Evidence for extending it',
              ],
              [
                '0.3, 0.6, 0.9, 1.2 %',
                'Steady drift, consuming the tolerance predictably',
                'Predict when it crosses and check before that',
              ],
              [
                '0.1, 0.2, 0.4, 0.9 %',
                '🔴 Accelerating — something is deteriorating',
                'Shorten it now; the next year is unlikely to be safe',
              ],
              [
                '0.8, 0.2, 1.1, 0.4 %',
                'Not drift — unstable, or the installation is affecting it',
                'Interval is the wrong tool; investigate the cause',
              ],
            ]}
            notes="Every value in every row passed the 1.5 per cent tolerance. The pattern is the finding, and no single calibration could reveal any of it."
          />
          <p>
            The bottom row is worth dwelling on, because it is easily misread as bad calibration
            work. <strong>Drift has a direction; scatter does not.</strong> Results jumping either
            side of zero are telling you something is unstable rather than ageing, and shortening
            the interval will not address it &mdash; Module 4 Section 3&rsquo;s error types are the
            place to look.
          </p>
        </ConceptBlock>

        <Pullquote>
          Every calibration you record properly is an investment in knowing how often the next one
          is needed. A history that never changes an interval was collected and never harvested.
        </Pullquote>

        <InlineCheck
          id="ins-6-5-history"
          question="An instrument's as-found errors over four checks are 0.2, 0.5, 0.9 and 1.4 per cent against a 2 per cent tolerance. Every check passed. What should happen?"
          options={[
            'Shorten the interval, because the drift is growing and the next check would very likely find it outside',
            'Widen the tolerance to 2.5 per cent',
            'Replace the instrument immediately',
            'Nothing — all four results were inside tolerance',
          ]}
          correctIndex={0}
          explanation="Passing every check is exactly what makes this easy to miss. The steps are 0.3, 0.4, 0.5 — growing — and extrapolating puts the next result beyond 2 per cent. Waiting the full period means the instrument spends part of it out of tolerance and nobody knows, which is Section 4's backwards problem arriving predictably."
        />

        <SectionRule />
        <ContentEyebrow>Changing an interval</ContentEyebrow>

        <ConceptBlock
          title="Extending — a decision, not a relaxation"
          plainEnglish="If the evidence says it does not move, checking it less often is the correct engineering answer, not a corner being cut."
          onSite="It also frees time for the instruments that genuinely need attention, which is the real benefit."
        >
          <p>
            Extending an interval has an unearned reputation as cost-cutting. Done on evidence it is
            simply the decision the data supports.
          </p>
          <p>What that requires:</p>
          <ul>
            <li>
              <strong>Enough history to be meaningful.</strong> One good result is luck; several
              successive ones showing the same behaviour are a pattern.
            </li>
            <li>
              <strong>Consistently small as-found errors</strong> relative to the tolerance, with no
              trend towards growth.
            </li>
            <li>
              <strong>Nothing changed</strong> about the instrument, its duty or its conditions
              since that history was accumulated.
            </li>
            <li>
              <strong>The consequence side still considered.</strong> Stability is one input; what
              it costs to be wrong is the other, and it has not changed just because the drift is
              small.
            </li>
          </ul>
          <p>
            The genuine benefit is not the money saved on one instrument. It is that{' '}
            <strong>
              calibration effort is finite, and time not spent on instruments that do not need it is
              available for instruments that do.
            </strong>{' '}
            A programme that checks everything at the same fixed period regardless of behaviour is
            over-servicing some instruments and under-servicing others simultaneously.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Shortening — when the history demands it"
          plainEnglish="An instrument whose errors are growing is telling you when it will fail. Believing it is cheaper than finding out afterwards."
          onSite="Accelerating drift is the signal to act on. Steady drift is predictable; acceleration is not."
        >
          <p>
            The stronger case is the other direction, and it is the one Module 4 Section 5
            identified:{' '}
            <strong>
              drift that suddenly grows is usually a component starting to go, and it announces
              itself before the instrument actually fails.
            </strong>
          </p>
          <p>Two patterns justify shortening an interval, and they justify it differently:</p>
          <ul>
            <li>
              <strong>Steady drift consuming the tolerance.</strong> Predictable, so it can be
              managed by arithmetic &mdash; work out when the trend crosses the limit and schedule
              before it. This is planning rather than alarm.
            </li>
            <li>
              <strong>🔴 Accelerating drift.</strong> Not predictable by extrapolation, because
              whatever is causing it is getting worse. The next period cannot be assumed safe on the
              basis of the last one, and the response is to check sooner and investigate the cause.
            </li>
          </ul>
          <p>
            In both cases the interval is doing the job it exists for &mdash; catching the problem
            before it becomes Section 4&rsquo;s backwards question.{' '}
            <strong>
              An instrument found badly out of tolerance is a failure of the interval as much as of
              the instrument
            </strong>
            , because the interval was supposed to be short enough to catch it first.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 What resets the clock</ContentEyebrow>

        <ConceptBlock
          title="The history belongs to an instrument in a situation"
          plainEnglish="Change the instrument or change what is happening to it, and the drift record no longer predicts anything."
          onSite="A like-for-like replacement inherits the tag number and none of the history."
        >
          <p>
            An interval justified by evidence is only as good as the assumption that the future
            resembles the past. Several things break that assumption, and each one means the
            accumulated history stops applying:
          </p>
          <ul>
            <li>
              <strong>Replacement.</strong> A new instrument is a different device. It may be the
              same model from the same batch and its drift behaviour is its own. The tag number
              carries over; the history does not.
            </li>
            <li>
              <strong>Repair.</strong> Something inside has changed, which is generally the point.
              How the repaired instrument behaves is a new question.
            </li>
            <li>
              <strong>A change of duty.</strong> The same instrument on a different measurement, or
              at a different point in the range, may drift quite differently &mdash; and the
              tolerance may need revisiting too, per Section 4.
            </li>
            <li>
              <strong>A change of location or conditions.</strong> Module 4 Section 3 listed ambient
              conditions among the causes of drift. An instrument moved somewhere hotter, colder,
              wetter or more vibrating is in a different regime.
            </li>
            <li>
              <strong>A significant out-of-tolerance finding.</strong> The evidence that supported
              the old interval has just been contradicted.
            </li>
          </ul>
          <p>
            🔴 The first is the one that catches people, because nothing visible changes.{' '}
            <strong>
              A like-for-like replacement looks identical, occupies the same tag, and has no history
              whatsoever.
            </strong>{' '}
            Carrying the old interval across assumes the new instrument behaves like the old one, on
            no evidence at all &mdash; and Module 5 Section 6 gave a related example, where a
            replacement drive brought different configuration with it and nobody recorded the
            change.
          </p>
          <p>
            The safe position after any reset is to return to a conservative interval and rebuild
            evidence from there.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-6-5-reset"
          question="A transmitter with eight years of excellent drift history is replaced like for like after a physical accident. What interval should the new one carry?"
          options={[
            'The extended interval justified by the old instrument’s history',
            'A conservative interval, because the new instrument has no history of its own',
            'Half the old interval',
            'Whatever the manufacturer states, permanently',
          ]}
          correctIndex={1}
          explanation="The history described the old device in that situation. The replacement occupies the same tag and is a different instrument, so nothing is yet known about how it drifts. Carrying the extended interval across assumes behaviour on no evidence — start conservative and rebuild the record."
        />

        <SectionRule />
        <ContentEyebrow>Misreading the date</ContentEyebrow>

        <CommonMistake
          title="Treating the due date as a statement about the instrument"
          whatHappens={
            <>
              <p>
                An instrument is in date, so its readings are treated as sound. A discrepancy gets
                blamed elsewhere &mdash; the process, another instrument, the operator &mdash;
                because this one has a valid calibration.
              </p>
              <p>
                A due date says when the next comparison is scheduled. It says nothing at all about
                the instrument&rsquo;s present condition, and an in-date instrument can be
                substantially out of tolerance. That is precisely what gets discovered at the next
                calibration, and Section 4 explained what that discovery implies about the preceding
                period.
              </p>
              <p>
                The reasoning is the same error Module 1 Section 4 identified with calibration
                stickers, arriving through a different door: a record of a past event is being read
                as an assurance about the present.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Treat an in-date calibration as evidence that the instrument was sound at a known
                moment and has not yet been re-checked. That is genuinely useful and it is not
                proof.
              </p>
              <p>
                When a discrepancy appears, compare rather than assume &mdash; against an
                independent instrument, against another measurement in the same system, against a
                known physical reference. Module 4 Section 5&rsquo;s plausibility checks apply, and
                Module 4 Section 1&rsquo;s reverse-conversion habit splits the system quickly.
              </p>
              <p>
                And if an in-date instrument turns out to be wrong, that is a finding about the
                interval as well as the instrument. It suggests the period was too long for how this
                one behaves.
              </p>
            </>
          }
        />

        <ConceptBlock
          title="Reviewing intervals as a programme"
          plainEnglish="Looking at one instrument tells you about one instrument. Looking at all of them tells you whether the programme is working."
          onSite="Worth doing periodically rather than only when something goes wrong."
        >
          <p>
            Intervals are usually revisited one instrument at a time, when something prompts it. A
            periodic look across the whole population answers questions no single record can:
          </p>
          <ul>
            <li>
              <strong>Is anything ever found out of tolerance?</strong> If nothing ever fails, the
              intervals may be shorter than they need to be &mdash; or the tolerances looser than
              they should be, which is Section 4&rsquo;s question rather than this one.
            </li>
            <li>
              <strong>Is anything failing repeatedly?</strong> Module 4 Section 3&rsquo;s scenario
              &mdash; four calibrations in nine months, all passing &mdash; is visible only from the
              history, and repeated failure points at the instrument or the installation rather than
              the interval.
            </li>
            <li>
              <strong>Do instruments of one type behave alike?</strong> A consistent pattern across
              a population is stronger evidence than any individual record, and it can inform
              intervals for units with no history of their own.
            </li>
            <li>
              <strong>Is effort going where it is needed?</strong> A programme checking everything
              at the same period is simultaneously over-servicing the stable instruments and
              under-servicing the ones that move.
            </li>
          </ul>
          <p>
            The caution on the third point is that{' '}
            <strong>
              duty and location vary within a population, so a fleet finding is a starting point
              rather than a substitute for an individual record.
            </strong>{' '}
            Two identical instruments in different places are, for this purpose, different
            instruments.
          </p>
        </ConceptBlock>

        <Scenario
          title="Two identical transmitters, and a case for two different intervals"
          situation={
            <>
              <p>
                Two pressure transmitters of the same model, calibrated by the same team on the same
                annual schedule. One is on a filter differential where the reading gives operators a
                rough indication of loading. The other is on a measurement used to decide whether
                material meets specification before it is dispatched.
              </p>
              <p>
                Both have five years of as-found records showing consistently small errors, well
                inside tolerance.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                The drift evidence is identical, and the right answer is very likely different for
                each &mdash; because drift is only one of the two inputs.
              </p>
              <p>
                For the <strong>filter differential</strong>, both halves point the same way. It
                barely moves, and if it were wrong the consequence is that operators get a slightly
                misleading indication of something they can also see other ways. That is a
                well-evidenced case for extending the interval.
              </p>
              <p>
                For the <strong>dispatch measurement</strong>, the drift evidence is the same and
                the consequence is not. If that instrument were found significantly out, Section
                4&rsquo;s backwards question applies to every batch released in the meantime. A
                shorter interval is not buying protection against expected drift &mdash;{' '}
                <strong>it is buying a shorter exposure window if the unexpected happens</strong>.
              </p>
              <p>
                So the recommendation is to extend one and leave the other, with the reasoning
                recorded. The two intervals differing is the decision being made properly rather
                than an inconsistency to be tidied up.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                A programme that sets intervals from instrument type alone would treat these two
                identically and be wrong about at least one of them. The consequence of error is not
                a property of the hardware.
              </p>
              <p>
                It also shows what an interval is really buying on a critical measurement. Not
                protection against drift you expect &mdash; the evidence says there is none &mdash;
                but a bound on how long you could be wrong without knowing.
              </p>
            </>
          }
        />

        <ConceptBlock
          title="What an interval is really buying"
          plainEnglish="Not protection against drift you already know about. A limit on how long you could be wrong without knowing."
          onSite="That framing settles most interval arguments, because it separates the two reasons for checking."
        >
          <p>
            There are two quite different reasons to calibrate on a schedule, and separating them
            resolves most disagreements about intervals.
          </p>
          <ul>
            <li>
              <strong>To catch expected drift.</strong> The instrument moves predictably, and the
              interval is set so it is corrected before it leaves tolerance. This is the case the
              as-found history speaks to directly, and it is largely arithmetic.
            </li>
            <li>
              <strong>🔴 To bound the exposure if something unexpected happens.</strong> The
              instrument may be perfectly stable and still fail suddenly, be knocked, or have its
              conditions change. The interval sets the maximum period during which that could go
              unnoticed.
            </li>
          </ul>
          <p>
            The second is why a demonstrably stable instrument on a critical duty can still warrant
            frequent checking, and it is the part that drift evidence alone never justifies.{' '}
            <strong>
              The question is not only how likely it is to be wrong, but how long you could afford
              not to know.
            </strong>
          </p>
          <p>
            Section 4 gave that its concrete form. An instrument found out of tolerance puts every
            reading since the last check in question &mdash;{' '}
            <strong>
              so the interval is literally the size of the problem if the worst happens
            </strong>
            . Halving the interval halves the scope of any future impact assessment, whether or not
            the instrument was ever expected to drift.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Is an annual interval a requirement?',
              answer:
                'It is a widespread convention rather than a universal rule, and it is a reasonable default in the absence of evidence. Some industries and applications are subject to specific requirements that do set periods, and where those apply they are not a matter for local judgement — that is a question for the site’s own procedures rather than a general answer. Where no such requirement applies, the interval is a decision that should be justifiable.',
            },
            {
              question: 'How much history is enough to justify a change?',
              answer:
                'Enough to distinguish a pattern from a coincidence, which in practice means several successive results behaving consistently rather than one or two. There is no universal number, and the useful test is whether you could defend the reasoning to somebody who did not want the answer — one good result cannot, and five consistent ones usually can. Shortening an interval on a single alarming result is more defensible than extending on a single good one, because the costs of being wrong are asymmetric.',
            },
            {
              question: 'What if an instrument has no calibration history at all?',
              answer:
                'Then there is no evidence, so the interval has to be set conservatively from the consequence side alone and from whatever the manufacturer suggests. That is the correct position for anything new, replaced or repaired. The first few calibrations then build the evidence that justifies changing it, which is why recording as-found values matters most at exactly the point they feel least useful.',
            },
            {
              question: 'Should intervals be reviewed instrument by instrument?',
              answer:
                'Individually where the evidence supports it, and it is also worth looking at populations. If every instrument of one type on a site shows similar drift behaviour, that is stronger evidence than any single instrument’s record and it can inform intervals for units that do not yet have a history of their own. The caution is that duty and location differ even within a population, so a population finding is a starting point rather than a substitute for the individual record.',
            },
            {
              question: 'Does extending an interval need approval?',
              answer:
                'It needs the decision recorded with its reasoning, and who is entitled to make it is a matter of site procedure. What matters technically is that the justification exists and is written down — an interval changed without a rationale is indistinguishable later from one changed for convenience, and the person reviewing it years afterwards has only the record to go on.',
            },
            {
              question: 'What happens if a calibration is missed and goes overdue?',
              answer:
                'The instrument has not necessarily gone wrong, and the assurance has lapsed — the period since the last known-good state is now longer than the one the interval was set for. Practically that means calibrating it and paying attention to the as-found result, because it is now covering a longer exposure than intended. If it is found out of tolerance, Section 4’s backwards question covers a correspondingly longer period.',
            },
          ]}
        />

        <ConceptBlock
          title="Where Module 6 has been"
          plainEnglish="Five sections that between them answer what calibration is, how it is done, what the result means, and how often to repeat it."
          onSite="The thread is that a calibration is only worth what its record supports."
        >
          <ul>
            <li>
              <strong>Section 1</strong> &mdash; calibration is a comparison against a known
              physical input, and it is not ranging or trimming.
            </li>
            <li>
              <strong>Section 2</strong> &mdash; the equipment, and the fact that any substitution
              tests everything downstream of it and excludes everything upstream.
            </li>
            <li>
              <strong>Section 3</strong> &mdash; the procedure, and why analogue adjustments iterate
              while digital trims do not.
            </li>
            <li>
              <strong>Section 4</strong> &mdash; the verdict, where the tolerance comes from, and
              what a failure says about the period just passed.
            </li>
            <li>
              <strong>Section 5</strong> &mdash; how often, argued from the history rather than from
              habit.
            </li>
          </ul>
          <p>
            One idea connects all five, and it is worth carrying into Module 7:{' '}
            <strong>the as-found record is the most valuable thing a calibration produces.</strong>{' '}
            It is the evidence for what the instrument was doing in service, the basis for assessing
            what its readings were worth, and the input that sets the next interval &mdash; and it
            exists for only a few minutes before the first adjustment destroys it.
          </p>
        </ConceptBlock>

        <KeyTakeaways
          points={[
            'Module 1 Section 4 owns traceability, UKAS, ISO/IEC 17025 and certificates. This section owns intervals only.',
            '🔴 An interval balances how fast the instrument drifts against what it costs to be wrong. Both halves are required.',
            'Judging on drift alone under-serves critical instruments; judging on criticality alone wastes effort on stable ones.',
            'The same model on the same site can legitimately carry different intervals. That is the decision being made properly.',
            '🔴 The evidence is the as-found history — how far it had moved at each successive calibration, under its real conditions.',
            'As-left records cannot substitute: they show where it was set, not where it got to.',
            'Consistently small as-found errors with no growth support extending an interval, on evidence rather than convenience.',
            '🔴 Growing errors support shortening it; accelerating errors demand it, because the next period cannot be assumed safe.',
            'Every individual result can pass while the sequence is the finding.',
            'Scatter either side of zero is not drift — it is instability, and a shorter interval will not address it.',
            'An interval unchanged for a decade suggests the history is being collected and never harvested.',
            '🔴 Replacement, repair, a change of duty or location, or a serious out-of-tolerance finding all reset the history.',
            '🔴 A like-for-like replacement inherits the tag number and none of the drift record. Carrying the old interval across assumes behaviour on no evidence.',
            'A due date states when the next comparison is scheduled — never that the instrument is right today.',
            'An instrument found badly out of tolerance is a failure of the interval as much as of the instrument.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 6.5" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-6-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Results and tolerances
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-6-section-6')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Calibrating the loop
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule6Section5;
