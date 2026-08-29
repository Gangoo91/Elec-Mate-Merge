/**
 * Module 5 · Section 4 — Common loop faults: hunting, overshoot, lag
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar.
 *
 * 🔴 THE FRAMING. In a closed loop everything affects everything else, so a
 * symptom seen at the PV can originate in ANY of the four elements — sensing,
 * deciding, influencing, or the process itself. Diagnosis is therefore about
 * LOCALISING, and the whole page is organised as a set of tests that narrow
 * the search rather than a list of symptoms with causes attached.
 *
 * 🔴 THE CENTREPIECE is the phase-shift test, which is genuinely non-obvious
 * and enormously useful. Compare the OUTPUT trend against the PV trend:
 *
 *   P adds NO phase shift          → output moves in step with PV
 *   I adds −90°                    → output LAGS PV by a quarter cycle
 *   D adds +90°                    → output LEADS PV by a quarter cycle
 *
 * So the phase relationship names which term is over-tuned. That converts
 * "the loop is hunting, try reducing something" into a decision.
 *
 * 🔴 The other half of the page is faults that LOOK like tuning and are not:
 * dead time (5.1), wrong direction of action (5.2), valve stiction, noise
 * (M3.5), range mismatch (M3.2), windup (5.3). Every one of those will absorb
 * unlimited tuning effort and stay broken.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §29.2 (the four elements of a loop and why any of them can produce the same
 * symptom), §30.4.1 (gain and phase shift of each action; where each action
 * works best), §30.4.3 (recognising an over-tuned controller by phase shift,
 * damped vs undamped oscillation). Extracted to scratchpad/src/m5_diagnose.txt,
 * m5_phaseshift.txt, m5_heuristic.txt. Held in ~/Desktop/hav/instrumentation.
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
  'Common loop faults: hunting, overshoot, lag | Instrumentation Module 5.4 | Elec-Mate';
const DESCRIPTION =
  'Localising a control fault to one of the four elements of a loop, using the phase relationship between output and process variable to identify which control action is over-tuned, and recognising the faults that look like tuning problems but are not.';

const outcomes = [
  'Name the four elements of a loop and say why any of them can produce the same symptom',
  'Distinguish damped oscillation from undamped oscillation and say what each indicates',
  '🔴 Use the phase relationship between output and PV to identify the dominant control action',
  'Diagnose an overshoot as windup, as excess integral, or as an integrating process',
  'Recognise the signature of valve stiction on a PV and output trend',
  'Explain why a sluggish loop and a loop with offset are different faults',
  '🔴 List the faults that will not respond to any amount of tuning',
  'Decide whether a control problem is a tuning problem before adjusting anything',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A process variable is not holding setpoint. Which part of the loop could be responsible?',
    options: [
      'Any of the four elements — the measurement, the controller, the final control element, or the process itself',
      'The final control element, since it is what acts',
      'The transmitter, since it is what reports',
      'The controller, since it is what decides the output',
    ],
    correctIndex: 0,
    explanation:
      'A loop is a closed cycle in which everything affects everything else, so the same symptom can be produced by a fault anywhere in it. That is exactly why diagnosis has to localise rather than guess — the symptom alone does not identify the element.',
  },
  {
    id: 2,
    question: 'What is the characteristic indication that a controller is over-tuned?',
    options: [
      'A steady offset from setpoint',
      'Sinusoidal oscillation — damped at best, never decaying at worst',
      'The output sitting at a limit',
      'A very slow approach to setpoint',
    ],
    correctIndex: 1,
    explanation:
      'Over-aggressive action shows up as oscillation. Damped oscillation following a setpoint or load change is the mild version; oscillation that never decays is the severe one. A steady offset is the opposite problem — too little action, or none of the right kind.',
  },
  {
    id: 3,
    question:
      '🔴 A loop is oscillating. The output trend moves exactly in step with the process variable trend. Which action is dominant?',
    options: ['Integral', 'Derivative', 'Proportional', 'It cannot be determined from the trends'],
    correctIndex: 2,
    explanation:
      'Proportional action adds no phase shift — it responds to the present value of the error, so its output tracks the process variable with no delay. An output moving in step with the PV, or exactly opposite it on a reverse-acting loop, points at proportional gain as the term to reduce.',
  },
  {
    id: 4,
    question:
      '🔴 A loop is oscillating and the output trend lags the process variable by about a quarter of a cycle. Which action is dominant?',
    options: [
      'Derivative, which adds a +90° phase shift',
      'None — this indicates a valve fault',
      'Proportional',
      'Integral, which adds a −90° phase shift',
    ],
    correctIndex: 3,
    explanation:
      'Integral acts on accumulated past error, which shows up as a quarter-cycle lag behind the process variable. If the output is trailing the PV round the oscillation, integral action is the term to slow down.',
  },
  {
    id: 5,
    question:
      'The output trend leads the process variable by about a quarter of a cycle. What does that indicate?',
    options: [
      'Derivative action is dominant, since it adds a +90° phase shift',
      'Integral action is dominant',
      'The loop is correctly tuned',
      'The transmitter is faulty',
    ],
    correctIndex: 0,
    explanation:
      'Derivative responds to rate of change, which peaks a quarter cycle before the value itself does — so its contribution leads. An output running ahead of the PV points at derivative as the over-aggressive term, and on a noisy measurement that is the usual culprit.',
  },
  {
    id: 6,
    question:
      'A loop overshoots badly on startup but controls perfectly once running. What should be suspected first?',
    options: [
      'Excessive proportional gain',
      'Integral windup accumulated while the output was held at a limit',
      'A faulty transmitter',
      'Dead time in the process',
    ],
    correctIndex: 1,
    explanation:
      'Good control in normal running rules out a tuning fault that would show up all the time. An overshoot specific to startup, restart or the clearing of a restriction is the windup signature — the controller accumulated an error it could not act on, and has to unwind it before backing off.',
  },
  {
    id: 7,
    question:
      'The output trend is moving smoothly but the process variable sits still and then jumps. What does that suggest?',
    options: [
      'Integral windup',
      'A tuning problem requiring less gain',
      'The final control element is sticking and then breaking free — stiction',
      'Dead time in the measurement',
    ],
    correctIndex: 2,
    explanation:
      'The controller is doing its job and the process is not receiving it smoothly. A valve that will not move until the signal has changed enough to overcome friction, then jumps past where it should be, produces exactly this stepped response. No amount of retuning fixes a mechanical problem.',
  },
  {
    id: 8,
    question: '🔴 Which of these will not respond to any amount of tuning?',
    options: [
      'A loop with slightly too little integral action',
      'A loop that overshoots on a setpoint change',
      'A loop with slightly too much gain',
      'A loop with a wrong direction of action, significant dead time, or a sticking valve',
    ],
    correctIndex: 3,
    explanation:
      'Tuning changes how the controller responds to an error. It cannot reverse the loop’s direction, remove a transport delay, or make a valve move smoothly. Each of those will absorb unlimited tuning effort and remain broken — which is why the first question is always whether this is a tuning problem at all.',
  },
];

const InstrumentationModule5Section4 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 5 · Section 4"
        title="Common loop faults"
        backTo="/electrician/upskilling/instrumentation-module-5"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          The symptom is always at the process variable. The cause can be anywhere in the loop —
          which is what makes this worth a method.
        </p>

        <TLDR
          points={[
            'A loop is a closed cycle, so everything affects everything else — the same symptom can come from any of its four elements.',
            'Those four are: something that senses, something that decides, something that influences, and the process that reacts.',
            'Over-tuning shows up as oscillation: damped after a change at best, never decaying at worst.',
            '🔴 The phase between the output trend and the PV trend names the over-tuned term.',
            'Proportional adds no phase shift — output moves in step with the PV.',
            'Integral adds −90° — output lags the PV by about a quarter cycle.',
            'Derivative adds +90° — output leads the PV by about a quarter cycle.',
            'Overshoot has three common causes: windup, too much integral, or integral on an already-integrating process.',
            'Overshoot on startup with good control afterwards is windup, not tuning.',
            'Output moving smoothly while the PV sits and then jumps is valve stiction — a mechanical fault no tuning will reach.',
            '🔴 Faults that ignore tuning entirely: wrong direction of action, dead time, stiction, a range mismatch, and noise.',
            'So the first question is never “what should I adjust?” — it is “is this a tuning problem at all?”',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>Why loop faults are confusing</ContentEyebrow>

        <ConceptBlock
          title="Everything affects everything else"
          plainEnglish="In a loop, the output affects the process, which affects the measurement, which affects the output. Follow the chain far enough and you arrive back where you started."
          onSite="This is why loop faults get misdiagnosed so often. The symptom appears at the measurement whatever the cause."
        >
          <p>
            Every feedback loop is built from four elements, and it is worth naming them by what
            they do rather than by what they are:
          </p>
          <ul>
            <li>
              <strong>Something senses</strong> &mdash; the sensing element and transmitter.
            </li>
            <li>
              <strong>Something decides</strong> &mdash; the controller.
            </li>
            <li>
              <strong>Something influences</strong> &mdash; the final control element.
            </li>
            <li>
              <strong>Something reacts</strong> &mdash; the process itself.
            </li>
          </ul>
          <p>
            Because those four form a closed cycle, a fault in any one of them shows up in the same
            place: the process variable failing to hold setpoint.{' '}
            <strong>
              The symptom does not tell you which element is at fault, because every element
              produces the same symptom.
            </strong>
          </p>
          <p>
            That is the whole difficulty, and it explains why control problems attract so much
            guesswork. Somebody notices the process is not at setpoint, and the available responses
            &mdash; retune it, recalibrate the transmitter, change the valve &mdash; are all
            plausible, all defensible, and mostly wrong.
          </p>
          <p>
            So this section is organised as a set of tests that <em>narrow</em> the field rather
            than a list of symptoms with causes attached to them. Each one eliminates part of the
            loop.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Hunting and oscillation</ContentEyebrow>

        <ConceptBlock
          title="Damped and undamped — two severities of the same fault"
          plainEnglish="A loop that wobbles and settles is mildly over-tuned. A loop that wobbles forever is badly over-tuned."
          onSite="Watch what happens after a setpoint change. That is when a marginally over-tuned loop reveals itself."
        >
          <p>
            The characteristic sign that a controller is configured too aggressively for its process
            is <strong>sinusoidal oscillation</strong> &mdash; the process variable swinging above
            and below setpoint in a regular pattern.
          </p>
          <p>It comes in two severities, and they are worth distinguishing:</p>
          <ul>
            <li>
              <strong>Damped oscillation</strong> &mdash; the loop overshoots, comes back,
              overshoots less, and eventually settles. This follows a setpoint or load change and
              then stops. It is the mild version, and a small amount of it is often acceptable.
            </li>
            <li>
              <strong>Undamped oscillation</strong> &mdash; the swings do not decay. The loop
              continues cycling indefinitely with no disturbance to sustain it. This is the severe
              version and it is never acceptable, because the final control element is being worked
              continuously and the process never actually sits at setpoint.
            </li>
          </ul>
          <p>
            Both mean the same thing in kind: at least one control action is set too aggressively
            for this process. What neither of them tells you is <em>which</em> action.
          </p>
          <p>
            All three can cause oscillation if set too hard, so on the evidence of the process
            variable alone it could be any of them, or a combination. Guessing is common and it is
            slow, because reducing the wrong term makes control worse without stopping the
            oscillation.
          </p>
          <p>There is a much better test, and it needs only two trends.</p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 The phase test — which action is causing it"
          plainEnglish="Put the output trend next to the process variable trend and look at how they line up in time. Each control action has its own signature."
          onSite="Every modern control system can trend the output alongside the PV. This test costs nothing and settles the question."
        >
          <p>
            The three control actions each shift the timing of their contribution differently, and
            that difference is visible on a trend. Compare the <strong>controller output</strong>{' '}
            against the <strong>process variable</strong> during an oscillation:
          </p>
          <AppendixTable
            caption="Reading the phase between output and PV"
            headers={['Phase relationship', 'Dominant action', 'What to reduce']}
            rows={[
              [
                'Output moves in step with the PV — no shift',
                'Proportional',
                'Gain (or widen the proportional band)',
              ],
              [
                'Output lags the PV by about a quarter cycle',
                'Integral — it adds −90°',
                'Integral action — fewer repeats per minute',
              ],
              [
                'Output leads the PV by about a quarter cycle',
                'Derivative — it adds +90°',
                'Derivative action, or remove it',
              ],
            ]}
            notes="On a reverse-acting loop the output is inverted relative to the PV, as Section 2 explained. Read the phase relative to that inversion, not to the PV directly."
          />
          <p>
            The reasoning behind each row follows directly from what each term does, which is why
            this is worth understanding rather than memorising:
          </p>
          <ul>
            <li>
              <strong>Proportional</strong> responds to the error as it is right now, with no delay
              and no anticipation, so its contribution rises and falls exactly when the error does.
              No phase shift.
            </li>
            <li>
              <strong>Integral</strong> responds to accumulated past error. An accumulation reaches
              its peak after the thing being accumulated has peaked, so the contribution arrives
              late &mdash; a quarter cycle behind.
            </li>
            <li>
              <strong>Derivative</strong> responds to rate of change, and a sine wave changes
              fastest a quarter cycle <em>before</em> it peaks. So the contribution arrives early.
            </li>
          </ul>
          <p>
            There is a second, related clue worth having, and it is the same property Section 3 used
            to explain how each term handles noise.{' '}
            <strong>
              The three actions respond differently to frequency: proportional gain is the same at
              any frequency, integral action weakens as frequency rises, and derivative action
              strengthens as frequency rises.
            </strong>{' '}
            That is why a fast, jittery oscillation is far more likely to be derivative or
            proportional than integral, and why a slow, rolling cycle over minutes is more likely to
            be integral.
          </p>
        </ConceptBlock>

        <Pullquote>
          Two trends and twenty seconds will tell you which of the three terms to reduce. Without
          them, it is three guesses and each wrong one makes the loop worse.
        </Pullquote>

        <InlineCheck
          id="ins-5-4-phase"
          question="A temperature loop cycles slowly, roughly once every eight minutes. The output trend is clearly trailing the PV round each cycle. What is the most likely cause?"
          options={[
            'Excessive integral action — it lags by a quarter cycle and dominates at low frequencies',
            'Excessive derivative action',
            'A sticking valve',
            'Excessive proportional gain',
          ]}
          correctIndex={0}
          explanation="Two clues agree. The output lagging the PV is the −90° signature of integral action, and a slow cycle is where integral is strongest, since its effect weakens as frequency rises. Reducing the integral action — fewer repeats per minute, or a longer integral time — is the change to make."
        />

        <SectionRule />
        <ContentEyebrow>Overshoot</ContentEyebrow>

        <ConceptBlock
          title="Three different faults with one appearance"
          plainEnglish="The process sails past setpoint before coming back. When it happens tells you why."
          onSite="Ask when the overshoot occurs — on startup, on every setpoint change, or on this particular loop always. Each points somewhere different."
        >
          <p>
            Overshoot is the process variable passing setpoint before settling. It is normal in
            small amounts and a fault in large ones, and there are three distinct causes worth
            separating because they have completely different remedies.
          </p>
          <ul>
            <li>
              <strong>Integral windup.</strong> Section 3 covered it: a controller held at an output
              limit accumulates an error it cannot act on, then has to unwind that accumulation
              before it can back off.{' '}
              <strong>
                The signature is an overshoot specific to startup, restart or the clearing of a
                restriction, on a loop that behaves impeccably in normal running.
              </strong>{' '}
              Retuning for normal running will not help and will make normal running worse.
            </li>
            <li>
              <strong>Too much integral action generally.</strong> The controller keeps pushing
              after the process variable has arrived. This produces overshoot on every setpoint
              change, consistently, and it usually comes with the phase signature from the previous
              block.
            </li>
            <li>
              <strong>Integral action on an integrating process.</strong> Also from Section 3, and
              the one that surprises people. On a process that is already integrating &mdash; a tank
              level being the standard case &mdash; integral action guarantees overshoot, because
              you have two integrations in series. The remedy is counter-intuitive: use{' '}
              <em>less</em> integral, not more.
            </li>
          </ul>
          <p>
            A fourth possibility is worth mentioning because it points the other way.{' '}
            <strong>Absent derivative action</strong> on a heavily lagged process can leave a loop
            overshooting simply because nothing is anticipating the approach. Section 3 noted that a
            small amount of derivative can permit more aggressive P and I than would otherwise be
            possible without unacceptable overshoot &mdash; provided the measurement is clean enough
            to tolerate it.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>Sluggish, and never arriving</ContentEyebrow>

        <ConceptBlock
          title="Two different complaints that sound the same"
          plainEnglish="A loop that gets there slowly and a loop that never gets there are not the same fault, and the fix is different."
          onSite="Watch whether the error is still shrinking. If it has stopped shrinking, it is not slow — it has stopped."
        >
          <p>
            &ldquo;The loop is slow&rdquo; covers two quite different conditions, and separating
            them takes one observation.
          </p>
          <ul>
            <li>
              <strong>Genuinely slow</strong> &mdash; the error is still shrinking, just gradually.
              The loop will get there. This is insufficient gain, insufficient integral action, or a
              process with large lags that simply takes time.
            </li>
            <li>
              <strong>Stopped short</strong> &mdash; the error has stopped shrinking and settled at
              a value. The loop is not going to get there. This is Section 3&rsquo;s{' '}
              <strong>proportional offset</strong>, and it means integral action is absent or
              effectively so.
            </li>
          </ul>
          <p>
            The distinction matters because the remedies diverge. A slow loop may need more gain or
            faster integral action, and both risk instability if pushed. A loop showing offset needs
            integral action to exist at all, and adding a modest amount of it solves the problem
            outright rather than trading against stability.
          </p>
          <p>
            A steady, persistent offset that does not decay over many minutes is one of the more
            reliably diagnosable faults in this module. It is worth checking whether integral is
            configured before adjusting anything else.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>When the loop is fine and the plant is not</ContentEyebrow>

        <ConceptBlock
          title="Stiction — the output moves and the process does not"
          plainEnglish="A valve that has to be pushed hard before it moves at all, and then moves too far. The controller is doing everything right and none of it is arriving."
          onSite="Compare the output trend with the PV trend. Smooth output and stepped PV is the signature."
        >
          <p>
            Section 2 established that PV and output read together localise a fault. This is the
            case where that pays off most clearly.
          </p>
          <p>
            <strong>Stiction</strong> &mdash; static friction in a valve or actuator &mdash; means
            the element does not move until the signal has changed enough to break it free, and then
            it moves further than intended. On a trend this produces a distinctive pattern:{' '}
            <strong>
              a smooth, continuously changing output, and a process variable that sits still and
              then jumps
            </strong>
            .
          </p>
          <p>
            What often follows is a slow cycle. The controller pushes, nothing happens, it pushes
            harder, the valve breaks free and overshoots, the controller reverses, nothing happens,
            and round it goes. It looks like an oscillation and it is not a tuning oscillation at
            all.
          </p>
          <p>
            The phase test helps here too. A tuning oscillation shows a clean phase relationship
            between output and PV; a stiction cycle shows an output moving smoothly against a PV
            that moves in steps. The shapes are different, not just the timing.
          </p>
          <p>
            <strong>No amount of retuning fixes stiction</strong>, because the fault is mechanical.
            Reducing the gain makes the cycle slower and does not stop it. The remedy is maintenance
            on the valve, its actuator or its positioner.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="🔴 Reaching for the tuning parameters first"
          whatHappens={
            <>
              <p>
                A loop is not performing, so somebody opens the tuning page. It is the most
                accessible thing to change, it requires no tools and no permit, and it occasionally
                works.
              </p>
              <p>
                The problem is that a substantial share of control complaints are not tuning
                problems at all, and every one of those will absorb unlimited adjustment while
                remaining exactly as broken as it started. Worse, the loop ends up detuned into
                sluggishness in the search, so that when the real fault is finally found there is a
                second problem to undo.
              </p>
              <p>
                🔴 Tuning changes how the controller responds to an error. It cannot reverse the
                loop&rsquo;s direction of action, remove a transport delay, make a valve move
                smoothly, correct a range mismatch, or clean up a noisy signal.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Ask one question before touching a parameter:{' '}
                <strong>is this a tuning problem at all?</strong> The faults that answer no are
                specific and identifiable, and each has been covered by this module:
              </p>
              <ul>
                <li>
                  <strong>Wrong direction of action</strong> &mdash; output at a limit, PV moving
                  away from setpoint (Section 2).
                </li>
                <li>
                  <strong>Dead time</strong> &mdash; a distance between the action and the
                  measurement (Section 1).
                </li>
                <li>
                  <strong>Stiction</strong> &mdash; smooth output, stepped PV (this section).
                </li>
                <li>
                  <strong>Windup</strong> &mdash; overshoot on startup only (Section 3).
                </li>
                <li>
                  <strong>Range mismatch</strong> &mdash; everything plausible and everything wrong
                  (Module 3 Section 2).
                </li>
                <li>
                  <strong>Noise</strong> &mdash; a measurement problem, not a control one (Module 3
                  Section 5).
                </li>
              </ul>
              <p>
                Record the tuning parameters before changing them, whatever you conclude. Restoring
                a loop to a known state is only possible if somebody wrote that state down &mdash;
                which is Module 4 Section 5 applied to configuration rather than measurement.
              </p>
            </>
          }
        />

        <InlineCheck
          id="ins-5-4-nottuning"
          question="A flow loop has been retuned three times in a month and is no better. The output trend is smooth and the PV moves in visible steps. What should happen next?"
          options={[
            'Reduce the gain further',
            'Stop tuning — the smooth-output-stepped-PV pattern is stiction, and the fault is in the valve',
            'Increase the integral action',
            'Replace the transmitter',
          ]}
          correctIndex={1}
          explanation="Repeated tuning with no improvement is itself evidence that tuning is not the answer. The trend pattern names the fault: the controller is producing a smooth demand and the valve is delivering it in jumps. That is mechanical, and the loop should be handed to maintenance rather than adjusted further."
        />

        <Scenario
          title="A loop that cycles, and three people with three theories"
          situation={
            <>
              <p>
                A pressure loop has begun cycling — about a two-minute period, roughly six per cent
                peak to peak, continuously and without any obvious disturbance. It has run well for
                years.
              </p>
              <p>
                One suggestion is to reduce the gain. Another is that the transmitter is noisy. A
                third is that the control valve is worn and should be scheduled for replacement.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                All three are plausible and there is a test that separates them before any of them
                is acted on. Trend the controller output alongside the process variable.
              </p>
              <p>
                If the output and the PV move in a clean phase relationship, this is a tuning
                oscillation and the phase says which term: in step means proportional, lagging by a
                quarter cycle means integral, leading by a quarter cycle means derivative. A
                two-minute period is slow, which weights the odds towards integral.
              </p>
              <p>
                If the output moves smoothly while the PV moves in steps, it is stiction and the
                valve theory is right. If the PV is visibly fuzzy rather than smoothly sinusoidal,
                the noise theory deserves attention, and Module 4 Section 4 gives a way to measure
                that with an ordinary meter.
              </p>
              <p>
                One more question is worth asking before any of it: <strong>what changed?</strong> A
                loop that ran well for years and now cycles has had something done to it or around
                it &mdash; a valve overhaul, a change in throughput, a different operating point,
                new plant nearby. A loop can also be perfectly tuned for one operating point and
                unstable at another, and nothing in the control system will have changed at all.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                Each of the three proposals costs something different — an afternoon, a transmitter,
                or a valve. The trend comparison costs nothing and eliminates two of them.
              </p>
              <p>
                It also illustrates why this section is arranged around tests rather than symptoms.
                &ldquo;The loop is cycling&rdquo; is compatible with every theory offered. The phase
                relationship is compatible with only one.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>A working order</ContentEyebrow>

        <ConceptBlock
          title="The sequence that narrows it fastest"
          plainEnglish="Cheapest and most conclusive first. Most of these cost nothing but attention."
          onSite="Work down the list. Each step eliminates part of the loop, so a later step is only reached if the earlier ones came back clean."
        >
          <ul>
            <li>
              <strong>Read PV, SP and output together.</strong> Section 2&rsquo;s table. This alone
              separates a controller that is doing nothing from one doing all it can from one making
              things worse.
            </li>
            <li>
              <strong>Ask what changed.</strong> A loop that ran well and now does not has had
              something done to it or near it. This question resolves more faults than any test.
            </li>
            <li>
              <strong>Trend the output against the PV.</strong> The phase test names the over-tuned
              term, and the shape distinguishes a tuning oscillation from stiction.
            </li>
            <li>
              <strong>Check the direction of action.</strong> Especially after any work on the valve
              or the pipework.
            </li>
            <li>
              <strong>Look for dead time.</strong> How far is the measurement from the point of
              action? This bounds what good control can ever look like here.
            </li>
            <li>
              <strong>Only then consider the tuning.</strong> And record what it was first.
            </li>
          </ul>
          <p>
            The ordering is deliberate.{' '}
            <strong>
              Every step above the last one either eliminates tuning as the cause or tells you which
              term to change
            </strong>
            &mdash; so arriving at the tuning page having done them is a very different proposition
            from arriving there first.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="What a well-behaved loop actually looks like"
          plainEnglish="Worth knowing, because a lot of loops get adjusted for not matching an expectation that was never realistic."
          onSite="Perfect is not the target. Adequate, stable and not wearing the valve out is the target."
        >
          <p>
            It is easy to spend a long time chasing a loop that was never misbehaving. A healthy
            loop is not one that sits on setpoint permanently &mdash; Section 1 explained why that
            is not available from feedback.
          </p>
          <p>What good looks like in practice:</p>
          <ul>
            <li>
              <strong>It deviates when a disturbance arrives</strong>, and returns. The deviation is
              the controller&rsquo;s input, not a failure.
            </li>
            <li>
              <strong>It settles.</strong> Some overshoot on a change is normal; a small number of
              decaying cycles is acceptable on most loops.
            </li>
            <li>
              <strong>It is not working constantly.</strong> An output in continuous motion when
              nothing is happening is wearing the final control element out for no return.
            </li>
            <li>
              <strong>The output sits somewhere sensible.</strong> Mid-range, with authority left in
              both directions, so it can respond to a disturbance either way.
            </li>
          </ul>
          <p>
            That last one is worth watching over time rather than at an instant, and it is Section
            2&rsquo;s argument about the output being the honest number. A loop whose output has
            drifted towards a limit over months is still holding setpoint and is running out of room
            to keep doing so.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'How much oscillation is acceptable?',
              answer:
                'It depends entirely on what the process needs, which is why Section 5 starts with operational requirements rather than with numbers. Some loops must sit rock steady; others can swing several per cent with no consequence at all, and tuning them tightly only wears the valve. What is never acceptable is undamped oscillation, because that means the loop never actually settles and the final control element is working continuously for no benefit.',
            },
            {
              question: 'Can a loop be unstable at one operating point and fine at another?',
              answer:
                'Yes, and it is a common reason for a loop that "suddenly" started cycling. Process gain is often not constant across the range — a valve’s characteristic, a heat exchanger’s effectiveness or a vessel’s dynamics can all vary with throughput. Tuning that suits one end of the range can be too aggressive at the other. If a loop cycles only at certain rates or certain levels, that is the thing to investigate rather than the tuning as a whole.',
            },
            {
              question: 'What if reducing every term does not stop the oscillation?',
              answer:
                'Then it is probably not a tuning oscillation. A cycle that survives substantial detuning points at stiction, at dead time, or at an interaction with another loop — two loops that share a process can drive each other, and neither looks faulty in isolation. Detuning to the point of sluggishness without stopping the cycle is strong evidence to stop tuning and look elsewhere.',
            },
            {
              question: 'Does a noisy process variable mean the loop is unstable?',
              answer:
                'No, and confusing the two leads to loops being detuned for no reason. Noise is fast, irregular and does not have a consistent period; an oscillation is slower, regular and roughly sinusoidal. Noise is a measurement problem belonging to Module 3 Section 5, and the loop will pass it through to the valve if the gain or derivative action is high enough — which is a reason to address the noise, not to accept a sluggish loop.',
            },
            {
              question: 'Should tuning parameters be recorded before changing them?',
              answer:
                'Always, and for the same reason Module 4 Section 5 gives for as-found readings. A parameter changed without a record cannot be restored, and a loop that has been adjusted repeatedly over years by people who each recorded nothing ends up in a state nobody can account for. Note what they were, what you changed them to, and why.',
            },
            {
              question: 'Is it ever right to leave a loop in manual permanently?',
              answer:
                'As a considered decision with the reason recorded, sometimes — though it should prompt the question of why a loop exists that cannot be used. What it must never be is a default that accumulates quietly. Section 1 covered the consequence: on a self-regulating process manual holds, and on an integrating or runaway process it does not, so a loop parked in manual is a different risk depending on what it controls.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'A loop has four elements — something senses, something decides, something influences, something reacts — and a fault in any of them produces the same symptom.',
            'That is why diagnosis must localise. The symptom alone never identifies the element.',
            'Over-tuning shows as oscillation: damped after a change at best, never decaying at worst.',
            '🔴 The phase between output and PV identifies the over-tuned term, and it costs two trends.',
            'Proportional adds no phase shift — output moves in step with the PV.',
            'Integral adds −90° — output lags the PV by about a quarter cycle.',
            'Derivative adds +90° — output leads the PV by about a quarter cycle.',
            'Frequency is a second clue: proportional gain is flat with frequency, integral weakens as frequency rises, derivative strengthens.',
            'So a slow rolling cycle points at integral; a fast jittery one points at derivative or proportional.',
            'Overshoot on startup only, with good control afterwards, is windup — not tuning.',
            'Overshoot on every setpoint change is usually excess integral; on an integrating process, integral guarantees it.',
            'Slow and stopped-short are different faults. If the error has stopped shrinking, it is offset and integral action is missing.',
            '🔴 Smooth output with a stepped PV is stiction. It is mechanical, and detuning only slows the cycle down.',
            '🔴 Tuning cannot fix a wrong direction of action, dead time, stiction, windup, a range mismatch or noise.',
            'Ask whether it is a tuning problem before opening the tuning page — and record the parameters before changing them.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 5.4" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-5-section-3')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Previous section
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">PID basics</span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-5-section-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Tuning and stability
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule5Section4;
