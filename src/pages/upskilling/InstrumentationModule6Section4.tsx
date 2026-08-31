/**
 * Module 6 · Section 4 — Recording results, tolerances and failed calibrations
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar.
 *
 * 🔴 POSITIONING — the outline said "recording and documenting calibration
 * results", which is already taken. Module 4 Section 5 owns as-found/as-left,
 * drift, the sign of an error, and reading a history (as-found 11, as-left 8,
 * drift 30, record 84). Module 1 Section 4 owns how to READ a certificate.
 * Re-teaching either would be a straight duplicate.
 *
 * So this page owns the part neither covers: THE VERDICT.
 *
 *   1. 🔴 A record needs a decision, not just numbers — pass or fail against
 *      what? And the tolerance is NOT the manufacturer's accuracy figure.
 *      It comes from what the process actually needs, which is Module 5
 *      Section 5's "what does good mean here" applied to measurement.
 *   2. 🔴 THE BACKWARDS QUESTION, and it is the most important idea on the
 *      page: an instrument FOUND out of tolerance means every reading it gave
 *      since its last calibration is now suspect. The as-found value is the
 *      only evidence of how long and how badly. That is why as-found is
 *      recorded before touching anything — M1.4 states the principle, this
 *      page develops the consequence.
 *   3. Disposition — adjusted, repaired, replaced, derated, or left alone. A
 *      calibration can end several ways and only one of them is "adjusted".
 *
 * ⚠️ ACCURACY: do NOT invent specific regulatory requirements. Regulated
 * industries formalise impact assessment; naming particular regulations or
 * clauses would be fabrication. Keep it general and true.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §18.3.2 (as-found and as-left documentation; drift as an indicator of
 * impending failure) — referenced rather than re-taught, since Module 4
 * Section 5 already develops it. The tolerance and impact-assessment framing
 * is applied reasoning from the course's own earlier material.
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
  'Recording results, tolerances and failed calibrations | Instrumentation Module 6.4 | Elec-Mate';
const DESCRIPTION =
  'Where a calibration tolerance actually comes from, why a record needs a verdict and not just numbers, and the backwards question a failed calibration forces — what every reading that instrument gave since its last check is now worth.';

const outcomes = [
  'Say why a calibration record needs a verdict as well as measurements',
  '🔴 Explain where a tolerance comes from, and why it is not the manufacturer’s accuracy figure',
  'Say why a tolerance tighter than the standard can resolve is meaningless',
  '🔴 Explain what finding an instrument out of tolerance implies about past readings',
  'Say why the as-found value is the only evidence of that, and why it cannot be recovered later',
  'Describe what an impact assessment asks',
  'List the ways a calibration can end besides being adjusted',
  'Explain what a calibration label does and does not tell you',
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does a calibration record need beyond the measured values?',
    options: [
      'A verdict — pass or fail against a stated tolerance',
      'The instrument’s serial number',
      'The date of the next calibration',
      'The technician’s signature',
    ],
    correctIndex: 0,
    explanation:
      'Numbers alone leave the reader to decide what they mean, and the person who took them is best placed to state it. A record showing 0.4 per cent error is only useful alongside what error was acceptable — otherwise nobody can tell whether the instrument passed.',
  },
  {
    id: 2,
    question: '🔴 Where should a calibration tolerance come from?',
    options: [
      'The manufacturer’s published accuracy specification',
      'What the process actually requires of the measurement',
      'The capability of the calibration standard',
      'A fixed percentage used across the site',
    ],
    correctIndex: 1,
    explanation:
      'The manufacturer’s figure describes what the instrument can do, not what the duty needs. A measurement used for a rough indication and one used for custody transfer have completely different requirements from identical hardware — which is Module 5 Section 5’s point that good is defined by the process.',
  },
  {
    id: 3,
    question:
      'An instrument specified to ±0.1 per cent is used where ±1 per cent is entirely adequate. What tolerance should it be calibrated to?',
    options: [
      'Whatever the calibration standard can resolve',
      '±0.1 per cent, because that is what it is capable of',
      'A tolerance derived from the ±1 per cent the process needs, so it is not failed for errors that do not matter',
      '±0.05 per cent, to allow margin',
    ],
    correctIndex: 2,
    explanation:
      'Holding it to its specification rather than its duty means adjusting an instrument that was performing perfectly well, and eventually failing it for an error with no consequence. Capability and requirement are different questions, and the tolerance follows the requirement.',
  },
  {
    id: 4,
    question: 'Why can a tolerance be too tight to be meaningful?',
    options: [
      'Because it takes too long to verify',
      'Because tolerances are always approximate',
      'Because instruments cannot be that accurate',
      'Because if it is comparable with the standard’s own uncertainty, a pass or fail says as much about the standard as the instrument',
    ],
    correctIndex: 3,
    explanation:
      'Module 1 Section 4 covered this as the accuracy ratio. A comparison is only as good as what you compare against, so a tolerance approaching the standard’s uncertainty cannot be adjudicated — the result is no longer attributable to the instrument under test.',
  },
  {
    id: 5,
    question:
      '🔴 An instrument is found 3 per cent out of tolerance at its annual calibration. What does that imply about the year just passed?',
    options: [
      'Every reading it gave since its last calibration is suspect, and the extent needs assessing',
      'Only readings from the last month are affected',
      'The previous calibration must have been performed incorrectly',
      'Nothing — it has been corrected now',
    ],
    correctIndex: 0,
    explanation:
      'A calibration establishes a state at one moment. Finding it out of tolerance says nothing about when it drifted, so the whole period since the last known-good state is in question — along with everything that was decided using those readings.',
  },
  {
    id: 6,
    question:
      '🔴 A technician adjusts an out-of-tolerance instrument before recording the as-found values. What has been lost?',
    options: [
      'Nothing important — the as-left values are what matter',
      'The only evidence of how far out it was, which is what any assessment of the previous period depends on',
      'The instrument’s warranty',
      'The ability to calculate the next calibration date',
    ],
    correctIndex: 1,
    explanation:
      'As-found is the only measurement of what the instrument was actually doing in service, and it exists for a few minutes before the first adjustment. Once it is gone, nobody can say whether the drift was trivial or serious — so the question about past readings becomes unanswerable rather than merely inconvenient.',
  },
  {
    id: 7,
    question: 'What does a calibration label on an instrument tell you?',
    options: [
      'That the instrument is suitable for its duty',
      'That the instrument is reading correctly now',
      'That it was compared against a standard on a stated date and left in a stated condition',
      'That the measurement can be trusted',
    ],
    correctIndex: 2,
    explanation:
      'It is a statement about a past event, not the present. Module 1 Section 4 made the point that a sticker is not proof a reading is right, and Section 1 of this module added that a certificate describes the instrument rather than the measurement — installation effects sit outside both.',
  },
  {
    id: 8,
    question: 'Which of these is NOT a legitimate way for a calibration to end?',
    options: [
      'Found within tolerance and left alone',
      'Adjusted back within tolerance',
      'Failed, removed from service and replaced',
      'Failed, adjusted as close as possible, and returned with no record of the failure',
    ],
    correctIndex: 3,
    explanation:
      'The first three are all proper outcomes, including doing nothing. The fourth conceals the finding that would have triggered a look at the previous period — the instrument may end up serviceable and the record no longer supports the readings taken before it.',
  },
];

const InstrumentationModule6Section4 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 6 · Section 4"
        title="Results and tolerances"
        backTo="/electrician/upskilling/instrumentation-module-6"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Measurements are the easy part. The hard part is the verdict — and what a failed verdict
          says about everything that came before it.
        </p>

        <TLDR
          points={[
            'A record needs a decision as well as numbers: pass or fail, against a stated tolerance.',
            '🔴 The tolerance comes from what the PROCESS needs, not from the manufacturer’s accuracy figure.',
            '🔴 An instrument FOUND out of tolerance makes every reading it gave since its last calibration suspect.',
            '🔴 The as-found value is the only evidence of how far out it was — and it exists for minutes before the first adjustment.',
            'Adjusting before recording does not lose a number. It makes the question about the previous period unanswerable.',
            'Found within tolerance and left alone is a complete and successful job.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>A record needs a decision</ContentEyebrow>

        <ConceptBlock
          title="Numbers without a verdict leave the work unfinished"
          plainEnglish="Recording that an instrument was 0.4 per cent out only helps if somebody also says whether 0.4 per cent was acceptable."
          onSite="You are the person best placed to state the verdict. Leaving it to the reader passes on a judgement they cannot make."
        >
          <p>
            Module 4 Section 5 established what makes a record useful and Module 1 Section 4
            established how to read a certificate. Both assume something this section has to supply:
            a <strong>tolerance</strong>, and a decision against it.
          </p>
          <p>
            A calibration record showing five points and five errors is data. It becomes information
            when it also says what error was permitted and whether the instrument stayed inside it.
            Without that, every future reader has to reconstruct the judgement from scratch &mdash;
            and they will do it with less context than you had.
          </p>
          <p>So a complete record carries three things, not one:</p>
          <ul>
            <li>
              <strong>What was measured</strong> &mdash; the as-found values, and the as-left values
              if anything was changed.
            </li>
            <li>
              <strong>What was permitted</strong> &mdash; the tolerance, stated explicitly rather
              than assumed.
            </li>
            <li>
              <strong>What was concluded</strong> &mdash; passed, failed, adjusted, referred.
            </li>
          </ul>
          <p>
            The middle one is the one most often missing, and it is the one that turns the other two
            into a result.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 Where a tolerance comes from</ContentEyebrow>

        <ConceptBlock
          title="Not the accuracy specification"
          plainEnglish="The data sheet says what the instrument can do. The tolerance should say what the job needs. Those are different questions and they often have very different answers."
          onSite="Ask what the measurement is used for. That is where the number comes from."
        >
          <p>
            The instinctive answer is to take the manufacturer&rsquo;s published accuracy figure and
            calibrate to that. It is convenient, defensible-sounding, and frequently wrong in both
            directions.
          </p>
          <p>
            <strong>
              A manufacturer&rsquo;s specification describes capability. A tolerance should describe
              requirement.
            </strong>
          </p>
          <p>
            Two identical transmitters can have completely different tolerances because they are
            doing different jobs. A pressure measurement used to give operators a rough indication
            that a filter is loading up needs very little of its instrument. The same hardware
            measuring a quantity somebody is billed for needs a great deal.
          </p>
          <p>
            This is Module 5 Section 5&rsquo;s argument arriving in a new place. There, the point
            was that <em>good control</em> is defined by what the process needs rather than by the
            controller. Here it is that <em>good measurement</em> is defined by what the measurement
            is used for &mdash; and in both cases the people who can answer are the ones who use the
            result.
          </p>
          <p>Getting it wrong costs in both directions:</p>
          <ul>
            <li>
              <strong>Tolerance too tight.</strong> The instrument is adjusted when it was
              performing perfectly adequately, and eventually fails for an error with no consequence
              &mdash; triggering all the work in the second half of this section for nothing.
            </li>
            <li>
              <strong>Tolerance too loose.</strong> An instrument passes while giving readings that
              are not fit for what they are being used for, and the record says so in writing.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="And it cannot be tighter than you can resolve"
          plainEnglish="If your standard is barely better than the instrument, a pass or fail is telling you as much about your standard as about the instrument."
          onSite="Check the ratio before agreeing to a tolerance, not after failing something against it."
        >
          <p>
            There is a hard limit underneath the requirement, and Module 1 Section 4 established it
            as the accuracy ratio: a calibration is a comparison, so it inherits the uncertainty of
            what it compares against.
          </p>
          <p>
            If a tolerance approaches the uncertainty of the standard being used, the result becomes
            unattributable.{' '}
            <strong>
              An instrument that measures 0.4 per cent out against a standard uncertain to 0.3 per
              cent has not been shown to be out at all
            </strong>
            &mdash; the finding is inside the noise of the test.
          </p>
          <p>
            So a tolerance has to satisfy two things at once: it must be loose enough that your
            standard can adjudicate it, and tight enough that the process gets a measurement it can
            use. Where those two requirements cannot both be met, that is a real finding &mdash; it
            means either better calibration equipment is needed, or the measurement cannot deliver
            what is being asked of it.
          </p>
          <p>
            Module 1 Section 4 covered this as &ldquo;chasing a tolerance tighter than your standard
            can resolve&rdquo;. It is worth recognising as a{' '}
            <strong>reason to stop and escalate</strong> rather than a reason to press on with a
            number that cannot mean anything.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-6-4-tolerance"
          question="A transmitter specified to ±0.075 per cent is used for a rough level indication where ±2 per cent would be ample. It is found 0.4 per cent out. What is the correct verdict?"
          options={[
            'Fail — it is outside its published specification',
            'Pass, if the tolerance was properly set from the ±2 per cent the duty requires',
            'Fail, and the instrument should be replaced',
            'It cannot be determined',
          ]}
          correctIndex={1}
          explanation="The verdict depends entirely on what tolerance was set, and the tolerance should follow the duty rather than the data sheet. Failing this instrument against its own specification means adjusting something that is doing its job, and setting off an impact assessment over an error that had no consequence whatsoever."
        />

        <SectionRule />
        <ContentEyebrow>🔴 The backwards question</ContentEyebrow>

        <ConceptBlock
          title="A failed calibration is a statement about the past"
          plainEnglish="You have not just found a wrong instrument. You have found out that everything it told you since the last check might have been wrong too."
          onSite="This is the part that turns a routine calibration into a serious finding, and it is the reason as-found matters so much."
        >
          <p>
            Everything so far has treated a calibration as forward-looking &mdash; establish the
            instrument is right, put it back, move on. A failure inverts that completely.
          </p>
          <p>
            Consider what has actually been established when an instrument is found 3 per cent out
            at its annual calibration. It was within tolerance a year ago, because that is what the
            last as-left record says. It is 3 per cent out today. And{' '}
            <strong>nothing whatsoever is known about when it went wrong.</strong>
          </p>
          <p>
            It may have drifted gradually over twelve months, in which case readings from the last
            few weeks are the worst affected and everything before that was progressively better. It
            may have shifted suddenly eleven months ago, in which case almost the entire year is
            compromised. The calibration cannot distinguish those cases, because{' '}
            <strong>a calibration measures a state, not a history.</strong>
          </p>
          <p>So the finding is not simply &ldquo;this instrument needs adjusting&rdquo;. It is:</p>
          <p>
            <strong>
              every reading this instrument produced since its last calibration is now of unknown
              reliability, and so is every decision made using them.
            </strong>
          </p>
          <p>
            Module 5 sharpens that considerably. If the instrument was feeding a control loop, the
            controller was not merely reporting a false value &mdash; it was <em>acting on it</em>,
            holding the process to a setpoint that was not where anybody thought it was, and doing
            so with every trend looking entirely normal.
          </p>
        </ConceptBlock>

        <Pullquote>
          A calibration measures a state, not a history. So finding an instrument out of tolerance
          tells you that something went wrong and never when — which is why the whole period since
          the last known-good state comes into question.
        </Pullquote>

        <ConceptBlock
          title="🔴 Why as-found is irreplaceable"
          plainEnglish="It exists for a few minutes, between arriving at the instrument and touching it. After that it is gone permanently."
          onSite="Record it before adjusting. Not after, not from memory, not approximately."
        >
          <p>
            Module 4 Section 5 argued for as-found records on the grounds that drift cannot be
            calculated without them. This section supplies the sharper reason.
          </p>
          <p>
            <strong>
              The as-found value is the only measurement that exists of what the instrument was
              actually doing while it was in service.
            </strong>{' '}
            It is the sole quantitative link between the calibration and the period being
            questioned.
          </p>
          <p>Without it, the questions that matter cannot be answered even in principle:</p>
          <ul>
            <li>How far out was it? &mdash; Unknown.</li>
            <li>
              Was the error large enough to matter for what the readings were used for? &mdash;
              Unanswerable.
            </li>
            <li>Which direction was it wrong in? &mdash; Unknown, unless the sign was recorded.</li>
            <li>
              Is this consistent with gradual drift or a sudden shift? &mdash; No basis for a view.
            </li>
          </ul>
          <p>
            Every one of those becomes answerable with a single set of numbers taken before the
            first adjustment, and permanently unanswerable without them.{' '}
            <strong>
              Adjusting first does not lose a measurement &mdash; it destroys the only evidence
              about a whole year of plant operation.
            </strong>
          </p>
          <p>
            That is why Section 1 separated verification from calibration, and why finding an
            instrument within tolerance and leaving it alone is a complete job. The as-found data{' '}
            <em>is</em> the deliverable, at least as much as the adjustment is.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="What an impact assessment asks"
          plainEnglish="Given that these readings might have been wrong by about this much, does anything that was decided need looking at again?"
          onSite="Your job is usually to raise it accurately, not to answer it. The answer needs people who know what the readings were used for."
        >
          <p>
            Where a failure is significant, the next step is an assessment of what it affected. In
            regulated industries this is a formal process with its own procedures; elsewhere it may
            be a conversation. The questions are the same either way:
          </p>
          <ul>
            <li>
              <strong>How far out was it, and in which direction?</strong> From the as-found record.
              Direction matters as much as magnitude &mdash; an instrument reading low and one
              reading high have opposite consequences.
            </li>
            <li>
              <strong>What was the measurement used for?</strong> Indication, control, alarm,
              accounting, quality, safety. The consequences differ enormously.
            </li>
            <li>
              <strong>Would that error have changed any decision?</strong> An instrument 3 per cent
              low that never approached a limit may have changed nothing. The same error on a
              measurement used to decide whether a batch met specification is another matter.
            </li>
            <li>
              <strong>How long was the period?</strong> Everything back to the last known-good
              as-left record is in scope.
            </li>
          </ul>
          <p>
            🔴 The important thing for a technician is to recognise{' '}
            <strong>
              that raising it is part of the job, not an escalation of somebody else&rsquo;s problem
            </strong>
            . The person holding the as-found numbers is the only one who knows the assessment is
            needed, and a failure recorded without being flagged is a failure nobody acts on.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-6-4-backwards"
          question="A level transmitter feeding a control loop is found 5 per cent out. Which statement is correct about the period since its last calibration?"
          options={[
            'The controller held the process at a level 5 per cent away from where everybody believed it was, with the trend looking entirely normal',
            'The loop corrected for the error automatically, so nothing was affected',
            'Only the displayed value was wrong; the control was unaffected',
            'The error would have shown up as an alarm',
          ]}
          correctIndex={0}
          explanation="A control loop acts on the measurement it is given. It held the false reading precisely at setpoint, which means the real level sat 5 per cent away — and the trend showed a perfectly controlled process throughout. Module 5 made the point that a measurement which merely misleads a person becomes, in a loop, a measurement that makes a plant do the wrong thing."
        />

        <SectionRule />
        <ContentEyebrow>Getting the record wrong</ContentEyebrow>

        <CommonMistake
          title="🔴 Adjusting first and recording afterwards"
          whatHappens={
            <>
              <p>
                An instrument is obviously reading wrong. The natural response is to correct it
                &mdash; that is what the visit is for &mdash; and then write up the result once it
                is behaving.
              </p>
              <p>
                The as-found values are now gone. They existed only in the minutes before the first
                adjustment, and no amount of care afterwards recovers them. The record shows an
                instrument that was calibrated and is now correct, which reads as an entirely
                successful job.
              </p>
              <p>
                🔴 What it conceals is that this instrument was substantially out for an unknown
                portion of the last year, that the readings it gave during that period are of
                unknown worth, and that somebody ought to be deciding whether that matters. None of
                those questions will now be asked, because nothing in the record suggests they
                should be.
              </p>
              <p>
                It also breaks the drift sequence Module 4 Section 5 described, so the next
                technician cannot tell whether this instrument has been deteriorating for years.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Take the full set of as-found readings before touching any adjustment, however
                obviously wrong the instrument is. It costs a few minutes and it is the only window
                in which that data exists.
              </p>
              <p>
                Record the tolerance and the verdict alongside them, so the failure is visible as a
                failure rather than as a set of numbers somebody would have to interpret.
              </p>
              <p>
                Then raise it. A significant out-of-tolerance finding is information the plant
                needs, and the technician who found it is the only person who currently knows.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>How a calibration can end</ContentEyebrow>

        <ConceptBlock
          title="Adjusted is only one of the outcomes"
          plainEnglish="Several endings are legitimate. Choosing the right one is a judgement, and recording which one you chose is part of the job."
          onSite="If the only outcome you ever record is “calibrated”, something is being lost."
        >
          <AppendixTable
            caption="Legitimate outcomes of a calibration visit"
            headers={['Outcome', 'When it applies', 'What must be recorded']}
            rows={[
              [
                'Found within tolerance, left alone',
                'The instrument passed. Nothing needs doing',
                'As-found values and the pass verdict — this is a complete job',
              ],
              [
                'Adjusted',
                'Found out of tolerance, brought back inside it',
                'As-found and as-left, plus the failure and any impact referral',
              ],
              [
                'Repaired',
                'A fault adjustment cannot reach — Module 4 Section 3’s hysteresis, for instance',
                'What was found, what was done, and re-verification afterwards',
              ],
              [
                'Replaced',
                'Beyond economic repair, or repeatedly failing',
                'The failure history that justified it, and the new instrument’s details',
              ],
              [
                'Restricted',
                'Cannot meet the required tolerance but is usable on a looser duty',
                'The limitation, explicitly, so nobody assumes full capability',
              ],
              [
                'Referred',
                '🔴 The tolerance cannot be resolved by the standard available',
                'Why it could not be adjudicated — this is a finding, not a failure to complete',
              ],
            ]}
            notes="The first row is the commonest and the one people are least comfortable recording, because it looks like nothing happened."
          />
          <p>
            The last row deserves attention because it feels like an admission.{' '}
            <strong>
              Being unable to adjudicate a tolerance with the equipment available is a real
              engineering finding
            </strong>
            , and recording it honestly is more valuable than a pass that the standard could not
            actually support.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Labels, and what they do not say"
          plainEnglish="A sticker records that something happened on a date. It is not a statement about today."
          onSite="Useful for finding overdue instruments at a glance. Not evidence that a reading is right."
        >
          <p>
            Instruments commonly carry a calibration label showing when they were last calibrated
            and when they are next due. It is a practical device &mdash; it makes an overdue
            instrument visible without opening a database.
          </p>
          <p>What it asserts is narrow, and worth being precise about:</p>
          <ul>
            <li>
              <strong>It says</strong> this instrument was compared against a standard on that date,
              and left in the condition the record describes.
            </li>
            <li>
              <strong>It does not say</strong> the instrument is reading correctly now. Section
              1&rsquo;s point stands &mdash; a certificate describes the instrument, and the
              installation sits outside it.
            </li>
            <li>
              <strong>It does not say</strong> the instrument is suitable for the duty. Suitability
              is the tolerance question from earlier in this section.
            </li>
            <li>
              <strong>It cannot say</strong> anything about drift since. Module 1 Section 4 put it
              plainly: a sticker is not proof that a reading is right.
            </li>
          </ul>
          <p>
            A label is therefore best read as a prompt rather than an assurance &mdash; it tells you
            whether to expect a valid record to exist, and the record is where the meaning is.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-6-4-outcome"
          question="An instrument cannot meet the tolerance it has been given, but comfortably meets a looser one and the duty may not need the tighter figure. What is the right outcome?"
          options={[
            'Adjust it as close as possible and pass it',
            'Record the limitation explicitly and refer the tolerance question, so a decision is made rather than assumed',
            'Fail it and replace the instrument',
            'Pass it against the looser tolerance without comment',
          ]}
          correctIndex={1}
          explanation="Two of the wrong answers quietly decide something that is not the technician's to decide. Whether the duty needs the tighter figure is a question for whoever set the tolerance, and the honest outcome is to state what the instrument can and cannot do and let that decision be made properly."
        />

        <Scenario
          title="A flow meter 4 per cent low, found at its annual check"
          situation={
            <>
              <p>
                A flow meter used to record material transferred between two parts of a site is
                found 4 per cent low at its annual calibration. The as-found readings were taken
                properly before any adjustment. Last year&rsquo;s as-left record shows it within
                tolerance.
              </p>
              <p>
                The technician adjusts it, records both sets of values, and is about to close the
                job.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                The calibration work is complete and the job is not. A 4 per cent error on a meter
                used for recording transferred quantities means{' '}
                <strong>
                  every quantity recorded through it since the last calibration is potentially 4 per
                  cent understated
                </strong>
                , and over a year that is unlikely to be trivial.
              </p>
              <p>
                Raise it explicitly rather than leaving it in the numbers. The information that
                needs passing on is: how far out, in which direction, over what maximum period, and
                on what measurement.
              </p>
              <p>
                Direction matters here and is easy to state carelessly. The meter read <em>low</em>,
                so recorded quantities are lower than actual &mdash; whoever assesses the impact
                needs that the right way round, and Module 4 Section 5&rsquo;s insistence on the
                sign of an error is exactly why it was recorded.
              </p>
              <p>
                What the technician should not do is decide whether it matters. That depends on how
                the figures were used, what tolerance the receiving process works to, and whether
                anything was reconciled against another measurement &mdash; questions for the people
                who own the data, provided somebody tells them.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Everything technical was done correctly, and the finding would still have gone
                nowhere if the record had been filed without a word. The as-found data existed, the
                verdict was recorded, and neither is any use if nobody who can act on it is told.
              </p>
              <p>
                It also shows why the as-found discipline pays off at exactly the moment it matters.
                Had the meter been adjusted first, the conversation would have been &ldquo;it was
                out by some amount, we think&rdquo; &mdash; which is not something anybody can
                assess.
              </p>
            </>
          }
        />

        <FAQ
          items={[
            {
              question: 'Who decides the tolerance for a given instrument?',
              answer:
                'It should be a documented decision made by whoever understands what the measurement is used for — typically process or operations engineering rather than the technician performing the calibration. In practice tolerances are often inherited without anyone remembering their basis, which is worth questioning when one seems unreasonably tight or loose. A tolerance nobody can justify is a good candidate for review.',
            },
            {
              question: 'Does every out-of-tolerance finding need an impact assessment?',
              answer:
                'The principle applies to all of them and the depth should be proportionate. An instrument marginally outside a tolerance that was itself conservative, on a measurement used only for indication, may need no more than a note. A significant error on a measurement used for quality, accounting or safety decisions is a different matter. The judgement is about consequence, and the technician’s job is to supply the facts that let someone make it.',
            },
            {
              question: 'What if the previous calibration record is missing?',
              answer:
                'Then the period in question is open-ended, which makes the finding more serious rather than less. Without a last known-good state there is no boundary on how long the instrument may have been wrong. It is worth recording that explicitly rather than quietly treating the current calibration as a fresh start, because the absence of a record is itself the finding.',
            },
            {
              question: 'Is “found within tolerance” worth recording in detail?',
              answer:
                'Yes, and it is the most commonly under-recorded outcome because it feels like nothing happened. The as-found values from a passing calibration are exactly what builds the drift history Module 4 Section 5 described — several years of small, in-tolerance errors moving consistently in one direction is a prediction of when the instrument will fail, and it is only visible if the passing results were written down properly.',
            },
            {
              question: 'Should an instrument be adjusted if it is within tolerance but drifting?',
              answer:
                'Usually not, and the reason is that adjusting resets the evidence. An instrument inside tolerance is doing its job, and correcting it removes the accumulated drift signal that would have shown when it was going to need attention. The better response is to note the trend and let the interval decision account for it, which Section 5 covers. There are exceptions where a known upcoming demand justifies pre-emptive adjustment, and they should be recorded as deliberate.',
            },
            {
              question: 'What if I disagree with a tolerance I have been given?',
              answer:
                'Say so, with the reason, before performing the calibration rather than after failing something against it. The two arguments worth making are the ones in this section: a tolerance tighter than the standard can resolve cannot produce a meaningful verdict, and a tolerance far tighter than the duty requires generates work and findings with no benefit. Both are technical points rather than opinions, and both are easier to raise beforehand.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Module 4 Section 5 owns as-found and drift; Module 1 Section 4 owns reading a certificate. This section owns the verdict.',
            'A record needs what was measured, what was permitted, and what was concluded. The middle one is most often missing.',
            '🔴 A tolerance comes from what the process needs, not from the manufacturer’s accuracy specification.',
            'Capability and requirement are different questions — identical hardware on different duties warrants different tolerances.',
            'Too tight and you adjust instruments that were fine; too loose and a record certifies readings that are not fit for use.',
            'A tolerance approaching the standard’s own uncertainty cannot be adjudicated — that is a reason to escalate, not to press on.',
            '🔴 An instrument found out of tolerance makes every reading since its last calibration of unknown reliability.',
            'A calibration measures a state, not a history, so it cannot say when the drift happened.',
            'If the instrument fed a control loop, the controller was acting on the false value with every trend looking normal.',
            '🔴 As-found is the only evidence of what the instrument was doing in service, and it exists for minutes before the first adjustment.',
            'Adjusting first does not lose a number — it makes a year of plant operation unassessable.',
            'An impact assessment asks how far out, in which direction, what the readings were used for, and over what period.',
            'Raising a significant failure is part of the job — the person holding the as-found numbers is the only one who knows.',
            'A calibration can end six ways: left alone, adjusted, repaired, replaced, restricted or referred.',
            'Found within tolerance and left alone is a complete job, and its as-found data is what builds the drift history.',
            'A calibration label states that a comparison happened on a date. It is not evidence that a reading is right today.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 6.4" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-6-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Calibration procedures
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-6-section-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Calibration intervals
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule6Section4;
