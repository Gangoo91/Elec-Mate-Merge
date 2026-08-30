/**
 * Module 8 · Section 2 — Reading the symptom
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar.
 *
 * 🔴 POSITIONING — grepped BEFORE writing. This is a TRIAGE page and the risk
 * is that it degenerates into a list of pointers to other sections. It must
 * carry its own ideas. What it must NOT re-teach:
 *   M3.1 — NAMUR LEVELS AND THEIR VALUES. Owns them outright: 3.6–3.8 mA =
 *          detected failure low, ≤3.6 = failed low, working band 3.8 to <21,
 *          ≥21.0 = failed high. QUOTE NO VALUES HERE. Reference only.
 *   M3.2 — the live zero and WHY it exists. Verified line 124: "with no live
 *          zero there is no electrical difference between the measurement
 *          really being at the bottom of range and the cable being cut."
 *          This page owns USING that as the first triage step. Clean split.
 *   M4.3 — zero shift / span shift / linearity / hysteresis (89 mentions).
 *          Owns the error signatures across a range. Reference, never repeat.
 *   M5.4 — CONTROL faults: oscillation, windup, stiction, phase (57). Wholly
 *          different domain — a loop misbehaving with every instrument sound.
 *   M7.3 — saturation and the loop budget.   M7.6 — transposition, range
 *          mismatch.   M7.7 — leakage reading low.   M2.3 — impulse lines (26).
 *   M3.5 — noise and its two coupling mechanisms.
 *
 * 🔴 THE ORGANISING IDEA, and it finally NAMES the theme running through the
 * whole course: symptoms sort onto an OBVIOUS ↔ PLAUSIBLE axis.
 *   A signal driven OUTSIDE the valid range announces itself — alarms fire,
 *   nobody trusts it, it gets fixed. That is a GOOD fault.
 *   A signal that stays INSIDE the valid range while being wrong is the
 *   dangerous one, because control acts on it and nobody questions it.
 * So the worst faults produce the mildest symptoms. That inversion is the page.
 *
 * 🔴 THE METHOD — three questions that partition the fault space before you
 * touch anything, each routing to a different owner:
 *   1. Is the signal VALID or INVALID?     (live zero + NAMUR → M3.1/M3.2)
 *   2. Does it MOVE, or is it static?      (frozen plausible reading)
 *   3. Wrong EVERYWHERE or wrong SOMEWHERE? (→ M4.3 signatures, M7.3 saturation)
 *
 * 🔴 THE ORIGINAL DIAGNOSTIC, verified as uncovered (2 incidental hits across
 * Modules 1-7): A REAL PROCESS IS NEVER PERFECTLY STILL. A genuine measurement
 * carries small movement. A reading that is TOO STEADY is suspicious — that is
 * the tell for a blocked impulse line, a sensor holding its last value, or
 * stale digital data. Suspicious stillness. Nothing else in the course says it.
 *
 * ⚠️ CC BY source — shingle-scanned to ZERO 9-word overlaps. Keep it that way.
 * ⚠️ Do NOT quote NAMUR current values here — M3.1 owns them and repeating
 * them invites the two pages drifting apart.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §13.7 (troubleshooting current loops; a dead transmitter draws no current).
 * The triage framing and the suspicious-stillness diagnostic are derived from
 * material already established in Modules 2, 3, 4 and 7 rather than lifted.
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

const TITLE = 'Reading the symptom | Instrumentation Module 8.2 | Elec-Mate';
const DESCRIPTION =
  'What a wrong signal tells you before you touch anything — why an out-of-range fault is the good kind, why a plausible reading is the dangerous one, and the three questions that sort any symptom.';

const outcomes = [
  '🔴 Explain why the worst instrument faults produce the mildest symptoms',
  'Sort a symptom by whether the signal is valid or invalid',
  '🔴 Use the live zero to separate a dead loop from a genuine zero measurement',
  'Say what an out-of-range current is telling you and why that is useful',
  '🔴 Recognise a frozen reading, and say why stillness is suspicious',
  'Distinguish a fault that is wrong everywhere from one wrong only somewhere',
  'Route a symptom to the section that owns its cause',
  'Say why a believable number deserves more suspicion than an absurd one',
];

const quizQuestions = [
  {
    id: 1,
    question: '🔴 Why is a signal driven outside the valid range described as a good fault?',
    options: [
      'It announces itself — alarms fire, nobody trusts the reading, and it gets attended to',
      'It causes less damage to the instrument',
      'It is always caused by something simple',
      'It is easier to repair',
    ],
    correctIndex: 0,
    explanation:
      'The value of an out-of-range signal is that it cannot be mistaken for a measurement. The system rejects it, somebody is told, and no control decision is taken on it. That is the best behaviour a fault can have.',
  },
  {
    id: 2,
    question: '🔴 Which kind of fault is genuinely dangerous?',
    options: [
      'One that drives the signal to zero',
      'One that leaves the signal inside the valid range while being wrong',
      'One that causes the loop to oscillate',
      'One that trips an alarm repeatedly',
    ],
    correctIndex: 1,
    explanation:
      'A wrong value inside the valid range is indistinguishable from a measurement, so control acts on it and operators believe it. The severity of a fault runs opposite to how obvious it is, which is why plausibility deserves more suspicion than absurdity.',
  },
  {
    id: 3,
    question: '🔴 A loop reads 0 mA. What does that separate it from, and why does it matter?',
    options: [
      'Nothing — 0 mA and 4 mA mean the same thing',
      'From a noisy signal, which would vary',
      'From a reading of 4 mA — which would mean the loop is alive and the measurement is at the bottom of its range',
      'From a reading of 20 mA, which would indicate full scale',
    ],
    correctIndex: 2,
    explanation:
      'This is exactly what the live zero was invented to do, as Module 3 Section 2 explains. Zero current means no current is flowing at all — an open circuit, a lost supply or a dead transmitter. Four milliamps means the loop is intact and the process is genuinely at the bottom of range.',
  },
  {
    id: 4,
    question: 'What is the first question to ask about any wrong reading?',
    options: [
      'When was the transmitter last calibrated?',
      'Has anyone worked on it recently?',
      'Which instrument is faulty?',
      'Is the signal a valid one that happens to be wrong, or is it outside the range entirely?',
    ],
    correctIndex: 3,
    explanation:
      'That single question splits the fault space in half before any tool comes out. An invalid signal points at the loop, the supply or a device announcing its own failure; a valid but wrong signal points at the measurement, the ranging or the process connection.',
  },
  {
    id: 5,
    question: '🔴 Why is a perfectly steady reading suspicious?',
    options: [
      'A real process is never perfectly still, so genuine measurements carry small movement',
      'Steady readings mean the transmitter is over-damped',
      'It suggests the range is too wide',
      'Steady readings indicate good control',
    ],
    correctIndex: 0,
    explanation:
      'Live measurements move a little, because processes and their surroundings do. A trace that has gone completely flat is often not reporting a stable process — it is reporting nothing at all, and holding the last value it had.',
  },
  {
    id: 6,
    question: 'What can cause a reading to freeze at a plausible value?',
    options: [
      'An over-tuned controller',
      'A blocked impulse line, a sensor holding its last value, or stale data from a digital link',
      'Excessive loop resistance',
      'A screen earthed at both ends',
    ],
    correctIndex: 1,
    explanation:
      'All three sever the measurement from the process while leaving something believable on the display. The transmitter may be entirely healthy and faithfully reporting a pressure that no longer changes because the path to the process is blocked.',
  },
  {
    id: 7,
    question: 'How do you test whether a static reading is genuine?',
    options: [
      'Increase the sampling rate',
      'Recalibrate the transmitter',
      'Find something that must have changed the measurement, and check whether the reading responded',
      'Compare it with the same loop last week',
    ],
    correctIndex: 2,
    explanation:
      'Stillness alone is only a suspicion. It becomes evidence when you identify a process event that should have moved the reading and it did not — which is a test in the sense Section 1 meant, because either outcome is conclusive.',
  },
  {
    id: 8,
    question:
      'A reading is wrong by the same amount everywhere across the range. What does that suggest?',
    options: [
      'Saturation',
      'A blocked impulse line',
      'A span problem',
      'A zero problem — Module 4 Section 3 covers the signatures',
    ],
    correctIndex: 3,
    explanation:
      'The shape of the error across the range is what names it. An offset that stays constant points at zero; an error growing in proportion points at span; a reading that tracks then flattens points at the loop running out of voltage rather than at calibration at all.',
  },
  {
    id: 9,
    question:
      'A loop tracks correctly at low values then flattens near the top of the range. What is worth suspecting first?',
    options: [
      'The loop budget — the supply cannot drive full-scale current, per Module 7 Section 3',
      'A failed sensor',
      'Interference on the cable',
      'A calibration error',
    ],
    correctIndex: 0,
    explanation:
      'A calibration error would be wrong across the whole range rather than only at the top. Voltage dropped rises with current, so the budget is tightest at full scale — which is why a loop can behave perfectly for most of its range and saturate at the end of it.',
  },
  {
    id: 10,
    question: 'Why does a wrong-but-believable reading deserve more suspicion than an absurd one?',
    options: [
      'Because believable readings are more common',
      'Because nothing else in the system will question it — no alarm, no operator, no controller',
      'Because it indicates a more expensive repair',
      'Because absurd readings are usually test equipment errors',
    ],
    correctIndex: 1,
    explanation:
      'Every safeguard in a control system is built to catch the implausible. A value that sits comfortably inside the expected range passes all of them, so the only thing standing between it and a wrong decision is somebody deciding to doubt it.',
  },
  {
    id: 11,
    question: 'A signal is noisy but its average is correct. Where does that belong?',
    options: [
      'It indicates a failing transmitter',
      'It is a calibration fault',
      'Module 3 Section 5 — coupling and screening, which is a signal-integrity problem rather than a measurement one',
      'It is a control tuning problem',
    ],
    correctIndex: 2,
    explanation:
      'Noise arriving on a correct average is interference added to a sound measurement, which is a different fault class from a measurement that is wrong. Knowing which of the two you have decides whether you look at screening and routing or at the instrument.',
  },
  {
    id: 12,
    question:
      'A loop behaves erratically, and every instrument in it tests correct. What should you consider?',
    options: [
      'That the test equipment is faulty',
      'That the loop needs recalibrating',
      'That the cable must be replaced',
      'That the fault is intermittent, or that the problem is control rather than measurement',
    ],
    correctIndex: 3,
    explanation:
      'Two live possibilities remain. The fault may be present only sometimes, which Section 3 covers; or every instrument may be working perfectly in an arrangement that misbehaves, which is the control-fault domain Module 5 Section 4 owns.',
  },
];

const InstrumentationModule8Section2 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 8 · Section 2"
        title="Reading the symptom"
        backTo="/electrician/upskilling/instrumentation-module-8"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The reading has already told you a great deal. Most of it can be extracted before anybody
          opens a cabinet.
        </p>

        <TLDR
          points={[
            'Section 1 gave the method. This is what to do with the symptom before the first test.',
            '🔴 Symptoms sort onto one axis: obvious or plausible.',
            'An out-of-range signal announces itself — alarms fire, nobody trusts it, it gets fixed. That is a GOOD fault.',
            '🔴 A wrong signal that stays inside the valid range is the dangerous one, because everything believes it.',
            '🔴 So the worst faults produce the mildest symptoms. Severity runs opposite to obviousness.',
            'Three questions sort any symptom before you touch anything.',
            '1. Is the signal valid, or outside the range entirely?',
            '🔴 Zero current is not four milliamps — that distinction is the whole reason the live zero exists.',
            '2. Does it move, or is it static?',
            '🔴 A real process is never perfectly still, so a completely flat trace is suspicious rather than reassuring.',
            'A frozen plausible reading means a blocked impulse line, a sensor holding its last value, or stale data.',
            '3. Is it wrong everywhere, or only somewhere in the range?',
            'Wrong by a constant amount, wrong in proportion, or right then flat — each names a different cause.',
            'Each answer routes to the section that owns it. The triage is the work; the sections are the destinations.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>🔴 The axis that matters</ContentEyebrow>

        <ConceptBlock
          title="The worst faults produce the mildest symptoms"
          plainEnglish="A reading that is obviously wrong gets fixed. A reading that is quietly wrong gets believed."
          onSite="This inverts the instinct that a dramatic symptom means a serious problem."
        >
          <p>
            Before sorting symptoms by cause, they are worth sorting by something more useful, and
            it is a single axis: <strong>does the fault announce itself, or does it hide?</strong>
          </p>
          <p>
            A signal driven <strong>outside the valid range</strong> cannot be mistaken for a
            measurement. The receiving system rejects it, an alarm is raised, an operator is told,
            and no control decision is taken on the strength of it. Module 3 Section 1 covers how
            the standards deliberately assign meaning to out-of-range currents so that a transmitter
            can report its own failure rather than merely producing nonsense.
          </p>
          <p>
            🔴 That makes it, from a diagnostic point of view, <strong>a good fault</strong>. It is
            loud, it is unambiguous, and the system has already protected itself before anybody
            arrives.
          </p>
          <p>
            Now the other kind. A fault that leaves the signal{' '}
            <strong>inside the valid range while being wrong</strong> has none of those properties:
          </p>
          <ul>
            <li>
              <strong>No alarm is raised</strong>, because the value is within the range alarms are
              set to accept.
            </li>
            <li>
              <strong>The controller acts on it</strong>, because it has no way to know it is not a
              measurement.
            </li>
            <li>
              <strong>Operators believe it</strong>, because it is exactly what a working instrument
              would produce.
            </li>
          </ul>
          <p>
            🔴 So the relationship most people assume is inverted.{' '}
            <strong>
              The severity of an instrument fault runs opposite to how obvious its symptom is.
            </strong>{' '}
            A dead loop stops a process for an hour. A loop reading four per cent low for six months
            makes every decision taken on it slightly wrong, and nobody ever knows.
          </p>
          <p>
            This is not a new idea in the course so much as the naming of one that has run through
            it: the transposed loops of Module 7 Section 6, where every reading was perfect and
            attached to the wrong vessel; the barrier earth of Module 7 Section 5, absent with no
            symptom whatever; the cable in Module 7 Section 7 that passed its test and quietly
            spoiled a measurement.
          </p>
          <p>
            The practical consequence is a habit worth carrying:{' '}
            <strong>
              a believable reading deserves more suspicion than an absurd one, not less
            </strong>
            . Everything else in the system is built to catch the absurd.
          </p>
        </ConceptBlock>

        <Pullquote>
          Every safeguard in a control system is designed to catch the implausible. A plausible
          wrong answer walks straight past all of them.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>From report to observation</ContentEyebrow>

        <ConceptBlock
          title="“It's reading wrong” is four different faults"
          plainEnglish="A reported symptom has been compressed. Getting it back to what was actually seen is the first job."
          onSite="Most wasted diagnostic time starts with acting on a summary rather than an observation."
        >
          <p>
            Symptoms usually arrive second-hand, and they arrive compressed. &ldquo;The level is
            reading wrong&rdquo; is a reasonable thing for an operator to say and it covers at least
            four situations that lead in different directions:{' '}
            <strong>out of range, drifting, noisy, or frozen</strong>.
          </p>
          <p>
            The triage on this page depends on knowing which, so{' '}
            <strong>the first move is usually to go and look rather than to go and test</strong>.
            That is not doubting the operator &mdash; they noticed the fault, which is more than the
            instrument system managed &mdash; it is recovering the detail that a short sentence had
            to drop.
          </p>
          <p>Three questions get most of it back, and none of them needs a tool:</p>
          <ul>
            <li>
              <strong>What does it actually show?</strong> A number and a trend, not a
              characterisation.
            </li>
            <li>
              🔴 <strong>When was it last right?</strong> This is the valuable one, because it
              converts a symptom into an <em>event</em> with a time attached &mdash; and Section 1
              made the general point that something which worked and then did not usually had
              something happen to it.
            </li>
            <li>
              <strong>What else was happening then?</strong> Maintenance nearby, a shutdown, a
              changeover, weather. A correlation in time is a candidate cause for free.
            </li>
          </ul>
          <p>
            &ldquo;It has been like that a while&rdquo; deserves particular attention rather than
            dismissal.{' '}
            <strong>
              A fault that has become normal is one that passed every automatic check the system has
            </strong>
            , which puts it squarely in the dangerous category described above.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Three questions</ContentEyebrow>

        <ConceptBlock
          title="Sorting a symptom before you touch anything"
          plainEnglish="Three questions, asked from the control room, cut the possibilities down before you walk anywhere."
          onSite="Section 1 warned about looking before thinking. This is the thinking."
        >
          <p>
            Section 1 established that gathering a little data early transforms how quickly the rest
            goes. Much of that data is already available on a display, and three questions extract
            most of it.
          </p>
          <AppendixTable
            caption="Triage: three questions and where each answer leads"
            headers={['Question', 'Answer', 'What it points at']}
            rows={[
              [
                '1. Is the signal valid?',
                'No — outside the range',
                'The loop, the supply, or a device reporting its own failure',
              ],
              [
                '',
                'Yes — valid but wrong',
                'The measurement, the ranging, or the process connection',
              ],
              [
                '2. Does it move?',
                'No — completely static',
                '🔴 A severed measurement: blocked line, held value, stale data',
              ],
              ['', 'Yes — but wrongly', 'Continue to question 3'],
              [
                '3. Wrong where?',
                'Everywhere, by a constant amount',
                'A zero problem — Module 4 Section 3',
              ],
              ['', 'Growing across the range', 'A span problem — Module 4 Section 3'],
              [
                '',
                'Right, then flat near the top',
                'Loop budget and saturation — Module 7 Section 3',
              ],
            ]}
            notes="None of this requires a tool. All of it narrows what the first test should be."
          />
          <p>
            The value is not the table but the order. Each question is chosen because{' '}
            <strong>it divides the remaining possibilities roughly in half</strong>, which is the
            same reasoning Section 1 applied to choosing a test: prefer the move that eliminates the
            most.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 Question one — valid or not</ContentEyebrow>

        <ConceptBlock
          title="Zero is not four milliamps"
          plainEnglish="No current at all means the loop is broken. Four milliamps means the loop is fine and the process is at the bottom."
          onSite="This is the single most useful distinction available from a display, and it costs nothing."
        >
          <p>
            Module 3 Section 2 explained why the live zero exists, and the reason is exactly this
            situation.{' '}
            <strong>
              Without it there would be no electrical difference between a measurement genuinely at
              the bottom of its range and a cable that has been cut.
            </strong>
          </p>
          <p>🔴 So the first thing a wrong reading tells you is which of those you have:</p>
          <ul>
            <li>
              <strong>No current flowing at all</strong> means the circuit is not intact. An open
              circuit somewhere in the chain, a lost loop supply, or a transmitter that has stopped
              regulating entirely &mdash; a genuinely dead two-wire transmitter cannot pass the
              current it needs to run itself, so it produces nothing rather than something small.
            </li>
            <li>
              <strong>Current at the bottom of the live range</strong> means the loop is
              electrically healthy and the transmitter is actively reporting a measurement at the
              bottom of its span. That is a completely different investigation &mdash; and it may
              not be a fault at all.
            </li>
          </ul>
          <p>
            Between and beyond those sit the out-of-range diagnostic bands.{' '}
            <strong>
              A compliant transmitter can drive its output deliberately outside the working range to
              report that it has detected its own failure
            </strong>
            , and Module 3 Section 1 gives the specific currents and what each one means. Reading
            them is the cheapest diagnosis available, because the instrument has already done the
            work and is telling you the answer.
          </p>
          <p>
            The practical point for triage:{' '}
            <strong>an out-of-range value is a message, not a malfunction of the signalling</strong>
            . Treating it as noise or as a display error throws away the most direct evidence you
            will get.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-8-2-zero"
          question="A control room display shows a level loop at 0 mA. The operator says the vessel is definitely not empty. What does the current alone tell you?"
          options={[
            'No current is flowing, so the circuit is not intact — this is a loop fault rather than a measurement one',
            'The vessel really is empty and the operator is mistaken',
            'The controller has been left in manual',
            'The transmitter is out of calibration',
          ]}
          correctIndex={0}
          explanation="An empty vessel would produce current at the bottom of the live range, not an absence of current. Zero means nothing is flowing at all, which points at an open circuit, a lost supply or a dead transmitter — and the operator's observation is consistent rather than in conflict."
        />

        <SectionRule />
        <ContentEyebrow>🔴 Question two — suspicious stillness</ContentEyebrow>

        <ConceptBlock
          title="A real process is never perfectly still"
          plainEnglish="Live measurements wobble slightly, because the world does. A completely flat trace is often reporting nothing at all."
          onSite="Stillness looks like good news on a trend, which is exactly why this one survives so long."
        >
          <p>
            The second question is whether the reading moves, and the reasoning behind it is worth
            spelling out because it runs against instinct.
          </p>
          <p>
            🔴{' '}
            <strong>
              A genuine measurement of a real process carries small movement. Processes are not
              perfectly steady, ambient conditions shift, and every measurement chain has some
              variation in it.
            </strong>{' '}
            A trend that shows slight, irregular movement around a value is showing you a live
            measurement.
          </p>
          <p>
            <strong>
              A trend that has gone completely flat may not be reporting stability. It may be
              reporting nothing.
            </strong>
          </p>
          <p>The mechanisms that produce this all sever the measurement from the process:</p>
          <ul>
            <li>
              <strong>A blocked or isolated impulse line.</strong> Module 2 Section 3 covers what
              impulse lines do; if the path to the process is blocked, frozen or valved off, the
              transmitter is perfectly healthy and faithfully measuring a pressure that can no
              longer change.
            </li>
            <li>
              <strong>A sensor or transmitter holding its last value</strong> after an internal
              failure, rather than driving its output to a fault state.
            </li>
            <li>
              <strong>Stale data on a digital link</strong>, where the number on the display is the
              last one successfully received rather than a current one.
            </li>
          </ul>
          <p>
            🔴 All three land squarely in the dangerous category from the first block:{' '}
            <strong>
              the value is inside the valid range, no alarm fires, and control continues to act on
              it
            </strong>
            . An isolating valve left shut after maintenance is a particularly common version, and
            it is not a fault in any instrument at all.
          </p>
          <p>
            Stillness on its own is a suspicion rather than a finding, so it needs converting into a
            test &mdash; and Section 1 gave the shape of one.{' '}
            <strong>
              Identify something that must have changed the measurement, and check whether the
              reading responded.
            </strong>{' '}
            A pump starting, a valve stroking, a batch being added, a vessel filling. If the process
            demonstrably moved and the number did not, the suspicion has become evidence, and either
            outcome of that check is conclusive.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="🔴 Believing a reading because it looks right"
          whatHappens={
            <>
              <p>
                A loop shows a value that is entirely reasonable for that vessel at that time of
                day. Nothing is alarming. The trend is beautifully smooth. There is no reason to
                look at it, so nobody does.
              </p>
              <p>
                The reading has been frozen for a fortnight. An isolating valve on the impulse line
                was closed during a maintenance job and never reopened, and the transmitter has been
                reporting the pressure trapped behind it ever since.
              </p>
              <p>
                🔴 Every check that would normally catch a problem has been passed rather than
                failed.{' '}
                <strong>
                  The value is inside range, so no alarm. It is stable, so no operator concern. The
                  transmitter is healthy, so any calibration check confirms it.
                </strong>{' '}
                The instrument is not faulty — it is measuring exactly what is presented to it.
              </p>
              <p>
                Meanwhile the controller has been acting on a number unconnected to the process for
                two weeks, and the smoothness of the trend — the thing that made it look healthy —
                was the actual symptom all along.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Treat <strong>unnatural steadiness as a symptom in its own right</strong>, and give
                a plausible reading the scrutiny an absurd one would automatically receive.
              </p>
              <ul>
                <li>
                  <strong>Look at the trend, not the number.</strong> A current value tells you
                  nothing about whether it is alive. A few hours of history tells you immediately.
                </li>
                <li>
                  <strong>Compare against something that must correlate.</strong> A level that does
                  not respond to a transfer, a flow reading unchanged while a pump starts, a
                  temperature indifferent to a heater &mdash; correlation with a known event is the
                  cheapest test there is.
                </li>
                <li>
                  <strong>Check the process connection before the instrument.</strong> When a
                  reading is static, the isolating valves and the impulse line deserve looking at
                  first, because a transmitter that is working correctly will pass every test you
                  perform on it.
                </li>
                <li>
                  <strong>Treat maintenance as a suspect.</strong> A measurement that went still
                  shortly after somebody worked nearby has a strong candidate cause, and Section 1
                  made the general point: something that worked and then did not usually had
                  something happen to it.
                </li>
              </ul>
            </>
          }
        />

        <InlineCheck
          id="ins-8-2-frozen"
          question="A flow reading has been perfectly constant for three days on a plant whose output has varied. What is the most useful next step?"
          options={[
            'Recalibrate the flow transmitter',
            'Establish whether the reading responded to a known process change — if it did not, the measurement is severed from the process',
            'Replace the transmitter',
            'Check the loop resistance',
          ]}
          correctIndex={1}
          explanation="Calibrating or replacing the transmitter assumes the instrument is at fault, and a blocked line or a closed isolating valve leaves it entirely healthy. Correlating the reading against a change that must have moved it is the test that distinguishes a genuine measurement from a held one."
        />

        <SectionRule />
        <ContentEyebrow>Question three — wrong where?</ContentEyebrow>

        <ConceptBlock
          title="The shape of the error names the cause"
          plainEnglish="An error that is the same everywhere, one that grows across the range, and one that only appears at the top are three different faults."
          onSite="This is where triage hands over to sections that already cover the detail."
        >
          <p>
            If the signal is valid and it does move, the remaining question is{' '}
            <strong>where across the range it is wrong</strong> &mdash; and the answer usually names
            the fault class without further testing.
          </p>
          <p>
            Module 4 Section 3 owns this in depth, including how zero shift, span shift, linearity
            and hysteresis each look when plotted across a range. What matters for triage is the
            top-level split:
          </p>
          <ul>
            <li>
              <strong>Wrong by the same amount everywhere</strong> points at zero.
            </li>
            <li>
              <strong>Wrong by an amount that grows across the range</strong> points at span.
            </li>
            <li>
              <strong>Correct low down and flattening near the top</strong> is not a calibration
              matter at all &mdash; it is the loop running out of voltage, which Module 7 Section 3
              covers. A calibration error would be wrong throughout.
            </li>
            <li>
              <strong>Wrong only in the middle, correct at both ends</strong> points at two scalings
              that agree at the extremes and disagree between them &mdash; a range mismatch or a
              double square-root extraction, both covered in Module 7 Section 6.
            </li>
          </ul>
          <p>
            🔴 That last one is worth carrying, because it is the one that survives a two-point
            check. An installation verified only at the bottom and top of range will pass while
            being wrong everywhere in between, and the reading it produces is entirely plausible.
          </p>
          <p>
            Two further symptom classes belong elsewhere and are worth recognising so they can be
            routed rather than investigated here:
          </p>
          <ul>
            <li>
              <strong>Noisy but correct on average</strong> is interference added to a sound
              measurement rather than a wrong measurement. Module 3 Section 5 covers the coupling
              mechanisms and their cures.
            </li>
            <li>
              <strong>The loop misbehaving with every instrument correct</strong> &mdash;
              oscillation, overshoot, a value that hunts &mdash; is a control problem rather than a
              measurement one, and Module 5 Section 4 owns it.
            </li>
          </ul>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Several symptoms at once usually means one fault, not several"
          plainEnglish="If two loops go wrong together, look for the thing they share before you look at either of them."
          onSite="Multiple symptoms feel like bad luck. They are usually a clue about where to stand."
        >
          <p>
            Section 1 argued for assuming a single fault until the data says otherwise, and there is
            a case where that assumption looks broken but is not.{' '}
            <strong>
              When several loops develop symptoms at the same time, the likely explanation is still
              one fault &mdash; in something they have in common.
            </strong>
          </p>
          <p>
            The reasoning is the same probability argument. Two loops failing independently within
            the same hour is a coincidence; one shared element failing and affecting both is an
            ordinary event. So simultaneity is not evidence against the single-fault assumption. It
            is a <strong>pointer to where the single fault is</strong>.
          </p>
          <p>What loops share is a short and useful list:</p>
          <ul>
            <li>
              <strong>A loop supply.</strong> Several loops commonly run from one power supply, so
              its failure or sag affects all of them at once.
            </li>
            <li>
              <strong>A marshalling cabinet or terminal strip</strong>, where a single disturbance
              during other work can touch several loops &mdash; Module 7 Section 2 covers what a
              disturbed termination looks like afterwards.
            </li>
            <li>
              <strong>An input card</strong>, whose failure takes out every channel on it.
            </li>
            <li>
              <strong>A cable route or a shared multipair</strong>, where physical damage or water
              ingress affects neighbours together, per Module 7 Section 4.
            </li>
            <li>
              <strong>An earthing point</strong>, which Module 7 Section 4 covers, and where a
              change can affect the noise behaviour of several screens simultaneously.
            </li>
          </ul>
          <p>
            🔴 The practical instruction is to{' '}
            <strong>establish the pattern before investigating any individual loop</strong>. Which
            loops are affected, and which are not? Loops that share a supply and are all affected
            point at the supply. Loops that share a cabinet where only some are affected point at
            something narrower inside it.
          </p>
          <p>
            The loops that are <em>unaffected</em> are as informative as the ones that are, because
            they eliminate everything they share with the failed ones &mdash; which is the same
            reasoning as designing a test that could prove you wrong.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-8-2-common"
          question="Four loops in the same marshalling cabinet all start reading zero within a few minutes of each other. Where should you look first?"
          options={[
            'The four transmitters in turn',
            'What those four loops have in common — a shared supply is the obvious candidate',
            'The controller configuration',
            'The four field cables',
          ]}
          correctIndex={1}
          explanation="Four independent failures within minutes is not a plausible coincidence, whereas one shared element failing and affecting four loops is entirely ordinary. Checking which loops in that cabinet are unaffected narrows it further, because they eliminate everything they share with the failed ones."
        />

        <Scenario
          title="Two loops, two symptoms, opposite urgency"
          situation={
            <>
              <p>
                Two calls arrive in the same hour. On the first, a temperature loop is reading full
                scale and alarming continuously; production have taken the unit off automatic
                control and want it dealt with.
              </p>
              <p>
                On the second, an operator mentions in passing that a pressure reading on another
                vessel &ldquo;looks a bit low but it has been like that a while&rdquo;. There is no
                alarm and the plant is running normally.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                Attend the first, because a unit off automatic control is an operational problem
                that needs resolving. But do not let the noise of it determine which is the more
                serious instrument fault, because on the evidence available it is probably the
                second.
              </p>
              <p>
                <strong>The first loop is behaving well.</strong> The signal is out of range, the
                system has rejected it, the alarm has done its job and nobody is taking decisions on
                a bad number. The reading is above the valid range, which points at the transmitter
                reporting its own failure or at a fault driving it high &mdash; and Module 3 Section
                1 gives the meaning of the specific value. It is loud, it is contained, and it is
                already understood.
              </p>
              <p>
                🔴 <strong>The second is the one with the properties of a dangerous fault</strong>.
                The value is inside the valid range, so nothing has alarmed. It is stable, so nobody
                is concerned. It has been like that a while, so it has become normal. And control
                has been acting on it throughout.
              </p>
              <p>
                &ldquo;A bit low&rdquo; is worth taking seriously as a specific claim rather than an
                impression. It suggests a valid signal that is wrong, which is question three
                territory: is it low by a constant amount, or low in proportion? Is it low
                everywhere, or only in this part of the range? Module 7 Section 7 gives a further
                candidate worth remembering here, since a leakage path on the cable diverts current
                and produces exactly a reading that is low, stable and believable.
              </p>
              <p>
                Before anything else, look at the trend on both. On the second loop it will show
                whether the reading is still alive or has quietly stopped moving &mdash; and that
                single observation decides which investigation you are starting.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                The urgency of a symptom is set by how loudly it presents, and the seriousness of a
                fault is set by how long it can persist unnoticed. Those two run in opposite
                directions, and the calls arrive in the order of the first.
              </p>
              <p>
                Nothing here argues for ignoring the alarming loop. It argues for recognising that
                the passing remark describes the fault class this whole module treats as the
                difficult one, and for not letting it stay a passing remark.
              </p>
            </>
          }
        />

        <FAQ
          items={[
            {
              question: 'Can I diagnose a fault from the symptom alone?',
              answer:
                'Rarely, and that is not what triage is for. What the symptom does is rank the possibilities and choose the first test, which is where most of the time is won or lost — Section 1 covers why an unstructured search is so expensive. Occasionally a symptom is close to conclusive, an out-of-range diagnostic value being the clearest case, because the instrument has effectively told you what is wrong. More often the symptom eliminates most of the fault space and turns a vague problem into two or three candidates worth testing.',
            },
            {
              question: 'What if the symptom is reported rather than observed?',
              answer:
                'Then the first job is to see it yourself, because reported symptoms compress badly. "It is reading wrong" may mean out of range, drifting, noisy or frozen, and those lead to entirely different investigations. It is also worth asking when it was last right, since that converts a symptom into an event with a time attached, and something that changed usually had something done to it. None of this is doubting the operator — they noticed the fault, which is more than the instrument system managed.',
            },
            {
              question: 'Is a noisy signal a fault at all?',
              answer:
                'It depends whether the noise is on the signal or in the process, and distinguishing them is the useful first step. Genuine process variation is information, and damping it away hides something real. Interference coupled onto the cable is added to a measurement that is otherwise correct, and Module 3 Section 5 covers the mechanisms and cures. The clue is usually whether the average is right: interference tends to leave the average intact while process variation moves it, and heavy damping applied to cure the first will also destroy your view of the second.',
            },
            {
              question: 'Why look at a trend rather than the current value?',
              answer:
                'Because a single number cannot tell you whether it is alive. The most dangerous symptom on this page — a plausible reading that has stopped tracking the process — is completely invisible in a current value and completely obvious in a few hours of history. A trend also shows when the behaviour changed, which is often the most valuable single fact in a diagnosis, and it shows the shape of an error over time in the way Module 4 Section 3 shows its shape across a range.',
            },
            {
              question: 'The reading is wrong but the instrument tests correct. What now?',
              answer:
                'That is a genuinely useful result rather than a dead end, because it has eliminated a large category and points at the two things that surround the instrument. Either the measurement is not reaching it — a blocked or isolated impulse line, a sensor no longer in proper contact with what it is meant to measure — or the reading is correct and the process really is doing that, which Section 5 covers. The instrument testing correct is evidence, so the next move is to check what feeds it rather than to test it again more thoroughly.',
            },
            {
              question: 'How do I tell a measurement fault from a control fault?',
              answer:
                'Ask whether any individual signal is wrong. In a measurement fault something is reporting a value that does not match reality, and it can be found by intercepting signals along the chain in the way Section 1 described. In a control fault every instrument is telling the truth and the arrangement still misbehaves — oscillation, overshoot, a value that hunts around setpoint — and no amount of signal interception finds anything, because there is nothing wrong to find. That distinction decides whether you reach for Module 5 Section 4 or continue here.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            '🔴 Symptoms sort onto one axis: does the fault announce itself, or does it hide?',
            'Out of range is a GOOD fault — alarms fire, the system rejects it, no decision is taken on it.',
            '🔴 Valid but wrong is the dangerous one: no alarm, the controller acts on it, operators believe it.',
            '🔴 Severity runs opposite to obviousness. A dead loop costs an hour; a loop 4% low costs six months of decisions.',
            'That names the theme running through the course — transposed loops, missing barrier earths, cable that passed its test.',
            '🔴 A believable reading deserves MORE suspicion than an absurd one. Every safeguard is built to catch the absurd.',
            'Three questions triage a symptom before any tool comes out, each dividing the possibilities roughly in half.',
            '1. Valid or invalid? 🔴 Zero current is not four milliamps — that is exactly why the live zero exists (M3.2).',
            'No current means the circuit is not intact. Bottom-of-range current means a healthy loop reporting a low measurement.',
            'Out-of-range diagnostic values are a message from the instrument, not a signalling malfunction — M3.1 gives them.',
            '2. Does it move? 🔴 A real process is never perfectly still, so a flat trace is suspicious rather than reassuring.',
            'A frozen plausible reading: blocked or isolated impulse line, a sensor holding its last value, or stale digital data.',
            'An isolating valve left shut after maintenance is a common version — and no instrument is faulty at all.',
            'Convert stillness into a test: find something that must have moved the reading, and check whether it did.',
            '3. Wrong where? Constant offset → zero. Growing across range → span. Both M4.3.',
            'Right then flat near the top is saturation, not calibration (M7.3). Wrong only mid-range survives a two-point check (M7.6).',
            'Noisy but correct on average is signal integrity (M3.5). Every instrument correct but the loop misbehaving is control (M5.4).',
            '“It’s reading wrong” covers four different faults — go and look before you go and test.',
            '🔴 “When was it last right?” converts a symptom into an event with a time attached, and a time attached usually finds a cause.',
            '“It’s been like that a while” is not reassurance — it means the fault passed every automatic check the system has.',
            '🔴 Several loops failing together points at ONE fault in something they share, not at several coincidences.',
            'Shared candidates: a loop supply, a marshalling cabinet, an input card, a cable route, an earthing point.',
            'The loops that are UNAFFECTED are as informative as the ones that are — they eliminate everything they share.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 8.2" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-8-section-1')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Systematic fault diagnosis
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-8-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Intermittent faults
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule8Section2;
