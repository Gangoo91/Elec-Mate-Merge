/**
 * Module 6 · Section 3 — Calibration procedures
 *
 * Rewritten 2026-08-30 against the Module 1 Section 1 exemplar.
 *
 * 🔴 POSITIONING. The original outline was "step-by-step calibration of
 * pressure, temperature and electrical devices", which would have been three
 * near-identical procedure lists. Module 6 Section 2 already covers what kit
 * each instrument type needs, so the device-by-device split adds nothing.
 * Module 4 Section 3 owns the error types and the up-down test. This page
 * therefore owns the PROCEDURE itself and the one thing that genuinely changes
 * it:
 *
 *   🔴 ANALOGUE zero and span INTERACT — moving span shifts the zero point, so
 *      the procedure must ITERATE ("repeat as necessary").
 *   🔴 DIGITAL low and high trims are NON-INTERACTIVE — apply each stimulus
 *      ONCE. Iterating is wasted effort and reveals a misunderstanding.
 *
 * That single distinction restructures the whole job, and it is the reason a
 * technician trained on analogue instruments over-works a digital one.
 *
 * 🔴 SECOND KEY IDEA — the output trim is BACKWARDS from what people expect.
 * The instrument drives a nominal output, YOU measure what actually came out,
 * and you TELL THE INSTRUMENT what you measured. You are not adjusting it to a
 * target; you are informing it of its own error so it can correct itself.
 *
 * 🔴 THIRD — the linearity adjustment. The source is emphatic: move it only if
 * absolutely necessary, because it is very sensitive and prone to
 * over-adjustment. Better to split the error between the ends using zero and
 * span. Excellent CommonMistake material.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §18.7 (input and output standards required), §18.7.1 (the zero-and-span
 * method and its iteration; five-point and 10/25/50/75/90 variants; up-down
 * tests; the linearity-adjustment warning; the four-step sensor trim and
 * six-step output trim, and their non-interactive nature) and §18.7.3
 * (discrete instruments — set-point and deadband adjustments).
 * Extracted to scratchpad/src/m6_procedures.txt.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Calibration procedures | Instrumentation Module 6.3 | Elec-Mate';
const DESCRIPTION =
  'How a calibration is actually carried out — why analogue zero and span adjustments interact and digital trims do not, what a five-point check establishes, why the output trim works backwards from expectation, and why the linearity adjustment should almost never be touched.';

const outcomes = [
  'State what both standards a calibration needs are for',
  '🔴 Explain why an analogue zero-and-span calibration must be iterated',
  '🔴 Explain why a digital trim does not need iterating',
  'Carry out a five-point check and say what each point establishes',
  'Say why some procedures adjust at 0 and 100 per cent but check at 10 and 90',
  '🔴 Describe the output trim procedure and why you enter what you measured',
  '🔴 Say why the linearity adjustment should almost never be moved',
  'Calibrate a discrete instrument, and say what a deadband adjustment does',
];

const quizQuestions = [
  {
    id: 1,
    question: 'A calibration requires two standards. What are they for?',
    options: [
      'One to establish a known input, and one to measure the output accurately',
      'One for zero and one for span',
      'One as a primary and one as a backup',
      'One for the instrument and one for the calibrator',
    ],
    correctIndex: 0,
    explanation:
      'Calibration compares input against output, so both ends must be trusted. Applying a known pressure is useless if the milliamp reading you compare it against is unreliable. Section 2 covered the equipment for each half.',
  },
  {
    id: 2,
    question:
      '🔴 Why does the zero-and-span procedure on an analogue instrument say “repeat as necessary”?',
    options: [
      'Because the instrument needs time to warm up',
      'Because the two adjustments interact — moving span disturbs the zero point, so both must be converged on',
      'Because the standard drifts during the procedure',
      'To confirm repeatability',
    ],
    correctIndex: 1,
    explanation:
      'On an analogue instrument the zero and span adjustments are not independent. Setting span at the top of the range moves the response at the bottom, so you return to zero, correct it, and go round again until both ends are right together.',
  },
  {
    id: 3,
    question: '🔴 Why does a digital sensor trim not need the same iteration?',
    options: [
      'Because digital instruments have no zero adjustment',
      'Because digital instruments are more accurate',
      'Because the two trim points do not disturb one another, so each stimulus is applied once',
      'Because the trim is performed automatically',
    ],
    correctIndex: 2,
    explanation:
      'Correcting the high end of a digital instrument leaves the low end untouched, so one pass at each is the whole job. Going round again out of habit is time spent confirming what the design already guarantees.',
  },
  {
    id: 4,
    question: 'What does a five-point calibration check that a two-point check does not?',
    options: [
      'The instrument’s repeatability',
      'The condition of the wiring',
      'The instrument’s response time',
      'Whether the response is a straight line between the ends — linearity and characterisation errors',
    ],
    correctIndex: 3,
    explanation:
      'Module 4 Section 3 showed that a linearity error can be zero at both ends and largest in the middle, so a two-point check passes it cleanly. Intermediate points are the only way that shape becomes visible.',
  },
  {
    id: 5,
    question:
      'Some procedures adjust zero and span at 0 and 100 per cent but take readings at 10, 25, 50, 75 and 90 per cent. Why check inside the ends?',
    options: [
      'To confirm the response between the adjusted points, where nothing was set and error can hide',
      'To save time',
      'Because the standard cannot reach 0 and 100 per cent',
      'Because instruments are less accurate at the extremes',
    ],
    correctIndex: 0,
    explanation:
      'The adjustment points are guaranteed correct because you just set them. The interesting question is what the instrument does everywhere else, so the check points are placed where no adjustment has forced agreement.',
  },
  {
    id: 6,
    question: '🔴 In an output trim, what do you enter when the instrument prompts you?',
    options: [
      'The value the output should be',
      'The value you actually measured with a precision milliammeter',
      'The range of the instrument',
      'The tolerance being worked to',
    ],
    correctIndex: 1,
    explanation:
      'You are telling the instrument what it really did, not what it ought to do. It drives a nominal output, you measure the truth, you report that truth back, and the instrument corrects itself against it. Entering the ideal value teaches it nothing.',
  },
  {
    id: 7,
    question: '🔴 When should a linearity adjustment be moved?',
    options: [
      'Before adjusting zero and span',
      'At every calibration, to keep the response straight',
      'Only when the instrument cannot be brought inside its specification by zero and span alone',
      'Whenever the mid-point reads high',
    ],
    correctIndex: 2,
    explanation:
      'Linearity adjustments are typically very sensitive and easily over-adjusted. The better approach is to bias zero and span so the error is shared between the two ends, halving the mid-range departure and leaving linearity untouched unless the specification cannot be met any other way.',
  },
  {
    id: 8,
    question: 'What does a deadband adjustment on a pressure switch do?',
    options: [
      'Limits the maximum pressure the switch will tolerate',
      'Sets the switch’s response time',
      'Sets the pressure at which the switch operates',
      'Sets how far the pressure must travel back before the switch changes state again',
    ],
    correctIndex: 3,
    explanation:
      'The set-point decides where it trips; the deadband decides how far the process must recover before it resets. A compressor switch set to start at 6 bar with a 1 bar deadband will not stop again until 7 bar, which is what stops it chattering around the trip point.',
  },
];

const InstrumentationModule6Section3 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 6 · Section 3"
        title="Calibration procedures"
        backTo="/electrician/upskilling/instrumentation-module-6"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The steps are not a ritual. Each one exists for a reason — and the reason changes
          completely between an analogue instrument and a digital one.
        </p>

        <TLDR
          points={[
            'A calibration needs two standards: one to apply a known input, one to measure the output honestly.',
            '🔴 On an analogue instrument, zero and span INTERACT — setting span disturbs the zero point.',
            '🔴 So the analogue procedure iterates: zero, span, back to zero, until both ends are right together.',
            '🔴 On a digital instrument the low and high trims are NON-INTERACTIVE, so each stimulus is applied once.',
            'A technician trained on analogue kit will over-work a digital one out of habit, and it achieves nothing.',
            'Five points — 0, 25, 50, 75, 100 per cent — because a two-point check passes exactly the errors that hide in the middle.',
            'Some procedures adjust at 0 and 100 and check at 10, 25, 50, 75 and 90, so the check points are where nothing was forced to agree.',
            '🔴 The output trim runs backwards from expectation: the instrument drives a nominal value, you measure the truth, and you tell it what you measured.',
            '🔴 The linearity adjustment should almost never be touched — it is very sensitive and easily over-adjusted.',
            'Better to split the error between the ends with zero and span and leave linearity alone.',
            'Once a digital transmitter is trimmed, it can be ranged and re-ranged freely without re-trimming.',
            'Discrete instruments have a set-point and often a deadband — where it trips, and how far back it must come to reset.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>What every calibration needs</ContentEyebrow>

        <ConceptBlock
          title="Two standards, one at each end"
          plainEnglish="You have to know what you put in and you have to know what came out. Trusting only one half tells you nothing."
          onSite="Section 2 covered the equipment. This is why both halves are needed at once."
        >
          <p>
            Section 1 established that calibration means subjecting an instrument to known inputs
            while observing the corresponding outputs. That requires{' '}
            <strong>trusted standards at both ends</strong>:
          </p>
          <ul>
            <li>
              <strong>An input standard</strong> to establish the known condition &mdash; a
              precision test gauge alongside a hand pump, a dry block, a resistance source.
            </li>
            <li>
              <strong>An output standard</strong> to measure the response honestly &mdash; usually a
              precision milliammeter reading the loop current.
            </li>
          </ul>
          <p>
            Both matter equally, and it is the second that gets taken for granted.{' '}
            <strong>
              Applying a beautifully known pressure and then reading the output on an unreliable
              meter establishes nothing
            </strong>
            &mdash; the comparison is only as good as its weaker half, which is Module 1 Section
            4&rsquo;s point about the chain arriving at a bench.
          </p>
          <p>
            One genuine exception is worth knowing. Where an instrument&rsquo;s output is{' '}
            <strong>digital</strong> rather than analogue, that output does not need comparing
            against a standard, because a digital number does not drift. The input side still does
            &mdash; a digital pressure transmitter must still have a known pressure applied, because
            the analogue-to-digital conversion at the front is exactly what can go wrong.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 Analogue — the adjustments fight each other</ContentEyebrow>

        <ConceptBlock
          title="The zero-and-span method, and why it loops"
          plainEnglish="Set the bottom, set the top, then go back and check the bottom again — because setting the top moved it."
          onSite="If you find yourself going round three or four times, that is the procedure working, not you failing."
        >
          <p>
            The standard procedure for an analogue linear instrument is the{' '}
            <strong>zero-and-span method</strong>:
          </p>
          <ol>
            <li>Apply the lower-range value and wait for the reading to stabilise.</li>
            <li>
              Move the <strong>zero</strong> adjustment until it registers correctly.
            </li>
            <li>Apply the upper-range value and wait for it to stabilise.</li>
            <li>
              Move the <strong>span</strong> adjustment until it registers correctly.
            </li>
            <li>
              <strong>Repeat as necessary</strong> until both ends are accurate together.
            </li>
          </ol>
          <p>
            That last step is the one that matters, and it is not a hedge.{' '}
            <strong>
              On an analogue instrument, zero and span are not independent adjustments.
            </strong>{' '}
            Module 4 Section 3 gave the reason in the algebra: the response is y = mx + b, and the
            span adjustment changes <em>m</em> &mdash; the slope. Changing a slope pivots the line,
            which moves where it crosses at the bottom.
          </p>
          <p>
            So having set the top correctly, the bottom is no longer where you left it. You return,
            correct it, and setting the bottom slightly disturbs the top in turn. Each pass gets
            closer, and after two or three the two ends agree.
          </p>
          <p>
            This is why the analogue procedure is genuinely a loop and not a checklist. Anyone
            expecting to set two adjustments once and walk away will produce an instrument that is
            right at one end.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Digital — the trims do not interact"
          plainEnglish="Apply the low input, press low trim. Apply the high input, press high trim. Done. There is no going round again."
          onSite="This is where habit costs time. A technician trained on analogue kit iterates out of instinct and gains nothing."
        >
          <p>
            The equivalent operation on a smart digital transmitter is the{' '}
            <strong>sensor trim</strong>, and its procedure is shorter for a structural reason:
          </p>
          <ol>
            <li>Apply the lower-range value and wait for it to stabilise.</li>
            <li>
              Execute the <strong>low sensor trim</strong> function.
            </li>
            <li>Apply the upper-range value and wait for it to stabilise.</li>
            <li>
              Execute the <strong>high sensor trim</strong> function.
            </li>
          </ol>
          <p>
            No step five.{' '}
            <strong>The two trim points in a digital instrument do not disturb one another</strong>
            &mdash; correcting the high end leaves the low end exactly where it was. One pass at
            each, and the job is finished.
          </p>
          <p>
            The reason is that the instrument is not moving a physical linkage that pivots. It is
            recording two correspondences in memory &mdash; at this input the sensor reads this
            &mdash; and the two records do not affect one another.
          </p>
          <p>
            🔴 The practical consequence is a habit worth unlearning. Somebody who came up on
            analogue instruments will iterate automatically, applying each pressure two or three
            times, because that is what the job has always required.{' '}
            <strong>
              On a digital instrument that is not thoroughness &mdash; it is time spent confirming
              something the design already guarantees.
            </strong>
          </p>
        </ConceptBlock>

        <Pullquote>
          The analogue procedure loops because the adjustments fight each other. The digital
          procedure does not, because they do not. Everything else about the two jobs follows from
          that one difference.
        </Pullquote>

        <InlineCheck
          id="ins-6-3-iterate"
          question="A technician sets zero on an analogue transmitter, then span, and finds the zero is now out. What has happened?"
          options={[
            'The span adjustment changed the slope, which moved where the line crosses at the bottom — this is expected and the procedure continues',
            'The standard has drifted',
            'The zero adjustment was set incorrectly',
            'The instrument is faulty',
          ]}
          correctIndex={0}
          explanation="Nothing is wrong. Zero and span interact on an analogue instrument, so setting one disturbs the other. That is precisely why the procedure says repeat as necessary — two or three passes converge on both ends being right together."
        />

        <SectionRule />
        <ContentEyebrow>How many points, and where</ContentEyebrow>

        <ConceptBlock
          title="Five points, and why not two"
          plainEnglish="Checking only the ends tests the two places you just adjusted. The interesting behaviour is everywhere else."
          onSite="0, 25, 50, 75 and 100 per cent is the common pattern. Add the downward direction and the same points reveal hysteresis."
        >
          <p>
            The crude version of the zero-and-span method checks two points. An improvement is the{' '}
            <strong>five-point calibration</strong>, checking at 0, 25, 50, 75 and 100 per cent of
            range.
          </p>
          <p>
            Module 4 Section 3 gave the reason and it is worth restating as a procedural
            justification rather than a theoretical one.{' '}
            <strong>
              A linearity error is zero at both ends and largest in the middle, so a two-point check
              passes it perfectly
            </strong>
            &mdash; and so does a double square-root characterisation error, which Module 3 Section
            4 showed reads high everywhere except at 0 and 100 per cent.
          </p>
          <p>
            The intermediate points are the only place those errors are visible at all. The two
            endpoints are, in a sense, the least informative readings you can take, because you have
            just adjusted the instrument to agree at exactly those values.
          </p>
          <p>
            That observation leads to a variation worth recognising:{' '}
            <strong>
              adjust zero and span at 0 and 100 per cent, but take the check readings at 10, 25, 50,
              75 and 90 per cent
            </strong>
            . Every check point is then somewhere no adjustment has forced agreement, which makes
            the check a genuinely independent test of the response rather than a confirmation of
            what you just set.
          </p>
          <p>
            And whichever points are chosen, running them{' '}
            <strong>downwards as well as upwards</strong> is what reveals hysteresis. Module 4
            Section 3 worked that through with a full up-down table; the point here is that it costs
            one extra pass and is the only way that particular fault becomes visible.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>🔴 The output trim runs backwards</ContentEyebrow>

        <ConceptBlock
          title="You tell the instrument what it did, not what it should do"
          plainEnglish="It sends what it believes is 4 mA. You measure what actually came out. You type that number in. Now it knows its own error."
          onSite="The step people get wrong is entering the ideal value instead of the measured one. That teaches the instrument nothing."
        >
          <p>
            Section 1 introduced the output trim as the correction for the back end of a
            transmitter. Its procedure is longer than the sensor trim and, more importantly, it
            works in a direction most people do not expect:
          </p>
          <ol>
            <li>
              Execute the <strong>low output trim</strong> test function.
            </li>
            <li>
              Measure the output signal with a precision milliammeter, and note the value once it
              stabilises.
            </li>
            <li>
              <strong>Enter that measured value</strong> when the instrument prompts you.
            </li>
            <li>
              Execute the <strong>high output trim</strong> test function.
            </li>
            <li>Measure the output signal again and note it.</li>
            <li>Enter that measured value.</li>
          </ol>
          <p>
            Read step three carefully, because it is the whole point.{' '}
            <strong>
              You are not adjusting the output until it reaches a target. You are reporting to the
              instrument what its output actually was, so it can work out its own error and correct
              for it.
            </strong>
          </p>
          <p>
            The instrument commanded what it believed was 4 mA. Your meter says 3.97 mA arrived. By
            telling it 3.97, you have given it the one piece of information it could not obtain
            alone &mdash; it has no way to measure its own terminals. From that it derives the
            correction.
          </p>
          <p>
            🔴 Entering the ideal value instead &mdash; typing 4.00 because that is what it should
            be &mdash; is the classic error. It tells the instrument that everything is already
            perfect, so it applies no correction and the fault remains, now with a completed
            procedure behind it.
          </p>
          <p>
            One consequence closes the loop with Section 1.{' '}
            <strong>
              Once both trims are done, the transmitter may be ranged and re-ranged as often as
              wanted without any need to re-trim.
            </strong>{' '}
            The only reason to trim again is drift over time.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-6-3-outputtrim"
          question="During a high output trim the instrument commands 20 mA and your meter reads 20.06 mA. What do you enter?"
          options={['20.00', '20.06', '−0.06', '19.94']}
          correctIndex={1}
          explanation="Enter what you measured — 20.06. The instrument knows what it intended; what it cannot know is what actually left its terminals. Telling it the truth is how it calculates its own correction. Entering 20.00 would assert that it was already right and leave the error in place."
        />

        <CommonMistake
          title="🔴 Reaching for the linearity adjustment"
          whatHappens={
            <>
              <p>
                A five-point check shows the ends correct and the middle reading high. There is a
                linearity adjustment on the instrument, the fault is a linearity error, so the
                adjustment gets moved.
              </p>
              <p>
                Linearity adjustments are typically{' '}
                <strong>very sensitive and highly prone to over-adjustment</strong>. A small
                movement produces a large change, the mid-point overshoots the other way, it gets
                moved back, and the instrument ends up further from correct than it started &mdash;
                with both ends now disturbed as well.
              </p>
              <p>
                What was a modest mid-scale error has become a comprehensively misadjusted
                instrument and a much longer job.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Leave it alone.{' '}
                <strong>
                  Touch the linearity adjustment only when the instrument cannot be brought inside
                  its specification any other way.
                </strong>
              </p>
              <p>
                Use zero and span instead to{' '}
                <strong>share the departure out between the two ends</strong> &mdash; deliberately
                accepting a small error at the top and bottom so the mid-range error is roughly
                halved, which often brings the whole response inside tolerance without touching
                linearity at all.
              </p>
              <p>
                If the specification still cannot be met, that is the point at which linearity is
                considered &mdash; and it is also worth asking whether the instrument is genuinely
                capable of the accuracy being demanded, or whether Module 4 Section 3&rsquo;s other
                explanations apply.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Instruments with only one point</ContentEyebrow>

        <ConceptBlock
          title="Discrete instruments — set-point and deadband"
          plainEnglish="A switch does not have a range to calibrate. It has one value where it operates, and often a second setting for how far back it must come before it resets."
          onSite="Pressure switches, level switches, thermostats — anything that answers yes or no rather than how much."
        >
          <p>
            Not every instrument measures continuously. A <strong>discrete</strong> instrument
            reports a true-or-false condition. All it can tell you is which side of one particular
            value the process is currently sitting on. A pressure switch that starts a compressor
            when air pressure falls below a set figure is the standard example.
          </p>
          <p>
            These need periodic calibration exactly as continuous instruments do, and most have just
            one adjustment:
          </p>
          <ul>
            <li>
              <strong>Set-point</strong> &mdash; the value at which the switch changes state.
            </li>
            <li>
              <strong>Deadband</strong> &mdash; where fitted, an adjustable buffer that the process
              must traverse before the switch changes back.
            </li>
          </ul>
          <p>
            Work the arithmetic, because the deadband is measured from the set-point rather than
            around it. A compressor switch set to start the compressor at 6 bar, with a 1 bar
            deadband, will not change state again until the pressure has risen to{' '}
            <strong>7 bar</strong>.
          </p>
          <p>
            The purpose is to stop the switch chattering. Without a deadband, a process sitting
            almost exactly at the set-point would trip the switch on and off repeatedly with every
            small fluctuation &mdash; which is hard on the switch and worse for whatever it
            controls.
          </p>
          <p>
            Note the connection to Module 4 Section 3.{' '}
            <strong>A deadband is deliberate, adjustable hysteresis</strong>
            &mdash; the same behaviour that is a fault in a transmitter is a designed feature in a
            switch. What distinguishes them is whether it was intended and whether it can be set.
          </p>
        </ConceptBlock>

        <VideoCard
          url={videos.pressureSwitches.url}
          title={videos.pressureSwitches.title}
          channel={videos.pressureSwitches.channel}
          duration={videos.pressureSwitches.duration}
          topic="Watch · A discrete instrument doing exactly one thing"
          caption="The Engineering Mindset walks through electronic pressure switches. Watch for the two settings this section separates — the point at which it operates, and how far the process must come back before it resets. That second one is deliberate hysteresis, and it is the same behaviour that counts as a fault in a transmitter."
        />

        <ConceptBlock
          title="Calibrating a switch means finding where it actually operates"
          plainEnglish="Approach the set-point slowly from one side and note where it trips. Then come back and note where it resets. Two numbers, not one."
          onSite="Approaching quickly overshoots and gives a trip point that is wrong in the direction you were moving."
        >
          <p>
            The procedure differs from a continuous instrument in an important way: you are not
            reading a response, you are finding a threshold.
          </p>
          <ul>
            <li>
              <strong>Approach slowly.</strong> Ramp the input gradually towards the set-point from
              the direction the process normally arrives from. Moving quickly means the switch
              operates after you have already passed the true value.
            </li>
            <li>
              <strong>Record where it changed state.</strong> That is the actual set-point, which
              may not be the number on the dial.
            </li>
            <li>
              <strong>Reverse, and record where it changes back.</strong> The difference between the
              two is the deadband, whether or not it was set deliberately.
            </li>
          </ul>
          <p>
            Both numbers matter.{' '}
            <strong>
              A switch is fully described by the point at which it operates and the point at which
              it resets
            </strong>
            , and recording only the first leaves the next person unable to tell whether the
            deadband has grown &mdash; which on a mechanical switch is exactly what wear produces.
          </p>
        </ConceptBlock>

        <Scenario
          title="A calibration that took four hours and made things worse"
          situation={
            <>
              <p>
                An analogue pressure transmitter is found reading about 1.5 per cent high at
                mid-scale, and correct at both ends. A technician adjusts the linearity control to
                bring the middle down.
              </p>
              <p>
                Four hours later the instrument reads low in the middle, high at the top, and low at
                zero. Zero and span have both been moved several times trying to recover. It is now
                further out of tolerance than when the job started.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                The original fault was a modest linearity error with both ends correct &mdash; and
                the correct response to that was very probably to do nothing at all, or to split the
                error using zero and span.
              </p>
              <p>
                Recovering from here means going back to a known state rather than continuing to
                chase. Return the linearity adjustment to its original position if it was recorded,
                and if it was not, that is the lesson for next time &mdash; Module 4 Section
                5&rsquo;s argument for recording what you found applies to adjustment positions, not
                just readings.
              </p>
              <p>
                Then run the analogue procedure properly from the start: zero at the bottom, span at
                the top, iterate until both converge. That establishes a clean baseline. Only then
                assess what mid-scale error remains, and whether it is genuinely outside
                specification.
              </p>
              <p>
                If the instrument cannot meet its specification with linearity left alone, the
                conversation is about whether this instrument is fit for the duty rather than about
                further adjustment.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                The instrument was in a recoverable state and a defensible one at the start. Four
                hours of well-intentioned adjustment produced something worse than the fault being
                corrected.
              </p>
              <p>
                It is also a reminder that <strong>not adjusting is a legitimate outcome</strong>.
                Section 1 made the distinction between verification and calibration for exactly this
                reason: finding an instrument within tolerance and leaving it alone is a complete
                and successful job.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Before and after the procedure</ContentEyebrow>

        <ConceptBlock
          title="The steps either side of the calibration itself"
          plainEnglish="The comparison is the middle of the job. What happens before and after decides whether it was worth doing."
          onSite="Most of what goes wrong on a calibration job happens outside the procedure."
        >
          <p>
            The zero-and-span or trim procedure is the technical core. Around it sits work that
            earlier modules have already established the reasons for:
          </p>
          <ul>
            <li>
              <strong>Confirm the standard.</strong> Certificate in date, uncertainty adequate for
              the tolerance, leads sound. Section 2 covered why, and Module 1 Section 4 covered what
              makes it authoritative.
            </li>
            <li>
              <strong>Agree the isolation.</strong> Taking the instrument out of service disables
              whatever depends on it. Module 5 Section 1 explained why a loop in manual behaves very
              differently depending on the process, and that is a conversation with operations
              rather than an assumption.
            </li>
            <li>
              <strong>Record as-found before touching anything.</strong> Module 4 Section 5 made the
              case: as-found is the only measurement of what the instrument was actually doing in
              service, and adjusting first destroys it permanently.
            </li>
            <li>
              <strong>Then the procedure</strong> &mdash; analogue iteration or digital trim as the
              instrument requires.
            </li>
            <li>
              <strong>Record as-left</strong>, so the next visit has something to compare against.
            </li>
            <li>
              <strong>Restore what you changed.</strong> Damping back to its process value if it was
              reduced for the test &mdash; Module 3 Section 3 &mdash; and the loop back to automatic
              with somebody watching the first correction, which Module 5 Section 2 argued for.
            </li>
          </ul>
          <p>
            🔴 The third and the last are the ones most often skipped, and both are recoverable only
            at the time.{' '}
            <strong>
              An as-found reading not taken is gone for good, and a damping value left at minimum
              will not announce itself.
            </strong>
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'How long should you wait for a reading to stabilise?',
              answer:
                'Until it has genuinely stopped moving, which is longer than most people allow — particularly on temperature, where a dry block and a sensor can take several minutes to reach equilibrium. Reading early gives an error in the direction you were approaching from, and it is repeatable enough to look like a genuine instrument error rather than a procedural one. Where a reading is still creeping, it has not stabilised, whatever the elapsed time suggests.',
            },
            {
              question: 'Does the order of zero and span matter?',
              answer:
                'On an analogue instrument, doing zero first is conventional and the iteration converges either way, so it matters less than doing enough passes. On a digital instrument the trims are independent, so the order genuinely does not matter. What does matter on both is applying the stimulus and letting it settle before adjusting anything.',
            },
            {
              question: 'Should the sensor trim or the output trim be done first?',
              answer:
                'Sensor first, then output, is the usual order — it establishes that the instrument perceives correctly before addressing what it transmits. In practice they are independent operations addressing different halves of the device, and Section 1 explained how to tell which half needs attention. Doing both when only one is needed is harmless but unnecessary.',
            },
            {
              question: 'What if an instrument passes at five points but fails at a sixth?',
              answer:
                'That is worth taking seriously rather than treating as bad luck. It usually means the response has a shape the five points did not sample — a step, a kink, or a region where something behaves differently. Take more points around the failure to establish the shape, because the shape names the fault, which is Module 4 Section 3’s central argument.',
            },
            {
              question: 'Can a calibration be done with the instrument still in service?',
              answer:
                'Only if the process can tolerate the instrument being taken out of the loop, which is a question for operations rather than for the technician alone — Module 5 Section 5 made the same point about tuning. The instrument must be isolated from the process to have a known input applied, so anything controlling from that measurement will be operating blind. That needs agreeing beforehand, not discovering afterwards.',
            },
            {
              question: 'Is an automated calibration as good as a manual one?',
              answer:
                'It is generally more consistent and less prone to transcription errors, and it applies the same points in the same order every time, which makes successive results genuinely comparable. What it cannot do is notice that something is odd — a reading behaving strangely, a fitting weeping, a sensor that will not settle. The procedure is automated; the judgement is not.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A calibration needs two standards: one to apply a known input, one to measure the output. The comparison is only as good as its weaker half.',
            'A digital output does not need comparing against a standard, because a digital number does not drift — but the input side still does.',
            '🔴 On an analogue instrument zero and span interact, because span changes the slope and a slope change moves the bottom.',
            '🔴 So the analogue procedure iterates: zero, span, back to zero, until both ends agree together.',
            '🔴 On a digital instrument the low and high trims are non-interactive, so each stimulus is applied once and there is no step five.',
            'Iterating a digital trim out of analogue habit is time spent confirming what the design guarantees.',
            'Five points — 0, 25, 50, 75, 100 per cent — because a two-point check passes exactly the errors that live in the middle.',
            'Adjusting at 0 and 100 while checking at 10, 25, 50, 75 and 90 puts every check point where no adjustment forced agreement.',
            'Running the points downwards as well as upwards is the only way hysteresis becomes visible.',
            '🔴 In an output trim you enter the value you MEASURED, not the ideal value. You are telling the instrument what it actually did.',
            'Entering the ideal value asserts the instrument is already right, so no correction is applied and the fault survives the procedure.',
            'Once both trims are complete, a digital transmitter can be ranged and re-ranged freely. Only drift justifies re-trimming.',
            '🔴 The linearity adjustment is very sensitive and easily over-adjusted. Move it only if the specification cannot be met without it.',
            'Prefer splitting the error between the ends using zero and span, and leave linearity alone.',
            'Discrete instruments have a set-point and often a deadband — a deliberate, adjustable hysteresis that stops the switch chattering.',
            'Calibrating a switch means approaching slowly and recording both where it operates and where it resets. Two numbers, not one.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 6.3" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-6-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Equipment and standards
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-6-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Results and tolerances
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule6Section3;
