/**
 * Module 5 · Section 5 — Loop tuning and stability considerations
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * 🔴 THE FRAMING, and it is the thing most tuning material omits: YOU CANNOT
 * TUNE A LOOP UNTIL YOU KNOW WHAT "GOOD" MEANS FOR IT, AND THAT IS NOT A
 * CONTROL QUESTION. "Robust" control has four attributes — stability under
 * load, fast setpoint response, minimal oscillation, minimal offset — and they
 * conflict with each other. Different processes value them completely
 * differently: a boiler level loop may tolerate a permanent 5% error but not a
 * slow response to load; an evaporator stage may need steady FLOW through the
 * valve more than steady level, so aggressive tuning actively harms product
 * quality downstream. The people who can answer this are operations, not
 * instrument technicians.
 *
 * 🔴 THE SAFETY QUESTION, which belongs before any method: "How far and how
 * fast am I allowed to let the process variable move?" Loops interact —
 * genuinely isolated loops are rare — so nobody tunes with impunity, and a
 * tuning test can trip alarms and shutdowns.
 *
 * Ziegler-Nichols closed-loop is taught as a method AND as something most
 * people will never be permitted to do, because it requires deliberately
 * destabilising a live process. Kp = 0.5·Ku giving quarter-wave damping is the
 * verified figure. The saturation caveat is important: if the oscillation is
 * limited by the transmitter or the valve rather than by the process, the test
 * is invalid.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §30.2.1 (identifying operational needs, the boiler-level and evaporator
 * examples), §30.2.2 (process and system hazards, loop interaction, the
 * how-far-how-fast question), §30.3.1 (Ziegler-Nichols closed loop, ultimate
 * gain and period, Kp = 0.5Ku, quarter-wave damping, the saturation caveat) and
 * §30.4.1 (where each action works best; integral's unique ability to ignore
 * noise). Extracted to scratchpad/src/m5_ziegler.txt, m5_phaseshift.txt,
 * m5_heuristic.txt. Held in ~/Desktop/hav/instrumentation.
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

const TITLE = 'Loop tuning and stability considerations | Instrumentation Module 5.5 | Elec-Mate';
const DESCRIPTION =
  'Why the first tuning question is what "good" means for this particular loop, the safety questions to ask before destabilising anything, the ultimate-gain method and its limits, and matching control actions to process characteristics.';

const outcomes = [
  'Name the four attributes of robust control and explain why they conflict',
  '🔴 Say why the definition of good control is a process question, not a control question',
  'Give an example of a loop where a permanent offset is acceptable',
  '🔴 State the safety questions to ask operations before tuning anything',
  'Explain why loops cannot be tuned in isolation',
  'Describe the ultimate-gain method and what Ku and Pu are',
  'Apply Kp = 0.5 Ku and say what quarter-wave damping looks like',
  '🔴 Explain why a saturated oscillation invalidates an ultimate-gain test',
  'Match control actions to process characteristics rather than tuning by trial',
];

const quizQuestions = [
  {
    id: 1,
    question: '🔴 What should be established before any tuning parameter is changed?',
    options: [
      'What good control actually means for this particular process, which is a question for operations',
      'The manufacturer’s recommended settings',
      'The age of the controller',
      'The current tuning constants',
    ],
    correctIndex: 0,
    explanation:
      'The attributes of good control conflict with one another, and different processes value them differently. Without knowing which matters here — steady setpoint, fast load response, minimal valve movement — there is no way to judge whether a change is an improvement. Operations personnel are the people who can answer it.',
  },
  {
    id: 2,
    question:
      'On a boiler water level loop, a persistent 5 per cent error is tolerated but slow response to a load change is not. What does that tell you about the tuning objective?',
    options: [
      'The loop is badly tuned and both should be fixed',
      'Minimal offset is a low priority here and load response is a high one, so the tuning should favour response',
      'The transmitter needs re-ranging',
      'Integral action should be increased until the offset disappears',
    ],
    correctIndex: 1,
    explanation:
      'The four attributes of robust control are not equally valued in every process. Here, level deviating during a load change is the risk and a steady small error is not, so the tuning aims at the first. Eliminating the offset at the cost of response would make the loop worse for its actual duty.',
  },
  {
    id: 3,
    question:
      '🔴 What is the most important thing to establish with operations before tuning a live loop?',
    options: [
      'When was the transmitter last calibrated?',
      'What were the settings last time?',
      'What limits must the process variable stay inside while I test, and how fast may it move?',
      'Which controller manufacturer is this?',
    ],
    correctIndex: 2,
    explanation:
      'Tuning means deliberately disturbing a process to see how it responds, and the acceptable limits of that disturbance are a process question. Equipment can be damaged by excursions, product can be spoiled, and alarms or shutdowns may operate — none of which the instrument technician can judge alone.',
  },
  {
    id: 4,
    question: 'Why can a loop rarely be tuned in isolation?',
    options: [
      'Because tuning requires the plant to be shut down',
      'Because the transmitter is shared',
      'Because the controller shares a processor with other loops',
      'Because loops interact through the process — changing one can disturb others sharing the same equipment or material',
    ],
    correctIndex: 3,
    explanation:
      'Genuinely isolated loops are rare in industry. A level loop that swings sends flow variation downstream; a temperature loop that cycles disturbs whatever it feeds. So the consequences of a tuning test are not confined to the loop being tuned, and nobody tunes with impunity.',
  },
  {
    id: 5,
    question: 'In the ultimate-gain method, what are Ku and Pu?',
    options: [
      'The gain at which self-sustaining oscillation begins, and the period of that oscillation',
      'The proportional band and the integral time',
      'The upper and lower range values of the transmitter',
      'The maximum and minimum output limits',
    ],
    correctIndex: 0,
    explanation:
      'With integral and derivative disabled, the gain is raised until the loop oscillates continuously without decaying. That gain is the ultimate gain Ku and the time between successive peaks is the ultimate period Pu. Both are properties of the process, and tuning values are calculated from them.',
  },
  {
    id: 6,
    question:
      'A proportional-only controller is set to half the ultimate gain. What response should be expected?',
    options: [
      'No oscillation at all',
      'Quarter-wave damping — each successive peak about a quarter the amplitude of the one before',
      'Sustained oscillation at the ultimate period',
      'A steady offset with no oscillation',
    ],
    correctIndex: 1,
    explanation:
      'Kp = 0.5 Ku gives reasonably quick response to setpoint and load changes, with oscillations that decay so each peak is roughly a quarter of the preceding one. It is explicitly a compromise between speed and stability rather than an ideal result.',
  },
  {
    id: 7,
    question:
      '🔴 During an ultimate-gain test the oscillation peaks are flat-topped because the valve is reaching its limit. Why does that invalidate the test?',
    options: [
      'The controller cannot calculate at its limits',
      'It does not — the period is still measurable',
      'The oscillation is being limited by the equipment rather than by the process, so it does not reveal the process characteristics',
      'The transmitter will be damaged',
    ],
    correctIndex: 2,
    explanation:
      'The point of the test is to measure how the process behaves at the edge of stability. If the swing is being clipped by a valve or transmitter reaching its range limit, what is being measured is the equipment’s limits, not the process — and any tuning calculated from it will be wrong.',
  },
  {
    id: 8,
    question: 'Which control action has the useful property of largely ignoring process noise?',
    options: ['Derivative', 'None of them', 'Proportional', 'Integral'],
    correctIndex: 3,
    explanation:
      'Integral action responds to error accumulated over time, and noise averages towards nothing over time — so it largely cancels itself out. Derivative is the opposite, amplifying noise dramatically, and proportional passes it straight through scaled by the gain. On a noisy measurement, integral is the term that can be used aggressively.',
  },
];

const InstrumentationModule5Section5 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 5 · Section 5"
        title="Tuning and stability"
        backTo="/electrician/upskilling/instrumentation-module-5"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The hardest part of tuning is not the adjustment. It is knowing what you are aiming for,
          and that is not a question the control system can answer.
        </p>

        <TLDR
          points={[
            '🔴 Robust control has four attributes — stable under load, fast to a setpoint change, minimal oscillation, minimal offset — and they conflict.',
            '🔴 Different processes value them completely differently, so “good control” is a process question, not a control question.',
            'Operations personnel are the people who can tell you which attribute matters. Ask before adjusting.',
            '🔴 Then settle the safety question: what limits must the process variable stay inside while you test, and how fast may it move?',
            'Ultimate gain method: disable I and D, raise gain until oscillation is self-sustaining. That gain is Ku, its period is Pu.',
            '🔴 If the oscillation is clipped by a valve or transmitter at its limit, the test measures the equipment and not the process, and the result is worthless.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>🔴 Before any method</ContentEyebrow>

        <ConceptBlock
          title="What does good look like on this loop?"
          plainEnglish="There is no universal definition of a well-tuned loop. What counts as good depends on what the process needs, and different processes need incompatible things."
          onSite="This is a conversation with operations before it is a job on a controller. They are the people who know what the loop is for."
        >
          <p>
            Control that could be called <strong>robust</strong> has four attributes:
          </p>
          <ul>
            <li>The process variable stays stable despite changes in load.</li>
            <li>It responds quickly to a change in setpoint.</li>
            <li>It oscillates minimally following either kind of change.</li>
            <li>It holds minimal offset between process variable and setpoint over time.</li>
          </ul>
          <p>
            The difficulty is that{' '}
            <strong>
              these are not equally valued in every process, and they are not equally attainable in
              every process either.
            </strong>{' '}
            Pushing on one usually costs you another. A loop tuned for fast setpoint response will
            overshoot more; a loop tuned for minimal oscillation will respond more slowly.
          </p>
          <p>Two examples make the point better than any general statement.</p>
          <p>
            <strong>Boiler water level.</strong> Here, fast response to a change in load is
            critical, and minimal offset is not. It may be entirely acceptable to run with a
            persistent 5 per cent error, provided the level does not deviate far for any length of
            time when the load changes. A technician who eliminated that offset at the cost of load
            response would have made the loop worse at its actual job.
          </p>
          <p>
            <strong>One stage of a multi-stage evaporator.</strong> Here the priority may be
            relatively steady flow <em>through the valve</em> rather than steady level in the
            vessel. A level controller tuned to respond aggressively to setpoint changes will
            produce large fluctuations in flow to every following stage, and that can damage product
            quality far more than some deviation from level setpoint in the one vessel.
          </p>
          <p>
            🔴 Notice what both examples have in common:{' '}
            <strong>
              the right tuning objective could not be worked out from the loop itself.
            </strong>{' '}
            It comes from knowing what the plant is trying to do, and the operators, unit managers
            and process engineers are the ones who know that. Treat them as the people the work is
            being done for.
          </p>
        </ConceptBlock>

        <Pullquote>
          Without knowing which of the four attributes matters here, there is no way to judge
          whether a tuning change was an improvement. You can only tell that something is different.
        </Pullquote>

        <ConceptBlock
          title="🔴 The safety questions"
          plainEnglish="Tuning means deliberately upsetting a process to see what it does. Somebody has to agree in advance how far you may upset it."
          onSite="Ask before you start, not after something operates."
        >
          <p>
            Every tuning method involves disturbing the process on purpose &mdash; a setpoint step,
            an output step, or in the case of the ultimate-gain method, deliberately driving the
            loop into oscillation. That is not a neutral act on a live plant.
          </p>
          <p>The question to put to operations, in as many words:</p>
          <p>
            <strong>
              What are the limits &mdash; in both directions &mdash; that this process variable must
              stay inside while I am testing, and how quickly may it be allowed to move between
              them?
            </strong>
          </p>
          <p>
            It is a better question than it first appears, because it forces out constraints that
            are not visible from the control system:
          </p>
          <ul>
            <li>
              <strong>Equipment limits.</strong> Processes and equipment can become dangerously
              unstable at certain temperatures &mdash; and low temperatures matter as much as high
              ones where a process liquid solidifies when cold.
            </li>
            <li>
              <strong>Alarms and trips.</strong> Loops are frequently fitted with alarms, and some
              will automatically shut equipment down. Provoking a shutdown during a tuning test is a
              memorable way to learn what was configured.
            </li>
            <li>
              <strong>Product quality.</strong> An excursion that harms nothing mechanically may
              still ruin a batch.
            </li>
          </ul>
          <p>
            🔴 And a second constraint that catches people who have only tuned simulations:{' '}
            <strong>
              loops interact. You will rarely find a genuinely isolated feedback loop in industry
            </strong>
            , so a loop cannot be tuned with impunity. A level loop allowed to swing sends that
            variation downstream as flow; a temperature loop that cycles disturbs whatever it feeds.
            The consequences of a test are not confined to the loop under test.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The ultimate-gain method</ContentEyebrow>

        <ConceptBlock
          title="Finding the edge of stability on purpose"
          plainEnglish="Turn off integral and derivative, then wind the gain up until the loop oscillates and stays oscillating. Where that happens tells you about the process."
          onSite="A recognised method, and one many technicians will never be allowed to perform on a production loop. Understanding it is still worthwhile."
        >
          <p>
            If a feedback loop is given too much total amplification it will self-oscillate at its
            own natural frequency. Oscillation is normally the thing to avoid &mdash; but it can be
            used deliberately as an exploratory test of how the process behaves.
          </p>
          <p>The closed-loop procedure:</p>
          <ul>
            <li>
              Disable integral and derivative action so the controller is purely proportional.
            </li>
            <li>
              Raise the gain <em>just far enough</em> that self-sustaining oscillations begin.
            </li>
            <li>
              Record that gain. It is the <strong>ultimate gain</strong>, K<sub>u</sub>.
            </li>
            <li>
              Record the time between successive peaks. That is the <strong>ultimate period</strong>
              , P<sub>u</sub>.
            </li>
          </ul>
          <p>
            Both are properties of the process rather than of the controller, which is what makes
            them useful. From them, tuning values can be calculated. The proportional-only case is
            the one worth remembering:
          </p>
          <p>
            <strong>
              K<sub>p</sub> = 0.5 &times; K<sub>u</sub>
            </strong>
          </p>
          <p>
            Half the ultimate gain generally gives reasonably quick response to both setpoint and
            load changes, with oscillations that decay so that{' '}
            <strong>
              each successive peak is roughly a quarter the amplitude of the one before
            </strong>{' '}
            &mdash; known as <strong>quarter-wave damping</strong>.
          </p>
          <p>
            It is worth being clear that quarter-wave damping is explicitly a{' '}
            <em>compromise between fast response and stability</em>, not an ideal outcome. A loop
            tuned this way visibly rings after a change. On processes where that is unacceptable, it
            is a starting point to be detuned from rather than a target.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 The caveat that invalidates the test"
          plainEnglish="The oscillation has to be limited by the process, not by something hitting its end stop. If the peaks are flat, the number is meaningless."
          onSite="Look at the shape of the peaks. Rounded is a real oscillation; flat-topped is a saturated one."
        >
          <p>
            The test measures how the process behaves at the edge of stability, and that only works
            if the process is what is limiting the swing.
          </p>
          <p>
            If the oscillation peaks reach the limits of the instrumentation &mdash; the transmitter
            running out of range, or the control valve reaching fully open or fully shut &mdash;
            then{' '}
            <strong>
              the oscillation is being limited artificially, and what you are measuring is the
              equipment rather than the process.
            </strong>
          </p>
          <p>
            The visible symptom is the shape of the peaks. A genuine oscillation is smoothly
            sinusoidal with rounded peaks. A saturated one is clipped, with flat tops or flat
            bottoms where the signal has run into a limit and stopped.
          </p>
          <p>
            Any ultimate gain or period taken from a clipped oscillation is wrong, and so is every
            tuning value calculated from it. If the peaks are flattening, reduce the amplitude of
            the disturbance or accept that the loop cannot be tested this way at this operating
            point.
          </p>
          <p>
            This connects to Section 2&rsquo;s point about output limits, and to Module 3 Section
            1&rsquo;s observation that a current loop saturates rather than degrading gracefully.
            Saturation always looks like a stable value and never is.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-5-5-saturation"
          question="During a tuning test the PV trend shows even, rounded oscillation but the output trend has flat tops at 100 per cent. Is the test valid?"
          options={[
            'Yes, provided the period is measured between PV peaks',
            'Only if the transmitter is also saturating',
            'No — the valve is saturating, so the loop is not oscillating freely and any Ku taken from it is wrong',
            'Yes — the PV oscillation is what matters',
          ]}
          correctIndex={2}
          explanation="The output reaching its limit means the controller is no longer able to deliver the correction its gain is calling for. The loop is being constrained by the valve rather than finding its own natural limit, so the gain at which this occurred is not the ultimate gain of the process. Reduce the disturbance and repeat."
        />

        <InlineCheck
          id="ins-5-5-objective"
          question="You are asked to tune a level loop on a surge vessel that feeds a downstream process. Which objective is most likely correct?"
          options={[
            'Hold level tightly on setpoint at all times',
            'Minimise the offset between level and setpoint',
            'Respond as fast as possible to setpoint changes',
            'Keep the outflow steady, allowing the level to drift within a band — that is what a surge vessel is for',
          ]}
          correctIndex={3}
          explanation="A surge vessel exists to absorb variation so downstream equipment sees a steady flow. Tightly controlling its level would pass every disturbance straight through as flow — achieving the opposite of the vessel's purpose. The right objective comes from what the equipment is for, which is why it is a question for operations."
        />

        <SectionRule />
        <ContentEyebrow>How tuning is usually done</ContentEyebrow>

        <ConceptBlock
          title="Characterise first, then choose the actions"
          plainEnglish="Rather than adjusting and watching, work out what kind of process it is and let that decide which terms matter."
          onSite="This is the practical alternative to a formal test, and it is what most tuning actually is."
        >
          <p>
            Few production loops get a formal ultimate-gain test, for the reasons above. Most tuning
            is <strong>heuristic</strong> &mdash; informed adjustment guided by knowing what the
            process is like.
          </p>
          <p>
            That makes Section 1&rsquo;s classification the starting point rather than an
            afterthought. Identify whether the process is self-regulating, integrating or runaway;
            whether it is noisy; and whether it is dominated by lag or by dead time. An open-loop
            step test in manual gives all of that, and Section 1 described how to read it.
          </p>
          <p>Then match the actions to what you found:</p>
          <AppendixTable
            caption="Where each action works well"
            headers={['Action', 'Works especially well on', 'Notes']}
            rows={[
              [
                'Proportional',
                'Processes that lack the phase shift needed to oscillate — first-order-lag self-regulating ones, and purely integrating ones',
                'Can be applied aggressively on these',
              ],
              [
                'Integral',
                'Fast-acting self-regulating processes',
                '🔴 Uniquely able to ignore process noise',
              ],
              [
                'Derivative',
                'Processes dominated by large lag times, and stabilising runaway processes',
                'A small amount can permit more aggressive P and I than would otherwise be possible',
              ],
            ]}
            notes="Read alongside Section 3's table of what each process type requires. These say where each action performs well; that one says where each is unavoidable."
          />
          <p>
            🔴 The note against integral is the one to act on, and Section 3 gave the reason: each
            term treats noise according to how it responds to frequency, and{' '}
            <strong>integral responds less as frequency rises</strong>, so noise largely cancels
            itself out in the accumulation.
          </p>
          <p>
            So on a noisy measurement &mdash; a flow loop, typically &mdash; integral is the term
            you can lean on, and that is a genuinely useful thing to know when the obvious options
            are unavailable.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Verifying that a change was an improvement"
          plainEnglish="A loop that looks calm because nothing has happened to it has not been proved to work. You have to give it something to respond to."
          onSite="Make a small, agreed disturbance and watch. Then decide, against the objective you established at the start."
        >
          <p>
            A tuning change is not verified by the loop sitting quietly afterwards. A badly tuned
            loop sits quietly too, provided nothing disturbs it &mdash; and Section 1 explained why:
            with no error, there is nothing for the controller to do.
          </p>
          <p>Verification means providing a disturbance and observing the response:</p>
          <ul>
            <li>
              <strong>A small setpoint step</strong>, within the limits agreed with operations,
              shows the response to a setpoint change: how fast it gets there and how much it
              overshoots.
            </li>
            <li>
              <strong>A load change</strong>, if one can be arranged or if one occurs naturally,
              shows the more important behaviour &mdash; most loops spend their lives rejecting
              loads rather than following setpoints.
            </li>
          </ul>
          <p>
            Then judge the result against the objective established at the beginning, not against a
            general idea of tidiness.{' '}
            <strong>
              If the objective was fast load response and the loop now returns faster with a
              slightly larger overshoot, that is a success
            </strong>
            &mdash; even though the trend looks less neat than before.
          </p>
          <p>
            And record the result, along with what the settings were before. Module 4 Section 5 made
            the argument for as-found records, and tuning constants are exactly the kind of thing
            that gets changed repeatedly over years by people who each recorded nothing.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Getting it wrong</ContentEyebrow>

        <CommonMistake
          title="Tuning until the trend looks tidy"
          whatHappens={
            <>
              <p>
                Adjustment continues until the process variable trend is a flat, calm line, and that
                is taken as the finished result. It looks like success and it is the same instinct
                Module 3 Section 3 identified with over-damping.
              </p>
              <p>
                A flat trend is achieved most easily by making the loop slow, and a slow loop is not
                a well-controlled one. It simply fails to respond to disturbances promptly, which
                shows up as large, slow excursions when something real happens &mdash; long after
                the person who tuned it has moved on.
              </p>
              <p>
                🔴 In the worst version the trend is flat because the transmitter is over-damped
                rather than because the process is steady. Then the control system is being tuned
                against a measurement that is itself lying about how much the process is moving.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Judge against the operational objective agreed at the start, not against the
                appearance of the trend. Some processes genuinely want a flat line and many do not.
              </p>
              <p>
                Verify with a disturbance rather than with quiet. A loop that has not been asked to
                do anything has not demonstrated anything.
              </p>
              <p>
                And check the measurement before tuning against it. If the transmitter&rsquo;s
                damping has been increased at some point in the past, the control system is seeing a
                smoothed version of the process, and Module 3 Section 3 explained exactly what that
                does to a control loop.
              </p>
            </>
          }
        />

        <ConceptBlock
          title="When tuning is not the answer at all"
          plainEnglish="Some loops cannot be made good by any settings. Recognising that early is worth more than persistence."
          onSite="If two rounds of considered adjustment have not helped, stop and reconsider the premise."
        >
          <p>
            Section 4 listed the faults that ignore tuning entirely. It is worth repeating the
            conclusion here in the context of a tuning job, because this is where the time gets
            spent:
          </p>
          <ul>
            <li>
              <strong>Dead time</strong> bounds what is achievable. A loop can be tuned to be stable
              despite it, never to be quick despite it.
            </li>
            <li>
              <strong>Stiction</strong> produces a cycle that survives any amount of detuning.
            </li>
            <li>
              <strong>Wrong direction of action</strong> is not improved by any gain.
            </li>
            <li>
              <strong>An oversized or undersized valve</strong> means the loop operates in a narrow
              part of its output range, where a small output change produces a large process change
              or the reverse. That is a sizing problem wearing a tuning problem&rsquo;s clothes.
            </li>
            <li>
              <strong>A process whose gain varies across its range</strong> can be tuned correctly
              for one operating point and be unstable at another, with nothing wrong at either.
            </li>
          </ul>
          <p>
            The honest outcome in these cases is a recommendation rather than a set of constants,
            and it is worth writing down as such.{' '}
            <strong>
              &ldquo;This loop cannot be tuned to meet that requirement, and here is why&rdquo; is a
              useful engineering answer
            </strong>
            &mdash; and considerably more useful than a loop quietly detuned into sluggishness so
            that it stops attracting complaints.
          </p>
        </ConceptBlock>

        <Scenario
          title="A loop that everyone agrees is badly tuned, for opposite reasons"
          situation={
            <>
              <p>
                A level loop on a surge vessel is the subject of a complaint. The operators say it
                is too slow — the level wanders and they have to watch it. The engineer downstream
                says it is too aggressive — every level correction sends a flow surge into his
                equipment.
              </p>
              <p>Both are describing the same loop, on the same day, with the same settings.</p>
            </>
          }
          whatToDo={
            <>
              <p>
                Neither is wrong, and there is no tuning that satisfies both. They are asking for
                different attributes from the four, and those attributes conflict.
              </p>
              <p>
                So the first job is not tuning &mdash; it is establishing what the vessel is{' '}
                <em>for</em>. A surge vessel exists to absorb variation so that downstream equipment
                sees a steady flow. If that is its purpose, the downstream engineer is describing
                the loop failing at its actual duty, and the level wandering within the vessel is
                not a fault at all: it is the vessel doing its job.
              </p>
              <p>
                That points at loose level control with strong proportional action and very little
                integral &mdash; which Section 3 predicted anyway, because level is an integrating
                process and integral action on one guarantees overshoot. The level is allowed to
                drift within a band, and the outflow stays smooth.
              </p>
              <p>
                The operators&rsquo; concern is then addressed differently: not by tightening the
                loop, but by agreeing what band the level may occupy and setting alarms at the edges
                of it, so that nobody needs to watch a level that is supposed to move.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                This is why the section opens where it does. Without agreeing what good means, the
                loop would be retuned repeatedly in opposite directions by whoever complained most
                recently, and both parties would remain dissatisfied.
              </p>
              <p>
                It also shows that a control problem is sometimes not a control problem. The right
                answer here included an alarm strategy and a conversation, and only part of it was a
                tuning change.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Doing the adjustment</ContentEyebrow>

        <ConceptBlock
          title="One term at a time, and in a sensible order"
          plainEnglish="Change one thing, observe, decide. Changing two at once means you cannot tell which one did what."
          onSite="Slow, and faster than the alternative — which is going round in circles."
        >
          <p>
            Whatever method is used, the discipline of adjustment is the same and it is unglamorous:
          </p>
          <ul>
            <li>
              <strong>Record what the settings are</strong> before touching them.
            </li>
            <li>
              <strong>Change one term.</strong> If two change together and the loop improves, you do
              not know which did it, and you cannot undo half of it.
            </li>
            <li>
              <strong>Give the loop a disturbance and watch a full response</strong> before
              deciding. A loop with slow integral action can take several minutes to show what a
              change did.
            </li>
            <li>
              <strong>Change in meaningful steps.</strong> Adjustments of a few per cent are usually
              indistinguishable from noise; halving or doubling produces a response you can actually
              read.
            </li>
            <li>
              <strong>Know how to get back.</strong> If the loop becomes unstable, the fastest safe
              action is manual mode, and then the recorded settings.
            </li>
          </ul>
          <p>
            There is a conventional order too, and it follows from Section 3. Establish proportional
            action first, because the other two are usually scaled by it &mdash; changing gain moves
            the integral and derivative contributions with it. Then add integral to remove the
            offset. Then, only if the process warrants it and the measurement is clean enough,
            consider derivative.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Is there a set of tuning constants that works for most loops?',
              answer:
                'No, and the reason is in this section rather than in the mathematics. Tuning constants describe how hard a controller pushes; whether that is right depends on the process dynamics and on what the plant needs from the loop. Two temperature loops on identical equipment can need different settings because one is expected to hold setpoint tightly and the other is expected not to disturb what it feeds. Copying constants between loops is a reasonable starting point and never a finished job.',
            },
            {
              question: 'Do auto-tune functions remove the need for any of this?',
              answer:
                'They automate the measurement, not the judgement. An auto-tune performs some form of test and calculates constants from the response, which is genuinely useful and saves time. What it cannot know is which of the four attributes matters on this loop, what the safe limits of a disturbance are, or how this loop interacts with others. Those remain human decisions, and an auto-tune run without them can produce a technically valid result that is wrong for the duty.',
            },
            {
              question: 'How small should a test disturbance be?',
              answer:
                'Large enough to produce a response clearly distinguishable from noise, and no larger. That balance is worth thinking about explicitly: too small and you cannot read the result, too large and you are risking the very excursion operations warned you about. Where noise makes a small step unreadable, the noise is worth addressing first — Module 3 Section 5 — rather than compensating with a bigger disturbance.',
            },
            {
              question: 'Should derivative be added if a loop overshoots?',
              answer:
                'Only after checking the measurement is clean enough to tolerate it. Derivative does genuinely reduce overshoot on lagged processes, and a small amount can allow more aggressive proportional and integral action than would otherwise be possible. On a noisy signal it will amplify the noise into the valve and make things worse, so Section 3’s warning applies. Look at the process variable trend first.',
            },
            {
              question: 'What if operations cannot tell me what good looks like?',
              answer:
                'That is a common and revealing answer, and it is worth pursuing rather than filling in yourself. Useful ways in: what happens when this loop misbehaves, and who notices first? What does the loop feed, and does that equipment care about steadiness? Has anyone complained about it, and about what? The answers usually identify which attribute matters even when nobody would have phrased it as one of four.',
            },
            {
              question: 'Is it worth tuning a loop with significant dead time?',
              answer:
                'Yes, within limits — but Section 1 set the expectation. Dead time bounds how good the control can be, and tuning around it means accepting a gentler, slower loop that does not over-correct during the blind period. What tuning cannot do is remove the delay. If the resulting control is not adequate for the duty, the answer is to shorten the dead time physically rather than to keep adjusting.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            '🔴 Robust control has four attributes — stability under load, setpoint response, minimal oscillation, minimal offset — and they conflict with each other.',
            '🔴 Which of them matters is a property of the process, not of the loop. It has to be established before any adjustment.',
            'A boiler level loop may tolerate a permanent 5 per cent error and not a slow load response.',
            'An evaporator stage may need steady flow through the valve more than steady level, so aggressive tuning harms the product.',
            'Operations personnel are the people who can answer this. Treat them as who the work is for.',
            '🔴 Agree the limits the process variable must stay inside, in both directions, before disturbing anything.',
            'Equipment limits, alarms, automatic shutdowns and product quality are all constraints invisible from the control system.',
            '🔴 Loops interact through the process. A genuinely isolated loop is rare, so nobody tunes with impunity.',
            'Ultimate gain method: disable I and D, raise gain to self-sustaining oscillation. Ku is that gain, Pu is its period.',
            'Kp = 0.5 Ku gives quarter-wave damping — each peak about a quarter of the last. A compromise, not an ideal.',
            '🔴 Clipped, flat-topped peaks mean the equipment is limiting the swing, not the process. Any Ku from that is worthless.',
            'Most real tuning is heuristic: characterise the process with an open-loop step test, then choose the actions that suit it.',
            'Proportional suits processes that lack the phase shift to oscillate. Integral suits fast self-regulating processes. Derivative suits heavily lagged and runaway ones.',
            '🔴 Integral uniquely ignores noise, because noise averages towards nothing over time. Derivative amplifies it.',
            'Verify with a disturbance, not with quiet — a loop that has not been asked to do anything has proved nothing.',
            'Judge against the agreed objective rather than the tidiness of the trend, and record what the settings were before you changed them.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 5.5" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-5-section-4')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Common loop faults
            </span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-5-section-6')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Worked examples
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule5Section5;
