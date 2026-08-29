/**
 * Module 5 · Section 1 — Open loop vs closed loop systems
 *
 * Rewritten 2026-08-29 against the Module 1 Section 1 exemplar. Opens Module 5.
 *
 * 🔴 POSITIONING — READ THIS BEFORE EDITING. Module 1 Section 3 ALREADY teaches
 * open-loop vs closed-loop, negative feedback, error = PV − SP, percent of span
 * and manual/auto modes, and it does it well. A page that re-teaches those
 * wastes the learner's time; the Module 3 audit showed how easily that happens.
 *
 * So this page is deliberately positioned one level up: not "what is a closed
 * loop" but WHAT FEEDBACK FUNDAMENTALLY CANNOT DO, and therefore when you would
 * choose something else on purpose.
 *
 *   1. Feedback is ALWAYS LATE. It cannot act until an error already exists.
 *      That is not a flaw to tune out — it is what feedback IS.
 *   2. LAG vs DEAD TIME. Lag: response starts at once, finishes slowly. Dead
 *      time: nothing whatsoever, then a response. Dead time is the killer,
 *      because the controller acts on stale information.
 *   3. FEEDFORWARD acts on the disturbance before the error appears — and never
 *      replaces feedback, because it works from a model and cannot see its own
 *      errors.
 *   4. 🔴 What "put it in manual" costs depends on the PROCESS TYPE:
 *      self-regulating settles, integrating ramps, runaway accelerates.
 *
 * Point 4 is the safety-relevant one and it is the payoff of the page.
 *
 * Sources: Kuphaldt, *Lessons In Industrial Instrumentation* v2.32 (CC BY),
 * §29.1 (feedback control principles, the heat-exchanger example), §30.1.1–
 * 30.1.3 (self-regulating, integrating and runaway processes and what each
 * requires of a controller) and §30.1.7 (the lag/dead-time distinction).
 * Extracted to scratchpad/src/m5_feedback.txt, m5_processtypes.txt,
 * m5_deadtime.txt. Held in ~/Desktop/hav/instrumentation.
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

const TITLE = 'Open loop vs closed loop systems | Instrumentation Module 5.1 | Elec-Mate';
const DESCRIPTION =
  'What feedback fundamentally cannot do — why a controller is always correcting an error that already happened, the difference between lag and dead time, what feedforward adds, and why the safety of putting a loop in manual depends entirely on the type of process.';

const outcomes = [
  'Explain why a feedback controller can never act before an error exists',
  'Distinguish lag time from dead time and say why dead time is the harder problem',
  'Say what feedforward control does that feedback cannot, and what it cannot do',
  'Explain why feedforward is added to feedback rather than replacing it',
  'Recognise open-loop control that has been chosen deliberately and correctly',
  'Spot a control scheme that looks closed but is open with respect to what matters',
  '🔴 Classify a process as self-regulating, integrating or runaway',
  '🔴 Say what happens to each type when its loop is placed in manual',
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the fundamental limitation of feedback control?',
    options: [
      'It cannot act until a deviation has already occurred, so it is always correcting something that has already happened',
      'It only works on temperature processes',
      'It cannot be used with digital systems',
      'It requires an expensive controller',
    ],
    correctIndex: 0,
    explanation:
      'A feedback controller works from the error between the process variable and the setpoint. If there is no error there is nothing to act on — so by construction it responds after the process has already deviated. That is not a fault to be tuned out; it is what feedback is.',
  },
  {
    id: 2,
    question: 'What distinguishes dead time from lag time?',
    options: [
      'Dead time only occurs in digital systems',
      'With lag the response begins immediately and takes time to finish; with dead time nothing happens at all for a period, then the response begins',
      'Dead time is caused by a faulty transmitter',
      'Lag affects the controller and dead time affects the process',
    ],
    correctIndex: 1,
    explanation:
      'A first-order lag starts rising the instant the output changes — it just takes time to settle. Pure dead time produces no effect whatsoever for a period. The difference matters because during dead time the controller gets no information at all about whether its correction is working.',
  },
  {
    id: 3,
    question: 'Why does dead time make a loop so difficult to control?',
    options: [
      'It prevents the integral term from working',
      'It reduces the accuracy of the transmitter',
      'The controller keeps acting on information that predates its own corrections, so it over-corrects and the loop swings',
      'It causes the final control element to stick',
    ],
    correctIndex: 2,
    explanation:
      'During the dead period the process variable has not yet responded, so the controller sees no improvement and pushes harder. When the delayed response finally arrives it reflects corrections made some time ago, and the accumulated over-correction sends the loop past setpoint the other way.',
  },
  {
    id: 4,
    question: 'What does feedforward control do that feedback cannot?',
    options: [
      'It removes dead time from the process',
      'It guarantees the process variable never changes',
      'It eliminates the need for a measurement',
      'It measures the disturbance and acts before the process variable has deviated at all',
    ],
    correctIndex: 3,
    explanation:
      'Feedforward measures the incoming disturbance rather than waiting for its effect. That is the one thing feedback structurally cannot do, because feedback needs an error to exist before it has anything to work with.',
  },
  {
    id: 5,
    question: 'Why is feedforward added to a feedback loop rather than used on its own?',
    options: [
      'Because it works from a model of the process and has no way to detect its own errors or anything it does not measure',
      'Because regulations require feedback',
      'Because it can only handle small disturbances',
      'Because it is too slow to work alone',
    ],
    correctIndex: 0,
    explanation:
      'Feedforward is open loop with respect to the controlled variable — it never checks the result. If its model is imperfect, or a disturbance arrives that it does not measure, nothing corrects the resulting error. Feedback catches what feedforward missed, which is why the two are combined.',
  },
  {
    id: 6,
    question:
      'A heating system varies its output from outside air temperature alone, with no measurement of the room. How should this be classified?',
    options: [
      'Closed loop, because it uses a measurement',
      'Open loop with respect to room temperature, because the variable being controlled is never measured',
      'Feedback control with a remote sensor',
      'Cascade control',
    ],
    correctIndex: 1,
    explanation:
      'The presence of a measurement does not make a loop closed. What matters is whether the controlled variable is measured and fed back. Compensating from a related variable is genuinely useful and it is still open loop with respect to the thing you actually care about.',
  },
  {
    id: 7,
    question:
      '🔴 A control loop is switched to manual and left. Which type of process will ramp steadily away from where it was?',
    options: [
      'All processes behave the same way in manual',
      'A self-regulating process',
      'An integrating process',
      'A runaway process',
    ],
    correctIndex: 2,
    explanation:
      'An integrating process ramps in response to any imbalance in mass or energy flow, so with a fixed output it drifts steadily in one direction — a tank level with a fixed inlet is the standard example. A self-regulating process settles at a new value instead, and a runaway process accelerates.',
  },
  {
    id: 8,
    question: '🔴 Which process type is the most dangerous to leave in manual, and why?',
    options: [
      'They present equal risk',
      'Self-regulating, because it settles at the wrong value',
      'Integrating, because it ramps steadily',
      'Runaway, because the deviation accelerates rather than growing steadily or settling',
    ],
    correctIndex: 3,
    explanation:
      'A runaway process departs exponentially, so the time available to notice and intervene shrinks as the deviation grows. A self-regulating process finds a new resting point and an integrating one drifts at a steady rate; a runaway one gets worse faster the longer it is left.',
  },
];

const InstrumentationModule5Section1 = () => {
  const navigate = useNavigate();
  useSEO({ title: TITLE, description: DESCRIPTION });

  return (
    <HubPage>
      <HubMasthead
        section="Module 5 · Section 1"
        title="Open loop and closed loop"
        backTo="/electrician/upskilling/instrumentation-module-5"
      />

      <HubBody>
        <p className="max-w-3xl text-[13px] leading-relaxed text-white">
          Module 1 established what a closed loop is. This is about what feedback cannot do — and
          what you do instead.
        </p>

        <TLDR
          points={[
            'Module 1 Section 3 covered what open and closed loop mean. This section starts where that finished.',
            '🔴 Feedback is always late. A controller works from the error, so it cannot act until the process has already deviated. That is not a flaw — it is the definition.',
            'Two things delay a process, and they are not the same. Lag: the response starts at once and takes time to finish. Dead time: nothing happens at all, then a response begins.',
            '🔴 Dead time is the hard one, because during it the controller gets no information about whether its correction is working — so it keeps pushing.',
            'Feedforward measures the disturbance and acts before an error appears. That is the one thing feedback structurally cannot do.',
            'Feedforward never replaces feedback: it works from a model, it is blind to anything it does not measure, and it cannot detect its own errors.',
            'Open loop is often the right answer — sequences, batch steps, and anywhere the controlled variable genuinely cannot be measured.',
            'A measurement does not make a loop closed. Compensating from a related variable is open loop with respect to the thing you care about.',
            '🔴 What happens when a loop is left in manual depends entirely on the process type.',
            'Self-regulating: settles at a new value. Integrating: ramps steadily away. Runaway: accelerates away.',
            'Those three also decide what control action a loop needs — a preview of Section 3.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <ContentEyebrow>Where this starts</ContentEyebrow>

        <ConceptBlock
          title="What you already have, in one paragraph"
          plainEnglish="Measure it, compare it with what you wanted, act on the difference, then measure again. That is a closed loop."
          onSite="If any of that is unfamiliar, Module 1 Section 3 is the place to go back to. Everything here builds on it."
        >
          <p>
            Module 1 named the parts &mdash; the process, the process variable, the transmitter, the
            controller, the final control element &mdash; and Section 3 put them to work. It showed
            that what makes those a <em>loop</em> rather than a chain is that the last one affects
            the first, and the first is measured again. It covered negative feedback, the error
            between process variable and setpoint, and what actually changes when a loop is switched
            to manual.
          </p>
          <p>
            This section does not repeat any of that. It asks a harder question:{' '}
            <strong>what can feedback not do?</strong> Because every technique in the rest of this
            module &mdash; PID, tuning, cascade, feedforward &mdash; exists to work around one of a
            small number of limitations that are built into the idea of feedback itself.
          </p>
          <p>
            Understanding those limitations first makes the rest of the module make sense. Without
            them, PID looks like three arbitrary knobs.
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>The limitation built into feedback</ContentEyebrow>

        <ConceptBlock
          title="🔴 A feedback controller is always correcting the past"
          plainEnglish="It works from the difference between what is happening and what you wanted. No difference, nothing to work with — so it can only ever react once something has already gone off."
          onSite="This is why a perfectly tuned loop still deviates when a disturbance arrives. It is not badly tuned; it is feedback."
        >
          <p>
            Strip a feedback controller down and it does one thing: it takes the error between the
            process variable and the setpoint, and turns that into an output.
          </p>
          <p>Read that again and the limitation falls out on its own.</p>
          <p>
            <strong>
              If the error is zero, the controller has nothing to act on. So a deviation must exist
              before any correction can begin.
            </strong>{' '}
            A feedback controller cannot prevent a disturbance from affecting the process &mdash; it
            can only reduce how far and how long the effect lasts.
          </p>
          <p>
            That is worth stating plainly because it is routinely mistaken for a tuning problem. A
            loop that dips when a cold charge arrives and recovers over the next minute is not badly
            tuned. It is doing precisely what feedback does. Tuning changes how deep the dip is and
            how quickly it recovers; it cannot remove the dip, because the dip is the signal the
            controller needs in order to act at all.
          </p>
          <p>
            Everything else in this section follows from that single fact. If feedback must wait for
            an error, then anything which <em>delays</em> the error appearing, or delays the
            correction taking effect, makes control harder &mdash; and there are two quite different
            kinds of delay.
          </p>
        </ConceptBlock>

        <Pullquote>
          A feedback controller cannot stop a disturbance from having an effect. It can only shorten
          the effect and make it smaller. The deviation is not a failure of the loop — it is the
          loop&rsquo;s input.
        </Pullquote>

        <SectionRule />
        <ContentEyebrow>Two kinds of delay</ContentEyebrow>

        <ConceptBlock
          title="Lag time — starts immediately, finishes slowly"
          plainEnglish="Turn the valve and the process begins to move straight away. It just takes a while to get where it is going."
          onSite="Recognisable on a trend as a curve that leaves the starting value at once and gradually levels off."
        >
          <p>
            <strong>Lag</strong> describes a damped response. Change the manipulated variable
            &mdash; a valve position, say &mdash; and the initial effect on the process variable is
            seen immediately, but the final effect takes time to develop.
          </p>
          <p>
            The key property is that <strong>there is no delay before the response begins</strong>.
            The process variable starts moving the instant the output changes. A first-order lag
            rises quickly at first and slows as it approaches its final value. Several lags in
            series &mdash; a multiple-order response &mdash; start more slowly, but they still start
            at once.
          </p>
          <p>
            Lag is manageable, and it is the ordinary condition of almost every real process. A
            controller working into a lagging process gets continuous feedback about whether its
            correction is having the intended effect, even if the full effect is still developing.
            That information is what lets it moderate its own action.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="🔴 Dead time — nothing at all, then a response"
          plainEnglish="You change the output and the process does absolutely nothing for a while. Then it starts to move."
          onSite="Transport delay is the usual cause: material physically travelling from where you changed something to where you measure it."
        >
          <p>
            <strong>Dead time</strong> is an interval in which moving the manipulated variable
            achieves <strong>nothing measurable at all</strong>. The process sits there as though
            nothing had been asked of it, and only then begins to respond &mdash; which is where the
            name comes from.
          </p>
          <p>
            The difference from lag is categorical rather than a matter of degree. A lagging process
            responds immediately and slowly; a dead-time process responds not at all, and then
            responds. On a trend of an open-loop step test the distinction is unmistakable: the
            lagging response leaves the line at the moment of the step, and the dead-time response
            sits flat and then departs.
          </p>
          <p>
            Where it comes from is usually physical. If a heater warms fluid at one end of a pipe
            and the temperature is measured thirty metres downstream, nothing can possibly be
            detected until the warmed fluid has travelled that distance. Mixing time, conveyor
            length and analyser sample lines all do the same thing.
          </p>
          <p>
            🔴 Now combine dead time with the limitation above, because that is where the real
            trouble is. The controller sees an error and acts. During the dead time it sees{' '}
            <strong>no improvement whatsoever</strong>, because there cannot be any yet. So it
            concludes its correction was insufficient and pushes harder. It keeps pushing until the
            delayed response finally arrives &mdash; and what arrives reflects only the first,
            modest correction. All the additional action taken since is still in the pipe, and it
            drives the process straight past setpoint the other way.
          </p>
          <p>
            <strong>
              Dead time makes a controller act on information that predates its own corrections
            </strong>
            , and that is the mechanism behind a large share of the oscillation problems in Section
            4.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-5-1-deadtime"
          question="A temperature loop measures 40 metres downstream of the steam valve it controls. It oscillates steadily whatever the tuning. What is the most likely cause?"
          options={[
            'Dead time from the transport delay — the controller keeps correcting before its previous action can possibly show up',
            'The valve is oversized',
            'The setpoint is set too high',
            'The transmitter needs recalibrating',
          ]}
          correctIndex={0}
          explanation="Forty metres of pipe means the effect of a valve change cannot be measured until the fluid has travelled that far. The controller pushes harder throughout that blind period, then overshoots when the delayed response arrives. Tuning can make the loop calmer by making it less aggressive; it cannot remove the delay. Moving the measurement closer would."
        />

        <SectionRule />
        <ContentEyebrow>Acting before the error</ContentEyebrow>

        <ConceptBlock
          title="Feedforward — the one thing feedback cannot do"
          plainEnglish="Instead of waiting to see the effect of a disturbance, measure the disturbance itself and act on it straight away."
          onSite="Common where a large, measurable disturbance arrives regularly — a big change in feed rate, or in inlet temperature."
        >
          <p>
            If feedback&rsquo;s limitation is that it must wait for an error, the obvious response
            is to find something that does not have to wait. That is <strong>feedforward</strong>.
          </p>
          <p>
            A feedforward scheme measures the <em>disturbance</em> rather than the controlled
            variable. When a heat exchanger&rsquo;s incoming fluid flow doubles, a feedback
            controller learns about it when the outlet temperature starts to fall. A feedforward
            controller measures the incoming flow and increases the steam immediately &mdash; before
            the outlet temperature has moved at all.
          </p>
          <p>
            That is a genuine capability and not merely faster tuning.{' '}
            <strong>
              Feedforward can prevent a deviation that feedback could only ever have corrected after
              the fact.
            </strong>
          </p>
          <p>
            Its weaknesses are equally structural, and they are the reason it is never used alone:
          </p>
          <ul>
            <li>
              <strong>It works from a model.</strong> Somebody has to decide how much extra steam a
              given increase in flow needs. If that relationship is imperfect &mdash; and it always
              is to some degree &mdash; the correction is imperfect too.
            </li>
            <li>
              <strong>It is blind to what it does not measure.</strong> A feedforward scheme built
              around inlet flow does nothing about a change in steam pressure or in inlet
              temperature.
            </li>
            <li>
              <strong>It never checks the result.</strong> With respect to the controlled variable,
              feedforward is open loop. It has no way of knowing whether its correction was right.
            </li>
          </ul>
          <p>
            So feedforward and feedback are combined, and the division of labour is clean:{' '}
            <strong>
              feedforward handles the large, measurable, predictable disturbance quickly, and
              feedback cleans up everything it got wrong or never saw.
            </strong>
          </p>
        </ConceptBlock>

        <SectionRule />
        <ContentEyebrow>When open loop is right</ContentEyebrow>

        <ConceptBlock
          title="Open loop is a choice, not a shortcoming"
          plainEnglish="Plenty of things are controlled perfectly well without ever checking the result, because checking would add nothing."
          onSite="Batch sequences and start-up routines are full of deliberate open-loop steps, and correctly so."
        >
          <p>
            Module 1 Section 3 listed the common forms of open-loop control. What is worth adding
            here is <em>when it is the right engineering decision</em>, because the word
            &ldquo;open&rdquo; carries an unearned suggestion of inferiority.
          </p>
          <ul>
            <li>
              <strong>The result is not in doubt.</strong> Run the pump for four minutes, then open
              the valve. There is no useful measurement of &ldquo;four minutes having elapsed&rdquo;
              to feed back.
            </li>
            <li>
              <strong>Nothing can be measured.</strong> Where the controlled variable genuinely
              cannot be sensed, feedback is not available at any price and an open-loop rule is the
              only option.
            </li>
            <li>
              <strong>The consequence of being wrong is small.</strong> If a modest error costs
              nothing, the cost and complexity of a measurement and a controller may not be
              justified.
            </li>
            <li>
              <strong>Feedback would be too slow to help.</strong> Where the disturbance is over
              before feedback could respond, an open-loop action based on the disturbance is more
              use than a correction that arrives late.
            </li>
          </ul>
          <p>
            Notice that the last one is feedforward wearing different clothes. That is not a
            coincidence &mdash; <strong>feedforward is a form of open-loop control</strong>, applied
            intelligently and backed up by a feedback loop that catches its mistakes.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Calling a scheme closed loop because it contains a measurement"
          whatHappens={
            <>
              <p>
                A heating system varies its flow temperature according to outside air temperature.
                It has a sensor, it responds to conditions, it adjusts automatically. It looks like
                a closed loop and it is described as one.
              </p>
              <p>
                It is not, and the distinction is not pedantry.{' '}
                <strong>
                  The variable being controlled &mdash; room temperature &mdash; is never measured.
                </strong>{' '}
                The scheme is open loop with respect to the thing anybody actually cares about.
              </p>
              <p>
                So it corrects for the disturbance it measures and for nothing else. Solar gain, a
                full room, an open door, a fouled emitter: none of it produces any response
                whatsoever, because nothing in the system can detect that the room is the wrong
                temperature.
              </p>
            </>
          }
          doInstead={
            <>
              <p>
                Ask one question of any control scheme:{' '}
                <strong>is the variable I care about measured and fed back?</strong> If it is not,
                the scheme is open loop with respect to that variable, however many sensors it
                contains and however sophisticated it looks.
              </p>
              <p>
                Then judge it on the right terms. Compensating from a related measurement is often
                sensible and cheap, and it is exactly the feedforward idea above. It simply must not
                be relied on to do what it structurally cannot &mdash; correct an error in something
                it never measures.
              </p>
              <p>
                Where the controlled variable matters, close the loop on it, and keep the
                compensation as feedforward alongside.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>🔴 What manual mode actually costs</ContentEyebrow>

        <ConceptBlock
          title="Three kinds of process, three very different consequences"
          plainEnglish="Freeze the controller output and what the process does next depends entirely on what kind of process it is. One settles, one drifts, one accelerates."
          onSite="Know which type you are dealing with before deciding that manual is a safe holding position."
        >
          <p>
            Module 1 Section 3 explained what switching to manual changes: the controller stops
            calculating and holds whatever output the operator sets. The measurement continues, the
            display continues, and the correction stops.
          </p>
          <p>
            What it did not say is <strong>what the process then does</strong>, and the answer is
            not the same for every process. There are three characteristic behaviours, and telling
            them apart is one of the more useful things in this module.
          </p>
          <AppendixTable
            caption="Process types and what each does with a fixed controller output"
            headers={['Type', 'Behaviour after a change or a load shift', 'In manual, left alone']}
            rows={[
              [
                'Self-regulating',
                'Settles naturally at a new steady value',
                'Finds a new resting point — wrong, but stable',
              ],
              [
                'Integrating',
                'Ramps steadily, from an imbalance of mass or energy flow',
                'Drifts continuously in one direction and does not stop',
              ],
              [
                'Runaway',
                'Departs exponentially, accelerating as it goes',
                '🔴 Accelerates away — the time to intervene shrinks as it worsens',
              ],
            ]}
            notes="A tank with a fixed inlet and outlet is the classic integrating process: any imbalance means the level ramps until something overflows or empties."
          />
          <p>
            The practical consequence is about how much time you have.{' '}
            <strong>
              Manual is a genuine holding position on a self-regulating process and a countdown on
              the other two.
            </strong>{' '}
            An integrating process gives you a steady, predictable rate of departure. A runaway
            process gives you less warning the longer it goes on, because the rate itself is
            increasing.
          </p>
          <p>
            These three categories do more work later in the module, because they also determine{' '}
            <em>what control action a loop needs</em>:
          </p>
          <ul>
            <li>
              A <strong>self-regulating</strong> process absolutely requires integral action to
              remove the offset between process variable and setpoint.
            </li>
            <li>
              An <strong>integrating</strong> process is ideally controllable with proportional
              action alone, and integral action in one guarantees overshoot.
            </li>
            <li>
              A <strong>runaway</strong> process cannot be controlled by proportional or integral
              action alone and always needs derivative action for stability.
            </li>
          </ul>
          <p>
            Those statements will mean more after Section 3. They are here now because they explain
            why the classification is worth learning: it is not a taxonomy, it is a prediction about
            what the loop will need and what it will do without you.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="ins-5-1-processtype"
          question="A level loop on a tank with a fixed outlet is put into manual at a steady output. What should you expect?"
          options={[
            'The level will settle at a new steady value',
            'The level will ramp steadily up or down until the tank overflows or empties',
            'Nothing — the level will hold where it is',
            'The level will oscillate around its current value',
          ]}
          correctIndex={1}
          explanation="Level is the classic integrating process: it responds to the imbalance between what comes in and what goes out. Unless inflow exactly equals outflow — which it will not, except by coincidence — the level ramps and keeps ramping. Manual is not a resting state here."
        />

        <Scenario
          title="A loop left in manual over a weekend, twice, with different outcomes"
          situation={
            <>
              <p>
                Two loops were left in manual on a Friday during unrelated work. Both were noticed
                on Monday morning.
              </p>
              <p>
                The first, a heat exchanger outlet temperature, was sitting about 6 &deg;C from
                setpoint and had been stable there all weekend. The second, a buffer tank level, had
                emptied the tank and tripped a pump on low level some time on Saturday.
              </p>
            </>
          }
          whatToDo={
            <>
              <p>
                The difference is not that one loop was more important or more carelessly left. It
                is that the two processes behave differently with a fixed output, and that is
                predictable rather than bad luck.
              </p>
              <p>
                The heat exchanger is <strong>self-regulating</strong>. With a fixed steam valve
                position it found a new balance between heat in and heat out and stayed there. The
                offset from setpoint is exactly what you would expect from a loop with no integral
                action running &mdash; wrong, and stable.
              </p>
              <p>
                The tank is <strong>integrating</strong>. With a fixed valve position, inflow and
                outflow were never going to match, so the level ramped in whichever direction the
                imbalance pointed. It was always going to reach a limit; the only question was which
                one and how soon.
              </p>
              <p>
                So the investigation is not really about the tank. It is about why a loop on an
                integrating process can be left in manual without anything drawing attention to it,
                and whether the alarm and handover arrangements distinguish between loops where
                manual is a holding state and loops where it is a countdown.
              </p>
            </>
          }
          whyItMatters={
            <>
              <p>
                &ldquo;Put it in manual&rdquo; is one of the most common instructions on a plant,
                and it means very different things on different loops. Treating it as uniformly safe
                is how the second outcome happens.
              </p>
              <p>
                It also shows the classification earning its keep. Knowing that level is an
                integrating process tells you, before anything happens, that manual is not a resting
                state there.
              </p>
            </>
          }
        />

        <SectionRule />
        <ContentEyebrow>Putting it together</ContentEyebrow>

        <ConceptBlock
          title="Reading a loop before you touch it"
          plainEnglish="Four questions answered before anything is adjusted will tell you most of what you need to know."
          onSite="Two minutes of this saves an afternoon of tuning something that was never a tuning problem."
        >
          <p>
            The ideas in this section combine into a short assessment worth making before any
            control problem is diagnosed:
          </p>
          <ul>
            <li>
              <strong>Is the variable I care about actually measured and fed back?</strong> If not,
              no amount of tuning will help, because the loop cannot see the problem.
            </li>
            <li>
              <strong>Is there dead time, and how much?</strong> Distance between the final control
              element and the measurement is the first place to look. Dead time bounds how good the
              control can ever be.
            </li>
            <li>
              <strong>What type of process is it?</strong> Self-regulating, integrating or runaway
              &mdash; which tells you what it does unattended and what control action it needs.
            </li>
            <li>
              <strong>Is the disturbance measurable before it arrives?</strong> If it is, and it is
              large and frequent, feedforward may achieve what better tuning cannot.
            </li>
          </ul>
          <p>
            The reason to ask these first is that they distinguish between problems that tuning can
            solve and problems it cannot.{' '}
            <strong>
              A loop limited by dead time, or open with respect to the variable that matters, will
              absorb any amount of tuning effort and stay poor
            </strong>
            &mdash; and it will do so while looking exactly like a loop that needs tuning.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="What the rest of the module does with this"
          plainEnglish="Each remaining section attacks one of the limitations named here."
          onSite="If a later section seems abstract, come back and ask which limitation it is addressing."
        >
          <ul>
            <li>
              <strong>Section 2</strong> &mdash; the controller in practice: the three numbers on a
              faceplate, and the direction of action that decides whether a loop corrects or runs
              away.
            </li>
            <li>
              <strong>Section 3</strong> &mdash; PID. Three ways of turning an error into an output,
              each answering a different one of the problems above.
            </li>
            <li>
              <strong>Section 4</strong> &mdash; what it looks like when a loop is fighting one of
              these limitations rather than working with it: hunting, overshoot and lag.
            </li>
            <li>
              <strong>Section 5</strong> &mdash; tuning, and the stability limits that decide how
              hard you are allowed to push.
            </li>
            <li>
              <strong>Section 6</strong> &mdash; the same ideas on real plant: HVAC, pressure and
              motor speed.
            </li>
          </ul>
          <p>
            One theme runs through all of them and it is the one to carry forward:{' '}
            <strong>
              a controller can only work with the information the process gives it, when the process
              gives it.
            </strong>{' '}
            Every limitation in this section is a statement about that information &mdash; when it
            arrives, how late it is, and whether it describes the thing you actually care about.
          </p>
        </ConceptBlock>

        <FAQ
          items={[
            {
              question: 'Can dead time be tuned out?',
              answer:
                'No, and that is the point of separating it from lag. Tuning changes how aggressively the controller responds, so it can stop a dead-time loop from oscillating — by making it slower and gentler, which means accepting worse control. The delay itself is a property of the process, not the controller. The real fixes are physical: move the measurement closer to the point of action, reduce transport distance, or reduce mixing and sample-line delays.',
            },
            {
              question: 'Is a fast loop always better than a slow one?',
              answer:
                'No. A loop tuned to respond aggressively will react to noise and to disturbances that would have passed on their own, and on a process with significant dead time it will oscillate. The right speed is set by the process and by what the plant actually needs — Section 5 covers this properly. A loop that holds setpoint adequately without hunting is doing its job, whatever its response time.',
            },
            {
              question: 'How do I tell which type of process I have?',
              answer:
                'Put the loop in manual, make a small step change to the output, and watch. If the process variable settles at a new value it is self-regulating; if it ramps steadily it is integrating; if it departs at an increasing rate it is runaway. That is an open-loop step test, and it is the same test used before tuning. Do it only where it is safe and permitted to do so, which on a runaway process it usually is not.',
            },
            {
              question: 'Are runaway processes common?',
              answer:
                'Not in general industrial work, and they matter enormously where they occur — strongly exothermic reactions being the usual example, where more temperature produces more reaction which produces more temperature. Most loads an electrician will meet are self-regulating or integrating. The category is worth knowing about mainly because it is the one where an unattended loop gives least warning.',
            },
            {
              question: 'Does feedforward need its own controller?',
              answer:
                'It needs a calculation, and where that lives depends on the system. In a modern control system it is usually a block configured alongside the feedback controller, with its output summed into the feedback controller’s. What matters conceptually is that there are two paths acting on the same final control element — one anticipating a measured disturbance, one correcting the resulting error — and that they are doing different jobs.',
            },
            {
              question: 'If feedback is always late, how do plants hold setpoint so well?',
              answer:
                'Because most disturbances are small and gradual relative to how fast the loop responds, so the deviation that feedback needs in order to act is too small to notice. Being late is only a problem when the disturbance is large or fast compared with the loop. That is exactly when feedforward, better tuning or a change to the process itself becomes worth the effort.',
            },
          ]}
        />

        <KeyTakeaways
          points={[
            'Module 1 Section 3 covered what open and closed loop mean. This section is about the limits of feedback and what you do about them.',
            '🔴 Feedback cannot act until an error exists, so it is always correcting something that has already happened. That is the definition, not a defect.',
            'A perfectly tuned loop still deviates when a disturbance arrives. Tuning changes how deep and how long, never whether.',
            'Lag: the response starts immediately and takes time to finish. Almost every real process has some.',
            '🔴 Dead time: nothing happens at all for a period, then the response begins. Usually transport delay — material travelling from the action to the measurement.',
            '🔴 Dead time makes the controller act on information older than its own corrections, so it over-corrects and the loop swings.',
            'Dead time cannot be tuned out. It can only be tuned around, by accepting slower control — or removed physically.',
            'Feedforward measures the disturbance and acts before any error appears. That is the one thing feedback structurally cannot do.',
            'Feedforward works from a model, is blind to what it does not measure, and never checks its result — so it supplements feedback rather than replacing it.',
            'Open loop is frequently the right choice: fixed sequences, unmeasurable variables, small consequences, or disturbances too fast for feedback.',
            '🔴 A measurement does not make a loop closed. Ask whether the variable you care about is measured and fed back.',
            '🔴 Self-regulating processes settle at a new value; integrating processes ramp steadily; runaway processes accelerate.',
            'So manual mode is a holding position on a self-regulating process and a countdown on the other two.',
            'The same three types predict what control action a loop needs — integral for self-regulating, proportional for integrating, derivative for runaway.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself — Module 5.1" />

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-5')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-left touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              <ChevronLeft className="h-3 w-3" /> Back
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">Module 5</span>
          </button>
          <button
            onClick={() => navigate('/electrician/upskilling/instrumentation-module-5-section-2')}
            className="flex flex-col rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.19] via-white/[0.105] to-white/[0.065] p-4 text-right touch-manipulation lg:hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
              Next section <ChevronRight className="h-3 w-3" />
            </span>
            <span className="mt-1 truncate text-[14px] font-semibold text-white">
              Components of a loop
            </span>
          </button>
        </div>
      </HubBody>
    </HubPage>
  );
};

export default InstrumentationModule5Section1;
